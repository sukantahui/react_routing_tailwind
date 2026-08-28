import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic6 extends Component {
  render() {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Introduction to Linters & Formatters (ESLint & Prettier)
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            When students at <strong>Coder & AccoTax Barrackpore</strong> reach
            advanced JavaScript modules, they start learning tools used by
            professional developers. Linters and formatters allow students like
            Ritaja, Mounita, Devangshu and Susmita to write cleaner, more
            consistent code—just like development teams do in real companies.
          </p>

          {/* WHAT IS A LINTER */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">1. What Is a Linter?</h2>

            <p className="text-slate-300 text-sm mb-3">
              A linter scans your JavaScript code and finds:
            </p>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
              <li>Errors (undefined variables, bad syntax)</li>
              <li>Bad practices (unused variables, duplicate code)</li>
              <li>Code style issues (inconsistent spacing, naming)</li>
            </ul>

            <p className="text-slate-300 text-sm mt-3">
              The most popular JavaScript linter is <strong>ESLint</strong>.
            </p>

            <CodeBlock
              language="javascript"
              code={`// ESLint warning example:
let Name = "Kaustav";   // ❌ ESLint: variable should be camelCase`}
            />

            <p className="text-slate-400 text-xs mt-2">
              ESLint helps enforce clean coding rules taught by Sukanta Hui.
            </p>
          </section>

          {/* WHAT IS A FORMATTER */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">2. What Is a Formatter?</h2>

            <p className="text-slate-300 text-sm">
              A formatter automatically fixes how your code LOOKS:
            </p>

            <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
              <li>Adds/removes spaces</li>
              <li>Formats quotes, indentation, commas</li>
              <li>Makes code consistent across the entire project</li>
            </ul>

            <p className="text-slate-300 text-sm mt-3">
              The most popular formatter is <strong>Prettier</strong>.
            </p>

            <CodeBlock
              language="javascript"
              code={`// BEFORE PRETTIER:
function add(a,b){return a+b}

// AFTER PRETTIER:
function add(a, b) {
  return a + b;
}`}
            />
          </section>

          {/* ESLINT + PRETTIER TOGETHER */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">
              3. Why Use ESLint + Prettier Together?
            </h2>

            <p className="text-slate-300 text-sm mb-3">
              In professional JavaScript development:
            </p>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
              <li>ESLint → catches logic mistakes</li>
              <li>Prettier → formats code automatically</li>
            </ul>

            <p className="text-slate-300 text-sm mt-3">
              Together, they reduce bugs and keep the entire team consistent—
              something Sukanta Hui teaches students to maintain from day one.
            </p>
          </section>

          {/* EXAMPLE */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">4. Example: Common ESLint Fixes</h2>

            <CodeBlock
              language="javascript"
              code={`// ❌ ESLint warning: unused variable
let total = 0;

// ❌ ESLint warning: console.log not allowed (depends on rules)
console.log("Debugging...");

// ❌ ESLint error: missing semicolon (rule dependent)
let student = "Mounita"

// ❌ ESLint error: using == instead of ===
if (age == 18) {}
`}
            />

            <p className="text-slate-400 text-xs mt-2">
              ESLint helps students detect these mistakes early.
            </p>
          </section>

          {/* SETUP CONCEPTUAL */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">5. How Developers Use ESLint & Prettier</h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Without going into full installation steps, here’s the conceptual workflow:
            </p>

            <ol className="list-decimal ml-5 mt-2 text-slate-300 text-sm space-y-1">
              <li>Create a project folder</li>
              <li>Install ESLint & Prettier (developers use npm)</li>
              <li>Configure rules (team coding style)</li>
              <li>Editor auto-formats on save (VS Code)</li>
              <li>Code becomes clean automatically</li>
            </ol>

            <p className="text-slate-400 text-xs mt-2">
              This is how professional developers work on large systems.
            </p>
          </section>

          {/* SUMMARY CARD */}
          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">Summary</h2>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1 mt-2">
              <li><strong>ESLint</strong> → finds mistakes</li>
              <li><strong>Prettier</strong> → formats code</li>
              <li>Both make you a cleaner, more confident developer</li>
            </ul>
          </section>

        </div>
      </div>
    );
  }
}
