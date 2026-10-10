import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic1Questions } from "./topic1_files/topic1_questions";

export default function Topic1() {
  // Character Inspector State
  const [testChar, setTestChar] = useState("A");

  // Character Analysis
  const getCharData = (input) => {
    if (!input || input.length === 0) return null;
    const char = input[0];
    const code = char.charCodeAt(0);
    const hex = "0x" + code.toString(16).toUpperCase().padStart(4, "0");
    const bin = code.toString(2).padStart(8, "0");

    let category = "Special Symbol / Punctuation";
    if (code >= 65 && code <= 90) category = "Uppercase Letter (A-Z)";
    else if (code >= 97 && code <= 122) category = "Lowercase Letter (a-z)";
    else if (code >= 48 && code <= 57) category = "Decimal Digit (0-9)";
    else if ([32, 9, 10, 13].includes(code)) category = "Whitespace Character";
    else if (code > 127) category = "Extended Multilingual Unicode";

    return { char, code, hex, bin, category };
  };

  const charData = getCharData(testChar);

  // Escape Sequence Simulator State
  const [selectedEscape, setSelectedEscape] = useState("\\n");

  const escapeList = {
    "\\n": { name: "Newline (Line Feed)", action: "Moves text to the start of the next line", demo: "Line 1\nLine 2" },
    "\\t": { name: "Horizontal Tab", action: "Inserts a 4/8-column tabular space", demo: "Col1\tCol2\tCol3" },
    "\\\\": { name: "Literal Backslash", action: "Outputs a single literal backslash", demo: "C:\\Python312\\Scripts" },
    "\\'": { name: "Single Quote", action: "Escapes a single quote inside single quotes", demo: "It\'s a Python program" },
    '\\"': { name: "Double Quote", action: "Escapes a double quote inside double quotes", demo: 'She said, "Hello!"' },
    "\\b": { name: "Backspace", action: "Moves cursor back one character", demo: "ABC\bDE (displays ABDE in console)" }
  };

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic1Questions.forEach((q) => {
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
        <div className="bg-gradient-to-r from-sky-900/60 via-slate-900 to-teal-900/60 p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-sky-400">
              <span>CBSE Class 11 CS (083)</span>
              <span>/</span>
              <span>Unit 2: Python Basics & Lexical Tokens</span>
              <span>/</span>
              <span className="text-sky-200">Topic 1</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Python Character Set: Letters, Digits, Symbols & Unicode
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Explore the foundational atomic elements of Python 3. Learn how the Unicode UTF-8 character set encompasses Latin letters,
              decimal digits, mathematical operators, whitespace delimiters, escape sequences, and multilingual Indic scripts.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE CHARACTER SET INSPECTOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800/60">
              Interactive Inspector
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">ASCII &amp; Unicode Character Analyzer</h2>
            <p className="text-slate-400 text-sm mt-1">
              Type or select any character to inspect its ASCII decimal value, hexadecimal code point, binary representation, and Python category.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5">Enter Character to Audit:</label>
                <input
                  type="text"
                  maxLength={1}
                  value={testChar}
                  onChange={(e) => setTestChar(e.target.value)}
                  className="w-full bg-slate-950 border border-sky-500/50 text-white text-2xl font-mono font-bold rounded-2xl p-4 text-center focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 block mb-2">Preset High-Yield Characters:</span>
                <div className="flex flex-wrap gap-2">
                  {["A", "a", "0", "9", " ", "#", "_", "অ", "ক"].map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setTestChar(ch)}
                      className={`w-9 h-9 rounded-xl font-mono font-bold text-sm border transition-all ${
                        testChar === ch
                          ? "bg-sky-600 text-white border-sky-400"
                          : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600"
                      }`}
                    >
                      {ch === " " ? "␣" : ch}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {charData && (
              <div className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">Character:</span>
                  <div className="text-2xl font-bold text-sky-400">{charData.char === " " ? "Space" : charData.char}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">Decimal (ord()):</span>
                  <div className="text-2xl font-bold text-emerald-400">{charData.code}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">Hexadecimal:</span>
                  <div className="text-xl font-bold text-indigo-400">{charData.hex}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">8-Bit Binary:</span>
                  <div className="text-sm font-bold text-amber-400 truncate">{charData.bin}</div>
                </div>

                <div className="col-span-2 sm:col-span-4 p-3 bg-sky-950/40 border border-sky-600/40 rounded-xl text-sky-200">
                  <strong>Python Lexical Category: </strong> {charData.category}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: ESCAPE SEQUENCES EXPLORER */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800/60">
              Escape Sequences
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Python Escape Sequence Playground</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.keys(escapeList).map((esc) => (
              <button
                key={esc}
                onClick={() => setSelectedEscape(esc)}
                className={`p-3 rounded-2xl border text-center font-mono text-sm transition-all ${
                  selectedEscape === esc
                    ? "bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-500/20 scale-105"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="font-bold text-base">{esc}</div>
                <div className="text-[10px] text-slate-400 line-clamp-1 mt-1">{escapeList[esc].name}</div>
              </button>
            ))}
          </div>

          {selectedEscape && (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-sky-400 font-bold border-b border-slate-800 pb-2">
                <span>Escape: {selectedEscape} — {escapeList[selectedEscape].name}</span>
                <span className="text-slate-500">ASCII Escape Code</span>
              </div>
              <p className="text-slate-300 font-sans text-sm">{escapeList[selectedEscape].action}</p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300">
                <span className="text-slate-500 font-bold uppercase block mb-1">Code Demonstration:</span>
                <pre className="whitespace-pre">{escapeList[selectedEscape].demo}</pre>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: CASE SENSITIVITY & UNICODE GUIDE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800/60">
              Core Principles
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Case Sensitivity &amp; Multilingual Unicode Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Case Sensitivity Rules
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• <strong>Distinct Identifiers:</strong> <code>Score</code>, <code>score</code>, and <code>SCORE</code> are three independent variables in memory.</li>
                <li>• <strong>Keywords:</strong> Python keywords are case-sensitive. <code>True</code> and <code>False</code> must have capitalized first letters. <code>true</code> raises <code>NameError</code>.</li>
                <li>• <strong>ASCII Offset:</strong> Uppercase letters and lowercase letters differ by 32 in their ASCII binary representations (e.g. <code>ord('a') - ord('A') == 32</code>).</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-teal-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                Unicode UTF-8 Support
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• <strong>Multilingual Strings:</strong> Strings can seamlessly contain Bengali (<code>"নমস্কার"</code>), Hindi (<code>"नमस्ते"</code>), and emojis.</li>
                <li>• <strong>Raw Strings:</strong> Prefixed with <code>r</code> (e.g. <code>r"C:\new\folder"</code>) to treat backslashes literally instead of escape sequences.</li>
                <li>• <strong>Functions:</strong> <code>ord(char)</code> returns code point; <code>chr(code)</code> converts integer code to character.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 5: TEACHER SUKANTA HUI NOTE */}
        <Teacher />

        {/* SECTION 6: PYTHON CODE SIMULATOR & NOTE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              Python Simulation Script
            </h3>
            <PythonFileLoader
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic1_files/python_character_set_inspector.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Topic 1 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic1_files/topic1_note.txt"
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
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800/60">
                Assessment
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Topic 1 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on Python Character Set, ASCII, Unicode & Escape Sequences.
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
                className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-sky-500/20 hover:from-sky-500 hover:to-teal-500 transition-all"
              >
                {showResults ? "Update Results" : "Submit Quiz"}
              </button>
            </div>
          </div>

          {showResults && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-teal-950/80 border border-sky-500/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase font-semibold">Assessment Result</span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Your Score: {calculateScore()} / {topic1Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic1Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Character Set Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-sky-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic1Questions.map((q, idx) => {
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
                      ? "bg-slate-950/80 border-sky-500/30"
                      : "bg-slate-950/40 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-sky-300">
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
                        btnStyle = "bg-sky-950/80 border-sky-400 text-sky-200 font-semibold shadow-inner";
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
                        <span className="text-sky-400 font-bold font-mono uppercase">Explanation (EN): </span>
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
