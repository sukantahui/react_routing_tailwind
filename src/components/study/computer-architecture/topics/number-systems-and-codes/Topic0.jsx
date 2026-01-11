import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";
export default class Topic0 extends Component {
  constructor(props){
    super(props);
    this.state = { visible: false };
  }

  componentDidMount(){
    setTimeout(() => this.setState({ visible: true }), 200);
  }

  render(){
    const reveal = this.state.visible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-6";

    return (
      <div className="max-w-6xl mx-auto px-6 py-10 text-slate-800 dark:text-slate-200 leading-relaxed">

        <style>{`
          @keyframes fadeUp {
            from { opacity:0; transform:translateY(20px); }
            to { opacity:1; transform:translateY(0); }
          }
        `}</style>

        <h1 className="text-3xl font-semibold mb-8 text-sky-600 dark:text-sky-400">
          Topic 1 – Decimal, Binary, Octal & Hexadecimal Conversions
        </h1>

        {/* THEORY */}
        <section className={`motion-safe:animate-[fadeUp_0.6s_ease-out] ${reveal}`}>
          <div className="bg-white/70 dark:bg-slate-900/70 rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">📘 Concept & Theory</h2>
            <p>
              Computers do not understand decimal numbers like humans. Instead,
              everything is stored in <strong>binary (base-2)</strong>.
              When Swadeep from Barrackpore types <code>25</code>, the computer stores
              it internally as <code>11001</code>.
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-1">
              <li><strong>Decimal (Base-10)</strong> → Human counting system</li>
              <li><strong>Binary (Base-2)</strong> → CPU language</li>
              <li><strong>Octal (Base-8)</strong> → Compact binary form</li>
              <li><strong>Hexadecimal (Base-16)</strong> → Memory addresses & debugging</li>
            </ul>
          </div>
        </section>

        {/* SVG STEP VISUAL */}
        <section className={`mt-10 motion-safe:animate-[fadeUp_0.7s_ease-out] ${reveal}`}>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">🔢 Visual: Decimal → Binary</h2>

            <svg viewBox="0 0 600 120" className="w-full">
              <text x="20" y="50">25 ÷ 2 = 12 r1</text>
              <text x="200" y="50">12 ÷ 2 = 6 r0</text>
              <text x="360" y="50">6 ÷ 2 = 3 r0</text>
              <text x="480" y="50">3 ÷ 2 = 1 r1</text>
              <text x="260" y="95" className="font-semibold">Binary → 11001</text>
            </svg>
          </div>
        </section>

        {/* REAL WORLD */}
        <section className={`mt-10 motion-safe:animate-[fadeUp_0.8s_ease-out] ${reveal}`}>
          <div className="bg-white/70 dark:bg-slate-900/70 rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">🌍 Real-World Use</h2>
            <p>
              When Tuhina from Shyamnagar checks a MAC address like
              <code> FF:1A:0C </code>, she is reading a hexadecimal number directly
              mapped to binary hardware signals.
            </p>
          </div>
          <Whiteboard/>
        </section>

        {/* COMMON PITFALLS */}
        <section className="mt-10">
          <div className="bg-rose-50 dark:bg-rose-900/30 rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">⚠ Common Pitfalls</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Confusing base-8 and base-16 digits</li>
              <li>Forgetting remainder order in division method</li>
              <li>Assuming hex is only for programmers — it is for hardware</li>
            </ul>
          </div>
        </section>

        {/* HINT */}
        <section className="mt-10">
          <div className="bg-sky-50 dark:bg-sky-900/30 rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">💡 Think About…</h2>
            <p>
              Try converting <code>19</code> into binary.  
              Observe how the remainder sequence changes when dividing repeatedly.
            </p>
          </div>
        </section>

        {/* TEACHER NOTE */}
        <section className="mt-10">
          <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">👨‍🏫 Teacher’s Note</h2>
            <p>
              Students often memorise formulas without understanding the meaning.
              Always explain that each binary bit is a <strong>power of 2</strong>.
              This mental model avoids 80% of number-system mistakes.
            </p>
          </div>
        </section>

        {/* MINI CHECKLIST */}
        <section className="mt-10">
          <div className="bg-white/70 dark:bg-slate-900/70 rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">✅ Mini Checklist</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>I can convert decimal to binary manually</li>
              <li>I understand why hex is used in memory</li>
              <li>I can explain base systems without memorising</li>
            </ul>
          </div>
        </section>

      </div>
    );
  }
}
