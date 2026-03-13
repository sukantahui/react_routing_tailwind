/**
 * Topic1.jsx – What are Hooks in React?
 * ======================================
 * React 19 functional component.
 * Tailwind CSS – dark mode default, no config required.
 * Zero-config animations (arbitrary values + inline keyframes).
 * Section-based reveal, staggered delays, hover emphasis.
 * Fully commented, industry‑grade, classroom‑friendly.
 */

import React from "react";
import clsx from "clsx";

// ----------------------------------------------------------------------
// Teacher's Note (static identity – experience calculated live)
// ----------------------------------------------------------------------
const teacher = {
  name: "Sukanta Hui",
  email: "sukantahui@codernaccotax.co.in",
  mobile: "7003756860",
  skill: "Programming Language, RDBMs, Operating System, Web Development",
  startYear: 1998,
  get experience() {
    return new Date().getFullYear() - this.startYear;
  },
};

const Topic1 = () => {
  // --------------------------------------------------------------------
  // Inline keyframes – scoped to this component, no global leakage.
  // motion‑safe: only for users who do not prefer reduced motion.
  // --------------------------------------------------------------------
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

  // Base card style – subtle hover lift, smooth transition.
  const cardClasses = clsx(
    "bg-white dark:bg-gray-800",
    "rounded-xl shadow-md",
    "p-6",
    "transition-all duration-300",
    "hover:shadow-xl hover:-translate-y-1",
    "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
  );

  return (
    <>
      {/* Inject keyframes once – scoped style block */}
      <style>{keyframes}</style>

      <main
        className={clsx(
          "max-w-5xl mx-auto p-6 space-y-8",
          "text-gray-900 dark:text-gray-100",
          "leading-relaxed"
        )}
      >
        {/* ----- Header Section (no card, minimal) ----- */}
        <div
          className={clsx(
            "border-l-4 border-blue-500 pl-4",
            "motion-safe:animate-[fadeSlideUp_0.5s_ease-out]",
            "motion-safe:[animation-delay:0ms]"
          )}
        >
          <span className="text-sm font-mono text-blue-600 dark:text-blue-400">
            Topic 1 / 44
          </span>
          <h1 className="text-3xl font-bold mt-1 tracking-tight">
            What are Hooks in React?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Functions that let you “hook into” React state and lifecycle features
            from function components.
          </p>
        </div>

        {/* ----- 1. Conceptual SVG – step by step, hover animated ----- */}
        <div
          className={clsx(
            cardClasses,
            "flex flex-col items-center space-y-6",
            "motion-safe:[animation-delay:100ms]"
          )}
        >
          <h2 className="text-xl font-semibold self-start">
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm mr-3">
              SVG ILLUSTRATION
            </span>
            Component before & after hooks
          </h2>

          {/* SVG – fully semantic, no decorative fluff */}
          <svg
            width="100%"
            height="160"
            viewBox="0 0 600 160"
            preserveAspectRatio="xMidYMid meet"
            className="max-w-full h-auto"
            aria-label="Diagram: plain function component vs component with hooks"
          >
            {/* Background (soft, dark mode aware) */}
            <rect width="600" height="160" fill="transparent" />

            {/* ----- LEFT: Function component without hooks ----- */}
            <g
              className={clsx(
                "transition-all duration-300",
                "hover:opacity-90 cursor-default"
              )}
            >
              <rect
                x="20"
                y="40"
                width="180"
                height="80"
                rx="12"
                className={clsx(
                  "fill-gray-100 dark:fill-gray-700",
                  "stroke-gray-400 dark:stroke-gray-500",
                  "stroke-2",
                  "transition-all duration-300",
                  "hover:fill-gray-200 dark:hover:fill-gray-600",
                  "hover:stroke-blue-400"
                )}
              />
              <text
                x="110"
                y="80"
                textAnchor="middle"
                className="fill-gray-800 dark:fill-gray-200 text-[14px] font-medium"
              >
                Function Component
              </text>
              <text
                x="110"
                y="105"
                textAnchor="middle"
                className="fill-gray-600 dark:fill-gray-400 text-[11px]"
              >
                (no hooks – just UI)
              </text>
            </g>

            {/* Arrow (right) – subtle animation on hover of the whole SVG */}
            <g className="transition-transform duration-300 hover:scale-110 origin-center">
              <line
                x1="215"
                y1="80"
                x2="265"
                y2="80"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
              <polygon
                points="270,80 255,75 255,85"
                fill="#3B82F6"
                className="transition-all duration-300 hover:fill-blue-600"
              />
            </g>

            {/* ----- RIGHT: Component enriched with hooks ----- */}
            <g
              className={clsx(
                "transition-all duration-300",
                "hover:opacity-90 cursor-default"
              )}
            >
              {/* Main component box */}
              <rect
                x="290"
                y="40"
                width="180"
                height="80"
                rx="12"
                className={clsx(
                  "fill-blue-50 dark:fill-blue-900/30",
                  "stroke-blue-500 dark:stroke-blue-400",
                  "stroke-2",
                  "transition-all duration-300",
                  "hover:fill-blue-100 dark:hover:fill-blue-900/50",
                  "hover:stroke-blue-600"
                )}
              />
              <text
                x="380"
                y="80"
                textAnchor="middle"
                className="fill-gray-800 dark:fill-gray-100 text-[14px] font-medium"
              >
                Component with Hooks
              </text>

              {/* --- Hook icons (state, effect, context) – hover emphasis --- */}
              {/* useState indicator */}
              <g
                className={clsx(
                  "transition-all duration-300",
                  "hover:scale-125 hover:translate-y-[-2px]",
                  "origin-center"
                )}
              >
                <circle
                  cx="320"
                  cy="30"
                  r="12"
                  className="fill-green-100 dark:fill-green-900/60 stroke-green-600 dark:stroke-green-400 stroke-2"
                />
                <text
                  x="320"
                  y="35"
                  textAnchor="middle"
                  className="fill-green-800 dark:fill-green-200 text-[10px] font-bold"
                >
                  useState
                </text>
              </g>

              {/* useEffect indicator */}
              <g
                className={clsx(
                  "transition-all duration-300",
                  "hover:scale-125 hover:translate-y-[-2px]",
                  "origin-center"
                )}
              >
                <circle
                  cx="380"
                  cy="30"
                  r="12"
                  className="fill-purple-100 dark:fill-purple-900/60 stroke-purple-600 dark:stroke-purple-400 stroke-2"
                />
                <text
                  x="380"
                  y="35"
                  textAnchor="middle"
                  className="fill-purple-800 dark:fill-purple-200 text-[10px] font-bold"
                >
                  useEffect
                </text>
              </g>

              {/* useContext indicator */}
              <g
                className={clsx(
                  "transition-all duration-300",
                  "hover:scale-125 hover:translate-y-[-2px]",
                  "origin-center"
                )}
              >
                <circle
                  cx="440"
                  cy="30"
                  r="12"
                  className="fill-amber-100 dark:fill-amber-900/60 stroke-amber-600 dark:stroke-amber-400 stroke-2"
                />
                <text
                  x="440"
                  y="35"
                  textAnchor="middle"
                  className="fill-amber-800 dark:fill-amber-200 text-[10px] font-bold"
                >
                  useContext
                </text>
              </g>

              {/* Additional note: reusable logic */}
              <text
                x="380"
                y="135"
                textAnchor="middle"
                className="fill-gray-600 dark:fill-gray-400 text-[10px] italic"
              >
                ⚡ state · effects · context · refs · …
              </text>
            </g>
          </svg>

          <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg italic">
            <span className="font-semibold">Observe carefully:</span> Hooks add
            “superpowers” to function components – like{' '}
            <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">useState</code>,{' '}
            <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">useEffect</code>,{' '}
            <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">useContext</code>.
            The component stays a function, but now it can manage state, run side
            effects, and read context.
          </p>
        </div>

        {/* ----- 2. Core Explanation: What are Hooks? ----- */}
        <div
          className={clsx(
            cardClasses,
            "space-y-4",
            "motion-safe:[animation-delay:200ms]"
          )}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-3xl">🎣</span> Hooks – The Missing Link
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p>
                <strong className="text-blue-600 dark:text-blue-400">
                  Hooks are JavaScript functions
                </strong>{' '}
                introduced in <strong>React 16.8</strong>. They let you use state and
                other React features <em>without writing a class</em>.
              </p>
              <p>
                Every Hook name starts with <code>use</code> (e.g.,{' '}
                <code>useState</code>, <code>useEffect</code>). This naming convention
                is not optional – it’s how React knows to apply the Rules of Hooks.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-400">
                <span className="font-bold text-sm uppercase tracking-wide">
                  🧑‍🏫 Teacher’s insight
                </span>
                <p className="mt-1 text-sm">
                  “Think of a Hook as a <em>bridge</em> between your function and
                  React’s internal engine. Without it, the function is just a renderer.
                  With it, you can remember values, trigger updates, and tap into the
                  lifecycle.” – {teacher.name}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">✅ What Hooks are NOT:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>❌ Not class methods – they live inside functions.</li>
                <li>❌ Not regular helpers – they must be called at top level.</li>
                <li>❌ Not tied to ‘this’ – no binding confusion.</li>
              </ul>
              <h3 className="font-semibold text-lg mt-4">✅ What Hooks enable:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>State in function components</li>
                <li>Side effects (data fetching, subscriptions)</li>
                <li>Reusing stateful logic without HOCs or render props</li>
                <li>Cleaner, smaller components</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ----- 3. Prototype, Return Type, Purpose (as required) ----- */}
        <div
          className={clsx(
            cardClasses,
            "space-y-5",
            "motion-safe:[animation-delay:300ms]"
          )}
        >
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2">
            📐 Signature & Contract
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {/* Prototype / Signature */}
            <div className="bg-gray-50 dark:bg-gray-700/60 p-4 rounded-lg hover:shadow transition">
              <div className="text-blue-600 dark:text-blue-400 font-mono text-lg mb-1">
                useHookName(…)
              </div>
              <p className="font-semibold">Prototype / Signature</p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Every Hook is a function that may accept arguments (e.g., initial
                state) and returns a value (array, object, or primitive). The exact
                signature varies per Hook, but the prefix <code>use</code> is
                mandatory.
              </p>
            </div>
            {/* Return Type */}
            <div className="bg-gray-50 dark:bg-gray-700/60 p-4 rounded-lg hover:shadow transition">
              <div className="text-purple-600 dark:text-purple-400 font-mono text-lg mb-1">
                any | [] | {}
              </div>
              <p className="font-semibold">Return Type</p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Hook-specific. <code>useState</code> → array [state, setState];{' '}
                <code>useEffect</code> → undefined / void;{' '}
                <code>useRef</code> → mutable object. Hooks give you direct handles
                to React features.
              </p>
            </div>
            {/* Purpose / When & Why */}
            <div className="bg-gray-50 dark:bg-gray-700/60 p-4 rounded-lg hover:shadow transition">
              <div className="text-green-600 dark:text-green-400 font-mono text-lg mb-1">
                🎯 Purpose
              </div>
              <p className="font-semibold">When & Why</p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                <strong>When:</strong> You need state, side effects, context, or
                refs in a function component. <br />
                <strong>Why:</strong> Less code, no classes, no ‘this’, better
                reuse, and easier testing. Standard since 2019.
              </p>
            </div>
          </div>
        </div>

        {/* ----- 4. Real‑world example (with student names) ----- */}
        <div
          className={clsx(
            cardClasses,
            "space-y-3",
            "motion-safe:[animation-delay:400ms]"
          )}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🏫 Real‑world classroom story
          </h2>
          <div className="bg-blue-50/50 dark:bg-blue-900/20 p-5 rounded-xl italic text-gray-800 dark:text-gray-200">
            <p>
              In a coding lab at <strong>Barrackpore</strong>, students{' '}
              <span className="font-semibold not-italic">Swadeep</span> and{' '}
              <span className="font-semibold not-italic">Tuhina</span> were tasked
              to build a student attendance dashboard. They started with class
              components but quickly got tangled in <code>this</code> binding and
              lifecycle duplication.
            </p>
            <p className="mt-3">
              Then they refactored using Hooks. <strong>Abhronila</strong> used{' '}
              <code>useState</code> to manage form inputs,{' '}
              <strong>Debangshu</strong> added <code>useEffect</code> to sync with
              a local API, and the whole team shared a custom hook{' '}
              <code>useLocalStorage</code> – written in minutes. The code became
              half the size, and the teacher{' '}
              <span className="font-semibold not-italic">
                Sukanta Hui
              </span>{' '}
              praised the clarity.
            </p>
            <p className="mt-2 text-sm">
              <span className="font-bold">Hint:</span> Hooks make cross‑cutting
              concerns (like local storage) reusable without changing component
              hierarchy.
            </p>
          </div>
        </div>

        {/* ----- 5. Common Pitfalls & Best Practices ----- */}
        <div
          className={clsx(
            cardClasses,
            "grid md:grid-cols-2 gap-6",
            "motion-safe:[animation-delay:500ms]"
          )}
        >
          {/* Pitfalls */}
          <div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
              ⚠️ Common Pitfalls (beginner to avoid)
            </h3>
            <ul className="space-y-3 list-disc list-inside marker:text-red-500">
              <li>
                <strong>Calling Hooks conditionally</strong> – React relies on
                stable call order.
              </li>
              <li>
                <strong>Calling Hooks in loops</strong> – same reason, order must
                be identical every render.
              </li>
              <li>
                <strong>Hooks inside regular JS functions</strong> – only from
                React function components or custom Hooks.
              </li>
              <li>
                <strong>Forgetting the ‘use’ prefix</strong> – React won’t detect
                the Hook and rules won’t apply.
              </li>
              <li>
                <strong>Stale closures</strong> (especially in useEffect) – but
                that’s for a later topic (Topic 29+).
              </li>
            </ul>
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded text-sm">
              🧪 <span className="font-bold">Misconception:</span> “Hooks are for
              state only.” – False. They also handle effects, context, refs,
              memoization, and more.
            </div>
          </div>
          {/* Best Practices */}
          <div>
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
              ✅ Best Practices (industry‑grade)
            </h3>
            <ul className="space-y-3 list-disc list-inside marker:text-green-500">
              <li>
                <strong>Always call Hooks at the top level</strong> – never inside
                conditions, loops, or nested functions.
              </li>
              <li>
                <strong>Name custom Hooks starting with ‘use’</strong> – e.g.,{' '}
                <code>useWindowSize</code>.
              </li>
              <li>
                <strong>Keep Hooks small and focused</strong> – one Hook, one
                responsibility.
              </li>
              <li>
                <strong>Use the ESLint plugin</strong> (`eslint-plugin-react-hooks`)
                to enforce rules automatically.
              </li>
              <li>
                <strong>Extract complex logic into custom Hooks</strong> – this is
                the ultimate superpower.
              </li>
            </ul>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
              💡 <span className="font-bold">Pro tip:</span> Use{' '}
              <code>useReducer</code> instead of multiple{' '}
              <code>useState</code> when state transitions are complex – it’s a
              Hook too!
            </div>
          </div>
        </div>

        {/* ----- 6. Tips & Tricks (Professional Level) ----- */}
        <div
          className={clsx(
            cardClasses,
            "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-700 dark:to-gray-750",
            "border border-amber-200 dark:border-yellow-700/50",
            "motion-safe:[animation-delay:600ms]"
          )}
        >
          <h3 className="text-lg font-bold flex items-center gap-2">
            🧠 Professional Tips & Debugging Mindset
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="font-semibold">🔍 Debugging Hook‑related issues:</p>
              <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                <li>
                  Check if you broke the Rules of Hooks – React logs a clear error.
                </li>
                <li>
                  Use React DevTools – Hooks are displayed under the component,
                  with current values.
                </li>
                <li>
                  If a Hook seems “stale”, review your dependency array (future
                  topics).
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">📘 Naming & structure advice:</p>
              <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                <li>
                  Prefix custom Hooks with <code>use</code> – even if they don’t
                  use built‑in Hooks internally.
                </li>
                <li>
                  Group related Hooks together (e.g., all state hooks first,
                  effects after).
                </li>
                <li>
                  Use meaningful variable names: <code>[name, setName]</code>{' '}
                  instead of <code>[n, sn]</code>.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-sm bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600">
            <span className="font-mono text-blue-600">Try changing this:</span> In
            the SVG above, hover over the colored circles. They scale and lift –
            just like Hooks “lift” the capabilities of your components!
          </div>
        </div>

        {/* ----- 7. Teacher’s Note (MANDATORY) ----- */}
        <div
          className={clsx(
            cardClasses,
            "border-l-8 border-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/30",
            "motion-safe:[animation-delay:700ms]"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🧑‍🏫</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">
                Teacher’s Note
              </h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-200 mt-1">
                <span className="font-bold">{teacher.name}</span> · {teacher.email} ·{' '}
                {teacher.mobile} · {teacher.experience} years of experience
                (since {teacher.startYear})
              </p>
              <p className="mt-3 text-gray-800 dark:text-gray-200">
                <strong>Note on this topic:</strong> “When I first taught Hooks in{' '}
                <span className="italic">Shyamnagar</span>, students often asked,
                ‘Why not just keep classes?’ The lightbulb moment comes when they
                realise Hooks are <em>not just a feature – they change how we
                design components.</em> Instead of splitting code by lifecycle
                methods, we split by <strong>concern</strong>. Remind learners: a
                Hook is a contract with React, not magic. The `use` prefix is the
                handshake.”
              </p>
              <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                #ruleOfHooks #cleanCode #thinkingInHooks
              </p>
            </div>
          </div>
        </div>

        {/* ----- 8. Mini Checklist (what to remember) ----- */}
        <div
          className={clsx(
            "bg-gray-100 dark:bg-gray-800/80 p-6 rounded-xl border border-gray-300 dark:border-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:800ms]"
          )}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2">
            ✅ Mini Checklist – Hooks in a Nutshell
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 mt-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-600">✔️</span> Hooks are functions from
              React 16.8+
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✔️</span> Always start with{' '}
              <code>use</code>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✔️</span> Only called at top level
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✔️</span> Only from React function
              components / custom Hooks
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✔️</span> Enable state, effects,
              context, refs, etc.
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✔️</span> Replace class lifecycle
              with <code>useEffect</code> (Topic 29+)
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✔️</span> Custom Hooks reuse
              stateful logic
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✔️</span> ESLint plugin catches
              mistakes
            </div>
          </div>
        </div>

        {/* ----- subtle footer (no animation needed) ----- */}
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span>React 19 · Hooks API · Topic 1 – Next: Why Hooks exist (Topic2)</span>
          <br />
          <span className="font-mono">#CoderNacCotax #Barrackpore #Ichapur</span>
        </div>
      </main>
    </>
  );
};

export default Topic1;