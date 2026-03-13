import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import smallTestable from "./topic47_files/small_testable.c?raw";
import untestable from "./topic47_files/untestable.c?raw";

const Topic47 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
            Designing Small, Reusable, Testable Functions
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          The three virtues of a great function: it does one small thing, it can
          be used again, and you can prove it works – automatically.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">The Three Pillars</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Tuhina is building a library management system.
          She writes a function to calculate fines. She makes it{" "}
          <strong>small</strong> (10 lines), <strong>reusable</strong> (it
          doesn't depend on global variables), and <strong>testable</strong> (it
          returns a value based only on its inputs). Later, when Debangshu wants
          to use the same logic in the mobile app, he can just copy the function.
          And when Abhronila adds unit tests, she can verify it works for all
          edge cases. These three qualities separate professional code from
          student projects.
        </p>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {[
          {
            title: "Small",
            desc: "Functions should be short – typically 5–20 lines. If it's longer, it probably does too much.",
            icon: "📏",
          },
          {
            title: "Reusable",
            desc: "No hidden dependencies on global variables or I/O. Pass everything as parameters.",
            icon: "♻️",
          },
          {
            title: "Testable",
            desc: "Given the same inputs, it always returns the same outputs. No side effects.",
            icon: "🧪",
          },
          {
            title: "Pure Functions",
            desc: "The ideal: no modification of state, no I/O. Easy to test and reason about.",
            icon: "💧",
          },
          {
            title: "Single Level of Abstraction",
            desc: "Each function should operate at one conceptual level – not mix high-level logic with details.",
            icon: "📚",
          },
          {
            title: "Descriptive Names",
            desc: "A good name makes the function self‑documenting, enhancing reusability.",
            icon: "🏷️",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-600",
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
        <h2 className="mb-6 text-2xl font-semibold">Testable vs Untestable</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">✅</span> Small, Reusable, Testable
            </h3>
            <EditableCCodeBlock
              title="small_testable.c – Pure function with test harness"
              initialCode={smallTestable}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep's <code>add()</code> is tiny, depends only on inputs, and
              can be tested automatically. The test function runs without manual
              intervention.
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
              <span className="mr-2">❌</span> Untestable Mess
            </h3>
            <EditableCCodeBlock
              title="untestable.c – Global state and I/O"
              initialCode={untestable}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Ritaja's function uses a global variable and prints to console.
              Testing it requires capturing output and resetting global state –
              much harder.
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
            <strong>Hidden dependencies:</strong> Using global variables makes a
            function unpredictable and hard to test.
          </li>
          <li>
            <strong>Mixing I/O with logic:</strong> A function that both
            calculates and prints cannot be reused in a GUI or web server.
          </li>
          <li>
            <strong>Too many parameters:</strong> More than 3–4 parameters
            suggest the function does too much or needs a struct.
          </li>
          <li>
            <strong>Side effects:</strong> Modifying input arrays or global state
            leads to bugs that are hard to trace.
          </li>
          <li>
            <strong>Long functions:</strong> Over 20 lines often hide multiple
            responsibilities.
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
            <li>Write pure functions whenever possible.</li>
            <li>Pass all data as parameters; return results explicitly.</li>
            <li>Keep functions small enough to understand at a glance.</li>
            <li>Write unit tests for every function (even if manual).</li>
            <li>Use descriptive names that reveal intent.</li>
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
            <li>Rely on global or static variables inside functions.</li>
            <li>Embed I/O (printf, scanf) inside calculation functions.</li>
            <li>Write functions longer than 20–30 lines without good reason.</li>
            <li>Ignore edge cases – test with zero, negative, large values.</li>
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
          <span className="font-medium">Observe carefully:</span> The testable
          <code>add()</code> function takes two ints and returns an int. You can
          call it from anywhere – a unit test, a GUI, a command line. The
          untestable function, <code>updateTotal()</code>, reads and writes a
          global variable. To test it, you must reset the global before each
          test and capture stdout. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Convert the untestable function
            into a testable one by removing the global and I/O. Pass the current
            total as a parameter and return the new total.
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
              🧪 Write tests first (TDD)
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Test‑Driven Development forces you to write testable functions.
              You'll naturally keep them small and focused.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Measure cyclomatic complexity
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Tools like <code>gcc -fanalyzer</code> or <code>pmccabe</code> can
              flag overly complex functions.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🔄 Refactor mercilessly
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              When you see a long function, break it into smaller ones. Each
              small function is easier to test and reuse.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we use the "recipe" analogy: a function is like a
              recipe step. If a step says "prepare the sauce and bake the cake",
              it's doing too much.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-green-500 bg-green-50/80 p-6 dark:bg-green-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-green-800 dark:text-green-300">
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
              "I often ask my students: 'How do you know your function works?'
              If the answer is 'I ran the program and it looked right,' that's
              not enough. Testable functions give you confidence. Small,
              reusable functions are the building blocks of reliable software.
              Start every function by asking: is it small? Can I use it
              elsewhere? Can I write a test for it in one minute?"
            </p>
          </div>
          <div className="rounded-full bg-green-200 p-3 dark:bg-green-800">
            <svg
              className="h-12 w-12 text-green-700 dark:text-green-300"
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
            "Is the function small enough to read in one screen?",
            "Does it avoid global variables?",
            "Does it avoid I/O (except where its purpose is I/O)?",
            "Given the same inputs, does it always return the same output?",
            "Can I write a simple test that calls it with a few values?",
            "Does its name describe exactly what it does?",
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

export default Topic47;