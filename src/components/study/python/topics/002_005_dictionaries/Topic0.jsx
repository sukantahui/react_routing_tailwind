import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic0.jsx
 Dictionaries — Concept, Purpose & Mental Model
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic0 extends Component {
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
            Dictionaries — Thinking Beyond Lists
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Dictionaries represent a <strong>mental upgrade</strong> in programming.
            Instead of remembering positions, we work with <em>meanings</em>.
          </p>

          <p className="text-sm text-slate-400">
            Master this topic once, and JSON, APIs, configs, and databases
            will start making sense automatically.
          </p>
        </motion.section>

        {/* ================= WHY DICTIONARIES EXIST ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Why Were Dictionaries Invented?
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Let’s start with a <strong>bad but common</strong> approach using lists.
          </p>

          <EditablePythonCodeBlock
            title="Using List (Position-Based Thinking)"
            initialCode={`student = ["Ritaja", 14, 9]

print(student[0])  # Name
print(student[1])  # Age
print(student[2])  # Class`}
          />

          <p className="text-sm text-slate-400">
            ❌ You must remember what each index means.  
            This becomes dangerous as programs grow.
          </p>

          <p className="text-sm text-emerald-300">
            Dictionaries eliminate this cognitive load completely.
          </p>
        </section>

        {/* ================= DICTIONARY INTRO ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Dictionary: Meaning-Based Data Structure
          </h3>

          <EditablePythonCodeBlock
            title="Using Dictionary (Meaning-Based Thinking)"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14,
  "class": 9
}

print(student["age"])`}
          />

          <p className="text-sm text-slate-300">
            ✔ You don’t access data by position  
            ✔ You access data by <strong>what it represents</strong>
          </p>

          <p className="text-sm text-slate-400">
            📌 <strong>Teacher Tip:</strong>  
            If you can read your code like English, you are doing it right.
          </p>
        </section>

        {/* ================= SVG CONCEPT ================= */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-sky-300">
            How a Dictionary Works Internally (Visual Thinking)
          </h3>

          <div className="flex justify-center">
            <svg width="520" height="200" viewBox="0 0 520 200">
              <rect x="20" y="70" rx="10" ry="10" width="160" height="60"
                fill="#020617" stroke="#34d399" />
              <text x="100" y="105" textAnchor="middle" fill="#34d399" fontSize="14">
                Key (immutable)
              </text>

              <line x1="180" y1="100" x2="300" y2="100"
                stroke="#94a3b8" strokeWidth="2" />
              <polygon points="300,100 290,95 290,105" fill="#94a3b8" />

              <rect x="300" y="70" rx="10" ry="10" width="200" height="60"
                fill="#020617" stroke="#60a5fa" />
              <text x="400" y="105" textAnchor="middle" fill="#60a5fa" fontSize="14">
                Value (any type)
              </text>
            </svg>
          </div>

          <p className="text-sm text-slate-400 text-center">
            Python hashes the key and jumps directly to the value (O(1)).
          </p>
        </section>

        {/* ================= MULTI-TYPE VALUES ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Dictionaries Can Store Any Type of Value
          </h3>

          <EditablePythonCodeBlock
            title="Mixed Value Types"
            initialCode={`profile = {
  "username": "swadeep",
  "active": True,
  "score": 87.5,
  "subjects": ["Math", "Science"]
}

print(profile["subjects"])`}
          />

          <p className="text-sm text-slate-300">
            ✔ Values can be numbers, strings, lists, or even other dictionaries.
          </p>
        </section>

        {/* ================= IMMUTABLE KEYS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Secret Rule: Why Keys Must Be Immutable
          </h3>

          <EditablePythonCodeBlock
            title="Valid and Invalid Dictionary Keys"
            initialCode={`# Valid keys
d1 = {
  "roll": 10,
  42: "answer",
  (1, 2): "tuple key"
}

# Invalid keys (will cause error)
# d2 = {
#   [1, 2, 3]: "list key",
# }`}
          />

          <p className="text-sm text-slate-400">
            🔐 Keys are hashed internally.  
            Mutable objects can change → hashes break → dictionary fails.
          </p>
        </section>

        {/* ================= EXAM TRAPS ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Exam & Interview Traps
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Dictionaries do NOT support index access</li>
            <li>Duplicate keys overwrite earlier values</li>
            <li>Order should never be your logic tool</li>
            <li>Missing keys raise errors (handled later)</li>
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
            Mental Model to Carry Forward
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Dictionaries map meaning → value</li>
            <li>Keys describe data</li>
            <li>Values store data</li>
            <li>Fastest lookup structure in Python</li>
            <li>Foundation of real-world software</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
