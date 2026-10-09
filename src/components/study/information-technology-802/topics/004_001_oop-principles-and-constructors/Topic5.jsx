import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  BookOpen, ArrowRight, ShieldCheck, Terminal, Code, 
  Zap, Layers, RefreshCw, Box, Sliders, BoxSelect
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const OverloadingVisualizer = () => {
  const [selectedVariant, setSelectedVariant] = useState(1); // 1: Box(), 2: Box(side), 3: Box(l,w,h)
  const [sideVal, setSideVal] = useState(4);
  const [lVal, setLVal] = useState(3);
  const [wVal, setWVal] = useState(5);
  const [hVal, setHVal] = useState(8);

  const dim = selectedVariant === 1 
    ? { l: 1, w: 1, h: 1 } 
    : selectedVariant === 2 
    ? { l: sideVal, w: sideVal, h: sideVal } 
    : { l: lVal, w: wVal, h: hVal };

  const volume = dim.l * dim.w * dim.h;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <BoxSelect className="w-3.5 h-3.5" /> Polymorphic Signature Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Constructor Overloading in Action: The Box Geometry Class
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          Compile-Time Polymorphism
        </div>
      </div>

      {/* Variant Selector */}
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {[
          { id: 1, name: "1. No-Arg: Box()", desc: "Default Unit Cube (1×1×1)" },
          { id: 2, name: "2. 1-Arg: Box(side)", desc: "Uniform Cube (S×S×S)" },
          { id: 3, name: "3. 3-Arg: Box(l, w, h)", desc: "Custom Cuboid (L×W×H)" }
        ].map(v => (
          <button
            key={v.id}
            onClick={() => setSelectedVariant(v.id)}
            className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
              selectedVariant === v.id
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-950/40'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <div className="font-bold text-xs text-white mb-0.5">{v.name}</div>
            <div className="text-[11px] text-slate-400">{v.desc}</div>
          </button>
        ))}
      </div>

      {/* Variant Controls */}
      {selectedVariant === 2 && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Adjust Cube Side Length: <span className="font-mono text-emerald-400 font-bold">{sideVal} cm</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={sideVal}
            onChange={(e) => setSideVal(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      )}

      {selectedVariant === 3 && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6 grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Length (l): <span className="text-emerald-400 font-mono">{lVal}</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={lVal}
              onChange={(e) => setLVal(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Width (w): <span className="text-sky-400 font-mono">{wVal}</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={wVal}
              onChange={(e) => setWVal(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Height (h): <span className="text-amber-400 font-mono">{hVal}</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={hVal}
              onChange={(e) => setHVal(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      )}

      {/* Code and Live Calculation */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Matching Constructor Execution:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{selectedVariant === 1
  ? `// Signature 1: Box()
Box b = new Box(); // l=1, w=1, h=1`
  : selectedVariant === 2
  ? `// Signature 2: Box(int side)
Box b = new Box(${sideVal}); // l=${sideVal}, w=${sideVal}, h=${sideVal}`
  : `// Signature 3: Box(int l, int w, int h)
Box b = new Box(${lVal}, ${wVal}, ${hVal});`}
          </pre>
        </div>

        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
              Calculated Dimensions & Volume:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Dimensions:</span>
                <span className="text-white font-bold">{dim.l} × {dim.w} × {dim.h}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800 pt-1.5 text-sm">
                <span>getVolume():</span>
                <span>{volume} cm³</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            Java binds the call to the correct constructor at <strong>compile time</strong> by examining the argument list.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic5 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_001 • Topic 5
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Constructor Overloading: Multiple Initialization Strategies
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Learn how constructor overloading allows a class to provide diverse object initialization paths based on argument counts and types, demonstrating compile-time polymorphism.
          </p>
        </div>

        {/* Visualizer */}
        <OverloadingVisualizer />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Constructor Overloading"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Constructor Overloading Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Note (.txt)"
          downloadFileName="004_001_topic5_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Constructor overloading is one of the clearest examples of Compile-Time Polymorphism in CBSE IT (802). Make sure each overloaded constructor has a distinct parameter list (either different count or different data types). — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic5;
