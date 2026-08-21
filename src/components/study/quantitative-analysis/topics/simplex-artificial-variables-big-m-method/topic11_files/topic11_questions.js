const questions = [
  {
    question: "When should you use the Simplex Method vs Big-M Method?",
    shortAnswer: "Simplex for ≤ constraints; Big-M for ≥ and = constraints.",
    explanation: "Simplex works directly with ≤ constraints using slack variables. Big-M handles ≥ and = constraints using artificial variables with a penalty M.",
    hint: "≤ = Simplex, ≥ or = = Big-M.",
    level: "basic",
    codeExample: "All ≤ → Simplex, ≥ or = → Big-M"
  },
  {
    question: "What variables are added for maximization with Simplex?",
    shortAnswer: "Slack variables only.",
    explanation: "For ≤ constraints, add slack variables to convert to equalities. The objective coefficients for slack variables are 0.",
    hint: "Add slack variables.",
    level: "basic",
    codeExample: "2x + y ≤ 10 → 2x + y + s = 10"
  },
  {
    question: "What variables are added for minimization with Big-M?",
    shortAnswer: "Surplus and artificial variables.",
    explanation: "For ≥ constraints, subtract surplus variables and add artificial variables. Artificial variables are penalized with M.",
    hint: "Surplus + artificial.",
    level: "intermediate",
    codeExample: "x + y ≥ 6 → x + y - s + a = 6"
  },
  {
    question: "How does the objective differ between max and min in Simplex?",
    shortAnswer: "Max uses negative coefficients in Z row; min uses positive coefficients.",
    explanation: "For maximization, Z row has negative coefficients of the objective. For minimization, the problem is converted to maximization or the Z row reflects the minimization objective.",
    hint: "Max: negative Z coefficients.",
    level: "intermediate",
    codeExample: "Max: [-3, -2, 0, 0], Min: [3, 2, 0, 0]"
  },
  {
    question: "What is the penalty for artificial variables in maximization?",
    shortAnswer: "Subtract M × artificial variable.",
    explanation: "In maximization, use -M a to penalize artificial variables and drive them to zero.",
    hint: "Subtract M for max.",
    level: "intermediate",
    codeExample: "Max Z = 5x + 7y - M a₁ - M a₂"
  },
  {
    question: "What is the penalty for artificial variables in minimization?",
    shortAnswer: "Add M × artificial variable.",
    explanation: "In minimization, use +M a to penalize artificial variables and drive them to zero.",
    hint: "Add M for min.",
    level: "intermediate",
    codeExample: "Min Z = 4x + 3y + M a₁ + M a₂"
  },
  {
    question: "What is the optimality condition for maximization?",
    shortAnswer: "All coefficients in the Z row must be ≥ 0.",
    explanation: "If any Z coefficient is negative, the objective can be improved. Stop only when all are non-negative.",
    hint: "All Z ≥ 0.",
    level: "basic",
    codeExample: "Z row: [0, 2, 3, 0, 25] → optimal"
  },
  {
    question: "What is the optimality condition for minimization?",
    shortAnswer: "All coefficients in the Z row must be ≤ 0.",
    explanation: "If any Z coefficient is positive, the objective can be improved. Stop only when all are non-positive.",
    hint: "All Z ≤ 0.",
    level: "basic",
    codeExample: "Z row: [0, -2, -3, 0, 25] → optimal"
  },
  {
    question: "What happens if an artificial variable remains in the optimal solution?",
    shortAnswer: "The problem is infeasible.",
    explanation: "If any artificial variable has a positive value at optimality, the original problem has no feasible solution.",
    hint: "Artificial > 0 → infeasible.",
    level: "advanced",
    codeExample: "a₁ = 5 at optimal → infeasible"
  },
  {
    question: "Can the Simplex Method handle minimization problems?",
    shortAnswer: "Yes, by converting to maximization or using the minimization version.",
    explanation: "Minimize Z = c₁x + c₂y is equivalent to Maximize Z' = -c₁x - c₂y. Or use the minimization version of Simplex.",
    hint: "Convert to maximization.",
    level: "intermediate",
    codeExample: "Min Z = 4x + 3y → Max Z' = -4x - 3y"
  },
  {
    question: "What is the difference between slack and surplus variables?",
    shortAnswer: "Slack is added to ≤ constraints; surplus is subtracted from ≥ constraints.",
    explanation: "Slack variables represent unused resources. Surplus variables represent excess over requirements.",
    hint: "Slack for ≤, surplus for ≥.",
    level: "intermediate",
    codeExample: "≤ → +s, ≥ → -s"
  },
  {
    question: "When do you need artificial variables?",
    shortAnswer: "For ≥ and = constraints.",
    explanation: "Artificial variables are needed when surplus variables alone don't provide an initial basic feasible solution.",
    hint: "≥ and = constraints.",
    level: "basic",
    codeExample: "x + y ≥ 6 → add artificial a"
  },
  {
    question: "What is the role of M in Big-M Method?",
    shortAnswer: "M is a very large penalty that forces artificial variables to zero.",
    explanation: "M must be larger than any other coefficient in the problem to ensure artificial variables are driven out.",
    hint: "Large penalty value.",
    level: "advanced",
    codeExample: "M = 1,000,000 (much larger than other coefficients)"
  },
  {
    question: "How do you convert minimization to maximization?",
    shortAnswer: "Multiply the objective function by -1.",
    explanation: "Minimize Z = c₁x + c₂y → Maximize Z' = -c₁x - c₂y. The optimal solution remains the same.",
    hint: "Multiply by -1.",
    level: "intermediate",
    codeExample: "Min Z = 4x + 3y → Max Z' = -4x - 3y"
  },
  {
    question: "What is the difference between Simplex and Big-M in terms of variables?",
    shortAnswer: "Simplex uses only slack variables; Big-M uses slack, surplus, and artificial.",
    explanation: "Simplex: only slack variables. Big-M: slack for ≤, surplus for ≥, artificial for ≥ and =.",
    hint: "More variables in Big-M.",
    level: "intermediate",
    codeExample: "Simplex: s only, Big-M: s, surplus, artificial"
  },
  {
    question: "Can Big-M Method be used for all ≤ constraints?",
    shortAnswer: "Yes, but it's unnecessary (Simplex is simpler).",
    explanation: "Big-M can handle all constraint types, but it's more complex than Simplex when only ≤ constraints exist.",
    hint: "Yes, but not needed.",
    level: "basic",
    codeExample: "Use Simplex for ≤ only"
  }
];

export default questions;