import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic8.jsx
 Dictionary Methods: keys(), values(), items()
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic8 extends Component {
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
            Dictionary Methods: keys(), values(), items()
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Dictionaries store data internally as <strong>key → value pairs</strong>.  
            Python provides three special methods to *view* this data safely and efficiently.
          </p>

          <p className="text-sm text-slate-400">
            These methods do not copy data.  
            They expose a <strong>live window</strong> into the dictionary.
          </p>
        </motion.section>

        {/* ================= WHY THESE METHODS EXIST ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Why Do We Need keys(), values(), items()?
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            A dictionary is not a list.  
            You cannot safely “scan” it using indexes.
          </p>

          <p className="text-sm text-slate-400">
            Python gives us controlled access through these methods so that:
          </p>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Data is not accidentally modified</li>
            <li>Memory is used efficiently</li>
            <li>Iteration stays predictable</li>
          </ul>

          <p className="text-sm text-emerald-300">
            Teacher Insight:  
            These methods are about <strong>safe observation</strong>, not mutation.
          </p>
        </section>

        {/* ================= KEYS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 1: keys()
          </h3>

          <p className="text-sm text-slate-300">
            <code>keys()</code> returns all the keys of the dictionary.
          </p>

          <EditablePythonCodeBlock
            title="Basic keys() Example"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14,
  "class": 9
}

k = student.keys()

print(k)
print(type(k))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Return type: <code>dict_keys</code>  
            ❌ Not a list
          </p>

          <p className="text-sm text-amber-300">
            ⚠ Exam Trap:  
            <code>keys()</code> does NOT return a list.
          </p>
        </section>

        {/* ================= VALUES ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 2: values()
          </h3>

          <p className="text-sm text-slate-300">
            <code>values()</code> returns all values stored in the dictionary.
          </p>

          <EditablePythonCodeBlock
            title="Basic values() Example"
            initialCode={`student = {
  "name": "Swadeep",
  "age": 15,
  "class": 10
}

v = student.values()

print(v)
print(type(v))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Return type: <code>dict_values</code>  
            ✔ Values may repeat
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Tip:  
            Values don’t have to be unique — only keys do.
          </p>
        </section>

        {/* ================= ITEMS ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Method 3: items()
          </h3>

          <p className="text-sm text-slate-300">
            <code>items()</code> returns key-value pairs together.
          </p>

          <EditablePythonCodeBlock
            title="Basic items() Example"
            initialCode={`student = {
  "name": "Mounita",
  "age": 14,
  "class": 9
}

items = student.items()

print(items)
print(type(items))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Return type: <code>dict_items</code>  
            ✔ Each element is a tuple: <code>(key, value)</code>
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Secret:  
            <code>items()</code> is the most powerful dictionary view.
          </p>
        </section>

        {/* ================= LIVE VIEW BEHAVIOR ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Very Important: These Are Live Views
          </h3>

          <p className="text-sm text-slate-300">
            The objects returned by <code>keys()</code>, <code>values()</code>,
            and <code>items()</code> update automatically.
          </p>

          <EditablePythonCodeBlock
            title="Live View Demonstration"
            initialCode={`data = {"a": 1, "b": 2}

k = data.keys()
print(k)

data["c"] = 3
print(k)`}
          />

          <p className="text-sm text-amber-300">
            ⚠ This is NOT a snapshot — it is a live window.
          </p>
        </section>

        {/* ================= CONVERSION ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Converting Views to Lists (Only When Needed)
          </h3>

          <EditablePythonCodeBlock
            title="Converting View Objects"
            initialCode={`data = {"x": 10, "y": 20}

print(list(data.keys()))
print(list(data.values()))
print(list(data.items()))`}
          />

          <p className="text-sm text-slate-400">
            ✔ Conversion creates a snapshot  
            ❌ Avoid converting unless required
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes & Exam Traps
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Assuming keys(), values(), items() return lists</li>
            <li>Trying to index view objects</li>
            <li>Expecting views to remain unchanged</li>
            <li>Ignoring items() and writing complex logic</li>
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
            Topic8 — What You Must Remember
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>keys(), values(), items() return view objects</li>
            <li>Views are live, not copies</li>
            <li>items() gives structured access</li>
            <li>Convert to list only when necessary</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
