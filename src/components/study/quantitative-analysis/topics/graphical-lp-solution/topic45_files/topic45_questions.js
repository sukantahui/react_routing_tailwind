const questions = [
  {
    question: "What are the optimal values of decision variables?",
    shortAnswer: "The x and y coordinates of the optimal corner point.",
    explanation: "After selecting the optimal corner, the x and y values are the optimal decision variable values.",
    hint: "Coordinates of the optimal corner.",
    level: "basic",
    codeExample: "At B (4,3), x=4, y=3."
  },
  {
    question: "How do you determine the optimal variable values?",
    shortAnswer: "Read the x and y coordinates from the optimal corner point.",
    explanation: "The optimal corner point gives the optimal values of x and y directly.",
    hint: "Read from the corner.",
    level: "basic",
    codeExample: "Optimal corner B (4,3) → x=4, y=3."
  },
  {
    question: "What are the optimal x and y values in the profit maximization example?",
    shortAnswer: "x = 4, y = 3.",
    explanation: "The optimal corner B (4,3) gives x=4 and y=3.",
    hint: "x=4, y=3.",
    level: "basic",
    codeExample: "x = 4, y = 3."
  },
  {
    question: "What are the optimal x and y values in the cost minimization example?",
    shortAnswer: "x = 20, y = 15.",
    explanation: "The optimal corner A (20,15) gives x=20 and y=15.",
    hint: "x=20, y=15.",
    level: "basic",
    codeExample: "x = 20, y = 15."
  },
  {
    question: "What are the optimal x and y values in the multiple optima example?",
    shortAnswer: "x=10, y=0 OR x=0, y=10.",
    explanation: "Both A (10,0) and B (0,10) are optimal.",
    hint: "Multiple options.",
    level: "intermediate",
    codeExample: "(10,0) or (0,10)."
  },
  {
    question: "What is the optimal Z in the profit maximization example?",
    shortAnswer: "24.",
    explanation: "Z = 3(4) + 4(3) = 12 + 12 = 24.",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Z = 24."
  },
  {
    question: "What is the optimal C in the cost minimization example?",
    shortAnswer: "240.",
    explanation: "C = 6(20) + 8(15) = 120 + 120 = 240.",
    hint: "C = 240.",
    level: "basic",
    codeExample: "C = 240."
  },
  {
    question: "What is the optimal Z in the multiple optima example?",
    shortAnswer: "10.",
    explanation: "Z = x + y = 10 at both A and B.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Z = 10."
  },
  {
    question: "How do you interpret optimal variable values?",
    shortAnswer: "In the context of the problem (e.g., produce, invest, allocate).",
    explanation: "Always state the values in the context of the original problem.",
    hint: "Context matters.",
    level: "basic",
    codeExample: "Produce 4 units of X and 3 units of Y."
  },
  {
    question: "What is the interpretation of x=4, y=3 in the profit example?",
    shortAnswer: "Produce 4 units of product X and 3 units of product Y.",
    explanation: "This production mix gives the maximum profit.",
    hint: "Production quantities.",
    level: "basic",
    codeExample: "Produce 4 X and 3 Y."
  },
  {
    question: "What is the interpretation of x=20, y=15 in the cost example?",
    shortAnswer: "Produce 20 units of product X and 15 units of product Y.",
    explanation: "This production mix gives the minimum cost.",
    hint: "Production quantities.",
    level: "basic",
    codeExample: "Produce 20 X and 15 Y."
  },
  {
    question: "What is the interpretation of multiple optima?",
    shortAnswer: "Multiple production mixes give the same optimal value.",
    explanation: "Either produce 10 X and 0 Y, or 0 X and 10 Y.",
    hint: "Multiple options.",
    level: "intermediate",
    codeExample: "Either (10,0) or (0,10)."
  },
  {
    question: "What is the first step in finding optimal variables?",
    shortAnswer: "Identify the optimal corner point.",
    explanation: "You need to select the optimal corner before reading the variables.",
    hint: "Select the corner.",
    level: "basic",
    codeExample: "Select B (4,3)."
  },
  {
    question: "What is the last step in finding optimal variables?",
    shortAnswer: "State the variables in context.",
    explanation: "Always state the optimal values in the context of the problem.",
    hint: "State with context.",
    level: "basic",
    codeExample: "Produce 4 units of X and 3 units of Y."
  },
  {
    question: "How do you verify optimal variable values?",
    shortAnswer: "Check that they satisfy all constraints.",
    explanation: "The optimal values must be feasible (satisfy all constraints).",
    hint: "Check feasibility.",
    level: "intermediate",
    codeExample: "Check (4,3) in all constraints."
  },
  {
    question: "What is the most common mistake in determining optimal variables?",
    shortAnswer: "Stating variables without context.",
    explanation: "Students often just say x=4, y=3 without explaining what x and y mean.",
    hint: "Add context.",
    level: "basic",
    codeExample: "Instead of x=4, say 'produce 4 units of X'."
  },
  {
    question: "What is the difference between optimal variables and optimal value?",
    shortAnswer: "Optimal variables are x and y; optimal value is Z or C.",
    explanation: "The variables tell you what to do; the value tells you the result.",
    hint: "Variables vs value.",
    level: "basic",
    codeExample: "Variables: x=4, y=3; Value: Z=24."
  },
  {
    question: "What are the optimal variables in the profit example?",
    shortAnswer: "x = 4, y = 3.",
    explanation: "The optimal corner B (4,3) gives the optimal variables.",
    hint: "x=4, y=3.",
    level: "basic",
    codeExample: "x = 4, y = 3."
  },
  {
    question: "What are the optimal variables in the cost example?",
    shortAnswer: "x = 20, y = 15.",
    explanation: "The optimal corner A (20,15) gives the optimal variables.",
    hint: "x=20, y=15.",
    level: "basic",
    codeExample: "x = 20, y = 15."
  },
  {
    question: "What is the optimal profit in the profit example?",
    shortAnswer: "24.",
    explanation: "The maximum profit is 24 at (4,3).",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Max profit = 24."
  },
  {
    question: "What is the optimal cost in the cost example?",
    shortAnswer: "240.",
    explanation: "The minimum cost is 240 at (20,15).",
    hint: "C = 240.",
    level: "basic",
    codeExample: "Min cost = 240."
  },
  {
    question: "What is the optimal value in the multiple optima example?",
    shortAnswer: "10.",
    explanation: "Both A and B give Z = 10.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Optimal Z = 10."
  },
  {
    question: "How do you handle fractional optimal variables?",
    shortAnswer: "State them as fractions or decimals, depending on the context.",
    explanation: "In LP, fractional solutions are allowed (divisibility assumption).",
    hint: "Fractions are fine.",
    level: "intermediate",
    codeExample: "x = 2.4, y = 3.5."
  },
  {
    question: "What is the most important thing to remember about optimal variables?",
    shortAnswer: "They must be feasible and give the optimal objective value.",
    explanation: "The optimal variables must satisfy all constraints and give the best objective value.",
    hint: "Feasible and optimal.",
    level: "basic",
    codeExample: "Check both feasibility and optimality."
  },
  {
    question: "What is the optimal variables formula?",
    shortAnswer: "There is no formula — read them from the optimal corner point.",
    explanation: "The optimal variables are simply the coordinates of the optimal corner point.",
    hint: "Read from the graph.",
    level: "basic",
    codeExample: "At B (4,3), x=4, y=3."
  },
  {
    question: "What is the optimal variables in the profit example with context?",
    shortAnswer: "Produce 4 units of product X and 3 units of product Y.",
    explanation: "This is the optimal production mix for maximum profit.",
    hint: "Production mix.",
    level: "basic",
    codeExample: "Produce 4 X and 3 Y."
  },
  {
    question: "What is the optimal variables in the cost example with context?",
    shortAnswer: "Produce 20 units of product X and 15 units of product Y.",
    explanation: "This is the optimal production mix for minimum cost.",
    hint: "Production mix.",
    level: "basic",
    codeExample: "Produce 20 X and 15 Y."
  },
  {
    question: "What is the optimal variables in the multiple optima example with context?",
    shortAnswer: "Either produce 10 X and 0 Y, or 0 X and 10 Y.",
    explanation: "Both give the same optimal value.",
    hint: "Either option.",
    level: "intermediate",
    codeExample: "(10,0) or (0,10)."
  },
  {
    question: "What is the role of constraints in determining optimal variables?",
    shortAnswer: "They ensure the optimal variables are feasible.",
    explanation: "The optimal variables must satisfy all constraints.",
    hint: "Constraints ensure feasibility.",
    level: "basic",
    codeExample: "Check (4,3) in all constraints."
  },
  {
    question: "What is the relationship between optimal variables and the objective function?",
    shortAnswer: "The optimal variables give the optimal objective value.",
    explanation: "When you substitute the optimal variables into the objective function, you get the optimal value.",
    hint: "Substitute to get the value.",
    level: "basic",
    codeExample: "At (4,3), Z = 3(4)+4(3)=24."
  }
];

export default questions;