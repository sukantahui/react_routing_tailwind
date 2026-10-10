import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic9Questions } from "./topic9_files/topic9_questions";

export default function Topic9() {
  // Docstring Playground State
  const [funcName, setFuncName] = useState("calculate_area");
  const [docSummary, setDocSummary] = useState("Computes the geometric area of a rectangle given length and width.");
  const [paramNotes, setParamNotes] = useState("length (float): Length in meters\nwidth (float): Width in meters");

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic9Questions.forEach((q) => {
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
        <div className="bg-gradient-to-r from-teal-900/60 via-slate-900 to-indigo-900/60 p-6 sm:p-8 rounded-3xl border border-teal-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-teal-400">
              <span>CBSE Class 11 CS (083)</span>
              <span>/</span>
              <span>Unit 2: Python Basics & Lexical Tokens</span>
              <span>/</span>
              <span className="text-teal-200">Topic 9</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Comments in Python: Single-Line (#) &amp; Multiline Docstrings
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Explore the critical role of documentation in software engineering. Master single-line comments with hash <code>#</code>,
              inline commenting standards, multiline block explanations, and PEP 257 Docstrings accessible via <code>__doc__</code> and <code>help()</code>.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE DOCSTRING PLAYGROUND */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Interactive Studio
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">PEP 257 Docstring &amp; `.__doc__` Live Simulator</h2>
            <p className="text-slate-400 text-sm mt-1">
              Customize the function metadata below to see how Python dynamically populates the <code>.__doc__</code> attribute and formats <code>help()</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Editor */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Function Identifier Name:</label>
                <input
                  type="text"
                  value={funcName}
                  onChange={(e) => setFuncName(e.target.value)}
                  className="w-full bg-slate-950 border border-teal-500/50 text-white font-mono text-sm rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Docstring Summary Line:</label>
                <input
                  type="text"
                  value={docSummary}
                  onChange={(e) => setDocSummary(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Parameters &amp; Specifications:</label>
                <textarea
                  rows={3}
                  value={paramNotes}
                  onChange={(e) => setParamNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white font-mono text-xs rounded-xl p-2.5"
                />
              </div>
            </div>

            {/* Generated Code & Introspection */}
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                <span className="text-teal-400 font-bold uppercase block mb-2">Python Function with Docstring:</span>
                <pre className="text-cyan-300 whitespace-pre overflow-x-auto leading-relaxed">
{`def ${funcName}(length, width):
    """
    ${docSummary}
    
    Parameters:
    ${paramNotes.split('\n').map(l => '    ' + l).join('\n')}
    """
    # Formula: area = length * width
    return length * width  # Return calculated float`}
                </pre>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-teal-500/40 font-mono text-xs space-y-1">
                <div className="text-slate-400">Introspection output of <code>{funcName}.__doc__</code>:</div>
                <div className="text-teal-300 font-bold truncate">"{docSummary}"</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: COMMENTS VS DOCSTRINGS COMPARISON */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Taxonomy
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Hash Comments (#) vs Docstrings ("""...""")</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300 font-sans">
              <thead className="bg-slate-950 text-teal-300 font-mono uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Feature Dimension</th>
                  <th className="p-4">Standard Comments (#)</th>
                  <th className="p-4">PEP 257 Docstrings ("""...""")</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Syntax Delimiter</td>
                  <td className="p-4 text-slate-300">Hash symbol <code>#</code> to end of line</td>
                  <td className="p-4 text-teal-300">Triple quotes <code>"""..."""</code> as 1st statement in body</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Interpreter Handling</td>
                  <td className="p-4 text-slate-300">Discarded completely during parsing</td>
                  <td className="p-4 text-teal-300">Retained in runtime memory</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Runtime Access</td>
                  <td className="p-4 text-rose-400">None (Inaccessible at runtime)</td>
                  <td className="p-4 text-emerald-400">Accessible via <code>func.__doc__</code> &amp; <code>help()</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white font-mono">Primary Purpose</td>
                  <td className="p-4 text-slate-300">Explaining internal implementation logic</td>
                  <td className="p-4 text-teal-300">Documenting API interface, parameters, and returns</td>
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
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Python Simulation Script
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic9_files/python_comments_docstrings_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 9 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic9_files/topic9_note.txt"
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
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Topic 9 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on Python Comments, Docstrings & Documentation Standards.
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
                className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-teal-500/20 hover:from-teal-500 hover:to-indigo-500 transition-all"
              >
                {showResults ? "Update Results" : "Submit Quiz"}
              </button>
            </div>
          </div>

          {showResults && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 via-slate-900 to-indigo-950/80 border border-teal-500/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase font-semibold">Assessment Result</span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Your Score: {calculateScore()} / {topic9Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic9Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Comments & Docstrings Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic9Questions.map((q, idx) => {
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
