import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  GitBranch,
  GitCommit,
  FileText,
  Bookmark,
  Award,
  GraduationCap,
  Trophy
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic15_files/topic15_questions";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic 15: Self-Assessment Quiz & Short Questions for Module 002_001
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic15() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 15;
  const folder = roadmapData.folder || "git";

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  // Next module link pointing to Module 002_002 Topic 0
  const nextModuleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const nextTopicUrl = `/${folder}/topic/${nextModuleSlug}/0`;

  const quizQuestions = [
    {
      id: 1,
      q: "What is a Git branch at the physical filesystem level?",
      options: [
        "A full duplicate folder copy containing all repository files",
        "A 41-byte plain text file containing a 40-character commit SHA-1 hash",
        "A binary database record stored inside the central GitHub server",
        "A compressed zip archive of your source code"
      ],
      correct: 1,
      explanation: "A branch in Git is simply a 41-byte text file inside .git/refs/heads/ storing a 40-hex-character commit SHA."
    },
    {
      id: 2,
      q: "Which command atomically creates and switches to a new branch in modern Git (2.23+)?",
      options: [
        "git branch --switch <name>",
        "git switch -c <name>",
        "git checkout --create <name>",
        "git branch -m <name>"
      ],
      correct: 1,
      explanation: "`git switch -c <name>` (or `--create`) creates the reference and switches HEAD atomically."
    },
    {
      id: 3,
      q: "What happens when you run `git switch main` after making commits in a detached HEAD state?",
      options: [
        "Git automatically merges those commits into main",
        "Git deletes those commits instantly with no recovery possible",
        "Git prints a warning; the commits become dangling but are preserved in the reflog for 30 days",
        "Git prevents switching until you delete all unmerged files"
      ],
      correct: 2,
      explanation: "Git displays a departure warning with the commit SHA; commits remain in reflog for at least 30 days."
    },
    {
      id: 4,
      q: "Why do Pull Requests on GitHub use three-dot diff (`git diff main...feature`) rather than two-dot?",
      options: [
        "Three-dot diff isolates only the changes made on the feature branch since the common merge base",
        "Three-dot diff runs 3 times faster than two-dot diff",
        "Two-dot diff is deprecated and forbidden in Git",
        "Three-dot diff automatically resolves all merge conflicts"
      ],
      correct: 0,
      explanation: "Three-dot diff compares from the common merge base to the feature tip, showing pure feature additions."
    },
    {
      id: 5,
      q: "What is the difference between `git branch -d` and `git branch -D`?",
      options: [
        "There is no difference; they are exact synonyms",
        "`-d` performs a safety check on merge status; `-D` forces deletion unconditionally",
        "`-d` deletes local branches; `-D` deletes remote branches on GitHub",
        "`-d` deletes reflogs; `-D` deletes commits"
      ],
      correct: 1,
      explanation: "Lowercase `-d` enforces safety checks; uppercase `-D` overrides for experiments."
    }
  ];

  const handleSelectOption = (questionId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 15 of 16</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Self-Assessment Quiz & Module 002_001 Mastery Assessment
              </h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition shadow-lg shadow-emerald-950/50"
              >
                <span>Next Module: Merging Strategies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: TOPIC OVERVIEW & HIGH-LEVEL INTRO ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-950/80 border border-cyan-800/60 rounded-xl text-cyan-400 mt-1">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Module Mastery Evaluation</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Validate Your Branching & Pointer Mechanics Mastery
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                Congratulations on reaching the capstone assessment for <strong>Module 002_001: Branching Fundamentals & Pointer Mechanics</strong>. You have explored Git's 41-byte pointer architecture, the symbolic role of HEAD, modern <code className="text-cyan-300">git switch</code> workflows, detached HEAD state navigation, reflog rescue protocols, and three-dot diffing.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                Take the interactive self-assessment quiz below to test your practical understanding before advancing to <strong>Module 002_002: Merging Strategies & Conflict Resolution</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE QUIZ APPLICATION ─────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Interactive Concept Evaluation</h3>
            </div>
            {submitted && (
              <span className="text-sm font-bold px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">
                Score: {calculateScore()} / {quizQuestions.length} ({((calculateScore() / quizQuestions.length) * 100).toFixed(0)}%)
              </span>
            )}
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {quizQuestions.map((q, idx) => (
              <div key={q.id} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2 py-1 rounded">
                    Q{idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-slate-200">{q.q}</p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pl-8">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    const isCorrect = q.correct === optIdx;

                    let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                    if (isSelected) {
                      btnStyle = "bg-cyan-950/60 border-cyan-600 text-cyan-200";
                    }
                    if (submitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-950/80 border-emerald-600 text-emerald-200 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-950/80 border-rose-600 text-rose-200 line-through";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={submitted}
                        className={`p-3 rounded-lg border text-left text-xs transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="pl-8 pt-2 text-xs text-slate-400 border-t border-slate-900">
                    <span className="text-cyan-400 font-semibold font-sans">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit / Reset Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
              >
                Submit Answers
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setSubmitted(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            )}

            <div className="text-xs text-slate-500">
              Answered: {Object.keys(selectedAnswers).length} of {quizQuestions.length} questions
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="To Sachin, Mahima, Debangshu, Swadeep, Abhronila, and Tuhina: mastering Git branch pointers is the foundational turning point in your journey. You now understand how Git creates, moves, and tracks code at the byte level. In Module 002_002, we will bring these branches together with merges, rebases, and conflict resolution!"
          />
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Complete Summary & Exam Cheatsheet"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Module 002_001 Comprehensive Master FAQ (30 Questions)"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR (NEXT MODULE LINK) ────────── */}
        <nav className="flex items-center justify-between border-t border-slate-800 pt-6">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-sm font-medium text-slate-200 hover:bg-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Topic 14: Hands-on Terminal Lab</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-white transition shadow-lg shadow-emerald-950/50"
          >
            <span>Next Module: 002_002 Merging Strategies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
