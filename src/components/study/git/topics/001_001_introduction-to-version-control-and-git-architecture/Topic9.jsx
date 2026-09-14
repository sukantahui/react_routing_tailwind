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
  Layers3,
  Sliders,
  FolderTree
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9: Configuration Scope Hierarchy: System (--system) vs Global (--global) vs Local (--local) vs Worktree (--worktree)
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic9() {
  const [activeTier, setActiveTier] = useState("local");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 9;
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
            <span className="text-sky-400 font-semibold">Topic 10 of {totalTopics}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              Configuration Architecture
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              4-Tier Precedence Hierarchy
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Clock size={13} />
              Estimated: 25 mins
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Configuration Scope Hierarchy: System vs Global vs Local vs Worktree
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Understand Git&apos;s cascading configuration precedence. Learn how system-wide defaults, user-level globals, repository-specific overrides, and worktree settings interact to give you precise control over developer identity and repository behavior.
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
                In Simple Words (The Russian Nesting Dolls of Config)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                How closer rules always win over broader rules
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Think of Git configuration like school uniform rules in Barrackpore:
            <br />
            1. <strong>National Government Rule (System):</strong> &ldquo;All students must wear formal shoes.&rdquo;
            <br />
            2. <strong>School Rule (Global):</strong> &ldquo;In our school, shoes must be black leather.&rdquo; (Overrides general rule).
            <br />
            3. <strong>Sports Day Exception (Local):</strong> &ldquo;Today on the football field, wear white sneakers!&rdquo; (Overrides school rule for this event only).
            <br />
            In Git, whatever rule is closest to your specific repository always takes top priority!
          </p>
        </section>

        {/* ─── 3. The 4 Tiers Visual Explorer ─────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers3 className="text-sky-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 4-Tier Configuration Hierarchy
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "system", label: "1. System Level (--system)", path: "/etc/gitconfig", color: "slate" },
              { id: "global", label: "2. Global Level (--global)", path: "~/.gitconfig", color: "sky" },
              { id: "local", label: "3. Local Level (--local)", path: ".git/config", color: "purple" },
              { id: "worktree", label: "4. Worktree Level (--worktree)", path: ".git/config.worktree", color: "emerald" }
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => setActiveTier(tier.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border text-left ${
                  activeTier === tier.id
                    ? "bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-950"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <p>{tier.label}</p>
                <p className="text-[10px] font-mono opacity-70">{tier.path}</p>
              </button>
            ))}
          </div>

          {/* Detailed Tier Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            {activeTier === "system" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-slate-300">System Scope (--system)</h3>
                  <span className="text-xs font-mono text-slate-500">Lowest Precedence</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Applies to every user and every repository on the entire computer. Stored in <code className="text-sky-300">/etc/gitconfig</code> (Unix) or <code className="text-sky-300">C:\Program Files\Git\etc\gitconfig</code> (Windows). Requires Admin/sudo privileges.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
                  $ sudo git config --system core.autocrlf input
                </div>
              </div>
            )}

            {activeTier === "global" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-sky-400">Global Scope (--global)</h3>
                  <span className="text-xs font-mono text-sky-400">Standard User Scope</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Applies to all repositories belonging to the logged-in user. Stored in <code className="text-sky-300">~/.gitconfig</code>. This is where your personal developer identity, default branch, and editor live.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300">
                  $ git config --global user.name &quot;Sukanta Hui&quot;<br />
                  $ git config --global user.email &quot;sukanta@codernaccotax.co.in&quot;
                </div>
              </div>
            )}

            {activeTier === "local" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-purple-400">Local Scope (--local)</h3>
                  <span className="text-xs font-mono text-purple-400">Overrides Global</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Applies only inside the current repository. Stored in <code className="text-purple-300">.git/config</code>. This is the default scope when inside a repo without flags. Use this to override your work/client email for specific enterprise repos.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">
                  $ git config --local user.email &quot;sukanta.hui@corporate-client.com&quot;
                </div>
              </div>
            )}

            {activeTier === "worktree" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-emerald-400">Worktree Scope (--worktree)</h3>
                  <span className="text-xs font-mono text-emerald-400">Multi-Worktree Specific</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Introduced in Git 2.20+, this scope applies only to a specific linked worktree folder when using <code className="text-emerald-300">git worktree</code> for multi-branch development.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
                  $ git config extensions.worktreeConfig true<br />
                  $ git config --worktree user.name &quot;Sukanta (Hotfix Worktree)&quot;
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Precedence Hierarchy Table ──────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="text-emerald-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Precedence Hierarchy (Lowest to Highest)
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-200 font-semibold border-b border-slate-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5">Scope Level</th>
                  <th className="p-3.5">Flag</th>
                  <th className="p-3.5">Storage Location</th>
                  <th className="p-3.5">Target Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 text-slate-500 font-bold">1 (Lowest)</td>
                  <td className="p-3.5 text-slate-400 font-sans">System Level</td>
                  <td className="p-3.5 text-sky-400">--system</td>
                  <td className="p-3.5 text-slate-400">/etc/gitconfig</td>
                  <td className="p-3.5 font-sans text-slate-400">OS-wide baseline defaults</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 text-slate-400 font-bold">2</td>
                  <td className="p-3.5 text-sky-300 font-sans font-semibold">Global Level</td>
                  <td className="p-3.5 text-sky-400">--global</td>
                  <td className="p-3.5 text-sky-300">~/.gitconfig</td>
                  <td className="p-3.5 font-sans text-slate-300">Personal defaults for all repos</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 text-purple-400 font-bold">3</td>
                  <td className="p-3.5 text-purple-300 font-sans font-semibold">Local Level</td>
                  <td className="p-3.5 text-purple-400">--local</td>
                  <td className="p-3.5 text-purple-300">.git/config</td>
                  <td className="p-3.5 font-sans text-slate-300">Repository-specific override (Client email)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 text-emerald-400 font-bold">4</td>
                  <td className="p-3.5 text-emerald-300 font-sans font-semibold">Worktree Level</td>
                  <td className="p-3.5 text-emerald-400">--worktree</td>
                  <td className="p-3.5 text-emerald-300">.git/config.worktree</td>
                  <td className="p-3.5 font-sans text-slate-300">Linked worktree folder override</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition bg-amber-950/20">
                  <td className="p-3.5 text-amber-400 font-bold">5 (Highest)</td>
                  <td className="p-3.5 text-amber-300 font-sans font-semibold">Environment Variables</td>
                  <td className="p-3.5 text-amber-400">GIT_AUTHOR_*</td>
                  <td className="p-3.5 text-amber-300">Process Memory</td>
                  <td className="p-3.5 font-sans text-slate-300">CI/CD pipeline dynamic overrides</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── 5. Classroom Mentorship Scenario ───────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="text-purple-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Barrackpore Classroom Mentorship: Debugging Config Conflicts
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-300">Mahima (Student):</span>
              <p>
                &ldquo;Sir, I updated my global email in <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">~/.gitconfig</code>, but when I commit inside my React project, it still uses my old email! Why didn&apos;t the global update apply?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;That is because your project has a <strong>Local override</strong> inside its <code className="text-purple-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">.git/config</code> file, Mahima! Local always overrides Global. To see exactly where the rogue value is coming from, run <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">git config --list --show-origin</code>. It will show you the exact filename holding the old email!&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. Comprehensive FAQ Section ───────────────────────────── */}
        <section className="space-y-4">
          <FAQTemplate
            title="Configuration Scope Hierarchy: Comprehensive Q&A Knowledge Base"
            subtitle="25 detailed technical questions exploring System, Global, Local, Worktree, and Environment Variable precedence"
            questions={questions}
          />
        </section>

        {/* ─── 7. Printable Plain-Text Study Note ─────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 10 Study Note: Configuration Scope Hierarchy"
            downloadFileName="git_topic09_config_hierarchy_note.txt"
          />
        </section>

        {/* ─── 8. Teacher Mentorship Note ─────────────────────────────── */}
        <section>
          <Teacher
            note="Principle: Think of Git configuration like CSS specificity: System is the browser default, Global is your main stylesheet, and Local is an inline style tag that overrides everything. Warning: Never commit your .git/config file to public repositories—it contains private local metadata. Habit: Run 'git config --list --show-origin' whenever debugging configuration discrepancies. Motivation: Mastering the 4-tier hierarchy gives you surgical precision across personal and corporate projects! — Sukanta Hui, Coder & AccoTax"
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
              <span>Previous: Line Endings (Topic 9)</span>
            </Link>
          ) : (
            <div />
          )}

          {hasNext ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
            >
              <span>Next: Inspecting Configuration (Topic 11)</span>
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
