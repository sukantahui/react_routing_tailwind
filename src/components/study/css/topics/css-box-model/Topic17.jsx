// src/components/study/css/responsive/Topic17.jsx
// Topic 5 – Container Queries: Introduction & Future-Proofing Responsive Design

import React, { Component } from "react";
import {
  LayoutTemplate,
  Box,
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

export default class Topic17 extends Component {
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
            <LayoutTemplate size={20}/> Container Queries – Future-Proof CSS
          </h2>
          <p className="mt-3">
            Tuhina placed a card inside a sidebar in Barrackpore,
            but the same card inside a dashboard in Naihati looked broken.
            Media queries failed — because the *screen* didn’t change,  
            only the *container* changed.
          </p>
        </section>

        {/* PROTOTYPE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm">
{`.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { flex-direction: row; }
}`}
          </pre>
          <p className="mt-2 text-sm text-slate-400">
            Purpose: Apply styles based on component width, not viewport.  
            Return Type: <b>Conditional CSS Rule</b>
          </p>
        </section>

        {/* CONCEPT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h3 className="font-semibold text-sky-500">Concept Explained</h3>
          <p>
            Media queries listen to the screen.  
            Container queries listen to the component.
          </p>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-amber-400">
            <HelpCircle size={16}/> Hint
          </h3>
          <p>
            Think about where your component is placed — not how wide the screen is.
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Forgetting to set <code>container-type</code>.</li>
            <li>Expecting old browsers to support container queries.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Use container queries for reusable components.</li>
            <li>Keep media queries only for layout scaffolding.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[620ms]`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            Once students think in containers, their components become portable forever.
          </p>
        </section>
      </div>
    );
  }
}
