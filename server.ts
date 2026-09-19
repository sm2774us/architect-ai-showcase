import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI client safely
let genAIClient: GoogleGenAI | null = null;
export function setGenAIClient(client: GoogleGenAI | null) {
  genAIClient = client;
}
export function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    try {
      genAIClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      /* v8 ignore start */
    } catch (e) {
      console.warn('Failed to initialize GoogleGenAI client:', e);
    }
    /* v8 ignore stop */
  }
  return genAIClient;
}

// ==========================================
// In-memory Enterprise Mock Datastore for ServiceNow Data Fabric
// ==========================================
export const mockCMDB = [
  {
    sys_id: 'ci_001',
    name: 'prod-customer-portal-db-01',
    class: 'cmdb_ci_database',
    tier: 'Tier 0 (Mission Critical)',
    environment: 'Production',
    ip: '10.142.12.89',
    status: 'Operational - High Memory Load (94%)',
    owner: 'Platform SRE Team',
    parent_service: 'Customer Experience Hub',
    cloud_provider: 'AWS us-east-1',
  },
  {
    sys_id: 'ci_002',
    name: 'k8s-ingress-cluster-apigw',
    class: 'cmdb_ci_kubernetes_cluster',
    tier: 'Tier 0',
    environment: 'Production',
    ip: '10.142.4.11',
    status: 'Degraded - Latency Spike (1250ms)',
    owner: 'Core Infrastructure',
    parent_service: 'Global API Gateway',
    cloud_provider: 'Azure East US',
  },
  {
    sys_id: 'ci_003',
    name: 'servicenow-mid-server-prod-04',
    class: 'cmdb_ci_mid_server',
    tier: 'Tier 1',
    environment: 'Production',
    ip: '172.16.88.22',
    status: 'Operational',
    owner: 'ServiceNow AI Ops',
    parent_service: 'Enterprise Integration Fabric',
    cloud_provider: 'GCP us-central1',
  },
  {
    sys_id: 'ci_004',
    name: 'redis-session-cache-cluster',
    class: 'cmdb_ci_appl',
    tier: 'Tier 1',
    environment: 'Production',
    ip: '10.142.18.5',
    status: 'Operational',
    owner: 'App Platform',
    parent_service: 'User Session Service',
    cloud_provider: 'AWS us-east-1',
  },
];

export const mockIncidents = [
  {
    sys_id: 'INC0948210',
    number: 'INC0948210',
    short_description: 'Intermittent 504 Gateway Timeouts on Customer Checkout & Payments',
    priority: '1 - Critical',
    state: 'In Progress',
    caller: 'Sarah Jenkins (VP E-Commerce)',
    assignment_group: 'Enterprise SRE & AI Ops',
    cmdb_ci: 'k8s-ingress-cluster-apigw',
    sys_created_on: '2026-09-18 16:22:10',
  },
  {
    sys_id: 'INC0948198',
    number: 'INC0948198',
    short_description: 'Postgres connection pool starvation following automated batch migration',
    priority: '2 - High',
    state: 'Active',
    caller: 'David Chen (Staff DBA)',
    assignment_group: 'Database Reliability',
    cmdb_ci: 'prod-customer-portal-db-01',
    sys_created_on: '2026-09-18 15:10:04',
  },
  {
    sys_id: 'INC0947921',
    number: 'INC0947921',
    short_description: 'Vector Index synchronization lag in Now Assist Knowledge Base',
    priority: '3 - Moderate',
    state: 'Awaiting Caller',
    caller: 'Elena Rostova (AI Product Lead)',
    assignment_group: 'ServiceNow AI Engineering',
    cmdb_ci: 'servicenow-mid-server-prod-04',
    sys_created_on: '2026-09-18 11:45:30',
  },
];

// OpenTelemetry trace store
let otelTraceHistory: any[] = [];

