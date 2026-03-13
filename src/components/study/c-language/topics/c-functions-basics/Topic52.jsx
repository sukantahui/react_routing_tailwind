import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import goodHeader from "./topic52_files/good_header.h.c?raw";
import badHeader from "./topic52_files/bad_header.h.c?raw";
import goodUsage from "./topic52_files/good_usage.c?raw";
import badUsage from "./topic52_files/bad_usage.c?raw";

const Topic52 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-rose-400">
            Header File Naming Conventions
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          A header's name is its first documentation. Choose wisely to make
          your project self‑explanatory and avoid name clashes.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Why Header Naming Matters</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Abhronila started a project with a header called{" "}
          <code>utils.h</code>. Soon, Debangshu added his own <code>utils.h</code>{" "}
          for a different module, and they conflicted. When Ritaja tried to
          include both, the compiler got confused. A good header name tells you
          what's inside, who it belongs to, and avoids collisions. In large
          projects, naming conventions are essential for organisation and
          maintenance.
        </p>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {[
          {
            title: "Descriptive Names",
            desc: "The name should reflect the module's purpose, e.g., `student_management.h` not `stuff.h`.",
            icon: "🏷️",
          },
          {
            title: "Project Prefix",
            desc: "Use a common prefix for all headers in a project, e.g., `libcna_` for CoderNAccoTax libraries.",
            icon: "🔤",
          },
          {
            title: "Match Source Files",
            desc: "Header `student.h` should pair with `student.c`. This makes navigation obvious.",
            icon: "🔗",
          },
          {
            title: "Include Guard Names",
            desc: "Guard macro should match the file name, e.g., `STUDENT_H` for `student.h`.",
            icon: "🛡️",
          },
          {
            title: "Lowercase with Underscores",
            desc: "Common convention: all lowercase with underscores (e.g., `file_utils.h`).",
            icon: "📂",
          },
          {
            title: "Avoid Generic Names",
            desc: "Names like `utils.h`, `common.h`, `defs.h` are too vague and likely to clash.",
            icon: "🚫",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-pink-600",
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

      {/* SVG Illustration: Good vs Bad Header Names */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-3xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 500 200" className="w-full">
            {/* Bad side */}
            <text x="30" y="30" fill="#dc2626" fontSize="14" fontWeight="bold">Bad: Generic Names</text>
            <rect x="30" y="40" width="150" height="30" fill="#fee2e2" rx="4" stroke="#dc2626" />
            <text x="40" y="62" fill="#dc2626" fontSize="12">utils.h</text>
            <rect x="30" y="80" width="150" height="30" fill="#fee2e2" rx="4" stroke="#dc2626" />
            <text x="40" y="102" fill="#dc2626" fontSize="12">common.h</text>
            <rect x="30" y="120" width="150" height="30" fill="#fee2e2" rx="4" stroke="#dc2626" />
            <text x="40" y="142" fill="#dc2626" fontSize="12">defs.h</text>

            {/* Arrow */}
            <line x1="190" y1="90" x2="220" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Good side */}
            <text x="260" y="30" fill="#059669" fontSize="14" fontWeight="bold">Good: Descriptive Names</text>
            <rect x="260" y="40" width="200" height="30" fill="#d1fae5" rx="4" stroke="#059669" />
            <text x="270" y="62" fill="#059669" fontSize="12">cna_student_management.h</text>
            <rect x="260" y="80" width="200" height="30" fill="#d1fae5" rx="4" stroke="#059669" />
            <text x="270" y="102" fill="#059669" fontSize="12">cna_file_utils.h</text>
            <rect x="260" y="120" width="200" height="30" fill="#d1fae5" rx="4" stroke="#059669" />
            <text x="270" y="142" fill="#059669" fontSize="12">cna_math_constants.h</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Descriptive names with project prefix avoid clashes and clarify purpose.
          </p>
        </div>
      </section>

      {/* Concrete C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Good vs Bad Header Naming</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> Bad Naming
            </h3>
            <EditableCCodeBlock
              title="bad_header.h – Generic and risky"
              initialCode={badHeader}
            />
            <EditableCCodeBlock
              title="bad_usage.c – Confusion with multiple 'utils.h'"
              initialCode={badUsage}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep used generic names. When another module also has{" "}
              <code>utils.h</code>, the compiler may include the wrong one.
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
              <span className="mr-2">✅</span> Good Naming
            </h3>
            <EditableCCodeBlock
              title="good_header.h – Descriptive and guarded"
              initialCode={goodHeader}
            />
            <EditableCCodeBlock
              title="good_usage.c – Clear includes"
              initialCode={goodUsage}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina used a project prefix and descriptive names. No ambiguity,
              and include guards match the file name.
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
            <strong>Generic names:</strong> <code>utils.h</code>,{" "}
            <code>common.h</code> – almost every project has them, causing
            clashes.
          </li>
          <li>
            <strong>Missing project prefix:</strong> In large codebases,
            different modules may have headers with the same name.
          </li>
          <li>
            <strong>Inconsistent naming:</strong> Mixing <code>student.h</code>,{" "}
            <code>teacherHeader.h</code>, <code>course.hpp</code> (different
            extensions) without reason.
          </li>
          <li>
            <strong>Include guards not matching file name:</strong> Guard macro
            <code>STUFF_H</code> in <code>utils.h</code> – confusing.
          </li>
          <li>
            <strong>Using uppercase file names:</strong> Some platforms are
            case‑sensitive; stick to lowercase for portability.
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
            <li>Use lowercase with underscores (e.g., `student_utils.h`).</li>
            <li>Prefix with project or module name (e.g., `cna_math.h`).</li>
            <li>Match header name to its implementation file (`student.c` ↔ `student.h`).</li>
            <li>Make include guard match the file name: `STUDENT_H` for `student.h`.</li>
            <li>Be specific: `string_utils.h` not `utils.h`.</li>
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
            <li>Use generic names like `utils.h`, `common.h`.</li>
            <li>Use spaces or special characters in file names.</li>
            <li>Forget include guards.</li>
            <li>Use different naming styles in the same project.</li>
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
          example, imagine two different libraries both have a <code>utils.h</code>.
          When you include both, only the first one's include guard prevents the
          second – but you might want both! With unique names, you can include
          both without conflict. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Rename <code>bad_header.h</code>{" "}
            to <code>cna_string_utils.h</code> and update the include guard.
            Notice how it becomes self‑explanatory.
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
              🏷️ Use a consistent prefix
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              For a company, use <code>cna_</code> (CoderNAccoTax). For a project,
              use <code>prj_</code>. This avoids collisions with third‑party
              libraries.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📁 Organise by subdirectory
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Put headers in <code>include/project/</code> and include as{" "}
              <code>#include "project/student.h"</code>. This adds another level
              of uniqueness.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🛡️ Guard naming convention
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Common pattern: <code>PROJECT_MODULE_H</code> for{" "}
              <code>module.h</code> in project.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we enforce that every header must have a name that
              lets you guess its content without opening it.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-pink-500 bg-pink-50/80 p-6 dark:bg-pink-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-pink-800 dark:text-pink-300">
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
              "I've seen projects with dozens of 'utils.h' files. It's a
              nightmare. A header's name is a promise about its content. Make
              that promise clear. And always, always use include guards that
              match the name. It's a small discipline that saves hours of
              debugging."
            </p>
          </div>
          <div className="rounded-full bg-pink-200 p-3 dark:bg-pink-800">
            <svg
              className="h-12 w-12 text-pink-700 dark:text-pink-300"
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
            "Is the header name descriptive of its contents?",
            "Does it include a project/module prefix?",
            "Does the include guard match the file name?",
            "Is the name in lowercase with underscores?",
            "Does it avoid generic terms like 'utils'?",
            "Does it pair with a similarly named source file?",
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

export default Topic52;