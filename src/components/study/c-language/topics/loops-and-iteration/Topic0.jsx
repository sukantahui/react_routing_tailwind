import React from "react";
import clsx from "clsx";

// Editable C code block component (assumed to be available in common)
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Raw C code examples – these files should exist in ./topic0_files/
import repetitionManual from "./topic0_files/repetition_manual.c?raw";
import repetitionLoop from "./topic0_files/repetition_loop.c?raw";

/**
 * Topic0: Introduction to repetition and why loops are needed
 *
 * @component
 * @returns {JSX.Element} - The full lesson page for Topic 0
 * @description
 *   This component introduces the fundamental concept of repetition in programming.
 *   It explains why loops are necessary through real-world analogies, code comparisons,
 *   and interactive examples. No loop syntax is taught – only the *need* for loops.
 *   The component follows a strict pedagogical progression and does not assume
 *   any prior knowledge beyond basic sequential execution.
 *
 * @pedagogical
 *   - Topic 0 – first step in the loop journey
 *   - Builds intuition: manual repetition → loop abstraction
 *   - Uses student names and local places to ground concepts
 *   - Fully self-contained, dark‑mode first, accessible animations
 */

const Topic0 = () => {
  // Sukanta Hui – teacher information with dynamic experience calculation
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998; // started in 1998

  return (
    // Dark mode as default – entire page uses dark variant when system prefers or forced
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Inline keyframes for fade + slide-up animation – zero config, only arbitrary values */}
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

      {/* Main container – vertical stacking, one after another */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* ---------- TITLE SECTION (fade + slide, delay 0) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            🔁 Introduction to Repetition
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Why do we need loops? Before we write a single <code>while</code> or{" "}
            <code>for</code>, we must understand the problem they solve. This
            topic builds the intuition – from tedious manual repetition to
            elegant, automatic iteration.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🧠 Foundation concept
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              📘 No prior loops assumed
            </span>
          </div>
        </section>

        {/* ---------- CONCEPTUAL EXPLANATION (delay 0.1s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.1s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🧩</span> What is repetition & why does it matter?
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Every program, from a school attendance system to a bank transaction
              processor, needs to repeat actions. Think about <strong>Swadeep</strong>{" "}
              writing a program to print all student names from Barrackpore: without
              repetition, he would copy the same <code>printf</code> statement
              hundreds of times. That’s not just tedious – it’s error‑prone and
              unmaintainable.
            </p>
            <p>
              <strong>Repetition</strong> (also called <em>iteration</em>) is the
              ability to execute a block of code multiple times. Loops are the
              programming tool that gives us this superpower.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border-l-4 border-blue-500">
              <p className="font-medium text-blue-800 dark:text-blue-300">
                📌 Core idea – Before loops:
              </p>
              <p className="mt-1">
                You write the same instruction over and over. After loops: you
                write it once and tell the computer how many times to repeat.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- REAL-WORLD CONTEXT (delay 0.2s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.2s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🌍</span> From classrooms to industry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example card 1 */}
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🧑‍🏫</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Tuhina's grade book
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Tuhina has 45 students from Shyamnagar. Without a loop, she'd
                write 45 identical <code>if</code> statements to check pass/fail.
                With a loop, she writes one check and repeats it 45 times.
              </p>
            </div>
            {/* Example card 2 */}
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏦</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Ichapur post office
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Every evening, the system calculates interest for 10,000 savings
                accounts. Loops make it possible to process thousands of records
                with just a few lines of code.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- C CODE COMPARISON (delay 0.3s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.3s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">⚖️</span> See the difference
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Let's compare two C programs that print "Hello, Abhronila!" five times.
            The first does it manually, the second uses a loop. Even without
            knowing the syntax, the reduction in code is obvious.
          </p>

          {/* Manual repetition example */}
          <div className="mb-8">
            <EditableCCodeBlock
              title="📜 Manual repetition (no loop)"
              initialCode={repetitionManual}
            />
          </div>

          {/* Loop example (conceptual – syntax not yet taught) */}
          <div>
            <EditableCCodeBlock
              title="🔄 With a loop (clean & scalable)"
              initialCode={repetitionLoop}
            />
          </div>

          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 italic">
            * The loop version is shorter, less error‑prone, and works for any
            number of repetitions – just change the count.
          </p>
        </section>

        {/* ---------- SVG ILLUSTRATION (delay 0.4s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.4s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🖼️</span> Step‑by‑step: manual → loop
          </h2>
          {/* SVG with semantic labels and native animate (no JS) */}
          <div className="flex flex-col items-center">
            <svg
              width="100%"
              height="180"
              viewBox="0 0 600 180"
              className="max-w-full"
              aria-label="Diagram comparing manual repetition and loop"
            >
              {/* Manual repetition side */}
              <g transform="translate(30, 30)">
                <rect
                  x="0"
                  y="0"
                  width="200"
                  height="120"
                  rx="12"
                  fill="#e5e7eb"
                  className="dark:fill-gray-700 transition-all duration-300 hover:fill-indigo-100 dark:hover:fill-indigo-900/40"
                />
                <text x="20" y="30" fontSize="16" fill="#1f2937" className="dark:fill-gray-200">
                  📝 Manual
                </text>
                {/* Animated printf copies */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <rect
                      x="20"
                      y={50 + i * 14}
                      width="140"
                      height="10"
                      rx="4"
                      fill="#9ca3af"
                      className="dark:fill-gray-500"
                    >
                      {/* Native SVG animate – fades copies one after another */}
                      <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur="3s"
                        begin={`${i * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    </rect>
                    <text
                      x="25"
                      y={58 + i * 14}
                      fontSize="8"
                      fill="#1f2937"
                      className="dark:fill-gray-800"
                    >
                      printf("Hello");
                    </text>
                  </g>
                ))}
                <text x="20" y="140" fontSize="12" fill="#4b5563" className="dark:fill-gray-400">
                  ⚠️ 5 identical lines
                </text>
              </g>

              {/* Arrow transition */}
              <g transform="translate(250, 70)">
                <path
                  d="M0,0 L50,0"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="dark:stroke-gray-500"
                />
                <polygon points="55,-4 55,4 60,0" fill="#6b7280" className="dark:fill-gray-500" />
                <text x="20" y="-15" fontSize="14" fill="#374151" className="dark:fill-gray-300">
                  abstraction
                </text>
              </g>

              {/* Loop side */}
              <g transform="translate(350, 30)">
                <rect
                  x="0"
                  y="0"
                  width="200"
                  height="120"
                  rx="12"
                  fill="#e0f2fe"
                  className="dark:fill-indigo-900/30 transition-all duration-300 hover:fill-sky-200 dark:hover:fill-indigo-800/50"
                />
                <text x="20" y="30" fontSize="16" fill="#075985" className="dark:fill-sky-300">
                  🔄 Loop
                </text>
                {/* Loop representation */}
                <rect
                  x="20"
                  y="50"
                  width="140"
                  height="30"
                  rx="6"
                  fill="#38bdf8"
                  className="dark:fill-indigo-600"
                />
                <text x="30" y="70" fontSize="12" fill="white">
                  {`for(i=0; i<5; i++)`}
                </text>
                <rect
                  x="40"
                  y="90"
                  width="100"
                  height="12"
                  rx="4"
                  fill="#7dd3fc"
                  className="dark:fill-indigo-400"
                >
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text x="45" y="100" fontSize="8" fill="#0c4a6e" className="dark:fill-gray-900">
                  printf("Hello");
                </text>
                <text x="20" y="140" fontSize="12" fill="#075985" className="dark:fill-sky-400">
                  ✅ One block, repeated
                </text>
              </g>
            </svg>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center max-w-xl">
              <strong>Observe carefully:</strong> the loop collapses many identical
              instructions into one reusable pattern. This is the heart of
              repetition control.
            </p>
          </div>
        </section>

        {/* ---------- TIPS, TRICKS & BEST PRACTICES (delay 0.5s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.5s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">💡</span> Pro insights & common pitfalls
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Tips & Tricks */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🧰</span> Tips & Tricks
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>
                  <strong>Think in patterns</strong> – Before writing a loop,
                  identify the repeated action. Ask: “What stays the same? What
                  changes each time?”
                </li>
                <li>
                  <strong>DRY (Don’t Repeat Yourself)</strong> – If you copy-paste
                  code more than twice, you probably need a loop.
                </li>
                <li>
                  <strong>Start with small counts</strong> – Test with 2 or 3
                  repetitions, then scale up.
                </li>
                <li>
                  <strong>Name the counter meaningfully</strong> – e.g.,{" "}
                  <code>studentIndex</code>, <code>dayNumber</code>. This makes the
                  loop’s purpose obvious.
                </li>
              </ul>
            </div>
            {/* Right: Common Mistakes */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span> Beginner mistakes
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>
                  <strong>Fear of loops</strong> – Some beginners avoid loops and
                  write long repetitive code. Remember: loops simplify, not
                  complicate.
                </li>
                <li>
                  <strong>Misunderstanding “repetition”</strong> – Thinking a loop
                  copies code, not re‑executes it. The loop block is one piece of
                  memory, reused.
                </li>
                <li>
                  <strong>Off‑by‑one mindset</strong> – Even before syntax, think
                  about where repetition starts and ends.
                </li>
                <li>
                  <strong>Hardcoding numbers</strong> – Instead of repeating a
                  value 100 times, a loop lets you change it once.
                </li>
              </ul>
            </div>
          </div>

          {/* Hint section */}
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl border-l-4 border-yellow-500">
            <p className="font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
              💭 Think about…
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              …how you would write a program that greets every student in
              Naihati (500 names). Would you write 500 <code>printf</code> calls?
              What if one name changes? <br />
              <strong>Try changing this:</strong> Imagine the same task with a
              loop – how many lines do you need to modify?
            </p>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST (delay 0.6s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.6s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">✅</span> Mini checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "I can explain why copying code is a problem.",
              "I understand that loops repeat a block without duplication.",
              "I can identify repetitive tasks in everyday life.",
              "I know that loops make programs shorter and easier to update.",
              "I am ready to learn the syntax of loops.",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-green-600 dark:text-green-400 text-xl">✔️</span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- TEACHER'S NOTE (delay 0.7s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.7s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🧑‍🏫</span> Teacher’s Note
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">🧔</span>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Sukanta Hui
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    📧 sukantahui@codernaccotax.co.in
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">📱 7003756860</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-bold">Experience:</span> {experienceYears} years
                (since 1998)
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-bold">Skills:</span> Programming Language, RDBMS,
                Operating System, Web Development
              </p>
              <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4">
                <p className="text-gray-800 dark:text-gray-200 italic">
                  “This topic is the seed of algorithmic thinking. I always tell
                  students like Debangshu: <strong>don’t memorise loop syntax yet</strong>.
                  First, feel the pain of manual repetition. Once you crave
                  automation, loops become a natural solution.”
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Point to remember
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>
                  <strong>Motivation first</strong> – Never introduce a loop
                  without first showing the repetitive alternative.
                </li>
                <li>
                  <strong>Use local examples</strong> – Barrackpore, Shyamnagar,
                  Ichapur, Naihati make the concept relatable.
                </li>
                <li>
                  <strong>Encourage “loop spotting”</strong> – Ask students to find
                  repetitions in their daily routine.
                </li>
                <li>
                  <strong>Resist teaching syntax</strong> – Stay focused on the
                  “why”, the “how” comes later.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic0;