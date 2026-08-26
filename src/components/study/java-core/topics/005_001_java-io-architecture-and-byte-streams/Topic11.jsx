// src/components/study/java-core/file-handling/Topic11.jsx
// Topic 12: Byte Streams – FileInputStream and FileOutputStream
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

export default class Topic11 extends Component {
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
            Byte Streams: FileInputStream &amp; FileOutputStream
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            <code>FileInputStream</code> and <code>FileOutputStream</code> are
            concrete implementations of byte streams used to read and write
            <strong> raw binary data</strong> such as images, audio, PDFs, and executables.
          </p>
        </header>

        {/* ======================================================
            WHY BYTE STREAMS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. When &amp; Why Byte Streams
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Byte streams operate on <strong>8-bit bytes</strong>. They do not perform
            character encoding/decoding, making them ideal for binary data where
            every byte must remain unchanged.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Images (JPG, PNG)</li>
            <li>Audio/Video files</li>
            <li>PDFs, ZIPs</li>
            <li>Executable or serialized binary data</li>
          </ul>
        </section>

        {/* ======================================================
            FILEINPUTSTREAM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. FileInputStream
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Purpose:</strong> Reads bytes from a file.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Common constructors:</strong>
            <br />
            <code>FileInputStream(String path)</code>
            <br />
            <code>FileInputStream(File file)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method signature:</strong> <code>int read()</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> int</li>
            <li><strong>Purpose:</strong> Reads one byte</li>
            <li><strong>Returns:</strong> 0–255 or <code>-1</code> at end of file</li>
          </ul>

          <JavaCodeBlock
            code={`FileInputStream fis = new FileInputStream("photo.jpg");
int b = fis.read();
fis.close();`}
          />
        </section>

        {/* ======================================================
            FILEOUTPUTSTREAM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. FileOutputStream
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Purpose:</strong> Writes bytes to a file.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Common constructors:</strong>
            <br />
            <code>FileOutputStream(String path)</code>
            <br />
            <code>FileOutputStream(String path, boolean append)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method signature:</strong> <code>void write(int b)</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> void</li>
            <li><strong>Purpose:</strong> Writes one byte</li>
            <li><strong>Note:</strong> Only lower 8 bits are written</li>
          </ul>

          <JavaCodeBlock
            code={`FileOutputStream fos = new FileOutputStream("copy.jpg");
fos.write(65);
fos.close();`}
          />
        </section>

        {/* ======================================================
            EFFICIENT COPY PATTERN
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Efficient File Copy Pattern (Loop)
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Reading and writing one byte at a time inside a loop is the
            fundamental pattern for copying binary files.
          </p>

          <JavaCodeBlock
            code={`FileInputStream in = new FileInputStream("source.bin");
FileOutputStream out = new FileOutputStream("target.bin");

int data;
while ((data = in.read()) != -1) {
    out.write(data);
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
            A desktop application used in <strong>Barrackpore</strong> allows
            students like <strong>Swadeep</strong> to upload photos.
            The app copies image files using
            <code> FileInputStream</code> and <code>FileOutputStream</code>
            without altering any bytes.
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
            <li>Forgetting to close streams</li>
            <li>Ignoring <code>-1</code> end-of-file condition</li>
            <li>Not handling exceptions</li>
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
            <li>Use buffering for large files</li>
            <li>Prefer try-with-resources (next topics)</li>
            <li>Use character streams for text</li>
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
            If the file opens in a media player or image viewer,
            it probably needs byte streams.
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
            <li>FileInputStream → read bytes</li>
            <li>FileOutputStream → write bytes</li>
            <li>Best for binary data</li>
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
            Stress immutability of bytes. If a single byte changes,
            binary files can break. This mindset helps students
            choose the correct stream instinctively.
          </p>
        </section>
      </div>
    );
  }
}
