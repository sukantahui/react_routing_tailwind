const questions = [
  {
    question: "Why do we plot multiple constraints on the same graph?",
    shortAnswer: "To find the feasible region where all constraints are satisfied simultaneously.",
    explanation: "Real-world LP problems have multiple constraints. Plotting them together shows the overlap — the feasible region.",
    hint: "Find the overlap.",
    level: "basic",
    codeExample: "Plot all constraints and find the common shaded area."
  },
  {
    question: "What is the feasible region when plotting multiple constraints?",
    shortAnswer: "The overlapping area where all shaded regions intersect.",
    explanation: "The feasible region is the set of all points that satisfy every constraint in the problem.",
    hint: "Overlap of all shadings.",
    level: "basic",
    codeExample: "The region where all constraints are satisfied."
  },
  {
    question: "How do you plot multiple constraints on one graph?",
    shortAnswer: "Plot each constraint individually on the same coordinate plane using different colors.",
    explanation: "Use the same method as plotting a single constraint: find intercepts, decide line type, and shade. Do this for each constraint.",
    hint: "One at a time, same graph.",
    level: "basic",
    codeExample: "Plot each constraint and shade its feasible side."
  },
  {
    question: "What is the best way to distinguish multiple constraints?",
    shortAnswer: "Use different colors or patterns for each constraint.",
    explanation: "Color coding makes it easy to see which line corresponds to which constraint and helps identify overlaps.",
    hint: "Use different colors.",
    level: "basic",
    codeExample: "Red for constraint 1, blue for constraint 2, etc."
  },
  {
    question: "Should you plot non-negativity constraints first?",
    shortAnswer: "Yes, they define the boundaries of the feasible region.",
    explanation: "Non-negativity (x≥0, y≥0) restricts the graph to the first quadrant, making it easier to plot other constraints.",
    hint: "Start with x≥0 and y≥0.",
    level: "intermediate",
    codeExample: "Plot x≥0 and y≥0 first."
  },
  {
    question: "How do you handle different shading directions?",
    shortAnswer: "Shade each constraint separately; the feasible region is where they overlap.",
    explanation: "Different constraints may shade above, below, left, or right. The overlap of all these shadings gives the feasible region.",
    hint: "Overlap of all shadings.",
    level: "intermediate",
    codeExample: "For x+y≤10 (shade below) and x+y≥5 (shade above), overlap is between 5 and 10."
  },
  {
    question: "What if constraints conflict (no overlap)?",
    shortAnswer: "The problem is infeasible — no solution exists.",
    explanation: "If constraints contradict each other (e.g., x≤3 and x≥5), there's no overlap, so no feasible region.",
    hint: "No overlap = infeasible.",
    level: "intermediate",
    codeExample: "x≤3 and x≥5 → infeasible."
  },
  {
    question: "How do you know if a point is in the feasible region?",
    shortAnswer: "Check if it satisfies all constraints simultaneously.",
    explanation: "A point is feasible only if it makes every inequality true.",
    hint: "Must satisfy all constraints.",
    level: "basic",
    codeExample: "Point (2,3) must satisfy all constraints."
  },
  {
    question: "Can you shade the feasible region directly?",
    shortAnswer: "Yes, after plotting all constraints, shade only the overlap.",
    explanation: "Some prefer to shade the feasible region directly instead of individual constraints. But shading each constraint first makes it easier to see the overlap.",
    hint: "Overlap shading.",
    level: "intermediate",
    codeExample: "Shade the common area only."
  },
  {
    question: "What are the corner points of the feasible region?",
    shortAnswer: "The vertices where constraint lines intersect.",
    explanation: "Corner points are found by solving pairs of constraint equations. They are candidates for optimal solutions.",
    hint: "Intersections of constraints.",
    level: "intermediate",
    codeExample: "Intersection of x+y=10 and 2x+y=12 gives a corner point."
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
    question: "What is the difference between a constraint and the feasible region?",
    shortAnswer: "A constraint is a single limitation; the feasible region is the set of all points satisfying all constraints.",
    explanation: "Each constraint defines a half-plane. The feasible region is the intersection of all half-planes.",
    hint: "Constraint = one rule; feasible region = all rules together.",
    level: "basic",
    codeExample: "Constraint: x+y≤10; Feasible region: all points satisfying x+y≤10, x≥0, y≥0, etc."
  },
  {
    question: "How do you plot multiple constraints with different scales?",
    shortAnswer: "Use a consistent scale for all constraints on the same graph.",
    explanation: "The same coordinate plane must be used for all constraints, so use the same scale for x and y axes.",
    hint: "Same scale for all.",
    level: "intermediate",
    codeExample: "If x and y both range from 0 to 20, use the same scale for both axes."
  },
  {
    question: "What is the role of non-negativity in multiple constraints?",
    shortAnswer: "It restricts the feasible region to the first quadrant.",
    explanation: "x≥0 and y≥0 are constraints like any other. They ensure the feasible region is in the first quadrant.",
    hint: "Keeps solutions in QI.",
    level: "basic",
    codeExample: "x≥0, y≥0 → feasible region in QI."
  },
  {
    question: "Can you have more than two constraints?",
    shortAnswer: "Yes, LP problems can have many constraints.",
    explanation: "Real-world problems often have 10+ constraints. The graphical method works best for 2-4 constraints.",
    hint: "Many constraints possible.",
    level: "basic",
    codeExample: "x≥0, y≥0, x+y≤10, x+2y≤15, 2x+y≤12."
  },
  {
    question: "What happens if one constraint is redundant?",
    shortAnswer: "It doesn't affect the feasible region; it's unnecessary.",
    explanation: "A redundant constraint is one whose half-plane contains the entire feasible region defined by other constraints.",
    hint: "Doesn't change the region.",
    level: "expert",
    codeExample: "With x≥0, y≥0, x+y≤10, the constraint x≤20 is redundant."
  },
  {
    question: "How do you check if a constraint is redundant?",
    shortAnswer: "See if its removal changes the feasible region.",
    explanation: "If removing a constraint doesn't change the feasible region, it's redundant.",
    hint: "Doesn't affect the region.",
    level: "expert",
    codeExample: "If removing x≤20 doesn't change the region, it's redundant."
  },
  {
    question: "What is the maximum number of constraints you can plot graphically?",
    shortAnswer: "Practically 3-5 constraints, but mathematically any number.",
    explanation: "The graphical method becomes messy with many constraints. Beyond 4-5, the simplex method is preferred.",
    hint: "3-5 is practical.",
    level: "intermediate",
    codeExample: "4 constraints is common in textbook problems."
  },
  {
    question: "How do you find the feasible region with mixed inequalities (≤ and ≥)?",
    shortAnswer: "Shade each constraint appropriately; the feasible region is the overlap.",
    explanation: "Some constraints are ≤ (shade below/left) and some are ≥ (shade above/right). The overlap of all gives the feasible region.",
    hint: "Overlap of all shadings.",
    level: "intermediate",
    codeExample: "x+y≤10 (shade below) and x+y≥5 (shade above) → overlap between 5 and 10."
  },
  {
    question: "What if the feasible region is a single point?",
    shortAnswer: "It's a degenerate case where all constraints meet at one point.",
    explanation: "This happens when constraints are tight and only one point satisfies all.",
    hint: "One unique solution.",
    level: "expert",
    codeExample: "x=3, y=4, x+y=7 → feasible region is (3,4) only."
  },
  {
    question: "How do you plot multiple constraints quickly?",
    shortAnswer: "Use intercepts for each constraint and plot them systematically.",
    explanation: "The intercept method is fastest. Find x-intercept and y-intercept for each constraint and draw the lines.",
    hint: "Intercept method is fastest.",
    level: "intermediate",
    codeExample: "For 2x+3y=12, intercepts are (6,0) and (0,4)."
  },
  {
    question: "What is the difference between a constraint and a boundary?",
    shortAnswer: "A constraint is the rule; the boundary is the line where the constraint is tight.",
    explanation: "The boundary line is the equality version of the constraint. It divides the plane.",
    hint: "Constraint = rule; boundary = line.",
    level: "basic",
    codeExample: "Constraint: 2x+3y≤12; Boundary: 2x+3y=12."
  },
  {
    question: "How do you test if a point is feasible in a multi-constraint problem?",
    shortAnswer: "Substitute the point into every inequality. It must satisfy all.",
    explanation: "A point is feasible only if it makes every inequality true.",
    hint: "Must satisfy all constraints.",
    level: "basic",
    codeExample: "Check (2,3) in all constraints."
  },
  {
    question: "What is the significance of the feasible region's shape?",
    shortAnswer: "It determines the number and location of corner points.",
    explanation: "The shape (polygon) of the feasible region determines where optimal solutions can be found.",
    hint: "Shape affects corner points.",
    level: "intermediate",
    codeExample: "A triangle has 3 corner points; a rectangle has 4."
  },
  {
    question: "Can the feasible region be unbounded with multiple constraints?",
    shortAnswer: "Yes, if constraints don't bound it in some direction.",
    explanation: "Even with multiple constraints, the region can be unbounded if there are no upper bounds in some direction.",
    hint: "Unbounded is possible.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≥5 is unbounded."
  },
  {
    question: "How do you shade multiple constraints correctly?",
    shortAnswer: "Shade each constraint's feasible side, then identify the overlap.",
    explanation: "Use light shading for each constraint so the overlap is visible.",
    hint: "Light shading for each.",
    level: "basic",
    codeExample: "Shade each constraint and find the common area."
  },
  {
    question: "What is the best way to label multiple constraints on a graph?",
    shortAnswer: "Write the equation next to its line, using the same color.",
    explanation: "Labels and colors together make the graph clear and easy to read.",
    hint: "Color code and label.",
    level: "basic",
    codeExample: "Write '2x+3y≤12' next to the purple line."
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
    question: "What is the first step in plotting multiple constraints?",
    shortAnswer: "List all constraints and identify their types (≤, ≥, =).",
    explanation: "Before graphing, write down every constraint and determine if it's solid/dashed and which side to shade.",
    hint: "List and classify.",
    level: "basic",
    codeExample: "Constraints: x≥0, y≥0, x+y≤10, 2x+y≤12."
  },
  {
    question: "How do you handle a constraint with no shading?",
    shortAnswer: "Equality constraints (=) have no shading — only the line.",
    explanation: "Equality constraints don't define a half-plane; they only define the line itself.",
    hint: "Equality = line only.",
    level: "intermediate",
    codeExample: "x + y = 10 is just a line, no shading."
  }
];

export default questions;