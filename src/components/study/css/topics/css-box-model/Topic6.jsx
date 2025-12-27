// src/components/study/css/responsive/Topic6.jsx
// Topic 7 – Fluid Layouts vs Fixed Layouts

import React, { Component } from "react";
import { Droplets, Grid, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

const styles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(14px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic6 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted:false, copied:false };
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  componentDidMount(){
    this.setState({mounted:true});
  }

  copyToClipboard(code){
    navigator.clipboard.writeText(code).then(()=>{
      this.setState({copied:true});
      setTimeout(()=>this.setState({copied:false}),1500);
    });
  }

  render(){
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 rounded-2xl p-5 bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    const code = `
/* Fixed layout */
.container { width: 960px; }

/* Fluid layout */
.container-fluid { width: 90%; max-width: 1200px; margin:auto; }`;

    return(
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-8">
        <style>{styles}</style>

        {/* CONCEPT */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-sky-500">
            <Grid size={18}/> Fixed vs Fluid Layouts
          </h2>
          <p className="mt-2">
            A fixed layout has constant width. A fluid layout stretches based on
            screen size. Debangshu viewing your site in Ichapur on mobile will
            suffer if width is locked to desktop pixels.
          </p>
        </section>

        {/* SVG DIAGRAM */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <svg viewBox="0 0 400 120" className="w-full">
            <rect x="10" y="20" width="180" height="40" rx="6" fill="#0ea5e9"/>
            <text x="50" y="45" fill="#fff" fontSize="12">Fixed 960px</text>

            <rect x="10" y="80" width="360" height="25" rx="6" fill="#22c55e">
              <animate attributeName="width" from="200" to="360" dur="0.8s" />
            </rect>
            <text x="130" y="97" fill="#fff" fontSize="12">Fluid 90%</text>
          </svg>
        </section>

        {/* CODE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h3 className="font-semibold text-sky-500">Prototype</h3>
          <div className="relative group">
            <button
              onClick={()=>this.copyToClipboard(code)}
              className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-slate-700 text-slate-200 opacity-0 group-hover:opacity-100 transition">
              {this.state.copied?"Copied!":"Copy"}
            </button>
            <pre className="bg-slate-800 text-slate-200 p-3 rounded-lg text-sm">{code}</pre>
          </div>
        </section>

        {/* PURPOSE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}>
          <h3 className="font-semibold flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-400"/> Purpose
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Fluid layouts adapt naturally to screen sizes</li>
            <li>Reduce horizontal scrolling bugs</li>
          </ul>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Using only fixed widths</li>
            <li>Ignoring max-width boundaries</li>
          </ul>
        </section>

        {/* BEST PRACTICE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Combine percentage width with max-width</li>
            <li>Always test fluid layouts on mobile</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[620ms]`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p className="mt-2">
            Ask students to convert one fixed layout into fluid —
            they instantly feel the power of responsive design.
          </p>
        </section>
      </div>
    );
  }
}
