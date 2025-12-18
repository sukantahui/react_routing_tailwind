// src/components/study/python/lists/Topic20.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20";

export default class Topic20 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-cyan-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Performance Considerations of Lists
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Writing correct code is not enough.  
            Writing <strong>efficient</strong> code separates beginners from professionals.
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-2">
            🧠 Core Idea
          </p>
          <p className="text-slate-400 text-sm">
            Lists are powerful and flexible — but not always the fastest choice.
            Understanding their internal behavior helps you avoid performance traps.
          </p>
        </section>

        {/* ================= ACCESS SPEED ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Index Access is Fast (O(1))
          </h3>

          <EditablePythonCodeBlock
            title="Index Access"
            initialCode={`nums = [10, 20, 30, 40]

print(nums[0])
print(nums[3])`}
          />

          <p className="text-slate-400 text-sm">
            Accessing elements by index is extremely fast.
          </p>
        </section>

        {/* ================= SEARCH COST ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            2️⃣ Searching is Slow (O(n))
          </h3>

          <EditablePythonCodeBlock
            title="Linear Search"
            initialCode={`nums = list(range(100000))

print(99999 in nums)`}
          />

          <p className="text-slate-400 text-sm">
            Membership checks scan elements one by one.
          </p>
        </section>

        {/* ================= COMPARISON WITH SET ================= */}
        <section
          className={`border border-purple-700 rounded-xl p-4 bg-purple-900/20 ${hoverCard}`}
        >
          <h3 className="text-purple-300 font-semibold">
            ⚡ List vs Set (Lookup Speed)
          </h3>

          <EditablePythonCodeBlock
            title="Performance Comparison"
            initialCode={`nums = list(range(100000))
nums_set = set(nums)

print(99999 in nums)      # slow
print(99999 in nums_set) # fast`}
          />

          <p className="text-purple-200 text-sm">
            Sets are optimized for fast lookups.
          </p>
        </section>

        {/* ================= INSERTION COST ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            3️⃣ Insertion Cost Depends on Position
          </h3>

          <EditablePythonCodeBlock
            title="Insertion Examples"
            initialCode={`lst = [1, 2, 3]

lst.append(4)      # fast
lst.insert(0, 99)  # slow

print(lst)`}
          />

          <p className="text-slate-400 text-sm">
            Inserting at the beginning requires shifting elements.
          </p>
        </section>

        {/* ================= REMOVAL COST ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-orange-300">
            4️⃣ Removing Elements
          </h3>

          <EditablePythonCodeBlock
            title="Removal Cost"
            initialCode={`lst = [1, 2, 3, 4]

lst.pop()       # fast (end)
lst.pop(0)     # slow (front)

print(lst)`}
          />

          <p className="text-slate-400 text-sm">
            Removing from the end is faster than from the front.
          </p>
        </section>

        {/* ================= MEMORY ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            🧠 Memory Behavior
          </h3>

          <p className="text-indigo-200 text-sm">
            Lists store references and allocate extra space to grow efficiently.
            This improves speed but uses more memory.
          </p>
        </section>

        {/* ================= LOOPS ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-green-300">
            5️⃣ Looping Performance
          </h3>

          <EditablePythonCodeBlock
            title="Efficient Looping"
            initialCode={`nums = [1, 2, 3, 4]

for n in nums:
    print(n)`}
          />

          <p className="text-slate-400 text-sm">
            Direct iteration is faster than index-based loops.
          </p>
        </section>

        {/* ================= LIST COMPREHENSION ================= */}
        <section
          className={`border border-teal-700 rounded-xl p-4 bg-teal-900/20 ${hoverCard}`}
        >
          <h3 className="text-teal-300 font-semibold">
            🚀 List Comprehensions are Faster
          </h3>

          <EditablePythonCodeBlock
            title="Comprehension vs Loop"
            initialCode={`# Faster
squares = [x*x for x in range(5)]

# Slower
sq = []
for x in range(5):
    sq.append(x*x)

print(squares)
print(sq)`}
          />

          <p className="text-teal-200 text-sm">
            Comprehensions reduce overhead and improve readability.
          </p>
        </section>

        {/* ================= WHEN NOT TO USE LIST ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ When NOT to Use Lists
          </h3>

          <ul className="list-disc list-inside text-red-200 text-sm space-y-1">
            <li>Frequent membership checks → use set</li>
            <li>Key-based access → use dictionary</li>
            <li>Fixed immutable data → use tuple</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-cyan-700 rounded-xl p-4 bg-cyan-900/20 ${hoverCard}`}
        >
          <h3 className="text-cyan-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-cyan-200 text-sm">
            ✔ Big-O thinking starts here  
            ✔ Performance bugs appear at scale, not in small tests  
            ✔ Right structure = clean + fast code
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic20 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Index access is fast</li>
            <li>Searching is slow</li>
            <li>Appending is cheap, inserting is costly</li>
            <li>Use sets/dicts when performance matters</li>
          </ul>
        </footer>

      </div>
    );
  }
}
