// topic0_questions.js
// 30 Moderate to Expert Questions on Introduction to Assignment Problems

const questions = [
  {
    question: "What is an Assignment Problem in Operations Research?",
    shortAnswer: "An Assignment Problem is a special class of Linear Programming and Transportation Problem where n resources (e.g. workers, machines, lawyers) are matched to n tasks (e.g. jobs, legal cases, delivery routes) on a strictly one-to-one basis to minimize total cost or maximize total effectiveness.",
    explanation: "Each resource has a supply of exactly 1 unit, and each task has a demand of exactly 1 unit. Every decision variable x_ij is binary: x_ij = 1 if resource i is assigned to task j, and x_ij = 0 otherwise.",
    hint: "One-to-one matching of n resources to n tasks.",
    level: "moderate",
    codeExample: "Minimize Z = sum_{i=1}^n sum_{j=1}^n (c_ij * x_ij) subject to sum_j x_ij = 1, sum_i x_ij = 1, x_ij in {0, 1}."
  },
  {
    question: "How does the Assignment Problem mathematically relate to the general Transportation Problem?",
    shortAnswer: "The Assignment Problem is a completely degenerate, square (n x n) Transportation Problem where every origin supply S_i = 1 and every destination demand D_j = 1.",
    explanation: "Because all supplies and demands are 1, a basic feasible solution would theoretically require m + n - 1 = 2n - 1 basic variables, but only n variables can carry positive flow (x_ij = 1), causing severe degeneracy (n - 1 basic cells have allocation 0).",
    hint: "Square transportation problem with all supplies = 1 and all demands = 1.",
    level: "expert",
    codeExample: "Special Case: S_i = 1 forall i; D_j = 1 forall j; Matrix shape = n x n."
  },
  {
    question: "Why is the standard Transportation Method (NWCR, VAM, MODI) or Simplex method inefficient for solving Assignment Problems?",
    shortAnswer: "Because of extreme basis degeneracy: with 2n - 1 basic cells and only n positive allocations, standard simplex pivoting suffers from endless degenerate pivots (θ = 0) and stalling.",
    explanation: "The Hungarian Method bypasses simplex pivoting entirely by operating directly on the cost matrix using matrix reductions in O(n^3) time.",
    hint: "Extreme degeneracy causes simplex stalling; Hungarian method runs in O(n^3).",
    level: "expert",
    codeExample: "Degeneracy Count = (2n - 1) - n = n - 1 degenerate basic variables with x = 0."
  },
  {
    question: "How many possible one-to-one assignment combinations (permutations) exist for an n x n assignment problem?",
    shortAnswer: "Exactly n! (n factorial) possible assignment permutations.",
    explanation: "For n = 5, there are 5! = 120 combinations; for n = 10, there are 10! = 3,628,800 combinations; for n = 20, there are 20! ≈ 2.43 x 10^18 combinations, making brute-force enumeration impossible.",
    hint: "n! (factorial) permutations.",
    level: "moderate",
    codeExample: "Combinations = n! (Factorial growth: O(n!))."
  },
  {
    question: "What are the mathematical constraint equations for an n x n Assignment Problem?",
    shortAnswer: "1. Row Constraints (each worker assigned to exactly 1 task): Sum_{j=1}^n x_ij = 1 (for i = 1..n); 2. Column Constraints (each task performed by exactly 1 worker): Sum_{i=1}^n x_ij = 1 (for j = 1..n); 3. Binary restrictions: x_ij in {0, 1}.",
    explanation: "These constraints enforce mutually exclusive and exhaustive one-to-one pairings.",
    hint: "Sum across rows = 1, Sum down columns = 1, binary x_ij.",
    level: "moderate",
    codeExample: "Constraints: sum_{j=1}^n x_ij = 1 (forall i); sum_{i=1}^n x_ij = 1 (forall j); x_ij in {0, 1}."
  },
  {
    question: "Who developed the theoretical mathematical foundation of the Hungarian Method?",
    shortAnswer: "Harold Kuhn (1955) developed the algorithm based on earlier combinatorial graph theorems by Hungarian mathematicians Dénes Kőnig and Jenő Egerváry.",
    explanation: "Kuhn named the method the 'Hungarian Method' to honor Kőnig and Egerváry's pioneering work in graph matching and matrix duals.",
    hint: "Harold Kuhn based on Kőnig and Egerváry.",
    level: "intermediate",
    codeExample: "History: Kuhn (1955) based on Kőnig (1931) & Egerváry (1931)."
  },
  {
    question: "What is the computational time complexity of the Hungarian Method?",
    shortAnswer: "O(n^3) polynomial time (improved by James Munkres and Edmonds-Karp).",
    explanation: "The algorithm solves an n x n problem in polynomial time proportional to n^3, transforming an intractable O(n!) search into milliseconds.",
    hint: "O(n^3) polynomial time.",
    level: "expert",
    codeExample: "Complexity: O(n^3) (Polynomial Time Matching)."
  },
  {
    question: "Suppose Debangshu in Barrackpore wants to assign 4 casting supervisors to 4 foundry furnaces. What is the total number of possible supervisor-furnace assignment permutations?",
    shortAnswer: "24 permutations ( 4! = 4 x 3 x 2 x 1 = 24 ).",
    explanation: "4! = 24 possible one-to-one pairings.",
    hint: "4! = 24.",
    level: "moderate",
    codeExample: "4! = 4 * 3 * 2 * 1 = 24 permutations."
  },
  {
    question: "What is the cost matrix (effectiveness matrix) in an assignment problem?",
    shortAnswer: "An n x n matrix where entry c_ij represents the cost, time, distance, or negative profit of assigning resource i to task j.",
    explanation: "Rows represent assignees (workers/machines) and columns represent tasks (jobs/locations).",
    hint: "Square matrix of costs c_ij for assigning resource i to task j.",
    level: "moderate",
    codeExample: "CostMatrix = [[c_11, c_12, ...], [c_21, c_22, ...], ...]"
  },
  {
    question: "What distinguishes a 'Balanced' assignment problem from an 'Unbalanced' assignment problem?",
    shortAnswer: "A Balanced assignment problem has an equal number of resources and tasks (square n x n matrix); an Unbalanced assignment problem has an unequal number of resources and tasks (m x n matrix where m != n).",
    explanation: "Unbalanced problems must be augmented with dummy rows or dummy columns with ₹0 costs before applying the Hungarian method.",
    hint: "Balanced is square (n x n); Unbalanced is non-square (m != n).",
    level: "moderate",
    codeExample: "Balanced: m === n; Unbalanced: m !== n."
  },
  {
    question: "Can an assignment problem have a non-integer optimal solution (e.g. x_12 = 0.5)?",
    shortAnswer: "No, because the constraint matrix of the assignment problem is Totally Unimodular (TUM), guaranteeing that every extreme point vertex is integer (x_ij in {0, 1}) even when solved as a continuous LP.",
    explanation: "Total unimodularity guarantees that continuous LP relaxations automatically yield pure binary integer solutions.",
    hint: "Total Unimodularity guarantees pure integer binary solutions.",
    level: "expert",
    codeExample: "Property: Total Unimodularity => Continuous LP optimum is strictly binary {0, 1}."
  },
  {
    question: "Suppose Susmita in Ichapur manages a hospital with 5 doctors and 5 emergency clinics. How many assignment combinations exist?",
    shortAnswer: "120 combinations ( 5! = 5 x 4 x 3 x 2 x 1 = 120 ).",
    explanation: "5! = 120 possible doctor-clinic assignments.",
    hint: "5! = 120.",
    level: "moderate",
    codeExample: "5! = 120 permutations."
  },
  {
    question: "What is the 'Matrix Reduction Principle' that powers the Hungarian Method?",
    shortAnswer: "Subtracting a constant from any row or column of a cost matrix changes the objective value by a fixed amount but leaves the OPTIMAL ASSIGNMENT COMBINATION completely unchanged.",
    explanation: "If c_ij' = c_ij - u_i - v_j, then Sum c_ij' x_ij = Sum c_ij x_ij - Sum u_i - Sum v_j = Z - constant. Minimizing Z' minimizes Z.",
    hint: "Row/column constant subtraction preserves optimal assignment.",
    level: "expert",
    codeExample: "Theorem: argmin sum(c_ij * x_ij) === argmin sum((c_ij - u_i - v_j) * x_ij)."
  },
  {
    question: "What is the physical meaning of an assignment decision variable x_32 = 1?",
    shortAnswer: "It means Resource 3 is assigned to Task 2.",
    explanation: "A binary value of 1 denotes an active assignment; x_32 = 0 denotes no assignment.",
    hint: "Resource 3 is paired with Task 2.",
    level: "moderate",
    codeExample: "x_32 = 1 => Assignee 3 executes Task 2."
  },
  {
    question: "Suppose Mamata in Kolkata assigns 3 lawyers (Susmita, Mahima, Abhronila) to 3 legal briefs. If total cost is Z = c_12 + c_21 + c_33, what are the assignments?",
    shortAnswer: "Lawyer 1 (Susmita) ➔ Brief 2; Lawyer 2 (Mahima) ➔ Brief 1; Lawyer 3 (Abhronila) ➔ Brief 3.",
    explanation: "Indices (1,2), (2,1), (3,3) indicate the respective one-to-one pairings.",
    hint: "1->2, 2->1, 3->3.",
    level: "moderate",
    codeExample: "Assignments: L1->B2, L2->B1, L3->B3."
  },
  {
    question: "How does the Hungarian Method convert a Maximization assignment problem (e.g. maximizing sales revenue) into standard minimization form?",
    shortAnswer: "By subtracting every matrix element from the LARGEST element in the matrix (c_ij' = c_max - c_ij), or multiplying the matrix by -1.",
    explanation: "This creates a regret/opportunity loss matrix that is solved using standard minimization Hungarian steps.",
    hint: "Subtract all elements from the matrix maximum: c_ij' = c_max - c_ij.",
    level: "intermediate",
    codeExample: "Maximization Conversion: c_ij' = max(C) - c_ij."
  },
  {
    question: "What is a 'Restricted (Prohibited) Assignment' and how is it handled in the cost matrix?",
    shortAnswer: "An assignment that is physically or legally impossible; handled by assigning a prohibitively large cost M (or Infinity) to that cell (c_ij = M) so the algorithm never selects it.",
    explanation: "Assigning M makes that pairing economically disastrous, forcing the solver to choose alternative valid pairings.",
    hint: "Assign a huge cost M (Big-M) to the prohibited cell.",
    level: "intermediate",
    codeExample: "Prohibited Assignment: c[i][j] = Infinity (Big-M)."
  },
  {
    question: "What is the 'Independent Zeros' concept in the Hungarian Method?",
    shortAnswer: "A set of zeros in a reduced cost matrix such that no two zeros lie in the same row or column.",
    explanation: "If n independent zeros can be found in an n x n matrix, assigning resources to these zero positions achieves total reduced cost of 0, proving global optimality.",
    hint: "Zeros that do not share any common row or column.",
    level: "expert",
    codeExample: "Independent Zeros: Zero cells {(i_1, j_1), ..., (i_n, j_n)} with unique rows and unique cols."
  },
  {
    question: "Why can the Hungarian Method NOT be directly applied to a 3 x 4 non-square matrix?",
    shortAnswer: "Because the Hungarian Method requires a 1-to-1 bijection between equal numbers of rows and columns; a non-square matrix must first be balanced with dummy lines.",
    explanation: "Row and column reductions require an equal number of dimensions.",
    hint: "Must add dummy rows/columns to make the matrix square (n x n).",
    level: "moderate",
    codeExample: "Pre-processing: If rows != cols -> Add dummy row/col with cost = 0."
  },
  {
    question: "Suppose Mahima in Barrackpore has 10 delivery vans and 10 delivery routes. How many possible van-route assignments exist?",
    shortAnswer: "3,628,800 permutations ( 10! = 3,628,800 ).",
    explanation: "10! = 3.6288 million combinations.",
    hint: "10! = 3,628,800.",
    level: "moderate",
    codeExample: "10! = 3,628,800 permutations."
  },
  {
    question: "How does the Hungarian Method solve this 10 x 10 problem with 3.6 million combinations in less than 1 millisecond?",
    shortAnswer: "By reducing the matrix dimensions through König's minimum line covering theorem, finding the optimal matching in O(n^3) = 1,000 operations instead of 3.6 million enumerations.",
    explanation: "Polynomial algebraic reductions bypass factorial combinatorial explosions.",
    hint: "O(n^3) = 1,000 steps vs 3.6 million enumerations.",
    level: "expert",
    codeExample: "Efficiency: 10^3 = 1,000 ops vs 10! = 3,628,800 ops."
  },
  {
    question: "What is the relationship between the Hungarian Method and Bipartite Matching in Graph Theory?",
    shortAnswer: "The Assignment Problem is equivalent to finding the Minimum Weight Maximum Cardinality Bipartite Matching on a complete bipartite graph G = (U, V, E).",
    explanation: "Origins U and Destinations V form the bipartite node sets, and edges E have weights c_ij.",
    hint: "Minimum weight perfect matching on a bipartite graph.",
    level: "expert",
    codeExample: "Graph Equivalent: Min-Weight Perfect Bipartite Matching."
  },
  {
    question: "Suppose Abhronila in Jadavpur has a 3x3 cost matrix where optimal assignments are (1, 1), (2, 3), (3, 2) with unit costs ₹25, ₹40, ₹35. What is the minimum cost Z*?",
    shortAnswer: "₹100 ( ₹25 + ₹40 + ₹35 = ₹100 ).",
    explanation: "Total cost = 25 + 40 + 35 = ₹100.",
    hint: "25 + 40 + 35 = 100.",
    level: "moderate",
    codeExample: "Z_opt = 25 + 40 + 35 = ₹100"
  },
  {
    question: "Can an assignment problem have multiple (alternative) optimal solutions?",
    shortAnswer: "Yes, when multiple distinct sets of n independent zeros can be selected in the final reduced matrix, all yielding the exact same minimal total cost Z*.",
    explanation: "Multiple zero configurations provide routing and managerial flexibility.",
    hint: "Yes, when different independent zero configurations exist.",
    level: "moderate",
    codeExample: "Multiple Optima: Alternative zero matching sets with identical cost Z*."
  },
  {
    question: "What is the currency standard for reporting costs in West Bengal assignment problems?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "All financial figures must use the Indian Rupee (₹) standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Minimum Assignment Cost Z* = ₹100'"
  },
  {
    question: "What are 3 common real-world applications of Assignment Problems in West Bengal industry?",
    shortAnswer: "1. Foundry machine-to-job scheduling in Barrackpore; 2. Doctor-to-clinic matching in Kolkata health networks; 3. Lawyer-to-case allocation in Calcutta High Court chambers.",
    explanation: "Assignment models optimize labor, healthcare, and professional services across the state.",
    hint: "Machine scheduling, healthcare dispatch, legal service allocation.",
    level: "intermediate",
    codeExample: "Applications: Industrial Scheduling, Healthcare Logistics, Legal Operations."
  },
  {
    question: "What is the first operational step when preparing an assignment problem for solution?",
    shortAnswer: "Verify if the matrix is BALANCED (rows == cols); if unbalanced, add dummy rows or columns with cost ₹0 to make it square.",
    explanation: "Square matrix structure is the prerequisite for row and column reduction.",
    hint: "Check if matrix is square; add dummy lines if unbalanced.",
    level: "intermediate",
    codeExample: "Step 1: Check balance -> Add dummy row/col if needed."
  },
  {
    question: "Why can each row and each column contain only ONE assigned cell (x_ij = 1)?",
    shortAnswer: "Because each resource is dedicated to exactly one task, and each task can be handled by exactly one resource (1-to-1 bijection).",
    explanation: "Prevents double-booking of workers or leaving tasks unperformed.",
    hint: "Enforces 1-to-1 matching without double-booking.",
    level: "moderate",
    codeExample: "Bijection: RowSum = 1 and ColSum = 1."
  },
  {
    question: "How does solving an Assignment Problem demonstrate the power of Operations Research for Law (LLM) students?",
    shortAnswer: "It provides an objective, mathematically rigorous method for allocating court resources, assigning public defenders, and distributing corporate legal briefs with zero bias and maximum cost efficiency.",
    explanation: "Quantitative modeling provides transparency and fiduciary compliance in legal administration.",
    hint: "Eliminates bias and optimizes resource efficiency in legal administration.",
    level: "intermediate",
    codeExample: "Legal Application: Impartial, cost-minimal public defender case allocation."
  },
  {
    question: "What is the golden rule of Assignment Problems?",
    shortAnswer: "'Ensure the matrix is square (n x n); enforce strict 1-to-1 matching (Sum rows = 1, Sum cols = 1, x in {0, 1}); apply the Hungarian Method to find n independent zeros!'",
    explanation: "This rule encapsulates the entire assignment problem paradigm.",
    hint: "Square matrix -> 1-to-1 matching -> Hungarian method independent zeros.",
    level: "moderate",
    codeExample: "Golden Rule: (1) Square Matrix -> (2) 1-to-1 Constraints -> (3) Hungarian Matching."
  }
];

export default questions;
