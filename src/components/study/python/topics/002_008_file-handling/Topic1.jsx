import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// Common Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python code examples
import noFileHandling from "./topic1_files/no_file_handling.py?raw";
import fileHandlingSave from "./topic1_files/file_handling_save.py?raw";
import fileHandlingLoad from "./topic1_files/file_handling_load.py?raw";
import loggingExample from "./topic1_files/logging_example.py?raw";

// FAQ data
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Why File Handling is Needed
 *
 * This component explains the fundamental reasons for file handling:
 * data persistence, volatility of RAM, business continuity, and more.
 */
const Topic1 = () => {
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
            Topic 1
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Foundation
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Why File Handling is Needed
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-3xl">
          From volatile memory to permanent storage — understanding the
          non‑negotiable need for persistent data.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            💾 Persistence
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            ⚡ Volatility
          </span>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            🔁 State Preservation
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* ====== SECTION 1: THE VOLATILITY PROBLEM ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🧠</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Volatility Problem
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">RAM</strong>{" "}
              (Random Access Memory) is volatile — it loses all data when power
              is cut. Every variable, list, and object you create in a program
              lives only in RAM. When the program ends or the computer shuts
              down, that data is gone forever.
            </p>
            <p>
              This is the fundamental problem that file handling solves. Without
              a way to write data to <strong className="text-gray-900 dark:text-white">
                non‑volatile storage
              </strong>{" "}
              (hard drives, SSDs, USB drives), every application would start
              from scratch each time it runs.
            </p>
            <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl">
              <p className="text-red-700 dark:text-red-300 font-medium">
                ⚡ Thought Experiment:
              </p>
              <p className="text-red-600 dark:text-red-400 text-sm">
                Imagine you're writing a story in a text editor. You type 500
                words, then your computer crashes. When you restart, the story
                is gone — unless you saved it to a file. That's volatility in
                action.
              </p>
            </div>
          </div>

          {/* SVG: Volatile vs Persistent */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
            <div className="flex justify-center">
              <svg
                viewBox="0 0 700 200"
                className="w-full max-w-3xl h-auto"
                aria-label="Comparison of volatile and persistent storage"
              >
                {/* Volatile (RAM) */}
                <rect x="40" y="30" width="260" height="120" rx="12" fill="#EF4444" fillOpacity="0.12" stroke="#EF4444" strokeWidth="2" />
                <text x="170" y="70" textAnchor="middle" fill="#EF4444" fontSize="22" fontWeight="700">RAM (Volatile)</text>
                <text x="170" y="100" textAnchor="middle" fill="#F87171" fontSize="16">Data lost on power off</text>
                <text x="170" y="130" textAnchor="middle" fill="#FCA5A5" fontSize="14">⏳ Temporary</text>

                {/* Arrow */}
                <line x1="300" y1="90" x2="380" y2="90" stroke="#6B7280" strokeWidth="3" strokeDasharray="6 4" />
                <text x="340" y="75" textAnchor="middle" fill="#9CA3AF" fontSize="13">Needs</text>
                <text x="340" y="115" textAnchor="middle" fill="#9CA3AF" fontSize="13">Persistence</text>
                <polygon points="380,85 392,90 380,95" fill="#6B7280" />

                {/* Persistent (Disk) */}
                <rect x="400" y="30" width="260" height="120" rx="12" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeWidth="2">
                  <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
                </rect>
                <text x="530" y="70" textAnchor="middle" fill="#10B981" fontSize="22" fontWeight="700">Disk (Persistent)</text>
                <text x="530" y="100" textAnchor="middle" fill="#34D399" fontSize="16">Data survives reboots</text>
                <text x="530" y="130" textAnchor="middle" fill="#6EE7B7" fontSize="14">💾 Permanent</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              Without file handling, your program's data is trapped in volatile
              memory.
            </p>
          </div>
        </section>

        {/* ====== SECTION 2: WHY PERSISTENCE MATTERS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why Persistence Matters
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              File handling is not a luxury — it's a necessity for any
              application that needs to remember information. Here's why:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              {
                icon: "👤",
                title: "User Accounts & Profiles",
                desc: "Without files, every user would have to re‑enter their name, preferences, and settings every time they open an app.",
              },
              {
                icon: "📈",
                title: "Business Continuity",
                desc: "Transaction records, inventory, and financial data must survive system restarts. File handling ensures business operations resume without data loss.",
              },
              {
                icon: "⚙️",
                title: "Application Configuration",
                desc: "Settings like theme, language, and default directories are stored in configuration files.",
              },
              {
                icon: "📜",
                title: "Audit Logs & History",
                desc: "Security and debugging rely on logs that are written to files, preserving a history of events.",
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

        {/* ====== SECTION 3: REAL-WORLD SCENARIOS ====== */}
        <section
          ref={addToRefs}
          className="section-hidden transition-all duration-700 ease-out delay-200"
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
                    School Records in Naihati
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    The school in Naihati maintains a file for each student —
                    Swadeep, Tuhina, Abhronila, and Debangshu. When the teacher
                    enters marks into the system, the data is written to a file.
                    If the computer restarts, the marks are still there. Without
                    file handling, all marks would vanish at the end of each
                    day, making the system useless.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🛒</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    E-Commerce Cart in Barrackpore
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    A customer in Barrackpore adds items to their shopping cart.
                    The cart data is saved to a file (or database) so that if
                    they close the browser and come back later, their items are
                    still there. This is file handling in action, preserving the
                    state of the user's session.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800/50 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Mobile Game Progress
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    When you play a game on your phone and reach level 10, the
                    game writes your progress to a file. When you reopen the
                    game, it reads that file and starts you at level 10. Without
                    file handling, you'd start from level 1 every single time.
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
            The following examples demonstrate the difference between a program
            that loses data and one that persists it using files.
          </p>

          <div className="space-y-6">
            <PythonFileLoader
              fileModule={noFileHandling}
              title="Without File Handling (Data Lost)"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={fileHandlingSave}
              title="Saving Data to a File"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={fileHandlingLoad}
              title="Loading Data from a File"
              highlightLines={[]}
            />
            <PythonFileLoader
              fileModule={loggingExample}
              title="Logging Events to a File"
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
                title: "Save Early, Save Often",
                desc: "In professional applications, data is written to files incrementally to minimise loss in case of crashes.",
              },
              {
                title: "Use Atomic Writes",
                desc: "Write to a temporary file then rename it to the target name — this prevents partial/corrupt files.",
              },
              {
                title: "Choose the Right Format",
                desc: "Text (JSON, CSV, XML) for human readability; binary for performance and compactness.",
              },
              {
                title: "Log Everything",
                desc: "Write logs to files. They're invaluable for debugging and auditing.",
              },
              {
                title: "Handle Errors Gracefully",
                desc: "Always assume a file operation might fail and have a fallback plan.",
              },
              {
                title: "Version Your Files",
                desc: "When writing critical data, keep backups or versioned copies (e.g., data.bak, data.v2).",
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
                mistake: "Not saving data at all",
                fix: "Always write important data to a file or database before the program exits.",
              },
              {
                mistake: "Saving only at the end of the program",
                fix: "If the program crashes, you lose everything. Save periodically.",
              },
              {
                mistake: "Overwriting existing data unintentionally",
                fix: "Use 'a' (append) mode or check if the file exists before writing.",
              },
              {
                mistake: "Ignoring file write errors",
                fix: "Handle exceptions like PermissionError and DiskFullError.",
              },
              {
                mistake: "Storing large amounts of data in a single file without structure",
                fix: "Use structured formats (JSON, CSV) or a database for complex data.",
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
                    Always assume persistence is required:
                  </strong>{" "}
                  Unless it's a purely ephemeral tool, plan for file storage.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Choose the right storage medium:
                  </strong>{" "}
                  Files for small/medium data, databases for large/relational data.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Test with missing files:
                  </strong>{" "}
                  Ensure your program handles first‑run scenarios gracefully.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Use configuration files:
                  </strong>{" "}
                  Store user preferences and environment settings in external files.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 text-lg">✓</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">
                    Document your file format:
                  </strong>{" "}
                  Future maintainers (and your future self) will thank you.
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
                "Why RAM is volatile and what that means for data",
                "The difference between volatile and non‑volatile storage",
                "Why file handling is essential for data persistence",
                "Real‑world use cases (school, retail, games, apps)",
                "How to write a program that saves and loads data",
                "The importance of logging and configuration files",
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
                  When you close a game and reopen it, how does it remember your
                  high score? Where is that number stored?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Try changing this:
                  </strong>{" "}
                  What would happen to an online bank if it didn't save
                  transaction records to disk? How long would that bank stay in
                  business?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-lg">💭</span>
                <p>
                  <strong className="text-gray-900 dark:text-white">
                    Think about:
                  </strong>{" "}
                  A school in Ichapur wants a system that stores student
                  attendance. Why can't they just keep it in a Python list? What
                  happens when the computer shuts down?
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
            title="Why File Handling is Needed – FAQs"
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
              "This topic is crucial because it shifts the student's mindset from " +
              "'programs run in memory' to 'programs manage persistent data'. " +
              "Use the analogy of a whiteboard (RAM) versus a notebook (disk). " +
              "Emphasise that every real‑world application uses some form of " +
              "persistent storage. Show them that without this, applications " +
              "are toys, not tools. Encourage them to think about all the times " +
              "they've relied on data being saved — game progress, documents, " +
              "settings — and connect that to file handling."
            }
          />
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Topic 1: Why File Handling is Needed · Built with ❤️ for classroom
            learning
          </p>
          <p className="mt-1">Next: Topic 2 — Types of Files</p>
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

export default Topic1;