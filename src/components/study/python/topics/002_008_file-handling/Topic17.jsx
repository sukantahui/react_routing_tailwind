import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import forLoop from "./topic17_files/for_loop.py?raw";
import whileReadline from "./topic17_files/while_readline.py?raw";
import walrusOperator from "./topic17_files/walrus_operator.py?raw";
import lineProcessing from "./topic17_files/line_processing.py?raw";
import largeFileProcessing from "./topic17_files/large_file_processing.py?raw";
import methodComparison from "./topic17_files/method_comparison.py?raw";

// FAQ data
import questions from "./topic17_files/topic17_questions";

/**
 * Topic17: Reading Files Line by Line
 *
 * This component explains the various ways to read files line by line,
 * comparing approaches, and best practices for efficient processing.
 */
const Topic17 = () => {
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
            Topic 17
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Reading Files Line by Line
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Efficiently processing text files one line at a time — the cornerstone
          of memory‑efficient file handling.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔄 for line in f
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📖 readline()
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            💾 Memory Efficient
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHY LINE-BY-LINE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🤔</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why Read Files Line by Line?
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Reading files line by line is one of the most common operations in
              Python programming. It's the <strong>memory‑efficient</strong> way
              to process text files, especially when they are large.
            </p>
            <ul>
              <li>
                <strong>Memory efficiency:</strong> Only one line is loaded into
                memory at a time.
              </li>
              <li>
                <strong>Streaming:</strong> You can process data as it arrives,
                without waiting for the entire file to load.
              </li>
              <li>
                <strong>Flexibility:</strong> You can stop processing at any
                point, skip lines, or conditionally process.
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Line‑by‑line reading is the foundation of <strong>streaming
                processing</strong>. It's used in everything from log analysis
                to ETL pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 2: METHODS COMPARISON ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Three Ways to Read Line by Line
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Method</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Code</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Memory</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Control</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Pythonic</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Recommended</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-medium">for loop</td>
                  <td className="px-6 py-4 font-mono text-xs">for line in f:</td>
                  <td className="px-6 py-4">✅ Low</td>
                  <td className="px-6 py-4">Basic</td>
                  <td className="px-6 py-4">✅ Most</td>
                  <td className="px-6 py-4">✅ Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">readline() loop</td>
                  <td className="px-6 py-4 font-mono text-xs">while line := f.readline():</td>
                  <td className="px-6 py-4">✅ Low</td>
                  <td className="px-6 py-4">Full</td>
                  <td className="px-6 py-4">OK</td>
                  <td className="px-6 py-4">⚠️ Sometimes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">readlines()</td>
                  <td className="px-6 py-4 font-mono text-xs">for line in f.readlines():</td>
                  <td className="px-6 py-4">❌ High</td>
                  <td className="px-6 py-4">Full</td>
                  <td className="px-6 py-4">❌ No</td>
                  <td className="px-6 py-4">❌ Small files only</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            The `for line in f` approach is the most Pythonic and recommended for most use cases.
          </p>
        </section>

        {/* ====== SECTION 3: THE FOR LOOP APPROACH ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `for line in f` Approach
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <strong>most Pythonic</strong> way to read a file line by line
              is using a <code>for</code> loop directly on the file object.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('data.txt', 'r', encoding='utf-8') as f:<br />
    for line in f:<br />
        process(line)
              </code>
            </pre>
            <ul>
              <li>
                <strong>Simple and readable:</strong> The intent is clear.
              </li>
              <li>
                <strong>Memory efficient:</strong> Lines are read lazily.
              </li>
              <li>
                <strong>Automatic EOF handling:</strong> The loop stops when EOF
                is reached.
              </li>
              <li>
                <strong>No manual pointer management:</strong> The iterator
                handles everything.
              </li>
            </ul>
            <p>
              This is the recommended approach for <strong>99% of use cases</strong>.
            </p>
          </div>
        </section>

        {/* ====== SECTION 4: THE readline() APPROACH ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📖</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `readline()` Approach
          </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Using <code>readline()</code> in a <code>while</code> loop gives
              you <strong>precise control</strong> over the reading process.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('data.txt', 'r', encoding='utf-8') as f:<br />
    while True:<br />
        line = f.readline()<br />
        if not line:  # EOF<br />
            break<br />
        process(line)
              </code>
            </pre>
            <ul>
              <li>
                <strong>Full control:</strong> You can pause, skip, or conditionally
                read lines.
              </li>
              <li>
                <strong>Explicit EOF handling:</strong> You see exactly when EOF
                is reached.
              </li>
              <li>
                <strong>Supports the <code>size</code> parameter:</strong> You can
                read partial lines if needed.
              </li>
              <li>
                <strong>More verbose:</strong> More code than the <code>for</code>
                loop approach.
              </li>
            </ul>
            <p>
              This is useful when you need <strong>fine‑grained control</strong>,
              such as reading a specific number of lines or handling complex
              parsing.
            </p>
          </div>
        </section>

        {/* ====== SECTION 5: THE WALRUS OPERATOR ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🦭</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Walrus Operator (Python 3.8+)
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Python 3.8 introduced the <strong>walrus operator</strong> (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">:=</code>),
              which allows you to assign and test in a single expression.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('data.txt', 'r', encoding='utf-8') as f:<br />
    while line := f.readline():<br />
        process(line)
              </code>
            </pre>
            <ul>
              <li>
                <strong>Concise:</strong> Combines assignment and condition.
              </li>
              <li>
                <strong>Readable:</strong> Clear intent for line‑by‑line reading.
              </li>
              <li>
                <strong>Pythonic:</strong> The modern way to write readline loops.
              </li>
              <li>
                <strong>Requires Python 3.8+:</strong> Not available in older
                versions.
              </li>
            </ul>
            <p>
              This is the <strong>recommended way</strong> to use <code>readline()</code>
              in modern Python (3.8+).
            </p>
          </div>
        </section>

        {/* ====== SECTION 6: PROCESSING LINES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Processing Lines Effectively
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              When reading line by line, you can perform various processing
              operations:
            </p>
            <ul>
              <li>
                <strong>Strip newlines:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">line.rstrip('\n')</code>
              </li>
              <li>
                <strong>Skip empty lines:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">if not line.strip(): continue</code>
              </li>
              <li>
                <strong>Filter lines:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">if 'error' in line: process(line)</code>
              </li>
              <li>
                <strong>Parse CSV:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">fields = line.split(',')</code>
              </li>
              <li>
                <strong>Accumulate data:</strong> Build aggregates as you read.
              </li>
            </ul>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('data.log', 'r', encoding='utf-8') as f:<br />
    error_count = 0<br />
    for line in f:<br />
        if not line.strip():<br />
            continue  # skip empty lines<br />
        if 'ERROR' in line:<br />
            error_count += 1<br />
            print(f"Error: {`{line.strip()}`}")<br />
    print(f"Total errors: {`{error_count}`}")
              </code>
            </pre>
          </div>
        </section>

        {/* ====== SECTION 7: REAL-WORLD SCENARIOS ====== */}
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
                    Server Log Analysis
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A system administrator in Barrackpore monitors a web server
                    log file. Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">for line in f</code>,
                    they process each line, counting 404 errors and extracting
                    IP addresses — all without loading the entire log into memory.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📋</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    CSV Data Import
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A school in Naihati imports student data from a CSV file.
                    Using line‑by‑line reading, they skip the header, then
                    process each row to add students to the database, handling
                    one row at a time.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Real‑time Sensor Data
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    An IoT device in Shyamnagar writes sensor readings to a file.
                    A processing script tails the file (using line‑by‑line reading),
                    processing each new reading as it's appended.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SECTION 8: PYTHON CODE EXAMPLES ====== */}
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
            The following examples demonstrate line‑by‑line reading techniques.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={forLoop}
              title="For Loop (Recommended)"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={whileReadline}
              title="while True with readline()"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={walrusOperator}
              title="Walrus Operator (Python 3.8+)"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={lineProcessing}
              title="Processing Lines with Filters"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={largeFileProcessing}
              title="Processing Large Files"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={methodComparison}
              title="Method Comparison"
              highlightLines={[]}
            />
          </div>
        </section>

        {/* ====== SECTION 9: TIPS & TRICKS ====== */}
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
                title: "Use `for line in f` for simplicity",
                desc: "It's the most Pythonic and readable approach.",
              },
              {
                title: "Strip newlines with `rstrip('\\n')`",
                desc: "Use this to remove newlines while preserving other whitespace.",
              },
              {
                title: "Skip empty lines with `if not line.strip(): continue`",
                desc: "This handles blank lines gracefully.",
              },
              {
                title: "Use `enumerate(f)` to count lines",
                desc: "`for i, line in enumerate(f, 1):` gives line numbers.",
              },
              {
                title: "Add line numbers for debugging",
                desc: "Include line numbers when printing errors.",
              },
              {
                title: "Use `with` for automatic file closure",
                desc: "Never forget to close the file.",
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

        {/* ====== SECTION 10: COMMON MISTAKES ====== */}
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
                mistake: "Forgetting to strip newlines before processing",
                fix: "Use `line.rstrip('\\n')` or `line.strip()`.",
              },
              {
                mistake: "Infinite loop with while True (no break)",
                fix: "Always check `if not line: break`.",
              },
              {
                mistake: "Using `readlines()` on large files",
                fix: "Use `for line in f` instead.",
              },
              {
                mistake: "Modifying the file while iterating over it",
                fix: "Read the file, process, then write separately.",
              },
              {
                mistake: "Not handling empty files",
                fix: "The loop handles empty files gracefully.",
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

        {/* ====== SECTION 11: BEST PRACTICES ====== */}
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
                    Use `for line in f` as the default:
                  </strong>{" "}
                  It's the most Pythonic and safe approach.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Always strip newlines when comparing:
                  </strong>{" "}
                  Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">line.rstrip('\n')</code>
                  for consistent comparisons.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Handle empty lines explicitly:
                  </strong>{" "}
                  Decide whether to skip or process blank lines.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `with` for automatic closure:
                  </strong>{" "}
                  Always use context managers.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Test with representative files:
                  </strong>{" "}
                  Ensure your code handles empty lines, large files, and special characters.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 12: MINI CHECKLIST ====== */}
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
                "Why line‑by‑line reading is memory‑efficient",
                "The three main approaches: for loop, readline(), walrus",
                "Which approach is recommended for most use cases",
                "How to strip newlines and handle empty lines",
                "When to use each approach",
                "Common pitfalls and how to avoid them",
                "Best practices for processing lines",
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

        {/* ====== SECTION 13: HINT SECTION ====== */}
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
                  If you use <code>for line in f</code>, how does Python know
                  when to stop? What's happening behind the scenes?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a program that reads a file line by line and counts the
                  number of lines, words, and characters. How does it compare to
                  using <code>read()</code> for the same task?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  A log file is being written to continuously. How would you
                  write a script that "tails" the file, processing new lines as
                  they are appended?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SECTION 14: FAQ ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <FAQTemplate
            title="Line by Line Reading – FAQs"
            questions={questions}
          />
        </section>

        {/* ====== SECTION 15: TEACHER'S NOTE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <Teacher
            note={
              "Line‑by‑line reading is arguably the most important file handling " +
              "pattern. Students must internalize `for line in f` as the default. " +
              "Use the analogy of a conveyor belt: items (lines) come one at a time, " +
              "and you process each as it arrives. Emphasize the memory efficiency " +
              "— this is what enables processing files larger than RAM. Also, " +
              "show them the walrus operator as a modern improvement, but ensure " +
              "they understand the traditional `while True` pattern for compatibility."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 17: Reading Files Line by Line · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 18 — Writing Files using write()</p>
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

export default Topic17;