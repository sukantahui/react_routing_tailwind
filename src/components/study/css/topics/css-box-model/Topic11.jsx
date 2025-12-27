// src/components/study/css/responsive/Topic11.jsx
// Topic 12 – clamp(), min() & max(): Fluid Typography

import React, { Component } from "react";
import {
  Gauge,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  HelpCircle,
} from "lucide-react";

const styles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
.reveal { animation: fadeSlideUp 0.7s ease-out forwards; }
`;

export default class Topic11 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted:false };
  }

  componentDidMount() {
    this.setState({ mounted:true });
  }

  render() {
    const reveal = this.state.mounted ? "reveal" : "opacity-0";
    const card =
      "border border-slate-300/20 dark:border-slate-700 rounded-2xl p-6 bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    return (
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-10">
        <style>{styles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <Gauge size={20}/> clamp(), min() & max() – Fluid Typography
          </h2>
          <p className="mt-3">
            Swadeep increased screen width and suddenly his headings
            became too big.  
            With <b>clamp()</b>, we tell CSS: “Grow — but only inside limits.”
          </p>
        </section>

        {/* CORE IDEA */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Core Idea</h3>
          <p>
            Traditional media queries break at fixed points.  
            <b>clamp()</b> creates a smooth scale between small and large screens.
          </p>
        </section>

        {/* SYNTAX */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <pre className="bg-slate-800 text-slate-200 p-3 rounded mt-2 text-sm">
font-size: clamp(min, preferred, max);
          </pre>
        </section>

        {/* NUMERIC */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Numeric Example</h3>
          <p>
            <code>font-size: clamp(1rem, 2vw, 2.5rem);</code>
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Never below 16px.</li>
            <li>Scales with viewport width.</li>
            <li>Never above 40px.</li>
          </ul>
        </section>

        {/* MIN MAX */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">min() & max()</h3>
          <p>
            <code>width: min(90%, 1200px);</code> keeps layouts readable.
          </p>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-amber-400">
            <HelpCircle size={16}/> Think About This
          </h3>
          <p>
            Resize browser slowly — notice smooth font change.
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Common Mistakes
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Forgetting min & max limits.</li>
            <li>Using px inside clamp.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Use rem + vw combo.</li>
            <li>Avoid media queries for fonts.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            clamp() is the bridge between design and mathematics.
          </p>
        </section>

      </div>
    );
  }
}
