// topic1_questions.js
// 30 Moderate to Expert Questions on Matrix Minima Method

const questions = [
  {
    question: "What is the formal definition and operational goal of the Matrix Minima Method?",
    shortAnswer: "It is an iterative algorithm that constructs an Initial Basic Feasible Solution (IBFS) by systematically allocating maximum possible units to the cell with the lowest unit cost in the active tableau.",
    explanation: "The Matrix Minima Method (also called the Inspection Method or Least-Cost Method) operates globally over the entire cost matrix C = [c_ij]. At each iteration, it finds (k, l) = argmin { c_ij : S_i > 0, D_j > 0 }, assigns x_kl = min(S_k, D_l), updates capacities, and eliminates the satisfied row or column until all demands are met.",
    hint: "Think of an algorithm that repeatedly shrinks the matrix by finding the global minimum cost cell.",
    level: "intermediate",
    codeExample: "while (hasActiveSupplyAndDemand(matrix)) {\n  (k, l) = findGlobalMinCell(matrix);\n  x[k][l] = min(supply[k], demand[l]);\n  updateCapacitiesAndEliminate(k, l);\n}"
  },
  {
    question: "How does the Matrix Minima Method differ fundamentally from the Row Minima or Column Minima methods?",
    shortAnswer: "Matrix Minima searches the entire m × n grid globally for the cheapest cost, whereas Row/Column Minima restrict their search to a single row or column at a time.",
    explanation: "In Row Minima, the algorithm is constrained to satisfy Row 1 first by finding its internal cheapest cell, then Row 2, etc. Column Minima similarly processes Column by Column. Matrix Minima has no spatial orientation constraints; it evaluates all unallocated cells across all active rows and columns simultaneously, yielding a globally superior starting cost.",
    hint: "Compare global 2D optimization search with localized 1D slice searches.",
    level: "intermediate",
    codeExample: "Matrix Minima: min_{(i,j) ∈ all} c_ij vs Row Minima: min_{j} c_{current_row, j}"
  },
  {
    question: "Why must an unbalanced transportation problem be balanced with a dummy before executing the Matrix Minima algorithm?",
    shortAnswer: "To ensure mathematical conservation of flow (Σ S_i = Σ D_j), preventing infinite loops or unresolved leftover demands in the algorithm.",
    explanation: "If total supply exceeds demand by Δ units, a dummy column D_dummy is introduced with demand Δ and zero freight cost (c_i,dummy = ₹0). If demand exceeds supply, a dummy row is introduced. Balancing guarantees that row and column elimination termination conditions synchronize at the final step.",
    hint: "Every unit shipped out of an origin must legally land somewhere in the system model.",
    level: "intermediate",
    codeExample: "if (totalSupply > totalDemand) {\n  addDummyColumn(demand = totalSupply - totalDemand, cost = 0);\n}"
  },
  {
    question: "How does allocating to a ₹0 dummy cell impact the execution order in the standard Matrix Minima Method?",
    shortAnswer: "Since ₹0 is the lowest numerical value, the standard algorithm selects dummy cells first unless an explicit priority protocol is specified.",
    explanation: "Mathematically, 0 < c_ij for all positive freight rates. Therefore, the greedy scanner prioritizes dummy cells immediately. In production logistics, analysts often apply a 'two-phase' heuristic where real customer demands are satisfied first at lowest real cost, and surplus inventory is dumped into dummy storage at the end.",
    hint: "Zero is smaller than any positive rupee rate, making it an instant candidate for argmin.",
    level: "expert",
    codeExample: "Standard rule: argmin selects ₹0 cell first → Real inventory assigned to dummy storage."
  },
  {
    question: "What is the maximum number of allocation steps required by the Matrix Minima Method for an m × n transportation problem?",
    shortAnswer: "At most m + n - 1 iterations.",
    explanation: "At each allocation step, at least one row or one column is fully exhausted and eliminated from further consideration. Since there are m rows and n columns, eliminating all lines while terminating at the final simultaneous balance takes at most (m + n - 1) distinct allocation decisions.",
    hint: "Each step reduces the active row or column count by at least 1.",
    level: "intermediate",
    codeExample: "Total Steps ≤ (m + n - 1). For a 3×4 matrix, max steps = 3 + 4 - 1 = 6."
  },
  {
    question: "What is the formal mathematical condition for a set of Matrix Minima allocations to constitute a 'Basic' feasible solution?",
    shortAnswer: "There must be exactly m + n - 1 positive allocations that occupy non-cyclical (linearly independent) positions in the grid.",
    explanation: "The constraint matrix of a balanced transportation problem has rank m + n - 1. A solution is basic if the vectors associated with the allocated variables are linearly independent, which geometrically means no closed horizontal/vertical loop can be formed among allocated cells.",
    hint: "Think about spanning trees in graph theory where vertices = m + n and edges = m + n - 1 without cycles.",
    level: "expert",
    codeExample: "rank(A) = m + n - 1; allocatedCells.length === m + n - 1; hasLoop(allocatedCells) === false;"
  },
  {
    question: "What happens during Matrix Minima allocation if S_k < D_l for the minimum cost cell (k, l)?",
    shortAnswer: "Allocate x_kl = S_k, update D_l' = D_l - S_k, S_k' = 0, and cross out row k.",
    explanation: "Since the supply at origin k is completely exhausted by destination l's demand, row k cannot supply any more shipments. Column l remains active with a reduced demand of (D_l - S_k) to be satisfied by other origins in subsequent iterations.",
    hint: "Origin k is empty, but destination l is still hungry for more units.",
    level: "basic",
    codeExample: "x[k][l] = S[k]; D[l] -= S[k]; S[k] = 0; rowDone[k] = true;"
  },
  {
    question: "What happens during Matrix Minima allocation if S_k > D_l for the minimum cost cell (k, l)?",
    shortAnswer: "Allocate x_kl = D_l, update S_k' = S_k - D_l, D_l' = 0, and cross out column l.",
    explanation: "Destination l has received its full quota and is completely satisfied. Column l is eliminated from future search iterations. Origin k retains (S_k - D_l) units of surplus stock available for other destinations.",
    hint: "Destination l is full, but origin k still has leftover warehouse inventory.",
    level: "basic",
    codeExample: "x[k][l] = D[l]; S[k] -= D[l]; D[l] = 0; colDone[l] = true;"
  },
  {
    question: "Explain why the Matrix Minima Method cannot create a closed loop among basic cells during its standard execution.",
    shortAnswer: "Because every allocation immediately eliminates its exhausted row or column, preventing new allocations from reconnecting with eliminated lines.",
    explanation: "A closed loop requires at least two allocations in every participating row and column. Because Matrix Minima immediately isolates and deletes any line that reaches zero capacity, subsequent allocations can only connect to active lines, maintaining a tree structure (acyclic graph).",
    hint: "You cannot form a loop through a row that has already been permanently closed.",
    level: "expert",
    codeExample: "Elimination ensures each newly added edge connects an unvisited node or tree branch without closing cycles."
  },
  {
    question: "What is an 'infinitesimal positive quantity' (ε) and when is it injected into the Matrix Minima tableau?",
    shortAnswer: "ε is a near-zero placeholder used when degeneracy occurs (S_k = D_l) to maintain exactly m + n - 1 basic variables for optimality testing.",
    explanation: "When an allocation simultaneously satisfies both row k and column l, crossing out both would leave only m + n - 2 basic cells. To prevent degeneracy, one line is crossed out normally, and an allocation of ε is placed in an independent cell of the other line before crossing it out. Mathematically, ε > 0 but ε << any real shipment volume.",
    hint: "A ghost allocation that preserves the algebraic rank of the basic variable matrix.",
    level: "expert",
    codeExample: "if (S[k] === D[l]) {\n  x[k][l] = S[k];\n  rowDone[k] = true;\n  x[arbitrary_independent_cell][l] = EPSILON;\n  colDone[l] = true;\n}"
  },
  {
    question: "How does the Matrix Minima Method handle negative unit transportation costs (c_ij < 0) if subsidies exist on certain routes?",
    shortAnswer: "The algorithm naturally selects negative cost cells first because they represent the smallest numerical values and maximize revenue/subsidy.",
    explanation: "If government subsidies or toll rebates make a route profitable (c_ij = -₹5), the greedy argmin operator will automatically target (i, j) before any positive cost cells, absorbing as much capacity as possible to reduce the objective function Z.",
    hint: "Negative costs are mathematically smaller than zero and positive numbers.",
    level: "intermediate",
    codeExample: "argmin([-₹5, ₹2, ₹4]) = -₹5 → Allocates maximum units to subsidized route first."
  },
  {
    question: "Why is the total cost obtained from the Matrix Minima Method generally higher than that of Vogel's Approximation Method (VAM)?",
    shortAnswer: "Matrix Minima is myopic (focuses on absolute lowest cost now), whereas VAM evaluates opportunity penalty (regret of not choosing the lowest cost).",
    explanation: "Matrix Minima may pick a cell costing ₹1, which leaves a remote destination with no choice but to take a ₹50 route in step 4. VAM calculates the penalty (difference between lowest and second-lowest costs) in each line, thus prioritizing routes that prevent severe future financial penalties.",
    hint: "Short-term penny pinching vs long-term penalty avoidance.",
    level: "intermediate",
    codeExample: "Matrix Minima selects min(c_ij); VAM selects max(penalty_i, penalty_j)."
  },
  {
    question: "Suppose the cost matrix has dimensions 3 × 4. After 4 allocation steps, all supply and demand are satisfied. What must you conclude?",
    shortAnswer: "The solution is degenerate because it has only 4 basic allocations instead of the required m + n - 1 = 6 allocations.",
    explanation: "For a 3 × 4 problem, m + n - 1 = 3 + 4 - 1 = 6 allocations are mandatory for a non-degenerate basic solution. Having only 4 allocations means multiple simultaneous line exhaustions occurred without ε insertion. Two ε values must be placed in independent cells before MODI testing.",
    hint: "Check basic variable count formula: 3 + 4 - 1 = 6.",
    level: "intermediate",
    codeExample: "Expected: 6 cells. Actual: 4 cells → Degeneracy detected, insert 2 epsilon allocations."
  },
  {
    question: "In automated software systems, how does a 2D Boolean mask optimize the Matrix Minima algorithm?",
    shortAnswer: "A Boolean mask array `active[m][n]` allows O(1) filtering of exhausted cells during minimum cost lookups.",
    explanation: "By maintaining `rowActive: boolean[]` and `colActive: boolean[]`, the search condition `rowActive[i] && colActive[j]` immediately bypasses eliminated rows and columns, avoiding redundant matrix transformations or memory copies.",
    hint: "Flagging exhausted indices prevents traversing dead matrix sectors.",
    level: "intermediate",
    codeExample: "const isValid = (r, c) => rowActive[r] && colActive[c];\nlet minCell = findMin(matrix, isValid);"
  },
  {
    question: "How do you calculate the total transportation cost Z once the Matrix Minima allocation is complete?",
    shortAnswer: "Multiply each allocated quantity x_ij by its corresponding unit cost c_ij and sum the products across all allocated cells.",
    explanation: "Total Freight Cost Z = Σ_{(i,j) ∈ Basic} (c_ij × x_ij). For example, if Mamata assigns 40 units @ ₹3, 50 units @ ₹2, and 30 units @ ₹6, Z = (40×3) + (50×2) + (30×6) = ₹120 + ₹100 + ₹180 = ₹400.",
    hint: "Sum of (Shipment Quantity × Route Cost in ₹) for all occupied cells.",
    level: "basic",
    codeExample: "const totalCost = allocations.reduce((acc, { qty, cost }) => acc + qty * cost, 0);"
  },
  {
    question: "What is the primary advantage of Matrix Minima over Vogel's Approximation Method in manual hand calculations?",
    shortAnswer: "Matrix Minima requires no row and column penalty recalculations, making it faster and less error-prone during manual exams.",
    explanation: "In VAM, students must recalculate penalties for every remaining row and column after every single allocation step. For a 4×4 problem, this means dozens of arithmetic subtractions. Matrix Minima simply requires scanning for the smallest number in the table, drastically reducing exam computation time.",
    hint: "Scanning a grid for the smallest number is much simpler than repeatedly computing differences.",
    level: "intermediate",
    codeExample: "Matrix Minima workload: Scan table → Allocate → Eliminate. (No penalty math required)."
  },
  {
    question: "Can the Matrix Minima Method be applied directly to a maximization transportation problem (e.g., maximizing profit)?",
    shortAnswer: "Yes, by converting the profit matrix into a relative loss matrix (c_ij = MaxProfit - p_ij) and then applying Matrix Minima, or by using Matrix Maxima directly.",
    explanation: "To maximize total profit Σ p_ij x_ij, either: 1) Identify the highest profit P_max in the matrix and create a cost matrix with c_ij = P_max - p_ij, then apply standard Matrix Minima; or 2) Greedily allocate maximum units to the cell with maximum profit first (Matrix Maxima).",
    hint: "Turn maximum profit hunting into minimum opportunity loss hunting.",
    level: "expert",
    codeExample: "c_ij = max_{a,b}(p_ab) - p_ij; apply MatrixMinima(C);"
  },
  {
    question: "In a transportation problem where all c_ij are distinct positive integers, is the Matrix Minima allocation sequence unique?",
    shortAnswer: "Yes, because every active submatrix has a unique strictly smallest element and non-equal capacities eliminate tie-breaking ambiguity.",
    explanation: "When every unit cost c_ij is strictly distinct (no two costs equal), the argmin operator returns a unique cell at every step. Unless a simultaneous capacity exhaustion tie occurs, the entire allocation trajectory is deterministically unique.",
    hint: "No duplicate numbers means no tie-breaking choices to branch.",
    level: "intermediate",
    codeExample: "Unique min(C_active) at every step ⇒ Unique allocation tree."
  },
  {
    question: "What is the geometric meaning of 'Independent Positions' for allocated cells in the Matrix Minima solution?",
    shortAnswer: "Allocated cells are independent if it is impossible to draw a closed horizontal and vertical loop consisting solely of allocated cells.",
    explanation: "A loop is a sequence of allocated cells connected by alternating horizontal and vertical lines that returns to the starting cell with at least 4 corners. If cells are independent (no loops), the corresponding column vectors in the LP constraint matrix are linearly independent.",
    hint: "You cannot play a game of orthogonal rook jumps returning to the start using only allocated cells.",
    level: "expert",
    codeExample: "hasClosedLoop(cells) === false ⇒ Columns of constraint matrix are linearly independent."
  },
  {
    question: "How does the Matrix Minima Method ensure that supply and demand constraints are never violated during allocation?",
    shortAnswer: "By taking the minimum of remaining supply and remaining demand (x_kl = min(S_k, D_l)), the assigned volume never exceeds either limit.",
    explanation: "Since x_kl ≤ S_k, remaining supply S_k - x_kl ≥ 0. Since x_kl ≤ D_l, remaining demand D_l - x_kl ≥ 0. The non-negativity constraint and capacity bounds are rigorously enforced at every assignment step.",
    hint: "Taking min(A, B) ensures the deduction never produces a negative balance.",
    level: "basic",
    codeExample: "assert(x_kl <= S[k] && x_kl <= D[l]);"
  },
  {
    question: "What should you do if the smallest cost in the matrix occurs in a cell whose row or column has already been crossed out?",
    shortAnswer: "Ignore that cell completely; only uncrossed (active) rows and columns are eligible for allocation.",
    explanation: "Once a row supply or column demand is exhausted and eliminated, its capacity is 0. Allocating to an eliminated cell would violate physical flow conservation (shipping non-existent goods or oversupplying a destination).",
    hint: "Dead rows and columns have zero capacity and are out of the game.",
    level: "basic",
    codeExample: "if (rowDone[i] || colDone[j]) continue; // Skip eliminated cells"
  },
  {
    question: "How does Matrix Minima handle transshipment nodes in extended transportation networks?",
    shortAnswer: "Transshipment nodes are converted into regular origin-destination pairs with a large buffer capacity B added to diagonal supply/demand.",
    explanation: "In transshipment models, intermediate depots act as both sources and sinks. A buffer B = Σ S_i is added to their supply and demand with c_ii = ₹0. Matrix Minima can then be run on the expanded (m+p) × (n+p) table.",
    hint: "Buffer capacity allows goods to flow into and out of intermediary hubs without cost penalties.",
    level: "expert",
    codeExample: "Supply_trans = S_orig + B; Demand_trans = D_orig + B; c_trans,trans = ₹0."
  },
  {
    question: "If a 3 × 3 matrix has costs: Row 1 = [₹2, ₹5, ₹7], Row 2 = [₹6, ₹1, ₹4], Row 3 = [₹8, ₹3, ₹9], which cell is selected first?",
    shortAnswer: "Cell (2, 2) with unit cost ₹1.",
    explanation: "Scanning the entire 3×3 cost matrix, the absolute minimum value is ₹1, located at row 2, column 2. The algorithm will immediately allocate min(S_2, D_2) to cell (2, 2).",
    hint: "Look for the single smallest number across all 9 cells.",
    level: "basic",
    codeExample: "argmin([[2, 5, 7], [6, 1, 4], [8, 3, 9]]) = (Row 2, Col 2) with c_22 = ₹1."
  },
  {
    question: "Under what specific condition will the Matrix Minima Method produce the exact same allocation as the North-West Corner Rule?",
    shortAnswer: "When the unit costs along the matrix diagonal/top-left to bottom-right order are strictly increasing such that min cost is always at the active top-left cell.",
    explanation: "If c_11 < c_12 < c_13 and c_11 < c_21 < c_31, and all subsequent active submatrices retain their smallest cost at their respective top-left corners, the Matrix Minima sequence of cell selections will exactly mirror the NWCR path.",
    hint: "When the cheapest cell always happens to be the top-left cell of the remaining subtable.",
    level: "expert",
    codeExample: "If c_11 < c_12 < ... < c_mn, Matrix Minima steps match NWCR steps exactly."
  },
  {
    question: "How does the MODI method interact with an IBFS generated by Matrix Minima?",
    shortAnswer: "MODI uses the m + n - 1 basic cells from Matrix Minima to compute dual potentials u_i and v_j, then evaluates non-basic opportunity costs Δ_ij = c_ij - (u_i + v_j).",
    explanation: "The Matrix Minima solution supplies the starting basis. Setting u_1 = 0, the equations u_i + v_j = c_ij for all basic cells determine all u_i and v_j. If all non-basic evaluations Δ_ij ≥ 0, the Matrix Minima IBFS is confirmed optimal without requiring any simplex pivot loops.",
    hint: "The starting allocated cells form the system of equations for row and column potentials.",
    level: "expert",
    codeExample: "u_i + v_j = c_ij ∀ (i,j) ∈ Basic; Δ_ij = c_ij - u_i - v_j ∀ (i,j) ∉ Basic."
  },
  {
    question: "What is the effect on the Matrix Minima allocation if an identical constant K is subtracted from all costs in a specific row i?",
    shortAnswer: "The relative cost of all cells in row i decreases, potentially making row i cells cheaper and increasing their allocation priority.",
    explanation: "Unlike scalar shifts applied uniformly across the whole matrix, shifting a single row alters the relative differences between rows. This can change the global minimum cell order, shifting shipments into row i earlier in the sequence.",
    hint: "Lowering prices in only one warehouse makes that warehouse more attractive than others.",
    level: "expert",
    codeExample: "c_ij' = c_ij - K for row i only ⇒ Shifts argmin priority toward row i."
  },
  {
    question: "In practical supply chain terms, why is Matrix Minima called a 'Greedy Algorithm'?",
    shortAnswer: "Because it makes the locally optimal choice at each step (cheapest available route) with the hope of finding a globally near-optimal solution.",
    explanation: "Greedy algorithms never backtrack or revise earlier decisions. Once an allocation is made to cell (k, l), it is locked in for the construction phase, regardless of whether a subsequent step is forced to use an expensive route.",
    hint: "It takes the biggest bite of the cheapest pie right now without worrying about tomorrow.",
    level: "intermediate",
    codeExample: "Greedy heuristic: Local best choice at Step t, no backtracking during initial construction."
  },
  {
    question: "What is the memory space complexity of storing and executing Matrix Minima for an m × n transportation problem?",
    shortAnswer: "O(m · n) space complexity.",
    explanation: "The algorithm requires storing the m × n cost matrix, m supply values, n demand values, an m × n allocation matrix, and boolean arrays for row/column statuses, all of which fit comfortably in O(mn) memory.",
    hint: "A standard 2D table plus a few 1D auxiliary arrays.",
    level: "intermediate",
    codeExample: "Space: O(mn) for 2D matrices + O(m + n) for 1D vectors."
  },
  {
    question: "How does the Matrix Minima Method behave if all origins have equal capacity and all destinations have equal demand (Balanced Uniform Problem)?",
    shortAnswer: "It performs clean, equal-sized allocation blocks, rapidly eliminating one row or column per step while picking the lowest rates.",
    explanation: "In a uniform problem where all S_i = S and all D_j = D, allocations proceed in standard quantized chunk sizes. If S = D, degeneracy occurs at every single step, requiring systematic ε tracking.",
    hint: "Equal capacities mean simultaneous satisfaction happens frequently.",
    level: "intermediate",
    codeExample: "S = [100, 100], D = [100, 100] → Step 1: x_11 = 100 (both S1 and D1 hit 0 simultaneously)."
  },
  {
    question: "Why should students always write down the intermediate reduced submatrices when solving Matrix Minima by hand?",
    shortAnswer: "To avoid accidentally selecting costs from already-eliminated rows or columns and to maintain a clear visual audit trail.",
    explanation: "During examination pressure, eyes easily wander to a low number like ₹1 in a row that was already exhausted in Step 1. Striking out lines or rewriting the active submatrix guarantees that only valid active candidates are inspected.",
    hint: "Crossed out lines keep your focus strictly on active, unexhausted numbers.",
    level: "basic",
    codeExample: "Step 1: Eliminate Row 2 → Cross out Row 2 → Submatrix now has m-1 rows."
  }
];

export default questions;
