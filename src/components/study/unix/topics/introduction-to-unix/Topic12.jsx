// src/components/study/unix/topics/Topic12.jsx
import React, { Component } from "react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(14px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic12 extends Component {
  render() {
    return (
      <div className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-200">

        <style>{animationStyles}</style>

        {/* ================= INTRO ================= */}
        <section
          className="
            bg-white dark:bg-slate-900
            border border-sky-400/30 rounded-3xl p-6 shadow-xl
            motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          "
        >
          <h1 className="text-2xl font-bold text-sky-500 mb-3">
            Using Manual Pages – <span className="text-emerald-400">man</span> & <span className="text-amber-400">--help</span>
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            Linux does not expect you to memorize commands.  
            It expects you to <b>ask the system itself</b>.
          </p>
        </section>

        {/* ================= CONCEPT ================= */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="
            p-5 rounded-2xl border border-slate-300 dark:border-slate-700
            bg-slate-50 dark:bg-slate-800
            transition-all duration-300 hover:shadow-lg
            motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
          ">
            <h2 className="text-lg font-semibold text-sky-400 mb-2">What is <code>man</code>?</h2>
            <p className="text-sm">
              <b>man</b> = <b>Manual Pages</b>&nbsp;  
              It opens the official documentation of any Linux command directly inside the terminal.
            </p>

            <pre className="mt-3 bg-black text-emerald-400 p-3 rounded-lg text-sm">
{`man ls`}
            </pre>
          </div>

          <div className="
            p-5 rounded-2xl border border-slate-300 dark:border-slate-700
            bg-slate-50 dark:bg-slate-800
            transition-all duration-300 hover:shadow-lg
            motion-safe:animate-[fadeSlideUp_1.2s_ease-out_forwards]
          ">
            <h2 className="text-lg font-semibold text-amber-400 mb-2">What is <code>--help</code>?</h2>
            <p className="text-sm">
              The <b>--help</b> flag gives you a quick usage summary without opening long pages.
            </p>

            <pre className="mt-3 bg-black text-amber-300 p-3 rounded-lg text-sm">
{`ls --help`}
            </pre>
          </div>
        </section>

        {/* ================= WHY THIS MATTERS ================= */}
        <section className="
          p-6 rounded-3xl bg-gradient-to-br from-sky-50 to-white
          dark:from-slate-800 dark:to-slate-900
          border border-sky-400/30
          transition-all duration-300 hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_1.4s_ease-out_forwards]
        ">
          <h2 className="text-lg font-semibold text-sky-500 mb-3">Why This Matters</h2>

          <p className="text-sm">
            When Swadeep in Barrackpore forgets how <code>grep</code> works,  
            he does not panic — he simply types:
          </p>

          <pre className="mt-3 bg-black text-sky-300 p-3 rounded-lg text-sm">
{`man grep`}
          </pre>
        </section>

        {/* ================= COMPARISON ================= */}
        <section className="grid md:grid-cols-2 gap-6">

          <div className="
            p-5 rounded-2xl border border-slate-300 dark:border-slate-700
            bg-slate-100 dark:bg-slate-800
            transition-all duration-300 hover:shadow-lg
          ">
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">man Command</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Full documentation</li>
              <li>Scrollable with arrow keys</li>
              <li>Search using <code>/keyword</code></li>
              <li>Quit with <code>q</code></li>
            </ul>
          </div>

          <div className="
            p-5 rounded-2xl border border-slate-300 dark:border-slate-700
            bg-slate-100 dark:bg-slate-800
            transition-all duration-300 hover:shadow-lg
          ">
            <h3 className="text-lg font-semibold text-amber-400 mb-2">--help Flag</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Short and fast</li>
              <li>One-screen reference</li>
              <li>Great during exams & live servers</li>
            </ul>
          </div>

        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="
          p-6 rounded-3xl border border-rose-400/40
          bg-rose-50 dark:bg-rose-900/20
          transition-all duration-300 hover:shadow-xl
        ">
          <h2 className="text-lg font-semibold text-rose-400 mb-2">Common Pitfalls</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Students forget to press <code>q</code> to exit man pages</li>
            <li>They scroll with mouse instead of keyboard</li>
            <li>They don’t search inside man pages using <code>/option</code></li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="
          p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-white
          dark:from-slate-800 dark:to-slate-900
          border border-emerald-400/30
          transition-all duration-300 hover:shadow-xl
        ">
          <h2 className="text-lg font-semibold text-emerald-400 mb-2">Teacher’s Note</h2>
          <p className="text-sm">
            Real professionals don’t memorize commands —  
            they know how to <b>talk to the system</b>.  
            <code>man</code> is your conversation with Linux.
          </p>
        </section>

        {/* ================= MINI CHECKLIST ================= */}
        <section className="
          p-5 rounded-2xl border border-slate-300 dark:border-slate-700
          bg-slate-50 dark:bg-slate-800
        ">
          <h2 className="text-lg font-semibold text-sky-400 mb-2">Mini Checklist</h2>
          <ul className="list-disc list-inside text-sm">
            <li>I know what <code>man</code> stands for</li>
            <li>I can search inside man pages</li>
            <li>I use <code>--help</code> for quick guidance</li>
            <li>I never fear unknown commands</li>
          </ul>
        </section>

      </div>
    );
  }
}
