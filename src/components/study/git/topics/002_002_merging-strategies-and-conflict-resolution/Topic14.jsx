import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
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
  GitMerge,
  Network,
  ShieldAlert,
  Flame,
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
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic 14: Self-Assessment Quiz & Short Questions for Module 002_002
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic14() {
  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 14;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  // Next module link as defined in roadmap
  const nextModuleSlug = currentModule?.nextModule || "002_003_rebasing-vs-merging-and-interactive-rebase";
  const nextTopicUrl = `/${folder}/topic/${nextModuleSlug}/0`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* ─── Top Sticky Mini Bar ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-400 truncate">
          <Link
            to={`/${folder}`}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            Curriculum
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate">
            {currentModule?.title || "Merging Strategies"}
          </span>
          <span>/</span>
          <span className="text-amber-400 font-mono">Topic-14 (Final Exam)</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={prevTopicUrl}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Prev
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 transition"
          >
            Next Module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* ─── Section 1: Header & Badges ─────────────────────────────────── */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Module Graduation &amp; Exam
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              30 Comprehensive Questions
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Merge Master Badge
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Module 002_002 Self-Assessment &amp; Final Exam
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Consolidating your mastery of Git merging strategies, conflict resolution lifecycles, merge base algorithms, graphical merge tools, and squash merging. Complete the 30-question certification exam below.
          </p>
        </div>

        {/* ─── Section 2: ELI10 Dialogue ──────────────────────────────────── */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 border border-amber-900/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-900/40 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Graduation Day at Barrackpore: The Merge Masters
              </h2>
              <p className="text-xs text-amber-300">
                Sukanta Sir congratulates Sachin, Susmita, Mahima, Abhronila, Swadeep, and Debangshu
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Heartiest congratulations to all of you! You started this module nervous about terminal conflict errors. Today, you can calculate merge bases with mathematical precision, read raw <code className="text-sky-300 font-mono">zdiff3</code> conflict markers in your sleep, use <code className="text-amber-300 font-mono">git mergetool</code> effortlessly, abort safely with <code className="text-rose-300 font-mono">git merge --abort</code>, and squash feature branches like senior staff engineers!"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sachin
              </div>
              <p>
                <strong className="text-amber-300">Sachin:</strong> "Sir, what is our next adventure?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Next up is <strong>Module 002_003: Git Rebase &amp; Interactive Rebase Mastery</strong>! We will learn how to rewrite history, reorder commits, autosquash with <code className="text-slate-200 font-mono">--fixup</code>, and master the Golden Rule of Rebasing!"
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 3: Animated Merge Master Badge SVG ─────────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 flex flex-col items-center">
          <svg
            viewBox="0 0 600 220"
            className="w-full max-w-lg h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Badge Container */}
            <rect x="50" y="20" width="500" height="180" rx="20" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
            <rect x="60" y="30" width="480" height="160" rx="14" fill="#022c22" stroke="#059669" strokeWidth="1" />

            {/* Glowing Trophy Icon */}
            <circle cx="130" cy="110" r="45" fill="#065f46" stroke="#34d399" strokeWidth="3">
              <animate attributeName="r" values="45;48;45" dur="3s" repeatCount="indefinite" />
            </circle>
            <path
              d="M 115 85 L 145 85 L 140 120 C 140 130, 120 130, 120 120 Z M 130 130 L 130 142 M 115 142 L 145 142"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Text Title */}
            <text x="200" y="80" fill="#34d399" fontSize="18" fontWeight="bold">
              MERGE MASTER CERTIFIED
            </text>
            <text x="200" y="105" fill="#e2e8f0" fontSize="13" fontWeight="semibold">
              Module 002_002: Merging &amp; Conflict Resolution
            </text>
            <text x="200" y="130" fill="#94a3b8" fontSize="11">
              Coder &amp; AccoTax • Barrackpore Technical Lab
            </text>

            <rect x="200" y="145" width="160" height="26" rx="6" fill="#10b981" />
            <text x="280" y="162" fill="#022c22" fontSize="11" fontWeight="bold" textAnchor="middle">
              100% Curriculum Verified
            </text>
          </svg>
        </div>

        {/* ─── Section 4: Module 002_002 Key Skills Matrix ────────────────── */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              Module 002_002 Core Skills Matrix
            </h2>
            <p className="text-sm text-slate-400">
              Summary of all 15 core competencies acquired across this module
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Fast-Forward (FF) Merges",
              "Three-Way (3-Way) Diffs",
              "Merge Base (LCA Calculation)",
              "2-Parent Merge Commits",
              "Preserving Topologies (--no-ff)",
              "Content Conflict Anatomy",
              "Diff3 & zdiff3 Markers",
              "5-Step Resolution Protocol",
              "git mergetool Configuration",
              "Safe Rollback (git merge --abort)",
              "Squash Merging (--squash)",
              "Modern ORT Merge Engine",
              "Strategy Options (-X ours/theirs)",
              "Multi-Developer Synthesis",
              "Comprehensive Terminal Labs"
            ].map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Section 5: Classroom Discussion ────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Users className="w-5 h-5 text-indigo-400" />
            Classroom Discussion at Barrackpore Lab
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong className="text-amber-400">Debangshu:</strong> "Sir, what is your #1 final tip before we take the module quiz?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "Read each question carefully. Distinguish between strategy (<code className="text-slate-200 font-mono">-s</code>) and strategy option (<code className="text-slate-200 font-mono">-X</code>), understand the role of the merge base common ancestor, and remember that conflict markers are plain text that must always be completely deleted before staging!"
            </p>
          </div>
        </div>

        {/* ─── Section 6: PlainText Print Notes ────────────────────────────── */}
        <PlainTextPrint
          title="Printable Study Note: Module 002_002 Comprehensive Exam Review"
          content={noteText}
        />

        {/* ─── Section 7: FAQ & Exam Question Bank ─────────────────────────── */}
        <FAQTemplate
          title="Module 002_002 Comprehensive 30-Question Assessment Exam"
          questions={questions}
        />

        {/* ─── Section 8: Teacher Bio ─────────────────────────────────────── */}
        <Teacher />

        {/* ─── Section 9: Bottom Navigation Bar ──────────────────────────── */}
        <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to={prevTopicUrl}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Hands-on Terminal Lab (Topic 13)
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold flex items-center gap-2 transition shadow-xl shadow-emerald-950/60 text-sm sm:text-base"
          >
            Proceed to Module 002_003 (Git Rebase Mastery)
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
