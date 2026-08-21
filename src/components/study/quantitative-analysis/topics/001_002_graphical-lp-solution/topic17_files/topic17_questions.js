const questions = [
  {
    question: "What does it mean for a point to be feasible?",
    shortAnswer: "A point is feasible if it satisfies all constraints simultaneously.",
    explanation: "A feasible point must make every inequality true. If any constraint is violated, the point is infeasible.",
    hint: "Must satisfy all constraints.",
    level: "basic",
    codeExample: "Point (2,2) is feasible if it satisfies all constraints."
  },
  {
    question: "How do you test if a point is feasible?",
    shortAnswer: "Substitute the point into every constraint and check if all are true.",
    explanation: "Plug x and y into each inequality. If all are satisfied, the point is feasible.",
    hint: "Check all constraints.",
    level: "basic",
    codeExample: "Check (2,2) in 2x+3y≤12: 10≤12 ✓, x+2y≤8: 6≤8 ✓, x≥0 ✓, y≥0 ✓."
  },
  {
    question: "What is the first constraint to check when testing feasibility?",
    shortAnswer: "Non-negativity constraints (x≥0, y≥0) — they're the simplest.",
    explanation: "Checking non-negativity first quickly eliminates points with negative coordinates.",
    hint: "Check x≥0 and y≥0 first.",
    level: "basic",
    codeExample: "Check if x≥0 and y≥0 before other constraints."
  },
  {
    question: "If a point fails one constraint, is it feasible?",
    shortAnswer: "No, it's infeasible. ALL constraints must be satisfied.",
    explanation: "A single violation makes the point infeasible. You don't need to check the rest.",
    hint: "One failure = infeasible.",
    level: "basic",
    codeExample: "If x+2y≤8 fails, the point is infeasible regardless of other constraints."
  },
  {
    question: "What is the difference between feasible and infeasible points?",
    shortAnswer: "Feasible points satisfy all constraints; infeasible points violate at least one.",
    explanation: "Feasible points are in the feasible region. Infeasible points are outside.",
    hint: "Feasible = inside region; infeasible = outside.",
    level: "basic",
    codeExample: "A feasible point is a valid solution candidate."
  },
  {
    question: "How do you know if a corner point is feasible?",
    shortAnswer: "Substitute it into all constraints and verify each one.",
    explanation: "A corner point must satisfy all constraints to be a valid vertex of the feasible region.",
    hint: "Must satisfy ALL constraints.",
    level: "intermediate",
    codeExample: "Check (4,3) in all constraints."
  },
  {
    question: "Can a point satisfy some constraints but not others?",
    shortAnswer: "Yes, but it's still infeasible. ALL constraints must be satisfied.",
    explanation: "Partial satisfaction is not enough. The point must satisfy every single constraint.",
    hint: "All or nothing.",
    level: "basic",
    codeExample: "Satisfying 2 of 3 constraints is still infeasible."
  },
  {
    question: "What is the most common reason for infeasibility?",
    shortAnswer: "Violating a constraint due to misreading or arithmetic errors.",
    explanation: "Careless mistakes in substitution or misreading inequality signs lead to infeasibility.",
    hint: "Check your work carefully.",
    level: "intermediate",
    codeExample: "Misreading ≤ as ≥ is a common error."
  },
  {
    question: "How do you check non-negativity constraints?",
    shortAnswer: "Verify that x ≥ 0 and y ≥ 0.",
    explanation: "Simply check if the x and y coordinates are non-negative.",
    hint: "Check if x and y are ≥ 0.",
    level: "basic",
    codeExample: "For point (2,-1), y<0 so it fails non-negativity."
  },
  {
    question: "What if a point has fractional coordinates?",
    shortAnswer: "Fractions are fine — test them just like integers.",
    explanation: "Substitute fractional values into each constraint and check the inequalities.",
    hint: "Fractions work the same way.",
    level: "intermediate",
    codeExample: "Check (2.5, 3.5) in all constraints."
  },
  {
    question: "How do you check a ≤ constraint?",
    shortAnswer: "Substitute the point and verify LHS ≤ RHS.",
    explanation: "Calculate the left side and compare to the right side. It must be less than or equal.",
    hint: "Check if LHS ≤ RHS.",
    level: "basic",
    codeExample: "For 2x+3y≤12, check if 2x+3y is ≤ 12."
  },
  {
    question: "How do you check a ≥ constraint?",
    shortAnswer: "Substitute the point and verify LHS ≥ RHS.",
    explanation: "Calculate the left side and compare to the right side. It must be greater than or equal.",
    hint: "Check if LHS ≥ RHS.",
    level: "basic",
    codeExample: "For x+y≥4, check if x+y is ≥ 4."
  },
  {
    question: "What is the quickest way to test feasibility?",
    shortAnswer: "Check the easiest constraints first (non-negativity).",
    explanation: "Start with simple constraints to quickly eliminate infeasible points.",
    hint: "Check easiest first.",
    level: "basic",
    codeExample: "Check x≥0 and y≥0 first."
  },
  {
    question: "How do you know if a point is in the feasible region?",
    shortAnswer: "If it satisfies all constraints, it's in the feasible region.",
    explanation: "The feasible region is defined by all constraints. A point in it satisfies all.",
    hint: "Satisfies all constraints.",
    level: "basic",
    codeExample: "If all constraints are true, the point is in the feasible region."
  },
  {
    question: "What if a point lies exactly on a constraint line?",
    shortAnswer: "It's feasible if the constraint includes equality (≤ or ≥).",
    explanation: "Points on the line are feasible for ≤ or ≥ constraints. For < or >, they're infeasible.",
    hint: "Check if equality is allowed.",
    level: "intermediate",
    codeExample: "On x+y=10, feasible for ≤ but not for <."
  },
  {
    question: "Can a point be feasible if it violates non-negativity?",
    shortAnswer: "No, non-negativity is a constraint like any other.",
    explanation: "If x<0 or y<0, the point is infeasible regardless of other constraints.",
    hint: "Non-negativity must be satisfied.",
    level: "basic",
    codeExample: "( -1, 5) is infeasible due to x<0."
  },
  {
    question: "Why is feasibility testing important in LP?",
    shortAnswer: "It ensures that solutions are valid and practical.",
    explanation: "Only feasible points can be considered as solutions. Infeasible points don't satisfy real-world constraints.",
    hint: "Validates solutions.",
    level: "intermediate",
    codeExample: "Feasible solutions are the only ones that work in practice."
  },
  {
    question: "How do you check feasibility for a system of inequalities?",
    shortAnswer: "Check the point against every inequality in the system.",
    explanation: "Every inequality must be satisfied for the point to be feasible.",
    hint: "Check each inequality.",
    level: "intermediate",
    codeExample: "For x≥0, y≥0, x+y≤10, check all three."
  },
  {
    question: "What is the easiest way to remember feasibility testing?",
    shortAnswer: "Think: 'All constraints must be satisfied.'",
    explanation: "If any constraint fails, the point is infeasible. It's an all-or-nothing test.",
    hint: "All must pass.",
    level: "basic",
    codeExample: "One failure = infeasible."
  },
  {
    question: "How do you handle strict inequalities in feasibility testing?",
    shortAnswer: "Check if the point strictly satisfies the inequality.",
    explanation: "For < or >, equality is not allowed. The point must be strictly less than or greater than.",
    hint: "Equality is not allowed.",
    level: "intermediate",
    codeExample: "For x+y<10, (5,5) is infeasible because 10=10."
  },
  {
    question: "What is the difference between feasible and optimal?",
    shortAnswer: "Feasible means it satisfies constraints; optimal means it's the best feasible.",
    explanation: "All optimal solutions are feasible, but not all feasible solutions are optimal.",
    hint: "Feasible = valid; Optimal = best.",
    level: "intermediate",
    codeExample: "An optimal solution is a feasible point that maximizes or minimizes the objective."
  },
  {
    question: "How do you check feasibility with fractions?",
    shortAnswer: "Use careful arithmetic or convert to decimals.",
    explanation: "Fractions work the same way as integers. Be careful with calculations.",
    hint: "Fractions are fine.",
    level: "intermediate",
    codeExample: "Check (1/2, 3/4) in all constraints."
  },
  {
    question: "What if a point has very large numbers?",
    shortAnswer: "Test it like any other point — substitute and check.",
    explanation: "Large numbers are fine; just be careful with arithmetic.",
    hint: "Test normally.",
    level: "intermediate",
    codeExample: "Check (100, 200) in all constraints."
  },
  {
    question: "Can you test feasibility using a graph?",
    shortAnswer: "Yes, see if the point lies in the shaded feasible region.",
    explanation: "If the point is in the overlapping shaded area, it's feasible.",
    hint: "Check if in shaded region.",
    level: "basic",
    codeExample: "A point in the feasible region is feasible."
  },
  {
    question: "What is the first thing to check when testing feasibility?",
    shortAnswer: "Check if the point is in the feasible region (all constraints satisfied).",
    explanation: "Start by checking the simplest constraints (like non-negativity) first.",
    hint: "Start simple.",
    level: "basic",
    codeExample: "Check x≥0 and y≥0 first."
  },
  {
    question: "How do you test feasibility for a minimization problem?",
    shortAnswer: "Same process — check all constraints.",
    explanation: "Feasibility testing is independent of whether you're minimizing or maximizing.",
    hint: "Same for max and min.",
    level: "intermediate",
    codeExample: "Check all constraints regardless of objective."
  },
  {
    question: "What if a point is on the boundary of the feasible region?",
    shortAnswer: "It's feasible if the boundary is included (≤ or ≥).",
    explanation: "Boundary points are feasible for non-strict inequalities.",
    hint: "Check if boundary is included.",
    level: "intermediate",
    codeExample: "On x+y=10, feasible for ≤."
  },
  {
    question: "Can you have multiple feasible points?",
    shortAnswer: "Yes, there are usually many feasible points.",
    explanation: "The feasible region contains infinitely many points (if not empty).",
    hint: "Many feasible points.",
    level: "basic",
    codeExample: "Any point in the feasible region is feasible."
  },
  {
    question: "What does it mean if no point is feasible?",
    shortAnswer: "The problem is infeasible — no solution exists.",
    explanation: "If constraints conflict, there's no feasible region.",
    hint: "No solution.",
    level: "intermediate",
    codeExample: "x≤3 and x≥5 is infeasible."
  },
  {
    question: "How do you test feasibility with equality constraints?",
    shortAnswer: "The point must satisfy the equality exactly.",
    explanation: "For = constraints, the point must lie exactly on the line.",
    hint: "Must satisfy equality.",
    level: "intermediate",
    codeExample: "For x+y=10, (4,6) is feasible, (5,5) is not."
  },
  {
    question: "What is the most important rule in feasibility testing?",
    shortAnswer: "ALL constraints must be satisfied.",
    explanation: "One violation means the point is infeasible, regardless of other constraints.",
    hint: "All must pass.",
    level: "basic",
    codeExample: "If any constraint fails, the point is infeasible."
  }
];

export default questions;