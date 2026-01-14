// src/components/study/unixlinux/topics/filesystem/Topic0.jsx

import React, { Component } from "react";

export default class Topic0 extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="space-y-10 leading-relaxed">

                {/* ================= INTRO ================= */}
                <section className="
          bg-slate-900/70 border border-slate-700 rounded-3xl p-6
          transition-all duration-300 hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
        ">
                    <h1 className="text-2xl font-bold text-sky-300">
                        Linux Directory Structure — The Digital City Map
                    </h1>

                    <p className="text-slate-300 mt-2">
                        Think of Linux like <b>Barrackpore town</b>.
                        Every folder is a landmark. If you don’t know the map,
                        you’ll keep asking “Sir, file ta kothay gelo?” 😄
                    </p>
                </section>

                {/* ================= ROOT TREE SVG ================= */}
                <section className="
  bg-slate-900/60 border border-slate-700 rounded-3xl p-6
  transition-all duration-300 hover:shadow-xl
  motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
">
                    <h2 className="text-xl font-semibold text-emerald-300 mb-4">
                        The Root Directory – <code className="text-sky-400">/</code>
                    </h2>

                    {/* WHITEBOARD BACKGROUND */}
                    <div className="
    bg-blue-400 dark:bg-blue-400
    rounded-2xl p-4
    border border-slate-300
    shadow-inner
    transition-all duration-300 hover:shadow-lg
  ">
                        <svg viewBox="0 0 520 260" className="w-full text-slate-800">
                            <text x="230" y="30" className="font-semibold">/ (Root)</text>
                            <line x1="260" y1="40" x2="260" y2="70" stroke="currentColor" />

                            <text x="40" y="110">/bin</text>
                            <text x="140" y="110">/etc</text>
                            <text x="240" y="110">/home</text>
                            <text x="340" y="110">/var</text>
                            <text x="440" y="110">/dev</text>

                            <line x1="260" y1="70" x2="60" y2="95" stroke="currentColor" />
                            <line x1="260" y1="70" x2="160" y2="95" stroke="currentColor" />
                            <line x1="260" y1="70" x2="260" y2="95" stroke="currentColor" />
                            <line x1="260" y1="70" x2="360" y2="95" stroke="currentColor" />
                            <line x1="260" y1="70" x2="460" y2="95" stroke="currentColor" />
                        </svg>
                    </div>

                    <p className="text-slate-400 text-sm mt-3 italic">
                        This board-style diagram helps you visualize Linux like a real classroom chart.
                    </p>
                </section>


                {/* ================= DIRECTORY ROLES ================= */}
                <section className="
          grid md:grid-cols-2 gap-6
          motion-safe:animate-[fadeSlideUp_1.2s_ease-out_forwards]
        ">
                    {[
                        ["/bin", "Essential commands like ls, cp, mv"],
                        ["/sbin", "System binaries for admin"],
                        ["/etc", "Configuration files"],
                        ["/home", "All user folders"],
                        ["/root", "Home of the root user"],
                        ["/usr", "Installed programs & libraries"],
                        ["/var", "Logs, mail, runtime data"],
                        ["/tmp", "Temporary files"],
                        ["/lib", "Core system libraries"],
                        ["/proc", "Live kernel data"],
                        ["/dev", "Hardware as files"]
                    ].map(([dir, desc], i) => (
                        <div key={i} className="
              bg-slate-900/60 border border-slate-700 p-4 rounded-xl
              hover:shadow-lg transition-all duration-300
            ">
                            <p className="text-sky-300 font-mono">{dir}</p>
                            <p className="text-slate-400 text-sm mt-1">{desc}</p>
                        </div>
                    ))}
                </section>

                {/* ================= PWD LS CD ================= */}
                <section className="
          bg-slate-900/70 border border-slate-700 rounded-3xl p-6
          transition-all duration-300 hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_1.4s_ease-out_forwards]
        ">
                    <h2 className="text-xl font-semibold text-yellow-300">
                        pwd, ls, cd – Absolute Mastery
                    </h2>

                    <div className="bg-black/60 p-4 rounded-xl text-slate-200 text-sm mt-3">
                        <dl className="grid grid-cols-[80px_1fr] gap-y-2 gap-x-4">
                            <dt className="font-semibold text-emerald-300">pwd</dt>
                            <dd className="text-slate-300">Present Working Directory</dd>

                            <dt className="font-semibold text-emerald-300">ls</dt>
                            <dd className="text-slate-300">List Segment</dd>

                            <dt className="font-semibold text-emerald-300">cd</dt>
                            <dd className="text-slate-300">Change Directory</dd>
                        </dl>
                    </div>

                    <p className="text-slate-300 mt-3">
                        When <b>Swadeep</b> learns full forms, he stops memorizing and starts
                        understanding — that’s how professionals are created.
                    </p>
                </section>

                {/* ================= LS ADVANCED OPTIONS ================= */}
                <section className="
  bg-slate-900/70 border border-slate-700 rounded-3xl p-6
  transition-all duration-300 hover:shadow-xl
  motion-safe:animate-[fadeSlideUp_1.6s_ease-out_forwards]
