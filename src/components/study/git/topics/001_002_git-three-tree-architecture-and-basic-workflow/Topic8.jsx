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
  Tag,
  BookOpen,
  Wrench,
  Gauge,
  FileText,
  Activity
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic 8: Conventional Commits Specification: feat, fix, docs, style, refactor, perf, test, chore, build, ci
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic8() {
  const [selectedType, setSelectedType] = useState("feat");
  const [scope, setScope] = useState("billing");
  const [description, setDescription] = useState("implement GST round-off logic");
  const [isBreaking, setIsBreaking] = useState(false);

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 8;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const commitTypes = {
    feat: {
      type: "feat",
      semver: "MINOR (0.X.0)",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "Introduces a brand-new user-facing feature or API capability."
    },
    fix: {
      type: "fix",
      semver: "PATCH (0.0.X)",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "Patches a bug or defect in production logic."
    },
    docs: {
      type: "docs",
      semver: "NONE / PATCH",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      desc: "Documentation only changes (README, JSDocs, swagger API specs)."
    },
    style: {
      type: "style",
      semver: "NONE",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Changes that do not affect code meaning (white-space, formatting, semicolons)."
    },
    refactor: {
      type: "refactor",
      semver: "NONE",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      desc: "Code changes that neither fix a bug nor add a feature (structural cleanup)."
    },
    perf: {
      type: "perf",
      semver: "PATCH (0.0.X)",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "Code restructuring that strictly improves execution or memory performance."
    },
    test: {
      type: "test",
      semver: "NONE",
      badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      desc: "Adding missing unit/integration tests or refactoring test suites."
    },
    build: {
      type: "build",
      semver: "NONE / PATCH",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      desc: "Changes affecting the build toolchain or external dependencies (npm, Vite, webpack)."
    },
    ci: {
      type: "ci",
      semver: "NONE",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      desc: "Changes to CI/CD workflows and automated scripts (GitHub Actions, Docker builds)."
    },
    chore: {
      type: "chore",
      semver: "NONE",
      badge: "bg-slate-700 text-slate-300 border-slate-600",
      desc: "Routine repository upkeep, updating gitignore, license tags, or task runner scripts."
    }
  };

  const formattedMessage = `${selectedType}${scope ? `(${scope})` : ""}${isBreaking ? "!" : ""}: ${description || "description here"}${
    isBreaking ? "\n\nBREAKING CHANGE: Deprecates previous API behavior." : ""
  }`;

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
                <span className="text-cyan-400">Topic 8 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Tag className="w-8 h-8 text-cyan-400" />
                Conventional Commits Specification: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">v1.0.0</code>
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
              <Sparkles className="w-3.5 h-3.5" /> Machine-Readable Engineering History
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Standardizing Git Messages for Automated Versioning & Releases
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              When software teams scale, inconsistent commit messages create chaos. 
              The <strong>Conventional Commits specification</strong> establishes a lightweight, standardized taxonomy 
              (<code className="text-emerald-300 font-mono">feat</code>, <code className="text-amber-300 font-mono">fix</code>, <code className="text-blue-300 font-mono">docs</code>, <code className="text-purple-300 font-mono">refactor</code>) 
              that enables automated Semantic Versioning (SemVer), automated <code className="text-cyan-300 font-mono">CHANGELOG.md</code> generation, and transparent communication across engineering, QA, and product teams.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> SemVer Automation
                </h3>
                <p className="text-slate-400 text-xs">
                  `feat` triggers MINOR version bumps; `fix` triggers PATCH bumps; `!` or `BREAKING CHANGE:` triggers MAJOR bumps.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Auto CHANGELOG
                </h3>
                <p className="text-slate-400 text-xs">
                  Tools like Semantic Release compile polished markdown release notes automatically on merge.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-purple-300 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Commitlint Enforced
                </h3>
                <p className="text-slate-400 text-xs">
                  Pre-commit git hooks guarantee that bad or ambiguous commit messages are rejected before hitting the repo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE CONVENTIONAL COMMIT BUILDER ──────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Interactive Conventional Commit Builder</h2>
              <p className="text-slate-400 text-sm">Compose your message and preview the formatted output and SemVer impact</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Controls */}
            <div className="lg:col-span-6 bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-4">
              {/* Type Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Select Commit Type:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(commitTypes).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all border text-left ${
                        selectedType === type
                          ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20"
                          : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope & Description Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Scope (optional):</label>
                  <input
                    type="text"
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    placeholder="e.g. auth, billing"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Description:</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="imperative summary (no period)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              {/* Breaking Change Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="breakingCheck"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500 w-4 h-4"
                />
                <label htmlFor="breakingCheck" className="text-xs font-semibold text-rose-400 cursor-pointer">
                  Is this a BREAKING CHANGE? (Triggers MAJOR version bump)
                </label>
              </div>
            </div>

            {/* Live Preview Pane */}
            <div className="lg:col-span-6 bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center justify-between">
                <span>Formatted Conventional Commit Preview</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border ${commitTypes[selectedType].badge}`}>
                  SemVer: {isBreaking ? "MAJOR (X.0.0)" : commitTypes[selectedType].semver}
                </span>
              </h3>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 whitespace-pre-wrap leading-relaxed shadow-inner">
                {formattedMessage}
              </div>

              <div className="text-xs text-slate-400 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 space-y-1">
                <strong className="text-slate-200 block">Type Meaning:</strong>
                <p>{commitTypes[selectedType].desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: THE FULL TAXONOMY TABLE ─────────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The Conventional Commits v1.0.0 Taxonomy Matrix</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-300">
                  <th className="p-3 font-semibold">Type</th>
                  <th className="p-3 font-semibold">SemVer Effect</th>
                  <th className="p-3 font-semibold">Purpose & Description</th>
                  <th className="p-3 font-semibold">Real-world Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {Object.values(commitTypes).map((t) => (
                  <tr key={t.type} className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono text-cyan-300 font-bold">{t.type}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] border ${t.badge}`}>{t.semver}</span>
                    </td>
                    <td className="p-3 text-slate-300">{t.desc}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-400">
                      {t.type === "feat" && "feat(auth): add OAuth2 login via GitHub"}
                      {t.type === "fix" && "fix(tax): correct GST rounding on cash transactions"}
                      {t.type === "docs" && "docs: add API rate limit section to README"}
                      {t.type === "style" && "style: reformat according to Prettier rules"}
                      {t.type === "refactor" && "refactor(billing): extract invoice validation helper"}
                      {t.type === "perf" && "perf(db): add composite index to speed up invoice search"}
                      {t.type === "test" && "test(auth): add unit test suite for token refresh"}
                      {t.type === "build" && "build(deps): upgrade Tailwind CSS to v4"}
                      {t.type === "ci" && "ci: add GitHub Actions matrix test for Node 20 & 22"}
                      {t.type === "chore" && "chore: update .gitignore to exclude .vscode folder"}
                    </td>
                  </tr>
                ))}
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
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The Automated Release Triumph</h2>
              <p className="text-slate-400 text-sm">Susmita, Sachin, and Mahima seeing automated SemVer in action</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> The Manual Release Nightmare
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Before adopting Conventional Commits, every monthly release of the Barrackpore Hospital software required 6 hours of manual changelog writing. 
                Sachin had to read 150 commits like "changed button", "fixed stuff", and "wip" to figure out what was actually new and whether the release was version 1.2.0 or 1.1.1.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> The Conventional Commits Solution
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sukanta Hui implemented <code className="text-cyan-300 font-mono">commitlint</code> and configured Semantic Release in GitHub Actions.
                Now, when Susmita merges <code className="text-cyan-300 font-mono">feat(bed): add ICU availability tracker</code>, the CI robot detects a <code className="text-emerald-300 font-mono">feat</code>, bumps the version from <code className="text-cyan-300 font-mono">1.1.0 -&gt; 1.2.0</code>, creates the release tag, and publishes the changelog automatically in 15 seconds!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF CONVENTIONAL COMMITS ────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Conventional Commits</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Always Lowercase Types</span>
              <p className="text-slate-400">Use `feat:`, `fix:`, `docs:`, never `FEAT:` or `Fix:`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Mandatory Colon & Space</span>
              <p className="text-slate-400">Syntax must follow <code>&lt;type&gt;: &lt;description&gt;</code> with a space after colon.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. No Trailing Periods</span>
              <p className="text-slate-400">Keep description concise and omit sentence-ending periods.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Reserve feat for New Features</span>
              <p className="text-slate-400">Do not use `feat` for bug fixes or refactoring.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Signal Breaking Changes with !</span>
              <p className="text-slate-400">Place `!` after type/scope when backwards compatibility is broken.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Enforce with Commitlint</span>
              <p className="text-slate-400">Set up Husky + Commitlint to catch invalid commit formats locally.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Meaningful Scopes</span>
              <p className="text-slate-400">Use clear noun scopes e.g. `feat(auth)`, `fix(tax)`, `perf(db)`.</p>
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
            <span className="text-xs text-slate-400 font-mono">topic8_files/conventional_commits_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to construct commits across all standard Conventional Commit types and practice regex filtering with <code className="text-cyan-300 font-mono">git log --grep</code>.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic8_files/conventional_commits_lab.sh`}</pre>
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
                question: "Is Conventional Commits an official part of the Git software core?",
                answer: "No, Git itself does not enforce message formatting. Conventional Commits is an industry-wide open specification adopted by teams and enforced through developer tooling (like commitlint, husky, and semantic-release)."
              },
              {
                question: "What happens if a commit contains both a bug fix and a new feature?",
                answer: "This is a violation of the atomic commit rule. You should split the changes into two separate commits: one `fix(...)` commit and one `feat(...)` commit."
              },
              {
                question: "Can I define custom types beyond the standard list?",
                answer: "Yes! Many teams configure custom types in their `commitlint.config.js` (e.g. `wip`, `i18n`, `security`). However, keeping to standard types guarantees out-of-the-box compatibility with release automation tools."
              },
              {
                question: "How does `semantic-release` know when to publish version 2.0.0?",
                answer: "When it parses a commit with a `!` after type/scope (e.g. `feat!: ...`) or containing `BREAKING CHANGE:` in the footer, it automatically increments the MAJOR version integer."
              },
              {
                question: "What is the difference between `chore` and `build`?",
                answer: "`build` is used specifically for build scripts and dependency package updates (like upgrading a Vite plugin). `chore` is for general repository housekeeping (updating .gitignore, copyright notices, etc.)."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 8 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Test your understanding of Conventional Commit types, scopes, SemVer mapping, and breaking change notations.
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
            <span className="text-xs text-slate-400 font-mono">topic8_files/topic8_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic8_conventional_commits_notes.txt" />
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
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 7 (Atomic Commits)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 9 (Inspecting Diff: git diff vs git diff --staged) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
