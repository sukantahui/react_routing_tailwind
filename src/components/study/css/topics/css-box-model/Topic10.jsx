// src/components/study/css/responsive/Topic10.jsx
// Topic 11 – vh & vw Pitfalls on Mobile Devices (Deep Understanding)

import React, { Component } from "react";
import {
  Smartphone,
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

export default class Topic10 extends Component {
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
            <Smartphone size={20}/> Why 100vh Breaks on Mobile Devices
          </h2>
          <p className="mt-3">
            Abhronila created a hero section using
            <code>height:100vh</code>.  
            It looked perfect on laptop.  
            On her phone, the button disappeared under the browser bar.
          </p>
        </section>

        {/* MENTAL MODEL */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Mental Model</h3>
          <p>
            Desktop browsers have a stable viewport.  
            Mobile browsers have a <b>dynamic viewport</b> — the address bar
            appears and disappears while scrolling.
          </p>
        </section>

        {/* SVG */}
        <section className={`${card} ${reveal}`}>
          <svg viewBox="0 0 480 140" className="w-full">
            <rect x="40" y="20" width="120" height="100" rx="8" fill="#0ea5e9"/>
            <text x="60" y="75" fill="#fff">100vh</text>
            <rect x="240" y="40" width="120" height="80" rx="8" fill="#22c55e"/>
            <text x="255" y="85" fill="#fff">100svh</text>
          </svg>
        </section>

        {/* NUMERIC BREAKDOWN */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Numeric Breakdown</h3>
          <p>
            Visible mobile screen height = 720px  
            Browser calculates viewport as = 800px  
            So:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li><code>100vh = 800px</code> → overflow ❌</li>
            <li><code>100svh = 720px</code> → perfect fit ✅</li>
          </ul>
        </section>

        {/* SOLUTION */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">The Correct Units</h3>
          <ul className="list-disc ml-6 mt-2">
            <li><b>svh</b> – small viewport height (safe)</li>
            <li><b>dvh</b> – dynamic viewport height</li>
            <li><b>lvh</b> – large viewport height</li>
          </ul>
          <p className="mt-2">
            Always prefer: <code>min-height:100svh</code>
          </p>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-amber-400">
            <HelpCircle size={16}/> Observe Carefully
          </h3>
          <p>
            Scroll any website on your phone.
            Notice how the address bar changes height.
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Beginner Mistakes
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Using height instead of min-height.</li>
            <li>Relying on 100vh blindly.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Professional Rules
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Never trust vh on mobile.</li>
            <li>Always use svh or dvh.</li>
            <li>Test on real devices.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            vh was designed for desktops.  
            Mobile changed the rules — and CSS evolved.
          </p>
        </section>

      </div>
    );
  }
}
