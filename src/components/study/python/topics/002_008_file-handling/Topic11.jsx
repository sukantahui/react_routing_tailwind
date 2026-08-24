import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import manualClose from "./topic11_files/manual_close.py?raw";
import automaticClose from "./topic11_files/automatic_close.py?raw";
import contextManager from "./topic11_files/context_manager.py?raw";
import withMultipleFiles from "./topic11_files/with_multiple_files.py?raw";
import closeErrors from "./topic11_files/close_errors.py?raw";

// FAQ data
import questions from "./topic11_files/topic11_questions";

/**
 * Topic11: Closing Files
 *
 * This component explains the importance of closing files in Python,
 * the close() method, the with statement, and best practices for
 * resource management.
 */
const Topic11 = () => {
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
            Topic 11
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Closing Files
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Why closing files matters, how to do it correctly, and how to avoid
          resource leaks.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔒 close()
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔄 with
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            💾 Resource Management
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHY CLOSE FILES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">❓</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why Do We Need to Close Files?
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              When you open a file in Python, the operating system allocates
              resources to manage that file — a <strong>file descriptor</strong>.
              These resources are limited, and if you don't close files, you can
              exhaust them.
            </p>
            <p>
              Closing a file is important because:
            </p>
            <ul>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Releases system resources:
                </strong>{" "}
                File descriptors are a finite resource. Leaking them can cause
                "too many open files" errors.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Flushes buffered data:
                </strong>{" "}
                Python buffers writes for performance. Closing ensures all data
                is written to disk.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Prevents data corruption:
                </strong>{" "}
                If a program crashes with open files, data in buffers may be lost.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Allows other programs to access the file:
                </strong>{" "}
                On some systems, open files are locked and cannot be accessed by
                other processes.
              </li>
            </ul>
            <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl">
              <p className="text-red-700 dark:text-red-300 font-medium">
                ⚠️ Resource Leak Warning:
              </p>
              <p className="text-red-600 dark:text-red-400 text-sm">
                Not closing files is a <strong>resource leak</strong>. In long‑running
                applications (like web servers), this can crash the system.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 2: THE close() METHOD ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔒</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `close()` Method
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">close()</code> method is
              called on a file object to release its resources.
            </p>
            <ul>
              <li>
                <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">file.close()</code>
              </li>
              <li>
                <strong>Return type:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">None</code>
              </li>
              <li>
                <strong>Purpose:</strong> Flushes the buffer and releases the
                file descriptor.
              </li>
              <li>
                <strong>When:</strong> Call it when you're done with the file.
              </li>
            </ul>
            <p>
              After closing, any operation on the file object raises a
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">ValueError</code>.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800/50 mt-4">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              💡 <strong>Best Practice:</strong> Always check if the file is
              already closed using the <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">closed</code> attribute before calling
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">close()</code>.
            </p>
          </div>
        </section>

        {/* ====== SECTION 3: MANUAL VS AUTOMATIC CLOSING ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Manual vs Automatic Closing
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Approach</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Manual (`close()`)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Automatic (`with`)</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-medium">Safety</td>
                  <td className="px-6 py-4">❌ Risk of forgetting</td>
                  <td className="px-6 py-4">✅ Guaranteed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Exception handling</td>
                  <td className="px-6 py-4">❌ File may stay open</td>
                  <td className="px-6 py-4">✅ Always closes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Code clarity</td>
                  <td className="px-6 py-4">Less clear</td>
                  <td className="px-6 py-4">More readable</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Flexibility</td>
                  <td className="px-6 py-4">More control</td>
                  <td className="px-6 py-4">Less control</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Recommended</td>
                  <td className="px-6 py-4">❌ Only for special cases</td>
                  <td className="px-6 py-4">✅ Always</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            The `with` statement is the recommended way to handle files in Python.
          </p>
        </section>

        {/* ====== SECTION 4: THE with STATEMENT ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `with` Statement (Context Manager)
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with</code> statement is
              a <strong>context manager</strong> that automatically handles
              resource cleanup. When used with files, it ensures the file is
              closed when the block exits — even if an exception occurs.
            </p>
            <p>
              <strong>Syntax:</strong>
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('file.txt', 'r') as f:<br />
    content = f.read()<br />
# File is automatically closed here
              </code>
            </pre>
            <ul>
              <li>
                <strong>Automatic:</strong> No need to call `close()`.
              </li>
              <li>
                <strong>Safe:</strong> Even if an exception is raised, the file
                is closed.
              </li>
              <li>
                <strong>Pythonic:</strong> This is the idiomatic way to handle
                files in Python.
              </li>
            </ul>
          </div>

          {/* SVG: with vs manual */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 160" className="w-full max-w-3xl h-auto">
                <text x="175" y="25" textAnchor="middle" fill="#6B7280" fontSize="14">Manual (risky)</text>
                <text x="525" y="25" textAnchor="middle" fill="#6B7280" fontSize="14">with (safe)</text>

                <rect x="40" y="45" width="270" height="90" rx="10" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1.5" />
                <text x="175" y="70" textAnchor="middle" fill="#F87171" fontSize="13">f = open('file.txt')</text>
                <text x="175" y="90" textAnchor="middle" fill="#F87171" fontSize="13">data = f.read()</text>
                <text x="175" y="110" textAnchor="middle" fill="#F87171" fontSize="13">f.close()  # Must remember!</text>
                <text x="175" y="130" textAnchor="middle" fill="#FCA5A5" fontSize="11">❌ Can be forgotten</text>

                <rect x="390" y="45" width="270" height="90" rx="10" fill="#10B981" fillOpacity="0.08" stroke="#10B981" strokeWidth="1.5">
                  <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="525" y="70" textAnchor="middle" fill="#34D399" fontSize="13">with open('file.txt') as f:</text>
                <text x="525" y="90" textAnchor="middle" fill="#34D399" fontSize="13">    data = f.read()</text>
                <text x="525" y="110" textAnchor="middle" fill="#34D399" fontSize="13"># Auto‑closed here</text>
                <text x="525" y="130" textAnchor="middle" fill="#6EE7B7" fontSize="11">✅ Always safe</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              The `with` statement guarantees the file is closed, even if an exception occurs.
            </p>
          </div>
        </section>

        {/* ====== SECTION 5: CLOSING MULTIPLE FILES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📚</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Closing Multiple Files
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              You can open and close multiple files in a single <code>with</code>
              statement:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('input.txt', 'r') as src, open('output.txt', 'w') as dst:<br />
    dst.write(src.read())<br />
# Both files are closed automatically
              </code>
            </pre>
            <p>
              Alternatively, you can nest <code>with</code> statements for
              clarity:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('input.txt', 'r') as src:<br />
    with open('output.txt', 'w') as dst:<br />
        dst.write(src.read())
              </code>
            </pre>
          </div>
        </section>

        {/* ====== SECTION 6: REAL-WORLD SCENARIOS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌍</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Real-World Scenarios
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🏫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    School Report Generator
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school in Barrackpore generates reports every hour. A
                    script opens a template, reads data, and writes the report.
                    Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with</code> ensures that
                    files are closed even if the report generation fails,
                    preventing resource leaks.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🌐</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Web Server Log Rotation
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A web server in Shyamnagar writes access logs. When the log
                    file reaches a certain size, it's rotated. The rotation
                    script needs to close the current log file before renaming
                    it. Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with</code>
                    guarantees the file is closed before the rename operation.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Mobile App Data Sync
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A mobile app in Naihati syncs data with a cloud service.
                    During sync, it writes to a temporary file. If the sync
                    fails, the file must be closed properly to avoid corruption.
                    The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with</code> statement
                    handles this automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SECTION 7: PYTHON CODE EXAMPLES ====== */}
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
            The following examples demonstrate various ways to close files.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={manualClose}
              title="Manual close() – The Risky Way"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={automaticClose}
              title="Automatic Closing – The Safe Way"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={contextManager}
              title="Context Manager – The Pythonic Way"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={withMultipleFiles}
              title="Managing Multiple Files"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={closeErrors}
              title="Handling Errors with Files"
              highlightLines={[]}
            />
          </div>
        </section>

        {/* ====== SECTION 8: TIPS & TRICKS ====== */}
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
                title: "Always use `with` for files",
                desc: "It's the safest and most Pythonic way to handle files.",
              },
              {
                title: "Check `f.closed` before operations",
                desc: "Avoid `ValueError` by checking if the file is still open.",
              },
              {
                title: "Files are closed when garbage‑collected",
                desc: "But relying on this is unreliable; always use `with`.",
              },
              {
                title: "Use nested `with` for multiple files",
                desc: "It's clearer and ensures both files are closed.",
              },
              {
                title: "Close files explicitly in exception handlers",
                desc: "If you must use manual close, use `try‑finally`.",
              },
              {
                title: "Log file operations for debugging",
                desc: "Log when you open and close files to trace resource usage.",
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

        {/* ====== SECTION 9: COMMON MISTAKES ====== */}
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
                mistake: "Forgetting to close files entirely",
                fix: "Use `with open()` to ensure automatic closure.",
              },
              {
                mistake: "Not using `with` and relying on garbage collection",
                fix: "Garbage collection is not guaranteed; always close explicitly.",
              },
              {
                mistake: "Trying to read from a closed file",
                fix: "Check `f.closed` before operations.",
              },
              {
                mistake: "Closing a file that is already closed",
                fix: "Check `f.closed` before calling `close()`.",
              },
              {
                mistake: "Not handling exceptions when closing",
                fix: "Use `with` or `try‑finally` to ensure closure.",
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

        {/* ====== SECTION 10: BEST PRACTICES ====== */}
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
                    Always use `with open()`:
                  </strong>{" "}
                  This is the single most important best practice for file handling.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Never rely on garbage collection:
                  </strong>{" "}
                  It's not deterministic and may not happen in time.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `try‑finally` if manual close is unavoidable:
                  </strong>{" "}
                  Ensures closure even in exceptional cases.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Check `f.closed` before operations:
                  </strong>{" "}
                  Prevents errors when working with file objects.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Monitor file descriptor usage:
                  </strong>{" "}
                  In long‑running applications, log file opens/closes to detect leaks.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 11: MINI CHECKLIST ====== */}
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
                "Why closing files is important (resource leaks)",
                "The `close()` method and its effects",
                "The `with` statement and how it works",
                "The difference between manual and automatic closing",
                "How to handle multiple files with `with`",
                "Common pitfalls and how to avoid them",
                "Best practices for resource management",
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

        {/* ====== SECTION 12: HINT SECTION ====== */}
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
                  What happens to a file object after it's closed? Try calling
                  `f.read()` after `f.close()`. What error do you get?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a script that opens a file with `with`, but intentionally
                  raises an exception inside the block. Is the file still closed?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  A web server handles thousands of requests. Each request opens
                  a log file. Why is it critical that each file is closed
                  promptly? What happens if files are not closed?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SECTION 13: FAQ ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <FAQTemplate
            title="Closing Files – FAQs"
            questions={questions}
          />
        </section>

        {/* ====== SECTION 14: TEACHER'S NOTE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <Teacher
            note={
              "Closing files is a fundamental discipline that students must " +
              "internalize. Use the analogy of a book: you open it to read, " +
              "but you close it when you're done. The `with` statement is like " +
              "having a librarian who automatically puts the book back. " +
              "Emphasize that resource leaks are serious — in web servers, " +
              "they can crash the entire system. Drill the `with` pattern until " +
              "it becomes automatic. Show them the 'too many open files' error " +
              "to make the consequences real."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 11: Closing Files · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 12 — Using with open() as file</p>
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

export default Topic11;