// src/components/study/unix/topics/unix/Topic7.jsx
// Topic 7 – Desktop vs Server Linux – Real-World Usage

import React, { Component } from "react";
import { Monitor, Server, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

export default class Topic7 extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-200">

        {/* Page Intro */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]">
          <h1 className="text-3xl font-bold text-sky-600 dark:text-sky-400">
            Desktop Linux vs Server Linux – Real-World Usage
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Linux wears two faces — one friendly for students like <b>Swadeep</b> in Barrackpore,
            and one powerful for invisible machines running the world behind the scenes.
          </p>
        </section>

        {/* Desktop Linux */}
        <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[200ms]
        ">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
            <Monitor size={20}/> Desktop Linux – For Humans
          </h2>

          <p className="mt-3">
            Desktop Linux is designed for <b>people</b>. It focuses on usability, graphics,
            multimedia, and everyday productivity.
          </p>

          <ul className="mt-4 list-disc list-inside space-y-1 text-sm">
            <li>Graphical interface (GNOME, KDE, Cinnamon)</li>
            <li>Software Center for easy app install</li>
            <li>Office tools, browsers, media players</li>
            <li>Wi-Fi, Bluetooth, webcam support</li>
          </ul>

          <p className="mt-3 text-sm italic text-slate-500">
            Example: Swadeep installs Ubuntu on his laptop in Shyamnagar for coding, browsing, and Python practice.
          </p>
        </section>

        {/* Server Linux */}
        <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[400ms]
        ">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <Server size={20}/> Server Linux – For Machines
          </h2>

          <p className="mt-3">
            Server Linux is designed for <b>reliability and performance</b>, not beauty.
            It runs silently in data-centers without screens or keyboards.
          </p>

          <ul className="mt-4 list-disc list-inside space-y-1 text-sm">
            <li>No GUI — only terminal</li>
            <li>Runs 24×7 for years</li>
            <li>Handles websites, databases, backups</li>
            <li>Highly secure and remotely managed</li>
          </ul>

          <p className="mt-3 text-sm italic text-slate-500">
            Example: Abhronila’s school website in Naihati runs on a CentOS server inside a dusty server room.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[600ms]
        ">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Desktop vs Server – At a Glance
          </h2>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-200 dark:bg-slate-800">
                  <th className="border p-2">Feature</th>
                  <th className="border p-2">Desktop Linux</th>
                  <th className="border p-2">Server Linux</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Interface</td>
                  <td className="border p-2">GUI + Terminal</td>
                  <td className="border p-2">Terminal only</td>
                </tr>
                <tr>
                  <td className="border p-2">Usage</td>
                  <td className="border p-2">Personal, office, learning</td>
                  <td className="border p-2">Web hosting, databases</td>
                </tr>
                <tr>
                  <td className="border p-2">Performance</td>
                  <td className="border p-2">Optimized for user comfort</td>
                  <td className="border p-2">Optimized for uptime</td>
                </tr>
                <tr>
                  <td className="border p-2">Stability</td>
                  <td className="border p-2">High</td>
                  <td className="border p-2">Extremely High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="
          bg-amber-50 dark:bg-amber-900/20 border border-amber-400/40
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(250,204,21,0.35)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[800ms]
        ">
          <h2 className="text-lg font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <Lightbulb size={18}/> Teacher’s Note
          </h2>
          <p className="mt-2 text-sm">
            Students often think Linux is only for hacking. But real professionals
            first master Desktop Linux and then step into Server Linux like moving
            from classroom to data-center.
          </p>
        </section>

        {/* Mini Checklist */}
        <section className="
          bg-white/80 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700
          rounded-2xl p-6 shadow-lg transition-all duration-300
          hover:shadow-[0_0_25px_rgba(14,165,233,0.25)]
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards] animation-delay-[1000ms]
        ">
          <h2 className="text-lg font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
            <CheckCircle size={18}/> What You Must Remember
          </h2>
          <ul className="mt-3 list-disc list-inside text-sm space-y-1">
            <li>Desktop Linux = human interaction</li>
            <li>Server Linux = machine reliability</li>
            <li>Same kernel, different purpose</li>
            <li>Every cloud server you use is Linux</li>
          </ul>
        </section>

      </div>
    );
  }
}
