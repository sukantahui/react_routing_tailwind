// src/components/study/unix/topics/unix-basic/Topic11.jsx
// Topic 11 – Case Sensitivity in Linux File Names

import React, { Component } from "react";

export default class Topic11 extends Component {

    componentDidMount() {
        setTimeout(() => {
            const el = document.getElementById("topic11-root");
            if (el) el.classList.remove("opacity-0", "translate-y-6");
        }, 100);
    }

    render() {
        return (
            <div
                id="topic11-root"
                className="
          opacity-0 translate-y-6
          transition-all duration-700
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
          space-y-10 leading-relaxed
        "
            >

                {/* ================= INTRO ================= */}
                <section className="p-6 rounded-3xl bg-slate-900/70 border border-slate-700 hover:shadow-xl transition-all">
                    <h1 className="text-2xl font-bold text-sky-300 mb-3">
                        Case Sensitivity in Linux File Names
                    </h1>
                    <p className="text-sm text-slate-300">
                        Linux treats <b>uppercase</b> and <b>lowercase</b> letters as completely different characters.
                        This single rule confuses more beginners than any other concept.
                    </p>
                </section>

                {/* ================= CORE CONCEPT ================= */}
                <section className="grid md:grid-cols-3 gap-5">

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-sky-400 transition-all">
                        <h3 className="text-sky-300 font-semibold mb-2">📂 Example Files</h3>
                        <pre className="bg-slate-800 p-3 rounded-lg text-xs text-sky-300 font-mono">
                            report.txt
                            Report.txt
                            REPORT.txt
                        </pre>
                        <p className="text-sm text-slate-300 mt-2">
                            These are <b>three different files</b> in Linux.
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-emerald-400 transition-all">
                        <h3 className="text-emerald-300 font-semibold mb-2">🧠 Why Linux Does This</h3>
                        <p className="text-sm text-slate-300">
                            Linux follows strict POSIX standards where characters are treated
                            exactly as typed — no guessing, no forgiveness.
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-purple-400 transition-all">
                        <h3 className="text-purple-300 font-semibold mb-2">💻 Windows vs Linux</h3>
                        <p className="text-sm text-slate-300">
                            Windows thinks <b>Report.txt = report.txt</b>.
                            Linux strongly disagrees.
                        </p>
                    </div>
                </section>

                {/* ================= POSIX SECTION ================= */}
                <section
                    className="
    mt-12 rounded-3xl border border-sky-500/30
    bg-gradient-to-br from-slate-950 via-slate-900 to-black
    p-6 shadow-xl
    transition-all duration-300
    hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]
    motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
  "
                >
                    <h2 className="text-xl font-semibold text-sky-300 mb-4">
                        POSIX – The Grammar Book of UNIX Systems
                    </h2>

                    <blockquote className="border-l-4 border-sky-400 pl-4 text-slate-300 italic mb-4">
                        POSIX defines how operating systems must behave so programs can run anywhere.
                    </blockquote>

                    <p className="text-sm text-slate-300 leading-relaxed mb-3">
                        <b className="text-sky-300">POSIX</b> stands for <b>Portable Operating System Interface</b>.
                        It is a global standard that ensures Linux, UNIX, BSD and macOS follow the same basic rules.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700 transition-all duration-300 hover:border-sky-400">
                            <h4 className="font-semibold text-sky-300 mb-2">Why POSIX Exists</h4>
                            <p>
                                When Swadeep writes a shell script in Barrackpore, the same script should
                                work in BSD, Linux servers and macOS laptops.
                                POSIX makes this possible.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700 transition-all duration-300 hover:border-sky-400">
                            <h4 className="font-semibold text-sky-300 mb-2">What POSIX Controls</h4>
                            <ul className="list-disc list-inside">
                                <li>File naming rules</li>
                                <li>Command behaviors (ls, cp, rm, pwd)</li>
                                <li>Pipes and redirection</li>
                                <li>Process management</li>
                                <li>Permission system</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-slate-300 transition-all duration-300 hover:border-sky-400">
                        <h4 className="font-semibold text-sky-300 mb-2">POSIX in Action</h4>
                        <pre className="bg-black/80 p-3 rounded-lg text-sky-300 overflow-x-auto">
                            {`ls | grep ".txt" | wc -l`}
                        </pre>
                        <p className="mt-2 text-slate-400">
                            This command behaves identically across Linux, BSD and macOS because of POSIX.
                        </p>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-slate-900/70 border border-slate-700 text-sm text-slate-300 transition-all duration-300 hover:border-sky-400">
                        <h4 className="font-semibold text-sky-300 mb-2">Remember This</h4>
                        <p>
                            POSIX is the <b>grammar book of the UNIX world</b>.
                            Without it, every operating system would speak a different language.
                        </p>
                    </div>
                </section>


                {/* ================= REAL WORLD STORY ================= */}
                <section className="p-6 rounded-3xl bg-slate-900/60 border border-slate-700 hover:shadow-xl transition-all">
                    <h2 className="text-xl font-semibold text-sky-300 mb-3">
                        🏫 Real-World Classroom Story
                    </h2>
                    <p className="text-sm text-slate-300">
                        In Shyamnagar lab, Tuhina saved her project as <b>Project.java</b>.
                        Later she typed:
                    </p>
                    <pre className="bg-slate-800 p-3 rounded-lg text-sky-300 text-sm mt-3">
                        javac project.java
                    </pre>
                    <p className="text-slate-400 text-sm mt-2">
                        Linux replied: <b>file not found</b>.
                        The file was actually named <b>Project.java</b>.
                    </p>
                </section>

                {/* ================= HINT SECTION ================= */}
                <section className="p-5 rounded-2xl bg-slate-800 border border-slate-700 hover:border-sky-400 transition-all text-sm text-slate-300">
                    <h3 className="text-sky-300 font-semibold mb-2">💡 Think About…</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Why does Linux avoid guessing file names?</li>
                        <li>What problems would occur if case was ignored?</li>
                        <li>Try creating files with different cases.</li>
                    </ul>
                </section>

                {/* ================= COMMON PITFALLS ================= */}
                <section className="p-5 rounded-2xl bg-rose-950/30 border border-rose-400/30 hover:shadow-lg transition-all">
                    <h3 className="text-rose-300 font-semibold mb-2">⚠ Common Pitfalls</h3>
                    <ul className="text-sm text-slate-300 list-disc list-inside space-y-1">
                        <li>Typing file names with wrong case.</li>
                        <li>Copying Windows habits into Linux.</li>
                        <li>Renaming files accidentally using different cases.</li>
                    </ul>
                </section>

                {/* ================= BEST PRACTICES ================= */}
                <section className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-400/30 hover:shadow-lg transition-all">
                    <h3 className="text-emerald-300 font-semibold mb-2">🌟 Best Practices</h3>
                    <ul className="text-sm text-slate-300 list-disc list-inside space-y-1">
                        <li>Use lowercase file names everywhere.</li>
                        <li>Avoid spaces; use hyphens or underscores.</li>
                        <li>Be consistent in naming style.</li>
                    </ul>
                </section>

                {/* ================= TEACHER NOTE ================= */}
                <section className="p-6 rounded-3xl bg-sky-950/30 border border-sky-400/30 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all">
                    <h3 className="text-sky-300 font-semibold mb-2">👨‍🏫 Teacher’s Note</h3>
                    <p className="text-sm text-slate-300">
                        Linux is strict because discipline builds precision.
                        Once students respect case sensitivity, their debugging skill level
                        increases immediately.
                    </p>
                </section>

                {/* ================= MINI CHECKLIST ================= */}
                <section className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-400/30 hover:shadow-lg transition-all text-sm text-slate-300">
                    <h3 className="text-emerald-300 font-semibold mb-2">✅ Mini Checklist</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>I understand Linux is case-sensitive.</li>
                        <li>I type file names carefully.</li>
                        <li>I avoid Windows naming habits.</li>
                    </ul>
                </section>

            </div>
        );
    }
}
