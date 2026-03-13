import React, { Component } from "react";

export default class Checklist extends Component {
  render() {
    return (
      <section className="bg-emerald-900/10 border border-emerald-500/30 p-6 rounded-3xl">
        <h2 className="text-xl font-semibold text-emerald-300 mb-4">
          ✅ What You Should Remember
        </h2>

        <ul className="list-disc pl-5 text-slate-300 space-y-2">
          <li><code>tail -f</code> follows live changes</li>
          <li>Ctrl + C stops the command</li>
          <li>Used heavily by sysadmins & DevOps</li>
        </ul>
      </section>
    );
  }
}

