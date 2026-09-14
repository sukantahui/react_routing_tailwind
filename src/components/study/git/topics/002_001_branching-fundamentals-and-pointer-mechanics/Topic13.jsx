import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
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
  Database,
  Eye,
  Trash2,
  Sliders,
  Check,
  GitBranch,
  GitCommit,
  FileText,
  Bookmark,
  Terminal,
  Activity,
  UserCheck
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic 13: Classroom Experiment: Sachin and Mahima inspecting .git/refs/heads/ in the terminal to observe pointer movement after commits
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic13() {
  const [activeStep, setActiveStep] = useState(1);

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 13;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const stepsData = {
    1: {
      stepTitle: "Step 1: Sachin creates Baseline Commit C1 on 'main'",
      command: "$ echo 'AccoTax v1' > ledger.txt && git commit -m 'Commit C1'",
      mainSha: "7a8b9c0 (Commit C1)",
      featureSha: "Does not exist yet",
      headPointsTo: "ref: refs/heads/main",
      analysis: "A single 41-byte text file .git/refs/heads/main is created containing the SHA of C1."
    },
    2: {
      stepTitle: "Step 2: Mahima creates 'feature-gst' branch without switching",
      command: "$ git branch feature-gst",
      mainSha: "7a8b9c0 (Commit C1)",
      featureSha: "7a8b9c0 (Commit C1 - IDENTICAL!)",
      headPointsTo: "ref: refs/heads/main",
      analysis: "Git writes a new 41-byte file .git/refs/heads/feature-gst containing the EXACT SAME SHA as main!"
    },
    3: {
      stepTitle: "Step 3: Mahima switches to 'feature-gst' and creates Commit C2",
      command: "$ git switch feature-gst && git commit -m 'Commit C2: GST calc'",
      mainSha: "7a8b9c0 (STILL Commit C1!)",
      featureSha: "3f4a5b6 (ADVANCED to Commit C2!)",
      headPointsTo: "ref: refs/heads/feature-gst",
      analysis: "main remains frozen at C1. Only .git/refs/heads/feature-gst updates its 40-character text content."
    },
    4: {
      stepTitle: "Step 4: Sachin switches back to 'main' and creates Commit C3",
      command: "$ git switch main && git commit -m 'Commit C3: header update'",
      mainSha: "9e8d7c6 (ADVANCED to Commit C3!)",
      featureSha: "3f4a5b6 (POINTS to Commit C2)",
      headPointsTo: "ref: refs/heads/main",
      analysis: "Branch divergence complete! Two independent text files pointing to divergent DAG commit nodes."
    }
  };

  const currentStepInfo = stepsData[activeStep];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 13 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Classroom Case Study: Sachin & Mahima Inspecting <code className="text-cyan-300 font-mono text-lg">.git/refs/heads/</code>
              </h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white transition shadow-lg shadow-cyan-950/50"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: TOPIC OVERVIEW & HIGH-LEVEL INTRO ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-950/80 border border-cyan-800/60 rounded-xl text-cyan-400 mt-1">
              <Activity className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Live Classroom Investigation</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Demystifying Pointer Movement Through Direct Terminal Forensics
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                To bridge theoretical understanding and low-level filesystem realities, students <strong>Sachin Sharma</strong> and <strong>Mahima Ghosh</strong> at <strong>Coder & AccoTax (Barrackpore)</strong> conducted a live terminal experiment under the guidance of lead instructor <strong>Sukanta Hui</strong>.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                By inspecting the raw byte contents of <code className="text-cyan-300 font-mono">.git/refs/heads/</code> before and after each commit, they proved firsthand that branches are not heavy directory duplicates, but elegant 41-byte movable pointers in a directed acyclic graph.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-950 border border-cyan-800 rounded-lg text-cyan-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-cyan-200">
              Explain Like I'm 10 (ELI10): Watching the Magnetic Clock Hands Move
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              During the session at AccoTax Barrackpore, <strong>Sukanta Hui</strong> placed an analog clock face on the whiteboard:
            </p>

            <div className="p-4 bg-slate-950/80 border border-cyan-900/50 rounded-xl space-y-2 my-2">
              <p className="text-xs text-slate-300">
                "Sachin, you hold the green hand labeled <strong>'main'</strong>. Mahima, you hold the blue hand labeled <strong>'feature'</strong>. At 12:00 (Commit C1), both your clock hands overlap on the exact same number."
              </p>
              <p className="text-xs text-emerald-300">
                "When Mahima moves her hand to 1:00 (Commit C2), Sachin's green hand stays pointing at 12:00. When Sachin moves to 2:00 (Commit C3), you now have two hands pointing to different numbers. Did you have to buy two separate clocks? No! It's one clock face with two lightweight hands!"
              </p>
            </div>

            <p className="italic text-slate-400 border-l-2 border-cyan-500 pl-3">
              "Mahima exclaimed: 'The clock face is the object database, and the hands are our 41-byte branch files!' Exactly." — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE STEP-BY-STEP CASE STUDY VIEWER ───────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Classroom Step-by-Step Walkthrough</span>
              <h3 className="text-xl font-bold text-white">Live Investigation Protocol</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeStep === step
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Step {step}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Details */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
              <span className="font-bold text-white text-sm">{currentStepInfo.stepTitle}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                Active Step {activeStep} of 4
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-slate-500">Terminal Action:</span>
              <p className="text-cyan-300 font-bold">{currentStepInfo.command}</p>
            </div>

            {/* Filesystem Inspector Table */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 font-sans">.git/refs/heads/main</span>
                <p className="text-emerald-400 font-bold">{currentStepInfo.mainSha}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 font-sans">.git/refs/heads/feature-gst</span>
                <p className="text-cyan-400 font-bold">{currentStepInfo.featureSha}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 font-sans">.git/HEAD (Symref)</span>
                <p className="text-purple-400 font-bold">{currentStepInfo.headPointsTo}</p>
              </div>
            </div>

            <p className="text-slate-300 font-sans text-xs leading-relaxed pt-2 border-t border-slate-800">
              <strong>Forensic Insight:</strong> {currentStepInfo.analysis}
            </p>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Dynamic Pointer Advancement Across Experiment Steps
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="dagArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                </defs>

                {/* Commit C1 */}
                <circle cx="150" cy="120" r="20" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="142" y="125" fill="#a7f3d0" fontWeight="bold">C1</text>
                <text x="125" y="155" fill="#64748b" fontSize="9">7a8b9c0</text>

                {/* Commit C2 (Mahima's Feature) */}
                {activeStep >= 3 && (
                  <>
                    <path d="M 170 110 L 330 65" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#dagArrow)" />
                    <circle cx="350" cy="65" r="20" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                    <text x="342" y="70" fill="#a5f3fc" fontWeight="bold">C2</text>
                    <text x="325" y="95" fill="#64748b" fontSize="9">3f4a5b6</text>
                  </>
                )}

                {/* Commit C3 (Sachin's Main) */}
                {activeStep >= 4 && (
                  <>
                    <path d="M 170 130 L 330 175" stroke="#10b981" strokeWidth="2" markerEnd="url(#dagArrow)" />
                    <circle cx="350" cy="175" r="20" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                    <text x="342" y="180" fill="#a7f3d0" fontWeight="bold">C3</text>
                    <text x="325" y="205" fill="#64748b" fontSize="9">9e8d7c6</text>
                  </>
                )}

                {/* Step Markers & Explanations */}
                <rect x="520" y="30" width="300" height="170" rx="8" fill="#0f172a" stroke="#334155" />
                <text x="540" y="55" fill="#38bdf8" fontWeight="bold" fontSize="13">Classroom Log Analysis</text>
                <text x="540" y="85" fill="#cbd5e1" fontSize="11">
                  • Step 1: main points to C1
                </text>
                <text x="540" y="110" fill="#cbd5e1" fontSize="11">
                  • Step 2: feature-gst also points to C1
                </text>
                <text x="540" y="135" fill="#cbd5e1" fontSize="11">
                  • Step 3: feature-gst moves to C2 (main frozen)
                </text>
                <text x="540" y="160" fill="#cbd5e1" fontSize="11">
                  • Step 4: main moves to C3 (Divergence!)
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FORENSIC COMMANDS SUMMARY ────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Commands Used in Sachin & Mahima's Investigation</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Command</th>
                  <th className="p-3 font-semibold">Target File / Query</th>
                  <th className="p-3 font-semibold text-cyan-400">Classroom Finding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">cat .git/refs/heads/main</td>
                  <td className="p-3 text-slate-400">Branch Ref File</td>
                  <td className="p-3 font-sans text-slate-300">Outputs 40-char SHA of main's latest commit.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">cat .git/HEAD</td>
                  <td className="p-3 text-slate-400">Symref File</td>
                  <td className="p-3 font-sans text-slate-300">Shows which branch ref is currently active.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-emerald-400 font-bold">git rev-parse HEAD</td>
                  <td className="p-3 text-slate-400">Plumbing Resolver</td>
                  <td className="p-3 font-sans text-slate-300">Resolves the symref chain directly to commit hash.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-purple-400 font-bold">git log --graph --oneline --all</td>
                  <td className="p-3 text-slate-400">DAG Visualizer</td>
                  <td className="p-3 font-sans text-slate-300">Renders the full divergent commit tree in ASCII.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL DRILL ─────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Replicate the Experiment Locally</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Run watch command to monitor .git/refs/heads live</span>
              <p className="text-cyan-400">$ watch -n 1 'cat .git/refs/heads/* .git/HEAD'</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. In another terminal tab, create commits and switch branches</span>
              <p className="text-cyan-400">$ git switch -c feature-gst</p>
              <p className="text-cyan-400">$ git commit -m 'test commit'</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="Watching Sachin and Mahima's faces light up when they realized that branching is just writing 40 characters to a text file was priceless. Once you demystify Git's plumbing, you will never be afraid of branch divergence or merge conflicts again."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Classroom Insights & Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Manually Modifying Ref Files in Notepad</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Manually editing `.git/refs/heads/main` bypasses Git reflogs and index synchronization. Always let Git commands manage reference updates.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Confusing Head Pointer with Commit Object</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Branch pointers are movable text files; commit objects are immutable zlib-compressed objects in `.git/objects/`.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 13 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 13 Frequently Asked Questions & Interview Questions"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ──────────────────────────── */}
        <nav className="flex items-center justify-between border-t border-slate-800 pt-6">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-sm font-medium text-slate-200 hover:bg-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Topic 12: Comparing Branches</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 14: Hands-on Terminal Lab</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
