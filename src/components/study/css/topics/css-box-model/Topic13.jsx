// src/components/study/css/responsive/Topic13.jsx
// Topic 1 – Media Query Syntax: min-width & max-width Patterns

import React, { Component } from "react";
import {
  SlidersHorizontal,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(16px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic13 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted:false, copied:false };
    this.copy = this.copy.bind(this);
  }

  componentDidMount(){
    this.setState({ mounted:true });
  }

  copy(code){
    navigator.clipboard.writeText(code);
    this.setState({ copied:true });
    setTimeout(()=>this.setState({ copied:false }),1500);
  }

  render(){
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 rounded-2xl p-6 bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    const code = `
/* Mobile First */
body { font-size:1rem; }

@media (min-width:768px){
  body{ font-size:1.125rem; }
}

@media (min-width:1024px){
  body{ font-size:1.25rem; }
}`.trim();

    return (
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-10">
        <style>{animationStyles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <SlidersHorizontal size={20}/> Media Query Syntax – min-width & max-width
          </h2>
          <p className="mt-3">
            When Swadeep opens your site on his phone in Shyamnagar,
            it should start small.  
            As he rotates his tablet or switches to desktop in Barrackpore,
            your layout must grow smoothly — not break.
          </p>
        </section>

        {/* PROTOTYPE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <div className="relative group mt-2">
            <button
              onClick={()=>this.copy(code)}
              className="absolute top-2 right-2 text-xs px-2 py-1 bg-slate-700 text-white rounded opacity-0 group-hover:opacity-100 transition"
            >
              {this.state.copied?"Copied!":"Copy"}
            </button>
            <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm overflow-x-auto">
{code}
            </pre>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Return Type: <b>Conditional CSS Rule</b>
          </p>
        </section>

        {/* CONCEPT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h3 className="font-semibold text-sky-500">Concept & Purpose</h3>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><b>min-width</b> → Apply styles when screen becomes larger.</li>
            <li><b>max-width</b> → Apply styles when screen becomes smaller.</li>
            <li>Mobile-first uses <b>min-width</b>.</li>
            <li>Desktop-first uses <b>max-width</b>.</li>
          </ul>
        </section>

        {/* REAL WORLD */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}>
          <h3 className="font-semibold text-sky-500">Real-World Scenario</h3>
          <p>
            Tuhina built a card layout for phones.  
            When Debangshu opened it on desktop, the cards were too large.  
            Adding a <code>@media (min-width:1024px)</code> rule fixed everything.
          </p>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-amber-400">
            <HelpCircle size={16}/> Hint
          </h3>
          <p>
            Think about what happens if two media queries overlap.
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Mixing min-width & max-width patterns randomly.</li>
            <li>Writing desktop styles first.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[620ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Always start mobile-first.</li>
            <li>Group related queries.</li>
            <li>Document your breakpoints.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[720ms]`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            Media queries are not for devices — they are for layouts.
          </p>
        </section>
      </div>
    );
  }
}
