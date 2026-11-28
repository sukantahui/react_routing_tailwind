import React, { useState, useEffect } from 'react';
import {
  FileText, Award, CheckCircle2, Clock, AlertTriangle,
  HelpCircle, ChevronDown, ChevronUp, Printer, Play, Pause, RotateCcw,
  Sparkles, Check, BookOpen, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import sampleSets from "./topic13_files/sample_paper_sets";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

export default function Topic13() {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(45 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  const activeSet = sampleSets[activeSetIndex];

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const toggleSolution = (qKey) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [qKey]: !prev[qKey]
    }));
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(45 * 60);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;
  };

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-amber-400 mb-2">
          <Award className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800/60">
            Periodic Test Series · 10 Practice Sets (20 Marks Each)
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Sample Question Papers: Python Class 11 Revision & Tracing
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Test your mastery across 10 authentic, rigorous 20-mark periodic question sets drawn strictly
          from the topics of this module. Complete with step-by-step marking schemes, interactive solutions,
          and a 45-minute countdown examination timer.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="Periodic assessment sets are where toppers distinguish themselves from the crowd. Each 20-mark paper has been structured according to standard CBSE blue-prints: 4 marks for Section A (MCQs/concepts), 4 marks for Section B (tracing/debugging), 6 marks for Section C (algorithms), and 6 marks for Section D (programming). Set your 45-minute timer, write your code on paper first, and only then reveal the model solution to analyze your step-marking!"
      />

      {/* 3. Examination Controls: Set Selector & Timer */}
      <section className="bg-slate-800/70 rounded-xl p-5 border border-slate-700/70 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Select Question Paper Set (10 Sets Total)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Each set carries exactly 20 marks · Time allowed: 45 minutes</p>
          </div>

          {/* 45-Minute Exam Timer */}
          <div className="flex items-center space-x-3 bg-slate-900/90 px-4 py-2.5 rounded-lg border border-slate-700 self-start md:self-auto">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="font-mono text-xl font-bold text-white tracking-wider">
              {formatTime(timerSeconds)}
            </span>
            <div className="flex items-center space-x-1 pl-2 border-l border-slate-700">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
                title={timerRunning ? "Pause Timer" : "Start Timer"}
              >
                {timerRunning ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              </button>
              <button
                onClick={handleResetTimer}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
                title="Reset Timer (45m)"
              >
                <RotateCcw className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Set Selector Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {sampleSets.map((s, idx) => {
            const isActive = idx === activeSetIndex;
            return (
              <button
                key={s.setId}
                onClick={() => {
                  setActiveSetIndex(idx);
                  handleResetTimer();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                Set {s.setId}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Active Question Paper Sheet */}
      <section className="bg-slate-900 rounded-xl p-6 border border-slate-700/80 shadow-2xl space-y-6">
        {/* Paper Header */}
        <div className="text-center border-b border-slate-700/80 pb-6 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            CBSE Class XII · Computer Science (Code 083)
          </span>
          <h2 className="text-2xl font-black text-white">{activeSet.title}</h2>
          <div className="flex justify-center items-center space-x-6 text-xs text-slate-400 font-mono pt-1">
            <span>Time Allowed: {activeSet.timeAllowed}</span>
            <span>•</span>
            <span className="text-amber-300 font-bold">Maximum Marks: {activeSet.maxMarks}</span>
          </div>
        </div>

        {/* Sections & Questions */}
        <div className="space-y-8">
          {activeSet.sections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-4">
              <div className="bg-slate-800/80 px-4 py-2 rounded-lg border-l-4 border-amber-500">
                <h3 className="text-sm font-bold text-white">{sec.name}</h3>
              </div>

              <div className="space-y-4 pl-2">
                {sec.questions.map((q) => {
                  const qKey = `${activeSet.setId}_${q.qNo}`;
                  const isExpanded = expandedSolutions[qKey];

                  return (
                    <div
                      key={q.qNo}
                      className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 space-y-3 hover:border-slate-600 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-xs font-mono text-sky-400 font-bold">
                            Question {q.qNo}
                          </span>
                          <p className="text-sm font-medium text-slate-100 whitespace-pre-line leading-relaxed font-mono">
                            {q.question}
                          </p>
                        </div>
                        <span className="bg-slate-900 px-2.5 py-1 rounded text-xs font-bold text-amber-300 border border-slate-700 shrink-0">
                          [{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]
                        </span>
                      </div>

                      {/* Solution Toggle */}
                      <div className="pt-2">
                        <button
                          onClick={() => toggleSolution(qKey)}
                          className="flex items-center space-x-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <span>{isExpanded ? "Hide Model Solution" : "View Solution & Marking Scheme"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 text-xs">
                            <div>
                              <span className="text-emerald-400 font-bold block mb-1">
                                CBSE Model Solution / Answer:
                              </span>
                              <pre className="font-mono text-emerald-300 whitespace-pre-wrap bg-slate-900/60 p-2.5 rounded border border-slate-800">
                                {q.solution}
                              </pre>
                            </div>
                            <div>
                              <span className="text-sky-400 font-bold block mb-1">
                                Official Marking Scheme Breakdown:
                              </span>
                              <p className="text-slate-300 italic">
                                {q.markingScheme}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Printable Revision Note */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <span>Quick Revision Blueprint & Test Compilation</span>
        </h3>
        <PlainTextPrint
          title="Sample Papers 10 Sets Blueprint - Quick Reference"
          content={noteText}
        />
      </section>

      {/* 6. Assessment Questions on Blueprint & Strategy */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <HelpCircle className="w-6 h-6" />
          <h3 className="text-xl font-bold text-white">25 Practice Questions on Examination Strategies & Blueprints</h3>
        </div>
        <p className="text-sm text-slate-300">
          Reinforce your test-taking skills, error detection methods, and marking scheme insights:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