// ==========================================
// 1. Agent Studio & Agentic Execution API
// ==========================================
app.post('/api/agents/execute', async (req: Request, res: Response) => {
  const { incidentQuery, selectedAgentId, humanInTheLoopApproval } = req.body;
  const traceId = 'trace_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
  const startTime = Date.now();

  const prompt =
    incidentQuery ||
    'P1: Checkout service throwing 504 gateway timeouts. Multiple customer transactions failing. Need immediate triage, root cause analysis, and remediation plan.';

  let triageSummary = '';
  let proposedActions: any[] = [];
  let executionSteps: any[] = [];
  let simulatedTokens = { prompt: 840, completion: 420 };
  let modelUsed = 'gemini-3.8-flash (via ServiceNow Cloud Gateway)';

  const ai = getGenAI();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `You are the Lead Staff AI Engine for ServiceNow AI Agent Studio & Autonomous Incident Remediation.
Given the incident query: "${prompt}"

Produce a structured JSON response with:
1. "rootCauseAnalysis": concise, highly technical diagnosis referencing CMDB CIs, network timeouts, or database pool exhaustion.
2. "agentHandoffLog": an array of 3-4 agent collaboration steps between:
   - "Router & Intent Agent"
   - "CMDB & Topology Agent" (calls Workflow Data Fabric)
   - "A2A Cloud Diagnostics Agent" (MCP protocol call to AWS/Azure)
   - "Autonomous Remediation & Change Agent"
3. "proposedRemediation": actionable resolution steps including a ServiceNow Change Request (Normal vs Emergency) and rollback safety plan.
4. "governanceAudit": AI Control Tower evaluation summary (PII check, safety score 0.0-1.0, confidence score 0.0-1.0, humanInTheLoopRequired boolean).

Return valid parseable JSON only.`,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const text = response.text || '{}';
      const parsed = JSON.parse(text);
      triageSummary =
        parsed.rootCauseAnalysis ||
        'Identified cascading connection bottleneck across ingress gateway.';
      executionSteps = parsed.agentHandoffLog || [];
      proposedActions = parsed.proposedRemediation ? [parsed.proposedRemediation] : [];
    } catch (err) {
      console.warn('Gemini call fell back to deterministic high-fidelity mock:', err);
    }
  }

  // Fallback high-fidelity structured data if AI not present or failed
  if (!triageSummary) {
    triageSummary = `Automated Root Cause Diagnosis (RCA): Analysis of telemetry from 'k8s-ingress-cluster-apigw' and 'prod-customer-portal-db-01' confirms connection starvation. An unindexed query deployed in Change CHG0089241 locked the active connection pool at 16:15 UTC, triggering cascading 504 timeouts across the Envoy proxy mesh.`;
    executionSteps = [
      {
        agent: 'ServiceNow Intent & Router Agent',
        protocol: 'Native AI Agent Studio Runtime',
        action:
          'Extracted entities: Severity=P1, CI=k8s-ingress-cluster-apigw, Caller=VP E-Commerce',
        status: 'COMPLETED',
        latencyMs: 142,
      },
      {
        agent: 'Workflow Data Fabric CMDB Agent',
        protocol: 'GlideRecord Semantic Binding (cmdb_rel_ci)',
        action:
          'Traversed dependency graph: k8s ingress -> API Gateway -> Postgres DB-01 -> Redis Cluster',
        status: 'COMPLETED',
        latencyMs: 198,
      },
      {
        agent: 'CloudWatch & Azure MCP Diagnostics Agent',
        protocol: 'Model Context Protocol (JSON-RPC 2.0)',
        action:
          "Executed tool 'aws_cloudwatch_query_metrics': ActiveConnections=500/500 (Max Capacity Exhausted)",
        status: 'COMPLETED',
        latencyMs: 310,
      },
      {
        agent: 'AI Control Tower Governance Gatekeeper',
        protocol: 'Enterprise Policy Engine v4.2',
        action:
          'Evaluated PII, Guardrails, and Change Risk. Flagged: Action modifies Tier 0 DB. Enforcing Human-in-the-Loop (HITL) authorization.',
        status: humanInTheLoopApproval ? 'APPROVED_BY_STAFF_ENG' : 'AWAITING_HITL_APPROVAL',
        latencyMs: 85,
      },
      {
        agent: 'Remediation & Change Automation Agent',
        protocol: 'A2A Inter-Agent Protocol',
        action:
          'Generated Emergency Change CHG0099412: Temporarily increase pool threshold to 750 & terminate orphaned lock PID 8492.',
        status: humanInTheLoopApproval ? 'EXECUTED_SUCCESSFULLY' : 'PENDING_APPROVAL',
        latencyMs: 220,
      },
    ];
    proposedActions = [
      {
        type: 'Emergency Change Request (CHG0099412)',
        action: 'Drain orphaned connection PID 8492 & scale connection pool to 750',
        targetCI: 'prod-customer-portal-db-01',
        riskScore: 'Low (Automated rollback script validated in staging)',
        approvalStatus: humanInTheLoopApproval ? 'Approved' : 'Pending Human Sign-off',
      },
      {
        type: 'GlideRecord Automated Update',
        action: 'Update INC0948210 work notes and correlate 14 related incident tickets',
        targetCI: 'k8s-ingress-cluster-apigw',
        riskScore: 'Zero Risk (Read/Append only)',
        approvalStatus: 'Auto-Approved',
      },
    ];
  }

  const durationMs = Date.now() - startTime;

  // Generate OpenTelemetry Spans conforming to gen_ai semantic conventions
  const otelTrace = {
    traceId,
    timestamp: new Date().toISOString(),
    serviceName: 'servicenow-ai-agent-studio',
    operationName: 'agentic.incident_remediation.workflow',
    durationMs,
    attributes: {
      'gen_ai.system': 'ServiceNow NowLLM / Google Gemini Hybrid Gateway',
      'gen_ai.request.model': modelUsed,
      'gen_ai.usage.prompt_tokens': simulatedTokens.prompt,
      'gen_ai.usage.completion_tokens': simulatedTokens.completion,
      'gen_ai.usage.total_tokens': simulatedTokens.prompt + simulatedTokens.completion,
      'servicenow.agent.studio.version': 'Xanadu / Washington DC',
      'servicenow.data_fabric.connected_tables': [
        'incident',
        'cmdb_ci',
        'change_request',
        'sys_user',
      ],
      'governance.control_tower.policy_checks': 'PASSED (0 Violations)',
      'mcp.protocol.version': '2024-11-05',
      'a2a.negotiation.status': 'CONSENSUS_REACHED',
    },
    spans: [
      {
        spanId: 'span_root_' + Math.random().toString(36).substring(2, 8),
        name: 'agent.orchestrator.triage',
        kind: 'SERVER',
        durationMs: durationMs,
        status: 'OK',
        events: [
          { name: 'incident_received', time: 0 },
          { name: 'agents_spawned', time: 45 },
        ],
      },
      {
        spanId: 'span_data_fabric_' + Math.random().toString(36).substring(2, 8),
        name: 'workflow_data_fabric.cmdb_vector_search',
        kind: 'CLIENT',
        durationMs: 198,
        status: 'OK',
        attributes: { 'db.system': 'ServiceNow GlideRecord + Vector Fabric', 'cmdb.ci_count': 4 },
      },
      {
        spanId: 'span_llm_' + Math.random().toString(36).substring(2, 8),
        name: 'llm.generate_content',
        kind: 'INTERNAL',
        durationMs: 460,
        status: 'OK',
        attributes: { 'gen_ai.model': 'gemini-3.8-flash', 'gen_ai.tokens': 1260 },
      },
      {
        spanId: 'span_mcp_' + Math.random().toString(36).substring(2, 8),
        name: 'mcp.tool_call.aws_cloudwatch_query_metrics',
        kind: 'CLIENT',
        durationMs: 310,
        status: 'OK',
        attributes: { 'mcp.tool.name': 'aws_cloudwatch_query_metrics', 'rpc.method': 'tools/call' },
      },
      {
        spanId: 'span_control_tower_' + Math.random().toString(36).substring(2, 8),
        name: 'ai_control_tower.guardrail_evaluation',
        kind: 'INTERNAL',
        durationMs: 85,
        status: 'OK',
        attributes: {
          'policy.pii_redacted': false,
          'policy.hitl_enforced': !humanInTheLoopApproval,
        },
      },
    ],
  };

  otelTraceHistory.unshift(otelTrace);
  if (otelTraceHistory.length > 30) otelTraceHistory.pop();

  return res.json({
    success: true,
    traceId,
    durationMs,
    modelUsed,
    triageSummary,
    executionSteps,
    proposedActions,
    governanceStatus: humanInTheLoopApproval ? 'GOVERNED_APPROVED' : 'REQUIRES_HITL',
    otelTrace,
  });
});

