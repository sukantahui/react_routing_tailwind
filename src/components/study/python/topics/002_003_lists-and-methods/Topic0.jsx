// src/components/study/python/lists/Topic0.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic0 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Introduction to Lists & Use Cases
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            A <strong>list</strong> is one of the most powerful and frequently used
            data structures in Python.  
            It allows you to store, access, modify, and process collections of data.
          </p>

          <p className="text-slate-400 text-sm">
            If you understand lists deeply, Python becomes dramatically easier.
          </p>
        </header>

        {/* ================= WHAT IS A LIST ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ What Is a List?
          </h3>

          <p className="text-slate-300 text-sm">
            A list is:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li>Ordered (maintains insertion order)</li>
            <li>Mutable (can be changed after creation)</li>
            <li>Allows duplicate values</li>
            <li>Can store mixed data types</li>
          </ul>

          <EditablePythonCodeBlock
            title="Basic List Example"
            initialCode={`items = [10, 20, 30, "Python", True]
print(items)`}
          />
        </section>

        {/* ================= WHY LISTS EXIST ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Why Do We Need Lists?
          </h3>

          <p className="text-slate-300 text-sm">
            Without lists, we would need separate variables for each value —
            which is inefficient and unmanageable.
          </p>

          <EditablePythonCodeBlock
            title="Without List (Bad Design)"
            initialCode={`a = 90
b = 85
c = 88`}
          />

          <EditablePythonCodeBlock
            title="With List (Correct Design)"
            initialCode={`marks = [90, 85, 88]`}
          />
        </section>

        {/* ================= SVG CONCEPT ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            📦 How a List Stores Data (Conceptual)
          </p>

          <svg viewBox="0 0 520 140" className="w-full h-36">
            {/* Boxes */}
            {["0", "1", "2", "3"].map((i, idx) => (
              <g key={i}>
                <rect
                  x={40 + idx * 110}
                  y={40}
                  width={90}
                  height={50}
                  rx={8}
                  fill="#1e293b"
                />
                <text
                  x={85 + idx * 110}
                  y={70}
                  fill="#e5e7eb"
                  fontSize="14"
                  textAnchor="middle"
                >
                  Index {i}
                </text>
              </g>
            ))}
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Lists store elements sequentially and allow access via index.
          </p>
        </section>

        {/* ================= USE CASES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Common Use Cases of Lists
          </h3>

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Storing marks, scores, prices</li>
            <li>Handling user inputs</li>
            <li>Processing datasets</li>
            <li>Temporary storage during computation</li>
            <li>Queues and stacks</li>
          </ul>

          <EditablePythonCodeBlock
            title="Realistic Example"
            initialCode={`students = ["Ritaja", "Mounita", "Kaustav"]
print(students)`}
          />
        </section>

        {/* ================= LIST VS VARIABLES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Lists vs Multiple Variables
          </h3>

          <EditablePythonCodeBlock
            title="Poor Approach"
            initialCode={`s1 = "Ritaja"
s2 = "Mounita"
s3 = "Kaustav"`}
          />

          <EditablePythonCodeBlock
            title="Professional Approach"
            initialCode={`students = ["Ritaja", "Mounita", "Kaustav"]`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Cleaner  
            ✔ Easier to loop  
            ✔ Easier to modify
          </p>
        </section>

        {/* ================= MUTABLE NATURE ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            ⚠️ Important Property: Lists Are Mutable
          </h3>

          <EditablePythonCodeBlock
            title="Mutability Demonstration"
            initialCode={`nums = [1, 2, 3]
nums[0] = 100
print(nums)`}
          />

          <p className="text-amber-200 text-sm">
            This behavior makes lists powerful — and sometimes dangerous if
            misused.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-indigo-200 text-sm">
            Beginners often misuse lists where tuples or dictionaries are better.
            Always ask:
            <br />
            <strong>
              “Will this data change?”  
              “Does this data need labels?”
            </strong>
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic0 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Lists store ordered collections</li>
            <li>They are mutable and flexible</li>
            <li>Used everywhere in Python programs</li>
            <li>Foundation for advanced data handling</li>
          </ul>
        </footer>

      </div>
    );
  }
}
