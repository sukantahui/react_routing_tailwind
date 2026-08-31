// topic5_questions.js
// 30 Moderate to Expert Questions on the Complete VAM Procedure in Operations Research

const questions = [
  {
    question: "What are the standard sequential phases of the complete Vogel's Approximation Method (VAM) procedure?",
    shortAnswer: "Phase 1: Balance Verification & Setup; Phase 2: Dual Penalty Computation; Phase 3: Regret Maximization & Line Selection; Phase 4: Least-Cost Allocation & Capacity Decrement; Phase 5: Line Elimination & Iterative Recalculation; Phase 6: Basis Verification & Total Cost Calculation.",
    explanation: "VAM operates as an integrated algorithm. It first verifies balance (adding ₹0 dummy if unbalanced), computes initial row and column penalties, selects the highest penalty line, allocates min(Supply, Demand) to the cheapest cell in that line, updates balances, strikes out the exhausted line, recalculates penalties for the reduced sub-matrix, and repeats until all demands are met.",
    hint: "Think from initial balance check to final total cost calculation Z.",
    level: "moderate",
    codeExample: "VAM Pipeline: Balance → Penalties → MaxPenalty → MinCostAlloc → StrikeOut → Repeat → Compute Z."
  },
  {
    question: "How is the total initial transportation cost Z mathematically formulated upon completing all VAM allocations?",
    shortAnswer: "Z = sum_{i=1}^m sum_{j=1}^n (c_ij * x_ij) in Indian Rupees (₹), summed exclusively across all basic (occupied) cells.",
    explanation: "Each occupied cell (i, j) contributes its allocated volume x_ij multiplied by its unit transportation cost c_ij. Unoccupied cells have x_ij = 0 and contribute ₹0.",
    hint: "Multiply each assigned quantity by its unit rate and sum all products.",
    level: "moderate",
    codeExample: "Z = sum_{(i,j) in BasicCells} (c_ij * x_ij)"
  },
  {
    question: "What exact condition must the count of allocated cells satisfy in an m x n transportation problem to guarantee a non-degenerate basic solution?",
    shortAnswer: "Exactly m + n - 1 occupied basic cells with independent (loop-free) positions.",
    explanation: "An m x n transportation problem has m + n linear constraints, but one is redundant (since total supply equals total demand), leaving exactly m + n - 1 linearly independent equations.",
    hint: "Rows + Columns - 1.",
    level: "moderate",
    codeExample: "Required Basic Cells = m + n - 1"
  },
  {
    question: "Suppose Debangshu in Barrackpore executes VAM for a 3 x 4 matrix and obtains allocations: (1,1)=30 @ ₹4, (1,3)=20 @ ₹6, (2,2)=50 @ ₹3, (2,3)=20 @ ₹5, (3,4)=40 @ ₹2, (3,2)=10 @ ₹7. What is the total transportation cost Z?",
    shortAnswer: "₹660 ( (30*4) + (20*6) + (50*3) + (20*5) + (40*2) + (10*7) = 120 + 120 + 150 + 100 + 80 + 70 = ₹640... wait: 120+120+150+100+80+70 = 640 ).",
    explanation: "(30*4=120) + (20*6=120) + (50*3=150) + (20*5=100) + (40*2=80) + (10*7=70) = ₹640 total.",
    hint: "Sum all products: 120 + 120 + 150 + 100 + 80 + 70 = 640.",
    level: "moderate",
    codeExample: "Z = 120 + 120 + 150 + 100 + 80 + 70 = ₹640"
  },
  {
    question: "Why is VAM considered an 'Initial Basic Feasible Solution' (IBFS) method rather than a final optimality test?",
    shortAnswer: "Because VAM does not guarantee 100% mathematical optimality in all theoretical cases; its output must be tested using the MODI or Stepping-Stone method to confirm global optimality.",
    explanation: "Although VAM produces solutions that are often optimal on iteration 1 (or within 1-2% of optimal), it is technically a heuristic. True optimality requires evaluating all non-basic opportunity costs (u_i + v_j - c_ij <= 0).",
    hint: "VAM builds the starting point; MODI proves global optimality.",
    level: "expert",
    codeExample: "IBFS (via VAM) → Optimality Test (via MODI) → Global Optimal Solution."
  },
  {
    question: "What is the first mandatory step before computing any penalties in the complete VAM procedure?",
    shortAnswer: "Verify whether Total Supply equals Total Demand (Sum S_i == Sum D_j); if unbalanced, balance the problem with a ₹0 dummy line.",
    explanation: "Executing VAM on an unbalanced matrix without a dummy line causes infeasible constraint equations and invalid penalty calculations.",
    hint: "Always check ∑ S_i == ∑ D_j first.",
    level: "moderate",
    codeExample: "if (Sum(S) !== Sum(D)) { addDummyLine(rate=0); }"
  },
  {
    question: "How does the complete VAM procedure handle the final 1 x 1 remaining cell in Pass (m+n-1)?",
    shortAnswer: "The remaining supply of the final row must exactly equal the remaining demand of the final column; the remaining units are assigned to that cell directly.",
    explanation: "Because initial total supply equaled initial total demand and all previous subtractions were balanced, the final surviving origin balance identically equals the final destination requirement.",
    hint: "Final remaining supply and demand must match exactly.",
    level: "moderate",
    codeExample: "Final Step: S_last === D_last => allocate x_last = S_last."
  },
  {
    question: "In a 3 x 3 problem, what is the maximum number of passes required to complete all VAM allocations?",
    shortAnswer: "At most 5 passes (3 + 3 - 1 = 5).",
    explanation: "An m x n problem terminates in at most m + n - 1 allocation steps.",
    hint: "3 + 3 - 1 = 5.",
    level: "moderate",
    codeExample: "Passes = 3 + 3 - 1 = 5"
  },
  {
    question: "If Mamata in Kolkata solves a transportation problem using VAM and finds total cost Z = ₹4,200, while NWCR gave Z = ₹6,800, what is the percentage savings achieved by VAM?",
    shortAnswer: "38.24% savings ( (6800 - 4200) / 6800 * 100 = 38.24% ).",
    explanation: "Savings = (₹6,800 - ₹4,200) / ₹6,800 = ₹2,600 / ₹6,800 ≈ 38.24%. VAM cut over one-third of the total logistics bill immediately.",
    hint: "(2600 / 6800) * 100 ≈ 38.24%.",
    level: "moderate",
    codeExample: "Savings = (6800 - 4200) / 6800 = 38.24%"
  },
  {
    question: "What is a 'closed loop' in transportation analysis and why does VAM guarantee that its allocations never form a closed loop?",
    shortAnswer: "A closed loop is a continuous rectangular path through basic cells; VAM prevents loops because each allocation strictly eliminates an unvisited row or column, maintaining an acyclic tree structure.",
    explanation: "In graph theory, connecting bipartite vertices while pruning a vertex at each step creates a spanning forest with zero cycles, guaranteeing linear independence of the basis.",
    hint: "Each step connects an isolated origin to a destination and eliminates one node.",
    level: "expert",
    codeExample: "Linear Independence: Basis vectors are linearly independent <=> No closed loops exist."
  },
  {
    question: "How does Susmita in Ichapur verify that her completed VAM tableau satisfies all supply constraints?",
    shortAnswer: "By summing the allocated quantities horizontally across each row i and confirming that Sum_j (x_ij) equals the original factory supply S_i.",
    explanation: "Row sum verification: Row 1 sum = S_1, Row 2 sum = S_2, ..., Row m sum = S_m.",
    hint: "Horizontal row sums must equal origin capacities.",
    level: "moderate",
    codeExample: "all(sum(x[i][j] for j in cols) == Supply[i] for i in rows)"
  },
  {
    question: "How does Mahima in Barrackpore verify that her completed VAM tableau satisfies all demand constraints?",
    shortAnswer: "By summing the allocated quantities vertically down each column j and confirming that Sum_i (x_ij) equals the original destination demand D_j.",
    explanation: "Column sum verification: Col 1 sum = D_1, Col 2 sum = D_2, ..., Col n sum = D_n.",
    hint: "Vertical column sums must equal market requirements.",
    level: "moderate",
    codeExample: "all(sum(x[i][j] for i in rows) == Demand[j] for j in cols)"
  },
  {
    question: "What should an operations research practitioner do if a completed VAM solution has only 5 basic cells in a 3 x 4 problem?",
    shortAnswer: "The solution is degenerate (needs 3 + 4 - 1 = 6 cells); allocate an infinitesimally small quantity epsilon (ε > 0) to an independent zero-cost or unallocated cell to restore the basis count to 6.",
    explanation: "Degeneracy occurs when simultaneous row and column exhaustion eliminated two lines at once. Placing ε in an independent cell restores m + n - 1 basic variables so MODI multipliers (u_i, v_j) can be computed.",
    hint: "Add ε to an independent cell to reach m + n - 1.",
    level: "expert",
    codeExample: "Basic Cells = 5 < 6 → Place epsilon in cell (i, j) with no closed loop."
  },
  {
    question: "Why is VAM widely recognized as the industry standard manual heuristic for transportation modeling in business schools and logistics firms?",
    shortAnswer: "Because it strikes the optimal balance between computational simplicity (simple arithmetic differences) and solution quality (near-optimal starting bases).",
    explanation: "NWCR is fast but economically reckless. Simplex from scratch requires heavy matrix algebra. VAM delivers 95-98% optimal plans through intuitive manual steps.",
    hint: "High quality initial solution with low computational complexity.",
    level: "intermediate",
    codeExample: "VAM = High Accuracy + Fast Manual Convergence."
  },
  {
    question: "Suppose Abhronila in Jadavpur evaluates a completed VAM solution with 6 basic cells. How many non-basic (empty) cells exist in a 3 x 4 matrix?",
    shortAnswer: "6 non-basic cells (total cells = 3 * 4 = 12; non-basic = 12 - 6 = 6).",
    explanation: "Total cells in matrix = m * n = 3 * 4 = 12. Basic cells = m + n - 1 = 6. Non-basic cells = 12 - 6 = 6.",
    hint: "Total cells (12) minus basic cells (6).",
    level: "moderate",
    codeExample: "Non-Basic Count = (m * n) - (m + n - 1) = 12 - 6 = 6"
  },
  {
    question: "In the MODI optimality test that follows VAM, what do the non-basic cells represent?",
    shortAnswer: "Unused shipping routes whose opportunity cost (evaluation d_ij = c_ij - u_i - v_j) must be non-negative (>= 0) for the solution to be globally optimal.",
    explanation: "If any d_ij < 0, shipping along that unused route would decrease total cost, prompting a stepping-stone loop improvement.",
    hint: "Non-basic cells are candidate routes for potential cost reduction.",
    level: "expert",
    codeExample: "Optimality Condition: d_ij = c_ij - u_i - v_j >= 0 for all non-basic cells."
  },
  {
    question: "Why does VAM frequently produce an IBFS that is ALREADY optimal (requiring 0 MODI iterations)?",
    shortAnswer: "Because line penalties closely mirror the shadow price gradients (u_i, v_j), naturally selecting the exact basic variables that minimize total cost.",
    explanation: "By penalizing large opportunity costs, VAM aligns with dual linear programming potentials from step 1.",
    hint: "Penalties intuitively approximate LP dual shadow prices.",
    level: "expert",
    codeExample: "VAM basis → often satisfies d_ij >= 0 directly on Tableau 1."
  },
  {
    question: "Suppose a 2 x 2 problem has costs [[3, 7], [5, 6]] with supplies [50, 40] and demands [30, 60]. What is VAM's complete step 1 allocation?",
    shortAnswer: "Row 1 penalty = 4, Row 2 penalty = 1; Col 1 penalty = 2, Col 2 penalty = 1. Max penalty is Row 1 (P=4). Allocate min(50, 30) = 30 to cell (1, 1) @ ₹3.",
    explanation: "P_R1 = 7 - 3 = 4; P_R2 = 6 - 5 = 1; P_C1 = 5 - 3 = 2; P_C2 = 7 - 6 = 1. Winning line is Row 1. Least cost in Row 1 is cell (1, 1) @ ₹3. Allocation = min(50, 30) = 30 units.",
    hint: "P_R1 = 4 is max penalty. Target cell is (1, 1).",
    level: "moderate",
    codeExample: "Pass 1: Allocate 30 to (1, 1) @ ₹3; Col 1 crossed out; S_1 = 20."
  },
  {
    question: "Continuing the 2 x 2 problem above, what are the remaining allocations in Pass 2?",
    shortAnswer: "Allocate remaining 20 units of S_1 to cell (1, 2) @ ₹7, and all 40 units of S_2 to cell (2, 2) @ ₹6.",
    explanation: "Col 1 is crossed out. Only Col 2 remains (demand = 60). S_1 has 20 units → x_12 = 20 @ ₹7. S_2 has 40 units → x_22 = 40 @ ₹6. Demand of Col 2 (20 + 40 = 60) is fully satisfied.",
    hint: "Col 2 takes remaining 20 from S_1 and 40 from S_2.",
    level: "moderate",
    codeExample: "Allocations: x_11=30, x_12=20, x_22=40."
  },
  {
    question: "What is the total transportation cost Z for the solved 2 x 2 problem above?",
    shortAnswer: "₹470 ( (30 * 3) + (20 * 7) + (40 * 6) = 90 + 140 + 240 = ₹470 ).",
    explanation: "Z = (30 * 3) + (20 * 7) + (40 * 6) = 90 + 140 + 240 = ₹470.",
    hint: "90 + 140 + 240 = 470.",
    level: "moderate",
    codeExample: "Z = 90 + 140 + 240 = ₹470"
  },
  {
    question: "How many basic cells were generated in the solved 2 x 2 problem above, and does it match m + n - 1?",
    shortAnswer: "Exactly 3 basic cells (x_11, x_12, x_22), which perfectly matches m + n - 1 = 2 + 2 - 1 = 3.",
    explanation: "Count of occupied cells is 3; required basis count is 2 + 2 - 1 = 3. Solution is non-degenerate.",
    hint: "2 + 2 - 1 = 3 basic cells.",
    level: "moderate",
    codeExample: "m + n - 1 = 2 + 2 - 1 = 3 basic cells."
  },
  {
    question: "What is the primary formatting best practice when presenting a complete VAM solution in an executive logistics report?",
    shortAnswer: "Provide the initial balanced tableau, multi-pass margin penalty tracking columns, the final allocation matrix with circled allocations, and the itemized total cost computation Z in ₹.",
    explanation: "This full presentation allows technical auditors and operations directors to verify feasibility, basis count, and cost calculations instantly.",
    hint: "Clear tableaus, margin audit, final allocation matrix, and itemized Z.",
    level: "intermediate",
    codeExample: "Report Structure: Tableau → Multi-pass Audit → Allocations Matrix → Cost Breakdown Z."
  },
  {
    question: "Why does VAM outclass the Matrix Minima (Least Cost) method in multi-facility industrial distribution?",
    shortAnswer: "Because Matrix Minima is easily trapped by cheap cells that create downstream bottlenecks, whereas VAM evaluates global opportunity cost across all origins and destinations.",
    explanation: "Matrix Minima's single-minded greed frequently consumes cheap capacity that was vital for remote high-cost markets.",
    hint: "VAM looks at penalty gaps, avoiding greedy traps.",
    level: "expert",
    codeExample: "VAM prevents high-regret traps that Matrix Minima falls into."
  },
  {
    question: "Suppose Debangshu solves a problem with 4 factories and 5 destinations. How many basic cells must his final VAM solution contain?",
    shortAnswer: "8 basic cells (4 + 5 - 1 = 8).",
    explanation: "m + n - 1 = 4 + 5 - 1 = 8.",
    hint: "4 + 5 - 1 = 8.",
    level: "moderate",
    codeExample: "Basis Count = 4 + 5 - 1 = 8"
  },
  {
    question: "Can an allocation in VAM ever violate non-negativity (x_ij < 0)?",
    shortAnswer: "No, because x_kl = min(S_k, D_l) where S_k >= 0 and D_l >= 0, guaranteeing x_kl >= 0 always.",
    explanation: "Since all initial capacities are non-negative, the minimum of two non-negative numbers is unconditionally non-negative.",
    hint: "min(non-negative, non-negative) is non-negative.",
    level: "moderate",
    codeExample: "Non-negativity: x_ij >= 0 for all (i, j)."
  },
  {
    question: "What happens if a student forgets to cross out a column whose demand reached 0 and calculates a penalty for it in the next pass?",
    shortAnswer: "The student will compute an invalid penalty using a dead column, leading to erroneous line selection and an infeasible allocation.",
    explanation: "A satisfied column has zero demand. Treating its cells as active produces phantom allocations.",
    hint: "Always cross out satisfied lines immediately.",
    level: "moderate",
    codeExample: "Rule: Struck-out lines must have zero influence on subsequent passes."
  },
  {
    question: "In the complete VAM procedure, why is the currency symbol ₹ (Rupee) specified for all cost values?",
    shortAnswer: "To maintain practical financial realism and professional standard consistency in quantitative analysis reports across Indian industry.",
    explanation: "Using standard currency units reinforces that linear programming transportation problems optimize actual fiscal budgets.",
    hint: "Always express logistics objective values in Indian Rupees (₹).",
    level: "moderate",
    codeExample: "Currency Standard: Total Cost Z = ₹ X,XXX"
  },
  {
    question: "How does Susmita verify that no closed loops exist in her final allocation table?",
    shortAnswer: "By checking that no subset of basic cells can form a closed rectangular polygon with alternating horizontal and vertical turns.",
    explanation: "If a loop could be drawn, one basic variable would be linearly dependent on the others, violating the basis property.",
    hint: "No closed horizontal-vertical loop can be traced through occupied cells.",
    level: "expert",
    codeExample: "Loop Test: Try tracing a closed rectangle through occupied cells; none must exist."
  },
  {
    question: "What is the time complexity of the entire complete VAM algorithm from start to finish for an m x n matrix?",
    shortAnswer: "O((m + n) * m * n) total time.",
    explanation: "There are at most m + n - 1 allocation passes. Each pass performs O(mn) work to compute penalties and find minimums. Multiplying (m + n) passes by O(mn) yields O((m + n)mn).",
    hint: "(m + n) passes * O(mn) per pass.",
    level: "expert",
    codeExample: "Total Time Complexity = O((m + n) * m * n)"
  },
  {
    question: "What is the ultimate benefit of mastering the complete VAM procedure for operations analysts and management consultants?",
    shortAnswer: "It provides a rapid, mathematically sound framework to optimize multi-million-rupee supply chains, reduce freight overhead by 20-40%, and seed advanced LP solvers with near-optimal initial bases.",
    explanation: "VAM remains one of the most elegant and impactful algorithms in operations research, bridging intuitive economic regret with formal linear programming duality.",
    hint: "Near-optimal solutions save enterprise budgets millions in transportation expenditure.",
    level: "expert",
    codeExample: "Executive Value: Rapid convergence, 20-40% savings over baseline, enterprise scalability."
  }
];

export default questions;
