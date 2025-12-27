// src/components/study/css/responsive/Topic2.jsx
// Topic 3 – Desktop-first vs Mobile-first Strategy

import React, { Component } from "react";
import {
  Monitor,
  Smartphone,
  Shuffle,
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

export default class Topic2 extends Component {
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
            <Shuffle size={18} /> Desktop-first vs Mobile-first
          </h2>
          <p className="mt-2">
            In a <strong>desktop-first</strong> approach, we design layouts for
            large screens first and then scale them down for mobiles. In a
            <strong> mobile-first</strong> approach, we start with the smallest
            screen and progressively enhance the layout.
          </p>
          <p className="mt-2">
            Abhronila designing only for her laptop often breaks the UI when
            Swadeep opens it on his phone in Barrackpore.
          </p>
        </section>

        {/* ================= SIGNATURE ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <h2 className="text-lg font-semibold text-sky-500">Signature / Prototype</h2>
          <pre className="bg-slate-800 text-slate-200 p-3 rounded-lg mt-2 text-sm">
{`/* Mobile-first */
@media (min-width: 768px) { ... }

/* Desktop-first */
@media (max-width: 768px) { ... }`}
          </pre>
          <p className="mt-2 text-sm text-slate-400">
            Return type: <strong>CSS Rule Set</strong> – controls layout behavior
            based on screen size.
          </p>
        </section>

        {/* ================= PURPOSE ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-400" /> Purpose
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Ensure layout adapts correctly on all devices</li>
            <li>Control feature expansion from small to large screens</li>
            <li>Maintain clean CSS structure</li>
          </ul>
        </section>

        {/* ================= COMMON PITFALLS ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={18} /> Common Pitfalls
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Mixing min-width and max-width randomly</li>
            <li>Writing too many breakpoints</li>
            <li>Overriding same CSS repeatedly</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={18} /> Best Practices
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Prefer mobile-first with min-width</li>
            <li>Keep base styles for mobile only</li>
            <li>Add complexity only when screen grows</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h2 className="text-xl font-semibold text-sky-500">Teacher’s Note</h2>
          <p className="mt-2">
            Ask students to write base CSS only for mobile and add desktop
            enhancements later — it improves discipline and code clarity.
          </p>
        </section>
      </div>
    );
  }
}
