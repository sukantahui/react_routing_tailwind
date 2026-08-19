const questions = [
  {
    question: "How do you find the maximum value graphically?",
    shortAnswer: "Evaluate the objective function at all corner points and pick the highest.",
    explanation: "Graph all constraints, find the feasible region, identify corner points, evaluate Z at each, and select the maximum.",
    hint: "Check all corners.",
    level: "basic",
    codeExample: "Find Z at O, A, B, C, D and pick the highest."
  },
  {
    question: "What is the first step in finding the maximum graphically?",
    shortAnswer: "Graph all constraints and shade the feasible region.",
    explanation: "Plot each constraint, determine the feasible side, and find the overlapping area.",
    hint: "Graph first.",
    level: "basic",
    codeExample: "Plot all constraints and find the feasible region."
  },
  {
    question: "What is the second step in finding the maximum graphically?",
    shortAnswer: "Identify all corner points of the feasible region.",
    explanation: "Find where constraint lines intersect. These are the corner points.",
    hint: "Find the corners.",
    level: "basic",
    codeExample: "Identify points O, A, B, C, D."
  },
  {
    question: "What is the third step in finding the maximum graphically?",
    shortAnswer: "Evaluate the objective function at each corner point.",
    explanation: "Substitute each corner point's coordinates into Z = ax + by.",
    hint: "Evaluate Z at each corner.",
    level: "basic",
    codeExample: "Z = 3x + 4y at (0,0): 0, (5,0): 15, (4,3): 24, etc."
  },
  {
    question: "What is the fourth step in finding the maximum graphically?",
    shortAnswer: "Select the corner point with the highest Z value.",
    explanation: "Compare all Z values and choose the maximum.",
    hint: "Pick the highest Z.",
    level: "basic",
    codeExample: "Max Z = 24 at (4,3)."
  },
  {
    question: "Why does the maximum occur at a corner point?",
    shortAnswer: "By the corner-point principle, the optimum of a linear function on a convex polygon occurs at a vertex.",
    explanation: "Linear functions change linearly across the region. The maximum must be at an extreme point.",
    hint: "Corner-point principle.",
    level: "intermediate",
    codeExample: "The maximum is always at a corner (or along an edge)."
  },
  {
    question: "Can the maximum occur at multiple points?",
    shortAnswer: "Yes, if the objective line is parallel to a constraint edge.",
    explanation: "If the objective function has the same slope as a constraint, all points on that edge give the same maximum value.",
    hint: "Multiple optima.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → all points on the edge give Z=10."
  },
  {
    question: "How do you check if a corner point gives the maximum?",
    shortAnswer: "Evaluate Z at all corner points and compare.",
    explanation: "Compute Z for each corner point. The highest value is the maximum.",
    hint: "Compare all Z values.",
    level: "basic",
    codeExample: "Z values: 0, 15, 24, 22, 20 → max is 24."
  },
  {
    question: "What if the feasible region is unbounded?",
    shortAnswer: "The maximum may be unbounded (go to infinity).",
    explanation: "If the region extends in the direction that increases Z, there is no finite maximum.",
    hint: "May be unbounded.",
    level: "intermediate",
    codeExample: "Maximize Z=x+y with x≥0, y≥0 → unbounded."
  },
  {
    question: "How do you handle multiple optimal solutions?",
    shortAnswer: "Any point on the optimal edge gives the same maximum value.",
    explanation: "If the objective line overlaps a constraint edge, all points on that edge are optimal.",
    hint: "All points on the edge are optimal.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → all points on the edge give Z=10."
  },
  {
    question: "What is the difference between maximum and minimum?",
    shortAnswer: "Maximum is the highest value; minimum is the lowest.",
    explanation: "Maximization finds the largest Z. Minimization finds the smallest Z.",
    hint: "Highest vs lowest.",
    level: "basic",
    codeExample: "Max Z=24; Min Z=0."
  },
  {
    question: "How do you know if you've found the maximum?",
    shortAnswer: "Check that moving the objective line any further would leave the feasible region.",
    explanation: "The maximum is where the objective line is about to leave the region.",
    hint: "About to leave the region.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region."
  },
  {
    question: "What is the role of the objective line in finding the maximum?",
    shortAnswer: "It helps visualize the maximum by moving outward until it just touches the region.",
    explanation: "The objective line shows all points with the same Z. Moving it outward finds higher Z values.",
    hint: "Moves outward.",
    level: "intermediate",
    codeExample: "Move Z=12 to Z=24 to find the maximum."
  },
  {
    question: "Can the maximum be at the origin?",
    shortAnswer: "Yes, if the origin gives the highest Z value.",
    explanation: "If all other corner points have lower Z values, the origin is optimal.",
    hint: "Origin can be optimal.",
    level: "basic",
    codeExample: "If Z=0 at origin and all other Z are negative, origin is max."
  },
  {
    question: "What is the most common mistake in finding the maximum?",
    shortAnswer: "Missing a corner point or evaluating incorrectly.",
    explanation: "Students often forget corner points on the axes or make arithmetic errors.",
    hint: "Check all corners carefully.",
    level: "basic",
    codeExample: "Always check (x,0) and (0,y) points."
  },
  {
    question: "How do you verify the maximum solution?",
    shortAnswer: "Substitute the optimal point into all constraints to check feasibility.",
    explanation: "The optimal point must satisfy all constraints. Verify by substitution.",
    hint: "Check all constraints.",
    level: "intermediate",
    codeExample: "Check (4,3) in x+y≤10: 7≤10 ✓, 2x+y≤14: 11≤14 ✓."
  },
  {
    question: "What is the difference between a feasible point and an optimal point?",
    shortAnswer: "A feasible point satisfies constraints; an optimal point is the best feasible point.",
    explanation: "All optimal points are feasible, but not all feasible points are optimal.",
    hint: "Feasible = valid; Optimal = best.",
    level: "basic",
    codeExample: "(2,2) is feasible; (4,3) is optimal."
  },
  {
    question: "How do you find the maximum using algebra?",
    shortAnswer: "Set up the system of equations at each corner and solve.",
    explanation: "At each corner, two constraints are binding. Solve the system to find the corner point.",
    hint: "Solve systems.",
    level: "intermediate",
    codeExample: "Solve x+y=10 and 2x+y=14 → (4,3)."
  },
  {
    question: "What if there are no corner points?",
    shortAnswer: "The feasible region may be empty or unbounded.",
    explanation: "If constraints conflict, there's no feasible region. If unbounded, there may be no finite maximum.",
    hint: "Empty or unbounded.",
    level: "expert",
    codeExample: "x≤3 and x≥5 → empty region."
  },
  {
    question: "How do you maximize with a vertical objective line?",
    shortAnswer: "Move the line horizontally to find the highest Z.",
    explanation: "For Z=ax, the objective is vertical. Move it right for higher Z.",
    hint: "Horizontal movement.",
    level: "expert",
    codeExample: "Z=3x → move right to increase Z."
  },
  {
    question: "How do you maximize with a horizontal objective line?",
    shortAnswer: "Move the line vertically to find the highest Z.",
    explanation: "For Z=by, the objective is horizontal. Move it up for higher Z.",
    hint: "Vertical movement.",
    level: "expert",
    codeExample: "Z=4y → move up to increase Z."
  },
  {
    question: "What is the role of the constraints in maximization?",
    shortAnswer: "Constraints define the feasible region where the maximum can be found.",
    explanation: "Constraints limit the possible values of x and y. The maximum is the best point within these limits.",
    hint: "Define the region.",
    level: "basic",
    codeExample: "Constraints create the playing field."
  },
  {
    question: "How do you handle decimals in maximization?",
    shortAnswer: "Use decimals in the objective function and compare.",
    explanation: "Decimals work the same way as integers. Just be careful with arithmetic.",
    hint: "Decimals are fine.",
    level: "intermediate",
    codeExample: "Z=0.5x+0.75y."
  },
  {
    question: "What is the maximum number of corner points to check?",
    shortAnswer: "It depends on the number of constraints.",
    explanation: "With n constraints, you can have up to n corner points.",
    hint: "Depends on constraints.",
    level: "intermediate",
    codeExample: "3 constraints → up to 3 corner points (triangle)."
  },
  {
    question: "How do you know if the maximum is unique?",
    shortAnswer: "If only one corner point gives the highest Z, the maximum is unique.",
    explanation: "If multiple corners give the same highest Z, there are multiple optima.",
    hint: "Check if multiple corners tie.",
    level: "intermediate",
    codeExample: "If only B gives Z=24, it's unique."
  },
  {
    question: "What is the relationship between the objective line and the maximum?",
    shortAnswer: "The maximum is where the objective line is farthest from the origin while still touching the region.",
    explanation: "Moving the line outward increases Z. The farthest line that touches the region gives the maximum.",
    hint: "Farthest line touching.",
    level: "intermediate",
    codeExample: "The line with the highest Z that intersects the region."
  },
  {
    question: "How do you maximize with a negative objective coefficient?",
    shortAnswer: "The maximum may be at the origin or where the negative term is minimized.",
    explanation: "If a or b is negative, the maximum may occur at a point that minimizes the negative contribution.",
    hint: "Negative coefficients change the direction.",
    level: "expert",
    codeExample: "Z=3x-2y → maximize by minimizing y."
  },
  {
    question: "What is the first thing to check when finding the maximum?",
    shortAnswer: "Make sure the problem is a maximization problem.",
    explanation: "Check the problem statement to confirm you're maximizing, not minimizing.",
    hint: "Check the problem type.",
    level: "basic",
    codeExample: "Maximize Z = 3x + 4y."
  },
  {
    question: "How do you document the maximum solution?",
    shortAnswer: "Write: Maximum Z = value at (x, y).",
    explanation: "Clearly state the optimal value and the point where it occurs.",
    hint: "State the value and point.",
    level: "basic",
    codeExample: "Maximum Z = 24 at (4, 3)."
  },
  {
    question: "What if the maximum is negative?",
    shortAnswer: "That's fine — the maximum is the highest value, even if it's negative.",
    explanation: "If all Z values are negative, the maximum is the least negative value.",
    hint: "Negative values are possible.",
    level: "intermediate",
    codeExample: "Max Z = -5 if all other Z are less."
  }
];

export default questions;