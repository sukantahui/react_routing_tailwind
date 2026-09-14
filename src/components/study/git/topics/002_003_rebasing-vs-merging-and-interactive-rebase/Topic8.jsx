import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Zap,
  Users,
  Eye,
  Bookmark,
  FastForward,
  Terminal,
  Play,
  Scissors,
  Edit3,
  Minimize2,
  Trash2,
  Code2,
  TerminalSquare
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
 * Topic 8: Interactive Rebase Command Directives: pick, reword, edit, squash, fixup, drop, and exec
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic8() {
  const [selectedDirective, setSelectedDirective] = useState("squash");

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 8;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/7`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const directivesList = [
    {
      name: "pick",
      short: "p",
      icon: Play,
      color: "emerald",
      desc: "Use the commit as-is with no modifications to code or message.",
      example: "pick 3a1f94d feat: add GST calculation"
    },
    {
      name: "reword",
      short: "r",
      icon: Edit3,
      color: "cyan",
      desc: "Use commit code changes, but pause to edit the commit message.",
      example: "reword 8d2c01a feat(gst): enforce ₹50,000 e-way threshold"
    },
    {
      name: "edit",
      short: "e",
      icon: Code2,
      color: "amber",
      desc: "Pause at commit to amend files, add forgotten files, or split commits.",
      example: "edit 7f4b82e feat: add TDS export module"
    },
    {
      name: "squash",
      short: "s",
      icon: Minimize2,
      color: "purple",
      desc: "Meld into previous commit AND concatenate both commit messages.",
      example: "squash 9c0e21a fix: update tax rebate rounding"
    },
    {
      name: "fixup",
      short: "f",
      icon: Scissors,
      color: "indigo",
      desc: "Meld into previous commit and DISCARD this commit's message.",
      example: "fixup 1a2b3c4 fix: typo in header"
    },
    {
      name: "drop",
      short: "d",
      icon: Trash2,
      color: "rose",
      desc: "Remove this commit completely from history.",
      example: "drop 4d5e6f7 wip: debugging logs"
    },
    {
      name: "exec",
      short: "x",
      icon: TerminalSquare,
      color: "blue",
      desc: "Run a shell command after the preceding commit (e.g. npm test).",
      example: "exec npm test"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-purple-500/30 selection:text-purple-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 border border-purple-700/50 text-purple-300">
                  Topic {currentIndex} of {totalTopics - 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-700/50 text-cyan-300">
                  Command Directives
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Scissors className="w-6 h-6 text-purple-400" />
                Interactive Directives: pick, reword, edit, squash, fixup, drop, exec
              </h1>
            </div>

            {/* Quick Navigation Top */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev Topic
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-600/50 bg-purple-950/60 hover:bg-purple-900/80 text-xs font-medium text-purple-300 transition shadow-sm shadow-purple-950"
              >
                Next Topic <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: ELI10 / REAL WORLD ANALOGY ──────────────────────── */}
        <section className="rounded-2xl border border-purple-900/40 bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                ELI10 & Everyday Analogy
              </span>
              <h2 className="text-2xl font-bold text-white">
                The Chef's Culinary Recipe Card System
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Imagine managing recipe index cards for a famous sweet shop in <strong className="text-cyan-300">Barrackpore</strong>.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Your apprentice wrote 7 messy cards for preparing Rosogolla.
                You use <strong>Pick</strong> to keep the sugar syrup step, <strong>Reword</strong> to fix the mislabeled milk quantity,
                <strong>Squash</strong> to combine the stirring steps into one card, <strong>Fixup</strong> to absorb a minor salt note,
                <strong>Drop</strong> to throw away a card for burnt curd, and <strong>Exec</strong> to taste-test after boiling!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: DIRECTIVE EXPLORER ───────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 7 Interactive Command Directives
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {directivesList.map((d) => {
              const IconComp = d.icon;
              return (
                <button
                  key={d.name}
                  onClick={() => setSelectedDirective(d.name)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedDirective === d.name
                      ? "bg-purple-950/80 border-purple-500 shadow-md shadow-purple-950"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <IconComp className="w-5 h-5 mx-auto mb-1 text-purple-300" />
                  <div className="text-xs font-bold text-white font-mono">{d.name}</div>
                  <div className="text-[10px] text-slate-400">({d.short})</div>
                </button>
              );
            })}
          </div>

          {/* Active Directive Card */}
          {(() => {
            const cur = directivesList.find((x) => x.name === selectedDirective);
            const CurIcon = cur.icon;
            return (
              <div className="p-6 rounded-2xl border border-purple-900/40 bg-slate-900/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-purple-300 font-semibold text-lg font-mono">
                    <CurIcon className="w-5 h-5" /> {cur.name} ({cur.short})
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    Interactive Rebase Directive
                  </span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">{cur.desc}</p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400">
                  <span className="text-slate-500"># Example in TODO file:</span><br />
                  {cur.example}
                </div>
              </div>
            );
          })()}
        </section>

        {/* ─── SECTION 4: INTERACTIVE SVG VISUALIZATION ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Directives Workflow in Action</h2>
              <p className="text-xs text-slate-400">How Git processes the TODO script containing multiple directives</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 240"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <rect x="50" y="20" width="750" height="200" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <rect x="50" y="20" width="750" height="30" rx="8" fill="#1e293b" />
              <text x="70" y="40" fill="#a855f7" fontSize="12" fontWeight="bold" fontFamily="monospace">git-rebase-todo: Multi-Directive Pipeline</text>

              <text x="70" y="75" fill="#34d399" fontSize="12" fontFamily="monospace">pick   e1a2b3c feat(tds): Section 194C calculation engine</text>
              <text x="70" y="105" fill="#c084fc" fontSize="12" fontFamily="monospace">squash f4d5e6a fix(tds): handle ₹30,000 single contract threshold</text>
              <text x="70" y="135" fill="#818cf8" fontSize="12" fontFamily="monospace">fixup  9c0e21a fix: typo in variable name</text>
              <text x="70" y="165" fill="#38bdf8" fontSize="12" fontFamily="monospace">exec   npm test</text>
              <text x="70" y="195" fill="#f43f5e" fontSize="12" fontFamily="monospace">drop   7a8b9c0 wip: remove console logs</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: TEACHER'S NOTE & CLASSROOM DIALOGUE ─────────────── */}
        <section className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6 sm:p-8 space-y-6">
          <Teacher
            name="Sukanta Hui"
            role="Senior Software Architect & Lead Instructor"
            location="Coder & AccoTax, Barrackpore"
          />

          <div className="space-y-4 pt-2 border-t border-indigo-900/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Classroom Dialogue: Susmita & Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Susmita (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, what is the exact difference between `squash` and `fixup`?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Both combine the code changes into the commit above.
                  With <code className="text-purple-300">squash</code>, Git prompts you to edit and merge the two commit messages.
                  With <code className="text-indigo-300">fixup</code>, Git silently discards the second commit's message.
                  Use <code className="text-indigo-300">fixup</code> for typo fixes so you don't waste time editing messages!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 8: Interactive Rebase Directives (Printable Notes)" />
        </section>

        {/* ─── SECTION 7: FAQ & STRUCTURED Q&A ────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Frequently Asked Questions & Exam Prep
              </h2>
              <p className="text-xs text-slate-400">
                28 comprehensive interview questions on interactive rebase directives
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} />

          {/* Bottom Sequential Navigation Bar */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-800">
            <Link
              to={prevTopicUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-sm font-medium text-slate-200 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Interactive Rebase Mastery
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950 hover:bg-purple-900 text-sm font-semibold text-purple-200 shadow-lg shadow-purple-950/60 transition"
            >
              Next Topic: Reordering & Splitting Commits <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
