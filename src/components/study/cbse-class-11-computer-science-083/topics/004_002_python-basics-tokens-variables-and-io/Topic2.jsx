import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic2Questions } from "./topic2_files/topic2_questions";

export default function Topic2() {
  // Candidate Identifier State
  const [candidateName, setCandidateName] = useState("total_marks_1");

  const pythonKeywords = [
    "False", "None", "True", "and", "as", "assert", "async", "await",
    "break", "class", "continue", "def", "del", "elif", "else", "except",
    "finally", "for", "from", "global", "if", "import", "in", "is", "lambda",
    "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"
  ];

  const auditIdentifier = (name) => {
    if (!name || name.trim() === "") return { valid: false, reason: "Name cannot be empty" };
    if (pythonKeywords.includes(name)) return { valid: false, reason: `'${name}' is a reserved Python KEYWORD` };
    if (/^[0-9]/.test(name)) return { valid: false, reason: "Cannot begin with a numeric digit (0-9)" };
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) return { valid: false, reason: "Contains illegal characters (only letters, digits, and '_' allowed)" };
    return { valid: true, reason: `'${name}' is a 100% legal Python identifier!` };
  };

  const auditResult = auditIdentifier(candidateName);

  // Keyword filter category
  const [selectedKwCat, setSelectedKwCat] = useState("all");

  const kwCategories = {
    all: pythonKeywords,
    control: ["if", "elif", "else", "for", "while", "break", "continue", "pass"],
    functions: ["def", "lambda", "return", "yield"],
    scope: ["global", "nonlocal", "import", "from", "as", "del"],
    exceptions: ["try", "except", "finally", "raise", "assert"],
    literals: ["True", "False", "None"]
  };

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic2Questions.forEach((q) => {
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
              <span className="text-teal-200">Topic 2</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Python Lexical Tokens: Keywords &amp; Identifiers
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Master the five lexical token classes in Python. Explore the 35 reserved keywords in Python 3.12+,
              statutory identifier naming rules, case-sensitivity traps, and identifier validity validation required for CBSE examinations.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE IDENTIFIER VALIDATOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Interactive Tool
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Python Identifier Rule Auditor</h2>
            <p className="text-slate-400 text-sm mt-1">
              Type any candidate variable name to test statutory Python lexical rules in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5">Candidate Variable Identifier:</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full bg-slate-950 border border-teal-500/50 text-white text-lg font-mono font-bold rounded-2xl p-3.5 focus:outline-none focus:border-teal-400"
                  placeholder="e.g. student_score_1"
                />
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 block mb-2">Test Common CBSE Exam Traps:</span>
                <div className="flex flex-wrap gap-2">
                  {["_score", "2nd_rank", "total$sum", "def", "True", "student name", "roll-no", "class_11"].map((sample) => (
                    <button
                      key={sample}
                      onClick={() => setCandidateName(sample)}
                      className="px-2.5 py-1 bg-slate-950 border border-slate-800 hover:border-slate-600 rounded-lg text-xs font-mono text-slate-300"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Validation Outcome Card */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                auditResult.valid
                  ? "bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-950/50"
                  : "bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-lg font-bold font-mono ${auditResult.valid ? "text-emerald-400" : "text-rose-400"}`}>
                  {auditResult.valid ? "✔ 100% LEGAL IDENTIFIER" : "✕ ILLEGAL IDENTIFIER"}
                </span>
              </div>
              <p className="text-sm text-slate-200 font-mono mb-3">{auditResult.reason}</p>
              <div className="text-xs space-y-1 text-slate-400 border-t border-slate-800/80 pt-3">
                <div>• Starts with Letter or Underscore: {/^[a-zA-Z_]/.test(candidateName) ? "✔ Passed" : "✕ Failed"}</div>
                <div>• Contains only [a-zA-Z0-9_]: {/^[a-zA-Z0-9_]+$/.test(candidateName) ? "✔ Passed" : "✕ Failed"}</div>
                <div>• Not a Reserved Keyword: {!pythonKeywords.includes(candidateName) ? "✔ Passed" : "✕ Failed"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE 35 PYTHON KEYWORDS EXPLORER */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Reserved Words
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">The 35 Python 3.12+ Keywords Catalog</h2>
            </div>
            <div className="flex flex-wrap gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-mono">
              {[
                { id: "all", label: "All (35)" },
                { id: "control", label: "Control Flow" },
                { id: "functions", label: "Functions" },
                { id: "scope", label: "Scope & Namespace" },
                { id: "exceptions", label: "Exceptions" },
                { id: "literals", label: "Capitalized (3)" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedKwCat(cat.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedKwCat === cat.id
                      ? "bg-teal-600 text-white font-bold shadow-lg shadow-teal-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 font-mono text-xs">
            {kwCategories[selectedKwCat].map((kw) => {
              const isCapital = ["True", "False", "None"].includes(kw);
              return (
                <div
                  key={kw}
                  className={`p-3 rounded-xl border text-center font-bold transition-all ${
                    isCapital
                      ? "bg-amber-950/40 border-amber-500/50 text-amber-300"
                      : "bg-slate-950 border-slate-800 text-slate-200 hover:border-teal-500/50"
                  }`}
                >
                  {kw}
                  {isCapital && <span className="block text-[9px] text-amber-400/80 font-normal">Capitalized</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: THE 5 TOKEN CATEGORIES MASTER TABLE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Taxonomy
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">The 5 Core Python Lexical Token Categories</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-sm text-slate-300 font-sans">
              <thead className="bg-slate-950 text-teal-300 font-mono text-xs uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Token Category</th>
                  <th className="p-4">Definition</th>
                  <th className="p-4 font-mono">Examples</th>
                  <th className="p-4">CBSE Exam Key Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-xs">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-teal-300 font-mono">1. Keywords</td>
                  <td className="p-4">Predefined reserved words with fixed syntactic meaning.</td>
                  <td className="p-4 font-mono text-cyan-300"><code>if</code>, <code>def</code>, <code>True</code>, <code>while</code>, <code>return</code></td>
                  <td className="p-4 text-slate-400">Cannot be used as variable names. Only True, False, None are capitalized.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-sky-300 font-mono">2. Identifiers</td>
                  <td className="p-4">User-defined names for variables, functions, and classes.</td>
                  <td className="p-4 font-mono text-cyan-300"><code>student_name</code>, <code>_total</code>, <code>calc_sum</code></td>
                  <td className="p-4 text-slate-400">Must begin with a letter or underscore. No spaces or symbols allowed.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-indigo-300 font-mono">3. Literals</td>
                  <td className="p-4">Constant data values stored directly in code.</td>
                  <td className="p-4 font-mono text-cyan-300"><code>42</code>, <code>3.14</code>, <code>"Hello"</code>, <code>True</code>, <code>None</code></td>
                  <td className="p-4 text-slate-400">Immutable value representations: Integer, Float, String, Boolean, None.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-amber-300 font-mono">4. Operators</td>
                  <td className="p-4">Symbols that perform arithmetic, comparison, or logical computations.</td>
                  <td className="p-4 font-mono text-cyan-300"><code>+</code>, <code>-</code>, <code>*</code>, <code>//</code>, <code>==</code>, <code>and</code></td>
                  <td className="p-4 text-slate-400">Operate on operands to produce evaluated r-values.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-rose-300 font-mono">5. Punctuators</td>
                  <td className="p-4">Delimiters and punctuation marks that structure program syntax.</td>
                  <td className="p-4 font-mono text-cyan-300"><code>:</code>, <code>( )</code>, <code>[ ]</code>, <code>{ }</code>, <code>,</code>, <code>=</code>, <code>@</code></td>
                  <td className="p-4 text-slate-400">Colon (<code>:</code>) defines code block suites; parentheses group expressions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5: TEACHER SUKANTA HUI NOTE */}
        <Teacher />

        {/* SECTION 6: PYTHON CODE SIMULATOR & NOTE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Python Simulation Script
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic2_files/python_tokens_keywords_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 2 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic2_files/topic2_note.txt"
            />
          </div>
        </div>

        {/* SECTION 7: FAQ TEMPLATE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <FAQTemplate />
        </div>

        {/* SECTION 8: INTERACTIVE PRACTICE QUIZ (25 MCQs) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Topic 2 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on Lexical Tokens, Keywords, and Identifier Naming Rules.
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
                  Your Score: {calculateScore()} / {topic2Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic2Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Token & Keyword Rules Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic2Questions.map((q, idx) => {
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
