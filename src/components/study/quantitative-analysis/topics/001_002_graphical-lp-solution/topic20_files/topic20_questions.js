const questions = [
  {
    question: "What is an objective function line?",
    shortAnswer: "A line where the objective function has a constant value.",
    explanation: "For Z = ax + by, an objective line is ax + by = Z for some constant Z. All points on this line give the same Z value.",
    hint: "Constant Z line.",
    level: "basic",
    codeExample: "For Z=3x+4y, 3x+4y=12 is an objective line."
  },
  {
    question: "How do you draw an objective function line?",
    shortAnswer: "Choose a Z value, find intercepts, and draw the line.",
    explanation: "For Z = ax + by, the x-intercept is Z/a and the y-intercept is Z/b. Plot these points and draw the line.",
    hint: "Use intercepts.",
    level: "intermediate",
    codeExample: "For Z=12, 3x+4y=12 → intercepts (4,0) and (0,3)."
  },
  {
    question: "What are the intercepts of an objective line?",
    shortAnswer: "x-intercept: Z/a, y-intercept: Z/b for Z = ax + by.",
    explanation: "Set y=0 to find x-intercept (Z/a, 0). Set x=0 to find y-intercept (0, Z/b).",
    hint: "Z divided by coefficients.",
    level: "intermediate",
    codeExample: "For Z=12, a=3, b=4: x-int=4, y-int=3."
  },
  {
    question: "Are all objective lines parallel?",
    shortAnswer: "Yes, they all have the same slope.",
    explanation: "The slope of ax + by = Z is -a/b, which is independent of Z. So all objective lines are parallel.",
    hint: "Same slope.",
    level: "intermediate",
    codeExample: "3x+4y=12 and 3x+4y=24 are parallel."
  },
  {
    question: "What is the slope of an objective line?",
    shortAnswer: "-a/b for Z = ax + by.",
    explanation: "Rewrite as by = -ax + Z, so slope = -a/b.",
    hint: "Slope = -a/b.",
    level: "intermediate",
    codeExample: "For Z=3x+4y, slope = -3/4."
  },
  {
    question: "How do you find the optimal objective line?",
    shortAnswer: "It's the line that just touches the feasible region.",
    explanation: "For maximization, it's the line farthest from the origin that still touches the region. For minimization, it's the line closest to the origin.",
    hint: "Just touches the region.",
    level: "intermediate",
    codeExample: "The line with the highest Z that still intersects the feasible region."
  },
  {
    question: "What happens when the objective line is parallel to a constraint?",
    shortAnswer: "There may be multiple optimal solutions along the edge.",
    explanation: "If the objective line has the same slope as a constraint edge, any point on that edge is optimal.",
    hint: "Multiple optima.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → all points on the edge give Z=10."
  },
  {
    question: "How do you move the objective line for maximization?",
    shortAnswer: "Move it in the direction of increasing Z (away from the origin).",
    explanation: "Increase Z to move the line outward. The optimal line is the last one that still touches the feasible region.",
    hint: "Away from origin.",
    level: "basic",
    codeExample: "Increase Z from 12 to 24 to 36."
  },
  {
    question: "How do you move the objective line for minimization?",
    shortAnswer: "Move it in the direction of decreasing Z (toward the origin).",
    explanation: "Decrease Z to move the line inward. The optimal line is the first one that touches the feasible region.",
    hint: "Toward origin.",
    level: "basic",
    codeExample: "Decrease Z from 12 to 6 to 0."
  },
  {
    question: "What is the relationship between the objective line and corner points?",
    shortAnswer: "The optimal objective line will touch the feasible region at a corner point.",
    explanation: "The optimal solution is always at a corner point (or along an edge in multiple optima cases).",
    hint: "Optimum at corners.",
    level: "intermediate",
    codeExample: "The line with the highest Z touches at a corner point."
  },
  {
    question: "How do you know if you've found the optimal objective line?",
    shortAnswer: "The line is about to leave the feasible region (for max) or just entering (for min).",
    explanation: "For maximization, the line is as far from the origin as possible while still touching the region.",
    hint: "About to leave or just entered.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region."
  },
  {
    question: "What is the difference between an objective line and a constraint line?",
    shortAnswer: "Objective lines represent goals; constraint lines represent limitations.",
    explanation: "Objective lines are moved to find the optimum. Constraint lines are fixed boundaries of the feasible region.",
    hint: "Goal vs limitations.",
    level: "basic",
    codeExample: "Objective: Z=3x+4y; Constraint: x+y≤10."
  },
  {
    question: "Can the objective line be vertical?",
    shortAnswer: "Yes, if the coefficient of y is zero (Z = ax).",
    explanation: "If Z = ax, the objective line is vertical at x = Z/a.",
    hint: "Vertical when b=0.",
    level: "expert",
    codeExample: "Z = 3x → vertical lines at x=Z/3."
  },
  {
    question: "Can the objective line be horizontal?",
    shortAnswer: "Yes, if the coefficient of x is zero (Z = by).",
    explanation: "If Z = by, the objective line is horizontal at y = Z/b.",
    hint: "Horizontal when a=0.",
    level: "expert",
    codeExample: "Z = 4y → horizontal lines at y=Z/4."
  },
  {
    question: "How do you find the optimal Z value?",
    shortAnswer: "Substitute the optimal point into the objective function.",
    explanation: "Once you find the optimal corner point, plug its coordinates into Z = ax + by.",
    hint: "Plug in the coordinates.",
    level: "intermediate",
    codeExample: "At (4,3), Z = 3(4) + 4(3) = 24."
  },
  {
    question: "What is the significance of the objective line's intercepts?",
    shortAnswer: "They show where the line crosses the axes and help draw the line.",
    explanation: "The intercepts are the points where the objective line meets the x-axis and y-axis.",
    hint: "Crossing points.",
    level: "intermediate",
    codeExample: "For Z=12, intercepts are (4,0) and (0,3)."
  },
  {
    question: "How do you draw multiple objective lines?",
    shortAnswer: "Choose different Z values and draw parallel lines for each.",
    explanation: "Each Z value gives a different line. All lines are parallel with the same slope.",
    hint: "Parallel lines.",
    level: "intermediate",
    codeExample: "Draw Z=12, Z=20, Z=24 as parallel lines."
  },
  {
    question: "What is the role of the objective line in LP?",
    shortAnswer: "It helps find the optimal solution by moving across the feasible region.",
    explanation: "The objective line is the key tool for graphically finding the optimal solution.",
    hint: "Finding the optimum.",
    level: "basic",
    codeExample: "Move the line to find the best point."
  },
  {
    question: "How do you identify the optimal objective line on a graph?",
    shortAnswer: "Look for the line that is tangent to the feasible region at a corner point.",
    explanation: "For maximization, it's the line with the highest Z that still touches the region.",
    hint: "Tangent line.",
    level: "intermediate",
    codeExample: "The line is about to leave the region."
  },
  {
    question: "What happens if the objective line doesn't touch the feasible region?",
    shortAnswer: "The Z value is not feasible — choose a different Z.",
    explanation: "If the line doesn't intersect the feasible region, that Z value is not attainable.",
    hint: "Not feasible.",
    level: "intermediate",
    codeExample: "A line outside the region means Z is too high (for max)."
  },
  {
    question: "How do you handle an objective line with negative coefficients?",
    shortAnswer: "The line still moves parallel, but the direction of improvement changes.",
    explanation: "With negative coefficients, higher Z may mean moving toward the origin. The slope changes accordingly.",
    hint: "Direction may change.",
    level: "expert",
    codeExample: "Z = 3x - 2y has slope -3/-2 = 1.5."
  },
  {
    question: "What is the relationship between the objective line and the feasible region?",
    shortAnswer: "The optimal solution is where the objective line just touches the feasible region.",
    explanation: "The feasible region constrains where the objective line can go. The optimal line is the one that just fits.",
    hint: "Just touching.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region."
  },
  {
    question: "How do you know if the objective line is optimal for maximization?",
    shortAnswer: "It's the last line that still intersects the feasible region.",
    explanation: "Move the line outward until it's about to leave the region. That's the optimal line.",
    hint: "Last intersection.",
    level: "intermediate",
    codeExample: "The line with the maximum Z that still touches the region."
  },
  {
    question: "How do you know if the objective line is optimal for minimization?",
    shortAnswer: "It's the first line that intersects the feasible region.",
    explanation: "Move the line inward until it just touches the region. That's the optimal line.",
    hint: "First intersection.",
    level: "intermediate",
    codeExample: "The line with the minimum Z that touches the region."
  },
  {
    question: "What is the difference between an iso-profit and iso-cost line?",
    shortAnswer: "Iso-profit is for maximization; iso-cost is for minimization.",
    explanation: "Both are objective lines. Iso-profit lines have increasing Z outward; iso-cost lines have decreasing Z inward.",
    hint: "Profit vs cost.",
    level: "intermediate",
    codeExample: "Iso-profit: 3x+4y=Z; Iso-cost: 2x+3y=Z."
  },
  {
    question: "How do you find the intercepts if Z is negative?",
    shortAnswer: "Use the same formulas: x = Z/a, y = Z/b.",
    explanation: "Negative Z values give negative intercepts, which are plotted on the negative axes.",
    hint: "Same formulas.",
    level: "expert",
    codeExample: "Z=-6, a=3, b=4 → x-int=-2, y-int=-1.5."
  },
  {
    question: "What is the optimal solution when the objective line overlaps an edge?",
    shortAnswer: "There are multiple optimal solutions along that edge.",
    explanation: "If the objective line coincides with a constraint edge, any point on that edge gives the same optimal Z.",
    hint: "Multiple optima.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → all points on the edge are optimal."
  },
  {
    question: "How do you handle objective lines with decimals?",
    shortAnswer: "Use decimals to plot the line, or multiply by a common factor.",
    explanation: "Decimal coefficients can be handled by multiplying the entire equation by a power of 10.",
    hint: "Multiply to clear decimals.",
    level: "intermediate",
    codeExample: "Z = 0.5x + 0.75y → multiply by 4: 4Z = 2x + 3y."
  },
  {
    question: "What is the first step in using objective lines?",
    shortAnswer: "Write the objective function in standard form: Z = ax + by.",
    explanation: "Before drawing lines, make sure you know the coefficients a and b.",
    hint: "Write in standard form.",
    level: "basic",
    codeExample: "Z = 3x + 4y is already in standard form."
  },
  {
    question: "How do you check if an objective line is optimal?",
    shortAnswer: "Verify that moving it any further would leave the feasible region.",
    explanation: "Check that the line touches the feasible region at a corner point and that no other line gives a better Z.",
    hint: "Check the corners.",
    level: "intermediate",
    codeExample: "Check all corner points to verify the optimum."
  },
  {
    question: "What is the most common mistake with objective lines?",
    shortAnswer: "Moving the line in the wrong direction for max/min.",
    explanation: "Students often move maximization lines toward the origin or minimization lines away from the origin.",
    hint: "Check your direction.",
    level: "basic",
    codeExample: "For max, move away from origin; for min, move toward origin."
  }
];

export default questions;