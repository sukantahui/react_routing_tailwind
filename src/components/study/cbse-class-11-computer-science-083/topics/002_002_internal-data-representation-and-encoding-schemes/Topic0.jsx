import React, { useState } from 'react';
import {
  Binary, FileText, Globe, Code, CheckCircle2,
  AlertTriangle, HelpCircle, ShieldCheck, Sparkles,
  Terminal, ArrowRight, RefreshCw, Cpu, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/encoding_and_complements_audit.py?raw";

// Interactive Character Code Inspector Widget
const CharacterInspector = () => {
  const [inputChar, setInputChar] = useState('A');

  const char = inputChar.length > 0 ? inputChar[0] : 'A';
  const codePoint = char.codePointAt(0) || 65;
  const unicodeHex = `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
  const bin8 = codePoint < 256 ? codePoint.toString(2).padStart(8, '0') : 'Multibyte (>8b)';

  // UTF-8 encoding bytes in hex
  const utf8Hex = Array.from(new TextEncoder().encode(char))
    .map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0'))
    .join(' ');

  return (
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Globe size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Character Encoding &amp; Code Point Inspector
            </h3>
            <p className="text-xs text-slate-400">
              Type any letter, number, Indian script glyph (Devanagari, Bengali), or emoji to inspect its internal byte encoding.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Character or Symbol:</label>
          <input
            type="text"
            value={inputChar}
            maxLength={2}
            onChange={(e) => setInputChar(e.target.value)}
            className="w-24 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-2xl text-sky-400 font-bold focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Quick Select Buttons */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Quick Presets:</label>
          <div className="flex flex-wrap gap-1.5">
            {['A', 'a', '0', '₹', 'क', 'ক', '🚀', ' '].map((preset) => (
              <button
                key={preset}
                onClick={() => setInputChar(preset)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  inputChar === preset
                    ? 'bg-sky-500 text-white border-sky-400'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {preset === ' ' ? 'Space' : preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Code Point Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Unicode Code Point</span>
          <span className="text-base font-mono font-bold text-sky-300 block">{unicodeHex}</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Decimal (ord)</span>
          <span className="text-base font-mono font-bold text-emerald-300 block">{codePoint}</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Binary Bitstream</span>
          <span className="text-base font-mono font-bold text-amber-300 block truncate">{bin8}</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">UTF-8 Hex Bytes</span>
          <span className="text-base font-mono font-bold text-purple-300 block truncate">{utf8Hex}</span>
        </div>
      </div>
    </div>
  );
};

// Interactive 2's Complement Calculator [Enrichment]
const TwosComplementWidget = () => {
  const [signedNum, setSignedNum] = useState(-13);

  const val = Math.max(-128, Math.min(127, Number(signedNum) || 0));
  const absVal = Math.abs(val);
  const posBin = absVal.toString(2).padStart(8, '0');

  // Compute 1's complement
  const onesComp = posBin.split('').map(b => b === '0' ? '1' : '0').join('');

  // Compute 2's complement
  const twosVal = (parseInt(onesComp, 2) + 1) & 0xFF;
  const twosComp = val >= 0 ? posBin : twosVal.toString(2).padStart(8, '0');

  return (
    <div className="bg-slate-900/90 rounded-2xl p-5 border border-purple-500/30 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            Enrichment / Advanced Concept
          </span>
          <h4 className="text-sm font-bold text-white">8-Bit Signed 2's Complement Generator</h4>
        </div>
        <span className="text-xs text-slate-400 font-mono">Range: -128 to +127</span>
      </div>

      <div className="max-w-xs">
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Signed Integer (-128 to +127):</label>
        <input
          type="number"
          min="-128"
          max="127"
          value={signedNum}
          onChange={(e) => setSignedNum(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-slate-400 block font-semibold">1. Magnitude Binary (+{absVal}):</span>
          <span className="font-mono font-bold text-sky-400 text-sm">{posBin}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-slate-400 block font-semibold">2. 1's Complement (Invert bits):</span>
          <span className="font-mono font-bold text-amber-400 text-sm">{val < 0 ? onesComp : 'N/A (Positive)'}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/40 space-y-1">
          <span className="text-purple-300 block font-semibold">3. Stored 2's Complement ({val}):</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">{twosComp}</span>
        </div>
      </div>

      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
        <Sparkles size={14} className="text-purple-400 shrink-0" />
        <span>
          <strong>ALU Note:</strong> The leftmost bit ({twosComp[0]}) is the sign bit. <strong>0</strong> = Positive, <strong>1</strong> = Negative.
        </span>
      </div>
    </div>
  );
};

export default function Topic0() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/50 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · 10 Marks
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Module 002_002 · Topic 0
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core + Enrichment
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Internal Data Representation: Character Encodings (ASCII, ISCII, Unicode) &amp; Signed 2's Complement
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Explore how raw electrical signals represent characters, Indian scripts, international languages, emojis, and signed negative numbers. Master ASCII code points, ISCII standards, UTF-8 mechanics, and ALU 2's complement arithmetic.
            </p>
          </div>
        </div>

        {/* SECTION 2: IN SIMPLE WORDS */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: The Universal Phone Directory of Glyphs</h2>
              <p className="text-xs text-slate-400">Why computers need standard code point tables</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Just like every citizen in Barrackpore is assigned a unique Aadhaar or voter identification number, character encoding schemes assign a unique integer to every symbol on Earth. When you press key <strong>'A'</strong>, the keyboard sends number <strong>65</strong> (`01000001` in binary) to the CPU.
          </p>
        </div>

        {/* SECTION 3: INTERACTIVE CHARACTER CODE INSPECTOR */}
        <div className="space-y-4">
          <CharacterInspector />
        </div>

        {/* SECTION 4: ENCODING COMPARISON TABLE */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 shadow-md">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Encoding Scheme</th>
                <th className="py-3 px-4">Bit Width</th>
                <th className="py-3 px-4">Character Capacity</th>
                <th className="py-3 px-4">Supported Scripts &amp; Applications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-sky-400">Standard ASCII</td>
                <td className="py-3 px-4 font-mono">7 bits</td>
                <td className="py-3 px-4 font-mono">128 (0–127)</td>
                <td className="py-3 px-4">English alphabets (A-Z, a-z), digits (0-9), punctuation, control codes.</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-emerald-400">ISCII (Indian Standard)</td>
                <td className="py-3 px-4 font-mono">8 bits</td>
                <td className="py-3 px-4 font-mono">256 (0–255)</td>
                <td className="py-3 px-4">ASCII (0-127) + Indian official languages (Devanagari, Bengali, Tamil, etc.).</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-purple-400">Unicode UTF-8</td>
                <td className="py-3 px-4 font-mono">1 to 4 bytes (Variable)</td>
                <td className="py-3 px-4 font-mono">1,114,112 code points</td>
                <td className="py-3 px-4">Universal Web Standard: All world languages, emojis, math symbols. 100% ASCII compatible.</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-amber-400">Unicode UTF-32</td>
                <td className="py-3 px-4 font-mono">4 bytes (32 bits fixed)</td>
                <td className="py-3 px-4 font-mono">1,114,112 code points</td>
                <td className="py-3 px-4">Fixed-width internal memory arrays for rapid random indexing.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 5: SIGNED BINARY 2'S COMPLEMENT (ENRICHMENT) */}
        <div className="space-y-4">
          <TwosComplementWidget />
        </div>

        {/* SECTION 6: PYTHON LAB SCRIPT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: Character Encodings &amp; 2's Complement
              </h2>
              <p className="text-xs text-slate-400">
                Python demonstration of character ordinal lookups, multibyte UTF-8 byte streams, and 8-bit 2's complement calculation.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="encoding_and_complements_audit.py – Character & Signed Binary Engine"
              highlightLines={[12, 23, 37, 52]}
            />
          </div>
        </div>

        {/* SECTION 7: COMMON PITFALLS & EXAM ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Examination Pitfalls
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Mixing Up 'A' and 'a':</strong> Remembering uppercase 'A' = 65 and lowercase 'a' = 97. The difference is exactly 32.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Character '0' vs Number 0:</strong> In ASCII, the character `'0'` has code 48. Writing 0 instead of 48 causes marks loss.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices &amp; Python Built-ins
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Know `ord()` and `chr()`:</strong> `ord('A')` returns 65, and `chr(65)` returns `'A'`. Essential for Python string questions.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>2's Complement Definition:</strong> State clearly: 2's Complement = (1's Complement) + 1.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 8: FAQ ASSESSMENT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Exam Preparation &amp; Conceptual Self-Assessment (25 Questions)
              </h2>
              <p className="text-xs text-slate-400">
                Test your knowledge of character encoding systems, ISCII scripts, Unicode UTF-8, and 2's complement binary math.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* SECTION 9: TEACHER'S NOTE & PRINTABLE SUMMARY */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="002_002_encoding_and_signed_binary_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
