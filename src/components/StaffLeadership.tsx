import React, { useState } from 'react';
import {
  Award,
  Users,
  FileCheck,
  HelpCircle,
  Sparkles,
  Send,
  BookOpen,
  CheckCircle2,
  Shield,
  Briefcase,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { InterviewDefenseScenario } from '../types';
import { candidateProfile, interviewScenarios } from '../data/mockData';

export const StaffLeadership: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<InterviewDefenseScenario>(
    interviewScenarios[0]
  );
  const [customQuestion, setCustomQuestion] = useState('');
  const [defenseAnswer, setDefenseAnswer] = useState<string>(interviewScenarios[0].suggestedAnswer);
  const [isAsking, setIsAsking] = useState(false);
  const [isLiveAi, setIsLiveAi] = useState(false);

  const handleSelectScenario = (sc: InterviewDefenseScenario) => {
    setSelectedScenario(sc);
    setDefenseAnswer(sc.suggestedAnswer);
    setIsLiveAi(false);
  };

  const handleAskQuestion = async () => {
    const q = customQuestion.trim() || selectedScenario.question;
    setIsAsking(true);
    try {
      const res = await fetch('/api/interview/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          category: selectedScenario.category,
        }),
      });
      const data = await res.json();
      setDefenseAnswer(data.answer);
      setIsLiveAi(data.liveAi);
    } catch (err) {
      console.error('Interview ask error:', err);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Staff Level Engineering & Leadership
              </span>
              <span className="text-xs text-slate-400">
                8+ YOE • 3+ YOE GenAI • ServiceNow Certified
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Staff AI Engineer Qualifications & Architecture Defense
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Demonstrating senior technical leadership: mentoring engineering teams, authoring
              enterprise AI RFCs, establishing responsible AI practices, and defending complex
              systems trade-offs before ServiceNow leadership.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
            <div>
              <div className="text-[10px] text-slate-500">Software Experience</div>
              <div className="text-emerald-400 font-bold font-mono">8+ Years (Total)</div>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div>
              <div className="text-[10px] text-slate-500">Enterprise GenAI</div>
              <div className="text-cyan-400 font-bold font-mono">3+ Years (Production)</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: CANDIDATE VERIFIED CREDENTIALS & SERVICENOW CERTIFICATIONS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Award className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">
                ServiceNow Certifications & Platform Credentials
              </h3>
              <p className="text-[11px] text-slate-400">
                Formally validated competencies across ServiceNow platform architecture and
                generative AI implementations
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {candidateProfile.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-slate-950 p-3.5 rounded-lg border border-slate-800/80 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    {cert.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{cert.date}</span>
                </div>
                <h4 className="font-bold text-white text-xs mt-2">{cert.name}</h4>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center space-x-1 pt-2 border-t border-slate-800">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Verified in Webassessor</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE STAFF AI ARCHITECTURAL DEFENSE (Q&A SIMULATOR) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Interactive Staff AI Architecture Defense (Hiring Manager Sandbox)</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Test candidate defense of complex enterprise AI trade-offs (powered by live Gemini 3.8
              Flash / ServiceNow platform patterns)
            </p>
          </div>
          {isLiveAi && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              Generated via Live Gemini 3.8 Flash
            </span>
          )}
        </div>

        {/* Defense Scenarios Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
              Select Architectural Question
            </span>
            <div className="space-y-2">
              {interviewScenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs ${
                    selectedScenario.id === sc.id
                      ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                      {sc.category}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{sc.title}</div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{sc.question}</p>
                </button>
              ))}
            </div>

            {/* Custom Question input */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                Or Ask Custom Architecture Question
              </span>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="e.g., How do you prevent hallucination in ServiceNow CMDB?"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                />
                <button
                  id="btn-ask-candidate-defense"
                  onClick={handleAskQuestion}
                  disabled={isAsking}
                  className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg text-xs font-bold transition-all shadow shrink-0"
                >
                  {isAsking ? '...' : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Defense Answer Display */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-400 font-mono">
                  Candidate Staff AI Architectural Response
                </span>
                <button
                  onClick={handleAskQuestion}
                  disabled={isAsking}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{isAsking ? 'Synthesizing...' : 'Regenerate with Gemini'}</span>
                </button>
              </div>

              {/* Key Staff Points */}
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                <span className="text-[11px] font-bold text-emerald-400 block uppercase tracking-wider">
                  Staff Engineer Key Competencies Demonstrated:
                </span>
                <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                  {selectedScenario.staffLevelKeyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Detailed Answer */}
              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap max-h-96 overflow-y-auto">
                {defenseAnswer}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: MENTORSHIP & TECHNICAL DIRECTION ARTIFACTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <BookOpen className="w-4 h-4" />
            <span>ServiceNow Enterprise AI Engineering Standards (RFC-2026-08)</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Authored organizational standards requiring all custom GenAI agents on ServiceNow to
            adhere to:
          </p>
          <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc list-inside font-mono">
            <li>
              Zero Raw Eval: All tool executions must be declared via Model Context Protocol (MCP).
            </li>
            <li>
              ACL Inheritance: Unstructured vector documents must bind late via GlideRecordSecure.
            </li>
            <li>Recursion Deadband: Agent2Agent (A2A) calls must terminate within 5 hops.</li>
            <li>
              OTel Mandatory: All prompt spans must emit semantic tokens for departmental
              chargebacks.
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold">
            <Users className="w-4 h-4" />
            <span>Mentoring & Scaling AI Engineering Culture</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Established structured programs to elevate software engineers into proficient applied AI
            engineers:
          </p>
          <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc list-inside font-mono">
            <li>
              Weekly 'Red Team AI Game Days': Hands-on adversarial testing against AI Control Tower.
            </li>
            <li>
              Reusable Skill Kit Scaffolds: Provided pre-tested TypeScript/JavaScript templates.
            </li>
            <li>
              PR Review Checklist: Focused on token efficiency, latency budgets, and security
              posture.
            </li>
            <li>
              Cross-functional translation: Partnering with Product and Platform VPs to prioritize
              use cases.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
