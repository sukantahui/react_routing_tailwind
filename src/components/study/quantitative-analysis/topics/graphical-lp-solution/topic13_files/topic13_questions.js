const questions = [
  {
    question: "What is a corner point in linear programming?",
    shortAnswer: "A vertex of the feasible region where two or more constraint lines intersect.",
    explanation: "Corner points (or extreme points) are the 'corners' of the feasible region. They are formed by the intersection of constraint lines.",
    hint: "Intersections of constraints.",
    level: "basic",
    codeExample: "Intersection of x+y=10 and x=0 gives (0,10)."
  },
  {
    question: "What is an extreme point?",
    shortAnswer: "A point that cannot be expressed as a convex combination of two other distinct points in the feasible region.",
    explanation: "Extreme points are the same as corner points. They are the 'sharp' points of the feasible region.",
    hint: "Same as corner point.",
    level: "intermediate",
    codeExample: "A corner point of a polygon."
  },
  {
    question: "Why are corner points important in LP?",
    shortAnswer: "Because the optimal solution of an LP problem always occurs at a corner point.",
    explanation: "This is the corner-point principle — the foundation of linear programming.",
    hint: "Optimum is at a corner.",
    level: "basic",
    codeExample: "Evaluate the objective at all corners."
  },
  {
    question: "What is the corner-point principle?",
    shortAnswer: "The optimal solution of any LP problem occurs at a corner point of the feasible region.",
    explanation: "This principle allows us to only check corner points instead of every point in the feasible region.",
    hint: "Optimum at corners.",
    level: "intermediate",
    codeExample: "Check all vertices of the feasible region."
  },
  {
    question: "How many corner points can a feasible region have?",
    shortAnswer: "Any number, depending on the number of constraints.",
    explanation: "A region with n constraints can have up to n corner points (in 2D).",
    hint: "Depends on constraints.",
    level: "intermediate",
    codeExample: "3 constraints can form a triangle (3 corners)."
  },
  {
    question: "How do you find corner points graphically?",
    shortAnswer: "Look for the vertices of the feasible region where constraint lines intersect.",
    explanation: "On a graph, corner points are the 'corners' of the shaded feasible region.",
    hint: "Corners of the shaded region.",
    level: "basic",
    codeExample: "The vertices of the polygon."
  },
  {
    question: "How do you find corner points algebraically?",
    shortAnswer: "Solve pairs of constraint equations simultaneously.",
    explanation: "Each corner point is the intersection of two constraint lines. Solve two equations at a time.",
    hint: "Solve two equations.",
    level: "intermediate",
    codeExample: "Solve x+y=10 and 2x+y=14 → (4,6)."
  },
  {
    question: "Can a corner point be on an axis?",
    shortAnswer: "Yes, corner points often occur on axes due to non-negativity constraints.",
    explanation: "Points like (0,0), (x,0), and (0,y) are common corner points.",
    hint: "Axes points are corners.",
    level: "basic",
    codeExample: "(0,10) is a corner point on the y-axis."
  },
  {
    question: "Can an unbounded region have corner points?",
    shortAnswer: "Yes, unbounded regions can have corner points.",
    explanation: "Even though the region extends infinitely, it can still have vertices.",
    hint: "Unbounded can have corners.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≥4 has corners (0,4) and (4,0)."
  },
  {
    question: "What is the relationship between corner points and constraints?",
    shortAnswer: "Each corner point is the intersection of two or more constraints.",
    explanation: "Corner points occur where constraint lines meet. The number of constraints at a corner equals the number of variables (2 in 2D).",
    hint: "Intersection of constraints.",
    level: "intermediate",
    codeExample: "At a corner, two constraints are binding."
  },
  {
    question: "What is a binding constraint at a corner point?",
    shortAnswer: "A constraint that holds as an equality at that corner point.",
    explanation: "At a corner point, the constraints that intersect are binding (active).",
    hint: "Active constraint.",
    level: "intermediate",
    codeExample: "At (4,3), both x+y=10 and 2x+y=14 are binding."
  },
  {
    question: "What is a non-binding constraint at a corner point?",
    shortAnswer: "A constraint that is not tight (has slack) at that corner point.",
    explanation: "Non-binding constraints don't affect the corner point — there's room to move.",
    hint: "Has slack.",
    level: "intermediate",
    codeExample: "At (0,0), x+y≤10 is non-binding (slack=10)."
  },
  {
    question: "Can a corner point be on just one constraint?",
    shortAnswer: "No, in 2D a corner point is where two constraints intersect.",
    explanation: "A single constraint is a line, not a corner. Two lines are needed to form a point.",
    hint: "Two constraints needed.",
    level: "basic",
    codeExample: "A point on one line isn't a corner (it's on an edge)."
  },
  {
    question: "What is the difference between a corner point and an edge point?",
    shortAnswer: "A corner point is a vertex; an edge point lies on a constraint line between two corners.",
    explanation: "Edge points are on the boundary but not at the corners. They satisfy at least one constraint as equality.",
    hint: "Corner = vertex; edge = on line.",
    level: "intermediate",
    codeExample: "(5,5) on x+y=10 is an edge point, not a corner."
  },
  {
    question: "Why can't the optimal solution be at an edge point?",
    shortAnswer: "Because linear functions change linearly along an edge — the optimum must be at an endpoint.",
    explanation: "Along an edge, the objective is a linear function. Its maximum or minimum occurs at one of the endpoints (corner points).",
    hint: "Linear function → endpoints.",
    level: "intermediate",
    codeExample: "The objective increases or decreases linearly along an edge."
  },
  {
    question: "What is the minimum number of corner points in a bounded region?",
    shortAnswer: "3 (a triangle).",
    explanation: "The simplest bounded feasible region is a triangle with 3 corner points.",
    hint: "Triangle = 3 corners.",
    level: "basic",
    codeExample: "x≥0, y≥0, x+y≤10 → 3 corners."
  },
  {
    question: "What is the maximum number of corner points in a bounded region?",
    shortAnswer: "It depends on the number of constraints, but there's no fixed maximum.",
    explanation: "More constraints can create more corner points, but the number is finite.",
    hint: "Depends on constraints.",
    level: "intermediate",
    codeExample: "A decagon has 10 corners."
  },
  {
    question: "Can a feasible region have no corner points?",
    shortAnswer: "Yes, if the region is empty or a single line (degenerate).",
    explanation: "An empty region has no points. A line segment has only endpoints (which are corners).",
    hint: "Empty or line segment.",
    level: "expert",
    codeExample: "x=5 (line) has no area but has endpoints if bounded."
  },
  {
    question: "How do you check if a point is a corner point?",
    shortAnswer: "Check if it satisfies two or more constraints as equalities.",
    explanation: "A corner point is where two constraints are binding (active).",
    hint: "Two constraints active.",
    level: "intermediate",
    codeExample: "At (4,3), both x+y=10 and 2x+y=14 are binding."
  },
  {
    question: "What is the relationship between corner points and the simplex method?",
    shortAnswer: "The simplex method moves from one corner point to an adjacent one to find the optimum.",
    explanation: "The simplex algorithm starts at a corner point and moves to neighboring corners until the optimum is found.",
    hint: "Simplex moves between corners.",
    level: "expert",
    codeExample: "The algorithm traverses corner points."
  },
  {
    question: "Can a corner point be infeasible?",
    shortAnswer: "No, by definition a corner point is a vertex of the feasible region and thus feasible.",
    explanation: "A corner point must satisfy all constraints. If it doesn't, it's not a corner of the feasible region.",
    hint: "Must be feasible.",
    level: "basic",
    codeExample: "All corner points are feasible by definition."
  },
  {
    question: "What is the difference between a corner point and an extreme point?",
    shortAnswer: "They are the same thing — used interchangeably in LP.",
    explanation: "Both terms refer to the vertices of the feasible region.",
    hint: "Same concept.",
    level: "basic",
    codeExample: "Corner point = extreme point."
  },
  {
    question: "Why do we only evaluate corner points for optimality?",
    shortAnswer: "Because the objective function is linear and its optimum on a convex polygon is at a vertex.",
    explanation: "Linear functions on convex sets attain their maximum and minimum at extreme points.",
    hint: "Linear → convex → vertex.",
    level: "intermediate",
    codeExample: "Only need to check corners."
  },
  {
    question: "Can an optimal solution occur at multiple corner points?",
    shortAnswer: "Yes, this is called multiple optimal solutions.",
    explanation: "If the objective function is parallel to a constraint edge, multiple corner points (and the entire edge) are optimal.",
    hint: "Parallel objective.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → all points on the edge are optimal."
  },
  {
    question: "What is the first step in finding corner points?",
    shortAnswer: "Identify the feasible region by plotting all constraints.",
    explanation: "Before finding corners, you need to know the region where they exist.",
    hint: "Graph the region first.",
    level: "basic",
    codeExample: "Plot all constraints and shade the feasible region."
  },
  {
    question: "How do you find corner points when there are many constraints?",
    shortAnswer: "Systematically solve pairs of constraint equations.",
    explanation: "For each pair of constraints, solve them simultaneously. Check if the point satisfies all constraints.",
    hint: "Solve pairs systematically.",
    level: "expert",
    codeExample: "Solve each pair of equations from the constraints."
  },
  {
    question: "What is the significance of the origin as a corner point?",
    shortAnswer: "It's often a feasible corner point and a candidate for optimal solution.",
    explanation: "The origin (0,0) is a common corner point due to non-negativity constraints.",
    hint: "Origin is often a corner.",
    level: "basic",
    codeExample: "In x≥0, y≥0, origin is a corner point."
  },
  {
    question: "Can a corner point be on a dashed line?",
    shortAnswer: "No, dashed lines represent strict inequalities, so points on them are not feasible.",
    explanation: "If a constraint is strict (< or >), the line is dashed and points on it are not included in the feasible region.",
    hint: "Dashed = not included.",
    level: "intermediate",
    codeExample: "Points on x+y<10 are not feasible."
  },
  {
    question: "What is the relationship between corner points and slack variables?",
    shortAnswer: "At a corner point, at least two slack variables are zero (binding constraints).",
    explanation: "Binding constraints have zero slack. Corner points have exactly n binding constraints (n = number of variables).",
    hint: "Zero slack at corners.",
    level: "expert",
    codeExample: "At (4,3), constraints x+y=10 and 2x+y=14 have zero slack."
  },
  {
    question: "How do you label corner points on a graph?",
    shortAnswer: "Label them with their coordinates (e.g., A (4,3)) for easy reference.",
    explanation: "Clear labeling helps when evaluating the objective function at each corner.",
    hint: "Use clear labels.",
    level: "basic",
    codeExample: "A (0,0), B (4,0), C (2,2), D (0,4)."
  },
  {
    question: "Why is the corner-point principle so important?",
    shortAnswer: "It makes LP solvable by reducing the search space to a finite set of points.",
    explanation: "Without this principle, we would have to check infinitely many points.",
    hint: "Makes LP solvable.",
    level: "intermediate",
    codeExample: "Check only corners, not every point."
  }
];

export default questions;