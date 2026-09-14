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
  Split,
  FolderGit2,
  Check,
  Award,
  RotateCcw,
  XCircle,
  GraduationCap
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic 14: Self-Assessment Quiz & Graduation Exam for Module 002_003
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic14() {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 14;
  const folder = roadmapData.folder || "git";

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/13`;
  const nextModuleUrl = `/${folder}/topic/002_004_git-stash-and-worktrees/0`;

  const examQuestions = [
    {
      id: 1,
      q: "What is the primary technical effect of running `git rebase main` on a feature branch?",
      options: [
        "It creates a 2-parent 3-way merge commit on the feature branch",
        "It deletes all commits on the feature branch and resets to main",
        "It replays the feature branch commits sequentially on top of the tip of main as new single-parent commits",
        "It pushes the feature branch to the remote repository"
      ],
      correct: 2,
      explanation: "Rebase replays the patch deltas on top of the target base tip, recreating each commit with new SHA-1 hashes and single parent pointers."
    },
    {
      id: 2,
      q: "What is the Golden Rule of Git Rebasing?",
      options: [
        "Always rebase before running git commit",
        "Never rebase commits that exist outside your private repository and that others may have based work on",
        "Only rebase on weekends",
        "Never rebase branches with more than 5 commits"
      ],
      correct: 1,
      explanation: "Rebasing public/shared commits rewrites history and forces duplicate commits and merge anomalies across teammates' repositories."
    },
    {
      id: 3,
      q: "When a conflict occurs during a rebase, what command should you run after staging the resolved files?",
      options: [
        "git commit -m 'resolved'",
        "git rebase --continue",
        "git merge --continue",
        "git push --force"
      ],
      correct: 1,
      explanation: "Always stage with `git add` and run `git rebase --continue`. Never run `git commit` during a rebase conflict!"
    },
    {
      id: 4,
      q: "What does `git rebase --abort` do?",
      options: [
        "Deletes the repository",
        "Cancels the rebase and safely rolls back the branch and working tree to the exact pre-rebase state",
        "Skips the currently conflicting commit",
        "Pushes unresolved conflict markers to GitHub"
      ],
      correct: 1,
      explanation: "`git rebase --abort` reads `.git/rebase-merge/orig-head` and resets HEAD and the branch ref to its pre-rebase state."
    },
    {
      id: 5,
      q: "In an interactive rebase TODO file, how are commits ordered from top to bottom?",
      options: [
        "Reverse chronological order (newest commit on top)",
        "Alphabetical order by commit message",
        "Chronological order (oldest commit on top, newest at bottom)",
        "Randomized order"
      ],
      correct: 2,
      explanation: "Interactive rebase executes lines top-to-bottom, so the oldest commit is on line 1 and the newest is at the bottom."
    },
    {
      id: 6,
      q: "What is the difference between the `squash` and `fixup` directives in interactive rebase?",
      options: [
        "Squash deletes the commit; fixup keeps it",
        "Squash combines into previous commit and lets you edit both messages; fixup combines and discards this commit's message",
        "Fixup can only be used on the first commit; squash on the last",
        "They are 100% identical"
      ],
      correct: 1,
      explanation: "`fixup` silently discards the second commit message, making it ideal for typo and formatting fixes."
    },
    {
      id: 7,
      q: "What directive allows you to pause a rebase to split a megacommit into multiple atomic commits?",
      options: [
        "drop",
        "reword",
        "edit",
        "exec"
      ],
      correct: 2,
      explanation: "The `edit` directive pauses execution at that commit, allowing you to run `git reset HEAD~` and create atomic commits."
    },
    {
      id: 8,
      q: "What command creates a targeted fixup commit that works seamlessly with `--autosquash`?",
      options: [
        "git commit --amend",
        "git commit --fixup <commit_hash>",
        "git commit --squash-all",
        "git add --patch"
      ],
      correct: 1,
      explanation: "`git commit --fixup <sha>` formats the commit message as `fixup! <original_subject>` for automated autosquash reordering."
    },
    {
      id: 9,
      q: "What directive runs an automated test command after each replayed commit during interactive rebase?",
      options: [
        "test",
        "check",
        "exec <command>",
        "run <command>"
      ],
      correct: 2,
      explanation: "`exec <command>` (e.g. `exec npm test`) runs the shell command after the preceding commit and pauses if it fails."
    },
    {
      id: 10,
      q: "What safer flag should you use instead of `git push --force` after rebasing a private PR branch?",
      options: [
        "git push --safe",
        "git push --force-with-lease",
        "git push --no-verify",
        "git push --all"
      ],
      correct: 1,
      explanation: "`--force-with-lease` checks if anyone else has updated the remote branch reference before overwriting, preventing accidental data loss."
    }
  ];

  const handleSelect = (qId, optionIdx) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    examQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correct) {
        score += 10;
      }
    });
    return score;
  };

  const score = calculateScore();
  const passed = score >= 75;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-purple-500/30 selection:text-purple-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 border border-purple-700/50 text-purple-300">
                  Topic {currentIndex} of {totalTopics - 1} (Final Assessment)
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 border border-amber-700/50 text-amber-300">
                  Passing Score: 75%
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003 Graduation
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-purple-400" />
                Final Self-Assessment Exam: Module 002_003
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
              {submitted && passed && (
                <Link
                  to={nextModuleUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-600/50 bg-purple-950/60 hover:bg-purple-900/80 text-xs font-medium text-purple-300 transition shadow-sm shadow-purple-950"
                >
                  Next Module (002_004) <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: EXAM HERO CARD ──────────────────────────────────── */}
        <section className="rounded-2xl border border-purple-900/40 bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Module Certification Exam
              </span>
              <h2 className="text-2xl font-bold text-white">
                Module 002_003: Rebase & History Linearization Examination
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Test your mastery of Git Rebase, DAG rewriting, the Golden Rule, conflict resolution,
                interactive directives (`pick`, `squash`, `fixup`, `edit`, `drop`, `exec`), and automated autosquash.
                Score <strong>75% or higher</strong> to unlock your official <em>Rebase Wizard Badge</em>!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE QUIZ QUESTIONS ──────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">10 Certification Questions (100 Points Total)</h2>
            </div>
            {submitted && (
              <div className={`text-sm font-bold font-mono px-3 py-1 rounded-full border ${
                passed ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-rose-950 border-rose-500 text-rose-300"
              }`}>
                Score: {score}/100 ({passed ? "PASSED" : "FAILED - RETRY"})
              </div>
            )}
          </div>

          <div className="space-y-6">
            {examQuestions.map((q, idx) => {
              const selected = userAnswers[q.id];
              const isCorrect = selected === q.correct;
              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    submitted
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-800/60"
                        : "bg-rose-950/20 border-rose-800/60"
                      : "bg-slate-900/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                      {q.q}
                    </h3>
                  </div>

                  <div className="space-y-2 pl-9">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      let optionClasses = "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700";

                      if (submitted) {
                        if (optIdx === q.correct) {
                          optionClasses = "border-emerald-500 bg-emerald-950/60 text-emerald-200 font-semibold";
                        } else if (isOptionSelected) {
                          optionClasses = "border-rose-500 bg-rose-950/60 text-rose-200";
                        }
                      } else if (isOptionSelected) {
                        optionClasses = "border-purple-500 bg-purple-950/60 text-purple-200 font-semibold";
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-xs sm:text-sm cursor-pointer flex items-center justify-between transition ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {submitted && optIdx === q.correct && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                          {submitted && isOptionSelected && optIdx !== q.correct && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-3 ml-9 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                      <strong className="text-cyan-400">Explanation: </strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit / Reset Actions */}
          <div className="flex items-center justify-between pt-4">
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length < examQuestions.length}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-white shadow-lg shadow-purple-950 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Submit Exam & Calculate Score
              </button>
            ) : (
              <button
                onClick={() => {
                  setSubmitted(false);
                  setUserAnswers({});
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-sm font-semibold text-slate-200 transition"
              >
                <RotateCcw className="w-4 h-4" /> Retake Exam
              </button>
            )}
          </div>
        </section>

        {/* ─── SECTION 4: BADGE UNLOCKED CELEBRATION ──────────────────────── */}
        {submitted && passed && (
          <section className="rounded-2xl border-2 border-purple-500/60 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-purple-600/20 border-2 border-purple-500 text-purple-400 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-purple-900">
              🧙‍♂️
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                Official Graduation Certificate
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Rebase Wizard Badge Unlocked! ✨
              </h2>
              <p className="text-slate-300 text-sm max-w-xl mx-auto mt-2">
                Congratulations! You have demonstrated comprehensive mastery over Git commit DAG rewriting,
                interactive surgical directives, and clean linear storytelling.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to={nextModuleUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-purple-500/50 bg-purple-900 hover:bg-purple-800 font-bold text-white shadow-xl shadow-purple-950 transition"
              >
                Proceed to Module 002_004: Git Stash & Worktrees <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

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
              Teacher's Graduation Remarks
            </h3>

            <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-2 text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300">Sukanta Sir:</strong>
              <p>
                "Heartiest congratulations on graduating from Module 002_003!
                Rebasing is often called Git's most intimidating feature, but you now understand that it is simply an automated, elegant patch replay machine.
                Carry the Golden Rule in your heart, keep your private feature branches linear and pristine, and prepare for our next frontier:
                <strong> Module 002_004: Git Stash & Multi-Tasking with Git Worktree</strong>!"
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 14: Final Assessment & Graduation (Printable Notes)" />
        </section>

        {/* ─── SECTION 7: FAQ & STRUCTURED Q&A ────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Frequently Asked Questions & Comprehensive Exam Review
              </h2>
              <p className="text-xs text-slate-400">
                28 structured review questions summarizing all module concepts
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} />

          {/* Bottom Navigation Bar */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-800">
            <Link
              to={prevTopicUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-sm font-medium text-slate-200 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Hands-on Terminal Lab
            </Link>

            <Link
              to={nextModuleUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950 hover:bg-purple-900 text-sm font-semibold text-purple-200 shadow-lg shadow-purple-950/60 transition"
            >
              Start Next Module: Git Stash & Worktrees <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
