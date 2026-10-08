import React, { useState } from 'react';
import { 
  GitCommit, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, Check, ArrowDown, Sliders, ToggleLeft, ToggleRight
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

const FallThroughStudio = () => {
  const [selectedCaseVal, setSelectedCaseVal] = useState(2);
  const [breaks, setBreaks] = useState({
    1: false,
    2: false,
    3: true,
    4: false,
    default: true
  });

  const toggleBreak = (caseKey) => {
    setBreaks(prev => ({
      ...prev,
      [caseKey]: !prev[caseKey]
    }));
  };

  // Simulate execution stream
  const simulateExecution = () => {
    const executed = [];
    let started = false;

    const cases = [
      { id: 1, label: "Jan ", key: "1" },
      { id: 2, label: "Feb ", key: "2" },
      { id: 3, label: "Mar ", key: "3" },
      { id: 4, label: "Apr ", key: "4" },
      { id: 99, label: "DefaultEnd ", key: "default" }
    ];

    // Determine entry point
    let entryIdx = -1;
    if (selectedCaseVal === 1) entryIdx = 0;
    else if (selectedCaseVal === 2) entryIdx = 1;
    else if (selectedCaseVal === 3) entryIdx = 2;
    else if (selectedCaseVal === 4) entryIdx = 3;
    else entryIdx = 4; // default

    for (let i = entryIdx; i < cases.length; i++) {
      const c = cases[i];
      executed.push({
        id: c.id,
        label: c.label,
        hasBreak: breaks[c.key],
        isEntry: i === entryIdx
      });

      if (breaks[c.key]) {
        // Stopped by break
        break;
      }
    }

    return executed;
  };

  const executedSteps = simulateExecution();
  const outputString = executedSteps.map(s => s.label).join("");

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
            <ArrowDown className="w-3.5 h-3.5" /> Control Flow Cascade Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Fall-Through Mechanics & Selective `break` Explorer
          </h2>
        </div>
        
        {/* Reset */}
        <button
          onClick={() => {
            setSelectedCaseVal(2);
            setBreaks({ 1: false, 2: false, 3: true, 4: false, default: true });
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset to Classic CBSE Question
        </button>
      </div>

      {/* Input Selection Bar */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Select Entry Value (`int month`):
          </span>
          <div className="flex items-center gap-1.5 font-mono">
            {[1, 2, 3, 4, 99].map(num => (
              <button
                key={num}
                onClick={() => setSelectedCaseVal(num)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  selectedCaseVal === num 
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-950' 
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {num === 99 ? 'default (99)' : `case ${num}:`}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Toggle individual <code className="text-purple-300 font-mono">break;</code> statements below!
        </div>
      </div>

      {/* Main Interactive Waterfall Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Interactive Code Blocks with Break Toggles */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="text-slate-500 border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>int month = {selectedCaseVal};</span>
            <span className="text-[11px] font-sans text-slate-400">Click break buttons to toggle</span>
          </div>
          <p className="text-sky-300">switch (month) {'{'}</p>

          {/* Cases 1 to 4 and default */}
          {[
            { id: 1, text: 'System.out.print("Jan ");', key: '1' },
            { id: 2, text: 'System.out.print("Feb ");', key: '2' },
            { id: 3, text: 'System.out.print("Mar ");', key: '3' },
            { id: 4, text: 'System.out.print("Apr ");', key: '4' },
            { id: 99, text: 'System.out.print("DefaultEnd ");', key: 'default', label: 'default:' }
          ].map(c => {
            const hasBrk = breaks[c.key];
            const isEntry = (c.id === selectedCaseVal) || (c.id === 99 && ![1, 2, 3, 4].includes(selectedCaseVal));
            const wasExecuted = executedSteps.some(s => s.id === c.id);

            return (
              <div
                key={c.id}
                className={`p-3 rounded-xl border transition-all ${
                  isEntry
                    ? 'bg-rose-500/15 border-rose-500/50 text-white shadow-md shadow-rose-950/20'
                    : wasExecuted
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                      : 'bg-slate-900/40 border-slate-800/40 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-200">
                    {c.label || `case ${c.id}:`}
                    {isEntry && (
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-rose-500 text-white font-sans font-bold">
                        ENTRY POINT
                      </span>
                    )}
                    {wasExecuted && !isEntry && (
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-sans">
                        FELL THROUGH
                      </span>
                    )}
                  </span>

                  {/* Toggle Break Button */}
                  <button
                    onClick={() => toggleBreak(c.key)}
                    className={`px-2.5 py-1 rounded text-[11px] font-sans font-bold transition cursor-pointer border ${
                      hasBrk
                        ? 'bg-purple-600/30 text-purple-300 border-purple-500/40 hover:bg-purple-600/40'
                        : 'bg-slate-800 text-slate-500 border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    {hasBrk ? 'break; [PRESENT]' : 'break; [OMITTED]'}
                  </button>
                </div>

                <div className="pl-4 text-emerald-300">
                  {c.text}
                </div>
                {hasBrk && (
                  <div className="pl-4 text-purple-300 font-bold">
                    break;
                  </div>
                )}
              </div>
            );
          })}

          <p className="text-sky-300">{'}'}</p>
        </div>

        {/* Right Side: Output Stream & Cascading River Breakdown */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
              Evaluated Program Output:
            </span>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-emerald-400 font-extrabold text-lg">
              "{outputString}"
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Notice how multiple strings concatenated together because of missing breaks!
            </p>
          </div>

          {/* Stepper Pipeline */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
              Execution Path Flow:
            </span>
            <div className="space-y-1.5 text-xs font-sans">
              {executedSteps.map((st, sIdx) => (
                <div 
                  key={sIdx}
                  className={`flex items-center justify-between p-2.5 rounded-lg border ${
                    st.isEntry 
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] font-bold">
                      {sIdx + 1}
                    </span>
                    <span className="font-mono font-bold">
                      {st.id === 99 ? 'default' : `case ${st.id}`}: Printed "{st.label}"
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold ${
                    st.hasBreak ? 'text-purple-400' : 'text-rose-400'
                  }`}>
                    {st.hasBreak ? 'Hit break; -> HALTED' : 'No break -> Cascaded down'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-400 font-bold block mb-1">
              The Golden Exam Rule for Output Questions:
            </strong>
            When solving switch output questions in CBSE IT-802, find the <strong>initial entry point</strong> where the variable matches. From that point downward, execute <strong>every line</strong> unconditionally until you see a <code className="text-purple-300 font-mono">break;</code>! Do NOT stop simply because a case label does not match.
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic7() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <ArrowDown className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Fall-Through Behavior in Java Switch Statements
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Master how omitted <code className="text-purple-400 font-mono">break;</code> statements cause execution to cascade through subsequent cases unconditionally, understand intentional grouping (vowels & weekdays), and predict tricky board exam outputs.
        </p>
      </div>

      {/* Interactive Fall-Through Studio */}
      <div className="max-w-6xl mx-auto">
        <FallThroughStudio />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Fall-Through Behavior Revision Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Fall-Through & Break" 
          description="Master 25 exam-tested questions on fall-through mechanics, intentional case stacking, cascaded arithmetic updates, and default fall-through traps with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Fall-through is the single biggest trap in CBSE switch questions! Remember: once Java enters a case, it completely stops checking case labels! If 'case 1:' has no break, Java will execute 'case 2:' even if your variable is 1! It only stops when it hits an explicit 'break;' statement or the closing brace '}'. Trace downward line-by-line without assuming early exits." 
        />
      </div>
    </div>
  );
}
