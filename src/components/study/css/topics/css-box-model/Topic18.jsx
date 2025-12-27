// src/components/study/css/responsive/Topic18.jsx
// Topic 6 – Responsive Images with max-width:100%, height:auto & object-fit

import React, { Component } from "react";
import {
  Image as ImageIcon,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% {opacity:0; transform:translateY(16px);}
  100% {opacity:1; transform:translateY(0);}
}
`;

export default class Topic18 extends Component {
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

    const card = "border border-slate-300/20 dark:border-slate-700 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 shadow hover:shadow-xl transition-all duration-300";

    return(
      <div className="space-y-10 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <ImageIcon size={20}/> Responsive Images – Why Images Break Layouts
          </h2>
          <p className="mt-3">
            When Swadeep uploaded his project screenshot from Shyamnagar,
            it overflowed the mobile screen.  
            Abhronila opened the same page in Barrackpore and the image pushed the sidebar out.
            This is the most common responsive design mistake — images are not responsive by default.
          </p>
        </section>

        {/* PROTOTYPE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">Prototype / Signature</h3>
          <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm mt-2">
{`img {
  max-width: 100%;
  height: auto;
}

.card-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}`}
          </pre>
          <p className="text-sm mt-2 text-slate-400">
            Purpose → Prevent overflow and distortion  
            Return Type → CSS size behavior
          </p>
        </section>

        {/* CONCEPT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">Concept Explained</h3>
          <p className="mt-2">
            Images keep their original pixel size unless you control them.
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><b>max-width:100%</b> → Never allow image to exceed container width.</li>
            <li><b>height:auto</b> → Maintain original aspect ratio.</li>
            <li><b>object-fit:cover</b> → Crop image nicely inside fixed box.</li>
          </ul>
        </section>

        {/* SVG */}
        <section className={`${card} ${reveal}`}>
          <svg viewBox="0 0 480 140" className="w-full">
            <rect x="20" y="20" width="180" height="100" rx="8" fill="#22c55e"/>
            <text x="55" y="80" fill="#fff">Container</text>
            <rect x="240" y="40" width="200" height="60" rx="6" fill="#0ea5e9"/>
            <text x="280" y="80" fill="#fff">Responsive Image</text>
          </svg>
        </section>

        {/* REAL WORLD */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">Real World Example</h3>
          <p>
            Tuhina created a profile card with a fixed height image:
          </p>
          <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm mt-2">
{`.profile-pic {
  width:100%;
  height:180px;
  object-fit:cover;
}`}
          </pre>
          <p className="mt-2">
            The image looks perfect on all screens without distortion.
          </p>
        </section>

        {/* HINT */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-amber-400 font-semibold">
            <HelpCircle size={16}/> Hint
          </h3>
          <p>
            Try removing <code>height:auto</code> and resize the browser — observe distortion.
          </p>
        </section>

        {/* COMMON PITFALLS */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-red-400 font-semibold">
            <AlertTriangle size={16}/> Common Pitfalls
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Hard coding width & height.</li>
            <li>Using background-image when img is needed.</li>
            <li>Forgetting object-fit.</li>
          </ul>
        </section>

        {/* BEST PRACTICES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle size={16}/> Best Practices
          </h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Always add max-width:100%.</li>
            <li>Use object-fit:cover for cards.</li>
            <li>Prefer SVG logos.</li>
          </ul>
        </section>

        {/* MINI CHECKLIST */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">Mini Checklist</h3>
          <ul className="list-disc ml-6 mt-2">
            <li>✔ Does the image overflow?</li>
            <li>✔ Does it distort on resize?</li>
            <li>✔ Does it maintain ratio?</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">Teacher’s Note</h3>
          <p>
            Teach students to fix image bugs first — everything else depends on this.
          </p>
        </section>
      </div>
    );
  }
}
