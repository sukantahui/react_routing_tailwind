import React, { useState } from 'react';
import {
  Bot, Sparkles, BookOpen, Code, CheckCircle2,
  AlertTriangle, HelpCircle, ShieldCheck, FileText,
  Activity, ArrowRight, Layers, Cpu, Check, Play, RefreshCw, Globe
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/ai_foundations_engine.py?raw";

// Interactive Turing Test & Narrow vs General AI Sandbox
const TuringTestSandbox = () => {
  const [selectedPrompt, setSelectedPrompt] = useState('prompt1');

  const prompts = {
    prompt1: {
      userQ: "What is the weather like in Kolkata today?",
      aiResponse: "Local Doppler weather radar reports 30°C with 62% relative humidity and clear skies in Kolkata.",
      category: "Artificial Narrow Intelligence (ANI / Weak AI)",
      badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/40",
      analysis: "High accuracy within single domain (weather retrieval). Fails if asked to write novel philosophy or synthesize emotions."
    },
    prompt2: {
      userQ: "Are you genuinely conscious and self-aware of your existence?",
      aiResponse: "I am a pattern-matching machine learning model executing tensor calculations. I possess no subjective conscious experience.",
      category: "Theoretical Threshold: AGI vs ANI",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/40",
      analysis: "Exhibits linguistic competence without subjective consciousness (sentience). Artificial General Intelligence (AGI) remains hypothetical."
    },
    prompt3: {
      userQ: "Diagnose this patient: Fever 102°F, rash on torso, platelets 85,000.",
      aiResponse: "Inference Engine Match: Potential Dengue viral fever with thrombocytopenia. Urgent recommendation: Complete Blood Count & NS1 antigen test.",
      category: "Expert System / Heuristic Rule Engine",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      analysis: "Emulates specialist physician reasoning using Knowledge Base rules (similar to classic MYCIN system)."
    }
  };

  const activeData = prompts[selectedPrompt];

  return (
    <div className="bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Bot size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Turing Test &amp; AI Capability Sandbox
            </h3>
            <p className="text-xs text-slate-400">
              Evaluate natural language conversational intelligence and classify responses across Weak AI (ANI) and Expert Systems.
            </p>
          </div>
        </div>

        {/* Category Pill */}
        <span className={`text-[11px] font-mono px-3 py-1 rounded-full border font-bold ${activeData.badgeColor}`}>
          {activeData.category}
        </span>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'prompt1', label: '1. Domain-Specific Query (Weather)' },
          { id: 'prompt2', label: '2. Sentience & Self-Awareness' },
          { id: 'prompt3', label: '3. Medical Expert Diagnostic' }
        ].map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPrompt(p.id)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              selectedPrompt === p.id
                ? 'bg-purple-600 text-white border-purple-500 font-bold shadow'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Dialogue Simulation Stage */}
      <div className="space-y-3 font-mono text-xs">
        {/* Human Interrogator Message */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-sans text-xs shrink-0">
            H
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-sans font-bold">Human Interrogator:</span>
            <p className="text-white font-medium text-sm font-sans">{activeData.userQ}</p>
          </div>
        </div>

        {/* AI Response Message */}
        <div className="bg-purple-950/20 p-4 rounded-xl border border-purple-500/30 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold font-sans text-xs shrink-0">
            <Bot size={16} />
          </div>
          <div className="space-y-1">
            <span className="text-purple-400 text-[10px] uppercase font-sans font-bold">AI Agent (Response Stream):</span>
            <p className="text-purple-200 font-medium text-sm font-sans leading-relaxed">{activeData.aiResponse}</p>
          </div>
        </div>
      </div>

      {/* Evaluation Assessment */}
      <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
        <CheckCircle2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Turing Evaluation Note: </strong>
          {activeData.analysis}
        </div>
      </div>
    </div>
  );
};

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 003 · Topic 1
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Artificial Intelligence Foundations
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Artificial Intelligence (AI): Definition, History, Weak vs Strong AI &amp; Applications
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the history and architecture of Artificial Intelligence. Understand John McCarthy&apos;s 1956 foundations, Alan Turing&apos;s Imitation Game, Artificial Narrow Intelligence (ANI) vs General Intelligence (AGI), Expert Systems, and transformative real-world applications.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                The 3 Levels of Artificial Intelligence
              </h2>
              <p className="text-xs text-slate-400">
                From domain-specific narrow agents to human-level versatile general intelligence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2.5">
              <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">Level 1 · Reality</span>
              <h3 className="text-base font-bold text-white">Weak / Narrow AI (ANI)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Specialized in executing <strong>one single dedicated task</strong> (e.g. Siri voice recognition, spam filters, chess algorithms). All currently existing AI systems are Narrow AI.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2.5">
              <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">Level 2 · Research</span>
              <h3 className="text-base font-bold text-white">General / Strong AI (AGI)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hypothetical machine possessing <strong>human-level cognitive breadth</strong>. Can understand context, transfer knowledge across unrelated disciplines, and reason creatively.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2.5">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">Level 3 · Theoretical</span>
              <h3 className="text-base font-bold text-white">Superintelligence (ASI)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A theoretical evolutionary point where synthetic machine intelligence vastly surpasses the collective intellectual capabilities of all human minds combined.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Sandbox */}
        <TuringTestSandbox />

        {/* 4. Deep Technical Breakdown: AI Hierarchy & Expert Systems */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Anatomy of an AI Expert System
              </h2>
              <p className="text-xs text-slate-400">
                How Knowledge Bases and Inference Engines emulate human specialist diagnosis.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Component 1</span>
              <h3 className="text-sm font-bold text-white">Knowledge Base</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The structured data store containing facts, relationships, and IF-THEN production rules gathered by knowledge engineers from human domain specialists.
              </p>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">Component 2</span>
              <h3 className="text-sm font-bold text-white">Inference Engine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The reasoning brain that applies logical deduction (Forward Chaining or Backward Chaining) to derive diagnoses and recommendations from user-supplied facts.
              </p>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">Component 3</span>
              <h3 className="text-sm font-bold text-white">User Interface &amp; Explainer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enables non-technical users to input queries and view transparent explanations detailing exactly why a specific recommendation was deduced.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Python File Loader */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              AI Expert System &amp; Turing Test Simulator
            </h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="ai_foundations_engine.py"
            highlightLines={[12, 18, 30, 39, 44]}
          />
        </div>

        {/* 6. Real-World Applications */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Real-World Applications Transforming Global Industries
              </h2>
              <p className="text-xs text-slate-400">
                Where artificial intelligence drives daily consumer and industrial systems.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Healthcare</span>
              <h3 className="text-base font-bold text-white">Medical Imaging &amp; Drug Discovery</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deep learning models analyze MRI and CT scans to detect early-stage oncological tumors with accuracy matching specialist radiologists, while AI accelerates molecular protein folding.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Transportation</span>
              <h3 className="text-base font-bold text-white">Autonomous Self-Driving Vehicles</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sensor fusion algorithms process camera, LiDAR, and radar feeds to predict pedestrian trajectory and navigate traffic safely without human intervention.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} /> Common Misconceptions
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-rose-300">Assuming Current AI is Conscious:</strong> Siri, Alexa, and LLMs are Narrow AI (statistical pattern matchers), not sentient beings.
              </li>
              <li>
                <strong className="text-rose-300">Confusing AI with ML:</strong> ML is a subset of AI, not a synonym. Rule-based expert systems are AI without being ML.
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} /> Examination Best Practices
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-emerald-300">Remember Key Dates &amp; Names:</strong> 1950 (Alan Turing / Turing Test), 1956 (John McCarthy / Dartmouth Conference).
              </li>
              <li>
                <strong className="text-emerald-300">Structure Expert Systems:</strong> Clearly identify Knowledge Base + Inference Engine + User Interface.
              </li>
            </ul>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-purple-400 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-slate-300">
            <strong className="text-purple-400 font-semibold">Teacher&apos;s Memory Hook:</strong>
            <p className="mt-1">
              Remember the concentric circles: <strong>AI</strong> is the outer circle (machines imitating intelligence), <strong>Machine Learning</strong> is the middle circle (learning from data), and <strong>Deep Learning</strong> is the innermost circle (multi-layered neural networks).
            </p>
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <FAQTemplate
          title="CBSE Class XI Computer Science (083) – Artificial Intelligence FAQs"
          questions={questions}
        />

        {/* 10. Plain Text Printable Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XI CS 083 – Artificial Intelligence Quick Revision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Plain Text Note"
          downloadFileName="topic1_ai_foundations_note.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="Artificial Intelligence represents one of the most exciting frontiers in modern computing. In CBSE Class XI CS 083 exams, understand the key distinctions between Weak AI (Narrow) and Strong AI (General), know the historical milestones of Alan Turing and John McCarthy, and remember the architecture of Expert Systems. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
