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
  Scissors,
  SplitSquareVertical,
  Check,
  X,
  Edit3
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic 5: Interactive Staging: Staging partial file chunks using git add -p (patch mode)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic5() {
  const [activeKey, setActiveKey] = useState("y");
  const [stagedHunks, setStagedHunks] = useState({ hunk1: false, hunk2: false });

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 5;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const keyMap = {
    y: {
      key: "y",
      name: "Stage this hunk (Yes)",
      desc: "Transfers the currently displayed diff hunk from the working tree into the Staging Index.",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    },
    n: {
      key: "n",
      name: "Skip this hunk (No)",
      desc: "Leaves the hunk unstaged in your working tree without including it in the upcoming commit.",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30"
    },
    s: {
      key: "s",
      name: "Split into smaller hunks",
      desc: "Automatically subdivides the hunk into smaller hunks if separated by unchanged context lines.",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
    },
    e: {
      key: "e",
      name: "Edit hunk manually",
      desc: "Opens your configured editor (VS Code, Vim, Nano) so you can manually manipulate exact diff lines before staging.",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30"
    },
    q: {
      key: "q",
      name: "Quit patch mode",
      desc: "Immediately exits interactive staging. Any hunks already staged with 'y' remain safely staged in the index.",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30"
    },
    a: {
      key: "a",
      name: "Stage this and all remaining",
      desc: "Stages this hunk and all remaining hunks across the current file.",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30"
    },
    d: {
      key: "d",
      name: "Skip this and all remaining",
      desc: "Skips this hunk and all remaining hunks across the current file.",
      badge: "bg-slate-700 text-slate-300 border-slate-600"
    }
  };

  const toggleHunk = (hunkKey) => {
    setStagedHunks((prev) => ({ ...prev, [hunkKey]: !prev[hunkKey] }));
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
                <span className="text-cyan-400">Topic 5 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Scissors className="w-8 h-8 text-cyan-400" />
                Interactive Staging: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">git add -p</code>
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
              <Sparkles className="w-3.5 h-3.5" /> Granular Surgical Precision
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Surgical Staging: When One File Contains Multiple Concerns
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              During real-world development, you often fix a quick typo in a component, add temporary debugging logs, 
              and implement a new calculation in the same file. Typing <code className="text-amber-300 font-mono">git add file.js</code> stages 
              everything together—polluting your history with debug statements. 
              <code className="text-cyan-300 font-mono mx-1">git add -p</code> (patch mode) gives you surgical power to review individual diff hunks and stage only clean, atomic changes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <SplitSquareVertical className="w-4 h-4" /> Hunk Decomposition
                </h3>
                <p className="text-slate-400 text-xs">
                  Breaks files into logical diff chunks (hunks) that can be staged or rejected independently.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Debug Clutter Immunity
                </h3>
                <p className="text-slate-400 text-xs">
                  Keep <code className="text-emerald-300 font-mono">console.log</code> or mock data in your working tree while committing pure production code.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-purple-300 mb-1 flex items-center gap-2">
                  <Edit3 className="w-4 h-4" /> Line-by-Line Editing
                </h3>
                <p className="text-slate-400 text-xs">
                  Use the manual hunk editor (`e`) to stage individual lines even within tightly coupled blocks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE PATCH SIMULATOR ──────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Interactive Patch Simulator: `billing.js`</h2>
              <p className="text-slate-400 text-sm">Experience how `git add -p` segregates production features from temporary debug logs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Hunk Review Pane */}
            <div className="lg:col-span-7 space-y-4">
              {/* Hunk 1 */}
              <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    Hunk 1 of 2: Discount Logic (Feature)
                  </span>
                  <button
                    onClick={() => toggleHunk("hunk1")}
                    className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      stagedHunks.hunk1
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {stagedHunks.hunk1 ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    {stagedHunks.hunk1 ? "Staged in Index (y)" : "Unstaged (n)"}
                  </button>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
                  <div className="text-slate-500 font-bold">@@ -1,5 +1,7 @@</div>
                  <div className="text-slate-400"> function calculateSubtotal(items) {"{"}</div>
                  <div className="text-emerald-400 bg-emerald-950/40 px-1">+  // 10% discount for orders over ₹1000</div>
                  <div className="text-emerald-400 bg-emerald-950/40 px-1">+  const gross = items.reduce((sum, item) =&gt; sum + item.price, 0);</div>
                  <div className="text-emerald-400 bg-emerald-950/40 px-1">+  return gross &gt; 1000 ? gross * 0.9 : gross;</div>
                  <div className="text-slate-400"> {"}"}</div>
                </div>
              </div>

              {/* Hunk 2 */}
              <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    Hunk 2 of 2: Debugging Log (Temporary)
                  </span>
                  <button
                    onClick={() => toggleHunk("hunk2")}
                    className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      stagedHunks.hunk2
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {stagedHunks.hunk2 ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    {stagedHunks.hunk2 ? "Staged in Index (y)" : "Unstaged (n)"}
                  </button>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
                  <div className="text-slate-500 font-bold">@@ -12,4 +14,5 @@</div>
                  <div className="text-slate-400"> function printReceipt(invoice) {"{"}</div>
                  <div className="text-emerald-400 bg-emerald-950/40 px-1">+  console.log("DEBUG: raw invoice payload", invoice);</div>
                  <div className="text-slate-400">   console.log("Invoice ID: " + invoice.id);</div>
                  <div className="text-slate-400"> {"}"}</div>
                </div>
              </div>
            </div>

            {/* Status & Index Result */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> Resulting Repository Three-Tree State
              </h3>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Staging Area (Index) will commit:</span>
                  {stagedHunks.hunk1 || stagedHunks.hunk2 ? (
                    <ul className="list-disc list-inside text-emerald-400 space-y-1">
                      {stagedHunks.hunk1 && <li>Discount calculation logic (Clean Feature)</li>}
                      {stagedHunks.hunk2 && <li className="text-rose-400">⚠️ Debug console.log statement!</li>}
                    </ul>
                  ) : (
                    <span className="text-slate-500 italic">No hunks staged yet (Index is empty).</span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Simulated `git status -s`:</span>
                  <div className="font-mono text-cyan-300 font-bold bg-slate-900 p-2 rounded">
                    {stagedHunks.hunk1 && stagedHunks.hunk2 && "M  billing.js (Both staged)"}
                    {stagedHunks.hunk1 && !stagedHunks.hunk2 && "MM billing.js (Hunk 1 Staged, Hunk 2 Unstaged)"}
                    {!stagedHunks.hunk1 && stagedHunks.hunk2 && "MM billing.js (Hunk 2 Staged, Hunk 1 Unstaged)"}
                    {!stagedHunks.hunk1 && !stagedHunks.hunk2 && " M billing.js (Fully unstaged)"}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <strong className="text-cyan-300">Sukanta Hui's Ideal Workflow:</strong> Stage only Hunk 1 (<code className="text-emerald-300 font-mono">y</code>), skip Hunk 2 (<code className="text-amber-300 font-mono">n</code>), commit the feature cleanly, and then discard debug logs with <code className="text-cyan-300 font-mono">git restore billing.js</code>!
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HUNK KEYBOARD COMMAND REFERENCE ──────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The `git add -p` Key Command Matrix</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.values(keyMap).map((k) => (
              <button
                key={k.key}
                onClick={() => setActiveKey(k.key)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeKey === k.key
                    ? "bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10"
                    : "bg-slate-950 border-slate-800 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm font-bold text-cyan-300 px-2 py-0.5 rounded bg-slate-800">
                    [{k.key}]
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${k.badge}`}>
                    {k.key === "y" || k.key === "a" ? "Stage" : "Skip / Edit"}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{k.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{k.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* ─── SECTION 5: CLASSROOM MENTORSHIP & REAL-WORLD SCENARIO ────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The Polluted Pull Request</h2>
              <p className="text-slate-400 text-sm">Susmita and Abhronila learning patch mode for code review excellence</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> The Junior Pitfall
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Susmita submitted a pull request for the Barrackpore Hospital billing module. The code reviewer found 14 instances of <code className="text-rose-300 font-mono">console.log("here 1")</code>, <code className="text-rose-300 font-mono">alert("test")</code>, and an unrelated formatting change across 300 lines of code.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                The pull request was promptly rejected: <em>"Please clean your commit history before requesting review."</em> Susmita asked: <em>"Do I have to re-type all my code?"</em>
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Sukanta's Mentorship Technique
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sukanta Hui demonstrated <code className="text-cyan-300 font-mono">git add -p</code>:
                <em>"Whenever you have mixed concerns in a file, run <code>git add -p</code>. Press <code>y</code> on your billing logic, press <code>n</code> on your debug logs. Commit your clean billing logic. Then run <code>git restore .</code> to wipe the remaining debug logs in one keystroke!"</em>
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Susmita's PR was approved within 5 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF PATCH STAGING ──────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Interactive Staging</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Split Before Edit</span>
              <p className="text-slate-400">Always try pressing `s` to split complex hunks before resorting to manual editing (`e`).</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Intent-to-Add for New Files</span>
              <p className="text-slate-400">Run `git add -N &lt;newfile&gt;` first if you want to use patch mode on brand new untracked files.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Verify Staged Diff</span>
              <p className="text-slate-400">After exiting patch mode, run `git diff --staged` to verify exactly what was captured.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Safe Exit with q</span>
              <p className="text-slate-400">Pressing `q` safely exits patch mode while preserving all hunks already accepted with `y`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Never Delete Context Lines</span>
              <p className="text-slate-400">In the `e` patch editor, never delete lines starting with a space (context lines).</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Patch Discard with restore -p</span>
              <p className="text-slate-400">Use `git restore -p` to selectively discard bad hunks without losing good code.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Atomic Commit Foundation</span>
              <p className="text-slate-400">One logical purpose per commit. Use patch mode to separate fixes from features.</p>
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
            <span className="text-xs text-slate-400 font-mono">topic5_files/git_patch_staging_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to generate multiple hunks inside <code className="text-cyan-300 font-mono">billing.js</code> and practice hunk segregation.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic5_files/git_patch_staging_lab.sh`}</pre>
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
                question: "Why does Git say 'No changes' when I run `git add -p` on a new file?",
                answer: "Because Git tracks diffs against the index. A brand-new untracked file does not exist in the index. Run `git add -N <file>` (intent-to-add) first to create an empty index placeholder, then `git add -p` will work seamlessly."
              },
              {
                question: "Can I use `git add -p` inside GUI tools like VS Code?",
                answer: "Yes! In VS Code's Source Control tab, you can click on any file diff and click 'Stage Selected Ranges' or 'Stage Hunk' in the editor gutter, which runs the exact same mechanism under the hood."
              },
              {
                question: "If I press `q` in the middle of a 10-hunk file, do I lose the 3 hunks I staged earlier?",
                answer: "No! `q` exits immediately, but all hunks previously accepted with `y` remain safely staged in the index."
              },
              {
                question: "What is the difference between `git add -p` and `git checkout -p` / `git restore -p`?",
                answer: "`git add -p` moves hunks from working tree into the Staging Index (preparing to commit). `git restore -p` DISCARDS hunks from the working tree permanently, reverting them to the last commit."
              },
              {
                question: "Why is `s` (split) sometimes unavailable during patch mode?",
                answer: "Git can only auto-split a hunk if there are lines of unchanged context code between the two modifications. If two edits touch adjacent consecutive lines, Git cannot determine where to split, requiring you to use `e` (manual hunk edit)."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 5 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Validate your mastery of interactive patch mode, keyboard shortcut semantics, and hunk editing.
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
            <span className="text-xs text-slate-400 font-mono">topic5_files/topic5_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic5_git_add_patch_notes.txt" />
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
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 4 (Staging Variations)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 6 (Creating Commits: git commit -m vs Full Editor) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
