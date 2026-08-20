const questions = [
  {
    question: "What happens when you increase a binding constraint's RHS?",
    shortAnswer: "Increasing a binding constraint's RHS moves the constraint outward, increasing Z by the shadow price times the increase.",
    explanation: "When a binding constraint is relaxed (RHS increased), the feasible region expands. The optimal solution moves along the other binding constraint, and Z increases at the rate of the shadow price.",
    hint: "ΔZ = Shadow Price × ΔRHS.",
    level: "intermediate",
    codeExample: "If shadow price = 2 and RHS increases by 5\nΔZ = 2 × 5 = 10"
  },
  {
    question: "What happens when you decrease a binding constraint's RHS?",
    shortAnswer: "Decreasing a binding constraint's RHS moves the constraint inward, decreasing Z by the shadow price times the decrease.",
    explanation: "When a binding constraint is tightened (RHS decreased), the feasible region shrinks. The optimal solution moves along the other binding constraint, and Z decreases at the rate of the shadow price.",
    hint: "ΔZ = Shadow Price × ΔRHS (negative).",
    level: "intermediate",
    codeExample: "If shadow price = 1.5 and RHS decreases by 3\nΔZ = -1.5 × 3 = -4.5"
  },
  {
    question: "What happens when you change a non-binding constraint's RHS?",
    shortAnswer: "Changing a non-binding constraint's RHS has no effect on the optimal solution until it becomes binding.",
    explanation: "Non-binding constraints have slack. Changes within the slack range don't affect the feasible region around the optimal point. The shadow price is zero.",
    hint: "No effect until it becomes binding.",
    level: "intermediate",
    codeExample: "Slack = 5 units\nReducing RHS by 3 units → No effect (still slack)"
  },
  {
    question: "What is the allowable range for RHS changes?",
    shortAnswer: "The allowable range is the range of RHS values where the current optimal basis remains optimal.",
    explanation: "Within this range, the shadow price is valid and the same constraints remain binding. Outside this range, a different constraint becomes binding.",
    hint: "Range where basis stays the same.",
    level: "advanced",
    codeExample: "RHS ∈ [b - decrease, b + increase]\nBasis remains optimal"
  },
  {
    question: "How do you calculate the new optimal point when RHS changes?",
    shortAnswer: "The new optimal point moves along the other binding constraint, determined by solving the new system of equations.",
    explanation: "To find the new optimal point: 1) Keep the other binding constraint(s) unchanged. 2) Substitute the new RHS. 3) Solve the system of equations.",
    hint: "Solve new constraint with unchanged binding constraints.",
    level: "advanced",
    codeExample: "Original: x + y = 10, 2x + y = 16\nNew: x + y = 12, 2x + y = 16\nSolve: x = 4, y = 8"
  },
  {
    question: "What is the relationship between shadow price and resource value?",
    shortAnswer: "Shadow price is the marginal value of the resource - how much Z increases per unit of the resource.",
    explanation: "A higher shadow price means the resource is more valuable. Resources with high shadow prices are bottlenecks that limit profitability.",
    hint: "High shadow price = valuable resource.",
    level: "intermediate",
    codeExample: "Shadow price ₹2.50/hour → Each additional hour adds ₹2.50 to profit"
  },
  {
    question: "Can a shadow price be negative?",
    shortAnswer: "Yes, shadow prices can be negative, especially in minimization problems or for certain types of constraints.",
    explanation: "In minimization problems, increasing a constraint's RHS might increase the objective (cost), giving a positive shadow price. Negative shadow prices indicate that increasing the RHS would make the objective worse.",
    hint: "Negative shadow prices are possible.",
    level: "advanced",
    codeExample: "Minimization: shadow price = -2 means increasing RHS increases cost"
  },
  {
    question: "What happens when RHS changes exceed the allowable range?",
    shortAnswer: "When RHS changes exceed the allowable range, the optimal basis changes - a different constraint becomes binding.",
    explanation: "Beyond the allowable range, the shadow price is no longer valid. The optimal solution may shift to a different corner point formed by different constraints.",
    hint: "New constraints become binding.",
    level: "advanced",
    codeExample: "RHS = 25 (beyond range)\n→ Different constraints bind at optimal"
  },
  {
    question: "How do you determine if a constraint change is profitable?",
    shortAnswer: "Compare the shadow price to the cost of acquiring additional resources.",
    explanation: "If the shadow price exceeds the cost of obtaining more of the resource, it's profitable to acquire more. If the cost exceeds the shadow price, it's not worth it.",
    hint: "Shadow price > Cost → Profitable.",
    level: "intermediate",
    codeExample: "Shadow price = ₹2.50/unit\nCost = ₹1.80/unit\n→ Profitable to buy more"
  },
  {
    question: "What is the difference between increasing and decreasing a constraint?",
    shortAnswer: "Increasing a constraint moves it outward (relaxes), while decreasing it moves it inward (tightens).",
    explanation: "Increasing RHS for a ≤ constraint makes it less restrictive. Decreasing RHS makes it more restrictive. The effect on Z is opposite: increasing improves Z, decreasing reduces Z.",
    hint: "Outward = relax, Inward = tighten.",
    level: "basic",
    codeExample: "Increase RHS: Z increases (if maximization)\nDecrease RHS: Z decreases"
  },
  {
    question: "How does changing a constraint affect the feasible region?",
    shortAnswer: "Changing a constraint's RHS shifts the constraint line, expanding or shrinking the feasible region.",
    explanation: "Increasing RHS expands the feasible region (more solutions become feasible). Decreasing RHS shrinks the feasible region (fewer solutions are feasible).",
    hint: "RHS increase = region expands, RHS decrease = region shrinks.",
    level: "intermediate",
    codeExample: "x + y ≤ 10 → Region below line\nx + y ≤ 12 → Region expands\nx + y ≤ 8 → Region shrinks"
  },
  {
    question: "What is the shadow price of a non-binding constraint?",
    shortAnswer: "The shadow price of a non-binding constraint is zero.",
    explanation: "Since there's already slack (unused capacity), having more of that resource doesn't improve the objective. The constraint is not limiting the solution.",
    hint: "Non-binding = zero shadow price.",
    level: "basic",
    codeExample: "Slack > 0 → Shadow price = 0\nIncreasing RHS doesn't change Z"
  },
  {
    question: "How do you find the allowable increase and decrease for RHS?",
    shortAnswer: "The allowable increase/decrease is determined by the intersection points of the constraint with other constraints.",
    explanation: "Graphically, find how far the constraint line can move before it intersects a different set of constraints. Algebraically, use the simplex method to find the range.",
    hint: "Movement before basis changes.",
    level: "advanced",
    codeExample: "Allowable increase = distance to next constraint intersection\nAllowable decrease = distance to previous intersection"
  },
  {
    question: "What is the economic interpretation of shadow prices?",
    shortAnswer: "Shadow prices represent the maximum amount a company should pay for additional units of a resource.",
    explanation: "If a company can acquire more of a scarce resource at a cost less than the shadow price, it's profitable. The shadow price is the break-even price for additional resources.",
    hint: "Maximum price to pay for resources.",
    level: "intermediate",
    codeExample: "Shadow price = ₹2.50/hour\nDon't pay more than ₹2.50/hour for extra labor"
  },
  {
    question: "Can changing a constraint affect the objective function coefficients?",
    shortAnswer: "No, changing constraints only affects the feasible region, not the objective function itself.",
    explanation: "The objective function coefficients (c₁, c₂) are independent of the constraints. Changing constraints changes which feasible points are available, but not how Z is calculated.",
    hint: "Constraints don't change objective coefficients.",
    level: "basic",
    codeExample: "Objective: Z = 3x + 2y (unchanged)\nConstraint changes: x + y ≤ 10 → x + y ≤ 12"
  },
  {
    question: "What happens to slack when a binding constraint is relaxed?",
    shortAnswer: "When a binding constraint is relaxed, slack remains zero for that constraint (it's still binding).",
    explanation: "The constraint remains binding after relaxation. The optimal point moves along the other binding constraint, and the relaxed constraint remains binding at the new optimal point.",
    hint: "Slack stays zero for relaxed binding constraint.",
    level: "intermediate",
    codeExample: "Constraint: x + y = 10 (binding)\nRelax to: x + y = 12\nNew optimal: x + y = 12 (still binding)"
  },
  {
    question: "What is the relationship between shadow prices and dual variables?",
    shortAnswer: "Shadow prices are the optimal values of the dual variables in the dual LP problem.",
    explanation: "In LP duality, each primal constraint has a corresponding dual variable. The optimal value of this dual variable equals the shadow price of the primal constraint.",
    hint: "Shadow price = dual variable value.",
    level: "advanced",
    codeExample: "Primal: Max Z = cᵀx, Ax ≤ b, x ≥ 0\nDual: Min W = bᵀy, Aᵀy ≥ c, y ≥ 0\nShadow prices = optimal y values"
  },
  {
    question: "How do multiple simultaneous RHS changes affect the solution?",
    shortAnswer: "Multiple simultaneous changes require using the 100% rule or re-solving the problem.",
    explanation: "The 100% rule states that if the sum of percentage changes of multiple RHS values is ≤ 100%, the optimal basis remains unchanged. Otherwise, the problem must be re-solved.",
    hint: "100% rule for multiple changes.",
    level: "advanced",
    codeExample: "Δb₁/Allowable₁ + Δb₂/Allowable₂ ≤ 1\n→ Basis remains optimal"
  },
  {
    question: "What is the difference between a binding and a non-binding constraint in resource changes?",
    shortAnswer: "Binding constraints have positive shadow prices and affect the optimal solution; non-binding constraints have zero shadow prices and don't affect it.",
    explanation: "Changes to binding constraints affect Z. Changes to non-binding constraints only matter when the change is large enough to make the constraint binding.",
    hint: "Binding = affects solution, Non-binding = no effect.",
    level: "basic",
    codeExample: "Binding: shadow price > 0\nNon-binding: shadow price = 0"
  },
  {
    question: "How do you interpret a shadow price of 0?",
    shortAnswer: "A shadow price of 0 means the resource is not scarce and has no marginal value.",
    explanation: "The resource has slack, so having more of it doesn't help. The objective is limited by other constraints. Additional units of this resource would go unused.",
    hint: "Zero shadow price = abundant resource.",
    level: "intermediate",
    codeExample: "Shadow price = 0 → Don't pay for extra units\nResource is not limiting"
  }
];

export default questions;