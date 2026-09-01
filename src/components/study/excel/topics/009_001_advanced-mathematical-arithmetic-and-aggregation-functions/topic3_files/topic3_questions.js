const questions = [
  {
    question: "What is the primary function of the SUMSQ function in Excel?",
    options: [
      "It calculates the sum of the squares of the supplied numbers or cell ranges",
      "It calculates the square root of a sum",
      "It sums only even squared numbers",
      "It calculates the perimeter of a square"
    ],
    correctAnswer: 0,
    explanation: "SUMSQ(number1, [number2], ...) evaluates Σ (xᵢ²) for all supplied numeric arguments or ranges."
  },
  {
    question: "What is the result of =SUMSQ(3, 4)?",
    options: [
      "25",
      "7",
      "12",
      "49"
    ],
    correctAnswer: 0,
    explanation: "3² + 4² = 9 + 16 = 25."
  },
  {
    question: "What is the result of =SUMSQ(1, 2, 3)?",
    options: [
      "14",
      "6",
      "36",
      "9"
    ],
    correctAnswer: 0,
    explanation: "1² + 2² + 3² = 1 + 4 + 9 = 14."
  },
  {
    question: "How does SUMSQ handle blank cells inside range references like =SUMSQ(A1:A5)?",
    options: [
      "Blank cells inside range references are ignored",
      "Blank cells are treated as 0 and added",
      "Blank cells return #VALUE! error",
      "Blank cells are treated as 1"
    ],
    correctAnswer: 0,
    explanation: "Blank cells and text in range references are ignored by SUMSQ."
  },
  {
    question: "What is the output of =SUMSQ(-3, -4)?",
    options: [
      "25",
      "-25",
      "-7",
      "0"
    ],
    correctAnswer: 0,
    explanation: "(-3)² + (-4)² = 9 + 16 = 25. Squaring negative numbers yields positive values."
  },
  {
    question: "How can SUMSQ be combined with SQRT to calculate the Euclidean distance / magnitude of a 2D vector (3, 4)?",
    options: [
      "=SQRT(SUMSQ(3, 4)) = 5",
      "=SUMSQ(SQRT(3, 4))",
      "=SUM(3, 4)^2",
      "=PRODUCT(3, 4)"
    ],
    correctAnswer: 0,
    explanation: "Euclidean magnitude = √(x² + y²) = SQRT(SUMSQ(3, 4)) = 5."
  },
  {
    question: "What is the result of =SUMSQ(0, 5)?",
    options: [
      "25",
      "5",
      "0",
      "10"
    ],
    correctAnswer: 0,
    explanation: "0² + 5² = 0 + 25 = 25."
  },
  {
    question: "What is the maximum number of arguments SUMSQ can accept in Excel?",
    options: [
      "255 arguments",
      "30 arguments",
      "10 arguments",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "Like most Excel functions, SUMSQ accepts up to 255 individual arguments."
  },
  {
    question: "What is the result of =SUMSQ(A1:A3) if A1=2, A2=\"Text\", and A3=3?",
    options: [
      "13",
      "#VALUE!",
      "25",
      "5"
    ],
    correctAnswer: 0,
    explanation: "Text in range references is ignored, so 2² + 3² = 4 + 9 = 13."
  },
  {
    question: "What happens if a text string is passed as a direct scalar argument, e.g. =SUMSQ(3, \"Text\")?",
    options: [
      "#VALUE! error",
      "9",
      "0",
      "3"
    ],
    correctAnswer: 0,
    explanation: "Direct non-numeric scalar arguments cause a #VALUE! error."
  },
  {
    question: "What is the output of =SUMSQ(5)?",
    options: [
      "25",
      "5",
      "10",
      "50"
    ],
    correctAnswer: 0,
    explanation: "5² = 25."
  },
  {
    question: "What is the output of =SUMSQ(2, 2, 2, 2)?",
    options: [
      "16",
      "8",
      "64",
      "32"
    ],
    correctAnswer: 0,
    explanation: "2² + 2² + 2² + 2² = 4 + 4 + 4 + 4 = 16."
  },
  {
    question: "In statistical variance calculations, SUMSQ(x - mean) represents which component?",
    options: [
      "The Sum of Squared Deviations (SS)",
      "The Mean Absolute Error",
      "The Standard Error of the Mean",
      "The Interquartile Range"
    ],
    correctAnswer: 0,
    explanation: "SUMSQ(x - mean) evaluates the Sum of Squared Deviations (SS), the core numerator for sample variance."
  },
  {
    question: "What is the result of =SUMSQ(0.5, 0.5)?",
    options: [
      "0.5",
      "1",
      "0.25",
      "0.75"
    ],
    correctAnswer: 0,
    explanation: "(0.5)² + (0.5)² = 0.25 + 0.25 = 0.5."
  },
  {
    question: "What is the result of =SUMSQ(10, 20)?",
    options: [
      "500",
      "300",
      "900",
      "100"
    ],
    correctAnswer: 0,
    explanation: "10² + 20² = 100 + 400 = 500."
  },
  {
    question: "How does SUMSQ handle logical TRUE passed as a direct scalar argument?",
    options: [
      "TRUE is coerced to 1, so 1² = 1",
      "TRUE is ignored",
      "Returns #VALUE!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Direct scalar TRUE is coerced to 1. =SUMSQ(TRUE) returns 1."
  },
  {
    question: "How are booleans handled when inside a range reference passed to SUMSQ?",
    options: [
      "Booleans inside range references are ignored",
      "Booleans are converted to 1",
      "Returns #VALUE!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Range references ignore booleans and text values."
  },
  {
    question: "What is the output of =SUMSQ(6, 8)?",
    options: [
      "100",
      "14",
      "48",
      "196"
    ],
    correctAnswer: 0,
    explanation: "6² + 8² = 36 + 64 = 100."
  },
  {
    question: "What is the magnitude of a 3D spatial coordinate vector (2, 3, 6)?",
    options: [
      "=SQRT(SUMSQ(2, 3, 6)) = 7",
      "=SUMSQ(2, 3, 6) = 49",
      "=SUM(2, 3, 6) = 11",
      "=PRODUCT(2, 3, 6) = 36"
    ],
    correctAnswer: 0,
    explanation: "√(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7."
  },
  {
    question: "What is the result of =SUMSQ({1, 2}, {3, 4})?",
    options: [
      "30",
      "10",
      "100",
      "20"
    ],
    correctAnswer: 0,
    explanation: "1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30."
  },
  {
    question: "What is the output of =SUMSQ(10, -10)?",
    options: [
      "200",
      "0",
      "100",
      "-200"
    ],
    correctAnswer: 0,
    explanation: "10² + (-10)² = 100 + 100 = 200."
  },
  {
    question: "What is the output of =SUMSQ(0)?",
    options: [
      "0",
      "1",
      "#VALUE!",
      "#N/A"
    ],
    correctAnswer: 0,
    explanation: "0² = 0."
  },
  {
    question: "What is the relationship between SUMSQ(x) and SUM(x^2) in Excel 365 dynamic arrays?",
    options: [
      "Both calculate the sum of squares, but SUMSQ is optimized natively without array formulas",
      "SUMSQ is slower than SUM",
      "SUMSQ only works on positive numbers",
      "SUMSQ requires VBA"
    ],
    correctAnswer: 0,
    explanation: "SUMSQ provides a clean, native, high-speed calculation of sum of squares."
  },
  {
    question: "What is the result of =SUMSQ(1, 1, 1, 1, 1)?",
    options: [
      "5",
      "1",
      "25",
      "10"
    ],
    correctAnswer: 0,
    explanation: "1² + 1² + 1² + 1² + 1² = 5."
  },
  {
    question: "In engineering error measurement, SUMSQ(Errors) is used to compute which key metric?",
    options: [
      "Mean Squared Error (MSE) numerator",
      "Total Revenue",
      "Geometric Mean",
      "Median Absolute Deviation"
    ],
    correctAnswer: 0,
    explanation: "Sum of Squared Errors (SSE) is the core numerator divided by N to compute Mean Squared Error (MSE)."
  },
  {
    question: "What is the output of =SUMSQ(4, 5, 6)?",
    options: [
      "77",
      "15",
      "225",
      "60"
    ],
    correctAnswer: 0,
    explanation: "4² + 5² + 6² = 16 + 25 + 36 = 77."
  },
  {
    question: "What is the result of =SUMSQ(0.1, 0.2)?",
    options: [
      "0.05",
      "0.03",
      "0.3",
      "0.09"
    ],
    correctAnswer: 0,
    explanation: "0.1² + 0.2² = 0.01 + 0.04 = 0.05."
  },
  {
    question: "What happens if all cells in a range passed to SUMSQ are blank?",
    options: [
      "SUMSQ returns 0",
      "SUMSQ returns #N/A",
      "SUMSQ returns 1",
      "SUMSQ returns #VALUE!"
    ],
    correctAnswer: 0,
    explanation: "If no numeric values are found in range arguments, SUMSQ returns 0."
  },
  {
    question: "What is the output of =SUMSQ(POWER(3, 2), POWER(4, 2))?",
    options: [
      "337",
      "25",
      "49",
      "144"
    ],
    correctAnswer: 0,
    explanation: "POWER(3,2)=9. POWER(4,2)=16. 9² + 16² = 81 + 256 = 337."
  },
  {
    question: "What is the primary benefit of using SUMSQ over writing (A1^2 + A2^2 + A3^2...)?",
    options: [
      "SUMSQ takes clean range inputs (A1:A50), preventing formula length limits and syntax errors",
      "SUMSQ locks the workbook",
      "SUMSQ converts negative values to text",
      "SUMSQ requires CTRL+SHIFT+ENTER"
    ],
    correctAnswer: 0,
    explanation: "SUMSQ simplifies multi-cell squared summation into a single, clean range reference."
  }
];

export default questions;
