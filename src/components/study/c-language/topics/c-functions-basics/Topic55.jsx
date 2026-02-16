import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import inlineFunction from "./topic55_files/inline_function.c?raw";
import inlineVsMacro from "./topic55_files/inline_vs_macro.c?raw";
import inlineHeader from "./topic55_files/inline_header.h.c?raw";
import inlineUsage from "./topic55_files/inline_usage.c?raw";

const Topic55 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-orange-400">
            Inline Functions – Concept and Trade‑offs
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          A hint to the compiler: "replace this call with the function body".
          Speed vs. size – and when it actually helps.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">What Are Inline Functions?</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Ritaja noticed that a tiny function like{" "}
          <code>{`int max(int a, int b){ return a > b ? a : b; }`}</code> was
          called thousands of times. Each call had overhead: pushing arguments,
          jumping, returning. She wondered: could we just paste the code where
          it's called? That's exactly what <strong>inline functions</strong> aim
          to do. The <code>inline</code> keyword suggests to the compiler: insert
          the function's body at the call site instead of generating a call. It's
          a trade‑off: faster execution but larger code size. And it's only a
          hint – the compiler may ignore it.
        </p>
      </section>

      {/* SVG Illustration: Inline Expansion */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-3xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 500 200" className="w-full">
            {/* Before: function call */}
            <text x="30" y="30" fill="#374151" fontSize="14" fontWeight="bold">Before</text>
            <rect x="30" y="40" width="120" height="30" fill="#3b82f6" rx="4" />
            <text x="50" y="62" fill="white" fontSize="10">x = max(a, b);</text>
            <line x1="90" y1="70" x2="90" y2="100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="30" y="110" width="120" height="40" fill="#f59e0b" rx="4" />
            <text x="40" y="135" fill="white" fontSize="10">max function body</text>
            <line x1="90" y1="150" x2="90" y2="170" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="30" y="190" fill="black" fontSize="10">call overhead</text>

            {/* Arrow */}
            <line x1="200" y1="100" x2="270" y2="100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="220" y="90" fill="#6b7280" fontSize="12">inline</text>

            {/* After: expanded */}
            <text x="320" y="30" fill="#374151" fontSize="14" fontWeight="bold">After</text>
            <rect x="320" y="40" width="150" height="100" fill="#059669" rx="4" />
            <text x="330" y="70" fill="white" fontSize="10">x = a > b ? a : b;</text>
            <text x="330" y="100" fill="white" fontSize="10">(no call)</text>
            <text x="330" y="130" fill="white" fontSize="10">body inserted directly</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Inline replaces the call with the function body, eliminating call overhead.
          </p>
        </div>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {[
          {
            title: "Performance",
            desc: "Eliminates function call overhead (push, pop, jump). Good for tiny, frequently used functions.",
            icon: "⚡",
          },
          {
            title: "Code Bloat",
            desc: "If the function is large or called many times, inlining can significantly increase binary size.",
            icon: "📈",
          },
          {
            title: "Compiler Hint",
            desc: "`inline` is a suggestion, not a command. The compiler decides based on optimization settings.",
            icon: "💡",
          },
          {
            title: "Static Inline",
            desc: "Declaring a function `static inline` in a header gives each file its own copy – safe but may increase size.",
            icon: "🔒",
          },
          {
            title: "Inline vs Macro",
            desc: "Unlike macros, inline functions respect scope and type checking, and evaluate arguments once.",
            icon: "🔍",
          },
          {
            title: "Linkage Issues",
            desc: "An inline function without `static` or `extern` may cause multiple definition errors if not handled carefully.",
            icon: "🔗",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-amber-600",
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
        <h2 className="mb-6 text-2xl font-semibold">Inline Functions in Practice</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-blue-200 bg-blue-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-blue-900 dark:bg-blue-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-blue-700 dark:text-blue-400">
              <span className="mr-2">🔧</span> Inline Function
            </h3>
            <EditableCCodeBlock
              title="inline_function.c – Simple inline example"
              initialCode={inlineFunction}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu defines an inline <code>max()</code>. The compiler may
              expand it at the call site.
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
              <span className="mr-2">⚖️</span> Inline vs Macro
            </h3>
            <EditableCCodeBlock
              title="inline_vs_macro.c – Safer than macros"
              initialCode={inlineVsMacro}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina compares a macro and an inline function. The macro evaluates
              arguments twice, leading to wrong results. The inline function
              behaves correctly.
            </p>
          </div>
        </div>

        {/* Header with inline */}
        <div className="mt-8 grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-purple-200 bg-purple-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-purple-900 dark:bg-purple-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-purple-700 dark:text-purple-400">
              <span className="mr-2">📂</span> Static Inline in Header
            </h3>
            <EditableCCodeBlock
              title="inline_header.h – Safe for multiple includes"
              initialCode={inlineHeader}
            />
            <EditableCCodeBlock
              title="inline_usage.c – Using the inline header"
              initialCode={inlineUsage}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep uses <code>static inline</code> in a header. Each .c file
              gets its own copy – no linker errors, but code size increases.
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
            <strong>Assuming inline always happens:</strong> The compiler may
            ignore `inline`, especially without optimizations enabled.
          </li>
          <li>
            <strong>Inline in header without static:</strong> An inline function
            defined in a header (without `static`) may cause multiple definition
            errors if the header is included in multiple .c files.
          </li>
          <li>
            <strong>Code bloat:</strong> Inlining large functions or inlining in
            many places can increase binary size, potentially hurting performance
            (cache misses).
          </li>
          <li>
            <strong>Overusing inline:</strong> Modern compilers are good at
            deciding what to inline. Let the compiler do its job unless you have
            measured a bottleneck.
          </li>
          <li>
            <strong>Recursive inline:</strong> A recursive function cannot be
            fully inlined; the compiler will ignore the hint.
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
            <li>Use `static inline` for small functions defined in headers.</li>
            <li>Use inline only for very small, performance‑critical functions.</li>
            <li>Measure performance before and after inlining.</li>
            <li>Prefer inline functions over macros for type safety.</li>
            <li>Enable compiler optimizations (`-O2`, `-O3`) to let the compiler inline wisely.</li>
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
            <li>Inline large functions (over 10–20 lines).</li>
            <li>Use `inline` without `static` in headers (risk of multiple definitions).</li>
            <li>Assume `inline` will make your code faster – measure first.</li>
            <li>Use inline for I/O functions or system calls (they are already slow).</li>
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
          <span className="font-medium">Observe carefully:</span> In the macro vs
          inline example, <code>SQUARE(x++)</code> increments <code>x</code> twice
          because the macro expands to <code>x++ * x++</code>. The inline function
          evaluates the argument once, giving the expected result. This shows why
          inline functions are safer. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Compile the inline example with
            and without <code>-O2</code>. Look at the generated assembly (use
            <code>gcc -S</code>) to see if the call was actually inlined.
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
              🔍 Check with <code>-Winline</code>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              GCC's <code>-Winline</code> warns when a function marked `inline`
              cannot be inlined.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Use <code>__attribute__((always_inline))</code>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              In GCC/clang, you can force inlining with this attribute, but use
              sparingly.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Profile before optimizing
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Use a profiler (gprof, perf) to find hot spots before marking
              functions inline.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we compare assembly output for a small function
              with and without inline to see the difference.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-amber-500 bg-amber-50/80 p-6 dark:bg-amber-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-amber-800 dark:text-amber-300">
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
              "Inline functions are one of those features that seem simple but
              have subtle consequences. I've seen students litter their code with
              `inline` hoping for magic speedups, only to get larger binaries and
              no measurable gain. Teach them to respect the compiler's
              intelligence and to measure first. And always prefer inline over
              macros for type safety."
            </p>
          </div>
          <div className="rounded-full bg-amber-200 p-3 dark:bg-amber-800">
            <svg
              className="h-12 w-12 text-amber-700 dark:text-amber-300"
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
            "Is the function very small (1–5 lines)?",
            "Is it called frequently in a performance‑critical section?",
            "Have I measured that inlining improves performance?",
            "If in a header, is it `static inline` to avoid linker errors?",
            "Does it avoid recursion?",
            "Is it type‑safe (unlike macros)?",
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

export default Topic55;