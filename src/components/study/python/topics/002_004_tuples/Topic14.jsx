// src/components/study/python/tuples/Topic14.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic14 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Tuples as Function Return Values
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            In Python, a function can return <strong>more than one value</strong>.
            These values are automatically packed into a <strong>tuple</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            This makes Python functions powerful, clean, and expressive.
          </p>
        </header>

        {/* ================= BASIC RETURN ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Returning Multiple Values
          </h3>

          <EditablePythonCodeBlock
            title="Returning a Tuple from a Function"
            initialCode={`def calculate(a, b):
    return a + b, a - b

result = calculate(10, 5)
print(result)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Python packs the returned values into a tuple  
            ✔ Output is a tuple
          </p>
        </section>

        {/* ================= UNPACKING RETURN ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Unpacking Returned Tuple
          </h3>

          <EditablePythonCodeBlock
            title="Unpacking Function Return Values"
            initialCode={`def calculate(a, b):
    return a + b, a - b

sum_val, diff_val = calculate(10, 5)

print(sum_val)
print(diff_val)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Automatic tuple unpacking  
            ✔ Variables must match returned values
          </p>
        </section>

        {/* ================= SVG ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔁 Function Return Flow (Conceptual)
          </p>

          <svg viewBox="0 0 520 160" className="w-full h-40">
            {/* Function box */}
            <rect x="30" y="60" width="180" height="50" rx="10" fill="#1e293b" />
            <text x="120" y="90" fill="#e5e7eb" fontSize="14" textAnchor="middle">
              return (15, 5)
            </text>

            {/* Arrow */}
            <text x="240" y="90" fill="#a5b4fc" fontSize="22">→</text>

            {/* Variables */}
            <rect x="280" y="50" width="90" height="30" rx="6" fill="#064e3b" />
            <text x="325" y="70" fill="#ecfeff" fontSize="12" textAnchor="middle">
              sum = 15
            </text>

            <rect x="280" y="90" width="90" height="30" rx="6" fill="#064e3b" />
            <text x="325" y="110" fill="#ecfeff" fontSize="12" textAnchor="middle">
              diff = 5
            </text>
          </svg>
        </section>

        {/* ================= SINGLE VALUE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Returning a Single Tuple Explicitly
          </h3>

          <EditablePythonCodeBlock
            title="Explicit Tuple Return"
            initialCode={`def get_point():
    return (10, 20)

point = get_point()
print(point)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Parentheses optional  
            ✔ Returned object is still a tuple
          </p>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Real-World Example: Student Result
          </h3>

          <EditablePythonCodeBlock
            title="Returning Multiple Related Values"
            initialCode={`def student_result():
    name = "Mounita"
    marks = 86
    grade = "A"
    return name, marks, grade

student_name, student_marks, student_grade = student_result()

print(student_name)
print(student_marks)
print(student_grade)`}
          />
        </section>

        {/* ================= ERROR CASE ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Common Errors
          </h3>

          <EditablePythonCodeBlock
            title="Unpacking Mismatch Error"
            initialCode={`def values():
    return 1, 2, 3

# ❌ ValueError
# a, b = values()`}
          />

          <ul className="list-disc list-inside text-rose-200 text-sm space-y-1">
            <li>Too many returned values</li>
            <li>Too few receiving variables</li>
          </ul>
        </section>

        {/* ================= WHY TUPLES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            5️⃣ Why Python Uses Tuples for Returns
          </h3>

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Tuples are lightweight</li>
            <li>Tuples are immutable (safe)</li>
            <li>Logical grouping of related values</li>
            <li>Easy unpacking</li>
          </ul>
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            📝 Exam & Interview Notes
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Multiple return values are tuples</li>
            <li>Unpacking must match count</li>
            <li>Very common output-based questions</li>
            <li>Preferred over global variables</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic14 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Functions can return multiple values</li>
            <li>Returned values are packed into tuples</li>
            <li>Tuple unpacking makes code clean</li>
          </ul>
        </footer>

      </div>
    );
  }
}
