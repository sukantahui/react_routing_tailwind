// src/components/study/css/responsive/Topic16.jsx
// Topic 4 – Combining Multiple Conditions in Media Queries

import React, { Component } from "react";
import {
  Layers,
  Filter,
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

export default class Topic16 extends Component {
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
            <Layers size={20}/> Combining Multiple Media Query Conditions
          </h2>
          <p className="mt-3">
            Swadeep’s website worked perfectly on phones and desktops.
            But on tablets in landscape mode in Shyamnagar — the layout broke.
            Why? Because real life rarely fits one condition.
          </p>
        </section>

        {/* PROTOTYPE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm">
{`@media (min-width:768px) and (orientation: landscape) {
  .sidebar { display:block; }
}`}
          </pre>
          <p className="mt-2 text-sm text-slate-400">
            Purpose: Apply styles only when <b>multiple conditions are true</b>.  
            Return Type: <b>Conditional CSS Rule</b>
          </p>
        </section>

        {/* CONCEPT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h3 className="font-semibold text-sky-500">Concept Explained</h3>
          <p>
            You can join multiple conditions using:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li><b>and</b> – all conditions must be true.</li>
            <li><b>,</b> – OR condition.</li>
            <li><b>not</b> – exclude conditions.</li>
          </ul>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-amber-400">
            <HelpCircle size={16}/> Hint
          </h3>
          <p>
            Observe carefully: Which condition fails first when resizing?
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Forgetting parentheses around conditions.</li>
            <li>Confusing comma with AND.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Start with width first, then add orientation.</li>
            <li>Keep conditions readable.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[620ms]`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            Real devices live in the overlap zone — teach students to code for grey areas.
          </p>
        </section>
      </div>
    );
  }
}
