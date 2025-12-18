// src/components/study/python/lists/Topic5.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-rose-500/20";

export default class Topic5 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-rose-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Removing Elements: remove(), pop(), clear(), del
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Python provides multiple ways to remove data from lists.  
            Each method behaves <strong>differently</strong> and is used in <strong>different situations</strong>.
          </p>
        </header>

        {/* ================= REMOVE ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ remove(value) — Remove by Value
          </h3>

          <p className="text-slate-300 text-sm">
            <code>remove()</code> deletes the <strong>first occurrence</strong> of a value.
          </p>

          <EditablePythonCodeBlock
            title="remove() Example"
            initialCode={`nums = [10, 20, 30, 20]
nums.remove(20)
print(nums)`}
          />

          <p className="text-slate-400 text-xs">
            ✔ Only the first matching value is removed  
            ❌ Raises <code>ValueError</code> if value is not found
          </p>
        </section>

        {/* ================= POP ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ pop() — Remove by Index (and Return It)
          </h3>

          <p className="text-slate-300 text-sm">
            <code>pop()</code> removes an element by index and <strong>returns it</strong>.
          </p>

          <EditablePythonCodeBlock
            title="pop() Example"
            initialCode={`nums = [5, 10, 15]
x = nums.pop(1)
print(x)
print(nums)`}
          />

          <p className="text-slate-400 text-xs">
            ✔ Default index is last element  
            ✔ Very useful in stack-like behavior
          </p>
        </section>

        {/* ================= POP DEFAULT ================= */}
        <section
          className={`border border-sky-700 rounded-xl p-4 bg-sky-900/20 ${hoverCard}`}
        >
          <EditablePythonCodeBlock
            title="pop() Without Index"
            initialCode={`nums = [1, 2, 3]
nums.pop()
print(nums)`}
          />

          <p className="text-sky-200 text-sm">
            Removes the <strong>last element</strong>.
          </p>
        </section>

        {/* ================= CLEAR ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ clear() — Remove Everything
          </h3>

          <p className="text-slate-300 text-sm">
            <code>clear()</code> deletes <strong>all elements</strong> from the list.
          </p>

          <EditablePythonCodeBlock
            title="clear() Example"
            initialCode={`nums = [1, 2, 3]
nums.clear()
print(nums)`}
          />

          <p className="text-slate-400 text-xs">
            ✔ List still exists, but is empty
          </p>
        </section>

        {/* ================= DEL ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-indigo-300">
            4️⃣ del — Delete by Index or Slice
          </h3>

          <p className="text-slate-300 text-sm">
            <code>del</code> is a Python keyword, not a method.
          </p>

          <EditablePythonCodeBlock
            title="del Example"
            initialCode={`nums = [10, 20, 30, 40]
del nums[1]
print(nums)`}
          />

          <EditablePythonCodeBlock
            title="del With Slice"
            initialCode={`nums = [1, 2, 3, 4, 5]
del nums[1:4]
print(nums)`}
          />
        </section>

        {/* ================= COMPARISON TABLE ================= */}
        <section
          className={`border border-violet-700 rounded-xl p-4 bg-violet-900/20 ${hoverCard}`}
        >
          <h3 className="text-violet-300 font-semibold mb-2">
            🔍 Comparison Summary
          </h3>

          <ul className="text-violet-200 text-sm space-y-1">
            <li><code>remove(value)</code> → removes first matching value</li>
            <li><code>pop(index)</code> → removes & returns element</li>
            <li><code>clear()</code> → empties list</li>
            <li><code>del</code> → deletes by index or slice</li>
          </ul>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Common Mistakes
          </h3>

          <EditablePythonCodeBlock
            title="Mistake Example"
            initialCode={`nums = [1, 2, 3]
x = nums.remove(2)
print(x)`}
          />

          <p className="text-red-200 text-sm">
            <code>remove()</code> and <code>clear()</code> return <strong>None</strong>.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-emerald-200 text-sm">
            ✔ Use <code>pop()</code> when you need the removed value  
            ✔ Use <code>remove()</code> when value matters, not position  
            ✔ Use <code>del</code> for slicing deletions  
            ✔ Avoid modifying lists inside loops
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic5 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Different removal methods serve different purposes</li>
            <li>Only <code>pop()</code> returns the removed element</li>
            <li>All methods mutate the original list</li>
          </ul>
        </footer>

      </div>
    );
  }
}
