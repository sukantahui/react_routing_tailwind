import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  BookOpen, ArrowRight, ShieldCheck, Terminal, Code, 
  Zap, Layers, RefreshCw, Trophy, Target, Play
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

const AdvancedJavaChallengeArena = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  const challenges = [
    {
      id: 0,
      title: "Challenge 1: Thread start() Invariant",
      code: `Thread t = new Thread(() -> System.out.print("Run "));\nt.start();\nt.start();`,
      options: [
        "Throws java.lang.IllegalThreadStateException",
        "Prints 'Run Run '",
        "Prints 'Run ' once without error",
        "Compilation error"
      ],
      correct: 0,
      explanation: "A thread cannot be restarted. Invoking start() a second time on an active or finished thread throws java.lang.IllegalThreadStateException."
    },
    {
      id: 1,
      title: "Challenge 2: Assertion with -ea Flag",
      code: `// Executed as: java -ea MainApp\nint count = -5;\nassert count >= 0 : "Count cannot be negative!";\nSystem.out.println("Valid count: " + count);`,
      options: [
        "Throws java.lang.AssertionError: Count cannot be negative!",
        "Prints 'Valid count: -5'",
        "Compilation error",
        "Ignored by JVM"
      ],
      correct: 0,
      explanation: "Because -ea was supplied, the assertion is active. (-5 >= 0) is false, throwing AssertionError with the detail message immediately."
    },
    {
      id: 2,
      title: "Challenge 3: Try-Catch-Finally Output",
      code: `try {\n    int a = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.print("Catch ");\n} finally {\n    System.out.print("Finally ");\n}\nSystem.out.print("Done");`,
      options: [
        "Catch Finally Done",
        "Finally Done",
        "Catch Done",
        "ArithmeticException"
      ],
      correct: 0,
      explanation: "The exception is caught (prints 'Catch '), then finally executes (prints 'Finally '), then sequential execution finishes (prints 'Done'). Total output: 'Catch Finally Done'."
    }
  ];

  const curr = challenges[selectedChallenge];

  const handleSelectOption = (optIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [selectedChallenge]: optIdx
    }));
    setShowResults(prev => ({
      ...prev,
      [selectedChallenge]: true
    }));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <Trophy className="w-3.5 h-3.5" /> Interactive Practice Arena
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Multithreading, Assertions & Exceptions Skill Workbench
          </h2>
        </div>

        <div className="flex gap-2">
          {challenges.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedChallenge(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedChallenge === idx
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-950'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Challenge {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Card */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <span>{curr.title}</span>
            <span className="text-amber-400">Java Code Trace</span>
          </div>

          <pre className="text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
            {curr.code}
          </pre>
        </div>

        {/* Options */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select Predicted Output / Behavior:
            </span>

            {curr.options.map((opt, oIdx) => {
              const isSelected = userAnswers[selectedChallenge] === oIdx;
              const isAnswered = showResults[selectedChallenge];
              const isCorrect = oIdx === curr.correct;

              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                }
              } else if (isSelected) {
                btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold';
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {showResults[selectedChallenge] && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <strong className="text-amber-400 font-bold block">Explanation:</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">{curr.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Topic9 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_004 • Topic 9
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Practice Your Skill Here
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Test your mastery of Java multithreading, assertion evaluation with `-ea`, and try-catch-finally control flows with interactive challenge questions.
          </p>
        </div>

        {/* Challenge Arena */}
        <AdvancedJavaChallengeArena />

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="Congratulations on completing the entire Java Programming sequence (OOP, Constructors, Arrays, Strings, Multithreading, Assertions, and Exceptions)! Practice these interactive challenges regularly to ensure full marks in CBSE Class XII IT 802 examinations."
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Skill Challenge Arena"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic9;
