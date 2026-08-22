// topic8_questions.js
// 30 Moderate to Expert Short Questions on Matrix Minima Method

const questions = [
  {
    question: "What is an Initial Basic Feasible Solution (IBFS) in transportation problems?",
    shortAnswer: "An initial non-negative shipping plan that satisfies all supply and demand constraints with exactly m + n - 1 basic variables without closed loops.",
    explanation: "An IBFS serves as the starting point for optimization algorithms like the MODI method. It guarantees mathematical feasibility (all supplies exhausted and demands fulfilled) while establishing the basic variable matrix structure.",
    hint: "Think of an initial feasible baseline shipping schedule.",
    level: "basic",
    codeExample: "IBFS: { x_ij ≥ 0, ∑_j x_ij = S_i, ∑_i x_ij = D_j, basic_cells = m + n - 1 }"
  },
  {
    question: "Why is the Matrix Minima Method called a 'greedy heuristic'?",
    shortAnswer: "Because it makes the locally optimal choice at each step (cheapest available unit cost) without looking ahead or backtracking.",
    explanation: "At each iteration, Matrix Minima commits maximum possible cargo to the cell with the lowest unit rate in the active table. It does not evaluate future opportunity loss or regret.",
    hint: "It grabs the cheapest immediate deal at every single step.",
    level: "intermediate",
    codeExample: "Greedy choice: (k, l) = argmin { c_ij : S_i > 0, D_j > 0 }."
  },
  {
    question: "What is the formula for the number of basic variables in an m × n transportation problem?",
    shortAnswer: "m + n - 1 basic variables.",
    explanation: "Because total supply equals total demand, the m supply constraints and n demand constraints contain one redundant linear equation, leaving a constraint matrix rank of exactly m + n - 1.",
    hint: "Sum rows and columns, then subtract 1.",
    level: "basic",
    codeExample: "Basic Variables Count = m + n - 1."
  },
  {
    question: "What is degeneracy in the context of the Matrix Minima Method?",
    shortAnswer: "A condition where the number of positive allocated cells is strictly less than m + n - 1.",
    explanation: "Degeneracy occurs when an allocation simultaneously zeroes out both a supply row and a demand column (S_k = D_l). It is resolved by allocating an infinitesimal zero (ε) to an independent unallocated cell.",
    hint: "Having fewer than m + n - 1 allocated cells in your tableau.",
    level: "intermediate",
    codeExample: "Degeneracy: allocations.length < m + n - 1 ⇒ Add ε."
  },
  {
    question: "Why does the Matrix Minima Method produce a cheaper starting plan than the North-West Corner Rule?",
    shortAnswer: "Because Matrix Minima searches the 2D matrix for the lowest shipping rates in ₹, whereas NWCR blindly allocates along the top-left diagonal.",
    explanation: "Matrix Minima is cost-aware and suppresses initial expenditure by 25% to 45%, whereas NWCR is completely cost-blind.",
    hint: "Cost-aware selection vs blind coordinate stepping.",
    level: "basic",
    codeExample: "Z(Matrix Minima) << Z(NWCR)."
  },
  {
    question: "How does the Matrix Minima Method resolve ties between duplicate minimum cost cells?",
    shortAnswer: "By selecting the cell that allows the maximum allocation volume: max { min(S_i, D_j) }.",
    explanation: "Allocating the largest possible cargo quantity to the lowest freight rate maximizes immediate rupee savings.",
    hint: "Pick the tied cell that can move more cargo.",
    level: "intermediate",
    codeExample: "Tie-Breaker: argmax { min(S_i, D_j) } among candidate cells."
  },
  {
    question: "What is the Big-M method in transportation modeling?",
    shortAnswer: "A technique that assigns an arbitrarily large penalty cost M (e.g. ₹999,999) to prohibited or damaged routes to prevent their selection.",
    explanation: "Because Matrix Minima greedily selects minimum cost cells, setting prohibited cells to M guarantees they are bypassed as long as valid routes exist.",
    hint: "Make the route so expensive that the computer never picks it.",
    level: "basic",
    codeExample: "c_prohibited = M (₹999,999/unit)."
  },
  {
    question: "How is an unbalanced transportation problem (∑ S_i ≠ ∑ D_j) corrected before executing Matrix Minima?",
    shortAnswer: "By appending a dummy row (if demand > supply) or dummy column (if supply > demand) with unit freight rates of ₹0.",
    explanation: "The dummy absorbs the difference (|∑ S_i - ∑ D_j|), balancing total flow and allowing the algorithm to execute cleanly.",
    hint: "Add a dummy row or column with cost ₹0.",
    level: "basic",
    codeExample: "D_dummy = TotalSupply - TotalDemand; c_i,dummy = 0."
  },
  {
    question: "What is the physical meaning of allocating 30 units to a dummy column at ₹0?",
    shortAnswer: "It means that the origin retains 30 units in local warehouse inventory without incurring freight charges.",
    explanation: "A dummy destination represents unconsumed factory capacity. Allocating to it means no physical goods leave the factory gate.",
    hint: "Surplus stock stays at the factory warehouse.",
    level: "intermediate",
    codeExample: "x_i,dummy = 30 @ ₹0 ⇒ 30 units remain in factory i inventory."
  },
  {
    question: "What is the time complexity of the Matrix Minima algorithm for an m × n grid using a Min-Heap priority queue?",
    shortAnswer: "O(mn log(mn)) time complexity.",
    explanation: "Pre-sorting or heapifying all m · n cells takes O(mn log(mn)). Each extraction and validation over (m + n - 1) steps runs in O(log(mn)) time.",
    hint: "Logarithmic heap extraction over mn elements.",
    level: "expert",
    codeExample: "Heapify: O(mn log(mn)); Allocations: O((m+n) log(mn))."
  },
  {
    question: "Can Matrix Minima ever produce fractional allocations if all supplies and demands are integers?",
    shortAnswer: "No, all allocated quantities are strictly non-negative integers due to the Total Unimodularity property of the constraint matrix.",
    explanation: "Because all constraint matrix coefficients are 0, 1, or -1, and all basis determinants are ±1, basic feasible solutions on integer inputs are strictly integer-valued.",
    hint: "Whole number inputs and min() operations always produce whole numbers.",
    level: "intermediate",
    codeExample: "S_i, D_j ∈ ℤ⁺ ⇒ x_ij ∈ ℤ⁺."
  },
  {
    question: "What is a 'closed loop' in a transportation tableau?",
    shortAnswer: "A sequence of alternating horizontal and vertical line segments connecting at least 4 basic cells that starts and ends at the same cell.",
    explanation: "In graph theory, a closed loop is a simple cycle. A basic solution must have no closed loops (must form an acyclic spanning forest/tree).",
    hint: "Orthogonal rook moves returning to the start using only allocated cells.",
    level: "intermediate",
    codeExample: "Basic Solution Condition: hasClosedLoop(basicCells) === false."
  },
  {
    question: "Why does line elimination in Matrix Minima prevent the creation of closed loops?",
    shortAnswer: "Because eliminating an exhausted row or column removes that line from future allocations, preventing any subsequent cell from closing a cycle through it.",
    explanation: "A closed loop requires at least two allocations in every row and column involved. Closing a line immediately after its first allocation blocks cycle formation.",
    hint: "You cannot form a loop through an eliminated row.",
    level: "expert",
    codeExample: "Line elimination preserves tree acyclicity at every step."
  },
  {
    question: "What is the relationship between the Matrix Minima initial cost Z and the global optimal cost Z_opt?",
    shortAnswer: "Z_MatrixMinima ≥ Z_opt (The initial cost is an upper bound on the true global minimum).",
    explanation: "Because any IBFS is a feasible solution, its cost is greater than or equal to the global minimum. MODI optimization can only reduce or preserve this cost.",
    hint: "The initial solution provides a cost ceiling.",
    level: "basic",
    codeExample: "Z_opt <= Z_MatrixMinima <= Z_NWCR."
  },
  {
    question: "Why does Vogel's Approximation Method (VAM) generally outperform Matrix Minima?",
    shortAnswer: "Because VAM evaluates opportunity penalty (regret), avoiding future high-cost bottlenecks that Matrix Minima's greedy search might fall into.",
    explanation: "Matrix Minima is myopic (looks at absolute cheapest rates). VAM looks at line penalties (difference between lowest and second-lowest costs), prioritizing routes that avoid severe future penalties.",
    hint: "Evaluating regret vs evaluating absolute minimums.",
    level: "intermediate",
    codeExample: "VAM uses Penalty = c_second_min - c_min; Matrix Minima uses min(c_ij)."
  },
  {
    question: "In Debangshu's fasteners problem, why was the final cost Z = ₹470 instead of NWCR's ₹670?",
    shortAnswer: "Because Matrix Minima prioritized the ₹3 and ₹4 routes, completely bypassing the expensive ₹8 route that NWCR was forced to use.",
    explanation: "Matrix Minima captured the Ichapur→Jadavpur (₹3) and Barrackpore→Kolkata (₹4) links first, saving ₹200 (29.8%).",
    hint: "Anchoring the ₹3 and ₹4 routes avoided the ₹8 penalty.",
    level: "basic",
    codeExample: "Savings = ₹670 - ₹470 = ₹200."
  },
  {
    question: "In Mamata's FMCG problem, what percentage of initial cost was saved over NWCR?",
    shortAnswer: "41.7% cost savings (₹490 vs ₹840 baseline).",
    explanation: "Matrix Minima reduced total logistics spend from ₹840 to ₹490, saving ₹350 on initial dispatch.",
    hint: "(840 - 490) / 840 ≈ 41.7%.",
    level: "basic",
    codeExample: "((840 - 490) / 840) * 100% = 41.67% ≈ 41.7%."
  },
  {
    question: "What is the marginal sum condition that every valid transportation solution must satisfy?",
    shortAnswer: "∑_{j=1}^n x_ij = S_i for all origins i, and ∑_{i=1}^m x_ij = D_j for all destinations j.",
    explanation: "All factory stocks must be 100% utilized, and all customer orders must be 100% fulfilled.",
    hint: "Row sums equal supply; column sums equal demand.",
    level: "basic",
    codeExample: "assert(rowSum(i) === S[i] && colSum(j) === D[j]);"
  },
  {
    question: "What should an operations researcher do if the final step of Matrix Minima yields S_final ≠ D_final?",
    shortAnswer: "Halt immediately and retrace all intermediate capacity subtractions; a discrepancy proves an earlier arithmetic error.",
    explanation: "By conservation of flow, the final active row supply must exactly equal the final active column demand.",
    hint: "A mismatch at the end is proof of an earlier subtraction mistake.",
    level: "basic",
    codeExample: "if (S_final !== D_final) throw new Error('Arithmetic slip in earlier subtraction');"
  },
  {
    question: "How does the Matrix Minima Method handle negative unit shipping costs (c_ij < 0) arising from government subsidies?",
    shortAnswer: "It naturally selects the most negative cost cell first (since it is the smallest numerical value) to maximize subsidy capture.",
    explanation: "Because the algorithm searches for argmin(c_ij), negative numbers are selected before zero or positive rates.",
    hint: "Most negative number is the smallest number.",
    level: "intermediate",
    codeExample: "argmin([-10, -5, 2, 8]) = -10 (Allocated first)."
  },
  {
    question: "What is the effect of multiplying all unit costs in the matrix by a positive constant k (c_ij' = k · c_ij)?",
    shortAnswer: "The cell allocation sequence and quantities remain completely unchanged; only the total cost Z scales by k (Z' = k · Z).",
    explanation: "Positive scaling preserves the relative ordering of all matrix elements, leaving argmin selections invariant.",
    hint: "Converting currency units does not change which route is cheapest.",
    level: "intermediate",
    codeExample: "argmin(k · C) === argmin(C); Z_new = k · Z_old."
  },
  {
    question: "What is the effect of adding a fixed surcharge C to every cell in the cost matrix (c_ij' = c_ij + C)?",
    shortAnswer: "The allocation sequence remains unchanged, and total cost increases by C × Total Flow.",
    explanation: "Adding a constant preserves all inequality relationships (c_a + C < c_b + C ⇔ c_a < c_b). Total cost increases by C · ∑ S_i.",
    hint: "A flat toll tax on all roads doesn't change which road is cheapest.",
    level: "expert",
    codeExample: "Z_new = Z_old + C · (Total Flow)."
  },
  {
    question: "What is an 'infinitesimal basic zero' (ε) and what is its role in MODI optimality testing?",
    shortAnswer: "ε is a zero-volume placeholder allocated to maintain m + n - 1 basic variables so that the dual equations u_i + v_j = c_ij can be solved.",
    explanation: "Without ε, a degenerate solution lacks sufficient basic cells to compute row and column multipliers u_i and v_j.",
    hint: "A placeholder that preserves matrix rank without adding shipping costs.",
    level: "expert",
    codeExample: "Cost contribution of ε = c_ij · 0 = 0."
  },
  {
    question: "In Susmita's healthcare logistics, how many basic allocations were required for the 2 × 2 matrix?",
    shortAnswer: "3 basic allocations (2 + 2 - 1 = 3).",
    explanation: "m + n - 1 = 2 + 2 - 1 = 3 basic cells.",
    hint: "2 + 2 - 1 = 3.",
    level: "basic",
    codeExample: "Basic Cells Count = 2 + 2 - 1 = 3."
  },
  {
    question: "Why should you never cross out both a row and a column simultaneously without assigning ε?",
    shortAnswer: "Because doing so reduces the basic variable count to m + n - 2, causing degeneracy and breaking MODI multiplier evaluation.",
    explanation: "Always cross out only one line and assign ε to an independent cell in the other line before closing it.",
    hint: "Closing both lines at once drops the basis count below m + n - 1.",
    level: "expert",
    codeExample: "Simultaneous line closure without ε ⇒ Degeneracy error."
  },
  {
    question: "How does the average unit shipping cost c_avg relate to the total cost Z?",
    shortAnswer: "c_avg = Z / Total Physical Volume (in ₹/unit).",
    explanation: "Dividing total rupee expenditure by total tons/crates gives the weighted average freight rate across the entire supply network.",
    hint: "Divide total rupee bill by total volume shipped.",
    level: "basic",
    codeExample: "c_avg = totalCost / totalVolume;"
  },
  {
    question: "What is the stepping-stone method and how does it relate to Matrix Minima?",
    shortAnswer: "It is an alternative optimality verification and improvement algorithm that tests non-basic cells using closed loops starting from the Matrix Minima IBFS.",
    explanation: "Both the MODI method and Stepping-Stone method require an Initial Basic Feasible Solution (like Matrix Minima) as their starting foundation.",
    hint: "The optimization method that traces closed loops around basic cells.",
    level: "intermediate",
    codeExample: "Matrix Minima (IBFS) → Stepping-Stone / MODI (Optimality)."
  },
  {
    question: "Why do enterprise software engines use Boolean flag arrays for rowActive and colActive?",
    shortAnswer: "To achieve O(1) filtering of exhausted lines without mutating or resizing 2D matrix arrays in memory.",
    explanation: "Boolean masks preserve original array indices (i, j) for clear solution tracking and avoid expensive memory reallocations.",
    hint: "Flagging dead lines avoids memory copies and keeps original factory indices intact.",
    level: "intermediate",
    codeExample: "const isEligible = (r, c) => rowActive[r] && colActive[c];"
  },
  {
    question: "What is the primary pedagogical goal of Topic 8 Short Questions?",
    shortAnswer: "To master core quantitative analysis concepts, excel in university viva examinations, and develop deep algorithmic intuition for transportation models.",
    explanation: "Rapid-fire conceptual mastery ensures students understand not just the mechanical steps, but the underlying mathematical and economic principles.",
    hint: "Deep conceptual and oral examination mastery.",
    level: "basic",
    codeExample: "Mastery of theory, math, algorithms, and practical economics."
  },
  {
    question: "What are the 4 Golden Rules for solving any transportation problem with Matrix Minima?",
    shortAnswer: "1. Balance the problem; 2. Greedily pick min(c_ij) with max-volume tie-break; 3. Update balances and strike zero lines; 4. Verify m + n - 1 basic variables before computing Z.",
    explanation: "Following these 4 rules guarantees an error-free, near-optimal Initial Basic Feasible Solution on every single problem.",
    hint: "Balance, Greedily Pick, Update & Strike, Verify m+n-1.",
    level: "basic",
    codeExample: "1. Balance; 2. argmin(c_ij); 3. Deduct & Strike; 4. Verify m+n-1 & Compute Z."
  }
];

export default questions;
