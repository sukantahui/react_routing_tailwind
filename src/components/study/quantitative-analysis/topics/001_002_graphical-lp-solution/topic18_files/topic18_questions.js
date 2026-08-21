const questions = [
  {
    question: "Why is it important to check the feasibility of corner points?",
    shortAnswer: "Because only feasible corner points are valid candidates for optimal solutions.",
    explanation: "Not all intersections satisfy all constraints. Only feasible corner points can be evaluated in the objective function.",
    hint: "Only feasible points matter.",
    level: "intermediate",
    codeExample: "Check each corner point against all constraints before evaluating the objective."
  },
  {
    question: "How do you check if a corner point is feasible?",
    shortAnswer: "Substitute the corner point into every constraint and check if all are satisfied.",
    explanation: "A corner point is feasible only if it satisfies every inequality in the problem.",
    hint: "Check all constraints.",
    level: "intermediate",
    codeExample: "Test (2,2) in 2x+3y≤12: 10≤12 ✓, x+2y≤8: 6≤8 ✓, x≥0 ✓, y≥0 ✓."
  },
  {
    question: "What if a corner point violates one constraint?",
    shortAnswer: "It's infeasible and should be excluded from consideration.",
    explanation: "A single violation makes the point infeasible. It cannot be a solution.",
    hint: "One violation = infeasible.",
    level: "basic",
    codeExample: "If x+2y≤8 fails, the point is infeasible regardless of other constraints."
  },
  {
    question: "What is the first constraint to check for corner point feasibility?",
    shortAnswer: "Non-negativity constraints (x≥0, y≥0).",
    explanation: "These are the simplest to check and quickly eliminate infeasible points.",
    hint: "Check non-negativity first.",
    level: "basic",
    codeExample: "Check if x≥0 and y≥0 before other constraints."
  },
  {
    question: "Can a corner point be infeasible?",
    shortAnswer: "Yes, some intersections of constraint lines may violate other constraints.",
    explanation: "A point can be the intersection of two lines but still not satisfy a third constraint.",
    hint: "Not all intersections are feasible.",
    level: "intermediate",
    codeExample: "(3,3) might satisfy two constraints but violate a third."
  },
  {
    question: "How do you know if a corner point is feasible from the graph?",
    shortAnswer: "Check if the point lies within the shaded feasible region.",
    explanation: "If the point is inside or on the boundary of the feasible region, it's feasible.",
    hint: "Point must be in the shaded area.",
    level: "basic",
    codeExample: "If the point is in the feasible region, it's feasible."
  },
  {
    question: "What is a systematic way to check corner point feasibility?",
    shortAnswer: "Create a table with constraints as columns and corner points as rows.",
    explanation: "Check each constraint for each corner point and mark pass/fail.",
    hint: "Use a table.",
    level: "intermediate",
    codeExample: "Table: Corner | 2x+3y≤12 | x+2y≤8 | x≥0 | y≥0 | Feasible?"
  },
  {
    question: "What does it mean if a corner point is feasible?",
    shortAnswer: "It satisfies all constraints and is a valid solution candidate.",
    explanation: "Feasible corner points are the only points that can be optimal solutions.",
    hint: "Valid candidate.",
    level: "basic",
    codeExample: "A feasible corner point can be evaluated in the objective function."
  },
  {
    question: "What does it mean if a corner point is infeasible?",
    shortAnswer: "It violates at least one constraint and cannot be a solution.",
    explanation: "Infeasible corner points are outside the feasible region and must be excluded.",
    hint: "Not a valid solution.",
    level: "basic",
    codeExample: "An infeasible corner point cannot be optimal."
  },
  {
    question: "How do you handle strict inequalities when checking corner points?",
    shortAnswer: "Points on dashed lines are infeasible for < or > constraints.",
    explanation: "Strict inequalities exclude points on the boundary line.",
    hint: "Dashed line = not included.",
    level: "intermediate",
    codeExample: "For x+y<10, (5,5) is infeasible because 10=10."
  },
  {
    question: "What is the relationship between corner points and binding constraints?",
    shortAnswer: "At a feasible corner point, at least two constraints are binding (active).",
    explanation: "Binding constraints hold as equalities at the corner point.",
    hint: "Active constraints.",
    level: "expert",
    codeExample: "At (2,2), 2x+3y=10 and x+2y=6 are non-binding; actually the point is interior."
  },
  {
    question: "Can a corner point be feasible if it violates non-negativity?",
    shortAnswer: "No, non-negativity is a constraint like any other.",
    explanation: "If x<0 or y<0, the point is infeasible regardless of other constraints.",
    hint: "Non-negativity must be satisfied.",
    level: "basic",
    codeExample: "(-1,5) is infeasible due to x<0."
  },
  {
    question: "How do you check corner point feasibility with fractions?",
    shortAnswer: "Substitute fractional values into each constraint and check the inequalities.",
    explanation: "Fractions work the same way as integers — just be careful with arithmetic.",
    hint: "Fractions are fine.",
    level: "intermediate",
    codeExample: "Check (2.5, 3.5) in all constraints."
  },
  {
    question: "What is the most common mistake in checking corner point feasibility?",
    shortAnswer: "Forgetting to check all constraints.",
    explanation: "Students often check a few constraints and assume the point is feasible.",
    hint: "Check ALL constraints.",
    level: "basic",
    codeExample: "Don't stop after checking 2 of 4 constraints."
  },
  {
    question: "How do you check corner point feasibility for equality constraints?",
    shortAnswer: "The point must satisfy the equality exactly.",
    explanation: "For = constraints, the point must lie exactly on the line.",
    hint: "Must satisfy equality.",
    level: "intermediate",
    codeExample: "For x+y=10, (4,6) is feasible, (5,5) is not."
  },
  {
    question: "What if a corner point is on the boundary of the feasible region?",
    shortAnswer: "It's feasible if the boundary is included (≤ or ≥).",
    explanation: "Boundary points are feasible for non-strict inequalities.",
    hint: "Check if boundary is included.",
    level: "intermediate",
    codeExample: "On x+y=10, feasible for ≤."
  },
  {
    question: "How do you document corner point feasibility?",
    shortAnswer: "Create a table with each constraint's result (✓ or ✗).",
    explanation: "Documentation helps track which constraints pass and fail.",
    hint: "Use a systematic table.",
    level: "intermediate",
    codeExample: "Corner | Constraint1 | Constraint2 | Constraint3 | Feasible?"
  },
  {
    question: "What is the role of corner point feasibility in LP?",
    shortAnswer: "It ensures that only valid solutions are considered for optimization.",
    explanation: "Feasibility testing is a critical step before evaluating the objective function.",
    hint: "Validates candidates.",
    level: "intermediate",
    codeExample: "Only feasible corners are evaluated in the objective function."
  },
  {
    question: "Can a corner point be feasible if it's the intersection of two parallel lines?",
    shortAnswer: "No, parallel lines don't intersect, so there's no corner point.",
    explanation: "Parallel lines have no intersection, so they don't form a corner point.",
    hint: "Parallel = no corner.",
    level: "intermediate",
    codeExample: "x+y=10 and x+y=5 are parallel — no corner."
  },
  {
    question: "What is the easiest way to remember to check all constraints?",
    shortAnswer: "Use a checklist and check off each constraint.",
    explanation: "A physical or mental checklist ensures you don't miss any constraints.",
    hint: "Use a checklist.",
    level: "basic",
    codeExample: "Check off each constraint as you test it."
  },
  {
    question: "How do you handle corner points with large numbers?",
    shortAnswer: "Test them like any other point — substitute and check.",
    explanation: "Large numbers are fine; just be careful with arithmetic.",
    hint: "Test normally.",
    level: "intermediate",
    codeExample: "Check (100, 200) in all constraints."
  },
  {
    question: "What if a corner point satisfies 9 of 10 constraints?",
    shortAnswer: "It's still infeasible — ALL constraints must be satisfied.",
    explanation: "Partial satisfaction is not enough. The point must satisfy every single constraint.",
    hint: "All or nothing.",
    level: "basic",
    codeExample: "Satisfying 9 of 10 is still infeasible."
  },
  {
    question: "How do you check corner point feasibility for minimization problems?",
    shortAnswer: "Same process — check all constraints.",
    explanation: "Feasibility testing is independent of whether you're minimizing or maximizing.",
    hint: "Same for max and min.",
    level: "intermediate",
    codeExample: "Check all constraints regardless of objective."
  },
  {
    question: "What is the first thing to do when checking a corner point?",
    shortAnswer: "List all constraints and substitute the point's coordinates.",
    explanation: "Start with the simplest constraints (like non-negativity) first.",
    hint: "Start simple.",
    level: "basic",
    codeExample: "Check x≥0 and y≥0 first."
  },
  {
    question: "Can you check corner point feasibility using a graph?",
    shortAnswer: "Yes, see if the point lies in the shaded feasible region.",
    explanation: "If the point is in the overlapping shaded area, it's feasible.",
    hint: "Check if in shaded region.",
    level: "basic",
    codeExample: "A point in the feasible region is feasible."
  },
  {
    question: "What is the most important rule in corner point feasibility?",
    shortAnswer: "ALL constraints must be satisfied.",
    explanation: "One violation means the point is infeasible, regardless of other constraints.",
    hint: "All must pass.",
    level: "basic",
    codeExample: "If any constraint fails, the point is infeasible."
  },
  {
    question: "How do you check feasibility for a corner point at the origin?",
    shortAnswer: "Check if (0,0) satisfies all constraints.",
    explanation: "The origin is a common corner point. Check it against all constraints.",
    hint: "Check (0,0) in all constraints.",
    level: "basic",
    codeExample: "For x≥0, y≥0, x+y≤10, (0,0) is feasible."
  },
  {
    question: "What if a corner point has both constraints from non-negativity?",
    shortAnswer: "The point is (0,0) — check if it satisfies all other constraints.",
    explanation: "The origin is the intersection of x=0 and y=0. It must satisfy all other constraints.",
    hint: "Check other constraints.",
    level: "intermediate",
    codeExample: "(0,0) must satisfy x+y≤10, etc."
  },
  {
    question: "How do you handle corner points with decimal coordinates?",
    shortAnswer: "Test them like any other point — substitute and check.",
    explanation: "Decimals work the same way as integers. Be careful with arithmetic.",
    hint: "Decimals are fine.",
    level: "intermediate",
    codeExample: "Check (2.5, 3.5) in all constraints."
  },
  {
    question: "What is the relationship between corner points and the feasible region?",
    shortAnswer: "Corner points are the vertices of the feasible region.",
    explanation: "The feasible region is a polygon whose vertices are the corner points.",
    hint: "Vertices of the region.",
    level: "intermediate",
    codeExample: "Corner points define the feasible region's shape."
  },
  {
    question: "Why should you mark infeasible corner points?",
    shortAnswer: "To avoid evaluating them in the objective function.",
    explanation: "Infeasible corner points waste time if you evaluate them. Cross them out.",
    hint: "Cross out infeasible points.",
    level: "intermediate",
    codeExample: "Mark infeasible corners with an ✗."
  }
];

export default questions;