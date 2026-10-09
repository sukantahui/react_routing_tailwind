import React, { useState } from 'react';
import {
  Cpu, HardDrive, Zap, Layers, Activity, BookOpen,
  CheckCircle2, AlertTriangle, HelpCircle, FileText,
  Calculator, Monitor, Server, Smartphone, RefreshCw,
  Terminal, ShieldCheck, ArrowRight, CornerDownRight,
  Database, Eye, Sparkles
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/computer_specs_audit.py?raw";

// Interactive Computer System Block Diagram SVG Component
const ComputerArchitectureVisualizer = () => {
  const [activeUnit, setActiveUnit] = useState('cpu');
  const [signalFlow, setSignalFlow] = useState(true);

  const unitDetails = {
    input: {
      title: "Input Unit",
      tag: "Data Ingestion",
      color: "from-sky-500/20 to-sky-600/10 border-sky-500/40 text-sky-300",
      description: "Accepts raw data and instructions from external users via keyboard, mouse, OCR, or barcode scanners. It converts human-understandable signals into binary electrical pulses (0s and 1s) consumable by digital logic circuitry.",
      keyPoints: [
        "Transduces mechanical/optical inputs into binary bitstreams",
        "Buffers input streams before passing to Primary Memory via the System Bus",
        "Examples: Keyboard, Mouse, Optical Mark Reader (OMR), MICR, Webcam"
      ],
      examTip: "CBSE Tip: Input devices perform signal digitization; raw physical energy is translated into machine-readable digital form."
    },
    cpu: {
      title: "Central Processing Unit (CPU)",
      tag: "Brain of the Computer",
      color: "from-amber-500/20 to-amber-600/10 border-amber-500/40 text-amber-300",
      description: "The primary computational engine that executes instructions stored in memory. It orchestrates all operations via the Control Unit (CU), performs mathematical calculations and logical comparisons in the ALU, and temporarily holds working operands in ultra-fast Registers.",
      keyPoints: [
        "Arithmetic Logic Unit (ALU): Executes arithmetic (+, -, *, /) and boolean (AND, OR, NOT, <, >) operations",
        "Control Unit (CU): Decodes instructions, manages timing signals, and directs data traffic across system buses",
        "Internal Registers: High-speed storage slots operating at CPU clock frequency (e.g. Accumulator, PC, IR, MAR)"
      ],
      examTip: "Key Formula: Cycle Time = 1 / Clock Frequency. A 3.2 GHz processor executes 3.2 billion internal clock ticks per second."
    },
    memory: {
      title: "Primary Memory (RAM & ROM)",
      tag: "Internal Storage",
      color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-300",
      description: "Directly accessible by the CPU via address and data buses. Primary memory holds currently executing program instructions, active variables, and kernel routines. RAM is volatile read/write storage, whereas ROM is non-volatile read-only storage.",
      keyPoints: [
        "RAM (Random Access Memory): Direct word-level addressing; loses contents immediately upon power loss",
        "ROM (Read Only Memory): Stores motherboard firmware (BIOS/UEFI) and the bootstrap loader",
        "Cache Memory (L1/L2/L3): Ultra-low-latency SRAM holding frequently requested instructions based on locality of reference"
      ],
      examTip: "CBSE Distinction: RAM is volatile; ROM is non-volatile. Both constitute Primary (Internal) Memory."
    },
    secondary: {
      title: "Secondary Storage Unit",
      tag: "Auxiliary Storage",
      color: "from-purple-500/20 to-purple-600/10 border-purple-500/40 text-purple-300",
      description: "Permanent, high-capacity, non-volatile storage used to store the operating system, installed applications, user documents, and database files. It is not directly byte-addressable by the CPU; data must be paged into RAM before execution.",
      keyPoints: [
        "Magnetic Storage: Hard Disk Drives (HDD) with spinning platters and read/write heads",
        "Solid-State Flash: SSDs using NAND flash transistors with zero moving mechanical parts",
        "Optical Media: CDs, DVDs, Blu-rays read and written using laser diode reflections"
      ],
      examTip: "Storage Rule: Secondary storage is 1,000x to 100,000x slower than RAM but provides massive persistent capacity at low cost per GB."
    },
    output: {
      title: "Output Unit",
      tag: "Human-Readable Results",
      color: "from-rose-500/20 to-rose-600/10 border-rose-500/40 text-rose-300",
      description: "Receives processed binary output from primary memory and converts it into human-comprehensible visual, auditory, or physical formats (e.g. monitor pixels, printed ink, audio waveforms, or robotic actuation).",
      keyPoints: [
        "Converts internal binary code into analog waveforms or visible character glyphs",
        "Soft Copy Devices: VDU / OLED Monitors, LCD projectors, Audio Speakers",
        "Hard Copy Devices: Laser Printers, Inkjet Printers, Impact Dot Matrix, Vector Plotters"
      ],
      examTip: "Terminology: VDU screens deliver 'Soft Copy' output (temporary), while printers deliver 'Hard Copy' output (permanent physical form)."
    }
  };

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      {/* Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Cpu size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Von Neumann Architecture &amp; System Bus Visualizer
            </h3>
            <p className="text-xs text-slate-400">
              Click any functional subsystem to inspect its internal mechanics, signal pathways, and CBSE syllabus importance.
            </p>
          </div>
        </div>

        <button
          onClick={() => setSignalFlow(!signalFlow)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            signalFlow
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Activity size={14} className={signalFlow ? 'animate-spin' : ''} />
          <span>{signalFlow ? 'Active Bus Pulsing: ON' : 'Active Bus Pulsing: OFF'}</span>
        </button>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative overflow-hidden rounded-xl bg-slate-900/80 p-4 border border-slate-800/80">
        <svg viewBox="0 0 820 400" className="w-full h-auto max-w-3xl mx-auto select-none" aria-label="Computer Functional Block Diagram">
          <defs>
            <linearGradient id="cpuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="aluGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="cuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.6" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Bus Backbone */}
          <rect x="70" y="240" width="680" height="24" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="256" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" letterSpacing="2">
            SYSTEM BUS (DATA BUS · ADDRESS BUS · CONTROL BUS)
          </text>

          {/* Pulsing signal dots */}
          {signalFlow && (
            <>
              <circle cx="150" cy="252" r="3.5" fill="#38bdf8" filter="url(#glow)">
                <animate attributeName="cx" from="100" to="720" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="680" cy="252" r="3.5" fill="#34d399" filter="url(#glow)">
                <animate attributeName="cx" from="720" to="100" dur="3s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* INPUT UNIT */}
          <g
            onClick={() => setActiveUnit('input')}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <rect
              x="30"
              y="110"
              width="130"
              height="80"
              rx="10"
              fill={activeUnit === 'input' ? '#0369a1' : '#1e293b'}
              stroke={activeUnit === 'input' ? '#38bdf8' : '#0284c7'}
              strokeWidth={activeUnit === 'input' ? '2.5' : '1.5'}
            />
            <text x="95" y="142" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Input Unit</text>
            <text x="95" y="162" textAnchor="middle" fill="#7dd3fc" fontSize="10">Keyboard, Mouse, OMR</text>
            <path d="M 95 190 L 95 240" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow)" />
          </g>

          {/* CENTRAL PROCESSING UNIT BOX */}
          <g
            onClick={() => setActiveUnit('cpu')}
            className="cursor-pointer"
          >
            <rect
              x="200"
              y="20"
              width="420"
              height="180"
              rx="14"
              fill="url(#cpuGrad)"
              stroke={activeUnit === 'cpu' ? '#f59e0b' : '#d97706'}
              strokeWidth={activeUnit === 'cpu' ? '3' : '1.5'}
              strokeDasharray={activeUnit === 'cpu' ? 'none' : 'none'}
            />
            <text x="410" y="42" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold" letterSpacing="1">
              CENTRAL PROCESSING UNIT (CPU)
            </text>

            {/* ALU */}
            <rect x="220" y="60" width="175" height="60" rx="8" fill="url(#aluGrad)" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="307" y="86" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Arithmetic Logic Unit</text>
            <text x="307" y="104" textAnchor="middle" fill="#bae6fd" fontSize="10">(ALU: Add, Sub, Compare)</text>

            {/* CU */}
            <rect x="425" y="60" width="175" height="60" rx="8" fill="url(#cuGrad)" stroke="#34d399" strokeWidth="1.5" />
            <text x="512" y="86" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Control Unit (CU)</text>
            <text x="512" y="104" textAnchor="middle" fill="#a7f3d0" fontSize="10">(Fetch, Decode &amp; Supervise)</text>

            {/* Internal Registers */}
            <rect x="220" y="130" width="380" height="55" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="410" y="152" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">CPU Registers &amp; Cache L1/L2</text>
            <text x="410" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">
              Accumulator (AC) · Program Counter (PC) · IR · MAR · MBR
            </text>

            {/* Bus link from CPU */}
            <path d="M 410 200 L 410 240" stroke="#f59e0b" strokeWidth="2.5" />
          </g>

          {/* OUTPUT UNIT */}
          <g
            onClick={() => setActiveUnit('output')}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <rect
              x="660"
              y="110"
              width="130"
              height="80"
              rx="10"
              fill={activeUnit === 'output' ? '#e11d48' : '#1e293b'}
              stroke={activeUnit === 'output' ? '#fb7185' : '#e11d48'}
              strokeWidth={activeUnit === 'output' ? '2.5' : '1.5'}
            />
            <text x="725" y="142" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Output Unit</text>
            <text x="725" y="162" textAnchor="middle" fill="#fda4af" fontSize="10">Monitor, Printer, Plotter</text>
            <path d="M 725 240 L 725 190" stroke="#fb7185" strokeWidth="2" strokeDasharray="4 2" />
          </g>

          {/* PRIMARY MEMORY */}
          <g
            onClick={() => setActiveUnit('memory')}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <rect
              x="180"
              y="295"
              width="210"
              height="85"
              rx="10"
              fill={activeUnit === 'memory' ? '#059669' : '#1e293b'}
              stroke={activeUnit === 'memory' ? '#34d399' : '#10b981'}
              strokeWidth={activeUnit === 'memory' ? '2.5' : '1.5'}
            />
            <text x="285" y="325" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Primary Memory</text>
            <text x="285" y="345" textAnchor="middle" fill="#6ee7b7" fontSize="11">RAM (SRAM/DRAM) &amp; ROM</text>
            <text x="285" y="363" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Direct Byte-Addressable</text>
            <path d="M 285 264 L 285 295" stroke="#34d399" strokeWidth="2.5" />
          </g>

          {/* SECONDARY STORAGE */}
          <g
            onClick={() => setActiveUnit('secondary')}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <rect
              x="450"
              y="295"
              width="210"
              height="85"
              rx="10"
              fill={activeUnit === 'secondary' ? '#7c3aed' : '#1e293b'}
              stroke={activeUnit === 'secondary' ? '#c084fc' : '#8b5cf6'}
              strokeWidth={activeUnit === 'secondary' ? '2.5' : '1.5'}
            />
            <text x="555" y="325" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Secondary Storage</text>
            <text x="555" y="345" textAnchor="middle" fill="#d8b4fe" fontSize="11">SSD, NVMe, HDD, Flash</text>
            <text x="555" y="363" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Non-Volatile Bulk Storage</text>
            <path d="M 555 264 L 555 295" stroke="#c084fc" strokeWidth="2.5" />
          </g>
        </svg>
      </div>

      {/* Selected Unit Deep Inspection Drawer */}
      <div className={`p-5 rounded-xl border bg-gradient-to-br transition-all duration-300 ${unitDetails[activeUnit].color}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white tracking-tight">{unitDetails[activeUnit].title}</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 border border-white/20">
              {unitDetails[activeUnit].tag}
            </span>
          </div>
          <span className="text-xs text-slate-300 flex items-center gap-1 font-medium">
            <Eye size={13} /> Active Architectural View
          </span>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed mb-4">
          {unitDetails[activeUnit].description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs">
          <div className="space-y-1.5">
            <span className="font-semibold text-white/90 block">Core Technical Functions:</span>
            {unitDetails[activeUnit].keyPoints.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-slate-300">
                <ArrowRight size={12} className="mt-0.5 shrink-0 text-sky-300" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
          <div className="bg-black/30 p-3 rounded-lg border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-semibold text-amber-300 block mb-1">CBSE Examination Focus:</span>
              <p className="text-slate-300 italic">{unitDetails[activeUnit].examTip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive Memory Units Calculator Widget
const MemoryConverterWidget = () => {
  const [inputValue, setInputValue] = useState(1);
  const [inputUnit, setInputUnit] = useState('GB');

  const unitFactorsInBytes = {
    'Bit': 1 / 8,
    'Nibble': 0.5,
    'Byte': 1,
    'KB': 1024,
    'MB': 1024 ** 2,
    'GB': 1024 ** 3,
    'TB': 1024 ** 4,
    'PB': 1024 ** 5,
    'EB': 1024 ** 6
  };

  const currentBytes = (Number(inputValue) || 0) * unitFactorsInBytes[inputUnit];

  const formatUnit = (bytes, unit) => {
    const val = bytes / unitFactorsInBytes[unit];
    if (val >= 1e12 || (val < 0.0001 && val > 0)) {
      return val.toExponential(4);
    }
    return val.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl p-5 border border-sky-500/30 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Calculator size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Interactive Memory Unit Converter</h4>
            <p className="text-xs text-slate-400">Class XI CBSE Standard Binary Prefix Calculation (Base 2)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Quantity:</label>
          <input
            type="number"
            min="0"
            value={inputValue}
            onChange={(e) => setInputValue(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 font-mono"
            placeholder="e.g. 16"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Source Unit:</label>
          <select
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 font-mono"
          >
            {Object.keys(unitFactorsInBytes).map((u) => (
              <option key={u} value={u}>{u} ({u === 'Bit' ? 'Binary digit' : u === 'KB' ? 'Kilobyte = 1024 B' : u})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Conversion Output Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
        {Object.keys(unitFactorsInBytes).map((targetUnit) => {
          const isSelected = targetUnit === inputUnit;
          return (
            <div
              key={targetUnit}
              className={`p-2.5 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-sky-500/20 border-sky-500/50 text-white shadow-md'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
              }`}
            >
              <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">{targetUnit}</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-sky-300 block truncate" title={`${formatUnit(currentBytes, targetUnit)} ${targetUnit}`}>
                {formatUnit(currentBytes, targetUnit)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
        <Sparkles size={15} className="text-amber-400 shrink-0" />
        <span>
          <strong>CBSE Law:</strong> In digital computing, prefixes use powers of 2 ($2^{10} = 1024$). Hence, $1\text{ KB} = 1024\text{ Bytes}$, $1\text{ MB} = 1024\text{ KB}$, and $1\text{ GB} = 1024\text{ MB}$.
        </span>
      </div>
    </div>
  );
};

export default function Topic0() {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ========================================================= */}
        {/* SECTION 1: HEADER & BREADCRUMB                            */}
        {/* ========================================================= */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/50 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · 10 Marks
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Module 001_001 · Topic 0
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Introduction to Computer Systems: Hardware Components &amp; Functional Units
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Explore the foundational architecture of digital computers based on the Von Neumann model. Master the internal interplay between the Central Processing Unit (ALU, CU, Registers), Primary Memory (RAM, ROM, Cache), System Buses (Data, Address, Control), and Memory Measurement Units.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: IN SIMPLE WORDS (EVERYDAY ANALOGY)             */}
        {/* ========================================================= */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: The Master Chef’s Kitchen Analogy</h2>
              <p className="text-xs text-slate-400">Understanding computer hardware through everyday real-world mechanics</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Imagine a bustling restaurant kitchen in Barrackpore. To cook a gourmet meal efficiently, the kitchen requires specific interconnected workstations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                <Cpu size={16} /> 1. The Head Chef (CPU)
              </span>
              <p className="text-slate-300 leading-relaxed">
                The chef reads recipes (<strong>Control Unit</strong>), performs chopping and mixing (<strong>ALU</strong>), and keeps active spices in handheld bowls for instant access (<strong>CPU Registers</strong>).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                <Layers size={16} /> 2. Kitchen Counter (RAM)
              </span>
              <p className="text-slate-300 leading-relaxed">
                The open countertop holds currently needed ingredients. It is fast and spacious, but when the kitchen closes at night, the counter is wiped completely clean (<strong>Volatile</strong>).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 text-sm flex items-center gap-1.5">
                <HardDrive size={16} /> 3. Basement Pantry (SSD/HDD)
              </span>
              <p className="text-slate-300 leading-relaxed">
                Large sacks of flour and archived recipe binders are stored in the basement. It takes time to retrieve them, but everything stays safely stored even during a power outage (<strong>Non-Volatile</strong>).
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: DEEP CONCEPTUAL EXPLANATION                    */}
        {/* ========================================================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <BookOpen size={18} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Theoretical Grounding: The Von Neumann Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Terminal size={17} className="text-sky-400" /> The Stored-Program Concept
              </h3>
              <p>
                In 1945, mathematician <strong>John von Neumann</strong> proposed a unified computing architecture where both <em>data</em> and the <em>program instructions</em> manipulating that data reside in the same physical primary memory space.
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-400 text-xs">
                <li><strong className="text-slate-200">Sequential Execution:</strong> Instructions are fetched and processed sequentially unless redirected by a branching jump instruction.</li>
                <li><strong className="text-slate-200">Binary Encoding:</strong> Instructions, numeric values, characters, and multimedia are represented uniformly as binary digits (0s and 1s).</li>
                <li><strong className="text-slate-200">System Bus Interconnect:</strong> Communication between CPU, memory, and peripheral controllers is conducted via specialized parallel wiring backbones known as system buses.</li>
              </ul>
            </div>

            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Zap size={17} className="text-amber-400" /> The Tripartite System Bus Architecture
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-bold text-sky-400">1. Data Bus (Bi-directional):</span> Carries raw data and program variables between CPU, RAM, and I/O ports. A 64-bit data bus moves 8 bytes simultaneously.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-bold text-emerald-400">2. Address Bus (Uni-directional):</span> Carries physical memory addresses from the CPU to RAM. An $n$-bit address bus addresses $2^n$ unique bytes ($2^{32} = 4\text{ GB}$, $2^{64} = 16\text{ Exabytes}$).
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-bold text-amber-400">3. Control Bus (Bi-directional):</span> Transmits control and clock synchronization signals like Memory Read (`MEMR`), Memory Write (`MEMW`), and Hardware Interrupts (`INTR`).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: INTERACTIVE ARCHITECTURAL VISUALIZER           */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <ComputerArchitectureVisualizer />
        </div>

        {/* ========================================================= */}
        {/* SECTION 5: DEEP TECHNICAL BREAKDOWN (REGISTERS & UNITS)    */}
        {/* ========================================================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Database size={18} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Deep Technical Breakdown: Registers &amp; Memory Hierarchy
            </h2>
          </div>

          {/* Table: Essential CPU Registers */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 shadow-md">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Register Name</th>
                  <th className="py-3 px-4">Abbr.</th>
                  <th className="py-3 px-4">Functional Role in Execution Cycle</th>
                  <th className="py-3 px-4">Direct Connection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-sky-400">Program Counter</td>
                  <td className="py-3 px-4 text-white">PC</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Holds the memory address of the next instruction to be fetched for execution. Increments automatically after fetch.</td>
                  <td className="py-3 px-4 text-emerald-400">Memory Address Bus</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-sky-400">Memory Address Register</td>
                  <td className="py-3 px-4 text-white">MAR</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Holds the physical memory location that is currently being read from or written to.</td>
                  <td className="py-3 px-4 text-emerald-400">Address Bus</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-sky-400">Memory Buffer / Data Register</td>
                  <td className="py-3 px-4 text-white">MBR / MDR</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Temporarily stores the data or instruction fetched from memory, or waiting to be written to memory.</td>
                  <td className="py-3 px-4 text-amber-400">Data Bus</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-sky-400">Instruction Register</td>
                  <td className="py-3 px-4 text-white">IR</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Holds the current opcode instruction while the Control Unit decodes its operation code and operands.</td>
                  <td className="py-3 px-4 text-rose-400">Control Unit Decoder</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-sky-400">Accumulator Register</td>
                  <td className="py-3 px-4 text-white">AC / ACC</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Stores intermediate arithmetic and logical results computed by the ALU.</td>
                  <td className="py-3 px-4 text-purple-400">ALU Data Path</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Interactive Memory Units Converter */}
          <MemoryConverterWidget />
        </div>

        {/* ========================================================= */}
        {/* SECTION 6: CODE DEMONSTRATION & PYTHON LOADER             */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Code size={18} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Python Laboratory Simulation: Hardware Specification Audit
                </h2>
                <p className="text-xs text-slate-400">
                  Executable script demonstrating memory hierarchy conversion mathematics and 4-stage instruction cycle tracing.
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 transition-all"
            >
              {copiedSnippet ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Terminal size={14} className="text-sky-400" />}
              <span>{copiedSnippet ? 'Copied to Clipboard!' : 'Copy Python Source'}</span>
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="computer_specs_audit.py – Memory Math & Instruction Cycle Simulator"
              highlightLines={[15, 23, 44, 62]}
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 7: REAL-WORLD CASE STUDIES                        */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Server size={18} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Real-World Case Studies: Computing Systems in Action
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-400 flex items-center gap-1.5">
                  <Smartphone size={15} /> Case 1: Smartphone System-on-Chip (SoC)
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono text-[10px]">Mobile Architecture</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Modern phones (Apple A17, Snapdragon 8) integrate CPU, GPU, Neural Engine (NPU), and LPDDR5 RAM controllers directly onto a single silicon die. This miniaturization reduces bus travel latency from nanoseconds to picoseconds and drastically reduces battery drain.
              </p>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Monitor size={15} /> Case 2: School Computer Science Lab PC
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px]">Desktop Workstation</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                A standard lab PC at Army Public School Barrackpore features a 64-bit Intel Core i5 processor (3.2 GHz), 16 GB DDR4 RAM (Primary), and a 512 GB NVMe SSD (Secondary). Operating systems (Ubuntu / Windows 11) boot in under 8 seconds due to high SSD sequential read speeds (3500 MB/s).
              </p>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Calculator size={15} /> Case 3: Supermarket Point-of-Sale (POS)
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-[10px]">Dedicated Appliance</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                A supermarket checkout counter uses an optical barcode scanner (Input), a fanless low-power CPU with 4 GB RAM, and a thermal receipt printer (Output). Transactions are logged instantly to a central PostgreSQL inventory server over an Ethernet local bus.
              </p>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400 flex items-center gap-1.5">
                  <Server size={15} /> Case 4: Cloud Data Center Virtual Machine
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono text-[10px]">Enterprise Scale</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Cloud servers deploy multi-socket AMD EPYC servers with 128 physical CPU cores and 1 Terabyte of ECC registered RAM. They host hundreds of isolated Docker containers executing web apps simultaneously with high data bus throughput.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 8: COMMON PITFALLS & BEST PRACTICES               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Examination Pitfalls
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Confusing RAM and ROM:</strong> Writing that ROM is secondary memory. Both RAM and ROM are Primary (internal) semiconductor memories.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Decimal vs Binary Multipliers:</strong> Multiplying by 1000 instead of 1024 for digital units. $1\text{ KB} = 1024\text{ Bytes}$, not $1000\text{ Bytes}$.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Bit vs Byte Abbreviation:</strong> Using 'b' for byte. Lowercase 'b' denotes <strong>bit</strong>, whereas uppercase 'B' denotes <strong>Byte</strong> (8 bits).</span>
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
                <span><strong>Always Draw the Block Diagram:</strong> For 3-mark or 5-mark computer architecture questions, draw neat labelled boxes for Input, CPU (ALU, CU, Registers), Memory, and Output.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Show Step-by-Step Unit Conversion:</strong> Write $(16 \times 1024 \times 1024 \times 1024)\text{ Bytes}$ explicitly when calculating total bytes in 16 GB.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>State Directionality of Buses:</strong> Explicitly mention that the Address Bus is unidirectional (CPU $\to$ Memory), while Data and Control buses are bidirectional.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 9: HINTS & EXAM ALERTS                            */}
        {/* ========================================================= */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="text-sm font-bold text-amber-300">CBSE High-Frequency Exam Alert (10 Marks CSO Unit)</h4>
            <p className="text-slate-300 leading-relaxed">
              Every year, Section A contains at least one 1-mark question on units of memory (e.g. <em>"How many megabytes are there in 1 Petabyte?"</em>) or identifying which register holds the address of the next instruction (<strong>Program Counter</strong>). Be prepared to calculate exact powers of 2 ($2^{10} = 1\text{ KB}$, $2^{20} = 1\text{ MB}$, $2^{30} = 1\text{ GB}$, $2^{40} = 1\text{ TB}$, $2^{50} = 1\text{ PB}$).
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 10: FAQ ASSESSMENT & PRACTICE                     */}
        {/* ========================================================= */}
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
                Test your knowledge with authentic CBSE Class XI examination questions, MCQs, memory math problems, and case studies.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 11: TEACHER'S NOTE & PRINTABLE SUMMARY            */}
        {/* ========================================================= */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="001_001_computer_organisation_revision_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
