import React, { useState } from 'react';
import {
  Sparkles, Layers, BookOpen, Code, CheckCircle2,
  AlertTriangle, HelpCircle, ShieldCheck, FileText,
  Activity, ArrowRight, Check, Play, RefreshCw, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/boolean_laws_simplifier.py?raw";

// Interactive Boolean Laws Explorer Component
const BooleanLawsExplorer = () => {
  const [selectedLaw, setSelectedLaw] = useState('dist2');
  const [testA, setTestA] = useState(1);
  const [testB, setTestB] = useState(0);
  const [testC, setTestC] = useState(1);

  const lawsData = {
    identity: {
      name: "Identity Laws",
      orForm: "A + 0 = A",
      andForm: "A · 1 = A",
      description: "0 is the identity for OR; 1 is the identity for AND.",
      evalLHS: (a) => a | 0,
      evalRHS: (a) => a,
      lawType: "Single Variable"
    },
    idempotent: {
      name: "Idempotent Laws",
      orForm: "A + A = A",
      andForm: "A · A = A",
      description: "Combining a variable with itself yields the variable unchanged.",
      evalLHS: (a) => a | a,
      evalRHS: (a) => a,
      lawType: "Single Variable"
    },
    boundedness: {
      name: "Boundedness / Null Laws",
      orForm: "A + 1 = 1",
      andForm: "A · 0 = 0",
      description: "1 dominates OR (pulls HIGH); 0 dominates AND (pulls LOW).",
      evalLHS: (a) => a | 1,
      evalRHS: () => 1,
      lawType: "Single Variable"
    },
    complement: {
      name: "Complement Laws",
      orForm: "A + A' = 1",
      andForm: "A · A' = 0",
      description: "A variable ORed with its inverse is 1; ANDed with its inverse is 0.",
      evalLHS: (a) => a | (1 - a),
      evalRHS: () => 1,
      lawType: "Single Variable"
    },
    dist2: {
      name: "2nd Distributive Law (OR over AND)",
      orForm: "A + (B · C) = (A + B) · (A + C)",
      andForm: "A · (B + C) = (A · B) + (A · C)",
      description: "Unique to Boolean Algebra: Addition distributes over multiplication!",
      evalLHS: (a, b, c) => a | (b & c),
      evalRHS: (a, b, c) => (a | b) & (a | c),
      lawType: "3 Variables"
    },
    absorption: {
      name: "Absorption Laws",
      orForm: "A + (A · B) = A",
      andForm: "A + A'B = A + B",
      description: "Absorbs redundant terms to produce optimal minimal circuits.",
      evalLHS: (a, b) => a | ((1 - a) & b),
      evalRHS: (a, b) => a | b,
      lawType: "2 Variables"
    }
  };

  const law = lawsData[selectedLaw];
  const lhsVal = law.evalLHS(testA, testB, testC);
  const rhsVal = law.evalRHS(testA, testB, testC);
  const isMatch = lhsVal === rhsVal;

  return (
    <div className="bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Boolean Postulates &amp; Laws Workbench
            </h3>
            <p className="text-xs text-slate-400">
              Select a law, test with custom binary values (0/1), and observe LHS vs RHS equivalence in real-time.
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Verification:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            isMatch ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400'
          }`}>
            {isMatch ? 'LHS == RHS (Identically Equal)' : 'Mismatch'}
          </span>
        </div>
      </div>

      {/* Law Selection Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(lawsData).map(([k, item]) => (
          <button
            key={k}
            onClick={() => setSelectedLaw(k)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              selectedLaw === k
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Live Law Inspection Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        {/* Variable Inputs */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Test Values:</span>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Variable A:</span>
            <button
              onClick={() => setTestA(testA === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg cursor-pointer ${
                testA === 1 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              A = {testA}
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Variable B:</span>
            <button
              onClick={() => setTestB(testB === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg cursor-pointer ${
                testB === 1 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              B = {testB}
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Variable C:</span>
            <button
              onClick={() => setTestC(testC === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg cursor-pointer ${
                testC === 1 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              C = {testC}
            </button>
          </div>
        </div>

        {/* Dual Equations Card */}
        <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{law.name}</span>
            <span className="text-[10px] text-slate-400 font-mono">{law.lawType}</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800/80">
              <span className="text-slate-400 text-[10px] block uppercase">OR Form (Disjunction):</span>
              <span className="text-white font-bold text-sm">{law.orForm}</span>
            </div>

            <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800/80">
              <span className="text-slate-400 text-[10px] block uppercase">AND Form (Conjunction):</span>
              <span className="text-white font-bold text-sm">{law.andForm}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed italic">
            &quot;{law.description}&quot;
          </p>
        </div>

        {/* Equivalence Output */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">LHS vs RHS Output:</span>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">LHS</span>
              <span className="text-xl font-mono font-bold text-sky-400">{lhsVal}</span>
            </div>
            <span className="text-slate-500 font-bold">=</span>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">RHS</span>
              <span className="text-xl font-mono font-bold text-emerald-400">{rhsVal}</span>
            </div>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10">
            100% Mathematically Valid
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 6
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Boolean Postulates &amp; Laws
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Postulates and Laws of Boolean Logic
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master Huntington&apos;s postulates, identity properties, idempotent laws, complement laws, distributive laws, and absorption rules for rapid algebraic simplification of digital circuits.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Fundamental Postulates vs Algebraic Theorems
              </h2>
              <p className="text-xs text-slate-400">
                The formal axioms established by Huntington (1904) that define the Boolean algebra system.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">Postulate 1 &amp; 2</span>
              <h3 className="text-base font-bold text-white">Closure &amp; Identity</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Operations on binary elements strictly produce binary outputs. <code className="text-sky-300">A + 0 = A</code> and <code className="text-sky-300">A · 1 = A</code> define 0 as the OR identity and 1 as the AND identity.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">Postulate 3 &amp; 4</span>
              <h3 className="text-base font-bold text-white">Commutative &amp; Distributive</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Order of operands does not matter. Uniquely in Boolean logic, <strong>OR distributes over AND</strong>: <code className="text-amber-300">A + BC = (A + B)(A + C)</code>.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Theorem 5 &amp; 6</span>
              <h3 className="text-base font-bold text-white">Absorption &amp; Involution</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-emerald-300">A + AB = A</code> and <code className="text-emerald-300">A + A&apos;B = A + B</code> eliminate redundant terms. Double inversion restores variable: <code className="text-emerald-300">(A&apos;)&apos; = A</code>.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Explorer */}
        <BooleanLawsExplorer />

        {/* 4. Complete Laws Summary Table */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Comprehensive Boolean Laws Master Reference Table
              </h2>
              <p className="text-xs text-slate-400">
                Dual pairs of all major Boolean theorems for quick exam revision.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden font-mono">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="p-3">Law Name</th>
                  <th className="p-3 text-sky-400">OR Form (Dual 1)</th>
                  <th className="p-3 text-emerald-400">AND Form (Dual 2)</th>
                  <th className="p-3">Description / Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Identity Law</td>
                  <td className="p-3 text-sky-300">A + 0 = A</td>
                  <td className="p-3 text-emerald-300">A · 1 = A</td>
                  <td className="p-3 text-slate-400">Preserves original value</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Idempotent Law</td>
                  <td className="p-3 text-sky-300">A + A = A</td>
                  <td className="p-3 text-emerald-300">A · A = A</td>
                  <td className="p-3 text-slate-400">Reduces redundant self-terms</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Null / Boundedness</td>
                  <td className="p-3 text-sky-300">A + 1 = 1</td>
                  <td className="p-3 text-emerald-300">A · 0 = 0</td>
                  <td className="p-3 text-slate-400">Dominant element annihilation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Complement Law</td>
                  <td className="p-3 text-sky-300">A + A&apos; = 1</td>
                  <td className="p-3 text-emerald-300">A · A&apos; = 0</td>
                  <td className="p-3 text-slate-400">Tautology vs Contradiction</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Involution Law</td>
                  <td className="p-3 text-sky-300" colSpan={2}>(A&apos;)&apos; = A</td>
                  <td className="p-3 text-slate-400">Double negation cancels</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Commutative Law</td>
                  <td className="p-3 text-sky-300">A + B = B + A</td>
                  <td className="p-3 text-emerald-300">A · B = B · A</td>
                  <td className="p-3 text-slate-400">Operand order interchangeable</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Distributive Law</td>
                  <td className="p-3 text-sky-300">A + BC = (A+B)(A+C)</td>
                  <td className="p-3 text-emerald-300">A(B + C) = AB + AC</td>
                  <td className="p-3 text-slate-400">OR distributes over AND</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Absorption Laws</td>
                  <td className="p-3 text-sky-300">A + AB = A | A + A&apos;B = A + B</td>
                  <td className="p-3 text-emerald-300">A(A + B) = A | A(A&apos; + B) = AB</td>
                  <td className="p-3 text-slate-400">Essential for circuit minimization</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Python File Loader */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              Boolean Laws Algebraic Simplifier Script
            </h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="boolean_laws_simplifier.py"
            highlightLines={[16, 21, 26, 38, 48, 56]}
          />
        </div>

        {/* 6. Real-World Applications */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Why Boolean Simplification Saves Billions
              </h2>
              <p className="text-xs text-slate-400">
                Impact on VLSI microprocessor design and power consumption.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">EDA Silicon Optimization</span>
              <h3 className="text-base font-bold text-white">Logic Gate Count Reduction</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated Electronic Design Automation (EDA) tools apply absorption and distributive laws to simplify logic networks containing billions of transistors, saving silicon die area and cutting production cost.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Thermal &amp; Battery Life</span>
              <h3 className="text-base font-bold text-white">Propagation Delay &amp; Power Efficiency</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fewer gates in a critical timing path directly reduces propagation delay (speeding up GHz CPU clock speeds) and lowers CMOS dynamic switching energy in mobile devices.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} /> Common Algebra Mistakes
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-rose-300">Overlooking 2nd Distributive Law:</strong> Forgetting that <code className="font-mono text-rose-300">A + BC = (A + B)(A + C)</code>.
              </li>
              <li>
                <strong className="text-rose-300">Confusing A + A with 2A:</strong> In Boolean logic, <code className="font-mono text-rose-300">A + A = A</code> (Idempotent). There are no coefficients!
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} /> Pro Simplification Strategy
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-emerald-300">Factor Common Literals:</strong> Look for opportunities to factor terms: e.g. <code className="font-mono text-emerald-300">AB + AB&apos; = A(B + B&apos;) = A(1) = A</code>.
              </li>
              <li>
                <strong className="text-emerald-300">State Laws in Margin:</strong> When simplifying expressions in CBSE exams, write the name of each applied law next to the step.
              </li>
            </ul>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-slate-300">
            <strong className="text-amber-400 font-semibold">Teacher&apos;s High-Yield Simplification Formula:</strong>
            <p className="mt-1">
              Whenever you see <code className="font-mono text-amber-300">A + A&apos;B</code>, immediately replace it with <code className="font-mono text-amber-300">A + B</code>. This single absorption identity simplifies over 70% of board exam minimization questions!
            </p>
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <FAQTemplate
          title="CBSE Class XI Computer Science (083) – Boolean Postulates & Laws FAQs"
          questions={questions}
        />

        {/* 10. Plain Text Printable Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XI CS 083 – Boolean Postulates & Laws Quick Revision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 6 Plain Text Note"
          downloadFileName="topic6_note.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="Boolean law simplification questions in CBSE Class XI CS 083 require clear step-by-step reasoning. Never jump directly to the final answer. Expand brackets, group common literals, invoke Huntington's postulates, and always state the law used in each step. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
