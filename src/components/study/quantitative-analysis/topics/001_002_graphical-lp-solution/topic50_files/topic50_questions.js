const questions = [
  {
    question: "What does it mean when the objective function is parallel to a boundary edge?",
    shortAnswer: "The objective function and the constraint have the same slope.",
    explanation: "For Z = ax + by, the slope is -a/b. When this equals the slope of a constraint, they are parallel.",
    hint: "Same slope.",
    level: "intermediate",
    codeExample: "Z = x + y has slope -1, same as x+y=10."
  },
  {
    question: "What is the slope of the objective function Z = x + y?",
    shortAnswer: "-1.",
    explanation: "Z = x + y → y = -x + Z, so slope = -1.",
    hint: "Slope = -1.",
    level: "basic",
    codeExample: "Slope = -1."
  },
  {
    question: "What is the slope of the objective function Z = 2x + y?",
    shortAnswer: "-2.",
    explanation: "Z = 2x + y → y = -2x + Z, so slope = -2.",
    hint: "Slope = -2.",
    level: "basic",
    codeExample: "Slope = -2."
  },
  {
    question: "What is the slope of the objective function Z = 3x + 4y?",
    shortAnswer: "-3/4.",
    explanation: "Z = 3x + 4y → y = -3/4x + Z/4, so slope = -3/4.",
    hint: "Slope = -3/4.",
    level: "intermediate",
    codeExample: "Slope = -3/4."
  },
  {
    question: "How do you calculate the slope of the objective function?",
    shortAnswer: "For Z = ax + by, slope = -a/b.",
    explanation: "Rewrite as by = -ax + Z, then divide by b: y = -a/b x + Z/b.",
    hint: "m = -a/b.",
    level: "intermediate",
    codeExample: "For Z=3x+4y, m = -3/4."
  },
  {
    question: "What happens when the objective function is parallel to a constraint edge?",
    shortAnswer: "There are multiple optimal solutions along that edge.",
    explanation: "When the objective line overlaps the constraint edge, all points on that edge give the same optimal value.",
    hint: "Multiple optima.",
    level: "intermediate",
    codeExample: "Z = x + y overlaps x+y=10."
  },
  {
    question: "Does parallel objective always mean multiple optimal solutions?",
    shortAnswer: "Yes, if the objective line overlaps the constraint edge at the optimal value.",
    explanation: "If the objective is parallel to a constraint but doesn't overlap at the optimum, there may still be a unique solution.",
    hint: "Need overlap at optimum.",
    level: "expert",
    codeExample: "Parallel + overlap = multiple optima."
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
    question: "Which corners are optimal in the first example?",
    shortAnswer: "A(10,0) and B(0,10).",
    explanation: "Both give the same optimal value of Z = 10.",
    hint: "A and B.",
    level: "basic",
    codeExample: "A(10,0) and B(0,10)."
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
    question: "What is the objective function in the third example?",
    shortAnswer: "Z = 2x + y.",
    explanation: "The objective is to maximize 2x + y.",
    hint: "Z = 2x + y.",
    level: "basic",
    codeExample: "Z = 2x + y."
  },
  {
    question: "What is the constraint that is parallel to the objective in the third example?",
    shortAnswer: "2x + y = 10.",
    explanation: "The objective Z = 2x + y has slope -2, same as 2x + y = 10.",
    hint: "2x + y = 10.",
    level: "intermediate",
    codeExample: "2x + y = 10 has slope -2."
  },
  {
    question: "What are the optimal corners in the third example?",
    shortAnswer: "A(5,0) and B(2,6).",
    explanation: "Both give Z = 10.",
    hint: "A and B.",
    level: "basic",
    codeExample: "A(5,0) and B(2,6)."
  },
  {
    question: "What is the optimal value in the third example?",
    shortAnswer: "Z = 10.",
    explanation: "Both A(5,0) and B(2,6) give Z = 10.",
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
    question: "What is the most common mistake when dealing with parallel objectives?",
    shortAnswer: "Not calculating the slope correctly.",
    explanation: "Students often forget the negative sign in the slope formula or calculate the slope incorrectly.",
    hint: "Check your slope.",
    level: "basic",
    codeExample: "m = -a/b, not a/b."
  },
  {
    question: "What is the relationship between parallel objectives and the corner-point principle?",
    shortAnswer: "Parallel objectives are consistent with the corner-point principle.",
    explanation: "The corner-point principle says the optimum occurs at a corner point. If multiple corners are optimal, they are the endpoints of the optimal edge.",
    hint: "Still at corners.",
    level: "expert",
    codeExample: "The optimal edge has two corner endpoints."
  },
  {
    question: "What is the difference between parallel and coincident lines?",
    shortAnswer: "Parallel lines have the same slope but different intercepts; coincident lines are identical.",
    explanation: "Parallel lines never intersect; coincident lines are the same line (infinite intersections).",
    hint: "Parallel vs identical.",
    level: "expert",
    codeExample: "x+y=10 and x+y=5 are parallel; x+y=10 and 2x+2y=20 are coincident."
  },
  {
    question: "What is the business implication of a parallel objective?",
    shortAnswer: "Decision-makers have flexibility to choose among equally good options.",
    explanation: "When the objective is parallel to a constraint, there are multiple optimal solutions, giving the decision-maker choice.",
    hint: "Flexibility.",
    level: "intermediate",
    codeExample: "Choose any point on the optimal edge."
  },
  {
    question: "How do you identify if the objective is parallel to a constraint?",
    shortAnswer: "Calculate the slope of the objective and compare to the slopes of constraints.",
    explanation: "If the slopes are equal, the objective is parallel to that constraint.",
    hint: "Compare slopes.",
    level: "intermediate",
    codeExample: "If m_obj = m_constraint, they are parallel."
  },
  {
    question: "What is the slope of the constraint 3x + 2y = 12?",
    shortAnswer: "-3/2.",
    explanation: "3x + 2y = 12 → y = -3/2x + 6, so slope = -3/2.",
    hint: "Slope = -3/2.",
    level: "intermediate",
    codeExample: "Slope = -3/2."
  },
  {
    question: "What is the slope of the constraint 4x + 2y = 10?",
    shortAnswer: "-2.",
    explanation: "4x + 2y = 10 → y = -2x + 5, so slope = -2.",
    hint: "Slope = -2.",
    level: "intermediate",
    codeExample: "Slope = -2."
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
    question: "What is the optimal edge in the third example?",
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
    question: "What is the most important thing to remember about parallel objectives?",
    shortAnswer: "They create multiple optimal solutions.",
    explanation: "When the objective function is parallel to a constraint edge, the optimal solution occurs along the entire edge.",
    hint: "Parallel = multiple optima.",
    level: "basic",
    codeExample: "Parallel objective = multiple optimal solutions."
  },
  {
    question: "How do you verify that the objective is parallel to a constraint?",
    shortAnswer: "Check that the slopes are equal and the objective overlaps the constraint at the optimum.",
    explanation: "Calculate both slopes and verify they are equal. Then check if the objective line overlaps the constraint edge at the optimal value.",
    hint: "Check slopes and overlap.",
    level: "expert",
    codeExample: "m_obj = m_constraint and overlap at optimum."
  },
  {
    question: "What is the relationship between parallel objectives and alternate optimal solutions?",
    shortAnswer: "They are the same concept — parallel objectives create alternate optimal solutions.",
    explanation: "When the objective function is parallel to a constraint edge, it creates alternate (multiple) optimal solutions.",
    hint: "Same concept.",
    level: "intermediate",
    codeExample: "Parallel objective = alternate optimal solutions."
  }
];

export default questions;