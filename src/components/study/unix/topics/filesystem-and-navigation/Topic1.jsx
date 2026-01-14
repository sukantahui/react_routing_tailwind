// src/components/study/unixlinux/topics/filesystem/Topic1.jsx

import React, { Component } from "react";

export default class Topic1 extends Component {
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
            Understanding the Role of Each Linux System Directory
          </h1>
          <p className="text-slate-300 mt-2">
            Linux directories are like the departments of a school in <b>Barrackpore</b>.
            Each has a responsibility — when you respect their roles, the system runs peacefully.
          </p>
        </section>

        {/* ================= DIRECTORY EXPLANATIONS ================= */}
        <section className="
          grid md:grid-cols-2 gap-6
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
        ">
          {[
            ["/bin", "Essential user commands such as ls, cp, mv, cat. Even if everything breaks, /bin survives."],
            ["/sbin", "System administration commands like shutdown, fsck. Used mainly by the root user."],
            ["/etc", "All configuration files live here — network, users, passwords, services."],
            ["/home", "Personal folders of users like /home/swadeep or /home/tuhina."],
            ["/root", "Home directory of the root (administrator). NOT inside /home."],
            ["/usr", "Programs and libraries installed by the system: /usr/bin, /usr/lib."],
            ["/var", "Variable files — logs, mail, print queues. Always changing."],
            ["/tmp", "Temporary files used by programs. Automatically cleaned."],
            ["/lib", "Critical system libraries needed by /bin and /sbin programs."],
            ["/proc", "Virtual folder showing live system info like CPU, memory."],
            ["/dev", "Hardware devices treated as files: hard disk, USB, sound card."]
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

        {/* ================= REAL LIFE EXAMPLE ================= */}
        <section className="
          bg-emerald-900/10 border border-emerald-500/30 p-6 rounded-3xl
          transition-all duration-300 hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_1.2s_ease-out_forwards]
        ">
          <h2 className="text-xl font-semibold text-emerald-300">
            Real-World Analogy
          </h2>
          <p className="text-slate-300 mt-2">
            When <b>Abhronila</b> logs in, she works inside <code>/home/abhronila</code>.
            She must never touch <code>/etc</code> or <code>/bin</code> — just like students
            never enter the staff room in <b>Shyamnagar School</b>.
          </p>
        </section>

        {/* ================= COMMON PITFALLS ================= */}
        <section className="
          bg-rose-900/10 border border-rose-500/30 p-6 rounded-3xl
          transition-all duration-300 hover:shadow-xl
        ">
          <h2 className="text-xl font-semibold text-rose-300">
            Common Pitfalls
          </h2>
          <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1 mt-2">
            <li>Editing files in <code>/etc</code> without backup.</li>
            <li>Running commands as root unnecessarily.</li>
            <li>Storing personal files in <code>/tmp</code>.</li>
            <li>Confusing <code>/root</code> with <code>/home</code>.</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="
          bg-sky-900/10 border border-sky-500/30 p-6 rounded-3xl
          transition-all duration-300 hover:shadow-xl
        ">
          <h2 className="text-xl font-semibold text-sky-300">
            Best Practices
          </h2>
          <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1 mt-2">
            <li>Work inside your <code>/home</code> folder.</li>
            <li>Use <code>sudo</code> only when required.</li>
            <li>Always backup files before editing in <code>/etc</code>.</li>
            <li>Never delete system directories blindly.</li>
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
            <li>I know where user files are stored.</li>
            <li>I understand what <code>/etc</code> controls.</li>
            <li>I avoid touching system folders casually.</li>
            <li>I treat Linux directories like departments — not dustbins.</li>
          </ul>
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
            Linux becomes easy when students treat folders with respect.
            Once the mental map is clear, even the scariest server looks friendly.
          </p>
        </section>

      </div>
    );
  }
}
