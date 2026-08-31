// topic4_questions.js
// 30 Moderate to Expert Questions on the Optimality Condition in the MODI Method

const questions = [
  {
    question: "What is the exact mathematical condition that certifies a transportation solution is globally optimal in the MODI method?",
    shortAnswer: "All non-basic cell evaluations (opportunity costs) must be non-negative: d_ij = c_ij - (u_i + v_j) >= 0 for all unoccupied cells (i, j).",
    explanation: "When every d_ij >= 0, the direct cost of every unallocated route is greater than or equal to the implied shadow cost. No flow reallocation can decrease total cost Z.",
    hint: "Every unoccupied route has d_ij >= 0.",
    level: "moderate",
    codeExample: "Optimality Theorem: forall (i, j) in NonBasic, d_ij >= 0 => Z is minimal."
  },
  {
    question: "How does the MODI optimality condition connect to the Dual Feasibility condition of Linear Programming?",
    shortAnswer: "Dual feasibility requires u_i + v_j <= c_ij for all (i, j); since basic cells satisfy u_i + v_j = c_ij, having d_ij = c_ij - (u_i + v_j) >= 0 on all non-basic cells guarantees that the dual solution is 100% feasible.",
    explanation: "By the Fundamental Duality Theorem, when a primal feasible solution and a dual feasible solution satisfy complementary slackness, both are simultaneously optimal.",
    hint: "d_ij >= 0 is equivalent to dual constraint u_i + v_j <= c_ij.",
    level: "expert",
    codeExample: "Dual Feasibility: u_i + v_j <= c_ij <=> c_ij - (u_i + v_j) >= 0 <=> d_ij >= 0."
  },
  {
    question: "What is the difference between 'Strict Optimality' and 'Alternative (Multiple) Optima' in the optimality condition?",
    shortAnswer: "Strict Optimality occurs when ALL non-basic cells have strictly positive evaluations (d_ij > 0), guaranteeing a unique optimal solution; Alternative Optima occurs when all d_ij >= 0 and at least one non-basic cell has d_ij = 0.",
    explanation: "A zero evaluation d_ij = 0 allows a basic pivot without changing the objective value Z, producing a different routing plan with the same minimum total cost.",
    hint: "All d_ij > 0 = unique minimum; any d_ij = 0 = multiple optimal plans.",
    level: "expert",
    codeExample: "Strict: min(d_ij) > 0 (Unique); Multiple: min(d_ij) === 0 (Alternative Optima)."
  },
  {
    question: "Suppose Debangshu in Barrackpore evaluates a 3x3 casting network and finds d = [+4, +2, +9, +1]. What is the mathematical status of this solution?",
    shortAnswer: "The solution is strictly optimal and unique; total cost Z cannot be reduced further under any circumstances.",
    explanation: "Since every d_ij > 0, every potential pivot would strictly increase total cost. The basis is unique and optimal.",
    hint: "All 4 evaluations are strictly greater than 0.",
    level: "moderate",
    codeExample: "all(d > 0) => Unique Optimal Solution."
  },
  {
    question: "Suppose Susmita in Ichapur evaluates a 3x3 grocery network and finds d = [+3, 0, +5, +2]. What is the status of her solution?",
    shortAnswer: "The solution is globally optimal, but it is NOT unique; an alternative optimal basic feasible solution exists with the exact same minimal cost Z.",
    explanation: "Since all d_ij >= 0, the plan is optimal. The zero entry allows pivoting flow into that cell without increasing total cost.",
    hint: "All d_ij >= 0 with one zero → Alternative optimal solution exists.",
    level: "moderate",
    codeExample: "min(d) === 0 && all(d >= 0) => Optimal with Alternative Optima."
  },
  {
    question: "Suppose Mamata in Kolkata evaluates a healthcare network and finds d = [+5, -2, +4, +1]. What is the status of her solution?",
    shortAnswer: "The solution is SUB-OPTIMAL; the presence of d_12 = -2 proves that total cost can be reduced by transferring flow into cell (1, 2).",
    explanation: "A single negative evaluation violates the optimality condition, requiring a stepping-stone loop pivot.",
    hint: "At least one d_ij < 0 means solution is not optimal.",
    level: "moderate",
    codeExample: "exists(d < 0) => Sub-Optimal → Execute Loop Pivot."
  },
  {
    question: "Why does the presence of even a single negative evaluation (d_ij < 0) invalidate optimality across the ENTIRE network?",
    shortAnswer: "Because linear programming objective functions are convex and linear: a negative gradient indicates an unbounded descent direction along that basis edge until a constraint boundary is hit.",
    explanation: "Even if 99 out of 100 cells are positive, the single negative route provides an arbitrage loop that lowers the entire objective bill.",
    hint: "A single negative evaluation allows a cost-reducing pivot.",
    level: "expert",
    codeExample: "Negative gradient d_ij < 0 → descent direction exists."
  },
  {
    question: "Can an optimality test conclude that a transportation problem is 'unbounded' (Z → -infinity)?",
    shortAnswer: "No, a balanced transportation problem with non-negative costs and bounded capacities always has a finite closed feasible region, guaranteeing a finite minimum.",
    explanation: "Because total supply equals total demand and all capacities are bounded, flow is strictly bounded by 0 <= x_ij <= min(S_i, D_j).",
    hint: "Transportation problems are always bounded.",
    level: "expert",
    codeExample: "Theorem: Transportation LPs always have a finite optimal minimum."
  },
  {
    question: "What is the physical economic meaning of 'Zero Arbitrage' when the MODI optimality condition is satisfied?",
    shortAnswer: "It means that no circular trade or route substitution anywhere in the network can move goods from origins to destinations at a lower net cost.",
    explanation: "The market has reached competitive equilibrium: all shadow price gradients are balanced.",
    hint: "No circular route swap can reduce shipping cost.",
    level: "expert",
    codeExample: "Equilibrium: c_ij >= u_i + v_j for all routes (no arbitrage)."
  },
  {
    question: "How does the Strong Duality Theorem verify that the MODI optimality condition yields the true global minimum?",
    shortAnswer: "At optimality, Primal Objective Z = Sum(c_ij * x_ij) exactly EQUALS Dual Objective W = Sum(S_i * u_i) + Sum(D_j * v_j); zero duality gap proves global optimality.",
    explanation: "Weak duality guarantees Z >= W for all feasible pairs. When Z = W, both solutions are unconditionally optimal.",
    hint: "Zero duality gap: Primal cost equals Dual objective.",
    level: "expert",
    codeExample: "Strong Duality: Z_primal == W_dual => Global Minimum Proven."
  },
  {
    question: "Suppose Mahima in Barrackpore checks a tableau with 6 non-basic cells: d = [+1, +4, +3, +2, +6, +5]. What should she do next?",
    shortAnswer: "Declare the algorithm complete, certify the solution as globally optimal, and calculate the final minimum transportation cost Z in Indian Rupees (₹).",
    explanation: "No further pivots are required. The optimization phase terminates immediately.",
    hint: "Algorithm stops when all d_ij >= 0.",
    level: "moderate",
    codeExample: "if (all(d >= 0)) { Terminate('Global Optimal Certified'); }"
  },
  {
    question: "If an auditor in Kolkata asks for mathematical proof that a ₹2,060 logistics invoice is optimal, what document does the operations analyst present?",
    shortAnswer: "The final MODI tableau displaying the dual potentials (u_i, v_j) and the complete opportunity cost matrix showing all d_ij >= 0.",
    explanation: "The u-v potential vector and non-negative d_ij matrix serve as the universal mathematical certificate of optimality.",
    hint: "Tableau showing all d_ij >= 0 and u-v potentials.",
    level: "intermediate",
    codeExample: "Certificate of Optimality = { Basis {x_ij}, Potentials {u, v}, Evaluations {d_ij >= 0} }."
  },
  {
    question: "Suppose Abhronila in Jadavpur has an initial VAM solution with Z = ₹9,400. After computing potentials, she finds all d_ij >= 0 on Iteration 1. What does this indicate about VAM?",
    shortAnswer: "It demonstrates that VAM generated an Initial Basic Feasible Solution that was ALREADY globally optimal on step 1, requiring 0 subsequent iterations.",
    explanation: "VAM's penalty-driven regret heuristic frequently captures the exact optimal basis directly.",
    hint: "VAM found the optimal basis on step 1.",
    level: "moderate",
    codeExample: "VAM IBFS → MODI Step 1 (all d >= 0) → Optimal with 0 pivots."
  },
  {
    question: "What happens if a student mistakenly declares a solution optimal when d_21 = -₹0.5?",
    shortAnswer: "The declaration is false; even a fractionally negative opportunity cost proves that the solution is sub-optimal and can be improved.",
    explanation: "Strict non-negativity (d_ij >= 0) is mandatory. If 100,000 tons are shipped, -₹0.5 saves ₹50,000.",
    hint: "Even small negative evaluations violate optimality.",
    level: "moderate",
    codeExample: "d_21 = -0.5 < 0 => NOT optimal; massive savings on high tonnage."
  },
  {
    question: "In an unbalanced problem with a ₹0 dummy row, does the optimality condition d_ij >= 0 apply to the dummy cells as well?",
    shortAnswer: "Yes, all non-basic cells—including empty dummy cells—must satisfy d_i,dummy >= 0 for the solution to be globally optimal.",
    explanation: "Sub-optimal dummy assignments force excess production onto expensive real routes. Optimizing dummy routes ensures real freight minimization.",
    hint: "Dummy non-basic cells must also satisfy d_ij >= 0.",
    level: "expert",
    codeExample: "forall (i, j) in Real+Dummy NonBasic: d_ij >= 0."
  },
  {
    question: "Why is the MODI optimality condition considered a 'local test' that guarantees 'global results'?",
    shortAnswer: "Because the test only evaluates adjacent edge directions (1-step pivots) from the current vertex, but convexity of the linear programming polyhedron guarantees that no local minima exist—a local minimum is always the global minimum.",
    explanation: "Convex polyhedra have no false local traps.",
    hint: "Convexity ensures local minimum is global minimum.",
    level: "expert",
    codeExample: "Convexity Theorem: Local Minimum <=> Global Minimum in LP."
  },
  {
    question: "Suppose Debangshu finds two alternative optimal solutions: Solution A uses route (1, 2) and Solution B uses route (3, 1), both with Z = ₹2,060. Can he blend them by shipping 50% on A and 50% on B?",
    shortAnswer: "Yes, by convexity, any convex linear combination of alternative optimal solutions (x = lambda * x_A + (1 - lambda) * x_B for 0 <= lambda <= 1) is also globally optimal with total cost Z = ₹2,060.",
    explanation: "The set of optimal solutions to a linear program is a convex set.",
    hint: "Any weighted average of optimal solutions is also optimal.",
    level: "expert",
    codeExample: "Convex Combination: x_combo = 0.5 * x_A + 0.5 * x_B; Z_combo = Z_optimal."
  },
  {
    question: "What is the computational complexity of verifying the optimality condition once u_i and v_j potentials have been solved?",
    shortAnswer: "O(m * n) arithmetic subtractions.",
    explanation: "There are (m - 1)(n - 1) empty cells; computing each d_ij takes O(1) time.",
    hint: "Linear in matrix cells O(mn).",
    level: "moderate",
    codeExample: "Optimality Check Time = O(m * n)"
  },
  {
    question: "If all non-basic cells in a 3x3 problem have d_ij >= 0, what is the maximum possible number of alternative optimal basic solutions that could exist?",
    shortAnswer: "Up to the number of non-basic cells with d_ij = 0 (up to 4 in a 3x3 matrix).",
    explanation: "Each zero evaluation allows one independent basic pivot.",
    hint: "Bounded by the count of zero evaluations.",
    level: "expert",
    codeExample: "Max alternative basic vertices = count({(i, j) | d_ij == 0})."
  },
  {
    question: "How does Susmita in Ichapur distinguish between a basic cell with zero allocation (x_ij = 0) and a non-basic cell with zero opportunity cost (d_ij = 0)?",
    shortAnswer: "A basic cell with x_ij = 0 is PART of the basis (used to calculate u-v potentials; d_ij is identically 0); a non-basic cell with d_ij = 0 is EMPTY (not in basis, but can enter without changing Z).",
    explanation: "x_ij = 0 is a primal allocation status (degenerate basic); d_ij = 0 is a dual opportunity evaluation on an empty route.",
    hint: "x_ij = 0 is basic primal volume; d_ij = 0 is non-basic dual evaluation.",
    level: "expert",
    codeExample: "Primal status x_ij vs Dual evaluation d_ij."
  },
  {
    question: "Why should an operations researcher never terminate the MODI method until EVERY d_ij is explicitly confirmed >= 0?",
    shortAnswer: "Because stopping prematurely leaves hidden negative evaluations active, resulting in a suboptimal solution and preventable financial waste.",
    explanation: "Full auditing guarantees 100% mathematical optimality.",
    hint: "Every single non-basic cell must be audited.",
    level: "intermediate",
    codeExample: "Rule: 100% of non-basic cells must be verified d_ij >= 0."
  },
  {
    question: "Suppose Mamata evaluates a 4x4 matrix and finds 8 positive evaluations and 1 negative evaluation (d_24 = -₹1). What is the conclusion?",
    shortAnswer: "The solution is NOT optimal; cell (2, 4) must enter the basis to achieve the global minimum.",
    explanation: "Even with 8 positive evaluations, the single negative entry requires a pivot.",
    hint: "One negative evaluation breaks optimality.",
    level: "moderate",
    codeExample: "min(d) = -1 < 0 => Pivot entering cell (2, 4)."
  },
  {
    question: "What is the relationship between the MODI optimality condition and the Kuhn-Tucker (KKT) Optimality Conditions in non-linear optimization?",
    shortAnswer: "The MODI optimality conditions (Primal Feasibility, Dual Feasibility u_i + v_j <= c_ij, and Complementary Slackness x_ij(c_ij - u_i - v_j) = 0) are the exact KKT conditions specialized for linear transportation problems.",
    explanation: "For linear programs, KKT conditions are both necessary and sufficient for global optimality.",
    hint: "MODI optimality is the exact KKT condition for transportation LPs.",
    level: "expert",
    codeExample: "KKT Conditions: Primal Feasibility + Dual Feasibility + Complementary Slackness."
  },
  {
    question: "Suppose Mahima achieves an optimal solution with Z = ₹1,800 where all d_ij > 0. If fuel prices increase transportation cost on an empty route (1, 3) by ₹2, does the optimal plan change?",
    shortAnswer: "No, the optimal plan remains identical; increasing c_13 on an already empty route with d_13 > 0 only makes d_13 MORE positive (d_13' = d_13 + 2 > 0), preserving optimality.",
    explanation: "Sensitivity analysis: raising costs on unused routes does not alter the optimal basis.",
    hint: "Increasing cost on an unused route keeps it unused.",
    level: "expert",
    codeExample: "Sensitivity: c_nonbasic increases => d_nonbasic increases => Basis unchanged."
  },
  {
    question: "What if fuel prices decrease c_13 on that empty route by ₹10 such that d_13 drops below 0?",
    shortAnswer: "The optimality condition is violated (d_13' < 0), triggering a new MODI iteration with cell (1, 3) entering the basis to capture the lower fuel rate.",
    explanation: "When cost drops enough to overcome the opportunity cost gap, the route becomes lucrative.",
    hint: "Decreasing cost below shadow price triggers a new pivot.",
    level: "expert",
    codeExample: "c_13 drops → d_13' < 0 → Cell (1, 3) enters basis."
  },
  {
    question: "Why is the MODI optimality condition considered one of the most elegant results in mathematical optimization?",
    shortAnswer: "Because it reduces a complex multi-variable linear program with hundreds of constraints into simple signed scalar comparisons (d_ij >= 0).",
    explanation: "Duality transforms multidimensional geometric vertex searches into straightforward arithmetic subtraction.",
    hint: "Transforms complex LP optimization into simple scalar checks.",
    level: "intermediate",
    codeExample: "Elegance: Multidimensional LP Optimality <=> Simple check all d_ij >= 0."
  },
  {
    question: "How can a student format the final conclusion statement in an academic exam after verifying the optimality condition?",
    shortAnswer: "'Since all opportunity costs satisfy d_ij = c_ij - (u_i + v_j) >= 0, the optimality condition is satisfied. The current solution is globally optimal with Minimum Total Cost Z = ₹X,XXX.'",
    explanation: "This clear formal statement earns full marks on university examinations.",
    hint: "Explicitly state that all d_ij >= 0 and report minimum cost Z in ₹.",
    level: "intermediate",
    codeExample: "Conclusion: 'All d_ij >= 0 => Solution is optimal. Minimum Z = ₹2,060.'"
  },
  {
    question: "What is the ultimate benefit of proving the optimality condition for enterprise supply chains in West Bengal?",
    shortAnswer: "It gives supply chain directors absolute mathematical certainty that no logistics competitor can move the same cargo at a lower total cost under the specified freight rate matrix.",
    explanation: "Proving optimality guarantees 100% cost leadership.",
    hint: "Guarantees 100% mathematical cost leadership.",
    level: "expert",
    codeExample: "Strategic Value: 100% Proven Minimum Freight Expenditure."
  },
  {
    question: "What is the golden rule of the Optimality Condition in the MODI Method?",
    shortAnswer: "'If ALL d_ij >= 0, STOP—you are optimal! If ANY d_ij < 0, PIVOT—savings await!'",
    explanation: "This simple binary decision rule guides every single iteration of the MODI algorithm.",
    hint: "All d >= 0 = Stop (Optimal); Any d < 0 = Pivot (Improve).",
    level: "moderate",
    codeExample: "Golden Rule: (all d_ij >= 0) ? Terminate() : Pivot(argmin(d_ij));"
  }
];

export default questions;
