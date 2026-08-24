import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic7() {
  return (
    <div className="space-y-8">

      {/* Title */}
      <h1 className="text-2xl font-bold text-sky-300">
        Topic 7 — Evaluating Expressions (Step-by-Step Rules)
      </h1>

      {/* Intro Section */}
      <p className="text-slate-300 text-sm leading-relaxed">
        In Python, an <strong>expression</strong> is anything that produces a value.
        Python evaluates expressions by following operator precedence,
        associativity, and left-to-right execution rules.
        Understanding this process is crucial for writing predictable,
        bug-free programs.
      </p>

      {/* SECTION 1 — BASIC FLOW */}
      <h2 className="text-xl font-semibold text-sky-400">
        1. The Step-by-Step Evaluation Flow
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        Python evaluates expressions using this order:
      </p>

      <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
        <li>Break the expression into smaller sub-expressions.</li>
        <li>Apply **precedence** rules to decide which operator goes first.</li>
        <li>Apply **associativity** (usually left → right).</li>
        <li>Simplify step-by-step until a final single value remains.</li>
      </ul>

      <EditablePythonCodeBlock
        initialCode={`# Example
result = 5 + 2 * 3
print(result)`}
      />

      <p className="text-slate-300 text-sm">
        Step-by-step:
      </p>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-xs">{`
2 * 3 = 6
5 + 6 = 11
Final Answer = 11
      `}</pre>

      {/* SECTION 2 — PRECEDENCE TREE */}
      <h2 className="text-xl font-semibold text-sky-400">
        2. Expression Tree (How Python Sees Complex Expressions)
      </h2>

      <p className="text-slate-300 text-sm">
        Python internally builds a “tree” showing which operation happens first.
      </p>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-xs">{`
Expression: 10 + 2 * 3 - 4

        (-)
       /   \\
     (+)    4
    /   \\
  10   (*)
       /  \\
      2    3
      `}</pre>

      <p className="text-slate-300 text-sm">
        Then Python evaluates **bottom-up**.
      </p>

      {/* SECTION 3 — STRING + NUMBER EVALUATION RULES */}
      <h2 className="text-xl font-semibold text-sky-400">
        3. Mixed Expressions (String + Numeric)
      </h2>

      <p className="text-slate-300 text-sm">
        Python does <strong>not</strong> auto-convert types in expressions.
        String + number → ❌ Error.
      </p>

      <EditablePythonCodeBlock
        initialCode={`"Hello" + " World"   # OK
"Hi" * 3             # OK → "HiHiHi"
"Age: " + 25         # ❌ TypeError`}
      />

      <p className="text-slate-300 text-sm">
        To fix it:
      </p>

      <EditablePythonCodeBlock
        initialCode={`"Age: " + str(25)`}
      />

      {/* SECTION 4 — FULL EVALUATION TABLE */}
      <h2 className="text-xl font-semibold text-sky-400">
        4. Full Evaluation Examples (Step-by-Step)
      </h2>

      <h3 className="text-lg text-sky-300">Example A:</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-xs">{`
Expression: 4 + 18 / 3 - 1

1. 18 / 3 = 6
2. 4 + 6 = 10
3. 10 - 1 = 9

Final Answer = 9
      `}</pre>

      <h3 className="text-lg text-sky-300">Example B:</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-xs">{`
Expression: (5 + 3) * 2 ** 3 / 4

1. Parentheses: (5 + 3) = 8
2. Exponent: 2 ** 3 = 8
3. Multiply: 8 * 8 = 64
4. Divide: 64 / 4 = 16

Final Answer = 16
      `}</pre>

      {/* SECTION 5 — LOGICAL EXPRESSION EVALUATION */}
      <h2 className="text-xl font-semibold text-sky-400">
        5. Evaluating Logical Expressions
      </h2>

      <p className="text-slate-300 text-sm">
        Python evaluates <strong>and</strong>, <strong>or</strong>, <strong>not</strong> using
        short-circuit rules:
      </p>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-xs">{`
True and False → first True then evaluates second → False
True or False  → stops at first True → True
not False → True      `}</pre>

      <EditablePythonCodeBlock
        initialCode={`x = 10
print(x > 5 and x < 20)   # True
print(x < 5 or x == 10)   # True
print(not(x == 10))       # False`}
      />

      {/* SECTION 6 — COMPLEX LOGICAL-ARITHMETIC MIX */}
      <h2 className="text-xl font-semibold text-sky-400">
        6. Mixed Logical + Arithmetic Evaluation
      </h2>

      <EditablePythonCodeBlock
        initialCode={`expr = (5 + 3 > 7) and (2 * 4 == 8)
print(expr)`}
      />

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-xs">{`
5 + 3 = 8
8 > 7 → True
2 * 4 = 8
8 == 8 → True
True and True → True
      `}</pre>

      {/* SECTION 7 — TRICKY EXPRESSIONS */}
      <h2 className="text-xl font-semibold text-sky-400">
        7. Tricky Python Expressions (Must Know!)
      </h2>

      <EditablePythonCodeBlock
        initialCode={`print(10 / 3)     # 3.333...
print(10 // 3)    # 3 (floor division)
print(10 % 3)     # 1
print(2 ** 3 ** 2) # 512 (right associative!)`}
      />

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-xs">{`
Exponent (**)
evaluates right → left:

3 ** 2 = 9
2 ** 9 = 512
      `}</pre>

      {/* SUMMARY */}
      <h2 className="text-xl font-semibold text-sky-400">
        Summary — How Python Evaluates Expressions
      </h2>

      <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
        <li>Python breaks expressions into smaller chunks.</li>
        <li>Precedence decides priority.</li>
        <li>Associativity decides left → right execution.</li>
        <li>Parentheses override everything.</li>
        <li>Logical operators short-circuit evaluation.</li>
        <li>Strings require explicit conversion when mixed with numbers.</li>
      </ul>

    </div>
  );
}
