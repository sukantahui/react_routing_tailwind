import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import absolutePathExample from "./topic4_files/absolute_path.py?raw";
import relativePathExample from "./topic4_files/relative_path.py?raw";
import pathJoinExample from "./topic4_files/path_join.py?raw";
import pathlibExample from "./topic4_files/pathlib_example.py?raw";
import cwdExample from "./topic4_files/cwd_example.py?raw";

// FAQ data
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: File Paths (Absolute & Relative)
 *
 * This component explains the difference between absolute and relative paths,
 * how to work with them in Python, and best practices for cross-platform
 * compatibility.
 */
const Topic4 = () => {
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
            Topic 4
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Fundamentals
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          File Paths (Absolute & Relative)
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Understanding how to locate files: the difference between absolute and
          relative paths, and how to write portable code.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📂 Absolute
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔗 Relative
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🌍 Cross-platform
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS A FILE PATH ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🗺️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What is a File Path?
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              A <strong className="text-gray-900 dark:text-white">file path</strong> is a
              string that specifies the location of a file or directory in a
              file system. It tells your operating system where to find a
              particular resource.
            </p>
            <p>
              There are two main types of paths:
            </p>
            <ul>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Absolute Path:
                </strong>{" "}
                A complete, unambiguous reference to a location, starting from
                the root of the file system.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Relative Path:
                </strong>{" "}
                A reference to a location relative to the <strong>current
                working directory</strong> (CWD).
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                The same file can be reached by different paths depending on
                where you are in the file system. Understanding this is crucial
                for writing portable code.
              </p>
            </div>
          </div>

          {/* SVG: Path Structure */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 180" className="w-full max-w-3xl h-auto">
                <text x="350" y="30" textAnchor="middle" fill="#6B7280" fontSize="14">File System Tree</text>
                <rect x="300" y="50" width="100" height="30" rx="4" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1.5" />
                <text x="350" y="70" textAnchor="middle" fill="#60A5FA" fontSize="14" fontFamily="monospace">/ (root)</text>

                <line x1="350" y1="80" x2="200" y2="110" stroke="#9CA3AF" strokeWidth="1.5" />
                <line x1="350" y1="80" x2="500" y2="110" stroke="#9CA3AF" strokeWidth="1.5" />
                <line x1="350" y1="80" x2="350" y2="110" stroke="#9CA3AF" strokeWidth="1.5" />

                <rect x="150" y="110" width="100" height="30" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
                <text x="200" y="130" textAnchor="middle" fill="#34D399" fontSize="13" fontFamily="monospace">home/</text>

                <rect x="300" y="110" width="100" height="30" rx="4" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
                <text x="350" y="130" textAnchor="middle" fill="#FBBF24" fontSize="13" fontFamily="monospace">usr/</text>

                <rect x="450" y="110" width="100" height="30" rx="4" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="1.5" />
                <text x="500" y="130" textAnchor="middle" fill="#F87171" fontSize="13" fontFamily="monospace">var/</text>

                <line x1="200" y1="140" x2="150" y2="165" stroke="#9CA3AF" strokeWidth="1.5" />
                <rect x="100" y="150" width="100" height="25" rx="4" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="1.5" />
                <text x="150" y="168" textAnchor="middle" fill="#A78BFA" fontSize="12" fontFamily="monospace">user/</text>

                <rect x="50" y="150" width="45" height="25" rx="4" fill="#EC4899" fillOpacity="0.2" stroke="#EC4899" strokeWidth="1.5" />
                <text x="72" y="168" textAnchor="middle" fill="#F472B6" fontSize="10" fontFamily="monospace">data.txt</text>

                {/* Labels for absolute and relative */}
                <text x="30" y="195" fill="#6B7280" fontSize="12">Absolute: /home/user/data.txt</text>
                <text x="400" y="195" fill="#6B7280" fontSize="12">Relative (from /home/user): data.txt</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              An absolute path starts at the root; a relative path is relative
              to the current working directory.
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: ABSOLUTE PATHS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🏁</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Absolute Paths
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              An <strong className="text-gray-900 dark:text-white">absolute path</strong>{" "}
              (also called a full path) specifies the exact location of a file
              or directory from the root of the file system. It is independent
              of the current working directory.
            </p>
            <ul>
              <li>
                <strong>On Unix/Linux/macOS:</strong> Starts with a slash (e.g.,
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/home/swadeep/projects/main.py</code>).
              </li>
              <li>
                <strong>On Windows:</strong> Starts with a drive letter and colon
                (e.g., <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">C:\Users\Tuhina\Documents\report.docx</code>).
              </li>
            </ul>
            <p>
              Absolute paths are unambiguous, but they make your code
              non‑portable because they rely on a specific folder structure.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800/50 mt-4">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              ⚠️ <strong>Avoid hard‑coding absolute paths</strong> in your code.
              They work only on your machine and break when deployed elsewhere.
            </p>
          </div>
        </section>

        {/* ====== SECTION 3: RELATIVE PATHS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔗</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Relative Paths
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              A <strong className="text-gray-900 dark:text-white">relative path</strong>{" "}
              describes the location of a file relative to the{" "}
              <strong className="text-gray-900 dark:text-white">current working directory</strong>{" "}
              (CWD). It does not start with a root slash or drive letter.
            </p>
            <ul>
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">data/students.csv</code> — points to a subdirectory "data".
              </li>
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">../config/settings.ini</code> — goes up one level to parent directory, then into "config".
              </li>
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">./file.txt</code> — explicitly refers to the current directory ("./") is optional.
              </li>
            </ul>
            <p>
              Relative paths are portable because they adapt to the location of
              the script or the user's current directory.
            </p>
          </div>
        </section>

        {/* ====== SECTION 4: CURRENT WORKING DIRECTORY ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📂</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Current Working Directory (CWD)
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <strong className="text-gray-900 dark:text-white">current working directory</strong>{" "}
              is the directory from which your Python script is executed. When
              you use a relative path, it is interpreted relative to this
              directory.
            </p>
            <p>
              You can get and change the CWD in Python using the <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os</code> module:
            </p>
            <ul>
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.getcwd()</code> — returns the current working directory.
              </li>
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.chdir(path)</code> — changes the current working directory.
              </li>
            </ul>
            <p>
              Knowing the CWD is essential when debugging path‑related issues.
            </p>
          </div>
        </section>

        {/* ====== SECTION 5: PATH SEPARATORS & CROSS-PLATFORM ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Path Separators & Cross-Platform Code
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Different operating systems use different separators:
            </p>
            <ul>
              <li><strong>Unix/Linux/macOS:</strong> Forward slash (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/</code>)</li>
              <li><strong>Windows:</strong> Backslash (<code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">\</code>)</li>
            </ul>
            <p>
              Hard‑coding separators makes your code non‑portable. Instead, use:
            </p>
            <ul>
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.path.join()</code> — joins path components with the correct separator.
              </li>
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">pathlib.Path</code> — object‑oriented paths that handle separators automatically.
              </li>
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.path.sep</code> — the separator character for the current OS.
              </li>
            </ul>
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
                    School Management System in Shyamnagar
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school's Python script reads student data from
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">data/students.csv</code>.
                    Using a relative path makes the script portable; it works
                    whether the script is run from <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/home/admin/</code> or
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/opt/school/</code>, as long as the <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">data/</code> subdirectory is present.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💻</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Cross-Platform Deployment
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A data analysis tool developed in Barrackpore is deployed to
                    both Windows (C:\projects\data\) and Linux (/home/user/data/).
                    Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.path.join('data', 'results.csv')</code> ensures
                    it works on both without modification.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Mobile App Backend
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A backend service in Ichapur stores configuration in
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">config/app.conf</code>. Using a relative path allows
                    the service to be run from any directory during development,
                    while the absolute path is determined at runtime.
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
            The following examples demonstrate working with paths using both
            the traditional <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.path</code> module and the modern
            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">pathlib</code>.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={cwdExample}
              title="Getting & Changing CWD"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={absolutePathExample}
              title="Working with Absolute Paths"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={relativePathExample}
              title="Working with Relative Paths"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={pathJoinExample}
              title="Using os.path.join for Cross-Platform"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={pathlibExample}
              title="Modern pathlib Approach"
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
                title: "Use `__file__` to get script location",
                desc: "`os.path.dirname(__file__)` gives the script's directory — useful for relative paths.",
              },
              {
                title: "Prefer `pathlib` for new code",
                desc: "It's object‑oriented, cross‑platform, and more readable.",
              },
              {
                title: "Normalize paths with `os.path.normpath()`",
                desc: "It resolves `..` and redundant separators, producing a clean path.",
              },
              {
                title: "Use `os.path.abspath()` to get absolute form",
                desc: "Convert a relative path to an absolute one for debugging.",
              },
              {
                title: "Test paths with `os.path.exists()` before opening",
                desc: "Avoid FileNotFoundError by checking existence.",
              },
              {
                title: "Don't hardcode drive letters (Windows)",
                desc: "Use relative or environment‑variable‑based paths instead.",
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
                mistake: "Hard‑coding absolute paths with backslashes on Windows",
                fix: "Use `os.path.join()` or forward slashes (Python accepts them on Windows).",
              },
              {
                mistake: "Assuming the script's directory is the CWD",
                fix: "Use `__file__` to get the script location; CWD can be different.",
              },
              {
                mistake: "Forgetting to handle path separators when concatenating strings",
                fix: "Always use `os.path.join()` or `pathlib.Path /` operator.",
              },
              {
                mistake: "Not normalizing paths, leading to double separators",
                fix: "Use `os.path.normpath()` to clean up.",
              },
              {
                mistake: "Using relative paths when the program runs from a different directory",
                fix: "Change the CWD with `os.chdir()` or construct paths based on `__file__`.",
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
                    Use relative paths for project‑internal files:
                  </strong>{" "}
                  Keeps your code portable and self‑contained.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Prefer `pathlib` over `os.path`:
                  </strong>{" "}
                  It's cleaner and more Pythonic.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use `os.path.join()` or `/` operator:
                  </strong>{" "}
                  Avoid string concatenation with separators.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Make your script robust to CWD changes:
                  </strong>{" "}
                  Base paths on `__file__` when necessary.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Document path assumptions:
                  </strong>{" "}
                  If your code requires a certain file structure, document it.
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
                "The difference between absolute and relative paths",
                "What the current working directory (CWD) is",
                "How to get and change the CWD in Python",
                "Path separators and cross‑platform considerations",
                "How to use `os.path.join()` and `pathlib`",
                "Common mistakes and how to avoid them",
                "Best practices for writing portable path code",
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
                  When you run a Python script from the terminal, what is the
                  CWD? Is it the script's directory or the terminal's directory?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a script that prints its own absolute path using `__file__`
                  and `os.path.abspath()`. Compare that with `os.getcwd()`.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  A project is stored in <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/home/abhronila/project/</code>.
                  The script needs to read a file in <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/home/abhronila/data/</code>.
                  What relative path would you use? What absolute path?
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
            title="File Paths – FAQs"
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
              "This is a fundamental topic that affects every file operation. " +
              "Students often struggle with the concept of CWD and why relative " +
              "paths break when they run scripts from different locations. " +
              "Use the analogy of 'where am I standing?' vs 'where is the object?' " +
              "Emphasize that using `__file__` to build paths relative to the script " +
              "is a professional practice. Also, introduce `pathlib` early — it's " +
              "the modern way and reduces confusion with separators."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 4: File Paths (Absolute & Relative) · Built with ❤️ for
            classroom learning
          </p>
          <p className="mt-1">Next: Topic 5 — Current Working Directory</p>
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

export default Topic4;