// src/components/study/css/responsive/Topic1.jsx
// Topic 2 – Mobile-first Design Approach

import React, { Component } from "react";
import {
  Smartphone,
  Layers,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

const styles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(14px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic1 extends Component {
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
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-2">
            <Smartphone size={18} /> What is Mobile-first Design?
          </h2>
          <p className="mt-2">
            Mobile-first design means creating your website layout for **small
            screens first**, and then enhancing it for tablets and desktops.
          </p>
          <p className="mt-2">
            Tuhina checks homework updates on her phone in Shyamnagar. If the
            layout is designed only for desktop, the site becomes painful to
            use.
          </p>
        </section>

        {/* ================= PURPOSE ================= */}
        <section
          className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Layers size={18} className="text-sky-500" /> Purpose
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Ensures core content loads fast on mobile</li>
            <li>Improves usability on slow networks</li>
            <li>Forces developers to prioritize essentials</li>
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
            When Debangshu opens the student portal from Ichapur using mobile
            data, a mobile-first site loads quickly without heavy layouts or
            unnecessary visuals.
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
            <li>Designing desktop first and trying to “shrink” later</li>
            <li>Hiding content on mobile instead of redesigning</li>
            <li>Ignoring touch interactions</li>
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
            <li>Start layout using min-width media queries</li>
            <li>Keep mobile layout simple & focused</li>
            <li>Enhance features progressively for larger screens</li>
          </ul>
        </section>

        {/* ================= HINT ================= */}
        <section
          className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}
        >
          <h2 className="text-xl font-semibold text-sky-400">Hint</h2>
          <p className="mt-2 italic">
            Observe which parts of a website are actually needed on a phone
            screen first.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`${card} ${reveal} motion-safe:animation-delay-[620ms]`}
        >
          <h2 className="text-xl font-semibold text-sky-500">Teacher’s Note</h2>
          <p className="mt-2">
            Ask students to design the layout only for a mobile screen on paper
            before writing any CSS. It changes how they think.
          </p>
        </section>
      </div>
    );
  }
}
