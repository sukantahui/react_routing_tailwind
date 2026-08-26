import React from "react";

// Shared Course Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import arithmeticCode from "./topic6_files/arithmetic_expression_pipeline.py?raw";
import booleanCode from "./topic6_files/boolean_logic_and_short_circuit.py?raw";
import astTreeCode from "./topic6_files/operator_chaining_and_ast_tree.py?raw";
import institutionalCode from "./topic6_files/institutional_financial_grade_evaluator.py?raw";

// Plain Text Note for Printing & Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions Data (30 questions)
import questions from "./topic6_files/topic6_questions";

import {
  Terminal,
  Sparkles,
  Code2,
  Layers,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Lightbulb
} from "lucide-react";

export default function Topic6() {

  return (
    <div className="space-y-12 pb-16 text-slate-100">

      {/* =========================================================================
          HERO & CONCEPT OVERVIEW
      ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="animate-pulse" />
            Module 001_003 · Operators & Expressions · Topic 6
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Evaluating Expressions: <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">Step-by-Step Execution Rules</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-4xl leading-relaxed">
            In Python, an <strong>expression</strong> is any syntactic construct of variables, literals, and operators that evaluates down to a single value. 
            Understanding the internal 4-phase evaluation engine—from lexical parsing and Abstract Syntax Tree (AST) reduction to left-to-right operand dispatch and short-circuiting—is essential for mastering debugging and building rock-solid numerical software.
          </p>

          {/* 3 Core Architecture Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-sky-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">1</div>
                <h3 className="font-semibold text-slate-100 text-sm">AST Tree Reduction</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Python structures expressions into hierarchical syntax trees and evaluates child sub-expressions bottom-up.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-indigo-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">2</div>
                <h3 className="font-semibold text-slate-100 text-sm">Left-to-Right Operands</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Python strictly evaluates operands from Left-to-Right before executing the corresponding operator.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
                <h3 className="font-semibold text-slate-100 text-sm">Short-Circuiting</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Logical operators (<code className="text-emerald-300">and</code>, <code className="text-emerald-300">or</code>) stop evaluation immediately when the outcome is guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: THE 4 PHASES OF EXPRESSION EVALUATION
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-sky-400">
          <Layers size={24} />
          <h2 className="text-2xl font-bold text-slate-100">
            1. The 4 Phases of Python Expression Evaluation
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          When you write an expression in Python, the interpreter executes it through four sequential phases:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-sky-500/40 transition">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs">P1</div>
            <h3 className="font-bold text-sm text-slate-100">1. Tokenization</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Breaks raw code text into individual tokens (literals, variable names, operators, parentheses).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-indigo-500/40 transition">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">P2</div>
            <h3 className="font-bold text-sm text-slate-100">2. AST Construction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Builds an Abstract Syntax Tree based on operator precedence and associativity hierarchies.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-amber-500/40 transition">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">P3</div>
            <h3 className="font-bold text-sm text-slate-100">3. Operand Dispatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluates operands strictly Left-to-Right, invoking functions and resolving variable identifiers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">P4</div>
            <h3 className="font-bold text-sm text-slate-100">4. Tree Reduction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Applies operators bottom-up to produce intermediate results until a final single value is returned.
            </p>
          </div>
        </div>

        {/* Visual ASCII AST Tree */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">
              AST Evaluation Tree: <code className="text-sky-300">10 + 6 * 3 - 4 / 2 ** 2</code>
            </h4>
            <span className="text-xs font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              Evaluates Bottom-Up → 27.0
            </span>
          </div>

          <pre className="font-mono text-xs text-slate-300 bg-slate-900 p-4 rounded-xl overflow-x-auto leading-relaxed border border-slate-800/80">
{`                        (-)  <-- Final Root Operator: 28 - 1.0 = 27.0
                       /   \\
                     (+)    (/)  <-- True Division: 4 / 4 = 1.0
                    /   \\   /  \\
                  10    (*) 4  (**)  <-- Exponentiation: 2 ** 2 = 4
                       /   \\   /  \\
                      6     3 2    2`}
          </pre>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PYTHON CODE FILES VIA PYTHONFILELOADER
      ========================================================================= */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
            <Code2 size={14} />
            Modular Python Implementations
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Expression Evaluation Scripts & Pipelines
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Explore industry-standard scripts demonstrating step-by-step arithmetic pipelines, short-circuiting, and AST trees.
          </p>
        </div>

        <div className="space-y-6">
          {/* File 1 */}
          <PythonFileLoader
            fileModule={arithmeticCode}
            title="arithmetic_expression_pipeline.py"
            highlightLines={[12, 17, 22, 27, 32, 37]}
          />

          {/* File 2 */}
          <PythonFileLoader
            fileModule={booleanCode}
            title="boolean_logic_and_short_circuit.py"
            highlightLines={[14, 21, 28, 38]}
          />

          {/* File 3 */}
          <PythonFileLoader
            fileModule={astTreeCode}
            title="operator_chaining_and_ast_tree.py"
            highlightLines={[10, 19, 29]}
          />

          {/* File 4 */}
          <PythonFileLoader
            fileModule={institutionalCode}
            title="institutional_financial_grade_evaluator.py"
            highlightLines={[13, 17, 23, 27]}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: STEP-BY-STEP INTERACTIVE WORKTHROUGHS
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
              <Terminal size={14} />
              Interactive Lab
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              Interactive Expression Breakdown Studio
            </h2>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-sky-300">
              Live Expression Evaluation Playground
            </h3>
            <span className="text-xs text-slate-400">Powered by Pyodide Engine</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Modify values, test custom operator combinations, and observe how Python computes intermediate outputs in real time:
          </p>

          <EditablePythonCodeBlock
            initialCode={`# Interactive Expression Evaluation Lab
# Student: Mamata (Jadavpur) testing complex equations

# Expression 1: Mixed Arithmetic & Exponentiation
res1 = 100 - 4 * 3 ** 2 + 15 // 4
print("100 - 4 * 3 ** 2 + 15 // 4 =", res1)
# Trace: 3**2=9 -> 4*9=36 &rarr; 15//4=3 -&gt; 100-36=64 -> 64+3=67

# Expression 2: Logical Short-Circuiting with Comparisons
age = 20
city = "Kolkata"
is_eligible = (age &ge; 18) and (city == "Kolkata" or city == "Barrackpore")
print("Eligibility Status         :", is_eligible)

# Expression 3: Right-Associative Exponentiation vs Parentheses
print("2 ** 3 ** 2                 =", 2 ** 3 ** 2)      # 512
print("(2 ** 3) ** 2               =", (2 ** 3) ** 2)    # 64`}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: REAL-WORLD INSTITUTIONAL CASE STUDIES
      ========================================================================= */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2">
            <BookOpen size={14} />
            Institutional Applications
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Real-World Expression Pipelines in Bengal Institutions
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Practical scenarios showing how students and engineers apply step-by-step logic in Kolkata, Barrackpore, and Jadavpur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Case 1: Mamata's Honors Scholarship */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-300">
              <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs">Case 1</span>
              <h3 className="font-bold text-slate-100 text-base">Jadavpur University: Composite Admission Index</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Student Mamata calculates her composite ranking score using weighted academic and entrance metrics:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Applicant: Mamata (Jadavpur University)
board_marks = 92.0     # Out of 100
entrance_score = 178   # Out of 200
sports_points = 15     # Bonus

# Multi-stage composite evaluation
composite_index = (board_marks * 0.40) + ((entrance_score / 200) * 50) + sports_points
is_top_tier = (composite_index >= 90.0) and (board_marks &ge; 90.0)

print(f"Mamata's Composite Score: {composite_index:.2f} / 105.0")
print(f"Direct Admission Tier    : {'Merit Top 10' if is_top_tier else 'Standard Admission'}")`}
            /&gt;
          </div>

          {/* Case 2: Debangshu's Banking Guard */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs">Case 2</span>
              <h3 className="font-bold text-slate-100 text-base">Barrackpore Cooperative: Micro-Credit Loan Calculator</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu computes EMI and loan risk ratio using compound interest formula expressions:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Loan Officer: Debangshu (Barrackpore Cooperative Bank)
principal = 100000.0   # ₹1,00,000
annual_rate = 0.085    # 8.5%
tenure_years = 2

# Monthly Rate and Months
monthly_rate = annual_rate / 12
months = tenure_years * 12

# Standard EMI Formula Expression: P * r * (1+r)^n / ((1+r)^n - 1)
compound_factor = (1 + monthly_rate) ** months
emi = (principal * monthly_rate * compound_factor) / (compound_factor - 1)
total_payable = emi * months
total_interest = total_payable - principal

print(f"Monthly EMI   : ₹{emi:,.2f}")
print(f"Total Payable : ₹{total_payable:,.2f}")
print(f"Interest Cost : ₹{total_interest:,.2f}")`}
            />
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: HINTS & THINKING MINDSET (NEW SECTION)
      ========================================================================= */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-amber-400">
          <Lightbulb size={24} />
          <h2 className="text-xl font-bold text-slate-100">
            Guided Problem Solving & Thinking Mindset
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          When analyzing a complex expression in exams, code reviews, or production debugging, train your brain with these thinking prompts:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-sky-300 text-sm">💡 Think About...</h4>
            <p className="text-slate-400 leading-relaxed">
              What data types are involved? Will division <code className="text-sky-300">/</code> introduce a float that breaks integer operations downstream?
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-amber-300 text-sm">🔍 Observe Carefully...</h4>
            <p className="text-slate-400 leading-relaxed">
              Are there chained exponentiations (<code className="text-amber-300">**</code>) or assignments (<code className="text-amber-300">=</code>)? Remember they evaluate from <strong>Right to Left</strong>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-emerald-300 text-sm">🛠️ Try Changing This...</h4>
            <p className="text-slate-400 leading-relaxed">
              Add explicit parentheses <code className="text-emerald-300">( )</code> around sub-expressions to verify if your mental evaluation matches Python's AST output.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: COMMON BEGINNER TRAPS & PITFALLS
      ========================================================================= */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-semibold mb-2">
            <AlertTriangle size={14} />
            Common Pitfalls
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Top 6 Dangerous Traps in Expression Evaluation
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Beware of these frequent misunderstandings that cause logical defects and runtime exceptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Trap 1 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 1: Precedence Overload</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              10 + 20 / 5 * 2 # 18.0
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Beginners assume <code className="text-amber-300">(10+20)/(5*2) = 3</code>. Correct order is <code className="text-emerald-300">20/5 = 4.0 → 4.0*2 = 8.0 → 10+8.0 = 18.0</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: (10 + 20) / (5 * 2)
            </div>
          </div>

          {/* Trap 2 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 2: Short-Circuit Side Effects</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              True or update_db()
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Because the left side is <code className="text-amber-300">True</code>, <code className="text-rose-300">update_db()</code> is <strong>never executed</strong>!
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Call functions before boolean tests
            </div>
          </div>

          {/* Trap 3 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 3: Unary Minus vs Power</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              -2 ** 4 # Gives -16
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Exponentiation binds tighter than unary minus. Python computes <code className="text-amber-300">-(2**4) = -16</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: (-2) ** 4 → 16
            </div>
          </div>

          {/* Trap 4 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 4: Float Equality with ==</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              0.1 + 0.2 == 0.3 # False!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Binary floating point representation causes IEEE 754 precision artifacts.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: math.isclose(a, b)
            </div>
          </div>

          {/* Trap 5 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 5: if x == 1 or 2</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              if x == 1 or 2: # Always True!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluates as <code className="text-amber-300">(x == 1) or 2</code>. Since <code className="text-amber-300">2</code> is truthy, it always branches.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: if x in (1, 2):
            </div>
          </div>

          {/* Trap 6 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 6: Negative Floor Division</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              -7 // 2 # Gives -4, not -3!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Floor division rounds towards negative infinity. <code className="text-amber-300">-3.5</code> rounded down is <code className="text-amber-300">-4</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: int(-7 / 2) for truncation
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: SUMMARY & KEY TAKEAWAYS CHECKLIST
      ========================================================================= */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" />
          Summary & Key Takeaways Checklist
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Expressions</strong> reduce down to a single value; <strong>Statements</strong> execute actions.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Parentheses <code>()</code></strong> override natural precedence and eliminate ambiguity.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Exponentiation <code>**</code></strong> is Right-to-Left associative (<code>2**3**2 = 512</code>).</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Logical precedence</strong> is strictly <code>not</code> &gt; <code>and</code> &gt; <code>or</code>.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Short-circuiting</strong> stops boolean evaluation on first definitive Truthy/Falsy value.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Chained comparisons</strong> evaluate middle operands once with single dispatch.</span>
          </li>
        </ul>
      </section>

      {/* =========================================================================
          SECTION 8: FAQS TEMPLATE
      ========================================================================= */}
      <section>
        <FAQTemplate
          title="Evaluating Expressions FAQs"
          questions={questions}
        />
      </section>

      {/* =========================================================================
          SECTION 9: PLAIN TEXT PRINT & DOWNLOAD NOTE
      ========================================================================= */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Topic 6: Evaluating Expressions Study Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Study Note"
          downloadFileName="topic6_note.txt"
        />
      </section>

      {/* =========================================================================
          SECTION 10: TEACHER'S NOTE
      ========================================================================= */}
      <section>
        <Teacher
          note="Mastering expression evaluation is all about internalizing how Python builds and reduces its syntax tree. In our classroom sessions in Kolkata and Barrackpore, I always tell students: 'Do not write clever one-liners that rely on obscure precedence rules—write readable, explicit code using parentheses.' When debugging complex mathematical models or financial algorithms, always trace expressions step-by-step from inner parentheses outwards."
        />
      </section>

    </div>
  );
}
