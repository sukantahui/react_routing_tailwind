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
  Table as TableIcon,
  Compass,
  Filter
} from "lucide-react";

export default function Topic5() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Master Operator Precedence & Associativity Data
  const operatorTable = [
    {
      level: 1,
      name: "Parentheses, Indexing & Calls",
      category: "primary",
      symbols: "( ), [ ], { }, ., f( )",
      associativity: "L → R",
      assocType: "left",
      description: "Grouping, function calls, attribute access, indexing & slicing",
      example: "(5 + 3) * 2 → 16",
      tip: "Highest priority. Always forces immediate inner evaluation."
    },
    {
      level: 2,
      name: "Exponentiation (Power)",
      category: "arithmetic",
      symbols: "**",
      associativity: "R → L",
      assocType: "right",
      description: "Raises left operand to the power of right operand",
      example: "2 ** 3 ** 2 → 512 (2 ** 9)",
      tip: "Right-associative! Evaluates from right to left."
    },
    {
      level: 3,
      name: "Unary Positive, Negative & Bitwise Inversion",
      category: "arithmetic",
      symbols: "+x, -x, ~x",
      associativity: "R → L",
      assocType: "right",
      description: "Positive sign, negative sign, and bitwise bit-flip (NOT)",
      example: "-3 ** 2 → -9 (-(3**2))",
      tip: "** has higher precedence than unary minus! Use (-3)**2 for 9."
    },
    {
      level: 4,
      name: "Multiplication, Division, Floor Div & Modulo",
      category: "arithmetic",
      symbols: "*, /, //, %",
      associativity: "L → R",
      assocType: "left",
      description: "Multiplication, true float division, integer floor division, remainder",
      example: "100 / 10 * 2 → 20.0",
      tip: "Equal precedence; executed left-to-right in order of appearance."
    },
    {
      level: 5,
      name: "Addition & Subtraction",
      category: "arithmetic",
      symbols: "+, -",
      associativity: "L → R",
      assocType: "left",
      description: "Standard binary arithmetic addition and subtraction",
      example: "50 - 20 + 5 → 35",
      tip: "Executed left-to-right: (50 - 20) + 5 = 35."
    },
    {
      level: 6,
      name: "Bitwise Shift Operators",
      category: "bitwise",
      symbols: "<<, >&gt;",
      associativity: "L → R",
      assocType: "left",
      description: "Bitwise left shift (multiply by 2^n) and right shift (divide by 2^n)",
      example: "4 << 2 + 1 → 32 (4 << 3)",
      tip: "+ and - happen BEFORE shift operators!"
    },
    {
      level: 7,
      name: "Bitwise AND",
      category: "bitwise",
      symbols: "&",
      associativity: "L → R",
      assocType: "left",
      description: "Bitwise AND between binary representations of integers",
      example: "12 & 10 → 8",
      tip: "Higher precedence than bitwise XOR and OR."
    },
    {
      level: 8,
      name: "Bitwise XOR",
      category: "bitwise",
      symbols: "^",
      associativity: "L → R",
      assocType: "left",
      description: "Bitwise exclusive OR (1 if bits differ, 0 if same)",
      example: "12 ^ 10 → 6",
      tip: "Between bitwise AND and bitwise OR in priority."
    },
    {
      level: 9,
      name: "Bitwise OR",
      category: "bitwise",
      symbols: "|",
      associativity: "L → R",
      assocType: "left",
      description: "Bitwise inclusive OR (1 if any bit is 1)",
      example: "12 | 10 → 14",
      tip: "Lower priority than & and ^, but higher than comparisons."
    },
    {
      level: 10,
      name: "Comparisons, Identity & Membership",
      category: "comparison",
      symbols: "<, <=, >, &ge; , ==, !=, is, is not, in, not in",
      associativity: "Chained (L → R)",
      assocType: "chain",
      description: "Relational comparisons, object identity, and collection membership",
      example: "10 < x < 30 → (10 < x) and (x < 30)",
      tip: "Special Python feature: Chained comparisons evaluate each middle operand once!"
    },
    {
      level: 11,
      name: "Boolean / Logical NOT",
      category: "logical",
      symbols: "not",
      associativity: "R → L",
      assocType: "right",
      description: "Inverts boolean truth value (True → False, False → True)",
      example: "not 5 > 3 → False (not True)",
      tip: "Highest priority among logical operators. Binds tighter than 'and' & 'or'."
    },
    {
      level: 12,
      name: "Boolean / Logical AND",
      category: "logical",
      symbols: "and",
      associativity: "L → R",
      assocType: "left",
      description: "Returns first falsy value or last truthy value (short-circuits)",
      example: "True or False and False → True",
      tip: "Evaluated BEFORE 'or'! Short-circuits if first operand is falsy."
    },
    {
      level: 13,
      name: "Boolean / Logical OR",
      category: "logical",
      symbols: "or",
      associativity: "L → R",
      assocType: "left",
      description: "Returns first truthy value or last falsy value (short-circuits)",
      example: "10 or 20 and 0 → 10",
      tip: "Lowest priority among boolean operators. Short-circuits if first is truthy."
    },
    {
      level: 14,
      name: "Conditional Expression (Ternary)",
      category: "conditional",
      symbols: "x if condition else y",
      associativity: "R → L",
      assocType: "right",
      description: "Inline conditional branch returning x if True else y",
      example: "'Adult' if age &ge; 18 else 'Minor'",
      tip: "Right-associative when nested: a if c1 else (b if c2 else c)."
    },
    {
      level: 15,
      name: "Lambda Expression",
      category: "assignment",
      symbols: "lambda args: expr",
      associativity: "R → L",
      assocType: "right",
      description: "Anonymous inline function creation",
      example: "sq = lambda x: x ** 2",
      tip: "Binds weakly to allow entire remaining expression as the body."
    },
    {
      level: 16,
      name: "Assignment & Augmented Assignment",
      category: "assignment",
      symbols: "=, +=, -=, *=, /=, //=, %=, **=, :=",
      associativity: "R → L",
      assocType: "right",
      description: "Stores values into variables, compound updates & walrus operator",
      example: "a = b = c = 100",
      tip: "Lowest priority. Evaluates right side completely before assigning."
    }
  ];

  const filteredOperators = operatorTable.filter((op) => {
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "arithmetic" && (op.category === "arithmetic" || op.category === "primary")) ||
      (activeCategory === "bitwise" && op.category === "bitwise") ||
      (activeCategory === "comparison" && (op.category === "comparison" || op.category === "logical")) ||
      (activeCategory === "assignment" && (op.category === "assignment" || op.category === "conditional"));

    const matchesSearch =
      op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.symbols.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16 text-slate-100">

      {/* =========================================================================
          HERO & INTRODUCTORY SECTION
      ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="animate-pulse" />
            Module 001_003 · Operators & Expressions · Topic 5
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Operator Precedence & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">Associativity</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-4xl leading-relaxed">
            When Python encounters a complex mathematical or logical expression containing multiple operators, 
            it does not guess or calculate haphazardly. It follows a rigorous mathematical protocol called 
            <strong> Operator Precedence</strong> (binding priority) and <strong>Associativity</strong> (direction of grouping). 
            Mastering these rules is the difference between writing robust, production-ready algorithms and hunting silent numerical bugs.
          </p>

          {/* Quick Concept Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-sky-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">1</div>
                <h3 className="font-semibold text-slate-100 text-sm">Precedence (Priority)</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Determines <em>which operator binds tighter</em> when two <strong>different</strong> operators compete for an operand (e.g. <code className="text-sky-300">10 + 5 * 2</code>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-amber-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">2</div>
                <h3 className="font-semibold text-slate-100 text-sm">Associativity (Direction)</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Determines <em>which direction</em> operations group when two operators have the <strong>SAME</strong> precedence level (Left-to-Right vs Right-to-Left).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
                <h3 className="font-semibold text-slate-100 text-sm">Parentheses Rule</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Grouping with <code className="text-emerald-300">( )</code> has supreme authority, overriding all natural precedence and making expressions crystal clear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE QUIZ / BRAIN TEASER
      ========================================================================= */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-amber-400">
          <HelpCircle size={22} />
          <h2 className="text-lg font-semibold text-slate-100">Brain Teaser: Can You Predict the Outputs?</h2>
        </div>
        <p className="text-slate-300 text-sm">
          Look closely at these four classic Python evaluation traps. Test your mental model before looking at the table below!
        </p>

        <EditablePythonCodeBlock
          initialCode={`# Trap 1: Exponentiation Associativity (Right-to-Left)
print("2 ** 3 ** 2  =", 2 ** 3 ** 2)    # Is it 64 or 512?

# Trap 2: Unary Minus vs Exponentiation Priority
print("-3 ** 2       =", -3 ** 2)       # Is it 9 or -9?

# Trap 3: Logical Hierarchy (not > and &gt; or)
print("True or False and False =", True or False and False) # Is it False or True?

# Trap 4: Subtraction Associativity (Left-to-Right)
print("100 - 30 - 20 =", 100 - 30 - 20) # Is it 90 or 50?`}
        />
      </section>

      {/* =========================================================================
          THE MASTER OPERATOR PRECEDENCE & ASSOCIATIVITY CHART (MAIN FEATURE)
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
              <TableIcon size={14} />
              Complete Python 3.12+ Reference
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
              The Master Operator Precedence & Associativity Chart
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Ranked from <strong>Highest Priority (Level 1)</strong> at top to <strong>Lowest Priority (Level 16)</strong> at bottom.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Search operator (e.g. **, not, &)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition w-full sm:w-56"
            /&gt;
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-800 pb-3">
          {[
            { id: "all", label: "All Operators (16 Levels)" },
            { id: "arithmetic", label: "Arithmetic & Exponents" },
            { id: "comparison", label: "Comparisons & Logic" },
            { id: "bitwise", label: "Bitwise Operations" },
            { id: "assignment", label: "Assignment & Ternary" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={clsx(
                "px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5",
                activeCategory === tab.id
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60"
              )}
            &gt;
              <Filter size={12} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* The Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
          <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700 uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Operator Symbols</th>
                <th className="py-3.5 px-4">Category & Description</th>
                <th className="py-3.5 px-4 w-36 text-center">Associativity</th>
                <th className="py-3.5 px-4">Evaluation Example & Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              {filteredOperators.map((op) => (
                <tr
                  key={op.level}
                  className="hover:bg-slate-800/50 transition-colors group"
                >
                  {/* Rank */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={clsx(
                        "inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold font-mono",
                        op.level <= 3
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : op.level <= 6
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : op.level <= 10
                          ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                          : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      )}
                    >
                      {op.level}
                    </span>
                  </td>

                  {/* Symbols */}
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-300 whitespace-nowrap">
                    <code className="px-2 py-1 rounded bg-slate-800 border border-slate-700/80 text-sky-300 text-xs">
                      {op.symbols}
                    </code>
                  </td>

                  {/* Category & Description */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100 group-hover:text-sky-300 transition">
                      {op.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {op.description}
                    </div>
                  </td>

                  {/* Associativity Badge */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={clsx(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-mono tracking-tight",
                        op.assocType === "right"
                          ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                          : op.assocType === "chain"
                          ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                          : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                      )}
                    >
                      {op.assocType === "right" ? (
                        <ArrowRight size={12} className="rotate-180 text-rose-400" />
                      ) : (
                        <ArrowRight size={12} className="text-cyan-400" />
                      )}
                      {op.associativity}
                    </span>
                  </td>

                  {/* Example & Tip */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-xs text-emerald-400 bg-slate-950/60 px-2 py-1 rounded inline-block border border-slate-800">
                      {op.example}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 italic">
                      {op.tip}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Left-to-Right (L → R)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Right-to-Left (R → L)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Comparison Chaining
            </span>
          </div>
          <span>Showing {filteredOperators.length} of 16 levels</span>
        </div>
      </section>

      {/* =========================================================================
          DEEP DIVE: PRECEDENCE VS ASSOCIATIVITY
      ========================================================================= */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <Scale size={24} />
          Precedence vs. Associativity: The Crucial Difference
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Precedence */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-sky-500/40 transition">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 text-xs font-semibold">
              <Zap size={14} /> Rule 1: Precedence (Tie-Breaker between DIFFERENT operators)
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              Who binds first?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When an operand is surrounded by <strong>two different operators</strong>, precedence decides which operator captures the operand.
            </p>

            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-sky-300 border border-slate-800">
              Expression: 10 + 5 * 2<br />
              • Multiplication (*) has Level 4 priority.<br />
              • Addition (+) has Level 5 priority.<br />
              • 5 * 2 evaluates first to 10 → 10 + 10 = 20.
            </div>
          </div>

          {/* Card 2: Associativity */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-500/40 transition">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-semibold">
              <Compass size={14} /> Rule 2: Associativity (Tie-Breaker between EQUAL operators)
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              Which direction do we travel?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When an expression contains <strong>multiple operators of identical precedence</strong>, associativity decides whether evaluation proceeds from Left-to-Right (<code className="text-amber-300">L → R</code>) or Right-to-Left (<code className="text-amber-300">R → L</code>).
            </p>

            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
              Expression: 100 - 40 - 10<br />
              • Both subtractions (-) have identical Level 5 priority.<br />
              • Subtraction is Left-to-Right associative.<br />
              • (100 - 40) evaluates first to 60 → 60 - 10 = 50.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DEEP DIVE: THE FAMOUS RIGHT-TO-LEFT (R → L) OPERATORS
      ========================================================================= */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-semibold mb-2">
            <AlertTriangle size={14} />
            High-Frequency Interview & Exam Trap
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            The Right-to-Left (<span className="text-rose-400">R → L</span>) Associative Operators
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Most operators in Python are Left-to-Right. Only a few special operators evaluate from Right-to-Left. Memorize these carefully!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 1. Exponentiation */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs">A</span>
              Exponentiation (**): Right-to-Left
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When multiple <code className="text-sky-300">**</code> are chained, Python evaluates the <strong>rightmost exponent first</strong>:
            </p>

            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs border border-slate-800 space-y-1 text-slate-300">
              <div><span className="text-slate-500"># Expression:</span> 2 ** 3 ** 2</div>
              <div className="text-amber-400">Step 1: 3 ** 2 = 9 (Rightmost power)</div>
              <div className="text-emerald-400">Step 2: 2 ** 9 = 512</div>
              <div className="text-rose-400/80">❌ NOT (2 ** 3) ** 2 = 8 ** 2 = 64</div>
            </div>

            <EditablePythonCodeBlock
              initialCode={`# Exponentiation Right-Associativity
result_default = 2 ** 3 ** 2
print("2 ** 3 ** 2           =", result_default)  # 512

# To force left evaluation, use parentheses:
result_forced = (2 ** 3) ** 2
print("(2 ** 3) ** 2         =", result_forced)   # 64`}
            />
          </div>

          {/* 2. Unary vs Exponentiation Trap */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs">B</span>
              Unary Minus vs Exponentiation: -3 ** 2
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In Python, <code className="text-rose-300">**</code> has <strong>higher precedence</strong> than unary minus (<code className="text-rose-300">-x</code>). 
              Therefore, <code className="text-rose-300">-3 ** 2</code> is parsed as <code className="text-rose-300">-(3 ** 2)</code>!
            </p>

            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs border border-slate-800 space-y-1 text-slate-300">
              <div><span className="text-slate-500"># Expression:</span> -3 ** 2</div>
              <div className="text-amber-400">Step 1: 3 ** 2 = 9 (Exponentiation first!)</div>
              <div className="text-emerald-400">Step 2: Apply unary minus → -9</div>
              <div className="text-cyan-400">✔ To square negative three: (-3) ** 2 → 9</div>
            </div>

            <EditablePythonCodeBlock
              initialCode={`print("-3 ** 2   =", -3 ** 2)     # Output: -9
print("-(3 ** 2) =", -(3 ** 2))   # Output: -9 (Same as above)
print("(-3) ** 2 =", (-3) ** 2)   # Output: 9 (Parentheses include sign)`}
            />
          </div>

          {/* 3. Chained Assignment */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs">C</span>
              Chained Assignment (=): Right-to-Left
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Python evaluates the rightmost value first, and then assigns it sequentially from right to left across variables:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# a = b = c = 100 assigns 100 to c, then c to b, then b to a
a = b = c = 100
print(f"a = {a}, b = {b}, c = {c}")

# Modifying one primitive does not affect others
a += 50
print(f"After a += 50 -> a = {a}, b = {b}")`}
            /&gt;
          </div>

          {/* 4. Conditional (Ternary) Expression */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs">D</span>
              Chained Conditional Expressions (x if C else y)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When nesting ternary operators, Python groups them right-to-left: <code className="text-purple-300">a if C1 else (b if C2 else c)</code>.
            </p>

            <EditablePythonCodeBlock
              initialCode={`score = 85

# Right-associative nested ternary
grade = "A+" if score >= 90 else "A" if score &ge; 80 else "B" if score >= 60 else "F"
print("Student Grade:", grade)  # Output: A`}
            />
          </div>

        </div>
      </section>

      {/* =========================================================================
          SPECIAL PYTHON FEATURE: COMPARISON CHAINING
      ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-cyan-400">
          <Layers size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            Python's Unique Feature: Comparison Chaining
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Unlike C, Java, or JavaScript where <code className="text-rose-400">10 &lt; x &lt; 20</code> is evaluated as <code className="text-rose-400">(10 &lt; x) &lt; 20</code> (which becomes <code className="text-rose-400">True &lt; 20</code> → <code className="text-rose-400">1 &lt; 20</code> → <code className="text-rose-400">True</code>, causing logic bugs!), 
          <strong> Python automatically transforms chained comparisons into an <code className="text-cyan-300">and</code> expression</strong>, evaluating each middle operand exactly once!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">What you write</h4>
            <code className="text-sm font-mono text-cyan-300">10 &lt; score <= 100 == total</code>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">How Python executes it</h4>
            <code className="text-sm font-mono text-emerald-400">(10 &lt; score) and (score <= 100) and (100 == total)</code>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`x = 15

# Chained Comparison
print("10 < x < 20       :", 10 < x < 20)        # True
print("10 < x < 12       :", 10 < x < 12)        # False (10 < 15 is True, but 15 < 12 is False)

# Multiple comparisons chained
a = 10
b = 10
c = 10
print("a == b == c == 10 :", a == b == c == 10)  # True`}
        />
      </section>

      {/* =========================================================================
          LOGICAL OPERATORS HIERARCHY: not &gt; and > or
      ========================================================================= */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 flex items-center gap-2">
          <Zap size={24} />
          Logical Operator Precedence: <code className="text-white">not</code> &gt; <code className="text-white">and</code> &gt; <code className="text-white">or</code>
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Among boolean operators, <code className="text-indigo-300 font-bold">not</code> has the highest precedence, followed by <code className="text-indigo-300 font-bold">and</code>, and finally <code className="text-indigo-300 font-bold">or</code> has the lowest.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800 text-slate-300 border-b border-slate-700 text-xs">
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Logical Operator</th>
                <th className="py-3 px-4">Binding Power</th>
                <th className="py-3 px-4">Equivalent Expression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 text-xs font-mono">
              <tr>
                <td className="py-2.5 px-4 font-bold text-rose-400">1 (Highest)</td>
                <td className="py-2.5 px-4 text-sky-300 font-bold">not</td>
                <td className="py-2.5 px-4 font-sans">Binds immediately to its target</td>
                <td className="py-2.5 px-4 text-emerald-400">not a == b → not (a == b)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-amber-400">2 (Medium)</td>
                <td className="py-2.5 px-4 text-sky-300 font-bold">and</td>
                <td className="py-2.5 px-4 font-sans">Evaluates before 'or'</td>
                <td className="py-2.5 px-4 text-emerald-400">a or b and c → a or (b and c)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-emerald-400">3 (Lowest)</td>
                <td className="py-2.5 px-4 text-sky-300 font-bold">or</td>
                <td className="py-2.5 px-4 font-sans">Evaluated last in boolean logic</td>
                <td className="py-2.5 px-4 text-emerald-400">(a or b) and c → forces 'or' first</td>
              </tr>
            </tbody>
          </table>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# Demonstration of Logical Precedence
print("True or False and False   =", True or False and False)
# Explanation:
# 1. False and False = False
# 2. True or False   = True

print("(True or False) and False =", (True or False) and False)
# Explanation:
# 1. (True or False) = True
# 2. True and False  = False`}
        />
      </section>

      {/* =========================================================================
          STEP-BY-STEP EXPRESSION EVALUATION ENGINE (VISUAL WALKTHROUGHS)
      ========================================================================= */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
            <Terminal size={14} />
            Step-by-Step Execution Breakdown
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Deconstructing Complex Expressions Step-by-Step
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Let's trace how Python parses and calculates real multi-operator expressions from start to finish.
          </p>
        </div>

        {/* Expression Breakdown 1 */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-sky-300">
              Case 1: Arithmetic & Exponents Mixture
            </h3>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Expression: 10 + 4 * 3 ** 2 - 20 // 4
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[11px] mb-2 font-sans">
                Evaluation Trace:
              </div>
              <div className="text-sky-300">1. 3 ** 2    → 9   (Exponentiation highest)</div>
              <div className="text-cyan-300">2. 4 * 9     → 36  (Multiplication)</div>
              <div className="text-indigo-300">3. 20 // 4   → 5   (Floor division)</div>
              <div className="text-amber-300">4. 10 + 36   → 46  (Addition L → R)</div>
              <div className="text-emerald-400 font-bold">5. 46 - 5    → 41  (Final Answer)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono text-slate-400">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[11px] mb-2 font-sans">
                Evaluation Tree (Bottom-Up):
              </div>
              <pre className="text-slate-300 leading-tight">
{`          (-)
         /   \\
       (+)    (//)
      /   \\   /  \\
    10    (*) 20  4
         /   \\
        4   (**)
            /  \\
           3    2`}
              </pre>
            </div>
          </div>

          <EditablePythonCodeBlock
            initialCode={`expr1 = 10 + 4 * 3 ** 2 - 20 // 4
print("Result of 10 + 4 * 3 ** 2 - 20 // 4 =", expr1)  # Output: 41`}
          />
        </div>

        {/* Expression Breakdown 2 */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-purple-300">
              Case 2: Relational, Arithmetic & Logical Combination
            </h3>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Expression: not 5 + 3 &gt; 10 and 4 * 2 == 8 or 10 &gt; 20
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-sky-300">1. Arithmetic first: (5 + 3 → 8) and (4 * 2 → 8)</div>
            <div className="text-cyan-300">2. Comparisons: (8 &gt; 10 → False) and (8 == 8 → True) and (10 &gt; 20 → False)</div>
            <div className="text-amber-300">3. Logical NOT: not False → True</div>
            <div className="text-indigo-300">4. Logical AND: True and True → True</div>
            <div className="text-emerald-400 font-bold">5. Logical OR : True or False → True (Final Answer)</div>
          </div>

          <EditablePythonCodeBlock
            initialCode={`expr2 = not 5 + 3 > 10 and 4 * 2 == 8 or 10 &gt; 20
print("Result:", expr2)  # Output: True`}
          />
        </div>
      </section>

      {/* =========================================================================
          REAL-WORLD CLASSROOM & SYSTEM SCENARIOS
      ========================================================================= */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2">
            <BookOpen size={14} />
            Institutional & Real-World Case Studies
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Precedence in Real-World Software Applications
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            See how accurate operator hierarchy powers financial systems, college admissions, and e-commerce platforms across Kolkata, Barrackpore, and Jadavpur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Scenario 1: Payroll System */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-300">
              <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs">Case 1</span>
              <h3 className="font-bold text-slate-100 text-base">Kolkata Tech Park: Payroll & Tax Calculator</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calculating gross salary with HRA (40%), DA (20%), and Professional Tax deductions in West Bengal:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Employee: Debangshu (Salt Lake Sector V, Kolkata)
basic_salary = 50000
bonus = 5000
tax_rate = 0.10      # 10%
prof_tax = 200

# Calculation without parentheses relies on * happening before + and -
net_salary = basic_salary + basic_salary * 0.40 + basic_salary * 0.20 + bonus - basic_salary * tax_rate - prof_tax

print(f"Debangshu's Net Salary: ₹{net_salary:,.2f}")`}
            />
          </div>

          {/* Scenario 2: Admission Engine */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs">Case 2</span>
              <h3 className="font-bold text-slate-100 text-base">Jadavpur University Admission Validator</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluating student eligibility based on Board %, Entrance Rank, and Sports Quota:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Applicant: Mamata (Barrackpore)
board_marks = 88.5
entrance_rank = 350
has_state_sports_cert = True

# Logic: Must have Board >= 85 AND (Rank &le; 500 OR Sports Quota)
is_eligible = board_marks >= 85 and (entrance_rank <= 500 or has_state_sports_cert)

print(f"Mamata's Admission Status: {'Eligible' if is_eligible else 'Not Eligible'}")`}
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
            Top 6 Dangerous Beginner Traps & Misconceptions
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            These subtle syntax misunderstandings cause high-frequency bugs in real projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Trap 1 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 1: The 'or' Value Trap</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              if x == 1 or 2: # ❌ BUG!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluates as <code className="text-amber-300">(x == 1) or 2</code>. Since <code className="text-amber-300">2</code> is truthy, this condition is <strong>always True</strong>!
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: if x in (1, 2):
            </div>
          </div>

          {/* Trap 2 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 2: -2 ** 4 is -16</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              print(-2 ** 4) # ❌ Gives -16
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              <code className="text-amber-300">**</code> has higher priority than unary minus. Python calculates <code className="text-amber-300">-(2**4)</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: (-2) ** 4 → 16
            </div>
          </div>

          {/* Trap 3 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 3: Bitwise & vs Logical and</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              x &gt; 5 & x &lt; 10 # ❌ ERROR
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bitwise <code className="text-amber-300">&amp;</code> has higher precedence than comparisons! Python reads <code className="text-amber-300">x &gt; (5 &amp; x) &lt; 10</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: x &gt; 5 and x &lt; 10
            </div>
          </div>

          {/* Trap 4 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 4: not a == b</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              not a == b
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Comparison <code className="text-amber-300">==</code> happens BEFORE <code className="text-amber-300">not</code>. This evaluates as <code className="text-amber-300">not (a == b)</code>, which is equivalent to <code className="text-amber-300">a != b</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: a != b (cleaner)
            </div>
          </div>

          {/* Trap 5 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 5: Chained Falsehood</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              1 &lt; 2 &lt; 1 # False
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluates as <code className="text-amber-300">(1 &lt; 2) and (2 &lt; 1)</code>. Because <code className="text-amber-300">2 &lt; 1</code> is False, the result is False.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Short-circuits naturally
            </div>
          </div>

          {/* Trap 6 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 6: Float Division with //</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              10.0 // 3 # 3.0 (Float!)
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Floor division with any float operand returns a <strong>float</strong> value rounded down (e.g. <code className="text-amber-300">3.0</code>, not <code className="text-amber-300">3</code>).
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ int(10.0 // 3) for int
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          PROFESSIONAL BEST PRACTICES & PEP 8 GUIDELINES
      ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
          <CheckCircle2 size={24} className="text-emerald-400" />
          Industry Best Practices & PEP 8 Guidelines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sky-300 text-sm flex items-center gap-1.5">
              <CheckCircle2 size={16} /> 1. The Parenthesis Rule (Zen of Python)
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              <em>"Explicit is better than implicit."</em> Even if you know operator precedence by heart, your teammates might not. When writing non-trivial expressions, <strong>always add parentheses</strong> to clarify intent and prevent cognitive overload.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sky-300 text-sm flex items-center gap-1.5">
              <CheckCircle2 size={16} /> 2. PEP 8 Spacing Around Operators
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              If operators with different priorities are used, consider adding whitespace around the operators with the lowest priority:
              <code className="block mt-1 p-1 bg-slate-900 rounded font-mono text-emerald-300">x = a*x**2 + b*x + c  # PEP 8 recommended</code>
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TEACHER'S NOTE
      ========================================================================= */}
      <section className="space-y-4">
        <Teacher
          note="Remember the Golden Rule of Python Operators: Parentheses () are your best friend. Whenever you write an expression combining arithmetic, comparisons, and logical operators in competitive coding or industry production, wrap your logical units in parentheses. For exams and technical interviews, always remember that exponentiation (**) and assignments (=) evaluate from Right-to-Left, while arithmetic evaluates Left-to-Right!"
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
            <span><strong>Parentheses <code>()</code></strong> always have the highest priority (Level 1).</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Exponentiation <code>**</code></strong> is Right-to-Left associative (<code>2**3**2 = 512</code>).</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong><code>-3 ** 2</code> is <code>-9</code></strong> because <code>**</code> binds tighter than unary <code>-</code>.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong><code>* / // %</code></strong> execute before <strong><code>+ -</code></strong> from Left to Right.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Logical precedence</strong> is strictly <code>not</code> &gt; <code>and</code> &gt; <code>or</code>.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Comparison chaining</strong> (<code>10 &lt; x &lt; 20</code>) evaluates safely with single middle evaluation.</span>
          </li>
        </ul>
      </section>

    </div>
  );
}
