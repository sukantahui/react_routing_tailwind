const questions = [
  {
    question: "What is an iso-cost line?",
    shortAnswer: "A line where the cost is constant.",
    explanation: "An iso-cost line represents all combinations of x and y that give the same cost. The term 'iso' means equal.",
    hint: "Equal cost line.",
    level: "basic",
    codeExample: "For C=2x+3y, 2x+3y=12 is an iso-cost line."
  },
  {
    question: "What does 'iso' mean in iso-cost?",
    shortAnswer: "It means 'equal' (from Greek).",
    explanation: "Iso-cost lines are lines of equal cost. All points on the line give the same cost value.",
    hint: "Equal.",
    level: "basic",
    codeExample: "Iso = equal."
  },
  {
    question: "How do you draw an iso-cost line?",
    shortAnswer: "Choose a cost value, find intercepts, and draw the line.",
    explanation: "For C=ax+by, the x-intercept is C/a and the y-intercept is C/b. Plot these points and draw the line.",
    hint: "Use intercepts.",
    level: "intermediate",
    codeExample: "For C=12, 2x+3y=12 → intercepts (6,0) and (0,4)."
  },
  {
    question: "What is the slope of an iso-cost line?",
    shortAnswer: "-a/b for C = ax + by.",
    explanation: "Rewrite as by = -ax + C, so slope = -a/b.",
    hint: "Slope = -a/b.",
    level: "intermediate",
    codeExample: "For C=2x+3y, slope = -2/3."
  },
  {
    question: "Are all iso-cost lines parallel?",
    shortAnswer: "Yes, they all have the same slope.",
    explanation: "The slope of C=ax+by is -a/b, which is independent of C. So all iso-cost lines are parallel.",
    hint: "Same slope.",
    level: "intermediate",
    codeExample: "2x+3y=12 and 2x+3y=24 are parallel."
  },
  {
    question: "How do you find the minimum cost graphically?",
    shortAnswer: "Move the iso-cost line inward until it just touches the feasible region.",
    explanation: "The lowest cost line that still intersects the feasible region gives the minimum cost at the point of contact.",
    hint: "Move inward.",
    level: "intermediate",
    codeExample: "The line with the lowest C that touches the region."
  },
  {
    question: "What is the optimal iso-cost line?",
    shortAnswer: "The iso-cost line that just touches the feasible region.",
    explanation: "For minimization, it's the line with the lowest cost that still intersects the feasible region.",
    hint: "Just touching.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region."
  },
  {
    question: "Where does the optimal iso-cost line touch the feasible region?",
    shortAnswer: "At a corner point (or along an edge).",
    explanation: "The optimal solution is always at a corner point, except in multiple optima cases where it can be along an edge.",
    hint: "At a corner point.",
    level: "intermediate",
    codeExample: "The line touches at a corner point."
  },
  {
    question: "What is the difference between iso-cost and iso-profit lines?",
    shortAnswer: "Iso-cost is for minimization; iso-profit is for maximization.",
    explanation: "Iso-cost lines move inward for lower cost. Iso-profit lines move outward for higher profit.",
    hint: "Cost vs profit.",
    level: "intermediate",
    codeExample: "Iso-cost: 2x+3y=C; Iso-profit: 3x+4y=P."
  },
  {
    question: "How do you know which direction to move iso-cost lines?",
    shortAnswer: "Move inward (toward the origin) for lower cost.",
    explanation: "Decreasing C moves the line toward the origin. The optimal line is the one that just touches the feasible region.",
    hint: "Toward origin.",
    level: "basic",
    codeExample: "Move from C=12 to C=8 to C=6."
  },
  {
    question: "What is the significance of the intercepts of an iso-cost line?",
    shortAnswer: "They show the maximum of each variable if the other is zero for a given cost.",
    explanation: "The x-intercept shows how much x you can have if y=0 to achieve the cost. The y-intercept shows the opposite.",
    hint: "Maximums with other variable zero.",
    level: "intermediate",
    codeExample: "For C=12, x-intercept=6 (if y=0), y-intercept=4 (if x=0)."
  },
  {
    question: "Can an iso-cost line be vertical?",
    shortAnswer: "Yes, if the coefficient of y is zero (C = ax).",
    explanation: "If C = ax, the iso-cost line is vertical at x = C/a.",
    hint: "Vertical when b=0.",
    level: "expert",
    codeExample: "C = 3x → vertical lines at x=C/3."
  },
  {
    question: "Can an iso-cost line be horizontal?",
    shortAnswer: "Yes, if the coefficient of x is zero (C = by).",
    explanation: "If C = by, the iso-cost line is horizontal at y = C/b.",
    hint: "Horizontal when a=0.",
    level: "expert",
    codeExample: "C = 4y → horizontal lines at y=C/4."
  },
  {
    question: "How do you find the optimal cost value?",
    shortAnswer: "Substitute the optimal point into the cost function.",
    explanation: "Once you find the optimal corner point, plug its coordinates into C = ax + by.",
    hint: "Plug in the coordinates.",
    level: "intermediate",
    codeExample: "At (3,0), C = 2(3) + 3(0) = ₹6."
  },
  {
    question: "What is the role of iso-cost lines in LP?",
    shortAnswer: "They help find the minimum cost solution graphically.",
    explanation: "Iso-cost lines are the key tool for finding the optimal solution in cost minimization problems.",
    hint: "Finding min cost.",
    level: "basic",
    codeExample: "Move the line to find the best cost."
  },
  {
    question: "How do you identify the optimal iso-cost line on a graph?",
    shortAnswer: "Look for the line with the lowest cost that still touches the feasible region.",
    explanation: "The optimal line is the one that is just entering the feasible region.",
    hint: "Lowest line touching the region.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region."
  },
  {
    question: "What happens if the iso-cost line doesn't touch the feasible region?",
    shortAnswer: "The cost is not attainable — choose a higher cost.",
    explanation: "If the line doesn't intersect the feasible region, that cost level is impossible.",
    hint: "Not attainable.",
    level: "intermediate",
    codeExample: "A line below the region means cost is too low."
  },
  {
    question: "What is the most common mistake with iso-cost lines?",
    shortAnswer: "Moving the lines outward instead of inward.",
    explanation: "For minimization, you need to move iso-cost lines inward (toward origin). Moving outward increases cost.",
    hint: "Move inward for min.",
    level: "basic",
    codeExample: "For min cost, move C from 12 to 8 to 6."
  },
  {
    question: "How do you know if you've found the minimum cost?",
    shortAnswer: "The iso-cost line is just entering the feasible region.",
    explanation: "If moving the line any further inward would leave the region, you've found the minimum.",
    hint: "Just entering.",
    level: "intermediate",
    codeExample: "The line is tangent to the region."
  },
  {
    question: "What is the relationship between iso-cost lines and corner points?",
    shortAnswer: "The optimal iso-cost line touches the feasible region at a corner point.",
    explanation: "The minimum cost occurs at a corner point where the iso-cost line is tangent to the region.",
    hint: "Optimum at corners.",
    level: "intermediate",
    codeExample: "The line with the lowest C touches at a corner point."
  },
  {
    question: "How do you check if a cost is attainable?",
    shortAnswer: "Check if the iso-cost line intersects the feasible region.",
    explanation: "If the line for a given cost intersects the region, that cost is attainable.",
    hint: "Check intersection.",
    level: "intermediate",
    codeExample: "If 2x+3y=6 touches the region, C=6 is attainable."
  },
  {
    question: "What if multiple iso-cost lines give the same optimal point?",
    shortAnswer: "There are multiple optimal solutions (if lines overlap an edge).",
    explanation: "If the optimal iso-cost line overlaps a constraint edge, any point on that edge is optimal.",
    hint: "Multiple optima.",
    level: "expert",
    codeExample: "C=2x+2y and x+y=5 → all points on the edge are optimal."
  },
  {
    question: "How do you find the cost at a corner point?",
    shortAnswer: "Substitute the corner point's coordinates into the cost function.",
    explanation: "For each corner point, compute C = ax + by to find the cost at that point.",
    hint: "Plug into cost function.",
    level: "basic",
    codeExample: "At (3,0), C = 2(3) + 3(0) = ₹6."
  },
  {
    question: "What is the difference between iso-cost and cost function?",
    shortAnswer: "Iso-cost is a line; cost function is the equation.",
    explanation: "The cost function is C = ax + by. An iso-cost line is the equation for a specific C value.",
    hint: "Function vs specific line.",
    level: "basic",
    codeExample: "Cost function: C=2x+3y; Iso-cost: 2x+3y=6."
  },
  {
    question: "What is the most important rule for iso-cost lines?",
    shortAnswer: "Move inward for minimum cost.",
    explanation: "For cost minimization, you always move iso-cost lines inward (toward the origin).",
    hint: "Inward for min.",
    level: "basic",
    codeExample: "Decrease C to move the line inward."
  },
  {
    question: "How do you handle iso-cost lines with fractions?",
    shortAnswer: "Use decimals to plot the line, or multiply by a common factor.",
    explanation: "Fractional coefficients can be handled by multiplying the entire equation by a power of 10.",
    hint: "Multiply to clear fractions.",
    level: "intermediate",
    codeExample: "C = 0.5x + 0.75y → multiply by 4: 4C = 2x + 3y."
  },
  {
    question: "What is the first step in using iso-cost lines?",
    shortAnswer: "Write the cost function in standard form: C = ax + by.",
    explanation: "Before drawing lines, make sure you know the coefficients a and b.",
    hint: "Write in standard form.",
    level: "basic",
    codeExample: "C = 2x + 3y is already in standard form."
  },
  {
    question: "How do you know which corner gives the minimum cost?",
    shortAnswer: "The corner where the lowest iso-cost line touches the feasible region.",
    explanation: "The optimal corner is where the iso-cost line with the smallest C value touches the region.",
    hint: "Lowest C at the corner.",
    level: "intermediate",
    codeExample: "The corner with the minimum C value."
  },
  {
    question: "What is the relationship between iso-cost and feasible region?",
    shortAnswer: "The optimal iso-cost line just touches the feasible region.",
    explanation: "The feasible region constrains where the iso-cost line can go. The optimal line is the one that just fits.",
    hint: "Just touching.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region."
  },
  {
    question: "How do you handle iso-cost lines with decimals?",
    shortAnswer: "Use decimals to plot the line, or multiply by a common factor.",
    explanation: "Decimal coefficients can be handled by multiplying the entire equation by a power of 10.",
    hint: "Multiply to clear decimals.",
    level: "intermediate",
    codeExample: "C = 0.5x + 0.75y → multiply by 4: 4C = 2x + 3y."
  },
  {
    question: "What is the difference between iso-cost and iso-profit in terms of direction?",
    shortAnswer: "Iso-cost moves inward (lower cost); iso-profit moves outward (higher profit).",
    explanation: "For cost minimization, you move toward the origin. For profit maximization, you move away from the origin.",
    hint: "Inward for cost, outward for profit.",
    level: "intermediate",
    codeExample: "Cost: move from C=12 to C=6; Profit: move from P=12 to P=24."
  }
];

export default questions;