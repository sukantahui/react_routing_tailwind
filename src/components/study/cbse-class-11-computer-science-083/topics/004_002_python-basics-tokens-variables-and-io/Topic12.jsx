import React, { useState } from "react";
import { 
  Download, FileText, CheckCircle2, Circle, 
  Sparkles, BookOpen, ShieldCheck, 
  FileCode, Check, Target, Trophy
} from "lucide-react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic12Questions } from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";
import masterSummaryText from "./topic12_files/004_002_python_basics_master_cheat_sheet.txt?raw";

export default function Topic12() {
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const checklist = [
    { id: 1, text: "Execution Modes: Understand the difference between REPL Interactive Mode (immediate testing) and Script Mode (.py permanent storage)." },
    { id: 2, text: "Keywords: Remember 35 reserved words in Python 3.12+; only True, False, and None start with a capital letter." },
    { id: 3, text: "Identifier Rules: Starts with [A-Za-z_]; followed by letters, numbers, underscores; never starts with digit; case-sensitive." },
    { id: 4, text: "Numeric Literals: Integer (dec, 0b binary, 0o octal, 0x hex), Float (standard and exponential e/E), Complex (using 'j')." },
    { id: 5, text: "Special & Boolean Literals: True, False as booleans; None as the singleton representation of absence of value." },
    { id: 6, text: "Memory Reference Model: Variables are named pointers (references) to heap memory objects; inspected via id() and type()." },
    { id: 7, text: "l-value vs r-value: In 'lvalue = rvalue', left-hand must be a mutable storage location. Statements like '10 = a' cause SyntaxError." },
    { id: 8, text: "Dynamic Typing: Python variables change type automatically when assigned a new object without static type declaration." },
    { id: 9, text: "Comments vs Docstrings: '#' is stripped by the parser; PEP 257 triple quotes '\"\"\"...\"\"\"' are retained and accessible via .__doc__." },
    { id: 10, text: "Standard Console I/O: input() always returns str; print() controls formatting via 'sep' and 'end' parameters." }
  ];

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const downloadTextFile = (filename, content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic12Questions.forEach((q) => {
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
        <div className="bg-gradient-to-r from-amber-900/60 via-slate-900 to-orange-900/60 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-amber-400">
              <span>CBSE Class 11 CS (083)</span>
              <span>/</span>
              <span>Unit 2: Computational Thinking &amp; Programming</span>
              <span>/</span>
              <span className="text-amber-200">Topic 12</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Downloadable Documents &amp; Master Revision Center
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Consolidated offline study resources, downloadable revision cheat sheets, verification suites, and the official 10-Point CBSE Board Exam Readiness Checklist for Python Basics, Lexical Tokens, Variables, and Standard I/O.
            </p>
          </div>
        </div>

        {/* SECTION 2: DOWNLOAD CARDS & 10-POINT CHECKLIST */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
                <Download className="w-4 h-4" />
                <span>Offline Learning Resources</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Downloadable Master Revision Sheets &amp; Exam Checklist
              </h2>
            </div>
            <div className="text-xs font-mono px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
              Module 004_002 Master Study Pack
            </div>
          </div>

          {/* Download Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Master Revision Cheatsheet (.txt)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Complete summary of tokens, identifier rules, numeric/string literals, dynamic typing memory model, and l-value vs r-value.
                </p>
              </div>
              <button
                onClick={() => downloadTextFile("004_002_python_basics_master_cheat_sheet.txt", masterSummaryText)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-950/40"
              >
                <Download className="w-3.5 h-3.5" /> Download Master Cheatsheet
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 w-fit">
                  <FileCode className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Top 10 Exam Golden Rules (.txt)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-yield CBSE exam sheet focusing on assignment integrity (`lvalue = rvalue`), `input()` string traps, and `sep`/`end` output tricks.
                </p>
              </div>
              <button
                onClick={() => downloadTextFile("004_002_python_basics_exam_golden_rules.txt", noteText)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-sky-950/40"
              >
                <Download className="w-3.5 h-3.5" /> Download 10 Golden Rules
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Verification Engine Suite (.py)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Complete runnable Python test suite with built-in assertion tests for keywords, identifiers, `id()` memory caching, and console I/O.
                </p>
              </div>
              <a
                href="file:///e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic12_files/python_basics_master_suite.py"
                download="python_basics_master_suite.py"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-950/40 text-center"
              >
                <Download className="w-3.5 h-3.5" /> Download Python Suite (.py)
              </a>
            </div>
          </div>

          {/* 10-Point Interactive Checklist */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  10-Point CBSE Exam Readiness Checklist
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Check off each concept as you master it to achieve 100% preparation for your school exams and board practicals.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">{progressPercent}%</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {checklist.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isChecked
                        ? "bg-emerald-950/20 border-emerald-500/50 text-slate-200"
                        : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:bg-slate-900 hover:text-slate-300"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    <span className="text-xs leading-relaxed">
                      <strong className="text-slate-200 font-mono">[{item.id}] </strong>
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 3: TEACHER SUKANTA HUI NOTE */}
        <Teacher />

        {/* SECTION 4: CODE LOADER & NOTE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Python Master Suite Script
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic12_files/python_basics_master_suite.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              Topic 12 Golden Rules Summary
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic12_files/topic12_note.txt"
            />
          </div>
        </div>

        {/* SECTION 5: FAQ TEMPLATE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <FAQTemplate />
        </div>

        {/* SECTION 6: COMPREHENSIVE PRACTICE QUIZ (25 MCQs) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60">
                Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Comprehensive Module 004_002 Review Quiz</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 Board-Pattern MCQs synthesizing all 11 topics of Python Basics &amp; Standard I/O.
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
                className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-amber-500/20 hover:from-amber-500 hover:to-orange-500 transition-all"
              >
                {showResults ? "Update Results" : "Submit Quiz"}
              </button>
            </div>
          </div>

          {showResults && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-orange-950/80 border border-amber-500/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase font-semibold">Assessment Result</span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Your Score: {calculateScore()} / {topic12Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic12Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Module 004_002 Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-amber-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-rose-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic12Questions.map((q, idx) => {
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
                      ? "bg-slate-950/80 border-amber-500/30"
                      : "bg-slate-950/40 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-amber-300">
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
                        btnStyle = "bg-amber-950/80 border-amber-400 text-amber-200 font-semibold shadow-inner";
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
                        <span className="text-amber-400 font-bold font-mono uppercase">Explanation (EN): </span>
                        {q.explanationEn}
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-orange-300">
                        <span className="text-orange-400 font-bold font-mono uppercase">ব্যাখ্যা (বাংলা): </span>
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
