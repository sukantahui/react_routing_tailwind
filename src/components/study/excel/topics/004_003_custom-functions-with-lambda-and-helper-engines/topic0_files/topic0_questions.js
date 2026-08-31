// topic0_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 0
// Topic: Introduction to LAMBDA: Creating native reusable custom functions without VBA or macros
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the fundamental purpose of the LAMBDA function in modern Microsoft Excel?",
    shortAnswer: "It allows users to define custom, reusable mathematical and business functions using standard Excel formula syntax without VBA, macros, or JavaScript add-ins.",
    explanation: "LAMBDA turns Excel's formula engine into a Turing-complete functional programming language, enabling complex formulas to be packaged into named, reusable custom worksheet functions.",
    hint: "Creates native reusable custom worksheet functions without VBA.",
    level: "basic",
    codeExample: "=LAMBDA(x, y, x + y)"
  },
  {
    question: "What is the syntax signature of the LAMBDA function?",
    shortAnswer: "=LAMBDA([parameter1, parameter2, ...], calculation)",
    explanation: "LAMBDA accepts 0 to 253 optional parameter names followed by a final calculation expression that defines what the function computes and returns.",
    hint: "Parameter list followed by the calculation expression.",
    level: "basic",
    codeExample: "=LAMBDA(price, qty, price * qty)"
  },
  {
    question: "How does Excel make LAMBDA functional across the entire workbook?",
    shortAnswer: "By defining and naming the LAMBDA formula inside Excel Name Manager (Ctrl+F3).",
    explanation: "Once saved in Name Manager with a custom name (e.g. GROSS_PAY), users can invoke it in any worksheet cell just like a built-in native function (e.g. =GROSS_PAY(A2, B2)).",
    hint: "Register the LAMBDA in Name Manager.",
    level: "basic",
    codeExample: "Name: GROSS_SALARY | Refers To: =LAMBDA(b, da, b*(1+da))"
  },
  {
    question: "What is immediate execution syntax for testing a LAMBDA in an active cell?",
    shortAnswer: "Appending an argument call block in parentheses immediately after the LAMBDA definition: =(LAMBDA(x, x*2))(5).",
    explanation: "Because an uncalled LAMBDA returns a #CALC! error in a cell, appending (5) calls the function in-place and returns 10.",
    hint: "Pass test values in trailing parentheses immediately after the LAMBDA.",
    level: "basic",
    codeExample: "=(LAMBDA(x, y, x * y))(12, 5)"
  },
  {
    question: "What error appears if you enter a bare =LAMBDA(x, x*2) in a worksheet cell without arguments or Name Manager?",
    shortAnswer: "#CALC! error.",
    explanation: "Excel cannot display a raw function pointer in a grid cell without arguments to evaluate it, returning a #CALC! (nested function) error tag.",
    hint: "Returns #CALC! when uninvoked.",
    level: "basic",
    codeExample: "#CALC!"
  },
  {
    question: "What is the maximum number of parameters a single LAMBDA function can accept?",
    shortAnswer: "Up to 253 parameters.",
    explanation: "A LAMBDA function supports up to 253 input arguments, with the 254th argument reserved for the calculation expression.",
    hint: "Supports up to 253 parameters.",
    level: "moderate",
    codeExample: "Max: 253 parameters + 1 calculation"
  },
  {
    question: "How does LAMBDA compare to legacy VBA User Defined Functions (UDFs)?",
    shortAnswer: "LAMBDA is 100% macro-free, cross-platform (Web, Mac, Windows, iOS), calculates in compiled C++ RAM, and avoids corporate macro security blockades.",
    explanation: "VBA UDFs require macro-enabled workbooks (.xlsm), are disabled by IT security on many networks, and run slower due to COM automation overhead. LAMBDAs run natively in the calculation engine.",
    hint: "Macro-free, cross-platform, faster C++ execution.",
    level: "moderate",
    codeExample: "LAMBDA (Native) vs VBA (Macro)"
  },
  {
    question: "Which supporting functions form Excel's 'Helper Function Engine' designed to work with LAMBDAs?",
    shortAnswer: "MAP, SCAN, REDUCE, BYROW, BYCOL, and MAKEARRAY.",
    explanation: "These helper functions take arrays and LAMBDA functions as inputs to perform vector mapping, row/column aggregations, running accumulators, and grid generation.",
    hint: "MAP, SCAN, REDUCE, BYROW, BYCOL, MAKEARRAY.",
    level: "basic",
    codeExample: "=BYROW(Matrix, LAMBDA(r, SUM(r)))"
  },
  {
    question: "How does the LET function complement LAMBDA in custom function design?",
    shortAnswer: "LET creates locally scoped variables inside the LAMBDA, caching intermediate calculations in RAM and dramatically improving execution speed.",
    explanation: "Nesting LET inside LAMBDA prevents redundant recalculations of heavy formulas (e.g. repeated XLOOKUPs or compound interest factors).",
    hint: "Caches intermediate calculations in local variables.",
    level: "advanced",
    codeExample: "=LAMBDA(p, r, n, LET(rate, r/12, p * rate / (1 - (1+rate)^-n)))"
  },
  {
    question: "Can a LAMBDA function call itself recursively in Excel 365?",
    shortAnswer: "Yes, once registered in Name Manager, a LAMBDA can call itself to solve iterative algorithms, string cleansing, or nested traversals.",
    explanation: "Excel supports recursive LAMBDAs up to a maximum recursion stack depth of 1,024 calls, allowing pure formula loops.",
    hint: "Yes, recursive self-invocation is supported up to 1,024 levels.",
    level: "expert",
    codeExample: "FACTORIAL = LAMBDA(n, IF(n<=1, 1, n * FACTORIAL(n-1)))"
  },
  {
    question: "What is the maximum recursion depth allowed by Excel's calculation engine for recursive LAMBDAs?",
    shortAnswer: "1,024 recursive calls (or 16 internal stack limit for unoptimized loops).",
    explanation: "If a recursive function exceeds 1,024 calls without reaching its base termination condition, Excel halts execution with a #NUM! error.",
    hint: "Maximum 1,024 recursive stack depth.",
    level: "expert",
    codeExample: "#NUM! error on infinite recursion"
  },
  {
    question: "What naming rules apply when assigning a name to a LAMBDA function in Name Manager?",
    shortAnswer: "Names cannot collide with existing cell references (e.g. A1, R1C1) or native Excel functions (e.g. SUM, FILTER), cannot contain spaces, and must begin with a letter or underscore.",
    explanation: "Adhering to standard Excel identifier conventions prevents formula parsing ambiguities.",
    hint: "No spaces, cannot match cell addresses or existing function names.",
    level: "moderate",
    codeExample: "Valid: FX_GST_CALC | Invalid: C2, SUM, GST CALC"
  },
  {
    question: "How do you provide end-user documentation and argument tooltips for a custom LAMBDA in Excel?",
    shortAnswer: "By entering descriptive help text in the 'Comment' box inside Name Manager.",
    explanation: "Excel displays the Comment text in the formula autocomplete dropdown and tooltip whenever users type the function name.",
    hint: "Enter help text in the Name Manager Comment box.",
    level: "moderate",
    codeExample: "Comment: 'Calculates net GST and gross total for invoice amounts'"
  },
  {
    question: "Which function checks whether an optional parameter was omitted by the caller?",
    shortAnswer: "=ISOMITTED(parameter_name)",
    explanation: "ISOMITTED returns TRUE if the user left the argument empty, allowing IF or LET to assign a graceful default value.",
    hint: "ISOMITTED inspects parameter presence.",
    level: "basic",
    codeExample: "=LAMBDA(price, [disc], IF(ISOMITTED(disc), price, price * (1 - disc)))"
  },
  {
    question: "How do you designate an optional parameter in a LAMBDA definition?",
    shortAnswer: "By enclosing the parameter name in square brackets [ ] in the parameter list.",
    explanation: "For example, [discount_rate] signals to Excel that the user is not required to provide this argument.",
    hint: "Wrap optional parameters in square brackets [ ].",
    level: "basic",
    codeExample: "=LAMBDA(amount, [tax_rate], ...)"
  },
  {
    question: "How does LAMBDA enhance corporate governance and spreadsheet auditing?",
    shortAnswer: "By encapsulating proprietary calculations in a single verified location (Name Manager), eliminating duplicate formula errors across thousands of worksheet cells.",
    explanation: "If a corporate tax law changes, updating the formula once in Name Manager instantly updates all 10,000 dependent cells across the workbook.",
    hint: "Single point of maintenance for proprietary corporate logic.",
    level: "moderate",
    codeExample: "Update once in Name Manager → All cells update"
  },
  {
    question: "Can a LAMBDA function return a multi-cell dynamic spilled array?",
    shortAnswer: "Yes, a LAMBDA can return 1D vectors or 2D matrices using HSTACK, VSTACK, or dynamic array outputs.",
    explanation: "For example, a loan calculation LAMBDA can return [Monthly EMI, Total Interest, Total Payment] across 3 spilled columns.",
    hint: "Yes, LAMBDAs return dynamic spilled matrices.",
    level: "basic",
    codeExample: "=LAMBDA(p, r, n, HSTACK(P, P*r, P*(1+r)))"
  },
  {
    question: "What happens if a parameter name in a LAMBDA matches an existing worksheet defined name?",
    shortAnswer: "The LAMBDA parameter takes precedence inside the function's local scope (shadowing the outer name).",
    explanation: "Local parameters shadow outer workbook-level defined names within the execution block.",
    hint: "Local parameter shadows outer defined name.",
    level: "advanced",
    codeExample: "Local scope variable shadowing"
  },
  {
    question: "How can LAMBDA functions be shared across multiple workbooks in an enterprise?",
    shortAnswer: "By saving them in an Excel Template (.xltx), central Add-In (.xlam), or importing them via Advanced Formula Environment / Power BI semantic models.",
    explanation: "Corporate libraries allow standardized functions like =CORP_GST() or =CORP_AMORTIZE() to be consumed organization-wide.",
    hint: "Via .xlam Add-Ins, templates, or Advanced Formula Environment.",
    level: "advanced",
    codeExample: "Centralized Corporate Function Repository"
  },
  {
    question: "Why is an un-named LAMBDA called an 'Anonymous Function' in computer science?",
    shortAnswer: "Because it is defined in-place without a persistent identifier, executed immediately, and discarded after calculation.",
    explanation: "In functional programming, inline expressions like =(LAMBDA(x, x*2))(5) are classic anonymous closures.",
    hint: "An inline function without a declared name.",
    level: "moderate",
    codeExample: "Anonymous Closure: =(LAMBDA(x, x^2))(9)"
  },
  {
    question: "How does BYROW use a LAMBDA to calculate the weighted average of each row in a gradebook matrix?",
    shortAnswer: "=BYROW(ScoresMatrix, LAMBDA(r, SUMPRODUCT(r, WeightsVector)))",
    explanation: "BYROW passes each row vector 'r' sequentially into the LAMBDA, calculating the weighted sum for every student.",
    hint: "Passes each row vector into the LAMBDA.",
    level: "advanced",
    codeExample: "=BYROW(B2:E10, LAMBDA(r, AVERAGE(r)))"
  },
  {
    question: "How does BYCOL use a LAMBDA to find the highest value in each column of a quarterly sales grid?",
    shortAnswer: "=BYCOL(SalesGrid, LAMBDA(col, MAX(col)))",
    explanation: "BYCOL passes each column vector 'col' into the LAMBDA, returning a horizontal row of column maximums.",
    hint: "Passes each column vector into the LAMBDA.",
    level: "advanced",
    codeExample: "=BYCOL(B2:E10, LAMBDA(c, MAX(c)))"
  },
  {
    question: "How does MAKEARRAY use a LAMBDA with row and column index arguments (r, c)?",
    shortAnswer: "=MAKEARRAY(rows, cols, LAMBDA(r, c, calculation))",
    explanation: "MAKEARRAY generates a grid of specified dimensions, calling the LAMBDA with the 1-based row index (r) and column index (c) for every cell.",
    hint: "Evaluates LAMBDA(r, c) for each coordinate cell.",
    level: "moderate",
    codeExample: "=MAKEARRAY(5, 5, LAMBDA(r, c, r * c))"
  },
  {
    question: "How does SCAN use a LAMBDA to compute a running cumulative balance for a bank statement?",
    shortAnswer: "=SCAN(0, MovementVector, LAMBDA(accumulator, value, accumulator + value))",
    explanation: "SCAN maintains a running accumulator, passing the previous balance and current transaction value to the LAMBDA at each step.",
    hint: "Maintains running accumulator across stream elements.",
    level: "advanced",
    codeExample: "=SCAN(0, D2:D50, LAMBDA(acc, v, acc + v))"
  },
  {
    question: "How does REDUCE differ from SCAN in helper function processing?",
    shortAnswer: "REDUCE returns only a single final scalar value; SCAN returns an array of all intermediate running accumulator values.",
    explanation: "REDUCE collapses an array into one value (e.g. final string or sum). SCAN yields the full progressive vector.",
    hint: "REDUCE returns final scalar; SCAN returns running array.",
    level: "moderate",
    codeExample: "REDUCE (Single Scalar) vs SCAN (Progressive Array)"
  },
  {
    question: "Can LAMBDA functions be tested in the Formula Bar using the F9 key?",
    shortAnswer: "Yes, highlighting the immediate execution expression and pressing F9 evaluates the result in memory.",
    explanation: "Pressing F9 evaluates the LAMBDA call and displays the returned scalar or array in RAM.",
    hint: "Highlight formula and press F9 to evaluate.",
    level: "basic",
    codeExample: "F9 Step-Through Evaluation"
  },
  {
    question: "What happens if you pass an incorrect number of arguments to a named LAMBDA function?",
    shortAnswer: "Excel displays the standard 'Too few arguments' or 'Too many arguments' alert, or returns a #VALUE! error.",
    explanation: "Non-optional parameters must match the exact count defined in the LAMBDA signature.",
    hint: "Argument count mismatch causes formula error.",
    level: "basic",
    codeExample: "#VALUE! error on missing required arguments"
  },
  {
    question: "How does MAP apply a custom LAMBDA across two arrays of identical dimensions simultaneously?",
    shortAnswer: "=MAP(Array1, Array2, LAMBDA(a, b, a * (1 + b)))",
    explanation: "MAP pairs elements from Array1 and Array2 at coordinate (i, j) and passes them into parameters a and b.",
    hint: "Iterates across multiple parallel arrays element-by-element.",
    level: "advanced",
    codeExample: "=MAP(Prices, TaxRates, LAMBDA(p, t, p * (1 + t)))"
  },
  {
    question: "Why does LAMBDA make Excel a 'Turing-Complete' programming language?",
    shortAnswer: "Because it supports function abstraction, parameter binding, higher-order functions, and arbitrary recursion (looping).",
    explanation: "In 2021, Microsoft Research proved that with LAMBDA, any computable algorithm can now be implemented directly in native Excel formulas.",
    hint: "Supports functional abstraction and unbounded recursion.",
    level: "expert",
    codeExample: "Turing Completeness via LAMBDA Calculus"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for enterprise functional modeling with LAMBDA?",
    shortAnswer: "Always prototype and optimize complex logic inside LET with immediate execution syntax first, then register the verified LAMBDA in Name Manager with descriptive parameter comments.",
    explanation: "Prototyping in an active cell with immediate execution allows instant visual debugging with real data. Once validated, moving the formula to Name Manager encapsulates the business logic into a permanent, reusable asset for the entire organization!",
    hint: "Prototype in cell with LET & (LAMBDA()()), then register in Name Manager.",
    level: "expert",
    codeExample: "Workflow: Prototype in LET → Wrap in LAMBDA → Test with (args) → Save in Name Manager"
  }
];

export default questions;
