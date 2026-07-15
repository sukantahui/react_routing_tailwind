import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import binaryReadMode from "./topic10_files/binary_read_mode.py?raw";
import binaryWriteMode from "./topic10_files/binary_write_mode.py?raw";
import binaryAppendMode from "./topic10_files/binary_append_mode.py?raw";
import binaryReadWriteModes from "./topic10_files/binary_read_write_modes.py?raw";
import imageCopyExample from "./topic10_files/image_copy_example.py?raw";
import structBinaryExample from "./topic10_files/struct_binary_example.py?raw";

// FAQ data
import questions from "./topic10_files/topic10_questions";

/**
 * Topic10: Binary File Modes (rb, wb, ab, rb+, wb+, ab+)
 *
 * This component explains all binary file modes in Python:
 * - 'rb': Read binary (file must exist)
 * - 'wb': Write binary (creates/overwrites)
 * - 'ab': Append binary (creates/appends)
 * - 'rb+': Read and write binary (no truncate)
 * - 'wb+': Read and write binary (truncate)
 * - 'ab+': Read and append binary (appends)
 */
const Topic10 = () => {
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
            Topic 10
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Core
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Binary File Modes (rb, wb, ab, rb+, wb+, ab+)
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Working with binary files: the complete set of modes for reading,
          writing, appending, and combining operations.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📖 rb
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ✍️ wb
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ➕ ab
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📖✍️ rb+
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ✍️📖 wb+
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📖➕ ab+
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
              Binary Modes Overview
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Binary file modes are the <strong>binary counterparts</strong> to
              the text modes. They are used when working with non‑text data like
              images, audio, video, executables, or custom binary formats.
            </p>
            <p>
              The key difference is that binary modes work with <strong>bytes</strong>
              instead of strings. No encoding/decoding is applied — you get raw
              bytes exactly as they are on disk.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Adding <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'b'</code> to any text
                mode switches it to binary mode. All the same rules apply, but
                you work with <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">bytes</code>.
              </p>
            </div>
          </div>

          {/* SVG: Binary Mode Overview */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 160" className="w-full max-w-3xl h-auto">
                <text x="350" y="25" textAnchor="middle" fill="#6B7280" fontSize="14">Binary Modes at a Glance</text>

                <rect x="20" y="40" width="100" height="50" rx="6" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" />
                <text x="70" y="63" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="600">rb</text>
                <text x="70" y="80" textAnchor="middle" fill="#93C5FD" fontSize="11">Read</text>

                <rect x="130" y="40" width="100" height="50" rx="6" fill="#EF4444" fillOpacity="0.15" stroke="#EF4444" strokeWidth="2" />
                <text x="180" y="63" textAnchor="middle" fill="#F87171" fontSize="16" fontWeight="600">wb</text>
                <text x="180" y="80" textAnchor="middle" fill="#FCA5A5" fontSize="11">Write</text>

                <rect x="240" y="40" width="100" height="50" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2" />
                <text x="290" y="63" textAnchor="middle" fill="#34D399" fontSize="16" fontWeight="600">ab</text>
                <text x="290" y="80" textAnchor="middle" fill="#6EE7B7" fontSize="11">Append</text>

                <rect x="350" y="40" width="100" height="50" rx="6" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2" />
                <text x="400" y="63" textAnchor="middle" fill="#A78BFA" fontSize="16" fontWeight="600">rb+</text>
                <text x="400" y="80" textAnchor="middle" fill="#C4B5FD" fontSize="11">Read+Write</text>

                <rect x="460" y="40" width="100" height="50" rx="6" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="2" />
                <text x="510" y="63" textAnchor="middle" fill="#FBBF24" fontSize="16" fontWeight="600">wb+</text>
                <text x="510" y="80" textAnchor="middle" fill="#FCD34D" fontSize="11">Write+Read</text>

                <rect x="570" y="40" width="100" height="50" rx="6" fill="#EC4899" fillOpacity="0.15" stroke="#EC4899" strokeWidth="2" />
                <text x="620" y="63" textAnchor="middle" fill="#F472B6" fontSize="16" fontWeight="600">ab+</text>
                <text x="620" y="80" textAnchor="middle" fill="#F9A8D4" fontSize="11">Append+Read</text>

                <text x="180" y="130" textAnchor="middle" fill="#6B7280" fontSize="12">All work with bytes, not strings</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              Binary modes are identical to text modes in behavior, but operate on bytes.
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: BASIC BINARY MODES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📖✍️➕</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Basic Binary Modes: rb, wb, ab
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Data type</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'rb'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">bytes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'wb'</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">bytes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'ab'</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">bytes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800/50">
              <h4 className="font-semibold text-gray-900 dark:text-white">'rb' – Read Binary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Read raw bytes from an existing file.</p>
              <code className="text-xs block mt-2 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">with open('img.jpg', 'rb') as f: data = f.read()</code>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4 border border-red-200 dark:border-red-800/50">
              <h4 className="font-semibold text-gray-900 dark:text-white">'wb' – Write Binary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Write bytes, creating/overwriting.</p>
              <code className="text-xs block mt-2 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">with open('output.bin', 'wb') as f: f.write(b'\x00\x01\x02')</code>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-800/50">
              <h4 className="font-semibold text-gray-900 dark:text-white">'ab' – Append Binary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Append bytes to the end of a file.</p>
              <code className="text-xs block mt-2 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">with open('log.bin', 'ab') as f: f.write(b'\x03\x04')</code>
            </div>
          </div>
        </section>

        {/* ====== SECTION 3: READ+WRITE BINARY MODES ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📖✍️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Read+Write Binary Modes: rb+, wb+, ab+
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
                  <td className="px-6 py-4 font-mono text-sm font-bold">'rb+'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">Pointer position</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'wb+'</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">Start</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm font-bold">'ab+'</td>
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
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800/50">
              <h4 className="font-semibold text-gray-900 dark:text-white">'rb+' – Read+Write Binary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Read and write bytes; file must exist.</p>
              <code className="text-xs block mt-2 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">with open('data.bin', 'rb+') as f: data = f.read(4); f.write(b'\xFF')</code>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800/50">
              <h4 className="font-semibold text-gray-900 dark:text-white">'wb+' – Write+Read Binary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Write bytes, then read back; truncates.</p>
              <code className="text-xs block mt-2 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">with open('out.bin', 'wb+') as f: f.write(b'data'); f.seek(0); f.read()</code>
            </div>
            <div className="bg-pink-50 dark:bg-pink-950/30 rounded-xl p-4 border border-pink-200 dark:border-pink-800/50">
              <h4 className="font-semibold text-gray-900 dark:text-white">'ab+' – Append+Read Binary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Append bytes; reads start at beginning.</p>
              <code className="text-xs block mt-2 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">with open('log.bin', 'ab+') as f: f.read(); f.write(b'\x05')</code>
            </div>
          </div>
        </section>

        {/* ====== SECTION 4: BYTES VS STRINGS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔤</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Bytes vs Strings in Binary Mode
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              In binary mode, you work with <strong className="text-gray-900 dark:text-white">bytes</strong>
              objects, not strings. This is the most important difference from
              text mode.
            </p>
            <ul>
              <li>
                <strong>Reading:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">f.read()</code> returns <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">bytes</code>.
              </li>
              <li>
                <strong>Writing:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">f.write()</code> expects <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">bytes</code>.
              </li>
              <li>
                <strong>Conversion:</strong> Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">.encode()</code> to convert strings to bytes,
                and <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">.decode()</code> to convert bytes to strings.
              </li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                ⚠️ Common Error:
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                Trying to write a string to a binary file raises a TypeError.
                Always convert to bytes first: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">f.write('text'.encode())</code>.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mt-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              # String → Bytes (encode)<br />
              text = "Hello, Swadeep!"<br />
              bytes_data = text.encode('utf-8')  # b'Hello, Swadeep!'<br /><br />
              # Bytes → String (decode)<br />
              original = bytes_data.decode('utf-8')  # 'Hello, Swadeep!'
            </code>
          </div>
        </section>

        {/* ====== SECTION 5: REAL-WORLD SCENARIOS ====== */}
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
                <span className="text-3xl">🖼️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Reading Student Photos ('rb')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school in Ichapur stores student profile pictures as
                    JPEG files. A Python script uses <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'rb'</code>
                    to read the image bytes for processing or displaying on a
                    website.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💾</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Saving Serialized Data ('wb')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A data processing pipeline in Barrackpore uses Python's
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">pickle</code> module to save
                    processed data. The pickle format is binary, so the file is
                    opened with <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'wb'</code>.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📝</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Binary Log Appending ('ab')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    An IoT device in Shyamnagar records sensor readings as
                    binary data. Each reading is appended to a file using
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'ab'</code>, preserving the
                    entire history.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800/50 transition-all duration-300 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📦</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    In-Place Binary Editing ('rb+')
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A file recovery tool in Naihati needs to modify specific
                    bytes in a binary file (e.g., fixing a corrupted header).
                    Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">'rb+'</code>, it reads,
                    modifies, and writes back without truncating.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SECTION 6: PYTHON CODE EXAMPLES ====== */}
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
            The following examples demonstrate all binary modes in practical
            scenarios.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={binaryReadMode}
              title="Reading Binary Files ('rb')"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={binaryWriteMode}
              title="Writing Binary Files ('wb')"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={binaryAppendMode}
              title="Appending Binary Files ('ab')"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={binaryReadWriteModes}
              title="Read+Write Binary Modes (rb+, wb+, ab+)"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={imageCopyExample}
              title="Copying an Image (Binary I/O)"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={structBinaryExample}
              title="Working with Structured Binary Data"
              highlightLines={[]}
            />
          </div>
        </section>

        {/* ====== SECTION 7: TIPS & TRICKS ====== */}
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
                title: "Always use 'b' for non‑text files",
                desc: "Images, audio, video, executables, and pickle files must be opened in binary mode.",
              },
              {
                title: "Use `struct` for structured binary data",
                desc: "The `struct` module helps pack/unpack binary data (integers, floats).",
              },
              {
                title: "Read in chunks for large files",
                desc: "Use `f.read(chunk_size)` to avoid memory overload.",
              },
              {
                title: "Check for `\x00` (null bytes) in text",
                desc: "If a file contains null bytes, it's likely binary, not text.",
              },
              {
                title: "Use `memoryview` for efficient slicing",
                desc: "Avoid copying large byte slices; use memoryview for zero‑copy operations.",
              },
              {
                title: "Prefer `pathlib` with binary modes",
                desc: "`Path('file.bin').open('rb')` works seamlessly.",
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

        {/* ====== SECTION 8: COMMON MISTAKES ====== */}
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
                mistake: "Using text mode for images (leads to corruption)",
                fix: "Always use 'rb' or 'wb' for non‑text files.",
              },
              {
                mistake: "Writing a string to a binary file (TypeError)",
                fix: "Use `.encode()` or convert to bytes first.",
              },
              {
                mistake: "Trying to read a binary file as text (UnicodeDecodeError)",
                fix: "Open with 'rb' and work with bytes.",
              },
              {
                mistake: "Forgetting that 'wb+' truncates the file",
                fix: "Use 'rb+' if you need to preserve existing data.",
              },
              {
                mistake: "Not handling EOF when reading binary chunks",
                fix: "Check if `read()` returns less than the requested size.",
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

        {/* ====== SECTION 9: BEST PRACTICES ====== */}
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
                    Use binary mode for all non‑text files:
                  </strong>{" "}
                  Images, audio, video, executables, compressed data.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Always specify 'b' explicitly:
                  </strong>{" "}
                  Don't rely on default 'r' or 'w' for binary files.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `with` for automatic cleanup:
                  </strong>{" "}
                  Even in binary mode, context managers are best practice.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Validate binary data with checksums:
                  </strong>{" "}
                  For critical binary data, add checksums to detect corruption.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Document your binary format:
                  </strong>{" "}
                  Binary formats are opaque; document the byte layout for maintainers.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 10: MINI CHECKLIST ====== */}
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
                "All binary modes: rb, wb, ab, rb+, wb+, ab+",
                "The difference between binary and text modes",
                "How to work with bytes vs strings",
                "When to use each binary mode",
                "How to read/write binary data in chunks",
                "Using `struct` for structured binary data",
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

        {/* ====== SECTION 11: HINT SECTION ====== */}
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
                  What happens if you open a JPEG image in text mode ('r')? What
                  error do you get?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a program that reads a binary file, prints the first 16
                  bytes in hex, and then writes them to a new file. What happens
                  if you try to open the new file in a text editor?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why do databases and network protocols use binary formats?
                  What advantages do they have over text?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SECTION 12: FAQ ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <FAQTemplate
            title="Binary File Modes – FAQs"
            questions={questions}
          />
        </section>

        {/* ====== SECTION 13: TEACHER'S NOTE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <Teacher
            note={
              "Binary modes are essential for handling non‑text data. Students " +
              "often struggle with the bytes/string distinction. Use concrete " +
              "examples: reading an image and copying it, or reading a binary " +
              "file and displaying hex. Emphasize that text is a subset of binary " +
              "— it's all bytes, just interpreted differently. The `struct` module " +
              "is a great way to show how binary data represents numbers. Also, " +
              "point out that many real‑world formats (JPEG, PNG, PDF) are binary."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 10: Binary File Modes · Built with ❤️ for classroom learning
          </p>
          <p className="mt-1">Next: Topic 11 — Closing Files</p>
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

export default Topic10;