const questions = [
  {
    question: "What is the primary function of the CEILING.PRECISE function in Excel?",
    options: [
      "It rounds a number UP to the nearest integer or to the nearest multiple of significance, regardless of the sign of the number",
      "It rounds a number down to the nearest integer",
      "It calculates precise square roots",
      "It returns exact float division"
    ],
    correctAnswer: 0,
    explanation: "CEILING.PRECISE(number, [significance]) rounds a number UP to the nearest multiple of significance, treating negative numbers consistently toward zero/greater value."
  },
  {
    question: "What is the result of =CEILING.PRECISE(4.3)?",
    options: [
      "5",
      "4",
      "4.5",
      "10"
    ],
    correctAnswer: 0,
    explanation: "When significance is omitted, CEILING.PRECISE defaults to significance 1, rounding 4.3 UP to 5."
  },
  {
    question: "What is the result of =CEILING.PRECISE(4.3, 5)?",
    options: [
      "5",
      "10",
      "4",
      "0"
    ],
    correctAnswer: 0,
    explanation: "The next multiple of 5 above 4.3 is 5."
  },
  {
    question: "How does CEILING.PRECISE handle negative numbers, e.g. =CEILING.PRECISE(-4.3, 5)?",
    options: [
      "It rounds UP toward zero to 0 (since 0 is a multiple of 5 >= -4.3)",
      "It rounds down to -5",
      "It returns a #NUM! error",
      "It returns -10"
    ],
    correctAnswer: 0,
    explanation: "CEILING.PRECISE always rounds mathematically UP (toward greater mathematical value). Multiples of 5 are {... -10, -5, 0, 5...}. The smallest multiple >= -4.3 is 0."
  },
  {
    question: "What is the result of =CEILING.PRECISE(-4.3, 1)?",
    options: [
      "-4",
      "-5",
      "0",
      "-4.3"
    ],
    correctAnswer: 0,
    explanation: "Multiples of 1 are {... -5, -4, -3...}. The smallest multiple >= -4.3 is -4."
  },
  {
    question: "Unlike legacy CEILING, does CEILING.PRECISE throw a #NUM! error if number is negative and significance is positive?",
    options: [
      "No, CEILING.PRECISE uses the absolute value of significance, avoiding #NUM! errors",
      "Yes, it throws #NUM!",
      "It throws #VALUE!",
      "It returns 0 always"
    ],
    correctAnswer: 0,
    explanation: "CEILING.PRECISE uses the absolute value of significance, making sign mismatch errors impossible."
  },
  {
    question: "What is the default significance in CEILING.PRECISE if omitted?",
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
    question: "What is the result of =CEILING.PRECISE(1.23, 0.5)?",
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
    question: "What is the result of =CEILING.PRECISE(-1.23, 0.5)?",
    options: [
      "-1.0",
      "-1.5",
      "0",
      "-1.25"
    ],
    correctAnswer: 0,
    explanation: "Multiples of 0.5 are {... -1.5, -1.0, -0.5...}. The smallest multiple >= -1.23 is -1.0."
  },
  {
    question: "What is the result of =CEILING.PRECISE(10, 0)?",
    options: [
      "0",
      "10",
      "#DIV/0!",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "CEILING.PRECISE(number, 0) returns 0."
  },
  {
    question: "What is the output of =CEILING.PRECISE(17, 5)?",
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
    question: "What is the output of =CEILING.PRECISE(15, 5)?",
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
    question: "What is the output of =CEILING.PRECISE(-15, 5)?",
    options: [
      "-15",
      "-10",
      "-20",
      "0"
    ],
    correctAnswer: 0,
    explanation: "-15 is an exact multiple of 5."
  },
  {
    question: "What is the output of =CEILING.PRECISE(-17, 5)?",
    options: [
      "-15",
      "-20",
      "-17",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Multiples of 5 are {... -20, -15, -10...}. The smallest multiple >= -17 is -15."
  },
  {
    question: "How does CEILING.PRECISE differ from ISO.CEILING?",
    options: [
      "CEILING.PRECISE and ISO.CEILING are functionally identical in Excel",
      "ISO.CEILING works only on dates",
      "CEILING.PRECISE requires VBA",
      "ISO.CEILING throws #NUM! for negative numbers"
    ],
    correctAnswer: 0,
    explanation: "CEILING.PRECISE and ISO.CEILING share identical calculation algorithms in modern Excel."
  },
  {
    question: "What is the result of =CEILING.PRECISE(100.01, 100)?",
    options: [
      "200",
      "100",
      "150",
      "101"
    ],
    correctAnswer: 0,
    explanation: "100.01 rounds UP to 200."
  },
  {
    question: "What is the result of =CEILING.PRECISE(-100.01, 100)?",
    options: [
      "-100",
      "-200",
      "0",
      "-100.01"
    ],
    correctAnswer: 0,
    explanation: "Smallest multiple of 100 >= -100.01 is -100."
  },
  {
    question: "What is the result of =CEILING.PRECISE(0, 10)?",
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
    question: "Why was CEILING.PRECISE introduced in Excel 2010?",
    options: [
      "To provide mathematical consistency for negative numbers and eliminate sign mismatch #NUM! errors across worksheets",
      "To lock worksheets",
      "To speed up internet connection",
      "To replace SUMPRODUCT"
    ],
    correctAnswer: 0,
    explanation: "CEILING.PRECISE eliminates sign-mismatch errors and enforces mathematical ceiling behavior."
  },
  {
    question: "What is the result of =CEILING.PRECISE(2.5, 1)?",
    options: [
      "3",
      "2",
      "2.5",
      "5"
    ],
    correctAnswer: 0,
    explanation: "Next integer >= 2.5 is 3."
  },
  {
    question: "What is the result of =CEILING.PRECISE(-2.5, 1)?",
    options: [
      "-2",
      "-3",
      "0",
      "-2.5"
    ],
    correctAnswer: 0,
    explanation: "Next integer >= -2.5 is -2."
  },
  {
    question: "In commercial packaging, if items count is 37 and batch size is 10, what does =CEILING.PRECISE(37, 10) return?",
    options: [
      "40",
      "30",
      "37",
      "50"
    ],
    correctAnswer: 0,
    explanation: "Smallest multiple of 10 >= 37 is 40."
  },
  {
    question: "What is the result of =CEILING.PRECISE(0.001, 1)?",
    options: [
      "1",
      "0",
      "0.1",
      "2"
    ],
    correctAnswer: 0,
    explanation: "Smallest integer >= 0.001 is 1."
  },
  {
    question: "What is the result of =CEILING.PRECISE(-0.001, 1)?",
    options: [
      "0",
      "-1",
      "1",
      "-0.001"
    ],
    correctAnswer: 0,
    explanation: "Smallest integer >= -0.001 is 0."
  },
  {
    question: "What happens if numeric text string like \"100\" is passed, e.g. =CEILING.PRECISE(\"100\", 5)?",
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
    question: "What is the result of =CEILING.PRECISE(99, 10)?",
    options: [
      "100",
      "90",
      "99",
      "110"
    ],
    correctAnswer: 0,
    explanation: "Smallest multiple of 10 >= 99 is 100."
  },
  {
    question: "What is the result of =CEILING.PRECISE(-99, 10)?",
    options: [
      "-90",
      "-100",
      "0",
      "-99"
    ],
    correctAnswer: 0,
    explanation: "Smallest multiple of 10 >= -99 is -90."
  },
  {
    question: "How does CEILING.PRECISE treat negative significance arguments, e.g. =CEILING.PRECISE(10, -5)?",
    options: [
      "It uses the absolute value of significance (| -5 | = 5) and returns 10 without error",
      "Returns #NUM! error",
      "Returns -10",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "CEILING.PRECISE uses absolute value |significance|."
  },
  {
    question: "What is the output of =CEILING.PRECISE(12, 5)?",
    options: [
      "15",
      "10",
      "12",
      "20"
    ],
    correctAnswer: 0,
    explanation: "Smallest multiple of 5 >= 12 is 15."
  },
  {
    question: "What is the primary benefit of CEILING.PRECISE in global financial modeling templates?",
    options: [
      "Guarantees error-free upward rounding across international currency ledgers regardless of positive or negative cash flow signs",
      "Disables macro security warnings",
      "Protects sheets with passwords automatically",
      "Changes cell border colors"
    ],
    correctAnswer: 0,
    explanation: "CEILING.PRECISE enforces mathematical ceiling logic cleanly across positive and negative values."
  }
];

export default questions;
