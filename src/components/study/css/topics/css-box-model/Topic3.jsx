// src/components/study/css/responsive/Topic3.jsx
// Topic 4 – Understanding Viewports & Meta Viewport Tag

import React, { Component } from "react";
import {
  Globe,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react";

const styles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(14px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic3 extends Component {
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
          <h2 className="text-xl font-semibold flex items-center gap-2 text-sky-600 dark:text-sky-400">
            <Globe size={18} /> What is a Viewport?
          </h2>
          <p className="mt-2">
            The viewport is the visible area of the web page on a device. Mobile
            browsers fake a wide viewport unless instructed otherwise.
          </p>
          <p className="mt-2">
            When Tuhina opens a website on her phone in Naihati, the browser may
            zoom out unless the viewport is properly defined.
          </p>
        </section>

        {/* ================= SIGNATURE ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <h2 className="text-lg font-semibold text-sky-500">
            Signature / Prototype
          </h2>
          <pre className="bg-slate-800 text-slate-200 p-3 rounded-lg mt-2 text-sm">
{`<meta name="viewport" content="width=device-width, initial-scale=1.0">`}
          </pre>
          <p className="mt-2 text-sm text-slate-400">
            Return type: <strong>HTML Meta Configuration</strong> – controls
            layout scaling on devices.
          </p>
        </section>

        {/* ================= PURPOSE ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-400" /> Purpose
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Prevent unwanted zoom on mobile</li>
            <li>Ensure CSS widths behave correctly</li>
            <li>Allow true responsive layouts</li>
          </ul>
        </section>

        {/* ================= COMMON PITFALLS ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={18} /> Common Pitfalls
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Forgetting the meta viewport tag</li>
            <li>Using fixed-width viewports</li>
            <li>Confusing device width with CSS width</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={18} /> Best Practices
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Always include viewport meta in all projects</li>
            <li>Never use fixed widths for mobile layouts</li>
            <li>Test layouts on real devices</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h2 className="text-xl font-semibold text-sky-500">Teacher’s Note</h2>
          <p className="mt-2">
            Show students how the same page behaves with and without the meta
            viewport — it creates an unforgettable lesson.
          </p>
        </section>
      </div>
    );
  }
}
