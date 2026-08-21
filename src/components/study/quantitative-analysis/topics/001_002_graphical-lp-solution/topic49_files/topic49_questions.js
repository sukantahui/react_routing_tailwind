const questions = [
  {
    question: "How do you identify alternate optimal solutions graphically?",
    shortAnswer: "Look for the objective line overlapping a constraint edge.",
    explanation: "When the objective line is parallel to a constraint and touches the feasible region along an edge, there are alternate optimal solutions.",
    hint: "Look for overlap.",
    level: "intermediate",
    codeExample: "The objective line coincides with a constraint edge."
  },
  {
    question: "What is the graphical sign of alternate optimal solutions?",
    shortAnswer: "The objective line lies on top of a constraint edge.",
    explanation: "When the objective line overlaps a constraint edge, all points on that edge are optimal.",
    hint: "Overlap = alternate optima.",
    level: "intermediate",
    codeExample: "Z = x + y overlaps x + y = 10."
  },
  {
    question: "What causes alternate optimal solutions graphically?",
    shortAnswer: "The objective function is parallel to a constraint edge.",
    explanation: "When the slopes are equal, the objective line overlaps the constraint edge.",
    hint: "Parallel lines.",
    level: "intermediate",
    codeExample: "Z = x + y has slope -1, same as x+y=10."
  },
  {
    question: "How do you check if the objective line is parallel to a constraint?",
    shortAnswer: "Compare their slopes. If they are equal, they are parallel.",
    explanation: "If the slope of the objective function equals the slope of a constraint, they are parallel.",
    hint: "Compare slopes.",
    level: "intermediate",
    codeExample: "Z = 2x + y has slope -2, same as 2x+y=10."
  },
  {
    question: "What is the objective function in the first example?",
    shortAnswer: "Z = x + y.",
    explanation: "The objective is to maximize the sum of x and y.",
    hint: "Z = x + y.",
    level: "basic",
    codeExample: "Z = x + y."
  },
  {
    question: "What is the constraint that is parallel to the objective in the first example?",
    shortAnswer: "x + y = 10.",
    explanation: "The objective Z = x + y has slope -1, same as x + y = 10.",
    hint: "x + y = 10.",
    level: "intermediate",
    codeExample: "x + y = 10 has slope -1."
  },
  {
    question: "What is the slope of Z = x + y?",
    shortAnswer: "-1.",
    explanation: "Z = x + y → y = -x + Z, so slope = -1.",
    hint: "Slope = -1.",
    level: "intermediate",
    codeExample: "Slope = -1."
  },
  {
    question: "What is the slope of x + y = 10?",
    shortAnswer: "-1.",
    explanation: "x + y = 10 → y = -x + 10, so slope = -1.",
    hint: "Slope = -1.",
    level: "intermediate",
    codeExample: "Slope = -1."
  },
  {
    question: "What are the corner points in the first example?",
    shortAnswer: "O(0,0), A(10,0), B(0,10).",
    explanation: "These are the vertices of the feasible region.",
    hint: "Three corner points.",
    level: "basic",
    codeExample: "O(0,0), A(10,0), B(0,10)."
  },
  {
    question: "Which corners are optimal in the first example?",
    shortAnswer: "A(10,0) and B(0,10).",
    explanation: "Both give the same optimal value of Z = 10.",
    hint: "A and B.",
    level: "basic",
    codeExample: "A(10,0) and B(0,10)."
  },
  {
    question: "What is the optimal value in the first example?",
    shortAnswer: "Z = 10.",
    explanation: "Both A(10,0) and B(0,10) give Z = 10.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Z = 10."
  },
  {
    question: "What is the objective function in the second example?",
    shortAnswer: "Z = 2x + y.",
    explanation: "The objective is to maximize 2x + y.",
    hint: "Z = 2x + y.",
    level: "basic",
    codeExample: "Z = 2x + y."
  },
  {
    question: "What is the constraint that is parallel to the objective in the second example?",
    shortAnswer: "2x + y = 10.",
    explanation: "The objective Z = 2x + y has slope -2, same as 2x + y = 10.",
    hint: "2x + y = 10.",
    level: "intermediate",
    codeExample: "2x + y = 10 has slope -2."
  },
  {
    question: "What are the optimal corners in the second example?",
    shortAnswer: "A(5,0) and B(2,6).",
    explanation: "Both give Z = 10.",
    hint: "A and B.",
    level: "basic",
    codeExample: "A(5,0) and B(2,6)."
  },
  {
    question: "What is the optimal value in the second example?",
    shortAnswer: "Z = 10.",
    explanation: "Both A(5,0) and B(2,6) give Z = 10.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Z = 10."
  },
  {
    question: "How do you identify alternate optimal solutions in minimization?",
    shortAnswer: "Look for the objective line overlapping a constraint edge at the minimum value.",
    explanation: "In minimization, alternate optima occur when the objective line overlaps a constraint edge at the lowest value.",
    hint: "Same principle.",
    level: "intermediate",
    codeExample: "C = x + y overlaps x + y = 5 at the minimum."
  },
  {
    question: "What is the objective function in the minimization example?",
    shortAnswer: "C = x + y.",
    explanation: "The objective is to minimize the sum of x and y.",
    hint: "C = x + y.",
    level: "basic",
    codeExample: "C = x + y."
  },
  {
    question: "What is the constraint that is parallel to the objective in the minimization example?",
    shortAnswer: "x + y = 5.",
    explanation: "The objective C = x + y has slope -1, same as x + y = 5.",
    hint: "x + y = 5.",
    level: "intermediate",
    codeExample: "x + y = 5 has slope -1."
  },
  {
    question: "What are the optimal corners in the minimization example?",
    shortAnswer: "A(0,5) and B(5,0).",
    explanation: "Both give C = 5.",
    hint: "A and B.",
    level: "basic",
    codeExample: "A(0,5) and B(5,0)."
  },
  {
    question: "What is the optimal value in the minimization example?",
    shortAnswer: "C = 5.",
    explanation: "Both A(0,5) and B(5,0) give C = 5.",
    hint: "C = 5.",
    level: "basic",
    codeExample: "C = 5."
  },
  {
    question: "What is the most common mistake in identifying alternate optimal solutions?",
    shortAnswer: "Not recognizing the overlap of the objective line with a constraint edge.",
    explanation: "Students often miss the overlap and assume there's only one optimal solution.",
    hint: "Look for the overlap.",
    level: "basic",
    codeExample: "Check if the objective line lies on a constraint edge."
  },
  {
    question: "What is the relationship between alternate optimal solutions and the corner-point principle?",
    shortAnswer: "Alternate optima are consistent with the corner-point principle.",
    explanation: "The corner-point principle says the optimum occurs at a corner point. If multiple corners are optimal, they are the endpoints of the optimal edge.",
    hint: "Still at corners.",
    level: "expert",
    codeExample: "The optimal edge has two corner endpoints."
  },
  {
    question: "What is the difference between alternate optimal solutions and unbounded solutions?",
    shortAnswer: "Alternate optima have a finite optimal value; unbounded solutions have no finite optimum.",
    explanation: "Alternate optima: the objective can achieve the same value at multiple points. Unbounded: the objective can go to infinity.",
    hint: "Finite vs infinite.",
    level: "expert",
    codeExample: "Alternate: Z=10 at many points; Unbounded: Z can go to ∞."
  },
  {
    question: "What is the business implication of alternate optimal solutions?",
    shortAnswer: "Decision-makers have flexibility to choose among equally good options.",
    explanation: "They can choose based on other factors like brand preference, risk, or strategic goals.",
    hint: "Flexibility.",
    level: "intermediate",
    codeExample: "Choose the option that best fits other business goals."
  },
  {
    question: "How do you state alternate optimal solutions graphically?",
    shortAnswer: "List all optimal corner points and mention the optimal edge.",
    explanation: "State both corner points and explain that any point on the edge between them is also optimal.",
    hint: "List all options.",
    level: "intermediate",
    codeExample: "A(10,0) and B(0,10) are both optimal, and any point on the edge between them."
  },
  {
    question: "What is the optimal edge in the first example?",
    shortAnswer: "The edge from A(10,0) to B(0,10).",
    explanation: "Any point on the line x + y = 10 between A and B is optimal.",
    hint: "The line x+y=10.",
    level: "intermediate",
    codeExample: "All points on x+y=10 between (10,0) and (0,10)."
  },
  {
    question: "What is the optimal edge in the second example?",
    shortAnswer: "The edge from A(5,0) to B(2,6).",
    explanation: "Any point on the line 2x + y = 10 between A and B is optimal.",
    hint: "The line 2x+y=10.",
    level: "intermediate",
    codeExample: "All points on 2x+y=10 between (5,0) and (2,6)."
  },
  {
    question: "What is the optimal edge in the minimization example?",
    shortAnswer: "The edge from A(0,5) to B(5,0).",
    explanation: "Any point on the line x + y = 5 between A and B is optimal.",
    hint: "The line x+y=5.",
    level: "intermediate",
    codeExample: "All points on x+y=5 between (0,5) and (5,0)."
  },
  {
    question: "What is the most important thing to remember about identifying alternate optimal solutions?",
    shortAnswer: "Look for the objective line overlapping a constraint edge.",
    explanation: "When the objective line coincides with a constraint edge, there are alternate optimal solutions.",
    hint: "Overlap = alternate optima.",
    level: "basic",
    codeExample: "The objective line lies on a constraint edge."
  },
  {
    question: "How do you verify alternate optimal solutions graphically?",
    shortAnswer: "Check that multiple points on the edge give the same objective value.",
    explanation: "Pick several points on the edge and verify they all give the same optimal value.",
    hint: "Test multiple points.",
    level: "intermediate",
    codeExample: "Check (5,5), (7,3), (3,7) all give Z=10."
  }
];

export default questions;