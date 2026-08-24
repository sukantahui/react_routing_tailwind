import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic13.jsx
 Copying Dictionaries: Reference vs Shallow Copy
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic13 extends Component {
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
            Copying Dictionaries
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Copying dictionaries looks simple —  
            but misunderstanding it leads to <strong>silent data corruption</strong>.
          </p>

          <p className="text-sm text-slate-400">
            This topic explains one of the most important Python concepts:
            <strong>reference vs copy</strong>.
          </p>
        </motion.section>

        {/* ================= REFERENCE ASSIGNMENT ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Assignment Creates a Reference (Not a Copy)
          </h3>

          <p className="text-sm text-slate-300">
            Using <code>=</code> does <strong>not</strong> copy a dictionary.
          </p>

          <EditablePythonCodeBlock
            title="Reference Assignment Example"
            initialCode={`original = {
  "x": 1,
  "y": 2
}

alias = original
alias["x"] = 99

print(original)
print(alias)`}
          />

          <p className="text-sm text-amber-300">
            ⚠ Both variables point to the same dictionary in memory.
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Rule:  
            Assignment copies the <strong>reference</strong>, not the data.
          </p>
        </section>

        {/* ================= MEMORY MODEL ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Mental Memory Model (Think Like Python)
          </h3>

          <p className="text-sm text-slate-300">
            Visualize one dictionary in memory, with two labels pointing to it.
          </p>

          <EditablePythonCodeBlock
            title="Memory Check Using id()"
            initialCode={`a = {"x": 1}
b = a

print(id(a))
print(id(b))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Same memory address  
            ✔ Same object
          </p>
        </section>

        {/* ================= SHALLOW COPY ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Shallow Copy Using copy()
          </h3>

          <p className="text-sm text-slate-300">
            <code>copy()</code> creates a <strong>new dictionary</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Shallow Copy Example"
            initialCode={`original = {
  "x": 1,
  "y": 2
}

copy_dict = original.copy()
copy_dict["x"] = 99

print(original)
print(copy_dict)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Separate objects  
            ✔ Safe for flat dictionaries
          </p>
        </section>

        {/* ================= VERIFY SHALLOW COPY ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Verifying Copy Using id()
          </h3>

          <EditablePythonCodeBlock
            title="Different Memory Addresses"
            initialCode={`a = {"x": 1}
b = a.copy()

print(id(a))
print(id(b))`}
          />

          <p className="text-sm text-emerald-300">
            ✔ Different IDs → different dictionaries
          </p>
        </section>

        {/* ================= NESTED DICTIONARY TRAP ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-amber-300">
            ⚠ Shallow Copy Trap (Nested Dictionaries)
          </h3>

          <p className="text-sm text-slate-300">
            Shallow copy does NOT copy nested objects.
          </p>

          <EditablePythonCodeBlock
            title="Nested Dictionary Bug"
            initialCode={`original = {
  "marks": {
    "math": 80
  }
}

copy_dict = original.copy()
copy_dict["marks"]["math"] = 99

print(original)
print(copy_dict)`}
          />

          <p className="text-sm text-amber-300">
            ⚠ Nested dictionary is still shared!
          </p>
        </section>

        {/* ================= WHY SHALLOW COPY BEHAVES THIS WAY ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Why Shallow Copy Behaves This Way
          </h3>

          <p className="text-sm text-slate-300">
            Shallow copy duplicates only the <strong>outer container</strong>.
          </p>

          <p className="text-sm text-slate-400">
            Inner objects (like nested dictionaries) are copied by reference.
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Insight:  
            This design keeps copying fast and memory-efficient.
          </p>
        </section>

        {/* ================= SAFE PRACTICES ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Safe Practices (Professional Rules)
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Use assignment only when sharing data is intended</li>
            <li>Use copy() for flat dictionaries</li>
            <li>Be careful with nested structures</li>
            <li>Test using id() when unsure</li>
          </ul>
        </section>

        {/* ================= EXAM & INTERVIEW ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Exam & Interview Focus
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Difference between assignment and copy()</li>
            <li>Meaning of shallow copy</li>
            <li>Why nested data causes issues</li>
            <li>Predict output questions</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-slate-700 p-5 bg-slate-900/60"
        >
          <h4 className="text-emerald-300 font-semibold mb-3">
            Topic13 — Copy Rules Locked In
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>= creates a reference</li>
            <li>copy() creates a new dictionary</li>
            <li>Shallow copy shares nested objects</li>
            <li>Mutation can affect multiple variables</li>
            <li>Understanding this prevents serious bugs</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
