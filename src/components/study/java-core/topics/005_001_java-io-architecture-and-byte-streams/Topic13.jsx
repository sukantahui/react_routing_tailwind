// src/components/study/java-core/file-handling/Topic13.jsx
// Topic 14: Character Streams – FileReader and FileWriter
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

export default class Topic13 extends Component {
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

    return (
      <div className="space-y-16 px-4 sm:px-6 lg:px-10 py-10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        <style>{animationStyles}</style>

        {/* ======================================================
            HEADER
        ====================================================== */}
        <header className={`${reveal} space-y-4`}>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Character Streams: FileReader &amp; FileWriter
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            <code>FileReader</code> and <code>FileWriter</code> are concrete
            implementations of character streams used to read and write
            <strong> text data</strong> safely using Unicode.
          </p>
        </header>

        {/* ======================================================
            WHY CHARACTER STREAMS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why Character Streams for Text
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Text is not just bytes. Characters may occupy more than one byte
            depending on encoding. Java uses Unicode internally, and
            character streams ensure text remains readable and correct.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Handles letters, symbols, and languages correctly</li>
            <li>Manages encoding automatically</li>
            <li>Best for text files such as notes, logs, and reports</li>
          </ul>
        </section>

        {/* ======================================================
            FILEREADER
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. FileReader
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Purpose:</strong> Reads characters from a text file.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Common constructors:</strong>
            <br />
            <code>FileReader(String fileName)</code>
            <br />
            <code>FileReader(File file)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method signature:</strong> <code>int read()</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> int</li>
            <li><strong>Purpose:</strong> Reads one character</li>
            <li><strong>Returns:</strong> Unicode value or <code>-1</code> at end of file</li>
          </ul>

          <JavaCodeBlock
            code={`FileReader reader = new FileReader("message.txt");

int ch;
while ((ch = reader.read()) != -1) {
    System.out.print((char) ch);
}

reader.close();`}
          />
        </section>

        {/* ======================================================
            FILEWRITER
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. FileWriter
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Purpose:</strong> Writes characters to a text file.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Common constructors:</strong>
            <br />
            <code>FileWriter(String fileName)</code>
            <br />
            <code>FileWriter(String fileName, boolean append)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method signature:</strong> <code>void write(int c)</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> void</li>
            <li><strong>Purpose:</strong> Writes one character</li>
            <li><strong>Append mode:</strong> Prevents overwriting</li>
          </ul>

          <JavaCodeBlock
            code={`FileWriter writer = new FileWriter("message.txt", true);
writer.write('A');
writer.write('\\n');
writer.close();`}
          />
        </section>

        {/* ======================================================
            STANDARD TEXT COPY PATTERN
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Standard Text Copy Pattern
          </h2>

          <JavaCodeBlock
            code={`FileReader in = new FileReader("input.txt");
FileWriter out = new FileWriter("output.txt");

int ch;
while ((ch = in.read()) != -1) {
    out.write(ch);
}

in.close();
out.close();`}
          />
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            In a reporting tool used in <strong>Shyamnagar</strong>,
            student names like <strong>Abhronila</strong> and
            <strong> Debangshu</strong> are saved to text files.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Using <code>FileReader</code> and <code>FileWriter</code>
            ensures characters remain readable and intact.
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
            <li>Using byte streams for text files</li>
            <li>Forgetting <code>-1</code> end-of-file check</li>
            <li>Not closing readers and writers</li>
            <li>Overwriting files accidentally</li>
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
            <li>Always use character streams for text</li>
            <li>Use append mode carefully</li>
            <li>Prefer buffered streams for large files</li>
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
            If the file is meant to be opened in Notepad or a text editor,
            character streams are almost always the right choice.
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
            <li>FileReader reads characters</li>
            <li>FileWriter writes characters</li>
            <li>Unicode-safe text handling</li>
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
            Repeatedly remind students: text ≠ bytes.
            This single distinction prevents a huge class of bugs
            in file handling, networking, and databases.
          </p>
        </section>
      </div>
    );
  }
}
