// src/components/study/unix/topics/shell-scripting/Topic14.jsx
// Topic 15 – Root User vs Normal User – Concept and Importance
// Coder & AccoTax – Barrackpore

import React, { Component } from "react";
import { Shield, AlertTriangle, User, Key } from "lucide-react";

export default class Topic14 extends Component {
  componentDidMount() {
    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((sec, i) => {
      sec.style.animationDelay = `${i * 0.12}s`;
    });
  }

  render() {
    return (
      <div className="space-y-10 leading-relaxed">

        {/* ===== HERO ===== */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-gradient-to-br from-slate-100 via-slate-50 to-white
          dark:from-slate-900 dark:via-slate-950 dark:to-black
          p-6 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-xl">
          <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-300 flex items-center gap-2">
            <Shield className="text-emerald-500" /> Root User vs Normal User – Power & Responsibility
          </h1>
          <p className="text-slate-700 dark:text-slate-300 mt-3">
            Linux does not treat all users equally. Some are learners.  
            One is the ruler. That ruler is called the <b>root user</b>.
          </p>
        </section>

        {/* ===== THEORY ===== */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-300 mb-3">
            🔐 What is Root User?
          </h2>

          <p className="text-slate-700 dark:text-slate-300">
            The <b>root user</b> is the administrator of the Linux system.
            It can read, modify, delete or destroy <i>anything</i> — even the system itself.
          </p>

          <ul className="mt-4 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
            <li>• Root can delete system files.</li>
            <li>• Root can stop servers.</li>
            <li>• Root can change any user password.</li>
            <li>• Root can kill any running process.</li>
          </ul>
        </section>

        {/* ===== STORY ===== */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-sky-50 dark:bg-slate-800/60 border border-sky-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3">
            🎭 A Classroom Story – Swadeep & The Red Button
          </h2>

          <p className="text-slate-700 dark:text-slate-300">
            Swadeep once logged in as root in the Barrackpore lab.
            He typed:
          </p>

          <pre className="bg-black/90 text-red-400 p-4 rounded-xl mt-3 text-sm">
rm -rf /
          </pre>

          <p className="text-slate-700 dark:text-slate-300 mt-3">
            The entire system vanished.  
            No warning. No recycle bin.  
            Root does not ask — it obeys.
          </p>
        </section>

        {/* ===== NORMAL USER ===== */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-emerald-50 dark:bg-slate-900/60 border border-emerald-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
            <User /> Normal User – The Safe Mode
          </h2>

          <p className="text-slate-700 dark:text-slate-300">
            A normal user can:
          </p>

          <ul className="mt-3 text-sm space-y-2 text-slate-700 dark:text-slate-300">
            <li>✔ Edit personal files</li>
            <li>✔ Install software using sudo</li>
            <li>✘ Modify system folders</li>
            <li>✘ Destroy the OS accidentally</li>
          </ul>
        </section>

        {/* ===== SUDO ===== */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-yellow-50 dark:bg-slate-800/60 border border-yellow-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-3 flex items-center gap-2">
            <Key /> What is sudo?
          </h2>

          <p className="text-slate-700 dark:text-slate-300">
            <b>sudo</b> means:
          </p>

          <blockquote className="mt-2 italic text-slate-600 dark:text-slate-400">
            “Run this command as root — but only this one.”
          </blockquote>
        </section>

        {/* ===== PITFALLS ===== */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-rose-50 dark:bg-slate-900/60 border border-rose-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-rose-700 dark:text-rose-300 mb-3 flex items-center gap-2">
            <AlertTriangle /> Common Pitfalls
          </h2>
          <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
            <li>❌ Staying logged in as root</li>
            <li>❌ Running unknown scripts with sudo</li>
            <li>❌ Using rm -rf casually</li>
            <li>❌ Editing system config without backup</li>
          </ul>
        </section>

        {/* ===== TEACHER NOTE ===== */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-300 dark:border-indigo-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
            👨‍🏫 Teacher’s Note
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            Root is not a right — it is a responsibility.  
            Professionals treat root like a loaded weapon.
          </p>
        </section>

        {/* ===== CHECKLIST ===== */}
        <section className="reveal-section motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3">
            ✅ Mini Checklist
          </h2>
          <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
            <li>✔ Always work as normal user</li>
            <li>✔ Use sudo only when needed</li>
            <li>✔ Think before pressing Enter</li>
            <li>✔ Backup before system changes</li>
          </ul>
        </section>

      </div>
    );
  }
}
