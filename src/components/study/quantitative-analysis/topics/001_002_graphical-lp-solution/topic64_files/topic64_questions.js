const questions = [
  {
    question: "What is slack in a linear programming constraint?",
    shortAnswer: "Slack is the unused capacity in a ≤ constraint, calculated as RHS - LHS at the optimal solution.",
    explanation: "Slack represents the amount of a resource that remains unused at the optimal solution. It is always non-negative for feasible solutions and indicates the 'gap' between available and used resources.",
    hint: "Think of slack as 'spare capacity' in a resource.",
    level: "basic",
    codeExample: "Constraint: 3x + 2y ≤ 18\nAt (2, 4): LHS = 14, RHS = 18\nSlack = 18 - 14 = 4 units"
  },
  {
    question: "How do you calculate slack?",
    shortAnswer: "For a ≤ constraint a₁x + a₂y ≤ b, slack = b - (a₁x* + a₂y*) where (x*, y*) is the optimal solution.",
    explanation: "To calculate slack: 1) Find the optimal solution (x*, y*), 2) Substitute these values into the LHS, 3) Subtract LHS from RHS. The result is the slack value.",
    hint: "Slack = RHS - LHS at the optimal point.",
    level: "basic",
    codeExample: "Constraint: 2x + y ≤ 10\nOptimal point: (3, 4)\nLHS = 2(3) + 4 = 10\nSlack = 10 - 10 = 0"
  },
  {
    question: "What is the difference between slack and surplus?",
    shortAnswer: "Slack applies to ≤ constraints (unused resource), while surplus applies to ≥ constraints (excess above requirement).",
    explanation: "Slack is the difference between the RHS and LHS of a ≤ constraint. Surplus is the difference between LHS and RHS of a ≥ constraint. Both represent the 'gap' but in opposite directions.",
    hint: "Slack for ≤, surplus for ≥.",
    level: "basic",
    codeExample: "Slack: 3x + 2y ≤ 18, slack = 18 - LHS\nSurplus: 3x + 2y ≥ 18, surplus = LHS - 18"
  },
  {
    question: "What does it mean when slack = 0?",
    shortAnswer: "Slack = 0 means the constraint is binding, indicating the resource is fully utilized at the optimal solution.",
    explanation: "When slack = 0, the optimal point lies exactly on the constraint line. This means the resource represented by the constraint is completely used up, with no unused capacity.",
    hint: "Zero slack = fully utilized resource.",
    level: "basic",
    codeExample: "Constraint: 2x + y ≤ 10\nAt (3, 4): LHS = 10, RHS = 10\nSlack = 0 → Binding constraint"
  },
  {
    question: "Can slack be negative?",
    shortAnswer: "No, slack is always non-negative (≥ 0) for feasible solutions to the LP problem.",
    explanation: "If slack is negative, it means the point does not satisfy the constraint (infeasible). All feasible points satisfy LHS ≤ RHS, so slack = RHS - LHS ≥ 0.",
    hint: "Negative slack indicates an infeasible point.",
    level: "intermediate",
    codeExample: "Constraint: 2x + y ≤ 10\nPoint (5, 5): LHS = 15\nSlack = 10 - 15 = -5 (infeasible)"
  },
  {
    question: "What is the economic interpretation of slack?",
    shortAnswer: "Slack represents unused resources that could potentially be allocated elsewhere without affecting the current optimal solution.",
    explanation: "In economic terms, slack indicates excess capacity or idle resources. Resources with slack have zero shadow price - increasing their availability doesn't improve the objective function since they're not limiting.",
    hint: "Slack = idle capacity with no economic value.",
    level: "intermediate",
    codeExample: "Resource with slack: Additional units have no value\nResource with zero slack: Additional units have positive value"
  },
  {
    question: "How does slack relate to shadow prices?",
    shortAnswer: "Constraints with positive slack have zero shadow price, while constraints with zero slack (binding) may have positive shadow prices.",
    explanation: "Shadow price measures the marginal value of a resource. If there's slack (unused resource), its shadow price is zero because more of it wouldn't help. Only binding constraints (zero slack) can have positive shadow prices.",
    hint: "No slack = possible positive shadow price.",
    level: "advanced",
    codeExample: "Slack > 0 → Shadow price = 0\nSlack = 0 → Shadow price ≥ 0"
  },
  {
    question: "What is the difference between slack in maximization and minimization problems?",
    shortAnswer: "Slack is calculated the same way (RHS - LHS for ≤ constraints) in both types, but its interpretation differs based on the problem context.",
    explanation: "In maximization, slack represents unused resources. In minimization with ≥ constraints, we calculate surplus instead of slack. Both indicate the gap between what's available/required and what's actually used.",
    hint: "The calculation method is the same, interpretation depends on context.",
    level: "intermediate",
    codeExample: "Maximization: Slack = unused resource\nMinimization: Surplus = excess over requirement"
  },
  {
    question: "How do you find slack graphically?",
    shortAnswer: "Graphically, slack is the distance from the optimal point to the constraint line, measured along a line perpendicular to the constraint.",
    explanation: "On a graph, if the optimal point is not on a constraint line, the distance to that line represents slack. The closer the point is to the line, the smaller the slack. If the point is on the line, slack = 0.",
    hint: "Slack is visible as the 'gap' between the point and the constraint line.",
    level: "intermediate",
    codeExample: "Constraint: 2x + y = 10\nOptimal point (3, 3): Not on line → Has slack\nOptimal point (4, 2): On line → Zero slack"
  },
  {
    question: "What happens to slack when the RHS of a constraint increases?",
    shortAnswer: "When RHS increases, slack increases (or stays the same) for that constraint, making it less likely to be binding.",
    explanation: "Increasing the RHS of a ≤ constraint makes the constraint looser, increasing slack. This can only improve the objective function value (or keep it the same) and might change which constraints are binding.",
    hint: "More RHS = more slack = less restrictive.",
    level: "advanced",
    codeExample: "Constraint: 2x + y ≤ 10 → Slack = 2\nChange to: 2x + y ≤ 12 → Slack = 4"
  },
  {
    question: "What is the relationship between slack and feasibility?",
    shortAnswer: "Slack ≥ 0 is a condition for feasibility. If all constraints have non-negative slack, the point is feasible.",
    explanation: "For a point to be feasible, all ≤ constraints must have slack ≥ 0 (LHS ≤ RHS). Similarly, all ≥ constraints must have surplus ≥ 0 (LHS ≥ RHS). If any slack is negative, the point is infeasible.",
    hint: "Non-negative slack for all constraints = feasible.",
    level: "intermediate",
    codeExample: "All constraints:\nConstraint 1: slack = 3 ≥ 0 ✓\nConstraint 2: slack = 1 ≥ 0 ✓\n→ Point is feasible"
  },
  {
    question: "How do you interpret slack in resource allocation problems?",
    shortAnswer: "Slack indicates how much of each resource remains unused at the optimal production plan.",
    explanation: "In production planning, slack tells managers which resources are bottlenecks (zero slack) and which have excess capacity (positive slack). This information helps in making decisions about resource allocation and capacity expansion.",
    hint: "Zero slack = bottleneck resource.",
    level: "intermediate",
    codeExample: "Labor: slack = 0 (bottleneck)\nMachine: slack = 5 hours (excess capacity)\n→ Expand labor first"
  },
  {
    question: "Can a constraint have slack in one optimal solution and be binding in another?",
    shortAnswer: "Yes, in cases with multiple optimal solutions, the same constraint might be binding at one optimal point and non-binding at another.",
    explanation: "When there are multiple optimal solutions (alternate optima), the objective function is parallel to a constraint. At different points along this edge, different constraints may be binding.",
    hint: "Multiple optima = variable binding status.",
    level: "advanced",
    codeExample: "Same constraint:\nAt optimal point A: slack = 0\nAt optimal point B: slack > 0"
  },
  {
    question: "What is the unit of measurement for slack?",
    shortAnswer: "Slack is measured in the same units as the RHS of the constraint.",
    explanation: "If a constraint represents hours of labor, slack is measured in hours. If it represents units of material, slack is measured in units. The units of slack always match the resource units in the constraint.",
    hint: "Slack shares units with the constraint's RHS.",
    level: "basic",
    codeExample: "Constraint: 2x + 3y ≤ 100 hours\nSlack = 20 hours (unused labor hours)"
  },
  {
    question: "How does slack affect the optimal solution?",
    shortAnswer: "Slack doesn't affect the optimal solution itself, but it provides valuable information about resource utilization and potential improvements.",
    explanation: "The optimal solution is determined by binding constraints (zero slack). Slack values tell us which resources are not limiting and could potentially be reduced without affecting the optimum.",
    hint: "Slack informs about unused capacity.",
    level: "intermediate",
    codeExample: "If slack > 0, reducing that resource won't affect Z\nIf slack = 0, reducing that resource will affect Z"
  },
  {
    question: "What is the concept of 'slack variables' in LP?",
    shortAnswer: "Slack variables are artificial variables added to convert ≤ constraints into equalities, representing unused capacity.",
    explanation: "In the simplex method, we add non-negative slack variables to each ≤ constraint to convert it to an equation. The value of the slack variable at the optimal solution equals the slack calculated as RHS - LHS.",
    hint: "Slack variables are part of the simplex method.",
    level: "advanced",
    codeExample: "2x + y ≤ 10 → 2x + y + s = 10\nwhere s = slack variable"
  },
  {
    question: "What is the relationship between slack and KKT conditions?",
    shortAnswer: "In KKT conditions, slack is represented by complementary slackness, where the product of the slack and the corresponding multiplier must be zero.",
    explanation: "The complementary slackness condition states that at optimality, for each constraint, either the slack/surplus is zero or the corresponding dual variable is zero. This is a fundamental optimality condition.",
    hint: "Complementary slackness: either slack = 0 or dual = 0.",
    level: "advanced",
    codeExample: "If slack > 0, dual variable = 0\nIf slack = 0, dual variable can be ≥ 0"
  },
  {
    question: "How do you check if a constraint is binding using slack?",
    shortAnswer: "A constraint is binding if its slack equals 0 at the optimal solution.",
    explanation: "Since slack = RHS - LHS, when slack = 0, we have LHS = RHS, meaning the optimal point lies exactly on the constraint line. This is the definition of a binding constraint.",
    hint: "Zero slack = binding constraint.",
    level: "basic",
    codeExample: "Constraint: 3x + 2y ≤ 18\nAt optimal point (4, 3): slack = 18 - (12+6) = 0 → Binding"
  },
  {
    question: "What is the difference between slack and unused capacity?",
    shortAnswer: "They are the same concept - slack is the mathematical measure of unused capacity in a constraint.",
    explanation: "Slack quantifies unused capacity. When a constraint has slack > 0, it means the resource is not fully utilized. The slack value tells us exactly how much of the resource remains unused.",
    hint: "Slack = unused capacity in resource units.",
    level: "basic",
    codeExample: "Slack = 5 units → 5 units of resource remain unused"
  },
  {
    question: "Can slack values change if the objective function changes?",
    shortAnswer: "Yes, changing the objective function coefficients can lead to a different optimal point, which will result in different slack values.",
    explanation: "If the objective function changes, the optimal solution (where it's optimized) may change. This new optimal point will have its own set of slack values for each constraint.",
    hint: "Different objective function = different optimal point = different slack.",
    level: "advanced",
    codeExample: "Original Z = 5x + 3y → opt at (4, 2), slack values\nNew Z = 6x + 3y → opt may change, slack changes"
  },
  {
    question: "What is the significance of slack in sensitivity analysis?",
    shortAnswer: "Slack indicates which constraints are active and thus which RHS changes will affect the optimal solution.",
    explanation: "In sensitivity analysis, constraints with zero slack (binding) are sensitive to RHS changes. Constraints with positive slack can tolerate RHS changes without affecting the optimal solution.",
    hint: "Zero slack = sensitive to change.",
    level: "advanced",
    codeExample: "Binding constraint: RHS change affects Z\nNon-binding constraint: RHS change doesn't affect Z"
  },
  {
    question: "How do you calculate slack for multiple constraints?",
    shortAnswer: "Calculate slack individually for each ≤ constraint by substituting the optimal point and computing RHS - LHS for each.",
    explanation: "For each constraint in the problem, evaluate the LHS at the optimal point and subtract from the RHS. Each constraint will have its own slack value, which may differ based on resource utilization.",
    hint: "Each constraint gets its own slack calculation.",
    level: "intermediate",
    codeExample: "Constraint 1: slack₁ = RHS₁ - LHS₁\nConstraint 2: slack₂ = RHS₂ - LHS₂"
  },
  {
    question: "What does a large slack value indicate?",
    shortAnswer: "A large slack value indicates significant unused capacity in that resource, meaning the constraint is far from being binding.",
    explanation: "When slack is large, the optimal point is far from the constraint line. This resource is abundant and doesn't limit the solution at all. Increasing or decreasing it within the slack range won't affect the optimum.",
    hint: "Large slack = abundant resource.",
    level: "intermediate",
    codeExample: "Slack = 50 units → Resource is plentiful\nNo need to increase this resource"
  },
  {
    question: "What does a very small positive slack indicate?",
    shortAnswer: "A small positive slack indicates the constraint is close to being binding, with minimal unused capacity.",
    explanation: "When slack is small but positive, the resource is almost fully utilized. Small changes in the optimal solution or constraint RHS could make this constraint binding.",
    hint: "Small slack = near binding.",
    level: "intermediate",
    codeExample: "Slack = 0.5 units → Almost fully utilized\nSlight changes could make it binding"
  },
  {
    question: "How do you handle slack in minimization problems?",
    shortAnswer: "In minimization problems, slack for ≤ constraints is calculated the same way, but surplus is calculated for ≥ constraints.",
    explanation: "Minimization problems often have ≥ constraints. For these, we calculate surplus = LHS - RHS. For any ≤ constraints, we still calculate slack = RHS - LHS.",
    hint: "Minimization uses both slack and surplus.",
    level: "intermediate",
    codeExample: "Minimize Z subject to:\n≥ constraints: surplus = LHS - RHS\n≤ constraints: slack = RHS - LHS"
  },
  {
    question: "What is the connection between slack and degeneracy?",
    shortAnswer: "Degeneracy occurs when more constraints than necessary are binding, meaning some binding constraints have zero slack but may not be essential.",
    explanation: "In a degenerate solution, the number of binding constraints exceeds the number of variables. This can cause the simplex method to cycle and can make sensitivity analysis more complex.",
    hint: "Extra binding constraints = degeneracy.",
    level: "advanced",
    codeExample: "2 variables, 3 binding constraints → Degenerate solution\nAll have slack = 0"
  },
  {
    question: "How do you express slack in standard form?",
    shortAnswer: "Slack variables are added to convert ≤ constraints to equalities in the standard form of LP.",
    explanation: "Standard form requires all constraints to be equalities. For each ≤ constraint a₁x + a₂y ≤ b, we add a slack variable s ≥ 0 to get a₁x + a₂y + s = b. The value of s at optimality is the slack.",
    hint: "Slack variables make constraints into equalities.",
    level: "advanced",
    codeExample: "2x + y ≤ 10 → 2x + y + s = 10\ns ≥ 0 (slack variable)"
  },
  {
    question: "What is complementary slackness?",
    shortAnswer: "Complementary slackness states that at optimality, for each constraint, either the slack/surplus is zero or the corresponding dual variable is zero.",
    explanation: "This is a key optimality condition in LP. It means that if a resource is not fully used (positive slack), its shadow price (dual variable) is zero. And if the shadow price is positive, the resource must be fully used (zero slack).",
    hint: "Slack and dual can't both be positive.",
    level: "advanced",
    codeExample: "If slack > 0, then dual = 0\nIf dual > 0, then slack = 0"
  },
  {
    question: "How does slack relate to the objective function value?",
    shortAnswer: "Slack doesn't directly determine the objective function value, but constraints with zero slack (binding) often limit it.",
    explanation: "The objective function value is determined by the optimal point. Slack tells us how close the optimal point is to each constraint, but doesn't determine Z directly. However, binding constraints (zero slack) are the ones that limit Z.",
    hint: "Zero slack constraints limit the objective function.",
    level: "intermediate",
    codeExample: "Binding constraint limits Z\nNon-binding constraint doesn't limit Z"
  },
  {
    question: "What happens to slack in an unbounded LP problem?",
    shortAnswer: "In an unbounded LP problem, some slack values may become infinite as the solution goes to infinity.",
    explanation: "If the problem is unbounded, the objective function can improve indefinitely. This means some constraints have unbounded slack, and the concept of finite slack no longer applies meaningfully.",
    hint: "Unbounded = infinite slack in some constraints.",
    level: "advanced",
    codeExample: "Maximize Z = x + y\nConstraints: x, y ≥ 0\nSlack can go to infinity as x and y increase"
  }
];

export default questions;