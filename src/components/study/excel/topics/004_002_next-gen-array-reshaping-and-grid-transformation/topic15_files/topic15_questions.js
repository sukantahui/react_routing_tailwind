const questions = [
  {
    "question": "What mathematical condition must be met for =MMULT(Matrix_A, Matrix_B) to execute successfully?",
    "options": [
      "The number of columns in Matrix_A must equal the number of rows in Matrix_B",
      "Both matrices must be square (NxN)",
      "Both must have identical dimensions",
      "Matrices must contain only positive integers"
    ],
    "correctAnswer": 0,
    "explanation": "Matrix multiplication requires Matrix_A (MxK) and Matrix_B (KxN) where inner dimensions match (K = K)."
  },
  {
    "question": "If Matrix_A has dimensions 3x4 and Matrix_B has dimensions 4x2, what are the dimensions of =MMULT(Matrix_A, Matrix_B)?",
    "options": [
      "3 rows by 2 columns (3x2)",
      "4x4",
      "2x3",
      "3x4"
    ],
    "correctAnswer": 0,
    "explanation": "Result matrix dimensions are outer dimensions (3 rows from A, 2 columns from B = 3x2)."
  },
  {
    "question": "Which function calculates the matrix inverse (A^-1) of a square matrix?",
    "options": [
      "MINVERSE()",
      "MMULT()",
      "MDETERM()",
      "INVERSE()"
    ],
    "correctAnswer": 0,
    "explanation": "MINVERSE(array) returns the matrix inverse."
  },
  {
    "question": "Which function calculates the matrix determinant of a square matrix?",
    "options": [
      "MDETERM()",
      "MINVERSE()",
      "MMULT()",
      "DET()"
    ],
    "correctAnswer": 0,
    "explanation": "MDETERM(array) computes the scalar determinant of a square matrix."
  },
  {
    "question": "What does it mean if MDETERM(Matrix_A) equals exactly 0?",
    "options": [
      "The matrix is singular (non-invertible) and MINVERSE will produce a #NUM! error",
      "The matrix is identity",
      "The matrix is empty",
      "Calculation succeeded"
    ],
    "correctAnswer": 0,
    "explanation": "A determinant of 0 indicates linear dependence; the matrix has no inverse."
  },
  {
    "question": "How do you solve a system of simultaneous linear equations [A][X] = [B] in Excel using matrix algebra?",
    "options": [
      "=MMULT(MINVERSE(Matrix_A), Vector_B)",
      "=MMULT(Matrix_A, Vector_B)",
      "=MINVERSE(Matrix_A) * Vector_B",
      "=DIVIDE(Vector_B, Matrix_A)"
    ],
    "correctAnswer": 0,
    "explanation": "Solving A*X = B gives X = A^-1 * B → =MMULT(MINVERSE(A), B)."
  },
  {
    "question": "What error does MMULT return if columns in array1 do not equal rows in array2?",
    "options": [
      "#VALUE!",
      "#NUM!",
      "#N/A",
      "#REF!"
    ],
    "correctAnswer": 0,
    "explanation": "Mismatched matrix multiplication dimensions produce #VALUE!."
  },
  {
    "question": "What error does MINVERSE return if the input matrix is NOT square (rows != cols)?",
    "options": [
      "#VALUE!",
      "#NUM!",
      "#N/A",
      "#REF!"
    ],
    "correctAnswer": 0,
    "explanation": "Non-square matrices produce #VALUE! in MINVERSE."
  },
  {
    "question": "What does =MMULT(Matrix_A, MINVERSE(Matrix_A)) return for any invertible square matrix?",
    "options": [
      "The Identity Matrix (1s on the main diagonal, 0s elsewhere)",
      "0",
      "Matrix_A",
      "Scalar 1"
    ],
    "correctAnswer": 0,
    "explanation": "Multiplying a matrix by its inverse yields the Identity Matrix."
  },
  {
    "question": "In financial portfolio optimization, why is MMULT used?",
    "options": [
      "To compute portfolio variance: Variance = w^T * Covariance_Matrix * w",
      "To calculate taxes",
      "To format prices",
      "To sort tickers"
    ],
    "correctAnswer": 0,
    "explanation": "Portfolio variance is computed via quadratic matrix multiplication (weights * Covariance * weights)."
  },
  {
    "question": "How do you calculate the sum of all elements in a 10x1 vector using MMULT without using SUM()?",
    "options": [
      "=MMULT(array_10x1, {1,1,1,1,1,1,1,1,1,1})",
      "=MMULT({1,1,1,1,1,1,1,1,1,1}, array_10x1)",
      "=MMULT(array, array)",
      "=MINVERSE(array)"
    ],
    "correctAnswer": 1,
    "explanation": "Multiplying a 1x10 row vector of ones by a 10x1 column vector sums all elements."
  },
  {
    "question": "In modern Excel 365, how does MINVERSE output its inverted matrix?",
    "options": [
      "Spills automatically into a dynamic array matching the input dimensions",
      "Requires Ctrl+Shift+Enter",
      "Only outputs cell A1",
      "Requires VBA"
    ],
    "correctAnswer": 0,
    "explanation": "MINVERSE automatically spills the full inverted matrix in Excel 365."
  },
  {
    "question": "What is the determinant of a 2x2 matrix [[a, b], [c, d]]?",
    "options": [
      "a*d - b*c",
      "a*b - c*d",
      "a+d - (b+c)",
      "a*c + b*d"
    ],
    "correctAnswer": 0,
    "explanation": "Determinant of 2x2 matrix is (a*d - b*c)."
  },
  {
    "question": "How to solve for 3 unknowns (x, y, z) from: 2x+y-z=8, -3x-y+2z=-11, -2x+y+2z=-3?",
    "options": [
      "=MMULT(MINVERSE({2,1,-1; -3,-1,2; -2,1,2}), {8; -11; -3})",
      "=SUMIFS()",
      "=GOALSEEK()",
      "=SOLVER()"
    ],
    "correctAnswer": 0,
    "explanation": "Passes the 3x3 coefficient matrix and 3x1 constant vector to MMULT(MINVERSE(A), B)."
  },
  {
    "question": "Why does MDETERM sometimes return a tiny floating-point number like 1.23E-16 instead of exact 0?",
    "options": [
      "IEEE 754 standard binary floating-point roundoff precision in matrix algorithms",
      "Excel bug",
      "Virus",
      "Wrong formula"
    ],
    "correctAnswer": 0,
    "explanation": "Floating-point precision limits can yield negligible values near 1E-16 instead of exact 0."
  },
  {
    "question": "How to clean floating point noise in matrix inversions?",
    "options": [
      "=ROUND(MINVERSE(matrix), 10)",
      "=CLEAN()",
      "=TRIM()",
      "=INT()"
    ],
    "correctAnswer": 0,
    "explanation": "Wrapping in ROUND eliminates floating-point epsilon noise."
  },
  {
    "question": "In Leontief Input-Output economic modeling, what formula calculates total economic output X from final demand D and tech matrix A?",
    "options": [
      "=MMULT(MINVERSE(Identity_Matrix - Matrix_A), Demand_Vector)",
      "=MMULT(Matrix_A, Demand)",
      "=MINVERSE(Demand)",
      "=A - D"
    ],
    "correctAnswer": 0,
    "explanation": "The Leontief equation is X = (I - A)^-1 * D."
  },
  {
    "question": "Can MMULT handle boolean arrays directly (e.g. MMULT(A2:A10 > 5, B2:B10))?",
    "options": [
      "Boolean arrays must be coerced to numbers (using -- or *1) before MMULT",
      "Yes, automatically",
      "No, never",
      "Only with IF"
    ],
    "correctAnswer": 0,
    "explanation": "MMULT requires numeric arrays; boolean TRUE/FALSE must be coerced via double unary (--)."
  },
  {
    "question": "What is the transpose function used with MMULT for vector orientation alignment?",
    "options": [
      "TRANSPOSE()",
      "FLIP()",
      "REVERSE()",
      "ROTATE()"
    ],
    "correctAnswer": 0,
    "explanation": "TRANSPOSE(vector) flips row vectors to column vectors and vice versa."
  },
  {
    "question": "What is the output dimension of =MMULT(1xN_vector, Nx1_vector)?",
    "options": [
      "1x1 (A single scalar dot-product value)",
      "NxN matrix",
      "Nx1",
      "1xN"
    ],
    "correctAnswer": 0,
    "explanation": "Multiplying 1xN by Nx1 yields a 1x1 scalar dot product."
  },
  {
    "question": "What is the output dimension of =MMULT(Nx1_vector, 1xN_vector)?",
    "options": [
      "NxN square outer-product matrix",
      "1x1",
      "Nx1",
      "1xN"
    ],
    "correctAnswer": 0,
    "explanation": "Multiplying Nx1 by 1xN yields an NxN outer product matrix."
  },
  {
    "question": "In electrical engineering circuit analysis at Barrackpore, what does MINVERSE solve?",
    "options": [
      "Nodal voltage and mesh current simultaneous Kirchhoff equations",
      "Resistor color codes",
      "AC frequency",
      "Wire lengths"
    ],
    "correctAnswer": 0,
    "explanation": "Solves simultaneous Kirchhoff nodal admittance and mesh impedance equations."
  },
  {
    "question": "What does it mean if a system of equations has no unique solution?",
    "options": [
      "Determinant is 0 (singular matrix; equations are dependent or inconsistent)",
      "Determinant is 1",
      "Matrix has negative numbers",
      "All numbers are odd"
    ],
    "correctAnswer": 0,
    "explanation": "Determinant 0 means equations are linearly dependent or inconsistent."
  },
  {
    "question": "How to create an NxN Identity Matrix dynamically in Excel 365?",
    "options": [
      "=IF(SEQUENCE(N) = SEQUENCE(1, N), 1, 0)",
      "=IDENTITY(N)",
      "=MATRIX.I(N)",
      "=ONES(N)"
    ],
    "correctAnswer": 0,
    "explanation": "Comparing row SEQUENCE(N) with column SEQUENCE(1,N) generates an identity matrix."
  },
  {
    "question": "What is the advantage of solving linear systems via MMULT/MINVERSE over Solver?",
    "options": [
      "Instant dynamic formula recalculation without opening dialogs or running macros",
      "Solver is faster",
      "Solver has no limits",
      "MINVERSE only works on 2 equations"
    ],
    "correctAnswer": 0,
    "explanation": "Matrix formulas are dynamic and recalculate instantly when input coefficients change."
  },
  {
    "question": "Can MMULT process dynamic spilled arrays (e.g. MMULT(A2#, B2#))?",
    "options": [
      "Yes, fully supported with dynamic spilled array references",
      "No",
      "Only static ranges",
      "Only tables"
    ],
    "correctAnswer": 0,
    "explanation": "Fully compatible with spilled array # references."
  },
  {
    "question": "What does =MDETERM(Identity_Matrix) always evaluate to?",
    "options": [
      "1",
      "0",
      "N",
      "-1"
    ],
    "correctAnswer": 0,
    "explanation": "The determinant of any identity matrix is strictly 1."
  },
  {
    "question": "What is the matrix multiplication associative property verified in Excel?",
    "options": [
      "MMULT(A, MMULT(B, C)) = MMULT(MMULT(A, B), C)",
      "MMULT(A, B) = MMULT(B, A)",
      "A * B = B",
      "A + B = A*B"
    ],
    "correctAnswer": 0,
    "explanation": "Matrix multiplication is associative: A*(B*C) = (A*B)*C."
  },
  {
    "question": "Is matrix multiplication commutative in general (does MMULT(A, B) equal MMULT(B, A))?",
    "options": [
      "No, matrix multiplication is generally non-commutative (A*B != B*A)",
      "Yes, always",
      "Only for 2x2",
      "Only with 1s"
    ],
    "correctAnswer": 0,
    "explanation": "Matrix multiplication is non-commutative in general (AB != BA)."
  },
  {
    "question": "Why is matrix algebra mastery critical for elite spreadsheet engineers?",
    "options": [
      "It unlocks multi-dimensional econometric modeling, Markov chains, network routing, and linear programming directly in Excel",
      "To use more CPU",
      "It replaces Word",
      "To format tables"
    ],
    "correctAnswer": 0,
    "explanation": "Enables solving complex multi-variable systems in finance, economics, physics, and operations research."
  }
];

export default questions;
