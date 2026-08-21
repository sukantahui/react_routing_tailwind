const questions = [
  {
    question: "What is standard form in LP?",
    shortAnswer: "A specific format with maximization objective, equality constraints, and non-negative variables.",
    explanation: "Standard form requires: (1) Maximization objective, (2) All constraints as equalities, (3) All variables ≥ 0, (4) RHS ≥ 0.",
    hint: "Max, equalities, non-negative.",
    level: "basic",
    codeExample: "Max Z = c₁x₁ + c₂x₂, a₁₁x₁ + a₁₂x₂ = b₁, x₁, x₂ ≥ 0"
  },
  {
    question: "Why is standard form needed for the Simplex Method?",
    shortAnswer: "It creates a system of linear equations that the Simplex Method can solve algebraically.",
    explanation: "The Simplex Method requires equality constraints to work with basic feasible solutions and perform row operations.",
    hint: "System of equations needed.",
    level: "intermediate",
    codeExample: "Equalities → basic variables → simplex operations"
  },
  {
    question: "How do you convert a minimization problem to standard form?",
    shortAnswer: "Multiply the objective function by -1 and maximize.",
    explanation: "Minimize Z = c₁x₁ + c₂x₂ is equivalent to Maximize Z' = -c₁x₁ - c₂x₂.",
    hint: "Multiply by -1 and maximize.",
    level: "basic",
    codeExample: "Min Z = 3x + 4y → Max Z' = -3x - 4y"
  },
  {
    question: "What is a slack variable?",
    shortAnswer: "A variable added to a ≤ constraint to convert it to an equality.",
    explanation: "For constraint a₁x₁ + a₂x₂ ≤ b, add slack variable s ≥ 0 to get a₁x₁ + a₂x₂ + s = b.",
    hint: "Added to ≤ constraints.",
    level: "intermediate",
    codeExample: "2x + y ≤ 10 → 2x + y + s = 10, s ≥ 0"
  },
  {
    question: "What is a surplus variable?",
    shortAnswer: "A variable subtracted from a ≥ constraint to convert it to an equality.",
    explanation: "For constraint a₁x₁ + a₂x₂ ≥ b, subtract surplus variable s ≥ 0 to get a₁x₁ + a₂x₂ - s = b.",
    hint: "Subtracted from ≥ constraints.",
    level: "intermediate",
    codeExample: "x + y ≥ 8 → x + y - s = 8, s ≥ 0"
  },
  {
    question: "What is the difference between slack and surplus variables?",
    shortAnswer: "Slack is added to ≤ constraints; surplus is subtracted from ≥ constraints.",
    explanation: "Both convert inequalities to equalities. Slack represents unused resources. Surplus represents excess over requirements.",
    hint: "Slack for ≤, surplus for ≥.",
    level: "intermediate",
    codeExample: "≤ → +s, ≥ → -s"
  },
  {
    question: "How do you handle equality constraints in standard form?",
    shortAnswer: "Keep them as equalities (no slack or surplus variables needed).",
    explanation: "Equality constraints are already in standard form. They don't need conversion.",
    hint: "Keep as is.",
    level: "basic",
    codeExample: "x + y = 10 → x + y = 10"
  },
  {
    question: "What happens to the objective function when adding slack variables?",
    shortAnswer: "Slack variables get coefficient 0 in the objective function.",
    explanation: "Slack variables don't affect the objective value. They are added with coefficient 0.",
    hint: "Coefficient 0.",
    level: "intermediate",
    codeExample: "Z = 3x + 2y + 0s₁ + 0s₂"
  },
  {
    question: "How do you handle variables that can be negative?",
    shortAnswer: "Replace x with x₁ - x₂ where x₁, x₂ ≥ 0.",
    explanation: "Any unrestricted variable x can be written as the difference of two non-negative variables.",
    hint: "x = x₁ - x₂, both ≥ 0.",
    level: "advanced",
    codeExample: "x unrestricted → x = x₁ - x₂, x₁, x₂ ≥ 0"
  },
  {
    question: "What is the role of the right-hand side (RHS) in standard form?",
    shortAnswer: "The RHS must be non-negative.",
    explanation: "The Simplex Method requires b ≥ 0 for all constraints. If b < 0, multiply the constraint by -1.",
    hint: "RHS ≥ 0.",
    level: "intermediate",
    codeExample: "2x - y ≤ -3 → multiply by -1: -2x + y ≥ 3"
  },
  {
    question: "What are the four requirements of standard form?",
    shortAnswer: "Maximization, equality constraints, non-negative variables, and non-negative RHS.",
    explanation: "1) Objective: Maximize, 2) Constraints: Equalities, 3) Variables: ≥ 0, 4) RHS: ≥ 0.",
    hint: "Max, equalities, non-negative, RHS.",
    level: "basic",
    codeExample: "Max Z, Ax = b, x ≥ 0, b ≥ 0"
  },
  {
    question: "How do you convert a ≥ constraint to equality?",
    shortAnswer: "Subtract a surplus variable.",
    explanation: "For a₁x₁ + a₂x₂ ≥ b, subtract s ≥ 0: a₁x₁ + a₂x₂ - s = b.",
    hint: "Subtract surplus.",
    level: "intermediate",
    codeExample: "x + y ≥ 6 → x + y - s₁ = 6"
  },
  {
    question: "How do you convert a ≤ constraint to equality?",
    shortAnswer: "Add a slack variable.",
    explanation: "For a₁x₁ + a₂x₂ ≤ b, add s ≥ 0: a₁x₁ + a₂x₂ + s = b.",
    hint: "Add slack.",
    level: "intermediate",
    codeExample: "2x + y ≤ 10 → 2x + y + s₁ = 10"
  },
  {
    question: "What is the difference between standard form and canonical form?",
    shortAnswer: "Standard form has equality constraints; canonical form is used for initial simplex tableau.",
    explanation: "Standard form is the general format. Canonical form includes basic variables with identity matrix coefficients.",
    hint: "Standard: equalities, Canonical: tableau ready.",
    level: "advanced",
    codeExample: "Standard: Ax = b, Canonical: identity matrix for basic variables"
  },
  {
    question: "Why must all variables be non-negative in standard form?",
    shortAnswer: "The Simplex Method requires non-negative variables for basic feasible solutions.",
    explanation: "Non-negative variables ensure basic feasible solutions are valid and the method can move between corner points.",
    hint: "Basic feasible solutions need non-negative variables.",
    level: "advanced",
    codeExample: "x ≥ 0, y ≥ 0"
  },
  {
    question: "How do you handle a negative RHS in standard form?",
    shortAnswer: "Multiply the constraint by -1.",
    explanation: "If b < 0, multiply both sides by -1 and reverse the inequality direction.",
    hint: "Multiply by -1.",
    level: "intermediate",
    codeExample: "2x - y ≤ -3 → -2x + y ≥ 3"
  },
  {
    question: "What is the purpose of converting to standard form?",
    shortAnswer: "To enable the Simplex Method by creating a system of linear equations.",
    explanation: "Standard form converts inequalities to equalities, making the problem suitable for algebraic solution.",
    hint: "Enable Simplex Method.",
    level: "basic",
    codeExample: "Convert → Solve with Simplex"
  },
  {
    question: "What are the coefficients of slack variables in the objective function?",
    shortAnswer: "Zero (they don't affect the objective value).",
    explanation: "Slack variables represent unused resources and don't contribute to profit or cost.",
    hint: "Zero coefficients.",
    level: "intermediate",
    codeExample: "Z = 3x + 2y + 0s₁ + 0s₂"
  },
  {
    question: "What are the coefficients of surplus variables in the objective function?",
    shortAnswer: "Zero (they don't affect the objective value).",
    explanation: "Surplus variables represent excess resources and don't contribute to profit or cost.",
    hint: "Zero coefficients.",
    level: "intermediate",
    codeExample: "Z = 3x + 2y + 0s₁ + 0s₂"
  }
];

export default questions;