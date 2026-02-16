import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import badHeader from "./topic54_files/bad_header.h.c?raw";
import badMain1 from "./topic54_files/bad_main1.c?raw";
import badMain2 from "./topic54_files/bad_main2.c?raw";
import goodHeader from "./topic54_files/good_header.h.c?raw";
import goodImpl from "./topic54_files/good_impl.c?raw";
import goodMain from "./topic54_files/good_main.c?raw";

const Topic54 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
            Avoiding Multiple Definition Errors
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          The linker's worst nightmare: duplicate symbols. Learn how to organise
          your code to keep it happy.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">What Are Multiple Definition Errors?</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Abhronila created a header `math_utils.h` with a
          function <code>{`int add(int a, int b) {{ return a + b; }}`}</code>. She
          included this header in both `main.c` and `calculator.c`. When linking,
          the linker saw two definitions of `add` – one from each object file –
          and threw a "multiple definition" error. The rule is: declarations can
          be repeated, but definitions (the actual code or global variable
          instantiation) must appear only once across the entire program.
        </p>
      </section>

      {/* SVG Illustration: Linker Error */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-2xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 400 200" className="w-full">
            {/* main.o */}
            <rect x="20" y="20" width="100" height="80" fill="#3b82f6" rx="4" />
            <text x="40" y="50" fill="white" fontSize="10">main.o</text>
            <text x="30" y="70" fill="white" fontSize="8">contains add()</text>
            <text x="30" y="90" fill="white" fontSize="8">(from header)</text>

            {/* calculator.o */}
            <rect x="150" y="20" width="100" height="80" fill="#3b82f6" rx="4" />
            <text x="170" y="50" fill="white" fontSize="10">calculator.o</text>
            <text x="160" y="70" fill="white" fontSize="8">contains add()</text>
            <text x="160" y="90" fill="white" fontSize="8">(from header)</text>

            {/* Linker */}
            <rect x="280" y="20" width="80" height="80" fill="#f59e0b" rx="4" />
            <text x="295" y="60" fill="white" fontSize="10">linker</text>

            {/* Error message */}
            <text x="200" y="150" fill="#dc2626" fontSize="12" fontWeight="bold">
              multiple definition of `add`
            </text>

            <line x1="120" y1="60" x2="280" y2="60" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="250" y1="60" x2="280" y2="60" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Two object files both contain a definition of `add` – the linker
            cannot choose.
          </p>
        </div>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Declaration vs Definition",
            desc: "Declarations (prototypes) can be repeated; definitions (function bodies, global variables) must be unique.",
            icon: "📜",
          },
          {
            title: "One Definition Rule (ODR)",
            desc: "In C, each function and global variable must have exactly one definition across the whole program.",
            icon: "⚖️",
          },
          {
            title: "Header Files: Declarations Only",
            desc: "Headers should contain prototypes, not function bodies (unless static or inline).",
            icon: "📂",
          },
          {
            title: "Source Files: Definitions",
            desc: "Put function definitions in .c files, compiled separately and linked together.",
            icon: "🔨",
          },
          {
            title: "Static Functions",
            desc: "Declaring a function `static` gives it internal linkage – each file can have its own copy.",
            icon: "🔒",
          },
          {
            title: "Inline Functions",
            desc: "`inline` can help, but the linker still needs one external definition if the function is used in a certain way.",
            icon: "⚡",
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

      {/* Concrete C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Multiple Definitions: Bad vs Good</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> Bad: Definition in Header
            </h3>
            <EditableCCodeBlock
              title="bad_header.h – Defines a function"
              initialCode={badHeader}
            />
            <EditableCCodeBlock
              title="bad_main1.c – Includes header"
              initialCode={badMain1}
            />
            <EditableCCodeBlock
              title="bad_main2.c – Also includes header"
              initialCode={badMain2}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep put the function body in the header. Both `bad_main1.c` and
              `bad_main2.c` include it, so each object file contains a definition.
              The linker sees two `add` functions – error.
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
              <span className="mr-2">✅</span> Good: Declaration in Header, Definition in One .c
            </h3>
            <EditableCCodeBlock
              title="good_header.h – Only prototype"
              initialCode={goodHeader}
            />
            <EditableCCodeBlock
              title="good_impl.c – Single definition"
              initialCode={goodImpl}
            />
            <EditableCCodeBlock
              title="good_main.c – Uses the function"
              initialCode={goodMain}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina put only the prototype in the header, and the definition in
              `good_impl.c`. Both `good_main.c` and any other file can include
              the header, but the definition exists only once – linker happy.
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
            <strong>Function body in header:</strong> The most common cause of
            multiple definition errors.
          </li>
          <li>
            <strong>Global variable defined in header:</strong> e.g.,{" "}
            <code>int counter = 0;</code> in a header – each .c gets its own copy.
          </li>
          <li>
            <strong>Missing `static` for file‑scope functions:</strong> If a
            helper function is only used in one .c, declare it `static` to avoid
            polluting the global namespace.
          </li>
          <li>
            <strong>Inlining confusion:</strong> Using `inline` without a
            separate external definition can still cause multiple definition
            errors in some scenarios.
          </li>
          <li>
            <strong>Forgetting include guards:</strong> While guards prevent
            multiple inclusions in one translation unit, they don't help with
            multiple definitions across different .c files.
          </li>
        </ul>
      </section>

      {/* Best Practices Summary */}
      <section className="mb-12 grid gap-6 md:grid-cols-2">
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
            <li>Put function prototypes in headers, definitions in .c files.</li>
            <li>For global variables, use `extern` in headers and define in one .c.</li>
            <li>Use `static` for functions and globals that are local to a file.</li>
            <li>Link object files correctly (list all .c files in compilation).</li>
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
            <li>Define functions in headers (except `static` or `inline` with care).</li>
            <li>Define global variables in headers.</li>
            <li>Ignore linker errors – they tell you exactly which symbol is duplicated.</li>
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
          example, `bad_header.h` defines `add()`. When you compile `bad_main1.c`
          and `bad_main2.c`, each produces an object file containing the machine
          code for `add`. The linker sees two copies and doesn't know which one
          to use – it's an error. In the good example, only `good_impl.c`
          contains the definition; `good_main.c` only has a declaration. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Move the definition from the bad
            header into a separate `.c` file, and keep only the prototype in the
            header. Recompile and see the error disappear.
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
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🛠️ Use `nm` to inspect symbols
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              The `nm` tool lists symbols in object files. You can see if a
              symbol is defined in multiple files.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 The `static` keyword
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Use `static` for helper functions that are only needed in one file.
              They won't cause multiple definition errors.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🔗 Linking order matters
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              When linking, order of object files can affect resolution, but not
              multiple definition errors – those are fatal.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we teach the "one definition, many declarations"
              rule with an analogy: one cook (definition) in the kitchen, many
              menus (declarations) around the restaurant.
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
              "Multiple definition errors are a rite of passage for every C
              programmer. The moment you understand why they happen, you truly
              grasp the difference between declarations and definitions, and the
              role of the linker. I've seen students panic, but the fix is
              simple: move code out of headers. Remember: headers are for
              sharing interfaces, not implementations."
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
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {[
            "Does every header contain only declarations (prototypes, externs)?",
            "Is every non‑static function defined in exactly one .c file?",
            "Are global variables declared `extern` in headers and defined in one .c?",
            "Are file‑private functions marked `static`?",
            "Do I understand the linker error messages about duplicate symbols?",
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

export default Topic54;