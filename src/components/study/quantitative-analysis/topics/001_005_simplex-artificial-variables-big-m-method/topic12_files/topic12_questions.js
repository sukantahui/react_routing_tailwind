const questions = [
  {
    question: "What types of numerical problems are covered in this topic?",
    shortAnswer: "Maximization with Simplex, minimization with Big-M, mixed constraints, and real-world applications.",
    explanation: "The problems range from basic Simplex to advanced Big-M with mixed constraints and real-world applications.",
    hint: "Check the problem list.",
    level: "basic",
    codeExample: "6 problems covering different types"
  },
  {
    question: "How should I approach a numerical problem?",
    shortAnswer: "Identify the problem type, choose the right method, add variables, and perform iterations.",
    explanation: "Follow a systematic approach: read the problem, identify constraint types, choose Simplex or Big-M, add variables, form tableau, and iterate to optimality.",
    hint: "Follow the step-by-step procedure.",
    level: "basic",
    codeExample: "Read → Identify → Choose Method → Solve → Verify"
  },
  {
    question: "What is the difference between Simplex and Big-M problems?",
    shortAnswer: "Simplex problems have only ≤ constraints; Big-M problems have ≥ or = constraints.",
    explanation: "Simplex uses slack variables. Big-M uses surplus, artificial variables, and a penalty M.",
    hint: "≤ = Simplex, ≥ or = = Big-M.",
    level: "basic",
    codeExample: "Simplex: all ≤, Big-M: ≥ or ="
  },
  {
    question: "How do I identify which method to use?",
    shortAnswer: "Check the constraint types: ≤ → Simplex, ≥ or = → Big-M.",
    explanation: "If all constraints are ≤, use Simplex. If any constraints are ≥ or =, use Big-M.",
    hint: "Constraint types determine the method.",
    level: "basic",
    codeExample: "All ≤ → Simplex, ≥ or = → Big-M"
  },
  {
    question: "What are slack variables and when are they used?",
    shortAnswer: "Slack variables are added to ≤ constraints in the Simplex Method.",
    explanation: "Slack variables convert ≤ inequalities to equalities. They represent unused resources.",
    hint: "Added to ≤ constraints.",
    level: "intermediate",
    codeExample: "2x + y ≤ 10 → 2x + y + s = 10"
  },
  {
    question: "What are surplus variables and when are they used?",
    shortAnswer: "Surplus variables are subtracted from ≥ constraints in the Big-M Method.",
    explanation: "Surplus variables convert ≥ inequalities to equalities. They represent excess over requirements.",
    hint: "Subtracted from ≥ constraints.",
    level: "intermediate",
    codeExample: "x + y ≥ 6 → x + y - s = 6"
  },
  {
    question: "What are artificial variables and when are they used?",
    shortAnswer: "Artificial variables are added to ≥ and = constraints in the Big-M Method.",
    explanation: "Artificial variables provide an initial basic feasible solution and are penalized with M.",
    hint: "Added to ≥ and = constraints.",
    level: "intermediate",
    codeExample: "x + y ≥ 6 → x + y - s + a = 6"
  },
  {
    question: "How do I check if my solution is optimal?",
    shortAnswer: "For maximization, all Z coefficients ≥ 0. For minimization, all Z coefficients ≤ 0.",
    explanation: "Check the Z row in the final tableau. If the optimality condition is met, stop.",
    hint: "Check Z row coefficients.",
    level: "intermediate",
    codeExample: "Max: all Z ≥ 0, Min: all Z ≤ 0"
  },
  {
    question: "What does it mean if an artificial variable remains in the solution?",
    shortAnswer: "The problem is infeasible.",
    explanation: "If any artificial variable has a positive value at optimality, the original problem has no feasible solution.",
    hint: "Artificial > 0 → infeasible.",
    level: "advanced",
    codeExample: "a₁ = 5 at optimal → infeasible"
  },
  {
    question: "How do I convert minimization to maximization?",
    shortAnswer: "Multiply the objective function by -1.",
    explanation: "Minimize Z = c₁x + c₂y → Maximize Z' = -c₁x - c₂y.",
    hint: "Multiply by -1.",
    level: "intermediate",
    codeExample: "Min Z = 4x + 3y → Max Z' = -4x - 3y"
  },
  {
    question: "What is the Big-M penalty for maximization?",
    shortAnswer: "Subtract M × artificial variable from the objective.",
    explanation: "In maximization, use -M a to penalize artificial variables and drive them to zero.",
    hint: "Subtract M for max.",
    level: "intermediate",
    codeExample: "Max Z = 5x + 7y - M a₁ - M a₂"
  },
  {
    question: "What is the Big-M penalty for minimization?",
    shortAnswer: "Add M × artificial variable to the objective.",
    explanation: "In minimization, use +M a to penalize artificial variables and drive them to zero.",
    hint: "Add M for min.",
    level: "intermediate",
    codeExample: "Min Z = 4x + 3y + M a₁ + M a₂"
  },
  {
    question: "How do I find the entering variable?",
    shortAnswer: "Choose the most negative coefficient in the Z row (for maximization).",
    explanation: "The entering variable gives the greatest improvement in the objective value.",
    hint: "Most negative Z coefficient.",
    level: "intermediate",
    codeExample: "Z row: [-5, -3, 0, 0] → x enters (-5)"
  },
  {
    question: "How do I find the leaving variable?",
    shortAnswer: "Use the minimum ratio test: RHS / coefficient in entering column.",
    explanation: "Choose the row with the smallest positive ratio to maintain feasibility.",
    hint: "Minimum positive ratio.",
    level: "intermediate",
    codeExample: "Ratios: 10/2=5, 8/1=8 → row 1 leaves"
  },
  {
    question: "What is the pivot element?",
    shortAnswer: "The element at the intersection of the entering column and leaving row.",
    explanation: "The pivot element is used in row operations to transform the tableau.",
    hint: "Intersection of entering column and leaving row.",
    level: "intermediate",
    codeExample: "Pivot = 2 at (row s₁, column x)"
  },
  {
    question: "How many iterations are typically needed?",
    shortAnswer: "Depends on the problem size, usually 2-5 for small problems.",
    explanation: "Each iteration moves to a better corner point until optimality is reached.",
    hint: "2-5 for small problems.",
    level: "basic",
    codeExample: "Small problems: 2-3 iterations"
  },
  {
    question: "What is the role of the formula reference?",
    shortAnswer: "It provides quick access to all formulas needed for solving.",
    explanation: "The formula reference covers Simplex, Big-M, tableau structure, and optimality conditions.",
    hint: "Quick reference for formulas.",
    level: "basic",
    codeExample: "Simplex, Big-M, tableau formulas"
  }
];

export default questions;