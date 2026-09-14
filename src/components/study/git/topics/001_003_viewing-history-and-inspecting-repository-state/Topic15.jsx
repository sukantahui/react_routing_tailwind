import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Award,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Zap,
  Clock,
  Layers,
  FileCode,
  Check,
  AlertCircle,
  FileText
} from 'lucide-react';

// Common Framework Imports
import Teacher from '../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../common/FAQTemplate';
import PlainTextPrint from '../../../common/PlainTextPrint';
import roadmapData from '../../git-roadmap.json';

// Dedicated Companion File Imports
import questions from './topic15_files/topic15_questions';
import noteText from './topic15_files/topic15_note.txt?raw';

export default function Topic15() {
  const navigate = useNavigate();

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 15;
  const folder = roadmapData.folder || "git";

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/14`;
  const nextTopicUrl = `/${folder}/topic/001_004_safely-undoing-changes-and-basic-recovery/0`;

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

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

  const totalScore = calculateScore();
  const percentage = Math.round((totalScore / questions.length) * 100);
  const isPassed = percentage >= 80;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Section 1: Header */}
        <div className="bg-gradient-to-r from-emerald-900/60 via-slate-900 to-cyan-900/60 p-6 md:p-8 rounded-2xl border border-emerald-500/30 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Award className="w-64 h-64 text-emerald-400" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
              Module 001_003 • Topic 15 (Capstone)
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Assessment Duration: 40 Mins • 30 Questions</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Module 001_003: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Self-Assessment & Capstone Evaluation</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            Validate your mastery across all 15 topics in Module 001_003. Test your skills in commit DAG traversal, custom formatting, pathspec filtering, diff semantics, advanced blame modifiers, and pickaxe forensics.
          </p>
        </div>

        {/* Section 2: Module Taxonomy & Learning Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg w-fit mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">1. Graph & Format Mastery</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Synthesize DAG inspection, branch topologies, formatting decorators, and custom format templates with sub-second terminal speed.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg w-fit mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">2. Scoped Diff & Revision Algebra</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Master asymmetric (<code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded">A..B</code>) and symmetric (<code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded">A...B</code>) diff semantics, pathspecs, and point-in-time blob inspection.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg w-fit mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">3. Line Provenance & Pickaxe</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Effortlessly trace refactored code across moves with <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded">--follow</code> and locate deleted functions with <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded">git log -S</code>.
            </p>
          </div>
        </div>

        {/* Section 3: Assessment Summary Scorecard (When Evaluated) */}
        {showResults && (
          <div className={`p-6 md:p-8 rounded-2xl border ${isPassed ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-amber-950/40 border-amber-500/50'} shadow-2xl transition-all`}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                {isPassed ? (
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-amber-400" />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {isPassed ? "Module 001_003 Mastery Certified! 🎉" : "Review Recommended ⚠️"}
                  </h2>
                  <p className="text-xs text-slate-300">
                    {isPassed
                      ? "Congratulations! You have demonstrated senior-level competency in Git history inspection and forensics."
                      : "You scored below the 80% passing benchmark. Review topics on revision algebra, blame flags, and pickaxe."}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-white">{percentage}%</div>
                <div className="text-xs text-slate-400">{totalScore} of {questions.length} Correct</div>
              </div>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${isPassed ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-rose-400'}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Section 4: Module Command Reference Matrix */}
        <div className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Module 001_003 Master Reference Matrix</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-emerald-300 font-semibold bg-slate-950/60">
                  <th className="p-3">Topic / Concept</th>
                  <th className="p-3">Core Syntax</th>
                  <th className="p-3">Key Modifiers</th>
                  <th className="p-3">Primary Operational Value</th>
                </tr>
              </thead>
              <tbody className="divide-y border-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">0–2: Formats & Graphs</td>
                  <td className="p-3 font-mono text-cyan-300">git log --graph</td>
                  <td className="p-3 font-mono text-slate-400">--oneline --decorate --all</td>
                  <td className="p-3">Visualizing complete repository DAG branching topologies.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">3–5: Scoped Filtering</td>
                  <td className="p-3 font-mono text-cyan-300">git log -- &lt;path&gt;</td>
                  <td className="p-3 font-mono text-slate-400">--since --until --author --grep</td>
                  <td className="p-3">Restricting inspection by date, author name, messages, or files.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">6–8: Diffs & Revisions</td>
                  <td className="p-3 font-mono text-cyan-300">git diff A...B</td>
                  <td className="p-3 font-mono text-slate-400">--stat -p --staged</td>
                  <td className="p-3">Comparing working tree, staged index, or branch fork points.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">9–10: Line Blame</td>
                  <td className="p-3 font-mono text-cyan-300">git blame &lt;file&gt;</td>
                  <td className="p-3 font-mono text-slate-400">-w -C -C -L &lt;start&gt;,&lt;end&gt;</td>
                  <td className="p-3">Line provenance while bypassing formatting and code motion.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">11–13: Pickaxe & Renames</td>
                  <td className="p-3 font-mono text-cyan-300">git log -S &lt;symbol&gt;</td>
                  <td className="p-3 font-mono text-slate-400">-G &lt;regex&gt; --follow</td>
                  <td className="p-3">Deleted code discovery and tracking renamed file lineages.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: Mentorship Dialogue with Barrackpore Cohort */}
        <div className="bg-slate-900/70 p-6 md:p-8 rounded-2xl border border-emerald-500/20 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Barrackpore Capstone Debrief: Final Alignment</h2>
              <p className="text-xs text-emerald-300">Instructor Sukanta Hui reviews the Module 001_003 milestones</p>
            </div>
          </div>

          <div className="space-y-4 text-xs md:text-sm">
            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-cyan-400 font-semibold">
                <span>Sachin Roy (DevOps Associate)</span>
                <span className="text-[10px] text-slate-500 font-mono">11:00 AM</span>
              </div>
              <p className="text-slate-300">
                "Sir, across this entire module, we've learned dozens of flags. What is the single most important habit for an engineer in high-pressure production troubleshooting?"
              </p>
            </div>

            <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-800/40 space-y-2 ml-4">
              <div className="flex items-center justify-between text-emerald-300 font-bold">
                <span>Sukanta Hui (Lead Instructor)</span>
                <span className="text-[10px] text-emerald-400 font-mono">11:03 AM</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                "Always combine visual scoping with surgical precision. Start high with <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">git log --graph --oneline -n 10</code> to see the macro topology, then zoom into the file with <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">git log --stat -- &lt;path&gt;</code>, and finally pinpoint changes with <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">git blame -w -L</code> or <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">git log -S</code>. Never guess when the Git DAG contains the exact mathematical truth."
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: The 7 Commandments of Repository Mastery */}
        <div className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">The 7 Immutable Laws of Repository Inspection</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
            {[
              "1. Trust the DAG: every commit SHA is a cryptographically verifiable state snapshot.",
              "2. Always disambiguate pathspecs from branch names with '--'.",
              "3. Use 'git diff A...B' when reviewing feature branch PR changes against main.",
              "4. Never attribute blame without '-w' when automated code formatting is present.",
              "5. Use '-S' to find deleted symbols whose original filename or path has been lost.",
              "6. Always enable '--follow' to preserve historical context across renamed files.",
              "7. Master CLI inspection tools to maintain complete operational independence from Web GUIs."
            ].map((rule, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Executable Assessment Script */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base md:text-lg font-bold text-white">Verification Shell Lab: <code className="text-emerald-300 font-mono text-sm">module_003_assessment_lab.sh</code></h2>
            </div>
            <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded">Interactive Companion</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-48">
            <pre><code>{`# Run the capstone assessment repo generator:
chmod +x module_003_assessment_lab.sh
./module_003_assessment_lab.sh`}</code></pre>
          </div>
        </div>

        {/* Section 8: Teacher Sukanta Hui */}
        <Teacher />

        {/* Section 9: FAQ Section */}
        <FAQTemplate
          title="Frequently Asked Questions: Module 001_003 Capstone"
          faqs={[
            {
              question: "What should I do if I scored under 80% on this assessment?",
              answer: "Identify which questions you missed (e.g. revision ranges, blame flags, or pickaxe search). Revisit Topics 8, 10, and 11, execute the shell scripts, and retake the quiz."
            },
            {
              question: "What is covered in the next module (Module 001_004)?",
              answer: "Module 001_004 covers 'Safely Undoing Changes and Basic Recovery', including git restore, git checkout, git reset (--soft, --mixed, --hard), git revert, git clean, and git reflog."
            },
            {
              question: "How do I print this complete module note for offline study?",
              answer: "Use the PlainTextPrint box below to view, copy, or print the unified Markdown summary of Module 001_003."
            }
          ]}
        />

        {/* Section 10: Quiz Component (30 MCQs) */}
        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Module 001_003 Comprehensive Assessment Quiz</h2>
                <p className="text-xs text-slate-400">30 Comprehensive MCQs covering Topics 0 through 14</p>
              </div>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {showResults ? "Hide Evaluation" : "Evaluate Quiz"}
            </button>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

              return (
                <div key={q.id} className="p-5 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 bg-slate-800 text-emerald-400 text-xs font-mono font-bold rounded">
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
                        btnClass = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold";
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
                      <span className="font-bold text-emerald-400">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 11: Plain Text Print Summary */}
        <PlainTextPrint
          title="Module 001_003 Capstone Summary Note"
          content={noteText}
        />

        {/* Section 12: Bottom Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs md:text-sm font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 14 (Hands-on Terminal Lab)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-slate-950 font-bold text-xs md:text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
          >
            <span>Next Module: 001_004 (Safely Undoing Changes)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
