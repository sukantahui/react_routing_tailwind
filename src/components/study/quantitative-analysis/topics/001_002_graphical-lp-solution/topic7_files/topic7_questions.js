const questions = [
  {
    question: "What is shading in the context of linear inequalities?",
    shortAnswer: "Shading is the visual representation of the half-plane that satisfies the inequality.",
    explanation: "After plotting the boundary line, shading marks all points that satisfy the inequality. It shows the feasible region for that constraint.",
    hint: "It's the 'filled in' area on the graph.",
    level: "basic",
    codeExample: "For x+y≤10, shade below the line x+y=10."
  },
  {
    question: "How do you determine which side to shade?",
    shortAnswer: "Test a point not on the line. If it satisfies the inequality, shade its side; otherwise shade the opposite side.",
    explanation: "The test point method is reliable and works for any linear inequality.",
    hint: "Test first, then shade.",
    level: "basic",
    codeExample: "For x+y≤10, test (0,0): 0≤10 true → shade origin side."
  },
  {
    question: "What does the shaded region represent?",
    shortAnswer: "The shaded region represents all points (x,y) that satisfy the inequality.",
    explanation: "Every point in the shaded half-plane makes the inequality true. Points outside make it false.",
    hint: "It's the solution set.",
    level: "basic",
    codeExample: "For x+y≤10, all points below the line satisfy the inequality."
  },
  {
    question: "When do you shade above a line?",
    shortAnswer: "For ≥ or > inequalities (when the line slopes upward) or for certain forms of ≤ with negative slope.",
    explanation: "Generally, ≥ means shade above the line. Test a point to be sure.",
    hint: "≥ often means above.",
    level: "basic",
    codeExample: "For y ≥ 2x+1, shade above the line y=2x+1."
  },
  {
    question: "When do you shade below a line?",
    shortAnswer: "For ≤ or < inequalities (when the line slopes upward) or for certain forms of ≥ with negative slope.",
    explanation: "Generally, ≤ means shade below. Always test to confirm.",
    hint: "≤ often means below.",
    level: "basic",
    codeExample: "For y ≤ 2x+1, shade below the line y=2x+1."
  },
  {
    question: "How do you shade for x ≤ 3?",
    shortAnswer: "Draw a vertical line at x=3 (solid), then shade the left side (x values less than 3).",
    explanation: "For vertical inequalities, shade the side of the line that satisfies the inequality.",
    hint: "Shade left for ≤, right for ≥.",
    level: "intermediate",
    codeExample: "x ≤ 3 → shade left of x=3."
  },
  {
    question: "How do you shade for x ≥ 3?",
    shortAnswer: "Draw a vertical line at x=3 (solid), then shade the right side (x values greater than 3).",
    explanation: "For ≥, shade to the right of the vertical line.",
    hint: "Shade right for ≥.",
    level: "intermediate",
    codeExample: "x ≥ 3 → shade right of x=3."
  },
  {
    question: "How do you shade for y ≤ -2?",
    shortAnswer: "Draw a horizontal line at y=-2 (solid), then shade below (y values less than -2).",
    explanation: "For horizontal inequalities, shade below for ≤, above for ≥.",
    hint: "Shade below for ≤.",
    level: "intermediate",
    codeExample: "y ≤ -2 → shade below y=-2."
  },
  {
    question: "How do you shade for y ≥ -2?",
    shortAnswer: "Draw a horizontal line at y=-2 (solid), then shade above (y values greater than -2).",
    explanation: "For ≥, shade above the horizontal line.",
    hint: "Shade above for ≥.",
    level: "intermediate",
    codeExample: "y ≥ -2 → shade above y=-2."
  },
  {
    question: "What is the difference in shading for ≤ vs <?",
    shortAnswer: "The shading is the same direction, but the line is solid for ≤ and dashed for <.",
    explanation: "Both shade the same side, but < excludes the boundary line (dashed).",
    hint: "Same side, different line type.",
    level: "intermediate",
    codeExample: "x+y≤10 and x+y<10 both shade below, but ≤ has solid line, < has dashed."
  },
  {
    question: "What is the difference in shading for ≥ vs >?",
    shortAnswer: "The shading is the same direction, but the line is solid for ≥ and dashed for >.",
    explanation: "Both shade the same side, but > excludes the boundary line (dashed).",
    hint: "Same side, different line type.",
    level: "intermediate",
    codeExample: "x+y≥10 and x+y>10 both shade above, but ≥ has solid line, > has dashed."
  },
  {
    question: "What if the test point gives equality?",
    shortAnswer: "It means the point is on the boundary line. Choose a different test point.",
    explanation: "Equality doesn't help determine which side to shade. Pick any point not on the line.",
    hint: "Pick another point.",
    level: "intermediate",
    codeExample: "For x+y=10, (5,5) is on the line → not useful for testing."
  },
  {
    question: "Can you shade both sides of a line?",
    shortAnswer: "No, an inequality only selects one half-plane. Shading both sides would be incorrect.",
    explanation: "An inequality is either true or false for a given point. It can't be both.",
    hint: "Only one side is feasible.",
    level: "basic",
    codeExample: "For x+y≤10, only one side satisfies the inequality."
  },
  {
    question: "How do you shade for a system of inequalities?",
    shortAnswer: "Shade each constraint separately, then find the overlapping shaded region.",
    explanation: "The feasible region is the intersection of all shaded half-planes.",
    hint: "Overlap of all shadings.",
    level: "intermediate",
    codeExample: "For x≥0, y≥0, x+y≤10, shade each and find the overlapping triangle."
  },
  {
    question: "What is the feasible region?",
    shortAnswer: "The feasible region is the set of all points that satisfy all constraints simultaneously.",
    explanation: "It's the overlapping shaded area from all constraints in the system.",
    hint: "The overlap of all shadings.",
    level: "intermediate",
    codeExample: "The triangular region formed by x≥0, y≥0, x+y≤10."
  },
  {
    question: "How do you test if a point is in the shaded region?",
    shortAnswer: "Check if the point satisfies the inequality. If it does, it's in the shaded region.",
    explanation: "The shaded region is defined by the inequality. Any point in it satisfies the inequality.",
    hint: "Plug in and check.",
    level: "basic",
    codeExample: "For x+y≤10, (3,4) satisfies → in shaded region."
  },
  {
    question: "What happens if the line passes through the origin?",
    shortAnswer: "The origin is on the line, so you must choose a different test point.",
    explanation: "Since the origin is on the boundary, testing it gives equality. Use (1,0) or (0,1) instead.",
    hint: "Origin is on line → pick another.",
    level: "intermediate",
    codeExample: "For 2x-y=0, test (1,0) to determine shading."
  },
  {
    question: "How do you shade for a constraint like 2x + 3y ≤ 12?",
    shortAnswer: "Plot the line 2x+3y=12 (solid), test (0,0): 0≤12 true → shade below the line.",
    explanation: "The origin satisfies the inequality, so shade the side containing the origin.",
    hint: "Shade origin side.",
    level: "basic",
    codeExample: "Shade below the line 2x+3y=12."
  },
  {
    question: "How do you shade for a constraint like 2x + 3y ≥ 12?",
    shortAnswer: "Plot the line 2x+3y=12 (solid), test (0,0): 0≥12 false → shade above the line.",
    explanation: "The origin fails, so shade the opposite side (above).",
    hint: "Shade opposite to origin.",
    level: "basic",
    codeExample: "Shade above the line 2x+3y=12."
  },
  {
    question: "How do you shade for a constraint like 2x + 3y < 12?",
    shortAnswer: "Plot the line 2x+3y=12 (dashed), test (0,0): 0<12 true → shade below the line.",
    explanation: "Same side as ≤, but line is dashed because points on the line are not included.",
    hint: "Same side, dashed line.",
    level: "basic",
    codeExample: "Shade below with dashed line."
  },
  {
    question: "How do you shade for a constraint like 2x + 3y > 12?",
    shortAnswer: "Plot the line 2x+3y=12 (dashed), test (0,0): 0>12 false → shade above the line.",
    explanation: "Same side as ≥, but line is dashed because points on the line are not included.",
    hint: "Same side, dashed line.",
    level: "basic",
    codeExample: "Shade above with dashed line."
  },
  {
    question: "What is the role of shading in linear programming?",
    shortAnswer: "Shading helps visualize the feasible region where all constraints are satisfied.",
    explanation: "The overlapping shaded area shows all possible solutions. The optimal solution lies within this region.",
    hint: "It builds the feasible region.",
    level: "intermediate",
    codeExample: "Shade each constraint to find the feasible region."
  },
  {
    question: "How do you know if you've shaded correctly?",
    shortAnswer: "Test a point in the shaded region — it should satisfy the inequality. Test a point outside — it should not.",
    explanation: "Always verify your shading with at least one point from each side.",
    hint: "Test points to verify.",
    level: "basic",
    codeExample: "For x+y≤10, check (0,0) in shaded region → true, (10,10) outside → false."
  },
  {
    question: "What is the difference between shading and hatching?",
    shortAnswer: "Shading fills the region with color or pattern; hatching uses parallel lines.",
    explanation: "Both are acceptable. Hatching is often used in exams for clarity.",
    hint: "Hatching = lines; shading = fill.",
    level: "basic",
    codeExample: "Use diagonal lines (hatching) or light color (shading)."
  },
  {
    question: "Can you use a calculator to determine shading?",
    shortAnswer: "Yes, but understanding the concept is more important. A calculator can test points quickly.",
    explanation: "While calculators help, the test point method is simple enough to do by hand.",
    hint: "Understand the method, use tools if needed.",
    level: "intermediate",
    codeExample: "Plug coordinates into calculator to check inequality."
  },
  {
    question: "What if the inequality is in a form like y ≤ mx + b?",
    shortAnswer: "Plot the line y=mx+b (solid), then shade below the line.",
    explanation: "For y ≤ mx+b, shade below. For y ≥ mx+b, shade above.",
    hint: "Slope-intercept form makes shading intuitive.",
    level: "intermediate",
    codeExample: "y ≤ 2x+1 → shade below y=2x+1."
  },
  {
    question: "How do you shade for multiple constraints on one graph?",
    shortAnswer: "Shade each constraint with a different pattern or color, then find the overlap.",
    explanation: "The feasible region is where all shadings intersect. Label each constraint clearly.",
    hint: "Overlap of all shadings.",
    level: "intermediate",
    codeExample: "Use different colors for each constraint and find the common area."
  },
  {
    question: "What is the significance of the boundary line in shading?",
    shortAnswer: "The boundary line separates the feasible and infeasible regions.",
    explanation: "Points on the line satisfy equality (if solid) or are excluded (if dashed).",
    hint: "It's the dividing line.",
    level: "basic",
    codeExample: "The line x+y=10 divides the plane into x+y<10 and x+y>10."
  },
  {
    question: "How do you shade for a constraint with fractional coefficients?",
    shortAnswer: "Same process: plot the line, test a point, and shade the appropriate side.",
    explanation: "Fractions don't change the shading method. Just be careful with calculations.",
    hint: "Same method, careful with fractions.",
    level: "intermediate",
    codeExample: "For (1/2)x + (1/3)y ≤ 1, test (0,0): 0≤1 true → shade origin side."
  },
  {
    question: "What if the feasible region is empty?",
    shortAnswer: "If constraints conflict, there's no shading overlap. The problem is infeasible.",
    explanation: "If no point satisfies all constraints, there is no feasible region and no solution.",
    hint: "No overlap = infeasible.",
    level: "expert",
    codeExample: "x≥5 and x≤3 → no overlap → infeasible."
  },
  {
    question: "How do you check if your shading is accurate?",
    shortAnswer: "Pick a point in the shaded area and verify it satisfies the inequality. Pick a point outside and verify it doesn't.",
    explanation: "This double-check ensures you shaded the correct half-plane.",
    hint: "Test one in, one out.",
    level: "basic",
    codeExample: "For x+y≤10, check (0,0) in → true, (10,0) out → false."
  }
];

export default questions;