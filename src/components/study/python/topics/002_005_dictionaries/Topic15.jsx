import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic15.jsx
 Dictionary vs List — When to Use What
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic15 extends Component {
  render() {
    return (
      <div className="space-y-16 text-slate-200">

        {/* ================= HEADER ================= */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-emerald-300">
            Dictionary vs List
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Lists and dictionaries are both containers, but they solve
            <strong> very different problems</strong>.
          </p>

          <p className="text-sm text-slate-400">
            Choosing the wrong one leads to confusing, fragile code.
          </p>
        </motion.section>

        {/* ================= CORE IDEA ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Core Concept Difference
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li><strong>List</strong> → collection of values accessed by position</li>
            <li><strong>Dictionary</strong> → collection of values accessed by meaning (keys)</li>
          </ul>

          <p className="text-sm text-emerald-300">
            Teacher Insight:  
            Lists care about <strong>order</strong>, dictionaries care about <strong>identity</strong>.
          </p>
        </section>

        {/* ================= LIST EXAMPLE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            List Example — Position-Based Data
          </h3>

          <EditablePythonCodeBlock
            title="Using a List"
            initialCode={`student = ["Ritaja", 14, 9]

print(student[0])  # name
print(student[1])  # age
print(student[2])  # class`}
          />

          <p className="text-sm text-slate-400">
            ✔ Works  
            ❌ Meaning depends on position  
            ❌ Hard to read and maintain
          </p>
        </section>

        {/* ================= DICTIONARY EXAMPLE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Dictionary Example — Meaning-Based Data
          </h3>

          <EditablePythonCodeBlock
            title="Using a Dictionary"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14,
  "class": 9
}

print(student["name"])
print(student["age"])
print(student["class"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ Self-explanatory  
            ✔ Order-independent  
            ✔ Easier to extend
          </p>
        </section>

        {/* ================= COMPARISON TABLE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Side-by-Side Thinking (Conceptual)
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Need index-based access → List</li>
            <li>Need descriptive access → Dictionary</li>
            <li>Same type of items → List</li>
            <li>Different attributes → Dictionary</li>
          </ul>
        </section>

        {/* ================= REAL-WORLD SCENARIOS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Real-World Scenarios
          </h3>

          <EditablePythonCodeBlock
            title="Marks List vs Marks Dictionary"
            initialCode={`# List (bad choice)
marks_list = [85, 90, 88]

# Dictionary (good choice)
marks_dict = {
  "math": 85,
  "science": 90,
  "english": 88
}

print(marks_dict["science"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ Subjects have names → dictionary fits naturally
          </p>
        </section>

        {/* ================= PERFORMANCE NOTE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Performance Perspective (Simple & Honest)
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>List search → O(n)</li>
            <li>Dictionary lookup → O(1)</li>
          </ul>

          <p className="text-sm text-emerald-300">
            Interview Line:  
            “Dictionaries are faster for lookups by key.”
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Using list where keys are meaningful</li>
            <li>Using dictionary where order matters</li>
            <li>Mixing unrelated values in lists</li>
            <li>Overusing indexes instead of names</li>
          </ul>
        </section>

        {/* ================= TEACHER SECRET ================= */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-300">
            Teacher Secret: One-Line Decision Rule
          </h3>

          <p className="text-sm text-slate-300">
            👉 If you find yourself writing comments like <em># index 0 = name</em>  
            👉 You should be using a dictionary.
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-slate-700 p-5 bg-slate-900/60"
        >
          <h4 className="text-emerald-300 font-semibold mb-3">
            Topic15 — Design Rules Locked In
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Lists are position-based</li>
            <li>Dictionaries are meaning-based</li>
            <li>Choose clarity over convenience</li>
            <li>Good data design simplifies logic</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
