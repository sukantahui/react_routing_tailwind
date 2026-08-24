import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import rplusMode from "./topic9_files/rplus_mode.py?raw";
import wplusMode from "./topic9_files/wplus_mode.py?raw";
import aplusMode from "./topic9_files/aplus_mode.py?raw";
import modeComparison from "./topic9_files/mode_comparison.py?raw";
import inplaceEditing from "./topic9_files/inplace_editing.py?raw";

// FAQ data
import questions from "./topic9_files/topic9_questions";

/**
 * Topic9: Read & Write Modes (r+, w+, a+)
 *
 * This component explains the three read+write modes:
 * - 'r+': Read and write without truncating (file must exist)
 * - 'w+': Read and write with truncation (creates/overwrites)
 * - 'a+': Read and append (creates if missing, writes at end)
 */
const Topic9 = () => {
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
            Topic 9
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Read & Write Modes (r+, w+, a+)
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Combining reading and writing in a single mode — powerful, but with
          important nuances.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📖✍️ r+
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ✍️📖 w+
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📖➕ a+
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
              The Read+Write Modes
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The basic modes ('r', 'w', 'a') are either read‑only or write‑only.
              But sometimes you need to <strong>both read and write</strong> to
              the same file. That's where the <strong>read+write modes</strong> come in:
            </p>
            <ul>
              <li>
                <strong className="text-gray-900 dark:text-white">'r+'</strong> —
                Read and write, file must exist, no truncation.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">'w+'</strong> —
                Read and write, creates/overwrites, truncates.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">'a+'</strong> —
                Read and append, creates if missing, writes at end.
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Adding '+' to a mode adds the opposite capability. So 'r+' is
                'r' + write, 'w+' is 'w' + read, and 'a+' is 'a' + read.
              </p>
            </div>
          </div>

          {/* SVG: Mode Comparison */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 140" className="w-full max-w-3xl h-auto">
                <text x="350" y="25" textAnchor="middle" fill="#6B7280" fontSize="14">Read+Write Modes at a Glance</text>

                <rect x="30" y="45" width="190" height="55" rx="8" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" />
                <text x="125" y="70" textAnchor="middle" fill="#60A5FA" fontSize="18" fontWeight="600">'r+'</text>
                <text x="125" y="90" textAnchor="middle" fill="#93C5FD" fontSize="12">Read + Write (no truncate)</text>

                <rect x="250" y="45" width="190" height="55" rx="8" fill="#EF4444" fillOpacity="0.15" stroke="#EF4444" strokeWidth="2" />
                <text x="345" y="70" textAnchor="middle" fill="#F87171" fontSize="18" fontWeight="600">'w+'</text>
                <text x="345" y="90" textAnchor="middle" fill="#FCA5A5" fontSize="12">Write + Read (truncate)</text>

                <rect x="470" y="45" width="190" height="55" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2" />
                <text x="565" y="70" textAnchor="middle" fill="#34D399" fontSize="18" fontWeight="600">'a+'</text>
                <text x="565" y="90" textAnchor="middle" fill="#6EE7B7" fontSize="12">Append + Read (end)</text>

                <text x="125" y="125" textAnchor="middle" fill="#6B7280" fontSize="11">File must exist</text>
                <text x="345" y="125" textAnchor="middle" fill="#6B7280" fontSize="11">Creates/overwrites</text>
                <text x="565" y="125" textAnchor="middle" fill="#6B7280" fontSize="11">Creates/appends</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              Each mode combines reading and writing with different behaviors.
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: r+ MODE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📖✍️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mode 'r+' — Read & Write (No Truncate)
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">Purpose:</strong> To
              read from and write to an <em>existing</em> file without
              truncating it.
            </p>
            <ul>
              <li><strong>File must exist:</strong> Raises FileNotFoundError if missing.</li>
              <li><strong>No truncation:</strong> Existing content is preserved.</li>
              <li><strong>Position:</strong> File pointer starts at the beginning (0).</li>
              <li><strong>Reading and writing:</strong> You can both read and write.</li>
              <li><strong>Typical use:</strong> In‑place editing, updating specific parts of a file.</li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                ⚠️ Important:
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                With 'r+', writes <em>overwrite</em> existing content at the
                current pointer position. They do <strong>not</strong> insert or
                append. Use <code>seek()</code> to control where you write.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mt-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              with open('data.txt', 'r+', encoding='utf-8') as f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;content = f.read()  # read existing data<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.seek(0)  # go back to start<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write('New header\n')  # overwrite at start
            </code>
          </div>
        </section>

        {/* ====== SECTION 3: w+ MODE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">✍️📖</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mode 'w+' — Read & Write (Truncate)
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">Purpose:</strong> To
              create a new file or <em>overwrite</em> an existing one, while
              still being able to read from it.
            </p>
            <ul>
              <li><strong>Creates if missing:</strong> If the file doesn't exist, it's created.</li>
              <li><strong>Truncates (overwrites):</strong> Existing content is erased.</li>
              <li><strong>Position:</strong> File pointer starts at the beginning (0).</li>
              <li><strong>Reading and writing:</strong> You can read after writing.</li>
              <li><strong>Typical use:</strong> Creating a file and then verifying or reading it back.</li>
            </ul>
            <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl">
              <p className="text-red-700 dark:text-red-300 font-medium">
                ⚠️ Caution:
              </p>
              <p className="text-red-600 dark:text-red-400 text-sm">
                Like 'w', 'w+' <strong>destroys existing data</strong>. Use it
                only when you want to start fresh. If you need to preserve
                content, use 'r+' instead.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mt-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              with open('output.txt', 'w+', encoding='utf-8') as f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write('Hello World!\n')<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.seek(0)  # go to start<br />
              &nbsp;&nbsp;&nbsp;&nbsp;content = f.read()  # read what we wrote
            </code>
          </div>
        </section>

        {/* ====== SECTION 4: a+ MODE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📖➕</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mode 'a+' — Read & Append
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">Purpose:</strong> To
              read the file and <em>append</em> new data at the end.
            </p>
            <ul>
              <li><strong>Creates if missing:</strong> If the file doesn't exist, it's created.</li>
              <li><strong>No truncation:</strong> Existing content is preserved.</li>
              <li><strong>Position:</strong> Writes always happen at the end. Reads start at the beginning.</li>
              <li><strong>Reading and appending:</strong> You can read the entire file and then append.</li>
              <li><strong>Typical use:</strong> Log files that need to be read and appended to.</li>
            </ul>
            <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded-r-xl">
              <p className="text-green-700 dark:text-green-300 font-medium">
                ✅ Note:
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm">
                When using 'a+', <strong>every write goes to the end</strong>,
                regardless of the current pointer position. You can read from
                anywhere, but writes are always appended.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mt-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              with open('log.txt', 'a+', encoding='utf-8') as f:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;content = f.read()  # read existing log<br />
              &nbsp;&nbsp;&nbsp;&nbsp;f.write('New log entry\n')  # appended at end
            </code>
          </div>
        </section>

        {/* ====== SECTION 5: COMPARISON TABLE ====== */}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Write position</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'r+'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">Pointer position</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'w+'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">Start</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'a+'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">End (always)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Choose the mode that matches your read/write needs and file‑creation requirements.
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
                <span className="text-3xl">✏️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Editing a Configuration File ('r+')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A system administrator in Barrackpore needs to update a
                    configuration file <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">config.ini</code>.
                    Using 'r+', they can read the current settings, modify the
                    relevant line, and write back the changes without losing
                    other settings.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📝</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Generating a Report ('w+')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school in Naihati generates a report, writes it to a
                    file, and then reads it back to verify before sending to the
                    principal. 'w+' allows both operations with a single file
                    handle.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📋</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Audit Log with Review ('a+')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A web application in Shyamnagar uses 'a+' for its log file.
                    It appends new events and can read the entire log for
                    monitoring or reporting without opening the file separately.
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
            The following examples demonstrate each read+write mode in practical
            scenarios.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={rplusMode}
              title="r+ Mode – In-Place Editing"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={wplusMode}
              title="w+ Mode – Create & Read Back"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={aplusMode}
              title="a+ Mode – Append & Read"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={modeComparison}
              title="Mode Comparison – Side by Side"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={inplaceEditing}
              title="Advanced: In-Place File Editing"
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
                title: "Use 'r+' for in‑place updates",
                desc: "Read, seek, write — perfect for editing configs and small files.",
              },
              {
                title: "Remember: 'w+' truncates",
                desc: "It erases everything; use it when you want a fresh file.",
              },
              {
                title: "In 'a+', writes always go to the end",
                desc: "Even if you `seek()` elsewhere, writes are appended.",
              },
              {
                title: "Combine with `seek()` and `tell()`",
                desc: "Use them to navigate precisely in read+write modes.",
              },
              {
                title: "Use `truncate()` to shrink files",
                desc: "After modifying with 'r+', you may need to truncate if you wrote less.",
              },
              {
                title: "Prefer 'r+' for safety",
                desc: "It won't destroy data; you always control what gets overwritten.",
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
                mistake: "Using 'r+' on a non-existent file",
                fix: "Check existence or use 'w+' if you want to create.",
              },
              {
                mistake: "Forgetting to `seek()` before overwriting with 'r+'",
                fix: "The pointer may be at the end after reading; use `seek(0)` to go back.",
              },
              {
                mistake: "Assuming 'w+' preserves existing content",
                fix: "It truncates; use 'r+' for preservation.",
              },
              {
                mistake: "Trying to read after writing with 'a+' without `seek()`",
                fix: "After writing in 'a+', the pointer is at the end; use `seek(0)` to read.",
              },
              {
                mistake: "Not truncating after writing less data with 'r+'",
                fix: "If you overwrite with shorter content, call `truncate()` to remove extra bytes.",
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
                    Choose 'r+' for safe in‑place updates:
                  </strong>{" "}
                  It preserves existing data and gives full control.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use 'w+' when you need a fresh file and want to read it back:
                  </strong>{" "}
                  Perfect for generating reports or outputs.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use 'a+' for logs that need review:
                  </strong>{" "}
                  Append new events and read the full history.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Always use `with` for automatic closure:
                  </strong>{" "}
                  Regardless of mode, context managers are safer.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Test with small files first:
                  </strong>{" "}
                  Read+write modes can be tricky; test on dummy data.
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
                "What 'r+' does and when to use it",
                "What 'w+' does and when to use it",
                "What 'a+' does and when to use it",
                "The difference between truncating and non‑truncating modes",
                "How write position works in each mode",
                "Common pitfalls and how to avoid them",
                "Best practices for read+write file operations",
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
                  In 'r+' mode, after reading the entire file, where is the
                  pointer? What happens if you write immediately after reading?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Use 'a+' to append a line, then read the file without
                  `seek(0)`. What do you get?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  A program needs to update a score in a file. Should it use
                  'r+' or 'w+'? Why?
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
            title="Read & Write Modes – FAQs"
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
              "Read+write modes are powerful but often misunderstood. The key " +
              "is the pointer position and truncation behavior. Use the analogy " +
              "of a document: 'r+' is like editing with a pen (overwriting), " +
              "'w+' is like starting a new page, and 'a+' is like adding notes " +
              "at the bottom. Emphasize that 'a+' always writes at the end — " +
              "this is a common source of bugs. Have students experiment with " +
              "each mode and observe the pointer position using `tell()`."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 9: Read & Write Modes (r+, w+, a+) · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 10 — Binary File Modes (rb, wb, ab, rb+, wb+, ab+)</p>
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

export default Topic9;