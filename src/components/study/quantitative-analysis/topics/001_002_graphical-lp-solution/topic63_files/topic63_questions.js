const questions = [
  {
    question: "What is a binding constraint in linear programming?",
    shortAnswer: "A binding constraint is one where the optimal solution lies exactly on the constraint line, making it active in determining the solution.",
    explanation: "A binding constraint occurs when the left-hand side (LHS) equals the right-hand side (RHS) at the optimal point. This means the constraint is satisfied as an equality and the resource represented by the constraint is fully utilized.",
    hint: "Think of a constraint as a fence - binding means you're exactly on the fence line.",
    level: "basic",
    codeExample: "At optimal point (4, 3):\n2x + 3y = 2(4) + 3(3) = 17\nIf RHS = 17, it's binding"
  },
  {
    question: "How do you identify if a constraint is binding at the optimal solution?",
    shortAnswer: "Substitute the optimal point into each constraint and check if LHS = RHS.",
    explanation: "For each constraint in the problem, substitute the optimal x and y values. If the equality holds (LHS = RHS), the constraint is binding. If LHS < RHS (for ≤) or LHS > RHS (for ≥), it's non-binding with slack or surplus.",
    hint: "Calculate LHS - RHS for each constraint. Zero means binding.",
    level: "basic",
    codeExample: "Constraint: 3x + 2y ≤ 12\nOptimal point: (2, 3)\nLHS = 3(2) + 2(3) = 12\nLHS = RHS → Binding"
  },
  {
    question: "What is the difference between a binding and non-binding constraint?",
    shortAnswer: "Binding constraints have LHS = RHS at the optimal point, while non-binding constraints have slack (for ≤) or surplus (for ≥).",
    explanation: "Binding constraints are 'tight' - they're fully utilized at the optimal solution. Non-binding constraints have unused capacity (slack) or excess requirement (surplus). Binding constraints are the limiting factors that determine the optimal solution.",
    hint: "Binding = tight, non-binding = room to spare.",
    level: "basic",
    codeExample: "Binding: 2x + y = 10\nNon-binding: 2x + y < 10 (slack exists)"
  },
  {
    question: "Can non-negativity constraints be binding?",
    shortAnswer: "Yes, non-negativity constraints (x ≥ 0, y ≥ 0) can be binding if the optimal solution lies on an axis.",
    explanation: "When the optimal solution has x = 0 or y = 0, the corresponding non-negativity constraint is binding. This means the variable cannot be reduced further without violating the constraint, indicating it's optimal to set that variable to zero.",
    hint: "If the optimal point is on the x-axis or y-axis, non-negativity is binding.",
    level: "intermediate",
    codeExample: "Optimal point: (0, 5)\nConstraint x ≥ 0 is binding\nConstraint y ≥ 0 is non-binding (since y = 5 > 0)"
  },
  {
    question: "What is the significance of binding constraints in resource allocation?",
    shortAnswer: "Binding constraints represent fully utilized resources that limit the optimal solution.",
    explanation: "In resource allocation problems, binding constraints indicate scarce resources that are completely consumed. Increasing the availability of these resources would improve the objective function value. Non-binding constraints indicate resources with excess capacity.",
    hint: "Binding = bottlenecks that limit production.",
    level: "intermediate",
    codeExample: "Resource A: 2x + 3y ≤ 30\nAt (6, 6): 2(6) + 3(6) = 30 → Binding\nResource is fully utilized"
  },
  {
    question: "How do you calculate slack in a binding constraint?",
    shortAnswer: "For binding constraints, slack = 0 because LHS = RHS. For non-binding ≤ constraints, slack = RHS - LHS.",
    explanation: "Slack represents unused capacity. For binding constraints, slack is zero. For non-binding constraints, slack is positive and indicates how much of the resource remains unused at the optimal solution.",
    hint: "Slack = RHS - LHS. Zero for binding constraints.",
    level: "basic",
    codeExample: "Constraint: 2x + y ≤ 10\nAt (4, 2): LHS = 10\nSlack = 10 - 10 = 0 (binding)"
  },
  {
    question: "What is surplus in the context of binding constraints?",
    shortAnswer: "Surplus applies to ≥ constraints and represents excess over the requirement. For binding ≥ constraints, surplus = 0.",
    explanation: "For minimization problems with ≥ constraints, surplus = LHS - RHS. Binding constraints have surplus = 0. Non-binding constraints have positive surplus, indicating the requirement is exceeded.",
    hint: "Surplus = LHS - RHS for ≥ constraints.",
    level: "intermediate",
    codeExample: "Constraint: 3x + y ≥ 9\nAt (2, 3): LHS = 9\nSurplus = 9 - 9 = 0 (binding)"
  },
  {
    question: "Can a problem have multiple binding constraints at the optimal point?",
    shortAnswer: "Yes, especially when the optimal solution is at the intersection of two or more constraint lines.",
    explanation: "When the optimal point is a corner point, at least two constraints are binding (or one constraint and a non-negativity constraint). In some cases, three or more constraints can be binding if they all intersect at the same point.",
    hint: "A corner point is formed by the intersection of two or more constraint lines.",
    level: "intermediate",
    codeExample: "At point (3, 3):\nConstraint 1: x + y = 6 (binding)\nConstraint 2: 2x + y = 9 (binding)"
  },
  {
    question: "What happens to the objective function if a non-binding constraint becomes binding?",
    shortAnswer: "If a non-binding constraint becomes binding, the optimal solution and objective function value may change, usually by decreasing (for maximization) or increasing (for minimization).",
    explanation: "Making a non-binding constraint tighter (reducing RHS for ≤ or increasing RHS for ≥) could create a binding constraint and potentially reduce the feasible region, affecting the optimal solution.",
    hint: "Tightening constraints generally reduces the feasible region.",
    level: "advanced",
    codeExample: "If constraint 2x + y ≤ 15 becomes 2x + y ≤ 14\nAt (4, 6): LHS = 14, RHS = 14 → Now binding"
  },
  {
    question: "How do binding constraints relate to shadow prices?",
    shortAnswer: "Only binding constraints have non-zero shadow prices, representing the marginal value of relaxing the constraint.",
    explanation: "Shadow price (dual value) measures how much the objective function would improve if the RHS of a constraint were increased by one unit. For non-binding constraints, shadow price = 0 because there's already unused capacity.",
    hint: "Shadow price shows the value of additional resources.",
    level: "advanced",
    codeExample: "Binding constraint shadow price = change in Z / change in RHS\nNon-binding constraint shadow price = 0"
  },
  {
    question: "What is the difference between binding constraints in maximization vs minimization?",
    shortAnswer: "In maximization, binding ≤ constraints indicate scarce resources. In minimization, binding ≥ constraints indicate minimum requirements that are exactly met.",
    explanation: "In maximization problems, binding ≤ constraints show which resources are limiting. In minimization problems, binding ≥ constraints show which requirements are just barely met. Both types represent constraints that are 'active' at the optimum.",
    hint: "Maximization: binding = scarce resources.\nMinimization: binding = minimum requirements met.",
    level: "intermediate",
    codeExample: "Max: 2x + y ≤ 10 (binding at optimum)\nMin: 2x + y ≥ 10 (binding at optimum)"
  },
  {
    question: "Can a constraint be binding at one optimal solution and non-binding at another?",
    shortAnswer: "Yes, if there are multiple optimal solutions, constraints can be binding in some and non-binding in others.",
    explanation: "When there are multiple optimal solutions (alternate optima), a constraint might be binding at one optimal point but not at another. This happens when the objective function is parallel to a constraint line.",
    hint: "Multiple optima means the objective function is parallel to a constraint.",
    level: "advanced",
    codeExample: "Z = x + y\nConstraint: x + y ≤ 10\nAny point on x + y = 10 is binding for that constraint"
  },
  {
    question: "How do you check if a constraint is binding at a corner point?",
    shortAnswer: "Substitute the corner point coordinates into the constraint equation and check if the equality holds.",
    explanation: "A corner point is formed by the intersection of constraint lines. To check if a constraint is binding at that point, simply plug the coordinates into the constraint. If it satisfies the equality, it's binding.",
    hint: "At a corner point, at least two constraints are binding.",
    level: "intermediate",
    codeExample: "Corner point: (2, 3)\nConstraint: x + y = 5 → LHS = 5, RHS = 5 → Binding"
  },
  {
    question: "What is a degenerate optimal solution in terms of binding constraints?",
    shortAnswer: "A degenerate optimal solution occurs when more than two constraints are binding at the same corner point.",
    explanation: "Degeneracy happens when three or more constraint lines intersect at the same point, resulting in more than the minimum number of binding constraints. This can cause computational issues in the simplex method but is graphically identifiable.",
    hint: "More than two constraints binding at a corner point indicates degeneracy.",
    level: "advanced",
    codeExample: "Three constraints intersecting at (3, 3):\nx + y = 6, 2x + y = 9, x + 2y = 9"
  },
  {
    question: "How does changing a binding constraint affect the feasible region?",
    shortAnswer: "Changing a binding constraint (by altering its RHS) will shift the constraint line and typically change the shape and size of the feasible region.",
    explanation: "For a binding constraint, any change to its RHS will move the constraint line, altering the feasible region and potentially the optimal solution. The direction and magnitude of the change affect the objective function.",
    hint: "Binding constraints are sensitive to RHS changes.",
    level: "advanced",
    codeExample: "Constraint: 2x + y ≤ 10 → change to ≤ 12\nFeasible region expands, optimal solution may change"
  },
  {
    question: "What is the relationship between binding constraints and optimality?",
    shortAnswer: "The optimal solution is always determined by the intersection of binding constraints, which define the corner point where the objective function is optimized.",
    explanation: "At the optimal solution, the objective function reaches its best value at a corner point of the feasible region. This corner point is defined by the binding constraints that intersect there. The binding constraints collectively determine the optimal values of decision variables.",
    hint: "Optimal solution = intersection of binding constraints.",
    level: "advanced",
    codeExample: "Optimal at (4, 2):\nBinding constraints: 2x + y = 10, x + 2y = 8"
  },
  {
    question: "Can increasing the RHS of a non-binding constraint ever change the optimal solution?",
    shortAnswer: "No, increasing the RHS of a non-binding constraint (making it looser) cannot change the optimal solution because the constraint is already not limiting.",
    explanation: "If a constraint is non-binding at the optimal solution, there's already unused capacity (slack). Increasing the RHS further only adds more unused capacity and doesn't affect the feasible region around the optimal point.",
    hint: "Non-binding constraints don't limit the solution.",
    level: "intermediate",
    codeExample: "Non-binding: 3x + 2y ≤ 18\nAt (2, 4): LHS = 14, slack = 4\nIncreasing RHS to 20 → still non-binding"
  },
  {
    question: "What is the economic interpretation of binding constraints?",
    shortAnswer: "Binding constraints represent scarce resources or binding requirements that have economic value, as they limit the optimal solution.",
    explanation: "In economic terms, binding constraints are bottlenecks or limiting factors. The resources represented by binding constraints have positive shadow prices, indicating their economic value. Companies would be willing to pay for additional units of these resources.",
    hint: "Binding resources have economic value.",
    level: "advanced",
    codeExample: "Labor constraint binding at optimum → Additional labor hours have value"
  },
  {
    question: "How do you identify binding constraints in a graphical LP solution?",
    shortAnswer: "Visually, binding constraints are the constraint lines that pass through the optimal corner point on the graph.",
    explanation: "On a graph, the optimal solution is at a corner point of the feasible region. All constraint lines that intersect at that corner point are binding. Other constraint lines that are not passing through that point are non-binding.",
    hint: "Look at the graph - which lines meet at the optimal point?",
    level: "intermediate",
    codeExample: "Optimal point (4, 2) formed by:\nConstraint 1: 2x + y = 10\nConstraint 2: x + 2y = 8\nBoth are binding"
  },
  {
    question: "Can there be a problem with no binding constraints?",
    shortAnswer: "No, every bounded LP problem with an optimal solution must have at least one binding constraint.",
    explanation: "For an optimal solution to exist in a bounded feasible region, the objective function must be optimized at a corner point. A corner point is defined by the intersection of at least two constraint lines, meaning at least two constraints are binding (or one constraint and a non-negativity constraint).",
    hint: "A corner point requires at least two constraints to intersect.",
    level: "intermediate",
    codeExample: "In a 2-variable problem, at least one constraint is always binding at the optimum"
  },
  {
    question: "What happens to binding constraints in an unbounded LP problem?",
    shortAnswer: "In an unbounded problem, there may be no binding constraints if the objective function can improve indefinitely.",
    explanation: "When the feasible region is unbounded and the objective function can increase (or decrease) without bound, there may be no binding constraint limiting the solution. This indicates the LP problem is unbounded and has no finite optimal solution.",
    hint: "No binding constraints = no finite optimal solution.",
    level: "advanced",
    codeExample: "Maximize Z = x + y\nConstraints: x, y ≥ 0\nNo upper bound constraints → Unbounded"
  },
  {
    question: "How do you calculate the exact amount of slack in a non-binding constraint?",
    shortAnswer: "Slack = RHS - LHS, where LHS is evaluated at the optimal point. The result is the unused capacity in units of the constraint's resource.",
    explanation: "For a ≤ constraint that is non-binding, slack is the difference between the available resource (RHS) and what's actually used (LHS). This represents surplus capacity that can be used elsewhere.",
    hint: "Slack tells you how much of the resource is left unused.",
    level: "basic",
    codeExample: "Constraint: 2x + y ≤ 15\nAt (4, 3): LHS = 11\nSlack = 15 - 11 = 4 units"
  },
  {
    question: "What is the significance of binding constraints in sensitivity analysis?",
    shortAnswer: "Binding constraints are the focus of sensitivity analysis because they indicate where small changes can affect the optimal solution.",
    explanation: "Sensitivity analysis examines how changes in model parameters affect the optimal solution. Only binding constraints are sensitive to changes in their RHS values. Non-binding constraints can tolerate changes without affecting the solution.",
    hint: "Binding constraints = where to focus sensitivity analysis.",
    level: "advanced",
    codeExample: "Analyzing how much RHS of a binding constraint can change before optimal solution changes"
  },
  {
    question: "Can a binding constraint become non-binding after solving a problem?",
    shortAnswer: "No, once a solution is optimal, the status (binding/non-binding) is fixed for that specific optimal solution.",
    explanation: "The status of each constraint is determined at the specific optimal point. However, if the problem changes or if you find a different optimal point (in case of multiple optima), constraints may have different statuses.",
    hint: "Status is fixed for a given optimal solution.",
    level: "intermediate",
    codeExample: "At optimal point (3, 4), constraint x + y = 7 is binding\nAt another optimal point (4, 3), same constraint might be binding"
  },
  {
    question: "How do binding constraints relate to the concept of duality?",
    shortAnswer: "Binding constraints correspond to dual variables (shadow prices) that are positive, representing the value of relaxing the constraint.",
    explanation: "In the dual problem, each primal constraint has a corresponding dual variable. For binding constraints, the dual variable is non-zero and represents the marginal value of the constraint. Non-binding constraints have zero dual variables.",
    hint: "Dual variables = shadow prices of binding constraints.",
    level: "advanced",
    codeExample: "Primal binding constraint → Dual variable > 0\nPrimal non-binding constraint → Dual variable = 0"
  },
  {
    question: "What is the difference between a binding constraint and a redundant constraint?",
    shortAnswer: "Binding constraints limit the optimal solution, while redundant constraints do not affect the feasible region or optimal solution.",
    explanation: "Binding constraints are active at the optimal point. Redundant constraints are always satisfied and don't affect the feasible region at all. A constraint can be non-binding but not redundant if it defines a boundary of the feasible region elsewhere.",
    hint: "Binding = active at optimum. Redundant = never active.",
    level: "intermediate",
    codeExample: "Binding: x + y ≤ 10 (optimal point on this line)\nRedundant: 2x + y ≤ 100 (always true)"
  },
  {
    question: "How do you find binding constraints when the optimal solution is not a corner point?",
    shortAnswer: "In linear programming, the optimal solution is always at a corner point for bounded problems with linear constraints, so binding constraints are found at that corner point.",
    explanation: "The Fundamental Theorem of Linear Programming states that if an optimal solution exists, there is an optimal solution at a corner point (extreme point) of the feasible region. Thus, optimal solutions are always at corner points where binding constraints intersect.",
    hint: "Linear programming optima always occur at corner points.",
    level: "intermediate",
    codeExample: "For any feasible LP problem, check the corner points for optimality"
  },
  {
    question: "What is the graphical interpretation of a binding constraint?",
    shortAnswer: "Graphically, a binding constraint is a constraint line that passes through the optimal corner point of the feasible region.",
    explanation: "On a graph, the feasible region is bounded by constraint lines. The optimal solution is at one of the corner points (vertices) of this region. Any constraint line that forms this corner point is binding at the optimal solution.",
    hint: "Binding constraints are the lines that 'touch' the optimal point.",
    level: "basic",
    codeExample: "Optimal point (4, 2) is formed by intersection of:\nConstraint 1: 2x + y = 10\nConstraint 2: x + 2y = 8"
  },
  {
    question: "Can all constraints be binding at an optimal solution?",
    shortAnswer: "Yes, in some cases, all constraints can be binding if the feasible region is a single point (feasible region degenerates to a point).",
    explanation: "When the feasible region is reduced to a single point, all constraints that define that point are binding. This is a degenerate case where the entire feasible region is just one corner point.",
    hint: "A single-point feasible region means all constraints are binding.",
    level: "advanced",
    codeExample: "Constraints:\nx + y = 5, 2x + y = 7, x + 2y = 8\nOnly (3, 2) satisfies all → all constraints binding"
  },
  {
    question: "How do binding constraints affect the computational effort in solving LP problems?",
    shortAnswer: "Binding constraints reduce computational effort by narrowing down the search space to key corner points where the optimum lies.",
    explanation: "In the simplex method, finding binding constraints helps identify the optimal basis. The method moves from one corner point to another, with the optimal solution being at the intersection of binding constraints. Fewer binding constraints generally means more efficient computation.",
    hint: "Binding constraints guide the search for the optimal solution.",
    level: "advanced",
    codeExample: "Simplex method: focus on binding constraints at each iteration"
  }
];

export default questions;