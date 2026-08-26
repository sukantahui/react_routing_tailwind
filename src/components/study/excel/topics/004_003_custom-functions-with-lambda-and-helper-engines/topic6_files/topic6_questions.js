// topic6_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 6
// Topic: Iterating across arrays element-by-element with the MAP function
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of MAP in Excel 365's Helper Function Engine?",
    shortAnswer: "To iterate element-by-element across one or more arrays, applying a custom LAMBDA function to each individual element and returning an array of transformed results.",
    explanation: "MAP applies a transformation function to every item in an array, preserving the exact dimensions (rows x columns) of the input array.",
    hint: "Element-by-element transformation across arrays.",
    level: "basic",
    codeExample: "=MAP(Array1, LAMBDA(x, x * 2))"
  },
  {
    question: "What is the syntax signature of the MAP function?",
    shortAnswer: "=MAP(array1, [array2, ...], lambda)",
    explanation: "MAP takes one or more arrays of identical dimensions and terminates with a LAMBDA function whose parameter count matches the number of passed arrays.",
    hint: "One or more arrays followed by a matching LAMBDA.",
    level: "basic",
    codeExample: "=MAP(array1, array2, LAMBDA(a, b, a * (1 + b)))"
  },
  {
    question: "What rule governs the parameter count of the LAMBDA passed into MAP?",
    shortAnswer: "The LAMBDA must declare exactly as many parameters as the number of arrays passed into MAP.",
    explanation: "If you pass 2 arrays into MAP, the LAMBDA must have 2 parameters: =MAP(arr1, arr2, LAMBDA(a, b, ...)).",
    hint: "Parameter count must equal the number of input arrays.",
    level: "basic",
    codeExample: "2 Arrays &rarr; LAMBDA(a, b, ...)"
  },
  {
    question: "What happens if you pass arrays of mismatched dimensions into MAP (e.g. a 5-row array and a 10-row array)?",
    shortAnswer: "#VALUE! error.",
    explanation: "All arrays supplied to MAP must have identical dimensions (same row height and column width).",
    hint: "Dimension mismatch triggers #VALUE!.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "What are the output dimensions of an array returned by MAP?",
    shortAnswer: "Identical to the dimensions of the input array(s).",
    explanation: "If the input is a 5x4 matrix, MAP returns a 5x4 matrix where cell (i, j) contains the transformed result of cell (i, j).",
    hint: "Output dimensions match input dimensions exactly.",
    level: "basic",
    codeExample: "Input (5x4) &rarr; Output (5x4)"
  },
  {
    question: "How do you evaluate staff bonus tiers based on Attendance Days and Performance Score using MAP?",
    shortAnswer: "=MAP(AttendanceRange, ScoreRange, LAMBDA(days, score, IF(AND(days>=25, score>=90), \"Tier-1 Bonus\", \"Standard\")))",
    explanation: "MAP pairs each staff member's days and score, evaluating the conditional logic per person without formula dragging.",
    hint: "Pair two parallel vectors in MAP.",
    level: "moderate",
    codeExample: "=MAP(E5:E9, F5:F9, LAMBDA(d, s, IF(AND(d>=25, s>=90), \"Tier-1\", \"Standard\")))"
  },
  {
    question: "How does MAP differ from BYROW and BYCOL?",
    shortAnswer: "MAP processes elements individually (scalar by scalar); BYROW and BYCOL process entire row or column vectors at once.",
    explanation: "MAP is element-wise; BYROW/BYCOL are vector-wise aggregators.",
    hint: "MAP is scalar element-by-element; BYROW/BYCOL are vector aggregators.",
    level: "moderate",
    codeExample: "MAP (Scalar by Scalar) vs BYROW (Row Vector)"
  },
  {
    question: "Can MAP iterate across a 2D matrix rather than just a 1D column vector?",
    shortAnswer: "Yes, MAP iterates across all rows and columns of 2D grids, applying the LAMBDA to each coordinate cell.",
    explanation: "For example, =MAP(Matrix, LAMBDA(x, UPPER(x))) converts every cell in a 10x10 grid to uppercase.",
    hint: "Works across 1D vectors and 2D matrices alike.",
    level: "moderate",
    codeExample: "=MAP(A1:D10, LAMBDA(c, IF(c<0, 0, c)))"
  },
  {
    question: "What is the maximum number of arrays that can be passed into a single MAP function?",
    shortAnswer: "Up to 253 arrays (corresponding to LAMBDA's 253 parameter limit).",
    explanation: "MAP supports multi-array transformations across up to 253 parallel arrays.",
    hint: "Up to 253 arrays.",
    level: "moderate",
    codeExample: "Max 253 parallel arrays"
  },
  {
    question: "How does MAP eliminate the need to drag formula copy-paste down 10,000 rows?",
    shortAnswer: "A single formula in the top-left cell processes the entire range and dynamically spills the calculated results down all 10,000 rows.",
    explanation: "Dynamic array spilling eliminates manual fill handles, formula inconsistencies, and broken dragged ranges.",
    hint: "Single formula spills across all rows automatically.",
    level: "basic",
    codeExample: "Dynamic Spilling Architecture"
  },
  {
    question: "How can you cap negative values in a financial ledger at 0 using MAP?",
    shortAnswer: "=MAP(LedgerRange, LAMBDA(x, IF(x<0, 0, x)))",
    explanation: "Iterates through each cell in LedgerRange, replacing negative values with 0 and retaining positive numbers.",
    hint: "IF(x<0, 0, x) inside MAP.",
    level: "basic",
    codeExample: "=MAP(B2:E20, LAMBDA(x, MAX(0, x)))"
  },
  {
    question: "Can MAP apply text transformation functions like PROPER, TRIM, or SUBSTITUTE across an entire table range?",
    shortAnswer: "Yes, MAP allows functions that normally only accept single cells to be applied across entire multi-column ranges.",
    explanation: "Wrapping single-cell text functions in MAP enables full dynamic array vectorization.",
    hint: "Vectorizes single-cell functions across multi-cell ranges.",
    level: "moderate",
    codeExample: "=MAP(A2:D50, LAMBDA(txt, TRIM(CLEAN(txt))))"
  },
  {
    question: "What error occurs if the final argument passed to MAP is not a valid LAMBDA function?",
    shortAnswer: "#VALUE! error.",
    explanation: "MAP strictly requires its final argument to be a callable LAMBDA function closure.",
    hint: "Final argument must be a LAMBDA.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "How does MAP combine First Name and Last Name columns with custom title prefixes?",
    shortAnswer: "=MAP(Titles, FirstNames, LastNames, LAMBDA(t, f, l, t & \" \" & f & \" \" & l))",
    explanation: "Passes 3 parallel column vectors into a 3-parameter LAMBDA, returning formatted full names.",
    hint: "Pass 3 column vectors into MAP.",
    level: "basic",
    codeExample: "=MAP(A2:A10, B2:B10, C2:C10, LAMBDA(t, f, l, t & \". \" & f & \" \" & l))"
  },
  {
    question: "Can an existing named LAMBDA in Name Manager be passed into MAP directly as the final argument?",
    shortAnswer: "Yes, you can write =MAP(Range, FX_CUSTOM_FUNC) without re-writing the LAMBDA declaration.",
    explanation: "In Excel's functional engine, named LAMBDAs act as first-class function pointers.",
    hint: "Pass named LAMBDA identifier directly into MAP.",
    level: "advanced",
    codeExample: "=MAP(Prices, FX_APPLY_TAX)"
  },
  {
    question: "What happens if destination cells in the spill zone of MAP contain existing text or numbers?",
    shortAnswer: "#SPILL! error.",
    explanation: "Like all dynamic array functions, MAP requires an unobstructed spill area.",
    hint: "Blocked output footprint triggers #SPILL!.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How do you calculate compound interest for varying principals, rates, and tenures across 3 table columns using MAP?",
    shortAnswer: "=MAP(Principals, Rates, Tenures, LAMBDA(p, r, t, p * (1 + r)^t))",
    explanation: "Evaluates the compound maturity equation for every row simultaneously.",
    hint: "Map Principal, Rate, and Tenure columns.",
    level: "moderate",
    codeExample: "=MAP(D5:D20, E5:E20, F5:F20, LAMBDA(p, r, t, p*(1+r)^t))"
  },
  {
    question: "Can MAP be combined with LET for multi-stage row calculations?",
    shortAnswer: "Yes, LET can enclose MAP, or LET can be declared inside the MAP's LAMBDA for element-level variable caching.",
    explanation: "Nesting LET inside MAP allows complex multi-step transformations on each individual element.",
    hint: "Nest LET inside the MAP LAMBDA.",
    level: "advanced",
    codeExample: "=MAP(A2:A20, LAMBDA(x, LET(sub, x*1.18, ROUND(sub, 0))))"
  },
  {
    question: "How does MAP handle blank cells in an input range?",
    shortAnswer: "Blank cells are passed into the LAMBDA parameter as 0 (for arithmetic) or empty strings \"\" (for text operations).",
    explanation: "Use IF(x=\"\", \"\", ...) inside the LAMBDA to preserve genuine blanks.",
    hint: "Preserve blanks with IF(x=\"\", \"\", calc).",
    level: "moderate",
    codeExample: "=MAP(A2:A20, LAMBDA(x, IF(x=\"\", \"\", x*2)))"
  },
  {
    question: "Why does MAP compute significantly faster than legacy array formulas entered with Ctrl+Shift+Enter?",
    shortAnswer: "Because MAP executes inside compiled multi-threaded C++ memory without legacy COM execution overhead.",
    explanation: "Modern helper engines utilize SIMD (Single Instruction Multiple Data) optimizations in RAM.",
    hint: "Compiled multi-threaded dynamic array execution.",
    level: "expert",
    codeExample: "C++ Multi-Threaded SIMD Execution"
  },
  {
    question: "How can you validate whether each date in a transaction column falls on a weekend using MAP?",
    shortAnswer: "=MAP(DatesVector, LAMBDA(dt, IF(WEEKDAY(dt, 2)>5, \"Weekend\", \"Weekday\")))",
    explanation: "WEEKDAY with return_type=2 treats Saturday (6) and Sunday (7) as >5.",
    hint: "Check WEEKDAY(dt, 2) > 5 inside MAP.",
    level: "moderate",
    codeExample: "=MAP(A2:A50, LAMBDA(d, IF(WEEKDAY(d,2)>5, \"Weekend\", \"Weekday\")))"
  },
  {
    question: "Can MAP return text strings of varying lengths across cells?",
    shortAnswer: "Yes, each element can return strings, numbers, dates, or booleans independently.",
    explanation: "MAP evaluates each element dynamically, adapting data types per cell.",
    hint: "Returns heterogeneous scalar outputs dynamically.",
    level: "basic",
    codeExample: "=MAP(Scores, LAMBDA(s, IF(s>=90, \"High Distinction\", \"Pass\")))"
  },
  {
    question: "What happens if you pass a dynamic spilled anchor (e.g. A2#) into MAP?",
    shortAnswer: "MAP dynamically resizes its output to match the dimensions of the spilled array anchor.",
    explanation: "If A2# grows from 10 to 50 rows, MAP automatically recalculates and spills 50 rows.",
    hint: "Auto-resizing dynamic array reactivity.",
    level: "basic",
    codeExample: "=MAP(A2#, LAMBDA(x, x * 1.18))"
  },
  {
    question: "How do you test a MAP formula with the F9 key?",
    shortAnswer: "Highlight =MAP(...) in the formula bar and press F9 to evaluate the spilled result array in memory.",
    explanation: "F9 renders the transformed matrix array in the formula bar for instant verification.",
    hint: "Press F9 on the MAP expression.",
    level: "basic",
    codeExample: "F9 Array Evaluation"
  },
  {
    question: "Can MAP be nested inside another dynamic array function like FILTER or SORT?",
    shortAnswer: "Yes, you can write =SORT(MAP(Range, LAMBDA(x, x*1.18)), 1, -1).",
    explanation: "The returned spilled array from MAP passes seamlessly into outer array manipulation functions.",
    hint: "Passes returned array directly to outer functions.",
    level: "moderate",
    codeExample: "=FILTER(Data, MAP(Scores, LAMBDA(s, s>=80)))"
  },
  {
    question: "How do you calculate GST amount only for invoices with taxable values over ₹50,000 using MAP?",
    shortAnswer: "=MAP(InvoiceAmounts, LAMBDA(amt, IF(amt>50000, amt * 0.18, 0)))",
    explanation: "Applies conditional tax calculation per invoice cell dynamically.",
    hint: "Conditional tax calculation inside MAP.",
    level: "basic",
    codeExample: "=MAP(C5:C20, LAMBDA(a, IF(a>50000, a*0.18, 0)))"
  },
  {
    question: "What is the key difference between applying a formula across a range directly (e.g. `=A1:A10*2`) vs using MAP?",
    shortAnswer: "Native array arithmetic works for simple math, but MAP is required when wrapping non-vectorized functions (like AND, OR, or custom multi-step LAMBDAs) that otherwise collapse arrays into a single value.",
    explanation: "Functions like AND(A1:A10>5) collapse the entire array into 1 boolean. MAP forces row-by-row evaluation.",
    hint: "MAP forces element-wise evaluation for functions that otherwise aggregate.",
    level: "expert",
    codeExample: "MAP preserves element-wise granularity for AND/OR"
  },
  {
    question: "How do you sanitize phone numbers across a 5,000-row column with MAP?",
    shortAnswer: "=MAP(PhonesRange, LAMBDA(p, TRIM(SUBSTITUTE(SUBSTITUTE(p, \"-\", \"\"), \" \", \"\"))))",
    explanation: "Iterates down the column, stripping hyphens and spaces from every phone record.",
    hint: "Applies string cleansing down the entire vector.",
    level: "moderate",
    codeExample: "=MAP(A2:A5000, LAMBDA(p, SUBSTITUTE(p, \"-\", \"\")))"
  },
  {
    question: "Can MAP return an array inside another array (nested arrays)?",
    shortAnswer: "No, Excel does not support arrays of arrays; the calculation inside MAP must return a single scalar value per element.",
    explanation: "Returning an array from inside MAP's LAMBDA causes a #CALC! or #VALUE! error. Use HSTACK/VSTACK outside MAP.",
    hint: "Each iteration must return a single scalar value.",
    level: "expert",
    codeExample: "Scalar return constraint per iteration"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for the MAP helper function?",
    shortAnswer: "Whenever you need to apply complex conditional logic, string sanitization, or non-vectorized functions across multiple columns simultaneously without dragging formulas, always use MAP with parallel array arguments!",
    explanation: "MAP provides the ultimate element-by-element transformation engine in Excel 365, turning multi-column matrix processing into an elegant, single-formula spilled architecture!",
    hint: "Use MAP for element-wise logic across parallel array vectors.",
    level: "expert",
    codeExample: "Rule: Multi-array element transformations &rarr; Use MAP!"
  }
];

export default questions;
