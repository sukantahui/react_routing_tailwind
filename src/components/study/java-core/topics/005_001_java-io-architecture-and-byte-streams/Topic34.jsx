// src/components/study/java-core/file-handling/Topic34.jsx
// Topic 34: Simple Programs Using File Handling (Extended Practice)
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

// ------------------------------------------------------------
// Scoped keyframes – zero config animations
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(18px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic34 extends Component {
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
      <div className="space-y-20 px-4 sm:px-6 lg:px-10 py-10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        <style>{animationStyles}</style>

        {/* ======================================================
            HEADER
        ====================================================== */}
        <header className={`${reveal} space-y-4`}>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Simple Programs Using File Handling (Extended Practice)
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            This topic strengthens file handling by walking through
            <strong>small but realistic programs</strong>.
            Each example mirrors how files are used in
            schools, offices, and real Java applications.
          </p>
        </header>

        {/* ======================================================
            SVG OVERVIEW
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold mb-4">
            File Handling Flow (Conceptual)
          </h2>

          <svg
            viewBox="0 0 600 120"
            className="w-full h-auto"
            aria-label="File handling flow diagram"
          >
            <g
              className="transition-all duration-300 hover:scale-[1.02]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="10" y="40" width="120" height="40" rx="8" />
              <text x="30" y="66" className="fill-current text-sm">
                Java Program
              </text>

              <line x1="130" y1="60" x2="230" y2="60" />
              <polygon points="230,55 240,60 230,65" fill="currentColor" />

              <rect x="240" y="40" width="140" height="40" rx="8" />
              <text x="260" y="66" className="fill-current text-sm">
                Stream / Reader
              </text>

              <line x1="380" y1="60" x2="480" y2="60" />
              <polygon points="480,55 490,60 480,65" fill="currentColor" />

              <rect x="490" y="40" width="100" height="40" rx="8" />
              <text x="515" y="66" className="fill-current text-sm">
                File
              </text>
            </g>
          </svg>

          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Every file program follows this pipeline:
            <strong>Program → Stream → File</strong>.
          </p>
        </section>

        {/* ======================================================
            EXAMPLE 1 – WRITE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 mb-2">
            Example 1: Writing Data to a File
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            This program stores a simple message in a text file.
            It demonstrates <strong>basic file creation and writing</strong>.
          </p>

          <JavaCodeBlock
            code={`import java.io.*;

public class WriteExample {
    public static void main(String[] args) {
        try (FileWriter fw = new FileWriter("notes.txt")) {
            fw.write("Java File Handling Basics");
        } catch (IOException e) {
            System.out.println("Write failed");
        }
    }
}`}
          />

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            <strong>Explanation:</strong><br />
            <code>FileWriter</code> creates the file if it does not exist.
            If the file already exists, it overwrites old content.
          </p>
        </section>

        {/* ======================================================
            EXAMPLE 2 – READ
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            Example 2: Reading Data from a File
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Reading files is common in report generation,
            configuration loading, and data processing.
          </p>

          <JavaCodeBlock
            code={`import java.io.*;

public class ReadExample {
    public static void main(String[] args) {
        try (BufferedReader br =
                new BufferedReader(new FileReader("notes.txt"))) {

            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }

        } catch (IOException e) {
            System.out.println("Read failed");
        }
    }
}`}
          />

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            <strong>Explanation:</strong><br />
            <code>BufferedReader</code> improves performance by reading
            chunks instead of one character at a time.
          </p>
        </section>

        {/* ======================================================
            EXAMPLE 3 – APPEND
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 mb-2">
            Example 3: Appending to a File
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Appending is essential for logs and history files
            where old data must be preserved.
          </p>

          <JavaCodeBlock
            code={`import java.io.*;

public class AppendExample {
    public static void main(String[] args) {
        try (BufferedWriter bw =
                new BufferedWriter(new FileWriter("notes.txt", true))) {

            bw.newLine();
            bw.write("New session started");

        } catch (IOException e) {
            System.out.println("Append failed");
        }
    }
}`}
          />

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            <strong>Key point:</strong><br />
            The <code>true</code> flag enables append mode.
            Missing it causes accidental data loss.
          </p>
        </section>

        {/* ======================================================
            EXAMPLE 4 – FILE PROPERTIES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 mb-2">
            Example 4: Checking File Properties
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Before reading or writing, programs often verify
            whether a file exists and is accessible.
          </p>

          <JavaCodeBlock
            code={`import java.io.File;

public class FileCheck {
    public static void main(String[] args) {
        File f = new File("notes.txt");

        System.out.println("Exists: " + f.exists());
        System.out.println("Readable: " + f.canRead());
        System.out.println("Size: " + f.length());
    }
}`}
          />

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            This prevents runtime failures caused by
            missing or restricted files.
          </p>
        </section>

        {/* ======================================================
            COMMON MISTAKES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Common Beginner Mistakes
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Overwriting files unintentionally</li>
            <li>Not closing file resources</li>
            <li>Ignoring IOException</li>
            <li>Assuming files always exist</li>
          </ul>
        </section>

        {/* ======================================================
            HINT
        ====================================================== */}
        <section className={`${reveal} ${card} border-dashed border-teal-400/50`}>
          <h2 className="text-lg font-semibold text-teal-600">
            💡 Hint
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Try running these programs from different folders
            and observe how relative paths behave.
          </p>
        </section>

        {/* ======================================================
            MINI CHECKLIST
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            Mini Checklist
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Understand write vs append</li>
            <li>Use buffering for reading</li>
            <li>Check file existence</li>
          </ul>
        </section>

        {/* ======================================================
            TEACHER'S NOTE
        ====================================================== */}
        <section
          className={`${reveal} rounded-xl border border-slate-300 dark:border-slate-700 p-6 bg-slate-100 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
        >
          <h2 className="text-xl font-semibold">
            🎓 Teacher’s Note
          </h2>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            These examples are intentionally small.
            Mastery of small programs builds confidence
            for large systems later.
          </p>
        </section>
      </div>
    );
  }
}
