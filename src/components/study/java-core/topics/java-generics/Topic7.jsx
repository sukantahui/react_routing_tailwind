import React, { useState, useEffect } from "react";
import clsx from "clsx";

/* SAFE JavaCodeBlock (inline, crash-proof) */
const JavaCodeBlock = ({ children }) => (
  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
    <code>{children}</code>
  </pre>
);

const Topic7 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-10 max-w-6xl">

        {/* HEADER */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Type Parameters in Java Generics
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Understanding naming conventions and best practices
          </p>
        </header>

        {/* INTRO */}
        <section
          className={clsx(
            "mb-12 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg",
            !isReducedMotion && "animate-fade-in-up"
          )}
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            What are Type Parameters?
          </h2>
          <p className="mb-3">
            Type parameters are placeholders for actual types used with generic
            classes, interfaces, and methods. They are written inside
            <code className="mx-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
              &lt;&gt;
            </code>
            and help Java enforce type safety at compile time.
          </p>
          <p>
            Think of them like labeled boxes — the label tells Java what type of
            data is allowed inside.
          </p>
        </section>

        {/* NAMING CONVENTIONS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Standard Naming Conventions
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["T", "Type", "Box<T>, List<T>"],
              ["E", "Element", "List<E>, Set<E>"],
              ["K", "Key", "Map<K, V>"],
              ["V", "Value", "Map<K, V>"],
              ["N", "Number", "Calculator<N>"],
            ].map(([letter, title, example]) => (
              <div
                key={letter}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border"
              >
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {letter}
                </div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Example: {example}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CODE EXAMPLE */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Generic Class Example
          </h2>

          <JavaCodeBlock>
{`public class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
}

// Usage
Pair<String, Integer> age = new Pair<>("Swadeep", 21);`}
          </JavaCodeBlock>
        </section>

        {/* SVG VISUAL (SAFE) */}
        <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            How Type Parameters Work
          </h2>

          <svg viewBox="0 0 800 200" className="w-full">
            <rect x="50" y="50" width="300" height="80" rx="10" fill="#DBEAFE" />
            <text x="200" y="95" textAnchor="middle" fontSize="16" fill="#1E40AF">
              Box&lt;T&gt;
            </text>

            <line x1="370" y1="90" x2="520" y2="90" stroke="#2563EB" strokeWidth="2" />

            <rect x="540" y="50" width="200" height="80" rx="10" fill="#FEF3C7" />
            <text x="640" y="95" textAnchor="middle" fontSize="16" fill="#92400E">
              Box&lt;String&gt;
            </text>
          </svg>

          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            Java replaces <strong>T</strong> with the real type at compile time.
          </p>
        </section>

        {/* TEACHER NOTE */}
        <section className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200">
          <h3 className="text-xl font-bold text-amber-700 mb-2">
            Teacher’s Note — Sukanta Hui
          </h3>
          <p>
            Type parameter conventions exist so every Java developer immediately
            understands your intent. Follow them like traffic rules — they keep
            code safe and readable.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Topic7;
