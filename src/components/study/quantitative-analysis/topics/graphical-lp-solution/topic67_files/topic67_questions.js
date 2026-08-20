const questions = [
  {
    question: "What is a unique optimal solution in LP?",
    shortAnswer: "A unique optimal solution occurs when exactly one corner point gives the optimal objective function value.",
    explanation: "In a unique optimal solution, there is only one point in the feasible region where the objective function achieves its maximum (or minimum) value. This is the most common case in LP problems.",
    hint: "Only one corner point gives the best Z value.",
    level: "basic",
    codeExample: "Max Z = 3x + 2y\nOptimal at (4, 2) with Z = 16\nNo other point gives Z = 16"
  },
  {
    question: "How do you identify a unique optimal solution graphically?",
    shortAnswer: "A unique optimal solution appears as a single corner point where the objective function line touches the feasible region at exactly one point.",
    explanation: "On a graph, you'll see the objective function line intersecting the feasible region at a single corner point. Moving the line in either direction would change the objective value.",
    hint: "One point where the objective line touches the region.",
    level: "intermediate",
    codeExample: "Objective line Z = 5x + 3y touches feasible region only at (4, 2)"
  },
  {
    question: "What are the characteristics of a unique optimal solution?",
    shortAnswer: "The objective function has a unique slope, it's not parallel to any constraint, and the optimal point is a distinct corner point.",
    explanation: "Characteristics include: single optimal point, unique slope of objective function, no other point gives the same Z value, and the solution is well-defined and unambiguous.",
    hint: "Unique slope, single point, no other options.",
    level: "basic",
    codeExample: "Z = 3x + 2y (slope = -1.5)\nNo constraint has slope -1.5 → Unique"
  },
  {
    question: "Why is a unique optimal solution important in practice?",
    shortAnswer: "It provides a clear, unambiguous decision for managers and decision-makers.",
    explanation: "A unique solution means there is one best way to allocate resources. This makes decision-making straightforward and easy to justify to stakeholders.",
    hint: "Clear answer = easy decision.",
    level: "intermediate",
    codeExample: "Only one production plan gives maximum profit → Easy to implement"
  },
  {
    question: "Can a unique optimal solution be at a non-corner point?",
    shortAnswer: "No, the unique optimal solution in LP always occurs at a corner point of the feasible region.",
    explanation: "The Fundamental Theorem of Linear Programming states that if an optimal solution exists, there is an optimal solution at a corner point. For a unique solution, it must be at a single corner point.",
    hint: "Optimal solutions are always at corner points.",
    level: "intermediate",
    codeExample: "Feasible region corners: (0,0), (5,0), (4,2), (0,4)\nOptimal at (4,2) - a corner point"
  },
  {
    question: "How do you verify uniqueness of the optimal solution?",
    shortAnswer: "Check that no other corner point gives the same objective function value.",
    explanation: "After finding the optimal value, evaluate Z at all other corner points. If none gives the same value, the solution is unique.",
    hint: "Check all corner points for same Z value.",
    level: "intermediate",
    codeExample: "Z(4,2) = 26\nZ(5,0) = 25, Z(0,4) = 12\nDifferent values → Unique"
  },
  {
    question: "What happens to uniqueness if the objective function is parallel to a constraint?",
    shortAnswer: "If the objective function is parallel to a binding constraint, there may be multiple optimal solutions instead of a unique one.",
    explanation: "Parallelism means the objective and constraint have the same slope. This can create an entire edge of optimal solutions rather than a single point.",
    hint: "Parallel = potential multiple optima.",
    level: "advanced",
    codeExample: "Objective: Z = 2x + 3y\nConstraint: 2x + 3y ≤ 12\nParallel → Multiple optima possible"
  },
  {
    question: "What is the role of corner points in finding a unique optimal solution?",
    shortAnswer: "The unique optimal solution is always at one of the corner points of the feasible region.",
    explanation: "Corner points (vertices) are the only candidates for optimal solutions. We evaluate Z at each corner point and select the one that gives the best value.",
    hint: "Check all corners, choose the best.",
    level: "basic",
    codeExample: "Find corners → Evaluate Z → Select best → Verify uniqueness"
  },
  {
    question: "How does the slope of the objective function affect uniqueness?",
    shortAnswer: "A unique slope that is not parallel to any constraint ensures uniqueness.",
    explanation: "The objective function's slope determines whether it's parallel to any constraint. If it's parallel to a constraint, multiple optima may exist. If not, uniqueness is ensured.",
    hint: "Slope determines uniqueness.",
    level: "advanced",
    codeExample: "Unique slope → Unique optimum\nParallel slope → Multiple optima"
  },
  {
    question: "Can a unique optimal solution occur with all constraints having slack?",
    shortAnswer: "No, at least one constraint must be binding for a unique optimal solution.",
    explanation: "If all constraints have slack, the optimal point would be inside the feasible region, not at a corner. A unique optimal solution requires binding constraints.",
    hint: "Need at least one binding constraint.",
    level: "intermediate",
    codeExample: "At (4,2), constraints 2x + y = 10 and x + 2y = 8 are binding"
  },
  {
    question: "What is the difference between unique and multiple optimal solutions?",
    shortAnswer: "Unique has one optimal point, while multiple has an entire edge or area of optimal points.",
    explanation: "Unique: one corner point gives the best Z. Multiple: many points (usually an edge) give the same optimal Z because the objective is parallel to a constraint.",
    hint: "One point vs. many points.",
    level: "basic",
    codeExample: "Unique: Only (4,2) gives Z = 26\nMultiple: All points on x + y = 10 give Z = 10"
  },
  {
    question: "How do you know if a problem has a unique optimal solution before solving?",
    shortAnswer: "Check if the objective function slope is unique and not parallel to any constraint.",
    explanation: "By comparing the slope of the objective function with the slopes of all constraints, you can predict whether the solution will be unique or not.",
    hint: "Compare slopes before solving.",
    level: "advanced",
    codeExample: "Objective slope = -2\nNo constraint has slope -2 → Likely unique"
  },
  {
    question: "What is the significance of the objective function's intercept in uniqueness?",
    shortAnswer: "The intercept determines which corner point is optimal, but doesn't affect uniqueness.",
    explanation: "Changing the intercept moves the objective function line parallel to itself, potentially changing which corner point is optimal. Uniqueness is determined by the slope, not the intercept.",
    hint: "Intercept affects which corner, not uniqueness.",
    level: "advanced",
    codeExample: "Z = 3x + 2y (slope -1.5)\nZ = 3x + 2y + 5 (same slope, different intercept)\nBoth unique if slope is unique"
  },
  {
    question: "Can a unique optimal solution be on an axis (x=0 or y=0)?",
    shortAnswer: "Yes, a unique optimal solution can be on the x-axis or y-axis if non-negativity constraints are binding.",
    explanation: "If the optimal solution has x=0 or y=0, it's at a corner point on an axis. This is still a unique solution if no other point gives the same Z.",
    hint: "Axis points can be unique optimal solutions.",
    level: "intermediate",
    codeExample: "Optimal at (0, 10) on y-axis → Still unique if no other point gives same Z"
  },
  {
    question: "How does sensitivity analysis relate to unique optimal solutions?",
    shortAnswer: "Unique optimal solutions are sensitive to changes in objective coefficients and constraint RHS values.",
    explanation: "In a unique solution, small changes in parameters can shift the optimal point. Sensitivity analysis examines how much change the solution can tolerate before becoming unstable.",
    hint: "Unique = sensitive to changes.",
    level: "advanced",
    codeExample: "Small change in coefficient changes optimal point → Unique solution is sensitive"
  },
  {
    question: "What happens to uniqueness if the feasible region is empty?",
    shortAnswer: "If the feasible region is empty, there is no optimal solution at all.",
    explanation: "An infeasible problem has no solution, so uniqueness is not applicable. The problem needs to be reformulated.",
    hint: "No feasible region = no solution.",
    level: "basic",
    codeExample: "Infeasible: x + y ≤ 5 and x + y ≥ 8 → No solution"
  },
  {
    question: "Can a unique optimal solution exist with redundant constraints?",
    shortAnswer: "Yes, redundant constraints don't affect uniqueness.",
    explanation: "Redundant constraints don't change the feasible region. If the problem has a unique optimal solution, redundant constraints don't affect it.",
    hint: "Redundant constraints don't change uniqueness.",
    level: "intermediate",
    codeExample: "Unique solution at (4,2) remains unique even if redundant constraints exist"
  },
  {
    question: "What is the relationship between binding constraints and uniqueness?",
    shortAnswer: "For a unique optimal solution, exactly the right number of constraints must be binding (2 in 2D).",
    explanation: "In a 2D problem, a unique corner point requires exactly 2 binding constraints (or 1 constraint and 1 non-negativity). More than 2 indicates degeneracy.",
    hint: "2 binding constraints = unique in 2D.",
    level: "intermediate",
    codeExample: "At (4,2): 2 constraints binding → Unique\nAt (3,3): 3 constraints binding → Degenerate"
  },
  {
    question: "How do you handle rounding errors when checking uniqueness?",
    shortAnswer: "Use exact fractions or rational numbers instead of decimals to avoid rounding errors.",
    explanation: "Rounding can make two different values appear equal or different. Using exact values ensures accurate comparison and correct identification of uniqueness.",
    hint: "Use fractions for accuracy.",
    level: "advanced",
    codeExample: "Instead of 4.999 = 5\nUse exact values: 5/1 = 5"
  },
  {
    question: "What is the difference between unique optimal and unique feasible?",
    shortAnswer: "Unique optimal refers to the objective function, while unique feasible refers to the feasible region.",
    explanation: "Unique optimal: one point optimizes Z. Unique feasible: the feasible region is a single point (only one feasible solution). These are different concepts.",
    hint: "Optimal = objective, Feasible = constraints.",
    level: "intermediate",
    codeExample: "Unique feasible: only (3,4) satisfies all constraints\nUnique optimal: among feasible points, only one gives best Z"
  },
  {
    question: "Can a unique optimal solution exist in an unbounded region?",
    shortAnswer: "Yes, if the objective function is bounded in the unbounded direction.",
    explanation: "Even if the feasible region is unbounded, the objective might be bounded (e.g., decreasing or maximizing away from infinity). A unique optimal solution can exist.",
    hint: "Unbounded region can still have unique optimum.",
    level: "advanced",
    codeExample: "Max Z = -x - y with x, y ≥ 0\nOptimal at (0,0) - unique and bounded"
  },
  {
    question: "What is the role of the feasible region's shape in uniqueness?",
    shortAnswer: "The shape of the feasible region determines which corner points exist and where the unique optimum can occur.",
    explanation: "Different feasible region shapes (convex polygons) have different corner points. The unique optimum will be at one of these corner points, depending on the objective function.",
    hint: "Shape determines possible optimal points.",
    level: "intermediate",
    codeExample: "Different constraints create different corners\nUnique optimum at one of these corners"
  },
  {
    question: "How do you prove a solution is unique?",
    shortAnswer: "Show that no other feasible point gives the same objective value.",
    explanation: "To prove uniqueness, demonstrate that the optimal point is the only one achieving the optimal Z. This can be done by showing the objective function is strictly increasing/decreasing in the feasible region.",
    hint: "Show no other point gives same Z.",
    level: "advanced",
    codeExample: "Proof: For any other point, Z < Z* at optimal point\nTherefore, uniqueness"
  },
  {
    question: "What is the connection between uniqueness and the KKT conditions?",
    shortAnswer: "In KKT conditions, uniqueness corresponds to a single solution satisfying the optimality conditions.",
    explanation: "The KKT conditions provide necessary and sufficient conditions for optimality. A unique solution means only one point satisfies all KKT conditions.",
    hint: "Unique KKT solution = unique optimal.",
    level: "advanced",
    codeExample: "KKT conditions at (4,2): only one point satisfies all → Unique optimum"
  },
  {
    question: "Can changing the objective function turn a unique solution into multiple solutions?",
    shortAnswer: "Yes, changing the objective function can create multiple optimal solutions.",
    explanation: "If the objective function is changed to become parallel to a constraint, the unique solution can become multiple optimal solutions.",
    hint: "Objective change can create multiple optima.",
    level: "advanced",
    codeExample: "Original: Z = 3x + 2y (unique)\nChanged: Z = x + y (parallel to constraint) → Multiple"
  },
  {
    question: "What is the difference between unique optimal and unbounded?",
    shortAnswer: "Unique optimal has a finite best value at one point, while unbounded has no finite optimum.",
    explanation: "Unique optimal: there is a single best point with a finite Z value. Unbounded: the objective can improve indefinitely with no best point.",
    hint: "Finite best vs. no best.",
    level: "basic",
    codeExample: "Unique: Z max = 26 at (4,2)\nUnbounded: Z can go to infinity"
  },
  {
    question: "How does the objective function's direction affect uniqueness?",
    shortAnswer: "The direction (for maximization or minimization) combined with the slope determines uniqueness.",
    explanation: "For maximization, you move the objective line in one direction. For minimization, you move it in the opposite direction. Both can yield unique solutions.",
    hint: "Direction matters for optimization.",
    level: "intermediate",
    codeExample: "Max: move upward, unique at top corner\nMin: move downward, unique at bottom corner"
  },
  {
    question: "What are the implications of a unique optimal solution for decision-making?",
    shortAnswer: "It provides a clear, single recommended course of action.",
    explanation: "Decision-makers can implement the unique solution with confidence. There's no ambiguity about which alternative is best, making justification and implementation straightforward.",
    hint: "Clear recommendation = easy decision.",
    level: "intermediate",
    codeExample: "Produce 4 chairs and 2 tables → Only optimal plan"
  },
  {
    question: "How do you check for uniqueness when solving computationally?",
    shortAnswer: "Check if the optimal basis is unique or if there are alternative optimal bases.",
    explanation: "In computational methods like the simplex method, uniqueness corresponds to a unique optimal basis. The presence of zero reduced costs for non-basic variables indicates multiple optima.",
    hint: "Check for zero reduced costs.",
    level: "advanced",
    codeExample: "If all non-basic variables have negative reduced costs → Unique optimum"
  }
];

export default questions;