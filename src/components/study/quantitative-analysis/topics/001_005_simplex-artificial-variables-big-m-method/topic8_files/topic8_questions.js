const questions = [
  {
    question: "What is the iteration procedure in the Simplex Method?",
    shortAnswer: "The step-by-step process of moving from one tableau to the next until optimality.",
    explanation: "Each iteration improves the objective value and moves to an adjacent corner point. The procedure repeats until all Z coefficients are non-negative.",
    hint: "Moving from tableau to tableau.",
    level: "basic",
    codeExample: "Iteration 1 → Iteration 2 → ... → Optimal"
  },
  {
    question: "How many steps are in a complete Simplex iteration?",
    shortAnswer: "8 steps: find entering, find leaving, pivot, normalize, eliminate, update Z, update B, check optimality.",
    explanation: "Each iteration follows a systematic 8-step procedure that transforms the tableau and improves the solution.",
    hint: "8 steps total.",
    level: "intermediate",
    codeExample: "Step 1-8: Entering → Leaving → Pivot → Normalize → Eliminate → Update Z → Update B → Check"
  },
  {
    question: "What is the first step in each iteration?",
    shortAnswer: "Find the entering variable (most negative Z coefficient).",
    explanation: "The entering variable is chosen from the Z row to maximize improvement in the objective function.",
    hint: "Most negative Z coefficient.",
    level: "basic",
    codeExample: "Z row: [-3, -2, 0, 0] → x enters"
  },
  {
    question: "What is the second step in each iteration?",
    shortAnswer: "Find the leaving variable using the minimum ratio test.",
    explanation: "The leaving variable is determined by the ratio test to maintain feasibility.",
    hint: "Minimum ratio test.",
    level: "intermediate",
    codeExample: "Ratios: 10/2=5, 8/1=8 → s₁ leaves"
  },
  {
    question: "What is the third step in each iteration?",
    shortAnswer: "Identify the pivot element at the intersection of entering column and leaving row.",
    explanation: "The pivot element is the focus of row operations and must be positive.",
    hint: "Intersection of entering column and leaving row.",
    level: "intermediate",
    codeExample: "Pivot = 2 at (s₁, x)"
  },
  {
    question: "What is the fourth step in each iteration?",
    shortAnswer: "Normalize the pivot row by dividing by the pivot element.",
    explanation: "Making the pivot element 1 simplifies subsequent row operations.",
    hint: "Make pivot = 1.",
    level: "intermediate",
    codeExample: "Row ÷ pivot → pivot becomes 1"
  },
  {
    question: "What is the fifth step in each iteration?",
    shortAnswer: "Eliminate the pivot column in all other rows.",
    explanation: "Make all other entries in the pivot column zero using row operations.",
    hint: "Make pivot column identity.",
    level: "intermediate",
    codeExample: "Row = Row - coeff × Pivot Row"
  },
  {
    question: "What is the sixth step in each iteration?",
    shortAnswer: "Update the Z row using the same row operations.",
    explanation: "The Z row must be transformed consistently with the constraint rows.",
    hint: "Update Z row.",
    level: "intermediate",
    codeExample: "Z = Z - Zcoeff × Pivot Row"
  },
  {
    question: "What is the seventh step in each iteration?",
    shortAnswer: "Update the basic variables in the B column.",
    explanation: "Replace the leaving variable with the entering variable in the B column.",
    hint: "Exchange variables.",
    level: "intermediate",
    codeExample: "B: s₁ → x"
  },
  {
    question: "What is the eighth step in each iteration?",
    shortAnswer: "Check for optimality (all Z coefficients ≥ 0).",
    explanation: "If all Z coefficients are non-negative, the current solution is optimal. Otherwise, continue iterations.",
    hint: "Check all Z ≥ 0.",
    level: "basic",
    codeExample: "Z row: [0, 0, 1.5, 0.5] → optimal"
  },
  {
    question: "How do you know when to stop iterating?",
    shortAnswer: "When all coefficients in the Z row are non-negative (for maximization).",
    explanation: "If any Z coefficient is negative, further improvement is possible. Stop only when all are ≥ 0.",
    hint: "All Z ≥ 0.",
    level: "basic",
    codeExample: "Z row: [0, 2, 3, 0] → stop"
  },
  {
    question: "What happens to the objective value after each iteration?",
    shortAnswer: "It improves (increases for maximization, decreases for minimization).",
    explanation: "Each iteration moves to a better corner point, improving the objective value.",
    hint: "Z improves each time.",
    level: "intermediate",
    codeExample: "Z: 0 → 15 → 16"
  },
  {
    question: "How many iterations are typically needed?",
    shortAnswer: "Depends on the problem size, usually 2-5 for small problems.",
    explanation: "The number of iterations equals the number of corner points visited before reaching optimality.",
    hint: "2-5 for small problems.",
    level: "basic",
    codeExample: "2 variables → usually 2-3 iterations"
  },
  {
    question: "What is the role of the pivot element in the iteration?",
    shortAnswer: "It is the focal point for row operations that transform the tableau.",
    explanation: "The pivot element determines how the tableau is transformed to exchange variables.",
    hint: "Focus of row operations.",
    level: "intermediate",
    codeExample: "Pivot = 2 → divide row by 2"
  },
  {
    question: "What happens if the ratio test gives a tie?",
    shortAnswer: "Either row can be chosen (tie-breaking rule needed).",
    explanation: "Ties in the ratio test can lead to degeneracy. Use a consistent tie-breaking rule.",
    hint: "Tie-breaking needed.",
    level: "advanced",
    codeExample: "Both rows give ratio 5 → tie"
  },
  {
    question: "What happens if no positive coefficients in entering column?",
    shortAnswer: "The problem is unbounded (no finite optimal solution).",
    explanation: "If all coefficients are negative or zero, the entering variable can increase indefinitely.",
    hint: "All non-positive → unbounded.",
    level: "advanced",
    codeExample: "Entering column: [-2, -3, -1] → unbounded"
  },
  {
    question: "What is the difference between iteration and iteration procedure?",
    shortAnswer: "Iteration is one cycle; the procedure is the complete process.",
    explanation: "An iteration is a single cycle of the 8 steps. The procedure is the entire process of repeating iterations until optimality.",
    hint: "One cycle vs. entire process.",
    level: "intermediate",
    codeExample: "One iteration = 8 steps, procedure = all iterations"
  },
  {
    question: "Why is it important to check optimality after each iteration?",
    shortAnswer: "To know when to stop and avoid unnecessary iterations.",
    explanation: "Checking optimality prevents wasted effort on unnecessary iterations and ensures the correct solution.",
    hint: "Stop at optimality.",
    level: "basic",
    codeExample: "Check Z row after each iteration"
  }
];

export default questions;