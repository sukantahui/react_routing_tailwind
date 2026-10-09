import React, { useState } from 'react';
import { 
  Type, Lock, Sparkles, CheckCircle2, AlertTriangle, 
  HelpCircle, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const ImmutabilityVisualizer = () => {
  const [reassign, setReassign] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Lock className="w-3.5 h-3.5" /> String Constant Pool & Heap Visualizer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            String Immutability: Why `s.concat()` Does NOT Change `s`
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setReassign(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              !reassign ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            Without Reassignment (`s.concat(...)`)
          </button>
          <button
            onClick={() => setReassign(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              reassign ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            With Reassignment (`s = s.concat(...)`)
          </button>
        </div>
      </div>

      {/* Code & Memory Representation */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Executing Java Code:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`String s = "Java";
${reassign ? 's = s.concat(" 802"); // Explicit reassignment!' : 's.concat(" 802"); // Return value discarded!'}

System.out.println(s); // Outputs: "${reassign ? 'Java 802' : 'Java'}"`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
              Heap Memory State:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Object #1 ("Java"):</span>
                <span className="text-emerald-400 font-bold">{!reassign ? "Target of `s`" : "Abandoned in Heap"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Object #2 ("Java 802"):</span>
                <span className="text-purple-400 font-bold">{reassign ? "Target of `s`" : "Unreferenced"}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-xs">
            💡 <strong>CBSE Board Rule:</strong> Strings in Java are immutable! Methods produce NEW objects; they never mutate existing strings in-place.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic0 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_003 • Topic 0
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Strings in Java: The <code className="text-purple-400 font-mono">java.lang.String</code> Class & Immutability
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand how Java models text using the immutable String class, explore heap memory allocations, and avoid classic board exam reassignment traps.
          </p>
        </div>

        {/* Visualizer */}
        <ImmutabilityVisualizer />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • String Immutability"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – String Immutability Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Note (.txt)"
          downloadFileName="004_003_topic0_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Whenever you see a question where a method like `.concat()`, `.toLowerCase()`, or `.replace()` is called without assigning back to the variable (e.g. `s.concat('abc'); System.out.println(s);`), the output is ALWAYS the original unmodified string! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic0;
