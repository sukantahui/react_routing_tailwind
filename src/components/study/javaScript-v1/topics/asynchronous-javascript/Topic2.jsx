import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-12 animate-[fadeIn_0.8s_ease-out]">

        {/* ================= HEADER ================= */}
        <section>
          <h2 className="text-xl font-semibold text-sky-300 tracking-wide animate-[slideDown_0.5s_ease-out]">
            Callbacks &amp; the Problem of Callback Hell
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mt-2 animate-[fadeIn_1s_ease-out]">
            A <strong>callback</strong> is a function passed to another function so it
            runs <em>later</em>—often when some asynchronous task finishes.
            Before Promises and async/await, callbacks were the main tool for async
            JavaScript.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Understanding callbacks helps you appreciate why JavaScript evolved and
            teaches you how modern async systems came into existence.
          </p>
        </section>

        {/* ================= INFO CARD ================= */}
        <div className="p-4 border border-sky-700/50 bg-sky-900/20 rounded-xl shadow animate-[fadeIn_1.2s_ease-out]">
          <h4 className="text-sky-300 font-semibold text-sm mb-1">💡 Real-World Example</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            Imagine you are building a Coder & AccoTax app. When a student logs in,
            your system needs to:
          </p>

          <ul className="mt-2 ml-5 list-disc text-slate-300 text-sm space-y-1">
            <li>Check login →</li>
            <li>Fetch profile →</li>
            <li>Load marks →</li>
            <li>Show dashboard</li>
          </ul>

          <p className="text-slate-400 text-xs mt-2">
            In callback-based code, each step becomes another nested callback.
          </p>
        </div>

        {/* ================= SECTION 1 ================= */}
        <section>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.5s_ease-out]">
            1. Simple Callback Example
          </h3>

          <EditableCodeBlock
            initialCode={`function loadMarks(name, callback) {
  console.log("Loading marks for", name, "from server...");

  setTimeout(() => {
    const marks = 94;
    callback(marks);  // callback is executed here
  }, 1000);
}

loadMarks("Ritaja", function (marks) {
  console.log("Received marks:", marks);
});`}
          />

          <p className="text-slate-400 text-sm mt-2">
            ✔ Here the callback is clean and readable.  
            ✔ Real async behaviour is easy to understand.
          </p>
        </section>

        {/* ================= DEEPER CONCEPT DISCUSSION ================= */}
        <div className="p-4 bg-indigo-900/20 border border-indigo-700/50 rounded-xl shadow animate-[fadeIn_1.1s_ease-out]">
          <h4 className="text-indigo-300 font-semibold text-sm mb-1">🧠 Why Callbacks Become Difficult</h4>

          <p className="text-slate-300 text-sm">
            The problem is not callbacks themselves—the problem is <strong>many callbacks</strong>.
            When each callback depends on the previous one, the code forms a <em>pyramid</em>.
          </p>

          <p className="text-slate-400 text-xs mt-2">
            Students often get stuck here. But don’t worry—this topic exists so you learn
            how Promises make this easier!
          </p>
        </div>

        {/* ================= WARNING CARD ================= */}
        <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-xl shadow animate-[fadeIn_1.3s_ease-out]">
          <h4 className="text-red-400 font-semibold text-sm mb-1">⚠ Callback Hell</h4>
          <p className="text-slate-300 text-sm">
            Callback Hell happens when callbacks are nested inside callbacks,
            forming a shape like this:
          </p>

          <pre className="text-red-300 text-xs mt-2 whitespace-pre">
            login → getProfile → getMarks → calculateRank → updateUI
          </pre>

          <p className="text-slate-400 text-xs mt-2">
            Each step makes the code more confusing and harder to debug.
          </p>
        </div>

        {/* ================= SECTION 2 ================= */}
        <section>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.6s_ease-out]">
            2. Callback Hell (Pyramid of Doom)
          </h3>

          <p className="text-slate-300 text-sm mb-2 animate-[fadeIn_1s_ease-out]">
            When multiple async tasks depend on one another:
          </p>

          <EditableCodeBlock
            initialCode={`function loginStudent(name, cb) {
  setTimeout(() => {
    console.log("Logged in:", name);
    cb();
  }, 500);
}

function fetchProfile(name, cb) {
  setTimeout(() => {
    console.log("Fetched profile for:", name);
    cb();
  }, 500);
}

function fetchMarks(name, cb) {
  setTimeout(() => {
    console.log("Fetched marks for:", name);
    cb();
  }, 500);
}

// Callback Hell (deep nesting):
loginStudent("Devangshu", () => {
  fetchProfile("Devangshu", () => {
    fetchMarks("Devangshu", () => {
      console.log("Show dashboard for Devangshu");
    });
  });
});`}
          />

          <p className="text-slate-400 text-sm mt-2 animate-[fadeIn_1.3s_ease-out]">
            🔸 Hard to read  
            🔸 Hard to maintain  
            🔸 Hard to add error handling  
            🔸 Hard to scale for real projects  
          </p>
        </section>

        {/* ================= REAL-WORLD CARD ================= */}
        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl shadow-xl animate-[fadeIn_1.5s_ease-out]">
          <h4 className="text-sky-300 font-semibold text-sm">🏫 Real Story — Coder & AccoTax App</h4>

          <p className="text-slate-300 text-sm mt-1">
            When building the exam module, Baba originally wrote:
          </p>

          <ul className="list-disc ml-5 text-sm text-slate-300 mt-1 space-y-1">
            <li>Load student</li>
            <li>Load marks</li>
            <li>Load attendance</li>
            <li>Save final score</li>
          </ul>

          <p className="text-slate-400 text-sm mt-2">
            This became hard to maintain and debug—exactly the Callback Hell problem.
          </p>
        </div>

        {/* ================= EXTRA LEARNING EXAMPLE ================= */}
        <section>
          <h3 className="text-lg font-semibold text-slate-200">
            3. A Student-Friendly Example
          </h3>

          <EditableCodeBlock
            initialCode={`// Student wants to generate certificate
function verifyStudent(id, next) {
  setTimeout(() => {
    console.log("✔ Student Verified");
    next();
  }, 400);
}

function loadScore(next) {
  setTimeout(() => {
    console.log("✔ Score Loaded");
    next();
  }, 400);
}

function generateCertificate(next) {
  setTimeout(() => {
    console.log("🎉 Certificate Generated");
    next();
  }, 400);
}

// Nested structure
verifyStudent(() => {
  loadScore(() => {
    generateCertificate(() => {
      console.log("Process Complete!");
    });
  });
});`}
          />

          <p className="text-slate-400 text-sm mt-2">
            This small example shows how even simple tasks get messy.
          </p>
        </section>

        {/* ================= TIP CARD ================= */}
        <div className="p-4 bg-emerald-900/20 border border-emerald-700/50 rounded-xl shadow animate-[fadeIn_1.6s_ease-out]">
          <h4 className="text-emerald-300 font-semibold text-sm mb-1">✨ Good News for Students</h4>
          <p className="text-slate-300 text-sm">
            Promises and <strong>async/await</strong> completely transform this code.
            You will soon write the same logic in a clean, readable way.
          </p>
        </div>

        {/* ================= SUMMARY ================= */}
        <section className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl shadow-xl animate-[fadeIn_1.8s_ease-out]">
          <h4 className="text-sm font-semibold text-slate-100">📌 Summary</h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Callbacks are functions executed later (often async).</li>
            <li>Too many callbacks create complex nesting.</li>
            <li>Callback Hell is hard to read, write, test, and debug.</li>
            <li>Promises solve most callback problems.</li>
            <li>async/await makes async code even cleaner.</li>
          </ul>

          <p className="text-xs text-slate-400 mt-2">
            Next topic: Learn how Promises fix Callback Hell.
          </p>
        </section>
      </div>
    );
  }
}
