// src/components/study/css/responsive/Topic20.jsx
// Topic 8 – Typography Scaling for Accessibility

import React, { Component } from "react";
import {
  Type,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  ClipboardCopy,
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(16px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic20 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false, copied: false };
    this.copyCode = this.copyCode.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  copyCode(text) {
    navigator.clipboard.writeText(text);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 1500);
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    const codeExample = `
html { font-size: 100%; }

h1 {
  font-size: clamp(1.6rem, 3vw, 2.8rem);
}

p {
  font-size: 1rem;
  line-height: 1.6;
}
`;

    return (
      <div className="space-y-10 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <Type size={20} /> Typography Scaling for Accessibility
          </h2>
          <p className="mt-3">
            When Swadeep opens the portal from his small phone in Shyamnagar,
            and Tuhina uses a large desktop in Naihati, your text must stay
            readable everywhere — without breaking the layout.
          </p>
        </section>

        {/* COPYABLE CODE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <div className="relative group mt-3">
            <button
              onClick={() => this.copyCode(codeExample)}
              className="absolute top-2 right-2 text-xs px-2 py-1 bg-slate-700 text-white rounded opacity-0 group-hover:opacity-100 transition"
            >
              <ClipboardCopy size={12} className="inline mr-1" />
              {this.state.copied ? "Copied!" : "Copy"}
            </button>
            <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm overflow-x-auto">
{codeExample}
            </pre>
          </div>
        </section>

        {/* CLAMP EXPLAINED */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Deep Explanation of clamp()</h3>
          <p>
            <code>clamp(min, preferred, max)</code> ensures that font-size:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Never goes below <b>min</b></li>
            <li>Grows fluidly with screen width</li>
            <li>Never exceeds <b>max</b></li>
          </ul>
        </section>

        {/* SVG COMPARISON */}
        <section className={`${card} ${reveal}`}>
          <svg viewBox="0 0 500 140" className="w-full">
            <rect x="40" y="40" width="120" height="50" rx="8" fill="#ef4444"/>
            <text x="65" y="70" fill="#fff">Small</text>
            <rect x="200" y="30" width="120" height="70" rx="8" fill="#22c55e"/>
            <text x="235" y="70" fill="#fff">Medium</text>
            <rect x="360" y="20" width="120" height="90" rx="8" fill="#3b82f6"/>
            <text x="395" y="70" fill="#fff">Large</text>
          </svg>
        </section>

        {/* MINI CHECKLIST */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Mini Checklist</h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Fonts use rem or clamp()</li>
            <li>Line-height ≥ 1.5</li>
            <li>Test at 200% zoom</li>
          </ul>
        </section>

        {/* TEACHER HINT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-amber-400 font-semibold">
            <Lightbulb size={16} /> Teacher Hint
          </h3>
          <p>
            Ask students to zoom the browser to 200% and observe which layouts
            break. That visual shock builds real understanding.
          </p>
        </section>

      </div>
    );
  }
}
