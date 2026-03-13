import React from "react";
import clsx from "clsx";

// Calculate teacher's experience dynamically (from 1998)
const currentYear = new Date().getFullYear();
const experienceYears = currentYear - 1998;

const Topic1 = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Inline keyframes for animations (respects reduced motion) */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4 motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            What is a Programming Language?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A programming language is a formal language used to communicate instructions to a computer.
            It's like a bridge between human thought and machine execution.
          </p>
        </header>

        {/* Conceptual Explanation */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            📖 Conceptual Explanation
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A <strong>programming language</strong> is a set of rules, symbols, and special words used to construct
              instructions that a computer can understand and execute. Just as human languages (English, Bengali, Hindi)
              allow us to communicate ideas, programming languages let us express algorithms and data structures in a
              way that can be transformed into machine code.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Think of it like this: You want to tell a chef (the computer) to make a dish. You could speak in English,
              but the chef only understands French. A programming language is like a translator that converts your
              recipe (algorithm) into something the chef can follow. In reality, programming languages are much more
              precise and leave no room for ambiguity.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mt-6">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Analogy:</strong> Ritaja wants to tell her friend Abhronila how to solve a math problem.
                They agree to use a specific set of symbols (+, -, ×, ÷) and rules (order of operations). That agreed‑upon
                system is their "programming language." The computer is like Abhronila — it follows those rules exactly.
              </p>
            </div>
          </div>
        </section>

        {/* Classification of Programming Languages (NEW DETAILED SECTION) */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            📊 Classification of Programming Languages
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Programming languages can be classified in several ways. Understanding these categories helps you choose
            the right tool for a job and appreciate the design choices behind each language.
          </p>

          <div className="space-y-8">
            {/* 1. Level of Abstraction */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Level of Abstraction</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>Low‑level languages:</strong> Close to machine hardware. Examples: <strong>Machine language</strong> (binary),
                  <strong>Assembly language</strong> (mnemonics). They offer little abstraction and are platform‑specific.
                </li>
                <li>
                  <strong>High‑level languages:</strong> Use English‑like statements, abstract away hardware details.
                  Examples: Python, Java, C++, JavaScript. Easier for humans to read and write.
                </li>
                <li>
                  <strong>Very high‑level languages:</strong> Even more abstract, often domain‑specific or scripting.
                  Examples: SQL (database queries), MATLAB (numerical computing), R (statistics).
                </li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                At Barrackpore CNAT, Tuhina started with high‑level Python; Debangshu later explored Assembly to understand
                how computers really work.
              </p>
            </div>

            {/* 2. Programming Paradigm */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Programming Paradigm</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">A paradigm is a style or way of thinking about programming.</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>Imperative:</strong> Focus on <em>how</em> to do things, step‑by‑step. Includes procedural (C, Pascal)
                  and object‑oriented (Java, C++, Python).
                </li>
                <li>
                  <strong>Declarative:</strong> Focus on <em>what</em> to do, not how. Includes functional (Haskell, Lisp),
                  logic (Prolog), and query languages (SQL).
                </li>
                <li>
                  <strong>Object‑oriented:</strong> Organizes code into objects containing data and methods. Examples: Java, C#, Python.
                </li>
                <li>
                  <strong>Functional:</strong> Treats computation as evaluation of mathematical functions. Examples: Haskell, Scala, Clojure.
                </li>
              </ul>
            </div>

            {/* 3. Execution Model */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Execution Model</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>Compiled languages:</strong> Source code is translated into machine code before execution.
                  Examples: C, C++, Rust. Usually faster but platform‑dependent.
                </li>
                <li>
                  <strong>Interpreted languages:</strong> Source code is executed line‑by‑line by an interpreter.
                  Examples: Python, JavaScript, Ruby. More portable but can be slower.
                </li>
                <li>
                  <strong>Hybrid (JIT compilation):</strong> Combines both; e.g., Java (bytecode compiled then JIT‑interpreted),
                  C# (compiled to IL, then JIT).
                </li>
              </ul>
            </div>

            {/* 4. Generations (1GL to 5GL) */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Language Generations</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>1GL (First Generation):</strong> Machine language (binary).</li>
                <li><strong>2GL:</strong> Assembly language (mnemonics).</li>
                <li><strong>3GL:</strong> High‑level languages like C, Java, Python.</li>
                <li><strong>4GL:</strong> Domain‑specific, closer to human language – SQL, MATLAB.</li>
                <li><strong>5GL:</strong> Constraint‑based, logic/declarative – Prolog, Mercury.</li>
              </ul>
            </div>

            {/* 5. Typing Discipline */}
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Typing Discipline</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>Static typing:</strong> Types checked at compile time. Examples: Java, C, C++. Catches errors early.
                </li>
                <li>
                  <strong>Dynamic typing:</strong> Types checked at runtime. Examples: Python, JavaScript, Ruby. More flexible.
                </li>
                <li>
                  <strong>Strong typing:</strong> Strict rules about type conversions. Python, Java are strong; C allows more implicit conversions.
                </li>
                <li>
                  <strong>Weak typing:</strong> Permissive type conversions. Example: JavaScript ("1" + 2 = "12").
                </li>
              </ul>
            </div>

            {/* 6. Use Case */}
            <div className="border-l-4 border-teal-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Use Case (General vs Domain‑Specific)</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>General‑purpose languages:</strong> Designed for a wide range of applications. Python, Java, C++.
                </li>
                <li>
                  <strong>Domain‑specific languages (DSLs):</strong> Tailored for a specific domain. SQL (databases),
                  HTML/CSS (web markup), LaTeX (typesetting), Verilog (hardware description).
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-lg mt-8">
            <p className="text-indigo-800 dark:text-indigo-200 text-sm">
              🧠 <strong>Think about it:</strong> A language like Python can be classified as high‑level, interpreted,
              dynamically typed, multi‑paradigm (imperative, OOP, functional), and general‑purpose. Most languages fit
              into multiple categories.
            </p>
          </div>
        </section>

        {/* Purpose and Characteristics (slightly trimmed, but keep) */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            🎯 Purpose & Characteristics
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Why do we need them?</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Humans think in high‑level concepts; computers work in binary (0s and 1s).</li>
                <li>Programming languages provide abstraction — we don't need to manage individual bits.</li>
                <li>They enforce structure and correctness, reducing errors.</li>
                <li>They allow code to be portable across different machines.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Key characteristics</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Syntax:</strong> The grammar and spelling rules.</li>
                <li><strong>Semantics:</strong> The meaning behind the syntax.</li>
                <li><strong>Abstraction level:</strong> Low‑level vs. high‑level.</li>
                <li><strong>Paradigm:</strong> Imperative, functional, object‑oriented, etc.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real-World Examples (keep, maybe condense slightly) */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            🌍 Real-World Programming Languages
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Python</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">High‑level, interpreted, multi‑paradigm. Used for web, data science, AI.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">JavaScript</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">High‑level, interpreted, dynamic. Runs in browsers, servers (Node.js).</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">C / C++</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Low‑level, compiled, imperative. Used for operating systems, games, embedded.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Java</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Compiled to bytecode, OOP, statically typed. Enterprise, Android.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">SQL</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Declarative, domain‑specific for database queries.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">HTML/CSS</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Markup and style languages (not programming, but often grouped).</p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-6">
            At Barrackpore CNAT, Tuhina learned Python first; at Naihati CNAT, Debangshu started with JavaScript.
            Each language has its classification — choose based on what you want to build.
          </p>
        </section>

        {/* Natural Languages vs Programming Languages (SVG) */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            🗣️ Natural vs Programming Languages
          </h2>
          <div className="flex flex-col items-center">
            <svg
              viewBox="0 0 400 120"
              className="w-full max-w-2xl h-auto hover:scale-105 transition-transform duration-300"
              aria-label="Comparison: Natural language is ambiguous, programming language is precise"
            >
              <defs>
                <marker id="arrow-comp" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#64748B" />
                </marker>
              </defs>

              {/* Natural Language side */}
              <rect x="20" y="20" width="140" height="80" rx="8" fill="#94A3B8" className="dark:fill-gray-600" />
              <text x="50" y="55" fill="white" fontSize="14" fontWeight="bold">English / Bengali</text>
              <text x="40" y="75" fill="white" fontSize="10">"Put the book there"</text>
              <text x="70" y="90" fill="white" fontSize="8">(where is "there"?)</text>

              {/* Arrow */}
              <line x1="170" y1="60" x2="220" y2="60" stroke="#64748B" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrow-comp)" />

              {/* Programming Language side */}
              <rect x="230" y="20" width="140" height="80" rx="8" fill="#3B82F6" className="dark:fill-blue-600" />
              <text x="265" y="55" fill="white" fontSize="14" fontWeight="bold">Python / Java</text>
              <text x="260" y="75" fill="white" fontSize="10">book.position = (10,20)</text>
              <text x="280" y="90" fill="white" fontSize="8">(exact coordinates)</text>
            </svg>

            <p className="text-center text-gray-700 dark:text-gray-300 mt-6 max-w-2xl leading-relaxed">
              Natural languages are full of ambiguity and context. Programming languages force you to be precise —
              there is no "there", only exact coordinates or references.
            </p>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            💡 Tips & Tricks (Professional Habits)
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="text-green-500">✓</span>
              <span><strong>Start with one language:</strong> Master the concepts, not the syntax. Python is great for beginners.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">✓</span>
              <span><strong>Understand the paradigm:</strong> Knowing whether a language is OOP or functional helps you write idiomatic code.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">✓</span>
              <span><strong>Learn the vocabulary:</strong> Keywords like <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">if</code>, <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">while</code>, <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">class</code> are the building blocks.</span>
            </li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ❌ Common Beginner Mistakes
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="text-red-500">⚠️</span>
              <span><strong>Confusing syntax between languages:</strong> Writing Python like Java or vice versa. Stick to one at first.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500">⚠️</span>
              <span><strong>Thinking all languages are the same:</strong> Each has its own philosophy and best use cases.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500">⚠️</span>
              <span><strong>Ignoring case sensitivity:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">myVariable</code> is different from <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">MyVariable</code> in many languages.</span>
            </li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ✅ Best Practices
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="text-blue-500">📌</span>
              <span><strong>Follow language conventions:</strong> Use <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">snake_case</code> in Python, <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">camelCase</code> in JavaScript.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">📌</span>
              <span><strong>Use a linter:</strong> Tools like ESLint or Pylint catch style errors early.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500">📌</span>
              <span><strong>Write self-documenting code:</strong> Choose variable names that reveal intent.</span>
            </li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s] hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ✅ Mini Checklist
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-2">
              <input type="checkbox" className="mt-1" readOnly checked={false} disabled />
              <span>I know that a programming language is a set of rules for writing computer instructions.</span>
            </li>
            <li className="flex gap-2">
              <input type="checkbox" className="mt-1" readOnly checked={false} disabled />
              <span>I understand the difference between syntax (form) and semantics (meaning).</span>
            </li>
            <li className="flex gap-2">
              <input type="checkbox" className="mt-1" readOnly checked={false} disabled />
              <span>I can name at least three programming languages and their typical uses.</span>
            </li>
            <li className="flex gap-2">
              <input type="checkbox" className="mt-1" readOnly checked={false} disabled />
              <span>I am aware that languages can be classified by level, paradigm, execution model, etc.</span>
            </li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1s] hover:shadow-md transition-all duration-300">
          <h2 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
            🧠 Think About...
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
            If you were designing a language for a robot chef, what words would you include? "chop", "boil", "serve"?
            How would you handle quantities? That's like designing a mini programming language!
          </p>
        </section>

        {/* Teacher's Note */}
        <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-8 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.1s] hover:shadow-md transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg
                className="w-12 h-12 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                Teacher's Note
              </h2>
              <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed mb-4">
                <strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in, 7003756860) — {experienceYears} years teaching.
                "Don't get overwhelmed by the variety of languages. Focus on one, learn how to think algorithmically,
                and you'll pick up others quickly. I've seen Swadeep switch from Python to JavaScript in a week because
                he understood the logic, not just the syntax. Also, understanding classifications helps you appreciate
                why a language like C is good for systems programming and Python for rapid prototyping."
              </p>
              <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed">
                Skills: Programming Languages, RDBMS, Operating Systems, Web Development. "Remember: a language is just
                a tool. The real skill is problem‑solving."
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm pt-8 border-t border-gray-200 dark:border-gray-700 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.2s]">
          <p>Topic 1: Programming Languages — next we'll explore their history and evolution.</p>
        </footer>
      </div>
    </div>
  );
};

export default Topic1;