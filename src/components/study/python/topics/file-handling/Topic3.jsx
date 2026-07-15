import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import textVsBinaryRead from "./topic3_files/text_vs_binary_read.py?raw";
import performanceCompare from "./topic3_files/performance_compare.py?raw";
import encodingIssues from "./topic3_files/encoding_issues.py?raw";
import bestUseCases from "./topic3_files/best_use_cases.py?raw";

// FAQ data
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Text Files vs Binary Files
 *
 * This component provides an in-depth comparison between text and binary files,
 * covering encoding, performance, use cases, and common pitfalls.
 */
const Topic3 = () => {
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
            Topic 3
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Comparison
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Text Files vs Binary Files
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          A deep dive into the differences, trade‑offs, and when to choose each
          format.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📄 Human‑readable
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            💾 Machine‑efficient
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ⚡ Performance
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: THE FUNDAMENTAL DISTINCTION ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔍</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Fundamental Distinction
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              At the lowest level, all files are just sequences of bytes. The
              distinction between "text" and "binary" is about{" "}
              <strong className="text-gray-900 dark:text-white">
                interpretation
              </strong>
              . A text file is a binary file that follows certain conventions:
            </p>
            <ul>
              <li>All bytes represent printable characters (or whitespace).</li>
              <li>Line breaks are marked with special characters.</li>
              <li>The file is encoded using a character encoding (UTF‑8, ASCII).</li>
            </ul>
            <p>
              A binary file, on the other hand, may contain any byte values,
              including those that are not printable. There is no encoding
              applied; the bytes are read as raw data.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                🧠 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                The same byte sequence can be interpreted as text or binary
                depending on how you open the file. The file itself does not
                store its "type" — it's the application that decides.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 2: ENCODING AND DECODING ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔤</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Encoding & Decoding
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The main practical difference between text and binary files is the
              <strong className="text-gray-900 dark:text-white"> encoding step</strong>.
            </p>
            <ul>
              <li>
                <strong>Text files:</strong> When reading, bytes are decoded to
                strings using a character encoding. When writing, strings are
                encoded to bytes.
              </li>
              <li>
                <strong>Binary files:</strong> No encoding/decoding occurs. You
                work with <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">bytes</code> or{" "}
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">bytearray</code> objects directly.
              </li>
            </ul>
            <p>
              This encoding process can introduce errors, especially when the
              encoding is not specified correctly. Binary files avoid this
              entirely.
            </p>
          </div>

          {/* SVG: Encoding/Decoding Flow */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 160" className="w-full max-w-3xl h-auto">
                <rect x="40" y="20" width="180" height="50" rx="8" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" />
                <text x="130" y="50" textAnchor="middle" fill="#60A5FA" fontSize="16">String ("Hello")</text>

                <line x1="220" y1="45" x2="270" y2="45" stroke="#F59E0B" strokeWidth="2" />
                <text x="245" y="35" textAnchor="middle" fill="#F59E0B" fontSize="12">encode()</text>
                <polygon points="270,40 280,45 270,50" fill="#F59E0B" />

                <rect x="280" y="20" width="180" height="50" rx="8" fill="#EF4444" fillOpacity="0.15" stroke="#EF4444" strokeWidth="2" />
                <text x="370" y="50" textAnchor="middle" fill="#F87171" fontSize="16">Bytes (b'Hello')</text>

                <line x1="460" y1="45" x2="510" y2="45" stroke="#10B981" strokeWidth="2" />
                <text x="485" y="35" textAnchor="middle" fill="#10B981" fontSize="12">decode()</text>
                <polygon points="510,40 520,45 510,50" fill="#10B981" />

                <rect x="520" y="20" width="140" height="50" rx="8" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2" />
                <text x="590" y="50" textAnchor="middle" fill="#A78BFA" fontSize="16">String</text>

                <text x="130" y="110" textAnchor="middle" fill="#6B7280" fontSize="13">Text: encode/decode required</text>
                <rect x="280" y="95" width="180" height="30" rx="6" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1" />
                <text x="370" y="115" textAnchor="middle" fill="#EF4444" fontSize="13">Binary: no conversion</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              Text mode performs encoding/decoding; binary mode does not.
            </p>
          </div>
        </section>

        {/* ====== SECTION 3: PERFORMANCE AND SIZE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚡</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Performance & Size
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Aspect</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 dark:text-blue-400">Text Files</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-600 dark:text-red-400">Binary Files</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-medium">Size</td>
                  <td className="px-6 py-4">Larger (due to encoding; numbers become multiple chars)</td>
                  <td className="px-6 py-4">Smaller (raw bytes, exact representation)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Read/Write Speed</td>
                  <td className="px-6 py-4">Slower (encoding/decoding overhead)</td>
                  <td className="px-6 py-4">Faster (no conversion)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Memory Usage</td>
                  <td className="px-6 py-4">Higher (strings are objects)</td>
                  <td className="px-6 py-4">Lower (bytes are compact)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Compressibility</td>
                  <td className="px-6 py-4">Good (repetitive text compresses well)</td>
                  <td className="px-6 py-4">Depends on data; often less compressible</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Parsing Complexity</td>
                  <td className="px-6 py-4">May require complex parsers (JSON, XML)</td>
                  <td className="px-6 py-4">Can be simpler if fixed‑width fields</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ====== SECTION 4: USE CASES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎯</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              When to Use Each
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600">
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">✅ Use Text Files When:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✔</span>
                  <span>Human readability is important (logs, configs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✔</span>
                  <span>Data needs to be edited manually (CSV, JSON).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✔</span>
                  <span>Cross‑platform compatibility is required (text is universal).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✔</span>
                  <span>Data is relatively small and not performance‑critical.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✔</span>
                  <span>You need to use standard formats (XML, HTML).</span>
                </li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-6 border border-red-200 dark:border-red-800/50 transition-all duration-300 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-3">✅ Use Binary Files When:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✔</span>
                  <span>Performance and size are critical (images, videos).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✔</span>
                  <span>Data is non‑textual (media, executables).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✔</span>
                  <span>You need to store complex structures efficiently.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✔</span>
                  <span>No human editing is required.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✔</span>
                  <span>You want to avoid encoding issues (embedded systems).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ====== SECTION 5: REAL-WORLD COMPARISON ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌍</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Real-World Comparison
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Student Marks as CSV (Text) vs Pickle (Binary)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    In Naihati, a school stores marks in a CSV file. Teachers
                    can open it in Excel, edit it, and check values. But when
                    the school wants to share data with a central database, they
                    use a binary pickle format for speed and smaller size,
                    sacrificing human readability.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📸</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Student Photos (Binary) vs Description (Text)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A school in Shyamnagar stores student photos as JPEG
                    (binary). If they instead stored a text description of each
                    pixel, the file would be enormous and slow. The binary
                    format is necessary for efficiency.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">⚙️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Configuration (Text) vs Cached Data (Binary)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    An app in Barrackpore uses a JSON (text) configuration so
                    developers can tweak settings. But it stores a large cache
                    of search results in a binary file (using Python's `pickle`)
                    for faster loading and compact storage.
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
            The following examples illustrate the practical differences and
            trade‑offs between text and binary handling.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={textVsBinaryRead}
              title="Reading Same File as Text vs Binary"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={performanceCompare}
              title="Performance Comparison"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={encodingIssues}
              title="Encoding Issues & Solutions"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={bestUseCases}
              title="Best Use Cases – Decision Helper"
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
                title: "Always use `b` for media files",
                desc: "Never open images, videos, or audio in text mode. They'll be corrupted.",
              },
              {
                title: "Use `detect_encoding` from `codecs`",
                desc: "If you don't know the encoding, use `codecs.lookup()` or `chardet`.",
              },
              {
                title: "Text files are easier to debug",
                desc: "You can inspect them with any editor; binary requires a hex viewer.",
              },
              {
                title: "Leverage `struct` for binary reading",
                desc: "Use `struct.unpack` to interpret binary data as numbers, strings, etc.",
              },
              {
                title: "Use `json` and `csv` for data exchange",
                desc: "These are text‑based, portable, and human‑readable.",
              },
              {
                title: "Compress binary data with `gzip`",
                desc: "Binary files often compress well; Python has built‑in support.",
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
                mistake: "Using text mode for binary data → data corruption",
                fix: "Always use 'rb' or 'wb' for non‑text files.",
              },
              {
                mistake: "Assuming all text files are UTF‑8",
                fix: "Explicitly specify encoding; use `encoding='utf-8'`.",
              },
              {
                mistake: "Not handling encoding errors",
                fix: "Use `errors='ignore'` or `errors='replace'` in open() if needed.",
              },
              {
                mistake: "Comparing files as strings instead of bytes",
                fix: "For binary, compare bytes; for text, compare after decoding.",
              },
              {
                mistake: "Storing large numeric arrays as text",
                fix: "Use binary format (e.g., `array` or `numpy`). It's far more efficient.",
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
                    Choose based on needs:
                  </strong>{" "}
                  If you need human readability, go text; otherwise, binary.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Be explicit:
                  </strong>{" "}
                  Always specify `encoding` and `mode` in `open()` calls.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Test with both types:
                  </strong>{" "}
                  Ensure your code handles both gracefully.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use standard formats:
                  </strong>{" "}
                  JSON, CSV, XML for text; `pickle`, `struct`, or dedicated
                  formats for binary.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Document your file format:
                  </strong>{" "}
                  Especially for binary, document the byte layout.
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
                "The fundamental difference: interpretation of bytes",
                "Encoding/decoding and its impact on text files",
                "Performance and size trade‑offs",
                "When to use text vs binary (decision criteria)",
                "How to handle encoding errors",
                "Python's text and binary modes",
                "Practical examples of each type",
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
                  Open a `.txt` file and a `.jpg` file in a hex editor. What do
                  you notice about the byte patterns?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a program that reads a CSV file as binary and displays
                  the bytes. How does that differ from reading it as text?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why do databases use binary formats for storage? What
                  advantages do they gain over text‑based storage?
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
            title="Text vs Binary – FAQs"
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
              "This is the topic where many students finally 'get' the difference. " +
              "Use a hex editor to show them the raw bytes of both a text file and " +
              "a binary file. Emphasize that the distinction is about interpretation, " +
              "not inherent properties. Encourage them to always ask: 'Will a human " +
              "need to read this?' and 'Is performance critical?' to guide their choice. " +
              "Also, stress encoding: it's the #1 source of bugs in text file handling."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 3: Text Files vs Binary Files · Built with ❤️ for classroom
            learning
          </p>
          <p className="mt-1">Next: Topic 4 — File Paths (Absolute & Relative)</p>
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

export default Topic3;