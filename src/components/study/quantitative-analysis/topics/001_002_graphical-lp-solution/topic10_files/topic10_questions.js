const questions = [
  {
    question: "What is the common feasible region in linear programming?",
    shortAnswer: "The set of all points that satisfy every constraint simultaneously.",
    explanation: "It's the intersection of all constraint half-planes. Any point in this region is a feasible solution.",
    hint: "Where all constraints overlap.",
    level: "basic",
    codeExample: "The overlap of all shaded areas on the graph."
  },
  {
    question: "How do you find the common feasible region?",
    shortAnswer: "Plot all constraints, shade each, and find the overlapping area.",
    explanation: "The feasible region is the intersection of all shaded half-planes. Use light shading to see the overlap clearly.",
    hint: "Overlap of all shadings.",
    level: "basic",
    codeExample: "Shade each constraint and find the common area."
  },
  {
    question: "Is the feasible region always convex?",
    shortAnswer: "Yes, the feasible region of a linear programming problem is always convex.",
    explanation: "Convex means any line segment between two points in the region stays within the region.",
    hint: "Always convex.",
    level: "intermediate",
    codeExample: "The region is a convex polygon."
  },
  {
    question: "What shape is the feasible region?",
    shortAnswer: "It's a polygon (bounded or unbounded) with straight edges.",
    explanation: "The boundaries are the constraint lines, so the region is polygonal.",
    hint: "Polygon shape.",
    level: "basic",
    codeExample: "Triangle, quadrilateral, pentagon, etc."
  },
  {
    question: "Can the feasible region be empty?",
    shortAnswer: "Yes, if constraints conflict and have no common solution.",
    explanation: "If constraints contradict (e.g., x≤3 and x≥5), there's no feasible region — the problem is infeasible.",
    hint: "No overlap = infeasible.",
    level: "intermediate",
    codeExample: "x≤3 and x≥5 → infeasible."
  },
  {
    question: "What are corner points of the feasible region?",
    shortAnswer: "The vertices where two or more constraint lines intersect.",
    explanation: "Corner points are the 'corners' of the feasible region. Optimal solutions occur at these points.",
    hint: "Intersections of constraints.",
    level: "intermediate",
    codeExample: "Intersection of x+y=10 and 2x+y=12 gives a corner point."
  },
  {
    question: "How many corner points can a feasible region have?",
    shortAnswer: "Any number, depending on the number of constraints.",
    explanation: "A region with n constraints can have up to n corner points (in 2D).",
    hint: "Depends on constraints.",
    level: "intermediate",
    codeExample: "3 constraints can form a triangle (3 corner points)."
  },
  {
    question: "What is the corner-point principle?",
    shortAnswer: "The optimal solution of an LP problem occurs at a corner point of the feasible region.",
    explanation: "This is the fundamental principle of LP. It means we only need to check corner points, not every point in the region.",
    hint: "Optimum is at a corner.",
    level: "intermediate",
    codeExample: "Evaluate the objective function at all vertices."
  },
  {
    question: "Why is the feasible region important?",
    shortAnswer: "It contains all possible solutions to the LP problem.",
    explanation: "Any feasible solution must be in this region. The optimal solution is the best point in this region.",
    hint: "It's the solution space.",
    level: "basic",
    codeExample: "All valid (x,y) combinations are in the feasible region."
  },
  {
    question: "How do you check if a point is in the feasible region?",
    shortAnswer: "Substitute the point into every constraint. It must satisfy all.",
    explanation: "A point is feasible only if it makes every inequality true.",
    hint: "Must satisfy all constraints.",
    level: "basic",
    codeExample: "Check (2,3) in all constraints."
  },
  {
    question: "What happens if the feasible region is unbounded?",
    shortAnswer: "The region extends infinitely in some direction.",
    explanation: "This happens when constraints don't bound the region in all directions. The objective may be unbounded.",
    hint: "Region goes to infinity.",
    level: "intermediate",
    codeExample: "x≥0, y≥0 alone is unbounded."
  },
  {
    question: "Can the feasible region be a single point?",
    shortAnswer: "Yes, if constraints are tight and only one point satisfies all.",
    explanation: "This is a degenerate case where the constraints intersect at exactly one point.",
    hint: "One unique solution.",
    level: "expert",
    codeExample: "x=3, y=4, x+y=7 → feasible region is (3,4) only."
  },
  {
    question: "What is the relationship between constraints and the feasible region?",
    shortAnswer: "Constraints define the boundaries of the feasible region.",
    explanation: "Each constraint is a line that forms part of the boundary. The feasible region is the intersection of all constraint half-planes.",
    hint: "Constraints are boundaries.",
    level: "basic",
    codeExample: "Each constraint contributes a line to the boundary."
  },
  {
    question: "How do you identify the feasible region on a graph?",
    shortAnswer: "Look for the area that is shaded by all constraints.",
    explanation: "The feasible region is the common area where every constraint's shading overlaps.",
    hint: "Where all shadings overlap.",
    level: "basic",
    codeExample: "The overlapping shaded area."
  },
  {
    question: "What is the difference between the feasible region and a constraint?",
    shortAnswer: "A constraint is a single limitation; the feasible region is the set of all points satisfying all constraints.",
    explanation: "Each constraint defines a half-plane. The feasible region is the intersection of all half-planes.",
    hint: "Constraint = one rule; feasible region = all rules together.",
    level: "basic",
    codeExample: "Constraint: x+y≤10; Feasible region: all points satisfying x+y≤10, x≥0, y≥0, etc."
  },
  {
    question: "Can the feasible region have curved boundaries?",
    shortAnswer: "No, in linear programming, boundaries are always straight lines.",
    explanation: "LP constraints are linear, so boundaries are straight lines. The region is always polygonal.",
    hint: "Straight edges only.",
    level: "basic",
    codeExample: "All boundaries are straight lines."
  },
  {
    question: "What is the role of non-negativity in the feasible region?",
    shortAnswer: "It restricts the feasible region to the first quadrant.",
    explanation: "x≥0 and y≥0 ensure the feasible region is in the first quadrant (x≥0, y≥0).",
    hint: "Keeps solutions in QI.",
    level: "basic",
    codeExample: "Feasible region is in QI only."
  },
  {
    question: "How do you find the vertices of the feasible region?",
    shortAnswer: "Solve pairs of constraint equations to find their intersections.",
    explanation: "Each vertex is where two constraint lines intersect. Check that the point satisfies all constraints.",
    hint: "Intersections of constraints.",
    level: "intermediate",
    codeExample: "Solve x+y=10 and 2x+y=12 to find a vertex."
  },
  {
    question: "What is a bounded feasible region?",
    shortAnswer: "A region that is enclosed and has finite area.",
    explanation: "A bounded region has constraints that close it in all directions.",
    hint: "Finite area.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≤10 is bounded."
  },
  {
    question: "What is an unbounded feasible region?",
    shortAnswer: "A region that extends infinitely in some direction.",
    explanation: "An unbounded region has no constraints in some direction, so it goes to infinity.",
    hint: "Goes to infinity.",
    level: "intermediate",
    codeExample: "x≥0, y≥0 alone is unbounded."
  },
  {
    question: "Can the feasible region be empty with non-negativity?",
    shortAnswer: "Yes, if other constraints conflict with non-negativity.",
    explanation: "Even with x≥0 and y≥0, constraints can conflict (e.g., x+y≤-5 is impossible with non-negativity).",
    hint: "Still can be empty.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≤-5 → infeasible."
  },
  {
    question: "How do you shade the feasible region?",
    shortAnswer: "Shade the overlap of all constraint shadings.",
    explanation: "After plotting and shading each constraint, the feasible region is the common shaded area.",
    hint: "Overlap of all shadings.",
    level: "basic",
    codeExample: "Shade the area where all constraints are satisfied."
  },
  {
    question: "What is the feasible region in a maximization problem?",
    shortAnswer: "The same as any LP — all points satisfying all constraints.",
    explanation: "The feasible region is independent of the objective. It's the same for maximization and minimization.",
    hint: "Same region, different objective.",
    level: "basic",
    codeExample: "Feasible region is the same for max and min problems."
  },
  {
    question: "How do you know if a constraint is redundant?",
    shortAnswer: "If removing it doesn't change the feasible region.",
    explanation: "A redundant constraint doesn't affect the shape of the feasible region.",
    hint: "Doesn't change the region.",
    level: "expert",
    codeExample: "If removing x≤20 doesn't change the region, it's redundant."
  },
  {
    question: "What is the maximum number of constraints you can graph?",
    shortAnswer: "Practically 3-5 constraints, but mathematically any number.",
    explanation: "The graphical method becomes messy with many constraints. Beyond 4-5, the simplex method is preferred.",
    hint: "3-5 is practical.",
    level: "intermediate",
    codeExample: "4 constraints is common in textbook problems."
  },
  {
    question: "Can the feasible region have a hole?",
    shortAnswer: "No, the feasible region is always convex and has no holes.",
    explanation: "LP feasible regions are convex polytopes, which cannot have holes.",
    hint: "No holes.",
    level: "expert",
    codeExample: "The region is always a solid polygon."
  },
  {
    question: "What is the difference between the feasible region and the solution set?",
    shortAnswer: "They are the same thing — all points satisfying all constraints.",
    explanation: "The feasible region is the graphical representation of the solution set.",
    hint: "Same concept.",
    level: "basic",
    codeExample: "The feasible region IS the solution set."
  },
  {
    question: "How do you find the feasible region with mixed inequalities?",
    shortAnswer: "Shade each constraint appropriately; the feasible region is the overlap.",
    explanation: "Some constraints are ≤ (shade below/left) and some are ≥ (shade above/right). The overlap of all gives the feasible region.",
    hint: "Overlap of all shadings.",
    level: "intermediate",
    codeExample: "x+y≤10 (shade below) and x+y≥5 (shade above) → overlap between 5 and 10."
  },
  {
    question: "Can the feasible region be a line segment?",
    shortAnswer: "Yes, in degenerate cases where constraints are parallel or redundant.",
    explanation: "If the region has no area, it can be a line segment (or a single point).",
    hint: "Degenerate case.",
    level: "expert",
    codeExample: "x+y=10, x≥0, y≥0 → feasible region is a line segment."
  },
  {
    question: "What is the first step in finding the feasible region?",
    shortAnswer: "List all constraints and identify their types (≤, ≥, =).",
    explanation: "Before graphing, write down every constraint and determine if it's solid/dashed and which side to shade.",
    hint: "List and classify.",
    level: "basic",
    codeExample: "Constraints: x≥0, y≥0, x+y≤10, 2x+y≤12."
  },
  {
    question: "How do you handle equality constraints in the feasible region?",
    shortAnswer: "Equality constraints (=) reduce the region to a line (no shading).",
    explanation: "Equality constraints don't define a half-plane; they only define the line itself. The feasible region is the intersection of that line with the other constraints.",
    hint: "Equality = line only.",
    level: "intermediate",
    codeExample: "x + y = 10 restricts the region to that line."
  }
];

export default questions;