// ==========================================
// 2. AI Control Tower Governance Policy API
// ==========================================
app.post('/api/control-tower/evaluate', async (req: Request, res: Response) => {
  const { payload, policyToggles } = req.body;
  const content = payload?.text || '';

  // Policy evaluation checks
  const piiRegexPatterns = [
    { type: 'Social Security Number (SSN)', regex: /\b\d{3}-\d{2}-\d{4}\b/g },
    { type: 'Credit Card / PCI Data', regex: /\b(?:\d{4}[ -]?){3}\d{4}\b/g },
    { type: 'AWS / Cloud Access Key', regex: /AKIA[0-9A-Z]{16}/g },
    {
      type: 'Private JWT Token',
      regex: /eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/g,
    },
    {
      type: 'ServiceNow Passwords / Hashes',
      regex: /(password|secret|apikey)\s*[:=]\s*['"][^'"]+['"]/gi,
    },
  ];

  const violations: any[] = [];
  let redactedText = content;

  if (policyToggles?.piiRedaction !== false) {
    for (const p of piiRegexPatterns) {
      if (p.regex.test(content)) {
        violations.push({
          policyId: 'POL-SEC-001',
          severity: 'HIGH',
          category: 'PII & Secret Leakage',
          description: `Detected unauthorized ${p.type} in payload.`,
        });
        redactedText = redactedText.replace(
          p.regex,
          `[REDACTED_${p.type.toUpperCase().replace(/\s+/g, '_')}]`
        );
      }
    }
  }

  // Prompt injection & jailbreak heuristic
  const injectionPatterns = [
    /ignore previous instructions/i,
    /bypass guardrails/i,
    /you are now DAN/i,
    /system prompt override/i,
    /elevate role to admin/i,
  ];

  if (policyToggles?.jailbreakDefense !== false) {
    for (const pattern of injectionPatterns) {
      if (pattern.test(content)) {
        violations.push({
          policyId: 'POL-SEC-002',
          severity: 'CRITICAL',
          category: 'Adversarial Prompt Injection',
          description: 'Detected attempted system prompt override or role elevation exploit.',
        });
      }
    }
  }

  // Token budget quota check
  const estimatedTokens = Math.ceil(content.length / 4);
  const tokenQuotaCap = policyToggles?.tokenCap || 2000;
  if (estimatedTokens > tokenQuotaCap) {
    violations.push({
      policyId: 'POL-FIN-003',
      severity: 'MEDIUM',
      category: 'Cost & Token Budget Exceeded',
      description: `Input tokens (${estimatedTokens}) exceed tier maximum cap (${tokenQuotaCap}).`,
    });
  }

  const passed =
    violations.filter((v) => v.severity === 'CRITICAL' || v.severity === 'HIGH').length === 0;

  return res.json({
    timestamp: new Date().toISOString(),
    evaluatedLength: content.length,
    estimatedTokens,
    passed,
    decision: passed ? 'ALLOW' : 'BLOCK_OR_REMEDIATE',
    violations,
    redactedText,
    confidenceScore: passed ? 0.98 : 0.42,
    hallucinationRisk: 'LOW (0.04)',
    humanInTheLoopRequired: violations.length > 0,
    enforcementMetrics: {
      evaluationTimeMs: 14,
      guardrailVersion: 'ServiceNow-ControlTower-Enterprise-2026.3',
      auditTraceSysId: 'sys_audit_ct_' + Math.random().toString(36).substring(2, 9),
    },
  });
});

