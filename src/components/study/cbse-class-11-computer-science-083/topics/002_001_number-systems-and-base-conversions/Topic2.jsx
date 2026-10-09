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
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/base_to_decimal_expander.py?raw";

// Interactive Positional Weight Expansion Calculator Component
const PositionalWeightExpander = () => {
  const [sourceBase, setSourceBase] = useState(2);
  const [inputString, setInputString] = useState("101101");

  const hexMap = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
    '8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15
  };

  const cleanStr = inputString.toUpperCase().trim() || "0";
  const length = cleanStr.length;

  let totalDec = 0;
  const terms = [];

  for (let i = 0; i < length; i++) {
    const char = cleanStr[i];
    const power = length - 1 - i;
    const digitVal = hexMap[char] !== undefined ? hexMap[char] : 0;
    const weight = Math.pow(sourceBase, power);
    const subtotal = digitVal * weight;
    totalDec += subtotal;
    terms.push({ char, power, digitVal, weight, subtotal });
  }

  const handleBaseChange = (b) => {
    setSourceBase(b);
    if (b === 2) setInputString("101101");
    else if (b === 8) setInputString("572");
    else if (b === 16) setInputString("2AF");
  };

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Positional Weight Expansion Calculator
            </h3>
            <p className="text-xs text-slate-400">
              Break down any binary, octal, or hexadecimal value into individual positional power terms and sum to decimal.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { base: 2, label: 'Binary (Base 2)' },
            { base: 8, label: 'Octal (Base 8)' },
            { base: 16, label: 'Hex (Base 16)' }
          ].map(b => (
            <button
              key={b.base}
              onClick={() => handleBaseChange(b.base)}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
                sourceBase === b.base ? 'bg-purple-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input & Sum Result */}
        <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Enter {sourceBase === 2 ? 'Binary (0,1)' : sourceBase === 8 ? 'Octal (0-7)' : 'Hexadecimal (0-9, A-F)'} Value:
            </label>
            <input
              type="text"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-base text-white focus:outline-none focus:border-purple-500 font-mono font-bold uppercase tracking-wider"
              placeholder="e.g. 101101"
            />
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
              Calculated Decimal (Base 10) Equivalent:
            </span>
            <p className="text-2xl font-mono font-extrabold text-white tracking-wider">
              ({totalDec})<sub className="text-purple-400 text-xs font-sans">10</sub>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
              ({cleanStr})₍{sourceBase}₎ = ({totalDec})₁₀
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <span className="text-slate-500 font-bold block">Summary Expansion:</span>
            <p className="text-purple-300 leading-relaxed">
              = {terms.map(t => `${t.subtotal}`).join(' + ')}
            </p>
            <p className="text-emerald-400 font-bold">
              = {totalDec}
            </p>
          </div>
        </div>

        {/* Breakdown Card Grid */}
        <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block border-b border-slate-800 pb-2">
            Positional Weights &amp; Subtotals
          </span>

          <div className="space-y-2 font-mono text-xs">
            {terms.map((t, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-500/20 text-purple-300 text-center font-bold text-[11px] leading-5">
                    {t.char}
                  </span>
                  <span>
                    ({t.digitVal} × {sourceBase}<sup>{t.power}</sup>)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 text-[10px] block">{t.digitVal} × {t.weight}</span>
                  <span className="font-bold text-emerald-400">= {t.subtotal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic2() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 002_001
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Topic 2
              </span>
              <span className="px-3 py-1 bg-sky-500/15 text-sky-300 border border-sky-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Binary, Octal, and Hexadecimal to Decimal Conversion (Positional Weight Method)
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Convert any positional base string into decimal by evaluating individual digit products with ascending powers of the base.
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: Odometer Place Values</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Just like the decimal number 342 means (3 × 10²) + (4 × 10¹) + (2 × 10⁰) = 300 + 40 + 2, every number in base R works identically: each digit's contribution is its face value multiplied by the base raised to its column position index.
          </p>
        </div>

        {/* 3. Core Theory & Expansion Formula */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">Positional Weight Expansion Formula</h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-purple-300">General Radix Expansion:</h3>
              <p className="font-mono text-slate-200">
                Decimal Value = (dₙ₋₁ × Rⁿ⁻¹) + (dₙ₋₂ × Rⁿ⁻²) + ... + (d₁ × R¹) + (d₀ × R⁰)
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400 pt-2">
                <li><strong>For Binary (R = 2):</strong> Powers are ..., 64, 32, 16, 8, 4, 2, 1</li>
                <li><strong>For Octal (R = 8):</strong> Powers are ..., 512, 64, 8, 1</li>
                <li><strong>For Hexadecimal (R = 16):</strong> Powers are ..., 4096, 256, 16, 1</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <PositionalWeightExpander />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python Positional Weight Expansion Script</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/002_001_number-systems-and-base-conversions/topic2_files/base_to_decimal_expander.py"
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
                <li><strong>Treating Base⁰ as 0:</strong> Remember that 2⁰ = 1, 8⁰ = 1, 16⁰ = 1. Never multiply the units digit by 0!</li>
                <li><strong>Forgetting Hexadecimal Letter Values:</strong> Remember: A=10, B=11, C=12, D=13, E=14, F=15.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Show Full Expansion Steps:</strong> Write (d × Baseᵖᵒʷᵉʳ) explicitly before summing the terms.</li>
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
            fileName="CBSE_Class11_CS_Topic2_Base_To_Decimal_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Binary, Octal & Hexadecimal to Decimal Conversion"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
