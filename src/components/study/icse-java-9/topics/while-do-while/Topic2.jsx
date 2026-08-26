// src/components/study/icse-java-9/topics/while-do-while/Topic2.jsx
// Topic 3: Difference between while and do-while — ICSE Class IX

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";
import mermaid from "mermaid";
import { Lightbulb, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";

/* =========================================================
   Inline Scoped Animations — ZERO CONFIG
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0%{opacity:0; transform:translateY(16px);}
  100%{opacity:1; transform:translateY(0);}
}
`;

export default class Topic2 extends Component {
  constructor(props){
    super(props);
    this.state = { mounted:false };
  }

  componentDidMount(){
    this.setState({ mounted:true });

    mermaid.initialize({
      startOnLoad:false,
      securityLevel:"loose",
      theme:"default"
    });

    setTimeout(()=>{
      mermaid.run({ nodes: document.querySelectorAll(".mermaid") });
    },0);
  }

  render(){
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-white/80 dark:bg-slate-900/80 hover:shadow-lg transition-all duration-300";

    return(
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        <h1 className={`text-3xl font-semibold text-slate-900 dark:text-white mb-6 ${reveal}`}>
          Difference between while and do-while Loop
        </h1>

        {/* ===== CONCEPT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[120ms]`}>
          <h2 className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white">
            <BookOpen size={18}/> Core Concept
          </h2>
          <p>
            The main difference between <strong>while</strong> and <strong>do-while</strong>
            loops lies in <em>when the condition is checked</em>.
          </p>
          <p className="mt-2">
            In Shyamnagar centre, Swadeep checks the attendance sheet first before allowing
            students inside – that is like a <strong>while loop</strong>.
            But in Barrackpore lab, Devangshu always displays the menu at least once – that is
            like a <strong>do-while loop</strong>.
          </p>
        </div>

        {/* ===== MERMAID FLOW COMPARISON ===== */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[240ms]`}>
          <div className="mermaid">
{`
flowchart LR
  A["while Loop"] --> B["Check Condition"]
  B -->|True| C["Execute Body"]
  C --> B
  B -->|False| D["Exit"]

  E["do-while Loop"] --> F["Execute Body"]
  F --> G["Check Condition"]
  G -->|True| F
  G -->|False| H["Exit"]
`}
          </div>
        </div>

        {/* ===== TABLE DIFFERENCE ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[360ms]`}>
          <table className="w-full text-sm border border-slate-700">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="p-2 border">while Loop</th>
                <th className="p-2 border">do-while Loop</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Condition checked first</td>
                <td className="p-2 border">Condition checked later</td>
              </tr>
              <tr>
                <td className="p-2 border">May execute zero times</td>
                <td className="p-2 border">Executes at least once</td>
              </tr>
              <tr>
                <td className="p-2 border">No semicolon after block</td>
                <td className="p-2 border">Semicolon required</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ===== EXAMPLES ===== */}
        <div className={`${card} mb-6 ${reveal} animation-delay-[480ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 1 – while loop with false condition
          </h3>
          <JavaCodeBlock code={`int i = 10;
while(i < 5){
  System.out.print(i);
}`} />
        </div>

        <div className={`${card} mb-6 ${reveal} animation-delay-[600ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 2 – do-while with false condition
          </h3>
          <JavaCodeBlock code={`int i = 10;
do{
  System.out.print(i);
}while(i < 5);`} />
        </div>

        <div className={`${card} mb-10 ${reveal} animation-delay-[720ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 3 – Menu system
          </h3>
          <JavaCodeBlock code={`int choice;
do{
  System.out.println("1. Continue");
  System.out.println("2. Exit");
  choice = 2;
}while(choice != 2);`} />
        </div>

        {/* ===== HINT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[840ms]`}>
          <h2 className="flex items-center gap-2"><Lightbulb size={18}/> Hint</h2>
          <p>Try changing the condition so that it becomes false from the beginning.</p>
        </div>

        {/* ===== PITFALLS ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[960ms]`}>
          <h2 className="flex items-center gap-2"><AlertTriangle size={18}/> Common Pitfalls</h2>
          <ul className="list-disc pl-5">
            <li>Forgetting semicolon in do-while</li>
            <li>Assuming both behave same</li>
            <li>Wrong loop choice for menu programs</li>
          </ul>
        </div>

        {/* ===== CHECKLIST ===== */}
        <div className={`${card} border-l-4 border-sky-400 ${reveal} animation-delay-[1080ms]`}>
          <h2 className="flex items-center gap-2"><CheckCircle2 size={18}/> Mini Checklist</h2>
          <ul className="list-disc pl-5">
            <li>Use while when execution may be zero times</li>
            <li>Use do-while for menu-driven programs</li>
            <li>Remember semicolon in do-while</li>
          </ul>
        </div>

      </section>
    );
  }
}
