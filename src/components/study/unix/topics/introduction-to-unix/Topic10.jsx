// src/components/study/unix/topics/unix-basic/Topic10.jsx
// Topic 10 – Understanding Command Structure: command, options, arguments

import React, { Component } from "react";

export default class Topic10 extends Component {

  componentDidMount() {
    // small delay to trigger reveal animation
    setTimeout(() => {
      const el = document.getElementById("topic10-root");
      if (el) el.classList.remove("opacity-0", "translate-y-6");
    }, 100);
  }

  render() {
    return (
      <div
        id="topic10-root"
        className="
          opacity-0 translate-y-6 transition-all duration-700
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
          space-y-10 leading-relaxed
        "
      >

        {/* ================= INTRO ================= */}
        <section className="p-6 rounded-3xl bg-slate-900/70 border border-slate-700 hover:shadow-xl transition-all duration-300">
          <h1 className="text-2xl font-bold text-sky-300 mb-3">
            Understanding Command Structure in Linux / UNIX
          </h1>
          <p className="text-slate-300 text-sm">
            Every Linux command follows a simple grammar:
          </p>
          <p className="mt-2 text-yellow-300 text-sm font-mono bg-slate-800 inline-block px-3 py-1 rounded-lg">
            command  [options]  [arguments]
          </p>
        </section>

        {/* ================= CORE CONCEPT ================= */}
        <section className="grid md:grid-cols-3 gap-5">

          {/* COMMAND */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-sky-400 transition-all">
            <h3 className="text-sky-300 font-semibold mb-2">1️⃣ Command</h3>
            <p className="text-sm text-slate-300">
              The program you want to run.
            </p>
            <p className="mt-2 text-xs bg-slate-800 p-2 rounded-lg text-sky-300 font-mono">
              ls
            </p>
            <p className="text-xs text-slate-400 mt-2">
              <b>Prototype:</b> ls [options] [arguments]<br/>
              <b>Purpose:</b> List files & folders.
            </p>
          </div>

          {/* OPTIONS */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-emerald-400 transition-all">
            <h3 className="text-emerald-300 font-semibold mb-2">2️⃣ Options</h3>
            <p className="text-sm text-slate-300">
              Options modify how the command behaves.
            </p>
            <p className="mt-2 text-xs bg-slate-800 p-2 rounded-lg text-emerald-300 font-mono">
              ls -l
            </p>
            <p className="text-xs text-slate-400 mt-2">
              <b>-l</b> = long listing format.
            </p>
          </div>

          {/* ARGUMENTS */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-purple-400 transition-all">
            <h3 className="text-purple-300 font-semibold mb-2">3️⃣ Arguments</h3>
            <p className="text-sm text-slate-300">
              The target object on which the command works.
            </p>
            <p className="mt-2 text-xs bg-slate-800 p-2 rounded-lg text-purple-300 font-mono">
              ls Documents
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Lists only the <b>Documents</b> folder.
            </p>
          </div>
        </section>

        {/* ================= REAL WORLD STORY ================= */}
        <section className="p-6 rounded-3xl bg-slate-900/60 border border-slate-700 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold text-sky-300 mb-3">
            🏫 Real-World Classroom Example
          </h2>
          <p className="text-sm text-slate-300">
            In Barrackpore Computer Lab, Swadeep typed:
          </p>
          <pre className="bg-slate-800 p-3 rounded-lg text-sky-300 text-sm mt-3">
ls -l Notes
          </pre>
          <p className="text-slate-400 text-sm mt-2">
            <b>ls</b> = command  
            <b>-l</b> = option  
            <b>Notes</b> = argument  
          </p>
        </section>

        {/* ================= HINT SECTION ================= */}
        <section className="p-5 rounded-2xl bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:border-sky-400 transition-all">
          <h3 className="text-sky-300 font-semibold mb-2">💡 Think About…</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>What happens if you remove the option?</li>
            <li>What happens if you remove the argument?</li>
            <li>Try combining multiple options.</li>
          </ul>
        </section>

        {/* ================= COMMON PITFALLS ================= */}
        <section className="p-5 rounded-2xl bg-rose-950/30 border border-rose-400/30 hover:shadow-lg transition-all">
          <h3 className="text-rose-300 font-semibold mb-2">⚠ Common Pitfalls</h3>
          <ul className="text-sm text-slate-300 list-disc list-inside space-y-1">
            <li>Using options without hyphen: <b>ls l</b> ❌</li>
            <li>Wrong case: <b>LS</b> instead of <b>ls</b></li>
            <li>Forgetting arguments for file operations.</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="p-6 rounded-3xl bg-sky-950/30 border border-sky-400/30 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all">
          <h3 className="text-sky-300 font-semibold mb-2">👨‍🏫 Teacher’s Note</h3>
          <p className="text-sm text-slate-300">
            Always tell students to read Linux commands like English sentences.
            Command = verb, Option = adverb, Argument = noun.  
            This mental model turns beginners into professionals.
          </p>
        </section>

        {/* ================= MINI CHECKLIST ================= */}
        <section className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-400/30 text-sm text-slate-300 hover:shadow-lg transition-all">
          <h3 className="text-emerald-300 font-semibold mb-2">✅ Mini Checklist</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>I know the difference between command, option & argument.</li>
            <li>I can read a command before typing it.</li>
            <li>I never blindly memorize syntax.</li>
          </ul>
        </section>

      </div>
    );
  }
}
