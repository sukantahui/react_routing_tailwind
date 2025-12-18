// src/components/study/python/tuples/Topic19.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic19 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Real-World Use Cases of Tuples
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Tuples are used when data is
            <strong> fixed, meaningful, and should not change</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            Let’s see how professionals actually use tuples.
          </p>
        </header>

        {/* ================= USE CASE 1 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Coordinates (Most Common Use)
          </h3>

          <EditablePythonCodeBlock
            title="Geographical Coordinates"
            initialCode={`# Latitude, Longitude
kolkata = (22.57, 88.36)
delhi = (28.61, 77.20)

print(kolkata)
print(delhi)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Coordinates never change  
            ✔ Perfect example of fixed data
          </p>
        </section>

        {/* ================= SVG ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🌍 Coordinate Representation (Concept)
          </p>

          <svg viewBox="0 0 520 160" className="w-full h-40">
            <rect x="40" y="60" width="200" height="50" rx="10" fill="#064e3b" />
            <text x="140" y="90" fill="#ecfeff" fontSize="13" textAnchor="middle">
              (Latitude, Longitude)
            </text>

            <text x="260" y="90" fill="#94a3b8" fontSize="22">→</text>

            <rect x="300" y="60" width="180" height="50" rx="10" fill="#1e293b" />
            <text x="390" y="90" fill="#e5e7eb" fontSize="13" textAnchor="middle">
              Fixed Location
            </text>
          </svg>
        </section>

        {/* ================= USE CASE 2 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Records / Database-like Rows
          </h3>

          <EditablePythonCodeBlock
            title="Student Record as Tuple"
            initialCode={`# (Roll, Name, Marks)
student = (101, "Ritaja", 92)

print(student[1])
print(student[2])`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Record structure is fixed  
            ✔ Prevents accidental modification
          </p>
        </section>

        {/* ================= USE CASE 3 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Multiple Return Values
          </h3>

          <EditablePythonCodeBlock
            title="Function Returning Multiple Values"
            initialCode={`def calculate(a, b):
    return a + b, a - b, a * b

result = calculate(6, 3)
print(result)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Python packs returned values into a tuple  
            ✔ Clean and readable
          </p>
        </section>

        {/* ================= USE CASE 4 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Dictionary Keys (Composite Keys)
          </h3>

          <EditablePythonCodeBlock
            title="Composite Dictionary Keys"
            initialCode={`attendance = {
    ("Ritaja", "Monday"): "Present",
    ("Mounita", "Monday"): "Absent"
}

print(attendance[("Ritaja", "Monday")])`}
          />
        </section>

        {/* ================= USE CASE 5 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            5️⃣ Configuration & Constants
          </h3>

          <EditablePythonCodeBlock
            title="Fixed Configuration Values"
            initialCode={`RGB_RED = (255, 0, 0)
RGB_GREEN = (0, 255, 0)

print(RGB_RED)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Constants should not change  
            ✔ Tuples enforce safety
          </p>
        </section>

        {/* ================= USE CASE 6 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            6️⃣ Menu Systems & Mappings
          </h3>

          <EditablePythonCodeBlock
            title="Menu Mapping Using Tuples"
            initialCode={`menu = {
    (1, "Start"): "Starting...",
    (2, "Stop"): "Stopping..."
}

print(menu[(1, "Start")])`}
          />
        </section>

        {/* ================= WHY NOT LIST ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            ⚠️ Why NOT Use Lists Here?
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Lists allow accidental changes</li>
            <li>Lists cannot be dictionary keys</li>
            <li>Lists consume more memory</li>
            <li>Lists hide intent</li>
          </ul>
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            📝 Exam & MCQ Focus
          </h3>

          <ul className="list-disc list-inside text-rose-200 text-sm space-y-1">
            <li>Coordinates → tuple</li>
            <li>Fixed records → tuple</li>
            <li>Multiple return values → tuple</li>
            <li>Constants → tuple</li>
          </ul>
        </section>

        {/* ================= INTERVIEW SECRET ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            💡 Interview Secret
          </h3>

          <p className="text-indigo-200 text-sm">
            Tuples communicate <strong>intent</strong>.  
            When an interviewer sees a tuple, they immediately know:
            “This data should not change.”
          </p>
        </section>

        {/* ================= FINAL SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic19 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuples model fixed, meaningful data</li>
            <li>Used in coordinates, records, configs</li>
            <li>Improve safety, clarity, and performance</li>
            <li>Preferred in professional Python code</li>
          </ul>
        </footer>

      </div>
    );
  }
}
