const questions = [
  {
    question: "What is the step-by-step allocation procedure in transportation problems?",
    shortAnswer: "The step-by-step allocation procedure is the systematic process of assigning shipments from sources to destinations to create an initial basic feasible solution.",
    explanation: "The procedure involves: 1) Choosing a cell based on the method (NW Corner, Least Cost, VAM), 2) Allocating the maximum possible amount (min of remaining supply and demand), 3) Updating supplies and demands, 4) Crossing out exhausted rows/columns, 5) Moving to the next cell, and 6) Repeating until all allocations are complete. This creates the IBFS.",
    hint: "Think of it as filling a matrix systematically cell by cell.",
    level: "basic",
    codeExample: "Choose cell → Allocate min(Sᵢ, Dⱼ) → Update → Move → Repeat."
  },
  {
    question: "What is the allocation amount at each cell?",
    shortAnswer: "The allocation amount is the minimum of the remaining supply in the row and the remaining demand in the column: xᵢⱼ = min(Sᵢ, Dⱼ).",
    explanation: "At each cell, you allocate the smaller of the current row's remaining supply and the current column's remaining demand. This ensures you never exceed either supply or demand, maintaining feasibility. The allocated amount is recorded in the cell.",
    hint: "Allocate the smaller of remaining supply and demand.",
    level: "basic",
    codeExample: "xᵢⱼ = min(Sᵢ, Dⱼ) where Sᵢ and Dⱼ are current remaining values."
  },
  {
    question: "What happens after allocating at a cell?",
    shortAnswer: "After allocating, you update the row supply and column demand by subtracting the allocated amount, then cross out any exhausted rows or columns.",
    explanation: "After allocation: 1) Subtract the allocation from the row supply (Sᵢ = Sᵢ - xᵢⱼ), 2) Subtract the allocation from the column demand (Dⱼ = Dⱼ - xᵢⱼ), 3) If Sᵢ becomes 0, cross out that row, 4) If Dⱼ becomes 0, cross out that column, 5) If both become 0, cross out both, and 6) Move to the next cell according to your method.",
    hint: "Subtract, update, cross out, then move on.",
    level: "intermediate",
    codeExample: "Sᵢ = Sᵢ - xᵢⱼ, Dⱼ = Dⱼ - xᵢⱼ"
  },
  {
    question: "When do you cross out a row in the allocation procedure?",
    shortAnswer: "Cross out a row when its remaining supply becomes zero after an allocation.",
    explanation: "A row is crossed out when the supply is exhausted (Sᵢ = 0). This means the source has no more units to allocate. You should not consider any more cells in that row for future allocations. The row is complete.",
    hint: "Row crossed out when supply = 0.",
    level: "intermediate",
    codeExample: "If Sᵢ = 0 after allocation, row i is complete."
  },
  {
    question: "When do you cross out a column in the allocation procedure?",
    shortAnswer: "Cross out a column when its remaining demand becomes zero after an allocation.",
    explanation: "A column is crossed out when the demand is satisfied (Dⱼ = 0). This means the destination has received all its required units. You should not consider any more cells in that column for future allocations. The column is complete.",
    hint: "Column crossed out when demand = 0.",
    level: "intermediate",
    codeExample: "If Dⱼ = 0 after allocation, column j is complete."
  },
  {
    question: "What happens when both supply and demand become zero simultaneously?",
    shortAnswer: "When both become zero simultaneously, both the row and column are crossed out, and you move diagonally to the next cell.",
    explanation: "Simultaneous exhaustion occurs when the allocation exactly matches both the remaining supply and remaining demand. In this case: 1) Cross out both the row and column, 2) Move to the next available cell (diagonally down-right or according to your method), and 3) This creates degeneracy which may need special handling.",
    hint: "Both zero → cross out both, move diagonally.",
    level: "intermediate",
    codeExample: "If Sᵢ = 0 and Dⱼ = 0 → cross out row i and column j."
  },
  {
    question: "How many allocations should the procedure produce?",
    shortAnswer: "For a balanced problem, the procedure should produce exactly m + n - 1 allocations.",
    explanation: "The number of allocations equals the number of basic variables needed: m + n - 1, where m is the number of sources and n is the number of destinations. If you have fewer allocations, degeneracy has occurred. If you have more, there's an error in the procedure.",
    hint: "m + n - 1 allocations expected.",
    level: "intermediate",
    codeExample: "3 sources, 4 destinations → 3 + 4 - 1 = 6 allocations."
  },
  {
    question: "What is degeneracy in the allocation procedure?",
    shortAnswer: "Degeneracy occurs when the allocation procedure produces fewer than m + n - 1 allocations.",
    explanation: "Degeneracy happens when a single allocation simultaneously exhausts both a row's supply and a column's demand, causing both to be crossed out at the same time. This results in fewer than m+n-1 basic variables. Degeneracy requires special handling by adding epsilon to a zero cell.",
    hint: "Fewer than m+n-1 allocations = degeneracy.",
    level: "expert",
    codeExample: "m=3, n=4, expected 6 allocations, but only 5 produced → degenerate."
  },
  {
    question: "How do you handle degeneracy in the allocation procedure?",
    shortAnswer: "Add a very small positive number (epsilon) to a zero cell to make it a basic variable.",
    explanation: "To handle degeneracy: 1) Identify that the solution has fewer than m+n-1 allocations, 2) Choose a zero cell in the table (not allocated), 3) Add epsilon (ε) to that cell, 4) This cell becomes a basic variable with value ε, 5) The solution now has m+n-1 basic variables, 6) The cost calculation treats ε as effectively zero.",
    hint: "Add epsilon to a zero cell to fix degeneracy.",
    level: "expert",
    codeExample: "Add ε to cell (i,j) where xᵢⱼ = 0 to make it basic."
  },
  {
    question: "What is the role of the transportation table in allocation?",
    shortAnswer: "The transportation table provides the structure for performing allocations, showing supplies, demands, costs, and where to place allocations.",
    explanation: "The table organizes: 1) Sources as rows with supply values, 2) Destinations as columns with demand values, 3) Costs in each cell, 4) Allocations are recorded in cells, 5) Updated supplies and demands are tracked, and 6) Completed rows/columns are crossed out. It's the working document for the procedure.",
    hint: "The table is where you make and track allocations.",
    level: "basic",
    codeExample: "Table with rows, columns, costs, supplies, demands, and allocations."
  },
  {
    question: "How do you calculate the total cost after allocations?",
    shortAnswer: "Total cost = ΣᵢΣⱼ (xᵢⱼ × cᵢⱼ) for all allocated cells.",
    explanation: "After completing all allocations: 1) For each cell that has an allocation, multiply the allocation amount by its cost, 2) Sum all these products, 3) This gives the total cost of the initial feasible solution, 4) This cost serves as the baseline for optimization, and 5) It will be compared with the optimal cost.",
    hint: "Sum of allocation × cost for each cell.",
    level: "intermediate",
    codeExample: "Z = Σ (xᵢⱼ × cᵢⱼ) for all allocated cells."
  },
  {
    question: "What is the difference between allocation and transportation?",
    shortAnswer: "Allocation is the assignment of quantities to cells; transportation is the actual movement of goods.",
    explanation: "Allocation: 1) The mathematical assignment of quantities in the table, 2) Represents the shipping plan on paper, 3) Based on cost optimization, 4) A planning activity. Transportation: 1) The actual physical movement of goods, 2) The execution of the plan, 3) Involves logistics, 4) An operational activity.",
    hint: "Allocation = planning, Transportation = execution.",
    level: "intermediate",
    codeExample: "Allocation plan: send 40 units from S₁ to D₁. Transportation: actually move the goods."
  },
  {
    question: "What happens if you allocate more than min(Sᵢ, Dⱼ)?",
    shortAnswer: "Allocating more than min(Sᵢ, Dⱼ) would exceed either supply or demand, making the solution infeasible.",
    explanation: "If you allocate more than the smaller of supply and demand: 1) You would exceed the supply (if Sᵢ < Dⱼ), or 2) You would exceed the demand (if Dⱼ < Sᵢ), 3) The solution would violate constraints, 4) The solution would be infeasible, and 5) You would need to redo the allocation.",
    hint: "Never allocate more than min(Sᵢ, Dⱼ).",
    level: "basic",
    codeExample: "If S₁ = 50 and D₁ = 40, allocate 40 (not 50)."
  },
  {
    question: "How do you verify the allocation solution is correct?",
    shortAnswer: "Check that row sums equal supplies, column sums equal demands, and all allocations are non-negative.",
    explanation: "Verification steps: 1) Sum allocations in each row and compare to supply, 2) Sum allocations in each column and compare to demand, 3) Check all allocations are non-negative, 4) Count the number of allocations (should be m+n-1), and 5) Calculate total cost to ensure it's consistent.",
    hint: "Check row sums, column sums, and non-negativity.",
    level: "intermediate",
    codeExample: "Row sum = Sᵢ, Column sum = Dⱼ, xᵢⱼ ≥ 0."
  },
  {
    question: "Can the allocation procedure produce different solutions?",
    shortAnswer: "Yes, different allocation methods or tie-breaking rules can produce different initial solutions.",
    explanation: "Different solutions can arise from: 1) Using different methods (NW Corner vs Least Cost vs VAM), 2) Different tie-breaking rules, 3) Different ordering of rows/columns, 4) Different choices when degeneracy occurs, and 5) Different epsilon placements for degeneracy. Each solution is feasible.",
    hint: "Different methods produce different solutions.",
    level: "expert",
    codeExample: "NW Corner gives different allocations than Least Cost."
  },
  {
    question: "What is the time complexity of the allocation procedure?",
    shortAnswer: "The allocation procedure has O(m + n) time complexity for NW Corner and up to O(m²n) for VAM.",
    explanation: "Time complexity varies by method: 1) NW Corner: O(m + n) - visits at most m+n-1 cells, 2) Least Cost: O(mn log(mn)) - requires sorting costs, 3) VAM: O(m²n) - requires penalty calculations each iteration. The allocation mechanics themselves are O(m+n).",
    hint: "NW Corner is fastest, VAM is slowest.",
    level: "expert",
    codeExample: "NW Corner: O(m+n), Least Cost: O(mn), VAM: O(m²n)."
  },
  {
    question: "How does the allocation procedure handle unbalanced problems?",
    shortAnswer: "Add dummy sources or destinations first to balance the problem, then perform the allocation procedure.",
    explanation: "For unbalanced problems: 1) Check balance condition, 2) If supply > demand, add dummy destination, 3) If demand > supply, add dummy source, 4) Set dummy costs to zero, 5) Now perform allocation procedure on the balanced problem, and 6) Dummy allocations represent unused supply or unmet demand.",
    hint: "Balance with dummies first, then allocate.",
    level: "intermediate",
    codeExample: "Supply 500, Demand 600 → Add dummy source supply 100."
  },
  {
    question: "What is the significance of crossing out rows and columns?",
    shortAnswer: "Crossing out marks that a source's supply or a destination's demand has been fully satisfied.",
    explanation: "Crossing out: 1) Prevents further allocations to exhausted rows/columns, 2) Ensures each source/destination is considered only once, 3) Keeps the procedure organized, 4) Helps track progress, 5) Prevents double-counting, and 6) Maintains the basic structure of the solution.",
    hint: "Crossing out = row/column complete.",
    level: "intermediate",
    codeExample: "Cross out row when supply = 0, column when demand = 0."
  },
  {
    question: "What is the relationship between allocations and basic variables?",
    shortAnswer: "Each allocation corresponds to a basic variable in the transportation simplex method.",
    explanation: "In the transportation simplex method: 1) Basic variables are the allocated cells, 2) Number of basic variables = m+n-1, 3) Allocations become the basic variables, 4) Zero-cost cells (dummies) are also basic variables, and 5) The basis drives the simplex method.",
    hint: "Allocations = basic variables.",
    level: "expert",
    codeExample: "Each allocated cell (i,j) has a basic variable xᵢⱼ."
  },
  {
    question: "How do you handle zero costs in the allocation procedure?",
    shortAnswer: "Zero costs are treated like any other costs—they don't affect the allocation decisions.",
    explanation: "Since the allocation procedure for NW Corner ignores costs completely, zero costs have no special effect. For methods that consider costs (Least Cost, VAM), zero costs are just the cheapest possible cost. The allocation mechanics remain the same regardless of cost values.",
    hint: "Zero costs are ignored by NW Corner, considered by others.",
    level: "intermediate",
    codeExample: "Costs don't change the allocation process."
  },
  {
    question: "What is the effect of row/column ordering on allocations?",
    shortAnswer: "Row/column ordering affects the allocation pattern but not the feasibility of the solution.",
    explanation: "Changing the order of rows or columns: 1) Changes which cells get allocations, 2) May change the total cost, 3) Does not affect feasibility, 4) Can change the number of iterations needed, and 5) Is sometimes done to get better initial solutions.",
    hint: "Order affects the pattern, not feasibility.",
    level: "expert",
    codeExample: "Swapping rows changes which cells are allocated."
  },
  {
    question: "What are the practical applications of the allocation procedure?",
    shortAnswer: "The allocation procedure is used in logistics, supply chain management, manufacturing, and transportation planning.",
    explanation: "Applications: 1) Creating initial distribution plans, 2) Checking feasibility of supply-demand matching, 3) Teaching transportation optimization, 4) Estimating shipping costs, 5) Comparing different distribution strategies, 6) Supporting decision-making in logistics, and 7) Foundation for optimization software.",
    hint: "Used in planning and teaching transportation.",
    level: "expert",
    codeExample: "Used by companies to plan initial distribution."
  }
];

export default questions;