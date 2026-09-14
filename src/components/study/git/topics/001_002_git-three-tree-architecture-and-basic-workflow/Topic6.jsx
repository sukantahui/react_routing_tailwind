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
  CheckSquare,
  MessageSquare,
  Edit,
  History,
  FileText
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
 * Topic 6: Creating Commits: git commit -m vs opening full editor for descriptive multi-line commit messages
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic6() {
  const [editorStyle, setEditorStyle] = useState("editor");

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 6;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
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
                <span className="text-slate-400">Module 001_002</span>
                <span>/</span>
                <span className="text-cyan-400">Topic 6 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-cyan-400" />
                Creating Commits: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">git commit -m vs Full Editor</code>
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
              <Sparkles className="w-3.5 h-3.5" /> Immutable History Crafting
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Commits as Living Technical Documentation
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              A Git commit is not simply a checkpoint to save work; it is an immutable technical document. 
              While <code className="text-cyan-300 font-mono">git commit -m "msg"</code> is convenient for trivial edits, 
              senior engineers rely on the full editor (<code className="text-emerald-300 font-mono">git commit</code>) to construct structured, 
              multi-line explanations articulating the business rationale, architectural trade-offs, and reference tickets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> The 50/72 Rule
                </h3>
                <p className="text-slate-400 text-xs">
                  50-character imperative subject line, blank line, and 72-character wrapped body paragraphs.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Configured Editors
                </h3>
                <p className="text-slate-400 text-xs">
                  Configure <code className="text-emerald-400 font-mono">core.editor</code> with VS Code (`code --wait`) or Vim for effortless writing.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2">
                  <History className="w-4 h-4" /> Searchability & Blame
                </h3>
                <p className="text-slate-400 text-xs">
                  High-quality messages accelerate git log search, code reviews, and bug root-cause analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: COMPARISON INTERFACE ────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">CLI Flag (-m) vs Full Editor Mode</h2>
              <p className="text-slate-400 text-sm">Comparing workflows, speed, and documentation depth</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* View Mode Selector */}
            <div className="lg:col-span-4 space-y-3">
              <button
                onClick={() => setEditorStyle("cli")}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  editorStyle === "cli"
                    ? "bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10"
                    : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-cyan-300">git commit -m "..."</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Fast CLI</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">Single/Dual Flag Invocation</h4>
                <p className="text-[11px] text-slate-400 mt-1">Directly supplied on the command-line interface.</p>
              </button>

              <button
                onClick={() => setEditorStyle("editor")}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  editorStyle === "editor"
                    ? "bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10"
                    : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-emerald-300">git commit (Full Editor)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    Pro Standard
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">Interactive Editor Workflow</h4>
                <p className="text-[11px] text-slate-400 mt-1">Launches VS Code / Vim for rich multi-paragraph messages.</p>
              </button>

              <button
                onClick={() => setEditorStyle("amend")}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  editorStyle === "amend"
                    ? "bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10"
                    : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">git commit --amend</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                    Fix HEAD
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">Amending the Most Recent Commit</h4>
                <p className="text-[11px] text-slate-400 mt-1">Updates the last commit snapshot or message in place.</p>
              </button>
            </div>

            {/* Dynamic View Pane */}
            <div className="lg:col-span-8 bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
              {editorStyle === "cli" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> CLI Flags: Quick vs Multi-line
                  </h3>
                  <p className="text-xs text-slate-300">
                    You can pass multiple <code className="text-cyan-300 font-mono">-m</code> flags to generate structured subject and body paragraphs without leaving the shell:
                  </p>
                  <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
                    <pre>{`# Single-line commit:
git commit -m "docs: update API endpoints in README"

# Dual-flag commit (Subject + Body):
git commit -m "fix(billing): correct round-off discrepancy in GST calculation" \\
  -m "Calculations with 3 decimal places caused a 1-paisa mismatch on large invoices. Rounded subtotal before tax multiplication." \\
  -m "Fixes #104"`}</pre>
                  </div>
                </div>
              )}

              {editorStyle === "editor" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                    <Edit className="w-4 h-4" /> The 50/72 Professional Editor Template
                  </h3>
                  <p className="text-xs text-slate-300">
                    When you run <code className="text-emerald-300 font-mono">git commit</code> without flags, Git launches your editor with this structure:
                  </p>
                  <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto leading-relaxed">
                    <pre>{`feat(auth): implement JWT refresh token rotation mechanism

Refresh tokens previously had infinite lifespans, introducing token
theft risks. This commit implements rotating single-use refresh tokens
stored in Redis with a 7-day expiration policy.

- Rotates refresh token upon every access token refresh call
- Invalidates family of tokens if reused token is detected
- Adds automated unit tests for race condition mitigation

Closes #342, Refs #201

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch main
# Changes to be committed:
#   modified:   src/auth/jwt.service.ts
#   new file:   src/auth/redis-store.ts`}</pre>
                  </div>
                </div>
              )}

              {editorStyle === "amend" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <History className="w-4 h-4" /> Amending the Latest Commit (git commit --amend)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Forgot to stage a file or noticed a typo in your last commit message?
                  </p>
                  <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
                    <pre>{`# 1. Stage the missing file:
git add src/forgotten-file.js

# 2. Amend into the existing HEAD commit without creating a duplicate commit:
git commit --amend

# Or amend with no message change:
git commit --amend --no-edit`}</pre>
                  </div>
                  <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg text-xs text-amber-300">
                    <strong>Golden Rule:</strong> NEVER amend commits that have already been pushed to a shared remote branch (e.g. main/master)!
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: THE 50/72 COMMIT MATRIX ──────────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckSquare className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 5-Point Anatomy of a Masterpiece Commit</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Subject Line</span>
              <p className="text-slate-400">&lt;= 50 characters, capitalized, imperative mood, no trailing period.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold">2. Blank Separator</span>
              <p className="text-slate-400">Strictly 1 empty blank line separating subject from the body.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-amber-400 font-bold">3. The "Why" Body</span>
              <p className="text-slate-400">Explain the business problem and why this solution was chosen (wrapped at 72 chars).</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-purple-400 font-bold">4. Key Bullet Points</span>
              <p className="text-slate-400">List non-obvious nuances, edge cases, and test updates.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-blue-400 font-bold">5. Issue Footers</span>
              <p className="text-slate-400">Link tracking tickets (e.g., `Closes #123`, `Refs #456`).</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: CLASSROOM MENTORSHIP & REAL-WORLD SCENARIO ────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The 6-Month Mystery</h2>
              <p className="text-slate-400 text-sm">Sachin, Tuhina, and Sukanta Hui reviewing production audit logs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> The Junior Anti-Pattern
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                During a client project at Barrackpore, a client reported that invoice tax totals were calculating 0% on weekend transactions. 
                Tuhina ran <code className="text-cyan-300 font-mono">git log --oneline</code> and found 5 commits from Sachin:
              </p>
              <div className="bg-slate-900 p-2 rounded text-xs font-mono text-slate-400">
                <div>a1b2c3d fix</div>
                <div>d4e5f6g update tax</div>
                <div>h7i8j9k fix again</div>
                <div>l0m1n2o changes</div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Nobody could identify which commit introduced the weekend condition without reading 2,000 lines of raw diffs.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> The Master's Standard
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sukanta Hui trained the class: <em>"Commit messages are letters to your future self and your teammates at 2:00 AM when production is broken! If you write a clear subject and explain WHY in the body, any engineer can understand the system in seconds."</em>
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sachin learned to configure <code className="text-cyan-300 font-mono">core.editor</code> and adopt the 50/72 standard.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF COMMIT MESSAGES ─────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Commit Messages</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Use Imperative Mood</span>
              <p className="text-slate-400">Write "Fix bug", not "Fixed bug" or "Fixes bug".</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Cap Subject at 50 chars</span>
              <p className="text-slate-400">Ensures concise summaries visible without truncation in git log.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Always Add Blank Line</span>
              <p className="text-slate-400">Line 2 must always be empty to separate subject from body.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Explain WHY, not WHAT</span>
              <p className="text-slate-400">The diff shows WHAT changed; the commit message explains WHY it changed.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Wrap Body at 72 chars</span>
              <p className="text-slate-400">Prevents horizontal scrollbar ugly wrapping in terminal pagers.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Never Amend Shared History</span>
              <p className="text-slate-400">Only `git commit --amend` local unpushed commits.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Reference Issue Tickets</span>
              <p className="text-slate-400">Include `Closes #123` to link code commits directly to project trackers.</p>
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
            <span className="text-xs text-slate-400 font-mono">topic6_files/git_commit_messages_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to practice multi-flag commits, inspect commit objects with <code className="text-cyan-300 font-mono">git cat-file -p HEAD</code>, and test <code className="text-cyan-300 font-mono">git commit --amend</code>.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic6_files/git_commit_messages_lab.sh`}</pre>
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
                question: "How do I configure VS Code to automatically wrap lines at 72 characters for commit messages?",
                answer: "In VS Code settings (`settings.json`), set `\"[git-commit]\": { \"editor.rulers\": [50, 72], \"editor.wordWrap\": \"wordWrapColumn\", \"editor.wordWrapColumn\": 72 }`. This places guide rulers directly in your editor."
              },
              {
                question: "What happens if I accidentally close the editor without typing a message?",
                answer: "Git detects that the message file is empty and aborts the commit without altering the repository or index."
              },
              {
                question: "Can I undo `git commit --amend` if I made a mistake?",
                answer: "Yes! Git records old commit hashes in the Reference Log (`git reflog`). You can restore the previous commit using `git reset --hard HEAD@{1}`."
              },
              {
                question: "Is there any difference between `git commit -m 'title'` and typing 'title' in the full editor?",
                answer: "For a single line, both produce identical commit objects. The difference is that editors encourage multi-paragraph explanations and display the staged files list as reference while typing."
              },
              {
                question: "What does `git commit -v` do?",
                answer: "The `-v` (verbose) flag includes the full unified diff of all staged changes inside the commented section of the commit editor, allowing you to review your code as you write the explanation."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 6 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Evaluate your knowledge of commit message formatting rules, CLI flags, amending, and editor configuration.
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
            <span className="text-xs text-slate-400 font-mono">topic6_files/topic6_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic6_git_commit_messages_notes.txt" />
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
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 5 (Patch Staging)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 7 (The Philosophy of Atomic Commits) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
