import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic4Questions } from "./topic4_files/topic4_questions";

export default function Topic4() {
  // Punctuator Inspector State
  const [selectedPunc, setSelectedPunc] = useState("parentheses");

  const punctuatorsData = {
    parentheses: {
      symbol: "( )",
      name: "Parentheses (Round Brackets)",
      roles: [
        "Constructing Tuples: (10, 20, 30)",
        "Function Invocations & Calls: print('Hello')",
        "Mathematical Precedence Grouping: (a + b) * c",
        "Function Parameter Lists: def add(x, y):"
      ],
      code: "# Precedence & Function Call\nresult = (10 + 5) * 2\nprint(f'Evaluated: {result}')  # 30\n\n# Single-element tuple must have comma!\ntpl = (42,)",
      color: "from-teal-600 to-emerald-700"
    },
    brackets: {
      symbol: "[ ]",
      name: "Square Brackets",
      roles: [
        "Constructing Lists: [1, 2, 3]",
        "Sequence Element Indexing: arr[0], str[-1]",
        "Sequence Slicing: text[1:5:2]",
        "List Comprehensions: [x*2 for x in data]"
      ],
      code: "marks = [85, 92, 78, 95]\nfirst = marks[0]       # 85\nsub_list = marks[1:3]  # [92, 78]",
      color: "from-sky-600 to-blue-700"
    },
    braces: {
      symbol: "{ }",
      name: "Curly Braces (Braces)",
      roles: [
        "Constructing Dictionaries: {'name': 'Amit', 'age': 16}",
        "Constructing Sets: {1, 2, 3, 4}",
        "f-string Variable Interpolation: f'Total: {score}'"
      ],
      code: "# Dictionary & f-string\nstudent = {'name': 'Mamata', 'score': 98}\nprint(f\"{student['name']} scored {student['score']}\")\n\n# Empty dict vs set\nempty_dict = {}     # dict\nempty_set = set()   # set",
      color: "from-indigo-600 to-violet-700"
    },
    colon: {
      symbol: ":",
      name: "Colon (Suite Header & Slicing)",
      roles: [
        "Suite Initiator: Terminating headers for if, for, while, def, class",
        "Slicing Delimiter: seq[start:stop:step]",
        "Dictionary Key-Value Separator: {key: value}",
        "Type Annotations (PEP 526): age: int = 17"
      ],
      code: "score: int = 95\nif score >= 90:\n    print('Grade A+')\nelse:\n    print('Pass')",
      color: "from-amber-500 to-orange-600"
    },
    comma: {
      symbol: ",",
      name: "Comma (Separator & Unpacking)",
      roles: [
        "Separating arguments in function calls: print(a, b, c)",
        "Separating collection elements: [1, 2, 3]",
        "Simultaneous Sequence Unpacking: x, y = 10, 20",
        "Single-Element Tuple Marker: (5,)"
      ],
      code: "a, b = 10, 20\na, b = b, a  # Swapping values\nprint('Swapped:', a, b)",
      color: "from-rose-500 to-pink-600"
    },
    dot: {
      symbol: ".",
      name: "Dot / Period (Attribute & Decimal)",
      roles: [
        "Accessing object attributes & methods: str.upper()",
        "Accessing module functions: math.sqrt(25)",
        "Floating-point fractional decimal point: 3.14159"
      ],
      code: "import math\nval = math.sqrt(144)  # 12.0\ntext = 'python'.upper()  # 'PYTHON'",
      color: "from-purple-600 to-fuchsia-700"
    },
    at: {
      symbol: "@",
      name: "At Symbol (Decorators)",
      roles: [
        "Syntactic prefix for decorators before function/class definitions",
        "Matrix multiplication operator in Python 3.5+ (PEP 465)"
      ],
      code: "class Student:\n    @staticmethod\n    def school_name():\n        return 'National Model School'",
      color: "from-cyan-600 to-teal-600"
    }
  };

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic4Questions.forEach((q) => {
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
              <span className="text-teal-200">Topic 4</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Python Punctuators &amp; Delimiters: Structural Syntax Symbols
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
              Discover the syntactic glue that binds Python programs together. Master grouping delimiters <code>()</code>, <code>[]</code>, <code>{'{}'}</code>,
              structural separators like colons <code>:</code>, commas <code>,</code>, dots <code>.</code>, semicolons <code>;</code>, decorators <code>@</code>, and augmented assignment operators.
            </p>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE PUNCTUATOR INSPECTOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
                Interactive Inspector
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Punctuator &amp; Delimiter Roles Explorer</h2>
            </div>
            <span className="text-xs text-slate-400">Click any symbol to inspect its grammatical roles</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 font-mono">
            {Object.keys(punctuatorsData).map((key) => {
              const item = punctuatorsData[key];
              const isSelected = selectedPunc === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPunc(key)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all border ${
                    isSelected
                      ? "bg-teal-600/30 border-teal-400 text-white shadow-lg shadow-teal-500/20 scale-105"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="text-2xl font-bold">{item.symbol}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-1 font-sans">{item.name.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {selectedPunc && (
            <div className="bg-slate-950 p-6 rounded-2xl border border-teal-500/40 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-teal-400 font-mono">
                    {punctuatorsData[selectedPunc].symbol}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {punctuatorsData[selectedPunc].name}
                  </h3>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                  <strong className="text-teal-400 block uppercase font-mono tracking-wider">Primary Grammatical Roles:</strong>
                  <ul className="space-y-1 pl-3">
                    {punctuatorsData[selectedPunc].roles.map((r, idx) => (
                      <li key={idx} className="list-disc">{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 font-bold uppercase block mb-1.5">Python Syntax Example:</span>
                <pre className="text-cyan-300 leading-relaxed overflow-x-auto whitespace-pre">
                  {punctuatorsData[selectedPunc].code}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: PUNCTUATOR MASTER REFERENCE TABLE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/60">
              Syntax Guide
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Comprehensive Python Punctuator Matrix</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-teal-300 font-mono uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Symbol</th>
                  <th className="p-4">Punctuator Name</th>
                  <th className="p-4">Primary Functionality</th>
                  <th className="p-4">CBSE Examination Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono font-bold text-teal-400 text-base"><code>( )</code></td>
                  <td className="p-4 font-semibold text-white">Parentheses</td>
                  <td className="p-4">Tuple construction, function calls, arithmetic precedence</td>
                  <td className="p-4 text-slate-400">Single-element tuple requires trailing comma: <code>(5,)</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono font-bold text-sky-400 text-base"><code>[ ]</code></td>
                  <td className="p-4 font-semibold text-white">Square Brackets</td>
                  <td className="p-4">List creation, sequence indexing, slice ranges</td>
                  <td className="p-4 text-slate-400">Zero-indexed: <code>list[0]</code> is 1st element, <code>list[-1]</code> is last</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono font-bold text-indigo-400 text-base"><code>{'{ }'}</code></td>
                  <td className="p-4 font-semibold text-white">Curly Braces</td>
                  <td className="p-4">Dictionary key-values, Sets, f-string interpolation</td>
                  <td className="p-4 text-slate-400"><code>{'{}'}</code> creates an empty dictionary, not an empty set</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono font-bold text-amber-400 text-base"><code>:</code></td>
                  <td className="p-4 font-semibold text-white">Colon</td>
                  <td className="p-4">Introduces indented block suites for if/for/def/class</td>
                  <td className="p-4 text-slate-400">Omitting colon at header line raises <code>SyntaxError: expected ':'</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono font-bold text-rose-400 text-base"><code>,</code></td>
                  <td className="p-4 font-semibold text-white">Comma</td>
                  <td className="p-4">Separates items, arguments, and sequence unpacking targets</td>
                  <td className="p-4 text-slate-400">Allows multiple assignment on one line: <code>a, b = 1, 2</code></td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono font-bold text-purple-400 text-base"><code>.</code></td>
                  <td className="p-4 font-semibold text-white">Dot / Period</td>
                  <td className="p-4">Attribute / method / module member access, decimal float point</td>
                  <td className="p-4 text-slate-400">Used in OOP and modules: <code>math.sqrt()</code>, <code>s.upper()</code></td>
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
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic4_files/python_punctuators_engine.py"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Topic 4 Revision Notes
            </h3>
            <PlainTextPrint
              filePath="e:/react_routing_tailwind/src/components/study/cbse-class-11-computer-science-083/topics/004_002_python-basics-tokens-variables-and-io/topic4_files/topic4_note.txt"
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
              <h2 className="text-2xl font-bold text-white mt-2">Topic 4 Practice Quiz & Board Drills</h2>
              <p className="text-slate-400 text-sm mt-1">
                25 High-Yield CBSE Class 11 Questions on Python Punctuators, Delimiters & Augmented Assignment Operators.
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
                  Your Score: {calculateScore()} / {topic4Questions.length}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Percentage: {((calculateScore() / topic4Questions.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-sm font-mono px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                {calculateScore() >= 20 ? (
                  <span className="text-emerald-400 font-bold">Outstanding! Punctuators Mastered.</span>
                ) : calculateScore() >= 14 ? (
                  <span className="text-cyan-400 font-bold">Good effort! Review the questions you missed.</span>
                ) : (
                  <span className="text-amber-400 font-bold">Revise the notes and retry the quiz.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic4Questions.map((q, idx) => {
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
