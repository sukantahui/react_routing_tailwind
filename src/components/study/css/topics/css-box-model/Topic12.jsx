// src/components/study/css/responsive/Topic12.jsx
// Topic 0 – Using min(), max() and clamp() Functions in CSS

import React, { Component } from "react";
import { Sliders, AlertTriangle, CheckCircle, HelpCircle, Lightbulb } from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(16px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic12 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted:false };
  }

  componentDidMount(){
    this.setState({ mounted:true });
  }

  render(){
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 rounded-2xl p-6 bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    return (
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-10">
        <style>{animationStyles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <Sliders size={20}/> Using min(), max() and clamp() in CSS
          </h2>
          <p className="mt-3">
            When Swadeep opens a website in Barrackpore on a 5-inch phone,
            the font should shrink.  
            When Abhronila views the same page on a 27-inch monitor in Naihati,
            the font must grow — but never too much.  
            That intelligence comes from <b>min()</b>, <b>max()</b> and <b>clamp()</b>.
          </p>
        </section>

        {/* PROTOTYPE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm overflow-x-auto">
{`font-size: min(20px, 5vw);
width: max(300px, 60%);
font-size: clamp(1rem, 2.5vw, 2rem);`}
          </pre>
          <p className="mt-2 text-sm text-slate-400">
            Return Type: <b>CSS Length Value</b>
          </p>
        </section>

        {/* CONCEPT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h3 className="font-semibold text-sky-500">Concept & Purpose</h3>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><b>min(a, b)</b> → Picks the smallest value.</li>
            <li><b>max(a, b)</b> → Picks the largest value.</li>
            <li><b>clamp(min, ideal, max)</b> → Auto scales between limits.</li>
          </ul>
        </section>

        {/* REAL WORLD */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}>
          <h3 className="font-semibold text-sky-500">Real-World Example</h3>
          <p>
            Tuhina designed a banner with:
          </p>
          <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg mt-2 text-sm">
{`h1 { font-size: clamp(1.2rem, 4vw, 2.5rem); }`}
          </pre>
          <p className="mt-2">
            This means the heading will never go below 1.2rem
            and never exceed 2.5rem — perfect fluid typography.
          </p>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-amber-400">
            <HelpCircle size={16}/> Hint
          </h3>
          <p>
            Think about what happens when the viewport width is very small.
            Which value will <code>clamp()</code> pick?
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Forgetting to include units inside min() & clamp().</li>
            <li>Using clamp without understanding min & max boundaries.</li>
            <li>Hardcoding pixel values again inside clamp.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[620ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Use clamp() for typography.</li>
            <li>Prefer relative units inside clamp.</li>
            <li>Test across widths using DevTools.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[720ms]`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            Once students master <b>clamp()</b>, they rarely need media queries for fonts.
          </p>
        </section>
      </div>
    );
  }
}
