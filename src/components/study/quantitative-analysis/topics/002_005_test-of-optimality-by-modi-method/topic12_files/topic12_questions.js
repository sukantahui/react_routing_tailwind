// topic12_questions.js
// 30 Moderate to Expert Short & Conceptual Exam Review Questions for the MODI Method

const questions = [
  {
    question: "What does the acronym 'MODI' stand for in operations research?",
    shortAnswer: "Modified Distribution Method (also universally known as the u-v Method or Dual Potential Method).",
    explanation: "MODI is the specialized simplex-based algorithm for testing and establishing the global optimality of transportation solutions.",
    hint: "Modified Distribution Method.",
    level: "moderate",
    codeExample: "MODI = Modified Distribution Method (u-v Method)."
  },
  {
    question: "What is the primary prerequisite condition before applying the MODI method to an Initial Basic Feasible Solution (IBFS)?",
    shortAnswer: "The initial solution must be NON-DEGENERATE (containing exactly m + n - 1 basic cells in independent, loop-free positions).",
    explanation: "Having m + n - 1 independent basic cells ensures the spanning tree is connected, allowing all u_i and v_j potentials to be solved.",
    hint: "Exact allocation count: m + n - 1 basic cells.",
    level: "moderate",
    codeExample: "Prerequisite: Count(BasicCells) === m + n - 1."
  },
  {
    question: "What fundamental linear programming theorem guarantees that u_i + v_j = c_ij for all basic cells?",
    shortAnswer: "The Complementary Slackness Theorem of Linear Programming.",
    explanation: "Whenever a primal variable is positive (x_ij > 0), its associated dual constraint must hold with strict equality.",
    hint: "Complementary Slackness Theorem.",
    level: "expert",
    codeExample: "x_ij > 0 => u_i + v_j = c_ij"
  },
  {
    question: "Why does an m x n transportation problem have exactly ONE degree of freedom when solving for u_i and v_j potentials?",
    shortAnswer: "Because there are m + n unknown potentials (m row potentials + n column potentials) and only m + n - 1 basic cell equations.",
    explanation: "Total supply equals total demand makes one equation redundant, leaving 1 degree of freedom that requires setting an arbitrary reference (e.g. u_1 = 0).",
    hint: "Unknowns (m+n) minus Equations (m+n-1) = 1 degree of freedom.",
    level: "moderate",
    codeExample: "DegreesOfFreedom = (m + n) - (m + n - 1) = 1"
  },
  {
    question: "What is the Invariance Property of the u-v potentials?",
    shortAnswer: "Adding a constant k to all u_i and subtracting k from all v_j preserves the sum u_i + v_j and leaves all opportunity costs d_ij 100% unchanged.",
    explanation: "(u_i + k) + (v_j - k) = u_i + v_j; therefore, d_ij = c_ij - (u_i + v_j) is completely invariant to the choice of starting anchor.",
    hint: "Scalar shifts do not change opportunity costs d_ij.",
    level: "expert",
    codeExample: "Invariance: d_ij' = c_ij - (u_i + k + v_j - k) = d_ij."
  },
  {
    question: "What is the formula for the Opportunity Cost (Net Evaluation Index) d_ij of an empty cell (i, j)?",
    shortAnswer: "d_ij = c_ij - (u_i + v_j).",
    explanation: "d_ij equals the direct unit freight rate minus the implied network shadow cost.",
    hint: "d_ij = c_ij - (u_i + v_j).",
    level: "moderate",
    codeExample: "d_ij = c_ij - (u_i + v_j)"
  },
  {
    question: "What is the economic interpretation of d_ij > 0, d_ij = 0, and d_ij < 0?",
    shortAnswer: "d_ij > 0: Route is economically uncompetitive (keep empty); d_ij = 0: Alternative optimal route exists; d_ij < 0: Cost-reducing route (candidate to enter basis).",
    explanation: "d_ij measures the marginal change in total objective cost per unit allocated.",
    hint: ">0 = keep empty, =0 = alt optima, <0 = entering candidate.",
    level: "moderate",
    codeExample: "d > 0 (Cost Increase), d === 0 (Alt Optima), d < 0 (Cost Reduction)."
  },
  {
    question: "What is the exact condition for Global Optimality in the MODI method?",
    shortAnswer: "All opportunity costs must be non-negative: d_ij = c_ij - (u_i + v_j) >= 0 for all non-basic cells (i, j).",
    explanation: "When all d_ij >= 0, the dual solution is feasible (u_i + v_j <= c_ij) and total cost Z is minimal.",
    hint: "All d_ij >= 0.",
    level: "moderate",
    codeExample: "Optimal iff forall (i, j) in NonBasic: d_ij >= 0."
  },
  {
    question: "Which rule is used to select the Entering Variable when multiple opportunity costs are negative?",
    shortAnswer: "Dantzig's Rule: Select the cell with the MOST NEGATIVE opportunity cost: Entering Cell = argmin { d_ij | d_ij < 0 }.",
    explanation: "The most negative d_ij provides the steepest descent gradient per unit transferred.",
    hint: "Pick the most negative d_ij.",
    level: "moderate",
    codeExample: "Entering Cell = argmin(d_ij < 0)"
  },
  {
    question: "Why must a stepping-stone closed loop make 90-degree turns ONLY on occupied basic cells?",
    shortAnswer: "Because turns reallocate existing flow; turning at an empty cell would subtract cargo from a zero allocation, creating physically impossible negative tonnage.",
    explanation: "Non-negativity (x_ij >= 0) restricts turning corners to positive basic allocations.",
    hint: "Turning corners must be occupied basic cells to maintain non-negativity.",
    level: "moderate",
    codeExample: "Corner Rule: All vertices except the entering cell must be in BasicCells."
  },
  {
    question: "Can a closed loop have an odd number of corners (vertices)?",
    shortAnswer: "No, a closed loop must always have an EVEN number of corners (4, 6, 8...) to allow alternating horizontal and vertical segments.",
    explanation: "Returning to the starting row and column in a 2D grid requires an equal number of horizontal and vertical steps.",
    hint: "Always an even number of corners (4, 6, 8...).",
    level: "moderate",
    codeExample: "Vertices Count = 2k (where k >= 2)."
  },
  {
    question: "Which sign is ALWAYS assigned to the entering cell in the plus-minus allocation pattern?",
    shortAnswer: "The PLUS (+θ) sign.",
    explanation: "The entering cell starts at 0 and needs +θ to become an active basic variable.",
    hint: "Entering cell always receives +θ.",
    level: "moderate",
    codeExample: "x_enter_new = 0 + theta = +theta"
  },
  {
    question: "What is the formula for the maximum allowable transfer flow theta (θ)?",
    shortAnswer: "θ = min { x_ij | (i, j) is a MINUS (-) corner vertex of the loop }.",
    explanation: "θ is bounded by the smallest allocation among minus corners to prevent allocations from becoming negative.",
    hint: "θ = min(allocations at minus corners).",
    level: "moderate",
    codeExample: "theta = min(x_minus_corners)"
  },
  {
    question: "What is the 'Leaving Variable' in a MODI iteration?",
    shortAnswer: "The basic cell at a minus corner that achieves x_ij - θ = 0, dropping to zero allocation and exiting the basis.",
    explanation: "The dropping cell leaves the basis to maintain exactly m + n - 1 basic variables.",
    hint: "The minus corner that drops to zero exits the basis.",
    level: "moderate",
    codeExample: "Leaving Cell = argmin(x_minus_corners)"
  },
  {
    question: "How is a tie broken if two minus corners reach zero allocation simultaneously?",
    shortAnswer: "Drop EXACTLY ONE cell from the basis; retain the other tied cell(s) in the basis with an allocation of 0 (degenerate basic cell).",
    explanation: "Dropping both would reduce the basic variable count to m + n - 2, causing degeneracy and breaking spanning tree connectivity.",
    hint: "Drop only 1 cell to empty; retain the other with allocation 0.",
    level: "expert",
    codeExample: "Tie Protocol: Drop 1 cell; retain 1 cell in basis with x = 0."
  },
  {
    question: "What is the formula for the cost reduction achieved on a single iteration pivot?",
    shortAnswer: "Delta Z = θ * d_enter (Total cost decreases by θ * |d_enter| Rupees).",
    explanation: "Each unit transferred saves |d_enter| Rupees.",
    hint: "Savings = theta * |d_enter|.",
    level: "moderate",
    codeExample: "Delta Z = theta * d_enter"
  },
  {
    question: "In the 3x3 Foundry Problem, what is the certified minimum total transportation cost Z* in Indian Rupees?",
    shortAnswer: "Z* = ₹2,060.",
    explanation: "(70*14) + (60*5) + (30*10) + (10*13) + (50*7) = 980 + 300 + 300 + 130 + 350 = ₹2,060.",
    hint: "Z* = ₹2,060.",
    level: "moderate",
    codeExample: "Z_opt = ₹2,060"
  },
  {
    question: "In the Foundry Problem, what was the total enterprise savings achieved by MODI over the untested initial NWCR plan (Z_0 = ₹2,740)?",
    shortAnswer: "₹680 per batch (a 24.82% cost reduction).",
    explanation: "₹2,740 - ₹2,060 = ₹680 savings (680/2740 = 24.82%).",
    hint: "2740 - 2060 = ₹680 (24.82%).",
    level: "moderate",
    codeExample: "Savings = 2740 - 2060 = ₹680 (24.82%)"
  },
  {
    question: "How does the Strong Duality Theorem verify that Z* = ₹2,060 is 100% optimal?",
    shortAnswer: "Because the Primal Minimum Cost Z* = ₹2,060 exactly equals the Dual Maximum Objective W* = ₹2,060 (Zero Duality Gap).",
    explanation: "Zero duality gap provides unassailable mathematical proof of global minimality.",
    hint: "Primal cost equals Dual objective (Zero Duality Gap).",
    level: "expert",
    codeExample: "Strong Duality: Z_primal == W_dual => Globally Optimal."
  },
  {
    question: "What is the primary operational advantage of the MODI method over the Stepping-Stone method?",
    shortAnswer: "MODI calculates opportunity costs algebraically for all empty cells in O(mn) time, tracing a loop ONLY ONCE per iteration for the winning entering cell, whereas Stepping-Stone traces separate loops for every empty cell.",
    explanation: "MODI eliminates (m-1)(n-1) - 1 unnecessary loop drawings per iteration.",
    hint: "MODI traces 1 loop per iteration instead of (m-1)(n-1) loops.",
    level: "intermediate",
    codeExample: "MODI Complexity: O(mn) vs Stepping-Stone Complexity: O(m^2 n^2)."
  },
  {
    question: "How is an unbalanced transportation problem (Total Supply != Total Demand) handled in the MODI method?",
    shortAnswer: "By introducing an artificial Dummy Row or Dummy Column with zero unit transportation costs (c_ij = ₹0) and demand/supply equal to the deficit.",
    explanation: "Dummy cells participate fully in potential and opportunity cost calculations, with zero contribution to physical monetary cost.",
    hint: "Add a dummy row/column with unit costs of ₹0.",
    level: "moderate",
    codeExample: "Unbalanced: Add Dummy row/col with cost = ₹0."
  },
  {
    question: "How is degeneracy (Basic Cells < m + n - 1) resolved in the MODI method?",
    shortAnswer: "By allocating an infinitesimal quantity epsilon (ε ≈ 0) to an independent, loop-free empty cell to restore the basic cell count to m + n - 1.",
    explanation: "Epsilon restores spanning tree connectivity without altering physical shipment quantities or total cost Z.",
    hint: "Place epsilon ε in an independent loop-free cell.",
    level: "expert",
    codeExample: "Degeneracy fix: Insert epsilon ε at independent cell position."
  },
  {
    question: "Can dual potentials u_i and v_j be negative numbers?",
    shortAnswer: "Yes, u_i and v_j are UNRESTRICTED in sign and can assume positive, negative, or zero values.",
    explanation: "Dual variables corresponding to equality constraints are unrestricted in sign.",
    hint: "Potentials are unrestricted in sign.",
    level: "moderate",
    codeExample: "u_i in Real Numbers, v_j in Real Numbers."
  },
  {
    question: "What does an opportunity cost of d_ij = 0 in the optimal tableau indicate?",
    shortAnswer: "It indicates the presence of Alternative (Multiple) Optimal Solutions with the exact same minimum total cost Z*.",
    explanation: "Pivoting flow into cell (i, j) produces a different valid routing manifest without increasing expenditure.",
    hint: "Indicates alternative optimal solutions at identical minimal cost.",
    level: "moderate",
    codeExample: "d === 0 => Alternative Optimal Solution exists."
  },
  {
    question: "What is the physical meaning of 'Monotonic Convergence' in repeated MODI iterations?",
    shortAnswer: "Total transportation cost strictly decreases (Z_0 > Z_1 > Z_2 ... > Z*) at every non-degenerate iteration, steadily marching toward the global minimum.",
    explanation: "Simplex pivots guarantee non-increasing objective values.",
    hint: "Cost strictly decreases at each non-degenerate iteration.",
    level: "moderate",
    codeExample: "Monotonicity: Z_k+1 < Z_k for all non-degenerate pivots."
  },
  {
    question: "What three conditions must hold for an improved tableau to be valid?",
    shortAnswer: "1. Row sums == S_i; 2. Column sums == D_j; 3. Basic cell count == m + n - 1 (with all x_ij >= 0).",
    explanation: "These 3 invariants verify primal feasibility and basis non-degeneracy.",
    hint: "Row sums, column sums, and basic cell count (m+n-1).",
    level: "intermediate",
    codeExample: "Valid Tableau: (RowSums == S) && (ColSums == D) && (Count == m+n-1)."
  },
  {
    question: "Why is VAM considered the best initial heuristic to pair with the MODI method?",
    shortAnswer: "Because VAM's penalty-driven heuristic starts very close to (or directly at) the optimal basis, requiring 0 to 1 MODI iterations compared to 2 to 4 for NWCR.",
    explanation: "Minimizing initial regret minimizes subsequent simplex pivots.",
    hint: "VAM starts closest to optimal, requiring 0-1 iterations.",
    level: "intermediate",
    codeExample: "Efficiency: VAM (0-1 iter) vs NWCR (2-4 iter)."
  },
  {
    question: "What is the formal concluding statement required on university examinations when stating the final result of the MODI method?",
    shortAnswer: "'Since all opportunity costs satisfy d_ij = c_ij - (u_i + v_j) >= 0, the optimality condition is satisfied. The optimal transportation schedule is: [List of routes and quantities], with Certified Minimum Total Transportation Cost Z* = ₹X,XXX.'",
    explanation: "This clear formal statement ensures full marks on academic examinations.",
    hint: "State optimality condition, list allocations, and state minimum cost in ₹.",
    level: "intermediate",
    codeExample: "Exam Conclusion: 'All d_ij >= 0. Certified Minimum Cost Z* = ₹2,060.'"
  },
  {
    question: "Why is mastering the MODI method vital for operations researchers in West Bengal?",
    shortAnswer: "Because it provides mathematical proof of absolute minimal freight spend for multi-depot industrial networks across Barrackpore, Kolkata, Ichapur, and Howrah.",
    explanation: "It transforms complex multi-million rupee logistics budgets into provably minimal schedules.",
    hint: "Provides mathematical certainty of minimal logistics expenditure.",
    level: "intermediate",
    codeExample: "Strategic Value: 100% Certified Minimum Freight Expenditure."
  },
  {
    question: "What is the ultimate golden rule of the MODI method?",
    shortAnswer: "'Set u_1=0; solve u_i+v_j=c_ij on basic cells; compute d_ij=c_ij-(u_i+v_j) on empty cells; if all d>=0 STOP (Optimal!); if any d<0, pivot closed loop with θ=min(x_minus); repeat until optimal!'",
    explanation: "This single golden rule encapsulates the entire 5-step MODI optimization engine.",
    hint: "u_1=0 -> u+v=c -> d=c-(u+v) -> check d>=0 -> pivot loop -> repeat.",
    level: "moderate",
    codeExample: "Golden Rule: (1) u_1=0 -> (2) u+v=c -> (3) d=c-(u+v) -> (4) all d>=0? -> (5) Loop Pivot."
  }
];

export default questions;
