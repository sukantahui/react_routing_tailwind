import React from "react";
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
  Award,
  BookOpen,
  GraduationCap,
  Trophy,
  Check
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
 * Topic 14: Self-Assessment Quiz & Short Questions for Module 001_001
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic14() {
  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 14;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const roadmapUrl = `/${folder}`;

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
                <span className="text-cyan-400">Topic 14 of {totalTopics} (Module Graduation)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-amber-400" />
                Module 001_001 Self-Assessment & Comprehensive Review
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
                to={roadmapUrl}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition shadow-md shadow-amber-900/30"
              >
                Roadmap <FolderGit2 className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Clock className="w-3 h-3 text-cyan-400" /> Assessment Duration: 25 Mins
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
              <Trophy className="w-3 h-3 text-amber-400" /> 30 Comprehensive Questions
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              <Award className="w-3 h-3 text-emerald-400" /> Module 001_001 Mastery Certification
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
              <Users className="w-3 h-3 text-purple-400" /> Sukanta Hui Mentorship
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: INTUITIVE REAL-WORLD ANALOGY ──────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/40 p-6 sm:p-8 rounded-2xl border border-amber-900/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Trophy className="w-48 h-48 text-amber-400" />
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Earning Your Foundation Pilot Wings
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                You have journeyed through all 15 foundational topics of Module 001_001: from the philosophical breakdown of Centralized vs Distributed VCS to Linus Torvalds' 2005 design principles, cross-platform installation, configuration scope precedence, line ending normalization, and the internal anatomy of the <code className="text-cyan-300">.git</code> database.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                This final self-assessment serves as your graduation test. Test your knowledge against all 30 curated questions below to achieve full certification before advancing to Module 001_002 (Local Repository Operations & The Three-Tree Architecture)!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: MASTER SYNTHESIS OF MODULE 001_001 ────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Module 001_001 Master Synthesis & Core Takeaways
              </h2>
              <p className="text-slate-400 text-sm">
                A birds-eye view of all 15 topics mastered in this module
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                topic: "Topics 0-2",
                title: "VCS Evolution & DVCS",
                desc: "Local -> Centralized (SVN) -> Distributed (Git). Zero single point of failure; every clone has full history."
              },
              {
                topic: "Topics 3-4",
                title: "Git Origins & Principles",
                desc: "Linus Torvalds built Git in 2005. Designed for speed, cryptographic integrity (SHA), and O(1) branching."
              },
              {
                topic: "Topics 5-7",
                title: "Installation & Identity",
                desc: "Git for Windows, macOS Homebrew, Linux packages. Global user.name and user.email metadata configuration."
              },
              {
                topic: "Topics 8-10",
                title: "Config Precedence & Line Endings",
                desc: "core.autocrlf (true on Windows, input on Unix). Hierarchy: System < Global < Local < Worktree < Runtime -c."
              },
              {
                topic: "Topic 11",
                title: "Anatomy of .git Directory",
                desc: "HEAD pointer, objects/ database (blobs, trees, commits, tags), refs/ branch pointers, and binary index cache."
              },
              {
                topic: "Topics 12-13",
                title: "Mentorship & Terminal Lab",
                desc: "Socratic classroom dialogues, core.editor 'code --wait', productivity aliases, and --show-origin verification."
              }
            ].map((card, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 font-semibold">{card.topic}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Mastered
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD CHEAT SHEET ────────────────────────────── */}
        <section className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                The Essential Command Reference Card
              </h2>
              <p className="text-slate-400 text-sm">
                Keep these core commands permanently in your muscle memory
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400 font-sans font-semibold text-xs">Identity Configuration:</div>
              <div className="text-cyan-300">git config --global user.name "Your Name"</div>
              <div className="text-cyan-300">git config --global user.email "email@example.com"</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400 font-sans font-semibold text-xs">Standard Initial Branch & Line Endings:</div>
              <div className="text-cyan-300">git config --global init.defaultBranch main</div>
              <div className="text-cyan-300">git config --global core.autocrlf true # Windows</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400 font-sans font-semibold text-xs">Editor & Diagnostic Origin Audit:</div>
              <div className="text-cyan-300">git config --global core.editor "code --wait"</div>
              <div className="text-cyan-300">git config --list --show-origin</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-400 font-sans font-semibold text-xs">Low-Level Vault Inspection:</div>
              <div className="text-cyan-300">cat .git/HEAD</div>
              <div className="text-cyan-300">git cat-file -p HEAD</div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: REAL-WORLD FAILURE SCENARIOS & ANTIPATTERNS ───────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/30 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Summary of Antipatterns Avoided in Module 001_001
              </h2>
              <p className="text-slate-400 text-sm">
                Crucial mistakes you are now permanently equipped to avoid
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold text-xs">Antipattern 1: ZIP Backups</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Saving dated ZIP archives instead of using atomic Git commits and lightweight branches.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold text-xs">Antipattern 2: Anonymous Commits</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Committing without configuring user.name and user.email, corrupting repository audit trails.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold text-xs">Antipattern 3: Deleting .git</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Treating the .git directory as a temporary cache and accidentally destroying history.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: CLASSROOM MENTORSHIP DIALOGUE ─────────────────────── */}
        <section className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/30 text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Classroom Dialogue: The Barrackpore Graduation Circle
              </h2>
              <p className="text-slate-400 text-sm">
                Sukanta Sir celebrates the completion of Module 001_001 with the student cohort
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Sachin & Susmita:</span>
              <p className="text-slate-300">
                "Sir, when we started this module, we only knew how to click 'Upload files' on GitHub. Now we understand the internal .git folder, cryptographic SHA hashing, scope precedence, line ending normalizations, and low-level plumbing commands!"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "I am deeply proud of your hard work. You have laid a rock-solid foundation. In the upcoming modules, we will build upon this by mastering the three-tree architecture (Working Tree, Index, HEAD), branch merging algorithms, conflict resolution, GitHub Actions CI/CD pipelines, and disaster recovery with reflog. Keep up the dedication!"
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
                Module 001_001 Final Verification Audit
              </h2>
              <p className="text-slate-400 text-sm">
                Run this final check in your terminal to confirm complete module readiness
              </p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># Final Comprehensive Configuration Audit:</div>
              <div className="text-cyan-300 select-all">$ git config --list --show-origin</div>
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
                Sukanta Sir's 7 Commandments for Module 001_001 Graduates
              </h2>
              <p className="text-slate-400 text-sm">
                Guiding maxims for the next stage of your software engineering journey
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Rule 1: Always embrace Git as your creative sandbox, never as an intimidating chore.",
              "Rule 2: Never commit without verifying your active identity with --show-origin.",
              "Rule 3: Maintain cross-platform respect with proper core.autocrlf settings.",
              "Rule 4: Treat the .git directory with care—it is the living heart of your project.",
              "Rule 5: Write commit messages that tell a compelling story of why changes were made.",
              "Rule 6: Never fear making mistakes in Git; Git's content store rarely loses any committed data.",
              "Rule 7: Continue to learn and build fearlessly!"
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 9: 30 COMPREHENSIVE ASSESSMENT QUESTIONS ──────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Module 001_001 Comprehensive Self-Assessment Quiz (30 Questions)
              </h2>
              <p className="text-slate-400 text-sm">
                Complete this final test covering Topics 0 through 13 to earn your Module 001_001 badge
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} topicId="topic14" />
        </section>

        {/* ─── SECTION 10: PRINTABLE REFERENCE NOTE ──────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Printable ASCII Module Summary
              </h2>
              <p className="text-slate-400 text-sm">
                Download or copy pure ASCII revision notes for offline review
              </p>
            </div>
          </div>

          <PlainTextPrint noteText={noteText} fileName="module_001_graduation_summary.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER MENTORSHIP CARD ──────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ────────────────────────────── */}
        <nav className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Topic 13: Hands-on Terminal Lab
          </Link>

          <Link
            to={roadmapUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition shadow-lg shadow-amber-950/40"
          >
            Return to Git Roadmap <FolderGit2 className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
