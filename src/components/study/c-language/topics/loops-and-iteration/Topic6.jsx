import React from "react";
import clsx from "clsx";

// Editable C code block component
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Raw C code examples – these files should exist in ./topic6_files/
import primeCheck from "./topic6_files/prime_check.c?raw";
import fibonacci from "./topic6_files/fibonacci.c?raw";
import primeRange from "./topic6_files/prime_range.c?raw";

/**
 * Topic6: Prime number checking and number series generation
 *
 * @component
 * @returns {JSX.Element} - The full lesson page for Topic 6
 * @description
 *   Applies loops to two important mathematical domains:
 *   - Prime number detection (efficiency, divisibility, early exit)
 *   - Number series (Fibonacci as the classic example)
 *   Builds on Topics 0–5; uses break/continue and nested loops.
 *
 * @pedagogical
 *   - Topic6 – mathematical problem solving with loops
 *   - Focus: algorithm efficiency, edge cases, series generation
 *   - Uses student names (Swadeep, Tuhina, Debangshu, Abhronila) and local places
 *   - Dark mode first, accessible animations, hover effects
 */

const Topic6 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes primePulse {
          0%, 100% { fill: #f59e0b; opacity: 0.3; }
          50% { fill: #fbbf24; opacity: 0.8; }
        }
        @keyframes fibSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* ---------- TITLE SECTION (delay 0) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            🔢 Prime Numbers & Number Series
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Prime checking · Fibonacci · Efficient loop design
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🔬 Divisibility
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              🧬 Series generation
            </span>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              ⚡ Optimisation
            </span>
          </div>
        </section>

        {/* ---------- CONCEPTUAL OVERVIEW (delay 0.1s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.1s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🧩</span> Why primes and series?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-2">🔐</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Prime numbers</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Foundation of cryptography (RSA), hash tables, and random number generation.
                Teaches <strong>divisibility</strong>, <strong>early exit</strong> with <code>break</code>,
                and efficiency considerations.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-3xl block mb-2">🐚</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Number series</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Fibonacci, Tribonacci, arithmetic progressions. Perfect for practising
                <strong>state variables</strong> and <strong>generation patterns</strong>.
              </p>
            </div>
          </div>
          <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            These problems move beyond simple accumulation. They require <strong>decision‑making
            inside loops</strong> and often use <code>break</code> for early termination.
            Mastering them prepares you for algorithm design.
          </p>
        </section>

        {/* ---------- PRIME NUMBER CHECK (delay 0.2s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.2s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">🔬</span> Prime Number Check
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl mb-4">
                <p className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                  📐 Prototype
                </p>
                <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                  <pre>int isPrime(int n);</pre>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <strong>Return type:</strong> <code>int</code> (1 = prime, 0 = not prime)<br />
                  <strong>Purpose:</strong> Determine if n is a prime number (≥2, divisible only by 1 and itself)<br />
                  <strong>When:</strong> Cryptography, mathematics, competitive programming
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Algorithm:</strong> For n ≥ 2, check divisibility from 2 to √n.
                If any divisor found → not prime.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-sm space-y-2">
                <span className="font-semibold">💡 Efficiency tips:</span>
                <ul className="list-disc pl-5 mt-1">
                  <li>Check only up to <code>sqrt(n)</code> (not n-1).</li>
                  <li>Handle n &lt; 2 as not prime immediately.</li>
                  <li>Skip even numbers after checking 2.</li>
                  <li>Use <code>break</code> as soon as a divisor is found.</li>
                </ul>
              </div>
            </div>
            <div>
              <EditableCCodeBlock
                title="📟 prime_check.c – efficient prime test"
                initialCode={primeCheck}
              />
            </div>
          </div>
        </section>

        {/* ---------- SVG: PRIME VISUALIZATION (delay 0.25s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.25s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🔎</span> Why check only up to √n?
          </h2>
          <div className="flex flex-col items-center">
            <svg
              width="100%"
              height="200"
              viewBox="0 0 600 200"
              className="max-w-full"
              aria-label="Visual proof: factors come in pairs"
            >
              {/* Number line representation */}
              <line x1="50" y1="100" x2="550" y2="100" stroke="#6b7280" strokeWidth="2" />
              <polygon points="550,100 540,95 540,105" fill="#6b7280" />
              
              {/* n marker */}
              <line x1="500" y1="80" x2="500" y2="120" stroke="#3b82f6" strokeWidth="3" />
              <text x="500" y="70" textAnchor="middle" fontSize="14" fill="#3b82f6" className="dark:fill-blue-400">
                n
              </text>
              
              {/* sqrt(n) marker */}
              <line x1="300" y1="80" x2="300" y2="120" stroke="#f59e0b" strokeWidth="3" />
              <text x="300" y="70" textAnchor="middle" fontSize="14" fill="#f59e0b" className="dark:fill-amber-400">
                √n
              </text>
              
              {/* Pair example */}
              <rect x="100" y="130" width="60" height="30" rx="4" fill="#d1d5db" className="dark:fill-gray-600" />
              <text x="130" y="150" textAnchor="middle" fontSize="12" fill="#1f2937" className="dark:fill-gray-200">
                a
              </text>
              <text x="180" y="150" fontSize="16" fill="#6b7280" className="dark:fill-gray-400">
                ×
              </text>
              <rect x="200" y="130" width="60" height="30" rx="4" fill="#d1d5db" className="dark:fill-gray-600" />
              <text x="230" y="150" textAnchor="middle" fontSize="12" fill="#1f2937" className="dark:fill-gray-200">
                b
              </text>
              <text x="280" y="150" fontSize="16" fill="#6b7280" className="dark:fill-gray-400">
                = n
              </text>
              
              <text x="400" y="150" fontSize="12" fill="#4b5563" className="dark:fill-gray-400">
                If a ≤ √n, then b ≥ √n.
              </text>
              
              {/* Animated circle showing search range */}
              <circle cx="130" cy="100" r="8" fill="#3b82f6" opacity="0.7">
                <animateMotion
                  path="M 0,0 L 170,0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <text x="50" y="40" fontSize="12" fill="#4b5563" className="dark:fill-gray-400">
                ✅ Only need to check up to √n
              </text>
            </svg>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center max-w-xl">
              If n has a divisor greater than √n, it must be paired with a divisor smaller than √n.
              Therefore, checking up to √n is sufficient.
            </p>
          </div>
        </section>

        {/* ---------- FIBONACCI SERIES (delay 0.3s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.3s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">🐚</span> Fibonacci Series
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl mb-4">
                <p className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                  📐 Prototype
                </p>
                <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                  <pre>void fibonacci(int n);</pre>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <strong>Return type:</strong> <code>void</code> (prints series)<br />
                  <strong>Purpose:</strong> Print first n Fibonacci numbers: 0, 1, 1, 2, 3, 5, …<br />
                  <strong>When:</strong> Nature (phyllotaxis), algorithms (Fibonacci search), teaching recursion.
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Algorithm:</strong> Maintain two previous values; each next = sum of two previous.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-sm">
                <span className="font-semibold">💡 Tip:</span> Start with <code>a = 0, b = 1</code>.
                For n ≥ 1, print a; then update: <code>next = a + b; a = b; b = next;</code>.
              </div>
            </div>
            <div>
              <EditableCCodeBlock
                title="📟 fibonacci.c – generate Fibonacci numbers"
                initialCode={fibonacci}
              />
            </div>
          </div>
        </section>

        {/* ---------- PRIME RANGE (delay 0.4s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.4s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">🔢</span> Prime Numbers in a Range
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl mb-4">
                <p className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                  📐 Prototype
                </p>
                <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                  <pre>void printPrimes(int start, int end);</pre>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <strong>Return type:</strong> <code>void</code> (prints primes)<br />
                  <strong>Purpose:</strong> Find and display all prime numbers in a given interval<br />
                  <strong>When:</strong> Sieve of Eratosthenes (advanced), but here we use nested loops.
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Algorithm:</strong> For each number in the range, check if it's prime.
                Uses the prime check inside another loop.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-sm">
                <span className="font-semibold">💡 Tip:</span> Optimise by skipping even numbers
                (except 2) and stopping early when a divisor is found.
              </div>
            </div>
            <div>
              <EditableCCodeBlock
                title="📟 prime_range.c – find primes between two numbers"
                initialCode={primeRange}
              />
            </div>
          </div>
        </section>

        {/* ---------- REAL-WORLD SCENARIOS (delay 0.5s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.5s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🌍</span> Where are these used?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-2xl">🔐</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-2">RSA Encryption</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Naihati Bank:</strong> Swadeep's project – uses large primes to generate public/private keys.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-2xl">🌻</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-2">Sunflower spirals</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Ichapur garden:</strong> Abhronila counts seed spirals – they often follow Fibonacci numbers.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl hover:shadow-lg transition-shadow">
              <span className="text-2xl">📊</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-2">Hash tables</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>Barrackpore library:</strong> Tuhina's book index – prime-sized tables reduce collisions.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- TIPS, TRICKS & PITFALLS (delay 0.6s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.6s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">⚠️</span> Common mistakes & best practices
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* Common Pitfalls */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🚨</span> Beginner mistakes
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Prime check:</strong> Not handling n &lt; 2.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Prime check:</strong> Checking up to n (inefficient) instead of √n.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Prime check:</strong> Using floating-point sqrt – can have precision issues; use <code>i*i &lt;= n</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Fibonacci:</strong> Off‑by‑one – printing n+1 numbers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Fibonacci:</strong> Integer overflow for large n (use long long).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Range primes:</strong> Re-checking evens unnecessarily; missing 2.</span>
                </li>
              </ul>
            </div>
            {/* Best Practices */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span> Best practices
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Prime check:</strong> Use <code>i*i &lt;= n</code> to avoid sqrt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Prime check:</strong> After handling 2, increment by 2 (check only odd divisors).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Fibonacci:</strong> Use <code>unsigned long long</code> for larger range.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Series generation:</strong> Clearly separate initial terms from iteration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Readability:</strong> Write helper function <code>isPrime()</code> for range prime.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Edge cases:</strong> Always test n=0,1,2 for prime; n=0,1 for Fibonacci.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Hint Section */}
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl border-l-4 border-yellow-500">
            <p className="font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
              💭 Think about…
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              …how you would modify the prime check to be even faster (skip multiples of 3).<br />
              <strong>Try changing this:</strong> In the Fibonacci code, change the starting values
              to <code>a=1, b=1</code>. What series do you get?
            </p>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST (delay 0.7s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.7s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">✅</span> Mini checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            {[
              "I can check if a number is prime using √n optimisation.",
              "I can generate Fibonacci numbers using two state variables.",
              "I can find all prime numbers in a given range.",
              "I use i*i ≤ n instead of sqrt(n).",
              "I handle edge cases (n=0,1,2, negative numbers).",
              "I understand why checking only up to √n works.",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-green-600 dark:text-green-400 text-xl">✔️</span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- TEACHER'S NOTE (delay 0.8s) ---------- */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8",
            "transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:[animation-delay:0.8s]"
          )}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🧑‍🏫</span> Teacher’s Note
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">🧔</span>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Sukanta Hui
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    📧 sukantahui@codernaccotax.co.in
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">📱 7003756860</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-bold">Experience:</span> {experienceYears} years
                (since 1998)
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-bold">Skills:</span> Programming Language, RDBMS,
                Operating System, Web Development
              </p>
              <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4">
                <p className="text-gray-800 dark:text-gray-200 italic">
                  “I still remember Debangshu's face when he realised that checking up to √n
                  is enough – it was like a light bulb turned on. These problems are the first
                  time students encounter <strong>algorithmic optimisation</strong>. I encourage
                  them to write both the naive and the optimised versions and measure the difference.
                  For Fibonacci, I bring sunflower pictures from Barrackpore market – it makes
                  mathematics tangible.”
                </p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl flex-1 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Point to remember
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>√n optimisation</strong> – cornerstone of primality testing.</li>
                <li><strong>State variables</strong> – a, b for Fibonacci; introduces iterative DP.</li>
                <li><strong>Break early</strong> – as soon as a divisor is found.</li>
                <li><strong>Test edge cases</strong> – 0,1,2 are traps for beginners.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic6;