import React from "react";

export default function Topic3() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl text-sky-300 font-semibold">
        Identifiers & Naming Conventions
      </h2>

      <p className="text-slate-300 text-sm">
        Identifiers are names for variables, functions, and objects.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">Naming Rules</h3>
      <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
        <li>Cannot start with a number</li>
        <li>No spaces allowed</li>
        <li>No special characters except _ and $</li>
      </ul>

      <h3 className="text-lg text-slate-200 font-semibold">Common Styles</h3>
      <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
        <li>camelCase → <code>userName</code></li>
        <li>PascalCase → <code>UserName</code></li>
        <li>snake_case → <code>user_name</code></li>
      </ul>

    </div>
  );
}
