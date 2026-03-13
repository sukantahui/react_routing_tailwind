/**
 * Topic 13: Why C Does Not Support Call by Reference Directly
 * File: Topic13.jsx
 *
 * Pedagogical Focus:
 * - Clarify that C is strictly call‑by‑value and has no built‑in reference parameters.
 * - Explain why this design choice was made (simplicity, efficiency, historical context).
 * - Contrast with languages that do have call‑by‑reference (C++, etc.).
 * - Build directly on Topic 12 (call by value) – no pointers yet.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> showing the absence of a reference mechanism.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic13_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic13_files/swap_attempt.c?raw";
import example2 from "./topic13_files/modify_attempt.c?raw";
import example3 from "./topic13_files/reference_note.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic13-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic13-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic13-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic13-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 13
// ----------------------------------------------------------------------
const Topic13 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic13-root",
          "min-h-screen w-full px-4 py-8 md:px-8 lg:px-16",
          "transition-colors duration-300",
          "font-sans leading-relaxed"
        )}
      >
        <div className="mx-auto max-w-4xl space-y-12">
          {/* ----- SECTION 1: TITLE + INTRO (fadeSlideUp, delay-0) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none"
            )}
          >
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-indigo-400 dark:text-indigo-400">
              🚫 Why C Does Not Support Call by Reference Directly
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              You now know that C always uses <strong>call by value</strong>. But
              why doesn’t C have true call‑by‑reference like C++ or other languages?
              This topic explores the design philosophy behind this choice and what
              it means for your code.
            </p>
          </section>

          {/* ----- SECTION 2: CORE CONCEPT – NO REFERENCE PARAMETERS (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 C Has No Reference Parameters
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic13-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  In languages like C++, you can declare a parameter as a reference
                  using <code>&amp;</code>:
                </p>
                <pre className="mb-3 rounded bg-gray-800 p-2 text-sm">
                  <span className="text-purple-400">void</span> swap(<span className="text-amber-300">int&amp; x, int&amp; y</span>);
                </pre>
                <p className="mb-3">
                  This means <code>x</code> and <code>y</code> become aliases for the
                  original arguments – changes affect the caller directly.
                </p>
                <p>
                  <strong>C has no such syntax.</strong> Every parameter is a
                  separate local variable initialised with a copy. The language
                  simply does not provide a way to create an alias to a caller’s
                  variable.
                </p>
                <div className="mt-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                  <span className="text-gray-400">// C only:</span>
                  <br />
                  <span className="text-purple-400">void</span>{" "}
                  <span className="text-amber-300">swap</span>(
                  <span className="text-emerald-300">int x, int y</span>);{" "}
                  <span className="text-gray-400">// copies only</span>
                </div>
              </div>

              {/* Right: animated SVG – missing reference link */}
              <div
                className={clsx(
                  "topic13-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="280"
                  height="160"
                  viewBox="0 0 280 160"
                  className="w-full max-w-xs"
                >
                  {/* Caller's variables */}
                  <rect
                    x="20"
                    y="40"
                    width="60"
                    height="40"
                    rx="6"
                    fill="#4f46e5"
                    fillOpacity="0.1"
                    stroke="#818cf8"
                    strokeWidth="2"
                  />
                  <text x="50" y="65" textAnchor="middle" fill="#c7d2fe" fontSize="12">
                    a, b
                  </text>

                  {/* Function box */}
                  <rect
                    x="140"
                    y="30"
                    width="100"
                    height="80"
                    rx="12"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <text x="190" y="70" fill="#9ca3af" fontSize="12">
                    function
                  </text>

                  {/* Parameter copies inside */}
                  <rect
                    x="160"
                    y="70"
                    width="40"
                    height="20"
                    rx="4"
                    fill="#4f46e5"
                    fillOpacity="0.2"
                    stroke="#818cf8"
                    strokeWidth="1.5"
                  />
                  <text x="180" y="85" fill="#c7d2fe" fontSize="8" textAnchor="middle">
                    x (copy)
                  </text>
                  <rect
                    x="210"
                    y="70"
                    width="40"
                    height="20"
                    rx="4"
                    fill="#4f46e5"
                    fillOpacity="0.2"
                    stroke="#818cf8"
                    strokeWidth="1.5"
                  />
                  <text x="230" y="85" fill="#c7d2fe" fontSize="8" textAnchor="middle">
                    y (copy)
                  </text>

                  {/* Attempted reference link – crossed out */}
                  <line
                    x1="85"
                    y1="60"
                    x2="155"
                    y2="75"
                    stroke="#f87171"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <circle cx="120" cy="50" r="12" stroke="#f87171" strokeWidth="2" fill="none" />
                  <line x1="112" y1="42" x2="128" y2="58" stroke="#f87171" strokeWidth="2" />
                  <text x="120" y="35" fill="#f87171" fontSize="10" textAnchor="middle">
                    no &amp;
                  </text>

                  <defs>
                    <marker
                      id="arrowHead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="5"
                      orient="auto"
                    >
                      <path d="M0,0 L10,5 L0,10 Z" fill="#e0e7ff" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </section>

          {/* ----- SECTION 3: WHY THIS DESIGN? (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🧠 Why Did C Choose This?
            </h2>
            <div className="topic13-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <strong>Simplicity:</strong> The language specification and
                  compiler implementation are simpler. Every parameter is just a
                  local variable.
                </li>
                <li>
                  <strong>Efficiency:</strong> In early systems, references would
                  have required extra indirection; copying simple types (int, char)
                  was fast.
                </li>
                <li>
                  <strong>Historical context:</strong> C was designed to write
                  operating systems and compilers. Call‑by‑value was sufficient for
                  most tasks; when modification was needed, programmers used
                  pointers (which are <em>themselves</em> passed by value).
                </li>
                <li>
                  <strong>Transparency:</strong> You always know whether you're
                  working with a copy (plain parameter) or a pointer. No hidden
                  aliasing.
                </li>
              </ul>
              <p className="mt-4 text-sm italic text-gray-400">
                🔍 <strong>Observe carefully:</strong> C’s design is “trust the
                programmer” – if you want reference semantics, you explicitly use
                pointers (Topic 15).
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – trying to simulate reference (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 Attempting “Reference” Behaviour – and Failing
            </h2>
            <p className="text-gray-300">
              These examples show what you <em>cannot</em> do in C without pointers.
            </p>

            <EditableCCodeBlock
              title="Example 1: Trying to swap – still fails"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Trying to modify a variable"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: What reference would look like (if it existed)"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> Example 3 is <em>not valid C</em>.
              It’s shown only to illustrate what other languages offer. C has no
              such syntax.
            </div>
          </section>

          {/* ----- SECTION 5: REAL‑WORLD CONTEXT – students & places (delay-0.4s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.4s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              🏫 Student Confusion at Barrackpore & Naihati CNAT
            </h2>
            <div className="topic13-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Swadeep</strong> asked,
                “Why can’t I just put an <code>&amp;</code> like in C++?” The answer:
                C was designed before C++ and took a different path – it gives you
                pointers instead.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Tuhina</strong> tried to
                write a function that increments a variable and was frustrated when
                it didn’t work. She learned that without pointers, you must return
                the new value.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Students like <strong>Abhronila, Debangshu, Ritaja</strong> now
                appreciate that C’s honesty (everything is a copy) prevents hidden
                side effects.
              </p>
            </div>
          </section>

          {/* ----- SECTION 6: COMMON PITFALLS (delay-0.5s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.5s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-amber-400">
              ⚠️ Common Pitfalls – Beginners Edition
            </h2>
            <div className="topic13-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Assuming C has references:
                  </span>{" "}
                  Beginners coming from C++ or C# try to use <code>&amp;</code> in
                  parameter lists and get syntax errors.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Thinking “arrays are references”:
                  </span>{" "}
                  Arrays decay to pointers, but the pointer itself is passed by
                  value. The pointer value is copied, not the array. (We’ll cover
                  this properly later.)
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Misinterpreting compiler errors:
                  </span>{" "}
                  If you see <code>error: expected ‘;’, ‘,’ or ‘)’ before ‘&’ token</code>,
                  you’ve tried to use a reference in C.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Trying to “fix” swap by returning values:
                  </span>{" "}
                  You can’t return two values from a C function (except via structs
                  or pointers). Accept that plain C cannot swap two variables
                  without pointers.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> Why would a language designer
                choose not to include references? (Fewer language rules, simpler
                compiler.)
              </p>
            </div>
          </section>

          {/* ----- SECTION 7: BEST PRACTICES & PRO TIPS (delay-0.6s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.6s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-emerald-400">
              🧼 Best Practices – Professional Habits
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="topic13-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📛 Embrace the value semantics
                </h3>
                <p className="text-sm">
                  Don’t fight C. If you need to modify, either return the new value
                  or prepare to use pointers (next topics).
                </p>
              </div>
              <div className="topic13-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ✅ Use <code>const</code> for input‑only parameters
                </h3>
                <p className="text-sm">
                  This makes it clear you’re not trying to modify the original.
                </p>
              </div>
              <div className="topic13-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 Document “copy” behaviour
                </h3>
                <p className="text-sm">
                  In comments, remind that the function works on copies. This helps
                  others (and your future self).
                </p>
              </div>
              <div className="topic13-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔍 When you need reference, use pointers
                </h3>
                <p className="text-sm">
                  C’s way of achieving reference‑like behaviour is via pointers.
                  We’ll see them soon (Topic 15).
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 8: MINI CHECKLIST (delay-0.7s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.7s]",
              "rounded-xl border border-indigo-700 bg-indigo-900/20 p-6"
            )}
          >
            <h2 className="mb-4 text-2xl font-semibold text-indigo-300">
              📋 Mini Checklist – Topic 13
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand that C has
                no reference parameters.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I know why C was designed
                this way (simplicity, efficiency).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can distinguish C’s
                model from C++ references.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I won’t try to use
                <code>&amp;</code> in parameter lists in C.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I’m ready to learn how
                pointers can simulate reference behaviour.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic13-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
              "transition-all duration-300 hover:scale-[1.01] hover:border-indigo-400 hover:shadow-2xl"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🧑‍🏫</div>
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-semibold text-indigo-300">
                  Teacher’s Note
                </h2>
                <p className="mb-2 font-medium text-indigo-200">
                  Sukanta Hui — Mentor, C Programming
                </p>
                <p className="mb-2 text-sm">
                  📧 sukantahui@codernaccotax.co.in &nbsp;|&nbsp; 📱 7003756860
                  &nbsp;|&nbsp; 💻 {experienceYears} years (since 1998)
                </p>
                <p className="text-gray-300">
                  “At <strong>Barrackpore CNAT</strong>, I often hear: ‘But Java has
                  references!’ Yes, but C is older and closer to the machine. It
                  forces you to be explicit. When you finally learn pointers, you’ll
                  appreciate that you’re in full control. <br />
                  <span className="mt-2 block italic">
                    💡 My advice: Stop wishing for references – learn to love the
                    copy. Then master pointers, and you’ll have both simplicity and
                    power.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ----- SECTION 10: HINT – subtle guidance (delay-0.9s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.9s]",
              "rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-sm"
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💭</span>
              <div>
                <strong className="text-indigo-300">Hint – try changing this:</strong>{" "}
                In <code>swap_attempt.c</code>, try adding <code>&amp;</code> before
                the parameter names, like <code>void swap(int &amp;x, int &amp;y)</code>.
                What error do you get? Why does the compiler reject it?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Because <code>&amp;</code> in that position is not valid C syntax
                  – it belongs to C++.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 13 complete – you now know why C doesn’t have call‑by‑reference.
            Next: limitations of call by value (Topic 14) and then an introduction
            to pointers (Topic 15).
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic13;