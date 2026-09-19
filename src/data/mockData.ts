import {
  AgentNode,
  IncidentRecord,
  CmdbCI,
  GovernancePolicy,
  SkillKitDefinition,
  McpToolItem,
  InterviewDefenseScenario,
} from '../types';

export const initialAgents: AgentNode[] = [
  {
    id: 'agent-router',
    name: 'Intent & Safety Router Agent',
    role: 'Initial Request Triage & Security Clearance',
    type: 'router',
    status: 'idle',
    confidence: 0.99,
    model: 'ServiceNow NowLLM v3 / Gemini Hybrid',
    tools: ['intent_classifier', 'security_clearance_validator', 'pii_pre_filter'],
    description:
      'Evaluates inbound incident requests, classifies urgency, and establishes execution trust boundary.',
  },
  {
    id: 'agent-fabric',
    name: 'Workflow Data Fabric & CMDB Agent',
    role: 'Graph Traversal & Topological Context Injection',
    type: 'data-fabric',
    status: 'idle',
    confidence: 0.96,
    model: 'ServiceNow Domain Embedding + Vector Search',
    tools: ['cmdb_topology_search', 'incident_history_correlator', 'change_collision_check'],
    description:
      'Traverses GlideRecord CMDB relationships, links upstream services to downstream dependencies, and retrieves similar incident vectors.',
  },
  {
    id: 'agent-diagnostics',
    name: 'A2A Cloud Diagnostics Agent',
    role: 'Multi-Agent MCP Tool Execution & Cloud Health',
    type: 'diagnostics',
    status: 'idle',
    confidence: 0.94,
    model: 'Claude 3.5 / Gemini 3.8 Flash Cloud Gateway',
    tools: ['aws_cloudwatch_query_metrics', 'azure_entra_audit_logs', 'kubernetes_pod_logs'],
    description:
      'Performs governed Model Context Protocol (MCP) tool execution across AWS, Azure, and on-premise Mid Servers.',
  },
  {
    id: 'agent-governance',
    name: 'AI Control Tower Policy Gatekeeper',
    role: 'Policy Enforcement & Human-in-the-Loop Orchestration',
    type: 'governance',
    status: 'idle',
    confidence: 0.98,
    model: 'ServiceNow Control Tower Policy Engine v4.2',
    tools: ['hitl_evaluator', 'guardrail_verifier', 'token_budget_controller'],
    description:
      'Evaluates actions against organizational governance policies. Enforces approval gates for high-risk actions.',
  },
  {
    id: 'agent-remediation',
    name: 'Autonomous Remediation & Change Agent',
    role: 'Change Request Generation & Script Execution',
    type: 'remediation',
    status: 'idle',
    confidence: 0.95,
    model: 'ServiceNow CodeLLM / Script Include Engine',
    tools: ['create_change_request', 'gliderecord_safe_updater', 'rollback_generator'],
    description:
      'Generates governed Emergency or Standard Change Requests and outputs audited GlideRecord update sets.',
  },
];

export const mockIncidentsList: IncidentRecord[] = [
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
  {
    sys_id: 'INC0947602',
    number: 'INC0947602',
    short_description: 'Suspicious privileged role assignment on Azure AD tenant connector',
    priority: '1 - Critical',
    state: 'Investigating',
    caller: 'Marcus Vance (CISO)',
    assignment_group: 'SecOps & Threat Intelligence',
    cmdb_ci: 'servicenow-mid-server-prod-04',
    sys_created_on: '2026-09-18 09:30:15',
  },
];

