import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic11Questions } from "./topic11_files/topic11_questions";

export default function Topic11() {
  // Interactive Print Simulator State
  const [items, setItems] = useState(["CBSE", "Class 11", "Computer Science", "2026"]);
  const [customItem, setCustomItem] = useState("");
  const [sepVal, setSepVal] = useState(" - ");
  const [endVal, setEndVal] = useState("\\n");
  const [showNextLine, setShowNextLine] = useState(true);

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAddItem = () => {
    if (customItem.trim()) {
      setItems([...items, customItem.trim()]);
      setCustomItem("");
    }
  };

  const handleRemoveItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic11Questions.forEach((q) => {
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

  // Resolve escape characters for simulation display
  const resolveEscape = (str) => {
    return str
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\\\/g, "\\");
  };

  const rawSep = resolveEscape(sepVal);
  const rawEnd = resolveEscape(endVal);

  const formattedOutput = items.join(rawSep) + rawEnd;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-emerald-900/60 via-slate-900 to-teal-900/60 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-emerald-400">
              <span>CBSE Class 11 CS (083)</span>
              <span>/</span>
              <span>Unit 2: Computational Thinking &amp; Programming</span>
              <span>/</span>
              <span className="text-emerald-200">Topic 11</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Standard Console Output: print(), sep &amp; end Parameters
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Master the Python 3 <code>print()</code> function signature. Control inter-argument spacing with 
              <code>sep=&apos;...&apos;</code>, alter stream termination with <code>end=&apos;...&apos;</code>, integrate escape sequences 
              (<code>\n</code>, <code>\t</code>), and explore modern formatted f-strings.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE PRINT STUDIO */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
              Live Console Studio
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">The `print(*objects, sep, end)` Live Workbench</h2>
            <p className="text-slate-400 text-sm mt-1">
              Add positional arguments and tweak keyword parameters in real time to observe the exact buffer output stream.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-2">Positional Arguments (*objects):</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {items.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-mono"
                    >
                      <span>{JSON.stringify(item)}</span>
                      <button
                        onClick={() => handleRemoveItem(idx)}
                        className="text-rose-400 hover:text-rose-200 text-xs font-bold"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customItem}
                    placeholder="Enter an argument..."
                    onChange={(e) => setCustomItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                    className="flex-1 bg-slate-950 border border-slate-700 text-white font-mono text-xs rounded-xl p-2.5"
                  />
                  <button
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl"
                  >
                    + Add Object
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    Separator Parameter (<code>sep</code>):
                  </label>
                  <input
                    type="text"
                    value={sepVal}
                    onChange={(e) => setSepVal(e.target.value)}
                    className="w-full bg-slate-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs rounded-xl p-2.5"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[
                      { l: "Space ' '", v: " " },
                      { l: "Comma ', '", v: ", " },
                      { l: "Arrow ' -> '", v: " -> " },
                      { l: "Empty ''", v: "" },
                      { l: "Newline '\\n'", v: "\\n" },
                    ].map((p) => (
                      <button
                        key={p.l}
                        onClick={() => setSepVal(p.v)}
                        className="text-[11px] px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono"
                      >
                        {p.l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    Ending Parameter (<code>end</code>):
                  </label>
                  <input
                    type="text"
                    value={endVal}
                    onChange={(e) => setEndVal(e.target.value)}
                    className="w-full bg-slate-950 border border-teal-500/40 text-teal-300 font-mono text-xs rounded-xl p-2.5"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[
                      { l: "Newline '\\n'", v: "\\n" },
                      { l: "Space ' '", v: " " },
                      { l: "Dots '...'", v: "..." },
                      { l: "Empty ''", v: "" },
                      { l: "Tab '\\t'", v: "\\t" },
                    ].map((p) => (
                      <button
                        key={p.l}
                        onClick={() => setEndVal(p.v)}
                        className="text-[11px] px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono"
                      >
                        {p.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="nextline"
                  checked={showNextLine}
                  onChange={(e) => setShowNextLine(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="nextline" className="text-xs text-slate-300">
                  Simulate second consecutive call: <code>print(&quot;[NEXT CALL]&quot;)</code>
                </label>
              </div>
            </div>

            {/* Live Terminal Output */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-xs space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold">Standard Output Stream (stdout)</span>
                <span className="text-slate-500">Python 3.12 Console</span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-slate-500 block mb-1"># Generated Python Execution:</span>
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-emerald-300 overflow-x-auto">
                    <code>
                      print({items.map((it) => JSON.stringify(it)).join(", ")}, sep={JSON.stringify(sepVal)}, end={JSON.stringify(endVal)})
                    </code>
                    {showNextLine && (
                      <div className="text-slate-400 mt-1">
                        <code>print(&quot;[NEXT CALL]&quot;)</code>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1"># Visual Terminal Display:</span>
                  <div className="p-4 bg-black rounded-xl border border-slate-900 font-mono text-white whitespace-pre-wrap min-h-[100px]">
                    <span className="text-yellow-300">{formattedOutput}</span>
                    {showNextLine && <span className="text-cyan-400">[NEXT CALL]</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: CORE THEORY & COMPARISON MATRIX */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
              Syllabus Blueprint
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Comprehensive Guide to Python Console Output</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h3 className="text-base font-bold text-emerald-400 font-mono">1. Positional *objects</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Accepts zero, one, or unlimited comma-separated arguments of any data type. Each object is automatically converted to its string representation using Python&apos;s internal <code>str()</code> protocol.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h3 className="text-base font-bold text-teal-400 font-mono">2. Separator (`sep`)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Specifies the boundary character inserted between consecutive objects. Defaults to a single whitespace <code>&apos; &apos;</code>. If only 1 object is printed, <code>sep</code> is ignored.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h3 className="text-base font-bold text-cyan-400 font-mono">3. Ending (`end`)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Appended once after the final object. Defaults to <code>\n</code>. Overriding with empty string <code>&apos;&apos;</code> or space allows loops and successive statements to stay on the same line.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300 font-sans">
              <thead className="bg-slate-950 text-emerald-300 font-mono uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Output Feature</th>
                  <th className="p-4">Default Value</th>
                  <th className="p-4">Custom Example</th>
                  <th className="p-4">Console Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Default print()</td>
                  <td className="p-4 text-slate-400">sep=&apos; &apos;, end=&apos;\n&apos;</td>
                  <td className="p-4 text-emerald-300"><code>print(&quot;Hello&quot;, &quot;World&quot;)</code></td>
                  <td className="p-4 text-white font-mono"><code>Hello World</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Custom Separator</td>
                  <td className="p-4 text-slate-400">sep=&apos; &apos;</td>
                  <td className="p-4 text-emerald-300"><code>print(10, 20, 30, sep=&quot;--&quot;)</code></td>
                  <td className="p-4 text-white font-mono"><code>10--20--30</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Suppressed Newline</td>
                  <td className="p-4 text-slate-400">end=&apos;\n&apos;</td>
                  <td className="p-4 text-emerald-300"><code>print(&quot;Score: &quot;, end=&quot;&quot;); print(99)</code></td>
                  <td className="p-4 text-white font-mono"><code>Score: 99</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Formatted f-string</td>
                  <td className="p-4 text-slate-400">N/A</td>
                  <td className="p-4 text-emerald-300"><code>print(f&quot;Total: &#123;45.678:.2f&#125;&quot;)</code></td>
                  <td className="p-4 text-white font-mono"><code>Total: 45.68</code></td>
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
            <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Python Simulation Script
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic11_files/python_console_output_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Topic 11 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic11_files/topic11_note.txt"
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
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Topic 11 Practice Quiz &amp; Output Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 Board Exam Questions on `print()` Signatures, `sep`, `end`, Escape Sequences &amp; Formatted Output.
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
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 transition-all"
              >
                {showResults ? "Update Results" : "Submit Quiz"}
              </button>
            </div>
          </div>

          {showResults && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">Assessment Result</span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Your Score: {calculateScore()} / {topic11Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic11Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Console Output Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-teal-400 font-bold">Good effort! Review the missed questions below.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic11Questions.map((q, idx) => {
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
                      ? "bg-slate-950/80 border-emerald-500/30"
                      : "bg-slate-950/40 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-emerald-300">
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
                        btnStyle = "bg-emerald-950/80 border-emerald-400 text-emerald-200 font-semibold shadow-inner";
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
                        <span className="text-emerald-400 font-bold font-mono uppercase">Explanation (EN): </span>
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
