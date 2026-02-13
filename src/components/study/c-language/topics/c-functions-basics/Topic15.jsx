/**
 * Topic 15: Using Pointers to Simulate Call by Reference (Intro)
 * File: Topic15.jsx
 *
 * Pedagogical Focus:
 * - Introduce pointers as a way to overcome call‑by‑value limitations.
 * - Show how to declare a pointer, pass it to a function, and dereference it.
 * - Emphasise that the pointer itself is passed by value, but it holds an address.
 * - Build directly on Topics 12‑14; no pointer arithmetic, just the basics.
 * - Zero‑config Tailwind animations, dark mode default.
 * - SVG with native <animate> illustrating address passing and dereferencing.
 * - Strict one‑topic, no forward jumping.
 */

import React from "react";
import clsx from "clsx";

// Editable C code blocks – raw imports from topic15_files/
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic15_files/swap_pointers.c?raw";
import example2 from "./topic15_files/increment_pointer.c?raw";
import example3 from "./topic15_files/pointer_basics.c?raw";

// ----------------------------------------------------------------------
// Inline keyframes – scoped, zero‑config, motion‑safe
// ----------------------------------------------------------------------
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-color-scheme: light) {
    .topic15-root {
      background-color: #ffffff;
      color: #111827;
    }
    .topic15-card {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }
  }
  @media (prefers-color-scheme: dark) {
    .topic15-root {
      background-color: #111827;
      color: #f3f4f6;
    }
    .topic15-card {
      background-color: #1f2937;
      border-color: #374151;
    }
  }
