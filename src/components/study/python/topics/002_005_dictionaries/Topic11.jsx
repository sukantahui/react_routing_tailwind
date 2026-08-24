import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic11.jsx
 Dictionary Comprehension
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic11 extends Component {
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
            Dictionary Comprehension
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Dictionary comprehension allows you to create dictionaries
            in a <strong>compact, expressive, and readable</strong> way.
          </p>

          <p className="text-sm text-slate-400">
            It is not about writing less code —  
            it is about writing <strong>clear intent</strong>.
          </p>
        </motion.section>

        {/* ================= WHY COMPREHENSION ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Why Dictionary Comprehension Exists
          </h3>

          <p className="text-sm text-slate-300">
            Before comprehension, dictionaries were built using loops.
          </p>

          <EditablePythonCodeBlock
            title="Traditional Loop-Based Dictionary Creation"
            initialCode={`squares = {}

for x in range(1, 6):
    squares[x] = x * x

print(squares)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Correct  
            ❌ Verbose for simple transformations
          </p>

          <p className="text-sm text-emerald-300">
            Dictionary comprehension was introduced to make this cleaner.
          </p>
        </section>

        {/* ================= BASIC SYNTAX ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Basic Dictionary Comprehension Syntax
          </h3>

          <p className="text-sm text-slate-300">
            General syntax:
          </p>

          <EditablePythonCodeBlock
            title="General Syntax"
            initialCode={`{ key_expression : value_expression for item in iterable }`}
          />

          <EditablePythonCodeBlock
            title="Same Example Using Comprehension"
            initialCode={`squares = {x: x * x for x in range(1, 6)}
print(squares)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Return type: <code>dict</code>  
            ✔ New dictionary is created
          </p>
        </section>

        {/* ================= STEP BY STEP ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Step-by-Step Mental Model
          </h3>

          <EditablePythonCodeBlock
            title="How Python Thinks"
            initialCode={`# Step 1: iterate
# Step 2: compute key
# Step 3: compute value
# Step 4: store pair

result = {x: x + 10 for x in [1, 2, 3]}
print(result)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Each iteration produces exactly one key-value pair
          </p>
        </section>

        {/* ================= WITH CONDITION ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Dictionary Comprehension with Condition
          </h3>

          <p className="text-sm text-slate-300">
            Conditions allow filtering during creation.
          </p>

          <EditablePythonCodeBlock
            title="Using if Condition"
            initialCode={`even_squares = {x: x * x for x in range(1, 11) if x % 2 == 0}
print(even_squares)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Only even numbers included  
            ✔ Condition filters items
          </p>
        </section>

        {/* ================= FROM EXISTING DICT ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Creating a Dictionary from Another Dictionary
          </h3>

          <EditablePythonCodeBlock
            title="Transforming Existing Dictionary"
            initialCode={`prices = {
  "pen": 10,
  "book": 50,
  "eraser": 5
}

updated_prices = {item: price + 5 for item, price in prices.items()}
print(updated_prices)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Original dictionary unchanged  
            ✔ New dictionary created
          </p>
        </section>

        {/* ================= REAL-WORLD USE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Real-World Example: Normalizing Data
          </h3>

          <EditablePythonCodeBlock
            title="Uppercase Keys Example"
            initialCode={`data = {
  "math": 85,
  "science": 90
}

normalized = {k.upper(): v for k, v in data.items()}
print(normalized)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Used in APIs, configs, analytics
          </p>
        </section>

        {/* ================= READABILITY WARNING ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-amber-300">
            ⚠ Readability Warning (Teacher Advice)
          </h3>

          <EditablePythonCodeBlock
            title="Bad Use of Comprehension"
            initialCode={`# Hard to read (avoid this)
result = {x: (x*x if x % 2 == 0 else x+1) for x in range(10)}
print(result)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Works  
            ❌ Hard to understand
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Rule:  
            If comprehension hurts readability, use a loop.
          </p>
        </section>

        {/* ================= EXAM & INTERVIEW ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Exam & Interview Focus
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Syntax correctness</li>
            <li>Return type is always dict</li>
            <li>Difference between loop & comprehension</li>
            <li>Using items() inside comprehension</li>
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
            Topic11 — Key Takeaways
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Dictionary comprehension creates new dictionaries</li>
            <li>Syntax: key : value for item in iterable</li>
            <li>Conditions filter items</li>
            <li>items() is commonly used</li>
            <li>Readability always comes first</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
