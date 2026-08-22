// topic1_questions.js
// 30 Moderate to Expert Questions on the Assignment Model (LP Formulation & Dual Structure)

const questions = [
  {
    question: "What is the complete algebraic formulation of the standard n x n Assignment Model?",
    shortAnswer: "Minimize Z = Sum_{i=1}^n Sum_{j=1}^n (c_ij * x_ij) subject to: 1. Sum_{j=1}^n x_ij = 1 (for all i=1..n); 2. Sum_{i=1}^n x_ij = 1 (for all j=1..n); 3. x_ij in {0, 1}.",
    explanation: "This linear integer model guarantees that each resource i performs exactly one task, and each task j is performed by exactly one resource at minimal total cost.",
    hint: "Min Z = sum c_ij x_ij with row sum = 1, col sum = 1, and binary x_ij.",
    level: "moderate",
    codeExample: "min sum_{i,j} c_ij x_ij s.t. sum_j x_ij = 1 (forall i), sum_i x_ij = 1 (forall j), x_ij in {0,1}"
  },
  {
    question: "How many decision variables and constraints exist in an n x n Assignment LP model?",
    shortAnswer: "n^2 decision variables (x_11 to x_nn) and 2n functional constraints (n row constraints + n column constraints).",
    explanation: "For a 4x4 matrix, there are 16 decision variables and 8 functional constraints.",
    hint: "n^2 variables and 2n constraints.",
    level: "moderate",
    codeExample: "Variables = n^2; Functional Constraints = 2n."
  },
  {
    question: "What is Total Unimodularity (TUM) and why is it fundamental to the Assignment Model?",
    shortAnswer: "A constraint matrix A is Totally Unimodular if every square submatrix has determinant 0, +1, or -1. For assignment problems, TUM guarantees that every basic feasible solution (extreme point) of the continuous LP relaxation is automatically pure integer (x_ij in {0, 1}).",
    explanation: "TUM eliminates the need for expensive branch-and-bound integer programming solvers.",
    hint: "Determinants are 0, +1, -1; guarantees pure integer solutions from continuous LP.",
    level: "expert",
    codeExample: "Property: TUM(A) => Optimal vertices of LP relaxation {x | Ax=b, x>=0} are in {0, 1}^(n^2)."
  },
  {
    question: "What is the Dual LP Problem corresponding to the Primal Assignment Model?",
    shortAnswer: "Maximize W = Sum_{i=1}^n u_i + Sum_{j=1}^n v_j subject to u_i + v_j <= c_ij (for all i, j), where u_i and v_j are unrestricted in sign.",
    explanation: "The dual variables u_i and v_j represent row and column potential reductions.",
    hint: "Max W = sum u_i + sum v_j subject to u_i + v_j <= c_ij.",
    level: "expert",
    codeExample: "Dual: max sum(u) + sum(v) s.t. u_i + v_j <= c_ij (forall i, j)."
  },
  {
    question: "How does the Hungarian Method relate to the Dual LP of the Assignment Problem?",
    shortAnswer: "The Hungarian Method is a Primal-Dual algorithm that maintains dual feasibility (u_i + v_j <= c_ij) by subtracting row/column minimums and searches for a primal solution satisfying Complementary Slackness (x_ij > 0 => u_i + v_j = c_ij).",
    explanation: "Zero cells in the reduced matrix correspond to tight dual constraints (c_ij - u_i - v_j = 0).",
    hint: "Primal-Dual method maintaining dual feasibility while finding primal matching.",
    level: "expert",
    codeExample: "Complementary Slackness: x_ij * (c_ij - u_i - v_j) = 0."
  },
  {
    question: "Suppose Debangshu in Barrackpore formulates a 4x4 foundry supervisor assignment model. How many decision variables and constraints does his model have?",
    shortAnswer: "16 decision variables (4^2 = 16) and 8 functional constraints (4 row + 4 col).",
    explanation: "4x4 matrix = 16 variables and 8 constraints.",
    hint: "16 variables, 8 constraints.",
    level: "moderate",
    codeExample: "Vars = 4*4 = 16; Constraints = 4 + 4 = 8."
  },
  {
    question: "What does the constraint Sum_{j=1}^n x_3j = 1 physically enforce?",
    shortAnswer: "It enforces that Resource 3 (Worker 3) is allocated to exactly one task among the n available tasks.",
    explanation: "Prevents Worker 3 from being assigned to multiple tasks or being left unassigned.",
    hint: "Resource 3 performs exactly 1 task.",
    level: "moderate",
    codeExample: "Row 3 constraint: x_31 + x_32 + ... + x_3n = 1."
  },
  {
    question: "What does the constraint Sum_{i=1}^n x_i2 = 1 physically enforce?",
    shortAnswer: "It enforces that Task 2 is performed by exactly one worker among the n available workers.",
    explanation: "Prevents Task 2 from being performed by multiple workers or neglected.",
    hint: "Task 2 is executed by exactly 1 worker.",
    level: "moderate",
    codeExample: "Col 2 constraint: x_12 + x_22 + ... + x_n2 = 1."
  },
  {
    question: "What is the node-arc incidence matrix of the Assignment Model bipartite graph?",
    shortAnswer: "A (2n x n^2) matrix where each column has exactly TWO non-zero entries: one '+1' in the worker node row and one '+1' in the task node row.",
    explanation: "This specific structure is what makes the matrix Totally Unimodular.",
    hint: "Each column has exactly two +1s representing an edge from worker to task.",
    level: "expert",
    codeExample: "Incidence Column for (i, j): has 1 at row i and 1 at row (n + j)."
  },
  {
    question: "Suppose Susmita in Ichapur assigns 3 hospital nurses to 3 clinic shifts. If the cost matrix C = [[10, 15, 20], [12, 10, 18], [15, 14, 11]], what is the objective function?",
    shortAnswer: "Minimize Z = 10x_11 + 15x_12 + 20x_13 + 12x_21 + 10x_22 + 18x_23 + 15x_31 + 14x_32 + 11x_33.",
    explanation: "The objective function sums all c_ij * x_ij terms across the 9 cells.",
    hint: "Sum-product of all 9 matrix rates and their respective decision variables.",
    level: "moderate",
    codeExample: "Z = 10x11 + 15x12 + 20x13 + 12x21 + 10x22 + 18x23 + 15x31 + 14x32 + 11x33"
  },
  {
    question: "What happens if we relax the binary restriction x_ij in {0, 1} to continuous 0 <= x_ij <= 1?",
    shortAnswer: "The optimal objective value and optimal solution remain 100% IDENTICAL and pure binary integers, because the extreme points of the continuous polytope are all integer vertices.",
    explanation: "By the Birkhoff-von Neumann Theorem, the polytope of doubly stochastic matrices has permutation matrices as its extreme points.",
    hint: "Permutation matrices are the extreme points; continuous LP gives exact integer solution.",
    level: "expert",
    codeExample: "Birkhoff-von Neumann: Extreme points of doubly stochastic polytope are Permutation Matrices."
  },
  {
    question: "What is a 'Doubly Stochastic Matrix' in the context of the Assignment Model?",
    shortAnswer: "A square matrix of non-negative real numbers where every row sum equals 1 and every column sum equals 1.",
    explanation: "The feasible region of the continuous LP relaxation is the set of all n x n doubly stochastic matrices.",
    hint: "Square non-negative matrix with all row sums = 1 and all column sums = 1.",
    level: "expert",
    codeExample: "Doubly Stochastic: X >= 0, X * 1 = 1, 1^T * X = 1^T."
  },
  {
    question: "What is a 'Permutation Matrix'?",
    shortAnswer: "A square binary {0, 1} matrix that has exactly one '1' in each row and each column, with all other entries equal to '0'.",
    explanation: "Every valid basic feasible solution to an n x n assignment problem is a permutation matrix.",
    hint: "Binary matrix with exactly one 1 per row and column.",
    level: "moderate",
    codeExample: "Permutation Matrix: X in {0, 1}^(n x n) and doubly stochastic."
  },
  {
    question: "How does the Strong Duality Theorem apply to the Assignment Model?",
    shortAnswer: "At optimality, the minimum primal cost Z* = Sum c_ij x_ij* exactly equals the maximum dual objective W* = Sum u_i* + Sum v_j*.",
    explanation: "Zero duality gap confirms that the sum of reduced row and column constants equals the total cost savings.",
    hint: "Min Z* = Max W* (Zero Duality Gap).",
    level: "expert",
    codeExample: "Strong Duality: min_x sum(c_ij * x_ij) === max_{u,v} (sum u_i + sum v_j)."
  },
  {
    question: "Suppose Mamata in Kolkata assigns 4 legal assistants to 4 research projects. If the optimal dual potentials are u* = [8, 5, 10, 4] and v* = [2, 6, 3, 7], what is the certified minimum cost Z*?",
    shortAnswer: "Z* = ₹45 ( Sum u_i + Sum v_j = (8+5+10+4) + (2+6+3+7) = 27 + 18 = ₹45 ).",
    explanation: "By Strong Duality, Z* = W* = 27 + 18 = ₹45.",
    hint: "Sum of u plus sum of v = 27 + 18 = 45.",
    level: "moderate",
    codeExample: "Z_opt = sum(u) + sum(v) = 27 + 18 = ₹45"
  },
  {
    question: "What is the economic interpretation of the dual variables u_i and v_j in the Assignment Model?",
    shortAnswer: "u_i represents the economic value (shadow price / reservation wage) of Worker i; v_j represents the economic value (market price / task bonus) of Task j.",
    explanation: "u_i + v_j <= c_ij ensures that no worker-task pairing demands more compensation than the direct cost c_ij.",
    hint: "Shadow prices of resource capacity u_i and task demand v_j.",
    level: "expert",
    codeExample: "Economic Duality: u_i = Worker Shadow Value, v_j = Task Shadow Value."
  },
  {
    question: "Why does an assignment model with n resources and n tasks have 2n functional constraints but rank of the constraint matrix is only 2n - 1?",
    shortAnswer: "Because the sum of all row constraints equals the sum of all column constraints (both equal n), creating exactly one redundant linear dependency.",
    explanation: "Sum_i (Sum_j x_ij) = Sum_j (Sum_i x_ij) = n. Therefore, Rank(A) = 2n - 1.",
    hint: "One constraint is linearly dependent; matrix rank is 2n - 1.",
    level: "expert",
    codeExample: "Rank(Constraint Matrix A) = 2n - 1."
  },
  {
    question: "Suppose Mahima in Barrackpore sets up an assignment model where Worker 1 cannot be assigned to Task 3 due to medical licensing restrictions. How is this constraint represented?",
    shortAnswer: "Either add the explicit linear constraint x_13 = 0, or set c_13 = M (where M is a prohibitively large cost).",
    explanation: "Both approaches prevent Worker 1 from being assigned to Task 3.",
    hint: "Set x_13 = 0 or set cost c_13 = M.",
    level: "intermediate",
    codeExample: "Restricted Assignment: x_13 = 0 or c_13 = Infinity."
  },
  {
    question: "If an assignment model is formulated for profit maximization (e.g. assigning salesmen to territories to maximize total sales), what is the objective function?",
    shortAnswer: "Maximize Z = Sum_{i=1}^n Sum_{j=1}^n (p_ij * x_ij), where p_ij is the expected profit or revenue from assigning resource i to task j.",
    explanation: "Constraints remain identical (Sum_j x_ij = 1, Sum_i x_ij = 1, x_ij in {0, 1}).",
    hint: "Max Z = sum p_ij x_ij subject to standard 1-to-1 constraints.",
    level: "moderate",
    codeExample: "Maximize Z = sum_{i,j} p_ij * x_ij subject to 1-to-1 constraints."
  },
  {
    question: "What is the 'Reduced Cost Matrix' C' in the Assignment Model?",
    shortAnswer: "The matrix C' with entries c_ij' = c_ij - u_i - v_j >= 0, representing the opportunity cost of assigning worker i to task j above the baseline dual shadow prices.",
    explanation: "Zero entries in C' indicate optimal pairing candidates where c_ij = u_i + v_j.",
    hint: "Matrix of reduced costs c_ij' = c_ij - u_i - v_j.",
    level: "expert",
    codeExample: "C_reduced = C - u * 1^T - 1 * v^T."
  },
  {
    question: "How does the Assignment Model enforce that no worker is assigned to two different tasks?",
    shortAnswer: "Via the row constraint Sum_{j=1}^n x_ij = 1 with binary x_ij: since x_ij can only be 0 or 1, exactly ONE entry in row i must be 1 and all other n-1 entries must be 0.",
    explanation: "Prevents multiple 1s in any single row.",
    hint: "Row sum = 1 forces exactly one 1 per row.",
    level: "moderate",
    codeExample: "Row sum = 1 => exactly one x_ij = 1."
  },
  {
    question: "How does the Assignment Model enforce that no task is performed by two different workers?",
    shortAnswer: "Via the column constraint Sum_{i=1}^n x_ij = 1 with binary x_ij: exactly ONE entry in column j must be 1 and all other n-1 entries must be 0.",
    explanation: "Prevents multiple 1s in any single column.",
    hint: "Column sum = 1 forces exactly one 1 per column.",
    level: "moderate",
    codeExample: "Column sum = 1 => exactly one x_ij = 1."
  },
  {
    question: "In the 3x3 model, if x_11 = 1, x_22 = 1, x_33 = 1, what is the permutation matrix X?",
    shortAnswer: "X = [[1, 0, 0], [0, 1, 0], [0, 0, 1]] (the 3x3 Identity Matrix I_3).",
    explanation: "Identity matrix represents the diagonal identity permutation.",
    hint: "The 3x3 Identity Matrix.",
    level: "moderate",
    codeExample: "X = IdentityMatrix(3)"
  },
  {
    question: "In the same 3x3 model, if x_13 = 1, x_22 = 1, x_31 = 1, what is the permutation matrix X?",
    shortAnswer: "X = [[0, 0, 1], [0, 1, 0], [1, 0, 0]] (the counter-diagonal permutation matrix).",
    explanation: "Row 1 has 1 in col 3, Row 2 in col 2, Row 3 in col 1.",
    hint: "[[0, 0, 1], [0, 1, 0], [1, 0, 0]].",
    level: "moderate",
    codeExample: "X = [[0, 0, 1], [0, 1, 0], [1, 0, 0]]"
  },
  {
    question: "Why is the Assignment Problem also called the 'Linear Sum Assignment Problem' (LSAP)?",
    shortAnswer: "To distinguish it from the Quadratic Assignment Problem (QAP) and Non-linear Assignment Problems where costs depend on inter-facility interactions.",
    explanation: "LSAP has a linear objective function Z = Sum c_ij x_ij with independent pairing costs.",
    hint: "Distinguishes it from non-linear and quadratic assignment problems.",
    level: "expert",
    codeExample: "LSAP: Linear objective Z = sum(c_ij * x_ij)."
  },
  {
    question: "Suppose Abhronila in Jadavpur wants to prove that an assignment schedule is globally optimal. What two conditions must she verify?",
    shortAnswer: "1. Primal Feasibility: X is a valid permutation matrix (1-to-1 matching); 2. Dual Feasibility: All reduced costs c_ij - u_i - v_j >= 0, and all assigned cells have c_ij = u_i + v_j.",
    explanation: "Satisfies primal feasibility, dual feasibility, and complementary slackness.",
    hint: "Permutation matrix + Complementary Slackness (assigned cells on zeros).",
    level: "expert",
    codeExample: "Optimality Certificate: isPermutation(X) && all(c_ij - u_i - v_j >= 0) && (x_ij=1 => c_ij=u_i+v_j)."
  },
  {
    question: "What is the relationship between the Assignment Model and bipartite matching in graph theory?",
    shortAnswer: "The Assignment Model is the minimum-weight perfect matching problem on a complete weighted bipartite graph K_{n,n}.",
    explanation: "The n resources and n tasks form the two independent vertex sets.",
    hint: "Min-weight perfect matching on complete bipartite graph K_{n,n}.",
    level: "expert",
    codeExample: "Graph Model: Min-Weight Perfect Matching on K_{n,n}."
  },
  {
    question: "Why does every assignment cost must be stated in Indian Rupees (₹) for West Bengal enterprise models?",
    shortAnswer: "To adhere to standard regional accounting and financial reporting standards.",
    explanation: "Indian Rupee (₹) is the required currency standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Standard: 'Total Cost Z* = ₹45'."
  },
  {
    question: "What is the ultimate golden rule of the Assignment Model?",
    shortAnswer: "'Formulate n^2 binary variables with 2n 1-to-1 constraints; leverage Total Unimodularity to solve as a continuous linear program; apply the Hungarian dual reduction to extract the optimal permutation matrix!'",
    explanation: "This complete rule captures the entire mathematical architecture of the assignment model.",
    hint: "n^2 binary variables -> 2n constraints -> TUM -> Hungarian dual reduction.",
    level: "moderate",
    codeExample: "Golden Rule: n^2 Vars + 2n Constraints + TUM + Hungarian Duality = Optimal Permutation."
  }
];

export default questions;
