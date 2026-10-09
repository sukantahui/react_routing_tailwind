import React, { useState } from 'react';
import {
  Layers, Cpu, Server, Terminal, Code, BookOpen,
  CheckCircle2, AlertTriangle, HelpCircle, FileText,
  Activity, ShieldCheck, ArrowRight, RefreshCw,
  HardDrive, Sparkles, Binary, Sliders, Monitor
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/os_process_scheduler_sim.py?raw";

// Interactive Software Stack & Translation Visualizer
const SoftwareHierarchyVisualizer = () => {
  const [activeTab, setActiveTab] = useState('stack');
  const [selectedLayer, setSelectedLayer] = useState('os');

  const layersInfo = {
    user: {
      title: "End Users & Operators",
      tag: "Top Layer",
      desc: "Students, developers, bank tellers, and administrative users interacting with applications.",
      example: "Mamata typing Python code in VS Code or accessing school marks portals."
    },
    app: {
      title: "Application Software Layer",
      tag: "User Problem Solving",
      desc: "High-level software designed to accomplish specific user goals. Subdivided into General-Purpose and Tailor-Made (Bespoke) packages.",
      example: "General: MS Excel, Chrome, VLC. Tailor-Made: Railway Reservation, School Fee Manager."
    },
    utilities: {
      title: "System Utilities & Tools",
      tag: "Maintenance & Upkeep",
      desc: "Housekeeping and optimization tools that maintain computer health, disk efficiency, and system security.",
      example: "Antivirus, Disk Defragmenter, WinRAR/7-Zip, File Backup Engines."
    },
    os: {
      title: "Operating System & Kernel",
      tag: "Hardware Supervisor",
      desc: "The central system software that manages CPU scheduling, RAM allocation, file systems, device I/O drivers, and access security.",
      example: "GNU/Linux (Ubuntu/Debian), Windows 11, macOS, Android, RTOS (FreeRTOS)."
    },
    hw: {
      title: "Physical Computer Hardware",
      tag: "Silicon Foundation",
      desc: "Electronic circuitry, microprocessors, memory chips, storage platters/NAND flash, and peripheral devices.",
      example: "Intel/AMD x86-64 CPU, DDR5 RAM, NVMe SSD, GPU, Motherboard System Bus."
    }
  };

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Layers size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Software Classification &amp; Translation Pipeline Explorer
            </h3>
            <p className="text-xs text-slate-400">
              Explore the hierarchical relationship between hardware, system software, utilities, and application layers.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('stack')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeTab === 'stack' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Software Layer Stack
          </button>
          <button
            onClick={() => setActiveTab('translators')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeTab === 'translators' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Language Processors (Translators)
          </button>
        </div>
      </div>

      {activeTab === 'stack' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Stack Visualizer */}
          <div className="lg:col-span-6 space-y-2.5">
            {[
              { id: 'user', name: '1. Users & External Operators', color: 'border-amber-500/50 bg-amber-500/10 text-amber-300' },
              { id: 'app', name: '2. Application Software (General & Tailor-Made)', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' },
              { id: 'utilities', name: '3. System Utilities & Device Drivers', color: 'border-teal-500/50 bg-teal-500/10 text-teal-300' },
              { id: 'os', name: '4. Operating System (Kernel & File System)', color: 'border-sky-500/50 bg-sky-500/10 text-sky-300' },
              { id: 'hw', name: '5. Physical Hardware (CPU, RAM, SSD, Bus)', color: 'border-purple-500/50 bg-purple-500/10 text-purple-300' }
            ].map((layer) => (
              <div
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedLayer === layer.id
                    ? `${layer.color} shadow-lg scale-[1.02]`
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${selectedLayer === layer.id ? 'bg-sky-400 animate-ping' : 'bg-slate-600'}`} />
                  <span className="text-xs sm:text-sm font-bold">{layer.name}</span>
                </div>
                <ArrowRight size={14} className={selectedLayer === layer.id ? 'text-sky-400' : 'text-slate-600'} />
              </div>
            ))}
          </div>

          {/* Layer Detail Card */}
          <div className="lg:col-span-6 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">{layersInfo[selectedLayer].title}</h4>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {layersInfo[selectedLayer].tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {layersInfo[selectedLayer].desc}
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 text-xs">
              <span className="font-semibold text-amber-400 block">Class XI Real-World Example:</span>
              <p className="text-slate-300 italic">{layersInfo[selectedLayer].example}</p>
            </div>
          </div>
        </div>
      ) : (
        /* Language Processors Comparison Table */
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4 text-sky-400">Compiler</th>
                <th className="py-3 px-4 text-emerald-400">Interpreter</th>
                <th className="py-3 px-4 text-purple-400">Assembler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-semibold text-white">Input Source</td>
                <td className="py-3 px-4">High-Level Language (C, C++, Rust)</td>
                <td className="py-3 px-4">High-Level Language (Python, Ruby)</td>
                <td className="py-3 px-4 font-mono">Assembly Mnemonics (MOV, ADD)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-semibold text-white">Translation Manner</td>
                <td className="py-3 px-4">Entire program in a single comprehensive pass</td>
                <td className="py-3 px-4">Line-by-line sequentially at runtime</td>
                <td className="py-3 px-4">Direct 1-to-1 mnemonic to opcode mapping</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-semibold text-white">Intermediate Object Code</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Yes (.obj / .o binary produced)</td>
                <td className="py-3 px-4 text-rose-400 font-semibold">No (Direct execution in memory)</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Yes (Raw machine code binary)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-semibold text-white">Error Reporting</td>
                <td className="py-3 px-4">Lists all syntax errors together after compilation</td>
                <td className="py-3 px-4">Stops immediately at first error encountered</td>
                <td className="py-3 px-4">Reports syntax errors in mnemonics</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-semibold text-white">Execution Speed</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Very Fast (Pre-compiled native code)</td>
                <td className="py-3 px-4 text-amber-400 font-semibold">Moderate / Slower (Runtime overhead)</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Extremely Fast (Native silicon speed)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default function Topic0() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/50 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · 10 Marks
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Module 001_002 · Topic 0
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core + Enrichment
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Types of Software, Operating System Architecture &amp; Language Processors
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Understand the complete software ecosystem: System vs Application software, core Operating System responsibilities (Process, Memory, File, and Device Management), Language Translators (Compilers, Interpreters, Assemblers), Linkers, Loaders, and Advanced OS models.
            </p>
          </div>
        </div>

        {/* SECTION 2: IN SIMPLE WORDS */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: The Airport Ground Control Analogy</h2>
              <p className="text-xs text-slate-400">Demystifying operating system functions through air traffic management</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Think of a busy airport like Kolkata Netaji Subhash Chandra Bose International Airport:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400 text-sm flex items-center gap-1.5">
                <Cpu size={16} /> 1. Runway Scheduler (CPU Mgmt)
              </span>
              <p className="text-slate-300 leading-relaxed">
                Runways (CPU cores) are finite. Air Traffic Control schedules takeoff slots so planes don't collide, ensuring every flight gets fair runway access (<strong>Process Scheduling</strong>).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                <Layers size={16} /> 2. Gate Allocator (RAM Mgmt)
              </span>
              <p className="text-slate-300 leading-relaxed">
                Arrival gates (Memory blocks) are assigned when flights arrive and immediately cleared when passengers disembark to welcome the next flight (<strong>RAM Allocation &amp; Paging</strong>).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 text-sm flex items-center gap-1.5">
                <ShieldCheck size={16} /> 3. Security Check (Kernel Privilege)
              </span>
              <p className="text-slate-300 leading-relaxed">
                Passengers (User Apps) cannot enter the cockpit or runway directly. They must pass security checks and request authorized services (<strong>System Calls</strong>).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: INTERACTIVE VISUALIZER */}
        <div className="space-y-4">
          <SoftwareHierarchyVisualizer />
        </div>

        {/* SECTION 4: ENRICHMENT ADVANCED OS MODELS */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-purple-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Enrichment / Advanced Concept
            </span>
            <h3 className="text-base font-bold text-white">Specialized Operating System Classifications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-sky-400 text-sm">Real-Time Operating System (RTOS)</span>
              <p className="leading-relaxed">
                Engineered for deterministic environments where operations must finish within strict time limits. <strong>Hard RTOS</strong> (pacemakers, anti-lock brakes) has zero margin for error; <strong>Soft RTOS</strong> (multimedia streaming) permits slight jitter without hardware damage.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-emerald-400 text-sm">Distributed Operating System</span>
              <p className="leading-relaxed">
                Coordinates a cluster of multiple physical computers connected over high-speed networks, presenting them to end-users as a single supercomputer with unified file systems and distributed compute nodes.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5: PYTHON LAB CODE DEMONSTRATION */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: OS Kernel Process Scheduler Simulator
              </h2>
              <p className="text-xs text-slate-400">
                A Python program simulating RAM memory allocation and Round-Robin CPU time-slicing among active student processes.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="os_process_scheduler_sim.py – CPU Round Robin & Memory Manager"
              highlightLines={[12, 28, 41, 57]}
            />
          </div>
        </div>

        {/* SECTION 6: REAL-WORLD CASE STUDIES */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Server size={18} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Real-World Case Studies: Operating Systems in Modern Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400 flex items-center gap-1.5">
                <Monitor size={15} /> Case 1: Indian Railways IRCTC Ticketing Engine
              </span>
              <p className="text-slate-300 leading-relaxed">
                IRCTC runs on high-concurrency Linux clusters managing millions of database transactions simultaneously. Multi-threaded OS kernels prevent database deadlocks while issuing e-tickets across India.
              </p>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Cpu size={15} /> Case 2: Mars Rover Flight Software (RTOS)
              </span>
              <p className="text-slate-300 leading-relaxed">
                NASA’s Curiosity and Perseverance rovers run Wind River VxWorks (RTOS). Since radio signals between Earth and Mars take up to 20 minutes, the rover’s RTOS must autonomously execute real-time hazard avoidance.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 7: COMMON PITFALLS & EXAM ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Examination Pitfalls
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Calling Antivirus "System Software":</strong> Antivirus and disk cleanup tools are <strong>Utility Software</strong>, a subcategory supporting system maintenance.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Confusing Compiler vs Interpreter:</strong> Compilers produce reusable object code files; Interpreters directly execute without producing a standalone object binary.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices &amp; Answering Strategy
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Mention All 5 Core OS Functions:</strong> When asked "What are the functions of an OS?", enumerate: (1) Processor, (2) Memory, (3) File, (4) Device I/O, and (5) Security.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Differentiate Linker and Loader:</strong> Linker binds `.obj` modules into an executable; Loader puts the executable into RAM for CPU execution.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 8: FAQ ASSESSMENT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Exam Preparation &amp; Conceptual Self-Assessment (25 Questions)
              </h2>
              <p className="text-xs text-slate-400">
                Test your mastery of software categories, operating system responsibilities, and language processors.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* SECTION 9: TEACHER'S NOTE & PRINTABLE SUMMARY */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="001_002_software_types_and_os_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
