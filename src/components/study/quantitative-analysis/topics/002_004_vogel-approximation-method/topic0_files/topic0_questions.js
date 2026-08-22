// topic0_questions.js
// 30 Moderate to Expert Questions on the Concept of Penalty in Vogel's Approximation Method (VAM)

const questions = [
  {
    question: "What is the foundational definition of a 'penalty' (also known as regret or opportunity cost) in Vogel's Approximation Method (VAM)?",
    shortAnswer: "The penalty for a row or column is the numerical difference between its lowest unit cost and its next-to-lowest (second smallest) unit cost.",
    explanation: "In VAM, the penalty represents the additional unit cost incurred if the allocator fails to ship via the cheapest available route in that specific row or column and is subsequently forced to allocate to the second-best alternative. Mathematically, for row i with sorted active costs c_(i,1) <= c_(i,2) <= ... <= c_(i,n), the row penalty is P_i = c_(i,2) - c_(i,1).",
    hint: "Think about the financial regret of missing the #1 cheapest option and getting stuck with option #2.",
    level: "moderate",
    codeExample: "Row costs = [₹4, ₹9, ₹12, ₹7] -> Sorted = [₹4, ₹7, ₹9, ₹12] -> Penalty = ₹7 - ₹4 = ₹3/unit"
  },
  {
    question: "Why is the penalty in VAM conceptually referred to as an 'opportunity cost' or 'regret cost'?",
    shortAnswer: "Because it measures the economic loss (penalty) per unit suffered when the best transportation opportunity is forfeited.",
    explanation: "In economic decision theory, opportunity cost is the forgone benefit of the next best alternative. In transportation modeling, if a warehouse's cheapest route is not utilized and its inventory is consumed elsewhere, each unit forced onto the second-cheapest route adds exactly (c_second_lowest - c_lowest) to the total logistics expenditure. Thus, penalty quantifies the risk of procrastination for that line.",
    hint: "Observe carefully what happens to per-unit freight costs if the lowest-cost cell becomes unavailable.",
    level: "moderate",
    codeExample: "Regret = c(Next Best Alternative) - c(Best Alternative)"
  },
  {
    question: "How does the penalty concept in VAM structurally overcome the 'myopic' drawback of the Matrix Minima (Least Cost) method?",
    shortAnswer: "Matrix Minima looks only at absolute lowest costs, while VAM evaluates the cost of potential failure across all lines simultaneously.",
    explanation: "Matrix Minima is a single-cell greedy heuristic: it blindly allocates to the lowest global cost cell even if the second best in that row is only ₹1 higher, while ignoring another row where the best cell is ₹3 but the second best is ₹80 (penalty = ₹77). By prioritizing the line with the maximum penalty, VAM safeguards against catastrophic downstream cost surges.",
    hint: "Compare choosing a ₹2 cell with ₹3 backup vs protecting a ₹4 cell with an impending ₹90 disaster backup.",
    level: "expert",
    codeExample: "Line A: [₹2, ₹3] -> Penalty ₹1 (low hazard). Line B: [₹4, ₹90] -> Penalty ₹86 (critical hazard!). VAM picks Line B."
  },
  {
    question: "If a row has cost entries [₹6, ₹14, ₹6, ₹20], what is its penalty according to standard VAM rules?",
    shortAnswer: "The penalty is ₹0, because the lowest cost (₹6) and the second-lowest cost (₹6) are identical.",
    explanation: "When the minimum unit cost appears more than once in a given row or column, the lowest cost is ₹6 and the second-lowest cost is also ₹6. The difference is ₹6 - ₹6 = ₹0. A penalty of ₹0 signifies that if one ₹6 cell is crossed out, an alternative route of the exact same unit cost remains available, so there is zero immediate financial regret.",
    hint: "Sort the costs in ascending order: [6, 6, 14, 20]. Subtract the first from the second.",
    level: "moderate",
    codeExample: "Sorted: c_(1) = ₹6, c_(2) = ₹6 -> Penalty = c_(2) - c_(1) = 6 - 6 = ₹0"
  },
  {
    question: "What is the penalty rule when only one active cell remains in a particular row or column?",
    shortAnswer: "The penalty is either assigned the remaining cell's cost itself, written as '-' (dash / not applicable), or designated as 0 depending on textbook convention; in standard practice, allocations to sole surviving cells become forced.",
    explanation: "When only one active unallocated cell remains in a row or column, there is no distinct 'second lowest' cost within that line to subtract. In standard computational VAM algorithms, lines with a single remaining cell have their demands satisfied by default to preserve feasibility, or their penalty is treated as their singular unit cost to ensure timely closure.",
    hint: "Try to see if there is any alternative choice left when only one cell is uncrossed.",
    level: "expert",
    codeExample: "Single cell left in Row 1: c_13 = ₹8 -> Penalty = ₹8 (or treated as mandatory basic assignment)."
  },
  {
    question: "Why does VAM calculate penalties for BOTH rows and columns rather than rows alone?",
    shortAnswer: "Because transportation constraints operate symmetrically across supply origins (rows) and demand destinations (columns).",
    explanation: "Supply nodes (origins) compete for destination allocations, while destination nodes (markets) compete for factory supplies. A destination might face a massive regret penalty if denied its cheapest factory, even if none of the factories individually face steep row penalties. Evaluating both dimensions ensures global balance and bidirectional cost control.",
    hint: "Consider a customer city that has only one cheap supplier and multiple very expensive ones.",
    level: "intermediate",
    codeExample: "Total Penalties Evaluated per Iteration = (Active Rows m) + (Active Columns n)"
  },
  {
    question: "What is the economic interpretation of a row having a penalty of ₹50 versus another row having a penalty of ₹2?",
    shortAnswer: "The row with penalty ₹50 represents an urgent risk where delaying allocation costs ₹50/unit, whereas the ₹2 row has negligible delay cost.",
    explanation: "A penalty of ₹50 indicates extreme cost disparity between the optimal and secondary supply routes. If the logistics manager allocates capacity away from this row's primary route, every diverted ton inflates shipping costs by ₹50. The row with a ₹2 penalty has near-substitutable alternatives, allowing the planner to defer it safely.",
    hint: "Think of penalty as an 'urgency score' or 'emergency priority indicator'.",
    level: "moderate",
    codeExample: "Urgency(Row_50) = 25x higher priority than Urgency(Row_2)"
  },
  {
    question: "How does the penalty calculation change in an unbalanced transportation problem before VAM begins?",
    shortAnswer: "A dummy row or dummy column with unit costs of ₹0 must be introduced first to balance total supply and demand, and these ₹0 cells participate in penalty calculations.",
    explanation: "In an unbalanced problem where Σ Supply != Σ Demand, a fictitious dummy source or destination is added with unit transportation cost c_ij = ₹0 (or specified penalty costs). Because ₹0 becomes the lowest cost in every line that intersects the dummy, it directly influences all row or column penalties across the initial iteration.",
    hint: "Check whether the ₹0 dummy row affects the lowest cost of every column it spans.",
    level: "expert",
    codeExample: "Col 1 costs: [₹8, ₹5, ₹12] + Dummy [₹0] -> New sorted: [₹0, ₹5, ₹8, ₹12] -> New Penalty = ₹5 - ₹0 = ₹5"
  },
  {
    question: "What should an analyst do if there is a tie for the maximum penalty among two or more rows/columns?",
    shortAnswer: "Break the tie by choosing the tied row or column that contains the minimum individual cell cost; if still tied, choose the cell permitting the largest allocation quantity.",
    explanation: "When max(P) is shared by multiple lines (e.g., Row 1 has P=₹8 and Column 3 has P=₹8), compare the minimum cell in Row 1 against the minimum cell in Column 3. Select the line with the smaller unit cost min(c_ij). If their minimum unit costs are also identical, select the one that allows allocating max(min(S_i, D_j)) units. If still tied, pick arbitrarily.",
    hint: "Observe how tie-breakers maximize immediate savings and clear inventory faster.",
    level: "expert",
    codeExample: "Tie: P(R1)=₹10 (min cell ₹3), P(C2)=₹10 (min cell ₹1). Pick C2 because ₹1 < ₹3."
  },
  {
    question: "Can a penalty ever be a negative value in a standard transportation minimization problem?",
    shortAnswer: "No, penalties are strictly non-negative (P >= 0) because unit costs are sorted in ascending order (c_(2) >= c_(1)).",
    explanation: "By mathematical formulation, the second-lowest cost c_(2) is by definition greater than or equal to the lowest cost c_(1). Therefore, P = c_(2) - c_(1) >= 0 for all active rows and columns. A negative penalty would indicate an arithmetic error in identifying the minimum elements.",
    hint: "Can the second smallest number in a list ever be smaller than the smallest number?",
    level: "moderate",
    codeExample: "c_(2) >= c_(1) => P = c_(2) - c_(1) >= 0"
  },
  {
    question: "In an m x n transportation matrix, how many penalties are calculated in the very first iteration of VAM?",
    shortAnswer: "Exactly m + n penalties (m row penalties and n column penalties).",
    explanation: "In the initial tableau before any row or column has been exhausted or crossed out, every one of the m supply origins and every one of the n demand destinations has active competing routes, requiring m row penalty computations and n column penalty computations.",
    hint: "Sum the count of all active rows and active columns in Tableau 1.",
    level: "moderate",
    codeExample: "For a 3 x 4 matrix: 3 row penalties + 4 column penalties = 7 penalty calculations."
  },
  {
    question: "Why must penalties be completely RECALCULATED after each single allocation step in VAM?",
    shortAnswer: "Because crossing out a fulfilled row or column removes candidate costs from all intersecting lines, potentially changing their lowest and second-lowest costs.",
    explanation: "When an allocation exhausts Row k, Row k is crossed out. A column j that previously had its lowest or second-lowest cost in Row k now loses that option. The remaining active cells in column j shift, altering both c_(1) and c_(2), which produces a new column penalty P_j for the subsequent iteration.",
    hint: "Watch what happens to a column's minimum cost when the row holding that minimum is eliminated.",
    level: "expert",
    codeExample: "Col 1 before cross-out: [₹2 (R1), ₹7 (R2), ₹9 (R3)] -> P=₹5. If R1 is crossed out, remaining: [₹7, ₹9] -> New P = ₹2."
  },
  {
    question: "Suppose Debangshu in Barrackpore has factory routes with costs [₹15, ₹18, ₹24, ₹15]. What is the row penalty?",
    shortAnswer: "₹0, because the two lowest unit costs are both ₹15.",
    explanation: "The sorted array of costs is [₹15, ₹15, ₹18, ₹24]. The lowest cost is ₹15 and the second-lowest cost is ₹15. The penalty is ₹15 - ₹15 = ₹0.",
    hint: "Two identical lowest values mean zero penalty gap.",
    level: "moderate",
    codeExample: "c_(1) = 15, c_(2) = 15 -> P = 15 - 15 = 0"
  },
  {
    question: "Suppose Susmita in Ichapur has factory routes with costs [₹11, ₹23, ₹17, ₹35]. What is the row penalty?",
    shortAnswer: "₹6, calculated as ₹17 (second-lowest) minus ₹11 (lowest).",
    explanation: "Sorting the given costs in ascending order yields [₹11, ₹17, ₹23, ₹35]. The lowest cost is ₹11 and the second-lowest cost is ₹17. The penalty is P = ₹17 - ₹11 = ₹6 per unit.",
    hint: "Identify the smallest number (11) and the second smallest number (17).",
    level: "moderate",
    codeExample: "Sorted: [11, 17, 23, 35] -> P = 17 - 11 = ₹6"
  },
  {
    question: "How does the concept of penalty relate to the dual variables (u_i, v_j) used in the MODI (Modified Distribution) optimality test?",
    shortAnswer: "VAM penalties approximate the marginal opportunity cost gradient, helping generate an initial basis where reduced costs (c_ij - u_i - v_j) are already close to optimal (>= 0).",
    explanation: "In linear programming duality, the shadow prices u_i and v_j represent origin potentials and destination values. The difference between cell costs and potentials determines cell optimality. By penalizing large step-jumps in cost, VAM intuitively selects basic variables that align closely with optimal dual values, often finding solutions requiring 0 or 1 MODI iteration.",
    hint: "Think about how VAM generates near-optimal initial shadow price distributions.",
    level: "expert",
    codeExample: "IBFS(VAM) -> often optimal or requires only 1 simplex pivot in MODI method."
  },
  {
    question: "If all costs in a specific row are identical, say [₹8, ₹8, ₹8, ₹8], what is the penalty and what is its managerial meaning?",
    shortAnswer: "The penalty is ₹0, meaning the origin is completely indifferent to which destination it supplies.",
    explanation: "Since every destination charges the identical freight rate of ₹8/unit, shipping to Destination 1 versus Destination 4 causes zero financial differentiation for this supplier. The allocator can safely postpone allocating this row until high-penalty rows with steep cost variations are resolved.",
    hint: "Zero penalty reflects zero financial preference among remaining routes.",
    level: "moderate",
    codeExample: "P = 8 - 8 = ₹0. Managerial consequence: Lowest allocation priority."
  },
  {
    question: "Under what conditions can Vogel's Approximation Method fail to produce the absolute global optimal solution on the first try?",
    shortAnswer: "When myopic greedy choices on max penalty early on inadvertently trigger high-cost combinations in the final remaining subspace.",
    explanation: "Although VAM is far superior to NWCR and Matrix Minima, it is still a heuristic. Because it operates sequentially without backtracking, choosing the highest penalty in iteration 1 might eliminate a row that could have provided a crucial low-cost bridge for a later complex supply-demand combination.",
    hint: "Heuristics look ahead one step (penalty gap), not through all simultaneous multi-period combinations.",
    level: "expert",
    codeExample: "VAM total cost = ₹4,200; Optimal total cost via MODI = ₹4,150 (saving ₹50 via loop redistribution)."
  },
  {
    question: "In a 2 x 2 transportation tableau, how do the row penalties and column penalties compare?",
    shortAnswer: "In any 2 x 2 matrix, the sum of row penalties equals the sum of column penalties, and cross-penalties share exact mathematical symmetry.",
    explanation: "Let the matrix be [[a, b], [c, d]]. If a is the minimum, row penalties are |a - b| and |c - d|, while column penalties are |a - c| and |b - d|. The regret gaps reflect the 2D planar perimeter differences, demonstrating bidirectional penalty coupling.",
    hint: "Test a simple 2x2 matrix like [[2, 5], [6, 8]] to observe row and col penalties.",
    level: "expert",
    codeExample: "Matrix: [[2, 5], [6, 8]] -> Row penalties: P(R1)=3, P(R2)=2; Col penalties: P(C1)=4, P(C2)=3."
  },
  {
    question: "What is the penalty of a column with unit costs [₹4, ₹19, ₹25, ₹30] if the row containing ₹4 is crossed out in step 1?",
    shortAnswer: "The new penalty becomes ₹6 (₹25 - ₹19).",
    explanation: "Initially, the sorted costs were [₹4, ₹19, ₹25, ₹30] with P = ₹19 - ₹4 = ₹15. Once the row containing ₹4 is eliminated, the remaining active costs for this column are [₹19, ₹25, ₹30]. The new lowest cost is ₹19 and the new second-lowest is ₹25, making the updated penalty P = ₹25 - ₹19 = ₹6.",
    hint: "Remove ₹4 from the list and find the new lowest and second-lowest from [19, 25, 30].",
    level: "moderate",
    codeExample: "Remaining: [19, 25, 30] -> c_(1)' = 19, c_(2)' = 25 -> P' = 25 - 19 = ₹6"
  },
  {
    question: "Why is VAM generally preferred over the Stepping Stone or MODI method as a standalone quick hand-calculation tool in field operations?",
    shortAnswer: "Because VAM does not require computing dual multipliers or testing complex stepping-stone loops, yet delivers 90-98% optimality accuracy directly.",
    explanation: "Stepping stone and MODI methods are optimization routines that require an existing basic solution and iteratively trace closed loops. In fast-paced industrial dispatching (e.g., daily truck routing in Kolkata hubs), VAM provides an immediate, near-optimal dispatch schedule within a few table operations without loop tracing.",
    hint: "Consider the computational overhead of drawing closed loops vs calculating simple differences.",
    level: "intermediate",
    codeExample: "VAM = Fast 1-pass construction heuristic; MODI = Multi-pass iterative optimizer."
  },
  {
    question: "If Abhronila in Jadavpur evaluates a column with costs [₹5, ₹5, ₹5, ₹12], what is the penalty for this column?",
    shortAnswer: "₹0, because the lowest cost is ₹5 and the second-lowest cost is also ₹5.",
    explanation: "Even though ₹5 appears three times, the algorithm takes the 1st smallest (₹5) and 2nd smallest (₹5). The penalty is ₹5 - ₹5 = ₹0.",
    hint: "Sort the array: [5, 5, 5, 12]. The first two entries are both 5.",
    level: "moderate",
    codeExample: "c_(1) = 5, c_(2) = 5 -> P = 5 - 5 = 0"
  },
  {
    question: "How does the penalty method behave in a 'Degenerate' allocation step where supply and demand reach zero simultaneously?",
    shortAnswer: "Only one line (either row or column) is crossed out, while the other is assigned a remaining capacity of 0, keeping its cells active for subsequent penalty checks.",
    explanation: "To maintain the mandatory m + n - 1 basic variables, if allocating x_ij = S_i = D_j exhausts both line i and line j simultaneously, standard VAM rules cross out only one line (e.g., Row i) and leave Column j active with remaining demand 0. Column j's penalty continues to be evaluated or given an allocation of 0 with another cell.",
    hint: "Recall the rule preventing simultaneous elimination of both row and column to avoid losing basic variables.",
    level: "expert",
    codeExample: "S_i = D_j = 40 -> Allocate 40 to (i, j). Cross out Row i. Set D_j = 0 in Column j (keep active)."
  },
  {
    question: "What is the worst-case time complexity of computing all penalties across a full VAM run for an m x n transportation problem?",
    shortAnswer: "O((m + n) * m * n) in basic iterative implementation, or O((m + n) * (m + n) * log(max(m,n))) with indexed heaps.",
    explanation: "There are at most (m + n - 1) allocation steps. In each step, finding the lowest and second-lowest costs across all remaining rows (m) and columns (n) takes O(m*n) time. Multiplying (m + n) steps by O(mn) work yields O((m+n)mn), which is polynomial and exceptionally fast compared to general LP simplex.",
    hint: "Consider (m + n) iterations where each iteration inspects the remaining matrix.",
    level: "expert",
    codeExample: "Total Steps = m + n - 1; Work per Step = O(m * n) => Total Complexity = O((m + n) * m * n)"
  },
  {
    question: "Why does multiplying all unit costs in a transportation table by a constant factor k > 0 multiply all penalties by k, without changing VAM allocation choices?",
    shortAnswer: "Because penalty is a linear difference: P' = k*c_(2) - k*c_(1) = k*(c_(2) - c_(1)) = k*P, preserving relative rank orders exactly.",
    explanation: "Scaling all shipping rates (e.g., converting USD to INR or accounting for a uniform 18% fuel surcharge) scales every penalty by the identical scalar k. Since all penalties scale proportionally, the row or column with the maximum penalty remains unchanged, guaranteeing identical allocation sequence and routes.",
    hint: "Test multiplying [4, 10] by 2 -> difference changes from 6 to 12, but relative ranking against other scaled rows is preserved.",
    level: "moderate",
    codeExample: "P_new = (k * c_2) - (k * c_1) = k * (c_2 - c_1) = k * P_old"
  },
  {
    question: "What happens to penalties if a uniform constant C is added to every cost entry in the matrix (c_ij' = c_ij + C)?",
    shortAnswer: "All penalties remain completely unchanged (P' = P), because (c_(2) + C) - (c_(1) + C) = c_(2) - c_(1).",
    explanation: "Adding a fixed toll or terminal fee C across all routes shifts all rates equally. When calculating penalty differences, C cancels out identically: P_new = (c_(2) + C) - (c_(1) + C) = c_(2) - c_(1) = P_old. Thus, VAM is invariant under uniform additive shifts.",
    hint: "The gap between two numbers does not change if both numbers are shifted by the same constant.",
    level: "moderate",
    codeExample: "c_1 = ₹10, c_2 = ₹16 -> P = ₹6. Shift by +₹5: c_1' = ₹15, c_2' = ₹21 -> P' = 21 - 15 = ₹6."
  },
  {
    question: "In a transportation problem with prohibitive routes (assigned cost M -> infinity), how does VAM penalty logic prevent assigning volume to M?",
    shortAnswer: "The presence of M elevates the penalty of that line to near-infinity (M - c_lowest), compelling VAM to allocate to the cheap cell immediately before M can ever be considered.",
    explanation: "If a route is blocked or impossible, assigning it cost M creates a gigantic penalty (P ≈ M) for that row or column. VAM immediately selects this line due to its astronomical penalty and allocates maximum possible units to its lowest non-M cell, effectively shielding the system from ever touching route M.",
    hint: "Large penalty = urgent priority to grab the non-M cell.",
    level: "expert",
    codeExample: "Row with [₹5, M] -> Penalty = M - 5 ≈ ∞ -> Highest penalty in matrix -> Allocates immediately to ₹5 cell!"
  },
  {
    question: "Suppose Mamata in Kolkata has three warehouses supplying four markets. If the maximum penalty in iteration 1 occurs in Column 2 (P = ₹14) where costs are [₹18, ₹4, ₹22], which cell gets the allocation?",
    shortAnswer: "Cell (2, 2) with unit cost ₹4 gets the allocation.",
    explanation: "Once the line with the highest penalty is identified (Column 2 with P = ₹14), VAM requires allocating as much capacity as possible to the absolute CHEAPEST cell in that chosen line. In Column 2, the cell costs are ₹18 (Row 1), ₹4 (Row 2), and ₹22 (Row 3). The minimum is ₹4 at Row 2, Column 2.",
    hint: "First find the max penalty line (Col 2), then pick the lowest cost cell inside that line (Row 2).",
    level: "moderate",
    codeExample: "Max Penalty: Col 2 (P=₹14) -> Min cell in Col 2: c_22 = ₹4 -> Allocate x_22 = min(S_2, D_2)."
  },
  {
    question: "What is the primary psychological reason novice students miscalculate VAM penalties during exams?",
    shortAnswer: "Subtracting the lowest cost from the HIGHEST cost (c_max - c_min) instead of the SECOND-LOWEST cost (c_second - c_lowest).",
    explanation: "A frequent conceptual error is calculating the range of the row (max - min) rather than the opportunity cost (2nd min - 1st min). Range measures total spread across all routes, whereas penalty measures the exact immediate consequence of slipping from first choice to second choice.",
    hint: "Always sort ascending and take element [1] minus element [0], not the last element minus the first.",
    level: "moderate",
    codeExample: "Correct: P = c_(2) - c_(1). WRONG: P = c_(max) - c_(min)."
  },
  {
    question: "How does Mahima verify that her calculated initial solution using VAM is indeed a 'Basic Feasible Solution'?",
    shortAnswer: "She confirms that: (1) all supply and demand constraints are satisfied, (2) the number of allocated cells is exactly m + n - 1, and (3) the allocated cells do not form any closed loops.",
    explanation: "A solution is feasible if row sums match supplies and column sums match demands. It is basic if the allocations occupy linearly independent positions (no closed loops) and the total count of positive allocations equals m + n - 1. VAM naturally produces independent positions by crossing out lines one by one.",
    hint: "Count total basic cells = rows + cols - 1, and verify no loop can be drawn.",
    level: "intermediate",
    codeExample: "For 3 origins and 4 destinations: Required Basic Allocations = 3 + 4 - 1 = 6 cells."
  },
  {
    question: "Why is Vogel's Approximation Method often described in operations research literature as a 'heuristic that thinks ahead'?",
    shortAnswer: "Because it anticipates the downstream cost penalty of NOT taking an action today, combining greedy advantage with risk mitigation.",
    explanation: "Standard greedy methods (like Matrix Minima) look only at immediate reward (lowest current cost). NWCR looks at neither cost nor risk. VAM uniquely incorporates prospective risk by asking: 'If I ignore this row right now, what is the minimum punishment the market will inflict on me in the next step?' This single-step lookahead makes VAM one of the most powerful heuristics in mathematical programming.",
    hint: "Lookahead = Current best vs forced alternative next step.",
    level: "expert",
    codeExample: "Lookahead Function: Penalty(L) = c_{2nd}(L) - c_{1st}(L) -> Minimizes maximal immediate regret."
  }
];

export default questions;
