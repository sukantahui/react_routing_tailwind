const questions = [
  {
    question: "What are multiple optimal solutions?",
    shortAnswer: "When two or more corner points give the same optimal objective value.",
    explanation: "Multiple optimal solutions occur when the objective function is parallel to a constraint edge.",
    hint: "Same best value at multiple points.",
    level: "intermediate",
    codeExample: "Z = x + y with x+y=10 gives Z=10 on the entire edge."
  },
  {
    question: "Why do multiple optimal solutions occur?",
    shortAnswer: "The objective function is parallel to a constraint edge.",
    explanation: "When the slope of the objective function equals the slope of a constraint, the objective line overlaps the constraint edge.",
    hint: "Parallel lines.",
    level: "intermediate",
    codeExample: "Z = x + y has slope -1, same as x+y=10."
  },
  {
    question: "What is the optimal value in the multiple optima example?",
    shortAnswer: "Z = 10.",
    explanation: "Both A(10,0) and B(0,10) give Z = 10.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Z = 10 at (10,0) and (0,10)."
  },
  {
    question: "Which corners are optimal in the multiple optima example?",
    shortAnswer: "A(10,0) and B(0,10).",
    explanation: "Both give the same optimal value of Z = 10.",
    hint: "A and B.",
    level: "basic",
    codeExample: "A(10,0) and B(0,10)."
  },
  {
    question: "What is the objective function in the multiple optima example?",
    shortAnswer: "Z = x + y.",
    explanation: "The objective is to maximize the sum of x and y.",
    hint: "Z = x + y.",
    level: "basic",
    codeExample: "Z = x + y."
  },
  {
    question: "What is the constraint that is parallel to the objective?",
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
    question: "Are multiple optimal solutions a problem?",
    shortAnswer: "No, they provide flexibility to the decision-maker.",
    explanation: "Multiple optimal solutions mean there are several equally good options to choose from.",
    hint: "Not a problem.",
    level: "basic",
    codeExample: "You can choose any point on the optimal edge."
  },
  {
    question: "What is an optimal edge?",
    shortAnswer: "The constraint edge where multiple optimal solutions lie.",
    explanation: "When the objective line overlaps a constraint edge, all points on that edge are optimal.",
    hint: "The shared edge.",
    level: "intermediate",
    codeExample: "The edge between A(10,0) and B(0,10)."
  },
  {
    question: "What is the optimal C in the multiple optima minimization example?",
    shortAnswer: "C = 5.",
    explanation: "Both A(0,5) and B(5,0) give C = 5.",
    hint: "C = 5.",
    level: "basic",
    codeExample: "C = 5 at (0,5) and (5,0)."
  },
  {
    question: "Which corners are optimal in the minimization multiple optima example?",
    shortAnswer: "A(0,5) and B(5,0).",
    explanation: "Both give the same optimal value of C = 5.",
    hint: "A and B.",
    level: "basic",
    codeExample: "A(0,5) and B(5,0)."
  },
  {
    question: "What is the objective function in the minimization multiple optima example?",
    shortAnswer: "C = x + y.",
    explanation: "The objective is to minimize the sum of x and y.",
    hint: "C = x + y.",
    level: "basic",
    codeExample: "C = x + y."
  },
  {
    question: "What is the constraint that is parallel to the objective in minimization?",
    shortAnswer: "x + y = 5.",
    explanation: "The objective C = x + y has slope -1, same as x + y = 5.",
    hint: "x + y = 5.",
    level: "intermediate",
    codeExample: "x + y = 5 has slope -1."
  },
  {
    question: "How do you identify multiple optimal solutions graphically?",
    shortAnswer: "Look for the objective line overlapping a constraint edge.",
    explanation: "If the objective line is parallel to a constraint and touches the feasible region along an edge, there are multiple optima.",
    hint: "Look for overlap.",
    level: "intermediate",
    codeExample: "The objective line coincides with a constraint edge."
  },
  {
    question: "How do you identify multiple optimal solutions algebraically?",
    shortAnswer: "Check if two or more corner points give the same optimal value.",
    explanation: "If multiple corners have the same best value, there are multiple optima.",
    hint: "Check for ties.",
    level: "intermediate",
    codeExample: "If A and B both give Z = 10."
  },
  {
    question: "What is the most common mistake with multiple optimal solutions?",
    shortAnswer: "Not recognizing they exist.",
    explanation: "Students often assume there's only one optimal solution and miss the multiple optima.",
    hint: "Don't miss them.",
    level: "basic",
    codeExample: "Check if multiple corners tie."
  },
  {
    question: "Can multiple optimal solutions occur in both maximization and minimization?",
    shortAnswer: "Yes, both can have multiple optimal solutions.",
    explanation: "Multiple optima occur when the objective is parallel to a constraint, regardless of max or min.",
    hint: "Both types.",
    level: "intermediate",
    codeExample: "Z = x + y (max) and C = x + y (min) both can have multiple optima."
  },
  {
    question: "What is the relationship between multiple optima and the corner-point principle?",
    shortAnswer: "Multiple optima are consistent with the corner-point principle.",
    explanation: "The corner-point principle says the optimum occurs at a corner point. If multiple corners are optimal, they are the endpoints of the optimal edge.",
    hint: "Still at corners.",
    level: "expert",
    codeExample: "The optimal edge has two corner endpoints."
  },
  {
    question: "What is the difference between multiple optimal solutions and unbounded solutions?",
    shortAnswer: "Multiple optima have a finite optimal value; unbounded solutions have no finite optimum.",
    explanation: "Multiple optima: the objective can achieve the same value at multiple points. Unbounded: the objective can go to infinity.",
    hint: "Finite vs infinite.",
    level: "expert",
    codeExample: "Multiple: Z=10 at many points; Unbounded: Z can go to ∞."
  },
  {
    question: "What is the business implication of multiple optimal solutions?",
    shortAnswer: "Decision-makers have flexibility to choose among equally good options.",
    explanation: "They can choose based on other factors like brand preference, risk, or strategic goals.",
    hint: "Flexibility.",
    level: "intermediate",
    codeExample: "Choose the option that best fits other business goals."
  },
  {
    question: "Can multiple optimal solutions occur with more than two variables?",
    shortAnswer: "Yes, in higher dimensions, multiple optima can occur along a face of the feasible region.",
    explanation: "The concept extends to higher dimensions, where the objective function is parallel to a constraint hyperplane.",
    hint: "Extends to higher dimensions.",
    level: "expert",
    codeExample: "In 3D, multiple optima can occur on a face of the polytope."
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
    question: "What is the optimal value of Z in the first example?",
    shortAnswer: "10.",
    explanation: "Z = x + y = 10 on the optimal edge.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Z = 10 on the entire edge."
  },
  {
    question: "What is the optimal value of C in the minimization example?",
    shortAnswer: "5.",
    explanation: "C = x + y = 5 on the optimal edge.",
    hint: "C = 5.",
    level: "basic",
    codeExample: "C = 5 on the entire edge."
  },
  {
    question: "What is the most important thing to remember about multiple optimal solutions?",
    shortAnswer: "They are a feature, not a bug — they provide flexibility.",
    explanation: "Multiple optimal solutions give decision-makers options to choose from.",
    hint: "Flexibility is good.",
    level: "basic",
    codeExample: "You can choose any point on the optimal edge."
  },
  {
    question: "How do you state multiple optimal solutions?",
    shortAnswer: "List all optimal corner points and mention the optimal edge.",
    explanation: "State both corner points and explain that any point on the edge between them is also optimal.",
    hint: "List all options.",
    level: "intermediate",
    codeExample: "A(10,0) and B(0,10) are both optimal, and any point on the edge between them."
  },
  {
    question: "What is the slope of the objective function Z = 2x + 2y?",
    shortAnswer: "-1.",
    explanation: "Z = 2x + 2y → y = -x + Z/2, so slope = -1.",
    hint: "Slope = -1.",
    level: "intermediate",
    codeExample: "Slope = -1."
  },
  {
    question: "What is the slope of the constraint 2x + 2y = 20?",
    shortAnswer: "-1.",
    explanation: "2x + 2y = 20 → x + y = 10 → y = -x + 10, so slope = -1.",
    hint: "Slope = -1.",
    level: "intermediate",
    codeExample: "Slope = -1."
  },
  {
    question: "What is the difference between multiple optima and alternative optima?",
    shortAnswer: "They mean the same thing — multiple points give the same optimal value.",
    explanation: "Both terms refer to the same concept: multiple optimal solutions.",
    hint: "Same meaning.",
    level: "basic",
    codeExample: "Multiple optima = alternative optima."
  }
];

export default questions;