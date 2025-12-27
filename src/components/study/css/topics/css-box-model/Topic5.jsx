// src/components/study/css/responsive/Topic5.jsx
// Topic 6 – Designing Layouts for Mobile, Tablet & Desktop

import React, { Component } from "react";
import { Layout, Smartphone, Monitor, Tablet, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

const styles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(14px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic5 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false, width: window.innerWidth, copied:false };
    this.handleResize = this.handleResize.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
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
  copyToClipboard(code){
    navigator.clipboard.writeText(code).then(()=>{
      this.setState({copied:true});
      setTimeout(()=>this.setState({copied:false}),1500);
    });
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 rounded-2xl p-5 bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    const code = `
/* Mobile */
.container { padding: 1rem; }

/* Tablet */
@media (min-width: 768px) {
  .container { display: grid; grid-template-columns: 1fr 1fr; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { grid-template-columns: repeat(3, 1fr); }
}`;

    return (
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-8">
        <style>{styles}</style>

        {/* CONCEPT */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-sky-500">
            <Layout size={18}/> Designing Layouts Across Devices
          </h2>
          <p className="mt-2">
            A professional website must behave differently on phones, tablets
            and desktops. Swadeep checks notes on mobile in Barrackpore,
            while Abhronila edits projects on desktop in Naihati.
          </p>
        </section>

        {/* LIVE WIDTH */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <svg viewBox="0 0 400 80" className="w-full">
            <rect x="10" y="30" width="380" height="10" rx="5" fill="#0ea5e9" />
            <circle cx={(this.state.width/1600)*380+10} cy="35" r="8" fill="#22c55e">
              <animate attributeName="r" from="6" to="8" dur="0.4s" />
            </circle>
            <text x="10" y="20" fill="#94a3b8" fontSize="12">Mobile</text>
            <text x="180" y="20" fill="#94a3b8" fontSize="12">Tablet</text>
            <text x="330" y="20" fill="#94a3b8" fontSize="12">Desktop</text>
          </svg>
          <p className="mt-2 text-sm">Current width: <b>{this.state.width}px</b></p>
        </section>

        {/* CODE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h3 className="font-semibold text-sky-500">Prototype</h3>
          <div className="relative group">
            <button
              onClick={()=>this.copyToClipboard(code)}
              className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-slate-700 text-slate-200 opacity-0 group-hover:opacity-100 transition-all">
              {this.state.copied?"Copied!":"Copy"}
            </button>
            <pre className="bg-slate-800 text-slate-200 p-3 rounded-lg text-sm overflow-x-auto">{code}</pre>
          </div>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Designing desktop first always</li>
            <li>Using fixed widths everywhere</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Start with mobile layout</li>
            <li>Use grid only when space allows</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p className="mt-2">
            Ask students to resize browser and observe when columns should
            increase — this builds intuitive breakpoint thinking.
          </p>
        </section>
      </div>
    );
  }
}
