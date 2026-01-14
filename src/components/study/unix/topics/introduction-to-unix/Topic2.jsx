// src/components/study/unix/topics/unix-intro/Topic2.jsx
// Topic 3 – Role of the Kernel: Process, Memory & Device Management (Conceptual)

import React, { Component } from "react";
import { Lightbulb, AlertTriangle, CheckCircle2, Cpu } from "lucide-react";

const styles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic2 extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 120);
  }

  render() {
    return (
      <div className="space-y-12 leading-relaxed text-slate-800 dark:text-slate-200">
        <style>{styles}</style>

        {/* ===================== INTRO ===================== */}
        <section
          className={`bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow transition-all duration-700 hover:shadow-xl motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] ${
            this.state.visible ? "opacity-100" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-2xl font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2">
            <Cpu size={22} />
            Role of the Kernel – The Brain of UNIX & Linux
          </h1>

          <p className="mt-3">
            If UNIX or Linux is a city like Barrackpore, then the <b>Kernel is the Chairman, Police, Traffic Controller,
            and Power Department combined</b>.  
            You never see it directly — but without it, nothing works.
          </p>
        </section>

        {/* ===================== KERNEL STORY ===================== */}
        <section className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            What is the Kernel?
          </h2>

          <p className="mt-2">
            The kernel is the <b>core program</b> of an operating system.
            It stays in memory from the moment the system boots until shutdown.
          </p>

          <p className="mt-2">
            When Swadeep clicks on a file, when Tuhina opens Chrome, when Abhronila plugs a pen drive —
            the kernel is the invisible worker handling everything.
          </p>

          <div className="mt-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-300 dark:border-slate-600 text-sm">
            <b>Prototype / Signature:</b> Kernel is not a function — it is a resident system program  
            <b>Return Type:</b> Continuous system control  
            <b>Purpose:</b> Manage CPU, Memory, Hardware, and System Security  
            <b>Used when & why:</b> Every time a program runs or hardware is accessed
          </div>
        </section>

        {/* ===================== PROCESS MANAGEMENT ===================== */}
        <section className="grid md:grid-cols-3 gap-6">
          {[
            ["Process Management", "Kernel decides which program runs, for how long, and switches tasks smoothly."],
            ["Memory Management", "Kernel allocates RAM, protects programs from each other, avoids crashes."],
            ["Device Management", "Keyboard, mouse, printer, pendrive — kernel speaks to all hardware."]
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]"
            >
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">
                {item[0]}
              </h3>
              <p className="mt-2 text-sm">{item[1]}</p>
            </div>
          ))}
        </section>

        {/* ===================== REAL WORLD ANALOGY ===================== */}
        <section className="bg-indigo-50 dark:bg-slate-900/70 border border-indigo-200 dark:border-indigo-700 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-indigo-600">
            Real-World Analogy
          </h2>

          <p className="mt-2">
            Imagine Debangshu is cooking, Swadeep is watching YouTube,
            and Abhronila is copying files from pendrive.
          </p>

          <p className="mt-2">
            The kernel ensures:
          </p>

          <ul className="list-disc ml-6 mt-2 text-sm">
            <li>Everyone gets CPU time.</li>
            <li>No one steals another’s memory.</li>
            <li>Keyboard & pendrive respond correctly.</li>
          </ul>
        </section>

        {/* ===================== COMMON PITFALLS ===================== */}
        <section className="bg-rose-50 dark:bg-slate-900/70 border border-rose-200 dark:border-rose-700 rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-rose-500 flex items-center gap-2">
            <AlertTriangle size={18} /> Common Pitfalls
          </h2>
          <ul className="mt-3 list-disc ml-6 text-sm">
            <li>Thinking kernel is same as shell — shell is only interface.</li>
            <li>Believing apps directly control hardware — only kernel can.</li>
            <li>Ignoring kernel updates — they fix security holes.</li>
          </ul>
        </section>

        {/* ===================== BEST PRACTICES ===================== */}
        <section className="bg-emerald-50 dark:bg-slate-900/70 border border-emerald-200 dark:border-emerald-700 rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-emerald-600 flex items-center gap-2">
            <CheckCircle2 size={18} /> Best Practices
          </h2>
          <ul className="mt-3 list-disc ml-6 text-sm">
            <li>Understand kernel concept before learning commands.</li>
            <li>Never force-kill system processes casually.</li>
            <li>Respect memory limits — slow systems are kernel warnings.</li>
          </ul>
        </section>

        {/* ===================== HINT SECTION ===================== */}
        <section className="bg-indigo-50 dark:bg-slate-900/70 border border-indigo-200 dark:border-indigo-700 rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-indigo-600 flex items-center gap-2">
            <Lightbulb size={18} /> Think About…
          </h2>
          <p className="mt-2 text-sm">
            Observe what happens when too many apps are opened.
            Who decides which one slows down first?
          </p>
        </section>

        {/* ===================== MINI CHECKLIST ===================== */}
        <section className="bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-sky-600">
            Mini Checklist
          </h2>
          <ul className="mt-3 list-disc ml-6 text-sm">
            <li>Kernel is heart of OS.</li>
            <li>Manages processes, memory & devices.</li>
            <li>Runs always in background.</li>
            <li>All hardware talks through kernel.</li>
          </ul>
        </section>

      </div>
    );
  }
}
