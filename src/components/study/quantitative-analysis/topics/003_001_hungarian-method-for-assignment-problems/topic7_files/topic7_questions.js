// topic7_questions.js
// 30 Moderate to Expert Questions on the Hungarian Method Master Overview

const questions = [
  {
    question: "What is the Hungarian Method in Operations Research?",
    shortAnswer: "The Hungarian Method (also known as the Kuhn-Munkres algorithm) is a specialized combinatorial optimization and primal-dual algorithm that finds the minimum-cost (or maximum-profit) one-to-one assignment in O(n^3) polynomial time.",
    explanation: "It operates directly on the cost matrix through row/column reductions and line covering, bypassing simplex degeneracy.",
    hint: "Kuhn-Munkres O(n^3) polynomial time assignment algorithm.",
    level: "moderate",
    codeExample: "HungarianMethod(C) -> OptimalPermutationMatrix X* with MinCost Z* in O(n^3)."
  },
  {
    question: "Who developed the Hungarian Method and why is it called 'Hungarian'?",
    shortAnswer: "Developed by American mathematician Harold Kuhn in 1955, who named it the 'Hungarian Method' to honor Hungarian mathematicians Dénes Kőnig (1931) and Jenő Egerváry (1931), whose theorems on bipartite graph matching and matrix duals formed its theoretical foundation.",
    explanation: "James Munkres later reviewed and optimized the algorithm in 1957 to run in strict O(n^3) time.",
    hint: "Harold Kuhn (1955) in honor of Kőnig and Egerváry.",
    level: "moderate",
    codeExample: "History: Kuhn (1955) based on Kőnig (1931) & Egerváry (1931); optimized by Munkres (1957)."
  },
  {
    question: "What are the 5 sequential steps of the Hungarian Method algorithm?",
    shortAnswer: "Step 1: Check balance (add dummy rows/cols if m != n); Step 2: Row Reduction; Step 3: Column Reduction; Step 4: Line Covering Test (if L = n, proceed to Step 5; if L < n, execute additional reduction); Step 5: Assign independent zeros and compute Z* in Indian Rupees (₹).",
    explanation: "This structured 5-step pipeline guarantees global optimality on all assignment problems.",
    hint: "Balance -> Row Reduce -> Col Reduce -> Line Test / Extra Reduce -> Assign Zeros.",
    level: "intermediate",
    codeExample: "Pipeline: Balance() -> RowReduce() -> ColReduce() -> LineCover() -> AssignZeros() -> Z_opt."
  },
  {
    question: "What is König's Theorem in the context of the Hungarian Method?",
    shortAnswer: "In any bipartite graph (or binary zero-one matrix), the MINIMUM number of horizontal and vertical lines needed to cover all zeros EQUALS the MAXIMUM number of independent zeros (maximum matching).",
    explanation: "Min Lines L = Max Independent Zeros M. If L = n, a complete matching of size n exists.",
    hint: "Min lines to cover all zeros equals max independent zeros.",
    level: "expert",
    codeExample: "König's Theorem: MinLines(Zeros) === MaxIndependentZeros."
  },
  {
    question: "What exact condition signals that the current reduced matrix is GLOBALLY OPTIMAL and ready for zero assignment?",
    shortAnswer: "When the minimum number of horizontal and vertical lines required to cover all zeros equals the matrix order n ( L = n ).",
    explanation: "L = n proves that n independent zeros exist, allowing a complete 1-to-1 matching.",
    hint: "Minimum covering lines L = n.",
    level: "moderate",
    codeExample: "if (MinLines(Zeros) === n) { return ReadyForOptimalAssignment; }"
  },
  {
    question: "What must be done if the minimum number of covering lines is strictly LESS than the matrix order ( L < n )?",
    shortAnswer: "Execute an ADDITIONAL REDUCTION step: find the smallest uncovered element e; subtract e from all uncovered elements, add e to elements at line intersections, and leave single-covered elements unchanged.",
    explanation: "This creates new zero candidates without destroying existing dual feasibility.",
    hint: "Find min uncovered e; subtract e from uncovered, add e to intersections.",
    level: "expert",
    codeExample: "e = min(uncovered); uncovered -= e; intersections += e; single_covered unchanged."
  },
  {
    question: "How does the Hungarian Method convert a Maximization Problem (e.g. maximizing sales revenue) into standard minimization form?",
    shortAnswer: "Subtract every element in the profit matrix from the LARGEST element in the matrix: c_ij' = max(C) - c_ij.",
    explanation: "This creates a relative regret/opportunity loss matrix that is solved using standard Hungarian steps.",
    hint: "c_ij' = max(C) - c_ij.",
    level: "moderate",
    codeExample: "MaxToMin: C_regret = max(C) - C."
  },
  {
    question: "Suppose Debangshu in Barrackpore is solving a 4x4 problem. In Step 4, he covers all zeros with L = 4 lines. What is his next operational step?",
    shortAnswer: "Proceed to Step 5: scan rows and columns with exactly ONE zero, make independent zero assignments, and cross out conflicting zeros.",
    explanation: "L = 4 equals n = 4, so no additional reduction is needed.",
    hint: "Proceed to Step 5: assign independent zeros.",
    level: "moderate",
    codeExample: "L === 4 === n => Step 5: AssignIndependentZeros()."
  },
  {
    question: "What is the time complexity of the Hungarian Method compared to brute-force enumeration for an n x n problem?",
    shortAnswer: "Hungarian Method runs in O(n^3) polynomial time, whereas brute-force enumeration requires O(n!) factorial time.",
    explanation: "For n = 10, Hungarian takes ~1,000 operations; brute force takes 3,628,800 operations.",
    hint: "O(n^3) polynomial vs O(n!) factorial.",
    level: "intermediate",
    codeExample: "Complexity: Hungarian = O(n^3) vs BruteForce = O(n!)."
  },
  {
    question: "Why does the Hungarian Method never get trapped in infinite cycling?",
    shortAnswer: "Because each additional reduction strictly increases the dual objective function W = Sum u_i + Sum v_j by at least e * (n - L) > 0, guaranteeing finite convergence to the global optimum.",
    explanation: "Strict dual monotonic ascent on a discrete lattice guarantees termination.",
    hint: "Dual objective strictly increases at every additional reduction step.",
    level: "expert",
    codeExample: "Delta W = e * (n - L) > 0 => Strict Monotonic Dual Convergence."
  },
  {
    question: "Suppose Susmita in Ichapur finds that a 4x4 matrix has 2 alternative sets of 4 independent zeros. What does this indicate?",
    shortAnswer: "It indicates the presence of ALTERNATIVE OPTIMAL ASSIGNMENTS with the exact same minimum total cost Z*.",
    explanation: "Multiple zero configurations provide managerial routing flexibility at zero cost penalty.",
    hint: "Alternative optimal solutions exist at identical minimal cost.",
    level: "moderate",
    codeExample: "Multiple Optima: Alternative zero matching sets with identical cost Z*."
  },
  {
    question: "What is the single most common student mistake when reporting the final cost Z* after completing the Hungarian Method?",
    shortAnswer: "Summing the zero values (0 + 0 + 0 = 0) from the reduced matrix instead of pulling the original cost entries from the INITIAL matrix in Indian Rupees (₹).",
    explanation: "The reduced matrix only identifies the zero positions; the physical monetary cost comes from the original matrix.",
    hint: "Must calculate final cost from the ORIGINAL matrix in ₹.",
    level: "intermediate",
    codeExample: "Fatal Error: Z = 0+0+0; Correct: Z = c_orig[1][pi[1]] + ... in ₹."
  },
  {
    question: "How does Strong Duality apply to the Hungarian Method?",
    shortAnswer: "The final minimum primal cost Z* = Sum c_ij x_ij* exactly equals the total sum of all row reductions, column reductions, and additional reduction shifts W* = Sum u_i* + Sum v_j*.",
    explanation: "Zero duality gap provides 100% verification of mathematical optimality.",
    hint: "Primal cost Z* equals sum of all dual potential shifts W*.",
    level: "expert",
    codeExample: "Strong Duality: Z_primal === W_dual."
  },
  {
    question: "Suppose Mamata in Kolkata solves a 3x3 problem where row reductions were [10, 8, 9], col reduction was [0, 0, 3], and no extra reductions were needed. What is the certified minimum cost Z*?",
    shortAnswer: "Z* = ₹30 ( (10 + 8 + 9) + (0 + 0 + 3) = 27 + 3 = ₹30 ).",
    explanation: "Sum of dual shifts = 27 + 3 = ₹30.",
    hint: "27 + 3 = 30.",
    level: "moderate",
    codeExample: "Z_opt = 10 + 8 + 9 + 3 = ₹30"
  },
  {
    question: "Why can each row and each column contain ONLY ONE assigned zero [0]?",
    shortAnswer: "To enforce the 1-to-1 bijection constraint (Sum rows = 1, Sum cols = 1), preventing worker double-booking and task duplication.",
    explanation: "Assigning two zeros in one row assigns two tasks to one worker.",
    hint: "Enforces 1-to-1 matching without double-booking.",
    level: "moderate",
    codeExample: "Bijection: Exactly one [0] per row and column."
  },
  {
    question: "What happens if a student attempts the Hungarian Method on an unbalanced 3x4 matrix without adding a dummy row first?",
    shortAnswer: "The algorithm will fail during column reduction and line covering, producing an invalid, non-square schedule where tasks are double-booked.",
    explanation: "Square matrix structure is mandatory for the Hungarian algorithm.",
    hint: "Must add a dummy row first; otherwise reductions fail.",
    level: "intermediate",
    codeExample: "Fatal Error: Running Hungarian on 3x4 matrix without dummy row."
  },
  {
    question: "How is a restricted cell (e.g. Worker 1 cannot do Task 2) handled throughout all 5 steps of the Hungarian Method?",
    shortAnswer: "Assign c_12 = M (Big-M); leave M intact during row/col subtractions (M - k = M); the algorithm will naturally avoid placing a zero in cell (1, 2).",
    explanation: "Big-M serves as an insurmountable cost barrier.",
    hint: "Set c_12 = M and leave M intact during subtractions.",
    level: "intermediate",
    codeExample: "Restricted Cell: c_12 = Infinity (Big-M)."
  },
  {
    question: "Suppose Mahima in Barrackpore solves a 5x5 assignment problem for hospital wards. How many independent zeros must she find in Step 5?",
    shortAnswer: "Exactly 5 independent zeros (one in each row and column).",
    explanation: "For an n x n problem, exactly n independent zeros are required.",
    hint: "Exactly 5 independent zeros.",
    level: "moderate",
    codeExample: "IndependentZerosCount = n = 5."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating assignment costs for West Bengal enterprises?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Final Minimum Cost Z* = ₹46'"
  },
  {
    question: "What is the ultimate master rule of the Hungarian Method?",
    shortAnswer: "'Check square balance (add ₹0 dummies); subtract row minimums; subtract column minimums; test line covering L = n (if L < n, adjust uncovered by e); assign independent zeros; state final minimum cost Z* in Indian Rupees (₹)!'",
    explanation: "This complete rule captures the entire 5-step Hungarian algorithm from start to finish.",
    hint: "Balance -> Row Min -> Col Min -> Line Cover / Adjust -> Assign Zeros -> State Z* in ₹.",
    level: "moderate",
    codeExample: "Master Rule: Balance -> RowReduce -> ColReduce -> LineTest(L==n) -> Assign -> Z* in ₹."
  }
];

export default questions;
