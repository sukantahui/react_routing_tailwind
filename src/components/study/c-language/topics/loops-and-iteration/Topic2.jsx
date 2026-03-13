import React from "react";
import clsx from "clsx";

// Editable C code block component
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Raw C code examples – these files should exist in ./topic2_files/
import doWhileBasic from "./topic2_files/do_while_basic.c?raw";
import doWhileMenu from "./topic2_files/do_while_menu.c?raw";
import doWhileInput from "./topic2_files/do_while_input.c?raw";

/**
 * Topic2: do-while loop – exit-controlled loop and real-world usage scenarios
 *
 * @component
 * @returns {JSX.Element} - The full lesson page for Topic 2
 * @description
 *   Introduces the do-while loop as the first exit‑controlled repetition structure.
 *   Compares with while, emphasises the “execute at least once” property.
 *   Only uses concepts from Topic0 and Topic1; no mention of for loop.
 *
 * @pedagogical
 *   - Topic2 – second concrete loop syntax, builds on while
 *   - Focus: condition after body, guaranteed execution
 *   - Uses student names (Tuhina, Swadeep, Debangshu, Abhronila) and local places
 *   - Dark mode first, accessible animations, hover effects
 */

const Topic2 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseCondition {
          0%, 100% { fill-opacity: 0.3; }
          50% { fill-opacity: 0.8; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* ---------- TITLE SECTION (delay 0) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            🔁 The <code className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">do-while</code> Loop
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Exit‑controlled loop – executes the body <strong>at least once</strong>,
            then repeats as long as the condition is true.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🚪 Exit‑controlled
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              ✅ Body always runs first
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              📋 Perfect for menus
            </span>
          </div>
        </section>

        {/* ---------- SYNTAX & PROTOTYPE (delay 0.1s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.1s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">📐</span> Syntax & prototype
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-900 rounded-lg p-5 font-mono text-sm text-green-400 shadow-inner">
                <pre className="whitespace-pre-wrap">
{`do {
    // statement(s);
} while (condition);`}
                </pre>
              </div>
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 Prototype</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    <code>do statement while ( expression ) ;</code>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 Return type</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    No return value; it is a control flow statement.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 Purpose</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    Execute a block of code once, then repeat as long as the condition is true.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">🔹 When & why</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    Use when the loop body <strong>must execute at least once</strong> – 
                    menu systems, input validation with initial prompt, game rounds.
                  </dd>
                </div>
              </dl>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
              <p className="font-medium text-purple-800 dark:text-purple-300 mb-2">
                💡 Exit‑controlled means:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                The condition is evaluated <strong>after</strong> the body. This guarantees
                that the body runs at least once, even if the condition is false from the start.
              </p>
              <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded font-mono text-sm">
                <span className="text-gray-900 dark:text-gray-100">while(0) {`{}`};   </span>
                <span className="text-gray-500 dark:text-gray-400">// body never runs</span><br />
                <span className="text-gray-900 dark:text-gray-100">do {`{}`} while(0); </span>
                <span className="text-gray-500 dark:text-gray-400">// body runs once</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FLOWCHART SVG (delay 0.2s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.2s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🗺️</span> Flowchart of a <code>do-while</code> loop
          </h2>
          <div className="flex flex-col items-center">
            <svg
              width="100%"
              height="340"
              viewBox="0 0 600 340"
              className="max-w-full"
              aria-label="Flowchart of do-while loop: body first, then condition diamond, true branch loops back, false branch exits"
            >
              {/* Start oval */}
              <ellipse cx="300" cy="30" rx="60" ry="20" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="300" y="36" textAnchor="middle" fontSize="14" fill="#1f2937" className="dark:fill-gray-200">
                Start
              </text>

              {/* Arrow down to body */}
              <line x1="300" y1="50" x2="300" y2="80" stroke="#6b7280" strokeWidth="2" />
              <polygon points="300,80 295,70 305,70" fill="#6b7280" />

              {/* Body rectangle */}
              <rect
                x="250" y="80" width="100" height="60" rx="8"
                fill="#dbeafe" className="dark:fill-blue-900/30 transition-all duration-300 hover:fill-blue-200 dark:hover:fill-blue-800/50"
              />
              <text x="300" y="115" textAnchor="middle" fontSize="14" fill="#1e3a8a" className="dark:fill-blue-300">
                loop body
              </text>

              {/* Arrow down to condition */}
              <line x1="300" y1="140" x2="300" y2="180" stroke="#6b7280" strokeWidth="2" />
              <polygon points="300,180 295,170 305,170" fill="#6b7280" />

              {/* Condition diamond */}
              <polygon
                points="300,200 350,240 300,280 250,240"
                fill="#fef3c7"
                className="dark:fill-yellow-900/40 transition-all duration-300 hover:fill-yellow-200 dark:hover:fill-yellow-800/50"
                stroke="#d97706"
                strokeWidth="2"
              >
                <animate
                  attributeName="fill"
                  values="#fef3c7;#fde68a;#fef3c7"
                  dur="3s"
                  repeatCount="indefinite"
                  className="dark:fill-yellow-900/40"
                />
              </polygon>
              <text x="300" y="250" textAnchor="middle" fontSize="14" fill="#78350f" className="dark:fill-yellow-300">
                condition?
              </text>

              {/* True branch (right) */}
              <line x1="350" y1="240" x2="450" y2="240" stroke="#059669" strokeWidth="2" />
              <polygon points="450,240 440,235 440,245" fill="#059669" />
              <text x="400" y="220" fontSize="12" fill="#065f46" className="dark:fill-green-400">
                true
              </text>

              {/* Loop back from true to body */}
              <line x1="450" y1="240" x2="450" y2="50" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="450" y1="50" x2="300" y2="50" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="300,50 310,45 310,55" fill="#6b7280" />
              <text x="380" y="30" fontSize="11" fill="#4b5563" className="dark:fill-gray-400">
                repeat
              </text>

              {/* False branch (down) */}
              <line x1="250" y1="240" x2="200" y2="240" stroke="#b45309" strokeWidth="2" />
              <polygon points="200,240 210,235 210,245" fill="#b45309" />
              <text x="190" y="220" fontSize="12" fill="#b45309" className="dark:fill-orange-400">
                false
              </text>
              <line x1="200" y1="240" x2="200" y2="300" stroke="#b45309" strokeWidth="2" />
              <polygon points="200,300 195,290 205,290" fill="#b45309" />

              {/* End oval */}
              <ellipse cx="200" cy="330" rx="50" ry="20" fill="#e5e7eb" className="dark:fill-gray-700" />
              <text x="200" y="336" textAnchor="middle" fontSize="14" fill="#1f2937" className="dark:fill-gray-200">
                End
              </text>

              {/* Animated dot showing flow – body first */}
              <circle cx="300" cy="110" r="5" fill="#7c3aed">
                <animateMotion
                  path="M 0,0 L 0,60 L 50,0 L 100,0 L 0,-160"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center max-w-xl">
              <strong>Observe carefully:</strong> The body executes <em>before</em> the condition is tested.
              This guarantees at least one execution, even if the condition is initially false.
            </p>
          </div>
        </section>

        {/* ---------- CODE EXAMPLES (delay 0.3s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.3s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">📟</span> Live C examples
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            See how <code>do-while</code> shines when the body must run first.
          </p>

          <div className="space-y-10">
            <EditableCCodeBlock
              title="🔢 Example 1: Print numbers 1 to 5 (do-while version)"
              initialCode={doWhileBasic}
            />
            <EditableCCodeBlock
              title="📋 Example 2: Menu system (at least one display)"
              initialCode={doWhileMenu}
            />
            <EditableCCodeBlock
              title="🛡️ Example 3: Input validation – guaranteed first prompt"
              initialCode={doWhileInput}
            />
          </div>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <span className="font-bold">✏️ Note:</span>
              Unlike <code>while</code>, the <code>do-while</code> loop always executes the body
              before checking the condition. This is why it is ideal for menus and validation.
            </p>
          </div>
        </section>

        {/* ---------- REAL-WORLD SCENARIOS (delay 0.4s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.4s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🌍</span> Real‑world usage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏧</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ATM transaction loop
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                After inserting card, the machine shows the menu at least once.
                The loop repeats until the user selects “exit”. <br />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  — Tuhina uses this in her banking simulation project.
                </span>
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎮</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Game round controller
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                A trivia game in Barrackpore always plays one round, then asks
                “Play again?”. The <code>do-while</code> guarantees at least one round.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔑</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Password confirmation
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Registration form: “Enter password” and “Confirm password” – if they
                don't match, the user is prompted again. The first prompt is mandatory.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Polling station system
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                In Ichapur, the voting machine shows the candidate list once,
                then asks if the voter wants to change the vote. The loop runs
                at least once.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- TIPS, TRICKS & PITFALLS (delay 0.5s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.5s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">⚠️</span> Common mistakes & best practices
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Common Pitfalls */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🚨</span> Beginner mistakes
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Missing semicolon</strong> after <code>while(condition)</code>. This causes a compilation error.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Assuming zero‑iteration possible</strong> – forgetting that the body always runs once, even if the condition is initially false.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Infinite loop</strong> – forgetting to update the condition variable inside the body.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Using do-while when while is more appropriate</strong> – e.g., counter-controlled loop that may need zero iterations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Misplaced braces</strong> – without braces, only the first statement is considered part of the loop.</span>
                </li>
              </ul>
            </div>
            {/* Best Practices */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span> Best practices
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Always use braces</strong> – even for a single statement. Avoids confusion and future bugs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Update the condition variable</strong> inside the loop to prevent infinite loops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Use for menus and input validation</strong> – this is the classic use case.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Keep the loop body focused</strong> – do‑while is not ideal for complex computations with many exit points.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Comment the guaranteed‑once behaviour</strong> – helps other programmers understand your intent.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Hint Section */}
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl border-l-4 border-yellow-500">
            <p className="font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
              💭 Think about…
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              …what happens if the condition in a <code>do-while</code> is <code>0</code> (false).
              How many times does the body execute? <br />
              <strong>Try changing this:</strong> In the menu example, move the condition check
              to the top (simulate a <code>while</code> loop). What changes in the behaviour?
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
              "I can write the syntax of a do-while loop (with semicolon!).",
              "I understand that the body executes before the condition.",
              "I can trace the flow using the do-while flowchart.",
              "I know when to prefer do-while over while (menus, guaranteed once).",
              "I avoid infinite loops by updating the condition variable.",
              "I always use braces for the loop body.",
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
                  “Students often forget the semicolon at the end of <code>do-while</code>.
                  I tell them: <strong>‘do’ is the action, ‘while’ is the checkpoint, and
                  semicolon is the period at the end of the sentence.’</strong> 
                  Also, emphasise the ‘guaranteed once’ property – it’s the superpower of do-while.”
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Point to remember
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>Guaranteed one execution</strong> – highlight this with a counter‑example.</li>
                <li><strong>Menu systems are the perfect demo</strong> – use a canteen menu in Shyamnagar.</li>
                <li><strong>Don't overuse</strong> – for most counter loops, <code>while</code> or <code>for</code> is clearer.</li>
                <li><strong>Semicolon trap</strong> – compile without it; let students see the error.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic2;