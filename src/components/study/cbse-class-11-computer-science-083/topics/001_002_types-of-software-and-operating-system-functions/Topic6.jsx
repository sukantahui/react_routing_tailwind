import React, { useState } from 'react';
import {
  Terminal, Monitor, Sliders, CheckCircle2, AlertTriangle,
  HelpCircle, BookOpen, Sparkles, ArrowRight, Play,
  RefreshCw, Folder, File, MousePointer, ShieldCheck, Zap
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/cli_vs_gui_workflow.py?raw";

// Interactive CLI vs GUI Workflow & Latency Simulator
const CliVsGuiSimulator = () => {
  const [interfaceMode, setInterfaceMode] = useState('cli');
  const [commandInput, setCommandInput] = useState('ls -la');
  const [terminalHistory, setTerminalHistory] = useState([
    "student@cbse-lab:~$ whoami",
    "student",
    "student@cbse-lab:~$ ls",
    "projects  cbse_notes.txt  practical_lab.py"
  ]);
  const [guiFiles, setGuiFiles] = useState([
    { name: "projects", type: "folder", size: "4 KB" },
    { name: "cbse_notes.txt", type: "file", size: "12 KB" },
    { name: "practical_lab.py", type: "code", size: "2.4 KB" }
  ]);
  const [activeNotification, setActiveNotification] = useState("");

  const handleRunCommand = () => {
    if (!commandInput.trim()) return;
    const cmd = commandInput.trim();
    let response = "";
    
    if (cmd === 'ls' || cmd === 'ls -la' || cmd === 'dir') {
      response = "drwxr-xr-x 2 student student 4096 Oct  9 2026 projects\n-rw-r--r-- 1 student student 12288 Oct  9 2026 cbse_notes.txt\n-rw-r--r-- 1 student student  2450 Oct  9 2026 practical_lab.py";
    } else if (cmd.startsWith('mkdir ')) {
      const folderName = cmd.split(' ')[1] || 'new_folder';
      setGuiFiles(prev => [...prev, { name: folderName, type: "folder", size: "4 KB" }]);
      response = `[+] Directory '${folderName}' created in 0.8ms.`;
    } else if (cmd.startsWith('rm ')) {
      const targetName = cmd.split(' ')[1];
      setGuiFiles(prev => prev.filter(f => f.name !== targetName));
      response = `[+] File '${targetName}' removed in 0.4ms.`;
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    } else {
      response = `bash: ${cmd}: command executed successfully (exit code 0).`;
    }

    setTerminalHistory(prev => [...prev, `student@cbse-lab:~$ ${cmd}`, response]);
    setCommandInput('');
  };

  const handleGuiAction = (action, targetName) => {
    setActiveNotification(`GUI: Right-clicked -> Selected "${action}" for ${targetName} (Dispatched via Window Compositor).`);
    setTimeout(() => setActiveNotification(""), 2500);
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
              Interactive User Interface Paradigm Workbench
            </h3>
            <p className="text-xs text-slate-400">
              Switch between Command Line Interface (CLI) and Graphical User Interface (GUI) to experience speed, memory, and usability differences.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setInterfaceMode('cli')}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              interfaceMode === 'cli' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal size={14} /> Command Line (CLI)
          </button>
          <button
            onClick={() => setInterfaceMode('gui')}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              interfaceMode === 'gui' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor size={14} /> Graphical UI (GUI)
          </button>
        </div>
      </div>

      {interfaceMode === 'cli' ? (
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-sky-400">
              <Terminal size={14} /> GNU/Linux Bash Shell (Headless - 4 MB RAM)
            </span>
            <span className="text-[10px] text-emerald-400">Try: `mkdir test`, `ls`, `clear`</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 h-48 overflow-y-auto space-y-1 text-slate-200">
            {terminalHistory.map((line, idx) => (
              <div key={idx} className={line.startsWith('student@') ? 'text-sky-300 font-bold' : 'text-slate-400 whitespace-pre-wrap'}>
                {line}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); handleRunCommand(); }}
            className="flex gap-2"
          >
            <span className="text-sky-400 font-bold self-center">student@cbse-lab:~$</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Type shell command..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-lg text-xs transition cursor-pointer"
            >
              Execute
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-purple-400">
              <Monitor size={14} /> WIMP Desktop File Explorer (Overhead: 450 MB RAM + GPU Compositor)
            </span>
            <span className="text-[10px] text-slate-400">Double click or interact with items</span>
          </div>

          {activeNotification && (
            <div className="p-2.5 rounded-lg bg-purple-950/60 border border-purple-500/50 text-xs text-purple-300 animate-fadeIn">
              {activeNotification}
            </div>
          )}

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 grid grid-cols-2 sm:grid-cols-4 gap-3 min-h-[160px]">
            {guiFiles.map((file, idx) => (
              <div
                key={idx}
                onClick={() => handleGuiAction("Open / Inspect", file.name)}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500 hover:bg-sky-500/10 transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
              >
                {file.type === 'folder' ? (
                  <Folder size={32} className="text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                ) : (
                  <File size={32} className="text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
                )}
                <span className="text-xs font-semibold text-white truncate max-w-full">{file.name}</span>
                <span className="text-[10px] text-slate-500">{file.size}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Topic6() {
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
                Topic 6
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                User Interfaces in Operating Systems: Command Line (CLI) vs Graphical (GUI)
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Analyze the two foundational operating system interaction paradigms: the text-driven CLI/CUI and the visual WIMP (Windows, Icons, Menus, Pointer) GUI.
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: Morse Code vs Touchscreen Kiosk</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400 flex items-center gap-1.5"><Terminal size={14} /> Command Line Interface (CLI): Telegraph Operator</span>
              <p className="text-slate-300">
                A skilled telegraph operator transmits coded telegrams rapidly. Requires memorizing the exact Morse code alphabet, but transfers critical messages in milliseconds over narrow copper wires with zero fluff.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 flex items-center gap-1.5"><Monitor size={14} /> Graphical User Interface (GUI): Self-Service Food Kiosk</span>
              <p className="text-slate-300">
                A fast-food restaurant touch kiosk with vibrant photos of burgers and drinks. Any first-time customer can tap the screen intuitively without training, but it requires a high-resolution color monitor and high power consumption.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Core Comparison Table */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-sky-400" size={24} />
            <h2 className="text-xl font-bold text-white">Comparison Matrix: CLI vs GUI</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800">
              <thead className="bg-slate-950 text-slate-300 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Evaluation Feature</th>
                  <th className="p-3 text-sky-400">Command Line Interface (CLI / CUI)</th>
                  <th className="p-3 text-purple-400">Graphical User Interface (GUI)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">User Interaction Mode</td>
                  <td className="p-3">Typed text commands and command switches</td>
                  <td className="p-3">Visual WIMP (Windows, Icons, Menus, Pointer)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">Input Peripherals</td>
                  <td className="p-3">Standard Keyboard</td>
                  <td className="p-3">Mouse, Touchpad, Touchscreen, Keyboard</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">System Resource Overhead</td>
                  <td className="p-3 text-emerald-400 font-bold">Extremely Low (2 to 5 MB RAM, 0% GPU)</td>
                  <td className="p-3 text-amber-300">High (500+ MB RAM, GPU Compositor)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">Ease of Learning</td>
                  <td className="p-3">Steeper learning curve (syntax memorization)</td>
                  <td className="p-3 text-emerald-400 font-bold">Highly intuitive for novice users</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">Batch Automation Speed</td>
                  <td className="p-3 text-emerald-400 font-bold">Fast shell scripts (bash, zsh, batch)</td>
                  <td className="p-3">Slower for high-volume automated batches</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">Examples</td>
                  <td className="p-3 font-mono">MS-DOS, Linux Bash, PowerShell</td>
                  <td className="p-3 font-mono">Windows 11, macOS, Android, GNOME</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <CliVsGuiSimulator />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python CLI vs GUI Benchmark Simulation</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/001_002_types-of-software-and-operating-system-functions/topic6_files/cli_vs_gui_workflow.py"
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
                <span>Common Mistakes</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Assuming CLI is obsolete:</strong> CLI is the industry standard for backend servers, cloud DevOps, cybersecurity, and high-performance computing.</li>
                <li><strong>Forgetting the WIMP expansion:</strong> Write Windows, Icons, Menus, Pointer accurately.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>List clear resource comparison:</strong> Mention that GUI requires substantial memory and graphics coprocessor hardware compared to lightweight CLI.</li>
                <li><strong>Provide precise examples:</strong> State MS-DOS and Linux Bash for CLI; Windows 11 and macOS for GUI.</li>
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
            fileName="CBSE_Class11_CS_Topic6_CLI_vs_GUI_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="User Interfaces: CLI vs GUI"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
