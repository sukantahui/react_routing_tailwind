import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic10.jsx
 Nested Dictionaries
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic10 extends Component {
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
            Nested Dictionaries
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            A <strong>nested dictionary</strong> is a dictionary
            that contains <em>another dictionary as a value</em>.
          </p>

          <p className="text-sm text-slate-400">
            This structure is everywhere — APIs, JSON files,
            configuration objects, databases.
          </p>
        </motion.section>

        {/* ================= BASIC NESTING ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Basic Nested Dictionary Structure
          </h3>

          <EditablePythonCodeBlock
            title="Simple Nested Dictionary"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14,
  "marks": {
    "math": 85,
    "science": 90
  }
}

print(student)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Outer dictionary → student  
            ✔ Inner dictionary → marks
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Insight:  
            Think of nesting as <strong>grouping related data</strong>.
          </p>
        </section>

        {/* ================= ACCESSING NESTED VALUES ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Accessing Nested Values (Step by Step)
          </h3>

          <p className="text-sm text-slate-300">
            You must access nested data <strong>layer by layer</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Accessing Nested Keys"
            initialCode={`student = {
  "name": "Ritaja",
  "marks": {
    "math": 85,
    "science": 90
  }
}

print(student["marks"]["math"])
print(student["marks"]["science"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ First key → outer dictionary  
            ✔ Second key → inner dictionary
          </p>
        </section>

        {/* ================= RETURN TYPE CLARITY ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Return Type Clarity (Very Important)
          </h3>

          <EditablePythonCodeBlock
            title="Understanding What Each Access Returns"
            initialCode={`student = {
  "marks": {
    "math": 85
  }
}

inner = student["marks"]
value = student["marks"]["math"]

print(inner, type(inner))
print(value, type(value))`}
          />

          <p className="text-sm text-slate-400">
            ✔ First access returns a dictionary  
            ✔ Second access returns actual value
          </p>
        </section>

        {/* ================= KEYERROR RISK ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            ⚠ KeyError Risk in Nested Dictionaries
          </h3>

          <p className="text-sm text-slate-300">
            Missing any key in the chain causes a crash.
          </p>

          <EditablePythonCodeBlock
            title="Unsafe Nested Access"
            initialCode={`student = {
  "name": "Swadeep"
}

# This will raise KeyError
print(student["marks"]["math"])`}
          />

          <p className="text-sm text-amber-300">
            ⚠ KeyError occurs at the first missing level.
          </p>
        </section>

        {/* ================= SAFE ACCESS PATTERN ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Safe Nested Access Pattern (Professional)
          </h3>

          <EditablePythonCodeBlock
            title="Safe Access Using get()"
            initialCode={`student = {
  "name": "Swadeep"
}

marks = student.get("marks", {})
math_score = marks.get("math", 0)

print(math_score)`}
          />

          <p className="text-sm text-emerald-300">
            ✔ Crash-proof  
            ✔ Used in production systems
          </p>
        </section>

        {/* ================= ITERATING NESTED ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Iterating Over Nested Dictionaries
          </h3>

          <EditablePythonCodeBlock
            title="Nested Iteration Example"
            initialCode={`students = {
  "Ritaja": {"math": 85, "science": 90},
  "Mounita": {"math": 88, "science": 92}
}

for name, subjects in students.items():
    print(name)
    for subject, score in subjects.items():
        print(" ", subject, "=>", score)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Common in reports & dashboards  
            ✔ Structure mirrors real data
          </p>
        </section>

        {/* ================= REAL-WORLD JSON ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Real-World Analogy: JSON Data
          </h3>

          <EditablePythonCodeBlock
            title="JSON-Like Nested Dictionary"
            initialCode={`api_response = {
  "status": "success",
  "data": {
    "user": {
      "id": 101,
      "name": "Kaustav"
    }
  }
}

print(api_response["data"]["user"]["name"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ This is exactly how APIs return data  
            ✔ Nested dictionaries are unavoidable
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes & Exam Traps
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Assuming nested keys always exist</li>
            <li>Accessing deep levels without validation</li>
            <li>Forgetting return types at each level</li>
            <li>Treating nested dictionaries like flat ones</li>
          </ul>
        </section>

        {/* ================= TEACHER SECRET ================= */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-300">
            Teacher Secret: How Professionals Think
          </h3>

          <p className="text-sm text-slate-300">
            ✔ Nested dictionary = structured data  
            ✔ Always validate level by level  
            ✔ Use <code>get()</code> when data source is external
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
            Topic10 — Core Takeaways
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Dictionaries can contain dictionaries</li>
            <li>Access data layer by layer</li>
            <li>Each access has its own return type</li>
            <li>Missing keys cause KeyError</li>
            <li>Safe access uses get() defensively</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
