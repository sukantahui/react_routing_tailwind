import React, { useState } from 'react';
import { 
  Cpu, Binary, Layers, Code, Play, CheckCircle2, 
  AlertTriangle, HelpCircle, Sparkles, BookOpen, 
  ArrowRight, RefreshCw, ShieldCheck, Terminal, 
  Database, Server, Zap, Compass, FileCode
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const JvmPipelineSimulator = () => {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineSteps = [
    {
      id: "source",
      title: "1. Java Source Code",
      file: "BarrackporeStore.java",
      badge: "Human Readable",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      icon: FileCode,
      codePreview: `public class BarrackporeStore {\n    public static void main(String[] args) {\n        int billAmount = 450;\n        System.out.println("Total: ₹" + billAmount);\n    }\n}`,
      description: "Developers write high-level Java code in plain text files with the .java extension. This code contains classes, variables, and logic readable by humans.",
      actionText: "Run javac compiler to generate platform-independent Bytecode."
    },
    {
      id: "compiler",
      title: "2. Java Compiler (javac)",
      file: "javac BarrackporeStore.java",
      badge: "Compilation Phase",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      icon: Terminal,
      codePreview: `Command executed:\n$ javac BarrackporeStore.java\n\nResult:\n[OK] 0 Syntax Errors.\n[OUTPUT] Created 'BarrackporeStore.class' (482 bytes)`,
      description: "The javac compiler checks syntax, verifies variable types, and translates high-level code into intermediate Java Bytecode instructions.",
      actionText: "Produced BarrackporeStore.class containing 0xCAFEBABE magic number."
    },
    {
      id: "bytecode",
      title: "3. Platform-Neutral Bytecode",
      file: "BarrackporeStore.class",
      badge: "Magic: 0xCAFEBABE",
      color: "text-indigo-400",
      border: "border-indigo-500/40",
      bg: "bg-indigo-500/10",
      icon: Binary,
      codePreview: `Hex Dump: CA FE BA BE 00 00 00 3D ...\n\nJVM Opcodes:\n0: sipush 450\n3: istore_1\n4: getstatic #2 // System.out\n7: invokevirtual #3 // println`,
      description: "Bytecode is a highly compact, optimized instruction set designed for the abstract Java Virtual Machine, independent of Windows, Linux, or macOS.",
      actionText: "Ready to be loaded by any OS-specific JVM runtime."
    },
    {
      id: "jvm_loader",
      title: "4. JVM ClassLoader & Verifier",
      file: "ClassLoader Subsystem",
      badge: "Security Sandbox",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      icon: ShieldCheck,
      codePreview: `[ClassLoader] Loading 'BarrackporeStore.class' into Method Area...\n[Bytecode Verifier] Scanning opcodes for security...\n[PASS] No illegal memory pointers.\n[PASS] Stack and type integrity verified.`,
      description: "The ClassLoader loads .class files into memory. The Bytecode Verifier rigorously checks for buffer overflows and illegal memory access before execution begins.",
      actionText: "Memory safely allocated in JVM Runtime Data Areas."
    },
    {
      id: "execution",
      title: "5. Execution Engine (Interpreter + JIT)",
      file: "HotSpot Execution Engine",
      badge: "Runtime Engine",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      icon: Cpu,
      codePreview: `[Interpreter] Reading opcode 'sipush 450' -> push to stack\n[Interpreter] Executing 'invokevirtual println'\n[JIT Profiler] Hotspot detected -> compiling to Native x86 Code\n[STDOUT] Total: ₹450`,
      description: "The Interpreter executes bytecode line-by-line. The Just-In-Time (JIT) compiler compiles frequently executed 'hotspots' directly into native CPU machine instructions for maximum speed.",
      actionText: "Program executes and produces output on host hardware."
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
            <Cpu className="w-4 h-4" />
            <span>Interactive JVM Architecture Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Bytecode Execution Pipeline: From <code className="text-amber-300">.java</code> to Native Machine Code
          </h3>
        </div>
        <button
          onClick={() => setActiveStep((prev) => (prev + 1) % pipelineSteps.length)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Next Execution Step</span>
        </button>
      </div>

      {/* Step Navigation Pill Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                isActive
                  ? `${step.bg} ${step.border} border-2 shadow-lg shadow-amber-500/10`
                  : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-amber-400/20 text-amber-300" : "bg-slate-800 text-slate-400"}`}>
                  Step {idx + 1}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? step.color : "text-slate-500"}`} />
              </div>
              <p className={`text-xs font-bold truncate ${isActive ? "text-white" : "text-slate-300"}`}>
                {step.title.split(". ")[1]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Card */}
      {(() => {
        const cur = pipelineSteps[activeStep];
        const Icon = cur.icon;
        return (
          <div className={`p-6 rounded-2xl border ${cur.border} ${cur.bg} transition-all duration-300 space-y-4`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-slate-950 border ${cur.border} ${cur.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{cur.badge}</span>
                  <h4 className="text-lg font-bold text-white">{cur.title}</h4>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300">
                Target: {cur.file}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {cur.description}
            </p>

            {/* Code / State terminal preview */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-slate-500 text-[11px]">
                <span>Terminal Inspection // {cur.file}</span>
                <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Active State</span>
              </div>
              <pre className="text-amber-200/90 whitespace-pre-wrap leading-relaxed">{cur.codePreview}</pre>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{cur.actionText}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

const JvmMemoryMapExplorer = () => {
  const [activeArea, setActiveArea] = useState('heap');

  const areas = {
    method: {
      name: "Method Area / Metaspace",
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      border: "border-sky-500/40",
      stored: "Class Metadata, Method Bytecode Instructions, Static Variables, Runtime Constant Pool",
      details: "Shared across all threads. Loaded once by the ClassLoader. Holds blueprint information for every class loaded into the JVM.",
      cbseExample: "Static variable `public static int schoolCode = 802;` is stored here."
    },
    heap: {
      name: "Heap Memory",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/40",
      stored: "Instantiated Objects, Instance Fields, Array Objects created using 'new'",
      details: "Shared across all threads. When `new Student()` is called, the instance is allocated here. Managed automatically by the Garbage Collector.",
      cbseExample: "`Student s1 = new Student();` -> s1 reference points to the object in Heap memory."
    },
    stack: {
      name: "Java Stack Memory",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/40",
      stored: "Stack Frames, Method Call Hierarchy, Local Variables, Primitive values, Object References",
      details: "Private to each thread. Each method call pushes a new Stack Frame. Frame is popped immediately when method returns. Overfilling causes StackOverflowError.",
      cbseExample: "Inside `public void calculateTotal() { int discount = 50; }` -> `discount` is in the Stack Frame."
    },
    pc: {
      name: "Program Counter (PC) Register",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/40",
      stored: "Memory address of currently executing JVM Bytecode instruction for that specific thread",
      details: "Each thread has its own PC Register. As instructions execute, the PC Register advances to point to the next instruction.",
      cbseExample: "Tracks the next opcode (e.g. instruction #7 `invokevirtual`) during thread execution."
    },
    native: {
      name: "Native Method Stack",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/40",
      stored: "Execution state and parameters for native C / C++ functions invoked via JNI (Java Native Interface)",
      details: "Enables Java to interact with underlying OS drivers and native system libraries.",
      cbseExample: "Invoking system time or low-level windowing subsystem functions."
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
        <Layers className="w-4 h-4" />
        <span>JVM Runtime Data Areas Breakdown</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-white">
        Inside JVM Memory: Heap vs Stack vs Method Area
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {Object.entries(areas).map(([key, area]) => (
          <button
            key={key}
            onClick={() => setActiveArea(key)}
            className={`p-3 rounded-2xl border text-xs font-bold transition cursor-pointer text-left ${
              activeArea === key
                ? `${area.bg} ${area.border} ${area.color} border-2`
                : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/60"
            }`}
          >
            {area.name.split(" ")[0]} Area
          </button>
        ))}
      </div>

      {(() => {
        const cur = areas[activeArea];
        return (
          <div className={`p-6 rounded-2xl border ${cur.border} ${cur.bg} space-y-4`}>
            <div className="flex items-center justify-between">
              <h4 className={`text-lg font-black ${cur.color}`}>{cur.name}</h4>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                CBSE Key Concept
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block">What is Stored Here:</span>
                <p className="text-slate-200 leading-relaxed">{cur.stored}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block">Operational Details:</span>
                <p className="text-slate-300 leading-relaxed">{cur.details}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/30 text-xs font-mono text-amber-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>CBSE Example:</strong> {cur.cbseExample}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default function Topic0() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Cpu className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_001 • Topic 0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          The Purpose and Role of the <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">Java Virtual Machine (JVM)</span> in Executing Bytecode
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Discover how the Java compiler (<code className="text-amber-300 font-mono">javac</code>) converts source code into portable bytecode (<code className="text-amber-300 font-mono">.class</code>) and how the JVM executes it seamlessly across any operating system through its ClassLoader, Memory Areas, Interpreter, and JIT Compiler.
        </p>
      </div>

      {/* Interactive JVM Simulator */}
      <div className="max-w-6xl mx-auto">
        <JvmPipelineSimulator />
      </div>

      {/* Memory Areas Breakdown */}
      <div className="max-w-6xl mx-auto">
        <JvmMemoryMapExplorer />
      </div>

      {/* Core Comparison Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Code className="w-4 h-4" />
            <span>1. Java Source Code (.java)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Written by developers in high-level human-readable syntax. Cannot be executed directly by the CPU.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Binary className="w-4 h-4" />
            <span>2. Java Bytecode (.class)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Platform-independent intermediate machine code for the JVM. Magic number: <code className="text-amber-300">0xCAFEBABE</code>.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <span>3. Java Virtual Machine (JVM)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Platform-dependent runtime engine. Loads bytecode, verifies safety, and translates opcodes to host CPU instructions.
          </p>
        </div>
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: JVM & Bytecode Revision Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: JVM & Bytecode" 
          description="Test your mastery of JVM subsystems, Bytecode verification, JIT compilation, and memory areas with instant bilingual English and Bengali explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Always remember the golden rule for CBSE IT-802: Java Source Code (.java) and Bytecode (.class) are PLATFORM-INDEPENDENT, but the JVM software itself is PLATFORM-DEPENDENT (Windows, Linux, macOS each need their own JVM binary)." 
        />
      </div>
    </div>
  );
}
