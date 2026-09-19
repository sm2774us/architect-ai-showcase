import React, { useState } from "react";
import {
  Layers,
  Cloud,
  Cpu,
  Code2,
  GitFork,
  ArrowRight,
  Database,
  Terminal,
  CheckCircle2,
  Sliders,
  ExternalLink,
} from "lucide-react";

export const CloudLlmArch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"nlp-arch" | "cloud-routing" | "scripting">("nlp-arch");

  // Dynamic chunking simulator
  const [sampleText, setSampleText] = useState(
    `KB0094182: High Availability Postgres Failover Procedure.
When primary database node in prod-customer-portal-db-01 reports replication lag > 5000ms or connection starvation, the automated sentinel triggers graceful failover to standby replica.
Step 1: Check replication slot status in pg_stat_replication.
Step 2: Issue pg_ctl promote on replica node.
Step 3: Update ServiceNow CMDB CI operational_status to 'Failover Active'.`
  );

  const [chunkStrategy, setChunkStrategy] = useState<"semantic" | "fixed">("semantic");

  const chunks =
    chunkStrategy === "semantic"
      ? [
          {
            title: "Header & Intent Chunk",
            text: "KB0094182: High Availability Postgres Failover Procedure.",
            tokens: 14,
            vectorDensity: "Dense (0.91)",
          },
          {
            title: "Trigger Condition Chunk",
            text: "When primary database node in prod-customer-portal-db-01 reports replication lag > 5000ms or connection starvation...",
            tokens: 32,
            vectorDensity: "Dense (0.88)",
          },
          {
            title: "Remediation Steps Chunk",
            text: "Step 1: Check replication slot status. Step 2: Issue pg_ctl promote. Step 3: Update ServiceNow CMDB CI.",
            tokens: 38,
            vectorDensity: "Dense (0.94)",
          },
        ]
      : [
          {
            title: "Fixed Chunk 1 (Tokens 0-25)",
            text: sampleText.substring(0, 110),
            tokens: 25,
            vectorDensity: "Diluted (0.68)",
          },
          {
            title: "Fixed Chunk 2 (Tokens 25-50)",
            text: sampleText.substring(110, 220),
            tokens: 25,
            vectorDensity: "Diluted (0.71)",
          },
          {
            title: "Fixed Chunk 3 (Tokens 50-75)",
            text: sampleText.substring(220),
            tokens: 22,
            vectorDensity: "Diluted (0.64)",
          },
        ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Staff AI Systems Engineering
              </span>
              <span className="text-xs text-slate-400">NLP • LLM Architectures • Cloud & Platform Integration</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              LLM Architectures & Multi-Cloud Hybrid Routing
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Demonstrating mastery of modern transformer attention, vector search chunking, semantic retrieval, and
              hybrid cloud routing across ServiceNow NowLLM, Google Cloud Vertex, AWS Bedrock, and Azure OpenAI.
            </p>
          </div>

          <div className="flex border border-slate-800 rounded-lg p-1 bg-slate-950 text-xs">
            <button
              onClick={() => setActiveTab("nlp-arch")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === "nlp-arch" ? "bg-cyan-600 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              NLP & Vector Search
            </button>
            <button
              onClick={() => setActiveTab("cloud-routing")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === "cloud-routing"
                  ? "bg-cyan-600 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Hybrid Cloud Router
            </button>
            <button
              onClick={() => setActiveTab("scripting")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === "scripting"
                  ? "bg-cyan-600 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              JS & Python Integrations
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: NLP & VECTOR SEARCH */}
      {activeTab === "nlp-arch" && (
        <div className="space-y-5">
          {/* Conceptual Architecture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                <Cpu className="w-4 h-4" />
                <span>Modern Transformer Architecture</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Expertise in Multi-Head Self-Attention, Rotary Position Embeddings (RoPE), KV-Caching for multi-turn
                agent dialogues, and Grouped Query Attention (GQA) used in modern enterprise LLMs.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                <Database className="w-4 h-4" />
                <span>Hybrid Vector Search (BM25 + Dense)</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Combining sparse lexical matching (BM25 for exact ServiceNow error codes and CI names) with dense vector
                cosine similarity to prevent hallucinated entity mapping.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs">
                <GitFork className="w-4 h-4" />
                <span>Agentic Reasoning Frameworks</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Implementation of ReAct (Reason + Act), Plan-and-Solve, and Reflexion self-correction loops with
                deterministic termination safeguards to prevent runaway token spend.
              </p>
            </div>
          </div>

          {/* Interactive Chunking & Vector Density Workbench */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">
                  RAG Vector Chunking Strategy Workbench
                </h3>
                <p className="text-[11px] text-slate-400">
                  Compare how Semantic Section Chunking outperforms Fixed-Character Chunking in ServiceNow Knowledge Bases
                </p>
              </div>

              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setChunkStrategy("semantic")}
                  className={`px-3 py-1 rounded transition-all ${
                    chunkStrategy === "semantic"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Semantic AST Chunking
                </button>
                <button
                  onClick={() => setChunkStrategy("fixed")}
                  className={`px-3 py-1 rounded transition-all ${
                    chunkStrategy === "fixed"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Fixed 25-Token Chunking
                </button>
              </div>
            </div>

            {/* Chunks grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {chunks.map((chunk, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between space-y-2 text-xs"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{chunk.title}</span>
                      <span className="text-emerald-400 font-bold">{chunk.vectorDensity}</span>
                    </div>
                    <p className="text-slate-300 font-mono text-[11px] mt-2 bg-slate-900/60 p-2.5 rounded border border-slate-800">
                      "{chunk.text}"
                    </p>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800">
                    Token Count: {chunk.tokens} tokens
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: HYBRID CLOUD ROUTER */}
      {activeTab === "cloud-routing" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              Enterprise Multi-Cloud LLM Routing Matrix
            </h3>
            <p className="text-[11px] text-slate-400">
              Architected to route enterprise requests by sensitivity, latency tolerance, and reasoning complexity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Model 1 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-sm">ServiceNow NowLLM</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">
                  On-Platform
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Fine-tuned specifically on IT, HR, and CSM domain ontologies. Zero data egress from ServiceNow instance.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-1 text-[10px] text-slate-400 font-mono">
                <div>P95 Latency: &lt; 160ms</div>
                <div>Primary Tasks: Virtual Agent, Ticket Summarization</div>
                <div>Privacy: On-Prem / Zero Egress</div>
              </div>
            </div>

            {/* Model 2 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400 text-sm">Google Gemini 3.8 Flash</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">
                  GCP Cloud
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Ultra-fast multimodal reasoning, long context window (1M+ tokens), and JSON schema validation.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-1 text-[10px] text-slate-400 font-mono">
                <div>P95 Latency: ~420ms</div>
                <div>Primary Tasks: Deep RCA, Code Synthesis, OTel Analytics</div>
                <div>Gateway: Google GenAI Node SDK via Express</div>
              </div>
            </div>

            {/* Model 3 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400 text-sm">Claude 3.5 Sonnet</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">
                  AWS Bedrock
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Benchmark leader in complex tool execution, multi-agent arbitration, and high-assurance code generation.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-1 text-[10px] text-slate-400 font-mono">
                <div>P95 Latency: ~680ms</div>
                <div>Primary Tasks: Complex Script Includes, Security Audits</div>
                <div>Gateway: AWS IAM Signature v4</div>
              </div>
            </div>

            {/* Model 4 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-400 text-sm">Azure OpenAI GPT-4o</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 font-mono">
                  Azure Cloud
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Enterprise compliance with FedRAMP High, Microsoft Entra ID authentication, and PrivateLink peering.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-1 text-[10px] text-slate-400 font-mono">
                <div>P95 Latency: ~510ms</div>
                <div>Primary Tasks: Entra Identity Triage, SecOps Parsing</div>
                <div>Gateway: Azure Managed Identity</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: SCRIPTING & INTEGRATION PLAYGROUND */}
      {activeTab === "scripting" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ServiceNow JavaScript */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>ServiceNow JavaScript (GlideRecordSecure & RESTMessageV2)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Script Include</span>
            </div>

            <pre className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-72 leading-relaxed">
{`// Production Script Include: CloudLLMGateway
var CloudLLMGateway = Class.create();
CloudLLMGateway.prototype = {
  initialize: function() {
    this.endpoint = gs.getProperty('sn_ai.cloud_gateway.url');
  },
  
  dispatchPrompt: function(promptPayload, taskCategory) {
    // 1. Enforce Control Tower Pre-Flight Guardrails
    var ctValidator = new sn_ai_control_tower.PolicyEvaluator();
    var audit = ctValidator.inspect(promptPayload);
    if (!audit.passed) {
      gs.error('Control Tower Block: ' + JSON.stringify(audit.violations));
      return { error: 'POLICY_VIOLATION', details: audit.violations };
    }
    
    // 2. Governed REST Outbound via MID Server if on-prem
    var restMsg = new sn_ws.RESTMessageV2();
    restMsg.setEndpoint(this.endpoint + '/api/v1/generate');
    restMsg.setHttpMethod('POST');
    restMsg.setRequestHeader('Content-Type', 'application/json');
    restMsg.setRequestBody(JSON.stringify(audit.sanitizedPayload));
    
    var response = restMsg.execute();
    return JSON.parse(response.getBody());
  },
  
  type: 'CloudLLMGateway'
};`}
            </pre>
          </div>

          {/* Python Microservice */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Python 3.11 Cloud Microservice (FastAPI & LangChain / OTel)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">FastAPI App</span>
            </div>

            <pre className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-72 leading-relaxed">
{`# Python 3.11+ Cloud Microservice for ServiceNow MCP Adapter
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel
from opentelemetry import trace
from google import genai

tracer = trace.get_tracer("servicenow.mcp.adapter")
app = FastAPI(title="ServiceNow Cloud AI Gateway")

class PromptRequest(BaseModel):
    incident_context: str
    target_ci: str
    caller_role: str

@app.post("/api/mcp/triage")
async def execute_triage(req: PromptRequest, authorization: str = Header(...)):
    with tracer.start_as_current_span("agent.triage.evaluate") as span:
        span.set_attribute("gen_ai.system", "GoogleGenAI")
        span.set_attribute("servicenow.ci", req.target_ci)
        
        client = genai.Client()
        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=f"Triage incident on {req.target_ci}: {req.incident_context}"
        )
        return {"rca_summary": response.text, "status": "COMPLETED"}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
