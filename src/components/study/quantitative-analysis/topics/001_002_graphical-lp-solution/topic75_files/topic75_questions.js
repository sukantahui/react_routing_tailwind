const questions = [
  {
    question: "What happens when you shift a constraint line outward?",
    shortAnswer: "An outward shift (increasing RHS) expands the feasible region and can increase the optimal objective value.",
    explanation: "For ≤ constraints, increasing the RHS moves the constraint line outward, allowing more solutions. If the constraint is binding, the optimal Z increases at the rate of the shadow price.",
    hint: "Outward = expand = increase Z.",
    level: "intermediate",
    codeExample: "x + y ≤ 10 → x + y ≤ 12\nFeasible region expands\nZ may increase"
  },
  {
    question: "What happens when you shift a constraint line inward?",
    shortAnswer: "An inward shift (decreasing RHS) shrinks the feasible region and can decrease the optimal objective value.",
    explanation: "For ≤ constraints, decreasing the RHS moves the constraint line inward, reducing the feasible region. If the constraint is binding, the optimal Z decreases at the rate of the shadow price.",
    hint: "Inward = shrink = decrease Z.",
    level: "intermediate",
    codeExample: "x + y ≤ 10 → x + y ≤ 8\nFeasible region shrinks\nZ may decrease"
  },
  {
    question: "What is the difference between shifting and rotating a constraint?",
    shortAnswer: "Shifting moves a constraint line parallel to itself; rotating changes its slope by changing coefficients.",
    explanation: "Shifting changes the RHS (b value), moving the line parallel. Rotating changes the coefficients (a₁, a₂), changing the line's angle.",
    hint: "Shift = parallel move, Rotate = angle change.",
    level: "intermediate",
    codeExample: "Shift: x + y ≤ 10 → x + y ≤ 12\nRotate: x + y ≤ 10 → 2x + y ≤ 10"
  },
  {
    question: "How does shifting a binding constraint affect the optimal solution?",
    shortAnswer: "Shifting a binding constraint moves the optimal point along the other binding constraint(s).",
    explanation: "The optimal point remains at the intersection of binding constraints. When one constraint shifts, the intersection point moves along the other binding constraint(s).",
    hint: "Optimal point moves along other constraints.",
    level: "advanced",
    codeExample: "Constraint A shifts → Optimal point moves along Constraint B"
  },
  {
    question: "What is the shadow price of a shifted constraint?",
    shortAnswer: "The shadow price is the rate at which Z changes per unit of shift in the constraint.",
    explanation: "For binding constraints, the shadow price tells you how much Z increases (for maximization) when the constraint shifts outward by one unit.",
    hint: "ΔZ/ΔRHS = shadow price.",
    level: "intermediate",
    codeExample: "Shadow price = 2 → Each unit outward shift increases Z by 2"
  },
  {
    question: "How does shifting a non-binding constraint affect the solution?",
    shortAnswer: "Shifting a non-binding constraint has no effect on the optimal solution until it becomes binding.",
    explanation: "Non-binding constraints have slack. Shifts within the slack range don't affect the feasible region around the optimal point. The shadow price is zero.",
    hint: "No effect until binding.",
    level: "intermediate",
    codeExample: "Slack = 5 → Shift inward by 3 → No effect"
  },
  {
    question: "What determines the allowable range for constraint shifts?",
    shortAnswer: "The allowable range is determined by the intersection points of the constraint with other constraints.",
    explanation: "A constraint can shift until it intersects a different set of constraints. The allowable range is limited by the next constraint intersection point.",
    hint: "Range before basis changes.",
    level: "advanced",
    codeExample: "Constraint can shift until it hits the next constraint intersection"
  },
  {
    question: "Can shifting a constraint make a problem infeasible?",
    shortAnswer: "Yes, shifting a constraint inward too much can make the problem infeasible.",
    explanation: "If a constraint is shifted inward so much that it conflicts with other constraints, the feasible region becomes empty, and the problem becomes infeasible.",
    hint: "Too much inward shift = infeasible.",
    level: "intermediate",
    codeExample: "x + y ≤ 10 and x + y ≥ 8\nShift x + y ≤ 8 → Infeasible"
  },
  {
    question: "What is the difference between shifting a constraint and changing the objective?",
    shortAnswer: "Shifting a constraint changes the feasible region; changing the objective changes what is optimized.",
    explanation: "Constraint shifts affect which solutions are available. Objective changes affect which available solution is preferred.",
    hint: "Constraints = available options, Objective = preference.",
    level: "basic",
    codeExample: "Shift constraint → Different options available\nChange objective → Different option chosen"
  },
  {
    question: "How does shifting affect the feasible region?",
    shortAnswer: "Outward shifts expand the feasible region; inward shifts shrink it.",
    explanation: "The feasible region is the set of points satisfying all constraints. Moving a constraint line changes the boundary of this region.",
    hint: "Outward = bigger, Inward = smaller.",
    level: "basic",
    codeExample: "x + y ≤ 10 → Region below line\nx + y ≤ 12 → Region expands\nx + y ≤ 8 → Region shrinks"
  },
  {
    question: "What is the economic interpretation of shifting a constraint?",
    shortAnswer: "Shifting a constraint represents changes in resource availability or requirements.",
    explanation: "Outward shifts mean more resources available or less strict requirements. Inward shifts mean fewer resources or stricter requirements.",
    hint: "Resource availability changes.",
    level: "intermediate",
    codeExample: "Outward = More labor hours available\nInward = Less material available"
  },
  {
    question: "How do you find the new optimal point after a constraint shift?",
    shortAnswer: "Solve the new system of equations formed by the shifted constraint and the other binding constraints.",
    explanation: "The new optimal point is the intersection of the shifted constraint and the other binding constraints. Solve the system of equations to find the coordinates.",
    hint: "Solve new constraint system.",
    level: "advanced",
    codeExample: "New constraint: x + y = 12\nOther constraint: 2x + y = 16\nSolve: x = 4, y = 8"
  },
  {
    question: "Can shifting a constraint change which constraints are binding?",
    shortAnswer: "Yes, if the shift goes beyond the allowable range, a different set of constraints becomes binding.",
    explanation: "When a constraint shifts far enough, it may no longer be binding. Another constraint may become binding instead.",
    hint: "Basis changes with large shifts.",
    level: "advanced",
    codeExample: "Constraint A shifts → Constraint C becomes binding\nNew optimal corner formed by B and C"
  },
  {
    question: "What is the relationship between constraint shifts and slack?",
    shortAnswer: "Shifting a constraint changes the slack of that constraint at the optimal solution.",
    explanation: "Outward shifts increase slack (for non-binding constraints). Inward shifts decrease slack. Binding constraints always have zero slack.",
    hint: "Shift affects slack amount.",
    level: "intermediate",
    codeExample: "Outward shift → Slack increases\nInward shift → Slack decreases"
  },
  {
    question: "How do you determine if a constraint shift is beneficial?",
    shortAnswer: "A constraint shift is beneficial if the increase in Z exceeds the cost of the shift.",
    explanation: "Calculate ΔZ = Shadow Price × ΔRHS. Compare this to the cost of increasing the resource. If ΔZ > Cost, it's beneficial.",
    hint: "ΔZ > Cost → Beneficial.",
    level: "intermediate",
    codeExample: "Shadow price = 2, shift = 5 → ΔZ = 10\nCost = 7 → Beneficial"
  },
  {
    question: "What is the difference between shifting and relaxing a constraint?",
    shortAnswer: "Relaxing a constraint means making it less restrictive (outward shift for ≤ constraints).",
    explanation: "Relaxing is specifically an outward shift that expands the feasible region. Shifting can be either outward (relaxing) or inward (tightening).",
    hint: "Relax = outward shift only.",
    level: "basic",
    codeExample: "Relax: x + y ≤ 10 → x + y ≤ 12\nTighten: x + y ≤ 10 → x + y ≤ 8"
  },
  {
    question: "How does shifting a constraint affect the objective function value?",
    shortAnswer: "For binding constraints, shifting affects Z at the rate of the shadow price.",
    explanation: "ΔZ = Shadow Price × ΔRHS. For non-binding constraints, ΔZ = 0 until the constraint becomes binding.",
    hint: "ΔZ = Shadow Price × ΔRHS.",
    level: "intermediate",
    codeExample: "Shadow price = 1.5, ΔRHS = 4 → ΔZ = 6"
  },
  {
    question: "Can shifting a constraint create multiple optimal solutions?",
    shortAnswer: "Yes, if the shift makes the constraint parallel to the objective function.",
    explanation: "If a constraint is shifted to have the same slope as the objective function, multiple optimal solutions can exist along that constraint edge.",
    hint: "Parallel to objective = multiple optima.",
    level: "advanced",
    codeExample: "Constraint slope = objective slope\n→ Multiple optimal solutions"
  },
  {
    question: "What is the difference between shifting and deleting a constraint?",
    shortAnswer: "Deleting a constraint removes it entirely; shifting moves it but keeps it in the problem.",
    explanation: "Deleting a constraint can significantly change the feasible region. Shifting keeps the constraint but changes its position.",
    hint: "Delete = remove, Shift = move.",
    level: "intermediate",
    codeExample: "Delete: constraint removed completely\nShift: constraint moved but still present"
  },
  {
    question: "How do you interpret the shadow price of a constraint shift?",
    shortAnswer: "The shadow price tells you the maximum amount you should pay for additional resources.",
    explanation: "If you can acquire more of a resource at a cost less than the shadow price, it's profitable. The shadow price is the break-even price.",
    hint: "Maximum price for additional resources.",
    level: "intermediate",
    codeExample: "Shadow price = 2.50/hour\nDon't pay more than ₹2.50/hour for extra labor"
  }
];

export default questions;