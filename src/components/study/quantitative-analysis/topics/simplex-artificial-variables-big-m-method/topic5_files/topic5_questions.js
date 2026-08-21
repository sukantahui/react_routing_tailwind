const questions = [
  {
    question: "What is the initial simplex tableau?",
    shortAnswer: "A table representing the LP problem in standard form, used as the starting point for the Simplex Method.",
    explanation: "The tableau organizes all coefficients of constraints and the objective function into a matrix format that enables row operations.",
    hint: "Starting point for Simplex iterations.",
    level: "basic",
    codeExample: "Tableau with B, variable columns, and RHS"
  },
  {
    question: "What are the parts of a simplex tableau?",
    shortAnswer: "Basic variables column, variable columns, RHS column, and objective row.",
    explanation: "The tableau has: B (basic variables), columns for each variable, RHS (right-hand side), and the Z row (objective function).",
    hint: "B, variables, RHS, Z row.",
    level: "basic",
    codeExample: "B | x | y | s₁ | s₂ | RHS"
  },
  {
    question: "What are basic variables in the initial tableau?",
    shortAnswer: "Slack variables (and artificial variables if used) that form the initial basic feasible solution.",
    explanation: "In the initial tableau, basic variables are the slack variables (for ≤ constraints) and artificial variables (for ≥ and = constraints).",
    hint: "Initial basic variables.",
    level: "intermediate",
    codeExample: "s₁, s₂ (slack variables)"
  },
  {
    question: "How do you write the Z row in the initial tableau?",
    shortAnswer: "For maximization, use negative coefficients of the objective function.",
    explanation: "The Z row is written as Z - c₁x₁ - c₂x₂ = 0, so the coefficients are -c₁, -c₂, ...",
    hint: "Negative coefficients for maximization.",
    level: "intermediate",
    codeExample: "Z row: [-3, -2, 0, 0, 0] for Z = 3x + 2y"
  },
  {
    question: "What do the coefficients in the constraint rows represent?",
    shortAnswer: "The amount of each variable used in that constraint.",
    explanation: "Each coefficient shows how much of a variable contributes to the constraint's left-hand side.",
    hint: "Variable usage coefficients.",
    level: "basic",
    codeExample: "Row: [2, 1, 1, 0, 10] → 2x + y + s₁ = 10"
  },
  {
    question: "What is the RHS column in the tableau?",
    shortAnswer: "The right-hand side values of the constraints.",
    explanation: "The RHS column contains the b values from the standard form equations a₁x₁ + a₂x₂ + ... = b.",
    hint: "Right-hand side values.",
    level: "basic",
    codeExample: "RHS: 10, 8"
  },
  {
    question: "How do you identify basic variables from the tableau?",
    shortAnswer: "They have a column with a single 1 and all other entries 0.",
    explanation: "Basic variables form an identity matrix in the tableau. Each basic variable has a 1 in its row and 0s elsewhere.",
    hint: "Identity matrix columns.",
    level: "intermediate",
    codeExample: "s₁: [1, 0]ᵀ, s₂: [0, 1]ᵀ form identity"
  },
  {
    question: "What is the value of basic variables in the initial tableau?",
    shortAnswer: "They equal the corresponding RHS values.",
    explanation: "In the initial tableau, basic variables (slack variables) have values equal to the RHS of their rows.",
    hint: "Basic variables = RHS values.",
    level: "intermediate",
    codeExample: "s₁ = 10, s₂ = 8"
  },
  {
    question: "What is the value of non-basic variables in the initial tableau?",
    shortAnswer: "Zero.",
    explanation: "Non-basic variables are set to zero in the initial basic feasible solution.",
    hint: "Non-basic variables = 0.",
    level: "intermediate",
    codeExample: "x = 0, y = 0"
  },
  {
    question: "What is the objective value in the initial tableau?",
    shortAnswer: "Zero (since all original variables are zero).",
    explanation: "With all non-basic variables at zero, the objective function value is 0.",
    hint: "Z = 0 initially.",
    level: "basic",
    codeExample: "Z = 0"
  },
  {
    question: "How do you handle artificial variables in the tableau?",
    shortAnswer: "They become basic variables with a penalty in the Z row.",
    explanation: "Artificial variables are added for ≥ and = constraints and penalized with M in the objective row.",
    hint: "Artificials with penalty M.",
    level: "advanced",
    codeExample: "Z row: [-4, -3, 0, 0, M, M, 0]"
  },
  {
    question: "What does the identity matrix in the tableau represent?",
    shortAnswer: "The basic feasible solution.",
    explanation: "The identity matrix columns correspond to basic variables, showing that each basic variable appears in only one equation.",
    hint: "Identity = basic variables.",
    level: "advanced",
    codeExample: "Columns for s₁ and s₂ form identity matrix"
  },
  {
    question: "Why is the Z row written with negative coefficients?",
    shortAnswer: "To set up the tableau for the Simplex Method's pivot operations.",
    explanation: "Writing Z - c₁x₁ - c₂x₂ = 0 allows the Simplex Method to identify entering variables by negative coefficients.",
    hint: "Negative coefficients for pivot selection.",
    level: "advanced",
    codeExample: "Z - 3x - 2y = 0 → [-3, -2, 0, 0, 0]"
  },
  {
    question: "What is the difference between basic and non-basic variables?",
    shortAnswer: "Basic variables are in the basis (positive values); non-basic variables are zero.",
    explanation: "Basic variables form the identity matrix and have positive values. Non-basic variables are set to zero.",
    hint: "In basis vs. not in basis.",
    level: "intermediate",
    codeExample: "Basic: s₁, s₂; Non-basic: x, y"
  },
  {
    question: "How many rows does the initial tableau have?",
    shortAnswer: "One row for each constraint plus one Z row.",
    explanation: "The tableau has m + 1 rows, where m is the number of constraints.",
    hint: "Constraints + 1 row.",
    level: "basic",
    codeExample: "2 constraints → 3 rows (s₁, s₂, Z)"
  },
  {
    question: "How many columns does the initial tableau have?",
    shortAnswer: "One column for each variable plus one for RHS.",
    explanation: "The tableau has n + 1 columns, where n is the number of variables (including slack/artificial).",
    hint: "Variables + RHS column.",
    level: "basic",
    codeExample: "4 variables → 5 columns (x, y, s₁, s₂, RHS)"
  }
];

export default questions;