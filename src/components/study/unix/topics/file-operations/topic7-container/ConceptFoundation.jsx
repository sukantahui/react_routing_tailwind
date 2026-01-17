import React, { Component } from "react";

export default class ConceptFoundation extends Component {
  render() {
    return (
      <section className="bg-slate-900/70 border border-slate-700 rounded-3xl p-8 hover:shadow-xl transition-all">
        <h2 className="text-2xl font-bold text-sky-300 mb-4">
          📖 Conceptual Foundation
        </h2>

        <p className="text-slate-300 leading-relaxed">
          <b>tail -f</b> continuously displays new lines appended to a file.
          Unlike <code>cat</code> or normal <code>tail</code>, it never stops —
          it watches the file like a CCTV camera.
        </p>

        <div className="mt-4 bg-black/70 p-4 rounded-xl font-mono text-emerald-300">
          tail -f /var/log/syslog
        </div>
      </section>
    );
  }
}
