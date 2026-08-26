// src/components/study/java-core/file-handling/Topic0.jsx
// Topic 0: Binary File Handling in Java
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

export default class Topic35 extends Component {
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
      <div className="space-y-24 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* =====================================================
            HEADER
        ===================================================== */}
        <header className={`${reveal} space-y-4`}>
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
            Binary File Handling in Java
          </h2>

          <p className="text-sm">
            Java programs often work with files that are not readable as text,
            such as images, audio, video, and PDF documents. These are known as
            <strong> binary files</strong>.
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            This topic explains the concept of binary files and how Java handles
            them using byte streams.
          </p>
        </header>

        {/* =====================================================
            CONCEPT
        ===================================================== */}
        <section className={`${reveal} animation-delay-[100ms] space-y-6`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              What is a Binary File?
            </h3>

            <p className="text-sm">
              A <strong>binary file</strong> stores data in the same binary
              format (0s and 1s) as it exists in computer memory. It does not
              rely on characters or encoding.
            </p>

            <ul className="list-disc list-inside text-sm mt-3 space-y-1">
              <li>Data is stored as raw bytes</li>
              <li>Not human-readable</li>
              <li>Faster and more compact than text files</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            TEXT vs BINARY
        ===================================================== */}
        <section className={`${reveal} animation-delay-[200ms] space-y-6`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Text Files vs Binary Files
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-300 dark:border-slate-700">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="border px-3 py-2">Text File</th>
                    <th className="border px-3 py-2">Binary File</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2">Human-readable</td>
                    <td className="border px-3 py-2">Machine-readable</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Character-based</td>
                    <td className="border px-3 py-2">Byte-based</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Reader / Writer</td>
                    <td className="border px-3 py-2">
                      InputStream / OutputStream
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================
            JAVA STREAMS
        ===================================================== */}
        <section className={`${reveal} animation-delay-[300ms] space-y-6`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Java Byte Streams for Binary Files
            </h3>

            <p className="text-sm">
              Java provides <strong>byte stream classes</strong> for handling
              binary data.
            </p>

            <ul className="list-disc list-inside text-sm mt-3 space-y-1">
              <li><strong>FileInputStream</strong> – reads bytes</li>
              <li><strong>FileOutputStream</strong> – writes bytes</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            API DETAILS
        ===================================================== */}
        <section className={`${reveal} animation-delay-[400ms] space-y-8`}>
          <div className={card}>
            <h3 className="font-semibold text-indigo-500">
              FileInputStream
            </h3>

            <p className="text-sm">
              <strong>Prototype:</strong>
              <br />
              <code>FileInputStream(String filePath)</code>
            </p>

            <p className="text-sm mt-2">
              <strong>Return Type:</strong> int
            </p>

            <p className="text-sm mt-2">
              <strong>Purpose:</strong> Reads one byte at a time from a binary file.
            </p>

            <JavaCodeBlock
              code={`FileInputStream fis = new FileInputStream("image.jpg");
int data;
while ((data = fis.read()) != -1) {
    // process each byte
}
fis.close();`}
            />
          </div>

          <div className={card}>
            <h3 className="font-semibold text-indigo-500">
              FileOutputStream
            </h3>

            <p className="text-sm">
              <strong>Prototype:</strong>
              <br />
              <code>FileOutputStream(String filePath)</code>
            </p>

            <p className="text-sm mt-2">
              <strong>Purpose:</strong> Writes bytes to a binary file.
            </p>

            <JavaCodeBlock
              code={`FileOutputStream fos = new FileOutputStream("copy.jpg");
fos.write(data);
fos.close();`}
            />
          </div>
        </section>

        {/* =====================================================
            REAL-WORLD USE CASES
        ===================================================== */}
        <section className={`${reveal} animation-delay-[500ms] space-y-6`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Real-World Use Cases
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Uploading images in school portals</li>
              <li>Storing PDFs like admit cards and reports</li>
              <li>Audio and video streaming</li>
              <li>System backups and archives</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            COMMON PITFALLS
        ===================================================== */}
        <section className={`${reveal} animation-delay-[600ms] space-y-6`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-red-500">
              Common Beginner Mistakes
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Using FileReader for binary files</li>
              <li>Forgetting to close streams</li>
              <li>Mixing text and binary APIs</li>
              <li>Ignoring performance (no buffering)</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            BEST PRACTICES
        ===================================================== */}
        <section className={`${reveal} animation-delay-[700ms] space-y-6`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-emerald-500">
              Best Practices
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Use buffered streams for large files</li>
              <li>Always close streams properly</li>
              <li>Handle exceptions carefully</li>
              <li>Keep file paths configurable</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            HINT SECTION
        ===================================================== */}
        <section className={`${reveal} animation-delay-[800ms] space-y-6`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-amber-500">
              Hint for Students
            </h3>

            <p className="text-sm">
              Think about what happens if you try to open an image file in a
              text editor. Observe how binary data behaves differently from
              characters.
            </p>
          </div>
        </section>

        {/* =====================================================
            MINI CHECKLIST
        ===================================================== */}
        <section className={`${reveal} animation-delay-[900ms] space-y-6`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Quick Revision Checklist
            </h3>

            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Meaning of binary file</li>
              <li>Why byte streams are required</li>
              <li>Difference from text file handling</li>
              <li>Common mistakes</li>
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
            Make students clearly understand <strong>why</strong> byte streams
            exist before introducing syntax. Once the concept is strong,
            the API becomes easy and logical.
          </p>
        </section>

      </div>
    );
  }
}
