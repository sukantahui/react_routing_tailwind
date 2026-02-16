import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import tooManyTasksBad from "./topic48_files/too_many_tasks_bad.c?raw";
import singleResponsibilityGood from "./topic48_files/single_responsibility_good.c?raw";

const Topic48 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent dark:from-red-400 dark:to-pink-400">
            Avoiding Functions That Do Too Many Tasks
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          When a function tries to be a superhero, it becomes a maintenance
          nightmare. Learn to spot overloaded functions and split them into
          focused, manageable pieces.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">The Superfunction Trap</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Debangshu wrote a function called{" "}
          <code>processEmployeeData()</code>. It reads input, validates,
          calculates salary, updates a database, and generates a PDF report – all
          in 300 lines. When Tuhina needed to change the tax calculation, she
          spent hours understanding the entire beast and accidentally broke the
          PDF generation. Functions that do too many tasks are hard to read,
          test, debug, and reuse. The solution: split them into smaller,
          single‑purpose functions that each do one thing well.
        </p>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {[
          {
            title: "Single Responsibility",
            desc: "A function should have one clear purpose. If you can't describe it in one sentence, it's doing too much.",
            icon: "🎯",
          },
          {
            title: "Readability",
            desc: "Small functions are easier to read and understand. You don't need to keep many details in your head.",
            icon: "📖",
          },
          {
            title: "Testability",
            desc: "Testing a function that does ten things requires ten times the test cases. Split them for focused tests.",
            icon: "🧪",
          },
          {
            title: "Reusability",
            desc: "A tiny validation function can be reused everywhere; a giant superfunction cannot.",
            icon: "♻️",
          },
          {
            title: "Parallel Development",
            desc: "When functions are small, multiple team members can work on different parts without conflicts.",
            icon: "👥",
          },
          {
            title: "Debugging",
            desc: "When a bug appears, you know exactly which small function to check, not a 500‑line monster.",
            icon: "🐛",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-red-600",
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
        <h2 className="mb-6 text-2xl font-semibold">Overloaded vs Focused Functions</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> Too Many Tasks
            </h3>
            <EditableCCodeBlock
              title="too_many_tasks_bad.c – One function does everything"
              initialCode={tooManyTasksBad}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep's <code>manageEmployee()</code> handles input, validation,
              calculation, and output. Any change risks breaking unrelated parts.
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
              <span className="mr-2">✅</span> Focused Functions
            </h3>
            <EditableCCodeBlock
              title="single_responsibility_good.c – Each has one job"
              initialCode={singleResponsibilityGood}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Abhronila split the logic into small, single‑purpose functions.
              Each can be tested and modified independently.
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
            <strong>The kitchen sink function:</strong> One function that handles
            user input, validation, business logic, and persistence.
          </li>
          <li>
            <strong>Copy‑paste twins:</strong> When similar logic appears in
            multiple places, it's a sign that you haven't extracted a shared
            function.
          </li>
          <li>
            <strong>Long parameter lists:</strong> More than 4 parameters often
            mean the function is doing too much or should use a struct.
          </li>
          <li>
            <strong>Flag parameters:</strong> A boolean flag that changes
            behaviour usually indicates the function does two different things.
          </li>
          <li>
            <strong>Comments explaining complex sections:</strong> If you need to
            comment a block to explain what it does, extract it into a named
            function.
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
            <li>Keep functions small – aim for 5–15 lines.</li>
            <li>Extract distinct logic into helper functions.</li>
            <li>Name functions after the single task they perform.</li>
            <li>Write unit tests for each small function.</li>
            <li>Use the "one level of abstraction" rule: a function should either do high‑level orchestration or low‑level details, not both.</li>
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
            <li>Write functions longer than 30 lines without good reason.</li>
            <li>Mix I/O, calculation, and validation in the same function.</li>
            <li>Use flags to switch behaviour – create separate functions instead.</li>
            <li>Ignore code duplication – it's a cry for extraction.</li>
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
          example, <code>manageEmployee()</code> does four distinct things. If
          you need to change the tax rate, you must read through input and output
          code. In the good example, you only look at <code>calculateSalary()</code>.
          <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Add a new rule: give a bonus to
            employees with >5 years experience. In the bad version, you'd have to
            modify the giant function. In the good version, you'd create a new
            small function <code>calculateBonus()</code> and call it from{" "}
            <code>calculateSalary()</code>. Much safer.
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
              Describe the function: "It reads input and validates and calculates
              and prints." If you use "and", it's doing too much.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Cyclomatic complexity
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Measure complexity with tools. High complexity often correlates
              with too many tasks.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Test‑Driven Development
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Writing tests first forces you to design small, testable functions.
              You'll naturally avoid big functions.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we use the "recipe" analogy: a recipe step should
              be one action. "Bake the cake" is fine; "mix flour, sugar, eggs,
              and then bake, then cool, then frost" is four steps.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-red-500 bg-red-50/80 p-6 dark:bg-red-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-red-800 dark:text-red-300">
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
              "I've seen students create functions of 500+ lines and then wonder
              why debugging takes days. A function should be like a well‑organized
              toolbox: each tool does one job. When you open the toolbox, you
              know exactly which tool to pick. Train yourself to spot functions
              that are doing too much – your future self will thank you."
            </p>
          </div>
          <div className="rounded-full bg-red-200 p-3 dark:bg-red-800">
            <svg
              className="h-12 w-12 text-red-700 dark:text-red-300"
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
            "Can I describe the function's purpose in one sentence without 'and'?",
            "Is the function small enough to fit on one screen?",
            "Does it mix input, processing, and output?",
            "Are there flags that change its behaviour?",
            "Could I reuse part of it without copying code?",
            "Would a new team member understand it quickly?",
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

export default Topic48;