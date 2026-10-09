import React, { useState } from 'react';
import { 
  Terminal, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Zap, Layers, Check, Trophy, Play, Cpu, Target
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

const InteractiveChallengeArena = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  const challenges = [
    {
      id: 0,
      title: "Challenge 1: Do-While Output Prediction",
      code: `int num = 6;\ndo {\n    System.out.print((num * 2) + " ");\n    num -= 2;\n} while (num >= 2);`,
      options: ["12 8 4 ", "12 8 4 0 ", "12 10 8 6 ", "12 8 "],
      correct: 0,
      explanation: "Pass 1: num=6 -> prints 12, num becomes 4 (4>=2 true).\nPass 2: num=4 -> prints 8, num becomes 2 (2>=2 true).\nPass 3: num=2 -> prints 4, num becomes 0 (0>=2 false).\nFinal Output: '12 8 4 '."
    },
    {
      id: 1,
      title: "Challenge 2: Break in Decrementing While Loop",
      code: `int x = 15;\nwhile (x > 0) {\n    if (x == 9) break;\n    x -= 3;\n}\nSystem.out.println(x);`,
      options: ["9", "15", "12", "0"],
      correct: 0,
      explanation: "x starts at 15 -> becomes 12 -> becomes 9 -> x == 9 matches, break exits loop. Final println(x) outputs 9."
    },
    {
      id: 2,
      title: "Challenge 3: Digit Count Logic",
      code: `int n = 45902;\nint count = 0;\nwhile (n > 0) {\n    count++;\n    n = n / 10;\n}\nSystem.out.println(count);`,
      options: ["5", "4", "45902", "20"],
      correct: 0,
      explanation: "Number 45902 has 5 digits. The loop runs 5 times as n reduces by /10 each time until n=0. Output is 5."
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Trophy className="w-3.5 h-3.5" /> Interactive Skill Assessment Arena
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            CBSE IT (802) Loop Mastery & Output Challenge
          </h2>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {challenges.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedChallenge(idx)}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                selectedChallenge === idx
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Task {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-400" /> {curr.title}
        </h3>

        <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{curr.code}
        </pre>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Select the exact console output:
          </span>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {curr.options.map((opt, oIdx) => {
              const isSelected = userAnswers[selectedChallenge] === oIdx;
              const isCorrect = curr.correct === oIdx;
              const hasAnswered = showResults[selectedChallenge];

              let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850";
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold";
                } else if (isSelected) {
                  btnStyle = "bg-rose-500/10 border-rose-500/40 text-rose-300";
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`p-3 rounded-xl border text-xs font-mono text-left transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation Card */}
        {showResults[selectedChallenge] && (
          <div className={`p-4 rounded-xl border text-xs space-y-1 ${
            userAnswers[selectedChallenge] === curr.correct
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}>
            <strong className="block font-bold">
              {userAnswers[selectedChallenge] === curr.correct ? "🎉 Excellent! Correct Answer." : "💡 Solution Walkthrough:"}
            </strong>
            <p className="whitespace-pre-line font-mono text-[11px] leading-relaxed text-slate-300">
              {curr.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Topic8 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 003_004 • Topic 8
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Practice your Skill here: Iterative Loops & Output Prediction
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Test your understanding with authentic CBSE examination output tracing challenges, loop conversion drills, and comprehensive MCQs.
          </p>
        </div>

        {/* Challenge Arena */}
        <InteractiveChallengeArena />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Loop Practice & Board Challenges"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Practice Lab Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 8 Note (.txt)"
          downloadFileName="003_004_topic8_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Well done on completing Module 003_004! You are now fully equipped to trace loops, predict outputs, write while-loops with Scanner, and prevent infinite loop traps in your CBSE Class XII IT (802) board exam. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic8;
