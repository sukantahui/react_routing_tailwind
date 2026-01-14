// src/components/study/unix/topics/shell-scripting/Topic17.jsx
// Topic 18 – Common Beginner Mistakes in Terminal Usage
// Coder & AccoTax – Barrackpore

import React, { Component } from "react";
import {
    AlertTriangle,
    Lightbulb,
    XCircle,
    Terminal,
    ShieldAlert,
} from "lucide-react";

export default class Topic17 extends Component {

    componentDidMount() {
        document.querySelectorAll(".mistake-card").forEach((el, i) => {
            el.style.animationDelay = `${i * 0.1}s`;
        });
    }

    render() {
        return (
            <div className="space-y-10 leading-relaxed">

                {/* INTRO */}
                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-gradient-to-br from-rose-50 via-white to-rose-100
          dark:from-slate-900 dark:via-slate-950 dark:to-black
          p-6 rounded-3xl border border-rose-300 dark:border-slate-700 shadow-xl">
                    <h1 className="text-2xl font-bold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                        <Terminal className="text-rose-500" />
                        Common Beginner Mistakes in Terminal Usage
                    </h1>
                    <p className="text-slate-700 dark:text-slate-300 mt-3">
                        Every professional once typed a command that broke everything.
                        The difference is — professionals learned from it.
                    </p>
                </section>

                {/* MISTAKE 1 */}
                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-red-600 dark:text-red-300 flex items-center gap-2">
                        <XCircle /> Forgetting where you are
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">
                        Running commands without checking your current folder is like editing the wrong exam paper.
                    </p>
                    <pre className="bg-black/90 text-red-400 p-3 rounded-xl text-sm mt-3">
                        rm report.txt   ❌ (Wrong folder!)
                        pwd             ✅ Always check location first
                    </pre>
                </section>

                {/* MISTAKE 2 */}
                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-amber-50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-2">
                        <AlertTriangle /> Thinking Linux is case-insensitive
                    </h2>
                    <pre className="bg-black/90 text-amber-400 p-3 rounded-xl text-sm mt-3">
                        ls Report.txt   ❌
                        ls report.txt   ✅
                    </pre>
                </section>

                {/* MISTAKE 3 */}
                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-sky-50 dark:bg-slate-900/60 border border-sky-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-sky-700 dark:text-sky-300">
                        Copy-pasting commands blindly from internet
                    </h2>
                    <pre className="bg-black/90 text-sky-400 p-3 rounded-xl text-sm mt-3">
                        sudo rm -rf /   ☠️ NEVER RUN THIS
                    </pre>
                </section>

                {/* MISTAKE 4 */}
                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-emerald-50 dark:bg-slate-900/60 border border-emerald-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                        Using sudo without understanding
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">
                        sudo is not a magic word — it is a loaded gun.
                    </p>
                </section>

                {/* MISTAKE 5 */}
                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-indigo-50 dark:bg-slate-800/60 border border-indigo-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                        Ignoring error messages
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">
                        Errors are teachers — not enemies.
                    </p>
                </section>

                {/* MISTAKE 6 */}
                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-fuchsia-50 dark:bg-slate-900/60 border border-fuchsia-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-300">
                        Spaces in filenames without quotes
                    </h2>
                    <pre className="bg-black/90 text-fuchsia-400 p-3 rounded-xl text-sm mt-3">
                        cd My Files    ❌
                        cd "My Files"  ✅
                    </pre>
                </section>

                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
bg-rose-50 dark:bg-slate-900/60 border border-rose-200 dark:border-slate-700
p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-rose-700 dark:text-rose-300">
                        Always staying logged in as root
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">
                        Root is not your classroom bench — it is the principal’s office.
                        One wrong move can suspend the entire system.
                    </p>
                </section>

                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
bg-orange-50 dark:bg-slate-900/60 border border-orange-200 dark:border-slate-700
p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-orange-700 dark:text-orange-300">
                        Deleting files using wildcards without preview
                    </h2>
                    <pre className="bg-black/90 text-orange-400 p-3 rounded-xl text-sm mt-3">
                        rm *.txt   ❌ (Did you check what will be deleted?)
                        ls *.txt   ✅ Always preview first
                    </pre>
                </section>


                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
bg-cyan-50 dark:bg-slate-900/60 border border-cyan-200 dark:border-slate-700
p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">
                        Typing long paths manually
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">
                        Professionals don’t type — they press <b>Tab</b>.
                    </p>
                </section>

                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
bg-yellow-50 dark:bg-slate-900/60 border border-yellow-200 dark:border-slate-700
p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
                        Modifying config files without backup
                    </h2>
                    <pre className="bg-black/90 text-yellow-400 p-3 rounded-xl text-sm mt-3">
                        cp sshd_config sshd_config.bak   ✅ Always backup first
                    </pre>
                </section>

                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
bg-purple-50 dark:bg-slate-900/60 border border-purple-200 dark:border-slate-700
p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                        Killing processes without checking PID
                    </h2>
                    <pre className="bg-black/90 text-purple-400 p-3 rounded-xl text-sm mt-3">
                        kill 1234   ❌ (Who is 1234?)
                        ps aux | grep firefox   ✅ Identify first
                    </pre>
                </section>

                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700
p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                        Trusting GUI blindly instead of learning terminal
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">
                        GUI hides mistakes. Terminal exposes truth.
                    </p>
                </section>




                {/* TEACHER NOTE */}
                <section className="mistake-card motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-300 dark:border-indigo-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                        <Lightbulb /> Teacher’s Note
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">
                        Mistakes don’t make students weak — ignoring them does.
                        Teach your terminal to respect you.
                    </p>
                </section>

            </div>
        );
    }
}
