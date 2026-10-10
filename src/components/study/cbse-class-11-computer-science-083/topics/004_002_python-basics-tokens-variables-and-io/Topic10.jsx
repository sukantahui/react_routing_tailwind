import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic10Questions } from "./topic10_files/topic10_questions";

export default function Topic10() {
  // Console Input Simulator State
  const [promptText, setPromptText] = useState("Enter your test input: ");
  const [userInput, setUserInput] = useState("25");
  const [conversionType, setConversionType] = useState("int");

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic10Questions.forEach((q) => {
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

  // Compute conversion preview
  const getConversionOutput = () => {
    const rawVal = userInput;
    const rawType = "<class 'str'>";
    let convertedVal = "";
    let convertedType = "";
    let isError = false;
    let errorMsg = "";
    let additionDemo = "";

    try {
      if (conversionType === "none") {
        convertedVal = `"${rawVal}"`;
        convertedType = "<class 'str'>";
        additionDemo = `val + val -> "${rawVal}${rawVal}" (String Concatenation)`;
      } else if (conversionType === "int") {
        const parsed = parseInt(rawVal, 10);
        if (isNaN(parsed) || rawVal.trim().includes(".") || !/^[-+]?\d+$/.test(rawVal.trim())) {
          throw new Error(`ValueError: invalid literal for int() with base 10: '${rawVal}'`);
        }
        convertedVal = parsed.toString();
        convertedType = "<class 'int'>";
        additionDemo = `val + 10 -> ${parsed + 10} (Arithmetic Addition)`;
      } else if (conversionType === "float") {
        const parsed = parseFloat(rawVal);
        if (isNaN(parsed) || rawVal.trim() === "" || isNaN(Number(rawVal.trim()))) {
          throw new Error(`ValueError: could not convert string to float: '${rawVal}'`);
        }
        convertedVal = parsed.toFixed(2);
        convertedType = "<class 'float'>";
        additionDemo = `val + 5.5 -> ${(parsed + 5.5).toFixed(2)} (Arithmetic Addition)`;
      } else if (conversionType === "eval") {
        // Safe mock eval for demo
        if (/^[-+]?\d+$/.test(rawVal.trim())) {
          convertedVal = rawVal.trim();
          convertedType = "<class 'int'>";
          additionDemo = `val + 10 -> ${parseInt(rawVal.trim(), 10) + 10}`;
        } else if (/^[-+]?\d*\.\d+$/.test(rawVal.trim())) {
          convertedVal = rawVal.trim();
          convertedType = "<class 'float'>";
          additionDemo = `val + 5.0 -> ${parseFloat(rawVal.trim()) + 5.0}`;
        } else if (rawVal.trim().startsWith("[") && rawVal.trim().endsWith("]")) {
          convertedVal = rawVal.trim();
          convertedType = "<class 'list'>";
          additionDemo = `len(val) -> list with elements`;
        } else if (rawVal.trim().startsWith("(") && rawVal.trim().endsWith(")")) {
          convertedVal = rawVal.trim();
          convertedType = "<class 'tuple'>";
          additionDemo = `type(val) -> tuple`;
        } else {
          convertedVal = `"${rawVal}"`;
          convertedType = "<class 'str'>";
          additionDemo = `val is evaluated dynamically`;
        }
      } else if (conversionType === "split") {
        const parts = rawVal.split(/\s+/).filter(Boolean);
        convertedVal = `[${parts.map((p) => `'${p}'`).join(", ")}]`;
        convertedType = "<class 'list'>";
        additionDemo = `len(val) -> ${parts.length} tokens parsed`;
      }
    } catch (err) {
      isError = true;
      errorMsg = err.message;
    }

    return { rawVal, rawType, convertedVal, convertedType, isError, errorMsg, additionDemo };
  };

  const simulation = getConversionOutput();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-cyan-900/60 via-slate-900 to-indigo-900/60 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400">
              <span>CBSE Class 11 CS (083)</span>
              <span>/</span>
              <span>Unit 2: Computational Thinking &amp; Programming</span>
              <span>/</span>
              <span className="text-cyan-200">Topic 10</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Standard Console Input: input() &amp; Type Conversions
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Master user interaction in Python 3. Understand why <code>input()</code> always returns a string, explore prompt strings,
              prevent catastrophic string concatenation bugs, and master explicit type casting via <code>int()</code>, <code>float()</code>, 
              <code>eval()</code>, and <code>split()</code>.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE TYPECASTING LAB */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
              Interactive Lab
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Console Input &amp; Typecasting Laboratory</h2>
            <p className="text-slate-400 text-sm mt-1">
              Simulate keyboard buffer input and inspect raw string storage vs explicitly typecast values and runtime errors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Prompt String passed to input():</label>
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="w-full bg-slate-950 border border-cyan-500/40 text-white font-mono text-sm rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Simulated User Keystrokes (from stdin):</label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white font-mono text-sm rounded-xl p-2.5"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs text-slate-400">Quick Test Inputs:</span>
                  {["25", "45.75", "10 20 30", "Hello Python", "123a", "[1, 2, 3]"].map((sample) => (
                    <button
                      key={sample}
                      onClick={() => setUserInput(sample)}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono rounded"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Select Conversion Method:</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[
                    { id: "none", label: "raw input()" },
                    { id: "int", label: "int(input())" },
                    { id: "float", label: "float(input())" },
                    { id: "eval", label: "eval(input())" },
                    { id: "split", label: "input().split()" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setConversionType(btn.id)}
                      className={`p-2 rounded-xl text-xs font-mono border transition-all text-center ${
                        conversionType === btn.id
                          ? "bg-cyan-950 border-cyan-400 text-cyan-200 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal Preview */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-xs space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-cyan-400 font-bold">Python 3.12 Interactive Terminal</span>
                <span className="text-slate-500">Standard I/O Streams</span>
              </div>

              <div className="space-y-2 text-slate-200">
                <p className="text-slate-400">
                  <span className="text-emerald-400">&gt;&gt;&gt; </span>
                  {promptText}
                  <span className="text-yellow-300 font-bold underline">{userInput}</span>
                </p>
                <p className="text-slate-400">
                  <span className="text-slate-500"># Raw memory allocation:</span>
                  <br />
                  raw_value = &quot;{simulation.rawVal}&quot; | type = {simulation.rawType}
                </p>

                <div className="pt-2 border-t border-slate-900">
                  <span className="text-indigo-400 font-bold">Transformation Pipeline:</span>
                  {simulation.isError ? (
                    <div className="mt-2 p-3 bg-rose-950/40 border border-rose-500/50 rounded-xl text-rose-300">
                      <p className="font-bold text-rose-400">Traceback (most recent call last):</p>
                      <p>{simulation.errorMsg}</p>
                    </div>
                  ) : (
                    <div className="mt-2 p-3 bg-cyan-950/30 border border-cyan-500/40 rounded-xl space-y-1.5 text-cyan-200">
                      <p><span className="text-slate-400">Result Variable:</span> <span className="font-bold text-white">{simulation.convertedVal}</span></p>
                      <p><span className="text-slate-400">Python Type:</span> <span className="font-bold text-teal-300">{simulation.convertedType}</span></p>
                      <p><span className="text-slate-400">Operation Demo:</span> <span className="font-bold text-amber-300">{simulation.additionDemo}</span></p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: CORE THEORY & COMPARISON MATRIX */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
              Syllabus Blueprint
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Comprehensive Guide to Python Console Input</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h3 className="text-base font-bold text-cyan-400 font-mono">1. The input() Mechanism</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pauses program execution, displays the optional prompt string on stdout without trailing newline, reads keystrokes from stdin until Enter is pressed, strips trailing newline, and returns a <code>str</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h3 className="text-base font-bold text-teal-400 font-mono">2. Type Casting Hazards</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>int(&quot;45&quot;)</code> succeeds, but <code>int(&quot;45.8&quot;)</code> triggers <code>ValueError</code>. To convert decimal strings to whole integers, pass through float first: <code>int(float(&quot;45.8&quot;))</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h3 className="text-base font-bold text-indigo-400 font-mono">3. Multiple Values in 1 Line</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use <code>input().split()</code> with list comprehensions or <code>map()</code>: <code>a, b = map(int, input().split())</code> to capture multiple numeric inputs cleanly from a single line.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300 font-sans">
              <thead className="bg-slate-950 text-cyan-300 font-mono uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Input Pattern</th>
                  <th className="p-4">Syntax Example</th>
                  <th className="p-4">Expected User Entry</th>
                  <th className="p-4">Result Type &amp; Stored Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Raw String</td>
                  <td className="p-4 text-cyan-300"><code>name = input("Name: ")</code></td>
                  <td className="p-4 text-slate-300"><code>"Sukanta"</code></td>
                  <td className="p-4 text-emerald-400"><code>str</code> &rarr; <code>"Sukanta"</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Integer Casting</td>
                  <td className="p-4 text-cyan-300"><code>age = int(input("Age: "))</code></td>
                  <td className="p-4 text-slate-300"><code>"17"</code></td>
                  <td className="p-4 text-emerald-400"><code>int</code> &rarr; <code>17</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Float Casting</td>
                  <td className="p-4 text-cyan-300"><code>pi = float(input("Pi: "))</code></td>
                  <td className="p-4 text-slate-300"><code>"3.1415"</code></td>
                  <td className="p-4 text-emerald-400"><code>float</code> &rarr; <code>3.1415</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Dynamic Evaluation</td>
                  <td className="p-4 text-cyan-300"><code>val = eval(input("Val: "))</code></td>
                  <td className="p-4 text-slate-300"><code>"[10, 20]"</code></td>
                  <td className="p-4 text-emerald-400"><code>list</code> &rarr; <code>[10, 20]</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: TEACHER SUKANTA HUI NOTE */}
        <Teacher />

        {/* SECTION 5: PYTHON CODE SIMULATOR & NOTE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Python Simulation Script
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic10_files/python_console_input_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              Topic 10 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic10_files/topic10_note.txt"
            />
          </div>
        </div>

        {/* SECTION 6: FAQ TEMPLATE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <FAQTemplate />
        </div>

        {/* SECTION 7: INTERACTIVE PRACTICE QUIZ (25 MCQs) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
                Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Topic 10 Practice Quiz &amp; Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 Board Exam &amp; Practical Questions on `input()`, Typecasting, and String vs Numeric Semantics.
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
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-indigo-500 transition-all"
              >
                {showResults ? "Update Results" : "Submit Quiz"}
              </button>
            </div>
          </div>

          {showResults && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Assessment Result</span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Your Score: {calculateScore()} / {topic10Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic10Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Python Input &amp; Casting Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the missed questions below.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic10Questions.map((q, idx) => {
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
                      ? "bg-slate-950/80 border-cyan-500/30"
                      : "bg-slate-950/40 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-cyan-300">
                        {idx + 1}
                      </span>
                      <h4 className="text-base font-semibold text-slate-100 whitespace-pre-line">{q.question}</h4>
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
                        btnStyle = "bg-cyan-950/80 border-cyan-400 text-cyan-200 font-semibold shadow-inner";
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
                          <span className="font-mono text-xs sm:text-sm">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-300">
                        <span className="text-cyan-400 font-bold font-mono uppercase">Explanation (EN): </span>
                        {q.explanationEn}
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-teal-300">
                        <span className="text-teal-400 font-bold font-mono uppercase">ব্যাখ্যা (বাংলা): </span>
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
