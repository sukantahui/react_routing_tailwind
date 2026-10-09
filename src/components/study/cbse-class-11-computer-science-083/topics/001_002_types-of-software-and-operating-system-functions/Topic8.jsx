import React, { useState } from 'react';
import {
  Monitor, Smartphone, Server, Laptop, CheckCircle2,
  AlertTriangle, HelpCircle, BookOpen, Terminal, Sparkles,
  Sliders, ShieldCheck, ArrowRight, RefreshCw, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/os_ecosystem_comparator.py?raw";

// Interactive OS Architecture & Ecosystem Workbench
const OsEcosystemWorkbench = () => {
  const [selectedOs, setSelectedOs] = useState('linux');

  const ecosystems = {
    linux: {
      name: "GNU/Linux (Ubuntu, Debian, Fedora)",
      category: "Desktop, Server & Supercomputers",
      kernel: "Linux Monolithic Kernel",
      license: "Open Source (GNU GPL)",
      fileSystem: "ext4, Btrfs, ZFS",
      shell: "Bash / Zsh",
      marketDomain: "Cloud Servers, High Performance Computing (Top 500 Supercomputers), AI/Data Science",
      accent: "border-orange-500 bg-orange-500/10 text-orange-400"
    },
    windows: {
      name: "Microsoft Windows 11",
      category: "Desktop & Enterprise Workstations",
      kernel: "Windows NT Hybrid Kernel",
      license: "Proprietary Commercial (EULA)",
      fileSystem: "NTFS, ReFS",
      shell: "PowerShell, Command Prompt",
      marketDomain: "Enterprise Office PCs, PC Gaming (DirectX), General Consumer Desktops",
      accent: "border-sky-500 bg-sky-500/10 text-sky-400"
    },
    macos: {
      name: "Apple macOS (Darwin)",
      category: "Desktop & Laptops",
      kernel: "XNU Hybrid (Mach + BSD Unix)",
      license: "Proprietary Commercial",
      fileSystem: "APFS (Apple File System)",
      shell: "Zsh (POSIX compliant)",
      marketDomain: "Creative Audio/Video Studios, Software Engineering, Apple Ecosystem",
      accent: "border-purple-500 bg-purple-500/10 text-purple-400"
    },
    android: {
      name: "Google Android",
      category: "Mobile & Smart Devices",
      kernel: "Modified Linux LTS Kernel + ART",
      license: "Open Source (AOSP) + Google GMS",
      fileSystem: "ext4, F2FS",
      shell: "mksh / Toybox (Hidden)",
      marketDomain: "Smartphones, Tablets, Smart TVs, Wearable Devices",
      accent: "border-emerald-500 bg-emerald-500/10 text-emerald-400"
    },
    ios: {
      name: "Apple iOS",
      category: "Mobile & Tablets",
      kernel: "Darwin / XNU Hybrid (Sandboxed)",
      license: "Proprietary Closed Source",
      fileSystem: "APFS (Hardware Encrypted)",
      shell: "Sandboxed (No Terminal Access)",
      marketDomain: "Apple iPhone, iPad (iPadOS), Apple Watch (watchOS)",
      accent: "border-rose-500 bg-rose-500/10 text-rose-400"
    }
  };

  const activeData = ecosystems[selectedOs];

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Sliders size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Operating System Ecosystem &amp; Kernel Inspector
            </h3>
            <p className="text-xs text-slate-400">
              Explore kernel types, licensing models, file systems, and enterprise domains across the top 5 platforms.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {Object.entries(ecosystems).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setSelectedOs(key)}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              selectedOs === key
                ? `${item.accent} shadow-lg ring-2 ring-sky-400/40`
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-bold text-white block truncate">{item.name.split(' ')[0]}</span>
            <span className="text-[10px] text-slate-400 block truncate">{item.category.split('&')[0]}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">{activeData.category}</span>
            <h4 className="text-lg font-bold text-white">{activeData.name}</h4>
          </div>
          <span className="px-3 py-1 bg-slate-950 text-xs font-mono text-slate-300 border border-slate-800 rounded-lg">
            {activeData.license}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="text-slate-500 font-bold block uppercase tracking-wider text-[10px]">Kernel Architecture</span>
            <span className="font-semibold text-white font-mono">{activeData.kernel}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-855 space-y-1">
            <span className="text-slate-500 font-bold block uppercase tracking-wider text-[10px]">Primary File System</span>
            <span className="font-semibold text-emerald-400 font-mono">{activeData.fileSystem}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="text-slate-500 font-bold block uppercase tracking-wider text-[10px]">Default Shell Interface</span>
            <span className="font-semibold text-purple-400 font-mono">{activeData.shell}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1.5 text-xs">
          <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">Primary Market Deployment Domain:</span>
          <p className="text-slate-300 leading-relaxed">{activeData.marketDomain}</p>
        </div>
      </div>
    </div>
  );
};

