// topic11_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 11
// Topic: Aggregation algorithms: Custom multi-step reductions with REDUCE
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of REDUCE in modern Excel 365?",
    shortAnswer: "To iterate through an array, applying a custom 2-parameter accumulator LAMBDA(accumulator, value) at each step and returning only the single final collapsed result.",
    explanation: "REDUCE aggregates entire arrays into a single scalar value or a unified composite structure (e.g. consolidated table).",
    hint: "Collapses an array into a single accumulated final result.",
    level: "basic",
    codeExample: "=REDUCE(0, Array, LAMBDA(acc, val, acc + val))"
  },
  {
    question: "What is the syntax signature of the REDUCE function?",
    shortAnswer: "=REDUCE([initial_value], array, lambda)",
    explanation: "REDUCE accepts an optional initial value seed, an input array, and terminates with a 2-parameter LAMBDA(a, v).",
    hint: "Initial value, array, and 2-parameter LAMBDA.",
    level: "basic",
    codeExample: "=REDUCE(1, Returns, LAMBDA(acc, r, acc * (1 + r)))"
  },
  {
    question: "How many parameters must the LAMBDA passed to REDUCE declare?",
    shortAnswer: "Strictly 2 parameters: the first represents the running accumulator state, and the second represents the current array element.",
    explanation: "Excel feeds the accumulated value from the previous step as parameter 1 and current item as parameter 2.",
    hint: "Exactly 2 parameters: accumulator and value.",
    level: "basic",
    codeExample: "LAMBDA(accumulator, value, ...)"
  },
  {
    question: "How does REDUCE differ from SCAN?",
    shortAnswer: "SCAN returns an array of all intermediate progressive step states; REDUCE discards intermediate states and returns only the final accumulated value.",
    explanation: "SCAN is for running balances (array output); REDUCE is for final aggregations (single result).",
    hint: "SCAN returns intermediate array; REDUCE returns 1 final result.",
    level: "basic",
    codeExample: "SCAN (Spilled Array) vs REDUCE (Single Collapsed Result)"
  },
  {
    question: "How do you calculate the cumulative compounded growth multiplier of an investment portfolio using REDUCE?",
    shortAnswer: "=REDUCE(1, AnnualReturns, LAMBDA(acc, r, acc * (1 + r)))",
    explanation: "Compounds each annual rate `(1 + r)` onto the starting principal factor of 1, returning the final growth multiplier.",
    hint: "REDUCE(1, Returns, LAMBDA(a, r, a * (1 + r))).",
    level: "basic",
    codeExample: "=REDUCE(1, E5:E8, LAMBDA(a, r, a * (1 + r)))"
  },
  {
    question: "How can REDUCE iteratively stack multiple dynamic worksheet ranges into 1 unified table using VSTACK?",
    shortAnswer: "=REDUCE(Headers, SheetRanges, LAMBDA(acc, rng, VSTACK(acc, INDIRECT(rng))))",
    explanation: "Iterates through sheet names or range addresses, progressively appending each table underneath the accumulator.",
    hint: "Iterative VSTACK accumulation with REDUCE.",
    level: "expert",
    codeExample: "=REDUCE(A1:D1, {\"Barrackpore!A2:D20\", \"Shyamnagar!A2:D20\"}, LAMBDA(a, s, VSTACK(a, INDIRECT(s))))"
  },
  {
    question: "How do you perform chained multiple text replacements (e.g. stripping multiple unwanted characters) using REDUCE?",
    shortAnswer: "=REDUCE(RawText, {\"-\", \"/\", \"(\", \")\", \" \"}, LAMBDA(text, char, SUBSTITUTE(text, char, \"\")))",
    explanation: "Iterates through the array of characters, applying SUBSTITUTE sequentially to strip each character from the text string.",
    hint: "Chained SUBSTITUTE calls inside REDUCE.",
    level: "advanced",
    codeExample: "=REDUCE(A2, {\"-\", \".\", \" \"}, LAMBDA(t, c, SUBSTITUTE(t, c, \"\")))"
  },
  {
    question: "What happens if you omit the initial_value argument in REDUCE (e.g. `=REDUCE(, Array, LAMBDA(a, v, a + v))`)?",
    shortAnswer: "The initial value defaults to empty/0, and the first element is processed with accumulator = 0.",
    explanation: "Explicitly declaring the initial seed (e.g. 0 or 1) is best practice for deterministic results.",
    hint: "Defaults to 0/empty.",
    level: "moderate",
    codeExample: "=REDUCE(0, Arr, LAMBDA(a, v, a + v))"
  },
  {
    question: "How do you concatenate a column of text items into a single comma-separated sentence using REDUCE?",
    shortAnswer: "=REDUCE(\"\", WordsRange, LAMBDA(acc, w, IF(acc=\"\", w, acc & \", \" & w)))",
    explanation: "Iterates down the column, appending each word with a comma separator, returning 1 final string.",
    hint: "IF(acc=\"\", w, acc & \", \" & w) inside REDUCE.",
    level: "moderate",
    codeExample: "=REDUCE(\"\", A2:A10, LAMBDA(a, w, IF(a=\"\", w, a & \", \" & w)))"
  },
  {
    question: "How do you compute the greatest common divisor (GCD) of a list of numbers using REDUCE?",
    shortAnswer: "=REDUCE(FIRST(List), REST(List), LAMBDA(acc, n, GCD(acc, n)))",
    explanation: "Iteratively computes the GCD between the accumulated GCD and each successive number in the array.",
    hint: "GCD(acc, n) inside REDUCE.",
    level: "advanced",
    codeExample: "=REDUCE(INDEX(Arr,1), DROP(Arr,1), LAMBDA(a, n, GCD(a, n)))"
  },
  {
    question: "What is the return type of REDUCE when accumulating numeric values?",
    shortAnswer: "A single scalar numeric value.",
    explanation: "Unless accumulating arrays via VSTACK/HSTACK, REDUCE collapses the entire input into a single scalar.",
    hint: "Single scalar value.",
    level: "basic",
    codeExample: "Single Scalar Result"
  },
  {
    question: "Can an existing named LAMBDA in Name Manager be passed into REDUCE directly as the third argument?",
    shortAnswer: "Yes, you can write =REDUCE(0, Range, FX_CUSTOM_AGG) if FX_CUSTOM_AGG accepts 2 parameters.",
    explanation: "Named 2-parameter LAMBDAs act as first-class function pointers in higher-order helper engines.",
    hint: "Pass named 2-parameter LAMBDA identifier directly.",
    level: "advanced",
    codeExample: "=REDUCE(1, ReturnsList, FX_COMPOUND_GROWTH)"
  },
  {
    question: "What happens if the array passed to REDUCE is completely empty?",
    shortAnswer: "REDUCE returns the initial_value directly without executing the LAMBDA.",
    explanation: "If there are zero elements to iterate over, the seed state is returned immediately.",
    hint: "Returns initial_value without executing LAMBDA.",
    level: "moderate",
    codeExample: "Empty Array &rarr; initial_value"
  },
  {
    question: "How do you calculate the maximum value across a complex non-standard collection of ranges using REDUCE?",
    shortAnswer: "=REDUCE(-999999, Range, LAMBDA(acc, v, IF(v>acc, v, acc)))",
    explanation: "Tracks the highest element encountered across the array, returning the absolute maximum.",
    hint: "IF(v>acc, v, acc) inside REDUCE.",
    level: "basic",
    codeExample: "=REDUCE(0, B2:B50, LAMBDA(a, v, MAX(a, v)))"
  },
  {
    question: "Can LET be used inside the LAMBDA of a REDUCE function?",
    shortAnswer: "Yes, nesting LET inside REDUCE allows complex multi-variable calculations before updating the accumulator.",
    explanation: "Useful for performing intermediate tax discounting or currency conversion during each reduction step.",
    hint: "Nest LET inside REDUCE's LAMBDA.",
    level: "advanced",
    codeExample: "=REDUCE(0, Sales, LAMBDA(a, s, LET(net, s*0.82, a + net)))"
  },
  {
    question: "How do you test a REDUCE formula in memory using the F9 key?",
    shortAnswer: "Highlight =REDUCE(...) in the formula bar and press F9 to evaluate the final collapsed scalar or table in RAM.",
    explanation: "F9 renders the final reduced value directly in the formula bar for instant verification.",
    hint: "Highlight and press F9 in formula bar.",
    level: "basic",
    codeExample: "F9 Memory Evaluation"
  },
  {
    question: "How does REDUCE eliminate the need for nested SUBSTITUTE formulas (e.g. SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(...))))?",
    shortAnswer: "Instead of writing 10 nested SUBSTITUTE calls, REDUCE iterates through an array constant of characters, applying SUBSTITUTE cleanly in 1 readable line.",
    explanation: "Transforms complex deeply nested code into an elegant, maintainable functional pipeline.",
    hint: "Iterates through array constant of replacement tokens.",
    level: "expert",
    codeExample: "=REDUCE(A1, {\"@\", \"#\", \"$\", \"%\"}, LAMBDA(t, c, SUBSTITUTE(t, c, \"\")))"
  },
  {
    question: "What error occurs if the LAMBDA passed to REDUCE declares only 1 parameter?",
    shortAnswer: "#VALUE! error.",
    explanation: "REDUCE strictly requires a 2-parameter LAMBDA closure: LAMBDA(accumulator, value).",
    hint: "Parameter count mismatch triggers #VALUE!.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "How do you calculate the sum of squares across an array using REDUCE?",
    shortAnswer: "=REDUCE(0, NumbersRange, LAMBDA(acc, val, acc + val^2))",
    explanation: "Squares each element and accumulates the sum into the running accumulator.",
    hint: "acc + val^2 inside REDUCE.",
    level: "basic",
    codeExample: "=REDUCE(0, A1:A10, LAMBDA(a, v, a + v^2))"
  },
  {
    question: "How do you compute total portfolio fee deductions across varying tiered expense rates with REDUCE?",
    shortAnswer: "=REDUCE(0, Assets, LAMBDA(totFee, a, totFee + IF(a>1000000, a*0.01, a*0.015)))",
    explanation: "Evaluates fee tiers per asset and sums the total fee deductions into a single scalar.",
    hint: "Applies conditional fee tiering per asset inside REDUCE.",
    level: "moderate",
    codeExample: "=REDUCE(0, D5:D20, LAMBDA(a, v, a + v*0.01))"
  },
  {
    question: "Why does REDUCE calculate faster than legacy VBA aggregation loops?",
    shortAnswer: "Because REDUCE runs inside compiled multi-threaded C++ memory without COM interop or VBA execution engine overhead.",
    explanation: "Native C++ SIMD optimizations deliver sub-millisecond reduction speeds.",
    hint: "Compiled C++ memory execution without VBA COM overhead.",
    level: "expert",
    codeExample: "High-Performance C++ Reduction Engine"
  },
  {
    question: "How do you build a custom binary string to decimal integer converter using REDUCE?",
    shortAnswer: "=LET(bits, MID(BinStr, SEQUENCE(LEN(BinStr)), 1), REDUCE(0, bits, LAMBDA(acc, bit, acc*2 + NUMBERVALUE(bit))))",
    explanation: "Left-to-right Horner's method: doubles previous accumulator and adds the current binary bit.",
    hint: "Horner's polynomial algorithm: acc * 2 + bit.",
    level: "expert",
    codeExample: "Binary to Decimal Horner Reduction"
  },
  {
    question: "What happens if an error (#DIV/0! or #VALUE!) occurs during any step of REDUCE?",
    shortAnswer: "The entire REDUCE formula returns that error, as error propagation halts valid accumulation.",
    explanation: "Accumulator becomes contaminated by the error at that iteration.",
    hint: "Error contaminates accumulator and halts reduction.",
    level: "moderate",
    codeExample: "Error Contamination"
  },
  {
    question: "How do you defensively protect REDUCE from contaminated error values?",
    shortAnswer: "=REDUCE(0, Data, LAMBDA(acc, val, acc + IFERROR(val, 0)))",
    explanation: "IFERROR cleanses corrupt input values to 0, ensuring successful completion.",
    hint: "Wrap element in IFERROR(val, 0).",
    level: "moderate",
    codeExample: "=REDUCE(0, Range, LAMBDA(a, v, a + IFERROR(v, 0)))"
  },
  {
    question: "How do you calculate the geometric mean factor using REDUCE and PRODUCT?",
    shortAnswer: "=LET(n, ROWS(Returns), product, REDUCE(1, Returns, LAMBDA(a, r, a * (1 + r))), product^(1/n) - 1)",
    explanation: "Reduces returns into a compounded product, then calculates the nth root.",
    hint: "Compounds returns into product factor and takes nth root.",
    level: "advanced",
    codeExample: "Geometric Compounded Return Reduction"
  },
  {
    question: "Can REDUCE iterate across a 2D matrix rather than a 1D vector?",
    shortAnswer: "Yes, REDUCE iterates in row-major order (left-to-right, top-to-bottom) across 2D grids, reducing all elements into 1 final result.",
    explanation: "Evaluates every cell in the 2D matrix sequentially.",
    hint: "Row-major iteration across 2D matrices.",
    level: "moderate",
    codeExample: "=REDUCE(0, A1:D10, LAMBDA(a, v, a + v))"
  },
  {
    question: "How do you count the number of prime numbers in an array using REDUCE and a custom ISPRIME LAMBDA?",
    shortAnswer: "=REDUCE(0, NumbersList, LAMBDA(count, num, count + IF(FX_ISPRIME(num), 1, 0)))",
    explanation: "Tests each number with the custom prime testing LAMBDA and increments count.",
    hint: "count + IF(FX_ISPRIME(num), 1, 0) inside REDUCE.",
    level: "advanced",
    codeExample: "=REDUCE(0, A2:A50, LAMBDA(c, n, c + IF(IS_PRIME(n), 1, 0)))"
  },
  {
    question: "How can REDUCE reverse a text string character-by-character?",
    shortAnswer: "=LET(chars, MID(Text, SEQUENCE(LEN(Text)), 1), REDUCE(\"\", chars, LAMBDA(acc, c, c & acc)))",
    explanation: "Prepends each successive character in front of the accumulated string (c & acc).",
    hint: "Prepend character: c & acc inside REDUCE.",
    level: "advanced",
    codeExample: "=LET(c, MID(A1, SEQUENCE(LEN(A1)), 1), REDUCE(\"\", c, LAMBDA(a, x, x & a)))"
  },
  {
    question: "How does REDUCE dynamically stack filtered branch tables that contain varying row counts?",
    shortAnswer: "=DROP(REDUCE(\"\", BranchNames, LAMBDA(acc, b, VSTACK(acc, FILTER(INDIRECT(b & \"!A2:D100\"), INDIRECT(b & \"!A2:A100\")<>\"\")))), 1)",
    explanation: "Initializes with empty string, progressively VSTACKs filtered branch tables, and DROPs the initial seed row.",
    hint: "DROP(REDUCE(\"\", Sheets, LAMBDA(a, s, VSTACK(a, ...))), 1).",
    level: "expert",
    codeExample: "Dynamic Multi-Sheet Consolidation with DROP + REDUCE"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for the REDUCE helper function?",
    shortAnswer: "Whenever you need to collapse an array into a single compounded scalar, chain multiple text sanitizations, or dynamically consolidate multiple worksheet tables into 1 master dataset using VSTACK, always deploy REDUCE for clean, single-formula functional data pipelines!",
    explanation: "REDUCE is the ultimate higher-order folding engine in Excel 365, turning complex multi-step procedural algorithms and table consolidations into elegant, sub-millisecond functional pipelines!",
    hint: "Use REDUCE for custom multi-step reductions, text pipelines, and dynamic table consolidations.",
    level: "expert",
    codeExample: "Rule: Multi-Step Reductions & Table Folding &rarr; Use REDUCE!"
  }
];

export default questions;
