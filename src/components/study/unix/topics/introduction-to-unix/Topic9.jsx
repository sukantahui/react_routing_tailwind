// src/components/study/unix/topics/unix/Topic9.jsx
// Topic 9 – Basic Navigation Commands: pwd, ls, cd – with live examples

import React, { Component } from "react";
import {
    FolderOpen,
    Terminal,
    Lightbulb,
    AlertTriangle,
    CheckCircle,
    HelpCircle,
} from "lucide-react";

export default class Topic9 extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-200">

                {/* Intro */}
                <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]">
                    <h1 className="text-3xl font-bold text-sky-600 dark:text-sky-400">
                        Basic Navigation Commands – pwd, ls, cd
                    </h1>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Navigation is the foundation of all Linux work. If you cannot
                        move inside folders, you cannot run programs, manage files or debug servers.
                    </p>
                </section>

                {/* PWD */}
                <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[200ms]
        ">
                    <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
                        <Terminal size={20} /> Command: pwd
                    </h2>
                    <p className="mt-3">
                        <b>Full Form:</b> <span className="text-sky-500 font-semibold">Present Working Directory</span>
                    </p>
                    <p className="mt-3"><b>Prototype / Signature:</b> <code>pwd</code></p>
                    <p><b>Return type:</b> Prints absolute path (string)</p>
                    <p><b>Purpose:</b> Shows your current working directory.</p>

                    <pre className="mt-3 bg-slate-900 text-emerald-400 p-3 rounded-lg text-sm">
                        swadeep@barrackpore:~$ pwd
                        /home/swadeep
                    </pre>

                    <p className="mt-2 text-sm">
                        If Swadeep is working inside a school lab in Ichapur,
                        <code>pwd</code> instantly tells him where he is inside the system tree.
                    </p>
                </section>

                {/* LS */}
                <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[400ms]
        ">
                    <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <FolderOpen size={20} /> Command: ls
                    </h2>

                    <p><b>Prototype:</b> <code>ls [options] [directory]</code></p>
                    <p><b>Purpose:</b> Lists files & folders.</p>

                    <pre className="mt-3 bg-slate-900 text-emerald-400 p-3 rounded-lg text-sm">
                        swadeep@barrackpore:~$ ls
                        Documents  Downloads  notes.txt
                    </pre>

                    <p className="mt-2 text-sm">Common options:</p>
                    <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                        <li><code>ls -l</code> → detailed list</li>
                        <li><code>ls -a</code> → include hidden files</li>
                        <li><code>ls -lh</code> → human readable size</li>
                    </ul>
                </section>

                {/* CD */}
                <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[600ms]
        ">
                    <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                        <HelpCircle size={20} /> Command: cd
                    </h2>
                    <p className="mt-3">
                        <b>Full Form:</b> <span className="text-purple-500 font-semibold">Change Directory</span>
                    </p>
                    <p><b>Prototype:</b> <code>cd [directory]</code></p>
                    <p><b>Purpose:</b> Changes your location.</p>

                    <pre className="mt-3 bg-slate-900 text-emerald-400 p-3 rounded-lg text-sm">
                        swadeep@barrackpore:~$ cd Documents
                        swadeep@barrackpore:~/Documents$
                    </pre>

                    <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                        <li><code>cd ..</code> → move one level up</li>
                        <li><code>cd ~</code> → go home</li>
                        <li><code>cd /</code> → root directory</li>
                    </ul>
                </section>

                <section
                    className="
    mt-10 p-6 rounded-3xl
    bg-slate-900/70 border border-slate-700
    transition-all duration-300
    hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]
  "
                >
                    <h3 className="text-lg font-semibold text-sky-300 mb-4">
                        📌 Why These Full Forms Matter
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        When Swadeep understands the meaning behind commands, he stops memorizing
                        blindly and starts thinking like a system engineer.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4 text-sm">

                        <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-sky-400 transition-all">
                            <p className="text-sky-300 font-semibold">pwd</p>
                            <p className="text-slate-300">Present Working Directory</p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-400 transition-all">
                            <p className="text-emerald-300 font-semibold">ls</p>
                            <p className="text-slate-300">List Segment</p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-purple-400 transition-all">
                            <p className="text-purple-300 font-semibold">cd</p>
                            <p className="text-slate-300">Change Directory</p>
                        </div>

                    </div>

                    <blockquote className="mt-6 pl-4 border-l-4 border-sky-500 text-slate-400 italic">
                        He no longer memorizes commands —
                        he understands the meaning behind them.
                        That is how professionals are created, not button-pressers.
                    </blockquote>
                </section>


                {/* Common Pitfalls */}
                <section className="
          bg-rose-50 dark:bg-rose-900/20 border border-rose-400/40
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(244,63,94,0.35)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[800ms]
        ">
                    <h2 className="text-lg font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                        <AlertTriangle size={18} /> Common Mistakes
                    </h2>
                    <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                        <li>Typing wrong case: <code>Documents</code> ≠ <code>documents</code></li>
                        <li>Using spaces without quotes</li>
                        <li>Forgetting folder names</li>
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
                        <Lightbulb size={18} /> Teacher’s Note
                    </h2>
                    <p className="mt-2 text-sm">
                        Ask students to practice navigation every day. Mastery of <code>pwd</code>, <code>ls</code> and <code>cd</code>
                        separates beginners from professionals.
                    </p>
                </section>

                {/* Checklist */}
                <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(14,165,233,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[1200ms]
        ">
                    <h2 className="text-lg font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
                        <CheckCircle size={18} /> What You Must Remember
                    </h2>
                    <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                        <li><code>pwd</code> shows your location</li>
                        <li><code>ls</code> lists contents</li>
                        <li><code>cd</code> moves you around</li>
                        <li>Paths are case-sensitive</li>
                    </ul>
                </section>

            </div>
        );
    }
}
