const questions = [
  {
    question: "What is a surplus variable?",
    shortAnswer: "A non-negative variable subtracted from a ≥ constraint to convert it to an equality.",
    explanation: "Surplus variables represent excess over requirements. For constraint a₁x₁ + a₂x₂ ≥ b, surplus s = (a₁x₁ + a₂x₂) - b, with s ≥ 0.",
    hint: "Subtracted from ≥ constraints.",
    level: "basic",
    codeExample: "x + y ≥ 6 → x + y - s = 6, s ≥ 0"
  },
  {
    question: "What do surplus variables represent in real-world problems?",
    shortAnswer: "Excess over minimum requirements.",
    explanation: "Surplus variables measure how much a solution exceeds the minimum requirements. They represent 'extra' production, nutrients, or quality.",
    hint: "Excess over requirements.",
    level: "intermediate",
    codeExample: "s₁ = excess protein, s₂ = excess carbohydrates"
  },
  {
    question: "What is the difference between slack and surplus variables?",
    shortAnswer: "Slack is added to ≤ constraints; surplus is subtracted from ≥ constraints.",
    explanation: "Both convert inequalities to equalities. Slack represents unused resources, surplus represents excess over requirements.",
    hint: "Slack for ≤, surplus for ≥.",
    level: "intermediate",
    codeExample: "≤ → +s, ≥ → -s"
  },
  {
    question: "What is the coefficient of a surplus variable in the objective function?",
    shortAnswer: "Zero.",
    explanation: "Surplus variables don't contribute to profit or cost. They are only added to convert constraints to equalities.",
    hint: "Zero coefficient.",
    level: "basic",
    codeExample: "Z = 3x + 2y + 0s₁ + 0s₂"
  },
  {
    question: "Why must surplus variables be non-negative?",
    shortAnswer: "Excess over requirements cannot be negative.",
    explanation: "Since LHS ≥ RHS, surplus = LHS - RHS ≥ 0. Negative surplus would mean not meeting the requirement.",
    hint: "Cannot have negative excess.",
    level: "intermediate",
    codeExample: "s = (x + y) - 6 ≥ 0"
  },
  {
    question: "How many surplus variables are needed?",
    shortAnswer: "One for each ≥ constraint.",
    explanation: "Each ≥ constraint requires one surplus variable to convert it to an equality.",
    hint: "One per ≥ constraint.",
    level: "basic",
    codeExample: "3 constraints → 3 surplus variables"
  },
  {
    question: "What happens to surplus variables at the optimal solution?",
    shortAnswer: "They may be zero (binding constraints) or positive (excess).",
    explanation: "At optimality, surplus variables indicate which constraints are exactly met (surplus = 0) and which have excess (surplus > 0).",
    hint: "Zero = exactly met, positive = excess.",
    level: "advanced",
    codeExample: "s₁ = 0 (exactly met), s₂ = 5 (5 units excess)"
  },
  {
    question: "What is the initial basic feasible solution with surplus variables?",
    shortAnswer: "Surplus variables alone cannot form an initial feasible solution.",
    explanation: "Since surplus variables are subtracted, setting original variables to zero gives negative surplus. Artificial variables are needed for initial solution.",
    hint: "Need artificial variables.",
    level: "advanced",
    codeExample: "x = 0, y = 0 → s₁ = -6 (infeasible)"
  },
  {
    question: "Why do surplus variables require artificial variables?",
    shortAnswer: "They cannot form an initial basic feasible solution on their own.",
    explanation: "With only surplus variables, the initial solution is infeasible (negative values). Artificial variables are added to create a feasible starting point.",
    hint: "Need artificial variables for feasibility.",
    level: "advanced",
    codeExample: "x + y - s₁ = 6 → with x=0,y=0, s₁=-6 (infeasible)"
  },
  {
    question: "What does a zero surplus variable indicate?",
    shortAnswer: "The corresponding constraint is exactly met (binding).",
    explanation: "When surplus = 0, LHS = RHS. The constraint is binding at the optimal solution.",
    hint: "Exactly met requirement.",
    level: "intermediate",
    codeExample: "s₁ = 0 → protein requirement exactly met"
  },
  {
    question: "What does a positive surplus variable indicate?",
    shortAnswer: "The corresponding requirement is exceeded.",
    explanation: "When surplus > 0, LHS > RHS. The constraint is non-binding with excess capacity.",
    hint: "Exceeded requirement.",
    level: "intermediate",
    codeExample: "s₂ = 5 → 5 units excess carbohydrates"
  },
  {
    question: "How do you write the objective function with surplus variables?",
    shortAnswer: "Add surplus variables with zero coefficients.",
    explanation: "Since surplus variables don't affect the objective value, they are added with coefficient 0.",
    hint: "Zero coefficients.",
    level: "basic",
    codeExample: "Z' = -4x - 3y + 0s₁ + 0s₂"
  },
  {
    question: "What is the difference between slack and surplus in terms of inequality direction?",
    shortAnswer: "Slack: LHS ≤ RHS, Surplus: LHS ≥ RHS.",
    explanation: "Slack measures how much less than the RHS. Surplus measures how much greater than the RHS.",
    hint: "Slack = RHS - LHS, Surplus = LHS - RHS.",
    level: "intermediate",
    codeExample: "Slack: 10 - (2x+y), Surplus: (x+y) - 6"
  },
  {
    question: "What is the economic interpretation of surplus variables?",
    shortAnswer: "They represent excess production or over-fulfillment of requirements.",
    explanation: "Surplus variables tell managers how much they are exceeding minimum requirements. This can indicate inefficiency or quality above standards.",
    hint: "Excess over minimums.",
    level: "intermediate",
    codeExample: "s₁ = excess units produced, s₂ = excess quality"
  },
  {
    question: "Why do we need surplus variables in the Simplex Method?",
    shortAnswer: "To convert ≥ constraints to equalities for algebraic solution.",
    explanation: "The Simplex Method requires equality constraints to work with basic feasible solutions and perform row operations.",
    hint: "Convert to equalities.",
    level: "intermediate",
    codeExample: "Inequalities → equalities → simplex tableau"
  },
  {
    question: "What is the relationship between surplus variables and the Big-M Method?",
    shortAnswer: "Surplus variables require artificial variables in the Big-M Method.",
    explanation: "Since surplus variables alone don't provide a feasible starting solution, artificial variables are added with a large penalty (M) in the Big-M Method.",
    hint: "Need Big-M for ≥ constraints.",
    level: "advanced",
    codeExample: "Minimize M × artificial variables"
  },
  {
    question: "What is the difference between a surplus variable and a regular variable?",
    shortAnswer: "Surplus variables are added artificially and have zero objective coefficients.",
    explanation: "Regular variables represent actual decisions. Surplus variables represent excess over requirements and have no objective value.",
    hint: "Artificial vs. decision variables.",
    level: "intermediate",
    codeExample: "x, y = decision variables, s₁, s₂ = surplus variables"
  }
];

export default questions;