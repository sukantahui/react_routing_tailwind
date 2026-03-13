import React, { Component } from "react";

export default class Header extends Component {
  render() {
    const { isDarkMode, toggleDarkMode } = this.props;

    return (
      <header className="sticky top-0 z-20 backdrop-blur bg-black/70 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-sky-400">
            Topic 7: Monitoring Logs with <code>tail -f</code>
          </h1>

          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded-md border border-slate-600 hover:bg-slate-700 transition"
          >
            {isDarkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>
    );
  }
}
