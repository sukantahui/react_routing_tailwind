import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import missingPrototype from "./topic39_files/missing_prototype.c?raw";
import wrongPrototype from "./topic39_files/wrong_prototype.c?raw";

const Topic39 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent dark:from-red-400 dark:to-pink-400">
            Compiler Errors Caused by Missing or Wrong Prototypes
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Learn to read and fix the most common function‑related compiler
          errors – and understand why they happen.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">
          When Prototypes Go Wrong
        </h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Ritaja is excited to write her first multi‑file
          program. She calls a function <code>computeAverage()</code> but forgets
          to include the header where it's declared. The compiler screams:
          <em> "implicit declaration of function"</em>. Or she declares it as
          returning <code>int</code> but defines it as <code>float</code> –
          chaos ensues. Understanding these errors is a superpower: it turns
          cryptic messages into clear instructions for fixing your code.
        </p>
      </section>

      {/* Two Main Categories */}
      <div className="mb-12 grid gap-6 md:grid-cols-1">
        {[
          {
            title: "Missing Prototype",
            desc: "The compiler has never seen the function before the call. In C99+, this is an error.",
            icon: "🔍",
          },
          {
            title: "Wrong Prototype",
            desc: "The declaration exists but doesn't match the definition – different return type, parameter types, or number of parameters.",
            icon: "⚠️",
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
        <h2 className="mb-6 text-2xl font-semibold">
          Errors in the Wild (and How to Fix Them)
        </h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-orange-200 bg-orange-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-orange-900 dark:bg-orange-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-orange-700 dark:text-orange-400">
              <span className="mr-2">⚠️</span> Missing Prototype
            </h3>
            <EditableCCodeBlock
              title="missing_prototype.c – implicit declaration error"
              initialCode={missingPrototype}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep forgot to include <code>&lt;math.h&gt;</code> for{" "}
              <code>sqrt()</code>. The compiler generates an implicit
              declaration warning/error.
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
              <span className="mr-2">❌</span> Wrong Prototype
            </h3>
            <EditableCCodeBlock
              title="wrong_prototype.c – conflicting types error"
              initialCode={wrongPrototype}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina declared <code>getDiscount()</code> as returning{" "}
              <code>int</code>, but defined it as <code>float</code>. The
              compiler complains about conflicting types.
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
            <strong>Forgetting #include:</strong> Using <code>printf()</code>{" "}
            without <code>#include &lt;stdio.h&gt;</code> causes implicit
            declaration warning/error.
          </li>
          <li>
            <strong>Mismatched return type:</strong> Prototype says{" "}
            <code>int</code>, definition says <code>double</code> – undefined
            behaviour.
          </li>
          <li>
            <strong>Wrong number of parameters:</strong> Calling a function
            with 3 arguments when it expects 2 leads to stack corruption.
          </li>
          <li>
            <strong>Parameter type mismatch:</strong> Prototype says{" "}
            <code>double</code>, you pass an <code>int</code> – compiler may
            warn, but if no prototype, it assumes wrong types.
          </li>
          <li>
            <strong>Static function used outside its file:</strong> Compiler
            error "undefined reference" – the function is invisible.
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
            <li>Always include the correct headers for library functions.</li>
            <li>Put function prototypes in headers and include them where needed.</li>
            <li>Compile with <code>-Wall -Werror</code> to catch all warnings as errors.</li>
            <li>Check that the prototype and definition match exactly.</li>
            <li>Use <code>void</code> for functions with no parameters: <code>int foo(void);</code></li>
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
            <li>Ignore compiler warnings – they are future errors.</li>
            <li>Assume a missing prototype is harmless.</li>
            <li>Declare a function in one place and define it differently elsewhere.</li>
            <li>Use a function without checking its signature in the documentation.</li>
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
          <span className="font-medium">Observe carefully:</span> In the missing
          prototype example, the error message might say{" "}
          <code>"implicit declaration of function 'sqrt'"</code>. That's your
          clue: the compiler has never seen <code>sqrt</code> before. The fix is
          to include the right header (<code>math.h</code>). <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> In the wrong prototype example,
            change the definition to match the prototype (or vice versa). Notice
            how the error disappears. Consistency is key.
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
              🧪 Use <code>gcc -c -Wall -Werror</code> early
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Catch prototype mismatches at compile time. Fix them immediately
              – don't let warnings pile up.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📖 Read the first line of the error
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              It usually tells you the exact line and the nature of the problem.
              "conflicting types" means prototype vs definition mismatch.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🗂️ Header file self‑sufficiency
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              A header should include everything it needs to compile. That way,
              including it brings in all required prototypes.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we have a "prototype wall" – students write
              prototypes on sticky notes and place them before the code. It
              visualises why order matters.
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
              "I've lost count of how many times students have stared at an
              'implicit declaration' error, thinking their code is cursed. It's
              not – it's just a missing header or prototype. Learning to read
              compiler errors is like learning a new language. Once you
              understand what they're saying, debugging becomes much easier."
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
            "Have I included all necessary headers?",
            "Does the function prototype match the definition exactly?",
            "Are the number and types of arguments in calls correct?",
            "Do I compile with warnings enabled (`-Wall -Werror`)?",
            "If I see an 'implicit declaration' error, have I included the right header?",
            "If I see 'conflicting types', have I checked prototype vs definition?",
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

export default Topic39;