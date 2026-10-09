import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  BookOpen, ArrowRight, ShieldCheck, Terminal, Code, 
  Zap, Layers, RefreshCw, Key, Shield, Check, Flame
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const ConstructorAnatomyVisualizer = () => {
  const [hasReturnType, setHasReturnType] = useState(false);
  const [nameMatch, setNameMatch] = useState(true);

  const isValidConstructor = !hasReturnType && nameMatch;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Key className="w-3.5 h-3.5" /> Syntax & Semantic Analyzer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Anatomy of a Java Constructor: The 3 Golden Rules
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          CBSE Board Exam Core Concept
        </div>
      </div>

      {/* Interactive Toggle Workbench */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            1. Return Type Specifier:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setHasReturnType(false)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                !hasReturnType
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}
            >
              No Return Type (Valid)
            </button>
            <button
              onClick={() => setHasReturnType(true)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                hasReturnType
                  ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-950'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}
            >
              Add `void` (Trap!)
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            2. Method Name Match:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setNameMatch(true)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                nameMatch
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}
            >
              Exact Match (`Student`)
            </button>
            <button
              onClick={() => setNameMatch(false)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                !nameMatch
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}
            >
              Different (`initStudent`)
            </button>
          </div>
        </div>
      </div>

      {/* Code Preview & Diagnostics */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Generated Java Class Blueprint:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`public class Student {
    int roll;
    String name;

    // ${isValidConstructor ? '✅ VALID CONSTRUCTOR' : '❌ REGULAR METHOD (NOT A CONSTRUCTOR)'}
    public ${hasReturnType ? 'void ' : ''}${nameMatch ? 'Student' : 'initStudent'}() {
        roll = 101;
        name = "Mamata";
        System.out.println("Initialized!");
    }
}`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            isValidConstructor
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {isValidConstructor ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
              <span>{isValidConstructor ? "Valid Constructor Active" : "Demoted to Regular Method"}</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">
              {isValidConstructor 
                ? "Shares the exact class name ('Student') and has NO return type. Will execute automatically when 'new Student()' is called!"
                : hasReturnType 
                ? "Specifying 'void' converts this constructor into a normal method. It will NEVER run automatically on 'new Student()'!"
                : "Name does not match the class name ('Student'). Java treats this as an ordinary member method."}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            💡 <strong>Golden Rule:</strong> Constructors never return values, not even <code className="text-amber-400">void</code>.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_001 • Topic 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            What is a Constructor in Java?
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master the formal definition, naming conventions, return-type rules, and primary initialization duties of Java constructors.
          </p>
        </div>

        {/* Interactive Analyzer */}
        <ConstructorAnatomyVisualizer />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Java Constructor Definition"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Constructor Definition Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Note (.txt)"
          downloadFileName="004_001_topic2_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Whenever you write a constructor, double check that you didn't accidentally write `public void ClassName()`. Adding `void` is the number 1 mistake students make in board exams, causing it to lose its constructor identity! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic2;
