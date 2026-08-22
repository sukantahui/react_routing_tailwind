// topic3_questions.js
// 30 Moderate to Expert Questions on Allocation Procedure

const questions = [
  {
    question: "What is the exact mathematical rule for determining the allocation quantity x_kl to the selected cell (k, l)?",
    shortAnswer: "x_kl = min(S_k, D_l), where S_k is the remaining supply at origin k and D_l is the remaining demand at destination l.",
    explanation: "Linear programming requires that allocations respect both origin capacity (x_kl ≤ S_k) and destination requirement (x_kl ≤ D_l). Taking the minimum of these two quantities ensures that the maximum permissible amount is shipped without causing stock deficit or destination oversupply.",
    hint: "Take the smaller of origin stock and destination demand.",
    level: "basic",
    codeExample: "x_kl = Math.min(supply[k], demand[l]);"
  },
  {
    question: "Why is an allocation x_kl strictly forbidden from exceeding min(S_k, D_l)?",
    shortAnswer: "Allocating more than min(S_k, D_l) results in negative remaining supply or demand, violating the non-negativity constraint x_ij ≥ 0.",
    explanation: "If x_kl > S_k, remaining supply S_k - x_kl < 0 (a factory would ship ghost inventory it doesn't have). If x_kl > D_l, remaining demand D_l - x_kl < 0 (a destination would receive unwanted excess). Both violate linear programming feasibility.",
    hint: "A warehouse cannot deliver goods that do not exist.",
    level: "basic",
    codeExample: "Constraint check: x_kl <= S[k] && x_kl <= D[l]"
  },
  {
    question: "What happens if an analyst allocates less than min(S_k, D_l) to the chosen cell (k, l)?",
    shortAnswer: "Neither row k nor column l is eliminated, resulting in an incomplete basis and violating the Basic Feasible Solution (BFS) property.",
    explanation: "If x_kl < min(S_k, D_l), both S_k' > 0 and D_l' > 0 remain active. This fails to eliminate either the row or the column, creating unnecessary extra allocations and preventing the formation of an exact m + n - 1 spanning tree basis.",
    hint: "You must fully exhaust at least one line (supply or demand) at every allocation step.",
    level: "intermediate",
    codeExample: "Allocating x_kl < min(S_k, D_l) ⇒ rowActive[k] = true AND colActive[l] = true (Incomplete step)."
  },
  {
    question: "In terms of linear programming duality, how does the allocation x_kl affect the objective function value Z?",
    shortAnswer: "It increases the total freight expenditure by exactly c_kl · x_kl.",
    explanation: "The total cost function is linear: Z = ∑ ∑ c_ij x_ij. When cell (k, l) with unit rate c_kl is allocated x_kl units, the incremental contribution to total logistics cost is ΔZ = c_kl · x_kl in ₹.",
    hint: "Multiply allocated physical units by the unit freight cost in ₹.",
    level: "basic",
    codeExample: "Z_new = Z_old + (c[k][l] * x_kl);"
  },
  {
    question: "What are the three possible capacity outcomes when allocating x_kl = min(S_k, D_l)?",
    shortAnswer: "Case 1: S_k < D_l (Row k exhausted); Case 2: S_k > D_l (Column l satisfied); Case 3: S_k = D_l (Simultaneous exhaustion / Degeneracy).",
    explanation: "In Case 1, origin k runs out of stock, eliminating Row k. In Case 2, destination l receives all required units, eliminating Column l. In Case 3, both reach 0 simultaneously, requiring a basic zero (ε) allocation to prevent degeneracy.",
    hint: "Compare S_k and D_l: strictly less, strictly greater, or exactly equal.",
    level: "intermediate",
    codeExample: "if (S[k] < D[l]) { ... } else if (S[k] > D[l]) { ... } else { ... /* Degeneracy */ }"
  },
  {
    question: "How does the allocation procedure preserve the acyclic (tree) structure of the transportation network graph?",
    shortAnswer: "By immediately closing the exhausted origin or destination node, preventing subsequent allocations from forming a closed cycle with that node.",
    explanation: "A cycle in bipartite graph representation requires visiting a node through an incoming edge and exiting through an outgoing edge. Since an eliminated node has 0 remaining capacity and receives no further incident allocations, no cycle can be closed.",
    hint: "Closing a door behind you ensures you can never loop back through that room.",
    level: "expert",
    codeExample: "Graph property: Number of edges = m + n - 1; No cycles exist ⇒ Spanning Tree."
  },
  {
    question: "Suppose Susmita allocates 50 oxygen cylinders at ₹5/unit from Barrackpore to Ichapur. What is the exact state change in the tableau?",
    shortAnswer: "x_Barrackpore,Ichapur = 50; S_Barrackpore decreases by 50; D_Ichapur decreases by 50; total cost Z increases by ₹250.",
    explanation: "Allocation records the decision variable x_22 = 50. The origin inventory is decremented: S_2' = S_2 - 50. The destination requirement is decremented: D_2' = D_2 - 50. The financial ledger adds 50 × ₹5 = ₹250.",
    hint: "Update decision variable, origin supply, destination demand, and total cost.",
    level: "basic",
    codeExample: "x[2][2] = 50; S[2] -= 50; D[2] -= 50; totalCost += 50 * 5;"
  },
  {
    question: "Why is the allocation operator in Matrix Minima considered 'greedy and non-backtracking'?",
    shortAnswer: "Once an allocation x_kl is committed to cell (k, l), it is permanently fixed during the IBFS phase and cannot be modified until the post-IBFS MODI optimization phase.",
    explanation: "Greedy constructive algorithms do not maintain a rollback stack or lookahead tree. Every assignment is final for the starting solution, which keeps time complexity low while ensuring feasibility.",
    hint: "Decisions are locked in immediately without reconsidering past steps.",
    level: "intermediate",
    codeExample: "Constructive greedy heuristic: Commit allocation → Update state → Move forward."
  },
  {
    question: "How is an allocation recorded in a standard mathematical tableau versus in software memory?",
    shortAnswer: "In a manual tableau, the allocated quantity is circled or boxed in the cell center; in software, it is written to a 2D matrix array `X[m][n]`.",
    explanation: "Circling the quantity on paper distinguishes the assigned shipment volume from the unit cost printed in the upper corner. In code, `X[k][l] = alloc` stores the variable in memory.",
    hint: "Visual circles on paper map to numeric matrix entries in code.",
    level: "basic",
    codeExample: "tableau[k][l] = { cost: 4, alloc: 50 };"
  },
  {
    question: "What is the impact on the allocation procedure when the transportation problem is unbalanced (Total Supply ≠ Total Demand)?",
    shortAnswer: "Allocations cannot proceed correctly until a dummy row or column with ₹0 unit cost is added to equalize total supply and demand.",
    explanation: "If Σ S_i ≠ Σ D_j, the algorithm would reach a point where either supply remains with no open demand or demand remains with no open supply, causing the termination check to fail. Adding a dummy balances the flow equation.",
    hint: "Equalize the ledger with virtual capacity before starting allocations.",
    level: "intermediate",
    codeExample: "assert(supplies.reduce(sum) === demands.reduce(sum));"
  },
  {
    question: "How does the allocation procedure handle a situation where an active cell has a unit cost of ₹0 in a dummy column?",
    shortAnswer: "It allocates x_i,dummy = min(S_i, D_dummy) normally, effectively assigning unallocated physical inventory to stay at Origin i.",
    explanation: "The allocation mechanics are identical regardless of cost value. Allocating to a dummy column with ₹0 cost means that factory i will retain that quantity in local storage rather than shipping it.",
    hint: "Zero-cost allocation means surplus stock remains at the factory gate.",
    level: "intermediate",
    codeExample: "x[i][dummy] = min(S[i], D_dummy); // Goods stay in warehouse i at ₹0 shipping cost."
  },
  {
    question: "What is the total number of allocation steps required to construct a full Initial Basic Feasible Solution?",
    shortAnswer: "At most m + n - 1 allocation steps for an m × n matrix.",
    explanation: "Each allocation eliminates at least one row or column. Since there are m rows and n columns, and the final step satisfies the last row and column simultaneously, exactly m + n - 1 distinct allocation decisions are made.",
    hint: "Count total line eliminations: m + n - 1.",
    level: "basic",
    codeExample: "Number of basic variables = m + n - 1."
  },
  {
    question: "What diagnostic condition proves that an allocation procedure was executed with 100% mathematical validity?",
    shortAnswer: "1) All x_ij ≥ 0; 2) For all i, ∑_j x_ij = S_i; 3) For all j, ∑_i x_ij = D_j; 4) Total allocated cells = m + n - 1 with no cycles.",
    explanation: "These four conditions verify non-negativity, exact supply conservation, exact demand satisfaction, and non-degenerate basic spanning tree structure.",
    hint: "Check non-negativity, row sums, column sums, and basic cell count.",
    level: "intermediate",
    codeExample: "validateSolution(X, supplies, demands, m, n);"
  },
  {
    question: "When S_k = D_l, why is it necessary to assign an infinitesimal zero allocation (ε) during the allocation procedure?",
    shortAnswer: "To maintain the mandatory basic variable count of m + n - 1 for MODI optimality multipliers (u_i + v_j = c_ij).",
    explanation: "If both lines are crossed out without placing an ε in an independent cell, the basis contains only m + n - 2 variables, which makes it impossible to solve the system of dual equations u_i + v_j = c_ij.",
    hint: "Epsilon acts as a mathematical bridge to prevent matrix rank deficiency.",
    level: "expert",
    codeExample: "if (S[k] === D[l]) allocateEpsilon(independentCell);"
  },
  {
    question: "In Debangshu's fasteners distribution, if Barrackpore has 50 tons and Kolkata demands 40 tons, what is the allocated quantity and remaining capacity?",
    shortAnswer: "Allocate x_11 = 40 tons; Barrackpore remaining supply = 10 tons; Kolkata remaining demand = 0 tons (Satisfied).",
    explanation: "x_11 = min(50, 40) = 40 tons. Kolkata demand is fully met (40 - 40 = 0) and eliminated. Barrackpore has 50 - 40 = 10 tons left for other destinations.",
    hint: "min(50, 40) = 40; subtract 40 from 50 and 40.",
    level: "basic",
    codeExample: "x[1][1] = 40; S[1] = 10; D[1] = 0;"
  },
  {
    question: "If Mamata allocates 60 crates from Kolkata to Jadavpur at ₹2/crate, what is the exact cost contribution to Z?",
    shortAnswer: "₹120 (60 crates × ₹2/crate = ₹120).",
    explanation: "The contribution to total cost is the product of assigned units and unit freight rate: 60 × ₹2 = ₹120.",
    hint: "Multiply 60 crates by ₹2.",
    level: "basic",
    codeExample: "cost_contribution = 60 * 2 = 120;"
  },
  {
    question: "How does the allocation procedure ensure that intermediate allocations never produce floating-point rounding errors?",
    shortAnswer: "Because integer inputs (S_i, D_j ∈ ℤ) processed with integer min() and subtraction (-) operations strictly yield integer allocations.",
    explanation: "Transportation problems with integer supplies and demands exhibit the Total Unimodularity property, guaranteeing that all basic solutions are strictly integer-valued without floating-point artifacts.",
    hint: "Operations on whole numbers always stay whole numbers.",
    level: "intermediate",
    codeExample: "Number.isInteger(x_ij) === true for all i, j."
  },
  {
    question: "Can an allocation step be executed on a cell that already has an existing allocation from an earlier step?",
    shortAnswer: "No, because once a cell is allocated, either its row or its column is immediately eliminated, preventing any further allocation to that specific cell.",
    explanation: "Each cell (i, j) can receive an allocation at most once. Once assigned, either origin i has S_i = 0 or destination j has D_j = 0, permanently closing the cell.",
    hint: "Every matrix cell is allocated at most once during the construction of an IBFS.",
    level: "intermediate",
    codeExample: "assert(allocationHistory.filter(a => a.r === k && a.c === l).length === 1);"
  },
  {
    question: "What is the difference in allocation procedure between Matrix Minima and the North-West Corner Rule?",
    shortAnswer: "Matrix Minima allocates to the globally lowest cost cell anywhere in the table, whereas NWCR allocates strictly to the top-left cell of the active submatrix.",
    explanation: "The allocation formula x_kl = min(S_k, D_l) is identical in both methods; what differs is the cell coordinate (k, l) selected for allocation.",
    hint: "Same math operator min(S, D), different cell coordinate selection.",
    level: "intermediate",
    codeExample: "NWCR: (k,l) = (active_row_0, active_col_0); Matrix Minima: (k,l) = argmin(c_ij)."
  },
  {
    question: "What role does the allocation matrix X play in subsequent MODI (u-v) optimality testing?",
    shortAnswer: "The cells where x_ij > 0 define the basic variables used to establish the system of linear equations u_i + v_j = c_ij.",
    explanation: "To calculate dual multipliers u_i and v_j, MODI sets up m + n - 1 equations using only the basic allocated cells from matrix X. If the allocation procedure is incomplete, the system of equations cannot be solved.",
    hint: "Allocated cells form the skeleton for calculating row and column potentials.",
    level: "expert",
    codeExample: "for (const { r, c } of allocations) { u[r] + v[c] === cost[r][c]; }"
  },
  {
    question: "What happens if an origin has a very large supply (e.g., 200 units) and supplies multiple small destinations across several allocation steps?",
    shortAnswer: "Row i receives multiple allocations across different steps until the sum of its allocated units equals its original capacity S_i = 200.",
    explanation: "At each step, row i supplies min(S_i_remaining, D_j) units to destination j. Row i remains active with decremented supply until a step fully consumes its remaining balance.",
    hint: "A large warehouse can distribute shipments to multiple cities over successive steps.",
    level: "intermediate",
    codeExample: "Step 1: x_11 = 50; Step 2: x_13 = 80; Step 4: x_12 = 70. Total for Row 1 = 200."
  },
  {
    question: "How do you systematically log allocations during software execution of Matrix Minima?",
    shortAnswer: "Append an object `{ step, row, col, unitCost, quantity, totalCost, rowExhausted, colSatisfied }` to an audit array after each allocation.",
    explanation: "Structured audit logging facilitates step-by-step UI visualization, debug tracing, and formal verification of the allocation trail.",
    hint: "Store a detailed transaction record for every shipment decision.",
    level: "intermediate",
    codeExample: "history.push({ step: t, origin: k, dest: l, rate: c_kl, qty: x_kl, cost: c_kl * x_kl });"
  },
  {
    question: "Why does the allocation procedure guarantee that no origin ships more than its total capacity?",
    shortAnswer: "Because at every step, x_kl ≤ S_k, and S_k is decremented by x_kl, preventing the cumulative sum of allocations in row k from exceeding initial S_k.",
    explanation: "Mathematical induction proves that remaining supply S_k(t) = S_k(0) - ∑_{p=1}^t x_kp ≥ 0 at all times. When S_k(t) = 0, row k is eliminated and receives no further allocations.",
    hint: "Deducting shipments from remaining stock guarantees the total can never exceed initial inventory.",
    level: "intermediate",
    codeExample: "∑_{j=1}^n x_ij = S_i (Strict equality holds at termination)."
  },
  {
    question: "Why does the allocation procedure guarantee that every destination receives exactly its required demand?",
    shortAnswer: "Because at every step, x_kl ≤ D_l, and D_l is decremented by x_kl until remaining demand reaches exactly 0 at line elimination.",
    explanation: "Similarly, remaining demand D_l(t) = D_l(0) - ∑_{p=1}^t x_pl ≥ 0. Column l is only eliminated when D_l(t) = 0, ensuring 100% order fulfillment.",
    hint: "A customer column is only closed when its unmet demand reaches zero.",
    level: "intermediate",
    codeExample: "∑_{i=1}^m x_ij = D_j (Strict equality holds at termination)."
  },
  {
    question: "What is the memory footprint of storing the allocation matrix X for a 100 × 200 transportation network?",
    shortAnswer: "Sparse storage requires only 299 basic entries (100 + 200 - 1 = 299 allocations), taking negligible memory (few kilobytes).",
    explanation: "Because an IBFS contains only m + n - 1 non-zero entries out of m · n = 20,000 total cells, storing allocations as a sparse list of tuples (i, j, x_ij) is extremely memory efficient.",
    hint: "Only m + n - 1 cells are non-zero in any basic solution.",
    level: "expert",
    codeExample: "Sparse list: 299 objects vs Dense matrix: 20,000 numbers."
  },
  {
    question: "In the final allocation step, what must always be true regarding remaining supply and remaining demand?",
    shortAnswer: "The remaining supply of the final active row must exactly equal the remaining demand of the final active column.",
    explanation: "Because total supply equals total demand (conservation of flow), satisfying all preceding lines leaves the exact same residual quantity in the final row and column, allowing them to terminate simultaneously.",
    hint: "The final piece of the jigsaw puzzle always fits the final empty space perfectly.",
    level: "intermediate",
    codeExample: "In final step: S_final === D_final ⇒ x_final = S_final = D_final."
  },
  {
    question: "If S_final ≠ D_final in the last allocation step, what does this indicate?",
    shortAnswer: "An arithmetic mistake occurred in one of the earlier subtraction steps, or the initial problem was unbalanced.",
    explanation: "Flow conservation dictates that residual balances must balance at the final step. A mismatch indicates an error in manual arithmetic or a missing dummy line.",
    hint: "A mismatch at the end is a red flag that an earlier subtraction was calculated incorrectly.",
    level: "basic",
    codeExample: "if (S_last !== D_last) throw new Error('Arithmetic imbalance detected in allocation history');"
  },
  {
    question: "How does Abhronila and Mahima's locker network problem demonstrate the allocation procedure on a 2 × 3 grid?",
    shortAnswer: "Step 1: (Kolkata, Ichapur) takes 30 units; Step 2: (Barrackpore, Jadavpur) takes 40 units; Step 3: (Kolkata, Salt Lake) takes 30 units.",
    explanation: "All 3 steps assign x_kl = min(S_k, D_l), achieving complete fulfillment of all 100 packages at an initial cost of ₹400.",
    hint: "Trace the 3 sequential assignments on the 2×3 table.",
    level: "basic",
    codeExample: "Allocations: (2,1)=30 @ ₹3, (1,2)=40 @ ₹4, (2,3)=30 @ ₹5 → Total = ₹400."
  },
  {
    question: "What is the effect of multiplying all unit costs by a positive constant k on the allocated quantities x_ij?",
    shortAnswer: "The allocated quantities x_ij remain 100% identical; only the total monetary cost Z scales by k.",
    explanation: "Because the allocation rule x_kl = min(S_k, D_l) depends only on capacity values S and D and the ordering of costs (which is invariant under positive scaling), every allocation volume remains unchanged.",
    hint: "Capacity constraints and cheapest route locations do not change when currency units change.",
    level: "intermediate",
    codeExample: "x_ij(k · C) === x_ij(C); Z_new = k · Z_old."
  },
  {
    question: "What is the single most important rule for students to remember during the allocation procedure?",
    shortAnswer: "Always take min(Remaining Supply, Remaining Demand), immediately deduct it from both balances, and circle the allocated volume inside the cell.",
    explanation: "Following this disciplined three-action rhythm prevents over-allocation, eliminates arithmetic slips, and produces a clear visual record for grading and verification.",
    hint: "Min, Deduct, Circle, and Strike.",
    level: "basic",
    codeExample: "1. Take min; 2. Deduct from S and D; 3. Circle allocation; 4. Strike line."
  }
];

export default questions;
