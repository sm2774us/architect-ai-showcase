import React from 'react';
import {
  Cpu,
  ShieldCheck,
  Workflow,
  Network,
  Activity,
  Layers,
  Award,
  Sparkles,
  Server,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onRunDemoIncident: () => void;
  isExecutingDemo: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunDemoIncident,
  isExecutingDemo,
}) => {
  const navItems = [
    {
      id: 'agent-studio' as ActiveTab,
      label: 'Agent Studio',
      icon: Cpu,
      badge: 'Core',
    },
    {
      id: 'control-tower' as ActiveTab,
      label: 'Control Tower',
      icon: ShieldCheck,
      badge: 'Governance',
    },
    {
      id: 'skill-kit-fabric' as ActiveTab,
      label: 'Skill Kits & Data Fabric',
      icon: Workflow,
      badge: 'Platform',
    },
    {
      id: 'mcp-a2a' as ActiveTab,
      label: 'MCP & A2A Lab',
      icon: Network,
      badge: 'Multi-Agent',
    },
    {
      id: 'opentelemetry' as ActiveTab,
      label: 'OpenTelemetry',
      icon: Activity,
      badge: 'Observability',
    },
    {
      id: 'llm-architecture' as ActiveTab,
      label: 'Enterprise Architecture',
      icon: Layers,
      badge: 'AWS/Azure/GCP',
    },
    {
      id: 'staff-leadership' as ActiveTab,
      label: 'Staff Defense & Leadership',
      icon: Award,
      badge: '8+ YOE / Certified',
    },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      {/* Top banner: ServiceNow Platform Bar */}
      <div className="bg-[#032D42] text-slate-200 border-b border-cyan-900/40 px-4 py-2 flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 font-bold tracking-wider text-emerald-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
            <span className="uppercase text-[11px] tracking-widest text-emerald-400">
              ServiceNow Enterprise
            </span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-medium">
            Now Platform Xanadu • AI Native Architecture
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
            INSTANCE: sn-prod-ai-studio-01.service-now.com
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">Staff AI Engineer Candidate Showcase</span>
          </div>
          <div className="hidden sm:flex items-center space-x-1 px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700 text-[10px] text-slate-300">
            <Server className="w-3 h-3 text-cyan-400" />
            <span>Hybrid NowLLM + Gemini 3.8 Gateway</span>
          </div>
        </div>
      </div>

      {/* Main Branding & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black text-lg">
              SN
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  ServiceNow Staff AI Engineer Suite
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Role Competency Platform
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Architectural Demonstration of AI Agent Studio, Control Tower, Skill Kit, Workflow
                Data Fabric, MCP & OTel
              </p>
            </div>
          </div>
        </div>

        {/* Global Live Action: Trigger End-to-End Outage Triage */}
        <div className="flex items-center space-x-2">
          <button
            id="btn-run-p1-triage-demo"
            onClick={onRunDemoIncident}
            disabled={isExecutingDemo}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold shadow-md transition-all ${
              isExecutingDemo
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold hover:shadow-emerald-500/25 active:scale-95'
            }`}
          >
            <Sparkles
              className={`w-4 h-4 ${isExecutingDemo ? 'animate-spin text-emerald-400' : 'text-slate-950'}`}
            />
            <span>
              {isExecutingDemo
                ? 'Orchestrating P1 Autonomous Triage...'
                : 'Simulate P1 Agentic Remediation'}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex space-x-1 overflow-x-auto pb-1 scrollbar-none" aria-label="Tabs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 border-b-2 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-emerald-400/20 text-emerald-300 font-mono'
                      : 'bg-slate-800 text-slate-400 font-mono'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
