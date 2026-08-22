const questions = [
  {
    question: "What is an Initial Basic Feasible Solution (IBFS) in transportation problems?",
    shortAnswer: "An IBFS is a starting solution that satisfies all supply and demand constraints but may not be optimal.",
    explanation: "An IBFS is a feasible solution to the transportation problem where all supplies are used and all demands are met, but it doesn't necessarily minimize cost. It serves as the starting point for the transportation simplex method, which iteratively improves it to find the optimal solution.",
    hint: "Think of it as a rough draft shipping plan that meets all requirements.",
    level: "basic",
    codeExample: "IBFS: A shipping plan where Σⱼ xᵢⱼ = Sᵢ and Σᵢ xᵢⱼ = Dⱼ, xᵢⱼ ≥ 0."
  },
  {
    question: "Why do we need an Initial Basic Feasible Solution?",
    shortAnswer: "An IBFS provides a starting point for optimization algorithms to find the optimal solution.",
    explanation: "The IBFS is needed because: 1) It provides a feasible starting point for the transportation simplex method, 2) It establishes the basic variables needed for optimization, 3) It confirms that a feasible solution exists, 4) It gives an upper bound on the optimal cost, and 5) Better IBFS means fewer iterations needed to reach optimality.",
    hint: "Every optimization journey needs a starting point.",
    level: "intermediate",
    codeExample: "IBFS → Check optimality → Improve → Repeat → Optimal solution."
  },
  {
    question: "What makes a solution 'basic' in transportation problems?",
    shortAnswer: "A solution is basic when it has exactly m + n - 1 positive allocations with no cycles.",
    explanation: "A basic solution in transportation: 1) Has exactly m + n - 1 positive allocations, 2) Has no cycles in the allocation pattern, 3) Forms a spanning tree in the transportation network, 4) Has independent columns, and 5) Is required for the simplex method to work properly.",
    hint: "Basic = m + n - 1 allocations without cycles.",
    level: "intermediate",
    codeExample: "m sources, n destinations → m + n - 1 basic variables."
  },
  {
    question: "What makes a solution 'feasible' in transportation problems?",
    shortAnswer: "A solution is feasible when all supplies are used, all demands are met, and all allocations are non-negative.",
    explanation: "A feasible solution: 1) Satisfies all supply constraints (Σⱼ xᵢⱼ = Sᵢ), 2) Satisfies all demand constraints (Σᵢ xᵢⱼ = Dⱼ), 3) Has non-negative allocations (xᵢⱼ ≥ 0), 4) Represents a valid shipping plan, and 5) Exists when the problem is balanced (or properly balanced with dummies).",
    hint: "Feasible = all constraints satisfied with non-negative values.",
    level: "intermediate",
    codeExample: "xᵢⱼ ≥ 0, Σⱼ xᵢⱼ = Sᵢ, Σᵢ xᵢⱼ = Dⱼ."
  },
  {
    question: "What are the three main methods for finding an IBFS?",
    shortAnswer: "The three methods are: Northwest Corner Rule, Least Cost Method, and Vogel's Approximation Method (VAM).",
    explanation: "1) Northwest Corner Rule: Simple, fast, but gives poor solutions. 2) Least Cost Method: Better quality, moderate speed. 3) VAM: Best quality (near-optimal), but slowest. The choice depends on problem size and desired solution quality.",
    hint: "NW Corner (fast/poor), Least Cost (moderate), VAM (slow/best).",
    level: "basic",
    codeExample: "NW Corner, Least Cost, VAM are the three IBFS methods."
  },
  {
    question: "How does the quality of IBFS affect the optimization process?",
    shortAnswer: "A better IBFS means fewer iterations needed to reach the optimal solution.",
    explanation: "Quality impact: 1) Poor IBFS (NW Corner) → Many iterations needed, 2) Moderate IBFS (Least Cost) → Moderate iterations, 3) Good IBFS (VAM) → Few iterations, 4) Better IBFS reduces computation time, 5) VAM often gives a solution within 5-10% of optimal.",
    hint: "Better starting point = faster optimization.",
    level: "intermediate",
    codeExample: "VAM: 2-3 iterations, NW Corner: 8-10 iterations to reach optimal."
  },
  {
    question: "What is degeneracy in the context of IBFS?",
    shortAnswer: "Degeneracy occurs when the number of positive allocations is less than m + n - 1.",
    explanation: "Degeneracy: 1) Happens when an allocation exactly satisfies both a supply and demand, 2) Results in fewer than m + n - 1 positive allocations, 3) Requires special handling (adding epsilon), 4) Can cause cycling in the simplex method, and 5) Must be resolved before optimality checking.",
    hint: "Degeneracy = too few basic variables.",
    level: "expert",
    codeExample: "m=3, n=4 → expected 6 basic variables, but only 5 exist → degenerate."
  },
  {
    question: "What is the Northwest Corner Rule?",
    shortAnswer: "The Northwest Corner Rule starts at the top-left cell and allocates the maximum possible amount, moving right or down.",
    explanation: "The method: 1) Start at cell (1,1), 2) Allocate min(S₁, D₁), 3) Adjust supply and demand, 4) Move right if demand is satisfied, 5) Move down if supply is exhausted, 6) Repeat until all supplies and demands are satisfied. It's simple but gives poor solutions.",
    hint: "Start at top-left, allocate max, move right or down.",
    level: "basic",
    codeExample: "Cell (1,1): allocate min(S₁, D₁), then move to (1,2) or (2,1)."
  },
  {
    question: "What is the Least Cost Method?",
    shortAnswer: "The Least Cost Method allocates to the cell with the lowest transportation cost first.",
    explanation: "The method: 1) Find the cell with the lowest cost, 2) Allocate the maximum possible, 3) Adjust supply and demand, 4) Cross out the satisfied row or column, 5) Repeat with the next lowest cost, 6) Continue until all allocations are made. It gives better solutions than NW Corner.",
    hint: "Always choose the cheapest available cell.",
    level: "intermediate",
    codeExample: "Find min cᵢⱼ, allocate min(Sᵢ, Dⱼ), adjust and repeat."
  },
  {
    question: "What is Vogel's Approximation Method (VAM)?",
    shortAnswer: "VAM calculates penalties for each row and column, then allocates to the cell with the highest penalty.",
    explanation: "VAM steps: 1) Calculate penalty for each row (difference between smallest two costs), 2) Calculate penalty for each column, 3) Find highest penalty, 4) Allocate to the cheapest cell in that row/column, 5) Adjust supply/demand, 6) Repeat until done. VAM gives near-optimal solutions.",
    hint: "Calculate penalties, allocate to highest penalty cell.",
    level: "intermediate",
    codeExample: "Penalty = 2nd smallest cost - smallest cost, allocate to highest penalty."
  },
  {
    question: "Why is VAM considered the best IBFS method?",
    shortAnswer: "VAM provides the best initial solution, often within 5-10% of optimal, requiring fewer iterations.",
    explanation: "VAM is best because: 1) It considers opportunity costs (penalties), 2) It usually gives a solution close to optimal, 3) It reduces the number of iterations needed, 4) It's more sophisticated than other methods, 5) It's widely used in practice, and 6) It provides a good balance of effort and quality.",
    hint: "VAM = near-optimal solution with few iterations.",
    level: "intermediate",
    codeExample: "VAM solution: typically within 5-10% of optimal cost."
  },
  {
    question: "What is the relationship between IBFS and the transportation simplex method?",
    shortAnswer: "The IBFS is the starting point for the transportation simplex method, which then improves it to optimality.",
    explanation: "Relationship: 1) IBFS provides the initial basic feasible solution, 2) The simplex method starts from this solution, 3) It checks optimality using MODI, 4) It makes improvements through pivot operations, 5) It iterates until optimality is reached, and 6) The quality of IBFS affects the number of iterations.",
    hint: "IBFS feeds into the simplex method for optimization.",
    level: "expert",
    codeExample: "IBFS → Transportation Simplex → Optimal Solution."
  },
  {
    question: "How do you verify that an IBFS is truly feasible?",
    shortAnswer: "Check that all supplies are exhausted, all demands are met, and all allocations are non-negative.",
    explanation: "Verification steps: 1) Sum allocations in each row → equals supply, 2) Sum allocations in each column → equals demand, 3) Check all xᵢⱼ ≥ 0, 4) Verify no negative allocations exist, 5) Ensure total supply equals total demand (after dummy adjustments), and 6) Confirm all constraints are satisfied.",
    hint: "Check row sums, column sums, and non-negativity.",
    level: "intermediate",
    codeExample: "Row sum = Sᵢ, Column sum = Dⱼ, xᵢⱼ ≥ 0."
  },
  {
    question: "What is the significance of m + n - 1 in transportation problems?",
    shortAnswer: "m + n - 1 is the number of basic variables needed for a basic feasible solution.",
    explanation: "Significance: 1) It's the number of positive allocations in a basic solution, 2) m = number of sources, n = number of destinations, 3) This is the rank of the constraint matrix, 4) It ensures there are no cycles, 5) It's required for the simplex method, and 6) If allocations < m+n-1, degeneracy exists.",
    hint: "m + n - 1 = minimum number of positive allocations.",
    level: "intermediate",
    codeExample: "3 sources, 4 destinations → 6 basic variables needed."
  },
  {
    question: "Can an IBFS be the same as the optimal solution?",
    shortAnswer: "Yes, especially when using VAM, which sometimes produces the optimal solution directly.",
    explanation: "It's possible when: 1) VAM produces a solution that is already optimal, 2) The problem is simple with few variables, 3) Costs have a special structure, 4) There are no improvement opportunities, and 5) The solution is verified by the MODI method and found optimal.",
    hint: "Sometimes VAM hits the optimal solution directly.",
    level: "expert",
    codeExample: "If MODI shows all reduced costs ≥ 0, IBFS is optimal."
  },
  {
    question: "How do you handle degeneracy in IBFS?",
    shortAnswer: "Add a very small positive number (epsilon) to a zero cell to make it a basic variable.",
    explanation: "Handling degeneracy: 1) Identify the degenerate solution, 2) Add epsilon (ε) to a zero cell, 3) This cell becomes a basic variable, 4) The solution now has m+n-1 basic variables, 5) The cost is essentially unchanged, 6) This allows the simplex method to proceed, and 7) Epsilon can be treated as 0 in cost calculations.",
    hint: "Add epsilon to a zero cell to fix degeneracy.",
    level: "expert",
    codeExample: "Add ε to cell (i,j) where xᵢⱼ = 0 to make it basic."
  },
  {
    question: "What is the difference between IBFS and optimal solution?",
    shortAnswer: "IBFS is feasible but may not minimize cost, while the optimal solution minimizes cost.",
    explanation: "Differences: 1) IBFS satisfies all constraints but may have higher cost, 2) Optimal solution satisfies all constraints with minimum cost, 3) IBFS is the starting point, 4) Optimal solution is the endpoint, 5) Multiple IBFS may exist but only one optimal cost, and 6) The gap between IBFS cost and optimal cost varies by method.",
    hint: "IBFS = feasible, Optimal = feasible + minimum cost.",
    level: "intermediate",
    codeExample: "IBFS cost = ₹1000, Optimal cost = ₹800."
  },
  {
    question: "Why might the NW Corner method be preferred despite giving poor solutions?",
    shortAnswer: "NW Corner is preferred when speed is critical and solution quality is less important.",
    explanation: "Reasons for NW Corner: 1) Fastest method (single pass), 2) Simplest to implement, 3) Good for quick approximations, 4) Useful for large problems where a quick solution is needed, 5) Helps in preliminary analysis, and 6) Can be used as a starting point when VAM is too slow.",
    hint: "NW Corner = fast but poor quality.",
    level: "expert",
    codeExample: "NW Corner: O(m+n) time, VAM: O(m²n) time."
  },
  {
    question: "How does the choice of IBFS method affect the total number of iterations?",
    shortAnswer: "Better IBFS methods (like VAM) require fewer iterations to reach the optimal solution.",
    explanation: "Iteration comparison: 1) NW Corner: usually requires 8-12 iterations, 2) Least Cost: usually 5-8 iterations, 3) VAM: usually 2-4 iterations, 4) Better starting point means faster convergence, 5) This can significantly reduce computation time, and 6) The total effort includes both IBFS creation and iterations.",
    hint: "Better IBFS = fewer iterations needed.",
    level: "expert",
    codeExample: "VAM: 3 iterations vs NW Corner: 10 iterations."
  },
  {
    question: "What is the role of penalties in VAM?",
    shortAnswer: "Penalties represent the opportunity cost of not using the cheapest cell in a row or column.",
    explanation: "Penalties: 1) Calculated as the difference between the smallest and second smallest costs, 2) Represent the cost of making a suboptimal allocation, 3) Higher penalty means higher opportunity cost, 4) VAM allocates to highest penalty first, 5) This minimizes the chance of poor decisions, and 6) Results in near-optimal solutions.",
    hint: "Penalty = opportunity cost of not choosing the cheapest.",
    level: "expert",
    codeExample: "Penalty = 2nd smallest - smallest in row/column."
  },
  {
    question: "Can multiple IBFS exist for the same transportation problem?",
    shortAnswer: "Yes, multiple IBFS can exist, especially with degeneracy or equal costs.",
    explanation: "Multiple IBFS occur when: 1) There are equal costs in the matrix, 2) Different allocation sequences produce different solutions, 3) Degeneracy creates alternative basic solutions, 4) The problem has multiple feasible shipping plans, and 5) Each IBFS leads to the same optimal solution.",
    hint: "Multiple starting points can lead to the same optimal solution.",
    level: "expert",
    codeExample: "Different allocation orders yield different IBFS."
  },
  {
    question: "How do you calculate the total cost of an IBFS?",
    shortAnswer: "Multiply each allocation by its cost and sum all products.",
    explanation: "Calculation: 1) For each allocated cell (i,j), multiply xᵢⱼ × cᵢⱼ, 2) Sum all these products, 3) This gives the total cost of the shipping plan, 4) This cost serves as a baseline, 5) It's compared with the optimal cost, and 6) The difference is the potential improvement.",
    hint: "Total cost = Σ (xᵢⱼ × cᵢⱼ) for all allocated cells.",
    level: "intermediate",
    codeExample: "Z = ΣᵢΣⱼ cᵢⱼ × xᵢⱼ (over allocated cells)."
  },
  {
    question: "What is the significance of the transportation table in IBFS?",
    shortAnswer: "The transportation table organizes all data needed to find and verify the IBFS.",
    explanation: "Significance: 1) Shows sources, destinations, and costs clearly, 2) Contains supply and demand values, 3) Allows systematic allocation, 4) Makes balance checking easy, 5) Shows the IBFS allocations, 6) Facilitates cost calculation, and 7) Supports the simplex method.",
    hint: "The table is the working canvas for IBFS.",
    level: "intermediate",
    codeExample: "Transportation table with costs, supplies, demands, and allocations."
  },
  {
    question: "How do you handle unbalanced problems when finding IBFS?",
    shortAnswer: "Add dummy sources or destinations first to balance the problem, then find IBFS.",
    explanation: "Handling: 1) Check balance condition, 2) If supply > demand, add dummy destination, 3) If demand > supply, add dummy source, 4) Set dummy costs to zero, 5) Now the problem is balanced, 6) Apply any IBFS method, and 7) The dummy allocations represent unused supply or unmet demand.",
    hint: "Balance first with dummies, then find IBFS.",
    level: "intermediate",
    codeExample: "Supply 500, Demand 600 → Add dummy source supply 100."
  },
  {
    question: "What is the role of shadow prices in verifying IBFS?",
    shortAnswer: "Shadow prices (dual variables) are used in the MODI method to check if IBFS is optimal.",
    explanation: "Shadow prices: 1) uᵢ for rows and vⱼ for columns, 2) Calculated from basic cells, 3) Used to compute reduced costs, 4) If all reduced costs ≥ 0, IBFS is optimal, 5) If any reduced cost < 0, improvement is possible, 6) This is the optimality check after IBFS.",
    hint: "Shadow prices check if IBFS is already optimal.",
    level: "expert",
    codeExample: "Reduced cost = cᵢⱼ - uᵢ - vⱼ. All ≥ 0 → optimal."
  },
  {
    question: "What is the relationship between IBFS and the stepping stone method?",
    shortAnswer: "The stepping stone method uses the IBFS to find improvements by tracing loops in the transportation table.",
    explanation: "Relationship: 1) IBFS provides the starting solution, 2) Stepping stone method traces loops through allocated cells, 3) It identifies potential improvements, 4) It calculates the net change in cost, 5) It determines the entering variable, 6) This leads to an improved solution, and 7) The process repeats until optimal.",
    hint: "Stepping stone improves the IBFS.",
    level: "expert",
    codeExample: "Stepping stone: trace loop, calculate improvement, update solution."
  },
  {
    question: "What are the computational complexities of the three IBFS methods?",
    shortAnswer: "NW Corner: O(m+n), Least Cost: O(mn log(mn)), VAM: O(m²n).",
    explanation: "Complexities: 1) NW Corner: Very fast, O(m+n) time, 2) Least Cost: Moderate, O(mn log(mn)) time, 3) VAM: Slowest, O(m²n) time. The trade-off is between speed and solution quality. VAM is slower but gives better starting points.",
    hint: "Faster methods = poorer quality, slower = better quality.",
    level: "expert",
    codeExample: "NW Corner: O(m+n), Least Cost: O(mn), VAM: O(m²n)."
  },
  {
    question: "How does degeneracy affect the IBFS and subsequent optimization?",
    shortAnswer: "Degeneracy can cause cycling in the simplex method and requires special handling.",
    explanation: "Degeneracy effects: 1) May cause the simplex method to cycle, 2) Makes finding the optimal solution harder, 3) Requires adding epsilon to create basic variables, 4) Can lead to multiple solutions, 5) Needs careful handling in algorithms, and 6) Is common in transportation problems.",
    hint: "Degeneracy = potential for cycling.",
    level: "expert",
    codeExample: "Add epsilon to handle degeneracy and prevent cycling."
  },
  {
    question: "What are the practical applications of IBFS in logistics?",
    shortAnswer: "IBFS is used to quickly create feasible shipping plans for distribution networks.",
    explanation: "Applications: 1) Initial distribution planning, 2) Quick feasibility checks, 3) Comparing different scenarios, 4) Training logistics staff, 5) Base for optimization algorithms, 6) Estimating transportation costs, and 7) Supporting decision-making.",
    hint: "IBFS provides quick, feasible shipping plans.",
    level: "expert",
    codeExample: "Use VAM to get a good initial distribution plan."
  }
];

export default questions;