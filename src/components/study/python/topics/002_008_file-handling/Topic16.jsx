import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import readlinesBasic from "./topic16_files/readlines_basic.py?raw";
import readlinesHint from "./topic16_files/readlines_hint.py?raw";
import readlinesMemory from "./topic16_files/readlines_memory.py?raw";
import readlinesFilter from "./topic16_files/readlines_filter.py?raw";
import readlinesVsIteration from "./topic16_files/readlines_vs_iteration.py?raw";

// FAQ data
import questions from "./topic16_files/topic16_questions";

/**
 * Topic16: Reading Files using readlines()
 *
 * This component explains the readlines() method for reading all lines
 * from a file into a list, the sizehint parameter, and when to use it.
 */
const Topic16 = () => {
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
            Topic 16
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Reading Files using `readlines()`
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Reading all lines at once: convenient for small files, but beware of
          memory usage.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📚 readlines()
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📋 List of Lines
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            💾 Memory Consideration
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS readlines() ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📚</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `readlines()` Method
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readlines()</code> method
              reads all lines from a file and returns them as a <strong>list</strong>
              of strings. Each string includes its newline character.
            </p>
            <ul>
              <li>
                <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">file.readlines(sizehint=-1)</code>
              </li>
              <li>
                <strong>Return type:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">list</code> of <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">str</code> (text mode)
                or <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">list</code> of <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">bytes</code> (binary mode)
              </li>
              <li>
                <strong>Purpose:</strong> Read the entire file and return each
                line as a separate element in a list.
              </li>
              <li>
                <strong>Parameters:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">sizehint</code> (optional) —
                a hint for the number of bytes to read; used to optimize reading.
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readlines()</code> is
                <strong>not</strong> the same as <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read()</code>.
                <code>read()</code> returns a single string; <code>readlines()</code>
                returns a list of strings.
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
with open('data.txt', 'r', encoding='utf-8') as f:<br />
    lines = f.readlines()<br />
    print(f"Read {`{len(lines)}`} lines")<br />
    for line in lines:<br />
        print(line, end='')
              </code>
            </pre>
            <p>
              <strong>Key behaviors:</strong>
            </p>
            <ul>
              <li>
                <strong>Includes newlines:</strong> Each line includes its
                newline character at the end, except possibly the last line.
              </li>
              <li>
                <strong>EOF:</strong> If the file is empty, <code>readlines()</code>
                returns an empty list (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">[]</code>).
              </li>
              <li>
                <strong>Memory:</strong> Reads the <strong>entire</strong> file
                into memory. For large files, this can be problematic.
              </li>
              <li>
                <strong>Binary mode:</strong> In binary mode, returns a list of
                bytes objects, each representing a line.
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 3: THE sizehint PARAMETER ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📏</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `sizehint` Parameter
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code>sizehint</code> parameter is a <strong>hint</strong> to
              the read function about how many bytes to read. It's used for
              optimization when you want to read in chunks but still want lines.
            </p>
            <ul>
              <li>
                <strong>Purpose:</strong> Controls how much data is read from
                the file in one internal operation.
              </li>
              <li>
                <strong>Behavior:</strong> If <code>sizehint</code> is given, it
                reads approximately that many bytes from the file and returns
                the complete lines that fit in that amount.
              </li>
              <li>
                <strong>Default:</strong> If <code>sizehint</code> is negative
                or omitted, it reads the entire file.
              </li>
              <li>
                <strong>Use case:</strong> Processing very large files in chunks
                while maintaining line boundaries.
              </li>
            </ul>
            <p>
              <strong>Example:</strong>
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('large_file.txt', 'r') as f:<br />
    while True:<br />
        lines = f.readlines(8192)  # read ~8KB worth of lines<br />
        if not lines:<br />
            break<br />
        process_batch(lines)
              </code>
            </pre>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                ⚠️ Note:
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                <code>sizehint</code> is a <strong>hint</strong>, not a strict
                limit. Python may read slightly more or less than the specified
                amount to ensure complete lines are returned.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 4: MEMORY CONSIDERATIONS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">💾</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Memory Considerations
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <code>readlines()</code> loads the <strong>entire file</strong>
              into memory as a list of strings. This has important implications:
            </p>
            <ul>
              <li>
                <strong>Small files:</strong> It's fine for files that are small
                (e.g., under 10MB). It's convenient and fast.
              </li>
              <li>
                <strong>Large files:</strong> For files larger than available
                memory, it can cause <code>MemoryError</code> or slow
                performance due to swapping.
              </li>
              <li>
                <strong>Line count:</strong> The list size equals the number of
                lines in the file, plus the list overhead.
              </li>
            </ul>
            <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl">
              <p className="text-red-700 dark:text-red-300 font-medium">
                ⚠️ Warning:
              </p>
              <p className="text-red-600 dark:text-red-400 text-sm">
                For large files, <strong>never</strong> use <code>readlines()</code>
                without considering memory. Use <code>for line in f</code> or
                <code>readline()</code> in a loop instead.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 5: READLINES VS ITERATION ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              `readlines()` vs Iteration
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Aspect</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">readlines()</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">for line in f</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-medium">Memory usage</td>
                  <td className="px-6 py-4">High (loads all lines)</td>
                  <td className="px-6 py-4">Low (one line at a time)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Speed</td>
                  <td className="px-6 py-4">Fast for small files</td>
                  <td className="px-6 py-4">Similar, but lower memory</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Random access</td>
                  <td className="px-6 py-4">✅ Yes (list indexing)</td>
                  <td className="px-6 py-4">❌ No (sequential only)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Large files</td>
                  <td className="px-6 py-4">❌ Risk of MemoryError</td>
                  <td className="px-6 py-4">✅ Safe</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Recommended</td>
                  <td className="px-6 py-4">Small files only</td>
                  <td className="px-6 py-4">✅ Always</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Prefer iteration (`for line in f`) for most use cases; use `readlines()`
            only when you need a list of lines and the file is small.
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
                    Loading Student Names for Display
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A school in Shyamnagar has a small file with student names.
                    The attendance system loads all names using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readlines()</code>
                    to display them in a dropdown list. The file is small, so
                    this is appropriate.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Configuration File Parsing
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A web app in Barrackpore loads its configuration from a
                    small <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">config.ini</code>.
                    The app uses <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readlines()</code>
                    to read all lines, then parses them for key‑value pairs.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📋</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Batch Processing with sizehint
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A data processing pipeline in Naihati handles large CSV files
                    in batches. Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readlines(sizehint)</code>,
                    it reads chunks of lines (e.g., 10,000 lines at a time) to
                    process them in batches while keeping memory usage under control.
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
            The following examples demonstrate the <code>readlines()</code> method.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={readlinesBasic}
              title="Basic readlines() Usage"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readlinesHint}
              title="Using sizehint Parameter"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readlinesMemory}
              title="Memory Considerations"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readlinesFilter}
              title="Filtering and Processing"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readlinesVsIteration}
              title="readlines() vs Iteration"
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
                title: "Use readlines() only for small files",
                desc: "If the file is larger than a few MB, use iteration.",
              },
              {
                title: "Strip newlines with list comprehension",
                desc: "`lines = [line.rstrip('\\n') for line in f.readlines()]`",
              },
              {
                title: "Use sizehint for batch processing",
                desc: "Read chunks of lines without loading the entire file.",
              },
              {
                title: "Check file size before using readlines()",
                desc: "Use `os.path.getsize()` to estimate memory usage.",
              },
              {
                title: "Convert to list of stripped lines",
                desc: "`lines = [line.strip() for line in f.readlines()]`",
              },
              {
                title: "Use readlines() with `with` for automatic close",
                desc: "Always use context managers.",
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
                mistake: "Using readlines() on huge files, causing MemoryError",
                fix: "Use `for line in f` or read in chunks with sizehint.",
              },
              {
                mistake: "Forgetting that lines include newlines",
                fix: "Use `rstrip('\\n')` or `strip()` when comparing.",
              },
              {
                mistake: "Assuming readlines() returns a string",
                fix: "It returns a list; use indexing to access lines.",
              },
              {
                mistake: "Not handling empty files (returns [])",
                fix: "Check `if not lines:` before processing.",
              },
              {
                mistake: "Using readlines() and then modifying the file",
                fix: "The file is closed after the `with` block; modify after.",
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
                    Use readlines() only for small files:
                  </strong>{" "}
                  If you need random access to lines and the file is small, it's fine.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Prefer iteration for large files:
                  </strong>{" "}
                  <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">for line in f</code> is
                  memory‑efficient and safer.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use sizehint for batch processing:
                  </strong>{" "}
                  When you need to process lines in batches, use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readlines(sizehint)</code>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Strip newlines when processing:
                  </strong>{" "}
                  Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">rstrip('\n')</code> to
                  clean lines before processing.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Check file size before using readlines():
                  </strong>{" "}
                  Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.path.getsize()</code>
                  to estimate memory usage.
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
                "The `readlines()` method and its return type",
                "How `readlines()` differs from `read()` and `readline()`",
                "The `sizehint` parameter and its purpose",
                "Memory considerations when using `readlines()`",
                "When to use `readlines()` vs iteration",
                "How to strip newlines from the returned lines",
                "Common pitfalls and how to avoid them",
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
                  If a file has 1 million lines, how much memory would
                  <code>readlines()</code> use? What about the list overhead?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a program that reads a file with <code>readlines()</code>,
                  then processes each line. Compare the memory usage with the
                  iteration approach using <code>memory_profiler</code>.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why might a web server need to read a configuration file with
                  <code>readlines()</code> instead of iterating? What's the
                  trade‑off?
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
            title="Reading with readlines() – FAQs"
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
              "`readlines()` is convenient but dangerous for beginners because " +
              "they often use it without considering memory. Use the analogy of " +
              "a book: reading the whole book into memory is fine for a short " +
              "story but not for an encyclopedia. Emphasize that `for line in f` " +
              "is the safer default. However, `readlines()` has its place for " +
              "small config files, headers, or when random access to lines is " +
              "needed. Show them how to use `sizehint` for batch processing and " +
              "explain the list overhead."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 16: Reading Files using readlines() · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 17 — Reading Files Line by Line</p>
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

export default Topic16;