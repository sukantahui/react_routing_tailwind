import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic3Questions } from "./topic3_files/topic3_questions";

export default function Topic3() {
  // Numeric Literal Radix Converter State
  const [decimalVal, setDecimalVal] = useState(42);

  // Floating Point Exponent Simulator State
  const [mantissa, setMantissa] = useState(1.5);
  const [exponent, setExponent] = useState(3);
  const scientificVal = mantissa * Math.pow(10, exponent);

  // Complex Number State
  const [realPart, setRealPart] = useState(3);
  const [imagPart, setImagPart] = useState(4);

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic3Questions.forEach((q) => {
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
              <span>Unit 2: Python Basics & Lexical Tokens</span>
              <span>/</span>
              <span className="text-teal-200">Topic 3</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Python Literals: Numeric, String, Boolean &amp; Special Literal None
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Explore constant immutable data representations in Python. Master integer radix prefixes (<code>0b</code>, <code>0o</code>, <code>0x</code>),
              scientific float exponents, complex numbers with imaginary unit <code>j</code>, multiline and raw strings, boolean integer inheritance, and <code>NoneType</code>.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE NUMERIC LITERALS SANDBOX */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Interactive Lab
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Multi-Radix Integer &amp; Scientific Float Sandbox</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Integer Radix Bases */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-teal-300">1. Integer Literal Radix Converter</h3>
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Enter Decimal Integer:</label>
                <input
                  type="number"
                  value={decimalVal}
                  onChange={(e) => setDecimalVal(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-900 border border-teal-500/50 text-white text-lg font-mono font-bold rounded-xl p-3 focus:outline-none"
                />
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Decimal (Base 10):</span>
                  <span className="font-bold text-white">{decimalVal}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-emerald-400">Binary (0b / Base 2):</span>
                  <span className="font-bold text-emerald-300">0b{decimalVal.toString(2)}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-sky-400">Octal (0o / Base 8):</span>
                  <span className="font-bold text-sky-300">0o{decimalVal.toString(8)}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-indigo-400">Hexadecimal (0x / Base 16):</span>
                  <span className="font-bold text-indigo-300">0x{decimalVal.toString(16).toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Scientific Exponent & Complex Numbers */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-cyan-300">2. Scientific Notation &amp; Complex Numbers</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Mantissa (Float):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={mantissa}
                    onChange={(e) => setMantissa(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Exponent (Integer):</label>
                  <input
                    type="number"
                    value={exponent}
                    onChange={(e) => setExponent(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-2.5 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-slate-400">Python Literal: <strong className="text-cyan-300">{mantissa}e{exponent}</strong></div>
                <div className="text-slate-400">Evaluated Value: <strong className="text-white">{scientificVal}</strong></div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Complex Literal:</span>
                  <span className="font-bold text-purple-300">{realPart} + {imagPart}j</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  • <code>({realPart}+{imagPart}j).real</code> = {realPart}.0 | • <code>({realPart}+{imagPart}j).imag</code> = {imagPart}.0
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: COMPREHENSIVE LITERAL CATEGORIES GUIDE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Taxonomy
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">The 4 Core Python Literal Classifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-sans text-xs">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-mono text-teal-400 font-bold uppercase">1. Numeric Literals</span>
              <p className="text-slate-300">
                • <strong>Integers:</strong> <code>42</code>, <code>0b101</code>, <code>0o17</code>, <code>0x1F</code><br/>
                • <strong>Floats:</strong> <code>3.14</code>, <code>1.5e3</code>, <code>2.5e-2</code><br/>
                • <strong>Complex:</strong> <code>3 + 4j</code> (imaginary unit <code>j</code>)
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-mono text-sky-400 font-bold uppercase">2. String Literals</span>
              <p className="text-slate-300">
                • <strong>Single Line:</strong> <code>'Hello'</code>, <code>"World"</code><br/>
                • <strong>Multiline:</strong> <code>'''...'''</code>, <code>"""..."""</code><br/>
                • <strong>Raw Strings:</strong> <code>r"C:\new\test"</code>
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-mono text-indigo-400 font-bold uppercase">3. Boolean Literals</span>
              <p className="text-slate-300">
                • <code>True</code> (numeric value 1)<br/>
                • <code>False</code> (numeric value 0)<br/>
                • Subclass of integer: <code>True + True == 2</code>
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-mono text-amber-400 font-bold uppercase">4. Special Literal None</span>
              <p className="text-slate-300">
                • <code>None</code>: Represents void, null, or absence of value<br/>
                • Data type: <code>&lt;class 'NoneType'&gt;</code><br/>
                • Evaluates to <code>False</code> in boolean conditions
              </p>
            </div>
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
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic3_files/python_literals_inspector.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 3 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic3_files/topic3_note.txt"
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
              <h2 className="text-2xl font-bold text-white mt-2">Topic 3 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on Python Literals (Numeric, Radix Bases, String, Boolean, None).
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
                  Your Score: {calculateScore()} / {topic3Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic3Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Literals Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic3Questions.map((q, idx) => {
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
