import React, { useState } from 'react';
import {
  Binary, Calculator, Hash, ArrowRight, RefreshCw,
  BookOpen, Code, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Sparkles, Terminal, Layers, Play
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/decimal_to_all_bases.py?raw";

// Interactive Successive Division Ladder Simulator Component
const SuccessiveDivisionLadder = () => {
  const [decimalValue, setDecimalValue] = useState(156);
  const [targetRadix, setTargetRadix] = useState(2);

  const dec = Math.max(0, Math.floor(Number(decimalValue) || 0));
  const hexSymbols = "0123456789ABCDEF";

  const getDivisionLadder = (num, base) => {
    if (num === 0) {
      return [{ dividend: 0, quotient: 0, rem: 0, symbol: '0' }];
    }
    const steps = [];
    let cur = num;
    while (cur > 0) {
      const q = Math.floor(cur / base);
      const r = cur % base;
      const symbol = hexSymbols[r];
      steps.push({ dividend: cur, quotient: q, rem: r, symbol: symbol });
      cur = q;
    }
    return steps;
  };

  const steps = getDivisionLadder(dec, targetRadix);
  const finalResult = steps.map(s => s.symbol).reverse().join('');
  const radixName = targetRadix === 2 ? 'Binary' : targetRadix === 8 ? 'Octal' : 'Hexadecimal';

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Successive Division Ladder Engine
            </h3>
            <p className="text-xs text-slate-400">
              Enter any decimal integer and target base to trace quotient-remainder steps and bottom-to-top assembly.
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
              onClick={() => setTargetRadix(b.base)}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
                targetRadix === b.base ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
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
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Decimal Number (Base 10):</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max="100000"
                value={decimalValue}
                onChange={(e) => setDecimalValue(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-base text-white focus:outline-none focus:border-sky-500 font-mono font-bold"
                placeholder="e.g. 156"
              />
              <button
                onClick={() => setDecimalValue(Math.floor(Math.random() * 500) + 1)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <RefreshCw size={14} /> Random
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/30 space-y-2">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
              Resulting {radixName} Value:
            </span>
            <p className="text-xl font-mono font-extrabold text-white tracking-wider">
              ({finalResult})<sub className="text-sky-400 text-xs font-sans">{targetRadix}</sub>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
              ({dec})₁₀ = ({finalResult})₍{targetRadix}₎
            </p>
          </div>

          <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
            <Sparkles size={16} className="shrink-0" />
            <span><strong>Golden Rule:</strong> Always read the remainders starting from the bottom (MSB) up to the top (LSB).</span>
          </div>
        </div>

        {/* Division Ladder Table */}
        <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Division Ladder</span>
            <span className="text-[10px] text-emerald-400 font-bold">Bottom &rarr; Top (MSB &rarr; LSB)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-2">Divisor</th>
                  <th className="p-2">Dividend</th>
                  <th className="p-2">Quotient</th>
                  <th className="p-2 text-sky-400">Remainder</th>
                  <th className="p-2 text-emerald-400">Digit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {steps.map((step, idx) => {
                  const isMSB = idx === steps.length - 1;
                  const isLSB = idx === 0;
                  return (
                    <tr key={idx} className={isMSB ? 'bg-emerald-950/30 font-bold' : isLSB ? 'bg-sky-950/20' : ''}>
                      <td className="p-2 text-amber-400">{targetRadix}</td>
                      <td className="p-2">{step.dividend}</td>
                      <td className="p-2">{step.quotient}</td>
                      <td className="p-2 text-sky-300">{step.rem}</td>
                      <td className="p-2 text-emerald-300 font-bold">
                        {step.symbol} {isMSB ? '(MSB)' : isLSB ? '(LSB)' : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic1() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 002_001
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Topic 1
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Decimal to Binary, Octal, and Hexadecimal Conversion (Successive Division Method)
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Master the standard successive integer division algorithm used to convert decimal base-10 numbers into binary (base 2), octal (base 8), and hexadecimal (base 16) formats.
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: Currency Denomination Bundling</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Imagine you have 156 currency coins and you want to pack them into standard boxes holding 2, 8, or 16 items each. At each division step, the remaining loose coins that don't make a complete box become the remainder digit, while the complete boxes are passed to the next higher packaging tier.
          </p>
        </div>

        {/* 3. Core Theory & Step-by-Step Algorithm */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-sky-400" size={24} />
            <h2 className="text-xl font-bold text-white">The Successive Division Algorithm</h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-sky-300">Algorithm Steps:</h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-300">
                <li>Divide the decimal integer by the target base R (2 for Binary, 8 for Octal, 16 for Hex).</li>
                <li>Record the quotient and remainder. For Hexadecimal, map remainders 10 through 15 to letters A through F.</li>
                <li>Set the decimal value to the quotient obtained and repeat the division until the quotient reaches 0.</li>
                <li>Write the sequence of remainders in reverse order (bottom to top), where the bottom-most remainder is the MSB (Most Significant Bit) and the top-most is the LSB (Least Significant Bit).</li>
              </ol>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <SuccessiveDivisionLadder />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python Successive Division Implementation</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/002_001_number-systems-and-base-conversions/topic1_files/decimal_to_all_bases.py"
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
                <li><strong>Writing remainders top to bottom:</strong> This completely reverses the binary/octal value and results in 0 marks.</li>
                <li><strong>Writing 12 instead of 'C' in Hexadecimal:</strong> (12)₁₀ is represented by single hex symbol 'C'.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Always draw the L-division ladder clearly:</strong> Show every division step with divisor, quotient, and remainder columns.</li>
                <li><strong>Include base subscripts:</strong> Clearly write (156)₁₀ = (10011100)₂.</li>
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
            fileName="CBSE_Class11_CS_Topic1_Decimal_To_Bases_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Decimal to Binary, Octal & Hexadecimal Conversion"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
