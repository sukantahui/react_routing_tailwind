import React, { useState } from 'react';
import {
  Cpu, Zap, Layers, Activity, BookOpen,
  CheckCircle2, AlertTriangle, HelpCircle, FileText,
  Calculator, Monitor, Server, RefreshCw,
  Terminal, ShieldCheck, ArrowRight, CornerDownRight,
  Database, Eye, Sparkles, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/cpu_registers_sim.py?raw";

// Interactive CPU Registers & ALU Execution Engine
const CpuInternalSim = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [registers, setRegisters] = useState({
    PC: "0x0004",
    IR: "ADD R1, [0x00A0]",
    MAR: "0x00A0",
    MDR: "150",
    ACC: "320",
    FLAGS: { Z: 0, N: 0, C: 0, O: 0 }
  });
  const [selectedReg, setSelectedReg] = useState('PC');

  const regInfo = {
    PC: {
      name: "Program Counter (PC)",
      role: "Instruction Pointer",
      desc: "Holds the memory address of the NEXT instruction waiting to be fetched into the execution pipeline.",
      importance: "Critical for sequential execution, loops, and conditional jumping.",
      cbseTip: "During normal execution, PC increments automatically. On a JUMP or CALL, PC is loaded with the destination address."
    },
    IR: {
      name: "Instruction Register (IR)",
      role: "Opcode Buffer",
      desc: "Holds the binary instruction word currently being decoded and executed by the Control Unit.",
      importance: "Preserves the opcode and operand fields steady while micro-operations trigger.",
      cbseTip: "The IR is connected directly to the Control Unit decoder logic and is not modified during decoding."
    },
    MAR: {
      name: "Memory Address Register (MAR)",
      role: "Address Bus Latch",
      desc: "Holds the exact physical memory address in RAM that CPU wants to read from or write to.",
      importance: "Directly drives the unidirectional Address Bus pins of the CPU package.",
      cbseTip: "The bit-width of MAR determines the maximum directly addressable physical RAM size (2^N bytes)."
    },
    MDR: {
      name: "Memory Data Register (MDR / MBR)",
      role: "Data Bus Transceiver",
      desc: "Holds the data or instruction word transferred across the bidirectional Data Bus.",
      importance: "Acts as a two-way electrical buffer between the high-speed CPU core and external RAM.",
      cbseTip: "For a Memory READ, data travels RAM -> Data Bus -> MDR. For a Memory WRITE, data travels MDR -> Data Bus -> RAM."
    },
    ACC: {
      name: "Accumulator (ACC)",
      role: "Arithmetic Workhorse",
      desc: "A dedicated internal register that stores intermediate arithmetic and logical results computed by the ALU.",
      importance: "Eliminates the latency of constantly writing temporary calculations back to main RAM.",
      cbseTip: "In single-accumulator architectures, one operand of an ALU operation is implicitly taken from the Accumulator."
    }
  };

  const steps = [
    { title: "1. Instruction Fetch Initiation", pc: "0x0004", mar: "0x0004", mdr: "FETCHING...", ir: "...", acc: "320", desc: "PC contains address 0x0004. This address is copied into MAR to initiate a memory read across the Address Bus." },
    { title: "2. Memory Word Arrival", pc: "0x0005", mar: "0x0004", mdr: "ADD R1, [0x00A0]", ir: "ADD R1, [0x00A0]", acc: "320", desc: "RAM returns the instruction word into MDR. MDR is copied into IR, and PC increments to 0x0005." },
    { title: "3. Operand Address Latching", pc: "0x0005", mar: "0x00A0", mdr: "WAITING RAM...", ir: "ADD R1, [0x00A0]", acc: "320", desc: "Control Unit decodes IR, identifies operand address 0x00A0, and places 0x00A0 into MAR to fetch the data value." },
    { title: "4. Operand Fetch", pc: "0x0005", mar: "0x00A0", mdr: "150", ir: "ADD R1, [0x00A0]", acc: "320", desc: "RAM location 0x00A0 returns value 150 into MDR. ALU prepares to add 150 to current ACC (320)." },
    { title: "5. ALU Execution & Accumulation", pc: "0x0005", mar: "0x00A0", mdr: "150", ir: "ADD R1, [0x00A0]", acc: "470", desc: "ALU executes Addition: 320 + 150 = 470. Result is latched into Accumulator (ACC). Flags updated." }
  ];

  const handleStep = (idx) => {
    setCurrentStep(idx);
    const s = steps[idx];
    setRegisters(prev => ({
      ...prev,
      PC: s.pc,
      MAR: s.mar,
      MDR: s.mdr,
      IR: s.ir,
      ACC: s.acc
    }));
  };

  return (
    <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Cpu size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive CPU Internal Registers &amp; ALU Pipeline Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Step through machine cycle execution and click any register to view its hardware purpose.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Step {currentStep + 1} of {steps.length}</span>
        </div>
      </div>

      {/* Step Sequence Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {steps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => handleStep(idx)}
            className={`px-3 py-2 rounded-xl text-left transition-all cursor-pointer border text-xs font-semibold ${
              currentStep === idx
                ? 'bg-amber-500/20 border-amber-500/80 text-amber-300 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <div className="font-bold truncate">{step.title}</div>
          </button>
        ))}
      </div>

      {/* Registers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { key: 'PC', label: 'PC (Prog Counter)', val: registers.PC, color: 'border-sky-500/40 text-sky-400 bg-sky-500/10' },
          { key: 'IR', label: 'IR (Instr Register)', val: registers.IR, color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
          { key: 'MAR', label: 'MAR (Address Reg)', val: registers.MAR, color: 'border-purple-500/40 text-purple-400 bg-purple-500/10' },
          { key: 'MDR', label: 'MDR (Data Reg)', val: registers.MDR, color: 'border-rose-500/40 text-rose-400 bg-rose-500/10' },
          { key: 'ACC', label: 'ACC (Accumulator)', val: registers.ACC, color: 'border-amber-500/40 text-amber-400 bg-amber-500/10' }
        ].map((item) => (
          <div
            key={item.key}
            onClick={() => setSelectedReg(item.key)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedReg === item.key
                ? `${item.color} ring-2 ring-amber-400/40 shadow-lg`
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">{item.label}</div>
            <div className="text-sm sm:text-base font-mono font-extrabold text-white mt-1 truncate">{item.val}</div>
          </div>
        ))}
      </div>

      {/* Step Explanation Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3 text-xs leading-relaxed">
        <Activity size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300">Phase Details: </span>
          <span className="text-slate-300">{steps[currentStep].desc}</span>
        </div>
      </div>

      {/* Selected Register Deep Dive Card */}
      {selectedReg && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-mono font-bold rounded-md border border-amber-500/30">
                {selectedReg}
              </span>
              <h4 className="text-sm font-bold text-white">{regInfo[selectedReg].name}</h4>
              <span className="text-xs text-slate-400 font-mono">({regInfo[selectedReg].role})</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{regInfo[selectedReg].desc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-semibold block mb-1">Architecture Importance:</span>
              <span className="text-slate-300">{regInfo[selectedReg].importance}</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-semibold block mb-1">CBSE Exam Key Point:</span>
              <span className="text-slate-300">{regInfo[selectedReg].cbseTip}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 1
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Unit I: Computer Systems and Organisation (10 Marks)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Central Processing Unit (CPU): ALU, Control Unit (CU), and Dedicated Registers
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the micro-architecture of the Central Processing Unit. Understand how the Arithmetic Logic Unit executes computations, how the Control Unit sequences micro-operations, and how dedicated internal registers (PC, IR, MAR, MDR, Accumulator) enable lightning-fast machine cycles.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Cpu className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">1. Conceptual Anatomy of the Central Processing Unit</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Calculator size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Arithmetic Logic Unit (ALU)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The computational muscle of the CPU. It executes basic arithmetic (addition, subtraction, multiplication, integer division) and logical comparisons (equal, greater than, less than, boolean AND/OR/NOT).
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                <Zap size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Control Unit (CU)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The supervisory conductor. It reads instructions from the Instruction Register (IR), decodes them into discrete electrical control pulses, and synchronizes the transfer of data across internal buses.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Database size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Internal CPU Registers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ultra-fast, flip-flop memory cells located directly inside the processor silicon. They provide immediate, zero-wait storage for instruction pointers, target addresses, and intermediate ALU results.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Semantic Visual SVG Illustration & Interactive Tool */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="text-amber-400" size={20} />
            <h2 className="text-lg font-bold text-white">2. Interactive Architecture Visualizer</h2>
          </div>
          <CpuInternalSim />
        </div>

        {/* 4. Deep Technical Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Layers className="text-sky-400" size={24} />
            <h2 className="text-xl font-bold text-white">3. Technical Breakdown: Dedicated Registers Specification</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/80 text-amber-300">
                  <th className="p-3 font-bold">Register</th>
                  <th className="p-3 font-bold">Full Name</th>
                  <th className="p-3 font-bold">Primary Function</th>
                  <th className="p-3 font-bold">Connected Bus</th>
                  <th className="p-3 font-bold">Direct Programmer Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-sky-400">PC</td>
                  <td className="p-3">Program Counter</td>
                  <td className="p-3">Stores address of NEXT instruction to be fetched</td>
                  <td className="p-3 font-mono">Internal to MAR</td>
                  <td className="p-3 text-rose-400 font-semibold">No (Indirect via Jumps)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-emerald-400">IR</td>
                  <td className="p-3">Instruction Register</td>
                  <td className="p-3">Holds the current instruction opcode during decoding</td>
                  <td className="p-3 font-mono">Internal to CU</td>
                  <td className="p-3 text-rose-400 font-semibold">No</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-purple-400">MAR</td>
                  <td className="p-3">Memory Address Register</td>
                  <td className="p-3">Holds the physical memory address for Read/Write</td>
                  <td className="p-3 font-mono text-amber-300">Address Bus (Unidirectional)</td>
                  <td className="p-3 text-rose-400 font-semibold">No</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-rose-400">MDR / MBR</td>
                  <td className="p-3">Memory Data Register</td>
                  <td className="p-3">Holds data or instruction word entering/leaving memory</td>
                  <td className="p-3 font-mono text-cyan-300">Data Bus (Bidirectional)</td>
                  <td className="p-3 text-rose-400 font-semibold">No</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-amber-400">ACC</td>
                  <td className="p-3">Accumulator</td>
                  <td className="p-3">Holds intermediate calculations and logic results</td>
                  <td className="p-3 font-mono">ALU Internal Bus</td>
                  <td className="p-3 text-emerald-400 font-semibold">Yes (Assembly / Assembly APIs)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Code Demonstration (<PythonFileLoader>) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-white">4. Python Code Demonstration: CPU Register Pipeline</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="cpu_registers_sim.py"
            highlightLines={[12, 13, 14, 15, 34, 42, 60]}
          />
        </div>

        {/* 6. Real-World Case Studies & Examples */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <BookOpen className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">5. Real-World Case Studies &amp; Scenarios</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Case 1: While Loop in Python</span>
              <h4 className="text-sm font-bold text-white">Program Counter (PC) Jump Mechanics</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When a student in Barrackpore writes <code>while count &lt; 10:</code>, the Python runtime compiles this to a conditional jump instruction. If true, PC increments normally; when <code>count == 10</code>, the CU updates PC with the address past the loop block.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Case 2: 64-bit Word Expansion</span>
              <h4 className="text-sm font-bold text-white">Registers in Intel Core i7 &amp; Apple M3</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Modern 64-bit processors feature 64-bit wide registers (RAX, RBX, RCX). A single instruction can add two 64-bit integers in 0.25 nanoseconds without requiring multi-step arithmetic splitting.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Case 3: Arithmetic Overflow Detection</span>
              <h4 className="text-sm font-bold text-white">Status Flags in Financial Calculations</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When adding two large positive numbers results in a negative sign bit in 2's complement, the ALU sets the Overflow Flag (O=1). Banking software uses this flag to prevent numerical balance corruption.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Case 4: Function Calls &amp; Subroutines</span>
              <h4 className="text-sm font-bold text-white">Stack Pointer (SP) &amp; Return Address</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When calling a Python function, the current PC value (return address) is pushed into RAM using the Stack Pointer (SP) register. Once the function executes <code>return</code>, PC is restored from the stack.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <AlertTriangle className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">6. Common Exam Pitfalls &amp; Best Practices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle size={18} />
                <span>Beginner Exam Misconceptions</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Confusing MAR and MDR:</strong> Thinking MAR holds the data value. (Remember: MAR holds the Memory Address; MDR holds the actual Data/Instruction).</li>
                <li><strong>Assuming CU does Math:</strong> Thinking the Control Unit performs additions. (The CU strictly directs; only the ALU calculates).</li>
                <li><strong>Believing PC holds the current instruction:</strong> PC holds the address of the <em>NEXT</em> instruction, not the current one.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Pro Tips &amp; Best Practices</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Always mention Bus Directionality:</strong> MAR connects to the unidirectional Address Bus; MDR connects to the bidirectional Data Bus.</li>
                <li><strong>Cycle Time Formula:</strong> Always state <code>T = 1 / Frequency</code> when asked to calculate processor execution speeds.</li>
                <li><strong>Remember Status Flags:</strong> Mention the Zero (Z) and Carry (C) flags when explaining conditional branch execution.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Sparkles size={18} />
            <span>Memory Retention Hint for CBSE Board Exams</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Think of the CPU as a master workshop: <strong>CU is the Supervisor</strong> who reads the blueprints (IR), <strong>ALU is the Craftsman</strong> who uses the calculator, <strong>Registers are the Toolbelt pockets</strong> right on the craftsman's waist for immediate reach, and <strong>RAM is the Storage Warehouse</strong> outside in the courtyard connected by delivery tracks (System Buses).
          </p>
        </div>

        {/* 9. Frequently Asked Questions (<FAQTemplate>) */}
        <div className="space-y-4">
          <FAQTemplate
            title="Topic 1 · Central Processing Unit (CPU) &amp; Registers FAQs"
            questions={questions}
          />
        </div>

        {/* 10. Plain Text Printable Document (<PlainTextPrint>) */}
        <div className="space-y-4">
          <PlainTextPrint
            content={noteText}
            filename="topic1_cpu_registers_note.txt"
            title="CBSE Class XI CS 083 – Topic 1 Revision Handbook"
            hidePreview={false}
            showDownload={true}
          />
        </div>

        {/* 11. Teacher's Note (<Teacher>) */}
        <Teacher
          note="Make sure you can draw the CPU block diagram showing ALU, CU, PC, IR, MAR, MDR, and Accumulator from memory! In CBSE Class XI examinations, this is a standard 3-mark question. Pay close attention to the arrows showing bus directions: Address Bus is one-way outwards, while Data Bus is two-way. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
