import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import withOpen from "./topic12_files/with_open.py?raw";
import withMultiple from "./topic12_files/with_multiple.py?raw";
import withException from "./topic12_files/with_exception.py?raw";
import customContext from "./topic12_files/custom_context.py?raw";
import withoutWith from "./topic12_files/without_with.py?raw";

// FAQ data
import questions from "./topic12_files/topic12_questions";

/**
 * Topic12: Using with open() as file
 *
 * This component explains the 'with' statement for file handling,
 * the context manager protocol, and why it's the preferred way.
 */
const Topic12 = () => {
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
            Topic 12
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Using `with open() as file`
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          The Pythonic way to handle files: safe, concise, and automatic cleanup.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔄 with
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📦 Context Manager
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔒 Automatic Close
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS WITH ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `with` Statement
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with</code> statement in
              Python is a <strong>context manager</strong> that simplifies
              resource management. For files, it ensures that the file is
              <strong>automatically closed</strong> when the block of code
              finishes — even if an exception occurs.
            </p>
            <p>
              <strong>Basic syntax:</strong>
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('file.txt', 'r') as file:<br />
    content = file.read()<br />
# 'file' is automatically closed here
              </code>
            </pre>
            <ul>
              <li>
                <strong>Safe:</strong> Guarantees cleanup, even with exceptions.
              </li>
              <li>
                <strong>Readable:</strong> Clearly indicates the resource's scope.
              </li>
              <li>
                <strong>Pythonic:</strong> The preferred way to handle files and
                other resources (locks, network connections, etc.).
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with</code> statement
                is <em>syntactic sugar</em> for <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">try‑finally</code>,
                but more concise and less error‑prone.
              </p>
            </div>
          </div>

          {/* SVG: with statement flow */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 180" className="w-full max-w-3xl h-auto">
                <text x="350" y="25" textAnchor="middle" fill="#6B7280" fontSize="14">How `with` Works</text>

                <rect x="50" y="40" width="600" height="120" rx="12" fill="#3B82F6" fillOpacity="0.05" stroke="#3B82F6" strokeWidth="1.5" />

                <text x="350" y="70" textAnchor="middle" fill="#60A5FA" fontSize="15">with open('file.txt', 'r') as f:</text>

                <rect x="80" y="85" width="540" height="30" rx="6" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1.5" />
                <text x="350" y="105" textAnchor="middle" fill="#34D399" fontSize="14">    content = f.read()  # work with file</text>

                <text x="350" y="140" textAnchor="middle" fill="#F87171" fontSize="14">← File automatically closed here</text>
                <line x1="200" y1="145" x2="350" y2="140" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="500" y1="145" x2="350" y2="140" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />

                <text x="350" y="170" textAnchor="middle" fill="#6B7280" fontSize="12">Even if an exception occurs, the file is closed</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              The `with` block guarantees the file is closed when the block exits.
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: CONTEXT MANAGER PROTOCOL ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📦</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Context Manager Protocol
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with</code> statement
              works with objects that implement the <strong>context manager
              protocol</strong>, which consists of two methods:
            </p>
            <ul>
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">__enter__()</code> —
                Called when entering the `with` block. Returns the resource
                (e.g., file object).
              </li>
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">__exit__()</code> —
                Called when exiting the `with` block. Handles cleanup (e.g.,
                closing the file).
              </li>
            </ul>
            <p>
              When you write <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with open('file.txt') as f</code>,
              Python calls <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">open()</code>,
              which returns a file object that has <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">__enter__()</code> and
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">__exit__()</code> methods.
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">__exit__()</code> calls
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">close()</code>.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800/50 mt-4">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              💡 <strong>Note:</strong> You don't need to implement these
              methods yourself for files — they are already built in. But you
              can create your own context managers for other resources.
            </p>
          </div>
        </section>

        {/* ====== SECTION 3: WITH vs MANUAL CLOSE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              `with` vs Manual `close()`
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Aspect</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Manual close()</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">with statement</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-medium">Guaranteed closure</td>
                  <td className="px-6 py-4">❌ Only if you remember</td>
                  <td className="px-6 py-4">✅ Always</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Exception safety</td>
                  <td className="px-6 py-4">❌ Requires try-finally</td>
                  <td className="px-6 py-4">✅ Built-in</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Readability</td>
                  <td className="px-6 py-4">Less clear</td>
                  <td className="px-6 py-4">More readable</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Scope</td>
                  <td className="px-6 py-4">File object persists</td>
                  <td className="px-6 py-4">File object scoped to block</td>
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
            The `with` statement is safer, cleaner, and more Pythonic.
          </p>
        </section>

        {/* ====== SECTION 4: MULTIPLE FILES WITH WITH ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📚</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Handling Multiple Files
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              You can open multiple files in a single <code>with</code>
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
              This is a common pattern for copying files or transforming data.
            </p>
            <p>
              Alternatively, you can nest <code>with</code> statements for
              clarity, especially when the files have different purposes.
            </p>
          </div>
        </section>

        {/* ====== SECTION 5: EXCEPTION HANDLING ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🛡️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Exception Handling with `with`
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code>with</code> statement automatically handles exceptions
              gracefully. If an exception occurs inside the block, the file is
              still closed before the exception propagates.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
try:<br />
    with open('data.txt', 'r') as f:<br />
        data = f.read()<br />
        # This exception doesn't prevent closing<br />
        raise ValueError("Simulated error")<br />
except ValueError:<br />
    print("Exception caught; file was already closed.")
              </code>
            </pre>
            <p>
              This is why <code>with</code> is so powerful — it ensures
              resources are released even in the face of errors.
            </p>
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
                    School Attendance System
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school in Shyamnagar uses a script to record attendance
                    daily. It opens a CSV file with <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with</code>,
                    appends today's records, and automatically closes — even if
                    the network goes down during the operation.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Data Processing Pipeline
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A data processing script in Naihati reads a large CSV,
                    transforms it, and writes a new file. Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with</code>
                    for both input and output ensures both files are closed,
                    preventing resource leaks in a long‑running pipeline.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Mobile App Config Loader
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A mobile app in Barrackpore loads its configuration from a
                    JSON file. The app uses <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">with</code>
                    to read the file; if the file is corrupt, the app catches
                    the exception, but the file is still closed, preventing
                    stale handles.
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
            The following examples demonstrate various uses of <code>with</code>
            with files.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={withOpen}
              title="Basic with open() Usage"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={withoutWith}
              title="Comparison: Without vs With"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={withMultiple}
              title="Multiple Files with with"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={withException}
              title="Exception Handling with with"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={customContext}
              title="Custom Context Manager (Advanced)"
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
                desc: "It's the single most important best practice for file I/O.",
              },
              {
                title: "Combine with `try-except` for error handling",
                desc: "Wrap the `with` block in try-except to catch file errors.",
              },
              {
                title: "Use `with` for other resources too",
                desc: "Locks, database connections, and network sockets all support it.",
              },
              {
                title: "Keep the `with` block as short as possible",
                desc: "Only include the code that needs the file; close it as soon as possible.",
              },
              {
                title: "Use `pathlib` with `with`",
                desc: "`Path('file.txt').open('r') as f:` works seamlessly.",
              },
              {
                title: "Nest `with` for clarity with multiple files",
                desc: "Nested `with` statements are more readable than long comma‑separated ones.",
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
                mistake: "Using `with` but still calling `close()` explicitly",
                fix: "It's redundant; `with` already closes the file.",
              },
              {
                mistake: "Trying to use the file object outside the `with` block",
                fix: "The file object is closed and cannot be used outside; keep it inside.",
              },
              {
                mistake: "Forgetting the `as` clause",
                fix: "You need `as variable` to access the file object.",
              },
              {
                mistake: "Using `with` with a variable that is not a context manager",
                fix: "Only objects that implement `__enter__/__exit__` work with `with`.",
              },
              {
                mistake: "Opening files without `with` and relying on garbage collection",
                fix: "Always use `with` for deterministic cleanup.",
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
                    Always use `with` for file operations:
                  </strong>{" "}
                  This is non‑negotiable in professional code.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Keep the `with` block focused:
                  </strong>{" "}
                  Only include the code that needs the open file.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Handle exceptions around `with`:
                  </strong>{" "}
                  Wrap in try‑except to catch file‑specific errors.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use multiple `with` for clarity:
                  </strong>{" "}
                  For multiple files, use separate `with` statements if it improves readability.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Extend `with` to other resources:
                  </strong>{" "}
                  Apply the same pattern to database connections, network sockets, etc.
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
                "The `with` statement and its purpose",
                "How `with` automatically closes files",
                "The context manager protocol: `__enter__` and `__exit__`",
                "How to open multiple files with `with`",
                "Exception handling with `with`",
                "Why `with` is preferred over manual `close()`",
                "Best practices for using `with`",
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
                  What happens if you try to use the file variable after the
                  `with` block ends? Try to read from it.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a `with` block that opens a file, then deliberately
                  raises an exception inside. Check if the file is closed by
                  trying to open it again outside the block.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why is `with` considered more Pythonic than `try‑finally` for
                  resource management? What does it improve?
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
            title="Using with open() – FAQs"
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
              "The `with` statement is the cornerstone of Pythonic file handling. " +
              "Students must understand that it's not optional — it's the standard. " +
              "Show them the alternative (manual close with try‑finally) and compare " +
              "the verbosity. The 'scope' concept is important: the file object " +
              "is limited to the `with` block, which prevents accidental misuse. " +
              "Emphasize that `with` works for any context manager, not just files, " +
              "which makes it a universal pattern. Use examples with locks and " +
              "database connections to reinforce the pattern."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 12: Using `with open() as file` · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 13 — Reading Files using read()</p>
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

export default Topic12;