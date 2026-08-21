const questions = [
  {
    question: "What is a linear inequality?",
    shortAnswer: "A mathematical statement relating two linear expressions with an inequality symbol.",
    explanation: "Linear inequalities use <, >, ≤, or ≥ to show the relationship between two linear expressions. The solution is a region on a graph.",
    hint: "Inequality with linear expressions.",
    level: "basic",
    codeExample: "2x + y ≤ 6 is a linear inequality"
  },
  {
    question: "How do you graph a linear inequality?",
    shortAnswer: "Convert to equality, find intercepts, draw the line, test a point, and shade the region.",
    explanation: "Step 1: Replace inequality with =. Step 2: Find x and y intercepts. Step 3: Draw the line. Step 4: Test a point. Step 5: Shade the correct region.",
    hint: "Equality → intercepts → line → test → shade.",
    level: "basic",
    codeExample: "2x + y ≤ 6 → 2x + y = 6 → (3,0) and (0,6)"
  },
  {
    question: "What is the boundary line in a linear inequality?",
    shortAnswer: "The line formed by converting the inequality to an equality.",
    explanation: "The boundary line separates the graph into two regions. For ≤ or ≥, the line is solid. For < or >, the line is dashed.",
    hint: "Line from equality.",
    level: "intermediate",
    codeExample: "2x + y = 6 is the boundary line for 2x + y ≤ 6"
  },
  {
    question: "How do you determine which side to shade?",
    shortAnswer: "Test a point not on the line. If it satisfies the inequality, shade that side.",
    explanation: "Choose a test point (usually (0,0) if it's not on the line). If the point satisfies the inequality, shade the side containing the point. Otherwise, shade the other side.",
    hint: "Test a point, shade accordingly.",
    level: "intermediate",
    codeExample: "Test (0,0): 0 ≤ 6 ✓ → shade side with (0,0)"
  },
  {
    question: "What is the difference between solid and dashed lines?",
    shortAnswer: "Solid lines are for ≤ and ≥; dashed lines are for < and >.",
    explanation: "Solid lines include the boundary in the solution. Dashed lines exclude the boundary from the solution.",
    hint: "Solid = included, Dashed = excluded.",
    level: "basic",
    codeExample: "≤ or ≥ → solid line, < or > → dashed line"
  },
  {
    question: "What is a feasible region?",
    shortAnswer: "The overlapping shaded region that satisfies all inequalities in a system.",
    explanation: "When graphing multiple inequalities, the feasible region is where all shaded regions overlap. This represents all solutions to the system.",
    hint: "Overlap of all shaded regions.",
    level: "intermediate",
    codeExample: "Intersection of all shaded areas = feasible region"
  },
  {
    question: "How do you graph a system of inequalities?",
    shortAnswer: "Graph each inequality separately, then find the overlapping shaded region.",
    explanation: "Graph each inequality using the same method. The feasible region is where all shaded areas overlap.",
    hint: "Graph each, then overlap.",
    level: "intermediate",
    codeExample: "Graph 2x+y≤6 and x+2y≤8 → overlap is feasible region"
  },
  {
    question: "What is the test point method?",
    shortAnswer: "A method to determine which side of a boundary line to shade.",
    explanation: "Choose a point not on the line (often (0,0)). Substitute it into the inequality. If true, shade the side with that point. If false, shade the other side.",
    hint: "Test a point to decide shading.",
    level: "intermediate",
    codeExample: "Test (0,0): 0 ≤ 6 → true → shade side with (0,0)"
  },
  {
    question: "What does '≤' mean in graphing?",
    shortAnswer: "Less than or equal to - shade below the line with a solid line.",
    explanation: "The boundary is included (solid line) and the solution is on or below the line.",
    hint: "≤ = below, solid line.",
    level: "basic",
    codeExample: "2x + y ≤ 6 → solid line, shade below"
  },
  {
    question: "What does '≥' mean in graphing?",
    shortAnswer: "Greater than or equal to - shade above the line with a solid line.",
    explanation: "The boundary is included (solid line) and the solution is on or above the line.",
    hint: "≥ = above, solid line.",
    level: "basic",
    codeExample: "x + y ≥ 4 → solid line, shade above"
  },
  {
    question: "What does '<' mean in graphing?",
    shortAnswer: "Less than - shade below the line with a dashed line.",
    explanation: "The boundary is excluded (dashed line) and the solution is below the line.",
    hint: "< = below, dashed line.",
    level: "intermediate",
    codeExample: "2x + y < 6 → dashed line, shade below"
  },
  {
    question: "What does '>' mean in graphing?",
    shortAnswer: "Greater than - shade above the line with a dashed line.",
    explanation: "The boundary is excluded (dashed line) and the solution is above the line.",
    hint: "> = above, dashed line.",
    level: "intermediate",
    codeExample: "x + y > 4 → dashed line, shade above"
  },
  {
    question: "Why is (0,0) often used as a test point?",
    shortAnswer: "It's the easiest point to evaluate and is often not on the boundary line.",
    explanation: "Substituting (0,0) is simple because 0+0=0. If (0,0) is on the line, choose another point like (1,0) or (0,1).",
    hint: "Easiest point to test.",
    level: "basic",
    codeExample: "Test (0,0): 0 ≤ 6 → easy calculation"
  },
  {
    question: "What happens when (0,0) is on the boundary line?",
    shortAnswer: "Choose a different test point, such as (1,0) or (0,1).",
    explanation: "If (0,0) lies on the boundary line, it doesn't help determine which side to shade. Pick any other point not on the line.",
    hint: "Pick another point.",
    level: "intermediate",
    codeExample: "If line is x + y = 0, test (1,0) instead"
  },
  {
    question: "How do you find x-intercept for graphing?",
    shortAnswer: "Set y = 0 and solve for x.",
    explanation: "The x-intercept is where the line crosses the x-axis (y=0).",
    hint: "Set y = 0, solve for x.",
    level: "basic",
    codeExample: "2x + 0 = 6 → x = 3 → (3,0)"
  },
  {
    question: "How do you find y-intercept for graphing?",
    shortAnswer: "Set x = 0 and solve for y.",
    explanation: "The y-intercept is where the line crosses the y-axis (x=0).",
    hint: "Set x = 0, solve for y.",
    level: "basic",
    codeExample: "0 + y = 6 → y = 6 → (0,6)"
  },
  {
    question: "What is the slope of a line?",
    shortAnswer: "The slope indicates the steepness and direction of the line.",
    explanation: "Slope = (change in y)/(change in x). For a linear equation ax + by = c, the slope is -a/b.",
    hint: "Rise over run.",
    level: "intermediate",
    codeExample: "2x + y = 6 → slope = -2/1 = -2"
  },
  {
    question: "How do you graph a vertical line inequality?",
    shortAnswer: "Draw a vertical line at x = k and shade to the left or right.",
    explanation: "For x ≤ k, shade left of the line. For x ≥ k, shade right of the line.",
    hint: "Vertical line, shade left or right.",
    level: "intermediate",
    codeExample: "x ≤ 3 → vertical line at x=3, shade left"
  },
  {
    question: "How do you graph a horizontal line inequality?",
    shortAnswer: "Draw a horizontal line at y = k and shade above or below.",
    explanation: "For y ≤ k, shade below the line. For y ≥ k, shade above the line.",
    hint: "Horizontal line, shade above or below.",
    level: "intermediate",
    codeExample: "y ≥ 2 → horizontal line at y=2, shade above"
  },
  {
    question: "What is the importance of intercepts in graphing?",
    shortAnswer: "Intercepts give two points to accurately draw the boundary line.",
    explanation: "Using intercepts ensures the line is drawn correctly. Two points determine a straight line.",
    hint: "Two points define a line.",
    level: "basic",
    codeExample: "(3,0) and (0,6) define the line"
  }
];

export default questions;