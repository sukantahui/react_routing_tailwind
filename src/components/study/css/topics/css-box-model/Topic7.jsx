// src/components/study/css/responsive/Topic7.jsx
// Topic 8 – Units in CSS (Absolute, Relative, Viewport & Typography Units)

import React, { Component } from "react";
import {
  Ruler,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  HelpCircle
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic7 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted:false, copied:false };
    this.copy = this.copy.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted:true });
  }

  copy(code) {
    navigator.clipboard.writeText(code);
    this.setState({ copied:true });
    setTimeout(() => this.setState({ copied:false }), 1500);
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 rounded-2xl p-6 bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    const code = `
html { font-size:16px; }

.box-px   { width:200px; }
.box-per  { width:50%; }
.text-rem { font-size:1.5rem; }
.text-em  { font-size:1.5em; }
.full-vh  { height:100svh; }
.para-ch  { max-width:60ch; }
`;

    return (
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-10">
        <style>{animationStyles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <Ruler size={20}/> Units in CSS – How Size Really Works
          </h2>
          <p className="mt-3">
            Swadeep opens the portal from his phone in Shyamnagar,
            while Abhronila checks from her desktop in Barrackpore.
            CSS units decide whether your layout adapts or collapses.
          </p>
        </section>

        {/* SVG */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <svg viewBox="0 0 520 110" className="w-full">
            <rect x="20" y="40" width="80" height="40" rx="6" fill="#0ea5e9"/>
            <text x="45" y="65" fill="#fff">px</text>
            <rect x="120" y="40" width="80" height="40" rx="6" fill="#22c55e"/>
            <text x="145" y="65" fill="#fff">%</text>
            <rect x="220" y="40" width="80" height="40" rx="6" fill="#f59e0b"/>
            <text x="240" y="65" fill="#fff">rem</text>
            <rect x="320" y="40" width="80" height="40" rx="6" fill="#ec4899"/>
            <text x="345" y="65" fill="#fff">vw</text>
            <rect x="420" y="40" width="80" height="40" rx="6" fill="#a855f7"/>
            <text x="445" y="65" fill="#fff">ch</text>
          </svg>
        </section>

        {/* PROTOTYPE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[200ms]`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <div className="relative group mt-2">
            <button
              onClick={() => this.copy(code)}
              className="absolute top-2 right-2 text-xs px-2 py-1 bg-slate-700 text-white rounded opacity-0 group-hover:opacity-100 transition"
            >
              {this.state.copied ? "Copied!" : "Copy"}
            </button>
            <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm overflow-x-auto">
{code}
            </pre>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            <b>Return Type:</b> CSS Length Value
          </p>
        </section>

        {/* EACH UNIT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[300ms]`}>
          <h3 className="font-semibold text-sky-500">Each Unit Explained</h3>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><b>px</b> – Fixed pixel. Use for borders & icons only.</li>
            <li><b>%</b> – Relative to parent container width.</li>
            <li><b>em</b> – Relative to parent font-size (can multiply badly).</li>
            <li><b>rem</b> – Relative to root font-size (best for fonts).</li>
            <li><b>vw / vh</b> – Based on viewport size.</li>
            <li><b>ch</b> – Width of character “0”. Best for article width.</li>
          </ul>
        </section>

        {/* VIEWPORT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[400ms]`}>
          <h3 className="font-semibold text-sky-500">Viewport Units – Based on Screen Size</h3>
          <p>
            On Swadeep’s phone (360px wide), 1vw = 3.6px.
            On Abhronila’s laptop (1440px), 1vw = 14.4px.
          </p>
          <p className="mt-2"><code>height: 100svh;</code> fixes mobile vh bugs.</p>
        </section>

        {/* TYPOGRAPHY */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[480ms]`}>
          <h3 className="font-semibold text-sky-500">Typography Units – Best for Fonts</h3>
          <ul className="list-disc ml-6 mt-2">
            <li>rem → Page fonts</li>
            <li>em → Component scaling</li>
            <li>ch → Article width (60ch ideal)</li>
          </ul>
        </section>

        {/* COMPARISON */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[560ms]`}>
          <h3 className="font-semibold text-sky-500">Real Comparison</h3>
          <table className="w-full text-sm mt-2 border border-slate-700">
            <thead className="bg-slate-800">
              <tr><th className="p-2">Unit</th><th>Based On</th><th>Use</th></tr>
            </thead>
            <tbody>
              <tr><td className="p-2">px</td><td>Screen</td><td>Borders</td></tr>
              <tr><td className="p-2">%</td><td>Parent</td><td>Layouts</td></tr>
              <tr><td className="p-2">rem</td><td>Root</td><td>Fonts</td></tr>
              <tr><td className="p-2">vw</td><td>Viewport</td><td>Hero Sections</td></tr>
            </tbody>
          </table>
        </section>

        {/* GOLDEN RULES */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[650ms]`}>
          <h3 className="font-semibold text-emerald-400">Golden Rules</h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Fonts → rem</li>
            <li>Layouts → %</li>
            <li>Fullscreen → svh</li>
            <li>Articles → ch</li>
            <li>Borders → px</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[720ms]`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            px makes layouts rigid. rem makes them human.
            Teach zoom behaviour once — confusion disappears forever.
          </p>
        </section>

      </div>
    );
  }
}
