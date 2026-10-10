import React, { useState } from 'react';
import {
  Calculator, Layers, BookOpen, Code, CheckCircle2,
  AlertTriangle, HelpCircle, ShieldCheck, FileText,
  Activity, ArrowRight, Sparkles, Check, Play, Table
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/multivariable_truth_table_generator.py?raw";

// Interactive Multi-Variable Truth Table Generator Component
const TruthTableWorkbench = () => {
  const [selectedPreset, setSelectedPreset] = useState('preset1');

  const presets = {
    preset1: {
      name: "F = A'B + AC' (3-Variable Contingency)",
      vars: ['A', 'B', 'C'],
      evalFn: (a, b, c) => {
        const na = 1 - a;
        const nc = 1 - c;
        const t1 = na & b;
        const t2 = a & nc;
        const y = t1 | t2;
        return {
          steps: { "A'": na, "C'": nc, "A'B": t1, "AC'": t2 },
          out: y
        };
      }
    },
    preset2: {
      name: "F = (A + B)' · (A' + B') [De Morgan's Product]",
      vars: ['A', 'B'],
      evalFn: (a, b) => {
        const nor = 1 - (a | b);
        const na = 1 - a;
        const nb = 1 - b;
        const or_comp = na | nb;
        const y = nor & or_comp;
        return {
          steps: { "A+B": a | b, "(A+B)'": nor, "A'": na, "B'": nb, "A'+B'": or_comp },
          out: y
        };
      }
    },
    preset3: {
      name: "F = (A + A') · (B + B') [Tautology Verification]",
      vars: ['A', 'B'],
      evalFn: (a, b) => {
        const t1 = a | (1 - a);
        const t2 = b | (1 - b);
        const y = t1 & t2;
        return {
          steps: { "A+A'": t1, "B+B'": t2 },
          out: y
        };
      }
    },
    preset4: {
      name: "F = A ⊕ B ⊕ C (3-Variable Odd Parity Generator)",
      vars: ['A', 'B', 'C'],
      evalFn: (a, b, c) => {
        const x1 = a ^ b;
        const y = x1 ^ c;
        return {
          steps: { "A⊕B": x1, "1s Count": a + b + c },
          out: y
        };
      }
    }
  };

  const current = presets[selectedPreset];

  // Generate table rows based on current preset variable count
  const generateRows = () => {
    const varCount = current.vars.length;
    const totalCombinations = 1 << varCount;
    const rows = [];

    for (let i = 0; i < totalCombinations; i++) {
      let inputs = [];
      for (let j = varCount - 1; j >= 0; j--) {
        inputs.push((i >> j) & 1);
      }
      const evalRes = current.evalFn(...inputs);
      rows.push({
        index: i,
        inputs: inputs,
        steps: evalRes.steps,
        output: evalRes.out
      });
    }
    return rows;
  };

  const tableRows = generateRows();
  const allOnes = tableRows.every(r => r.output === 1);
  const allZeros = tableRows.every(r => r.output === 0);
  const classification = allOnes ? "Tautology" : allZeros ? "Fallacy / Contradiction" : "Contingency";

  return (
    <div className="bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Table size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Multi-Variable Truth Table Generator
            </h3>
            <p className="text-xs text-slate-400">
              Select a complex expression to automatically generate full step-by-step intermediate truth table columns.
            </p>
          </div>
        </div>

        {/* Classification Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Classification:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            classification === 'Tautology'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : classification === 'Fallacy / Contradiction'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
          }`}>
            {classification}
          </span>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(presets).map(([k, p]) => (
          <button
            key={k}
            onClick={() => setSelectedPreset(k)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              selectedPreset === k
                ? 'bg-sky-500 text-white border-sky-400 shadow-md font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Generated Table View */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/90 shadow-inner">
        <table className="w-full text-left text-xs font-mono text-slate-300 divide-y divide-slate-800">
          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="p-3 text-center">Row</th>
              {current.vars.map(v => (
                <th key={v} className="p-3 text-center text-sky-400">{v}</th>
              ))}
              {tableRows.length > 0 && Object.keys(tableRows[0].steps).map(st => (
                <th key={st} className="p-3 text-center text-amber-400/90">{st}</th>
              ))}
              <th className="p-3 text-center text-emerald-400 font-bold bg-slate-950/80">Final Y</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {tableRows.map((r) => (
              <tr key={r.index} className="hover:bg-slate-800/40 transition">
                <td className="p-2.5 text-center text-slate-500 font-sans text-[11px]">m{r.index}</td>
                {r.inputs.map((val, idx) => (
                  <td key={idx} className={`p-2.5 text-center font-bold ${val === 1 ? 'text-sky-400' : 'text-slate-500'}`}>
                    {val}
                  </td>
                ))}
                {Object.values(r.steps).map((sVal, sIdx) => (
                  <td key={sIdx} className={`p-2.5 text-center ${sVal === 1 ? 'text-amber-300' : 'text-slate-500'}`}>
                    {sVal}
                  </td>
                ))}
                <td className={`p-2.5 text-center font-bold text-sm bg-slate-950/50 ${r.output === 1 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {r.output}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Topic5() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Truth Table Construction
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Truth Table Construction for Multi-Variable Boolean Expressions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the systematic construction of 2-variable, 3-variable, and 4-variable truth tables. Learn the $2^n$ row rule, intermediate column decomposition, and the Method of Perfect Induction to prove Boolean theorems.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Systematic Truth Table Construction Methodology
              </h2>
              <p className="text-xs text-slate-400">
                How binary counting, state space trees ($2^n$), and sub-term breakdowns ensure error-free evaluations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">Step 1</span>
              <h3 className="text-base font-bold text-white">The 2^n Row Rule</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always determine total rows before writing: 2 variables = 4 rows, 3 variables = 8 rows, 4 variables = 16 rows. Write input combinations in strict binary counting sequence (000, 001, 010...).
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">Step 2</span>
              <h3 className="text-base font-bold text-white">Decompose Sub-Terms</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Create dedicated columns for every inverted literal ($A&apos;, B&apos;$) and every product/sum term ($A&apos;B, B&apos;C$) before combining into the final expression column.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Step 3</span>
              <h3 className="text-base font-bold text-white">Classify Output Column</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Examine final output: All 1s &rarr; <strong>Tautology</strong>; All 0s &rarr; <strong>Fallacy / Contradiction</strong>; Mixed 1s &amp; 0s &rarr; <strong>Contingency</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Truth Table Workbench */}
        <TruthTableWorkbench />

        {/* 4. Deep Technical Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Method of Perfect Induction (Proving Theorems)
              </h2>
              <p className="text-xs text-slate-400">
                Rigorous mathematical proof technique required in CBSE Class XI examinations.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Example Proof: Prove Distributive Law A + (B · C) = (A + B) · (A + C) by Perfect Induction
            </h3>
            <p className="text-xs text-slate-300">
              Construct truth tables for LHS and RHS across all 8 rows for 3 variables (A, B, C):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-slate-300 bg-slate-950 rounded-xl border border-slate-800">
                <thead className="text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">A</th>
                    <th className="p-2.5">B</th>
                    <th className="p-2.5">C</th>
                    <th className="p-2.5 text-amber-400">B·C</th>
                    <th className="p-2.5 text-sky-400 font-bold">LHS: A + (B·C)</th>
                    <th className="p-2.5 text-amber-400">A+B</th>
                    <th className="p-2.5 text-amber-400">A+C</th>
                    <th className="p-2.5 text-emerald-400 font-bold">RHS: (A+B)·(A+C)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr><td className="p-2">0</td><td className="p-2">0</td><td className="p-2">0</td><td className="p-2">0</td><td className="p-2 text-sky-400 font-bold">0</td><td className="p-2">0</td><td className="p-2">0</td><td className="p-2 text-emerald-400 font-bold">0</td></tr>
                  <tr><td className="p-2">0</td><td className="p-2">0</td><td className="p-2">1</td><td className="p-2">0</td><td className="p-2 text-sky-400 font-bold">0</td><td className="p-2">0</td><td className="p-2">1</td><td className="p-2 text-emerald-400 font-bold">0</td></tr>
                  <tr><td className="p-2">0</td><td className="p-2">1</td><td className="p-2">0</td><td className="p-2">0</td><td className="p-2 text-sky-400 font-bold">0</td><td className="p-2">1</td><td className="p-2">0</td><td className="p-2 text-emerald-400 font-bold">0</td></tr>
                  <tr><td className="p-2">0</td><td className="p-2">1</td><td className="p-2">1</td><td className="p-2">1</td><td className="p-2 text-sky-400 font-bold">1</td><td className="p-2">1</td><td className="p-2">1</td><td className="p-2 text-emerald-400 font-bold">1</td></tr>
                  <tr><td className="p-2">1</td><td className="p-2">0</td><td className="p-2">0</td><td className="p-2">0</td><td className="p-2 text-sky-400 font-bold">1</td><td className="p-2">1</td><td className="p-2">1</td><td className="p-2 text-emerald-400 font-bold">1</td></tr>
                  <tr><td className="p-2">1</td><td className="p-2">0</td><td className="p-2">1</td><td className="p-2">0</td><td className="p-2 text-sky-400 font-bold">1</td><td className="p-2">1</td><td className="p-2">1</td><td className="p-2 text-emerald-400 font-bold">1</td></tr>
                  <tr><td className="p-2">1</td><td className="p-2">1</td><td className="p-2">0</td><td className="p-2">0</td><td className="p-2 text-sky-400 font-bold">1</td><td className="p-2">1</td><td className="p-2">1</td><td className="p-2 text-emerald-400 font-bold">1</td></tr>
                  <tr><td className="p-2">1</td><td className="p-2">1</td><td className="p-2">1</td><td className="p-2">1</td><td className="p-2 text-sky-400 font-bold">1</td><td className="p-2">1</td><td className="p-2">1</td><td className="p-2 text-emerald-400 font-bold">1</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-emerald-400 font-semibold pt-1">
              Conclusion: Because the column for LHS is identical to the column for RHS for all 8 combinations, the theorem is proved by the Method of Perfect Induction.
            </p>
          </div>
        </div>

        {/* 5. Python File Loader */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              Automated Multi-Variable Truth Table Script
            </h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="multivariable_truth_table_generator.py"
            highlightLines={[22, 28, 30, 48, 54]}
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
                Engineering Applications of Truth Table Synthesis
              </h2>
              <p className="text-xs text-slate-400">
                How truth tables define specification requirements in automated hardware design.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Hardware Engineering</span>
              <h3 className="text-base font-bold text-white">VHDL / Verilog Synthesis Specification</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Before designing a microchip, hardware engineers draft complete truth tables defining the exact output for every binary instruction opcode and control flag state.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Safety Critical Systems</span>
              <h3 className="text-base font-bold text-white">Railway Interlocking Signal Verification</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Railway signal control software undergoes formal verification via truth tables to mathematically guarantee that train routing signals never permit conflicting simultaneous green lights (guaranteeing Fallacy for hazardous collisions).
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} /> Common Pitfalls
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-rose-300">Skipping Binary Sequence:</strong> Writing random combinations like 011 before 010 leads to duplicate or omitted rows.
              </li>
              <li>
                <strong className="text-rose-300">Combining Terms in One Step:</strong> Trying to calculate <code className="font-mono text-rose-300">A&apos;B + BC&apos; + AC</code> mentally without sub-columns results in calculation errors.
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} /> Examination Best Practices
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-emerald-300">Double Check Row Count:</strong> For 3 variables, count 8 rows. For 4 variables, count 16 rows.
              </li>
              <li>
                <strong className="text-emerald-300">Conclude Induction Proofs:</strong> Always write the final statement: &quot;Since column LHS matches column RHS row-by-row, the identity is proved.&quot;
              </li>
            </ul>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-slate-300">
            <strong className="text-amber-400 font-semibold">Teacher&apos;s Quick Advice:</strong>
            <p className="mt-1">
              For a 3-variable table, use the pattern: Column A has 4 zeros then 4 ones; Column B has 2 zeros, 2 ones (repeated); Column C alternates 0, 1 (repeated 8 times). This guarantees 100% correct ordering every single time.
            </p>
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <FAQTemplate
          title="CBSE Class XI Computer Science (083) – Truth Table Construction FAQs"
          questions={questions}
        />

        {/* 10. Plain Text Printable Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XI CS 083 – Multi-Variable Truth Tables Quick Revision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Plain Text Note"
          downloadFileName="topic5_note.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="In CBSE Class XI CS 083 exams, truth table questions carry straightforward full marks if structured cleanly. Always draw neat ruling lines with pencil, write the minterm row labels (m0 to m7), and clearly separate intermediate sub-term columns. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
