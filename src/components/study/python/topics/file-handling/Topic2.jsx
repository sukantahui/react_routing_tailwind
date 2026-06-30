import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import textReadWrite from "./topic2_files/text_read_write.py?raw";
import binaryReadWrite from "./topic2_files/binary_read_write.py?raw";
import detectFileType from "./topic2_files/detect_file_type.py?raw";
import compareTextBinary from "./topic2_files/compare_text_binary.py?raw";

// FAQ data
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Types of Files
 *
 * This component explains the different types of files: text files, binary files,
 * and the characteristics that distinguish them.
 */
const Topic2 = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 p-6 md:p-8 lg:p-12 font-sans leading-relaxed">
      {/* ====== PAGE HEADER ====== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-mono bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
            Topic 2
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Fundamentals
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Types of Files
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Understanding the difference between text files and binary files — and
          when to use each.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📄 Text Files
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            💾 Binary Files
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔤 Encoding
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: CLASSIFICATION ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🗂️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              File Classification
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Files can be broadly classified into two categories based on how
              their data is represented and interpreted:
            </p>
            <ul>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Text Files:
                </strong>{" "}
                Contain human‑readable characters, stored with an encoding (e.g.,
                UTF‑8, ASCII). They are line‑oriented and can be opened in any
                text editor.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Binary Files:
                </strong>{" "}
                Contain data in a non‑text format, such as bytes representing
                images, executables, or custom structures. They are not
                human‑readable and require specific programs to interpret.
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Every file is ultimately a sequence of bytes. The distinction
                lies in <em>how</em> those bytes are interpreted — as characters
                (text) or as raw data (binary).
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 2: TEXT FILES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Text Files
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Text files store data as sequences of characters using a specific
              <strong className="text-gray-900 dark:text-white"> encoding</strong>.
              They are human‑readable and can be edited with any plain‑text
              editor (Notepad, VS Code, etc.).
            </p>
            <ul>
              <li>
                <strong>Common examples:</strong> .txt, .csv, .json, .xml, .html,
                .py, .log.
              </li>
              <li>
                <strong>How they work:</strong> Each character is mapped to a
                number using a character encoding (UTF‑8 is the most common).
                Line endings (newline) are represented by special characters (\n
                on Unix, \r\n on Windows).
              </li>
              <li>
                <strong>Python handling:</strong> Open in text mode (default) to
                get strings; specify encoding to avoid platform issues.
              </li>
            </ul>
          </div>

          {/* SVG: Text file structure */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 120" className="w-full max-w-3xl h-auto">
                <rect x="20" y="20" width="660" height="80" rx="10" fill="#3B82F6" fillOpacity="0.08" stroke="#3B82F6" strokeWidth="1.5" />
                <text x="50" y="60" fill="#60A5FA" fontSize="20" fontFamily="monospace">Hello,</text>
                <text x="160" y="60" fill="#F59E0B" fontSize="20" fontFamily="monospace"> World!</text>
                <text x="310" y="60" fill="#10B981" fontSize="20" fontFamily="monospace"> This is</text>
                <text x="460" y="60" fill="#EF4444" fontSize="20" fontFamily="monospace"> a text</text>
                <text x="590" y="60" fill="#8B5CF6" fontSize="20" fontFamily="monospace"> file.</text>
                <text x="40" y="90" fill="#6B7280" fontSize="12">Characters interpreted as letters, numbers, punctuation → Human‑readable</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Text files store characters using an encoding. They are meant to
              be read by humans.
            </p>
          </div>
        </section>

        {/* ====== SECTION 3: BINARY FILES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">💾</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Binary Files
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Binary files store data in the same format as it appears in
              memory — as raw bytes. They are not intended to be human‑readable,
              but are compact, fast, and can store complex data structures
              directly.
            </p>
            <ul>
              <li>
                <strong>Common examples:</strong> .exe, .jpg, .png, .mp3, .mp4,
                .pdf, .zip, custom binary formats.
              </li>
              <li>
                <strong>How they work:</strong> Each byte (or group of bytes)
                represents a value directly (e.g., a pixel's color, an integer,
                a floating‑point number). No encoding/decoding is applied.
              </li>
              <li>
                <strong>Python handling:</strong> Open in binary mode using
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'rb'</code> or <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'wb'</code>
                ; read/write bytes objects.
              </li>
            </ul>
          </div>

          {/* SVG: Binary file structure */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 120" className="w-full max-w-3xl h-auto">
                <rect x="20" y="20" width="660" height="80" rx="10" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1.5" />
                <text x="40" y="55" fill="#F87171" fontSize="16" fontFamily="monospace">0x48 0x65 0x6C 0x6C 0x6F 0x2C 0x20 0x57 0x6F 0x72 0x6C 0x64 0x21</text>
                <text x="40" y="85" fill="#6B7280" fontSize="12">Bytes in hexadecimal → Not human‑readable, but efficient for machines</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Binary files store raw byte values. They are optimized for machine
              processing.
            </p>
          </div>
        </section>

        {/* ====== SECTION 4: COMPARISON TABLE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Text vs Binary – Key Differences
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Feature</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 dark:text-blue-400">Text Files</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-600 dark:text-red-400">Binary Files</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-medium">Human‑readable</td>
                  <td className="px-6 py-4">✅ Yes (with correct encoding)</td>
                  <td className="px-6 py-4">❌ No (garbled if opened in text editor)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Encoding required</td>
                  <td className="px-6 py-4">Yes (e.g., UTF‑8, ASCII)</td>
                  <td className="px-6 py-4">No (raw bytes)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Line endings</td>
                  <td className="px-6 py-4">Special characters (\\n, \\r\\n)</td>
                  <td className="px-6 py-4">Not applicable</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Size efficiency</td>
                  <td className="px-6 py-4">Less compact (due to encoding)</td>
                  <td className="px-6 py-4">More compact (exact byte representation)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Complex data storage</td>
                  <td className="px-6 py-4">Only simple structures (via formats like JSON)</td>
                  <td className="px-6 py-4">Can store any structure directly</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Typical Python mode</td>
                  <td className="px-6 py-4"><code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'r'</code> or <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'w'</code></td>
                  <td className="px-6 py-4"><code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'rb'</code> or <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'wb'</code></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Common use cases</td>
                  <td className="px-6 py-4">Config files, logs, source code, data exchange (JSON, CSV)</td>
                  <td className="px-6 py-4">Images, videos, executables, compressed data, serialized objects</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ====== SECTION 5: REAL-WORLD EXAMPLES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌍</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Real-World Examples
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    School Marks in CSV (Text)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school in Shyamnagar stores student marks in a CSV file
                    named <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">marks.csv</code>.
                    Swadeep, Tuhina, Abhronila, and Debangshu each have a row
                    with their scores. This text file can be opened in Excel,
                    edited manually, and processed by any programming language.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🖼️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Student Photos (Binary)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school also stores each student's photo as a JPEG image.
                    These binary files (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">.jpg</code>)
                    are not human‑readable, but they are compact and can be
                    rendered by image viewers. Binary format is essential for
                    storing visual data.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    App Preferences (JSON – Text)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A mobile app in Barrackpore stores user preferences in a
                    JSON file. This text‑based format allows developers to read
                    and modify settings without recompiling the app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SECTION 6: PYTHON CODE EXAMPLES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🐍</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Python in Action
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
            The following examples demonstrate how to work with text and binary
            files in Python.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={textReadWrite}
              title="Reading & Writing Text Files"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={binaryReadWrite}
              title="Reading & Writing Binary Files"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={detectFileType}
              title="Detecting Text vs Binary"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={compareTextBinary}
              title="Comparing Text & Binary Approaches"
              highlightLines={[]}
            />
          </div>
        </section>

        {/* ====== SECTION 7: TIPS & TRICKS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">💡</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tips & Tricks
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Always specify encoding for text files",
                desc: "Use `encoding='utf-8'` to avoid platform‑dependent behavior and Unicode errors.",
              },
              {
                title: "Use binary mode for media and executables",
                desc: "Never open images, videos, or .exe files in text mode — you'll get decoding errors.",
              },
              {
                title: "Check for null bytes in binary data",
                desc: "Text files shouldn't contain `\\x00`; use this to detect binary content.",
              },
              {
                title: "Leverage the `struct` module for binary formats",
                desc: "For custom binary protocols, use `struct.pack` and `struct.unpack` to handle C‑style data.",
              },
              {
                title: "Use `.csv` and `.json` for portability",
                desc: "Text‑based formats are universally readable across platforms and languages.",
              },
              {
                title: "Compress binary data with `gzip` or `zip`",
                desc: "Binary data often compresses well; use Python's compression modules to save space.",
              },
            ].map((tip, idx) => (
              <div
                key={idx}
                className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800/50 transition-all duration-300 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-600 hover:-translate-y-1"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                  <span className="text-amber-500">✦</span> {tip.title}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ====== SECTION 8: COMMON MISTAKES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Common Mistakes
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                mistake: "Opening a binary file in text mode",
                fix: "Use 'rb' or 'wb' for binary files, never 'r' or 'w'.",
              },
              {
                mistake: "Forgetting to specify encoding for text files",
                fix: "Always specify `encoding='utf-8'` to avoid UnicodeDecodeError.",
              },
              {
                mistake: "Assuming all .txt files use the same line ending",
                fix: "Use `newline=''` when reading CSV files, or handle `\\r\\n` vs `\\n`.",
              },
              {
                mistake: "Using `read()` on a large binary file",
                fix: "Use `read()` with a block size or iterate over chunks to avoid memory blow‑up.",
              },
              {
                mistake: "Treating binary data as strings",
                fix: "Binary files return `bytes`, not `str`. Convert only when necessary.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-red-50 dark:bg-red-950/20 rounded-xl p-5 border border-red-200 dark:border-red-800/50 transition-all duration-300 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600"
              >
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg">✗</span>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {item.mistake}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      ✓ {item.fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== SECTION 9: BEST PRACTICES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">✅</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Best Practices
            </h2>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800/50 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use the appropriate mode:
                  </strong>{" "}
                  Choose 't' (text) or 'b' (binary) based on the file's nature.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Be explicit about encoding:
                  </strong>{" "}
                  When reading/writing text, always pass `encoding=` to `open()`.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Test with sample files:
                  </strong>{" "}
                  Ensure your code works with both text and binary files
                  (e.g., a .txt and a .jpg).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `bytes` and `bytearray` for binary manipulation:
                  </strong>{" "}
                  These are efficient and Pythonic.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Document your file format:
                  </strong>{" "}
                  For custom binary formats, document the byte layout clearly.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 10: MINI CHECKLIST ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📋</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mini Checklist
            </h2>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800/50 transition-all duration-300 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By the end of this topic, you should understand:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "The two main types of files: text and binary",
                "What character encoding is and why it matters for text files",
                "Why binary files are not human‑readable",
                "When to use text vs binary formats (use cases)",
                "How to open and read/write both types in Python",
                "Common pitfalls (opening binary as text, encoding issues)",
                "Best practices for handling each type",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900/50 px-4 py-2 rounded-lg"
                >
                  <span className="text-indigo-400">☐</span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== SECTION 11: HINT SECTION ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🤔</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Think About…
            </h2>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800/50 transition-all duration-300 hover:shadow-lg hover:border-yellow-300 dark:hover:border-yellow-600">
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Observe carefully:
                  </strong>{" "}
                  Open a .txt file and a .jpg file in a text editor. What do
                  you see? Why the difference?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  If you save a Python program as a .py file (text) and then
                  rename it to .bin, what happens? Does it become a binary file?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why do we store images as binary rather than as a text
                  description of each pixel? What would be the file size
                  difference?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SECTION 12: FAQ ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <FAQTemplate
            title="Types of Files – FAQs"
            questions={questions}
          />
        </section>

        {/* ====== SECTION 13: TEACHER'S NOTE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <Teacher
            note={
              "This topic is the foundation for understanding how data is stored. " +
              "Make it tangible: bring in actual files (a .txt, a .jpg, a .exe) and " +
              "show students what happens when you open them in a text editor vs a hex editor. " +
              "Emphasize that all files are bytes — the difference is interpretation. " +
              "Encourage students to think about which file type is appropriate for a given " +
              "situation (e.g., logs should be text for human reading; images should be binary " +
              "for efficiency). This will help them make design decisions later."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 2: Types of Files · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 3 — Text Files vs Binary Files</p>
        </footer>
      </div>

      {/* ====== INLINE STYLES FOR REVEAL ANIMATIONS ====== */}
      <style>{`
        .section-hidden {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .section-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .section-hidden {
            opacity: 1;
            transform: none;
          }
          .section-hidden * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic2;