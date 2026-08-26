// src/components/study/css/responsive/Topic23.jsx
// Topic 23 – Testing Responsive Design using Browser DevTools

import React, { Component } from "react";
import {
  Monitor,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  ClipboardCopy,
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic23 extends Component {
  constructor(props){
    super(props);
    this.state = { mounted:false, copied:false };
  }

  componentDidMount(){
    this.setState({ mounted:true });
  }

  copyCode(text){
    navigator.clipboard.writeText(text);
    this.setState({ copied:true });
    setTimeout(()=>this.setState({copied:false}),1500);
  }

  render(){
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "border border-slate-300/20 dark:border-slate-700 rounded-2xl p-6 bg-white/70 dark:bg-slate-900/70 shadow transition-all duration-300 hover:shadow-xl hover:border-sky-400";

    const code = `
/* DevTools Testing Helpers */

img {
  max-width: 100%;
  height: auto;
}

.container {
  max-width: 1200px;
  padding: 1rem;
  margin: auto;
}

@media (max-width: 768px) {
  nav { flex-direction: column; }
}`;

    return(
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-10">
        <style>{animationStyles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <Monitor size={20}/> Testing Responsive Design using DevTools
          </h2>
          <p className="mt-2">
            When Abhronila opened her project in Ichapur,
            everything broke on mobile — but worked on laptop.
            Real developers don’t guess screen sizes — they <b>test using DevTools</b>.
          </p>
        </section>

        {/* COPY CODE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <p className="text-sm mb-2">
            Return Type: <b>Visual feedback & layout simulation</b>
          </p>
          <div className="relative group mt-3">
            <button
              onClick={()=>this.copyCode(code)}
              className="absolute top-2 right-2 text-xs px-2 py-1 bg-slate-700 text-white rounded opacity-0 group-hover:opacity-100"
            >
              <ClipboardCopy size={12}/> {this.state.copied?"Copied":"Copy"}
            </button>
            <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm overflow-x-auto">
{code}
            </pre>
          </div>
        </section>

        {/* STEP BY STEP */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">How to Open Responsive Mode</h3>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Open DevTools: <b>F12 / Ctrl + Shift + I</b></li>
            <li>Click the <b>Device Toolbar 📱 icon</b></li>
            <li>Select devices: iPhone, Pixel, iPad</li>
            <li>Change width & height sliders</li>
            <li>Rotate screen (landscape / portrait)</li>
          </ul>
        </section>

        {/* SVG */}
        <section className={`${card} ${reveal}`}>
          <svg viewBox="0 0 520 160" className="w-full">
            <rect x="20" y="40" width="120" height="80" rx="8" fill="#0ea5e9"/>
            <text x="55" y="85" fill="#fff">Desktop</text>
            <rect x="200" y="50" width="70" height="60" rx="6" fill="#22c55e"/>
            <text x="210" y="85" fill="#fff">Tablet</text>
            <rect x="330" y="60" width="40" height="50" rx="6" fill="#f97316"/>
            <text x="338" y="90" fill="#fff" fontSize="10">Phone</text>
          </svg>
        </section>

        {/* REAL WORLD */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">Real-World Usage</h3>
          <p>
            In Barrackpore coaching centre, students tested navbar behavior
            at 375px width and instantly found broken flex layouts.
          </p>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-amber-400 font-semibold">
            <HelpCircle size={16}/> Hint
          </h3>
          <p>
            Observe carefully what happens when width drops below 768px —
            which element overflows first?
          </p>
        </section>

        {/* PITFALLS */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-red-400 font-semibold">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Testing only on desktop view.</li>
            <li>Ignoring landscape mode.</li>
            <li>Hardcoding widths in px.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Test at 320px, 375px, 768px & 1024px.</li>
            <li>Always test zoom at 200%.</li>
            <li>Simulate slow networks.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-amber-400 font-semibold">
            <Lightbulb size={16}/> Teacher’s Note
          </h3>
          <p>
            A responsive bug not tested in DevTools is not a bug —
            it is a future complaint.
          </p>
        </section>
      </div>
    );
  }
}
