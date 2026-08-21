const questions = [
  {
    question: "What is a bounded feasible region?",
    shortAnswer: "A region that is enclosed on all sides and has finite area.",
    explanation: "A bounded region has constraints that limit the variables in all directions. You can draw a circle around the entire region.",
    hint: "Finite area, enclosed.",
    level: "basic",
    codeExample: "x≥0, y≥0, x+y≤10 is bounded."
  },
  {
    question: "What is an unbounded feasible region?",
    shortAnswer: "A region that extends infinitely in at least one direction.",
    explanation: "An unbounded region has no constraints in some direction, so it goes on forever.",
    hint: "Infinite area.",
    level: "basic",
    codeExample: "x≥0, y≥0 alone is unbounded."
  },
  {
    question: "How can you tell if a region is bounded from its constraints?",
    shortAnswer: "Look for ≤ constraints that provide upper bounds on all variables.",
    explanation: "If there are upper bounds (≤ constraints) in both x and y directions, the region is likely bounded.",
    hint: "Upper bounds = bounded.",
    level: "intermediate",
    codeExample: "x≤10 and y≤10 with x≥0, y≥0 is bounded."
  },
  {
    question: "Can a region be bounded with only ≥ constraints?",
    shortAnswer: "No, ≥ constraints alone create an unbounded region.",
    explanation: "≥ constraints are minimum requirements — they don't provide upper bounds, so the region extends to infinity.",
    hint: "Minimum requirements = unbounded.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≥4 is unbounded."
  },
  {
    question: "What is the difference between bounded and unbounded optimization?",
    shortAnswer: "Bounded problems always have an optimal solution; unbounded may not.",
    explanation: "In a bounded region, the objective has a maximum and minimum. In an unbounded region, the objective may go to infinity.",
    hint: "Bounded = optimal always exists.",
    level: "intermediate",
    codeExample: "Maximize Z=x+y subject to x+y≤10 (bounded)."
  },
  {
    question: "Can an unbounded region still have an optimal solution?",
    shortAnswer: "Yes, for minimization problems or when the objective direction is bounded.",
    explanation: "If the objective function decreases as variables increase, minimization still works in an unbounded region.",
    hint: "Minimization often works.",
    level: "intermediate",
    codeExample: "Minimize Z=x+y subject to x+y≥4 (optimal at (0,4) or (4,0))."
  },
  {
    question: "What happens to a maximization problem in an unbounded region?",
    shortAnswer: "The objective function may be unbounded (go to infinity).",
    explanation: "If the region extends in the direction that increases the objective, there's no finite maximum.",
    hint: "May be unbounded.",
    level: "intermediate",
    codeExample: "Maximize Z=x+y subject to x+y≥4 → Z can go to ∞."
  },
  {
    question: "Why does non-negativity alone create an unbounded region?",
    shortAnswer: "Because x≥0 and y≥0 have no upper limits.",
    explanation: "Without upper bound constraints, x and y can grow indefinitely, making the region unbounded.",
    hint: "No upper limits.",
    level: "basic",
    codeExample: "x≥0, y≥0 is unbounded."
  },
  {
    question: "What is the shape of a bounded feasible region?",
    shortAnswer: "A convex polygon (like a triangle, quadrilateral, etc.).",
    explanation: "Bounded regions are always closed polygons with straight edges and finite area.",
    hint: "Closed polygon.",
    level: "basic",
    codeExample: "Triangle, rectangle, pentagon."
  },
  {
    question: "What is the shape of an unbounded feasible region?",
    shortAnswer: "An open polygon that extends to infinity.",
    explanation: "Unbounded regions have at least one side open, allowing the region to go on forever.",
    hint: "Open polygon.",
    level: "basic",
    codeExample: "A half-plane or region with an open side."
  },
  {
    question: "Can a bounded region have an empty interior?",
    shortAnswer: "Yes, it could be a line segment or a single point (degenerate cases).",
    explanation: "If constraints are very tight, the region may have no area.",
    hint: "Degenerate cases.",
    level: "expert",
    codeExample: "x+y=10, x≥0, y≥0 is a line segment."
  },
  {
    question: "How do you check if a region is bounded graphically?",
    shortAnswer: "See if the region stays within the graph or extends off the page.",
    explanation: "If the region goes off the graph in any direction, it's unbounded.",
    hint: "Look at the edges.",
    level: "basic",
    codeExample: "If it goes off the page, it's unbounded."
  },
  {
    question: "What is the relationship between constraints and boundedness?",
    shortAnswer: "Upper-bound constraints (≤) create boundedness; lower-bound constraints (≥) create unboundedness.",
    explanation: "≤ constraints limit variables from above, while ≥ constraints only limit from below.",
    hint: "≤ bounds; ≥ doesn't.",
    level: "intermediate",
    codeExample: "x≤10 bounds x; x≥10 doesn't."
  },
  {
    question: "Can a region be bounded in one direction and unbounded in another?",
    shortAnswer: "If it's unbounded in any direction, the whole region is considered unbounded.",
    explanation: "Boundedness requires being closed in all directions.",
    hint: "All directions must be closed.",
    level: "intermediate",
    codeExample: "x≤10, y≥0 is unbounded (y can go to ∞)."
  },
  {
    question: "What are the implications of unboundedness for the simplex method?",
    shortAnswer: "The simplex method may fail to find an optimal solution.",
    explanation: "If the problem is unbounded, the simplex algorithm will continue indefinitely.",
    hint: "Simplex may not terminate.",
    level: "expert",
    codeExample: "Unbounded problems require special handling."
  },
  {
    question: "Is a bounded region always convex?",
    shortAnswer: "Yes, all feasible regions (bounded or unbounded) are convex.",
    explanation: "Convexity is a property of LP feasible regions regardless of boundedness.",
    hint: "Always convex.",
    level: "intermediate",
    codeExample: "All LP feasible regions are convex."
  },
  {
    question: "Can a bounded region have infinitely many corner points?",
    shortAnswer: "No, a bounded region always has a finite number of corner points.",
    explanation: "Bounded polygonal regions have a finite number of vertices.",
    hint: "Finite corners.",
    level: "intermediate",
    codeExample: "A rectangle has 4 corner points."
  },
  {
    question: "Can an unbounded region have finitely many corner points?",
    shortAnswer: "Yes, an unbounded region can have a finite number of corner points.",
    explanation: "The region is still polygonal but has at least one open side.",
    hint: "Finite corners possible.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≥4 has 2 corner points."
  },
  {
    question: "What is the difference between bounded and unbounded in real-world terms?",
    shortAnswer: "Bounded: limited resources; Unbounded: no limit in some aspect.",
    explanation: "Most real-world problems are bounded because resources are finite.",
    hint: "Finite vs infinite resources.",
    level: "basic",
    codeExample: "Limited budget = bounded; unlimited time = unbounded."
  },
  {
    question: "How do you know if a maximization problem is unbounded?",
    shortAnswer: "If the objective can increase without limit in the feasible region.",
    explanation: "Check if there's a direction in the region that increases the objective indefinitely.",
    hint: "Objective goes to ∞.",
    level: "intermediate",
    codeExample: "Maximize Z=x+y with x+y≥4 → unbounded."
  },
  {
    question: "How do you know if a minimization problem is unbounded?",
    shortAnswer: "If the objective can decrease without limit in the feasible region.",
    explanation: "Check if there's a direction that decreases the objective indefinitely.",
    hint: "Objective goes to -∞.",
    level: "intermediate",
    codeExample: "Minimize Z=x+y with x+y≤-4 (if non-negativity not enforced)."
  },
  {
    question: "Can a bounded region have an unbounded objective?",
    shortAnswer: "No, the objective is bounded on a bounded region.",
    explanation: "A continuous function on a compact (bounded and closed) set has a maximum and minimum.",
    hint: "Objective is bounded.",
    level: "intermediate",
    codeExample: "Any linear function on a bounded region has a finite optimum."
  },
  {
    question: "What is the significance of boundedness in LP?",
    shortAnswer: "It guarantees an optimal solution exists.",
    explanation: "Bounded regions ensure the objective has both a maximum and minimum.",
    hint: "Guarantees optimality.",
    level: "intermediate",
    codeExample: "Bounded = optimal exists."
  },
  {
    question: "Can you have a bounded region with both ≤ and ≥ constraints?",
    shortAnswer: "Yes, if the ≤ constraints provide the upper bounds.",
    explanation: "Mixed constraints can create bounded regions if the ≤ constraints close the region.",
    hint: "≤ constraints provide bounds.",
    level: "intermediate",
    codeExample: "x+y≥4 and x+y≤10 with non-negativity is bounded (a band)."
  },
  {
    question: "What is the simplest bounded region?",
    shortAnswer: "A triangle formed by x≥0, y≥0, and x+y≤10.",
    explanation: "This is the most common example of a bounded region in LP.",
    hint: "Triangle with axes.",
    level: "basic",
    codeExample: "The triangle with vertices (0,0), (10,0), (0,10)."
  },
  {
    question: "What is the simplest unbounded region?",
    shortAnswer: "The first quadrant: x≥0, y≥0.",
    explanation: "Without any upper bounds, the first quadrant extends infinitely.",
    hint: "First quadrant.",
    level: "basic",
    codeExample: "x≥0, y≥0 is unbounded."
  },
  {
    question: "Is the feasible region always bounded in textbook problems?",
    shortAnswer: "Often, but not always — many textbook problems are designed with bounded regions for simplicity.",
    explanation: "Bounded regions are easier to solve graphically and guarantee optimal solutions.",
    hint: "Common in textbooks.",
    level: "basic",
    codeExample: "Most LP textbook problems are bounded."
  },
  {
    question: "What happens if you try to solve an unbounded maximization problem graphically?",
    shortAnswer: "The objective line will move off the graph without reaching a maximum.",
    explanation: "You can keep increasing the objective value indefinitely.",
    hint: "No maximum found.",
    level: "intermediate",
    codeExample: "The iso-profit line keeps moving to infinity."
  },
  {
    question: "How do you determine boundedness algebraically?",
    shortAnswer: "Check if there are upper bounds on all variables.",
    explanation: "If every variable has a finite upper bound from constraints, the region is bounded.",
    hint: "Check upper bounds.",
    level: "expert",
    codeExample: "If x≤M and y≤N for some M,N, it's bounded."
  },
  {
    question: "Can adding a constraint make an unbounded region bounded?",
    shortAnswer: "Yes, adding an upper-bound constraint can bound an unbounded region.",
    explanation: "For example, adding x+y≤10 to x≥0, y≥0 makes it bounded.",
    hint: "Add upper bounds.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≤10 → bounded."
  },
  {
    question: "What is the relationship between boundedness and corner points?",
    shortAnswer: "Bounded regions have a finite number of corner points; unbounded regions may have finite or infinite.",
    explanation: "Corner points exist in both, but bounded regions always have a finite set.",
    hint: "Finite corners in bounded.",
    level: "intermediate",
    codeExample: "Bounded = finite corners; unbounded = may be finite or infinite."
  }
];

export default questions;