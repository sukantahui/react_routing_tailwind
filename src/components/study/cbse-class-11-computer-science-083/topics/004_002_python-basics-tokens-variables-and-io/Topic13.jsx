import React, { useState } from "react";
import { 
  Trophy, Target, CheckCircle2, AlertTriangle, 
  Sparkles, Award, RotateCcw, Cpu, Terminal, ShieldCheck
} from "lucide-react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic13Questions } from "./topic13_files/topic13_questions";

export default function Topic13() {
  // Challenge Arena State
  const [activeTask, setActiveTask] = useState(0);

  // Task 1: Identifier Validator
  const [identInput, setIdentInput] = useState("student_1_score");

  // Task 2: l-value vs r-value Checker
  const [lhsVal, setLhsVal] = useState("x");
  const [rhsVal, setRhsVal] = useState("100");

  // Task 3: Student ID Badge
  const [studName, setStudName] = useState("Sukanta Hui");
  const [studRoll, setStudRoll] = useState("101");
  const [studScore, setStudScore] = useState("98.5");

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Identifier rules checker
  const checkIdentifier = (token) => {
    const keywords = [
      "False", "None", "True", "and", "as", "assert", "async", "await", "break",
      "class", "continue", "def", "del", "elif", "else", "except", "finally",
      "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal",
      "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"
    ];

    if (!token) return { valid: false, msg: "Identifier cannot be empty." };
    if (keywords.includes(token)) return { valid: false, msg: `Reserved Keyword: '${token}' cannot be used as an identifier.` };
    if (/^\d/.test(token)) return { valid: false, msg: "Illegal: Identifiers cannot begin with a numeric digit (0-9)." };
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(token)) return { valid: false, msg: "Illegal: Contains invalid characters (only letters, numbers, and '_' allowed)." };
    return { valid: true, msg: `Valid Identifier! Follows all CBSE Class 11 naming rules.` };
  };

  // lvalue / rvalue checker
  const checkAssignment = (lhs, rhs) => {
    const cleanLhs = lhs.trim();
    if (!cleanLhs) return { valid: false, msg: "Left-hand side (l-value) cannot be empty." };
    if (/^\d+$/.test(cleanLhs) || /^["'].*["']$/.test(cleanLhs)) {
      return { valid: false, msg: `SyntaxError: cannot assign to literal '${cleanLhs}'. Literals are r-values only!` };
    }
    if (/[+\-*/%//**]/.test(cleanLhs)) {
      return { valid: false, msg: `SyntaxError: cannot assign to expression '${cleanLhs}'. Expressions evaluate to r-values.` };
    }
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(cleanLhs)) {
      return { valid: true, msg: `VALID Assignment: Evaluates r-value '${rhs}' and stores reference in l-value '${cleanLhs}'.` };
    }
    if (cleanLhs.includes(",") && cleanLhs.split(",").every(p => /^[A-Za-z_][A-Za-z0-9_]*$/.test(p.trim()))) {
      return { valid: true, msg: `VALID Tuple Unpacking Assignment: Multiple l-value targets (${cleanLhs}).` };
    }
    return { valid: false, msg: `SyntaxError: invalid target for assignment '${cleanLhs}'.` };
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic13Questions.forEach((q) => {
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

  const identStatus = checkIdentifier(identInput);
  const assignStatus = checkAssignment(lhsVal, rhsVal);

  const getCbseGrade = (score, total) => {
    const pct = (score / total) * 100;
    if (pct >= 91) return { grade: "A1 (Top 1/8th High Distinction)", color: "text-emerald-400" };
    if (pct >= 81) return { grade: "A2 (Distinction)", color: "text-teal-400" };
    if (pct >= 71) return { grade: "B1 (Very Good)", color: "text-cyan-400" };
    if (pct >= 61) return { grade: "B2 (Good)", color: "text-blue-400" };
    if (pct >= 51) return { grade: "C1 (Satisfactory)", color: "text-yellow-400" };
    if (pct >= 41) return { grade: "C2 (Average)", color: "text-amber-400" };
    return { grade: "Needs Revision", color: "text-rose-400" };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-violet-900/60 via-slate-900 to-indigo-900/60 p-6 sm:p-8 rounded-3xl border border-violet-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-violet-400">
              <span>CBSE Class 11 CS (083)</span>
              <span>/</span>
              <span>Unit 2: Computational Thinking &amp; Programming</span>
              <span>/</span>
              <span className="text-violet-200">Topic 13</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Practice your Skill here: Board Exam Arena &amp; Code Lab
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Synthesize all concepts of Module 004_002. Test your skills in our interactive Code Challenge Arena, validate l-values vs r-values, format student ID badges, and complete the 30-Question CBSE Board Exam Simulator with dynamic grade certification.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE CODE CHALLENGE ARENA */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-2">
                <Trophy className="w-3.5 h-3.5" /> Practical Skills Arena
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Hands-On Code Diagnosis &amp; Board Lab Drills
              </h2>
            </div>

            {/* Task Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {[
                { id: 0, label: "1. Token Validator" },
                { id: 1, label: "2. l-value vs r-value" },
                { id: 2, label: "3. Student ID Badge" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTask(t.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                    activeTask === t.id
                      ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-950"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* TASK 1: TOKEN VALIDATOR */}
          {activeTask === 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-violet-300 font-mono flex items-center gap-2">
                <Target className="w-4 h-4" /> Real-time Python Identifier &amp; Keyword Sanity Checker
              </h3>
              <p className="text-xs text-slate-400">
                Type any token below to evaluate whether it complies with Python 3.12 naming rules, keyword reservations, or illegal characters.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <label className="text-xs font-mono text-slate-300 block">Candidate Identifier Token:</label>
                  <input
                    type="text"
                    value={identInput}
                    onChange={(e) => setIdentInput(e.target.value)}
                    className="w-full bg-slate-950 border border-violet-500/50 text-white font-mono text-sm rounded-xl p-3"
                  />
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-slate-400">Preset Tests:</span>
                    {["score_1", "_privateKey", "2ndPlace", "def", "user@mail", "True", "False", "None"].map((sample) => (
                      <button
                        key={sample}
                        onClick={() => setIdentInput(sample)}
                        className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-violet-300 text-xs font-mono rounded"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border ${identStatus.valid ? "bg-emerald-950/20 border-emerald-500/50" : "bg-rose-950/20 border-rose-500/50"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {identStatus.valid ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                    )}
                    <span className={`text-sm font-bold font-mono ${identStatus.valid ? "text-emerald-400" : "text-rose-400"}`}>
                      {identStatus.valid ? "LEGAL IDENTIFIER" : "ILLEGAL TOKEN"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{identStatus.msg}</p>
                </div>
              </div>
            </div>
          )}

          {/* TASK 2: LVALUE VS RVALUE */}
          {activeTask === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-violet-300 font-mono flex items-center gap-2">
                <Target className="w-4 h-4" /> Assignment Semantics: 'lvalue = rvalue' Syntax Inspector
              </h3>
              <p className="text-xs text-slate-400">
                Explore why assignments like <code>10 = a</code> or <code>x + 2 = y</code> trigger fatal syntax errors at compile-time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-xs font-mono text-slate-300 block mb-1">Left-Hand Target (l-value):</label>
                      <input
                        type="text"
                        value={lhsVal}
                        onChange={(e) => setLhsVal(e.target.value)}
                        className="w-full bg-slate-950 border border-violet-500/50 text-white font-mono text-sm rounded-xl p-2.5"
                      />
                    </div>
                    <span className="text-xl font-mono text-violet-400 font-bold pt-5">=</span>
                    <div className="flex-1">
                      <label className="text-xs font-mono text-slate-300 block mb-1">Right-Hand Source (r-value):</label>
                      <input
                        type="text"
                        value={rhsVal}
                        onChange={(e) => setRhsVal(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-white font-mono text-sm rounded-xl p-2.5"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-slate-400">Quick Test Cases:</span>
                    {[
                      { l: "x", r: "100" },
                      { l: "100", r: "x" },
                      { l: "a + 5", r: "b" },
                      { l: "x, y", r: "10, 20" },
                      { l: "total_marks", r: "95.5" },
                    ].map((tc, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setLhsVal(tc.l); setRhsVal(tc.r); }}
                        className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-violet-300 text-xs font-mono rounded"
                      >
                        {tc.l} = {tc.r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border ${assignStatus.valid ? "bg-emerald-950/20 border-emerald-500/50" : "bg-rose-950/20 border-rose-500/50"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {assignStatus.valid ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                    )}
                    <span className={`text-sm font-bold font-mono ${assignStatus.valid ? "text-emerald-400" : "text-rose-400"}`}>
                      {assignStatus.valid ? "SYNTAX VALID" : "SYNTAX ERROR"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{assignStatus.msg}</p>
                </div>
              </div>
            </div>
          )}

          {/* TASK 3: STUDENT ID BADGE */}
          {activeTask === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-violet-300 font-mono flex items-center gap-2">
                <Target className="w-4 h-4" /> CBSE Practical Assignment: Formatted Student Biodata Generator
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Student Full Name:</label>
                    <input
                      type="text"
                      value={studName}
                      onChange={(e) => setStudName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Roll Number:</label>
                    <input
                      type="number"
                      value={studRoll}
                      onChange={(e) => setStudRoll(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Academic Percentage (%):</label>
                    <input
                      type="number"
                      value={studScore}
                      onChange={(e) => setStudScore(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black border border-violet-500/40 font-mono text-xs text-slate-200 space-y-1">
                  <p className="text-violet-400 font-bold">=============================================</p>
                  <p className="text-center font-bold text-white">CBSE HIGHER SECONDARY ID BADGE (2026-27)</p>
                  <p className="text-violet-400 font-bold">=============================================</p>
                  <p><span className="text-slate-500">Name   :</span> <span className="text-white font-bold">{studName}</span></p>
                  <p><span className="text-slate-500">Roll No:</span> <span className="text-cyan-400 font-bold">{String(studRoll).padStart(5, "0")}</span></p>
                  <p><span className="text-slate-500">Subject:</span> <span className="text-emerald-400">Computer Science (083)</span></p>
                  <p><span className="text-slate-500">Score  :</span> <span className="text-yellow-300 font-bold">{parseFloat(studScore || "0").toFixed(2)}%</span></p>
                  <p className="text-violet-400 font-bold">=============================================</p>
                  <p className="text-emerald-400 text-[11px] pt-1"># Generated using print(*objects, sep=&apos;...&apos;, end=&apos;...&apos;) formatting</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: TEACHER SUKANTA HUI NOTE */}
        <Teacher />

        {/* SECTION 4: CODE LOADER & NOTE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-violet-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              Python Skills Arena Script
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic13_files/python_skill_arena_challenges.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              Topic 13 Practical &amp; Board Blueprint
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic13_files/topic13_note.txt"
            />
          </div>
        </div>

        {/* SECTION 5: FAQ TEMPLATE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <FAQTemplate />
        </div>

        {/* SECTION 6: 30-MCQ BOARD EXAM SIMULATOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 bg-violet-950/60 px-3 py-1 rounded-full border border-violet-800/60">
                Final Board Simulation
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">
                30-Question CBSE Board Exam Simulator
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Authentic 30-Question Multiple Choice Examination covering every aspect of Module 004_002.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {showResults && (
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Quiz
                </button>
              )}
              <button
                onClick={() => setShowResults(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500 transition-all"
              >
                {showResults ? "Update Results" : "Submit Examination"}
              </button>
            </div>
          </div>

          {showResults && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-950/80 via-slate-900 to-indigo-950/80 border border-violet-500/40 flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-violet-400 uppercase font-semibold">Official Exam Evaluation</span>
                <h3 className="text-3xl font-black text-white">
                  Score: {calculateScore()} / {topic13Questions.length}
                </h3>
                <p className="text-xs text-slate-300">
                  Total Percentage: {((calculateScore() / topic13Questions.length) * 100).toFixed(1)}%
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 min-w-[240px]">
                <span className="text-[11px] font-mono text-slate-500 uppercase block">CBSE Grade Awarded:</span>
                <p className={`text-lg font-bold ${getCbseGrade(calculateScore(), topic13Questions.length).color}`}>
                  {getCbseGrade(calculateScore(), topic13Questions.length).grade}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic13Questions.map((q, idx) => {
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
                      ? "bg-slate-950/80 border-violet-500/30"
                      : "bg-slate-950/40 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-violet-300">
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
                        btnStyle = "bg-violet-950/80 border-violet-400 text-violet-200 font-semibold shadow-inner";
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
                        <span className="text-violet-400 font-bold font-mono uppercase">Explanation (EN): </span>
                        {q.explanationEn}
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-indigo-300">
                        <span className="text-indigo-400 font-bold font-mono uppercase">ব্যাখ্যা (বাংলা): </span>
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
