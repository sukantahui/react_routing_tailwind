import React, { useState } from 'react';
import {
  Cpu, HardDrive, FolderTree, Printer, Layers,
  CheckCircle2, AlertTriangle, HelpCircle, Terminal,
  BookOpen, Sparkles, Sliders, RefreshCw, Activity,
  Server, ShieldCheck, Play, ArrowRight
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/os_core_managers_sim.py?raw";

// Interactive 4-Pillar OS Resource Management Simulator
const OsFourPillarsSimulator = () => {
  const [activePillar, setActivePillar] = useState('cpu');
  const [cpuQueue, setCpuQueue] = useState([
    { id: 'P1', name: 'VS Code IDE', burst: 4, status: 'Ready' },
    { id: 'P2', name: 'Chrome Browser', burst: 6, status: 'Ready' },
    { id: 'P3', name: 'Spotify Music', burst: 2, status: 'Ready' }
  ]);
  const [runningProcess, setRunningProcess] = useState(null);
  const [ramPartitions, setRamPartitions] = useState([
    { id: 'OS', size: 128, name: 'Linux Kernel (Reserved)', color: 'bg-rose-500/20 border-rose-500 text-rose-300' },
    { id: 'P1', size: 256, name: 'VS Code (0x0080 - 0x0180)', color: 'bg-sky-500/20 border-sky-500 text-sky-300' },
    { id: 'FREE', size: 640, name: 'Free Unallocated RAM', color: 'bg-slate-900 border-slate-700 text-slate-500 border-dashed' }
  ]);
  const [spoolJobs, setSpoolJobs] = useState([
    { id: 'JOB-101', doc: 'CBSE_CS_Sample_Paper.pdf', pages: 8 },
    { id: 'JOB-102', doc: 'Fee_Receipt_Sukanta.pdf', pages: 2 }
  ]);

  const handleRunCpuSchedule = () => {
    if (cpuQueue.length === 0) return;
    const nextProc = cpuQueue[0];
    setRunningProcess(nextProc);
    setCpuQueue(prev => prev.slice(1));
    setTimeout(() => {
      setRunningProcess(null);
    }, 1200);
  };

  const handleAddSpoolJob = () => {
    const newId = `JOB-${Math.floor(100 + Math.random() * 900)}`;
    setSpoolJobs(prev => [...prev, { id: newId, doc: `Document_${newId}.pdf`, pages: Math.floor(1 + Math.random() * 5) }]);
  };

  const handlePrintNext = () => {
    if (spoolJobs.length > 0) {
      setSpoolJobs(prev => prev.slice(1));
    }
  };

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Layers size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Operating System 4-Pillar Resource Manager Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Interact with the 4 primary OS resource modules: Processor, Memory, Files, and Devices.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'cpu', label: '1. Processor Mgr', icon: Cpu },
            { id: 'mem', label: '2. Memory Mgr', icon: Layers },
            { id: 'file', label: '3. File Mgr', icon: FolderTree },
            { id: 'dev', label: '4. Device Mgr', icon: Printer }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePillar(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
                  activePillar === tab.id ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activePillar === 'cpu' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">CPU Scheduling &amp; Process State Queue</h4>
                <p className="text-xs text-slate-400">First-Come First-Served (FCFS) Ready Queue Scheduler.</p>
              </div>
              <button
                onClick={handleRunCpuSchedule}
                disabled={cpuQueue.length === 0 || runningProcess !== null}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-2"
              >
                <Play size={14} /> Dispatch Next Process to CPU
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Ready Queue (FIFO)</span>
                {cpuQueue.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Ready queue is empty.</p>
                ) : (
                  <div className="space-y-1.5">
                    {cpuQueue.map((p) => (
                      <div key={p.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs flex justify-between items-center text-slate-300">
                        <span className="font-bold text-sky-400 font-mono">{p.id}: {p.name}</span>
                        <span className="text-[11px] font-mono text-slate-400">Burst: {p.burst}ms</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Active Running Core (CPU)</span>
                {runningProcess ? (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-center space-y-1 animate-pulse">
                    <span className="text-xs text-emerald-400 font-bold uppercase">Executing on CPU Core 0</span>
                    <h5 className="text-base font-bold text-white">{runningProcess.id} - {runningProcess.name}</h5>
                    <p className="text-[11px] font-mono text-emerald-300">Burst: {runningProcess.burst}ms · Registers Active</p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-slate-500 text-xs italic">
                    CPU Core Idle · Waiting for dispatcher signal
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activePillar === 'mem' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white">Physical RAM Partition Map (1024 MB Total Memory)</h4>
            <p className="text-xs text-slate-400">
              Base &amp; Limit registers isolate the OS Kernel from user application memory partitions.
            </p>

            <div className="space-y-2 font-mono text-xs">
              {ramPartitions.map((part) => (
                <div key={part.id} className={`p-3 rounded-lg border flex items-center justify-between ${part.color}`}>
                  <span className="font-bold">{part.name}</span>
                  <span className="text-xs font-semibold">{part.size} MB</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activePillar === 'file' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white">Hierarchical Directory Tree &amp; File Inodes</h4>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-xs text-slate-300 space-y-2">
              <div>📁 <span className="text-sky-400 font-bold">/ (Root File System - Inode #2)</span></div>
              <div className="pl-4">├── 📁 <span className="text-amber-300">/bin</span> (System Executables: ls, python3, bash)</div>
              <div className="pl-4">├── 📁 <span className="text-emerald-300">/home/student</span></div>
              <div className="pl-8">├── 📄 <span className="text-slate-200">practical_lab.py</span> (Permissions: -rw-r--r--)</div>
              <div className="pl-8">└── 📄 <span className="text-slate-200">cbse_notes.txt</span> (Permissions: -rw-rw-r--)</div>
              <div className="pl-4">└── 📁 <span className="text-purple-300">/var/spool</span> (Printer and Mail Queues)</div>
            </div>
          </div>
        </div>
      )}

      {activePillar === 'dev' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Device Spooler Buffer (Simultaneous Peripheral Operations On-Line)</h4>
                <p className="text-xs text-slate-400">Queues print requests on disk so apps continue without stalling.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddSpoolJob}
                  className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  Send Print Job
                </button>
                <button
                  onClick={handlePrintNext}
                  disabled={spoolJobs.length === 0}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  Print Next Page
                </button>
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {spoolJobs.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-slate-500 text-center italic">
                  Spooler queue empty. All jobs printed.
                </div>
              ) : (
                spoolJobs.map((job, idx) => (
                  <div key={job.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-300">
                    <span className="font-bold text-sky-400">#{idx + 1} [{job.id}] {job.doc}</span>
                    <span className="text-slate-400">{job.pages} Pages queued in disk spool buffer</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Topic4() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 001_002
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Topic 4
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Operating System Core Functions: The 4 Primary Resource Managers
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Master the fundamental duties of an Operating System: Processor Management (CPU Scheduling), Memory Allocation, File Hierarchies, and Device I/O Spooling.
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: The Grand Luxury Hotel Manager</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400 flex items-center gap-1.5"><Cpu size={14} /> Processor Manager</span>
              <p className="text-slate-300">The <strong>Executive Head Chef</strong> scheduling who gets the master cooking stove and for how many minutes per dish.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5"><Layers size={14} /> Memory Manager</span>
              <p className="text-slate-300">The <strong>Front Desk Receptionist</strong> allocating private luxury rooms (RAM partitions) and ensuring guests cannot open other rooms.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5"><FolderTree size={14} /> File Manager</span>
              <p className="text-slate-300">The <strong>Hotel Records Archivist</strong> maintaining labelled filing cabinets for guest bills, records, and access keys.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 flex items-center gap-1.5"><Printer size={14} /> Device Manager</span>
              <p className="text-slate-300">The <strong>Concierge &amp; Valet Queue</strong> parking cars and holding packages in the luggage room (Spooling) until ready.</p>
            </div>
          </div>
        </div>

        {/* 3. Core Theory */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-sky-400" size={24} />
            <h2 className="text-xl font-bold text-white">Detailed Overview of the 4 Core Functions</h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <h3 className="text-base font-bold text-sky-400">1. Processor Management (CPU Scheduling)</h3>
              <p>
                Decides process state transitions (Ready &rarr; Running &rarr; Blocked &rarr; Terminated) and executes scheduling algorithms such as First-Come First-Served (FCFS) and Round Robin (RR) time slicing to maximize CPU utilization.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <h3 className="text-base font-bold text-emerald-400">2. Memory Management (RAM Allocation &amp; Protection)</h3>
              <p>
                Tracks every byte of primary memory, performs dynamic address allocation on program launch, and enforces strict partition isolation through Base and Limit hardware registers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <h3 className="text-base font-bold text-amber-400">3. File Management (Storage &amp; Permissions)</h3>
              <p>
                Organizes data on secondary storage in hierarchical tree folder directories, maintains File Allocation Tables (FAT / NTFS / ext4), and enforces Read, Write, and Execute file access permissions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <h3 className="text-base font-bold text-purple-400">4. Device Management (I/O Subsystems &amp; Spooling)</h3>
              <p>
                Communicates with hardware peripherals via device drivers and coordinates I/O buffering and Spooling (Simultaneous Peripheral Operations On-Line) to avoid stalling fast processors when interacting with slow physical devices.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <OsFourPillarsSimulator />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python OS 4-Pillar Simulation Script</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/001_002_types-of-software-and-operating-system-functions/topic4_files/os_core_managers_sim.py"
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
                <li><strong>Confusing Process with Program:</strong> A Program is a passive collection of instructions stored on disk; a Process is an active program loaded into RAM with CPU state.</li>
                <li><strong>Forgetting the full form of SPOOL:</strong> SPOOL stands for <em>Simultaneous Peripheral Operations On-Line</em>.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Structure answer into the 4 Clear Pillars:</strong> Processor, Memory, File, and Device Management with real-world examples for each.</li>
                <li><strong>Explain Spooling accurately:</strong> Mention intermediate disk buffering for slow I/O devices (like printers).</li>
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
            fileName="CBSE_Class11_CS_Topic4_OS_Core_Functions_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Operating System Core Functions (4 Pillars)"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
