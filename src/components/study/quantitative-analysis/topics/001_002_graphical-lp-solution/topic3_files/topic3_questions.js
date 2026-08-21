const questions = [
  {
    question: "What are the coordinates of the origin?",
    shortAnswer: "(0,0)",
    explanation: "The origin is the intersection of the x-axis and y-axis, so both coordinates are zero.",
    hint: "It's the center point.",
    level: "basic",
    codeExample: "Origin = (0,0)."
  },
  {
    question: "How do you plot the point (2,3)?",
    shortAnswer: "Start at the origin, move 2 units right (positive x), then 3 units up (positive y).",
    explanation: "The x-coordinate tells horizontal movement, y-coordinate vertical. Positive x is right, positive y is up.",
    hint: "Right 2, up 3.",
    level: "basic",
    codeExample: "Plot (2,3) by moving right 2 and up 3."
  },
  {
    question: "What is the x-coordinate of a point on the y-axis?",
    shortAnswer: "It is always 0.",
    explanation: "All points on the y-axis have x=0 because they are directly above or below the origin.",
    hint: "y-axis: x=0.",
    level: "basic",
    codeExample: "(0,5) is on the y-axis."
  },
  {
    question: "What is the y-coordinate of a point on the x-axis?",
    shortAnswer: "It is always 0.",
    explanation: "All points on the x-axis have y=0 because they are directly left or right of the origin.",
    hint: "x-axis: y=0.",
    level: "basic",
    codeExample: "(-3,0) is on the x-axis."
  },
  {
    question: "How do you read the coordinates of a point from a graph?",
    shortAnswer: "Find the point's horizontal distance from the origin (x) and vertical distance (y).",
    explanation: "Read the x-value from the x-axis directly below/above the point, and the y-value from the y-axis directly left/right.",
    hint: "Trace down to x-axis, left/right to y-axis.",
    level: "basic",
    codeExample: "If a point is 3 units right and 2 units up, it's (3,2)."
  },
  {
    question: "What is the difference between the abscissa and the ordinate?",
    shortAnswer: "The abscissa is the x-coordinate (first number), the ordinate is the y-coordinate (second number).",
    explanation: "Abscissa = horizontal; ordinate = vertical.",
    hint: "Abscissa = x, ordinate = y.",
    level: "intermediate",
    codeExample: "In (4, -1), abscissa is 4, ordinate is -1."
  },
  {
    question: "What is a coordinate point?",
    shortAnswer: "A coordinate point is a location on the plane specified by an ordered pair (x,y).",
    explanation: "It gives the exact position relative to the origin.",
    hint: "It's the address of a point.",
    level: "basic",
    codeExample: "(3,2) is a coordinate point."
  },
  {
    question: "How many coordinates does a point have in a 2D plane?",
    shortAnswer: "Two: x and y.",
    explanation: "A 2D plane requires two numbers to uniquely locate a point.",
    hint: "Ordered pair has two numbers.",
    level: "basic",
    codeExample: "(x, y)."
  },
  {
    question: "What is the significance of the origin in linear programming?",
    shortAnswer: "It is often a corner point of the feasible region when non-negativity constraints (x≥0, y≥0) are present.",
    explanation: "In many LP problems, the origin is a feasible point and serves as a reference for evaluating the objective function.",
    hint: "It's a common test point and often a candidate for optimal solution.",
    level: "intermediate",
    codeExample: "For constraints x≥0, y≥0, x+y≤10, the origin is a corner point."
  },
  {
    question: "How do you determine the quadrant of a point without drawing?",
    shortAnswer: "Check the signs of x and y.",
    explanation: "QI (+,+), QII (-,+), QIII (-,-), QIV (+,-). If either is zero, it's on an axis.",
    hint: "Signs tell the quadrant.",
    level: "basic",
    codeExample: "(-2,3) → x<0, y>0 → QII."
  },
  {
    question: "What is the distance from the origin to the point (3,4)?",
    shortAnswer: "5 units (by Pythagorean theorem).",
    explanation: "Distance = √(x² + y²) = √(9+16)=√25=5.",
    hint: "Use the distance formula.",
    level: "intermediate",
    codeExample: "√(3²+4²)=5."
  },
  {
    question: "What is the reflection of a point (2,3) across the x-axis?",
    shortAnswer: "(2, -3).",
    explanation: "Reflection across x-axis changes the sign of y.",
    hint: "Flip over the x-axis.",
    level: "intermediate",
    codeExample: "(2,3) → (2,-3)."
  },
  {
    question: "What is the reflection of a point (2,3) across the y-axis?",
    shortAnswer: "(-2, 3).",
    explanation: "Reflection across y-axis changes the sign of x.",
    hint: "Flip over the y-axis.",
    level: "intermediate",
    codeExample: "(2,3) → (-2,3)."
  },
  {
    question: "What are the coordinates of the midpoint between (2,4) and (6,8)?",
    shortAnswer: "(4,6).",
    explanation: "Midpoint = ((2+6)/2, (4+8)/2) = (4,6).",
    hint: "Average the x's and y's.",
    level: "intermediate",
    codeExample: "Midpoint formula: ((x1+x2)/2, (y1+y2)/2)."
  },
  {
    question: "What is the slope of the line through (1,2) and (3,6)?",
    shortAnswer: "2.",
    explanation: "Slope = (6-2)/(3-1) = 4/2 = 2.",
    hint: "Rise over run.",
    level: "intermediate",
    codeExample: "Slope = (y2-y1)/(x2-x1)."
  },
  {
    question: "What is the equation of the line through the origin with slope 3?",
    shortAnswer: "y = 3x.",
    explanation: "Since it passes through origin, intercept is 0, so y = mx.",
    hint: "No intercept term.",
    level: "intermediate",
    codeExample: "y = 3x."
  },
  {
    question: "What is the equation of a vertical line through (2,0)?",
    shortAnswer: "x = 2.",
    explanation: "Vertical lines have the form x = k, where k is the constant x-coordinate.",
    hint: "x is constant.",
    level: "intermediate",
    codeExample: "x = 2."
  },
  {
    question: "What is the equation of a horizontal line through (0,3)?",
    shortAnswer: "y = 3.",
    explanation: "Horizontal lines have the form y = k, where k is the constant y-coordinate.",
    hint: "y is constant.",
    level: "intermediate",
    codeExample: "y = 3."
  },
  {
    question: "How do you know if a point lies on a given line?",
    shortAnswer: "Substitute the point into the line's equation. If it satisfies, the point is on the line.",
    explanation: "For example, for y = 2x + 1, point (1,3) gives 3 = 2*1+1 = 3, so it lies on the line.",
    hint: "Plug and check.",
    level: "basic",
    codeExample: "Check (1,3) in y=2x+1 → 3=3 → true."
  },
  {
    question: "What is the importance of the origin in graphing constraints?",
    shortAnswer: "It is often used as a test point to determine which side of a constraint line to shade.",
    explanation: "If the origin is not on the line, testing it quickly tells you which half-plane satisfies the inequality.",
    hint: "It's easy to evaluate.",
    level: "intermediate",
    codeExample: "For x + y ≤ 10, (0,0) gives 0≤10 true, so shade the side containing the origin."
  },
  {
    question: "What does it mean if a point has both coordinates positive?",
    shortAnswer: "It lies in Quadrant I (top-right).",
    explanation: "Positive x and positive y place the point in the first quadrant.",
    hint: "Both positive = QI.",
    level: "basic",
    codeExample: "(5,7) is in QI."
  },
  {
    question: "What does it mean if a point has both coordinates negative?",
    shortAnswer: "It lies in Quadrant III (bottom-left).",
    explanation: "Negative x and negative y place the point in the third quadrant.",
    hint: "Both negative = QIII.",
    level: "basic",
    codeExample: "(-5,-7) is in QIII."
  },
  {
    question: "What is the difference between a point and a coordinate?",
    shortAnswer: "The coordinate is the ordered pair (x,y), while the point is the actual location on the plane.",
    explanation: "They are often used interchangeably, but coordinate is the numerical address, point is the physical location.",
    hint: "Coordinate = address; point = location.",
    level: "basic",
    codeExample: "The coordinate (3,2) locates point P."
  },
  {
    question: "How do you plot a point with a zero coordinate?",
    shortAnswer: "If x=0, it's on the y-axis; if y=0, it's on the x-axis.",
    explanation: "For (0,4), start at origin and move up 4. For (5,0), move right 5.",
    hint: "One coordinate is zero.",
    level: "basic",
    codeExample: "Plot (0, -2): down 2 on y-axis."
  },
  {
    question: "What is the role of the origin in the coordinate plane?",
    shortAnswer: "It serves as the reference point for all other points.",
    explanation: "All coordinates are measured relative to the origin.",
    hint: "It's the starting point.",
    level: "basic",
    codeExample: "Every point is defined by its distance from origin."
  },
  {
    question: "Can the origin be part of a constraint line?",
    shortAnswer: "Yes, if the constraint passes through the origin (e.g., x = y).",
    explanation: "Some constraints like 2x - y = 0 have the origin as a point on the line.",
    hint: "If the equation holds for (0,0), it passes through origin.",
    level: "intermediate",
    codeExample: "2x - y = 0 → at (0,0): 0=0, so origin lies on it."
  },
  {
    question: "How do you determine if a point is in the feasible region?",
    shortAnswer: "Check if the point satisfies all constraints simultaneously.",
    explanation: "Plug the point into every inequality. If it satisfies all, it's in the feasible region.",
    hint: "Must satisfy every constraint.",
    level: "intermediate",
    codeExample: "For x≥0, y≥0, x+y≤10, point (3,4) satisfies all."
  },
  {
    question: "What is the x-intercept of a line?",
    shortAnswer: "The point where the line crosses the x-axis (y=0).",
    explanation: "Set y=0 and solve for x.",
    hint: "y=0 gives x-intercept.",
    level: "basic",
    codeExample: "For 2x+3y=12, x-intercept is (6,0)."
  },
  {
    question: "What is the y-intercept of a line?",
    shortAnswer: "The point where the line crosses the y-axis (x=0).",
    explanation: "Set x=0 and solve for y.",
    hint: "x=0 gives y-intercept.",
    level: "basic",
    codeExample: "For 2x+3y=12, y-intercept is (0,4)."
  },
  {
    question: "What is the difference between x-intercept and y-intercept?",
    shortAnswer: "x-intercept has y=0; y-intercept has x=0.",
    explanation: "They are the points where the line meets the axes.",
    hint: "One coordinate is zero.",
    level: "basic",
    codeExample: "x-intercept: (a,0); y-intercept: (0,b)."
  }
];

export default questions;