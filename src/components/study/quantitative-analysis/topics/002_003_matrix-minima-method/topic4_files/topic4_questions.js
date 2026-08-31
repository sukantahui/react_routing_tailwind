// topic4_questions.js
// 30 Moderate to Expert Questions on Updating Supply and Demand

const questions = [
  {
    question: "What are the exact state update equations executed immediately after committing allocation x_kl?",
    shortAnswer: "S_k(new) = S_k(old) - x_kl and D_l(new) = D_l(old) - x_kl.",
    explanation: "Because physical goods have been committed from Origin k to Destination l, both the available factory inventory S_k and the unfilled destination demand D_l decrease by the exact allocated amount x_kl.",
    hint: "Deduct the allocated quantity from both origin stock and destination requirement.",
    level: "basic",
    codeExample: "supply[k] -= x_kl;\ndemand[l] -= x_kl;"
  },
  {
    question: "What fundamental mathematical invariant holds true across all intermediate supply and demand updates?",
    shortAnswer: "Total Active Supply always equals Total Active Demand: ∑_{i ∈ ActiveRows} S_i = ∑_{j ∈ ActiveCols} D_j.",
    explanation: "Because each allocation x_kl deducts the exact same quantity from both total supply and total demand, the conservation of flow equality ∑ S_i = ∑ D_j is preserved at every intermediate step.",
    hint: "Subtracting equal amounts from equal totals keeps the remaining totals equal.",
    level: "intermediate",
    codeExample: "assert(activeSupplies.reduce(sum) === activeDemands.reduce(sum));"
  },
  {
    question: "When is an origin row k permanently eliminated from the active transportation tableau?",
    shortAnswer: "When its remaining supply S_k reaches exactly 0.",
    explanation: "When S_k = 0, factory k has exhausted its entire inventory. It has no more goods to ship, so Row k is crossed out and excluded from all future cost searches.",
    hint: "An empty warehouse can make no further shipments.",
    level: "basic",
    codeExample: "if (supply[k] === 0) rowActive[k] = false;"
  },
  {
    question: "When is a destination column l permanently eliminated from the active transportation tableau?",
    shortAnswer: "When its remaining unsatisfied demand D_l reaches exactly 0.",
    explanation: "When D_l = 0, destination l has received 100% of its required inventory. Its demand is completely satisfied, so Column l is crossed out and eliminated.",
    hint: "A fully stocked store accepts no further deliveries.",
    level: "basic",
    codeExample: "if (demand[l] === 0) colActive[l] = false;"
  },
  {
    question: "What specific operational rule must be followed if both S_k = 0 and D_l = 0 simultaneously after an allocation?",
    shortAnswer: "Cross out ONLY Row k (or Column l), mark the other line's balance as 0, and assign an infinitesimal zero (ε) to an unassigned cell in that line before crossing it out.",
    explanation: "Crossing out both lines simultaneously eliminates two degrees of freedom in a single step, resulting in fewer than m + n - 1 basic variables (degeneracy). Assigning ε maintains the mandatory basis size.",
    hint: "Never eliminate two lines at once without inserting an epsilon placeholder.",
    level: "expert",
    codeExample: "if (supply[k] === 0 && demand[l] === 0) {\n  rowActive[k] = false;\n  assignEpsilonToColumn(l);\n  colActive[l] = false;\n}"
  },
  {
    question: "How does line elimination reduce the computational search space of the Matrix Minima Method over time?",
    shortAnswer: "The active submatrix dimension shrinks from m × n down to (m-1) × n or m × (n-1) at each step, eventually terminating at 1 × 1.",
    explanation: "Each elimination reduces either the number of active rows or active columns by 1. For a 3×4 matrix, the search space drops: 12 cells → 8 cells → 6 cells → 4 cells → 2 cells → 1 cell.",
    hint: "Notice how the active table gets smaller after every allocation.",
    level: "intermediate",
    codeExample: "Active Cells(t) = ActiveRows(t) × ActiveCols(t) < Active Cells(t-1)."
  },
  {
    question: "Suppose Debangshu's Barrackpore plant has 50 tons and supplies 40 tons to Kolkata. What are the updated balances?",
    shortAnswer: "Barrackpore supply = 10 tons (Active); Kolkata demand = 0 tons (Eliminated).",
    explanation: "S_Barrackpore = 50 - 40 = 10 tons. D_Kolkata = 40 - 40 = 0 tons. Column Kolkata is eliminated; Row Barrackpore remains active with 10 tons.",
    hint: "50 - 40 = 10; 40 - 40 = 0.",
    level: "basic",
    codeExample: "S[1] = 10; D[1] = 0; colActive[1] = false;"
  },
  {
    question: "Suppose Mamata's Ichapur warehouse has 60 crates and supplies 50 crates to Barasat. What are the updated balances?",
    shortAnswer: "Ichapur supply = 10 crates (Active); Barasat demand = 0 crates (Eliminated).",
    explanation: "S_Ichapur = 60 - 50 = 10 crates. D_Barasat = 50 - 50 = 0 crates. Column Barasat is eliminated; Row Ichapur remains active.",
    hint: "60 - 50 = 10; 50 - 50 = 0.",
    level: "basic",
    codeExample: "S[3] = 10; D[3] = 0; colActive[3] = false;"
  },
  {
    question: "Why is it mathematically impossible for updated supply or demand to become negative in Matrix Minima?",
    shortAnswer: "Because the allocation quantity x_kl is defined as min(S_k, D_l), which is strictly ≤ S_k and ≤ D_l.",
    explanation: "Since x_kl ≤ S_k, S_k - x_kl ≥ 0. Since x_kl ≤ D_l, D_l - x_kl ≥ 0. The non-negativity property is an inviolable mathematical consequence of the min() operator.",
    hint: "Subtracting a number that is less than or equal to the starting balance can never yield a negative remainder.",
    level: "basic",
    codeExample: "assert(S[k] - min(S[k], D[l]) >= 0);"
  },
  {
    question: "What happens to the remaining cells in a row once that row is eliminated?",
    shortAnswer: "They are permanently locked and cannot receive any allocations in subsequent steps.",
    explanation: "Because the origin has zero remaining inventory, assigning shipments to any other destination in that row is physically impossible and mathematically forbidden.",
    hint: "Once a warehouse is empty, all routes leaving that warehouse are closed.",
    level: "basic",
    codeExample: "for (let j = 0; j < n; j++) isCellEligible[k][j] = false;"
  },
  {
    question: "What happens to the remaining cells in a column once that column is eliminated?",
    shortAnswer: "They are permanently locked and cannot receive any allocations in subsequent steps.",
    explanation: "Because the destination has received its full quota, delivering additional goods from other origins would cause oversupply.",
    hint: "Once a customer order is 100% fulfilled, no more deliveries are accepted.",
    level: "basic",
    codeExample: "for (let i = 0; i < m; i++) isCellEligible[i][l] = false;"
  },
  {
    question: "How do you verify on paper that capacity updates were performed without arithmetic error across all steps?",
    shortAnswer: "Sum all circled allocations in row i and verify it equals original S_i; sum all circled allocations in column j and verify it equals original D_j.",
    explanation: "The marginal sum check is the universal diagnostic in transportation modeling: ∑_j x_ij = S_i for all i, and ∑_i x_ij = D_j for all j.",
    hint: "Row sums must equal original supply; column sums must equal original demand.",
    level: "intermediate",
    codeExample: "checkRowSums(X, S_initial); checkColSums(X, D_initial);"
  },
  {
    question: "In the final allocation step, why must remaining S_k exactly equal remaining D_l?",
    shortAnswer: "Because total supply equals total demand, and all previous allocations deducted equal amounts from both totals.",
    explanation: "Let total initial flow be F. If previous steps allocated Σ x = F - R, then remaining total supply is R and remaining total demand is R. With only 1 active origin and 1 active destination remaining, S_final = R and D_final = R.",
    hint: "Equal starting sums minus equal subtractions leave equal final remainders.",
    level: "intermediate",
    codeExample: "if (activeRows.length === 1 && activeCols.length === 1) assert(S_rem === D_rem);"
  },
  {
    question: "What should you do if in the final step S_final ≠ D_final?",
    shortAnswer: "Halt immediately; this indicates an arithmetic mistake in an earlier deduction step or an unbalanced initial table.",
    explanation: "A final discrepancy means an arithmetic subtraction error occurred earlier. Retrace all intermediate capacity deductions from Step 1.",
    hint: "A final imbalance is proof of an earlier calculation slip.",
    level: "basic",
    codeExample: "if (S_final !== D_final) throw new Error('Arithmetic slip in earlier step!');"
  },
  {
    question: "In a 3 × 3 matrix, if Step 1 eliminates Row 2 and Step 2 eliminates Column 1, what is the size of the active submatrix in Step 3?",
    shortAnswer: "2 rows × 2 columns = 4 candidate cells.",
    explanation: "Initial size: 3 rows × 3 columns. After eliminating 1 row and 1 column, the remaining active submatrix consists of 2 rows (Rows 1 and 3) and 2 columns (Columns 2 and 3), totaling 4 cells.",
    hint: "(3 - 1) rows × (3 - 1) cols = 2 × 2 = 4.",
    level: "basic",
    codeExample: "Active submatrix size = (m - 1) × (n - 1) = 2 × 2 = 4."
  },
  {
    question: "How does updating supply and demand maintain the basic variable count in non-degenerate cases?",
    shortAnswer: "Each allocation step eliminates exactly one line (row or column) and creates exactly one basic variable, producing m + n - 1 variables across all lines.",
    explanation: "There are m rows and n columns, totaling m + n lines. The final step eliminates the last row and column simultaneously. Thus, exactly (m + n - 1) line elimination steps occur, yielding exactly (m + n - 1) basic variables.",
    hint: "1 line eliminated per allocation = m + n - 1 basic variables.",
    level: "expert",
    codeExample: "Total allocations = (m - 1) + (n - 1) + 1 = m + n - 1."
  },
  {
    question: "In software engineering, why is it better to mutate capacity vectors in-place rather than creating new copies at each step?",
    shortAnswer: "In-place decrementing (`S[k] -= alloc`) runs in O(1) time and O(1) auxiliary space, avoiding garbage collection overhead.",
    explanation: "In-place mutation is optimal for performance. If state history is needed for UI animation, snapshot objects can be pushed to an audit array.",
    hint: "Direct array subtraction is lightning fast and memory efficient.",
    level: "intermediate",
    codeExample: "supply[k] -= alloc; demand[l] -= alloc;"
  },
  {
    question: "Suppose Susmita allocates 130 cylinders from Barrackpore (S2 = 150) to Ichapur Hospital (D2 = 130). What are the updated capacities?",
    shortAnswer: "Barrackpore supply = 20 cylinders; Ichapur demand = 0 cylinders (Eliminated).",
    explanation: "S_Barrackpore = 150 - 130 = 20 cylinders. D_Ichapur = 130 - 130 = 0 cylinders. Column Ichapur is eliminated.",
    hint: "150 - 130 = 20; 130 - 130 = 0.",
    level: "basic",
    codeExample: "S[2] = 20; D[2] = 0; colActive[2] = false;"
  },
  {
    question: "In Abhronila & Mahima's locker network, Kolkata Hub (S2 = 60) supplies 30 parcels to Ichapur (D1 = 30). What are the updated capacities?",
    shortAnswer: "Kolkata Hub supply = 30 parcels; Ichapur locker demand = 0 parcels (Eliminated).",
    explanation: "S_Kolkata = 60 - 30 = 30 parcels. D_Ichapur = 30 - 30 = 0 parcels. Column Ichapur is satisfied.",
    hint: "60 - 30 = 30; 30 - 30 = 0.",
    level: "basic",
    codeExample: "S[2] = 30; D[1] = 0; colActive[1] = false;"
  },
  {
    question: "What visual technique is recommended for tracking capacity updates on a classroom examination paper?",
    shortAnswer: "Neatly draw a single diagonal slash through the old capacity number and write the new balance directly adjacent to it.",
    explanation: "Slashing old numbers and writing new balances prevents mixing up original totals with remaining capacities, and provides a clear audit trail for grading.",
    hint: "Slash old balance, write new balance clearly.",
    level: "basic",
    codeExample: "50 → ~50~ 10 → ~10~ 0."
  },
  {
    question: "How does updating supply and demand prevent infinite loops in the Matrix Minima algorithm?",
    shortAnswer: "Because every allocation strictly reduces either active supply or active demand by at least 1 unit, guaranteeing strictly decreasing positive integers that must terminate at zero.",
    explanation: "By the Well-Ordering Principle of positive integers, repeatedly subtracting positive integer allocations x_kl ≥ 1 strictly decreases the sum ∑ S_i + ∑ D_j, proving algorithm termination in finite steps.",
    hint: "Positive integers repeatedly subtracted by positive numbers must hit zero.",
    level: "expert",
    codeExample: "Termination guarantee: State metric Φ(t) = ∑ S_i(t) + ∑ D_j(t) is strictly decreasing."
  },
  {
    question: "If a row has remaining supply S_i = 0, what is the effect of attempting to allocate to cell (i, j)?",
    shortAnswer: "The allocation x_ij would evaluate to min(0, D_j) = 0, wasting an allocation and violating the basic variable definition.",
    explanation: "Allocating 0 units to a dead cell without degeneracy creates redundant computations. Only cells in active rows with S_i > 0 should ever be scanned.",
    hint: "min(0, Demand) is always 0.",
    level: "intermediate",
    codeExample: "if (S[i] === 0) throw new Error('Cannot allocate from exhausted row');"
  },
  {
    question: "What is the relationship between line elimination and bipartite graph vertex deletion in network flow theory?",
    shortAnswer: "Eliminating an exhausted row or column corresponds to removing a saturated vertex from the bipartite transportation graph.",
    explanation: "The transportation problem is a minimum-cost flow problem on a bipartite graph G = (V_supply ∪ V_demand, E). When S_i = 0, vertex S_i has net flow 0 and is removed from the active residual network.",
    hint: "Closing a row/column is equivalent to deleting a fulfilled vertex from the graph.",
    level: "expert",
    codeExample: "V_active(t) = V_active(t-1) \ { eliminated_vertex };"
  },
  {
    question: "Can an eliminated row or column ever be 'reopened' during the Initial Basic Feasible Solution phase?",
    shortAnswer: "No, once eliminated, a line remains permanently closed throughout the entire IBFS construction phase.",
    explanation: "IBFS methods are purely constructive and forward-only. A line is only reopened during the subsequent MODI optimization phase if an entering variable pivot introduces flow.",
    hint: "Line elimination is permanent during the initial draft.",
    level: "basic",
    codeExample: "rowActive[k] = false; // Never reset to true during IBFS"
  },
  {
    question: "How does the update mechanism handle dummy rows/columns with ₹0 unit cost?",
    shortAnswer: "Exactly the same as real rows/columns: subtract allocated quantity from S_i and D_dummy, and eliminate the line that reaches 0.",
    explanation: "The mathematical update logic is identical for real and virtual nodes. Flow conservation and capacity bounds apply uniformly to dummy entities.",
    hint: "Dummy nodes follow the exact same subtraction and elimination rules.",
    level: "basic",
    codeExample: "S[i] -= alloc; D[dummy] -= alloc; if (D[dummy] === 0) colActive[dummy] = false;"
  },
  {
    question: "In Step 2 of Debangshu's problem, Barrackpore (S1 = 10) and Ichapur (S2 = 20) are active against Salt Lake (D3 = 30). What is the sum of active supply and active demand?",
    shortAnswer: "Active Supply = 10 + 20 = 30 tons; Active Demand = 30 tons. They are exactly equal (30 = 30).",
    explanation: "This confirms the flow conservation invariant: ∑ S_active = 30 and ∑ D_active = 30.",
    hint: "10 + 20 = 30; Demand = 30.",
    level: "basic",
    codeExample: "10 + 20 === 30 (Invariant verified)."
  },
  {
    question: "Why does line elimination guarantee that the resulting basic solution has no closed loops?",
    shortAnswer: "Because a newly allocated cell always connects to at least one line that is immediately eliminated, preventing any future allocation from using that line to complete a cycle.",
    explanation: "A cycle requires visiting each participating line twice. Since one line is immediately closed after receiving its first allocation, no second allocation can enter that line, making cycle formation topologically impossible.",
    hint: "A closed loop needs two allocations in every row and column; eliminating the line prevents the second allocation.",
    level: "expert",
    codeExample: "degree(eliminated_node) in active graph becomes 0, preventing cycle completion."
  },
  {
    question: "What happens if a student accidentally forgets to eliminate a column whose demand reached 0?",
    shortAnswer: "The student may mistakenly allocate additional units to that column in a later step, creating oversupply and an invalid non-basic solution.",
    explanation: "If Column l is not struck out, its cells remain visible. In a subsequent step, an unallocated cell in that column might be selected, causing total column shipments to exceed D_l.",
    hint: "Failure to strike a line leads to accidental over-allocation.",
    level: "intermediate",
    codeExample: "Unstruck column ⇒ Multiple allocations exceeding original D_l."
  },
  {
    question: "What is the computational complexity of updating supply, demand, and line status flags in code?",
    shortAnswer: "O(1) constant time per allocation step.",
    explanation: "Updating two array elements (`S[k] -= x`, `D[l] -= x`) and checking boolean flags (`if (S[k] === 0) rowActive[k] = false`) executes in O(1) constant time.",
    hint: "Direct array indexing and arithmetic take O(1) time.",
    level: "basic",
    codeExample: "Time complexity per update: O(1)."
  },
  {
    question: "What is the ultimate objective achieved by the continuous updating of supply and demand throughout Matrix Minima?",
    shortAnswer: "It systematically reduces the complex m × n transportation problem to a verified, balanced, and feasible shipping schedule with m + n - 1 basic variables.",
    explanation: "The update process guarantees that every factory inventory is fully utilized, every customer requirement is fully met, and the resulting plan forms a mathematically valid starting basis for optimization.",
    hint: "Transforming raw supply and demand quotas into a fully fulfilled, verified distribution plan.",
    level: "intermediate",
    codeExample: "Final State: All S[i] === 0, All D[j] === 0, Allocations === m + n - 1."
  }
];

export default questions;
