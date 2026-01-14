// src/components/study/unix/topics/unix-intro/Topic3.jsx

import React, { Component } from "react";
import { Terminal, AlertTriangle, Lightbulb } from "lucide-react";

export default class Topic3 extends Component {
  componentDidMount() {
    // Trigger reflow for animation on mount
  }

  render() {
    return (
      <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed">

        {/* ===================== INTRO ===================== */}
        <section className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-700
          rounded-3xl p-6 shadow-lg
          transition-all duration-300
          hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
        ">
          <h1 className="text-2xl font-bold text-sky-600 dark:text-sky-400 mb-3">
            What is a Shell? Bash vs Zsh vs Sh
          </h1>

          <p>
            When Swadeep types <code>ls</code> in a terminal at Barrackpore lab,
            he is not talking to Linux directly. He is talking to a
            <b className="text-sky-500"> shell</b> — the smart interpreter between human and kernel.
          </p>
        </section>

        {/* ===================== CONCEPT ===================== */}
        <section className="
          bg-slate-50 dark:bg-slate-950
          border border-slate-200 dark:border-slate-700
          rounded-3xl p-6 shadow-md
          transition-all duration-300 hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_1.2s_ease-out_forwards]
        ">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            What exactly is a Shell?
          </h2>

          <p>
            A <b>Shell</b> is a command interpreter.
            It reads your command, understands it, and tells the kernel what to do.
          </p>

          <div className="mt-4 bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm"><b>Prototype / Signature</b></p>
            <pre className="text-sky-600 text-sm">shell → command → kernel → hardware</pre>

            <p className="text-sm mt-2"><b>Purpose:</b> Convert human instructions into system operations.</p>
            <p className="text-sm"><b>Return Type:</b> Output text / exit status (0 = success).</p>
          </div>
        </section>

        {/* ===================== BASH VS ZSH VS SH ===================== */}
        <section className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-700
          rounded-3xl p-6 shadow-md
          transition-all duration-300 hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_1.4s_ease-out_forwards]
        ">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
            Bash vs Zsh vs Sh — The Three Brothers
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "sh", desc: "The original Bourne Shell. Minimal & fastest." },
              { name: "bash", desc: "GNU shell. Default in Linux. Powerful scripting." },
              { name: "zsh", desc: "Modern shell. Autocomplete, themes, productivity." }
            ].map((s, i) => (
              <div key={i}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl
                transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                <h3 className="font-semibold text-sky-500 mb-1">{s.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== ALL POPULAR SHELLS ===================== */}
        <section className="
  bg-slate-50 dark:bg-slate-950
  border border-slate-200 dark:border-slate-700
  rounded-3xl p-6 shadow-md
  transition-all duration-300 hover:shadow-xl
  motion-safe:animate-[fadeSlideUp_1.8s_ease-out_forwards]
">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
            All Popular Shells You Should Know
          </h2>

          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Linux and UNIX systems support multiple shells. Each shell has a
            different philosophy and use-case. Let us meet the entire shell family.
          </p>

          <div className="grid md:grid-cols-2 gap-4">

            {[
              { name: "sh (Bourne Shell)", use: "Original UNIX shell. Fast, minimal, used in scripts.", by: "Stephen Bourne" },
              { name: "bash (Bourne Again Shell)", use: "Default in Linux. Best for scripting & automation.", by: "GNU Project" },
              { name: "zsh (Z Shell)", use: "Power users. Autocomplete, themes, plugins.", by: "Paul Falstad" },
              { name: "fish (Friendly Shell)", use: "Beginner friendly. Suggestions like mobile typing.", by: "Community" },
              { name: "csh (C Shell)", use: "C-style syntax. Rare today.", by: "Bill Joy" },
              { name: "tcsh", use: "Improved csh. Still used in universities.", by: "Community" },
              { name: "ksh (Korn Shell)", use: "Enterprise servers & scripting.", by: "AT&T Bell Labs" }
            ].map((s, i) => (
              <div key={i}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl
        transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                <h3 className="text-sky-500 font-semibold mb-1">{s.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400"><b>Use:</b> {s.use}</p>
                <p className="text-xs text-slate-500 mt-1">Created by {s.by}</p>
              </div>
            ))}

          </div>

          <p className="mt-4 text-[12px] italic text-slate-500">
            In real labs at Shyamnagar or Ichapur, Bash dominates servers,
            while students like Tuhina prefer Zsh for its smart suggestions.
          </p>
        </section>

        {/* ===================== ROLE OF SHELL – FUN STORY ===================== */}
        <section className="
  bg-gradient-to-br from-sky-50 via-white to-slate-100
  dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
  border border-sky-200 dark:border-slate-700
  rounded-3xl p-6 shadow-lg
  transition-all duration-300 hover:shadow-2xl
  motion-safe:animate-[fadeSlideUp_2s_ease-out_forwards]
">

          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-4">
            The Shell – Your Computer’s WhatsApp Translator 😆
          </h2>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Imagine Swadeep sending a WhatsApp message to his computer:
          </p>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-4 hover:shadow-md transition-all duration-300">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              💬 <b>Swadeep:</b> “Computer, create a folder named <code>projects</code>”
            </p>
            <p className="text-sm text-emerald-500 mt-2">
              🐚 <b>Shell translates:</b> <code className="text-sky-500">mkdir projects</code>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Kernel does not understand English — it only understands system calls!
            </p>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
            The shell is not the boss. It is the <b>interpreter</b> between you and the Kernel.
          </p>

          <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              💬 <b>Tuhina:</b> “Please show me all PDF files”
            </p>
            <p className="text-sm text-sky-500 mt-2">
              🐚 <b>Shell:</b> <code>ls *.pdf</code>
            </p>
          </div>

          <h3 className="text-sky-500 font-semibold mt-5 mb-2">
            Why the Kernel Never Talks to Humans
          </h3>

          <ul className="text-sm list-disc ml-6 text-slate-600 dark:text-slate-400 space-y-1">
            <li>Kernel understands machine language, not English.</li>
            <li>Shell converts human instructions into kernel system calls.</li>
            <li>If the shell disappears, you must talk to the kernel in binary. 😱</li>
          </ul>

          <h3 className="text-sky-500 font-semibold mt-5 mb-2">
            Think About…
          </h3>

          <p className="text-sm italic text-slate-500 dark:text-slate-400">
            “When Bash crashes, Windows shows error boxes — but Linux calmly waits for your next command.”
          </p>

          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-300 dark:border-yellow-600 p-4 rounded-xl hover:shadow-md transition-all duration-300">
            <p className="text-sm text-yellow-700 dark:text-yellow-300 font-semibold">
              Teacher’s Note
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
              The shell is not just a tool. It is a mindset. When students in Coder & AccoTax master the shell,
              they stop clicking and start commanding computers.
            </p>
          </div>

        </section>



        {/* ===================== FUNNY STORY ===================== */}
        <section className="
          bg-yellow-50 dark:bg-yellow-900/10
          border border-yellow-300 dark:border-yellow-600
          rounded-3xl p-6 shadow-md
          transition-all duration-300 hover:shadow-xl
          motion-safe:animate-[fadeSlideUp_1.6s_ease-out_forwards]
        ">
          <h2 className="text-xl font-semibold text-yellow-700 dark:text-yellow-400 mb-3">
            Funny Truth
          </h2>
          <p>
            Abhronila once installed Zsh and after seeing colorful autocompletion said,
            “Sir, Linux just became smarter than my phone!”
          </p>
        </section>

        {/* ===================== COMMON PITFALLS ===================== */}
        <section className="
          bg-rose-50 dark:bg-rose-900/10
          border border-rose-300 dark:border-rose-700
          rounded-3xl p-6 shadow-md
          transition-all duration-300 hover:shadow-xl
        ">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            <AlertTriangle size={20} /> Common Pitfalls
          </h2>

          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Thinking terminal and shell are the same thing.</li>
            <li>Using Zsh features inside Bash scripts.</li>
            <li>Breaking scripts by assuming all shells behave the same.</li>
          </ul>
        </section>

        {/* ===================== HINT ===================== */}
        <section className="
          bg-sky-50 dark:bg-sky-900/10
          border border-sky-300 dark:border-sky-600
          rounded-3xl p-6 shadow-md
          transition-all duration-300 hover:shadow-xl
        ">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            <Lightbulb size={20} /> Think About…
          </h2>
          <p>
            Observe your prompt carefully. Does it end with <code>$</code> or <code>%</code>?
            That tells which shell is listening to you.
          </p>
        </section>

        {/* ===================== CHECKLIST ===================== */}
        <section className="
          bg-emerald-50 dark:bg-emerald-900/10
          border border-emerald-300 dark:border-emerald-700
          rounded-3xl p-6 shadow-md
        ">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            Mini Checklist
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Shell is the interpreter between user and kernel.</li>
            <li>Bash = default Linux shell.</li>
            <li>Zsh = modern productivity shell.</li>
            <li>sh = original minimal shell.</li>
          </ul>
        </section>

      </div>
    );
  }
}
