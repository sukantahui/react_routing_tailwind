import React, { useState } from 'react';
import { 
  Compass, Search, Building2, School, Hospital, 
  Layers, ArrowRight, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ShieldCheck, Play, 
  CheckSquare, FileText, Layout, Code, CheckCircle, Rocket
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

// Interactive Case Study Phase Detective Simulator
const PhaseDetectiveGame = () => {
  const drills = [
    {
      id: 1,
      domain: "Electric Utility (Barrackpore)",
      icon: Building2,
      scenario: "Engineers meet with utility accountants to determine the exact tariff calculation formulas (Domestic vs Commercial) and compile project limitations.",
      options: ["Stage 1: Requirement Definition", "Stage 2: Design Phase", "Stage 3: Implementation / Coding", "Stage 4: Testing & QA"],
      correct: "Stage 1: Requirement Definition",
      keywords: ["meet with accountants", "determine formulas", "compile project limitations"],
      rationale: "Gathering stakeholder rules and scoping project boundaries is the hallmark of Stage 1 (Requirement Definition / Analysis)."
    },
    {
      id: 2,
      domain: "School Management Portal",
      icon: School,
      scenario: "The database team normalizes tables into 3NF and drafts Figma UI wireframes showing the student mark-sheet download layout.",
      options: ["Stage 1: Requirement Definition", "Stage 2: Design Phase", "Stage 3: Implementation / Coding", "Stage 4: Testing & QA"],
      correct: "Stage 2: Design Phase",
      keywords: ["normalizes tables into 3NF", "drafts Figma UI wireframes"],
      rationale: "Database normalization and UI wireframing represent low-level architectural blueprints created in Stage 2 (Design Phase)."
    },
    {
      id: 3,
      domain: "Hospital OPD Booking (Kolkata)",
      icon: Hospital,
      scenario: "A software developer writes Java Servlet code and JDBC PreparedStatement methods to book appointment slots securely in MySQL.",
      options: ["Stage 1: Requirement Definition", "Stage 2: Design Phase", "Stage 3: Implementation / Coding", "Stage 4: Testing & QA"],
      correct: "Stage 3: Implementation / Coding",
      keywords: ["writes Java Servlet code", "JDBC PreparedStatement", "book appointment slots"],
      rationale: "Writing Java and SQL code to implement features is the core activity of Stage 3 (Implementation / Coding Phase)."
    },
    {
      id: 4,
      domain: "Railway Reservation System",
      icon: Compass,
      scenario: "QA testers simulate 20,000 concurrent user logins to observe server load latency and check if the database locks up.",
      options: ["Stage 1: Requirement Definition", "Stage 2: Design Phase", "Stage 3: Implementation / Coding", "Stage 4: Testing & QA"],
      correct: "Stage 4: Testing & QA",
      keywords: ["simulate 20,000 concurrent logins", "observe server load latency", "check database locks"],
      rationale: "Load and stress testing to evaluate performance limits and stability is part of Stage 4 (Testing & Quality Assurance)."
    }
  ];

  const [activeDrill, setActiveDrill] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [drillScore, setDrillScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleChoose = (opt) => {
    setSelectedChoice(opt);
    if (opt === drills[activeDrill].correct) {
      setDrillScore(prev => prev + 1);
    }
  };

  const nextDrill = () => {
    if (activeDrill + 1 < drills.length) {
      setActiveDrill(prev => prev + 1);
      setSelectedChoice(null);
    } else {
      setCompleted(true);
    }
  };

  const resetDrill = () => {
    setActiveDrill(0);
    setSelectedChoice(null);
    setDrillScore(0);
    setCompleted(false);
  };

  const curDrill = drills[activeDrill];
  const Icon = curDrill.icon;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            <Search className="w-3.5 h-3.5" /> Board Exam Scenario Detective
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Identify the Development Stage from Real-World Scenarios</h3>
          <p className="text-sm text-slate-400">Analyze the real-world prompt, spot key trigger words, and classify the correct WADLC stage.</p>
        </div>

        {!completed && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Case {activeDrill + 1} of {drills.length}</span>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-950 px-2.5 py-1 rounded border border-indigo-500/30">
              Score: {drillScore}
            </span>
          </div>
        )}
      </div>

      {!completed ? (
        <div>
          {/* Scenario prompt card */}
          <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/40 mb-6">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Icon className="w-4 h-4" /> {curDrill.domain} Case Study
            </div>
            <p className="text-base text-slate-100 font-medium leading-relaxed">
              "{curDrill.scenario}"
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {curDrill.options.map((opt) => {
              let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800";
              if (selectedChoice) {
                if (opt === curDrill.correct) {
                  btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200 font-bold ring-1 ring-emerald-500";
                } else if (selectedChoice === opt) {
                  btnStyle = "border-rose-500 bg-rose-950/50 text-rose-200 font-bold";
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => !selectedChoice && handleChoose(opt)}
                  disabled={!!selectedChoice}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedChoice && opt === curDrill.correct && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                  {selectedChoice === opt && opt !== curDrill.correct && (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Keyword Reveal */}
          {selectedChoice && (
            <div className={`p-4 rounded-xl border text-xs font-mono space-y-2 mb-4 animate-fadeIn ${
              selectedChoice === curDrill.correct ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-rose-950/30 border-rose-500/40'
            }`}>
              <div className="flex items-center gap-2 font-bold font-sans">
                {selectedChoice === curDrill.correct ? (
                  <span className="text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Correct Analysis!</span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Incorrect Selection</span>
                )}
              </div>
              <p className="text-slate-300 font-sans text-xs">{curDrill.rationale}</p>
              
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 flex-wrap text-[11px]">
                <span className="text-indigo-300 font-sans font-semibold">Trigger Keywords in Prompt:</span>
                {curDrill.keywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-indigo-500/30 text-amber-300">
                    "{kw}"
                  </span>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={nextDrill}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-xs transition-all shadow"
                >
                  Next Scenario →
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white">Scenario Detective Drill Completed!</h4>
          <p className="text-sm text-slate-300">
            You scored <strong className="text-emerald-400 font-extrabold">{drillScore} / {drills.length}</strong> in real-world scenario classification.
          </p>
          <button
            onClick={resetDrill}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-all"
          >
            Replay Case Study Drills
          </button>
        </div>
      )}
    </div>
  );
};

// Main Topic6 Component
export default function Topic6() {
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
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
            <span>Segment 2: Operating Web-Based Applications</span>
            <span>/</span>
            <span>Module: Four Stages of Web App Dev</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Identifying Development Phases from Real-World Scenarios
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-3xl">
            Master the art of mapping descriptive industry prompts, case studies, and workplace scenarios 
            to their exact Web Application Development Lifecycle phases.
          </p>
        </div>

        {/* Interactive Phase Detective Game */}
        <PhaseDetectiveGame />

        {/* Keyword Decoder Table */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <Search className="w-5 h-5" />
            <h4>CBSE Quick Keyword Decoder & Phase Identification Matrix</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl">
              <thead className="bg-slate-950 text-slate-300 font-mono">
                <tr>
                  <th className="p-3 border-b border-slate-800">Development Stage</th>
                  <th className="p-3 border-b border-slate-800">Trigger Keywords in Exam Question</th>
                  <th className="p-3 border-b border-slate-800">Primary Deliverable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-sky-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Stage 1: Requirement Definition
                  </td>
                  <td className="p-3 text-slate-400">Client interviews, survey questionnaires, feasibility study, project scope, defining limitations</td>
                  <td className="p-3 font-mono text-amber-300">Software Requirements Specification (SRS)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-purple-400 flex items-center gap-1.5">
                    <Layout className="w-3.5 h-3.5" /> Stage 2: Design Phase
                  </td>
                  <td className="p-3 text-slate-400">ER diagrams, table normalization, UI wireframes, Figma mockups, 3-tier architecture, DFDs</td>
                  <td className="p-3 font-mono text-amber-300">Design Document Specification (DDS), ER Schemas</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-emerald-400 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" /> Stage 3: Implementation / Coding
                  </td>
                  <td className="p-3 text-slate-400">Writing HTML/CSS/JS, Java Servlets, NetBeans Swing GUI, JDBC, PreparedStatements</td>
                  <td className="p-3 font-mono text-amber-300">Executable Source Code Repository</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-amber-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Stage 4: Testing & QA
                  </td>
                  <td className="p-3 text-slate-400">Unit test (JUnit), Integration test, UAT / Beta testing, load testing (JMeter), bug discovery</td>
                  <td className="p-3 font-mono text-amber-300">Test Plan, Bug Reports, UAT Sign-off</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-rose-400 flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5" /> Deployment & Maintenance
                  </td>
                  <td className="p-3 text-slate-400">AWS Cloud hosting, DNS, SSL/TLS, fixing live bugs (Corrective), adapting to GST changes (Adaptive)</td>
                  <td className="p-3 font-mono text-amber-300">Live URL, SLA, Hotfix Patch Releases</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive MCQ Practice Section */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <CheckSquare className="w-3.5 h-3.5" /> Self-Assessment Challenge
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">Topic 6 Mastery Quiz (25 Scenario MCQs)</h3>
              <p className="text-sm text-slate-400">Test your ability to map real-world case study prompts to exact WADLC phases.</p>
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
                        btnStyle = "border-indigo-500 bg-indigo-950/50 text-indigo-200 font-semibold ring-1 ring-indigo-500";
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
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25'
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
          title="Frequently Asked Questions: Scenario & Case Study Identification"
          faqs={[
            {
              question: "How can I instantly differentiate Stage 1 from Stage 2 in board exam questions?",
              answer: "Stage 1 deals with 'WHAT' the system must do (interviews, requirements, feasibility, scope definition). Stage 2 deals with 'HOW' it will look and operate (drawing ER diagrams, UI wireframes, normalization, and architecture)."
            },
            {
              question: "Why is UAT classified under Stage 4 rather than Deployment?",
              answer: "User Acceptance Testing (UAT) is the final verification conducted by real users to validate system correctness and issue the sign-off certificate BEFORE the software is deployed to production."
            },
            {
              question: "If an exam question asks about 'writing code for JDBC PreparedStatements', which stage is it?",
              answer: "Stage 3: Implementation / Coding Phase, where developers translate design specifications into executable source code."
            }
          ]}
        />

        {/* Printable Note Section */}
        <PlainTextPrint 
          title="CBSE Class 12 IT 802: Topic 6 - Scenario-Based Phase Identification Notes"
          content={noteText}
        />

        {/* Teacher Sukanta Hui note card */}
        <Teacher 
          topicName="Scenario-Based Phase Identification & Case Studies"
          unitName="Four Stages of Web Application Development"
        />

      </div>
    </div>
  );
}
