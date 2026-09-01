const questions = [
  {
    question: "What is the primary objective of Advanced Aggregation Design in Excel?",
    options: [
      "Architecting robust multi-layer mathematical formulas that combine filtering, conditional aggregation, and dynamic array criteria into fault-tolerant corporate models",
      "Formatting font sizes and row heights",
      "Creating basic 2-variable addition formulas",
      "Deleting empty rows in a worksheet"
    ],
    correctAnswer: 0,
    explanation: "Advanced Aggregation Design integrates functions like SUMPRODUCT, AGGREGATE, and dynamic boolean masks into enterprise-grade calculation engines."
  },
  {
    question: "Which function is the foundational choice when building error-aware aggregation models that must ignore hidden rows and #N/A errors?",
    options: [
      "AGGREGATE",
      "SUM",
      "SUBTOTAL",
      "AVERAGE"
    ],
    correctAnswer: 0,
    explanation: "AGGREGATE supports 19 calculation functions with explicit option codes to ignore hidden rows and error values."
  },
  {
    question: "How does double unary operator (--) transform boolean arrays in advanced SUMPRODUCT formulas?",
    options: [
      "It converts TRUE/FALSE values into numeric 1/0 values for matrix multiplication",
      "It negates the boolean values twice to make them negative",
      "It causes a #VALUE! error",
      "It formats numbers as percentages"
    ],
    correctAnswer: 0,
    explanation: "--(A1:A10=\"North\") converts [TRUE, FALSE...] to [1, 0...]."
  },
  {
    question: "In enterprise modeling, why is AGGREGATE preferred over SUBTOTAL for filtered dynamic tables?",
    options: [
      "AGGREGATE can ignore error values (Option 6) in addition to hidden rows, whereas SUBTOTAL fails if any cell contains an error",
      "AGGREGATE runs 10x slower",
      "SUBTOTAL requires VBA macros",
      "AGGREGATE works only on text"
    ],
    correctAnswer: 0,
    explanation: "AGGREGATE Option 6 ignores both hidden rows and calculation errors."
  },
  {
    question: "How can SUMPRODUCT perform multi-condition weighted average calculations without using SUMIFS?",
    options: [
      "=SUMPRODUCT((Region=\"North\") * (Units) * (Price)) / SUMPRODUCT((Region=\"North\") * (Units))",
      "=AVERAGEIFS(Price, Region, \"North\")",
      "=SUMPRODUCT(Units, Price)",
      "=SUMIFS(Price, Region, \"North\")"
    ],
    correctAnswer: 0,
    explanation: "Multi-condition weighted average divides filtered revenue product sum by filtered volume sum."
  },
  {
    question: "What is the result of =AGGREGATE(9, 6, A1:A5) if A1:A5 contains {10, 20, #N/A, 30, 40}?",
    options: [
      "100",
      "#N/A",
      "0",
      "50"
    ],
    correctAnswer: 0,
    explanation: "Function 9 (SUM) with Option 6 (Ignore Errors) ignores #N/A and returns 10 + 20 + 30 + 40 = 100."
  },
  {
    question: "What is the recommended design pattern for avoiding nested IF statements in complex mathematical models?",
    options: [
      "Using CHOOSE combined with SIGN or boolean logic arrays",
      "Writing 15 nested IF statements",
      "Using manual copy-paste",
      "Disabling automatic calculation"
    ],
    correctAnswer: 0,
    explanation: "CHOOSE + SIGN converts conditional branch logic into clean algebraic array expressions."
  },
  {
    question: "Which Excel function combines multi-array multiplication and conditional masking without requiring CTRL+SHIFT+ENTER in modern Excel?",
    options: [
      "SUMPRODUCT",
      "SUM",
      "MMULT",
      "TRANSPOSE"
    ],
    correctAnswer: 0,
    explanation: "SUMPRODUCT natively evaluates array products without special key shortcuts."
  },
  {
    question: "In warehouse logistics design, why is CEILING.MATH combined with QUOTIENT and MOD?",
    options: [
      "To calculate full container reservations, batch box allocations, and remaining loose units in a single pipeline",
      "To format table headers",
      "To sort customer names alphabetically",
      "To print shipping labels"
    ],
    correctAnswer: 0,
    explanation: "Combining CEILING.MATH, QUOTIENT, and MOD solves complex 3-tier container logistics."
  },
  {
    question: "What is the best practice for auditing complex multi-layer aggregation formulas?",
    options: [
      "Using Evaluate Formula tool (ALT + M + V) to step through array evaluation stages",
      "Re-typing the formula in Word",
      "Deleting the formula and guessing",
      "Converting all cells to text"
    ],
    correctAnswer: 0,
    explanation: "Evaluate Formula allows auditing intermediate array transformation steps."
  },
  {
    question: "What is the output of =SUMPRODUCT((A1:A3>5) * (B1:B3)) if A1:A3={4, 6, 8} and B1:B3={10, 20, 30}?",
    options: [
      "50",
      "60",
      "20",
      "0"
    ],
    correctAnswer: 0,
    explanation: "(0*10) + (1*20) + (1*30) = 0 + 20 + 30 = 50."
  },
  {
    question: "What is the output of =AGGREGATE(1, 6, {10, 20, #DIV/0!, 30})?",
    options: [
      "20",
      "#DIV/0!",
      "60",
      "15"
    ],
    correctAnswer: 0,
    explanation: "Function 1 (AVERAGE) with Option 6 ignores #DIV/0! and averages {10, 20, 30} = 60 / 3 = 20."
  },
  {
    question: "Why should whole-column references like A:A be avoided in multi-array SUMPRODUCT formulas?",
    options: [
      "Because checking 1,048,576 rows across multiple arrays causes severe calculation latency and memory bottlenecks",
      "Because whole-column references return #VALUE!",
      "Because Excel limits formulas to 10 rows",
      "Because whole columns cannot contain numbers"
    ],
    correctAnswer: 0,
    explanation: "Full-column array operations force over 1 million evaluations, slowing down workbook recalculation."
  },
  {
    question: "What is the benefit of dynamic array formulas (LET, FILTER) in modern Excel aggregation design?",
    options: [
      "They eliminate redundant sub-calculations, improve formula readability, and speed up execution time",
      "They automatically color cells green",
      "They disable macro warnings",
      "They password protect workbooks"
    ],
    correctAnswer: 0,
    explanation: "LET stores intermediate calculation steps, preventing double evaluation."
  },
  {
    question: "How does MROUND combined with SIGN ensure fault-tolerant rounding in financial accounting models?",
    options: [
      "=MROUND(val, SIGN(val) * multiple) guarantees matching signs, preventing #NUM! errors",
      "It converts negative numbers to positive",
      "It rounds to 2 decimal places always",
      "It hides zero values"
    ],
    correctAnswer: 0,
    explanation: "Multiplying multiple by SIGN(val) guarantees sign matching for MROUND."
  },
  {
    question: "What is the result of =AGGREGATE(4, 6, {5, 15, #VALUE!, 25})?",
    options: [
      "25",
      "#VALUE!",
      "15",
      "45"
    ],
    correctAnswer: 0,
    explanation: "Function 4 (MAX) with Option 6 ignores #VALUE! and evaluates max({5, 15, 25}) = 25."
  },
  {
    question: "What is the result of =AGGREGATE(5, 6, {5, 15, #VALUE!, 25})?",
    options: [
      "5",
      "#VALUE!",
      "0",
      "15"
    ],
    correctAnswer: 0,
    explanation: "Function 5 (MIN) with Option 6 ignores #VALUE! and evaluates min({5, 15, 25}) = 5."
  },
  {
    question: "In Advanced Aggregation Design, what is the role of helper columns?",
    options: [
      "Deconstructing massive monolithic formulas into clear, auditable intermediate calculation steps",
      "Making workbooks look larger",
      "Increasing file size for backup",
      "Disabling automatic save"
    ],
    correctAnswer: 0,
    explanation: "Helper columns break complex logic into transparent, testable calculation steps."
  },
  {
    question: "What is the output of =SUMPRODUCT(--(A1:A3=\"Red\"), B1:B3) if A1:A3={\"Red\",\"Blue\",\"Red\"} and B1:B3={10,20,30}?",
    options: [
      "40",
      "60",
      "10",
      "20"
    ],
    correctAnswer: 0,
    explanation: "(1 * 10) + (0 * 20) + (1 * 30) = 10 + 0 + 30 = 40."
  },
  {
    question: "What is the output of =PRODUCT(1 + A1:A3) evaluated as an array formula for returns A1:A3 = {0.1, 0.2, 0.05}?",
    options: [
      "1.386",
      "0.35",
      "1.35",
      "1.0"
    ],
    correctAnswer: 0,
    explanation: "1.1 × 1.2 × 1.05 = 1.386 (compounded total return factor)."
  },
  {
    question: "Which function calculates the geometric mean of growth rates for investment portfolios?",
    options: [
      "GEOMEAN",
      "AVERAGE",
      "MEDIAN",
      "HARMEAN"
    ],
    correctAnswer: 0,
    explanation: "GEOMEAN calculates the compounding geometric average of growth multipliers."
  },
  {
    question: "Which function calculates the harmonic mean for rates and ratios like speed or price-to-earnings ratios?",
    options: [
      "HARMEAN",
      "AVERAGE",
      "GEOMEAN",
      "TRIMMEAN"
    ],
    correctAnswer: 0,
    explanation: "HARMEAN calculates the harmonic mean, ideal for equal-distance rates."
  },
  {
    question: "What is the output of =TRIMMEAN(A1:A10, 0.2)?",
    options: [
      "Calculates the mean of the dataset after trimming 20% of extreme data points (10% highest and 10% lowest)",
      "Trims text strings in A1:A10",
      "Rounds numbers to 2 decimal places",
      "Multiplies mean by 0.2"
    ],
    correctAnswer: 0,
    explanation: "TRIMMEAN excludes a specified percentage of outlier data points from the top and bottom."
  },
  {
    question: "What is the key advantage of modular aggregation design in financial modeling?",
    options: [
      "Improves model maintainability, reduces formula debugging time, and prevents cascading calculation errors",
      "Allows infinite font choices",
      "Hides formulas from users",
      "Disables automatic updates"
    ],
    correctAnswer: 0,
    explanation: "Modular design ensures clean maintainability and rapid error isolation."
  },
  {
    question: "What is the result of =AGGREGATE(14, 6, A1:A5, 2) for A1:A5 = {10, 50, #N/A, 30, 20}?",
    options: [
      "30",
      "50",
      "#N/A",
      "20"
    ],
    correctAnswer: 0,
    explanation: "Function 14 (LARGE) with Option 6 ignores #N/A and returns the 2nd largest value from {10, 50, 30, 20}, which is 30."
  },
  {
    question: "What is the result of =AGGREGATE(15, 6, A1:A5, 1) for A1:A5 = {10, 50, #N/A, 30, 20}?",
    options: [
      "10",
      "20",
      "#N/A",
      "50"
    ],
    correctAnswer: 0,
    explanation: "Function 15 (SMALL) with Option 6 ignores #N/A and returns the 1st smallest value from {10, 50, 30, 20}, which is 10."
  },
  {
    question: "How does using structured table references (e.g. Table1[Sales]) improve aggregation design?",
    options: [
      "Automatically adjusts formula ranges dynamically as new data rows are added, eliminating hardcoded range limits",
      "Changes table color to blue",
      "Locks the table against edits",
      "Exports table to PDF"
    ],
    correctAnswer: 0,
    explanation: "Structured references dynamically expand as data rows are added."
  },
  {
    question: "What is the output of =SUMPRODUCT(ISNUMBER(A1:A5) * A1:A5) if A1:A5 = {10, \"Text\", 20, #N/A, 30}?",
    options: [
      "60",
      "#N/A",
      "0",
      "50"
    ],
    correctAnswer: 0,
    explanation: "ISNUMBER filters out non-numeric text and errors, evaluating 10 + 20 + 30 = 60."
  },
  {
    question: "What is the output of =AGGREGATE(9, 7, A1:A5) if Option 7 is selected?",
    options: [
      "Ignores hidden rows and ignores error values",
      "Ignores nothing",
      "Ignores nested SUBTOTAL and AGGREGATE functions",
      "Ignores blank cells only"
    ],
    correctAnswer: 0,
    explanation: "Option 7 ignores hidden rows AND error values."
  },
  {
    question: "What is the ultimate takeaway for Advanced Aggregation Design in enterprise financial workbooks?",
    options: [
      "Combine AGGREGATE, SUMPRODUCT, and dynamic array masks to build resilient, error-immune calculation models that dynamically handle filtering and missing data",
      "Use manual calculators for complex models",
      "Never use formulas",
      "Convert all numbers to text"
    ],
    correctAnswer: 0,
    explanation: "Combining robust aggregation functions creates scalable, fault-tolerant enterprise models."
  }
];

export default questions;
