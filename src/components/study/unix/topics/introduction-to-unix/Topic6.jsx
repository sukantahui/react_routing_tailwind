// src/components/study/unix/topics/basics/Topic6.jsx
// Topic 6 – Popular Linux Distributions and Where They Are Used
// React 19 – Class Based Component Only

import React, { Component } from "react";

export default class Topic6 extends Component {
    componentDidMount() {
        // triggers animation on mount (pure CSS based)
        this.setState({});
    }

    render() {
        return (
            <div className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-200">

                {/* ======================================================
            INTRO CARD
        ====================================================== */}
                <section className="
          rounded-3xl border border-sky-400/30
          bg-gradient-to-br from-sky-50 via-white to-slate-100
          dark:from-slate-950 dark:via-slate-900 dark:to-black
          p-6 shadow-xl
          transition-all duration-300
          hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
        ">
                    <h1 className="text-2xl font-bold text-sky-400 mb-3">
                        Popular Linux Distributions & Where They Are Used
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Linux is not a single operating system. It is a family of systems called
                        <b> distributions (distros)</b> — each crafted for different real-world needs.
                    </p>
                </section>

                {/* ======================================================
    WHAT IS LINUS DISTRIBUTION?
====================================================== */}
                <section className="topic-card animation-delay-[1600ms]">
                    <h2 className="topic-title text-emerald-400">
                        🧠 What is “Linus Distribution”?
                    </h2>

                    <p>
                        Many beginners often say,
                        <i>“Sir, I installed Linus Distribution.”</i> 😄
                        But here is the truth:
                    </p>

                    <p className="mt-2 font-semibold text-sky-300">
                        ❌ There is NO Linux distribution called <b>“Linus Distribution”</b>.
                    </p>

                    <p className="mt-3">
                        The word they actually mean is <b>Linux Distribution</b>, named after
                        <b> Linus Torvalds</b> — the creator of the Linux kernel.
                    </p>

                    <ul className="topic-list mt-3">
                        <li><b>Prototype:</b> GNU/Linux Operating System</li>
                        <li><b>Return Type:</b> Fully working OS built on Linux kernel</li>
                        <li><b>Purpose:</b> Combine Linux kernel + GNU tools + Desktop Environment</li>
                        <li><b>When Used:</b> Servers, laptops, supercomputers, mobiles</li>
                    </ul>

                    <div className="mt-4 p-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-sm">
                        <p className="font-semibold text-amber-400">🎯 Funny Reality</p>
                        <p>
                            When Swadeep from Barrackpore said,
                            <i>“Sir I installed Linus OS yesterday!”</i> —
                            what he really installed was probably <b>Ubuntu Linux</b>.
                            Linus didn’t make Ubuntu — he only made the kernel.
                        </p>
                    </div>

                    <div className="mt-4 p-4 rounded-xl border border-sky-400/40 bg-sky-50 dark:bg-sky-900/20">
                        <p className="text-sky-400 font-semibold mb-1">💡 Remember</p>
                        <p>
                            Linus created the engine (Linux Kernel).
                            Companies & communities build the car (Distributions).
                        </p>
                    </div>
                </section>


                {/* ======================================================
            UBUNTU
        ====================================================== */}
                <section className="topic-card animation-delay-[200ms]">
                    <h2 className="topic-title text-orange-400">🐧 Ubuntu — The Friendly All-Rounder</h2>

                    <p>
                        Ubuntu is the most popular Linux distribution in classrooms, homes and startups.
                        When Swadeep installed Linux for the first time in Barrackpore, he chose Ubuntu —
                        because it “just works”.
                    </p>

                    <ul className="topic-list">
                        <li><b>Prototype / Signature:</b> Desktop-focused GNU/Linux distribution</li>
                        <li><b>Return Type:</b> Complete operating system environment</li>
                        <li><b>Purpose:</b> Easy-to-use Linux for beginners & professionals</li>
                        <li><b>Used in:</b> Schools, laptops, cloud servers, startups</li>
                    </ul>
                </section>

                {/* ======================================================
            FEDORA
        ====================================================== */}
                <section className="topic-card animation-delay-[400ms]">
                    <h2 className="topic-title text-purple-400">🎓 Fedora — The Innovation Lab</h2>

                    <p>
                        Fedora is like the science lab of Linux.
                        When Tuhina learns about new technologies in Shyamnagar, Fedora always shows them first.
                    </p>

                    <ul className="topic-list">
                        <li><b>Prototype:</b> Cutting-edge GNU/Linux platform</li>
                        <li><b>Purpose:</b> Testing latest Linux features</li>
                        <li><b>Used in:</b> Developers, researchers, RedHat engineers</li>
                    </ul>
                </section>

                {/* ======================================================
            DEBIAN
        ====================================================== */}
                <section className="topic-card animation-delay-[600ms]">
                    <h2 className="topic-title text-red-400">🏛 Debian — The Old Wise Professor</h2>

                    <p>
                        Debian is the grandfather of modern Linux distributions.
                        When Abhronila sets up a school server in Naihati, she trusts Debian because it never breaks.
                    </p>

                    <ul className="topic-list">
                        <li><b>Prototype:</b> Ultra-stable GNU/Linux base</li>
                        <li><b>Purpose:</b> Stability and reliability</li>
                        <li><b>Used in:</b> Government servers, research labs, hosting companies</li>
                    </ul>
                </section>

                {/* ======================================================
            CENTOS
        ====================================================== */}
                <section className="topic-card animation-delay-[800ms]">
                    <h2 className="topic-title text-emerald-400">🏢 CentOS — The Corporate Workhorse</h2>

                    <p>
                        CentOS is what banks and companies use.
                        When Devangshu handles a corporate data server in Ichapur, CentOS is always the choice.
                    </p>

                    <ul className="topic-list">
                        <li><b>Prototype:</b> Enterprise-grade Linux system</li>
                        <li><b>Purpose:</b> Server stability & business continuity</li>
                        <li><b>Used in:</b> Data centers, banks, ISP infrastructure</li>
                    </ul>
                </section>

                {/* ======================================================
            COMPARISON TABLE
        ====================================================== */}
                <section className="topic-card animation-delay-[1000ms]">
                    <h2 className="topic-title text-sky-400">📊 Comparison Snapshot</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-slate-700 rounded-xl">
                            <thead className="bg-slate-800 text-sky-300">
                                <tr>
                                    <th className="p-2">Distro</th>
                                    <th className="p-2">Best For</th>
                                    <th className="p-2">Stability</th>
                                    <th className="p-2">Target Users</th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-900 text-slate-200">
                                <tr><td className="p-2">Ubuntu</td><td className="p-2">Beginners</td><td className="p-2">High</td><td className="p-2">Students, Startups</td></tr>
                                <tr><td className="p-2">Fedora</td><td className="p-2">Innovation</td><td className="p-2">Medium</td><td className="p-2">Developers</td></tr>
                                <tr><td className="p-2">Debian</td><td className="p-2">Servers</td><td className="p-2">Very High</td><td className="p-2">Institutions</td></tr>
                                <tr><td className="p-2">CentOS</td><td className="p-2">Enterprises</td><td className="p-2">Extreme</td><td className="p-2">Corporates</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ======================================================
    DOWNLOAD POPULAR LINUX DISTRIBUTIONS
====================================================== */}
                <section className="topic-card animation-delay-[1800ms]">
                    <h2 className="topic-title text-cyan-400">
                        ⬇ Download Popular Linux Distributions
                    </h2>

                    <p className="mb-3">
                        These are the most trusted Linux distributions used in schools, colleges,
                        offices and servers across India and worldwide.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">

                        {/* Ubuntu */}
                        <div className="download-card hover:shadow-lg">
                            <h3 className="font-semibold text-amber-400">🐧 Ubuntu</h3>
                            <p className="text-sm mt-1">
                                Best for beginners. Used in CNAT labs.
                            </p>
                            <a
                                href="https://ubuntu.com/download"
                                target="_blank"
                                rel="noreferrer"
                                className="download-link text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                            >
                                https://ubuntu.com/download
                            </a>
                        </div>

                        {/* Fedora */}
                        <div className="download-card hover:shadow-lg">
                            <h3 className="font-semibold text-amber-400">🔥 Fedora</h3>
                            <p className="text-sm mt-1">
                                Latest technologies, used by RedHat developers.
                            </p>
                            <a
                                href="https://ubuntu.com/download"
                                target="_blank"
                                rel="noreferrer"
                                className="download-link text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                            >
                                https://getfedora.org
                            </a>
                        </div>

                        {/* Debian */}
                        <div className="download-card hover:shadow-lg">
                            <h3 className="font-semibold text-amber-400">📦 Debian</h3>
                            <p className="text-sm mt-1">
                                Rock-solid stability. Backbone of many servers.
                            </p>
                            <a
                                href="https://ubuntu.com/download"
                                target="_blank"
                                rel="noreferrer"
                                className="download-link text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                            >
                                https://www.debian.org/distrib/
                            </a>
                        </div>

                        {/* CentOS Stream */}
                        <div className="download-card hover:shadow-lg">
                            <h3 className="font-semibold text-amber-400">🏢 CentOS Stream</h3>
                            <p className="text-sm mt-1">
                                Enterprise-grade Linux, used in data centers.
                            </p>
                            <a
                                href="https://ubuntu.com/download"
                                target="_blank"
                                rel="noreferrer"
                                className="download-link text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                            >
                                https://www.centos.org/download/
                            </a>
                        </div>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-sm">
                        <p className="font-semibold text-sky-400">💡 Student Tip</p>
                        <p>
                            Start with <b>Ubuntu</b>. Once confident, try Fedora or Debian.
                            This is exactly how students like Tuhina & Debangshu progressed.
                        </p>
                    </div>
                </section>


                {/* ======================================================
            TEACHER NOTE
        ====================================================== */}
                <section className="teacher-note animation-delay-[1200ms]">
                    <h3 className="teacher-title">👨‍🏫 Teacher’s Note</h3>
                    <p>
                        Students often think Linux is one OS.
                        Remember — Linux is a *family of philosophies*, not just software.
                        Choose your distro based on purpose, not popularity.
                    </p>
                </section>

                {/* ======================================================
            MINI CHECKLIST
        ====================================================== */}
                <section className="topic-card animation-delay-[1400ms]">
                    <h3 className="topic-title text-amber-400">✔ Mini Checklist</h3>
                    <ul className="topic-list">
                        <li>Linux comes in distributions (distros)</li>
                        <li>Ubuntu = Friendly beginner OS</li>
                        <li>Fedora = Latest technology lab</li>
                        <li>Debian = Stability king</li>
                        <li>CentOS = Enterprise server OS</li>
                    </ul>
                </section>

            </div>
        );
    }
}

/* ======================================================
   INLINE STYLES — ZERO CONFIG ANIMATION SYSTEM
====================================================== */
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
.topic-card{
  @apply rounded-3xl border border-slate-700 bg-slate-100 dark:bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.35)];
}
.topic-title{ @apply text-lg font-semibold mb-2; }
.topic-list{ @apply list-disc ml-6 text-sm space-y-1; }
.teacher-note{ @apply rounded-2xl border border-amber-400/40 bg-amber-50 dark:bg-amber-900/20 p-5 shadow-md transition-all hover:shadow-[0_0_20px_rgba(251,191,36,0.35)]; }
.teacher-title{ @apply text-amber-400 font-semibold mb-2; }
`;
document.head.appendChild(style);
