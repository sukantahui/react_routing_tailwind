// topic9_questions.js
// 30 High-Yield Short Questions for Topic 9 (VAM Mastery & Rapid Revision)

const questions = [
  {
    question: "What is the primary objective of Vogel's Approximation Method (VAM) in Linear Programming?",
    shortAnswer: "To construct a high-quality Initial Basic Feasible Solution (IBFS) that minimizes initial transportation costs by evaluating penalty (regret) costs.",
    explanation: "VAM evaluates the financial opportunity cost of not allocating to the cheapest route in each row and column, creating starting solutions that are often within 1-2% of global optimality.",
    hint: "Think initial feasible starting solution with minimal total freight cost.",
    level: "moderate",
    codeExample: "Objective: Find IBFS such that Z = sum(c_ij * x_ij) is minimized."
  },
  {
    question: "How is a line penalty mathematically computed in VAM?",
    shortAnswer: "Penalty = (Second Lowest Unit Cost) - (Lowest Unit Cost) for all active cells in that row or column.",
    explanation: "P_i = c_(i,2) - c_(i,1) for Row i, and P_j = c_(2,j) - c_(1,j) for Column j.",
    hint: "Subtract the smallest cost from the second smallest cost.",
    level: "moderate",
    codeExample: "Penalty = c_second_min - c_min"
  },
  {
    question: "What does a line penalty represent in economic decision theory?",
    shortAnswer: "The marginal opportunity cost (regret) incurred per unit if the cheapest shipping route in that line is missed.",
    explanation: "It measures the financial hazard of procrastination: how much extra freight cost will be suffered if allocation to this line is delayed.",
    hint: "Penalty = cost of missing the #1 best option.",
    level: "moderate",
    codeExample: "Regret = c(Alternative) - c(Best)"
  },
  {
    question: "Which line (row or column) is selected for allocation in each VAM iteration?",
    shortAnswer: "The line corresponding to the MAXIMUM penalty: L* = argmax { P_all }.",
    explanation: "The line with the largest penalty has the greatest risk of financial loss and must be protected first.",
    hint: "Pick the largest penalty value across all rows and columns.",
    level: "moderate",
    codeExample: "Winning Line L* = max(P_rows, P_cols)"
  },
  {
    question: "Inside the winning maximum penalty line, which specific cell receives the allocation?",
    shortAnswer: "The cell with the absolute LOWEST unit transportation cost min(c_ij) in that line.",
    explanation: "Max penalty selects the line of action; min unit cost selects the cell to capture the rate advantage.",
    hint: "Cheapest cell in the chosen line.",
    level: "moderate",
    codeExample: "Target Cell = argmin_{in L*} c_ij"
  },
  {
    question: "What quantity is allocated to the target cell (k, l)?",
    shortAnswer: "x_kl = min(Supply_k, Demand_l).",
    explanation: "Allocates the maximum allowable units without exceeding supplier capacity or customer demand.",
    hint: "Smaller of remaining supply and remaining demand.",
    level: "moderate",
    codeExample: "x_kl = min(S_k, D_l)"
  },
  {
    question: "What is the primary tie-breaking rule when multiple lines share the identical maximum penalty?",
    shortAnswer: "Tier 1: Select the line containing the smaller minimum unit cost min(c_ij).",
    explanation: "Comparing min unit costs ensures the allocator prioritizes the line offering the cheaper absolute rate.",
    hint: "Choose the line with the lower minimum cost.",
    level: "expert",
    codeExample: "Tier 1: L* = argmin { min_cost(Line_k) }"
  },
  {
    question: "What is the secondary tie-breaking rule if minimum unit costs are also identical?",
    shortAnswer: "Tier 2: Select the cell that accommodates the larger allocation volume min(S_i, D_j).",
    explanation: "Allocating to the cell that absorbs greater volume clears capacity faster at the favorable rate.",
    hint: "Choose the cell with the larger allocation volume.",
    level: "expert",
    codeExample: "Tier 2: L* = argmax { min(S_i, D_j) }"
  },
  {
    question: "Why must penalties be recalculated after every single allocation step?",
    shortAnswer: "Because crossing out an exhausted line alters the active candidate set, changing the 1st and/or 2nd lowest costs in intersecting lines.",
    explanation: "Eliminating a row or column shifts the remaining alternatives, creating new penalty differences.",
    hint: "Remaining sub-matrix options change after each cross-out.",
    level: "moderate",
    codeExample: "Rule: Recalculate P_i' and P_j' for the reduced active sub-matrix."
  },
  {
    question: "How is an unbalanced transportation problem with excess supply (Sum S_i > Sum D_j) balanced?",
    shortAnswer: "By adding a Dummy Destination Column with demand D_dummy = Sum S_i - Sum D_j and unit costs ₹0.",
    explanation: "The dummy column absorbs excess capacity with zero financial cost.",
    hint: "Add a dummy column with demand = supply - demand and cost = 0.",
    level: "moderate",
    codeExample: "D_dummy = Sum(S) - Sum(D); c_i,dummy = 0"
  },
  {
    question: "How is an unbalanced problem with excess demand (Sum D_j > Sum S_i) balanced?",
    shortAnswer: "By adding a Dummy Origin Row with supply S_dummy = Sum D_j - Sum S_i and unit costs ₹0.",
    explanation: "The dummy row absorbs unmet customer shortages with zero financial cost.",
    hint: "Add a dummy row with supply = demand - supply and cost = 0.",
    level: "moderate",
    codeExample: "S_dummy = Sum(D) - Sum(S); c_dummy,j = 0"
  },
  {
    question: "What is the managerial meaning of shipments allocated to a dummy destination?",
    shortAnswer: "Unsold surplus inventory that remains stored in the origin warehouse.",
    explanation: "It represents goods produced but not dispatched.",
    hint: "Retained warehouse stock.",
    level: "moderate",
    codeExample: "Dummy destination allocation = unsold surplus inventory."
  },
  {
    question: "What is the managerial meaning of shipments allocated from a dummy origin?",
    shortAnswer: "Unmet customer shortages or delayed backorders.",
    explanation: "It represents customer demand that cannot be fulfilled due to production deficits.",
    hint: "Customer order shortfall.",
    level: "moderate",
    codeExample: "Dummy origin allocation = customer deficit / shortage."
  },
  {
    question: "What is the formula for the required number of basic cells in an m x n transportation tableau?",
    shortAnswer: "Exactly m + n - 1 basic cells.",
    explanation: "An m x n tableau has m + n linear constraints with 1 redundant equation, leaving m + n - 1 independent basic variables.",
    hint: "Rows + Columns - 1.",
    level: "moderate",
    codeExample: "Basic Cells = m + n - 1"
  },
  {
    question: "What is 'Degeneracy' in a transportation problem?",
    shortAnswer: "A condition where the number of allocated basic cells is strictly less than m + n - 1, or where a basic variable equals zero.",
    explanation: "Degeneracy leaves the system of equations u_i + v_j = c_ij underdetermined, preventing standard MODI solving.",
    hint: "Fewer than m + n - 1 basic variables.",
    level: "moderate",
    codeExample: "Count(Basic Cells) < m + n - 1 => Degenerate."
  },
  {
    question: "How is degeneracy resolved using the Epsilon (ε) perturbation method?",
    shortAnswer: "Assign an infinitesimally small positive quantity ε to an independent (loop-free) cell having the lowest unit cost.",
    explanation: "Epsilon restores the basis count to m + n - 1 without altering capacity balances or total cost Z.",
    hint: "Place a tiny ε in an independent, cheap cell.",
    level: "expert",
    codeExample: "x_ij = ε (where ε > 0, ε → 0); Cost impact = 0."
  },
  {
    question: "What is a 'closed loop' and why must an epsilon cell be loop-free?",
    shortAnswer: "A closed loop is a rectangular cycle through basic cells; placing ε in a loop creates linear dependence and contradictory equations.",
    explanation: "Basis vectors must be linearly independent, which requires the allocation graph to be an open spanning tree.",
    hint: "A closed rectangle through basic cells violates linear independence.",
    level: "expert",
    codeExample: "Acyclic condition: Basis graph contains NO closed cycles."
  },
  {
    question: "How is the total initial transportation cost Z computed?",
    shortAnswer: "Z = sum_{all basic cells} (c_ij * x_ij) in Indian Rupees (₹).",
    explanation: "Multiply each allocated quantity by its unit transportation cost and sum all products.",
    hint: "Sum of (Quantity * Rate) across occupied cells.",
    level: "moderate",
    codeExample: "Z = sum(c_ij * x_ij)"
  },
  {
    question: "Why is the North-West Corner Rule (NWCR) inferior to VAM?",
    shortAnswer: "Because NWCR is completely cost-blind and allocates based purely on spatial coordinates, often resulting in 30-50% higher freight bills.",
    explanation: "NWCR ignores cost entries entirely, while VAM evaluates opportunity cost gradients.",
    hint: "NWCR ignores shipping costs; VAM minimizes regret.",
    level: "moderate",
    codeExample: "Cost(VAM) << Cost(NWCR)"
  },
  {
    question: "Why is Matrix Minima (Least Cost) inferior to VAM?",
    shortAnswer: "Because Matrix Minima is myopic: it picks the cheapest single cell right now without checking if doing so creates catastrophic penalties in remaining lines.",
    explanation: "Matrix Minima lacks lookahead; VAM incorporates 1-step regret defense.",
    hint: "Matrix Minima is myopic greedy; VAM evaluates opportunity cost gaps.",
    level: "expert",
    codeExample: "VAM evaluates penalty gaps to avoid greedy traps."
  },
  {
    question: "What is the penalty of a row with costs [₹5, ₹12, ₹5, ₹18]?",
    shortAnswer: "₹0 (₹5 - ₹5 = ₹0).",
    explanation: "Lowest is ₹5, second-lowest is ₹5. Difference is ₹5 - ₹5 = ₹0.",
    hint: "Two identical lowest numbers give 0 difference.",
    level: "moderate",
    codeExample: "P = 5 - 5 = ₹0"
  },
  {
    question: "What happens when only one cell remains in an active row or column?",
    shortAnswer: "Penalty is undefined (written as '—'); remaining units are assigned to that cell directly.",
    explanation: "No second choice exists, making penalty calculation impossible and unnecessary.",
    hint: "Single cell = mandatory allocation.",
    level: "moderate",
    codeExample: "Single cell remaining → allocate directly; penalty = '—'."
  },
  {
    question: "How does the MODI method use the VAM initial solution?",
    shortAnswer: "MODI takes VAM's basic cells, solves for dual multipliers u_i and v_j, and checks if all non-basic opportunity costs d_ij = c_ij - u_i - v_j are >= 0.",
    explanation: "VAM provides the starting basis; MODI tests and proves global optimality.",
    hint: "VAM provides the starting point for u-v multiplier testing.",
    level: "expert",
    codeExample: "MODI: u_i + v_j = c_ij for basic; d_ij = c_ij - u_i - v_j for non-basic."
  },
  {
    question: "What is the Subset Rim Theorem?",
    shortAnswer: "Degeneracy occurs if and only if the sum of supplies for a proper subset of origins equals the sum of demands for a proper subset of destinations.",
    explanation: "Partial subset balance isolates a sub-network, triggering simultaneous row-column exhaustion.",
    hint: "Sum of a sub-group of supplies equals sum of a sub-group of demands.",
    level: "expert",
    codeExample: "exists I, J: sum_{i in I} S_i == sum_{j in J} D_j"
  },
  {
    question: "Why should students always write margin headers P_R(1), P_R(2)... on the right and P_C(1), P_C(2)... at the bottom?",
    shortAnswer: "To maintain an auditable multi-pass progression record and prevent confusion during sequential recalculations.",
    explanation: "Preserving multi-pass margin columns allows technical auditors to verify every decision pass.",
    hint: "Margin columns document the full calculation history.",
    level: "intermediate",
    codeExample: "Margin Layout: [Supply | P_R(1) | P_R(2) | P_R(3)]"
  },
  {
    question: "If Debangshu solves a 3x3 problem and gets Z = ₹2,060, while NWCR gave Z = ₹2,740, what is the savings?",
    shortAnswer: "₹680 savings (24.8% reduction in freight expenditure).",
    explanation: "Savings = ₹2,740 - ₹2,060 = ₹680 (24.8% savings).",
    hint: "2740 - 2060 = 680.",
    level: "moderate",
    codeExample: "Savings = ₹2,740 - ₹2,060 = ₹680"
  },
  {
    question: "Can an allocation in VAM ever be negative (x_ij < 0)?",
    shortAnswer: "No, because all initial supplies and demands are non-negative, and min(S_k, D_l) is strictly non-negative.",
    explanation: "Non-negativity constraint x_ij >= 0 is unconditionally satisfied.",
    hint: "min(non-negative, non-negative) is non-negative.",
    level: "moderate",
    codeExample: "x_ij >= 0 for all i, j."
  },
  {
    question: "What is the time complexity of the complete VAM algorithm for an m x n matrix?",
    shortAnswer: "O((m + n) * m * n) total arithmetic operations.",
    explanation: "There are at most m + n - 1 passes, each taking O(mn) work.",
    hint: "(m + n) passes multiplied by O(mn) work.",
    level: "expert",
    codeExample: "Complexity = O((m + n) * m * n)"
  },
  {
    question: "What is the golden rule of Vogel's Approximation Method?",
    shortAnswer: "'Select the HIGHEST penalty to pick the line; select the LOWEST cost to pick the cell.'",
    explanation: "This principle combines regret defense with immediate cost minimization.",
    hint: "Max penalty for line, min cost for cell.",
    level: "moderate",
    codeExample: "Max(Penalty) → Line; Min(Cost) → Cell."
  },
  {
    question: "Why is mastering VAM essential for career growth in operations research and logistics engineering?",
    shortAnswer: "Because it provides the intuitive foundation for network optimization, LP duality, dual simplex algorithms, and multi-million-rupee supply chain dispatching.",
    explanation: "VAM connects practical economic trade-offs with rigorous mathematical programming theorems.",
    hint: "Bridges practical logistics economics with advanced LP duality.",
    level: "expert",
    codeExample: "Career Impact: Supply Chain Optimization + Linear Programming Mastery."
  }
];

export default questions;
