import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import reusableFuncGood from "./topic33_files/reusable_func_good.c?raw";
import reusableFuncBad from "./topic33_files/reusable_func_bad.c?raw";

const Topic33 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            Best Practices for Writing Reusable Functions
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Write functions once, use them everywhere – cleanly, safely, and
          professionally.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Why Reusability Matters</h2>
        <p className="leading-relaxed">
          Imagine Tuhina and Abhronila are building a student management system.
          If they both write the same validation logic in ten different places,
          fixing a bug becomes a nightmare. Reusable functions act as single
          sources of truth – change once, reflect everywhere. In professional
          teams, reusability is the cornerstone of maintainability.
        </p>
      </section>

      {/* Key Best Practices Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {[
          {
            title: "Single Responsibility",
            desc: "Each function should do exactly one thing. A function that both validates input and saves to a file is hard to reuse.",
            icon: "🎯",
          },
          {
            title: "Descriptive Names",
            desc: "Name functions like verbs: `calculateAverage()`, `isValidEmail()`. Avoid vague names like `process()`.",
            icon: "🏷️",
          },
          {
            title: "Limit Parameters",
            desc: "Too many parameters ( > 3 ) make functions confusing. Group related data into structures.",
            icon: "🔢",
          },
          {
            title: "Avoid Global State",
            desc: "Functions that depend on or modify global variables are unpredictable. Pass everything explicitly.",
            icon: "🌐",
          },
          {
            title: "Return Meaningful Values",
            desc: "Return error codes or use consistent return types so callers know what happened.",
            icon: "↩️",
          },
          {
            title: "Document Expectations",
            desc: "Use comments or docstrings to explain parameters, return values, and edge cases.",
            icon: "📝",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              `motion-safe:animation-delay-${(index + 1) * 100}ms` // arbitrary delay
            )}
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="mb-3 text-4xl">{item.icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Real‑World C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">From Classroom to Code</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">✅</span> Good Reusable Function
            </h3>
            <EditableCCodeBlock
              title="isPrime() – single purpose, reusable"
              initialCode={reusableFuncGood}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu can use <code>isPrime()</code> in his math quiz,
              while Ritaja uses it in a cryptography demo – zero duplication.
            </p>
          </div>

          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-safe:animation-delay-200ms"
            )}
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> Non‑reusable Mess
            </h3>
            <EditableCCodeBlock
              title="processNumbers() – does everything"
              initialCode={reusableFuncBad}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep cannot reuse the prime logic without copying code.
              Any change forces him to hunt down every copy.
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
            <strong>Side effects:</strong> Modifying global variables or input
            arrays unintentionally.
          </li>
          <li>
            <strong>Magic numbers:</strong> Hardcoding constants inside a
            function (e.g., buffer size 100) instead of passing them.
          </li>
          <li>
            <strong>Ignoring return values:</strong> Calling a function that
            returns an error code but never checking it.
          </li>
          <li>
            <strong>Over‑optimisation:</strong> Making functions too
            general‑purpose with many flags – keep it simple.
          </li>
          <li>
            <strong>Poor naming:</strong> Names like <code>func1()</code> or{" "}
            <code>doStuff()</code> hide intent.
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
            <li>Write small functions (20–30 lines max).</li>
            <li>Use consistent naming conventions.</li>
            <li>Validate inputs at the start.</li>
            <li>Return early on errors.</li>
            <li>Keep related functions in the same module.</li>
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
            <li>Rely on global variables.</li>
            <li>Mix I/O with business logic.</li>
            <li>Use vague parameter names (a, b, c).</li>
            <li>Repeat the same code block twice.</li>
            <li>Hide side effects (e.g., printing inside a calculation).</li>
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
          <span className="font-medium">Observe carefully:</span> In the good
          example, <code>isPrime()</code> only checks primality. It doesn't
          ask for input or print results. This makes it usable in a GUI, a
          web server, or a command line tool. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Modify <code>isPrime()</code> to
            also print "Checking..." – suddenly you can't use it in a silent
            background task.
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
              🔍 Debugging Mindset
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Write functions that are easy to test in isolation. Use
              assertions or print statements only during development, then
              remove them.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏷️ Naming Gold
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Prefix boolean‑returning functions with <code>is_</code>,{" "}
              <code>has_</code>, or <code>can_</code>. Example:{" "}
              <code>is_valid_age()</code>.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Barrackpore CNAT, students often forget to check return
              values. Get into the habit of always handling them, even if it's
              just logging.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📦 Structure Advice
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Group related functions in a separate <code>.c</code> and{" "}
              <code>.h</code> file. This is how real libraries are built.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-blue-500 bg-blue-50/80 p-6 dark:bg-blue-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-blue-800 dark:text-blue-300">
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
              "I've seen countless students at Naihati CNAT struggle with
              unmaintainable code. The secret is simple: treat every function
              as a tiny tool. If it does one thing well, you can build
              anything. Remember, reusable code is not about writing less – it's
              about writing smarter."
            </p>
          </div>
          <div className="rounded-full bg-blue-200 p-3 dark:bg-blue-800">
            <svg
              className="h-12 w-12 text-blue-700 dark:text-blue-300"
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
            "Does the function have one clear purpose?",
            "Is the name a verb that describes what it does?",
            "Are parameters limited and clearly named?",
            "Does it avoid modifying global variables?",
            "Is the return value meaningful and checked?",
            "Are there comments explaining non‑obvious logic?",
            "Can this function be used in another program easily?",
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

export default Topic33;