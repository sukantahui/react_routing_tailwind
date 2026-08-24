import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import basicOpen from "./topic6_files/basic_open.py?raw";
import openModes from "./topic6_files/open_modes.py?raw";
import openErrors from "./topic6_files/open_errors.py?raw";
import openContextManager from "./topic6_files/open_context_manager.py?raw";
import openEncoding from "./topic6_files/open_encoding.py?raw";

// FAQ data
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Opening Files with open()
 *
 * This component explains the open() function, its parameters, modes,
 * and how to use it correctly in Python.
 */
const Topic6 = () => {
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
            Topic 6
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Opening Files with open()
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          The gateway to file I/O: understanding Python's built‑in `open()`
          function and its parameters.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔓 open()
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📋 Modes
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔧 Parameters
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: THE open() FUNCTION ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔓</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `open()` Function
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">open()</code> function is the
              primary way to work with files in Python. It establishes a
              connection between your program and a file on the file system,
              returning a <strong className="text-gray-900 dark:text-white">file object</strong>.
            </p>
            <p>
              Once you have a file object, you can read from it, write to it, or
              perform other operations depending on the <strong>mode</strong> you
              specify.
            </p>
          </div>

          {/* SVG: open() flow */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 140" className="w-full max-w-3xl h-auto">
                <rect x="30" y="20" width="140" height="80" rx="10" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" />
                <text x="100" y="55" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="600">Your Code</text>
                <text x="100" y="78" textAnchor="middle" fill="#93C5FD" fontSize="12">open('file', 'r')</text>

                <line x1="170" y1="60" x2="240" y2="60" stroke="#F59E0B" strokeWidth="3" />
                <polygon points="240,55 250,60 240,65" fill="#F59E0B" />
                <text x="210" y="48" textAnchor="middle" fill="#F59E0B" fontSize="13">requests</text>

                <rect x="250" y="20" width="180" height="80" rx="10" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2" />
                <text x="340" y="50" textAnchor="middle" fill="#A78BFA" fontSize="16" fontWeight="600">Operating System</text>
                <text x="340" y="78" textAnchor="middle" fill="#C4B5FD" fontSize="12">(Kernel)</text>

                <line x1="430" y1="60" x2="500" y2="60" stroke="#10B981" strokeWidth="3" />
                <polygon points="500,55 510,60 500,65" fill="#10B981" />
                <text x="470" y="48" textAnchor="middle" fill="#10B981" fontSize="13">opens</text>

                <rect x="510" y="20" width="140" height="80" rx="10" fill="#EF4444" fillOpacity="0.15" stroke="#EF4444" strokeWidth="2" />
                <text x="580" y="50" textAnchor="middle" fill="#F87171" fontSize="16" fontWeight="600">File</text>
                <text x="580" y="78" textAnchor="middle" fill="#FCA5A5" fontSize="12">on disk</text>

                <text x="340" y="120" textAnchor="middle" fill="#6B7280" fontSize="13">open() → file object (connection)</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              `open()` creates a bridge between your program and a file on disk.
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: FUNCTION SIGNATURE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📜</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Function Signature & Parameters
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The full signature of <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">open()</code> is:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
              </code>
            </pre>
            <ul>
              <li>
                <strong className="text-gray-900 dark:text-white">file</strong> —
                path-like object (string, Path) representing the file to open.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">mode</strong> —
                string indicating how the file is opened (default 'r').
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">encoding</strong> —
                name of the encoding used for text files (e.g., 'utf-8').
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">errors</strong> —
                how to handle encoding/decoding errors.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">newline</strong> —
                controls how newlines are translated.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">buffering</strong> —
                buffering policy (0 = unbuffered, 1 = line buffered, &gt;1 = buffer size).
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">closefd</strong> —
                if False, file descriptor is kept open when the file is closed.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">opener</strong> —
                custom opener function.
              </li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                📌 Most Common Usage:
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                You'll typically use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">open(filename, 'r', encoding='utf-8')</code>
                for reading text files.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 3: RETURN TYPE & PURPOSE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📦</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Return Type & Purpose
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">Purpose:</strong> To
              create a file object that provides methods for reading, writing,
              and manipulating the file's content.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Return Type:</strong>
              A file object (also called a <em>file descriptor wrapper</em>). The
              exact type depends on the mode:
            </p>
            <ul>
              <li>
                <strong>Text mode (default):</strong> Returns a
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">io.TextIOWrapper</code> object.
              </li>
              <li>
                <strong>Binary mode ('b'):</strong> Returns a
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">io.BufferedReader</code> or
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">io.BufferedWriter</code>.
              </li>
            </ul>
            <p>
              The file object provides methods like <code>read()</code>,
              <code>write()</code>, <code>close()</code>, <code>seek()</code>,
              <code>tell()</code>, and more.
            </p>
          </div>
        </section>

        {/* ====== SECTION 4: MODES OVERVIEW ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📋</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              File Modes Overview
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Mode</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Read</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Write</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Truncate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">File must exist</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">'r'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">Start</td>
                  <td className="px-6 py-4">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">'w'</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">Start</td>
                  <td className="px-6 py-4">No (created)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">'a'</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">End</td>
                  <td className="px-6 py-4">No (created)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">'x'</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">Start</td>
                  <td className="px-6 py-4">No (exclusive)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">'r+'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">Start</td>
                  <td className="px-6 py-4">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">'w+'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">Start</td>
                  <td className="px-6 py-4">No (created)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">'a+'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">End (write)</td>
                  <td className="px-6 py-4">No (created)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Add 'b' to any mode for binary files (e.g., 'rb', 'wb', 'rb+').
          </p>
        </section>

        {/* ====== SECTION 5: IMPORTANT PARAMETERS IN DEPTH ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔧</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Key Parameters Explained
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">encoding</code>
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                Specifies the character encoding for text files. Always set it
                to <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'utf-8'</code> for modern systems.
                Default is platform‑dependent.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">errors</code>
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                How to handle encoding/decoding errors. Common values:
                <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                  <li><code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">'strict'</code> (default) — raises UnicodeError.</li>
                  <li><code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">'ignore'</code> — ignores invalid bytes.</li>
                  <li><code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">'replace'</code> — replaces invalid bytes with �.</li>
                  <li><code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">'backslashreplace'</code> — uses backslash escapes.</li>
                </ul>
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">newline</code>
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                Controls how newlines are translated. Useful for cross‑platform
                compatibility. Set to <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">''</code> to disable translation.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 6: REAL-WORLD EXAMPLES ====== */}
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
                <span className="text-3xl">📄</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Reading a Student List
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A school in Ichapur has a file <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">students.txt</code> with one
                    name per line. The attendance system opens it with
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">open('students.txt', 'r', encoding='utf-8')</code>
                    and reads all lines.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">✍️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Writing Exam Results
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school's result generation system writes marks to
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">results.csv</code> using
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">open('results.csv', 'w', encoding='utf-8')</code>.
                    This overwrites the previous file each time.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📝</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Appending to Log File
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A web server in Barrackpore writes access logs to
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">access.log</code> using
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">open('access.log', 'a', encoding='utf-8')</code>
                    to append each new entry without erasing history.
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
            The following examples showcase various uses of <code>open()</code>.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={basicOpen}
              title="Basic open() Usage"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={openModes}
              title="Exploring Different Modes"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={openErrors}
              title="Handling open() Errors"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={openContextManager}
              title="Best Practice: with open()"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={openEncoding}
              title="Encoding & Error Handling"
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
                title: "Always use `with open()`",
                desc: "It automatically closes the file, even if an exception occurs.",
              },
              {
                title: "Specify encoding explicitly",
                desc: "Use `encoding='utf-8'` to avoid platform‑dependent surprises.",
              },
              {
                title: "Use `newline=''` for CSV files",
                desc: "Disables newline translation, which is critical for proper CSV handling.",
              },
              {
                title: "Check file existence before opening",
                desc: "Use `os.path.exists()` to avoid FileNotFoundError.",
              },
              {
                title: "Use `mode='x'` to avoid overwriting",
                desc: "Exclusive creation mode ensures you don't accidentally overwrite an existing file.",
              },
              {
                title: "Handle PermissionError gracefully",
                desc: "Provide user‑friendly messages when access is denied.",
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
                mistake: "Forgetting to specify mode, expecting write",
                fix: "Always include the mode; default is 'r' (read).",
              },
              {
                mistake: "Not closing the file (or using `with`)",
                fix: "Use `with open()` to ensure automatic closing.",
              },
              {
                mistake: "Ignoring encoding, leading to UnicodeDecodeError",
                fix: "Always set `encoding='utf-8'` for text files.",
              },
              {
                mistake: "Opening a binary file in text mode",
                fix: "Use 'rb' or 'wb' for binary files; never 'r' or 'w'.",
              },
              {
                mistake: "Assuming the file is in the CWD",
                fix: "Use absolute or script‑relative paths, or check existence.",
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
                    Use context managers (`with open()`):
                  </strong>{" "}
                  This is the safest and most Pythonic way.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Be explicit about encoding:
                  </strong>{" "}
                  Always pass `encoding='utf-8'` for text files.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Choose the correct mode:
                  </strong>{" "}
                  Use 'r' for reading, 'w' for writing (overwrites), 'a' for appending.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Handle errors:
                  </strong>{" "}
                  Wrap `open()` in a try‑except to catch FileNotFoundError, PermissionError, etc.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `os.path` or `pathlib` for robust path handling:
                  </strong>{" "}
                  Avoid hard‑coding paths.
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
                "The `open()` function signature and its parameters",
                "All file modes ('r', 'w', 'a', 'x', 'r+', 'w+', 'a+')",
                "The importance of specifying encoding",
                "How to handle open errors (FileNotFoundError, PermissionError)",
                "The return type (file object) and its methods",
                "Why `with open()` is the best practice",
                "Common mistakes and how to avoid them",
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
                  What happens if you open a file with 'w' mode and the file
                  already exists? What if you use 'x'?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a small script that opens a file with 'r+' mode, reads a
                  line, and then writes something. What happens to the file's
                  content?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why is it important to specify `encoding='utf-8'` when opening
                  text files? What could go wrong if you don't?
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
            title="Opening Files with open() – FAQs"
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
              "The `open()` function is the entry point to all file operations. " +
              "Students should memorize the common modes and understand the " +
              "importance of closing files. Emphasize that `with open()` is not " +
              "just syntactic sugar — it's a safety net. Also, drilling the " +
              "encoding parameter early saves countless debugging hours. Use " +
              "real examples like opening a CSV, a log file, and an image (binary) " +
              "to solidify the differences."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 6: Opening Files with open() · Built with ❤️ for classroom
            learning
          </p>
          <p className="mt-1">Next: Topic 7 — File Object</p>
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

export default Topic6;