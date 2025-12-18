import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic4.jsx
 Handling Missing Keys in Dictionaries
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-16 text-slate-200">

        {/* ================= HEADER ================= */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-emerald-300">
            Handling Missing Keys Safely
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Accessing dictionary values blindly leads to crashes.  
            Professional code always has a <strong>fallback strategy</strong>.
          </p>

          <p className="text-sm text-slate-400">
            This topic introduces Python’s safest and most elegant solution:
            <code className="ml-1">get()</code>.
          </p>
        </motion.section>

        {/* ================= PROBLEM RECAP ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            The Problem: KeyError Recap
          </h3>

          <EditablePythonCodeBlock
            title="Unsafe Access Recap"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14
}

# Unsafe access
print(student["marks"])`}
          />

          <p className="text-sm text-amber-300">
            ⚠ Program crashes if the key does not exist.
          </p>
        </section>

        {/* ================= INTRO TO GET ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            The Solution: dict.get()
          </h3>

          <p className="text-sm text-slate-300">
            <code>get()</code> searches for a key and returns a value
            <strong>without raising an error</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Basic get() Usage"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14
}

print(student.get("name"))
print(student.get("marks"))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Existing key → returns value  
            ✔ Missing key → returns <code>None</code>
          </p>
        </section>

        {/* ================= RETURN TYPE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Return Type Behavior of get()
          </h3>

          <EditablePythonCodeBlock
            title="Understanding Return Types"
            initialCode={`data = {
  "count": 10
}

value1 = data.get("count")
value2 = data.get("price")

print(value1, type(value1))
print(value2, type(value2))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Existing key → original data type  
            ✔ Missing key → <code>NoneType</code>
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Insight:  
            <code>None</code> is Python’s way of saying “no value”.
          </p>
        </section>

        {/* ================= DEFAULT VALUE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Using Default Values with get()
          </h3>

          <p className="text-sm text-slate-300">
            You can provide a fallback value if the key is missing.
          </p>

          <EditablePythonCodeBlock
            title="get() with Default Value"
            initialCode={`student = {
  "name": "Swadeep",
  "age": 15
}

print(student.get("marks", 0))
print(student.get("city", "Unknown"))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Prevents <code>None</code>  
            ✔ Makes intent explicit
          </p>
        </section>

        {/* ================= REAL-WORLD PATTERN ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Real-World Pattern: Configuration Reading
          </h3>

          <EditablePythonCodeBlock
            title="Configuration Dictionary Example"
            initialCode={`config = {
  "theme": "dark",
  "timeout": 30
}

timeout = config.get("timeout", 60)
language = config.get("language", "en")

print(timeout)
print(language)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Default values ensure app stability  
            ✔ Used heavily in production systems
          </p>
        </section>

        {/* ================= GET VS [] ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            get() vs [] — Professional Comparison
          </h3>

          <EditablePythonCodeBlock
            title="Comparison Demonstration"
            initialCode={`data = {"x": 10}

# Safe
print(data.get("y", 0))

# Unsafe (commented to prevent crash)
# print(data["y"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ <code>get()</code> = safe & flexible  
            ❌ <code>[]</code> = strict & crash-prone
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Assuming <code>get()</code> raises KeyError (it doesn’t)</li>
            <li>Forgetting default values and handling <code>None</code></li>
            <li>Using <code>[]</code> in user-input driven code</li>
            <li>Confusing missing key with key having value <code>None</code></li>
          </ul>
        </section>

        {/* ================= TEACHER SECRET ================= */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-300">
            Teacher Secret: How Professionals Decide
          </h3>

          <p className="text-sm text-slate-300">
            ✔ Use <code>[]</code> when key MUST exist  
            ✔ Use <code>get()</code> when key MAY exist  
            ✔ Use default values for safe fallbacks
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
            Topic4 — Safety Rules Locked In
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li><code>get()</code> never raises KeyError</li>
            <li>Missing keys return <code>None</code></li>
            <li>Default values prevent surprises</li>
            <li>Professional code favors safety</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
