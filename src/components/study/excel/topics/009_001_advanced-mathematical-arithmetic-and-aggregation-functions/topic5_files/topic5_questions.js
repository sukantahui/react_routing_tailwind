const questions = [
  {
    question: "What is the primary function of the QUOTIENT function in Excel?",
    options: [
      "It returns the integer portion of a division and discards the remainder",
      "It calculates the percentage of two numbers",
      "It rounds a number up to the nearest integer",
      "It returns the remainder of division"
    ],
    correctAnswer: 0,
    explanation: "QUOTIENT(numerator, denominator) returns the integer portion of division and discards fractional remainders."
  },
  {
    question: "What is the result of =QUOTIENT(17, 5)?",
    options: [
      "3",
      "3.4",
      "2",
      "4"
    ],
    correctAnswer: 0,
    explanation: "17 divided by 5 is 3.4. QUOTIENT discards the decimal .4 and returns 3."
  },
  {
    question: "How does QUOTIENT differ from the standard division operator (/)?",
    options: [
      "QUOTIENT discards fractional remainders, while / returns exact floating-point decimals",
      "QUOTIENT rounds up, / rounds down",
      "QUOTIENT returns text, / returns numbers",
      "They are identical"
    ],
    correctAnswer: 0,
    explanation: "=QUOTIENT(17, 5) returns 3, while =17/5 returns 3.4."
  },
  {
    question: "What is the output of =QUOTIENT(-25, 4)?",
    options: [
      "-6",
      "-6.25",
      "-7",
      "-1"
    ],
    correctAnswer: 0,
    explanation: "QUOTIENT truncates toward zero (-6.25 -> -6)."
  },
  {
    question: "What is the difference between INT(n/d) and QUOTIENT(n, d) for negative numbers?",
    options: [
      "QUOTIENT truncates toward zero (e.g. QUOTIENT(-7, 2) = -3), whereas INT rounds down away from zero (e.g. INT(-3.5) = -4)",
      "INT and QUOTIENT are always identical",
      "QUOTIENT rounds away from zero",
      "INT returns positive numbers"
    ],
    correctAnswer: 0,
    explanation: "QUOTIENT truncates toward zero (-7/2 = -3.5 -> -3), while INT rounds down to the lower integer (-3.5 -> -4)."
  },
  {
    question: "What happens when denominator is zero, e.g. =QUOTIENT(10, 0)?",
    options: [
      "Returns #DIV/0! error",
      "Returns 0",
      "Returns 10",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "Division by zero returns #DIV/0!."
  },
  {
    question: "Which formula calculates full 60-minute hours in 145 total minutes?",
    options: [
      "=QUOTIENT(145, 60)",
      "=MOD(145, 60)",
      "=145 / 60",
      "=ROUND(145, 60)"
    ],
    correctAnswer: 0,
    explanation: "QUOTIENT(145, 60) returns 2 full hours."
  },
  {
    question: "What is the output of =QUOTIENT(5.9, 2)?",
    options: [
      "2",
      "2.95",
      "3",
      "2.5"
    ],
    correctAnswer: 0,
    explanation: "5.9 / 2 = 2.95. QUOTIENT truncates decimal .95 and returns 2."
  },
  {
    question: "What is the output of =QUOTIENT(100, 30)?",
    options: [
      "3",
      "3.333",
      "10",
      "4"
    ],
    correctAnswer: 0,
    explanation: "100 / 30 = 3.333; QUOTIENT returns 3."
  },
  {
    question: "In warehouse packaging, if order is 250 items and carton holds 24 items, how many full sealed cartons can be packed?",
    options: [
      "=QUOTIENT(250, 24) = 10 full cartons",
      "=MOD(250, 24) = 10 cartons",
      "=CEILING(250, 24) = 264 cartons",
      "=250 / 24 = 10.41 cartons"
    ],
    correctAnswer: 0,
    explanation: "QUOTIENT(250, 24) = 10 full sealed cartons."
  },
  {
    question: "What is the output of =QUOTIENT(0, 5)?",
    options: [
      "0",
      "5",
      "#DIV/0!",
      "1"
    ],
    correctAnswer: 0,
    explanation: "0 / 5 = 0."
  },
  {
    question: "What is the result of =QUOTIENT(25, 5)?",
    options: [
      "5",
      "5.0",
      "0",
      "25"
    ],
    correctAnswer: 0,
    explanation: "25 / 5 = 5."
  },
  {
    question: "What is the output of =QUOTIENT(4, 5)?",
    options: [
      "0",
      "0.8",
      "1",
      "4"
    ],
    correctAnswer: 0,
    explanation: "4 / 5 = 0.8; QUOTIENT truncates to integer 0."
  },
  {
    question: "What happens if numeric text like \"50\" is passed, e.g. =QUOTIENT(\"50\", 6)?",
    options: [
      "Excel coerces \"50\" to 50 and returns 8",
      "Returns #VALUE!",
      "Returns 0",
      "Returns \"8\""
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What is the result of =QUOTIENT(-10, -3)?",
    options: [
      "3",
      "-3",
      "3.33",
      "-4"
    ],
    correctAnswer: 0,
    explanation: "-10 / -3 = 3.333; QUOTIENT returns 3."
  },
  {
    question: "What is the output of =QUOTIENT(120, 60)?",
    options: [
      "2",
      "2.0",
      "0",
      "120"
    ],
    correctAnswer: 0,
    explanation: "120 / 60 = 2."
  },
  {
    question: "In currency bills, how many ₹500 notes make ₹2,500?",
    options: [
      "=QUOTIENT(2500, 500) = 5 notes",
      "=MOD(2500, 500) = 0 notes",
      "=2500 * 500",
      "=CEILING(2500, 500)"
    ],
    correctAnswer: 0,
    explanation: "2500 / 500 = 5 ₹500 notes."
  },
  {
    question: "What is the output of =QUOTIENT(1, 2)?",
    options: [
      "0",
      "0.5",
      "1",
      "2"
    ],
    correctAnswer: 0,
    explanation: "1 / 2 = 0.5; QUOTIENT truncates to 0."
  },
  {
    question: "What is the output of =QUOTIENT(99, 100)?",
    options: [
      "0",
      "0.99",
      "1",
      "99"
    ],
    correctAnswer: 0,
    explanation: "99 / 100 = 0.99; QUOTIENT returns 0."
  },
  {
    question: "What is the output of =QUOTIENT(100, 100)?",
    options: [
      "1",
      "0",
      "100",
      "1.0"
    ],
    correctAnswer: 0,
    explanation: "100 / 100 = 1."
  },
  {
    question: "Which function paired with QUOTIENT provides the exact remainder of division?",
    options: [
      "MOD",
      "SIGN",
      "SUMSQ",
      "PRODUCT"
    ],
    correctAnswer: 0,
    explanation: "QUOTIENT and MOD are the paired integer division and remainder functions."
  },
  {
    question: "What is the result of =QUOTIENT(15, 4) * 4 + MOD(15, 4)?",
    options: [
      "15",
      "12",
      "3",
      "16"
    ],
    correctAnswer: 0,
    explanation: "3 × 4 + 3 = 12 + 3 = 15. Division identity holds."
  },
  {
    question: "What is the result of =QUOTIENT(-15, 4)?",
    options: [
      "-3",
      "-3.75",
      "-4",
      "3"
    ],
    correctAnswer: 0,
    explanation: "-15 / 4 = -3.75; QUOTIENT truncates toward zero to -3."
  },
  {
    question: "What is the result of =QUOTIENT(15, -4)?",
    options: [
      "-3",
      "-3.75",
      "-4",
      "3"
    ],
    correctAnswer: 0,
    explanation: "15 / -4 = -3.75; QUOTIENT returns -3."
  },
  {
    question: "How does TRUNC(n/d) relate to QUOTIENT(n, d)?",
    options: [
      "TRUNC(n/d) and QUOTIENT(n, d) produce identical results for both positive and negative numbers",
      "TRUNC rounds up",
      "QUOTIENT rounds away from zero",
      "They return different error codes"
    ],
    correctAnswer: 0,
    explanation: "Both TRUNC(n/d) and QUOTIENT(n, d) truncate division toward zero."
  },
  {
    question: "In batch allocation, if 500 items are divided into 12-item batches, how many full batches are formed?",
    options: [
      "=QUOTIENT(500, 12) = 41 batches",
      "=MOD(500, 12) = 8 batches",
      "=500 / 12 = 41.66 batches",
      "=CEILING(500, 12) = 504 batches"
    ],
    correctAnswer: 0,
    explanation: "QUOTIENT(500, 12) = 41 full batches."
  },
  {
    question: "What is the result of =QUOTIENT(10, 3)?",
    options: [
      "3",
      "3.33",
      "1",
      "4"
    ],
    correctAnswer: 0,
    explanation: "10 / 3 = 3.33; QUOTIENT returns 3."
  },
  {
    question: "What is the result of =QUOTIENT(10, 10)?",
    options: [
      "1",
      "0",
      "10",
      "100"
    ],
    correctAnswer: 0,
    explanation: "10 / 10 = 1."
  },
  {
    question: "Why is QUOTIENT preferred over INT(n/d) when truncation toward zero is required for negative numbers?",
    options: [
      "QUOTIENT truncates toward zero (-3.75 -> -3), whereas INT rounds down to lower integer (-3.75 -> -4)",
      "QUOTIENT is faster",
      "INT requires VBA",
      "QUOTIENT locks cells"
    ],
    correctAnswer: 0,
    explanation: "QUOTIENT strictly truncates fractional parts toward zero."
  },
  {
    question: "What is the ultimate advantage of using QUOTIENT in financial models?",
    options: [
      "It explicitly calculates integer batch allocations, payment frequencies, and unit counts without trailing decimal artifacts",
      "It converts currency symbols",
      "It formats cells as bold text",
      "It hides row numbers"
    ],
    correctAnswer: 0,
    explanation: "QUOTIENT guarantees clean integer batch metrics without decimal artifacts."
  }
];

export default questions;
