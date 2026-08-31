import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import treeTraversalsJava from "./topic45_files/TreeTraversals.java?raw";
import treeAnalysisJava from "./topic45_files/TreeAnalysis.java?raw";
import iterativeTraversalJava from "./topic45_files/IterativeTraversal.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic45_files/topic45_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic45 = () => {
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
              Topic 45
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Recursive Algorithms
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complexity of Recursive Tree Traversals
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Analyzing the <span className="text-emerald-600 dark:text-emerald-400 font-semibold">O(n) time</span> and
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> O(h) space</span> of recursive tree
            traversals — understanding how the tree shape affects the recursion stack.
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
            >
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
                  <span className="text-emerald-500">●</span> What are Recursive Tree Traversals?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    <strong>Tree traversals</strong> are algorithms that visit every node in a tree data structure
                    exactly once. The three classic <strong>depth-first traversals</strong> are:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Preorder:</strong> Visit root, then left subtree, then right subtree.</li>
                    <li><strong>Inorder:</strong> Visit left subtree, then root, then right subtree.</li>
                    <li><strong>Postorder:</strong> Visit left subtree, then right subtree, then root.</li>
                  </ul>
                  <p>
                    For a binary tree with <strong>n</strong> nodes, the recurrence is:
                    <span className="block font-mono text-center text-lg my-2">
                      T(n) = T(left) + T(right) + O(1), &nbsp; T(0) = O(1)
                    </span>
                    This gives <strong>O(n)</strong> time for all traversals. The space complexity is <strong>O(h)</strong>,
                    where <strong>h</strong> is the height of the tree — O(log n) for balanced trees, O(n) for skewed trees.
                  </p>
                  <p>
                    Think of it like exploring a family tree: you start at the root, visit all descendants in a
                    systematic order. The depth of your recursion is the height of the tree — the path from root
                    to the deepest leaf.
                  </p>
                </div>
              </section>

              {/* ── Traversal Types ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Types of Tree Traversals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      type: "Preorder",
                      order: "Root → Left → Right",
                      use: "Copying a tree, prefix expression evaluation.",
                      icon: "🌳",
                    },
                    {
                      type: "Inorder",
                      order: "Left → Root → Right",
                      use: "BST traversal gives sorted order.",
                      icon: "🔢",
                    },
                    {
                      type: "Postorder",
                      order: "Left → Right → Root",
                      use: "Deleting a tree, postfix expression evaluation.",
                      icon: "🗑️",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10",
                        "hover:scale-[1.01] hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-emerald-600 dark:text-emerald-400">{item.type}</h3>
                      <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mt-1">{item.order}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.use}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Complexity Analysis ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Complexity Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      traversal: "Preorder",
                      time: "O(n)",
                      space: "O(h) — O(log n) balanced, O(n) skewed",
                      example: "n=1000, balanced: ~10 depth, skewed: ~1000 depth",
                    },
                    {
                      traversal: "Inorder",
                      time: "O(n)",
                      space: "O(h) — same as above",
                      example: "n=1000, balanced: ~10 depth, skewed: ~1000 depth",
                    },
                    {
                      traversal: "Postorder",
                      time: "O(n)",
                      space: "O(h) — same as above",
                      example: "n=1000, balanced: ~10 depth, skewed: ~1000 depth",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 3),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10",
                        "hover:scale-[1.01] hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.traversal}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Time: <span className="font-semibold">{item.time}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Space: <span className="font-semibold">{item.space}</span>
                      </p>
                      <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mt-2">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Visual Intuition: Recursion Depth
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-auto max-h-64"
                    role="img"
                    aria-label="Tree traversal recursion depth"
                  >
                    <defs>
                      <marker id="arrow45" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>

                    <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#374151" className="dark:fill-gray-300">
                      Recursion Depth = Height of Tree (h)
                    </text>

                    {/* Balanced Tree - left side */}
                    <text x="150" y="45" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">Balanced: h = O(log n)</text>
                    <circle cx="150" cy="65" r="12" fill="#818cf8" />
                    <line x1="150" y1="77" x2="130" y2="95" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="150" y1="77" x2="170" y2="95" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="130" cy="105" r="10" fill="#34d399" />
                    <circle cx="170" cy="105" r="10" fill="#34d399" />
                    <line x1="130" y1="115" x2="120" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="130" y1="115" x2="140" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="170" y1="115" x2="160" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="170" y1="115" x2="180" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="120" cy="140" r="8" fill="#f472b6" />
                    <circle cx="140" cy="140" r="8" fill="#f472b6" />
                    <circle cx="160" cy="140" r="8" fill="#f472b6" />
                    <circle cx="180" cy="140" r="8" fill="#f472b6" />
                    <text x="150" y="175" textAnchor="middle" fontSize="10" fill="#6b7280">Depth ~3</text>

                    {/* Skewed Tree - right side */}
                    <text x="650" y="45" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">Skewed: h = O(n)</text>
                    <circle cx="650" cy="65" r="12" fill="#f87171" />
                    <line x1="650" y1="77" x2="650" y2="95" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="650" cy="105" r="10" fill="#f87171" opacity="0.8" />
                    <line x1="650" y1="115" x2="650" y2="130" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="650" cy="140" r="8" fill="#f87171" opacity="0.7" />
                    <line x1="650" y1="148" x2="650" y2="160" stroke="#6b7280" strokeWidth="1.5" />
                    <circle cx="650" cy="170" r="7" fill="#f87171" opacity="0.6" />
                    <text x="650" y="200" textAnchor="middle" fontSize="10" fill="#6b7280">Depth ~5</text>

                    <text x="400" y="245" textAnchor="middle" fontSize="11" fill="#374151" className="dark:fill-gray-300">
                      Balanced tree → O(log n) stack space. Skewed tree → O(n) stack space.
                    </text>
                    <text x="400" y="270" textAnchor="middle" fontSize="11" fill="#6b7280">
                      Time = O(n) for both — each node visited once.
                    </text>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    The recursion depth depends on the tree's height. Balanced trees give O(log n) space; skewed trees give O(n) space.
                  </p>
                </div>
              </section>

              {/* ── Recurrence Relation ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Recurrence Relation
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="font-mono text-lg text-center">
                    T(n) = T(k) + T(n-1-k) + O(1), &nbsp; T(0) = O(1)
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Where <strong>k</strong> is the size of the left subtree, and <strong>n-1-k</strong> is the size
                    of the right subtree. Each node is visited once with O(1) work.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    For any split, T(n) = T(k) + T(n-1-k) + 1 solves to <strong>O(n)</strong>.
                  </p>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    The space complexity is determined by the recursion depth = <strong>height of the tree</strong>.
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    Time Complexity: <span className="font-mono">O(n)</span> (all traversals)
                  </p>
                  <p className="text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Space Complexity: <span className="font-mono">O(h)</span> where h is tree height
                  </p>
                </div>
              </section>

              {/* ── Real-World Examples ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Real-World Examples
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">File System:</span>{" "}
                      Traversing a directory structure to list all files or calculate total size uses tree traversal.
                      A balanced directory tree (like a well-organized file system) uses less stack space.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Expression Parsing:</span>{" "}
                      Evaluating arithmetic expressions using an expression tree uses postorder traversal.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Classroom Example:</span>{" "}
                      A school in <strong>Barrackpore</strong> has a school hierarchy: Principal (root) → Heads of Departments
                      → Teachers → Students. Recursive traversal visits every person in the hierarchy once.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Game AI:</span>{" "}
                      Exploring game trees (like chess) uses tree traversal. The recursion depth is the depth of
                      the game tree (number of moves ahead).
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Professional Tips ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Professional Tips
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      tip: "Use iterative traversal for very deep trees",
                      desc: "Recursive traversal can cause stack overflow for skewed trees. Use an explicit stack.",
                    },
                    {
                      tip: "Balanced trees = O(log n) space",
                      desc: "If your tree is balanced (like an AVL tree), the recursion stack is only O(log n).",
                    },
                    {
                      tip: "All traversals are O(n) time",
                      desc: "Every node is visited exactly once, so time complexity is always linear.",
                    },
                    {
                      tip: "Choose traversal based on your use case",
                      desc: "Preorder for copying, inorder for BST sorted order, postorder for deletion.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 6),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400">✦ {item.tip}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Common Mistakes ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Common Mistakes
                </h2>
                <ul className="space-y-3 list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Forgetting the base case:</strong> Without if (node == null) return, the recursion
                    never terminates.
                  </li>
                  <li>
                    <strong>Assuming space is always O(log n):</strong> For a skewed tree, space is O(n), not O(log n).
                    Always consider the tree height.
                  </li>
                  <li>
                    <strong>Confusing preorder, inorder, and postorder:</strong> Each has a specific order of visiting
                    nodes. Practice tracing each on the same tree.
                  </li>
                  <li>
                    <strong>Overlooking the difference between time and space:</strong> Time is always O(n), but
                    space depends on the tree shape.
                  </li>
                  <li>
                    <strong>Using recursion on very large skewed trees:</strong> This can cause stack overflow.
                    Use iterative traversal for safety.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Susmita</strong> once wrote an inorder traversal for a skewed tree of 1 million
                      nodes and got a StackOverflowError. She learned to use iterative traversal for large trees.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ── Best Practices ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Best Practices
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use iterative traversal</strong> for very deep trees (h &gt; 1000) to avoid stack overflow.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Know your tree shape</strong> — balanced vs skewed determines space complexity.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Write the recurrence</strong> — T(n) = T(k) + T(n-1-k) + O(1) → O(n) — to understand the complexity.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use the right traversal</strong> for the right task: inorder for BST sorted output,
                      preorder for copying, postorder for deletion.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Mini Checklist ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you write the recurrence for tree traversals?",
                    "✅ Do you know the time complexity (O(n)) and why?",
                    "✅ Do you know the space complexity (O(h)) and why?",
                    "✅ Can you implement inorder, preorder, and postorder?",
                    "✅ Do you understand the difference between balanced and skewed trees?",
                    "✅ Can you identify when to use recursive vs iterative traversal?",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 10),
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
                    <strong>Observe carefully:</strong> For a tree with n nodes, how many recursive calls are made?
                    Each node is visited once, so n calls (plus null checks). That's O(n) time.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> What if the tree is a balanced binary tree? The height is
                    log₂(n), so stack space is O(log n). What if it's a skewed tree (like a linked list)? The height
                    is n, so stack space is O(n).
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Barrackpore</strong> has a hierarchical
                    organization with a principal, department heads, teachers, and students. The recursion depth
                    for traversing this hierarchy is the depth of the tree (number of levels). A balanced hierarchy
                    uses less stack space than a deeply nested one.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Tree Traversals ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Tree Traversals — Inorder, Preorder, Postorder
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates recursive tree traversals with call count and depth tracking.
                </p>
                <JavaFileLoader
                  fileModule={treeTraversalsJava}
                  title="TreeTraversals.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Tree Analysis ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Tree Analysis — Balanced vs Skewed
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares the recursion depth for balanced and skewed trees.
                </p>
                <JavaFileLoader
                  fileModule={treeAnalysisJava}
                  title="TreeAnalysis.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Iterative Traversal ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Iterative Traversal — O(n) Time, O(h) Space (Explicit Stack)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Compares recursive and iterative (stack-based) inorder traversal.
                </p>
                <JavaFileLoader
                  fileModule={iterativeTraversalJava}
                  title="IterativeTraversal.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Complexity of Recursive Tree Traversals — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              `Tree traversals are the foundation of many algorithms. I emphasize that the time complexity is always 
              O(n) because each node is visited once. The space complexity, however, depends on the tree shape. 
              Students often forget that the recursion stack depth is the height of the tree, not the number of nodes. 
              A balanced tree gives O(log n) space, while a skewed tree gives O(n). This is a great opportunity 
              to discuss the importance of balanced trees and the risk of stack overflow in recursive traversals. 
              Practice all three traversals on the same tree to see the different orders. Also, show the iterative 
              versions to demonstrate how to avoid recursion stack limits.`
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 45 · Complexity of Recursive Tree Traversals · Built with ❤️ for the classroom</p>
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

export default Topic45;