// ==========================================
// 3. MCP (Model Context Protocol) Server & A2A
// ==========================================
const availableMcpTools = [
  {
    name: 'servicenow_query_cmdb',
    description:
      'Search configuration items, relationships, and CI health in ServiceNow CMDB via Workflow Data Fabric',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Encoded query or CI name' },
        limit: { type: 'number', default: 5 },
      },
      required: ['query'],
    },
  },
  {
    name: 'servicenow_create_change_request',
    description:
      'Creates a governed Change Request (Normal/Emergency) with automated CAB risk evaluation',
    inputSchema: {
      type: 'object',
      properties: {
        short_description: { type: 'string' },
        type: { type: 'string', enum: ['Emergency', 'Normal', 'Standard'] },
        cmdb_ci: { type: 'string' },
        justification: { type: 'string' },
      },
      required: ['short_description', 'type', 'cmdb_ci'],
    },
  },
  {
    name: 'aws_cloudwatch_query_metrics',
    description: 'Query AWS CloudWatch metric alarms, CPU utilization, and connection statistics',
    inputSchema: {
      type: 'object',
      properties: {
        namespace: { type: 'string' },
        metricName: { type: 'string' },
        period: { type: 'number' },
      },
      required: ['namespace', 'metricName'],
    },
  },
  {
    name: 'azure_entra_audit_logs',
    description:
      'Retrieve sign-in logs and privilege escalation audit events from Microsoft Entra ID',
    inputSchema: {
      type: 'object',
      properties: {
        userPrincipalName: { type: 'string' },
        lookbackHours: { type: 'number' },
      },
      required: ['userPrincipalName'],
    },
  },
];

