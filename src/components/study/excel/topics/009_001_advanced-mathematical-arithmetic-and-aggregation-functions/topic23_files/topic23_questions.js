const questions = [
  {
    question: "What is the primary function of the SUMX2MY2 function in Excel?",
    options: [
      "It calculates the sum of the difference of squares between corresponding values in two arrays SUM(x² - y²)",
      "It calculates the square of the difference between sum x and sum y",
      "It multiplies two squared arrays",
      "It calculates matrix determinants"
    ],
    correctAnswer: 0,
    explanation: "SUMX2MY2(array_x, array_y) computes SUM(x² - y²) for paired elements across array_x and array_y."
  },
  {
    question: "What is the algebraic identity equivalence of x² - y² used by SUMX2MY2?",
    options: [
      "x² - y² = (x - y)(x + y)",
      "x² - y² = (x - y)²",
      "x² - y² = (x + y)²",
      "x² - y² = x² + y² - 2xy"
    ],
    correctAnswer: 0,
    explanation: "The difference of squares factorizes algebraically into (x - y)(x + y)."
  },
  {
    question: "What is the result of =SUMX2MY2({4, 5}, {3, 4})?",
    options: [
      "16",
      "7",
      "9",
      "25"
    ],
    correctAnswer: 0,
    explanation: "(4² - 3²) + (5² - 4²) = (16 - 9) + (25 - 16) = 7 + 9 = 16."
  },
  {
    question: "What is the result of =SUMX2MY2({2}, {4})?",
    options: [
      "-12",
      "12",
      "20",
      "-4"
    ],
    correctAnswer: 0,
    explanation: "2² - 4² = 4 - 16 = -12."
  },
  {
    question: "What is the result of =SUMX2MY2({5}, {5})?",
    options: [
      "0",
      "25",
      "50",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "5² - 5² = 25 - 25 = 0."
  },
  {
    question: "What happens if array_x and array_y have different dimensions, e.g. =SUMX2MY2(A1:A3, B1:B4)?",
    options: [
      "Returns #N/A error",
      "Ignores extra cell",
      "Returns #VALUE!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Array dimension mismatch causes a #N/A error in Excel array difference functions."
  },
  {
    question: "How does SUMX2MY2 handle text strings inside range references?",
    options: [
      "Text strings inside range references are ignored during calculation",
      "Returns #VALUE! error",
      "Coerces text to 0",
      "Returns #N/A error"
    ],
    correctAnswer: 0,
    explanation: "Text in range references is ignored; only direct scalar non-numeric text triggers #VALUE!."
  },
  {
    question: "In statistical variance comparison, how is SUMX2MY2 used to measure energy variance differences between baseline (x) and actual (y) power readings?",
    options: [
      "Passing baseline x vector and actual y vector calculates total kinetic or power squared variance differential SUM(x² - y²)",
      "It formats variance cells in red",
      "It calculates total mean squared error",
      "It hides negative variance rows"
    ],
    correctAnswer: 0,
    explanation: "SUMX2MY2 calculates total paired energy/power squared differential SUM(x² - y²)."
  },
  {
    question: "What is the output of =SUMX2MY2({3}, {2})?",
    options: [
      "5",
      "1",
      "13",
      "-5"
    ],
    correctAnswer: 0,
    explanation: "3² - 2² = 9 - 4 = 5."
  },
  {
    question: "What is the output of =SUMX2MY2({10, 20}, {5, 10})?",
    options: [
      "375",
      "300",
      "400",
      "500"
    ],
    correctAnswer: 0,
    explanation: "(10² - 5²) + (20² - 10²) = (100 - 25) + (400 - 100) = 75 + 300 = 375."
  },
  {
    question: "What is the output of =SUMX2MY2({6, 8}, {0, 0})?",
    options: [
      "100",
      "14",
      "48",
      "0"
    ],
    correctAnswer: 0,
    explanation: "(6² - 0²) + (8² - 0²) = 36 + 64 = 100."
  },
  {
    question: "What is the result of =SUMX2MY2({-4}, {3})?",
    options: [
      "7",
      "-7",
      "25",
      "-25"
    ],
    correctAnswer: 0,
    explanation: "(-4)² - 3² = 16 - 9 = 7."
  },
  {
    question: "What is the result of =SUMX2MY2({4}, {-3})?",
    options: [
      "7",
      "-7",
      "25",
      "-25"
    ],
    correctAnswer: 0,
    explanation: "4² - (-3)² = 16 - 9 = 7."
  },
  {
    question: "What is the result of =SUMX2MY2({-4}, {-3})?",
    options: [
      "7",
      "-7",
      "25",
      "-25"
    ],
    correctAnswer: 0,
    explanation: "(-4)² - (-3)² = 16 - 9 = 7."
  },
  {
    question: "What happens if scalar non-numeric text is passed directly inside array literal, e.g. =SUMX2MY2({\"ABC\"}, {3})?",
    options: [
      "Returns #VALUE! error",
      "Returns -9",
      "Returns 0",
      "Returns #N/A"
    ],
    correctAnswer: 0,
    explanation: "Direct non-numeric text causes a #VALUE! error."
  },
  {
    question: "What is the result of =SUMX2MY2({1, 2, 3}, {1, 2, 3})?",
    options: [
      "0",
      "14",
      "28",
      "#N/A"
    ],
    correctAnswer: 0,
    explanation: "Identical arrays result in x² - y² = 0 for all pairs, yielding 0."
  },
  {
    question: "What is the output of =SUMX2MY2({1, 2, 3}, {3, 2, 1})?",
    options: [
      "0",
      "16",
      "-8",
      "8"
    ],
    correctAnswer: 0,
    explanation: "(1² - 3²) + (2² - 2²) + (3² - 1²) = (1 - 9) + (4 - 4) + (9 - 1) = -8 + 0 + 8 = 0."
  },
  {
    question: "What is the output of =SUMX2MY2({5, 10}, {4, 8})?",
    options: [
      "45",
      "9",
      "36",
      "81"
    ],
    correctAnswer: 0,
    explanation: "(5² - 4²) + (10² - 8²) = (25 - 16) + (100 - 64) = 9 + 36 = 45."
  },
  {
    question: "What is the output of =SUMX2MY2({10}, {8})?",
    options: [
      "36",
      "18",
      "2",
      "164"
    ],
    correctAnswer: 0,
    explanation: "10² - 8² = 100 - 64 = 36."
  },
  {
    question: "What is the output of =SUMX2MY2({13}, {12})?",
    options: [
      "25",
      "1",
      "313",
      "169"
    ],
    correctAnswer: 0,
    explanation: "13² - 12² = 169 - 144 = 25 (Pythagorean triple 5²)."
  },
  {
    question: "What is the output of =SUMX2MY2({17}, {15})?",
    options: [
      "64",
      "2",
      "514",
      "32"
    ],
    correctAnswer: 0,
    explanation: "17² - 15² = 289 - 225 = 64 (Pythagorean triple 8²)."
  },
  {
    question: "What is the output of =SUMX2MY2({25}, {24})?",
    options: [
      "49",
      "1",
      "1201",
      "7"
    ],
    correctAnswer: 0,
    explanation: "25² - 24² = 625 - 576 = 49 (Pythagorean triple 7²)."
  },
  {
    question: "What is the result of =SUMX2MY2({1, 1}, {0, 0})?",
    options: [
      "2",
      "1",
      "0",
      "4"
    ],
    correctAnswer: 0,
    explanation: "(1² - 0) + (1² - 0) = 1 + 1 = 2."
  },
  {
    question: "What is the result of =SUMX2MY2({0, 0}, {1, 1})?",
    options: [
      "-2",
      "2",
      "0",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "(0 - 1²) + (0 - 1²) = -1 + -1 = -2."
  },
  {
    question: "What is the output of =SUMX2MY2({7}, {3})?",
    options: [
      "40",
      "10",
      "58",
      "16"
    ],
    correctAnswer: 0,
    explanation: "7² - 3² = 49 - 9 = 40."
  },
  {
    question: "What is the output of =SUMX2MY2({8}, {5})?",
    options: [
      "39",
      "13",
      "89",
      "24"
    ],
    correctAnswer: 0,
    explanation: "8² - 5² = 64 - 25 = 39."
  },
  {
    question: "What is the output of =SUMX2MY2({9}, {4})?",
    options: [
      "65",
      "13",
      "97",
      "36"
    ],
    correctAnswer: 0,
    explanation: "9² - 4² = 81 - 16 = 65."
  },
  {
    question: "What is the output of =SUMX2MY2({10}, {6})?",
    options: [
      "64",
      "16",
      "136",
      "36"
    ],
    correctAnswer: 0,
    explanation: "10² - 6² = 100 - 36 = 64 (Pythagorean triple 8²)."
  },
  {
    question: "What is the output of =SUMX2MY2({12}, {5})?",
    options: [
      "119",
      "17",
      "169",
      "60"
    ],
    correctAnswer: 0,
    explanation: "12² - 5² = 144 - 25 = 119."
  },
  {
    question: "What is the ultimate takeaway for using SUMX2MY2 in statistical and engineering models?",
    options: [
      "Use SUMX2MY2 to compute paired difference of squares SUM(x² - y²) for orthogonal vector variance analysis, kinetic energy differentials, and Pythagorean distance comparisons",
      "Use it to format cell colors",
      "Use it to lock worksheets",
      "Use it to hide rows"
    ],
    correctAnswer: 0,
    explanation: "SUMX2MY2 computes paired difference of squares SUM(x² - y²) efficiently."
  }
];

export default questions;
