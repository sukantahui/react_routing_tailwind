import React, { useState } from 'react';
import {
  Layers, Binary, Hash, ArrowRight, ArrowLeftRight, RefreshCw,
  BookOpen, Code, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Sparkles, Terminal, Sliders
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/octal_to_hex_bridge.py?raw";

// Interactive Binary Bridge Visualizer (Octal <-> Binary <-> Hexadecimal)
const BinaryBridgeVisualizer = () => {
  const [conversionDirection, setConversionDirection] = useState('octToHex');
  const [octInput, setOctInput] = useState("756");
  const [hexInput, setHexInput] = useState("1EE");

  const octToBinMap = {
    '0': '000', '1': '001', '2': '010', '3': '011',
    '4': '100', '5': '101', '6': '110', '7': '111'
  };
  const hexToBinMap = {
    '0': '0000', '1': '0001', '2': '0010', '3': '0011',
    '4': '0100', '5': '0101', '6': '0110', '7': '0111',
    '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
    'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
  };

  const binToHexMap = Object.fromEntries(Object.entries(hexToBinMap).map(([k, v]) => [v, k]));
  const binToOctMap = Object.fromEntries(Object.entries(octToBinMap).map(([k, v]) => [v, k]));

  // Octal to Hex calculations
  const cleanOct = octInput.replace(/[^0-7]/g, '') || "0";
  const octalTriplets = cleanOct.split('').map(d => ({ digit: d, bin: octToBinMap[d] || '000' }));
  const rawBinFromOct = octalTriplets.map(item => item.bin).join('');
  const rem4 = rawBinFromOct.length % 4;
  const pad4 = rem4 === 0 ? 0 : 4 - rem4;
  const paddedBin4 = "0".repeat(pad4) + rawBinFromOct;
  const nibbles = [];
  for (let i = 0; i < paddedBin4.length; i += 4) {
    nibbles.push(paddedBin4.substring(i, i + 4));
  }
  const hexOutput = nibbles.map(n => binToHexMap[n] || '?').join('');

  // Hex to Octal calculations
  const cleanHex = hexInput.toUpperCase().replace(/[^0-9A-F]/g, '') || "0";
  const hexNibbles = cleanHex.split('').map(d => ({ digit: d, bin: hexToBinMap[d] || '0000' }));
  const rawBinFromHex = hexNibbles.map(item => item.bin).join('');
  const rem3 = rawBinFromHex.length % 3;
  const pad3 = rem3 === 0 ? 0 : 3 - rem3;
  const paddedBin3 = "0".repeat(pad3) + rawBinFromHex;
  const triplets = [];
  for (let i = 0; i < paddedBin3.length; i += 3) {
    triplets.push(paddedBin3.substring(i, i + 3));
  }
  const octalOutput = triplets.map(t => binToOctMap[t] || '?').join('').replace(/^0+/, '') || "0";

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <ArrowLeftRight size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Two-Step Binary Bridge (Octal &harr; Binary &harr; Hexadecimal)
            </h3>
            <p className="text-xs text-slate-400">
              Skip decimal calculation entirely by using raw Binary as a high-speed intermediary bridge.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setConversionDirection('octToHex')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              conversionDirection === 'octToHex' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Octal &rarr; Hexadecimal
          </button>
          <button
            onClick={() => setConversionDirection('hexToOct')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              conversionDirection === 'hexToOct' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Hexadecimal &rarr; Octal
          </button>
        </div>
      </div>

      {conversionDirection === 'octToHex' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Octal Value (Digits 0-7):</label>
              <input
                type="text"
                value={octInput}
                onChange={(e) => setOctInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 font-mono font-bold tracking-wider"
                placeholder="e.g. 756"
              />
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/30 space-y-1">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">Hexadecimal Output:</span>
              <p className="text-2xl font-mono font-extrabold text-white tracking-wider">
                ({hexOutput})<sub className="text-purple-400 text-xs font-sans">16</sub>
              </p>
            </div>
          </div>

          {/* 3-Step Bridge Pipeline Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">Step 1: 3-Bit Expansion</span>
              <div className="space-y-1 font-mono text-xs text-slate-300">
                {octalTriplets.map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-slate-800/60 pb-0.5">
                    <span>Octal '{item.digit}'</span>
                    <span className="text-sky-300 font-bold">&rarr; {item.bin}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Step 2: Binary Bitstream</span>
              <p className="font-mono text-xs text-amber-300 break-all bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                {rawBinFromOct}
              </p>
              <span className="text-[10px] text-slate-400 block">Padded for 4-bit nibbles: {paddedBin4}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">Step 3: 4-Bit Hex Assembly</span>
              <div className="space-y-1 font-mono text-xs text-slate-300">
                {nibbles.map((nib, idx) => (
                  <div key={idx} className="flex justify-between border-b border-slate-800/60 pb-0.5">
                    <span className="text-sky-300">{nib}</span>
                    <span className="text-purple-400 font-bold">&rarr; Hex '{binToHexMap[nib]}'</span>
                  </div>
                ))}
              </div>
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
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 font-mono font-bold tracking-wider uppercase"
                placeholder="e.g. 1EE"
              />
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-sky-500/30 space-y-1">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">Octal Output:</span>
              <p className="text-2xl font-mono font-extrabold text-white tracking-wider">
                ({octalOutput})<sub className="text-sky-400 text-xs font-sans">8</sub>
              </p>
            </div>
          </div>

          {/* 3-Step Bridge Pipeline Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">Step 1: 4-Bit Expansion</span>
              <div className="space-y-1 font-mono text-xs text-slate-300">
                {hexNibbles.map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-slate-800/60 pb-0.5">
                    <span>Hex '{item.digit}'</span>
                    <span className="text-purple-300 font-bold">&rarr; {item.bin}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Step 2: Binary Bitstream</span>
              <p className="font-mono text-xs text-amber-300 break-all bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                {rawBinFromHex}
              </p>
              <span className="text-[10px] text-slate-400 block">Padded for 3-bit triplets: {paddedBin3}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">Step 3: 3-Bit Octal Assembly</span>
              <div className="space-y-1 font-mono text-xs text-slate-300">
                {triplets.map((trip, idx) => (
                  <div key={idx} className="flex justify-between border-b border-slate-800/60 pb-0.5">
                    <span className="text-sky-300">{trip}</span>
                    <span className="text-emerald-400 font-bold">&rarr; Octal '{binToOctMap[trip]}'</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Topic5() {
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
                Topic 5
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Octal to Hexadecimal &amp; Hexadecimal to Octal via Binary Intermediary
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Learn the lightning-fast two-step bridge method: expand into binary triplets/nibbles and regroup without long decimal arithmetic.
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: Cargo Container Repacking</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Converting between octal and hexadecimal via decimal is like unloading 3-item boxes, converting every item into rupees, and then buying 4-item boxes with cash. The binary bridge simply unloads 3-item cartons into loose items (bits) and immediately repacks them into 4-item cartons without touching cash!
          </p>
        </div>

        {/* 3. Core Theory Step Summary */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-sky-400" size={24} />
            <h2 className="text-xl font-bold text-white">Two-Step Conversion Algorithm</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-sky-400">Octal &rarr; Hexadecimal:</h3>
              <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-300">
                <li>Expand each octal digit into 3 binary bits.</li>
                <li>Regroup the binary string into 4-bit nibbles from the right.</li>
                <li>Convert each 4-bit nibble into the corresponding hex character.</li>
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-purple-400">Hexadecimal &rarr; Octal:</h3>
              <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-300">
                <li>Expand each hex character into 4 binary bits.</li>
                <li>Regroup the binary string into 3-bit triplets from the right.</li>
                <li>Convert each 3-bit triplet into the corresponding octal digit.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <BinaryBridgeVisualizer />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python Binary Bridge Script</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/002_001_number-systems-and-base-conversions/topic5_files/octal_to_hex_bridge.py"
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
                <li><strong>Converting via Decimal during exams:</strong> This takes 4x longer and frequently causes arithmetic addition/division mistakes.</li>
                <li><strong>Forgetting to pad leading bits before regrouping:</strong> Ensure the binary bitstream is properly aligned to multiples of 3 or 4 bits.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Show both intermediate steps:</strong> Write both the binary expansion and the regrouped chunks clearly.</li>
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
            fileName="CBSE_Class11_CS_Topic5_Octal_Hex_Bridge_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Octal to Hexadecimal & Hexadecimal to Octal Conversion"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
