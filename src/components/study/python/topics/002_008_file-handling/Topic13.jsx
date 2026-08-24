import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import readFull from "./topic13_files/read_full.py?raw";
import readChunk from "./topic13_files/read_chunk.py?raw";
import readBinary from "./topic13_files/read_binary.py?raw";
import readMemory from "./topic13_files/read_memory.py?raw";
import readEmpty from "./topic13_files/read_empty.py?raw";

// FAQ data
import questions from "./topic13_files/topic13_questions";

/**
 * Topic13: Reading Files using read()
 *
 * This component explains the read() method, its parameters, and how to use it
 * effectively for reading file content.
 */
const Topic13 = () => {
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
            Topic 13
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Reading Files using `read()`
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          The simplest way to read file content: understanding the `read()`
          method and its variants.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📖 read()
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📏 read(size)
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            💾 bytes
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS read() ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📖</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `read()` Method
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read()</code> method is
              used to read the contents of a file. It reads from the current
              position of the file pointer to the end (or up to a specified
              number of bytes/characters).
            </p>
            <ul>
              <li>
                <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">file.read(size=-1)</code>
              </li>
              <li>
                <strong>Return type:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">str</code> (text mode) or
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">bytes</code> (binary mode)
              </li>
              <li>
                <strong>Purpose:</strong> Returns the file content as a single
                string/bytes object.
              </li>
              <li>
                <strong>Parameters:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">size</code> (optional) —
                maximum number of characters/bytes to read. If negative or
                omitted, reads the entire file.
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read()</code> reads the
                entire file at once. For large files, this can cause memory
                issues. Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read(size)</code>
                to read in chunks.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 2: READ ENTIRE FILE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reading the Entire File
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The simplest usage of <code>read()</code> is without arguments,
              which reads the entire file content from the current position to
              the end.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('data.txt', 'r', encoding='utf-8') as f:<br />
    content = f.read()<br />
    print(content)  # entire file as a string
              </code>
            </pre>
            <p>
              This is convenient for <strong>small files</strong> where you need
              the entire content as a single string. However, for large files,
              it can use significant memory.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                ⚠️ Caution:
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                If the file is larger than available memory, reading the entire
                file will cause a <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">MemoryError</code>.
                Always consider the file size before using <code>read()</code>
                without arguments.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 3: READ WITH SIZE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📏</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reading in Chunks (`read(size)`)
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              To avoid loading the entire file into memory, you can pass a
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">size</code> argument to
              <code>read()</code>. This reads up to <code>size</code> bytes
              (or characters in text mode) and returns them.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('large_file.txt', 'r', encoding='utf-8') as f:<br />
    while True:<br />
        chunk = f.read(1024)  # read 1KB at a time<br />
        if not chunk:  # end of file<br />
            break<br />
        process(chunk)  # process the chunk
              </code>
            </pre>
            <p>
              This is the <strong>preferred way</strong> to handle large files
              because it keeps memory usage constant.
            </p>
            <ul>
              <li>
                <strong>Text mode:</strong> <code>size</code> is number of
                characters (not bytes), due to encoding.
              </li>
              <li>
                <strong>Binary mode:</strong> <code>size</code> is number of
                bytes.
              </li>
              <li>
                <strong>Return:</strong> If the file is smaller than
                <code>size</code>, returns only the remaining content.
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 4: READING BINARY ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">💾</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reading Binary Files
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              When reading binary files (images, executables, etc.), you must
              open the file in binary mode (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'rb'</code>).
              In this mode, <code>read()</code> returns <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">bytes</code>
              instead of <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">str</code>.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('image.jpg', 'rb') as f:<br />
    data = f.read()  # returns bytes<br />
    # data is a bytes object, not a string
              </code>
            </pre>
            <p>
              For binary files, reading in chunks is especially important to
              avoid memory issues with large media files.
            </p>
          </div>
        </section>

        {/* ====== SECTION 5: EOF BEHAVIOR ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🏁</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              End-of-File (EOF) Behavior
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              When <code>read()</code> reaches the end of the file, it returns
              an empty string (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">''</code>) in text
              mode or an empty bytes object (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">b''</code>)
              in binary mode.
            </p>
            <p>
              This is how you detect EOF when reading in chunks:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
chunk = f.read(1024)<br />
if not chunk:  # empty string or bytes<br />
    break  # EOF reached
              </code>
            </pre>
            <p>
              Remember that an empty file also returns an empty string/bytes on
              the first read.
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
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Reading a Small Config File
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A school in Barrackpore stores its configuration in a small
                    JSON file. Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read()</code>
                    without arguments loads the entire config into memory for
                    quick processing.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🖼️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Processing Large Log Files
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A web server in Shyamnagar generates gigabytes of log files.
                    The monitoring script reads these logs in chunks using
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read(4096)</code> to avoid
                    running out of memory.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📸</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Copying a Binary File
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A backup script in Naihati copies student photos from one
                    server to another. It reads the image in chunks using
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read(8192)</code> and writes
                    the chunks to the destination, keeping memory usage low.
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
            The following examples demonstrate the `read()` method in various
            scenarios.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={readFull}
              title="Reading Entire File (Simple)"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readChunk}
              title="Reading in Chunks (Memory‑Efficient)"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readBinary}
              title="Reading Binary Files"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readMemory}
              title="Memory Considerations"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readEmpty}
              title="Handling Empty Files & EOF"
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
                title: "Use `read()` without args only for small files",
                desc: "For files under 10MB, it's fine. For larger files, use chunks.",
              },
              {
                title: "Choose a power‑of‑two chunk size",
                desc: "Sizes like 1024, 4096, 8192 are aligned with disk blocks and perform well.",
              },
              {
                title: "Check for empty result to detect EOF",
                desc: "`if not chunk: break` is the standard pattern.",
              },
              {
                title: "Use `read()` with `with` for automatic close",
                desc: "Always combine `read()` with the `with` statement.",
              },
              {
                title: "For binary, use `read()` and process bytes",
                desc: "Work with bytes directly; convert to strings only when needed.",
              },
              {
                title: "Profile your code to choose chunk size",
                desc: "Test different sizes to find the optimal one for your I/O pattern.",
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
                mistake: "Using `read()` on large files, causing MemoryError",
                fix: "Use `read(size)` in a loop to process in chunks.",
              },
              {
                mistake: "Forgetting to open in binary mode for non‑text files",
                fix: "Use 'rb' for images, executables, etc.",
              },
              {
                mistake: "Not handling EOF correctly when reading chunks",
                fix: "Check `if not chunk: break` to stop at end.",
              },
              {
                mistake: "Confusing bytes and strings when reading binary",
                fix: "Binary mode returns bytes; convert with `.decode()` if needed.",
              },
              {
                mistake: "Using `read()` on a closed file",
                fix: "Always use `with` to ensure the file is open.",
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
                    Use `read()` without args only for small files:
                  </strong>{" "}
                  Know the size of your files and choose appropriately.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    For large files, always read in chunks:
                  </strong>{" "}
                  This is the only way to process large files without memory issues.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use binary mode for non‑text data:
                  </strong>{" "}
                  This avoids encoding errors and returns bytes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Combine `read()` with `with` for automatic cleanup:
                  </strong>{" "}
                  Always close the file properly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Test your code with files of various sizes:
                  </strong>{" "}
                  Ensure your code handles both small and large files.
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
                "The `read()` method and its parameters",
                "How to read the entire file at once",
                "How to read in chunks using `read(size)`",
                "The difference between text and binary reading",
                "How to detect EOF correctly",
                "Common pitfalls and how to avoid them",
                "Best practices for memory‑efficient reading",
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
                  What does `read()` return when the file is empty? How can you
                  distinguish an empty file from EOF?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a program that reads a large file in chunks and counts
                  the number of lines. Compare the performance with reading the
                  entire file at once.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why does reading a text file with `read()` return a string,
                  but reading a binary file returns bytes? What implications
                  does this have for processing?
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
            title="Reading with read() – FAQs"
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
              "The `read()` method is the most intuitive way to read files, but " +
              "students must understand its limitations. Use the analogy of drinking " +
              "a glass of water: `read()` without args is like drinking it all at once " +
              "(fine for small glasses, not for a pool). For large files, show them " +
              "the chunk‑by‑chunk approach. Emphasize the EOF detection pattern: " +
              "`if not chunk: break`. Also, highlight the difference between text " +
              "and binary modes — this will save them from many encoding bugs."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 13: Reading Files using read() · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 14 — Reading Files using read(size)</p>
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

export default Topic13;