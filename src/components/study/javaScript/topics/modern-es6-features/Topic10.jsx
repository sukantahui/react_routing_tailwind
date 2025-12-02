import React, { Component } from "react";
import practiceData from "./es6-practice.json";
import CodeBlock from "../../../../../common/CodeBlock";

export default class ES6Practice extends Component {
  renderSection(section, index) {
    if (section.type === "mcq") {
      return (
        <section
          key={index}
          className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4"
        >
          <h2 className="text-lg font-semibold text-sky-300">{section.title}</h2>

          {section.questions.map((q, i) => (
            <div
              key={i}
              className="p-4 bg-slate-900/60 border border-slate-700 rounded-xl"
            >
              <p className="text-slate-100 text-sm font-medium">
                {i + 1}. {q.q}
              </p>

              <ul className="ml-5 mt-2 list-disc text-slate-400 text-sm">
                {q.options.map((op, j) => (
                  <li key={j}>{op}</li>
                ))}
              </ul>

              <p className="mt-2 text-green-300 text-sm">
                <strong>Answer:</strong> {q.answer}
              </p>
              <p className="text-slate-400 text-xs">
                {q.explanation}
              </p>
            </div>
          ))}
        </section>
      );
    }

    if (section.type === "output") {
      return (
        <section
          key={index}
          className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4"
        >
          <h2 className="text-lg font-semibold text-sky-300">
            {section.title}
          </h2>

          {section.questions.map((q, i) => (
            <div key={i} className="p-4 bg-slate-900/60 border border-slate-700 rounded-xl space-y-2">
              <CodeBlock language="javascript" code={q.q} />
              <p className="text-green-300 text-sm">
                <strong>Output:</strong> {q.answer}
              </p>
              <p className="text-slate-400 text-xs">{q.explanation}</p>
            </div>
          ))}
        </section>
      );
    }

    if (section.type === "coding") {
      return (
        <section
          key={index}
          className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4"
        >
          <h2 className="text-lg font-semibold text-sky-300">{section.title}</h2>

          {section.questions.map((q, i) => (
            <div key={i} className="p-4 bg-slate-900/60 border border-slate-700 rounded-xl">
              <p className="text-slate-100 text-sm font-medium">
                {i}. {q.q}
              </p>
              <CodeBlock language="javascript" code={q.solution} />
            </div>
          ))}
        </section>
      );
    }

    if (section.type === "coding-advanced") {
      return (
        <section
          key={index}
          className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4"
        >
          <h2 className="text-lg font-semibold text-sky-300">{section.title}</h2>

          {section.questions.map((q, i) => (
            <div key={i} className="p-4 bg-slate-900/60 border border-slate-700 rounded-xl">
              <p className="text-slate-100 text-sm">{q.q}</p>
              <CodeBlock language="javascript" code={q.solution} />
            </div>
          ))}
        </section>
      );
    }

    if (section.type === "mini-projects") {
      return (
        <section
          key={index}
          className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-4"
        >
          <h2 className="text-lg font-semibold text-sky-300">{section.title}</h2>

          {section.projects.map((p, i) => (
            <div key={i} className="p-4 bg-slate-900/60 border border-slate-700 rounded-xl">
              <p className="text-slate-100 font-semibold">{p.title}</p>
              <p className="text-slate-400 text-sm">{p.description}</p>
            </div>
          ))}
        </section>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-5">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-2xl font-bold text-sky-300">
            {practiceData.title}
          </h1>

          {practiceData.sections.map((section, index) =>
            this.renderSection(section, index)
          )}
        </div>
      </div>
    );
  }
}
