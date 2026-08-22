// topic8_questions.js
// 30 Moderate to Expert Questions on Improving the Transportation Solution in the MODI Method

const questions = [
  {
    question: "What is the primary objective of the solution improvement phase in the MODI method?",
    shortAnswer: "To transition from the current basic feasible solution to an adjacent basic feasible solution that strictly reduces the total transportation cost Z while preserving all supply and demand constraints.",
    explanation: "Improving the solution moves along an edge of the transportation polytope to a lower-cost extreme point vertex.",
    hint: "Transition to an adjacent basis with lower total cost.",
    level: "moderate",
    codeExample: "Improvement Step: Basis_k -> Basis_{k+1} such that Z_{k+1} < Z_k."
  },
  {
    question: "What is the exact formula for the new total transportation cost Z_{k+1} after pivoting?",
    shortAnswer: "Z_{k+1} = Z_k - (θ * |d_enter|), where θ is the transfer volume and |d_enter| is the magnitude of the entering cell's opportunity cost.",
    explanation: "Each unit transferred into the entering cell reduces total cost by |d_enter| Rupees.",
    hint: "Z_new = Z_old - theta * |d_enter|.",
    level: "moderate",
    codeExample: "Z_new = Z_old - (theta * abs(d_enter))"
  },
  {
    question: "Suppose Debangshu in Barrackpore has an initial cost of Z = ₹2,740. He pivots with θ = 60 tons on entering cell (2, 1) where d_21 = -₹8. What is the new total cost?",
    shortAnswer: "Z = ₹2,260 ( ₹2,740 - (60 * ₹8) = ₹2,740 - ₹480 = ₹2,260 ).",
    explanation: "Total cost decreases by 60 * 8 = ₹480, resulting in ₹2,260.",
    hint: "2740 - (60 * 8) = 2260.",
    level: "moderate",
    codeExample: "Z_new = 2740 - (60 * 8) = ₹2,260"
  },
  {
    question: "What three fundamental conditions must be verified on the newly formed transportation tableau before proceeding to the next MODI evaluation?",
    shortAnswer: "1. Primal Feasibility (row sums == S_i and col sums == D_j); 2. Non-Degenerate Basis Size (count of basic cells == m + n - 1); 3. Acyclicity (no closed loops among basic cells).",
    explanation: "Verifying these 3 invariants guarantees that the new tableau is a legitimate basic feasible solution.",
    hint: "Feasibility, basis count (m+n-1), and acyclicity.",
    level: "expert",
    codeExample: "PostPivotAudit = { Feasible: true, Count: m+n-1, Acyclic: true }"
  },
  {
    question: "Why can an improved solution never have a total cost higher than the previous solution (Z_{k+1} <= Z_k)?",
    shortAnswer: "Because the entering variable is chosen with d_enter < 0 and the transfer quantity satisfies θ >= 0, guaranteeing that Delta Z = θ * d_enter <= 0.",
    explanation: "Linear programming simplex steps are monotonically non-increasing in cost.",
    hint: "Monotonic cost decrease: Delta Z = theta * d_enter <= 0.",
    level: "moderate",
    codeExample: "Monotonicity: theta >= 0 and d_enter < 0 => Delta Z <= 0."
  },
  {
    question: "After constructing the improved tableau, do the old u_i and v_j potentials remain valid?",
    shortAnswer: "No, because the basis has changed (one variable entered, one variable left); a fresh set of dual potentials u_i' and v_j' must be computed from the new basic cells.",
    explanation: "New basis equations u_i' + v_j' = c_ij define a new set of row and column potentials.",
    hint: "New basis requires computing a new set of u-v potentials.",
    level: "moderate",
    codeExample: "Recompute potentials: u_new, v_new from new BasicCells."
  },
  {
    question: "Suppose Susmita in Ichapur computes new potentials on the improved tableau and gets u' = [0, 5, 6] and v' = [0, 14, 1]. If cell (3, 2) has c_32 = ₹13, what is its new opportunity cost d_32'?",
    shortAnswer: "d_32' = -₹7 ( 13 - (6 + 14) = 13 - 20 = -₹7 ).",
    explanation: "d_32' = c_32 - (u_3' + v_2') = 13 - (6 + 14) = 13 - 20 = -₹7. Cell (3, 2) is a new entering candidate!",
    hint: "13 - 20 = -7.",
    level: "moderate",
    codeExample: "d_32_new = 13 - (6 + 14) = -7"
  },
  {
    question: "What does the existence of a negative evaluation on the improved tableau signify?",
    shortAnswer: "It signifies that although the solution has improved (cost dropped from ₹2,740 to ₹2,260), it is not yet optimal and requires another improvement iteration.",
    explanation: "MODI repeats the improvement cycle until all d_ij >= 0.",
    hint: "Solution improved, but requires another iteration to reach global minimum.",
    level: "moderate",
    codeExample: "exists(d < 0) => Trigger Iteration 2."
  },
  {
    question: "How does the improvement step in MODI prevent an infinite loop (cycling)?",
    shortAnswer: "Since total cost strictly decreases (Z_{k+1} < Z_k) in non-degenerate steps and the number of basic feasible solutions is finite, cycling is impossible and termination is guaranteed.",
    explanation: "A strictly decreasing function over a finite set of vertices must terminate in a finite number of steps.",
    hint: "Strict cost decrease over finite vertices guarantees termination.",
    level: "expert",
    codeExample: "Finite Termination Theorem: Strict decrease + Finite bases => Termination."
  },
  {
    question: "Suppose Mamata in Kolkata improves a vaccine delivery plan, reducing freight by ₹180 on iteration 1 and ₹60 on iteration 2. What is her cumulative savings?",
    shortAnswer: "₹240 cumulative savings ( ₹180 + ₹60 = ₹240 ).",
    explanation: "Cumulative savings is the sum of cost reductions across all iterations.",
    hint: "180 + 60 = 240.",
    level: "moderate",
    codeExample: "Total Savings = 180 + 60 = ₹240"
  },
  {
    question: "In what visual format should the improved tableau be presented on an academic exam?",
    shortAnswer: "Draw a clean, separate tableau labeled 'Tableau II (Iteration 1 Improved Solution)', showing the new allocations x_ij, updated row sums, updated column sums, and dedicated margins for new u_i and v_j potentials.",
    explanation: "Drawing a separate tableau avoids messy overwriting and ensures clear grading.",
    hint: "Draw a clean separate tableau labeled Tableau II.",
    level: "intermediate",
    codeExample: "Layout: Tableau I (IBFS) -> Pivot -> Tableau II (Improved Basis)."
  },
  {
    question: "What happens to the cell that LEFT the basis in the previous iteration?",
    shortAnswer: "It is now an unoccupied non-basic cell (x = 0) and will be evaluated for its opportunity cost d_ij' in the next pass just like all other empty cells.",
    explanation: "The leaving cell becomes part of the non-basic candidate pool.",
    hint: "Leaves basis, becomes non-basic, and gets evaluated in next pass.",
    level: "moderate",
    codeExample: "Leaving cell status: Basic -> NonBasic (evaluated in step 3)."
  },
  {
    question: "Can an improved solution have the EXACT SAME basic cells as the starting solution?",
    shortAnswer: "No, every valid non-degenerate improvement pivot swaps exactly one basic variable for an entering variable, producing a distinct basic spanning tree.",
    explanation: "The basis transitions to an adjacent vertex on the polytope.",
    hint: "Basis must differ by exactly one variable.",
    level: "expert",
    codeExample: "Basis distance: |Basis_{k+1} triangle Basis_k| = 2 (1 in, 1 out)."
  },
  {
    question: "Suppose Mahima in Barrackpore finds that after 1 improvement iteration, all new opportunity costs satisfy d_ij' >= 0. What does this mean?",
    shortAnswer: "It means the solution achieved global optimality on Iteration 1; no further iterations are necessary.",
    explanation: "The improvement phase is complete and the final minimum cost is certified.",
    hint: "All d >= 0 means optimization terminates at global minimum.",
    level: "moderate",
    codeExample: "all(d_new >= 0) => Terminate (Optimal)."
  },
  {
    question: "How does the simplex pivot in transportation analysis differ from the general Simplex matrix inversion (Gaussian elimination)?",
    shortAnswer: "Transportation pivoting uses simple addition and subtraction (+θ, -θ) around the closed loop, completely bypassing expensive matrix inversion (O(1) loop arithmetic vs O(N^3) Gaussian elimination).",
    explanation: "The total unimodularity of transportation constraint matrices eliminates the need for matrix division.",
    hint: "Uses simple loop arithmetic instead of matrix inversion.",
    level: "expert",
    codeExample: "Total Unimodularity: Basis update via loop addition/subtraction in O(m+n) time."
  },
  {
    question: "Suppose Abhronila in Jadavpur wants to prove that her improved solution is feasible. What two equations must hold for every origin i and destination j?",
    shortAnswer: "Row equation: Sum_{j=1}^n x_ij = S_i; Column equation: Sum_{i=1}^m x_ij = D_j (with all x_ij >= 0).",
    explanation: "Primal feasibility requires all row and column constraints to be strictly satisfied.",
    hint: "Sum of allocations across rows equals supply; down columns equals demand.",
    level: "intermediate",
    codeExample: "forall i: sum_j x_ij == S_i; forall j: sum_i x_ij == D_j."
  },
  {
    question: "Why is it important to compute total cost Z explicitly using Z = Sum(c_ij * x_ij) on the new tableau rather than relying solely on Z_new = Z_old - θ*|d|?",
    shortAnswer: "Calculating Z directly from cell entries acts as an independent arithmetic check that catches any flow allocation mistakes made during the pivot.",
    explanation: "Comparing both calculations ensures 100% computational integrity.",
    hint: "Direct sum verifies that no calculation slips occurred during pivoting.",
    level: "intermediate",
    codeExample: "Audit: sum(c_ij * x_ij) === Z_old - (theta * abs(d_enter))."
  },
  {
    question: "Suppose an analyst updates a tableau and finds total cost dropped by ₹500, but one column sum is 10 tons short of demand. What happened?",
    shortAnswer: "A sign error was made during loop flow allocation (e.g. subtracting θ twice or missing a +θ corner), destroying column conservation.",
    explanation: "Constraint violations invalidate the solution.",
    hint: "Sign error in loop arithmetic violated column demand.",
    level: "moderate",
    codeExample: "Error: Column sum != Demand -> Re-trace loop signs."
  },
  {
    question: "How many iterations does a typical 3x3 or 3x4 transportation problem require to reach optimality when starting from NWCR versus VAM?",
    shortAnswer: "Starting from NWCR typically requires 2 to 4 improvement iterations; starting from VAM typically requires 0 to 1 improvement iteration.",
    explanation: "VAM starts much closer to the optimal vertex, minimizing the number of improvement steps.",
    hint: "NWCR takes 2-4 iterations; VAM takes 0-1 iteration.",
    level: "intermediate",
    codeExample: "Iterations: NWCR ~ 2-4 pivots; VAM ~ 0-1 pivot."
  },
  {
    question: "What is the economic definition of the 'Improvement Trajectory' across successive MODI iterations?",
    shortAnswer: "The sequence of basic feasible solutions {T_0, T_1, ..., T_opt} displaying strictly decreasing objective costs {Z_0 > Z_1 > ... > Z_opt} as logistics flow is systematically rerouted into cheaper corridors.",
    explanation: "The trajectory represents the systematic optimization path toward minimal cost.",
    hint: "Monotonically decreasing cost sequence across iterations.",
    level: "expert",
    codeExample: "Trajectory: Z_0 (₹2,740) -> Z_1 (₹2,260) -> Z_2 (₹2,060 - Optimal)."
  },
  {
    question: "Can an improvement step open a new shipping route that was never considered in the initial heuristic?",
    shortAnswer: "Yes, the MODI improvement step dynamically discovers and activates previously unassigned routes that have lucrative negative evaluations.",
    explanation: "Heuristics may miss subtle global synergies that MODI systematically detects.",
    hint: "MODI discovers and activates overlooked cost-reducing routes.",
    level: "intermediate",
    codeExample: "Activation: Empty route (2,1) activated with 60 tons."
  },
  {
    question: "Suppose Debangshu finds that Iteration 1 saved ₹480 and Iteration 2 saved ₹200. What was the percentage cost reduction from the initial ₹2,740 cost?",
    shortAnswer: "24.82% reduction ( (480 + 200) / 2740 = 680 / 2740 = 24.82% ).",
    explanation: "Total savings of ₹680 represents a 24.82% reduction from the initial ₹2,740 baseline.",
    hint: "680 / 2740 = 24.82%.",
    level: "moderate",
    codeExample: "SavingsPercent = (680 / 2740) * 100 = 24.82%"
  },
  {
    question: "What happens if an entering cell has d_enter = -₹8 and allows a transfer of θ = 0 tons (degenerate pivot)?",
    shortAnswer: "Total cost Z remains unchanged (Delta Z = 0 * -8 = ₹0), but the basis changes to a new spanning tree representation.",
    explanation: "Degenerate improvement steps change the dual multipliers without changing the primal objective.",
    hint: "Cost unchanged, basis updated.",
    level: "expert",
    codeExample: "Degenerate step: Delta Z = 0; Basis updated."
  },
  {
    question: "How does the solution improvement step ensure that customer service levels (fill rates) are never compromised?",
    shortAnswer: "Because destination demands D_j are rigid equality constraints that must be 100% satisfied at every single iteration.",
    explanation: "Every customer receives their exact required shipment tonnage throughout all optimization iterations.",
    hint: "Customer demands are strict equality constraints.",
    level: "intermediate",
    codeExample: "Service level = 100% (Sum x_ij == D_j at all iterations)."
  },
  {
    question: "What is the recommended student strategy when drawing the second iteration tableau under time pressure in university exams?",
    shortAnswer: "Copy the unit costs c_ij from the original problem, write the updated allocations x_ij from your loop calculation, audit row/column sums immediately, then compute u' and v' potentials on the new basic cells.",
    explanation: "Following this standardized procedure minimizes exam time and avoids copying errors.",
    hint: "Copy costs -> write new allocations -> audit sums -> solve new u-v potentials.",
    level: "intermediate",
    codeExample: "Exam Flow: Copy c_ij -> Write x_new -> Audit sums -> Solve u', v'."
  },
  {
    question: "Why is the solution improvement phase in MODI considered a 'greedy' algorithm with global guarantees?",
    shortAnswer: "It makes a greedy local choice (picking the steepest descent gradient min d_ij), but convexity of the linear programming polyhedron guarantees that this greedy path converges to the true global optimum.",
    explanation: "Convexity bridges greedy local steps with guaranteed global optimality.",
    hint: "Greedy local pivot converges to global optimum due to LP convexity.",
    level: "expert",
    codeExample: "Greedy local choice + Convex Polytope = Global Minimum Guarantee."
  },
  {
    question: "Suppose Susmita in Ichapur verifies her Iteration 1 tableau: Basic cells are (1,2)=70, (2,1)=60, (2,2)=10, (2,3)=20, (3,3)=60. How many basic cells exist, and is the solution non-degenerate?",
    shortAnswer: "5 basic cells; since m + n - 1 = 3 + 3 - 1 = 5, the solution is perfectly non-degenerate.",
    explanation: "Count equals 5, matching m + n - 1.",
    hint: "5 basic cells in a 3x3 matrix is non-degenerate.",
    level: "moderate",
    codeExample: "Count = 5 == m + n - 1 = 5 (Non-degenerate)."
  },
  {
    question: "What is the ultimate executive benefit of tracking the step-by-step improvement of the transportation solution?",
    shortAnswer: "It demonstrates the tangible financial value generated by quantitative optimization, showing exactly how many rupees each iteration saves the organization.",
    explanation: "Clear before-and-after audit trails justify operations research investments to corporate boards.",
    hint: "Demonstrates clear financial ROI of operations research to executives.",
    level: "intermediate",
    codeExample: "Executive Reporting: 'Iteration 1 reduced freight spend by ₹480 (17.5%).'"
  },
  {
    question: "What is the golden rule for improving the transportation solution in the MODI method?",
    shortAnswer: "'Pivot flow along the closed loop (x_new = x_old +/- θ); audit row and column sums; recompute u' and v' potentials; re-evaluate opportunity costs; repeat until all d' >= 0!'",
    explanation: "This complete rule captures the entire iterative transition lifecycle.",
    hint: "Pivot flow -> audit sums -> solve new u-v -> re-evaluate d -> repeat until optimal.",
    level: "moderate",
    codeExample: "Golden Rule: Pivot -> Audit -> Recompute u,v -> Re-evaluate d -> Repeat."
  }
];

export default questions;
