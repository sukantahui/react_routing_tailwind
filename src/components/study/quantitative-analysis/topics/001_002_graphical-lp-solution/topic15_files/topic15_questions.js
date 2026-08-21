const questions = [
  {
    question: "How do you find corner points algebraically?",
    shortAnswer: "Solve pairs of constraint equations simultaneously.",
    explanation: "Each corner point is the intersection of two constraint lines. Solve the system of two equations to find the coordinates.",
    hint: "Solve two equations.",
    level: "basic",
    codeExample: "Solve x+y=10 and 2x+y=14 → (4,6)."
  },
  {
    question: "What are the two main algebraic methods for solving systems?",
    shortAnswer: "Substitution and elimination.",
    explanation: "Substitution: solve one equation for a variable and substitute into the other. Elimination: add or subtract equations to eliminate a variable.",
    hint: "Substitution and elimination.",
    level: "basic",
    codeExample: "Use either method to solve the system."
  },
  {
    question: "When should you use the substitution method?",
    shortAnswer: "When one equation is easily solved for a variable (e.g., x = ... or y = ...).",
    explanation: "Substitution works well when one equation has a variable with coefficient 1 or -1.",
    hint: "Easy to isolate a variable.",
    level: "intermediate",
    codeExample: "x + y = 10 → y = 10 - x, then substitute."
  },
  {
    question: "When should you use the elimination method?",
    shortAnswer: "When coefficients align nicely to cancel a variable.",
    explanation: "Elimination works well when adding or subtracting equations eliminates a variable.",
    hint: "Coefficients align.",
    level: "intermediate",
    codeExample: "x+y=10 and 2x+y=14 → subtract to eliminate y."
  },
  {
    question: "How do you find a corner point with x=0?",
    shortAnswer: "Substitute x=0 into the other constraint and solve for y.",
    explanation: "The point is on the y-axis. The other constraint gives the y-coordinate.",
    hint: "Set x=0, solve for y.",
    level: "basic",
    codeExample: "2x+3y=12, x=0 → y=4 → (0,4)."
  },
  {
    question: "How do you find a corner point with y=0?",
    shortAnswer: "Substitute y=0 into the other constraint and solve for x.",
    explanation: "The point is on the x-axis. The other constraint gives the x-coordinate.",
    hint: "Set y=0, solve for x.",
    level: "basic",
    codeExample: "2x+3y=12, y=0 → x=6 → (6,0)."
  },
  {
    question: "What is the first step in finding corner points algebraically?",
    shortAnswer: "List all constraints and identify pairs that intersect.",
    explanation: "Each corner point comes from a pair of constraints. Identify all possible pairs.",
    hint: "Identify constraint pairs.",
    level: "intermediate",
    codeExample: "Constraints: x≥0, y≥0, x+y≤10, 2x+y≤14."
  },
  {
    question: "How do you verify a corner point algebraically?",
    shortAnswer: "Substitute the point into all constraints to check feasibility.",
    explanation: "A corner point must satisfy all constraints. If it fails any, it's not a corner point.",
    hint: "Check all constraints.",
    level: "intermediate",
    codeExample: "Check (4,6) in all constraints."
  },
  {
    question: "What if the solution to a system is not feasible?",
    shortAnswer: "Then it's not a corner point of the feasible region.",
    explanation: "Some intersections lie outside the feasible region and are not valid corner points.",
    hint: "Must satisfy all constraints.",
    level: "intermediate",
    codeExample: "(4,6) may not satisfy all constraints."
  },
  {
    question: "How many equations do you need to find one corner point?",
    shortAnswer: "Two equations (one for each constraint).",
    explanation: "In 2D, a corner point is the intersection of two constraint lines.",
    hint: "Two equations.",
    level: "basic",
    codeExample: "Solve two equations simultaneously."
  },
  {
    question: "What is the difference between substitution and elimination?",
    shortAnswer: "Substitution isolates a variable; elimination adds/subtracts equations.",
    explanation: "Substitution: solve for one variable, plug into the other equation. Elimination: combine equations to eliminate a variable.",
    hint: "Different approaches to same goal.",
    level: "basic",
    codeExample: "Substitution: y=10-x; Elimination: subtract equations."
  },
  {
    question: "How do you solve a system with fractions?",
    shortAnswer: "Multiply through by the LCD to clear fractions, then solve.",
    explanation: "Clearing fractions makes the equations easier to work with.",
    hint: "Clear fractions first.",
    level: "intermediate",
    codeExample: "(1/2)x + (1/3)y = 1 → multiply by 6."
  },
  {
    question: "What if the two equations are the same line?",
    shortAnswer: "They represent the same constraint — no unique intersection.",
    explanation: "If equations are multiples of each other, they're the same line and don't form a corner.",
    hint: "Same line = no unique point.",
    level: "expert",
    codeExample: "x+y=10 and 2x+2y=20 are the same."
  },
  {
    question: "What if the two equations are parallel?",
    shortAnswer: "They don't intersect, so there's no corner point from that pair.",
    explanation: "Parallel lines have no solution. This pair doesn't form a corner.",
    hint: "Parallel = no intersection.",
    level: "intermediate",
    codeExample: "x+y=10 and x+y=5 are parallel."
  },
  {
    question: "Can three constraints meet at one point?",
    shortAnswer: "Yes, the origin (0,0) is a common example.",
    explanation: "Multiple constraints can intersect at the same point, but it's still one corner point.",
    hint: "Multiple constraints can meet.",
    level: "expert",
    codeExample: "x=0, y=0, and x+y=0 all meet at (0,0)."
  },
  {
    question: "How do you find corner points in a problem with many constraints?",
    shortAnswer: "Systematically solve all pairs of constraints and check feasibility.",
    explanation: "For each pair of constraints, solve them and check if the point satisfies all constraints.",
    hint: "Solve pairs systematically.",
    level: "expert",
    codeExample: "For n constraints, solve nC2 pairs."
  },
  {
    question: "What is the role of non-negativity in algebraic corner point finding?",
    shortAnswer: "It adds constraints x=0 and y=0 to the system.",
    explanation: "Non-negativity (x≥0, y≥0) means corners can occur where constraints meet the axes.",
    hint: "Axes constraints.",
    level: "intermediate",
    codeExample: "x=0 and y=0 are constraints to include."
  },
  {
    question: "How do you handle decimals in algebraic solutions?",
    shortAnswer: "Work with fractions for exact values, or use decimals for approximation.",
    explanation: "Fractions give exact answers; decimals are approximations. Choose based on need.",
    hint: "Fractions for exactness.",
    level: "intermediate",
    codeExample: "x = 10/3 instead of 3.333..."
  },
  {
    question: "What is the most common mistake in algebraic corner point finding?",
    shortAnswer: "Forgetting to verify that the point satisfies all constraints.",
    explanation: "Many students find an intersection but don't check if it's feasible.",
    hint: "Always verify feasibility.",
    level: "basic",
    codeExample: "Check all constraints before accepting a point."
  },
  {
    question: "Why is algebraic corner point finding important?",
    shortAnswer: "It gives exact coordinates for corner points.",
    explanation: "Graphical methods give approximate values; algebraic methods give exact solutions.",
    hint: "Exact solutions.",
    level: "basic",
    codeExample: "Use algebra for precision."
  },
  {
    question: "How do you solve a system with one equation missing a variable?",
    shortAnswer: "Use direct substitution — the missing variable is zero.",
    explanation: "If an equation is x=0 or y=0, substitute directly into the other equation.",
    hint: "Direct substitution.",
    level: "intermediate",
    codeExample: "x=0, 2x+3y=12 → y=4."
  },
  {
    question: "What if a corner point has non-integer coordinates?",
    shortAnswer: "That's fine — fractional coordinates are valid.",
    explanation: "Corner points can have fractions or decimals. They represent exact solutions.",
    hint: "Fractions are valid.",
    level: "basic",
    codeExample: "(4.5, 2.5) is a valid corner point."
  },
  {
    question: "How do you check if a point is on a constraint line?",
    shortAnswer: "Substitute the point into the constraint equation.",
    explanation: "If the equation holds (LHS = RHS), the point is on the line.",
    hint: "Substitute and check.",
    level: "basic",
    codeExample: "For x+y=10, (4,6) gives 10=10 ✓."
  },
  {
    question: "What is the relationship between graphical and algebraic methods?",
    shortAnswer: "Graphical shows where to look; algebraic gives exact values.",
    explanation: "Use graphs to identify potential corners, then use algebra to find exact coordinates.",
    hint: "Graph → identify, Algebra → exact.",
    level: "intermediate",
    codeExample: "Graph shows a corner, algebra gives the exact point."
  },
  {
    question: "How do you find corner points for an unbounded region algebraically?",
    shortAnswer: "Find finite intersections where constraints meet.",
    explanation: "Unbounded regions have finite corner points where constraints intersect.",
    hint: "Finite intersections.",
    level: "intermediate",
    codeExample: "x+y≥4 has corners (0,4) and (4,0)."
  },
  {
    question: "What if there are more than two constraints at a corner?",
    shortAnswer: "Solve any two of them — the point should satisfy all.",
    explanation: "If three constraints meet, solving any pair gives the same point.",
    hint: "Any pair works.",
    level: "expert",
    codeExample: "x=0, y=0, x+y=10 all meet at (0,0)."
  },
  {
    question: "How do you organize work when finding many corner points?",
    shortAnswer: "Create a table with constraints, pairs, solutions, and feasibility.",
    explanation: "A systematic table helps avoid missing corners and checking feasibility.",
    hint: "Use a table.",
    level: "intermediate",
    codeExample: "Column: Constraints pair | Solution | Feasible?"
  },
  {
    question: "What is the first thing to check after solving a system?",
    shortAnswer: "Check that the point satisfies all constraints.",
    explanation: "Always verify feasibility before accepting a point as a corner.",
    hint: "Check all constraints.",
    level: "basic",
    codeExample: "Substitute into every constraint."
  },
  {
    question: "How do you handle a system with no solution?",
    shortAnswer: "The constraints don't intersect — not a corner point.",
    explanation: "If the system has no solution, the lines are parallel and don't form a corner.",
    hint: "No intersection = no corner.",
    level: "intermediate",
    codeExample: "Parallel lines have no solution."
  },
  {
    question: "What is the final step in finding all corner points algebraically?",
    shortAnswer: "List all feasible corner points and their coordinates.",
    explanation: "After solving and verifying, compile a complete list of corner points.",
    hint: "Compile the list.",
    level: "basic",
    codeExample: "Corner points: (0,0), (4,0), (2,2), (0,4)."
  },
  {
    question: "Why do we need both graphical and algebraic methods?",
    shortAnswer: "Graphics show the big picture; algebra gives exact answers.",
    explanation: "Graphical methods build intuition and help identify corners. Algebraic methods provide precise coordinates.",
    hint: "Use both for best results.",
    level: "intermediate",
    codeExample: "Graph for overview, algebra for exactness."
  }
];

export default questions;