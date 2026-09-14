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
  Copy,
  Check,
  Boxes,
  Cpu,
  Coffee,
  Code
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic 11: Common .gitignore Templates: Node.js (node_modules), Python (__pycache__, .venv), Java (.class), and IDE files (.vscode, .idea)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic11() {
  const [activeStack, setActiveStack] = useState("node");
  const [copied, setCopied] = useState(false);

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 11;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const stackTemplates = {
    node: {
      name: "Node.js / React / Next.js",
      icon: Boxes,
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      content: `# Dependencies
node_modules/
.pnp
.pnp.js

# Build Outputs & Bundles
dist/
build/
out/
.next/
.nuxt/

# Environment Secrets
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs & Diagnostics
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Coverage
coverage/
.nyc_output/`
    },
    python: {
      name: "Python / Django / FastAPI",
      icon: Cpu,
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      content: `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# Virtual Environments
.venv/
venv/
env/
ENV/

# Distribution / Packaging
build/
dist/
*.egg-info/
.eggs/

# Testing & Coverage
.pytest_cache/
.coverage
htmlcov/

# Local Database
*.sqlite3`
    },
    java: {
      name: "Java / Maven / Gradle / Spring",
      icon: Coffee,
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      content: `# Compiled Class Files & Packages
*.class
*.jar
*.war
*.ear

# Maven build directory
target/
pom.xml.tag
pom.xml.releaseBackup

# Gradle build directories
.gradle/
build/

# Exception: keep Gradle Wrapper JAR
!gradle/wrapper/gradle-wrapper.jar`
    },
    ide: {
      name: "IDE & Operating System Clutter",
      icon: Code,
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      content: `# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace

# JetBrains (IntelliJ, WebStorm, PyCharm)
.idea/
*.iml
*.iws

# Operating System Metadata
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
desktop.ini`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(stackTemplates[activeStack].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                <span className="text-cyan-400">Topic 11 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Boxes className="w-8 h-8 text-cyan-400" />
                Common <code className="text-cyan-300 font-mono text-xl sm:text-2xl">.gitignore</code> Templates
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
              <Sparkles className="w-3.5 h-3.5" /> Battle-Tested Ecosystem Blueprints
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Standardized Ignore Configurations Across Modern Tech Stacks
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Every programming language and development framework generates temporary artifacts—from 
              hundreds of megabytes of <code className="text-emerald-300 font-mono">node_modules/</code> in JavaScript, to 
              <code className="text-amber-300 font-mono">__pycache__/</code> in Python, and <code className="text-rose-300 font-mono">target/*.class</code> in Java. 
              Deploying proven, standardized templates ensures zero repository bloat and shields local developer IDE settings from polluting team codebases.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <Boxes className="w-4 h-4" /> Node.js & React
                </h3>
                <p className="text-slate-400 text-xs">
                  Filters <code className="text-emerald-400 font-mono">node_modules/</code>, build artifacts (<code className="text-emerald-400 font-mono">dist/</code>, <code className="text-emerald-400 font-mono">.next/</code>), and local logs.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> Python & Django
                </h3>
                <p className="text-slate-400 text-xs">
                  Blocks bytecode <code className="text-amber-400 font-mono">*.pyc</code>, virtual environments (<code className="text-amber-400 font-mono">.venv/</code>), and test caches.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <Code className="w-4 h-4" /> IDE & OS Clutter
                </h3>
                <p className="text-slate-400 text-xs">
                  Eliminates <code className="text-cyan-400 font-mono">.DS_Store</code>, <code className="text-cyan-400 font-mono">Thumbs.db</code>, and personal <code className="text-cyan-400 font-mono">.idea/</code> metadata.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE TEMPLATE PREVIEW & COPY ──────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Ecosystem Template Selector</h2>
              <p className="text-slate-400 text-sm">Select your tech stack and copy ready-to-use .gitignore configurations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Stack Selector Tabs */}
            <div className="lg:col-span-4 space-y-2">
              {Object.keys(stackTemplates).map((key) => {
                const item = stackTemplates[key];
                const Icon = item.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveStack(key)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      activeStack === key
                        ? "bg-cyan-500/10 border-cyan-400/50 shadow-lg shadow-cyan-500/10"
                        : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${activeStack === key ? "text-cyan-400" : "text-slate-400"}`} />
                      <span className="font-bold text-xs text-slate-200">{item.name}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.badge}`}>
                      Template
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Template Display Box */}
            <div className="lg:col-span-8 bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-cyan-300 font-mono">
                  {stackTemplates[activeStack].name} (.gitignore)
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Template"}
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto leading-relaxed max-h-80 overflow-y-auto">
                <pre>{stackTemplates[activeStack].content}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: THE LOCKFILE CONTROVERSY MATRIX ─────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The Lockfile Rule: Commit vs Ignore Matrix</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-300">
                  <th className="p-3 font-semibold">File Type</th>
                  <th className="p-3 font-semibold">Examples</th>
                  <th className="p-3 font-semibold">Should it be in .gitignore?</th>
                  <th className="p-3 font-semibold">Engineering Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-cyan-300">Dependency Directories</td>
                  <td className="p-3 font-mono text-[11px]">node_modules/, vendor/, .venv/</td>
                  <td className="p-3 text-rose-400 font-bold">YES (ALWAYS IGNORE)</td>
                  <td className="p-3 text-slate-300">Platform-dependent binaries, hundreds of megabytes in size.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-bold text-emerald-300">Package Lockfiles</td>
                  <td className="p-3 font-mono text-[11px]">package-lock.json, yarn.lock, pnpm-lock.yaml, poetry.lock, Cargo.lock</td>
                  <td className="p-3 text-emerald-400 font-bold">NO (ALWAYS COMMIT)</td>
                  <td className="p-3 text-slate-300">Guarantees 100% deterministic, reproducible builds across developer machines and CI runners.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-amber-300">Environment Secrets</td>
                  <td className="p-3 font-mono text-[11px]">.env, .env.local, id_rsa, serviceAccountKey.json</td>
                  <td className="p-3 text-rose-400 font-bold">YES (ALWAYS IGNORE)</td>
                  <td className="p-3 text-slate-300">Prevents catastrophic credential and private key leaks into git history.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-bold text-cyan-300">Environment Template</td>
                  <td className="p-3 font-mono text-[11px]">.env.example, .env.template</td>
                  <td className="p-3 text-emerald-400 font-bold">NO (ALWAYS COMMIT)</td>
                  <td className="p-3 text-slate-300">Documents required environment variable names with dummy placeholder values.</td>
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
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The 400MB GitHub Push Disaster</h2>
              <p className="text-slate-400 text-sm">Debangshu and Mahima learning why node_modules must never be committed</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> The Junior Incident
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Debangshu created a new React app with Vite and installed Tailwind and Axios. Without creating a <code className="text-cyan-300 font-mono">.gitignore</code> file, he typed <code className="text-amber-300 font-mono">git add .</code> and pushed to GitHub.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                The terminal took 12 minutes to push 28,000 files totaling 420MB. When Mahima tried to clone the repo on her laptop, the clone ran out of memory!
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> The Master's Cure
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sukanta Hui showed Debangshu: <em>"A Git repository stores the recipe (source code & package.json), NOT the cooked meal (node_modules)! Anyone can recreate the entire dependency tree in 5 seconds with <code>npm install</code>."</em>
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                They cleaned the repository history using <code className="text-cyan-300 font-mono">git-filter-repo</code>, reducing repository size from <strong>420MB to 180KB</strong>!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF TEMPLATES ───────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of .gitignore Templates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Adopt github/gitignore</span>
              <p className="text-slate-400">Never write templates from memory; copy battle-tested templates from github/gitignore.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Never Commit node_modules</span>
              <p className="text-slate-400">Always ignore dependency trees across Node, Python (`.venv`), and PHP (`vendor/`).</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Always Commit Lockfiles</span>
              <p className="text-slate-400">`package-lock.json` and `yarn.lock` must be committed to ensure reproducible builds.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Strip OS Metadata</span>
              <p className="text-slate-400">Always include `.DS_Store` and `Thumbs.db` across all repositories.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Selective VS Code Rules</span>
              <p className="text-slate-400">Ignore `.vscode/*` while keeping shared `settings.json` and `launch.json`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Preserve Gradle Wrapper</span>
              <p className="text-slate-400">Use `!gradle/wrapper/gradle-wrapper.jar` to allow `./gradlew` execution.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Composite via gitignore.io</span>
              <p className="text-slate-400">Use gitignore.io to merge Node + macOS + VSCode rules into one clean file.</p>
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
            <span className="text-xs text-slate-400 font-mono">topic11_files/gitignore_templates_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to verify a multi-language polyglot template ignoring <code className="text-emerald-300 font-mono">node_modules/</code>, <code className="text-amber-300 font-mono">__pycache__/</code>, <code className="text-rose-300 font-mono">target/</code>, and <code className="text-cyan-300 font-mono">.idea/</code>.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic11_files/gitignore_templates_lab.sh`}</pre>
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
                question: "Why do some developers recommend ignoring lockfiles for npm libraries but committing them for applications?",
                answer: "For end-user applications, lockfiles are essential to guarantee exact dependencies in production. For reusable open-source libraries published to npm, package managers install ranges specified in `dependencies`, so the lockfile is omitted by the consumer anyway."
              },
              {
                question: "How do I generate a .gitignore template using the command line?",
                answer: "You can run `npx gitignore node,macos,visualstudiocode > .gitignore` or `curl -sL https://www.toptal.com/developers/gitignore/api/node,python > .gitignore`."
              },
              {
                question: "If I add a template after committing 50 files, why aren't they ignored?",
                answer: "`.gitignore` only affects untracked files. You must run `git rm -r --cached .` followed by `git add .` and `git commit` to apply the ignore rules across all existing files."
              },
              {
                question: "Should I ignore SQLite database files (`*.sqlite3`) in Django/Rails apps?",
                answer: "Yes! SQLite files are binary local development databases that contain dynamic rows, causing massive git churn and potential data leaks if pushed to GitHub."
              },
              {
                question: "Can I ignore files on my computer only without editing the shared `.gitignore`?",
                answer: "Yes! Use `.git/info/exclude` (for this repository only) or `~/.gitignore_global` (for all repositories on your computer), covered in Topic 12."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 11 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Test your knowledge of standard language templates, lockfile conventions, and environment ignoring.
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
            <span className="text-xs text-slate-400 font-mono">topic11_files/topic11_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic11_gitignore_templates_notes.txt" />
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
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 10 (Ignoring Files)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 12 (Local Exclusions & Global gitignore) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
