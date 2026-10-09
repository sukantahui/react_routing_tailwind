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

const StringChallengeArena = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  const challenges = [
    {
      id: 0,
      title: "Challenge 1: Substring Extraction",
      code: `String str = "Computer Science";\nSystem.out.println(str.substring(0, 8) + " Application");`,
      options: ["Computer Application", "Compute Application", "Computers Application", "Computer Science Application"],
      correct: 0,
      explanation: "str.substring(0, 8) extracts indices 0 to 7 -> 'Computer'. Concatenating ' Application' gives 'Computer Application'."
    },
    {
      id: 1,
      title: "Challenge 2: Case-Insensitive Equality",
      code: `String s1 = "IT 802";\nString s2 = "it 802";\nSystem.out.println(s1.equalsIgnoreCase(s2));`,
      options: ["true", "false", "0", "-1"],
      correct: 0,
      explanation: "equalsIgnoreCase() ignores capital vs small letter casing, returning true."
    },
    {
      id: 2,
      title: "Challenge 3: Word Replacement & Immutability",
      code: `String s = "Good Morning";\ns.replace("Morning", "Evening");\nSystem.out.println(s);`,
      options: ["Good Morning", "Good Evening", "Morning", "Evening"],
      correct: 0,
      explanation: "Because String is immutable and the result of s.replace(...) was not assigned back to s, variable s still points to 'Good Morning'."
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
            <Trophy className="w-3.5 h-3.5" /> Interactive Assessment Arena
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            CBSE IT (802) String Method Mastery Challenges
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
            <Sparkles className="w-3.5 h-3.5" /> Module 004_003 • Topic 10
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Practice your Skill here: String Class Methods & Text Manipulation
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Test your understanding of String immutability, substring slicing, text replacement, and equality checks with authentic board examination problem sets.
          </p>
        </div>

        {/* Challenge Arena */}
        <StringChallengeArena />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • String Practice Challenges"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – String Practice Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 10 Note (.txt)"
          downloadFileName="004_003_topic10_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Well done on completing Module 004_003! You are now fully prepared to solve any String manipulation, concatenation, replacement, or substring question in your CBSE Class XII IT (802) board exam. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic10;
