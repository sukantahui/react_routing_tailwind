// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What are constraints in Linear Programming?",
    shortAnswer: "Linear inequalities or equalities that restrict the values of decision variables.",
    explanation: "Constraints represent the limitations or requirements of the problem—like resource capacities, demand minimums, or policy rules. They define what is feasible.",
    hint: "They define what is allowed and what is not.",
    level: "basic"
  },
  {
    question: "What is the purpose of constraints in an LP model?",
    shortAnswer: "To define the feasible region and ensure the solution is realistic and respects real-world limits.",
    explanation: "Without constraints, the problem would be unbounded and the optimal solution would be infinite. Constraints keep the model grounded in reality.",
    hint: "They keep the problem from having infinite solutions.",
    level: "basic"
  },
  {
    question: "Give an example of a constraint in a production problem.",
    shortAnswer: "2x₁ + 3x₂ ≤ 120, where 2 and 3 are labor hours per unit, and 120 is total labor hours available.",
    explanation: "This limits total labor usage to what is actually available. It prevents the model from using more labor than exists.",
    hint: "Resource capacity constraints are very common.",
    level: "basic"
  },
  {
    question: "What is the difference between ≤ and ≥ constraints?",
    shortAnswer: "≤ means 'less than or equal to' (capacity, maximum); ≥ means 'greater than or equal to' (minimum requirement).",
    explanation: "Choose ≤ for limits you cannot exceed (e.g., budget). Choose ≥ for requirements you must meet (e.g., demand).",
    hint: "≤ for caps, ≥ for floors.",
    level: "basic"
  },
  {
    question: "What is an equality constraint?",
    shortAnswer: "A constraint of the form a₁x₁ + ... = b, representing an exact requirement or conservation law.",
    explanation: "Examples: total weight of a mix must be exactly 100 kg; flow conservation in networks where inflow must equal outflow.",
    hint: "Must equal exactly, no more or less.",
    level: "moderate"
  },
  {
    question: "What is a common mistake when writing constraints?",
    shortAnswer: "Using the wrong inequality direction (e.g., ≥ instead of ≤).",
    explanation: "Misinterpreting 'at most' vs 'at least' leads to infeasible or incorrect models. Always read the problem wording carefully.",
    hint: "Check if the constraint is a 'cap' or a 'floor'.",
    level: "moderate"
  },
  {
    question: "How do you know if a constraint is redundant?",
    shortAnswer: "If it does not change the feasible region (i.e., it is always satisfied when other constraints are met), it is redundant.",
    explanation: "Redundant constraints can be removed without affecting the optimal solution. They are often discovered during model simplification.",
    hint: "It doesn't add any new restriction.",
    level: "expert"
  },
  {
    question: "What is the role of constraints in defining the feasible region?",
    shortAnswer: "They bound the feasible region; the intersection of all constraints gives the set of feasible solutions.",
    explanation: "Each constraint cuts the solution space; the feasible region is where all constraints are satisfied simultaneously.",
    hint: "They shape the 'playing field' of possible solutions.",
    level: "moderate"
  },
  {
    question: "Can constraints include both variables and constants?",
    shortAnswer: "Yes, coefficients are constants multiplied by variables, and the RHS is a constant.",
    explanation: "The linear form is a₁x₁ + a₂x₂ + ... ≤ b. Variables are unknown, constants are fixed numbers.",
    hint: "Constants on the right side.",
    level: "basic"
  },
  {
    question: "In a diet problem, what would a typical constraint be?",
    shortAnswer: "3x₁ + 2x₂ ≥ 20 (minimum protein requirement), where x₁, x₂ are food servings.",
    explanation: "This ensures the diet meets minimum nutritional needs. Without it, the diet could be nutritionally deficient.",
    hint: "Nutritional requirements are usually ≥ constraints.",
    level: "moderate"
  },
  {
    question: "What is the difference between a constraint and the objective function?",
    shortAnswer: "The objective is what we want to optimize; constraints are limits we must respect.",
    explanation: "They are separate parts of the LP model with different purposes. The objective is the goal; constraints are the rules.",
    hint: "Goal vs. rules.",
    level: "basic"
  },
  {
    question: "Can a constraint be non-linear?",
    shortAnswer: "No, in LP all constraints must be linear. Non-linear constraints require non-linear programming.",
    explanation: "LP specifically requires linearity in both objective and constraints. Non-linearity changes the nature of the problem.",
    hint: "Only linear relationships are allowed in LP.",
    level: "moderate"
  },
  {
    question: "What is a 'binding' constraint?",
    shortAnswer: "A constraint that is satisfied with equality at the optimal solution (i.e., it is tight).",
    explanation: "Binding constraints limit the objective; they have a positive shadow price. Resources are fully used.",
    hint: "It's a constraint that 'hits the limit'.",
    level: "expert"
  },
  {
    question: "What is a 'slack' variable and how does it relate to constraints?",
    shortAnswer: "A slack variable is added to a ≤ constraint to convert it to equality; it represents unused resources.",
    explanation: "For example, 2x₁ + 3x₂ ≤ 120 becomes 2x₁ + 3x₂ + s = 120, s ≥ 0. Slack measures how much capacity is left over.",
    hint: "Slack = leftover capacity.",
    level: "expert"
  },
  {
    question: "What is a 'surplus' variable?",
    shortAnswer: "Used for ≥ constraints; it represents the amount by which the constraint is exceeded.",
    explanation: "e.g., 2x₁ + 3x₂ ≥ 50 becomes 2x₁ + 3x₂ - s = 50, s ≥ 0. Surplus measures excess over the minimum.",
    hint: "Surplus = excess over minimum.",
    level: "expert"
  },
  {
    question: "How do you handle a constraint that says 'exactly 100 units'?",
    shortAnswer: "Use an equality constraint: x₁ + x₂ = 100.",
    explanation: "It forces the sum to be exactly 100, no more or less. Used when a precise value is required.",
    hint: "Equality is exact.",
    level: "moderate"
  },
  {
    question: "Can a constraint have a negative RHS?",
    shortAnswer: "Yes, but it's unusual; it can be transformed by multiplying by -1 (which changes the inequality direction).",
    explanation: "In practice, RHS is usually non-negative representing resource availability. Negative RHS can be adjusted.",
    hint: "Multiply by -1 to fix negative RHS.",
    level: "expert"
  },
  {
    question: "What is a 'feasible solution' in terms of constraints?",
    shortAnswer: "A set of variable values that satisfies all constraints simultaneously.",
    explanation: "Feasible solutions lie within the feasible region. Any point inside or on the boundary is feasible.",
    hint: "All constraints are met.",
    level: "basic"
  },
  {
    question: "Why is it important to check constraint feasibility?",
    shortAnswer: "To ensure the model has at least one solution; otherwise, it's infeasible.",
    explanation: "If constraints are contradictory (e.g., x≥10 and x≤5), no solution exists. Feasibility must be checked.",
    hint: "Check if the constraints conflict.",
    level: "moderate"
  },
  {
    question: "What is the effect of adding a new constraint to an LP model?",
    shortAnswer: "It either shrinks the feasible region or leaves it unchanged; it cannot expand it.",
    explanation: "Adding a constraint restricts the solution space. More constraints = less flexibility.",
    hint: "More rules = less freedom.",
    level: "moderate"
  },
  {
    question: "How do you know if a constraint is redundant?",
    shortAnswer: "If removing it does not change the feasible region, it is redundant.",
    explanation: "Redundant constraints are often obvious or can be detected by checking if they are always satisfied.",
    hint: "It doesn't affect the shape.",
    level: "expert"
  },
  {
    question: "In a blending problem, what would a typical constraint be?",
    shortAnswer: "The total weight of the blend must be exactly 1000 kg: x₁ + x₂ + x₃ = 1000.",
    explanation: "Also constraints on composition (e.g., minimum fat content). Weight conservation is often an equality.",
    hint: "Weight conservation uses =.",
    level: "moderate"
  },
  {
    question: "What is a 'mixed' constraint?",
    shortAnswer: "A constraint that involves both ≤ and ≥ restrictions, but each is separate.",
    explanation: "LP constraints are independent; you can have multiple constraints with different directions.",
    hint: "Each constraint has one direction.",
    level: "basic"
  },
  {
    question: "How do you express a lower bound like 'at least 10 units'?",
    shortAnswer: "Use a ≥ constraint: x ≥ 10.",
    explanation: "This forces x to be at least 10. Can be written as -x ≤ -10 if needed.",
    hint: "≥ for minimum.",
    level: "basic"
  },
  {
    question: "What does a constraint with zero RHS mean?",
    shortAnswer: "It often represents a relationship like x₁ - x₂ = 0 (balance) or x₁ ≤ 0 (non-positivity).",
    explanation: "It's a strict restriction that forces certain relationships between variables.",
    hint: "Zero means no slack or a balance.",
    level: "expert"
  },
  {
    question: "How do you decide the sign of the constraint?",
    shortAnswer: "Based on the problem wording: 'at most' → ≤, 'at least' → ≥, 'exactly' → =.",
    explanation: "Interpret the language carefully. Each keyword signals a specific inequality direction.",
    hint: "Caps and floors.",
    level: "moderate"
  },
  {
    question: "Can constraints have coefficients that are fractions?",
    shortAnswer: "Yes, coefficients can be any real number, including fractions and decimals.",
    explanation: "It's often easier to work with integers; fractions can be multiplied through by a common denominator.",
    hint: "Fractions are allowed.",
    level: "basic"
  },
  {
    question: "What is the connection between constraints and the feasible region?",
    shortAnswer: "The feasible region is the intersection of all constraints; each constraint defines a half-space.",
    explanation: "The region is where all constraints are satisfied simultaneously.",
    hint: "Intersection of all rules.",
    level: "moderate"
  },
  {
    question: "What is a 'tight' constraint?",
    shortAnswer: "A constraint that is binding (satisfied with equality) at the optimal solution.",
    explanation: "It indicates that the resource is fully utilized or the requirement is just met.",
    hint: "Fully used resource.",
    level: "expert"
  },
  {
    question: "How can you simplify a constraint with all coefficients zero?",
    shortAnswer: "If all coefficients are zero, the constraint is either 0 ≤ b (always true) or 0 ≥ b (always false).",
    explanation: "If b ≥ 0, it's redundant; if b < 0, it's infeasible. Such constraints should be eliminated.",
    hint: "Check for trivial constraints.",
    level: "expert"
  },
  {
    question: "What is the role of constraints in sensitivity analysis?",
    shortAnswer: "They define which resources are valuable and how changes affect the optimal solution.",
    explanation: "Binding constraints indicate scarce resources; their shadow prices guide decisions.",
    hint: "They show what matters most.",
    level: "expert"
  }
];

export default questions;