import React from "react";

export default function Topic1() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Role of JavaScript in Modern Web Development
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        Today’s websites are dynamic, interactive, fast, and user-friendly — 
        thanks largely to JavaScript. It controls behavior and adds 
        intelligence to the web ecosystem.
      </p>

      <h3 className="text-lg font-semibold text-slate-200">Why JavaScript Is Essential</h3>

      <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
        <li>Creates interactive UI (menus, sliders, modals)</li>
        <li>Handles form validation</li>
        <li>Updates content dynamically without refreshing</li>
        <li>Enables Single Page Applications (SPA)</li>
        <li>Fetches data from APIs and displays it</li>
        <li>Works on both client and server (Node.js)</li>
      </ul>

      <h3 className="text-lg text-slate-200 font-semibold">Example: Dynamic Text</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`document.getElementById("demo").innerText = "JS changed this text!";`}
      </pre>

    </div>
  );
}