export const mockCmdbList: CmdbCI[] = [
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
    tier: 'Tier 0 (Mission Critical)',
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

export const initialPolicies: GovernancePolicy[] = [
  {
    id: 'POL-SEC-001',
    name: 'Zero-Exfiltration PII & Secret Redaction',
    category: 'Security',
    rule: 'Inspect all agent prompt and tool-call payloads for SSN, PCI card numbers, AWS/Azure access keys, and passwords before dispatch.',
    enforcement: 'Redact & Warn',
    status: 'Active',
    violationCount: 142,
    description:
      'Dual-layer deterministic regex and transformer entity recognition sanitizes data prior to sending to cloud LLMs.',
  },
  {
    id: 'POL-SEC-002',
    name: 'Adversarial Prompt Injection & Jailbreak Defense',
    category: 'Security',
    rule: "Intercept prompt injection patterns ('ignore previous instructions', 'DAN mode', system prompt extraction).",
    enforcement: 'Block',
    status: 'Active',
    violationCount: 29,
    description:
      'Applies input isolation delimiters, semantic classification, and prompt sanitization.',
  },
  {
    id: 'POL-OPS-003',
    name: 'Tier-0 CMDB Change Human-in-the-Loop Gate',
    category: 'Operational',
    rule: 'Any agent proposal to restart, modify schema, or drain connections on a Tier 0 CMDB CI must hold for human authorization.',
    enforcement: 'HITL Gate',
    status: 'Active',
    violationCount: 68,
    description:
      'Prevents runaway autonomous changes from triggering unplanned production outages.',
  },
  {
    id: 'POL-FIN-004',
    name: 'Enterprise Departmental Token Quotas & Cost Caps',
    category: 'Financial',
    rule: 'Limit single-transaction tokens to 4,000 and enforce department monthly budgets to avoid cloud billing spikes.',
    enforcement: 'Block',
    status: 'Active',
    violationCount: 12,
    description:
      'Tracks prompt and completion token counts using OpenTelemetry GenAI semantic conventions.',
  },
  {
    id: 'POL-RAI-005',
    name: 'Hallucination Grounding & Citation Verification',
    category: 'Responsible AI',
    rule: 'All incident root cause statements must be grounded in verified Workflow Data Fabric records (min confidence 0.85).',
    enforcement: 'Audit Only',
    status: 'Active',
    violationCount: 5,
    description:
      'Computes cosine similarity between generated findings and ground-truth CMDB / Knowledge records.',
  },
];

export const skillKitList: SkillKitDefinition[] = [
  {
    id: 'skill-rca-correlator',
    name: 'Automated Incident RCA & Topological Correlator',
    category: 'ITSM',
    inputs: [
      {
        name: 'incident_sys_id',
        type: 'string',
        description: 'ServiceNow incident unique identifier',
      },
      {
        name: 'lookback_hours',
        type: 'integer',
        description: 'Time horizon to evaluate past change requests',
      },
    ],
    targetTable: 'incident',
    systemPrompt: `You are an expert ServiceNow SRE Skill Kit module. Analyze the incident, CMDB CI relationships, and recent change requests to pinpoint root cause with confidence score and rollback prescription.`,
    fewShotExamples: 3,
    outputSchema: `{\n  "root_cause": "string",\n  "impacted_cis": ["string"],\n  "confidence": 0.0-1.0,\n  "remediation_plan": "string"\n}`,
    glideScript: `// ServiceNow Server-Side Script Include
var IncidentRCACorrelator = Class.create();
IncidentRCACorrelator.prototype = {
  initialize: function() {},
  
  correlate: function(incidentSysId) {
    var grInc = new GlideRecord('incident');
    if (!grInc.get(incidentSysId)) return null;
    
    var ciSysId = grInc.getValue('cmdb_ci');
    var relatedChanges = this.findRecentChanges(ciSysId);
    
    // Invoke Skill Kit AI Runtime with Data Fabric Context
    var payload = {
      incident_number: grInc.getValue('number'),
      short_description: grInc.getValue('short_description'),
      ci_name: grInc.cmdb_ci.getDisplayValue(),
      changes: relatedChanges
    };
    
    var aiResponse = sn_skill_kit.SkillRunner.execute('skill-rca-correlator', payload);
    return JSON.parse(aiResponse);
  },
  
  findRecentChanges: function(ciSysId) {
    var grChg = new GlideRecord('change_request');
    grChg.addQuery('cmdb_ci', ciSysId);
    grChg.addQuery('sys_created_on', '>=', gs.hoursAgo(24));
    grChg.query();
    var list = [];
    while (grChg.next()) {
      list.push({ number: grChg.getValue('number'), description: grChg.getValue('short_description') });
    }
    return list;
  },
  
  type: 'IncidentRCACorrelator'
};`,
  },
  {
    id: 'skill-gliderecord-generator',
    name: 'Governed GlideRecord Script Generator with ACL Guardrails',
    category: 'Platform',
    inputs: [
      {
        name: 'business_requirement',
        type: 'string',
        description: 'Natural language description of platform automation',
      },
      { name: 'target_table', type: 'string', description: 'ServiceNow table schema' },
    ],
    targetTable: 'sys_script_include',
    systemPrompt: `Generate clean, performant, enterprise ServiceNow JavaScript. Enforce GlideRecordSecure for ACL checks, avoid GlideRecord in loops, and include gs.error logging.`,
    fewShotExamples: 4,
    outputSchema: `{\n  "script_name": "string",\n  "script_code": "string",\n  "performance_rating": "O(1) / O(N)",\n  "acl_compliant": true\n}`,
    glideScript: `// Example of generated production script
(function executeAutomation(current, previous /*null when async*/) {
  var grTask = new GlideRecordSecure('task');
  grTask.addActiveQuery();
  grTask.addQuery('priority', 1);
  grTask.query();
  
  while (grTask.next()) {
    gs.info('Processing Critical Task: ' + grTask.getValue('number'));
  }
})(current, previous);`,
  },
];

export const mcpToolsCatalog: McpToolItem[] = [
  {
    name: 'servicenow_query_cmdb',
    description:
      'Search configuration items, relationships, and CI health in ServiceNow CMDB via Workflow Data Fabric',
    category: 'ServiceNow',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Encoded query or CI name' },
        limit: { type: 'number', description: 'Max CIs to return' },
      },
      required: ['query'],
    },
    samplePayload: { query: 'nameLIKEk8s^operational_status=1', limit: 3 },
  },
  {
    name: 'servicenow_create_change_request',
    description:
      'Creates a governed Change Request (Normal/Emergency) with automated CAB risk evaluation',
    category: 'ServiceNow',
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
    samplePayload: {
      short_description: 'Emergency Connection Pool Scaling for Portal DB',
      type: 'Emergency',
      cmdb_ci: 'prod-customer-portal-db-01',
      justification: 'Critical P1 Outage: Ingress connection timeout mitigation.',
    },
  },
  {
    name: 'aws_cloudwatch_query_metrics',
    description:
      'Query AWS CloudWatch metric alarms, CPU utilization, and RDS connection statistics',
    category: 'Cloud Infrastructure',
    inputSchema: {
      type: 'object',
      properties: {
        namespace: { type: 'string' },
        metricName: { type: 'string' },
        period: { type: 'number' },
      },
      required: ['namespace', 'metricName'],
    },
    samplePayload: { namespace: 'AWS/RDS', metricName: 'DatabaseConnections', period: 300 },
  },
  {
    name: 'azure_entra_audit_logs',
    description:
      'Retrieve sign-in logs and privilege escalation audit events from Microsoft Entra ID',
    category: 'Identity & IAM',
    inputSchema: {
      type: 'object',
      properties: {
        userPrincipalName: { type: 'string' },
        lookbackHours: { type: 'number' },
      },
      required: ['userPrincipalName'],
    },
    samplePayload: { userPrincipalName: 'service-account-nowai@enterprise.com', lookbackHours: 6 },
  },
];

