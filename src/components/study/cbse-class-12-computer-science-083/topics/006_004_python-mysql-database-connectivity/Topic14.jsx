import React, { useState, useEffect } from "react";
import {
  Clock, Award, BookOpen, FileText, AlertCircle,
  ChevronDown, ChevronUp, RotateCcw, Play, Pause, HelpCircle
} from "lucide-react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import { samplePaperSets } from "./topic14_files/sample_paper_sets";
import { questions } from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

export default function Topic14() {
  const [activeSetId, setActiveSetId] = useState(1);
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const activeSet = samplePaperSets.find((s) => s.setId === activeSetId) || samplePaperSets[0];

  const toggleSolution = (key) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(45 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="dark bg-slate-900 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-sky-400 mb-2">
          <BookOpen className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800/60">
            Unit III: Database Management · Module Assessment
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Sample Question Paper (10 Sets · 20 Marks Each)
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Python-MySQL Database Connectivity: mysql.connector, Cursor & Dynamic CRUD. Complete each timed 45-minute examination paper under rigorous exam conditions with collapsible CBSE model marking schemes.
        </p>
      </header>

      {/* 2. Master Teacher Guidance */}
      <section className="bg-gradient-to-r from-sky-950/60 via-indigo-950/40 to-slate-900 border border-sky-800/50 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-sky-600/30 border border-sky-400/40 flex items-center justify-center flex-shrink-0 text-sky-300 font-bold text-lg">
            SH
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-bold text-white">Master Teacher Guidance · Sukanta Hui</h2>
              <span className="text-xs bg-sky-900/80 text-sky-300 px-2.5 py-0.5 rounded-full border border-sky-700/60">
                Coder & AccoTax, Barrackpore
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              "Python-MySQL connectivity brings together your programming prowess from Unit I with relational database power from Unit III. In the CBSE board exam, writing Python functions with database connectivity carries 3 to 5 marks. The single most frequent mistake is omitting con.commit() after INSERT or UPDATE. Solve all 10 sets honestly in 45 minutes to build flawless exam confidence."
            </p>
          </div>
        </div>
      </section>

      {/* 3. Timed Exam Controller */}
      <section className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Timed Mock Test</span>
            <div className="text-3xl font-mono font-bold text-amber-300">{formatTime(timeLeft)}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {!timerRunning ? (
            <button
              onClick={() => setTimerRunning(true)}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-md shadow-emerald-950"
            >
              <Play className="w-4 h-4" />
              <span>Start Timer</span>
            </button>
          ) : (
            <button
              onClick={() => setTimerRunning(false)}
              className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-md shadow-amber-950"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={resetTimer}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset (45 min)</span>
          </button>
        </div>
      </section>

      {/* 4. Question Set Navigation Tabs (1 to 10) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-sky-400" />
            <span>Select Question Paper Set (10 Sets · 20 Marks Each)</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Current: {activeSet.title}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
          {samplePaperSets.map((s) => (
            <button
              key={s.setId}
              onClick={() => {
                setActiveSetId(s.setId);
                setExpandedSolutions({});
                resetTimer();
              }}
              className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center border ${
                activeSetId === s.setId
                  ? "bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-900/50"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              Set {s.setId}
            </button>
          ))}
        </div>
      </section>

      {/* 5. Active Question Paper Content */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-6">
        <div className="border-b border-slate-700/80 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl font-extrabold text-white">{activeSet.title}</h2>
            <div className="flex items-center space-x-3 text-sm">
              <span className="bg-sky-950/80 text-sky-300 border border-sky-800 px-3 py-1 rounded-full font-semibold">
                Time: {activeSet.timeLimit} Mins
              </span>
              <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-semibold">
                Max Marks: {activeSet.maxMarks}
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-400 italic">
            General Instructions: {activeSet.instructions}
          </p>
        </div>

        {/* Render Sections */}
        <div className="space-y-8">
          {activeSet.sections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-4">
              <h3 className="text-base font-bold text-sky-400 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700/80">
                {sec.sectionName}
              </h3>

              <div className="space-y-4 pl-1 sm:pl-2">
                {sec.questions.map((q) => {
                  const solKey = `${activeSet.setId}_${q.qId}`;
                  const isExpanded = !!expandedSolutions[solKey];

                  return (
                    <div
                      key={q.qId}
                      className="bg-slate-900/90 border border-slate-700/90 rounded-lg p-4 space-y-3 shadow-sm hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-3">
                          <span className="text-xs font-bold font-mono bg-sky-950 text-sky-400 border border-sky-800/60 px-2 py-0.5 rounded mt-0.5">
                            Q{q.qId}
                          </span>
                          <div className="text-sm text-slate-200 font-medium whitespace-pre-line leading-relaxed">
                            {q.text}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded flex-shrink-0">
                          {q.marks}M
                        </span>
                      </div>

                      {/* Model Solution Toggle */}
                      <div className="pt-2 border-t border-slate-800 flex justify-end">
                        <button
                          onClick={() => toggleSolution(solKey)}
                          className="flex items-center space-x-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold py-1 px-2.5 rounded bg-sky-950/40 hover:bg-sky-900/60 border border-sky-800/40 transition-colors"
                        >
                          <span>{isExpanded ? "Hide Model Solution" : "View Model Solution"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="bg-slate-950 border border-slate-800 rounded p-4 text-xs font-mono text-emerald-300 whitespace-pre-line leading-relaxed">
                          <div className="text-amber-400 font-bold mb-1 font-sans flex items-center space-x-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>CBSE Marking Scheme & Solution:</span>
                          </div>
                          {q.solution}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Printable Notes */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-sky-400" />
            <span>Download All 10 Sets in Printable Format</span>
          </h2>
        </div>
        <PlainTextPrint
          content={noteText}
          filename="CBSE_Class12_CS_Python_MySQL_Connectivity_Sample_Paper_10_Sets.txt"
        />
      </section>

      {/* 7. 25 Assessment Strategy Questions */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-white">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold">Exam Readiness & Assessment Questions (25 Questions)</h2>
        </div>
        <FAQTemplate
          questions={questions}
          title="Python-MySQL Connectivity Examination Strategy & Marking Nuances"
        />
      </section>
    </div>
  );
}
