import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import getCWD from "./topic5_files/get_cwd.py?raw";
import changeCWD from "./topic5_files/change_cwd.py?raw";
import scriptLocation from "./topic5_files/script_location.py?raw";
import relativePathIssue from "./topic5_files/relative_path_issue.py?raw";
import pathlibCWD from "./topic5_files/pathlib_cwd.py?raw";

// FAQ data
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Current Working Directory
 *
 * This component explains the concept of the current working directory (CWD),
 * how to get and change it, and the importance of understanding it for file
 * operations.
 */
const Topic5 = () => {
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
            Topic 5
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Fundamentals
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Current Working Directory
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          Understanding where your program is "standing" in the file system —
          and how it affects file paths.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📂 CWD
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔄 os.getcwd()
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            📍 os.chdir()
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: WHAT IS CWD ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📍</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What is the Current Working Directory?
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <strong className="text-gray-900 dark:text-white">current working directory</strong>{" "}
              (CWD) is the directory in which a process (like your Python
              script) is operating. When you use a <strong>relative path</strong>,
              it is resolved relative to the CWD.
            </p>
            <p>
              Think of it as your "current position" in the file system tree. If
              you're in <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/home/swadeep/projects</code>,
              then <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">data.csv</code> refers to{" "}
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/home/swadeep/projects/data.csv</code>.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                💡 Key Insight:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                The CWD is <em>not</em> necessarily the same as the directory
                containing your script. This is a common source of confusion.
              </p>
            </div>
          </div>

          {/* SVG: CWD in File System */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg viewBox="0 0 700 180" className="w-full max-w-3xl h-auto">
                <text x="350" y="25" textAnchor="middle" fill="#6B7280" fontSize="14">File System with CWD</text>
                {/* Root */}
                <rect x="300" y="40" width="100" height="30" rx="4" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1.5" />
                <text x="350" y="60" textAnchor="middle" fill="#60A5FA" fontSize="14" fontFamily="monospace">/ (root)</text>

                <line x1="350" y1="70" x2="200" y2="100" stroke="#9CA3AF" strokeWidth="1.5" />
                <line x1="350" y1="70" x2="500" y2="100" stroke="#9CA3AF" strokeWidth="1.5" />

                <rect x="150" y="100" width="100" height="30" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
                <text x="200" y="120" textAnchor="middle" fill="#34D399" fontSize="13" fontFamily="monospace">home/</text>

                <rect x="450" y="100" width="100" height="30" rx="4" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
                <text x="500" y="120" textAnchor="middle" fill="#FBBF24" fontSize="13" fontFamily="monospace">var/</text>

                <line x1="200" y1="130" x2="150" y2="155" stroke="#9CA3AF" strokeWidth="1.5" />
                <line x1="200" y1="130" x2="250" y2="155" stroke="#9CA3AF" strokeWidth="1.5" />

                <rect x="100" y="155" width="100" height="25" rx="4" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="1.5" />
                <text x="150" y="172" textAnchor="middle" fill="#A78BFA" fontSize="12" fontFamily="monospace">user/</text>

                {/* Highlight CWD */}
                <rect x="200" y="155" width="100" height="25" rx="4" fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" from="0" to="14" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="250" y="172" textAnchor="middle" fill="#F87171" fontSize="12" fontFamily="monospace">projects/</text>

                <text x="250" y="195" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="bold">← CWD</text>
                <text x="380" y="172" fill="#6B7280" fontSize="12">Relative path "data.csv" → /home/user/projects/data.csv</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              The CWD is your current position in the file system. Relative
              paths are resolved from here.
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: GETTING THE CWD ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔍</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Getting the CWD in Python
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              There are two primary ways to get the CWD in Python:
            </p>
            <ul>
              <li>
                <strong>Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.getcwd()</code></strong> —
                returns the current working directory as a string.
              </li>
              <li>
                <strong>Using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">pathlib.Path.cwd()</code></strong> —
                returns a <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">Path</code> object representing the CWD.
              </li>
            </ul>
            <p>
              Both methods give you the absolute path of the directory from
              which your Python process was started.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800/50 mt-4">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              💡 <strong>Tip:</strong> Print the CWD early in your script to
              verify where you are. It's a great debugging practice.
            </p>
          </div>
        </section>

        {/* ====== SECTION 3: CHANGING THE CWD ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔄</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Changing the CWD
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              You can change the CWD using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.chdir(path)</code>.
              This changes the working directory for the entire Python process.
            </p>
            <p>
              Changing the CWD can be useful when:
            </p>
            <ul>
              <li>You want to simplify relative paths for a group of files.</li>
              <li>You're working with a legacy codebase that expects a specific CWD.</li>
              <li>You're processing files in a different location temporarily.</li>
            </ul>
            <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl">
              <p className="text-red-700 dark:text-red-300 font-medium">
                ⚠️ Caution:
              </p>
              <p className="text-red-600 dark:text-red-400 text-sm">
                Changing the CWD affects <em>all</em> file operations in your
                script. Use it sparingly and consider restoring the original CWD
                when done.
              </p>
            </div>
          </div>
        </section>

        {/* ====== SECTION 4: CWD vs SCRIPT LOCATION ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🎯</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              CWD vs Script Location
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The most common confusion for beginners is assuming the CWD is the
              same as the script's directory. They are often different.
            </p>
            <ul>
              <li>
                <strong>CWD:</strong> Where the process was started (e.g., the
                terminal's current directory).
              </li>
              <li>
                <strong>Script location:</strong> Where the script file itself
                resides (given by <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">__file__</code>).
              </li>
            </ul>
            <p>
              For example, if you run <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">python /home/user/script.py</code> from
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/tmp</code>, the CWD is <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/tmp</code>,
              but the script is in <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/home/user</code>.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                📌 Professional Practice:
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                To build paths relative to the script, use{" "}
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.path.dirname(__file__)</code>.
                Do not rely on the CWD for your script's location.
              </p>
            </div>
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
                <span className="text-3xl">🏫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    School Management System in Naihati
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school's admin runs a script from
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/opt/school/bin</code> to generate reports.
                    The script uses relative paths like <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">../data/students.csv</code>.
                    However, if someone runs the script from <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">/home/admin</code>,
                    the relative path breaks. The solution is to compute paths
                    relative to <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">__file__</code>.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💻</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Data Analysis Script in Shyamnagar
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A data scientist in Shyamnagar has a script that processes
                    CSV files. She often changes the CWD to the data directory
                    using <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">os.chdir('/data/projects')</code> to simplify
                    file references. This is a common pattern in batch processing.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Web Application Configuration
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A web app in Barrackpore loads its config from
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">config/settings.ini</code>.
                    The app is started from different directories during
                    development and production. The code uses{" "}
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">__file__</code> to build the path,
                    ensuring it always finds the config regardless of the CWD.
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
            The following examples demonstrate how to get, change, and use the
            CWD effectively.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={getCWD}
              title="Getting the CWD with os and pathlib"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={changeCWD}
              title="Changing the CWD"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={scriptLocation}
              title="Finding Script Location vs CWD"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={relativePathIssue}
              title="Relative Path Pitfall with CWD"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={pathlibCWD}
              title="Modern pathlib CWD Methods"
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
                title: "Print CWD at the start of scripts",
                desc: "A simple `print(os.getcwd())` can save hours of debugging path issues.",
              },
              {
                title: "Use `os.chdir()` with caution",
                desc: "Prefer using absolute paths or `__file__`-based paths over changing CWD.",
              },
              {
                title: "Restore original CWD after changes",
                desc: "Save the original CWD with `old_cwd = os.getcwd()` and restore it later.",
              },
              {
                title: "Use `with` context for temporary CWD changes",
                desc: "Create a context manager that changes and restores the CWD automatically.",
              },
              {
                title: "Prefer `pathlib.Path` for CWD",
                desc: "`Path.cwd()` gives you a Path object with all its useful methods.",
              },
              {
                title: "Be aware of symlinks and CWD",
                desc: "If you `chdir` into a symlink, the CWD will follow the symlink.",
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
                mistake: "Assuming CWD is the script's directory",
                fix: "Use `os.path.dirname(__file__)` for script‑relative paths.",
              },
              {
                mistake: "Changing CWD and not restoring it",
                fix: "Save the original CWD and restore it after operations.",
              },
              {
                mistake: "Using relative paths without knowing CWD",
                fix: "Always print or log the CWD when debugging file operations.",
              },
              {
                mistake: "Forgetting that `os.chdir()` is global",
                fix: "Be aware that it affects the entire process, including imported modules.",
              },
              {
                mistake: "Not handling PermissionError when changing CWD",
                fix: "Wrap `os.chdir()` in a try‑except block.",
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
                    Use `__file__` for script‑relative paths:
                  </strong>{" "}
                  This makes your code robust regardless of the CWD.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Avoid changing CWD unless necessary:
                  </strong>{" "}
                  It can cause side effects and confusion.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Prefer `pathlib.Path` for path operations:
                  </strong>{" "}
                  It's cleaner and less error‑prone.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Document CWD assumptions:
                  </strong>{" "}
                  If your script relies on a specific CWD, make it explicit.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use context managers for temporary CWD changes:
                  </strong>{" "}
                  They ensure restoration even if an exception occurs.
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
                "What the current working directory is",
                "How to get the CWD with `os.getcwd()` and `Path.cwd()`",
                "How to change the CWD with `os.chdir()`",
                "The difference between CWD and script location (`__file__`)",
                "Why relative paths depend on the CWD",
                "Common pitfalls and how to avoid them",
                "Best practices for writing robust path code",
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
                  When you run a Python script from VS Code's integrated
                  terminal, what is the CWD? Is it the project root or the
                  script's folder?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  Write a script that prints its CWD and its own location. Run
                  it from different directories (e.g., from the parent directory
                  using `python subfolder/script.py`). What do you observe?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  A project in Ichapur has a script that reads a config file
                  from <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">../config.ini</code>.
                  Why does it fail when run from a cron job that starts in the
                  user's home directory? How would you fix it?
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
            title="Current Working Directory – FAQs"
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
              "This is a critical concept that often trips up beginners. " +
              "Use live demonstrations: run a script from different directories " +
              "and show how the CWD affects file access. Emphasize the distinction " +
              "between CWD and script location. Teach the `__file__` trick early — " +
              "it's a simple pattern that avoids many bugs. Also, introduce `pathlib` " +
              "as the modern way, as it encourages thinking in Path objects rather " +
              "than strings."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 5: Current Working Directory · Built with ❤️ for classroom
            learning
          </p>
          <p className="mt-1">Next: Topic 6 — Opening Files with open()</p>
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

export default Topic5;