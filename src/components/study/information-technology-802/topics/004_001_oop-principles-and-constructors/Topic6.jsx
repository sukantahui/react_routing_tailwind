import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  BookOpen, ArrowRight, ShieldCheck, Terminal, Code, 
  Zap, Layers, RefreshCw, Split, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const MethodVsConstructorComparison = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Split className="w-3.5 h-3.5" /> High-Yield Board Comparison Matrix
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Constructors vs Methods in Java: The Definitive Breakdown
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          CBSE IT (802) 3-Mark Question
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left text-slate-300 border-collapse bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900 text-slate-200 font-mono">
              <th className="p-3.5 font-semibold">Feature Dimension</th>
              <th className="p-3.5 font-semibold text-purple-400">Java Constructor</th>
              <th className="p-3.5 font-semibold text-sky-400">Standard Member Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 font-mono">
            <tr className="hover:bg-slate-900/50">
              <td className="p-3.5 font-sans font-bold text-white">1. Name Constraint</td>
              <td className="p-3.5 text-purple-300">MUST be identical to the class name</td>
              <td className="p-3.5 text-sky-300">Any valid Java identifier (e.g. calculateBonus)</td>
            </tr>
            <tr className="hover:bg-slate-900/50">
              <td className="p-3.5 font-sans font-bold text-white">2. Return Type</td>
              <td className="p-3.5 text-purple-300">NO return type allowed (not even void)</td>
              <td className="p-3.5 text-sky-300">MUST specify return type (int, double, void, etc.)</td>
            </tr>
            <tr className="hover:bg-slate-900/50">
              <td className="p-3.5 font-sans font-bold text-white">3. Primary Responsibility</td>
              <td className="p-3.5 text-purple-300">Initializes object state during heap allocation</td>
              <td className="p-3.5 text-sky-300">Executes computational operations and business logic</td>
            </tr>
            <tr className="hover:bg-slate-900/50">
              <td className="p-3.5 font-sans font-bold text-white">4. Invocation Trigger</td>
              <td className="p-3.5 text-purple-300">Automatically triggered by `new` operator</td>
              <td className="p-3.5 text-sky-300">Explicitly invoked via object reference dot (`obj.method()`)</td>
            </tr>
            <tr className="hover:bg-slate-900/50">
              <td className="p-3.5 font-sans font-bold text-white">5. Inheritance</td>
              <td className="p-3.5 text-purple-300">NOT inherited by child classes (called via `super()`)</td>
              <td className="p-3.5 text-sky-300">Inherited directly by child subclasses</td>
            </tr>
            <tr className="hover:bg-slate-900/50">
              <td className="p-3.5 font-sans font-bold text-white">6. Compiler Default</td>
              <td className="p-3.5 text-purple-300">Compiler auto-generates no-arg default if none written</td>
              <td className="p-3.5 text-sky-300">Compiler never generates default methods</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Topic6 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_001 • Topic 6
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Differences Between Methods and Constructors in Java
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master the 6 key architectural differences between Java constructors and standard member methods for full marks in CBSE board theory examinations.
          </p>
        </div>

        {/* Matrix */}
        <MethodVsConstructorComparison />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Constructors vs Methods"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Method vs Constructor Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 6 Note (.txt)"
          downloadFileName="004_001_topic6_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Make sure to memorize at least 3 distinct differences between constructors and methods. Writing 'Constructors have no return type while methods have a return type' and 'Constructors have the same name as the class' will earn you quick full marks in the exam! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic6;
