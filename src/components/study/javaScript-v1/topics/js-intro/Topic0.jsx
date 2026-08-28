import React from "react";

export default function Topic0() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-sky-300">
        What is JavaScript?
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        JavaScript is a high-level scripting language that powers the interactive 
        behavior on websites. It works inside your browser and can update content,
        validate forms, control multimedia, and much more.
      </p>

      <h3 className="text-lg font-semibold text-slate-100">Example</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm whitespace-pre-wrap">
{`console.log("Hello JavaScript!");`}
      </pre>

      <p className="text-slate-400 text-sm">
        This line prints a message to the browser console.
      </p>
    </div>
  );
}
