const questions = [
  {
    question: "What is an iso-profit line?",
    shortAnswer: "A line where the profit is constant.",
    explanation: "An iso-profit line represents all combinations of x and y that give the same profit. The term 'iso' means equal.",
    hint: "Equal profit line.",
    level: "basic",
    codeExample: "For P=3x+4y, 3x+4y=12 is an iso-profit line."
  },
  {
    question: "What does 'iso' mean in iso-profit?",
    shortAnswer: "It means 'equal' (from Greek).",
    explanation: "Iso-profit lines are lines of equal profit. All points on the line give the same profit value.",
    hint: "Equal.",
    level: "basic",
    codeExample: "Iso = equal."
  },
  {
    question: "How do you draw an iso-profit line?",
    shortAnswer: "Choose a profit value, find intercepts, and draw the line.",
    explanation: "For P=ax+by, the x-intercept is P/a and the y-intercept is P/b. Plot these points and draw the line.",
    hint: "Use intercepts.",
    level: "intermediate",
    codeExample: "For P=12, 3x+4y=12 → intercepts (4,0) and (0,3)."
  },
  {
    question: "What is the slope of an iso-profit line?",
    shortAnswer: "-a/b for P = ax + by.",
    explanation: "Rewrite as by = -ax + P, so slope = -a/b.",
    hint: "Slope = -a/b.",
    level: "intermediate",
    codeExample: "For P=3x+4y, slope = -3/4."
  },
  {
    question: "Are all iso-profit lines parallel?",
    shortAnswer: "Yes, they all have the same slope.",
    explanation: "The slope of P=ax+by is -a/b, which is independent of P. So all iso-profit lines are parallel.",
    hint: "Same slope.",
    level: "intermediate",
    codeExample: "3x+4y=12 and 3x+4y=24 are parallel."
  },
  {
    question: "How do you find the maximum profit graphically?",
    shortAnswer: "Move the iso-profit line outward until it just touches the feasible region.",
    explanation: "The highest profit line that still intersects the feasible region gives the maximum profit at the point of contact.",
    hint: "Move outward.",
    level: "intermediate",
    codeExample: "The line with the highest P that touches the region."
  },
  {
    question: "What is the optimal iso-profit line?",
    shortAnswer: "The iso-profit line that just touches the feasible region.",
    explanation: "For maximization, it's the line with the highest profit that still intersects the feasible region.",
    hint: "Just touching.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region."
  },
  {
    question: "Where does the optimal iso-profit line touch the feasible region?",
    shortAnswer: "At a corner point (or along an edge).",
    explanation: "The optimal solution is always at a corner point, except in multiple optima cases where it can be along an edge.",
    hint: "At a corner point.",
    level: "intermediate",
    codeExample: "The line touches at a corner point."
  },
  {
    question: "What happens when the iso-profit line is parallel to a constraint?",
    shortAnswer: "There may be multiple optimal solutions along the edge.",
    explanation: "If the iso-profit line has the same slope as a constraint edge, any point on that edge gives the same maximum profit.",
    hint: "Multiple optima.",
    level: "expert",
    codeExample: "P=2x+2y and x+y=10 → all points on the edge give P=20."
  },
  {
    question: "How do you read the profit from an iso-profit line?",
    shortAnswer: "The profit value is the constant P in the equation.",
    explanation: "For the line ax+by=P, the profit is the value of P. Higher P lines mean higher profit.",
    hint: "P is the profit.",
    level: "basic",
    codeExample: "3x+4y=12 means profit is ₹12."
  },
  {
    question: "What is the difference between iso-profit and iso-cost?",
    shortAnswer: "Iso-profit is for maximization; iso-cost is for minimization.",
    explanation: "Iso-profit lines move outward for higher profit. Iso-cost lines move inward for lower cost.",
    hint: "Profit vs cost.",
    level: "intermediate",
    codeExample: "Iso-profit: 3x+4y=P; Iso-cost: 2x+3y=C."
  },
  {
    question: "How do you know which direction to move iso-profit lines?",
    shortAnswer: "Move outward (away from origin) for higher profit.",
    explanation: "Increasing P moves the line away from the origin. The optimal line is the farthest one that still touches the feasible region.",
    hint: "Away from origin.",
    level: "basic",
    codeExample: "Move from P=12 to P=24 to P=36."
  },
  {
    question: "What is the significance of the intercepts of an iso-profit line?",
    shortAnswer: "They show the maximum of each variable if the other is zero.",
    explanation: "The x-intercept shows how much x you can have if y=0 to achieve the profit. The y-intercept shows the opposite.",
    hint: "Maximums with other variable zero.",
    level: "intermediate",
    codeExample: "For P=12, x-intercept=4 (if y=0), y-intercept=3 (if x=0)."
  },
  {
    question: "Can an iso-profit line be vertical?",
    shortAnswer: "Yes, if the coefficient of y is zero (P = ax).",
    explanation: "If P = ax, the iso-profit line is vertical at x = P/a.",
    hint: "Vertical when b=0.",
    level: "expert",
    codeExample: "P = 3x → vertical lines at x=P/3."
  },
  {
    question: "Can an iso-profit line be horizontal?",
    shortAnswer: "Yes, if the coefficient of x is zero (P = by).",
    explanation: "If P = by, the iso-profit line is horizontal at y = P/b.",
    hint: "Horizontal when a=0.",
    level: "expert",
    codeExample: "P = 4y → horizontal lines at y=P/4."
  },
  {
    question: "How do you find the optimal profit value?",
    shortAnswer: "Substitute the optimal point into the profit function.",
    explanation: "Once you find the optimal corner point, plug its coordinates into P = ax + by.",
    hint: "Plug in the coordinates.",
    level: "intermediate",
    codeExample: "At (4,3), P = 3(4) + 4(3) = ₹24."
  },
  {
    question: "What is the role of iso-profit lines in LP?",
    shortAnswer: "They help find the maximum profit solution graphically.",
    explanation: "Iso-profit lines are the key tool for finding the optimal solution in profit maximization problems.",
    hint: "Finding max profit.",
    level: "basic",
    codeExample: "Move the line to find the best profit."
  },
  {
    question: "How do you identify the optimal iso-profit line on a graph?",
    shortAnswer: "Look for the line with the highest profit that still touches the feasible region.",
    explanation: "The optimal line is the one that is about to leave the feasible region.",
    hint: "Highest line touching the region.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region."
  },
  {
    question: "What happens if the iso-profit line doesn't touch the feasible region?",
    shortAnswer: "The profit is not attainable — choose a lower profit.",
    explanation: "If the line doesn't intersect the feasible region, that profit level is impossible.",
    hint: "Not attainable.",
    level: "intermediate",
    codeExample: "A line outside the region means profit is too high."
  },
  {
    question: "What is the difference between an iso-profit line and an objective function line?",
    shortAnswer: "They are the same thing — iso-profit is the specific name for maximization.",
    explanation: "Objective function lines are called iso-profit lines when maximizing profit.",
    hint: "Same concept, specific name.",
    level: "basic",
    codeExample: "The objective line for profit is an iso-profit line."
  },
  {
    question: "How do you handle iso-profit lines with fractions?",
    shortAnswer: "Use decimals to plot the line, or multiply by a common factor.",
    explanation: "Fractional coefficients can be handled by multiplying the entire equation by a power of 10.",
    hint: "Multiply to clear fractions.",
    level: "intermediate",
    codeExample: "P = 0.5x + 0.75y → multiply by 4: 4P = 2x + 3y."
  },
  {
    question: "What is the most common mistake with iso-profit lines?",
    shortAnswer: "Moving the lines inward instead of outward.",
    explanation: "For maximization, you need to move iso-profit lines outward (away from origin). Moving inward decreases profit.",
    hint: "Move outward for max.",
    level: "basic",
    codeExample: "For max profit, move P from 12 to 24 to 36."
  },
  {
    question: "How do you know if you've found the maximum profit?",
    shortAnswer: "The iso-profit line is about to leave the feasible region.",
    explanation: "If moving the line any further outward would leave the region, you've found the maximum.",
    hint: "About to leave.",
    level: "intermediate",
    codeExample: "The line is tangent to the region."
  },
  {
    question: "What is the relationship between iso-profit lines and corner points?",
    shortAnswer: "The optimal iso-profit line touches the feasible region at a corner point.",
    explanation: "The maximum profit occurs at a corner point where the iso-profit line is tangent to the region.",
    hint: "Optimum at corners.",
    level: "intermediate",
    codeExample: "The line with the highest P touches at a corner point."
  },
  {
    question: "How do you check if a profit is attainable?",
    shortAnswer: "Check if the iso-profit line intersects the feasible region.",
    explanation: "If the line for a given profit intersects the region, that profit is attainable.",
    hint: "Check intersection.",
    level: "intermediate",
    codeExample: "If 3x+4y=24 touches the region, P=24 is attainable."
  },
  {
    question: "What if multiple iso-profit lines give the same optimal point?",
    shortAnswer: "There are multiple optimal solutions (if lines overlap an edge).",
    explanation: "If the optimal iso-profit line overlaps a constraint edge, any point on that edge is optimal.",
    hint: "Multiple optima.",
    level: "expert",
    codeExample: "P=2x+2y and x+y=10 → all points on the edge are optimal."
  },
  {
    question: "How do you find the profit at a corner point?",
    shortAnswer: "Substitute the corner point's coordinates into the profit function.",
    explanation: "For each corner point, compute P = ax + by to find the profit at that point.",
    hint: "Plug into profit function.",
    level: "basic",
    codeExample: "At (4,3), P = 3(4) + 4(3) = ₹24."
  },
  {
    question: "What is the first step in using iso-profit lines?",
    shortAnswer: "Write the profit function in standard form: P = ax + by.",
    explanation: "Before drawing lines, make sure you know the coefficients a and b.",
    hint: "Write in standard form.",
    level: "basic",
    codeExample: "P = 3x + 4y is already in standard form."
  },
  {
    question: "How do you handle iso-profit lines with decimals?",
    shortAnswer: "Use decimals to plot the line, or multiply by a common factor.",
    explanation: "Decimal coefficients can be handled by multiplying the entire equation by a power of 10.",
    hint: "Multiply to clear decimals.",
    level: "intermediate",
    codeExample: "P = 0.5x + 0.75y → multiply by 4: 4P = 2x + 3y."
  },
  {
    question: "What is the difference between iso-profit and profit function?",
    shortAnswer: "Iso-profit is a line; profit function is the equation.",
    explanation: "The profit function is P = ax + by. An iso-profit line is the equation for a specific P value.",
    hint: "Function vs specific line.",
    level: "basic",
    codeExample: "Profit function: P=3x+4y; Iso-profit: 3x+4y=12."
  },
  {
    question: "What is the most important rule for iso-profit lines?",
    shortAnswer: "Move outward for maximum profit.",
    explanation: "For profit maximization, you always move iso-profit lines outward (away from the origin).",
    hint: "Outward for max.",
    level: "basic",
    codeExample: "Increase P to move the line outward."
  }
];

export default questions;