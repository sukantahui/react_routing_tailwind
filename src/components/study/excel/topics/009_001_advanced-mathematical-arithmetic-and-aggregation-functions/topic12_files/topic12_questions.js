const questions = [
  {
    question: "What is the primary function of the SIGN function in Excel?",
    options: [
      "It determines the sign of a number, returning +1 if positive, 0 if zero, and -1 if negative",
      "It calculates the sine of an angle in radians",
      "It returns a text string representing positive/negative",
      "It converts negative numbers to positive"
    ],
    correctAnswer: 0,
    explanation: "SIGN(number) returns 1 for positive numbers, 0 for zero, and -1 for negative numbers."
  },
  {
    question: "What is the result of =SIGN(45.8)?",
    options: [
      "1",
      "-1",
      "0",
      "45.8"
    ],
    correctAnswer: 0,
    explanation: "For any positive number, SIGN returns 1."
  },
  {
    question: "What is the result of =SIGN(-45.8)?",
    options: [
      "-1",
      "1",
      "0",
      "-45.8"
    ],
    correctAnswer: 0,
    explanation: "For any negative number, SIGN returns -1."
  },
  {
    question: "What is the result of =SIGN(0)?",
    options: [
      "0",
      "1",
      "-1",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "For zero, SIGN returns 0."
  },
  {
    question: "How is SIGN used in accounting ledgers to adjust debit vs credit transaction direction?",
    options: [
      "Multiplying an amount by SIGN(Account_Type) automatically reverses or preserves cash flow sign (+1 for revenue, -1 for expense)",
      "It formats currency in red font",
      "It converts amounts to USD",
      "It hides zero-balance rows"
    ],
    correctAnswer: 0,
    explanation: "SIGN returns +1 or -1, serving as a dynamic algebraic direction multiplier."
  },
  {
    question: "What is the result of =SIGN(0.000001)?",
    options: [
      "1",
      "0",
      "-1",
      "0.000001"
    ],
    correctAnswer: 0,
    explanation: "Any strictly positive non-zero number returns 1."
  },
  {
    question: "What is the result of =SIGN(-0.000001)?",
    options: [
      "-1",
      "0",
      "1",
      "-0.000001"
    ],
    correctAnswer: 0,
    explanation: "Any strictly negative non-zero number returns -1."
  },
  {
    question: "How can SIGN prevent the #NUM! error in MROUND when handling mixed positive/negative numbers?",
    options: [
      "=MROUND(val, SIGN(val) * multiple)",
      "=MROUND(val, multiple)",
      "=SIGN(MROUND(val, multiple))",
      "=IFERROR(MROUND(val, multiple), 0)"
    ],
    correctAnswer: 0,
    explanation: "Multiplying multiple by SIGN(val) forces number and multiple to share identical algebraic signs."
  },
  {
    question: "What is the result of =SIGN(MOD(-10, 3))?",
    options: [
      "1",
      "-1",
      "0",
      "2"
    ],
    correctAnswer: 0,
    explanation: "MOD(-10, 3) = 2. Then SIGN(2) = 1."
  },
  {
    question: "What is the output of =SIGN(10 - 20)?",
    options: [
      "-1",
      "1",
      "0",
      "-10"
    ],
    correctAnswer: 0,
    explanation: "10 - 20 = -10. SIGN(-10) = -1."
  },
  {
    question: "What is the output of =SIGN(20 - 10)?",
    options: [
      "1",
      "-1",
      "0",
      "10"
    ],
    correctAnswer: 0,
    explanation: "20 - 10 = 10. SIGN(10) = 1."
  },
  {
    question: "What is the output of =SIGN(10 - 10)?",
    options: [
      "0",
      "1",
      "-1",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "10 - 10 = 0. SIGN(0) = 0."
  },
  {
    question: "How does SIGN handle numeric text strings, e.g. =SIGN(\"-50\")?",
    options: [
      "Excel coerces \"-50\" to -50 and returns -1",
      "Returns #VALUE!",
      "Returns 0",
      "Returns \"-1\""
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What happens if non-numeric text like \"ABC\" is passed, e.g. =SIGN(\"ABC\")?",
    options: [
      "Returns #VALUE! error",
      "Returns 0",
      "Returns 1",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "Non-numeric text causes a #VALUE! error."
  },
  {
    question: "What is the output of =SIGN(POWER(-2, 3))?",
    options: [
      "-1",
      "1",
      "0",
      "-8"
    ],
    correctAnswer: 0,
    explanation: "(-2)^3 = -8. SIGN(-8) = -1."
  },
  {
    question: "What is the output of =SIGN(POWER(-2, 4))?",
    options: [
      "1",
      "-1",
      "0",
      "16"
    ],
    correctAnswer: 0,
    explanation: "(-2)^4 = 16. SIGN(16) = 1."
  },
  {
    question: "In financial variance analysis, if Variance = Actual - Budget, how can SIGN be used to flag variance direction?",
    options: [
      "=CHOOSE(SIGN(Actual - Budget) + 2, \"Below Budget\", \"On Budget\", \"Above Budget\")",
      "=SIGN(Actual)",
      "=BUDGET - ACTUAL",
      "=IF(Actual > Budget, 1, 0)"
    ],
    correctAnswer: 0,
    explanation: "SIGN returns -1, 0, +1. Adding 2 maps them to CHOOSE indices 1, 2, 3 for text flags."
  },
  {
    question: "What is the result of =SIGN(PRODUCT(-2, -3, -4))?",
    options: [
      "-1",
      "1",
      "0",
      "-24"
    ],
    correctAnswer: 0,
    explanation: "-2 × -3 × -4 = -24. SIGN(-24) = -1."
  },
  {
    question: "What is the result of =SIGN(PRODUCT(-2, -3))?",
    options: [
      "1",
      "-1",
      "0",
      "6"
    ],
    correctAnswer: 0,
    explanation: "-2 × -3 = 6. SIGN(6) = 1."
  },
  {
    question: "What is the output of =SIGN(ABS(-50))?",
    options: [
      "1",
      "-1",
      "0",
      "50"
    ],
    correctAnswer: 0,
    explanation: "ABS(-50) = 50. SIGN(50) = 1."
  },
  {
    question: "What is the output of =SIGN(SUMX2MY2({4}, {6}))?",
    options: [
      "-1",
      "1",
      "0",
      "-20"
    ],
    correctAnswer: 0,
    explanation: "SUMX2MY2({4}, {6}) = 4² - 6² = 16 - 36 = -20. SIGN(-20) = -1."
  },
  {
    question: "What is the result of =SIGN(LOG10(0.1))?",
    options: [
      "-1",
      "1",
      "0",
      "-1.0"
    ],
    correctAnswer: 0,
    explanation: "LOG10(0.1) = -1. SIGN(-1) = -1."
  },
  {
    question: "What is the result of =SIGN(LOG10(10))?",
    options: [
      "1",
      "-1",
      "0",
      "1.0"
    ],
    correctAnswer: 0,
    explanation: "LOG10(10) = 1. SIGN(1) = 1."
  },
  {
    question: "What is the result of =SIGN(LOG10(1))?",
    options: [
      "0",
      "1",
      "-1",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "LOG10(1) = 0. SIGN(0) = 0."
  },
  {
    question: "Why is SIGN called a zero-threshold step function in quantitative modeling?",
    options: [
      "Because its graph steps from -1 to 0 at x=0, and from 0 to +1 for x > 0",
      "Because it deletes zero cells",
      "Because it rounds numbers to 0 decimal places",
      "Because it returns 0 for all numbers"
    ],
    correctAnswer: 0,
    explanation: "SIGN evaluates algebraic direction relative to the zero origin threshold."
  },
  {
    question: "What is the output of =SIGN(100)?",
    options: [
      "1",
      "-1",
      "0",
      "100"
    ],
    correctAnswer: 0,
    explanation: "SIGN(100) = 1."
  },
  {
    question: "What is the output of =SIGN(-100)?",
    options: [
      "-1",
      "1",
      "0",
      "-100"
    ],
    correctAnswer: 0,
    explanation: "SIGN(-100) = -1."
  },
  {
    question: "What is the output of =SIGN(5 - 5)?",
    options: [
      "0",
      "1",
      "-1",
      "5"
    ],
    correctAnswer: 0,
    explanation: "5 - 5 = 0. SIGN(0) = 0."
  },
  {
    question: "What is the output of =SIGN(TRUE)?",
    options: [
      "1",
      "0",
      "-1",
      "TRUE"
    ],
    correctAnswer: 0,
    explanation: "Scalar TRUE is coerced to 1. SIGN(1) = 1."
  },
  {
    question: "What is the primary benefit of SIGN in corporate financial model formulas?",
    options: [
      "It acts as a clean mathematical direction multiplier (+1 / 0 / -1), preventing messy nested IF statements",
      "It formats currency cells",
      "It locks formulas",
      "It prints reports"
    ],
    correctAnswer: 0,
    explanation: "SIGN simplifies directional logic into a clean multiplier."
  }
];

export default questions;
