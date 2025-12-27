// src/components/study/css/responsive/Topic21.jsx
// Topic 9 – Building a Fully Responsive Navigation Bar

import React, { Component } from "react";
import {
  Menu,
  X,
  LayoutPanelTop,
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

export default class Topic21 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      copied: false,
      menuOpen: false,
    };
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

  toggleMenu() {
    this.setState((prev) => ({ menuOpen: !prev.menuOpen }));
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    const navCode = `
<nav class="flex items-center justify-between p-4 bg-sky-600 text-white">
  <span class="font-bold">Coder & AccoTax</span>
  <ul class="hidden md:flex gap-6">
    <li>Home</li>
    <li>Courses</li>
    <li>Contact</li>
  </ul>
  <button class="md:hidden">☰</button>
</nav>`;

    return (
      <div className="space-y-10 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <LayoutPanelTop size={20} /> Building a Fully Responsive Navigation Bar
          </h2>
          <p className="mt-3">
            When Abhronila checks the school portal from Ichapur on her phone,
            the menu must collapse into a hamburger icon — not break into chaos.
          </p>
        </section>

        {/* LIVE DEMO */}
        <section className={`${card} ${reveal}`}>
          <div className="flex items-center justify-between bg-sky-600 p-4 rounded-xl text-white">
            <span className="font-bold">My Portal</span>
            <button
              onClick={() => this.toggleMenu()}
              className="md:hidden"
            >
              {this.state.menuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
            <ul className="hidden md:flex gap-4">
              <li>Home</li>
              <li>Courses</li>
              <li>Contact</li>
            </ul>
          </div>

          {this.state.menuOpen && (
            <ul className="md:hidden mt-2 bg-sky-500 text-white rounded-xl p-4 space-y-2">
              <li>Home</li>
              <li>Courses</li>
              <li>Contact</li>
            </ul>
          )}
        </section>

        {/* COPY CODE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <div className="relative group mt-3">
            <button
              onClick={() => this.copyCode(navCode)}
              className="absolute top-2 right-2 text-xs px-2 py-1 bg-slate-700 text-white rounded opacity-0 group-hover:opacity-100 transition"
            >
              <ClipboardCopy size={12} className="inline mr-1"/>
              {this.state.copied ? "Copied!" : "Copy"}
            </button>
            <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm overflow-x-auto">
{navCode}
            </pre>
          </div>
        </section>

        {/* COMMON PITFALLS */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-red-400 font-semibold">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Hiding menu without fallback for mobile.</li>
            <li>Using px for menu width.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Mobile-first navigation design.</li>
            <li>Use flexbox for layout.</li>
            <li>Test at all breakpoints.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-amber-400 font-semibold">
            <Lightbulb size={16}/> Teacher’s Note
          </h3>
          <p>
            Make students toggle the screen width and observe
            how layout behavior changes. Visual learning is unbeatable.
          </p>
        </section>

      </div>
    );
  }
}
