import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import exercises from "./arrayExercises.json";

export default class Topic6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAnswers: {}, // { [id]: true/false }
      filterTopic: "All"
    };
  }

  toggleAnswer = (id) => {
    this.setState((prev) => ({
      openAnswers: {
        ...prev.openAnswers,
        [id]: !prev.openAnswers[id]
      }
    }));
  };

  handleFilterChange = (event) => {
    this.setState({ filterTopic: event.target.value });
  };

  renderQuestionCode(question) {
    if (!question.code) return null;
    return (
      <div className="mt-2">
        <EditableCodeBlock
          initialCode={question.code}
          language="javascript"
        />
      </div>
    );
  }

  render() {
    const { openAnswers, filterTopic } = this.state;
    const { title, questions } = exercises;

    const topics = [
      "All",
      "Topic0",
      "Topic1",
      "Topic2",
      "Topic3",
      "Topic4",
      "Topic5"
    ];

    const filteredQuestions =
      filterTopic === "All"
        ? questions
        : questions.filter((q) => q.topic === filterTopic);

    return (
      <div className="space-y-8">
        {/* HEADER */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300">
            Topic6 — Exercises on Array Methods
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            This exercise set covers <strong>Topic0 to Topic5</strong>:
            array creation, mutating and non-mutating methods,{" "}
            <code>this</code> basics, loops, and higher-order methods like{" "}
            <code>map()</code>, <code>filter()</code>, and <code>reduce()</code>.
          </p>

          {/* QUICK SYNTAX + RETURN TYPE SUMMARY */}
          <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-xs text-slate-200 space-y-2">
            <p className="font-semibold text-sky-200">
              Quick Syntax & Return Type Reference
            </p>

            <ul className="grid gap-2 md:grid-cols-2 text-[11px]">
              <li>
                <span className="font-semibold text-emerald-300">
                  push()
                </span>{" "}
                – <code>arr.push(v)</code> → returns <b>new length</b> (mutates).
              </li>
              <li>
                <span className="font-semibold text-emerald-300">
                  pop()
                </span>{" "}
                – <code>arr.pop()</code> → returns <b>removed last item</b> (mutates).
              </li>
              <li>
                <span className="font-semibold text-emerald-300">
                  slice()
                </span>{" "}
                – <code>arr.slice(start, end)</code> → <b>new array</b> (non-mutating).
              </li>
              <li>
                <span className="font-semibold text-emerald-300">
                  concat()
                </span>{" "}
                – <code>a.concat(b)</code> → <b>new combined array</b>.
              </li>
              <li>
                <span className="font-semibold text-emerald-300">
                  map()
                </span>{" "}
                – <code>arr.map(fn)</code> → <b>new array</b> (transform).
              </li>
              <li>
                <span className="font-semibold text-emerald-300">
                  filter()
                </span>{" "}
                – <code>arr.filter(fn)</code> → <b>new array</b> (keep true).
              </li>
              <li>
                <span className="font-semibold text-emerald-300">
                  reduce()
                </span>{" "}
                – <code>arr.reduce(fn, init)</code> → <b>single value</b>.
              </li>
              <li>
                <span className="font-semibold text-emerald-300">
                  forEach()
                </span>{" "}
                – <code>arr.forEach(fn)</code> → <b>undefined</b> (no return).
              </li>
            </ul>
          </div>

          {/* FILTER BAR */}
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-slate-400 text-xs">Filter by topic:</span>
            <select
              value={filterTopic}
              onChange={this.handleFilterChange}
              className="bg-slate-900 border border-slate-600 text-slate-100 text-xs px-2 py-1 rounded"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All Topics (0–5)" : t}
                </option>
              ))}
            </select>
            <span className="text-slate-500 text-xs">
              Showing {filteredQuestions.length} / {questions.length} questions
            </span>
          </div>
        </section>

        {/* QUESTIONS LIST */}
        <section className="space-y-4">
          {filteredQuestions.map((q) => {
            const isOpen = !!openAnswers[q.id];

            return (
              <div
                key={q.id}
                className="border border-slate-700 rounded-xl bg-slate-900/70 p-4 space-y-2"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      Q{q.id} • {q.topic} •{" "}
                      <span className="uppercase">{q.type}</span>
                    </p>
                    <p className="text-slate-200 text-sm whitespace-pre-line">
                      {q.question}
                    </p>
                  </div>

                  <button
                    onClick={() => this.toggleAnswer(q.id)}
                    className="text-xs px-3 py-1 rounded-full border border-sky-500 text-sky-200 hover:bg-sky-600/20"
                  >
                    {isOpen ? "Hide Answer" : "Show Answer"}
                  </button>
                </div>

                {/* CODE (if any) */}
                {this.renderQuestionCode(q)}

                {/* OPTIONS for MCQ */}
                {q.type === "mcq" && q.options && (
                  <ul className="mt-2 text-xs text-slate-300 space-y-1">
                    {q.options.map((opt, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-slate-500">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* ANSWER + EXPLANATION */}
                {isOpen && (
                  <div className="mt-3 border-t border-slate-700 pt-2 text-xs space-y-1">
                    <p className="text-emerald-300">
                      <span className="font-semibold">Answer: </span>
                      {Array.isArray(q.answer)
                        ? q.answer.join(", ")
                        : q.answer}
                    </p>
                    {q.explanation && (
                      <p className="text-slate-300">
                        <span className="font-semibold">Explanation: </span>
                        {q.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}
