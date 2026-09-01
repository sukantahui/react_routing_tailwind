const questions = [
  {
    question: "What is the primary function of the GCD function in Excel?",
    options: [
      "It returns the greatest common divisor of two or more integers",
      "It calculates the global cumulative total",
      "It calculates the geometric center distance",
      "It converts decimals to fractions"
    ],
    correctAnswer: 0,
    explanation: "GCD(number1, [number2], ...) returns the largest positive integer that divides all supplied numbers without remainder."
  },
  {
    question: "What is the result of =GCD(24, 36)?",
    options: [
      "12",
      "6",
      "4",
      "2"
    ],
    correctAnswer: 0,
    explanation: "The largest integer dividing both 24 and 36 is 12."
  },
  {
    question: "What is the result of =GCD(5, 7)?",
    options: [
      "1",
      "5",
      "35",
      "0"
    ],
    correctAnswer: 0,
    explanation: "5 and 7 are coprime numbers, so their greatest common divisor is 1."
  },
  {
    question: "How does GCD handle non-integer arguments like =GCD(24.8, 36.2)?",
    options: [
      "Excel truncates decimal portions before calculating GCD, evaluating GCD(24, 36) = 12",
      "Returns #VALUE!",
      "Rounds to nearest integer",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "GCD truncates decimal inputs to integers prior to calculation."
  },
  {
    question: "What happens if any argument to GCD is negative, e.g. =GCD(-24, 36)?",
    options: [
      "Returns #NUM! error",
      "Returns 12",
      "Returns -12",
      "Returns #VALUE!"
    ],
    correctAnswer: 0,
    explanation: "GCD accepts only non-negative integers; negative arguments return a #NUM! error."
  },
  {
    question: "What is the maximum number of arguments GCD can accept in Excel?",
    options: [
      "255 arguments",
      "30 arguments",
      "10 arguments",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "GCD accepts up to 255 individual arguments or range references."
  },
  {
    question: "What is the result of =GCD(100, 250, 400)?",
    options: [
      "50",
      "100",
      "25",
      "10"
    ],
    correctAnswer: 0,
    explanation: "50 is the largest integer that divides 100, 250, and 400."
  },
  {
    question: "How can GCD be used to simplify a fraction like 24/36 to its simplest form?",
    options: [
      "Numerator = 24 / GCD(24, 36) = 2, Denominator = 36 / GCD(24, 36) = 3 (Simplifies to 2/3)",
      "Numerator = 24 * GCD(24, 36)",
      "Denominator = 36 - GCD(24, 36)",
      "Use MOD(24, 36)"
    ],
    correctAnswer: 0,
    explanation: "Dividing both numerator and denominator by their GCD reduces the fraction to lowest terms."
  },
  {
    question: "What is the result of =GCD(0, 50)?",
    options: [
      "50",
      "0",
      "#NUM!",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "GCD(0, n) returns n, because any integer divides 0."
  },
  {
    question: "What is the result of =GCD(0, 0)?",
    options: [
      "0",
      "#NUM!",
      "#VALUE!",
      "1"
    ],
    correctAnswer: 0,
    explanation: "GCD(0, 0) returns 0."
  },
  {
    question: "In manufacturing, if cutting timber beams into equal max-length pieces from 120cm and 180cm logs, what piece length is selected?",
    options: [
      "=GCD(120, 180) = 60 cm",
      "=LCM(120, 180) = 360 cm",
      "=AVERAGE(120, 180) = 150 cm",
      "=MIN(120, 180) = 120 cm"
    ],
    correctAnswer: 0,
    explanation: "GCD(120, 180) = 60 cm gives the maximum common equal length without wastage."
  },
  {
    question: "What is the output of =GCD(12, 18, 24)?",
    options: [
      "6",
      "12",
      "3",
      "2"
    ],
    correctAnswer: 0,
    explanation: "6 is the largest integer dividing 12, 18, and 24."
  },
  {
    question: "What is the output of =GCD(8, 12)?",
    options: [
      "4",
      "2",
      "8",
      "24"
    ],
    correctAnswer: 0,
    explanation: "GCD(8, 12) = 4."
  },
  {
    question: "What is the result of =GCD(A1:A3) if A1=10, A2=\"Text\", and A3=15?",
    options: [
      "5",
      "#VALUE!",
      "10",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Text in range references is ignored, so GCD(10, 15) = 5."
  },
  {
    question: "What happens if direct scalar non-numeric text is passed, e.g. =GCD(10, \"ABC\")?",
    options: [
      "#VALUE! error",
      "10",
      "0",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Direct non-numeric text causes a #VALUE! error."
  },
  {
    question: "What is the result of =GCD(1, 100)?",
    options: [
      "1",
      "100",
      "0",
      "50"
    ],
    correctAnswer: 0,
    explanation: "The GCD of 1 and any positive integer is 1."
  },
  {
    question: "What is the output of =GCD(81, 27)?",
    options: [
      "27",
      "9",
      "3",
      "81"
    ],
    correctAnswer: 0,
    explanation: "Since 27 divides 81, GCD(81, 27) = 27."
  },
  {
    question: "What is the output of =GCD(17, 19)?",
    options: [
      "1",
      "17",
      "19",
      "323"
    ],
    correctAnswer: 0,
    explanation: "17 and 19 are prime numbers, so their GCD is 1."
  },
  {
    question: "In tile layout design, if a room is 240cm by 300cm, what is the largest square tile size to cover the floor without cutting?",
    options: [
      "=GCD(240, 300) = 60 cm x 60 cm tiles",
      "=LCM(240, 300) = 1200 cm",
      "=MIN(240, 300) = 240 cm",
      "=MOD(300, 240) = 60 cm"
    ],
    correctAnswer: 0,
    explanation: "GCD(240, 300) = 60 cm square tiles fit perfectly without cutting."
  },
  {
    question: "What is the result of =GCD({12, 18}, {24, 30})?",
    options: [
      "6",
      "12",
      "3",
      "60"
    ],
    correctAnswer: 0,
    explanation: "6 divides all four numbers 12, 18, 24, 30."
  },
  {
    question: "What is the output of =GCD(100)?",
    options: [
      "100",
      "1",
      "#VALUE!",
      "50"
    ],
    correctAnswer: 0,
    explanation: "A single argument to GCD returns the integer itself."
  },
  {
    question: "What is the output of =GCD(14, 28, 42, 56)?",
    options: [
      "14",
      "7",
      "28",
      "2"
    ],
    correctAnswer: 0,
    explanation: "14 divides 14, 28, 42, and 56."
  },
  {
    question: "What is the output of =GCD(10, 25)?",
    options: [
      "5",
      "10",
      "25",
      "1"
    ],
    correctAnswer: 0,
    explanation: "GCD(10, 25) = 5."
  },
  {
    question: "What is the output of =GCD(16, 32, 64)?",
    options: [
      "16",
      "8",
      "32",
      "4"
    ],
    correctAnswer: 0,
    explanation: "GCD(16, 32, 64) = 16."
  },
  {
    question: "How does GCD relate to LCM for two positive numbers a and b?",
    options: [
      "a × b = GCD(a, b) × LCM(a, b)",
      "GCD(a, b) = a + b",
      "LCM(a, b) = a - b",
      "GCD and LCM are always equal"
    ],
    correctAnswer: 0,
    explanation: "The fundamental theorem of arithmetic states that a × b = GCD(a, b) × LCM(a, b)."
  },
  {
    question: "What is the result of =GCD(45, 60, 75)?",
    options: [
      "15",
      "5",
      "30",
      "45"
    ],
    correctAnswer: 0,
    explanation: "15 divides 45, 60, and 75."
  },
  {
    question: "What is the output of =GCD(33, 44, 55)?",
    options: [
      "11",
      "33",
      "1",
      "22"
    ],
    correctAnswer: 0,
    explanation: "11 divides 33, 44, and 55."
  },
  {
    question: "What is the output of =GCD(13, 26)?",
    options: [
      "13",
      "1",
      "26",
      "2"
    ],
    correctAnswer: 0,
    explanation: "GCD(13, 26) = 13."
  },
  {
    question: "What is the output of =GCD(100, 1000)?",
    options: [
      "100",
      "1000",
      "10",
      "500"
    ],
    correctAnswer: 0,
    explanation: "GCD(100, 1000) = 100."
  },
  {
    question: "What is the ultimate takeaway for using GCD in financial and engineering models?",
    options: [
      "Use GCD to simplify ratios, reduce fractions to lowest terms, and determine maximum common physical unit dimensions without wastage",
      "Use it to format cell colors",
      "Use it to password protect sheets",
      "Use it to hide formulas"
    ],
    correctAnswer: 0,
    explanation: "GCD calculates common equal divisions and simplifies fraction ratios."
  }
];

export default questions;
