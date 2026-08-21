const questions = [
  {
    question: "What is the feasible region in linear programming?",
    shortAnswer: "The set of all points that satisfy all constraints simultaneously.",
    explanation: "It's the intersection of all constraint half-planes. Any point in this region is a feasible solution to the LP problem.",
    hint: "The overlap of all constraints.",
    level: "basic",
    codeExample: "The overlapping shaded area on the graph."
  },
  {
    question: "Why is the feasible region convex?",
    shortAnswer: "Because it's the intersection of half-planes, and the intersection of convex sets is convex.",
    explanation: "Each constraint defines a convex half-plane. The intersection of convex sets is always convex.",
    hint: "Intersection of convex sets.",
    level: "intermediate",
    codeExample: "A line segment between any two feasible points stays feasible."
  },
  {
    question: "What shape is the feasible region?",
    shortAnswer: "It's a polygon (bounded or unbounded) with straight edges.",
    explanation: "The boundaries are linear constraints, so the region is polygonal.",
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
    question: "What is a feasible point?",
    shortAnswer: "A point that satisfies all constraints of the LP problem.",
    explanation: "Any point in the feasible region is a feasible point. It's a valid solution candidate.",
    hint: "A point in the feasible region.",
    level: "basic",
    codeExample: "(2,3) is feasible if it satisfies all constraints."
  },
  {
    question: "What is an infeasible point?",
    shortAnswer: "A point that violates at least one constraint.",
    explanation: "An infeasible point is outside the feasible region. It cannot be a solution.",
    hint: "Violates at least one constraint.",
    level: "basic",
    codeExample: "(10,10) is infeasible if it violates x+y≤10."
  },
  {
    question: "How do you check if a point is feasible?",
    shortAnswer: "Substitute the point into every constraint. It must satisfy all.",
    explanation: "A point is feasible only if it makes every inequality true.",
    hint: "Must satisfy all constraints.",
    level: "basic",
    codeExample: "Check (2,3) in all constraints."
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
    question: "How many corner points can a feasible region have?",
    shortAnswer: "Any number, depending on the number of constraints.",
    explanation: "A region with n constraints can have up to n corner points (in 2D).",
    hint: "Depends on constraints.",
    level: "intermediate",
    codeExample: "3 constraints can form a triangle (3 corner points)."
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
    question: "What happens if the feasible region is unbounded?",
    shortAnswer: "The region extends infinitely in some direction.",
    explanation: "This happens when constraints don't bound the region in all directions. The objective may be unbounded.",
    hint: "Region goes to infinity.",
    level: "intermediate",
    codeExample: "x≥0, y≥0 alone is unbounded."
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
  },
  {
    question: "Why is the feasible region important in LP?",
    shortAnswer: "It contains all possible solutions to the LP problem.",
    explanation: "Any feasible solution must be in this region. The optimal solution is the best point in this region.",
    hint: "It's the solution space.",
    level: "basic",
    codeExample: "All valid (x,y) combinations are in the feasible region."
  },
  {
    question: "Can the feasible region be unbounded even with non-negativity?",
    shortAnswer: "Yes, if there are no upper bounds on the variables.",
    explanation: "Even with x≥0 and y≥0, the region can extend infinitely if there are no upper-bound constraints.",
    hint: "Unbounded is possible.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≥5 is unbounded."
  },
  {
    question: "What is a redundant constraint?",
    shortAnswer: "A constraint that doesn't affect the feasible region.",
    explanation: "A redundant constraint is one whose removal doesn't change the feasible region.",
    hint: "Doesn't change the region.",
    level: "expert",
    codeExample: "With x≥0, y≥0, x+y≤10, the constraint x≤20 is redundant."
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
  }
];

export default questions;