// src/components/study/java-core/file-handling/Topic16.jsx
// Topic 17: BufferedInputStream and BufferedOutputStream
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

export default class Topic16 extends Component {
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
            BufferedInputStream &amp; BufferedOutputStream
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            These classes add buffering to byte streams, making binary
            file operations faster and more efficient without changing logic.
          </p>
        </header>

        {/* ======================================================
            WHAT THEY ARE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. What Are Buffered Byte Streams?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <code>BufferedInputStream</code> and
            <code> BufferedOutputStream</code> wrap existing byte streams
            and add an in-memory buffer.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Instead of reading/writing one byte at a time to disk,
            data moves in chunks.
          </p>
        </section>

        {/* ======================================================
            BUFFEREDINPUTSTREAM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. BufferedInputStream
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Constructor:</strong>
            <br />
            <code>BufferedInputStream(InputStream in)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method:</strong> <code>int read()</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> int</li>
            <li><strong>Purpose:</strong> Reads one buffered byte</li>
            <li><strong>-1:</strong> End of stream</li>
          </ul>

          <JavaCodeBlock
            code={`FileInputStream fis = new FileInputStream("video.mp4");
BufferedInputStream bis = new BufferedInputStream(fis);

int data;
while ((data = bis.read()) != -1) {
    // process byte
}

bis.close();`}
          />
        </section>

        {/* ======================================================
            BUFFEREDOUTPUTSTREAM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. BufferedOutputStream
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Constructor:</strong>
            <br />
            <code>BufferedOutputStream(OutputStream out)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method:</strong> <code>void write(int b)</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> void</li>
            <li><strong>Purpose:</strong> Writes byte to buffer</li>
            <li><strong>Note:</strong> Data may not write immediately</li>
          </ul>

          <JavaCodeBlock
            code={`FileOutputStream fos = new FileOutputStream("copy.mp4");
BufferedOutputStream bos = new BufferedOutputStream(fos);

bos.write(65);
bos.flush(); // forces write
bos.close();`}
          />
        </section>

        {/* ======================================================
            FLUSH EXPLAINED
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. The Importance of flush()
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <code>flush()</code> forces buffered data to be written
            immediately to the file.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Used when output must appear instantly</li>
            <li>Automatically called on close()</li>
            <li>Critical in logs and network streams</li>
          </ul>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A media backup system in <strong>Ichapur</strong> copies
            large video files uploaded by <strong>Debangshu</strong>.
            Buffered streams drastically reduce copy time.
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
            <li>Forgetting to call flush()</li>
            <li>Closing the inner stream instead of buffered stream</li>
            <li>Using unbuffered streams for large files</li>
            <li>Assuming buffering changes data</li>
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
            <li>Wrap streams immediately after creation</li>
            <li>Close only the buffered stream</li>
            <li>Use buffering by default for files</li>
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
            If your output file looks incomplete,
            missing a flush() is often the reason.
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
            <li>BufferedInputStream → faster reads</li>
            <li>BufferedOutputStream → faster writes</li>
            <li>flush() ensures immediate output</li>
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
            Emphasize flush() early.  
            Many “missing output” bugs come from buffering,
            not logic errors.
          </p>
        </section>
      </div>
    );
  }
}
