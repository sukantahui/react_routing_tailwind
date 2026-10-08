import React, { useState, useEffect } from 'react';
import { 
  Award, Clock, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, Layers, ArrowRight, 
  RotateCcw, Bookmark, ShieldCheck, FileText, CheckSquare, 
  ChevronRight, ChevronLeft, Flag, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

// Interactive Timed Exam Simulator (30 Questions)
const TimedExamSimulator = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins (1800 seconds)
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let timer = null;
    if (timerActive && !isSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitted && timerActive) {
      setIsSubmitted(true);
    }
    return () => clearInterval(timer);
  }, [timerActive, isSubmitted, timeLeft]);

  const startExam = () => {
    setTimerActive(true);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setFlagged({});
    setTimeLeft(1800);
    setCurrentIdx(0);
  };

  const handleSelectOption = (qId, optIdx) => {
    if (isSubmitted) return;
    if (!timerActive) setTimerActive(true);
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optIdx
    }));
  };

  const toggleFlag = (idx) => {
    setFlagged(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const curQ = questions[currentIdx];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Award className="w-3.5 h-3.5" /> CBSE Class 12 IT 802 Grand Exam Simulator
          </span>
          <h3 className="text-xl font-bold text-white mt-2">30-Minute Master Exam Simulator</h3>
          <p className="text-sm text-slate-400">30 Timed MCQs covering all topics of Four Stages of Web Application Development.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 font-mono text-sm">
            <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
            <span className={timeLeft < 300 ? 'text-rose-400 font-bold' : 'text-slate-200 font-bold'}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {!timerActive && !isSubmitted && (
            <button
              onClick={startExam}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all"
            >
              Start Exam
            </button>
          )}

          {timerActive && !isSubmitted && (
            <button
              onClick={() => setIsSubmitted(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow transition-all"
            >
              Submit Exam
            </button>
          )}

          {isSubmitted && (
            <button
              onClick={startExam}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake
            </button>
          )}
        </div>
      </div>

      {/* Result summary card when submitted */}
      {isSubmitted && (
        <div className="mb-8 p-6 rounded-2xl bg-slate-950 border border-amber-500/40 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-extrabold text-white">Examination Result</h4>
          <div className="flex justify-center items-center gap-6">
            <div>
              <div className="text-xs text-slate-400 font-medium">Final Score</div>
              <div className="text-3xl font-extrabold text-amber-400">{score} / {questions.length}</div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Percentage</div>
              <div className="text-3xl font-extrabold text-emerald-400">{percentage}%</div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Status</div>
              <div className={`text-xl font-extrabold ${percentage >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {percentage >= 75 ? 'PASSED (Distinction)' : 'REVIEW NEEDED'}
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {percentage >= 75 
              ? 'Outstanding performance! You are fully prepared to secure maximum marks in the CBSE Class XII board examination.' 
              : 'Revise the four stages and practice the subjective model answers below to strengthen your understanding.'}
          </p>
        </div>
      )}

      {/* Question Palette (1 to 30) */}
      <div className="mb-6">
        <div className="text-xs text-slate-400 mb-2 font-medium">Question Navigation Palette (1-30):</div>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isFlagged = flagged[idx];
            const isCurrent = currentIdx === idx;

            let btnColor = "bg-slate-950 border-slate-800 text-slate-400";
            if (isSubmitted) {
              if (selectedAnswers[q.id] === q.correctAnswer) {
                btnColor = "bg-emerald-950 border-emerald-500 text-emerald-300 font-bold";
              } else {
                btnColor = "bg-rose-950 border-rose-500 text-rose-300 font-bold";
              }
            } else {
              if (isCurrent) btnColor = "ring-2 ring-amber-400 bg-amber-950/40 text-amber-300 border-amber-500";
              else if (isFlagged) btnColor = "bg-purple-950 border-purple-500 text-purple-300";
              else if (isAnswered) btnColor = "bg-sky-950 border-sky-500 text-sky-300";
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`w-7 h-7 rounded-lg border text-xs font-mono transition-all flex items-center justify-center ${btnColor}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Box */}
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono text-xs font-bold">
              Question {currentIdx + 1} of {questions.length}
            </span>
            {flagged[currentIdx] && (
              <span className="text-xs text-purple-400 flex items-center gap-1 font-medium bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/30">
                <Flag className="w-3 h-3" /> Flagged for Review
              </span>
            )}
          </div>

          <button
            onClick={() => toggleFlag(currentIdx)}
            className={`text-xs flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
              flagged[currentIdx]
                ? 'border-purple-500 bg-purple-950 text-purple-300'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3 h-3" /> {flagged[currentIdx] ? 'Unflag' : 'Flag for Review'}
          </button>
        </div>

        <h4 className="text-base sm:text-lg font-semibold text-white mb-6">
          {curQ.question}
        </h4>

        {/* 4 Choices */}
        <div className="space-y-3 mb-6">
          {curQ.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[curQ.id] === optIdx;
            let btnStyle = "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900";

            if (isSubmitted) {
              if (optIdx === curQ.correctAnswer) {
                btnStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold";
              } else if (isSelected) {
                btnStyle = "bg-rose-950/50 border-rose-500 text-rose-200 font-bold";
              }
            } else if (isSelected) {
              btnStyle = "bg-amber-950/40 border-amber-500 text-amber-200 font-semibold ring-1 ring-amber-500";
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(curQ.id, optIdx)}
                className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {isSubmitted && optIdx === curQ.correctAnswer && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {isSubmitted && isSelected && optIdx !== curQ.correctAnswer && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation when submitted */}
        {isSubmitted && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 animate-fadeIn">
            <div className="text-emerald-400 font-semibold">Model Answer & Explanation:</div>
            <p className="text-slate-300">{curQ.explanation}</p>
            <p className="text-slate-400 italic font-bengali">{curQ.explanationBengali}</p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentIdx === 0
                ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <button
            onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIdx === questions.length - 1}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentIdx === questions.length - 1
                ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Solved Subjective Model Answer Key Workbench
const SubjectiveModelAnswers = () => {
  const [activeMarksTab, setActiveMarksTab] = useState('2marks'); // '2marks' | '3marks' | '5marks'

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <FileText className="w-3.5 h-3.5" /> CBSE Board Exam Subjective Bank
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Solved Subjective Model Answers (2, 3 & 5 Marks)</h3>
          <p className="text-sm text-slate-400">Step-by-step model solutions curated by Sukanta Hui adhering to official CBSE marking schemes.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveMarksTab('2marks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMarksTab === '2marks' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2-Mark Questions
          </button>
          <button
            onClick={() => setActiveMarksTab('3marks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMarksTab === '3marks' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3-Mark Questions
          </button>
          <button
            onClick={() => setActiveMarksTab('5marks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMarksTab === '5marks' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            5-Mark Case Studies
          </button>
        </div>
      </div>

      {/* 2-Mark Solutions */}
      {activeMarksTab === '2marks' && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400">Q1. What is the role of the SRS document in software development?</span>
              <span className="text-[10px] font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded">[2 Marks]</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Model Answer:</strong> The Software Requirements Specification (SRS) is the contractual document produced in Stage 1. 
              It formally compiles all functional features, operational constraints, and system boundaries agreed upon between client and developers. 
              It serves as the definitive baseline against which design blueprints are drafted and final QA test cases are verified.
            </p>
            <div className="text-[11px] text-slate-500 font-mono border-t border-slate-900 pt-1">
              Marking Scheme: 1 Mark for definition/features + 1 Mark for baseline role in downstream stages.
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400">Q2. Why is PreparedStatement preferred over Statement in JDBC?</span>
              <span className="text-[10px] font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded">[2 Marks]</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Model Answer:</strong>
              <br />1. <strong>Security:</strong> It parameterizes inputs with <code className="text-amber-300 font-mono">?</code> placeholders, preventing SQL Injection exploits.
              <br />2. <strong>Performance:</strong> The database engine pre-compiles and caches the execution plan, resulting in faster repeated query executions.
            </p>
            <div className="text-[11px] text-slate-500 font-mono border-t border-slate-900 pt-1">
              Marking Scheme: 1 Mark for SQL injection prevention + 1 Mark for pre-compiled performance.
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400">Q3. Differentiate between `executeUpdate()` and `executeQuery()`.</span>
              <span className="text-[10px] font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded">[2 Marks]</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Model Answer:</strong>
              <br />• <code className="text-emerald-300 font-mono">executeUpdate():</code> Executes DML/DDL commands (`INSERT`, `UPDATE`, `DELETE`) and returns an <code className="text-purple-300 font-mono">int</code> representing affected rows count.
              <br />• <code className="text-sky-300 font-mono">executeQuery():</code> Executes `SELECT` queries and returns a <code className="text-purple-300 font-mono">ResultSet</code> object containing retrieved data rows.
            </p>
            <div className="text-[11px] text-slate-500 font-mono border-t border-slate-900 pt-1">
              Marking Scheme: 1 Mark for executeUpdate + 1 Mark for executeQuery.
            </div>
          </div>
        </div>
      )}

      {/* 3-Mark Solutions */}
      {activeMarksTab === '3marks' && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">Q4. Explain the 3-Tier Client-Server Architecture with example technologies.</span>
              <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded">[3 Marks]</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Model Answer:</strong>
              <br />1. <strong>Presentation Tier (Front-End):</strong> Runs in web browsers using HTML5, CSS3, JavaScript, and React. Captures clicks and renders visual UI.
              <br />2. <strong>Application / Logic Tier (Middle-Tier):</strong> Server software (Java Servlets, Spring Boot, Node.js) that executes business formulas, user authentication, and token verification.
              <br />3. <strong>Data Tier (Back-End Database):</strong> Relational database (MySQL, Oracle) that stores, indexes, and retrieves normalized data tables securely.
            </p>
            <div className="text-[11px] text-slate-500 font-mono border-t border-slate-900 pt-1">
              Marking Scheme: 1 Mark for each tier with proper role and technology examples.
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">Q5. Define the 4 types of software maintenance with real-world examples.</span>
              <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded">[3 Marks]</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Model Answer:</strong>
              <br />• <strong>Corrective Maintenance:</strong> Repairing bugs/crashes reported by live users (e.g. fixing bill late fee calculation).
              <br />• <strong>Adaptive Maintenance:</strong> Adapting to external legal/tax/OS changes (e.g. updating Indian GST slab to 12%).
              <br />• <strong>Perfective Maintenance:</strong> Enhancing speed or adding new requested features (e.g. adding Dark Mode or PDF exports).
              <br />• <strong>Preventive Maintenance:</strong> Proactively refactoring code and indexes to prevent future crashes (e.g. upgrading MySQL to 8.0).
            </p>
            <div className="text-[11px] text-slate-500 font-mono border-t border-slate-900 pt-1">
              Marking Scheme: 0.75 Marks for each maintenance type with example.
            </div>
          </div>
        </div>
      )}

      {/* 5-Mark Case Studies */}
      {activeMarksTab === '5marks' && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">
                Q6. Case Study: Execute the Web Application Development Lifecycle for an Online Electricity Billing System in Barrackpore.
              </span>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">[5 Marks]</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              <p>• <strong>Stage 1 (Requirement Definition):</strong> Interview utility officers and consumers to formulate feature lists (bill inquiry, UPI payments), perform technical/economic feasibility studies, and produce the signed Software Requirements Specification (SRS).</p>
              <p>• <strong>Stage 2 (Design Phase):</strong> Architect 3-tier structure (React -&gt; Java Servlets -&gt; MySQL), normalize relational tables into 3NF (`CONSUMERS`, `BILLS`, `TRANSACTIONS`), and design Figma UI wireframes.</p>
              <p>• <strong>Stage 3 (Implementation / Coding):</strong> Develop front-end HTML/JS forms, middle-tier Java Servlets with tariff logic, and JDBC `PreparedStatement` routines to insert bill records securely.</p>
              <p>• <strong>Stage 4 (Testing & QA):</strong> Run Unit tests with JUnit for tariff calculations, execute boundary tests for negative inputs (-50 kWh), run SQL injection security pen-tests, and conduct User Acceptance Testing (UAT) with real consumers.</p>
              <p>• <strong>Post-Dev (Deployment & Maintenance):</strong> Host on AWS cloud with SSL HTTPS encryption and DNS mapping. Perform Corrective, Adaptive (GST updates), Perfective (PDF exports), and Preventive maintenance.</p>
            </div>
            <div className="text-[11px] text-slate-500 font-mono border-t border-slate-900 pt-1">
              Marking Scheme: 1 Mark for each of the 4 Stages + 1 Mark for Post-Deployment Maintenance.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Topic8 Component
export default function Topic8() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header section */}
        <div className="border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <span>Segment 2: Operating Web-Based Applications</span>
            <span>/</span>
            <span>Module: Four Stages of Web App Dev</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Practice your Skill here: Exam Simulator & Subjective Answer Key
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-3xl">
            Test your comprehensive mastery with a 30-minute timed exam simulator, instant score analysis, 
            and complete CBSE board solved model subjective solutions for 2, 3, and 5 marks.
          </p>
        </div>

        {/* 30-Question Timed Exam Simulator */}
        <TimedExamSimulator />

        {/* Solved Subjective Model Answers (2, 3, 5 Marks) */}
        <SubjectiveModelAnswers />

        {/* FAQ Section */}
        <FAQTemplate 
          title="Frequently Asked Questions: Exam Simulator & Practice Hub"
          faqs={[
            {
              question: "How should I structure my 5-mark answer for the Web Application Lifecycle in board exams?",
              answer: "Dedicate 1 structured paragraph or bulleted point to each of the 4 stages (Requirement Definition, Design, Implementation, Testing) plus 1 point for Post-Deployment Maintenance, mentioning specific activities and key deliverables for each."
            },
            {
              question: "What is the passing criteria for this practice exam simulator?",
              answer: "75% (23 out of 30 questions) is considered the distinction mastery benchmark for CBSE Class XII Information Technology (Code 802)."
            },
            {
              question: "Can I retake the timed exam simulator multiple times?",
              answer: "Yes, you can click the 'Retake' or 'Start Exam' button at any time to re-test your knowledge and improve your accuracy."
            }
          ]}
        />

        {/* Printable Note Section */}
        <PlainTextPrint 
          title="CBSE Class 12 IT 802: Topic 8 - Exam Simulator & Subjective Solutions"
          content={noteText}
        />

        {/* Teacher Sukanta Hui note card */}
        <Teacher 
          topicName="Practice Exam Simulator & Subjective Model Solutions"
          unitName="Four Stages of Web Application Development"
        />

      </div>
    </div>
  );
}
