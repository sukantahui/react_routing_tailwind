const questions = [
  {
    question: "What is the objective function in linear programming?",
    shortAnswer: "The mathematical expression we want to maximize or minimize.",
    explanation: "The objective function is the goal of the LP problem, such as maximizing profit or minimizing cost. It's a linear function of the decision variables.",
    hint: "The goal of the problem.",
    level: "basic",
    codeExample: "Z = 3x + 4y (maximize profit)"
  },
  {
    question: "How is the objective function represented graphically?",
    shortAnswer: "As a family of parallel lines called iso-profit or iso-cost lines.",
    explanation: "For any value of Z, the objective function forms a straight line. As Z changes, the line moves parallel to itself.",
    hint: "Parallel lines.",
    level: "intermediate",
    codeExample: "Z = 3x + 4y gives lines like 3x+4y=12, 3x+4y=24, etc."
  },
  {
    question: "What is an iso-profit line?",
    shortAnswer: "A line where the objective function (profit) is constant.",
    explanation: "All points on an iso-profit line give the same profit value. For maximization, we move to higher iso-profit lines.",
    hint: "Equal profit line.",
    level: "intermediate",
    codeExample: "3x+4y=12 is an iso-profit line for Z=12."
  },
  {
    question: "What is an iso-cost line?",
    shortAnswer: "A line where the objective function (cost) is constant.",
    explanation: "All points on an iso-cost line give the same cost value. For minimization, we move to lower iso-cost lines.",
    hint: "Equal cost line.",
    level: "intermediate",
    codeExample: "2x+3y=12 is an iso-cost line for Z=12."
  },
  {
    question: "How do you find the optimal solution graphically?",
    shortAnswer: "Move the objective line parallel until it just touches the feasible region.",
    explanation: "For maximization, move the line in the direction of increasing Z. For minimization, move in the direction of decreasing Z. The last/first point of contact is optimal.",
    hint: "Move the line until it touches the region.",
    level: "intermediate",
    codeExample: "For Z=3x+4y, move the line upward to find the maximum."
  },
  {
    question: "What is the direction of improvement for maximization?",
    shortAnswer: "Move the objective line away from the origin (increasing Z).",
    explanation: "For maximization, higher Z values are better. Move the line in the direction that increases Z.",
    hint: "Away from origin.",
    level: "basic",
    codeExample: "Increase Z from 12 to 24 to 36."
  },
  {
    question: "What is the direction of improvement for minimization?",
    shortAnswer: "Move the objective line toward the origin (decreasing Z).",
    explanation: "For minimization, lower Z values are better. Move the line in the direction that decreases Z.",
    hint: "Toward origin.",
    level: "basic",
    codeExample: "Decrease Z from 12 to 6 to 0."
  },
  {
    question: "Where does the optimal solution occur?",
    shortAnswer: "At a corner point of the feasible region (or along an edge).",
    explanation: "The optimal solution is always at a corner point, except in cases of multiple optimal solutions where it can be along an entire edge.",
    hint: "At a corner point.",
    level: "intermediate",
    codeExample: "Check all corner points to find the optimum."
  },
  {
    question: "What if the objective line is parallel to a constraint?",
    shortAnswer: "There may be multiple optimal solutions along the edge.",
    explanation: "If the objective line has the same slope as a constraint, any point on that edge is optimal.",
    hint: "Multiple optima.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → all points on the edge are optimal."
  },
  {
    question: "How do you draw an objective line?",
    shortAnswer: "Choose a Z value, find intercepts, and draw the line.",
    explanation: "For Z=3x+4y, set x=0 to find y-intercept, set y=0 to find x-intercept, and draw the line through them.",
    hint: "Use intercepts.",
    level: "intermediate",
    codeExample: "For Z=12, 3x+4y=12 → intercepts (4,0) and (0,3)."
  },
  {
    question: "What is the slope of the objective function?",
    shortAnswer: "The slope is -a/b for Z = ax + by.",
    explanation: "The slope determines the direction in which the line moves as Z changes.",
    hint: "Slope = -a/b.",
    level: "intermediate",
    codeExample: "For Z=3x+4y, slope = -3/4."
  },
  {
    question: "How do you determine if you should maximize or minimize?",
    shortAnswer: "Read the problem statement — it will say 'maximize' or 'minimize'.",
    explanation: "Maximization problems seek the highest value (e.g., profit). Minimization problems seek the lowest value (e.g., cost).",
    hint: "Read the problem.",
    level: "basic",
    codeExample: "Maximize Z = 3x + 4y or Minimize Z = 2x + 3y."
  },
  {
    question: "What is the relationship between the objective line and the feasible region?",
    shortAnswer: "The optimal solution is where the objective line just touches the feasible region.",
    explanation: "For maximization, the line is pushed outward until it's about to leave the region. For minimization, it's pulled inward until it first enters.",
    hint: "Just touching the region.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region at the optimal corner."
  },
  {
    question: "Can the objective function have negative coefficients?",
    shortAnswer: "Yes, coefficients can be negative, but this is less common in real-world problems.",
    explanation: "Negative coefficients might represent costs or penalties that reduce the objective value.",
    hint: "Less common but possible.",
    level: "expert",
    codeExample: "Z = 3x - 2y (profit minus cost)."
  },
  {
    question: "What is the optimal value of Z?",
    shortAnswer: "The value of Z at the optimal corner point.",
    explanation: "Substitute the optimal x and y values into the objective function to find Z.",
    hint: "Evaluate Z at the optimum.",
    level: "intermediate",
    codeExample: "At (4,3), Z = 3(4) + 4(3) = 24."
  },
  {
    question: "How do you identify the optimal point on a graph?",
    shortAnswer: "It's the corner point where the objective line just touches the feasible region.",
    explanation: "Look for the point where the objective line is tangent to the feasible region (the last point for max, the first for min).",
    hint: "Last contact for max, first for min.",
    level: "intermediate",
    codeExample: "The corner with the highest Z value for maximization."
  },
  {
    question: "What if the feasible region is unbounded?",
    shortAnswer: "The objective may be unbounded (no finite optimal solution).",
    explanation: "If the region extends in the direction of improvement, the objective value can go to infinity (for max) or negative infinity (for min).",
    hint: "May have no finite optimum.",
    level: "expert",
    codeExample: "Maximize Z=x+y with x≥0, y≥0 → unbounded."
  },
  {
    question: "What is the difference between the objective function and constraints?",
    shortAnswer: "The objective is the goal; constraints are the limitations.",
    explanation: "The objective function is what we want to optimize. Constraints are the rules that limit our choices.",
    hint: "Goal vs limitations.",
    level: "basic",
    codeExample: "Objective: Maximize Z=3x+4y; Constraints: x+y≤10, x≥0, y≥0."
  },
  {
    question: "How do you handle multiple optimal solutions?",
    shortAnswer: "Any point on the optimal edge gives the same Z value.",
    explanation: "If the objective line is parallel to a constraint edge, all points on that edge are optimal.",
    hint: "All points on the edge.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → all points on the edge give Z=10."
  },
  {
    question: "What is the significance of the objective function slope?",
    shortAnswer: "It determines how the line moves and which corner is optimal.",
    explanation: "The slope tells us the trade-off between x and y. Different slopes lead to different optimal corners.",
    hint: "Slope determines the optimum.",
    level: "intermediate",
    codeExample: "Z=3x+4y (slope -3/4) vs Z=4x+3y (slope -4/3)."
  },
  {
    question: "How do you know if you've found the optimal solution?",
    shortAnswer: "The objective line is tangent to the feasible region at a corner point.",
    explanation: "For maximization, the line is as far from the origin as possible while still touching the region. For minimization, it's as close as possible.",
    hint: "Line just touches the region.",
    level: "intermediate",
    codeExample: "The line is about to leave the region."
  },
  {
    question: "What is the role of the objective function in LP?",
    shortAnswer: "It defines what we want to achieve (the goal).",
    explanation: "The objective function is the reason we solve the LP problem. It tells us what's important.",
    hint: "It's the goal.",
    level: "basic",
    codeExample: "Maximize profit or minimize cost."
  },
  {
    question: "Can the objective function be zero?",
    shortAnswer: "Yes, if all variables are zero or if the function evaluates to zero.",
    explanation: "Z=0 is a valid objective value, often at the origin.",
    hint: "Zero is possible.",
    level: "basic",
    codeExample: "At (0,0), Z=0 for most objective functions."
  },
  {
    question: "How do you write an objective function?",
    shortAnswer: "As a linear combination of decision variables: Z = ax + by.",
    explanation: "The coefficients a and b represent the contribution of each variable to the objective.",
    hint: "Linear combination.",
    level: "basic",
    codeExample: "Z = 3x + 4y (profit per unit of x and y)."
  },
  {
    question: "What is the difference between maximizing and minimizing?",
    shortAnswer: "Maximizing seeks the highest value; minimizing seeks the lowest.",
    explanation: "Maximization is used for profit, revenue, or efficiency. Minimization is used for cost, time, or waste.",
    hint: "Highest vs lowest.",
    level: "basic",
    codeExample: "Maximize profit, minimize cost."
  },
  {
    question: "What if the objective line intersects the feasible region at multiple points?",
    shortAnswer: "There may be multiple optimal solutions (if the line overlaps an edge).",
    explanation: "If the line coincides with an edge of the feasible region, any point on that edge is optimal.",
    hint: "Multiple optima.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → all points on the edge are optimal."
  },
  {
    question: "How do you find the optimal Z value?",
    shortAnswer: "Substitute the optimal x and y into the objective function.",
    explanation: "Once you've found the optimal corner point, plug its coordinates into Z = ax + by.",
    hint: "Plug in the coordinates.",
    level: "intermediate",
    codeExample: "At (4,3), Z = 3(4) + 4(3) = 24."
  },
  {
    question: "What is the importance of the objective function's coefficients?",
    shortAnswer: "They determine the slope and the trade-off between variables.",
    explanation: "The coefficients tell us how much each variable contributes to the objective. Higher coefficients mean more important variables.",
    hint: "Coefficients matter.",
    level: "intermediate",
    codeExample: "In Z=3x+4y, y contributes more per unit than x."
  },
  {
    question: "Can the objective function have constant terms?",
    shortAnswer: "Yes, but they are usually zero and don't affect the optimal solution.",
    explanation: "Constant terms shift the objective value but don't change which point is optimal.",
    hint: "Constants don't affect the optimum.",
    level: "expert",
    codeExample: "Z = 3x + 4y + 5 (the +5 is a constant)."
  },
  {
    question: "What is the relationship between the objective line and corner points?",
    shortAnswer: "The optimal solution is always at a corner point (or along an edge).",
    explanation: "The objective line will touch the feasible region at a corner point (or an edge) where the optimal solution lies.",
    hint: "Optimum at corners.",
    level: "intermediate",
    codeExample: "Check all corner points to find the maximum Z."
  },
  {
    question: "How do you handle an objective function with equal coefficients?",
    shortAnswer: "The objective line has slope -1 (for Z=x+y).",
    explanation: "When a=b, the objective function treats x and y equally. The line has slope -1.",
    hint: "Equal treatment.",
    level: "intermediate",
    codeExample: "Z = x + y → slope = -1."
  }
];

export default questions;