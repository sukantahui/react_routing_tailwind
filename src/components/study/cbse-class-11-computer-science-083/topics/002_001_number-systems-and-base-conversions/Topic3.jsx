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
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/binary_octal_grouper.py?raw";

// Interactive 3-Bit Triplet Grouping & Expansion Visualizer
const BinaryOctalGrouperWidget = () => {
  const [mode, setMode] = useState('binToOct');
  const [binaryInput, setBinaryInput] = useState("11010110");
  const [octalInput, setOctalInput] = useState("326");

  const octMap = {
    '0': '000', '1': '001', '2': '010', '3': '011',
    '4': '100', '5': '101', '6': '110', '7': '111'
  };
  const binMap = {
    '000': '0', '001': '1', '010': '2', '011': '3',
    '100': '4', '101': '5', '110': '6', '111': '7'
  };

  // Binary to Octal Calculations
  const cleanBin = binaryInput.replace(/[^01]/g, '') || "0";
  const rem = cleanBin.length % 3;
  const padLen = rem === 0 ? 0 : 3 - rem;
  const paddedBin = "0".repeat(padLen) + cleanBin;
  const triplets = [];
  for (let i = 0; i < paddedBin.length; i += 3) {
    triplets.push(paddedBin.substring(i, i + 3));
  }
  const octalResult = triplets.map(t => binMap[t] || '?').join('');

  // Octal to Binary Calculations
  const cleanOct = octalInput.replace(/[^0-7]/g, '') || "0";
  const expandedTriplets = cleanOct.split('').map(d => ({ digit: d, bin: octMap[d] || '000' }));
  const fullBinaryResult = expandedTriplets.map(item => item.bin).join('');

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Binary size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive 3-Bit Grouping &amp; Expansion Visualizer (Binary &harr; Octal)
            </h3>
            <p className="text-xs text-slate-400">
              Leverage 2³ = 8 to convert directly between Binary triplets and Octal digits with zero decimal arithmetic.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setMode('binToOct')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'binToOct' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Binary &rarr; Octal (Grouping)
          </button>
          <button
            onClick={() => setMode('octToBin')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'octToBin' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Octal &rarr; Binary (Expansion)
          </button>
        </div>
      </div>

      {mode === 'binToOct' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Binary Number (0s and 1s):</label>
              <input
                type="text"
                value={binaryInput}
                onChange={(e) => setBinaryInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono font-bold tracking-wider"
                placeholder="e.g. 11010110"
              />
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Octal Output:</span>
              <p className="text-2xl font-mono font-extrabold text-white tracking-wider">
                ({octalResult})<sub className="text-emerald-400 text-xs font-sans">8</sub>
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block border-b border-slate-800 pb-2">
              Step-by-Step 3-Bit Grouping (Right to Left):
            </span>

            {padLen > 0 && (
              <p className="text-xs text-amber-300 font-mono">
                [!] Added {padLen} leading zero(s) on the left to form full 3-bit triplets: <span className="text-white font-bold">{paddedBin}</span>
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {triplets.map((trip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-center space-y-1 min-w-[75px]">
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Triplet #{idx + 1}</span>
                  <span className="text-base font-mono font-bold text-sky-300 block">{trip}</span>
                  <span className="text-xs text-slate-500 block">&darr;</span>
                  <span className="text-base font-mono font-extrabold text-emerald-400 block">{binMap[trip]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Octal Number (Digits 0-7):</label>
              <input
                type="text"
                value={octalInput}
                onChange={(e) => setOctalInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono font-bold tracking-wider"
                placeholder="e.g. 326"
              />
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Binary Output:</span>
              <p className="text-2xl font-mono font-extrabold text-white tracking-wider break-all">
                ({fullBinaryResult})<sub className="text-emerald-400 text-xs font-sans">2</sub>
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block border-b border-slate-800 pb-2">
              Individual 3-Bit Expansion Steps:
            </span>

            <div className="flex flex-wrap gap-3 pt-2">
              {expandedTriplets.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-center space-y-1 min-w-[75px]">
                  <span className="text-xs font-mono font-extrabold text-emerald-400 block">Digit: {item.digit}</span>
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

export default function Topic3() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 002_001
              </span>
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full">
                Topic 3
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Binary to Octal (3-Bit Grouping) and Octal to Binary Conversion
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Learn the 3-bit grouping shortcut based on 2³ = 8 to rapidly convert between Binary and Octal representations without intermediary base conversions.
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
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: 3-Egg Egg Carton Packaging</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Since 8 is 2³, each octal digit is like a pre-packaged box holding exactly 3 binary bits. Converting between binary and octal is simply grouping loose individual bits into 3-bit cartons or unpacking 3-bit cartons into raw binary digits.
          </p>
        </div>

        {/* 3. Core Theory Table */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-emerald-400" size={24} />
            <h2 className="text-xl font-bold text-white">3-Bit Binary to Octal Conversion Table</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            {[
              { oct: '0', bin: '000' }, { oct: '1', bin: '001' },
              { oct: '2', bin: '010' }, { oct: '3', bin: '011' },
              { oct: '4', bin: '100' }, { oct: '5', bin: '101' },
              { oct: '6', bin: '110' }, { oct: '7', bin: '111' }
            ].map(item => (
              <div key={item.oct} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-sm">Octal {item.oct}</span>
                <span className="text-sky-300 font-bold tracking-wider">{item.bin}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <BinaryOctalGrouperWidget />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python 3-Bit Grouping &amp; Expansion Script</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/002_001_number-systems-and-base-conversions/topic3_files/binary_octal_grouper.py"
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
                <li><strong>Grouping from left to right for integers:</strong> Grouping must ALWAYS start from the right (LSB). Grouping from left shifts the bits and gives the wrong answer.</li>
                <li><strong>Writing 2 as "10" instead of "010":</strong> In octal to binary conversion, every octal digit must produce exactly 3 bits.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Show the 3-bit bracket groups:</strong> Write (011) (010) (110) clearly before writing the final octal answer.</li>
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
            fileName="CBSE_Class11_CS_Topic3_Binary_Octal_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Binary to Octal & Octal to Binary Conversion"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
