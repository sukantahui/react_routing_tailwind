import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";
import Teacher from "../../../../../common/TeacherSukantaHui";
import {
  Calculator,
  ArrowRight,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Zap,
  BookOpen,
  Terminal,
  Code2,
  Layers,
  Cpu,
  Hash,
  Clock,
  Boxes,
  Divide,
  Filter,
  Check,
  X,
  Binary
} from "lucide-react";

export default function Topic1() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");

  // Arithmetic Operators Table Data
  const arithmeticOperators = [
    {
      symbol: "+",
      name: "Addition / Unary Plus",
      category: "basic",
      returnRule: "Returns sum of operands (int or float)",
      dunder: "__add__(other) / __pos__()",
      example: "12 + 5 → 17",
      tip: "Also overloaded for string and list concatenation ('a' + 'b' → 'ab')."
    },
    {
      symbol: "-",
      name: "Subtraction / Unary Minus",
      category: "basic",
      returnRule: "Returns difference of operands",
      dunder: "__sub__(other) / __neg__()",
      example: "12 - 5 → 7",
      tip: "Unary minus (-x) negates sign. -3 ** 2 is -9 due to precedence!"
    },
    {
      symbol: "*",
      name: "Multiplication / Repetition",
      category: "basic",
      returnRule: "Returns product of numbers",
      dunder: "__mul__(other)",
      example: "12 * 5 → 60",
      tip: "Also overloaded for sequence repetition ('Hi! ' * 3 → 'Hi! Hi! Hi! ')."
    },
    {
      symbol: "/",
      name: "True Division",
      category: "division",
      returnRule: "ALWAYS returns a float in Python 3",
      dunder: "__truediv__(other)",
      example: "10 / 2 → 5.0",
      tip: "Never returns an int, even when dividing evenly! Raises ZeroDivisionError on 0."
    },
    {
      symbol: "//",
      name: "Floor Division (Integer Div)",
      category: "division",
      returnRule: "Rounds down towards -∞ (int or float)",
      dunder: "__floordiv__(other)",
      example: "17 // 5 → 3",
      tip: "Negative numbers round down: -7 // 2 is -4 (not -3!). Essential for loop step sizes."
    },
    {
      symbol: "%",
      name: "Modulus (Remainder)",
      category: "division",
      returnRule: "Returns remainder of division",
      dunder: "__mod__(other)",
      example: "17 % 5 → 2",
      tip: "Satisfies identity: a = (a // b) * b + (a % b). Critical for clock & cyclic math."
    },
    {
      symbol: "**",
      name: "Exponentiation (Power)",
      category: "advanced",
      returnRule: "Raises base to power (arbitrary precision)",
      dunder: "__pow__(other)",
      example: "2 ** 10 → 1024",
      tip: "Right-associative (2 ** 3 ** 2 = 512). Fractional exponents calculate roots (16**0.5 = 4.0)."
    }
  ];

  const filteredOperators = arithmeticOperators.filter((op) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "basic" && op.category === "basic") ||
      (activeTab === "division" && op.category === "division") ||
      (activeTab === "advanced" && op.category === "advanced");

    const matchesSearch =
      op.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      op.symbol.toLowerCase().includes(searchFilter.toLowerCase()) ||
      op.returnRule.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16 text-slate-100">

      {/* =========================================================================
          HERO & CONCEPT OVERVIEW
      ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="animate-pulse" />
            Module 001_003 · Operators & Expressions · Topic 1
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Arithmetic Operators in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">Python</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-4xl leading-relaxed">
            Arithmetic operators form the mathematical backbone of Python. 
            Python supports seven distinct arithmetic operations ranging from basic addition and subtraction to 
            true floating-point division, integer floor division, cyclical modulus, and arbitrary-precision exponentiation.
          </p>

          {/* 3 Core Mathematical Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-sky-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">1</div>
                <h3 className="font-semibold text-slate-100 text-sm">True vs. Floor Division</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <code className="text-sky-300">/</code> always returns a <code className="text-sky-300">float</code> (even <code className="text-sky-300">4 / 2 = 2.0</code>). <code className="text-sky-300">//</code> truncates towards $-\infty$ for integer quotients.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-indigo-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">2</div>
                <h3 className="font-semibold text-slate-100 text-sm">Arbitrary Precision Exponents</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Python's <code className="text-indigo-300">**</code> operator calculates astronomical powers like <code className="text-indigo-300">2 ** 1000</code> without integer overflow.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
                <h3 className="font-semibold text-slate-100 text-sm">Operator Overloading</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <code className="text-emerald-300">+</code> and <code className="text-emerald-300">*</code> extend naturally to strings and lists for concatenation and repetition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MASTER ARITHMETIC OPERATORS REFERENCE TABLE
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2">
              <Calculator size={14} />
              The 7 Arithmetic Operators
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
              Master Arithmetic Operators Specification Table
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Complete reference of syntax, underlying dunder methods, and return type behavior.
            </p>
          </div>

          {/* Search Filter */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search operator (+, //, %)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition w-full sm:w-56"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-3">
          {[
            { id: "all", label: "All 7 Operators" },
            { id: "basic", label: "Basic Arithmetic (+, -, *)" },
            { id: "division", label: "Division & Modulo (/, //, %)" },
            { id: "advanced", label: "Power & Exponent (**)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5",
                activeTab === tab.id
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700/60"
              )}
            >
              <Filter size={12} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
          <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700 uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-3.5 px-4 w-20 text-center">Symbol</th>
                <th className="py-3.5 px-4">Operator Name</th>
                <th className="py-3.5 px-4">Internal Dunder Method</th>
                <th className="py-3.5 px-4">Return Type Rule</th>
                <th className="py-3.5 px-4">Example & Output</th>
                <th className="py-3.5 px-4">Behavioral Tip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              {filteredOperators.map((op) => (
                <tr key={op.symbol} className="hover:bg-slate-800/50 transition-colors group">
                  {/* Symbol */}
                  <td className="py-3.5 px-4 text-center">
                    <code className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono font-bold text-sky-300 text-base">
                      {op.symbol}
                    </code>
                  </td>

                  {/* Name */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100 group-hover:text-sky-300 transition">
                      {op.name}
                    </div>
                  </td>

                  {/* Dunder */}
                  <td className="py-3.5 px-4 font-mono text-xs text-indigo-300">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80">
                      {op.dunder}
                    </span>
                  </td>

                  {/* Return Rule */}
                  <td className="py-3.5 px-4 text-xs text-slate-300">
                    {op.returnRule}
                  </td>

                  {/* Example */}
                  <td className="py-3.5 px-4 font-mono text-emerald-400 text-xs font-bold whitespace-nowrap">
                    {op.example}
                  </td>

                  {/* Tip */}
                  <td className="py-3.5 px-4 text-xs text-slate-400 leading-relaxed italic">
                    {op.tip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          DEEP DIVE 1: TRUE DIVISION (/) VS. FLOOR DIVISION (//)
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-sky-400">
          <Divide size={24} />
          <h2 className="text-2xl font-bold text-slate-100">
            1. True Division (<code className="text-white">/</code>) vs. Floor Division (<code className="text-white">//</code>)
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Python 3 introduced a clean distinction between exact mathematical division and integer floor division:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* True Division Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <CheckCircle2 size={18} /> True Division (/)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Performs standard floating-point division. <strong>It ALWAYS returns a float</strong>, even when the division divides with zero remainder!
            </p>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 space-y-1">
              <div>10 / 2  → <span className="text-sky-300 font-bold">5.0</span> (Float result!)</div>
              <div>10 / 4  → <span className="text-sky-300 font-bold">2.5</span></div>
              <div>10 / 3  → <span className="text-sky-300 font-bold">3.3333333333333335</span></div>
            </div>
          </div>

          {/* Floor Division Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <AlertTriangle size={18} /> Floor Division (//) & The Negative Quirk
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Computes division and <strong>rounds down towards $-\infty$</strong> ($\lfloor x \rfloor$).
            </p>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 space-y-1">
              <div>17 // 5  → <span className="text-emerald-400 font-bold">3</span> (17/5 is 3.4 → floor is 3)</div>
              <div>-7 // 2  → <span className="text-rose-400 font-bold">-4</span> (NOT -3! -3.5 rounded down is -4)</div>
              <div>10.0 // 3 → <span className="text-amber-400 font-bold">3.0</span> (Returns float if operand is float)</div>
            </div>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# True Division vs Floor Division
print("10 / 2        =", 10 / 2)         # 5.0 (Always float)
print("17 // 5       =", 17 // 5)        # 3   (Integer floor)

# The Negative Floor Division Quirk
print("-7 / 2        =", -7 / 2)         # -3.5 (Float)
print("-7 // 2       =", -7 // 2)        # -4   (Floor towards -infinity)

# Contrast: int() truncates towards zero
print("int(-7 / 2)   =", int(-7 / 2))    # -3   (Truncates decimal part towards 0)`}
        />
      </section>

      {/* =========================================================================
          DEEP DIVE 2: THE MODULUS OPERATOR (%) & DIVISION IDENTITY
      ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 text-emerald-400">
          <Hash size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            2. The Modulus Operator (<code className="text-white">%</code>) & Division Identity
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          In Python, the modulus operator <code className="text-emerald-300">%</code> returns the remainder of division. 
          Python guarantees the fundamental mathematical division identity:
        </p>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono text-base text-emerald-300">
          a == (a // b) * b + (a % b)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-sm text-sky-300 flex items-center gap-1.5">
              <Clock size={16} /> 1. Clock / Cyclic Math
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Wrap numbers within a fixed cycle (e.g. 24-hour time or 7 days of the week):
              <code className="block mt-1 p-1 bg-slate-900 rounded font-mono text-sky-300">(current_hour + 5) % 24</code>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
              <Binary size={16} /> 2. Even / Odd Parity
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Checking if a number is divisible by 2:
              <code className="block mt-1 p-1 bg-slate-900 rounded font-mono text-emerald-300">is_even = (num % 2 == 0)</code>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-sm text-purple-300 flex items-center gap-1.5">
              <Boxes size={16} /> 3. Digit Extraction
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Extract the last digit of any integer:
              <code className="block mt-1 p-1 bg-slate-900 rounded font-mono text-purple-300">last_digit = num % 10</code>
            </p>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# Practical Use Cases of Modulus
num = 9874

# 1. Extract last digit
print("Last digit of 9874   :", num % 10)       # 4

# 2. Remove last digit using floor division
print("Without last digit   :", num // 10)      # 987

# 3. 24-Hour Railway Time Arithmetic
hour = 22  # 10:00 PM
hours_ahead = 5
new_hour = (hour + hours_ahead) % 24
print(f"{hours_ahead} hours after {hour}:00 is {new_hour}:00 (3:00 AM)")

# 4. Verifying Python's division identity
a, b = -17, 5
q = a // b
r = a % b
print(f"a = {a}, b = {b} → quotient = {q}, remainder = {r}")
print("Verification (q*b + r) :", q * b + r)    # -17`}
        />
      </section>

      {/* =========================================================================
          DEEP DIVE 3: EXPONENTIATION (**) & ROOTS
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-indigo-400">
          <Zap size={24} />
          <h2 className="text-2xl font-bold text-slate-100">
            3. Exponentiation (<code className="text-white">**</code>), Roots & Huge Powers
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Python's exponentiation operator <code className="text-indigo-300 font-bold">**</code> calculates powers with arbitrary precision and right-associativity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-sky-300">Computing Square & Cube Roots</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Any $n$-th root can be computed directly using fractional exponents (<code className="text-sky-300">x ** (1/n)</code>):
            </p>
            <div className="p-2.5 bg-slate-950 rounded font-mono text-xs text-sky-300">
              Square root: 16 ** 0.5 → 4.0<br />
              Cube root: 27 ** (1/3) → 3.0
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-indigo-300">Arbitrary Precision Powers</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlike C/Java which overflow at $2^{64}$, Python integers expand automatically to accommodate huge powers without limit:
            </p>
            <div className="p-2.5 bg-slate-950 rounded font-mono text-xs text-indigo-300">
              2 ** 100 → 1267650600228229401496703205376
            </div>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# Exponentiation & Roots
print("2 ** 8              =", 2 ** 8)            # 256
print("Square Root of 64   =", 64 ** 0.5)        # 8.0
print("Cube Root of 125    =", 125 ** (1/3))     # 5.0

# Astronomical Power with exact precision
big_power = 2 ** 64
print("2 ** 64             =", big_power)

# 3-Argument Builtin pow(base, exp, mod) for Cryptography
# Computes (base ** exp) % mod efficiently
print("pow(7, 4, 1000)     =", pow(7, 4, 1000))  # (2401) % 1000 = 401`}
        />
      </section>

      {/* =========================================================================
          DEEP DIVE 4: OPERATOR OVERLOADING ON STRINGS & LISTS
      ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 text-purple-400">
          <Code2 size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            4. Operator Overloading: <code className="text-white">+</code> & <code className="text-white">*</code> with Strings & Lists
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          In Python, operators are <strong>polymorphic</strong>. The <code className="text-purple-300">+</code> and <code className="text-purple-300">*</code> operators adapt their behavior when applied to sequence types:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-sm text-sky-300">Concatenation (+)</h4>
            <p className="text-xs text-slate-400">
              Combines two sequences of the same type together:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-xs text-sky-300">
              "Kolkata" + " Metro" → "Kolkata Metro"<br />
              [1, 2] + [3, 4] → [1, 2, 3, 4]
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-sm text-purple-300">Repetition (*)</h4>
            <p className="text-xs text-slate-400">
              Repeats a sequence $n$ times:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-xs text-purple-300">
              "=" * 10 → "=========="<br />
              [0] * 4 → [0, 0, 0, 0]
            </div>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# String & List Concatenation and Repetition
first = "Coder"
second = "AccoTax"
print("Concatenation  :", first + " & " + second)
print("Divider Line   :", "=" * 35)

# List repetition
initial_grid = [0] * 5
print("Zero Array     :", initial_grid)

# WARNING: Mutable list repetition copies references!
# [[0]*3]*3 creates 3 references to the SAME inner list!
bad_matrix = [[0] * 3] * 3
bad_matrix[0][0] = 99
print("Aliased Matrix :", bad_matrix)  # [[99,0,0], [99,0,0], [99,0,0]]!

# Proper independent matrix creation using list comprehension
good_matrix = [[0] * 3 for _ in range(3)]
good_matrix[0][0] = 99
print("Proper Matrix  :", good_matrix) # [[99,0,0], [0,0,0], [0,0,0]]`}
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
            Arithmetic Computations in Production Systems
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Practical computational models from Kolkata utility billing, university lab conversions, and warehouse logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Scenario 1: Electricity Tariff */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-300">
              <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs">Case 1</span>
              <h3 className="font-bold text-slate-100 text-base">Kolkata Electricity (CESC) Bill Calculator</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata computes her monthly residential electricity bill with fixed meter rent and GST:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Consumer: Mamata (Salt Lake, Kolkata)
units_consumed = 245
rate_per_unit = 7.25
fixed_meter_rent = 120.00
gst_percent = 5.0  # 5%

energy_charge = units_consumed * rate_per_unit
subtotal = energy_charge + fixed_meter_rent
gst_amount = subtotal * (gst_percent / 100)
total_bill = subtotal + gst_amount

print(f"Energy Charge: ₹{energy_charge:,.2f}")
print(f"Subtotal     : ₹{subtotal:,.2f}")
print(f"GST (5%)     : ₹{gst_amount:,.2f}")
print(f"Total Payable: ₹{total_bill:,.2f}")`}
            />
          </div>

          {/* Scenario 2: Warehouse Packing */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs">Case 2</span>
              <h3 className="font-bold text-slate-100 text-base">Barrackpore Warehouse: Cargo Pallet Logistics</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita packs 1,485 item packages into standard pallets holding 60 packages each:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Logistics Manager: Susmita (Barrackpore Depot)
total_packages = 1485
pallet_capacity = 60

# Floor division gives full pallets; modulus gives remaining packages
full_pallets = total_packages // pallet_capacity
loose_packages = total_packages % pallet_capacity

print(f"Full Pallets Loaded   : {full_pallets}")
print(f"Remaining Loose Items : {loose_packages}")
print(f"Verification Check    : {full_pallets * pallet_capacity + loose_packages == total_packages}")`}
            />
          </div>

        </div>
      </section>

      {/* =========================================================================
          COMMON BEGINNER TRAPS & PITFALLS
      ========================================================================= */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-semibold mb-2">
            <AlertTriangle size={14} />
            Watch Out
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Top 6 Dangerous Beginner Traps in Arithmetic
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Common mathematical misunderstandings and syntax errors to guard against.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Trap 1 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 1: / always returns Float</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              items[4 / 2] # ❌ TypeError!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              List indices must be integers. <code className="text-amber-300">4 / 2</code> evaluates to float <code className="text-amber-300">2.0</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: items[4 // 2]
            </div>
          </div>

          {/* Trap 2 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 2: -3 ** 2 is -9</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              print(-3 ** 2) # Gives -9
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              <code className="text-amber-300">**</code> has higher priority than unary minus. Evaluates as <code className="text-amber-300">-(3**2)</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: (-3) ** 2 → 9
            </div>
          </div>

          {/* Trap 3 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 3: Negative // Rounding</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              -9 // 2 # Gives -5, not -4!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Floor division rounds down towards negative infinity. <code className="text-amber-300">-4.5</code> rounded down is <code className="text-amber-300">-5</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ int(-9 / 2) for truncation
            </div>
          </div>

          {/* Trap 4 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 4: Float Precision Trap</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              0.1 + 0.2 == 0.3 # False
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Binary floating point representation causes IEEE 754 precision limits.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ math.isclose(a, b)
            </div>
          </div>

          {/* Trap 5 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 5: ZeroDivisionError</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              10 / 0  or  10 % 0
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dividing or taking modulo by zero raises a runtime exception in Python.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Guard: if b != 0: a / b
            </div>
          </div>

          {/* Trap 6 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 6: List Multiplication Aliasing</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              [[0]*3]*3 # Shared lists!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multiplying a list containing mutable objects creates duplicate references to the same object.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ [[0]*3 for _ in range(3)]
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TEACHER'S NOTE
      ========================================================================= */}
      <section className="space-y-4">
        <Teacher
          note="Always remember the distinction between / and //: single slash / gives the true mathematical float quotient, while double slash // gives the integer floor quotient. When indexing collections or managing loops, always use // to avoid TypeError. For power calculations, Python's ** operator handles integers of any size with exact precision without overflow."
        />
      </section>

      {/* =========================================================================
          SUMMARY CHECKLIST
      ========================================================================= */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" />
          Summary & Key Takeaways Checklist
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span>Python provides <strong>7 arithmetic operators</strong>: <code>+, -, *, /, //, %, **</code>.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>True division <code>/</code></strong> always returns a float (<code>10 / 2 = 5.0</code>).</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Floor division <code>//</code></strong> truncates towards negative infinity (<code>-7 // 2 = -4</code>).</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Modulus <code>%</code></strong> satisfies <code>a == (a // b) * b + (a % b)</code>.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Exponentiation <code>**</code></strong> supports arbitrary precision integers without overflow.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong><code>+</code> and <code>*</code></strong> are overloaded on strings and lists for concatenation/repetition.</span>
          </li>
        </ul>
      </section>

    </div>
  );
}
