// src/components/study/python/lists/Topic7.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20";

export default class Topic7 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Updating List Elements
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Lists are mutable — you can change individual elements or entire ranges
            without creating a new list.
          </p>
        </header>

        {/* ================= UPDATE BY INDEX ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            1️⃣ Updating Using Index
          </h3>

          <p className="text-slate-300 text-sm">
            Use indexing to update a single element.
          </p>

          <EditablePythonCodeBlock
            title="Update by Index"
            initialCode={`marks = [50, 60, 70]
marks[1] = 65
print(marks)`}
          />

          <p className="text-slate-400 text-xs">
            ✔ Direct and fast  
            ❌ Index must exist
          </p>
        </section>

        {/* ================= UPDATE WITH NEGATIVE INDEX ================= */}
        <section
          className={`border border-sky-700 rounded-xl p-4 bg-sky-900/20 ${hoverCard}`}
        >
          <EditablePythonCodeBlock
            title="Update Using Negative Index"
            initialCode={`nums = [10, 20, 30]
nums[-1] = 35
print(nums)`}
          />

          <p className="text-sky-200 text-sm">
            Negative index updates from the end.
          </p>
        </section>

        {/* ================= UPDATE USING SLICE ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-indigo-300">
            2️⃣ Updating Using Slicing
          </h3>

          <p className="text-slate-300 text-sm">
            Slice assignment can replace multiple elements at once.
          </p>

          <EditablePythonCodeBlock
            title="Slice Update Example"
            initialCode={`nums = [1, 2, 3, 4]
nums[1:3] = [20, 30]
print(nums)`}
          />

          <p className="text-slate-400 text-xs">
            ✔ Length of slice and replacement can differ
          </p>
        </section>

        {/* ================= SLICE LENGTH CHANGE ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <EditablePythonCodeBlock
            title="Slice Size Change"
            initialCode={`nums = [1, 2, 3, 4]
nums[1:3] = [9, 8, 7]
print(nums)`}
          />

          <p className="text-indigo-200 text-sm">
            List length can change during slice assignment.
          </p>
        </section>

        {/* ================= UPDATE USING LOOP ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ Updating Using Loop
          </h3>

          <p className="text-slate-300 text-sm">
            Use loops when update logic depends on conditions.
          </p>

          <EditablePythonCodeBlock
            title="Loop-based Update"
            initialCode={`nums = [1, 2, 3, 4]

for i in range(len(nums)):
    nums[i] *= 2

print(nums)`}
          />
        </section>

        {/* ================= CONDITIONAL UPDATE ================= */}
        <section
          className={`border border-amber-700 rounded-xl p-4 bg-amber-900/20 ${hoverCard}`}
        >
          <EditablePythonCodeBlock
            title="Conditional Update"
            initialCode={`nums = [1, 2, 3, 4]

for i in range(len(nums)):
    if nums[i] % 2 == 0:
        nums[i] += 10

print(nums)`}
          />
        </section>

        {/* ================= COMMON PITFALL ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Common Pitfall
          </h3>

          <EditablePythonCodeBlock
            title="Wrong Way"
            initialCode={`nums = [1, 2, 3]

for x in nums:
    x = x * 2

print(nums)`}
          />

          <p className="text-red-200 text-sm">
            Updating loop variable does NOT modify the list.
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
            ✔ Use indexing or slicing for direct updates  
            ✔ Use loops when logic is conditional  
            ✔ Prefer list comprehensions for transformations (next topic)
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic7 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Lists can be updated by index, slice, or loop</li>
            <li>Slice assignment can change list length</li>
            <li>Loop variable reassignment doesn’t mutate list</li>
          </ul>
        </footer>

      </div>
    );
  }
}
