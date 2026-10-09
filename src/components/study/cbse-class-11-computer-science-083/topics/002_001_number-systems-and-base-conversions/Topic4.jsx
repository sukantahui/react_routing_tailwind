import React, { useState } from 'react';
import {
  Binary, Hash, ArrowRight, RefreshCw, Calculator,
  BookOpen, Code, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Sparkles, Terminal, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/binary_hex_grouper.py?raw";

// Interactive 4-Bit Nibble Grouping & Expansion Visualizer
const BinaryHexGrouperWidget = () => {
  const [mode, setMode] = useState('binToHex');
  const [binaryInput, setBinaryInput] = useState("10011100");
  const [hexInput, setHexInput] = useState("9C");

  const hexToBinMap = {
    '0': '0000', '1': '0001', '2': '0010', '3': '0011',
    '4': '0100', '5': '0101', '6': '0110', '7': '0111',
    '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
    'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
  };
  const binToHexMap = Object.fromEntries(Object.entries(hexToBinMap).map(([k, v]) => [v, k]));

  // Binary to Hex Calculations
  const cleanBin = binaryInput.replace(/[^01]/g, '') || "0";
  const rem = cleanBin.length % 4;
  const padLen = rem === 0 ? 0 : 4 - rem;
  const paddedBin = "0".repeat(padLen) + cleanBin;
  const nibbles = [];
  for (let i = 0; i < paddedBin.length; i += 4) {
    nibbles.push(paddedBin.substring(i, i + 4));
  }
  const hexResult = nibbles.map(n => binToHexMap[n] || '?').join('');

  // Hex to Binary Calculations
  const cleanHex = hexInput.toUpperCase().replace(/[^0-9A-F]/g, '') || "0";
  const expandedNibbles = cleanHex.split('').map(d => ({ digit: d, bin: hexToBinMap[d] || '0000' }));
  const fullBinaryResult = expandedNibbles.map(item => item.bin).join('');

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Hash size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive 4-Bit Nibble Visualizer (Binary &harr; Hexadecimal)
            </h3>
            <p className="text-xs text-slate-400">
              Leverage 2⁴ = 16 to directly map between 4-bit binary nibbles and single hexadecimal characters (0-9, A-F).
            </p>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setMode('binToHex')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'binToHex' ? 'bg-purple-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Binary &rarr; Hex (4-Bit Grouping)
          </button>
          <button
            onClick={() => setMode('hexToBin')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'hexToBin' ? 'bg-purple-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Hex &rarr; Binary (4-Bit Expansion)
          </button>
        </div>
      </div>

      {mode === 'binToHex' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Binary Number (0s and 1s):</label>
              <input
                type="text"
                value={binaryInput}
                onChange={(e) => setBinaryInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono font-bold tracking-wider"
                placeholder="e.g. 10011100"
              />
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 space-y-1">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">Hexadecimal Output:</span>
              <p className="text-2xl font-mono font-extrabold text-white tracking-wider">
                ({hexResult})<sub className="text-purple-400 text-xs font-sans">16</sub>
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block border-b border-slate-800 pb-2">
              Step-by-Step 4-Bit Nibble Grouping (Right to Left):
            </span>

            {padLen > 0 && (
              <p className="text-xs text-amber-300 font-mono">
                [!] Added {padLen} leading zero(s) on the left to form full 4-bit nibbles: <span className="text-white font-bold">{paddedBin}</span>
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {nibbles.map((nib, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-purple-500/40 text-center space-y-1 min-w-[85px]">
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Nibble #{idx + 1}</span>
                  <span className="text-base font-mono font-bold text-sky-300 block">{nib}</span>
                  <span className="text-xs text-slate-500 block">&darr;</span>
                  <span className="text-base font-mono font-extrabold text-purple-400 block">{binToHexMap[nib]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Hexadecimal Value (0-9, A-F):</label>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono font-bold tracking-wider uppercase"
                placeholder="e.g. 9C"
              />
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 space-y-1">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">Binary Output:</span>
              <p className="text-2xl font-mono font-extrabold text-white tracking-wider break-all">
                ({fullBinaryResult})<sub className="text-purple-400 text-xs font-sans">2</sub>
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block border-b border-slate-800 pb-2">
              Individual 4-Bit Nibble Expansion Steps:
            </span>

            <div className="flex flex-wrap gap-3 pt-2">
              {expandedNibbles.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-purple-500/40 text-center space-y-1 min-w-[85px]">
                  <span className="text-xs font-mono font-extrabold text-purple-400 block">Hex: {item.digit}</span>
                  <span className="text-xs text-slate-500 block">&darr;</span>
                  <span className="text-base font-mono font-bold text-sky-300 block">{item.bin}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Topic4() {
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
                Topic 4
              </span>
              <span className="px-3 py-1 bg-sky-500/15 text-sky-300 border border-sky-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Binary to Hexadecimal (4-Bit Grouping) and Hexadecimal to Binary Conversion
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Master 4-bit nibble grouping (2⁴ = 16) to translate between raw binary bitstreams and human-readable hexadecimal notation.
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: 4-Wheel Axle Assembly</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In modern automobile manufacturing, four individual tires are mounted together to form one complete wheelset axle. Hexadecimal characters act as compact 4-tire axles for binary bits, reducing long 16-bit binary strings (1111111111111111) into a clean 4-character hex label (FFFF).
          </p>
        </div>

        {/* 3. Core Theory Table */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">4-Bit Binary (Nibble) to Hexadecimal Table</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            {[
              { hex: '0', val: 0, bin: '0000' }, { hex: '1', val: 1, bin: '0001' },
              { hex: '2', val: 2, bin: '0010' }, { hex: '3', val: 3, bin: '0011' },
              { hex: '4', val: 4, bin: '0100' }, { hex: '5', val: 5, bin: '0101' },
              { hex: '6', val: 6, bin: '0110' }, { hex: '7', val: 7, bin: '0111' },
              { hex: '8', val: 8, bin: '1000' }, { hex: '9', val: 9, bin: '1001' },
              { hex: 'A', val: 10, bin: '1010' }, { hex: 'B', val: 11, bin: '1011' },
              { hex: 'C', val: 12, bin: '1100' }, { hex: 'D', val: 13, bin: '1101' },
              { hex: 'E', val: 14, bin: '1110' }, { hex: 'F', val: 15, bin: '1111' }
            ].map(item => (
              <div key={item.hex} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-purple-400 text-sm">Hex {item.hex}</span>
                  <span className="text-[10px] text-slate-500 block">({item.val})₁₀</span>
                </div>
                <span className="text-sky-300 font-bold tracking-wider">{item.bin}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <BinaryHexGrouperWidget />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python 4-Bit Nibble Grouping &amp; Expansion Script</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/002_001_number-systems-and-base-conversions/topic4_files/binary_hex_grouper.py"
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
                <li><strong>Writing incomplete nibbles:</strong> For example, writing hex '3' as '11' instead of '0011'. Every hex digit must expand to exactly 4 binary bits.</li>
                <li><strong>Confusing Hex letters:</strong> Remember: A=10, B=11, C=12, D=13, E=14, F=15.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Show 4-bit nibble groupings:</strong> Write (0011) (0111) (1101) clearly before showing the final hex answer (37D)₁₆.</li>
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
            fileName="CBSE_Class11_CS_Topic4_Binary_Hex_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Binary to Hexadecimal & Hexadecimal to Binary Conversion"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
