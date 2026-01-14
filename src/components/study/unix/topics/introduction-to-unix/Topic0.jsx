import React, { Component } from "react";
import { Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

export default class Topic0 extends Component {
  componentDidMount() {
    // Trigger section reveal animations
    document.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.animationDelay = `${i * 120}ms`;
    });
  }

  render() {
    return (
      <div className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-200">

        {/* ================== TITLE ================== */}
        <section className="reveal animate-[fadeUp_0.8s_ease-out_both]">
          <h1 className="text-3xl font-bold text-sky-600 dark:text-sky-400">
            Evolution of UNIX – From Bell Labs to Modern Linux
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Understanding UNIX is like learning the family tree of all modern
            operating systems. Linux, macOS, Android – all are deeply inspired by UNIX.
          </p>
        </section>

        {/* ================== THEORY ================== */}
        <section className="reveal p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-emerald-500">📜 Historical Background</h2>
          <p className="mt-2">
            UNIX was born in <strong>1969</strong> at <strong>Bell Labs</strong> by
            <strong> Ken Thompson</strong> and <strong>Dennis Ritchie</strong>.
            It was originally designed for small computers to be:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Portable</li>
            <li>Multi-user</li>
            <li>Multitasking</li>
            <li>Written in C for portability</li>
          </ul>

          <p className="mt-3">
            Later, students at universities (like UC Berkeley) created BSD UNIX.
            Over time, UNIX philosophy influenced the birth of <strong>Linux (1991)</strong> by
            <strong> Linus Torvalds</strong>.
          </p>
        </section>

        {/* ================== SVG TIMELINE ================== */}
        <section className="reveal p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-indigo-500">🕰 UNIX Evolution Timeline</h2>

          <svg viewBox="0 0 700 140" className="w-full mt-4">
            <line x1="40" y1="70" x2="660" y2="70" stroke="currentColor" strokeWidth="2" />

            {[
              { x: 60, label: "1969\nUNIX" },
              { x: 200, label: "1975\nBSD" },
              { x: 360, label: "1991\nLinux" },
              { x: 520, label: "2001\nmacOS" },
              { x: 660, label: "Now\nModern Distros" }
            ].map((step, i) => (
              <g key={i}>
                <circle cx={step.x} cy="70" r="6" className="fill-sky-500 hover:fill-emerald-500 transition-all" />
                <text x={step.x} y="100" textAnchor="middle" className="text-xs fill-current">
                  {step.label}
                </text>
              </g>
            ))}
          </svg>
        </section>

        {/* ================== REAL WORLD ================== */}
        <section className="reveal p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-sky-500">🌍 Real-World Usage</h2>
          <p className="mt-2">
            When Swadeep from Barrackpore opens Ubuntu in his school lab,
            he is unknowingly using UNIX principles developed more than 50 years ago.
          </p>
          <p className="mt-2">
            Linux today runs:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Web servers</li>
            <li>Android phones</li>
            <li>ATMs and routers</li>
            <li>Cloud systems at Google & Amazon</li>
          </ul>
        </section>

        {/* ================== HINT ================== */}
        <section className="reveal p-5 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 hover:shadow-lg transition-all">
          <h3 className="flex items-center gap-2 font-semibold text-yellow-600">
            <Lightbulb size={18} /> Hint
          </h3>
          <p className="mt-2 text-sm">
            Think about why Linux is free but UNIX was originally commercial.
            What changed in software culture?
          </p>
        </section>

        {/* ================== UNIX PHILOSOPHY STORY ================== */}
        <section className="reveal p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">

          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            📖 The UNIX Philosophy – A Story That Changed Computing
          </h2>

          <p className="mt-3">
            In the early days at Bell Labs, computers were massive, slow and extremely expensive.
            Engineers like <strong>Dennis Ritchie</strong> and <strong>Ken Thompson</strong>
            had one big problem — complex operating systems were failing often and were
            impossible to maintain.
          </p>

          <p className="mt-3">
            So they did something revolutionary: instead of building one giant program,
            they created <strong>many tiny tools</strong> that each did just one job —
            but did it perfectly.
          </p>

          <p className="mt-3 italic text-slate-600 dark:text-slate-400">
            This idea became the legendary UNIX philosophy:
          </p>

          <blockquote className="mt-4 pl-4 border-l-4 border-sky-400 text-sky-600 dark:text-sky-400 font-medium">
            “Write programs that do one thing and do it well.
            Write programs to work together.”
          </blockquote>

          <p className="mt-4">
            Now imagine Abhronila in Shyamnagar wants to find all exam files larger than 10MB.
            Instead of one giant program, UNIX allows her to combine:
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-1">
            <li><code>find</code> – to search files</li>
            <li><code>grep</code> – to filter names</li>
            <li><code>sort</code> – to arrange results</li>
          </ul>

          <p className="mt-3">
            This *tool-chain thinking* is why UNIX survived for over 50 years
            and why Linux rules the modern world.
          </p>

          {/* Story SVG */}
          <svg viewBox="0 0 640 140" className="w-full mt-6">
            <rect x="30" y="40" width="120" height="40" rx="8" className="fill-sky-400/70 hover:fill-sky-400 transition-all" />
            <text x="90" y="65" textAnchor="middle" className="text-xs fill-white">find</text>

            <rect x="190" y="40" width="120" height="40" rx="8" className="fill-emerald-400/70 hover:fill-emerald-400 transition-all" />
            <text x="250" y="65" textAnchor="middle" className="text-xs fill-white">grep</text>

            <rect x="350" y="40" width="120" height="40" rx="8" className="fill-indigo-400/70 hover:fill-indigo-400 transition-all" />
            <text x="410" y="65" textAnchor="middle" className="text-xs fill-white">sort</text>

            <line x1="150" y1="60" x2="190" y2="60" stroke="currentColor" strokeWidth="2" />
            <line x1="310" y1="60" x2="350" y2="60" stroke="currentColor" strokeWidth="2" />

            <text x="320" y="110" textAnchor="middle" className="text-xs fill-current">
              Small tools → Big power
            </text>
          </svg>
        </section>
        {/* ================== STORY: UNIX, C & LINUX ================== */}
        <section className="reveal p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">

          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            🧩 How UNIX Gave Birth to C — And How C Gave Birth to Linux
          </h2>

          <p className="mt-3 leading-relaxed">
            In the early 1970s, UNIX was originally written in assembly language.
            That meant it could run only on one specific machine.
            Every time Bell Labs bought a new computer, the whole OS had to be rewritten.
            It was a nightmare.
          </p>

          <p className="mt-3">
            Then came a brilliant idea from <strong>Dennis Ritchie</strong>:
            <em>“What if the operating system itself is written in a portable language?”</em>
            That portable language became <strong>C</strong>.
          </p>

          <p className="mt-3">
            UNIX was rewritten almost entirely in C.
            Suddenly, UNIX could be compiled on new machines instead of being rewritten.
            This single decision changed computing forever.
          </p>

          <p className="mt-4">
            Fast-forward to 1991 in Helsinki.
            A student named <strong>Linus Torvalds</strong> was learning UNIX concepts but did not have access
            to a powerful UNIX system at home. So he decided to write his own kernel — in C.
          </p>

          <p className="mt-3">
            That kernel became <strong>Linux</strong>.
            Today, Android phones, cloud servers, stock exchanges and even railway systems in
            places like <strong>Barrackpore</strong> and <strong>Naihati</strong> are powered by this chain reaction:
          </p>

          <div className="mt-5 grid grid-cols-3 gap-4 text-center text-sm">
            <div className="p-3 rounded-xl bg-sky-100 dark:bg-slate-800 hover:shadow-md transition-all">
              <p className="font-semibold text-sky-600 dark:text-sky-400">UNIX</p>
              <p className="text-xs mt-1">Design Philosophy</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-slate-800 hover:shadow-md transition-all">
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">C Language</p>
              <p className="text-xs mt-1">Portable Power</p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-slate-800 hover:shadow-md transition-all">
              <p className="font-semibold text-indigo-600 dark:text-indigo-400">Linux</p>
              <p className="text-xs mt-1">Open World OS</p>
            </div>
          </div>

          {/* Concept SVG */}
          <svg viewBox="0 0 620 160" className="w-full mt-6">
            <rect x="40" y="60" width="140" height="40" rx="8" className="fill-sky-400/70 hover:fill-sky-400 transition-all" />
            <text x="110" y="85" textAnchor="middle" className="text-xs fill-white">UNIX</text>

            <rect x="240" y="60" width="140" height="40" rx="8" className="fill-emerald-400/70 hover:fill-emerald-400 transition-all" />
            <text x="310" y="85" textAnchor="middle" className="text-xs fill-white">C Language</text>

            <rect x="440" y="60" width="140" height="40" rx="8" className="fill-indigo-400/70 hover:fill-indigo-400 transition-all" />
            <text x="510" y="85" textAnchor="middle" className="text-xs fill-white">Linux Kernel</text>

            <line x1="180" y1="80" x2="240" y2="80" stroke="currentColor" strokeWidth="2" />
            <line x1="380" y1="80" x2="440" y2="80" stroke="currentColor" strokeWidth="2" />

            <text x="310" y="130" textAnchor="middle" className="text-xs fill-current">
              Philosophy → Language → Global Operating System
            </text>
          </svg>

          {/* Teacher’s Note */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-slate-800 border-l-4 border-amber-400 hover:shadow-md transition-all">
            <p className="font-semibold text-amber-700 dark:text-amber-400">
              👨‍🏫 Teacher’s Note
            </p>
            <p className="text-sm mt-1 leading-relaxed">
              When Swadeep or Debangshu asks, “Why should I learn C for Linux?” —
              tell them this story.
              UNIX taught us *how to think*, C taught us *how to build*, and Linux showed the world
              what happens when knowledge is shared.
            </p>
          </div>
        </section>

        {/* ================== TRIBUTE: LINUS TORVALDS ================== */}
<section className="reveal p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">

  <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
    🌍 Tribute to Linus Torvalds — The Man Who Changed the Digital World
  </h2>

  <p className="mt-3 leading-relaxed">
    In 1991, a quiet student in Finland named <strong>Linus Torvalds</strong> posted a small message on the internet:
    <em>“I’m doing a free operating system — just a hobby, won’t be big.”</em>
  </p>

  <p className="mt-3">
    That “hobby” became <strong>Linux</strong> — the operating system that now runs:
    smartphones, servers, railway systems, space missions and even school labs in
    places like <strong>Shyamnagar</strong> and <strong>Ichapur</strong>.
  </p>

  <p className="mt-3">
    But Linus didn’t stop there.
    In 2005, when developers around the world were struggling to manage Linux source code,
    he built a new tool in just a few weeks — <strong>Git</strong>.
  </p>

  <p className="mt-3">
    Today, almost every developer — whether in Coder & AccoTax, Barrackpore centres or Silicon Valley —
    uses Git to track changes, collaborate and protect their work.
  </p>

  {/* Concept SVG */}
  <svg viewBox="0 0 620 160" className="w-full mt-6">
    <rect x="40" y="60" width="160" height="40" rx="8" className="fill-indigo-400/70 hover:fill-indigo-400 transition-all" />
    <text x="120" y="85" textAnchor="middle" className="text-xs fill-white">Linux Kernel</text>

    <rect x="260" y="60" width="160" height="40" rx="8" className="fill-rose-400/70 hover:fill-rose-400 transition-all" />
    <text x="340" y="85" textAnchor="middle" className="text-xs fill-white">Git Version Control</text>

    <rect x="480" y="60" width="100" height="40" rx="8" className="fill-emerald-400/70 hover:fill-emerald-400 transition-all" />
    <text x="530" y="85" textAnchor="middle" className="text-xs fill-white">Global Devs</text>

    <line x1="200" y1="80" x2="260" y2="80" stroke="currentColor" strokeWidth="2" />
    <line x1="420" y1="80" x2="480" y2="80" stroke="currentColor" strokeWidth="2" />

    <text x="310" y="130" textAnchor="middle" className="text-xs fill-current">
      One Mind → Two Tools → Entire World Empowered
    </text>
  </svg>

  {/* Teacher’s Note */}
  <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-slate-800 border-l-4 border-amber-400 hover:shadow-md transition-all">
    <p className="font-semibold text-amber-700 dark:text-amber-400">
      👨‍🏫 Teacher’s Note
    </p>
    <p className="text-sm mt-1 leading-relaxed">
      Linus did not work for marks or money.
      He worked to solve problems.
      Tell students like Swadeep or Tuhina:
      <em>great engineers are not born in big companies — they are born in curiosity.</em>
    </p>
  </div>

</section>

{/* ================== SARCASTIC LOVE STORY ================== */}
<section className="reveal p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">

  <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
    💔 My Love Story with UNIX & Linux — And How Windows Stole Me Away
  </h2>

  <p className="mt-3 leading-relaxed">
    UNIX was my first love.  
    Linux was my serious relationship.  
    And Windows… well… Windows was the <em>marriage arranged by society</em>.
  </p>

  <p className="mt-3">
    UNIX was classy — quiet, efficient, never complained.
    Linux was honest — if something broke, it told me exactly what went wrong.
    Together they taught me discipline, logic, and patience — like real life teachers in Coder & AccoTax Class Room.
  </p>

  <p className="mt-3">
    Then came Windows — shiny, popular, famous everywhere.
    Everyone was using it: in schools, cyber cafés in Naihati, coaching centres in Shyamnagar.
    Students like Abhronila would look at my Linux screen and whisper,
    <em>“Sir, Windows mein hota toh click se ho jata…”</em>
  </p>

  <p className="mt-3">
    Slowly I changed.
    I still loved Linux,
    but I started pretending that I was “happy” with Windows.
    Like many real-life love stories — I didn’t leave Linux…
    I just stopped showing it publicly. 😅
  </p>

  <p className="mt-3 italic text-slate-600 dark:text-slate-400">
    Today I teach and use Windows during the day,  
    but at night I secretly open a terminal and whisper:  
    <strong>“I never stopped loving you.”</strong>
  </p>

  {/* Concept SVG */}
  <svg viewBox="0 0 640 180" className="w-full mt-6">
    <text x="100" y="60" className="text-xs fill-current">UNIX</text>
    <text x="300" y="60" className="text-xs fill-current">Linux</text>
    <text x="520" y="60" className="text-xs fill-current">Windows</text>

    <circle cx="100" cy="100" r="18" className="fill-sky-400/70 hover:fill-sky-400 transition-all" />
    <circle cx="300" cy="100" r="18" className="fill-emerald-400/70 hover:fill-emerald-400 transition-all" />
    <circle cx="520" cy="100" r="18" className="fill-rose-400/70 hover:fill-rose-400 transition-all" />

    <line x1="118" y1="100" x2="282" y2="100" stroke="currentColor" strokeWidth="2" />
    <line x1="318" y1="100" x2="502" y2="100" stroke="currentColor" strokeWidth="2" />

    <text x="320" y="150" textAnchor="middle" className="text-xs fill-current">
      From Pure Love → True Understanding → Social Pressure
    </text>
  </svg>

  {/* Teacher's Note */}
  <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-slate-800 border-l-4 border-amber-400 hover:shadow-md transition-all">
    <p className="font-semibold text-amber-700 dark:text-amber-400">
      👨‍🏫 Teacher’s Note
    </p>
    <p className="text-sm mt-1 leading-relaxed">
      Operating systems are tools — not fashion.
      Windows may be popular, but Linux makes you powerful.
      Never forget your roots, even if society forces you to use a GUI. 😉
    </p>
  </div>

</section>





        {/* ================== COMMON PITFALLS ================== */}
        <section className="reveal p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-300 dark:border-rose-800 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold text-rose-500 flex items-center gap-2">
            <AlertTriangle size={18} /> Common Pitfalls
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Thinking Linux and UNIX are identical</li>
            <li>Believing Linux is a copy of UNIX</li>
            <li>Ignoring UNIX philosophy when learning commands</li>
          </ul>
        </section>

        {/* ================== BEST PRACTICES ================== */}
        <section className="reveal p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-800 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold text-emerald-500 flex items-center gap-2">
            <CheckCircle size={18} /> Best Practices
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Learn Linux as UNIX philosophy, not just commands</li>
            <li>Understand history before jumping into shell scripting</li>
            <li>Respect open-source communities</li>
          </ul>
        </section>

        {/* ================== TEACHER NOTE ================== */}
        <section className="reveal p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-300 dark:border-indigo-800 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold text-indigo-500">👨‍🏫 Teacher’s Note</h2>
          <p className="mt-2">
            Many students think Linux is just another OS. But once you understand
            the UNIX evolution, Linux becomes a powerful *system philosophy*,
            not just software. This mindset separates beginners from professionals.
          </p>
        </section>

        {/* ================== CHECKLIST ================== */}
        <section className="reveal p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300">📝 Mini Checklist</h2>
          <ul className="list-disc ml-6 mt-2">
            <li>UNIX started at Bell Labs in 1969</li>
            <li>Linux is inspired by UNIX but not UNIX itself</li>
            <li>UNIX philosophy influences all modern OS</li>
          </ul>
        </section>

        {/* KEYFRAMES */}
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }
}
