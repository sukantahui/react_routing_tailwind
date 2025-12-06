import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic6() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Operator Precedence in Python
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        When multiple operators appear in the same expression, Python must decide 
        <strong>which operation to evaluate first</strong>.  
        This rule is called <span className="text-sky-300 font-semibold">operator precedence</span>.
      </p>

      {/* WHY PRECEDENCE MATTERS */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          Why Does Operator Precedence Matter?
        </h2>

        <p className="text-slate-300 text-sm">
          Without precedence, expressions could become ambiguous.
          Python follows a strict priority order to decide what gets evaluated first.
        </p>

        <EditablePythonCodeBlock
          initialCode={`result = 10 + 5 * 2
print(result)   # Output: 20, not 30
# Because: 5 * 2 happens BEFORE 10 + ...`}
        />
      </section>

      {/* OPERATOR PRECEDENCE TABLE */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200">
          Python Operator Precedence (Highest → Lowest)
        </h2>

        <div className="p-4 bg-slate-800 rounded-xl text-slate-200 text-sm space-y-1">
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Parentheses</strong>: <code>( )</code></li>
            <li><strong>Exponent</strong>: <code>**</code></li>
            <li><strong>Unary Operators</strong>: <code>+x</code>, <code>-x</code>, <code>not x</code></li>
            <li><strong>Multiplicative</strong>: <code>*</code>, <code>/</code>, <code>//</code>, <code>%</code></li>
            <li><strong>Additive</strong>: <code>+</code>, <code>-</code></li>
            <li><strong>Comparison</strong>: <code>&lt; &gt; &lt;= &gt;= == !=</code></li>
            <li><strong>Logical</strong>: <code>not</code>, <code>and</code>, <code>or</code></li>
          </ul>
        </div>
      </section>

      {/* PARENTHESES OVERRIDE */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-200">
          Parentheses Override the Rules
        </h2>

        <p className="text-slate-300 text-sm">
          You can always force Python to evaluate something first using <code>( )</code>.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print((10 + 5) * 2)  # 30
print(10 + 5 * 2)    # 20`}
        />
      </section>

      {/* UNARY VS BINARY */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-200">
          Unary Operators Have Higher Precedence
        </h2>

        <EditablePythonCodeBlock
          initialCode={`x = 5
print(-x * 3)  # -15 because unary - happens first`}
        />
      </section>

      {/* EXPONENTIATION */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-200">
          Exponentiation Happens Before Unary Minus
        </h2>

        <EditablePythonCodeBlock
          initialCode={`print(-2**3)   # -8
# Because: 2**3 happens first → 8, then unary - gives -8

print((-2)**3)  # -8 (parentheses change the base)`}
        />
      </section>

      {/* COMPLEX EXPRESSION BREAKDOWN */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          Step-by-Step Breakdown of a Complex Expression
        </h2>

        <EditablePythonCodeBlock
          initialCode={`expr = 10 + 6 * 3 - 4 / 2 ** 2
print(expr)

# Evaluation order:
# 1. 2 ** 2   → 4
# 2. 4 / 4    → 1.0
# 3. 6 * 3    → 18
# 4. 10 + 18  → 28
# 5. 28 - 1.0 → 27.0`}
        />
      </section>

      {/* LOGICAL OPERATOR PRECEDENCE */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          Logical Operator Precedence
        </h2>

        <EditablePythonCodeBlock
          initialCode={`print(True or False and False)
# Output: True
# Because: and → False and False = False
#           or → True or False = True`}
        />

        <EditablePythonCodeBlock
          initialCode={`print((True or False) and False)
# Output: False`}
        />
      </section>

      {/* COMMON MISTAKES */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-rose-300">
          Common Mistakes Students Make
        </h2>

        <EditablePythonCodeBlock
          initialCode={`print(10 + 20 / 5 * 3)  
# Many assume: (10 + 20) / 5 * 3  
# But correct order: 20 / 5 → 4, then 4 * 3 → 12, then 10 + 12 → 22`}
        />

        <EditablePythonCodeBlock
          initialCode={`print(not True == False)
# Correct evaluation:
# True == False → False
# not False → True`}
        />

        <div className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
          <strong>Teacher’s Tip:</strong>  
          When confused, add parentheses. It improves readability and avoids mistakes.
        </div>
      </section>

      {/* SUMMARY */}
      <section className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
        <h2 className="font-semibold text-slate-100 mb-2">Summary</h2>

        <ul className="list-disc ml-6 space-y-1">
          <li><strong>Exponent → Unary → Multiply → Add</strong> is the core hierarchy.</li>
          <li>Parentheses always override operator precedence.</li>
          <li>Logical: <code>not</code> → <code>and</code> → <code>or</code>.</li>
          <li>Use parentheses for readability and correctness.</li>
        </ul>
      </section>

    </div>
  );
}
