import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";
import Teacher from "../../../../../common/TeacherSukantaHui";
import {
  Layers,
  ArrowRight,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Scale,
  BookOpen,
  Terminal,
  Compass,
  Code2,
  Cpu,
  Calculator,
  ShieldCheck,
  Hash,
  Database,
  Binary
} from "lucide-react";

export default function Topic0() {
  const [selectedFamily, setSelectedFamily] = useState("all");

  // 7 Operator Families Data
  const operatorFamilies = [
    {
      id: "arithmetic",
      title: "1. Arithmetic Operators",
      icon: Calculator,
      color: "sky",
      symbols: "+, -, *, /, //, %, **",
      purpose: "Perform mathematical calculations, numerical modeling, powers, and modulus.",
      description: "From simple addition to advanced scientific calculations, floor division, and exponentiation.",
      examples: [
        { code: "15 + 4", result: "19", note: "Addition" },
        { code: "15 // 4", result: "3", note: "Floor division (integer quotient)" },
        { code: "15 % 4", result: "3", note: "Modulus (remainder)" },
        { code: "2 ** 4", result: "16", note: "Exponentiation (2^4)" }
      ]
    },
    {
      id: "assignment",
      title: "2. Assignment & Compound",
      icon: Database,
      color: "indigo",
      symbols: "=, +=, -=, *=, /=, //=, %=, **=",
      purpose: "Assign values and perform in-place updates efficiently.",
      description: "Combines arithmetic calculation with assignment to make code shorter, faster, and cleaner.",
      examples: [
        { code: "x = 10", result: "x is 10", note: "Simple assignment" },
        { code: "x += 5", result: "x is 15", note: "x = x + 5" },
        { code: "x *= 2", result: "x is 30", note: "x = x * 2" },
        { code: "x //= 4", result: "x is 7", note: "x = x // 4" }
      ]
    },
    {
      id: "comparison",
      title: "3. Comparison / Relational",
      icon: Scale,
      color: "emerald",
      symbols: "==, !=, <, >, <=, >=",
      purpose: "Compare operands and evaluate boolean True/False outcomes.",
      description: "Essential for decision making, conditional branches (if/elif/else), and loop terminations.",
      examples: [
        { code: "10 == 10", result: "True", note: "Equality check" },
        { code: "10 != 5", result: "True", note: "Not equal check" },
        { code: "15 >= 20", result: "False", note: "Greater than or equal" },
        { code: "5 < 10 < 20", result: "True", note: "Python Chained comparison" }
      ]
    },
    {
      id: "logical",
      title: "4. Logical / Boolean",
      icon: Zap,
      color: "amber",
      symbols: "and, or, not",
      purpose: "Combine multiple boolean conditions with short-circuit evaluation.",
      description: "Executes conditional logic based on Boolean truth tables; returns actual operand values.",
      examples: [
        { code: "True and False", result: "False", note: "Both must be True" },
        { code: "True or False", result: "True", note: "At least one True" },
        { code: "not (5 > 2)", result: "False", note: "Inverts boolean truth" },
        { code: "10 or 20", result: "10", note: "Short-circuits at first truthy" }
      ]
    },
    {
      id: "identity",
      title: "5. Identity Operators",
      icon: ShieldCheck,
      color: "purple",
      symbols: "is, is not",
      purpose: "Check if two variables reference the exact same memory location.",
      description: "Compares object identity (memory address id()), unlike == which only compares values.",
      examples: [
        { code: "a is b", result: "True / False", note: "Checks id(a) == id(b)" },
        { code: "[1, 2] is [1, 2]", result: "False", note: "Distinct objects in RAM" },
        { code: "[1, 2] == [1, 2]", result: "True", note: "Same values inside" },
        { code: "x is None", result: "True", note: "Standard singleton check" }
      ]
    },
    {
      id: "membership",
      title: "6. Membership Operators",
      icon: Hash,
      color: "rose",
      symbols: "in, not in",
      purpose: "Test if an item exists inside a container (string, list, tuple, set, dict).",
      description: "Provides expressive, highly readable containment verification without manual loops.",
      examples: [
        { code: "'py' in 'python'", result: "True", note: "Substring test" },
        { code: "3 in [1, 2, 3, 4]", result: "True", note: "List containment" },
        { code: "'admin' not in users", result: "True", note: "Absence verification" },
        { code: "'name' in user_dict", result: "True", note: "Dict key lookup" }
      ]
    },
    {
      id: "bitwise",
      title: "7. Bitwise Operators",
      icon: Binary,
      color: "cyan",
      symbols: "&, |, ^, ~, <<, >>",
      purpose: "Manipulate integer numbers at the binary bit level (0s and 1s).",
      description: "Used in low-level programming, encryption, network masks, graphics, and performance critical code.",
      examples: [
        { code: "5 & 3", result: "1 (0101 & 0011 = 0001)", note: "Bitwise AND" },
        { code: "5 | 3", result: "7 (0101 | 0011 = 0111)", note: "Bitwise OR" },
        { code: "5 ^ 3", result: "6 (0101 ^ 0011 = 0110)", note: "Bitwise XOR" },
        { code: "4 << 2", result: "16 (4 * 2^2)", note: "Bitwise Left Shift" }
      ]
    }
  ];

  const filteredFamilies = operatorFamilies.filter((fam) => {
    if (selectedFamily === "all") return true;
    return fam.id === selectedFamily;
  });

  return (
    <div className="space-y-12 pb-16 text-slate-100">

      {/* =========================================================================
          HERO & INTRODUCTORY SECTION
      ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="animate-pulse" />
            Module 001_003 · Operators & Expressions · Topic 0
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Introduction to Python <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">Operators & Expressions</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-4xl leading-relaxed">
            In computer programming, computation begins with <strong>Operators</strong> and <strong>Expressions</strong>. 
            An operator is a special symbol or keyword that tells Python's interpreter to perform a specific mathematical, 
            relational, or logical manipulation. Combined with values and variables (called <em>operands</em>), operators form 
            <strong>expressions</strong> that compute new data.
          </p>

          {/* 3 Core Architecture Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-sky-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">1</div>
                <h3 className="font-semibold text-slate-100 text-sm">Operands</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The data items (constants, variables, or functions) acted upon by an operator (e.g. <code className="text-sky-300">10</code> and <code className="text-sky-300">20</code> in <code className="text-sky-300">10 + 20</code>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-indigo-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">2</div>
                <h3 className="font-semibold text-slate-100 text-sm">Operators</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Special characters or keywords (<code className="text-indigo-300">+</code>, <code className="text-indigo-300">==</code>, <code className="text-indigo-300">and</code>, <code className="text-indigo-300">in</code>) that specify the transformation to apply.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
                <h3 className="font-semibold text-slate-100 text-sm">Expressions</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Any valid syntactic combination of operands and operators that resolves into a single resulting value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ANATOMY OF AN EXPRESSION (VISUAL ARCHITECTURE)
      ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 text-sky-400">
          <Layers size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            Anatomy of a Python Expression
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Understanding the distinction between an <strong>operator</strong>, an <strong>operand</strong>, and an <strong>expression</strong> is fundamental to writing readable, optimized code.
        </p>

        {/* Visual Diagram Box */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80">
          <div className="text-center font-mono text-xl md:text-2xl font-bold tracking-widest text-slate-100 py-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-cyan-400">total_cost</span>{" "}
            <span className="text-amber-400">=</span>{" "}
            <span className="text-emerald-400">(unit_price</span>{" "}
            <span className="text-rose-400">*</span>{" "}
            <span className="text-emerald-400">quantity)</span>{" "}
            <span className="text-sky-400">+</span>{" "}
            <span className="text-purple-400">delivery_fee</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <div className="font-bold font-sans">Operands</div>
              <div>unit_price, quantity, delivery_fee</div>
            </div>
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
              <div className="font-bold font-sans">Operators</div>
              <div>*, +, =</div>
            </div>
            <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300">
              <div className="font-bold font-sans">Sub-Expression</div>
              <div>(unit_price * quantity)</div>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <div className="font-bold font-sans">Statement</div>
              <div>Entire assignment line</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <strong className="text-sky-300 font-sans block text-sm">Expression vs. Statement:</strong>
            <p className="text-slate-400 leading-relaxed">
              An <strong>expression</strong> always computes and evaluates to a value (e.g. <code className="text-sky-300">5 * 4</code> evaluates to <code className="text-sky-300">20</code>). 
              A <strong>statement</strong> is a complete instruction that performs an action (e.g. <code className="text-sky-300">x = 20</code> assigns value, or <code className="text-sky-300">if score &gt; 90:</code> branches).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <strong className="text-emerald-300 font-sans block text-sm">Operator Arity (Number of Operands):</strong>
            <ul className="space-y-1 text-slate-400 list-disc pl-4 mt-1">
              <li><strong>Unary</strong> (1 operand): <code className="text-emerald-300">-x</code>, <code className="text-emerald-300">not valid</code>, <code className="text-emerald-300">~bits</code></li>
              <li><strong>Binary</strong> (2 operands): <code className="text-emerald-300">a + b</code>, <code className="text-emerald-300">x == y</code>, <code className="text-emerald-300">p and q</code></li>
              <li><strong>Ternary</strong> (3 operands): <code className="text-emerald-300">val_if_true if condition else val_if_false</code></li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE 7 OPERATOR FAMILIES (INTERACTIVE GRID)
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
              <Code2 size={14} />
              Taxonomy & Classification
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
              The 7 Core Operator Families in Python
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Every operator in Python belongs to one of these seven fundamental categories.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedFamily("all")}
              className={clsx(
                "px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer",
                selectedFamily === "all"
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              )}
            >
              All 7 Families
            </button>
            {operatorFamilies.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFamily(f.id)}
                className={clsx(
                  "px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer",
                  selectedFamily === f.id
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                )}
              >
                {f.title.split(". ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Family Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFamilies.map((fam) => {
            const Icon = fam.icon;
            return (
              <div
                key={fam.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400 group-hover:scale-105 transition">
                      <Icon size={20} />
                    </div>
                    <code className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300">
                      {fam.symbols}
                    </code>
                  </div>

                  <h3 className="font-bold text-slate-100 text-base group-hover:text-sky-300 transition">
                    {fam.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {fam.description}
                  </p>
                </div>

                {/* Micro Examples Table */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5 font-mono text-[11px]">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-sans font-bold">
                    Quick Examples:
                  </div>
                  {fam.examples.map((ex, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-300">
                      <span className="text-sky-300">{ex.code}</span>
                      <span className="text-emerald-400 font-bold">→ {ex.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          DEEP DIVE 1: ARITHMETIC OPERATORS & THE DIVISION NUANCES
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-sky-300">
          <Calculator size={24} />
          <h2 className="text-2xl font-bold text-slate-100">
            1. Arithmetic Operators & Division Mechanics
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Python supports 7 core arithmetic operators. Understanding the exact difference between <strong>True Division (<code className="text-sky-300">/</code>)</strong> and <strong>Floor Division (<code className="text-sky-300">//</code>)</strong> is critical, especially when working with loops, coordinates, and negative numbers.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-sky-300">True Division (/)</h4>
            <p className="text-xs text-slate-400">
              Always returns a <strong>float</strong>, even if the division divides evenly.
            </p>
            <div className="p-2 bg-slate-950 rounded font-mono text-xs text-emerald-400">
              10 / 2 → 5.0 (float!)<br />
              10 / 3 → 3.3333333333333335
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-amber-300">Floor Division (//)</h4>
            <p className="text-xs text-slate-400">
              Rounds <strong>down</strong> towards negative infinity to return an integer quotient.
            </p>
            <div className="p-2 bg-slate-950 rounded font-mono text-xs text-emerald-400">
              10 // 3 → 3<br />
              -7 // 2 → -4 (rounds down!)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-purple-300">Modulus Operator (%)</h4>
            <p className="text-xs text-slate-400">
              Returns the remainder satisfying: <br />
              <code className="text-purple-300 text-[11px]">a = (a // b) * b + (a % b)</code>
            </p>
            <div className="p-2 bg-slate-950 rounded font-mono text-xs text-emerald-400">
              14 % 4 → 2 (14 = 3*4 + 2)<br />
              -7 % 2 → 1 (satisfies identity)
            </div>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# Arithmetic Operations in Action
a = 17
b = 5

print("Addition (+)         :", a + b)     # 22
print("Subtraction (-)      :", a - b)     # 12
print("Multiplication (*)   :", a * b)     # 85
print("True Division (/)    :", a / b)     # 3.4 (Float result)
print("Floor Division (//)  :", a // b)    # 3   (Integer quotient)
print("Modulus (%)          :", a % b)     # 2   (Remainder)
print("Exponentiation (**)  :", a ** 2)    # 289 (17 squared)`}
        />
      </section>

      {/* =========================================================================
          DEEP DIVE 2: EQUALITY (==) VS IDENTITY (is)
      ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 text-purple-400">
          <ShieldCheck size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            Crucial Distinction: Equality (<code className="text-white">==</code>) vs. Identity (<code className="text-white">is</code>)
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          One of the most common beginner misunderstandings in Python is confusing 
          <code className="text-purple-300 font-bold"> == </code> (value comparison) with 
          <code className="text-purple-300 font-bold"> is </code> (object reference identity).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Equality Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={18} /> Equality Operator: ==
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Asks: <em>"Do these two objects have the same data/contents?"</em> It calls the object's <code className="text-emerald-300">__eq__()</code> method to compare values.
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg font-mono text-xs text-slate-300">
              list1 = [1, 2, 3]<br />
              list2 = [1, 2, 3]<br />
              list1 == list2 → <span className="text-emerald-400 font-bold">True</span> (Same values!)
            </div>
          </div>

          {/* Identity Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <AlertTriangle size={18} /> Identity Operator: is
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Asks: <em>"Are these two variables pointing to the EXACT same memory location in RAM?"</em> Compares <code className="text-rose-300">id(a) == id(b)</code>.
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg font-mono text-xs text-slate-300">
              list1 = [1, 2, 3]<br />
              list2 = [1, 2, 3]<br />
              list1 is list2 → <span className="text-rose-400 font-bold">False</span> (Different RAM addresses!)
            </div>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# Equality (==) vs Identity (is) Demonstration
list1 = ["Kolkata", "Barrackpore"]
list2 = ["Kolkata", "Barrackpore"]
list3 = list1  # list3 points to the exact same list in memory

print("list1 == list2 :", list1 == list2)   # True (Values match)
print("list1 is list2 :", list1 is list2)   # False (Different objects in RAM)
print("list1 is list3 :", list1 is list3)   # True (Same memory address)

print("id(list1) =", id(list1))
print("id(list2) =", id(list2))
print("id(list3) =", id(list3))`}
        />
      </section>

      {/* =========================================================================
          DEEP DIVE 3: LOGICAL SHORT-CIRCUITING & RETURN VALUES
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-amber-400">
          <Zap size={24} />
          <h2 className="text-2xl font-bold text-slate-100">
            Logical Operators & Short-Circuit Evaluation Mechanics
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          In Python, <code className="text-amber-300">and</code> and <code className="text-amber-300">or</code> do not merely return boolean <code className="text-amber-300">True</code> or <code className="text-amber-300">False</code>. 
          They return the <strong>actual operand value</strong> that determined the truthiness of the expression, and they <strong>short-circuit</strong> (stop evaluating as soon as the outcome is certain).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sky-300 text-sm">Short-Circuit 'and' Rules</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Evaluates left operand. If <strong>Falsy</strong>, returns it immediately without checking the right operand.</li>
              <li>If left operand is <strong>Truthy</strong>, evaluates and returns the right operand.</li>
            </ul>
            <div className="p-2.5 bg-slate-950 rounded font-mono text-xs text-sky-300">
              0 and "Hello" → 0 (0 is falsy, stops immediately)<br />
              "Python" and 42 → 42 (both truthy, returns last)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-300 text-sm">Short-Circuit 'or' Rules</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Evaluates left operand. If <strong>Truthy</strong>, returns it immediately without evaluating the right side!</li>
              <li>If left operand is <strong>Falsy</strong>, evaluates and returns the right operand.</li>
            </ul>
            <div className="p-2.5 bg-slate-950 rounded font-mono text-xs text-amber-300">
              "Kolkata" or "Delhi" → "Kolkata" (stops at first truthy)<br />
              "" or "Default Name" → "Default Name"
            </div>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# Short-Circuiting to Provide Default Fallbacks
user_input = ""  # empty string is falsy

# If user_input is empty, fallback to 'Guest User'
display_name = user_input or "Guest User"
print("Welcome,", display_name)

# Short-circuiting prevents ZeroDivisionError!
count = 0
total = 100

# Since count > 0 is False, (total / count) is NEVER executed!
if count > 0 and (total / count) > 10:
    print("Average is high")
else:
    print("Safe execution: avoided ZeroDivisionError via short-circuiting!")`}
        />
      </section>

      {/* =========================================================================
          REAL-WORLD INSTITUTIONAL SCENARIOS
      ========================================================================= */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
            <BookOpen size={14} />
            Institutional & Real-World Case Studies
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Applying Operator Logic to Real-World Systems
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Let's examine how Mamata, Debangshu, and Susmita solve practical computational tasks in Kolkata and Barrackpore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Case 1: Student SGPA & Grade Engine */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-300">
              <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs">Case 1</span>
              <h3 className="font-bold text-slate-100 text-base">Jadavpur University SGPA & Honors Evaluator</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Student Mamata calculates her semester weighted average, percentage, and honors eligibility:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Student: Mamata (Jadavpur University)
math_grade = 9      # Credits: 4
dsa_grade = 10      # Credits: 4
dbms_grade = 8      # Credits: 3
total_credits = 4 + 4 + 3

# Weighted Grade Points Expression
sgpa = (math_grade * 4 + dsa_grade * 4 + dbms_grade * 3) / total_credits
percentage = (sgpa - 0.75) * 10

is_honors = sgpa >= 8.5 and percentage >= 75.0

print(f"Mamata's SGPA: {sgpa:.2f}")
print(f"Equivalent Percentage: {percentage:.1f}%")
print(f"Honors Distinction Awarded: {is_honors}")`}
            />
          </div>

          {/* Case 2: Banking Transaction Guard */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs">Case 2</span>
              <h3 className="font-bold text-slate-100 text-base">Barrackpore ATM: Banking Transaction Guard</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu requests a cash withdrawal. The engine validates balance, ATM limit, and 100-rupee note divisibility:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Account: Debangshu (Barrackpore SBI Branch)
account_balance = 25000
daily_withdrawn = 10000
daily_limit = 40000
requested_amount = 5000

# Guard Conditions Combined via Logical & Comparison Operators
is_valid_denom = (requested_amount % 100 == 0) and (requested_amount > 0)
has_funds = requested_amount <= account_balance
within_limit = (daily_withdrawn + requested_amount) <= daily_limit

can_dispense = is_valid_denom and has_funds and within_limit

if can_dispense:
    account_balance -= requested_amount
    daily_withdrawn += requested_amount
    print(f"₹{requested_amount} dispensed successfully! Remaining Balance: ₹{account_balance}")
else:
    print("Transaction declined: criteria not satisfied.")`}
            />
          </div>

        </div>
      </section>

      {/* =========================================================================
          COMMON BEGINNER PITFALLS & TRAPS
      ========================================================================= */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-semibold mb-2">
            <AlertTriangle size={14} />
            Conceptual Pitfalls
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Top 5 Common Beginner Traps in Python Operators
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Avoid these frequent mistakes that confuse beginners and create subtle runtime errors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Trap 1 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 1: Floor Division with Negatives</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              print(-7 // 2) # Gives -4, not -3!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Python always rounds <em>down towards negative infinity</em>. <code className="text-amber-300">-3.5</code> rounded down is <code className="text-amber-300">-4</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ int(-7 / 2) truncates towards zero
            </div>
          </div>

          {/* Trap 2 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 2: String + Number Concatenation</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              "Age: " + 25 # ❌ TypeError
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Python does NOT auto-convert numbers to strings during addition like JavaScript.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use f"Age: {'{25}'}" or str(25)
            </div>
          </div>

          {/* Trap 3 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 3: Chained Assignment with Lists</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              a = b = [] # ❌ Shared mutable reference
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Both variables point to the <strong>same list in RAM</strong>. Modifying <code className="text-amber-300">a.append(1)</code> also changes <code className="text-amber-300">b</code>!
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ a, b = [], [] for independent lists
            </div>
          </div>

          {/* Trap 4 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 4: Modulo with Floating Points</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              7.5 % 2.5 # Returns 0.0 (Float)
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Modulus works with floats in Python, but IEEE 754 precision limits can introduce tiny rounding quirks.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ math.isclose() for float comparisons
            </div>
          </div>

          {/* Trap 5 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 5: Single = in if Statements</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              if x = 10: # ❌ SyntaxError in Python
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Python protects you from accidental assignment in conditionals. <code className="text-amber-300">=</code> is assignment, <code className="text-amber-300">==</code> is comparison.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use if x == 10: for comparison
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TEACHER'S NOTE
      ========================================================================= */}
      <section className="space-y-4">
        <Teacher
          note="When you begin writing algorithms in Python, think of operators as the fundamental verbs of programming. Understand the core distinction between True Division (/) which always gives a float and Floor Division (//) which gives the integer quotient. Always remember that == tests value equality, whereas 'is' checks memory location. In upcoming topics, we will dive deeper into each individual family, mastering their precedence and exact execution order."
        />
      </section>

      {/* =========================================================================
          SUMMARY CHECKLIST
      ========================================================================= */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" />
          Summary & Foundation Checklist
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span>Python provides <strong>7 operator families</strong> for numerical, relational, and logical tasks.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong><code>/</code></strong> returns a float; <strong><code>//</code></strong> rounds down to the nearest integer.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong><code>==</code></strong> tests values; <strong><code>is</code></strong> tests object identity in RAM (<code>id()</code>).</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong><code>and</code> &amp; <code>or</code></strong> short-circuit and return the determining operand value.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong><code>in</code> &amp; <code>not in</code></strong> provide clean membership testing in collections.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Bitwise operators</strong> manipulate individual binary bits for systems-level efficiency.</span>
          </li>
        </ul>
      </section>

    </div>
  );
}
