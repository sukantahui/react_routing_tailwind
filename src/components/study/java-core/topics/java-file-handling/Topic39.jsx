// src/components/study/java-core/file-handling/Topic39.jsx
// Topic 39: Writing Binary Files in Java
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

export default class Topic39 extends Component {
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
            Writing Binary Files in Java
          </h2>

          <p className="text-sm">
            Writing a binary file means writing <strong>raw byte data</strong>
            directly to storage without any character encoding or conversion.
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            This approach is used for images, audio, video, PDFs, backups, and system files.
          </p>
        </header>

        {/* =====================================================
            PROCESS – STEP BY STEP
        ===================================================== */}
        <section className={`${reveal} animation-delay-[100ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Process of Writing a Binary File (Step-by-Step)
            </h3>

            <ol className="list-decimal list-inside text-sm space-y-2 mt-3">
              <li>Decide that the file is binary (not human-readable).</li>
              <li>Create a <code>FileOutputStream</code> to open the file.</li>
              <li>Wrap it with <code>BufferedOutputStream</code> for performance.</li>
              <li>Write bytes using <code>write()</code>.</li>
              <li>Flush the buffer to ensure data reaches disk.</li>
              <li>Close streams to release resources.</li>
            </ol>

            <div className="mt-4 p-3 rounded bg-slate-100 dark:bg-slate-800/60">
              <p className="text-sm font-semibold text-indigo-400">
                Logical Flow
              </p>
              <p className="text-sm">
                Program → BufferedOutputStream → FileOutputStream → Disk
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            METHOD DESCRIPTIONS
        ===================================================== */}
        <section className={`${reveal} animation-delay-[200ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Methods & Constructors Explained
            </h3>

            <ul className="list-disc list-inside text-sm space-y-3 mt-3">
              <li>
                <strong>FileOutputStream(String path)</strong><br />
                <strong>Purpose:</strong> Creates or overwrites a file for binary writing.<br />
                <strong>Why used:</strong> Writes raw byte data directly to disk.
              </li>

              <li>
                <strong>BufferedOutputStream(OutputStream out)</strong><br />
                <strong>Purpose:</strong> Buffers data in memory before writing.<br />
                <strong>Why used:</strong> Reduces disk I/O operations and improves speed.
              </li>

              <li>
                <strong>void write(int b)</strong><br />
                <strong>Parameter:</strong> Single byte (0–255).<br />
                <strong>Purpose:</strong> Writes one byte to the buffer.
              </li>

              <li>
                <strong>void flush()</strong><br />
                <strong>Purpose:</strong> Forces buffered data to be written to disk.<br />
                <strong>Critical:</strong> Prevents data loss.
              </li>

              <li>
                <strong>void close()</strong><br />
                <strong>Purpose:</strong> Closes stream and releases system resources.
              </li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            EXAMPLES (MINIMUM 5)
        ===================================================== */}
        <section className={`${reveal} animation-delay-[300ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Examples of Writing Binary Files
            </h3>

            {/* Example 1 */}
            <div className="mt-4">
              <p className="font-semibold text-sm">Example 1: Writing Single Bytes (Beginner)</p>
              <JavaCodeBlock
                code={`FileOutputStream fos = new FileOutputStream("data.bin");
BufferedOutputStream bos = new BufferedOutputStream(fos);

bos.write(65);
bos.write(66);
bos.write(67);

bos.flush();
bos.close();
fos.close();`}
              />
            </div>

            {/* Example 2 */}
            <div className="mt-6">
              <p className="font-semibold text-sm">Example 2: Writing an Image Copy</p>
              <JavaCodeBlock
                code={`BufferedInputStream bis =
    new BufferedInputStream(new FileInputStream("photo.jpg"));
BufferedOutputStream bos =
    new BufferedOutputStream(new FileOutputStream("photo_copy.jpg"));

int b;
while ((b = bis.read()) != -1) {
    bos.write(b);
}

bos.flush();
bis.close();
bos.close();`}
              />
            </div>

            {/* Example 3 */}
            <div className="mt-6">
              <p className="font-semibold text-sm">Example 3: Writing Backup File</p>
              <JavaCodeBlock
                code={`BufferedOutputStream bos =
    new BufferedOutputStream(new FileOutputStream("backup.dat"));

for (int i = 0; i < 1000; i++) {
    bos.write(i);
}

bos.flush();
bos.close();`}
              />
            </div>

            {/* Example 4 */}
            <div className="mt-6">
              <p className="font-semibold text-sm">Example 4: Writing Binary Log Data</p>
              <JavaCodeBlock
                code={`BufferedOutputStream bos =
    new BufferedOutputStream(new FileOutputStream("log.bin"));

long timestamp = System.currentTimeMillis();
bos.write((int) (timestamp & 0xFF));

bos.flush();
bos.close();`}
              />
            </div>

            {/* Example 5 */}
            <div className="mt-6">
              <p className="font-semibold text-sm">
                Example 5: Professional Pattern (Try-With-Resources)
              </p>
              <JavaCodeBlock
                code={`try (BufferedOutputStream bos =
         new BufferedOutputStream(
             new FileOutputStream("final_output.bin"))) {

    for (int i = 1; i <= 500; i++) {
        bos.write(i);
    }
    bos.flush();
} catch (Exception e) {
    e.printStackTrace();
}`}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            COMMON MISTAKES
        ===================================================== */}
        <section className={`${reveal} animation-delay-[400ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-red-500">
              Common Beginner Mistakes
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Forgetting to call <code>flush()</code></li>
              <li>Using FileWriter for binary files</li>
              <li>Not closing streams</li>
              <li>Assuming write() writes immediately to disk</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            BEST PRACTICES
        ===================================================== */}
        <section className={`${reveal} animation-delay-[500ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-emerald-500">
              Best Practices
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Always use buffered streams for binary writing</li>
              <li>Flush output streams explicitly</li>
              <li>Use try-with-resources in production</li>
              <li>Validate file paths before writing</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            HINT
        ===================================================== */}
        <section className={`${reveal} animation-delay-[600ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-amber-500">
              Hint for Students
            </h3>

            <p className="text-sm">
              Try writing binary data without calling <code>flush()</code>.
              Then compare file size and integrity. This experiment explains
              why buffering exists.
            </p>
          </div>
        </section>

        {/* =====================================================
            CHECKLIST
        ===================================================== */}
        <section className={`${reveal} animation-delay-[700ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Quick Revision Checklist
            </h3>

            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Binary writing uses byte streams</li>
              <li>BufferedOutputStream improves performance</li>
              <li>flush() ensures data safety</li>
              <li>Always close streams</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            TEACHER NOTE
        ===================================================== */}
        <section
          className={`${reveal} animation-delay-[800ms] rounded-xl border 
          border-indigo-300/40 dark:border-indigo-700/40 
          bg-indigo-50/60 dark:bg-indigo-900/20 p-6 
          transition-all duration-300 hover:shadow-md`}
        >
          <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold">
            Teacher’s Note
          </h3>

          <p className="text-sm mt-2">
            Students often confuse writing text with writing bytes.
            Reinforce that binary writing has no concept of characters —
            only numbers and bytes.
          </p>
        </section>

      </div>
    );
  }
}
