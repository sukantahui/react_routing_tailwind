import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import inputValidationBad from "./topic49_files/input_validation_bad.c?raw";
import inputValidationGood from "./topic49_files/input_validation_good.c?raw";

const Topic49 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent dark:from-yellow-400 dark:to-amber-400">
            Validating Inputs Inside Functions
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Never trust your inputs – validate them. Protect your functions from
          bad data, crashes, and security holes.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Why Validate Inputs?</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Tuhina wrote a function to compute the square root
          of a number. She assumed callers would only pass non‑negative numbers.
          Then Swadeep passed –5, and the program crashed. Input validation is
          the first line of defense: it checks that the data meets the
          function's assumptions. Without it, your program can produce garbage
          results, crash, or become a security vulnerability. Validate early,
          validate often.
        </p>
      </section>

      {/* SVG Flowchart: Input Validation Flow */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-2xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 400 250" className="w-full">
            {/* Start */}
            <circle cx="80" cy="40" r="20" fill="#3b82f6" />
            <text x="70" y="45" fill="white" fontSize="12">Start</text>

            {/* Validation decision */}
            <rect x="40" y="100" width="80" height="40" fill="#f59e0b" rx="4" />
            <text x="50" y="125" fill="white" fontSize="10">Input valid?</text>

            {/* Yes arrow */}
            <line x1="80" y1="140" x2="200" y2="180" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="140" y="160" fill="#059669" fontSize="10">Yes</text>

            {/* No arrow */}
            <line x1="80" y1="100" x2="80" y2="60" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="90" y="75" fill="#dc2626" fontSize="10">No</text>

            {/* Error handling */}
            <rect x="20" y="20" width="100" height="30" fill="#dc2626" rx="4" />
            <text x="30" y="40" fill="white" fontSize="10">Return error</text>

            {/* Process */}
            <rect x="200" y="160" width="100" height="40" fill="#059669" rx="4" />
            <text x="220" y="185" fill="white" fontSize="10">Process data</text>

            {/* End */}
            <circle cx="250" cy="220" r="20" fill="#3b82f6" />
            <text x="240" y="225" fill="white" fontSize="12">End</text>

            <line x1="250" y1="200" x2="250" y2="220" stroke="#6b7280" strokeWidth="2" />

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Validate inputs at the beginning. On failure, return an error or take
            corrective action. Only proceed if data is safe.
          </p>
        </div>
      </section>

      {/* Key Validation Checks Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {[
          {
            title: "Range Checks",
            desc: "Ensure numbers are within expected bounds (e.g., age between 0 and 150).",
            icon: "📏",
          },
          {
            title: "Null Pointers",
            desc: "Always check pointers for NULL before dereferencing.",
            icon: "📍",
          },
          {
            title: "String Length",
            desc: "Prevent buffer overflows by checking string length against buffer size.",
            icon: "📝",
          },
          {
            title: "Type Validity",
            desc: "For enums or flags, verify the value is one of the allowed constants.",
            icon: "🔢",
          },
          {
            title: "Division by Zero",
            desc: "Never divide without ensuring the divisor is non‑zero.",
            icon: "➗",
          },
          {
            title: "File/Resource Handles",
            desc: "Check that files opened successfully before reading/writing.",
            icon: "📁",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-yellow-600",
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
        <h2 className="mb-6 text-2xl font-semibold">Validation: Good vs Bad</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> No Validation
            </h3>
            <EditableCCodeBlock
              title="input_validation_bad.c – Crashes on bad input"
              initialCode={inputValidationBad}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Ritaja's <code>divide()</code> doesn't check for zero divisor.
              Passing 0 crashes the program. The array function also ignores
              NULL pointers.
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
              <span className="mr-2">✅</span> With Validation
            </h3>
            <EditableCCodeBlock
              title="input_validation_good.c – Handles errors gracefully"
              initialCode={inputValidationGood}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu's version checks for zero, NULL, and out‑of‑range
              indices, returning error codes or printing messages. The program
              continues safely.
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
            <strong>Validating too late:</strong> After already using the invalid
            data (e.g., dereferencing a NULL pointer before checking).
          </li>
          <li>
            <strong>Inconsistent error handling:</strong> Some functions return
            -1 on error, others return NULL, others print and exit. Pick one
            convention.
          </li>
          <li>
            <strong>Ignoring return values:</strong> Calling a function that
            validates and returns an error code, but not checking it.
          </li>
          <li>
            <strong>Over‑validation:</strong> Checking for conditions that are
            guaranteed by the caller, adding unnecessary overhead.
          </li>
          <li>
            <strong>Using assertions for runtime validation:</strong> Assertions
            are for debugging; they can be compiled out. Use proper conditionals
            for input validation.
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
            <li>Validate all external inputs (user, file, network).</li>
            <li>Check pointers for NULL before dereferencing.</li>
            <li>Verify ranges (e.g., array indices, mathematical domains).</li>
            <li>Use consistent error reporting (return codes, error flags).</li>
            <li>Document the expected input range in the function comment.</li>
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
            <li>Assume inputs are always valid.</li>
            <li>Use assertions for runtime input validation.</li>
            <li>Ignore error codes from called functions.</li>
            <li>Validate after using the data (too late).</li>
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
          example, calling <code>divide(10, 0)</code> causes a crash. In the good
          example, it returns an error code and the caller can handle it. Which
          version would you rather use in a banking application? <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Modify the good example to add
            validation for negative numbers in <code>sqrt()</code>. Return a
            special value or set an error flag.
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
              🛡️ Use <code>const</code> for input pointers
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If a function doesn't modify the input data, declare it as const.
              It signals intent and allows compiler optimizations.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Test with invalid inputs
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Write unit tests that deliberately pass bad data to ensure your
              validation works.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Validate early, return early
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Put all validation checks at the top of the function. If any fail,
              return immediately. This keeps the main logic uncluttered.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we teach students to imagine the worst possible
              input and see if their function survives. If it crashes, add
              validation.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-yellow-500 bg-yellow-50/80 p-6 dark:bg-yellow-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-yellow-800 dark:text-yellow-300">
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
              "One of the most common bugs I see is functions that crash on bad
              input. Students often assume that callers will 'do the right
              thing'. In real‑world code, you cannot trust anyone – not even
              yourself. Validate everything. It takes a few lines but saves hours
              of debugging. Remember: garbage in, garbage out – but better to
              detect the garbage early."
            </p>
          </div>
          <div className="rounded-full bg-yellow-200 p-3 dark:bg-yellow-800">
            <svg
              className="h-12 w-12 text-yellow-700 dark:text-yellow-300"
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
            "Does the function check all assumptions about inputs?",
            "Are pointers checked for NULL before use?",
            "Are divisions protected against zero divisor?",
            "Are array indices within bounds?",
            "Is the error handling consistent and documented?",
            "Do I validate external data (user, file) before processing?",
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

export default Topic49;