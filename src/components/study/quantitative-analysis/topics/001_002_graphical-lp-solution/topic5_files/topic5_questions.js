const questions = [
  {
    question: "What is a constraint line in linear programming?",
    shortAnswer: "A constraint line is the boundary of a constraint, representing the limit of a resource or requirement.",
    explanation: "It is the line obtained by replacing the inequality symbol with an equals sign. It divides the plane into feasible and infeasible regions.",
    hint: "It's the 'fence' or boundary.",
    level: "basic",
    codeExample: "For 2x + 3y ≤ 12, the constraint line is 2x + 3y = 12."
  },
  {
    question: "How do you plot a constraint line?",
    shortAnswer: "Find two points (often intercepts), plot them, and draw the line.",
    explanation: "The intercept method is quickest: find x-intercept (set y=0) and y-intercept (set x=0), plot both, and draw the line.",
    hint: "Two points determine a line.",
    level: "basic",
    codeExample: "For 2x+3y=12, plot (6,0) and (0,4)."
  },
  {
    question: "When do you use a solid line for a constraint?",
    shortAnswer: "When the inequality includes 'equal to' (≤ or ≥) or when it's an equality (=).",
    explanation: "Solid lines show that points on the line are included in the feasible region.",
    hint: "≤ or ≥ means solid.",
    level: "basic",
    codeExample: "2x + 3y ≤ 12 → solid line."
  },
  {
    question: "When do you use a dashed line for a constraint?",
    shortAnswer: "When the inequality is strict (< or >), excluding the boundary.",
    explanation: "Dashed lines show that points on the line are NOT included in the feasible region.",
    hint: "< or > means dashed.",
    level: "basic",
    codeExample: "2x + 3y < 12 → dashed line."
  },
  {
    question: "How do you plot a vertical constraint like x = 3?",
    shortAnswer: "Draw a vertical line through x=3, extending across the graph.",
    explanation: "Vertical lines have the form x = k. They are parallel to the y-axis and have no y-intercept.",
    hint: "Vertical line at x=3.",
    level: "intermediate",
    codeExample: "x = 3 → vertical line through (3,0)."
  },
  {
    question: "How do you plot a horizontal constraint like y = -2?",
    shortAnswer: "Draw a horizontal line through y=-2, extending across the graph.",
    explanation: "Horizontal lines have the form y = k. They are parallel to the x-axis and have no x-intercept.",
    hint: "Horizontal line at y=-2.",
    level: "intermediate",
    codeExample: "y = -2 → horizontal line through (0,-2)."
  },
  {
    question: "What are the intercepts of the line 3x + 4y = 12?",
    shortAnswer: "x-intercept: (4,0), y-intercept: (0,3).",
    explanation: "x-intercept: set y=0 → 3x=12 → x=4. y-intercept: set x=0 → 4y=12 → y=3.",
    hint: "Set y=0 for x-int, x=0 for y-int.",
    level: "basic",
    codeExample: "(4,0) and (0,3)."
  },
  {
    question: "How do you plot a line that passes through the origin?",
    shortAnswer: "Find one other point using the slope or a convenient x-value, then draw the line through origin and that point.",
    explanation: "If c=0, the line goes through (0,0). Pick any x (e.g., x=1), compute y, plot (1,y), and draw.",
    hint: "Origin is one point; find another.",
    level: "intermediate",
    codeExample: "2x - y = 0 → y=2x, points (0,0) and (1,2)."
  },
  {
    question: "What is the difference between plotting an equality and an inequality?",
    shortAnswer: "Equality gives just the line; inequality gives the line plus a shaded half-plane.",
    explanation: "Plotting an inequality involves first plotting the equality line, then deciding which side to shade.",
    hint: "Inequality = line + shading.",
    level: "basic",
    codeExample: "y = 2x is a line; y ≤ 2x is the line plus the region below it."
  },
  {
    question: "How do you find a second point on a line if intercepts don't work?",
    shortAnswer: "Choose a convenient x-value (like 1 or 2), plug it into the equation, and solve for y.",
    explanation: "This gives another point on the line. Works for any line, even when intercepts are messy or don't exist.",
    hint: "Pick an easy x, solve for y.",
    level: "intermediate",
    codeExample: "For 3x + 2y = 6, choose x=2 → 6+2y=6 → y=0 → (2,0)."
  },
  {
    question: "How do you plot a constraint with fractions?",
    shortAnswer: "Multiply through by the LCD to get integer coefficients, then plot.",
    explanation: "Fractions are messy. Multiply by the least common denominator to simplify.",
    hint: "Clear fractions first.",
    level: "intermediate",
    codeExample: "(1/2)x + (1/3)y = 1 → multiply by 6: 3x + 2y = 6."
  },
  {
    question: "What does it mean if a constraint is 'binding'?",
    shortAnswer: "At the optimal solution, the constraint is tight (equality holds).",
    explanation: "A binding constraint limits the solution. It has zero slack for ≤ constraints.",
    hint: "It's 'active' at the optimum.",
    level: "intermediate",
    codeExample: "If optimal is (2,3) and constraint 2x+3y=12 gives equality, it's binding."
  },
  {
    question: "What does it mean if a constraint is 'non-binding'?",
    shortAnswer: "At the optimal solution, the constraint is not tight; there is slack.",
    explanation: "Non-binding means the optimal point doesn't lie on the constraint line.",
    hint: "There's room to spare.",
    level: "intermediate",
    codeExample: "If optimal is (2,3) and constraint x+y≤10 gives 5≤10, it's non-binding."
  },
  {
    question: "How do you plot a line with a negative slope?",
    shortAnswer: "Find intercepts and plot them; the line will slope downward from left to right.",
    explanation: "Negative slope means as x increases, y decreases. Intercepts will be on different sides of the origin.",
    hint: "Slopes downward.",
    level: "basic",
    codeExample: "2x + 3y = 12 has slope -2/3, intercepts (6,0) and (0,4)."
  },
  {
    question: "How do you plot a line with a positive slope?",
    shortAnswer: "Find intercepts and plot them; the line will slope upward from left to right.",
    explanation: "Positive slope means as x increases, y increases. Intercepts will be on opposite sides of the origin.",
    hint: "Slopes upward.",
    level: "basic",
    codeExample: "2x - 3y = 6 has slope 2/3, intercepts (3,0) and (0,-2)."
  },
  {
    question: "What is the role of the constraint line in LP?",
    shortAnswer: "It defines the boundary of the feasible region and helps identify corner points.",
    explanation: "Constraint lines form the edges of the feasible region. Their intersections are corner points where optimal solutions may occur.",
    hint: "It's the edge of the feasible region.",
    level: "intermediate",
    codeExample: "Constraints x+y≤10, x≥0, y≥0 form a triangular region with lines as boundaries."
  },
  {
    question: "Can a constraint line be redundant?",
    shortAnswer: "Yes, if it doesn't affect the feasible region (doesn't form part of the boundary).",
    explanation: "A redundant constraint is 'inside' the feasible region and doesn't change its shape.",
    hint: "It's not needed.",
    level: "expert",
    codeExample: "With x≥0, y≥0, x+y≤10, the constraint x≤20 is redundant."
  },
  {
    question: "How do you plot a line if the intercepts are outside the graph?",
    shortAnswer: "Use the slope method or scale down the axes to fit the intercepts.",
    explanation: "If intercepts are large, choose a different scale (e.g., 1 unit = 10 instead of 1) or use slope to find points within range.",
    hint: "Adjust the scale or use slope.",
    level: "intermediate",
    codeExample: "For 0.1x + 0.2y = 10, intercepts are (100,0) and (0,50) — use a smaller unit."
  },
  {
    question: "How do you verify that you've plotted a constraint line correctly?",
    shortAnswer: "Plug the coordinates of a point on the line back into the original equation.",
    explanation: "If the point satisfies the equation (or inequality), your line is correct.",
    hint: "Check with a known point.",
    level: "basic",
    codeExample: "For 2x+3y=12, check (6,0): 12=12, correct."
  },
  {
    question: "What is the difference between a constraint and an objective function line?",
    shortAnswer: "A constraint line represents a limitation; an objective function line represents a level of profit/cost.",
    explanation: "Constraints are fixed boundaries; objective function lines are moved parallel to find the optimum.",
    hint: "Constraints limit; objective optimizes.",
    level: "intermediate",
    codeExample: "Constraint: 2x+3y≤12; Objective: 3x+4y = Z."
  },
  {
    question: "How do you plot a constraint with '≤'?",
    shortAnswer: "Plot the boundary line (solid), then shade the side that satisfies the inequality.",
    explanation: "The line is solid because points on the line are included. Shading comes next.",
    hint: "Solid line, then shade.",
    level: "basic",
    codeExample: "x + y ≤ 10 → solid line x+y=10, shade below."
  },
  {
    question: "How do you plot a constraint with '≥'?",
    shortAnswer: "Plot the boundary line (solid), then shade the side that satisfies the inequality.",
    explanation: "Same as ≤, but shade the opposite side (above or to the right typically).",
    hint: "Solid line, shade above/right.",
    level: "basic",
    codeExample: "x + y ≥ 10 → solid line x+y=10, shade above."
  },
  {
    question: "How do you plot a constraint with '<'?",
    shortAnswer: "Plot the boundary line (dashed), then shade the side that satisfies the inequality.",
    explanation: "Dashed line shows points on the line are excluded.",
    hint: "Dashed line, then shade.",
    level: "basic",
    codeExample: "x + y < 10 → dashed line x+y=10, shade below."
  },
  {
    question: "How do you plot a constraint with '>'?",
    shortAnswer: "Plot the boundary line (dashed), then shade the side that satisfies the inequality.",
    explanation: "Dashed line excludes the boundary.",
    hint: "Dashed line, shade above/right.",
    level: "basic",
    codeExample: "x + y > 10 → dashed line x+y=10, shade above."
  },
  {
    question: "What is the standard form of a linear equation?",
    shortAnswer: "Ax + By = C, where A, B, C are constants.",
    explanation: "Standard form is common in LP constraints. It makes intercepts easy to compute.",
    hint: "Ax + By = C.",
    level: "basic",
    codeExample: "3x + 4y = 12 is in standard form."
  },
  {
    question: "How do you convert a constraint to slope-intercept form?",
    shortAnswer: "Solve for y: y = mx + b.",
    explanation: "Isolate y. This gives slope and y-intercept directly.",
    hint: "Get y alone.",
    level: "intermediate",
    codeExample: "2x + 3y = 12 → y = (-2/3)x + 4."
  },
  {
    question: "What is the slope of the line 2x + 3y = 12?",
    shortAnswer: "-2/3.",
    explanation: "Slope = -a/b = -2/3. It means for every 3 units right, the line goes 2 units down.",
    hint: "Slope = -a/b.",
    level: "intermediate",
    codeExample: "Slope = -2/3."
  },
  {
    question: "How do you plot a line when you only have the slope and one point?",
    shortAnswer: "Plot the point, then use the slope to find another point (rise/run).",
    explanation: "From the known point, move according to the slope to find a second point, then draw the line.",
    hint: "Use rise over run.",
    level: "intermediate",
    codeExample: "From (2,3) with slope 2, go up 2, right 1 to (3,5)."
  },
  {
    question: "What is a 'constraint' in linear programming?",
    shortAnswer: "A constraint is a limitation or requirement expressed as a linear inequality or equation.",
    explanation: "Constraints represent resources, capacities, minimum requirements, or other restrictions.",
    hint: "It's a rule you must follow.",
    level: "basic",
    codeExample: "x + y ≤ 10 is a capacity constraint."
  },
  {
    question: "How do you know if a constraint is redundant?",
    shortAnswer: "If its line does not form any part of the feasible region boundary.",
    explanation: "Redundant constraints don't change the feasible region; removing them does not affect the solution.",
    hint: "If you remove it, the region stays the same.",
    level: "expert",
    codeExample: "With x≥0, y≥0, x+y≤10, the constraint x≤20 is redundant."
  }
];

export default questions;