// topic3_questions.js
// 30 Moderate to Expert Questions on Allocation Using the Least-Cost Cell in Vogel's Approximation Method (VAM)

const questions = [
  {
    question: "Once the winning line L* with maximum penalty is identified, how is the target cell within that line selected?",
    shortAnswer: "The target cell is the cell with the absolute lowest unit transportation cost min(c_ij) among all currently active cells in that winning line.",
    explanation: "VAM uses the maximum penalty to identify which supply row or demand column has the most urgent need for protection. Once that line is fixed, the allocator selects the cheapest available route in that line to secure the best economic rate and avoid paying the second-best penalty rate.",
    hint: "Max penalty selects the line; min unit cost selects the cell inside that line.",
    level: "moderate",
    codeExample: "Target Cell (k, l) = argmin_{j in ActiveCols} c_kj (if row wins) or argmin_{i in ActiveRows} c_il (if col wins)."
  },
  {
    question: "What mathematical formula determines the exact quantity of goods allocated to the target cell (k, l)?",
    shortAnswer: "x_kl = min(S_k, D_l), where S_k is the remaining supply of origin k and D_l is the remaining demand of destination l.",
    explanation: "Feasibility requires that no origin exceeds its available supply (x_ij <= S_i) and no destination receives more than its required demand (x_ij <= D_j). Therefore, the maximum allowable shipment without violating capacity constraints is min(S_k, D_l).",
    hint: "Take the smaller of remaining supply and remaining demand.",
    level: "moderate",
    codeExample: "x_kl = Math.min(Supply[k], Demand[l])"
  },
  {
    question: "Suppose Debangshu in Barrackpore has S_1 = 70 tons and Jadavpur Depot has D_2 = 45 tons. If cell (1, 2) is chosen, how much is allocated and what are the updated balances?",
    shortAnswer: "Allocate x_12 = 45 tons; updated S_1 = 25 tons, updated D_2 = 0 tons (Column 2 is crossed out).",
    explanation: "x_12 = min(70, 45) = 45 tons. Remaining supply S_1 = 70 - 45 = 25 tons. Remaining demand D_2 = 45 - 45 = 0 tons. Since D_2 is completely fulfilled, Column 2 is crossed out.",
    hint: "min(70, 45) = 45; deduct 45 from both balances.",
    level: "moderate",
    codeExample: "x_12 = 45; S_1' = 70 - 45 = 25; D_2' = 45 - 45 = 0 (Cross Col 2)."
  },
  {
    question: "What happens to the transportation tableau when an allocation reduces both a row's supply and a column's demand to ZERO simultaneously (S_k = D_l)?",
    shortAnswer: "Only ONE line (either row k or column l) is crossed out, while the other is left active with a remaining balance of 0 to preserve basic variable count.",
    explanation: "An m x n transportation problem must have exactly m + n - 1 basic variables. If both row and column were crossed out in a single step, the final basis would have only m + n - 2 allocations (degeneracy). Leaving one line active with balance 0 ensures a zero-allocation can be made in a subsequent step.",
    hint: "Never eliminate two lines in a single allocation step.",
    level: "expert",
    codeExample: "if (S_k === D_l) { allocate(S_k); crossOutRow(k); Demand[l] = 0; /* Col l stays active */ }"
  },
  {
    question: "Why does allocating the maximum feasible quantity x_kl = min(S_k, D_l) maximize total cost savings for that step?",
    shortAnswer: "Because it assigns the maximum possible volume to the cheapest available route, thereby reducing the volume that might later spill into higher-cost routes.",
    explanation: "Total cost is Z = sum(c_ij * x_ij). Every unit shipped at the minimum rate c_min replaces a unit that would otherwise be shipped at c_second or worse, producing a net saving of x_kl * (c_second - c_min).",
    hint: "Multiplying maximum volume by the penalty difference maximizes financial regret avoidance.",
    level: "expert",
    codeExample: "Savings = x_kl * (c_second - c_min) → Maximized when x_kl is as large as possible."
  },
  {
    question: "If there is a tie between two cells in the winning line having the identical minimum cost, how is the tie resolved?",
    shortAnswer: "Allocate to the cell that accommodates the larger allocation volume min(S_i, D_j); if still tied, select arbitrarily.",
    explanation: "If winning Row 1 has costs [₹4, ₹9, ₹4] at columns 1 and 3, compare min(S_1, D_1) with min(S_1, D_3). Allocating to the cell that absorbs greater quantity clears inventory faster.",
    hint: "Choose the cell that can take more shipments at the bargain rate.",
    level: "moderate",
    codeExample: "If c_11 == c_13 == ₹4, pick argmax(min(S_1, D_1), min(S_1, D_3))."
  },
  {
    question: "Suppose Mamata in Kolkata has a winning Column with demand 80, and the candidate row supplies are S_1 = 30 (@ ₹4), S_2 = 60 (@ ₹12), S_3 = 50 (@ ₹15). Which cell gets allocated first?",
    shortAnswer: "Cell (1, j) with cost ₹4 gets allocated min(30, 80) = 30 units, exhausting Row 1.",
    explanation: "Within the winning column, the lowest cost cell is Row 1 at ₹4/unit. Allocation x_1j = min(30, 80) = 30 units. Row 1 is crossed out, leaving remaining demand of 50 units in the column.",
    hint: "Pick the cheapest row in that column and allocate as much as possible.",
    level: "moderate",
    codeExample: "c_1j = ₹4 is min → x_1j = min(30, 80) = 30 units."
  },
  {
    question: "What is the remaining demand for Mamata's column after allocating 30 units in the above scenario?",
    shortAnswer: "50 units (80 - 30 = 50).",
    explanation: "The column required 80 units; receiving 30 units leaves 80 - 30 = 50 units to be satisfied in subsequent iterations.",
    hint: "80 - 30 = 50.",
    level: "moderate",
    codeExample: "D_j' = 80 - 30 = 50 units."
  },
  {
    question: "Why must the allocator cross out the exhausted row or column immediately after updating capacity?",
    shortAnswer: "To remove those cells from the active candidate set so they are not erroneously considered in subsequent penalty and allocation passes.",
    explanation: "An exhausted line has zero remaining capacity. Leaving its cells active would distort future penalty differences and risk assigning phantom shipments to empty warehouses.",
    hint: "Cross-outs define the boundaries of the reduced sub-matrix.",
    level: "moderate",
    codeExample: "ActiveLines = ActiveLines.filter(line => line.capacity > 0)"
  },
  {
    question: "In an m x n transportation problem, what is the maximum number of allocation steps required to reach the final IBFS?",
    shortAnswer: "At most m + n - 1 allocation steps.",
    explanation: "Each allocation eliminates at least one row or column constraint. Since there are m rows and n columns, satisfying all constraints without degeneracy requires exactly m + n - 1 assignments.",
    hint: "Count total basic variables in a standard transportation tableau.",
    level: "intermediate",
    codeExample: "Total Basic Cells = m + n - 1"
  },
  {
    question: "Suppose Susmita in Ichapur has an active sub-matrix of size 1 x 3 (1 row, 3 columns). How are allocations made?",
    shortAnswer: "Directly allocate the remaining demand of each column from the sole surviving row; no further penalty calculations are needed.",
    explanation: "When only one row remains, there are no competing routes or second choices. Feasibility dictates that x_1j = D_j for all active columns j.",
    hint: "When one row is left, distribution is completely determined by remaining column demands.",
    level: "moderate",
    codeExample: "For each col j: x_1j = D_j; S_1 = S_1 - D_j."
  },
  {
    question: "What is the danger of making an allocation to a cell other than the least-cost cell in the winning line?",
    shortAnswer: "It forfeits the immediate economic advantage of that line and forces unnecessary expenditures, violating the core VAM regret-minimization heuristic.",
    explanation: "The entire premise of selecting the maximum penalty line was to capture its lowest-cost route. Picking a more expensive cell inside that line directly inflicts the penalty on the system.",
    hint: "Always allocate to the cheapest cell in the chosen line.",
    level: "moderate",
    codeExample: "Violation: Choosing c_second instead of c_min in winning line L*."
  },
  {
    question: "How does Mahima in Barrackpore record an allocated cell on a manual paper tableau?",
    shortAnswer: "By writing the allocated quantity x_ij in a prominent box or circle inside the cell (usually top-left or centered), leaving the unit cost c_ij clearly visible in the corner.",
    explanation: "Clear visual separation between unit cost c_ij and allocated volume x_ij prevents arithmetic confusion during total cost computation Z = sum(c_ij * x_ij).",
    hint: "Differentiate quantity (units) from rate (₹/unit).",
    level: "intermediate",
    codeExample: "Cell layout: [ (x_ij = 50) | c_ij = ₹4 ]"
  },
  {
    question: "If Abhronila allocates 40 units to cell (2, 3) with unit cost ₹6, what is the subtotal freight expenditure for this specific route?",
    shortAnswer: "₹240 (40 units * ₹6/unit).",
    explanation: "Freight cost = Quantity * Unit Rate = 40 * ₹6 = ₹240.",
    hint: "Multiply 40 by 6.",
    level: "moderate",
    codeExample: "Subtotal = 40 * 6 = ₹240"
  },
  {
    question: "Can an allocation in VAM ever be a fractional quantity (e.g. 14.5 units)?",
    shortAnswer: "Only if the original supply or demand capacities themselves contain fractional values; if all inputs are integers, all VAM allocations are strictly integers (Integrality Property).",
    explanation: "Because transportation constraint matrices are totally unimodular, all basic feasible solutions have integer values whenever supplies and demands are integers.",
    hint: "Total unimodularity guarantees integer solutions for integer inputs.",
    level: "expert",
    codeExample: "Integrality Theorem: S, D in Z^+ => all x_ij in Z^+."
  },
  {
    question: "Suppose Column 2 wins with max penalty P = ₹8, and active costs in Col 2 are c_12 = ₹14 (S_1 = 50) and c_32 = ₹6 (S_3 = 40), while D_2 = 60. How is the allocation executed?",
    shortAnswer: "Allocate min(S_3, D_2) = min(40, 60) = 40 units to cell (3, 2) @ ₹6. Row 3 is crossed out; Col 2 demand becomes 20.",
    explanation: "Inside Column 2, cell (3, 2) is cheapest at ₹6/unit. Allocation x_32 = min(40, 60) = 40 units exhausts Row 3 (S_3 = 0). D_2 updates to 60 - 40 = 20 units.",
    hint: "Pick ₹6 over ₹14; allocate 40 units.",
    level: "moderate",
    codeExample: "x_32 = 40; S_3' = 0 (Cross R3); D_2' = 20."
  },
  {
    question: "In the above problem, what happens to Column 2's remaining 20 units in the next pass?",
    shortAnswer: "It must be fulfilled from the remaining active supplier, Row 1 (cell (1, 2) @ ₹14), in a subsequent allocation step.",
    explanation: "Since Row 3 is exhausted, the only remaining supplier for Column 2 is Row 1.",
    hint: "Row 1 is the only surviving factory that can supply Column 2.",
    level: "moderate",
    codeExample: "Next pass: x_12 = 20 @ ₹14."
  },
  {
    question: "Why is the allocation rule x_kl = min(S_k, D_l) called a 'greedy reduction'?",
    shortAnswer: "Because it eliminates as much constraint deficit as possible in a single step without holding back capacity.",
    explanation: "Allocating less than min(S_k, D_l) would leave both row and column partially active, unnecessarily prolonging the algorithm and leaving cheap capacity underutilized.",
    hint: "Greedy = exhaust the bottleneck immediately.",
    level: "moderate",
    codeExample: "Greedy property: x_kl = min(S_k, D_l) eliminates at least one line."
  },
  {
    question: "If a row has remaining supply S_i = 0, what is its status in the tableau?",
    shortAnswer: "It is considered exhausted, struck out, and completely excluded from all further penalty and allocation calculations.",
    explanation: "A supply of 0 cannot ship any further goods. Its cells are inactive.",
    hint: "Zero supply = crossed out line.",
    level: "moderate",
    codeExample: "S_i == 0 => isCrossedOut = true."
  },
  {
    question: "How does allocating to the least-cost cell guarantee that the resulting basis is acyclic (contains no closed loops)?",
    shortAnswer: "Because each allocation strictly crosses out an unvisited row or column, building an independent tree structure in the bipartite graph.",
    explanation: "In graph theory, eliminating a vertex (row or column) upon adding each edge (allocation) ensures that no cycles can form, guaranteeing linear independence of the basic column vectors.",
    hint: "Each step connects an isolated origin to a destination and eliminates one node.",
    level: "expert",
    codeExample: "Bipartite Graph: Tree structure with m + n vertices and m + n - 1 edges."
  },
  {
    question: "Suppose Debangshu in Barrackpore has 3 factories and 4 warehouses. How many basic allocated cells must exist in his final tableau?",
    shortAnswer: "Exactly 6 basic cells (3 + 4 - 1 = 6).",
    explanation: "Basic allocations = m + n - 1 = 3 + 4 - 1 = 6.",
    hint: "m + n - 1 = 3 + 4 - 1.",
    level: "moderate",
    codeExample: "Basis Count = 3 + 4 - 1 = 6 allocations."
  },
  {
    question: "If an allocation step exhausts Row 1 and leaves D_2 = 0 in Column 2 at the same time, what is the best practice to avoid degeneracy?",
    shortAnswer: "Cross out Row 1 only, write D_2 = 0, and in the next pass make a basic allocation of 0 units (or epsilon) to an independent cell in Column 2 before crossing it out.",
    explanation: "Explicitly recording the 0 allocation maintains the full basis count of m + n - 1 and prevents singularity during subsequent MODI u-v multiplier computations.",
    hint: "An explicit 0 allocation is a valid basic variable.",
    level: "expert",
    codeExample: "Allocate x_k2 = 0; basis count preserved."
  },
  {
    question: "Why should students always double-check the subtraction of supply and demand immediately after writing down an allocation?",
    shortAnswer: "Because arithmetic subtraction errors in capacity propagate to all subsequent iterations, invalidating all remaining penalties and total cost.",
    explanation: "A mistake in subtracting S_k - x_kl corrupts the active constraint values for all future steps, causing false penalty differences and infeasible final solutions.",
    hint: "Audit capacity deductions immediately after each assignment.",
    level: "intermediate",
    codeExample: "Check: (old_supply - allocation == new_supply) && (old_demand - allocation == new_demand)"
  },
  {
    question: "Suppose Mamata allocates 50 units @ ₹3 and 30 units @ ₹5. What is the total transportation cost for these two routes?",
    shortAnswer: "₹300 ( (50 * 3) + (30 * 5) = 150 + 150 = 300 ).",
    explanation: "Route 1: 50 * ₹3 = ₹150; Route 2: 30 * ₹5 = ₹150; Total = ₹150 + ₹150 = ₹300.",
    hint: "150 + 150 = 300.",
    level: "moderate",
    codeExample: "Cost = (50 * 3) + (30 * 5) = ₹300"
  },
  {
    question: "What is the role of the 'least-cost cell' in preventing high opportunity cost?",
    shortAnswer: "It captures the primary bargain route that justified selecting the highest penalty line in the first place.",
    explanation: "The penalty was high because the gap between this least-cost cell and its backup was huge. Allocating to this cell secures the gap savings.",
    hint: "The least cost cell is the prize that the high penalty pointed towards.",
    level: "moderate",
    codeExample: "Seize the prize: min(c_ij) in max-penalty line."
  },
  {
    question: "If a winning row has costs [₹10, ₹10, ₹18], which ₹10 cell should be picked if both can take 40 units?",
    shortAnswer: "Either cell can be chosen arbitrarily; both yield identical cost and identical capacity reductions.",
    explanation: "When cost and volume are identical, arbitrary selection preserves optimality.",
    hint: "Symmetric choice has zero financial difference.",
    level: "moderate",
    codeExample: "Both give 40 * ₹10 = ₹400."
  },
  {
    question: "Why does VAM rarely allocate to prohibited routes with cost M?",
    shortAnswer: "Because the presence of M inflates line penalties, causing VAM to prioritize and exhaust the valid low-cost cells long before M is ever considered.",
    explanation: "The massive difference (M - c_min) drives line selection to grab the c_min cell immediately, shielding the network from M.",
    hint: "High penalty directs capacity into the safe non-M cell.",
    level: "expert",
    codeExample: "M penalty directs traffic away from M."
  },
  {
    question: "How does Susmita confirm that all row and column constraints are fully satisfied at the conclusion of VAM?",
    shortAnswer: "By verifying that for every row i, sum_j(x_ij) = S_i, and for every column j, sum_i(x_ij) = D_j.",
    explanation: "Summing allocations horizontally must equal original factory supplies; summing vertically must equal original customer demands.",
    hint: "Row sums == Supplies; Col sums == Demands.",
    level: "intermediate",
    codeExample: "for all i: sum(x_ij) === S_i; for all j: sum(x_ij) === D_j"
  },
  {
    question: "What is the final step after all allocations x_ij have been assigned across the entire matrix?",
    shortAnswer: "Compute the total initial transportation cost Z = sum_{i} sum_{j} (c_ij * x_ij) in Indian Rupees (₹).",
    explanation: "Multiply each allocated volume by its cell's unit transportation cost and sum all products to obtain the initial objective function value Z.",
    hint: "Sum of (Quantity * Rate) across all occupied basic cells.",
    level: "moderate",
    codeExample: "Z = sum_{basic cells} (c_ij * x_ij)"
  },
  {
    question: "How does the quality of VAM's least-cost allocations compare with Matrix Minima across industrial benchmarks?",
    shortAnswer: "VAM achieves 15% to 35% lower initial cost than North-West Corner and 5% to 15% lower initial cost than Matrix Minima on average.",
    explanation: "By combining least-cost allocations with prospective regret defense, VAM consistently lands within 1-2 simplex pivots of global optimality.",
    hint: "VAM avoids the costly traps that simple least-cost methods fall into.",
    level: "expert",
    codeExample: "Cost(VAM) <= Cost(Matrix Minima) << Cost(NWCR)"
  }
];

export default questions;
