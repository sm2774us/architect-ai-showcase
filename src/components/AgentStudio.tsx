import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Layers,
  Database,
  Terminal,
  Activity,
  GitPullRequest,
  Check,
  RefreshCw,
  Info,
  Workflow,
} from 'lucide-react';
import { AgentNode, IncidentRecord } from '../types';
import { mockIncidentsList } from '../data/mockData';

interface AgentStudioProps {
  agents: AgentNode[];
  selectedIncident: IncidentRecord;
  setSelectedIncident: (inc: IncidentRecord) => void;
  onExecuteWorkflow: (query: string, hitlApproved: boolean) => Promise<any>;
  executionResult: any;
  isExecuting: boolean;
}

export const AgentStudio: React.FC<AgentStudioProps> = ({
  agents,
  selectedIncident,
  setSelectedIncident,
  onExecuteWorkflow,
  executionResult,
  isExecuting,
}) => {
  const [customPrompt, setCustomPrompt] = useState(
    selectedIncident.short_description +
      ` (Impacts CI: ${selectedIncident.cmdb_ci}, Priority: ${selectedIncident.priority})`
  );
  const [hitlApproved, setHitlApproved] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState<'topology' | 'execution' | 'spec'>('topology');

  useEffect(() => {
    if (isExecuting || executionResult) {
      setActiveStepTab('execution');
    }
  }, [isExecuting, executionResult]);

  const handleRun = () => {
    setActiveStepTab('execution');
    onExecuteWorkflow(customPrompt, hitlApproved);
  };

  const handleSelectPreset = (inc: IncidentRecord) => {
    setSelectedIncident(inc);
    setCustomPrompt(
      `${inc.number}: ${inc.short_description} (Impacts CI: ${inc.cmdb_ci}, Priority: ${inc.priority})`
    );
    setHitlApproved(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: ServiceNow AI Agent Studio Context */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ServiceNow Native Ecosystem
              </span>
              <span className="text-xs text-slate-400">AI Agent Studio • Agentic Framework</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Autonomous Multi-Agent Incident Orchestrator
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Implements multi-agent deliberation, context isolation, and governed tool dispatch
              across ServiceNow's native runtime, Workflow Data Fabric, and external cloud
              environments using the Agent2Agent (A2A) protocol.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-xs">
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Agentic Safety Status</div>
              <div className="text-emerald-400 font-bold flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Control Tower Governed</span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800 mx-1"></div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Active Agent Fleet</div>
              <div className="text-cyan-400 font-bold">5 Autonomous Agents</div>
            </div>
          </div>
        </div>

        {/* Incident Trigger & Sandbox Console */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Incident Ingestion Query (Agent Studio Input Trigger)</span>
              </label>
              <span className="text-[11px] text-slate-500">
                Live prompt routed through NowLLM gateway
              </span>
            </div>
            <textarea
              id="input-agent-studio-query"
              rows={2}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              placeholder="Enter incident context or P1 outage details..."
            />

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400 font-medium">Quick Presets:</span>
              {mockIncidentsList.map((inc) => (
                <button
                  key={inc.sys_id}
                  onClick={() => handleSelectPreset(inc)}
                  className={`text-[11px] px-2.5 py-1 rounded border transition-all ${
                    selectedIncident.sys_id === inc.sys_id
                      ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className="font-mono font-bold text-[10px] mr-1 text-slate-500">
                    {inc.number}
                  </span>
                  {inc.priority.split(' - ')[0] === '1'
                    ? '🚨 P1'
                    : '⚠️ ' + inc.priority.split(' - ')[0]}
                  : {inc.short_description.substring(0, 32)}...
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Human-In-The-Loop (HITL) Gate</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    hitlApproved
                      ? 'bg-emerald-900/50 text-emerald-300'
                      : 'bg-amber-900/40 text-amber-300'
                  }`}
                >
                  {hitlApproved ? 'Pre-Authorized' : 'Enforce Stop'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                ServiceNow AI Control Tower policy requires explicit Staff/Principal engineer
                approval before mutating Tier-0 production infrastructure.
              </p>

              <label className="mt-2.5 flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hitlApproved}
                  onChange={(e) => setHitlApproved(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <span className="text-xs text-slate-300">
                  Staff AI Sign-off: Authorize Emergency Change CHG
                </span>
              </label>
            </div>

            <button
              id="btn-trigger-agent-studio-run"
              onClick={handleRun}
              disabled={isExecuting}
              className={`mt-3 w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow-md ${
                isExecuting
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-bold active:scale-98'
              }`}
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Agent Fleet Deliberating...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Execute AI Agent Studio Pipeline</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mode Tabs: Multi-Agent Graph vs Step-by-Step Execution Logs */}
      <div className="flex border-b border-slate-800 space-x-4 text-xs font-semibold">
        <button
          onClick={() => setActiveStepTab('topology')}
          className={`pb-2 transition-colors flex items-center space-x-1.5 ${
            activeStepTab === 'topology'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Multi-Agent Architecture Graph</span>
        </button>
        <button
          id="tab-btn-execution-trace"
          onClick={() => setActiveStepTab('execution')}
          className={`pb-2 transition-colors flex items-center space-x-1.5 ${
            activeStepTab === 'execution'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Live Execution Trace & Logs</span>
          {executionResult && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
          )}
        </button>
        <button
          onClick={() => setActiveStepTab('spec')}
          className={`pb-2 transition-colors flex items-center space-x-1.5 ${
            activeStepTab === 'spec'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>Staff AI Design Specification</span>
        </button>
      </div>

      {/* TAB 1: Multi-Agent Graph */}
      {activeStepTab === 'topology' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {agents.map((agent, index) => {
              const isFirst = index === 0;
              const isLast = index === agents.length - 1;
              return (
                <div
                  key={agent.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all relative group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      HOP 0{index + 1}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-[11px] text-cyan-400 font-medium mt-0.5">{agent.role}</p>
                    <p className="text-[10px] text-slate-400 mt-2 leading-relaxed line-clamp-3">
                      {agent.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-[10px]">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Model Gateway:</span>
                      <span
                        className="text-slate-200 font-mono truncate max-w-[110px]"
                        title={agent.model}
                      >
                        {agent.model.split(' ')[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Tools Bound:</span>
                      <span className="text-emerald-400 font-mono font-semibold">
                        {agent.tools.length} Tools
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Confidence:</span>
                      <span className="text-slate-200 font-mono">
                        {(agent.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Architecture flow callout */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Workflow className="w-4 h-4" />
              </span>
              <span>
                <strong>A2A Inter-Agent Protocol Flow:</strong> Inbound Incident → Intent Isolation
                → Workflow Data Fabric Graph Query → Cloud MCP Tool Execution → Control Tower HITL
                Gate → Safe GlideRecord Mutation.
              </span>
            </div>
            <button
              onClick={handleRun}
              className="whitespace-nowrap px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[11px] font-semibold transition-all"
            >
              Run Pipeline Now
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Live Execution Trace & Logs */}
      {activeStepTab === 'execution' && (
        <div className="space-y-4">
          {!executionResult && !isExecuting && (
            <div className="p-8 text-center bg-slate-900/50 rounded-xl border border-dashed border-slate-800">
              <Activity className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-slate-300">
                No Workflow Execution in Memory
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Click "Execute AI Agent Studio Pipeline" above to run the multi-agent incident
                triage and see live agent-to-agent deliberation logs.
              </p>
              <button
                onClick={handleRun}
                className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg shadow"
              >
                Trigger Execution Now
              </button>
            </div>
          )}

          {isExecuting && (
            <div className="p-8 text-center bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-center">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
              </div>
              <h4 className="text-sm font-bold text-white">
                Deliberating Across ServiceNow Agent Fleet...
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Executing Intent Router → Traversing CMDB Data Fabric → Calling MCP CloudWatch Tools
                → Verifying Control Tower Policies
              </p>
            </div>
          )}

          {executionResult && !isExecuting && (
            <div className="space-y-4">
              {/* RCA Summary Card */}
              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-5 shadow-lg relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Autonomous Root Cause Diagnosis (RCA)
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Model: {executionResult.modelUsed} • Latency: {executionResult.durationMs}ms
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] px-2.5 py-1 rounded font-bold font-mono ${
                      executionResult.governanceStatus === 'GOVERNED_APPROVED'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {executionResult.governanceStatus}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-200 leading-relaxed font-sans bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                  {executionResult.triageSummary}
                </p>

                {/* Proposed Remediation & Changes */}
                <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {executionResult.proposedActions?.map((act: any, i: number) => (
                    <div
                      key={i}
                      className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-400 flex items-center space-x-1">
                          <GitPullRequest className="w-3.5 h-3.5" />
                          <span>{act.type}</span>
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {act.approvalStatus}
                        </span>
                      </div>
                      <div className="text-slate-300">{act.action}</div>
                      <div className="text-[11px] text-slate-400 flex justify-between font-mono">
                        <span>Target CI: {act.targetCI}</span>
                        <span className="text-cyan-400">{act.riskScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Inter-Agent Handoff Trace */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>Agent2Agent (A2A) Deliberation & Tool Execution Stream</span>
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Trace ID: {executionResult.traceId}
                  </span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {executionResult.executionSteps?.map((step: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 mt-0.5">
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-xs">{step.agent}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                              {step.protocol}
                            </span>
                          </div>
                          <p className="text-slate-300 text-[11px] mt-1 font-sans">{step.action}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 self-end md:self-center">
                        <span className="text-[10px] text-slate-500">{step.latencyMs}ms</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            step.status === 'COMPLETED' || step.status === 'APPROVED_BY_STAFF_ENG'
                              ? 'bg-emerald-950 text-emerald-300'
                              : step.status === 'AWAITING_HITL_APPROVAL'
                                ? 'bg-amber-950 text-amber-300 animate-pulse'
                                : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {step.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Staff AI Design Specification */}
      {activeStepTab === 'spec' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-xs text-slate-300 space-y-4 leading-relaxed">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>Staff AI Architect Reference: AI Agent Studio in ServiceNow Xanadu</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <h5 className="font-bold text-white text-xs">1. State Machine & Loop Prevention</h5>
              <p className="text-slate-400 text-[11px]">
                Autonomous multi-agent swarms risk circular deadlock (e.g., Agent A delegates to
                Agent B, which delegates back). Our design implements an acyclic directed execution
                graph (DAG) enforced by a shared execution token with a hop counter (Max Hops = 5)
                and strict termination conditions.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <h5 className="font-bold text-white text-xs">
                2. Context Isolation & Least Privilege
              </h5>
              <p className="text-slate-400 text-[11px]">
                Each agent operates within an isolated context window. Rather than forwarding raw
                20,000-token prompt histories, the Router passes only synthesized semantic intents,
                preventing prompt contamination, privilege escalation, and unnecessary token cost.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <h5 className="font-bold text-white text-xs">3. Hybrid Model Routing</h5>
              <p className="text-slate-400 text-[11px]">
                Latency-sensitive tasks (intent classification, entity extraction) execute on
                ServiceNow's on-platform NowLLM domain models (P95 &lt; 180ms). Complex reasoning
                and code generation escalate through our secure cloud gateway to Google Gemini 3.8
                Flash or Claude 3.5.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <h5 className="font-bold text-white text-xs">4. Governed GlideRecord Execution</h5>
              <p className="text-slate-400 text-[11px]">
                AI agents never execute raw unvalidated JavaScript. Changes are wrapped in audited
                GlideRecordSecure transactions registered as ServiceNow Update Sets, allowing
                instant 1-click rollback via Change Management.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
