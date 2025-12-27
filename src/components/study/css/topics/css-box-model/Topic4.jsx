// src/components/study/css/responsive/Topic4.jsx
// Topic 5 – Breakpoints: How to Choose Real-World Breakpoints

import React, { Component } from "react";
import { Ruler, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

const styles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(14px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      width: window.innerWidth,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: true });
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({ width: window.innerWidth });
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
            <Ruler size={18} /> What are Breakpoints?
          </h2>
          <p className="mt-2">
            Breakpoints are **screen widths where your layout changes**.
            Instead of targeting devices, professionals design breakpoints
            based on **content breaking**, not phone models.
          </p>
          <p className="mt-2">
            When Swadeep opens a table layout on his mobile in Barrackpore,
            columns overflow — that is a signal to introduce a breakpoint.
          </p>
        </section>

        {/* ================= SIGNATURE ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <h3 className="font-semibold text-sky-500">Signature / Prototype</h3>
          <pre className="bg-slate-800 text-slate-200 p-3 rounded-lg mt-2 text-sm">
{`@media (min-width: 640px) { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }`}
          </pre>
          <p className="text-sm mt-2 text-slate-400">
            Return type: <strong>CSS Media Rule</strong> — switches layout styles
            at defined widths.
          </p>
        </section>

        {/* ================= LIVE WIDTH SVG ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h3 className="font-semibold text-sky-500 mb-2">
            Live Screen Width Indicator
          </h3>

          <svg viewBox="0 0 400 80" className="w-full">
            <rect x="10" y="30" width="380" height="10" rx="5" fill="#0ea5e9" />
            <circle
              cx={(this.state.width / 1600) * 380 + 10}
              cy="35"
              r="8"
              fill="#22c55e"
            >
              <animate
                attributeName="r"
                from="6"
                to="8"
                dur="0.4s"
                repeatCount="1"
              />
            </circle>
            <text x="10" y="20" fill="#94a3b8" fontSize="12">
              Mobile
            </text>
            <text x="180" y="20" fill="#94a3b8" fontSize="12">
              Tablet
            </text>
            <text x="330" y="20" fill="#94a3b8" fontSize="12">
              Desktop
            </text>
          </svg>

          <p className="mt-2 text-sm">
            Current width: <strong>{this.state.width}px</strong>
          </p>
        </section>

        {/* ================= PURPOSE ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}>
          <h3 className="font-semibold flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-400" /> Purpose
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Prevent layout breaking on different screens</li>
            <li>Ensure readability for all users</li>
            <li>Deliver professional UI across devices</li>
          </ul>
        </section>

        {/* ================= COMMON PITFALLS ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16} /> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Using device-based breakpoints blindly</li>
            <li>Too many breakpoints causing messy CSS</li>
            <li>Ignoring content width behavior</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16} /> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Start with content, not device sizes</li>
            <li>Keep breakpoints minimal</li>
            <li>Always test by resizing browser</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[620ms]`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p className="mt-2">
            Ask students to shrink browser slowly and **mark where UI breaks** —
            those points are real breakpoints, not numbers from Google.
          </p>
        </section>
      </div>
    );
  }
}
