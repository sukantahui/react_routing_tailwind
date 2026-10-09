import React, { useState } from 'react';
import {
  Award, CheckCircle2, XCircle, Clock, AlertTriangle,
  BookOpen, HelpCircle, FileText, ArrowRight, RefreshCw,
  Sparkles, ChevronRight, ChevronLeft, ShieldCheck, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

export default function Topic10() {
  const [activeSection, setActiveSection] = useState('mcq');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQIndex(0);
  };

  const q = questions[currentQIndex];
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 001_002
              </span>
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full">
                Topic 10
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                Self-Assessment
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Practice Your Skill: Module 001_002 Assessment &amp; Quiz
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Test your mastery of software taxonomy, compilers vs interpreters, operating system 4-pillar resource management, and concurrency paradigms.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Interactive Assessment Dashboard */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Award size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Interactive Knowledge Check</h3>
                <p className="text-xs text-slate-400">Question {currentQIndex + 1} of {questions.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {submitted ? (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold">
                    Score: {score} / {questions.length} ({percentage}%)
                  </span>
                  <button
                    onClick={handleResetQuiz}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw size={12} /> Retake
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>

          {/* Question Stepper Indicator */}
          <div className="flex flex-wrap gap-2">
            {questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentQIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-sky-500 text-white ring-2 ring-sky-400/40'
                      : isAnswered
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Card */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
            <h4 className="text-sm sm:text-base font-bold text-white whitespace-pre-line leading-relaxed">
              Q{currentQIndex + 1}. {q.question}
            </h4>

            <div className="space-y-2.5 pt-2">
              {q.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQIndex] === optIdx;
                const isCorrect = q.correctAnswer === optIdx;
                let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                if (submitted) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-sky-500/20 border-sky-500 text-white font-bold shadow-md';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQIndex, optIdx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between gap-3 transition-all cursor-pointer ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {submitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                    {submitted && isSelected && !isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 text-xs text-sky-200 space-y-1">
                <span className="font-bold block text-sky-300">Explanation:</span>
                <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft size={14} /> Previous Question
            </button>

            <button
              onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQIndex === questions.length - 1}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              Next Question <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* 3. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate questions={questions} />
        </div>

        {/* 4. Plain Text Printable */}
        <div className="space-y-4">
          <PlainTextPrint
            fileName="CBSE_Class11_CS_Topic10_Practice_Quiz_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 5. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Module 001_002 Practice Your Skill Assessment"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
