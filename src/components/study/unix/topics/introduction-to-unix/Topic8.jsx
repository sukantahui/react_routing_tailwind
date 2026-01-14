// src/components/study/unix/topics/unix/Topic8.jsx
// Topic 8 – Opening Terminal: Shortcuts & Interface Tour (UNIX & Linux)

import React, { Component } from "react";
import { Terminal, Keyboard, Lightbulb, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

export default class Topic8 extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-200">

        {/* Intro */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]">
          <h1 className="text-3xl font-bold text-sky-600 dark:text-sky-400">
            Opening the Terminal – Shortcuts & Interface Tour
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            The terminal is not a black box — it is your direct conversation
            with the operating system. Once you open it, Linux starts listening.
          </p>
        </section>

        {/* Why Terminal */}
        <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[200ms]
        ">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
            <Terminal size={20}/> Why the Terminal Still Matters
          </h2>
          <p className="mt-3">
            GUI is convenient, but professionals use the terminal because it is:
          </p>
          <ul className="mt-3 list-disc list-inside text-sm space-y-1">
            <li>Faster for repetitive tasks</li>
            <li>More powerful than menus</li>
            <li>Scriptable and automatable</li>
            <li>The only interface available on servers</li>
          </ul>
        </section>

        {/* Shortcuts */}
        <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[400ms]
        ">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <Keyboard size={20}/> Common Ways to Open Terminal
          </h2>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-200 dark:bg-slate-800">
                  <th className="border p-2">System</th>
                  <th className="border p-2">Shortcut / Method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Ubuntu / Linux Mint</td>
                  <td className="border p-2"><b>Ctrl + Alt + T</b></td>
                </tr>
                <tr>
                  <td className="border p-2">Fedora</td>
                  <td className="border p-2">Search “Terminal” from Activities</td>
                </tr>
                <tr>
                  <td className="border p-2">Debian</td>
                  <td className="border p-2">Applications → System → Terminal</td>
                </tr>
                <tr>
                  <td className="border p-2">macOS (BSD-based)</td>
                  <td className="border p-2"><b>Cmd + Space</b> → type “Terminal”</td>
                </tr>
                <tr>
                  <td className="border p-2">Server Linux</td>
                  <td className="border p-2">Login via SSH</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Interface Tour */}
        <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[600ms]
        ">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
            <HelpCircle size={20}/> Understanding the Terminal Interface
          </h2>

          <p className="mt-3">
            When you open terminal, you usually see something like:
          </p>

          <pre className="mt-3 bg-slate-900 text-emerald-400 p-3 rounded-lg text-sm">
            swadeep@barrackpore:~$
          </pre>

          <ul className="mt-4 list-disc list-inside text-sm space-y-1">
            <li><b>swadeep</b> → username</li>
            <li><b>barrackpore</b> → computer name</li>
            <li><b>~</b> → home directory</li>
            <li><b>$</b> → normal user prompt</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="
          bg-rose-50 dark:bg-rose-900/20 border border-rose-400/40
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(244,63,94,0.35)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[800ms]
        ">
          <h2 className="text-lg font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <AlertTriangle size={18}/> Common Beginner Mistakes
          </h2>
          <ul className="mt-3 list-disc list-inside text-sm space-y-1">
            <li>Closing terminal accidentally</li>
            <li>Typing commands in wrong case (Linux is case-sensitive)</li>
            <li>Forgetting to press Enter</li>
          </ul>
        </section>

        {/* Teacher Note */}
        <section className="
          bg-amber-50 dark:bg-amber-900/20 border border-amber-400/40
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(250,204,21,0.35)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[1000ms]
        ">
          <h2 className="text-lg font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <Lightbulb size={18}/> Teacher’s Note
          </h2>
          <p className="mt-2 text-sm">
            Encourage students to open the terminal at least once a day.
            Comfort with the terminal is the true entry ticket into Linux mastery.
          </p>
        </section>

        {/* Mini Checklist */}
        <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(14,165,233,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[1200ms]
        ">
          <h2 className="text-lg font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
            <CheckCircle size={18}/> What You Must Remember
          </h2>
          <ul className="mt-3 list-disc list-inside text-sm space-y-1">
            <li>Terminal = direct control over Linux</li>
            <li>Ctrl + Alt + T opens terminal in most Linux</li>
            <li>Prompt shows user, machine and folder</li>
            <li>Case sensitivity matters</li>
          </ul>
        </section>

      </div>
    );
  }
}
