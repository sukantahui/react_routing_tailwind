// topic6_questions.js
// 30 Moderate to Expert Questions on Balanced and Unbalanced Examples in Vogel's Approximation Method (VAM)

const questions = [
  {
    question: "What is the formal mathematical condition for a transportation problem to be classified as 'Balanced'?",
    shortAnswer: "Total available supply across all origins must exactly equal total required demand across all destinations: sum_{i=1}^m S_i = sum_{j=1}^n D_j.",
    explanation: "When total supply matches total demand, all produced goods can be distributed to satisfy all customer requirements without creating artificial surpluses or shortages.",
    hint: "Sum of S_i equals sum of D_j.",
    level: "moderate",
    codeExample: "sum(S_i for i in 1..m) === sum(D_j for j in 1..n)"
  },
  {
    question: "How is an unbalanced transportation problem with excess supply (Sum S_i > Sum D_j) converted into a balanced problem before applying VAM?",
    shortAnswer: "By introducing a fictitious Dummy Destination (Column) with unit costs of ₹0 and demand requirement D_dummy = Sum S_i - Sum D_j.",
    explanation: "The dummy column absorbs the excess factory capacity. Since shipping to a fictitious destination incurs zero real cost, all its unit cost coefficients are set to c_i,dummy = ₹0.",
    hint: "Add a dummy column with demand = excess supply and cost = 0.",
    level: "moderate",
    codeExample: "D_dummy = Sum(Supply) - Sum(Demand); c_{i, dummy} = 0 for all i."
  },
  {
    question: "How is an unbalanced problem with excess demand (Sum D_j > Sum S_i) converted into a balanced problem?",
    shortAnswer: "By introducing a fictitious Dummy Origin (Row) with unit costs of ₹0 and supply capacity S_dummy = Sum D_j - Sum S_i.",
    explanation: "The dummy row represents fictitious factory supply. Allocating to the dummy row indicates which destination demands cannot be fulfilled (unmet shortages). All unit costs in the dummy row are set to c_dummy,j = ₹0.",
    hint: "Add a dummy row with supply = excess demand and cost = 0.",
    level: "moderate",
    codeExample: "S_dummy = Sum(Demand) - Sum(Supply); c_{dummy, j} = 0 for all j."
  },
  {
    question: "How does adding a ₹0 dummy column affect the penalty calculations in Tableau 1 of VAM?",
    shortAnswer: "In every row, ₹0 becomes the new lowest unit cost c_(1) = ₹0, making the row penalty equal to the old lowest cost: P_i = c_(old lowest) - ₹0 = c_(old lowest).",
    explanation: "Because ₹0 is smaller than any positive transportation cost, each row's previous minimum becomes its second-lowest cost, while the dummy column's own penalty is usually ₹0 (₹0 - ₹0 = ₹0).",
    hint: "In each row, 0 is the smallest element, so the previous smallest becomes the second smallest.",
    level: "expert",
    codeExample: "Row costs: [₹6, ₹10, ₹14] + Dummy [₹0] -> New sorted: [₹0, ₹6, ₹10, ₹14] -> P_i = 6 - 0 = ₹6."
  },
  {
    question: "Suppose Debangshu in Barrackpore has factory supplies [50, 70, 80] and destination demands [60, 50, 60]. Is the problem balanced? If not, what dummy is needed?",
    shortAnswer: "Total supply = 200 tons; Total demand = 170 tons. It is unbalanced with 30 tons excess supply. Add a Dummy Column with demand D_dummy = 30 tons and unit costs ₹0.",
    explanation: "Sum S_i = 50 + 70 + 80 = 200 tons. Sum D_j = 60 + 50 + 60 = 170 tons. Excess supply = 200 - 170 = 30 tons. A dummy destination D4 is added with demand 30 tons and costs [₹0, ₹0, ₹0]^T.",
    hint: "200 - 170 = 30 excess supply -> Dummy column of 30.",
    level: "moderate",
    codeExample: "Total S = 200; Total D = 170 -> Add Dummy Col D4 (Demand = 30, cost = ₹0)."
  },
  {
    question: "What is the physical managerial interpretation if 30 units are allocated to cell (S2, D_dummy) at the end of VAM?",
    shortAnswer: "Factory S2 holds 30 units of unallocated surplus inventory that will remain in the warehouse and will not be shipped.",
    explanation: "Shipments assigned to a dummy destination represent goods that are not dispatched, saving shipping costs but remaining as warehouse stock.",
    hint: "Allocation to dummy destination = unshipped inventory.",
    level: "moderate",
    codeExample: "x_{2, dummy} = 30 => Factory 2 retains 30 units unsold in storage."
  },
  {
    question: "Suppose Mamata in Kolkata has factory supplies [60, 40] and destination demands [50, 40, 30]. Is the problem balanced? What dummy is needed?",
    shortAnswer: "Total supply = 100 boxes; Total demand = 120 boxes. Unbalanced with 20 boxes shortage. Add a Dummy Row with supply S_dummy = 20 boxes and unit costs ₹0.",
    explanation: "Sum S_i = 100, Sum D_j = 120. Shortage = 120 - 100 = 20 boxes. A dummy origin S3 is added with supply 20 boxes and costs [₹0, ₹0, ₹0].",
    hint: "120 - 100 = 20 excess demand -> Dummy row of 20.",
    level: "moderate",
    codeExample: "Total S = 100; Total D = 120 -> Add Dummy Row S3 (Supply = 20, cost = ₹0)."
  },
  {
    question: "What is the managerial meaning if 20 units are allocated to cell (S_dummy, D3) at the end of VAM?",
    shortAnswer: "Destination D3 suffers an unmet demand deficit (shortage) of 20 units because factory production was insufficient.",
    explanation: "Allocations from a dummy origin indicate which customer locations will experience stockouts or delayed fulfillment.",
    hint: "Allocation from dummy row = unmet customer shortage.",
    level: "moderate",
    codeExample: "x_{dummy, 3} = 20 => Destination 3 receives 20 fewer units than ordered."
  },
  {
    question: "Do allocations made to ₹0 dummy cells contribute to the final total transportation cost Z?",
    shortAnswer: "No, they contribute ₹0 because x_ij * ₹0 = ₹0.",
    explanation: "Because dummy routes are fictitious with zero unit freight cost, any quantity x_dummy shipped over them adds zero rupees to the objective function value Z.",
    hint: "Any quantity multiplied by 0 is 0.",
    level: "moderate",
    codeExample: "Cost contribution = x_{dummy} * 0 = ₹0."
  },
  {
    question: "In calculating the required basis count for an unbalanced m x n problem after adding a dummy line, what are the new dimensions?",
    shortAnswer: "If a dummy column is added, dimensions become m x (n+1) requiring m + (n+1) - 1 = m + n basic cells; if a dummy row is added, dimensions become (m+1) x n requiring (m+1) + n - 1 = m + n basic cells.",
    explanation: "The dummy line adds one extra row or column to the constraint matrix, increasing the required basic variable count by 1.",
    hint: "Add 1 to the basis count of the original dimensions.",
    level: "expert",
    codeExample: "Basis Count (Unbalanced) = (m + n + 1) - 1 = m + n basic cells."
  },
  {
    question: "Suppose Susmita in Ichapur has an unbalanced 3 x 3 problem that requires a dummy column. How many basic cells must her final solution contain?",
    shortAnswer: "6 basic cells (3 rows + 4 columns - 1 = 6).",
    explanation: "With the dummy column, matrix size becomes 3 x 4. Basic cells required = 3 + 4 - 1 = 6.",
    hint: "3 + 4 - 1 = 6.",
    level: "moderate",
    codeExample: "Basis Count = 3 + 4 - 1 = 6"
  },
  {
    question: "What happens to column penalties when a dummy row with [₹0, ₹0, ..., ₹0] is added?",
    shortAnswer: "In every column j, ₹0 becomes the new lowest cost c_(1) = ₹0, and the column penalty equals the column's old lowest cost: P_j = c_(old lowest) - ₹0 = c_(old lowest).",
    explanation: "Just as dummy columns shift row penalties, dummy rows shift column penalties symmetrically.",
    hint: "Each column's minimum becomes 0, so penalty becomes old minimum.",
    level: "expert",
    codeExample: "Col costs: [₹5, ₹9] + Dummy [₹0] -> P_j = 5 - 0 = ₹5."
  },
  {
    question: "Can a dummy line in VAM have non-zero unit costs (e.g. storage holding cost or stockout penalty)?",
    shortAnswer: "Yes, if the problem specifies inventory holding costs for surplus goods or backorder penalty costs for unmet demand, these values are entered in the dummy cells.",
    explanation: "In standard academic problems dummy costs are ₹0, but advanced enterprise models use holding cost h_i or penalty cost p_j in dummy lines.",
    hint: "Dummy costs can reflect inventory holding or stockout penalties.",
    level: "expert",
    codeExample: "c_{i, dummy} = holding_cost_i (for excess supply)."
  },
  {
    question: "If Mahima evaluates a row with costs [₹8, ₹14, ₹10] and a dummy column [₹0], what is the row penalty?",
    shortAnswer: "₹8 (₹8 - ₹0).",
    explanation: "Sorted costs: [₹0, ₹8, ₹10, ₹14]. Lowest = ₹0, second-lowest = ₹8. Penalty = ₹8 - ₹0 = ₹8.",
    hint: "Subtract 0 from 8.",
    level: "moderate",
    codeExample: "P = 8 - 0 = ₹8"
  },
  {
    question: "Why should an operations research practitioner never omit the dummy line when solving with VAM?",
    shortAnswer: "Because omitting the dummy line makes the system mathematically infeasible, producing incorrect penalty differences and invalid basic solutions.",
    explanation: "Transportation simplex theory relies on exact conservation of flow (Sum S_i = Sum D_j). Without a dummy line, the algorithm breaks.",
    hint: "Flow conservation requires exact supply-demand balance.",
    level: "intermediate",
    codeExample: "Infeasible: Sum(S) != Sum(D) -> Solver failure."
  },
  {
    question: "Suppose Abhronila in Jadavpur has supplies [40, 60] and demands [30, 40, 50]. Total supply = 100, total demand = 120. Where should the dummy be placed?",
    shortAnswer: "Add a Dummy Row (S3) with supply 20 and costs [₹0, ₹0, ₹0].",
    explanation: "Demand exceeds supply by 20 units. A third row S3 is added with capacity 20 and zero unit costs.",
    hint: "Shortage of 20 units in supply -> Add Dummy Row.",
    level: "moderate",
    codeExample: "Dummy Row S3: Supply = 20, costs = [0, 0, 0]."
  },
  {
    question: "In the above problem, if the dummy row has costs [₹0, ₹0, ₹0], what is the dummy row's own penalty in Pass 1?",
    shortAnswer: "₹0 (₹0 - ₹0 = ₹0).",
    explanation: "All entries in the dummy row are ₹0. Lowest = ₹0, second-lowest = ₹0. Penalty = ₹0 - ₹0 = ₹0.",
    hint: "0 - 0 = 0.",
    level: "moderate",
    codeExample: "P_dummy = 0 - 0 = ₹0"
  },
  {
    question: "Why does a dummy row or dummy column with penalty ₹0 have the lowest priority for line selection in Pass 1?",
    shortAnswer: "Because ₹0 penalty means there is zero difference between routes inside the dummy line, allowing VAM to focus on high-penalty real routes first.",
    explanation: "Real routes with large positive penalties represent urgent financial hazards; the dummy line has zero regret.",
    hint: "Zero penalty line can wait safely.",
    level: "moderate",
    codeExample: "P_dummy = ₹0 -> Low priority for initial line selection."
  },
  {
    question: "When are allocations to the dummy line usually made during the VAM procedure?",
    shortAnswer: "Usually during the final passes when real supply and demand have been allocated, leaving the residual surplus or deficit to absorb the dummy capacity.",
    explanation: "Because dummy cells have zero penalties, VAM prioritizes real cost-saving routes first and allocates to dummy cells near the end.",
    hint: "Residual surplus or shortage is resolved in later passes.",
    level: "expert",
    codeExample: "Dummy allocations typically occur in terminal passes."
  },
  {
    question: "Suppose Debangshu solves an unbalanced problem and allocates 30 units @ ₹0 in cell (S1, D_dummy), 40 units @ ₹4 in (S1, D1), and 50 units @ ₹6 in (S2, D2). What is total cost Z?",
    shortAnswer: "₹460 ( (30 * 0) + (40 * 4) + (50 * 6) = 0 + 160 + 300 = ₹460 ).",
    explanation: "Dummy allocation contributes 30 * ₹0 = ₹0. Real routes: (40 * 4 = 160) + (50 * 6 = 300) = ₹460 total.",
    hint: "0 + 160 + 300 = 460.",
    level: "moderate",
    codeExample: "Z = (30 * 0) + (40 * 4) + (50 * 6) = ₹460"
  },
  {
    question: "If an unbalanced problem with 4 origins and 3 destinations requires a dummy column, how many total cells exist in the augmented tableau?",
    shortAnswer: "16 cells (4 rows * 4 columns = 16).",
    explanation: "With the dummy column, matrix size becomes 4 x 4 = 16 cells.",
    hint: "4 * (3 + 1) = 16.",
    level: "moderate",
    codeExample: "Augmented Cells = 4 * 4 = 16 cells."
  },
  {
    question: "How does Susmita verify that her final unbalanced solution satisfies all original physical constraints?",
    shortAnswer: "Confirm that for each origin i, sum of real shipments plus dummy shipment equals original supply S_i, and for each destination j, sum of real receipts plus dummy receipts equals demand D_j.",
    explanation: "Flow balance equations hold across all augmented rows and columns.",
    hint: "Sum of real + dummy equals specified capacities.",
    level: "intermediate",
    codeExample: "sum(x_ij for j in real+dummy) == S_i"
  },
  {
    question: "What is the common error students make when calculating column penalties after adding a ₹0 dummy row?",
    shortAnswer: "Forgetting to include the ₹0 in each column and incorrectly subtracting the two positive entries instead.",
    explanation: "The dummy row adds a ₹0 to every column. The two lowest entries in column j are now ₹0 and the lowest positive entry c_min. Subtracting positive entries misses the true penalty.",
    hint: "0 is the smallest entry in every column when a dummy row is present.",
    level: "expert",
    codeExample: "Correct: P_j = c_min - 0 = c_min. WRONG: P_j = c_second - c_min."
  },
  {
    question: "Can an unbalanced problem experience degeneracy after adding a dummy line?",
    shortAnswer: "Yes, if an allocation satisfies a real row and a dummy column simultaneously, degeneracy can occur just as in balanced problems.",
    explanation: "Degeneracy depends on numerical capacity equalities (S_k = D_l), which can happen between real lines and dummy lines.",
    hint: "Simultaneous zero balances can occur with dummy lines.",
    level: "expert",
    codeExample: "Degeneracy rule applies uniformly to real and dummy lines."
  },
  {
    question: "Why do transportation linear programs always have an optimal solution once balanced with a dummy line?",
    shortAnswer: "Because balancing guarantees a closed, bounded, non-empty feasible region with feasible flow satisfying all equality constraints.",
    explanation: "By the Fundamental Theorem of Linear Programming, a feasible bounded LP has at least one optimal basic feasible solution.",
    hint: "Balanced transportation problems are guaranteed to be feasible.",
    level: "expert",
    codeExample: "Feasible Region != empty => Optimal solution exists."
  },
  {
    question: "Suppose Mamata has 3 factories with supplies [100, 150, 50] and 3 hospitals with demands [80, 70, 90]. What is the required dummy demand?",
    shortAnswer: "60 units (Total Supply = 300; Total Demand = 240; Excess = 300 - 240 = 60 units).",
    explanation: "Sum S_i = 300. Sum D_j = 240. Dummy column requirement = 300 - 240 = 60 units.",
    hint: "300 - 240 = 60.",
    level: "moderate",
    codeExample: "D_dummy = 300 - 240 = 60 units."
  },
  {
    question: "In the above healthcare problem, what does the 60 units assigned to the dummy column signify?",
    shortAnswer: "60 boxes of medicine remain in storage across the factories as surplus buffer stock.",
    explanation: "Hospital demand was fully met (240 boxes), leaving 60 unneeded boxes in warehouse inventory.",
    hint: "Excess production remains in warehouse.",
    level: "moderate",
    codeExample: "Surplus = 60 boxes retained in stock."
  },
  {
    question: "What is the primary visual recommendation for displaying dummy rows or columns in classroom tableaus?",
    shortAnswer: "Label them distinctly as 'Dummy (S_D)' or 'Dummy (D_D)', write '₹0' in all cost slots, and highlight them with a dashed border or distinct color.",
    explanation: "Visual distinction prevents students from mistaking fictitious dummy flows for real commercial deliveries.",
    hint: "Clear labels and ₹0 cost tags.",
    level: "intermediate",
    codeExample: "Column Header: 'D_Dummy (Shortage/Surplus)' with c_ij = ₹0."
  },
  {
    question: "How does solving unbalanced problems with VAM benefit industrial supply chain planners in West Bengal?",
    shortAnswer: "It allows planners to identify optimal inventory holding locations during surplus seasons and pinpoint exact factory expansion needs during shortage periods.",
    explanation: "Dummy allocations show where surplus accumulates or where shortages occur, guiding warehouse capacity planning.",
    hint: "Reveals optimal inventory placement and capacity bottlenecks.",
    level: "expert",
    codeExample: "Strategic Insight: Dummy allocations guide warehouse expansion."
  },
  {
    question: "What is the golden checklist rule for balancing transportation models in VAM?",
    shortAnswer: "'Always calculate Sum(Supply) and Sum(Demand) first; if unequal, add a ₹0 dummy line before computing a single penalty!'",
    explanation: "This rule guarantees that every penalty calculation is mathematically sound from Step 1.",
    hint: "Balance first, compute penalties second.",
    level: "moderate",
    codeExample: "Rule: Balance Check -> Add Dummy if needed -> Calculate VAM Penalties."
  }
];

export default questions;
