import React, { useState } from 'react';
import {
  Binary, Calculator, Hash, ArrowRight, RefreshCw,
  BookOpen, Code, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Sparkles, Terminal, Layers, Plus, Minus, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/binary_arithmetic_engine.py?raw";

// Interactive Binary Arithmetic Calculator Widget
const BinaryArithmeticWidget = () => {
  const [num1, setNum1] = useState(27); // 11011
  const [num2, setNum2] = useState(14); // 01110
  const [operation, setOperation] = useState('add'); // 'add', 'sub', 'mul'

  const val1 = Math.max(0, Math.min(255, Number(num1) || 0));
  const val2 = Math.max(0, Math.min(255, Number(num2) || 0));

  const bin1 = val1.toString(2);
  const bin2 = val2.toString(2);
  const maxLen = Math.max(bin1.length, bin2.length);

  const padded1 = bin1.padStart(maxLen, '0');
  const padded2 = bin2.padStart(maxLen, '0');

  // Addition with carries calculation
  const getAdditionDetails = () => {
    let carries = [0];
    let sumBits = [];
    let carry = 0;
    for (let i = maxLen - 1; i >= 0; i--) {
      const b1 = parseInt(padded1[i], 10);
      const b2 = parseInt(padded2[i], 10);
      const total = b1 + b2 + carry;
      sumBits.unshift(total % 2);
      carry = Math.floor(total / 2);
      carries.unshift(carry);
    }
    if (carry > 0) {
      sumBits.unshift(carry);
    }
    return {
      sumBin: sumBits.join(''),
      carries: carries.slice(0, maxLen).join(''),
      finalCarry: carry,
      decResult: val1 + val2
    };
  };

  const addDetails = getAdditionDetails();

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Binary Arithmetic ALU Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Observe bitwise carries, borrow transitions, and decimal verifications in real time.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setOperation('add')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              operation === 'add' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus size={14} /> Addition (+)
          </button>
          <button
            onClick={() => setOperation('sub')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              operation === 'sub' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Minus size={14} /> Subtraction (-)
          </button>
          <button
            onClick={() => setOperation('mul')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              operation === 'mul' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <X size={14} /> Multiplication (×)
          </button>
        </div>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>First Number (A) [Decimal: 0-255]</span>
            <span className="font-mono text-cyan-400">({val1})₁₀ = ({bin1})₂</span>
          </label>
          <input
            type="number"
            min="0"
            max="255"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-3.5 py-2 text-white font-mono text-sm outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Second Number (B) [Decimal: 0-255]</span>
            <span className="font-mono text-emerald-400">({val2})₁₀ = ({bin2})₂</span>
          </label>
          <input
            type="number"
            min="0"
            max="255"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-3.5 py-2 text-white font-mono text-sm outline-none transition-all"
          />
        </div>
      </div>

      {/* Arithmetic Board */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 font-mono space-y-4">
        <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800 pb-2 flex justify-between items-center">
          <span>Bitwise Execution Column</span>
          <span className="text-cyan-400 font-bold">Base-2 Digital Logic</span>
        </div>

        {operation === 'add' && (
          <div className="flex flex-col items-end max-w-xs mx-auto space-y-1 text-sm sm:text-base">
            <div className="text-amber-400 text-xs tracking-widest">
              Carry: &nbsp;{addDetails.carries}
            </div>
            <div className="text-slate-200 tracking-widest flex items-center gap-2">
              <span className="text-xs text-slate-400">A:</span>
              <span className="font-bold text-cyan-300">{padded1}</span>
              <span className="text-xs text-slate-400 font-sans">({val1})₁₀</span>
            </div>
            <div className="text-slate-200 tracking-widest flex items-center gap-2 border-b-2 border-slate-700 pb-1 w-full justify-end">
              <span className="text-cyan-400 font-bold">+</span>
              <span className="text-xs text-slate-400">B:</span>
              <span className="font-bold text-emerald-300">{padded2}</span>
              <span className="text-xs text-slate-400 font-sans">({val2})₁₀</span>
            </div>
            <div className="text-amber-400 font-black tracking-widest text-lg pt-1 flex items-center gap-2">
              <span className="text-xs text-slate-400 font-sans">Sum:</span>
              <span>{addDetails.sumBin}</span>
              <span className="text-xs text-amber-300 font-sans">({addDetails.decResult})₁₀</span>
            </div>
          </div>
        )}

        {operation === 'sub' && (
          <div className="flex flex-col items-end max-w-xs mx-auto space-y-1 text-sm sm:text-base">
            {val1 < val2 ? (
              <div className="text-center w-full py-4 text-rose-400 text-xs font-sans">
                <AlertTriangle className="inline mr-1" size={16} />
                For direct standard unsigned binary subtraction, Operand A must be ≥ Operand B ({val1} &lt; {val2}).
              </div>
            ) : (
              <>
                <div className="text-slate-200 tracking-widest flex items-center gap-2">
                  <span className="text-xs text-slate-400">A:</span>
                  <span className="font-bold text-cyan-300">{padded1}</span>
                  <span className="text-xs text-slate-400 font-sans">({val1})₁₀</span>
                </div>
                <div className="text-slate-200 tracking-widest flex items-center gap-2 border-b-2 border-slate-700 pb-1 w-full justify-end">
                  <span className="text-cyan-400 font-bold">-</span>
                  <span className="text-xs text-slate-400">B:</span>
                  <span className="font-bold text-emerald-300">{padded2}</span>
                  <span className="text-xs text-slate-400 font-sans">({val2})₁₀</span>
                </div>
                <div className="text-emerald-400 font-black tracking-widest text-lg pt-1 flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-sans">Diff:</span>
                  <span>{(val1 - val2).toString(2)}</span>
                  <span className="text-xs text-emerald-300 font-sans">({val1 - val2})₁₀</span>
                </div>
              </>
            )}
          </div>
        )}

        {operation === 'mul' && (
          <div className="flex flex-col items-end max-w-xs mx-auto space-y-1 text-sm sm:text-base">
            <div className="text-slate-200 tracking-widest flex items-center gap-2">
              <span className="text-xs text-slate-400">A:</span>
              <span className="font-bold text-cyan-300">{bin1}</span>
              <span className="text-xs text-slate-400 font-sans">({val1})₁₀</span>
            </div>
            <div className="text-slate-200 tracking-widest flex items-center gap-2 border-b-2 border-slate-700 pb-1 w-full justify-end">
              <span className="text-cyan-400 font-bold">×</span>
              <span className="text-xs text-slate-400">B:</span>
              <span className="font-bold text-emerald-300">{bin2}</span>
              <span className="text-xs text-slate-400 font-sans">({val2})₁₀</span>
            </div>
            <div className="text-violet-400 font-black tracking-widest text-lg pt-1 flex items-center gap-2">
              <span className="text-xs text-slate-400 font-sans">Product:</span>
              <span>{(val1 * val2).toString(2)}</span>
              <span className="text-xs text-violet-300 font-sans">({val1 * val2})₁₀</span>
            </div>
          </div>
        )}
      </div>

      {/* Logic rules quick reference */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
          <div className="font-bold text-cyan-400 mb-1">Addition Rules</div>
          <div className="text-slate-300 space-y-0.5 font-mono">
            <div>0 + 0 = 0</div>
            <div>0 + 1 = 1</div>
            <div>1 + 0 = 1</div>
            <div className="text-amber-400 font-bold">1 + 1 = 0 (carry 1)</div>
            <div className="text-amber-300 font-bold">1 + 1 + 1 = 1 (carry 1)</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
          <div className="font-bold text-emerald-400 mb-1">Subtraction Rules</div>
          <div className="text-slate-300 space-y-0.5 font-mono">
            <div>0 - 0 = 0</div>
            <div>1 - 0 = 1</div>
            <div>1 - 1 = 0</div>
            <div className="text-rose-400 font-bold">0 - 1 = 1 (borrow 1)</div>
            <div className="text-slate-400 text-[10px] font-sans">Borrow 1 from higher position gives (10)₂ = 2</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
          <div className="font-bold text-violet-400 mb-1">Multiplication Rules</div>
          <div className="text-slate-300 space-y-0.5 font-mono">
            <div>0 × 0 = 0</div>
            <div>0 × 1 = 0</div>
            <div>1 × 0 = 0</div>
            <div className="text-violet-400 font-bold">1 × 1 = 1</div>
            <div className="text-slate-400 text-[10px] font-sans">Same as Boolean AND + left shift partial sums</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic7() {
  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
              <Binary size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Topic 07 / 10
                </span>
                <span className="text-xs text-slate-400">CBSE Class 11 CS (083)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Binary Arithmetic &amp; Logic Operations
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* 1. Key Concept Overview */}
        <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-wide uppercase">
            <Sparkles size={18} />
            <span>Core Concept Overview</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            How Computers Compute: Arithmetic in Base-2
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            Inside the Central Processing Unit's <strong>Arithmetic Logic Unit (ALU)</strong>, all mathematical operations—from elementary addition to complex graphics rendering—are executed entirely in <strong>base-2 binary</strong>. Understanding how bitwise carries and borrows propagate is essential for mastering computer architecture and solving CBSE board examination numericals accurately.
          </p>
        </div>

        {/* 2. Detailed Technical Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <Plus size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Binary Addition</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When the sum of bits exceeds 1, a carry of <strong>1</strong> is generated to the next higher significance column (just like 5+5=10 in decimal).
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>1 + 1 = 10₂ (Sum: 0, Carry: 1)</div>
              <div>1 + 1 + 1 = 11₂ (Sum: 1, Carry: 1)</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Minus size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Binary Subtraction</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When subtracting 1 from 0 (<code>0 - 1</code>), a borrow of <strong>1</strong> is pulled from the adjacent left column, turning 0 into <code>(10)₂ = 2₁₀</code>.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 space-y-1">
              <div>(10)₂ - 1 = 1</div>
              <div>0 - 1 = 1 (after borrow)</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold">
              <X size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Binary Multiplication</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multiplication in binary is simpler than decimal because single-digit products are only 0 or 1. It consists of repeated <strong>shift and add</strong> steps.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-violet-300 space-y-1">
              <div>1011₂ × 1 = 1011₂</div>
              <div>1011₂ × 0 = 0000₂</div>
            </div>
          </div>
        </div>

        {/* 3. Interactive Widget */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-wide uppercase">
            <Calculator size={18} />
            <span>Interactive Simulator</span>
          </div>
          <BinaryArithmeticWidget />
        </div>

        {/* 4. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-cyan-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python Binary Arithmetic Engine Script</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/002_001_number-systems-and-base-conversions/topic7_files/binary_arithmetic_engine.py"
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
                <li><strong>Triple-One Carry Mistake:</strong> Forgetting that <code>1 + 1 + 1 = 11₂</code> (Sum 1, Carry 1). Many students write 0 with carry 1.</li>
                <li><strong>Borrow across multiple zeros:</strong> In binary subtraction like <code>1000₂ - 1</code>, borrowing propagates through all intermediate zeros converting them to 1.</li>
                <li><strong>Not verifying with Decimal:</strong> Always convert both operands to decimal, compute the answer, and verify that your binary result matches!</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Show carry rows clearly:</strong> Write the small carry row above the addends to earn full method marks.</li>
                <li><strong>State verification in brackets:</strong> E.g., <em>"Verification: (27)₁₀ + (14)₁₀ = (41)₁₀, and (101001)₂ = 41₁₀ (Verified)"</em>.</li>
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
            fileName="CBSE_Class11_CS_Topic7_Binary_Arithmetic_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 8. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Binary Arithmetic & Logic Operations"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
