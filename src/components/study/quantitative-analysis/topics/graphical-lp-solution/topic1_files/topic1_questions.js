const questions = [
  {
    question: "What is the first step in plotting a constraint line?",
    shortAnswer: "Identify the type of line (vertical, horizontal, or sloped) and choose a plotting method.",
    explanation: "Start by rewriting the constraint in a usable form. For standard form (ax+by=c), use intercepts. For slope-intercept (y=mx+b), use the slope and y-intercept. For vertical/horizontal, handle separately.",
    hint: "Think: 'What's the easiest way to get two points?'",
    level: "basic",
    codeExample: "For 2x + 3y = 12, find intercepts (6,0) and (0,4)."
  },
  {
    question: "How do you find the x-intercept of a line?",
    shortAnswer: "Set y=0 and solve for x.",
    explanation: "The x-intercept is where the line crosses the x-axis, so the y-coordinate is zero. Substitute 0 for y and solve.",
    hint: "y is zero on the x-axis.",
    level: "basic",
    codeExample: "For 3x - 2y = 6, set y=0 → 3x=6 → x=2 → (2,0)."
  },
  {
    question: "How do you find the y-intercept of a line?",
    shortAnswer: "Set x=0 and solve for y.",
    explanation: "The y-intercept is where the line crosses the y-axis, so x=0. Substitute 0 for x and solve.",
    hint: "x is zero on the y-axis.",
    level: "basic",
    codeExample: "For 3x - 2y = 6, set x=0 → -2y=6 → y=-3 → (0,-3)."
  },
  {
    question: "What does the slope of a constraint line represent?",
    shortAnswer: "The slope indicates the rate of change between y and x; it determines the steepness and direction of the line.",
    explanation: "In linear programming, the slope of a constraint line affects how the constraint interacts with others. The slope is m = -a/b for ax+by=c. It's the ratio of change in y to change in x.",
    hint: "Rise over run.",
    level: "basic",
    codeExample: "For 2x + 3y = 12, slope = -2/3 ≈ -0.667."
  },
  {
    question: "What is the difference between a vertical and a horizontal line?",
    shortAnswer: "A vertical line has the form x = k, a horizontal line has y = k.",
    explanation: "Vertical lines have undefined slope and do not intercept the y-axis (unless k=0). Horizontal lines have slope 0 and do not intercept the x-axis (unless k=0).",
    hint: "Vertical: x is constant; horizontal: y is constant.",
    level: "basic",
    codeExample: "x = 5 is vertical; y = -3 is horizontal."
  },
  {
    question: "When do you use a solid line versus a dashed line?",
    shortAnswer: "Solid for ≤ or ≥; dashed for < or >.",
    explanation: "The line type indicates whether points on the line are included in the solution. Solid includes them; dashed excludes them.",
    hint: "Think: 'equal to' means solid.",
    level: "basic",
    codeExample: "y ≤ 2x + 1 → solid; y < 2x + 1 → dashed."
  },
  {
    question: "How do you plot a line that passes through the origin?",
    shortAnswer: "Find one other point using the slope or by choosing a convenient x value, then draw the line through the origin and that point.",
    explanation: "If c=0 in ax+by=0, the line goes through (0,0). Pick any x (e.g., x=1) compute y, plot (1,y), and draw the line through (0,0) and that point.",
    hint: "The origin is one point; you just need one more.",
    level: "intermediate",
    codeExample: "For 2x - y = 0 → y=2x. Points: (0,0) and (1,2)."
  },
  {
    question: "What is the standard form of a linear equation?",
    shortAnswer: "Ax + By = C, where A, B, C are constants and A,B not both zero.",
    explanation: "Standard form is common in LP constraints. It makes intercepts easy to compute. A is the coefficient of x, B of y, C the constant.",
    hint: "It's written as ax + by = c.",
    level: "basic",
    codeExample: "3x + 4y = 12 is in standard form."
  },
  {
    question: "How do you convert a constraint to slope-intercept form?",
    shortAnswer: "Solve for y: y = mx + b, where m is slope and b is y-intercept.",
    explanation: "Isolate y on one side. For ax+by=c, subtract ax and divide by b (if b≠0).",
    hint: "Get y alone.",
    level: "basic",
    codeExample: "2x + 3y = 12 → 3y = -2x + 12 → y = (-2/3)x + 4."
  },
  {
    question: "What is the slope of a vertical line?",
    shortAnswer: "Undefined (or infinite).",
    explanation: "A vertical line has no change in x (Δx=0), so slope = Δy/0 is undefined.",
    hint: "You can't divide by zero.",
    level: "basic",
    codeExample: "x = 4 has undefined slope."
  },
  {
    question: "What is the slope of a horizontal line?",
    shortAnswer: "Zero.",
    explanation: "A horizontal line has no change in y (Δy=0), so slope = 0/Δx = 0.",
    hint: "Flat line = zero slope.",
    level: "basic",
    codeExample: "y = -2 has slope 0."
  },
  {
    question: "How do you find a second point on a line if you only have one intercept?",
    shortAnswer: "Use the slope (if known) or choose another x-value and compute y.",
    explanation: "If you have the y-intercept and slope, you can find another point. If not, pick an easy x (like 1 or -1) and solve for y.",
    hint: "One point plus slope gives the next.",
    level: "intermediate",
    codeExample: "If y = 2x + 3, from (0,3) go up 2, right 1 to (1,5)."
  },
  {
    question: "What is the role of the constant C in ax+by=c?",
    shortAnswer: "It determines the position of the line relative to the origin; it's the value of the expression at the origin (if x=0,y=0 gives C).",
    explanation: "When C=0, the line passes through the origin. Positive C shifts the line away from the origin in the direction of the normal, negative shifts the other way.",
    hint: "It's the 'right-hand side'.",
    level: "intermediate",
    codeExample: "In 2x+3y=12, C=12; at (0,0), 0≠12, so origin not on line."
  },
  {
    question: "How can you quickly identify if a point lies on a line?",
    shortAnswer: "Substitute the point into the equation; if it satisfies, it's on the line.",
    explanation: "For any point (x0,y0) and line ax+by=c, check if a*x0 + b*y0 == c.",
    hint: "Plug it in and see.",
    level: "basic",
    codeExample: "For 2x+3y=12, (6,0) gives 12=12, so on the line."
  },
  {
    question: "What is the difference between plotting an equality and an inequality?",
    shortAnswer: "Equality gives a line; inequality gives a line plus a shaded half-plane.",
    explanation: "Plotting an inequality involves first plotting the equality line, then deciding which side to shade based on a test point.",
    hint: "Inequality = line + shading.",
    level: "basic",
    codeExample: "y = 2x is a line; y ≤ 2x is the line plus the region below it."
  },
  {
    question: "How do you plot a constraint with fractions?",
    shortAnswer: "Clear fractions by multiplying through by the least common denominator, or use decimals.",
    explanation: "Fractions can be messy; multiply by the LCD to get integers, making intercepts easier. Alternatively, use decimal approximations.",
    hint: "Get rid of denominators.",
    level: "intermediate",
    codeExample: "(1/2)x + (1/3)y = 1 → multiply by 6: 3x + 2y = 6."
  },
  {
    question: "What does it mean if a constraint is 'non-binding'?",
    shortAnswer: "At the optimal solution, the constraint is not tight; there is slack or surplus.",
    explanation: "Non-binding means the point does not lie on the constraint line; there is room to move before hitting the constraint.",
    hint: "It's not 'active'.",
    level: "intermediate",
    codeExample: "If optimal is (2,3) and constraint is x+y≤10, then 5≤10, so non-binding."
  },
  {
    question: "How do you plot a constraint with a negative coefficient?",
    shortAnswer: "Same process; be careful with signs when finding intercepts.",
    explanation: "For ax+by=c, if a or b is negative, the intercepts may be negative. Plot them correctly.",
    hint: "Negative intercepts go left or down.",
    level: "intermediate",
    codeExample: "For -2x + 3y = 6, x-intercept: set y=0 → -2x=6 → x=-3 → (-3,0)."
  },
  {
    question: "What is the normal vector of a line?",
    shortAnswer: "The vector (a,b) from ax+by=c is perpendicular to the line.",
    explanation: "The normal vector is useful in understanding the direction of inequality shading and in sensitivity analysis.",
    hint: "It's the coefficients of x and y.",
    level: "expert",
    codeExample: "For 2x+3y=12, normal is (2,3)."
  },
  {
    question: "How do you plot a line when the intercepts are very large?",
    shortAnswer: "Use a different method, like slope-intercept, or choose a scale that fits.",
    explanation: "If intercepts are outside your graph paper, use a smaller scale or use slope method to plot a point within range.",
    hint: "Change the scale or use another point.",
    level: "intermediate",
    codeExample: "For 0.1x + 0.2y = 10, intercepts are (100,0) and (0,50) — use a smaller unit or slope method."
  },
  {
    question: "What is a 'constraint' in linear programming?",
    shortAnswer: "A constraint is a limitation or requirement expressed as a linear inequality or equation.",
    explanation: "Constraints represent resources, capacities, minimum requirements, or other restrictions that must be satisfied.",
    hint: "It's a rule you must follow.",
    level: "basic",
    codeExample: "x + y ≤ 10 is a capacity constraint."
  },
  {
    question: "How do you know if a constraint is redundant?",
    shortAnswer: "If its line does not form any part of the feasible region boundary, it is redundant.",
    explanation: "Redundant constraints don't change the feasible region; removing them does not affect the solution.",
    hint: "If you remove it, the region stays the same.",
    level: "expert",
    codeExample: "With x≥0, y≥0, x+y≤10, the constraint x≤20 is redundant."
  },
  {
    question: "What is the difference between a constraint and an objective?",
    shortAnswer: "Constraints are restrictions; the objective is what we want to maximize or minimize.",
    explanation: "Constraints define the feasible region; the objective function is evaluated over that region to find the optimum.",
    hint: "Constraints limit; objective drives.",
    level: "basic",
    codeExample: "Constraints: x≥0, y≥0, x+y≤10; Objective: Maximize Z=3x+2y."
  },
  {
    question: "How do you plot a line with no x-intercept?",
    shortAnswer: "That means the line is horizontal (y=k) and does not cross the x-axis unless k=0.",
    explanation: "If a=0 in ax+by=c, then by=c → y=c/b, a horizontal line. It has no x-intercept (unless c=0, then y=0).",
    hint: "Horizontal line.",
    level: "intermediate",
    codeExample: "3y = 12 → y=4 → horizontal line at y=4."
  },
  {
    question: "How do you plot a line with no y-intercept?",
    shortAnswer: "That means the line is vertical (x=k) and does not cross the y-axis unless k=0.",
    explanation: "If b=0 in ax+by=c, then ax=c → x=c/a, a vertical line. No y-intercept unless c=0.",
    hint: "Vertical line.",
    level: "intermediate",
    codeExample: "2x = 8 → x=4 → vertical line at x=4."
  },
  {
    question: "What is the relationship between the coefficients a and b and the slope?",
    shortAnswer: "The slope m = -a/b (if b≠0).",
    explanation: "This comes from solving ax+by=c for y: y = (-a/b)x + c/b.",
    hint: "Slope is negative coefficient ratio.",
    level: "intermediate",
    codeExample: "For 2x+3y=12, slope = -2/3."
  },
  {
    question: "How do you check if your plotted line is correct?",
    shortAnswer: "Plug the coordinates of two points on the line into the original equation; both should satisfy.",
    explanation: "If the points you plotted satisfy the equation, the line is correct. Also ensure the line extends across the graph.",
    hint: "Verify with a second point.",
    level: "basic",
    codeExample: "For 2x+3y=12, points (6,0) and (0,4) both work."
  },
  {
    question: "What is a table of values and when is it useful?",
    shortAnswer: "A table of values lists selected x-values and computed y-values; it's useful when intercepts are messy or you need precise points.",
    explanation: "This method is reliable but slower. It works for any equation, especially when slope and intercept are not obvious.",
    hint: "Pick x, compute y.",
    level: "basic",
    codeExample: "For y = 2x - 1, table: x=0→-1, x=1→1, x=2→3."
  },
  {
    question: "How do you handle constraints with '≥' when plotting?",
    shortAnswer: "Plot the line (solid if ≥), then shade the side that makes the inequality true.",
    explanation: "Same as other inequalities. Test a point to decide shading. The line is solid because the equality is included.",
    hint: "Shade above or to the right usually.",
    level: "basic",
    codeExample: "For x + y ≥ 5, line x+y=5 solid, test (0,0) gives 0≥5 false, so shade the other side (above)."
  },
  {
    question: "How do you handle constraints with '≤' when plotting?",
    shortAnswer: "Plot the line (solid if ≤), shade the side that satisfies the inequality.",
    explanation: "Line solid, shade the side where the inequality holds. Often below or to the left.",
    hint: "Shade the origin side if it satisfies.",
    level: "basic",
    codeExample: "For x + y ≤ 5, test (0,0): 0≤5 true → shade below the line."
  },
  {
    question: "What is a 'boundary line'?",
    shortAnswer: "The line obtained by replacing the inequality symbol with an equals sign.",
    explanation: "The boundary line divides the plane into two half-planes. It is the edge of the feasible region.",
    hint: "It's the 'fence' separating allowed from not allowed.",
    level: "basic",
    codeExample: "For y ≤ 2x+1, the boundary line is y=2x+1."
  }
];

export default questions;