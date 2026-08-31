// topic12_questions.js
// 30 Moderate to Expert Questions on Selecting Independent Zeros in Assignment Problems

const questions = [
  {
    question: "What are 'Independent Zeros' in an assignment problem?",
    shortAnswer: "A set of n zero-cost cells in the reduced matrix where NO two zeros share the same row and NO two zeros share the same column, forming a valid 1-to-1 permutation matching.",
    explanation: "Independent zeros guarantee that each worker gets exactly one job and each job gets exactly one worker.",
    hint: "n zeros with no two in the same row or column.",
    level: "moderate",
    codeExample: "IndependentZeros: {(i, pi(i)) | c_reduced[i][pi(i)] === 0} for all i = 1..n."
  },
  {
    question: "What is the Row Scanning Protocol in Step 5 of the Hungarian Method?",
    shortAnswer: "Examine each row sequentially from 1 to n; if a row contains EXACTLY ONE zero, enclose that zero in a square [0] (assign x_ij = 1) and immediately CROSS OUT (X) all other zeros in that SAME COLUMN.",
    explanation: "Crossing out other zeros in that column prevents assigning multiple workers to the same task.",
    hint: "Find row with 1 zero → Box it [0] → Cross out (X) other zeros in its column.",
    level: "moderate",
    codeExample: "RowScan: if (rowZeros.length === 1) { assign(i, j); crossOutColZeros(j); }"
  },
  {
    question: "What is the Column Scanning Protocol in Step 5 of the Hungarian Method?",
    shortAnswer: "Examine each column sequentially from 1 to n; if a column contains EXACTLY ONE zero, enclose that zero in a square [0] (assign x_ij = 1) and immediately CROSS OUT (X) all other zeros in that SAME ROW.",
    explanation: "Crossing out other zeros in that row prevents assigning multiple tasks to the same worker.",
    hint: "Find column with 1 zero → Box it [0] → Cross out (X) other zeros in its row.",
    level: "moderate",
    codeExample: "ColScan: if (colZeros.length === 1) { assign(i, j); crossOutRowZeros(i); }"
  },
  {
    question: "Why must conflicting zeros in the same column/row be crossed out (X)?",
    shortAnswer: "To strictly satisfy the 1-to-1 bijection constraint (Sum x_ij = 1 for rows and cols); if another zero in that column was chosen, that task would be double-booked.",
    explanation: "Crossing out prevents infeasible task duplication.",
    hint: "Prevents double-booking workers or tasks.",
    level: "moderate",
    codeExample: "Constraint Enforcement: Sum_i x_ij = 1 and Sum_j x_ij = 1."
  },
  {
    question: "What should you do if all remaining rows and columns have TWO OR MORE zeros during Step 5?",
    shortAnswer: "Make an ARBITRARY choice by selecting any one zero in a row with minimum zeros, box it [0], cross out conflicting zeros, and proceed; this indicates the existence of ALTERNATIVE OPTIMAL ASSIGNMENTS.",
    explanation: "Tied zeros provide multiple alternative solutions with the same minimum total cost.",
    hint: "Make an arbitrary choice; indicates alternative optimal solutions.",
    level: "expert",
    codeExample: "Arbitrary Choice => Alternative Optima with identical minimal cost Z*."
  },
  {
    question: "Suppose in a 3x3 matrix: Row 1 = [0, 5, 2], Row 2 = [4, 0, 0], Row 3 = [3, 0, 1]. Which zero is assigned FIRST?",
    shortAnswer: "Cell (1, 1) in Row 1, because Row 1 contains EXACTLY ONE zero.",
    explanation: "Row 1 has 1 zero, Row 2 has 2 zeros, Row 3 has 1 zero. Scanning starts with Row 1.",
    hint: "Cell (1, 1) because Row 1 has only one zero.",
    level: "moderate",
    codeExample: "First Assignment: [0] at Cell (1, 1)."
  },
  {
    question: "After assigning Cell (1, 1), what zeros are crossed out?",
    shortAnswer: "All other zeros in Column 1 (none exist in Column 1).",
    explanation: "Col 1 has no other zeros.",
    hint: "None in Column 1.",
    level: "moderate",
    codeExample: "CrossOut(Col 1) => None."
  },
  {
    question: "Next, Row 3 has only ONE zero at Cell (3, 2). What happens when Cell (3, 2) is assigned?",
    shortAnswer: "Cell (3, 2) is boxed [0], and the zero in Cell (2, 2) in Row 2 is immediately CROSSED OUT (X) because it shares Column 2!",
    explanation: "Crossing out Cell (2, 2) leaves Cell (2, 3) as the only remaining zero in Row 2.",
    hint: "Box (3, 2) and cross out (2, 2) in Column 2.",
    level: "moderate",
    codeExample: "Assign(3, 2) → CrossOut(2, 2)."
  },
  {
    question: "What zero is assigned to Row 2 after Cell (2, 2) is crossed out?",
    shortAnswer: "Cell (2, 3) is assigned [0], completing the 3 independent zero assignments: (1, 1), (2, 3), (3, 2).",
    explanation: "Cell (2, 3) is the single remaining zero in Row 2.",
    hint: "Cell (2, 3).",
    level: "moderate",
    codeExample: "Final Assignment: (2, 3)."
  },
  {
    question: "What does it mean if, after completing all possible row and column scans, fewer than n zeros are boxed?",
    shortAnswer: "It means the matrix was NOT optimal (L < n); the student made a mistake in Step 4 by concluding L = n prematurely without performing necessary additional reductions.",
    explanation: "L = n guarantees that n independent zeros exist.",
    hint: "Indicates false optimality in Step 4; additional reduction was actually needed.",
    level: "expert",
    codeExample: "Assertion: If L === n, Count(BoxedZeros) MUST equal n."
  },
  {
    question: "Suppose Debangshu in Barrackpore finds 4 independent zeros in a 4x4 matrix. How does he calculate the final total cost Z*?",
    shortAnswer: "By looking up the original cost rates c_ij in the INITIAL cost matrix for the 4 boxed cell positions and summing them in Indian Rupees (₹).",
    explanation: "Never sum from the reduced matrix; always pull from the original matrix.",
    hint: "Sum the original matrix rates for the 4 boxed cell coordinates.",
    level: "moderate",
    codeExample: "Z_opt = c_orig[1][pi[1]] + c_orig[2][pi[2]] + c_orig[3][pi[3]] + c_orig[4][pi[4]] in ₹."
  },
  {
    question: "Suppose Susmita in Ichapur discovers that an assignment problem has 3 alternative optimal zero sets. How will their total costs compare?",
    shortAnswer: "All 3 solutions will have the EXACT SAME certified minimum total cost Z*.",
    explanation: "Alternative optima share identical total cost.",
    hint: "All 3 solutions have the exact same total cost Z*.",
    level: "moderate",
    codeExample: "Z_opt(Sol_A) === Z_opt(Sol_B) === Z_opt(Sol_C)."
  },
  {
    question: "Can an assigned zero [0] ever be placed in a cell that contained Big-M in the original matrix?",
    shortAnswer: "No, because Big-M cells never reduce to zero during valid row/col/additional reductions.",
    explanation: "Big-M is an insurmountable barrier.",
    hint: "No, Big-M cells never become zero.",
    level: "moderate",
    codeExample: "c_reduced[prohibited] = M > 0 (Never Zero)."
  },
  {
    question: "Suppose Mamata in Kolkata has a dummy row in a 4x4 balanced matrix. Where should the boxed zero [0] for the dummy row lie?",
    shortAnswer: "In the column corresponding to the task that is OUTSOURCED (at ₹0 cost).",
    explanation: "Dummy row allocation denotes outsourced task.",
    hint: "In the column of the task to be outsourced.",
    level: "intermediate",
    codeExample: "DummyRow [0] => Outsources that column's task."
  },
  {
    question: "What is the computational complexity of extracting n independent zeros from an optimal reduced matrix?",
    shortAnswer: "O(n^2) time via sequential row and column scanning.",
    explanation: "Scanning an n x n grid takes O(n^2) time.",
    hint: "O(n^2) operations.",
    level: "expert",
    codeExample: "Complexity = O(n^2)."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating assignment totals in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Certified Min Cost Z* = ₹46'"
  },
  {
    question: "What is the ultimate golden rule of Selecting Independent Zeros?",
    shortAnswer: "'Scan rows with 1 zero → box [0] and cross out (X) column zeros; scan cols with 1 zero → box [0] and cross out (X) row zeros; repeat until n zeros are boxed; pull rates from original matrix in ₹!'",
    explanation: "This complete rule captures all mechanics of Step 5.",
    hint: "Scan rows with 1 zero → box & cross out col; scan cols with 1 zero → box & cross out row; sum original rates in ₹.",
    level: "moderate",
    codeExample: "Golden Rule: Scan1ZeroRows() → CrossCol() → Scan1ZeroCols() → CrossRow() → PullOrigRates(₹)."
  }
];

export default questions;
