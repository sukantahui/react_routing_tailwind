import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import errorCodeBad from "./topic50_files/error_code_bad.c?raw";
import errorCodeGood from "./topic50_files/error_code_good.c?raw";

const Topic50 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-red-400">
            Returning Error Codes from Functions
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Functions can't always succeed. Use error codes to communicate failure
          clearly and let the caller decide how to respond.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Why Return Error Codes?</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Swadeep wrote a function to read a configuration
          file. If the file didn't exist, his function crashed the whole program.
          Abhronila suggested returning an error code instead: 0 for success,
          non‑zero for different failures. This lets the caller decide – maybe
          use defaults, ask the user, or exit gracefully. Error codes are a
          simple, language‑agnostic way to handle failures. In C, they're the
          standard approach because exceptions don't exist.
        </p>
      </section>

      {/* SVG Flowchart: Error Handling Flow */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-2xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 400 250" className="w-full">
            {/* Function call */}
            <rect x="30" y="20" width="100" height="40" fill="#3b82f6" rx="4" />
            <text x="50" y="45" fill="white" fontSize="12">call function</text>

            {/* Error check */}
            <rect x="30" y="100" width="100" height="40" fill="#f59e0b" rx="4" />
            <text x="45" y="125" fill="white" fontSize="10">check error code</text>

            {/* Success path */}
            <line x1="80" y1="140" x2="200" y2="180" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="140" y="160" fill="#059669" fontSize="10">0 (success)</text>
            <rect x="200" y="160" width="100" height="40" fill="#059669" rx="4" />
            <text x="220" y="185" fill="white" fontSize="10">use result</text>

            {/* Error path */}
            <line x1="80" y1="100" x2="80" y2="60" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="90" y="75" fill="#dc2626" fontSize="10">non‑zero</text>
            <rect x="20" y="20" width="100" height="30" fill="#dc2626" rx="4" />
            <text x="30" y="40" fill="white" fontSize="10">handle error</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Always check error codes immediately after a function call.
          </p>
        </div>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {[
          {
            title: "0 = Success",
            desc: "By convention, zero indicates success. Non‑zero values indicate different error types.",
            icon: "✅",
          },
          {
            title: "errno",
            desc: "Many standard library functions set the global `errno` variable on error, but it's not thread‑safe without care.",
            icon: "📌",
          },
          {
            title: "Enum for Errors",
            desc: "Define an enum with named error codes for clarity and maintainability.",
            icon: "📋",
          },
          {
            title: "Out‑Parameters",
            desc: "When a function needs to return both a value and an error code, use a pointer parameter for the value and return the code.",
            icon: "↩️",
          },
          {
            title: "Consistency",
            desc: "All functions in a project should follow the same error‑reporting convention.",
            icon: "♻️",
          },
          {
            title: "Don't Ignore",
            desc: "Ignoring error codes is a common source of bugs. Always check them.",
            icon: "👀",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-orange-600",
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

      {/* Concrete C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Error Codes in Practice</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> Ignoring Errors
            </h3>
            <EditableCCodeBlock
              title="error_code_bad.c – No error checking"
              initialCode={errorCodeBad}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina calls <code>fopen</code> but doesn't check the return value.
              If the file doesn't exist, the program continues with a NULL file
              pointer, leading to a crash later.
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
              <span className="mr-2">✅</span> Proper Error Handling
            </h3>
            <EditableCCodeBlock
              title="error_code_good.c – Check and respond"
              initialCode={errorCodeGood}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu checks the return value of <code>fopen</code>, handles
              the error gracefully (with <code>perror</code>), and exits or takes
              corrective action.
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
            <strong>Ignoring return values:</strong> Calling a function that
            returns an error code and not checking it.
          </li>
          <li>
            <strong>Inconsistent conventions:</strong> Some functions return 0
            on success, others return 0 on error. Pick one and stick to it.
          </li>
          <li>
            <strong>Overloading return values:</strong> Using the same return
            channel for both data and error (e.g., returning -1 for error but
            also valid data can be -1).
          </li>
          <li>
            <strong>Not using <code>errno</code> correctly:</strong> Many
            library functions set <code>errno</code>, but it can be overwritten
            by subsequent calls. Save it immediately.
          </li>
          <li>
            <strong>Ignoring partial success:</strong> Functions like <code>fread</code>{" "}
            return the number of items read; check if it matches what you expected.
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
            <li>Return 0 for success, non‑zero for errors.</li>
            <li>Define named constants (enum) for error codes.</li>
            <li>Check error codes immediately after the call.</li>
            <li>Use <code>perror</code> or <code>strerror</code> to report errors.</li>
            <li>Document the possible error codes in the function's comment.</li>
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
            <li>Ignore error codes.</li>
            <li>Use magic numbers for errors (like -1, -2) without names.</li>
            <li>Return error information via a global variable without caution.</li>
            <li>Overwrite <code>errno</code> before using it.</li>
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
          <span className="font-medium">Observe carefully:</span> In the bad
          example, the program continues with a NULL file pointer. When it tries
          to read, it crashes. In the good example, the program checks the
          return and prints a helpful error message. The user knows what went
          wrong. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Write a function that divides two
            numbers and returns an error code if the divisor is zero. Have the
            caller check the code and print an appropriate message.
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
              🧹 Use <code>errno</code> wisely
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Set <code>errno = 0</code> before calling a function that uses it,
              and check immediately after. Save it if you need it later.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏷️ Define error enums
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Example: <code>1{`enum { ERR_NONE, ERR_FILE_NOT_FOUND, ERR_PERMISSION }`};</code>
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🔄 Consider out‑parameters
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              For functions that need to return both a value and an error, use a
              pointer parameter for the value and return the error code.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we practice by writing a small library of file
              and math functions, always checking and returning error codes.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-orange-500 bg-orange-50/80 p-6 dark:bg-orange-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-orange-800 dark:text-orange-300">
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
              "I've lost count of the bugs caused by ignoring error codes.
              Students often think 'it won't happen to me'. But files get
              deleted, disks fill up, users input garbage. Defensive programming
              means always checking. In professional code, ignoring an error code
              is a bug. Make it a habit."
            </p>
          </div>
          <div className="rounded-full bg-orange-200 p-3 dark:bg-orange-800">
            <svg
              className="h-12 w-12 text-orange-700 dark:text-orange-300"
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
            "Does every function that can fail return an error code?",
            "Are error codes documented and named (enum)?",
            "Do I check error codes immediately after calling?",
            "Do I handle errors gracefully (retry, notify, exit)?",
            "Do I avoid using magic numbers for errors?",
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

export default Topic50;