">
                    <h2 className="text-xl font-semibold text-indigo-300">
                        ls Advanced Options – Reading Files Like a Pro
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm text-slate-300">
                        <div>-l → Long listing (permissions, size, date)</div>
                        <div>-a → Show hidden files</div>
                        <div>-h → Human readable sizes</div>
                        <div>-R → Recursive listing</div>
                        <div>-t → Sort by time</div>
                        <div>-S → Sort by size</div>
                    </div>

                    <p className="text-slate-400 mt-3">
                        Professionals never run plain <code>ls</code>.
                        They run <code>ls -lah</code> — because information is power.
                    </p>

                    <div className="mt-4 bg-black/70 border border-slate-700 rounded-xl p-4 text-sm text-slate-200">
                        <p className="text-emerald-300 font-semibold mb-2">Examples from Real Terminal</p>

                        <dl className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-2 text-sm text-slate-200 bg-black/70 border border-slate-700 rounded-xl p-4">

                            <dt className="font-mono text-sky-300">ls -l</dt>
                            <dd className="text-slate-300">Shows permissions, owner, size and date.</dd>

                            <dt className="font-mono text-sky-300">ls -a</dt>
                            <dd className="text-slate-300">Displays hidden files like <code>.bashrc</code> and <code>.profile</code>.</dd>

                            <dt className="font-mono text-sky-300">ls -lh</dt>
                            <dd className="text-slate-300">Shows file sizes in KB / MB instead of bytes.</dd>

                            <dt className="font-mono text-sky-300">ls -lR</dt>
                            <dd className="text-slate-300">Lists files inside all sub-directories recursively.</dd>

                            <dt className="font-mono text-sky-300">ls -lt</dt>
                            <dd className="text-slate-300">Sorts files by modification time (newest first).</dd>

                            <dt className="font-mono text-sky-300">ls -lS</dt>
                            <dd className="text-slate-300">Sorts files by size (largest first).</dd>

                        </dl>

                    </div>
                </section>

                {/* ================= ABSOLUTE VS RELATIVE PATH ================= */}
                <section className="
  bg-slate-900/70 border border-slate-700 rounded-3xl p-6
  transition-all duration-300 hover:shadow-xl
">
                    <h2 className="text-xl font-semibold text-cyan-300">
                        Absolute vs Relative Paths – Don’t Get Lost
                    </h2>

                    <p className="text-slate-300 mt-2">
                        <b>Absolute Path:</b> Starts from root
                        <code className="block mt-1 text-sky-400">/home/swadeep/projects</code>
                    </p>

                    <p className="text-slate-300 mt-3">
                        <b>Relative Path:</b> Starts from current folder
                        <code className="block mt-1 text-sky-400">projects</code>
                    </p>

                    <p className="text-slate-400 mt-3">
                        In Shyamnagar computer lab, students panic only because they don’t know where they are standing.
                        Always run <code>pwd</code> before moving.
                    </p>
                </section>

                {/* ================= HIDDEN FILES ================= */}
                <section className="
  bg-slate-900/70 border border-slate-700 rounded-3xl p-6
  transition-all duration-300 hover:shadow-xl
">
                    <h2 className="text-xl font-semibold text-fuchsia-300">
                        Hidden Files – Linux’s Secret Diaries
                    </h2>

                    <p className="text-slate-300 mt-2">
                        Files starting with dot (<code>.bashrc</code>, <code>.config</code>) are hidden.
                    </p>

                    <p className="text-slate-400 mt-2">
                        They store user preferences — your shell remembers you through these.
                    </p>
                </section>

                {/* ================= LINKS ================= */}
                <section className="
  bg-slate-900/70 border border-slate-700 rounded-3xl p-6
  transition-all duration-300 hover:shadow-xl
">
                    <h2 className="text-xl font-semibold text-orange-300">
                        Symbolic Links vs Hard Links
                    </h2>

                    <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1 mt-2">
                        <li>Symbolic Link → Shortcut (can break)</li>
                        <li>Hard Link → Real mirror of file (never breaks)</li>
                    </ul>

                    <p className="text-slate-400 mt-2">
                        Like giving Abhronila the real book vs just a photocopy shortcut.
                    </p>
                </section>



                {/* ================= TEACHER NOTE ================= */}
                <section className="
          bg-sky-900/20 border border-sky-500/40 p-5 rounded-2xl
          transition-all duration-300 hover:bg-sky-900/30
        ">
                    <h3 className="text-lg font-semibold text-sky-300">
                        👨‍🏫 Teacher’s Note
                    </h3>
                    <p className="text-slate-300 mt-2">
                        Students think Linux is hard — actually they never learned the map.
                        Once directory structure becomes muscle memory,
                        fear disappears forever.
                    </p>
                </section>

                {/* ================= COMMON MISTAKES ================= */}
                <section className="
          bg-rose-900/10 border border-rose-500/30 p-6 rounded-3xl
          transition-all duration-300 hover:shadow-xl
        ">
                    <h2 className="text-xl font-semibold text-rose-300">
                        Common Beginner Mistakes
                    </h2>

                    <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1 mt-2">
                        <li>Using Windows paths inside Linux</li>
                        <li>Deleting files with <code>rm -rf</code> blindly</li>
                        <li>Confusing <code>/root</code> with <code>/home</code></li>
                        <li>Not using Tab completion</li>
                        <li>Ignoring hidden files</li>
                    </ul>
                </section>

                {/* ================= MINI CHECKLIST ================= */}
                <section className="
          bg-emerald-900/10 border border-emerald-500/30 p-6 rounded-3xl
          transition-all duration-300 hover:shadow-xl
        ">
                    <h2 className="text-xl font-semibold text-emerald-300">
                        Mini Checklist
                    </h2>

                    <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1 mt-2">
                        <li>I know what <code>/</code> means</li>
                        <li>I understand roles of /bin, /etc, /home, /var</li>
                        <li>I can navigate without file manager</li>
                        <li>I use pwd before panic 😄</li>
                    </ul>
                </section>

            </div>
        );
    }
}
