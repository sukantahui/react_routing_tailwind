const questions = [
  {
    question: "What is a slack variable?",
    shortAnswer: "A non-negative variable added to a ≤ constraint to convert it to an equality.",
    explanation: "Slack variables represent unused resources. For constraint a₁x₁ + a₂x₂ ≤ b, slack s = b - (a₁x₁ + a₂x₂), with s ≥ 0.",
    hint: "Added to ≤ constraints.",
    level: "basic",
    codeExample: "2x + y ≤ 10 → 2x + y + s = 10, s ≥ 0"
  },
  {
    question: "What do slack variables represent in real-world problems?",
    shortAnswer: "Unused resources or idle capacity.",
    explanation: "Slack variables measure how much of a resource is left unused at a given solution. They represent excess capacity that could be used.",
    hint: "Unused capacity.",
    level: "intermediate",
    codeExample: "s₁ = unused labor hours, s₂ = unused machine hours"
  },
  {
    question: "What is the coefficient of a slack variable in the objective function?",
    shortAnswer: "Zero.",
    explanation: "Slack variables don't contribute to profit or cost. They are added only to convert constraints to equalities.",
    hint: "Zero coefficient.",
    level: "basic",
    codeExample: "Z = 3x + 2y + 0s₁ + 0s₂"
  },
  {
    question: "Why must slack variables be non-negative?",
    shortAnswer: "Resource usage cannot exceed availability, so slack ≥ 0.",
    explanation: "Since usage ≤ availability, slack = availability - usage ≥ 0. Negative slack would mean using more than available.",
    hint: "Cannot use more than available.",
    level: "intermediate",
    codeExample: "s = 10 - (2x + y) ≥ 0"
  },
  {
    question: "How many slack variables are needed?",
    shortAnswer: "One for each ≤ constraint.",
    explanation: "Each ≤ constraint requires one slack variable to convert it to an equality.",
    hint: "One per ≤ constraint.",
    level: "basic",
    codeExample: "3 constraints → 3 slack variables"
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
    question: "What happens to slack variables at the optimal solution?",
    shortAnswer: "Some may be zero (binding constraints), some may be positive (non-binding).",
    explanation: "At optimality, slack variables indicate which resources are fully utilized (slack = 0) and which have unused capacity (slack > 0).",
    hint: "Zero = fully utilized, positive = unused capacity.",
    level: "advanced",
    codeExample: "s₁ = 0 (fully utilized), s₂ = 10 (10 units slack)"
  },
  {
    question: "What is the initial basic feasible solution using slack variables?",
    shortAnswer: "Set all original variables to zero; slack variables equal RHS values.",
    explanation: "The initial basic feasible solution is: x = 0, y = 0, s₁ = b₁, s₂ = b₂, ... This is always feasible.",
    hint: "Original variables = 0, slack = RHS.",
    level: "advanced",
    codeExample: "x = 0, y = 0, s₁ = 10, s₂ = 8"
  },
  {
    question: "Are slack variables part of the final optimal solution?",
    shortAnswer: "Yes, their values indicate resource utilization.",
    explanation: "At optimality, slack variables show how much of each resource is unused. This information is valuable for sensitivity analysis.",
    hint: "Yes, they show unused resources.",
    level: "intermediate",
    codeExample: "s₁ = 0, s₂ = 10 → resource 1 fully used, resource 2 has slack"
  },
  {
    question: "What does a zero slack variable indicate?",
    shortAnswer: "The corresponding resource is fully utilized (binding constraint).",
    explanation: "When slack = 0, the constraint is binding at the optimal solution. The resource is completely used up.",
    hint: "Fully utilized resource.",
    level: "intermediate",
    codeExample: "s₁ = 0 → labor fully utilized"
  },
  {
    question: "What does a positive slack variable indicate?",
    shortAnswer: "The corresponding resource has unused capacity.",
    explanation: "When slack > 0, the constraint is non-binding. The resource is not fully utilized.",
    hint: "Unused capacity.",
    level: "intermediate",
    codeExample: "s₂ = 10 → 10 units of machine time unused"
  },
  {
    question: "How do you write the objective function with slack variables?",
    shortAnswer: "Add slack variables with zero coefficients.",
    explanation: "Since slack variables don't affect the objective value, they are added with coefficient 0.",
    hint: "Zero coefficients.",
    level: "basic",
    codeExample: "Z = 3x + 2y + 0s₁ + 0s₂"
  },
  {
    question: "What is the role of slack variables in the simplex tableau?",
    shortAnswer: "They form the initial basis and are part of the tableau columns.",
    explanation: "Slack variables are the basic variables in the initial simplex tableau, forming an identity matrix.",
    hint: "Form the initial basis.",
    level: "advanced",
    codeExample: "Columns for s₁, s₂ form identity matrix"
  },
  {
    question: "Can slack variables be basic variables?",
    shortAnswer: "Yes, they are the initial basic variables.",
    explanation: "Slack variables start as basic variables (with value RHS) and may leave the basis during simplex iterations.",
    hint: "Initial basic variables.",
    level: "advanced",
    codeExample: "s₁ = 10, s₂ = 8 (basic variables)"
  },
  {
    question: "What happens to slack variables when a constraint is binding?",
    shortAnswer: "The slack variable becomes zero.",
    explanation: "When a constraint is binding, LHS = RHS, so slack = 0. The resource is fully utilized.",
    hint: "Binding constraint → slack = 0.",
    level: "intermediate",
    codeExample: "2x + y = 10 → s₁ = 0"
  },
  {
    question: "What is the economic interpretation of slack variables?",
    shortAnswer: "They represent idle resources or excess capacity.",
    explanation: "Slack variables tell managers how much of each resource is not being used. This can indicate opportunities for additional production.",
    hint: "Idle resources.",
    level: "intermediate",
    codeExample: "s₁ = idle labor hours, s₂ = unused materials"
  },
  {
    question: "Why do we need slack variables in the Simplex Method?",
    shortAnswer: "To convert inequalities to equalities for algebraic solution.",
    explanation: "The Simplex Method requires equality constraints to work with basic feasible solutions and perform row operations.",
    hint: "Convert to equalities.",
    level: "intermediate",
    codeExample: "Inequalities → equalities → simplex tableau"
  },
  {
    question: "What is the difference between a slack variable and a regular variable?",
    shortAnswer: "Slack variables are added artificially and have zero objective coefficients.",
    explanation: "Regular variables represent actual decisions. Slack variables represent unused resources and have no objective value.",
    hint: "Artificial vs. decision variables.",
    level: "intermediate",
    codeExample: "x, y = decision variables, s₁, s₂ = slack variables"
  }
];

export default questions;