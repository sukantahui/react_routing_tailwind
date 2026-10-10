import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic5Questions } from "./topic5_files/topic5_questions";

export default function Topic5() {
  // Reference Model Simulator State
  const [valA, setValA] = useState(100);
  const [valB, setValB] = useState(100);
  const [isAliased, setIsAliased] = useState(true);

  // List Mutability Demo State
  const [list1, setList1] = useState([10, 20]);
  const [list2, setList2] = useState([10, 20]);
  const [isListAliased, setIsListAliased] = useState(false);

  // Simulated memory addresses
  const idValA = "0x7FFF" + (Math.abs(valA) * 16 + 1024).toString(16).toUpperCase();
  const idValB = isAliased
    ? idValA
    : "0x7FFF" + (Math.abs(valB) * 16 + 2048).toString(16).toUpperCase();

  const idList1 = "0xHeapA01";
  const idList2 = isListAliased ? idList1 : "0xHeapB02";

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic5Questions.forEach((q) => {
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
              <span className="text-teal-200">Topic 5</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Variables as Object References, id() Function &amp; Garbage Collection
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Demystify Python's object-oriented memory model. Learn why variables are name tag references rather than static storage boxes,
              how the <code>id()</code> function retrieves memory addresses, the crucial difference between <code>==</code> and <code>is</code>, and how automatic reference counting reclaims memory.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE MEMORY REFERENCE SIMULATOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Interactive Memory Visualizer
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Python Heap Object Pointer Visualizer</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Variable a Value:</label>
                  <input
                    type="number"
                    value={valA}
                    onChange={(e) => setValA(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-teal-500/50 text-white text-sm rounded-xl p-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Variable b Value:</label>
                  <input
                    type="number"
                    disabled={isAliased}
                    value={isAliased ? valA : valB}
                    onChange={(e) => setValB(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 disabled:opacity-50 text-white text-sm rounded-xl p-2.5 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                  <input
                    type="checkbox"
                    checked={isAliased}
                    onChange={(e) => setIsAliased(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-0"
                  />
                  <span>Enable Direct Aliasing: <code>b = a</code> (Point to same object)</span>
                </label>
              </div>

              {/* Memory Expression Output */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Content Equality (a == b):</span>
                  <span className={`font-bold ${(isAliased || valA === valB) ? "text-emerald-400" : "text-rose-400"}`}>
                    {(isAliased || valA === valB) ? "True (Equal values)" : "False (Different values)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Object Identity (a is b):</span>
                  <span className={`font-bold ${isAliased || (valA === valB && valA >= -5 && valA <= 256) ? "text-emerald-400" : "text-amber-400"}`}>
                    {isAliased || (valA === valB && valA >= -5 && valA <= 256)
                      ? "True (Same memory address id())"
                      : "False (Distinct objects in memory)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Pointer Diagram */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-mono text-slate-400 block text-center font-bold">
                Heap Memory Representation
              </span>

              <div className="flex items-center justify-around">
                {/* Names Column */}
                <div className="space-y-6 font-mono text-xs">
                  <div className="px-4 py-2 bg-teal-950/80 border border-teal-500 rounded-xl text-teal-200 font-bold">
                    Name Tag: <code>a</code>
                  </div>
                  <div className="px-4 py-2 bg-indigo-950/80 border border-indigo-500 rounded-xl text-indigo-200 font-bold">
                    Name Tag: <code>b</code>
                  </div>
                </div>

                {/* Arrows */}
                <div className="space-y-6 font-mono text-xs text-slate-400">
                  <div className="text-teal-400 font-bold">──────►</div>
                  <div className="text-indigo-400 font-bold">──────►</div>
                </div>

                {/* Heap Objects */}
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-teal-500/40 text-center space-y-1">
                    <span className="text-[10px] text-slate-500 block">Object in Heap Memory</span>
                    <div className="text-lg font-bold text-white">{valA}</div>
                    <div className="text-[10px] text-teal-400">id: {idValA}</div>
                  </div>

                  {!isAliased && valA !== valB && (
                    <div className="p-3 bg-slate-900 rounded-xl border border-indigo-500/40 text-center space-y-1">
                      <span className="text-[10px] text-slate-500 block">Object in Heap Memory</span>
                      <div className="text-lg font-bold text-white">{valB}</div>
                      <div className="text-[10px] text-indigo-400">id: {idValB}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: CORE MEMORY CONCEPTS GUIDE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Core Principles
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Key Principles of Python Memory Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-teal-300 uppercase font-mono">1. Variables as Name Tags</h3>
              <p className="text-slate-300">
                Variables in Python do NOT allocate fixed byte boxes. They are lightweight reference pointers tagged onto heap objects.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-400 font-mono text-[11px]">
                <code>a = 10; b = a</code><br/>
                Creates 1 object, 2 name tags.
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-indigo-300 uppercase font-mono">2. id() &amp; Small Int Caching</h3>
              <p className="text-slate-300">
                <code>id(obj)</code> returns the unique memory address. Integers between <strong>-5 and 256</strong> are pre-allocated and shared automatically.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-400 font-mono text-[11px]">
                <code>x = 100; y = 100</code><br/>
                <code>x is y</code> evaluates to <code>True</code>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-cyan-300 uppercase font-mono">3. Automatic Garbage Collection</h3>
              <p className="text-slate-300">
                Python tracks reference counts. When an object's reference count drops to <strong>0</strong>, the garbage collector frees its memory automatically.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-400 font-mono text-[11px]">
                <code>a = 'Hello'; a = 42</code><br/>
                'Hello' ref count = 0 (Deallocated)
              </div>
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
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic5_files/python_memory_references_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 5 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic5_files/topic5_note.txt"
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
              <h2 className="text-2xl font-bold text-white mt-2">Topic 5 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on Object References, id(), is vs ==, and Garbage Collection.
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
                  Your Score: {calculateScore()} / {topic5Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic5Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Object References Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic5Questions.map((q, idx) => {
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
