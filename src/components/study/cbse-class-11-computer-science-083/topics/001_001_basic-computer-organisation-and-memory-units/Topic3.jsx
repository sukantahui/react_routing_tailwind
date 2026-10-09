import React, { useState } from 'react';
import {
  RotateCw, Play, SkipForward, Cpu, CheckCircle2,
  AlertTriangle, HelpCircle, FileText, Terminal, BookOpen,
  Calculator, Sparkles, Activity, Layers, ArrowRight, Zap
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/instruction_cycle_tracer.py?raw";

// Interactive 4-Phase Instruction Cycle Simulator
const InstructionCycleVisualizer = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      id: "fetch",
      number: "1",
      name: "FETCH PHASE",
      color: "from-sky-500/20 to-blue-500/10 border-sky-500/40 text-sky-300",
      accent: "bg-sky-500 text-white",
      summary: "Loads the next machine instruction from RAM into the Instruction Register (IR) and increments PC.",
      steps: [
        "1. Program Counter (PC) value (e.g. 0x0100) is placed into Memory Address Register (MAR).",
        "2. Control Unit issues a MEM_READ strobe over the Control Bus.",
        "3. RAM outputs the instruction word ('ADD R1, 20') onto the Data Bus into MDR.",
        "4. MDR copies instruction into Instruction Register (IR).",
        "5. Program Counter (PC) automatically increments (PC = PC + 1) for the next cycle."
      ],
      examTip: "Key Point: The PC is incremented DURING the fetch phase, not after execution finishes!"
    },
    {
      id: "decode",
      number: "2",
      name: "DECODE PHASE",
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300",
      accent: "bg-amber-500 text-slate-950 font-bold",
      summary: "Control Unit translates binary opcode into discrete hardware micro-signals.",
      steps: [
        "1. Control Unit examines the Opcode field (e.g. 'ADD') in the Instruction Register (IR).",
        "2. Decoding matrix activates internal control circuitry for the specific arithmetic operation.",
        "3. Operand addresses (e.g. address 20) are calculated and routed to MAR if memory data is needed.",
        "4. No external bus transfers take place; purely internal CPU logic decoding."
      ],
      examTip: "CBSE Tip: The Control Unit (CU) performs decoding; the ALU is NOT involved in decoding."
    },
    {
      id: "execute",
      number: "3",
      name: "EXECUTE PHASE",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      accent: "bg-emerald-500 text-white",
      summary: "ALU executes computation or decision-making; status flags are updated.",
      steps: [
        "1. ALU receives operands from Accumulator (ACC) and memory buffer (MDR).",
        "2. Binary adders / logic gates compute the final calculation (e.g. 45 + 50 = 95).",
        "3. Status Flags (Zero, Carry, Sign, Overflow) are updated in the Flags Register.",
        "4. For branch/jump instructions, PC is updated with the branch target if condition is met."
      ],
      examTip: "Key Point: Arithmetic calculations happen exclusively in the ALU during Execute."
    },
    {
      id: "store",
      number: "4",
      name: "STORE / WRITEBACK",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300",
      accent: "bg-purple-500 text-white",
      summary: "Stores the computed result back into the Accumulator or persistent RAM location.",
      steps: [
        "1. Result is latched into the destination register (e.g. Accumulator).",
        "2. If storing to RAM: MAR is loaded with destination address, MDR with result value.",
        "3. Control Unit asserts MEM_WRITE on the Control Bus, writing data to RAM.",
        "4. Machine checks for pending Interrupts (INTR) before starting the next Fetch cycle."
      ],
      examTip: "CBSE Tip: Store phase preserves state so subsequent instructions can use the result."
    }
  ];

  return (
    <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <RotateCw size={20} className="animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive 4-Phase Machine Execution Cycle
            </h3>
            <p className="text-xs text-slate-400">
              Click through each sequential phase to trace instruction movement through registers, ALU, and system buses.
            </p>
          </div>
        </div>
      </div>

      {/* Phase Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {phases.map((phase, idx) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(idx)}
            className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
              activePhase === idx
                ? `${phase.color} shadow-lg ring-2 ring-sky-400/40`
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${phase.accent}`}>
                {phase.number}
              </span>
              <span className="font-bold text-xs uppercase tracking-wider text-white truncate">{phase.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Current Phase Details Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-sky-400 px-2.5 py-1 bg-sky-500/10 rounded-md border border-sky-500/20">
              Phase {phases[activePhase].number} of 4
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">
              {phases[activePhase].name}
            </h4>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          {phases[activePhase].summary}
        </p>

        {/* Step List */}
        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 space-y-2.5">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
            Micro-Operation Execution Steps:
          </span>
          {phases[activePhase].steps.map((step, sIdx) => (
            <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
              <ArrowRight size={14} className="text-sky-400 shrink-0 mt-0.5" />
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* Exam Tip Alert */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 flex items-start gap-2">
          <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <span>{phases[activePhase].examTip}</span>
        </div>
      </div>
    </div>
  );
};

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 3
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Unit I: Computer Systems and Organisation (10 Marks)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Instruction Execution Cycle: Fetch, Decode, Execute, and Store Cycle
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the heartbeat of digital computing: the Machine Cycle. Follow the exact journey of a machine instruction from primary RAM into CPU registers, control unit decoders, ALU execution units, and final storage writeback.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <RotateCw className="text-emerald-400" size={24} />
            <h2 className="text-xl font-bold text-white">1. Conceptual Anatomy: The 4 Phases of the Machine Cycle</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-white">Fetch</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                PC supplies address to MAR; instruction fetched from RAM into MDR, then into IR; PC increments.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-white">Decode</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Control Unit translates opcode in IR into micro-signals and identifies required operands.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-white">Execute</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                ALU computes arithmetic/logical operations; branch jumps alter PC if conditional tests succeed.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="text-sm font-bold text-white">Store / Writeback</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Result is saved into Accumulator or written out to RAM; interrupt status is polled.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Visualizer */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-white">2. Interactive Machine Cycle Simulator</h2>
          </div>
          <InstructionCycleVisualizer />
        </div>

        {/* 4. Deep Technical Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Calculator className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">3. Technical Formulae &amp; Performance Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-amber-400 font-bold block text-sm">Core Execution Time Formula</span>
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-emerald-300 border border-slate-800 text-xs">
                Total Execution Time = Instructions × CPI × Clock Period (T)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Where <code>CPI</code> is Cycles Per Instruction, and <code>T = 1 / Frequency</code>.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-sky-400 font-bold block text-sm">Instruction Throughput (MIPS)</span>
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-sky-300 border border-slate-800 text-xs">
                MIPS = Clock Rate (MHz) / (CPI × 10^6)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Measures millions of instructions completed per second.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Code Demonstration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-white">4. Python Code Demonstration: Instruction Cycle Tracer</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="instruction_cycle_tracer.py"
            highlightLines={[25, 36, 46, 60, 78]}
          />
        </div>

        {/* 6. Real-World Case Studies */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <BookOpen className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">5. Real-World Case Studies &amp; Scenarios</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Case 1: Video Game 120 FPS Loop</span>
              <h4 className="text-sm font-bold text-white">Billion Instruction Cycles Per Frame</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                At 120 frames per second, a gaming CPU executes roughly 30 million complete instruction cycles per single frame rendering, calculating physics, lighting, and player collision coordinates.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Case 2: Pipelining in Intel Core i9</span>
              <h4 className="text-sm font-bold text-white">14-Stage Execution Pipeline</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Modern CPUs break the 4 basic phases into 14 or more sub-stages, enabling up to 14 instructions to be processed at different internal stages simultaneously.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Case 3: Hardware Interrupt during Typing</span>
              <h4 className="text-sm font-bold text-white">Interrupt Polling at Instruction Boundaries</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you press a key on your keyboard in Barrackpore, the CPU does not abort midway through an active instruction cycle; it finishes the Store phase, saves PC, and services the keyboard keystroke.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Case 4: Branch Misprediction Cost</span>
              <h4 className="text-sm font-bold text-white">Pipeline Flush Latency</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When a conditional branch test turns out false contrary to CPU prediction, all speculatively fetched instructions in the pipeline are flushed, costing 10 to 15 clock cycles.
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
                <span>Beginner Mistakes</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Claiming PC increments after Execute:</strong> PC increments <em>during the Fetch phase</em> as soon as the address is sent to MAR.</li>
                <li><strong>Assuming ALU decodes instructions:</strong> The Control Unit (CU) performs decoding; the ALU only computes.</li>
                <li><strong>Confusing Instruction Cycle with Clock Cycle:</strong> One instruction cycle requires several clock cycles to complete.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Best Practice Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Always list all 4 phases in order:</strong> Fetch ➔ Decode ➔ Execute ➔ Store (Writeback).</li>
                <li><strong>Mention register interactions:</strong> PC ➔ MAR ➔ RAM ➔ MDR ➔ IR in your 3-mark descriptive answers.</li>
                <li><strong>State Flag updates:</strong> Explicitly mention that ALU updates Zero and Carry flags in the Execute phase.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Sparkles size={18} />
            <span>Mastering the Cycle Flow</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Remember <strong>"F-D-E-S"</strong> (Fetch, Decode, Execute, Store). Fetch gets the recipe, Decode reads the recipe, Execute cooks the dish in the pan (ALU), and Store serves it onto the plate (Accumulator/RAM)!
          </p>
        </div>

        {/* 9. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate
            title="Topic 3 · Instruction Execution Cycle FAQs"
            questions={questions}
          />
        </div>

        {/* 10. Plain Text Printable Document */}
        <div className="space-y-4">
          <PlainTextPrint
            content={noteText}
            filename="topic3_instruction_cycle_note.txt"
            title="CBSE Class XI CS 083 – Topic 3 Revision Handbook"
            hidePreview={false}
            showDownload={true}
          />
        </div>

        {/* 11. Teacher's Note */}
        <Teacher
          note="In the CBSE Class XI exam, questions on the instruction cycle frequently ask you to describe what happens to the Program Counter (PC) and Instruction Register (IR) during each stage. Always specify that PC is incremented immediately during Fetch so it is ready for the next instruction! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
