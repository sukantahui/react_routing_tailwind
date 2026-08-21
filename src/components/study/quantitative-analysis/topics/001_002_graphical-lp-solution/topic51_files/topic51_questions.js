const questions = [
  {
    question: "What are infinite optimal solutions?",
    shortAnswer: "When every point on an edge of the feasible region gives the same optimal objective value.",
    explanation: "Infinite optimal solutions occur when the objective function is parallel to a constraint edge, creating a continuum of optimal points.",
    hint: "Entire edge is optimal.",
    level: "intermediate",
    codeExample: "Z = x + y with x+y=10 gives Z=10 on the entire edge."
  },
  {
    question: "Why do infinite optimal solutions occur?",
    shortAnswer: "The objective function is parallel to a constraint edge.",
    explanation: "When the objective line has the same slope as a constraint, it overlaps the constraint edge at the optimum.",
    hint: "Parallel lines.",
    level: "intermediate",
    codeExample: "Z = x + y has slope -1, same as x+y=10."
  },
  {
    question: "What is the difference between multiple and infinite optimal solutions?",
    shortAnswer: "Multiple optima means at least two corners; infinite means uncountably many points on an edge.",
    explanation: "Multiple optima can be finite (e.g., two corners) or infinite (entire edge). Infinite is a special case of multiple optima.",
    hint: "Finite vs uncountable.",
    level: "expert",
    codeExample: "Two corners = multiple; entire edge = infinite."
  },
  {
    question: "What is the optimal value in the first example?",
    shortAnswer: "Z = 10.",
    explanation: "All points on the edge x+y=10 give Z=10.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Z = 10."
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
    question: "What is the constraint that creates infinite optima in the first example?",
    shortAnswer: "x + y = 10.",
    explanation: "The objective Z = x + y has slope -1, same as x + y = 10.",
    hint: "x + y = 10.",
    level: "intermediate",
    codeExample: "x + y = 10."
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
    question: "What is the objective function in the second example?",
    shortAnswer: "Z = 2x + y.",
    explanation: "The objective is to maximize 2x + y.",
    hint: "Z = 2x + y.",
    level: "basic",
    codeExample: "Z = 2x + y."
  },
  {
    question: "What is the constraint that creates infinite optima in the second example?",
    shortAnswer: "2x + y = 10.",
    explanation: "The objective Z = 2x + y has slope -2, same as 2x + y = 10.",
    hint: "2x + y = 10.",
    level: "intermediate",
    codeExample: "2x + y = 10."
  },
  {
    question: "What is the slope of Z = 2x + y?",
    shortAnswer: "-2.",
    explanation: "Z = 2x + y → y = -2x + Z, so slope = -2.",
    hint: "Slope = -2.",
    level: "intermediate",
    codeExample: "Slope = -2."
  },
  {
    question: "What is the slope of 2x + y = 10?",
    shortAnswer: "-2.",
    explanation: "2x + y = 10 → y = -2x + 10, so slope = -2.",
    hint: "Slope = -2.",
    level: "intermediate",
    codeExample: "Slope = -2."
  },
  {
    question: "What are the sample points on the optimal edge in the first example?",
    shortAnswer: "A(10,0), P(8,2), Q(6,4), R(5,5), S(4,6), T(2,8), B(0,10).",
    explanation: "These are just a few of the infinitely many points on x+y=10.",
    hint: "Points on x+y=10.",
    level: "intermediate",
    codeExample: "(10,0), (8,2), (6,4), (5,5), (4,6), (2,8), (0,10)."
  },
  {
    question: "What is the optimal value in the second example?",
    shortAnswer: "Z = 10.",
    explanation: "All points on 2x+y=10 give Z=10.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Z = 10."
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
    question: "What is the constraint that creates infinite optima in the minimization example?",
    shortAnswer: "x + y = 5.",
    explanation: "The objective C = x + y has slope -1, same as x + y = 5.",
    hint: "x + y = 5.",
    level: "intermediate",
    codeExample: "x + y = 5."
  },
  {
    question: "What is the optimal value in the minimization example?",
    shortAnswer: "C = 5.",
    explanation: "All points on x+y=5 give C=5.",
    hint: "C = 5.",
    level: "basic",
    codeExample: "C = 5."
  },
  {
    question: "What are the sample points on the optimal edge in the minimization example?",
    shortAnswer: "A(0,5), P(2.5,2.5), B(5,0).",
    explanation: "These are just a few of the infinitely many points on x+y=5.",
    hint: "Points on x+y=5.",
    level: "intermediate",
    codeExample: "(0,5), (2.5,2.5), (5,0)."
  },
  {
    question: "What is the most common mistake with infinite optimal solutions?",
    shortAnswer: "Not recognizing that the entire edge is optimal.",
    explanation: "Students often only state the corner points and miss the continuum of optimal points.",
    hint: "Look at the whole edge.",
    level: "basic",
    codeExample: "All points on the edge, not just the corners."
  },
  {
    question: "What is the difference between infinite optimal solutions and unbounded solutions?",
    shortAnswer: "Infinite optima have a finite optimal value; unbounded solutions have no finite optimum.",
    explanation: "Infinite optima: the objective can achieve the same value at infinitely many points. Unbounded: the objective can go to infinity.",
    hint: "Finite vs infinite value.",
    level: "expert",
    codeExample: "Infinite: Z=10 at many points; Unbounded: Z can go to ∞."
  },
  {
    question: "What is the business implication of infinite optimal solutions?",
    shortAnswer: "Maximum flexibility for the decision-maker.",
    explanation: "With infinite optimal solutions, the decision-maker can choose any point on the optimal edge based on other factors.",
    hint: "Maximum flexibility.",
    level: "intermediate",
    codeExample: "Choose any point on the optimal edge."
  },
  {
    question: "How do you identify infinite optimal solutions graphically?",
    shortAnswer: "Look for the objective line overlapping a constraint edge.",
    explanation: "If the objective line coincides with a constraint edge at the optimum, there are infinite optimal solutions.",
    hint: "Look for overlap.",
    level: "intermediate",
    codeExample: "The objective line lies on the constraint edge."
  },
  {
    question: "How do you identify infinite optimal solutions algebraically?",
    shortAnswer: "Check if two or more corner points give the same optimal value and if the objective is parallel to the constraint.",
    explanation: "If multiple corners have the same optimal value and the objective is parallel to the constraint, there are infinite optima.",
    hint: "Check corners and slopes.",
    level: "expert",
    codeExample: "A and B both give Z=10, and objective is parallel to constraint."
  },
  {
    question: "Can infinite optimal solutions occur in both maximization and minimization?",
    shortAnswer: "Yes, both can have infinite optimal solutions.",
    explanation: "Infinite optima occur when the objective is parallel to a constraint, regardless of max or min.",
    hint: "Both types.",
    level: "intermediate",
    codeExample: "Z = x + y (max) and C = x + y (min) both can have infinite optima."
  },
  {
    question: "What is the relationship between infinite optimal solutions and the corner-point principle?",
    shortAnswer: "Infinite optima are consistent with the corner-point principle.",
    explanation: "The corner-point principle says the optimum occurs at a corner point. If the entire edge is optimal, the corners are the endpoints of that edge.",
    hint: "Still at corners.",
    level: "expert",
    codeExample: "The optimal edge has two corner endpoints."
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
    question: "What is the most important thing to remember about infinite optimal solutions?",
    shortAnswer: "There are infinitely many equally good optimal points.",
    explanation: "When the objective is parallel to a constraint edge, every point on that edge gives the same optimal value.",
    hint: "Infinitely many optimal points.",
    level: "basic",
    codeExample: "∞ optimal solutions."
  },
  {
    question: "How do you state infinite optimal solutions?",
    shortAnswer: "State that all points on the optimal edge are optimal, and provide sample points.",
    explanation: "Clearly state that the entire edge is optimal and give a few example points to illustrate.",
    hint: "State the edge and give examples.",
    level: "intermediate",
    codeExample: "All points on x+y=10 are optimal, e.g., (10,0), (5,5), (0,10)."
  }
];

export default questions;