import React, { Component } from "react";
import practiceData from "./apis-json-practice.json";

export default class Topic6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: null,
      answerVisible: {} // Track which answers are open
    };
  }

  toggleSection = (index) => {
    this.setState({
      activeSection: this.state.activeSection === index ? null : index
    });
  };

  toggleAnswer = (key) => {
    this.setState((prevState) => ({
      answerVisible: {
        ...prevState.answerVisible,
        [key]: !prevState.answerVisible[key]
      }
    }));
  };

  render() {
    const { title, author, sections } = practiceData;
    const { activeSection, answerVisible } = this.state;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* HEADER */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl shadow-xl">
            <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
              {title}
            </h1>
            <p className="text-sm text-slate-400 mt-2">{author}</p>
          </div>

          {/* SECTIONS */}
          {sections.map((sec, secIndex) => (
            <div
              key={secIndex}
              className="border border-slate-800 bg-slate-900/40 rounded-3xl overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => this.toggleSection(secIndex)}
                className="w-full text-left p-5 bg-slate-900/70 hover:bg-slate-900 transition text-lg font-semibold text-slate-200"
              >
                {sec.title}
                <span className="float-right text-sky-400">
                  {activeSection === secIndex ? "▲" : "▼"}
                </span>
              </button>

              {/* Section Content */}
              {activeSection === secIndex && (
                <div className="p-5 space-y-4 bg-slate-900/50">

                  {/* ====================== MCQ SECTION ====================== */}
                  {sec.type === "mcq" &&
                    sec.questions.map((q, i) => {
                      const key = `mcq-${secIndex}-${i}`;
                      const optionLabels = ["A", "B", "C", "D"];

                      return (
                        <div
                          key={i}
                          className="p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                        >
                          <p className="text-sky-300 font-semibold">
                            Q{i + 1}. {q.q}
                          </p>

                          {/* Options */}
                          <ul className="mt-2 ml-5 list-none text-slate-300 text-sm space-y-1">
                            {q.options.map((opt, j) => (
                              <li key={j}>
                                <span className="text-sky-400 font-bold">
                                  {optionLabels[j]}.
                                </span>{" "}
                                {opt}
                              </li>
                            ))}
                          </ul>

                          {/* Toggle Answer */}
                          <button
                            onClick={() => this.toggleAnswer(key)}
                            className="mt-3 px-3 py-1 rounded-full text-xs bg-sky-700 hover:bg-sky-600"
                          >
                            {answerVisible[key] ? "Hide Answer" : "Show Answer"}
                          </button>

                          {/* Answer + Explanation */}
                          {answerVisible[key] && (
                            <>
                              <p className="mt-3 text-emerald-400 text-sm">
                                <span className="font-bold">Answer:</span>{" "}
                                {q.answer}
                              </p>
                              <p className="text-slate-400 text-xs mt-1">
                                {q.explanation}
                              </p>
                            </>
                          )}
                        </div>
                      );
                    })}

                  {/* ====================== OUTPUT SECTION ====================== */}
                  {sec.type === "output" &&
                    sec.questions.map((q, i) => {
                      const key = `out-${secIndex}-${i}`;

                      return (
                        <div
                          key={i}
                          className="p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                        >
                          <p className="font-semibold text-sky-300">
                            Output {i + 1}
                          </p>

                          <pre className="bg-slate-900/70 mt-2 p-3 text-sm rounded-xl text-slate-300 whitespace-pre-wrap">
{q.q}
                          </pre>

                          {/* Toggle Answer */}
                          <button
                            onClick={() => this.toggleAnswer(key)}
                            className="mt-3 px-3 py-1 rounded-full text-xs bg-sky-700 hover:bg-sky-600"
                          >
                            {answerVisible[key] ? "Hide Answer" : "Show Answer"}
                          </button>

                          {answerVisible[key] && (
                            <>
                              <p className="mt-3 text-emerald-400 text-sm">
                                <strong>Answer: </strong> {q.answer}
                              </p>
                              <p className="text-slate-400 text-xs mt-1">
                                {q.explanation}
                              </p>
                            </>
                          )}
                        </div>
                      );
                    })}

                  {/* ====================== CODING SECTION ====================== */}
                  {sec.type === "coding" &&
                    sec.questions.map((q, i) => {
                      const key = `code-${secIndex}-${i}`;

                      return (
                        <div
                          key={i}
                          className="p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                        >
                          <p className="text-sky-300 font-semibold">
                            Coding {i + 1}
                          </p>

                          <p className="text-slate-200 mt-2">{q.q}</p>

                          {/* Toggle Answer */}
                          <button
                            onClick={() => this.toggleAnswer(key)}
                            className="mt-3 px-3 py-1 rounded-full text-xs bg-sky-700 hover:bg-sky-600"
                          >
                            {answerVisible[key] ? "Hide Solution" : "Show Solution"}
                          </button>

                          {answerVisible[key] && (
                            <pre className="bg-slate-900/70 mt-2 p-3 text-sm rounded-xl text-slate-300 whitespace-pre-wrap">
{q.solution}
                            </pre>
                          )}
                        </div>
                      );
                    })}

                  {/* ====================== ADVANCED CODING ====================== */}
                  {sec.type === "coding-advanced" &&
                    sec.questions.map((q, i) => {
                      const key = `adv-${secIndex}-${i}`;

                      return (
                        <div
                          key={i}
                          className="p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                        >
                          <p className="text-sky-300 font-semibold">
                            Advanced Coding {i + 1}
                          </p>

                          <p className="text-slate-200 mt-2">{q.q}</p>

                          {/* Toggle Answer */}
                          <button
                            onClick={() => this.toggleAnswer(key)}
                            className="mt-3 px-3 py-1 rounded-full text-xs bg-sky-700 hover:bg-sky-600"
                          >
                            {answerVisible[key] ? "Hide Solution" : "Show Solution"}
                          </button>

                          {answerVisible[key] && (
                            <pre className="bg-slate-900/70 mt-2 p-3 text-sm rounded-xl text-slate-300 whitespace-pre-wrap">
{q.solution}
                            </pre>
                          )}
                        </div>
                      );
                    })}

                  {/* ====================== MINI PROJECTS ====================== */}
                  {sec.type === "mini-projects" &&
                    sec.projects.map((p, i) => (
                      <div
                        key={i}
                        className="p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                      >
                        <p className="text-sky-300 font-semibold">
                          Project {i + 1}: {p.title}
                        </p>

                        <p className="text-slate-300 text-sm mt-2">
                          {p.description}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}

          {/* BACK BUTTON */}
          <div className="text-center mt-10">
            <a
              href="/javascript/roadmap"
              className="px-6 py-2 rounded-full bg-sky-600 hover:bg-sky-500 transition text-white text-sm"
            >
              ← Back to Roadmap
            </a>
          </div>
        </div>
      </div>
    );
  }
}