app.get('/api/mcp/tools', (req: Request, res: Response) => {
  res.json({
    jsonrpc: '2.0',
    protocolVersion: '2024-11-05',
    serverInfo: {
      name: 'servicenow-mcp-enterprise-gateway',
      version: '1.4.0',
      capabilities: {
        tools: { listChanged: false },
        resources: { subscribe: true },
        prompts: { listChanged: false },
      },
    },
    tools: availableMcpTools,
  });
});

app.post('/api/mcp/call', async (req: Request, res: Response) => {
  const { toolName, arguments: toolArgs } = req.body;

  if (toolName === 'servicenow_query_cmdb') {
    const q = (toolArgs?.query || '').toLowerCase();
    const results = mockCMDB.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.class.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q)
    );
    return res.json({
      jsonrpc: '2.0',
      result: {
        content: [
          {
            type: 'text',
            text: JSON.stringify(results.length > 0 ? results : mockCMDB, null, 2),
          },
        ],
      },
    });
  }

  if (toolName === 'servicenow_create_change_request') {
    const newCHG = {
      sys_id: 'chg_' + Math.random().toString(36).substring(2, 9),
      number: 'CHG00' + Math.floor(10000 + Math.random() * 90000),
      short_description: toolArgs?.short_description || 'Automated Remediation Change',
      type: toolArgs?.type || 'Emergency',
      cmdb_ci: toolArgs?.cmdb_ci || 'prod-customer-portal-db-01',
      risk_score: 'Calculated Low (Automated Guardrails Enforced)',
      state: 'Scheduled for Implementation',
      created_by: 'ServiceNow AI Agent (Staff AI Autonomous Suite)',
    };
    return res.json({
      jsonrpc: '2.0',
      result: {
        content: [{ type: 'text', text: JSON.stringify(newCHG, null, 2) }],
      },
    });
  }

  if (toolName === 'aws_cloudwatch_query_metrics') {
    return res.json({
      jsonrpc: '2.0',
      result: {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                metric: toolArgs?.metricName || 'DatabaseConnections',
                namespace: toolArgs?.namespace || 'AWS/RDS',
                datapoints: [
                  { timestamp: '2026-09-18T16:10:00Z', value: 120 },
                  { timestamp: '2026-09-18T16:15:00Z', value: 498 },
                  { timestamp: '2026-09-18T16:20:00Z', value: 500, alert: 'THRESHOLD_BREACHED' },
                ],
                status: 'CRITICAL_ALARM',
              },
              null,
              2
            ),
          },
        ],
      },
    });
  }

  return res.json({
    jsonrpc: '2.0',
    result: {
      content: [
        {
          type: 'text',
          text: `Tool ${toolName} executed successfully with arguments: ${JSON.stringify(toolArgs)}`,
        },
      ],
    },
  });
});

