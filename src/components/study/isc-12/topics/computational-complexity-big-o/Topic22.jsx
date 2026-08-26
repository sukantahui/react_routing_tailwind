import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import linearSearchJava from "./topic22_files/LinearSearch.java?raw";
import arrayTraversalJava from "./topic22_files/ArrayTraversal.java?raw";
import findMaxMinJava from "./topic22_files/FindMaxMin.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic22_files/topic22_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic22 = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // ─── Animation helpers ──────────────────────────────────────────────────────
  const sectionClass = "animate-[fadeSlideUp_0.6s_ease-out_forwards] opacity-100";
  const staggerClass = (index) =>
    `animate-[fadeSlideUp_0.5s_ease-out_${index * 0.08}s_forwards] opacity-100`;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans leading-relaxed antialiased transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">

        {/* ─── Header ────────────────────────────────────────────────────────── */}
        <header className={clsx(sectionClass, "space-y-4")}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold tracking-wider uppercase bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
              Topic 22
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Complexity Classes
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            O(n) – Linear Time
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            The <span className="text-indigo-600 dark:text-indigo-400 font-semibold">workhorse</span> of algorithms —
            operations that grow proportionally with the input size, one step per element.
          </p>
        </header>

        {/* ─── Tab Navigation ────────────────────────────────────────────────── */}
        <nav className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
          {["overview", "code", "faq"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 dark:shadow-indigo-500/20"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            &gt;
              {tab === "overview" && "📖 Overview"}
              {tab === "code" && "☕ Code Examples"}
              {tab === "faq" && "❓ FAQ"}
            </button>
          ))}
        </nav>

        {/* ─── Tab Content ────────────────────────────────────────────────────── */}
        <div className="space-y-12">

          {/* ═══ OVERVIEW TAB ═══ */}
          {activeTab === "overview" && (
            <div className="space-y-12">

              {/* ── Introduction ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> What is O(n) – Linear Time?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>O(n)</strong> — pronounced "order n" — means the algorithm's runtime grows
                    <strong>linearly</strong> with the input size. If you double the input, the runtime roughly
                    doubles. If you have 1000 elements, you do 1000 operations; if you have 10,000 elements,
                    you do 10,000 operations.
                  </p>
                  <p>
                    Linear time algorithms are those that <strong>process each element once</strong>. Common examples
                    include linear search, array traversal, summing all elements, finding the maximum, and many
                    one-pass algorithms.
                  </p>
                  <p>
                    Think of it like reading a book: if a book has 100 pages, it takes you twice as long to read
                    as a 50-page book. The time is directly proportional to the number of pages.
                  </p>
                </div>
              </section>

              {/* ── Common O(n) Operations ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common O(n) Operations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🔍",
                      title: "Linear Search",
                      desc: "Search an unsorted array by checking each element one by one.",
                      example: "for (int x : arr) if (x == target) return x;",
                    },
                    {
                      icon: "📊",
                      title: "Array Traversal",
                      desc: "Visiting each element in an array or list.",
                      example: "for (int i=0; i<n; i++) { ... }",
                    },
                    {
                      icon: "➕",
                      title: "Sum of Array",
                      desc: "Adding all elements in a collection.",
                      example: "int sum = 0; for (int x : arr) sum += x;",
                    },
                    {
                      icon: "🏆",
                      title: "Find Max/Min",
                      desc: "Finding the maximum or minimum element in an array.",
                      example: "int max = arr[0]; for (int x : arr) if (x > max) max = x;",
                    },
                    {
                      icon: "📝",
                      title: "Counting Occurrences",
                      desc: "Counting how many times a value appears in an array.",
                      example: "int count = 0; for (int x : arr) if (x == target) count++;",
                    },
                    {
                      icon: "🗑️",
                      title: "Simple Filtering",
                      desc: "Creating a new collection with elements that meet a condition.",
                      example: "for (int x : arr) if (x &gt; 0) list.add(x);",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-1">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: Linear Growth
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Linear growth"
                  >
                    <defs>
                      <marker id="arrow22" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    {/* Grid */}
                    <g stroke="#d1d5db" strokeWidth="0.5" opacity="0.3" className="dark:stroke-gray-700">
                      <line x1="60" y1="50" x2="760" y2="50" />
                      <line x1="60" y1="100" x2="760" y2="100" />
                      <line x1="60" y1="150" x2="760" y2="150" />
                      <line x1="60" y1="200" x2="760" y2="200" />
                      <line x1="60" y1="250" x2="760" y2="250" />
                      <line x1="60" y1="50" x2="60" y2="300" />
                      <line x1="207" y1="50" x2="207" y2="300" />
                      <line x1="354" y1="50" x2="354" y2="300" />
                      <line x1="501" y1="50" x2="501" y2="300" />
                      <line x1="648" y1="50" x2="648" y2="300" />
                    </g>

                    {/* Axes */}
                    <line x1="60" y1="280" x2="760" y2="280" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <line x1="60" y1="50" x2="60" y2="280" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <text x="400" y="310" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">n</text>
                    <text x="20" y="180" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,180)">Operations</text>

                    {/* Linear line O(n) */}
                    <line x1="60" y1="270" x2="760" y2="50" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
                    <text x="770" y="55" fontSize="12" fill="#f472b6" fontWeight="bold">O(n)</text>

                    {/* Animated dot */}
                    <circle cx="300" cy="180" r="8" fill="#f472b6">
                      <animate attributeName="cx" values="60;700;60" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="270;50;270" dur="4s" repeatCount="indefinite" />
                    </circle>

                    {/* Points on line */}
                    <text x="100" y="275" fontSize="10" fill="#6b7280">n=10</text>
                    <text x="250" y="208" fontSize="10" fill="#6b7280">n=50</text>
                    <text x="400" y="140" fontSize="10" fill="#6b7280">n=100</text>
                    <text x="600" y="80" fontSize="10" fill="#6b7280">n=200</text>

                    {/* Fill under line */}
                    <path d="M60 270 L760 50 L760 280 L60 280 Z" fill="url(#linearGrad)" opacity="0.15" />
                    <defs>
                      <linearGradient id="linearGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f472b6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    O(n) grows linearly. Doubling the input roughly doubles the time. This is the most common
                    complexity class for single-pass algorithms.
                  </p>
                </div>
              </section>

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Real-World Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Classroom Attendance:</span>{" "}
                      A teacher taking attendance by calling each student's name one by one — O(n) time.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Grocery Shopping:</span>{" "}
                      Walking through each aisle to pick items from your shopping list — the time depends on the
                      number of aisles (n).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Grading Papers:</span>{" "}
                      A teacher in <strong>Shyamnagar</strong> grading each student's exam paper one by one —
                      time is proportional to the number of students (n).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Email Inbox:</span>{" "}
                      Scanning through unread emails to find a specific sender — you might check each email.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Professional Tips ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Professional Tips
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      tip: "O(n) is usually acceptable",
                      desc: "For most applications, linear time is fast enough, even for large datasets.",
                    },
                    {
                      tip: "One loop = O(n), usually",
                      desc: "A single loop over the data is typically O(n) if the body is O(1).",
                    },
                    {
                      tip: "Watch for hidden loops inside the body",
                      desc: "If the loop body calls a method that is O(n), the total becomes O(n²).",
                    },
                    {
                      tip: "Use O(n) when you can't do better",
                      desc: "Some problems require at least O(n) because you must examine every element.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 4),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400">✦ {item.tip}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Common Mistakes ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Mistakes
                </h2>
                <ul className="space-y-3 list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Assuming all loops are O(n):</strong> A loop that halves the variable is O(log n),
                    not O(n). Look at how the loop variable changes.
                  </li>
                  <li>
                    <strong>Ignoring the work inside the loop:</strong> If the loop body is O(n) itself, the total
                    becomes O(n²) even with a single loop.
                  </li>
                  <li>
                    <strong>Counting every operation:</strong> O(n) means the number of operations is proportional
                    to n, not exactly n. Constants and lower-order terms are dropped.
                  </li>
                  <li>
                    <strong>Forgetting about early breaks:</strong> Linear search with an early break is O(n) in
                    the worst case, but Ω(1) in the best case. Worst-case is still O(n).
                  </li>
                  <li>
                    <strong>Not recognizing the lower bound:</strong> Many problems require at least O(n) because
                    you must examine every element (e.g., finding the maximum in an unsorted array).
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Abhronila</strong> once tried to find the maximum in an array in O(log n) time,
                      not realizing that you must check every element in an unsorted array.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ── Best Practices ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Best Practices
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use enhanced for loops</strong> for readability when traversing collections.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Avoid nested loops</strong> if you can solve the problem in a single pass.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use Java Streams</strong> for functional operations, but be aware they are still O(n).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Consider the worst-case</strong> when using early breaks — O(n) is still the upper bound.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Mini Checklist ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you identify O(n) algorithms (single pass, no nesting)?",
                    "✅ Do you know that array traversal, linear search, sum are O(n)?",
                    "✅ Can you distinguish O(n) from O(log n) and O(n²)?",
                    "✅ Do you understand that the worst-case of linear search is O(n)?",
                    "✅ Can you recognize hidden O(n) work inside a loop?",
                    "✅ Do you know that some problems have an O(n) lower bound?",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 8),
                        "p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-700 dark:text-gray-300",
                        "transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                      )}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Hint Section ── */}
              <section className={clsx(sectionClass, "space-y-3 p-5 rounded-xl bg-amber-50/70 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40")}>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  💡 Think About…
                </h3>
                <ul className="space-y-2 text-amber-700 dark:text-amber-200/80 text-sm list-disc pl-5">
                  <li>
                    <strong>Observe carefully:</strong> In a linear search, how many comparisons do you make in the
                    worst case? That's O(n). What's the best case? O(1).
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if you have two separate loops, each O(n)? The total
                    is O(2n) = O(n). If they are nested, it's O(n²).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has 5,000 students.
                    If a teacher checks each student's homework one by one, that's O(n) — about 5,000 operations.
                    If the teacher also compares every pair of students, that's O(n²) — 25 million operations.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Linear Search ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Linear Search — Classic O(n)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Searches an unsorted array by checking each element one by one. Worst-case O(n).
                </p>
                <JavaFileLoader
                  fileModule={linearSearchJava}
                  title="LinearSearch.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Array Traversal ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Array Traversal — O(n) Operations
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates common O(n) operations: sum, count, filter, and printing.
                </p>
                <JavaFileLoader
                  fileModule={arrayTraversalJava}
                  title="ArrayTraversal.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Find Max/Min ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Find Max/Min — O(n) Lower Bound
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Finding the maximum or minimum in an unsorted array requires checking every element — O(n).
                </p>
                <JavaFileLoader
                  fileModule={findMaxMinJava}
                  title="FindMaxMin.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="O(n) – Linear Time — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "O(n) is the most common complexity you'll encounter. I emphasize that it's the 'one pass' complexity — " +
              "you look at each element once. It's often the baseline: if you can't do better, O(n) is acceptable " +
              "for most applications. However, be careful: O(n) can become slow for very large datasets (billions of elements). " +
              "In those cases, you need O(log n) or O(1). Also, emphasize that O(n) is the lower bound for many problems — " +
              "you can't find the maximum in an unsorted array without checking every element. " +
              "Have students practice identifying O(n) code and distinguishing it from O(n²) and O(log n)."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 22 · O(n) – Linear Time · Built with ❤️ for the classroom</p>
        </footer>

      </div>

      {/* ─── Global Keyframes ────────────────────────────────────────────────── */}
      <style>{`
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_.*\\] {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic22;