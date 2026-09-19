import React, { useState } from "react";
import {
  Network,
  Terminal,
  Play,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldAlert,
  ArrowRight,
  Code,
  Server,
  Cloud,
  FileJson,
} from "lucide-react";
import { McpToolItem } from "../types";
import { mcpToolsCatalog } from "../data/mockData";

export const McpA2aLab: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<McpToolItem>(mcpToolsCatalog[0]);
  const [toolArguments, setToolArguments] = useState(
    JSON.stringify(mcpToolsCatalog[0].samplePayload, null, 2)
  );
  const [mcpResponse, setMcpResponse] = useState<any>(null);
  const [isExecutingTool, setIsExecutingTool] = useState(false);

  // A2A Handshake simulation state
  const [a2aStep, setA2aStep] = useState<number>(1);

  const handleToolSelect = (tool: McpToolItem) => {
    setSelectedTool(tool);
    setToolArguments(JSON.stringify(tool.samplePayload, null, 2));
    setMcpResponse(null);
  };

  const handleExecuteMcp = async () => {
    setIsExecutingTool(true);
    try {
      let parsedArgs = {};
      try {
        parsedArgs = JSON.parse(toolArguments);
      } catch (e) {
        console.warn("Invalid JSON in tool args, passing raw text:", e);
      }

      const res = await fetch("/api/mcp/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolName: selectedTool.name,
          arguments: parsedArgs,
        }),
      });
      const data = await res.json();
      setMcpResponse(data);
    } catch (err) {
      console.error("MCP tool call error:", err);
    } finally {
      setIsExecutingTool(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Multi-Agent Standards
              </span>
              <span className="text-xs text-slate-400">
                Model Context Protocol (MCP) • Agent2Agent (A2A) Governance
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Governed Multi-Agent Interoperability Lab
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Standardizing tool execution via MCP JSON-RPC 2.0 and agent-to-agent negotiation via the A2A protocol.
              Eliminates vendor lock-in and prevents security privilege escalation across multi-cloud enterprise agents.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs font-mono">
            <div>
              <div className="text-[10px] text-slate-500">MCP Protocol</div>
              <div className="text-cyan-400 font-bold">2024-11-05 (JSON-RPC)</div>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div>
              <div className="text-[10px] text-slate-500">A2A Spec</div>
              <div className="text-emerald-400 font-bold">v1.2 (Signed Scope)</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: LIVE MODEL CONTEXT PROTOCOL (MCP) TOOL RUNNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Terminal className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">
                Model Context Protocol (MCP) Tool Executor
              </h3>
              <p className="text-[11px] text-slate-400">
                Live sandbox invoking ServiceNow and Cloud tools using standard JSON-RPC 2.0 envelopes
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Tool Selector */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
              Available Governed MCP Tools
            </span>
            <div className="space-y-2">
              {mcpToolsCatalog.map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => handleToolSelect(tool)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs ${
                    selectedTool.name === tool.name
                      ? "bg-cyan-950/50 border-cyan-500/50 text-cyan-300 font-semibold"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-white">{tool.name}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{tool.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Arguments Editor & Response */}
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center space-x-1.5">
                  <FileJson className="w-3.5 h-3.5 text-cyan-400" />
                  <span>JSON-RPC 2.0 Tool Arguments ('params.arguments')</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Method: tools/call</span>
              </div>
              <textarea
                id="input-mcp-tool-arguments"
                rows={5}
                value={toolArguments}
                onChange={(e) => setToolArguments(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              id="btn-execute-mcp-tool"
              onClick={handleExecuteMcp}
              disabled={isExecutingTool}
              className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg transition-all shadow"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>{isExecutingTool ? "Dispatching MCP Call..." : "Execute MCP Tool Call"}</span>
            </button>

            {/* MCP JSON-RPC Response */}
            {mcpResponse && (
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Standard MCP Response Envelope</span>
                </span>
                <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-56">
                  {JSON.stringify(mcpResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: A2A (AGENT2AGENT) PROTOCOL NEGOTIATION */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Network className="w-4 h-4 text-emerald-400" />
              <span>Agent2Agent (A2A) Governed Negotiation Protocol</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Demonstrates cryptographic scope exchange and trust delegation between ServiceNow agents and Cloud agents
            </p>
          </div>
          <div className="flex space-x-1">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => setA2aStep(step)}
                className={`w-6 h-6 rounded text-[11px] font-mono font-bold transition-all ${
                  a2aStep === step
                    ? "bg-emerald-500 text-slate-950 font-black"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        {/* Step Visualizer */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          {a2aStep === 1 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400">
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px]">STEP 01</span>
                <span>Agent Card Discovery & Capability Advertisement</span>
              </div>
              <p className="text-xs text-slate-300">
                The requesting agent (Incident Triage Agent) queries the local A2A Registry for agents declaring the
                capability <code>cloud.diagnostics.metrics</code>. The A2A Cloud Diagnostics Agent responds with its
                signed Agent Card.
              </p>
              <pre className="p-3 bg-slate-900 rounded border border-slate-800 text-[11px] font-mono text-cyan-300">
{`{
  "agent_id": "agent-cloud-diagnostics-04",
  "name": "Cloud Diagnostics Agent",
  "version": "1.4.0",
  "trust_domain": "service-now.enterprise.cloud",
  "declared_capabilities": ["aws_cloudwatch_query_metrics", "azure_entra_audit_logs"],
  "signature": "ecdsa-sha256:3045022100e4b8...now_root_ca"
}`}
              </pre>
            </div>
          )}

          {a2aStep === 2 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px]">STEP 02</span>
                <span>Trust Boundary & Scope Verification</span>
              </div>
              <p className="text-xs text-slate-300">
                Before delegation is accepted, the Target Agent contacts ServiceNow AI Control Tower to verify that the
                Requesting Agent holds valid enterprise scopes. Unauthorized escalation is rejected immediately.
              </p>
              <div className="p-3 bg-slate-900 rounded border border-emerald-800/40 text-[11px] text-emerald-300 font-mono">
                ✓ Verified Scope: 'sn_incident.read' <br />
                ✓ Verified Scope: 'cloud_infra.metrics.read' <br />
                ✓ Rate Limit Bucket: Department_SRE (3,400 / 10,000 monthly queries used) <br />
                ✓ Delegation Status: AUTHORIZED_BY_CONTROL_TOWER
              </div>
            </div>
          )}

          {a2aStep === 3 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-[10px]">STEP 03</span>
                <span>Cryptographic Context Handoff & Loop Prevention</span>
              </div>
              <p className="text-xs text-slate-300">
                A structured execution envelope is created with an OpenTelemetry trace context and a recursion hop
                limiter (Hop = 2/5). If an agent attempts to call back in a circle, the A2A execution kernel terminates
                the loop.
              </p>
              <pre className="p-3 bg-slate-900 rounded border border-slate-800 text-[11px] font-mono text-amber-300">
{`{
  "a2a_envelope_id": "env_94218a",
  "parent_trace_id": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
  "hop_depth": 2,
  "max_allowed_hops": 5,
  "loop_detection_hash": "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
}`}
              </pre>
            </div>
          )}

          {a2aStep === 4 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-purple-400">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-[10px]">STEP 04</span>
                <span>Consensus Synthesis & GlideRecord Return</span>
              </div>
              <p className="text-xs text-slate-300">
                The diagnosing agent returns metric telemetry back to the ServiceNow Incident Triage Agent, which synthesizes
                the findings into the incident work notes and notifies the assignment group.
              </p>
              <div className="p-3 bg-slate-900 rounded border border-purple-800/40 text-[11px] text-purple-300 font-mono">
                ✓ Output validated against JSON Schema <br />
                ✓ Work notes appended to INC0948210 <br />
                ✓ OpenTelemetry span closed: duration = 310ms, status = OK
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
