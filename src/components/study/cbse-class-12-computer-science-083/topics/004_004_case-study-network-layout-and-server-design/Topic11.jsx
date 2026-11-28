import React, { useState } from 'react';
import {
  Award, CheckCircle2, XCircle, Clock, AlertTriangle,
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw,
  Sparkles, ChevronRight, ChevronLeft
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

export default function Topic11() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQIndex(0);
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

  const currentQ = questions[currentQIndex];
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <header className="border-b border-slate-700/60 pb-6">
          <div className="flex items-center space-x-3 text-emerald-400 mb-2">
            <Award className="w-7 h-7" />
            <span className="text-xs font-bold tracking-widest uppercase bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
              Diagnostic Assessment · Module 4 Mastery
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Practice your Skill here: Interactive Diagnostic Assessment
          </h1>
          <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
            Test your comprehensive mastery across all topics of Module 4: Server Placement, Star vs Bus
            cable layout, Repeater and Switch placement rules, Media selection, and Video Conferencing.
          </p>
        </header>

        {/* 2. Teacher Guidance */}
        <Teacher
          teacherName="Sukanta Hui"
          experienceYears="27+"
          designation="Senior Computer Science Faculty & Academic Consultant"
          institution="Coder & AccoTax, Barrackpore"
          message="This 25-question diagnostic assessment tests every edge case you will encounter in the CBSE 4-mark case study problem. Take your time, calculate each layout distance carefully, and aim for a score of 23 or higher out of 25 to ensure an effortless 4/4 in your board examination!"
        />

        {/* 3. Quiz Score Card (When Submitted) */}
        {submitted && (
          <div className="bg-gradient-to-r from-slate-800 via-slate-850 to-slate-900 p-6 rounded-xl border border-emerald-500/50 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Diagnostic Performance Report
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  You Scored {score} / {questions.length} ({percentage}%)
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  {percentage >= 90
                    ? "Outstanding! You have mastered the CBSE 4-mark case study question and are guaranteed full marks."
                    : percentage >= 75
                    ? "Great job! Review the questions you missed below to polish your exam terminology."
                    : "Review the quick revision notes and re-attempt the diagnostic to strengthen your fundamentals."}
                </p>
              </div>
              <button
                onClick={handleResetQuiz}
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md self-start sm:self-center"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-take Assessment</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. Interactive Quiz Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Card */}
          <div className="lg:col-span-3 bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
              <span className="text-sm font-bold text-sky-400">
                Question {currentQIndex + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-400">
                ID #{currentQ.id}
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-lg font-medium text-white leading-relaxed">
                {currentQ.question}
              </p>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === idx;
                  let btnStyle = "border-slate-700 bg-slate-900/70 hover:bg-slate-700/50 text-slate-300";

                  if (isSelected) {
                    btnStyle = "border-sky-500 bg-sky-950/60 text-white font-medium ring-1 ring-sky-500";
                  }

                  if (submitted) {
                    if (idx === currentQ.correctAnswer) {
                      btnStyle = "border-emerald-500 bg-emerald-950/70 text-emerald-200 font-semibold ring-1 ring-emerald-500";
                    } else if (isSelected && idx !== currentQ.correctAnswer) {
                      btnStyle = "border-rose-500 bg-rose-950/70 text-rose-200 ring-1 ring-rose-500";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(currentQ.id, idx)}
                      className={`w-full text-left p-4 rounded-lg border transition-all flex items-start space-x-3 ${btnStyle}`}
                    >
                      <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Hint (Visible after submit or hint button) */}
              {submitted && (
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-700 text-sm space-y-2 mt-4">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Explanation:</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-slate-700/60 pt-4">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(prev => prev - 1)}
                className="flex items-center space-x-1 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {!submitted ? (
                currentQIndex === questions.length - 1 ? (
                  <button
                    onClick={() => setSubmitted(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md"
                  >
                    Submit Assessment
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="flex items-center space-x-1 text-sm text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )
              ) : (
                currentQIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="flex items-center space-x-1 text-sm text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">Review Complete</span>
                )
              )}
            </div>
          </div>

          {/* Question Palette Sidebar */}
          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/60 space-y-4 h-fit">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Question Palette</span>
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentQIndex;
                const isAnswered = selectedAnswers[q.id] !== undefined;
                let bg = "bg-slate-900 border-slate-700 text-slate-400";

                if (isAnswered) {
                  bg = "bg-sky-950 border-sky-600 text-sky-300 font-bold";
                }

                if (submitted) {
                  if (selectedAnswers[q.id] === q.correctAnswer) {
                    bg = "bg-emerald-950 border-emerald-600 text-emerald-300 font-bold";
                  } else {
                    bg = "bg-rose-950 border-rose-600 text-rose-300";
                  }
                }

                if (isCurrent) {
                  bg += " ring-2 ring-white";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded border text-xs font-mono transition-all ${bg}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-700/60 text-xs text-slate-400 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-sky-950 border border-sky-600"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-slate-900 border border-slate-700"></span>
                <span>Unanswered</span>
              </div>
              {submitted && (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-600"></span>
                    <span>Correct</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-rose-950 border border-rose-600"></span>
                    <span>Incorrect</span>
                  </div>
                </>
              )}
            </div>

            {!submitted && (
              <button
                onClick={() => setSubmitted(true)}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-xs font-bold transition-all shadow"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>

        {/* 5. Revision Handbook Note */}
        <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span>Module 4 Summary & Key Takeaways</span>
          </h3>
          <PlainTextPrint
            title="Module 4 Quick Revision Reference"
            content={noteText}
          />
        </section>

      </div>
    </div>
  );
}
