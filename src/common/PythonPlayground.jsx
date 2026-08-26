import React, { Component } from "react";
import { TerminalSquare, BookOpen, Sparkles, Cpu, Layers } from "lucide-react";
// Adjust this import based on where you saved the component
import EditablePythonCodeBlock from "../common/EditablePythonCodeBlock";

export default class PythonPlayground extends Component {
  constructor(props) {
    super(props);

    this.examples = [
      {
        id: "hello",
        title: "Hello, Python!",
        level: "Beginner",
        description:
          "Start with the classic Hello World program and a simple variable.",
        tags: ["print()", "variables"],
        code: `# Python Playground — Hello from Coder & AccoTax
print("Welcome to Python Playground!")
print("This is your first Python program.")

name = "Sukanta"
print("Hello,", name)
`,
      },
      {
        id: "loops",
        title: "Loops & Conditions",
        level: "Beginner",
        description:
          "Practice if/else, for loop and while loop with simple examples.",
        tags: ["if", "for", "while"],
        code: `# Conditions & Loops

marks = 78

if marks >= 90:
    print("Grade: A+")
elif marks >= 75:
    print("Grade: A")
else:
    print("Keep improving!")

print("\\nFor loop example:")
for i in range(1, 6):
    print("Counting:", i)

print("\\nWhile loop example:")
count = 3
while count > 0:
    print("Countdown:", count)
    count -= 1

print("Blast off!")`,
      },
      {
        id: "collections",
        title: "Lists & Dictionaries",
        level: "Beginner–Intermediate",
        description:
          "Use lists and dictionaries to store student data and display it.",
        tags: ["list", "dict"],
        code: `# Lists & Dictionaries

students = ["Ritaja", "Mounita", "Swadeep", "Devangshu"]
marks = [92, 88, 79, 95]

print("Student Marks:")
for name, score in zip(students, marks):
    print(f"{name}: {score}")

print("\\nUsing dictionary:")
student_data = {
    "Ritaja": 92,
    "Mounita": 88,
    "Swadeep": 79,
    "Devangshu": 95,
}

for name, score in student_data.items():
    status = "Excellent" if score >= 90 else "Good"
    print(f"{name}: {score} ({status})")`,
      },
      {
        id: "numpy",
        title: "NumPy Demo",
        level: "Intermediate",
        description:
          "Demonstration of NumPy arrays and basic mathematical operations (runs via Pyodide).",
        tags: ["numpy", "arrays"],
        code: `# NumPy Demo — runs in browser via Pyodide
import numpy as np

data = np.array([10, 20, 30, 40, 50])
print("Data:", data)
print("Mean:", data.mean())
print("Sum:", data.sum())
print("Squared:", data ** 2)`,
      },
      {
        id: "pandas",
        title: "Pandas Demo",
        level: "Intermediate–Advanced",
        description:
          "Create a small DataFrame and compute basic statistics with Pandas.",
        tags: ["pandas", "dataframe"],
        code: `# Pandas Demo — small DataFrame example
import pandas as pd

data = {
    "Student": ["Ritaja", "Mounita", "Swadeep", "Devangshu"],
    "Marks": [92, 88, 79, 95],
}

df = pd.DataFrame(data)
print("DataFrame:")
print(df)

print("\\nSummary:")
print(df.describe())`,
      },
    ];

    this.state = {
      selectedId: "hello",
    };
  }

  getSelectedExample() {
    return this.examples.find((ex) => ex.id === this.state.selectedId);
  }

