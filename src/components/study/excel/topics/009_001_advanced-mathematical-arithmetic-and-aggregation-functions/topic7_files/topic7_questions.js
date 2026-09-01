const questions = [
  {
    question: "What is the primary function of the CEILING.MATH function in Excel?",
    options: [
      "It rounds a number UP to the nearest integer or to the nearest multiple of significance",
      "It rounds a number down to the lower integer",
      "It returns the absolute value of a number",
      "It calculates the percentage ceiling"
    ],
    correctAnswer: 0,
    explanation: "CEILING.MATH(number, [significance], [mode]) rounds a number up to the nearest integer or multiple of significance."
  },
  {
    question: "What is the result of =CEILING.MATH(24.3)?",
    options: [
      "25",
      "24",
      "24.5",
      "30"
    ],
    correctAnswer: 0,
    explanation: "When significance is omitted, CEILING.MATH defaults to significance 1, rounding 24.3 UP to 25."
  },
  {
    question: "What is the result of =CEILING.MATH(24.3, 5)?",
    options: [
      "25",
      "30",
      "24",
      "20"
    ],
    correctAnswer: 0,
    explanation: "The next multiple of 5 above 24.3 is 25."
  },
  {
    question: "What is the result of =CEILING.MATH(26.1, 5)?",
    options: [
      "30",
      "25",
      "27",
      "35"
    ],
    correctAnswer: 0,
    explanation: "The next multiple of 5 above 26.1 is 30."
  },
  {
    question: "How does CEILING.MATH handle negative numbers by default (mode = 0 or omitted)?",
    options: [
      "It rounds UP toward zero (e.g. CEILING.MATH(-6.3) = -6)",
      "It rounds AWAY from zero (e.g. CEILING.MATH(-6.3) = -7)",
      "It returns a #NUM! error",
      "It returns 0"
    ],
    correctAnswer: 0,
    explanation: "By default (mode = 0), CEILING.MATH rounds negative numbers UP toward zero (-6.3 -> -6)."
  },
  {
    question: "How does setting mode = 1 (or any non-zero value) change the behavior of CEILING.MATH for negative numbers?",
    options: [
      "It rounds negative numbers AWAY from zero (e.g. CEILING.MATH(-6.3, 1, 1) = -7)",
      "It rounds toward zero",
      "It converts negative numbers to positive",
      "It throws a #VALUE! error"
    ],
    correctAnswer: 0,
    explanation: "When mode is non-zero (1), negative numbers round AWAY from zero (-6.3 -> -7)."
  },
  {
    question: "Unlike legacy CEILING, what happens if number and significance have different signs in CEILING.MATH, e.g. =CEILING.MATH(-10, 3)?",
    options: [
      "CEILING.MATH automatically handles mixed signs without error, returning -9",
      "Returns #NUM! error",
      "Returns #VALUE! error",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "CEILING.MATH handles negative numbers and positive significance without throwing #NUM! errors."
  },
  {
    question: "What is the result of =CEILING.MATH(1.23, 0.5)?",
    options: [
      "1.5",
      "1.0",
      "1.25",
      "2.0"
    ],
    correctAnswer: 0,
    explanation: "The next multiple of 0.5 above 1.23 is 1.5."
  },
  {
    question: "What is the result of =CEILING.MATH(1.5, 0.5)?",
    options: [
      "1.5",
      "2.0",
      "1.0",
      "2.5"
    ],
    correctAnswer: 0,
    explanation: "1.5 is already an exact multiple of 0.5, so CEILING.MATH returns 1.5."
  },
  {
    question: "In shipping logistics, if 145 items require 12-unit containers, how many total containers are needed using CEILING.MATH?",
    options: [
      "=CEILING.MATH(145 / 12) = 13 containers",
      "=QUOTIENT(145, 12) = 12 containers",
      "=MOD(145, 12) = 1 container",
      "=FLOOR.MATH(145 / 12) = 12 containers"
    ],
    correctAnswer: 0,
    explanation: "145 / 12 = 12.083; CEILING.MATH rounds up to 13 total containers."
  },
  {
    question: "What is the default significance in CEILING.MATH if significance argument is omitted?",
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
    question: "What is the result of =CEILING.MATH(-4.2)?",
    options: [
      "-4",
      "-5",
      "-4.2",
      "0"
    ],
    correctAnswer: 0,
    explanation: "By default, CEILING.MATH rounds negative numbers toward zero: -4.2 -> -4."
  },
  {
    question: "What is the result of =CEILING.MATH(-4.2, 1, 1)?",
    options: [
      "-5",
      "-4",
      "0",
      "-4.2"
    ],
    correctAnswer: 0,
    explanation: "With mode = 1, negative numbers round away from zero: -4.2 -> -5."
  },
  {
    question: "What is the output of =CEILING.MATH(0, 5)?",
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
    question: "In tax calculations, if income tax is rounded UP to the nearest ₹100, what does =CEILING.MATH(12430, 100) return?",
    options: [
      "12500",
      "12400",
      "12450",
      "13000"
    ],
    correctAnswer: 0,
    explanation: "The next multiple of 100 above 12430 is 12500."
  },
  {
    question: "What is the result of =CEILING.MATH(100.01, 100)?",
    options: [
      "200",
      "100",
      "150",
      "101"
    ],
    correctAnswer: 0,
    explanation: "Even a tiny fraction over 100 forces CEILING.MATH to round up to the next multiple 200."
  },
  {
    question: "What is the result of =CEILING.MATH(100.00, 100)?",
    options: [
      "100",
      "200",
      "0",
      "101"
    ],
    correctAnswer: 0,
    explanation: "100.00 is already an exact multiple, returning 100."
  },
  {
    question: "What is the output of =CEILING.MATH(17, 5)?",
    options: [
      "20",
      "15",
      "17",
      "25"
    ],
    correctAnswer: 0,
    explanation: "The next multiple of 5 above 17 is 20."
  },
  {
    question: "What is the output of =CEILING.MATH(15, 5)?",
    options: [
      "15",
      "20",
      "10",
      "25"
    ],
    correctAnswer: 0,
    explanation: "15 is already an exact multiple of 5."
  },
  {
    question: "What happens if significance is 0, e.g. =CEILING.MATH(10, 0)?",
    options: [
      "Returns 0",
      "Returns #DIV/0!",
      "Returns 10",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "CEILING.MATH(number, 0) returns 0."
  },
  {
    question: "What is the output of =CEILING.MATH(-10, 3)?",
    options: [
      "-9",
      "-12",
      "-10",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "By default, rounds negative numbers UP toward zero (-10 -> -9)."
  },
  {
    question: "What is the output of =CEILING.MATH(-10, 3, 1)?",
    options: [
      "-12",
      "-9",
      "-10",
      "-15"
    ],
    correctAnswer: 0,
    explanation: "With mode = 1, rounds negative numbers AWAY from zero (-10 -> -12)."
  },
  {
    question: "How do you calculate total billable 15-minute slots for 37 minutes of service?",
    options: [
      "=CEILING.MATH(37, 15) = 45 minutes",
      "=FLOOR.MATH(37, 15) = 30 minutes",
      "=MROUND(37, 15) = 37 minutes",
      "=QUOTIENT(37, 15) = 2 slots"
    ],
    correctAnswer: 0,
    explanation: "Service pricing requires rounding UP to billable slots: CEILING.MATH(37, 15) = 45 minutes."
  },
  {
    question: "What is the result of =CEILING.MATH(4.1, 1)?",
    options: [
      "5",
      "4",
      "4.5",
      "10"
    ],
    correctAnswer: 0,
    explanation: "Rounds 4.1 up to integer 5."
  },
  {
    question: "What is the result of =CEILING.MATH(-4.1, 1)?",
    options: [
      "-4",
      "-5",
      "0",
      "-4.1"
    ],
    correctAnswer: 0,
    explanation: "By default (mode=0), rounds UP toward zero (-4.1 -> -4)."
  },
  {
    question: "What is the key advantage of CEILING.MATH over legacy CEILING?",
    options: [
      "CEILING.MATH provides default significance=1, handles negative numbers without #NUM! errors, and offers explicit mode parameter",
      "CEILING.MATH runs 100x faster",
      "CEILING.MATH converts values to text",
      "CEILING.MATH requires CTRL+SHIFT+ENTER"
    ],
    correctAnswer: 0,
    explanation: "CEILING.MATH is modern, robust, and handles mixed signs cleanly."
  },
  {
    question: "What is the result of =CEILING.MATH(0.01, 10)?",
    options: [
      "10",
      "0",
      "1",
      "0.1"
    ],
    correctAnswer: 0,
    explanation: "Any positive value > 0 rounds UP to significance 10."
  },
  {
    question: "What is the result of =CEILING.MATH(9.99, 10)?",
    options: [
      "10",
      "9",
      "0",
      "20"
    ],
    correctAnswer: 0,
    explanation: "9.99 rounds UP to 10."
  },
  {
    question: "What is the result of =CEILING.MATH(10.01, 10)?",
    options: [
      "20",
      "10",
      "15",
      "11"
    ],
    correctAnswer: 0,
    explanation: "10.01 rounds UP to the next multiple 20."
  },
  {
    question: "Why is CEILING.MATH crucial for warehouse container planning?",
    options: [
      "Because partial container loads require reserving an entire additional full container (rounding UP to full container capacity)",
      "Because it reduces shipping taxes",
      "Because it colors container labels",
      "Because it converts kg to lbs"
    ],
    correctAnswer: 0,
    explanation: "Shipping planning requires rounding UP to reserve full container capacity."
  }
];

export default questions;
