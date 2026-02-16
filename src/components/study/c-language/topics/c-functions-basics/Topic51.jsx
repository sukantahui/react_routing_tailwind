import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import errorMixed from "./topic51_files/error_mixed.c?raw";
import errorIsolated from "./topic51_files/error_isolated.c?raw";

const Topic51 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
            Using Functions to Isolate Error Handling Logic
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Separate what you want to do from what to do when things go wrong.
          Clean, maintainable, and readable code.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Why Isolate Error Handling?</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Tuhina wrote a function to process a configuration
          file. Every few lines she had <code>{`if (error) { ... }`}</code>. The
          core logic was buried in a sea of error checks. Swadeep refactored it:
          he created helper functions like <code>openConfigFile()</code>{` and{" "}`}
          <code>readConfigLine()</code> that handle errors internally and return
          clean results or error codes. The main function now reads like a story
          – and error handling is isolated, reusable, and testable.
        </p>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {[
          {
            title: "Separation of Concerns",
            desc: "Main logic should not be cluttered with error checks. Move error handling to dedicated functions.",
            icon: "🧹",
          },
          {
            title: "Reusable Error Handlers",
            desc: "Common error patterns (e.g., file not found) can be handled by the same function, reducing duplication.",
            icon: "♻️",
          },
          {
            title: "Clean Happy Path",
            desc: "The main function becomes a sequence of calls, each either succeeding or returning an error code.",
            icon: "🌿",
          },
          {
            title: "Single Responsibility",
            desc: "A function should either do the work or handle errors – not both.",
            icon: "🎯",
          },
          {
            title: "Testability",
            desc: "Isolated error handlers can be tested separately from the core logic.",
            icon: "🧪",
          },
          {
            title: "Consistent Reporting",
            desc: "All error handling functions can follow the same pattern (e.g., log and return error code).",
            icon: "📋",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-600",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              `motion-safe:animation-delay-${(index + 1) * 100}ms`
            )}
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="mb-3 text-4xl">{item.icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* SVG Illustration: Before/After */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-3xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 500 200" className="w-full">
            {/* Before: mixed */}
            <text x="30" y="30" fill="#dc2626" fontSize="14" fontWeight="bold">Before: Mixed</text>
            <rect x="30" y="40" width="180" height="100" fill="#fee2e2" rx="4" stroke="#dc2626" />
            <text x="40" y="60" fill="#dc2626" fontSize="10">open file</text>
            <text x="40" y="80" fill="#dc2626" fontSize="10">if error: handle</text>
            <text x="40" y="100" fill="#dc2626" fontSize="10">read data</text>
            <text x="40" y="120" fill="#dc2626" fontSize="10">if error: handle</text>
            <text x="40" y="140" fill="#dc2626" fontSize="10">process</text>

            {/* Arrow */}
            <line x1="220" y1="90" x2="270" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* After: isolated */}
            <text x="300" y="30" fill="#059669" fontSize="14" fontWeight="bold">After: Isolated</text>
            <rect x="300" y="40" width="180" height="100" fill="#d1fae5" rx="4" stroke="#059669" />
            <text x="310" y="60" fill="#059669" fontSize="10">openFileSafe()</text>
            <text x="310" y="80" fill="#059669" fontSize="10">readDataSafe()</text>
            <text x="310" y="100" fill="#059669" fontSize="10">processData()</text>
            <text x="310" y="120" fill="#059669" fontSize="10">// error handlers inside</text>
            <text x="310" y="140" fill="#059669" fontSize="10">// each function</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Isolating error handling moves the "if error" checks inside dedicated functions.
          </p>
        </div>
      </section>

      {/* Concrete C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Mixed vs Isolated Error Handling</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> Error Handling Mixed with Logic
            </h3>
            <EditableCCodeBlock
              title="error_mixed.c – Main logic cluttered"
              initialCode={errorMixed}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Ritaja's <code>main()</code> is full of <code>if (error)</code>.
              The core intent (copy file) is hard to see.
            </p>
          </div>

          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-safe:animation-delay-200ms"
            )}
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">✅</span> Isolated Error Handling
            </h3>
            <EditableCCodeBlock
              title="error_isolated.c – Clean, focused main"
              initialCode={errorIsolated}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu moved error checks into helper functions. <code>main()</code>{" "}
              reads like a high‑level plan. Error handling is reusable and separate.
            </p>
          </div>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-yellow-50/70 p-6 dark:bg-yellow-900/20",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold text-yellow-800 dark:text-yellow-300">
          ⚠️ Common Pitfalls
        </h2>
        <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Over‑isolation:</strong> Creating too many tiny functions can
            harm readability. Strike a balance.
          </li>
          <li>
            <strong>Inconsistent error reporting:</strong> Some functions return
            error codes, others print and exit. Choose one style.
          </li>
          <li>
            <strong>Ignoring errors in helper functions:</strong> Just moving the
            check doesn't help if the helper itself ignores errors.
          </li>
          <li>
            <strong>Not propagating errors:</strong> The helper should return an
            error code so the caller knows something failed.
          </li>
          <li>
            <strong>Mixing error handling with resource cleanup:</strong> Ensure
            that if an error occurs, resources are still freed (use single
            exit point pattern).
          </li>
        </ul>
      </section>

      {/* Best Practices Summary */}
      <section className="mb-12 grid gap-6 md:grid-cols-1">
        <div
          className={clsx(
            "rounded-xl bg-blue-50/50 p-5 dark:bg-blue-900/20",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h3 className="mb-3 text-xl font-semibold text-blue-700 dark:text-blue-300">
            📋 Do's
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
            <li>Create helper functions for each operation that can fail.</li>
            <li>Have helpers return error codes and set results via out‑parameters.</li>
            <li>Keep the main function as a sequence of calls with error checks.</li>
            <li>Log errors at the point of handling, not deep inside helpers (unless appropriate).</li>
            <li>Use consistent error code conventions across all helpers.</li>
          </ul>
        </div>
        <div
          className={clsx(
            "rounded-xl bg-purple-50/50 p-5 dark:bg-purple-900/20",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:animation-delay-200ms"
          )}
          style={{ animationDelay: "200ms" }}
        >
          <h3 className="mb-3 text-xl font-semibold text-purple-700 dark:text-purple-300">
            🚫 Don'ts
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
            <li>Scatter error handling throughout the main logic.</li>
            <li>Let helper functions terminate the program without giving the caller a chance.</li>
            <li>Hide errors by ignoring return values.</li>
            <li>Duplicate the same error‑handling code in multiple places.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/30 p-6 dark:border-indigo-700 dark:bg-indigo-900/10",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-indigo-800 dark:text-indigo-300">
          💡 Hint – Think Like a Pro
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Observe carefully:</span> In the mixed
          example, <code>main()</code> has to manage all the error details. In
          the isolated version, <code>main()</code> is a short, clear sequence.
          If you need to change how errors are reported (e.g., log to a file
          instead of <code>stderr</code>), you only change the helpers. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Add a new step to the isolated
            version – maybe validate the copied data. You'll add a new helper{" "}
            <code>validateFile()</code> and one line in <code>main()</code>. The
            error handling is already taken care of.
          </span>
        </p>
      </section>

      {/* Tips & Tricks */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-emerald-50/50 p-6 dark:bg-emerald-900/20",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
          🧠 Tips & Tricks (Professional Edge)
        </h2>
        <div className="grid gap-4 md:grid-cols-1">
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧹 Use a single cleanup section
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              In complex functions, use <code>goto</code> to a common cleanup
              block. This centralises resource freeing.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Error codes as enum
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Define an enum for all possible errors. This makes return values
              self‑documenting.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Test error paths
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Write tests that force errors (e.g., make file read-only) to ensure
              your error handlers work.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we practice by refactoring a messy function into
              clean helpers. Students see how isolating errors improves clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-indigo-500 bg-indigo-50/80 p-6 dark:bg-indigo-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-indigo-800 dark:text-indigo-300">
          👨‍🏫 Teacher's Note – Sukanta Hui
        </h2>
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex-1">
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <strong>Sukanta Hui</strong> (email: sukantahui@codernaccotax.co.in
              , mobile: 7003756860) has been teaching programming since 1998 –
              that's <strong>{experience} years</strong> of experience in C,
              RDBMS, OS, and web development.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              "I always tell my students: 'Your main function should read like a
              table of contents.' If you have error handling all over, the
              reader gets lost. Isolate the errors into well‑named functions, and
              the intent of the program shines through. It's a simple discipline
              that pays off immensely."
            </p>
          </div>
          <div className="rounded-full bg-indigo-200 p-3 dark:bg-indigo-800">
            <svg
              className="h-12 w-12 text-indigo-700 dark:text-indigo-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="rounded-xl bg-gray-100 p-6 dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-semibold">✅ Mini Checklist</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
          {[
            "Does the main function read as a high‑level sequence?",
            "Are error checks and handling moved into helper functions?",
            "Do helpers consistently return error codes?",
            "Is error handling logic reusable?",
            "Are resources cleaned up properly even on error paths?",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Inline keyframes for animations */}
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Topic51;