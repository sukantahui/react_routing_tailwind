import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import precedenceExampleJava from "./topic4_files/PrecedenceExample.java?raw";
import questions from "./topic4_files/topic4_questions";

// Inline keyframes (motion‑safe)
const styles = `
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fadeUp {
    animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-scaleIn {
    animation: scaleIn 0.5s ease-out forwards;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  @media (prefers-reduced-motion: reduce) {
    .animate-fadeUp, .animate-scaleIn {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

export default function Topic4() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Operator Precedence
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            The rules that determine the order of evaluation in expressions – know them to avoid surprises.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              What is Operator Precedence?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                <strong className="text-indigo-600 dark:text-indigo-400">Operator precedence</strong> defines the
                order in which operators are evaluated in an expression. Just like in mathematics, multiplication
                and division are performed before addition and subtraction.
              </p>
              <p>
                For example, in <code className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">5 + 3 * 2</code>,
                the multiplication <code>*</code> has higher precedence than <code>+</code>, so the expression is
                evaluated as <code>5 + (3 * 2) = 11</code>, not <code>(5 + 3) * 2 = 16</code>.
              </p>
              <p>
                Java has a well‑defined precedence table that every programmer should know (or at least know how to
                look up). When in doubt, use parentheses to override the default order.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Precedence is about which operator "sticks"
                  more tightly to its operands. High precedence → tighter binding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRECEDENCE TABLE */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Java Operator Precedence (from highest to lowest)
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700">Precedence</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700">Operators</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700">Associativity</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1 (highest)</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>++ --</code> (postfix)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>++ -- + - ! ~</code> (prefix)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Right‑to‑left</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>(type)</code> cast</td><td className="p-3 border border-gray-200 dark:border-gray-700">Right‑to‑left</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>* / %</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>+ -</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>&lt;&lt; &gt;&gt; &gt;&gt;&gt;</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>&lt; &lt;= &gt; &gt;= instanceof</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>== !=</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">9</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>&amp;</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">10</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>^</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">11</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>|</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">12</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>&amp;&amp;</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">13</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>||</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Left‑to‑right</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">14</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>? :</code> (ternary)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Right‑to‑left</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">15 (lowest)</td><td className="p-3 border border-gray-200 dark:border-gray-700"><code>= += -= *= /= %= &lt;&lt;= &gt;&gt;= &amp;= ^= |=</code></td><td className="p-3 border border-gray-200 dark:border-gray-700">Right‑to‑left</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Higher precedence means operators are evaluated earlier. Use parentheses to change the order.
            </p>
          </div>
        </section>

        {/* REAL‑WORLD USAGE */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Real‑World Usage
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                In finance applications, calculating compound interest requires careful precedence:{" "}
                <code>amount = principal * (1 + rate) ** years</code>. If precedence is misunderstood, the result
                can be wildly wrong.
              </p>
              <p>
                In game development, physics formulas often mix multiplication and addition. For example,{" "}
                <code>velocity = initialVelocity + acceleration * time</code> – multiplication before addition is
                critical.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Tuhina from Barrackpore once wrote{" "}
                  <code>total = marks1 + marks2 / 2</code> and got a lower score than expected. She learned to use
                  parentheses: <code>total = (marks1 + marks2) / 2</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – Precedence Example */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Visualizing Precedence
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 700 200"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Operator precedence illustration"
              >
                <rect x="20" y="20" width="660" height="160" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="660" height="160" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Expression: 10 + 5 * 2 */}
                <text x="350" y="70" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#1e293b" className="dark:fill-gray-200">
                  <tspan fill="#0ea5e9">10</tspan>
                  <tspan fill="#f59e0b"> + </tspan>
                  <tspan fill="#0ea5e9">5</tspan>
                  <tspan fill="#ef4444"> * </tspan>
                  <tspan fill="#0ea5e9">2</tspan>
                </text>

                {/* Arrow indicating * first */}
                <text x="350" y="110" textAnchor="middle" fontSize="14" fill="#ef4444" fontWeight="500">
                  ↓ higher precedence (multiplication)
                </text>

                {/* Then + */}
                <text x="350" y="145" textAnchor="middle" fontSize="14" fill="#f59e0b" fontWeight="500">
                  ↓ lower precedence (addition)
                </text>

                {/* Result */}
                <text x="620" y="70" fontSize="16" fill="#22c55e" fontWeight="500">→ 20</text>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              Multiplication (<code>*</code>) is evaluated before addition (<code>+</code>) because it has higher precedence.
            </p>
          </div>
        </section>

        {/* TIPS & TRICKS */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              💡 Tips &amp; Tricks (Professional Level)
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Always use parentheses when mixing operators</strong> – even if you remember precedence,
                future readers may not.
              </li>
              <li>
                <strong>Know that <code>&amp;&amp;</code> has higher precedence than <code>||</code></strong> – so
                <code>a &amp;&amp; b || c</code> is <code>(a &amp;&amp; b) || c</code>.
              </li>
              <li>
                <strong>Assignment operators have the lowest precedence</strong> – meaning the right‑hand side is
                fully evaluated before assignment.
              </li>
              <li>
                <strong>Use the table as a reference, not a memorization exercise</strong> – the compiler will
                enforce it, but you write for humans.
              </li>
            </ul>
          </div>
        </section>

        {/* COMMON PITFALLS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              ⚠️ Common Pitfalls
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Assuming left‑to‑right for all operators</strong> – not true; assignment and unary are
                right‑associative.
              </li>
              <li>
                <strong>Mis‑placing <code>&amp;&amp;</code> and <code>||</code></strong> – e.g., expecting
                <code>a &amp;&amp; b || c</code> to mean <code>a &amp;&amp; (b || c)</code>.
              </li>
              <li>
                <strong>Forgetting that <code>==</code> has lower precedence than <code>&gt;</code></strong> – so
                <code>a &gt; b == c</code> is <code>(a &gt; b) == c</code>.
              </li>
              <li>
                <strong>Using bitwise operators <code>&amp;</code> and <code>|</code> in conditionals</strong> –
                they have different precedence than <code>&amp;&amp;</code> and <code>||</code>.
              </li>
            </ul>
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-green-500 rounded-full"></span>
              ✅ Best Practices
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Parentheses are your friend</strong> – use them to make precedence explicit, not just when
                necessary.
              </li>
              <li>
                <strong>Break complex expressions</strong> – if you're relying on precedence across multiple levels,
                consider using intermediate variables.
              </li>
              <li>
                <strong>Know the precedence of <code>instanceof</code></strong> – it's higher than <code>==</code>
                but lower than relationals, so <code>obj instanceof String == true</code> is parsed as
                <code>(obj instanceof String) == true</code>.
              </li>
              <li>
                <strong>Use a consistent style</strong> – e.g., always put spaces around operators for clarity.
              </li>
            </ul>
          </div>
        </section>

        {/* MINI CHECKLIST */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              📋 Mini Checklist
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "I understand what operator precedence means.",
                "I know that multiplication/division come before addition/subtraction.",
                "I can use parentheses to change evaluation order.",
                "I am aware that assignment is lowest precedence.",
                "I can look up precedence when uncertain.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <span className="text-indigo-500 text-xl">☐</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HINT SECTION */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              🤔 Think About…
            </h2>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>• What is the value of <code>10 - 3 + 2</code>? (Hint: associativity for same precedence)</li>
              <li>• How would you write <code>a + b * c - d / e</code> with parentheses to make it explicitly clear?</li>
              <li>• Why is <code>if (x = 5)</code> always true? What precedence rule is involved?</li>
              <li>• Try predicting the outcome of <code>true || false && false</code>.</li>
            </ul>
          </div>
        </section>

        {/* JAVA CODE EXAMPLE */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-orange-500 rounded-full"></span>
              🖥️ Java Example
            </h2>
            <div className="mt-4">
              <JavaFileLoader
                fileModule={precedenceExampleJava}
                title="PrecedenceExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates how precedence affects the result of expressions.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Precedence is one of the first things I emphasise in class. I tell my students in Shyamnagar: 'When in doubt, add parentheses – it costs nothing and saves hours of debugging.' I also recommend they write small programs to test their understanding. For example, run a program with `System.out.println(5 + 3 * 2);` and then `System.out.println((5 + 3) * 2);` to see the difference. This concrete experience builds intuition."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Operator Precedence – FAQs"
            questions={questions}
          />
        </div>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 • Expression Conversion Course • Barrackpore, India</p>
        </footer>
      </div>
    </div>
  );
}