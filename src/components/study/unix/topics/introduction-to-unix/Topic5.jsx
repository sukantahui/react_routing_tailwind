// src/components/study/unix/topics/unix-intro/Topic5.jsx
import React, { Component } from "react";

export default class Topic5 extends Component {

    render() {
        return (
            <div className="space-y-10 leading-relaxed">

                {/* ====================== INTRO ====================== */}
                <section className="
          bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800
          rounded-3xl p-6 shadow-lg
          transition-all duration-300 hover:shadow-2xl
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
        ">
                    <h1 className="text-2xl font-bold text-sky-600 dark:text-sky-400 mb-3">
                        Understanding System Utilities & Core GNU Tools
                    </h1>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                        When Swadeep opens a Linux server in CNAT lab, the power he sees is not magic —
                        it is the silent army of <b>GNU utilities</b> working behind every command.
                    </p>
                </section>

                {/* ====================== WHAT ARE GNU TOOLS ====================== */}
                <section className="
          bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-slate-700
          rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_1.2s_ease-out_forwards]
        ">
                    <h2 className="text-lg font-semibold text-sky-600 dark:text-sky-400 mb-3">
                        What are Core GNU Tools?
                    </h2>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                        GNU tools are <b>small focused programs</b> that perform one job extremely well —
                        file management, text processing, system monitoring, networking and automation.
                    </p>
                    <p className="text-xs text-slate-500 mt-3">
                        Prototype: <code>ls</code>, <code>cp</code>, <code>grep</code>, <code>awk</code>
                        Return Type: stdout / exit code
                        Purpose: Command-line automation backbone
                    </p>
                </section>

                <section
                    className="
    mt-10 rounded-3xl border border-emerald-400/30
    bg-gradient-to-br from-emerald-950 via-slate-900 to-black
    p-6 shadow-xl
    transition-all duration-300
    hover:shadow-[0_0_30px_rgba(52,211,153,0.35)]
    motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
  "
                >
                    <h2 className="text-xl font-semibold text-emerald-300 mb-4">
                        🔁 What is GNU? — The Most Beautiful Full Form in Computing
                    </h2>

                    <blockquote className="border-l-4 border-emerald-400 pl-4 italic text-slate-200 text-lg mb-4">
                        GNU stands for <span className="text-emerald-300 font-semibold">“GNU’s Not UNIX”</span>
                    </blockquote>

                    <p className="text-slate-300 leading-relaxed mb-3">
                        This is not a joke — it is a <b>recursive acronym</b>.
                        That means the word <b>GNU appears inside its own definition.</b>
                    </p>

                    <div className="bg-slate-900/70 rounded-xl p-4 border border-emerald-400/20 mb-4">
                        <p className="text-slate-200 text-sm leading-relaxed">
                            <span className="text-emerald-300 font-semibold">G</span> → GNU
                            <br />
                            <span className="text-emerald-300 font-semibold">N</span> → Not
                            <br />
                            <span className="text-emerald-300 font-semibold">U</span> → Unix
                        </p>
                    </div>

                    <p className="text-slate-300 leading-relaxed mb-3">
                        So GNU literally means:
                    </p>

                    <p className="text-emerald-300 font-semibold text-lg mb-4">
                        “GNU is Not UNIX — but it behaves like UNIX, without UNIX’s restrictions.”
                    </p>

                    <p className="text-slate-300 leading-relaxed mb-3">
                        Richard Stallman started the GNU project because UNIX was becoming expensive and closed.
                        He wanted students in places like <b>Barrackpore</b> and <b>Ichapur</b> to have the same powerful tools
                        that giant companies were using — without paying a single rupee.
                    </p>

                    <p className="text-slate-300 leading-relaxed mb-3">
                        GNU gave us the soul of modern Linux systems:
                    </p>

                    <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
                        <li><span className="text-emerald-300">bash</span> – the shell you type commands in</li>
                        <li><span className="text-emerald-300">gcc</span> – the compiler that builds the world</li>
                        <li><span className="text-emerald-300">ls, cp, mv, rm</span> – your daily terminal weapons</li>
                    </ul>

                    <p className="text-slate-400 text-[12px] italic mt-4">
                        Without GNU tools, Linux would be only a kernel.
                        Together they form what professionals correctly call: <b>GNU/Linux</b>.
                    </p>
                </section>


                {/* ====================== ESSENTIAL UTILITIES ====================== */}
                <section className="
          grid md:grid-cols-2 gap-6
          motion-safe:animate-[fadeSlideUp_1.4s_ease-out_forwards]
        ">
                    {[
                        ["ls", "List directory contents", "ls -l /home"],
                        ["cp", "Copy files", "cp file1 file2"],
                        ["mv", "Move or rename files", "mv old.txt new.txt"],
                        ["rm", "Remove files", "rm data.txt"],
                        ["cat", "View file content", "cat marks.txt"],
                        ["grep", "Search text", "grep 'Swadeep' class.txt"],
                        ["ps", "View running processes", "ps aux"],
                        ["top", "Live system monitor", "top"],
                    ].map((cmd, i) => (
                        <div key={i} className="
              bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800
              rounded-2xl p-4 transition-all duration-300 hover:shadow-xl
            ">
                            <h3 className="text-sky-600 dark:text-sky-400 font-semibold">
                                {cmd[0]}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                {cmd[1]}
                            </p>
                            <code className="block text-xs mt-2 text-emerald-600 dark:text-emerald-400">
                                {cmd[2]}
                            </code>
                        </div>
                    ))}
                </section>

                {/* ====================== REAL WORLD ====================== */}
                <section className="
          bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-300 dark:border-yellow-700
          rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
        ">
                    <h2 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-3">
                        🌍 Real World Usage
                    </h2>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                        In Shyamnagar school server, Tuhina uses:
                        <code> grep "fail" /var/log/syslog </code>
                        to detect system errors instantly.
                    </p>
                </section>

                {/* ====================== HINT SECTION ====================== */}
                <section className="
          bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-300 dark:border-indigo-700
          rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
        ">
                    <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                        💡 Hint
                    </h3>
                    <ul className="list-disc ml-6 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Think about why small tools combine better.</li>
                        <li>Observe carefully how pipes connect commands.</li>
                        <li>Try changing file names & see automation in action.</li>
                    </ul>
                </section>

                {/* ====================== COMMON PITFALLS ====================== */}
                <section className="
          bg-rose-50 dark:bg-rose-900/10 border border-rose-300 dark:border-rose-700
          rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
        ">
                    <h2 className="text-lg font-semibold text-rose-600 dark:text-rose-400 mb-3">
                        ⚠ Common Pitfalls
                    </h2>
                    <ul className="list-disc ml-6 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Using rm -rf blindly.</li>
                        <li>Forgetting case sensitivity.</li>
                        <li>Not reading man pages.</li>
                    </ul>
                </section>

                {/* ====================== BEST PRACTICES ====================== */}
                <section className="
          bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-300 dark:border-emerald-700
          rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
        ">
                    <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                        ✅ Best Practices
                    </h2>
                    <ul className="list-disc ml-6 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Always test commands without -f option.</li>
                        <li>Use man before using new utilities.</li>
                        <li>Automate with scripts instead of repetition.</li>
                    </ul>
                </section>

                {/* ====================== TEACHER NOTE ====================== */}
                <section className="
          bg-sky-100 dark:bg-sky-900/10 border border-sky-300 dark:border-sky-700
          rounded-3xl p-6 transition-all duration-300 hover:shadow-xl
        ">
                    <p className="text-sm text-sky-700 dark:text-sky-300 font-semibold">
                        Teacher’s Note
                    </p>
                    <p className="text-xs text-sky-600 dark:text-sky-400 mt-1">
                        Master GNU tools and Linux becomes your obedient assistant instead of a scary machine.
                    </p>
                </section>

            </div>
        );
    }
}
