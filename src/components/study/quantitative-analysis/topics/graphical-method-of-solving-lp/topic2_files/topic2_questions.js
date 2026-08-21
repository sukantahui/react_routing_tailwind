const questions = [
  {
    question: "What is a constraint line in LP?",
    shortAnswer: "A line representing the boundary of a constraint in a linear programming problem.",
    explanation: "Each constraint is plotted as a line on a graph. The line divides the plane into feasible and infeasible regions.",
    hint: "Boundary of a constraint.",
    level: "basic",
    codeExample: "3x + 2y = 120 is a constraint line"
  },
  {
    question: "What is the easiest way to plot a constraint line?",
    shortAnswer: "Using x and y intercepts.",
    explanation: "Find the x-intercept (set y=0) and y-intercept (set x=0), plot both points, and draw a line through them.",
    hint: "Use intercepts for quick plotting.",
    level: "basic",
    codeExample: "3x + 2y = 120 → (40,0) and (0,60)"
  },
  {
    question: "How do you plot a vertical constraint line?",
    shortAnswer: "Draw a vertical line at x = k.",
    explanation: "A vertical constraint has the form x = k. Plot points with x = k and draw a vertical line through them.",
    hint: "Vertical line at constant x.",
    level: "intermediate",
    codeExample: "x = 4 → vertical line at x = 4"
  },
  {
    question: "How do you plot a horizontal constraint line?",
    shortAnswer: "Draw a horizontal line at y = k.",
    explanation: "A horizontal constraint has the form y = k. Plot points with y = k and draw a horizontal line through them.",
    hint: "Horizontal line at constant y.",
    level: "intermediate",
    codeExample: "y = 3 → horizontal line at y = 3"
  },
  {
    question: "What is the x-intercept method for plotting lines?",
    shortAnswer: "Find the x-intercept by setting y = 0 and solving for x.",
    explanation: "The x-intercept is where the line crosses the x-axis. Plot this point, then find the y-intercept and connect them.",
    hint: "Set y = 0, solve for x.",
    level: "basic",
    codeExample: "3x + 2y = 120 → y=0 → 3x=120 → x=40 → (40,0)"
  },
  {
    question: "What is the y-intercept method for plotting lines?",
    shortAnswer: "Find the y-intercept by setting x = 0 and solving for y.",
    explanation: "The y-intercept is where the line crosses the y-axis. Plot this point, then find the x-intercept and connect them.",
    hint: "Set x = 0, solve for y.",
    level: "basic",
    codeExample: "3x + 2y = 120 → x=0 → 2y=120 → y=60 → (0,60)"
  },
  {
    question: "What if the constraint line passes through the origin?",
    shortAnswer: "Both intercepts are at the origin (0,0), so use another method.",
    explanation: "If the line passes through the origin, intercepts don't give two distinct points. Use slope or find another point on the line.",
    hint: "Origin point needs another method.",
    level: "intermediate",
    codeExample: "2x + 3y = 0 → passes through origin"
  },
  {
    question: "How do you plot a line with fractional intercepts?",
    shortAnswer: "Plot the fractions as decimal approximations or find integer points.",
    explanation: "If intercepts are fractions, you can plot them as decimals or find other integer points on the line.",
    hint: "Use decimals or integer points.",
    level: "intermediate",
    codeExample: "4x + 6y = 12 → (3,0) and (0,2) are integers"
  },
  {
    question: "How do you check if a point is on a constraint line?",
    shortAnswer: "Substitute the point into the equation and verify it satisfies the equality.",
    explanation: "If the point (x,y) satisfies the equation, it lies on the line. This is useful for checking your plot.",
    hint: "Substitute and verify.",
    level: "intermediate",
    codeExample: "Check (4,0) in 3x + 2y = 12 → 12 = 12 ✓"
  },
  {
    question: "What is the slope-intercept form of a constraint?",
    shortAnswer: "y = mx + b, where m is slope and b is y-intercept.",
    explanation: "The slope-intercept form makes it easy to plot lines using the y-intercept and slope.",
    hint: "y = mx + b form.",
    level: "intermediate",
    codeExample: "3x + 2y = 12 → y = -3/2x + 6"
  },
  {
    question: "How do you convert a constraint to slope-intercept form?",
    shortAnswer: "Solve the equation for y.",
    explanation: "Isolate y on one side of the equation. The coefficient of x is the slope, and the constant is the y-intercept.",
    hint: "Solve for y.",
    level: "intermediate",
    codeExample: "3x + 2y = 12 → y = -3/2x + 6"
  },
  {
    question: "What is the slope of a constraint line?",
    shortAnswer: "The slope indicates the steepness and direction of the line.",
    explanation: "Slope = (change in y)/(change in x). For ax + by = c, the slope is -a/b.",
    hint: "Rise over run.",
    level: "intermediate",
    codeExample: "3x + 2y = 12 → slope = -3/2"
  },
  {
    question: "How do you plot multiple constraint lines?",
    shortAnswer: "Plot each line separately using intercepts on the same graph.",
    explanation: "Plot each constraint line on the same coordinate plane. The feasible region is where all constraints overlap.",
    hint: "Plot each line on the same graph.",
    level: "intermediate",
    codeExample: "Plot 3x+2y=12 and x+y=5 on same graph"
  },
  {
    question: "What if a constraint has no intercept?",
    shortAnswer: "The line is either vertical or horizontal.",
    explanation: "If a line has no x-intercept, it's horizontal (y = k). If it has no y-intercept, it's vertical (x = k).",
    hint: "Vertical or horizontal line.",
    level: "intermediate",
    codeExample: "x = 4 has no y-intercept, y = 3 has no x-intercept"
  },
  {
    question: "How do you plot a line using slope and a point?",
    shortAnswer: "Plot the point, then use the slope to find another point.",
    explanation: "From a known point, move according to the slope (rise/run) to find another point. Draw the line through both.",
    hint: "Use slope to find second point.",
    level: "advanced",
    codeExample: "Slope = 2, point (1,3) → another point (2,5)"
  },
  {
    question: "What is the relationship between constraint lines and the feasible region?",
    shortAnswer: "Constraint lines form the boundaries of the feasible region.",
    explanation: "The feasible region is the intersection of all half-planes defined by the constraints. Constraint lines are the boundaries of these half-planes.",
    hint: "Lines define the boundaries.",
    level: "intermediate",
    codeExample: "Lines 3x+2y=12 and x+y=5 bound the feasible region"
  },
  {
    question: "How do you label constraint lines on a graph?",
    shortAnswer: "Write the equation of the line next to it.",
    explanation: "Label each line with its equation (e.g., 3x + 2y = 12). This helps identify constraints when finding the feasible region.",
    hint: "Label with equation.",
    level: "basic",
    codeExample: "Label line as 3x + 2y = 12"
  },
  {
    question: "What is the standard form of a linear equation?",
    shortAnswer: "ax + by = c, where a, b, and c are constants.",
    explanation: "The standard form is useful for finding intercepts. To find intercepts, set one variable to zero and solve for the other.",
    hint: "ax + by = c form.",
    level: "basic",
    codeExample: "3x + 2y = 12 is in standard form"
  }
];

export default questions;