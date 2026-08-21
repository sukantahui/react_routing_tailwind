const questions = [
  {
    question: "What types of numerical exercises are included in this topic?",
    shortAnswer: "The exercises cover maximization, minimization, production problems, investment portfolios, and diet planning.",
    explanation: "Exercises range from basic two-constraint problems to advanced real-world applications with multiple constraints and objectives.",
    hint: "Check the exercise list.",
    level: "basic",
    codeExample: "7 exercises covering different types"
  },
  {
    question: "How should I approach a numerical exercise?",
    shortAnswer: "Follow the step-by-step procedure: define variables, formulate objective and constraints, graph, find corner points, evaluate, and verify.",
    explanation: "Each exercise has a structured solution that demonstrates the complete process. Use it as a guide for your own work.",
    hint: "Follow the procedure.",
    level: "basic",
    codeExample: "Step 1-9 procedure"
  },
  {
    question: "What is the difference between maximization and minimization exercises?",
    shortAnswer: "Maximization finds the highest Z value (profit, return); minimization finds the lowest Z value (cost, risk).",
    explanation: "The objective function determines whether you're maximizing or minimizing. The graphical method is the same, but you select the highest or lowest Z value.",
    hint: "Max = highest, Min = lowest.",
    level: "basic",
    codeExample: "Max: choose largest Z, Min: choose smallest Z"
  },
  {
    question: "How do I identify binding constraints in a numerical exercise?",
    shortAnswer: "Binding constraints are those where the optimal point lies exactly on the constraint line (slack = 0).",
    explanation: "Substitute the optimal solution into each constraint. If LHS = RHS, the constraint is binding. These are the bottlenecks.",
    hint: "LHS = RHS means binding.",
    level: "intermediate",
    codeExample: "2x + y = 10 at (4,2) → binding"
  },
  {
    question: "What does the shadow price tell me in a numerical exercise?",
    shortAnswer: "Shadow price tells you how much Z would increase if you had one more unit of a resource.",
    explanation: "For binding constraints, the shadow price is the marginal value of that resource. It helps in making investment decisions.",
    hint: "Value of additional resources.",
    level: "advanced",
    codeExample: "Shadow price = 2 means each extra unit adds 2 to Z"
  },
  {
    question: "Why do some exercises have multiple optimal solutions?",
    shortAnswer: "Multiple optimal solutions occur when the objective function is parallel to a binding constraint.",
    explanation: "When the objective function has the same slope as a constraint, any point on that constraint edge gives the same optimal value.",
    hint: "Parallel lines = multiple optima.",
    level: "intermediate",
    codeExample: "Z = 2x + 3y parallel to 2x + 3y = 12"
  },
  {
    question: "How do I calculate slack in a numerical exercise?",
    shortAnswer: "Slack = RHS - LHS for ≤ constraints. Positive slack means unused capacity.",
    explanation: "Substitute the optimal solution into each constraint. The difference between RHS and LHS is the slack. Zero slack means fully utilized.",
    hint: "Slack = RHS - LHS.",
    level: "intermediate",
    codeExample: "Constraint: 2x + y ≤ 10, at (4,2): slack = 10 - 10 = 0"
  },
  {
    question: "What is the purpose of the formula reference section?",
    shortAnswer: "The formula reference provides a quick lookup for all formulas needed in graphical LP.",
    explanation: "It covers objective functions, constraints, graphing, corner points, resource analysis, and shadow prices. Use it for quick reference while solving.",
    hint: "Quick reference for formulas.",
    level: "basic",
    codeExample: "Objective, constraints, slack formulas"
  },
  {
    question: "How can I check if my solution is correct?",
    shortAnswer: "Verify that the solution satisfies all constraints and that no other corner point gives a better objective value.",
    explanation: "Use the verification checklist: substitute into constraints, check all corner points, and verify optimality.",
    hint: "Verify constraints and optimality.",
    level: "intermediate",
    codeExample: "Check all 8 verification points"
  },
  {
    question: "What should I do if I get a different answer than the solution?",
    shortAnswer: "Go back through your work step by step to find where you deviated from the correct procedure.",
    explanation: "Common errors include incorrect constraint formulation, graphing mistakes, or calculation errors. Use the solution as a learning tool.",
    hint: "Trace back through your work.",
    level: "intermediate",
    codeExample: "Check each step: variables, constraints, graph, calculations"
  }
];

export default questions;