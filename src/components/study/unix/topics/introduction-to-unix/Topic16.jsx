// src/components/study/unix/topics/shell-scripting/Topic16.jsx
// Topic 17 – Practice Lab: Running Your First 10 Linux Commands
// Coder & AccoTax – Barrackpore

import React, { Component } from "react";
import { Terminal, CheckCircle, Lightbulb, AlertTriangle } from "lucide-react";

export default class Topic16 extends Component {

  componentDidMount() {
    document.querySelectorAll(".lab-step").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.12}s`;
    });
  }

  render() {
    return (
      <div className="space-y-10 leading-relaxed">

        {/* INTRO */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-gradient-to-br from-slate-100 via-white to-slate-50
          dark:from-slate-900 dark:via-slate-950 dark:to-black
          p-6 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-xl">
          <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-300 flex items-center gap-2">
            <Terminal className="text-emerald-500" />
            Practice Lab – Your First 10 Linux Commands
          </h1>
          <p className="text-slate-700 dark:text-slate-300 mt-3">
            This is the moment when Swadeep stops reading and starts *thinking like a professional*.
            These 10 commands are not theory — they are the foundation of every system engineer.
          </p>
        </section>

        {/* COMMAND 1 */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-300">
            1️⃣ pwd – Present Working Directory
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mt-2">
            <b>Prototype:</b> <code>pwd</code><br/>
            <b>Return Type:</b> Path of your current folder<br/>
            <b>Purpose:</b> Shows where you are in the file system.
          </p>
          <pre className="bg-black/90 text-emerald-400 p-3 rounded-xl text-sm mt-3">
pwd
/home/swadeep/Documents
          </pre>
        </section>

        {/* COMMAND 2 */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-sky-50 dark:bg-slate-800/60 border border-sky-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300">
            2️⃣ ls – List Segment
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mt-2">
            Displays all files and folders in your current directory.
          </p>
          <pre className="bg-black/90 text-sky-400 p-3 rounded-xl text-sm mt-3">
ls
notes.txt  project  photos
          </pre>
        </section>

        {/* COMMAND 3 */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-emerald-50 dark:bg-slate-900/60 border border-emerald-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">
            3️⃣ cd – Change Directory
          </h2>
          <pre className="bg-black/90 text-emerald-400 p-3 rounded-xl text-sm mt-3">
cd project
pwd
/home/swadeep/Documents/project
          </pre>
        </section>

        {/* COMMAND 4 */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-amber-50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-amber-700 dark:text-amber-300">
            4️⃣ mkdir – Make Directory
          </h2>
          <pre className="bg-black/90 text-amber-400 p-3 rounded-xl text-sm mt-3">
mkdir backup
          </pre>
        </section>

        {/* COMMAND 5 */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-rose-50 dark:bg-slate-900/60 border border-rose-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-rose-700 dark:text-rose-300">
            5️⃣ touch – Create File
          </h2>
          <pre className="bg-black/90 text-rose-400 p-3 rounded-xl text-sm mt-3">
touch diary.txt
          </pre>
        </section>

        {/* COMMAND 6 */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-indigo-50 dark:bg-slate-900/60 border border-indigo-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
            6️⃣ cp – Copy File
          </h2>
          <pre className="bg-black/90 text-indigo-400 p-3 rounded-xl text-sm mt-3">
cp diary.txt backup/
          </pre>
        </section>

        {/* COMMAND 7 */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-teal-50 dark:bg-slate-800/60 border border-teal-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-300">
            7️⃣ mv – Move / Rename
          </h2>
          <pre className="bg-black/90 text-teal-400 p-3 rounded-xl text-sm mt-3">
mv diary.txt mylife.txt
          </pre>
        </section>

        {/* COMMAND 8 */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            8️⃣ rm – Remove File
          </h2>
          <pre className="bg-black/90 text-slate-400 p-3 rounded-xl text-sm mt-3">
rm mylife.txt
          </pre>
        </section>

        {/* COMMAND 9 */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-lime-50 dark:bg-slate-800/60 border border-lime-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-lime-700 dark:text-lime-300">
            9️⃣ clear – Clear Screen
          </h2>
          <pre className="bg-black/90 text-lime-400 p-3 rounded-xl text-sm mt-3">
clear
          </pre>
        </section>

        {/* COMMAND 10 */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-fuchsia-50 dark:bg-slate-900/60 border border-fuchsia-200 dark:border-slate-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-fuchsia-700 dark:text-fuchsia-300">
            🔟 history – Command History
          </h2>
          <pre className="bg-black/90 text-fuchsia-400 p-3 rounded-xl text-sm mt-3">
history
          </pre>
        </section>

        {/* TEACHER NOTE */}
        <section className="lab-step motion-safe:animate-[fadeSlideUp_0.8s_ease-out_forwards]
          bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-300 dark:border-indigo-700
          p-6 rounded-3xl transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
            <Lightbulb /> Teacher’s Note
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mt-2">
            Master these 10 commands and half of Linux fear disappears.
            The terminal stops being a black monster — it becomes your classroom.
          </p>
        </section>

      </div>
    );
  }
}
