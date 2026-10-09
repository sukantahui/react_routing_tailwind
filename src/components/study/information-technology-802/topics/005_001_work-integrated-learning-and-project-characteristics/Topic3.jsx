import React, { useState } from 'react';
import { 
  Compass, Calendar, DollarSign, Target, Sparkles, 
  CheckCircle2, AlertTriangle, HelpCircle, BookOpen, 
  ArrowRight, ShieldCheck, Terminal, Code, Zap, 
  Layers, RefreshCw, Triangle, Shield, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const TripleConstraintVisualizer = () => {
  const [scopePriority, setScopePriority] = useState(50);
  const [timePriority, setTimePriority] = useState(50);
  const [budgetPriority, setBudgetPriority] = useState(50);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Triangle className="w-3.5 h-3.5" /> Project Constraint Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The Triple Constraint: Scope, Time, and Finite Resources
          </h2>
        </div>

        <div className="text-xs font-mono text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          Quality = f(Scope, Time, Cost)
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
            <Calendar className="w-4 h-4" /> 1. Beginning & End
          </div>
          <h3 className="text-sm font-bold text-white">Time-Bound Lifecycle</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Strict start and completion milestone dates prevent perpetual project slippage.
          </p>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Target className="w-4 h-4" /> 2. Defined Scope
          </div>
          <h3 className="text-sm font-bold text-white">Clear Deliverables</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Specific functional modules (e.g. login, payment, reports) are contractually locked.
          </p>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <DollarSign className="w-4 h-4" /> 3. Finite Resources
          </div>
          <h3 className="text-sm font-bold text-white">Bounded Capital</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Constrained by fixed developer hours, hardware specifications, and budget allocations.
          </p>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4" /> 4. Distinct Boundaries
          </div>
          <h3 className="text-sm font-bold text-white">Scope Creep Shield</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Distinguishes what is inside the project agreement from out-of-scope client additions.
          </p>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" /> Interactive Trade-off Simulator
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Scope Expansion:</span>
              <span className="font-mono text-sky-400 font-bold">{scopePriority}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={scopePriority}
              onChange={(e) => setScopePriority(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Timeline Compression (Time):</span>
              <span className="font-mono text-emerald-400 font-bold">{timePriority}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={timePriority}
              onChange={(e) => setTimePriority(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Resource & Budget Ceiling:</span>
              <span className="font-mono text-amber-400 font-bold">{budgetPriority}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={budgetPriority}
              onChange={(e) => setBudgetPriority(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          💡 If you expand <strong>Scope</strong> without increasing <strong>Time (Schedule)</strong> or <strong>Budget (Resources)</strong>, software quality drops and bugs emerge!
        </div>
      </div>
    </div>
  );
};

const Topic3 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 005_001 • Topic 3
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Characteristics of a Project: Definite Beginning & End, Defined Scope, Finite Resources & Distinct Boundaries
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Analyze the four universal characteristics of software projects, explore the Project Management Triple Constraint (Iron Triangle), and understand how project boundaries prevent scope creep.
          </p>
        </div>

        {/* Triple Constraint Visualizer */}
        <TripleConstraintVisualizer />

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="Always remember the four cardinal characteristics of a project for your Class XII IT theory paper: 1) Definite beginning and end, 2) Defined scope and extent, 3) Finite resources, and 4) Distinct boundaries. If a system lacks boundaries and runs perpetually, it is NOT a project!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Core Characteristics of a Project"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic3;
