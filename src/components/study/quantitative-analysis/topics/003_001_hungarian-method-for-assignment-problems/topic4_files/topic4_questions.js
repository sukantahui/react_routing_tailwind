// topic4_questions.js
// 30 Moderate to Expert Questions on Balanced Assignment Problems

const questions = [
  {
    question: "What is the formal definition of a 'Balanced Assignment Problem'?",
    shortAnswer: "A problem where the number of resources (m) exactly equals the number of tasks (n), resulting in a square (n x n) cost matrix where total supply Sum S_i = n exactly equals total demand Sum D_j = n.",
    explanation: "Because m = n, every resource gets assigned and every task gets fulfilled with zero surplus and zero deficit.",
    hint: "Number of resources equals number of tasks (m = n).",
    level: "moderate",
    codeExample: "Balanced Condition: m === n (Square Matrix C in R^(n x n))."
  },
  {
    question: "Why can the Hungarian Method be applied DIRECTLY to a balanced assignment problem without pre-processing?",
    shortAnswer: "Because a square n x n matrix possesses a natural 1-to-1 bijection between row and column indices, allowing row and column reductions to operate symmetrically.",
    explanation: "No dummy rows or dummy columns are needed.",
    hint: "Square matrix allows direct row and column reductions.",
    level: "moderate",
    codeExample: "Direct Execution: if (m === n) { runHungarian(); }"
  },
  {
    question: "In a balanced 4x4 problem, how many independent zeros must be covered by horizontal and vertical lines to confirm that the optimal assignment is reached?",
    shortAnswer: "The minimum number of lines required to cover all zeros must equal 4 ( L = n = 4 ).",
    explanation: "By König's theorem, if minimum covering lines L equals matrix order n, an optimal assignment of n independent zeros exists.",
    hint: "Minimum covering lines L = n = 4.",
    level: "expert",
    codeExample: "König's Optimality Condition: MinLines(Zeros) === n."
  },
  {
    question: "Suppose Debangshu in Barrackpore is solving a balanced 4x4 foundry problem. After row and column reduction, he can cover all zeros with only 3 lines. Is the current matrix optimal?",
    shortAnswer: "No, because L = 3 < n = 4. An additional matrix reduction step is required before an optimal 1-to-1 matching can be extracted.",
    explanation: "L < n indicates that fewer than n independent zeros exist.",
    hint: "L = 3 < 4 means not optimal yet; additional reduction needed.",
    level: "moderate",
    codeExample: "if (L < n) { performAdditionalReduction(); }"
  },
  {
    question: "Consider a balanced 3x3 cost matrix C = [[9, 26, 15], [13, 27, 6], [35, 20, 15]]. What are the row minimums?",
    shortAnswer: "Row 1 min = 9; Row 2 min = 6; Row 3 min = 15.",
    explanation: "min(9, 26, 15) = 9; min(13, 27, 6) = 6; min(35, 20, 15) = 15.",
    hint: "Row 1: 9, Row 2: 6, Row 3: 15.",
    level: "moderate",
    codeExample: "row_mins = [9, 6, 15]"
  },
  {
    question: "After subtracting these row minimums, what is the resulting Row-Reduced matrix?",
    shortAnswer: "C_row = [[0, 17, 6], [7, 21, 0], [20, 5, 0]].",
    explanation: "Row 1: [9-9, 26-9, 15-9] = [0, 17, 6]; Row 2: [13-6, 27-6, 6-6] = [7, 21, 0]; Row 3: [35-15, 20-15, 15-15] = [20, 5, 0].",
    hint: "Subtract 9, 6, 15 from rows 1, 2, 3.",
    level: "moderate",
    codeExample: "C_row = [[0, 17, 6], [7, 21, 0], [20, 5, 0]]"
  },
  {
    question: "What are the column minimums of C_row = [[0, 17, 6], [7, 21, 0], [20, 5, 0]]?",
    shortAnswer: "Col 1 min = 0; Col 2 min = 5; Col 3 min = 0.",
    explanation: "Col 1 has 0; Col 2 min is 5; Col 3 has 0.",
    hint: "Col 1: 0, Col 2: 5, Col 3: 0.",
    level: "moderate",
    codeExample: "col_mins = [0, 5, 0]"
  },
  {
    question: "After subtracting column minimums, what is the fully reduced matrix?",
    shortAnswer: "C_reduced = [[0, 12, 6], [7, 16, 0], [20, 0, 0]].",
    explanation: "Col 2 becomes [17-5, 21-5, 5-5] = [12, 16, 0]; Cols 1 and 3 remain unchanged.",
    hint: "Subtract 5 from Column 2: [0, 12, 6], [7, 16, 0], [20, 0, 0].",
    level: "moderate",
    codeExample: "C_reduced = [[0, 12, 6], [7, 16, 0], [20, 0, 0]]"
  },
  {
    question: "In this fully reduced matrix, what is the optimal 1-to-1 zero assignment?",
    shortAnswer: "Row 1 ➔ Task 1 (Cell 1,1); Row 2 ➔ Task 3 (Cell 2,3); Row 3 ➔ Task 2 (Cell 3,2).",
    explanation: "Independent zeros: (1,1)=0, (2,3)=0, (3,2)=0. Each row and column is covered exactly once!",
    hint: "1->1, 2->3, 3->2.",
    level: "moderate",
    codeExample: "Assignments: (1, 1), (2, 3), (3, 2)."
  },
  {
    question: "What is the final minimum total cost Z* in the original matrix for this assignment?",
    shortAnswer: "₹35 ( c_11 + c_23 + c_32 = 9 + 6 + 20 = ₹35 ).",
    explanation: "9 + 6 + 20 = ₹35.",
    hint: "9 + 6 + 20 = 35.",
    level: "moderate",
    codeExample: "Z_opt = 9 + 6 + 20 = ₹35"
  },
  {
    question: "How does Strong Duality verify that Z* = ₹35 is 100% optimal?",
    shortAnswer: "Sum of Row Reductions (9 + 6 + 15 = 30) + Sum of Column Reductions (0 + 5 + 0 = 5) = 30 + 5 = ₹35 = Z* (Zero Duality Gap).",
    explanation: "The total potential reductions exactly equal the minimal objective cost.",
    hint: "Sum of row and column minimums equals Z*.",
    level: "expert",
    codeExample: "Dual Check: Sum(u) + Sum(v) = 30 + 5 = ₹35 === Z_opt."
  },
  {
    question: "Suppose Susmita in Ichapur manages 4 retail cashiers and 4 billing counters. How many possible cashier-counter assignment combinations exist?",
    shortAnswer: "24 permutations ( 4! = 24 ).",
    explanation: "4! = 4 x 3 x 2 x 1 = 24 combinations.",
    hint: "4! = 24.",
    level: "moderate",
    codeExample: "4! = 24 permutations."
  },
  {
    question: "What is the time complexity of solving a balanced n x n problem using the Hungarian Method?",
    shortAnswer: "O(n^3) polynomial time.",
    explanation: "Polynomial time ensures instantaneous computation even for 50x50 matrices.",
    hint: "O(n^3) polynomial time.",
    level: "expert",
    codeExample: "Complexity: O(n^3)."
  },
  {
    question: "Suppose Mamata in Kolkata solves a balanced 4x4 problem and finds that all cells in the reduced matrix have values >= 0. What does this indicate?",
    shortAnswer: "Dual Feasibility is satisfied across all pairs (u_i + v_j <= c_ij).",
    explanation: "Non-negativity of the reduced matrix corresponds to dual feasibility.",
    hint: "Dual feasibility is satisfied.",
    level: "expert",
    codeExample: "all(C_reduced >= 0) => Dual Feasibility."
  },
  {
    question: "Can a balanced assignment problem have an empty solution space (infeasible)?",
    shortAnswer: "No, a balanced linear assignment problem on a complete bipartite graph K_{n,n} ALWAYS has at least one feasible permutation solution (in fact, exactly n! feasible solutions).",
    explanation: "Because all resources and tasks are interconnected, feasibility is guaranteed.",
    hint: "Always feasible with n! candidate permutations.",
    level: "intermediate",
    codeExample: "Feasibility is guaranteed: Solutions Count = n! >= 1."
  },
  {
    question: "Suppose Mahima in Barrackpore has a balanced 5x5 matrix. What is the maximum number of zeros that could theoretically exist in the reduced matrix?",
    shortAnswer: "25 zeros (if all entries in the original matrix were identical).",
    explanation: "In a homogeneous matrix, every cell reduces to 0.",
    hint: "Up to 5x5 = 25 zeros.",
    level: "moderate",
    codeExample: "Max Zeros = n^2 = 25."
  },
  {
    question: "What is the minimum number of zeros that must exist in any fully reduced n x n matrix?",
    shortAnswer: "At least n zeros (at least one zero in each row and each column).",
    explanation: "Row and column reductions guarantee at least one zero per row and column.",
    hint: "At least n zeros.",
    level: "moderate",
    codeExample: "Min Zeros >= n."
  },
  {
    question: "Suppose Abhronila in Jadavpur has a balanced 4x4 matrix where Row 1 has only ONE zero at Cell (1, 2). What does the Hungarian allocation protocol dictate?",
    shortAnswer: "Assign Cell (1, 2) immediately (x_12 = 1), and CROSS OUT all other zeros in Column 2 to prevent column double-booking.",
    explanation: "A single zero in a row forces that assignment.",
    hint: "Assign (1, 2) and cross out other zeros in Column 2.",
    level: "intermediate",
    codeExample: "Single Zero Rule: Assign (1, 2) → Cross out other zeros in col 2."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating assignment costs for West Bengal enterprises?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Final Minimum Cost Z* = ₹35'"
  },
  {
    question: "What is the relationship between the number of basic variables in the transportation model and a balanced assignment problem?",
    shortAnswer: "A balanced transportation problem requires m + n - 1 = 2n - 1 basic variables, but an assignment problem assigns flow to only n variables, creating n - 1 zero-valued basic cells (severe degeneracy).",
    explanation: "This degeneracy explains why Hungarian matrix reduction is vastly superior to the transportation simplex method.",
    hint: "2n - 1 basic variables vs only n positive allocations.",
    level: "expert",
    codeExample: "Degeneracy Gap = (2n - 1) - n = n - 1."
  },
  {
    question: "What is the golden rule of Balanced Assignment Problems?",
    shortAnswer: "'Verify m = n; subtract row minimums; subtract column minimums; test line covering (L = n); assign independent zeros; state final minimum cost Z* in Indian Rupees (₹)!'",
    explanation: "This complete rule captures the entire 5-step balanced Hungarian pipeline.",
    hint: "Verify m=n → Row Min → Col Min → Line Test → Assign Zeros → State Z* in ₹.",
    level: "moderate",
    codeExample: "Golden Rule: CheckBalance → RowReduce → ColReduce → CoverTest → Assign → Report Z*."
  }
];

export default questions;
