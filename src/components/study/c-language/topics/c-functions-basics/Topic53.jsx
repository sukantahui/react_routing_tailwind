import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import noGuardHeader from "./topic53_files/no_guard.h.c?raw";
import withGuardHeader from "./topic53_files/with_guard.h.c?raw";
import duplicateInclude from "./topic53_files/duplicate_include.c?raw";

const Topic53 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            Include Guards (#ifndef, #define, #endif)
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Prevent multiple inclusions of the same header – a must for every
          header file in C and C++.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Why Include Guards?</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Swadeep created a header <code>student.h</code> with
          a struct definition. He included it in both <code>main.c</code> and{" "}
          <code>grades.c</code>. When he compiled, the compiler complained about
          "multiple definition" of the struct. The preprocessor literally pastes
          the header content into each file. If the same header is included more
          than once in a translation unit (e.g., via nested includes), the
          compiler sees the same definitions twice – an error. Include guards,
          using <code>#ifndef</code>, <code>#define</code>, and <code>#endif</code>,
          ensure that the content is processed only once.
        </p>
      </section>

      {/* SVG Flowchart: How Include Guards Work */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-2xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 400 200" className="w-full">
            {/* First include */}
            <rect x="20" y="20" width="120" height="30" fill="#3b82f6" rx="4" />
            <text x="30" y="42" fill="white" fontSize="10">#include "header.h"</text>
            <line x1="80" y1="50" x2="80" y2="80" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Header content */}
            <rect x="20" y="90" width="200" height="60" fill="#f59e0b" rx="4" />
            <text x="30" y="110" fill="white" fontSize="10">#ifndef HEADER_H</text>
            <text x="30" y="130" fill="white" fontSize="10">#define HEADER_H</text>
            <text x="30" y="150" fill="white" fontSize="10">... content ...</text>
            <text x="30" y="170" fill="white" fontSize="10">#endif</text>

            {/* Second include */}
            <rect x="250" y="20" width="120" height="30" fill="#3b82f6" rx="4" />
            <text x="260" y="42" fill="white" fontSize="10">#include "header.h"</text>
            <line x1="310" y1="50" x2="310" y2="120" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Skip because guard defined */}
            <rect x="250" y="130" width="120" height="30" fill="#9ca3af" rx="4" />
            <text x="260" y="152" fill="white" fontSize="10">(skipped – guard active)</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            The first include defines the guard macro; subsequent includes skip the content.
          </p>
        </div>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {[
          {
            title: "#ifndef",
            desc: "If the macro is not defined, proceed to include the content.",
            icon: "🔍",
          },
          {
            title: "#define",
            desc: "Define the macro to mark that this header has been processed.",
            icon: "📌",
          },
          {
            title: "#endif",
            desc: "Close the conditional block.",
            icon: "🔚",
          },
          {
            title: "Guard Macro Name",
            desc: "Typically the header filename in uppercase, with underscores instead of dots (e.g., `STUDENT_H`).",
            icon: "🏷️",
          },
          {
            title: "Unique Across Project",
            desc: "Guard macros must be unique to avoid accidentally suppressing other headers.",
            icon: "🆔",
          },
          {
            title: "Not Just for Headers",
            desc: "You can use these guards in any file to prevent multiple inclusions of code.",
            icon: "🛡️",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600",
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
        <h2 className="mb-6 text-2xl font-semibold">Without vs With Include Guards</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> No Include Guard
            </h3>
            <EditableCCodeBlock
              title="no_guard.h – Missing guards"
              initialCode={noGuardHeader}
            />
            <EditableCCodeBlock
              title="duplicate_include.c – Includes the same header twice"
              initialCode={duplicateInclude}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina's header lacks guards. When <code>duplicate_include.c</code>{" "}
              includes it twice (directly and via another header), the compiler
              sees duplicate definitions and throws an error.
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
              <span className="mr-2">✅</span> With Include Guard
            </h3>
            <EditableCCodeBlock
              title="with_guard.h – Proper guard"
              initialCode={withGuardHeader}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu's header uses the guard pattern. Even if included
              multiple times, the content is processed only once.
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              <code>duplicate_include.c</code> would compile without errors when
              using this guarded header.
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
            <strong>Forgetting include guards entirely:</strong> Leads to
            multiple definition errors when a header is included more than once.
          </li>
          <li>
            <strong>Non‑unique guard macro names:</strong> Using `HEADER_H` in
            multiple headers – the first one processed will suppress the others.
          </li>
          <li>
            <strong>Misplaced #endif:</strong> Putting #endif before the end of
            the content leaves some declarations unprotected.
          </li>
          <li>
            <strong>Using #pragma once instead:</strong> While supported by most
            compilers, it's not standard C. Include guards are portable.
          </li>
          <li>
            <strong>Typo in guard macro:</strong> e.g., `#idndef` – the guard
            won't work and you'll get strange errors.
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
            <li>Always put include guards in every header file.</li>
            <li>Use the filename in uppercase as the macro name (e.g., `MY_HEADER_H`).</li>
            <li>Place the guard at the very top and bottom of the file.</li>
            <li>Ensure the macro name is unique across the project (add a project prefix).</li>
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
            <li>Rely on `#pragma once` alone (though it's fine as a supplement).</li>
            <li>Use generic names like `HEADER_H`.</li>
            <li>Place code before or after the guard (except comments).</li>
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
          <span className="font-medium">Observe carefully:</span> In the
          duplicate include example, imagine `header1.h` includes `header2.h`,
          and `main.c` includes both. Without guards in `header2.h`, its content
          appears twice in the final preprocessed file – causing redefinition
          errors. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Add include guards to
            `no_guard.h` and see the error disappear. Then try changing the
            guard macro name to something that collides with another header and
            observe the new error.
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
              🔧 Use a consistent naming scheme
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Example: `PROJECTNAME_FILENAME_H`. This guarantees uniqueness.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Test your guards
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Try including the same header twice in a test .c file. If it
              compiles, your guard works.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📖 Document the guard
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              A comment after #endif helps readability: `#endif // MY_HEADER_H`.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we have a template for new headers with the guard
              already written. Students learn to never start a header without it.
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
              "Include guards are like seatbelts: you don't notice them until you
              need them. I've seen students spend hours debugging a 'multiple
              definition' error that could have been prevented by a simple
              #ifndef. Make it a habit: every new header file, type the guard
              first. Your future self will thank you."
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
            "Does every header file have an include guard?",
            "Is the guard macro name unique and descriptive?",
            "Does the #endif have a comment indicating which guard it closes?",
            "Have I tested including the header twice in a test file?",
            "Is the guard placed at the very top and bottom of the file?",
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

export default Topic53;