const questions = [
  {
    question: "What is the North-West Corner Rule?",
    shortAnswer: "The North-West Corner Rule is a simple method for finding an initial basic feasible solution by starting at the top-left corner of the transportation table.",
    explanation: "The NW Corner Rule allocates shipments systematically starting from the top-left (north-west) cell. It allocates the maximum possible amount based on supply and demand, then moves right if demand is satisfied or down if supply is exhausted, continuing until all allocations are complete.",
    hint: "Think of it as reading a book from top-left to bottom-right.",
    level: "basic",
    codeExample: "Start at (1,1), allocate min(S₁, D₁), move right or down, repeat."
  },
  {
    question: "Why is it called the North-West Corner Rule?",
    shortAnswer: "It's named because we start at the top-left (north-west) corner of the transportation table and move systematically.",
    explanation: "The name comes from the navigation pattern: start at the top-left corner (north-west), move right (east) when a column's demand is satisfied, and move down (south) when a row's supply is exhausted. This creates a path from the north-west corner through the table.",
    hint: "North-west = top-left corner of the table.",
    level: "basic",
    codeExample: "Start at NW corner, move E or S through the table."
  },
  {
    question: "What is the first step in the North-West Corner Rule?",
    shortAnswer: "Start at cell (1,1) and allocate x₁₁ = min(S₁, D₁).",
    explanation: "The first step is to go to the top-left cell of the transportation table. At this cell, allocate the maximum possible amount, which is the smaller of the first row's supply (S₁) and the first column's demand (D₁).",
    hint: "Start at the top-left cell.",
    level: "basic",
    codeExample: "x₁₁ = min(S₁, D₁)"
  },
  {
    question: "How do you decide the allocation amount at each cell?",
    shortAnswer: "Allocate xᵢⱼ = min(remaining supply at row i, remaining demand at column j).",
    explanation: "At each cell, the allocation is the minimum of the remaining supply in the current row and the remaining demand in the current column. This ensures that we never exceed either supply or demand, maintaining feasibility.",
    hint: "Allocate the smaller of remaining supply and demand.",
    level: "basic",
    codeExample: "xᵢⱼ = min(Sᵢ, Dⱼ) at current cell."
  },
  {
    question: "When do you move to the next row in NW Corner?",
    shortAnswer: "Move to the next row (down) when the current row's supply is exhausted.",
    explanation: "When the allocation at the current cell uses up all remaining supply in that row (Sᵢ becomes 0), you move down to the next row. The column you're in remains the same, and you continue allocating from there.",
    hint: "Move down when row supply = 0.",
    level: "intermediate",
    codeExample: "If Sᵢ = 0 → move to row (i+1), same column."
  },
  {
    question: "When do you move to the next column in NW Corner?",
    shortAnswer: "Move to the next column (right) when the current column's demand is satisfied.",
    explanation: "When the allocation at the current cell satisfies all remaining demand in that column (Dⱼ becomes 0), you move right to the next column. The row you're in remains the same, and you continue allocating from there.",
    hint: "Move right when column demand = 0.",
    level: "intermediate",
    codeExample: "If Dⱼ = 0 → move to column (j+1), same row."
  },
  {
    question: "What happens when both supply and demand are exhausted simultaneously?",
    shortAnswer: "When both are exhausted, move diagonally to cell (i+1, j+1).",
    explanation: "If the allocation uses up both the current row's supply and the current column's demand simultaneously, both the row and column become zero. In this case, move diagonally down-right to the next cell (i+1, j+1) to continue.",
    hint: "Both exhausted → move diagonally.",
    level: "intermediate",
    codeExample: "If Sᵢ = 0 and Dⱼ = 0 → move to (i+1, j+1)."
  },
  {
    question: "How many allocations does the NW Corner Rule produce?",
    shortAnswer: "The NW Corner Rule produces exactly m + n - 1 allocations for a balanced problem.",
    explanation: "For a transportation problem with m sources and n destinations, the NW Corner Rule will produce exactly m + n - 1 positive allocations. This is the number of basic variables needed for a basic feasible solution.",
    hint: "m + n - 1 allocations.",
    level: "intermediate",
    codeExample: "3 sources, 4 destinations → 6 allocations."
  },
  {
    question: "What is the quality of the solution from NW Corner Rule?",
    shortAnswer: "The NW Corner Rule gives a feasible solution, but it's usually far from optimal.",
    explanation: "The NW Corner Rule ignores transportation costs entirely. It only considers supplies and demands, not the cost of shipping. This means the solution is feasible but typically has a much higher cost than the optimal solution.",
    hint: "Feasible but not optimal.",
    level: "intermediate",
    codeExample: "NW Corner cost is usually 20-50% above optimal."
  },
  {
    question: "Why does the NW Corner Rule ignore transportation costs?",
    shortAnswer: "The NW Corner Rule is designed for simplicity and speed, not cost optimization.",
    explanation: "The method was designed to be fast and easy to implement. It doesn't consider costs because its purpose is to quickly find a feasible starting point, not an optimal solution. Cost optimization is handled later by the transportation simplex method.",
    hint: "Speed over quality in this method.",
    level: "intermediate",
    codeExample: "Only supplies and demands matter, not costs."
  },
  {
    question: "What are the advantages of the NW Corner Rule?",
    shortAnswer: "Advantages include simplicity, speed, guaranteed feasibility, and easy implementation.",
    explanation: "Advantages: 1) Very simple to understand and apply, 2) Fastest method (single pass through the table), 3) Guarantees a feasible solution, 4) Easy to implement by hand or in code, 5) Good for teaching and learning, and 6) Provides a baseline for comparison.",
    hint: "Simple, fast, and guaranteed feasible.",
    level: "intermediate",
    codeExample: "Works for any balanced transportation problem."
  },
  {
    question: "What are the disadvantages of the NW Corner Rule?",
    shortAnswer: "Disadvantages include poor solution quality, ignoring costs, and requiring improvement.",
    explanation: "Disadvantages: 1) Usually gives poor quality solutions, 2) Ignores all transportation costs, 3) Often requires many iterations to reach optimality, 4) Can cause degeneracy, 5) Not suitable for cost-critical applications, and 6) Must be followed by optimization methods.",
    hint: "Poor quality, ignores costs, needs improvement.",
    level: "intermediate",
    codeExample: "High total cost compared to optimal solution."
  },
  {
    question: "When should you use the NW Corner Rule?",
    shortAnswer: "Use it for quick feasibility checks, teaching, or when speed is more important than quality.",
    explanation: "Best uses: 1) Quick feasibility verification, 2) Teaching the concept of IBFS, 3) Preliminary analysis, 4) When computational speed is critical, 5) As a starting point for comparison with other methods, and 6) When solving very small problems.",
    hint: "Use when speed or simplicity matters more than quality.",
    level: "expert",
    codeExample: "Great for quick estimates, not for final solutions."
  },
  {
    question: "How does NW Corner handle unbalanced problems?",
    shortAnswer: "Add dummy sources or destinations first to balance the problem, then apply NW Corner.",
    explanation: "Before applying NW Corner, the problem must be balanced. If supply > demand, add a dummy destination. If demand > supply, add a dummy source. Set dummy costs to zero. Then apply NW Corner to the balanced problem. Dummy allocations represent unused supply or unmet demand.",
    hint: "Balance first with dummies, then apply NW Corner.",
    level: "intermediate",
    codeExample: "Add dummy column/row, then apply NW Corner."
  },
  {
    question: "What happens if degeneracy occurs in NW Corner?",
    shortAnswer: "Degeneracy occurs when allocations < m + n - 1, requiring addition of epsilon to a zero cell.",
    explanation: "Degeneracy happens when an allocation exactly satisfies both a supply and demand simultaneously, causing both a row and column to be crossed out at the same time. This results in fewer than m+n-1 allocations. To handle it, add a very small number (epsilon) to a zero cell to make it a basic variable.",
    hint: "Add epsilon to handle degeneracy.",
    level: "expert",
    codeExample: "If allocations < m+n-1, add ε to a zero cell."
  },
  {
    question: "Can NW Corner produce multiple solutions?",
    shortAnswer: "Yes, when there are ties or degeneracy, multiple allocations patterns can produce different IBFS.",
    explanation: "Multiple solutions can occur when: 1) There are equal supplies and demands causing simultaneous exhaustion, 2) The order of moving right or down when both are possible, 3) Degeneracy creates alternative basic solutions, and 4) Different tie-breaking rules lead to different allocations.",
    hint: "Ties and degeneracy can create multiple solutions.",
    level: "expert",
    codeExample: "Different tie-breaking gives different IBFS."
  },
  {
    question: "How does NW Corner compare to other IBFS methods?",
    shortAnswer: "NW Corner is fastest but gives the poorest quality solution compared to Least Cost and VAM.",
    explanation: "Comparison: 1) NW Corner: Fastest, simplest, poorest quality, 2) Least Cost: Moderate speed, better quality, 3) VAM: Slowest, most complex, best quality. NW Corner typically requires the most iterations to reach optimality.",
    hint: "NW Corner = fastest but worst quality.",
    level: "intermediate",
    codeExample: "NW Corner: 8-12 iterations, VAM: 2-4 iterations."
  },
  {
    question: "What is the total cost calculation in NW Corner?",
    shortAnswer: "Total cost = ΣᵢΣⱼ (xᵢⱼ × cᵢⱼ) for all allocated cells.",
    explanation: "After completing all allocations, calculate the total cost by multiplying each allocation by its corresponding cost and summing all products. This gives the cost of the initial feasible solution, which serves as a baseline for improvement.",
    hint: "Sum of allocation × cost for each cell.",
    level: "intermediate",
    codeExample: "Z = Σ (xᵢⱼ × cᵢⱼ) for allocated cells."
  },
  {
    question: "How do you verify the NW Corner solution?",
    shortAnswer: "Check that row sums equal supplies, column sums equal demands, and all allocations are non-negative.",
    explanation: "Verification steps: 1) Sum allocations in each row and verify they equal the supply, 2) Sum allocations in each column and verify they equal the demand, 3) Check that all allocations are non-negative, 4) Count the number of positive allocations (should be m+n-1), and 5) Calculate total cost.",
    hint: "Check row sums, column sums, and non-negativity.",
    level: "intermediate",
    codeExample: "Row sum = Sᵢ, Column sum = Dⱼ, xᵢⱼ ≥ 0."
  },
  {
    question: "What is the time complexity of the NW Corner Rule?",
    shortAnswer: "The NW Corner Rule has O(m + n) time complexity, making it very fast.",
    explanation: "The algorithm makes a single pass through the transportation table, visiting at most m + n - 1 cells. This gives it linear time complexity O(m + n), which is faster than other methods that require sorting or penalty calculations.",
    hint: "O(m + n) - very fast.",
    level: "expert",
    codeExample: "O(m + n) time, where m = sources, n = destinations."
  },
  {
    question: "What is the space complexity of the NW Corner Rule?",
    shortAnswer: "The NW Corner Rule has O(m × n) space complexity for the transportation table.",
    explanation: "The space complexity is determined by the need to store the transportation table, which has m rows and n columns. Additional space is needed for supplies, demands, and allocations, but the dominant factor is the m × n table.",
    hint: "O(m × n) space for the table.",
    level: "expert",
    codeExample: "Space for m × n table plus arrays for supplies and demands."
  },
  {
    question: "How does NW Corner handle equal costs?",
    shortAnswer: "Equal costs don't affect NW Corner because the method ignores costs entirely.",
    explanation: "Since NW Corner doesn't consider costs in its allocation decisions, equal costs have no effect on the solution. The method will produce the same allocation pattern regardless of the cost values, as long as supplies and demands remain the same.",
    hint: "Costs are ignored, so equal costs don't matter.",
    level: "intermediate",
    codeExample: "NW Corner produces same solution regardless of costs."
  },
  {
    question: "What is the relationship between NW Corner and the transportation simplex?",
    shortAnswer: "NW Corner provides the initial basic feasible solution for the transportation simplex method.",
    explanation: "The NW Corner solution serves as the starting point for the transportation simplex method. The simplex method takes this feasible solution and iteratively improves it by making pivot operations until optimality is reached.",
    hint: "NW Corner feeds into the simplex method.",
    level: "expert",
    codeExample: "NW Corner → Transportation Simplex → Optimal Solution."
  },
  {
    question: "How do you handle zero costs in NW Corner?",
    shortAnswer: "Zero costs are treated like any other cost—they don't affect the allocation decisions.",
    explanation: "Since NW Corner ignores costs, zero costs have no special significance. The method makes allocations based solely on supply and demand values, regardless of whether costs are zero, positive, or negative.",
    hint: "Zero costs are ignored like all costs.",
    level: "intermediate",
    codeExample: "Allocations independent of cost values."
  },
  {
    question: "What is the impact of ordering on NW Corner results?",
    shortAnswer: "The ordering of sources and destinations affects the NW Corner solution but not the total cost.",
    explanation: "Changing the order of rows or columns changes the allocation pattern but the total cost may remain the same or change depending on costs. The method always produces a feasible solution regardless of order.",
    hint: "Order affects pattern, not feasibility.",
    level: "expert",
    codeExample: "Swapping rows gives different allocations."
  },
  {
    question: "How does NW Corner compare to the Least Cost method?",
    shortAnswer: "NW Corner is faster but gives poorer quality solutions than the Least Cost method.",
    explanation: "Comparison: 1) NW Corner: Fastest, ignores costs, poor quality, 2) Least Cost: Moderate speed, considers costs, better quality. Least Cost typically gives a solution closer to optimal, reducing the number of iterations needed.",
    hint: "Least Cost = better quality, slower than NW Corner.",
    level: "intermediate",
    codeExample: "Least Cost cost is usually lower than NW Corner cost."
  },
  {
    question: "What is the role of the transportation table in NW Corner?",
    shortAnswer: "The transportation table organizes the data needed for NW Corner allocation.",
    explanation: "The transportation table provides: 1) Sources as rows with supplies, 2) Destinations as columns with demands, 3) Costs in each cell, and 4) Space to record allocations. It's the working canvas for the NW Corner method.",
    hint: "The table is where allocations are made.",
    level: "intermediate",
    codeExample: "Table with sources, destinations, costs, supplies, demands."
  },
  {
    question: "What are the practical applications of NW Corner?",
    shortAnswer: "NW Corner is used in quick feasibility checks, teaching, and as a starting point for optimization.",
    explanation: "Applications: 1) Quick feasibility verification, 2) Teaching transportation problems, 3) Preliminary cost estimation, 4) Baseline for comparing other methods, 5) Starting point for optimization, and 6) Quick planning when time is critical.",
    hint: "Good for teaching, quick checks, and starting points.",
    level: "expert",
    codeExample: "Used in introductory operations research courses."
  }
];

export default questions;