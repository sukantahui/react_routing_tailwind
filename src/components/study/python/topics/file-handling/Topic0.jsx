import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import simpleReadExample from "./topic0_files/simple_read.py?raw";
import simpleWriteExample from "./topic0_files/simple_write.py?raw";
import contextManagerExample from "./topic0_files/context_manager.py?raw";
import exceptionHandlingExample from "./topic0_files/exception_handling.py?raw";

// FAQ data
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: Introduction to File Handling
 *
 * This component introduces the concept of file handling in programming,
 * explaining what it is, why it's needed, and providing real-world context.
 */
const Topic0 = () => {
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
            Topic 0
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Foundation
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Introduction to File Handling
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Understanding how programs interact with files — the bridge between
          volatile memory and persistent storage.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📁 Persistent Storage
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            💾 Data Persistence
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔄 I/O Operations
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS FILE HANDLING ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📂</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What is File Handling?
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">
                File handling
              </strong>{" "}
              is the process of storing, retrieving, and manipulating data on a
              computer's persistent storage (hard drive, SSD, etc.) through a
              program. It's how applications remember information between
              sessions — from a simple text editor saving your notes to a
              complex database system managing millions of records.
            </p>
            <p>
              In Python, file handling is built around the concept of a{" "}
              <strong className="text-gray-900 dark:text-white">file object</strong>
              , which acts as a bridge between your program and the operating
              system's file system. When you open a file, Python creates a
              connection to that file, allowing you to read from it, write to
              it, or both.
            </p>
          </div>

          {/* SVG Illustration: File I/O Flow */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg
                viewBox="0 0 700 260"
                className="w-full max-w-3xl h-auto"
                aria-label="File I/O flow diagram showing program, file, and storage"
              >
                {/* Program box */}
                <rect
                  x="30"
                  y="60"
                  width="160"
                  height="100"
                  rx="16"
                  fill="#3B82F6"
                  fillOpacity="0.15"
                  stroke="#3B82F6"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.6;1;0.6"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text x="110" y="105" textAnchor="middle" fill="#3B82F6" fontSize="20" fontWeight="600">
                  Program
                </text>
                <text x="110" y="132" textAnchor="middle" fill="#60A5FA" fontSize="14">
                  (Memory)
                </text>

                {/* Read arrow */}
                <line
                  x1="190"
                  y1="95"
                  x2="290"
                  y2="95"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-24"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </line>
                <text x="240" y="82" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="500">
                  Read
                </text>
                <polygon points="290,90 300,95 290,100" fill="#10B981" />

                {/* Write arrow (below) */}
                <line
                  x1="190"
                  y1="125"
                  x2="290"
                  y2="125"
                  stroke="#F59E0B"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-24"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </line>
                <text x="240" y="148" textAnchor="middle" fill="#F59E0B" fontSize="14" fontWeight="500">
                  Write
                </text>
                <polygon points="290,120 300,125 290,130" fill="#F59E0B" />

                {/* File box */}
                <rect
                  x="310"
                  y="55"
                  width="170"
                  height="110"
                  rx="12"
                  fill="#8B5CF6"
                  fillOpacity="0.12"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.6;1;0.6"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text x="395" y="98" textAnchor="middle" fill="#8B5CF6" fontSize="20" fontWeight="600">
                  File
                </text>
                <text x="395" y="125" textAnchor="middle" fill="#A78BFA" fontSize="14">
                  (Buffer)
                </text>

                {/* Persistence arrow */}
                <line
                  x1="480"
                  y1="110"
                  x2="560"
                  y2="110"
                  stroke="#6B7280"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.4;1;0.4"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>
                <text x="520" y="130" textAnchor="middle" fill="#9CA3AF" fontSize="13">
                  Persist
                </text>
                <polygon points="560,105 572,110 560,115" fill="#6B7280" />

                {/* Storage box */}
                <rect
                  x="580"
                  y="50"
                  width="100"
                  height="120"
                  rx="8"
                  fill="#EF4444"
                  fillOpacity="0.10"
                  stroke="#EF4444"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.5;1;0.5"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text x="630" y="98" textAnchor="middle" fill="#EF4444" fontSize="18" fontWeight="600">
                  Disk
                </text>
                <text x="630" y="125" textAnchor="middle" fill="#F87171" fontSize="13">
                  Storage
                </text>

                {/* Labels */}
                <rect x="30" y="210" width="140" height="28" rx="6" fill="#3B82F6" fillOpacity="0.10" />
                <text x="100" y="229" textAnchor="middle" fill="#60A5FA" fontSize="12">
                  🔄 In-Memory
                </text>

                <rect x="310" y="210" width="140" height="28" rx="6" fill="#8B5CF6" fillOpacity="0.10" />
                <text x="380" y="229" textAnchor="middle" fill="#A78BFA" fontSize="12">
                  📄 File System
                </text>

                <rect x="580" y="210" width="100" height="28" rx="6" fill="#EF4444" fillOpacity="0.10" />
                <text x="630" y="229" textAnchor="middle" fill="#F87171" fontSize="12">
                  💾 Persistent
                </text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              Data flows between your program (memory), the file (buffer), and
              permanent storage (disk).
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: WHY FILE HANDLING IS NEEDED ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">❓</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why File Handling is Needed
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Without file handling, every piece of data you enter into a
              program would disappear the moment you close it. Imagine writing a
              letter in a word processor, only to have it vanish when you quit
              the application. That's the reality of programs that don't use
              persistent storage.
            </p>
            <p>
              File handling enables <strong className="text-gray-900 dark:text-white">data persistence</strong> —
              the ability to save information and retrieve it later. This is
              essential for:
            </p>
          </div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              {
                icon: "💾",
                title: "Data Persistence",
                desc: "Save user data, preferences, and application state between sessions.",
              },
              {
                icon: "📊",
                title: "Data Processing",
                desc: "Read large datasets, logs, and configuration files for analysis.",
              },
              {
                icon: "📤",
                title: "Data Exchange",
                desc: "Share data between different applications or systems using common file formats.",
              },
              {
                icon: "📋",
                title: "Reporting",
                desc: "Generate reports, export results, and create output files for users.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== SECTION 3: REAL-WORLD CONTEXT ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌍</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Real-World Context
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🏫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    School Student Records
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    Think of a school in Barrackpore maintaining student
                    records. Each student — Swadeep, Tuhina, Abhronila,
                    Debangshu — has a file containing their marks, attendance,
                    and personal details. When the teacher updates a grade, the
                    program writes to that file. When the principal needs a
                    report, the program reads from those files.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🏪</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Retail Inventory System
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A shop in Shyamnagar uses a program to track inventory. Each
                    product's stock level, price, and supplier information is
                    stored in a file. When a sale happens, the program updates
                    the file. When the owner checks stock, the program reads
                    from the file. This is file handling in action.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Mobile App Preferences
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    When you open a mobile app and it remembers your theme
                    preference, login status, or last viewed page — that's file
                    handling. The app writes your preferences to a configuration
                    file and reads it back when you reopen the app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SECTION 4: PYTHON CODE EXAMPLES ====== */}
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
            Here are simple examples showing how Python interacts with files.
            Don't worry about understanding every detail yet — we'll explore
            each concept in depth throughout this course.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={simpleReadExample}
              title="Reading a File"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={simpleWriteExample}
              title="Writing to a File"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={contextManagerExample}
              title="Using Context Manager (Recommended)"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={exceptionHandlingExample}
              title="Handling File Errors"
              highlightLines={[]}
            />
          </div>
        </section>

        {/* ====== SECTION 5: TIPS & TRICKS ====== */}
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
                title: "Always Use Context Managers",
                desc: "The `with open()` statement automatically closes files, even if exceptions occur. It's the professional way to handle files.",
              },
              {
                title: "Check File Existence First",
                desc: "Before reading a file, check if it exists using `os.path.exists()` to avoid FileNotFoundError.",
              },
              {
                title: "Use Meaningful Filenames",
                desc: "Name your files clearly: `student_records_2024.csv` is better than `data1.csv`.",
              },
              {
                title: "Handle Encoding Explicitly",
                desc: "Always specify encoding like `encoding='utf-8'` when opening text files to avoid platform-specific issues.",
              },
              {
                title: "Close Files Promptly",
                desc: "Files hold system resources. Close them as soon as you're done — or use context managers.",
              },
              {
                title: "Use Buffered I/O for Performance",
                desc: "Python's built-in file handling is buffered by default, which is efficient for most use cases.",
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

        {/* ====== SECTION 6: COMMON MISTAKES ====== */}
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
                mistake: "Forgetting to close files",
                fix: "Use `with open()` context manager or call `.close()` explicitly.",
              },
              {
                mistake: "Assuming a file exists before reading",
                fix: "Use `os.path.exists()` or handle FileNotFoundError with try-except.",
              },
              {
                mistake: "Not handling file encoding issues",
                fix: "Always specify `encoding='utf-8'` for text files.",
              },
              {
                mistake: "Writing to a file in read mode",
                fix: "Check the file mode you're using: 'r' for read, 'w' for write, 'a' for append.",
              },
              {
                mistake: "Using absolute paths without portability",
                fix: "Use relative paths or `os.path.join()` for cross-platform compatibility.",
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

        {/* ====== SECTION 7: BEST PRACTICES ====== */}
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
                    Use context managers:
                  </strong>{" "}
                  Always use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    with open()
                  </code>{" "}
                  for automatic resource cleanup.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Specify encoding:
                  </strong>{" "}
                  Use <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    encoding='utf-8'
                  </code>{" "}
                  for text files to avoid cross-platform issues.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Handle exceptions:
                  </strong>{" "}
                  Use try-except blocks to gracefully handle file-related errors.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use appropriate modes:
                  </strong>{" "}
                  Choose the right file mode ('r', 'w', 'a', 'rb', etc.) for your operation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Check file existence:
                  </strong>{" "}
                  Before reading, verify the file exists using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    os.path.exists()
                  </code>.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ====== SECTION 8: MINI CHECKLIST ====== */}
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
                "What file handling is and why it's needed",
                "The difference between memory and persistent storage",
                "How programs interact with files (read/write)",
                "Real-world applications of file handling",
                "Basic Python file operations (open, read, write, close)",
                "The importance of error handling with files",
                "Why context managers are the preferred approach",
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

        {/* ====== SECTION 9: HINT SECTION ====== */}
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
                  When you save a document in Microsoft Word or Google Docs,
                  where does the data actually go? What happens if you don't
                  save before closing?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  What would happen if a program tried to read a file that
                  doesn't exist? How would you handle that situation gracefully?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  Why might a school in Ichapur need to store student records in
                  files rather than just in memory? What happens when the
                  computer is turned off?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SECTION 10: FAQ ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <FAQTemplate
            title="Introduction to File Handling FAQs"
            questions={questions}
          />
        </section>

        {/* ====== SECTION 11: TEACHER'S NOTE ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <Teacher
            note={
              "File handling is the foundation of data persistence in programming. " +
              "Students often struggle with the concept of 'state' — that memory is " +
              "volatile and files are permanent. Use real-world analogies like saving " +
              "a game or writing a letter to make it relatable. Emphasize that every " +
              "application you've ever used that 'remembers' anything uses file handling " +
              "under the hood. Start with simple text files and gradually introduce " +
              "binary files, CSV, and JSON. The most common mistake beginners make is " +
              "forgetting to close files — hammer this point home with context managers."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 0: Introduction to File Handling · Built with ❤️ for
            classroom learning
          </p>
          <p className="mt-1">
            Next: Topic 1 — Why File Handling is Needed
          </p>
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

        /* Motion-safe: respect reduced motion preferences */
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

export default Topic0;