import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import readMode from "./topic8_files/read_mode.py?raw";
import writeMode from "./topic8_files/write_mode.py?raw";
import appendMode from "./topic8_files/append_mode.py?raw";
import exclusiveMode from "./topic8_files/exclusive_mode.py?raw";
import modeComparison from "./topic8_files/mode_comparison.py?raw";

// FAQ data
import questions from "./topic8_files/topic8_questions";

/**
 * Topic8: File Modes (r, w, a, x)
 *
 * This component explains the four basic file modes in Python:
 * - 'r': read (file must exist)
 * - 'w': write (creates/overwrites)
 * - 'a': append (creates/appends)
 * - 'x': exclusive creation (fails if exists)
 */
const Topic8 = () => {
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
            Topic 8
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          File Modes (r, w, a, x)
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Understanding the four fundamental modes for opening files in Python
          and when to use each.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📖 Read ('r')
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ✍️ Write ('w')
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ➕ Append ('a')
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ❌ Exclusive ('x')
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: OVERVIEW ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📋</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Four Basic Modes
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Python's <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">open()</code> function
              accepts a <strong>mode</strong> string that determines how the
              file is opened. The four basic modes are:
            </p>
            <ul>
              <li>
                <strong className="text-gray-900 dark:text-white">'r'</strong> —
                <strong>Read</strong>. Opens an existing file for reading.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">'w'</strong> —
                <strong>Write</strong>. Opens a file for writing; creates or
                overwrites.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">'a'</strong> —
                <strong>Append</strong>. Opens a file for appending; creates if
                doesn't exist, writes at the end.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">'x'</strong> —
                <strong>Exclusive creation</strong>. Creates a new file; fails
                if the file already exists.
              </li>
            </ul>
            <p>
              Each mode has a distinct purpose and behavior regarding file
              creation, truncation, and the initial position of the file pointer.
            </p>
          </div>

          {/* SVG: Mode Comparison */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 160" className="w-full max-w-3xl h-auto">
                <text x="350" y="25" textAnchor="middle" fill="#6B7280" fontSize="14">Behavior of Each Mode</text>

                <rect x="30" y="45" width="140" height="45" rx="6" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" />
                <text x="100" y="72" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="600">'r'</text>
                <text x="100" y="88" textAnchor="middle" fill="#93C5FD" fontSize="11">Read (must exist)</text>

                <rect x="190" y="45" width="140" height="45" rx="6" fill="#EF4444" fillOpacity="0.15" stroke="#EF4444" strokeWidth="2" />
                <text x="260" y="72" textAnchor="middle" fill="#F87171" fontSize="16" fontWeight="600">'w'</text>
                <text x="260" y="88" textAnchor="middle" fill="#FCA5A5" fontSize="11">Write (overwrite)</text>

                <rect x="350" y="45" width="140" height="45" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2" />
                <text x="420" y="72" textAnchor="middle" fill="#34D399" fontSize="16" fontWeight="600">'a'</text>
                <text x="420" y="88" textAnchor="middle" fill="#6EE7B7" fontSize="11">Append (to end)</text>

                <rect x="510" y="45" width="140" height="45" rx="6" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2" />
                <text x="580" y="72" textAnchor="middle" fill="#A78BFA" fontSize="16" fontWeight="600">'x'</text>
                <text x="580" y="88" textAnchor="middle" fill="#C4B5FD" fontSize="11">Exclusive (create)</text>

                <text x="100" y="135" textAnchor="middle" fill="#6B7280" fontSize="12">✓ Read only</text>
                <text x="260" y="135" textAnchor="middle" fill="#6B7280" fontSize="12">✓ Creates/overwrites</text>
                <text x="420" y="135" textAnchor="middle" fill="#6B7280" fontSize="12">✓ Appends</text>
                <text x="580" y="135" textAnchor="middle" fill="#6B7280" fontSize="12">✓ Fails if exists</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              Choose the mode based on your operation: reading, writing, appending, or ensuring a new file.
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: READ MODE 'r' ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📖</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Read Mode ('r')
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">Purpose:</strong> To
              read data from an existing file.
            </p>
            <ul>
              <li><strong>File must exist:</strong> If the file doesn't exist, a FileNotFoundError is raised.</li>
              <li><strong>Position:</strong> File pointer is at the beginning (position 0).</li>
              <li><strong>Read-only:</strong> You cannot write to the file; attempting to write raises an error.</li>
              <li><strong>Default mode:</strong> This is the default mode for `open()`.</li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                💡 Usage:
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                Use 'r' when you need to read configuration files, data files,
                logs, or any existing text/binary data. Always check if the file
                exists beforehand or handle the FileNotFoundError.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mt-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              with open('data.txt', 'r', encoding='utf-8') as f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;content = f.read()
            </code>
          </div>
        </section>

        {/* ====== SECTION 3: WRITE MODE 'w' ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">✍️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Write Mode ('w')
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">Purpose:</strong> To
              write data to a file, creating a new file or <em>overwriting</em> an
              existing one.
            </p>
            <ul>
              <li><strong>Creates if missing:</strong> If the file doesn't exist, Python creates it.</li>
              <li><strong>Truncates (overwrites):</strong> If the file exists, its content is erased before writing.</li>
              <li><strong>Position:</strong> File pointer is at the beginning.</li>
              <li><strong>Write-only:</strong> You cannot read from a file opened in 'w' mode.</li>
            </ul>
            <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl">
              <p className="text-red-700 dark:text-red-300 font-medium">
                ⚠️ Caution:
              </p>
              <p className="text-red-600 dark:text-red-400 text-sm">
                'w' mode <strong>destroys existing data</strong>. Use it only when
                you intend to replace the file completely. For adding to existing
                files, use 'a' (append) or 'r+' (read+write).
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mt-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              with open('output.txt', 'w', encoding='utf-8') as f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write('This overwrites the file.')
            </code>
          </div>
        </section>

        {/* ====== SECTION 4: APPEND MODE 'a' ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">➕</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Append Mode ('a')
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">Purpose:</strong> To
              add new data to the <em>end</em> of an existing file, or create a
              new file if it doesn't exist.
            </p>
            <ul>
              <li><strong>Creates if missing:</strong> Like 'w', if the file doesn't exist, it's created.</li>
              <li><strong>No truncation:</strong> Existing content is preserved; writes are added at the end.</li>
              <li><strong>Position:</strong> File pointer is at the end of the file for each write.</li>
              <li><strong>Write-only:</strong> You cannot read from a file opened in 'a' mode.</li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                ✅ Ideal for:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Log files, audit trails, transaction logs, and any situation
                where you need to <em>preserve history</em> and add new entries.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mt-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              with open('log.txt', 'a', encoding='utf-8') as f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{`f.write(f'[{datetime.now()}] Event occurred.\n')`}
            </code>
          </div>
        </section>

        {/* ====== SECTION 5: EXCLUSIVE MODE 'x' ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">❌</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Exclusive Mode ('x')
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">Purpose:</strong> To
              create a new file <em>only if it does not already exist</em>.
            </p>
            <ul>
              <li><strong>Exclusive creation:</strong> The file must not exist; otherwise, FileExistsError is raised.</li>
              <li><strong>Write-only:</strong> You can only write; reading is not allowed.</li>
              <li><strong>Position:</strong> File pointer is at the beginning.</li>
              <li><strong>Safety:</strong> Prevents accidental overwriting of existing files.</li>
            </ul>
            <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded-r-xl">
              <p className="text-green-700 dark:text-green-300 font-medium">
                ✅ Ideal for:
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm">
                Creating unique files, ensuring you don't overwrite existing
                data (e.g., backup files, generated reports with timestamped names).
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mt-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              try:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;with open('newfile.txt', 'x', encoding='utf-8') as f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f.write('This is a new file.')<br />
              except FileExistsError:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;print('File already exists.')
            </code>
          </div>
        </section>

        {/* ====== SECTION 6: COMPARISON TABLE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mode Comparison
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Mode</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Read?</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Write?</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">File must exist?</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Creates if missing?</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Truncates?</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Initial position</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'r'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">Start</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'w'</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">Start</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'a'</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">End (write)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'x'</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌ (must not exist)</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">Start</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Understanding these differences is crucial for choosing the right mode for your task.
          </p>
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
                    Reading Student Data ('r')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school in Shyamnagar reads the student list from
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">students.csv</code> using 'r' mode.
                    If the file is missing, the program shows a friendly error
                    instead of crashing.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📝</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Generating Exam Results ('w')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    Every term, the school in Naihati generates a new results file.
                    Using 'w' mode ensures that the old file is replaced with the
                    latest marks, avoiding outdated data.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📋</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Logging Events ('a')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A web application in Barrackpore logs every user login and
                    action using 'a' mode. The log file grows over time, preserving
                    a complete audit trail.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800/50 transition-all duration-300 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🔒</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Creating Backup Files ('x')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A backup script in Ichapur creates timestamped backup files
                    using 'x' mode. If a file with the same name already exists,
                    the script handles it gracefully, preventing accidental overwrites.
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
            The following examples demonstrate each mode in practical scenarios.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={readMode}
              title="Read Mode ('r') – Safe Reading"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={writeMode}
              title="Write Mode ('w') – Overwriting"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={appendMode}
              title="Append Mode ('a') – Adding to Logs"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={exclusiveMode}
              title="Exclusive Mode ('x') – Safe Creation"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={modeComparison}
              title="Mode Comparison – Side by Side"
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
                title: "Always handle FileNotFoundError for 'r'",
                desc: "Check `os.path.exists()` or use try‑except to avoid crashes.",
              },
              {
                title: "Use 'w' only when you want to replace",
                desc: "If you need to keep existing content, use 'a' or 'r+'.",
              },
              {
                title: "Append mode is perfect for logs",
                desc: "It preserves history and doesn't overwrite.",
              },
              {
                title: "Use 'x' for unique file generation",
                desc: "Combine with timestamps or UUIDs to avoid naming collisions.",
              },
              {
                title: "Test modes with a dummy file first",
                desc: "Always test file operations in a controlled environment.",
              },
              {
                title: "Combine with encoding for text files",
                desc: "Always add `encoding='utf-8'` for text modes.",
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
                mistake: "Using 'w' instead of 'a' and losing data",
                fix: "If you want to add, use 'a'. Only use 'w' to start fresh.",
              },
              {
                mistake: "Using 'r' on a non‑existent file and crashing",
                fix: "Check existence or wrap in try‑except.",
              },
              {
                mistake: "Forgetting to specify encoding, causing Unicode errors",
                fix: "Always use `encoding='utf-8'`.",
              },
              {
                mistake: "Using 'x' without handling FileExistsError",
                fix: "Catch the exception or check existence first.",
              },
              {
                mistake: "Trying to read from a file opened in 'w' or 'a'",
                fix: "Those modes are write‑only; use 'r' or 'r+' for reading.",
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
                    Choose the correct mode for the operation:
                  </strong>{" "}
                  'r' for reading, 'w' for new/overwrite, 'a' for append, 'x' for safe creation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Always use `with` for automatic closure:
                  </strong>{" "}
                  Regardless of mode, `with open()` is the safest.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Be explicit about encoding:
                  </strong>{" "}
                  For text modes, specify `encoding='utf-8'`.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Handle errors gracefully:
                  </strong>{" "}
                  Anticipate FileNotFoundError, FileExistsError, and PermissionError.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use 'x' for race‑condition safety:
                  </strong>{" "}
                  When creating files in concurrent environments, 'x' helps avoid overwrites.
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
                "The purpose and behavior of 'r' (read) mode",
                "The purpose and behavior of 'w' (write) mode",
                "The purpose and behavior of 'a' (append) mode",
                "The purpose and behavior of 'x' (exclusive) mode",
                "When to use each mode (use cases)",
                "The differences in file creation, truncation, and pointer position",
                "Common pitfalls and best practices",
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
                  What happens if you open a file with 'w' and then with 'a'?
                  How does the content change?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a script that uses 'x' to create a file, then try to run
                  it again. How do you handle the FileExistsError?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  A school wants to store attendance records daily. Should they
                  use 'w' or 'a'? Why?
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
            title="File Modes – FAQs"
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
              "This topic is critical because mode selection is a common source " +
              "of bugs, especially 'w' vs 'a'. Emphasize that 'w' destroys data. " +
              "Use the analogy of a notebook: 'r' = reading, 'w' = tearing out pages " +
              "and writing new, 'a' = adding pages at the end, 'x' = starting a " +
              "new notebook only if it doesn't already exist. Encourage students to " +
              "always consider what happens to existing data. Show them real logs " +
              "and config files to illustrate."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 8: File Modes (r, w, a, x) · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 9 — Read & Write Modes (r+, w+, a+)</p>
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

export default Topic8;