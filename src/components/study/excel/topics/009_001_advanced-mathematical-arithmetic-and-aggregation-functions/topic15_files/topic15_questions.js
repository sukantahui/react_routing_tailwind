const questions = [
  {
    question: "What is the primary function of the FACT function in Excel?",
    options: [
      "It calculates the factorial of a non-negative integer (n! = 1 × 2 × 3 × ... × n)",
      "It returns factor analysis metrics",
      "It calculates the future asset value",
      "It converts factors into prime components"
    ],
    correctAnswer: 0,
    explanation: "FACT(number) calculates the factorial of a non-negative integer."
  },
  {
    question: "What is the result of =FACT(5)?",
    options: [
      "120",
      "25",
      "15",
      "720"
    ],
    correctAnswer: 0,
    explanation: "5! = 1 × 2 × 3 × 4 × 5 = 120."
  },
  {
    question: "What is the result of =FACT(0)?",
    options: [
      "1",
      "0",
      "#NUM!",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "By mathematical convention, 0! = 1."
  },
  {
    question: "What is the result of =FACT(1)?",
    options: [
      "1",
      "0",
      "2",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "1! = 1."
  },
  {
    question: "How does FACT handle non-integer arguments like =FACT(5.9)?",
    options: [
      "Excel truncates decimal portions before calculating factorial, evaluating FACT(5) = 120",
      "Returns #VALUE!",
      "Rounds up to FACT(6)",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "FACT truncates decimal inputs to integers prior to calculation."
  },
  {
    question: "What happens if a negative number is passed to FACT, e.g. =FACT(-5)?",
    options: [
      "Returns #NUM! error",
      "Returns -120",
      "Returns 120",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Factorials are defined only for non-negative integers; negative numbers return #NUM! error."
  },
  {
    question: "What is the maximum integer argument supported by FACT in Excel before returning #NUM! overflow?",
    options: [
      "170 (since 171! exceeds 1.79E+308 double-precision float limit)",
      "255",
      "100",
      "32767"
    ],
    correctAnswer: 0,
    explanation: "170! is ~7.25E+306. 171! exceeds IEEE 754 float limits and returns #NUM!."
  },
  {
    question: "What is the result of =FACT(6)?",
    options: [
      "720",
      "120",
      "36",
      "5040"
    ],
    correctAnswer: 0,
    explanation: "6! = 6 × 120 = 720."
  },
  {
    question: "What is the result of =FACT(4)?",
    options: [
      "24",
      "16",
      "12",
      "120"
    ],
    correctAnswer: 0,
    explanation: "4! = 1 × 2 × 3 × 4 = 24."
  },
  {
    question: "What is the result of =FACT(3)?",
    options: [
      "6",
      "3",
      "9",
      "1"
    ],
    correctAnswer: 0,
    explanation: "3! = 1 × 2 × 3 = 6."
  },
  {
    question: "What is the result of =FACT(7)?",
    options: [
      "5040",
      "720",
      "49",
      "40320"
    ],
    correctAnswer: 0,
    explanation: "7! = 7 × 720 = 5040."
  },
  {
    question: "How can FACT be used to calculate permutations without repetition P(n, k) = n! / (n - k)! ?",
    options: [
      "=FACT(n) / FACT(n - k)",
      "=FACT(n) * FACT(k)",
      "=FACT(n - k) / FACT(n)",
      "=FACT(n + k)"
    ],
    correctAnswer: 0,
    explanation: "Permutations formula P(n, k) = FACT(n) / FACT(n - k)."
  },
  {
    question: "How can FACT be used to calculate combinations C(n, k) = n! / (k! × (n - k)!) ?",
    options: [
      "=FACT(n) / (FACT(k) * FACT(n - k))",
      "=FACT(n) / FACT(k)",
      "=FACT(n) * FACT(k) * FACT(n - k)",
      "=FACT(n + k)"
    ],
    correctAnswer: 0,
    explanation: "Combinations formula C(n, k) = FACT(n) / (FACT(k) * FACT(n - k))."
  },
  {
    question: "What is the result of =FACT(2)?",
    options: [
      "2",
      "1",
      "4",
      "0"
    ],
    correctAnswer: 0,
    explanation: "2! = 1 × 2 = 2."
  },
  {
    question: "What happens if numeric text string like \"5\" is passed, e.g. =FACT(\"5\")?",
    options: [
      "Excel coerces \"5\" to 5 and returns 120",
      "Returns #VALUE!",
      "Returns #NUM!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What happens if non-numeric text like \"ABC\" is passed, e.g. =FACT(\"ABC\")?",
    options: [
      "Returns #VALUE! error",
      "Returns 0",
      "Returns #NUM!",
      "Returns 1"
    ],
    correctAnswer: 0,
    explanation: "Non-numeric text causes a #VALUE! error."
  },
  {
    question: "What is the output of =FACT(8)?",
    options: [
      "40320",
      "5040",
      "64",
      "362880"
    ],
    correctAnswer: 0,
    explanation: "8! = 8 × 5040 = 40,320."
  },
  {
    question: "What is the output of =FACT(10)?",
    options: [
      "3628800",
      "100",
      "362880",
      "7257600"
    ],
    correctAnswer: 0,
    explanation: "10! = 3,628,800."
  },
  {
    question: "In Taylor series expansion e^x = SUM(x^k / k!), what function calculates the k! denominator?",
    options: [
      "FACT(k)",
      "COMBIN(x, k)",
      "PERMUT(x, k)",
      "FACTDOUBLE(k)"
    ],
    correctAnswer: 0,
    explanation: "FACT(k) provides k! denominator in power series calculations."
  },
  {
    question: "What is the result of =FACT(5) / FACT(3)?",
    options: [
      "20",
      "10",
      "2",
      "40"
    ],
    correctAnswer: 0,
    explanation: "5! / 3! = 120 / 6 = 20 (which is 5 × 4)."
  },
  {
    question: "What is the result of =FACT(6) / (FACT(2) * FACT(4))?",
    options: [
      "15",
      "30",
      "12",
      "60"
    ],
    correctAnswer: 0,
    explanation: "720 / (2 × 24) = 720 / 48 = 15 (Combinations C(6, 2))."
  },
  {
    question: "What is the result of =FACT(0) + FACT(1)?",
    options: [
      "2",
      "1",
      "0",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "0! + 1! = 1 + 1 = 2."
  },
  {
    question: "What is the output of =FACT(12)?",
    options: [
      "479001600",
      "3628800",
      "144",
      "1000000"
    ],
    correctAnswer: 0,
    explanation: "12! = 479,001,600."
  },
  {
    question: "Why does FACT(171) return #NUM! error?",
    options: [
      "Because 171! exceeds the maximum double-precision limit of 1.79E+308",
      "Because 171 is a prime number",
      "Because 171 is odd",
      "Because 171 is negative"
    ],
    correctAnswer: 0,
    explanation: "Floating point overflow occurs for n > 170."
  },
  {
    question: "What is the result of =FACT(1.99)?",
    options: [
      "1",
      "2",
      "1.99",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "1.99 is truncated to 1. FACT(1) = 1."
  },
  {
    question: "What is the output of =FACT(9)?",
    options: [
      "362880",
      "40320",
      "81",
      "3628800"
    ],
    correctAnswer: 0,
    explanation: "9! = 9 × 40,320 = 362,880."
  },
  {
    question: "What is the output of =FACT(11)?",
    options: [
      "39916800",
      "3628800",
      "121",
      "479001600"
    ],
    correctAnswer: 0,
    explanation: "11! = 11 × 3,628,800 = 39,916,800."
  },
  {
    question: "What is the result of =FACT(13)?",
    options: [
      "6227020800",
      "479001600",
      "169",
      "1000000000"
    ],
    correctAnswer: 0,
    explanation: "13! = 6,227,020,800."
  },
  {
    question: "What is the output of =FACT(14)?",
    options: [
      "87178291200",
      "6227020800",
      "196",
      "10000000000"
    ],
    correctAnswer: 0,
    explanation: "14! = 87,178,291,200."
  },
  {
    question: "What is the ultimate takeaway for using FACT in financial and statistical models?",
    options: [
      "Use FACT for combinatorics, probability distributions, Markov chain state counts, and power series expansion denominators",
      "Use it to format cell background colors",
      "Use it to protect worksheets",
      "Use it to sort data"
    ],
    correctAnswer: 0,
    explanation: "FACT is the foundational building block for combinatorics and series expansions."
  }
];

export default questions;
