const questions = [
  {
    question: "Why do we evaluate the objective function at corner points?",
    shortAnswer: "The optimal solution always occurs at a corner point of the feasible region.",
    explanation: "The Fundamental Theorem of LP states that if an optimal solution exists, there is an optimal solution at a corner point. This limits the search to a finite number of points.",
    hint: "Optimal at corner points.",
    level: "basic",
    codeExample: "Evaluate Z at (0,0), (5,0), (4,2), (0,4)"
  },
  {
    question: "How do you evaluate the objective function at a corner point?",
    shortAnswer: "Substitute the coordinates into Z = c₁x + c₂y.",
    explanation: "For each corner point (x, y), calculate Z by multiplying the coefficients by the coordinates and adding them together.",
    hint: "Substitute into Z equation.",
    level: "basic",
    codeExample: "Z(4,2) = 3(4) + 2(2) = 12 + 4 = 16"
  },
  {
    question: "What is the objective function in LP?",
    shortAnswer: "Z = c₁x + c₂y, where c₁ and c₂ are coefficients representing profit or cost per unit.",
    explanation: "The objective function represents what you're trying to optimize - maximize profit or minimize cost.",
    hint: "Expression being optimized.",
    level: "basic",
    codeExample: "Z = 3x + 2y (maximize profit)"
  },
  {
    question: "What does the value of Z represent at a corner point?",
    shortAnswer: "The total profit (or cost) for that particular solution.",
    explanation: "At a corner point (x, y), Z gives the total objective value. For maximization, higher Z is better. For minimization, lower Z is better.",
    hint: "Total profit or cost.",
    level: "intermediate",
    codeExample: "Z(4,2) = 16 means profit of 16 units"
  },
  {
    question: "How do you select the optimal solution?",
    shortAnswer: "Choose the corner point with the maximum Z (for maximization) or minimum Z (for minimization).",
    explanation: "Compare all Z values and select the best one according to the problem's objective.",
    hint: "Max or min Z value.",
    level: "basic",
    codeExample: "Max Z = 16 at (4,2)"
  },
  {
    question: "What happens if two corner points give the same optimal Z?",
    shortAnswer: "Multiple optimal solutions exist.",
    explanation: "If two or more corner points give the same optimal Z, the problem has multiple optimal solutions. Any point on the line between them is also optimal.",
    hint: "Multiple optima exist.",
    level: "intermediate",
    codeExample: "Both (4,4) and (0,8) give Z = 8"
  },
  {
    question: "What is the difference between maximizing and minimizing?",
    shortAnswer: "Maximization finds the highest Z; minimization finds the lowest Z.",
    explanation: "For maximization, choose the corner with the largest Z. For minimization, choose the corner with the smallest Z.",
    hint: "Max = highest, Min = lowest.",
    level: "basic",
    codeExample: "Max: choose largest, Min: choose smallest"
  },
  {
    question: "What if a corner point is infeasible?",
    shortAnswer: "It should not be considered for optimization.",
    explanation: "Only points within the feasible region are valid. If a corner point violates any constraint, it's infeasible and must be excluded.",
    hint: "Only feasible points matter.",
    level: "intermediate",
    codeExample: "Check each corner satisfies all constraints"
  },
  {
    question: "How do you verify the optimal solution?",
    shortAnswer: "Check that the point satisfies all constraints and no other corner has a better Z.",
    explanation: "Verify: (1) The point is in the feasible region, (2) No other corner gives a better objective value, (3) The solution makes sense.",
    hint: "Check constraints and compare Z values.",
    level: "intermediate",
    codeExample: "Check (4,2) satisfies 2x+y≤10 and x+2y≤8"
  },
  {
    question: "What is the role of coefficients c₁ and c₂?",
    shortAnswer: "They represent the contribution to the objective per unit of each variable.",
    explanation: "In profit maximization, c₁ and c₂ are profits per unit. In cost minimization, they are costs per unit.",
    hint: "Profit or cost per unit.",
    level: "intermediate",
    codeExample: "Z = 40x + 50y means ₹40 per chair, ₹50 per table"
  },
  {
    question: "How do you handle negative coefficients in the objective function?",
    shortAnswer: "Follow the same evaluation process; negative values may affect which corner is optimal.",
    explanation: "Negative coefficients indicate costs or losses. The evaluation method is the same, but the optimal solution may be different.",
    hint: "Same method, different result.",
    level: "advanced",
    codeExample: "Z = -2x + 3y → may minimize x, maximize y"
  },
  {
    question: "What is the difference between feasible and optimal?",
    shortAnswer: "Feasible means satisfies constraints; optimal means best objective value among feasible solutions.",
    explanation: "A feasible solution is any point in the feasible region. The optimal solution is the best feasible solution according to the objective.",
    hint: "Feasible = valid, Optimal = best valid.",
    level: "basic",
    codeExample: "All corner points are feasible; the one with best Z is optimal"
  },
  {
    question: "How do you find the optimal solution when there are multiple optimal solutions?",
    shortAnswer: "Any optimal solution is acceptable; choose based on other criteria.",
    explanation: "When multiple optimal solutions exist, all give the same objective value. Decision-makers can choose based on other factors like risk, sustainability, or preference.",
    hint: "All optimal solutions give same Z.",
    level: "advanced",
    codeExample: "Both (4,4) and (0,8) give Z = 8; choose based on other factors"
  },
  {
    question: "What is the significance of the objective function line?",
    shortAnswer: "It represents the direction of optimization and helps identify the optimal corner.",
    explanation: "The objective function line Z = c₁x + c₂y can be moved parallel to itself. The last corner it touches is optimal for maximization.",
    hint: "Direction of optimization.",
    level: "advanced",
    codeExample: "Move Z = 3x + 2y outward to find optimal corner"
  }
];

export default questions;