const questions = [
  {
    question: "How do you find the minimum value graphically?",
    shortAnswer: "Evaluate the objective function at all corner points and pick the lowest.",
    explanation: "Graph all constraints, find the feasible region, identify corner points, evaluate C at each, and select the minimum.",
    hint: "Check all corners and pick the lowest.",
    level: "basic",
    codeExample: "Find C at A, B, C and pick the lowest."
  },
  {
    question: "What is the first step in finding the minimum graphically?",
    shortAnswer: "Graph all constraints and shade the feasible region.",
    explanation: "Plot each constraint, determine the feasible side, and find the overlapping area.",
    hint: "Graph first.",
    level: "basic",
    codeExample: "Plot all constraints and find the feasible region."
  },
  {
    question: "What is the second step in finding the minimum graphically?",
    shortAnswer: "Identify all corner points of the feasible region.",
    explanation: "Find where constraint lines intersect. These are the corner points.",
    hint: "Find the corners.",
    level: "basic",
    codeExample: "Identify points A, B, C."
  },
  {
    question: "What is the third step in finding the minimum graphically?",
    shortAnswer: "Evaluate the objective function at each corner point.",
    explanation: "Substitute each corner point's coordinates into C = ax + by.",
    hint: "Evaluate C at each corner.",
    level: "basic",
    codeExample: "C = 2x + 3y at (0,4): 12, (2,2): 10, (3,0): 6."
  },
  {
    question: "What is the fourth step in finding the minimum graphically?",
    shortAnswer: "Select the corner point with the lowest C value.",
    explanation: "Compare all C values and choose the minimum.",
    hint: "Pick the lowest C.",
    level: "basic",
    codeExample: "Min C = 6 at (3,0)."
  },
  {
    question: "Which direction do you move the objective line for minimization?",
    shortAnswer: "Inward (toward the origin).",
    explanation: "For minimization, lower C values are better. Move the line inward until it just touches the feasible region.",
    hint: "Toward origin.",
    level: "basic",
    codeExample: "Move from C=12 to C=8 to C=6."
  },
  {
    question: "Why does the minimum occur at a corner point?",
    shortAnswer: "By the corner-point principle, the optimum of a linear function on a convex polygon occurs at a vertex.",
    explanation: "Linear functions change linearly across the region. The minimum must be at an extreme point.",
    hint: "Corner-point principle.",
    level: "intermediate",
    codeExample: "The minimum is always at a corner (or along an edge)."
  },
  {
    question: "Can the minimum occur at multiple points?",
    shortAnswer: "Yes, if the objective line is parallel to a constraint edge.",
    explanation: "If the objective function has the same slope as a constraint, all points on that edge give the same minimum value.",
    hint: "Multiple optima.",
    level: "expert",
    codeExample: "C=2x+2y and x+y=5 → all points on the edge give C=10."
  },
  {
    question: "How do you check if a corner point gives the minimum?",
    shortAnswer: "Evaluate C at all corner points and compare.",
    explanation: "Compute C for each corner point. The lowest value is the minimum.",
    hint: "Compare all C values.",
    level: "basic",
    codeExample: "C values: 12, 10, 6 → min is 6."
  },
  {
    question: "What if the feasible region is unbounded for minimization?",
    shortAnswer: "The minimum may still exist if the objective decreases toward the region.",
    explanation: "Even with an unbounded region, the minimum may exist at a corner point if the objective direction is bounded.",
    hint: "Minimum may still exist.",
    level: "intermediate",
    codeExample: "Minimize C=x+y with x≥0, y≥0 → minimum at (0,0) = 0."
  },
  {
    question: "How do you handle multiple optimal solutions in minimization?",
    shortAnswer: "Any point on the optimal edge gives the same minimum value.",
    explanation: "If the objective line overlaps a constraint edge, all points on that edge are optimal.",
    hint: "All points on the edge are optimal.",
    level: "expert",
    codeExample: "C=2x+2y and x+y=5 → all points on the edge give C=10."
  },
  {
    question: "What is the difference between maximum and minimum?",
    shortAnswer: "Maximum is the highest value; minimum is the lowest.",
    explanation: "Maximization finds the largest C. Minimization finds the smallest C.",
    hint: "Highest vs lowest.",
    level: "basic",
    codeExample: "Min C=6; Max C=12."
  },
  {
    question: "How do you know if you've found the minimum?",
    shortAnswer: "Check that moving the objective line any further inward would leave the feasible region.",
    explanation: "The minimum is where the objective line is about to enter the region.",
    hint: "About to enter the region.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region."
  },
  {
    question: "What is the role of the objective line in finding the minimum?",
    shortAnswer: "It helps visualize the minimum by moving inward until it just touches the region.",
    explanation: "The objective line shows all points with the same C. Moving it inward finds lower C values.",
    hint: "Moves inward.",
    level: "intermediate",
    codeExample: "Move C=12 to C=8 to C=6 to find the minimum."
  },
  {
    question: "Can the minimum be at the origin?",
    shortAnswer: "Yes, if the origin gives the lowest C value.",
    explanation: "If all other corner points have higher C values, the origin is optimal.",
    hint: "Origin can be optimal.",
    level: "basic",
    codeExample: "If C=0 at origin and all other C are positive, origin is min."
  },
  {
    question: "What is the most common mistake in finding the minimum?",
    shortAnswer: "Moving the objective line outward instead of inward.",
    explanation: "Students often use the maximization direction for minimization problems.",
    hint: "Move inward for min.",
    level: "basic",
    codeExample: "For min, move from C=12 to C=8 to C=6 (inward)."
  },
  {
    question: "How do you verify the minimum solution?",
    shortAnswer: "Substitute the optimal point into all constraints to check feasibility.",
    explanation: "The optimal point must satisfy all constraints. Verify by substitution.",
    hint: "Check all constraints.",
    level: "intermediate",
    codeExample: "Check (3,0) in 2x+y≥6: 6≥6 ✓, x+y≥4: 3≥4 ✗ → not feasible! Actually (3,0) gives 3≥4 false, so it's not feasible. The feasible point is (2,2) with C=10."
  },
  {
    question: "What is the difference between a feasible point and an optimal point?",
    shortAnswer: "A feasible point satisfies constraints; an optimal point is the best feasible point.",
    explanation: "All optimal points are feasible, but not all feasible points are optimal.",
    hint: "Feasible = valid; Optimal = best.",
    level: "basic",
    codeExample: "(2,2) is feasible; (3,0) is optimal."
  },
  {
    question: "How do you find the minimum using algebra?",
    shortAnswer: "Set up the system of equations at each corner and solve.",
    explanation: "At each corner, two constraints are binding. Solve the system to find the corner point.",
    hint: "Solve systems.",
    level: "intermediate",
    codeExample: "Solve 2x+y=6 and x+y=4 → (2,2)."
  },
  {
    question: "What if there are no corner points?",
    shortAnswer: "The feasible region may be empty or unbounded.",
    explanation: "If constraints conflict, there's no feasible region. If unbounded, there may be no finite minimum.",
    hint: "Empty or unbounded.",
    level: "expert",
    codeExample: "x≤3 and x≥5 → empty region."
  },
  {
    question: "How do you minimize with a vertical objective line?",
    shortAnswer: "Move the line horizontally to find the lowest C.",
    explanation: "For C=ax, the objective is vertical. Move it left for lower C.",
    hint: "Horizontal movement.",
    level: "expert",
    codeExample: "C=3x → move left to decrease C."
  },
  {
    question: "How do you minimize with a horizontal objective line?",
    shortAnswer: "Move the line vertically to find the lowest C.",
    explanation: "For C=by, the objective is horizontal. Move it down for lower C.",
    hint: "Vertical movement.",
    level: "expert",
    codeExample: "C=4y → move down to decrease C."
  },
  {
    question: "What is the role of the constraints in minimization?",
    shortAnswer: "Constraints define the feasible region where the minimum can be found.",
    explanation: "Constraints limit the possible values of x and y. The minimum is the best point within these limits.",
    hint: "Define the region.",
    level: "basic",
    codeExample: "Constraints create the playing field."
  },
  {
    question: "How do you handle decimals in minimization?",
    shortAnswer: "Use decimals in the objective function and compare.",
    explanation: "Decimals work the same way as integers. Just be careful with arithmetic.",
    hint: "Decimals are fine.",
    level: "intermediate",
    codeExample: "C=0.5x+0.75y."
  },
  {
    question: "What is the minimum number of corner points to check?",
    shortAnswer: "At least 2 (for a line segment) or 3 (for a triangle).",
    explanation: "With constraints, you need at least 2 corner points for a bounded region.",
    hint: "Depends on constraints.",
    level: "intermediate",
    codeExample: "2 constraints → up to 2 corner points (line segment)."
  },
  {
    question: "How do you know if the minimum is unique?",
    shortAnswer: "If only one corner point gives the lowest C, the minimum is unique.",
    explanation: "If multiple corners give the same lowest C, there are multiple optima.",
    hint: "Check if multiple corners tie.",
    level: "intermediate",
    codeExample: "If only C gives C=6, it's unique."
  },
  {
    question: "What is the relationship between the objective line and the minimum?",
    shortAnswer: "The minimum is where the objective line is closest to the origin while still touching the region.",
    explanation: "Moving the line inward decreases C. The closest line that touches the region gives the minimum.",
    hint: "Closest line touching.",
    level: "intermediate",
    codeExample: "The line with the lowest C that intersects the region."
  },
  {
    question: "How do you minimize with a negative objective coefficient?",
    shortAnswer: "The minimum may be at a point that maximizes the negative contribution.",
    explanation: "If a or b is negative, the minimum may occur at a point that makes the negative term as large as possible.",
    hint: "Negative coefficients change the direction.",
    level: "expert",
    codeExample: "C=3x-2y → minimize by maximizing y."
  },
  {
    question: "What is the first thing to check when finding the minimum?",
    shortAnswer: "Make sure the problem is a minimization problem.",
    explanation: "Check the problem statement to confirm you're minimizing, not maximizing.",
    hint: "Check the problem type.",
    level: "basic",
    codeExample: "Minimize C = 2x + 3y."
  },
  {
    question: "How do you document the minimum solution?",
    shortAnswer: "Write: Minimum C = value at (x, y).",
    explanation: "Clearly state the optimal value and the point where it occurs.",
    hint: "State the value and point.",
    level: "basic",
    codeExample: "Minimum C = 6 at (3, 0)."
  },
  {
    question: "What if the minimum is negative?",
    shortAnswer: "That's fine — the minimum is the lowest value, even if it's negative.",
    explanation: "If all C values are negative, the minimum is the most negative value.",
    hint: "Negative values are possible.",
    level: "intermediate",
    codeExample: "Min C = -5 if all other C are greater."
  }
];

export default questions;