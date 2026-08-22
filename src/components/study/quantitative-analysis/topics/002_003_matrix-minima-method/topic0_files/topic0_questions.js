// topic0_questions.js
// 30 Moderate to Expert Questions on Least-Cost Allocation Concept

const questions = [
  {
    question: "What is the core conceptual philosophy behind the Least-Cost Allocation (Matrix Minima) principle in Transportation Problems?",
    shortAnswer: "It is a cost-driven greedy heuristic that prioritizes allocating maximum possible units to routes with the lowest unit transportation cost.",
    explanation: "Unlike arbitrary geometric methods like the North-West Corner Rule which ignore shipping economics, the Least-Cost concept operates on an economic greedy principle. By inspecting the entire cost matrix and satisfying demand through the cheapest available unit costs (c_ij) first, it aims to minimize the immediate objective function contribution (Z = Σ Σ c_ij * x_ij), leading to an Initial Basic Feasible Solution (IBFS) that is significantly closer to global optimality.",
    hint: "Think about how a logistics manager picks the cheapest delivery vendor first rather than picking top-left on a spreadsheet.",
    level: "intermediate",
    codeExample: "Objective: min Z = Σᵢ Σⱼ (cᵢⱼ · xᵢⱼ), Priority: argmin_{(i,j)} { cᵢⱼ | Sᵢ > 0, Dⱼ > 0 }"
  },
  {
    question: "How does the Least-Cost allocation heuristic mathematically formulate its cell selection rule at each step?",
    shortAnswer: "Select cell (k, l) such that c_kl = min { c_ij } for all active supply rows i and active demand columns j.",
    explanation: "At each iteration, given remaining supply vector S = [s_1, ..., s_m] and remaining demand vector D = [d_1, ..., d_n], the method identifies the set of active cells A = {(i, j) : s_i > 0, d_j > 0}. The allocation is made to cell (k, l) = argmin_{(i,j) ∈ A} c_ij, with quantity x_kl = min(s_k, d_l).",
    hint: "Observe carefully how the search space reduces after each row or column exhaustion.",
    level: "intermediate",
    codeExample: "x_kl = min(s_k, d_l); s_k ← s_k - x_kl; d_l ← d_l - x_kl;"
  },
  {
    question: "Why does the Least-Cost Allocation method produce a superior IBFS compared to the North-West Corner Rule (NWCR)?",
    shortAnswer: "Because Least-Cost incorporates the unit cost parameters c_ij directly into the allocation logic, whereas NWCR is cost-blind.",
    explanation: "The North-West Corner Rule allocates solely based on grid index position (row 1, col 1 downwards), completely ignoring cost matrix entries. A cell with an exorbitant rate of ₹500/unit could be assigned high volume simply because it sits at (1,1). In contrast, Least-Cost scans the global cost structure, suppressing high-cost arcs early and drastically lowering initial total transportation cost.",
    hint: "Compare cost-aware greedy selection against blind spatial coordinate traversal.",
    level: "intermediate",
    codeExample: "Cost(NWCR) >> Cost(Least-Cost) ≥ Cost(VAM) ≥ Cost(Optimal)"
  },
  {
    question: "In what scenarios can a greedy Least-Cost allocation inadvertently lead to higher downstream costs in subsequent steps?",
    shortAnswer: "When exhausting a cheap cell forces a large remaining supply or demand into an exorbitantly expensive non-optional cell later.",
    explanation: "This is the classic myopic pitfall of single-step greedy heuristics. For example, assigning 50 units to a ₹2/unit cell might exhaust a warehouse that was the only economical supplier for a remote city, later forcing that city to draw from a ₹90/unit source. Vogel's Approximation Method (VAM) addresses this by evaluating penalty/regret costs instead of pure local minima.",
    hint: "Think about short-term savings creating massive future bottleneck penalties.",
    level: "expert",
    codeExample: "Step 1: Save ₹3/unit on 10 units. Step 4: Forced to pay ₹80/unit on 40 remaining units due to depleted local supply."
  },
  {
    question: "What is the computational time complexity of the Matrix Minima (Least-Cost) allocation algorithm for an m × n matrix?",
    shortAnswer: "O((m + n) · m · n) naively, or O(m · n · log(m · n)) using a min-heap priority queue.",
    explanation: "There are at most (m + n - 1) allocation steps. In a naive implementation, scanning the remaining matrix of size at most m × n takes O(m · n) per step, yielding O((m + n)mn). If all m · n matrix cells are pre-sorted into a min-heap or sorted array, extracting and validating remaining capacities takes O(mn log(mn)).",
    hint: "Consider the cost of finding the minimum across the matrix over (m + n - 1) iterations.",
    level: "expert",
    codeExample: "Heapify costs: O(mn log(mn)); Allocation passes: m + n - 1 steps with O(1) amortized updates."
  },
  {
    question: "How should a tie between multiple cells having the identical minimum cost be resolved in Least-Cost allocation?",
    shortAnswer: "Break ties by selecting the cell that allows the maximum allocation quantity min(s_i, d_j); if still tied, choose arbitrarily or by highest remaining row/column capacity.",
    explanation: "When c_ab = c_cd = min(c_ij), the standard tie-breaking rule chooses the cell that maximizes x_ij = min(s_i, d_j). Allocating the largest possible volume to the lowest rate maximizes immediate total cost reduction (Volume × Savings). If allocation quantities are also identical, arbitrary selection or choosing the row/column with greater remaining balance is applied.",
    hint: "Try maximizing the product (allocation quantity × cost advantage) when costs are identical.",
    level: "intermediate",
    codeExample: "If c_12 == c_34 == ₹4, check min(S_1, D_2) vs min(S_3, D_4) and pick the larger allocation."
  },
  {
    question: "How does the Least-Cost method guarantee that the resulting solution satisfies the 'Basic' requirement of m + n - 1 allocations?",
    shortAnswer: "By crossing out exactly one row or one column at each step, except at the final simultaneous fulfillment step.",
    explanation: "An m × n transportation problem has (m + n - 1) linearly independent constraint equations. At each iteration, allocating min(s_i, d_j) reduces either row i supply or column j demand to zero. By crossing out only the exhausted line (or arbitrarily choosing one if both reach zero simultaneously and leaving a zero allocation for the other), exactly m + n - 1 basic variables are generated without forming loops.",
    hint: "Count how many rows (m) and columns (n) are eliminated across all steps.",
    level: "expert",
    codeExample: "Total eliminations = m + n - 1 lines. Each elimination corresponds to one basic variable x_ij."
  },
  {
    question: "What specific risk occurs during Least-Cost allocation when supply and demand are simultaneously satisfied (s_i = d_j)?",
    shortAnswer: "Degeneracy occurs, risking fewer than m + n - 1 basic allocations unless an infinitesimal allocation (ε) is explicitly assigned.",
    explanation: "When s_i = d_j, both row i and column j are satisfied simultaneously. If both are crossed out together, two lines are eliminated with only one allocation, resulting in total basic cells < m + n - 1. To maintain a valid basis for MODI testing, cross out only one line (e.g., row i) and allocate a basic zero (ε) with cost c_kj to the remaining line before crossing it out.",
    hint: "Remember the condition for non-degeneracy: exactly m + n - 1 allocated cells.",
    level: "expert",
    codeExample: "If S_2 = 40 and D_3 = 40, set x_23 = 40 (cross row 2), then set x_k3 = 0 (ε) for an independent cell in col 3."
  },
  {
    question: "Is the Initial Basic Feasible Solution obtained via Least-Cost allocation always guaranteed to be optimal?",
    shortAnswer: "No, it is a heuristic starting point that must be tested for optimality using the MODI (u-v) method or Stepping Stone method.",
    explanation: "Because the Matrix Minima method is greedy and lacks global foresight regarding downstream opportunity penalties, its solution may contain non-zero opportunity costs (Δ_ij = c_ij - u_i - v_j < 0). While it is often substantially better than NWCR, it is not guaranteed to be optimal.",
    hint: "Heuristics provide feasible starting points; optimality requires optimality criteria verification.",
    level: "intermediate",
    codeExample: "IBFS(Least-Cost) → Compute u_i, v_j → Check if all Δ_ij ≥ 0. If any Δ_ij < 0, perform loop shifting."
  },
  {
    question: "In an unbalanced transportation problem (Σ Supply ≠ Σ Demand), what prerequisite step is required before applying Least-Cost allocation?",
    shortAnswer: "Add a dummy row or dummy column with zero unit transportation costs (c_dummy,j = 0 or c_i,dummy = 0) to balance the total quantities.",
    explanation: "Linear programming transportation algorithms require conservation of total flow: Σ s_i = Σ d_j. If Σ s_i > Σ d_j, add a dummy destination column with demand (Σ s_i - Σ d_j) and cost 0 across all cells. Since dummy cells have cost ₹0, the Least-Cost method might pick them first unless dummy allocations are deferred or handled according to specific problem rules.",
    hint: "Balance the ledger before seeking lowest numbers in the cost matrix.",
    level: "intermediate",
    codeExample: "If Supply = 150 and Demand = 120, add Dummy Destination D_dummy with Demand = 30 and costs c_i,dummy = ₹0."
  },
  {
    question: "Why should dummy cells with ₹0 cost be handled with care during manual Least-Cost allocation?",
    shortAnswer: "Because assigning to ₹0 dummy cells too early may prematurely consume real factory capacities needed for high-priority real destinations.",
    explanation: "A dummy cost of ₹0 represents unfulfilled capacity or unmet demand (slack). If an analyst blindly allocates to ₹0 dummy cells first, real supply might be artificially withheld from critical real demands, distorting the physical intuition of the initial plan. In standardized academic Matrix Minima, ₹0 is treated as the lowest cost unless specified otherwise.",
    hint: "Zero cost means 'no shipping occurs', but real supply is locked into dummy storage.",
    level: "expert",
    codeExample: "Academic rule: ₹0 is minimum → allocate first. Industrial rule: Allocate real demands first, dump leftover into dummy."
  },
  {
    question: "How does the Least-Cost method prevent the formation of closed loops among basic allocated cells?",
    shortAnswer: "By eliminating at least one row or column upon each allocation, preventing any cyclical dependencies across active lines.",
    explanation: "A closed loop requires at least two allocations in every row and column involved in the cycle. Since the allocation algorithm systematically eliminates satisfied rows or columns from consideration for future allocations, newly assigned cells cannot close a cycle with previously isolated, eliminated lines.",
    hint: "A tree structure in graph theory has no cycles; line elimination ensures a spanning tree.",
    level: "expert",
    codeExample: "Graph property: Allocating to active bipartite nodes (Supply_i, Demand_j) without cycles maintains acyclic tree."
  },
  {
    question: "What is the economic interpretation of the objective value Z calculated from the Least-Cost allocation?",
    shortAnswer: "It represents the total initial operational expenditure required to transport all goods from origins to destinations.",
    explanation: "Total cost Z = Σ_{i=1}^m Σ_{j=1}^n c_ij · x_ij measures the total freight bill. For instance, if Abhronila allocates 30 units at ₹4/unit, 40 units at ₹2/unit, and 50 units at ₹6/unit, the total initial logistics commitment is (30×4) + (40×2) + (50×6) = ₹500.",
    hint: "Multiply each assigned shipment volume by its unit freight rate and sum them all up.",
    level: "intermediate",
    codeExample: "Z = (30 × ₹4) + (40 × ₹2) + (50 × ₹6) = ₹120 + ₹80 + ₹300 = ₹500"
  },
  {
    question: "How does Least-Cost allocation handle prohibited or unavailable shipping routes in a cost matrix?",
    shortAnswer: "Assign an exorbitant penalty cost M (where M → ∞) to the prohibited cell, ensuring the greedy search never selects it.",
    explanation: "If a transport link (e.g., Barrackpore to Jadavpur via a broken bridge) is closed, its unit cost is set to c_ij = M, where M is an arbitrarily large positive number (Big-M). The Matrix Minima algorithm naturally ignores cell (i, j) in favor of finite minimum cost cells, preventing illegal route allocation.",
    hint: "Make the route so expensive that the greedy algorithm strictly avoids it.",
    level: "intermediate",
    codeExample: "c_23 = M (₹999,999/unit) → argmin will never pick (2,3) while finite cost cells remain."
  },
  {
    question: "What is the key structural difference between the Matrix Minima (Least-Cost) Method and Vogel's Approximation Method (VAM)?",
    shortAnswer: "Matrix Minima focuses on absolute minimum unit cost, whereas VAM focuses on the penalty (difference between the two lowest costs) in each line.",
    explanation: "Matrix Minima asks: 'Where is the cheapest single rate in the entire matrix right now?' VAM asks: 'Which row or column will suffer the highest financial penalty if we fail to allocate to its cheapest route?' VAM evaluates regret/opportunity loss, making it generally superior to Least-Cost.",
    hint: "Least-Cost looks at absolute numbers; VAM looks at the margin between first and second best.",
    level: "intermediate",
    codeExample: "Least-Cost: min(c_ij). VAM: Penalty_i = c_{i, second_min} - c_{i, min}."
  },
  {
    question: "Why is the Matrix Minima method often preferred in introductory operations research over Vogel's Approximation Method?",
    shortAnswer: "It strikes an ideal balance between conceptual simplicity, manual calculation speed, and respectable solution quality.",
    explanation: "VAM requires recalculating row and column penalties after every single allocation, which is computationally tedious and prone to arithmetic mistakes during manual paper-and-pencil examinations. Least-Cost merely requires identifying the lowest number in the remaining matrix, which is fast and intuitive while still vastly outperforming NWCR.",
    hint: "Finding the minimum number in a table is much faster than recalculating multiple line penalties.",
    level: "intermediate",
    codeExample: "Complexity for students: NWCR (easiest, terrible cost) < Least-Cost (easy, good cost) < VAM (tedious, best cost)."
  },
  {
    question: "If a transportation matrix has dimensions 4 × 5, how many basic allocated cells must the Least-Cost solution contain?",
    shortAnswer: "Exactly 8 basic allocated cells (4 + 5 - 1 = 8).",
    explanation: "For any transportation problem with m origins and n destinations, the rank of the constraint coefficient matrix is m + n - 1. Thus, any non-degenerate basic feasible solution must have exactly m + n - 1 basic variables (allocated cells). Here, 4 + 5 - 1 = 8.",
    hint: "Formula: Number of basic cells = m + n - 1.",
    level: "intermediate",
    codeExample: "m = 4, n = 5 → Basic Cells = 4 + 5 - 1 = 8 allocations."
  },
  {
    question: "What happens if all unit transportation costs c_ij in the matrix are equal (e.g., all c_ij = ₹5)?",
    shortAnswer: "The Least-Cost method degenerates into an arbitrary allocation sequence, where every cell is tied for minimum cost.",
    explanation: "If every route costs exactly ₹5/unit, the total transportation cost Z will be constant (Z = ₹5 × Total Flow) for all feasible solutions regardless of allocation pattern. The greedy search finds every cell eligible, and tie-breaking governs the sequence.",
    hint: "If all costs are uniform, any valid flow distribution yields the exact same total expenditure.",
    level: "intermediate",
    codeExample: "c_ij = k ∀(i,j) ⇒ Total Cost Z = k · Σ s_i (Invariant across all feasible solutions)."
  },
  {
    question: "Under what conditions can the Least-Cost allocation yield the exact globally optimal solution directly?",
    shortAnswer: "When the greedy allocations do not induce negative opportunity costs (all net evaluations Δ_ij = c_ij - u_i - v_j ≥ 0).",
    explanation: "In smaller matrices (e.g., 2×2 or 2×3) or matrices where the lowest cost cells align without cross-coupling bottleneck conflicts, the greedy assignments directly coincide with the optimal basic variable set. When tested with MODI multipliers, if no entering variable has Δ_ij < 0, the IBFS is already optimal.",
    hint: "If no cost-reducing loop can be formed, the starting draft is already perfect.",
    level: "expert",
    codeExample: "Δ_ij = c_ij - (u_i + v_j) ≥ 0 for all non-basic cells (i,j) ⇒ Solution is Optimal."
  },
  {
    question: "How do you systematically update the supply and demand arrays after allocating x_kl = min(s_k, d_l)?",
    shortAnswer: "Subtract x_kl from both s_k and d_l, then mark the entity that reaches 0 as inactive for future cost searches.",
    explanation: "Let x_kl = min(s_k, d_l). New supply becomes s_k' = s_k - x_kl. New demand becomes d_l' = d_l - x_kl. If s_k' == 0, row k is exhausted and eliminated from the matrix search space. If d_l' == 0, column l is satisfied and eliminated.",
    hint: "Deduct the shipped amount from both origin stock and destination requirement.",
    level: "intermediate",
    codeExample: "s[k] -= alloc; d[l] -= alloc; if (s[k] === 0) rowExhausted[k] = true; if (d[l] === 0) colSatisfied[l] = true;"
  },
  {
    question: "Why is it mathematically forbidden to allocate more than min(s_i, d_j) to cell (i, j)?",
    shortAnswer: "Allocating more than min(s_i, d_j) violates non-negativity constraints, resulting in physically impossible negative remaining supply or demand.",
    explanation: "Linear programming constraints state Σ_j x_ij = s_i and Σ_i x_ij = d_j with x_ij ≥ 0. If x_ij > s_i, then remaining supply s_i - x_ij < 0, meaning a factory would ship goods it does not possess. Similarly, x_ij > d_j would deliver unwanted surplus.",
    hint: "You cannot ship what a factory does not have, nor can a store receive more than its warehouse capacity.",
    level: "basic",
    codeExample: "Constraint violation: x_ij ≤ s_i and x_ij ≤ d_j ⇒ x_ij ≤ min(s_i, d_j)."
  },
  {
    question: "In practical software engineering, how is the cost matrix represented for Matrix Minima allocation?",
    shortAnswer: "As a 2D numeric array (e.g., number[][]) accompanied by 1D capacity vectors and boolean flags for row/column elimination status.",
    explanation: "A robust TypeScript/JavaScript representation uses an m×n matrix `costMatrix`, an m-length array `supplies`, an n-length array `demands`, and tracking arrays `rowDone: boolean[]` and `colDone: boolean[]`. An allocation history array records the step-by-step assignments.",
    hint: "Think about the data structures required to track 2D costs, 1D stocks, and active line filters.",
    level: "intermediate",
    codeExample: "interface Cell { r: number; c: number; cost: number; alloc: number; }\ntype State = { costs: number[][]; supply: number[]; demand: number[]; };"
  },
  {
    question: "What is the 'opportunity cost' concept in transportation and how does Least-Cost attempt to minimize it?",
    shortAnswer: "Opportunity cost is the economic penalty incurred by utilizing a suboptimal route; Least-Cost greedily claims the zero-penalty lowest rate first.",
    explanation: "If destination 1 can receive goods from Origin A at ₹3 or Origin B at ₹8, using Origin A incurs ₹0 extra cost per unit, while using Origin B costs an extra ₹5/unit. Least-Cost locks in the ₹3 rate first to capture maximum immediate economic advantage.",
    hint: "Every rupee paid above the cheapest possible route is a lost economic opportunity.",
    level: "intermediate",
    codeExample: "Penalty = c_ij - min_{k} c_kj. Least-Cost targets the minimum cost cell where Penalty = 0."
  },
  {
    question: "Can a row or column have multiple basic allocations in a solution generated by the Least-Cost method?",
    shortAnswer: "Yes, an origin can supply multiple destinations or a destination can receive from multiple origins across different steps.",
    explanation: "If an origin has a large supply (e.g., Kolkata warehouse with 100 units), satisfying a small demand in Barrackpore (30 units at ₹2) leaves 70 units. In a later step, the next lowest available cost might be from Kolkata to Ichapur (40 units at ₹4). Thus, row 1 receives multiple basic allocations.",
    hint: "A single large factory often distributes goods to several smaller retail depots.",
    level: "intermediate",
    codeExample: "Row 1: x_11 = 30 (to Barrackpore), x_12 = 40 (to Ichapur), x_13 = 30 (to Jadavpur)."
  },
  {
    question: "How does the Matrix Minima method handle an input matrix where some supply or demand values are zero initially?",
    shortAnswer: "Any line with 0 initial capacity is immediately marked as exhausted/eliminated, receiving 0 allocation.",
    explanation: "If a warehouse has s_i = 0 or a city has d_j = 0, no physical units can be routed through that line. The algorithm immediately excludes row i or column j, ensuring no basic allocation is assigned there unless an ε allocation is explicitly required for degeneracy resolution.",
    hint: "Zero capacity means nothing can flow in or out of that node.",
    level: "intermediate",
    codeExample: "if (supply[i] === 0) rowExhausted[i] = true;"
  },
  {
    question: "What is the effect of multiplying all elements of the cost matrix by a positive constant k (c_ij' = k · c_ij) on the Least-Cost allocation?",
    shortAnswer: "The allocation sequence and final allocated quantities remain completely identical; only the total cost scales by k.",
    explanation: "Because k > 0 is strictly monotonic, argmin_{(i,j)} { k · c_ij } = argmin_{(i,j)} { c_ij }. The relative ordering of all cell costs is preserved, so the algorithm selects the exact same cells and allocates the exact same quantities. Total cost Z' = k · Z.",
    hint: "Scaling all prices by a currency conversion factor does not change which route is cheapest.",
    level: "intermediate",
    codeExample: "c_ij → 10 · c_ij ⇒ argmin(10 · c_ij) = argmin(c_ij); Z_new = 10 · Z_old."
  },
  {
    question: "What happens if a constant scalar C is added to every cell in the cost matrix (c_ij' = c_ij + C)?",
    shortAnswer: "The Least-Cost allocation remains unchanged, and total cost increases by C × Total Supply.",
    explanation: "Adding a fixed surcharge C to every route does not change the difference or relative ordering between any two cells (c_a + C < c_b + C ⇔ c_a < c_b). Therefore, the minimum cost cell selection sequence is invariant. Total cost Z' = Z + C · (Σ s_i).",
    hint: "A flat toll tax applied to every road equally doesn't change which road is cheapest.",
    level: "expert",
    codeExample: "min(c_ij + C) occurs at the same (i, j) as min(c_ij); ΔZ = C · TotalUnits."
  },
  {
    question: "How does the Least-Cost method behave on a 1 × n (single supplier, multiple destinations) transportation problem?",
    shortAnswer: "It trivially allocates to each destination in order of increasing unit cost until supply is exhausted, matching the optimal solution.",
    explanation: "With only 1 source, there are no cross-supplier trade-offs. The greedy strategy sorts the destination shipping costs in ascending order and satisfies them sequentially. This single-source knapsack-like dispatch is mathematically guaranteed to achieve the global minimum cost.",
    hint: "With only one origin, there are no complex multi-variable interactions—cheapest destinations always win.",
    level: "expert",
    codeExample: "Sort destinations by c_1j ascending; allocate x_1j = min(remaining_s, d_j) sequentially. Result is 100% optimal."
  },
  {
    question: "What diagnostic check should an operations researcher perform immediately after completing the Least-Cost allocation?",
    shortAnswer: "Check 1: Total allocations count = m + n - 1; Check 2: All row sums equal S_i; Check 3: All column sums equal D_j; Check 4: No closed loops exist.",
    explanation: "Before applying MODI testing, the analyst must verify that the solution is both Basic (m + n - 1 independent cells without loops) and Feasible (all supply and demand constraints satisfied exactly with non-negative values). If allocations < m + n - 1, insert ε into an independent cell.",
    hint: "Validate feasibility, basic variable count, and loop-free independence before starting optimization.",
    level: "intermediate",
    codeExample: "assert(allocations.length === m + n - 1);\nassert(supplies.every((s, i) => sumRow(i) === s));\nassert(demands.every((d, j) => sumCol(j) === d));"
  },
  {
    question: "Why is the Matrix Minima method classified as a 'heuristic' rather than an 'exact algorithm'?",
    shortAnswer: "Because it relies on a local rule of thumb (greedy selection) to find a good solution quickly without guaranteeing theoretical optimality.",
    explanation: "An exact algorithm (like the Simplex or MODI method) guarantees finding the global optimum by iteratively verifying optimality conditions and proving no better solution exists. A heuristic like Matrix Minima uses an intuitive rule ('pick cheapest first') to construct a valid starting solution without proving optimality.",
    hint: "Heuristics find 'good enough' starting answers fast; exact algorithms find and prove the 'best' answer.",
    level: "intermediate",
    codeExample: "Heuristic: Fast construction (Matrix Minima) → Exact Method: Systematic refinement to optimum (MODI / Simplex)."
  }
];

export default questions;
