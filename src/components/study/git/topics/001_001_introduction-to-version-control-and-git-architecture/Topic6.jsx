import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  Server,
  Laptop,
  Database,
  RefreshCw,
  Cpu,
  UserCheck,
  Mail,
  Sliders
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6: Configuring Git Identity: git config --global user.name and git config --global user.email
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic6() {
  const [userName, setUserName] = useState("Sukanta Hui");
  const [userEmail, setUserEmail] = useState("sukanta@codernaccotax.co.in");
  const [scope, setScope] = useState("global");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 6;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const hasNext = currentIndex < totalTopics - 1;
  const hasPrev = currentIndex > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* ─── 1. Header Section ──────────────────────────────────────── */}
        <header className="space-y-4 border-b border-slate-800/80 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            <Link
              to={`/${folder}/roadmap`}
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <FolderGit2 size={14} className="text-sky-400" />
              <span>Git Mastery Track</span>
            </Link>
            <span>/</span>
            <Link
              to={`/${folder}/module/${moduleSlug}`}
              className="hover:text-sky-400 transition-colors"
            >
              Module 001_001
            </Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">Topic 07 of {totalTopics}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              Identity &amp; Configuration
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              user.name &amp; user.email
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Clock size={13} />
              Estimated: 20 mins
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Configuring Git Identity: <code className="text-sky-400 font-mono text-2xl sm:text-4xl">user.name</code> &amp; <code className="text-sky-400 font-mono text-2xl sm:text-4xl">user.email</code>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Configure your professional author signature in Git. Understand how your name and email are permanently baked into cryptographic commit headers, master the Global vs Local override hierarchy, and connect your commits to your GitHub profile.
          </p>
        </header>

        {/* ─── 2. Dedicated Simple Language Section ───────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-2xl font-bold shrink-0 shadow-inner">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-300">
                In Simple Words (Your Digital Wax Seal)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Why Git insists on knowing who you are before recording any code
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Imagine an official royal notary in Barrackpore signing important legal contracts with a personalized wax stamp and seal. Every time you run <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">git commit</code>, Git acts as that notary—it presses your name and email permanently into the commit wax seal. Ten years from now, everyone will know with 100% mathematical certainty that <em>you</em> created that code.
          </p>
        </section>

        {/* ─── 3. Interactive Config Generator Sandbox ─────────────────── */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders size={20} className="text-sky-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Interactive Identity Command Generator
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Live Generator</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <UserCheck size={14} className="text-sky-400" />
                <span>Full Name:</span>
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. Sukanta Hui"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail size={14} className="text-sky-400" />
                <span>Verified Email:</span>
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. sukanta@codernaccotax.co.in"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Layers size={14} className="text-sky-400" />
                <span>Configuration Scope:</span>
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setScope("global")}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                    scope === "global"
                      ? "bg-sky-600 border-sky-400 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  --global (All repos)
                </button>
                <button
                  onClick={() => setScope("local")}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                    scope === "local"
                      ? "bg-purple-600 border-purple-400 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  --local (This repo)
                </button>
              </div>
            </div>
          </div>

          {/* Generated Shell Commands */}
          <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800">
              <span>Run these commands in your terminal:</span>
              <span className="text-sky-400 font-bold">Copy &amp; Paste</span>
            </div>
            <p className="text-sky-300">$ git config --{scope} user.name &quot;{userName}&quot;</p>
            <p className="text-sky-300">$ git config --{scope} user.email &quot;{userEmail}&quot;</p>
            <p className="text-slate-500 mt-2"># Verify active values:</p>
            <p className="text-emerald-400">$ git config user.name</p>
            <p className="text-emerald-400">$ git config user.email</p>
          </div>
        </section>

        {/* ─── 4. Scope Hierarchy Overview ────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="text-emerald-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 3 Levels of Git Configuration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-400">
                1. System Level
              </span>
              <h3 className="font-bold text-white">--system</h3>
              <p className="text-slate-400 text-xs">
                Applies to all users on the operating system. Stored in <code className="text-slate-300">/etc/gitconfig</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-sky-500/30 bg-sky-950/20 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-sky-500/20 text-sky-300">
                2. Global Level (Standard)
              </span>
              <h3 className="font-bold text-white">--global</h3>
              <p className="text-slate-300 text-xs">
                Applies to all repositories for the logged-in user. Stored in <code className="text-sky-300">~/.gitconfig</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 bg-purple-950/20 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300">
                3. Local Level (Overrides Global)
              </span>
              <h3 className="font-bold text-white">--local</h3>
              <p className="text-slate-300 text-xs">
                Applies only inside the current repository folder. Stored in <code className="text-purple-300">.git/config</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. Classroom Mentorship Scenario ───────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="text-purple-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Barrackpore Classroom Mentorship: Personal vs Work Email
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-300">Sachin (Student):</span>
              <p>
                &ldquo;Sir, I use my personal Gmail for open source on GitHub, but when I start an internship at an IT firm in Salt Lake Kolkata, they require me to use my corporate email. How do I avoid accidentally committing to work repos with my personal Gmail?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;Keep your personal email in your <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded">--global</code> configuration! Whenever you clone an enterprise client project, simply run <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded">git config --local user.email &quot;sachin@enterprise.com&quot;</code> inside that project folder. The local configuration will cleanly override your global email for that repository only!&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. Comprehensive FAQ Section ───────────────────────────── */}
        <section className="space-y-4">
          <FAQTemplate
            title="Configuring Git Identity: Comprehensive Q&A Knowledge Base"
            subtitle="25 detailed technical questions exploring author attribution, commit immutability, and config overrides"
            questions={questions}
          />
        </section>

        {/* ─── 7. Printable Plain-Text Study Note ─────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 07 Study Note: Configuring Git Identity"
            downloadFileName="git_topic06_configuring_identity_note.txt"
          />
        </section>

        {/* ─── 8. Teacher Mentorship Note ─────────────────────────────── */}
        <section>
          <Teacher
            note="Principle: Your Git author email is your professional digital signature. Always configure it accurately with your verified email before writing a single line of code. Warning: Never use throwaway or fake emails in client projects—commit history is permanent. Habit: Run 'git config --list --show-origin' to verify your active identity. Motivation: A clean commit history with verified attribution builds your professional reputation across the global developer community! — Sukanta Hui, Coder & AccoTax"
          />
        </section>

        {/* ─── 9. Next & Previous Navigation ──────────────────────────── */}
        <nav className="flex items-center justify-between pt-8 border-t border-slate-800">
          {hasPrev ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex - 1}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition text-sm font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Previous: Installing Git (Topic 6)</span>
            </Link>
          ) : (
            <div />
          )}

          {hasNext ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
            >
              <span>Next: Essential Preferences (Topic 8)</span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link
              to={`/${folder}/module/${moduleSlug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold text-sm hover:bg-emerald-900 transition"
            >
              <span>Module Overview</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </nav>

      </div>
    </div>
  );
}
