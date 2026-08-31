// topic2_questions.js
// 30 Moderate to Expert Questions on One-to-One Allocation in Assignment Problems

const questions = [
  {
    question: "What is the core definition of 'One-to-One Allocation' (Bijection) in an Assignment Problem?",
    shortAnswer: "One-to-one allocation means each resource (worker/machine) is assigned to exactly ONE task, and each task (job/case) is performed by exactly ONE resource, with zero double-booking and zero unassigned entities.",
    explanation: "Mathematically represented by row sum = 1 and column sum = 1 on binary variables x_ij in {0, 1}.",
    hint: "Each resource gets exactly 1 task, and each task gets exactly 1 resource.",
    level: "moderate",
    codeExample: "Bijection: sum_j x_ij = 1 (forall i) and sum_i x_ij = 1 (forall j)."
  },
  {
    question: "How is a One-to-One Allocation represented algebraically as a matrix?",
    shortAnswer: "As a Permutation Matrix P, which is an n x n binary matrix containing exactly one '1' in each row and each column, and '0' elsewhere.",
    explanation: "A permutation matrix corresponds to a distinct bijective mapping between {1..n} and {1..n}.",
    hint: "An n x n Permutation Matrix with exactly one 1 per row and column.",
    level: "moderate",
    codeExample: "P in {0, 1}^(n x n) such that P * 1 = 1 and 1^T * P = 1^T."
  },
  {
    question: "What operational catastrophe occurs in hospital management if the one-to-one allocation rule is violated?",
    shortAnswer: "A doctor could be scheduled for two simultaneous emergency surgeries (double-booking), while another critical surgery is left with zero doctors, leading to fatal delays.",
    explanation: "One-to-one constraints ensure 100% schedule feasibility and patient safety.",
    hint: "Double-booking of staff and neglected surgical procedures.",
    level: "intermediate",
    codeExample: "Conflict: RowSum > 1 (Double Booking) or ColSum = 0 (Neglected Task)."
  },
  {
    question: "How many distinct one-to-one allocation permutations exist for 5 workers and 5 tasks?",
    shortAnswer: "120 permutations ( 5! = 5 x 4 x 3 x 2 x 1 = 120 ).",
    explanation: "First worker has 5 choices, second has 4, third has 3, fourth has 2, fifth has 1.",
    hint: "5! = 120.",
    level: "moderate",
    codeExample: "5! = 120 permutations."
  },
  {
    question: "Suppose Debangshu in Barrackpore sets x_11 = 1 and x_12 = 1. What constraint is violated?",
    shortAnswer: "Row Constraint 1 is violated: x_11 + x_12 + ... = 2 != 1 (Worker 1 is double-booked across Task 1 and Task 2).",
    explanation: "A worker cannot be in two places at the same time.",
    hint: "Row 1 sum equals 2 instead of 1 (Double Booking).",
    level: "moderate",
    codeExample: "Violation: sum_{j} x_1j = 2 != 1 (Infeasible Allocation)."
  },
  {
    question: "Suppose in the same matrix, column 3 has x_13 = 0, x_23 = 0, x_33 = 0. What constraint is violated?",
    shortAnswer: "Column Constraint 3 is violated: Sum_{i} x_i3 = 0 != 1 (Task 3 is unassigned and neglected).",
    explanation: "Every task must have exactly one worker assigned.",
    hint: "Column 3 sum equals 0 instead of 1 (Unassigned Task).",
    level: "moderate",
    codeExample: "Violation: sum_{i} x_i3 = 0 != 1 (Unmet Requirement)."
  },
  {
    question: "What is the total number of non-zero entries (ones) in ANY valid n x n one-to-one allocation matrix?",
    shortAnswer: "Exactly n non-zero entries (all equal to 1).",
    explanation: "Since each of the n rows has exactly one 1, the total sum of all elements in the matrix is n.",
    hint: "Exactly n entries of 1.",
    level: "moderate",
    codeExample: "TotalOnes = sum_{i=1}^n sum_{j=1}^n x_ij = n."
  },
  {
    question: "Why does the Hungarian Method guarantee that its final solution will always be a valid one-to-one allocation?",
    shortAnswer: "Because it terminates only when it identifies n INDEPENDENT ZEROS—zeros that share no common row or column—enabling an exact 1-to-1 permutation matching.",
    explanation: "Independent zeros map 1-to-1 to the rows and columns of the matrix.",
    hint: "Terminates on n independent zeros with unique rows and columns.",
    level: "expert",
    codeExample: "Termination: Cardinality(IndependentZeros) === n."
  },
  {
    question: "Suppose Susmita in Ichapur assigns 4 retail staff to 4 supermarket departments. If staff 1➔Dept 2, staff 2➔Dept 4, staff 3➔Dept 1, which department MUST staff 4 be assigned to for a valid bijection?",
    shortAnswer: "Department 3 (the only remaining unassigned department).",
    explanation: "Departments 1, 2, and 4 are already taken; to satisfy column constraints, staff 4 must take Dept 3.",
    hint: "Department 3.",
    level: "moderate",
    codeExample: "Remaining Task = {1, 2, 3, 4} \\ {2, 4, 1} = {3}."
  },
  {
    question: "In graph theory terms, what mathematical object represents a valid one-to-one allocation on an n x n problem?",
    shortAnswer: "A Perfect Matching on a bipartite graph G = (U, V, E) with |U| = |V| = n.",
    explanation: "A perfect matching covers every vertex in U and V exactly once.",
    hint: "A Perfect Bipartite Matching.",
    level: "expert",
    codeExample: "Graph Structure: Perfect Matching M subset of E such that deg_M(v) = 1 forall v."
  },
  {
    question: "What is the consequence of allowing fractional allocations (e.g. x_11 = 0.5 and x_12 = 0.5) in industrial operations?",
    shortAnswer: "It implies splitting a human worker or physical machine across two separate jobs (e.g. half-day at furnace 1 and half-day at furnace 2), which is often physically impossible in continuous industrial shifts.",
    explanation: "Binary 1-to-1 matching eliminates part-time split-shift complications.",
    hint: "Requires fractional job-splitting, which is often operationally infeasible.",
    level: "intermediate",
    codeExample: "Fractional Split: x_11 = 0.5, x_12 = 0.5 (Continuous shift disruption)."
  },
  {
    question: "Suppose Mamata in Kolkata optimizes 6 legal briefs among 6 attorneys. How many possible one-to-one allocations exist?",
    shortAnswer: "720 permutations ( 6! = 720 ).",
    explanation: "6! = 6 x 5 x 4 x 3 x 2 x 1 = 720.",
    hint: "6! = 720.",
    level: "moderate",
    codeExample: "6! = 720 permutations."
  },
  {
    question: "How does the Hungarian Method evaluate all 720 permutations in Mamata's 6x6 problem?",
    shortAnswer: "In O(6^3) = 216 algebraic steps through matrix reduction, finding the provably minimal permutation without checking all 720 individual combinations.",
    explanation: "Dual reduction finds the optimal matching in polynomial time.",
    hint: "O(n^3) = 216 operations vs 720 enumerations.",
    level: "expert",
    codeExample: "Operations: 6^3 = 216 ops."
  },
  {
    question: "What is an 'Independent Set of Cells' in a matrix?",
    shortAnswer: "A set of cells such that no two cells lie on the same row or the same column.",
    explanation: "An independent set of size n defines a valid one-to-one allocation permutation.",
    hint: "Cells that do not share any common row or column.",
    level: "moderate",
    codeExample: "Independent Set S: forall (i, j), (r, c) in S, i != r and j != c."
  },
  {
    question: "Suppose Mahima in Barrackpore represents an allocation matrix with diagonal ones: P = diag(1, 1, ..., 1). What assignment does this represent?",
    shortAnswer: "The Identity Assignment: Worker 1 ➔ Task 1, Worker 2 ➔ Task 2, ..., Worker n ➔ Task n.",
    explanation: "Diagonal ones map each resource to its identical task index.",
    hint: "Worker i gets Task i (Identity Assignment).",
    level: "moderate",
    codeExample: "P = IdentityMatrix(n) => Worker_i → Task_i."
  },
  {
    question: "What is the cost of a one-to-one allocation schedule given by permutation matrix P = [x_ij]?",
    shortAnswer: "Total Cost Z = Sum_{i=1}^n Sum_{j=1}^n (c_ij * x_ij) = Sum_{i=1}^n c_{i, \pi(i)}, where \pi(i) is the task assigned to worker i.",
    explanation: "Cost is the sum of the n specific matrix cells where x_ij = 1.",
    hint: "Sum of the n allocated cell costs.",
    level: "moderate",
    codeExample: "Z = sum(cost[i][pi[i]] for i in range(n))"
  },
  {
    question: "Suppose Abhronila in Jadavpur has costs: (1➔2) = ₹30, (2➔1) = ₹20, (3➔3) = ₹25. What is the total allocation cost?",
    shortAnswer: "₹75 ( ₹30 + ₹20 + ₹25 = ₹75 ).",
    explanation: "30 + 20 + 25 = ₹75.",
    hint: "30 + 20 + 25 = 75.",
    level: "moderate",
    codeExample: "Z = 30 + 20 + 25 = ₹75"
  },
  {
    question: "Why can an assignment problem NEVER have more than n positive allocations in a basic feasible solution?",
    shortAnswer: "Because having n+1 positive allocations would require at least one row or column to contain two 1s (by the Pigeonhole Principle), violating row or column sum constraints.",
    explanation: "Pigeonhole Principle enforces strict upper bound of n ones.",
    hint: "Pigeonhole Principle: n+1 allocations forces double booking.",
    level: "expert",
    codeExample: "Pigeonhole Principle: n tasks across n workers => Max ones = n."
  },
  {
    question: "What is the physical meaning of a zero entry (x_ij = 0) in an assignment solution?",
    shortAnswer: "It means Resource i is NOT assigned to Task j.",
    explanation: "x_ij = 0 indicates an inactive pairing.",
    hint: "Resource i is not assigned to Task j.",
    level: "moderate",
    codeExample: "x_ij = 0 => No assignment between worker i and task j."
  },
  {
    question: "Can two different one-to-one allocations produce the exact same total cost Z?",
    shortAnswer: "Yes, when alternative optimal assignments exist, allowing managers to choose between different valid permutations at the identical minimum cost.",
    explanation: "Alternative permutations provide operational flexibility.",
    hint: "Yes, alternative optimal permutations have identical total cost.",
    level: "moderate",
    codeExample: "Alternative Permutations: Z(P_1) === Z(P_2) === Z*."
  },
  {
    question: "How does one-to-one allocation prevent nepotism and subjective bias in public sector appointments in West Bengal?",
    shortAnswer: "By relying on mathematical cost/merit matrices and algorithmic matching (Hungarian method) to objectively determine assignments based strictly on quantifiable qualifications.",
    explanation: "Mathematical optimization eliminates subjective favoritism.",
    hint: "Provides objective, merit-based, mathematically verifiable allocation.",
    level: "intermediate",
    codeExample: "Public Governance: Impartial merit-based assignment."
  },
  {
    question: "In a 3x3 problem, how many cells carry a '0' in the optimal allocation matrix?",
    shortAnswer: "6 cells carry '0' ( 3^2 - 3 = 9 - 3 = 6 zeros ).",
    explanation: "Exactly 3 cells carry '1' and the remaining 6 carry '0'.",
    hint: "9 - 3 = 6 zeros.",
    level: "moderate",
    codeExample: "ZerosCount = n^2 - n = 9 - 3 = 6."
  },
  {
    question: "In a 4x4 problem, how many cells carry a '0' in the optimal allocation matrix?",
    shortAnswer: "12 cells carry '0' ( 4^2 - 4 = 16 - 4 = 12 zeros ).",
    explanation: "Exactly 4 cells carry '1' and the remaining 12 carry '0'.",
    hint: "16 - 4 = 12 zeros.",
    level: "moderate",
    codeExample: "ZerosCount = n^2 - n = 16 - 4 = 12."
  },
  {
    question: "In an n x n problem, what percentage of decision variables are equal to 0 in the optimal solution?",
    shortAnswer: "[ (n - 1) / n ] * 100%.",
    explanation: "For n = 10, 90% of variables are 0; for n = 100, 99% of variables are 0 (extreme matrix sparsity).",
    hint: "(n - 1)/n * 100%.",
    level: "expert",
    codeExample: "Sparsity = ((n^2 - n) / n^2) * 100 = ((n - 1) / n) * 100%."
  },
  {
    question: "Suppose Debangshu needs to verify that an allocation is a valid bijection. What quick 2-step audit should he perform?",
    shortAnswer: "1. Sum across each row: all row sums must equal 1; 2. Sum down each column: all column sums must equal 1.",
    explanation: "Verifies row and column feasibility simultaneously.",
    hint: "Check all row sums == 1 and all column sums == 1.",
    level: "moderate",
    codeExample: "Audit: all(row_sum == 1) && all(col_sum == 1)."
  },
  {
    question: "What is the ultimate golden rule of One-to-One Allocation?",
    shortAnswer: "'Exactly one 1 per row, exactly one 1 per column; total ones equal n; total zeros equal n² - n; zero double-booking, zero unassigned tasks!'",
    explanation: "This rule defines the complete structural properties of one-to-one matching.",
    hint: "One 1 per row and column, n total ones, n^2-n zeros.",
    level: "moderate",
    codeExample: "Golden Rule: RowSum=1, ColSum=1, Sum(X)=n, Zeros=n^2-n."
  }
];

export default questions;
