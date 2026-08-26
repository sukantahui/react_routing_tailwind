// topic14_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 14
// Topic: Real-world project & Capstone assessment: Building a custom corporate business function suite
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary objective of the Module 004_003 Capstone Assessment Project?",
    shortAnswer: "To synthesize all core concepts—including LAMBDA authoring, LET scoping, higher-order helper engines (MAP, BYROW, BYCOL, MAKEARRAY, SCAN, REDUCE), and recursion—into a cohesive, production-grade corporate business function suite.",
    explanation: "Tests the ability to architect robust, scalable, and audit-compliant functional calculation engines in Excel 365.",
    hint: "Comprehensive synthesis of all module concepts into an enterprise function suite.",
    level: "expert",
    codeExample: "Enterprise Custom Function Suite Architecture"
  },
  {
    question: "How do you architect a single-formula loan amortization schedule generator `FX_FIN_LOAN_SCHEDULE(principal, annual_rate, tenure_months)` that spills Headers, Payment No, EMI, Principal Paid, Interest Paid, and Remaining Balance?",
    shortAnswer: "By combining LET, MAKEARRAY, and SCAN inside a LAMBDA to calculate monthly EMI, interest amortization per row, and running balance dynamically.",
    explanation: "Assembles a multi-row, multi-column amortization schedule in memory without helper cells.",
    hint: "Combine LET, MAKEARRAY, and SCAN inside LAMBDA.",
    level: "expert",
    codeExample: "FX_FIN_LOAN_SCHEDULE = LAMBDA(p, r, n, LET(...))"
  },
  {
    question: "In a multi-branch consolidation pipeline, which helper function is best suited for iteratively stacking filtered tables from multiple worksheets?",
    shortAnswer: "REDUCE combined with VSTACK and DROP (e.g. `=DROP(REDUCE(\"\", SheetList, LAMBDA(acc, s, VSTACK(acc, INDIRECT(s)))), 1)`).",
    explanation: "Folds arbitrary numbers of worksheet tables into a unified master dataset dynamically.",
    hint: "REDUCE + VSTACK + DROP.",
    level: "advanced",
    codeExample: "DROP(REDUCE(\"\", Sheets, LAMBDA(a, s, VSTACK(a, INDIRECT(s)))), 1)"
  },
  {
    question: "When evaluating complex multi-condition employee bonus tiers based on 3 criteria across 500 rows, which helper engine should you deploy?",
    shortAnswer: "MAP with 3 parallel column vectors and a 3-parameter LAMBDA.",
    explanation: "MAP preserves row-by-row granularity for non-vectorized logical operators like AND/OR.",
    hint: "MAP with parallel column vectors.",
    level: "moderate",
    codeExample: "=MAP(DaysCol, ScoreCol, TargetCol, LAMBDA(d, s, t, IF(AND(d>=25, s>=90, t>=100), \"Tier-1\", \"Standard\")))"
  },
  {
    question: "Why should corporate financial functions embed local variable caching with LET?",
    shortAnswer: "To evaluate heavy sub-expressions (e.g. loan power factors or remote XLOOKUP queries) exactly once in volatile RAM, eliminating redundant CPU cycles and guaranteeing sub-millisecond execution.",
    explanation: "Transforms complex formulas into high-performance, maintainable pipelines.",
    hint: "Single RAM evaluation + zero redundant recalculations.",
    level: "basic",
    codeExample: "LET(rate, r/12, factor, (1+rate)^n, p*rate*factor/(factor-1))"
  },
  {
    question: "How do you calculate a multi-column weighted student grade average and attach the result as a new column to the source gradebook in 1 formula?",
    shortAnswer: "=HSTACK(GradebookGrid, BYROW(GradebookGrid, LAMBDA(r, SUMPRODUCT(r, WeightsConstant))))",
    explanation: "BYROW computes the 1D weighted average vector, and HSTACK appends it horizontally to the gradebook grid.",
    hint: "HSTACK(Grid, BYROW(Grid, LAMBDA(r, SUMPRODUCT(r, weights)))).",
    level: "advanced",
    codeExample: "=HSTACK(C5:F9, BYROW(C5:F9, LAMBDA(r, SUMPRODUCT(r, {0.2, 0.3, 0.25, 0.25}))))"
  },
  {
    question: "How do you compute an automated bottom summary total row for a monthly sales matrix in a single formula?",
    shortAnswer: "=VSTACK(SalesMatrix, BYCOL(SalesMatrix, LAMBDA(c, SUM(c))))",
    explanation: "BYCOL computes the 1D horizontal row vector of column sums, and VSTACK appends it underneath the data grid.",
    hint: "VSTACK(Matrix, BYCOL(Matrix, LAMBDA(c, SUM(c)))).",
    level: "advanced",
    codeExample: "=VSTACK(C5:F8, BYCOL(C5:F8, LAMBDA(c, SUM(c))))"
  },
  {
    question: "What is the key difference between SCAN and REDUCE when building an inventory stock ledger?",
    shortAnswer: "SCAN returns the full progressive running stock balance after each transaction (M x 1 array); REDUCE returns only the single final ending stock balance (1 scalar).",
    explanation: "SCAN is for tracking balance history; REDUCE is for final net summary.",
    hint: "SCAN tracks balance history; REDUCE returns ending balance.",
    level: "basic",
    codeExample: "SCAN (History Vector) vs REDUCE (Ending Stock Scalar)"
  },
  {
    question: "How do you generate a 2D loan repayment sensitivity matrix across 5 interest rates (columns) and 10 tenures (rows) using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(10, 5, LAMBDA(r, c, ROUND(PMT(INDEX(Rates, c)/12, r*12, -LoanAmount), 0)))",
    explanation: "Evaluates coordinate pairs (r, c) dynamically to populate the entire scenario grid in RAM.",
    hint: "MAKEARRAY(10, 5, LAMBDA(r, c, PMT(...))).",
    level: "expert",
    codeExample: "=MAKEARRAY(10, 5, LAMBDA(r, c, PMT(INDEX(Rates,c)/12, r*12, -500000)))"
  },
  {
    question: "How do you traverse an organizational reporting structure to find the top CEO using a Recursive LAMBDA?",
    shortAnswer: "=LAMBDA(empID, LET(mgr, XLOOKUP(empID, IDCol, MgrCol), IF(OR(mgr=\"\", mgr=empID), empID, FX_FIND_CEO(mgr))))",
    explanation: "Climbs manager IDs recursively until reaching the top root executive whose manager is empty or self-referential.",
    hint: "Recurse upwards through manager IDs until reaching the root.",
    level: "expert",
    codeExample: "FX_FIND_CEO = LAMBDA(id, LET(m, XLOOKUP(id, IDs, Mgrs), IF(OR(m=\"\",m=id), id, FX_FIND_CEO(m))))"
  },
  {
    question: "What naming convention should all functions in the Capstone corporate library follow?",
    shortAnswer: "Hierarchical domain-based prefixes: `FX_FIN_` for Finance, `FX_TAX_` for Taxation, `FX_HR_` for Human Resources, and `FX_STR_` for String Utilities.",
    explanation: "Prevents naming collisions with future Excel keywords and clusters functions alphabetically in autocomplete.",
    hint: "Hierarchical domain prefixes: FX_FIN_, FX_TAX_, FX_HR_.",
    level: "basic",
    codeExample: "FX_[DOMAIN]_[ACTION]_[ENTITY]"
  },
  {
    question: "What is the maximum recursion depth limit in Excel 365, and how do you protect corporate recursive functions against circular reference crashes?",
    shortAnswer: "1,024 stack frames. Protect by providing an optional `[maxDepth]` parameter with a default limit (e.g. 20) and decrementing it on each recursive call.",
    explanation: "Terminates safely if `depth <= 0`, preventing #NUM! stack overflow errors.",
    hint: "1,024 frame limit + optional maxDepth decrementing limiter.",
    level: "expert",
    codeExample: "LAMBDA(id, [maxDepth], LET(d, IF(ISOMITTED(maxDepth), 20, maxDepth), ...))"
  },
  {
    question: "How do you provide IntelliSense documentation and parameter hints for custom LAMBDA functions?",
    shortAnswer: "By entering parameter descriptions in the 'Comment' field in Name Manager or using code docstrings in the Advanced Formula Environment (AFE).",
    explanation: "Excel displays these comments in the formula autocomplete tooltip as users type.",
    hint: "Enter descriptions in Name Manager Comment field.",
    level: "basic",
    codeExample: "Comment: Calculates net salary after statutory TDS and PF deductions"
  },
  {
    question: "How do you handle optional parameters in corporate LAMBDAs so that omitted arguments take default values?",
    shortAnswer: "Declare the parameter in Name Manager and use `IF(ISOMITTED(param), defaultValue, param)` inside the function body.",
    explanation: "Allows users to call functions with fewer arguments without triggering #VALUE! errors.",
    hint: "IF(ISOMITTED(param), default, param).",
    level: "moderate",
    codeExample: "rate, IF(ISOMITTED(tax_rate), 0.18, tax_rate)"
  },
  {
    question: "What error occurs if an analyst tries to pass an in-cell LAMBDA that references itself without registering it in Name Manager?",
    shortAnswer: "#NAME? error.",
    explanation: "Self-referencing recursion requires a defined name in Name Manager to resolve the call identifier.",
    hint: "Unregistered recursive calls trigger #NAME!.",
    level: "basic",
    codeExample: "#NAME?"
  },
  {
    question: "How do you perform defensive type validation inside corporate LAMBDAs to prevent cryptic errors?",
    shortAnswer: "Use `IF(NOT(ISNUMBER(x)), \"ERROR: Input must be numeric\", ...)` to catch invalid data types at the parameter boundary.",
    explanation: "Returns descriptive error messages rather than silent formula corruptions.",
    hint: "Validate input types with ISNUMBER / ISNONTEXT.",
    level: "moderate",
    codeExample: "IF(NOT(ISNUMBER(principal)), \"ERROR: Principal must be numeric\", calc)"
  },
  {
    question: "How do you chain multiple text sanitization operations across thousands of customer records in 1 formula without nested SUBSTITUTE calls?",
    shortAnswer: "=REDUCE(RawTextRange, {\"-\", \"/\", \"(\", \")\", \" \", \"+91\"}, LAMBDA(t, c, SUBSTITUTE(t, c, \"\")))",
    explanation: "Iterates through the array of dirty characters, applying SUBSTITUTE sequentially in 1 clean line.",
    hint: "REDUCE with array constant of dirty characters.",
    level: "advanced",
    codeExample: "=REDUCE(A2:A50, {\"-\", \".\", \" \"}, LAMBDA(t, c, SUBSTITUTE(t, c, \"\")))"
  },
  {
    question: "How does the Pure Function Principle apply to corporate spreadsheet libraries?",
    shortAnswer: "A pure corporate LAMBDA must operate strictly on passed input arguments and must never contain hard-coded worksheet cell references (like `A1` or `Sheet1!B5`).",
    explanation: "Guarantees that the function can be reused across any sheet or workbook in the company without broken references.",
    hint: "Zero hard-coded cell references; operate only on input parameters.",
    level: "expert",
    codeExample: "Pure Function Principle: Inputs &rarr; Calculation &rarr; Output"
  },
  {
    question: "How do you export a corporate LAMBDA library for company-wide distribution?",
    shortAnswer: "Save a Master Template workbook (.xltx) with all defined names, create an Excel Add-in (.xlam), or export plain-text modules from the Advanced Formula Environment (AFE).",
    explanation: "Enables frictionless deployment across enterprise finance and operations teams.",
    hint: "Master Template (.xltx), Excel Add-in (.xlam), or AFE text modules.",
    level: "moderate",
    codeExample: "Corporate_Master_Library_v3.0.xltx"
  },
  {
    question: "How do you calculate running drawdown (peak minus current balance) in a financial portfolio using two successive SCAN passes?",
    shortAnswer: "=LET(bal, SCAN(100k, Returns, LAMBDA(a, r, a + r)), peak, SCAN(100k, bal, LAMBDA(m, v, MAX(m, v))), peak - bal)",
    explanation: "Computes running balance first, then running peak, and subtracts to yield instantaneous portfolio drawdown.",
    hint: "Two-pass SCAN architecture: balance and peak.",
    level: "expert",
    codeExample: "Two-Pass SCAN Drawdown Pipeline"
  },
  {
    question: "What is the execution time complexity of SCAN compared to traditional dragged cumulative formulas like `=SUM($A$1:A1)` across 100,000 rows?",
    shortAnswer: "SCAN runs in O(N) linear time (~15ms); dragged SUM formulas run in O(N^2) quadratic time (~45s or freezes Excel).",
    explanation: "SCAN eliminates 5 billion redundant cell additions in pure C++ RAM.",
    hint: "O(N) linear time vs O(N^2) quadratic time.",
    level: "expert",
    codeExample: "O(N) 15ms vs O(N^2) 45s (50,000x Speedup)"
  },
  {
    question: "How do you generate an upper triangular matrix of size 6x6 using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(6, 6, LAMBDA(r, c, IF(c >= r, 1, 0)))",
    explanation: "Checks if column index `c` is greater than or equal to row index `r`.",
    hint: "IF(c >= r, 1, 0) inside MAKEARRAY.",
    level: "moderate",
    codeExample: "=MAKEARRAY(6, 6, LAMBDA(r, c, IF(c>=r, 1, 0)))"
  },
  {
    question: "How do you count how many subjects each candidate scored &ge; 75 in across a 500-student examination matrix?",
    shortAnswer: "=BYROW(ScoresMatrix, LAMBDA(r, SUM(--(r >= 75))))",
    explanation: "Evaluates the condition per row vector and sums the boolean matches in a single spilled column.",
    hint: "BYROW(Matrix, LAMBDA(r, SUM(--(r >= 75)))).",
    level: "moderate",
    codeExample: "=BYROW(C5:F500, LAMBDA(r, SUM(--(r>=75))))"
  },
  {
    question: "How do you calculate the column variance across 12 monthly revenue columns using BYCOL?",
    shortAnswer: "=BYCOL(RevenueMatrix, LAMBDA(c, VAR.S(c)))",
    explanation: "Passes each monthly vertical column vector to the sample variance function, returning a horizontal row vector.",
    hint: "BYCOL(Matrix, LAMBDA(c, VAR.S(c))).",
    level: "moderate",
    codeExample: "=BYCOL(C5:N50, LAMBDA(c, VAR.S(c)))"
  },
  {
    question: "What happens if a custom LAMBDA inside REDUCE or SCAN returns a 2D array instead of a single scalar?",
    shortAnswer: "#CALC! error.",
    explanation: "Excel's accumulator functions require the intermediate state to be a single scalar (unless assembling via VSTACK/HSTACK in outer expressions).",
    hint: "Nested arrays trigger #CALC!.",
    level: "moderate",
    codeExample: "#CALC!"
  },
  {
    question: "How do you verify whether a newly deployed corporate LAMBDA causes regression errors in existing financial models?",
    shortAnswer: "Build an automated regression test sheet comparing old vs new formula outputs across hundreds of boundary conditions using `=EXACT(OldFormula, NewLAMBDA)`.",
    explanation: "Automated regression testing guarantees 100% mathematical backwards compatibility.",
    hint: "Automated regression test sheet with boundary cases.",
    level: "advanced",
    codeExample: "ASSERT(FX_NEW(inputs) == ExpectedOutput)"
  },
  {
    question: "How do you format multi-line LAMBDA and LET formulas inside the Excel Formula Bar for maximum readability?",
    shortAnswer: "Press <kbd>Alt + Enter</kbd> to insert line breaks and use multiple spaces for indentation.",
    explanation: "Formats complex formulas like clean, readable software source code.",
    hint: "Alt + Enter for line breaks in Formula Bar.",
    level: "basic",
    codeExample: "Alt + Enter Line Indentation"
  },
  {
    question: "Can corporate LAMBDAs be shared across Mac, Windows, and Excel for the Web environments?",
    shortAnswer: "Yes, once registered in Name Manager, custom LAMBDAs run natively across all platforms supporting Microsoft 365 Dynamic Arrays.",
    explanation: "100% cross-platform cloud compatibility.",
    hint: "Full cross-platform compatibility across Windows, Mac, and Web.",
    level: "basic",
    codeExample: "Native Cross-Platform Cloud Execution"
  },
  {
    question: "How do you test and evaluate intermediate values of a LAMBDA formula during debugging?",
    shortAnswer: "Highlight the expression in the formula bar and press <kbd>F9</kbd> to evaluate it in RAM.",
    explanation: "F9 renders intermediate array structures in memory for instant verification.",
    hint: "Press F9 on highlighted formula expressions.",
    level: "basic",
    codeExample: "F9 Memory Evaluation"
  },
  {
    question: "What is Instructor Sukanta Hui's Capstone Graduation Directive for Master Spreadsheet Engineers?",
    shortAnswer: "Congratulations! You have mastered the modern functional architecture of Microsoft Excel 365. Always architect your spreadsheets as robust software systems: write pure custom LAMBDAs, optimize memory with LET, harness higher-order helper engines (MAP, BYROW, BYCOL, MAKEARRAY, SCAN, REDUCE), enforce corporate prefixes and documentation, and maintain your function libraries with 100% mathematical rigor!",
    explanation: "You have transitioned from a traditional spreadsheet user into an Advanced Financial & Quantitative Spreadsheet Architect!",
    hint: "Architect spreadsheets as robust, audited functional software systems!",
    level: "expert",
    codeExample: "Mastery: Excel 365 Functional Architecture & Enterprise Engineering Certified!"
  }
];

export default questions;
