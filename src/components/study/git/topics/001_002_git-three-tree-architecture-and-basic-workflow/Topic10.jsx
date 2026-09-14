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
  EyeOff,
  Slash,
  Ban,
  FileSpreadsheet,
  FileText
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic 10: Ignoring Files with .gitignore: Syntax rules, wildcards (*, ?), directory indicators (/), negation (!), and comments
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic10() {
  const [selectedRule, setSelectedRule] = useState("wildcard");

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 10;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const syntaxRules = {
    wildcard: {
      name: "Wildcards (*, ?)",
      pattern: "*.log\ntemp?.txt",
      matches: "Matches `debug.log`, `app.log`, and single-char variations like `temp1.txt`, `tempa.txt`.",
      desc: "`*` matches any string of characters; `?` matches exactly one character."
    },
    dir: {
      name: "Directory Indicator (trailing /)",
      pattern: "build/\nnode_modules/",
      matches: "Matches any folder named `build` or `node_modules` and all contents inside it recursively.",
      desc: "A trailing slash guarantees that only directories are matched, never a regular file named `build`."
    },
    root: {
      name: "Root Anchor (leading /)",
      pattern: "/dist\n/config.json",
      matches: "Matches `dist` or `config.json` strictly at repository root.",
      desc: "A leading slash prevents matching nested files like `src/components/config.json`."
    },
    glob: {
      name: "Nested Glob (**)",
      pattern: "**/logs\ndocs/**/*.pdf",
      matches: "Matches `logs` at any depth, and any `.pdf` file nested anywhere inside `docs/`.",
      desc: "`**` matches across zero or more directory hierarchy levels."
    },
    negation: {
      name: "Negation Exception (!)",
      pattern: "logs/*\n!logs/audit.log",
      matches: "Ignores all files inside `logs/` EXCEPT `audit.log` which remains tracked.",
      desc: "The `!` un-ignores a file that matched an earlier pattern (parent folder must not be ignored with `logs/`)."
    }
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
                <span className="text-cyan-400">Topic 10 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <EyeOff className="w-8 h-8 text-cyan-400" />
                Ignoring Files with <code className="text-cyan-300 font-mono text-xl sm:text-2xl">.gitignore</code>
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
              <Sparkles className="w-3.5 h-3.5" /> Hygiene & Security Sentinel
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Keeping Build Artifacts & Sensitive Secrets Out of Git
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              A clean repository contains source code and configuration—never compiled binaries, 
              ephemeral log files, or secret API credentials. The <code className="text-cyan-300 font-mono">.gitignore</code> file is your repository's 
              security firewall, instructing Git which files to intentionally ignore during staging and status queries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-rose-300 mb-1 flex items-center gap-2">
                  <Ban className="w-4 h-4" /> Secret Protection
                </h3>
                <p className="text-slate-400 text-xs">
                  Prevents committing database passwords, private keys, and `.env` files into public history.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <Slash className="w-4 h-4" /> Syntax Mastery
                </h3>
                <p className="text-slate-400 text-xs">
                  Master wildcards (`*`, `?`), directory anchors (`/`), double globs (`**`), and negation (`!`).
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> check-ignore Tool
                </h3>
                <p className="text-slate-400 text-xs">
                  Debug rule conflicts instantly using the diagnostic command <code className="text-emerald-400 font-mono">git check-ignore -v</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE SYNTAX EXPLORER ──────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Interactive .gitignore Syntax Explorer</h2>
              <p className="text-slate-400 text-sm">Select a rule category to inspect pattern matching behavior</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Rule Selector Buttons */}
            <div className="lg:col-span-4 space-y-2">
              {Object.keys(syntaxRules).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedRule(key)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedRule === key
                      ? "bg-cyan-500/10 border-cyan-400/50 shadow-lg shadow-cyan-500/10"
                      : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                  }`}
                >
                  <h4 className="font-bold text-xs text-slate-200">{syntaxRules[key].name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{syntaxRules[key].pattern.split("\n")[0]}</p>
                </button>
              ))}
            </div>

            {/* Rule Detail Card */}
            <div className="lg:col-span-8 bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-cyan-300 flex items-center justify-between border-b border-slate-800 pb-2">
                <span>{syntaxRules[selectedRule].name}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Rule Demonstration</span>
              </h3>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Example .gitignore Pattern:</span>
                <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-cyan-300 border border-slate-800 whitespace-pre-wrap">
                  {syntaxRules[selectedRule].pattern}
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Matching Behavior:</span>
                <p className="text-xs text-emerald-300 bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20">
                  {syntaxRules[selectedRule].matches}
                </p>
              </div>

              <div className="text-xs text-slate-400 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <strong className="text-slate-200">Rule Mechanism: </strong>
                {syntaxRules[selectedRule].desc}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: THE FULL SYNTAX RULES MATRIX ──────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The .gitignore Syntax Rules Cheat Sheet</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-300">
                  <th className="p-3 font-semibold">Pattern Syntax</th>
                  <th className="p-3 font-semibold">Rule Type</th>
                  <th className="p-3 font-semibold">Matches</th>
                  <th className="p-3 font-semibold">Does NOT Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-bold"># comment</td>
                  <td className="p-3">Comment</td>
                  <td className="p-3 text-slate-400">Ignored by parser</td>
                  <td className="p-3 text-slate-400">N/A</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-300 font-bold">*.log</td>
                  <td className="p-3">Asterisk Wildcard</td>
                  <td className="p-3">`error.log`, `src/api.log`, `.log`</td>
                  <td className="p-3 text-slate-400">`log.txt`, `logger.js`</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-bold">temp?.txt</td>
                  <td className="p-3">Question Wildcard</td>
                  <td className="p-3">`temp1.txt`, `tempa.txt`</td>
                  <td className="p-3 text-slate-400">`temp.txt`, `temp12.txt`</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-300 font-bold">dist/</td>
                  <td className="p-3">Trailing Slash</td>
                  <td className="p-3">Any folder named `dist` and all child files</td>
                  <td className="p-3 text-slate-400">A regular file named `dist`</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-bold">/config.json</td>
                  <td className="p-3">Leading Slash Anchor</td>
                  <td className="p-3">`config.json` at repo root only</td>
                  <td className="p-3 text-slate-400">`src/config.json`</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-300 font-bold">docs/**/*.pdf</td>
                  <td className="p-3">Double Asterisk Glob</td>
                  <td className="p-3">`docs/a.pdf`, `docs/v1/user/guide.pdf`</td>
                  <td className="p-3 text-slate-400">`src/guide.pdf`</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-bold">!logs/audit.log</td>
                  <td className="p-3">Negation Rule</td>
                  <td className="p-3">Re-includes `logs/audit.log` when `logs/*` is ignored</td>
                  <td className="p-3 text-slate-400">Other log files</td>
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
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The "Already-Tracked" Trap</h2>
              <p className="text-slate-400 text-sm">Sachin discovering why `.env` was still showing up in git status</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> The Junior Pitfall
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sachin committed `.env` containing a database password last week. Today, realizing the security danger, he added <code className="text-cyan-300 font-mono">.env</code> to <code className="text-cyan-300 font-mono">.gitignore</code>.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                When he edited `.env`, <code className="text-cyan-300 font-mono">git status -s</code> still showed <code className="text-amber-400 font-mono"> M .env</code>! Sachin asked: <em>"Why is Git ignoring my .gitignore rule?"</em>
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Sukanta's Untracking Solution
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sukanta Hui explained: <em>"<code>.gitignore</code> only stops UNTRACKED files from being added. Because <code>.env</code> was already committed, Git continues tracking it! You must untrack it from Git index first."</em>
              </p>
              <div className="bg-slate-900 p-3 rounded font-mono text-xs text-cyan-300 space-y-1">
                <div># 1. Untrack from index while preserving physical file:</div>
                <div>git rm --cached .env</div>
                <div># 2. Commit the untracking:</div>
                <div>git commit -m "chore: stop tracking .env file"</div>
              </div>
              <p className="text-slate-300 text-xs">
                From that moment forward, `.gitignore` successfully ignored all future changes to `.env`!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF .gitignore ───────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of .gitignore Rules</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Ignore .env on Day 1</span>
              <p className="text-slate-400">Always add `.env` and `.env.*` to `.gitignore` on the very first commit.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Commit .env.example</span>
              <p className="text-slate-400">Keep `.env.example` committed with dummy keys to document required variables.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Untrack with git rm --cached</span>
              <p className="text-slate-400">If a file was tracked before being ignored, run `git rm --cached`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Debug with check-ignore -v</span>
              <p className="text-slate-400">Run `git check-ignore -v &lt;file&gt;` to pinpoint the exact matching rule.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Trailing Slash for Dirs</span>
              <p className="text-slate-400">Always append `/` to folder patterns (`dist/`, `build/`, `node_modules/`).</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Parent Dir Negation Rule</span>
              <p className="text-slate-400">Use `dir/*` instead of `dir/` if you plan to re-include files with `!dir/file`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Version Control .gitignore</span>
              <p className="text-slate-400">Always commit `.gitignore` so all developers share identical rules.</p>
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
            <span className="text-xs text-slate-400 font-mono">topic10_files/gitignore_syntax_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to construct nested directories, test wildcards and negation exceptions, and practice <code className="text-cyan-300 font-mono">git check-ignore -v</code>.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic10_files/gitignore_syntax_lab.sh`}</pre>
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
                question: "Can I use curly brace expansion like `*.{jpg,png}` in `.gitignore`?",
                answer: "No. Git's fnmatch pattern engine does not support curly brace expansion `{}`. You must write each file extension on its own separate line (`*.jpg` and `*.png`)."
              },
              {
                question: "How do I see all ignored files currently on my disk?",
                answer: "Run `git status --ignored` (or `git status -s --ignored`). Ignored files will be marked with the `!!` status prefix."
              },
              {
                question: "What is the difference between `.gitignore` and `.git/info/exclude`?",
                answer: "`.gitignore` is tracked and committed in repository history, applying to everyone on the team. `.git/info/exclude` is local to your machine only and never pushed to GitHub."
              },
              {
                question: "Can `.gitignore` ignore a file that is already committed in the repo?",
                answer: "No! Git only applies `.gitignore` rules to untracked files. To ignore an already committed file, you must first run `git rm --cached <file>` and commit the removal."
              },
              {
                question: "How do I ignore an entire folder except for one file inside it?",
                answer: "Ignore the directory contents with `folder/*` (not `folder/`), and then add an exception rule `!folder/keep.txt`."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 10 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Test your understanding of `.gitignore` syntax rules, wildcard matching, negation caveats, and debugging commands.
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
            <span className="text-xs text-slate-400 font-mono">topic10_files/topic10_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic10_gitignore_notes.txt" />
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
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 9 (Inspecting Diff)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 11 (Common .gitignore Templates) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
