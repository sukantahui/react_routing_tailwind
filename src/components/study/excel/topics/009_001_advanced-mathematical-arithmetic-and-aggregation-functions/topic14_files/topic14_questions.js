const questions = [
  {
    question: "What is the primary function of the LCM function in Excel?",
    options: [
      "It returns the least common multiple of two or more integers",
      "It calculates the lowest continuous cost metric",
      "It calculates the linear correlation metric",
      "It returns the smallest decimal value"
    ],
    correctAnswer: 0,
    explanation: "LCM(number1, [number2], ...) returns the smallest positive integer that is a multiple of all supplied numbers."
  },
  {
    question: "What is the result of =LCM(4, 6)?",
    options: [
      "12",
      "24",
      "2",
      "10"
    ],
    correctAnswer: 0,
    explanation: "Multiples of 4: {4, 8, 12, 16...}, Multiples of 6: {6, 12, 18...}. Smallest common multiple is 12."
  },
  {
    question: "What is the result of =LCM(5, 7)?",
    options: [
      "35",
      "1",
      "12",
      "70"
    ],
    correctAnswer: 0,
    explanation: "Since 5 and 7 are prime, LCM(5, 7) = 5 × 7 = 35."
  },
  {
    question: "How does LCM handle non-integer arguments like =LCM(4.8, 6.2)?",
    options: [
      "Excel truncates decimal portions before calculating LCM, evaluating LCM(4, 6) = 12",
      "Returns #VALUE!",
      "Rounds to nearest integer",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "LCM truncates decimal inputs to integers prior to calculation."
  },
  {
    question: "What happens if any argument to LCM is negative, e.g. =LCM(-4, 6)?",
    options: [
      "Returns #NUM! error",
      "Returns 12",
      "Returns -12",
      "Returns #VALUE!"
    ],
    correctAnswer: 0,
    explanation: "LCM accepts only non-negative integers; negative arguments return a #NUM! error."
  },
  {
    question: "What is the maximum number of arguments LCM can accept in Excel?",
    options: [
      "255 arguments",
      "30 arguments",
      "10 arguments",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "LCM accepts up to 255 individual arguments or range references."
  },
  {
    question: "What is the result of =LCM(10, 15, 20)?",
    options: [
      "60",
      "300",
      "5",
      "30"
    ],
    correctAnswer: 0,
    explanation: "60 is the smallest integer divisible by 10, 15, and 20."
  },
  {
    question: "In shift scheduling, if Machine A cycles every 6 minutes and Machine B cycles every 8 minutes, when do both machines cycle simultaneously?",
    options: [
      "=LCM(6, 8) = 24 minutes",
      "=GCD(6, 8) = 2 minutes",
      "=6 * 8 = 48 minutes",
      "=AVERAGE(6, 8) = 7 minutes"
    ],
    correctAnswer: 0,
    explanation: "LCM(6, 8) = 24 minutes gives the synchronized cycle interval."
  },
  {
    question: "What is the result of =LCM(0, 50)?",
    options: [
      "0",
      "50",
      "#NUM!",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "LCM(0, n) returns 0."
  },
  {
    question: "What is the output of =LCM(12, 18)?",
    options: [
      "36",
      "72",
      "6",
      "216"
    ],
    correctAnswer: 0,
    explanation: "LCM(12, 18) = 36."
  },
  {
    question: "What is the output of =LCM(8, 12)?",
    options: [
      "24",
      "96",
      "4",
      "12"
    ],
    correctAnswer: 0,
    explanation: "LCM(8, 12) = 24."
  },
  {
    question: "What is the result of =LCM(A1:A3) if A1=4, A2=\"Text\", and A3=6?",
    options: [
      "12",
      "#VALUE!",
      "24",
      "2"
    ],
    correctAnswer: 0,
    explanation: "Text in range references is ignored, so LCM(4, 6) = 12."
  },
  {
    question: "What happens if direct scalar non-numeric text is passed, e.g. =LCM(4, \"ABC\")?",
    options: [
      "#VALUE! error",
      "12",
      "0",
      "4"
    ],
    correctAnswer: 0,
    explanation: "Direct non-numeric text causes a #VALUE! error."
  },
  {
    question: "What is the result of =LCM(1, 100)?",
    options: [
      "100",
      "1",
      "0",
      "50"
    ],
    correctAnswer: 0,
    explanation: "LCM(1, n) = n."
  },
  {
    question: "What is the output of =LCM(81, 27)?",
    options: [
      "81",
      "27",
      "2187",
      "9"
    ],
    correctAnswer: 0,
    explanation: "Since 27 divides 81, LCM(81, 27) = 81."
  },
  {
    question: "What is the output of =LCM(17, 19)?",
    options: [
      "323",
      "1",
      "36",
      "1719"
    ],
    correctAnswer: 0,
    explanation: "17 and 19 are prime numbers, so LCM(17, 19) = 17 × 19 = 323."
  },
  {
    question: "What is the result of =LCM({4, 6}, {8, 12})?",
    options: [
      "24",
      "48",
      "2",
      "12"
    ],
    correctAnswer: 0,
    explanation: "24 is the smallest integer divisible by 4, 6, 8, and 12."
  },
  {
    question: "What is the output of =LCM(100)?",
    options: [
      "100",
      "1",
      "#VALUE!",
      "50"
    ],
    correctAnswer: 0,
    explanation: "A single argument returns the integer itself."
  },
  {
    question: "What is the output of =LCM(14, 28, 42, 56)?",
    options: [
      "168",
      "14",
      "56",
      "336"
    ],
    correctAnswer: 0,
    explanation: "168 is the smallest integer divisible by 14, 28, 42, and 56."
  },
  {
    question: "What is the output of =LCM(10, 25)?",
    options: [
      "50",
      "250",
      "5",
      "100"
    ],
    correctAnswer: 0,
    explanation: "LCM(10, 25) = 50."
  },
  {
    question: "What is the output of =LCM(16, 32, 64)?",
    options: [
      "64",
      "32",
      "16",
      "128"
    ],
    correctAnswer: 0,
    explanation: "Since 16 and 32 divide 64, LCM = 64."
  },
  {
    question: "How does LCM relate to GCD for two positive numbers a and b?",
    options: [
      "LCM(a, b) = (a × b) / GCD(a, b)",
      "LCM(a, b) = a + b",
      "LCM(a, b) = a - b",
      "LCM and GCD are always equal"
    ],
    correctAnswer: 0,
    explanation: "LCM(a, b) = (a × b) / GCD(a, b)."
  },
  {
    question: "What is the result of =LCM(45, 60, 75)?",
    options: [
      "900",
      "15",
      "450",
      "225"
    ],
    correctAnswer: 0,
    explanation: "900 is the smallest integer divisible by 45, 60, and 75."
  },
  {
    question: "What is the output of =LCM(33, 44, 55)?",
    options: [
      "660",
      "11",
      "330",
      "1320"
    ],
    correctAnswer: 0,
    explanation: "660 is the smallest integer divisible by 33, 44, and 55."
  },
  {
    question: "What is the output of =LCM(13, 26)?",
    options: [
      "26",
      "13",
      "338",
      "1"
    ],
    correctAnswer: 0,
    explanation: "LCM(13, 26) = 26."
  },
  {
    question: "What is the output of =LCM(100, 1000)?",
    options: [
      "1000",
      "100",
      "100000",
      "500"
    ],
    correctAnswer: 0,
    explanation: "LCM(100, 1000) = 1000."
  },
  {
    question: "In financial recurring bill payments, if Bill A recurs every 15 days and Bill B recurs every 20 days, when do both fall on the same day?",
    options: [
      "=LCM(15, 20) = 60 days",
      "=GCD(15, 20) = 5 days",
      "=15 * 20 = 300 days",
      "=AVERAGE(15, 20) = 17.5 days"
    ],
    correctAnswer: 0,
    explanation: "LCM(15, 20) = 60 days."
  },
  {
    question: "What is the result of =LCM(2, 3, 5)?",
    options: [
      "30",
      "10",
      "15",
      "60"
    ],
    correctAnswer: 0,
    explanation: "2 × 3 × 5 = 30."
  },
  {
    question: "What is the output of =LCM(6, 9, 12)?",
    options: [
      "36",
      "18",
      "3",
      "72"
    ],
    correctAnswer: 0,
    explanation: "LCM(6, 9, 12) = 36."
  },
  {
    question: "What is the ultimate takeaway for using LCM in financial and engineering models?",
    options: [
      "Use LCM to synchronize repeating production cycles, find common denominators, and align recurring cash flow schedules",
      "Use it to format cell colors",
      "Use it to password protect sheets",
      "Use it to hide formulas"
    ],
    correctAnswer: 0,
    explanation: "LCM aligns recurring cycles and calculates common denominators."
  }
];

export default questions;
