const questions = [
  {
    question: "What is the primary function of the FLOOR.PRECISE function in Excel?",
    options: [
      "It rounds a number DOWN to the nearest integer or to the nearest multiple of significance, regardless of the sign of the number",
      "It rounds a number up to the nearest integer",
      "It calculates exact decimal floor divisions",
      "It truncates positive numbers to zero"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.PRECISE(number, [significance]) rounds a number DOWN to the nearest multiple of significance, treating negative numbers mathematically <= number."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(4.8)?",
    options: [
      "4",
      "5",
      "4.5",
      "0"
    ],
    correctAnswer: 0,
    explanation: "When significance is omitted, FLOOR.PRECISE defaults to significance 1, rounding 4.8 DOWN to 4."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(4.8, 5)?",
    options: [
      "0",
      "5",
      "4",
      "10"
    ],
    correctAnswer: 0,
    explanation: "Multiples of 5 are {0, 5, 10...}. The largest multiple <= 4.8 is 0."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(26.1, 5)?",
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
    question: "How does FLOOR.PRECISE handle negative numbers, e.g. =FLOOR.PRECISE(-4.3, 5)?",
    options: [
      "It rounds DOWN away from zero to -5 (since -5 is a multiple of 5 <= -4.3)",
      "It rounds up to 0",
      "It returns a #NUM! error",
      "It returns -10"
    ],
    correctAnswer: 0,
    explanation: "Multiples of 5 are {... -10, -5, 0, 5...}. The largest multiple <= -4.3 is -5."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(-4.3, 1)?",
    options: [
      "-5",
      "-4",
      "0",
      "-4.3"
    ],
    correctAnswer: 0,
    explanation: "Multiples of 1 are {... -6, -5, -4...}. The largest integer <= -4.3 is -5."
  },
  {
    question: "Does FLOOR.PRECISE throw a #NUM! error if number is negative and significance is positive?",
    options: [
      "No, FLOOR.PRECISE uses the absolute value of significance, avoiding #NUM! errors",
      "Yes, it throws #NUM!",
      "It throws #VALUE!",
      "It returns 0 always"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.PRECISE uses absolute value |significance|, preventing sign mismatch errors."
  },
  {
    question: "What is the default significance in FLOOR.PRECISE if omitted?",
    options: [
      "1",
      "0",
      "10",
      "-1"
    ],
    correctAnswer: 0,
    explanation: "Default significance is 1."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(1.78, 0.5)?",
    options: [
      "1.5",
      "2.0",
      "1.0",
      "1.7"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 0.5 <= 1.78 is 1.5."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(-1.78, 0.5)?",
    options: [
      "-2.0",
      "-1.5",
      "-1.0",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Multiples of 0.5 are {... -2.5, -2.0, -1.5...}. The largest multiple <= -1.78 is -2.0."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(10, 0)?",
    options: [
      "0",
      "10",
      "#DIV/0!",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.PRECISE(number, 0) returns 0."
  },
  {
    question: "What is the output of =FLOOR.PRECISE(17, 5)?",
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
    question: "What is the output of =FLOOR.PRECISE(15, 5)?",
    options: [
      "15",
      "20",
      "10",
      "25"
    ],
    correctAnswer: 0,
    explanation: "15 is an exact multiple of 5."
  },
  {
    question: "What is the output of =FLOOR.PRECISE(-15, 5)?",
    options: [
      "-15",
      "-20",
      "-10",
      "0"
    ],
    correctAnswer: 0,
    explanation: "-15 is an exact multiple of 5."
  },
  {
    question: "What is the output of =FLOOR.PRECISE(-17, 5)?",
    options: [
      "-20",
      "-15",
      "-17",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Multiples of 5 are {... -25, -20, -15...}. The largest multiple <= -17 is -20."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(100.99, 100)?",
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
    question: "What is the result of =FLOOR.PRECISE(-100.01, 100)?",
    options: [
      "-200",
      "-100",
      "0",
      "-100.01"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 100 <= -100.01 is -200."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(0, 10)?",
    options: [
      "0",
      "10",
      "#NUM!",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "0 is an exact multiple of any significance."
  },
  {
    question: "Why was FLOOR.PRECISE introduced in Excel 2010?",
    options: [
      "To provide mathematical consistency for negative numbers and eliminate sign mismatch #NUM! errors across worksheets",
      "To lock worksheets",
      "To speed up internet connection",
      "To replace SUMPRODUCT"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.PRECISE eliminates sign-mismatch errors and enforces mathematical floor behavior."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(2.5, 1)?",
    options: [
      "2",
      "3",
      "2.5",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Largest integer <= 2.5 is 2."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(-2.5, 1)?",
    options: [
      "-3",
      "-2",
      "0",
      "-2.5"
    ],
    correctAnswer: 0,
    explanation: "Largest integer <= -2.5 is -3."
  },
  {
    question: "In volume discounting, if items count is 37 and tier step is 10, what does =FLOOR.PRECISE(37, 10) return?",
    options: [
      "30",
      "40",
      "37",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 10 <= 37 is 30."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(0.99, 1)?",
    options: [
      "0",
      "1",
      "0.9",
      "2"
    ],
    correctAnswer: 0,
    explanation: "Largest integer <= 0.99 is 0."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(-0.001, 1)?",
    options: [
      "-1",
      "0",
      "1",
      "-0.001"
    ],
    correctAnswer: 0,
    explanation: "Largest integer <= -0.001 is -1."
  },
  {
    question: "What happens if numeric text string like \"100\" is passed, e.g. =FLOOR.PRECISE(\"100\", 5)?",
    options: [
      "Excel coerces \"100\" to 100 and returns 100",
      "Returns #VALUE!",
      "Returns #NUM!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(99, 10)?",
    options: [
      "90",
      "100",
      "99",
      "80"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 10 <= 99 is 90."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(-99, 10)?",
    options: [
      "-100",
      "-90",
      "0",
      "-99"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 10 <= -99 is -100."
  },
  {
    question: "How does FLOOR.PRECISE treat negative significance arguments, e.g. =FLOOR.PRECISE(10, -5)?",
    options: [
      "It uses the absolute value of significance (| -5 | = 5) and returns 10 without error",
      "Returns #NUM! error",
      "Returns -10",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.PRECISE uses absolute value |significance|."
  },
  {
    question: "What is the output of =FLOOR.PRECISE(12, 5)?",
    options: [
      "10",
      "15",
      "12",
      "5"
    ],
    correctAnswer: 0,
    explanation: "Largest multiple of 5 <= 12 is 10."
  },
  {
    question: "What is the primary benefit of FLOOR.PRECISE in global financial modeling templates?",
    options: [
      "Guarantees error-free downward rounding across international currency ledgers regardless of positive or negative cash flow signs",
      "Disables macro security warnings",
      "Protects sheets with passwords automatically",
      "Changes cell border colors"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.PRECISE enforces mathematical floor logic cleanly across positive and negative values."
  }
];

export default questions;
