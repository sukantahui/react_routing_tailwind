// src/components/study/unix/topics/shell-scripting/Topic15.jsx
// Topic 16 – Understanding Shell Prompt Symbols & Working Directory Display
// Coder & AccoTax – Barrackpore

import React, { Component } from "react";
import { Terminal, MapPin, User, AlertCircle } from "lucide-react";

export default class Topic15 extends Component {

  componentDidMount() {
    document.querySelectorAll(".reveal-section").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.12}s`;
    });
  }

  render() {
    return (
      <div className="space-y-10 leading-relaxed">

        {/* HERO */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-gradient-to-br from-slate-100 via-slate-50 to-white
          dark:from-slate-900 dark:via-slate-950 dark:to-black
          p-6 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-xl">
          <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-300 flex items-center gap-2">
            <Terminal className="text-emerald-500" />
            Shell Prompt Symbols & Working Directory Display
          </h1>
          <p className="text-slate-700 dark:text-slate-300 mt-3">
            The shell prompt is not decoration.  
            It is a **live status board** telling you who you are, where you are,
            and how dangerous your next command could be.
          </p>
        </section>

        {/* THEORY */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-300 mb-3">
            🔍 What is a Shell Prompt?
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            The shell prompt is the text shown before every command.  
            It displays:
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>• Your username</li>
            <li>• Your computer name</li>
            <li>• Your current folder (working directory)</li>
            <li>• Your privilege level (normal user or root)</li>
          </ul>
        </section>

        {/* PROMPT EXAMPLES */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-sky-50 dark:bg-slate-800/60 border border-sky-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3">
            🧩 Typical Prompt Examples
          </h2>

          <pre className="bg-black/90 text-emerald-400 p-4 rounded-xl text-sm">
swadeep@linux-pc:~/Documents$
          </pre>

          <p className="text-slate-700 dark:text-slate-300 mt-3">
            Breakdown:
          </p>

          <ul className="mt-3 text-sm space-y-2 text-slate-700 dark:text-slate-300">
            <li><b>swadeep</b> → current user</li>
            <li><b>linux-pc</b> → system name</li>
            <li><b>~/Documents</b> → present working directory</li>
            <li><b>$</b> → normal user</li>
          </ul>
        </section>

        {/* ROOT SYMBOL */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-rose-50 dark:bg-slate-900/60 border border-rose-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-rose-700 dark:text-rose-300 mb-3 flex items-center gap-2">
            <AlertCircle /> The Dangerous Symbol – #
          </h2>

          <pre className="bg-black/90 text-red-400 p-4 rounded-xl text-sm">
root@server:/etc#
          </pre>

          <p className="text-slate-700 dark:text-slate-300 mt-3">
            The symbol <b>#</b> means:
          </p>

          <blockquote className="italic text-slate-600 dark:text-slate-400 mt-2">
            “You are root. You can break the entire system.”
          </blockquote>
        </section>

        {/* STORY */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-amber-50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-3">
            📖 Story – Tuhina & the Disappearing Folder
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            Tuhina once saw:
          </p>

          <pre className="bg-black/90 text-red-400 p-4 rounded-xl text-sm">
root@lab-pc:/home#
rm -rf student-projects
          </pre>

          <p className="mt-3 text-slate-700 dark:text-slate-300">
            The folder vanished forever.  
            She ignored the <b>#</b> symbol — the system did not forgive.
          </p>
        </section>

        {/* BEST PRACTICES */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-emerald-50 dark:bg-slate-900/60 border border-emerald-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
            🌟 Best Practices
          </h2>
          <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
            <li>✔ Always check the last symbol: <b>$</b> or <b>#</b></li>
            <li>✔ Never stay logged in as root</li>
            <li>✔ Use sudo instead of full root session</li>
            <li>✔ Customize your prompt to show folder clearly</li>
          </ul>
        </section>

        {/* CHECKLIST */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3">
            ✅ Mini Checklist
          </h2>
          <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
            <li>✔ $ means safe user mode</li>
            <li>✔ # means system-level danger</li>
            <li>✔ Prompt always shows your location</li>
            <li>✔ Never ignore the prompt symbols</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-300 dark:border-indigo-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
            👨‍🏫 Teacher’s Note
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            Professionals never rush commands.
            First they read the prompt — then they act.
          </p>
        </section>

      </div>
    );
  }
}