export const interviewScenarios: InterviewDefenseScenario[] = [
  {
    id: 'def-01',
    title: 'Governed Multi-Agent Protocol: Why MCP & A2A over ad-hoc REST?',
    category: 'Multi-Agent',
    question:
      'How do you architect multi-agent collaboration across ServiceNow and external clouds (AWS/Azure) without creating security blind spots or cascading execution loops?',
    staffLevelKeyPoints: [
      'Model Context Protocol (MCP) formalizes tool discovery, schema contract, and execution safety via standard JSON-RPC 2.0.',
      'Agent2Agent (A2A) defines verifiable Agent Cards with declared capabilities, cryptographic identity, and scope tokens.',
      'Execution DAG and recursion depth limits (max hops = 5) prevent infinite tool-call oscillations.',
      'AI Control Tower intercepts every inter-agent envelope to audit authorization and redact cross-boundary PII.',
    ],
    suggestedAnswer:
      'At Staff level, ad-hoc REST APIs between agents lead to catastrophic failure modes: schema drift, privilege escalation, and circular loops. By adopting Model Context Protocol (MCP), tools declare JSON schema contracts and execute in sandbox boundaries. For inter-agent delegation (A2A), we use structured negotiation: Agent A presents a signed delegation token; Agent B verifies the role scope before accepting the task. We maintain a unified OpenTelemetry trace context across all hops and enforce a strict hard-cap of 5 delegation layers to mathematically prevent agent looping.',
  },
  {
    id: 'def-02',
    title: 'AI Control Tower: Scaling Governance Across 50,000 Enterprise Users',
    category: 'Governance',
    question:
      'How do you implement and scale AI Control Tower policies so governance does not introduce debilitating latency or false-positive blocks for business users?',
    staffLevelKeyPoints: [
      'Tiered inspection: Fast deterministic regex (<5ms) for PII/PCI followed by lightweight embedding classifiers (<15ms).',
      'Asynchronous policy auditing for low-risk read actions vs synchronous blocking gates for high-risk write actions.',
      'Dynamic Human-In-The-Loop (HITL) thresholding keyed directly to ServiceNow CMDB business criticality (Tier 0 vs Tier 3).',
      "Centralized policy drift monitoring with daily shadow evaluation before turning policies to 'Block' mode.",
    ],
    suggestedAnswer:
      'A common Staff AI anti-pattern is running heavy LLM-based guardrails on every single token, which blows up P99 latency past 3 seconds. In our AI Control Tower architecture, we implement a multi-stage evaluation pipeline: Layer 1 is sub-millisecond deterministic regex compiled in memory (catching 90% of raw credit card, SSN, and secret patterns). Layer 2 uses a distilled, quantized local embedding model to check for semantic prompt injection (sub-20ms). Synchronous blocking is reserved strictly for high-impact mutations on Tier-0 CIs; all informational queries pass through low-overhead async telemetry logging.',
  },
  {
    id: 'def-03',
    title: 'Workflow Data Fabric: Bridging Relational GlideRecord with Vector Search',
    category: 'Architecture',
    question:
      "How does ServiceNow's Workflow Data Fabric reconcile real-time relational transactional data (incidents, CMDB) with semantic vector search?",
    staffLevelKeyPoints: [
      'Hybrid Retrieval: Dense vector embeddings (semantic similarity) combined with sparse BM25 / GlideRecord query filters (strict relational security).',
      'Change Data Capture (CDC) via ServiceNow Business Rules streams updated records into vector indexes in near-real-time (<2 sec lag).',
      'Access Control List (ACL) inheritance: vector search results are filtered through GlideRecordSecure to ensure zero unauthorized record visibility.',
      'Context Window Optimization: dynamic semantic pruning fits only relevant CI topology into the LLM context.',
    ],
    suggestedAnswer:
      "Standard vector databases are oblivious to ServiceNow ACLs and relational hierarchy. Our Workflow Data Fabric implementation enforces 'Late Security Binding': we perform hybrid retrieval (dense vector embeddings for semantic recall + sparse relational filters for active operational status), but before any document enters the agent context window, it must pass through ServiceNow GlideRecordSecure. If an engineer doesn't have read rights on `sys_user` or confidential incident work notes, the semantic vector is mathematically pruned before LLM ingestion.",
  },
  {
    id: 'def-04',
    title: 'OpenTelemetry for GenAI: Measuring Observability Beyond Simple Latency',
    category: 'Scalability',
    question:
      'What specific OpenTelemetry telemetry signals do you collect for AI systems, and how do you use them to drive operational resilience?',
    staffLevelKeyPoints: [
      'Adoption of OTel GenAI Semantic Conventions (`gen_ai.system`, `gen_ai.request.model`, `gen_ai.usage.prompt_tokens`, `gen_ai.usage.completion_tokens`).',
      'Tracking Time to First Token (TTFT), Inter-Token Latency (ITL), and Tool Execution Latency in waterfall spans.',
      'Continuous Cost Attribution: tagging traces with `cost.department` and `cost.use_case` for enterprise chargeback.',
      'Synthesizing Hallucination Rate & Guardrail Rejection rate directly into Prometheus/Datadog/Now metrics.',
    ],
    suggestedAnswer:
      'Basic APM metrics like CPU and HTTP 200/500 are insufficient for GenAI. We instrumented our entire agent fleet using OpenTelemetry GenAI Semantic Conventions v1.28.0. We capture: 1) Token economics (prompt vs completion tokens) tagged with enterprise cost centers; 2) Cognitive latency breakdown: separating TTFT from MCP tool execution latency; 3) Policy intervention spans: tracking whether an agent paused for HITL or had its response rewritten by Control Tower. This allows SREs to correlate a sudden rise in P99 latency directly to an external vector DB slowdown or prompt size bloat.',
  },
  {
    id: 'def-05',
    title: 'Technical Mentorship & Setting Direction for AI Engineers',
    category: 'Mentorship',
    question:
      'As a Staff AI Engineer, how do you elevate junior and senior engineers, define architectural RFCs, and establish responsible AI culture?',
    staffLevelKeyPoints: [
      "Authoring foundational Architectural RFCs (e.g., 'Governed Agentic State Machine Standard', 'Safe GlideRecord LLM Generation').",
      "Designing reusable Skill Kit templates and test-driven evaluation harnesses so teams don't reinvent prompt boilerplate.",
      "Running 'Red Team AI Game Days' where engineers attempt prompt injection and data exfiltration against Control Tower.",
      'Pair-programming and code reviews focusing on scalability, security ACLs, and token efficiency.',
    ],
    suggestedAnswer:
      'Staff leadership is about force multiplication, not being the solo coder. I establish clear architectural guardrails through lightweight RFCs, create golden-path boilerplate (such as pre-tested Skill Kit scaffolds with built-in OTel tracing), and mentor engineers on how to debug agentic systems. Furthermore, I organize Responsible AI Red Team exercises where engineers simulate real-world adversarial attacks against our AI Control Tower, turning abstract governance guidelines into visceral, practical engineering habits.',
  },
];

