import React, { useState } from 'react';
import { 
  Download, FileText, CheckSquare, Sparkles, BookOpen, 
  Layers, ArrowRight, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, ShieldCheck, FileCode, Check, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import masterSummaryText from "./topic7_files/002_003_web_dev_master_summary.txt?raw";

// Download Center Component with Client-Side Blob Downloader
const DownloadCenter = () => {
  const [downloadingId, setDownloadingId] = useState(null);

  const downloadFile = (filename, content, id) => {
    setDownloadingId(id);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadingId(null);
    }, 1000);
  };

  const downloads = [
    {
      id: "master",
      title: "Module 002_003 Master Revision & Exam Summary",
      desc: "Complete comprehensive synthesis covering all 4 stages, deliverables, 3-tier architecture, JDBC PreparedStatement, 4 maintenance types, and rapid-fire revision Q&As.",
      filename: "002_003_web_dev_master_summary.txt",
      content: masterSummaryText,
      size: "8.4 KB",
      badge: "Master Document",
      color: "border-purple-500/40 bg-purple-950/20 text-purple-300"
    },
    {
      id: "topic7_note",
      title: "Topic 7 Printable Study Notes & Checklist",
      desc: "Download the plain-text printable notes, exam tips, and 10-point mastery checklist for this topic.",
      filename: "topic7_web_dev_notes.txt",
      content: noteText,
      size: "4.2 KB",
      badge: "Topic Note",
      color: "border-sky-500/40 bg-sky-950/20 text-sky-300"
    }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Download className="w-3.5 h-3.5" /> Resource Download Hub
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Downloadable Study Documents & Master Revision Files</h3>
          <p className="text-sm text-slate-400">One-click downloads for offline study, classroom distribution, and CBSE Class 12 board exam revision.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {downloads.map((d) => (
          <div key={d.id} className={`p-5 rounded-xl border flex flex-col justify-between ${d.color}`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  {d.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">{d.size}</span>
              </div>
              <h4 className="font-bold text-white text-base mb-1">{d.title}</h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">{d.desc}</p>
            </div>

            <button
              onClick={() => downloadFile(d.filename, d.content, d.id)}
              disabled={downloadingId === d.id}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-xs font-bold text-white border border-slate-700 hover:border-slate-500 flex items-center justify-center gap-2 transition-all shadow"
            >
              {downloadingId === d.id ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" /> Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-emerald-400" /> Download {d.filename}
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Interactive 10-Point Pre-Board Exam Checklist
const ExamChecklist = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const checklist = [
    "I can list and explain the 4 sequential stages of web application development in exact order.",
    "I understand that Stage 1 answers 'WHAT' the system must do, and Stage 2 answers 'HOW' it operates and looks.",
    "I know that the Software Requirements Specification (SRS) is the primary deliverable of Stage 1.",
    "I can describe the 3-Tier Architecture (Presentation Tier, Application Tier, Data Tier) with example technologies.",
    "I understand database normalization (1NF, 2NF, 3NF) and the roles of Primary and Foreign Keys.",
    "I know why PreparedStatement with parameter placeholders (?) is mandatory in JDBC to prevent SQL Injection.",
    "I know that executeUpdate() is for INSERT/UPDATE/DELETE and executeQuery() is for SELECT returning a ResultSet.",
    "I can distinguish Unit Testing, Integration Testing, System Testing, Regression Testing, and User Acceptance Testing (UAT).",
    "I can define the 4 types of software maintenance: Corrective, Adaptive, Perfective, and Preventive.",
    "I can analyze real-world case study prompts and accurately identify the exact development phase and deliverable."
  ];

  const toggleCheck = (idx) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <CheckSquare className="w-3.5 h-3.5" /> Exam Readiness Checklist
          </span>
          <h3 className="text-xl font-bold text-white mt-2">10-Point Pre-Board Exam Mastery Checklist</h3>
          <p className="text-sm text-slate-400">Click each concept once you feel 100% confident in solving board exam questions on it.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400">Progress</div>
            <div className="text-lg font-bold text-amber-400">{progressPercent}%</div>
          </div>
          <div className="w-24 h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {checklist.map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                isChecked
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                isChecked ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-700 bg-slate-900'
              }`}>
                {isChecked && <Check className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs sm:text-sm font-medium">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Topic7 Component
export default function Topic7() {
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
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span>Segment 2: Operating Web-Based Applications</span>
            <span>/</span>
            <span>Module: Four Stages of Web App Dev</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Downloadable Documents & Master Revision Hub
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-3xl">
            Access master revision summaries, printable study documents, and a 10-point pre-board checklist 
            consolidating all four stages of web application development.
          </p>
        </div>

        {/* Download Center */}
        <DownloadCenter />

        {/* Interactive 10-Point Pre-Board Exam Checklist */}
        <ExamChecklist />

        {/* Interactive MCQ Practice Section */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <CheckSquare className="w-3.5 h-3.5" /> Self-Assessment Challenge
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">Topic 7 Mastery Quiz (25 Synthesis MCQs)</h3>
              <p className="text-sm text-slate-400">Test your comprehensive understanding across all topics and stages of module 002_003.</p>
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
                        btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200 font-semibold ring-1 ring-emerald-500";
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
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25'
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
          title="Frequently Asked Questions: Downloadable Resources & Revision"
          faqs={[
            {
              question: "How can I download the Master Summary file for offline study?",
              answer: "Click the 'Download 002_003_web_dev_master_summary.txt' button in the Resource Download Hub above. It generates a plain-text file on your device immediately."
            },
            {
              question: "What is the recommended pre-board study sequence for module 002_003?",
              answer: "First review the 4 stages (Topics 0-4), practice maintenance classification (Topic 5), test scenario drills (Topic 6), complete the 10-point checklist (Topic 7), and take the timed exam simulator in Topic 8."
            },
            {
              question: "Are the questions in this hub aligned with the latest CBSE Class 12 IT 802 sample papers?",
              answer: "Yes, all questions, competency scenarios, and answer keys are strictly aligned with CBSE Class 12 IT 802 syllabus and real school examination patterns."
            }
          ]}
        />

        {/* Printable Note Section */}
        <PlainTextPrint 
          title="CBSE Class 12 IT 802: Topic 7 - Downloadable Documents Notes"
          content={noteText}
        />

        {/* Teacher Sukanta Hui note card */}
        <Teacher 
          topicName="Downloadable Documents & Master Revision Hub"
          unitName="Four Stages of Web Application Development"
        />

      </div>
    </div>
  );
}
