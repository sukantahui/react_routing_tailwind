// src/components/study/unix/topics/unix-intro/Topic4.jsx
import React, { Component } from "react";

export default class Topic4 extends Component {

  componentDidMount() {
    // no JS animation required – Tailwind handles motion
  }

  render() {
    return (
      <div className="space-y-10 leading-relaxed">

        {/* ====================== INTRO ====================== */}
        <section className="
          bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800
          rounded-3xl p-6 shadow-lg
          transition-all duration-300 hover:shadow-2xl
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
        ">
          <h1 className="text-2xl font-bold text-sky-600 dark:text-sky-400 mb-3">
            Shell vs Terminal vs Console — Clearing the Confusion
          </h1>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Students from Barrackpore to Naihati often ask:
            <b> “Sir, shell, terminal, console — are they the same?”</b>  
            Let’s solve this mystery once and for all.
          </p>
        </section>

        {/* ====================== DEFINITIONS ====================== */}
        <section className="
          grid md:grid-cols-3 gap-6
          motion-safe:animate-[fadeSlideUp_1.3s_ease-out_forwards]
        ">

          {/* SHELL */}
          <div className="
            bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-slate-700
            rounded-2xl p-5 transition-all duration-300 hover:shadow-xl
          ">
            <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-400 mb-2">🐚 Shell</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              The <b>Shell is a program</b> that understands your commands and
              talks to the Kernel.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Prototype: <code>/bin/bash</code>, <code>/bin/zsh</code>, <code>/bin/sh</code><br />
              Return type: Output / exit status<br />
              Purpose: Interpret user commands
            </p>
          </div>

          {/* TERMINAL */}
          <div className="
            bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-700
            rounded-2xl p-5 transition-all duration-300 hover:shadow-xl
          ">
            <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">🖥 Terminal</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              The <b>Terminal is the window / app</b> where you type shell commands.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Examples: GNOME Terminal, Windows Terminal, iTerm2<br />
              Purpose: Interface for shell input/output
            </p>
          </div>

          {/* CONSOLE */}
          <div className="
            bg-purple-50 dark:bg-slate-900 border border-purple-200 dark:border-slate-700
            rounded-2xl p-5 transition-all duration-300 hover:shadow-xl
          ">
            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">⌨ Console</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              The <b>Console is the physical or system-level display</b> —
              like TTY screens or boot screens.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Purpose: Direct system interaction layer
            </p>
          </div>

        </section>

        {/* ====================== FUN STORY ====================== */}
        <section className="
          bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-300 dark:border-yellow-700
          rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_1.5s_ease-out_forwards]
        ">
          <h2 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-3">
            😄 Funny Explanation
          </h2>

          <p className="text-sm text-slate-700 dark:text-slate-300">
            Abhronila shouts:  
            <b>“Computer, delete that folder!”</b>
          </p>

          <ul className="text-sm list-disc ml-6 mt-3 text-slate-600 dark:text-slate-400 space-y-1">
            <li>Terminal = the phone screen.</li>
            <li>Shell = WhatsApp translator.</li>
            <li>Console = the actual mobile hardware.</li>
          </ul>
        </section>

        {/* ====================== COMPARISON TABLE ====================== */}
        <section className="
          bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800
          rounded-3xl p-6 overflow-x-auto transition-all duration-300 hover:shadow-xl
        ">
          <h2 className="text-lg font-semibold text-sky-600 dark:text-sky-400 mb-4">
            📊 Comparison Table
          </h2>

          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                <th className="p-2 border">Aspect</th>
                <th className="p-2 border">Shell</th>
                <th className="p-2 border">Terminal</th>
                <th className="p-2 border">Console</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["What is it?", "Program", "Application UI", "System Interface"],
                ["Example", "bash, zsh", "GNOME Terminal", "TTY1 screen"],
                ["Role", "Translates commands", "Shows input/output", "Direct system control"],
                ["Exists without GUI?", "Yes", "No", "Yes"],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 border text-slate-600 dark:text-slate-400">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ====================== COMMON PITFALLS ====================== */}
        <section className="
          bg-rose-50 dark:bg-rose-900/10 border border-rose-300 dark:border-rose-700
          rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
        ">
          <h2 className="text-lg font-semibold text-rose-600 dark:text-rose-400 mb-3">
            ⚠ Common Pitfalls
          </h2>
          <ul className="list-disc ml-6 text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <li>Calling the terminal “bash”.</li>
            <li>Thinking console only means black screen.</li>
            <li>Believing Windows CMD is Linux shell.</li>
          </ul>
        </section>

        {/* ====================== BEST PRACTICES ====================== */}
        <section className="
          bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-300 dark:border-emerald-700
          rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
        ">
          <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            ✅ Best Practices
          </h2>
          <ul className="list-disc ml-6 text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <li>Say: “Open Terminal” — not “Open Shell”.</li>
            <li>Learn Bash before Zsh.</li>
            <li>Practice TTY consoles: Ctrl+Alt+F2.</li>
          </ul>
        </section>

        {/* ====================== TEACHER NOTE ====================== */}
        <section className="
          bg-sky-100 dark:bg-sky-900/10 border border-sky-300 dark:border-sky-700
          rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
        ">
          <p className="text-sm text-sky-700 dark:text-sky-300 font-semibold">
            Teacher’s Note
          </p>
          <p className="text-xs text-sky-600 dark:text-sky-400 mt-1">
            If you understand Shell, Terminal and Console clearly, you stop fearing Linux.
            You start commanding it — that is real power.
          </p>
        </section>

      </div>
    );
  }
}
