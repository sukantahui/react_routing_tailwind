// src/components/study/css/responsive/Topic0.jsx
// Topic 1 – What is Responsive Design and Why It Matters

import React, { Component } from "react";
import { Info, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

const styles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(14px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic0 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 rounded-2xl p-5 bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    return (
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-8">
        <style>{styles}</style>

        {/* ================= CONCEPT ================= */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            What is Responsive Design?
          </h2>
          <p className="mt-2">
            Responsive design means building websites that automatically adjust
            layout, text, images and components for different screen sizes —
            mobile, tablet, laptop and large monitors.
          </p>
          <p className="mt-2">
            For example, Swadeep checks the school portal on his phone in
            Barrackpore, while Abhronila opens the same page on a desktop in
            Naihati. Both should get a perfect experience.
          </p>
        </section>

        {/* ================= PURPOSE ================= */}
        <section
          className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Info size={18} className="text-sky-500" /> Purpose
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Ensure usability across all devices</li>
            <li>Prevent horizontal scrolling and zooming</li>
            <li>Improve accessibility and readability</li>
          </ul>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section
          className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-400" /> Real-World Usage
          </h2>
          <p className="mt-2">
            In schools like Ichapur or Shyamnagar, many students only use phones.
            A non-responsive website becomes unreadable and frustrating.
          </p>
        </section>

        {/* ================= COMMON PITFALLS ================= */}
        <section
          className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={18} /> Common Pitfalls
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Designing only for desktop screens</li>
            <li>Using fixed widths everywhere</li>
            <li>Forgetting mobile users completely</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section
          className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={18} /> Best Practices
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Always start designing for mobile first</li>
            <li>Use flexible units like %, rem, vw</li>
            <li>Test layouts on multiple screen sizes</li>
          </ul>
        </section>

        {/* ================= HINT ================= */}
        <section
          className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}
        >
          <h2 className="text-xl font-semibold text-sky-400">Hint</h2>
          <p className="mt-2 italic">
            Think about what happens when a wide desktop layout is opened on a
            5-inch phone screen.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`${card} ${reveal} motion-safe:animation-delay-[620ms]`}
        >
          <h2 className="text-xl font-semibold text-sky-500">Teacher’s Note</h2>
          <p className="mt-2">
            Always show students the same page on phone and desktop to visually
            demonstrate why responsive design is not optional anymore.
          </p>
        </section>
      </div>
    );
  }
}
