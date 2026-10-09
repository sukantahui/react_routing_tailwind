import React, { useState } from 'react';
import { 
  Trophy, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, Terminal, 
  Code, Zap, Layers, RefreshCw, Target, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

const WilChallengeArena = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  const challenges = [
    {
      id: 0,
      title: "Challenge 1: Project Definition & Distinctions",
      question: "Which of the following scenarios describes a PROJECT rather than routine operations?",
      options: [
        "Developing a new Java Swing Student Attendance & Fine Management system within a 3-month timeline",
        "Daily routine backup of the school database server to an external hard disk every evening",
        "Resetting forgotten email passwords for students at the IT helpdesk",
        "Weekly cleaning of computer lab keyboards with compressed air"
      ],
      correct: 0,
      explanation: "Developing a new system within 3 months has a clear beginning and end, finite resources, and creates a unique product (project). Routine daily/weekly tasks are ongoing operations."
    },
    {
      id: 1,
      title: "Challenge 2: SDLC Phase Identification",
      question: "During which SDLC phase does a student developer draw Entity-Relationship (ER) Diagrams and define Primary and Foreign keys?",
      options: [
        "Design Phase",
        "Conception Phase",
        "Implementation Phase",
        "Deployment Phase"
      ],
      correct: 0,
      explanation: "ER modeling, relational database schema architecture, and UI wireframing occur during the Design Phase."
    },
    {
      id: 2,
      title: "Challenge 3: Triple Constraint & Scope Creep",
      question: "What is the consequence of adding new feature requirements to a project without extending the deadline or adding resources?",
      options: [
        "Project risk increases, team burnout occurs, and final software quality is compromised (Scope Creep)",
        "The software automatically becomes 100% bug-free",
        "The project duration is automatically halved",
        "The computer compiler runs twice as fast"
      ],
      correct: 0,
      explanation: "Adding scope without adjusting time or budget is classic Scope Creep, resulting in missed deadlines and degraded software quality."
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
            Work-Integrated Learning &amp; Project Management Skill Arena
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

      {/* Question Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider block">
            {curr.title}
          </span>
          <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
            {curr.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {curr.options.map((opt, oIdx) => {
            const isSelected = userAnswers[selectedChallenge] === oIdx;
            const isAnswered = showResults[selectedChallenge];
            const isCorrect = oIdx === curr.correct;

            let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80';
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
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {showResults[selectedChallenge] && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
            <strong className="text-amber-400 font-bold block">Explanation:</strong>
            <p className="text-slate-300 leading-relaxed">{curr.explanation}</p>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 005_001 • Topic 8
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Practice Your Skill Here
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Test your understanding of Work-Integrated Learning (WIL), project definitions, characteristics, SDLC phases, and school capstone architectures through interactive multiple-choice challenges.
          </p>
        </div>

        {/* Challenge Arena */}
        <WilChallengeArena />

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="Congratulations! You have completed the entire CBSE Class XII Information Technology (Code 802) roadmap curriculum — covering RDBMS & MySQL, Operating Web Applications, Java Core & Advanced Programming, and Work-Integrated Learning. You are now fully prepared to achieve top marks in both theory and practical board examinations!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • WIL & Project Management Skill Arena"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic8;
