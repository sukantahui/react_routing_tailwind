// src/components/study/general/Topic0.jsx
// Topic 1: Computer Viruses & Other Harmful Software
// STUDENT MANUAL VERSION
// React 19 – CLASS-BASED COMPONENT
// Tailwind CSS – ZERO CONFIG

import React, { Component } from "react";

/* =========================================================
   Scoped Animations (Zero Config, Motion Safe)
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(14px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic2 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "rounded-xl border border-slate-200 dark:border-slate-800 " +
      "bg-white dark:bg-slate-900 p-6 shadow-sm " +
      "transition-all duration-300 hover:shadow-md";

    const sectionTitle =
      "text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2";

    return (
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-14 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* ================= HEADER ================= */}
        <header className={`space-y-3 ${reveal}`}>
          <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
            Computer Viruses & Other Harmful Software
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            This page is written as a <strong>student manual</strong>.  
            You can study it alone, revise before exams, and understand
            how computer threats actually work in real life.
          </p>
        </header>

        {/* ================= INTRO ================= */}
        <section className={`${card} ${reveal} animation-delay-[100ms]`}>
          <h2 className={sectionTitle}>What is Harmful Software?</h2>
          <p>
            Harmful software is any program that is intentionally created to
            <strong>damage computers, steal information, disturb users, or cause loss</strong>.
          </p>
          <p className="mt-2">
            Such software is collectively called <strong>Malware</strong>.
            Computer viruses are only one type of malware.
          </p>
        </section>

        {/* ================= WORM ================= */}
        <section className={`${card} ${reveal} animation-delay-[200ms]`}>
          <h2 className={sectionTitle}>1. Worm</h2>
          <p>
            A <strong>worm</strong> is malware that can
            <strong>automatically spread</strong> from one computer to another
            through a network <strong>without user action</strong>.
          </p>

          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li>Does not need a file to attach</li>
            <li>Spreads very fast</li>
            <li>Consumes network bandwidth</li>
          </ul>

          <p className="mt-3 text-sm text-slate-500">
            Example: In a school computer lab, one infected system can slow
            down the entire network.
          </p>

          <p className="mt-2 text-sm">
            <strong>Exam Point:</strong> Worm spreads automatically.
          </p>
        </section>

        {/* ================= TROJAN ================= */}
        <section className={`${card} ${reveal} animation-delay-[300ms]`}>
          <h2 className={sectionTitle}>2. Trojan Horse</h2>
          <p>
            A <strong>Trojan Horse</strong> is malware that looks like
            a useful or genuine program but performs malicious actions
            after installation.
          </p>

          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li>Does not replicate itself</li>
            <li>Enters through pirated or free software</li>
            <li>Creates backdoor access</li>
          </ul>

          <p className="mt-3 text-sm text-slate-500">
            Example: Free games, cracked apps, fake updates.
          </p>

          <p className="mt-2 text-sm">
            <strong>Exam Point:</strong> Trojan does not self-replicate.
          </p>
        </section>

        {/* ================= RANSOMWARE ================= */}
        <section className={`${card} ${reveal} animation-delay-[400ms]`}>
          <h2 className={sectionTitle}>3. Ransomware</h2>
          <p>
            <strong>Ransomware</strong> encrypts files and demands money
            to unlock them.
          </p>

          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li>Locks documents, photos, projects</li>
            <li>Shows payment warning</li>
            <li>No guarantee of recovery</li>
          </ul>

          <p className="mt-3 text-sm">
            <strong>Student Rule:</strong> Always keep backups.
          </p>
        </section>

        {/* ================= SPYWARE ================= */}
        <section className={`${card} ${reveal} animation-delay-[500ms]`}>
          <h2 className={sectionTitle}>4. Spyware</h2>
          <p>
            <strong>Spyware</strong> secretly monitors user activity and
            sends information to attackers.
          </p>

          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li>Tracks browsing habits</li>
            <li>Steals personal data</li>
            <li>Runs silently</li>
          </ul>

          <p className="mt-2 text-sm">
            <strong>Exam Point:</strong> Spyware focuses on monitoring.
          </p>
        </section>

        {/* ================= KEYLOGGER ================= */}
        <section className={`${card} ${reveal} animation-delay-[600ms]`}>
          <h2 className={sectionTitle}>5. Keylogger</h2>
          <p>
            A <strong>keylogger</strong> records every key pressed on the keyboard.
          </p>

          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li>Steals passwords and PINs</li>
            <li>Used in cyber cafés</li>
            <li>Defeats strong passwords</li>
          </ul>

          <p className="mt-2 text-sm">
            <strong>Student Rule:</strong> Never log in on unknown computers.
          </p>
        </section>

        {/* ================= ADWARE ================= */}
        <section className={`${card} ${reveal} animation-delay-[700ms]`}>
          <h2 className={sectionTitle}>6. Adware</h2>
          <p>
            <strong>Adware</strong> displays unwanted advertisements
            and redirects browsers.
          </p>

          <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
            <li>Shows pop-ups</li>
            <li>Slows system</li>
            <li>Often installs spyware</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <section className={`${card} ${reveal} animation-delay-[800ms]`}>
          <h2 className={sectionTitle}>Quick Revision Table</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Worm → Automatic spread</li>
            <li>Trojan → Disguised malware</li>
            <li>Ransomware → File locking</li>
            <li>Spyware → Monitoring</li>
            <li>Keylogger → Password theft</li>
            <li>Adware → Forced ads</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`${card} ${reveal} animation-delay-[900ms] border-l-4 border-indigo-500`}
        >
          <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            Teacher’s Note
          </h2>
          <p className="text-sm">
            Students should remember that <strong>most cyber problems start
            with careless actions</strong>.  
            Awareness and discipline are more powerful than any antivirus.
          </p>
        </section>
      </div>
    );
  }
}
