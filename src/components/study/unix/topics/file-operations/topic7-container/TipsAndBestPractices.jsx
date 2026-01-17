import React, { Component } from "react";

export default class TipsAndBestPractices extends Component {
  render() {
    return (
      <section className="bg-yellow-900/10 border border-yellow-500/30 p-6 rounded-3xl">
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">
          💡 Professional Tips
        </h2>

        <ul className="list-disc pl-5 text-slate-300 space-y-2">
          <li>Use <code>tail -F</code> for rotated logs</li>
          <li>Combine with <code>grep</code> to filter errors</li>
          <li>Never monitor logs blindly without context</li>
        </ul>
      </section>
    );
  }
}
