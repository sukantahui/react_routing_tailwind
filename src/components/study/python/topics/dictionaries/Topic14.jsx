import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic14.jsx
 Checking Key Existence in Dictionaries
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic14 extends Component {
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
            Checking Key Existence
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Before accessing or updating a dictionary,
            professional code always checks whether a key exists.
          </p>

          <p className="text-sm text-slate-400">
            This topic teaches <strong>safe guards</strong> for dictionary access.
          </p>
        </motion.section>

        {/* ================= IN OPERATOR ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 1: Using the <code>in</code> Operator (Recommended)
          </h3>

          <p className="text-sm text-slate-300">
            The <code>in</code> operator checks whether a key exists in the dictionary.
          </p>

          <EditablePythonCodeBlock
            title="Basic Key Existence Check"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14
}

print("name" in student)
print("marks" in student)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Fast (O(1))  
            ✔ Clear intent
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Rule:  
            Use <code>in</code> before accessing critical keys.
          </p>
        </section>

        {/* ================= SAFE ACCESS PATTERN ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Safe Access Pattern Using <code>in</code>
          </h3>

          <EditablePythonCodeBlock
            title="Guarded Access"
            initialCode={`data = {"x": 10}

if "x" in data:
    print(data["x"])
else:
    print("Key not found")`}
          />

          <p className="text-sm text-slate-400">
            ✔ Prevents crashes  
            ✔ Very readable
          </p>
        </section>

        {/* ================= WRONG WAY ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-amber-300">
            ⚠ Wrong Way: Checking Values Instead of Keys
          </h3>

          <EditablePythonCodeBlock
            title="Incorrect Check"
            initialCode={`data = {"x": 10}

# Wrong: checks values, not keys
print(10 in data)`}
          />

          <p className="text-sm text-slate-400">
            ❌ This checks values, not keys  
            ✔ Always remember: <code>in</code> works on keys
          </p>
        </section>

        {/* ================= USING GET ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 2: Using <code>get()</code> as a Check
          </h3>

          <p className="text-sm text-slate-300">
            <code>get()</code> can also be used to check key existence.
          </p>

          <EditablePythonCodeBlock
            title="Checking Using get()"
            initialCode={`data = {"x": 0}

value = data.get("x")

if value is not None:
    print("Key exists")`}
          />

          <p className="text-sm text-amber-300">
            ⚠ Be careful when value itself can be None.
          </p>
        </section>

        {/* ================= BEST PRACTICE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Best Practice Comparison
          </h3>

          <EditablePythonCodeBlock
            title="in vs get()"
            initialCode={`data = {"x": None}

print("x" in data)
print(data.get("x"))`}
          />

          <p className="text-sm text-slate-400">
            ✔ <code>in</code> checks existence  
            ✔ <code>get()</code> retrieves value
          </p>
        </section>

        {/* ================= PERFORMANCE NOTE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Performance Insight (Interview Point)
          </h3>

          <p className="text-sm text-slate-300">
            Dictionary key checks are <strong>constant time</strong> operations.
          </p>

          <p className="text-sm text-slate-400">
            This makes dictionaries ideal for fast lookups.
          </p>

          <p className="text-sm text-emerald-300">
            Interview Line:  
            “Dictionary lookups are O(1) on average.”
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes & Traps
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Checking values instead of keys</li>
            <li>Using get() when value can be None</li>
            <li>Accessing keys without validation</li>
            <li>Confusing existence with truthiness</li>
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
            Topic14 — Key Check Rules Locked In
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Use <code>in</code> to check key existence</li>
            <li><code>in</code> works on keys, not values</li>
            <li>get() retrieves values, not existence</li>
            <li>Dictionary lookups are O(1)</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
