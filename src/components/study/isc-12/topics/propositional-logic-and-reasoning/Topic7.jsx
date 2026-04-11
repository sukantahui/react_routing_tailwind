// Topic7.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic7_files/topic7_questions';

const Topic7 = () => {
  // Purpose: Present truth tables for the five basic logical operators
  // Return: JSX component with truth tables, examples, construction method
  // When & why: After learning individual operators, students need systematic truth table analysis

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
            Truth Tables for Basic Logical Operators
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Systematic way to display truth values of logical expressions for all possible inputs
          </p>
        </div>

        {/* SVG: Truth table construction animation */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] flex justify-center">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
            <svg width="420" height="150" viewBox="0 0 420 150" className="w-full max-w-md">
              <defs>
                <linearGradient id="ttGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#F97316", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#EF4444", stopOpacity:1}} />
                </linearGradient>
              </defs>
              
              <rect x="20" y="20" width="380" height="110" rx="8" fill="none" stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="400" dur="4s" repeatCount="indefinite" />
              </rect>
              <text x="210" y="45" textAnchor="middle" fill="#F97316" fontSize="12">Truth Table Structure</text>
              <line x1="20" y1="60" x2="400" y2="60" stroke="#374151" strokeWidth="1" />
              <text x="80" y="80" textAnchor="middle" fill="#9CA3AF" fontSize="11">p</text>
              <text x="160" y="80" textAnchor="middle" fill="#9CA3AF" fontSize="11">q</text>
              <text x="260" y="80" textAnchor="middle" fill="#9CA3AF" fontSize="11">p ∧ q</text>
              <line x1="20" y1="90" x2="400" y2="90" stroke="#374151" strokeWidth="1" />
              <text x="80" y="108" textAnchor="middle" fill="#10B981" fontSize="11">T</text>
              <text x="160" y="108" textAnchor="middle" fill="#10B981" fontSize="11">T</text>
              <text x="260" y="108" textAnchor="middle" fill="#10B981" fontSize="11">T</text>
            </svg>
          </div>
        </div>

        {/* What is a truth table? */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">What is a Truth Table?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            A <span className="text-yellow-400">truth table</span> is a mathematical table that lists all possible truth values
            of logical variables and the resulting truth value of a compound proposition.
          </p>
          <p className="text-gray-300 leading-relaxed">
            For <span className="text-cyan-400">n variables</span>, there are <span className="text-green-400">2ⁿ rows</span> (each row represents a unique combination of truth values).
            Truth tables help us <span className="text-purple-400">define operators, test equivalences, and analyze logical arguments</span>.
          </p>
        </div>

        {/* Truth table for NOT (~) */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-pink-400 mb-4">1. Truth Table for NOT (~)</h2>
          <div className="flex justify-center">
            <table className="w-48 text-center border-collapse">
              <thead><tr className="border-b border-gray-700"><th className="p-2 text-cyan-400">p</th><th className="p-2 text-pink-400">~p</th></tr></thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800"><td className="p-2">T</td><td className="text-red-400">F</td></tr>
                <tr><td className="p-2">F</td><td className="text-green-400">T</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 text-sm mt-3 text-center">The simplest operator: flips truth value. Only 2 rows because only one variable.</p>
          <div className="mt-3 p-2 bg-gray-700/30 rounded text-sm">
            <p className="text-gray-300">📌 Example: p = "Swadeep is present". ~p = "Swadeep is absent". If p is true, ~p is false.</p>
          </div>
        </div>

        {/* Truth table for AND (∧) */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">2. Truth Table for AND (∧)</h2>
          <div className="flex justify-center">
            <table className="w-64 text-center border-collapse">
              <thead><tr className="border-b border-gray-700"><th className="p-2">p</th><th className="p-2">q</th><th className="p-2 text-cyan-400">p ∧ q</th></tr></thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800"><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr className="border-b border-gray-800"><td>T</td><td>F</td><td className="text-red-400">F</td></tr>
                <tr className="border-b border-gray-800"><td>F</td><td>T</td><td className="text-red-400">F</td></tr>
                <tr><td>F</td><td>F</td><td className="text-red-400">F</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 text-sm mt-3 text-center">True only when <span className="text-green-400">both</span> p and q are true. 4 rows = 2².</p>
          <div className="mt-3 p-2 bg-gray-700/30 rounded text-sm">
            <p className="text-gray-300">📌 Example: p="Abhronila studies", q="Susmita practices". p∧q true only if both study AND practice.</p>
          </div>
        </div>

        {/* Truth table for OR (∨) */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">3. Truth Table for OR (∨)</h2>
          <div className="flex justify-center">
            <table className="w-64 text-center border-collapse">
              <thead><tr className="border-b border-gray-700"><th>p</th><th>q</th><th className="text-orange-400">p ∨ q</th></tr></thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800"><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr className="border-b border-gray-800"><td>T</td><td>F</td><td className="text-green-400">T</td></tr>
                <tr className="border-b border-gray-800"><td>F</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>F</td><td className="text-red-400">F</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 text-sm mt-3 text-center">True when <span className="text-green-400">at least one</span> of p or q is true. False only when both false.</p>
          <div className="mt-3 p-2 bg-gray-700/30 rounded text-sm">
            <p className="text-gray-300">📌 Example: p="Train is late", q="Bus is cancelled". p∨q true if either is true.</p>
          </div>
        </div>

        {/* Truth table for Implication (⇒) */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">4. Truth Table for Implication (⇒)</h2>
          <div className="flex justify-center">
            <table className="w-64 text-center border-collapse">
              <thead><tr className="border-b border-gray-700"><th>p</th><th>q</th><th className="text-indigo-400">p ⇒ q</th></tr></thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800"><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr className="border-b border-gray-800"><td>T</td><td>F</td><td className="text-red-400">F</td></tr>
                <tr className="border-b border-gray-800"><td>F</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr><td>F</td><td>F</td><td className="text-green-400">T</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 text-sm mt-3 text-center">False <span className="text-red-400">only when p true and q false</span>. Otherwise true (vacuous truth).</p>
          <div className="mt-3 p-2 bg-gray-700/30 rounded text-sm">
            <p className="text-gray-300">📌 Example: p="Debangshu studies", q="Debangshu passes". Only false if studies but fails.</p>
          </div>
        </div>

        {/* Truth table for Biconditional (⇔) */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">5. Truth Table for Biconditional (⇔)</h2>
          <div className="flex justify-center">
            <table className="w-64 text-center border-collapse">
              <thead><tr className="border-b border-gray-700"><th>p</th><th>q</th><th className="text-emerald-400">p ⇔ q</th></tr></thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800"><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                <tr className="border-b border-gray-800"><td>T</td><td>F</td><td className="text-red-400">F</td></tr>
                <tr className="border-b border-gray-800"><td>F</td><td>T</td><td className="text-red-400">F</td></tr>
                <tr><td>F</td><td>F</td><td className="text-green-400">T</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 text-sm mt-3 text-center">True when <span className="text-green-400">p and q agree</span> (both true or both false).</p>
          <div className="mt-3 p-2 bg-gray-700/30 rounded text-sm">
            <p className="text-gray-300">📌 Example: p="It is a leap year", q="February has 29 days". p⇔q true if both true or both false.</p>
          </div>
        </div>

        {/* Summary Table */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] bg-gray-800/50 rounded-2xl p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">Quick Reference: All 5 Operators</h2>
          <table className="w-full text-center text-sm">
            <thead><tr className="border-b border-gray-700"><th className="p-2">p</th><th className="p-2">q</th><th className="text-pink-400">~p</th><th className="text-cyan-400">p∧q</th><th className="text-orange-400">p∨q</th><th className="text-indigo-400">p⇒q</th><th className="text-emerald-400">p⇔q</th></tr></thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800"><td>T</td><td>T</td><td className="text-red-400">F</td><td className="text-green-400">T</td><td className="text-green-400">T</td><td className="text-green-400">T</td><td className="text-green-400">T</td></tr>
              <tr className="border-b border-gray-800"><td>T</td><td>F</td><td className="text-red-400">F</td><td className="text-red-400">F</td><td className="text-green-400">T</td><td className="text-red-400">F</td><td className="text-red-400">F</td></tr>
              <tr className="border-b border-gray-800"><td>F</td><td>T</td><td className="text-green-400">T</td><td className="text-red-400">F</td><td className="text-green-400">T</td><td className="text-green-400">T</td><td className="text-red-400">F</td></tr>
              <tr><td>F</td><td>F</td><td className="text-green-400">T</td><td className="text-red-400">F</td><td className="text-red-400">F</td><td className="text-green-400">T</td><td className="text-green-400">T</td></tr>
            </tbody>
          </table>
        </div>

        {/* How to construct a truth table */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">How to Construct a Truth Table (Step by Step)</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li><span className="font-semibold text-yellow-400">Count variables</span> – if n variables, need 2ⁿ rows.</li>
            <li><span className="font-semibold text-yellow-400">List all combinations</span> – start with all T for first variable, then half T half F, etc.</li>
            <li><span className="font-semibold text-yellow-400">Add columns for subexpressions</span> – evaluate step by step (e.g., ~p, then p∧q, then final).</li>
            <li><span className="font-semibold text-yellow-400">Fill truth values</span> using operator definitions.</li>
            <li><span className="font-semibold text-yellow-400">Verify</span> – double-check each row against operator rules.</li>
          </ol>
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-gray-300 text-sm font-mono">Example: Build truth table for ~(p ∧ q)</p>
            <p className="text-gray-400 text-xs">Step1: 2 variables → 4 rows. Step2: p=T,T,F,F; q=T,F,T,F. Step3: p∧q = T,F,F,F. Step4: ~(p∧q) = F,T,T,T.</p>
          </div>
        </div>

        {/* Real-World Application */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">Real‑World Applications of Truth Tables</h2>
          <ul className="space-y-2">
            <li className="flex gap-2"><span className="text-green-400">✓</span><span className="text-gray-300"><span className="font-semibold">Digital Circuit Design:</span> Engineers use truth tables to design logic gates and verify circuit behavior.</span></li>
            <li className="flex gap-2"><span className="text-green-400">✓</span><span className="text-gray-300"><span className="font-semibold">Software Testing:</span> Test all combinations of boolean conditions (e.g., login states).</span></li>
            <li className="flex gap-2"><span className="text-green-400">✓</span><span className="text-gray-300"><span className="font-semibold">Logical Reasoning:</span> Detect tautologies, contradictions, and logical equivalences.</span></li>
            <li className="flex gap-2"><span className="text-green-400">✓</span><span className="text-gray-300"><span className="font-semibold">Database Query Optimization:</span> Analyze WHERE clause conditions.</span></li>
          </ul>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">💡 Professional Tips & Tricks</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Binary counting:</span> Generate combinations by counting in binary: 00,01,10,11 for 2 vars.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Order matters:</span> Keep variables in same order across all rows (e.g., p then q).</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Use intermediate columns:</span> Break complex expressions into parts.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Check for symmetry:</span> Some operators have patterns that can speed up filling.</span></li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s] bg-red-900/20 rounded-2xl p-6 border border-red-500/20">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Incorrect number of rows: For n variables, must have exactly 2ⁿ rows.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Missing some combinations – ensure all T/F assignments are covered.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Wrong operator precedence – use parentheses to avoid ambiguity.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Confusing implication truth values (especially F→F = T).</span></li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s] bg-green-900/20 rounded-2xl p-6 border border-green-500/20">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Always label columns clearly (p, q, subexpression, result).</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Use consistent ordering of rows (e.g., binary ascending).</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">For 3+ variables, use systematic pattern: first variable: 4 T, 4 F; second: 2 T,2 F,2 T,2 F; etc.</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Verify equivalences by comparing final columns.</span></li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.4s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">📋 Student Checklist</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-orange-500" /><span className="text-gray-300">I can write truth tables for ~, ∧, ∨, ⇒, ⇔.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-orange-500" /><span className="text-gray-300">I know that n variables need 2ⁿ rows.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-orange-500" /><span className="text-gray-300">I can construct truth tables for compound expressions step by step.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-orange-500" /><span className="text-gray-300">I can use truth tables to test logical equivalence.</span></div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.5s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">💭 Think About This...</h2>
          <p className="text-gray-300 italic">"In Barrackpore, a traffic light has sensors: p='car waiting', q='pedestrian button pressed'. The light turns green if (p ∧ ~q) ∨ (~p ∧ q). Build a truth table to see when the light turns green. This is exactly how digital logic works!"</p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.6s]">
          <Teacher note="Students often struggle with generating all combinations systematically. Teach the binary counting method. Emphasize that truth tables are exhaustive – every possible scenario is considered. Use real-world examples like 'If it's raining AND I have an umbrella, I stay dry' to make tables meaningful. Practice with 2 variables first, then 3." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.7s]">
          <FAQTemplate title="Truth Tables for Basic Operators FAQs" questions={questions} />
        </div>

      </div>
      <style>{`@keyframes fadeSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@media (prefers-reduced-motion:reduce){.animate-\\[fadeSlideUp_.*\\]{animation:none!important}}.dark{color-scheme:dark}`}</style>
    </div>
  );
};

export default Topic7;