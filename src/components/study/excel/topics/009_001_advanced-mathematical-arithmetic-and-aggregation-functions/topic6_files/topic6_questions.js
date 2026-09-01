const questions = [
  {
    question: "What is the primary function of the MROUND function in Excel?",
    options: [
      "It rounds a number to the nearest specified multiple",
      "It rounds a number up to the next integer",
      "It multiplies two rounded numbers",
      "It truncates decimals to zero"
    ],
    correctAnswer: 0,
    explanation: "MROUND(number, multiple) rounds a number to the nearest specified multiple (e.g., nearest 50, nearest 0.25)."
  },
  {
    question: "What is the result of =MROUND(1243.67, 50)?",
    options: [
      "1250",
      "1200",
      "1240",
      "1244"
    ],
    correctAnswer: 0,
    explanation: "The nearest multiple of 50 to 1243.67 is 1250."
  },
  {
    question: "What happens if number and multiple have different signs in MROUND, e.g. =MROUND(-10, 3)?",
    options: [
      "Returns #NUM! error",
      "Returns -9",
      "Returns -12",
      "Returns 9"
    ],
    correctAnswer: 0,
    explanation: "In MROUND, number and multiple MUST have the same sign (both positive or both negative); otherwise Excel returns a #NUM! error."
  },
  {
    question: "What is the result of =MROUND(-10, -3)?",
    options: [
      "-9",
      "-12",
      "#NUM!",
      "9"
    ],
    correctAnswer: 0,
    explanation: "Since both inputs are negative, the nearest multiple of -3 to -10 is -9."
  },
  {
    question: "What is the result of =MROUND(1.3, 0.25)?",
    options: [
      "1.25",
      "1.50",
      "1.00",
      "1.30"
    ],
    correctAnswer: 0,
    explanation: "The multiples of 0.25 are 1.00, 1.25, 1.50... 1.3 is closest to 1.25."
  },
  {
    question: "What is the result of =MROUND(1.4, 0.25)?",
    options: [
      "1.5",
      "1.25",
      "1.0",
      "1.75"
    ],
    correctAnswer: 0,
    explanation: "1.4 is closer to 1.50 (diff 0.10) than 1.25 (diff 0.15)."
  },
  {
    question: "What is the result of =MROUND(10, 0)?",
    options: [
      "0",
      "#DIV/0!",
      "10",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "MROUND(number, 0) returns 0."
  },
  {
    question: "How does MROUND round when a number is exactly halfway between two multiples, e.g. =MROUND(5, 10)?",
    options: [
      "It rounds up away from zero to 10",
      "It rounds down to 0",
      "It returns 5",
      "It throws an error"
    ],
    correctAnswer: 0,
    explanation: "When remainder is exactly half the multiple (5 is half of 10), MROUND rounds up away from zero (to 10)."
  },
  {
    question: "In cash transactions in India, if prices are settled to the nearest 50 paise (0.50), what does =MROUND(102.73, 0.50) return?",
    options: [
      "102.50",
      "103.00",
      "102.70",
      "100.00"
    ],
    correctAnswer: 0,
    explanation: "102.73 is closer to 102.50 (diff 0.23) than 103.00 (diff 0.27)."
  },
  {
    question: "What is the result of =MROUND(102.77, 0.50)?",
    options: [
      "103.00",
      "102.50",
      "102.80",
      "100.00"
    ],
    correctAnswer: 0,
    explanation: "102.77 is closer to 103.00 (diff 0.23) than 102.50 (diff 0.27)."
  },
  {
    question: "How do you round shift work time to the nearest 15 minutes (0.25 hours or 15/1440)?",
    options: [
      "=MROUND(TimeValue, 15/1440) or =MROUND(Hours, 0.25)",
      "=ROUND(TimeValue, 15)",
      "=CEILING(TimeValue, 60)",
      "=FLOOR(TimeValue, 10)"
    ],
    correctAnswer: 0,
    explanation: "Since 1 day = 1440 minutes, 15 minutes is 15/1440 in serial date format."
  },
  {
    question: "What is the output of =MROUND(17, 5)?",
    options: [
      "15",
      "20",
      "17",
      "17.5"
    ],
    correctAnswer: 0,
    explanation: "17 is closer to 15 (diff 2) than 20 (diff 3)."
  },
  {
    question: "What is the output of =MROUND(18, 5)?",
    options: [
      "20",
      "15",
      "18",
      "25"
    ],
    correctAnswer: 0,
    explanation: "18 is closer to 20 (diff 2) than 15 (diff 3)."
  },
  {
    question: "What is the output of =MROUND(2.5, 5)?",
    options: [
      "5",
      "0",
      "2.5",
      "10"
    ],
    correctAnswer: 0,
    explanation: "2.5 is exactly half of 5; MROUND rounds up away from zero to 5."
  },
  {
    question: "How can you bypass the #NUM! error in MROUND when handling mixed positive/negative numbers?",
    options: [
      "=MROUND(val, SIGN(val) * multiple)",
      "=ROUND(val, multiple)",
      "=IFERROR(MROUND(val, multiple), 0)",
      "=CEILING(val, multiple)"
    ],
    correctAnswer: 0,
    explanation: "Multiplying the multiple by SIGN(val) ensures both arguments share the exact same sign."
  },
  {
    question: "What is the result of =MROUND(100, 100)?",
    options: [
      "100",
      "0",
      "200",
      "1"
    ],
    correctAnswer: 0,
    explanation: "100 is an exact multiple of 100."
  },
  {
    question: "What is the result of =MROUND(149, 100)?",
    options: [
      "100",
      "200",
      "150",
      "100.0"
    ],
    correctAnswer: 0,
    explanation: "149 is closer to 100 (diff 49) than 200 (diff 51)."
  },
  {
    question: "What is the result of =MROUND(150, 100)?",
    options: [
      "200",
      "100",
      "150",
      "300"
    ],
    correctAnswer: 0,
    explanation: "150 is halfway; MROUND rounds up to 200."
  },
  {
    question: "What is the output of =MROUND(0, 5)?",
    options: [
      "0",
      "5",
      "#NUM!",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "0 rounded to any multiple returns 0."
  },
  {
    question: "Which function family does MROUND belong to?",
    options: [
      "Multiple-Based Precision Rounding Functions",
      "Text Processing Functions",
      "Lookup & Reference Functions",
      "Logical Evaluation Functions"
    ],
    correctAnswer: 0,
    explanation: "MROUND, CEILING, and FLOOR form the multiple-based rounding family."
  },
  {
    question: "What is the output of =MROUND(7.5, 5)?",
    options: [
      "10",
      "5",
      "7.5",
      "0"
    ],
    correctAnswer: 0,
    explanation: "7.5 is halfway between 5 and 10 (diff 2.5); MROUND rounds up to 10."
  },
  {
    question: "What is the result of =MROUND(22, 7)?",
    options: [
      "21",
      "28",
      "14",
      "22"
    ],
    correctAnswer: 0,
    explanation: "Multiples of 7 are 14, 21, 28... 22 is closest to 21."
  },
  {
    question: "What is the result of =MROUND(26, 7)?",
    options: [
      "28",
      "21",
      "35",
      "25"
    ],
    correctAnswer: 0,
    explanation: "26 is closer to 28 (diff 2) than 21 (diff 5)."
  },
  {
    question: "What happens if text is passed to MROUND, e.g. =MROUND(\"100\", 5)?",
    options: [
      "Excel coerces \"100\" to numeric 100 and returns 100",
      "Returns #VALUE!",
      "Returns #NUM!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What is the result of =MROUND(99, 10)?",
    options: [
      "100",
      "90",
      "99",
      "110"
    ],
    correctAnswer: 0,
    explanation: "99 is closest to 100."
  },
  {
    question: "What is the result of =MROUND(94, 10)?",
    options: [
      "90",
      "100",
      "95",
      "94"
    ],
    correctAnswer: 0,
    explanation: "94 is closer to 90 than 100."
  },
  {
    question: "What is the result of =MROUND(95, 10)?",
    options: [
      "100",
      "90",
      "95",
      "105"
    ],
    correctAnswer: 0,
    explanation: "95 is halfway; MROUND rounds up to 100."
  },
  {
    question: "Why is MROUND used in corporate invoice settlement?",
    options: [
      "To round net payment totals to commercial currency denominations (e.g., nearest ₹50 or ₹100) for cash settlement",
      "To hide cents from balance sheets",
      "To prevent tax audits",
      "To convert values to roman numerals"
    ],
    correctAnswer: 0,
    explanation: "MROUND enforces commercial cash settlement multiples."
  },
  {
    question: "What is the output of =MROUND(-15, -10)?",
    options: [
      "-20",
      "-10",
      "20",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "-15 is halfway between -10 and -20; MROUND rounds away from zero to -20."
  },
  {
    question: "What is the ultimate rule to remember when using MROUND?",
    options: [
      "Number and multiple MUST have identical algebraic signs, or use SIGN(val)*multiple to ensure error-free rounding",
      "Multiple must always be 10",
      "MROUND only works on integers",
      "MROUND requires macro permissions"
    ],
    correctAnswer: 0,
    explanation: "Ensuring matching signs avoids the #NUM! error."
  }
];

export default questions;
