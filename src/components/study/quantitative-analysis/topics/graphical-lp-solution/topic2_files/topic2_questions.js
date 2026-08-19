const questions = [
  {
    question: "What is the x-axis?",
    shortAnswer: "The x-axis is the horizontal number line in the coordinate plane.",
    explanation: "It runs left to right. Positive numbers are to the right of the origin, negative to the left. It's often the independent variable.",
    hint: "Think 'horizontal'.",
    level: "basic",
    codeExample: "x-axis: y=0 for all points on it."
  },
  {
    question: "What is the y-axis?",
    shortAnswer: "The y-axis is the vertical number line in the coordinate plane.",
    explanation: "It runs up and down. Positive numbers are above the origin, negative below. It's often the dependent variable.",
    hint: "Think 'vertical'.",
    level: "basic",
    codeExample: "y-axis: x=0 for all points on it."
  },
  {
    question: "What is the origin?",
    shortAnswer: "The origin is the point (0,0) where the x-axis and y-axis intersect.",
    explanation: "It's the reference point from which all coordinates are measured. It divides the plane into four quadrants.",
    hint: "The center of the coordinate system.",
    level: "basic",
    codeExample: "Origin is (0,0)."
  },
  {
    question: "What is an ordered pair?",
    shortAnswer: "An ordered pair (x, y) gives the coordinates of a point, with x first, then y.",
    explanation: "The order matters: (2,3) is different from (3,2). The first number is the horizontal position, the second is vertical.",
    hint: "x comes before y.",
    level: "basic",
    codeExample: "Point (4, -1) means 4 units right, 1 unit down."
  },
  {
    question: "How do you plot the point (3, -2)?",
    shortAnswer: "Start at the origin, move 3 units right (positive x), then 2 units down (negative y).",
    explanation: "The x-coordinate tells horizontal movement, y-coordinate vertical. Positive x = right, negative x = left; positive y = up, negative y = down.",
    hint: "Right 3, down 2.",
    level: "basic",
    codeExample: "Plot (3,-2) by moving right 3 and down 2."
  },
  {
    question: "What are the four quadrants?",
    shortAnswer: "The quadrants are the four regions divided by the axes: QI (+,+), QII (-,+), QIII (-,-), QIV (+,-).",
    explanation: "They are numbered counterclockwise starting from the top right. The signs of x and y determine which quadrant a point lies in.",
    hint: "Top right is QI.",
    level: "basic",
    codeExample: "(2,3) is QI; (-2,3) is QII; (-2,-3) is QIII; (2,-3) is QIV."
  },
  {
    question: "What is the x-coordinate of any point on the y-axis?",
    shortAnswer: "It is always 0.",
    explanation: "All points on the y-axis have x=0 because they are directly above or below the origin.",
    hint: "y-axis: x=0.",
    level: "basic",
    codeExample: "(0,5) is on the y-axis."
  },
  {
    question: "What is the y-coordinate of any point on the x-axis?",
    shortAnswer: "It is always 0.",
    explanation: "All points on the x-axis have y=0 because they are directly left or right of the origin.",
    hint: "x-axis: y=0.",
    level: "basic",
    codeExample: "(-3,0) is on the x-axis."
  },
  {
    question: "What are the signs of coordinates in Quadrant I?",
    shortAnswer: "(+,+) — both positive.",
    explanation: "In QI, x>0 and y>0. This is the top-right region.",
    hint: "All positive.",
    level: "basic",
    codeExample: "(5,2) is in QI."
  },
  {
    question: "What are the signs of coordinates in Quadrant II?",
    shortAnswer: "(-,+) — x negative, y positive.",
    explanation: "In QII, x<0 and y>0. This is the top-left region.",
    hint: "Negative x, positive y.",
    level: "basic",
    codeExample: "(-3,4) is in QII."
  },
  {
    question: "What are the signs of coordinates in Quadrant III?",
    shortAnswer: "(-,-) — both negative.",
    explanation: "In QIII, x<0 and y<0. This is the bottom-left region.",
    hint: "Both negative.",
    level: "basic",
    codeExample: "(-5,-1) is in QIII."
  },
  {
    question: "What are the signs of coordinates in Quadrant IV?",
    shortAnswer: "(+,-) — x positive, y negative.",
    explanation: "In QIV, x>0 and y<0. This is the bottom-right region.",
    hint: "Positive x, negative y.",
    level: "basic",
    codeExample: "(4,-2) is in QIV."
  },
  {
    question: "What is the difference between the x-axis and the y-axis?",
    shortAnswer: "The x-axis is horizontal, the y-axis is vertical.",
    explanation: "They are perpendicular number lines that intersect at the origin. They give a 2D coordinate system.",
    hint: "Horizontal vs vertical.",
    level: "basic",
    codeExample: "x-axis: left-right; y-axis: up-down."
  },
  {
    question: "Why is the x-coordinate written first?",
    shortAnswer: "By convention, the horizontal coordinate is listed first, followed by the vertical.",
    explanation: "This is standard in mathematics (x,y) and is always followed in coordinate geometry.",
    hint: "It's the established order.",
    level: "basic",
    codeExample: "(x,y) not (y,x)."
  },
  {
    question: "How do you know if a point is on an axis?",
    shortAnswer: "If x=0, it's on the y-axis; if y=0, it's on the x-axis.",
    explanation: "Points on axes have one coordinate zero. The origin is on both axes.",
    hint: "One coordinate is zero.",
    level: "basic",
    codeExample: "(0,7) on y-axis; (5,0) on x-axis."
  },
  {
    question: "What is the distance from the origin to a point?",
    shortAnswer: "The distance is the length of the straight line, computed via the Pythagorean theorem: √(x² + y²).",
    explanation: "This is the Euclidean distance. It's useful in some LP contexts, though less common.",
    hint: "Square root of (x²+y²).",
    level: "intermediate",
    codeExample: "For (3,4), distance = √(9+16)=5."
  },
  {
    question: "What are the axes used for in linear programming?",
    shortAnswer: "They represent the decision variables. The x-axis often represents one variable (e.g., quantity of product A) and the y-axis another (product B).",
    explanation: "Constraints are plotted as lines on these axes, and the feasible region is found in the first quadrant if non-negativity is imposed.",
    hint: "They map the two variables.",
    level: "intermediate",
    codeExample: "Maximize Z = 3x + 2y subject to x≥0, y≥0, x+y≤10."
  },
  {
    question: "What is the scale on the axes?",
    shortAnswer: "The scale is the interval between tick marks (e.g., each unit = 1, 10, or 100).",
    explanation: "Choosing an appropriate scale is important to fit the data. It should be consistent on both axes.",
    hint: "It's the step size.",
    level: "basic",
    codeExample: "If each tick is 5, then x=10 is two ticks right."
  },
  {
    question: "How do you label the axes?",
    shortAnswer: "Label the x-axis with the variable it represents (e.g., 'x' or 'Units of A'), and the y-axis similarly.",
    explanation: "Clear labeling is crucial for interpretation. Also include units if applicable.",
    hint: "Always name the axes.",
    level: "basic",
    codeExample: "x-axis: 'Time (hours)', y-axis: 'Temperature (°C)'."
  },
  {
    question: "What is the abscissa?",
    shortAnswer: "The abscissa is the x-coordinate (the first number in the ordered pair).",
    explanation: "It's an older term for the x-value. It tells the horizontal position.",
    hint: "Abscissa = x.",
    level: "intermediate",
    codeExample: "In (5,2), the abscissa is 5."
  },
  {
    question: "What is the ordinate?",
    shortAnswer: "The ordinate is the y-coordinate (the second number in the ordered pair).",
    explanation: "It's the vertical coordinate. It tells the vertical position.",
    hint: "Ordinate = y.",
    level: "intermediate",
    codeExample: "In (5,2), the ordinate is 2."
  },
  {
    question: "How do you plot a point with negative coordinates?",
    shortAnswer: "Move left for negative x, down for negative y.",
    explanation: "Negative x means left of the origin; negative y means below the origin.",
    hint: "Left and down.",
    level: "basic",
    codeExample: "(-2, -3): left 2, down 3."
  },
  {
    question: "What is the reflection of a point across the x-axis?",
    shortAnswer: "The reflection is (x, -y).",
    explanation: "It flips the point over the x-axis. The x-coordinate stays the same, y changes sign.",
    hint: "Change the sign of y.",
    level: "intermediate",
    codeExample: "Reflection of (3,4) across x-axis is (3,-4)."
  },
  {
    question: "What is the reflection of a point across the y-axis?",
    shortAnswer: "The reflection is (-x, y).",
    explanation: "It flips the point over the y-axis. The y-coordinate stays the same, x changes sign.",
    hint: "Change the sign of x.",
    level: "intermediate",
    codeExample: "Reflection of (3,4) across y-axis is (-3,4)."
  },
  {
    question: "How do you determine if two points are symmetric about the origin?",
    shortAnswer: "They are symmetric if their coordinates are opposites: (x,y) and (-x,-y).",
    explanation: "This is a rotation of 180° about the origin.",
    hint: "Both signs change.",
    level: "intermediate",
    codeExample: "(2,3) and (-2,-3) are symmetric about the origin."
  },
  {
    question: "What is the midpoint formula?",
    shortAnswer: "The midpoint between (x1,y1) and (x2,y2) is ((x1+x2)/2, (y1+y2)/2).",
    explanation: "It finds the average of the x and y coordinates.",
    hint: "Average the x's and y's.",
    level: "intermediate",
    codeExample: "Midpoint of (2,4) and (6,8) is (4,6)."
  },
  {
    question: "What is the slope of a line?",
    shortAnswer: "Slope = (change in y) / (change in x) = (y2-y1)/(x2-x1).",
    explanation: "Slope measures steepness. It's the rate of change. In constraints, it affects the angle of the line.",
    hint: "Rise over run.",
    level: "intermediate",
    codeExample: "Line through (1,2) and (3,6) has slope (6-2)/(3-1)=2."
  },
  {
    question: "What is the equation of the x-axis?",
    shortAnswer: "y = 0.",
    explanation: "The x-axis consists of all points with y=0.",
    hint: "y is zero.",
    level: "basic",
    codeExample: "y=0 is the x-axis."
  },
  {
    question: "What is the equation of the y-axis?",
    shortAnswer: "x = 0.",
    explanation: "The y-axis consists of all points with x=0.",
    hint: "x is zero.",
    level: "basic",
    codeExample: "x=0 is the y-axis."
  },
  {
    question: "How do you find the quadrant of a point without drawing?",
    shortAnswer: "Check the signs of x and y. Use the quadrant rules: (+,+)=QI; (-,+)=QII; (-,-)=QIII; (+,-)=QIV.",
    explanation: "Just look at the signs; if either coordinate is zero, the point is on an axis, not in a quadrant.",
    hint: "Signs of x and y.",
    level: "basic",
    codeExample: "(-5,2) → x<0, y>0 → QII."
  },
  {
    question: "What is the difference between a coordinate and a point?",
    shortAnswer: "A coordinate is the ordered pair (x,y); a point is the location on the plane represented by that pair.",
    explanation: "They are often used interchangeably, but technically the coordinate is the numerical address, and the point is the physical location.",
    hint: "Coordinate = address; point = location.",
    level: "basic",
    codeExample: "Coordinate (2,3) locates point P."
  }
];

export default questions;