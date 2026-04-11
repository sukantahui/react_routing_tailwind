// Topic8.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic8_files/topic8_questions';

const Topic8 = () => {
  // Purpose: Teach systematic construction of truth tables for compound logical statements
  // Return: JSX component with methodology, examples, and practice
  // When & why: After basic operator truth tables, students need to combine them for complex expressions

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">
            Construction of Truth Tables for Compound Statements
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Building truth tables step by step for complex logical expressions
          </p>
        </div>

        {/* SVG: Multi-step construction */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] flex justify-center">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
            <svg width="450" height="130" viewBox="0 0 450 130" className="w-full max-w-md">
              <defs>
                <linearGradient id="stepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#3B82F6", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#6366F1", stopOpacity:1}} />
                </linearGradient>
              </defs>
              <rect x="10" y="20" width="100" height="40" rx="6" fill="url(#stepGrad)" opacity="0.8">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="60" y="45" textAnchor="middle" fill="white" fontSize="11">Step 1: Inputs</text>
              <line x1="115" y1="40" x2="145" y2="40" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 4" />
              <rect x="150" y="20" width="100" height="40" rx="6" fill="url(#stepGrad)" opacity="0.8">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="200" y="45" textAnchor="middle" fill="white" fontSize="11">Step 2: Sub-expressions</text>
              <line x1="255" y1="40" x2="285" y2="40" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 4" />
              <rect x="290" y="20" width="100" height="40" rx="6" fill="url(#stepGrad)" opacity="0.8">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="1s" repeatCount="indefinite" />
              </rect>
              <text x="340" y="45" textAnchor="middle" fill="white" fontSize="11">Step 3: Final</text>
              <text x="225" y="90" textAnchor="middle" fill="#9CA3AF" fontSize="11">Systematic construction of truth tables</text>
            </svg>
          </div>
        </div>

        {/* Introduction */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">What is a Compound Statement Truth Table?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            A compound statement combines multiple propositions using logical operators (¬, ∧, ∨, →, ↔).
            Its truth table shows the truth value of the entire expression for <span className="text-yellow-400">every possible combination</span>
            of truth values of its atomic components.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The key is to build the table <span className="text-green-400">systematically</span>: start with atomic variables,
            then compute sub‑expressions step by step, finally arriving at the whole compound statement.
          </p>
        </div>

        {/* Step-by-step method */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Systematic Construction Method</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-300">
            <li><span className="font-semibold text-yellow-400">Identify atomic variables</span> – Count them: n variables → 2ⁿ rows.</li>
            <li><span className="font-semibold text-yellow-400">List all combinations</span> – Use binary pattern (T,T,F,F…).</li>
            <li><span className="font-semibold text-yellow-400">Identify sub-expressions</span> – Break the compound statement into parts.</li>
            <li><span className="font-semibold text-yellow-400">Add columns</span> – One column for each sub-expression, in order of precedence.</li>
            <li><span className="font-semibold text-yellow-400">Fill values</span> – Use basic operator truth tables to compute each column.</li>
            <li><span className="font-semibold text-yellow-400">Final column</span> – Represents the truth value of the whole statement.</li>
          </ol>
        </div>

        {/* Example 1: Basic compound */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Example 1: ~p ∧ q</h2>
          <p className="text-gray-300 text-sm mb-3">Statement: <span className="font-mono text-cyan-400">~p ∧ q</span> (NOT p AND q)</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center text-sm">
              <thead><tr className="border-b border-gray-700"><th className="p-2">p</th><th className="p-2">q</th><th className="p-2 text-pink-400">~p</th><th className="p-2 text-cyan-400">~p ∧ q</th></tr></thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800"><td>T</td><td>T</td><td className="text-red-400">F</td><td className="text-red-400">F</td></tr>
                <tr className="border-b border-gray-800"><td>T</td><td>F</td><td className="text-red-400">F</td><td className="text-red-400">F</td></tr>
                <tr className="border-b border-gray-800"><td>F</td><td>T</td><td className="text-green-400">T</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>F</td><td className="text-green-400">T</td><td className="text-red-400">F</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-xs mt-3">Construction: 2 variables → 4 rows. Compute ~p first, then AND with q.</p>
        </div>

        {/* Example 2: Implication compound */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Example 2: p ∨ (q ∧ r)</h2>
          <p className="text-gray-300 text-sm mb-3">Statement: <span className="font-mono text-cyan-400">p ∨ (q ∧ r)</span> (p OR (q AND r))</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center text-sm">
              <thead><tr className="border-b border-gray-700"><th>p</th><th>q</th><th>r</th><th className="text-cyan-400">q ∧ r</th><th className="text-orange-400">p ∨ (q∧r)</th></tr></thead>
              <tbody className="text-gray-300">
                <tr><td>T</td><td>T</td><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr><td>T</td><td>T</td><td>F</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>T</td><td>F</td><td>T</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>T</td><td>F</td><td>F</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>T</td><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>T</td><td>F</td><td>F</td><td className="text-red-400">F</td></tr>
                <tr><td>F</td><td>F</td><td>T</td><td>F</td><td className="text-red-400">F</td></tr>
                <tr><td>F</td><td>F</td><td>F</td><td>F</td><td className="text-red-400">F</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-xs mt-3">3 variables → 8 rows. Compute inner (q∧r) first, then OR with p.</p>
        </div>

        {/* Example 3: Biconditional with negation */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Example 3: ~(p ⇔ q)</h2>
          <p className="text-gray-300 text-sm mb-3">Statement: <span className="font-mono text-cyan-400">~(p ⇔ q)</span> (NOT (p if and only if q))</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center text-sm">
              <thead><tr className="border-b border-gray-700"><th>p</th><th>q</th><th className="text-emerald-400">p ⇔ q</th><th className="text-pink-400">~(p⇔q)</th></tr></thead>
              <tbody className="text-gray-300">
                <tr><td>T</td><td>T</td><td>T</td><td className="text-red-400">F</td></tr>
                <tr><td>T</td><td>F</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>T</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>F</td><td>T</td><td className="text-red-400">F</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-xs mt-3">This is the exclusive OR (XOR).</p>
        </div>

        {/* Example 4: Complex with parentheses */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Example 4: (p ∧ q) → r</h2>
          <p className="text-gray-300 text-sm mb-3">Statement: <span className="font-mono text-cyan-400">(p ∧ q) → r</span> (If (p and q) then r)</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center text-sm">
              <thead><tr className="border-b border-gray-700"><th>p</th><th>q</th><th>r</th><th className="text-cyan-400">p ∧ q</th><th className="text-indigo-400">(p∧q)→r</th></tr></thead>
              <tbody className="text-gray-300">
                <tr><td>T</td><td>T</td><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr><td>T</td><td>T</td><td>F</td><td>T</td><td className="text-red-400">F</td></tr>
                <tr><td>T</td><td>F</td><td>T</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>T</td><td>F</td><td>F</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>T</td><td>T</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>T</td><td>F</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>F</td><td>T</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>F</td><td>F</td><td>F</td><td className="text-green-400">T</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-xs mt-3">Only false when p and q are true and r is false.</p>
        </div>

        {/* Example 5: Local real-world */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Example 5: Real-World Scenario (Barrackpore)</h2>
          <p className="text-gray-300 text-sm">Let p = "Train is on time", q = "Bus is available", r = "I reach Ichapur by 9 AM".</p>
          <p className="text-gray-300 text-sm mb-3">Statement: <span className="font-mono text-cyan-400">(p ∨ q) → r</span> (If train is on time or bus is available, then I reach by 9 AM).</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center text-sm">
              <thead><tr className="border-b border-gray-700"><th>p</th><th>q</th><th>r</th><th>p∨q</th><th>(p∨q)→r</th></tr></thead>
              <tbody className="text-gray-300">
                <tr><td>T</td><td>T</td><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr><td>T</td><td>T</td><td>F</td><td>T</td><td className="text-red-400">F</td></tr>
                <tr><td>T</td><td>F</td><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr><td>T</td><td>F</td><td>F</td><td>T</td><td className="text-red-400">F</td></tr>
                <tr><td>F</td><td>T</td><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>T</td><td>F</td><td>T</td><td className="text-red-400">F</td></tr>
                <tr><td>F</td><td>F</td><td>T</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>F</td><td>F</td><td>F</td><td className="text-green-400">T</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-xs mt-3">False only when (p∨q) is true but r is false – i.e., transport available but still late.</p>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">💡 Professional Tips & Tricks</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Break it down:</span> Always identify the outermost operator first and work inward.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Use column labels:</span> Label each intermediate column clearly to avoid mistakes.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Order of operations:</span> NOT before AND before OR before → before ↔. Use parentheses to override.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Check for shortcuts:</span> If an expression contains a tautology or contradiction, you can simplify.</span></li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] bg-red-900/20 rounded-2xl p-6 border border-red-500/20">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Incorrect number of rows – always 2ⁿ for n variables.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Forgetting to compute intermediate columns in the right order.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Misapplying implication truth (especially F→F = T).</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Skipping parentheses – (p∧q)→r is different from p∧(q→r).</span></li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] bg-green-900/20 rounded-2xl p-6 border border-green-500/20">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Always start by listing variables and all combinations.</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Use a consistent order for rows (binary ascending).</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Add one column per sub-expression, even if it seems trivial.</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Double-check the final column against the definition of the outermost operator.</span></li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">📋 Student Checklist</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500" /><span className="text-gray-300">I can determine the number of rows needed (2ⁿ).</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500" /><span className="text-gray-300">I can list all truth value combinations systematically.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500" /><span className="text-gray-300">I can break a compound statement into sub-expressions.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500" /><span className="text-gray-300">I can compute truth tables for statements with up to 3 variables.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500" /><span className="text-gray-300">I can verify logical equivalence using truth tables.</span></div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">💭 Think About This...</h2>
          <p className="text-gray-300 italic">"Design a truth table for the statement: 'You can enter the club if (you are over 18 AND have an ID) OR (you are a VIP).' Let p='over 18', q='has ID', r='VIP'. Write (p∧q) ∨ r. Build its truth table. How many rows? When is the statement true?"</p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.4s]">
          <Teacher note="Students often rush and skip intermediate columns. Emphasize that each intermediate column reduces errors. Use the binary pattern for rows: first variable: 4 T,4 F (for 3 vars); second: 2 T,2 F,2 T,2 F; third: alternating. Practice with real-world scenarios from Shyamnagar, Naihati to keep engagement. Truth tables are the foundation for all later logical analysis." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.5s]">
          <FAQTemplate title="Construction of Truth Tables for Compound Statements FAQs" questions={questions} />
        </div>

      </div>
      <style>{`@keyframes fadeSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@media (prefers-reduced-motion:reduce){.animate-\\[fadeSlideUp_.*\\]{animation:none!important}}.dark{color-scheme:dark}`}</style>
    </div>
  );
};

export default Topic8;