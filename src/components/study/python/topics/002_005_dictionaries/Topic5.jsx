import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic5.jsx
 Adding & Updating Dictionary Key-Value Pairs
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic5 extends Component {
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
            Adding & Updating Key-Value Pairs
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Dictionaries are <strong>mutable</strong>.  
            This means their content can change after creation.
          </p>

          <p className="text-sm text-slate-400">
            Understanding mutation prevents silent logic bugs in real projects.
          </p>
        </motion.section>

        {/* ================= ADD NEW PAIR ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Adding a New Key-Value Pair
          </h3>

          <EditablePythonCodeBlock
            title="Adding a New Entry"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14
}

student["class"] = 9

print(student)`}
          />

          <p className="text-sm text-slate-400">
            ✔ New key added  
            ✔ Dictionary modified in place
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Rule:  
            Assignment always mutates the dictionary.
          </p>
        </section>

        {/* ================= UPDATE EXISTING ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Updating an Existing Key
          </h3>

          <EditablePythonCodeBlock
            title="Updating an Existing Value"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14
}

student["age"] = 15

print(student)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Same syntax  
            ✔ Old value replaced silently
          </p>

          <p className="text-sm text-amber-300">
            ⚠ No error is raised for overwriting values.
          </p>
        </section>

        {/* ================= ADD VS UPDATE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Add vs Update — Same Syntax, Different Meaning
          </h3>

          <EditablePythonCodeBlock
            title="Add vs Update Comparison"
            initialCode={`data = {"x": 10}

data["y"] = 20   # add
data["x"] = 99   # update

print(data)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Python does NOT differentiate  
            ✔ Programmer must know the intent
          </p>
        </section>

        {/* ================= RETURN VALUE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Return Value of Assignment (Important!)
          </h3>

          <EditablePythonCodeBlock
            title="Assignment Returns Nothing"
            initialCode={`data = {}

result = data.__setitem__("a", 1)

print(result)
print(data)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Assignment returns <code>None</code>  
            ✔ Mutation happens in place
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Insight:  
            Dictionary mutation is about side effects, not return values.
          </p>
        </section>

        {/* ================= DYNAMIC UPDATE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Dynamic Updates (Real-World Pattern)
          </h3>

          <EditablePythonCodeBlock
            title="Updating Dictionary in a Loop"
            initialCode={`scores = {}

names = ["Ritaja", "Swadeep", "Mounita"]

for name in names:
    scores[name] = len(name) * 10

print(scores)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Common in data processing  
            ✔ Used in counters, mappings, aggregations
          </p>
        </section>

        {/* ================= OVERWRITE DANGER ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Silent Overwrite — The Hidden Danger
          </h3>

          <EditablePythonCodeBlock
            title="Silent Overwrite Example"
            initialCode={`config = {
  "timeout": 30
}

config["timeout"] = 10  # accidental overwrite

print(config)`}
          />

          <p className="text-sm text-amber-300">
            ⚠ Python will NOT warn you.
          </p>

          <p className="text-sm text-slate-400">
            Always be careful when updating existing keys.
          </p>
        </section>

        {/* ================= SAFE UPDATE PATTERN ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Safe Update Pattern (Professional Habit)
          </h3>

          <EditablePythonCodeBlock
            title="Checking Before Updating"
            initialCode={`config = {"timeout": 30}

if "timeout" in config:
    config["timeout"] = 60

print(config)`}
          />

          <p className="text-sm text-emerald-300">
            ✔ Defensive coding  
            ✔ Prevents unintended mutation
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
            Topic5 — Mutation Rules to Remember
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Dictionaries are mutable</li>
            <li>Same syntax adds or updates</li>
            <li>Updates overwrite silently</li>
            <li>Assignment returns nothing</li>
            <li>Professional code checks intent</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
