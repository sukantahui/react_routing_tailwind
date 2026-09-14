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
  Calendar,
  Palette,
  FileSpreadsheet
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic 2: Custom Log Formatting with Pretty Print: git log --pretty=format:'%h %ad | %s%d [%an]' --date=short
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic2() {
  const [activePreset, setActivePreset] = useState("shortDate");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 2;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/1`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/3`;

  const formatPresets = {
    shortDate: {
      title: "Standard Short Date Preset",
      formatStr: "%h %ad | %s%d [%an]",
      dateFlag: "--date=short",
      fullCmd: "git log --pretty=format:'%h %ad | %s%d [%an]' --date=short",
      desc: "Clean developer timeline displaying 7-hex hash, YYYY-MM-DD date, subject with branch tags, and author name.",
      output: [
        "7b1e4a8 2026-09-14 | fix(auth): correct jwt expiration (HEAD -> main, tag: v1.0.0) [Swadeep]",
        "98ca7a4 2026-09-13 | feat(db): configure postgres connection pooling [Susmita]",
        "c81d290 2026-09-12 | feat(core): initial application setup [Debangshu]"
      ],
      badge: "Compact Audit",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    relativeColor: {
      title: "Vibrant ANSI Dashboard Preset",
      formatStr: "%C(yellow)%h%C(reset) %C(cyan)%ar%C(reset) | %C(green)%s%C(reset) %C(auto)%d%C(reset) [%C(bold blue)%an%C(reset)]",
      dateFlag: "",
      fullCmd: "git log --pretty=format:'%C(yellow)%h%C(reset) %C(cyan)%ar%C(reset) | %C(green)%s%C(reset) %C(auto)%d%C(reset) [%C(bold blue)%an%C(reset)]'",
      desc: "Full ANSI color palette rendering commit hashes in yellow, relative time in cyan, subject in green, and author in bold blue.",
      output: [
        "7b1e4a8 2 hours ago | fix(auth): correct jwt expiration (HEAD -> main, tag: v1.0.0) [Swadeep]",
        "98ca7a4 1 day ago   | feat(db): configure postgres connection pooling [Susmita]",
        "c81d290 2 days ago  | feat(core): initial application setup [Debangshu]"
      ],
      badge: "Team Visualizer",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300"
    },
    tsvExport: {
      title: "Tab-Separated TSV / CSV Audit Export",
      formatStr: "%h%x09%an%x09%ae%x09%ad%x09%s",
      dateFlag: "--date=iso",
      fullCmd: "git log --pretty=format:'%h%x09%an%x09%ae%x09%ad%x09%s' --date=iso > changelog.tsv",
      desc: "Uses %x09 (ASCII hex 09 = Tab) to export machine-readable logs directly into Excel, Google Sheets, or CI auditing pipelines.",
      output: [
        "7b1e4a8\tSwadeep\tswadeep@barrackpore-devs.org\t2026-09-14 16:45:00 +0530\tfix(auth): correct jwt expiration",
        "98ca7a4\tSusmita\tsusmita@barrackpore-devs.org\t2026-09-13 11:00:00 +0530\tfeat(db): configure postgres pooling",
        "c81d290\tDebangshu\tdebangshu@barrackpore-devs.org\t2026-09-12 09:30:00 +0530\tfeat(core): initial setup"
      ],
      badge: "CI / Spreadsheet Export",
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
                <span>Git Module 001_003 &bull; Topic 2 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Custom Log Formatting with Pretty Print (<code className="text-cyan-300 font-mono text-lg">--pretty=format:</code>)
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 1: Log Formatting</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 3: Limiting &amp; Filtering</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: REAL-WORLD MOTIVATION & THE "WHY" ────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-4 h-4" />
              <span>Tailored Developer Tooling &amp; Compliance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Senior Engineers Craft Custom Git Log Formats
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              Neither default <code className="text-cyan-300 font-mono">git log</code> nor <code className="text-cyan-300 font-mono">--oneline</code> gives you exact control over author names, timestamps, and formatting. By using <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">--pretty=format:</code>, you can build customized team dashboards, generate Markdown release notes for product managers, and dump compliance spreadsheets in TSV/CSV format without third-party tools.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <Palette className="w-4 h-4" />
                  <span>Custom Color Schemes</span>
                </div>
                <p className="text-slate-400">
                  Embed ANSI colors with <code className="text-sky-300 font-mono">%C(yellow)</code>, <code className="text-sky-300 font-mono">%C(cyan)</code>, and <code className="text-sky-300 font-mono">%C(reset)</code> for rich terminal readability.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Flexible Date Formatting</span>
                </div>
                <p className="text-slate-400">
                  Switch between relative time (<code className="text-amber-300 font-mono">%ar</code>), ISO dates (<code className="text-amber-300 font-mono">--date=iso</code>), and short dates (<code className="text-amber-300 font-mono">--date=short</code>).
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Automated Data Export</span>
                </div>
                <p className="text-slate-400">
                  Output ASCII delimiters like tabs (<code className="text-emerald-300 font-mono">%x09</code>) to create spreadsheet-ready files for accounting and client billing audits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TECHNICAL ARCHITECTURE & INTERACTIVE SIMULATOR ──── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <Layers className="w-4 h-4" />
                <span>Interactive Format Engine</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Live Pretty Format Engine &amp; Output Tester
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Select a format preset to inspect the CLI invocation and output
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(formatPresets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => setActivePreset(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activePreset === key
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span>{preset.title}</span>
              </button>
            ))}
          </div>

          {/* Terminal Simulator Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Command Execution:</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${formatPresets[activePreset].color}`}>
                {formatPresets[activePreset].badge}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-cyan-300 border border-slate-800 overflow-x-auto select-all">
              {formatPresets[activePreset].fullCmd}
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {formatPresets[activePreset].desc}
            </p>

            {/* Simulated Output */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {formatPresets[activePreset].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD COMPARISON MATRIX ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>Format Placeholder Cheat Sheet</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Essential <code className="text-cyan-300 font-mono">--pretty=format:</code> Placeholders
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Placeholder</th>
                  <th className="p-4 text-cyan-400">Meaning &amp; Description</th>
                  <th className="p-4 text-emerald-400">Sample Rendered Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">%H / %h</td>
                  <td className="p-4">Full 40-hex SHA-1 vs. Abbreviated (7-hex) commit hash</td>
                  <td className="p-4 font-mono text-xs text-slate-300">7b1e4a8</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">%an / %ae</td>
                  <td className="p-4">Author name / Author email address</td>
                  <td className="p-4 font-mono text-xs text-slate-300">Debangshu Technical &lt;debangshu@devs.org&gt;</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">%ad / %ar</td>
                  <td className="p-4">Author date (styled via --date) / Relative time elapsed</td>
                  <td className="p-4 font-mono text-xs text-slate-300">2026-09-14 / 2 hours ago</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">%s / %B</td>
                  <td className="p-4">Commit subject line / Full raw message with body</td>
                  <td className="p-4 font-mono text-xs text-slate-300">feat(tax): implement 18% standard GST</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-pink-300 font-bold">%d / %D</td>
                  <td className="p-4">Ref decorations with parentheses / without parentheses</td>
                  <td className="p-4 font-mono text-xs text-slate-300">(HEAD -&gt; main, tag: v1.0.0)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-yellow-300 font-bold">%x09</td>
                  <td className="p-4">Hex byte 09 = ASCII Horizontal Tab (for TSV spreadsheets)</td>
                  <td className="p-4 font-mono text-xs text-slate-300">[TAB delimiter]</td>
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
            Sukanta Sir Guides Susmita &amp; Swadeep on Generating Release Changelogs
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Susmita, our Barrackpore client wants an itemized invoice changelog of all fixes completed between version 1.0.0 and today. How can you extract this in two seconds without copying and pasting by hand?"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SM
              </div>
              <div>
                <div className="font-semibold text-emerald-300 text-xs mb-1">Susmita Database (Student)</div>
                <p className="text-slate-300">
                  "Sir, I can run <code className="text-emerald-300 font-mono">git log --pretty=format:'- %s ([%h]) by %an (%ad)' --date=short v1.0.0..HEAD</code>! It generates a clean Markdown bullet list with exact commit titles and author names ready to paste into our client status report!"
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
                  "Spot on! And if our accountant Swadeep needs to import the history into Excel for audit verification, what token do we use instead of commas?"
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
                  "We use <code className="text-purple-300 font-mono">%x09</code>! Commas in commit messages can break CSV parsing, but tab characters (<code className="text-purple-300 font-mono">%x09</code>) create a flawless TSV spreadsheet that Excel opens cleanly without delimiter collision."
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
            The 7 Commandments of Custom Log Formatting
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Always close color tags with %C(reset)",
                desc: "Failing to add %C(reset) causes ANSI terminal colors to bleed into subsequent lines and command prompts.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Prefer TSV (%x09) over CSV for export scripts",
                desc: "Commit messages frequently contain commas which break standard CSV parsers unless quoted.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Use --date=short or --date=iso for deterministic exports",
                desc: "Relative dates like '2 days ago' are great for humans, but ISO timestamps are mandatory for sorting and CI.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Wrap format strings in single quotes",
                desc: "In Bash and Zsh, double quotes can accidentally trigger shell variable expansions on % symbols.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Leverage %C(auto)%d%C(reset) for native ref colors",
                desc: "The 'auto' color keyword renders tags in yellow and branches in green automatically.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Use %B when generating detailed audit logs",
                desc: "The %s token only captures the first line; use %B if you need full architectural explanation bodies.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Store favorite formats as persistent Git aliases",
                desc: "Never memorize long format strings: store them in ~/.gitconfig as alias.lgs, alias.lgc, etc.",
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
              topic2_files/git_log_pretty_format_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Custom Format Strings &amp; TSV Export
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to practice generating custom pretty formats and exporting machine-readable changelogs.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_log_pretty_format_lab.sh
./git_log_pretty_format_lab.sh

# 2. Key Commands Executed:
git log --pretty=format:'%h %ad | %s%d [%an]' --date=short
git log --pretty=format:'%C(yellow)%h%C(reset) %C(cyan)%ar%C(reset) | %C(green)%s%C(reset) %C(auto)%d%C(reset) [%C(bold blue)%an%C(reset)]'
git log --pretty=format:'%h%x09%an%x09%ae%x09%ad%x09%s' --date=iso > audit_report.tsv`}
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
                q: "What is the difference between %s and %B?",
                a: "%s extracts only the first line (the commit subject). %B extracts the entire commit message, including both subject and multi-paragraph body text."
              },
              {
                q: "How do I print a tab character in my custom format string?",
                a: "Use the byte escape token '%x09', which corresponds to ASCII horizontal tab (hex 09)."
              },
              {
                q: "What does '%C(auto)%d%C(reset)' do?",
                a: "It applies Git's built-in decoration color rules to the '%d' placeholder (yellow for tags, green for local branches, red for remote branches) and then resets the color back to normal."
              },
              {
                q: "How can I filter date formatting using strftime tokens?",
                a: "Use the flag '--date=format:\"%Y-%m-%d %H:%M:%S\"' along with the '%ad' placeholder in your format string."
              },
              {
                q: "Why do my custom colors bleed into the terminal prompt after git log exits?",
                a: "This happens when you forgot to append '%C(reset)' at the end of your format string to clear active ANSI escape styles."
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
            Topic 2 Assessment: Pretty Print Formatting Engine
          </h2>
          <p className="text-slate-400 text-sm">
            Test your understanding of format tokens, date modifiers, color escapes, and export scripting.
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
          <PlainTextPrint content={noteText} fileName="git_log_pretty_format_notes.txt" />
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
            <span>Prev: Topic 1 – Log Formatting &amp; Graph</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 3 – Limiting &amp; Filtering History</span>
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
