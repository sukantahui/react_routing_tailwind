import React, { Component } from "react";
import { Info, Lightbulb, AlertTriangle } from "lucide-react";
import unixFamilyTree from "./images/unix_timeline.png";
const animations = `
@keyframes fadeUp {
  0% { opacity:0; transform: translateY(16px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBSDUnix: false,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({ showBSDUnix: true });
    }


    render() {
        return (
            <div className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-200">

                <style>{animations}</style>

                {/* ========================================================= */}
                {/* INTRO */}
                {/* ========================================================= */}
                <section
                    className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md
                     animate-[fadeUp_0.6s_ease-out] motion-safe:animate-[fadeUp_0.6s_ease-out]
                     transition-all duration-300 hover:shadow-lg"
                >
                    <h1 className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                        Difference between UNIX, Linux and GNU/Linux
                    </h1>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Many beginners — including students like <strong>Swadeep</strong> and <strong>Tuhina</strong> —
                        think UNIX and Linux are the same. Let us clear the confusion with industry-level clarity.
                    </p>
                </section>

                {/* ========================================================= */}
                {/* THEORY */}
                {/* ========================================================= */}
                <section
                    className="grid md:grid-cols-3 gap-6 animate-[fadeUp_0.8s_ease-out] motion-safe:animate-[fadeUp_0.8s_ease-out]"
                >
                    {[
                        {
                            title: "UNIX",
                            text: "Original commercial operating system developed at Bell Labs in the 1970s. Proprietary, stable, and used in enterprise systems like AIX, Solaris.",
                        },
                        {
                            title: "GNU",
                            text: "A free software project started by Richard Stallman to create a complete UNIX-like operating system — but missing the kernel.",
                        },
                        {
                            title: "Linux",
                            text: "A kernel created by Linus Torvalds in 1991. It combined with GNU tools became what we actually use today.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700
                         hover:shadow-xl transition-all duration-300
                         animate-[fadeUp_1s_ease-out] motion-safe:animate-[fadeUp_1s_ease-out]"
                        >
                            <h3 className="font-semibold text-sky-500">{item.title}</h3>
                            <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </section>

                {/* ========================================================= */}
                {/* REAL WORLD USAGE */}
                {/* ========================================================= */}
                <section
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700
                     animate-[fadeUp_1.1s_ease-out] motion-safe:animate-[fadeUp_1.1s_ease-out]
                     transition-all duration-300 hover:shadow-lg"
                >
                    <h2 className="text-xl font-semibold text-emerald-500">Real World Usage</h2>
                    <ul className="list-disc ml-6 mt-3 text-sm text-slate-600 dark:text-slate-400">
                        <li>Servers at Barrackpore ISP data center mostly run GNU/Linux.</li>
                        <li>Apple macOS is UNIX certified.</li>
                        <li>Android is Linux kernel based.</li>
                    </ul>
                </section>

                {/* ================= FOUR SIBLINGS OF TERMINAL WORLD – STORY SECTION ================= */}
                <section
                    className="
    mt-12 space-y-8
    motion-safe:animate-[fadeSlideUp_0.9s_ease-out_forwards]
    opacity-0
  "
                >
                    <style>{`
    @keyframes fadeSlideUp {
      from { opacity:0; transform: translateY(20px); }
      to { opacity:1; transform: translateY(0); }
    }
  `}</style>

                    <h2 className="text-2xl font-bold text-sky-400">
                        🌍 The Four Siblings of the Terminal World
                    </h2>
                    <p className="text-slate-400 italic">
                        UNIX • Linux • BSD • GNU — A Story of Shared Roots
                    </p>

                    <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6 leading-relaxed text-slate-300 transition-all duration-300 hover:border-sky-500 hover:shadow-lg">
                        <p>
                            Once upon a time in the research halls of <b>Bell Labs</b>, a powerful idea was born —
                            an operating system that was small, modular, portable, and elegant. That system was called <b>UNIX</b>.
                        </p>
                        <p className="mt-3">
                            UNIX was not flashy. It didn’t shout. It whispered through the terminal:
                        </p>
                        <blockquote className="mt-3 pl-4 border-l-4 border-sky-500 text-sky-300 italic">
                            “Do one thing. Do it well.”
                        </blockquote>
                    </div>

                    {/* UNIX */}
                    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5 hover:border-emerald-400 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-emerald-300">👨‍🔬 The Elder Brother — UNIX</h3>
                        <p className="mt-2 text-slate-300">
                            UNIX grew up in big companies. Banks and telecom giants loved it. Universities in
                            <b> Shyamnagar</b> and <b>Ichapur</b> trusted it because it was stable like a rock.
                            But UNIX was expensive and closed — only rich organizations could adopt it.
                        </p>
                    </div>

                    {/* GNU */}
                    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5 hover:border-purple-400 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-purple-300">🧠 The Rebel Scholar — GNU</h3>
                        <p className="mt-2 text-slate-300">
                            In the 1980s, Richard Stallman declared:
                        </p>
                        <blockquote className="mt-2 pl-4 border-l-4 border-purple-400 italic text-purple-300">
                            “Software should be free — not in price, but in freedom.”
                        </blockquote>
                        <p className="mt-3">
                            GNU created tools like <code>gcc</code>, <code>bash</code>, <code>ls</code>, <code>cp</code>, <code>mv</code>.
                            But it had everything except the heart — the kernel. Like a classroom in <b>Naihati</b>
                            with teachers, benches, books — but no students.
                        </p>
                    </div>

                    {/* Linux */}
                    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5 hover:border-sky-400 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-sky-300">🐧 The Young Genius — Linux</h3>
                        <p className="mt-2 text-slate-300">
                            In 1991, a Finnish student named <b>Linus Torvalds</b> released the Linux kernel saying:
                        </p>
                        <blockquote className="mt-2 pl-4 border-l-4 border-sky-400 italic text-sky-300">
                            “Just a hobby… not big and professional like GNU.”
                        </blockquote>
                        <p className="mt-3">
                            GNU finally found its missing heart. <b>GNU + Linux = GNU/Linux</b>.
                            And suddenly, students like <b>Abhronila</b> could run world-class servers at home.
                        </p>
                    </div>

                    {/* BSD */}
                    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5 hover:border-cyan-400 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-cyan-300">🌊 The Calm Philosopher — BSD</h3>
                        <p className="mt-2 text-slate-300">
                            BSD grew silently in universities — clean, academic and extremely stable.
                            Apple took BSD’s soul and created macOS.
                            When you open Terminal in a MacBook at a Barrackpore café —
                            you are talking to UNIX’s long-lost cousin.
                        </p>
                    </div>

                    {/* Philosophy */}
                    <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 hover:border-amber-400 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-amber-300">💡 The Shared Philosophy</h3>
                        <p className="mt-2 text-slate-300 italic">
                            Small tools. Clear purpose. Powerful composition.
                        </p>
                        <pre className="mt-3 bg-slate-950/60 border border-slate-700 p-3 rounded-lg text-sky-300 text-sm">
                            ls | grep ".txt" | wc -l
                        </pre>
                    </div>

                    {/* Think */}
                    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4 hover:border-sky-400 transition-all duration-300">
                        <strong className="text-sky-300">🧠 Think About…</strong>
                        <ul className="mt-2 text-slate-300 list-disc ml-5">
                            <li>UNIX taught discipline</li>
                            <li>GNU taught freedom</li>
                            <li>Linux taught collaboration</li>
                            <li>BSD taught stability</li>
                        </ul>
                    </div>
                </section>
                <hr></hr>


                {/* ================= BSD & UNIX – FUNNY RELATIONSHIP STORY ================= */}
                <section
                    className={`
                        mt-14 space-y-6
                        transition-all duration-700
                        ${this.state.showBSDUnix ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                        motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
                    `}
                >
                    <style>{`
                        @keyframes fadeSlideUp {
                        from { opacity:0; transform: translateY(22px); }
                        to { opacity:1; transform: translateY(0); }
                        }
                    `}</style>

                    <h2 className="text-2xl font-bold text-cyan-400">
                        😂 BSD & UNIX — Father, Son or Roommates?
                    </h2>

                    <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6 leading-relaxed text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg">
                        <p>
                            People often ask:
                            <span className="text-cyan-300 font-semibold"> “Is BSD a type of UNIX or is UNIX a type of BSD?”</span>
                        </p>

                        <p className="mt-3">
                            The answer is like asking:
                            <span className="italic text-sky-300">
                                “Is Swadeep copying Debangshu’s homework, or is Debangshu copying Swadeep?”
                            </span>
                        </p>

                        <p className="mt-3">
                            BSD was originally built <b>from UNIX source code</b> by Berkeley University students.
                            They cleaned it, improved networking, and made UNIX more academic and stable.
                        </p>

                        <blockquote className="mt-3 pl-4 border-l-4 border-cyan-400 italic text-cyan-300">
                            BSD is basically: “UNIX with a PhD.”
                        </blockquote>

                        <p className="mt-3">
                            Later legal fights forced BSD developers to rewrite everything —
                            so modern BSD is legally clean and fully independent.
                        </p>

                        <ul className="mt-4 ml-5 list-disc">
                            <li>UNIX = strict father who wrote the rulebook.</li>
                            <li>BSD = brilliant son who rewrote the book neatly.</li>
                            <li>macOS = rich grandson living in Apple’s mansion.</li>
                        </ul>

                        <p className="mt-4 italic text-slate-400">
                            When you open Terminal on macOS in Coder & AccoTax,
                            you are actually talking to BSD — UNIX’s academic son.
                        </p>
                    </div>
                </section>
                
                
                {/* ===================== UNIX FAMILY TREE – VISUAL MAP ===================== */}
<section
  className="
    bg-gradient-to-br from-slate-950 via-slate-900 to-black
    dark:from-black dark:via-slate-950 dark:to-black
    border border-yellow-400/30
    rounded-3xl p-6 shadow-xl
    transition-all duration-300
    hover:shadow-[0_0_35px_rgba(250,204,21,0.35)]
    motion-safe:animate-[fadeSlideUp_1s_ease-out_forwards]
  "
>
  <h2 className="text-xl font-semibold text-yellow-300 mb-4">
    UNIX Family Tree – From Bell Labs to Linux & BSD
  </h2>

  <p className="text-sm text-slate-300 mb-4">
    This timeline visually explains how <b>UNIX evolved into BSD, GNU, Linux and Commercial UNIX</b>.
    Each bar is a real system lineage that still runs servers worldwide.
  </p>

 
  {/* IMAGE FRAME – Light Contrast Panel */}
<div
  className="
    relative flex justify-center items-center
    overflow-hidden
    rounded-2xl border border-yellow-400/40
    bg-gradient-to-br from-white via-slate-100 to-slate-200
    dark:from-slate-100 dark:via-slate-200 dark:to-slate-300
    p-3 md:p-5
    transition-all duration-300
    hover:shadow-[0_0_35px_rgba(250,204,21,0.35)]
  "
>

  <img
  src={unixFamilyTree}
  alt="UNIX Family Tree Timeline"
  className="
    w-full
    max-w-full
    h-auto
    object-contain
    rounded-xl
    shadow-lg
    transition-transform duration-500
    hover:scale-[1.01]
  "
/>
</div>


  <p className="mt-4 text-[12px] text-slate-400 italic">
    Observe how BSD gives birth to macOS, FreeBSD & OpenBSD while GNU finds its soul through the Linux kernel.
  </p>
</section>








                {/* ========================================================= */}
                {/* COMMON PITFALLS */}
                {/* ========================================================= */}
                <section
                    className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-300 dark:border-rose-700
                     animate-[fadeUp_1.2s_ease-out] motion-safe:animate-[fadeUp_1.2s_ease-out]
                     transition-all duration-300 hover:shadow-lg"
                >
                    <h2 className="flex items-center gap-2 font-semibold text-rose-600">
                        <AlertTriangle size={18} /> Common Pitfalls
                    </h2>
                    <ul className="list-disc ml-6 mt-3 text-sm">
                        <li>Thinking Linux is UNIX — it is UNIX-like, not UNIX.</li>
                        <li>Ignoring GNU tools — without them Linux is incomplete.</li>
                        <li>Using “Linux OS” instead of “GNU/Linux”.</li>
                    </ul>
                </section>

                {/* ========================================================= */}
                {/* BEST PRACTICES */}
                {/* ========================================================= */}
                <section
                    className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700
                     animate-[fadeUp_1.3s_ease-out] motion-safe:animate-[fadeUp_1.3s_ease-out]
                     transition-all duration-300 hover:shadow-lg"
                >
                    <h2 className="flex items-center gap-2 font-semibold text-emerald-600">
                        <Lightbulb size={18} /> Best Practices
                    </h2>
                    <ul className="list-disc ml-6 mt-3 text-sm">
                        <li>Always say GNU/Linux in technical writing.</li>
                        <li>Understand kernel vs utilities separation.</li>
                        <li>Use UNIX philosophy: one tool, one job, done well.</li>
                    </ul>
                </section>

                {/* ========================================================= */}
                {/* MINI CHECKLIST */}
                {/* ========================================================= */}
                <section
                    className="p-6 rounded-2xl bg-sky-50 dark:bg-sky-900/20 border border-sky-300 dark:border-sky-700
                     animate-[fadeUp_1.4s_ease-out] motion-safe:animate-[fadeUp_1.4s_ease-out]
                     transition-all duration-300 hover:shadow-lg"
                >
                    <h2 className="font-semibold text-sky-600 flex items-center gap-2">
                        <Info size={18} /> Mini Checklist
                    </h2>
                    <ul className="list-disc ml-6 mt-3 text-sm">
                        <li>UNIX is commercial and proprietary.</li>
                        <li>Linux is just the kernel.</li>
                        <li>GNU/Linux is what we actually use daily.</li>
                    </ul>
                </section>

            </div>
        );
    }
}
