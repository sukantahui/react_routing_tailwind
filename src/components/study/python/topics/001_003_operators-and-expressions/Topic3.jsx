import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";
import Teacher from "../../../../../common/TeacherSukantaHui";
import {
  Scale,
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
  Search,
  Binary,
  Cpu,
  Fingerprint,
  FileText,
  Filter,
  Check,
  X
} from "lucide-react";

export default function Topic3() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");

  // Detailed Comparison Operators Table Data
  const comparisonOperators = [
    {
      symbol: "==",
      name: "Equal To",
      mathSymbol: "=",
      dunder: "__eq__(other)",
      description: "Returns True if the values of both operands are equal in content.",
      trueCase: "10 == 10.0",
      falseCase: "10 == '10'",
      tip: "Cross-type numeric equality works (10 == 10.0), but string vs number is always False.",
      category: "equality"
    },
    {
      symbol: "!=",
      name: "Not Equal To",
      mathSymbol: "≠",
      dunder: "__ne__(other)",
      description: "Returns True if the values of both operands are different.",
      trueCase: "10 != 20",
      falseCase: "5 != 5.0",
      tip: "Exact opposite of ==. Never use &lt;&gt; (deprecated in Python 3).",
      category: "equality"
    },
    {
      symbol: ">",
      name: "Strictly Greater Than",
      mathSymbol: ">",
      dunder: "__gt__(other)",
      description: "Returns True if left operand is strictly greater in value than right operand.",
      trueCase: "25 > 18",
      falseCase: "18 > 18",
      tip: "Equal values return False. For equality inclusion, use >=.",
      category: "relational"
    },
    {
      symbol: "<",
      name: "Strictly Less Than",
      mathSymbol: "<",
      dunder: "__lt__(other)",
      description: "Returns True if left operand is strictly smaller in value than right operand.",
      trueCase: "15 < 30",
      falseCase: "30 < 30",
      tip: "Used extensively in sorting algorithms and loop boundary conditions.",
      category: "relational"
    },
    {
      symbol: ">=",
      name: "Greater Than or Equal To",
      mathSymbol: "≥",
      dunder: "__ge__(other)",
      description: "Returns True if left operand is either greater than OR equal to right operand.",
      trueCase: "18 >= 18",
      falseCase: "17 >= 18",
      tip: "Equivalent to (a > b) or (a == b). Highly common in age and score thresholds.",
      category: "relational"
    },
    {
      symbol: "<=",
      name: "Less Than or Equal To",
      mathSymbol: "≤",
      dunder: "__le__(other)",
      description: "Returns True if left operand is either smaller than OR equal to right operand.",
      trueCase: "50 <= 50",
      falseCase: "51 <= 50",
      tip: "Equivalent to (a < b) or (a == b). Common for upper limits and index bounds.",
      category: "relational"
    }
  ];

  const filteredOperators = comparisonOperators.filter((op) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "equality" && op.category === "equality") ||
      (activeTab === "relational" && op.category === "relational");

    const matchesSearch =
      op.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      op.symbol.toLowerCase().includes(searchFilter.toLowerCase()) ||
      op.description.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16 text-slate-100">

      {/* =========================================================================
          HERO & ROADMAP SECTION
      ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="animate-pulse" />
            Module 001_003 · Operators & Expressions · Topic 3
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Comparison <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">(Relational) Operators</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-4xl leading-relaxed">
            Comparison (relational) operators allow your Python programs to test relationships between two values. 
            Every comparison operation evaluates to a strict boolean result: either <code className="text-emerald-400 font-bold">True</code> or <code className="text-rose-400 font-bold">False</code>. 
            They are the fundamental building blocks of decision-making (<code className="text-sky-300">if/elif/else</code>), data filtering, sorting, and loop terminations.
          </p>

          {/* 3 Core Conceptual Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">1</div>
                <h3 className="font-semibold text-slate-100 text-sm">Boolean Outcome</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comparisons always yield <code className="text-emerald-300">True</code> or <code className="text-rose-300">False</code>. In Python, <code className="text-slate-200">bool</code> is a subclass of <code className="text-slate-200">int</code> (<code className="text-emerald-300">True == 1</code>, <code className="text-rose-300">False == 0</code>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-sky-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">2</div>
                <h3 className="font-semibold text-slate-100 text-sm">Chained Comparisons</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Python uniquely supports chained expressions like <code className="text-sky-300">10 &lt; x &lt; 50</code>, evaluating each middle operand once with natural short-circuiting.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-purple-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">3</div>
                <h3 className="font-semibold text-slate-100 text-sm">Strict Type Safety</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unlike JavaScript, Python prevents accidental type coercion. <code className="text-purple-300">5 &lt; "10"</code> raises a clean <code className="text-rose-400">TypeError</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MASTER COMPARISON OPERATORS REFERENCE TABLE
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
              <Scale size={14} />
              The 6 Relational Operators
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
              Master Comparison Operators Reference Table
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Complete specification, underlying dunder methods, and evaluation rules.
            </p>
          </div>

          {/* Search Filter */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Filter by symbol or name..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition w-full sm:w-56"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-3">
          {[
            { id: "all", label: "All 6 Operators" },
            { id: "equality", label: "Equality Operators (==, !=)" },
            { id: "relational", label: "Relational Operators (<, <=, >, >=)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5",
                activeTab === tab.id
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
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
          <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700 uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-3.5 px-4 w-20 text-center">Symbol</th>
                <th className="py-3.5 px-4">Operator Name</th>
                <th className="py-3.5 px-4">Internal Dunder Method</th>
                <th className="py-3.5 px-4">Evaluates True When</th>
                <th className="py-3.5 px-4">Evaluates False When</th>
                <th className="py-3.5 px-4">Behavioral Tip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              {filteredOperators.map((op) => (
                <tr key={op.symbol} className="hover:bg-slate-800/50 transition-colors group">
                  {/* Symbol */}
                  <td className="py-3.5 px-4 text-center">
                    <code className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono font-bold text-emerald-400 text-sm">
                      {op.symbol}
                    </code>
                  </td>

                  {/* Name */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100 group-hover:text-emerald-300 transition">
                      {op.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Math: {op.mathSymbol}
                    </div>
                  </td>

                  {/* Dunder */}
                  <td className="py-3.5 px-4 font-mono text-xs text-sky-300">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80">
                      {op.dunder}
                    </span>
                  </td>

                  {/* True Case */}
                  <td className="py-3.5 px-4 font-mono text-emerald-400 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-400 shrink-0" />
                      <span>{op.trueCase}</span>
                    </div>
                  </td>

                  {/* False Case */}
                  <td className="py-3.5 px-4 font-mono text-rose-400 text-xs">
                    <div className="flex items-center gap-1.5">
                      <X size={14} className="text-rose-400 shrink-0" />
                      <span>{op.falseCase}</span>
                    </div>
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
          DEEP EXPLANATION SECTION 1: HOW PYTHON EVALUATES COMPARISONS UNDER THE HOOD
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-sky-400">
          <Cpu size={24} />
          <h2 className="text-2xl font-bold text-slate-100">
            1. Under the Hood: Python Data Model & Special Methods (Dunder Methods)
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          When you write <code className="text-sky-300">a == b</code> or <code className="text-sky-300">a &lt; b</code>, Python doesn't use hardcoded low-level assembly checks. 
          Instead, it delegates the operation to <strong>special double-underscore (dunder) methods</strong> defined on the left object's class.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <Code2 size={18} /> The Dunder Dispatch Mechanism
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When Python evaluates <code className="text-emerald-300">a == b</code>, it performs the following steps:
            </p>
            <ol className="text-xs text-slate-400 space-y-1.5 list-decimal pl-4">
              <li>Python calls <code className="text-sky-300">type(a).__eq__(a, b)</code>.</li>
              <li>If the method returns <code className="text-amber-300">NotImplemented</code>, Python flips the call and asks <code className="text-sky-300">type(b).__eq__(b, a)</code>.</li>
              <li>If both return <code className="text-amber-300">NotImplemented</code>, Python falls back to comparing object memory identity (<code className="text-sky-300">id(a) == id(b)</code>).</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <Layers size={18} /> Strict Type Checking in Python 3
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlike JavaScript or Python 2, Python 3 enforces <strong>strict type comparison</strong> for relational operators (<code className="text-purple-300">&lt;, &lt;=, &gt;, &gt;=</code>):
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><code className="text-emerald-300">10 == "10"</code> evaluates safely to <code className="text-rose-400 font-bold">False</code> (different types cannot be equal).</li>
              <li><code className="text-rose-400">10 &lt; "20"</code> raises <code className="text-rose-400 font-bold">TypeError: '&lt;' not supported between instances of 'int' and 'str'</code>.</li>
            </ul>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# Dunder Method Invocation & Type Safety
x = 100
y = 100.0

# Behind the scenes, x.__eq__(y) is called
print("x == y              :", x == y)             # True (numeric coercion across int/float)
print("x.__eq__(y)         :", x.__eq__(y))        # True

# Equality between different data types
print("100 == '100'        :", 100 == "100")       # False (Safe)

# Relational comparison with incompatible type raises TypeError
try:
    print(100 < "200")
except TypeError as e:
    print("Caught expected TypeError:", e)`}
        />
      </section>

      {/* =========================================================================
          DEEP EXPLANATION SECTION 2: FLOATING POINT COMPARISONS & IEEE 754 PRECISION
      ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 text-amber-400">
          <AlertTriangle size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            2. The Floating-Point Equality Trap (IEEE 754 Representation)
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          In computer science, floating-point numbers are represented in binary (base-2) IEEE 754 format. 
          Numbers like <code className="text-amber-300">0.1</code> and <code className="text-amber-300">0.2</code> cannot be stored with exact finite binary precision (similar to how $1/3$ is infinite $0.333...$ in base-10).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-2">
            <h4 className="font-bold text-sm text-rose-400 flex items-center gap-2">
              <X size={16} /> Dangerous: Direct Float Equality (==)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300">0.1 + 0.2 == 0.3</code> produces <code className="text-rose-400 font-bold">False</code> because <code className="text-rose-300">0.1 + 0.2</code> is internally <code className="text-amber-300">0.30000000000000004</code>!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              <Check size={16} /> Professional Solution: math.isclose()
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Always use Python's built-in <code className="text-emerald-300">math.isclose(a, b)</code> or check if the difference is within a tiny tolerance (<code className="text-emerald-300">abs(a - b) &lt; 1e-9</code>).
            </p>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`import math

a = 0.1 + 0.2
b = 0.3

print("Calculated a      :", f"{a:.20f}")  # 0.30000000000000004441
print("Target b          :", f"{b:.20f}")  # 0.29999999999999998890

# ❌ BAD: Direct equality fails
print("a == b            :", a == b)  # False!

# ✔ GOOD: math.isclose checks relative tolerance
print("math.isclose(a, b):", math.isclose(a, b))  # True`}
        />
      </section>

      {/* =========================================================================
          DEEP EXPLANATION SECTION 3: STRING LEXICOGRAPHICAL & UNICODE COMPARISONS
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-emerald-400">
          <BookOpen size={24} />
          <h2 className="text-2xl font-bold text-slate-100">
            3. String Comparison & Lexicographical (Unicode) Ordering
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          When comparing strings with <code className="text-emerald-300">&lt;, &lt;=, &gt;, &gt;=</code>, Python does not compare word lengths. 
          It compares strings <strong>character-by-character from left to right using their Unicode code points</strong> (<code className="text-sky-300">ord()</code>).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-sky-300">1. Alphabetical Order</h4>
            <p className="text-xs text-slate-400">
              <code className="text-emerald-300">"apple" &lt; "banana"</code> is <strong className="text-emerald-400">True</strong> because <code className="text-sky-300">ord('a') = 97</code> &lt; <code className="text-sky-300">ord('b') = 98</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-amber-300">2. Uppercase vs. Lowercase</h4>
            <p className="text-xs text-slate-400">
              All uppercase letters (<code className="text-amber-300">A-Z: 65-90</code>) come BEFORE lowercase letters (<code className="text-amber-300">a-z: 97-122</code>).
              Hence, <code className="text-emerald-300">"Zebra" &lt; "apple"</code> is <strong className="text-emerald-400">True</strong>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-rose-300">3. Numeric String Gotcha</h4>
            <p className="text-xs text-slate-400">
              <code className="text-emerald-300">"100" &lt; "20"</code> is <strong className="text-emerald-400">True</strong> because '1' (code 49) comes before '2' (code 50)! Convert strings to <code className="text-sky-300">int()</code> before comparing numbers.
            </p>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# String Unicode Code Point Comparisons
print("'apple' < 'banana' :", "apple" < "banana")  # True ('a' < 'b')
print("'Zebra' < 'apple'  :", "Zebra" < "apple")   # True (ASCII 90 < 97)

# Inspecting character codes using ord()
print("ord('Z') =", ord('Z'), "| ord('a') =", ord('a'))

# Case-insensitive comparison using .casefold() or .lower()
city1 = "Kolkata"
city2 = "kolkata"
print("Direct ==         :", city1 == city2)                  # False
print("Casefold ==       :", city1.casefold() == city2.casefold())  # True

# Numeric string pitfall
print("'100' < '20'       :", "100" < "20")         # True (String comparison!)
print("int('100') < int('20'):", int("100") < int("20")) # False (Proper integer comparison)`}
        />
      </section>

      {/* =========================================================================
          DEEP EXPLANATION SECTION 4: PYTHON'S CHAINED COMPARISONS
      ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 text-cyan-400">
          <Layers size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            4. Chained Comparisons & Execution Mechanics
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Python allows expressions with multiple comparison operators chained together in a natural mathematical style. 
          Internally, Python expands <code className="text-cyan-300">a &lt; b &lt; c</code> into <code className="text-emerald-400">(a &lt; b) and (b &lt; c)</code>, 
          with two vital guarantees:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-cyan-300 font-sans block text-sm">1. Single Evaluation Guarantee:</strong>
            <p className="text-slate-400 leading-relaxed">
              The middle expression <code className="text-cyan-300">b</code> is evaluated <strong>exactly once</strong>, even if it is an expensive function call like <code className="text-cyan-300">fetch_score()</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-emerald-300 font-sans block text-sm">2. Natural Short-Circuiting:</strong>
            <p className="text-slate-400 leading-relaxed">
              If the first comparison (<code className="text-emerald-300">a &lt; b</code>) evaluates to <code className="text-rose-400">False</code>, the subsequent comparisons are <strong>never evaluated</strong>!
            </p>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# Chained Comparisons
score = 85

# Checking range [80, 90)
if 80 <= score < 90:
    print("Grade: A (Very Good)")

# Function side-effect guarantee (get_val is called ONLY ONCE!)
call_count = 0
def get_val():
    global call_count
    call_count += 1
    return 15

# Evaluates 10 < get_val() and get_val() < 20
if 10 < get_val() < 20:
    print(f"Condition True! get_val() was invoked {call_count} time(s).")`}
        />
      </section>

      {/* =========================================================================
          DEEP EXPLANATION SECTION 5: SEQUENCE & CONTAINER COMPARISONS
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-purple-400">
          <Fingerprint size={24} />
          <h2 className="text-2xl font-bold text-slate-100">
            5. Comparing Lists, Tuples, Sets & Dictionaries
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Comparison operators extend naturally beyond numbers and strings to Python's data structures:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-sky-300">Lists & Tuples</h4>
            <p className="text-xs text-slate-400">
              Compared element-by-element from index 0. First differing element determines the result.
            </p>
            <div className="p-2 bg-slate-950 rounded font-mono text-xs text-emerald-400">
              [1, 2, 5] &gt; [1, 2, 4] → True<br />
              (1, 2) &lt; (1, 2, 0) → True
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-purple-300">Sets (Subset / Superset)</h4>
            <p className="text-xs text-slate-400">
              <code className="text-purple-300">&lt;</code> means strict subset; <code className="text-purple-300">&gt;</code> means strict superset.
            </p>
            <div className="p-2 bg-slate-950 rounded font-mono text-xs text-emerald-400">
              {`{1, 2} < {1, 2, 3}`} → True<br />
              {`{1, 2} <= {1, 2}`} → True
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-amber-300">Dictionaries</h4>
            <p className="text-xs text-slate-400">
              Only <code className="text-amber-300">==</code> and <code className="text-amber-300">!=</code> are supported. Relational operators (&lt;, &gt;) raise TypeError.
            </p>
            <div className="p-2 bg-slate-950 rounded font-mono text-xs text-emerald-400">
              {`{"a": 1} == {"a": 1}`} → True
            </div>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# Comparing Tuples (e.g. Version numbers or Dates)
version_a = (3, 11, 4)
version_b = (3, 12, 0)

print("version_a < version_b :", version_a < version_b)  # True (3.11 < 3.12)

# Comparing Sets (Subset / Superset)
required_skills = {"python", "sql"}
mamata_skills = {"python", "sql", "react", "fastapi"}

print("Has all required skills:", required_skills <= mamata_skills) # True`}
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
            Relational Logic in Production Software
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real-world examples from university admissions, metro transit, and commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Scenario 1 */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-300">
              <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs">Case 1</span>
              <h3 className="font-bold text-slate-100 text-base">Jadavpur University: Scholarship & Rank Filter</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluating student Mamata's eligibility based on score brackets:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Student: Mamata (Jadavpur University CS Department)
cgpa = 9.2
attendance_percent = 92.5
backlogs = 0

# Chained and Relational Criteria
is_scholarship_eligible = (cgpa >= 9.0) and (attendance_percent >= 85.0) and (backlogs == 0)

if is_scholarship_eligible:
    print("Mamata is eligible for the Merit-cum-Means Scholarship!")
else:
    print("Criteria not met.")`}
            />
          </div>

          {/* Scenario 2 */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs">Case 2</span>
              <h3 className="font-bold text-slate-100 text-base">Kolkata Metro: Smart Card Fare Gate Validator</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu taps his Metro card at Dum Dum station:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Commuter: Debangshu (Dum Dum to Esplanade)
card_balance = 45.00
min_gate_balance = 20.00
journey_fare = 15.00

# Gate opens if card balance is greater than or equal to minimum required balance
gate_open = card_balance >= min_gate_balance

if gate_open:
    card_balance -= journey_fare
    print(f"Gate Opened! Travel Safe. Remaining Balance: ₹{card_balance:.2f}")
else:
    print("Gate Locked: Low balance. Please recharge your card.")`}
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
            Top 6 Dangerous Beginner Traps in Comparison Operators
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Carefully review these frequent mistakes that lead to silent bugs and interview mistakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Trap 1 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 1: = vs ==</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              if x = 10: # SyntaxError
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              <code className="text-amber-300">=</code> is assignment, while <code className="text-amber-300">==</code> is equality comparison.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: if x == 10:
            </div>
          </div>

          {/* Trap 2 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 2: Float 0.1+0.2 == 0.3</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              0.1 + 0.2 == 0.3 # False
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Binary floating-point arithmetic precision differences make exact float equality unreliable.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ math.isclose(a, b)
            </div>
          </div>

          {/* Trap 3 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 3: String Number Ordering</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              "100" &lt; "20" # True!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Strings compare character-by-character (<code className="text-amber-300">'1' &lt; '2'</code>), not by numeric magnitude!
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ int(s1) &lt; int(s2)
            </div>
          </div>

          {/* Trap 4 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 4: Comparing with True/False</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              if is_valid == True:
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Redundant and unpythonic. Also fails if <code className="text-amber-300">is_valid</code> is a truthy value like <code className="text-amber-300">"hello"</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: if is_valid:
            </div>
          </div>

          {/* Trap 5 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 5: None Equality vs Identity</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              if result == None:
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              PEP 8 requires checking singleton objects like <code className="text-amber-300">None</code> using the <code className="text-amber-300">is</code> operator.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: if result is None:
            </div>
          </div>

          {/* Trap 6 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 6: Incompatible Type Ordering</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              [1, 2] &lt; 5 # TypeError
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Relational ordering between fundamentally different non-numeric types raises a runtime <code className="text-amber-300">TypeError</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Compare matching types
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TEACHER'S NOTE
      ========================================================================= */}
      <section className="space-y-4">
        <Teacher
          note="Mastering comparison operators is about understanding data types and precision. Always remember: 1) Python allows chaining like 10 < x < 20 which is both elegant and efficient; 2) For floating-point calculations, avoid direct == checks and rely on math.isclose(); 3) When checking for None, always use 'is None' and 'is not None'; 4) Strings compare by Unicode codes (ASCII), so always normalize casing with .casefold() when matching user input."
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
            <span>Python provides <strong>6 comparison operators</strong>: <code>==, !=, &lt;, &gt;, &lt;=, &gt;=</code>.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span>All comparison operations strictly evaluate to boolean <strong><code>True</code></strong> or <strong><code>False</code></strong>.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Chained comparisons</strong> (<code>10 &lt; x &lt; 20</code>) evaluate middle operands once.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span>Use <strong><code>math.isclose()</code></strong> for float equality checks (<code>0.1 + 0.2 == 0.3</code> is False).</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span>Strings compare <strong>lexicographically</strong> by Unicode code points (<code>ord()</code>).</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span>Always use <strong><code>x is None</code></strong> instead of <code>x == None</code> (PEP 8 standard).</span>
          </li>
        </ul>
      </section>

    </div>
  );
}
