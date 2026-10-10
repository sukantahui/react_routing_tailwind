import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic6Questions } from "./topic6_files/topic6_questions";

export default function Topic6() {
  // Active algorithm in the Pseudocode Playground
  const [selectedAlgo, setSelectedAlgo] = useState("linearSearch");

  // Interactive Linear Search State
  const [searchTarget, setSearchTarget] = useState(42);
  const sampleArray = [15, 23, 42, 67, 89, 94];

  // Interactive Prime Check State
  const [primeInput, setPrimeInput] = useState(29);

  // Determine Prime
  const checkPrime = (n) => {
    if (n <= 1) return { isPrime: false, steps: ["N <= 1 is not prime"] };
    const steps = [];
    let d = 2;
    while (d * d <= n) {
      steps.push(`Testing divisor ${d}: ${n} % ${d} = ${n % d}`);
      if (n % d === 0) {
        return { isPrime: false, steps };
      }
      d++;
    }
    return { isPrime: true, steps };
  };
  const primeResult = checkPrime(primeInput);

  // Linear search trace
  const searchIndex = sampleArray.indexOf(Number(searchTarget));

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic6Questions.forEach((q) => {
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
              <span className="text-teal-200">Topic 6</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Pseudocode: Writing Language-Independent Problem Logic
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Learn how to articulate computational logic cleanly without language-specific syntax burdens. Master standard pseudocode conventions,
              keywords (INPUT, OUTPUT, SET, IF/ELSE, WHILE, FOR, REPEAT-UNTIL), block indentation, and translation into production Python code.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE PSEUDOCODE PLAYGROUND */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Interactive Studio
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Pseudocode vs Python Transpiler Playground</h2>
            </div>
            <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setSelectedAlgo("linearSearch")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedAlgo === "linearSearch"
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                1. Linear Search
              </button>
              <button
                onClick={() => setSelectedAlgo("primeCheck")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedAlgo === "primeCheck"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                2. Prime Checker
              </button>
            </div>
          </div>

          {/* PLAYGROUND: LINEAR SEARCH */}
          {selectedAlgo === "linearSearch" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">Target Array:</span>
                  <div className="flex gap-1.5 font-mono text-xs">
                    {sampleArray.map((val, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-lg border ${
                          Number(searchTarget) === val
                            ? "bg-emerald-950 border-emerald-400 text-emerald-300 font-bold"
                            : "bg-slate-900 border-slate-800 text-slate-300"
                        }`}
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-xs font-mono text-slate-400">Search Target:</label>
                  <input
                    type="number"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(Number(e.target.value))}
                    className="w-24 bg-slate-900 border border-teal-500/50 text-white text-xs rounded-xl p-2 font-mono text-center focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pseudocode Side */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-teal-400 border-b border-slate-800 pb-2">
                    <span className="font-bold uppercase tracking-wider">Universal Pseudocode</span>
                    <span className="text-[10px] text-slate-500">Language-Independent</span>
                  </div>
                  <pre className="text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
{`ALGORITHM LinearSearch(A, Target)
BEGIN
    SET index = -1
    FOR i FROM 0 TO LENGTH(A) - 1 DO
        IF A[i] == Target THEN
            SET index = i
            BREAK
        ENDIF
    ENDFOR
    RETURN index
END`}
                  </pre>
                </div>

                {/* Python 3 Code Side */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-cyan-400 border-b border-slate-800 pb-2">
                    <span className="font-bold uppercase tracking-wider">Python 3 Implementation</span>
                    <span className="text-[10px] text-slate-500">Executable Syntax</span>
                  </div>
                  <pre className="text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
{`def linear_search(arr, target):
    index = -1
    for i in range(len(arr)):
        if arr[i] == target:
            index = i
            break
    return index`}
                  </pre>
                  <div className="pt-2 border-t border-slate-800 text-slate-400">
                    Search Result: {searchIndex !== -1 ? (
                      <span className="text-emerald-400 font-bold">Target found at Index {searchIndex}</span>
                    ) : (
                      <span className="text-rose-400 font-bold">Target not found (-1)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PLAYGROUND: PRIME CHECK */}
          {selectedAlgo === "primeCheck" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-mono text-slate-400">Test Integer N:</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={primeInput}
                    onChange={(e) => setPrimeInput(Number(e.target.value))}
                    className="w-24 bg-slate-900 border border-cyan-500/50 text-white text-xs rounded-xl p-2 font-mono text-center focus:outline-none"
                  />
                </div>
                <div className="font-mono text-xs">
                  Evaluation: {primeResult.isPrime ? (
                    <span className="text-emerald-400 font-bold px-3 py-1 bg-emerald-950/60 rounded-full border border-emerald-700">
                      {primeInput} is a PRIME Number
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold px-3 py-1 bg-rose-950/60 rounded-full border border-rose-700">
                      {primeInput} is NOT a Prime Number
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pseudocode Side */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-teal-400 border-b border-slate-800 pb-2">
                    <span className="font-bold uppercase tracking-wider">Universal Pseudocode</span>
                    <span className="text-[10px] text-slate-500">Language-Independent</span>
                  </div>
                  <pre className="text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
{`ALGORITHM IsPrime(N)
BEGIN
    IF N <= 1 THEN
        RETURN FALSE
    ENDIF
    SET is_prime = TRUE
    SET divisor = 2
    WHILE (divisor * divisor <= N) DO
        IF (N MOD divisor == 0) THEN
            SET is_prime = FALSE
            BREAK
        ENDIF
        SET divisor = divisor + 1
    ENDWHILE
    RETURN is_prime
END`}
                  </pre>
                </div>

                {/* Python 3 Code Side */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-cyan-400 border-b border-slate-800 pb-2">
                    <span className="font-bold uppercase tracking-wider">Python 3 Implementation</span>
                    <span className="text-[10px] text-slate-500">Executable Syntax</span>
                  </div>
                  <pre className="text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
{`def is_prime(n):
    if n <= 1:
        return False
    divisor = 2
    while divisor * divisor <= n:
        if n % divisor == 0:
            return False
        divisor += 1
    return True`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: STANDARD PSEUDOCODE KEYWORDS CHEATSHEET */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Syntax Guide
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Standard Pseudocode Construct Keywords</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wide">1. Input / Output & State</h3>
              <div className="space-y-2 text-slate-300">
                <div><span className="text-emerald-400 font-bold">INPUT / READ:</span> Accept user data (e.g. <code>INPUT radius</code>)</div>
                <div><span className="text-emerald-400 font-bold">OUTPUT / PRINT:</span> Display data (e.g. <code>OUTPUT area</code>)</div>
                <div><span className="text-emerald-400 font-bold">SET / &lt;-:</span> Assign value (e.g. <code>SET pi = 3.14159</code>)</div>
                <div><span className="text-emerald-400 font-bold">BEGIN / END:</span> Boundary scope of the algorithm</div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide">2. Condition & Branching</h3>
              <div className="space-y-2 text-slate-300">
                <div><span className="text-indigo-400 font-bold">IF ... THEN:</span> Start of conditional branch</div>
                <div><span className="text-indigo-400 font-bold">ELSE IF:</span> Alternative conditional check</div>
                <div><span className="text-indigo-400 font-bold">ELSE:</span> Default branch when conditions fail</div>
                <div><span className="text-indigo-400 font-bold">ENDIF:</span> Explicit close of the conditional block</div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wide">3. Repetition & Loops</h3>
              <div className="space-y-2 text-slate-300">
                <div><span className="text-cyan-400 font-bold">WHILE ... DO:</span> Pre-test condition-controlled loop</div>
                <div><span className="text-cyan-400 font-bold">FOR ... DO:</span> Count-controlled iterative loop</div>
                <div><span className="text-cyan-400 font-bold">REPEAT ... UNTIL:</span> Post-test loop stopping on True</div>
                <div><span className="text-cyan-400 font-bold">BREAK / CONTINUE:</span> Immediate loop exit / step skip</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: PSEUDOCODE VS FLOWCHART VS CODE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Methodology Matrix
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Pseudocode vs Flowchart vs Source Code</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-teal-300 font-mono text-xs uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Dimension</th>
                  <th className="p-4">Pseudocode</th>
                  <th className="p-4">Flowchart</th>
                  <th className="p-4">Python Source Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white">Representation</td>
                  <td className="p-4 text-teal-300">Structured English-like text</td>
                  <td className="p-4 text-cyan-300">Geometric visual diagrams</td>
                  <td className="p-4 text-indigo-300">Formal programming syntax</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white">Machine Executability</td>
                  <td className="p-4 text-rose-400">Non-executable (Human only)</td>
                  <td className="p-4 text-rose-400">Non-executable (Human only)</td>
                  <td className="p-4 text-emerald-400">Directly Executed by Interpreter</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white">Ease of Modification</td>
                  <td className="p-4 text-emerald-400">Very High (Simple text edits)</td>
                  <td className="p-4 text-amber-400">Low (Requires redrawing shapes)</td>
                  <td className="p-4 text-emerald-400">Very High (IDE text editor)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white">Syntax Restrictions</td>
                  <td className="p-4">Minimal / Flexible grammar</td>
                  <td className="p-4">Strict ANSI symbol rules</td>
                  <td className="p-4">Strict syntax rules (Indentation, colons)</td>
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
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic6_files/pseudocode_converter.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 6 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_001_problem-solving-algorithms-and-flowcharts/topic6_files/topic6_note.txt"
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
              <h2 className="text-2xl font-bold text-white mt-2">Topic 6 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on Pseudocode Conventions, Logic Keywords & Dry Runs.
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
                  Your Score: {calculateScore()} / {topic6Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic6Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Pseudocode Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic6Questions.map((q, idx) => {
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
