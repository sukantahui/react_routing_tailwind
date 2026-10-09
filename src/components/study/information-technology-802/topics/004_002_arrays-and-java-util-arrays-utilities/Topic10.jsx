import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  BookOpen, ArrowRight, ShieldCheck, Terminal, Code, 
  Zap, Layers, RefreshCw, Trophy, Target
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

const ArrayChallengeArena = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  const challenges = [
    {
      id: 0,
      title: "Challenge 1: Array Index Difference",
      code: `int[] arr = { 15, 30, 45, 60, 75 };\nSystem.out.println(arr[arr.length - 1] - arr[1]);`,
      options: ["45", "60", "30", "75"],
      correct: 0,
      explanation: "arr.length is 5 -> arr[4] is 75. arr[1] is 30. 75 - 30 = 45."
    },
    {
      id: 1,
      title: "Challenge 2: Unfound Binary Search Key",
      code: `int[] nums = { 5, 15, 25, 35 }; // Sorted\nint pos = Arrays.binarySearch(nums, 20);\nSystem.out.println(pos);`,
      options: ["-3", "-2", "2", "-1"],
      correct: 0,
      explanation: "20 is between 15 (idx 1) and 25 (idx 2). Insertion point = 2. Return: -(2) - 1 = -3."
    },
    {
      id: 2,
      title: "Challenge 3: Sort Order Guarantee",
      code: `int[] val = { 90, 10, 50 };\nArrays.sort(val);\nSystem.out.println(val[0] + " " + val[2]);`,
      options: ["10 90", "90 10", "10 50", "50 90"],
      correct: 0,
      explanation: "After sorting, val is [10, 50, 90]. val[0]=10, val[2]=90. Output: '10 90'."
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
            <Trophy className="w-3.5 h-3.5" /> Interactive Array Assessment Arena
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            CBSE IT (802) Array & Utilities Challenge
          </h2>
        </div>
        
        {/* Tabs */}
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
            Select the correct result:
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

        {showResults[selectedChallenge] && (
          <div className={`p-4 rounded-xl border text-xs space-y-1 ${
            userAnswers[selectedChallenge] === curr.correct
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}>
            <strong className="block font-bold">
              {userAnswers[selectedChallenge] === curr.correct ? "🎉 Correct Answer!" : "💡 Solution Walkthrough:"}
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

const Topic10 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_002 • Topic 10
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Practice your Skill here: Arrays & java.util.Arrays Utilities
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Test your mastery of 1D array indexing calculations, sorting operations, and binary search insertion formulas.
          </p>
        </div>

        {/* Challenge Arena */}
        <ArrayChallengeArena />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Array Practice Challenges"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Array Practice Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 10 Note (.txt)"
          downloadFileName="004_002_topic10_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Excellent job completing Module 004_002! You now know how to manipulate 1D arrays, perform arithmetic on array elements, sort arrays with Arrays.sort(), and calculate binary search return values with confidence. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic10;
