const questions = [
  {
    question: "What is the primary function of the SUMX2PY2 function in Excel?",
    options: [
      "It calculates the sum of the sum of squares of corresponding values in two arrays SUM(x² + y²)",
      "It calculates the square of the sum (SUM(x) + SUM(y))²",
      "It multiplies two squared arrays",
      "It calculates Euclidean distance without square roots"
    ],
    correctAnswer: 0,
    explanation: "SUMX2PY2(array_x, array_y) computes SUM(x² + y²) for paired elements across array_x and array_y."
  },
  {
    question: "What is the result of =SUMX2PY2({3, 4}, {4, 3})?",
    options: [
      "50",
      "25",
      "0",
      "49"
    ],
    correctAnswer: 0,
    explanation: "(3² + 4²) + (4² + 3²) = (9 + 16) + (16 + 9) = 25 + 25 = 50."
  },
  {
    question: "What is the result of =SUMX2PY2({3}, {4})?",
    options: [
      "25",
      "7",
      "12",
      "49"
    ],
    correctAnswer: 0,
    explanation: "3² + 4² = 9 + 16 = 25 (Pythagorean hypotenuse squared)."
  },
  {
    question: "How can SQRT(SUMX2PY2(x, y)) be used in geometry and physics?",
    options: [
      "It calculates the Euclidean norm (straight-line distance) between origin (0, 0) and points (x, y)",
      "It calculates area of a circle",
      "It calculates perimeter",
      "It calculates matrix determinant"
    ],
    correctAnswer: 0,
    explanation: "SQRT(x² + y²) calculates 2D Euclidean distance."
  },
  {
    question: "What is the result of =SUMX2PY2({0}, {0})?",
    options: [
      "0",
      "1",
      "#VALUE!",
      "#N/A"
    ],
    correctAnswer: 0,
    explanation: "0² + 0² = 0."
  },
  {
    question: "What happens if array_x and array_y have different dimensions, e.g. =SUMX2PY2(A1:A3, B1:B4)?",
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
    question: "How does SUMX2PY2 handle negative numbers inside arrays, e.g. =SUMX2PY2({-3}, {-4})?",
    options: [
      "Negative numbers are squared, becoming positive: (-3)² + (-4)² = 9 + 16 = 25",
      "Returns -25",
      "Returns #NUM!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Squaring any real number yields a non-negative value: (-3)² + (-4)² = 25."
  },
  {
    question: "What is the result of =SUMX2PY2({-3}, {4})?",
    options: [
      "25",
      "-7",
      "7",
      "-25"
    ],
    correctAnswer: 0,
    explanation: "(-3)² + 4² = 9 + 16 = 25."
  },
  {
    question: "What is the output of =SUMX2PY2({6}, {8})?",
    options: [
      "100",
      "14",
      "48",
      "28"
    ],
    correctAnswer: 0,
    explanation: "6² + 8² = 36 + 64 = 100."
  },
  {
    question: "What is the result of =SQRT(SUMX2PY2({6}, {8}))?",
    options: [
      "10",
      "100",
      "14",
      "48"
    ],
    correctAnswer: 0,
    explanation: "SQRT(100) = 10 (Pythagorean 6-8-10 triangle hypotenuse)."
  },
  {
    question: "What is the output of =SUMX2PY2({5, 12}, {0, 0})?",
    options: [
      "169",
      "17",
      "144",
      "25"
    ],
    correctAnswer: 0,
    explanation: "(5² + 0²) + (12² + 0²) = 25 + 144 = 169."
  },
  {
    question: "What is the result of =SUMX2PY2({1, 2}, {3, 4})?",
    options: [
      "30",
      "25",
      "10",
      "14"
    ],
    correctAnswer: 0,
    explanation: "(1² + 3²) + (2² + 4²) = (1 + 9) + (4 + 16) = 10 + 20 = 30."
  },
  {
    question: "What is the output of =SUMX2PY2({2, 3}, {1, 2})?",
    options: [
      "18",
      "13",
      "5",
      "25"
    ],
    correctAnswer: 0,
    explanation: "(2² + 1²) + (3² + 2²) = (4 + 1) + (9 + 4) = 5 + 13 = 18."
  },
  {
    question: "What happens if scalar non-numeric text is passed directly inside array literal, e.g. =SUMX2PY2({\"ABC\"}, {3})?",
    options: [
      "Returns #VALUE! error",
      "Returns 9",
      "Returns 0",
      "Returns #N/A"
    ],
    correctAnswer: 0,
    explanation: "Direct non-numeric text causes a #VALUE! error."
  },
  {
    question: "What is the result of =SUMX2PY2({1, 1}, {1, 1})?",
    options: [
      "4",
      "2",
      "0",
      "8"
    ],
    correctAnswer: 0,
    explanation: "(1 + 1) + (1 + 1) = 4."
  },
  {
    question: "What is the output of =SUMX2PY2({5}, {12})?",
    options: [
      "169",
      "13",
      "17",
      "60"
    ],
    correctAnswer: 0,
    explanation: "5² + 12² = 25 + 144 = 169 (Pythagorean 5-12-13 triangle hypotenuse squared)."
  },
  {
    question: "What is the output of =SUMX2PY2({8}, {15})?",
    options: [
      "289",
      "17",
      "225",
      "64"
    ],
    correctAnswer: 0,
    explanation: "8² + 15² = 64 + 225 = 289 (Pythagorean 8-15-17 triangle hypotenuse squared)."
  },
  {
    question: "What is the output of =SUMX2PY2({7}, {24})?",
    options: [
      "625",
      "25",
      "576",
      "49"
    ],
    correctAnswer: 0,
    explanation: "7² + 24² = 49 + 576 = 625 (Pythagorean 7-24-25 triangle hypotenuse squared)."
  },
  {
    question: "What is the output of =SUMX2PY2({9}, {40})?",
    options: [
      "1681",
      "41",
      "1600",
      "81"
    ],
    correctAnswer: 0,
    explanation: "9² + 40² = 81 + 1600 = 1681 (Pythagorean 9-40-41 triangle hypotenuse squared)."
  },
  {
    question: "What is the output of =SUMX2PY2({10}, {10})?",
    options: [
      "200",
      "100",
      "400",
      "20"
    ],
    correctAnswer: 0,
    explanation: "10² + 10² = 100 + 100 = 200."
  },
  {
    question: "What is the output of =SUMX2PY2({1, 2, 3}, {0, 0, 0})?",
    options: [
      "14",
      "6",
      "36",
      "0"
    ],
    correctAnswer: 0,
    explanation: "1² + 2² + 3² = 1 + 4 + 9 = 14 (which equals SUMSQ(1, 2, 3))."
  },
  {
    question: "What is the relationship between SUMX2PY2(x, {0...}) and SUMSQ(x)?",
    options: [
      "When array_y is all zeros, SUMX2PY2(x, y) equals SUMSQ(x)",
      "They are always double",
      "SUMX2PY2 returns text",
      "SUMSQ requires CTRL+SHIFT+ENTER"
    ],
    correctAnswer: 0,
    explanation: "SUMX2PY2(x, 0) = SUM(x² + 0) = SUMSQ(x)."
  },
  {
    question: "What is the result of =SUMX2PY2({10, 20}, {10, 20})?",
    options: [
      "1000",
      "500",
      "900",
      "0"
    ],
    correctAnswer: 0,
    explanation: "(100 + 100) + (400 + 400) = 200 + 800 = 1000."
  },
  {
    question: "What is the output of =SUMX2PY2({2, 4}, {3, 5})?",
    options: [
      "54",
      "20",
      "34",
      "40"
    ],
    correctAnswer: 0,
    explanation: "(4 + 9) + (16 + 25) = 13 + 41 = 54."
  },
  {
    question: "What is the output of =SUMX2PY2({1, 3, 5}, {2, 4, 6})?",
    options: [
      "91",
      "35",
      "56",
      "120"
    ],
    correctAnswer: 0,
    explanation: "(1 + 4) + (9 + 16) + (25 + 36) = 5 + 25 + 61 = 91."
  },
  {
    question: "What is the output of =SUMX2PY2({10}, {20})?",
    options: [
      "500",
      "300",
      "400",
      "100"
    ],
    correctAnswer: 0,
    explanation: "10² + 20² = 100 + 400 = 500."
  },
  {
    question: "What is the output of =SUMX2PY2({30}, {40})?",
    options: [
      "2500",
      "50",
      "1200",
      "700"
    ],
    correctAnswer: 0,
    explanation: "30² + 40² = 900 + 1600 = 2500."
  },
  {
    question: "What is the output of =SUMX2PY2({100}, {100})?",
    options: [
      "20000",
      "10000",
      "40000",
      "2000"
    ],
    correctAnswer: 0,
    explanation: "10000 + 10000 = 20000."
  },
  {
    question: "What is the output of =SUMX2PY2({-5}, {-12})?",
    options: [
      "169",
      "-169",
      "119",
      "-119"
    ],
    correctAnswer: 0,
    explanation: "(-5)² + (-12)² = 25 + 144 = 169."
  },
  {
    question: "What is the ultimate takeaway for using SUMX2PY2 in engineering and physics models?",
    options: [
      "Use SUMX2PY2 to compute paired sum of squares SUM(x² + y²) for total kinetic energy, 2D vector magnitude sums, and Pythagorean distance calculations",
      "Use it to format cell background colors",
      "Use it to lock worksheets",
      "Use it to sort columns"
    ],
    correctAnswer: 0,
    explanation: "SUMX2PY2 computes paired sum of squares SUM(x² + y²) efficiently."
  }
];

export default questions;