export default function Topic8() {
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
                Topic 8
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Common Operating Systems: Windows, Linux, macOS, Android &amp; iOS
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Survey modern operating system platforms across desktops, cloud servers, supercomputers, and mobile smartphones.
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: Global Automobile Brands</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Different operating systems are like different classes of vehicles engineered for specific terrain:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-orange-400 flex items-center gap-1.5"><Server size={14} /> Linux: Industrial Heavy Cargo Train</span>
              <p className="text-slate-300">Open blueprints, carries massive freight across cloud datacenters 24/7 with zero breakdowns and zero license tolls.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400 flex items-center gap-1.5"><Monitor size={14} /> Windows: Family Sedan / SUV</span>
              <p className="text-slate-300">Versatile, easy to drive for work and gaming, parts and mechanics available at every corner shop globally.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 flex items-center gap-1.5"><Laptop size={14} /> macOS: Luxury Precision Coupe</span>
              <p className="text-slate-300">Custom engineered only for Apple chassis, polished leather interior, tight integration with your iPhone watch and keys.</p>
            </div>
          </div>
        </div>

        {/* 3. Core Comparison Table */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-sky-400" size={24} />
            <h2 className="text-xl font-bold text-white">Top 5 Operating System Comparison Matrix</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800">
              <thead className="bg-slate-950 text-slate-300 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Operating System</th>
                  <th className="p-3">Developer</th>
                  <th className="p-3">Kernel Type</th>
                  <th className="p-3">Licensing</th>
                  <th className="p-3">Dominant Domain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-orange-400">GNU/Linux</td>
                  <td className="p-3">Open Source Community</td>
                  <td className="p-3 font-mono">Linux Monolithic</td>
                  <td className="p-3 font-semibold text-emerald-400">Open Source (GPL)</td>
                  <td className="p-3">Supercomputers, Cloud Servers, AI</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-sky-400">Windows 11</td>
                  <td className="p-3">Microsoft Corporation</td>
                  <td className="p-3 font-mono">Windows NT Hybrid</td>
                  <td className="p-3 font-semibold text-rose-300">Proprietary EULA</td>
                  <td className="p-3">Desktop PCs, Enterprise, Gaming</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-purple-400">macOS</td>
                  <td className="p-3">Apple Inc.</td>
                  <td className="p-3 font-mono">Darwin / XNU Hybrid</td>
                  <td className="p-3 font-semibold text-rose-300">Proprietary</td>
                  <td className="p-3">Mac Desktops &amp; Laptops, Creative Studios</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-emerald-400">Android</td>
                  <td className="p-3">Google / Open Handset</td>
                  <td className="p-3 font-mono">Modified Linux Kernel</td>
                  <td className="p-3 font-semibold text-emerald-400">Open Source (AOSP)</td>
                  <td className="p-3">Smartphones, Tablets, Smart TVs</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-rose-400">iOS</td>
                  <td className="p-3">Apple Inc.</td>
                  <td className="p-3 font-mono">Darwin / XNU (Sandboxed)</td>
                  <td className="p-3 font-semibold text-rose-300">Proprietary Closed</td>
                  <td className="p-3">Apple iPhone, iPad Mobile Hardware</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <OsEcosystemWorkbench />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python OS Ecosystem Telemetry Script</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/001_002_types-of-software-and-operating-system-functions/topic8_files/os_ecosystem_comparator.py"
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
                <li><strong>Writing that Linux is owned by a single commercial company:</strong> Linux is an open-source project maintained by the worldwide developer community and the Linux Foundation.</li>
                <li><strong>Forgetting that Android uses the Linux kernel:</strong> State that Android is built on top of a customized Linux LTS kernel.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Define FOSS vs Proprietary clearly:</strong> State that Linux is Free and Open Source under GPL, whereas Windows and macOS are proprietary commercial software.</li>
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
            fileName="CBSE_Class11_CS_Topic8_Common_OS_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Common Operating Systems (Windows, Linux, macOS, Android, iOS)"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
