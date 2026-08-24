// src/components/study/python/lists/Topic22.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20";

export default class Topic22 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Real-World Use Cases of Lists
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Lists are everywhere — from mobile apps to servers.  
            Let’s explore how professionals use lists in real systems.
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            🧠 Big Idea
          </p>
          <p className="text-slate-400 text-sm">
            Lists are best when data is <strong>ordered, changeable</strong>, and
            processed sequentially.
          </p>
        </section>

        {/* ================= STACK ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            1️⃣ Stack (LIFO – Last In First Out)
          </h3>

          <EditablePythonCodeBlock
            title="Stack using List"
            initialCode={`stack = []

stack.append("Page1")
stack.append("Page2")
stack.append("Page3")

print(stack.pop())  # Last visited page
print(stack)`}
          />

          <p className="text-slate-400 text-sm">
            Used in <strong>undo operations, browser history, function calls</strong>.
          </p>
        </section>

        {/* ================= QUEUE ================= */}
        <section
          className={`border border-cyan-700 rounded-xl p-4 bg-cyan-900/20 ${hoverCard}`}
        >
          <h3 className="text-cyan-300 font-semibold">
            2️⃣ Queue (FIFO – First In First Out)
          </h3>

          <EditablePythonCodeBlock
            title="Queue using List"
            initialCode={`queue = []

queue.append("Customer1")
queue.append("Customer2")
queue.append("Customer3")

print(queue.pop(0))  # First served
print(queue)`}
          />

          <p className="text-cyan-200 text-sm">
            Used in <strong>ticket systems, printers, task scheduling</strong>.
          </p>
        </section>

        {/* ================= RECORDS ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-purple-300">
            3️⃣ Records (Structured Data)
          </h3>

          <EditablePythonCodeBlock
            title="Student Records"
            initialCode={`students = [
    ["Ritaja", 85],
    ["Mounita", 92],
    ["Swadeep", 78]
]

for s in students:
    print(s[0], s[1])`}
          />

          <p className="text-slate-400 text-sm">
            Lists store <strong>rows of data</strong> like tables.
          </p>
        </section>

        {/* ================= MENU SYSTEM ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            4️⃣ Menu-Driven Programs
          </h3>

          <EditablePythonCodeBlock
            title="Menu Choices"
            initialCode={`menu = ["Add", "Edit", "Delete", "Exit"]

for i, option in enumerate(menu, start=1):
    print(i, option)`}
          />

          <p className="text-indigo-200 text-sm">
            Lists help build <strong>dynamic menus</strong>.
          </p>
        </section>

        {/* ================= TASK MANAGEMENT ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            5️⃣ Task & To-Do Management
          </h3>

          <EditablePythonCodeBlock
            title="To-Do List"
            initialCode={`tasks = ["Study", "Exercise", "Practice Coding"]

tasks.append("Revision")
tasks.remove("Exercise")

print(tasks)`}
          />

          <p className="text-slate-400 text-sm">
            Lists are ideal for <strong>add / remove workflows</strong>.
          </p>
        </section>

        {/* ================= DATA COLLECTION ================= */}
        <section
          className={`border border-green-700 rounded-xl p-4 bg-green-900/20 ${hoverCard}`}
        >
          <h3 className="text-green-300 font-semibold">
            6️⃣ Data Collection & Logs
          </h3>

          <EditablePythonCodeBlock
            title="Collecting Inputs"
            initialCode={`logs = []

logs.append("Login Success")
logs.append("File Uploaded")
logs.append("Logout")

print(logs)`}
          />

          <p className="text-green-200 text-sm">
            Lists collect data dynamically over time.
          </p>
        </section>

        {/* ================= WHEN NOT TO USE ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ When Lists Are NOT Ideal
          </h3>

          <ul className="list-disc list-inside text-red-200 text-sm space-y-1">
            <li>Fast lookup by key → use dictionary</li>
            <li>Unique items only → use set</li>
            <li>Fixed, read-only data → use tuple</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-emerald-200 text-sm">
            ✔ Lists shine in sequential workflows  
            ✔ Most beginner programs rely heavily on lists  
            ✔ Choosing the right structure avoids future rewrites
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic22 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Stacks → undo, history</li>
            <li>Queues → scheduling, services</li>
            <li>Records → tabular data</li>
            <li>Lists model real workflows naturally</li>
          </ul>
        </footer>

      </div>
    );
  }
}
