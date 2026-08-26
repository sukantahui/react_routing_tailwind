// src/components/study/css/responsive/Topic22.jsx
// Topic 22 – Display Property of CSS (block, inline, inline-block, flex)

import React, { Component } from "react";
import {
  Layers,
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

export default class Topic22 extends Component {
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
.block { display:block; }
.inline { display:inline; }
.inlineBlock { display:inline-block; }
.flexRow { display:flex; gap:1rem; }
.flexCol { display:flex; flex-direction:column; }`;

    return(
      <div className="leading-relaxed text-slate-700 dark:text-slate-300 space-y-10">
        <style>{animationStyles}</style>

        {/* INTRO */}
        <section className={`${card} ${reveal}`}>
          <h2 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <Layers size={20}/> Display Property – How Elements Behave
          </h2>
          <p className="mt-2">
            Swadeep was confused why his buttons stacked vertically in Barrackpore lab,
            while Tuhina’s links flowed in one line in Naihati.
            The answer is one property: <b>display</b>.
          </p>
        </section>

        {/* COPY CODE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="font-semibold text-sky-500">Prototype / Signature</h3>
          <div className="relative group mt-3">
            <button
              onClick={()=>this.copyCode(code)}
              className="absolute top-2 right-2 text-xs px-2 py-1 bg-slate-700 text-white rounded opacity-0 group-hover:opacity-100"
            >
              <ClipboardCopy size={12}/> {this.state.copied?"Copied":"Copy"}
            </button>
            <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm">
{code}
            </pre>
          </div>
        </section>

        {/* BLOCK */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">display: block</h3>
          <p>Starts on a new line and stretches full width.</p>
        </section>

        {/* INLINE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">display: inline</h3>
          <p>Flows with text, ignores width & height.</p>
        </section>

        {/* INLINE BLOCK */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">display: inline-block</h3>
          <p>Inline behavior with width & height control.</p>
        </section>

        {/* FLEX */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-sky-500 font-semibold">display: flex</h3>
          <p>Creates a modern, responsive layout system.</p>
        </section>

        {/* COMMON MISTAKES */}
        <section className={`${card} ${reveal}`}>
          <h3 className="text-red-400 font-semibold flex items-center gap-2">
            <AlertTriangle size={16}/> Common Mistakes in Responsive Layouts – Display Focus
          </h3>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Using inline for buttons or cards.</li>
            <li>Not converting block layouts to flex on small screens.</li>
            <li>Using float instead of flex.</li>
            <li>Missing flex-wrap.</li>
            <li>Hiding UI with display:none without alternatives.</li>
          </ul>
        </section>

        {/* TEACHER NOTE */}
        <section className={`${card} ${reveal}`}>
          <h3 className="flex items-center gap-2 text-amber-400 font-semibold">
            <Lightbulb size={16}/> Teacher’s Note
          </h3>
          <p>
            Display property is not theory — it is experience.
            Encourage students to break layouts and observe behaviour.
          </p>
        </section>
      </div>
    );
  }
}
