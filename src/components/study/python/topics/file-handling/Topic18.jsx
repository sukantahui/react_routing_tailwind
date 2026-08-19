import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import writeBasic from "./topic18_files/write_basic.py?raw";
import writeMultiple from "./topic18_files/write_multiple.py?raw";
import writeReturnValue from "./topic18_files/write_return_value.py?raw";
import writeAppend from "./topic18_files/write_append.py?raw";
import writeErrors from "./topic18_files/write_errors.py?raw";
import writeFormatting from "./topic18_files/write_formatting.py?raw";

// FAQ data
import questions from "./topic18_files/topic18_questions";

/**
 * Topic18: Writing Files using write()
 *
 * This component explains the write() method for writing strings to files,
 * its return value, and best practices for file writing.
 */
const Topic18 = () => {
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
            Topic 18
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Writing Files using `write()`
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          The fundamental way to write text to files: understanding the `write()`
          method and its behavior.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ✍️ write()
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📝 String
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔢 Return Value
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS write() ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">✍️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `write()` Method
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">write()</code> method is
              the primary way to write <strong>text data</strong> to a file. It
              writes a string to the file at the current file pointer position.
            </p>
            <ul>
              <li>
                <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">file.write(string)</code>
              </li>
              <li>
                <strong>Return type:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">int</code> —
                the number of characters written.
              </li>
              <li>
                <strong>Purpose:</strong> Write a string to the file.
              </li>
              <li>
                <strong>Parameters:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">string</code> —
                the text to write (must be a string in text mode).
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">write()</code> does
                <strong>not</strong> automatically add a newline. You must include
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">\n</code> explicitly if
                you want to end the line.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 2: SYNTAX AND BEHAVIOR ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📝</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Syntax and Behavior
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong>Basic usage:</strong>
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('output.txt', 'w', encoding='utf-8') as f:<br />
    f.write("Hello, World!")<br />
    f.write("This is a second line.")  # No newline!
              </code>
            </pre>
            <p>
              <strong>Key behaviors:</strong>
            </p>
            <ul>
              <li>
                <strong>No automatic newline:</strong> You must include
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">\n</code> in the string
                to create line breaks.
              </li>
              <li>
                <strong>Return value:</strong> Returns the number of characters
                written (not bytes).
              </li>
              <li>
                <strong>Overwrites:</strong> In <code>'w'</code> mode, the file
                is truncated (emptied) before writing.
              </li>
              <li>
                <strong>Append:</strong> In <code>'a'</code> mode, writes are
                added to the end of the file.
              </li>
              <li>
                <strong>Buffer:</strong> Data may not be written to disk
                immediately; use <code>flush()</code> or <code>close()</code>
                to ensure it's written.
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 3: RETURN VALUE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔢</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Return Value (Number of Characters)
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code>write()</code> method returns the number of characters
              written. This can be useful for verification.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('output.txt', 'w', encoding='utf-8') as f:<br />
    chars_written = f.write("Hello, Swadeep!\n")<br />
    print(f"Wrote {`{chars_written}`} characters")  # 16 (includes newline)
              </code>
            </pre>
            <ul>
              <li>
                <strong>Text mode:</strong> Returns the number of
                <strong>characters</strong> (not bytes).
              </li>
              <li>
                <strong>Binary mode:</strong> Returns the number of
                <strong>bytes</strong> written.
              </li>
              <li>
                <strong>Use case:</strong> Useful for confirming how much data
                was written, especially when the write may be truncated due to
                errors.
              </li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                💡 Note:
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                In practice, you rarely need the return value of <code>write()</code>
                unless you're debugging or working with low‑level I/O.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 4: WRITING WITH NEWLINES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">↩️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Writing with Newlines
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Since <code>write()</code> doesn't add newlines automatically, you
              need to include them explicitly.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('lines.txt', 'w', encoding='utf-8') as f:<br />
    f.write("Line 1\n")<br />
    f.write("Line 2\n")<br />
    f.write("Line 3")  # No newline at the end
              </code>
            </pre>
            <p>
              <strong>Common patterns:</strong>
            </p>
            <ul>
              <li>
                Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">\n</code> inside the string.
              </li>
              <li>
                Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">f"{`{line}`}\n"</code> for
                formatted strings.
              </li>
              <li>
                Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">+ "\n"</code> to append.
              </li>
              <li>
                For writing multiple lines, consider <code>writelines()</code>.
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 5: WRITING VS APPENDING ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Writing ('w') vs Appending ('a')
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Aspect</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">'w' (write)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">'a' (append)</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-medium">Existing content</td>
                  <td className="px-6 py-4">❌ Destroyed (truncated)</td>
                  <td className="px-6 py-4">✅ Preserved</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Write position</td>
                  <td className="px-6 py-4">Start of file</td>
                  <td className="px-6 py-4">End of file</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Creates if missing?</td>
                  <td className="px-6 py-4">✅ Yes</td>
                  <td className="px-6 py-4">✅ Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Use case</td>
                  <td className="px-6 py-4">Creating new files, overwriting</td>
                  <td className="px-6 py-4">Logs, adding records</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Choose 'w' when you want to start fresh; choose 'a' when you want to preserve history.
          </p>
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
                    Generating Student Report Cards
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A school in Barrackpore generates report cards for students.
                    Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">write()</code>, they
                    create a text file for each student with their marks and
                    comments, formatting each line with newlines.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Exporting Data from a Database
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A data analyst in Shyamnagar exports query results to a
                    text file. Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">write()</code>
                    in a loop, they format each row as a line with tab‑separated
                    values.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Logging Application Events
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A mobile app in Naihati writes debug logs to a file using
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">write()</code> with
                    timestamped entries. The log file is appended to rather than
                    overwritten.
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
            The following examples demonstrate the <code>write()</code> method.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={writeBasic}
              title="Basic write() Usage"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={writeMultiple}
              title="Writing Multiple Lines"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={writeReturnValue}
              title="Understanding the Return Value"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={writeAppend}
              title="Writing vs Appending"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={writeErrors}
              title="Handling Write Errors"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={writeFormatting}
              title="Formatting Output with write()"
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
                title: "Always include newlines explicitly",
                desc: "`write()` doesn't add them; use `\\n` for line breaks.",
              },
              {
                title: "Use `with` for automatic closure",
                desc: "Ensures the file is closed and data is flushed.",
              },
              {
                title: "Use f‑strings for formatted output",
                desc: "`f.write(f'Name: {name}, Score: {score}\\n')`",
              },
              {
                title: "Combine writes with `join()` for efficiency",
                desc: "`f.write('\\n'.join(lines))` writes all lines at once.",
              },
              {
                title: "Check return value for debugging",
                desc: "The number of characters written can help detect truncation.",
              },
              {
                title: "Use 'a' mode for logs",
                desc: "Appending preserves history; overwriting destroys it.",
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
                mistake: "Forgetting to add newline characters",
                fix: "Always include `\\n` when you want a line break.",
              },
              {
                mistake: "Using 'w' mode when you meant 'a' (losing data)",
                fix: "Double‑check the mode: 'w' overwrites, 'a' appends.",
              },
              {
                mistake: "Not using `with`, causing resource leaks",
                fix: "Always use `with open()` for file operations.",
              },
              {
                mistake: "Writing non‑string data (TypeError)",
                fix: "Convert non‑strings to strings with `str()` or f‑strings.",
              },
              {
                mistake: "Assuming write() flushes to disk immediately",
                fix: "Call `flush()` or `close()` to ensure data is written.",
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
                    Always use `with` for file writing:
                  </strong>{" "}
                  It ensures the file is closed and data is flushed.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use 'w' mode only when you want to overwrite:
                  </strong>{" "}
                  For logs and append‑only data, use 'a' instead.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Always specify encoding for text files:
                  </strong>{" "}
                  Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">encoding='utf-8'</code>
                  to avoid platform‑dependent issues.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Format output with f‑strings:
                  </strong>{" "}
                  They make the code readable and the output consistent.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Handle write errors gracefully:
                  </strong>{" "}
                  Catch <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">PermissionError</code>,
                  <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">OSError</code>, etc.
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
                "The `write()` method and its syntax",
                "That `write()` does not add newlines automatically",
                "The return value (number of characters written)",
                "The difference between 'w' and 'a' modes",
                "How to format output with `write()`",
                "Common pitfalls and how to avoid them",
                "Best practices for writing files",
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
                  What happens to the file content if you call `write()` twice
                  without a newline? Try it and see the result.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a program that writes 10 lines to a file using `write()`.
                  Compare the output when you include `\n` vs when you don't.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why might `write()` return a number different from the length
                  of the string you passed? What could cause this?
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
            title="Writing with write() – FAQs"
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
              "The `write()` method is the foundation of file output. Students " +
              "must internalize that it does NOT add newlines automatically. " +
              "This is the #1 beginner mistake. Use the analogy of a typewriter: " +
              "you have to press Enter yourself. Emphasize the difference between " +
              "overwriting ('w') and appending ('a'). Also, demonstrate the return " +
              "value — it's often overlooked but useful for verifying writes. " +
              "Encourage them to always use `with` for automatic flushing and closure."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 18: Writing Files using write() · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 19 — Writing Multiple Lines using writelines()</p>
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

export default Topic18;