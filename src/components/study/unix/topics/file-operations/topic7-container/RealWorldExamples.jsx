import React, { Component } from "react";

export default class RealWorldExamples extends Component {
  render() {
    return (
      <section className="grid md:grid-cols-2 gap-6">
        {[
          ["Web Server", "tail -f /var/log/nginx/access.log"],
          ["Auth Logs", "tail -f /var/log/auth.log"],
          ["Database", "tail -f /var/log/mysql/error.log"],
          ["System", "tail -f /var/log/syslog"]
        ].map(([title, cmd], i) => (
          <div key={i} className="bg-slate-900/70 border border-slate-700 p-5 rounded-xl">
            <h3 className="text-sky-300 font-semibold">{title}</h3>
            <code className="block mt-2 text-emerald-300">{cmd}</code>
          </div>
        ))}
      </section>
    );
  }
}
