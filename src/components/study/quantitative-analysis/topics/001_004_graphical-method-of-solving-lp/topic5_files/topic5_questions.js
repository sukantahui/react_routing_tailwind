const questions = [
  {
    question: "What is the optimal solution in LP?",
    shortAnswer: "The best feasible solution that maximizes or minimizes the objective function.",
    explanation: "The optimal solution is the corner point that gives the highest (for maximization) or lowest (for minimization) objective value.",
    hint: "Best possible solution.",
    level: "basic",
    codeExample: "Optimal at (4,2) with Z = 16"
  },
  {
    question: "What are alternate optimal solutions?",
    shortAnswer: "Multiple corner points that give the same optimal objective value.",
    explanation: "When two or more corner points produce the same optimal Z, the problem has alternate optimal solutions.",
    hint: "Multiple points with same Z.",
    level: "intermediate",
    codeExample: "Both (4,4) and (0,8) give Z = 8"
  },
  {
    question: "What causes alternate optimal solutions?",
    shortAnswer: "The objective function is parallel to a binding constraint.",
    explanation: "When the objective function has the same slope as a constraint that forms the feasible region boundary, multiple points on that edge give the same optimal value.",
    hint: "Objective parallel to constraint.",
    level: "advanced",
    codeExample: "Z = x + y is parallel to x + y = 8"
  },
  {
    question: "How do you identify alternate optimal solutions?",
    shortAnswer: "Check if two or more corner points give the same optimal Z value.",
    explanation: "Evaluate Z at all corner points. If multiple corners give the same optimal value, alternate optimal solutions exist.",
    hint: "Same Z at different corners.",
    level: "intermediate",
    codeExample: "Z(4,4) = 8 and Z(0,8) = 8"
  },
  {
    question: "What is the difference between unique and alternate optimal?",
    shortAnswer: "Unique has one optimal point; alternate has multiple optimal points.",
    explanation: "Unique optimal: only one corner gives the best Z. Alternate optimal: multiple corners give the same best Z.",
    hint: "One point vs. multiple points.",
    level: "intermediate",
    codeExample: "Unique: only (4,2) gives Z=16, Alternate: (4,4) and (0,8) give Z=8"
  },
  {
    question: "What happens when there are alternate optimal solutions?",
    shortAnswer: "Any point on the edge between the optimal corners is also optimal.",
    explanation: "All points on the line segment connecting the optimal corner points give the same optimal Z value.",
    hint: "Whole edge is optimal.",
    level: "advanced",
    codeExample: "All points between (4,4) and (0,8) give Z = 8"
  },
  {
    question: "Can alternate optimal solutions occur in minimization problems?",
    shortAnswer: "Yes, alternate optimal solutions can occur in both maximization and minimization.",
    explanation: "The same principle applies: if the objective function is parallel to a binding constraint, multiple optimal solutions exist.",
    hint: "Applies to both max and min.",
    level: "intermediate",
    codeExample: "Min Z = 2x + 4y with multiple minima"
  },
  {
    question: "What is a degenerate optimal solution?",
    shortAnswer: "A solution where more than the minimum number of constraints are binding.",
    explanation: "Degeneracy occurs when more constraints intersect at the optimal point than necessary. This can happen with or without alternate optima.",
    hint: "Too many binding constraints.",
    level: "advanced",
    codeExample: "Three constraints binding at one corner point"
  },
  {
    question: "How do you verify the optimal solution?",
    shortAnswer: "Check that the point satisfies all constraints and has the best objective value.",
    explanation: "Verify: (1) Point is feasible, (2) No other corner gives better Z, (3) If multiple, identify all optimal points.",
    hint: "Check feasibility and optimality.",
    level: "intermediate",
    codeExample: "Verify (4,2) satisfies all constraints and gives max Z"
  },
  {
    question: "What is the significance of alternate optimal solutions in practice?",
    shortAnswer: "They provide flexibility for decision-makers to choose based on other criteria.",
    explanation: "When multiple solutions give the same objective value, managers can consider other factors like risk, sustainability, or strategic alignment.",
    hint: "Flexibility in decision-making.",
    level: "intermediate",
    codeExample: "Choose between (4,4) and (0,8) based on other factors"
  },
  {
    question: "How do you find all optimal solutions?",
    shortAnswer: "List all corner points that give the optimal Z value.",
    explanation: "Evaluate Z at all corner points. Any corner with the optimal Z is an optimal solution. The entire edge between them is also optimal.",
    hint: "List all corners with optimal Z.",
    level: "advanced",
    codeExample: "Both (4,4) and (0,8) are optimal"
  },
  {
    question: "What is the relationship between objective slope and alternate optima?",
    shortAnswer: "Alternate optima occur when the objective slope equals the slope of a binding constraint.",
    explanation: "When the objective function is parallel to a constraint, multiple points on that constraint give the same Z value.",
    hint: "Slopes are equal.",
    level: "advanced",
    codeExample: "Objective slope = -1, Constraint slope = -1"
  },
  {
    question: "Can alternate optimal solutions exist with only one constraint?",
    shortAnswer: "Yes, if the objective function is parallel to the only constraint.",
    explanation: "With one constraint x + y ≤ 10, if Z = x + y, any point on x + y = 10 is optimal.",
    hint: "Parallel to a single constraint.",
    level: "intermediate",
    codeExample: "Max Z = x + y, subject to x + y ≤ 10"
  },
  {
    question: "What is the difference between alternate optimal and unbounded?",
    shortAnswer: "Alternate optimal has finite optimal value; unbounded has no finite optimum.",
    explanation: "Alternate optimal: multiple points give the same finite Z. Unbounded: Z can go to infinity.",
    hint: "Finite vs. infinite.",
    level: "advanced",
    codeExample: "Alternate: Z = 8, Unbounded: Z → ∞"
  }
];

export default questions;