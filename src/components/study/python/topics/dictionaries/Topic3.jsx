import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic3.jsx
 Accessing Dictionary Values Using Keys
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic3 extends Component {
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
            Accessing Values Using Keys
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Creating dictionaries is easy.  
            <strong>Accessing them safely</strong> is what separates beginners
            from professionals.
          </p>

          <p className="text-sm text-slate-400">
            In this topic, we will understand what really happens when Python
            looks for a key.
          </p>
        </motion.section>

        {/* ================= BASIC ACCESS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Basic Access Using Square Brackets <code>[]</code>
          </h3>

          <EditablePythonCodeBlock
            title="Accessing Existing Keys"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14,
  "class": 9
}

print(student["name"])
print(student["age"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ Fast  
            ✔ Direct  
            ✔ Returns the actual value (no wrapper)
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Rule:  
            Use <code>[]</code> only when you are 100% sure the key exists.
          </p>
        </section>

        {/* ================= RETURN TYPE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Return Type of Dictionary Access
          </h3>

          <EditablePythonCodeBlock
            title="Return Type Demonstration"
            initialCode={`data = {
  "count": 10,
  "price": 99.5,
  "active": True
}

value = data["price"]

print(value)
print(type(value))`}
          />

          <p className="text-sm text-slate-400">
            ✔ The returned value keeps its original data type  
            ✔ Python does NOT convert or wrap it
          </p>

          <p className="text-sm text-emerald-300">
            Secret Insight:  
            Dictionaries are transparent — no hidden transformations.
          </p>
        </section>

        {/* ================= KEYERROR ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            The KeyError — Why Programs Crash
          </h3>

          <EditablePythonCodeBlock
            title="Accessing a Missing Key (Danger Zone)"
            initialCode={`student = {
  "name": "Swadeep",
  "age": 15
}

# This key does NOT exist
print(student["marks"])`}
          />

          <p className="text-sm text-amber-300">
            ⚠ This raises a <strong>KeyError</strong>.
          </p>

          <p className="text-sm text-slate-400">
            Python does NOT guess.  
            If the key is missing, execution stops immediately.
          </p>
        </section>

        {/* ================= WHY KEYERROR EXISTS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Why Python Raises KeyError (Important Concept)
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Python dictionaries are built for <strong>speed</strong>.  
            They jump directly to a memory location using the key’s hash.
          </p>

          <p className="text-sm text-slate-400">
            If the key is not found, Python raises an error instead of returning
            fake or misleading data.
          </p>

          <p className="text-sm text-emerald-300">
            🔐 No key → No value → No compromise
          </p>
        </section>

        {/* ================= SAFE CHECK USING IN ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Safe Access Pattern Using <code>in</code>
          </h3>

          <EditablePythonCodeBlock
            title="Checking Key Existence Before Access"
            initialCode={`student = {
  "name": "Kaustav",
  "age": 16
}

if "age" in student:
    print(student["age"])
else:
    print("Age not found")`}
          />

          <p className="text-sm text-slate-400">
            ✔ Prevents crashes  
            ✔ Very readable  
            ✔ Frequently used in real-world code
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Tip:  
            This pattern shows defensive programming.
          </p>
        </section>

        {/* ================= NESTED ACCESS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Accessing Values in Nested Dictionaries
          </h3>

          <EditablePythonCodeBlock
            title="Nested Dictionary Access"
            initialCode={`profile = {
  "name": "Mounita",
  "address": {
    "city": "Kolkata",
    "pin": 700120
  }
}

print(profile["address"]["city"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ Access layer by layer  
            ⚠ Any missing key in the chain causes KeyError
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes & Traps
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Using index numbers instead of keys</li>
            <li>Assuming missing keys return <code>None</code> (they don’t)</li>
            <li>Accessing nested keys without validation</li>
            <li>Confusing dictionary access with list access</li>
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
            Topic3 — Core Takeaways
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li><code>[]</code> access is fast but unsafe for unknown keys</li>
            <li>Missing keys raise KeyError</li>
            <li>Returned value keeps its original type</li>
            <li>Use <code>in</code> to check existence</li>
            <li>Nested access requires extra care</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
