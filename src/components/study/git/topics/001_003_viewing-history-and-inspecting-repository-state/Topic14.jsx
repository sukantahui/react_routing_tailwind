import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Terminal,
  Search,
  Users,
  GitBranch,
  FileCode,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Clock,
  Layers,
  FileText
} from 'lucide-react';

// Common Framework Imports
import Teacher from '../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../common/FAQTemplate';
import PlainTextPrint from '../../../common/PlainTextPrint';
import roadmapData from '../../git-roadmap.json';

// Dedicated Companion File Imports
import questions from './topic14_files/topic14_questions';
import noteText from './topic14_files/topic14_note.txt?raw';

export default function Topic14() {
  const navigate = useNavigate();

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 14;
  const folder = roadmapData.folder || "git";

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/13`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/15`;

  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' | 'pickaxe' | 'blame' | 'divergence'
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Command simulator steps
  const simulationData = {
    metrics: {
      title: "Task 1: Contributor Distribution & Velocity Analytics",
      command: "git shortlog -sn --no-merges --since=\"2026-01-01\"",
      output: `   2  Debangshu Mukherjee
   2  Swadeep Sen
   1  Mahima Shaw
   1  Susmita Nandy`,
      explanation: "Aggregates commit counts per author in descending order, excluding merge commits to measure direct developer output."
    },
    pickaxe: {
      title: "Task 2: Archeology of Deleted Legacy Code (-S Pickaxe)",
      command: "git log -S \"calculateEmergencyVatExemption\" --stat --oneline",
      output: `7d2a1b9 refactor(engine): relocate engine and optimize composition scheme
 src/calculators/gst_engine.js | 18 +++++++++++++++---
 src/tax_calc.js               | 15 ---------------
 2 files changed, 15 insertions(+), 18 deletions(-)

c49e01a feat(core): initial tax calculation engine and rates config
 src/tax_calc.js     | 15 +++++++++++++++
 config/rates.json   |  5 +++++
 2 files changed, 20 insertions(+)`,
      explanation: "The pickaxe operator pinpoints exactly two events: commit c49e01a where the symbol was first introduced, and commit 7d2a1b9 where Susmita refactored and deleted it."
    },
    blame: {
      title: "Task 3: Line Forensics Through Whitespace and File Movement",
      command: "git blame -w -C -C -L 1,10 src/calculators/gst_engine.js",
      output: `c49e01a5 (Debangshu Mukherjee 2026-01-05 10:00:00 +0530 1) // Core Tax Calculator Module v1.0
c49e01a5 (Debangshu Mukherjee 2026-01-05 10:00:00 +0530 2) 
c49e01a5 (Debangshu Mukherjee 2026-01-05 10:00:00 +0530 3) export function calculateStandardGST( amount, rate ) {
c49e01a5 (Debangshu Mukherjee 2026-01-05 10:00:00 +0530 4)     if ( !amount || amount <= 0 ) return 0;
c49e01a5 (Debangshu Mukherjee 2026-01-05 10:00:00 +0530 5)     return ( amount * rate ) / 100;
c49e01a5 (Debangshu Mukherjee 2026-01-05 10:00:00 +0530 6) }`,
      explanation: "Even though Swadeep ran Prettier (formatting) and Susmita moved the file from src/tax_calc.js, `-w -C -C` pierces through both layers and attributes the lines to Debangshu's original code!"
    },
    divergence: {
      title: "Task 4: Cross-Branch Divergence Audit (Symmetric Difference)",
      command: "git log --left-right --graph --oneline main...feature/gst-optimization",
      output: `* < a93bf04 (HEAD -> main) fix(sec): update rate metadata for compliance audit
* > d410a82 (feature/gst-optimization) style: apply global prettier whitespace formatting
* > 7d2a1b9 refactor(engine): relocate engine and optimize composition scheme`,
      explanation: "`<` marks commits unique to `main` (a93bf04), while `>` marks commits exclusive to `feature/gst-optimization` (d410a82, 7d2a1b9) since their common ancestor."
    }
  };

  const handleOptionClick = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Section 1: Header */}
        <div className="bg-gradient-to-r from-cyan-900/60 via-slate-900 to-indigo-900/60 p-6 md:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Terminal className="w-64 h-64 text-cyan-400" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/30">
              Module 001_003 • Topic 14
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Estimated Lab Time: 45 Mins</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Hands-on Terminal Lab: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">History Reconstruction & Pickaxe Forensics</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            Synthesize all atomic Git log, diff, blame, and pickaxe tools into a unified forensic workflow. Audit author velocity, trace deleted business logic across file moves, bypass mass formatting commits, and compute precise branch divergence.
          </p>
        </div>

        {/* Section 2: Real-World Motivation & System Context */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg w-fit mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">1. Velocity & Contribution Metrics</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Extract exact commit distribution across sprints without bloated metrics SaaS tools. Utilize <code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded">git shortlog -sn</code> to audit team contributions.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 hover:border-teal-500/40 transition-all">
            <div className="p-3 bg-teal-500/10 text-teal-400 rounded-lg w-fit mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">2. Deleted Code Archeology</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              When business logic goes missing after refactors, locate the exact deletion commit and historical patch using the pickaxe operator (<code className="text-teal-300 bg-slate-950 px-1 py-0.5 rounded">-S</code>).
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg w-fit mb-4">
              <GitBranch className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">3. Symmetric Divergence Auditing</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dissect exactly which commits exist on staging versus production using <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded">git log --left-right A...B</code> before triggering major releases.
            </p>
          </div>
        </div>

        {/* Section 3: Interactive Interactive Terminal Simulator */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span className="font-mono text-sm font-semibold text-slate-200">Forensics Terminal Playground</span>
            </div>
            {/* Tab Selection */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(simulationData).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === key
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {key === 'metrics' && '1. Contributor Metrics'}
                  {key === 'pickaxe' && '2. Code Archeology'}
                  {key === 'blame' && '3. Whitespace Blame'}
                  {key === 'divergence' && '4. Branch Divergence'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-cyan-300">{simulationData[activeTab].title}</h3>
              <p className="text-slate-400 text-sm">{simulationData[activeTab].explanation}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs md:text-sm space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <span className="text-slate-500">$</span>
                <span>{simulationData[activeTab].command}</span>
              </div>
              <div className="text-slate-300 whitespace-pre overflow-x-auto p-3 bg-slate-900/90 rounded-lg border border-slate-800/80 leading-relaxed">
                {simulationData[activeTab].output}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Architecture Comparison Matrix */}
        <div className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Forensic Operations Comparison Matrix</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-cyan-300 font-semibold bg-slate-950/60">
                  <th className="p-3">Forensic Objective</th>
                  <th className="p-3">Primary Command</th>
                  <th className="p-3">Key Modifiers</th>
                  <th className="p-3">Industrial Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">Author Commit Velocity</td>
                  <td className="p-3 font-mono text-cyan-300">git shortlog</td>
                  <td className="p-3 font-mono text-slate-400">-s -n --no-merges</td>
                  <td className="p-3">Sprint retrospective analytics and release changelog attribution.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">Deleted Symbol Recovery</td>
                  <td className="p-3 font-mono text-cyan-300">git log -S</td>
                  <td className="p-3 font-mono text-slate-400">--stat -p --oneline</td>
                  <td className="p-3">Tracking when an API method or exemption formula was deleted.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">Refactor & Formatting Bypass</td>
                  <td className="p-3 font-mono text-cyan-300">git blame</td>
                  <td className="p-3 font-mono text-slate-400">-w -C -C -L &lt;start&gt;,&lt;end&gt;</td>
                  <td className="p-3">Piercing through Prettier and file relocations to find the original author.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">Branch Divergence Analysis</td>
                  <td className="p-3 font-mono text-cyan-300">git log</td>
                  <td className="p-3 font-mono text-slate-400">--left-right --graph A...B</td>
                  <td className="p-3">Pre-deployment sanity checks between staging and main branches.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: Mentorship Dialogue with Barrackpore Cohort */}
        <div className="bg-slate-900/70 p-6 md:p-8 rounded-2xl border border-cyan-500/20 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Barrackpore Lab Roundtable: Forensic Synthesis</h2>
              <p className="text-xs text-cyan-300">Interactive Technical Q&A with Sukanta Hui</p>
            </div>
          </div>

          <div className="space-y-4 text-xs md:text-sm">
            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-cyan-400 font-semibold">
                <span>Debangshu Mukherjee (Junior Backend Dev)</span>
                <span className="text-[10px] text-slate-500 font-mono">09:15 AM</span>
              </div>
              <p className="text-slate-300">
                "Sir, when I ran <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">git blame</code> on the tax calculator, every single line showed Swadeep's name because he ran Prettier yesterday. How do I reliably bypass formatting commits during a bug investigation?"
              </p>
            </div>

            <div className="p-4 bg-cyan-950/30 rounded-xl border border-cyan-800/40 space-y-2 ml-4">
              <div className="flex items-center justify-between text-cyan-300 font-bold">
                <span>Sukanta Hui (Lead Instructor)</span>
                <span className="text-[10px] text-cyan-400 font-mono">09:18 AM</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                "Excellent observation, Debangshu. That is why professional teams configure <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">.git-blame-ignore-revs</code> or run blame with the <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">-w</code> flag to ignore whitespace. If lines were moved from another file during a refactor, adding <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">-C -C</code> tells Git to inspect all files in the commit, tracing the logic back to your original commit!"
              </p>
            </div>

            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-amber-400 font-semibold">
                <span>Susmita Nandy (Senior QA Specialist)</span>
                <span className="text-[10px] text-slate-500 font-mono">09:22 AM</span>
              </div>
              <p className="text-slate-300">
                "When comparing branches before a release, what is the exact difference between <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">git log main..feature</code> and <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">git log --left-right main...feature</code>?"
              </p>
            </div>

            <div className="p-4 bg-cyan-950/30 rounded-xl border border-cyan-800/40 space-y-2 ml-4">
              <div className="flex items-center justify-between text-cyan-300 font-bold">
                <span>Sukanta Hui (Lead Instructor)</span>
                <span className="text-[10px] text-cyan-400 font-mono">09:25 AM</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                "Two-dot (<code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">main..feature</code>) is asymmetric: it only shows commits reachable from <code className="text-slate-200">feature</code> that are not in <code className="text-slate-200">main</code>. Triple-dot (<code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">main...feature</code>) is symmetric: it shows commits on either branch since they diverged. Combining it with <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">--left-right</code> marks which branch owns which commit with <code className="text-cyan-300">&lt;</code> and <code className="text-cyan-300">&gt;</code>!"
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: The 7 Commandments of Git History Forensics */}
        <div className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Repository Forensics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
            {[
              "1. Never run unconstrained 'git log -p' on monolithic repositories; scope by path or count.",
              "2. Always utilize 'git blame -w' to eliminate false attributions from formatting tools.",
              "3. Use 'git log -S' for symbol count shifts and 'git log -G' for regex pattern modifications.",
              "4. Always append '--follow' when inspecting history of files that were renamed or moved.",
              "5. Utilize symmetric difference ('A...B') with '--left-right' for multi-branch divergence audits.",
              "6. Filter out merge noise with '--no-merges' when auditing direct code contributions.",
              "7. Establish a repository '.git-blame-ignore-revs' file for mass linting and Prettier migrations."
            ].map((rule, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Executable Lab Script Section */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base md:text-lg font-bold text-white">Companion Bash Lab: <code className="text-cyan-300 font-mono text-sm">history_forensics_lab.sh</code></h2>
            </div>
            <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded">Deterministic Shell Script</span>
          </div>
          <p className="text-xs md:text-sm text-slate-400">
            Execute this script in your local terminal to instantiate the complete 4-author repository scenario and test your forensic CLI skills.
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-60">
            <pre><code>{`# Run this script directly in your terminal:
chmod +x history_forensics_lab.sh
./history_forensics_lab.sh

# Inside the created tax_engine_forensics_lab:
git shortlog -sn --no-merges
git log -S "calculateEmergencyVatExemption" --stat
git blame -w -C -C -L 1,12 src/calculators/gst_engine.js
git log --left-right --graph --oneline main...feature/gst-optimization`}</code></pre>
          </div>
        </div>

        {/* Section 8: Teacher Sukanta Hui */}
        <Teacher />

        {/* Section 9: FAQ Section */}
        <FAQTemplate
          title="Frequently Asked Questions: Repository Forensics & Auditing"
          faqs={[
            {
              question: "How do I ignore specific large commits in git blame automatically?",
              answer: "Create a file called `.git-blame-ignore-revs` containing the full commit hashes of the reformatting commits (one per line). Then configure Git with `git config blame.ignoreRevsFile .git-blame-ignore-revs`."
            },
            {
              question: "Can git log -S find code deleted across multiple files simultaneously?",
              answer: "Yes. The pickaxe operator `-S` checks the diff of every file touched in every commit. If a commit deleted that exact string from any file in the repo, the commit will be returned."
            },
            {
              question: "Why does git log not show commits before a file rename by default?",
              answer: "Git tracks repository content, not explicit file histories. By default, `git log <file>` only follows the current path. Passing `--follow` instructs Git to check rename heuristics backwards across parent trees."
            },
            {
              question: "What is the difference between author date (%ad) and committer date (%cd)?",
              answer: "Author date is when the original code changes were written (`git commit`). Committer date is when the commit was applied or altered (e.g., via `git rebase`, `git cherry-pick`, or `git commit --amend`)."
            }
          ]}
        />

        {/* Section 10: Quiz Companion Component (25 MCQs) */}
        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-cyan-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Comprehensive Forensics Lab Assessment</h2>
                <p className="text-xs text-slate-400">25 In-Depth Multiple Choice Scenarios</p>
              </div>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {showResults ? "Hide Evaluation" : "Evaluate Quiz"}
            </button>
          </div>

          {showResults && (
            <div className="p-4 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-center justify-between">
              <span className="text-sm font-semibold text-cyan-300">
                Score: {calculateScore()} / {questions.length} ({Math.round((calculateScore() / questions.length) * 100)}%)
              </span>
              <button
                onClick={resetQuiz}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Answers
              </button>
            </div>
          )}

          <div className="space-y-6">
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

              return (
                <div key={q.id} className="p-5 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 bg-slate-800 text-cyan-400 text-xs font-mono font-bold rounded">
                      Q{idx + 1}
                    </span>
                    <h3 className="text-sm md:text-base font-semibold text-slate-200 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;
                      let btnClass = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60";

                      if (showResults) {
                        if (optIdx === q.correctAnswer) {
                          btnClass = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold";
                        } else if (isSelected) {
                          btnClass = "bg-rose-950/60 border-rose-500 text-rose-300";
                        }
                      } else if (isSelected) {
                        btnClass = "bg-cyan-950/60 border-cyan-500 text-cyan-300 font-semibold";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleOptionClick(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs md:text-sm transition-all flex items-start gap-2.5 ${btnClass}`}
                        >
                          <span className="font-mono text-xs text-slate-500 mt-0.5">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-cyan-400">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 11: Plain Text Lecture Note for Printing */}
        <PlainTextPrint
          title="Topic 14: Hands-on Terminal Lab: History Reconstruction & Pickaxe Forensics"
          content={noteText}
        />

        {/* Section 12: Bottom Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs md:text-sm font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 13 (Case Study: Production Bug Diagnosis)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-90 text-slate-950 font-bold text-xs md:text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
          >
            <span>Next: Topic 15 (Module 001_003 Self-Assessment Quiz)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
