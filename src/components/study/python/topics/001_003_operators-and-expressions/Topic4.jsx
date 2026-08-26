import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";
import Teacher from "../../../../../common/TeacherSukantaHui";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Terminal,
  Code2,
  Layers,
  Cpu,
  Zap,
  Filter,
  Check,
  X,
  Lightbulb,
  Binary,
  ShieldCheck,
  FileText,
  AlignLeft
} from "lucide-react";

export default function Topic4() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");

  // Logical & String Formatting Operations Table Data
  const operators = [
    {
      symbol: "and",
      name: "Logical Conjunction (AND)",
      category: "logical",
      rule: "Returns first Falsy value, or last operand if all are Truthy",
      syntax: "A and B",
      example: "True and False → False",
      tip: "Short-circuits: if A is False, B is NEVER evaluated."
    },
    {
      symbol: "or",
      name: "Logical Disjunction (OR)",
      category: "logical",
      rule: "Returns first Truthy value, or last operand if all are Falsy",
      syntax: "A or B",
      example: "False or 'Kolkata' → 'Kolkata'",
      tip: "Short-circuits: if A is True, B is NEVER evaluated. Great for fallback defaults."
    },
    {
      symbol: "not",
      name: "Logical Negation (NOT)",
      category: "logical",
      rule: "Inverts boolean truth value (Unary operator)",
      syntax: "not A",
      example: "not 0 → True",
      tip: "Binds tighter than 'and' / 'or', but looser than comparison operators (==, <, >)."
    },
    {
      symbol: "+ (str)",
      name: "String Concatenation",
      category: "strings",
      rule: "Combines two strings into a new concatenated string",
      syntax: "str1 + str2",
      example: "'Barrackpore' + ' Metro' → 'Barrackpore Metro'",
      tip: "Only works between strings! 'Age: ' + 25 raises TypeError. Use f-strings instead."
    },
    {
      symbol: "* (str)",
      name: "String Repetition",
      category: "strings",
      rule: "Repeats a string n times",
      syntax: "string * count",
      example: "'-' * 20 → '--------------------'",
      tip: "Count must be an integer. Multiplying by <= 0 yields empty string ''."
    },
    {
      symbol: "f'{}'",
      name: "Formatted String Literal (f-string)",
      category: "strings",
      rule: "Evaluates embedded Python expressions at runtime",
      syntax: "f'{expr:format}'",
      example: "f'₹{25000:,.2f}' → '₹25,000.00'",
      tip: "Python 3.6+ standard. Fast, readable, and supports formatting specifiers & debug f'{x=}'."
    }
  ];

  const filteredOperators = operators.filter((op) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "logical" && op.category === "logical") ||
      (activeTab === "strings" && op.category === "strings");

    const matchesSearch =
      op.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      op.symbol.toLowerCase().includes(searchFilter.toLowerCase()) ||
      op.rule.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16 text-slate-100">

      {/* =========================================================================
          HERO & ROADMAP SECTION
      ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="animate-pulse" />
            Module 001_003 · Operators & Expressions · Topic 4
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Logical Operators & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">String Formatting (f-strings)</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-4xl leading-relaxed">
            Logical operators (<code className="text-sky-300 font-bold">and</code>, <code className="text-sky-300 font-bold">or</code>, <code className="text-sky-300 font-bold">not</code>) 
            allow you to construct multi-condition decision branches and short-circuit evaluation logic. 
            Paired with Python’s modern <code className="text-cyan-300 font-bold">f-strings</code>, you can evaluate live expressions, format financial balances in <strong className="text-emerald-400">Rupees (₹)</strong>, and build production-ready diagnostic pipelines.
          </p>

          {/* 3 Core Conceptual Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-sky-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">1</div>
                <h3 className="font-semibold text-slate-100 text-sm">Value-Preserving Logic</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <code className="text-sky-300">and</code> and <code className="text-sky-300">or</code> return the <em>actual operand value</em> that determined the outcome, not just a plain boolean.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-indigo-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">2</div>
                <h3 className="font-semibold text-slate-100 text-sm">Short-Circuit Guard</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Python stops evaluating conditions immediately upon reaching a decisive Truthy/Falsy result, preventing errors like <code className="text-rose-300">ZeroDivisionError</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
                <h3 className="font-semibold text-slate-100 text-sm">Modern f-strings</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interpolate expressions directly with <code className="text-emerald-300">f'&#123;expr&#125;'</code> with built-in alignment, padding, and number formatting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MASTER OPERATORS & FORMATTING REFERENCE TABLE
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2">
              <Code2 size={14} />
              Operators & Expression Formatting
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
              Master Specification Reference Table
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Complete reference of logical operators, short-circuit semantics, and string expression formatting.
            </p>
          </div>

          {/* Search Filter */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search (and, or, f-string)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition w-full sm:w-56"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-3">
          {[
            { id: "all", label: "All Operators & Formatting" },
            { id: "logical", label: "Logical Operators (and, or, not)" },
            { id: "strings", label: "String Concatenation & f-strings" }
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
          <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700 uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-3.5 px-4 w-24 text-center">Syntax</th>
                <th className="py-3.5 px-4">Operator / Feature</th>
                <th className="py-3.5 px-4">Evaluation Rule</th>
                <th className="py-3.5 px-4">Example & Output</th>
                <th className="py-3.5 px-4">Behavioral Tip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              {filteredOperators.map((op) => (
                <tr key={op.symbol} className="hover:bg-slate-800/50 transition-colors group">
                  {/* Symbol */}
                  <td className="py-3.5 px-4 text-center">
                    <code className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono font-bold text-sky-300 text-xs">
                      {op.symbol}
                    </code>
                  </td>

                  {/* Name */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100 group-hover:text-sky-300 transition">
                      {op.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Syntax: {op.syntax}
                    </div>
                  </td>

                  {/* Rule */}
                  <td className="py-3.5 px-4 text-xs text-slate-300">
                    {op.rule}
                  </td>

                  {/* Example */}
                  <td className="py-3.5 px-4 font-mono text-emerald-400 text-xs font-semibold whitespace-nowrap">
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
          DEEP EXPLANATION 1: LOGICAL TRUTH TABLES & SHORT-CIRCUIT MECHANICS
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-sky-400">
          <Binary size={24} />
          <h2 className="text-2xl font-bold text-slate-100">
            1. Truth Tables & Short-Circuit Evaluation Mechanics
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Python evaluates logical operators using <strong>short-circuit evaluation</strong>. 
          The interpreter evaluates expressions strictly from left to right and stops the moment the outcome is mathematically guaranteed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* AND Table Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-sky-300 flex items-center justify-between">
              <span>Logical AND (A and B)</span>
              <span className="text-[10px] px-2 py-0.5 bg-sky-500/20 text-sky-300 rounded font-mono">Both True</span>
            </h3>
            <p className="text-xs text-slate-400">
              Stops on the <strong>first Falsy</strong> value and returns it.
            </p>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 space-y-1">
              <div>True  and True  → <span className="text-emerald-400 font-bold">True</span></div>
              <div>True  and False → <span className="text-rose-400 font-bold">False</span></div>
              <div>False and True  → <span className="text-rose-400 font-bold">False (B skipped!)</span></div>
              <div>False and False → <span className="text-rose-400 font-bold">False (B skipped!)</span></div>
            </div>
          </div>

          {/* OR Table Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-emerald-300 flex items-center justify-between">
              <span>Logical OR (A or B)</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-mono">Any True</span>
            </h3>
            <p className="text-xs text-slate-400">
              Stops on the <strong>first Truthy</strong> value and returns it.
            </p>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 space-y-1">
              <div>True  or True  → <span className="text-emerald-400 font-bold">True (B skipped!)</span></div>
              <div>True  or False → <span className="text-emerald-400 font-bold">True (B skipped!)</span></div>
              <div>False or True  → <span className="text-emerald-400 font-bold">True</span></div>
              <div>False or False → <span className="text-rose-400 font-bold">False</span></div>
            </div>
          </div>

          {/* NOT Table Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-amber-300 flex items-center justify-between">
              <span>Logical NOT (not A)</span>
              <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-mono">Inversion</span>
            </h3>
            <p className="text-xs text-slate-400">
              Inverts truth value to strict boolean <code className="text-emerald-300">True</code> or <code className="text-rose-300">False</code>.
            </p>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 space-y-1">
              <div>not True  → <span className="text-rose-400 font-bold">False</span></div>
              <div>not False → <span className="text-emerald-400 font-bold">True</span></div>
              <div>not 0     → <span className="text-emerald-400 font-bold">True (0 is falsy)</span></div>
              <div>not "Hi"  → <span className="text-rose-400 font-bold">False ("Hi" is truthy)</span></div>
            </div>
          </div>

        </div>

        <EditablePythonCodeBlock
          initialCode={`# Short-Circuit Evaluation in Action
# Guarding against ZeroDivisionError
count = 0
total_score = 450

# Because count > 0 is False, Python NEVER evaluates the division (total_score / count)!
if count > 0 and (total_score / count) > 50:
    print("Average exceeds threshold")
else:
    print("Zero items detected: Division safely bypassed by short-circuit AND!")

# Providing safe fallback default values with OR
user_input = ""
city_name = user_input or "Kolkata"
print("Selected City:", city_name)  # Falls back to "Kolkata"`}
        />
      </section>

      {/* =========================================================================
          DEEP EXPLANATION 2: TRUTH VALUE TESTING (TRUTHY VS. FALSY)
      ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 text-emerald-400">
          <ShieldCheck size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            2. Truth Value Testing (Truthy vs. Falsy Values in Python)
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          In Python, every object has an inherent truth value when evaluated in a boolean context (such as in an <code className="text-sky-300">if</code> condition or logical expression).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Falsy Values Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-3">
            <h4 className="font-bold text-sm text-rose-400 flex items-center gap-2">
              <X size={16} /> Exactly What Python Considers FALSY:
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Constants: <code className="text-rose-300 font-mono font-bold">None</code> and <code className="text-rose-300 font-mono font-bold">False</code></li>
              <li>Zero of any numeric type: <code className="text-rose-300 font-mono">0</code>, <code className="text-rose-300 font-mono">0.0</code>, <code className="text-rose-300 font-mono">0j</code>, <code className="text-rose-300 font-mono">Decimal(0)</code></li>
              <li>Empty sequences & collections: <code className="text-rose-300 font-mono">""</code>, <code className="text-rose-300 font-mono">()</code>, <code className="text-rose-300 font-mono">[]</code>, <code className="text-rose-300 font-mono">{`{}`}</code>, <code className="text-rose-300 font-mono">set()</code>, <code className="text-rose-300 font-mono">range(0)</code></li>
            </ul>
          </div>

          {/* Truthy Values Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
            <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              <Check size={16} /> Everything Else is TRUTHY:
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Non-zero numbers: <code className="text-emerald-300 font-mono">1</code>, <code className="text-emerald-300 font-mono">-5</code>, <code className="text-emerald-300 font-mono">3.14</code></li>
              <li>Non-empty strings: <code className="text-emerald-300 font-mono">"Hello"</code>, <code className="text-emerald-300 font-mono">" "</code> (even whitespace!)</li>
              <li>Non-empty collections: <code className="text-emerald-300 font-mono">[0]</code>, <code className="text-emerald-300 font-mono">["Kolkata"]</code>, <code className="text-emerald-300 font-mono">{`{"status": 200}`}</code></li>
            </ul>
          </div>

        </div>

        <EditablePythonCodeBlock
          initialCode={`# Truth Value Inspection using bool()
falsy_items = [None, False, 0, 0.0, "", [], (), {}, set()]
print("Testing Falsy items:")
for item in falsy_items:
    print(f"bool({repr(item):<8}) -> {bool(item)}")

# Truthy return values of 'and' & 'or'
print("\\nOperand return behavior:")
print("10 and 20         :", 10 and 20)          # 20 (both truthy -> returns last)
print("0 and 'Python'    :", 0 and "Python")     # 0  (first falsy)
print("'' or 'Default'   :", "" or "Default")    # 'Default' (first truthy)`}
        />
      </section>

      {/* =========================================================================
          DEEP EXPLANATION 3: STRING CONCATENATION & MODERN F-STRINGS
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-cyan-400">
          <FileText size={24} />
          <h2 className="text-2xl font-bold text-slate-100">
            3. String Concatenation & Modern Formatted String Literals (f-strings)
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Introduced in Python 3.6 (PEP 498), <strong>f-strings (Formatted string literals)</strong> provide the fastest, most readable syntax for embedding expressions, formatting numbers, and constructing outputs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-sky-300">1. Currency & Number Formatting</h4>
            <p className="text-xs text-slate-400">
              Format numbers with comma thousand separators and decimal places:
            </p>
            <div className="p-2 bg-slate-950 rounded font-mono text-xs text-sky-300">
              {`f"₹{balance:,.2f}"`}<br />
              → "₹1,25,000.00"
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-emerald-300">2. Embedded Expressions</h4>
            <p className="text-xs text-slate-400">
              Evaluate full arithmetic or logical expressions directly inside braces:
            </p>
            <div className="p-2 bg-slate-950 rounded font-mono text-xs text-emerald-300">
              {`f"Total: ₹{price * qty}"`}<br />
              {`f"{'Eligible' if age>=18 else 'No'}"`}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-purple-300">3. Debug Specifier (Python 3.8+)</h4>
            <p className="text-xs text-slate-400">
              Add <code className="text-purple-300">=</code> after the variable to print both variable name and value:
            </p>
            <div className="p-2 bg-slate-950 rounded font-mono text-xs text-purple-300">
              {`f"{score=}"`}<br />
              → "score=95"
            </div>
          </div>
        </div>

        <EditablePythonCodeBlock
          initialCode={`# String Concatenation vs. Modern f-strings
name = "Mamata"
location = "Jadavpur"
scholarship_amount = 75000.5

# ❌ Cumbersome Concatenation (Requires explicit str conversion):
msg_concat = "Student: " + name + " from " + location + " won ₹" + str(scholarship_amount)
print(msg_concat)

# ✔ Modern, Clean f-string with Rupee (₹) and number formatting:
msg_fstring = f"Student: {name} from {location} won ₹{scholarship_amount:,.2f}"
print(msg_fstring)

# Expression evaluation & debugging in f-strings (Python 3.8+)
sub1, sub2 = 88, 94
print(f"Average Marks: {(sub1 + sub2) / 2:.1f}")
print(f"Debug Mode   : {name=}, {sub1=}, {sub2=}")`}
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
            Logical Pipelines & String Invoices in Production
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real-world systems from university login auth, metro ticketing, and retail checkout in Bengal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Scenario 1: Multi-Factor Auth */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-300">
              <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs">Case 1</span>
              <h3 className="font-bold text-slate-100 text-base">Jadavpur University: Lab Access Security Guard</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verifying student access based on role, enrollment status, and biometric confirmation:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Student: Mamata (CS Research Lab, Jadavpur)
is_enrolled = True
has_biometric_pass = True
is_admin = False

# Permission rule: (Enrolled AND Biometric) OR Admin
has_lab_access = (is_enrolled and has_biometric_pass) or is_admin

print(f"Access Verification for Mamata: {'GRANTED' if has_lab_access else 'DENIED'}")`}
            />
          </div>

          {/* Scenario 2: Metro Ticketing Invoice */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs">Case 2</span>
              <h3 className="font-bold text-slate-100 text-base">Barrackpore Metro: Automated Invoice & Discount</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu purchases commuter passes with multi-ticket concessions and f-string formatted receipts:
            </p>

            <EditablePythonCodeBlock
              initialCode={`# Commuter: Debangshu (Barrackpore Station)
route = "Barrackpore -> Kolkata Esplanade"
ticket_count = 10
price_per_ticket = 25.0
is_student = True

base_fare = ticket_count * price_per_ticket
discount = base_fare * 0.20 if (is_student or ticket_count >= 10) else 0.0
final_fare = base_fare - discount

# Formatted Invoice Output using f-strings
print("=" * 45)
print(f"  KOLKATA METRO COMMUTER PASS RECEIPT")
print("=" * 45)
print(f"Route       : {route}")
print(f"Trips       : {ticket_count}")
print(f"Subtotal    : ₹{base_fare:,.2f}")
print(f"Discount    : -₹{discount:,.2f}")
print(f"Total Paid  : ₹{final_fare:,.2f}")
print("=" * 45)`}
            />
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: HINTS & THINKING MINDSET
      ========================================================================= */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-amber-400">
          <Lightbulb size={24} />
          <h2 className="text-xl font-bold text-slate-100">
            Guided Problem Solving & Thinking Mindset
          </h2>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Sharpen your boolean reasoning and formatting mastery with these three guiding reflections:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-sky-300 text-sm">💡 Think About...</h4>
            <p className="text-slate-400 leading-relaxed">
              How does <code className="text-sky-300">and</code> prioritize over <code className="text-sky-300">or</code>? In <code className="text-sky-300">A or B and C</code>, Python always evaluates <code className="text-sky-300">B and C</code> first!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-amber-300 text-sm">🔍 Observe Carefully...</h4>
            <p className="text-slate-400 leading-relaxed">
              Check if an object could be empty (<code className="text-amber-300">[]</code>, <code className="text-amber-300">""</code>, <code className="text-amber-300">0</code>). In Python, an empty list evaluates to <strong className="text-rose-400">False</strong> without checking <code className="text-amber-300">len() == 0</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-emerald-300 text-sm">🛠️ Try Changing This...</h4>
            <p className="text-slate-400 leading-relaxed">
              Replace messy string concatenation <code className="text-emerald-300">"Total: " + str(val)</code> with clean f-strings <code className="text-emerald-300">{`f"Total: ₹{val:,.2f}"`}</code>.
            </p>
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
            Top 6 Dangerous Beginner Traps in Logic & Formatting
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Frequent bugs in conditionals, operator priority, and string mixing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Trap 1 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 1: if x == 1 or 2</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              if x == 1 or 2: # Always True!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluates as <code className="text-amber-300">(x == 1) or 2</code>. Since <code className="text-amber-300">2</code> is truthy, the if-block ALWAYS runs.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ if x in (1, 2):
            </div>
          </div>

          {/* Trap 2 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 2: & vs and in Conditions</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              if x &gt; 5 & x &lt; 20: # ❌ Bug!
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              <code className="text-amber-300">&amp;</code> is bitwise AND with high precedence. Evaluates as <code className="text-amber-300">x &gt; (5 &amp; x) &lt; 20</code>!
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: x &gt; 5 and x &lt; 20
            </div>
          </div>

          {/* Trap 3 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 3: String + Number TypeError</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              "Balance: ₹" + 500 # TypeError
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Python is strongly typed and refuses to implicitly coerce integers to strings during concatenation.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: f"Balance: ₹{`{500}`}"
            </div>
          </div>

          {/* Trap 4 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 4: AND / OR Priority Mixup</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              A or B and C
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              <code className="text-amber-300">and</code> binds tighter than <code className="text-amber-300">or</code>. It evaluates as <code className="text-amber-300">A or (B and C)</code>.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use parentheses: (A or B) and C
            </div>
          </div>

          {/* Trap 5 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 5: Short-Circuit Side Effects</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              True or send_sms()
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              Because the first operand is <code className="text-amber-300">True</code>, <code className="text-rose-300">send_sms()</code> is bypassed and never runs!
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Run functions independently
            </div>
          </div>

          {/* Trap 6 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="text-rose-400 font-bold text-xs uppercase tracking-wider">Trap 6: Negation with ==</div>
            <code className="text-xs font-mono text-rose-300 block bg-slate-950 p-2 rounded">
              if not x == 5:
            </code>
            <p className="text-xs text-slate-300 leading-relaxed">
              While syntactically valid, it is less readable than using direct inequality.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">
              ✔ Use: if x != 5:
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TEACHER'S NOTE
      ========================================================================= */}
      <section className="space-y-4">
        <Teacher
          note="Logical operators and f-strings are the daily bread and butter of Python developers. Always remember: 1) 'and' and 'or' return actual operand values, enabling elegant fallback patterns like 'city = input_city or Kolkata'; 2) When combining 'and' and 'or', always use parentheses to prevent precedence surprises; 3) Modern f-strings are both faster and cleaner than string concatenation, so prefer f'₹{val:,.2f}' in all your financial and reporting code."
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
            <span>Python provides <strong>3 logical operators</strong>: <code>and</code>, <code>or</code>, <code>not</code>.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Short-circuiting</strong> stops evaluation on the first decisive Truthy or Falsy value.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Falsy items</strong>: <code>0</code>, <code>0.0</code>, <code>""</code>, <code>[]</code>, <code>()</code>, <code>{}</code>, <code>None</code>, <code>False</code>.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Logical precedence</strong>: <code>not</code> &gt; <code>and</code> &gt; <code>or</code>.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>Never use <code>&amp;</code> or <code>|</code></strong> for boolean conditions (they are bitwise operators).</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            <span><strong>f-strings (<code>f'&#123;expr&#125;'</code>)</strong> provide rapid expression interpolation with formatting.</span>
          </li>
        </ul>
      </section>

    </div>
  );
}
