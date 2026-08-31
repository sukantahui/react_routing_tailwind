// topic5_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 5
// Topic: Creating local scoped variables with the LET function to optimize formula performance and readability
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary architectural purpose of the LET function in Excel 365?",
    shortAnswer: "To declare locally scoped named variables within a formula, assigning calculation results to names to optimize speed and readability.",
    explanation: "LET caches intermediate calculation results in memory so they are evaluated only once rather than repeatedly.",
    hint: "Declares local variables to cache calculations in RAM.",
    level: "basic",
    codeExample: "=LET(x, 10, y, 20, x * y)"
  },
  {
    question: "What is the syntax signature of the LET function?",
    shortAnswer: "=LET(name1, name_value1, [name2, name_value2, ...], calculation)",
    explanation: "LET accepts up to 126 pairs of (name, value) followed by a final calculation expression that returns the formula result.",
    hint: "Pairs of name and value, followed by final calculation.",
    level: "basic",
    codeExample: "=LET(price, C5, qty, D5, price * qty)"
  },
  {
    question: "How many variable name-value pairs can a single LET function define?",
    shortAnswer: "Up to 126 name-value pairs.",
    explanation: "LET supports declaring up to 126 local variables before the final calculation expression.",
    hint: "Up to 126 pairs.",
    level: "moderate",
    codeExample: "Max: 126 (name, value) pairs + 1 calc"
  },
  {
    question: "How does LET dramatically improve calculation speed in heavy spreadsheet models?",
    shortAnswer: "By evaluating expensive sub-calculations (like XLOOKUP, FILTER, or exponentiation) once in RAM and reusing the cached variable.",
    explanation: "Without LET, repeating an XLOOKUP 5 times in an IF statement forces Excel to execute 5 separate disk/RAM lookups. LET executes it once.",
    hint: "Evaluates intermediate sub-formulas once and reuses in RAM.",
    level: "moderate",
    codeExample: "=LET(cust, XLOOKUP(id, IDs, Customers), IF(cust=\"\", \"N/A\", cust))"
  },
  {
    question: "Can a later variable in a LET function reference an earlier declared variable in the same LET block?",
    shortAnswer: "Yes, variables are evaluated sequentially from left to right, so later variables can reference earlier variables.",
    explanation: "For example: =LET(a, 10, b, a * 2, c, b + 5, a + b + c) evaluates sequentially.",
    hint: "Sequential evaluation: later variables access earlier variables.",
    level: "basic",
    codeExample: "=LET(a, 10, b, a * 2, b + 5)"
  },
  {
    question: "What naming rules apply to variable names declared inside LET?",
    shortAnswer: "Must begin with a letter or underscore, cannot contain spaces, cannot match cell references (e.g. C2, R1C1), and cannot match native function names.",
    explanation: "Adhering to standard naming rules avoids formula parsing collisions.",
    hint: "No spaces, cannot match cell addresses or native function names.",
    level: "basic",
    codeExample: "Valid: subtotal, net_val | Invalid: C2, SUM, net val"
  },
  {
    question: "What is the scope of a variable declared inside a LET function?",
    shortAnswer: "Local to that specific LET function execution block only.",
    explanation: "LET variables do not pollute the global workbook namespace and cannot be referenced outside the formula.",
    hint: "Locally scoped exclusively to the enclosing LET formula.",
    level: "basic",
    codeExample: "Local Scope Lifecycle"
  },
  {
    question: "What error appears if a formula references a variable name that was not declared in the LET parameter list?",
    shortAnswer: "#NAME? error.",
    explanation: "Excel flags undefined variable identifiers with the standard #NAME? error.",
    hint: "Undeclared variables return #NAME?.",
    level: "basic",
    codeExample: "#NAME?"
  },
  {
    question: "How do you calculate monthly loan EMI and total payment in a single spilled row using LET?",
    shortAnswer: "=LET(P, D5, r, E5/12, n, F5, emi, P*r*(1+r)^n/((1+r)^n-1), HSTACK(emi, emi*n, (emi*n)-P))",
    explanation: "Calculates EMI once and reuses it to compute Total Repayment and Total Interest, spilling 3 columns.",
    hint: "Calculate EMI once and reuse in HSTACK.",
    level: "advanced",
    codeExample: "=LET(P, D5, r, E5/12, n, F5, emi, P*r*(1+r)^n/((1+r)^n-1), HSTACK(emi, emi*n, (emi*n)-P))"
  },
  {
    question: "Can LET variables store dynamic spilled arrays and range matrices?",
    shortAnswer: "Yes, LET variables can hold dynamic arrays, table ranges, vectors, strings, numbers, and booleans.",
    explanation: "LET is fully dynamic-array aware and stores complex matrices in memory with zero degradation.",
    hint: "Yes, stores dynamic arrays and matrices in memory.",
    level: "basic",
    codeExample: "=LET(matrix, FILTER(A2:D50, D2:D50>1000), SORT(matrix, 4, -1))"
  },
  {
    question: "How does LET improve formula readability and code maintainability for team members?",
    shortAnswer: "It breaks complex monolithic formulas into named, readable steps that read like plain English or software code.",
    explanation: "Analysts can understand the intent of named steps (e.g. taxable_base, cgst, sgst) far more easily than nested cell coordinates.",
    hint: "Transforms complex formulas into clean sequential steps.",
    level: "basic",
    codeExample: "Readable Multi-Step Logic"
  },
  {
    question: "What happens if a LET variable name matches a workbook-level defined name in Name Manager?",
    shortAnswer: "The local LET variable shadows (overrides) the global defined name within the formula's execution scope.",
    explanation: "Local scoping rules dictate that local variables take precedence over global symbols.",
    hint: "Local variable shadows global name.",
    level: "moderate",
    codeExample: "Variable Shadowing"
  },
  {
    question: "Can LET functions be nested inside other LET functions?",
    shortAnswer: "Yes, LET functions can be nested, though declaring all variables in a single flat LET is usually cleaner.",
    explanation: "Nested LETs allow inner sub-scopes if needed for complex modular formulas.",
    hint: "Yes, nested LET blocks are fully supported.",
    level: "moderate",
    codeExample: "=LET(a, 5, LET(b, a*2, b+3))"
  },
  {
    question: "How do you test intermediate variable values inside LET using the F9 key?",
    shortAnswer: "Highlight any variable name or sub-expression in the formula bar and press F9 to evaluate its memory value.",
    explanation: "F9 reveals the computed value or matrix of any named variable inside LET during formula editing.",
    hint: "Highlight variable and press F9 in formula bar.",
    level: "basic",
    codeExample: "F9 Variable Inspection"
  },
  {
    question: "Can a LET function return multiple columns with custom column header titles?",
    shortAnswer: "Yes, by combining VSTACK with custom headers and HSTACK data inside the calculation argument.",
    explanation: "LET enables constructing complete formatted tables with headers in memory.",
    hint: "Combine VSTACK({\"Col1\", \"Col2\"}, HSTACK(data1, data2)).",
    level: "advanced",
    codeExample: "=LET(d, A2:B10, VSTACK({\"ID\", \"Name\"}, d))"
  },
  {
    question: "How does LET reduce spreadsheet file size and recalculation latency?",
    shortAnswer: "By eliminating intermediate helper columns on the worksheet and executing all calculation steps in volatile RAM.",
    explanation: "Removing 10 helper columns across 50,000 rows drastically shrinks XML worksheet size and speeds up workbook saves.",
    hint: "Eliminates helper columns by computing in RAM.",
    level: "moderate",
    codeExample: "Helper Column Elimination"
  },
  {
    question: "What is the difference between declaring a variable in LET vs registering a name in Name Manager?",
    shortAnswer: "LET variables are local to 1 formula cell; Name Manager names are global across the entire workbook.",
    explanation: "LET is for localized formula-level caching; Name Manager is for workbook-level reusable assets.",
    hint: "Local single-formula scope vs global workbook scope.",
    level: "moderate",
    codeExample: "LET (Local) vs Name Manager (Global)"
  },
  {
    question: "Can LET be used inside conditional IF statements?",
    shortAnswer: "Yes, LET can be placed inside IF branches, or IF statements can be declared inside LET.",
    explanation: "LET integrates seamlessly with all native Excel conditional engines.",
    hint: "Full conditional branching integration.",
    level: "basic",
    codeExample: "IF(condition, LET(x, 10, x*2), 0)"
  },
  {
    question: "How do you calculate compound annual growth rate (CAGR) cleanly with LET?",
    shortAnswer: "=LET(start_v, B2, end_v, C2, yrs, D2, (end_v / start_v)^(1 / yrs) - 1)",
    explanation: "Provides crystal-clear financial variable naming for CAGR computation.",
    hint: "Assign start, end, and years to named variables.",
    level: "basic",
    codeExample: "=LET(s, B2, e, C2, n, D2, (e/s)^(1/n) - 1)"
  },
  {
    question: "What happens if you have an odd number of arguments in LET when declaring variables without a final calculation?",
    shortAnswer: "Excel displays a formula syntax error because every variable name must have a value, followed by a final calculation.",
    explanation: "LET requires an odd total argument count: (name1, val1, ..., calc) → 2N + 1 arguments.",
    hint: "Total arguments must equal 2N + 1 (odd number).",
    level: "moderate",
    codeExample: "Syntax Error: 2N+1 argument rule"
  },
  {
    question: "How do you combine FILTER and SORT inside LET to extract Top 5 performers?",
    shortAnswer: "=LET(active_data, FILTER(A2:D50, D2:D50>50000), sorted_data, SORT(active_data, 4, -1), TAKE(sorted_data, 5))",
    explanation: "Performs filtering, sorting, and slicing in memory in 3 sequential readable steps.",
    hint: "Sequential FILTER → SORT → TAKE inside LET.",
    level: "advanced",
    codeExample: "=LET(f, FILTER(A2:D50, D2:D50>50k), s, SORT(f, 4, -1), TAKE(s, 5))"
  },
  {
    question: "Can LET variables store custom LAMBDA functions defined in-line?",
    shortAnswer: "Yes, you can assign a LAMBDA function to a variable inside LET: =LET(double, LAMBDA(x, x*2), double(15)).",
    explanation: "LET supports local helper closures within the scope of a single formula.",
    hint: "Assigns local in-line LAMBDAs to LET variables.",
    level: "expert",
    codeExample: "=LET(sqr, LAMBDA(x, x^2), sqr(9)) → 81"
  },
  {
    question: "Why should financial engineers avoid using single letters like `x`, `y`, `z` for all LET variables in production workbooks?",
    shortAnswer: "Because cryptic single letters defeat the self-documenting readability benefits of the LET function.",
    explanation: "Using meaningful names like `gross_revenue`, `cogs`, and `net_margin` makes formulas self-explanatory.",
    hint: "Use semantic names like gross_sales instead of single letters.",
    level: "basic",
    codeExample: "Use `taxable_base` instead of `t`"
  },
  {
    question: "How does LET handle error propagation if an intermediate variable evaluates to #N/A or #VALUE!?",
    shortAnswer: "The error short-circuits subsequent calculations and is returned as the final formula result unless caught with IFERROR.",
    explanation: "Standard Excel error bubbling applies to LET variable evaluations.",
    hint: "Errors bubble up to the final calculation output.",
    level: "moderate",
    codeExample: "Error short-circuiting in LET"
  },
  {
    question: "How can you sanitize an intermediate error using IFERROR inside LET?",
    shortAnswer: "=LET(raw_val, XLOOKUP(id, A:A, B:B), clean_val, IFERROR(raw_val, 0), clean_val * 1.18)",
    explanation: "Sanitizing intermediate results inside LET ensures resilient downstream calculations.",
    hint: "Wrap intermediate variables in IFERROR.",
    level: "moderate",
    codeExample: "=LET(v, IFERROR(XLOOKUP(id, A:A, B:B), 0), v * 1.18)"
  },
  {
    question: "How do you calculate weighted student scores across 4 subject columns using LET and SUMPRODUCT?",
    shortAnswer: "=LET(weights, {0.2, 0.3, 0.25, 0.25}, scores, B2:E2, SUMPRODUCT(scores, weights))",
    explanation: "Stores the static weight vector in a local variable, keeping row calculations clean.",
    hint: "Assign weight array constant to a LET variable.",
    level: "moderate",
    codeExample: "=LET(w, {0.2, 0.3, 0.25, 0.25}, s, B2:E2, SUMPRODUCT(s, w))"
  },
  {
    question: "Can LET be used inside custom LAMBDA functions registered in Name Manager?",
    shortAnswer: "Yes, combining LAMBDA with LET is the industry standard for high-performance custom function development.",
    explanation: "LAMBDA defines the external parameters; LET optimizes and executes the internal calculation pipeline in RAM.",
    hint: "The gold standard for production LAMBDA design.",
    level: "advanced",
    codeExample: "FX_FUNC = LAMBDA(p1, p2, LET(v1, p1*2, v1+p2))"
  },
  {
    question: "How does LET prevent copy-paste errors when writing formulas with repeated complex criteria?",
    shortAnswer: "By defining the complex criteria once in a variable, eliminating the risk of typos when reusing it across formula branches.",
    explanation: "Single definition guarantees consistency throughout the formula.",
    hint: "Defines criteria once to eliminate copy-paste typos.",
    level: "moderate",
    codeExample: "=LET(crit, AND(A2>50, B2<100), IF(crit, \"Valid\", \"Invalid\"))"
  },
  {
    question: "What is the memory cleanup lifecycle of variables declared inside LET?",
    shortAnswer: "Variables are allocated in fast compiled C++ RAM during formula evaluation and automatically freed once calculation completes.",
    explanation: "Zero memory leaks, zero workbook bloat, and instantaneous garbage collection.",
    hint: "Instant memory allocation and automatic cleanup.",
    level: "expert",
    codeExample: "Zero Garbage Collection Overhead"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for the LET function?",
    shortAnswer: "If a formula references the same cell, range, or calculation more than once—or if a formula spans more than 50 characters—always refactor it with LET to guarantee sub-millisecond execution and crystal-clear corporate readability!",
    explanation: "Mastering LET is the bridge that turns messy, unreadable legacy formulas into elegant, high-speed corporate calculation pipelines!",
    hint: "Refactor with LET if sub-calculations repeat or exceed 50 characters.",
    level: "expert",
    codeExample: "Sukanta Hui Rule: Repeated calculation or >50 chars → Use LET!"
  }
];

export default questions;
