import React, { Component } from "react";
import { motion } from "framer-motion";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

/*
==========================================================
 Topic6.jsx
 Updating Existing Dictionary Entries
 Author: Sukanta Hui
 Organization: Coder & AccoTax
==========================================================
*/

export default class Topic6 extends Component {
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
            Updating Existing Entries
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Updating a dictionary means <strong>changing the value of an
            already existing key</strong>.
          </p>

          <p className="text-sm text-slate-400">
            Python uses the same syntax for adding and updating —
            so the programmer must be deliberate.
          </p>
        </motion.section>

        {/* ================= BASIC UPDATE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Basic Update Using Assignment
          </h3>

          <EditablePythonCodeBlock
            title="Updating an Existing Key"
            initialCode={`student = {
  "name": "Ritaja",
  "age": 14
}

student["age"] = 15   # update

print(student)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Existing value replaced  
            ✔ No error raised
          </p>

          <p className="text-sm text-amber-300">
            ⚠ Python does NOT warn you about overwriting.
          </p>
        </section>

        {/* ================= ADD VS UPDATE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Add vs Update — Same Syntax, Different Intent
          </h3>

          <EditablePythonCodeBlock
            title="Add vs Update Demonstration"
            initialCode={`data = {"x": 10}

data["y"] = 20   # add
data["x"] = 99   # update

print(data)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Python does not differentiate  
            ✔ Programmer must know intention
          </p>
        </section>

        {/* ================= CONDITIONAL UPDATE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Conditional Update (Safe Practice)
          </h3>

          <EditablePythonCodeBlock
            title="Updating Only If Key Exists"
            initialCode={`config = {
  "timeout": 30,
  "theme": "dark"
}

if "timeout" in config:
    config["timeout"] = 60

print(config)`}
          />

          <p className="text-sm text-emerald-300">
            ✔ Prevents accidental creation  
            ✔ Professional defensive coding
          </p>
        </section>

        {/* ================= UPDATE USING GET ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Update Using Existing Value
          </h3>

          <EditablePythonCodeBlock
            title="Updating Based on Current Value"
            initialCode={`scores = {
  "math": 70,
  "science": 80
}

scores["math"] = scores.get("math", 0) + 10

print(scores)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Uses existing value  
            ✔ Safe even if key is missing
          </p>
        </section>

        {/* ================= LOOP UPDATE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Updating Values in a Loop
          </h3>

          <EditablePythonCodeBlock
            title="Bulk Update Pattern"
            initialCode={`prices = {
  "pen": 10,
  "book": 50,
  "eraser": 5
}

for item in prices:
    prices[item] = prices[item] + 5

print(prices)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Common in pricing, scoring, normalization
          </p>
        </section>

        {/* ================= RETURN VALUE ================= */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-sky-300">
            Return Value of Updates (Important Concept)
          </h3>

          <EditablePythonCodeBlock
            title="Update Returns Nothing"
            initialCode={`data = {"x": 1}

result = data.__setitem__("x", 100)

print(result)
print(data)`}
          />

          <p className="text-sm text-slate-400">
            ✔ Update happens in place  
            ✔ Return value is <code>None</code>
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-slate-700 rounded-xl p-5 bg-slate-900/50">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes & Traps
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>Overwriting values unintentionally</li>
            <li>Assuming update returns a new dictionary</li>
            <li>Updating keys without existence check</li>
            <li>Confusing update with add</li>
          </ul>
        </section>

        {/* ================= TEACHER SECRET ================= */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-300">
            Teacher Secret: Professional Update Rule
          </h3>

          <p className="text-sm text-slate-300">
            ✔ If key MUST exist → check with <code>in</code>  
            ✔ If value matters → read before updating  
            ✔ If data is critical → log or validate before overwrite
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
            Topic6 — Update Rules Locked In
          </h4>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Updating mutates the dictionary</li>
            <li>Same syntax as adding</li>
            <li>Overwrite is silent</li>
            <li>Updates return nothing</li>
            <li>Professional code updates intentionally</li>
          </ul>
        </motion.section>

      </div>
    );
  }
}
