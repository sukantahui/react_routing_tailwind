import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import repeatedCodeBad from "./topic35_files/repeated_code_bad.c?raw";
import refactoredCodeGood from "./topic35_files/refactored_code_good.c?raw";

const Topic35 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
            Refactoring Repeated Code into Functions
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Don't Repeat Yourself (DRY) — identify duplication and encapsulate it
          into reusable, maintainable functions.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Why Refactor Repeated Code?</h2>
        <p className="leading-relaxed">
          Imagine Ritaja is writing a program for Barrackpore CNAT that needs
          to calculate the area of a circle in three different places. She
          copies the formula <code>3.14159 * r * r</code> each time. Later, she
          realises she needs more precision — now she has to hunt down every
          copy and fix it. Refactoring means taking that repeated logic,
          wrapping it in a function (like <code>circleArea()</code>), and
          calling it everywhere. One change, and it's fixed everywhere.
        </p>
      </section>

      {/* Key Benefits Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {[
          {
            title: "Easier Maintenance",
            desc: "Fix a bug or update logic in one place, not a dozen.",
            icon: "🔧",
          },
          {
            title: "Less Code",
            desc: "Shorter, cleaner files — easier to read and navigate.",
            icon: "✂️",
          },
          {
            title: "Fewer Errors",
            desc: "Copy‑paste errors disappear. Consistency across your program.",
            icon: "🐛",
          },
          {
            title: "Better Abstraction",
            desc: "Hide details behind meaningful names, making the code self‑documenting.",
            icon: "📚",
          },
          {
            title: "Reusability",
            desc: "Once in a function, you can use it in other projects too.",
            icon: "♻️",
          },
          {
            title: "Testability",
            desc: "Isolated logic is easy to test with different inputs.",
            icon: "🧪",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-600",
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

      {/* Real‑World C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Before and After Refactoring</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> Repeated Code (Before)
            </h3>
            <EditableCCodeBlock
              title="repeated_code_bad.c – copy‑paste disaster"
              initialCode={repeatedCodeBad}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep copied the same validation logic three times. Changing
              the valid age range means editing all three places.
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
              <span className="mr-2">✅</span> Refactored Code (After)
            </h3>
            <EditableCCodeBlock
              title="refactored_code_good.c – DRY and clean"
              initialCode={refactoredCodeGood}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina moved the validation into <code>isValidAge()</code>. Now
              the logic is centralised and easy to update.
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
            <strong>Over‑refactoring:</strong> Creating a function for code
            that's only used once and very short can reduce readability.
          </li>
          <li>
            <strong>Changing behaviour accidentally:</strong> When extracting
            code, you might introduce subtle bugs. Test after refactoring.
          </li>
          <li>
            <strong>Poor function names:</strong> If the new function has a
            vague name, it doesn't help. Name it by what it does.
          </li>
          <li>
            <strong>Forgetting to remove all copies:</strong> Leaving one
            instance of duplicated code defeats the purpose.
          </li>
          <li>
            <strong>Refactoring without version control:</strong> Always commit
            before refactoring so you can revert if something breaks.
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
            <li>Identify duplication (exact or similar logic).</li>
            <li>Extract into a well‑named function with clear parameters.</li>
            <li>Replace each duplicate with a function call.</li>
            <li>Test that behaviour remains identical.</li>
            <li>Consider making the function reusable for future needs.</li>
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
            <li>Leave identical code blocks scattered around.</li>
            <li>Create functions with side effects that aren't obvious.</li>
            <li>Refactor without testing.</li>
            <li>Use cryptic names for extracted functions.</li>
            <li>Overlook similar code that isn't exactly the same but could be generalised.</li>
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
          example, each validation block uses the same condition but is written
          out each time. In the good example, that condition lives in one
          function. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> If the valid age range changes
            from 18‑60 to 21‑65, how many lines do you need to edit in each
            version? The refactored version needs just one change.
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
              🔎 Use “Rule of Three”
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If you write the same code three times, refactor it. The first
              time is fine, second time you might copy, third time it's time to
              extract.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Test After Refactoring
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Run your program with the same inputs before and after to ensure
              the behaviour hasn't changed.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📖 Name the Function What It Does
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If you struggle to name the extracted function, maybe the code
              does too many things – split further.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we practice by taking a long function and
              extracting meaningful chunks. Students learn to see duplication
              as a code smell.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-purple-500 bg-purple-50/80 p-6 dark:bg-purple-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-purple-800 dark:text-purple-300">
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
              "I've seen students spend hours fixing the same bug in multiple
              places because they copied code instead of creating a function.
              Refactoring is not just about reducing lines – it's about reducing
              the mental load. When you see duplication, treat it as a warning
              sign. Your future self will thank you."
            </p>
          </div>
          <div className="rounded-full bg-purple-200 p-3 dark:bg-purple-800">
            <svg
              className="h-12 w-12 text-purple-700 dark:text-purple-300"
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
            "Have I identified all repeated code blocks?",
            "Does the new function have a clear, descriptive name?",
            "Are the parameters chosen so the function is flexible?",
            "Did I replace every duplicate with a call?",
            "Did I test that behaviour hasn't changed?",
            "Could this function be useful in other parts of the program?",
            "Did I remove any commented‑out copies?",
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

export default Topic35;