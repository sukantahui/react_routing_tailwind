import React, { useState } from 'react';
import {
  Zap, Calculator, Hash, ArrowRight, RefreshCw,
  BookOpen, Code, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Sparkles, Terminal, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/conversion_speed_tricks.py?raw";

// Interactive Power-of-Two Fast Subtraction Decomposer Widget
const SpeedTricksWidget = () => {
  const [decInput, setDecInput] = useState(219);

  const num = Math.max(0, Math.min(1023, Number(decInput) || 0));
  const powers = [512, 256, 128, 64, 32, 16, 8, 4, 2, 1];

  let rem = num;
  const breakdown = [];
  const bits = [];

  powers.forEach((p) => {
    if (rem >= p) {
      breakdown.push({ power: p, taken: true, remBefore: rem, remAfter: rem - p });
      bits.push(1);
      rem -= p;
    } else {
      breakdown.push({ power: p, taken: false, remBefore: rem, remAfter: rem });
      bits.push(0);
    }
  });

  const binString = bits.join('').replace(/^0+(?!$)/, '');

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Rapid Power-of-Two Subtraction Decomposer
            </h3>
            <p className="text-xs text-slate-400">
              Convert any decimal to binary under 5 seconds by checking descending powers of 2.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Sample:</span>
          {[89, 156, 219, 500].map((sample) => (
            <button
              key={sample}
              onClick={() => setDecInput(sample)}
              className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div className="space-y-1.5 max-w-sm">
        <label className="text-xs font-semibold text-slate-300">
          Enter Decimal Value (0 - 1023):
        </label>
        <input
          type="number"
          min="0"
          max="1023"
          value={decInput}
          onChange={(e) => setDecInput(e.target.value)}
          className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2 text-white font-mono text-base outline-none transition-all"
        />
      </div>

      {/* Visual Bit Decomposition Row */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Step-by-Step Power Check (Descending Powers of 2)
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
          {breakdown.map((item) => (
            <div
              key={item.power}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${
                item.taken
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-600'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 font-bold">{item.power}</div>
              <div className={`text-lg font-black font-mono ${item.taken ? 'text-amber-400' : 'text-slate-600'}`}>
                {item.taken ? '1' : '0'}
              </div>
              <div className="text-[9px] font-mono mt-1">
                {item.taken ? `-${item.power}` : 'skip'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-xs text-slate-400 block font-sans">Decimal Input:</span>
          <span className="text-xl font-bold text-white">({num})₁₀</span>
        </div>
        <ArrowRight className="text-amber-400 hidden sm:block" size={24} />
        <div>
          <span className="text-xs text-slate-400 block font-sans">Instant Binary String:</span>
          <span className="text-xl font-bold text-amber-400 tracking-wider">({binString})₂</span>
        </div>
      </div>
    </div>
  );
};

export default function Topic8() {
  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Zap size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Topic 08 / 10
                </span>
                <span className="text-xs text-slate-400">CBSE Class 11 CS (083)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Conversion Shortcuts &amp; Speed Techniques
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* 1. Key Concept Overview */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-yellow-950/40 border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wide uppercase">
            <Sparkles size={18} />
            <span>Core Concept Overview</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            High-Speed Mental Calculation in Computer Science Exams
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            In timed CBSE board exams and competitive computer science assessments, standard long divisions can take up to 2-3 minutes per question. By mastering <strong>Power-of-Two Subtraction</strong>, <strong>4-2-1 / 8-4-2-1 lookups</strong>, and <strong>Binary Bridging</strong>, you can solve and verify conversion questions in under 10 seconds with 100% accuracy.
          </p>
        </div>

        {/* 2. Three Golden Speed Techniques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono">
              2ⁿ
            </div>
            <h3 className="text-lg font-bold text-white">1. Power Subtraction Method</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Memorize powers of 2 (<code>1, 2, 4, 8, 16, 32, 64, 128, 256, 512</code>). Check if the number contains each power from left to right.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-amber-300">
              156 = 128 + 16 + 8 + 4<br />
              Bits: 10011100₂
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono">
              8421
            </div>
            <h3 className="text-lg font-bold text-white">2. Instant 8-4-2-1 Mapping</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Write 4-bit nibbles for each Hex character directly by adding combinations of 8, 4, 2, and 1.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
              E = 14 = 8 + 4 + 2 → 1110₂<br />
              B = 11 = 8 + 2 + 1 → 1011₂
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
              ⟷
            </div>
            <h3 className="text-lg font-bold text-white">3. Direct Binary Bridging</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never convert to Base 10 when converting between Octal and Hexadecimal. Use Binary as an instantaneous middle step.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300">
              (73)₈ → 111 011₂ → (3B)₁₆<br />
              Zero multiplication required!
            </div>
          </div>
        </div>

        {/* 3. Interactive Widget */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wide uppercase">
            <Zap size={18} />
            <span>Interactive Speed Decomposer</span>
          </div>
          <SpeedTricksWidget />
        </div>

        {/* 4. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-amber-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python Speed Conversion Script</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/002_001_number-systems-and-base-conversions/topic8_files/conversion_speed_tricks.py"
            fileContent={pythonCode}
          />
        </div>

        {/* 5. CBSE Examination Pitfalls */}
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
                <li><strong>Skipping zeros in power subtraction:</strong> If a power is skipped (e.g. 64 is not needed), you MUST write a <code>0</code> bit in that position.</li>
                <li><strong>Assuming odd numbers end in 0:</strong> Parity check: odd decimals MUST end in bit <code>1</code>; even decimals MUST end in <code>0</code>.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>In descriptive questions:</strong> Show the primary method (e.g., division ladder) for full method marks, but use the power-of-two trick in rough space to verify your answer before submitting!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate questions={questions} />
        </div>

        {/* 7. Plain Text Printable */}
        <div className="space-y-4">
          <PlainTextPrint
            fileName="CBSE_Class11_CS_Topic8_Speed_Tricks_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 8. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Conversion Shortcuts & Speed Techniques"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
