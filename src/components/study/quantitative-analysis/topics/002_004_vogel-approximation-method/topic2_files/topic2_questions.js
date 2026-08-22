// topic2_questions.js
// 30 Moderate to Expert Questions on Selecting the Highest Penalty in Vogel's Approximation Method (VAM)

const questions = [
  {
    question: "Why does Vogel's Approximation Method mandate selecting the line (row or column) with the MAXIMUM penalty rather than the minimum penalty?",
    shortAnswer: "Because the maximum penalty identifies the line facing the greatest financial hazard (regret) if forced onto its second-best alternative.",
    explanation: "Penalty measures the opportunity cost of procrastination. A line with penalty ₹45 suffers a ₹45/unit penalty if its cheapest route is lost, whereas a line with penalty ₹1 suffers only ₹1/unit. Allocating to the maximum penalty line first provides maximum risk shielding to the transportation system.",
    hint: "Think of allocating to the line with the highest emergency risk first.",
    level: "moderate",
    codeExample: "Target Line L* = argmax_{i in Rows, j in Cols} (P_i, P_j)"
  },
  {
    question: "What is the complete three-tier tie-breaking hierarchy when multiple rows and/or columns share the identical maximum penalty?",
    shortAnswer: "Tier 1: Select the line with the lowest individual unit cost min(c_ij); Tier 2: Select the cell allowing the largest allocation min(S_i, D_j); Tier 3: Break arbitrarily.",
    explanation: "When max(P) is tied (e.g. Row 1 and Column 2 both have P = ₹8), Tier 1 checks min(c_ij) in each tied line. If still tied, Tier 2 evaluates the volume min(Supply, Demand) that can be dispatched immediately to maximize total cost savings. If still tied, arbitrary selection preserves feasibility and near-optimality.",
    hint: "Tier 1 = lowest rate; Tier 2 = highest volume; Tier 3 = arbitrary.",
    level: "expert",
    codeExample: "Tier 1: min(c_ij) -> Tier 2: max(min(S_i, D_j)) -> Tier 3: arbitrary"
  },
  {
    question: "Suppose Row 1 has P_1 = ₹10 with minimum cost ₹2, while Column 3 has P_3 = ₹10 with minimum cost ₹4. Which line is selected?",
    shortAnswer: "Row 1 is selected because its minimum unit cost (₹2) is lower than Column 3's minimum unit cost (₹4).",
    explanation: "Under Tier 1 tie-breaking, both lines share the same maximum penalty of ₹10, but Row 1 offers a cheaper absolute route at ₹2/unit compared to ₹4/unit in Column 3.",
    hint: "Compare unit cost ₹2 against unit cost ₹4.",
    level: "moderate",
    codeExample: "P_1 = P_3 = ₹10 -> min_cost(R1)=₹2 < min_cost(C3)=₹4 => Select Row 1."
  },
  {
    question: "Suppose Row 2 and Row 3 both have P = ₹7, and both have identical minimum cost ₹3. Row 2 supply is 80 (demand 50), while Row 3 supply is 30 (demand 50). Which is chosen?",
    shortAnswer: "Row 2 is chosen because it allows allocating 50 units (min(80, 50) = 50) versus only 30 units in Row 3 (min(30, 50) = 30).",
    explanation: "Under Tier 2 tie-breaking, when both penalties and minimum unit costs are equal, the cell permitting the larger allocation quantity min(S_i, D_j) is selected to clear greater volume at the favorable rate.",
    hint: "Compare volume min(80, 50) = 50 vs min(30, 50) = 30.",
    level: "expert",
    codeExample: "Allocation(R2) = min(80, 50) = 50 units; Allocation(R3) = min(30, 50) = 30 units => Select R2."
  },
  {
    question: "Can selecting the highest penalty line ever lead to a higher initial total cost than selecting a lower penalty line?",
    shortAnswer: "In rare edge cases, yes, because VAM is a 1-step lookahead heuristic rather than a global combinatorial search.",
    explanation: "Because VAM evaluates regret only one step ahead, making a high-penalty allocation in step 1 might occasionally constrain later steps into awkward high-cost combinations. However, across standard industrial problems, VAM generates solutions within 0% to 5% of global optimality.",
    hint: "Heuristics optimize step-by-step regret, not all multi-period permutations simultaneously.",
    level: "expert",
    codeExample: "VAM IBFS Cost <= Matrix Minima Cost <= NWCR Cost (in 95%+ of cases)."
  },
  {
    question: "If Debangshu evaluates a 3 x 3 tableau where all row penalties are ₹3 and all column penalties are ₹3, how should the selection begin?",
    shortAnswer: "Scan the entire matrix for the cell with the absolute lowest unit cost min(c_ij) across all lines.",
    explanation: "When a universal tie occurs across all rows and columns, Tier 1 tie-breaking compares the minimum cost of all lines, which naturally selects the global minimum cell in the entire tableau.",
    hint: "Universal penalty tie causes VAM to gracefully adopt Least Cost cell selection.",
    level: "expert",
    codeExample: "All P = ₹3 -> Select argmin_{(i,j)} c_ij across entire active matrix."
  },
  {
    question: "What happens after the highest penalty line is selected?",
    shortAnswer: "The algorithm searches strictly WITHIN that chosen line to locate its minimum unit cost cell and allocates maximum possible capacity.",
    explanation: "Once the winning row or column is fixed, VAM does NOT allocate to the highest cost cell; it allocates to the CHEAPEST cell inside that highest-penalty line.",
    hint: "Highest penalty chooses the LINE; lowest cost chooses the CELL inside that line.",
    level: "moderate",
    codeExample: "Line = argmax(Penalties) -> Cell = argmin_{in Line} (c_ij) -> x = min(Supply, Demand)"
  },
  {
    question: "If Mamata in Kolkata has row penalties [₹4, ₹9, ₹2] and column penalties [₹6, ₹9, ₹3], what are the tied maximum penalty candidates?",
    shortAnswer: "Row 2 and Column 2 are tied at the maximum penalty of ₹9.",
    explanation: "The global maximum penalty is ₹9, shared by Row 2 (P_2 = ₹9) and Column 2 (P_2 = ₹9).",
    hint: "Identify all lines containing the value 9.",
    level: "moderate",
    codeExample: "Candidates: Row 2 (P=₹9) and Column 2 (P=₹9)."
  },
  {
    question: "Why is it an error to pick the cell with the highest cost in the highest penalty line?",
    shortAnswer: "Because the goal is to capture the cheapest route (1st lowest) to PREVENT being forced onto the expensive route (2nd lowest).",
    explanation: "Allocating to the high-cost cell would voluntarily incur the penalty we are trying to avoid. We target the cheap cell to lock in the bargain rate.",
    hint: "We want to seize the opportunity, not suffer the penalty.",
    level: "moderate",
    codeExample: "Goal: Secure c_(1) so we never pay c_(2)."
  },
  {
    question: "How does Susmita in Ichapur document a tie-break decision during an operations research audit?",
    shortAnswer: "By annotating the tied values (e.g. 'P_R2 = P_C1 = ₹6'), stating the minimum unit costs in both lines, and explicitly recording the chosen tie-breaker rule.",
    explanation: "Transparent audit notes clarify whether Tier 1 (min cost) or Tier 2 (max volume) was used, making the derivation reproducible.",
    hint: "Record the comparison: c_min(Line 1) vs c_min(Line 2).",
    level: "intermediate",
    codeExample: "Audit Note: Tie at P=₹6. Line R2 has min cost ₹3; Line C1 has min cost ₹5. Selected R2 by Tier 1 rule."
  },
  {
    question: "In a 2 x 2 matrix with costs [[2, 6], [8, 10]], what is the maximum penalty and which line does it belong to?",
    shortAnswer: "The maximum penalty is ₹6, located in Column 1 (₹8 - ₹2 = ₹6).",
    explanation: "Row penalties: P_1 = 6 - 2 = ₹4; P_2 = 10 - 8 = ₹2. Column penalties: P_1 = 8 - 2 = ₹6; P_2 = 10 - 6 = ₹4. Maximum penalty is P(Col 1) = ₹6.",
    hint: "Calculate all 4 penalties and pick the largest.",
    level: "moderate",
    codeExample: "P_R1=4, P_R2=2, P_C1=6, P_C2=4 => Max is P_C1 = ₹6."
  },
  {
    question: "If Column 1 is selected with P = ₹6 in [[2, 6], [8, 10]], which cell gets the allocation?",
    shortAnswer: "Cell (1, 1) with unit cost ₹2.",
    explanation: "Inside Column 1, the candidate costs are ₹2 (Row 1) and ₹8 (Row 2). The minimum is ₹2 at Cell (1, 1).",
    hint: "Pick the smaller of 2 and 8.",
    level: "moderate",
    codeExample: "Target cell: (Row 1, Col 1) @ ₹2"
  },
  {
    question: "What is the risk if an analyst breaks a penalty tie arbitrarily without checking Tier 1 (minimum unit cost)?",
    shortAnswer: "It may result in allocating to a higher unit cost cell, sacrificing immediate savings and increasing the initial total transportation cost Z.",
    explanation: "Skipping Tier 1 might select a line whose best option is ₹15 when the other tied line offered a route at ₹2. Checking min unit cost first ensures the most economical arc is prioritized.",
    hint: "Always check if one tied line has a significantly cheaper bargain rate.",
    level: "expert",
    codeExample: "Line A: P=₹8 (min cell ₹2); Line B: P=₹8 (min cell ₹14). Picking Line B wastes ₹12/unit."
  },
  {
    question: "Suppose Mahima in Barrackpore finds the maximum penalty is P = ₹15 in Row 3. What is her immediate next action?",
    shortAnswer: "Inspect Row 3 to find its lowest active cost cell c_3j, and allocate x_3j = min(S_3, D_j).",
    explanation: "Fix Row 3 as the active line, find min_{j} c_3j, and dispatch maximum possible capacity min(Supply_3, Demand_j).",
    hint: "Lock onto Row 3 and find the lowest cost column.",
    level: "moderate",
    codeExample: "x_3l = min(S_3, D_l) where l = argmin_j c_3j."
  },
  {
    question: "How does the maximum penalty selection mechanism interact with degenerate matrices?",
    shortAnswer: "If allocating to the target cell exhausts both row supply and column demand simultaneously, only one line is crossed out, leaving the other active with 0 balance for future penalty evaluations.",
    explanation: "This preserves the required m + n - 1 basic variables while allowing VAM's penalty selection to continue systematically.",
    hint: "Never cross out both row and column simultaneously in a single allocation pass.",
    level: "expert",
    codeExample: "If S_i == D_j: allocate S_i; cross out Row i; set D_j = 0 in active Column j."
  },
  {
    question: "Why is the penalty selection step computationally light compared to Simplex basis pivoting?",
    shortAnswer: "Because finding max(P) requires only an O(m + n) array scan, whereas Simplex pivoting requires matrix inversion or tableau row operations in O(m * n).",
    explanation: "Scanning m + n numbers to find the largest value takes linear time with zero floating-point inversion overhead, making VAM rapid for manual and automated systems alike.",
    hint: "Finding a maximum in a list of size m+n is O(m+n).",
    level: "expert",
    codeExample: "max(P) = O(m + n) comparisons vs Simplex pivot = O(mn) floating-point operations."
  },
  {
    question: "In a transportation problem with 5 origins and 6 destinations, how many numbers are compared to find the maximum penalty in Pass 1?",
    shortAnswer: "11 numbers (5 row penalties + 6 column penalties).",
    explanation: "Every active row and column yields one penalty. Total items compared = 5 + 6 = 11.",
    hint: "Sum of rows (5) and columns (6).",
    level: "moderate",
    codeExample: "Count = m + n = 5 + 6 = 11"
  },
  {
    question: "If Abhronila in Jadavpur has penalties: P_R = [₹2, ₹5, ₹1], P_C = [₹4, ₹5, ₹3], what are the tied lines?",
    shortAnswer: "Row 2 and Column 2 are tied at the maximum penalty of ₹5.",
    explanation: "Max value across both arrays is ₹5, occurring at Row index 2 and Column index 2.",
    hint: "Look for the number 5 in both P_R and P_C.",
    level: "moderate",
    codeExample: "max(2, 5, 1, 4, 5, 3) = 5 (at Row 2 and Col 2)."
  },
  {
    question: "What should Abhronila check next to break the tie between Row 2 and Column 2?",
    shortAnswer: "Check the minimum unit cost in Row 2 versus the minimum unit cost in Column 2.",
    explanation: "Apply Tier 1 tie-breaker: compare min_{j} (c_2j) with min_{i} (c_i2).",
    hint: "Compare the smallest number in Row 2 with the smallest number in Column 2.",
    level: "moderate",
    codeExample: "min_cost(Row 2) vs min_cost(Col 2)"
  },
  {
    question: "If min_cost(Row 2) is ₹3 and min_cost(Col 2) is ₹1, which line is selected?",
    shortAnswer: "Column 2 is selected because ₹1 < ₹3.",
    explanation: "Column 2 offers the lower unit cost route, securing the greater immediate rate advantage.",
    hint: "1 is smaller than 3.",
    level: "moderate",
    codeExample: "Select Column 2 (min rate ₹1)."
  },
  {
    question: "Why does VAM NOT allow allocating to a cell outside the winning highest-penalty line in that step?",
    shortAnswer: "Because doing so leaves the highest-penalty line unprotected, exposing it to the very cost surge the algorithm was designed to prevent.",
    explanation: "Diverting capacity to a non-winning line permits other allocations to exhaust the winning line's cheapest route, triggering its large regret penalty.",
    hint: "The winning line has the most urgent need for protection.",
    level: "expert",
    codeExample: "Deviation hazard: Allocating outside L* allows L*'s best cell to be wiped out."
  },
  {
    question: "If all active cells in the matrix have identical unit cost (e.g. all ₹8), what are all penalties and how is the line chosen?",
    shortAnswer: "All penalties are ₹0, and any line can be chosen; the algorithm reduces to arbitrary or North-West corner allocation.",
    explanation: "When every cell costs ₹8, all 1st and 2nd minimums are ₹8, so all P = ₹0. Total transportation cost will be identical regardless of allocation pattern.",
    hint: "Uniform cost matrix means zero regret everywhere.",
    level: "moderate",
    codeExample: "All c_ij = ₹8 -> All P = ₹0 -> Total Cost Z = 8 * Total Demand."
  },
  {
    question: "How does selecting the highest penalty line help prevent 'bottlenecks' in multi-echelon supply chains?",
    shortAnswer: "It identifies suppliers or customers with severely limited low-cost alternatives and satisfies them before their critical routes become congested or unavailable.",
    explanation: "In logistics networks, high penalty indicates that a facility has only one economical carrier and all other carriers charge premium emergency rates. Prioritizing this facility prevents bottleneck lockouts.",
    hint: "High penalty = single point of cost failure.",
    level: "expert",
    codeExample: "Bottleneck Indicator = Max(c_second - c_first)."
  },
  {
    question: "Suppose Row 1 has costs [₹4, ₹20] with supply 10, and Column 1 has costs [₹4, ₹6] with demand 100. Row 1 penalty is ₹16, Column 1 penalty is ₹2. Which is chosen?",
    shortAnswer: "Row 1 is chosen because its penalty (₹16) is much higher than Column 1's penalty (₹2).",
    explanation: "Row 1 faces a catastrophic penalty of ₹16/unit if forced to use its ₹20 route. Column 1 faces only ₹2/unit. VAM chooses Row 1.",
    hint: "Compare 16 vs 2.",
    level: "moderate",
    codeExample: "P(Row 1) = 20 - 4 = ₹16; P(Col 1) = 6 - 4 = ₹2 => Max is Row 1."
  },
  {
    question: "In the above problem, how many units are allocated to cell (1, 1)?",
    shortAnswer: "10 units (min(Supply 10, Demand 100)).",
    explanation: "Inside winning Row 1, cheapest cell is (1, 1) at ₹4. Allocation = min(10, 100) = 10 units, exhausting Row 1.",
    hint: "min(10, 100) = 10.",
    level: "moderate",
    codeExample: "x_11 = min(10, 100) = 10 units."
  },
  {
    question: "After allocating 10 units to cell (1, 1) and crossing out Row 1, what is the remaining demand of Column 1?",
    shortAnswer: "90 units (100 - 10 = 90).",
    explanation: "Demand decreases from 100 to 90 units, and Column 1 remains active for subsequent iterations.",
    hint: "100 - 10 = 90.",
    level: "moderate",
    codeExample: "D_1' = 100 - 10 = 90 units."
  },
  {
    question: "What is the golden rule every student must memorize for the penalty selection stage?",
    shortAnswer: "'Select the HIGHEST penalty to choose the line; select the LOWEST cost to choose the cell.'",
    explanation: "This concise rule prevents the frequent error of confusing line selection (maximization of regret) with cell selection (minimization of rate).",
    hint: "Max for Line, Min for Cell.",
    level: "moderate",
    codeExample: "Max(Penalty) -> Line; Min(Cost) -> Cell."
  },
  {
    question: "Why should an operations research practitioner circle the chosen maximum penalty in every tableau?",
    shortAnswer: "To provide an unambiguous audit trail showing exactly which line drove the allocation decision in each pass.",
    explanation: "Circling the maximum penalty prevents confusion during multi-pass calculations and makes verification immediate.",
    hint: "Visual audit markers streamline grading and error detection.",
    level: "intermediate",
    codeExample: "Circle: (P_2 = ₹14)* -> Guides allocation x_21."
  },
  {
    question: "If two columns have the same maximum penalty and the same minimum unit cost, but Column 1 has demand 50 and Column 2 has demand 20, which is preferred under Tier 2?",
    shortAnswer: "Column 1 is preferred because it can absorb up to 50 units, maximizing volume assigned at the lowest rate.",
    explanation: "Tier 2 selects max(min(S_i, D_j)). Assuming adequate supplier capacity, Column 1 allows a larger allocation.",
    hint: "Higher demand allows larger shipment at the bargain rate.",
    level: "expert",
    codeExample: "min(S, 50) >= min(S, 20) => Column 1 preferred."
  },
  {
    question: "How does mastery of penalty selection accelerate solving large-scale industrial transportation models?",
    shortAnswer: "It allows planners to rapidly eliminate high-hazard routes and construct initial plans that often require zero simplex pivots during linear programming optimization.",
    explanation: "Selecting the highest penalty lines systematically drives the initial basis toward dual feasibility, drastically reducing computation time in enterprise dispatch engines.",
    hint: "High quality initial basis = minimal post-optimization runtime.",
    level: "expert",
    codeExample: "VAM IBFS -> 0 to 1 MODI pivots vs NWCR -> 5 to 12 MODI pivots."
  }
];

export default questions;
