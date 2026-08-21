const questions = [
  {
    question: "What are multiple optimal solutions in LP?",
    shortAnswer: "Multiple optimal solutions occur when more than one point gives the same optimal objective value.",
    explanation: "This happens when the objective function is parallel to a binding constraint, creating an entire edge (or face) of optimal solutions. All points on this edge give the same optimal Z value.",
    hint: "Multiple points give the same best Z value.",
    level: "basic",
    codeExample: "Max Z = x + y\nConstraint: x + y ≤ 10\nAny point on x + y = 10 gives Z = 10"
  },
  {
    question: "What causes multiple optimal solutions?",
    shortAnswer: "Multiple optimal solutions are caused by the objective function being parallel to a binding constraint.",
    explanation: "When the objective function and a constraint have the same slope, the objective line coincides with the constraint line. This creates an entire edge of optimal solutions.",
    hint: "Parallel lines cause multiple optima.",
    level: "intermediate",
    codeExample: "Objective: Z = 2x + 3y (slope = -2/3)\nConstraint: 2x + 3y ≤ 12 (same slope = -2/3)\nParallel → Multiple optima"
  },
  {
    question: "How do you identify multiple optimal solutions graphically?",
    shortAnswer: "Look for the objective function line being parallel to a constraint line that forms part of the feasible region boundary.",
    explanation: "On a graph, multiple optimal solutions appear as an edge of the feasible region where the objective function line coincides with a constraint line. All points on this edge are optimal.",
    hint: "Objective line overlaps with constraint line.",
    level: "intermediate",
    codeExample: "Feasible region edge: x + y = 10\nObjective: Z = x + y\nOverlap → Multiple optima"
  },
  {
    question: "What is the slope condition for multiple optimal solutions?",
    shortAnswer: "The slope of the objective function must equal the slope of a binding constraint.",
    explanation: "For multiple optimal solutions, we need c₁/c₂ = a₁/a₂ where c₁, c₂ are objective coefficients and a₁, a₂ are constraint coefficients.",
    hint: "Equal slopes = multiple optima.",
    level: "advanced",
    codeExample: "Objective: Z = 3x + 2y (slope = -3/2)\nConstraint: 3x + 2y ≤ 12 (slope = -3/2)\nEqual slopes → Multiple optima"
  },
  {
    question: "Can multiple optimal solutions occur in minimization problems?",
    shortAnswer: "Yes, multiple optimal solutions can occur in minimization problems as well.",
    explanation: "The same principle applies: if the objective function is parallel to a binding constraint, there will be multiple optimal solutions. This is true for both maximization and minimization.",
    hint: "Applies to both maximization and minimization.",
    level: "intermediate",
    codeExample: "Min Z = 2x + 3y\nConstraint: 2x + 3y ≥ 12\nAny point on 2x + 3y = 12 gives Z = 12"
  },
  {
    question: "How do multiple optimal solutions affect decision-making?",
    shortAnswer: "Multiple optimal solutions provide flexibility to choose among equally good options based on other criteria.",
    explanation: "Since all optimal solutions give the same objective value, decision-makers can consider additional factors like risk, sustainability, stakeholder preferences, or future flexibility.",
    hint: "Flexibility to choose based on other factors.",
    level: "intermediate",
    codeExample: "Choose between (4,4) and (6,2) based on risk or sustainability"
  },
  {
    question: "What is the difference between multiple optimal solutions and degenerate solutions?",
    shortAnswer: "Multiple optimal solutions involve an edge of optimal points, while degeneracy involves too many binding constraints at a point.",
    explanation: "Multiple optima: objective is parallel to constraint. Degeneracy: more than minimum constraints binding at a point. They can occur together but are distinct concepts.",
    hint: "Multiple = edge, Degeneracy = point.",
    level: "advanced",
    codeExample: "Multiple: Edge of optimal points\nDegenerate: 3 constraints at one point"
  },
  {
    question: "How do you describe all optimal solutions when there are multiple?",
    shortAnswer: "All optimal solutions can be described as a convex combination of the optimal corner points.",
    explanation: "If two corner points (x₁, y₁) and (x₂, y₂) are optimal, then any point (x, y) = λ(x₁, y₁) + (1-λ)(x₂, y₂) for 0 ≤ λ ≤ 1 is also optimal.",
    hint: "Convex combination of optimal corners.",
    level: "advanced",
    codeExample: "Optimal corners: (4,4) and (6,2)\nAll points: λ(4,4) + (1-λ)(6,2), 0 ≤ λ ≤ 1"
  },
  {
    question: "Can there be multiple optimal solutions in unbounded problems?",
    shortAnswer: "Yes, but they would typically be along a ray rather than a bounded edge.",
    explanation: "In unbounded problems, multiple optimal solutions can exist along a ray extending to infinity. This occurs when the objective is parallel to a constraint in the unbounded direction.",
    hint: "Can occur along rays in unbounded regions.",
    level: "advanced",
    codeExample: "Max Z = x + y\nConstraint: x - y ≤ 0\nAll points on x = y are optimal (unbounded edge)"
  },
  {
    question: "What is the significance of multiple optimal solutions in sensitivity analysis?",
    shortAnswer: "Multiple optimal solutions indicate that the optimal value is robust to some changes in the objective coefficients.",
    explanation: "When multiple optimal solutions exist, there's a range of objective coefficients that will maintain the same optimal value. This provides stability in sensitivity analysis.",
    hint: "Provides robustness to changes.",
    level: "advanced",
    codeExample: "Range of coefficients where same Z remains optimal\nProvides stability in decision-making"
  },
  {
    question: "How do you check for multiple optimal solutions algebraically?",
    shortAnswer: "Check if two or more corner points give the same optimal Z value.",
    explanation: "Evaluate Z at all corner points. If the optimal value appears at more than one corner point, there are multiple optimal solutions. The entire edge between these corners is also optimal.",
    hint: "Same Z at multiple corners.",
    level: "intermediate",
    codeExample: "Z(4,2) = 20, Z(2,4) = 20\nBoth optimal → Multiple solutions"
  },
  {
    question: "What happens to multiple optimal solutions if you change the objective coefficients?",
    shortAnswer: "Changing objective coefficients can eliminate multiple optimal solutions or create new ones.",
    explanation: "If the objective coefficients are changed so that the slope is no longer parallel to any constraint, the problem may have a unique optimal solution. Conversely, new parallelisms can create multiple optima.",
    hint: "Coefficient changes affect parallelism.",
    level: "advanced",
    codeExample: "Original: Z = x + y → Multiple\nChanged: Z = 2x + 3y → Possibly unique"
  },
  {
    question: "Can multiple optimal solutions occur with non-negativity constraints?",
    shortAnswer: "Yes, multiple optimal solutions can occur along non-negativity constraints (axes).",
    explanation: "If the objective function is parallel to the x-axis or y-axis, multiple optimal solutions can exist along the axis. This happens when one variable has zero coefficient in the objective.",
    hint: "Can occur along axes too.",
    level: "intermediate",
    codeExample: "Max Z = 2x\nConstraint: x ≤ 5\nAny point with x = 5 is optimal"
  },
  {
    question: "What is the practical implication of multiple optimal solutions in production planning?",
    shortAnswer: "Multiple production plans give the same profit, allowing managers to choose based on other factors.",
    explanation: "In production planning, multiple optimal solutions mean different product mixes yield the same profit. Managers can choose based on market conditions, resource availability, or strategic priorities.",
    hint: "Same profit, different product mixes.",
    level: "intermediate",
    codeExample: "Plan A: 4 chairs, 2 tables → Profit = ₹1000\nPlan B: 2 chairs, 4 tables → Profit = ₹1000\nChoose based on demand or strategy"
  },
  {
    question: "How do you handle multiple optimal solutions in the simplex method?",
    shortAnswer: "The simplex method can find multiple optimal solutions by identifying zero reduced costs for non-basic variables.",
    explanation: "In the simplex method, if a non-basic variable has a zero reduced cost at the optimal solution, there are alternative optimal solutions. This indicates multiple optima.",
    hint: "Zero reduced costs = multiple optima.",
    level: "advanced",
    codeExample: "Non-basic variable with reduced cost = 0\n→ Can enter basis without changing Z"
  },
  {
    question: "What is the difference between multiple optimal and alternative optimal?",
    shortAnswer: "They are the same concept - multiple optimal solutions are also called alternative optimal solutions.",
    explanation: "Both terms refer to the same phenomenon: multiple points giving the same optimal objective value. 'Alternative optimal' emphasizes that there are choices available.",
    hint: "Same concept, different terminology.",
    level: "basic",
    codeExample: "Multiple optimal = Alternative optimal\nDifferent names, same meaning"
  },
  {
    question: "Can multiple optimal solutions exist with all constraints being non-binding?",
    shortAnswer: "No, multiple optimal solutions require at least one binding constraint.",
    explanation: "For multiple optimal solutions, the objective must be parallel to a constraint that is binding. If no constraints are binding, the problem would be unbounded or have an interior optimum, which doesn't happen in standard LP.",
    hint: "Need at least one binding constraint.",
    level: "intermediate",
    codeExample: "Multiple optima require: objective ∥ binding constraint\nIf no binding constraint → no multiple optima"
  },
  {
    question: "How does the feasible region shape affect multiple optimal solutions?",
    shortAnswer: "The feasible region must have an edge parallel to the objective function for multiple optimal solutions.",
    explanation: "Multiple optimal solutions exist when the feasible region has an edge (or face) that is parallel to the objective function. The shape of the feasible region determines if such an edge exists.",
    hint: "Need an edge parallel to objective.",
    level: "intermediate",
    codeExample: "Feasible region with edge: x + y = 10\nObjective parallel to edge → Multiple optima"
  },
  {
    question: "What is the role of the objective function's coefficients in multiple optimal solutions?",
    shortAnswer: "The ratio of coefficients must match the ratio of a constraint's coefficients.",
    explanation: "For multiple optimal solutions, we need c₁:c₂ = a₁:a₂ where c are objective coefficients and a are constraint coefficients. This creates the parallelism condition.",
    hint: "Coefficient ratios must match.",
    level: "advanced",
    codeExample: "Objective: 2x + 4y (ratio 1:2)\nConstraint: x + 2y ≤ 10 (ratio 1:2)\nMatch → Multiple optima"
  },
  {
    question: "Can multiple optimal solutions be identified from the optimal tableau?",
    shortAnswer: "Yes, by checking for zero reduced costs in the optimal simplex tableau.",
    explanation: "In the optimal simplex tableau, if any non-basic variable has a zero reduced cost, there are alternative optimal solutions. The number of zero reduced costs indicates the dimension of the optimal face.",
    hint: "Zero reduced costs in optimal tableau.",
    level: "advanced",
    codeExample: "Optimal tableau: non-basic variable x₂ has reduced cost = 0\n→ Alternative optimal solutions exist"
  },
  {
    question: "What is the relationship between multiple optimal solutions and shadow prices?",
    shortAnswer: "Multiple optimal solutions can have shadow prices that vary along the optimal edge.",
    explanation: "When multiple optimal solutions exist, the shadow prices (dual variables) may change along the optimal edge. This means the economic value of resources can vary even with the same objective value.",
    hint: "Shadow prices may vary along optimal edge.",
    level: "advanced",
    codeExample: "Different optimal points → Different shadow prices\nSame Z value but different resource valuations"
  },
  {
    question: "How do you choose among multiple optimal solutions in practice?",
    shortAnswer: "Use secondary criteria like risk, sustainability, feasibility, or strategic alignment.",
    explanation: "When multiple solutions give the same objective value, decision-makers should consider non-quantitative factors. This might include environmental impact, employee preferences, or long-term strategic goals.",
    hint: "Use secondary criteria for choice.",
    level: "intermediate",
    codeExample: "Criteria: environmental impact, risk, employee satisfaction, strategic alignment"
  },
  {
    question: "Can multiple optimal solutions exist in integer programming?",
    shortAnswer: "Yes, but they would be limited to integer points on the optimal edge.",
    explanation: "In integer programming, multiple optimal solutions exist but only at integer points. The continuous edge may have many optimal points, but only integer points are feasible.",
    hint: "Limited to integer points on the edge.",
    level: "advanced",
    codeExample: "Continuous: all points on x + y = 10\nInteger: only (0,10), (1,9), ..., (10,0)"
  },
  {
    question: "What is the difference between multiple optimal solutions and infinite optimal solutions?",
    shortAnswer: "They refer to the same concept - an infinite number of optimal points along an edge.",
    explanation: "Multiple optimal solutions means there are multiple optimal points. In continuous LP, this typically means infinitely many optimal points along an edge or face.",
    hint: "Infinite number of optimal points.",
    level: "basic",
    codeExample: "Multiple = Infinite in continuous LP\nBoth refer to the same phenomenon"
  },
  {
    question: "How does the objective function's direction affect multiple optimal solutions?",
    shortAnswer: "The direction (maximization or minimization) affects which edge is optimal but not the existence of multiple optima.",
    explanation: "Whether maximizing or minimizing, if the objective is parallel to a constraint, there will be multiple optimal solutions. The direction determines which side of the edge is optimal.",
    hint: "Direction doesn't affect existence.",
    level: "intermediate",
    codeExample: "Max: optimal edge at upper bound\nMin: optimal edge at lower bound\nBoth have multiple optima if parallel"
  }
];

export default questions;