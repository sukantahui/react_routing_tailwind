import React, { useState } from 'react';
import { 
  Rocket, RefreshCw, ShieldAlert, Cpu, Wrench, 
  Layers, ArrowRight, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ShieldCheck, Play, 
  CheckSquare, MessageSquare, Globe, Lock, Terminal
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

// Interactive Maintenance Type Classifier & Hotfix Simulator
const MaintenanceClassifierSimulator = () => {
  const scenarios = [
    {
      id: 1,
      scenario: "A live consumer in Barrackpore reports that the online billing system is deducting ₹10 extra late fee even when paying 2 days before the due date.",
      options: ["Corrective Maintenance", "Adaptive Maintenance", "Perfective Maintenance", "Preventive Maintenance"],
      correct: "Corrective Maintenance",
      explanation: "This is Corrective Maintenance because it diagnoses and repairs an active calculation error / defect discovered by live users after deployment.",
      actionText: "Deploying Hotfix: Fixed if (currentDate > dueDate) comparison logic in BillingServlet.java.",
      color: "border-rose-500/40 bg-rose-950/20 text-rose-300"
    },
    {
      id: 2,
      scenario: "The Indian Ministry of Finance revises the utility service GST slab from 18% to 12%. The billing calculation engine must be modified to comply with new tax laws.",
      options: ["Corrective Maintenance", "Adaptive Maintenance", "Perfective Maintenance", "Preventive Maintenance"],
      correct: "Adaptive Maintenance",
      explanation: "This is Adaptive Maintenance because the software is being modified to adapt to an external legal regulation / policy change.",
      actionText: "Updating Environment Config: SET GST_PERCENTAGE = 0.12 in billing tax calculation module.",
      color: "border-sky-500/40 bg-sky-950/20 text-sky-300"
    },
    {
      id: 3,
      scenario: "Over 500 consumers submit feedback requesting a 'Download 12-Month Electricity Statement as PDF' button and a Dark Mode UI theme.",
      options: ["Corrective Maintenance", "Adaptive Maintenance", "Perfective Maintenance", "Preventive Maintenance"],
      correct: "Perfective Maintenance",
      explanation: "This is Perfective Maintenance because it adds convenient new features, enhances usability, and improves user satisfaction based on user feedback.",
      actionText: "Deploying Version 2.1: Added PDF Generation service and Tailwind dark mode theme toggle.",
      color: "border-purple-500/40 bg-purple-950/20 text-purple-300"
    },
    {
      id: 4,
      scenario: "The Lead Database Administrator proactively optimizes MySQL table indexes and upgrades OpenSSL libraries to prevent potential future security vulnerabilities.",
      options: ["Corrective Maintenance", "Adaptive Maintenance", "Perfective Maintenance", "Preventive Maintenance"],
      correct: "Preventive Maintenance",
      explanation: "This is Preventive Maintenance because it anticipates future problems and refactors systems proactively to prevent failure before any exploit occurs.",
      actionText: "Executing DB Migration: Re-indexed `BILLS(ConsumerID, DueDate)` and patched OpenSSL to version 3.2.",
      color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300"
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSelectOption = (option) => {
    setUserChoice(option);
    const cur = scenarios[currentIdx];
    if (option === cur.correct) {
      setFeedback({
        isCorrect: true,
        text: `Correct! ${cur.explanation}`,
        action: cur.actionText
      });
    } else {
      setFeedback({
        isCorrect: false,
        text: `Incorrect. You chose '${option}'. The correct type is '${cur.correct}'. ${cur.explanation}`,
        action: null
      });
    }
  };

  const nextScenario = () => {
    setUserChoice(null);
    setFeedback(null);
    setCurrentIdx((prev) => (prev + 1) % scenarios.length);
  };

  const cur = scenarios[currentIdx];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <Wrench className="w-3.5 h-3.5" /> Maintenance Classifier Simulator
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Classify the 4 Types of Software Maintenance</h3>
          <p className="text-sm text-slate-400">Read the scenario and identify whether it requires Corrective, Adaptive, Perfective, or Preventive maintenance.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Scenario {currentIdx + 1} of {scenarios.length}</span>
          <button
            onClick={nextScenario}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all"
          >
            Next Scenario →
          </button>
        </div>
      </div>

      {/* Scenario Card */}
      <div className={`p-5 rounded-xl border mb-6 ${cur.color}`}>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Live Operational Scenario:
        </div>
        <p className="text-sm sm:text-base font-medium text-slate-100">
          "{cur.scenario}"
        </p>
      </div>

      {/* 4 Maintenance Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {cur.options.map((opt) => {
          let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900";
          if (userChoice) {
            if (opt === cur.correct) {
              btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200 font-bold ring-1 ring-emerald-500";
            } else if (userChoice === opt) {
              btnStyle = "border-rose-500 bg-rose-950/50 text-rose-200 font-bold";
            }
          }

          return (
            <button
              key={opt}
              onClick={() => !userChoice && handleSelectOption(opt)}
              disabled={!!userChoice}
              className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span>{opt}</span>
              {userChoice && opt === cur.correct && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
              {userChoice === opt && opt !== cur.correct && (
                <XCircle className="w-4 h-4 text-rose-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Hotfix Deployment Console */}
      {feedback && (
        <div className={`p-4 rounded-xl border text-xs font-mono space-y-2 animate-fadeIn ${
          feedback.isCorrect ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-rose-950/30 border-rose-500/40'
        }`}>
          <div className="flex items-center gap-2 font-bold">
            {feedback.isCorrect ? (
              <span className="text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Classification Confirmed</span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Classification Review</span>
            )}
          </div>
          <p className="text-slate-300 font-sans text-xs">{feedback.text}</p>
          {feedback.action && (
            <div className="mt-2 p-2.5 bg-slate-950 rounded border border-slate-800 text-emerald-300 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{feedback.action}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main Topic5 Component
export default function Topic5() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header section */}
        <div className="border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
            <span>Segment 2: Operating Web-Based Applications</span>
            <span>/</span>
            <span>Module: Four Stages of Web App Dev</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Deployment, Maintenance & User Feedback
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-3xl">
            Going live on production servers: DNS routing, SSL/TLS security, the 4 types of software maintenance 
            (Corrective, Adaptive, Perfective, Preventive), and continuous user feedback loops.
          </p>
        </div>

        {/* Interactive Maintenance Type Classifier Simulator */}
        <MaintenanceClassifierSimulator />

        {/* 4 Maintenance Types Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
              <Wrench className="w-5 h-5" />
              <h4>1. Corrective Maintenance</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Diagnosing and resolving defects, calculation errors, or system crashes reported by live users after deployment.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
              <strong className="text-rose-300">Real Example:</strong> Fixing an invoice calculation bug where late fee was applied before the due date.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
              <Globe className="w-5 h-5" />
              <h4>2. Adaptive Maintenance</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Modifying the application to maintain compatibility when external environments (OS, legal laws, browser engines) change.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
              <strong className="text-sky-300">Real Example:</strong> Updating tax computation logic to match revised Indian GST tax rate changes from 18% to 12%.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-lg">
              <Sparkles className="w-5 h-5" />
              <h4>3. Perfective Maintenance</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enhancing software performance, speed, and adding convenient new capabilities based on direct user suggestions.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
              <strong className="text-purple-300">Real Example:</strong> Introducing a "Download PDF Bill" button and Dark Theme UI based on consumer demand.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
              <ShieldCheck className="w-5 h-5" />
              <h4>4. Preventive Maintenance</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Proactively refactoring code and optimizing database structures to prevent future system failures before they happen.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
              <strong className="text-emerald-300">Real Example:</strong> Upgrading MySQL server to version 8.0 and patching OpenSSL libraries to eliminate security vulnerabilities.
            </div>
          </div>
        </div>

        {/* Interactive MCQ Practice Section */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <CheckSquare className="w-3.5 h-3.5" /> Self-Assessment Challenge
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">Topic 5 Mastery Quiz (25 MCQs)</h3>
              <p className="text-sm text-slate-400">Test your mastery of Deployment, DNS, SSL/TLS, the 4 Types of Maintenance, and Feedback Loops.</p>
            </div>

            {showResults && (
              <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Your Score</div>
                  <div className="text-xl font-extrabold text-amber-400">
                    {calculateScore()} / {questions.length}
                  </div>
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all"
                >
                  Retake
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = isAnswered && userAnswer === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-slate-300 shrink-0">
                      {qIndex + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-200">
                      {q.question}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 ml-9">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = userAnswer === optIndex;
                      let btnStyle = "border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800/80";

                      if (showResults) {
                        if (optIndex === q.correctAnswer) {
                          btnStyle = "border-emerald-500/80 bg-emerald-950/50 text-emerald-200 font-semibold";
                        } else if (isSelected) {
                          btnStyle = "border-rose-500/80 bg-rose-950/50 text-rose-200 font-semibold";
                        }
                      } else if (isSelected) {
                        btnStyle = "border-rose-500 bg-rose-950/50 text-rose-200 font-semibold ring-1 ring-rose-500";
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleOptionClick(q.id, optIndex)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showResults && optIndex === q.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                          {showResults && isSelected && optIndex !== q.correctAnswer && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-4 ml-9 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-emerald-400 font-semibold">Explanation:</div>
                      <p className="text-slate-300">{q.explanation}</p>
                      <p className="text-slate-400 italic font-bengali">{q.explanationBengali}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  Object.keys(selectedAnswers).length === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-500/25'
                }`}
              >
                Submit & Check Answers ({Object.keys(selectedAnswers).length}/{questions.length})
              </button>
            ) : (
              <button
                onClick={resetQuiz}
                className="px-8 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white transition-all"
              >
                Reset & Try Again
              </button>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <FAQTemplate 
          title="Frequently Asked Questions: Deployment & Maintenance"
          faqs={[
            {
              question: "What is the key difference between Adaptive Maintenance and Perfective Maintenance?",
              answer: "Adaptive Maintenance modifies software to adapt to unavoidable external changes (e.g., legal GST tax revisions, new browser versions, or OS updates). Perfective Maintenance enhances features, speed, or UI convenience based on user suggestions and business desires."
            },
            {
              question: "Why does post-deployment maintenance consume up to 80% of software lifecycle costs?",
              answer: "Software operates for many years in production, requiring continuous bug fixes, security patch updates, regulatory adaptations, server scaling, and new feature additions to remain relevant."
            },
            {
              question: "How does the feedback loop connect deployment back to Stage 1?",
              answer: "User ratings, support tickets, and performance analytics highlight shortcomings or new demands, which are formalized as new functional requirements in Stage 1 for subsequent software versions."
            }
          ]}
        />

        {/* Printable Note Section */}
        <PlainTextPrint 
          title="CBSE Class 12 IT 802: Topic 5 - Deployment & Maintenance Notes"
          content={noteText}
        />

        {/* Teacher Sukanta Hui note card */}
        <Teacher 
          topicName="Deployment, Maintenance & Feedback Loops"
          unitName="Four Stages of Web Application Development"
        />

      </div>
    </div>
  );
}
