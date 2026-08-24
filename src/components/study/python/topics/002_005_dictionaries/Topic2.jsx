import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic2.jsx
 Creating Dictionaries — All Valid Variations
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic2 extends Component {
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
            Creating Dictionaries — All Valid Ways
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Creating a dictionary looks simple — but Python provides
            <strong> multiple creation styles</strong>, each with its own
            purpose, readability rules, and traps.
          </p>

          <p className="text-sm text-slate-400">
            An expert programmer chooses the right style, not just any style.
          </p>
        </motion.section>

        {/* ================= LITERAL METHOD ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 1: Dictionary Literal (Recommended)
          </h3>

          <p className="text-sm text-slate-300">
            This is the <strong>most common, most readable, and safest</strong>
            way to create a dictionary.
          </p>

          <EditablePythonCodeBlock
            title="Dictionary Literal Syntax"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14,
  "class": 9
}

print(student)
print(type(student))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Clean  
            ✔ Readable  
            ✔ Preferred in production code
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Rule:  
            <strong>If readability matters, always use literals.</strong>
          </p>
        </section>

        {/* ================= EMPTY DICTIONARY ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Creating an Empty Dictionary (Very Common Trap)
          </h3>

          <EditablePythonCodeBlock
            title="Correct vs Wrong Empty Dictionary"
            initialCode={`# Correct
d1 = {}

# Wrong (this creates a set, not a dictionary)
d2 = set()

print(type(d1))
print(type(d2))`}
          />

          <p className="text-sm text-amber-300">
            ⚠ Exam Trap:  
            <code>{}</code> is an empty dictionary  
            <code>set()</code> is an empty set
          </p>
        </section>

        {/* ================= DICT CONSTRUCTOR ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 2: dict() Constructor
          </h3>

          <p className="text-sm text-slate-300">
            Python provides a built-in constructor: <code>dict()</code>
          </p>

          <EditablePythonCodeBlock
            title="Using dict() with Key-Value Pairs"
            initialCode={`student = dict(
  name="Ritaja",
  age=14,
  standard=9
)

print(student)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Cleaner for small dictionaries  
            ❌ Keys must be valid identifiers
          </p>

          <p className="text-sm text-emerald-300">
            Secret:  
            <code>dict()</code> internally converts names into string keys.
          </p>
        </section>

        {/* ================= FROM LIST OF TUPLES ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 3: From List of Tuples (Advanced & Powerful)
          </h3>

          <EditablePythonCodeBlock
            title="Creating Dictionary from Tuples"
            initialCode={`pairs = [
  ("name", "Swadeep"),
  ("age", 15),
  ("class", 10)
]

student = dict(pairs)

print(student)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Extremely useful with database records  
            ✔ Common in real-world data processing
          </p>
        </section>

        {/* ================= FROM ZIP ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 4: Using zip() (Interview Favorite)
          </h3>

          <EditablePythonCodeBlock
            title="Creating Dictionary Using zip()"
            initialCode={`keys = ["name", "age", "class"]
values = ["Mounita", 14, 9]

student = dict(zip(keys, values))

print(student)`}
          />

          <p className="text-sm text-amber-300">
            ⚠ Interview Insight:  
            zip-based dictionary creation is frequently asked.
          </p>
        </section>

        {/* ================= DYNAMIC CREATION ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Dynamic Dictionary Creation (Step-by-Step)
          </h3>

          <EditablePythonCodeBlock
            title="Building Dictionary Dynamically"
            initialCode={`student = {}

student["name"] = "Kaustav"
student["age"] = 16
student["class"] = 11

print(student)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Very common in loops, user input, APIs  
            ✔ Safe and flexible
          </p>
        </section>

        {/* ================= RETURN TYPE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Return Type Guarantee (Important Concept)
          </h3>

          <EditablePythonCodeBlock
            title="Return Type of Dictionary Creation"
            initialCode={`d = dict(a=1, b=2)

print(type(d))
print(isinstance(d, dict))`}
          />

          <p className="text-sm text-emerald-300">
            ✔ Every valid creation method returns a <code>dict</code> object
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
            Topic2 — Creation Rules to Remember
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Use literals for readability</li>
            <li>{`{}`} creates a dictionary, not a set</li>
            <li><code>dict()</code> has identifier limitations</li>
            <li>Tuples & zip are powerful real-world tools</li>
            <li>All methods return a dict object</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
