import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic1.jsx
 Dictionary Structure — Keys & Values
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic1 extends Component {
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
            Dictionary Structure — Keys & Values
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Every dictionary entry is a <strong>pair</strong>:
            a <em>key</em> that describes the data and a <em>value</em> that stores it.
          </p>

          <p className="text-sm text-slate-400">
            If you misunderstand keys and values, dictionaries will always feel “unstable”.
            Let’s remove that confusion permanently.
          </p>
        </motion.section>

        {/* ================= WHAT IS A KEY ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            What Is a Key?
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            A <strong>key</strong> is an identifier.
            It answers the question: <em>“What does this value represent?”</em>
          </p>

          <EditablePythonCodeBlock
            title="Basic Key → Value Relationship"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14
}

print(student["name"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ <code>"name"</code> is the key  
            ✔ <code>"Ritaja"</code> is the value
          </p>

          <p className="text-sm text-emerald-300">
            🔑 Teacher Rule:  
            If a word makes sense as a question, it is a good key.
          </p>
        </section>

        {/* ================= VALID KEY TYPES ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Valid Key Types (Very Important)
          </h3>

          <p className="text-sm text-slate-300">
            Keys must be <strong>immutable</strong>.
            That means their value cannot change after creation.
          </p>

          <EditablePythonCodeBlock
            title="Valid Dictionary Keys"
            initialCode={`data = {
  "roll": 10,        # string key
  42: "answer",     # integer key
  (1, 2): "point"   # tuple key
}

print(data["roll"])
print(data[42])
print(data[(1, 2)])`}
          />

          <p className="text-sm text-slate-400">
            ✔ Strings  
            ✔ Numbers  
            ✔ Tuples (only if they contain immutable elements)
          </p>

          <p className="text-sm text-amber-300">
            ⚠ Exam Insight:  
            “Which of the following can be a dictionary key?” is a classic question.
          </p>
        </section>

        {/* ================= INVALID KEYS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Invalid Key Types (Why Python Refuses)
          </h3>

          <EditablePythonCodeBlock
            title="Invalid Dictionary Keys (Conceptual)"
            initialCode={`# These will raise TypeError

# list as key (mutable)
# d = { [1, 2, 3]: "list key" }

# dictionary as key (mutable)
# d = { {"a": 1}: "dict key" }

print("Lists and dictionaries cannot be keys")`}
          />

          <p className="text-sm text-slate-400">
            ❌ Lists can change  
            ❌ Dictionaries can change  
            🔐 Hashing would break → Python blocks it
          </p>

          <p className="text-sm text-emerald-300">
            Secret Memory Trick:  
            <strong>If it can change, it cannot be a key.</strong>
          </p>
        </section>

        {/* ================= WHAT IS A VALUE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            What Is a Value?
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            A <strong>value</strong> is the actual data.
            Python places <strong>no restriction</strong> on value types.
          </p>

          <EditablePythonCodeBlock
            title="Values Can Be Any Data Type"
            initialCode={`profile = {
  "name": "Swadeep",
  "age": 15,
  "marks": [85, 90, 88],
  "address": {
    "city": "Kolkata",
    "pin": 700120
  }
}

print(profile["marks"])
print(profile["address"]["city"])`}
          />

          <p className="text-sm text-slate-400">
            ✔ Values can be primitive  
            ✔ Values can be collections  
            ✔ Values can be nested dictionaries
          </p>
        </section>

        {/* ================= DUPLICATE KEYS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Duplicate Keys — Silent Overwrite (Danger Zone)
          </h3>

          <EditablePythonCodeBlock
            title="Duplicate Key Behavior"
            initialCode={`data = {
  "a": 1,
  "b": 2,
  "a": 100
}

print(data)`}
          />

          <p className="text-sm text-slate-400">
            ❗ The first <code>"a"</code> is silently overwritten.
          </p>

          <p className="text-sm text-amber-300">
            ⚠ Exam Trap:  
            Python does NOT throw an error for duplicate keys.
          </p>
        </section>

        {/* ================= RETURN TYPE CLARITY ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Return Type Clarity (Hidden but Crucial)
          </h3>

          <EditablePythonCodeBlock
            title="Accessing a Value — Return Type"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14
}

value = student["age"]

print(value)
print(type(value))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Dictionary access returns the <strong>exact type</strong> of the value.
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Insight:  
            Dictionaries do NOT wrap values — they return them raw.
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
            Topic1 — What Must Be Crystal Clear
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Keys identify meaning</li>
            <li>Keys must be immutable</li>
            <li>Values can be anything</li>
            <li>Duplicate keys overwrite silently</li>
            <li>Dictionary access returns raw value type</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
