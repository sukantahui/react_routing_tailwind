import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic12.jsx
 Merging Dictionaries
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic12 extends Component {
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
            Merging Dictionaries
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Merging dictionaries means <strong>combining key-value pairs</strong>
            from multiple dictionaries into one.
          </p>

          <p className="text-sm text-slate-400">
            This is extremely common when working with configurations,
            API responses, defaults, and user overrides.
          </p>
        </motion.section>

        {/* ================= BASIC IDEA ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            The Core Rule of Merging (Very Important)
          </h3>

          <p className="text-sm text-slate-300">
            When two dictionaries contain the <strong>same key</strong>,
            the value from the <strong>later dictionary wins</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Duplicate Key Overwrite Rule"
            initialCode={`a = {"x": 1, "y": 2}
b = {"y": 99, "z": 3}

# Conceptual result
# y will be overwritten
print(a, b)`}
          />

          <p className="text-sm text-amber-300">
            ⚠ This overwrite happens silently.
          </p>
        </section>

        {/* ================= MERGE USING | ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 1: Merge Using <code>|</code> Operator (Recommended)
          </h3>

          <p className="text-sm text-slate-300">
            The <code>|</code> operator creates a <strong>new dictionary</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Merging with | Operator"
            initialCode={`a = {"x": 1, "y": 2}
b = {"y": 99, "z": 3}

c = a | b

print(c)
print(a)
print(b)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Original dictionaries unchanged  
            ✔ Clean and readable
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Tip:  
            Use <code>|</code> when you want a safe, non-destructive merge.
          </p>
        </section>

        {/* ================= MERGE USING UPDATE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 2: Merge Using <code>update()</code> (Destructive)
          </h3>

          <p className="text-sm text-slate-300">
            <code>update()</code> modifies the dictionary <strong>in place</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Merging with update()"
            initialCode={`a = {"x": 1, "y": 2}
b = {"y": 99, "z": 3}

a.update(b)

print(a)
print(b)`}
          />

          <p className="text-sm text-amber-300">
            ⚠ Original dictionary <code>a</code> is permanently changed.
          </p>
        </section>

        {/* ================= RETURN VALUE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Return Value of update() (Exam Favorite)
          </h3>

          <EditablePythonCodeBlock
            title="update() Return Value"
            initialCode={`a = {"x": 1}
result = a.update({"y": 2})

print(result)
print(a)`}
          />

          <p className="text-sm text-slate-400">
            ✔ <code>update()</code> returns <code>None</code>  
            ✔ Changes happen via mutation
          </p>
        </section>

        {/* ================= MULTIPLE MERGE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Merging Multiple Dictionaries
          </h3>

          <EditablePythonCodeBlock
            title="Chained Merge Using |"
            initialCode={`base = {"theme": "light"}
user = {"theme": "dark"}
runtime = {"debug": True}

final_config = base | user | runtime

print(final_config)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Rightmost dictionary has highest priority  
            ✔ Common config pattern
          </p>
        </section>

        {/* ================= REAL-WORLD USE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Real-World Use Case: Configuration Override
          </h3>

          <EditablePythonCodeBlock
            title="Config Merge Pattern"
            initialCode={`default_config = {
  "timeout": 30,
  "theme": "light"
}

user_config = {
  "theme": "dark"
}

final = default_config | user_config
print(final)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Defaults + user overrides  
            ✔ Extremely common in applications
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes & Traps
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Assuming update() returns a dictionary</li>
            <li>Forgetting update() mutates original data</li>
            <li>Overwriting important keys unintentionally</li>
            <li>Merging without checking key conflicts</li>
          </ul>
        </section>

        {/* ================= TEACHER SECRET ================= */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-300">
            Teacher Secret: How Professionals Decide
          </h3>

          <p className="text-sm text-slate-300">
            ✔ Use <code>|</code> for safety and clarity  
            ✔ Use <code>update()</code> when mutation is intended  
            ✔ Always assume duplicate keys will overwrite
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
            Topic12 — Merge Rules Locked In
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Duplicate keys overwrite silently</li>
            <li>| creates a new dictionary</li>
            <li>update() mutates existing dictionary</li>
            <li>update() returns None</li>
            <li>Rightmost data has highest priority</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
