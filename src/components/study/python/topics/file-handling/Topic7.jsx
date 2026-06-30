import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import fileObjectMethods from "./topic7_files/file_object_methods.py?raw";
import fileObjectAttributes from "./topic7_files/file_object_attributes.py?raw";
import fileObjectIteration from "./topic7_files/file_object_iteration.py?raw";
import fileObjectContext from "./topic7_files/file_object_context.py?raw";

// FAQ data
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: File Object
 *
 * This component explains the file object returned by open(), its attributes,
 * methods, and how to use it for file I/O operations.
 */
const Topic7 = () => {
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
            Topic 7
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          File Object
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          The gateway to file I/O: understanding the file object and its
          capabilities.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📄 File Object
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📝 Methods
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔍 Attributes
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS A FILE OBJECT ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What is a File Object?
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              A <strong className="text-gray-900 dark:text-white">file object</strong> is
              the Python representation of an open file. It's created when you
              call <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">open()</code> and provides
              methods and attributes for interacting with the file.
            </p>
            <p>
              The file object acts as a <strong>stream</strong> — a connection
              between your program and the file on disk. Through it, you can
              read data from the file, write data to it, move the position
              pointer, check file properties, and more.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                The file object is a <em>resource wrapper</em>. It holds a file
                descriptor and manages the buffer. Always close it (or use a
                context manager) to release resources.
              </p>
            </div>
          </div>

          {/* SVG: File Object as Bridge */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 140" className="w-full max-w-3xl h-auto">
                <rect x="30" y="30" width="140" height="80" rx="10" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" />
                <text x="100" y="65" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="600">Your Program</text>
                <text x="100" y="90" textAnchor="middle" fill="#93C5FD" fontSize="12">(Memory)</text>

                <rect x="240" y="20" width="200" height="100" rx="12" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="20" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="340" y="55" textAnchor="middle" fill="#A78BFA" fontSize="18" fontWeight="700">File Object</text>
                <text x="340" y="80" textAnchor="middle" fill="#C4B5FD" fontSize="14">(read(), write(), seek(), ...)</text>
                <text x="340" y="105" textAnchor="middle" fill="#C4B5FD" fontSize="12">bridge between program and disk</text>

                <rect x="510" y="30" width="140" height="80" rx="10" fill="#EF4444" fillOpacity="0.15" stroke="#EF4444" strokeWidth="2" />
                <text x="580" y="65" textAnchor="middle" fill="#F87171" fontSize="16" fontWeight="600">File on Disk</text>
                <text x="580" y="90" textAnchor="middle" fill="#FCA5A5" fontSize="12">(Persistent)</text>

                <line x1="170" y1="70" x2="240" y2="70" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="440" y1="70" x2="510" y2="70" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2s" repeatCount="indefinite" begin="1s" />
                </line>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              The file object is the middle layer between your code and the file.
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: METHODS OF FILE OBJECT ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📝</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Key Methods
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Method</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Return Value</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">read([size])</td>
                  <td className="px-6 py-4">Reads up to `size` bytes/characters from the file.</td>
                  <td className="px-6 py-4">str (text) or bytes (binary)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">readline([size])</td>
                  <td className="px-6 py-4">Reads one line from the file (up to size bytes).</td>
                  <td className="px-6 py-4">str</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">readlines([hint])</td>
                  <td className="px-6 py-4">Reads all lines and returns a list.</td>
                  <td className="px-6 py-4">list of str</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">write(string)</td>
                  <td className="px-6 py-4">Writes the string to the file.</td>
                  <td className="px-6 py-4">int (bytes written)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">writelines(lines)</td>
                  <td className="px-6 py-4">Writes a list of strings to the file.</td>
                  <td className="px-6 py-4">None</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">close()</td>
                  <td className="px-6 py-4">Closes the file and releases resources.</td>
                  <td className="px-6 py-4">None</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">seek(offset[, whence])</td>
                  <td className="px-6 py-4">Moves the file pointer to a new position.</td>
                  <td className="px-6 py-4">int (new position)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">tell()</td>
                  <td className="px-6 py-4">Returns the current position of the file pointer.</td>
                  <td className="px-6 py-4">int</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">flush()</td>
                  <td className="px-6 py-4">Flushes the write buffer to disk.</td>
                  <td className="px-6 py-4">None</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">fileno()</td>
                  <td className="px-6 py-4">Returns the file descriptor (integer).</td>
                  <td className="px-6 py-4">int</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">isatty()</td>
                  <td className="px-6 py-4">Checks if the file is a terminal device.</td>
                  <td className="px-6 py-4">bool</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">truncate([size])</td>
                  <td className="px-6 py-4">Truncates the file to at most `size` bytes.</td>
                  <td className="px-6 py-4">int (new size)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">__next__()</td>
                  <td className="px-6 py-4">Returns the next line (support iteration).</td>
                  <td className="px-6 py-4">str</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            File objects are iterable, so you can use `for line in f:` to read lines.
          </p>
        </section>

        {/* ====== SECTION 3: ATTRIBUTES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔍</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Key Attributes
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Attribute</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">closed</td>
                  <td className="px-6 py-4">True if the file is closed, else False.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">mode</td>
                  <td className="px-6 py-4">The mode string used to open the file.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">name</td>
                  <td className="px-6 py-4">The filename (or path) of the file.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">encoding</td>
                  <td className="px-6 py-4">The encoding used (for text files).</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">errors</td>
                  <td className="px-6 py-4">The error handling scheme (e.g., 'strict').</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">newlines</td>
                  <td className="px-6 py-4">The newline characters encountered while reading.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">buffer</td>
                  <td className="px-6 py-4">The underlying buffered stream (for text mode).</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">closefd</td>
                  <td className="px-6 py-4">True if the file descriptor is closed when file is closed.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm">name</td>
                  <td className="px-6 py-4">File name (full path or provided name).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ====== SECTION 4: ITERATION & LINE READING ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Iteration & Line Reading
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              File objects are <strong>iterable</strong>. This means you can use
              them directly in a <code>for</code> loop to read lines one by one:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('data.txt', 'r') as f:
    for line in f:
        print(line, end='')
              </code>
            </pre>
            <p>
              This is memory‑efficient for large files because it doesn't read
              the entire file into memory. Behind the scenes, it uses the
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">__next__()</code> method.
            </p>
            <p>
              You can also call <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readline()</code>
              for explicit line‑by‑line control, or <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readlines()</code> to
              get all lines as a list (use with caution on large files).
            </p>
          </div>
        </section>

        {/* ====== SECTION 5: BUFFERING & FLUSHING ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">💾</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Buffering & Flushing
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              File objects use <strong>buffering</strong> to improve performance.
              Instead of writing every byte to disk immediately, Python keeps
              data in a buffer and writes it in larger chunks.
            </p>
            <ul>
              <li>
                <strong>Flushing:</strong> You can force the buffer to be written
                to disk using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">flush()</code>.
              </li>
              <li>
                <strong>Closing:</strong> When you close a file, it automatically
                flushes the buffer.
              </li>
              <li>
                <strong>Unbuffered:</strong> Set <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">buffering=0</code> in
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">open()</code> for unbuffered I/O (rarely needed).
              </li>
            </ul>
            <p>
              In practice, you rarely need to call <code>flush()</code> manually
              because Python and the OS handle it, but it's useful when you need
              to ensure data is written immediately (e.g., in logging).
            </p>
          </div>
        </section>

        {/* ====== SECTION 6: REAL-WORLD CONTEXT ====== */}
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
                <span className="text-3xl">📖</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Reading Log Files Line by Line
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A system administrator in Barrackpore needs to analyze a
                    large log file <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">access.log</code>.
                    Using the file object's iteration capability, they can
                    process each line without loading the entire file into memory.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">✍️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Writing Exam Results with writelines()
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school in Naihati collects student marks in a list of
                    strings. Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">writelines()</code>,
                    they can write all results at once to a CSV file efficiently.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📤</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Flushing for Real‑time Monitoring
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A monitoring script in Shyamnagar writes status updates to
                    a file. By calling <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">flush()</code>
                    after each write, they ensure that another process reading
                    the file sees the latest data immediately.
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
            The following examples showcase the file object's methods and
            attributes.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={fileObjectMethods}
              title="Common File Object Methods"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={fileObjectAttributes}
              title="Inspecting File Object Attributes"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={fileObjectIteration}
              title="Iterating Over Lines"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={fileObjectContext}
              title="Context Manager & File Object"
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
                title: "Use `for line in f` for memory efficiency",
                desc: "It reads lines lazily, perfect for large files.",
              },
              {
                title: "Check `f.closed` before using",
                desc: "Avoid AttributeError by verifying the file is still open.",
              },
              {
                title: "Use `f.tell()` for debugging pointer position",
                desc: "Helps understand where you are in the file.",
              },
              {
                title: "Flush after critical writes",
                desc: "Call `f.flush()` to ensure data is on disk before continuing.",
              },
              {
                title: "Use `with` to automatically close",
                desc: "Eliminates the risk of forgetting to close.",
              },
              {
                title: "Access `f.name` for the filename",
                desc: "Useful for logging which file you're processing.",
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
                mistake: "Using `read()` on a huge file, causing memory error",
                fix: "Use iteration or read in chunks.",
              },
              {
                mistake: "Forgetting to close the file (or not using `with`)",
                fix: "Always use `with open()` or call `close()`.",
              },
              {
                mistake: "Calling methods on a closed file",
                fix: "Check `f.closed` before operations.",
              },
              {
                mistake: "Assuming `readline()` strips newline",
                fix: "It preserves newline; you need to `.strip()` manually.",
              },
              {
                mistake: "Using `seek()` on a text file without understanding encoding",
                fix: "Seek works on byte offsets; use with caution in text mode.",
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
                  It ensures the file is closed even if an exception occurs.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Iterate for large files:
                  </strong>{" "}
                  Use `for line in f` to avoid loading the whole file.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Check `f.closed` before operations:
                  </strong>{" "}
                  Avoid errors from using a closed file.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `flush()` sparingly:
                  </strong>{" "}
                  It's rarely needed; let Python and the OS handle buffering.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Prefer `readline()` over `readlines()` for large files:
                  </strong>{" "}
                  `readlines()` loads all lines into memory.
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
                "What a file object is and how it's created",
                "Key methods: read, write, readline, readlines, close, seek, tell",
                "Key attributes: closed, mode, name, encoding",
                "How to iterate over a file object line by line",
                "The concept of buffering and when to use flush()",
                "Why context managers are preferred",
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
                  After calling `read()` on a file, what happens to the file
                  pointer? Try `tell()` before and after reading.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a script that reads a file line by line using both
                  `for line in f` and `while True: line = f.readline(); if not line: break`.
                  Which is more Pythonic?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  If you're writing a log monitoring program that tails a file,
                  why might you need to call `flush()` on the writer side?
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
            title="File Object – FAQs"
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
              "The file object is the workhorse of file I/O. Students should " +
              "understand that it's not just a container but an active interface " +
              "with state (position, buffering). Emphasize the difference between " +
              "reading all data at once (`read()`) and streaming (`for line in f`). " +
              "Demonstrate the `with` statement early to avoid resource leaks. " +
              "Encourage exploration of attributes like `closed` and `mode` to " +
              "build debugging habits."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 7: File Object · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 8 — File Modes (r, w, a, x)</p>
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

export default Topic7;