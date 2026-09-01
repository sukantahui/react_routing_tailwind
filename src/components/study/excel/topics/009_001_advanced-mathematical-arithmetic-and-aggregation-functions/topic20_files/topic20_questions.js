const questions = [
  {
    question: "What is the primary function of the PERMUTATIONA function in Excel?",
    options: [
      "It calculates the number of permutations with repetition for a given number of items PERMUTATIONA(n, k) = n^k",
      "It calculates permutations without repetition",
      "It calculates combinations with repetition",
      "It permutes arrays into alphabetical order"
    ],
    correctAnswer: 0,
    explanation: "PERMUTATIONA(number, number_chosen) returns the number of ordered permutations WITH repetition (n^k)."
  },
  {
    question: "What is the simple exponential formula for PERMUTATIONA(n, k)?",
    options: [
      "PERMUTATIONA(n, k) = n^k (or POWER(n, k))",
      "PERMUTATIONA(n, k) = n! / (n - k)!",
      "PERMUTATIONA(n, k) = COMBIN(n + k - 1, k)",
      "PERMUTATIONA(n, k) = n * k"
    ],
    correctAnswer: 0,
    explanation: "Permutations with repetition when choosing k items from n choices is simply n^k."
  },
  {
    question: "What is the result of =PERMUTATIONA(3, 2)?",
    options: [
      "9",
      "6",
      "8",
      "27"
    ],
    correctAnswer: 0,
    explanation: "3^2 = 9."
  },
  {
    question: "What are the 9 permutations with repetition when choosing 2 positions from 3 choices {A, B, C}?",
    options: [
      "{AA, AB, AC, BA, BB, BC, CA, CB, CC}",
      "{AA, AB, AC, BB, BC, CC}",
      "{AB, AC, BC}",
      "{AAA, BBB, CCC}"
    ],
    correctAnswer: 0,
    explanation: "Repetition and position order both matter: 3 × 3 = 9 options."
  },
  {
    question: "Can number_chosen (k) be greater than number (n) in PERMUTATIONA, e.g. =PERMUTATIONA(2, 4)?",
    options: [
      "Yes, PERMUTATIONA allows k > n because items can be repeated across positions, returning 2^4 = 16",
      "No, it returns #NUM!",
      "No, it returns #VALUE!",
      "It returns 0"
    ],
    correctAnswer: 0,
    explanation: "With replacement, choosing 4 positions from 2 choices yields 2^4 = 16 options."
  },
  {
    question: "What is the result of =PERMUTATIONA(10, 4)?",
    options: [
      "10000",
      "5040",
      "210",
      "40"
    ],
    correctAnswer: 0,
    explanation: "10^4 = 10,000 (which represents total 4-digit PIN code options from 0-9)."
  },
  {
    question: "In security PIN code design, how many 4-digit PIN codes can be created using 10 digits (0-9) allowing repeating numbers?",
    options: [
      "=PERMUTATIONA(10, 4) = 10,000 PINs",
      "=PERMUT(10, 4) = 5,040 PINs",
      "=COMBIN(10, 4) = 210 PINs",
      "=COMBINA(10, 4) = 715 PINs"
    ],
    correctAnswer: 0,
    explanation: "PIN codes are ordered with repetition: 10^4 = 10,000."
  },
  {
    question: "What is the result of =PERMUTATIONA(5, 0)?",
    options: [
      "1",
      "0",
      "5",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "5^0 = 1."
  },
  {
    question: "What is the result of =PERMUTATIONA(0, 5)?",
    options: [
      "0",
      "1",
      "#NUM!",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "0^5 = 0."
  },
  {
    question: "What is the result of =PERMUTATIONA(0, 0)?",
    options: [
      "1",
      "0",
      "#NUM!",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "0^0 = 1 by mathematical convention."
  },
  {
    question: "How does PERMUTATIONA handle non-integer arguments like =PERMUTATIONA(3.9, 2.1)?",
    options: [
      "Excel truncates decimal portions before calculating permutations, evaluating PERMUTATIONA(3, 2) = 9",
      "Returns #VALUE!",
      "Rounds up to PERMUTATIONA(4, 2)",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "PERMUTATIONA truncates decimal inputs to integers prior to calculation."
  },
  {
    question: "What happens if a negative number is passed to PERMUTATIONA, e.g. =PERMUTATIONA(-3, 2)?",
    options: [
      "Returns #NUM! error",
      "Returns 9",
      "Returns -9",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Arguments must be non-negative integers; negative numbers return #NUM! error."
  },
  {
    question: "What is the result of =PERMUTATIONA(4, 3)?",
    options: [
      "64",
      "24",
      "12",
      "256"
    ],
    correctAnswer: 0,
    explanation: "4^3 = 64."
  },
  {
    question: "What is the output of =PERMUTATIONA(2, 8)?",
    options: [
      "256",
      "16",
      "64",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "2^8 = 256 (which represents total binary 8-bit byte states)."
  },
  {
    question: "In computer science data representation, how many unique bit patterns exist in an 8-bit byte with 2 binary states (0, 1)?",
    options: [
      "=PERMUTATIONA(2, 8) = 256 states",
      "=PERMUT(2, 8) = #NUM!",
      "=COMBIN(2, 8) = #NUM!",
      "=2 * 8 = 16 states"
    ],
    correctAnswer: 0,
    explanation: "Binary bit states are ordered with repetition: 2^8 = 256."
  },
  {
    question: "What is the output of =PERMUTATIONA(6, 2)?",
    options: [
      "36",
      "30",
      "12",
      "216"
    ],
    correctAnswer: 0,
    explanation: "6^2 = 36."
  },
  {
    question: "What is the output of =PERMUTATIONA(5, 3)?",
    options: [
      "125",
      "60",
      "15",
      "243"
    ],
    correctAnswer: 0,
    explanation: "5^3 = 125."
  },
  {
    question: "What is the result of =PERMUTATIONA(10, 1)?",
    options: [
      "10",
      "1",
      "100",
      "0"
    ],
    correctAnswer: 0,
    explanation: "10^1 = 10."
  },
  {
    question: "What is the result of =PERMUTATIONA(10, 2)?",
    options: [
      "100",
      "90",
      "20",
      "1000"
    ],
    correctAnswer: 0,
    explanation: "10^2 = 100."
  },
  {
    question: "What happens if numeric text string like \"3\" is passed, e.g. =PERMUTATIONA(\"3\", \"2\")?",
    options: [
      "Excel coerces text to numbers and returns 9",
      "Returns #VALUE!",
      "Returns #NUM!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What happens if non-numeric text like \"ABC\" is passed, e.g. =PERMUTATIONA(\"ABC\", 2)?",
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
    question: "What is the output of =PERMUTATIONA(2, 10)?",
    options: [
      "1024",
      "20",
      "100",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "2^10 = 1024 (1 Kilobyte state count)."
  },
  {
    question: "What is the output of =PERMUTATIONA(3, 4)?",
    options: [
      "81",
      "12",
      "24",
      "64"
    ],
    correctAnswer: 0,
    explanation: "3^4 = 81."
  },
  {
    question: "What is the output of =PERMUTATIONA(4, 4)?",
    options: [
      "256",
      "24",
      "16",
      "64"
    ],
    correctAnswer: 0,
    explanation: "4^4 = 256."
  },
  {
    question: "What is the output of =PERMUTATIONA(7, 2)?",
    options: [
      "49",
      "42",
      "14",
      "343"
    ],
    correctAnswer: 0,
    explanation: "7^2 = 49."
  },
  {
    question: "What is the output of =PERMUTATIONA(8, 2)?",
    options: [
      "64",
      "56",
      "16",
      "512"
    ],
    correctAnswer: 0,
    explanation: "8^2 = 64."
  },
  {
    question: "What is the output of =PERMUTATIONA(9, 2)?",
    options: [
      "81",
      "72",
      "18",
      "729"
    ],
    correctAnswer: 0,
    explanation: "9^2 = 81."
  },
  {
    question: "What is the difference between PERMUTATIONA(n, k) and COMBINA(n, k)?",
    options: [
      "PERMUTATIONA considers position order (ordered), whereas COMBINA ignores position order (unordered)",
      "PERMUTATIONA allows negative numbers",
      "COMBINA allows only k < n",
      "PERMUTATIONA returns text strings"
    ],
    correctAnswer: 0,
    explanation: "PERMUTATIONA is ordered with repetition; COMBINA is unordered with repetition."
  },
  {
    question: "What is the result of =PERMUTATIONA(5, 2) - PERMUT(5, 2)?",
    options: [
      "5",
      "0",
      "10",
      "25"
    ],
    correctAnswer: 0,
    explanation: "5^2 - P(5, 2) = 25 - 20 = 5 (which represents the 5 self-repeating pairs {11, 22, 33, 44, 55})."
  },
  {
    question: "What is the ultimate takeaway for using PERMUTATIONA in technology and financial models?",
    options: [
      "Use PERMUTATIONA to calculate total password state spaces, security PIN code combinations, binary bit states, and ordered sequences where replacement is allowed",
      "Use it to format cell colors",
      "Use it to lock worksheets",
      "Use it to hide formulas"
    ],
    correctAnswer: 0,
    explanation: "PERMUTATIONA models exponential ordered state spaces with replacement."
  }
];

export default questions;
