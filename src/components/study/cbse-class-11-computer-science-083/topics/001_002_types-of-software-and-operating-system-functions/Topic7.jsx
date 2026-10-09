import React, { useState } from 'react';
import {
  Layers, Clock, Users, Cpu, ShieldCheck, CheckCircle2,
  AlertTriangle, HelpCircle, BookOpen, Terminal, Sparkles,
  Sliders, Play, RefreshCw, Activity, ArrowRight, Zap
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/os_types_concurrency_sim.py?raw";

// Interactive OS Concurrency Paradigm Workbench
const OsParadigmWorkbench = () => {
  const [selectedType, setSelectedType] = useState('multiprogramming');
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const paradigms = {
    single: {
      name: "1. Single-User Single-Tasking (e.g. MS-DOS)",
      focus: "One user, one program at a time. System is locked during I/O.",
      timeline: [
        { time: "0ms - 20ms", desc: "Program A executes on CPU", state: "CPU Active" },
        { time: "20ms - 50ms", desc: "Program A waits for Disk I/O (CPU sits completely idle)", state: "CPU Idle ⚠️" },
        { time: "50ms - 70ms", desc: "Program A resumes and finishes on CPU", state: "CPU Active" }
      ]
    },
    multiprogramming: {
      name: "2. Multiprogramming OS (CPU Utilization Maximizer)",
      focus: "Switches to Job B immediately when Job A halts for I/O.",
      timeline: [
        { time: "0ms - 20ms", desc: "Job A runs on CPU", state: "Job A CPU" },
        { time: "20ms - 50ms", desc: "Job A halts for Disk Read -> CPU instantly context-switches to Job B", state: "Job B CPU" },
        { time: "50ms - 70ms", desc: "Job A I/O completes -> CPU switches back to Job A", state: "Job A CPU" }
      ]
    },
    timesharing: {
      name: "3. Time-Sharing Multi-User OS (Round Robin Time-Slicing)",
      focus: "Preemptive 10ms time slices across multiple interactive users.",
      timeline: [
        { time: "0ms - 10ms", desc: "Slice 1 allocated to User 1 (Sukanta)", state: "User 1" },
        { time: "10ms - 20ms", desc: "Slice 2 allocated to User 2 (Mamata)", state: "User 2" },
        { time: "20ms - 30ms", desc: "Slice 3 allocated to User 3 (Ananya)", state: "User 3" },
        { time: "30ms - 40ms", desc: "Cycle repeats: Slice 4 allocated back to User 1", state: "User 1" }
      ]
    },
    rtos: {
      name: "4. Real-Time Operating System - RTOS (Hard Deadline)",
      focus: "Guarantees deterministic execution before deadline threshold.",
      timeline: [
        { time: "0.0ms", desc: "Airbag Collision Sensor triggers IRQ interrupt", state: "IRQ Trigger" },
        { time: "1.2ms", desc: "Deterministic Kernel context switch to Safety Task", state: "Kernel ISR" },
        { time: "2.8ms", desc: "Actuator pulse fired (Well within 5.0ms deadline threshold)", state: "Safe Deployment" }
      ]
    }
  };

  const handleRunTimeline = () => {
    setIsSimulating(true);
    setActiveStep(0);
    const stepsCount = paradigms[selectedType].timeline.length;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < stepsCount) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 800);
  };

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Operating System Concurrency Paradigm Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Compare Multiprogramming, Time-Sharing, and Real-Time deterministic scheduling.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunTimeline}
          disabled={isSimulating}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-2 shadow"
        >
          <Play size={14} /> Animate Concurrency Timeline
        </button>
      </div>

      {/* OS Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {Object.entries(paradigms).map(([key, item]) => (
          <button
            key={key}
            onClick={() => { setSelectedType(key); setActiveStep(0); }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedType === key
                ? 'border-amber-500 bg-amber-500/10 text-white shadow-lg'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
            }`}
          >
            <h4 className="text-xs font-bold text-white mb-1 truncate">{item.name}</h4>
            <p className="text-[11px] text-slate-400 line-clamp-2">{item.focus}</p>
          </button>
        ))}
      </div>

      {/* Timeline Visualization */}
      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-slate-300">
            Active Concurrency Timeline: <span className="text-amber-400">{paradigms[selectedType].name}</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Step {activeStep + 1} of {paradigms[selectedType].timeline.length}
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {paradigms[selectedType].timeline.map((item, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md scale-[1.01]'
                    : 'bg-slate-950 border-slate-850 text-slate-400 opacity-70'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">{item.time}</span>
                  <span className="text-xs font-medium text-slate-200">{item.desc}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                  item.state.includes('Idle')
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {item.state}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function Topic7() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 001_002
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Topic 7
              </span>
              <span className="px-3 py-1 bg-sky-500/15 text-sky-300 border border-sky-500/30 text-xs font-bold rounded-full">
                Prescribed &amp; Enrichment
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Types of Operating Systems: Multiprogramming, Time-Sharing &amp; RTOS
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Compare Single-User, Multi-User, Multiprogramming, Time-Sharing systems with enrichment on Real-Time Operating Systems (RTOS) and Distributed architectures.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Intuition & Analogy */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: Doctor Clinic vs Chess Grandmaster</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5"><Users size={14} /> Multiprogramming: Doctor Clinic</span>
              <p className="text-slate-300">
                While Patient A goes to the X-ray room (waiting for I/O), the doctor immediately examines Patient B. The doctor's time (CPU) is never wasted waiting for X-rays.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400 flex items-center gap-1.5"><Clock size={14} /> Time-Sharing: Simultaneous Chess Exhibition</span>
              <p className="text-slate-300">
                A chess grandmaster plays against 30 opponents simultaneously, spending 5 seconds at each board (time quantum). To each opponent, it feels like the grandmaster is playing with them continuously.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Core Theory */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">Comprehensive OS Classification</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-sky-400">1. Multiprogramming OS</h3>
              <p className="text-slate-300">
                Maximizes CPU utilization by loading multiple programs into memory. When the active process halts for I/O, the CPU context-switches to another ready job.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-amber-400">2. Time-Sharing (Multitasking) OS</h3>
              <p className="text-slate-300">
                A logical extension of multiprogramming that allocates rapid CPU time slices (10 to 50ms) to multiple interactive users, minimizing response time.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-emerald-400">3. Real-Time OS (RTOS - Enrichment)</h3>
              <p className="text-slate-300">
                Guarantees deterministic response times for mission-critical systems (automotive airbags, pacemakers, avionics). A late result is treated as a fatal failure.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-purple-400">4. Distributed OS (Enrichment)</h3>
              <p className="text-slate-300">
                Coordinates a cluster of physically separated computers over a network, presenting them as a single unified supercomputer to users.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <OsParadigmWorkbench />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python OS Concurrency &amp; Deadline Simulator</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/001_002_types-of-software-and-operating-system-functions/topic7_files/os_types_concurrency_sim.py"
            fileContent={pythonCode}
          />
        </div>

        {/* 6. Pitfalls & Best Practices */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <AlertTriangle className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">CBSE Examination Pitfalls &amp; Answering Tips</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle size={18} />
                <span>Common Student Mistakes</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Confusing Multiprogramming with Multiprocessing:</strong> Multiprogramming means running multiple programs on a SINGLE CPU core; Multiprocessing means having TWO or MORE physical CPU cores.</li>
                <li><strong>Defining RTOS as just "very fast":</strong> RTOS is not necessarily the fastest; it is <em>deterministic</em> (guarantees timing deadlines).</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>State primary objective for each:</strong> Multiprogramming &rarr; Maximize CPU utilization; Time-Sharing &rarr; Minimize user response time; RTOS &rarr; Satisfy hard deadlines.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 7. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate questions={questions} />
        </div>

        {/* 8. Plain Text Printable */}
        <div className="space-y-4">
          <PlainTextPrint
            fileName="CBSE_Class11_CS_Topic7_OS_Types_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Types of Operating Systems (Multiprogramming, Time-Sharing, RTOS)"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
