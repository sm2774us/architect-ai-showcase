export type ActiveTab =
  | "agent-studio"
  | "control-tower"
  | "skill-kit-fabric"
  | "mcp-a2a"
  | "opentelemetry"
  | "llm-architecture"
  | "staff-leadership";

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  type: "router" | "diagnostics" | "data-fabric" | "governance" | "remediation";
  status: "idle" | "running" | "completed" | "waiting_approval";
  confidence: number;
  model: string;
  tools: string[];
  description: string;
}

export interface IncidentRecord {
  sys_id: string;
  number: string;
  short_description: string;
  priority: string;
  state: string;
  caller: string;
  assignment_group: string;
  cmdb_ci: string;
  sys_created_on: string;
}

export interface CmdbCI {
  sys_id: string;
  name: string;
  class: string;
  tier: string;
  environment: string;
  ip: string;
  status: string;
  owner: string;
  parent_service: string;
  cloud_provider: string;
}

export interface GovernancePolicy {
  id: string;
  name: string;
  category: "Security" | "Responsible AI" | "Financial" | "Operational";
  rule: string;
  enforcement: "Block" | "Redact & Warn" | "HITL Gate" | "Audit Only";
  status: "Active" | "Simulated";
  violationCount: number;
  description: string;
}

export interface SkillKitDefinition {
  id: string;
  name: string;
  category: "ITSM" | "ITOM" | "Security" | "Platform";
  inputs: { name: string; type: string; description: string }[];
  targetTable: string;
  systemPrompt: string;
  fewShotExamples: number;
  outputSchema: string;
  glideScript: string;
}

export interface McpToolItem {
  name: string;
  description: string;
  category: "ServiceNow" | "Cloud Infrastructure" | "Identity & IAM";
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
  samplePayload: Record<string, any>;
}

export interface OTelSpan {
  spanId: string;
  name: string;
  kind: "SERVER" | "CLIENT" | "INTERNAL";
  durationMs: number;
  status: "OK" | "ERROR";
  attributes?: Record<string, any>;
  events?: { name: string; time: number }[];
}

export interface OTelTrace {
  traceId: string;
  timestamp: string;
  serviceName: string;
  operationName: string;
  durationMs: number;
  attributes: Record<string, any>;
  spans: OTelSpan[];
}

export interface InterviewDefenseScenario {
  id: string;
  title: string;
  category: "Architecture" | "Governance" | "Scalability" | "Multi-Agent" | "Mentorship";
  question: string;
  staffLevelKeyPoints: string[];
  suggestedAnswer: string;
}
