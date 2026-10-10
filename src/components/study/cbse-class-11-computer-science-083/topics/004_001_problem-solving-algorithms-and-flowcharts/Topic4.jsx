import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic4Questions } from "./topic4_files/topic4_questions";

export default function Topic4() {
  // Selected symbol state for the Symbol Inspector
  const [selectedSymbol, setSelectedSymbol] = useState("terminal");

  // Flowchart Symbol Mapping Builder State (Even / Odd validation game)
  const [userMapping, setUserMapping] = useState({
    step1: "terminal",
    step2: "io",
    step3: "decision",
    step4: "io",
    step5: "io",
    step6: "terminal"
  });

  const [validationSubmitted, setValidationSubmitted] = useState(false);

  const symbolsInfo = {
    terminal: {
      name: "Terminal (Start / Stop / End / Halt)",
      shape: "Oval / Rounded Rectangle (Stadium)",
      ansiStandard: "ANSI X3.5 / ISO 5807",
      inOutRules: "Start has 0 incoming, 1 outgoing flow line. Stop/End has 1 or more incoming, 0 outgoing flow lines.",
      usage: "Indicates the exact entry and exit boundaries of an algorithm or program execution sequence.",
      example: "Start, Stop, End, Return",
      color: "from-emerald-600 to-teal-700",
      svg: (
        <svg viewBox="0 0 160 80" className="w-40 h-20">
          <rect x="10" y="15" width="140" height="50" rx="25" ry="25" fill="#10B981" stroke="#047857" strokeWidth="3" />
          <text x="80" y="45" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="14">START / STOP</text>
        </svg>
      )
    },
    io: {
      name: "Input / Output (Data Symbol)",
      shape: "Parallelogram (Rhomboid)",
      ansiStandard: "ANSI X3.5 / ISO 5807",
      inOutRules: "Exactly 1 incoming line and exactly 1 outgoing line.",
      usage: "Represents user input operations (READ, INPUT, GET) or program display/output operations (PRINT, DISPLAY, WRITE).",
      example: "Read Num1, Display 'Result is ' + Sum",
      color: "from-sky-600 to-blue-700",
      svg: (
        <svg viewBox="0 0 160 80" className="w-40 h-20">
          <polygon points="35,15 150,15 125,65 10,65" fill="#0EA5E9" stroke="#0284C7" strokeWidth="3" />
          <text x="80" y="45" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="13">INPUT / OUTPUT</text>
        </svg>
      )
    },
    process: {
      name: "Process / Action Symbol",
      shape: "Rectangle",
      ansiStandard: "ANSI X3.5 / ISO 5807",
      inOutRules: "Exactly 1 incoming line and exactly 1 outgoing line.",
      usage: "Represents computational actions, arithmetic calculations, data manipulation, or variable assignments.",
      example: "Sum = A + B, Count = Count + 1",
      color: "from-indigo-600 to-violet-700",
      svg: (
        <svg viewBox="0 0 160 80" className="w-40 h-20">
          <rect x="15" y="15" width="130" height="50" rx="4" fill="#6366F1" stroke="#4338CA" strokeWidth="3" />
          <text x="80" y="45" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="14">PROCESS (A + B)</text>
        </svg>
      )
    },
    decision: {
      name: "Decision / Branching Symbol",
      shape: "Rhombus / Diamond",
      ansiStandard: "ANSI X3.5 / ISO 5807",
      inOutRules: "Exactly 1 incoming line and 2 (or 3) outgoing lines labeled with condition outcomes (e.g., True/False, Yes/No, >, =, <).",
      usage: "Represents conditional testing and branch determination where the control path diverges based on a Boolean expression.",
      example: "Is Age >= 18?, Is N % 2 == 0?",
      color: "from-amber-500 to-orange-600",
      svg: (
        <svg viewBox="0 0 160 80" className="w-40 h-20">
          <polygon points="80,10 150,40 80,70 10,40" fill="#F59E0B" stroke="#D97706" strokeWidth="3" />
          <text x="80" y="44" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="12">DECISION (?)</text>
        </svg>
      )
    },
    connector: {
      name: "On-Page Connector",
      shape: "Small Circle",
      ansiStandard: "ANSI X3.5 / ISO 5807",
      inOutRules: "Incoming connectors receive flow lines; Outgoing connectors resume flow. Each contains an identical letter/number label (e.g., 'A', '1').",
      usage: "Prevents crisscrossing flow lines and cleans up dense or multi-branch flowcharts on the same drawing page.",
      example: "Circle containing 'A'",
      color: "from-rose-500 to-pink-600",
      svg: (
        <svg viewBox="0 0 160 80" className="w-40 h-20">
          <circle cx="80" cy="40" r="28" fill="#F43F5E" stroke="#BE123C" strokeWidth="3" />
          <text x="80" y="46" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="18">A</text>
        </svg>
      )
    },
    offpage: {
      name: "Off-Page Connector",
      shape: "Pentagon (Downward pointing home plate / shield)",
      ansiStandard: "ANSI X3.5 / ISO 5807",
      inOutRules: "Connects a flow exiting page N to the continuation entry on page N+1. Contains target page/block reference.",
      usage: "Used when a complex flowchart spans multiple physical or virtual pages.",
      example: "Pentagon containing 'Page 2 - Sec B'",
      color: "from-purple-600 to-fuchsia-700",
      svg: (
        <svg viewBox="0 0 160 80" className="w-40 h-20">
          <polygon points="40,15 120,15 120,50 80,70 40,50" fill="#9333EA" stroke="#7E22CE" strokeWidth="3" />
          <text x="80" y="42" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="12">OFF-PAGE</text>
        </svg>
      )
    },
    flowline: {
      name: "Flow Line / Directed Arrow",
      shape: "Straight Arrowed Line",
      ansiStandard: "ANSI X3.5 / ISO 5807",
      inOutRules: "Standard flow moves top-to-bottom and left-to-right. Arrows must never point ambiguously or intersect without clear direction.",
      usage: "Indicates the exact direction and sequence of program control flow from one step to the next.",
      example: "-----> (labeled with True/False when leaving a Decision)",
      color: "from-cyan-600 to-teal-600",
      svg: (
        <svg viewBox="0 0 160 80" className="w-40 h-20">
          <line x1="20" y1="40" x2="130" y2="40" stroke="#06B6D4" strokeWidth="4" />
          <polygon points="130,32 150,40 130,48" fill="#06B6D4" />
          <text x="75" y="30" textAnchor="middle" fill="#0E7490" fontWeight="bold" fontSize="12">Flow (Top-to-Bottom)</text>
        </svg>
      )
    }
  };

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic4Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-teal-900/60 via-slate-900 to-cyan-900/60 p-6 sm:p-8 rounded-3xl border border-teal-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-teal-400">
              <span>CBSE Class 11 CS (083)</span>
              <span>/</span>
              <span>Unit 2: Computational Thinking & Problem Solving</span>
              <span>/</span>
              <span className="text-teal-200">Topic 4</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Flowchart Conventions & Standard ANSI/ISO Symbols
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Master the visual language of algorithm design. Learn the strict ANSI/ISO standard geometric symbols,
              in-degree and out-degree flow line rules, label conventions, connector techniques, and common diagramming pitfalls tested in CBSE Board Examinations.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE SYMBOL EXPLORER */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Interactive ANSI Symbol Inspector
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Visual Geometric Standard Guide</h2>
            </div>
            <span className="text-xs text-slate-400">Click any symbol to inspect ISO/ANSI specs</span>
          </div>

          {/* Symbol Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.keys(symbolsInfo).map((key) => {
              const item = symbolsInfo[key];
              const isSelected = selectedSymbol === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSymbol(key)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 border ${
                    isSelected
                      ? "bg-teal-600/30 border-teal-400 text-white shadow-lg shadow-teal-500/20 scale-105"
                      : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <div className="h-14 flex items-center justify-center scale-75">
                    {item.svg}
                  </div>
                  <span className="text-xs font-semibold capitalize mt-1 line-clamp-1">{key}</span>
                </button>
              );
            })}
          </div>

          {/* Active Symbol Detail Card */}
          {selectedSymbol && (
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-teal-500/40 rounded-2xl p-6 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-xl border border-slate-800 shadow-inner">
                {symbolsInfo[selectedSymbol].svg}
                <span className="text-xs font-mono text-teal-400 mt-3 font-semibold text-center">
                  {symbolsInfo[selectedSymbol].shape}
                </span>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">
                    {symbolsInfo[selectedSymbol].name}
                  </h3>
                  <span className="text-xs font-mono bg-teal-950 text-teal-300 border border-teal-700/50 px-2.5 py-0.5 rounded-full">
                    {symbolsInfo[selectedSymbol].ansiStandard}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-teal-400 font-semibold">Purpose & Usage: </span>
                    <span className="text-slate-300">{symbolsInfo[selectedSymbol].usage}</span>
                  </div>
                  <div>
                    <span className="text-amber-400 font-semibold">Flow Line Rules (In/Out Degree): </span>
                    <span className="text-slate-300">{symbolsInfo[selectedSymbol].inOutRules}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300">
                    <span className="text-slate-500 font-bold uppercase">Standard Syntax Example: </span>
                    {symbolsInfo[selectedSymbol].example}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: INTERACTIVE FLOWCHART VALIDATION GAME */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
              Interactive Drill
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Flowchart Symbol Matcher Challenge</h2>
            <p className="text-slate-400 text-sm mt-1">
              Select the correct ANSI geometric symbol for each step in the algorithm: <strong className="text-teal-300 font-mono">Check if Integer N is Even or Odd</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: "step1", stepNum: 1, text: "Begin execution", correct: "terminal" },
              { id: "step2", stepNum: 2, text: "Read integer input N from user", correct: "io" },
              { id: "step3", stepNum: 3, text: "Test if (N % 2 == 0)", correct: "decision" },
              { id: "step4", stepNum: 4, text: "Display 'Even' to screen", correct: "io" },
              { id: "step5", stepNum: 5, text: "Display 'Odd' to screen", correct: "io" },
              { id: "step6", stepNum: 6, text: "Terminate execution", correct: "terminal" }
            ].map((step) => {
              const isCorrect = userMapping[step.id] === step.correct;
              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    validationSubmitted
                      ? isCorrect
                        ? "bg-emerald-950/40 border-emerald-500/50"
                        : "bg-rose-950/40 border-rose-500/50"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-teal-400">Step {step.stepNum}</span>
                    {validationSubmitted && (
                      <span className={`text-xs font-bold font-mono ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                        {isCorrect ? "✓ Correct" : `✗ Needs: ${step.correct}`}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-200 font-medium mb-3">{step.text}</p>
                  <select
                    value={userMapping[step.id]}
                    onChange={(e) => {
                      setUserMapping((prev) => ({ ...prev, [step.id]: e.target.value }));
                      setValidationSubmitted(false);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-teal-400"
                  >
                    <option value="terminal">Oval (Terminal)</option>
                    <option value="io">Parallelogram (Input / Output)</option>
                    <option value="process">Rectangle (Process)</option>
                    <option value="decision">Diamond (Decision / Branch)</option>
                    <option value="connector">Circle (Connector)</option>
                  </select>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setValidationSubmitted(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-cyan-500 transition-all"
            >
              Validate Symbols
            </button>
            {validationSubmitted && (
              <span className="text-sm font-mono text-slate-300">
                Score: {Object.keys(userMapping).filter((k) => {
                  const correctMap = { step1: "terminal", step2: "io", step3: "decision", step4: "io", step5: "io", step6: "terminal" };
                  return userMapping[k] === correctMap[k];
                }).length} / 6
              </span>
            )}
          </div>
        </div>

        {/* SECTION 4: COMPREHENSIVE SYMBOL TABLE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Standard Reference
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">ANSI / ISO Standard Flowchart Symbols Master Table</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-teal-300 font-mono text-xs uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Symbol Shape</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Primary Function</th>
                  <th className="p-4">In-Degree / Out-Degree</th>
                  <th className="p-4">CBSE Exam Key Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-emerald-400 font-mono">Oval (Stadium)</td>
                  <td className="p-4 font-bold text-white">Terminal</td>
                  <td className="p-4">Marks Start, Stop, Begin, End, or Exit points of the program.</td>
                  <td className="p-4 font-mono text-xs">Start: (In: 0, Out: 1)<br/>End: (In: ≥1, Out: 0)</td>
                  <td className="p-4 text-xs text-slate-400">Must appear exactly once at start, and at least once at termination.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-sky-400 font-mono">Parallelogram</td>
                  <td className="p-4 font-bold text-white">Input / Output</td>
                  <td className="p-4">Accepts user inputs (READ, GET) or displays outputs (PRINT, WRITE).</td>
                  <td className="p-4 font-mono text-xs">In: 1, Out: 1</td>
                  <td className="p-4 text-xs text-slate-400">Do NOT use rectangles for input/output statements like <code>input()</code> or <code>print()</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-indigo-400 font-mono">Rectangle</td>
                  <td className="p-4 font-bold text-white">Process / Action</td>
                  <td className="p-4">Performs arithmetic calculations, variable initialization, or assignments.</td>
                  <td className="p-4 font-mono text-xs">In: 1, Out: 1</td>
                  <td className="p-4 text-xs text-slate-400">Contains assignment statements (e.g., <code>sum = a + b</code>, <code>i = i + 1</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-amber-400 font-mono">Rhombus (Diamond)</td>
                  <td className="p-4 font-bold text-white">Decision / Branching</td>
                  <td className="p-4">Evaluates a conditional expression (Boolean condition) to direct execution path.</td>
                  <td className="p-4 font-mono text-xs">In: 1, Out: 2 (or 3)</td>
                  <td className="p-4 text-xs text-slate-400">Each exiting flow line MUST be explicitly labeled (e.g. "True"/"False" or "Yes"/"No").</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-rose-400 font-mono">Small Circle</td>
                  <td className="p-4 font-bold text-white">On-Page Connector</td>
                  <td className="p-4">Connects disjoint flow lines on the same page without intersecting lines.</td>
                  <td className="p-4 font-mono text-xs">Entry: (In: ≥1, Out: 0)<br/>Exit: (In: 0, Out: 1)</td>
                  <td className="p-4 text-xs text-slate-400">Matching alphanumeric characters (e.g., 'A', '1') link entry and exit connectors.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-purple-400 font-mono">Pentagon (Shield)</td>
                  <td className="p-4 font-bold text-white">Off-Page Connector</td>
                  <td className="p-4">Links flowchart segments across different physical pages or sheet boundaries.</td>
                  <td className="p-4 font-mono text-xs">In: 1, Out: 0 (or vice versa)</td>
                  <td className="p-4 text-xs text-slate-400">Contains destination page and block reference.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-cyan-400 font-mono">Directed Line</td>
                  <td className="p-4 font-bold text-white">Flow Line</td>
                  <td className="p-4">Indicates the direction of program control flow.</td>
                  <td className="p-4 font-mono text-xs">Source to Destination</td>
                  <td className="p-4 text-xs text-slate-400">Standard flow runs top-to-bottom and left-to-right. Arrowheads are mandatory.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5: FLOWCHART DESIGN RULES & BEST PRACTICES */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Flowcharting Rules
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">ANSI Flowchart Design Conventions & Best Practices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                Structural Best Practices
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">1.</span>
                  <span><strong>Consistent Direction:</strong> Flowcharts should naturally read from top to bottom and left to right. Avoid upward flow unless indicating an iterative loop.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">2.</span>
                  <span><strong>Clear Entry & Single Exit:</strong> Every flowchart must start with a single Start oval. It should lead cleanly to one or more Stop ovals without dead ends.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">3.</span>
                  <span><strong>No Overlapping Lines:</strong> Use circular on-page connectors instead of crossing lines to eliminate visual ambiguity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">4.</span>
                  <span><strong>Descriptive Brief Labels:</strong> Keep text inside symbols concise, clear, and language-independent (e.g., "Read A, B", "Sum = A + B").</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                Common Examination Pitfalls to Avoid
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Unlabeled Decision Outlets:</strong> Drawing a diamond symbol without labeling the output arrows as "True"/"False" or "Yes"/"No" leads to immediate mark deduction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Confusing Rectangles & Parallelograms:</strong> Writing <code>print(x)</code> or <code>input()</code> inside a rectangle (Process) instead of a parallelogram (I/O).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Missing Arrowheads:</strong> Drawing plain straight lines without directional arrowheads leaves the execution path undefined.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Dead-End Branches:</strong> Branching off a decision diamond and failing to rejoin the main execution stream or reach a Stop terminal.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 6: ADVANTAGES & LIMITATIONS */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Evaluation
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Advantages & Limitations of Flowcharts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-950/30 border border-emerald-500/30 p-6 rounded-2xl space-y-3">
              <h3 className="text-lg font-bold text-emerald-300">Key Advantages</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✔</span>
                  <span><strong>Better Communication:</strong> Flowcharts provide a clear visual blueprint understandable by programmers, project managers, and non-technical stakeholders alike.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✔</span>
                  <span><strong>Effective Analysis:</strong> Visualizing branching and loops makes it easier to spot logic bugs, deadlocks, and unreachable code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✔</span>
                  <span><strong>Blueprint for Coding:</strong> Acts as a guide for writing code in any programming language (Python, C++, Java).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✔</span>
                  <span><strong>Program Documentation:</strong> Serves as essential documentation for software maintenance and updates.</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-950/30 border border-amber-500/30 p-6 rounded-2xl space-y-3">
              <h3 className="text-lg font-bold text-amber-300">Key Limitations</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">⚠</span>
                  <span><strong>Complex Logic Clutter:</strong> For large software systems with hundreds of conditions, flowcharts become sprawling and cumbersome (often called "spaghetti diagrams").</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">⚠</span>
                  <span><strong>Difficult Modification:</strong> If logic changes, modifying a hand-drawn flowchart often requires redrawing the entire diagram from scratch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">⚠</span>
                  <span><strong>Reproduction Cost:</strong> Visual diagrams cannot be directly executed or version-controlled as easily as text-based pseudocode or source files.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 7: TEACHER SUKANTA HUI NOTE */}
        <Teacher />

        {/* SECTION 8: PYTHON CODE SIMULATOR & NOTE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Python Simulation Script
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic4_files/flowchart_symbols_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 4 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic4_files/topic4_note.txt"
            />
          </div>
        </div>

        {/* SECTION 9: FAQ TEMPLATE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <FAQTemplate />
        </div>

        {/* SECTION 10: INTERACTIVE PRACTICE QUIZ (25 MCQs) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Topic 4 Practice Quiz & Board Exam Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on ANSI Symbols & Flowchart Rules with Bilingual Explanations.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {showResults && (
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-mono transition-all"
                >
                  Reset Quiz
                </button>
              )}
              <button
                onClick={() => setShowResults(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-cyan-500 transition-all"
              >
                {showResults ? "Update Results" : "Submit Quiz"}
              </button>
            </div>
          </div>

          {showResults && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 via-slate-900 to-cyan-950/80 border border-teal-500/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase font-semibold">Assessment Result</span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Your Score: {calculateScore()} / {topic4Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic4Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Full Concept Mastery.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic4Questions.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correct;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    showResults
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-rose-950/20 border-rose-500/40"
                      : isAnswered
                      ? "bg-slate-950/80 border-teal-500/30"
                      : "bg-slate-950/40 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-teal-300">
                        {idx + 1}
                      </span>
                      <h4 className="text-base font-semibold text-slate-100">{q.question}</h4>
                    </div>
                    {showResults && (
                      <span
                        className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                          isCorrect
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-rose-950 text-rose-400 border border-rose-800"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      const isThisCorrect = q.correct === optIdx;

                      let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white";
                      if (showResults) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isThisSelected && !isThisCorrect) {
                          btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                        }
                      } else if (isThisSelected) {
                        btnStyle = "bg-teal-950/80 border-teal-400 text-teal-200 font-semibold shadow-inner";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showResults}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center gap-3 ${btnStyle}`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-mono text-slate-400 font-semibold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-300">
                        <span className="text-teal-400 font-bold font-mono uppercase">Explanation (EN): </span>
                        {q.explanationEn}
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-cyan-300">
                        <span className="text-cyan-400 font-bold font-mono uppercase">ব্যাখ্যা (বাংলা): </span>
                        {q.explanationBn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
