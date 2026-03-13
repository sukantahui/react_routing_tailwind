import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import goodNaming from "./topic34_files/good_naming.c?raw";
import badNaming from "./topic34_files/bad_naming.c?raw";

const Topic34 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent dark:from-green-400 dark:to-teal-400">
            Designing Function Names for Readability
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          A well‑chosen name is the best documentation — it tells you what the
          function does without reading a single comment.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Why Names Matter</h2>
        <p className="leading-relaxed">
          Imagine Tuhina opens a file and sees a function called{" "}
          <code>process()</code>. What does it process? How? Why? She has to
          read the entire body to guess. Now imagine she sees{" "}
          <code>calculateFinalGrade()</code> — instantly, she knows. At
          Barrackpore CNAT, we teach that naming is the first step to
          self‑documenting code. A good name acts like a clear label on a
          drawer: you know exactly what’s inside.
        </p>
      </section>

      {/* Key Principles Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {[
          {
            title: "Use Verbs for Actions",
            desc: "Functions that do something should start with a verb: `printReport()`, `validateEmail()`, `saveToFile()`.",
            icon: "🔨",
          },
          {
            title: "Nouns for Return Values",
            desc: "If the function returns a value, name it after what it returns: `getAge()`, `isValid()`, `totalPrice()`.",
            icon: "📦",
          },
          {
            title: "Be Specific, Not Vague",
            desc: "`calculate()` is vague; `calculateMonthlyTax()` tells you exactly what and when.",
            icon: "🎯",
          },
          {
            title: "Consistent Conventions",
            desc: "Stick to one style – camelCase (`calculateSum`) or snake_case (`calculate_sum`) – across your whole project.",
            icon: "📐",
          },
          {
            title: "Avoid Cryptic Abbreviations",
            desc: "`calcAvg()` is okay; `cA()` is not. Use standard abbreviations only (`max`, `min`, `len`).",
            icon: "🔤",
          },
          {
            title: "Pronounceable Names",
            desc: "If you can't say it in a conversation, it's a bad name. `genrdrpt` → `generateReport()`.",
            icon: "🗣️",
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

      {/* Real‑World C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Good Names vs. Bad Names</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">✅</span> Good Naming
            </h3>
            <EditableCCodeBlock
              title="good_naming.c – self‑documenting"
              initialCode={goodNaming}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Abhronila can understand what <code>calculateAverage()</code> and{" "}
              <code>isPassing()</code> do without looking inside. The names
              tell the story.
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
              <span className="mr-2">❌</span> Bad Naming
            </h3>
            <EditableCCodeBlock
              title="bad_naming.c – cryptic and confusing"
              initialCode={badNaming}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu has to read every line to guess what{" "}
              <code>calc()</code>, <code>chk()</code>, and <code>p()</code> do.
              Maintenance becomes a puzzle.
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
            <strong>Single‑letter names</strong> (except loop counters i, j).
            <code>int x;</code> tells you nothing.
          </li>
          <li>
            <strong>Misleading names</strong> – a function named{" "}
            <code>saveData()</code> that also deletes files.
          </li>
          <li>
            <strong>Inconsistent casing</strong>: mixing{" "}
            <code>calculateTotal</code> and <code>print_report</code> in the
            same project.
          </li>
          <li>
            <strong>Naming by implementation</strong> – <code>useArrayLoop()</code>{" "}
            instead of <code>calculateSum()</code>.
          </li>
          <li>
            <strong>Abbreviations that only you understand</strong> –{" "}
            <code>getUsrInf()</code> → <code>getUserInfo()</code>.
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
            <li>Use descriptive, intention‑revealing names.</li>
            <li>Follow a consistent naming convention (camelCase for functions).</li>
            <li>Use domain terms your team knows.</li>
            <li>Keep names short but meaningful – `getUser` not `fetchUserRecordFromDatabase`.</li>
            <li>Refactor names when the function’s purpose evolves.</li>
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
            <li>Use vague names like `doStuff`, `process`, `handle`.</li>
            <li>Rely on comments to explain what a name should say.</li>
            <li>Use Hungarian notation (int iCount) – types are checked by compiler.</li>
            <li>Name after side effects – `printAndReturn()` if it only returns.</li>
            <li>Be afraid to rename if the current name is unclear.</li>
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
          example, the function names read like a high‑level description of the
          program. You could almost explain the logic to a non‑programmer using
          just the names. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Rename <code>isPassing()</code>{" "}
            to <code>check()</code>. Does the code still tell you what it does?
            Good naming removes the need for extra comments.
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
              📖 Use Domain Language
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              In a banking app, use <code>calculateInterest()</code> not{" "}
              <code>computeSomething()</code>. Speak the user’s language.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🔄 Refactor Names Continuously
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              When you understand the code better, rename functions. Modern
              IDEs make it safe and fast.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Length Reflects Scope
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Short names (like <code>swap()</code>) are fine for widely used
              operations; longer names are better for rare or complex ones.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we practice by giving each other’s code a
              “name review” – if you can’t guess what a function does in 5
              seconds, rename it.
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
              "I always tell my students at Barrackpore CNAT: 'Code is read far
              more often than it is written.' Spending an extra minute to name
              a function well will save hours of confusion later. Good naming
              is a sign of respect for your future self and your teammates."
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
            "Does the function name clearly describe its purpose?",
            "Is it a verb for actions, a noun for return values?",
            "Would someone unfamiliar with the code understand it?",
            "Is the name consistent with other functions in the project?",
            "Are abbreviations standard and obvious?",
            "Can you pronounce the name in a conversation?",
            "Does the name avoid implementation details?",
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

export default Topic34;