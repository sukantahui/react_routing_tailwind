import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic9.jsx
 Iterating Dictionaries
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic9 extends Component {
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
            Iterating Dictionaries
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Iteration means <strong>visiting each element one by one</strong>.  
            With dictionaries, iteration is about <em>meaning</em>, not position.
          </p>

          <p className="text-sm text-slate-400">
            In this topic, we learn how Python expects you to loop over dictionaries.
          </p>
        </motion.section>

        {/* ================= DEFAULT ITERATION ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Default Dictionary Iteration (Important!)
          </h3>

          <p className="text-sm text-slate-300">
            When you iterate directly over a dictionary, Python iterates over its <strong>keys</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Direct Dictionary Iteration"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14,
  "class": 9
}

for key in student:
    print(key)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Default iteration = keys  
            ⚠ Many beginners misunderstand this
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Rule:  
            <strong>for x in dict</strong> always means keys.
          </p>
        </section>

        {/* ================= ITERATING KEYS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Iterating Using keys()
          </h3>

          <p className="text-sm text-slate-300">
            Using <code>keys()</code> makes your intention explicit.
          </p>

          <EditablePythonCodeBlock
            title="Iterating Keys Explicitly"
            initialCode={`data = {
  "pen": 10,
  "book": 50,
  "eraser": 5
}

for key in data.keys():
    print(key)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Clear intent  
            ✔ Same result as direct iteration
          </p>
        </section>

        {/* ================= ITERATING VALUES ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Iterating Using values()
          </h3>

          <p className="text-sm text-slate-300">
            Use <code>values()</code> when keys do not matter.
          </p>

          <EditablePythonCodeBlock
            title="Iterating Values"
            initialCode={`prices = {
  "pen": 10,
  "book": 50,
  "eraser": 5
}

for price in prices.values():
    print(price)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Useful for totals, averages, comparisons  
            ⚠ Values may repeat
          </p>
        </section>

        {/* ================= ITERATING ITEMS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Iterating Using items() (Most Powerful)
          </h3>

          <p className="text-sm text-slate-300">
            <code>items()</code> gives access to both key and value together.
          </p>

          <EditablePythonCodeBlock
            title="Iterating Key-Value Pairs"
            initialCode={`student = {
  "name": "Mounita",
  "age": 14,
  "class": 9
}

for key, value in student.items():
    print(key, "=>", value)`}
          />

          <p className="text-sm text-emerald-300">
            Teacher Secret:  
            <code>items()</code> is used in 90% of real-world logic.
          </p>
        </section>

        {/* ================= RETURN TYPES ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            What Exactly Is Iterated? (Return Type Insight)
          </h3>

          <EditablePythonCodeBlock
            title="Understanding What items() Yields"
            initialCode={`data = {"x": 1, "y": 2}

for pair in data.items():
    print(pair, type(pair))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Each element is a tuple: <code>(key, value)</code>
          </p>
        </section>

        {/* ================= COMMON USE PATTERNS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Common Iteration Patterns
          </h3>

          <EditablePythonCodeBlock
            title="Conditional Logic During Iteration"
            initialCode={`marks = {
  "math": 85,
  "science": 72,
  "english": 90
}

for subject, score in marks.items():
    if score >= 80:
        print(subject, "Excellent")`}
          />

          <p className="text-sm text-slate-400">
            ✔ Filtering  
            ✔ Decision-making  
            ✔ Reporting
          </p>
        </section>

        {/* ================= MODIFYING DURING ITERATION ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            ⚠ Modifying Dictionary During Iteration (Danger Zone)
          </h3>

          <EditablePythonCodeBlock
            title="Unsafe Pattern (Do NOT Do This)"
            initialCode={`data = {"a": 1, "b": 2}

# This can cause runtime issues
for k in data:
    data[k] = data[k] + 1

print(data)`}
          />

          <p className="text-sm text-amber-300">
            ⚠ Modifying structure while iterating is risky.
          </p>

          <p className="text-sm text-slate-400">
            Safe approaches will be discussed later.
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes & Exam Traps
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Assuming dictionary iteration gives values</li>
            <li>Using indexes like lists</li>
            <li>Ignoring items() for logic</li>
            <li>Mutating dictionary structure during iteration</li>
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
            Topic9 — Iteration Rules Locked In
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Direct iteration gives keys</li>
            <li>values() gives values only</li>
            <li>items() gives structured pairs</li>
            <li>items() is preferred for logic</li>
            <li>Never treat dictionaries like lists</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
