// src/components/study/css/responsive/Topic8.jsx
// Topic 9 – Relative vs Absolute Units in CSS (Deep Understanding)

import React, { Component } from "react";
import {
  Move,
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

export default class Topic8 extends Component {
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
            <Move size={20}/> Relative vs Absolute Units – Thinking Like a Designer
          </h2>
          <p className="mt-3">
            Swadeep checks your website on a low-end phone in Barrackpore,
            while Tuhina views it on a 24-inch desktop in Naihati.  
            Your layout must work for both — this is impossible with only <b>px</b>.
          </p>
        </section>

        {/* MENTAL MODEL */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Mental Model</h3>
          <p>
            <b>Absolute units</b> lock your design to the machine.  
            <b>Relative units</b> free your design for humans.
          </p>
          <p className="mt-2">
            Designers think in proportions, not pixels.
          </p>
        </section>

        {/* STEP EXAMPLE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Step-by-Step Example</h3>
          <p>Parent container width = 360px</p>
          <ul className="list-disc ml-6 mt-2">
            <li><code>width:300px</code> → Takes 83% of screen (almost full!)</li>
            <li><code>width:50%</code> → Takes 180px (balanced)</li>
            <li><code>width:50vw</code> → Always half of viewport</li>
          </ul>
        </section>

        {/* FONT SCALING */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Font Scaling Example</h3>
          <p>
            html font-size = 16px  
            <br/><code>font-size:1.5rem</code> → Always 24px  
            <br/><code>font-size:1.5em</code> inside 18px parent → 27px (unexpected!)
          </p>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-amber-400">
            <HelpCircle size={16}/> Think About This
          </h3>
          <p>
            If the user increases browser font size,
            should your website fight them or respect them?
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Beginner Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>“px is easier” mindset.</li>
            <li>Nested em multiplying uncontrollably.</li>
            <li>Fixed heights on mobile sections.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Professional Rules
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Typography → rem</li>
            <li>Layouts → % / fr</li>
            <li>Spacing → em</li>
            <li>Fullscreen → svh</li>
          </ul>
        </section>

        {/* CHECKLIST */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-sky-400">
            <Lightbulb size={16}/> Student Checklist
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Does layout adapt on zoom?</li>
            <li>Is mobile experience usable?</li>
            <li>Are fonts readable everywhere?</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            Once students realise that relative units are not “magic”
            but simple mathematics, fear disappears.
          </p>
        </section>

      </div>
    );
  }
}