// ==========================================
// 4. OpenTelemetry Traces & Observability
// ==========================================
app.get('/api/otel/traces', (req: Request, res: Response) => {
  res.json({
    traces: otelTraceHistory,
    totalTraces: otelTraceHistory.length,
    semanticConvention: 'OpenTelemetry GenAI v1.28.0',
    exporter: 'OTLP / gRPC -> ServiceNow AI Control Tower Telemetry Collector',
  });
});

// ==========================================
// 5. Staff AI Engineer Architecture & Interview Defense Q&A
// ==========================================
app.post('/api/interview/ask', async (req: Request, res: Response) => {
  const { question, category } = req.body;
  const ai = getGenAI();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `You are a candidate interviewing for a prestigious 'Staff AI Engineer' role at ServiceNow.
The interviewer is a Senior Director / Principal Architect at ServiceNow.
Question: "${question}"
Category: "${category || 'Enterprise AI Architecture'}"

Provide an authoritative, articulate, Staff-level engineering answer.
Your response MUST demonstrate:
1. Deep native ServiceNow mastery (AI Agent Studio, Skill Kit, Workflow Data Fabric, AI Control Tower, GlideRecord, Script Includes).
2. Advanced AI systems design (LLM orchestration, MCP JSON-RPC protocol, Agent2Agent handoffs, OpenTelemetry GenAI semantic conventions, vector search chunking & hybrid retrieval).
3. Technical leadership & governance (responsible AI guardrails, PII redaction, token rate-limiting, human-in-the-loop patterns, mentoring junior engineers).
4. Pragmatic trade-offs (latency vs accuracy, cost governance, fail-safe fallbacks).

Format cleanly with clear headings and bullet points.`,
        config: {
          temperature: 0.3,
        },
      });
      return res.json({ answer: response.text, liveAi: true });
    } catch (e) {
      console.warn('Gemini interview response fallback:', e);
    }
  }

  // Rich deterministic fallback for Staff level answer
  return res.json({
    answer: `### Staff AI Architectural Strategy & Defense

**1. Architectural Decomposition in ServiceNow Ecosystem:**
In modern enterprise environments, scaling Agentic AI on ServiceNow requires separating the **Cognitive Plane** (LLM reasoning and intent parsing) from the **Execution Plane** (Workflow Data Fabric and GlideRecord transactions). By using **ServiceNow AI Agent Studio**, we encapsulate domain responsibilities into specialized agents (e.g., Triage, Change Management, CMDB Topology).

**2. Governed Multi-Agent Interoperability (MCP & A2A):**
Rather than ad-hoc API integrations, we standardize on **Model Context Protocol (MCP)** for external tool access (CloudWatch, Azure Entra) and the **Agent2Agent (A2A)** specification for inter-agent delegation. 
- Every agent exposes a strictly typed Agent Card declaring capabilities, trust boundaries, and authorization scopes.
- Context is passed using structured JSON-RPC envelopes with cryptographically signed intent tokens, preventing unauthorized tool escalation.

**3. Enterprise Governance via AI Control Tower:**
To ensure zero data exfiltration and responsible AI compliance across 50,000+ enterprise seats:
- **Pre-Execution Guardrails**: Dual-layer regex and semantic embeddings redact PII, PCI, and credential secrets before tokenization.
- **Human-In-The-Loop (HITL)**: Any operation touching Tier-0 CMDB CIs or creating Emergency Changes (CHG) requires an automated approval gate with fallback timeout.
- **Cost & Token Quotas**: Departmental budget buckets prevent runaway recursion and prompt loops.

**4. Production Observability with OpenTelemetry:**
Observability is non-negotiable at Staff level. We instrument every agent hop using **OpenTelemetry GenAI Semantic Conventions** (\`gen_ai.system\`, \`gen_ai.usage.prompt_tokens\`, \`gen_ai.usage.completion_tokens\`). This enables end-to-end trace correlation from the initial user prompt in Virtual Agent down to the exact Mid Server REST execution.`,
    liveAi: false,
  });
});

// ==========================================
// Vite Integration for Dev & Prod
// ==========================================
export { app };

/* v8 ignore start */
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ServiceNow Staff AI Engineer Showcase server running on http://0.0.0.0:${PORT}`);
  });
}

if (process.env.NODE_ENV !== 'test' && !process.env.VITEST) {
  start();
}
/* v8 ignore stop */
