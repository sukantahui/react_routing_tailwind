const questions = [
  {
    question: "What is the primary function of the COMBIN function in Excel?",
    options: [
      "It calculates the number of combinations for a given number of items without repetition C(n, k) = n! / (k! × (n-k)!)",
      "It calculates permutations with repetition",
      "It combines text strings from multiple cells",
      "It combines dynamic array ranges into a single column"
    ],
    correctAnswer: 0,
    explanation: "COMBIN(number, number_chosen) returns the number of combinations (unordered selections without repetition)."
  },
  {
    question: "What is the result of =COMBIN(5, 2)?",
    options: [
      "10",
      "20",
      "25",
      "120"
    ],
    correctAnswer: 0,
    explanation: "C(5, 2) = 5! / (2! × 3!) = (5 × 4) / 2 = 10."
  },
  {
    question: "What is the result of =COMBIN(5, 0)?",
    options: [
      "1",
      "0",
      "5",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "There is exactly 1 way to choose 0 items from 5 (the empty set)."
  },
  {
    question: "What is the result of =COMBIN(5, 5)?",
    options: [
      "1",
      "5",
      "25",
      "120"
    ],
    correctAnswer: 0,
    explanation: "There is exactly 1 way to choose all 5 items from 5."
  },
  {
    question: "What happens if number_chosen is greater than number, e.g. =COMBIN(3, 5)?",
    options: [
      "Returns #NUM! error",
      "Returns 0",
      "Returns 1",
      "Returns #VALUE!"
    ],
    correctAnswer: 0,
    explanation: "You cannot choose more items than available without repetition; Excel returns a #NUM! error."
  },
  {
    question: "How does COMBIN handle non-integer arguments like =COMBIN(5.9, 2.1)?",
    options: [
      "Excel truncates decimal portions before calculating combinations, evaluating COMBIN(5, 2) = 10",
      "Returns #VALUE!",
      "Rounds up to COMBIN(6, 2)",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "COMBIN truncates decimal inputs to integers prior to calculation."
  },
  {
    question: "What is the key difference between COMBIN and PERMUT?",
    options: [
      "COMBIN ignores order (unordered selection), whereas PERMUT considers order (ordered selection)",
      "COMBIN allows repetition, whereas PERMUT does not",
      "COMBIN works only on text",
      "PERMUT works only on negative numbers"
    ],
    correctAnswer: 0,
    explanation: "Combinations are unordered selections; permutations are ordered selections."
  },
  {
    question: "What is the mathematical relationship between COMBIN(n, k) and PERMUT(n, k)?",
    options: [
      "PERMUT(n, k) = COMBIN(n, k) × FACT(k)",
      "COMBIN(n, k) = PERMUT(n, k) × FACT(k)",
      "COMBIN(n, k) = PERMUT(n, k) + FACT(k)",
      "COMBIN and PERMUT are always equal"
    ],
    correctAnswer: 0,
    explanation: "Since there are k! orderings per combination set, PERMUT(n, k) = COMBIN(n, k) × FACT(k)."
  },
  {
    question: "What is the symmetry property of COMBIN, e.g. COMBIN(10, 3) vs COMBIN(10, 7)?",
    options: [
      "COMBIN(n, k) = COMBIN(n, n - k), so COMBIN(10, 3) = COMBIN(10, 7) = 120",
      "COMBIN(10, 3) > COMBIN(10, 7)",
      "COMBIN(10, 3) < COMBIN(10, 7)",
      "COMBIN(10, 7) returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "Choosing k items to include is mathematically identical to choosing (n-k) items to exclude."
  },
  {
    question: "What is the result of =COMBIN(10, 3)?",
    options: [
      "120",
      "720",
      "30",
      "210"
    ],
    correctAnswer: 0,
    explanation: "C(10, 3) = (10 × 9 × 8) / (3 × 2 × 1) = 720 / 6 = 120."
  },
  {
    question: "In quality control sampling, if selecting 3 sample units from a 20-unit lot, how many distinct 3-unit audit samples exist?",
    options: [
      "=COMBIN(20, 3) = 1140 samples",
      "=PERMUT(20, 3) = 6840 samples",
      "=20 * 3 = 60 samples",
      "=POWER(20, 3) = 8000 samples"
    ],
    correctAnswer: 0,
    explanation: "Audit sampling is unordered without repetition: COMBIN(20, 3) = 1140."
  },
  {
    question: "What is the output of =COMBIN(6, 1)?",
    options: [
      "6",
      "1",
      "36",
      "720"
    ],
    correctAnswer: 0,
    explanation: "C(n, 1) = n."
  },
  {
    question: "What is the output of =COMBIN(6, 4)?",
    options: [
      "15",
      "360",
      "30",
      "20"
    ],
    correctAnswer: 0,
    explanation: "COMBIN(6, 4) = COMBIN(6, 2) = 15."
  },
  {
    question: "What is the output of =COMBIN(4, 2)?",
    options: [
      "6",
      "12",
      "8",
      "24"
    ],
    correctAnswer: 0,
    explanation: "C(4, 2) = (4 × 3) / 2 = 6."
  },
  {
    question: "What happens if a negative number is passed to COMBIN, e.g. =COMBIN(-5, 2)?",
    options: [
      "Returns #NUM! error",
      "Returns 10",
      "Returns -10",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Arguments must be non-negative integers; negative numbers return #NUM! error."
  },
  {
    question: "What is the output of =COMBIN(8, 4)?",
    options: [
      "70",
      "1680",
      "56",
      "112"
    ],
    correctAnswer: 0,
    explanation: "C(8, 4) = (8 × 7 × 6 × 5) / (4 × 3 × 2 × 1) = 1680 / 24 = 70."
  },
  {
    question: "What is the output of =COMBIN(7, 3)?",
    options: [
      "35",
      "210",
      "21",
      "42"
    ],
    correctAnswer: 0,
    explanation: "C(7, 3) = (7 × 6 × 5) / 6 = 35."
  },
  {
    question: "What is Pascal's Triangle identity in terms of COMBIN?",
    options: [
      "COMBIN(n, k) = COMBIN(n-1, k-1) + COMBIN(n-1, k)",
      "COMBIN(n, k) = COMBIN(n-1, k) × k",
      "COMBIN(n, k) = COMBIN(n, k-1) + 1",
      "COMBIN(n, k) = COMBIN(n+1, k+1)"
    ],
    correctAnswer: 0,
    explanation: "Pascal's identity C(n, k) = C(n-1, k-1) + C(n-1, k)."
  },
  {
    question: "What is the sum of all combinations for n items, SUM(COMBIN(n, k)) for k=0 to n?",
    options: [
      "2^n (e.g. for n=4, 1+4+6+4+1 = 16 = 2^4)",
      "n!",
      "n^2",
      "n × (n + 1) / 2"
    ],
    correctAnswer: 0,
    explanation: "The binomial theorem proves that SUM C(n, k) = 2^n."
  },
  {
    question: "What is the result of =COMBIN(10, 1)?",
    options: [
      "10",
      "1",
      "100",
      "45"
    ],
    correctAnswer: 0,
    explanation: "C(10, 1) = 10."
  },
  {
    question: "What is the result of =COMBIN(10, 9)?",
    options: [
      "10",
      "1",
      "90",
      "45"
    ],
    correctAnswer: 0,
    explanation: "C(10, 9) = C(10, 1) = 10."
  },
  {
    question: "What is the result of =COMBIN(10, 5)?",
    options: [
      "252",
      "120",
      "50",
      "30240"
    ],
    correctAnswer: 0,
    explanation: "C(10, 5) = 252."
  },
  {
    question: "What happens if numeric text string like \"5\" is passed, e.g. =COMBIN(\"5\", \"2\")?",
    options: [
      "Excel coerces text to numbers and returns 10",
      "Returns #VALUE!",
      "Returns #NUM!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What happens if non-numeric text like \"ABC\" is passed, e.g. =COMBIN(\"ABC\", 2)?",
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
    question: "What is the output of =COMBIN(12, 2)?",
    options: [
      "66",
      "132",
      "24",
      "144"
    ],
    correctAnswer: 0,
    explanation: "C(12, 2) = (12 × 11) / 2 = 66."
  },
  {
    question: "What is the output of =COMBIN(15, 3)?",
    options: [
      "455",
      "2730",
      "105",
      "3375"
    ],
    correctAnswer: 0,
    explanation: "C(15, 3) = (15 × 14 × 13) / 6 = 455."
  },
  {
    question: "What is the output of =COMBIN(50, 2)?",
    options: [
      "1225",
      "2450",
      "100",
      "2500"
    ],
    correctAnswer: 0,
    explanation: "C(50, 2) = (50 × 49) / 2 = 1225."
  },
  {
    question: "What is the output of =COMBIN(100, 2)?",
    options: [
      "4950",
      "9900",
      "200",
      "10000"
    ],
    correctAnswer: 0,
    explanation: "C(100, 2) = (100 × 99) / 2 = 4950."
  },
  {
    question: "What is the result of =COMBIN(5, 3) + COMBIN(5, 2)?",
    options: [
      "20",
      "10",
      "15",
      "25"
    ],
    correctAnswer: 0,
    explanation: "C(5, 3) = 10 and C(5, 2) = 10; 10 + 10 = 20."
  },
  {
    question: "What is the ultimate takeaway for using COMBIN in financial and risk analysis?",
    options: [
      "Use COMBIN to calculate portfolio asset pairing combinations, audit sample selections, and risk scenario subset counts where item order does not matter",
      "Use it to format cell colors",
      "Use it to lock worksheets",
      "Use it to sort columns"
    ],
    correctAnswer: 0,
    explanation: "COMBIN calculates unordered subset selection counts."
  }
];

export default questions;
