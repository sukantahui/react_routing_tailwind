const questions = [
  {
    question: "What is the primary function of the PRODUCT function in Excel?",
    options: [
      "It multiplies all numbers supplied as arguments and returns the product",
      "It sums numbers across rows",
      "It divides two numbers",
      "It rounds numbers to the nearest integer"
    ],
    correctAnswer: 0,
    explanation: "PRODUCT(number1, [number2], ...) multiplies all numbers provided in arguments or ranges."
  },
  {
    question: "What is the result of =PRODUCT(2, 3, 4)?",
    options: [
      "24",
      "9",
      "12",
      "20"
    ],
    correctAnswer: 0,
    explanation: "2 × 3 × 4 = 24."
  },
  {
    question: "How does PRODUCT handle blank cells inside range references like =PRODUCT(A1:A5)?",
    options: [
      "Blank cells inside range references are ignored by PRODUCT",
      "Blank cells are treated as 0, turning the entire product to 0",
      "Blank cells cause a #VALUE! error",
      "Blank cells are treated as 10"
    ],
    correctAnswer: 0,
    explanation: "When passing range references to PRODUCT, non-numeric and empty cells are ignored."
  },
  {
    question: "What happens if an explicit scalar argument is zero, e.g. =PRODUCT(5, 10, 0, 4)?",
    options: [
      "Returns 0",
      "Returns 200",
      "Returns #DIV/0!",
      "Returns 20"
    ],
    correctAnswer: 0,
    explanation: "Multiplying any set of numbers by 0 yields 0."
  },
  {
    question: "How can PRODUCT be used in financial modeling to calculate cumulative investment multipliers across growth rates {1.05, 1.08, 1.10}?",
    options: [
      "=PRODUCT(1.05, 1.08, 1.10) = 1.2474",
      "=SUM(1.05, 1.08, 1.10)",
      "=AVERAGE(1.05, 1.08, 1.10)",
      "=COUNT(1.05, 1.08, 1.10)"
    ],
    correctAnswer: 0,
    explanation: "Compound growth multipliers are multiplied together using PRODUCT(1+r1, 1+r2, ...)."
  },
  {
    question: "What is the maximum number of arguments PRODUCT can accept in modern Excel?",
    options: [
      "255 arguments",
      "30 arguments",
      "10 arguments",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "Excel functions accept up to 255 individual arguments."
  },
  {
    question: "What is the result of =PRODUCT(A1:A3) if A1=5, A2=\"Hello\", and A3=4?",
    options: [
      "20",
      "#VALUE!",
      "0",
      "9"
    ],
    correctAnswer: 0,
    explanation: "Text values in range references are ignored by PRODUCT, so only 5 × 4 = 20 is calculated."
  },
  {
    question: "What is the result if text is passed directly as a hardcoded argument, e.g. =PRODUCT(5, \"Hello\")?",
    options: [
      "#VALUE! error",
      "5",
      "0",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Passing non-numeric text directly as a hardcoded scalar argument returns a #VALUE! error."
  },
  {
    question: "What is the result of =PRODUCT(-2, -3, -4)?",
    options: [
      "-24",
      "24",
      "-9",
      "0"
    ],
    correctAnswer: 0,
    explanation: "(-2) × (-3) × (-4) = 6 × (-4) = -24."
  },
  {
    question: "What is the result of =PRODUCT(A1:A3) if A1:A3 are all blank cells?",
    options: [
      "0",
      "1",
      "#N/A",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "If no numbers are found in range references, PRODUCT returns 0."
  },
  {
    question: "How does =PRODUCT(1+B3:B7) evaluate in Excel 365 dynamic arrays?",
    options: [
      "It adds 1 to each growth rate in B3:B7 and computes the compound product across the array",
      "It returns a single FALSE value",
      "It causes a circular reference error",
      "It formats cells as currency"
    ],
    correctAnswer: 0,
    explanation: "In modern Excel 365, `PRODUCT(1 + range)` adds 1 to each rate array element and multiplies them together."
  },
  {
    question: "What is the output of =PRODUCT(0.5, 0.5, 4)?",
    options: [
      "1",
      "2",
      "0.25",
      "5"
    ],
    correctAnswer: 0,
    explanation: "0.5 × 0.5 × 4 = 0.25 × 4 = 1."
  },
  {
    question: "Which formula calculates total volume of a container with Length=10m, Width=4m, Height=3m?",
    options: [
      "=PRODUCT(10, 4, 3) = 120 m³",
      "=SUM(10, 4, 3)",
      "=AVERAGE(10, 4, 3)",
      "=MOD(10, 4)"
    ],
    correctAnswer: 0,
    explanation: "Volume = Length × Width × Height = PRODUCT(10, 4, 3) = 120."
  },
  {
    question: "What is the result of =PRODUCT({2, 5}, {3, 4})?",
    options: [
      "120",
      "24",
      "14",
      "20"
    ],
    correctAnswer: 0,
    explanation: "2 × 5 × 3 × 4 = 120."
  },
  {
    question: "In currency conversion, if USD/INR rate is 83.5 and EUR/USD rate is 1.08, what is EUR/INR using PRODUCT?",
    options: [
      "=PRODUCT(83.5, 1.08) = 90.18",
      "=83.5 + 1.08",
      "=83.5 / 1.08",
      "=MOD(83.5, 1.08)"
    ],
    correctAnswer: 0,
    explanation: "Cross-currency exchange rate = 83.5 × 1.08 = 90.18."
  },
  {
    question: "What is the difference between SUM and PRODUCT?",
    options: [
      "SUM adds all numbers together, while PRODUCT multiplies all numbers together",
      "SUM multiplies, PRODUCT adds",
      "SUM handles text, PRODUCT does not",
      "They are identical"
    ],
    correctAnswer: 0,
    explanation: "SUM performs addition (Σ), while PRODUCT performs multiplication (Π)."
  },
  {
    question: "What is the output of =PRODUCT(10, TRUE)?",
    options: [
      "10",
      "0",
      "#VALUE!",
      "TRUE"
    ],
    correctAnswer: 0,
    explanation: "Logical TRUE passed directly as a scalar argument is coerced to 1. 10 × 1 = 10."
  },
  {
    question: "What is the output of =PRODUCT(10, FALSE)?",
    options: [
      "0",
      "10",
      "#VALUE!",
      "FALSE"
    ],
    correctAnswer: 0,
    explanation: "Logical FALSE passed directly as a scalar argument is coerced to 0. 10 × 0 = 0."
  },
  {
    question: "How are booleans handled when inside a range reference passed to PRODUCT, e.g. =PRODUCT(A1:A2) where A1=10 and A2=TRUE?",
    options: [
      "Booleans inside range references are ignored, returning 10",
      "Booleans are converted to 1",
      "Returns #VALUE!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Range references ignore booleans and text, evaluating only numeric cells."
  },
  {
    question: "What is the output of =PRODUCT(2, 2, 2, 2, 2)?",
    options: [
      "32",
      "10",
      "16",
      "64"
    ],
    correctAnswer: 0,
    explanation: "2^5 = 32."
  },
  {
    question: "How do you calculate compound annual growth rate (CAGR) multiplier across 3 years of returns in cells B3:B5?",
    options: [
      "=PRODUCT(1 + B3:B5) - 1",
      "=SUM(B3:B5) / 3",
      "=AVERAGE(B3:B5)",
      "=COUNT(B3:B5)"
    ],
    correctAnswer: 0,
    explanation: "Compound return = PRODUCT(1 + rates) - 1."
  },
  {
    question: "What is the result of =PRODUCT(10, 0.1)?",
    options: [
      "1",
      "10.1",
      "0",
      "100"
    ],
    correctAnswer: 0,
    explanation: "10 × 0.1 = 1."
  },
  {
    question: "Which keyboard shortcut opens the Insert Function dialog to select PRODUCT?",
    options: [
      "Shift + F3",
      "Ctrl + F3",
      "Alt + F3",
      "F9"
    ],
    correctAnswer: 0,
    explanation: "Shift + F3 opens the Insert Function wizard in Excel."
  },
  {
    question: "What is the mathematical symbol representing the PRODUCT function operation?",
    options: [
      "Capital Pi (Π)",
      "Capital Sigma (Σ)",
      "Delta (Δ)",
      "Infinity (∞)"
    ],
    correctAnswer: 0,
    explanation: "Capital Pi (Π) is the mathematical notation for product series."
  },
  {
    question: "What is the output of =PRODUCT(100, 5%)?",
    options: [
      "5",
      "500",
      "50",
      "0.05"
    ],
    correctAnswer: 0,
    explanation: "5% = 0.05. 100 × 0.05 = 5."
  },
  {
    question: "Why should PRODUCT be used over multiple nested * operators in large range calculations?",
    options: [
      "PRODUCT accepts continuous range references (e.g. A1:A50), preventing unwieldy formulas like A1*A2*A3...*A50",
      "PRODUCT runs 1000x faster",
      "PRODUCT locks worksheets",
      "Nested * operators are forbidden"
    ],
    correctAnswer: 0,
    explanation: "Passing range references to PRODUCT simplifies formulas and prevents syntax bloat."
  },
  {
    question: "What is the output of =PRODUCT(SQRT(4), SQRT(9))?",
    options: [
      "6",
      "36",
      "5",
      "13"
    ],
    correctAnswer: 0,
    explanation: "SQRT(4)=2, SQRT(9)=3. 2 × 3 = 6."
  },
  {
    question: "What is the result of =PRODUCT(POWER(2, 3), POWER(3, 2))?",
    options: [
      "72",
      "17",
      "36",
      "144"
    ],
    correctAnswer: 0,
    explanation: "2^3 = 8. 3^2 = 9. 8 × 9 = 72."
  },
  {
    question: "In retail invoicing, if Quantity=5, Unit Price=₹250, and Discount Multiplier=0.90, what is net line item total using PRODUCT?",
    options: [
      "=PRODUCT(5, 250, 0.90) = ₹1,125",
      "=SUM(5, 250, 0.90)",
      "=AVERAGE(5, 250, 0.90)",
      "=MOD(250, 5)"
    ],
    correctAnswer: 0,
    explanation: "5 × 250 × 0.90 = ₹1,125."
  },
  {
    question: "What is the ultimate stress test for a PRODUCT formula in financial models?",
    options: [
      "Verify behavior with 0, negative values, blank cells, percentage inputs, and range references to ensure zero unexpected #VALUE! crashes",
      "Apply bold font",
      "Hide row numbers",
      "Delete sheet tab"
    ],
    correctAnswer: 0,
    explanation: "Stress testing edge cases ensures robust performance across all input data types."
  }
];

export default questions;
