import React, { useState } from 'react';
import { 
  ArrowLeftRight, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, Check, Layers, Sliders, ToggleLeft, ToggleRight
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const CodeConversionStudio = () => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [testInput, setTestInput] = useState(2);
  const [hasBreaks, setHasBreaks] = useState(true);

  const scenarios = [
    {
      title: "1. Courier Delivery Charges (Zone Code)",
      varName: "zone",
      varType: "int",
      options: [1, 2, 3, 9],
      labels: { 1: "Zone 1 (₹50)", 2: "Zone 2 (₹80)", 3: "Zone 3 (₹120)", 9: "Other (₹200)" },
      ifElseCode: `int charge = 0;
if (zone == 1) {
    charge = 50;
} else if (zone == 2) {
    charge = 80;
} else if (zone == 3) {
    charge = 120;
} else {
    charge = 200;
}`,
      getSwitchCode: (breaks) => `int charge = 0;
switch (zone) {
    case 1:
        charge = 50;
        ${breaks ? 'break;' : '// MISSING BREAK!'}
    case 2:
        charge = 80;
        ${breaks ? 'break;' : '// MISSING BREAK!'}
    case 3:
        charge = 120;
        ${breaks ? 'break;' : '// MISSING BREAK!'}
    default:
        charge = 200;
        ${breaks ? 'break;' : '// MISSING BREAK!'}
}`,
      evalIfElse: (val) => {
        if (val === 1) return "charge = ₹50";
        if (val === 2) return "charge = ₹80";
        if (val === 3) return "charge = ₹120";
        return "charge = ₹200 (Default)";
      },
      evalSwitch: (val, breaks) => {
        if (breaks) {
          if (val === 1) return "charge = ₹50";
          if (val === 2) return "charge = ₹80";
          if (val === 3) return "charge = ₹120";
          return "charge = ₹200 (Default)";
        } else {
          // Fall through simulation
          if (val === 1) return "charge = ₹200 (Fell through 1 -> 2 -> 3 -> default!)";
          if (val === 2) return "charge = ₹200 (Fell through 2 -> 3 -> default!)";
          if (val === 3) return "charge = ₹200 (Fell through 3 -> default!)";
          return "charge = ₹200 (Default)";
        }
      }
    },
    {
      title: "2. Academic Stream Selection",
      varName: "streamCode",
      varType: "int",
      options: [1, 2, 3, 4],
      labels: { 1: "1: Science", 2: "2: Commerce", 3: "3: Arts", 4: "4: Unknown" },
      ifElseCode: `String stream = "";
if (streamCode == 1) {
    stream = "Science";
} else if (streamCode == 2) {
    stream = "Commerce";
} else if (streamCode == 3) {
    stream = "Humanities / Arts";
} else {
    stream = "Vocational IT (802)";
}`,
      getSwitchCode: (breaks) => `String stream = "";
switch (streamCode) {
    case 1:
        stream = "Science";
        ${breaks ? 'break;' : '// MISSING BREAK!'}
    case 2:
        stream = "Commerce";
        ${breaks ? 'break;' : '// MISSING BREAK!'}
    case 3:
        stream = "Humanities / Arts";
        ${breaks ? 'break;' : '// MISSING BREAK!'}
    default:
        stream = "Vocational IT (802)";
        ${breaks ? 'break;' : '// MISSING BREAK!'}
}`,
      evalIfElse: (val) => {
        if (val === 1) return 'stream = "Science"';
        if (val === 2) return 'stream = "Commerce"';
        if (val === 3) return 'stream = "Humanities / Arts"';
        return 'stream = "Vocational IT (802)"';
      },
      evalSwitch: (val, breaks) => {
        if (breaks) {
          if (val === 1) return 'stream = "Science"';
          if (val === 2) return 'stream = "Commerce"';
          if (val === 3) return 'stream = "Humanities / Arts"';
          return 'stream = "Vocational IT (802)"';
        } else {
          return 'stream = "Vocational IT (802)" (Overwritten due to fall-through!)';
        }
      }
    }
  ];

  const currentScen = scenarios[selectedScenarioIdx];
  const ifElseOutput = currentScen.evalIfElse(testInput);
  const switchOutput = currentScen.evalSwitch(testInput, hasBreaks);
  const isIdentical = ifElseOutput.startsWith(switchOutput.substring(0, 10));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" /> CBSE Dual Converter & Equivalence Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            If-Else-If Ladder to Switch-Case Dual Translation Workbench
          </h2>
        </div>
        
        {/* Scenario Tabs */}
        <div className="flex items-center gap-2">
          {scenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedScenarioIdx(idx);
                setTestInput(sc.options[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                selectedScenarioIdx === idx 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-950' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              Scenario {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400">
            Set `{currentScen.varName}` value:
          </span>
          <div className="flex items-center gap-1.5 font-mono">
            {currentScen.options.map(opt => (
              <button
                key={opt}
                onClick={() => setTestInput(opt)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  testInput === opt 
                    ? 'bg-sky-500 text-slate-950 border-sky-400' 
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Break Toggle */}
        <button
          onClick={() => setHasBreaks(!hasBreaks)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center gap-2 ${
            hasBreaks 
              ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40' 
              : 'bg-rose-600 text-white border-rose-400 animate-pulse'
          }`}
        >
          {hasBreaks ? <Check className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
          <span>{hasBreaks ? 'break; Included (Correct)' : 'break; Omitted (Exam Error)'}</span>
        </button>
      </div>

      {/* Side-by-Side Code Conversion View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Side: Original If-Else */}
        <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Original If-Else Ladder
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Mutually Exclusive
              </span>
            </div>
            <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto p-3 bg-slate-900 rounded-lg border border-slate-800">
              {currentScen.ifElseCode}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase font-sans font-bold block mb-1">
              Result from If-Else:
            </span>
            <div className="font-mono text-xs text-emerald-400 font-bold bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              {ifElseOutput}
            </div>
          </div>
        </div>

        {/* Right Side: Converted Switch-Case */}
        <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Equivalent Switch Statement
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                hasBreaks 
                  ? 'bg-sky-500/10 text-sky-300 border-sky-500/20' 
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
              }`}>
                {hasBreaks ? '100% Equivalence' : 'Broken by Fall-Through'}
              </span>
            </div>
            <pre className={`font-mono text-xs leading-relaxed overflow-x-auto p-3 bg-slate-900 rounded-lg border ${
              hasBreaks ? 'border-slate-800 text-slate-300' : 'border-rose-500/40 text-rose-200'
            }`}>
              {currentScen.getSwitchCode(hasBreaks)}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase font-sans font-bold block mb-1">
              Result from Switch-Case:
            </span>
            <div className={`font-mono text-xs font-bold p-2.5 rounded-lg border ${
              isIdentical && hasBreaks
                ? 'bg-slate-900 text-emerald-400 border-slate-800' 
                : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
            }`}>
              {switchOutput}
            </div>
          </div>
        </div>
      </div>

      {/* 5-Step Golden Conversion Rules Card */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
        <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          5-Point Golden Conversion Checklist for CBSE Exams
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs text-slate-300">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <strong className="text-sky-400 block mb-1">1. Variable</strong>
            Put the shared tested variable into <code className="text-amber-300 font-mono">switch(var)</code>.
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <strong className="text-emerald-400 block mb-1">2. Case Labels</strong>
            Convert <code className="text-amber-300 font-mono">== val</code> into <code className="text-emerald-300 font-mono">case val:</code> with a colon.
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <strong className="text-purple-400 block mb-1">3. Insert Breaks</strong>
            Always place <code className="text-purple-300 font-mono font-bold">break;</code> at the end of every case!
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <strong className="text-amber-400 block mb-1">4. Else to Default</strong>
            Map trailing <code className="text-amber-300 font-mono">else</code> to <code className="text-amber-300 font-mono">default:</code>.
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <strong className="text-rose-400 block mb-1">5. Verify Output</strong>
            Trace both codes with sample test values to ensure 100% identical results.
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic4() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ArrowLeftRight className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Converting If-Else-If Ladders to Switch-Case Statements
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Master the mandatory CBSE board question: rewrite <code className="text-emerald-400 font-mono">if-else</code> ladders as clean <code className="text-sky-400 font-mono">switch</code> statements without altering program output, understand the vital role of <code className="text-purple-400 font-mono">break;</code>, and identify when conversion is impossible.
        </p>
      </div>

      {/* Interactive Dual Converter Studio */}
      <div className="max-w-6xl mx-auto">
        <CodeConversionStudio />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: If-Else to Switch Conversion Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Code Conversion" 
          description="Master 25 exam-style questions on converting if-else to switch, break insertion penalties, impossible conversions (ranges, floats), and GUI textfield parsing with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="In the CBSE Class 12 IT-802 board examination, 'Rewrite using switch statement' is a guaranteed 2 to 3-mark question. Remember the #1 mistake students make: forgetting the 'break;' statement! In an if-else ladder, branches are mutually exclusive automatically. But in a switch statement, you must explicitly write 'break;' after each case to prevent catastrophic fall-through into following cases!" 
        />
      </div>
    </div>
  );
}
