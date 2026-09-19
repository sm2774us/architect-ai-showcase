import React, { useState } from "react";
import {
  Activity,
  BarChart3,
  Clock,
  Layers,
  CheckCircle2,
  FileCode,
  DollarSign,
  Zap,
  Info,
  ExternalLink,
} from "lucide-react";
import { OTelTrace, OTelSpan } from "../types";

interface OpenTelemetrySuiteProps {
  traces: OTelTrace[];
}

export const OpenTelemetrySuite: React.FC<OpenTelemetrySuiteProps> = ({ traces }) => {
  const currentTrace = traces[0] || {
    traceId: "trace_sn_0918_p1_outage",
    timestamp: new Date().toISOString(),
    serviceName: "servicenow-ai-agent-studio",
    operationName: "agentic.incident_remediation.workflow",
    durationMs: 1245,
    attributes: {
      "gen_ai.system": "ServiceNow NowLLM / Google Gemini Hybrid Gateway",
      "gen_ai.request.model": "gemini-3.8-flash (via ServiceNow Cloud Gateway)",
      "gen_ai.usage.prompt_tokens": 840,
      "gen_ai.usage.completion_tokens": 420,
      "gen_ai.usage.total_tokens": 1260,
      "servicenow.data_fabric.connected_tables": ["incident", "cmdb_ci", "change_request"],
      "governance.control_tower.policy_checks": "PASSED",
    },
    spans: [
      {
        spanId: "span_root_001",
        name: "agent.orchestrator.triage",
        kind: "SERVER",
        durationMs: 1245,
        status: "OK",
        attributes: { "rpc.system": "grpc", "net.peer.name": "servicenow-agent-studio" },
      },
      {
        spanId: "span_fabric_002",
        name: "workflow_data_fabric.cmdb_vector_search",
        kind: "CLIENT",
        durationMs: 198,
        status: "OK",
        attributes: { "db.system": "ServiceNow GlideRecord + Vector Fabric", "cmdb.ci_count": 4 },
      },
      {
        spanId: "span_llm_003",
        name: "llm.generate_content",
        kind: "INTERNAL",
        durationMs: 460,
        status: "OK",
        attributes: {
          "gen_ai.system": "GoogleGenAI",
          "gen_ai.request.model": "gemini-3.8-flash",
          "gen_ai.usage.prompt_tokens": 840,
          "gen_ai.usage.completion_tokens": 420,
        },
      },
      {
        spanId: "span_mcp_004",
        name: "mcp.tool_call.aws_cloudwatch_query_metrics",
        kind: "CLIENT",
        durationMs: 310,
        status: "OK",
        attributes: { "mcp.tool.name": "aws_cloudwatch_query_metrics", "rpc.method": "tools/call" },
      },
      {
        spanId: "span_ct_005",
        name: "ai_control_tower.guardrail_evaluation",
        kind: "INTERNAL",
        durationMs: 85,
        status: "OK",
        attributes: { "policy.pii_redacted": false, "policy.hitl_enforced": true },
      },
    ],
  };

  const [selectedSpan, setSelectedSpan] = useState<OTelSpan>(currentTrace.spans[0]);
  const [activeOtelTab, setActiveOtelTab] = useState<"waterfall" | "metrics" | "collector-yaml">("waterfall");

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                AI Observability Standard
              </span>
              <span className="text-xs text-slate-400">
                OpenTelemetry (OTel) GenAI Semantic Conventions v1.28.0
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Distributed AI System Observability & Tracing
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Production telemetry engineering for agentic systems: capturing token economics, Time to First Token
              (TTFT), inter-agent span handoffs, and AI Control Tower policy intervention latencies.
            </p>
          </div>

          <div className="flex border border-slate-800 rounded-lg p-1 bg-slate-950 text-xs">
            <button
              onClick={() => setActiveOtelTab("waterfall")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeOtelTab === "waterfall" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Trace Waterfall
            </button>
            <button
              onClick={() => setActiveOtelTab("metrics")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeOtelTab === "metrics" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              GenAI Metrics
            </button>
            <button
              onClick={() => setActiveOtelTab("collector-yaml")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeOtelTab === "collector-yaml" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              OTel Collector Config
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: TRACE WATERFALL */}
      {activeOtelTab === "waterfall" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Waterfall Chart */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Distributed Trace Waterfall
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Trace ID: {currentTrace.traceId} • Total Duration: {currentTrace.durationMs}ms
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono border border-purple-800/40">
                  {currentTrace.spans.length} Distributed Spans
                </span>
              </div>

              {/* Spans bars */}
              <div className="space-y-2.5">
                {currentTrace.spans.map((span, idx) => {
                  const maxDuration = currentTrace.durationMs || 1000;
                  const widthPercent = Math.max(12, (span.durationMs / maxDuration) * 100);
                  const isSelected = selectedSpan?.spanId === span.spanId;

                  let colorClass = "bg-purple-500/80 hover:bg-purple-400";
                  if (span.name.includes("fabric")) colorClass = "bg-emerald-500/80 hover:bg-emerald-400";
                  if (span.name.includes("llm")) colorClass = "bg-cyan-500/80 hover:bg-cyan-400";
                  if (span.name.includes("mcp")) colorClass = "bg-amber-500/80 hover:bg-amber-400";
                  if (span.name.includes("control_tower")) colorClass = "bg-rose-500/80 hover:bg-rose-400";

                  return (
                    <div
                      key={span.spanId}
                      onClick={() => setSelectedSpan(span)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-slate-800 border-purple-500/60 shadow-md"
                          : "bg-slate-950 border-slate-800/80 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono font-bold text-white flex items-center space-x-1.5">
                          <span className="text-[10px] px-1 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                            {span.kind}
                          </span>
                          <span>{span.name}</span>
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{span.durationMs}ms</span>
                      </div>

                      {/* Visual Bar */}
                      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${colorClass}`}
                          style={{ width: `${widthPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Span Detail Inspector (OTel GenAI Attributes) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Span Attributes Inspector
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                  Status: {selectedSpan?.status}
                </span>
              </div>

              <div>
                <div className="text-sm font-bold text-white font-mono">{selectedSpan?.name}</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Span ID: {selectedSpan?.spanId} • Duration: {selectedSpan?.durationMs}ms
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">
                  OpenTelemetry GenAI Semantic Tags:
                </span>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs space-y-1.5 overflow-x-auto">
                  {selectedSpan?.attributes &&
                    Object.entries(selectedSpan.attributes).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-start text-[11px] gap-2">
                        <span className="text-purple-300">{key}:</span>
                        <span className="text-emerald-400 font-semibold text-right break-all">
                          {typeof val === "object" ? JSON.stringify(val) : String(val)}
                        </span>
                      </div>
                    ))}

                  {/* Trace Level Attributes */}
                  <div className="pt-2 border-t border-slate-800 text-slate-500 text-[10px]">
                    Inherited Trace Context:
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>gen_ai.system:</span>
                    <span className="text-slate-200">ServiceNow NowLLM / Gemini Gateway</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>gen_ai.usage.total_tokens:</span>
                    <span className="text-cyan-400">1,260 Tokens</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: GENAI METRICS DASHBOARD */}
      {activeOtelTab === "metrics" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Time to First Token (TTFT)</span>
            <div className="text-2xl font-bold text-white font-mono flex items-baseline space-x-1">
              <span>320</span>
              <span className="text-xs text-slate-500">ms</span>
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
              <span>✓ -45ms vs baseline (Fast Gateway)</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Avg Token Consumption</span>
            <div className="text-2xl font-bold text-white font-mono flex items-baseline space-x-1">
              <span>1,260</span>
              <span className="text-xs text-slate-500">tokens/workflow</span>
            </div>
            <div className="text-[10px] text-cyan-400 flex items-center space-x-1">
              <span>66% prompt / 34% completion</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Department Cost Attribution</span>
            <div className="text-2xl font-bold text-white font-mono flex items-baseline space-x-1">
              <span>$0.0018</span>
              <span className="text-xs text-slate-500">/ execution</span>
            </div>
            <div className="text-[10px] text-slate-400">Attributed to: Platform SRE</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Policy Rejection Rate</span>
            <div className="text-2xl font-bold text-white font-mono flex items-baseline space-x-1">
              <span>0.18</span>
              <span className="text-xs text-slate-500">%</span>
            </div>
            <div className="text-[10px] text-emerald-400">AI Control Tower Interceptions: 29</div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: OTEL COLLECTOR CONFIG */}
      {activeOtelTab === "collector-yaml" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span>Production otel-collector-config.yaml for ServiceNow AI Platform</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">OTLP / gRPC 4317</span>
          </div>

          <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed">
{`# OpenTelemetry Collector Configuration for ServiceNow AI System Observability
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 500ms
    send_batch_size: 256

  transform/gen_ai:
    error_mode: ignore
    trace_statements:
      - context: span
        statements:
          # Standardize ServiceNow department cost attribution
          - set(attributes["cost.department"], "ServiceNow_AI_Ops") where attributes["gen_ai.system"] != nil

exporters:
  # Export to ServiceNow AI Control Tower & Health Monitoring
  otlp/servicenow:
    endpoint: https://sn-prod-ai-studio-01.service-now.com/api/v1/telemetry
    headers:
      Authorization: "Bearer \${SERVICENOW_OTEL_TOKEN}"

  # Dual-export to Datadog / Prometheus for global SRE dashboarding
  prometheus:
    endpoint: 0.0.0.0:8889

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch, transform/gen_ai]
      exporters: [otlp/servicenow]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [prometheus]`}
          </pre>
        </div>
      )}
    </div>
  );
};
