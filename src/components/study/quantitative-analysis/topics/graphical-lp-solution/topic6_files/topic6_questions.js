const questions = [
  {
    question: "Why do we test a point when graphing linear inequalities?",
    shortAnswer: "To determine which side of the boundary line satisfies the inequality.",
    explanation: "The line divides the plane into two half-planes. Testing one point tells you which whole half-plane to shade.",
    hint: "It tells you which side is feasible.",
    level: "basic",
    codeExample: "Test (0,0) in 2x+3y≤12 → 0≤12 true → shade origin side."
  },
  {
    question: "What is the test point method?",
    shortAnswer: "A method to determine the feasible side of an inequality by substituting a point not on the line.",
    explanation: "Choose a point, substitute into the inequality, and check if it's true. The truth value tells you which side to shade.",
    hint: "Substitute and check.",
    level: "basic",
    codeExample: "For y ≤ 2x+1, test (0,0): 0≤1 true → shade below."
  },
  {
    question: "What is the best test point to use?",
    shortAnswer: "The origin (0,0) is usually the best — it's the easiest to evaluate.",
    explanation: "The origin gives 0 on both sides, making calculations simple. Use it unless the line passes through the origin.",
    hint: "Use (0,0) unless it's on the line.",
    level: "basic",
    codeExample: "Test (0,0) in x+y≤10 → 0≤10 true."
  },
  {
    question: "What should you do if the origin lies on the boundary line?",
    shortAnswer: "Choose another test point, like (1,0) or (0,1).",
    explanation: "If the origin is on the line, it gives equality (true for both sides). You need a point that's not on the line.",
    hint: "Pick a different easy point.",
    level: "intermediate",
    codeExample: "For 2x - y = 0, origin is on line, test (1,0): 2≤0 false."
  },
  {
    question: "How do you know if a point satisfies an inequality?",
    shortAnswer: "Substitute the point's coordinates into the inequality and check if the statement is true.",
    explanation: "If the inequality holds (e.g., 5 ≤ 10 is true), the point satisfies it. If not (e.g., 12 ≤ 10 is false), it doesn't.",
    hint: "Plug in and check.",
    level: "basic",
    codeExample: "For x+2y≤8, test (2,3): 2+6=8≤8 true."
  },
  {
    question: "What does it mean if a test point satisfies the inequality?",
    shortAnswer: "It means the side containing that point is the feasible side.",
    explanation: "The whole half-plane on that side of the line will satisfy the inequality.",
    hint: "Shade the test point's side.",
    level: "basic",
    codeExample: "For x+y≤5, (0,0) satisfies → shade origin side."
  },
  {
    question: "What does it mean if a test point does NOT satisfy the inequality?",
    shortAnswer: "It means the opposite side of the line is the feasible side.",
    explanation: "If the test point fails, the other half-plane (not containing the test point) satisfies the inequality.",
    hint: "Shade the opposite side.",
    level: "basic",
    codeExample: "For x+y≥5, (0,0) fails → shade the other side."
  },
  {
    question: "Can you test any point not on the line?",
    shortAnswer: "Yes, any point not on the line works. Some are just easier to evaluate.",
    explanation: "The method works for any point. Choose one with simple coordinates for easy calculation.",
    hint: "Pick any point off the line.",
    level: "basic",
    codeExample: "Test (3,1) in 2x+y≤10: 7≤10 true → shade that side."
  },
  {
    question: "What is the relationship between the test point and the shaded region?",
    shortAnswer: "If the test point satisfies the inequality, the shaded region is on the same side as the test point.",
    explanation: "The test point determines which side of the line is feasible. The shaded region includes the test point's side.",
    hint: "True = shade test point side.",
    level: "basic",
    codeExample: "For y≤2x, (0,0) true → shade below."
  },
  {
    question: "How do you test a point for a '≤' inequality?",
    shortAnswer: "Substitute the point and check if LHS ≤ RHS.",
    explanation: "The inequality holds if the left side is less than or equal to the right side.",
    hint: "Check if ≤ is true.",
    level: "basic",
    codeExample: "For 2x+3y≤12, test (1,2): 2+6=8≤12 true."
  },
  {
    question: "How do you test a point for a '≥' inequality?",
    shortAnswer: "Substitute the point and check if LHS ≥ RHS.",
    explanation: "The inequality holds if the left side is greater than or equal to the right side.",
    hint: "Check if ≥ is true.",
    level: "basic",
    codeExample: "For 2x+3y≥12, test (3,2): 6+6=12≥12 true."
  },
  {
    question: "How do you test a point for a '<' inequality?",
    shortAnswer: "Substitute the point and check if LHS < RHS (strictly less).",
    explanation: "The inequality holds if the left side is strictly less than the right side. Equality is not allowed.",
    hint: "Check if < is true (not equal).",
    level: "basic",
    codeExample: "For 2x+3y<12, test (1,2): 8<12 true."
  },
  {
    question: "How do you test a point for a '>' inequality?",
    shortAnswer: "Substitute the point and check if LHS > RHS (strictly greater).",
    explanation: "The inequality holds if the left side is strictly greater than the right side. Equality is not allowed.",
    hint: "Check if > is true (not equal).",
    level: "basic",
    codeExample: "For 2x+3y>12, test (3,3): 15>12 true."
  },
  {
    question: "What if the test point gives equality?",
    shortAnswer: "It means the point is on the boundary line. Choose a different test point.",
    explanation: "Equality doesn't tell you which side to shade. Pick a point not on the line.",
    hint: "Point is on the line — pick another.",
    level: "intermediate",
    codeExample: "For 2x+3y=12, (6,0) gives equality → not useful for testing."
  },
  {
    question: "Why is the origin preferred as a test point?",
    shortAnswer: "It gives simple arithmetic (0+0=0) and is easy to compare.",
    explanation: "The origin makes calculations trivial. You just compare 0 to the constant term.",
    hint: "Simple math.",
    level: "basic",
    codeExample: "For 2x+3y≤12, (0,0) gives 0≤12 true."
  },
  {
    question: "What if the line passes through the origin?",
    shortAnswer: "The origin is on the line, so you must choose a different test point.",
    explanation: "If the origin is on the line, testing it gives equality, not truth. Use (1,0) or (0,1).",
    hint: "Origin is on line → pick another.",
    level: "intermediate",
    codeExample: "For 2x-y=0, test (1,0): 2≤0 false."
  },
  {
    question: "How do you test a point for a vertical line constraint?",
    shortAnswer: "Substitute the point into the inequality just like any other.",
    explanation: "For x ≤ k, test if the point's x-coordinate satisfies the inequality. For x ≥ k, similarly.",
    hint: "Check the x-coordinate.",
    level: "intermediate",
    codeExample: "For x≤3, test (2,5): 2≤3 true."
  },
  {
    question: "How do you test a point for a horizontal line constraint?",
    shortAnswer: "Substitute the point into the inequality; check the y-coordinate.",
    explanation: "For y ≤ k, test if the y-coordinate satisfies. For y ≥ k, similarly.",
    hint: "Check the y-coordinate.",
    level: "intermediate",
    codeExample: "For y≥-2, test (1,-1): -1≥-2 true."
  },
  {
    question: "What is a half-plane?",
    shortAnswer: "One of the two regions into which a line divides the coordinate plane.",
    explanation: "A line splits the plane into two half-planes. An inequality selects one of them.",
    hint: "One side of a line.",
    level: "basic",
    codeExample: "For x+y≤10, the half-plane below the line is feasible."
  },
  {
    question: "How do you determine which half-plane is feasible?",
    shortAnswer: "Test a point not on the line. If it satisfies, that half-plane is feasible.",
    explanation: "All points in a half-plane behave the same way with respect to the inequality.",
    hint: "Test one point to know the whole half-plane.",
    level: "basic",
    codeExample: "Test (0,0) in x+y≤10 → true → origin half-plane is feasible."
  },
  {
    question: "Can you use a point on the axis as a test point?",
    shortAnswer: "Yes, as long as it's not on the boundary line.",
    explanation: "Points on axes (like (1,0) or (0,1)) are fine to test if they're not on the line.",
    hint: "Axis points are okay if off the line.",
    level: "basic",
    codeExample: "For 2x+3y≤12, test (1,0): 2≤12 true."
  },
  {
    question: "What is the difference between testing for ≤ and <?",
    shortAnswer: "For ≤, equality is allowed (point on line is feasible). For <, equality is not allowed.",
    explanation: "This affects shading of the boundary line itself, but the half-plane direction is the same.",
    hint: "≤ includes the line; < excludes it.",
    level: "intermediate",
    codeExample: "x+y≤10 includes points on x+y=10; x+y<10 excludes them."
  },
  {
    question: "What is the difference between testing for ≥ and >?",
    shortAnswer: "For ≥, equality is allowed (point on line is feasible). For >, equality is not allowed.",
    explanation: "Same half-plane, but line type differs (solid vs dashed).",
    hint: "≥ includes the line; > excludes it.",
    level: "intermediate",
    codeExample: "x+y≥10 includes points on x+y=10; x+y>10 excludes them."
  },
  {
    question: "How do you know if you've chosen the wrong test point?",
    shortAnswer: "If the test point is on the line, you'll get equality — choose another point.",
    explanation: "Equality doesn't tell you which side to shade, so it's not useful.",
    hint: "If you get equality, pick a different point.",
    level: "basic",
    codeExample: "For 2x+3y=12, (6,0) gives 12=12 → not useful."
  },
  {
    question: "What is the significance of the test point in LP?",
    shortAnswer: "It determines the feasible side of each constraint, which defines the feasible region.",
    explanation: "Testing each constraint's point tells you where the feasible region lies.",
    hint: "It helps build the feasible region.",
    level: "intermediate",
    codeExample: "Test each constraint to find the overlapping feasible region."
  },
  {
    question: "How do you test a point for a system of inequalities?",
    shortAnswer: "Test the point against every inequality in the system.",
    explanation: "A point is feasible if it satisfies ALL inequalities simultaneously.",
    hint: "Must satisfy every constraint.",
    level: "intermediate",
    codeExample: "For x≥0, y≥0, x+y≤10, test (3,4): satisfies all."
  },
  {
    question: "What does it mean if a point fails one inequality?",
    shortAnswer: "The point is infeasible — it's not in the feasible region.",
    explanation: "Even if it satisfies all others, failing one means it's not a valid solution.",
    hint: "One failure = infeasible.",
    level: "basic",
    codeExample: "For x≥0, y≥0, x+y≤10, test (-1,5): fails x≥0."
  },
  {
    question: "How do you test a point with fractions or decimals?",
    shortAnswer: "Substitute the values as given, or convert to decimals for easier calculation.",
    explanation: "Fractions work fine, just be careful with arithmetic.",
    hint: "Use decimals if easier.",
    level: "intermediate",
    codeExample: "For 2x+3y≤12, test (1.5,2): 3+6=9≤12 true."
  },
  {
    question: "What is the connection between test points and corner points?",
    shortAnswer: "Corner points are intersections of constraint lines. They are often tested to find the optimum.",
    explanation: "While any point can be tested for feasibility, corner points are where we evaluate the objective function.",
    hint: "Corner points are special test points.",
    level: "expert",
    codeExample: "Test (6,0), (0,4), and (0,0) as corner points of the feasible region."
  },
  {
    question: "How do you document the test point result on a graph?",
    shortAnswer: "Mark the tested point, write '✓' if true or '✗' if false, and shade accordingly.",
    explanation: "Good documentation helps verify your work and avoid errors.",
    hint: "Mark true/false on the graph.",
    level: "basic",
    codeExample: "Write '✓ (0,0)' near the origin if it satisfies the inequality."
  }
];

export default questions;