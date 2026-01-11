import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default class Topic4 extends Component {
  constructor(props){
    super(props);
    this.state = { show:false };
  }

  componentDidMount(){
    setTimeout(()=>this.setState({show:true}),200);
  }

  render(){
    const reveal = this.state.show
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8";

    return (
      <div className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-800 dark:text-slate-200">

        <style>{`
          @keyframes fadeUp {
            from {opacity:0; transform:translateY(20px);}
            to {opacity:1; transform:translateY(0);}
          }
        `}</style>

        <h1 className="text-3xl font-semibold text-sky-600 dark:text-sky-400 mb-10">
          Topic 5 – Unsigned vs Signed Number Representation
        </h1>

        {/* WHITEBOARD */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300">
          <Whiteboard />
        </div>

        {/* INTRODUCTION */}
        <section className={`motion-safe:animate-[fadeUp_0.6s_ease-out] ${reveal}`}>
          <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4">📘 Why This Topic Matters</h2>
            <p>
              Imagine Swadeep from Barrackpore subtracting marks in a school
              software: <code>40 – 60 = –20</code>.  
              The computer must decide:  
              Is this number allowed to be negative or not?
            </p>
            <p className="mt-3">
              This decision is not made by software — it is decided by
              <strong> how the number is stored in memory</strong>.
            </p>
          </div>
        </section>

        {/* SIGNATURE */}
        <section className="mt-12">
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">🔧 Representation Model</h2>
            <p><strong>Prototype:</strong> represent(bits, signedFlag)</p>
            <p><strong>Return Type:</strong> Binary bit-pattern</p>
            <p><strong>Purpose:</strong> Decides how positive and negative values are encoded.</p>
            <p><strong>When & Why Used:</strong> Used in CPU registers, variables, compilers.</p>
          </div>
        </section>

        {/* THEORY UNSIGNED */}
        <section className="mt-12">
          <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">🔹 Unsigned Representation</h2>
            <p>
              In unsigned numbers, <strong>all bits represent magnitude</strong>.
              There is no concept of negative values.
            </p>
            <p className="mt-2">
              In 8-bit unsigned:
              <code>00000000 = 0</code>,  
              <code>11111111 = 255</code>.
            </p>
          </div>
        </section>

        {/* THEORY SIGNED */}
        <section className="mt-12">
          <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">🔹 Signed Representation</h2>
            <p>
              Signed numbers use the <strong>Most Significant Bit (MSB)</strong>
              to store the sign.
            </p>
            <p className="mt-2">
              In 8-bit signed:
              <h3><code>01111111 = +127</code>,</h3>
              <h3><code>10000000 = –128</code>.</h3>
            </p>
          </div>
        </section>

        {/* RANGE SVG */}
        <section className="mt-12">
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">📊 Value Range Comparison</h2>
            <svg viewBox="0 0 760 220" className="w-full">
              <rect x="40" y="60" width="300" height="70" rx="14" className="fill-sky-100 dark:fill-sky-900"/>
              <text x="70" y="95" className="font-semibold">Unsigned (8-bit)</text>
              <text x="70" y="125">0 → 255</text>

              <rect x="420" y="60" width="300" height="70" rx="14" className="fill-emerald-100 dark:fill-emerald-900"/>
              <text x="450" y="95" className="font-semibold">Signed (8-bit)</text>
              <text x="450" y="125">–128 → +127</text>
            </svg>
          </div>
        </section>

        {/* PITFALLS */}
        <section className="mt-12">
          <div className="bg-rose-50 dark:bg-rose-900/30 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">⚠ Common Pitfalls</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Believing sign is stored separately.</li>
              <li>Using unsigned when negatives are required.</li>
              <li>Misunderstanding MSB behavior.</li>
            </ul>
          </div>
        </section>

        {/* HINT */}
        <section className="mt-12">
          <div className="bg-sky-50 dark:bg-sky-900/30 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">💡 Think About…</h2>
            <p>
              What will happen if –45 is stored in an unsigned variable?
            </p>
          </div>
        </section>

        {/* TEACHER NOTE */}
        <section className="mt-12">
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">👨‍🏫 Teacher’s Note</h2>
            <p>
              Tell students: the CPU does not know “minus”.
              It only understands bit patterns.
            </p>
          </div>
        </section>

        {/* CHECKLIST */}
        <section className="mt-12">
          <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">✅ Mini Checklist</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>I can state unsigned and signed ranges.</li>
              <li>I understand MSB usage.</li>
              <li>I know why signed range is asymmetric.</li>
            </ul>
          </div>
        </section>

      </div>
    );
  }
}
