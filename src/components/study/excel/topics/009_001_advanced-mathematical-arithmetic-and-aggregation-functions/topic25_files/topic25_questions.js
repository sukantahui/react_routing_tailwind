const questions = [
  {
    question: "What is the primary function of the SUMXMY2 function in Excel?",
    options: [
      "It calculates the sum of the squared differences between corresponding values in two arrays SUM((x - y)²)",
      "It calculates the difference of the sum of squares",
      "It calculates simple matrix subtraction",
      "It calculates moving averages of differences"
    ],
    correctAnswer: 0,
    explanation: "SUMXMY2(array_x, array_y) computes SUM((x - y)²) for paired elements across array_x and array_y."
  },
  {
    question: "What is the formula equivalence of SUMXMY2(x, y)?",
    options: [
      "SUM((x - y)²)",
      "SUM(x² - y²)",
      "SUM(x² + y²)",
      "(SUM(x) - SUM(y))²"
    ],
    correctAnswer: 0,
    explanation: "SUMXMY2 subtracts y from x first, then squares the difference for each pair."
  },
  {
    question: "What is the result of =SUMXMY2({5, 7}, {2, 3})?",
    options: [
      "25",
      "9",
      "16",
      "34"
    ],
    correctAnswer: 0,
    explanation: "(5 - 2)² + (7 - 3)² = 3² + 4² = 9 + 16 = 25."
  },
  {
    question: "How is SQRT(SUMXMY2(x, y)) used in data science and machine learning?",
    options: [
      "It calculates the 2D or N-dimensional Euclidean distance d(x, y) = SQRT(SUM((x - y)²)) between two points/vectors",
      "It calculates linear regression slope",
      "It calculates standard deviation",
      "It calculates covariance"
    ],
    correctAnswer: 0,
    explanation: "SQRT(SUMXMY2(x, y)) calculates Euclidean spatial distance between data vectors."
  },
  {
    question: "What is the result of =SUMXMY2({5, 7}, {5, 7})?",
    options: [
      "0",
      "74",
      "25",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "Identical arrays result in zero difference for all pairs: (5-5)² + (7-7)² = 0."
  },
  {
    question: "What happens if array_x and array_y have different dimensions, e.g. =SUMXMY2(A1:A3, B1:B4)?",
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
    question: "How does SUMXMY2 treat order of arguments, e.g. SUMXMY2(x, y) vs SUMXMY2(y, x)?",
    options: [
      "SUMXMY2(x, y) equals SUMXMY2(y, x) because (x - y)² = (y - x)²",
      "SUMXMY2(y, x) returns negative value",
      "SUMXMY2(y, x) returns #NUM!",
      "They are reciprocal values"
    ],
    correctAnswer: 0,
    explanation: "Squaring eliminates direction sign: (x - y)² = (y - x)²."
  },
  {
    question: "What is the output of =SUMXMY2({10}, {4})?",
    options: [
      "36",
      "6",
      "84",
      "100"
    ],
    correctAnswer: 0,
    explanation: "(10 - 4)² = 6² = 36."
  },
  {
    question: "What is the output of =SUMXMY2({4}, {10})?",
    options: [
      "36",
      "-36",
      "6",
      "-6"
    ],
    correctAnswer: 0,
    explanation: "(4 - 10)² = (-6)² = 36."
  },
  {
    question: "What is the output of =SUMXMY2({1, 2, 3}, {4, 5, 6})?",
    options: [
      "27",
      "9",
      "18",
      "81"
    ],
    correctAnswer: 0,
    explanation: "(1-4)² + (2-5)² + (3-6)² = (-3)² + (-3)² + (-3)² = 9 + 9 + 9 = 27."
  },
  {
    question: "In statistical mean squared error (MSE) modeling, how is SUMXMY2 used for actual (y) vs predicted (y_hat) values?",
    options: [
      "MSE = SUMXMY2(y, y_hat) / COUNT(y)",
      "MSE = SUMXMY2(y, y_hat) * COUNT(y)",
      "MSE = SQRT(SUMXMY2(y, y_hat))",
      "MSE = SUMXMY2(y, y_hat) - AVERAGE(y)"
    ],
    correctAnswer: 0,
    explanation: "MSE is calculated by dividing SUMXMY2(actual, predicted) by total count N."
  },
  {
    question: "What is the result of =SUMXMY2({-2}, {3})?",
    options: [
      "25",
      "1",
      "-25",
      "5"
    ],
    correctAnswer: 0,
    explanation: "(-2 - 3)² = (-5)² = 25."
  },
  {
    question: "What is the result of =SUMXMY2({-2}, {-3})?",
    options: [
      "1",
      "25",
      "-1",
      "-25"
    ],
    correctAnswer: 0,
    explanation: "(-2 - (-3))² = (1)² = 1."
  },
  {
    question: "What happens if scalar non-numeric text is passed directly inside array literal, e.g. =SUMXMY2({\"ABC\"}, {3})?",
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
    question: "What is the result of =SUMXMY2({1, 1}, {0, 0})?",
    options: [
      "2",
      "1",
      "0",
      "4"
    ],
    correctAnswer: 0,
    explanation: "(1-0)² + (1-0)² = 1 + 1 = 2."
  },
  {
    question: "What is the output of =SUMXMY2({10, 20}, {5, 10})?",
    options: [
      "125",
      "25",
      "100",
      "225"
    ],
    correctAnswer: 0,
    explanation: "(10-5)² + (20-10)² = 5² + 10² = 25 + 100 = 125."
  },
  {
    question: "What is the output of =SUMXMY2({0, 0, 0}, {3, 4, 12})?",
    options: [
      "169",
      "13",
      "144",
      "25"
    ],
    correctAnswer: 0,
    explanation: "(-3)² + (-4)² + (-12)² = 9 + 16 + 144 = 169."
  },
  {
    question: "What is the output of =SQRT(SUMXMY2({0, 0, 0}, {3, 4, 12}))?",
    options: [
      "13",
      "169",
      "19",
      "144"
    ],
    correctAnswer: 0,
    explanation: "SQRT(169) = 13 (3D Euclidean spatial distance)."
  },
  {
    question: "What is the output of =SUMXMY2({100}, {90})?",
    options: [
      "100",
      "10",
      "19000",
      "36100"
    ],
    correctAnswer: 0,
    explanation: "(100 - 90)² = 10² = 100."
  },
  {
    question: "What is the output of =SUMXMY2({50}, {40})?",
    options: [
      "100",
      "10",
      "4100",
      "90"
    ],
    correctAnswer: 0,
    explanation: "(50 - 40)² = 10² = 100."
  },
  {
    question: "What is the output of =SUMXMY2({15}, {10})?",
    options: [
      "25",
      "5",
      "325",
      "100"
    ],
    correctAnswer: 0,
    explanation: "(15 - 10)² = 5² = 25."
  },
  {
    question: "What is the output of =SUMXMY2({20}, {10})?",
    options: [
      "100",
      "10",
      "500",
      "300"
    ],
    correctAnswer: 0,
    explanation: "(20 - 10)² = 10² = 100."
  },
  {
    question: "What is the output of =SUMXMY2({25}, {15})?",
    options: [
      "100",
      "10",
      "850",
      "400"
    ],
    correctAnswer: 0,
    explanation: "(25 - 15)² = 10² = 100."
  },
  {
    question: "What is the output of =SUMXMY2({8}, {2})?",
    options: [
      "36",
      "6",
      "68",
      "60"
    ],
    correctAnswer: 0,
    explanation: "(8 - 2)² = 6² = 36."
  },
  {
    question: "What is the output of =SUMXMY2({9}, {3})?",
    options: [
      "36",
      "6",
      "90",
      "72"
    ],
    correctAnswer: 0,
    explanation: "(9 - 3)² = 6² = 36."
  },
  {
    question: "What is the output of =SUMXMY2({12}, {4})?",
    options: [
      "64",
      "8",
      "160",
      "128"
    ],
    correctAnswer: 0,
    explanation: "(12 - 4)² = 8² = 64."
  },
  {
    question: "What is the output of =SUMXMY2({15}, {5})?",
    options: [
      "100",
      "10",
      "250",
      "200"
    ],
    correctAnswer: 0,
    explanation: "(15 - 5)² = 10² = 100."
  },
  {
    question: "What is the output of =SUMXMY2({20}, {5})?",
    options: [
      "225",
      "15",
      "425",
      "375"
    ],
    correctAnswer: 0,
    explanation: "(20 - 5)² = 15² = 225."
  },
  {
    question: "What is the result of =SUMXMY2({-1, -2}, {1, 2})?",
    options: [
      "20",
      "0",
      "10",
      "8"
    ],
    correctAnswer: 0,
    explanation: "(-1 - 1)² + (-2 - 2)² = (-2)² + (-4)² = 4 + 16 = 20."
  },
  {
    question: "What is the ultimate takeaway for using SUMXMY2 in data science and forecasting models?",
    options: [
      "Use SUMXMY2 to calculate paired squared error totals SUM((x - y)²), Euclidean spatial distance metrics, and regression Mean Squared Error (MSE) numerators",
      "Use it to format cell background colors",
      "Use it to lock worksheets",
      "Use it to sort data"
    ],
    correctAnswer: 0,
    explanation: "SUMXMY2 computes paired sum of squared differences SUM((x - y)²) efficiently."
  }
];

export default questions;
