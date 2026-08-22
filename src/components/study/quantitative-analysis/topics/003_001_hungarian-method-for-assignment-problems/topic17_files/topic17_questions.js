// topic17_questions.js
// 30 Moderate to Expert Short Conceptual & Viva Questions for Module 003_001 Final Review

const questions = [
  {
    question: "What is an Assignment Problem in Operations Research?",
    shortAnswer: "A specialized 1-to-1 combinatorial optimization problem of allocating n resources to n tasks such that total cost/time is minimized (or profit is maximized) while ensuring exactly one resource per task.",
    explanation: "It is a special degenerate case of the transportation model where supply = 1 and demand = 1.",
    hint: "1-to-1 resource-task matching optimization problem.",
    level: "moderate",
    codeExample: "Min Z = Sum Sum c_ij x_ij s.t. Sum_j x_ij = 1, Sum_i x_ij = 1, x_ij in {0, 1}."
  },
  {
    question: "Why is the Assignment Problem considered a severely degenerate Transportation Problem?",
    shortAnswer: "A transportation problem of size n x n requires m + n - 1 = 2n - 1 basic variables, but an assignment problem has only n positive allocations of x_ij = 1, leaving n - 1 basic variables at value zero.",
    explanation: "Standard simplex or MODI would cycle heavily due to this extreme degeneracy, making Hungarian Method necessary.",
    hint: "Requires 2n - 1 basic variables, but only n are positive (n - 1 zero basic cells).",
    level: "expert",
    codeExample: "Degeneracy Gap = (2n - 1) - n = n - 1 zero-valued basic variables."
  },
  {
    question: "What is the computational complexity of the Hungarian Method versus Brute Force?",
    shortAnswer: "Hungarian Method runs in O(n^3) polynomial time, while brute force enumeration takes O(n!) factorial time.",
    explanation: "For n = 10: Hungarian takes 1,000 steps; brute force takes 3,628,800 steps.",
    hint: "O(n^3) polynomial time vs O(n!) factorial time.",
    level: "moderate",
    codeExample: "Complexity: Hungarian = O(n^3); BruteForce = O(n!)."
  },
  {
    question: "What is the Matrix Invariance Theorem under row/column scalar shifts?",
    shortAnswer: "Adding or subtracting a constant from any row or column of the cost matrix shifts the objective function by a constant amount but leaves the OPTIMAL ASSIGNMENT PERMUTATION 100% UNCHANGED.",
    explanation: "Because sum_j x_ij = 1, subtracting u_i from row i reduces all candidate permutations by exactly u_i.",
    hint: "Row/column constant shifts preserve optimal assignment permutation.",
    level: "expert",
    codeExample: "Theorem: argmin Sum c_ij x_ij === argmin Sum (c_ij - u_i - v_j) x_ij."
  },
  {
    question: "What is Kőnig's Theorem (1931)?",
    shortAnswer: "In any bipartite graph (or binary zero-one matrix), the MINIMUM number of lines (horizontal and vertical) needed to cover all zeros EQUALS the MAXIMUM number of independent zeros (maximum matching).",
    explanation: "Min Vertex Cover = Max Bipartite Matching.",
    hint: "Min lines to cover all zeros equals max independent zeros.",
    level: "expert",
    codeExample: "König's Theorem: MinLines(Zeros) === MaxIndependentMatching."
  },
  {
    question: "What is the Optimality Criterion in the Hungarian Method?",
    shortAnswer: "The matrix is optimal and ready for zero assignment when the minimum number of horizontal and vertical lines covering all zeros EQUALS the matrix order ( L = n ).",
    explanation: "L = n proves that n independent zeros can be selected simultaneously.",
    hint: "Minimum covering lines L = n.",
    level: "moderate",
    codeExample: "OptimalityCondition: MinLines(Zeros) === n."
  },
  {
    question: "What is the 3-part transformation protocol during Additional Reductions (Step 4b)?",
    shortAnswer: "1. Find smallest uncovered element e = min(uncovered); 2. Subtract e from uncovered cells; 3. Add e to intersection cells; 4. Leave single-covered cells unchanged.",
    explanation: "Generates new zero candidates while strictly maintaining non-negativity and dual feasibility.",
    hint: "Uncovered - e; Intersections + e; Single-covered unchanged.",
    level: "moderate",
    codeExample: "uncovered -= e; intersections += e; single_covered = unchanged."
  },
  {
    question: "How does the Hungarian Method convert a Maximization problem into a Minimization problem?",
    shortAnswer: "Identify the largest element in the profit matrix M_max = max(P) and subtract every element from it: c_ij = M_max - p_ij (Relative Regret Matrix).",
    explanation: "Minimizing total opportunity loss strictly maximizes total profit.",
    hint: "c_ij = max(P) - p_ij.",
    level: "moderate",
    codeExample: "C_regret = max(P) - P."
  },
  {
    question: "How is an Unbalanced Assignment Problem (m != n) balanced?",
    shortAnswer: "If m < n, add (n - m) dummy rows with ₹0 costs; if m > n, add (m - n) dummy columns with ₹0 costs.",
    explanation: "Zero-cost dummy lines restore square matrix symmetry without adding monetary charges.",
    hint: "Add |m - n| dummy rows or columns with ₹0 unit costs.",
    level: "moderate",
    codeExample: "if (m < n) add_dummy_rows(n - m, 0); else if (m > n) add_dummy_cols(m - n, 0);"
  },
  {
    question: "What does it mean if a real worker is paired with a Dummy Column in the optimal solution?",
    shortAnswer: "That worker is placed on STANDBY / IDLE (at ₹0 additional expense), identifying the least cost-effective person to deploy.",
    explanation: "Dummy column allocation represents idle capacity.",
    hint: "Real worker remains idle on standby.",
    level: "moderate",
    codeExample: "Worker ➔ Dummy Col => Worker is Idle."
  },
  {
    question: "What does it mean if a Dummy Row is paired with a real task in the optimal solution?",
    shortAnswer: "That task cannot be serviced internally and is OUTSOURCED or deferred to external contractors (at ₹0 internal budget expense).",
    explanation: "Dummy row allocation represents outsourced task demand.",
    hint: "Real task is outsourced or deferred.",
    level: "moderate",
    codeExample: "Dummy Row ➔ Task => Task is Outsourced."
  },
  {
    question: "How is a Prohibited Assignment (e.g. Worker 1 cannot operate Machine 3) handled?",
    shortAnswer: "Assign a prohibitively large cost M (Big-M, e.g. ₹99,999) to cell (1, 3); the minimization solver will never assign a zero to cell (1, 3).",
    explanation: "Big-M serves as an insurmountable cost barrier.",
    hint: "Assign Big-M (c_13 = M) to prohibited cells.",
    level: "moderate",
    codeExample: "c_13 = 99999 (Big-M)."
  },
  {
    question: "What is the Row Scanning Protocol in Step 5?",
    shortAnswer: "Scan rows sequentially; if a row contains EXACTLY ONE zero, box it [0] and immediately CROSS OUT (X) all other zeros in that SAME COLUMN.",
    explanation: "Prevents double-booking tasks.",
    hint: "Row with 1 zero -> box [0] -> cross out column zeros.",
    level: "moderate",
    codeExample: "RowScan: if (row_zeros === 1) { box(i, j); crossOutCol(j); }"
  },
  {
    question: "What is the Column Scanning Protocol in Step 5?",
    shortAnswer: "Scan columns sequentially; if a column contains EXACTLY ONE zero, box it [0] and immediately CROSS OUT (X) all other zeros in that SAME ROW.",
    explanation: "Prevents double-booking workers.",
    hint: "Col with 1 zero -> box [0] -> cross out row zeros.",
    level: "moderate",
    codeExample: "ColScan: if (col_zeros === 1) { box(i, j); crossOutRow(i); }"
  },
  {
    question: "What happens if all remaining rows and columns have TWO OR MORE zeros during Step 5?",
    shortAnswer: "Make an ARBITRARY choice on any zero, box it [0], cross out conflicting zeros, and proceed; this indicates the presence of ALTERNATIVE OPTIMAL ASSIGNMENTS.",
    explanation: "Multiple zero choices yield multiple optimal schedules with identical minimal cost.",
    hint: "Make an arbitrary choice; indicates alternative optimal solutions.",
    level: "expert",
    codeExample: "Arbitrary Choice => Alternative Optima with identical minimal cost Z*."
  },
  {
    question: "How do you compute the final minimum total cost Z* after boxing n independent zeros?",
    shortAnswer: "Sum the unit rates from the ORIGINAL cost matrix in Indian Rupees (₹) for the n boxed zero coordinates: Z* = Sum c_orig[i, pi(i)].",
    explanation: "Never sum zeros from the reduced matrix; always pull from the original cost matrix.",
    hint: "Sum original cost entries for the assigned coordinates in ₹.",
    level: "intermediate",
    codeExample: "Z_opt = Sum(c_orig[i][pi[i]]) in Indian Rupees (₹)."
  },
  {
    question: "How does Strong Duality certify that the solution is 100% globally optimal?",
    shortAnswer: "The total primal cost Z* exactly equals the total dual objective W* = Sum u_i + Sum v_j + Sum Delta W (Zero Duality Gap).",
    explanation: "Zero duality gap confirms mathematical optimality.",
    hint: "Primal cost Z* equals dual potential sum W*.",
    level: "expert",
    codeExample: "Strong Duality: Z_primal === W_dual."
  },
  {
    question: "What is Total Unimodularity (TUM) and why is it vital in assignment models?",
    shortAnswer: "A property where every square submatrix of the constraint matrix has determinant in {-1, 0, 1}, guaranteeing that all basic feasible solutions are strictly binary integers {0, 1} without fractional worker splitting.",
    explanation: "Eliminates the need for branch-and-bound integer programming.",
    hint: "Guarantees extreme points are pure binary integers {0, 1}.",
    level: "expert",
    codeExample: "TUM Guarantee: All LP vertices are integer permutation matrices."
  },
  {
    question: "Can an operations researcher normalize a cost matrix by dividing each row by its row sum?",
    shortAnswer: "NO! Dividing rows by different scalars distorts the relative cost trade-offs and invalidates the optimal solution permutation.",
    explanation: "Only uniform scalar additions/subtractions preserve optimal matchings.",
    hint: "No; row division destroys cost invariance and invalidates the solution.",
    level: "expert",
    codeExample: "Fatal Error: Dividing rows by row sums destroys the solution."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating assignment costs for West Bengal enterprises?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Certified Min Cost Z* = ₹46'"
  },
  {
    question: "What is the ultimate golden summary of the entire Assignment Problems track?",
    shortAnswer: "'Check square balance (add ₹0 dummies); convert max to regret (M_max - P); execute Row & Column Reductions; test line covering L = n (adjust by e if L < n); box [0] and cross out (X) independent zeros; calculate final Z* from original rates in Indian Rupees (₹)!'",
    explanation: "This master summary encapsulates all 18 topics of Module 003_001.",
    hint: "Balance -> Regret -> Row/Col Reduce -> Line Test / Adjust -> Assign Zeros -> State Z* in ₹.",
    level: "moderate",
    codeExample: "Master Summary: Complete 5-Step Hungarian Method Pipeline."
  }
];

export default questions;
