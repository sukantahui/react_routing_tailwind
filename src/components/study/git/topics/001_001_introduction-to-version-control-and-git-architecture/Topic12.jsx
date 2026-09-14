import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  History,
  GitBranch,
  Terminal,
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
  MessageSquare,
  Flame,
  Award,
  BookOpen,
  Code2
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic 12: Classroom Dialogue: Sukanta Sir and Barrackpore students on why Git is essential for every developer
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic12() {
  const [activeTab, setActiveTab] = useState("myth1");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 12;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <Link to={`/${folder}`} className="hover:underline flex items-center gap-1">
                  <FolderGit2 className="w-3.5 h-3.5" /> Git Master Roadmap
                </Link>
                <span>/</span>
                <span className="text-slate-400">Foundation</span>
                <span>/</span>
                <span className="text-cyan-400">Topic 12 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-cyan-400" />
                Classroom Dialogue: Why Git is Essential for Every Developer
              </h1>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition border border-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev
              </Link>
              <Link
                to={nextTopicUrl}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition shadow-md shadow-cyan-900/30"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Clock className="w-3 h-3 text-cyan-400" /> Est. Reading Time: 15 Mins
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              <MessageSquare className="w-3 h-3 text-cyan-400" /> Socratic Mentoring
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
              <Users className="w-3 h-3 text-purple-400" /> Barrackpore Lab Edition
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              <Award className="w-3 h-3 text-emerald-400" /> Software Engineering Mindset
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: INTUITIVE REAL-WORLD ANALOGY ──────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/40 p-6 sm:p-8 rounded-2xl border border-purple-900/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Users className="w-48 h-48 text-purple-400" />
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/30 text-purple-400 shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                The Socratic Circle in Barrackpore
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Step inside the Coder & AccoTax lab in Barrackpore. Outside, the bustling suburban train horns echo across the station road; inside, the glowing monitors reflect on the eager faces of <strong className="text-white">Sachin, Susmita, Mahima, Debangshu, Swadeep, Tuhina, and Abhronila</strong>.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Sukanta Sir steps up to the whiteboard and writes a single sentence: <span className="text-cyan-300 font-semibold italic">"Git is not a backup drive; Git is how professional engineers think in time and parallel universes."</span> In this chapter, we explore their candid discussions, breakthrough moments, and why Git separates novice scriptwriters from senior software craftspeople.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: THE 3 CORE MYTHS DEBUNKED ─────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Debunking Beginner Myths: Socratic Breakdown
              </h2>
              <p className="text-slate-400 text-sm">
                Click each myth to see how Sukanta Sir dismantles common beginner misconceptions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-2">
              {[
                { id: "myth1", title: "Myth 1: 'Git is just GitHub'", student: "Sachin's Question" },
                { id: "myth2", title: "Myth 2: 'Solo devs don't need Git'", student: "Susmita's Question" },
                { id: "myth3", title: "Myth 3: 'Zip folders are enough'", student: "Debangshu's Question" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-4 rounded-xl border transition flex flex-col gap-1 ${
                    activeTab === item.id
                      ? "bg-cyan-950/60 border-cyan-500/60 text-white shadow-lg shadow-cyan-950/40"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                  }`}
                >
                  <span className="font-semibold text-sm text-cyan-300">{item.title}</span>
                  <span className="text-xs text-slate-500">{item.student}</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              {activeTab === "myth1" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-rose-400" /> Myth: "Git and GitHub are the same thing"
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300">The Reality:</strong> Git is a local command-line version control tool written in C by Linus Torvalds in 2005. GitHub is a commercial cloud hosting platform founded in 2008 that hosts Git repositories with web-based Pull Requests and CI/CD pipelines.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                    <strong className="text-emerald-400 font-semibold block mb-1">Sukanta Sir's Take:</strong>
                    "You can use Git for 20 years on a deserted island without ever connecting to GitHub or the internet. Git works 100% locally on your computer."
                  </div>
                </div>
              )}

              {activeTab === "myth2" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-rose-400" /> Myth: "I work alone, so I don't need Git"
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300">The Reality:</strong> Git is not just for team communication; it is an indestructible safety harness for solo developers. It provides instant undo, clean feature experimentation, and documentation of every decision you made 6 months ago.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                    <strong className="text-emerald-400 font-semibold block mb-1">Sukanta Sir's Take:</strong>
                    "When you wake up at 2 AM with a radical refactoring idea, a Git branch lets you experiment fearlessly. If it works, merge it; if it fails, delete the branch with zero damage to working code."
                  </div>
                </div>
              )}

              {activeTab === "myth3" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-rose-400" /> Myth: "Zipping folders with dates is good enough"
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300">The Reality:</strong> Files like <code className="text-amber-300">project_final_v2_new_done.zip</code> consume enormous disk space, provide zero line-by-line diffs, have no commit author attribution, and make merging impossible.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                    <strong className="text-emerald-400 font-semibold block mb-1">Sukanta Sir's Take:</strong>
                    "A ZIP file is an opaque black box. Git is a high-resolution holographic timeline where every single character is indexed and searchable."
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: THE 5 PILLARS OF GIT MASTERY ─────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                The 5 Pillars of Professional Git Engineering
              </h2>
              <p className="text-slate-400 text-sm">
                Fundamental principles shared with Barrackpore students to cultivate industry-grade discipline
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "1. Atomic Commits",
                desc: "Keep each commit focused on one single logical change. If a bug is introduced, 'git bisect' and 'git revert' isolate it instantly.",
                tag: "Modularity"
              },
              {
                title: "2. Imperative Messages",
                desc: "Write commit titles in present imperative mood ('fix: resolve session expiry') explaining WHAT and WHY, not HOW.",
                tag: "Clarity"
              },
              {
                title: "3. Branch Isolation",
                desc: "Never write experimental or unfinished code on 'main'. Always work on descriptive feature or bugfix branches.",
                tag: "Stability"
              },
              {
                title: "4. Frequent Staging Reviews",
                desc: "Use the staging area ('git diff --staged') as your camera viewfinder to inspect changes before committing.",
                tag: "Precision"
              },
              {
                title: "5. Continuous Synchronization",
                desc: "Pull often and communicate with teammates to resolve small merge differences early rather than experiencing massive merge conflicts.",
                tag: "Collaboration"
              },
              {
                title: "6. Security & Hygiene",
                desc: "Never commit API keys, .env secrets, or heavy build artifacts (node_modules). Enforce strict .gitignore policies.",
                tag: "Security"
              }
            ].map((pillar, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white text-sm">{pillar.title}</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {pillar.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 5: REAL-WORLD CASE STUDIES ───────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/30 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Lab Case Studies: When Developers Skip Git
              </h2>
              <p className="text-slate-400 text-sm">
                Stories from real development horror stories discussed in the lab
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> The 3 AM College Project Overwrite
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Two college seniors working on a shared Pendrive overwrote each other's backend database models 4 hours before the final semester evaluation. Because there was no Git history or commit diffs, they had to stay up all night manually rewriting 800 lines of lost code.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> The Rogue Production Hotfix
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A junior developer FTP-uploaded a hotfix directly to an AWS production server without checking it into Git. When the next CI/CD build deployed, it automatically erased the hotfix, reintroducing a critical payment gateway outage.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FULL CLASSROOM TRANSCRIPT ─────────────────────────── */}
        <section className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/30 text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Classroom Dialogue Transcript: The Barrackpore Masterclass
              </h2>
              <p className="text-slate-400 text-sm">
                Key excerpts from the open question-and-answer mentorship circle
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Swadeep:</span>
              <p className="text-slate-300">
                "Sir, when we start working in IT companies in Salt Lake Sector V or Bengaluru, will we be using GUI apps or the terminal?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "GUI tools like VS Code Git extension or GitKraken are convenient visual lenses, but <strong className="text-white">the terminal is your superpowers</strong>. On remote cloud servers, Docker containers, and CI/CD runners, there is no GUI. When a catastrophic merge conflict occurs at 3 AM, only the engineer who understands the CLI and the three-tree architecture will stay calm and resolve it in minutes."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Tuhina:</span>
              <p className="text-slate-300">
                "Sir, how often should we commit while working on an assignment?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Treat commits like checkpoints in a video game before a difficult boss fight. As soon as you finish one clean function, test it, verify it passes, and commit it with a clear imperative message. Never bundle three days of work into one monolithic commit named 'changes'."
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: INTERACTIVE TERMINAL PLAYGROUND ────────────────────── */}
        <section className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-400">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Interactive Lab Playground: Simulated Multi-Branch Graph
              </h2>
              <p className="text-slate-400 text-sm">
                Try these commands to see your project branch history come alive
              </p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 1. Visualize full commit graph across all branches:</div>
              <div className="text-cyan-300 select-all">$ git log --all --graph --oneline --decorate</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 2. Check difference between working directory and staging:</div>
              <div className="text-cyan-300 select-all">$ git diff</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 3. Check difference between staging and last commit (HEAD):</div>
              <div className="text-cyan-300 select-all">$ git diff --staged</div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: SUKANTA SIR'S 7 DEVELOPER COMMANDMENTS ────────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950/40 p-6 sm:p-8 rounded-2xl border border-indigo-900/40 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Sukanta Sir's 7 Developer Ethics Commandments
              </h2>
              <p className="text-slate-400 text-sm">
                Professional software engineering values to carry into your career
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Rule 1: Never write code without a Git repository initialized.",
              "Rule 2: Never commit broken code to a shared branch without team communication.",
              "Rule 3: Always write commit messages that your future self can understand in 6 months.",
              "Rule 4: Keep sensitive credentials, API keys, and database passwords out of Git repositories.",
              "Rule 5: Test and verify code before staging and committing.",
              "Rule 6: Respect branch protection rules and code reviews in team settings.",
              "Rule 7: Embrace Git's CLI power so you are completely independent on any operating system."
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 9: 25-30 COMPREHENSIVE FAQ SECTION ────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Frequently Asked Questions & Exam Prep (25 Questions)
              </h2>
              <p className="text-slate-400 text-sm">
                Conceptual and real-world viva questions on version control philosophy
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} topicId="topic12" />
        </section>

        {/* ─── SECTION 10: PRINTABLE REFERENCE NOTE ──────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Printable ASCII Quick Reference
              </h2>
              <p className="text-slate-400 text-sm">
                Download or copy pure ASCII reference notes for offline revision
              </p>
            </div>
          </div>

          <PlainTextPrint noteText={noteText} fileName="topic12_classroom_dialogue_notes.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER MENTORSHIP CARD ──────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ────────────────────────────── */}
        <nav className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Topic 11: Anatomy of .git Directory
          </Link>

          <Link
            to={nextTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition shadow-lg shadow-cyan-950/40"
          >
            Topic 13: Hands-on Terminal Lab <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
