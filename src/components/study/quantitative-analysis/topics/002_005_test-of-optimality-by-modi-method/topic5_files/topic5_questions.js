// topic5_questions.js
// 30 Moderate to Expert Questions on Identifying Entering Cells in the MODI Method

const questions = [
  {
    question: "What is the primary mathematical rule for selecting the Entering Cell (Entering Variable) in the MODI method?",
    shortAnswer: "Select the non-basic cell corresponding to the MOST NEGATIVE opportunity cost: Entering Cell = argmin { d_ij | d_ij < 0 }.",
    explanation: "This rule follows Dantzig's simplex pivot criterion, choosing the variable with the steepest rate of cost decrease per unit transferred along the basis edge.",
    hint: "Pick the cell with the most negative d_ij value.",
    level: "moderate",
    codeExample: "Entering Cell = (i, j) where d_ij == min({d_kl | d_kl < 0})."
  },
  {
    question: "Why does the MODI method prioritize the most negative evaluation over any arbitrary negative evaluation?",
    shortAnswer: "Because the most negative d_ij provides the maximum marginal cost reduction per ton, which empirically minimizes the total number of subsequent pivoting iterations.",
    explanation: "Choosing the steepest descent direction accelerates convergence toward the optimal vertex.",
    hint: "Maximizes cost reduction per unit and speeds up convergence.",
    level: "moderate",
    codeExample: "Steepest descent: max rate of decrease = |min(d_ij)|."
  },
  {
    question: "Suppose Debangshu in Barrackpore evaluates a 3x3 casting network and finds three negative opportunity costs: d_13 = -₹2, d_21 = -₹8, and d_32 = -₹3. Which cell enters the basis?",
    shortAnswer: "Cell (2, 1) enters the basis because d_21 = -₹8 is the most negative evaluation.",
    explanation: "Comparing -2, -8, and -3: the minimum is -8 at cell (2, 1).",
    hint: "-8 is more negative than -3 or -2.",
    level: "moderate",
    codeExample: "min(-2, -8, -3) = -8 => Entering Cell is (2, 1)."
  },
  {
    question: "How is a tie broken if two or more empty cells share the EXACT SAME most negative opportunity cost (e.g. d_12 = -₹6 and d_31 = -₹6)?",
    shortAnswer: "Tier 1: Trace the closed loops for both tied candidates and select the cell that accommodates the LARGER flow transfer quantity theta (θ), maximizing total cost reduction Delta Z = theta * |d_ij|; Tier 2: Select arbitrarily.",
    explanation: "Comparing total reduction Delta Z allows the allocator to make the greatest single-step leap toward optimality.",
    hint: "Pick the candidate that allows a larger transfer quantity θ.",
    level: "expert",
    codeExample: "Tie-breaker: argmax { theta_k * |d_k| }."
  },
  {
    question: "Suppose candidate cell A has d_A = -₹6 with θ_A = 10 tons (Delta Z = ₹60 savings), while candidate cell B has d_B = -₹4 with θ_B = 40 tons (Delta Z = ₹160 savings). Under standard Dantzig simplex rules, which cell is selected?",
    shortAnswer: "Under standard Dantzig simplex rules, Cell A is selected because d_A = -₹6 is the more negative per-unit rate; in largest-reduction heuristics, Cell B could be chosen for higher total one-step savings.",
    explanation: "Standard textbook simplex strictly prioritizes the gradient d_ij. Both paths will ultimately reach the identical global minimum.",
    hint: "Standard simplex strictly follows the most negative d_ij.",
    level: "expert",
    codeExample: "Standard Dantzig rule selects Cell A (d = -6); largest-reduction selects Cell B."
  },
  {
    question: "Can an occupied BASIC cell ever be chosen as an entering cell?",
    shortAnswer: "No, basic cells are already part of the current basis (their d_ij is identically 0) and cannot enter.",
    explanation: "Entering variables are exclusively selected from non-basic (empty) candidate cells.",
    hint: "Only empty (non-basic) cells can enter.",
    level: "moderate",
    codeExample: "Entering Candidate in NonBasicCells ONLY."
  },
  {
    question: "What physical action occurs in the transportation network when a cell is identified as the entering variable?",
    shortAnswer: "A previously unused shipping lane is officially activated to receive physical cargo allocation, triggering a closed-loop flow redistribution.",
    explanation: "The entering route transitions from zero allocation to carrying θ units of physical volume.",
    hint: "An unused lane is opened to receive freight flow.",
    level: "intermediate",
    codeExample: "x_enter: 0 -> theta (becomes basic)."
  },
  {
    question: "If all opportunity costs are positive except for cell (3, 3) where d_33 = -₹1, is cell (3, 3) automatically the entering variable?",
    shortAnswer: "Yes, because it is the SOLE negative opportunity cost in the entire tableau, making it the unique candidate to improve the solution.",
    explanation: "With only one negative evaluation, no candidate comparison is required.",
    hint: "The only negative cell must enter.",
    level: "moderate",
    codeExample: "Unique negative d_ij => unique entering cell."
  },
  {
    question: "Suppose Susmita in Ichapur has an unbalanced matrix with a dummy column. If the most negative evaluation occurs at an empty dummy cell (d_1,dummy = -₹5), can this dummy cell enter the basis?",
    shortAnswer: "Yes, dummy cells participate fully in the simplex method; activating the dummy route reallocates surplus warehouse stock to reduce real freight costs elsewhere.",
    explanation: "Shifting surplus inventory to Origin 1 unlocks cheaper transport options across active customer routes.",
    hint: "Dummy cells can enter the basis normally.",
    level: "expert",
    codeExample: "Entering Cell = (1, Dummy) with d = -5."
  },
  {
    question: "What is the primary visual recommendation for marking the entering cell on a working exam tableau?",
    shortAnswer: "Place a distinct star (★) or circle around the entering cell's opportunity cost, and write (+θ) in the cell center to initiate the loop tracing.",
    explanation: "Clear visual notation prevents confusion when tracing the stepping-stone loop.",
    hint: "Circle the entering cell and mark it with +θ.",
    level: "intermediate",
    codeExample: "Tableau marking: Cell (i, j) with (+θ) and circled d_ij."
  },
  {
    question: "What happens if an operations researcher accidentally selects a cell with d_ij = +₹4 to enter the basis instead of a negative cell?",
    shortAnswer: "The total transportation cost will INCREASE by 4 Rupees per transferred unit, moving the solution further away from the minimum.",
    explanation: "Pivoting on a positive opportunity cost causes objective degradation (ΔZ > 0).",
    hint: "Entering a positive cell increases total freight cost.",
    level: "moderate",
    codeExample: "Delta Z = theta * (+4) > 0 (Cost Increases!)."
  },
  {
    question: "Suppose Mamata in Kolkata finds d_12 = -₹4 and d_23 = -₹4 in a cold-chain vaccine network. How should she document her tie-break decision?",
    shortAnswer: "State: 'Tie between cells (1,2) and (2,3) at d = -₹4. Selecting cell (1,2) arbitrarily (or by higher transfer volume θ).' ",
    explanation: "Transparent documentation earns full credit in university and professional examinations.",
    hint: "Document the tie and declare the selected candidate clearly.",
    level: "intermediate",
    codeExample: "Documentation: 'Tie at d = -4; selected (1, 2) by rule Tier 1.'"
  },
  {
    question: "Can an entering cell have an initial unit transportation cost of ₹0?",
    shortAnswer: "Yes, if the entering cell is located in a dummy row or column where c_ij = ₹0, or in a subsidized zero-rate commercial lane.",
    explanation: "The entering rule depends strictly on the net evaluation d_ij = c_ij - (u_i + v_j), not on the raw magnitude of c_ij.",
    hint: "Entering rule depends on d_ij, not raw c_ij.",
    level: "moderate",
    codeExample: "c_ij = 0 with d_ij = -5 => perfectly valid entering cell."
  },
  {
    question: "How does identifying the entering cell in MODI mirror the pivot column selection in the standard Simplex Tableau?",
    shortAnswer: "The entering cell corresponds to the non-basic column with the most negative reduced cost (c_j - z_j < 0) in the top row of a simplex tableau.",
    explanation: "In general simplex, the most negative indicator in row 0 determines the entering non-basic column.",
    hint: "Identical to selecting the pivot column in the simplex method.",
    level: "expert",
    codeExample: "Simplex analog: Pivot Column = argmin { c_j - z_j }."
  },
  {
    question: "Suppose Mahima in Barrackpore identifies cell (2, 3) as the entering variable with d_23 = -₹7. What is the immediate next step in the MODI algorithm?",
    shortAnswer: "Construct the unique closed stepping-stone loop starting from cell (2, 3) using existing basic cells as turning corners.",
    explanation: "Step 5 (loop construction) immediately follows entering variable identification.",
    hint: "Construct the closed loop starting at the entering cell.",
    level: "moderate",
    codeExample: "Next Step: traceClosedLoop(entering_cell=(2, 3))."
  },
  {
    question: "Why is it mathematically impossible for an entering cell to have more than one unique closed loop through the existing basic cells?",
    shortAnswer: "Because the m + n - 1 basic cells form a spanning tree (acyclic graph); adding exactly ONE edge to an acyclic tree creates exactly ONE unique cycle.",
    explanation: "By fundamental graph theory, adding an edge to a tree creates a unique fundamental cycle.",
    hint: "Adding one edge to a spanning tree creates exactly one cycle.",
    level: "expert",
    codeExample: "Graph Theory Theorem: Spanning Tree + 1 Edge = Exactly 1 Unique Cycle."
  },
  {
    question: "Suppose Abhronila in Jadavpur finds three negative evaluations: d_11 = -₹1, d_22 = -₹5, d_33 = -₹2. What is the entering cell?",
    shortAnswer: "Cell (2, 2) with d_22 = -₹5.",
    explanation: "min(-1, -5, -2) = -5 at cell (2, 2).",
    hint: "-5 is the minimum.",
    level: "moderate",
    codeExample: "Entering Cell = (2, 2)"
  },
  {
    question: "What is the common student mistake when selecting the entering cell among [-8, -3, +1, +7]?",
    shortAnswer: "Confusing -3 as 'smaller in magnitude' and mistakenly selecting -3 instead of the most negative value -8.",
    explanation: "On the real number line, -8 < -3. The minimum value is -8.",
    hint: "-8 is less than -3 on the number line.",
    level: "moderate",
    codeExample: "Correct: -8 < -3; Incorrect: selecting -3."
  },
  {
    question: "If an analyst is writing an automated Python/C++ solver for MODI, what standard library function identifies the entering cell?",
    shortAnswer: "Using `min()` with a custom key or `numpy.argmin()` across the 2D opportunity cost array masked to non-basic cells.",
    explanation: "Find the coordinates (i, j) that minimize the array of non-basic d_ij values.",
    hint: "numpy.argmin() on masked opportunity cost matrix.",
    level: "intermediate",
    codeExample: "enter_i, enter_j = np.unravel_index(np.argmin(d_matrix), d_matrix.shape)"
  },
  {
    question: "Why should an operations manager explain the entering cell selection to corporate executives in terms of 'marginal profit'?",
    shortAnswer: "Because executives understand that activating the route with the highest marginal saving generates the fastest cash flow improvement per truck dispatched.",
    explanation: "Marginal profit framing connects mathematical gradients to business ROI.",
    hint: "Framing as marginal profit clarifies business ROI.",
    level: "intermediate",
    codeExample: "Executive Framing: 'Route (2,1) gives ₹8/ton marginal cash savings.'"
  },
  {
    question: "Suppose Debangshu finds that after entering cell (2, 1), the total transportation cost drops by ₹480. What was the formula used?",
    shortAnswer: "Delta Z = theta * d_21 = 60 tons * (-₹8/ton) = -₹480 (a ₹480 reduction).",
    explanation: "Total cost decreases by the transferred tonnage multiplied by the unit opportunity cost.",
    hint: "Reduction = transfer quantity multiplied by unit saving.",
    level: "moderate",
    codeExample: "Delta Z = 60 * (-8) = -₹480"
  },
  {
    question: "Can two cells enter the basis simultaneously in a single MODI iteration?",
    shortAnswer: "No, standard simplex algorithms enter exactly ONE variable at a time to maintain clean basis inversion and avoid singular matrix updates.",
    explanation: "One-variable-at-a-time pivoting ensures continuous linear independence across vertices.",
    hint: "Exactly one entering cell per iteration.",
    level: "expert",
    codeExample: "Rule: Exactly 1 entering cell and 1 leaving cell per iteration."
  },
  {
    question: "What happens if all non-basic cells have d_ij >= 0, but a user attempts to force an entering cell anyway?",
    shortAnswer: "No entering cell exists; forcing an allocation into any empty cell will increase or preserve total cost, violating optimality.",
    explanation: "When all d_ij >= 0, the candidate set { (i,j) | d_ij < 0 } is empty.",
    hint: "Candidate set is empty when all d_ij >= 0.",
    level: "moderate",
    codeExample: "if len(negative_cells) == 0: return 'Optimal - No Entering Cell';"
  },
  {
    question: "How does identifying the entering cell prevent cycling in the MODI method?",
    shortAnswer: "By combining the most negative d_ij rule with consistent tie-breaking (Bland's smallest index rule), cycling through previously visited bases is mathematically prevented.",
    explanation: "Deterministic tie-breaking rules guarantee finite termination.",
    hint: "Bland's rule with most negative d_ij prevents basis cycling.",
    level: "expert",
    codeExample: "Anti-cycling: Apply Bland's smallest row/col index rule on ties."
  },
  {
    question: "Suppose Susmita has a 3x3 problem with d = [-2, -2, -2, +5]. How many candidate entering cells exist?",
    shortAnswer: "3 candidate entering cells (all tied at d = -2).",
    explanation: "Any of the three negative cells is a valid entering candidate.",
    hint: "3 cells have negative evaluations.",
    level: "moderate",
    codeExample: "Candidates = 3 (tied at d = -2)."
  },
  {
    question: "In the above tie scenario, which candidate should Susmita test first?",
    shortAnswer: "Test the transfer quantity θ for each of the 3 candidates and choose the one yielding the largest product θ * 2.",
    explanation: "Maximizing the one-step objective reduction accelerates convergence.",
    hint: "Test transfer quantity θ for each tied candidate.",
    level: "expert",
    codeExample: "Selected = argmax { theta_1, theta_2, theta_3 }."
  },
  {
    question: "What is the relationship between the entering cell and the 'Leaving Cell' determined later in Step 5?",
    shortAnswer: "The entering cell is the newly opened route receiving +θ units; the leaving cell is the existing basic route that drops to 0 units and is removed from the basis to maintain m + n - 1 basic variables.",
    explanation: "One enters (+θ); one leaves (drops to 0).",
    hint: "Entering cell adds +θ; leaving cell drops to 0.",
    level: "moderate",
    codeExample: "Basis Transition: Basis_new = (Basis_old union {Entering}) setminus {Leaving}."
  },
  {
    question: "Why is identifying the entering cell considered the pivotal decision point of each MODI iteration?",
    shortAnswer: "Because it dictates the entire geometry of the closed stepping-stone loop and determines which transport lanes will be reallocated.",
    explanation: "The entering cell is the root vertex from which the entire cycle is constructed.",
    hint: "Determines the geometry of the entire stepping-stone loop.",
    level: "intermediate",
    codeExample: "Entering Cell -> Root of the Fundamental Cycle."
  },
  {
    question: "What is the ultimate golden rule for identifying entering cells in the MODI method?",
    shortAnswer: "'Scan all empty cells; select the MOST NEGATIVE opportunity cost d_ij = min(d < 0); if tied, pick the largest transfer θ; if all d ≥ 0, declare victory!'",
    explanation: "This complete rule guarantees flawless entering cell selection in every scenario.",
    hint: "Most negative d -> largest θ if tied -> victory if all d >= 0.",
    level: "moderate",
    codeExample: "Golden Rule: min(d_ij < 0) -> Entering Cell."
  }
];

export default questions;
