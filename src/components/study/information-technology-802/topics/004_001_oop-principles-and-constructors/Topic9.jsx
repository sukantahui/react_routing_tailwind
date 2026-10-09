import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  BookOpen, ArrowRight, ShieldCheck, Terminal, Code, 
  Zap, Layers, RefreshCw, Trophy, Target
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

const OopChallengeArena = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  const challenges = [
    {
      id: 0,
      title: "Challenge 1: Constructor Tracing",
      code: `class Point {\n    int x, y;\n    Point() { x = 2; y = 3; }\n    Point(int a, int b) { x = a * 2; y = b * 3; }\n}\n// In main:\nPoint p1 = new Point();\nPoint p2 = new Point(4, 5);\nSystem.out.println(p1.x + p2.x + " " + (p1.y + p2.y));`,
      options: ["10 18", "6 8", "10 8", "2 15"],
      correct: 0,
      explanation: "p1: x=2, y=3.\np2: x=4*2=8, y=5*3=15.\np1.x + p2.x = 2 + 8 = 10.\np1.y + p2.y = 3 + 15 = 18.\nOutput: '10 18'."
    },
    {
      id: 1,
      title: "Challenge 2: Method vs Constructor Identification",
      code: `public class Test {\n    public void Test() {\n        System.out.print("Method ");\n    }\n    public Test() {\n        System.out.print("Constructor ");\n    }\n    public static void main(String[] args) {\n        Test t = new Test();\n    }\n}`,
      options: ["Constructor ", "Method ", "Method Constructor ", "Compilation error"],
      correct: 0,
      explanation: "`new Test()` calls the constructor (the one without a return type). The method `public void Test()` is not invoked, so it prints 'Constructor '."
    },
    {
      id: 2,
      title: "Challenge 3: Encapsulation Access Check",
      code: `class Student {\n    private int marks = 90;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student();\n        System.out.println(s.marks);\n    }\n}`,
      options: [
        "Compilation error: marks has private access in Student",
        "Prints 90",
        "NullPointerException",
        "Prints 0"
      ],
      correct: 0,
      explanation: "Private fields cannot be accessed directly across class boundaries. Accessing `s.marks` causes a compile error."
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
            OOP Principles & Constructor Mastery Challenges
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

const Topic9 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_001 • Topic 9
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Practice your Skill here: OOP & Constructors
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Test your understanding with authentic CBSE examination constructor questions, void traps, and encapsulation problem sets.
          </p>
        </div>

        {/* Challenge Arena */}
        <OopChallengeArena />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • OOP Practice Challenges"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – OOP Practice Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 9 Note (.txt)"
          downloadFileName="004_001_topic9_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Congratulations on mastering OOP principles and constructors! You now know how to design classes, prevent return type traps, and write clean overloaded constructors. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic9;
