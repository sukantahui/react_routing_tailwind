import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  FileCode,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Layers,
  Clock,
  FolderGit2,
  Zap,
  Users,
  Database,
  Eye,
  Trash2,
  Sliders,
  Check,
  Award,
  RefreshCw,
  BookOpen,
  Trophy,
  GitBranch
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic 14: Self-Assessment Quiz & Short Questions for Module 001_004
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic14() {
  const navigate = useNavigate();

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 14;
  const folder = roadmapData.folder || "git";

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  // Next module is Segment 2: Module 002_001
  const nextTopicUrl = `/${folder}/topic/002_001_branching-fundamentals-and-pointer-mechanics/0`;

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId, optionText) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionText
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <RotateCcw className="w-4 h-4" />
                <span>Git Module 001_004 &bull; Final Assessment (Topic 14 of 15)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Module 001_004 Comprehensive Mastery Assessment &amp; Viva
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Evaluate your complete understanding of git restore, commit --amend, reset modes (--soft, --mixed, --hard), git revert, and git clean.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <Award className="w-3.5 h-3.5" /> Module Mastery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Safe Undo Specialist
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: SIMPLE LANGUAGE EXPLANATION (ELI10) ─────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Explain Like I&apos;m 10: The Master Black-Belt Test
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                You have learned all 5 superpowers of Git recovery. Now it&apos;s time to earn your certification badge.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Trophy className="w-4 h-4" /> The 5 Pillars of Recovery
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Unstaged Edits:</strong> <code className="text-cyan-300 font-mono">git restore &lt;file&gt;</code></li>
                <li><strong>Staged Index:</strong> <code className="text-amber-300 font-mono">git restore --staged &lt;file&gt;</code></li>
                <li><strong>Local Commits:</strong> <code className="text-emerald-300 font-mono">git reset</code> &bull; <code className="text-emerald-300 font-mono">git commit --amend</code></li>
                <li><strong>Public Commits:</strong> <code className="text-purple-300 font-mono">git revert</code></li>
                <li><strong>Untracked Files:</strong> <code className="text-rose-300 font-mono">git clean -nd / -fd</code></li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Classroom Guidance at Barrackpore
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Congratulations on reaching the final assessment of Segment 1 Foundations! Answer these 25 viva questions to lock in your Safe Undo Specialist certification, and get ready for Segment 2: Branching &amp; Pointer Mechanics!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE SELF-ASSESSMENT QUIZ ─────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Interactive Module 004 Self-Assessment Quiz ({questions.length} Questions)
                </h2>
                <p className="text-xs text-slate-400">
                  Select your answers and click &quot;Submit &amp; View Results&quot; for instant evaluation and detailed explanations.
                </p>
              </div>
            </div>

            {showResults && (
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            )}
          </div>

          {/* Score Banner when results shown */}
          {showResults && (
            <div
              className={`p-6 rounded-2xl border ${
                percentage >= 75
                  ? "bg-emerald-950/40 border-emerald-800 text-emerald-200"
                  : "bg-amber-950/40 border-amber-800 text-amber-200"
              } space-y-2`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Trophy className="w-5 h-5" />
                  Your Score: {score} / {questions.length} ({percentage}%)
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-semibold">
                  {percentage >= 75 ? "PASSED (Certified Specialist)" : "Review Recommended (Target: 75%)"}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {percentage >= 75
                  ? "Outstanding! You have demonstrated comprehensive mastery over Git's undo engine and data safety guarantees."
                  : "Good effort! Review the detailed answer explanations below and retake the quiz to solidify your understanding."}
              </p>
            </div>
          )}

          {/* Question Cards */}
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const isSelected = selectedAnswers[q.id];
              const isCorrect = isSelected === q.answer;

              return (
                <div
                  key={q.id}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      Question {idx + 1} of {questions.length}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                      {q.level}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {q.question}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700";

                      if (showResults) {
                        if (opt === q.answer) {
                          btnStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isSelected === opt && !isCorrect) {
                          btnStyle = "bg-rose-950/50 border-rose-500 text-rose-200";
                        }
                      } else if (isSelected === opt) {
                        btnStyle = "bg-cyan-950/60 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500/50";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showResults}
                          onClick={() => handleSelectOption(q.id, opt)}
                          className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showResults && opt === q.answer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {showResults && isSelected === opt && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation when submitted */}
                  {showResults && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                      <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> Explanation:
                      </div>
                      <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                      {q.codeExample && (
                        <pre className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 mt-2 overflow-x-auto">
                          {q.codeExample}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          {!showResults && (
            <div className="text-center pt-4">
              <button
                onClick={() => setShowResults(true)}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-950 transition hover:scale-[1.02]"
              >
                Submit &amp; View Assessment Results
              </button>
            </div>
          )}
        </section>

        {/* ─── SECTION 4: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Module 001_004 Mastery Viva FAQs"
          questions={questions}
        />

        {/* ─── SECTION 5: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Comprehensive Mastery Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Module 004 Master Revision Note"
          downloadFileName="module_004_master_revision_note.txt"
        />

        {/* ─── SECTION 6: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Module 001_004 Complete! You now possess an ironclad grasp of the Three Trees and every Git undo mechanism. You are ready to step into Segment 2: Branching, Merging & Rebasing! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 7: NEXT MODULE NAVIGATION BANNER ────────────────────── */}
        <nav className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 13 (Terminal Lab)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950 transition hover:scale-[1.02]"
          >
            <GitBranch className="w-4 h-4" />
            <span>Start Segment 2: Module 002_001 (Branching Fundamentals)</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
