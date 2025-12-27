// src/components/study/css/responsive/Topic9.jsx
// Topic 10 – rem vs em: Inheritance Problems Explained

import React, { Component } from "react";
import {
  Repeat,
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

export default class Topic9 extends Component {
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
            <Repeat size={20}/> rem vs em – Inheritance Problems
          </h2>
          <p className="mt-3">
            Tuhina increased font-size inside a card using <code>em</code>.
            Suddenly everything inside became huge.  
            This is not a bug — this is <b>em inheritance multiplication</b>.
          </p>
        </section>

        {/* CORE CONCEPT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Core Concept</h3>
          <p>
            <b>rem</b> → relative to <code>html</code> root.  
            <b>em</b> → relative to its <b>parent element</b>.
          </p>
        </section>

        {/* NUMERIC EXAMPLE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Numeric Breakdown</h3>
          <p>
            html font-size = 16px  
            <br/>.card font-size = 1.5em → 24px  
            <br/>.card p font-size = 1.5em → 36px ❌
          </p>
          <p className="mt-2">
            Same using rem:
            <br/>.card font-size = 1.5rem → 24px  
            <br/>.card p font-size = 1.5rem → 24px ✅
          </p>
        </section>

        {/* REAL WORLD */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Real Classroom Scenario</h3>
          <p>
            In a student portal card,
            Debangshu changed card font to 1.3em.
            All buttons became unreadable because nested em multiplied.
          </p>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-amber-400">
            <HelpCircle size={16}/> Think Carefully
          </h3>
          <p>
            Ask yourself: is this size based on root or parent?
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Common Mistakes
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Using em for global fonts.</li>
            <li>Nesting em inside cards repeatedly.</li>
            <li>Forgetting that em multiplies.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Use rem for font-size.</li>
            <li>Use em only for spacing inside components.</li>
            <li>Set html font-size once.</li>
          </ul>
        </section>

        {/* CHECKLIST */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-sky-400">
            <Lightbulb size={16}/> Mini Checklist
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Are all fonts rem-based?</li>
            <li>Any unexpected giant text?</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            rem gives predictability. em gives flexibility.  
            Use both — but never confuse their power.
          </p>
        </section>

      </div>
    );
  }
}