`;

// ----------------------------------------------------------------------
// Main Component – Topic 15
// ----------------------------------------------------------------------
const Topic15 = () => {
  // Teacher experience – dynamic from 1998
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={clsx(
          "topic15-root",
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
              📍 Using Pointers to Simulate Call by Reference (Intro)
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">
              We’ve seen the limitations of call by value. Now we meet the C
              solution: <strong>pointers</strong>. By passing the address of a
              variable, a function can directly access and modify the original. This
              is the closest C gets to “call by reference”.
            </p>
          </section>

          {/* ----- SECTION 2: CORE CONCEPT – HOW POINTERS HELP (delay-0.1s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.1s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 What Is a Pointer?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: explanation */}
              <div className="topic15-card rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="mb-3">
                  A <strong>pointer</strong> is a variable that stores the memory
                  address of another variable. Instead of passing the value, we pass
                  the address. The function then uses that address to reach the
                  original variable.
                </p>
                <p className="mb-3 font-mono text-sm">
                  <span className="text-purple-400">int</span> a = 5;<br />
                  <span className="text-purple-400">int</span> *p = &a;{" "}
                  <span className="text-gray-400">// p holds a's address</span>
                </p>
                <p>
                  When a function receives a pointer, it can <strong>dereference</strong> it
                  (using <code>*p</code>) to read or modify the original variable.
                </p>
                <div className="mt-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                  <span className="text-purple-400">void</span>{" "}
                  <span className="text-amber-300">increment</span>(
                  <span className="text-emerald-300">int *p</span>) {"{"}
                  <br />
                  &nbsp;&nbsp;(*p)++; &nbsp;
                  <span className="text-gray-400">// changes original a</span>
                  <br />
                  {"}"}
                </div>
                <p className="mt-3 text-sm italic text-gray-400">
                  🔍 <strong>Observe carefully:</strong> The pointer itself is
                  passed by value – a copy of the address. But that copy still points
                  to the same original variable.
                </p>
              </div>

              {/* Right: animated SVG – address passing */}
              <div
                className={clsx(
                  "topic15-card flex items-center justify-center rounded-xl border p-4",
                  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                )}
              >
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 300 200"
                  className="w-full max-w-xs"
                >
                  {/* Original variable */}
                  <rect
                    x="20"
                    y="60"
                    width="60"
                    height="40"
                    rx="6"
                    fill="#4f46e5"
                    fillOpacity="0.1"
                    stroke="#818cf8"
                    strokeWidth="2"
                  />
                  <text x="50" y="85" textAnchor="middle" fill="#c7d2fe" fontSize="12">
                    a = 5
                  </text>
                  <text x="50" y="105" fill="#9ca3af" fontSize="8" textAnchor="middle">
                    addr: 0x100
                  </text>

                  {/* Address arrow */}
                  <line
                    x1="85"
                    y1="80"
                    x2="130"
                    y2="80"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    markerEnd="url(#arrowHead)"
                  >
                    <animate
                      attributeName="x2"
                      values="120;135;120"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <text x="100" y="60" fill="#f59e0b" fontSize="10">
                    &amp;a
                  </text>

                  {/* Pointer variable inside function */}
                  <rect
                    x="150"
                    y="40"
                    width="120"
                    height="80"
                    rx="12"
                    fill="#1f2937"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <text x="210" y="70" fill="#9ca3af" fontSize="12">
                    function
                  </text>

                  {/* Pointer parameter */}
                  <rect
                    x="170"
                    y="90"
                    width="80"
                    height="30"
                    rx="6"
                    fill="#4f46e5"
                    fillOpacity="0.2"
                    stroke="#818cf8"
                    strokeWidth="1.5"
                  />
                  <text x="210" y="110" fill="#c7d2fe" fontSize="10" textAnchor="middle">
                    p = 0x100
                  </text>

                  {/* Dereference arrow back */}
                  <line
                    x1="210"
                    y1="120"
                    x2="70"
                    y2="100"
                    stroke="#6ee7b7"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    markerEnd="url(#arrowHead)"
                  >
                    <animate
                      attributeName="x2"
                      values="60;80;60"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <text x="140" y="140" fill="#6ee7b7" fontSize="10">
                    *p
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

          {/* ----- SECTION 3: PROTOTYPE, RETURN TYPE, PURPOSE (delay-0.2s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.2s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              📌 Function with Pointer Parameters
            </h2>
            <div className="topic15-card rounded-xl border p-6">
              <h3 className="mb-3 text-lg font-semibold text-indigo-300">
                🔹 Prototype / Signature
              </h3>
              <pre className="mb-4 rounded-lg bg-gray-800 p-3 font-mono text-sm">
                <span className="text-purple-400">void</span>{" "}
                <span className="text-amber-300">swap</span>(
                <span className="text-emerald-300">int *a, int *b</span>);
              </pre>
              <p className="mb-2">
                <strong>Return type:</strong> Usually <code>void</code> because the
                function works via side effects (modifying through pointers). It can
                also return a value if needed.
              </p>
              <p className="mb-2">
                <strong>Purpose:</strong> To modify variables in the caller’s scope,
                to avoid copying large data, or to return multiple values.
              </p>
              <p>
                <strong>When & why used:</strong> Whenever you need to change the
                original argument, when data is large, or when a function must
                produce more than one result.
              </p>
            </div>
          </section>

          {/* ----- SECTION 4: C CODE EXAMPLES – pointer basics (delay-0.3s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.3s]",
              "space-y-6"
            )}
          >
            <h2 className="text-2xl font-semibold text-indigo-300">
              💻 First Pointer Examples
            </h2>
            <p className="text-gray-300">
              These examples show the syntax and effect of using pointers in
              functions.
            </p>

            <EditableCCodeBlock
              title="Example 1: Swap using pointers (finally works!)"
              initialCode={example1}
            />
            <EditableCCodeBlock
              title="Example 2: Increment a variable via pointer"
              initialCode={example2}
            />
            <EditableCCodeBlock
              title="Example 3: Basic pointer declaration and use"
              initialCode={example3}
            />

            <div className="mt-2 rounded-lg bg-indigo-900/30 p-4 italic">
              <strong>🔍 Observe carefully:</strong> In Example 1, the swap works
              because the function receives addresses and modifies the original
              memory locations.
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
              🏫 Pointers in Action – Barrackpore & Naihati CNAT
            </h2>
            <div className="topic15-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4">
                At <strong>Barrackpore CNAT</strong>, <strong>Ritaja</strong> finally
                fixed her swap function using pointers. She now swaps student IDs
                effortlessly.
              </p>
              <p className="mb-4">
                At <strong>Naihati CNAT</strong>, <strong>Debangshu</strong> wrote a
                function that updates both marks and grade of a student by passing
                pointers to both variables. No more messy workarounds.
              </p>
              <p className="text-sm italic text-gray-400">
                🧑‍🎓 Every student from <strong>Swadeep</strong> to{" "}
                <strong>Abhronila</strong> now sees pointers as the key to
                two‑way communication with functions.
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
            <div className="topic15-card rounded-xl border border-amber-700/50 bg-amber-900/20 p-6">
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting the <code>&amp;</code> in the call:
                  </span>{" "}
                  <code>swap(a, b);</code> passes values, not addresses. The
                  function receives invalid pointers.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Forgetting the <code>*</code> in the function:
                  </span>{" "}
                  Using <code>p</code> instead of <code>*p</code> modifies the
                  pointer, not the pointed variable.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Dereferencing uninitialized pointers:
                  </span>{" "}
                  Using <code>*p</code> when <code>p</code> doesn’t hold a valid
                  address leads to crashes.
                </li>
                <li>
                  <span className="font-bold text-amber-300">
                    Confusing pointer syntax:
                  </span>{" "}
                  <code>int* p</code> vs <code>int *p</code> – same meaning. Pick
                  one and be consistent.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                🔎 <strong>Think about…</strong> Why does <code>swap(&a, &b);</code>{" "}
                work, but <code>swap(a, b);</code> does not?
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
              <div className="topic15-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📛 Use <code>ptr</code> suffix or prefix
                </h3>
                <p className="text-sm">
                  <code>int *pAge;</code> or <code>int *agePtr;</code> – makes it
                  clear it’s a pointer.
                </p>
              </div>
              <div className="topic15-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  ✅ Always check for NULL
                </h3>
                <p className="text-sm">
                  Before dereferencing, ensure the pointer is not NULL (we’ll cover
                  this later).
                </p>
              </div>
              <div className="topic15-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  🔍 Use <code>const</code> for input pointers
                </h3>
                <p className="text-sm">
                  <code>void print(const int *p);</code> promises not to modify the
                  pointed data.
                </p>
              </div>
              <div className="topic15-card rounded-xl border p-5">
                <h3 className="mb-2 font-bold text-emerald-300">
                  📏 One level of indirection per task
                </h3>
                <p className="text-sm">
                  Avoid pointers to pointers (int **) until absolutely necessary.
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
              📋 Mini Checklist – Topic 15
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can declare a pointer
                and assign an address.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can write a function
                that takes pointer parameters.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I use <code>&amp;</code>{" "}
                to pass addresses and <code>*</code> to dereference.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I can now swap two
                variables using a function.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">✅</span> I understand that the
                pointer itself is passed by value.
              </li>
            </ul>
          </section>

          {/* ----- SECTION 9: TEACHER'S NOTE (delay-0.8s) ----- */}
          <section
            className={clsx(
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-reduce:animate-none",
              "[animation-delay:0.8s]",
              "topic15-card rounded-xl border border-indigo-500/50 bg-indigo-950/30 p-6",
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
                  “At <strong>Barrackpore CNAT</strong>, I tell my students: a
                  pointer is like giving someone your home address instead of a
                  photo of your house. With the address, they can actually come and
                  change things. <br />
                  <span className="mt-2 block italic">
                    💡 Professional tip: Always initialise pointers. An
                    uninitialized pointer is a time bomb. And remember – the address
                    operator <code>&amp;</code> and dereference <code>*</code> are
                    opposites; they cancel each other.
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
                In the swap example, remove the <code>*</code> inside the function,
                so you have <code>a = b;</code> etc. What happens? Why does the swap
                fail again?
                <br />
                <span className="mt-2 block text-gray-400">
                  (Because now you’re modifying the pointer addresses, not the
                  values they point to.)
                </span>
              </div>
            </div>
          </section>

          {/* ----- Footer / bridge to next topic ----- */}
          <div className="pt-6 text-center text-xs text-gray-500">
            Topic 15 complete – you’ve taken your first step into pointers. Next:
            local variables – scope and lifetime.
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic15;