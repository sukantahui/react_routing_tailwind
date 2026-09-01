const questions = [
  {
    question: "What is the primary function of the PERMUT function in Excel?",
    options: [
      "It calculates the number of permutations for a given number of items without repetition P(n, k) = n! / (n - k)!",
      "It calculates combinations without repetition",
      "It calculates permutations with repetition",
      "It randomly permutes array elements"
    ],
    correctAnswer: 0,
    explanation: "PERMUT(number, number_chosen) returns the number of ordered permutations without repetition."
  },
  {
    question: "What is the result of =PERMUT(5, 2)?",
    options: [
      "20",
      "10",
      "25",
      "120"
    ],
    correctAnswer: 0,
    explanation: "P(5, 2) = 5! / (5 - 2)! = 5! / 3! = 5 × 4 = 20."
  },
  {
    question: "What is the result of =PERMUT(5, 0)?",
    options: [
      "1",
      "0",
      "5",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "There is exactly 1 way to order 0 items."
  },
  {
    question: "What is the result of =PERMUT(5, 5)?",
    options: [
      "120",
      "1",
      "25",
      "20"
    ],
    correctAnswer: 0,
    explanation: "P(5, 5) = 5! / 0! = 120 / 1 = 120."
  },
  {
    question: "What happens if number_chosen (k) is greater than number (n) in PERMUT, e.g. =PERMUT(3, 5)?",
    options: [
      "Returns #NUM! error",
      "Returns 0",
      "Returns 1",
      "Returns #VALUE!"
    ],
    correctAnswer: 0,
    explanation: "You cannot select more distinct items than available without repetition; Excel returns a #NUM! error."
  },
  {
    question: "How does PERMUT handle non-integer arguments like =PERMUT(5.9, 2.1)?",
    options: [
      "Excel truncates decimal portions before calculating permutations, evaluating PERMUT(5, 2) = 20",
      "Returns #VALUE!",
      "Rounds up to PERMUT(6, 2)",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "PERMUT truncates decimal inputs to integers prior to calculation."
  },
  {
    question: "What is the key difference between PERMUT and COMBIN?",
    options: [
      "PERMUT considers item selection order (ordered arrangement), whereas COMBIN ignores order",
      "PERMUT allows repetition, whereas COMBIN does not",
      "PERMUT works only on text",
      "COMBIN works only on negative numbers"
    ],
    correctAnswer: 0,
    explanation: "Permutations are ordered arrangements; combinations are unordered selections."
  },
  {
    question: "What is the mathematical relationship between PERMUT(n, k) and COMBIN(n, k)?",
    options: [
      "PERMUT(n, k) = COMBIN(n, k) × FACT(k)",
      "COMBIN(n, k) = PERMUT(n, k) × FACT(k)",
      "PERMUT(n, k) = COMBIN(n, k) / FACT(k)",
      "PERMUT and COMBIN are always equal"
    ],
    correctAnswer: 0,
    explanation: "Multiplying combinations by k! arrangements gives permutations: PERMUT(n, k) = COMBIN(n, k) × FACT(k)."
  },
  {
    question: "In race scheduling, if 10 runners compete in a sprint, how many distinct 1st, 2nd, and 3rd place podium finishes are possible?",
    options: [
      "=PERMUT(10, 3) = 720 podium orders",
      "=COMBIN(10, 3) = 120 groups",
      "=POWER(10, 3) = 1000 orders",
      "=FACT(10) = 3628800 orders"
    ],
    correctAnswer: 0,
    explanation: "Podium finishes are ordered without repetition: PERMUT(10, 3) = 10 × 9 × 8 = 720."
  },
  {
    question: "What is the result of =PERMUT(10, 3)?",
    options: [
      "720",
      "120",
      "30",
      "1000"
    ],
    correctAnswer: 0,
    explanation: "P(10, 3) = 10 × 9 × 8 = 720."
  },
  {
    question: "What is the output of =PERMUT(6, 1)?",
    options: [
      "6",
      "1",
      "36",
      "720"
    ],
    correctAnswer: 0,
    explanation: "P(n, 1) = n."
  },
  {
    question: "What is the output of =PERMUT(4, 2)?",
    options: [
      "12",
      "6",
      "8",
      "24"
    ],
    correctAnswer: 0,
    explanation: "P(4, 2) = 4 × 3 = 12."
  },
  {
    question: "What is the output of =PERMUT(4, 3)?",
    options: [
      "24",
      "12",
      "6",
      "64"
    ],
    correctAnswer: 0,
    explanation: "P(4, 3) = 4 × 3 × 2 = 24."
  },
  {
    question: "What happens if a negative number is passed to PERMUT, e.g. =PERMUT(-5, 2)?",
    options: [
      "Returns #NUM! error",
      "Returns 20",
      "Returns -20",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Arguments must be non-negative integers; negative numbers return #NUM! error."
  },
  {
    question: "What is the output of =PERMUT(8, 4)?",
    options: [
      "1680",
      "70",
      "336",
      "4096"
    ],
    correctAnswer: 0,
    explanation: "P(8, 4) = 8 × 7 × 6 × 5 = 1680."
  },
  {
    question: "What is the output of =PERMUT(7, 3)?",
    options: [
      "210",
      "35",
      "42",
      "343"
    ],
    correctAnswer: 0,
    explanation: "P(7, 3) = 7 × 6 × 5 = 210."
  },
  {
    question: "What is the output of =PERMUT(n, n) equal to?",
    options: [
      "FACT(n)",
      "1",
      "n^2",
      "n"
    ],
    correctAnswer: 0,
    explanation: "PERMUT(n, n) = n! / 0! = n! = FACT(n)."
  },
  {
    question: "What is the result of =PERMUT(10, 1)?",
    options: [
      "10",
      "1",
      "100",
      "720"
    ],
    correctAnswer: 0,
    explanation: "P(10, 1) = 10."
  },
  {
    question: "What is the result of =PERMUT(10, 2)?",
    options: [
      "90",
      "45",
      "100",
      "20"
    ],
    correctAnswer: 0,
    explanation: "P(10, 2) = 10 × 9 = 90."
  },
  {
    question: "What happens if numeric text string like \"5\" is passed, e.g. =PERMUT(\"5\", \"2\")?",
    options: [
      "Excel coerces text to numbers and returns 20",
      "Returns #VALUE!",
      "Returns #NUM!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What happens if non-numeric text like \"ABC\" is passed, e.g. =PERMUT(\"ABC\", 2)?",
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
    question: "What is the output of =PERMUT(12, 2)?",
    options: [
      "132",
      "66",
      "24",
      "144"
    ],
    correctAnswer: 0,
    explanation: "P(12, 2) = 12 × 11 = 132."
  },
  {
    question: "What is the output of =PERMUT(15, 3)?",
    options: [
      "2730",
      "455",
      "105",
      "3375"
    ],
    correctAnswer: 0,
    explanation: "P(15, 3) = 15 × 14 × 13 = 2730."
  },
  {
    question: "What is the output of =PERMUT(50, 2)?",
    options: [
      "2450",
      "1225",
      "100",
      "2500"
    ],
    correctAnswer: 0,
    explanation: "P(50, 2) = 50 × 49 = 2450."
  },
  {
    question: "What is the output of =PERMUT(100, 2)?",
    options: [
      "9900",
      "4950",
      "200",
      "10000"
    ],
    correctAnswer: 0,
    explanation: "P(100, 2) = 100 × 99 = 9900."
  },
  {
    question: "What is the result of =PERMUT(5, 3) / COMBIN(5, 3)?",
    options: [
      "6",
      "1",
      "20",
      "120"
    ],
    correctAnswer: 0,
    explanation: "P(5, 3) / C(5, 3) = 60 / 10 = 6 (which equals 3! = FACT(3))."
  },
  {
    question: "What is the output of =PERMUT(6, 3)?",
    options: [
      "120",
      "20",
      "216",
      "720"
    ],
    correctAnswer: 0,
    explanation: "P(6, 3) = 6 × 5 × 4 = 120."
  },
  {
    question: "What is the output of =PERMUT(6, 4)?",
    options: [
      "360",
      "15",
      "120",
      "720"
    ],
    correctAnswer: 0,
    explanation: "P(6, 4) = 6 × 5 × 4 × 3 = 360."
  },
  {
    question: "What is the output of =PERMUT(7, 4)?",
    options: [
      "840",
      "35",
      "210",
      "2401"
    ],
    correctAnswer: 0,
    explanation: "P(7, 4) = 7 × 6 × 5 × 4 = 840."
  },
  {
    question: "What is the ultimate takeaway for using PERMUT in corporate modeling?",
    options: [
      "Use PERMUT to calculate ordered arrangement counts, job machine sequence orderings, and ranked competition results where position order matters",
      "Use it to format fonts",
      "Use it to lock worksheets",
      "Use it to delete formulas"
    ],
    correctAnswer: 0,
    explanation: "PERMUT models ordered subset arrangements without replacement."
  }
];

export default questions;
