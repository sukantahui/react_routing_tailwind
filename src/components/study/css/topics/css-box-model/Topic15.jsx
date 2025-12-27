// src/components/study/css/responsive/Topic15.jsx
// Topic 3 – Targeting High-Resolution Screens (Device Pixel Ratio)

import React, { Component } from "react";
import {
  Monitor,
  ZoomIn,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(16px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic15 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted:false };
  }

  componentDidMount(){
    this.setState({ mounted:true });
  }

  render(){
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 rounded-2xl p-6 bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    return (
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-10">
        <style>{animationStyles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <Monitor size={20}/> Targeting High-Resolution Screens
          </h2>
          <p className="mt-3">
            When Debangshu opens your site on a Retina MacBook in Barrackpore,
            your logo looks blurry — but it was sharp on Swadeep’s old laptop in Naihati.
            This is because of <b>device pixel ratio</b>.
          </p>
        </section>

        {/* PROTOTYPE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[120ms]`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm">
{`@media (-webkit-min-device-pixel-ratio: 2), 
       (min-resolution: 192dpi) {
  .logo { background-image: url("logo@2x.png"); }
}`}
          </pre>
          <p className="mt-2 text-sm text-slate-400">
            Purpose: Serve sharper assets on high-DPI screens.  
            Return Type: <b>Conditional CSS Rule</b>
          </p>
        </section>

        {/* CONCEPT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[220ms]`}>
          <h3 className="font-semibold text-sky-500">Concept Explained</h3>
          <p>
            Device Pixel Ratio compares physical pixels to CSS pixels.
            Retina displays pack 2–3 physical pixels inside one CSS pixel.
          </p>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[320ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-amber-400">
            <HelpCircle size={16}/> Hint
          </h3>
          <p>
            Think about why your background images look blurred only on expensive devices.
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[420ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-red-400">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Serving heavy 4x images to all devices.</li>
            <li>Ignoring retina completely.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[520ms]`}>
          <h3 className="font-semibold flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Use SVG whenever possible.</li>
            <li>Use srcset for images.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal} motion-safe:animation-delay-[620ms]`}>
          <h3 className="font-semibold text-sky-500">Teacher’s Note</h3>
          <p>
            Retina bugs are invisible on cheap monitors — students must learn to test on real devices.
          </p>
        </section>
      </div>
    );
  }
}
