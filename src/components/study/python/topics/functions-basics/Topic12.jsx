import React from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";

// Python example files (place in topic12_files/)
import mapBasic from "./topic12_files/map_basic.py?raw";
import filterBasic from "./topic12_files/filter_basic.py?raw";
import mapFilterLambda from "./topic12_files/map_filter_lambda.py?raw";
import functionalRealWorld from "./topic12_files/functional_realworld.py?raw";

/**
 * Topic 12: Use cases of lambda with functions like map(), filter()
 * 
 * This component explains:
 * - How lambda functions work with map() – transform each element
 * - How lambda functions work with filter() – select elements based on condition
 * - Combining map and filter
 * - Performance considerations vs list comprehensions
 * - When to use functional style vs comprehensions
 */
export default function Topic12() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🔄 Lambda with `map()`, `filter()` – Functional Programming
        </h1>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-lg leading-relaxed">
            The <code className="bg-gray-700 px-1 rounded">map()</code> and <code className="bg-gray-700 px-1 rounded">filter()</code> functions
            are <strong className="text-blue-300">higher‑order functions</strong> that apply a function to each element of an iterable.
            Combined with <strong className="text-yellow-300">lambda</strong>, they enable concise, functional‑style data processing.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm">
              <span className="text-green-300"># Transform: square all numbers</span><br />
              numbers = [1,2,3,4]<br />
              squares = list(map(lambda x: x**2, numbers))  # [1,4,9,16]<br /><br />
              <span className="text-green-300"># Filter: keep only evens</span><br />
              evens = list(filter(lambda x: x%2==0, numbers))  # [2,4]
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          📝 `map()` – Apply Function to Every Element
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`map(function, iterable) -> iterator

# Returns an iterator that yields function(element) for each element.
# Use list() to materialize results.`}
          </pre>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>Return type:</strong> Iterator (lazy).</li>
            <li><strong>Purpose:</strong> Transform every item in a collection.</li>
            <li><strong>Lambda use:</strong> `map(lambda x: x*2, data)`.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6 reveal-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-purple-500 pl-4">
          🧹 `filter()` – Select Elements Based on Condition
        </h2>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <pre className="text-sm font-mono text-emerald-300 overflow-x-auto">
{`filter(function, iterable) -> iterator

# Returns iterator with elements where function(element) is truthy.`}
          </pre>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li><strong>Return type:</strong> Iterator (lazy).</li>
            <li><strong>Purpose:</strong> Keep only items satisfying a predicate.</li>
            <li><strong>Lambda use:</strong> `filter(lambda x: x>0, data)`.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-8 reveal-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
          💻 Live Python Examples
        </h2>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">1️⃣ Basic `map()` with lambda (map_basic.py)</h3>
          <PythonFileLoader fileModule={mapBasic} title="map_basic.py" highlightLines={[]} />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">2️⃣ Basic `filter()` with lambda (filter_basic.py)</h3>
          <PythonFileLoader fileModule={filterBasic} title="filter_basic.py" highlightLines={[]} />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">3️⃣ Combining `map()` and `filter()` (map_filter_lambda.py)</h3>
          <PythonFileLoader fileModule={mapFilterLambda} title="map_filter_lambda.py" highlightLines={[]} />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-yellow-300">4️⃣ Real‑World Data Processing (functional_realworld.py)</h3>
          <PythonFileLoader fileModule={functionalRealWorld} title="functional_realworld.py" highlightLines={[]} />
        </div>
      </section>

      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">💡 Tips & Tricks</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 bg-gray-800/50 p-5 rounded-xl">
          <li><strong>Lazy evaluation:</strong> `map` and `filter` return iterators – use `list()` only when needed.</li>
          <li><strong>Multiple iterables:</strong> `map(lambda a,b: a+b, list1, list2)` works.</li>
          <li><strong>Prefer list comprehensions</strong> for readability in simple cases: `[x*2 for x in data]` is often better.</li>
          <li><strong>Use `filter` with `None`</strong> to remove falsy values: `filter(None, data)`.</li>
        </ul>
      </section>

      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.5s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">⚠️ Common Pitfalls</h2>
        <div className="space-y-3">
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Forgetting to convert iterator to list</p>
            <p className="text-gray-300">`result = map(lambda x: x*2, [1,2])` – `result` is an iterator, not a list.</p>
          </div>
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-300">❌ Using lambda that mutates data (side effects)</p>
            <p className="text-gray-300">Prefer pure functions in `map`/`filter`.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4 reveal-fade-up" style={{ animationDelay: "0.6s" }}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">✅ Best Practices</h2>
        <div className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-5">
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Use list comprehensions for simple transformations – they are more Pythonic.</li>
            <li>Use `map`/`filter` when you already have a named function or need lazy evaluation.</li>
            <li>Keep lambdas simple; otherwise, define a named function.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3 reveal-fade-up" style={{ animationDelay: "0.7s" }}>
        <h2 className="text-2xl font-semibold text-amber-300">🧠 Think About...</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-5 italic text-gray-200">
          <p>🔍 <strong>Observe carefully:</strong> What is the difference between `map(lambda x: x*2, data)` and `[x*2 for x in data]`?</p>
          <p className="mt-2">🔍 <strong>Try changing this:</strong> Use `filter` to keep only words longer than 3 characters from a list.</p>
        </div>
      </section>

      <section className="reveal-fade-up" style={{ animationDelay: "0.85s" }}>
        <FAQTemplate title="Lambda with map/filter FAQs" questions={questions} />
      </section>

      <section className="reveal-fade-up" style={{ animationDelay: "0.9s" }}>
        <Teacher note={
          "Functional programming with `map` and `filter` can be elegant but students often overcomplicate. 🧑‍🏫 " +
          "I show them that `[x**2 for x in numbers]` is more readable than `list(map(lambda x: x**2, numbers))`. " +
          "But for lazy pipelines (large data), `map` is useful. Also, `filter` is great with `None` to remove falsy values. " +
          "Exercise: read a file, split lines, strip whitespace, and filter out empty lines using `map` and `filter`."
        } />
      </section>

      <section className="reveal-fade-up" style={{ animationDelay: "1s" }}>
        <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
          <svg width="560" height="200" viewBox="0 0 560 200" className="max-w-full h-auto">
            <rect x="20" y="20" width="180" height="80" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" rx="8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="110" y="50" fill="white" fontSize="12" textAnchor="middle">map(lambda x: x*2, [1,2,3])</text>
            <text x="110" y="70" fill="#94a3b8" fontSize="12" textAnchor="middle">→ [2,4,6]</text>
            <line x1="200" y1="60" x2="240" y2="60" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowPurple)" />
            <rect x="250" y="20" width="180" height="80" fill="#065a46" stroke="#34d399" strokeWidth="2" rx="8">
              <text x="340" y="50" fill="white" fontSize="12" textAnchor="middle">filter(lambda x: x%2==0, [1,2,3,4])</text>
              <text x="340" y="70" fill="#94a3b8" fontSize="12" textAnchor="middle">→ [2,4]</text>
            </rect>
            <text x="280" y="160" fill="#fcd34d" fontSize="12" textAnchor="middle">💡 `map` transforms, `filter` selects – both work great with lambda</text>
            <defs><marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa" /></marker></defs>
          </svg>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .reveal-fade-up { animation: fadeUp 0.6s ease-out forwards; opacity: 0; animation-fill-mode: forwards; }
        @media (prefers-reduced-motion: reduce) { .reveal-fade-up { animation: none; opacity: 1; } }
      `}</style>
    </div>
  );
}