// src/components/study/python/tuples/Topic2.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic2 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-amber-300 tracking-wide">
            Single-Element Tuples & the Trailing Comma
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Creating a tuple with <strong>only one element</strong> looks simple,
            but it is one of the <strong>most common Python mistakes</strong>
            made by students and even experienced developers.
          </p>

          <p className="text-slate-400 text-sm">
            This topic explains <strong>why the trailing comma exists</strong>
            and how Python interprets such expressions.
          </p>
        </header>

        {/* ================= CORE IDEA ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ The Core Rule
          </h3>

          <p className="text-slate-300 text-sm">
            A tuple is created by a <strong>comma</strong>, not by parentheses.
          </p>

          <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-3">
            <p className="text-emerald-300 text-sm font-semibold">
              Golden Rule
            </p>
            <p className="text-emerald-200 text-xs">
              👉 No comma → No tuple  
              <br />
              👉 One element → Comma is mandatory
            </p>
          </div>
        </section>

        {/* ================= WRONG WAY ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-rose-300">
            2️⃣ The Wrong Way (Very Common Mistake)
          </h3>

          <EditablePythonCodeBlock
            title="Looks Like a Tuple, But Is NOT"
            initialCode={`a = (5)
print(a)
print(type(a))`}
          />

          <p className="text-slate-300 text-sm">
            This is <strong>not</strong> a tuple.  
            Python treats it as a normal integer inside parentheses.
          </p>
        </section>

        {/* ================= RIGHT WAY ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ The Correct Way (Trailing Comma)
          </h3>

          <EditablePythonCodeBlock
            title="Single-Element Tuple"
            initialCode={`b = (5,)
print(b)
print(type(b))`}
          />

          <p className="text-slate-300 text-sm">
            The trailing comma tells Python:
            <strong>“This is a tuple, not just an expression.”</strong>
          </p>
        </section>

        {/* ================= SVG EXPLANATION ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🔍 How Python Interprets It (Conceptual)
          </p>

          <svg viewBox="0 0 600 110" className="w-full h-28">
            {/* Left: Wrong */}
            <rect x="20" y="20" width="250" height="40" rx="8" fill="#7f1d1d" />
            <text x="145" y="45" fill="#fecaca" fontSize="14" textAnchor="middle">
              (5) → int
            </text>

            {/* Arrow */}
            <text x="300" y="45" fill="#94a3b8" fontSize="20">→</text>

            {/* Right: Correct */}
            <rect x="330" y="20" width="250" height="40" rx="8" fill="#14532d" />
            <text x="455" y="45" fill="#bbf7d0" fontSize="14" textAnchor="middle">
              (5,) → tuple
            </text>

            <text x="145" y="80" fill="#fecaca" fontSize="11" textAnchor="middle">
              No comma → expression
            </text>
            <text x="455" y="80" fill="#bbf7d0" fontSize="11" textAnchor="middle">
              Comma → tuple creation
            </text>
          </svg>
        </section>

        {/* ================= MORE EXAMPLES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ More Valid Examples
          </h3>

          <EditablePythonCodeBlock
            title="Different Single-Element Tuples"
            initialCode={`t1 = ("hello",)
t2 = (True,)
t3 = (3.14,)

print(type(t1), t1)
print(type(t2), t2)
print(type(t3), t3)`}
          />

          <p className="text-slate-300 text-sm">
            The rule is the same regardless of data type.
          </p>
        </section>

        {/* ================= WHY PYTHON DESIGNED THIS ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-indigo-300">
            5️⃣ Why Python Uses This Design
          </h3>

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
            <li>Parentheses are also used for expressions</li>
            <li>Comma removes ambiguity</li>
            <li>Allows clean multi-line tuples</li>
            <li>Keeps tuple syntax consistent</li>
          </ul>

          <div className="bg-indigo-900/20 border border-indigo-700 rounded-lg p-3">
            <p className="text-indigo-300 text-sm font-semibold">
              Teacher Insight
            </p>
            <p className="text-indigo-200 text-xs">
              This rule enables Python’s powerful packing and unpacking features.
            </p>
          </div>
        </section>

        {/* ================= EXAM & INTERVIEW ALERT ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Exam & Interview Alert
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>“What is the type of (5)?” → <strong>int</strong></li>
            <li>“What is the type of (5,)?” → <strong>tuple</strong></li>
            <li>Trailing comma questions are very common</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic2 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Single-element tuples need a trailing comma</li>
            <li>Parentheses alone do not create tuples</li>
            <li>Comma is the true tuple operator</li>
            <li>This is a frequent exam trap</li>
          </ul>
        </footer>

      </div>
    );
  }
}
