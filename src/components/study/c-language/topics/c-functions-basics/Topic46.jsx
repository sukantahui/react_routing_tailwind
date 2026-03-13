import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import srpBad from "./topic46_files/srp_bad.c?raw";
import srpGood from "./topic46_files/srp_good.c?raw";

const Topic46 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
            Single Responsibility Principle for Functions
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          A function should do one thing, and do it well. Learn why this is the
          cornerstone of clean, maintainable code.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">What Is the Single Responsibility Principle?</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Ritaja wrote a function that reads student data,
          calculates grades, and prints a report – all in one 200‑line monster.
          When Abhronila needed to change the grading scale, she had to
          understand the entire function, and accidentally broke the report
          formatting. The <strong>Single Responsibility Principle (SRP)</strong>{" "}
          states that every function should have exactly one reason to change.
          In other words, it should do one thing and one thing only. This makes
          code easier to understand, test, and modify.
        </p>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {[
          {
            title: "One Reason to Change",
            desc: "If a function handles both validation and output, changing output format also risks breaking validation.",
            icon: "🎯",
          },
          {
            title: "Testability",
            desc: "Small, single‑purpose functions are easy to test in isolation.",
            icon: "🧪",
          },
          {
            title: "Reusability",
            desc: "A function that does one thing can be reused in many contexts.",
            icon: "♻️",
          },
          {
            title: "Readability",
            desc: "Well‑named single‑responsibility functions read like a story.",
            icon: "📖",
          },
          {
            title: "Maintainability",
            desc: "Changes are isolated – you modify only the relevant function.",
            icon: "🔧",
          },
          {
            title: "Parallel Development",
            desc: "Team members can work on different responsibilities without conflicts.",
            icon: "👥",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-teal-600",
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
        <h2 className="mb-6 text-2xl font-semibold">SRP Violation vs Adherence</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> Violation: One Function Does Everything
            </h3>
            <EditableCCodeBlock
              title="srp_bad.c – Validation, calculation, and I/O mixed"
              initialCode={srpBad}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep's function reads data, validates, calculates, and prints.
              Changing the validation rule means touching code that also handles
              output – risky and hard to test.
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
              <span className="mr-2">✅</span> Adherence: Separate Responsibilities
            </h3>
            <EditableCCodeBlock
              title="srp_good.c – Each function has one job"
              initialCode={srpGood}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina split the code into <code>getInput()</code>,{" "}
              <code>isValidAge()</code>, <code>calculateTicketPrice()</code>, and
              <code>printResult()</code>. Each can be tested and changed independently.
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
            <strong>Too many tiny functions:</strong> Breaking code into too many
            functions can harm readability. Aim for a balance.
          </li>
          <li>
            <strong>Side effects:</strong> A function that "does one thing" but
            also modifies a global variable actually has two responsibilities.
          </li>
          <li>
            <strong>Vague function names:</strong> If you can't name a function
            because it does too much, that's a smell.
          </li>
          <li>
            <strong>Ignoring cohesion:</strong> Functions that operate on
            unrelated data may still violate SRP even if they have one line.
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
            <li>Write functions that do one logical task.</li>
            <li>Name functions after that single task (verb).</li>
            <li>Extract helper functions when you see "paragraphs" of code.</li>
            <li>Test each function independently.</li>
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
            <li>Write long functions that mix I/O, logic, and validation.</li>
            <li>Let functions have side effects that aren't obvious.</li>
            <li>Use the same function to handle multiple unrelated tasks.</li>
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
          example, the function <code>processStudent()</code> handles input,
          validation, calculation, and output. If you need to change the
          validation rule, you must also understand the output logic. In the
          good example, each function has a clear, testable purpose. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Modify the good example to add a
            discount for seniors. You'll only change the calculation function,
            without touching input or output.
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
              🔍 The "And" Test
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If you can describe a function using "and" (e.g., "it validates and
              prints"), it probably violates SRP.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Keep functions small
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              A good rule of thumb: a function should fit on a screen (20–30
              lines). If it's longer, consider splitting.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Test in isolation
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Write unit tests for each small function. If a test is hard to
              write, the function probably has too many responsibilities.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we use the "job interview" test: if you were
              hiring a function, would you hire one person to do all these tasks?
              Probably not.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-teal-500 bg-teal-50/80 p-6 dark:bg-teal-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-teal-800 dark:text-teal-300">
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
              "The single responsibility principle is the foundation of clean
              code. I've seen students write 500‑line functions and then struggle
              to debug them. Teaching them to split code into focused functions
              transforms their approach. Remember: a function that does one thing
              is a joy to use; a function that does many things is a liability."
            </p>
          </div>
          <div className="rounded-full bg-teal-200 p-3 dark:bg-teal-800">
            <svg
              className="h-12 w-12 text-teal-700 dark:text-teal-300"
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
            "Does my function have only one reason to change?",
            "Can I describe what it does without using 'and'?",
            "Is it small enough to read in one screen?",
            "Can I write a simple unit test for it?",
            "Does its name clearly indicate its single responsibility?",
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

export default Topic46;