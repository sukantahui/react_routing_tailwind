import React, { useState } from "react";
import asyncData from "./async-practice.json";

export default function AsyncPracticePage() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-sky-400">
            {asyncData.title}
          </h1>
          <p className="text-slate-400 text-sm">{asyncData.author}</p>
        </header>

        {/* SECTION LIST */}
        <div className="grid md:grid-cols-2 gap-4">
          {asyncData.sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-left transition"
            >
              <h2 className="text-lg font-semibold text-sky-300">
                {section.title}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Type: {section.type}
              </p>
            </button>
          ))}
        </div>

        {/* SELECTED SECTION */}
        {activeSection !== null && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 mt-8">
            <h2 className="text-2xl font-bold text-purple-300">
              {asyncData.sections[activeSection].title}
            </h2>

            {/* MCQ SECTION */}
            {asyncData.sections[activeSection].type === "mcq" && (
              <div className="mt-6 space-y-6">
                {asyncData.sections[activeSection].questions.map((q, i) => (
                  <div key={i} className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="font-semibold text-sky-300">{i + 1}. {q.q}</p>

                    <ul className="list-disc ml-6 mt-2 text-slate-300 text-sm space-y-1">
                      {q.options.map((op, j) => (
                        <li key={j}>{op}</li>
                      ))}
                    </ul>

                    <p className="mt-3 text-green-400 text-sm">
                      <strong>Answer:</strong> {q.answer}
                    </p>
                    <p className="text-slate-400 text-xs mt-1">{q.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* OUTPUT QUESTIONS */}
            {asyncData.sections[activeSection].type === "output" && (
              <div className="mt-6 space-y-6">
                {asyncData.sections[activeSection].questions.map((q, i) => (
                  <div key={i} className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="font-semibold text-sky-300">{i + 1}. {q.q}</p>
                    <p className="mt-3 text-green-400 text-sm"><strong>Output:</strong> {q.answer}</p>
                    <p className="text-slate-400 text-xs mt-1">{q.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CODING */}
            {asyncData.sections[activeSection].type === "coding" && (
              <div className="mt-6 space-y-6">
                {asyncData.sections[activeSection].questions.map((q, i) => (
                  <div key={i} className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="font-semibold text-sky-300">{i + 1}. {q.q}</p>
                    <pre className="mt-3 bg-slate-900 p-3 rounded-lg text-xs border border-slate-700 overflow-auto">
{q.solution}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {/* ADVANCED CODING / DEBUGGING */}
            {asyncData.sections[activeSection].type === "coding-advanced" && (
              <div className="mt-6 space-y-6">
                {asyncData.sections[activeSection].questions.map((q, i) => (
                  <div key={i} className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="font-semibold text-sky-300">{i + 1}. {q.q}</p>
                    <pre className="mt-3 bg-slate-900 p-3 rounded-lg text-xs border border-slate-700 overflow-auto">
{q.solution}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {/* MINI PROJECTS */}
            {asyncData.sections[activeSection].type === "mini-projects" && (
              <div className="mt-6 space-y-6">
                {asyncData.sections[activeSection].projects.map((p, i) => (
                  <div key={i} className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-lg font-semibold text-purple-300">{p.title}</p>
                    <p className="text-slate-300 text-sm mt-2">{p.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
