import React, { useState } from 'react';
import { 
  Database, Binary, Layers, CheckCircle2, 
  XCircle, AlertTriangle, HelpCircle, Sparkles, 
  BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Cpu, Hash, Code, Calculator, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const PrimitiveMemoryCalculator = () => {
  const [selectedType, setSelectedType] = useState('int');
  const [testInput, setTestInput] = useState('100');

  const typeData = {
    byte: {
      category: "Integer (1 Byte)",
      bits: 8,
      bytes: 1,
      min: -128,
      max: 127,
      formula: "-2^7 to 2^7 - 1",
      defaultVal: "0",
      suffix: "None",
      color: "text-rose-400",
      border: "border-rose-500/40",
      bg: "bg-rose-500/10",
      example: "byte rollNo = 25;",
      explanation: "Smallest integer type. Ideal for saving memory in massive byte arrays or low-level binary streams."
    },
    short: {
      category: "Integer (2 Bytes)",
      bits: 16,
      bytes: 2,
      min: -32768,
      max: 32767,
      formula: "-2^15 to 2^15 - 1",
      defaultVal: "0",
      suffix: "None",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      example: "short seatNumber = 1450;",
      explanation: "Twice the capacity of a byte. Useful in memory-sensitive scenarios."
    },
    int: {
      category: "Integer (4 Bytes - Default)",
      bits: 32,
      bytes: 4,
      min: -2147483648,
      max: 2147483647,
      formula: "-2^31 to 2^31 - 1 (~ ±2.14 Billion)",
      defaultVal: "0",
      suffix: "None",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      example: "int salary = 45000;",
      explanation: "Default type for integer numbers in Java. Standard choice for loops, counts, and indices."
    },
    long: {
      category: "Integer (8 Bytes)",
      bits: 64,
      bytes: 8,
      min: "-9,223,372,036,854,775,808",
      max: "9,223,372,036,854,775,807",
      formula: "-2^63 to 2^63 - 1",
      defaultVal: "0L",
      suffix: "L or l (e.g. 9876543210L)",
      color: "text-indigo-400",
      border: "border-indigo-500/40",
      bg: "bg-indigo-500/10",
      example: "long aadhaarNo = 987654321098L;",
      explanation: "64-bit integer used when values exceed the 2.14 billion limit of int (timestamps, national IDs)."
    },
    float: {
      category: "Floating-Point (4 Bytes)",
      bits: 32,
      bytes: 4,
      min: "~1.4e-45",
      max: "~3.4e+38",
      formula: "IEEE 754 Single Precision (~6-7 digits)",
      defaultVal: "0.0f",
      suffix: "F or f (MANDATORY: 8.75f)",
      color: "text-teal-400",
      border: "border-teal-500/40",
      bg: "bg-teal-500/10",
      example: "float discountPercentage = 12.5f;",
      explanation: "Requires 'f' or 'F' suffix! Without 'f', Java treats decimals as double and throws a compiler error."
    },
    double: {
      category: "Floating-Point (8 Bytes - Default)",
      bits: 64,
      bytes: 8,
      min: "~4.9e-324",
      max: "~1.7e+308",
      formula: "IEEE 754 Double Precision (~15 digits)",
      defaultVal: "0.0d",
      suffix: "D or d (optional)",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      example: "double productPrice = 1499.99;",
      explanation: "Default type for fractional numbers. Standard choice for scientific and high-precision calculations."
    },
    char: {
      category: "Character (2 Bytes - Unicode)",
      bits: 16,
      bytes: 2,
      min: 0,
      max: 65535,
      formula: "'\\u0000' to '\\uffff' (0 to 65,535)",
      defaultVal: "'\\u0000'",
      suffix: "Single quotes ('A', '₹')",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      example: "char section = 'B';",
      explanation: "Unsigned 16-bit type storing international Unicode characters including Indian scripts and symbols."
    },
    boolean: {
      category: "Logical (1 Bit conceptual)",
      bits: 1,
      bytes: 1,
      min: "false",
      max: "true",
      formula: "Strictly true or false only",
      defaultVal: "false",
      suffix: "None",
      color: "text-pink-400",
      border: "border-pink-500/40",
      bg: "bg-pink-500/10",
      example: "boolean isPassed = true;",
      explanation: "Holds truth flags. Integers (0 or 1) CANNOT be used as boolean in Java."
    }
  };

  // Evaluate test input for selected type
  const evaluateInput = () => {
    const raw = testInput.trim();
    if (!raw) return { valid: false, msg: "Enter a test value above." };

    if (selectedType === 'byte') {
      const num = Number(raw);
      if (isNaN(num) || !Number.isInteger(num)) return { valid: false, msg: "❌ Invalid integer format." };
      if (num < -128 || num > 127) return { valid: false, msg: `❌ Out of range! byte can only store -128 to 127. (${num} causes compiler error).` };
      return { valid: true, msg: `✅ Valid byte literal: byte b = ${num}; (Occupies 1 byte in memory)` };
    }

    if (selectedType === 'short') {
      const num = Number(raw);
      if (isNaN(num) || !Number.isInteger(num)) return { valid: false, msg: "❌ Invalid integer format." };
      if (num < -32768 || num > 32767) return { valid: false, msg: `❌ Out of range! short stores -32,768 to 32,767.` };
      return { valid: true, msg: `✅ Valid short literal: short s = ${num}; (Occupies 2 bytes in memory)` };
    }

    if (selectedType === 'int') {
      const num = Number(raw);
      if (isNaN(num) || !Number.isInteger(num)) return { valid: false, msg: "❌ Invalid integer format." };
      if (num < -2147483648 || num > 2147483647) return { valid: false, msg: `❌ Out of range! Exceeds 32-bit int bounds. Use long instead.` };
      return { valid: true, msg: `✅ Valid int literal: int x = ${num}; (Occupies 4 bytes in memory)` };
    }

    if (selectedType === 'float') {
      if (raw.endsWith('f') || raw.endsWith('F')) {
        const num = Number(raw.slice(0, -1));
        if (isNaN(num)) return { valid: false, msg: "❌ Invalid float number." };
        return { valid: true, msg: `✅ Valid float literal with 'f' suffix: float f = ${raw};` };
      }
      return { valid: false, msg: `⚠️ Warning: In Java, '${raw}' is treated as a double. To declare a float, append 'f' (e.g. ${raw}f).` };
    }

    if (selectedType === 'char') {
      if (raw.length === 1) {
        return { valid: true, msg: `✅ Valid char: char c = '${raw}'; (Unicode code point: ${raw.charCodeAt(0)})` };
      }
      if (raw.startsWith("'") && raw.endsWith("'") && raw.length === 3) {
        return { valid: true, msg: `✅ Valid char literal: char c = ${raw};` };
      }
      return { valid: false, msg: `❌ Invalid char! char stores exactly ONE character in single quotes (e.g. 'A').` };
    }

    if (selectedType === 'boolean') {
      if (raw === 'true' || raw === 'false') {
        return { valid: true, msg: `✅ Valid boolean literal: boolean flag = ${raw};` };
      }
      if (raw === '0' || raw === '1') {
        return { valid: false, msg: `❌ Incompatible Type! In Java, 0 or 1 cannot be assigned to boolean.` };
      }
      return { valid: false, msg: `❌ Invalid boolean! Must be strictly 'true' or 'false'.` };
    }

    return { valid: true, msg: `✅ Input accepted for ${selectedType}.` };
  };

  const validation = evaluateInput();
  const cur = typeData[selectedType];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase">
            <Calculator className="w-4 h-4" />
            <span>Interactive Data Type Explorer & Value Inspector</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Java 8 Primitive Data Types: Memory & Ranges
          </h3>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Statically & Strongly Typed
        </div>
      </div>

      {/* 8 Type Selection Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {Object.entries(typeData).map(([key, data]) => {
          const isActive = selectedType === key;
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedType(key);
                if (key === 'byte') setTestInput('100');
                else if (key === 'float') setTestInput('12.5f');
                else if (key === 'char') setTestInput('A');
                else if (key === 'boolean') setTestInput('true');
                else if (key === 'long') setTestInput('9876543210L');
                else setTestInput('2500');
              }}
              className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? `${data.bg} ${data.border} border-2 shadow-lg shadow-teal-500/10`
                  : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <span className={`text-xs font-mono font-black ${isActive ? data.color : "text-white"}`}>
                {key}
              </span>
              <span className="text-[10px] text-slate-500">{data.bytes} Byte{data.bytes > 1 ? 's' : ''}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Type Specs Card */}
      <div className={`p-6 rounded-2xl border ${cur.border} ${cur.bg} space-y-4`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{cur.category}</span>
            <h4 className={`text-2xl font-black ${cur.color}`}>{selectedType}</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-200">
              Size: {cur.bytes} Byte{cur.bytes > 1 ? 's' : ''} ({cur.bits} Bits)
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-300">
              Default: {cur.defaultVal}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {cur.explanation}
        </p>

        {/* Memory Grid Visualization */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Memory Footprint in RAM ({cur.bytes} Byte{cur.bytes > 1 ? 's' : ''} = {cur.bits} Bits):</span>
            <span className="font-mono text-amber-300">Formula: {cur.formula}</span>
          </div>
          <div className="grid grid-cols-8 sm:grid-cols-16 gap-1">
            {Array.from({ length: Math.min(cur.bits, 32) }).map((_, i) => (
              <div 
                key={i} 
                className={`h-4 rounded text-[9px] flex items-center justify-center font-mono ${
                  i === 0 ? "bg-rose-500/30 text-rose-300 border border-rose-500/50" : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                }`}
                title={i === 0 ? "Sign Bit (0 = +, 1 = -)" : `Data Bit ${i}`}
              >
                {i === 0 ? "S" : "B"}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Min: {String(cur.min)}</span>
            <span>Max: {String(cur.max)}</span>
          </div>
        </div>

        {/* Live Value Tester Input */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Test a Literal Value for <code className="text-teal-300">{selectedType}</code>:</span>
            <span className="text-slate-500 text-[11px]">Suffix Rule: {cur.suffix}</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-teal-400"
              placeholder={`e.g. ${cur.defaultVal}`}
            />
          </div>
          <div className={`p-3 rounded-xl text-xs font-mono flex items-start gap-2 ${
            validation.valid ? "bg-emerald-950/60 border border-emerald-800/60 text-emerald-300" : "bg-rose-950/60 border border-rose-800/60 text-rose-300"
          }`}>
            {validation.valid ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            <span>{validation.msg}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic2() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
          <Database className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_001 • Topic 2</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Primitive Data Types in Java: <span className="bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">byte, short, int, long, float, double, char, boolean</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the exact memory footprints, bit sizes, value ranges, literal suffixes, and Unicode representations of the 8 fundamental primitive types in Java for CBSE Class 12 IT-802 examinations.
        </p>
      </div>

      {/* Interactive Calculator and Inspector */}
      <div className="max-w-6xl mx-auto">
        <PrimitiveMemoryCalculator />
      </div>

      {/* Master CBSE Reference Matrix */}
      <div className="max-w-6xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>CBSE Class 12 IT-802 Master Primitive Reference Matrix</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/60">
                <th className="p-3">Data Type</th>
                <th className="p-3">Memory Size</th>
                <th className="p-3">Bits</th>
                <th className="p-3">Range / Values</th>
                <th className="p-3">Default Value</th>
                <th className="p-3">Literal Suffix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr>
                <td className="p-3 font-bold text-rose-400">byte</td>
                <td className="p-3">1 Byte</td>
                <td className="p-3">8</td>
                <td className="p-3 text-slate-200">-128 to 127</td>
                <td className="p-3">0</td>
                <td className="p-3 text-slate-500">None</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-amber-400">short</td>
                <td className="p-3">2 Bytes</td>
                <td className="p-3">16</td>
                <td className="p-3 text-slate-200">-32,768 to 32,767</td>
                <td className="p-3">0</td>
                <td className="p-3 text-slate-500">None</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-sky-400">int</td>
                <td className="p-3">4 Bytes</td>
                <td className="p-3">32</td>
                <td className="p-3 text-slate-200">-2^31 to 2^31 - 1</td>
                <td className="p-3">0</td>
                <td className="p-3 text-slate-500">None (Default)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-400">long</td>
                <td className="p-3">8 Bytes</td>
                <td className="p-3">64</td>
                <td className="p-3 text-slate-200">-2^63 to 2^63 - 1</td>
                <td className="p-3">0L</td>
                <td className="p-3 text-indigo-300">L or l</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-teal-400">float</td>
                <td className="p-3">4 Bytes</td>
                <td className="p-3">32</td>
                <td className="p-3 text-slate-200">~1.4e-45 to ~3.4e+38</td>
                <td className="p-3">0.0f</td>
                <td className="p-3 text-teal-300 font-bold">F or f (Mandatory)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-400">double</td>
                <td className="p-3">8 Bytes</td>
                <td className="p-3">64</td>
                <td className="p-3 text-slate-200">~4.9e-324 to ~1.7e+308</td>
                <td className="p-3">0.0d</td>
                <td className="p-3 text-slate-500">D or d (Optional)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-purple-400">char</td>
                <td className="p-3">2 Bytes</td>
                <td className="p-3">16</td>
                <td className="p-3 text-slate-200">0 to 65,535 (Unicode)</td>
                <td className="p-3">'\u0000'</td>
                <td className="p-3 text-purple-300">Single Quotes ''</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-pink-400">boolean</td>
                <td className="p-3">1 Bit*</td>
                <td className="p-3">-</td>
                <td className="p-3 text-slate-200">true or false only</td>
                <td className="p-3">false</td>
                <td className="p-3 text-slate-500">None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Java Primitive Data Types Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Primitive Data Types" 
          description="Test your skills on byte limits, float suffixes, char Unicode ranges, boolean type safety, and memory allocations with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Watch out for two favorite CBSE traps: (1) 'float f = 3.14;' gives a compile error because 3.14 is double by default — you MUST write '3.14f'. (2) 'boolean b = 1;' is illegal in Java because integers and booleans cannot be converted!" 
        />
      </div>
    </div>
  );
}
