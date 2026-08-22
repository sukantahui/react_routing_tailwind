// topic7_questions.js
// 30 Moderate to Expert Questions on Degeneracy Considerations in Vogel's Approximation Method (VAM)

const questions = [
  {
    question: "What is the formal mathematical definition of 'Degeneracy' in a transportation problem?",
    shortAnswer: "A basic feasible solution is degenerate if the total number of allocated (basic) cells is strictly LESS than m + n - 1, or if one or more basic variables have an allocated value of zero (x_ij = 0).",
    explanation: "An m x n transportation tableau requires exactly m + n - 1 linearly independent basic variables to calculate unique dual multipliers (u_i, v_j) for optimality testing. When fewer than m + n - 1 basic cells exist, the system of equations becomes underdetermined.",
    hint: "Basic allocations count < m + n - 1.",
    level: "moderate",
    codeExample: "Degeneracy Condition: Count(Basic Cells) < m + n - 1"
  },
  {
    question: "What is the primary cause of degeneracy during the execution of Vogel's Approximation Method?",
    shortAnswer: "Simultaneous exhaustion of a supply row and a demand column (S_k = D_l) in a single allocation step.",
    explanation: "When remaining supply S_k exactly equals remaining demand D_l, allocating x_kl = S_k satisfies both constraints at once. If the allocator crosses out both row k and column l simultaneously, two lines are eliminated with only one allocation, resulting in a deficit of one basic variable.",
    hint: "Supply and demand reaching zero at the same instant.",
    level: "moderate",
    codeExample: "if (S_k === D_l) { /* Simultaneous zero triggers degeneracy if both crossed */ }"
  },
  {
    question: "What is the 'Subset Rim Condition' that mathematically predicts whether degeneracy will occur before running VAM?",
    shortAnswer: "Degeneracy occurs if and only if the sum of supplies for a proper subset of origins equals the sum of demands for a proper subset of destinations: Sum_{i in I} S_i = Sum_{j in J} D_j where I subset of {1..m} and J subset of {1..n}.",
    explanation: "This partial balance divides the transportation network into isolated closed sub-problems, causing an intermediate allocation to satisfy both a row and column simultaneously.",
    hint: "A sub-group of supplies equals a sub-group of demands.",
    level: "expert",
    codeExample: "Rim Condition: exists I subset {1..m}, J subset {1..n} such that sum_{i in I} S_i == sum_{j in J} D_j."
  },
  {
    question: "How does the 'Epsilon (ε) Perturbation Technique' resolve degeneracy in a transportation tableau?",
    shortAnswer: "By assigning an infinitesimally small positive quantity epsilon (ε > 0) to an independent non-basic cell, restoring the total basic cell count to m + n - 1.",
    explanation: "Epsilon (ε) is treated as a very small quantity (ε -> 0) that occupies a cell without affecting capacity sums (S_i + ε ≈ S_i) or total cost (Z + c_ij * ε ≈ Z), while allowing dual potentials u_i + v_j = c_ij to be solved uniquely.",
    hint: "Place a tiny ε in an independent cell to reach m + n - 1.",
    level: "expert",
    codeExample: "Allocate x_ij = ε (where ε > 0, ε -> 0); Basic Count restored to m + n - 1."
  },
  {
    question: "Where should the epsilon (ε) be placed in the tableau to ensure it is mathematically valid?",
    shortAnswer: "In an unallocated cell that does NOT form a closed loop with the existing basic cells, preferably in a cell with the lowest unit transportation cost.",
    explanation: "Placing ε in a cell that forms a closed loop violates linear independence. Choosing a loop-free, lowest-cost cell keeps the basis valid and economically sound.",
    hint: "Must be loop-free (independent) and preferably cheap.",
    level: "expert",
    codeExample: "Valid ε placement: isAcyclic(BasicCells + {(i, j)}) === true."
  },
  {
    question: "Why is degeneracy a critical problem if we wish to apply the MODI (Modified Distribution) optimality test?",
    shortAnswer: "Because without m + n - 1 basic cells, the system of equations u_i + v_j = c_ij has more unknowns (m + n) than equations (count < m + n - 1), making it impossible to determine unique u_i and v_j values.",
    explanation: "MODI requires setting one multiplier (e.g. u_1 = 0) and solving for all remaining m + n - 1 variables. If fewer than m + n - 1 basic equations exist, some u_i or v_j cannot be computed.",
    hint: "Cannot solve for all shadow prices u_i and v_j.",
    level: "expert",
    codeExample: "Equations: u_i + v_j = c_ij. If count < m + n - 1, system is unsolvable."
  },
  {
    question: "Suppose Debangshu in Barrackpore has a 3 x 4 problem and obtains 5 allocations after running VAM. Is the solution degenerate? How many basic cells are needed?",
    shortAnswer: "Yes, it is degenerate. A 3 x 4 problem requires 3 + 4 - 1 = 6 basic cells. Exactly 1 epsilon (ε) allocation is needed.",
    explanation: "Required basis count = 3 + 4 - 1 = 6. Since only 5 cells are allocated, adding 1 epsilon restores non-degeneracy.",
    hint: "6 - 5 = 1 epsilon needed.",
    level: "moderate",
    codeExample: "Required = 6; Actual = 5 -> Deficit = 1 epsilon (ε)."
  },
  {
    question: "How can a student prevent degeneracy from occurring during the VAM procedure when S_k = D_l?",
    shortAnswer: "Cross out ONLY ONE line (e.g. Row k) and leave the other line (Column l) active with a remaining balance of 0, then allocate 0 to an independent cell in that column in the next pass.",
    explanation: "This simple proactive operational rule ensures that m + n - 1 allocations are generated naturally during the table passes.",
    hint: "Never cross out both row and column simultaneously.",
    level: "intermediate",
    codeExample: "Rule: If S_k == D_l, cross Row k; set D_l = 0; allocate 0 in Col l next pass."
  },
  {
    question: "What is the difference between 'Initial Degeneracy' and 'Intermediate Degeneracy'?",
    shortAnswer: "Initial degeneracy occurs during the construction of the IBFS (e.g. during VAM); intermediate degeneracy occurs during MODI simplex pivoting when multiple basic variables reach zero simultaneously.",
    explanation: "Initial degeneracy arises from rim subset balances in the original data. Intermediate degeneracy occurs during loop adjustments when more than one negative cell ties for the theta reduction amount.",
    hint: "Occurs during initial setup vs occurs during iterative optimization.",
    level: "expert",
    codeExample: "Initial = during IBFS heuristic; Intermediate = during MODI loop pivot."
  },
  {
    question: "Does the addition of epsilon (ε) change the numerical value of the total initial transportation cost Z?",
    shortAnswer: "No, because ε is infinitesimally small (ε -> 0), so c_ij * ε is effectively zero in real financial terms.",
    explanation: "Total cost remains Z = sum (c_ij * x_ij) for real shipments. Epsilon serves purely as a mathematical device to maintain rank.",
    hint: "Limit as ε approaches 0 yields 0 cost contribution.",
    level: "moderate",
    codeExample: "lim_{ε -> 0} (Z + c_ij * ε) = Z"
  },
  {
    question: "Suppose Mamata in Kolkata places ε in cell (1, 3). If cell (1, 3) has unit cost ₹8, what is its cost contribution in linear equations?",
    shortAnswer: "It acts as a basic cell with equation u_1 + v_3 = 8, contributing ₹0 to the practical freight bill.",
    explanation: "For calculating dual variables, cell (1, 3) provides the exact equality u_1 + v_3 = ₹8, enabling solution of the potential network.",
    hint: "Provides equation u_1 + v_3 = 8 for dual solving.",
    level: "expert",
    codeExample: "Dual equation: u_1 + v_3 = 8; Objective contribution: 8 * ε ≈ ₹0."
  },
  {
    question: "What happens if an operations researcher accidentally places ε in a cell that forms a closed loop with existing basic cells?",
    shortAnswer: "The basis becomes linearly dependent and singular; computing u_i and v_j will produce contradictory equations (inconsistency).",
    explanation: "A closed loop creates redundant equations that cannot uniquely fix all multipliers, breaking the MODI routine.",
    hint: "A closed loop causes contradictory dual equations.",
    level: "expert",
    codeExample: "Loop violation: Contradiction u_i + v_j != c_ij across the loop."
  },
  {
    question: "How can Susmita in Ichapur verify that an unallocated cell does NOT form a closed loop before assigning ε to it?",
    shortAnswer: "By attempting to trace a horizontal-vertical rectangular path through existing basic cells that returns to the candidate cell; if no such closed polygon can be formed, the cell is independent.",
    explanation: "The stepping-stone loop test checks whether the candidate cell can close a cycle with existing basic entries.",
    hint: "Test whether a stepping-stone loop can be drawn.",
    level: "intermediate",
    codeExample: "if (hasClosedLoop(candidate_cell, basic_cells)) { reject(); } else { placeEpsilon(); }"
  },
  {
    question: "In a 2 x 3 problem, how many basic cells are required?",
    shortAnswer: "4 basic cells (2 + 3 - 1 = 4).",
    explanation: "m + n - 1 = 2 + 3 - 1 = 4.",
    hint: "2 + 3 - 1 = 4.",
    level: "moderate",
    codeExample: "Basis Count = 2 + 3 - 1 = 4"
  },
  {
    question: "If a 2 x 3 problem has allocations at (1,1)=50, (1,2)=30, (2,3)=40, is it degenerate?",
    shortAnswer: "Yes, because only 3 cells are allocated (needed 4). One epsilon (ε) must be placed in a loop-free cell.",
    explanation: "Count of basic cells is 3 < 4. Adding ε to an independent cell like (2, 2) or (2, 1) restores the basis count to 4.",
    hint: "3 cells < 4 required cells -> Degenerate.",
    level: "moderate",
    codeExample: "Count = 3 < 4 -> Degenerate. Add 1 ε."
  },
  {
    question: "Can degeneracy cause an optimization algorithm to get trapped in an infinite cycle (cycling)?",
    shortAnswer: "In theoretical linear programming, yes (pivoting without changing the objective value); in manual transportation problems, cycling is extremely rare and prevented by Bland's rule or perturbation.",
    explanation: "Degeneracy means a pivot can enter the basis with theta = 0, leaving Z unchanged. Proper epsilon placement guarantees termination.",
    hint: "Degeneracy can cause zero-progress pivots in LP theory.",
    level: "expert",
    codeExample: "Zero-Theta Pivot: Basis changes, Z remains identical."
  },
  {
    question: "Suppose Mahima in Barrackpore has supplies [30, 70] and demands [30, 40, 30]. Why is degeneracy guaranteed here?",
    shortAnswer: "Because the supply of S1 (30) exactly equals the demand of D1 (30), fulfilling the subset rim condition S_1 = D_1.",
    explanation: "When allocating to cell (1, 1), 30 units satisfies both Row 1 and Column 1 at the same time, triggering simultaneous zero balances.",
    hint: "S1 = 30 and D1 = 30 -> Subset rim condition.",
    level: "expert",
    codeExample: "S_1 = 30 === D_1 = 30 -> Sub-problem isolates immediately."
  },
  {
    question: "How should Mahima resolve the simultaneous zero in the above problem during Pass 1?",
    shortAnswer: "Allocate x_11 = 30; cross out Row 1; write D_1 = 0 in Column 1 (keeping Col 1 active); in Pass 2, allocate 0 to cell (2, 1) @ rate c_21.",
    explanation: "This creates the 4 required basic cells: x_11=30, x_21=0, x_22=40, x_23=30.",
    hint: "Allocate 30 to (1, 1), cross Row 1, and allocate 0 to (2, 1).",
    level: "expert",
    codeExample: "Allocations: x_11=30, x_21=0, x_22=40, x_23=30 (Total 4 basic cells)."
  },
  {
    question: "What is the basis count of Mahima's resolved solution above?",
    shortAnswer: "Exactly 4 basic cells (matches m + n - 1 = 2 + 3 - 1 = 4).",
    explanation: "The explicit zero allocation x_21 = 0 counts as a valid basic variable, ensuring full non-degeneracy.",
    hint: "4 basic cells including the 0 allocation.",
    level: "moderate",
    codeExample: "4 basic cells >= 4 -> Non-degenerate."
  },
  {
    question: "Why do computer linear programming solvers (like CPLEX, Gurobi, or SciPy) handle degeneracy automatically?",
    shortAnswer: "They maintain sparse basis factorization and use lexicographic or symbolic perturbation to handle zero-basic variables without human intervention.",
    explanation: "Enterprise solvers track matrix rank directly in sparse LU matrices, treating degenerate basic variables as standard basis indices.",
    hint: "Solvers track basis indices algebraically.",
    level: "expert",
    codeExample: "Solver implementation: basis_status[i][j] = BASIC regardless of x[i][j] == 0."
  },
  {
    question: "If Abhronila in Jadavpur has a 3 x 3 problem with 4 allocations, how many epsilons must she place?",
    shortAnswer: "1 epsilon (3 + 3 - 1 = 5 required; 5 - 4 = 1).",
    explanation: "A 3 x 3 matrix requires 5 basic variables. 4 allocations leaves a deficit of 1.",
    hint: "5 - 4 = 1.",
    level: "moderate",
    codeExample: "Deficit = 5 - 4 = 1 epsilon."
  },
  {
    question: "If a 4 x 4 problem has only 4 allocations, how many epsilons are needed?",
    shortAnswer: "3 epsilons (4 + 4 - 1 = 7 required; 7 - 4 = 3).",
    explanation: "A 4 x 4 matrix requires 7 basic variables. Having only 4 allocations requires adding 3 separate loop-free epsilons.",
    hint: "7 - 4 = 3.",
    level: "moderate",
    codeExample: "Deficit = 7 - 4 = 3 epsilons."
  },
  {
    question: "What is the priority rule for choosing among multiple candidate cells when placing epsilon (ε)?",
    shortAnswer: "Select the unallocated cell that: (1) does not form a closed loop, and (2) has the lowest unit cost min(c_ij) among all independent options.",
    explanation: "Prioritizing the cheapest independent cell minimizes potential shadow price distortion in the initial dual basis.",
    hint: "Choose the cheapest loop-free cell.",
    level: "intermediate",
    codeExample: "Place ε at argmin { c_ij | (i,j) is loop-free }."
  },
  {
    question: "In stepping-stone loop evaluation, how is an epsilon cell treated during addition and subtraction?",
    shortAnswer: "It is treated like any standard basic variable: if θ is subtracted from an ε cell, the maximum allowable transfer is θ = ε, causing ε to leave the basis.",
    explanation: "Epsilon behaves algebraically as a positive quantity: ε - ε = 0, allowing basis pivoting to proceed normally.",
    hint: "Epsilon is a valid basic variable with value ε.",
    level: "expert",
    codeExample: "Pivot: x_out = ε -> cell becomes non-basic."
  },
  {
    question: "Can an unbalanced problem experience degeneracy?",
    shortAnswer: "Yes, if the capacity of any real origin or dummy origin equals the requirement of any real destination or dummy destination, degeneracy can occur.",
    explanation: "Degeneracy depends solely on numerical subset sums in the augmented constraint matrix.",
    hint: "Subset rim conditions apply to augmented matrices as well.",
    level: "moderate",
    codeExample: "Degeneracy occurs in balanced and unbalanced problems alike."
  },
  {
    question: "Why should students always count the allocated cells immediately after finishing VAM?",
    shortAnswer: "To catch degeneracy immediately before beginning MODI multiplier calculations, saving time and preventing unsolvable equation systems.",
    explanation: "Counting basic cells takes 5 seconds and prevents getting stuck halfway through MODI.",
    hint: "Count basic cells before starting MODI.",
    level: "intermediate",
    codeExample: "Check: len(allocated_cells) === m + n - 1."
  },
  {
    question: "Suppose Debangshu finds that cells (1,1), (1,2), (2,1), (2,2) are all allocated. Is this basis valid?",
    shortAnswer: "No, because these 4 cells form a closed 2x2 rectangular loop ( (1,1) -> (1,2) -> (2,2) -> (2,1) -> (1,1) ), violating linear independence.",
    explanation: "A closed loop means one variable is linearly dependent on the other three; the basis is invalid.",
    hint: "Four corner cells of a rectangle form a closed loop.",
    level: "expert",
    codeExample: "Loop detected: (1,1) - (1,2) - (2,2) - (2,1) - (1,1) -> Basis is dependent."
  },
  {
    question: "How does VAM naturally prevent forming a loop during its normal execution?",
    shortAnswer: "Because each allocation eliminates at least one active row or column, ensuring no closed cycle can ever be formed among the basic variables.",
    explanation: "Eliminating an unvisited vertex at each step preserves the tree property on the bipartite graph.",
    hint: "Pruning a line at each step preserves tree structure.",
    level: "expert",
    codeExample: "Graph property: Tree with m + n vertices has m + n - 1 edges and no cycles."
  },
  {
    question: "What is the physical interpretation of an explicit 0 allocation (x_ij = 0) in an actual freight distribution network?",
    shortAnswer: "It represents a designated, pre-approved logistical shipping route that is officially part of the dispatch basis but carries zero physical volume in the current period.",
    explanation: "In network operations, basic 0 routes are active contract links maintained for network connectivity without moving cargo.",
    hint: "An active contractual route carrying 0 tons.",
    level: "intermediate",
    codeExample: "Contract lane established with zero dispatched tonnage."
  },
  {
    question: "What is the ultimate rule for handling degeneracy in operations research exams and industry practice?",
    shortAnswer: "'Always verify Basis Count = m + n - 1; if degenerate, place epsilon (ε) in a loop-free, lowest-cost cell before calculating u_i and v_j!'",
    explanation: "This rule guarantees seamless transition from initial VAM solutions to formal MODI optimality proofs.",
    hint: "Verify count -> Add ε to cheapest loop-free cell -> Proceed to MODI.",
    level: "moderate",
    codeExample: "Golden Rule: Check m + n - 1 -> Add ε if needed -> Compute MODI."
  }
];

export default questions;
