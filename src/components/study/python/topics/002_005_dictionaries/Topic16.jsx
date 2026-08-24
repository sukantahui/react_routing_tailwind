import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic16.jsx
 Real-World Dictionary Use Cases
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic16 extends Component {
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
            Real-World Dictionary Use Cases
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Dictionaries are not academic structures —  
            they are the <strong>backbone of real software systems</strong>.
          </p>

          <p className="text-sm text-slate-400">
            In this topic, we apply everything you’ve learned so far.
          </p>
        </motion.section>

        {/* ================= CONFIGURATION ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Use Case 1: Application Configuration
          </h3>

          <p className="text-sm text-slate-300">
            Most applications store configuration using dictionaries.
          </p>

          <EditablePythonCodeBlock
            title="Configuration Dictionary"
            initialCode={`config = {
  "theme": "dark",
  "timeout": 30,
  "language": "en"
}

print(config["theme"])
print(config.get("timeout", 60))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Clear meaning  
            ✔ Easy overrides  
            ✔ Safe defaults
          </p>
        </section>

        {/* ================= COUNTER PATTERN ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Use Case 2: Counter Pattern (Very Common)
          </h3>

          <p className="text-sm text-slate-300">
            Counting occurrences is one of the most frequent dictionary uses.
          </p>

          <EditablePythonCodeBlock
            title="Counting Words"
            initialCode={`words = ["a", "b", "a", "c", "b", "a"]

counter = {}

for word in words:
    counter[word] = counter.get(word, 0) + 1

print(counter)`}
          />

          <p className="text-sm text-emerald-300">
            Teacher Insight:  
            This pattern appears everywhere — analytics, logs, exams.
          </p>
        </section>

        {/* ================= MAPPING ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Use Case 3: Mapping One Value to Another
          </h3>

          <p className="text-sm text-slate-300">
            Dictionaries are perfect for translating or mapping values.
          </p>

          <EditablePythonCodeBlock
            title="Grade Mapping Example"
            initialCode={`grades = {
  "A": "Excellent",
  "B": "Good",
  "C": "Average",
  "D": "Poor"
}

print(grades["A"])
print(grades.get("E", "Invalid Grade"))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Clean logic  
            ✔ No long if-else chains
          </p>
        </section>

        {/* ================= STUDENT DATABASE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Use Case 4: Mini In-Memory Database
          </h3>

          <EditablePythonCodeBlock
            title="Student Record System"
            initialCode={`students = {
  101: {"name": "Ritaja", "class": 9},
  102: {"name": "Mounita", "class": 10}
}

print(students[101]["name"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ Fast lookup by ID  
            ✔ Nested dictionaries naturally fit
          </p>
        </section>

        {/* ================= API STYLE DATA ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Use Case 5: API / JSON-Style Data
          </h3>

          <EditablePythonCodeBlock
            title="API-Like Response"
            initialCode={`response = {
  "status": "success",
  "data": {
    "user": {
      "id": 5,
      "name": "Kaustav"
    }
  }
}

print(response["data"]["user"]["name"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ Exactly how real APIs work  
            ✔ Nested access becomes essential
          </p>
        </section>

        {/* ================= DESIGN THINKING ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Design Thinking: Why Dictionary Fits Here
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Keys represent meaning</li>
            <li>Lookups are fast</li>
            <li>Data is self-describing</li>
            <li>Easy to extend without breaking code</li>
          </ul>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Real-World Mistakes
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Using lists where keys are meaningful</li>
            <li>Hard-coding logic instead of mapping</li>
            <li>Not using get() for external data</li>
            <li>Overcomplicating with nested if-else</li>
          </ul>
        </section>

        {/* ================= TEACHER SECRET ================= */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-300">
            Teacher Secret: Professional Rule
          </h3>

          <p className="text-sm text-slate-300">
            👉 If data has a <strong>name, label, or identity</strong>  
            👉 It almost always belongs in a dictionary.
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
            Topic16 — Final Takeaways
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Dictionaries model real-world data naturally</li>
            <li>Configs, counters, mappings are everywhere</li>
            <li>Nested dictionaries mirror JSON & APIs</li>
            <li>Good dictionary design simplifies programs</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
