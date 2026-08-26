// topic1_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 1
// Topic: LAMBDA syntax: Parameters, Calculation expressions, and immediate execution syntax `(LAMBDA(x, x*2)(5))`
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the exact syntax signature of the LAMBDA function in Excel 365?",
    shortAnswer: "=LAMBDA([parameter1, parameter2, ...], calculation)",
    explanation: "LAMBDA takes zero or more parameter identifiers (up to 253) and terminates with a final calculation expression that determines the returned output.",
    hint: "Parameter identifiers followed by calculation expression.",
    level: "basic",
    codeExample: "=LAMBDA(x, y, x * y)"
  },
  {
    question: "Why is immediate execution syntax (e.g. `=(LAMBDA(x, x*2))(5)`) necessary when testing a LAMBDA in a grid cell?",
    shortAnswer: "Because an uninvoked LAMBDA has no input values and returns #CALC!, appending (5) passes the argument to execute the function in-place.",
    explanation: "Excel cells cannot render uncalled function definitions. Supplying arguments in trailing parentheses evaluates the LAMBDA immediately in the cell.",
    hint: "Passes arguments directly to the function pointer in the cell.",
    level: "basic",
    codeExample: "=(LAMBDA(p, q, p * q))(150, 4)"
  },
  {
    question: "What error appears if you enter =LAMBDA(x, x+10) into a cell without trailing argument parentheses?",
    shortAnswer: "#CALC! error.",
    explanation: "Excel flags naked uninvoked LAMBDA functions with a #CALC! error, indicating that the formula returned an un-evaluated function pointer.",
    hint: "Bare LAMBDAs return #CALC!.",
    level: "basic",
    codeExample: "#CALC!"
  },
  {
    question: "What is the maximum number of input parameters supported by a single LAMBDA function?",
    shortAnswer: "253 parameters.",
    explanation: "A LAMBDA definition supports up to 253 parameter names, with the 254th argument slot reserved for the calculation expression.",
    hint: "Up to 253 parameters.",
    level: "moderate",
    codeExample: "=LAMBDA(p1, p2, ... p253, calc)"
  },
  {
    question: "Can a LAMBDA function take zero parameters?",
    shortAnswer: "Yes, a nullary LAMBDA with 0 parameters takes only a calculation expression, e.g. =LAMBDA(TODAY()+7).",
    explanation: "Calling a 0-parameter LAMBDA requires empty parentheses: =(LAMBDA(TODAY()+7))().",
    hint: "Nullary LAMBDA with no parameters: =(LAMBDA(calc))().",
    level: "moderate",
    codeExample: "=(LAMBDA(PI() * 10^2))()"
  },
  {
    question: "How do you test a multi-parameter LAMBDA that takes price, quantity, and discount rate in an active cell?",
    shortAnswer: "=(LAMBDA(p, q, d, p * q * (1 - d)))(1000, 5, 0.10)",
    explanation: "The three test values (1000, 5, 0.10) are mapped positionally to parameters p, q, and d, returning 4500.",
    hint: "Map values positionally in trailing parentheses.",
    level: "basic",
    codeExample: "=(LAMBDA(p, q, d, p * q * (1 - d)))(C5, D5, E5)"
  },
  {
    question: "Can cell references be passed as arguments in immediate execution syntax?",
    shortAnswer: "Yes, you can write =(LAMBDA(x, y, x+y))(A2, B2) to evaluate values from worksheet cells directly.",
    explanation: "Cell references, numbers, text strings, and array ranges can all be passed as immediate arguments.",
    hint: "Pass cell coordinates like (A2, B2).",
    level: "basic",
    codeExample: "=(LAMBDA(a, b, a * b))(C2, D2)"
  },
  {
    question: "What naming conventions must be followed for LAMBDA parameter identifiers?",
    shortAnswer: "Parameters cannot contain spaces, cannot match cell references (e.g. A1, R1C1), cannot match native function names, and must start with a letter or underscore.",
    explanation: "Naming a parameter 'C2' or 'SUM' causes syntax parsing collisions. Use descriptive identifiers like 'price', 'unit_cost', or 'tax_rate'.",
    hint: "Avoid cell addresses and native function names.",
    level: "moderate",
    codeExample: "Valid: item_price | Invalid: C2, SUM, item price"
  },
  {
    question: "What happens if you supply 3 arguments to a LAMBDA that only defines 2 parameters?",
    shortAnswer: "Excel blocks entry with a 'Too many arguments' alert or returns a #VALUE! error.",
    explanation: "Non-optional argument counts must match the defined parameter signature exactly.",
    hint: "Argument count mismatch causes error.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "How does the F9 key aid in debugging immediate execution LAMBDA expressions?",
    shortAnswer: "Highlighting the formula in the formula bar and pressing F9 evaluates the function in RAM, showing the computed output immediately.",
    explanation: "F9 allows modelers to inspect intermediate calculation outputs and verify parameter mappings without leaving the formula bar.",
    hint: "Press F9 to evaluate formula segments in memory.",
    level: "basic",
    codeExample: "Highlight =(LAMBDA(...))(...) & press F9"
  },
  {
    question: "Can an immediate execution LAMBDA return a dynamic multi-cell spilled array?",
    shortAnswer: "Yes, if the calculation expression returns an array (e.g. HSTACK(x, x*0.18, x*1.18)), the result spills across multiple cells.",
    explanation: "LAMBDAs support both scalar and dynamic spilled matrix outputs.",
    hint: "Returns dynamic arrays when calculation uses stacking functions.",
    level: "basic",
    codeExample: "=(LAMBDA(net, HSTACK(net, net*0.18, net*1.18)))(50000)"
  },
  {
    question: "How does nesting LET inside an immediate execution LAMBDA optimize performance?",
    shortAnswer: "LET computes heavy sub-expressions once, assigning them to local variables that can be reused multiple times in the calculation.",
    explanation: "Writing =(LAMBDA(p, q, LET(sub, p*q, HSTACK(sub, sub*0.18)))) computes p*q only once in RAM.",
    hint: "Caches sub-calculations in LET variables.",
    level: "advanced",
    codeExample: "=(LAMBDA(p, q, LET(sub, p*q, HSTACK(sub, sub*0.18))))(100, 5)"
  },
  {
    question: "What is the difference between a LAMBDA parameter and a LET variable?",
    shortAnswer: "LAMBDA parameters receive external values passed by the caller; LET variables are declared internally inside the formula.",
    explanation: "Parameters represent external inputs; LET variables represent internal intermediate calculations.",
    hint: "External inputs (parameters) vs internal cached variables (LET).",
    level: "moderate",
    codeExample: "=LAMBDA(external_param, LET(internal_var, external_param*2, ...))"
  },
  {
    question: "Can an immediate execution LAMBDA accept dynamic spilled array anchors as inputs?",
    shortAnswer: "Yes, passing an anchor like (A2#) passes the entire dynamic array into the LAMBDA.",
    explanation: "LAMBDAs handle scalar values and array vectors with identical mathematical fidelity.",
    hint: "Pass spilled anchors like A2# into the argument block.",
    level: "basic",
    codeExample: "=(LAMBDA(arr, SUM(arr) * 1.18))(A2#)"
  },
  {
    question: "Why is immediate execution called 'In-Cell Function Prototyping'?",
    shortAnswer: "Because it allows analysts to test, debug, and refine custom functions on live worksheet data before committing them to Name Manager.",
    explanation: "Testing in cells prevents saving broken formulas into workbook-level defined names.",
    hint: "Live testing sandbox before Name Manager deployment.",
    level: "moderate",
    codeExample: "Sandbox Testing Phase"
  },
  {
    question: "How do you calculate compound interest using an immediate execution LAMBDA?",
    shortAnswer: "=(LAMBDA(P, r, n, t, P * (1 + r/n)^(n*t)))(100000, 0.08, 12, 5)",
    explanation: "Evaluates standard financial compound interest: Principal * (1 + rate/compound_freq)^(freq * years).",
    hint: "Pass Principal, Rate, Compounds/Year, and Years.",
    level: "moderate",
    codeExample: "=(LAMBDA(P, r, n, t, P * (1 + r/n)^(n*t)))(100000, 0.08, 12, 5)"
  },
  {
    question: "Can an immediate execution LAMBDA incorporate logical branching with IF or IFS?",
    shortAnswer: "Yes, standard conditional functions like IF, IFS, and SWITCH work seamlessly inside the calculation argument.",
    explanation: "Conditionals allow dynamic tiering, boundary capping, and status classifications.",
    hint: "Use IF / IFS inside calculation expression.",
    level: "basic",
    codeExample: "=(LAMBDA(score, IF(score>=90, \"A*\", IF(score>=80, \"A\", \"B\"))))(88)"
  },
  {
    question: "What happens if you omit the calculation expression in a LAMBDA definition?",
    shortAnswer: "Excel flags a syntax error because the calculation expression is strictly mandatory.",
    explanation: "A LAMBDA must always possess at least 1 calculation argument to define what is returned.",
    hint: "Calculation expression is strictly mandatory.",
    level: "basic",
    codeExample: "Syntax Error: calculation expression missing"
  },
  {
    question: "How does Excel resolve parameter scope inside nested LAMBDAs?",
    shortAnswer: "Inner LAMBDAs have access to both their own parameters and outer parameters (lexical scoping / closures).",
    explanation: "In functional programming, nested closures retain access to variables in enclosing scopes.",
    hint: "Lexical scoping: inner closures access outer parameters.",
    level: "expert",
    codeExample: "=LAMBDA(x, LAMBDA(y, x + y))"
  },
  {
    question: "Can text concatenation operators (&) be used inside a LAMBDA calculation expression?",
    shortAnswer: "Yes, strings, numbers, dates, and arrays can be concatenated and transformed seamlessly.",
    explanation: "LAMBDA supports all native Excel operators: +, -, *, /, ^, &, =, <>, etc.",
    hint: "Standard Excel operators are fully supported.",
    level: "basic",
    codeExample: "=(LAMBDA(first, last, last & \", \" & first))(\"Swadeep\", \"Banerjee\")"
  },
  {
    question: "How do you calculate the monthly mortgage EMI using an immediate execution LAMBDA?",
    shortAnswer: "=(LAMBDA(P, r, n, LET(m_rate, r/12, P * m_rate * (1+m_rate)^n / ((1+m_rate)^n - 1))))(500000, 0.085, 36)",
    explanation: "Calculates the exact monthly installment for a loan of ₹500,000 at 8.5% interest over 36 months.",
    hint: "Standard EMI formula wrapped in LAMBDA with LET.",
    level: "advanced",
    codeExample: "=(LAMBDA(P, r, n, LET(m, r/12, P*m*(1+m)^n/((1+m)^n-1))))(500000, 0.085, 36)"
  },
  {
    question: "What error occurs if you pass text into an immediate execution LAMBDA expecting numbers for multiplication?",
    shortAnswer: "#VALUE! error.",
    explanation: "Arithmetic operations on non-numeric text strings trigger standard #VALUE! errors.",
    hint: "Data type mismatch causes #VALUE!.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "Can an immediate execution LAMBDA call built-in financial functions like PMT, NPV, or XIRR?",
    shortAnswer: "Yes, all native Excel worksheet functions can be invoked inside the calculation expression.",
    explanation: "LAMBDA calculations have full access to Excel's 500+ built-in worksheet functions.",
    hint: "Full access to built-in Excel function library.",
    level: "moderate",
    codeExample: "=(LAMBDA(rate, nper, pv, -PMT(rate/12, nper, pv)))(0.085, 36, 500000)"
  },
  {
    question: "How does LAMBDA parameter evaluation order operate in Excel?",
    shortAnswer: "Parameters are evaluated from left to right as arguments are passed positionally into the call block.",
    explanation: "Arg 1 maps to Param 1, Arg 2 maps to Param 2, and so forth.",
    hint: "Positional left-to-right argument binding.",
    level: "basic",
    codeExample: "Left-to-right positional mapping"
  },
  {
    question: "How can you unroll an immediate execution LAMBDA to calculate both Area and Perimeter of a rectangle?",
    shortAnswer: "=(LAMBDA(length, width, HSTACK(length * width, 2 * (length + width))))(15, 8)",
    explanation: "HSTACK returns [120, 46] across two adjacent spilled columns.",
    hint: "Return multiple calculated metrics using HSTACK.",
    level: "moderate",
    codeExample: "=(LAMBDA(l, w, HSTACK(l*w, 2*(l+w))))(15, 8)"
  },
  {
    question: "Why does immediate execution syntax eliminate the need to create throwaway macro modules in VBA?",
    shortAnswer: "Because custom logic can be written, tested, and executed immediately within standard formula cells without saving macro-enabled workbooks.",
    explanation: "No VBA modules, no Developer tab, no macro security warnings.",
    hint: "Zero VBA modules required for custom calculation testing.",
    level: "moderate",
    codeExample: "Pure worksheet formula prototyping"
  },
  {
    question: "What happens if a parameter identifier contains non-ASCII characters or symbols (e.g. price$)?",
    shortAnswer: "Excel returns a formula syntax error because special characters are prohibited in parameter names.",
    explanation: "Parameter names must adhere strictly to Excel identifier rules (letters, numbers, underscores).",
    hint: "Special characters like $ are prohibited in parameter names.",
    level: "basic",
    codeExample: "Syntax Error on special symbols"
  },
  {
    question: "How do you calculate dynamic invoice margin percentage using an immediate execution LAMBDA?",
    shortAnswer: "=(LAMBDA(sell_price, cost_price, (sell_price - cost_price) / sell_price))(12500, 9500)",
    explanation: "Returns the gross profit margin percentage: (12500 - 9500) / 12500 = 0.24 (24%).",
    hint: "(Sell - Cost) / Sell wrapped in LAMBDA.",
    level: "basic",
    codeExample: "=(LAMBDA(s, c, (s - c) / s))(12500, 9500)"
  },
  {
    question: "Can an immediate execution LAMBDA be nested inside another worksheet function like SUM or AVERAGE?",
    shortAnswer: "Yes, you can write =SUM((LAMBDA(x, x*1.18))(A2:A10)).",
    explanation: "The returned value or array from the immediate execution block passes seamlessly into outer functions.",
    hint: "Passes returned output to enclosing functions.",
    level: "moderate",
    codeExample: "=SUM((LAMBDA(x, x * 1.18))(A2:A10))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for LAMBDA syntax and immediate execution?",
    shortAnswer: "Never save a LAMBDA to Name Manager before proving it in a live cell with immediate execution syntax `(LAMBDA(...)(...))` on real corporate test numbers.",
    explanation: "Immediate execution syntax provides a zero-risk sandbox to inspect formula logic, verify edge cases, and ensure proper data types before publishing custom functions organization-wide!",
    hint: "Prove in cell with immediate execution before publishing to Name Manager.",
    level: "expert",
    codeExample: "Rule: Prototype in cell &rarr; Test with (args) &rarr; Publish to Name Manager"
  }
];

export default questions;
