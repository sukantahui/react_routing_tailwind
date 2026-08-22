// topic1_questions.js
// 30 Moderate to Expert Questions on the MODI Method Overview (Modified Distribution / u-v Method)

const questions = [
  {
    question: "What is the primary definition and purpose of the Modified Distribution (MODI) Method in Operations Research?",
    shortAnswer: "The MODI method (also known as the u-v method) is an efficient linear programming algorithm designed to test an Initial Basic Feasible Solution for global optimality and systematically improve it until the minimum total transportation cost is achieved.",
    explanation: "MODI adapts the simplex method for bipartite transportation networks by computing row potentials (u_i) and column potentials (v_j), evaluating all unused shipping routes simultaneously without drawing separate loops for every empty cell.",
    hint: "Think u-v dual multiplier method for certifying and improving transportation solutions.",
    level: "moderate",
    codeExample: "MODI Pipeline: Basis Check -> Compute (u_i, v_j) -> Evaluate d_ij -> Check Optimality -> Loop Pivot."
  },
  {
    question: "Why is the MODI method also frequently called the 'u-v Method' or the 'Transportation Simplex'?",
    shortAnswer: "Because it introduces dual variables u_i (for row i) and v_j (for column j) that satisfy the basic cell equality u_i + v_j = c_ij, mirroring the simplex multipliers from linear programming duality.",
    explanation: "The variables u_i and v_j represent the shadow prices of origin supply and destination demand, transforming complex matrix inversions into simple scalar additions.",
    hint: "Named after row variables u_i and column variables v_j.",
    level: "moderate",
    codeExample: "Basic Cell Equation: u_i + v_j = c_ij"
  },
  {
    question: "What are the 5 standard sequential steps of the complete MODI algorithm?",
    shortAnswer: "Step 1: Check Non-Degeneracy (m + n - 1 basic cells); Step 2: Compute Dual Potentials (u_i, v_j); Step 3: Calculate Opportunity Costs (d_ij = c_ij - u_i - v_j); Step 4: Verify Optimality (all d_ij >= 0); Step 5: Pivot Flow around Closed Loop (if any d_ij < 0).",
    explanation: "These 5 steps repeat iteratively until every non-basic cell evaluation index d_ij is non-negative.",
    hint: "Non-degeneracy -> u-v potentials -> d_ij evaluation -> optimality check -> closed loop pivot.",
    level: "moderate",
    codeExample: "Algorithm: while (exists d_ij < 0) { find_uv(); calc_d(); loop_pivot(); }"
  },
  {
    question: "Why must an analyst set one dual variable arbitrarily (e.g., u_1 = 0) at the start of Step 2 in the MODI method?",
    shortAnswer: "Because there are m + n unknown potentials (m u_i values and n v_j values) but only m + n - 1 independent equations from the basic cells, creating one degree of freedom.",
    explanation: "Setting any single variable arbitrarily (commonly u_1 = 0 or the row with the most basic entries) anchors the potential field, allowing all other m + n - 1 potentials to be uniquely determined.",
    hint: "There are m + n variables but only m + n - 1 equations.",
    level: "expert",
    codeExample: "Equations: m + n - 1; Unknowns: m + n => Set u_1 = 0 to anchor system."
  },
  {
    question: "How does the MODI method evaluate whether a non-basic (empty) cell (i, j) is candidate for entry into the basis?",
    shortAnswer: "By computing its Net Evaluation / Opportunity Cost: d_ij = c_ij - (u_i + v_j). If d_ij < 0, the cell is a candidate to enter the basis.",
    explanation: "The value d_ij represents the net cost change per unit shipped through that cell. A negative value indicates that activating the route will decrease the objective function Z.",
    hint: "Opportunity cost formula: d_ij = c_ij - (u_i + v_j).",
    level: "moderate",
    codeExample: "d_ij = c_ij - (u_i + v_j); if (d_ij < 0) { candidate_entering_cell = (i, j); }"
  },
  {
    question: "What is the stopping condition for the MODI algorithm that confirms global optimality?",
    shortAnswer: "When all non-basic cell evaluations satisfy d_ij >= 0 simultaneously (d_ij = c_ij - u_i - v_j >= 0 for all empty cells).",
    explanation: "When no empty cell has a negative opportunity cost, no unit transfer around any loop can decrease the total transportation cost. The current basis is certified optimal.",
    hint: "All d_ij must be greater than or equal to zero.",
    level: "moderate",
    codeExample: "Optimality Condition: all(d_ij >= 0 for (i, j) in NonBasic) === true"
  },
  {
    question: "What is the primary computational advantage of MODI over the traditional Stepping-Stone method?",
    shortAnswer: "MODI evaluates ALL non-basic cells simultaneously using scalar potential additions (u_i + v_j), requiring a closed loop to be drawn ONLY ONCE for the winning entering cell, whereas Stepping-Stone requires drawing a separate loop for every empty cell.",
    explanation: "In a 4x5 tableau with 12 empty cells, Stepping-Stone draws 12 distinct geometric loops. MODI calculates 9 potentials (4 rows + 5 cols) and evaluates all 12 cells in seconds.",
    hint: "Stepping-Stone draws loops for every cell; MODI draws a loop only for the entering cell.",
    level: "expert",
    codeExample: "Loop traces: Stepping-Stone = (m-1)(n-1) loops vs MODI = 1 loop per pivot."
  },
  {
    question: "Suppose Debangshu in Barrackpore executes the MODI method on a 3x3 casting problem. If row potentials are u = [0, -3, 2] and column potentials are v = [8, 14, 5], what is the implied shadow cost (u_2 + v_2) for cell (2, 2)?",
    shortAnswer: "₹11 ( -3 + 14 = ₹11 ).",
    explanation: "Implied shadow cost for cell (2, 2) is u_2 + v_2 = -3 + 14 = ₹11.",
    hint: "-3 + 14 = 11.",
    level: "moderate",
    codeExample: "u_2 + v_2 = -3 + 14 = 11"
  },
  {
    question: "Continuing the above example, if the actual unit shipping cost for cell (2, 2) is c_22 = ₹19, what is its opportunity cost d_22?",
    shortAnswer: "d_22 = +₹8 ( ₹19 - ₹11 = +₹8 ).",
    explanation: "d_22 = c_22 - (u_2 + v_2) = 19 - 11 = +₹8. Since d_22 > 0, shipping through cell (2, 2) would increase total cost by ₹8 per ton, so it remains empty.",
    hint: "d_22 = 19 - 11 = 8.",
    level: "moderate",
    codeExample: "d_22 = 19 - ( -3 + 14 ) = 19 - 11 = +8"
  },
  {
    question: "If a non-basic cell evaluation yields d_13 = -₹5, what exact physical and financial meaning does this have for logistics managers?",
    shortAnswer: "It means that for every 1 ton of cargo shifted into route (1, 3), the total enterprise transportation bill will decrease by exactly ₹5.",
    explanation: "The opportunity cost represents the exact marginal derivative dZ/dx_13 = -₹5. Shifting 40 tons into this cell saves 40 * ₹5 = ₹200.",
    hint: "Total freight cost drops by ₹5 per shifted unit.",
    level: "moderate",
    codeExample: "Cost Reduction = theta * |d_ij| = 40 * 5 = ₹200 savings."
  },
  {
    question: "How does the MODI method choose the 'Entering Variable' (entering cell) when multiple empty cells have negative evaluations (d_ij < 0)?",
    shortAnswer: "By selecting the cell with the MOST NEGATIVE opportunity cost: Entering Cell = argmin { d_ij | d_ij < 0 }.",
    explanation: "Dantzig's simplex pivot rule selects the route offering the steepest marginal rate of cost decrease per unit transferred.",
    hint: "Select the cell with the most negative d_ij value.",
    level: "moderate",
    codeExample: "Entering Cell = (i, j) where d_ij is minimum among all negative evaluations."
  },
  {
    question: "What is a 'Stepping-Stone Closed Loop' constructed during Step 5 of the MODI method?",
    shortAnswer: "A closed rectangular path consisting of alternating horizontal and vertical line segments whose vertices lie exclusively on existing basic cells, except for the single entering non-basic cell.",
    explanation: "The loop allows mass balance conservation: adding theta (θ) to the entering cell requires subtracting θ from row/column partners in an alternating (+, -, +, -) pattern.",
    hint: "A closed polygon turning at 90-degree angles on basic cells.",
    level: "expert",
    codeExample: "Loop: (Enter, +θ) -> (Basic_1, -θ) -> (Basic_2, +θ) -> (Basic_3, -θ) -> (Enter)."
  },
  {
    question: "How is the maximum allowable transfer quantity theta (θ) determined in the closed loop?",
    shortAnswer: "θ is the MINIMUM of the allocated values among all basic cells with a MINUS (-) sign in the loop: θ = min { x_ij | (i, j) has a (-) sign }.",
    explanation: "Subtracting more than this minimum would violate the non-negativity constraint (x_ij >= 0) on the donor cells.",
    hint: "Smallest allocated quantity among minus (-) loop corners.",
    level: "expert",
    codeExample: "θ = min(x_minus_cells); ensures all new allocations remain >= 0."
  },
  {
    question: "Which cell becomes the 'Leaving Variable' (leaves the basis) after the loop pivot is completed?",
    shortAnswer: "The donor basic cell with a (-) sign that had allocation exactly equal to θ and whose new allocation drops to 0.",
    explanation: "The cell that drops to zero becomes non-basic (empty), preserving the exact basis count of m + n - 1 occupied cells.",
    hint: "The minus corner cell that reaches zero allocation.",
    level: "expert",
    codeExample: "Leaving Cell = argmin_{(-) cells} x_ij (its balance drops to 0 and exits basis)."
  },
  {
    question: "What happens if two or more basic cells with (-) signs tie for the minimum allocation θ during a loop pivot?",
    shortAnswer: "Only ONE of the tied cells leaves the basis (becomes empty); the other tied cell(s) remain in the basis with an explicit allocation of ZERO (x_ij = 0), preventing intermediate degeneracy.",
    explanation: "Dropping both tied cells to empty would reduce the basic cell count below m + n - 1, creating an unsolvable degenerate state in the next iteration.",
    hint: "Drop only one cell to empty; keep the other as a basic zero.",
    level: "expert",
    codeExample: "Tie-break: Drop cell A to non-basic; retain cell B as basic with x = 0."
  },
  {
    question: "Suppose Susmita in Ichapur completes an initial VAM tableau with total cost Z = ₹3,400. In MODI Iteration 1, she pivots θ = 20 tons into a cell with d_12 = -₹4. What is the new total cost Z'?",
    shortAnswer: "₹3,320 ( ₹3,400 - (20 * ₹4) = ₹3,400 - ₹80 = ₹3,320 ).",
    explanation: "Total cost decreases by θ * |d_ij| = 20 * 4 = ₹80. New total cost Z' = 3400 - 80 = ₹3,320.",
    hint: "3400 - (20 * 4) = 3320.",
    level: "moderate",
    codeExample: "Z_new = Z_old + (θ * d_ij) = 3400 + (20 * -4) = ₹3,320"
  },
  {
    question: "Why can the MODI method NEVER increase the total transportation cost during any valid iteration?",
    shortAnswer: "Because θ >= 0 and the entering cell is chosen with d_ij < 0, guaranteeing the objective change ΔZ = θ · d_ij <= 0 is strictly non-positive (monotonically non-increasing).",
    explanation: "Each simplex pivot moves along an edge of the convex feasible polyhedron in the direction of steepest descent, strictly reducing or preserving cost.",
    hint: "ΔZ = θ * (negative number) <= 0 always.",
    level: "expert",
    codeExample: "Monotonicity Property: Z_(k+1) <= Z_k for all iterations k."
  },
  {
    question: "How many independent linear equations are available to solve for the u_i and v_j potentials in an m x n matrix?",
    shortAnswer: "Exactly m + n - 1 equations, corresponding to the m + n - 1 basic (occupied) cells.",
    explanation: "Each occupied cell (i, j) provides one equation: u_i + v_j = c_ij. Non-degeneracy ensures exactly m + n - 1 such equations.",
    hint: "Count of basic cells = m + n - 1.",
    level: "moderate",
    codeExample: "Number of u-v equations = Count(Basic Cells) = m + n - 1"
  },
  {
    question: "What is the recommended rule of thumb for choosing which variable to set to 0 when initializing u-v potentials?",
    shortAnswer: "Set u_i = 0 for the row (or v_j = 0 for the column) that contains the MAXIMUM number of allocated basic cells.",
    explanation: "Anchoring the line with the most basic cells immediately allows solving for the highest number of intersecting potentials in a single step, minimizing algebraic cascades.",
    hint: "Pick the row or column with the most basic entries and set it to 0.",
    level: "intermediate",
    codeExample: "Best practice: u_k = 0 where k = argmax_i (count of basic cells in row i)."
  },
  {
    question: "Can any dual potential u_i or v_j have a negative numerical value?",
    shortAnswer: "Yes, dual potentials u_i and v_j can be positive, zero, or negative numbers because they represent relative scalar differentials anchored to an arbitrary zero reference.",
    explanation: "Unlike primal shipment quantities (which must be non-negative x_ij >= 0), dual potential multipliers are unrestricted in sign.",
    hint: "Dual potentials are unrestricted in sign (can be negative).",
    level: "moderate",
    codeExample: "u_i, v_j in Real Numbers (positive, negative, or zero)."
  },
  {
    question: "If Mamata in Kolkata sets u_1 = 0 and solves all potentials, then Mahima sets v_1 = 0 on the exact same tableau, will they obtain different opportunity costs d_ij?",
    shortAnswer: "No, they will obtain the EXACT SAME opportunity costs d_ij for all empty cells, because d_ij is invariant under scalar potential shifts.",
    explanation: "If all u_i increase by a constant k, all v_j decrease by k, leaving the sum (u_i + v_j) and the difference d_ij = c_ij - (u_i + v_j) completely unchanged.",
    hint: "Opportunity costs d_ij are invariant to the choice of zero reference.",
    level: "expert",
    codeExample: "Invariance Property: (u_i + k) + (v_j - k) = u_i + v_j => d_ij is identical."
  },
  {
    question: "How does the MODI method handle unbalanced transportation problems that were augmented with a dummy line?",
    shortAnswer: "The dummy row or column is treated identically to real lines: occupied dummy cells provide equations u_dummy + v_j = 0 (or u_i + v_dummy = 0), and unoccupied dummy cells are evaluated using d_ij = 0 - (u_i + v_j).",
    explanation: "The dummy line participates fully in the dual potential system with unit cost c = ₹0.",
    hint: "Dummy line participates normally with c_ij = 0.",
    level: "expert",
    codeExample: "Dummy Basic Cell: u_dummy + v_j = 0; Dummy Non-Basic: d = 0 - (u_dummy + v_j)."
  },
  {
    question: "What is the time complexity of one complete MODI iteration (finding u-v, computing d_ij, and pivoting one loop) for an m x n matrix?",
    shortAnswer: "O(m * n) arithmetic operations per iteration.",
    explanation: "Finding potentials takes O(m + n), evaluating empty cells takes O(mn), and tracing the single closed loop takes O(m + n). The dominant step is evaluating the (m-1)(n-1) cells, yielding O(mn).",
    hint: "Linear in the number of matrix cells O(mn).",
    level: "expert",
    codeExample: "Complexity per MODI iteration = O(m * n)"
  },
  {
    question: "Why does the MODI method converge in a finite number of iterations?",
    shortAnswer: "Because an m x n transportation problem has a finite number of basic feasible solutions (vertices on the polytope), and the strict cost reduction ΔZ < 0 prevents returning to a previously visited basis (assuming non-degeneracy).",
    explanation: "Finite vertices + strictly decreasing objective value = guaranteed finite convergence to the global optimum.",
    hint: "Finite number of basic vertices and strictly decreasing total cost.",
    level: "expert",
    codeExample: "Convergence Theorem: Finite bases + Monotonic decrease => Finite termination."
  },
  {
    question: "Suppose Abhronila in Jadavpur finishes a MODI evaluation and gets d_12 = 0, d_13 = +4, d_21 = +2, d_31 = +5. What does the presence of d_12 = 0 tell her?",
    shortAnswer: "The current solution is optimal (Z is minimized), but an alternate optimal solution exists with different shipping allocations and the exact same minimal cost Z.",
    explanation: "Since all d_ij >= 0, the current plan is optimal. The zero entry means flow can be shifted into cell (1, 2) without changing total cost.",
    hint: "Zero opportunity cost indicates alternate optimal solutions.",
    level: "moderate",
    codeExample: "d_12 === 0 && all other d > 0 => Multiple Optimal Solutions exist."
  },
  {
    question: "What is the physical managerial advantage of identifying alternative optimal solutions using MODI in Bengal logistics?",
    shortAnswer: "It gives operations directors flexibility to choose between two equally cost-effective routing plans based on secondary real-world factors like road quality, toll gates, driver preferences, or weather conditions.",
    explanation: "Both plans cost the exact same rupees, but one may utilize a smoother highway (e.g. Kalyani Expressway vs BT Road).",
    hint: "Enables choosing routes based on road conditions, safety, or weather at identical cost.",
    level: "intermediate",
    codeExample: "Managerial Flexibility: Equal cost Z -> select route with better road safety."
  },
  {
    question: "Why should an operations researcher never skip Step 1 (Non-Degeneracy check) before applying MODI?",
    shortAnswer: "Because if the solution is degenerate (fewer than m + n - 1 basic cells), the u_i and v_j equations cannot be solved, causing the manual calculation or solver script to crash.",
    explanation: "Counting allocations takes 5 seconds and allows inserting an epsilon (ε) immediately if needed.",
    hint: "Verify m + n - 1 basic cells before starting potential calculations.",
    level: "intermediate",
    codeExample: "Safety Check: if (count(basic) < m + n - 1) { add_epsilon(); }"
  },
  {
    question: "In what practical format are dual potentials and opportunity costs usually written on paper exam tableaus?",
    shortAnswer: "u_i values are written in a margin column to the left/right of rows; v_j values are written in a margin row above/below columns; and opportunity costs d_ij are written in parentheses or circles in the bottom-right corner of empty cells.",
    explanation: "This clear standard format prevents visual confusion between unit costs c_ij, allocations x_ij, and evaluations d_ij.",
    hint: "Potentials in outer margins; d_ij in bottom-right corner of empty cells.",
    level: "intermediate",
    codeExample: "Tableau layout: Outer margins = [u_i, v_j]; Cell sub-box = d_ij = c_ij - u_i - v_j."
  },
  {
    question: "What is the core takeaway regarding the relationship between VAM and MODI?",
    shortAnswer: "VAM is the fastest generator of near-optimal starting bases; MODI is the mathematical auditor and optimizer that takes VAM's output and proves global optimality with minimal pivots.",
    explanation: "Combining VAM (Stage 1) with MODI (Stage 2) forms the gold standard workflow in quantitative analysis and supply chain engineering.",
    hint: "VAM provides the starting basis; MODI proves and perfects optimality.",
    level: "expert",
    codeExample: "Industry Standard Pipeline: VAM (IBFS) + MODI (Optimality) = 100% Proven Minimum."
  },
  {
    question: "What is the ultimate golden rule of the MODI method?",
    shortAnswer: "'Basic cells determine potentials (u_i + v_j = c_ij); potentials evaluate empty cells (d_ij = c_ij - u_i - v_j); all d_ij >= 0 proves optimality!'",
    explanation: "This three-part principle summarizes the entire mathematical logic of the transportation simplex method.",
    hint: "Basic cells set u-v; u-v evaluates empty cells; d_ij >= 0 proves optimality.",
    level: "moderate",
    codeExample: "Golden Rule: (1) Basic: u+v = c -> (2) Non-basic: d = c - (u+v) -> (3) All d >= 0 = Optimal!"
  }
];

export default questions;
