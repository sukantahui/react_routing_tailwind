import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  BookOpen, ArrowRight, ShieldCheck, Terminal, Code, 
  Zap, Layers, RefreshCw, Box, Sliders, ToggleLeft
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const ConstructorTypeStudio = () => {
  const [selectedType, setSelectedType] = useState('param'); // 'default', 'param'
  const [paramId, setParamId] = useState(105);
  const [paramName, setParamName] = useState("Susmita");
  const [paramFee, setParamFee] = useState(7500);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Box className="w-3.5 h-3.5" /> Constructor Type Explorer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Default (No-Arg) vs Parameterized Constructor
          </h2>
        </div>
        
        <div className="flex gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {[
            { id: 'default', label: 'Default Constructor' },
            { id: 'param', label: 'Parameterized Constructor' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                selectedType === t.id
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Controls for Parameterized Mode */}
      {selectedType === 'param' && (
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Custom ID (`int i`):
            </label>
            <input
              type="number"
              value={paramId}
              onChange={(e) => setParamId(Number(e.target.value))}
              className="w-full bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Custom Name (`String n`):
            </label>
            <input
              type="text"
              value={paramName}
              onChange={(e) => setParamName(e.target.value)}
              className="w-full bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Custom Fee (`double f`):
            </label>
            <input
              type="number"
              value={paramFee}
              onChange={(e) => setParamFee(Number(e.target.value))}
              className="w-full bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700"
            />
          </div>
        </div>
      )}

      {/* Code & Object Inspection */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Java Class Definition & Instantiation:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{selectedType === 'default' ? `public class Student {
    int id;
    String name;
    double fee;

    // Default (No-Argument) Constructor
    public Student() {
        id = 100;
        name = "Default Student";
        fee = 5000.0;
    }
}

// In main method:
Student s = new Student(); // No arguments passed!` : `public class Student {
    int id;
    String name;
    double fee;

    // Parameterized Constructor
    public Student(int i, String n, double f) {
        id = i;
        name = n;
        fee = f;
    }
}

// In main method:
Student s = new Student(${paramId}, "${paramName}", ${paramFee}.0);`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-2">
              Resulting Heap Object State:
            </span>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Object Type:</span>
                <span className="text-white font-bold">Student</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">id:</span>
                <span className="text-sky-300 font-bold">{selectedType === 'default' ? 100 : paramId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">name:</span>
                <span className="text-emerald-300 font-bold">"{selectedType === 'default' ? 'Default Student' : paramName}"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">fee:</span>
                <span className="text-amber-300 font-bold">₹{selectedType === 'default' ? '5000.00' : paramFee + '.00'}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-xs space-y-1">
            <strong className="block font-bold">CBSE Examiner Trap:</strong>
            <p className="text-[11px] leading-relaxed opacity-90">
              If you write only a parameterized constructor, you cannot call <code className="text-white font-mono">new Student()</code> unless you manually write a default constructor!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic4 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_001 • Topic 4
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Types of Constructors: Default vs Parameterized
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand the distinction between no-argument default constructors and parameterized constructors, and learn how the compiler manages constructor generation.
          </p>
        </div>

        {/* Studio */}
        <ConstructorTypeStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Constructor Types in Java"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Constructor Types Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note (.txt)"
          downloadFileName="004_001_topic4_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In Java class design, whenever you define a parameterized constructor, always get into the habit of adding a no-arg default constructor as well. That way, both `new Student()` and `new Student(101, 'Mamata', 9000)` remain fully functional. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic4;
