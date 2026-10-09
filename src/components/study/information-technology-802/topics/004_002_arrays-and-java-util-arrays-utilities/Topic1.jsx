import React, { useState } from 'react';
import { 
  Code, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Layers, Zap, Plus, Trash2
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const LiteralInitializerStudio = () => {
  const [items, setItems] = useState([93.0, 87.5, 97.5, 65.0, 70.0]);
  const [newVal, setNewVal] = useState(85.0);

  const handleAdd = () => {
    if (items.length < 8) {
      setItems(prev => [...prev, Number(newVal)]);
    }
  };

  const handleRemove = (idx) => {
    if (items.length > 2) {
      setItems(prev => prev.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Code className="w-3.5 h-3.5" /> Dynamic Literal Initializer Workbench
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Constructing Arrays via Literal Lists
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `double[] Marks = &#123; ... &#125;;`
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Add Element:
          </label>
          <input
            type="number"
            value={newVal}
            onChange={(e) => setNewVal(Number(e.target.value))}
            className="w-24 bg-slate-900 text-white font-mono text-xs px-3 py-2 rounded-xl border border-slate-700 text-center"
          />
          <button
            onClick={handleAdd}
            disabled={items.length >= 8}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Append
          </button>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Total Elements (`length`): <strong className="text-emerald-400 font-bold text-sm">{items.length}</strong>
        </div>
      </div>

      {/* Visualizer & Code */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Generated Java Source Code:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`// Direct Literal Initialization:
double[] Marks = { ${items.map(n => n.toFixed(1)).join(", ")} };

// Print array properties:
System.out.println("Length: " + Marks.length); // Prints ${items.length}
System.out.println("First element: " + Marks[0]); // Prints ${items[0]}
System.out.println("Last element: " + Marks[Marks.length - 1]); // Prints ${items[items.length - 1]}`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
              Array Elements & Indices:
            </span>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {items.map((val, idx) => (
                <div key={idx} className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Marks[{idx}]</span>
                  <span className="text-emerald-300 font-bold">{val}</span>
                  {items.length > 2 && (
                    <button
                      onClick={() => handleRemove(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            Array literal syntax combines declaration, memory creation, and assignment in 1 line.
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_002 • Topic 1
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Declaring and Initializing Arrays with Literal Values
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master array declaration syntax, explore curly brace literal initialization, and understand how the Java compiler calculates array lengths automatically.
          </p>
        </div>

        {/* Visualizer */}
        <LiteralInitializerStudio />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Array Literal Initialization"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Array Initialization Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Note (.txt)"
          downloadFileName="004_002_topic1_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Never write a size inside brackets when using an initializer list (e.g. `double[5] Marks = {...}` is a compiler error). Always write `double[] Marks = {93.0, 87.5, ...};`! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic1;
