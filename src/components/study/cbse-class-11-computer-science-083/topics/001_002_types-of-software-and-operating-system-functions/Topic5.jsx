import React, { useState } from 'react';
import {
  Layers, Server, ShieldCheck, Terminal, Cpu,
  CheckCircle2, AlertTriangle, HelpCircle, BookOpen,
  Sparkles, Sliders, Play, RefreshCw, Zap, Lock, Unlock
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/os_resource_allocator.py?raw";

// Interactive System Call & Hardware Abstraction Layer Visualizer
const SystemCallTrapVisualizer = () => {
  const [activeCall, setActiveCall] = useState('write');
  const [currentRing, setCurrentRing] = useState('ring3'); // ring3 (User), ring0 (Kernel)
  const [isExecuting, setIsExecuting] = useState(false);
  const [eventLogs, setEventLogs] = useState([]);

  const calls = {
    write: {
      api: "write(fd=1, buffer='Hello CBSE', size=10)",
      hwAction: "Write bytes to SSD Block LBA 0x8F40 & flush disk write-cache",
      driver: "NVMe Storage Host Controller Driver"
    },
    socket: {
      api: "socket_send(dest='192.168.1.1', payload=packet)",
      hwAction: "Transmit Ethernet frame via Gigabit PHY transceiver controller",
      driver: "Realtek PCIe Gigabit Ethernet Controller Driver"
    },
    audio: {
      api: "play_audio(pcm_stream, volume=80)",
      hwAction: "Route digital PCM stream to High Definition Audio DAC converter",
      driver: "Realtek High Definition Audio Driver"
    }
  };

  const handleTriggerTrap = () => {
    setIsExecuting(true);
    const selected = calls[activeCall];
    
    setEventLogs([
      `[1. USER SPACE (Ring 3)] Application initiates high-level API call: ${selected.api}`,
      `[2. HARDWARE TRAP] CPU detects INT 0x80 / SYSCALL instruction. CPU elevates privilege to Kernel Mode (Ring 0).`,
      `[3. KERNEL SPACE (Ring 0)] Kernel verifies memory pointers and dispatches to: ${selected.driver}`,
      `[4. PHYSICAL HARDWARE] ${selected.hwAction}`,
      `[5. RETURN FROM TRAP] Operation complete. CPU safely de-elevates back to User Mode (Ring 3).`
    ]);
    
    setCurrentRing('ring0');
    setTimeout(() => {
      setCurrentRing('ring3');
      setIsExecuting(false);
    }, 1200);
  };

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Hardware Abstraction Layer (HAL) &amp; Dual-Mode CPU Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Observe how the OS Virtual Machine intercepts user calls and transitions privilege from Ring 3 (User) to Ring 0 (Kernel).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className={`px-3 py-1 rounded-full border flex items-center gap-1.5 font-bold transition-all ${
            currentRing === 'ring0'
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
              : 'bg-sky-500/20 border-sky-500 text-sky-300'
          }`}>
            {currentRing === 'ring0' ? <Lock size={12} /> : <Unlock size={12} />}
            Current CPU Level: {currentRing === 'ring0' ? 'Ring 0 (Kernel Mode)' : 'Ring 3 (User Mode)'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.entries(calls).map(([key, item]) => (
          <button
            key={key}
            onClick={() => { setActiveCall(key); setEventLogs([]); }}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeCall === key
                ? 'border-purple-500 bg-purple-500/10 text-white shadow-lg'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">System Call</span>
            <code className="text-xs font-mono text-white block truncate">{item.api.split('(')[0]}()</code>
          </button>
        ))}
      </div>

      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 block">Selected High-Level API Call:</span>
            <code className="text-sm font-bold font-mono text-sky-300">{calls[activeCall].api}</code>
          </div>
          <button
            onClick={handleTriggerTrap}
            disabled={isExecuting}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Play size={14} /> Execute System Call via Trap
          </button>
        </div>

        {eventLogs.length > 0 && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2 font-mono text-xs">
            <span className="text-slate-500 font-bold block mb-1">Execution Sequence:</span>
            {eventLogs.map((log, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg ${
                  idx === 0 ? 'bg-sky-950/40 text-sky-300 border border-sky-900/40' :
                  idx === 1 ? 'bg-amber-950/40 text-amber-300 border border-amber-900/40 font-bold' :
                  idx === 2 || idx === 3 ? 'bg-purple-950/40 text-purple-300 border border-purple-900/40' :
                  'bg-emerald-950/40 text-emerald-300 border border-emerald-900/40'
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Topic5() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 001_002
              </span>
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full">
                Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Operating System as a Resource Manager and Virtual Machine
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Explore the dual nature of an OS: bottom-up resource arbitrator (Time &amp; Space Multiplexing) and top-down extended machine (Hardware Abstraction Layer &amp; System Calls).
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: Modern Automobile Dashboard</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400 flex items-center gap-1.5"><Server size={14} /> The Resource Manager: Engine ECU</span>
              <p className="text-slate-300">
                The Engine Control Unit allocates fuel injection timing, monitors temperature sensors, and distributes battery voltage to spark plugs fairly so the engine doesn't stall.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 flex items-center gap-1.5"><ShieldCheck size={14} /> The Virtual Machine: Steering Wheel &amp; Pedals</span>
              <p className="text-slate-300">
                The driver doesn't manually inject petrol or adjust alternator coils; you just turn the steering wheel and press the accelerator pedal. The dashboard provides a clean, abstract virtual interface to complex mechanical machinery.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Core Theory */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">Dual Architectural Perspectives of the OS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">Perspective 1</span>
              <h3 className="text-lg font-bold text-white">The Resource Manager (Bottom-Up View)</h3>
              <p className="text-slate-300 leading-relaxed">
                Manages physical hardware components (CPU, RAM, Disks, Network cards) to ensure orderly and fair allocation across competing programs.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                <li><strong>Time Multiplexing:</strong> Programs take turns using the CPU (Round Robin / FCFS scheduling).</li>
                <li><strong>Space Multiplexing:</strong> Programs share physical RAM and disk storage concurrently in separate address partitions.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">Perspective 2</span>
              <h3 className="text-lg font-bold text-white">The Virtual / Extended Machine (Top-Down View)</h3>
              <p className="text-slate-300 leading-relaxed">
                Presents an abstract, user-friendly virtual computer to programmers, hiding messy physical register and voltage manipulation behind clean System Calls.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                <li><strong>Hardware Abstraction Layer (HAL):</strong> Converts low-level interrupts into clean APIs like <code className="text-sky-300">open()</code>, <code className="text-sky-300">read()</code>, <code className="text-sky-300">write()</code>.</li>
                <li><strong>Dual-Mode Protection:</strong> Enforces User Mode (Ring 3) vs Kernel Mode (Ring 0) execution safety.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <SystemCallTrapVisualizer />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python OS Extended Machine &amp; Trap Simulation</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/001_002_types-of-software-and-operating-system-functions/topic5_files/os_resource_allocator.py"
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
                <li><strong>Thinking "Virtual Machine" only means VMware or VirtualBox:</strong> In computer architecture theory, the OS itself is called the Virtual Machine / Extended Machine because it abstracts raw hardware.</li>
                <li><strong>Confusing User Mode and Kernel Mode:</strong> User applications never run in Kernel Mode; doing so would allow any buggy script to crash the hardware.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Explain both perspectives:</strong> Always mention both the bottom-up Resource Manager role (time/space multiplexing) and top-down Extended Machine role (abstraction/system calls).</li>
                <li><strong>Define System Call Trap:</strong> Mention that system calls trigger software interrupts to transition CPU privilege from User Mode to Kernel Mode.</li>
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
            fileName="CBSE_Class11_CS_Topic5_OS_Virtual_Machine_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="OS as a Resource Manager and Virtual Machine"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
