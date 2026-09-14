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
  Award,
  CheckCircle,
  XCircle,
  RotateCcw,
  BookOpen,
  Trophy,
  GraduationCap
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic15_files/topic15_questions";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic 15: Self-Assessment Quiz & Short Questions for Module 001_002
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic15() {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 15;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  // Module 001_002 is complete, next module link if available
  const nextModuleSlug = "001_003_git-branching-merging-and-conflict-resolution";
  const nextModuleUrl = `/${folder}/topic/${nextModuleSlug}/0`;

  const handleSelectOption = (questionId, optionIdx) => {
    if (showResults) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

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
                <span className="text-cyan-400">Topic 15 of {totalTopics} (Final Certification)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Trophy className="w-8 h-8 text-amber-400" />
                Module 001_002 Comprehensive Self-Assessment Quiz
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
                to={nextModuleUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-lg shadow-emerald-600/20"
              >
                Next Module (001_003) <ArrowRight className="w-4 h-4" />
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
              <GraduationCap className="w-3.5 h-3.5" /> Module Mastery Assessment
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Certify Your Knowledge of the Three Trees & Basic Workflow
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Congratulations on completing all 15 instructional topics of Module 001_002! 
              This final self-assessment examination contains <strong>30 comprehensive questions</strong> covering 
              Three-Tree architecture, XY status decoding, patch staging with <code className="text-cyan-300 font-mono">git add -p</code>, 
              Conventional Commits, atomic commits, diff comparisons, and 3-tier exclusion hygiene.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> 30 Rigorous Questions
                </h3>
                <p className="text-slate-400 text-xs">
                  Validates theoretical understanding and real-world terminal commands.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Passing Score: 85%+
                </h3>
                <p className="text-slate-400 text-xs">
                  Demonstrates readiness for Module 001_003 (Branching, Merging & Conflicts).
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> In-depth Explanations
                </h3>
                <p className="text-slate-400 text-xs">
                  Review detailed engineering rationales for every single question upon submission.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: LIVE SCORE & CONTROLS DASHBOARD ─────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> Exam Progress & Score
              </h3>
              <p className="text-xs text-slate-400">
                Answered: {Object.keys(userAnswers).length} of {questions.length} questions
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!showResults ? (
                <button
                  onClick={() => setShowResults(true)}
                  disabled={Object.keys(userAnswers).length === 0}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-md ${
                    Object.keys(userAnswers).length > 0
                      ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/20"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                  }`}
                >
                  Submit Assessment ({Object.keys(userAnswers).length}/{questions.length})
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Exam
                </button>
              )}
            </div>
          </div>

          {showResults && (
            <div className={`p-4 rounded-xl border ${percentage >= 85 ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-300" : "bg-amber-950/30 border-amber-500/30 text-amber-300"} flex flex-wrap items-center justify-between gap-4`}>
              <div>
                <h4 className="font-extrabold text-base flex items-center gap-2">
                  {percentage >= 85 ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
                  Final Score: {score} / {questions.length} ({percentage}%)
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {percentage >= 85
                    ? "🌟 Outstanding performance! You have mastered Git Three-Tree Architecture, Staging, and Conventional Commits."
                    : "💡 Good effort! Review the explanations below and consider retaking the exam to achieve 85%+ mastery."}
                </p>
              </div>

              {percentage >= 85 && (
                <Link
                  to={nextModuleUrl}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  Proceed to Module 001_003 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          )}
        </section>

        {/* ─── SECTION 4: INTERACTIVE 30-QUESTION EXAM RUNNER ──────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Examination Questions (1 – {questions.length})</h2>
          </div>

          <div className="space-y-4">
            {questions.map((q) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition-all ${
                    showResults
                      ? isCorrect
                        ? "bg-emerald-950/10 border-emerald-500/30"
                        : "bg-rose-950/10 border-rose-500/30"
                      : "bg-slate-900 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold">
                        Q{q.id}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-100">{q.question}</h3>
                    </div>
                    {showResults && (
                      <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                        {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      const isCorrectOption = optIdx === q.correctAnswer;
                      return (
                        <button
                          key={optIdx}
                          disabled={showResults}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-3 rounded-lg text-left text-xs font-medium border transition-all flex items-start gap-2.5 ${
                            showResults
                              ? isCorrectOption
                                ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold"
                                : isSelected
                                ? "bg-rose-950/40 border-rose-500 text-rose-200"
                                : "bg-slate-950/50 border-slate-800 text-slate-400 opacity-60"
                              : isSelected
                              ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold shadow-sm"
                              : "bg-slate-950 border-slate-800 hover:bg-slate-800/60 text-slate-300"
                          }`}
                        >
                          <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1 leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Detailed Explanation */}
                  {showResults && (
                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs space-y-1">
                      <strong className="text-cyan-300">Explanation: </strong>
                      <span className="text-slate-300 leading-relaxed">{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── SECTION 5: CLASSROOM MENTORSHIP & FINAL VERDICT ─────────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sukanta Hui's Module 001_002 Certificate Endorsement</h2>
              <p className="text-slate-400 text-sm">Lead Educator, Coder & AccoTax, Barrackpore</p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-300">
            <p>
              <strong className="text-emerald-400">To the Graduating Student:</strong>
            </p>
            <p>
              <em>"You have built a rigorous foundation in Git's Three-Tree Architecture, atomic staging, patch curation, and Conventional Commits. You are now equipped with the exact habits practiced in elite engineering organizations. Carry this discipline forward into Module 001_003 as we explore Branching, Fast-Forward Merges, Three-Way Merges, and Conflict Resolution!"</em>
            </p>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF MODULE 001_002 ─────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Master Commandments of Module 001_002</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Three-Tree Mental Model</span>
              <p className="text-slate-400">Working Directory (Disk) -&gt; Index (Staging) -&gt; HEAD (Commit History).</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. XY Status Competence</span>
              <p className="text-slate-400">Left Column is Staged (Index vs HEAD); Right Column is Unstaged (Disk vs Index).</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Curate with git add -p</span>
              <p className="text-slate-400">Stage clean production hunks and leave debugging statements behind.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. The 50/72 Commit Rule</span>
              <p className="text-slate-400">50-character imperative title, blank line, and 72-character body explaining WHY.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Atomic Singularity</span>
              <p className="text-slate-400">One logical change per commit for flawless bisectability and painless reverts.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Conventional Commits</span>
              <p className="text-slate-400">Use `feat`, `fix`, `docs`, `refactor`, `perf`, `test` for automated SemVer releases.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Three-Tier Ignore Hygiene</span>
              <p className="text-slate-400">Team rules in `.gitignore`, private scripts in `.git/info/exclude`, OS clutter in global.</p>
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
            <span className="text-xs text-slate-400 font-mono">topic15_files/module_002_assessment_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to run the final 5-stage automated certification verification test on your terminal.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic15_files/module_002_assessment_lab.sh`}</pre>
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
                question: "What is the recommended next step after completing Module 001_002?",
                answer: "Proceed directly to Module 001_003: 'Git Branching, Merging, and Conflict Resolution' to learn branch pointers, fast-forward merges, 3-way recursive/ort merges, and conflict resolution strategies."
              },
              {
                question: "How can I review all printable reference notes from Module 001_002?",
                answer: "Each topic contains a printable ASCII note exported in its dedicated `topicN_files/topicN_note.txt` directory, which can be viewed or exported via the PlainTextPrint component."
              },
              {
                question: "Can I retake this self-assessment quiz?",
                answer: "Yes! Click 'Retake Exam' on the dashboard anytime to clear your answers and re-test your knowledge."
              },
              {
                question: "Who is the primary instructor for the Git Master Series?",
                answer: "Sukanta Hui, Founder & Course Mentor at Coder & AccoTax, Barrackpore."
              },
              {
                question: "Where can I find the complete curriculum roadmap?",
                answer: "Navigate to the Git Master Roadmap link in the top navigation bar to explore all segments and modules."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION SUMMARY ────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 15 Assessment Overview</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Complete the 30 questions above to certify your mastery of Module 001_002.
          </p>
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINT & NOTE EXPORT ─────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Printable Reference Note</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">topic15_files/topic15_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic15_module_assessment_notes.txt" />
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
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 14 (Hands-On Lab)
          </Link>
          <Link
            to={nextModuleUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-lg shadow-emerald-600/20"
          >
            Next Module: 001_003 (Git Branching & Merging) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
