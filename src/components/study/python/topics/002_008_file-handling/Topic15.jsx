import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import readlineBasic from "./topic15_files/readline_basic.py?raw";
import readlineLoop from "./topic15_files/readline_loop.py?raw";
import readlineSize from "./topic15_files/readline_size.py?raw";
import readlineEmpty from "./topic15_files/readline_empty.py?raw";
import readlineVsRead from "./topic15_files/readline_vs_read.py?raw";

// FAQ data
import questions from "./topic15_files/topic15_questions";

/**
 * Topic15: Reading Files using readline()
 *
 * This component explains the readline() method for reading files line by line,
 * its parameters, return values, and practical usage patterns.
 */
const Topic15 = () => {
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
            Topic 15
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Reading Files using `readline()`
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Reading files one line at a time: the memory‑efficient way to process
          structured text data.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📖 readline()
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📄 Line by Line
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            💾 Memory Efficient
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS readline() ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📖</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `readline()` Method
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readline()</code> method
              reads a <strong>single line</strong> from a file, starting from
              the current file pointer position. It reads characters until it
              encounters a newline character (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">\n</code>)
              or reaches EOF.
            </p>
            <ul>
              <li>
                <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">file.readline(size=-1)</code>
              </li>
              <li>
                <strong>Return type:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">str</code> (text mode) or
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">bytes</code> (binary mode)
              </li>
              <li>
                <strong>Purpose:</strong> Read a single line from the file,
                including the newline character at the end.
              </li>
              <li>
                <strong>Parameters:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">size</code> (optional) —
                maximum number of characters/bytes to read. If negative or
                omitted, reads the entire line.
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readline()</code> is the
                foundation of <strong>line‑oriented</strong> file processing.
                It's ideal for log files, CSV files, configuration files, and
                any text where each record is on its own line.
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
    line = f.readline()  # reads first line<br />
    print(line)          # includes newline at the end<br />
    line2 = f.readline() # reads second line
              </code>
            </pre>
            <p>
              <strong>Key behaviors:</strong>
            </p>
            <ul>
              <li>
                <strong>Includes newline:</strong> The returned string includes
                the newline character (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">\n</code>)
                at the end, except for the last line if the file doesn't end
                with a newline.
              </li>
              <li>
                <strong>EOF:</strong> When the end of the file is reached,
                <code>readline()</code> returns an empty string (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">''</code>).
              </li>
              <li>
                <strong>Binary mode:</strong> In binary mode, it reads up to the
                next newline byte (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">\n</code>)
                or EOF.
              </li>
              <li>
                <strong>Size parameter:</strong> If <code>size</code> is
                specified, it reads at most <code>size</code> characters/bytes.
                If <code>size</code> cuts off a line, it doesn't read the rest
                of that line unless called again.
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 3: READING LINES IN A LOOP ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reading Lines in a Loop
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The most common use of <code>readline()</code> is in a loop to
              process all lines in a file. There are two common patterns:
            </p>
            <p>
              <strong>Pattern 1: while loop with break condition</strong>
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('data.txt', 'r') as f:<br />
    while True:<br />
        line = f.readline()<br />
        if not line:  # EOF<br />
            break<br />
        process_line(line)
              </code>
            </pre>
            <p>
              <strong>Pattern 2: Assignment expression (Python 3.8+)</strong>
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('data.txt', 'r') as f:<br />
    while line := f.readline():<br />
        process_line(line)
              </code>
            </pre>
            <p>
              <strong>Pattern 3: Using the file object as an iterator</strong>
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('data.txt', 'r') as f:<br />
    for line in f:<br />
        process_line(line)
              </code>
            </pre>
            <p>
              Pattern 3 is the <strong>most Pythonic</strong> and is preferred
              for most use cases.
            </p>
          </div>
        </section>

        {/* ====== SECTION 4: THE size PARAMETER ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📏</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `size` Parameter
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The optional <code>size</code> parameter limits how much
              <code>readline()</code> reads:
            </p>
            <ul>
              <li>
                If <code>size</code> is given and the line is longer than
                <code>size</code>, it returns the first <code>size</code>
                characters/bytes and the file pointer stops there. The next call
                continues reading the same line.
              </li>
              <li>
                If <code>size</code> is given and is greater than or equal to
                the line length, it returns the full line.
              </li>
              <li>
                If <code>size</code> is negative or omitted, it reads the
                complete line.
              </li>
            </ul>
            <p>
              <strong>Example:</strong>
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('data.txt', 'r') as f:<br />
    part = f.readline(10)  # reads at most 10 chars<br />
    rest = f.readline()    # reads the rest of the line<br />
    next_line = f.readline()  # reads the next line
              </code>
            </pre>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                ⚠️ Caution:
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                Using <code>size</code> with <code>readline()</code> can break
                line boundaries. It's more common to use <code>readline()</code>
                without <code>size</code> and process the full line.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 5: EOF AND EMPTY LINES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🏁</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              EOF and Empty Lines
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              It's important to distinguish between an <strong>empty line</strong>
              and <strong>EOF</strong>:
            </p>
            <ul>
              <li>
                <strong>Empty line:</strong> A line that contains only a newline
                character (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'\n'</code>).
                <code>readline()</code> returns <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'\n'</code>.
              </li>
              <li>
                <strong>EOF:</strong> The end of the file has been reached.
                <code>readline()</code> returns <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">''</code>.
              </li>
            </ul>
            <p>
              This distinction is crucial when processing files that may contain
              blank lines. Use the <code>rstrip('\n')</code> method to strip the
              newline when comparing.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
line = f.readline()<br />
if line == '\n':<br />
    print("Empty line (blank line)")<br />
elif line == '':<br />
    print("End of file reached")<br />
else:<br />
    print(f"Line: {`{line.rstrip()}`}")
              </code>
            </pre>
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
                    Processing Student Records
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school in Naihati stores student names one per line in
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">students.txt</code>. The
                    attendance system uses <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readline()</code>
                    in a loop to load names one by one, checking each against
                    the attendance list.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Parsing CSV Files
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A data analyst in Shyamnagar processes a CSV file with
                    thousands of rows. Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readline()</code>,
                    they read the header first, then process each data row
                    without loading the entire file into memory.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📋</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Reading Log Files
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A system administrator in Barrackpore monitors server logs.
                    The log analysis script reads the log file line by line using
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">readline()</code>, filtering
                    for errors and warnings without keeping the entire log in memory.
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
            The following examples demonstrate the <code>readline()</code> method.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={readlineBasic}
              title="Basic readline() Usage"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readlineLoop}
              title="Reading Lines in a Loop"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readlineSize}
              title="Using the size Parameter"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readlineEmpty}
              title="Handling Empty Lines and EOF"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readlineVsRead}
              title="readline() vs read()"
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
                title: "Use `for line in f` for simplicity",
                desc: "It's the most Pythonic way to read lines; it handles EOF automatically.",
              },
              {
                title: "Strip newlines with `rstrip('\\n')`",
                desc: "Remove the newline character while preserving other whitespace.",
              },
              {
                title: "Use `strip()` to remove all whitespace",
                desc: "Useful when you want to clean up the line completely.",
              },
              {
                title: "Handle empty lines correctly",
                desc: "Distinguish between `''` (EOF) and `'\\n'` (empty line).",
              },
              {
                title: "Use `readline()` with `seek()`",
                desc: "Navigate to a position, then read the next line.",
              },
              {
                title: "Binary mode with `readline()`",
                desc: "Works with `\\n` byte; returns bytes instead of string.",
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
                mistake: "Not handling EOF correctly (infinite loop)",
                fix: "Always check `if not line: break` when using `while True`.",
              },
              {
                mistake: "Forgetting that readline() includes the newline",
                fix: "Use `line.strip()` or `line.rstrip('\\n')`.",
              },
              {
                mistake: "Confusing empty lines with EOF",
                fix: "Empty line is `'\\n'`, EOF is `''`.",
              },
              {
                mistake: "Using `readline()` on a closed file",
                fix: "Always use `with` to ensure the file is open.",
              },
              {
                mistake: "Using `size` and not handling partial lines",
                fix: "If you use `size`, be prepared to read the rest of the line in another call.",
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
                    Prefer iteration (`for line in f`) over manual readline():
                  </strong>{" "}
                  It's simpler, more Pythonic, and less error‑prone.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Always strip newlines when needed:
                  </strong>{" "}
                  Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">rstrip('\n')</code> for
                  predictable behavior.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `with` for automatic file closure:
                  </strong>{" "}
                  Never forget to close the file.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Handle empty lines explicitly:
                  </strong>{" "}
                  Know the difference between <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'\n'</code> and <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">''</code>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `readline()` when you need precise control:
                  </strong>{" "}
                  When you need to pause, restart, or read specific numbers of lines.
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
                "The `readline()` method and its parameters",
                "How `readline()` handles newlines and EOF",
                "The difference between an empty line and EOF",
                "How to read lines in a loop correctly",
                "The `size` parameter and its effects",
                "When to use `readline()` vs iteration",
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
                  What does <code>readline()</code> return if the file has a
                  blank line (just a newline) vs the end of the file?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a script that reads a file with <code>readline()</code>
                  and skips empty lines. How do you detect and skip them?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  If you have a CSV file with a header line, how would you use
                  <code>readline()</code> to read the header separately from the data?
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
            title="Reading with readline() – FAQs"
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
              "`readline()` is the workhorse for text file processing. Students " +
              "should understand that it's line‑oriented, not character‑oriented. " +
              "The distinction between an empty line (`'\\n'`) and EOF (`''`) is " +
              "critical and often misunderstood. Emphasize that `for line in f` " +
              "is the preferred way for most cases, but `readline()` gives more " +
              "control. Show them how to strip newlines properly and how to handle " +
              "files that may or may not end with a newline. The CSV use case is " +
              "particularly powerful for showing practical application."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 15: Reading Files using readline() · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 16 — Reading Files using readlines()</p>
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

export default Topic15;