import React from "react";

export default function Topic1() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl text-sky-300 font-semibold">Comments in JavaScript</h2>

      <p className="text-slate-300 text-sm">
        Comments help developers explain logic. They are ignored by the JavaScript engine.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">Single-line Comment</h3>
      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">{`// This is a single-line comment`}</pre>

      <h3 className="text-lg text-slate-200 font-semibold">Multi-line Comment</h3>
      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`/*
  This is a multi-line comment
*/`}
      </pre>

    </div>
  );
}
