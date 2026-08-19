const questions = [
  {
    question: "What is the corner-point principle?",
    shortAnswer: "The optimal solution of an LP problem occurs at a corner point of the feasible region.",
    explanation: "This principle states that if a linear programming problem has an optimal solution, it will be found at a vertex (corner point) of the feasible region.",
    hint: "Optimum at corners.",
    level: "basic",
    codeExample: "Check all corner points to find the optimum."
  },
  {
    question: "Why is the corner-point principle important?",
    shortAnswer: "It makes LP solvable by reducing the search to a finite set of points.",
    explanation: "Instead of checking infinitely many points in the feasible region, we only need to check the finite number of corner points.",
    hint: "Makes LP solvable.",
    level: "intermediate",
    codeExample: "Only check the corners, not every point."
  },
  {
    question: "Why does the corner-point principle work?",
    shortAnswer: "Because the feasible region is convex and the objective function is linear.",
    explanation: "On a convex polygon, a linear function attains its maximum and minimum at the vertices (corner points).",
    hint: "Convex + linear = corner optimality.",
    level: "intermediate",
    codeExample: "The maximum of a linear function on a polygon is at a vertex."
  },
  {
    question: "Does the corner-point principle apply to both maximization and minimization?",
    shortAnswer: "Yes, it applies to both.",
    explanation: "The principle holds for both maximization and minimization problems. The optimum (maximum or minimum) occurs at a corner point.",
    hint: "Works for both.",
    level: "basic",
    codeExample: "Max Z and min C are both at corner points."
  },
  {
    question: "Can multiple corner points be optimal?",
    shortAnswer: "Yes, if the objective line is parallel to a constraint edge.",
    explanation: "If the objective function has the same slope as a constraint, multiple corner points (and the entire edge) are optimal.",
    hint: "Multiple optima possible.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → both corners give Z=10."
  },
  {
    question: "What is the feasible region?",
    shortAnswer: "The set of all points that satisfy all constraints.",
    explanation: "The feasible region is the intersection of all constraint half-planes. It's always a convex polygon (or unbounded).",
    hint: "All constraints satisfied.",
    level: "basic",
    codeExample: "The overlapping shaded area."
  },
  {
    question: "What is a corner point?",
    shortAnswer: "A vertex of the feasible region where two or more constraint lines intersect.",
    explanation: "Corner points are the 'corners' of the feasible region. They are also called extreme points.",
    hint: "Intersection of constraints.",
    level: "basic",
    codeExample: "O, A, B, C, D in a pentagon."
  },
  {
    question: "What is an extreme point?",
    shortAnswer: "A point that cannot be expressed as a convex combination of other points in the region.",
    explanation: "Extreme points are the same as corner points. They are the 'sharp' points of the feasible region.",
    hint: "Same as corner point.",
    level: "intermediate",
    codeExample: "A corner point of a polygon."
  },
  {
    question: "How do you find the optimal solution using the corner-point principle?",
    shortAnswer: "Evaluate the objective function at all corner points and pick the best.",
    explanation: "Find all corner points, compute Z (or C) at each, and select the maximum (or minimum).",
    hint: "Check all corners.",
    level: "basic",
    codeExample: "Find Z at O, A, B, C, D and pick the highest."
  },
  {
    question: "What is the relationship between the corner-point principle and the simplex method?",
    shortAnswer: "The simplex method moves from one corner point to an adjacent one to find the optimum.",
    explanation: "The simplex method is based on the corner-point principle. It starts at a corner and moves to neighboring corners until the optimum is found.",
    hint: "Simplex moves between corners.",
    level: "expert",
    codeExample: "The algorithm traverses corner points."
  },
  {
    question: "Why can't the optimum be in the interior of the feasible region?",
    shortAnswer: "Because a linear function changes linearly, and the extreme values occur at the boundaries.",
    explanation: "If the optimum were in the interior, you could move in some direction to improve the objective, contradicting optimality.",
    hint: "Linear function → boundaries.",
    level: "intermediate",
    codeExample: "The objective can always be improved by moving to a boundary."
  },
  {
    question: "What if the feasible region is unbounded?",
    shortAnswer: "The optimum may still be at a corner point, or the objective may be unbounded.",
    explanation: "If the region extends in the direction of improvement, the objective may be unbounded (no finite optimum).",
    hint: "May be unbounded.",
    level: "intermediate",
    codeExample: "Maximize Z=x+y with x≥0, y≥0 → unbounded."
  },
  {
    question: "What is a convex set?",
    shortAnswer: "A set where any line segment between two points in the set stays in the set.",
    explanation: "The feasible region is convex. This property is essential for the corner-point principle.",
    hint: "Line segment stays in the set.",
    level: "intermediate",
    codeExample: "A polygon is convex if all interior angles are < 180°."
  },
  {
    question: "What is a linear function?",
    shortAnswer: "A function of the form Z = ax + by where a and b are constants.",
    explanation: "The objective function is linear. This linearity is what makes the corner-point principle work.",
    hint: "Z = ax + by.",
    level: "basic",
    codeExample: "Z = 3x + 4y is linear."
  },
  {
    question: "Can the corner-point principle fail?",
    shortAnswer: "No, for linear programming problems it always holds.",
    explanation: "The principle is a mathematical theorem. It holds for all linear programming problems.",
    hint: "Always holds.",
    level: "basic",
    codeExample: "The principle is guaranteed to work."
  },
  {
    question: "What is the difference between a corner point and an edge point?",
    shortAnswer: "A corner point is a vertex; an edge point lies along a boundary between corners.",
    explanation: "Edge points are on the boundary but not at the corners. The optimum is never at a non-corner edge point.",
    hint: "Corner = vertex; edge = on line.",
    level: "intermediate",
    codeExample: "(5,5) on x+y=10 is an edge point."
  },
  {
    question: "Why don't we need to check interior points?",
    shortAnswer: "Because the optimum of a linear function on a convex set is at an extreme point.",
    explanation: "Any interior point can be expressed as a convex combination of corner points. The objective value is a weighted average, so it can't be better than the best corner.",
    hint: "Interior is a combination of corners.",
    level: "intermediate",
    codeExample: "Interior points are never better than the best corner."
  },
  {
    question: "What is the significance of the corner-point principle in operations research?",
    shortAnswer: "It's the foundation of linear programming and the simplex method.",
    explanation: "The principle makes LP solvable in practice and is the basis for the simplex algorithm, which is one of the most important algorithms in operations research.",
    hint: "Foundation of LP.",
    level: "expert",
    codeExample: "The simplex method is based on this principle."
  },
  {
    question: "How do you identify corner points graphically?",
    shortAnswer: "Look for the vertices where constraint lines intersect.",
    explanation: "On a graph, corner points are the 'sharp' corners of the feasible region.",
    hint: "Look for the turns.",
    level: "basic",
    codeExample: "Where lines cross is a corner."
  },
  {
    question: "How do you identify corner points algebraically?",
    shortAnswer: "Solve pairs of constraint equations simultaneously.",
    explanation: "Each corner point is the intersection of two constraint lines. Solve two equations at a time.",
    hint: "Solve two equations.",
    level: "intermediate",
    codeExample: "Solve x+y=10 and 2x+y=14 → (4,6)."
  },
  {
    question: "What if the optimal solution is at a non-corner point?",
    shortAnswer: "This cannot happen in linear programming.",
    explanation: "The corner-point principle guarantees that the optimum is always at a corner point (or along an edge with multiple optima).",
    hint: "Cannot happen.",
    level: "basic",
    codeExample: "The optimum is always at a corner."
  },
  {
    question: "What is the relationship between the corner-point principle and the feasible region's convexity?",
    shortAnswer: "The principle relies on the feasible region being convex.",
    explanation: "Convexity ensures that the region is a polygon and that any point can be expressed as a combination of corners.",
    hint: "Convexity is essential.",
    level: "intermediate",
    codeExample: "The region must be convex for the principle to hold."
  },
  {
    question: "Can the corner-point principle be applied to non-linear problems?",
    shortAnswer: "No, it only applies to linear programming problems.",
    explanation: "For non-linear problems, the optimum may occur in the interior or at non-corner points.",
    hint: "Only for linear problems.",
    level: "expert",
    codeExample: "Non-linear problems are different."
  },
  {
    question: "What is the most important implication of the corner-point principle?",
    shortAnswer: "It reduces the search space from infinite to finite.",
    explanation: "Instead of checking infinitely many points, we only check the finite set of corner points.",
    hint: "Finite search.",
    level: "intermediate",
    codeExample: "Only check the corners."
  },
  {
    question: "How do you know if all corner points have been found?",
    shortAnswer: "Check all intersections of constraint lines that satisfy all constraints.",
    explanation: "Every corner point is an intersection of two constraint lines. Check all pairs and verify feasibility.",
    hint: "Check all intersections.",
    level: "expert",
    codeExample: "Solve all pairs of equations and check feasibility."
  },
  {
    question: "What is the role of non-negativity in the corner-point principle?",
    shortAnswer: "Non-negativity adds constraints that create additional corner points.",
    explanation: "Non-negativity (x≥0, y≥0) ensures the feasible region is in the first quadrant and adds corner points on the axes.",
    hint: "Adds axes constraints.",
    level: "intermediate",
    codeExample: "x=0 and y=0 are constraints that create corners."
  },
  {
    question: "Can the corner-point principle be used for problems with more than 2 variables?",
    shortAnswer: "Yes, the principle extends to higher dimensions.",
    explanation: "In higher dimensions, corner points become vertices of polytopes. The principle still holds.",
    hint: "Extends to higher dimensions.",
    level: "expert",
    codeExample: "In 3D, corner points are vertices of polyhedra."
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
    question: "What is the relationship between the corner-point principle and optimality?",
    shortAnswer: "The principle states that the optimal solution is always at a corner point.",
    explanation: "If an optimal solution exists, it will be at a corner point. This is the fundamental theorem of LP.",
    hint: "Optimum at corners.",
    level: "basic",
    codeExample: "The best solution is always at a corner."
  }
];

export default questions;