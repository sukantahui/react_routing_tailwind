import React, { useState } from 'react';
import { 
  Box, Cpu, HardDrive, Layers, Sparkles, 
  CheckCircle2, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, RefreshCw, PlusCircle, User
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const ObjectInstantiationStudio = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Mamata", roll: 101, marks: 95.5, address: "0x7F2A" },
    { id: 2, name: "Debangshu", roll: 102, marks: 88.0, address: "0x7F4C" }
  ]);
  const [newName, setNewName] = useState("Susmita");
  const [newRoll, setNewRoll] = useState(103);
  const [newMarks, setNewMarks] = useState(92.0);

  const handleCreateObject = () => {
    const randomHex = "0x" + Math.floor(Math.random() * 65535).toString(16).toUpperCase();
    const newObj = {
      id: Date.now(),
      name: newName,
      roll: Number(newRoll),
      marks: Number(newMarks),
      address: randomHex
    };
    setStudents(prev => [...prev, newObj]);
  };

  const handleReset = () => {
    setStudents([
      { id: 1, name: "Mamata", roll: 101, marks: 95.5, address: "0x7F2A" },
      { id: 2, name: "Debangshu", roll: 102, marks: 88.0, address: "0x7F4C" }
    ]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Layers className="w-3.5 h-3.5" /> JVM Heap & Stack Memory Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How the <code className="text-sky-400 font-mono">new</code> Operator Allocates Objects in Memory
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `Student s = new Student();`
        </div>
      </div>

      {/* Input Creator */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 grid sm:grid-cols-4 gap-3 items-end">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Student Name:
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Roll Number:
          </label>
          <input
            type="number"
            value={newRoll}
            onChange={(e) => setNewRoll(Number(e.target.value))}
            className="w-full bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Marks (%):
          </label>
          <input
            type="number"
            value={newMarks}
            onChange={(e) => setNewMarks(Number(e.target.value))}
            className="w-full bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreateObject}
            className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-sky-950"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Instantiate (`new`)
          </button>
          <button
            onClick={handleReset}
            className="bg-slate-800 hover:bg-slate-700 text-slate-400 p-2 rounded-xl text-xs transition cursor-pointer"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Memory Dual Diagram */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Stack Memory Side */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Stack Memory (References)
            </span>
            <span className="text-[11px] font-mono text-slate-500">Fast LIFO Storage</span>
          </div>

          <div className="space-y-2.5">
            {students.map((s, idx) => (
              <div key={s.id} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-slate-400">Student s{idx + 1}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  <ArrowRight className="w-3.5 h-3.5" /> {s.address}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heap Memory Side */}
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <HardDrive className="w-4 h-4" /> Heap Memory (Object Instances)
            </span>
            <span className="text-[11px] font-mono text-slate-500">Dynamic Object Pool</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {students.map((s, idx) => (
              <div key={s.id} className="p-3.5 bg-slate-900 rounded-xl border border-sky-500/20 text-xs font-mono space-y-2">
                <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-1.5">
                  <span className="text-[11px] text-sky-400 font-bold">Student Object #{idx + 1}</span>
                  <span className="text-[10px] text-slate-500">{s.address}</span>
                </div>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <div>rollNo: <strong className="text-white">{s.roll}</strong></div>
                  <div>name: <strong className="text-emerald-400">"{s.name}"</strong></div>
                  <div>marks: <strong className="text-amber-400">{s.marks}%</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic1 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_001 • Topic 1
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Defining Classes and Instantiating Objects using the <code className="text-sky-400 font-mono">new</code> Operator
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand how Java creates instances of classes at runtime, how the <code className="text-sky-400 font-mono">new</code> keyword allocates memory in the Heap, and how reference variables in the Stack point to objects.
          </p>
        </div>

        {/* Memory Visualizer */}
        <ObjectInstantiationStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Class Definition & Instantiation"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Object Creation Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Note (.txt)"
          downloadFileName="004_001_topic1_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Remember the classic CBSE 2-mark question: In the statement `Student s = new Student();`, explain the role of each part. `Student s` declares the reference in stack memory; `new` allocates heap memory; and `Student()` calls the constructor to initialize the fields! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic1;
