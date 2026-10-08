import React, { useState } from 'react';
import { 
  Globe, Laptop, Monitor, Layers, Cpu, Code, 
  CheckCircle2, XCircle, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  RefreshCw, Terminal, Box, Package, FileCode, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const WoraCrossPlatformLab = () => {
  const [selectedOs, setSelectedOs] = useState('windows');

  const osProfiles = {
    windows: {
      name: "Microsoft Windows 11 (x86_64)",
      icon: Monitor,
      badge: "Windows JVM",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      jvmBinary: "jvm.dll (Oracle HotSpot for Windows)",
      nativeTranslation: "Translates bytecode into x86_64 PE instructions with Windows API calls (kernel32.dll, user32.dll)",
      terminalLog: `C:\\Schools\\Kolkata> java SchoolFeeApp\n[Windows JVM Initialized]\nLoaded: SchoolFeeApp.class (Checksum: 0xCAFEBABE)\nOutput: Student: Rahul Sen | Fee: ₹1850.00 | Status: PAID`,
      status: "100% Compatible - Zero Recompilation"
    },
    linux: {
      name: "Ubuntu Linux 24.04 (AMD64 / ARM)",
      icon: Terminal,
      badge: "Linux JVM",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      jvmBinary: "libjvm.so (OpenJDK for Linux)",
      nativeTranslation: "Translates identical bytecode into Linux ELF binary system calls (glibc, POSIX standards)",
      terminalLog: `user@naihati-lab:~$ java SchoolFeeApp\n[Linux JVM Initialized via libjvm.so]\nLoaded: SchoolFeeApp.class (Checksum: 0xCAFEBABE)\nOutput: Student: Rahul Sen | Fee: ₹1850.00 | Status: PAID`,
      status: "100% Compatible - Zero Recompilation"
    },
    macos: {
      name: "macOS Sonoma (Apple Silicon M-Series)",
      icon: Laptop,
      badge: "macOS JVM",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      jvmBinary: "libjvm.dylib (Oracle / Corretto for macOS ARM64)",
      nativeTranslation: "Translates identical bytecode into Mach-O ARM64 native assembly instructions",
      terminalLog: `shyamnagar-dev@MacBook-Pro ~ % java SchoolFeeApp\n[macOS JVM Initialized via libjvm.dylib]\nLoaded: SchoolFeeApp.class (Checksum: 0xCAFEBABE)\nOutput: Student: Rahul Sen | Fee: ₹1850.00 | Status: PAID`,
      status: "100% Compatible - Zero Recompilation"
    },
    android: {
      name: "Android 15 Mobile (ART / Dalvik)",
      icon: Globe,
      badge: "Android ART",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      jvmBinary: "libart.so (Android Runtime Engine)",
      nativeTranslation: "DEX Bytecode executed via ahead-of-time (AOT) and JIT translation on ARM64 mobile SoC",
      terminalLog: `[Android System Logcat - Process: com.barrackpore.schoolapp]\nART Runtime initialized -> Loaded Class bytecode\nUI Render: Student: Rahul Sen | Fee: ₹1850.00 | Status: PAID`,
      status: "100% Compatible - Android Runtime Architecture"
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
            <Globe className="w-4 h-4" />
            <span>Write Once, Run Anywhere (WORA) Multi-OS Lab</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            One Single Bytecode File (<code className="text-indigo-300">.class</code>) Across 4 Operating Systems
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>WORA Active</span>
        </div>
      </div>

      {/* Source & Bytecode Anchor Card */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Compiled Once with javac:</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>SchoolFeeApp.class</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">0xCAFEBABE</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-400 max-w-md">
          This exact binary file is copied to Windows, Linux, macOS, and Android without modifying a single line of code!
        </div>
      </div>

      {/* OS Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.entries(osProfiles).map(([key, os]) => {
          const Icon = os.icon;
          const isActive = selectedOs === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedOs(key)}
              className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                isActive
                  ? `${os.bg} ${os.border} border-2 shadow-lg shadow-indigo-500/10`
                  : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isActive ? os.color : "text-slate-500"}`} />
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-slate-950 text-white" : "bg-slate-900 text-slate-400"}`}>
                  {os.badge}
                </span>
              </div>
              <p className={`text-xs font-bold ${isActive ? "text-white" : "text-slate-300"}`}>
                {os.name.split(" (")[0]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected OS Runtime Inspector */}
      {(() => {
        const cur = osProfiles[selectedOs];
        const Icon = cur.icon;
        return (
          <div className={`p-6 rounded-2xl border ${cur.border} ${cur.bg} space-y-4 transition-all duration-300`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-slate-950 border ${cur.border} ${cur.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{cur.badge}</span>
                  <h4 className="text-lg font-bold text-white">{cur.name}</h4>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-full border border-emerald-500/30">
                <Check className="w-4 h-4" />
                <span>{cur.status}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider">Host JVM Engine Binary:</span>
                <p className="text-amber-300 font-mono font-bold">{cur.jvmBinary}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider">How JVM Translates Bytecode:</span>
                <p className="text-slate-200">{cur.nativeTranslation}</p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-slate-500 text-[11px]">
                <span>Host OS Console Simulation</span>
                <span className="text-emerald-400">Exit Code: 0 (Success)</span>
              </div>
              <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed">{cur.terminalLog}</pre>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

const JdkJreJvmInspector = () => {
  const [activeTier, setActiveTier] = useState('jdk');

  const tiers = {
    jdk: {
      name: "JDK (Java Development Kit)",
      formula: "JDK = JRE + Development Tools (javac, jdb, javadoc, jar)",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      users: "Software Developers, CBSE Class 12 IT Students, Code Engineers",
      purpose: "Complete development environment used to write, compile, disassemble, and debug Java software.",
      includes: [
        "javac.exe - Java Source Compiler (.java -> .class)",
        "java.exe - Java Application Launcher (invokes JVM)",
        "javadoc.exe - HTML API Documentation Generator",
        "jar.exe - Java ARchive Packager (.jar files)",
        "javap.exe - Class File Disassembler",
        "jdb.exe - Java Command-Line Debugger",
        "All components of JRE + JVM"
      ]
    },
    jre: {
      name: "JRE (Java Runtime Environment)",
      formula: "JRE = JVM + Core Class Libraries (rt.jar / java.base) + Support Files",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      users: "End Users, Enterprise Clients, Production Servers running apps",
      purpose: "Runtime environment for users who only want to execute pre-compiled Java applications without writing or compiling code.",
      includes: [
        "Java Virtual Machine (JVM)",
        "Standard Core Java APIs (java.lang, java.util, java.io, java.math)",
        "Deployment Technologies & Property Configuration Files",
        "Security Policies and Cryptographic Providers",
        "DOES NOT contain javac compiler"
      ]
    },
    jvm: {
      name: "JVM (Java Virtual Machine)",
      formula: "JVM = ClassLoader + Runtime Memory Areas + Execution Engine (JIT + GC)",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      users: "Operating System Runtime Subsystem",
      purpose: "The abstract computing engine that loads bytecode, verifies security constraints, and executes opcodes natively on the host CPU.",
      includes: [
        "ClassLoader Subsystem (Loading, Linking, Initialization)",
        "Bytecode Verifier (Security checks)",
        "Runtime Data Areas (Method Area, Heap, Stack, PC Register)",
        "Execution Engine (Interpreter + JIT Compiler)",
        "Automatic Garbage Collector (Memory reclamation)"
      ]
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
        <Layers className="w-4 h-4" />
        <span>Architectural Hierarchy Inspector</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-white">
        JDK vs JRE vs JVM: The Core Structural Triad
      </h3>

      <div className="grid sm:grid-cols-3 gap-3">
        {Object.entries(tiers).map(([key, tier]) => (
          <button
            key={key}
            onClick={() => setActiveTier(key)}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer space-y-1 ${
              activeTier === key
                ? `${tier.bg} ${tier.border} border-2 shadow-lg`
                : "bg-slate-950 border-slate-800 hover:bg-slate-800/60"
            }`}
          >
            <h4 className={`text-base font-bold ${activeTier === key ? tier.color : "text-white"}`}>
              {tier.name.split(" (")[0]}
            </h4>
            <p className="text-xs text-slate-400 truncate">{tier.users}</p>
          </button>
        ))}
      </div>

      {(() => {
        const cur = tiers[activeTier];
        return (
          <div className={`p-6 rounded-2xl border ${cur.border} ${cur.bg} space-y-4`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className={`text-lg font-black ${cur.color}`}>{cur.name}</h4>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-300">
                {cur.formula}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {cur.purpose}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Key Components Included:
              </span>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {cur.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${cur.color}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default function Topic1() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Globe className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_001 • Topic 1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Platform Independence and The <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">'Write Once, Run Anywhere' (WORA)</span> Architecture
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Understand why C and C++ programs are locked to specific operating systems, while Java bytecode runs seamlessly across Windows, Linux, macOS, and mobile devices using the universal JVM abstraction layer.
        </p>
      </div>

      {/* Multi-OS WORA Simulator */}
      <div className="max-w-6xl mx-auto">
        <WoraCrossPlatformLab />
      </div>

      {/* JDK vs JRE vs JVM Triad Explorer */}
      <div className="max-w-6xl mx-auto">
        <JdkJreJvmInspector />
      </div>

      {/* C/C++ vs Java Architecture Comparison Table */}
      <div className="max-w-6xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>C/C++ Direct Machine Compilation vs Java WORA Model</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/60">
                <th className="p-3">Feature</th>
                <th className="p-3">C / C++ Model</th>
                <th className="p-3">Java WORA Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="p-3 font-semibold text-white">Compiled Output</td>
                <td className="p-3 text-rose-300">Native binary (.exe / .out / .obj)</td>
                <td className="p-3 text-emerald-300 font-bold">Universal Bytecode (.class)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Target Architecture</td>
                <td className="p-3 text-slate-400">Specific Physical CPU & OS (x86, Windows)</td>
                <td className="p-3 text-slate-200">Abstract Java Virtual Machine (JVM)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Portability</td>
                <td className="p-3 text-rose-300">Platform-Dependent (Must recompile per OS)</td>
                <td className="p-3 text-emerald-300 font-bold">Platform-Independent (WORA)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Security Model</td>
                <td className="p-3 text-slate-400">Direct pointer access, vulnerable to buffer overflows</td>
                <td className="p-3 text-slate-200">Sandboxed execution with Bytecode Verifier & no raw pointers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: WORA & Java Architecture Revision Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: WORA & Architecture" 
          description="Master high-yield questions on WORA, JDK, JRE, JVM formulas, environment variables (PATH/CLASSPATH), and cross-platform compilation." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Remember the classic CBSE board exam equation: JDK = JRE + Development Tools (javac), and JRE = JVM + Core Class Libraries. If a question asks which package is needed by a bank cashier who only runs pre-built Java billing software, the answer is always JRE!" 
        />
      </div>
    </div>
  );
}
