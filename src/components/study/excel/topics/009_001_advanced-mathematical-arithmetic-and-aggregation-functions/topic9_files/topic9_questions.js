const questions = [
  {
    question: "What is the primary function of the FLOOR.MATH function in Excel?",
    options: [
      "It rounds a number DOWN to the nearest integer or to the nearest multiple of significance",
      "It rounds a number up to the nearest integer",
      "It calculates the floor area of a grid",
      "It truncates positive numbers to zero"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.MATH(number, [significance], [mode]) rounds a number down to the nearest integer or multiple of significance."
  },
  {
    question: "What is the result of =FLOOR.MATH(24.8)?",
    options: [
      "24",
      "25",
      "24.5",
      "20"
    ],
    correctAnswer: 0,
    explanation: "Default significance is 1, rounding 24.8 DOWN to integer 24."
  },
  {
    question: "What is the result of =FLOOR.MATH(24.8, 5)?",
    options: [
      "20",
      "25",
      "24",
      "30"
    ],
    correctAnswer: 0,
    explanation: "The largest multiple of 5 <= 24.8 is 20."
  },
  {
    question: "What is the result of =FLOOR.MATH(26.1, 5)?",
    options: [
      "25",
      "30",
      "26",
      "20"
    ],
    correctAnswer: 0,
    explanation: "The largest multiple of 5 <= 26.1 is 25."
  },
  {
    question: "How does FLOOR.MATH handle negative numbers by default (mode = 0 or omitted)?",
    options: [
      "It rounds DOWN away from zero (e.g. FLOOR.MATH(-6.3) = -7)",
      "It rounds UP toward zero (e.g. FLOOR.MATH(-6.3) = -6)",
      "It returns a #NUM! error",
      "It returns 0"
    ],
    correctAnswer: 0,
    explanation: "By default (mode = 0), FLOOR.MATH rounds negative numbers mathematically DOWN away from zero (-6.3 -> -7)."
  },
  {
    question: "How does setting mode = 1 (or any non-zero value) change the behavior of FLOOR.MATH for negative numbers?",
    options: [
      "It rounds negative numbers TOWARD zero (e.g. FLOOR.MATH(-6.3, 1, 1) = -6)",
      "It rounds away from zero",
      "It converts negative numbers to positive",
      "It throws a #VALUE! error"
    ],
    correctAnswer: 0,
    explanation: "When mode is non-zero (1), negative numbers round TOWARD zero (-6.3 -> -6)."
  },
  {
    question: "What is the default significance in FLOOR.MATH if significance is omitted?",
    options: [
      "1 (for positive numbers) or -1 (for negative numbers)",
      "0",
      "10",
      "0.1"
    ],
    correctAnswer: 0,
    explanation: "Default significance is 1 for positive numbers and -1 for negative numbers."
  },
  {
    question: "What is the result of =FLOOR.MATH(1.78, 0.5)?",
    options: [
      "1.5",
      "2.0",
      "1.0",
      "1.7"
    ],
    correctAnswer: 0,
    explanation: "The largest multiple of 0.5 <= 1.78 is 1.5."
  },
  {
    question: "What is the result of =FLOOR.MATH(1.5, 0.5)?",
    options: [
      "1.5",
      "1.0",
      "2.0",
      "0"
    ],
    correctAnswer: 0,
    explanation: "1.5 is already an exact multiple of 0.5."
  },
  {
    question: "In volume discounting, if discount tiers start every 500 units, what does =FLOOR.MATH(1450, 500) return?",
    options: [
      "1000",
      "1500",
      "1400",
      "2000"
    ],
    correctAnswer: 0,
    explanation: "The applicable discount tier lower bound is 1000 units."
  },
  {
    question: "What is the result of =FLOOR.MATH(-4.2)?",
    options: [
      "-5",
      "-4",
      "-4.2",
      "0"
    ],
    correctAnswer: 0,
    explanation: "By default, FLOOR.MATH rounds negative numbers away from zero: -4.2 -> -5."
  },
  {
    question: "What is the result of =FLOOR.MATH(-4.2, 1, 1)?",
    options: [
      "-4",
      "-5",
      "0",
      "-4.2"
    ],
    correctAnswer: 0,
    explanation: "With mode = 1, negative numbers round toward zero: -4.2 -> -4."
  },
  {
    question: "What is the output of =FLOOR.MATH(0, 5)?",
    options: [
      "0",
      "5",
      "#NUM!",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "0 is an exact multiple of any significance, returning 0."
  },
  {
    question: "What is the output of =FLOOR.MATH(100.99, 100)?",
    options: [
      "100",
      "200",
      "101",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 100 <= 100.99 is 100."
  },
  {
    question: "What is the output of =FLOOR.MATH(99.99, 100)?",
    options: [
      "0",
      "100",
      "99",
      "50"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 100 <= 99.99 is 0."
  },
  {
    question: "What is the result of =FLOOR.MATH(17, 5)?",
    options: [
      "15",
      "20",
      "17",
      "10"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 5 <= 17 is 15."
  },
  {
    question: "What happens if significance is 0, e.g. =FLOOR.MATH(10, 0)?",
    options: [
      "Returns 0",
      "Returns #DIV/0!",
      "Returns 10",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.MATH(number, 0) returns 0."
  },
  {
    question: "How does FLOOR.MATH handle mixed positive/negative arguments, e.g. =FLOOR.MATH(-10, 3)?",
    options: [
      "Handles mixed signs without error, returning -12 by default",
      "Returns #NUM! error",
      "Returns #VALUE! error",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.MATH uses the absolute value of significance, evaluating -12 by default."
  },
  {
    question: "What is the result of =FLOOR.MATH(-10, 3, 1)?",
    options: [
      "-9",
      "-12",
      "-10",
      "0"
    ],
    correctAnswer: 0,
    explanation: "With mode = 1, negative numbers round toward zero: -10 -> -9."
  },
  {
    question: "How do you calculate completed 15-minute billing blocks for 37 minutes of work?",
    options: [
      "=FLOOR.MATH(37, 15) = 30 minutes",
      "=CEILING.MATH(37, 15) = 45 minutes",
      "=MROUND(37, 15) = 37 minutes",
      "=QUOTIENT(37, 15) = 2 blocks"
    ],
    correctAnswer: 0,
    explanation: "Completed work blocks are lower-bounded: FLOOR.MATH(37, 15) = 30 minutes."
  },
  {
    question: "What is the result of =FLOOR.MATH(4.9, 1)?",
    options: [
      "4",
      "5",
      "4.5",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Rounds 4.9 down to integer 4."
  },
  {
    question: "What is the result of =FLOOR.MATH(-4.9, 1)?",
    options: [
      "-5",
      "-4",
      "0",
      "-4.9"
    ],
    correctAnswer: 0,
    explanation: "By default (mode=0), rounds DOWN away from zero (-4.9 -> -5)."
  },
  {
    question: "What is the result of =FLOOR.MATH(-4.9, 1, 1)?",
    options: [
      "-4",
      "-5",
      "0",
      "-4.9"
    ],
    correctAnswer: 0,
    explanation: "With mode=1, rounds TOWARD zero (-4.9 -> -4)."
  },
  {
    question: "What is the key advantage of FLOOR.MATH over legacy FLOOR?",
    options: [
      "FLOOR.MATH provides default significance=1, handles negative numbers without #NUM! errors, and offers explicit mode parameter",
      "FLOOR.MATH runs 100x faster",
      "FLOOR.MATH converts values to text",
      "FLOOR.MATH requires CTRL+SHIFT+ENTER"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.MATH is modern, robust, and handles mixed signs cleanly."
  },
  {
    question: "What is the result of =FLOOR.MATH(9.99, 10)?",
    options: [
      "0",
      "10",
      "9",
      "5"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 10 <= 9.99 is 0."
  },
  {
    question: "What is the result of =FLOOR.MATH(10.01, 10)?",
    options: [
      "10",
      "20",
      "15",
      "11"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 10 <= 10.01 is 10."
  },
  {
    question: "Why is FLOOR.MATH crucial for quantity tier pricing?",
    options: [
      "Because volume discounts apply only when a customer reaches or exceeds complete threshold tiers (lower bound)",
      "Because it reduces shipping taxes",
      "Because it colors tier labels",
      "Because it converts kg to lbs"
    ],
    correctAnswer: 0,
    explanation: "Discount tier eligibility requires lower-bound rounding."
  },
  {
    question: "What is the result of =FLOOR.MATH(500, 100)?",
    options: [
      "500",
      "400",
      "600",
      "0"
    ],
    correctAnswer: 0,
    explanation: "500 is an exact multiple of 100."
  },
  {
    question: "What is the result of =FLOOR.MATH(599, 100)?",
    options: [
      "500",
      "600",
      "550",
      "590"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 100 <= 599 is 500."
  },
  {
    question: "What is the ultimate takeaway for using FLOOR.MATH in corporate financial models?",
    options: [
      "Use FLOOR.MATH for lower-bound calculations, completed service blocks, and volume discount tier thresholds",
      "Use it to format fonts",
      "Use it to delete formulas",
      "Use it to password protect sheets"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.MATH guarantees reliable lower-bound threshold calculations."
  }
];

export default questions;
