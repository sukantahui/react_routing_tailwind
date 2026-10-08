import React, { useState } from 'react';
import { 
  Layers, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, Check, Eye, Sliders, ToggleLeft, ToggleRight
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const SwitchAnatomyStudio = () => {
  const [selectedPillar, setSelectedPillar] = useState('cases'); // 'header', 'cases', 'break', 'default'
  const [includeBreaks, setIncludeBreaks] = useState(true);
  const [defaultPosition, setDefaultPosition] = useState('bottom'); // 'bottom', 'top', 'middle'
  const [testValue, setTestValue] = useState(2);

  const pillars = {
    header: {
      title: "1. The Switch Header: `switch (expression)`",
      badge: "Selector Expression",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      rules: [
        "Encloses the test variable or expression in parentheses.",
        "Evaluated only once upon entering the switch construct.",
        "Permissible types: byte, short, char, int, String, and enum.",
        "Illegal types: float, double, boolean, long cause compile-time errors."
      ],
      examTrap: "Writing `switch (3.14)` throws 'incompatible types: possible lossy conversion from double to int'."
    },
    cases: {
      title: "2. The Case Labels: `case CONSTANT:`",
      badge: "Discrete Targets",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      rules: [
        "Marked with the `case` keyword followed by a constant value and a colon (`:`).",
        "Must be a compile-time constant (literals or final variables).",
        "No duplicate case labels allowed in the same switch.",
        "Cannot use relational conditions like `case > 5:` or ranges."
      ],
      examTrap: "Accidentally writing a semicolon `case 1;` instead of a colon `case 1:` is a fatal syntax error!"
    },
    break: {
      title: "3. The Break Statement: `break;`",
      badge: "Flow Terminator",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      rules: [
        "Immediately terminates execution inside the switch block.",
        "Transfers control to the first statement outside the switch.",
        "Omitting `break;` triggers fall-through into following cases.",
        "Can be replaced by `return` inside methods."
      ],
      examTrap: "Without break, Java will execute every following case unconditionally until a break is found or the switch ends!"
    },
    default: {
      title: "4. The Default Clause: `default:`",
      badge: "Fallback Handler",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      rules: [
        "Executes when no case label matches the switch expression.",
        "It is completely optional; omitting it causes no error.",
        "Only one `default` label is allowed per switch.",
        "Can be placed anywhere (top, middle, or bottom) inside the switch."
      ],
      examTrap: "If `default` is placed at the top or middle WITHOUT a `break;`, it will fall through into the next case!"
    }
  };

  // Calculate simulated terminal output based on testValue, includeBreaks, defaultPosition
  const calculateOutput = () => {
    const logs = [];
    let matched = false;

    // Simulate switch evaluation
    if (defaultPosition === 'top') {
      // Check if testValue matches 1, 2, 3
      if (testValue === 1) {
        logs.push("Case 1 (Gold)");
        if (!includeBreaks) {
          logs.push("Case 2 (Silver)");
          logs.push("Case 3 (Bronze)");
        }
      } else if (testValue === 2) {
        logs.push("Case 2 (Silver)");
        if (!includeBreaks) {
          logs.push("Case 3 (Bronze)");
        }
      } else if (testValue === 3) {
        logs.push("Case 3 (Bronze)");
      } else {
        // Jumps to default at top
        logs.push("Default (Participant)");
        if (!includeBreaks) {
          logs.push("Case 1 (Gold)");
          logs.push("Case 2 (Silver)");
          logs.push("Case 3 (Bronze)");
        }
      }
    } else {
      // Standard or middle
      if (testValue === 1) {
        logs.push("Case 1 (Gold)");
        if (!includeBreaks) {
          logs.push("Case 2 (Silver)");
          if (defaultPosition === 'middle') logs.push("Default (Participant)");
          logs.push("Case 3 (Bronze)");
          if (defaultPosition === 'bottom') logs.push("Default (Participant)");
        }
      } else if (testValue === 2) {
        logs.push("Case 2 (Silver)");
        if (!includeBreaks) {
          if (defaultPosition === 'middle') logs.push("Default (Participant)");
          logs.push("Case 3 (Bronze)");
          if (defaultPosition === 'bottom') logs.push("Default (Participant)");
        }
      } else if (testValue === 3) {
        logs.push("Case 3 (Bronze)");
        if (!includeBreaks && defaultPosition === 'bottom') {
          logs.push("Default (Participant)");
        }
      } else {
        logs.push("Default (Participant)");
        if (!includeBreaks && defaultPosition === 'middle') {
          logs.push("Case 3 (Bronze)");
        }
      }
    }
    return logs.join(" -> ");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Layers className="w-3.5 h-3.5" /> Anatomy & Syntactic Dissection Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The 4 Architectural Pillars of the Switch Statement
          </h2>
        </div>
        
        <div className="text-xs text-slate-400">
          Click any pillar to inspect rules, traps, and execution dynamics
        </div>
      </div>

      {/* 4 Pillars Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { id: 'header', key: 'header', name: '1. Switch Header', code: 'switch(var)' },
          { id: 'cases', key: 'cases', name: '2. Case Labels', code: 'case 1:' },
          { id: 'break', key: 'break', name: '3. Break Statement', code: 'break;' },
          { id: 'default', key: 'default', name: '4. Default Clause', code: 'default:' }
        ].map(p => {
          const item = pillars[p.key];
          const isSelected = selectedPillar === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPillar(p.id)}
              className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                isSelected 
                  ? `${item.bg} ${item.border} border-2 shadow-lg shadow-black/40` 
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 text-slate-400'
              }`}
            >
              <span className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${
                isSelected ? item.color : 'text-slate-500'
              }`}>
                {item.badge}
              </span>
              <div className="text-sm font-bold text-white mb-1">{p.name}</div>
              <code className="text-xs font-mono text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80">
                {p.code}
              </code>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Inspector Box */}
      <div className="bg-slate-950 rounded-xl p-5 sm:p-6 border border-slate-800 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
          <h3 className={`text-base font-bold ${pillars[selectedPillar].color}`}>
            {pillars[selectedPillar].title}
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Pillar Scope Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Key Syntax Rules & Requirements:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {pillars[selectedPillar].rules.map((rule, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> CBSE Examiner Favorite Trap:
              </span>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                {pillars[selectedPillar].examTrap}
              </p>
            </div>
            <div className="text-[11px] text-rose-400 font-mono mt-3">
              // Strict board marking criteria applies
            </div>
          </div>
        </div>
      </div>

      {/* Live Dissection Sandbox & Output Predictor */}
      <div className="bg-slate-950 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Live Anatomy Sandbox & Output Predictor
            </h4>
            <p className="text-xs text-slate-400">
              Toggle break statements and default placement to watch live execution flow change
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIncludeBreaks(!includeBreaks)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                includeBreaks 
                  ? 'bg-purple-600 text-white border-purple-400' 
                  : 'bg-rose-600 text-white border-rose-400 animate-pulse'
              }`}
            >
              {includeBreaks ? 'break; ENABLED' : 'break; OMITTED (FALL-THROUGH)'}
            </button>

            <select
              value={defaultPosition}
              onChange={(e) => setDefaultPosition(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-none focus:border-amber-400"
            >
              <option value="bottom">Default at BOTTOM</option>
              <option value="top">Default at TOP</option>
              <option value="middle">Default in MIDDLE</option>
            </select>
          </div>
        </div>

        {/* Value selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Test Variable `int medal = `:</span>
          {[1, 2, 3, 99].map(val => (
            <button
              key={val}
              onClick={() => setTestValue(val)}
              className={`px-3 py-1 rounded-lg font-mono font-bold transition cursor-pointer border ${
                testValue === val 
                  ? 'bg-amber-500 text-slate-950 border-amber-400' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {val === 99 ? '99 (Unmatched)' : val}
            </button>
          ))}
        </div>

        {/* Live Code Representation & Terminal Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-300 space-y-1 overflow-x-auto">
            <span className="text-slate-500">// Generated Java Switch</span>
            <p className="text-sky-300">int medal = {testValue};</p>
            <p className="text-sky-300">switch (medal) {'{'}</p>
            
            {defaultPosition === 'top' && (
              <div className="pl-4 text-amber-300 bg-amber-500/5 p-1 rounded">
                default: System.out.print("Default ");
                {includeBreaks && <span className="text-purple-300 block pl-4">break;</span>}
              </div>
            )}

            <div className="pl-4 text-emerald-300">
              case 1: System.out.print("Case 1 ");
              {includeBreaks && <span className="text-purple-300 block pl-4">break;</span>}
            </div>

            <div className="pl-4 text-emerald-300">
              case 2: System.out.print("Case 2 ");
              {includeBreaks && <span className="text-purple-300 block pl-4">break;</span>}
            </div>

            {defaultPosition === 'middle' && (
              <div className="pl-4 text-amber-300 bg-amber-500/5 p-1 rounded">
                default: System.out.print("Default ");
                {includeBreaks && <span className="text-purple-300 block pl-4">break;</span>}
              </div>
            )}

            <div className="pl-4 text-emerald-300">
              case 3: System.out.print("Case 3 ");
              {includeBreaks && <span className="text-purple-300 block pl-4">break;</span>}
            </div>

            {defaultPosition === 'bottom' && (
              <div className="pl-4 text-amber-300 bg-amber-500/5 p-1 rounded">
                default: System.out.print("Default ");
                {includeBreaks && <span className="text-purple-300 block pl-4">break;</span>}
              </div>
            )}

            <p className="text-sky-300">{'}'}</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between font-sans">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Simulated Output Stream:
              </span>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-emerald-400 font-bold text-xs">
                {calculateOutput()}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
              {!includeBreaks ? (
                <span className="text-rose-400">
                  ⚡ <strong>Notice Fall-Through:</strong> Because `break;` is omitted, execution does not stop after the matched case; it cascades into subsequent blocks unconditionally!
                </span>
              ) : (
                <span className="text-emerald-400">
                  ✓ <strong>Clean Execution:</strong> The `break;` statement terminates the switch block immediately after the target case finishes.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic2() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Layers className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Anatomy of Switch: Expression, Case Labels, Break & Default
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Dissect the four indispensable building blocks of Java's <code className="text-sky-400 font-mono">switch</code> statement: the header expression, compile-time <code className="text-emerald-400 font-mono">case</code> labels with colons, flow-halting <code className="text-purple-400 font-mono">break;</code> statements, and fallback <code className="text-amber-400 font-mono">default:</code> clauses.
        </p>
      </div>

      {/* Interactive Anatomy Studio */}
      <div className="max-w-6xl mx-auto">
        <SwitchAnatomyStudio />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Anatomy of Switch Statement Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Anatomy of Switch" 
          description="Master 25 exam-tested questions on case colon syntax, constant expression restrictions, break mechanics, and default placement traps with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Always check punctuation in switch statements! Every case label must end with a colon (:), not a semicolon (;). And remember: if you place the default label anywhere other than the bottom, you MUST add a 'break;' statement to it, otherwise it will fall through into the next case when no other case matches!" 
        />
      </div>
    </div>
  );
}
