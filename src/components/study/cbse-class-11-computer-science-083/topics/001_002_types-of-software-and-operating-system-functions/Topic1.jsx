import React, { useState } from 'react';
import {
  Layers, Cpu, Server, Terminal, Code, BookOpen,
  CheckCircle2, AlertTriangle, HelpCircle, FileText,
  Activity, ShieldCheck, ArrowRight, RefreshCw,
  HardDrive, Sparkles, Sliders, Monitor, Zap, Disc
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/system_utility_driver_sim.py?raw";

// Interactive Device Driver & System Utility Simulation Widget
const DriverUtilitySimulator = () => {
  const [activeTab, setActiveTab] = useState('driver');
  const [selectedDevice, setSelectedDevice] = useState('printer');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [driverLogs, setDriverLogs] = useState([]);
  const [diskClusters, setDiskClusters] = useState(['FILE_A', 'EMPTY', 'FILE_B', 'FILE_A', 'FILE_C', 'EMPTY', 'FILE_B']);
  const [isDefragged, setIsDefragged] = useState(false);

  const deviceProfiles = {
    printer: {
      name: "LaserJet Pro Network Printer",
      type: "Output Peripheral",
      genericCall: "print_document(doc_path='cbse_report.pdf')",
      driverTranslation: "ESC/P Raster byte stream (0x1B 0x40 -> 600 DPI Dot Matrix)",
      irq: "IRQ 7"
    },
    gpu: {
      name: "Discrete Graphics Accelerator (GPU)",
      type: "Processing Coprocessor",
      genericCall: "render_frame(polygon_mesh, shader)",
      driverTranslation: "Vulkan/DirectX API -> PCIe Gen4 Packet (Opcode 0xA4)",
      irq: "IRQ 16 (MSI-X)"
    },
    scanner: {
      name: "High-Speed Optical Document Scanner",
      type: "Input Peripheral",
      genericCall: "acquire_image(dpi=300, color=True)",
      driverTranslation: "TWAIN / SANE Protocol -> CCD Sensor Line Step Signals",
      irq: "IRQ 12"
    }
  };

  const handleSendDriverCommand = () => {
    setIsTransmitting(true);
    const profile = deviceProfiles[selectedDevice];
    const logEntry = `[${new Date().toLocaleTimeString()}] OS -> ${profile.genericCall} ===> [Driver] ===> ${profile.driverTranslation} (${profile.irq})`;
    setDriverLogs(prev => [logEntry, ...prev.slice(0, 4)]);
    setTimeout(() => setIsTransmitting(false), 600);
  };

  const handleDefrag = () => {
    setIsDefragged(true);
    setDiskClusters(['FILE_A', 'FILE_A', 'FILE_B', 'FILE_B', 'FILE_C', 'EMPTY', 'EMPTY']);
  };

  const handleResetClusters = () => {
    setIsDefragged(false);
    setDiskClusters(['FILE_A', 'EMPTY', 'FILE_B', 'FILE_A', 'FILE_C', 'EMPTY', 'FILE_B']);
  };

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Sliders size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive System Software &amp; Utility Engine
            </h3>
            <p className="text-xs text-slate-400">
              Simulate Device Driver translation and Disk Defragmenter cluster reordering in real-time.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('driver')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeTab === 'driver' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Device Driver Bridge
          </button>
          <button
            onClick={() => setActiveTab('utility')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeTab === 'utility' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Disk Defragmenter Utility
          </button>
        </div>
      </div>

      {activeTab === 'driver' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(deviceProfiles).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedDevice(key)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDevice === key
                    ? 'border-sky-500 bg-sky-500/10 text-white shadow-lg'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">{item.type}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">{item.irq}</span>
                </div>
                <h4 className="text-sm font-semibold text-white">{item.name}</h4>
              </button>
            ))}
          </div>

          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">1. OS Generic Call</span>
                <code className="text-sky-300 font-mono block truncate">{deviceProfiles[selectedDevice].genericCall}</code>
              </div>
              <div className="flex justify-center items-center">
                <div className={`p-2 rounded-full border transition-all ${isTransmitting ? 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  <Zap size={18} />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">2. Driver Hardware Translation</span>
                <code className="text-emerald-300 font-mono block truncate">{deviceProfiles[selectedDevice].driverTranslation}</code>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleSendDriverCommand}
                disabled={isTransmitting}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Activity size={14} className={isTransmitting ? "animate-spin" : ""} />
                Dispatch System Call via Driver
              </button>
              <span className="text-[11px] text-slate-400 font-mono">Status: Driver Loaded &amp; Ready</span>
            </div>

            {driverLogs.length > 0 && (
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <span className="text-slate-500 block mb-1 font-bold">Driver Execution Log:</span>
                {driverLogs.map((log, idx) => (
                  <div key={idx} className="text-emerald-400/90">{log}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Physical Storage Sector Map (Hard Disk Drive)</h4>
                <p className="text-xs text-slate-400">
                  {isDefragged
                    ? "Continuous contiguous sectors: Read head completes seek in 1 single sweep (High Speed)."
                    : "Fragmented clusters: Read head must jump back and forth (High Latency Seek Penalty)."}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDefrag}
                  disabled={isDefragged}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  Run Defrag
                </button>
                <button
                  onClick={handleResetClusters}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  Reset Clusters
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {diskClusters.map((cluster, idx) => {
                const isA = cluster === 'FILE_A';
                const isB = cluster === 'FILE_B';
                const isC = cluster === 'FILE_C';
                const isEmpty = cluster === 'EMPTY';
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-center font-mono text-xs transition-all ${
                      isA ? 'bg-sky-500/20 border-sky-500 text-sky-300' :
                      isB ? 'bg-purple-500/20 border-purple-500 text-purple-300' :
                      isC ? 'bg-amber-500/20 border-amber-500 text-amber-300' :
                      'bg-slate-950 border-slate-800 text-slate-600 border-dashed'
                    }`}
                  >
                    <span className="block text-[10px] text-slate-500">Sec {idx + 1}</span>
                    <span className="font-bold">{cluster}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Topic1() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/50 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 001_002
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Topic 1
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                System Software: Operating System, Device Drivers &amp; System Utilities
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Understand the foundational system programs that directly control computer hardware, bridge peripheral devices via device drivers, and maintain storage integrity through system utilities.
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: The International Airport</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Think of a modern computer as an <strong>International Airport</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400 flex items-center gap-1.5"><Server size={14} /> Operating System</span>
              <p className="text-slate-400">The <strong>Air Traffic Control Tower</strong> directing runways, scheduling departures, allocating boarding gates, and supervising overall airport security.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5"><Zap size={14} /> Device Drivers</span>
              <p className="text-slate-400">The <strong>Multilingual Flight Translators</strong> converting global standard traffic instructions into specific engine and avionics protocols understood by different aircraft models.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 flex items-center gap-1.5"><HardDrive size={14} /> System Utilities</span>
              <p className="text-slate-400">The <strong>Ground Maintenance &amp; Security Crews</strong> repairing runways (defragging), inspecting luggage for hazards (antivirus), and packing cargo tightly (compression).</p>
            </div>
          </div>
        </div>

        {/* 3. Core Theory */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-sky-400" size={24} />
            <h2 className="text-xl font-bold text-white">Core Architectural Breakdown</h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-sky-300">1. Operating System (OS)</h3>
              <p>
                The Operating System is the master supervisory program loaded during bootstrap. It manages computer hardware resources (CPU, RAM, Storage, I/O devices) and provides system call interfaces (APIs) so application programs don't need to communicate with raw electronic registers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-emerald-300">2. Device Drivers (Hardware Abstraction Layer)</h3>
              <p>
                A Device Driver is a specialized low-level program that translates generic operating system commands (like <code className="text-sky-400">write()</code> or <code className="text-sky-400">read()</code>) into hardware-specific binary command sequences recognized by peripheral chipsets. Without the appropriate driver, the OS cannot utilize connected hardware.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-purple-300">3. System Utility Software (Housekeeping Tools)</h3>
              <p>
                Utilities are programs designed to perform maintenance, configuration, diagnostic, and optimization tasks on computer storage and operating system files. Unlike Application Software which solves end-user problems, utilities ensure the underlying computer operates efficiently and safely.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <DriverUtilitySimulator />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python System Software Simulation Script</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/001_002_types-of-software-and-operating-system-functions/topic1_files/system_utility_driver_sim.py"
            fileContent={pythonCode}
          />
        </div>

        {/* 6. Common Pitfalls & Best Practices */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <AlertTriangle className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">CBSE Examination Pitfalls &amp; Best Practices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle size={18} />
                <span>Common Student Mistakes</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Classifying Antivirus as Application Software:</strong> Antivirus is System Utility Software because its core purpose is system maintenance and security upkeep.</li>
                <li><strong>Confusing Device Drivers with Firmware:</strong> Firmware is embedded permanently in hardware ROM; Device Drivers reside on the OS file system and run in OS kernel space.</li>
                <li><strong>Stating that SSDs need defragmentation:</strong> SSDs have near-zero mechanical latency and defragging causes unnecessary write wear.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Define System Software clearly:</strong> Mention that it directly manages computer hardware and acts as an interface between hardware and application software.</li>
                <li><strong>Give 3 distinct categories with examples:</strong> Operating Systems (Linux, Windows), Device Drivers (Graphics driver, Printer driver), System Utilities (Disk defragmenter, Antivirus).</li>
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
            fileName="CBSE_Class11_CS_Topic1_System_Software_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="System Software, Device Drivers & Utilities"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