export const candidateProfile = {
  name: 'Candidate Staff AI Engineer',
  targetRole: 'Staff AI Engineer - ServiceNow Platform & Cloud',
  experienceYears: 9,
  genAiYears: 4,
  certifications: [
    {
      name: 'ServiceNow Certified AI Implementation Specialist (Xanadu)',
      date: '2026',
      status: 'Verified',
    },
    { name: 'ServiceNow Certified Application Developer (CAD)', date: '2024', status: 'Verified' },
    { name: 'ServiceNow Certified System Administrator (CSA)', date: '2023', status: 'Verified' },
    { name: 'AWS Certified Machine Learning - Specialty', date: '2025', status: 'Verified' },
  ],
  skillsMatrix: {
    serviceNowCore: [
      'AI Agent Studio',
      'AI Control Tower',
      'Skill Kit',
      'Workflow Data Fabric',
      'GlideRecord / Script Includes',
      'MID Server Integrations',
      'Now Assist',
    ],
    agenticAi: [
      'Model Context Protocol (MCP)',
      'Agent2Agent (A2A)',
      'Multi-Agent Orchestration',
      'ReAct / Reflexion Loops',
      'Context Window Management',
      'Loop Prevention',
    ],
    llmNlp: [
      'Transformers',
      'Dense Embeddings',
      'Vector Search (Hybrid BM25 + Cosine)',
      'RAG Optimization',
      'Fine-Tuning & Prompt Distillation',
      'Google Gemini & Claude APIs',
    ],
    observabilityGovernance: [
      'OpenTelemetry GenAI Conventions',
      'Distributed Tracing',
      'PII/PHI Redaction',
      'Prompt Injection Defense',
      'Human-in-the-Loop (HITL)',
      'Cost & Quota Governance',
    ],
    cloudScripting: [
      'JavaScript / ES2022 (ServiceNow)',
      'Python 3.11+ (FastAPI, PyTorch, LangChain)',
      'AWS (Bedrock, CloudWatch)',
      'Azure (Entra ID, Azure AI)',
      'GCP (Vertex AI)',
    ],
  },
};
