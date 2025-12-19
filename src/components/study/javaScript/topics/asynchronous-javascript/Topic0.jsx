import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

// Animation helper class
const fadeInClass = "animate-[fadeIn_0.8s_ease-out]";


export default class Topic0 extends Component {
  render() {
    return (
      <div className={`space-y-10 ${fadeInClass}`}>

        {/* ================== HEADER ================== */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-sky-300 tracking-wide animate-[slideDown_0.5s_ease-out]">
            Synchronous vs Asynchronous Code
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            JavaScript is <strong>single-threaded</strong> and executes code in a{" "}
            <strong>synchronous</strong> order unless asynchronous features are used.
            In Coder &amp; AccoTax learning apps, async code is crucial for loading
            quizzes, scores, and student reports without blocking the UI.
          </p>
        </div>

        {/* ================== INFO CARD ================== */}
        <div className="p-4 border border-sky-700 bg-sky-900/30 rounded-xl shadow-md animate-[fadeIn_1.2s_ease-out]">
          <h4 className="text-sky-300 font-semibold mb-1 text-sm">
            💡 Why Learn Async?
          </h4>
          <p className="text-slate-300 text-sm">
            Async code improves speed and user experience by preventing the UI from freezing.
            It allows tasks like API calls, timers, and database operations to run efficiently.
          </p>
        </div>

        {/* ================== SECTION 1 ================== */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.5s_ease-out]">
            1. Synchronous Code (Blocking)
          </h3>

          <EditableCodeBlock
            initialCode={`console.log("1. Start");

for (let i = 1; i <= 3; i++) {
  console.log("Loop count:", i);
}

console.log("2. End");

/*
Output:
1. Start
Loop count: 1
Loop count: 2
Loop count: 3
2. End
*/
`}
          />

          <div className="mt-2 p-3 bg-slate-900/40 border border-slate-800 rounded-xl text-sm text-slate-400 animate-[fadeIn_1.3s_ease-out]">
            ⏳ In synchronous code, each line must finish before the next begins.
            Slow operations block everything behind them.
          </div>
        </div>

        {/* ================== WARNING CARD ================== */}
        <div className="p-4 border border-red-700 bg-red-900/20 rounded-xl shadow animate-[fadeIn_1.4s_ease-out]">
          <h4 className="text-red-400 font-semibold mb-1 text-sm">
            ⚠ Common Issue in Synchronous Code
          </h4>
          <p className="text-slate-300 text-sm">
            If you perform heavy computations synchronously, your interface becomes
            unresponsive — a bad user experience.
          </p>
        </div>

        {/* ================== SECTION 2 ================== */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.5s_ease-out]">
            2. Asynchronous Code (Non-Blocking)
          </h3>

          <p className="text-slate-300 text-sm mb-3 animate-[fadeIn_1s_ease-out]">
            Async code allows long-running operations to run in the background while
            the main thread continues.
          </p>

          <EditableCodeBlock
            initialCode={`console.log("1. Start");

setTimeout(() => {
  console.log("2. Loading marks for Ritaja...");
}, 1000);

console.log("3. End");

/*
Possible output:
1. Start
3. End
2. Loading marks for Ritaja...
*/
`}
          />

          <div className="mt-2 p-3 bg-emerald-900/20 border border-emerald-700 rounded-xl text-sm text-emerald-300 animate-[fadeIn_1.3s_ease-out]">
            ✔ Asynchronous code prevents blocking and keeps your UI smooth.
          </div>
        </div>

        {/* ================== SUCCESS INFO CARD ================== */}
        <div className="p-4 border border-emerald-700 bg-emerald-900/20 rounded-xl shadow animate-[fadeIn_1.5s_ease-out]">
          <h4 className="text-emerald-400 font-semibold mb-1 text-sm">
            🌿 Real Use in Coder & AccoTax Projects
          </h4>
          <p className="text-slate-300 text-sm">
            Fetching student marks, test scores, leaderboard updates —
            all happen asynchronously to give a smooth experience.
          </p>
        </div>

        {/* ================== SECTION 3 ================== */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.5s_ease-out]">
            3. Real-Life Analogy (Coder & AccoTax)
          </h3>

          <p className="text-slate-300 text-sm animate-[fadeIn_1s_ease-out]">
            When <strong>Ritaja</strong> submits an online test:
          </p>

          <ul className="list-disc ml-5 mt-1 text-slate-300 text-sm space-y-1 animate-[fadeIn_1.3s_ease-out]">
            <li>UI shows “Saving your answers…”</li>
            <li>Data is uploaded asynchronously</li>
            <li>She continues navigating without lag</li>
          </ul>
        </div>

        {/* ================== TIP CARD ================== */}
        <div className="p-4 border border-indigo-700 bg-indigo-900/20 rounded-xl shadow animate-[fadeIn_1.6s_ease-out]">
          <h4 className="text-indigo-300 font-semibold mb-1 text-sm">
            ✨ Tip for Students
          </h4>
          <p className="text-slate-300 text-sm">
            Whenever you see <code>setTimeout</code>, <code>fetch()</code>,
            <code>Promise</code>, or <code>async/await</code>, you're dealing with
            asynchronous code.
          </p>
        </div>

        {/* ================== SUMMARY ================== */}
        <section className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 shadow-xl animate-[fadeIn_2s_ease-out]">
          <h4 className="text-sm font-semibold text-slate-100">
            📌 Key Takeaways
          </h4>

          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Synchronous = sequential & blocking</li>
            <li>Asynchronous = scheduled & non-blocking</li>
            <li>Essential for network calls, timers, animations, file operations</li>
            <li>Makes UI faster, smoother, and interactive</li>
          </ul>
        </section>
      </div>
    );
  }
}
