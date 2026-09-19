import React, { useState } from "react";
import {
  Workflow,
  Database,
  Code2,
  Table,
  Search,
  Sparkles,
  Layers,
  FileCode,
  CheckCircle2,
  Play,
  Copy,
  Check,
} from "lucide-react";
import { SkillKitDefinition, CmdbCI } from "../types";
import { skillKitList, mockCmdbList } from "../data/mockData";

export const SkillKitDataFabric: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"skill-kit" | "data-fabric">("skill-kit");
  const [selectedSkill, setSelectedSkill] = useState<SkillKitDefinition>(skillKitList[0]);
  const [copied, setCopied] = useState(false);

  // Vector Search Simulator for Data Fabric
  const [vectorQuery, setVectorQuery] = useState("connection pool exhaustion on customer portal");
  const [cmdbList] = useState<CmdbCI[]>(mockCmdbList);
  const [isSearchingVector, setIsSearchingVector] = useState(false);

  // Calculated cosine similarity mock based on query keywords
  const calculateSimilarity = (ci: CmdbCI, query: string) => {
    const qLower = query.toLowerCase();
    let score = 0.45;
    if (qLower.includes("pool") || qLower.includes("db") || qLower.includes("database") || qLower.includes("postgres")) {
      if (ci.class.includes("database")) score += 0.48;
    }
    if (qLower.includes("ingress") || qLower.includes("k8s") || qLower.includes("timeout") || qLower.includes("gateway")) {
      if (ci.class.includes("kubernetes")) score += 0.46;
    }
    if (qLower.includes("portal") && ci.parent_service.toLowerCase().includes("portal") || ci.parent_service.toLowerCase().includes("customer")) {
      score += 0.25;
    }
    return Math.min(0.98, score);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedSkill.glideScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ServiceNow Native Capabilities
              </span>
              <span className="text-xs text-slate-400">Skill Kit • Workflow Data Fabric (WDF)</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Enterprise Skill Kit & Workflow Data Fabric
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Architecting modular, reusable Skill Kits bound to ServiceNow's unified semantic data layer. Combines
              transactional GlideRecord tables with real-time vector embeddings and strict ACL inheritance.
            </p>
          </div>

          <div className="flex border border-slate-800 rounded-lg p-1 bg-slate-950 text-xs">
            <button
              onClick={() => setActiveSubTab("skill-kit")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeSubTab === "skill-kit"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Skill Kit Studio
            </button>
            <button
              onClick={() => setActiveSubTab("data-fabric")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeSubTab === "data-fabric"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Workflow Data Fabric
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: SKILL KIT STUDIO */}
      {activeSubTab === "skill-kit" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Skill List Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Configured Skill Kits
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {skillKitList.length} Skills
                </span>
              </div>

              <div className="space-y-2">
                {skillKitList.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedSkill.id === skill.id
                        ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-300"
                        : "bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {skill.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Table: {skill.targetTable}</span>
                    </div>
                    <div className="text-xs font-bold mt-1 text-white">{skill.name}</div>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{skill.systemPrompt}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Details & Script Include Viewer */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedSkill.name}</h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ID: {selectedSkill.id} • Target Schema: {selectedSkill.targetTable}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-200 border border-slate-700 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Script Include"}</span>
                </button>
              </div>

              {/* Inputs & Schema */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="font-bold text-slate-300 text-[11px] uppercase tracking-wider block">
                    Input Parameters (Contract)
                  </span>
                  {selectedSkill.inputs.map((inp, idx) => (
                    <div key={idx} className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-emerald-400">{inp.name}</span>
                      <span className="text-slate-500">{inp.type}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="font-bold text-slate-300 text-[11px] uppercase tracking-wider block">
                    Output JSON Schema
                  </span>
                  <pre className="text-[10px] font-mono text-cyan-300 bg-slate-900 p-2 rounded max-h-24 overflow-y-auto">
                    {selectedSkill.outputSchema}
                  </pre>
                </div>
              </div>

              {/* Server-Side Script Include Editor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center space-x-1.5">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ServiceNow Server-Side Script Include (JavaScript ES2022)</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">GlideRecordSecure Enforced</span>
                </div>
                <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-80">
                  {selectedSkill.glideScript}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: WORKFLOW DATA FABRIC */}
      {activeSubTab === "data-fabric" && (
        <div className="space-y-5">
          {/* Semantic Search Sandbox */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>Workflow Data Fabric: CMDB & Vector Hybrid Retrieval</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Translates natural language incident descriptions into grounded CMDB graph records using hybrid
                  embeddings + relational ACL filtering
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800/40">
                Schema: cmdb_ci, cmdb_rel_ci, incident
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={vectorQuery}
                  onChange={(e) => setVectorQuery(e.target.value)}
                  placeholder="Search semantic CMDB fabric (e.g., 'database connection pool timeout')..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                onClick={() => {
                  setIsSearchingVector(true);
                  setTimeout(() => setIsSearchingVector(false), 300);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg transition-all"
              >
                Execute Hybrid Vector Query
              </button>
            </div>

            {/* Live CMDB CI Results with Similarity Scores */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">
                Grounded Configuration Items (CMDB Records in Vector Space):
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cmdbList.map((ci) => {
                  const similarity = calculateSimilarity(ci, vectorQuery);
                  const isTopMatch = similarity > 0.75;
                  return (
                    <div
                      key={ci.sys_id}
                      className={`bg-slate-950 p-3.5 rounded-lg border transition-all ${
                        isTopMatch
                          ? "border-emerald-500/50 bg-emerald-950/20 shadow-sm"
                          : "border-slate-800/80 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {ci.class}
                        </span>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[10px] text-slate-400 font-mono">Cosine Sim:</span>
                          <span
                            className={`text-[11px] font-mono font-bold ${
                              isTopMatch ? "text-emerald-400" : "text-slate-400"
                            }`}
                          >
                            {(similarity * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-white mt-1.5 flex items-center space-x-1.5">
                        <span>{ci.name}</span>
                        {isTopMatch && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                            TOP GROUNDING MATCH
                          </span>
                        )}
                      </h4>

                      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/70 text-[10px] text-slate-400 font-mono">
                        <div>Tier: {ci.tier}</div>
                        <div>Cloud: {ci.cloud_provider}</div>
                        <div>Status: {ci.status.split(" - ")[0]}</div>
                        <div>Owner: {ci.owner}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
