const questions = [
  {
    question: "What is the primary function of the EVEN function in Excel?",
    options: [
      "It rounds a positive number UP to the next even integer, and a negative number DOWN away from zero to the next even integer",
      "It checks if a number is even and returns TRUE/FALSE",
      "It sums even numbers in a range",
      "It converts even numbers to odd numbers"
    ],
    correctAnswer: 0,
    explanation: "EVEN(number) rounds a number away from zero to the next even integer."
  },
  {
    question: "What is the result of =EVEN(1.5)?",
    options: [
      "2",
      "1",
      "0",
      "4"
    ],
    correctAnswer: 0,
    explanation: "1.5 rounded away from zero to the next even integer is 2."
  },
  {
    question: "What is the result of =EVEN(3)?",
    options: [
      "4",
      "2",
      "3",
      "6"
    ],
    correctAnswer: 0,
    explanation: "3 rounded away from zero to the next even integer is 4."
  },
  {
    question: "What is the result of =EVEN(2)?",
    options: [
      "2",
      "4",
      "0",
      "2.0"
    ],
    correctAnswer: 0,
    explanation: "2 is already an even integer, so EVEN(2) returns 2."
  },
  {
    question: "What is the result of =EVEN(-1.5)?",
    options: [
      "-2",
      "-1",
      "0",
      "-4"
    ],
    correctAnswer: 0,
    explanation: "EVEN rounds away from zero. For -1.5, the next even integer away from zero is -2."
  },
  {
    question: "What is the primary function of the ODD function in Excel?",
    options: [
      "It rounds a number away from zero to the next odd integer",
      "It checks if a number is odd and returns TRUE/FALSE",
      "It sums odd numbers in a range",
      "It converts odd numbers to even numbers"
    ],
    correctAnswer: 0,
    explanation: "ODD(number) rounds a number away from zero to the next odd integer."
  },
  {
    question: "What is the result of =ODD(1.5)?",
    options: [
      "3",
      "1",
      "2",
      "5"
    ],
    correctAnswer: 0,
    explanation: "1.5 rounded away from zero to the next odd integer is 3."
  },
  {
    question: "What is the result of =ODD(2)?",
    options: [
      "3",
      "1",
      "2",
      "5"
    ],
    correctAnswer: 0,
    explanation: "2 rounded away from zero to the next odd integer is 3."
  },
  {
    question: "What is the result of =ODD(3)?",
    options: [
      "3",
      "5",
      "1",
      "3.0"
    ],
    correctAnswer: 0,
    explanation: "3 is already an odd integer, returning 3."
  },
  {
    question: "What is the result of =ODD(-1.5)?",
    options: [
      "-3",
      "-1",
      "0",
      "-5"
    ],
    correctAnswer: 0,
    explanation: "ODD rounds away from zero. For -1.5, the next odd integer away from zero is -3."
  },
  {
    question: "What is the result of =EVEN(0)?",
    options: [
      "0",
      "2",
      "#VALUE!",
      "1"
    ],
    correctAnswer: 0,
    explanation: "0 is an even integer, returning 0."
  },
  {
    question: "What is the result of =ODD(0)?",
    options: [
      "1",
      "0",
      "-1",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "0 rounded away from zero to the next odd integer is 1."
  },
  {
    question: "In warehouse packaging, if items must be packed in pairs (2 per box), which function guarantees pair capacity for N items?",
    options: [
      "=EVEN(N)",
      "=ODD(N)",
      "=ROUND(N, 2)",
      "=MOD(N, 2)"
    ],
    correctAnswer: 0,
    explanation: "EVEN(N) rounds up to the next even number, ensuring full pair capacity."
  },
  {
    question: "What is the result of =EVEN(ODD(4))?",
    options: [
      "6",
      "5",
      "4",
      "8"
    ],
    correctAnswer: 0,
    explanation: "ODD(4) = 5. EVEN(5) = 6."
  },
  {
    question: "What is the result of =ODD(EVEN(3))?",
    options: [
      "5",
      "4",
      "3",
      "7"
    ],
    correctAnswer: 0,
    explanation: "EVEN(3) = 4. ODD(4) = 5."
  },
  {
    question: "What is the result of =EVEN(2.01)?",
    options: [
      "4",
      "2",
      "3",
      "2.5"
    ],
    correctAnswer: 0,
    explanation: "2.01 exceeds 2, so the next even integer away from zero is 4."
  },
  {
    question: "What is the result of =ODD(3.01)?",
    options: [
      "5",
      "3",
      "4",
      "3.5"
    ],
    correctAnswer: 0,
    explanation: "3.01 exceeds 3, so the next odd integer away from zero is 5."
  },
  {
    question: "What is the result of =EVEN(-2.01)?",
    options: [
      "-4",
      "-2",
      "-3",
      "0"
    ],
    correctAnswer: 0,
    explanation: "-2.01 rounded away from zero to the next even integer is -4."
  },
  {
    question: "What is the result of =ODD(-3.01)?",
    options: [
      "-5",
      "-3",
      "-4",
      "0"
    ],
    correctAnswer: 0,
    explanation: "-3.01 rounded away from zero to the next odd integer is -5."
  },
  {
    question: "How do EVEN and ODD handle text representations of numbers, e.g. =EVEN(\"5\")?",
    options: [
      "Excel coerces \"5\" to numeric 5 and returns 6",
      "Returns #VALUE!",
      "Returns 0",
      "Returns \"6\""
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What is the result of =EVEN(10)?",
    options: [
      "10",
      "12",
      "8",
      "0"
    ],
    correctAnswer: 0,
    explanation: "10 is already an even integer."
  },
  {
    question: "What is the result of =ODD(11)?",
    options: [
      "11",
      "13",
      "9",
      "0"
    ],
    correctAnswer: 0,
    explanation: "11 is already an odd integer."
  },
  {
    question: "What is the result of =EVEN(0.1)?",
    options: [
      "2",
      "0",
      "1",
      "0.2"
    ],
    correctAnswer: 0,
    explanation: "0.1 rounded away from zero to the next even integer is 2."
  },
  {
    question: "What is the result of =ODD(0.1)?",
    options: [
      "1",
      "0",
      "3",
      "0.1"
    ],
    correctAnswer: 0,
    explanation: "0.1 rounded away from zero to the next odd integer is 1."
  },
  {
    question: "Why are EVEN and ODD useful in physical manufacturing packaging?",
    options: [
      "They ensure product items are packaged in exact pairs (EVEN) or odd-numbered batch sets (ODD)",
      "They calculate financial interest",
      "They format dates",
      "They calculate square roots"
    ],
    correctAnswer: 0,
    explanation: "Packaging constraints often mandate even-pair or odd-set bundling."
  },
  {
    question: "What is the result of =EVEN(-10)?",
    options: [
      "-10",
      "-12",
      "-8",
      "0"
    ],
    correctAnswer: 0,
    explanation: "-10 is already an even integer."
  },
  {
    question: "What is the result of =ODD(-11)?",
    options: [
      "-11",
      "-13",
      "-9",
      "0"
    ],
    correctAnswer: 0,
    explanation: "-11 is already an odd integer."
  },
  {
    question: "What happens if non-numeric text like \"ABC\" is passed, e.g. =EVEN(\"ABC\")?",
    options: [
      "Returns #VALUE! error",
      "Returns 0",
      "Returns 2",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "Non-numeric text causes a #VALUE! error."
  },
  {
    question: "What is the result of =EVEN(99)?",
    options: [
      "100",
      "98",
      "99",
      "102"
    ],
    correctAnswer: 0,
    explanation: "99 rounded away from zero to the next even integer is 100."
  },
  {
    question: "What is the ultimate rule for EVEN and ODD rounding direction?",
    options: [
      "Both functions ALWAYS round AWAY FROM ZERO to the next even or odd integer",
      "Both functions round toward zero",
      "Both functions round to nearest integer",
      "Both functions round up for positive numbers only"
    ],
    correctAnswer: 0,
    explanation: "EVEN and ODD always round away from zero."
  }
];

export default questions;