  renderExampleList() {
    const { selectedId } = this.state;

    return (
      <div className="space-y-2">
        {this.examples.map((ex) => (
          <button
            key={ex.id}
            onClick={() => this.setState({ selectedId: ex.id })}
            className={`w-full text-left px-3 py-2 rounded-lg border text-xs md:text-sm transition flex flex-col gap-1 ${
              selectedId === ex.id
                ? "border-sky-500 bg-sky-500/10"
                : "border-slate-700 bg-slate-900/40 hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-semibold ${
                  selectedId === ex.id
                    ? "text-sky-300"
                    : "text-slate-200"
                }`}
              >
                {ex.title}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                {ex.level}
              </span>
            </div>
            <p className="text-slate-400 text-xs line-clamp-2">
              {ex.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {ex.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-[2px] rounded-full bg-slate-800 text-[10px] text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    );
  }

  render() {
    const example = this.getSelectedExample();

    return (
      <div className="max-w-6xl mx-auto px-3 md:px-4 lg:px-0 py-6 md:py-8 space-y-6">
        {/* HEADER */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-500/40 px-3 py-1 text-xs text-sky-300">
            <TerminalSquare size={14} />
            <span>Python Playground · Powered by Pyodide</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight">
                Run Python in your Browser
              </h1>
              <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-1">
                Write, run, and experiment with Python code instantly.
                This playground uses Pyodide to execute real Python 3
                directly in your browser—no installation needed.
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 text-right">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Sparkles size={14} className="text-amber-400" />
                <span>Perfect for learning, demos & quick experiments</span>
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Cpu size={14} className="text-emerald-400" />
                <span>Runs fully in-browser · No server</span>
              </span>
            </div>
          </div>
        </header>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-4 lg:gap-6 items-start">
          {/* LEFT: Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-sky-300" />
                  <h2 className="text-sm md:text-base font-semibold text-slate-100">
                    {example.title}
                  </h2>
                </div>
                <p className="text-slate-400 text-xs md:text-sm">
                  {example.description}
                </p>
              </div>

              <div className="hidden md:flex flex-col items-end gap-1">
                <span className="text-[11px] px-2 py-[2px] rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Example: <span className="text-sky-300">{example.level}</span>
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Layers size={12} />
                  <span>Switch examples from the right panel</span>
                </span>
              </div>
            </div>

            {/* Editor: key changes when example changes → remount with new initialCode */}
            <EditablePythonCodeBlock
              key={example.id}
              initialCode={example.code}
            />
          </div>

          {/* RIGHT: Example Selector & Info */}
          <aside className="space-y-4">
            <div className="border border-slate-800 rounded-2xl bg-slate-900/60 p-3 md:p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-sky-300" />
                  <h3 className="text-sm font-semibold text-slate-100">
                    Choose an Example
                  </h3>
                </div>
                <span className="text-[10px] text-slate-500">
                  {this.examples.length} examples
                </span>
              </div>
              {this.renderExampleList()}
            </div>

            <div className="border border-slate-800 rounded-2xl bg-slate-900/80 p-3 md:p-4 text-[11px] md:text-xs space-y-2">
              <h4 className="text-slate-200 font-semibold flex items-center gap-2">
                Tips for Best Experience
              </h4>
              <ul className="list-disc pl-4 text-slate-400 space-y-1">
                <li>Use <code>print()</code> to see variable values and debug.</li>
                <li>
                  For larger outputs, scroll inside the console panel at the
                  bottom of the editor.
                </li>
                <li>
                  When you use <code>numpy</code> or <code>pandas</code>, the first run might
                  take a few seconds while packages load.
                </li>
                <li>
                  You can copy or download your code from the toolbar and reuse
                  it in your local Python setup.
                </li>
              </ul>
            </div>

            <div className="border border-sky-900 rounded-2xl bg-sky-500/5 p-3 md:p-4 text-[11px] md:text-xs space-y-1">
              <p className="text-slate-300">
                This playground is built by{" "}
                <span className="font-semibold text-sky-300">
                  Coder &amp; AccoTax, Barrackpore
                </span>{" "}
                to help students explore Python from anywhere—mobile, laptop,
                or classroom projector.
              </p>
              <p className="text-slate-500">
                Use it along with your Python roadmap lessons to practise every
                topic interactively.
              </p>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}
