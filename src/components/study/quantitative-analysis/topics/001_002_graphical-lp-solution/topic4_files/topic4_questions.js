const questions = [
  {
    question: "What is the x-intercept of a line?",
    shortAnswer: "The point where the line crosses the x-axis (y=0).",
    explanation: "The x-intercept is (x, 0). To find it, set y=0 in the equation and solve for x.",
    hint: "Set y=0.",
    level: "basic",
    codeExample: "For 2x + 3y = 12, x-intercept is (6,0)."
  },
  {
    question: "What is the y-intercept of a line?",
    shortAnswer: "The point where the line crosses the y-axis (x=0).",
    explanation: "The y-intercept is (0, y). To find it, set x=0 and solve for y.",
    hint: "Set x=0.",
    level: "basic",
    codeExample: "For 2x + 3y = 12, y-intercept is (0,4)."
  },
  {
    question: "How do you find the x-intercept of 3x - 2y = 6?",
    shortAnswer: "Set y=0 → 3x = 6 → x=2 → (2,0).",
    explanation: "Substitute 0 for y and solve for x.",
    hint: "y=0.",
    level: "basic",
    codeExample: "(2,0)."
  },
  {
    question: "How do you find the y-intercept of 3x - 2y = 6?",
    shortAnswer: "Set x=0 → -2y = 6 → y=-3 → (0,-3).",
    explanation: "Substitute 0 for x and solve for y.",
    hint: "x=0.",
    level: "basic",
    codeExample: "(0,-3)."
  },
  {
    question: "What are the intercepts of the line y = 2x + 1?",
    shortAnswer: "x-intercept: (-0.5, 0), y-intercept: (0,1).",
    explanation: "For x-intercept, set y=0: 0=2x+1 → x=-0.5. For y-intercept, x=0 gives y=1.",
    hint: "Plug in zeros.",
    level: "basic",
    codeExample: "(-0.5,0) and (0,1)."
  },
  {
    question: "What if the line passes through the origin? What are the intercepts?",
    shortAnswer: "Both intercepts are (0,0).",
    explanation: "If c=0 in ax+by=c, then the line goes through the origin, so both intercepts are the origin.",
    hint: "c=0.",
    level: "intermediate",
    codeExample: "2x - y = 0 → intercepts (0,0)."
  },
  {
    question: "Can a line have no x-intercept?",
    shortAnswer: "Yes, if it's a horizontal line not on the x-axis (e.g., y=3).",
    explanation: "A horizontal line y=k (k≠0) never crosses the x-axis, so it has no x-intercept.",
    hint: "Horizontal lines (except y=0).",
    level: "intermediate",
    codeExample: "y = 5 has no x-intercept."
  },
  {
    question: "Can a line have no y-intercept?",
    shortAnswer: "Yes, if it's a vertical line not on the y-axis (e.g., x=-2).",
    explanation: "A vertical line x=k (k≠0) never crosses the y-axis, so it has no y-intercept.",
    hint: "Vertical lines (except x=0).",
    level: "intermediate",
    codeExample: "x = -2 has no y-intercept."
  },
  {
    question: "What are the intercepts of the line x = 4?",
    shortAnswer: "x-intercept: (4,0); no y-intercept.",
    explanation: "x=4 is vertical, crosses x-axis at (4,0) and is parallel to y-axis, so no y-intercept.",
    hint: "Vertical line.",
    level: "intermediate",
    codeExample: "(4,0) and no y-intercept."
  },
  {
    question: "What are the intercepts of the line y = -2?",
    shortAnswer: "y-intercept: (0,-2); no x-intercept.",
    explanation: "y=-2 is horizontal, crosses y-axis at (0,-2) and is parallel to x-axis, so no x-intercept.",
    hint: "Horizontal line.",
    level: "intermediate",
    codeExample: "(0,-2) and no x-intercept."
  },
  {
    question: "How do you use intercepts to graph a line?",
    shortAnswer: "Plot the x-intercept and y-intercept, then draw a straight line through them.",
    explanation: "Intercepts give two points that are easy to find and plot. Connect them to get the line.",
    hint: "Two points determine a line.",
    level: "basic",
    codeExample: "Plot (6,0) and (0,4) and draw the line."
  },
  {
    question: "What is the x-intercept of the line 5x + 2y = 10?",
    shortAnswer: "(2,0).",
    explanation: "Set y=0 → 5x=10 → x=2.",
    hint: "y=0.",
    level: "basic",
    codeExample: "(2,0)."
  },
  {
    question: "What is the y-intercept of the line 5x + 2y = 10?",
    shortAnswer: "(0,5).",
    explanation: "Set x=0 → 2y=10 → y=5.",
    hint: "x=0.",
    level: "basic",
    codeExample: "(0,5)."
  },
  {
    question: "What if the intercept is a fraction? How do you plot it?",
    shortAnswer: "Plot the fraction as a decimal or keep it as a fraction and estimate the position.",
    explanation: "Fractions are common. Use a ruler and approximate; the line will still be accurate enough for most LP problems.",
    hint: "Estimate carefully.",
    level: "intermediate",
    codeExample: "For 2x + 5y = 7, x-intercept = (3.5,0), y-intercept = (0,1.4)."
  },
  {
    question: "How do you find intercepts from slope-intercept form (y = mx + b)?",
    shortAnswer: "y-intercept is (0,b). For x-intercept, set y=0 and solve for x: x = -b/m.",
    explanation: "In y = mx + b, the y-intercept is directly b. The x-intercept is found by setting y=0.",
    hint: "b is y-intercept.",
    level: "intermediate",
    codeExample: "y = 2x - 4 → y-intercept (0,-4), x-intercept: 0=2x-4 → x=2 → (2,0)."
  },
  {
    question: "What is the relationship between intercepts and the standard form ax+by=c?",
    shortAnswer: "x-intercept = (c/a, 0) if a≠0; y-intercept = (0, c/b) if b≠0.",
    explanation: "These formulas come from setting y=0 and x=0 respectively.",
    hint: "Divide c by the coefficient of the variable.",
    level: "intermediate",
    codeExample: "For 3x + 4y = 12, x-int=4, y-int=3."
  },
  {
    question: "How do you find the intercepts of a line given two points?",
    shortAnswer: "Find the equation of the line first, then find intercepts.",
    explanation: "Use the two points to get slope and equation, then set y=0 and x=0.",
    hint: "Get the equation first.",
    level: "expert",
    codeExample: "Given (1,2) and (3,6), slope=2, line y=2x, intercepts (0,0)."
  },
  {
    question: "What does the x-intercept represent in a real-world constraint?",
    shortAnswer: "It represents the maximum amount of one variable when the other is zero.",
    explanation: "For a resource constraint, the x-intercept shows the quantity of product X that can be produced if no product Y is made.",
    hint: "Maximum of one product.",
    level: "intermediate",
    codeExample: "For 2x + 3y ≤ 12, x-intercept 6 means max of X is 6 when Y=0."
  },
  {
    question: "What does the y-intercept represent in a real-world constraint?",
    shortAnswer: "It represents the maximum amount of the other variable when the first is zero.",
    explanation: "Similar to x-intercept, it shows the limit of product Y if no product X is made.",
    hint: "Maximum of the other product.",
    level: "intermediate",
    codeExample: "For 2x + 3y ≤ 12, y-intercept 4 means max of Y is 4 when X=0."
  },
  {
    question: "How do you find intercepts of a line in general form?",
    shortAnswer: "Use the formulas: x-intercept = C/A, y-intercept = C/B (if A and B are non-zero).",
    explanation: "For Ax + By = C, set y=0 → x = C/A; set x=0 → y = C/B.",
    hint: "Divide C by the coefficient.",
    level: "intermediate",
    codeExample: "For -2x + 3y = 6, x-int = -3, y-int = 2."
  },
  {
    question: "What if A=0 in Ax + By = C?",
    shortAnswer: "Then the line is horizontal (By = C), so only y-intercept exists (unless C=0, then it's the x-axis).",
    explanation: "If A=0, the equation reduces to By=C → y=C/B, a horizontal line.",
    hint: "Horizontal line.",
    level: "intermediate",
    codeExample: "0x + 2y = 8 → y=4, y-intercept (0,4), no x-intercept."
  },
  {
    question: "What if B=0 in Ax + By = C?",
    shortAnswer: "Then the line is vertical (Ax = C), so only x-intercept exists (unless C=0, then it's the y-axis).",
    explanation: "If B=0, the equation becomes Ax=C → x=C/A, a vertical line.",
    hint: "Vertical line.",
    level: "intermediate",
    codeExample: "3x + 0y = 12 → x=4, x-intercept (4,0), no y-intercept."
  },
  {
    question: "Can a line have both intercepts at the origin?",
    shortAnswer: "Yes, if C=0 in Ax+By=C, the line passes through the origin.",
    explanation: "Then both intercepts are (0,0).",
    hint: "C=0.",
    level: "basic",
    codeExample: "2x - 3y = 0 → intercepts (0,0)."
  },
  {
    question: "How do you find the intercepts of a line from a graph?",
    shortAnswer: "Read where the line crosses the x-axis and y-axis directly from the graph.",
    explanation: "The x-intercept is the point on the x-axis, the y-intercept on the y-axis.",
    hint: "Read from axes.",
    level: "basic",
    codeExample: "If line crosses x-axis at 3 and y-axis at -2, intercepts are (3,0) and (0,-2)."
  },
  {
    question: "Why are intercepts useful in linear programming?",
    shortAnswer: "They allow quick plotting of constraint lines and easy identification of corner points.",
    explanation: "Intercepts give two points to draw a constraint, and they help find the feasible region's vertices.",
    hint: "They make graphing fast.",
    level: "intermediate",
    codeExample: "Plotting constraints using intercepts is the standard method."
  },
  {
    question: "What is the x-intercept of the line 4x - 5y = 20?",
    shortAnswer: "(5,0).",
    explanation: "Set y=0 → 4x=20 → x=5.",
    hint: "y=0.",
    level: "basic",
    codeExample: "(5,0)."
  },
  {
    question: "What is the y-intercept of the line 4x - 5y = 20?",
    shortAnswer: "(0,-4).",
    explanation: "Set x=0 → -5y=20 → y=-4.",
    hint: "x=0.",
    level: "basic",
    codeExample: "(0,-4)."
  },
  {
    question: "How do you find intercepts when the equation is in point-slope form?",
    shortAnswer: "Convert to slope-intercept or standard form, then find intercepts.",
    explanation: "Point-slope y - y1 = m(x - x1) can be rearranged to y = mx + b, then intercepts are easy.",
    hint: "Rearrange first.",
    level: "expert",
    codeExample: "y - 2 = 3(x - 1) → y = 3x - 1 → intercepts (1/3,0) and (0,-1)."
  },
  {
    question: "What is the significance of the intercepts in a feasible region?",
    shortAnswer: "They are often corner points of the feasible region, especially when non-negativity constraints are present.",
    explanation: "When constraints include x≥0 and y≥0, the axes intercepts become vertices of the feasible region.",
    hint: "Corner points.",
    level: "expert",
    codeExample: "In the region x≥0, y≥0, x+y≤10, the intercepts (10,0) and (0,10) are corner points."
  },
  {
    question: "How do you check if you've calculated intercepts correctly?",
    shortAnswer: "Substitute the intercept point back into the original equation.",
    explanation: "For (x,0), plug into equation; it should satisfy. Same for (0,y).",
    hint: "Check by substitution.",
    level: "basic",
    codeExample: "For 2x+3y=12, (6,0) gives 12=12, correct."
  }
];

export default questions;