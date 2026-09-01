const questions = [
  {
    question: "What is the primary function of SUMPRODUCT in Microsoft Excel?",
    options: [
      "It sums only positive numbers in a single range",
      "It multiplies corresponding components in given arrays and returns the sum of those products",
      "It generates a matrix product of two inverted ranges",
      "It concatenates text strings across multiple columns"
    ],
    correctAnswer: 1,
    explanation: "SUMPRODUCT multiplies the corresponding elements of two or more arrays and sums the resulting products. It performs vectorized array multiplication without requiring legacy CSE (Ctrl+Shift+Enter) array entry."
  },
  {
    question: "What occurs if array arguments in SUMPRODUCT do not have identical dimensions?",
    options: [
      "Excel automatically pads the shorter array with zeroes",
      "Excel returns a #VALUE! error",
      "Excel truncates the larger array to match",
      "Excel returns a #N/A error"
    ],
    correctAnswer: 1,
    explanation: "All array arguments passed to SUMPRODUCT must have identical row and column dimensions. If range sizes differ (e.g. A2:A10 and B2:B15), Excel immediately returns a #VALUE! error."
  },
  {
    question: "How does SUMPRODUCT treat non-numeric (text or blank) values when comma syntax =SUMPRODUCT(array1, array2) is used?",
    options: [
      "It throws a #VALUE! error",
      "It treats non-numeric cells as zeroes",
      "It skips the entire row",
      "It converts text numbers to numeric floats"
    ],
    correctAnswer: 1,
    explanation: "When arrays are separated by commas (=SUMPRODUCT(A2:A10, B2:B10)), Excel treats non-numeric array entries as zero. However, when using explicit double-unary or multiplication operators ((A2:A10)*(B2:B10)), text headers trigger a #VALUE! error."
  },
  {
    question: "Why is double unary (--) used in multi-condition SUMPRODUCT formulas such as =SUMPRODUCT((A2:A10=\"Barrackpore\")*(B2:B10))?",
    options: [
      "To negate negative financial numbers",
      "To coerce boolean TRUE/FALSE arrays into numeric 1/0 values",
      "To bypass Excel's calculation engine speed caps",
      "To force absolute cell references"
    ],
    correctAnswer: 1,
    explanation: "Conditional tests in Excel return boolean TRUE/FALSE arrays. Mathematical operators like * or double unary (--) force Excel's calculation engine to convert TRUE into 1 and FALSE into 0."
  },
  {
    question: "How does the PRODUCT function handle empty cells within its argument range?",
    options: [
      "Empty cells are evaluated as 0, resulting in a zero product",
      "Empty cells are completely ignored during multiplication",
      "Empty cells cause a #NULL! error",
      "Empty cells are defaulted to 1.0"
    ],
    correctAnswer: 1,
    explanation: "The PRODUCT function skips empty cells and text entries in reference ranges. If a cell is completely blank, it is ignored so it does not multiply the result by zero."
  },
  {
    question: "What is the mathematical output of =SUMSQ(3, 4, 5)?",
    options: [
      "12",
      "60",
      "50",
      "25"
    ],
    correctAnswer: 2,
    explanation: "=SUMSQ(3, 4, 5) calculates 3² + 4² + 5² = 9 + 16 + 25 = 50. It returns the sum of the squares of the given arguments."
  },
  {
    question: "Which formula efficiently calculates total sales revenue where Unit Price is in D2:D50 and Quantity is in E2:E50?",
    options: [
      "=SUM(D2:D50 * E2:E50)",
      "=SUMPRODUCT(D2:D50, E2:E50)",
      "=PRODUCT(D2:D50, E2:E50)",
      "=SUMSQ(D2:D50, E2:E50)"
    ],
    correctAnswer: 1,
    explanation: "=SUMPRODUCT(D2:D50, E2:E50) multiplies each row's unit price by its quantity and sums the total directly without needing an extra helper column."
  },
  {
    question: "Can SUMPRODUCT handle 3D multi-sheet range references (e.g., =SUMPRODUCT(Sheet1:Sheet3!A1:A10))?",
    options: [
      "Yes, natively in Excel 365",
      "No, SUMPRODUCT does not support 3D range references",
      "Yes, but only if sheets are grouped",
      "Only when paired with INDIRECT"
    ],
    correctAnswer: 1,
    explanation: "SUMPRODUCT cannot perform 3D array calculations across multiple worksheet tabs directly; passing a 3D range reference results in a #VALUE! error."
  },
  {
    question: "What is the performance advantage of SUMPRODUCT over helper-column SUM formulas in massive workbooks?",
    options: [
      "SUMPRODUCT eliminates volatile workbook recalcs and reduces grid clutter",
      "SUMPRODUCT computes 100x faster than standard C++ Excel core routines",
      "SUMPRODUCT reduces GPU memory consumption",
      "SUMPRODUCT prevents cell locking"
    ],
    correctAnswer: 0,
    explanation: "Using SUMPRODUCT eliminates the need to populate thousands of intermediate helper column cells, reducing workbook file size, memory footprint, and grid clutter."
  },
  {
    question: "In the expression =SUMPRODUCT((A2:A100=\"Naihati\")+(A2:A100=\"Barrackpore\"), B2:B100), what logic does the addition operator (+) represent?",
    options: [
      "AND logic",
      "OR logic",
      "NOT logic",
      "XOR logic"
    ],
    correctAnswer: 1,
    explanation: "In array calculations, addition (+) acts as logical OR, while multiplication (*) acts as logical AND. The expression sums B2:B100 where location is either Naihati OR Barrackpore."
  },
  {
    question: "What happens if a cell in an array passed to SUMPRODUCT contains an error value like #DIV/0!?",
    options: [
      "SUMPRODUCT ignores the error row",
      "SUMPRODUCT returns 0 for that row",
      "The entire SUMPRODUCT formula returns #DIV/0!",
      "SUMPRODUCT replaces the error with the mean"
    ],
    correctAnswer: 2,
    explanation: "Unlike the AGGREGATE function, standard SUMPRODUCT propagates underlying errors. If any single cell in the target array contains an error, SUMPRODUCT fails with that exact error."
  },
  {
    question: "What is the result of =PRODUCT(5, 2, 3)?",
    options: [
      "10",
      "30",
      "25",
      "15"
    ],
    correctAnswer: 1,
    explanation: "=PRODUCT(5, 2, 3) evaluates 5 * 2 * 3 = 30."
  },
  {
    question: "How does SUMSQ handle negative numbers in its input range?",
    options: [
      "Negative numbers return negative squared results",
      "Negative numbers are squared into positive numbers before summing",
      "Negative numbers trigger a #NUM! error",
      "Negative numbers are ignored"
    ],
    correctAnswer: 1,
    explanation: "Squaring any real negative number yields a positive value (e.g. (-4)² = 16). Thus, SUMSQ converts all negative values to positive squares."
  },
  {
    question: "What is the maximum number of arrays that can be supplied to SUMPRODUCT in modern Excel?",
    options: [
      "2",
      "30",
      "255",
      "1024"
    ],
    correctAnswer: 2,
    explanation: "Modern Excel allows up to 255 array arguments in a single SUMPRODUCT function call."
  },
  {
    question: "Why might =SUMPRODUCT(A2:A10 * B2:B10) fail while =SUMPRODUCT(A2:A10, B2:B10) succeeds on the same dataset?",
    options: [
      "Comma syntax handles text entries as 0, whereas * operator throws #VALUE! on text",
      "Comma syntax uses multi-threading, * uses single thread",
      "Comma syntax forces integer conversion",
      "* operator requires CSE entry"
    ],
    correctAnswer: 0,
    explanation: "The explicit multiplication operator (*) attempts numeric math on text values (like column headers), causing #VALUE!, whereas comma separator syntax silently treats non-numeric elements as zero."
  },
  {
    question: "Which function would you use to compute Euclidean norm or distance vector hypotenuse sum of squares?",
    options: [
      "SUMPRODUCT",
      "SUMSQ",
      "PRODUCT",
      "MOD"
    ],
    correctAnswer: 1,
    explanation: "SUMSQ calculates the sum of squared values, making it the foundational building block for calculating vector magnitudes, Euclidean norms, and standard error computations."
  },
  {
    question: "What is the output of =SUMPRODUCT({1, 2, 3}, {4, 5, 6})?",
    options: [
      "21",
      "32",
      "120",
      "15"
    ],
    correctAnswer: 1,
    explanation: "(1*4) + (2*5) + (3*6) = 4 + 10 + 18 = 32."
  },
  {
    question: "How can you count the number of sales in Barrackpore exceeding ₹50,000 using SUMPRODUCT?",
    options: [
      "=SUMPRODUCT((Region=\"Barrackpore\")*(Sales>50000))",
      "=SUMPRODUCT(Region=\"Barrackpore\", Sales>50000)",
      "=COUNT(Region=\"Barrackpore\", Sales>50000)",
      "=SUMSQ((Region=\"Barrackpore\")*(Sales>50000))"
    ],
    correctAnswer: 0,
    explanation: "Multiplying two boolean condition arrays converts TRUE*TRUE to 1, and any FALSE to 0. SUMPRODUCT then sums the 1s, effectively performing multi-criteria counting."
  },
  {
    question: "What does the formula =SUMPRODUCT(1/COUNTIF(A2:A10, A2:A10)) compute?",
    options: [
      "The average frequency of numbers",
      "The count of unique items in range A2:A10",
      "The reciprocal sum of sales",
      "The standard deviation of counts"
    ],
    correctAnswer: 1,
    explanation: "This classic Excel idiom sums the reciprocals of item frequencies. For an item appearing k times, k occurrences of 1/k sum to 1, yielding the total count of unique items."
  },
  {
    question: "What is the default return type of the SUMPRODUCT function?",
    options: [
      "Dynamic spilled array",
      "Single scalar numeric value",
      "Boolean TRUE/FALSE",
      "Text string summary"
    ],
    correctAnswer: 1,
    explanation: "Even though SUMPRODUCT processes multiple array arguments internally, it aggregates them down to a single scalar numeric value."
  },
  {
    question: "In Excel financial modeling, why is SUMPRODUCT preferred for weighted average calculations?",
    options: [
      "It automatically divides by 100",
      "It calculates sum of (Weights * Values) divided by sum of Weights in one concise formula",
      "It prevents rounding errors",
      "It formats results as currency automatically"
    ],
    correctAnswer: 1,
    explanation: "Weighted average = SUMPRODUCT(Weights, Values) / SUM(Weights). It avoids intermediate columns and ensures exact precision."
  },
  {
    question: "What does =PRODUCT(A1:A5) return if A1:A5 contains {2, 3, \"N/A\", 4, 5}?",
    options: [
      "#VALUE!",
      "120",
      "0",
      "#N/A"
    ],
    correctAnswer: 1,
    explanation: "Text strings like \"N/A\" are ignored by PRODUCT. It computes 2 * 3 * 4 * 5 = 120."
  },
  {
    question: "What happens if a text string is passed directly as a hardcoded argument to PRODUCT, e.g. =PRODUCT(2, \"5\")?",
    options: [
      "Excel ignores \"5\" and returns 2",
      "Excel coerces \"5\" to numeric 5 and returns 10",
      "Excel returns #VALUE!",
      "Excel returns #NAME?"
    ],
    correctAnswer: 1,
    explanation: "When text numbers are passed directly as literal arguments (not cell references), Excel coerces numeric strings into numbers. =PRODUCT(2, \"5\") returns 10."
  },
  {
    question: "What is the value of =SUMSQ(-3, -4)?",
    options: [
      "-25",
      "25",
      "7",
      "-7"
    ],
    correctAnswer: 1,
    explanation: "(-3)² + (-4)² = 9 + 16 = 25."
  },
  {
    question: "How does SUMPRODUCT interact with dynamic spilled array references like A2#?",
    options: [
      "SUMPRODUCT returns #SPILL!",
      "SUMPRODUCT accepts A2# natively as an array argument",
      "SUMPRODUCT requires wrapper INDEX() function",
      "SUMPRODUCT cannot accept spilled references"
    ],
    correctAnswer: 1,
    explanation: "SUMPRODUCT natively accepts spilled array references (e.g. =SUMPRODUCT(A2#, B2#)) and evaluates the dynamic grid range automatically."
  },
  {
    question: "In SUMPRODUCT, what is the result of using boolean condition subtraction: =SUMPRODUCT((A2:A5=\"Barrackpore\") - (B2:B5>100))?",
    options: [
      "It performs logical XOR",
      "It subtracts boolean values (1 - 1 = 0, 1 - 0 = 1, 0 - 1 = -1) and sums the resulting net array",
      "It causes a syntax error",
      "It converts all values to 0"
    ],
    correctAnswer: 1,
    explanation: "Subtraction coerces booleans to numeric 1s and 0s and evaluates element-wise arithmetic, returning the scalar sum of differences."
  },
  {
    question: "Which of the following is equivalent to =SUMPRODUCT(A1:A5)?",
    options: [
      "=SUM(A1:A5)",
      "=COUNT(A1:A5)",
      "=AVERAGE(A1:A5)",
      "=PRODUCT(A1:A5)"
    ],
    correctAnswer: 0,
    explanation: "When passed a single array argument, SUMPRODUCT multiplies each element by 1 and returns their sum, making it functionally identical to =SUM(A1:A5)."
  },
  {
    question: "What happens if all cells in a range passed to =SUMSQ(A1:A5) are blank?",
    options: [
      "Returns 0",
      "Returns #NULL!",
      "Returns #VALUE!",
      "Returns 1"
    ],
    correctAnswer: 0,
    explanation: "If all cells in the referenced range are blank, SUMSQ returns 0."
  },
  {
    question: "Why should you avoid referencing entire columns like =SUMPRODUCT(A:A, B:B) in older Excel workbooks?",
    options: [
      "It forces Excel to evaluate over 1 million row pairs, severely slowing down calculation",
      "It corrupts column header data",
      "It triggers an automatic macro alert",
      "It is syntactically invalid"
    ],
    correctAnswer: 0,
    explanation: "Referencing entire columns (A:A) in SUMPRODUCT forces Excel to calculate all 1,048,576 row pairs, causing noticeable lag and workbook recalculation delays."
  },
  {
    question: "What is the primary difference between SUMPRODUCT and SUMIFS?",
    options: [
      "SUMIFS can perform multi-column element-wise multiplication natively without helper columns, whereas SUMPRODUCT cannot",
      "SUMIFS requires range dimensions to be 1D vectors and handles single-column sums with criteria, while SUMPRODUCT can multiply multiple array columns element-wise",
      "SUMIFS is slower than SUMPRODUCT",
      "SUMPRODUCT is restricted to positive numbers"
    ],
    correctAnswer: 1,
    explanation: "SUMIFS sums a single column based on criteria but cannot perform element-wise array multiplication (e.g. Quantity * Price) on the fly. SUMPRODUCT handles multi-array element-wise multiplication and complex conditional matrix logic."
  }
];

export default questions;
