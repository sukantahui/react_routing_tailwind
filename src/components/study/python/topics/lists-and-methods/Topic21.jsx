// src/components/study/python/lists/Topic21.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-rose-500/20";

export default class Topic21 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-rose-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Common List Pitfalls & Errors
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Lists are simple — until they quietly break your logic.  
            This lesson teaches you <strong>how bugs happen and how to avoid them</strong>.
          </p>
        </header>

        {/* ================= PITFALL 1 ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            1️⃣ IndexError: Accessing Invalid Index
          </h3>

          <EditablePythonCodeBlock
            title="Index Out of Range"
            initialCode={`nums = [10, 20, 30]

print(nums[3])  # ❌ IndexError`}
          />

          <p className="text-slate-400 text-sm">
            List indexes start from <strong>0</strong> and end at <strong>len(list) - 1</strong>.
          </p>
        </section>

        {/* ================= PITFALL 2 ================= */}
        <section
          className={`border border-orange-700 rounded-xl p-4 bg-orange-900/20 ${hoverCard}`}
        >
          <h3 className="text-orange-300 font-semibold">
            2️⃣ Confusing Index with Value
          </h3>

          <EditablePythonCodeBlock
            title="Wrong Assumption"
            initialCode={`nums = [5, 10, 15]

for i in nums:
    print(nums[i])  # ❌ Error`}
          />

          <p className="text-orange-200 text-sm">
            <strong>i</strong> is the value, not the index.
          </p>
        </section>

        {/* ================= PITFALL 3 ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-red-300">
            3️⃣ Modifying List While Iterating
          </h3>

          <EditablePythonCodeBlock
            title="Dangerous Pattern"
            initialCode={`nums = [1, 2, 3, 4]

for n in nums:
    if n % 2 == 0:
        nums.remove(n)

print(nums)`}
          />

          <p className="text-red-200 text-sm">
            This causes skipped elements and unpredictable results.
          </p>
        </section>

        {/* ================= PITFALL 4 ================= */}
        <section
          className={`border border-purple-700 rounded-xl p-4 bg-purple-900/20 ${hoverCard}`}
        >
          <h3 className="text-purple-300 font-semibold">
            4️⃣ Shallow Copy Confusion
          </h3>

          <EditablePythonCodeBlock
            title="Reference Trap"
            initialCode={`a = [1, 2, 3]
b = a

b.append(4)
print(a)`}
          />

          <p className="text-purple-200 text-sm">
            Assignment copies the <strong>reference</strong>, not the data.
          </p>
        </section>

        {/* ================= PITFALL 5 ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            5️⃣ Misusing sort()
          </h3>

          <EditablePythonCodeBlock
            title="sort() Returns None"
            initialCode={`nums = [3, 1, 2]

result = nums.sort()
print(result)  # None
print(nums)`}
          />

          <p className="text-slate-400 text-sm">
            <strong>sort()</strong> mutates the list and returns None.
          </p>
        </section>

        {/* ================= PITFALL 6 ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            6️⃣ Mutable Default Arguments
          </h3>

          <EditablePythonCodeBlock
            title="Very Common Bug"
            initialCode={`def add_item(item, lst=[]):
    lst.append(item)
    return lst

print(add_item(1))
print(add_item(2))`}
          />

          <p className="text-indigo-200 text-sm">
            Default list is created <strong>once</strong>, not per call.
          </p>
        </section>

        {/* ================= PITFALL 7 ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-green-300">
            7️⃣ Using + Instead of append()
          </h3>

          <EditablePythonCodeBlock
            title="Unexpected New List"
            initialCode={`a = [1, 2]
b = a + [3]

print(a)
print(b)`}
          />

          <p className="text-slate-400 text-sm">
            <strong>+</strong> creates a new list — does not modify original.
          </p>
        </section>

        {/* ================= PITFALL 8 ================= */}
        <section
          className={`border border-yellow-700 rounded-xl p-4 bg-yellow-900/20 ${hoverCard}`}
        >
          <h3 className="text-yellow-300 font-semibold">
            8️⃣ Assuming Lists Are Fixed Size
          </h3>

          <EditablePythonCodeBlock
            title="Dynamic Nature"
            initialCode={`lst = []
lst[0] = 10  # ❌ Error`}
          />

          <p className="text-yellow-200 text-sm">
            Lists grow dynamically but cannot skip indexes.
          </p>
        </section>

        {/* ================= PITFALL 9 ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-pink-300">
            9️⃣ Confusing copy() with deepcopy()
          </h3>

          <EditablePythonCodeBlock
            title="Nested List Trap"
            initialCode={`a = [[1, 2], [3, 4]]
b = a.copy()

b[0].append(99)
print(a)`}
          />

          <p className="text-pink-200 text-sm">
            Shallow copy shares nested references.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-rose-700 rounded-xl p-4 bg-rose-900/20 ${hoverCard}`}
        >
          <h3 className="text-rose-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-rose-200 text-sm">
            ✔ Most list bugs are <strong>logic bugs</strong>  
            ✔ Read Python errors carefully — they guide you  
            ✔ Write small tests to catch silent failures
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic21 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Avoid modifying lists during iteration</li>
            <li>Understand references vs copies</li>
            <li>Know which methods mutate</li>
            <li>Watch out for mutable defaults</li>
          </ul>
        </footer>

      </div>
    );
  }
}
