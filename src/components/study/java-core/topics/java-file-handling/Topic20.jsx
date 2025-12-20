// src/components/study/java-core/file-handling/Topic20.jsx
// Topic 21: Difference between Scanner and BufferedReader
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

// ------------------------------------------------------------
// Inline scoped keyframes (ZERO CONFIG)
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic20 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

    const tableCell =
      "border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm leading-relaxed";

    return (
      <div className="space-y-16 px-4 sm:px-6 lg:px-10 py-10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        <style>{animationStyles}</style>

        {/* ======================================================
            HEADER
        ====================================================== */}
        <header className={`${reveal} space-y-4`}>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Scanner vs BufferedReader
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Both <code>Scanner</code> and <code>BufferedReader</code> read text,
            but they are designed with very different goals.
            Understanding this difference is a <strong>key Java skill</strong>.
          </p>
        </header>

        {/* ======================================================
            CORE IDEA
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Core Idea
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            The real difference is not syntax — it is
            <strong> performance vs convenience</strong>.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Scanner</strong> → easy parsing, slower</li>
            <li><strong>BufferedReader</strong> → fast reading, manual parsing</li>
          </ul>
        </section>

        {/* ======================================================
            SCANNER OVERVIEW
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Scanner – Overview
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <code>Scanner</code> breaks input into tokens and automatically
            converts them into primitive data types.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Common method signatures:</strong>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>boolean hasNext()</code></li>
            <li><code>String next()</code></li>
            <li><code>int nextInt()</code></li>
            <li><code>String nextLine()</code></li>
          </ul>

          <JavaCodeBlock
            code={`Scanner sc = new Scanner(new File("data.txt"));

while (sc.hasNextInt()) {
    int value = sc.nextInt();
    System.out.println(value);
}

sc.close();`}
          />
        </section>

        {/* ======================================================
            BUFFEREDREADER OVERVIEW
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. BufferedReader – Overview
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <code>BufferedReader</code> reads text efficiently,
            line by line, without doing any parsing.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method signature:</strong>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>String readLine()</code></li>
          </ul>

          <JavaCodeBlock
            code={`BufferedReader reader =
    new BufferedReader(new FileReader("data.txt"));

String line;
while ((line = reader.readLine()) != null) {
    System.out.println(line);
}

reader.close();`}
          />
        </section>

        {/* ======================================================
            COMPARISON TABLE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Comparison Table
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-slate-200 dark:bg-slate-800">
                <tr>
                  <th className={tableCell}>Feature</th>
                  <th className={tableCell}>Scanner</th>
                  <th className={tableCell}>BufferedReader</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tableCell}>Speed</td>
                  <td className={tableCell}>Slower</td>
                  <td className={tableCell}>Faster</td>
                </tr>
                <tr>
                  <td className={tableCell}>Parsing</td>
                  <td className={tableCell}>Automatic</td>
                  <td className={tableCell}>Manual</td>
                </tr>
                <tr>
                  <td className={tableCell}>Reading Style</td>
                  <td className={tableCell}>Token-based</td>
                  <td className={tableCell}>Line-based</td>
                </tr>
                <tr>
                  <td className={tableCell}>Ease of Use</td>
                  <td className={tableCell}>Very easy</td>
                  <td className={tableCell}>Moderate</td>
                </tr>
                <tr>
                  <td className={tableCell}>Large Files</td>
                  <td className={tableCell}>Not recommended</td>
                  <td className={tableCell}>Recommended</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            In a small utility tool used in <strong>Shyamnagar</strong>,
            <code>Scanner</code> is perfect for reading a few numbers.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            But a daily attendance log in <strong>Barrackpore</strong>
            with thousands of lines must use <code>BufferedReader</code>
            for performance.
          </p>
        </section>

        {/* ======================================================
            COMMON PITFALLS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
            Common Pitfalls
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Using Scanner for very large files</li>
            <li>Mixing <code>next()</code> and <code>nextLine()</code> carelessly</li>
            <li>Assuming BufferedReader parses numbers</li>
            <li>Ignoring performance impact</li>
          </ul>
        </section>

        {/* ======================================================
            BEST PRACTICES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
            Best Practices
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Use Scanner for small, structured input</li>
            <li>Use BufferedReader for large or line-based files</li>
            <li>Choose performance consciously</li>
          </ul>
        </section>

        {/* ======================================================
            HINT
        ====================================================== */}
        <section className={`${reveal} ${card} border-dashed border-teal-400/50`}>
          <h2 className="text-lg font-semibold text-teal-600 dark:text-teal-400">
            💡 Hint
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            If the interviewer asks “Which is better?” —
            the correct answer is “It depends on the use case.”
          </p>
        </section>

        {/* ======================================================
            MINI CHECKLIST
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            Mini Checklist
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Scanner = convenience</li>
            <li>BufferedReader = performance</li>
            <li>Choose based on file size & structure</li>
          </ul>
        </section>

        {/* ======================================================
            TEACHER'S NOTE
        ====================================================== */}
        <section
          className={`${reveal} rounded-xl border border-slate-300 dark:border-slate-700 p-6 bg-slate-100 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🎓 Teacher’s Note
          </h2>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This comparison builds judgment.
            Strong developers don’t memorize tools —
            they select them wisely.
          </p>
        </section>
      </div>
    );
  }
}
