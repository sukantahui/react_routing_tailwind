import React, { useState } from 'react';
import {
  Binary, Calculator, Hash, ArrowRight, RefreshCw,
  BookOpen, Code, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Sparkles, Terminal, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/fractional_radix_converter.py?raw";

// Interactive Fractional Radix Conversion Simulator
const FractionalConverterWidget = () => {
  const [fracInput, setFracInput] = useState(0.625);
  const [targetBase, setTargetBase] = useState(2);

  const hexSymbols = "0123456789ABCDEF";
  const num = Math.abs(Number(fracInput) || 0);
  const fracPart = num - Math.floor(num);

  const getMultiplicationSteps = (frac, base, limit = 6) => {
    const steps = [];
    let cur = frac;
    for (let i = 0; i < limit; i++) {
      const prod = cur * base;
      const intPart = Math.floor(prod);
      const nextFrac = parseFloat((prod - intPart).toFixed(6));
      const sym = hexSymbols[intPart];
      steps.push({ step: `${cur.toFixed(4)} × ${base}`, prod: prod.toFixed(4), intPart: sym, nextFrac: nextFrac.toFixed(4) });
      cur = nextFrac;
      if (cur === 0) break;
    }
    return steps;
  };

  const steps = getMultiplicationSteps(fracPart, targetBase);
  const fractionResult = "0." + steps.map(s => s.intPart).join('');

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Fractional Successive Multiplication Simulator (Enrichment)
            </h3>
            <p className="text-xs text-slate-400">
              Multiply fractional decimals repeatedly by the target base and record generated integer carries from top to bottom.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { base: 2, label: 'Base 2 (Binary)' },
            { base: 8, label: 'Base 8 (Octal)' },
            { base: 16, label: 'Base 16 (Hex)' }
          ].map(b => (
            <button
              key={b.base}
              onClick={() => setTargetBase(b.base)}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
                targetBase === b.base ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input & Output Overview */}
        <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Fractional Decimal (0.xxx):</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.001"
                min="0"
                max="0.999"
                value={fracInput}
                onChange={(e) => setFracInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-base text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
                placeholder="e.g. 0.625"
              />
              <button
                onClick={() => setFracInput((Math.random() * 0.9 + 0.05).toFixed(3))}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <RefreshCw size={14} /> Random
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Calculated Fractional Output:
            </span>
            <p className="text-2xl font-mono font-extrabold text-white tracking-wider">
              ({fractionResult})<sub className="text-amber-400 text-xs font-sans">{targetBase}</sub>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
              (0.{strFrac(fracPart)})₁₀ = ({fractionResult})₍{targetBase}₎
            </p>
          </div>

          <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-500/30 text-xs text-amber-300 space-y-1">
            <span className="font-bold block">&darr; Reading Direction: TOP TO BOTTOM</span>
            <p className="text-slate-400 text-[11px]">
              Unlike integer division (bottom to top), fractional multiplication integers are read from top (MSB) to bottom (LSB).
            </p>
          </div>
        </div>

        {/* Multiplication Ladder Table */}
        <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block border-b border-slate-800 pb-2">
            Multiplication Step Table
          </span>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-2">Operation</th>
                  <th className="p-2">Product</th>
                  <th className="p-2 text-amber-400">Integer Part</th>
                  <th className="p-2 text-slate-400">Remaining Frac</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {steps.map((step, idx) => (
                  <tr key={idx} className={idx === 0 ? 'bg-amber-950/20 font-bold' : ''}>
                    <td className="p-2">{step.step}</td>
                    <td className="p-2">{step.prod}</td>
                    <td className="p-2 text-amber-300 font-bold">
                      {step.intPart} {idx === 0 ? '(MSB)' : ''}
                    </td>
                    <td className="p-2 text-slate-400">{step.nextFrac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

function strFrac(f) {
  const s = f.toString().split('.')[1];
  return s || '0';
}

export default function Topic6() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 002_001
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Topic 6
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                Enrichment &amp; Advanced
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                [Enrichment] Fractional Radix Conversions (Successive Multiplication Method)
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Explore successive multiplication algorithms for fractional decimals and negative positional weight expansions for non-integer digital numbers.
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: Liquid Measuring Cylinder Sub-divisions</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Converting fractions is like measuring fractions of a liter using half-liter (2⁻¹ = 0.5), quarter-liter (2⁻² = 0.25), and eighth-liter (2⁻³ = 0.125) measuring beakers. Multiplying by 2 reveals whether the remaining liquid fills a full beaker (generating integer 1) or not (generating integer 0).
          </p>
        </div>

        {/* 3. Core Theory Table */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">Algorithm &amp; Negative Weight Expansion</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-amber-400">Successive Multiplication (Dec &rarr; Base R):</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                <li>Multiply fractional part by target base R.</li>
                <li>Record the integer part generated.</li>
                <li>Multiply remaining fraction by R until zero or desired precision.</li>
                <li><strong>Read integer parts from TOP to BOTTOM.</strong></li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-sky-400">Negative Weight Expansion (Base R &rarr; Dec):</h3>
              <p className="font-mono text-xs text-slate-200">
                (0.d₁ d₂ d₃)ᵣ = (d₁ × R⁻¹) + (d₂ × R⁻²) + (d₃ × R⁻³)
              </p>
              <p className="text-xs text-slate-400 pt-1">
                For Binary: 2⁻¹ = 0.5, 2⁻² = 0.25, 2⁻³ = 0.125, 2⁻⁴ = 0.0625.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <FractionalConverterWidget />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python Fractional Radix Converter Script</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/002_001_number-systems-and-base-conversions/topic6_files/fractional_radix_converter.py"
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
                <li><strong>Reversing reading direction:</strong> Remember: Integers are read bottom to top; Fractions are read top to bottom.</li>
                <li><strong>Multiplying the whole number:</strong> Only multiply the digits to the RIGHT of the decimal point.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Show separate integer and fraction parts:</strong> Solve integer part via division, solve fraction via multiplication, and join with decimal point.</li>
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
            fileName="CBSE_Class11_CS_Topic6_Fractional_Conversions_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Fractional Radix Conversions (Enrichment)"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
