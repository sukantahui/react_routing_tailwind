// src/components/study/unix/topics/Topic13.jsx
import React, { Component } from "react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(16px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic13 extends Component {
    render() {
        return (
            <div className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-200">

                <style>{animationStyles}</style>

                {/* ================= INTRO ================= */}
                <section className="
          bg-white dark:bg-slate-900
          border border-sky-400/30 rounded-3xl p-6 shadow-xl
          motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
        ">
                    <h1 className="text-2xl font-bold text-sky-500 mb-3">
                        Environment Variables – <span className="text-emerald-400">PATH</span> Explained
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        When Linux finds a command, it doesn’t search everywhere.
                        It follows a secret roadmap called <b>PATH</b>.
                    </p>
                </section>

                {/* ================= THEORY ================= */}
                <section className="grid md:grid-cols-2 gap-6">

                    <div className="
            p-5 rounded-2xl border border-slate-300 dark:border-slate-700
            bg-slate-50 dark:bg-slate-800
            transition-all duration-300 hover:shadow-lg
            motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
          ">
                        <h2 className="text-lg font-semibold text-emerald-400 mb-2">What is PATH?</h2>
                        <p className="text-sm">
                            <b>PATH</b> is an environment variable that stores a list of directories.
                            Linux searches these folders in order to find commands.
                        </p>

                        <pre className="mt-3 bg-black text-emerald-400 p-3 rounded-lg text-sm">
                            {`echo $PATH`}
                        </pre>
                    </div>

                    <div className="
            p-5 rounded-2xl border border-slate-300 dark:border-slate-700
            bg-slate-50 dark:bg-slate-800
            transition-all duration-300 hover:shadow-lg
            motion-safe:animate-[fadeSlideUp_1.2s_ease-out_forwards]
          ">
                        <h2 className="text-lg font-semibold text-sky-400 mb-2">How PATH Works</h2>
                        <p className="text-sm">
                            When Tuhina types <code>ls</code>, Linux checks folders in PATH one by one
                            until it finds the program file.
                        </p>

                        <pre className="mt-3 bg-black text-sky-300 p-3 rounded-lg text-sm">
                            {`/usr/bin:/bin:/usr/local/bin`}
                        </pre>
                    </div>
                </section>

                {/* ================= STORY ================= */}
                <section className="
          p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-white
          dark:from-slate-800 dark:to-slate-900
          border border-emerald-400/30
          transition-all duration-300 hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_1.4s_ease-out_forwards]
        ">
                    <h2 className="text-lg font-semibold text-emerald-400 mb-3">
                        Think Like a Professional
                    </h2>
                    <p className="text-sm">
                        Abhronila installed a new tool in Barrackpore, but Linux said:
                        <i>“command not found”</i>.
                        The tool was there — but PATH didn’t know its address.
                    </p>
                </section>

                {/* ================= PATH MANAGEMENT – PROFESSIONAL LEVEL ================= */}
                <section className="
  p-6 rounded-3xl
  bg-gradient-to-br from-yellow-50 to-white
  dark:from-slate-800 dark:to-slate-900
  border border-yellow-400/30
  transition-all duration-300 hover:shadow-xl
  motion-safe:animate-[fadeSlideUp_1.6s_ease-out_forwards]
">

                    <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                        Editing & Managing PATH – Professional Workflow
                    </h2>

                    <p className="text-sm mb-3">
                        PATH is not magic. It is simply a list of folders separated by colon (<b>:</b>).
                        Linux searches them from left to right — like reading a book.
                    </p>

                    <pre className="bg-black text-yellow-300 p-3 rounded-lg text-sm mb-3">
                        {`/usr/local/bin:/usr/bin:/bin`}
                    </pre>

                    <p className="text-sm mb-3">
                        When Debangshu installs Python in Shyamnagar and types <code>python</code>,
                        Linux checks:
                    </p>

                    <ol className="list-decimal list-inside text-sm space-y-1 mb-3">
                        <li>/usr/local/bin</li>
                        <li>/usr/bin</li>
                        <li>/bin</li>
                    </ol>

                    <p className="text-sm mb-3">
                        The first folder containing <code>python</code> wins.
                        That is why order in PATH is more important than people realize.
                    </p>

                    <h3 className="text-md font-semibold text-sky-400 mt-4 mb-2">
                        Temporarily Add a Folder to PATH
                    </h3>

                    <pre className="bg-black text-sky-300 p-3 rounded-lg text-sm">
                        {`export PATH=$PATH:/home/swadeep/mytools`}
                    </pre>

                    <p className="text-sm mt-2">
                        This change works only until the terminal is closed.
                    </p>

                    <h3 className="text-md font-semibold text-emerald-400 mt-4 mb-2">
                        Permanent PATH Setup (Professional Method)
                    </h3>

                    <pre className="bg-black text-emerald-300 p-3 rounded-lg text-sm">
                        {`nano ~/.bashrc`}
                    </pre>

                    <p className="text-sm mt-2">
                        Then add at the bottom:
                    </p>

                    <pre className="bg-black text-emerald-300 p-3 rounded-lg text-sm">
                        {`export PATH=$PATH:/home/swadeep/mytools`}
                    </pre>

                    <p className="text-sm mt-2">
                        Restart terminal — now Linux remembers forever.
                    </p>

                </section>


                {/* ================= COMMON PITFALLS ================= */}
                <section className="
          p-6 rounded-3xl border border-rose-400/40
          bg-rose-50 dark:bg-rose-900/20
          transition-all duration-300 hover:shadow-xl
        ">
                    <h2 className="text-lg font-semibold text-rose-400 mb-2">Common Pitfalls</h2>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Installing tools but forgetting to add them to PATH</li>
                        <li>Overwriting PATH accidentally</li>
                        <li>Editing PATH without backup</li>
                    </ul>
                </section>

                {/* ================= TEACHER NOTE ================= */}
                <section className="
          p-6 rounded-3xl bg-gradient-to-br from-sky-50 to-white
          dark:from-slate-800 dark:to-slate-900
          border border-sky-400/30
          transition-all duration-300 hover:shadow-xl
        ">
                    <h2 className="text-lg font-semibold text-sky-400 mb-2">Teacher’s Note</h2>
                    <p className="text-sm">
                        PATH is Linux’s Google map.
                        If the address is wrong, even the best program stays invisible.
                    </p>
                </section>

                {/* ================= MINI CHECKLIST ================= */}
                <section className="
          p-5 rounded-2xl border border-slate-300 dark:border-slate-700
          bg-slate-50 dark:bg-slate-800
        ">
                    <h2 className="text-lg font-semibold text-emerald-400 mb-2">Mini Checklist</h2>
                    <ul className="list-disc list-inside text-sm">
                        <li>I know what PATH stores</li>
                        <li>I can display PATH using <code>echo $PATH</code></li>
                        <li>I understand why “command not found” happens</li>
                    </ul>
                </section>

            </div>
        );
    }
}
