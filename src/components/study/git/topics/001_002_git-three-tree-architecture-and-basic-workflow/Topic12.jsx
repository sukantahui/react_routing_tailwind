import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Terminal,
  AlertTriangle,
  FileCode,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  FolderGit2,
  Zap,
  Users,
  Globe,
  Lock,
  Share2,
  FolderLock,
  Laptop
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
 * Topic 12: Repository-Specific Local Exclusions: The .git/info/exclude file and Global gitignore (~/.gitignore_global)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic12() {
  const [activeTier, setActiveTier] = useState(2);

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 12;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const tiers = [
    {
      tier: 1,
      title: "Tier 1: Shared `.gitignore`",
      scope: "Team & Repository Level",
      location: "<repo-root>/.gitignore",
      committed: "YES (Tracked & Pushed to GitHub)",
      icon: Share2,
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      useCase: "Build outputs (dist/, target/), package dependencies (node_modules/), project secrets (.env).",
      desc: "Applies to every developer on the project and every CI/CD runner. Rules are committed in history."
    },
    {
      tier: 2,
      title: "Tier 2: `.git/info/exclude`",
      scope: "Local Repository Only",
      location: "<repo-root>/.git/info/exclude",
      committed: "NO (Private to this local clone)",
      icon: FolderLock,
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      useCase: "Personal scratch scripts (`my_test.js`), local profiling logs, private documentation drafts.",
      desc: "Applies only to this single local repository clone. Never shared or pushed to GitHub, keeping team .gitignore clean."
    },
    {
      tier: 3,
      title: "Tier 3: `~/.gitignore_global`",
      scope: "Entire Workstation / User",
      location: "~/.gitignore_global (via core.excludesfile)",
      committed: "NO (User Workstation Profile)",
      icon: Laptop,
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      useCase: "OS system clutter (.DS_Store, Thumbs.db), personal editor configs (.vscode/, .idea/, *.swp).",
      desc: "Applies across EVERY Git repository on your computer. Configured once globally via `git config --global core.excludesfile`."
    }
  ];

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
                <span className="text-slate-400">Module 001_002</span>
                <span>/</span>
                <span className="text-cyan-400">Topic 12 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <FolderLock className="w-8 h-8 text-cyan-400" />
                Local & Global Exclusions: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">.git/info/exclude</code>
              </h1>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
              >
                <ArrowLeft className="w-4 h-4" /> Prev Topic
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
              >
                Next Topic <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: MOTIVATION & PEDAGOGICAL HOOK ────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Three-Tiered Exclusion Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Private Local Sandboxes vs Workstation-Wide Global Rules
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Junior developers often modify the team's shared <code className="text-amber-300 font-mono">.gitignore</code> file just to ignore their personal editor settings or local experimental scratch files. 
              Git provides a sophisticated <strong>3-Tier ignore hierarchy</strong>: 
              use <strong>Tier 1 (.gitignore)</strong> for shared team rules, 
              <strong>Tier 2 (.git/info/exclude)</strong> for private repo-specific experiments, and 
              <strong>Tier 3 (~/.gitignore_global)</strong> for workstation-wide operating system and editor hygiene.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Tier 1: .gitignore
                </h3>
                <p className="text-slate-400 text-xs">
                  Committed and shared across all team members and CI pipelines.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <FolderLock className="w-4 h-4" /> Tier 2: info/exclude
                </h3>
                <p className="text-slate-400 text-xs">
                  Private sandbox for local test scripts in a single repository.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-purple-300 mb-1 flex items-center gap-2">
                  <Laptop className="w-4 h-4" /> Tier 3: Global Exclude
                </h3>
                <p className="text-slate-400 text-xs">
                  Silences OS clutter and editor files across every repo on your machine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: THE THREE TIERS INTERACTIVE EXPLORER ─────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">The Three Tiers of Git Ignoring</h2>
              <p className="text-slate-400 text-sm">Click any tier to inspect its location, scoping guarantee, and configuration</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.tier}
                  onClick={() => setActiveTier(t.tier)}
                  className={`p-5 rounded-xl border text-left transition-all ${
                    activeTier === t.tier
                      ? "bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/10"
                      : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-6 h-6 ${activeTier === t.tier ? "text-cyan-400" : "text-slate-400"}`} />
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${t.badge}`}>
                      Tier {t.tier}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-100 mb-1">{t.title}</h3>
                  <div className="font-mono text-xs text-cyan-300 mb-2">{t.location}</div>
                  <p className="text-xs text-slate-400">{t.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Tier Detailed Configuration Card */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Detailed Configuration Guide: Tier {activeTier}</span>
              <span className="text-xs font-mono text-slate-400">
                {activeTier === 1 ? ".gitignore" : activeTier === 2 ? ".git/info/exclude" : "~/.gitignore_global"}
              </span>
            </h3>

            {activeTier === 1 && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-300">
                  <strong>When to use:</strong> When files should be ignored for everyone collaborating on the project.
                </p>
                <div className="bg-slate-950 p-3 rounded font-mono text-cyan-300">
                  touch .gitignore && git add .gitignore && git commit -m "chore: add shared .gitignore"
                </div>
              </div>
            )}

            {activeTier === 2 && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-300">
                  <strong>When to use:</strong> When you create local one-off scratch files (e.g. `quick_test.js`, `benchmarks/`, `my_notes.txt`) that belong to this repo only, but must not be pushed to GitHub or pollute team `.gitignore`.
                </p>
                <div className="bg-slate-950 p-3 rounded font-mono text-cyan-300 space-y-1">
                  <div># Open your local exclude file:</div>
                  <div>code .git/info/exclude</div>
                  <div># Add your private patterns:</div>
                  <div>quick_test.js</div>
                  <div>private_notes.md</div>
                </div>
              </div>
            )}

            {activeTier === 3 && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-300">
                  <strong>When to use:</strong> To automatically silence operating system clutter and personal text editor metadata across every Git project on your machine.
                </p>
                <div className="bg-slate-950 p-3 rounded font-mono text-cyan-300 space-y-1">
                  <div># 1. Create global ignore file in user profile:</div>
                  <div>touch ~/.gitignore_global</div>
                  <div># 2. Tell Git to use it globally:</div>
                  <div>git config --global core.excludesfile ~/.gitignore_global</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 4: THREE TIERS HIGH-YIELD MATRIX ────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Three-Tier Exclusion Matrix</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-300">
                  <th className="p-3 font-semibold">Tier</th>
                  <th className="p-3 font-semibold">Configuration Path</th>
                  <th className="p-3 font-semibold">Scope</th>
                  <th className="p-3 font-semibold">Shared on GitHub?</th>
                  <th className="p-3 font-semibold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-emerald-400 font-bold">Tier 1: .gitignore</td>
                  <td className="p-3 font-mono text-slate-300">`&lt;repo&gt;/.gitignore`</td>
                  <td className="p-3 text-slate-300">Repository & Subtree</td>
                  <td className="p-3 text-emerald-400 font-bold">YES (Committed)</td>
                  <td className="p-3 text-slate-300">Build outputs (`dist/`), dependencies (`node_modules/`), secrets (`.env`)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-400 font-bold">Tier 2: info/exclude</td>
                  <td className="p-3 font-mono text-slate-300">`&lt;repo&gt;/.git/info/exclude`</td>
                  <td className="p-3 text-slate-300">Single Local Repo</td>
                  <td className="p-3 text-rose-400 font-bold">NO (Local Only)</td>
                  <td className="p-3 text-slate-300">Private scratch scripts, test dumps, local debug experiments</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-purple-400 font-bold">Tier 3: core.excludesfile</td>
                  <td className="p-3 font-mono text-slate-300">`~/.gitignore_global`</td>
                  <td className="p-3 text-slate-300">All Repos on Workstation</td>
                  <td className="p-3 text-rose-400 font-bold">NO (Local User Profile)</td>
                  <td className="p-3 text-slate-300">OS clutter (`.DS_Store`, `Thumbs.db`), personal IDE metadata (`.idea/`, `*.swp`)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 5: CLASSROOM MENTORSHIP & REAL-WORLD SCENARIO ────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The .gitignore War</h2>
              <p className="text-slate-400 text-sm">Susmita, Sachin, and Mahima resolving personal IDE clutter conflicts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> The Team Clash
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                In the Barrackpore accounting project, Susmita used Sublime Text and added <code className="text-cyan-300 font-mono">*.sublime-project</code> to the project <code className="text-cyan-300 font-mono">.gitignore</code>. 
                Sachin used Emacs and added <code className="text-cyan-300 font-mono">*~</code>. Mahima used Vim and added <code className="text-cyan-300 font-mono">*.swp</code>.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Soon, the project <code className="text-cyan-300 font-mono">.gitignore</code> had 70 lines of editor clutter that had nothing to do with the accounting codebase.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Sukanta's Global Architecture Rule
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sukanta Hui cleaned the team's <code className="text-cyan-300 font-mono">.gitignore</code>:
                <em>"The repository `.gitignore` belongs to the PROJECT, not your personal computer! If you use Vim, put `*.swp` in your `~/.gitignore_global`. If you create a test script `sachin_test.js`, put it in `.git/info/exclude`. Keep the team `.gitignore` clean!"</em>
              </p>
              <p className="text-slate-300 text-xs">
                The team adopted this standard, reducing team merge conflicts to zero.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF LOCAL/GLOBAL EXCLUDES ───────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Multi-Tier Exclusions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Project vs Personal</span>
              <p className="text-slate-400">Keep project rules in `.gitignore`; put personal tooling in `~/.gitignore_global`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Scratch Scripts in info/exclude</span>
              <p className="text-slate-400">Add local one-off scripts to `.git/info/exclude` instead of dirtying `.gitignore`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Set core.excludesfile Once</span>
              <p className="text-slate-400">Configure global ignores once per machine during initial developer onboarding.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Audit with check-ignore -v</span>
              <p className="text-slate-400">Run `git check-ignore -v` to see which tier is ignoring a file.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. info/exclude is Never Cloned</span>
              <p className="text-slate-400">Remember that `.git/info/exclude` is strictly private and never transferred to remotes.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Shared Launch Configs in Repo</span>
              <p className="text-slate-400">Shared `.vscode/launch.json` belongs in repo; personal cache belongs in global.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Branch-Independent info/exclude</span>
              <p className="text-slate-400">`.git/info/exclude` remains active across all branches in that local clone.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: EXECUTABLE TERMINAL LAB SCRIPT ──────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Hands-On Bash Verification Lab</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">topic12_files/local_global_exclude_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to verify all three tiers in action simultaneously: Tier 1 (`.gitignore`), Tier 2 (`.git/info/exclude`), and Tier 3 (`core.excludesfile`).
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic12_files/local_global_exclude_lab.sh`}</pre>
          </div>
        </section>

        {/* ─── SECTION 8: FAQ ACCORDION ───────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <FAQTemplate
            faqs={[
              {
                question: "Can other developers see rules I add to `.git/info/exclude`?",
                answer: "No! Files inside `.git/` are strictly local to your workstation. Remote Git commands (`git push`, `git fetch`, `git clone`) never transfer internal repository metadata like `.git/info/exclude`."
              },
              {
                question: "Where should I ignore macOS `.DS_Store` files?",
                answer: "In your global `~/.gitignore_global` file! Since `.DS_Store` is generated by your operating system, configuring it once globally silences it across every current and future Git repository on your machine."
              },
              {
                question: "What is the priority if a rule in `.gitignore` contradicts `.git/info/exclude`?",
                answer: "Git evaluates rules in order: local directory `.gitignore` rules take highest precedence, followed by `.git/info/exclude`, and finally `core.excludesfile`."
              },
              {
                question: "How do I check if my computer has a global ignore file set up?",
                answer: "Run `git config --get core.excludesfile`. If it returns a path (like `~/.gitignore_global`), it is configured. If it returns blank, you can set one up with `git config --global core.excludesfile ~/.gitignore_global`."
              },
              {
                question: "Does `git clean` delete files ignored by `.git/info/exclude`?",
                answer: "Yes, running `git clean -X` (or `git clean -x`) removes all untracked ignored files regardless of whether they matched `.gitignore`, `.git/info/exclude`, or global ignore."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 12 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Test your understanding of the 3-tier ignore architecture, `.git/info/exclude`, and global configuration commands.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.slice(0, 6).map((q) => (
              <div key={q.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-cyan-400">Q{q.id}:</span>
                  <span className="text-xs font-medium text-slate-200">{q.question}</span>
                </div>
                <div className="text-xs text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-500/20 mt-2">
                  <strong>Correct:</strong> {q.options[q.correctAnswer]}
                  <p className="text-slate-400 text-[11px] mt-1">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINT & NOTE EXPORT ─────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Printable Reference Note</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">topic12_files/topic12_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic12_local_global_exclude_notes.txt" />
        </section>

        {/* ─── SECTION 11: EDUCATOR PROFILE CARD ──────────────────────────── */}
        <section className="pt-6 border-t border-slate-800">
          <Teacher />
        </section>

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ──────────────────────────── */}
        <nav className="flex items-center justify-between pt-6 border-t border-slate-800 text-sm">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 11 (Common Templates)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 13 (Classroom Walkthrough: Invoice Management Project) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
