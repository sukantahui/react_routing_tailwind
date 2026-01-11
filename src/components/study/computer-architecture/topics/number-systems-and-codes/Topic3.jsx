import React, { Component } from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default class Topic3 extends Component {
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

        <h1 className="text-3xl font-semibold text-sky-600 dark:text-sky-400 mb-6">
          Topic 4 – Conversion from Decimal to Hexadecimal
        </h1>

        {/* WHITEBOARD */}
        <div className="mb-10 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300">
          <Whiteboard />
        </div>

        {/* PURPOSE */}
        <section className={`motion-safe:animate-[fadeUp_0.6s_ease-out] ${reveal}`}>
          <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">🎯 Purpose</h2>
            <p>
              Hexadecimal (Base-16) is used to represent large binary values compactly.
              When Tuhina from Shyamnagar inspects a memory address like
              <code> 0x2F3A </code>, she is actually reading a compressed binary value.
            </p>
          </div>
        </section>

        {/* PROTOTYPE */}
        <section className="mt-10">
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">🔧 Algorithm Signature</h2>
            <p><strong>Prototype:</strong> decimalToHex(n)</p>
            <p><strong>Return Type:</strong> String</p>
            <p><strong>Purpose:</strong> Converts decimal numbers to hexadecimal format.</p>
            <p><strong>When & Why Used:</strong> Used in memory dumps, debugging tools, MAC & IP processing.</p>
          </div>
        </section>

        {/* THEORY */}
        <section className={`mt-10 motion-safe:animate-[fadeUp_0.7s_ease-out] ${reveal}`}>
          <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">📘 Step-by-Step Theory</h2>
            <p>
              Repeatedly divide the decimal number by <strong>16</strong>.
              Each remainder is mapped to hex digits 0-9, A-F.
              Read the remainders from <strong>bottom to top</strong>.
            </p>
          </div>
        </section>

        {/* PROFESSIONAL SVG */}
        <section className={`mt-10 motion-safe:animate-[fadeUp_0.8s_ease-out] ${reveal}`}>
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-2xl transition-all duration-300">

            <h2 className="text-xl font-semibold mb-4">🔢 Decimal → Hexadecimal : Visual Algorithm (250)</h2>

            <svg viewBox="0 0 820 420" className="w-full">

              <text x="60" y="40" className="font-semibold">Step</text>
              <text x="160" y="40" className="font-semibold">Division</text>
              <text x="400" y="40" className="font-semibold">Quotient</text>
              <text x="560" y="40" className="font-semibold">Remainder</text>

              <rect x="40" y="60" width="720" height="70" rx="14" className="fill-sky-100 dark:fill-sky-900"/>
              <text x="70" y="105">1</text>
              <text x="160" y="105">250 ÷ 16</text>
              <text x="410" y="105">15</text>
              <text x="580" y="105" className="font-semibold">10 → A</text>

              <rect x="40" y="150" width="720" height="70" rx="14" className="fill-sky-100 dark:fill-sky-900"/>
              <text x="70" y="195">2</text>
              <text x="160" y="195">15 ÷ 16</text>
              <text x="410" y="195">0</text>
              <text x="580" y="195" className="font-semibold">15 → F</text>

              <line x1="670" y1="220" x2="670" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="2s" repeatCount="indefinite"/>
              </line>

              <rect x="240" y="300" width="360" height="60" rx="18" className="fill-emerald-100 dark:fill-emerald-900"/>
              <text x="320" y="340" className="font-semibold text-emerald-700 dark:text-emerald-300">
                Final Hexadecimal = FA
              </text>

            </svg>
          </div>
        </section>

        {/* THINK */}
        <section className="mt-10">
          <div className="bg-sky-50 dark:bg-sky-900/30 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">💡 Think About…</h2>
            <p>Convert <code>356</code> into hexadecimal. Observe how A-F appear.</p>
          </div>
        </section>

        {/* TEACHER NOTE */}
        <section className="mt-10">
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-3">👨‍🏫 Teacher’s Note</h2>
            <p>
              Students forget mapping 10→A, 11→B…  
              Make them write the hex table at the top of every page.
            </p>
          </div>
        </section>

      </div>
    );
  }
}
