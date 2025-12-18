import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic6.jsx
 Removing Dictionary Key-Value Pairs
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic7 extends Component {
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
            Removing Key-Value Pairs
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Removing data from a dictionary is a **destructive operation**.
            Once removed, the data is gone unless stored elsewhere.
          </p>

          <p className="text-sm text-slate-400">
            Python provides multiple removal tools — each with a purpose.
          </p>
        </motion.section>

        {/* ================= DEL ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Using <code>del</code> — Direct & Strict
          </h3>

          <EditablePythonCodeBlock
            title="del Statement"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14,
  "class": 9
}

del student["age"]

print(student)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Removes the key-value pair  
            ❌ Raises <code>KeyError</code> if key does not exist
          </p>

          <p className="text-sm text-amber-300">
            ⚠ Use <code>del</code> only when key existence is guaranteed.
          </p>
        </section>

        {/* ================= POP ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Using <code>pop()</code> — Safe & Useful
          </h3>

          <EditablePythonCodeBlock
            title="pop() Method"
            initialCode={`student = {
  "name": "Swadeep",
  "age": 15,
  "class": 10
}

age = student.pop("age")

print(age)
print(student)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Removes the key  
            ✔ Returns the removed value
          </p>

          <p className="text-sm text-emerald-300">
            Teacher Rule:  
            Use <code>pop()</code> when you need the value before deletion.
          </p>
        </section>

        {/* ================= POP WITH DEFAULT ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            pop() with Default Value (Very Important)
          </h3>

          <EditablePythonCodeBlock
            title="Safe pop() with Default"
            initialCode={`data = {
  "x": 10
}

value1 = data.pop("x", 0)
value2 = data.pop("y", 0)

print(value1)
print(value2)
print(data)`}
          />

          <p className="text-sm text-slate-400">
            ✔ No KeyError  
            ✔ Safe deletion
          </p>
        </section>

        {/* ================= POPITEM ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Using <code>popitem()</code> — Last Item Removal
          </h3>

          <EditablePythonCodeBlock
            title="popitem() Method"
            initialCode={`data = {
  "a": 1,
  "b": 2,
  "c": 3
}

item = data.popitem()

print(item)
print(data)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Removes the last inserted item  
            ✔ Returns a tuple: <code>(key, value)</code>
          </p>

          <p className="text-sm text-amber-300">
            ⚠ Raises error if dictionary is empty
          </p>
        </section>

        {/* ================= CLEAR ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Using <code>clear()</code> — Remove Everything
          </h3>

          <EditablePythonCodeBlock
            title="clear() Method"
            initialCode={`data = {
  "x": 10,
  "y": 20
}

data.clear()

print(data)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Empties the dictionary  
            ✔ Dictionary object remains
          </p>
        </section>

        {/* ================= RETURN TYPE SUMMARY ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Return Type Summary (Important for Exams)
          </h3>

          <EditablePythonCodeBlock
            title="Return Type Comparison"
            initialCode={`data = {"a": 1, "b": 2}

print(data.pop("a"))       # returns value
# del returns nothing
print(data.clear())        # returns None`}
          />

          <p className="text-sm text-slate-400">
            ✔ <code>pop()</code> → value  
            ✔ <code>popitem()</code> → tuple  
            ✔ <code>clear()</code> → None  
            ✔ <code>del</code> → no return
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Using <code>del</code> without checking key existence</li>
            <li>Expecting <code>clear()</code> to return a dictionary</li>
            <li>Calling <code>popitem()</code> on empty dictionary</li>
            <li>Forgetting to store popped values</li>
          </ul>
        </section>

        {/* ================= TEACHER SECRET ================= */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-300">
            Teacher Secret: Choosing the Right Tool
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Use <code>del</code> → when key must exist</li>
            <li>Use <code>pop()</code> → when value is needed</li>
            <li>Use <code>popitem()</code> → stack-like behavior</li>
            <li>Use <code>clear()</code> → reset dictionary</li>
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
            Topic6 — Removal Rules Locked In
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Removal mutates dictionary</li>
            <li>Different tools serve different purposes</li>
            <li>Return values matter</li>
            <li>Safe removal prevents crashes</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
