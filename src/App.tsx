import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AgentStudio } from './components/AgentStudio';
import { ControlTower } from './components/ControlTower';
import { SkillKitDataFabric } from './components/SkillKitDataFabric';
import { McpA2aLab } from './components/McpA2aLab';
import { OpenTelemetrySuite } from './components/OpenTelemetrySuite';
import { CloudLlmArch } from './components/CloudLlmArch';
import { StaffLeadership } from './components/StaffLeadership';
import { ActiveTab, AgentNode, IncidentRecord, OTelTrace } from './types';
import { initialAgents, mockIncidentsList } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('agent-studio');
  const [agents, setAgents] = useState<AgentNode[]>(initialAgents);
  const [selectedIncident, setSelectedIncident] = useState<IncidentRecord>(mockIncidentsList[0]);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [traces, setTraces] = useState<OTelTrace[]>([]);

  // Fetch initial traces from backend on load
  useEffect(() => {
    fetch('/api/otel/traces')
      .then((res) => res.json())
      .then((data) => {
        if (data.traces && data.traces.length > 0) {
          setTraces(data.traces);
        }
      })
      .catch((err) => console.warn('Could not fetch traces:', err));
  }, []);

  const handleExecuteWorkflow = async (incidentQuery: string, hitlApproved: boolean) => {
    setIsExecuting(true);
    try {
      const res = await fetch('/api/agents/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentQuery,
          selectedAgentId: 'agent-router',
          humanInTheLoopApproval: hitlApproved,
        }),
      });
      const data = await res.json();
      setExecutionResult(data);

      if (data.otelTrace) {
        setTraces((prev) => [data.otelTrace, ...prev]);
      }
      return data;
    } catch (err) {
      console.error('Workflow execution error:', err);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleGlobalRunDemo = async () => {
    setActiveTab('agent-studio');
    await handleExecuteWorkflow(
      'INC0948210: Intermittent 504 Gateway Timeouts on Customer Checkout & Payments (Impacts CI: k8s-ingress-cluster-apigw, Priority: 1 - Critical)',
      true
    );
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Platform Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunDemoIncident={handleGlobalRunDemo}
        isExecutingDemo={isExecuting}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'agent-studio' && (
          <AgentStudio
            agents={agents}
            selectedIncident={selectedIncident}
            setSelectedIncident={setSelectedIncident}
            onExecuteWorkflow={handleExecuteWorkflow}
            executionResult={executionResult}
            isExecuting={isExecuting}
          />
        )}

        {activeTab === 'control-tower' && <ControlTower />}

        {activeTab === 'skill-kit-fabric' && <SkillKitDataFabric />}

        {activeTab === 'mcp-a2a' && <McpA2aLab />}

        {activeTab === 'opentelemetry' && <OpenTelemetrySuite traces={traces} />}

        {activeTab === 'llm-architecture' && <CloudLlmArch />}

        {activeTab === 'staff-leadership' && <StaffLeadership />}
      </main>

      {/* Platform Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-5 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">
              ServiceNow Staff AI Engineer Qualification Suite
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">Xanadu Enterprise Release</span>
          </div>

          <div className="flex flex-wrap items-center space-x-4 text-[11px] text-slate-400">
            <span>AI Agent Studio</span>
            <span>•</span>
            <span>AI Control Tower</span>
            <span>•</span>
            <span>Workflow Data Fabric</span>
            <span>•</span>
            <span>MCP & A2A</span>
            <span>•</span>
            <span>OpenTelemetry GenAI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
