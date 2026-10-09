import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  BookOpen, ArrowRight, ShieldCheck, Terminal, Code, 
  Zap, Layers, RefreshCw, Play, PlusCircle, Activity
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const AutoInvocationVisualizer = () => {
  const [instances, setInstances] = useState([
    { id: 1, name: "Student_A", time: "10:00:01" },
    { id: 2, name: "Student_B", time: "10:00:03" }
  ]);
  const [invocationLog, setInvocationLog] = useState([
    "Constructor executed automatically for Student_A (Memory: 0x10A)",
    "Constructor executed automatically for Student_B (Memory: 0x10B)"
  ]);

  const handleSpawn = () => {
    const nextNum = instances.length + 1;
    const name = `Student_${String.fromCharCode(64 + nextNum)}`;
    const now = new Date().toLocaleTimeString();
    const hex = "0x" + Math.floor(Math.random() * 65535).toString(16).toUpperCase();

    setInstances(prev => [...prev, { id: Date.now(), name, time: now }]);
    setInvocationLog(prev => [
      ...prev,
      `[${now}] Constructor executed automatically for ${name} (Heap Address: ${hex})`
    ]);
  };

  const handleClear = () => {
    setInstances([]);
    setInvocationLog(["Heap cleared. Instantiate new objects to trigger constructors."]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Activity className="w-3.5 h-3.5" /> Lifecycle Event Monitor
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Real-Time Automatic Constructor Invocation
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleSpawn}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Call `new Student()`
          </button>
          <button
            onClick={handleClear}
            className="bg-slate-800 hover:bg-slate-700 text-slate-400 py-2 px-3 rounded-xl text-xs transition cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Real time output stream */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Java Code Being Executed:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`public class Student {
    // Automatically runs upon 'new'
    public Student() {
        System.out.println("Constructor triggered!");
    }
}

// In main method:
Student s = new Student(); // Runs automatically!`}
          </pre>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400">
            Active Object Instances: <strong className="text-emerald-400 font-mono text-sm">{instances.length}</strong>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> Constructor Invocation Event Log
            </span>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 max-h-48 overflow-y-auto">
              {invocationLog.map((log, idx) => (
                <div key={idx} className="text-emerald-400/90 flex items-start gap-1.5">
                  <span className="text-slate-600">❯</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            Notice: You didn't write <code className="text-slate-200">s.Student()</code>! Java triggered the constructor automatically during <code className="text-emerald-400">new</code>.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic3 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_001 • Topic 3
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Automatic Invocation of Constructors when an Object is Created
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Discover the exact lifecycle timing of constructor execution in Java, understand why constructors cannot be called with the dot operator, and track multi-instance heap allocations.
          </p>
        </div>

        {/* Live Visualizer */}
        <AutoInvocationVisualizer />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Automatic Constructor Invocation"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Constructor Invocation Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Note (.txt)"
          downloadFileName="004_001_topic3_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Remember: Every single time the keyword `new` is evaluated, the constructor executes exactly once for that specific object instance. It is the gatekeeper that guarantees an object is never in an uninitialized state! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic3;
