const questions = [
  {
    question: "What is the feasible region in LP?",
    shortAnswer: "The set of all points that satisfy all constraints simultaneously.",
    explanation: "The feasible region is the intersection of all constraint half-planes. It contains all possible solutions to the LP problem.",
    hint: "All points that satisfy every constraint.",
    level: "basic",
    codeExample: "Feasible region = intersection of all shaded areas"
  },
  {
    question: "How do you find the feasible region?",
    shortAnswer: "Graph all constraints, shade each half-plane, and find where all shaded regions overlap.",
    explanation: "Step 1: Graph each constraint as a line. Step 2: Shade the feasible side of each. Step 3: The overlap is the feasible region.",
    hint: "Graph → Shade → Overlap.",
    level: "intermediate",
    codeExample: "Intersection of all shaded half-planes"
  },
  {
    question: "What shape is the feasible region?",
    shortAnswer: "Always a convex polygon (bounded) or unbounded region.",
    explanation: "The feasible region is always convex, meaning there are no indentations. It can be bounded (closed polygon) or unbounded (extends to infinity).",
    hint: "Convex polygon or unbounded region.",
    level: "intermediate",
    codeExample: "Bounded: polygon shape, Unbounded: extends to infinity"
  },
  {
    question: "What is a corner point of the feasible region?",
    shortAnswer: "A vertex where two constraint lines intersect.",
    explanation: "Corner points are the vertices of the feasible region. They are formed by the intersection of two constraint lines and are the only candidates for optimal solutions.",
    hint: "Vertex of the feasible region.",
    level: "intermediate",
    codeExample: "(0,0), (5,0), (4,2), (0,4) are corner points"
  },
  {
    question: "How do you determine if the feasible region is bounded?",
    shortAnswer: "If the region is enclosed on all sides by constraints, it's bounded.",
    explanation: "A bounded feasible region is completely enclosed by constraint lines. An unbounded region extends to infinity in at least one direction.",
    hint: "Enclosed vs. extending to infinity.",
    level: "intermediate",
    codeExample: "Bounded: x+y≤10, x≥0, y≥0; Unbounded: x+y≥5, x≥0, y≥0"
  },
  {
    question: "What happens if the feasible region is empty?",
    shortAnswer: "The LP problem is infeasible - no solution exists.",
    explanation: "If constraints are contradictory, the feasible region is empty. There is no point that satisfies all constraints.",
    hint: "No solution exists.",
    level: "advanced",
    codeExample: "x+y≤5 and x+y≥8 → empty feasible region"
  },
  {
    question: "What happens if the feasible region is unbounded?",
    shortAnswer: "The optimal solution may not exist (unbounded solution).",
    explanation: "If the feasible region extends to infinity in the direction of optimization, the objective function can improve indefinitely.",
    hint: "Objective can go to infinity.",
    level: "advanced",
    codeExample: "Max Z = x + y, x, y ≥ 0 → unbounded region"
  },
  {
    question: "How do you test if a point is in the feasible region?",
    shortAnswer: "Substitute the point into ALL constraints and verify each is satisfied.",
    explanation: "A point is feasible if it satisfies every single constraint. Test each constraint with the point.",
    hint: "Check all constraints.",
    level: "intermediate",
    codeExample: "Check (4,2) in 2x+y≤10 and x+2y≤8"
  },
  {
    question: "What is the relationship between constraints and the feasible region?",
    shortAnswer: "Each constraint defines a boundary of the feasible region.",
    explanation: "Constraints are the 'walls' that enclose the feasible region. Each constraint removes points that don't satisfy it.",
    hint: "Constraints define the boundaries.",
    level: "intermediate",
    codeExample: "2x+y≤10 is one boundary of the feasible region"
  },
  {
    question: "How do you identify redundant constraints?",
    shortAnswer: "Constraints that don't affect the feasible region shape are redundant.",
    explanation: "If a constraint never forms part of the feasible region boundary, it's redundant. The region would be the same without it.",
    hint: "Constraint that doesn't change the region.",
    level: "advanced",
    codeExample: "x≤10 is redundant if region is x≤5"
  },
  {
    question: "What is a half-plane in LP?",
    shortAnswer: "The region on one side of a constraint line.",
    explanation: "Each constraint divides the plane into two half-planes. The feasible side is the half-plane that satisfies the constraint.",
    hint: "Side of a constraint line.",
    level: "intermediate",
    codeExample: "Below 2x+y=10 is one half-plane"
  },
  {
    question: "How do you shade the feasible side of a constraint?",
    shortAnswer: "Test a point not on the line. If it satisfies the constraint, shade that side.",
    explanation: "Choose a test point (usually (0,0)). If it satisfies the inequality, the feasible side contains the test point.",
    hint: "Test a point, shade accordingly.",
    level: "intermediate",
    codeExample: "Test (0,0): 0≤10 → shade side with origin"
  },
  {
    question: "What is the difference between feasible and optimal?",
    shortAnswer: "Feasible means satisfies all constraints; optimal is the best feasible solution.",
    explanation: "A feasible solution is any point in the feasible region. The optimal solution is the feasible point that gives the best objective value.",
    hint: "Feasible = valid, Optimal = best valid.",
    level: "basic",
    codeExample: "All points in region are feasible; the best one is optimal"
  },
  {
    question: "How do you find the corners of the feasible region?",
    shortAnswer: "Find intersections of constraint lines that bound the region.",
    explanation: "Solve pairs of constraint equations to find intersection points. Only intersections that lie in the feasible region are corners.",
    hint: "Intersections of boundary lines.",
    level: "advanced",
    codeExample: "Solve 2x+y=10 and x+2y=8 → (4,2)"
  },
  {
    question: "What is the convexity property of the feasible region?",
    shortAnswer: "The line segment between any two points in the region is also in the region.",
    explanation: "Convexity means the feasible region has no indentations. This property is essential for LP's corner-point theorem.",
    hint: "Region has no indentations.",
    level: "advanced",
    codeExample: "If A and B are feasible, all points between them are feasible"
  }
];

export default questions;