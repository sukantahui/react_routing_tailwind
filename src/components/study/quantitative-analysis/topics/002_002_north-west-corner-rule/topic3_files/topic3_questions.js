const questions = [
  {
    question: "What is exhausted supply in transportation problems?",
    shortAnswer: "Exhausted supply occurs when a source's total allocated amount equals its total supply capacity (Sᵢ = 0).",
    explanation: "When a row's supply reaches zero, that source has no more units to allocate. The row is considered complete and should be crossed out. No further allocations should be made from this source. This is a natural stopping point for that source in the allocation process.",
    hint: "Supply exhausted = row complete.",
    level: "basic",
    codeExample: "Sᵢ = 0 → Row i is exhausted and crossed out."
  },
  {
    question: "What is exhausted demand in transportation problems?",
    shortAnswer: "Exhausted demand occurs when a destination's total received amount equals its total demand requirement (Dⱼ = 0).",
    explanation: "When a column's demand reaches zero, that destination has received all its required units. The column is considered complete and should be crossed out. No further allocations should be made to this destination. This is a natural stopping point for that destination in the allocation process.",
    hint: "Demand exhausted = column complete.",
    level: "basic",
    codeExample: "Dⱼ = 0 → Column j is exhausted and crossed out."
  },
  {
    question: "When does simultaneous exhaustion occur?",
    shortAnswer: "Simultaneous exhaustion occurs when an allocation exactly equals both the remaining supply and remaining demand.",
    explanation: "This happens when the allocation at a cell uses up all remaining supply in its row and all remaining demand in its column at the same time. Both the row and column reach zero simultaneously. This creates degeneracy because it results in fewer than m+n-1 allocations.",
    hint: "Both supply and demand reach zero at the same time.",
    level: "intermediate",
    codeExample: "Sᵢ = Dⱼ and xᵢⱼ = Sᵢ = Dⱼ → both exhausted."
  },
  {
    question: "What should you do when supply is exhausted?",
    shortAnswer: "Cross out the row, verify the sum equals the original supply, and move to the next row.",
    explanation: "When supply is exhausted: 1) Verify that all allocations in the row sum to the original supply, 2) Cross out the row (mark it as complete), 3) Do not make any more allocations in that row, 4) Move to the next row for further allocations, and 5) Note that the source is fully utilized.",
    hint: "Cross out and move down.",
    level: "intermediate",
    codeExample: "Row i complete → cross out, move to row i+1."
  },
  {
    question: "What should you do when demand is exhausted?",
    shortAnswer: "Cross out the column, verify the sum equals the original demand, and move to the next column.",
    explanation: "When demand is exhausted: 1) Verify that all allocations in the column sum to the original demand, 2) Cross out the column (mark it as complete), 3) Do not make any more allocations in that column, 4) Move to the next column for further allocations, and 5) Note that the destination is fully satisfied.",
    hint: "Cross out and move right.",
    level: "intermediate",
    codeExample: "Column j complete → cross out, move to column j+1."
  },
  {
    question: "What causes degeneracy in transportation problems?",
    shortAnswer: "Degeneracy is caused by simultaneous exhaustion of both supply and demand at the same cell.",
    explanation: "Degeneracy occurs when: 1) An allocation exactly matches both remaining supply and remaining demand, 2) Both a row and column are exhausted simultaneously, 3) The number of allocations is less than m+n-1, and 4) This creates fewer basic variables than needed for the simplex method.",
    hint: "Simultaneous exhaustion creates degeneracy.",
    level: "intermediate",
    codeExample: "Allocations < m+n-1 → degenerate solution."
  },
  {
    question: "Why is simultaneous exhaustion problematic?",
    shortAnswer: "Simultaneous exhaustion creates degeneracy, which can cause problems in the simplex method.",
    explanation: "Problems caused: 1) Fewer than m+n-1 basic variables, 2) May cause cycling in the simplex method, 3) Makes finding the optimal solution harder, 4) Requires special handling with epsilon, 5) Can lead to incorrect solutions if not handled, and 6) Requires careful tracking.",
    hint: "Degeneracy can cause cycling in the simplex method.",
    level: "expert",
    codeExample: "Degeneracy needs epsilon to fix."
  },
  {
    question: "How do you handle degeneracy?",
    shortAnswer: "Add a very small positive number (epsilon) to a zero cell to make it a basic variable.",
    explanation: "To handle degeneracy: 1) Identify the degenerate solution (allocations < m+n-1), 2) Choose a zero cell in the table (not allocated), 3) Add epsilon (ε) to that cell, 4) This cell becomes a basic variable with value ε, 5) The solution now has m+n-1 basic variables, and 6) The cost calculation treats ε as effectively zero.",
    hint: "Add epsilon to a zero cell.",
    level: "expert",
    codeExample: "Add ε to cell (i,j) where xᵢⱼ = 0."
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
    question: "Can you allocate to an exhausted row?",
    shortAnswer: "No, you should never allocate to a row that has been crossed out due to exhausted supply.",
    explanation: "Allocating to an exhausted row would: 1) Exceed the source's supply capacity, 2) Violate the supply constraint, 3) Make the solution infeasible, 4) Require redoing the entire allocation, and 5) Create an invalid shipping plan. Once a row is crossed out, ignore it completely.",
    hint: "Never allocate from an exhausted source.",
    level: "intermediate",
    codeExample: "Exhausted row → no more allocations."
  },
  {
    question: "Can you allocate to an exhausted column?",
    shortAnswer: "No, you should never allocate to a column that has been crossed out due to exhausted demand.",
    explanation: "Allocating to an exhausted column would: 1) Exceed the destination's demand requirement, 2) Violate the demand constraint, 3) Make the solution infeasible, 4) Require redoing the entire allocation, and 5) Create an invalid shipping plan. Once a column is crossed out, ignore it completely.",
    hint: "Never allocate to an exhausted destination.",
    level: "intermediate",
    codeExample: "Exhausted column → no more allocations."
  },
  {
    question: "What is the role of epsilon in handling degeneracy?",
    shortAnswer: "Epsilon (ε) is a very small positive number added to a zero cell to create a basic variable.",
    explanation: "Epsilon: 1) Creates an artificial basic variable, 2) Restores the correct number of basic variables (m+n-1), 3) Is effectively zero in cost calculations, 4) Prevents cycling in the simplex method, 5) Allows the algorithm to proceed, and 6) Is a standard technique in transportation problems.",
    hint: "Epsilon fixes degeneracy by creating a basic variable.",
    level: "expert",
    codeExample: "ε > 0, ε ≈ 0 (treated as zero in calculations)."
  },
  {
    question: "What happens if you don't handle degeneracy?",
    shortAnswer: "Ignoring degeneracy can cause the simplex method to fail or cycle.",
    explanation: "Consequences: 1) The simplex method may fail to find the optimal solution, 2) Cycling can occur (infinite loop), 3) The solution may not be basic, 4) Optimality checks may fail, 5) The algorithm may terminate prematurely, and 6) Incorrect solutions may be produced.",
    hint: "Ignoring degeneracy = algorithm failure.",
    level: "expert",
    codeExample: "Cycling → no convergence to optimal solution."
  },
  {
    question: "How do you verify that supply is properly exhausted?",
    shortAnswer: "Sum all allocations in the row and verify they equal the original supply value.",
    explanation: "Verification steps: 1) Sum all allocations in the row, 2) Compare the sum to the original supply, 3) If equal, supply is properly exhausted, 4) If not equal, there's an error in the allocation, 5) The row should be crossed out only when sums match.",
    hint: "Row sum = original supply → properly exhausted.",
    level: "intermediate",
    codeExample: "Σⱼ xᵢⱼ = Sᵢ → supply exhausted correctly."
  },
  {
    question: "How do you verify that demand is properly exhausted?",
    shortAnswer: "Sum all allocations in the column and verify they equal the original demand value.",
    explanation: "Verification steps: 1) Sum all allocations in the column, 2) Compare the sum to the original demand, 3) If equal, demand is properly exhausted, 4) If not equal, there's an error in the allocation, 5) The column should be crossed out only when sums match.",
    hint: "Column sum = original demand → properly exhausted.",
    level: "intermediate",
    codeExample: "Σᵢ xᵢⱼ = Dⱼ → demand exhausted correctly."
  },
  {
    question: "What is the relationship between exhaustion and the number of allocations?",
    shortAnswer: "The exhaustion process determines the number of allocations, which should be m+n-1.",
    explanation: "Relationship: 1) Each exhaustion (row or column) reduces the remaining rows/columns, 2) The allocation count equals the number of steps, 3) For a balanced problem, the count should be m+n-1, 4) Simultaneous exhaustion reduces the count (causing degeneracy), and 5) The count determines the number of basic variables.",
    hint: "Allocations = m+n-1 (unless degeneracy).",
    level: "expert",
    codeExample: "m sources, n destinations → m+n-1 allocations."
  },
  {
    question: "How do you handle unbalanced problems with exhaustion?",
    shortAnswer: "Add dummy sources or destinations first, then handle exhaustion in the balanced problem.",
    explanation: "For unbalanced problems: 1) Add dummy source if demand > supply, 2) Add dummy destination if supply > demand, 3) Now the problem is balanced, 4) Apply the allocation procedure, 5) Exhaustion of dummy rows/columns represents unused supply or unmet demand, and 6) Handle exhaustion normally.",
    hint: "Balance with dummies first, then handle exhaustion.",
    level: "intermediate",
    codeExample: "Dummy exhaustion → unused supply or unmet demand."
  },
  {
    question: "What is the relationship between exhaustion and feasibility?",
    shortAnswer: "Exhaustion ensures that the solution is feasible by fully using all supplies and meeting all demands.",
    explanation: "Feasibility requires: 1) All rows must be exhausted (all supply used), 2) All columns must be exhausted (all demand met), 3) No over-allocation occurs, 4) The solution is balanced, and 5) The exhaustion process ensures feasibility.",
    hint: "Exhaustion = feasibility verification.",
    level: "intermediate",
    codeExample: "All rows and columns exhausted → feasible solution."
  },
  {
    question: "What is the relationship between exhaustion and optimality?",
    shortAnswer: "Exhaustion is about feasibility, not optimality. A solution can be feasible (all exhausted) but not optimal.",
    explanation: "Exhaustion ensures: 1) The solution is feasible, 2) All constraints are satisfied, 3) The solution is a valid shipping plan. However: 1) The cost may not be minimal, 2) Optimality requires additional checking, 3) The MODI method checks optimality, and 4) Exhaustion is necessary but not sufficient for optimality.",
    hint: "Exhaustion = feasible, not necessarily optimal.",
    level: "expert",
    codeExample: "All exhausted → feasible. MODI check → optimal."
  },
  {
    question: "How does NW Corner handle exhaustion?",
    shortAnswer: "NW Corner moves right when a column is exhausted and down when a row is exhausted.",
    explanation: "In NW Corner: 1) When supply is exhausted, move down to the next row, 2) When demand is exhausted, move right to the next column, 3) When both are exhausted, move diagonally, 4) Cross out exhausted rows/columns, and 5) Continue until all rows and columns are exhausted.",
    hint: "Move down for row exhaustion, right for column exhaustion.",
    level: "intermediate",
    codeExample: "Sᵢ = 0 → move down. Dⱼ = 0 → move right."
  },
  {
    question: "What is the practical significance of exhaustion in logistics?",
    shortAnswer: "Exhaustion represents the complete use of supply or complete satisfaction of demand in logistics operations.",
    explanation: "Practical significance: 1) Warehouses completely emptied (supply exhaustion), 2) Customer orders fully filled (demand exhaustion), 3) Inventory levels reach zero, 4) Production schedules completed, 5) Distribution plans fulfilled, and 6) Logistics operations completed.",
    hint: "Exhaustion = complete fulfillment in logistics.",
    level: "expert",
    codeExample: "Warehouse empty = supply exhausted. Store full = demand exhausted."
  },
  {
    question: "How do you handle multiple simultaneous exhaustions?",
    shortAnswer: "Handle each simultaneous exhaustion by adding epsilon to zero cells to maintain the correct number of basic variables.",
    explanation: "For multiple simultaneous exhaustions: 1) Identify all occurrences, 2) For each, add epsilon to a zero cell, 3) Ensure the total number of basic variables = m+n-1, 4) Choose zero cells carefully to avoid creating cycles, and 5) Document all epsilon placements.",
    hint: "Add epsilon for each simultaneous exhaustion.",
    level: "expert",
    codeExample: "Multiple εs needed for multiple degeneracies."
  },
  {
    question: "What is the difference between exhaustion and elimination?",
    shortAnswer: "Exhaustion refers to supply/demand reaching zero; elimination refers to crossing out rows/columns.",
    explanation: "Exhaustion: 1) Mathematical condition (Sᵢ = 0 or Dⱼ = 0), 2) Represents completion of a source/destination, 3) Natural part of allocation. Elimination: 1) The action of crossing out, 2) Marks the exhaustion, 3) Prevents further allocations. They are closely related but distinct concepts.",
    hint: "Exhaustion = condition, Elimination = action.",
    level: "intermediate",
    codeExample: "Supply exhausted → eliminate (cross out) the row."
  },
  {
    question: "Can exhaustion occur in unbalanced problems?",
    shortAnswer: "Yes, but dummy rows/columns must be exhausted along with real ones to achieve feasibility.",
    explanation: "In unbalanced problems: 1) Dummy sources/destinations are added, 2) They must be exhausted like real ones, 3) Dummy exhaustion represents surplus or deficit, 4) All rows and columns (including dummies) must be exhausted, and 5) This ensures the problem is properly balanced.",
    hint: "Dummies must be exhausted too.",
    level: "expert",
    codeExample: "Dummy row exhausted = unmet demand represented."
  },
  {
    question: "What are the implications of exhaustion for cost calculation?",
    shortAnswer: "Exhaustion doesn't directly affect cost calculation, but it determines which costs are included.",
    explanation: "Cost implications: 1) Only allocated cells contribute to cost, 2) Exhausted rows/columns have no more allocated cells, 3) The cost sum includes all allocated cells, 4) Dummy cells have zero cost, and 5) Exhaustion completes the set of allocated cells.",
    hint: "Allocated cells determine cost.",
    level: "intermediate",
    codeExample: "Cost = Σ (xᵢⱼ × cᵢⱼ) for allocated cells."
  },
  {
    question: "What is the relationship between exhaustion and the transportation simplex basis?",
    shortAnswer: "Exhaustion determines the basic variables in the transportation simplex method.",
    explanation: "Relationship: 1) Each allocation (including epsilon cells) is a basic variable, 2) The number of basic variables = m+n-1, 3) Exhaustion determines which cells are allocated, 4) The basic variables form the basis for the simplex method, and 5) Proper exhaustion ensures a valid basis.",
    hint: "Allocations = basic variables.",
    level: "expert",
    codeExample: "Allocated cells → basic variables in simplex."
  },
  {
    question: "How do you debug exhaustion errors?",
    shortAnswer: "Check row sums, column sums, count allocations, and verify all constraints.",
    explanation: "Debugging steps: 1) Sum each row and compare to supply, 2) Sum each column and compare to demand, 3) Count the number of positive allocations, 4) Check for degeneracy (allocations < m+n-1), 5) Verify no over-allocation occurred, and 6) Trace back to find where the error occurred.",
    hint: "Check sums and counts to find errors.",
    level: "expert",
    codeExample: "Row sum ≠ Sᵢ → error in that row."
  },
  {
    question: "What is the future of handling exhaustion in transportation problems?",
    shortAnswer: "Automated systems handle exhaustion seamlessly, but understanding remains important for debugging.",
    explanation: "Future trends: 1) Automated allocation algorithms, 2) Real-time inventory tracking, 3) AI-powered optimization, 4) Integrated supply chain systems, 5) Machine learning for demand forecasting, and 6) Automated degeneracy handling. However, human understanding is still needed for validation and debugging.",
    hint: "Automation handles exhaustion, but understanding is valuable.",
    level: "expert",
    codeExample: "AI systems automatically handle exhaustion in real-time."
  }
];

export default questions;