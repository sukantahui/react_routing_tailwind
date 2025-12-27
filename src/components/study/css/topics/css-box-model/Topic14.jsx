// src/components/study/css/responsive/Topic14.jsx
// Topic 2 – Orientation Based Media Queries (Portrait vs Landscape)

import React, { Component } from "react";
import {
  Smartphone,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(16px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic14 extends Component {
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
            <Smartphone size={20}/> Orientation Based Media Queries
          </h2>
          <p className="mt-3">
            When Abhronila reads study notes in portrait mode from Ichapur,
            the layout looks perfect.  
            But when she rotates her phone to landscape, everything overlaps.
            That’s where orientation queries save you.
          </p>
        </section>

        {/* SVG EXPLAIN */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <svg viewBox="0 0 500 120" className="w-full">
            <rect x="60" y="20" width="60" height="90" rx="8" fill="#22c55e"/>
            <text x="65" y="115" fontSize="10">Portrait</text>

            <rect x="220" y="60" width="120" height="50" rx="8" fill="#0ea5e9"/>
            <text x="240" y="115" fontSize="10">Landscape</text>
          </svg>
        </section>

        {/* PROTOTYPE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm">
{`@media (orientation: portrait){
  .layout{ flex-direction: column; }
}

@media (orientation: landscape){
  .layout{ flex-direction: row; }
}`}
          </pre>
          <p className="mt-2 text-sm text-slate-400">
            Return Type: <b>Conditional CSS Rule</b>
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Designing only for portrait mode.</li>
            <li>Forgetting tablets rotate frequently.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Test both orientations.</li>
            <li>Use flex/grid for layout flipping.</li>
          </ul>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[620ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-amber-400">
            <HelpCircle size={16}/> Hint
          </h3>
          <p>
            Try rotating your phone while DevTools device toolbar is active.
          </p>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[720ms]`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            Orientation bugs are silent killers — students only notice after deployment.
          </p>
        </section>
      </div>
    );
  }
}
