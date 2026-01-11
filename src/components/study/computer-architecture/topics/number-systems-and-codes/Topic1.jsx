import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";
export default class Topic1 extends Component {
  constructor(props){
    super(props);
    this.state = { show:false };
  }

  componentDidMount(){
    setTimeout(()=>this.setState({show:true}),180);
  }

  render(){
    const reveal = this.state.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

    return (
      <div className="max-w-6xl mx-auto px-6 py-10 leading-relaxed text-slate-800 dark:text-slate-200">

        <style>{`
          @keyframes fadeUp {
            from{opacity:0; transform:translateY(20px);}
            to{opacity:1; transform:translateY(0);}
          }
        `}</style>

        <h1 className="text-3xl font-semibold text-sky-600 dark:text-sky-400 mb-8">
          Topic 2 – Conversion from Decimal to Binary (Deep Dive)
        </h1>

        {/* PURPOSE */}
        <section className={`motion-safe:animate-[fadeUp_0.6s_ease-out] ${reveal}`}>
          <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">🎯 Purpose</h2>
            <p>
              This topic explains <strong>how a decimal number is translated into binary</strong>.
              When Debangshu from Ichapur stores marks <code>73</code>, the system converts it into
              a pattern of 0s and 1s using a precise algorithm.
            </p>
          </div>
        </section>

        {/* PROTOTYPE */}
        <section className="mt-10">
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">🔧 Algorithm Signature</h2>
            <p><strong>Prototype:</strong> decimalToBinary(n)</p>
            <p><strong>Return Type:</strong> String</p>
            <p><strong>Purpose:</strong> Converts a decimal integer into its binary equivalent.</p>
            <p><strong>When & Why Used:</strong> Used internally by CPUs and debugging tools.</p>
          </div>
        </section>

        {/* THEORY */}
        <section className={`mt-10 motion-safe:animate-[fadeUp_0.7s_ease-out] ${reveal}`}>
          <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">📘 Step-by-Step Theory</h2>
            <p>
              The number is divided repeatedly by 2. Each remainder is a binary digit.
              The final binary is obtained by reading the remainders <strong>bottom to top</strong>.
            </p>
          </div>
        </section>

        {/* SVG WALKTHROUGH */}
        <section className={`mt-10 motion-safe:animate-[fadeUp_0.8s_ease-out] ${reveal}`}>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">🔢 Example – Convert 73</h2>
            <svg viewBox="0 0 650 200" className="w-full">
              <text x="40" y="40">73 ÷ 2 = 36 r1</text>
              <text x="200" y="40">36 ÷ 2 = 18 r0</text>
              <text x="360" y="40">18 ÷ 2 = 9 r0</text>
              <text x="520" y="40">9 ÷ 2 = 4 r1</text>

              <text x="100" y="90">4 ÷ 2 = 2 r0</text>
              <text x="260" y="90">2 ÷ 2 = 1 r0</text>
              <text x="420" y="90">1 ÷ 2 = 0 r1</text>

              <text x="250" y="150" className="font-semibold">
                Binary = 1001001
              </text>
            </svg>
          </div>
          <Whiteboard/>
        </section>

        {/* COMMON PITFALLS */}
        <section className="mt-10">
          <div className="bg-rose-50 dark:bg-rose-900/30 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">⚠ Common Pitfalls</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Reading remainders from top to bottom.</li>
              <li>Stopping before quotient becomes zero.</li>
              <li>Mixing division method with positional method.</li>
            </ul>
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section className="mt-10">
          <div className="bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">🌟 Best Practices</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Always draw the division ladder.</li>
              <li>Circle remainders before reading.</li>
              <li>Practice with random values daily.</li>
            </ul>
          </div>
        </section>

        {/* THINK */}
        <section className="mt-10">
          <div className="bg-sky-50 dark:bg-sky-900/30 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">💡 Think About…</h2>
            <p>
              Try converting <code>157</code>.  
              Observe how the number of steps increases as the value grows.
            </p>
          </div>
        </section>

        {/* TEACHER NOTE */}
        <section className="mt-10">
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">👨‍🏫 Teacher’s Note</h2>
            <p>
              Most students fail because they reverse reading order.
              Train them to always read <strong>bottom to top</strong>.
            </p>
          </div>
        </section>

        {/* CHECKLIST */}
        <section className="mt-10">
          <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">✅ Mini Checklist</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>I can convert any decimal number to binary manually.</li>
              <li>I understand remainder logic clearly.</li>
              <li>I never confuse reading order.</li>
            </ul>
          </div>
        </section>

      </div>
    );
  }
}
