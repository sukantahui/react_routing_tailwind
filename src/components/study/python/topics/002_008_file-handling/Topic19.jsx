import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import writelinesBasic from "./topic19_files/writelines_basic.py?raw";
import writelinesNoNewline from "./topic19_files/writelines_no_newline.py?raw";
import writelinesPerformance from "./topic19_files/writelines_performance.py?raw";
import writelinesFromGenerator from "./topic19_files/writelines_from_generator.py?raw";
import writelinesVsWrite from "./topic19_files/writelines_vs_write.py?raw";

// FAQ data
import questions from "./topic19_files/topic19_questions";

/**
 * Topic19: Writing Multiple Lines using writelines()
 *
 * This component explains the writelines() method, which writes a list
 * (or any iterable) of strings to a file, without adding newlines automatically.
 */
const Topic19 = () => {
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
            Topic 19
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Writing Multiple Lines using `writelines()`
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Efficiently writing many lines at once: the `writelines()` method and
          its proper usage.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📝 writelines()
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📋 List of Lines
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ⚡ Performance
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS writelines() ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📝</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `writelines()` Method
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">writelines()</code> method
              writes a <strong>list</strong> (or any iterable) of strings to a
              file. It's the counterpart to <code>readlines()</code>.
            </p>
            <ul>
              <li>
                <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">file.writelines(lines)</code>
              </li>
              <li>
                <strong>Return type:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">None</code>
              </li>
              <li>
                <strong>Purpose:</strong> Write multiple strings to the file in
                a single call, which can be more efficient than multiple
                <code>write()</code> calls.
              </li>
              <li>
                <strong>Parameters:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">lines</code> —
                an iterable of strings (list, tuple, generator, etc.).
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">writelines()</code> does
                <strong>not</strong> add newlines automatically. You must include
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">\n</code> in each string
                if you want each line to be on its own line.
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
lines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]<br />
with open('output.txt', 'w', encoding='utf-8') as f:<br />
    f.writelines(lines)
              </code>
            </pre>
            <p>
              <strong>Key behaviors:</strong>
            </p>
            <ul>
              <li>
                <strong>No automatic newline:</strong> You must include
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">\n</code> in each
                string; otherwise, all lines will be concatenated.
              </li>
              <li>
                <strong>Accepts any iterable:</strong> Not just lists — tuples,
                generators, or any iterable of strings.
              </li>
              <li>
                <strong>Return value:</strong> Returns <code>None</code>. Unlike
                <code>write()</code>, it doesn't return the number of characters.
              </li>
              <li>
                <strong>Buffering:</strong> The data is buffered; call
                <code>flush()</code> or close the file to ensure writing.
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 3: WRITELINES VS WRITE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              `writelines()` vs `write()`
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Aspect</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">write()</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">writelines()</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-medium">Input</td>
                  <td className="px-6 py-4">Single string</td>
                  <td className="px-6 py-4">Iterable of strings</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Return value</td>
                  <td className="px-6 py-4">int (chars written)</td>
                  <td className="px-6 py-4">None</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Newline added</td>
                  <td className="px-6 py-4">No</td>
                  <td className="px-6 py-4">No</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Efficiency</td>
                  <td className="px-6 py-4">Slower for many lines</td>
                  <td className="px-6 py-4">Faster for many lines</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Use case</td>
                  <td className="px-6 py-4">Single or few writes</td>
                  <td className="px-6 py-4">Many lines, batch writes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Use `writelines()` when you already have a list of lines; use `write()` for single strings.
          </p>
        </section>

        {/* ====== SECTION 4: PERFORMANCE BENEFITS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚡</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Performance Benefits
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <code>writelines()</code> can be significantly faster when writing
              many lines because it reduces the number of Python method calls
              and allows the underlying C implementation to handle the data more
              efficiently.
            </p>
            <ul>
              <li>
                <strong>Fewer calls:</strong> One <code>writelines()</code> call
                replaces many <code>write()</code> calls.
              </li>
              <li>
                <strong>Bulk I/O:</strong> The data is written in a single
                (or fewer) system calls.
              </li>
              <li>
                <strong>Buffer efficiency:</strong> The buffer is filled more
                efficiently with larger chunks.
              </li>
            </ul>
            <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded-r-xl">
              <p className="text-green-700 dark:text-green-300 font-medium">
                💡 Pro Tip:
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm">
                For writing thousands of lines, <code>writelines()</code> is the
                clear winner. For a few lines, the difference is negligible.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 5: WORKING WITH GENERATORS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Using `writelines()` with Generators
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <code>writelines()</code> accepts any <strong>iterable</strong>,
              including generators. This is memory‑efficient for very large
              datasets because lines are generated on the fly, not stored in a
              list.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
def generate_lines(n):<br />
    for i in range(n):<br />
        yield f"Line {`{i}`}\\n"<br /><br />
with open('output.txt', 'w', encoding='utf-8') as f:<br />
    f.writelines(generate_lines(1000000))
              </code>
            </pre>
            <ul>
              <li>
                <strong>Memory efficient:</strong> No large list is created.
              </li>
              <li>
                <strong>Streaming:</strong> Lines are generated and written
                incrementally.
              </li>
              <li>
                <strong>Scalable:</strong> Works for files of any size.
              </li>
            </ul>
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
                    Exporting Marksheet
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A school in Barrackpore exports student marks to a CSV file.
                    The data is stored as a list of strings, each representing a
                    row. Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">writelines()</code>,
                    the school writes hundreds of rows efficiently in one call.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Generating Report Files
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A data analyst in Shyamnagar generates a report containing
                    thousands of lines. The report lines are built in a list,
                    then written to a file using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">writelines()</code>
                    for better performance.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Log File Rotation
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A mobile app in Naihati rotates logs by writing all buffered
                    log entries to a new file using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">writelines()</code>.
                    This ensures minimal disruption and fast flushing of the
                    buffer.
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
            The following examples demonstrate the <code>writelines()</code> method.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={writelinesBasic}
              title="Basic writelines() Usage"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={writelinesNoNewline}
              title="The Importance of Newlines"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={writelinesPerformance}
              title="Performance Comparison"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={writelinesFromGenerator}
              title="Using Generators (Memory Efficient)"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={writelinesVsWrite}
              title="writelines() vs write() Side by Side"
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
                title: "Always include newlines",
                desc: "`writelines()` does not add them; use `\\n` in each string.",
              },
              {
                title: "Use list comprehension to add newlines",
                desc: "`lines = [f'{line}\\n' for line in data]`",
              },
              {
                title: "Use generators for large datasets",
                desc: "Avoid storing all lines in memory; yield them.",
              },
              {
                title: "Combine with `with` for safe writing",
                desc: "Always use `with open() as f:` to ensure flushing.",
              },
              {
                title: "Benchmark for performance",
                desc: "For small lists, the difference is minimal.",
              },
              {
                title: "Use `join()` for a single string",
                desc: "If you have a list and want a single string, use `'\\n'.join(lines)`.",
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
                mistake: "Forgetting newlines (all lines concatenate)",
                fix: "Ensure each string ends with `\\n`.",
              },
              {
                mistake: "Passing a single string (not an iterable)",
                fix: "Pass a list or tuple of strings.",
              },
              {
                mistake: "Using `writelines()` with a generator that's exhausted",
                fix: "Generators can only be iterated once; recreate if needed.",
              },
              {
                mistake: "Not closing the file (or using `with`)",
                fix: "Always use `with` to ensure flushing.",
              },
              {
                mistake: "Assuming `writelines()` returns the count",
                fix: "It returns `None`; check the file size separately.",
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
                    Use `writelines()` when you have a list of strings:
                  </strong>{" "}
                  It's more efficient than multiple `write()` calls.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Always include newlines in each string:
                  </strong>{" "}
                  `writelines()` does not add them automatically.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use generators for memory efficiency:
                  </strong>{" "}
                  Generate lines on the fly for huge files.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Prefer `write()` for single lines:
                  </strong>{" "}
                  It's simpler and returns a count.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Always use `with` for automatic closure:
                  </strong>{" "}
                  Ensures data is flushed even on exceptions.
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
                "The `writelines()` method and its syntax",
                "That `writelines()` does not add newlines automatically",
                "The performance benefits over multiple `write()` calls",
                "How to use `writelines()` with generators",
                "The difference between `write()` and `writelines()`",
                "Common pitfalls (missing newlines, return value)",
                "Best practices for using `writelines()`",
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
                  What happens if you pass a list of strings without newlines to
                  `writelines()`? Try it and see the result.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a program that uses `writelines()` with a generator that
                  yields 1 million lines. How does the memory usage compare to
                  using a list?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why does `writelines()` return `None` instead of a count like
                  `write()`? When would you need the count?
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
            title="writelines() – FAQs"
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
              "`writelines()` is often misunderstood because of its name. It " +
              "doesn't add newlines, so students are surprised when all their " +
              "lines are concatenated. Emphasize this with clear examples. " +
              "Show the performance difference with large lists; this drives " +
              "home the efficiency gains. Also, introduce generators as a " +
              "memory‑efficient way to feed `writelines()`. The return value " +
              "difference (`None` vs int) is a minor point but worth noting."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 19: Writing Multiple Lines using writelines() · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 20 — Appending Data to Files</p>
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

export default Topic19;