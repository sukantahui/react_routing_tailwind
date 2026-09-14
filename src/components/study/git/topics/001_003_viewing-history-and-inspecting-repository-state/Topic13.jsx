import React, { useState } from "react";
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
  Database,
  Eye,
  AlertOctagon,
  Search,
  Pickaxe,
  CheckCircle,
  TrendingDown
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
 * Topic 13: Classroom Case Study: Debangshu and Swadeep diagnosing an unexpected production price discount calculation bug using git blame and git log -S
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic13() {
  const [activeStep, setActiveStep] = useState("step1");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 13;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/12`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/14`;

  const caseStudySteps = {
    step1: {
      stepNum: "1",
      title: "Step 1: Line Attribution via git blame",
      cmd: "git blame -w -L 2,4 src/billing/discount_engine.js",
      desc: "Swadeep pinpoints the exact line where VIP rate became 0.50, attributing it to commit 7b1e4a8 by Debangshu.",
      output: [
        "7b1e4a8c (Debangshu 2026-09-12 16:30:00 +0530 2) function calculateDiscount(subtotal, tier) {",
        "7b1e4a8c (Debangshu 2026-09-12 16:30:00 +0530 3)   let rate = tier === 'VIP' ? 0.50 : 0.05; // TEMP DEBUG TEST",
        "7b1e4a8c (Debangshu 2026-09-12 16:30:00 +0530 4)   return subtotal * rate;"
      ],
      badge: "Commit & Author Located",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    step2: {
      stepNum: "2",
      title: "Step 2: Commit Context via git show",
      cmd: "git show 7b1e4a8c",
      desc: "Reveals Debangshu's commit message: 'test(promo): temp 50% discount test', proving an accidental debug leak.",
      output: [
        "commit 7b1e4a8c90df1b8943f25c81d3920e872ba18512",
        "Author: Debangshu Technical <debangshu@barrackpore-devs.org>",
        "Date:   Sat Sep 12 16:30:00 2026 +0530",
        "",
        "    test(promo): temp 50% discount test for festive flash sale",
        "",
        "diff --git a/src/billing/discount_engine.js b/src/billing/discount_engine.js",
        "@@ -2,3 +2,3 @@",
        "-  let rate = tier === 'VIP' ? 0.10 : 0.05;",
        "+  let rate = tier === 'VIP' ? 0.50 : 0.05; // TEMP DEBUG TEST"
      ],
      badge: "Root Cause Identified",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300"
    },
    step3: {
      stepNum: "3",
      title: "Step 3: Finding Deleted Safety Cap via Pickaxe (-S)",
      cmd: "git log -S 'MAX_DISCOUNT_CAP' -p",
      desc: "Discovers an earlier commit where the INR 1000 safety ceiling was accidentally dropped during a refactor.",
      output: [
        "commit e4a90123f8b1c0...",
        "Author: Swadeep SeniorDev <swadeep@barrackpore-devs.org>",
        "Date:   Tue Sep 8 14:00:00 2026 +0530",
        "",
        "    refactor(billing): simplify discount return expression",
        "",
        "diff --git a/src/billing/discount_engine.js b/src/billing/discount_engine.js",
        "-const MAX_DISCOUNT_CAP = 1000; // In INR",
        "-  return Math.min(discount, MAX_DISCOUNT_CAP);",
        "+  return subtotal * rate;"
      ],
      badge: "Historical Flaw Unmasked",
      color: "border-purple-500/50 bg-purple-950/20 text-purple-300"
    },
    step4: {
      stepNum: "4",
      title: "Step 4: Hotfix & Verification",
      cmd: "git show --stat HEAD",
      desc: "Deploys production hotfix restoring 10% rate and MAX_DISCOUNT_CAP ceiling with tag v1.1.1.",
      output: [
        "commit 3a4f891b2c4e... (HEAD -> main, tag: v1.1.1)",
        "Author: Sukanta Hui <sukanta@barrackpore-devs.org>",
        "Date:   Mon Sep 14 18:40:00 2026 +0530",
        "",
        "    fix(billing): restore 10% VIP rate and MAX_DISCOUNT_CAP safety ceiling",
        "",
        " src/billing/discount_engine.js | 5 +++--",
        " 1 file changed, 3 insertions(+), 2 deletions(-)"
      ],
      badge: "Hotfix Shipped & Tagged",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
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
                <History className="w-4 h-4" />
                <span>Git Module 001_003 &bull; Topic 13 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Classroom Case Study: Production Bug Forensics with <code className="text-cyan-300 font-mono text-lg">blame</code> &amp; <code className="text-cyan-300 font-mono text-lg">pickaxe</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 12: Tracking Renames</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 14: Terminal Forensics Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: REAL-WORLD MOTIVATION & INCIDENT SUMMARY ─────────── */}
        <section className="rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 to-slate-950 p-6 sm:p-8 backdrop-blur relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 text-rose-400 text-sm font-semibold uppercase tracking-wider mb-3">
              <AlertOctagon className="w-4 h-4" />
              <span>Production Incident Post-Mortem &bull; Severity: P1 Revenue Bug</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              The 50% Accidental Discount Leak at Coder &amp; AccoTax, Barrackpore
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              On Monday morning, customer invoices for enterprise accounts generated an unauthorized 50% price slash instead of the standard 10% VIP loyalty rate. Within 15 minutes, Sukanta Sir gathered Debangshu, Swadeep, and Susmita to conduct a blameless, surgical forensic triage using Git CLI tools.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2">
                  <TrendingDown className="w-4 h-4" />
                  <span>Symptom</span>
                </div>
                <p className="text-slate-400">
                  Invoices billing VIP clients at half price, leading to massive financial under-billing on billing engine runs.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <Search className="w-4 h-4" />
                  <span>Diagnosis</span>
                </div>
                <p className="text-slate-400">
                  <code className="text-amber-300 font-mono">git blame</code> identified a temporary debug line committed directly to main by Debangshu during local flash-sale testing.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Pickaxe className="w-4 h-4" />
                  <span>Hidden Defect Unmasked</span>
                </div>
                <p className="text-slate-400">
                  <code className="text-emerald-300 font-mono">git log -S</code> revealed that an earlier refactoring commit by Swadeep had deleted the <code className="text-emerald-300 font-mono">MAX_DISCOUNT_CAP</code> safety guard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: STEP-BY-STEP CASE STUDY WALKTHROUGH ─────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <Layers className="w-4 h-4" />
                <span>Forensic Investigation Workflow</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Step-by-Step Incident Resolution Timeline
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Click through steps 1 to 4 to inspect commands and outputs
            </span>
          </div>

          {/* Step Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {Object.entries(caseStudySteps).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveStep(key)}
                className={`p-3 rounded-xl text-xs sm:text-sm font-semibold transition border text-left flex items-center justify-between ${
                  activeStep === key
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span>{item.title}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 font-mono">#{item.stepNum}</span>
              </button>
            ))}
          </div>

          {/* Terminal Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>$ <strong className="text-cyan-300">{caseStudySteps[activeStep].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${caseStudySteps[activeStep].color}`}>
                {caseStudySteps[activeStep].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {caseStudySteps[activeStep].desc}
            </p>

            {/* Terminal Screen */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {caseStudySteps[activeStep].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition font-mono">
                  {line.startsWith("+") && !line.startsWith("+++") ? (
                    <span className="text-emerald-400 font-semibold">{line}</span>
                  ) : line.startsWith("-") && !line.startsWith("---") ? (
                    <span className="text-rose-400 font-semibold">{line}</span>
                  ) : line.startsWith("commit ") ? (
                    <span className="text-amber-300 font-bold">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD COMPARISON MATRIX ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>The Forensic Tri-Factor Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            How The Tri-Factor Solved the Incident
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Tool</th>
                  <th className="p-4 text-cyan-400">Incident Question Answered</th>
                  <th className="p-4 text-emerald-400">Key Forensic Finding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">git blame -w</td>
                  <td className="p-4">"Who modified line 3 containing 'rate = 0.50'?"</td>
                  <td className="p-4">Commit 7b1e4a8 by Debangshu on Saturday.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">git show &lt;SHA&gt;</td>
                  <td className="p-4">"Why was this change made (was it fraud or accidental)?"</td>
                  <td className="p-4">Commit message proved it was a local testing value for flash sale.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">git log -S "MAX_CAP"</td>
                  <td className="p-4">"Why didn't the safety cap prevent 50% discount?"</td>
                  <td className="p-4">Discovered that Swadeep deleted the ceiling in commit e4a9012.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-emerald-950/10">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">git show &lt;SHA&gt;~1:path</td>
                  <td className="p-4">"How was the safety cap originally implemented?"</td>
                  <td className="p-4">Extracted original code from parent commit for clean hotfix.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 5: SUKANTA HUI CLASSROOM MENTORSHIP DIALOGUE ───────── */}
        <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Barrackpore Dev Classroom Mentorship</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Sukanta Sir Leads the Blameless Incident Post-Mortem
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Debangshu, Swadeep, look at what we just accomplished in 10 minutes. With <code className="text-cyan-300 font-mono">git blame</code>, we identified the 50% change. With <code className="text-cyan-300 font-mono">git show</code>, we saw the commit intent. With <code className="text-cyan-300 font-mono">git log -S</code>, we discovered why the safety cap failed. What is our core engineering takeaway?"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                DT
              </div>
              <div>
                <div className="font-semibold text-amber-300 text-xs mb-1">Debangshu Technical (Student)</div>
                <p className="text-slate-300">
                  "Sir, I learned that I must NEVER commit temporary local testing multipliers directly into feature branches! Instead, I should use <code className="text-amber-300 font-mono">git stash</code> or local mock configs."
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SS
              </div>
              <div>
                <div className="font-semibold text-purple-300 text-xs mb-1">Swadeep SeniorDev (Student)</div>
                <p className="text-slate-300">
                  "And I learned that during refactorings, we must never delete business safety caps without automated unit test assertions that fail in CI if the cap is violated!"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Brilliant! That is true professional maturity. Fix the systemic workflow, write automated test guards, and use Git forensics to build better software!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: 7 COMMANDMENTS / PRODUCTION RULES ───────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Production Rules</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The 7 Commandments of Production Incident Forensics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Blame the commit, not the person",
                desc: "Focus on why the process allowed a debug commit to merge, rather than personal finger-pointing.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Always run git show <SHA> to read the message",
                desc: "Context is everything; commit descriptions distinguish accidents from architectural changes.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Use Pickaxe (-S) to find deleted safety guards",
                desc: "When a bug occurs, check if an older safety guard or validation check was silently removed.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Extract clean parent code with <SHA>~1:path",
                desc: "Restore deleted functions directly from pre-deletion parent snapshots in seconds.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Add failing unit tests before shipping hotfixes",
                desc: "Write a test that reproduces the bug, verify it fails on old code, and passes on the hotfix.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Tag hotfixes with annotated release tags",
                desc: "Create git tag -a v1.1.1 with explicit incident summary notes in the tag message.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Implement CI pre-commit checks to catch debug leaks",
                desc: "Use linter hooks to reject commits containing 'TEMP DEBUG' or non-standard constants.",
                color: "text-teal-400"
              }
            ].map((cmd) => (
              <div
                key={cmd.num}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex items-start gap-3.5"
              >
                <div className={`text-xl font-mono font-bold ${cmd.color} shrink-0`}>
                  #{cmd.num}
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{cmd.rule}</div>
                  <p className="text-slate-400 text-xs leading-relaxed">{cmd.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 7: AUTOMATED BASH LAB SCRIPT VIEW ──────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>Automated Bash Terminal Lab</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              topic13_files/case_study_forensics_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Simulating the Production Bug Triage
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to construct the complete incident timeline, run forensic diagnostics, and deploy the hotfix.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x case_study_forensics_lab.sh
./case_study_forensics_lab.sh

# 2. Key Commands Executed:
git blame -w -L 2,4 src/billing/discount_engine.js
git show <FAULTY_COMMIT>
git log -S "MAX_DISCOUNT_CAP" -p
git show --stat HEAD`}
            </pre>
          </div>
        </section>

        {/* ─── SECTION 8: FAQ TEMPLATE ────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Developer Clarifications &amp; Edge Cases
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "Why is git show <SHA> essential after running git blame?",
                a: "git blame only identifies who and when. 'git show' reveals the developer's commit message, explaining *why* the change was made and providing critical intent context."
              },
              {
                q: "How does git log -S help when a constant has been completely deleted?",
                a: "git grep fails because the code is deleted on disk. 'git log -S' scans historical diffs to pinpoint the commit where the string count was reduced to zero."
              },
              {
                q: "What is the best way to extract a deleted function from an earlier commit?",
                a: "Use 'git show <deletion_commit_hash>~1:<path_to_file>' to dump the clean file state immediately prior to the deletion."
              },
              {
                q: "How can CI/CD pipelines prevent debug commits from reaching production?",
                a: "By running automated unit tests with assertions on business boundaries, and using commit linters that reject keywords like 'TEMP' or 'DEBUG'."
              },
              {
                q: "What does creating an annotated hotfix tag accomplish?",
                a: "'git tag -a v1.1.1 -m \"...\"' establishes an immutable release checkpoint documenting the incident resolution."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: QUIZ COMPANION ──────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            <span>Knowledge Verification</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Topic 13 Assessment: Production Incident Forensics Case Study
          </h2>
          <p className="text-slate-400 text-sm">
            Test your triage skills, root-cause diagnosis, pickaxe recovery, and blameless post-mortem best practices.
          </p>

          <QuizSection questions={questions} />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINT NOTES ─────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <FileCode className="w-4 h-4" />
            <span>Printable Study Notes</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Downloadable Quick Revision Reference
          </h2>
          <PlainTextPrint content={noteText} fileName="case_study_forensics_notes.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER COMPONENT ──────────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BUTTONS ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev: Topic 12 – Tracking Renames (--follow)</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 14 – Hands-on Terminal Lab</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}

// ─── QUIZ SECTION COMPONENT ─────────────────────────────────────────────
function QuizSection({ questions }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qId, optIdx]) => {
    const q = questions.find((item) => item.id === parseInt(qId, 10));
    return q && q.correctAnswer === optIdx ? acc + 1 : acc;
  }, 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
      <div className="space-y-6">
        {questions.slice(0, 5).map((q, idx) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-800/80 bg-slate-950/70 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-cyan-400 font-mono uppercase">
                  Question {idx + 1} of {questions.length}
                </span>
                {showResults && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">
                {q.question}
              </h4>

              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  let btnClass = "border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800/70";

                  if (isSelected) {
                    btnClass = "border-cyan-500 bg-cyan-950/40 text-cyan-200";
                  }
                  if (showResults) {
                    if (optIdx === q.correctAnswer) {
                      btnClass = "border-emerald-500 bg-emerald-950/50 text-emerald-200";
                    } else if (isSelected && !isCorrect) {
                      btnClass = "border-rose-500 bg-rose-950/50 text-rose-200";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition flex items-center justify-between ${btnClass}`}
                    >
                      <span>{opt}</span>
                      {showResults && optIdx === q.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {showResults && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-3 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-cyan-300">Technical Explanation:</div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setShowResults(!showResults)}
          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition"
        >
          {showResults ? "Hide Explanations" : "Submit & Check Answers"}
        </button>

        {showResults && (
          <div className="text-sm font-semibold text-slate-200">
            Score: <span className="text-cyan-400">{score}</span> / 5 sample questions shown
          </div>
        )}
      </div>
    </div>
  );
}
