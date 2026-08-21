const questions = [
  {
    question: "What is degeneracy in transportation problems?",
    shortAnswer: "Degeneracy occurs when the number of positive allocations (basic variables) is less than m + n - 1.",
    explanation: "Degeneracy is a situation where the allocation table has fewer than m + n - 1 positive allocations, where m is the number of sources and n is the number of destinations. This happens when simultaneous exhaustion of supply and demand occurs, and it requires special handling (adding epsilon) to proceed with optimization.",
    hint: "Degeneracy = too few basic variables.",
    level: "basic",
    codeExample: "m=3, n=3 → expected 5 allocations, but only 4 have positive values → degenerate."
  },
  {
    question: "What causes degeneracy in transportation problems?",
    shortAnswer: "Degeneracy is caused by simultaneous exhaustion of both a row's supply and a column's demand during allocation.",
    explanation: "When an allocation exactly uses up both the remaining supply in a row and the remaining demand in a column simultaneously, both the row and column become exhausted at the same time. This creates fewer than m+n-1 allocations, resulting in degeneracy.",
    hint: "Simultaneous exhaustion causes degeneracy.",
    level: "intermediate",
    codeExample: "Allocation xᵢⱼ = Sᵢ = Dⱼ → both row and column exhausted → degeneracy."
  },
  {
    question: "How do you identify degeneracy?",
    shortAnswer: "Count the number of positive allocations and compare it to m + n - 1.",
    explanation: "To identify degeneracy: 1) Count all cells with positive allocations (xᵢⱼ > 0), 2) Calculate the required number: m + n - 1, 3) If the count is less than the required number, degeneracy exists, 4) If they are equal, the solution is non-degenerate, and 5) If greater, there's an error in the allocation.",
    hint: "Count allocations and compare to m+n-1.",
    level: "intermediate",
    codeExample: "m=3, n=4 → required 6 allocations. If only 5 → degenerate."
  },
  {
    question: "Why is degeneracy problematic in transportation problems?",
    shortAnswer: "Degeneracy prevents the MODI method from working properly and can cause cycling in the simplex method.",
    explanation: "Degeneracy is problematic because: 1) The MODI method requires exactly m+n-1 basic variables, 2) Degeneracy means the basis is incomplete, 3) It can cause the simplex method to cycle infinitely, 4) Optimality checks may fail, and 5) The algorithm may not converge to the optimal solution.",
    hint: "Degeneracy breaks the MODI method.",
    level: "intermediate",
    codeExample: "MODI requires m+n-1 basic variables to calculate dual variables."
  },
  {
    question: "What is the epsilon (ε) method for handling degeneracy?",
    shortAnswer: "The epsilon method adds a very small positive number to a zero cell to make it a basic variable.",
    explanation: "Epsilon method: 1) Identify the degenerate solution, 2) Choose a zero cell (xᵢⱼ = 0), 3) Add a very small positive number ε to that cell, 4) This cell becomes a basic variable, 5) Now the solution has m+n-1 basic variables, and 6) ε is effectively zero in cost calculations.",
    hint: "Add epsilon to a zero cell to fix degeneracy.",
    level: "intermediate",
    codeExample: "xᵢⱼ = ε, where ε > 0 and ε ≈ 0."
  },
  {
    question: "How do you choose which zero cell to add epsilon to?",
    shortAnswer: "Choose a zero cell that won't create a cycle and maintains the basic structure of the solution.",
    explanation: "Guidelines: 1) Choose a cell that won't create a cycle in the allocation pattern, 2) Prefer cells with lower costs (though epsilon's cost is negligible), 3) Avoid cells that would create duplicate rows or columns, 4) Choose a cell that maintains the basic structure, and 5) Document your choice for future reference.",
    hint: "Choose a cell that maintains the solution structure.",
    level: "expert",
    codeExample: "Choose a zero cell that doesn't create a cycle when added."
  },
  {
    question: "Does epsilon affect the total transportation cost?",
    shortAnswer: "No, epsilon is so small that its cost contribution is effectively zero.",
    explanation: "Epsilon's cost contribution is ε × cᵢⱼ, which is essentially zero because ε is infinitesimally small. In practice: 1) The cost of epsilon allocations is treated as zero, 2) It doesn't affect the objective function, 3) It only serves to provide the required number of basic variables, and 4) The total cost remains accurate.",
    hint: "Epsilon has zero cost impact.",
    level: "intermediate",
    codeExample: "Cost contribution = ε × cᵢⱼ ≈ 0."
  },
  {
    question: "Can a solution have multiple degeneracies?",
    shortAnswer: "Yes, a solution can be degenerate in multiple ways, requiring multiple epsilons.",
    explanation: "Multiple degeneracies occur when: 1) Several simultaneous exhaustions happen during allocation, 2) The allocation count is m+n-1 - k (k > 1), 3) Each degeneracy requires its own epsilon, 4) Multiple epsilons may be needed to reach m+n-1 allocations, and 5) Each epsilon must be placed carefully.",
    hint: "Multiple degeneracies → multiple epsilons.",
    level: "expert",
    codeExample: "Need 2 epsilons if missing 2 allocations."
  },
  {
    question: "What is the relationship between NW Corner and degeneracy?",
    shortAnswer: "The NW Corner method frequently produces degenerate solutions.",
    explanation: "NW Corner often causes degeneracy because: 1) It allocates without considering costs, 2) Simultaneous exhaustion is common, 3) The systematic movement pattern often hits equal supply and demand, 4) It's the most likely method to produce degeneracy, and 5) Degeneracy is expected, not unusual, with NW Corner.",
    hint: "NW Corner often creates degeneracy.",
    level: "intermediate",
    codeExample: "NW Corner frequently requires epsilon handling."
  },
  {
    question: "Does the Least Cost method cause degeneracy?",
    shortAnswer: "The Least Cost method can cause degeneracy, but less frequently than NW Corner.",
    explanation: "Least Cost method: 1) Considers costs, so less likely to hit simultaneous exhaustion, 2) Still can cause degeneracy when equal costs or ties occur, 3) Moderately likely to produce degeneracy, and 4) Less frequent than NW Corner but still possible.",
    hint: "Least Cost: moderate chance of degeneracy.",
    level: "intermediate",
    codeExample: "Least Cost degeneracy is less common than NW Corner."
  },
  {
    question: "Does VAM cause degeneracy?",
    shortAnswer: "VAM is the least likely method to cause degeneracy, but it can still happen.",
    explanation: "VAM: 1) Uses penalties to avoid poor allocations, 2) Least likely to produce degeneracy, 3) Can still cause degeneracy with ties or specific cost patterns, 4) When it occurs, it's often subtle, and 5) Still requires epsilon handling if it occurs.",
    hint: "VAM: least likely but still possible.",
    level: "intermediate",
    codeExample: "VAM degeneracy is rare but possible."
  },
  {
    question: "How does degeneracy affect the MODI method?",
    shortAnswer: "Degeneracy prevents the MODI method from working because it requires exactly m+n-1 basic variables.",
    explanation: "MODI method requires: 1) Exactly m+n-1 basic variables to calculate uᵢ and vⱼ, 2) Degeneracy means there are fewer basic variables, 3) The system of equations becomes underdetermined, 4) Dual variables can't be uniquely calculated, and 5) The optimality check fails.",
    hint: "MODI needs m+n-1 basic variables.",
    level: "expert",
    codeExample: "MODI requires full basis (m+n-1 variables)."
  },
  {
    question: "How do you verify degeneracy is resolved?",
    shortAnswer: "After adding epsilon, count allocations again—it should now equal m+n-1.",
    explanation: "Verification steps: 1) Count all positive allocations (including epsilon cells), 2) Compare to m+n-1, 3) If equal, degeneracy is resolved, 4) If still less, add more epsilons, 5) If greater, remove unnecessary epsilons, and 6) Proceed with optimization only after verification.",
    hint: "Count allocations after adding epsilon.",
    level: "intermediate",
    codeExample: "Allocation count = m+n-1 → degeneracy resolved."
  },
  {
    question: "What is the role of degeneracy in the transportation simplex method?",
    shortAnswer: "Degeneracy can cause cycling in the transportation simplex method if not handled properly.",
    explanation: "Degeneracy in simplex: 1) Can cause the algorithm to cycle indefinitely, 2) Makes it harder to find the optimal solution, 3) Requires special handling (epsilon or Bland's rule), 4) May slow down convergence, and 5) Must be resolved before optimality checking.",
    hint: "Degeneracy can cause cycling in simplex.",
    level: "expert",
    codeExample: "Degeneracy → possible cycling → need epsilon."
  },
  {
    question: "What is the difference between degeneracy and infeasibility?",
    shortAnswer: "Degeneracy is feasible but has too few basic variables; infeasibility means no solution exists.",
    explanation: "Degeneracy: 1) A feasible solution exists, 2) All constraints are satisfied, 3) But has fewer than m+n-1 basic variables, 4) Can be fixed with epsilon. Infeasibility: 1) No solution exists, 2) Constraints cannot all be satisfied, 3) Requires changing the problem, and 4) Cannot be fixed with epsilon.",
    hint: "Degeneracy is feasible; infeasibility is not.",
    level: "expert",
    codeExample: "Degenerate: feasible but incomplete basis. Infeasible: no solution."
  },
  {
    question: "Can dummy variables cause degeneracy?",
    shortAnswer: "Yes, adding dummy sources or destinations can sometimes create degeneracy.",
    explanation: "Dummy variables: 1) Add extra rows or columns with zero costs, 2) Can create simultaneous exhaustion, 3) May cause degeneracy in the expanded problem, 4) Dummy cells are candidates for epsilon placement, and 5) Must be handled like any other degeneracy.",
    hint: "Dummies can cause degeneracy too.",
    level: "expert",
    codeExample: "Dummy cells may need epsilon if degeneracy occurs."
  },
  {
    question: "What is the practical significance of degeneracy?",
    shortAnswer: "Degeneracy represents situations where resources are exactly matched to demands, creating ties in the allocation.",
    explanation: "Practical significance: 1) Shows exact matches between supply and demand, 2) Indicates tight constraints, 3) May reveal bottlenecks, 4) Can help identify critical resources, and 5) Provides insight into the problem structure.",
    hint: "Degeneracy shows tight resource matches.",
    level: "expert",
    codeExample: "Degeneracy indicates exact supply-demand matches."
  },
  {
    question: "How do you handle degeneracy in large problems?",
    shortAnswer: "Use the same epsilon method, but be systematic about choosing zero cells.",
    explanation: "Large problem handling: 1) Count allocations systematically, 2) Use a systematic approach to choose zero cells, 3) Document each epsilon placement, 4) Verify count after each addition, 5) Use software tools if available, and 6) Maintain clear documentation.",
    hint: "Systematic approach for large problems.",
    level: "expert",
    codeExample: "Add epsilons systematically until m+n-1 reached."
  },
  {
    question: "What are the limitations of the epsilon method?",
    shortAnswer: "The epsilon method can create theoretical issues and may mask problem structure.",
    explanation: "Limitations: 1) Epsilon is a theoretical construct, 2) Can mask underlying problem structure, 3) May hide true degeneracy patterns, 4) Requires careful documentation, 5) Can be confusing for beginners, and 6) May affect sensitivity analysis.",
    hint: "Epsilon is theoretical, not practical.",
    level: "expert",
    codeExample: "Epsilon is a mathematical tool, not a real shipment."
  },
  {
    question: "What is the future of handling degeneracy?",
    shortAnswer: "Automated solvers handle degeneracy automatically, but understanding remains important.",
    explanation: "Future trends: 1) Optimization software handles degeneracy automatically, 2) AI-powered solvers detect and handle degeneracy, 3) Real-time systems manage degeneracy dynamically, 4) Understanding degeneracy still important for debugging, 5) Educational focus remains on understanding the concept.",
    hint: "Automation handles degeneracy, but understanding is valuable.",
    level: "expert",
    codeExample: "Modern solvers automatically add epsilons when needed."
  }
];

export default questions;