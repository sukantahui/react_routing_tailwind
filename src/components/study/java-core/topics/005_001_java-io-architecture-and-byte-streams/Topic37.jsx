// src/components/study/java-core/file-handling/Topic37.jsx
// Topic 37: Binary File Handling using FileInputStream & FileOutputStream
// React 19 – CLASS-BASED component
// Tailwind CSS – ZERO config, ZERO plugins

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

/* =========================================================
   Inline Scoped Animations (Zero Config)
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic37 extends Component {
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
      "rounded-xl border border-slate-200 dark:border-slate-800 " +
      "bg-white/80 dark:bg-slate-900/70 p-6 shadow-sm " +
      "transition-all duration-300 hover:-translate-y-1 hover:shadow-md";

    return (
      <div className="space-y-28 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* =====================================================
            HEADER
        ===================================================== */}
        <header className={`${reveal} space-y-4`}>
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
            Binary File Handling using FileInputStream and FileOutputStream
          </h2>

          <p className="text-sm">
            After understanding what binary files are and how they differ
            from text files, the next step is learning how Java actually
            <strong> reads and writes binary data</strong>.
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Java provides byte-oriented stream classes specifically for this purpose.
          </p>
        </header>

        {/* =====================================================
            WHY BYTE STREAMS
        ===================================================== */}
        <section className={`${reveal} animation-delay-[100ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Why FileInputStream and FileOutputStream?
            </h3>

            <p className="text-sm mt-2">
              Binary files must be processed as <strong>raw bytes</strong>.
              Character-based streams (Reader / Writer) apply encoding,
              which can corrupt binary data.
            </p>

            <ul className="list-disc list-inside text-sm mt-3 space-y-1">
              <li>Byte streams work directly with bytes (0–255)</li>
              <li>No character conversion or encoding</li>
              <li>Safe for images, audio, video, PDFs, executables</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            FILEINPUTSTREAM
        ===================================================== */}
        <section className={`${reveal} animation-delay-[200ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              FileInputStream
            </h3>

            <p className="text-sm mt-2">
              <strong>FileInputStream</strong> is used to read binary data
              from a file, one byte at a time.
            </p>

            <p className="text-sm mt-3">
              <strong>Constructor (Prototype):</strong>
              <br />
              <code>FileInputStream(String filePath)</code>
            </p>

            <p className="text-sm mt-2">
              <strong>Important Method:</strong>
              <br />
              <code>int read()</code>
            </p>

            <ul className="list-disc list-inside text-sm mt-3 space-y-1">
              <li>Returns byte value (0–255)</li>
              <li>Returns <code>-1</code> when end of file is reached</li>
            </ul>

            <JavaCodeBlock
              code={`FileInputStream fis = new FileInputStream("photo.jpg");

int byteData;
while ((byteData = fis.read()) != -1) {
    // process each byte
}

fis.close();`}
            />
          </div>
        </section>

        {/* =====================================================
            FILEOUTPUTSTREAM
        ===================================================== */}
        <section className={`${reveal} animation-delay-[300ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              FileOutputStream
            </h3>

            <p className="text-sm mt-2">
              <strong>FileOutputStream</strong> is used to write binary data
              to a file, byte by byte.
            </p>

            <p className="text-sm mt-3">
              <strong>Constructor (Prototype):</strong>
              <br />
              <code>FileOutputStream(String filePath)</code>
            </p>

            <p className="text-sm mt-2">
              <strong>Important Method:</strong>
              <br />
              <code>void write(int b)</code>
            </p>

            <JavaCodeBlock
              code={`FileOutputStream fos = new FileOutputStream("copy.jpg");

fos.write(byteData);

fos.close();`}
            />
          </div>
        </section>

        {/* =====================================================
            FILE COPY EXAMPLE
        ===================================================== */}
        <section className={`${reveal} animation-delay-[400ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Example: Copying a Binary File
            </h3>

            <p className="text-sm">
              The most common real-world use of binary streams is copying
              files such as images or PDFs.
            </p>

            <JavaCodeBlock
              code={`FileInputStream fis = new FileInputStream("source.pdf");
FileOutputStream fos = new FileOutputStream("destination.pdf");

int data;
while ((data = fis.read()) != -1) {
    fos.write(data);
}

fis.close();
fos.close();`}
            />
          </div>
        </section>

        {/* =====================================================
            REAL-WORLD USE CASES
        ===================================================== */}
        <section className={`${reveal} animation-delay-[500ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Real-World Use Cases
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Uploading student photos in school systems</li>
              <li>Downloading PDF report cards</li>
              <li>Copying audio/video files</li>
              <li>Backup utilities and file migration tools</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            COMMON PITFALLS
        ===================================================== */}
        <section className={`${reveal} animation-delay-[600ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-red-500">
              Common Beginner Mistakes
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Using FileReader / FileWriter for binary files</li>
              <li>Forgetting to close streams</li>
              <li>Ignoring end-of-file condition (<code>-1</code>)</li>
              <li>Reading byte-by-byte for large files (slow)</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            BEST PRACTICES
        ===================================================== */}
        <section className={`${reveal} animation-delay-[700ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-emerald-500">
              Best Practices
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Use BufferedInputStream / BufferedOutputStream for performance</li>
              <li>Prefer try-with-resources to close streams automatically</li>
              <li>Validate file paths before reading or writing</li>
              <li>Handle IOExceptions properly</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            HINT SECTION
        ===================================================== */}
        <section className={`${reveal} animation-delay-[800ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-amber-500">
              Hint for Students
            </h3>

            <p className="text-sm">
              Observe the size and integrity of a file before and after copying.
              Try copying an image using FileReader once and see what happens.
              The result explains why byte streams are necessary.
            </p>
          </div>
        </section>

        {/* =====================================================
            MINI CHECKLIST
        ===================================================== */}
        <section className={`${reveal} animation-delay-[900ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Quick Revision Checklist
            </h3>

            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Why byte streams are required</li>
              <li>FileInputStream purpose and methods</li>
              <li>FileOutputStream purpose and methods</li>
              <li>Binary file copy logic</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            TEACHER NOTE
        ===================================================== */}
        <section
          className={`${reveal} animation-delay-[1000ms] rounded-xl border 
          border-indigo-300/40 dark:border-indigo-700/40 
          bg-indigo-50/60 dark:bg-indigo-900/20 p-6 
          transition-all duration-300 hover:shadow-md`}
        >
          <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold">
            Teacher’s Note
          </h3>

          <p className="text-sm mt-2">
            Emphasize the <strong>reason</strong> behind byte streams.
            Students often memorize syntax but fail when handling real files.
            Once they understand corruption issues, the concept becomes permanent.
          </p>
        </section>

      </div>
    );
  }
}
