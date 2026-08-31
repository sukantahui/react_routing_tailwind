import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import appendBasic from "./topic20_files/append_basic.py?raw";
import appendVsWrite from "./topic20_files/append_vs_write.py?raw";
import appendLogging from "./topic20_files/append_logging.py?raw";
import appendMultiple from "./topic20_files/append_multiple.py?raw";
import appendErrors from "./topic20_files/append_errors.py?raw";
import appendLarge from "./topic20_files/append_large.py?raw";

// FAQ data
import questions from "./topic20_files/topic20_questions";

/**
 * Topic20: Appending Data to Files
 *
 * This component explains how to append data to files using the 'a' mode,
 * the difference between writing and appending, and best practices for
 * log files and data accumulation.
 */
const Topic20 = () => {
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
            Topic 20
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Appending Data to Files
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Adding data to the end of a file without overwriting existing content
          — essential for logs and data accumulation.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ➕ 'a' mode
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📋 Append
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📜 Logs
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS APPENDING ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">➕</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What is Appending?
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">Appending</strong> is
              the process of adding new data to the <strong>end</strong> of an
              existing file without modifying or deleting the content that's
              already there.
            </p>
            <p>
              In Python, you append to a file by opening it in <strong>append
              mode</strong> (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'a'</code> or
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'a+'</code>). This is
              different from write mode (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'w'</code>),
              which overwrites the file.
            </p>
            <ul>
              <li>
                <strong>Preserves history:</strong> All previous data is kept.
              </li>
              <li>
                <strong>Creates if missing:</strong> If the file doesn't exist,
                it's created.
              </li>
              <li>
                <strong>Ideal for logs:</strong> Adding new entries to a log file
                is the classic use case.
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Appending is the <strong>safe</strong> way to add data. Unlike
                writing ('w'), it never destroys existing data. This is why
                logs, transaction records, and audit trails always use append.
              </p>
            </div>
          </div>

          {/* SVG: Append vs Write */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 200" className="w-full max-w-3xl h-auto">
                <text x="175" y="25" textAnchor="middle" fill="#6B7280" fontSize="14">Write ('w') — Overwrites</text>
                <text x="525" y="25" textAnchor="middle" fill="#6B7280" fontSize="14">Append ('a') — Adds to End</text>

                <rect x="30" y="40" width="290" height="130" rx="10" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1.5" />
                <text x="175" y="65" textAnchor="middle" fill="#F87171" fontSize="13">Before: [A][B][C]</text>
                <text x="175" y="90" textAnchor="middle" fill="#F87171" fontSize="13">write('X') →</text>
                <text x="175" y="115" textAnchor="middle" fill="#FCA5A5" fontSize="13">After: [X]</text>
                <text x="175" y="140" textAnchor="middle" fill="#FCA5A5" fontSize="11">❌ Old data lost</text>

                <rect x="380" y="40" width="290" height="130" rx="10" fill="#10B981" fillOpacity="0.08" stroke="#10B981" strokeWidth="1.5">
                  <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="525" y="65" textAnchor="middle" fill="#34D399" fontSize="13">Before: [A][B][C]</text>
                <text x="525" y="90" textAnchor="middle" fill="#34D399" fontSize="13">append('X') →</text>
                <text x="525" y="115" textAnchor="middle" fill="#6EE7B7" fontSize="13">After: [A][B][C][X]</text>
                <text x="525" y="140" textAnchor="middle" fill="#6EE7B7" fontSize="11">✅ Old data preserved</text>

                <text x="350" y="185" textAnchor="middle" fill="#6B7280" fontSize="12">Appending preserves history; writing destroys it</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              Append mode adds data to the end, preserving existing content.
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: THE APPEND MODES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📋</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Append Modes: 'a' and 'a+'
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Mode</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Read?</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Write?</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Write Position</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">File must exist?</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Use Case</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'a'</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">End (always)</td>
                  <td className="px-6 py-4">No (created)</td>
                  <td className="px-6 py-4">Log files</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'a+'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">End (always)</td>
                  <td className="px-6 py-4">No (created)</td>
                  <td className="px-6 py-4">Logs + review</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border border-green-200 dark:border-green-800/50">
              <h4 className="font-semibold text-gray-900 dark:text-white">'a' – Append Only</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Write‑only; adds data to the end. Ideal for writing logs.
              </p>
              <code className="text-xs block mt-2 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                with open('log.txt', 'a') as f:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;f.write('New entry\n')
              </code>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-5 border border-purple-200 dark:border-purple-800/50">
              <h4 className="font-semibold text-gray-900 dark:text-white">'a+' – Append + Read</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Read and append; can read the entire log and add new entries.
              </p>
              <code className="text-xs block mt-2 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                with open('log.txt', 'a+') as f:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;history = f.read()<br />
                &nbsp;&nbsp;&nbsp;&nbsp;f.write('New entry\n')
              </code>
            </div>
          </div>
        </section>

        {/* ====== SECTION 3: POINTER POSITION IN APPEND MODE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📍</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              File Pointer in Append Mode
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              In append mode, the file pointer behaves differently from other
              modes:
            </p>
            <ul>
              <li>
                <strong>Reading:</strong> The pointer starts at the beginning
                (position 0) in <code>'a+'</code> mode.
              </li>
              <li>
                <strong>Writing:</strong> The pointer is <strong>always</strong>
                moved to the end before each write. You cannot write at a
                specific position in append mode.
              </li>
              <li>
                <strong><code>seek()</code>:</strong> You can <code>seek()</code>
                for reading, but writes will still go to the end.
              </li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                ⚠️ Important:
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                In append mode (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'a'</code> or
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'a+'</code>), every write
                automatically goes to the end. <code>seek()</code> does not
                affect the write position — it only affects reading.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 4: APPENDING WITH WRITELINES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📝</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Appending Multiple Lines
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              You can append multiple lines at once using <code>writelines()</code>
              in append mode.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('log.txt', 'a', encoding='utf-8') as f:<br />
    f.writelines([<br />
        "First new line\n",<br />
        "Second new line\n",<br />
        "Third new line\n"<br />
    ])
              </code>
            </pre>
            <p>
              This is efficient when you have multiple entries to append in a
              batch operation.
            </p>
          </div>
        </section>

        {/* ====== SECTION 5: REAL-WORLD SCENARIOS ====== */}
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
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Daily Attendance Log
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A school in Barrackpore maintains an attendance log. Each
                    day, the system appends the attendance records to
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">attendance.txt</code>,
                    preserving the full history of attendance without overwriting
                    previous days.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Application Logging
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A web application in Shyamnagar logs every request and
                    response to <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">access.log</code>.
                    Using append mode, each request is added to the end, creating
                    a complete audit trail that's essential for debugging and
                    security analysis.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💰</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Transaction History
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A banking system in Naihati appends every transaction to
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">transactions.txt</code>.
                    The append‑only nature ensures an immutable record that can
                    be audited at any time.
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
            The following examples demonstrate appending data to files.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={appendBasic}
              title="Basic Appending"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={appendVsWrite}
              title="Append vs Write"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={appendLogging}
              title="Building a Log System"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={appendMultiple}
              title="Appending Multiple Lines"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={appendErrors}
              title="Handling Append Errors"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={appendLarge}
              title="Large File Appending"
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
                title: "Use 'a' for logs, 'a+' for logs with review",
                desc: "Choose based on whether you need to read the existing log.",
              },
              {
                title: "Always include newlines when appending",
                desc: "Appended data should end with '\\n' for proper formatting.",
              },
              {
                title: "Use `with` for automatic flushing",
                desc: "Ensures data is written even if exceptions occur.",
              },
              {
                title: "Add timestamps to log entries",
                desc: "`f.write(f'[{datetime.now()}] {message}\\n')` is a pro pattern.",
              },
              {
                title: "Use `writelines()` for batch appends",
                desc: "More efficient for adding multiple entries at once.",
              },
              {
                title: "Monitor file size for log rotation",
                desc: "Large logs may need rotation; use `os.path.getsize()`.",
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
                mistake: "Using 'w' instead of 'a' and losing data",
                fix: "Always use 'a' when you want to preserve existing content.",
              },
              {
                mistake: "Forgetting to add newline when appending",
                fix: "Appended data will run together; always add '\\n'.",
              },
              {
                mistake: "Assuming seek() works for writing in append mode",
                fix: "In append mode, writes always go to the end, regardless of seek().",
              },
              {
                mistake: "Not handling file permissions",
                fix: "Catch PermissionError when the file isn't writable.",
              },
              {
                mistake: "Appending to a file that's being read elsewhere",
                fix: "Consider file locks if multiple processes access the file.",
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
                    Use append mode for logs and history:
                  </strong>{" "}
                  Never overwrite history unless you have a good reason.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Always include timestamps in log entries:
                  </strong>{" "}
                  This makes logs useful for debugging.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `with` for automatic file closure:
                  </strong>{" "}
                  Ensures data is flushed to disk.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Implement log rotation for large files:
                  </strong>{" "}
                  Split logs by size or date to keep them manageable.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `a+` when you need to review the log:
                  </strong>{" "}
                  Combine reading and appending in a single file handle.
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
                "What appending is and why it's useful",
                "The difference between 'a' and 'a+' modes",
                "How file pointer works in append mode",
                "When to use append vs write",
                "How to append multiple lines with writelines()",
                "Common pitfalls (newlines, permissions)",
                "Best practices for logging and data accumulation",
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
                  What happens if you open a file in 'a' mode, write to it, then
                  call `tell()`? Where is the pointer? What if you then read?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a program that appends to a file 10 times, then reads
                  the file. How do you read the entire file after appending
                  without closing and reopening?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why do most logging systems use append mode? What would
                  happen if a logging system used write mode instead?
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
            title="Appending Data – FAQs"
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
              "Appending is one of the most practical file operations. Students " +
              "must understand that 'w' destroys data, while 'a' preserves it. " +
              "Use the analogy of a notebook: writing ('w') is like tearing out " +
              "all the pages and starting over; appending ('a') is like adding " +
              "new pages at the end. Emphasize that logging is the primary use " +
              "case — every production system uses logs. Show them how to add " +
              "timestamps and how to handle log rotation. This is the foundation " +
              "of observability in software."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 20: Appending Data to Files · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 21 — File Pointer</p>
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

export default Topic20;