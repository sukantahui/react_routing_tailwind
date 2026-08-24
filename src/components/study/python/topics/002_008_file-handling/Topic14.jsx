import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import readSizeBasic from "./topic14_files/read_size_basic.py?raw";
import readSizeChunks from "./topic14_files/read_size_chunks.py?raw";
import readSizeBinary from "./topic14_files/read_size_binary.py?raw";
import readSizePartial from "./topic14_files/read_size_partial.py?raw";
import readSizePerformance from "./topic14_files/read_size_performance.py?raw";

// FAQ data
import questions from "./topic14_files/topic14_questions";

/**
 * Topic14: Reading Files using read(size)
 *
 * This component explains the read(size) method, its usage for reading
 * a specific number of characters/bytes, and its application in chunked
 * reading for large files.
 */
const Topic14 = () => {
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
            Topic 14
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Reading Files using `read(size)`
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Controlled reading: reading exactly a specified number of characters
          or bytes from a file.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📏 read(size)
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔄 Chunked Reading
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            💾 Memory‑Efficient
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS read(size) ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📏</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The `read(size)` Method
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read(size)</code> method
              reads up to <code>size</code> number of characters (in text mode)
              or bytes (in binary mode) from the current file position. It is
              the key to <strong>memory‑efficient</strong> file processing.
            </p>
            <ul>
              <li>
                <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">file.read(size)</code>
              </li>
              <li>
                <strong>Return type:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">str</code> (text mode) or
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">bytes</code> (binary mode)
              </li>
              <li>
                <strong>Purpose:</strong> Read a limited amount of data, which
                is essential for handling large files without exhausting memory.
              </li>
              <li>
                <strong>Behavior:</strong> If the file has fewer than
                <code>size</code> characters/bytes remaining, it returns only
                what's available. If it's at EOF, it returns an empty string/bytes.
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read(size)</code> is the
                fundamental building block for streaming file processing.
                Combined with a loop, it enables you to process files of any size.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 2: SYNTAX AND PARAMETERS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📝</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Syntax and Parameters
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <code>read(size)</code> method takes a single parameter:
            </p>
            <ul>
              <li>
                <strong>size:</strong> An integer specifying the maximum number
                of characters (text mode) or bytes (binary mode) to read.
              </li>
            </ul>
            <p>
              <strong>Behavior details:</strong>
            </p>
            <ul>
              <li>
                If <code>size</code> is positive, it reads at most that many
                characters/bytes.
              </li>
              <li>
                If <code>size</code> is negative or omitted, it reads until EOF
                (same as <code>read()</code> without arguments).
              </li>
              <li>
                If <code>size</code> is zero, it returns an empty string/bytes
                and does not advance the file pointer.
              </li>
              <li>
                In text mode, <code>size</code> is measured in <strong>characters</strong>,
                not bytes, due to variable‑length encodings like UTF‑8.
              </li>
              <li>
                In binary mode, <code>size</code> is measured in <strong>bytes</strong>.
              </li>
            </ul>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800/50 mt-4">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              💡 <strong>Note:</strong> The actual number of characters read
              in text mode may be less than <code>size</code> if the file
              contains multi‑byte characters (e.g., UTF‑8). It reads until the
              character boundary is reached.
            </p>
          </div>
        </section>

        {/* ====== SECTION 3: CHUNKED READING PATTERN ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Chunked Reading Pattern
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The most common use of <code>read(size)</code> is to read a file
              in <strong>chunks</strong>. This pattern processes a file
              incrementally, keeping memory usage constant.
            </p>
            <p>
              <strong>Standard pattern:</strong>
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-gray-800 dark:text-gray-200">
with open('large_file.txt', 'r', encoding='utf-8') as f:<br />
    chunk_size = 8192  # 8KB<br />
    while True:<br />
        chunk = f.read(chunk_size)<br />
        if not chunk:  # EOF<br />
            break<br />
        process(chunk)  # process the chunk
              </code>
            </pre>
            <ul>
              <li>
                <strong>Memory:</strong> Only <code>chunk_size</code> bytes are
                in memory at any time.
              </li>
              <li>
                <strong>Speed:</strong> It balances I/O overhead (fewer reads)
                with memory usage.
              </li>
              <li>
                <strong>Flexibility:</strong> You can choose the chunk size
                based on your application's needs.
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 4: CHOOSING CHUNK SIZE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Choosing the Right Chunk Size
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The optimal chunk size depends on your system, disk type, and
              application. Here are some guidelines:
            </p>
            <ul>
              <li>
                <strong>Common sizes:</strong> 4096 (4KB), 8192 (8KB), 16384 (16KB),
                65536 (64KB), 1MB, etc.
              </li>
              <li>
                <strong>Power‑of‑two:</strong> Many file systems use block sizes
                that are powers of two, so these tend to perform well.
              </li>
              <li>
                <strong>Trade‑off:</strong> Smaller chunks reduce memory usage
                but increase I/O calls; larger chunks improve speed but use more
                memory.
              </li>
              <li>
                <strong>Experimentation:</strong> Profile your code with
                different sizes to find the sweet spot for your environment.
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Pro Tip:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                For text files, a chunk size of 8192 or 16384 is a good starting
                point. For binary files (images, videos), larger chunks (e.g.,
                1MB) can be more efficient.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 5: TEXT VS BINARY SIZE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔤</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Text Mode vs Binary Mode: Size Interpretation
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              It's crucial to understand how <code>size</code> is interpreted in
              different modes:
            </p>
            <ul>
              <li>
                <strong>Text mode ('r'):</strong> <code>size</code> is the
                maximum number of <strong>characters</strong> to read. Due to
                encoding (e.g., UTF‑8), one character may be 1-4 bytes. The
                method reads enough bytes to decode at most <code>size</code>
                characters.
              </li>
              <li>
                <strong>Binary mode ('rb'):</strong> <code>size</code> is the
                exact number of <strong>bytes</strong> to read. No decoding is
                performed.
              </li>
            </ul>
            <p>
              This distinction means that in text mode, you may read slightly
              more or fewer bytes than <code>size</code> to ensure you're at a
              character boundary.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800/50 mt-4">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              📌 <strong>Remember:</strong> If you need to read a fixed number
              of <em>bytes</em> regardless of content, use binary mode. For
              text, if you need exact byte control, consider binary mode and
              decode later.
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
                    Processing a Multi‑GB Log File
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A server in Barrackpore generates several gigabytes of log
                    data daily. A monitoring script reads the log in 64KB chunks
                    using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read(65536)</code>,
                    extracts relevant entries, and stores them in a database —
                    all without loading the entire log into memory.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🖼️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Transferring Large Images
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    An image processing pipeline in Shyamnagar reads high‑resolution
                    images (hundreds of MB each) in 1MB chunks using
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">read(1048576)</code>.
                    This allows the pipeline to process images sequentially
                    without running out of memory on the server.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📡</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Streaming Data from a Sensor
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    An IoT device in Naihati writes sensor readings to a file
                    every second. A processing script reads the file in small
                    chunks (e.g., 1024 bytes) to parse each reading as it
                    arrives, demonstrating real‑time chunked processing.
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
            The following examples demonstrate reading files with <code>read(size)</code>.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={readSizeBasic}
              title="Basic read(size) Usage"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readSizeChunks}
              title="Chunked Reading Pattern"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readSizeBinary}
              title="Binary Mode read(size)"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readSizePartial}
              title="Handling Partial Reads"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={readSizePerformance}
              title="Performance Comparison"
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
                title: "Choose a power‑of‑two chunk size",
                desc: "4096, 8192, 16384 are aligned with OS buffers.",
              },
              {
                title: "Profile to find the optimal size",
                desc: "Use `time` or `cProfile` to test different sizes.",
              },
              {
                title: "For text, be aware of character boundaries",
                desc: "`read(size)` may read slightly more bytes to complete a character.",
              },
              {
                title: "Use `while chunk := f.read(size):` (Python 3.8+)",
                desc: "The walrus operator simplifies the loop.",
              },
              {
                title: "Always specify encoding in text mode",
                desc: "Avoid platform‑dependent surprises.",
              },
              {
                title: "Consider using `io.BufferedReader` for buffering",
                desc: "It's built‑in; `open()` already provides buffering.",
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
                mistake: "Using `read(size)` without a loop, expecting to read the whole file",
                fix: "Remember, `read(size)` reads at most `size` characters. Use a loop.",
              },
              {
                mistake: "Not checking for partial reads",
                fix: "Always check if the returned chunk is empty to detect EOF.",
              },
              {
                mistake: "Assuming `size` in text mode is in bytes",
                fix: "It's characters; for exact bytes, use binary mode.",
              },
              {
                mistake: "Choosing a chunk size that is too small, causing many I/O calls",
                fix: "Aim for at least 4KB to avoid overhead.",
              },
              {
                mistake: "Choosing a chunk size that is too large, causing memory bloat",
                fix: "Balance memory vs. I/O performance.",
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
                    Always use chunked reading for large files:
                  </strong>{" "}
                  This is the only way to process files larger than available memory.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use a reasonable chunk size:
                  </strong>{" "}
                  Start with 8192 or 16384 and adjust based on profiling.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Handle EOF correctly:
                  </strong>{" "}
                  Use `if not chunk: break` to exit the loop.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Combine with `with` for automatic close:
                  </strong>{" "}
                  Always use context managers.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Test with representative file sizes:
                  </strong>{" "}
                  Ensure your code handles both small and large files gracefully.
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
                "The `read(size)` method and its parameters",
                "How `size` is interpreted in text vs binary modes",
                "The chunked reading pattern for large files",
                "How to detect EOF correctly",
                "Factors in choosing an appropriate chunk size",
                "Common pitfalls and how to avoid them",
                "Best practices for memory‑efficient file reading",
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
                  What happens if you call `read(5)` on a file containing
                  "Hello world"? What if the file contains "😊" (emoji) — how
                  many characters does `read(1)` return?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a program that reads a large file in chunks of 1024
                  bytes and counts the number of spaces. Compare the speed with
                  reading the whole file at once.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why might a streaming service (like Netflix) use chunked
                  reading? How does it relate to reading a video file in parts?
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
            title="Reading with read(size) – FAQs"
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
              "The `read(size)` method is the workhorse of efficient file " +
              "processing. Students often overlook it and use `read()` on large " +
              "files, leading to memory errors. Use the analogy of eating a pizza: " +
              "you can eat it all at once (if it's small) or slice by slice " +
              "(chunks). Emphasize that chunked reading is not just a trick — " +
              "it's essential for production‑grade code. Show them the performance " +
              "trade‑offs with different chunk sizes. Also, clarify the text vs " +
              "binary distinction, as it's a frequent source of confusion."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 14: Reading Files using read(size) · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 15 — Reading Files using readline()</p>
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

export default Topic14;