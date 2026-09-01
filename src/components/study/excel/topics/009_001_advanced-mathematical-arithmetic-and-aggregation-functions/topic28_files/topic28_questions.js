const questions = [
  {
    question: "What is the primary function of combining mathematical functions with Dynamic Arrays in modern Excel?",
    options: [
      "Generating dynamic spilling outputs, automatic array calculations across FILTER/SORT/SEQUENCE/UNIQUE, and building zero-legacy-CSE calculation pipelines",
      "Formatting background gridlines",
      "Converting numbers to text",
      "Hiding columns"
    ],
    correctAnswer: 0,
    explanation: "Dynamic array engine (Excel 365 / 2021+) automatically spills multi-cell array outputs and pairs seamlessly with math functions like SUMPRODUCT, AGGREGATE, and SEQUENCE."
  },
  {
    question: "Which symbol is used as the Spill Range Operator to reference an entire dynamic spilled array starting at cell A1?",
    options: [
      "A1#",
      "A1*",
      "@A1",
      "$A$1"
    ],
    correctAnswer: 0,
    explanation: "The hash symbol (#) appended to a cell reference (e.g., A1#) references the entire spilled array."
  },
  {
    question: "What happens if a cell in the path of a spilling dynamic array formula already contains data?",
    options: [
      "Returns #SPILL! error",
      "Overwrites the data automatically",
      "Returns #VALUE! error",
      "Deletes the worksheet"
    ],
    correctAnswer: 0,
    explanation: "#SPILL! occurs when the required spill range is blocked by non-empty cells."
  },
  {
    question: "What is the result of =SEQUENCE(3, 2, 1, 1)?",
    options: [
      "Generates a 3-row by 2-column spilled array containing {1, 2; 3, 4; 5, 6}",
      "Returns 6",
      "Returns 1",
      "Returns #VALUE!"
    ],
    correctAnswer: 0,
    explanation: "SEQUENCE(rows, cols, start, step) creates an array of sequential numbers."
  },
  {
    question: "How does combining SEQUENCE with MOD generate repeating cyclical shift patterns?",
    options: [
      "=MOD(SEQUENCE(n, 1, 0), k) generates repeating sequences 0, 1, ..., k-1 for n items",
      "It formats dates as days of the week",
      "It causes a #NUM! error",
      "It rounds numbers to integers"
    ],
    correctAnswer: 0,
    explanation: "MOD(SEQUENCE(...), k) generates repeating modular cycles."
  },
  {
    question: "What is the result of =SUM(FILTER(A1:A5, B1:B5=\"North\"))?",
    options: [
      "Calculates the sum of A1:A5 values where the corresponding B1:B5 cell equals \"North\"",
      "Returns #N/A",
      "Filters text strings",
      "Requires CTRL+SHIFT+ENTER"
    ],
    correctAnswer: 0,
    explanation: "FILTER extracts matching array elements, which SUM then aggregates directly."
  },
  {
    question: "Which dynamic array function returns a sorted list of unique values from a range?",
    options: [
      "SORT(UNIQUE(range))",
      "FILTER(range, 1)",
      "SEQUENCE(range)",
      "CHOOSE(range)"
    ],
    correctAnswer: 0,
    explanation: "SORT(UNIQUE(range)) extracts unique values and sorts them ascending."
  },
  {
    question: "How can MAP and LAMBDA apply custom mathematical functions to each element in a dynamic array?",
    options: [
      "=MAP(A1:A5, LAMBDA(x, FACT(x))) evaluates factorial for every element in the array",
      "MAP formats map charts",
      "LAMBDA locks cells",
      "MAP requires VBA"
    ],
    correctAnswer: 0,
    explanation: "MAP + LAMBDA applies a custom mathematical lambda function to each element of an array."
  },
  {
    question: "What is the result of =SEQUENCE(5)?",
    options: [
      "Spills a vertical column array of {1; 2; 3; 4; 5}",
      "Returns 5",
      "Returns 1",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "SEQUENCE(5) defaults to 5 rows, 1 column, starting at 1 with step 1."
  },
  {
    question: "What is the result of =PRODUCT(SEQUENCE(4))?",
    options: [
      "24",
      "10",
      "16",
      "4"
    ],
    correctAnswer: 0,
    explanation: "PRODUCT({1, 2, 3, 4}) = 1 × 2 × 3 × 4 = 24 (which equals FACT(4))."
  },
  {
    question: "What is the output of =SUM(SEQUENCE(5))?",
    options: [
      "15",
      "5",
      "25",
      "10"
    ],
    correctAnswer: 0,
    explanation: "1 + 2 + 3 + 4 + 5 = 15."
  },
  {
    question: "What is the output of =SUM(SEQUENCE(10))?",
    options: [
      "55",
      "10",
      "100",
      "45"
    ],
    correctAnswer: 0,
    explanation: "Sum of integers from 1 to 10 is 10 × 11 / 2 = 55."
  },
  {
    question: "What is the output of =SUM(SEQUENCE(100))?",
    options: [
      "5050",
      "100",
      "10000",
      "4950"
    ],
    correctAnswer: 0,
    explanation: "Sum of 1 to 100 = 100 × 101 / 2 = 5050 (Gauss summation formula)."
  },
  {
    question: "How does BYROW apply an aggregation function like SUM to each row of a dynamic 2D array?",
    options: [
      "=BYROW(array, LAMBDA(row, SUM(row))) computes row-by-row totals across a 2D matrix",
      "BYROW transposes rows into columns",
      "BYROW formats row heights",
      "BYROW requires CSE"
    ],
    correctAnswer: 0,
    explanation: "BYROW applies a lambda accumulator across matrix rows."
  },
  {
    question: "How does BYCOL apply an aggregation function like AVERAGE to each column of a dynamic 2D array?",
    options: [
      "=BYCOL(array, LAMBDA(col, AVERAGE(col))) computes column-by-column averages across a 2D matrix",
      "BYCOL formats column widths",
      "BYCOL hides columns",
      "BYCOL requires VBA"
    ],
    correctAnswer: 0,
    explanation: "BYCOL applies a lambda accumulator across matrix columns."
  },
  {
    question: "What is the output of =SUM(SEQUENCE(3, 3, 1, 1))?",
    options: [
      "45",
      "9",
      "36",
      "18"
    ],
    correctAnswer: 0,
    explanation: "Sequence 1 to 9 sum: 9 × 10 / 2 = 45."
  },
  {
    question: "What is the output of =SUMSQ(SEQUENCE(3))?",
    options: [
      "14",
      "6",
      "9",
      "36"
    ],
    correctAnswer: 0,
    explanation: "1² + 2² + 3² = 1 + 4 + 9 = 14."
  },
  {
    question: "What is the output of =PRODUCT(SEQUENCE(5))?",
    options: [
      "120",
      "15",
      "25",
      "60"
    ],
    correctAnswer: 0,
    explanation: "1 × 2 × 3 × 4 × 5 = 120 (FACT(5))."
  },
  {
    question: "What is the output of =SUM(MOD(SEQUENCE(6, 1, 1, 1), 2))?",
    options: [
      "3",
      "6",
      "0",
      "12"
    ],
    correctAnswer: 0,
    explanation: "MOD({1,2,3,4,5,6}, 2) = {1, 0, 1, 0, 1, 0}. Sum = 3."
  },
  {
    question: "What is the output of =SUM(INT(SEQUENCE(5, 1, 1.5, 1.5)))?",
    options: [
      "22",
      "15",
      "25",
      "30"
    ],
    correctAnswer: 0,
    explanation: "Sequence: {1.5, 3.0, 4.5, 6.0, 7.5}. INT: {1, 3, 4, 6, 7}. Sum = 21."
  },
  {
    question: "What happens if a dynamic array formula attempts to spill outside the worksheet boundaries (past row 1,048,576)?",
    options: [
      "Returns #CALC! error",
      "Returns #SPILL! error",
      "Returns #VALUE! error",
      "Deletes data"
    ],
    correctAnswer: 0,
    explanation: "Array bounds exceeding grid dimensions return a #CALC! or #SPILL! calculation error."
  },
  {
    question: "Which function combines multiple dynamic array outputs vertically into a single stacked array?",
    options: [
      "VSTACK",
      "HSTACK",
      "CHOOSE",
      "UNICK"
    ],
    correctAnswer: 0,
    explanation: "VSTACK appends arrays vertically."
  },
  {
    question: "Which function combines multiple dynamic array outputs horizontally side-by-side?",
    options: [
      "HSTACK",
      "VSTACK",
      "TRANSPOSE",
      "CONCAT"
    ],
    correctAnswer: 0,
    explanation: "HSTACK appends arrays horizontally."
  },
  {
    question: "What is the output of =SUM(EVEN(SEQUENCE(3)))?",
    options: [
      "10",
      "6",
      "12",
      "8"
    ],
    correctAnswer: 0,
    explanation: "SEQUENCE(3) = {1, 2, 3}. EVEN({1, 2, 3}) = {2, 2, 4}. Sum = 2 + 2 + 4 = 8."
  },
  {
    question: "What is the output of =SUM(ODD(SEQUENCE(3)))?",
    options: [
      "9",
      "6",
      "12",
      "5"
    ],
    correctAnswer: 0,
    explanation: "SEQUENCE(3) = {1, 2, 3}. ODD({1, 2, 3}) = {1, 3, 3}. Sum = 1 + 3 + 3 = 7."
  },
  {
    question: "What is the output of =SUM(SIGN(SEQUENCE(5, 1, -2, 1)))?",
    options: [
      "1",
      "5",
      "0",
      "-1"
    ],
    correctAnswer: 0,
    explanation: "SEQUENCE: {-2, -1, 0, 1, 2}. SIGN: {-1, -1, 0, 1, 1}. Sum = 0."
  },
  {
    question: "What is the result of =REDUCE(0, SEQUENCE(4), LAMBDA(acc, val, acc + val))?",
    options: [
      "10",
      "4",
      "16",
      "0"
    ],
    correctAnswer: 0,
    explanation: "REDUCE sums array values starting from 0: 0 + 1 + 2 + 3 + 4 = 10."
  },
  {
    question: "What is the result of =REDUCE(1, SEQUENCE(4), LAMBDA(acc, val, acc * val))?",
    options: [
      "24",
      "10",
      "1",
      "0"
    ],
    correctAnswer: 0,
    explanation: "REDUCE multiplies array values starting from 1: 1 × 1 × 2 × 3 × 4 = 24."
  },
  {
    question: "How do dynamic arrays eliminate the need for legacy CTRL+SHIFT+ENTER (CSE) array entry?",
    options: [
      "Excel 365 natively treats all formulas as array formulas by default, automatically spilling outputs",
      "CSE is still required in all versions",
      "Dynamic arrays require VBA",
      "Dynamic arrays work only on Mac"
    ],
    correctAnswer: 0,
    explanation: "The Next Generation Calculation Engine handles array spill behavior natively."
  },
  {
    question: "What is the ultimate takeaway for combining mathematical functions with Dynamic Arrays?",
    options: [
      "Dynamic arrays transform static math formulas into flexible, automated calculation pipelines that scale continuously with data growth",
      "Use manual formulas for every row",
      "Never use SEQUENCE",
      "Convert dynamic arrays to static text"
    ],
    correctAnswer: 0,
    explanation: "Combining dynamic arrays with mathematical functions unlocks automated, scalable enterprise reporting."
  }
];

export default questions;
