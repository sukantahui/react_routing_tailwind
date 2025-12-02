import React from "react";

export default function Topic2() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        How HTML, CSS, and JavaScript Work Together
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        Websites are built using three core technologies. Understanding their 
        roles helps beginners learn JavaScript effectively.
      </p>

      <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
        <li><strong>HTML</strong> – the structure (skeleton)</li>
        <li><strong>CSS</strong> – the styling (design, layout)</li>
        <li><strong>JavaScript</strong> – the behavior (logic and interactivity)</li>
      </ul>

      <h3 className="text-lg text-slate-200 font-semibold">Example Flow</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm whitespace-pre-wrap">
{`HTML → Creates a button
CSS  → Styles the button
JS   → Makes the button clickable`}
      </pre>

      <p className="text-slate-400 text-sm">
        All modern UI frameworks (React, Angular, Vue) also follow the same principle.
      </p>

    </div>
  );
}
