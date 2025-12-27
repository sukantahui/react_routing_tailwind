// src/components/study/css/responsive/Topic19.jsx
// Topic 7 – Handling Overflow & Horizontal Scroll Bugs

import React, { Component } from "react";
import {
  Scroll,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% {opacity:0; transform:translateY(16px);}
  100% {opacity:1; transform:translateY(0);}
}
`;

export default class Topic19 extends Component {
  constructor(props){
    super(props);
    this.state={ mounted:false };
  }

  componentDidMount(){
    this.setState({mounted:true});
  }

  render(){
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card="border border-slate-300/20 dark:border-slate-700 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl";

    return(
      <div className="space-y-10 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <Scroll size={20}/> Horizontal Scroll – The Invisible Monster
          </h2>
          <p className="mt-3">
            When Debangshu opened his website on mobile in Ichapur,
            he could swipe left — and suddenly empty white space appeared.
            That single bug is enough to fail real-world UI interviews.
          </p>
        </section>

        {/* PROTOTYPE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">Prototype / Signature</h3>
          <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm mt-2">
{`body {
  overflow-x: hidden;
}

img {
  max-width: 100%;
}`}
          </pre>
        </section>

        {/* CAUSES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">Why Horizontal Scroll Happens</h3>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Fixed width elements larger than viewport.</li>
            <li>Images without max-width.</li>
            <li>Negative margins.</li>
            <li>100vw used inside padded containers.</li>
          </ul>
        </section>

        {/* SVG */}
        <section className={`${card} ${reveal}`}>
          <svg viewBox="0 0 460 120" className="w-full">
            <rect x="10" y="30" width="360" height="60" rx="8" fill="#22c55e"/>
            <rect x="350" y="30" width="120" height="60" rx="8" fill="#ef4444"/>
            <text x="80" y="70" fill="#fff">Viewport</text>
            <text x="365" y="70" fill="#fff" fontSize="12">Overflow</text>
          </svg>
        </section>

        {/* FIXES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">Professional Fixes</h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Replace width:100vw with width:100%.</li>
            <li>Add overflow-x:hidden to body.</li>
            <li>Inspect using Chrome DevTools → Layout.</li>
          </ul>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-amber-400 font-semibold">
            <HelpCircle size={16}/> Hint
          </h3>
          <p>
            Think about what happens when padding is added to a 100vw container.
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-red-400 font-semibold">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Using 100vw blindly.</li>
            <li>Forgetting max-width on images.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Always test on mobile widths.</li>
            <li>Use outline:1px solid red to debug.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">Teacher’s Note</h3>
          <p>
            One hidden horizontal scroll can destroy the user’s trust forever.
          </p>
        </section>

      </div>
    );
  }
}
