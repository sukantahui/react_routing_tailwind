import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-8">

      {/* --------------------------------------------- */}
      {/* TITLE */}
      {/* --------------------------------------------- */}
      <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
        Conditional Statements in Python — if, elif, else
      </h1>

      <p className="text-slate-300 text-sm md:text-base leading-relaxed">
        Conditional statements allow a program to make decisions.
        Python evaluates a condition as <strong>True</strong> or <strong>False</strong> 
        and executes the matching code block. This is one of the most powerful tools 
        for creating logic, validations, menus, and real-world applications.
      </p>

      {/* --------------------------------------------- */}
      {/* BASIC if STATEMENT */}
      {/* --------------------------------------------- */}
      <h2 className="text-xl font-semibold text-sky-300">1. The <code>if</code> Statement</h2>
      <p className="text-slate-300 text-sm md:text-base">
        An <code>if</code> block runs only when its condition is <strong>True</strong>.
        Python uses indentation (usually 4 spaces) to define the block.
      </p>

      <EditablePythonCodeBlock
        initialCode={`age = 20

if age >= 18:
    print("You are an adult")`}
      />

      <p className="text-slate-400 text-sm">
        If the condition is false, nothing happens.
      </p>

      {/* --------------------------------------------- */}
      {/* if-else */}
      {/* --------------------------------------------- */}
      <h2 className="text-xl font-semibold text-sky-300">2. The <code>if–else</code> Statement</h2>
      <p className="text-slate-300 text-sm md:text-base">
        The <code>else</code> block runs when the <code>if</code> condition fails.
      </p>

      <EditablePythonCodeBlock
        initialCode={`marks = 40

if marks >= 50:
    print("Pass")
else:
    print("Fail")`}
      />

      {/* --------------------------------------------- */}
      {/* ELIF */}
      {/* --------------------------------------------- */}
      <h2 className="text-xl font-semibold text-sky-300">3. The <code>elif</code> Chain</h2>
      <p className="text-slate-300 text-sm md:text-base">
        <code>elif</code> is short for <strong>else if</strong>.  
        It allows multiple conditions in sequence, and Python executes only the 
        first matching block.
      </p>

      <EditablePythonCodeBlock
        initialCode={`score = 72

if score >= 90:
    print("Excellent")
elif score >= 75:
    print("Very Good")
elif score >= 60:
    print("Good")
else:
    print("Needs Improvement")`}
      />

      {/* --------------------------------------------- */}
      {/* FLOWCHART */}
      {/* --------------------------------------------- */}
      <h3 className="text-lg font-semibold text-purple-300">Flow of Execution</h3>

      <pre className="bg-slate-800 text-slate-300 p-4 rounded-xl text-sm leading-relaxed overflow-auto">
{`        ┌──────────────┐
        │   if cond1?  │
        └──────┬───────┘
               │True
               ▼
        ┌──────────────┐
        │ execute blk1 │
        └──────┴───────┘
               │False
               ▼
        ┌──────────────┐
        │  elif cond2? │
        └──────┬───────┘
               │True
               ▼
        ┌──────────────┐
        │ execute blk2 │
        └──────┴───────┘
               │False
               ▼
        ┌──────────────┐
        │    else blk  │
        └──────────────┘
`}
      </pre>

      {/* --------------------------------------------- */}
      {/* NESTED CONDITIONS */}
      {/* --------------------------------------------- */}
      <h2 className="text-xl font-semibold text-sky-300">4. Nested Conditions</h2>
      <p className="text-slate-300 text-sm md:text-base">
        You can put one <code>if</code> inside another to check multiple levels of logic.
      </p>

      <EditablePythonCodeBlock
        initialCode={`age = 20
has_id = True

if age >= 18:
    if has_id:
        print("Entry Allowed")
    else:
        print("Please bring your ID card")
else:
    print("Underage – Entry Denied")`}
      />

      {/* --------------------------------------------- */}
      {/* MULTIPLE CONDITIONS USING LOGICAL OPERATORS */}
      {/* --------------------------------------------- */}
      <h2 className="text-xl font-semibold text-sky-300">
        5. Multiple Conditions with <code>and</code>, <code>or</code>, <code>not</code>
      </h2>

      <EditablePythonCodeBlock
        initialCode={`username = "admin"
password = "1234"

if username == "admin" and password == "1234":
    print("Login Successful")
else:
    print("Invalid Credentials")`}
      />

      <EditablePythonCodeBlock
        initialCode={`temp = 35

if temp < 10 or temp > 30:
    print("Extreme Weather Warning!")`}
      />

      {/* --------------------------------------------- */}
      {/* REAL-WORLD SCENARIOS */}
      {/* --------------------------------------------- */}
      <h2 className="text-xl font-semibold text-sky-300">
        6. Real-World Examples
      </h2>

      <h3 className="text-lg text-slate-200 font-semibold">
        Example 1 — Grading System
      </h3>
      <EditablePythonCodeBlock
        initialCode={`marks = 88

if marks >= 90:
    print("Grade A")
elif marks >= 75:
    print("Grade B")
elif marks >= 60:
    print("Grade C")
else:
    print("Grade D")`}
      />

      <h3 className="text-lg text-slate-200 font-semibold">
        Example 2 — Simple ATM Withdrawal Check
      </h3>
      <EditablePythonCodeBlock
        initialCode={`balance = 5000
withdraw = 2000

if withdraw <= balance:
    print("Transaction Successful")
else:
    print("Insufficient Balance")`}
      />

      {/* --------------------------------------------- */}
      {/* TEACHER’S TIPS */}
      {/* --------------------------------------------- */}
      <section className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-emerald-300">Teacher’s Tips</h3>
        <ul className="text-slate-300 text-sm mt-2 space-y-1">
          <li>✔ Always indent code inside <code>if</code> blocks — Python relies on indentation.</li>
          <li>✔ Don’t overuse nested <code>if</code>. Use logical operators instead.</li>
          <li>✔ Order conditions from most specific to broad.</li>
          <li>✔ Use <code>elif</code> instead of multiple separate <code>if</code> checks.</li>
        </ul>
      </section>

      {/* --------------------------------------------- */}
      {/* POINTS TO REMEMBER */}
      {/* --------------------------------------------- */}
      <section className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-yellow-300">Points to Remember</h3>
        <ul className="text-slate-300 text-sm mt-2 space-y-1">
          <li>• Every conditional block must be indented equally.</li>
          <li>• Python checks conditions top to bottom.</li>
          <li>• Only one block in an <code>if–elif–else</code> chain executes.</li>
          <li>• Boolean operators (<code>and</code>, <code>or</code>, <code>not</code>) allow powerful conditions.</li>
        </ul>
      </section>

    </div>
  );
}
