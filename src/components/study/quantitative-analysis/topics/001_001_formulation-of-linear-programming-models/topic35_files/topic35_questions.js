// topic35_files/topic35_questions.js

const questions = [
  {
    question: "What does a decision variable's optimal value represent?",
    shortAnswer: "The optimal value is the best quantity to produce, invest, or allocate.",
    explanation: "The optimal value tells you what decision to make for each variable.",
    hint: "It tells you 'how much'.",
    level: "basic"
  },
  {
    question: "What is a binding constraint?",
    shortAnswer: "A constraint that is satisfied with equality at the optimal solution.",
    explanation: "Binding constraints represent fully used resources or just-met requirements.",
    hint: "Fully used resource.",
    level: "basic"
  },
  {
    question: "What is a non-binding constraint?",
    shortAnswer: "A constraint that is not satisfied with equality (has slack or surplus).",
    explanation: "Non-binding constraints have excess capacity or exceed requirements.",
    hint: "Has slack or surplus.",
    level: "basic"
  },
  {
    question: "What is a shadow price?",
    shortAnswer: "The change in the objective value per unit increase in the RHS of a constraint.",
    explanation: "Shadow prices tell you the value of additional resources.",
    hint: "Value of one more unit.",
    level: "moderate"
  },
  {
    question: "What does a positive shadow price indicate?",
    shortAnswer: "The resource is valuable; increasing it would improve the objective.",
    explanation: "Positive shadow prices indicate scarce resources that limit production.",
    hint: "Resource has value.",
    level: "moderate"
  },
  {
    question: "What does a zero shadow price indicate?",
    shortAnswer: "The resource is not valuable; increasing it would not improve the objective.",
    explanation: "Zero shadow prices indicate resources with slack or excess capacity.",
    hint: "Resource has no value.",
    level: "moderate"
  },
  {
    question: "What is slack in an LP solution?",
    shortAnswer: "The amount of unused resource in a ≤ constraint.",
    explanation: "Slack = RHS - (left-hand side) for a ≤ constraint.",
    hint: "Unused resource.",
    level: "moderate"
  },
  {
    question: "What is surplus in an LP solution?",
    shortAnswer: "The amount by which a ≥ constraint is exceeded.",
    explanation: "Surplus = (left-hand side) - RHS for a ≥ constraint.",
    hint: "Excess over requirement.",
    level: "moderate"
  },
  {
    question: "Why are binding constraints important?",
    shortAnswer: "They identify scarce resources that limit the solution.",
    explanation: "Binding constraints show where to invest for improvement.",
    hint: "They are the bottlenecks.",
    level: "moderate"
  },
  {
    question: "How do you interpret a shadow price of ₹50 for labor?",
    shortAnswer: "Each additional hour of labor increases profit by ₹50.",
    explanation: "The shadow price tells you the marginal value of the resource.",
    hint: "Value per extra hour.",
    level: "moderate"
  },
  {
    question: "What does it mean if a constraint has slack?",
    shortAnswer: "The resource is not fully used; there is excess capacity.",
    explanation: "Slack resources have zero shadow price.",
    hint: "Excess capacity.",
    level: "moderate"
  },
  {
    question: "What does it mean if a constraint has surplus?",
    shortAnswer: "A minimum requirement has been exceeded.",
    explanation: "Surplus indicates that you've produced more than the minimum.",
    hint: "Exceeded requirement.",
    level: "moderate"
  },
  {
    question: "How do you identify binding constraints from the optimal solution?",
    shortAnswer: "Check which constraints have zero slack or surplus.",
    explanation: "If left-hand side equals RHS, the constraint is binding.",
    hint: "Check equality.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of a shadow price?",
    shortAnswer: "The value of one additional unit of a scarce resource.",
    explanation: "Shadow prices help decide where to invest or expand capacity.",
    hint: "Value of scarcity.",
    level: "expert"
  },
  {
    question: "How do you interpret a variable value of x₁ = 50?",
    shortAnswer: "Produce 50 units of Product 1 (or whatever x₁ represents).",
    explanation: "The variable value is the optimal decision for that variable.",
    hint: "Decision quantity.",
    level: "basic"
  },
  {
    question: "What is the purpose of sensitivity analysis in interpretation?",
    shortAnswer: "To understand how changes affect the optimal solution.",
    explanation: "Sensitivity analysis tests the robustness of the solution.",
    hint: "Test robustness.",
    level: "expert"
  },
  {
    question: "How do you check if a solution is optimal?",
    shortAnswer: "Check that all shadow prices are non-negative (for maximization).",
    explanation: "In a maximization problem, the reduced costs and shadow prices indicate optimality.",
    hint: "Check optimality conditions.",
    level: "expert"
  },
  {
    question: "What is a common mistake in interpreting LP results?",
    shortAnswer: "Ignoring shadow prices and slack variables.",
    explanation: "These provide valuable information about resource value and usage.",
    hint: "Don't ignore shadow prices.",
    level: "moderate"
  },
  {
    question: "What does it mean if a variable is zero at the optimum?",
    shortAnswer: "That activity is not profitable enough to be used.",
    explanation: "Zero variables indicate that the activity is not part of the optimal solution.",
    hint: "Not worth doing.",
    level: "moderate"
  },
  {
    question: "How do you interpret the objective value?",
    shortAnswer: "The optimal profit, cost, or other measure achieved.",
    explanation: "The objective value is the best possible result.",
    hint: "The best result.",
    level: "basic"
  },
  {
    question: "What is the dual LP and how does it relate to interpretation?",
    shortAnswer: "The dual provides shadow prices and economic interpretation.",
    explanation: "The dual variables are the shadow prices of the primal constraints.",
    hint: "Dual gives shadow prices.",
    level: "expert"
  },
  {
    question: "How do you present LP results to management?",
    shortAnswer: "Use business language: optimal production plan, resource usage, recommendations.",
    explanation: "Translate mathematical results into actionable business insights.",
    hint: "Use business language.",
    level: "moderate"
  },
  {
    question: "What is the meaning of a zero variable in the optimal solution?",
    shortAnswer: "That product or activity should not be produced or used.",
    explanation: "Zero variables indicate that the activity is not profitable or efficient.",
    hint: "Don't do it.",
    level: "moderate"
  },
  {
    question: "What does it mean if a shadow price is negative?",
    shortAnswer: "For a ≥ constraint, a negative shadow price means relaxing the constraint would improve the objective.",
    explanation: "Negative shadow prices in minimization problems indicate requirements that drive up cost.",
    hint: "Cost-driving requirement.",
    level: "expert"
  },
  {
    question: "How do you interpret slack in a resource constraint?",
    shortAnswer: "The resource is not fully utilized; there is excess capacity.",
    explanation: "Slack resources can be allocated elsewhere or are not limiting production.",
    hint: "Excess capacity.",
    level: "moderate"
  },
  {
    question: "Why is it important to interpret constraints?",
    shortAnswer: "To understand which resources limit production and which are abundant.",
    explanation: "Constraint interpretation guides investment and resource allocation decisions.",
    hint: "Guides decisions.",
    level: "moderate"
  },
  {
    question: "What is the allowed increase for a shadow price?",
    shortAnswer: "The range within which the shadow price is valid.",
    explanation: "Shadow prices are valid only within a certain range of RHS changes.",
    hint: "Valid range.",
    level: "expert"
  },
  {
    question: "How do you know if a solution is feasible?",
    shortAnswer: "All constraints must be satisfied with the variable values.",
    explanation: "Feasibility means the solution meets all constraints.",
    hint: "All constraints met.",
    level: "basic"
  },
  {
    question: "What is the difference between slack and surplus?",
    shortAnswer: "Slack is for ≤ constraints; surplus is for ≥ constraints.",
    explanation: "Both represent unused capacity but for different constraint types.",
    hint: "Slack for ≤, surplus for ≥.",
    level: "moderate"
  },
  {
    question: "How does interpretation of LP results help in decision-making?",
    shortAnswer: "It translates mathematical results into actionable business insights.",
    explanation: "Good interpretation leads to better decisions about resource allocation and investment.",
    hint: "Better decisions.",
    level: "moderate"
  }
];

export default questions;