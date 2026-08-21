const questions = [
  {
    question: "What is the Big-M Method?",
    shortAnswer: "A variant of the Simplex Method for problems with ≥ and = constraints using artificial variables.",
    explanation: "The Big-M Method adds artificial variables to ≥ and = constraints and penalizes them with a large M in the objective.",
    hint: "Handles ≥ and = constraints.",
    level: "basic",
    codeExample: "Min Z = c₁x + c₂y + M a₁ + M a₂"
  },
  {
    question: "Why is M used in the Big-M Method?",
    shortAnswer: "To penalize artificial variables and drive them to zero.",
    explanation: "M is a very large number that forces artificial variables out of the optimal solution unless the problem is infeasible.",
    hint: "Penalty for artificial variables.",
    level: "intermediate",
    codeExample: "M = 1000 (much larger than other coefficients)"
  },
  {
    question: "What types of constraints require artificial variables?",
    shortAnswer: "≥ constraints and = constraints.",
    explanation: "Artificial variables are needed when surplus variables alone cannot provide an initial basic feasible solution.",
    hint: "≥ and = constraints.",
    level: "basic",
    codeExample: "x + y ≥ 6 → x + y - s + a = 6, x + y = 6 → x + y + a = 6"
  },
  {
    question: "How do you penalize artificial variables in minimization?",
    shortAnswer: "Add M × artificial variable to the objective.",
    explanation: "In minimization, we add +M a to penalize artificial variables. M is a very large number.",
    hint: "Add M for minimization.",
    level: "intermediate",
    codeExample: "Min Z = 4x + 3y + M a₁ + M a₂"
  },
  {
    question: "How do you penalize artificial variables in maximization?",
    shortAnswer: "Subtract M × artificial variable from the objective.",
    explanation: "In maximization, we use -M a to penalize artificial variables. M is a very large number.",
    hint: "Subtract M for maximization.",
    level: "intermediate",
    codeExample: "Max Z = 4x + 3y - M a₁ - M a₂"
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
    question: "How large should M be?",
    shortAnswer: "M must be larger than any other coefficient in the problem.",
    explanation: "M should be chosen so that it dominates all other coefficients, ensuring artificial variables are driven to zero.",
    hint: "Larger than any coefficient.",
    level: "advanced",
    codeExample: "M = 1,000,000 (much larger than other coefficients)"
  },
  {
    question: "What is the difference between Big-M and Two-Phase methods?",
    shortAnswer: "Big-M uses a penalty in one phase; Two-Phase uses two phases without penalty.",
    explanation: "Big-M has numerical issues with large M. Two-Phase avoids this by separating feasibility (Phase 1) and optimality (Phase 2).",
    hint: "One phase vs. two phases.",
    level: "advanced",
    codeExample: "Big-M: one tableau, Two-Phase: two tableaus"
  },
  {
    question: "Can Big-M Method handle ≤ constraints?",
    shortAnswer: "Yes, but they don't need artificial variables.",
    explanation: "≤ constraints use slack variables and don't require artificial variables. Big-M is only needed for ≥ and = constraints.",
    hint: "≤ constraints use slack only.",
    level: "intermediate",
    codeExample: "2x + y ≤ 10 → 2x + y + s = 10 (no artificial)"
  },
  {
    question: "What is the role of surplus variables in Big-M?",
    shortAnswer: "They are subtracted from ≥ constraints before adding artificial variables.",
    explanation: "For ≥ constraints: add surplus variable (-s) then add artificial variable (+a).",
    hint: "Subtract surplus, add artificial.",
    level: "intermediate",
    codeExample: "x + y ≥ 6 → x + y - s + a = 6"
  },
  {
    question: "What is the initial basic solution in Big-M?",
    shortAnswer: "Artificial variables are the initial basic variables.",
    explanation: "Artificial variables provide the initial basic feasible solution with values equal to the RHS.",
    hint: "Artificials are basic initially.",
    level: "advanced",
    codeExample: "a₁ = 6, a₂ = 8 (basic variables)"
  },
  {
    question: "When should you use Big-M Method?",
    shortAnswer: "When the LP problem has ≥ or = constraints.",
    explanation: "Big-M Method is used when the standard form cannot be obtained with only slack variables.",
    hint: "≥ or = constraints present.",
    level: "basic",
    codeExample: "Problems with ≥ or = constraints"
  },
  {
    question: "What is the disadvantage of Big-M Method?",
    shortAnswer: "Numerical issues with choosing M and possible rounding errors.",
    explanation: "If M is too small, artificials may remain. If M is too large, numerical instability can occur.",
    hint: "Numerical issues with M.",
    level: "advanced",
    codeExample: "M too small → wrong results, M too large → computational issues"
  },
  {
    question: "How does Big-M detect infeasibility?",
    shortAnswer: "If an artificial variable remains positive at the optimal solution.",
    explanation: "A positive artificial variable at optimality means the constraints are contradictory.",
    hint: "Artificial > 0 → infeasible.",
    level: "advanced",
    codeExample: "a₁ > 0 at optimal → infeasible"
  },
  {
    question: "What is the relationship between Big-M and Two-Phase?",
    shortAnswer: "Both handle ≥ and = constraints, but Two-Phase avoids numerical issues with M.",
    explanation: "Two-Phase Method is often preferred because it avoids the numerical problems associated with choosing M.",
    hint: "Two-Phase avoids M issues.",
    level: "advanced",
    codeExample: "Two-Phase: Phase 1 (feasibility), Phase 2 (optimality)"
  },
  {
    question: "Can Big-M Method solve any LP problem?",
    shortAnswer: "Yes, any LP problem can be solved using Big-M Method.",
    explanation: "Big-M Method can handle all constraint types (≤, ≥, =) and both maximization and minimization.",
    hint: "Handles all LP problems.",
    level: "basic",
    codeExample: "≤, ≥, = constraints all handled"
  },
  {
    question: "What is the purpose of artificial variables?",
    shortAnswer: "To create an initial basic feasible solution for the Simplex Method.",
    explanation: "Artificial variables provide a starting point when the problem doesn't have a natural basic feasible solution.",
    hint: "Create initial feasible solution.",
    level: "intermediate",
    codeExample: "a₁, a₂ provide initial basis"
  }
];

export default questions;