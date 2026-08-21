const questions = [
  {
    question: "How do you compare objective-function values?",
    shortAnswer: "List all values and find the largest (max) or smallest (min).",
    explanation: "For maximization, look for the highest value. For minimization, look for the lowest value.",
    hint: "Largest for max, smallest for min.",
    level: "basic",
    codeExample: "Z values: 0, 15, 24, 22, 20 → max is 24."
  },
  {
    question: "What do you look for in maximization?",
    shortAnswer: "The highest value among all corner points.",
    explanation: "For maximization problems, you want the largest objective function value.",
    hint: "Look for the biggest number.",
    level: "basic",
    codeExample: "Max Z = 24 at (4,3)."
  },
  {
    question: "What do you look for in minimization?",
    shortAnswer: "The lowest value among all corner points.",
    explanation: "For minimization problems, you want the smallest objective function value.",
    hint: "Look for the smallest number.",
    level: "basic",
    codeExample: "Min C = 240 at (20,15)."
  },
  {
    question: "What is the optimal Z value in the first example?",
    shortAnswer: "24.",
    explanation: "The maximum Z is 24 at (4,3).",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Optimal Z = 24."
  },
  {
    question: "What is the optimal C value in the cost minimization example?",
    shortAnswer: "240.",
    explanation: "The minimum C is 240 at (20,15).",
    hint: "C = 240.",
    level: "basic",
    codeExample: "Optimal C = 240."
  },
  {
    question: "Which corner is optimal in the profit maximization example?",
    shortAnswer: "B (4,3).",
    explanation: "B (4,3) gives Z = 24, the highest value.",
    hint: "B (4,3).",
    level: "basic",
    codeExample: "B (4,3) is optimal."
  },
  {
    question: "Which corner is optimal in the cost minimization example?",
    shortAnswer: "A (20,15).",
    explanation: "A (20,15) gives C = 240, the lowest value.",
    hint: "A (20,15).",
    level: "basic",
    codeExample: "A (20,15) is optimal."
  },
  {
    question: "What is the Z value at (0,0)?",
    shortAnswer: "0.",
    explanation: "Z = 3(0) + 4(0) = 0.",
    hint: "Z = 0.",
    level: "basic",
    codeExample: "Z(0,0) = 0."
  },
  {
    question: "What is the Z value at (5,0)?",
    shortAnswer: "15.",
    explanation: "Z = 3(5) + 4(0) = 15.",
    hint: "Z = 15.",
    level: "basic",
    codeExample: "Z(5,0) = 15."
  },
  {
    question: "What is the Z value at (4,3)?",
    shortAnswer: "24.",
    explanation: "Z = 3(4) + 4(3) = 12 + 12 = 24.",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Z(4,3) = 24."
  },
  {
    question: "What is the Z value at (2,4)?",
    shortAnswer: "22.",
    explanation: "Z = 3(2) + 4(4) = 6 + 16 = 22.",
    hint: "Z = 22.",
    level: "basic",
    codeExample: "Z(2,4) = 22."
  },
  {
    question: "What is the Z value at (0,5)?",
    shortAnswer: "20.",
    explanation: "Z = 3(0) + 4(5) = 20.",
    hint: "Z = 20.",
    level: "basic",
    codeExample: "Z(0,5) = 20."
  },
  {
    question: "How do you rank corner points by objective value?",
    shortAnswer: "Sort them from best to worst based on the objective value.",
    explanation: "For maximization, sort descending. For minimization, sort ascending.",
    hint: "Best to worst.",
    level: "intermediate",
    codeExample: "Z values: 24, 22, 20, 15, 0."
  },
  {
    question: "What is the rank of corner B in the profit example?",
    shortAnswer: "#1 (best).",
    explanation: "B has Z = 24, the highest value.",
    hint: "Rank #1.",
    level: "intermediate",
    codeExample: "B is rank #1."
  },
  {
    question: "What is the rank of corner O in the profit example?",
    shortAnswer: "#5 (worst).",
    explanation: "O has Z = 0, the lowest value.",
    hint: "Rank #5.",
    level: "intermediate",
    codeExample: "O is rank #5."
  },
  {
    question: "What does it mean if two corners have the same objective value?",
    shortAnswer: "There are multiple optimal solutions.",
    explanation: "If two or more corners tie for the best value, there are multiple optima.",
    hint: "Multiple optima.",
    level: "intermediate",
    codeExample: "Both A and B give Z=10."
  },
  {
    question: "How do you identify multiple optimal solutions?",
    shortAnswer: "Check if multiple corners give the same optimal value.",
    explanation: "If the objective line is parallel to a constraint edge, multiple corners may be optimal.",
    hint: "Check for ties.",
    level: "intermediate",
    codeExample: "If A and B both give Z=10."
  },
  {
    question: "What is the most common mistake in comparing values?",
    shortAnswer: "Picking the wrong direction (max vs min).",
    explanation: "Students sometimes pick the smallest for maximization or the largest for minimization.",
    hint: "Check the problem type.",
    level: "basic",
    codeExample: "For max, pick the largest number."
  },
  {
    question: "How do you handle decimals in comparison?",
    shortAnswer: "Compare decimals just like integers.",
    explanation: "Decimals work the same way. Just be careful with precision.",
    hint: "Decimals are fine.",
    level: "intermediate",
    codeExample: "Compare 24.5 vs 23.8 → 24.5 is larger."
  },
  {
    question: "What is the difference between comparing for max and min?",
    shortAnswer: "Max = largest value; Min = smallest value.",
    explanation: "The process is the same — you just choose the largest or smallest.",
    hint: "Largest vs smallest.",
    level: "basic",
    codeExample: "Max: pick highest; Min: pick lowest."
  },
  {
    question: "What is the first step in comparing values?",
    shortAnswer: "List all objective values for each corner point.",
    explanation: "Before comparing, make sure you have all the values calculated.",
    hint: "List all values.",
    level: "basic",
    codeExample: "List Z for O, A, B, C, D."
  },
  {
    question: "What is the last step in comparing values?",
    shortAnswer: "Select the optimal value (max or min).",
    explanation: "After comparing all values, pick the best one.",
    hint: "Pick the best.",
    level: "basic",
    codeExample: "Select the highest Z or lowest C."
  },
  {
    question: "How do you verify the optimal solution?",
    shortAnswer: "Check that the optimal point satisfies all constraints.",
    explanation: "Make sure the optimal point is feasible.",
    hint: "Check feasibility.",
    level: "intermediate",
    codeExample: "Check (4,3) in all constraints."
  },
  {
    question: "What is the optimal Z in the multiple optima example?",
    shortAnswer: "10.",
    explanation: "Both A(10,0) and B(0,10) give Z=10.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Optimal Z = 10."
  },
  {
    question: "Which corners are optimal in the multiple optima example?",
    shortAnswer: "A(10,0) and B(0,10).",
    explanation: "Both give the same optimal value of Z=10.",
    hint: "A and B.",
    level: "intermediate",
    codeExample: "A(10,0) and B(0,10)."
  },
  {
    question: "What is the comparison in the multiple optima example?",
    shortAnswer: "10 = 10 > 0.",
    explanation: "Both A and B have Z=10, which is greater than O with Z=0.",
    hint: "10 = 10 > 0.",
    level: "intermediate",
    codeExample: "10 = 10 > 0."
  },
  {
    question: "What is the most important thing to remember when comparing values?",
    shortAnswer: "Know whether you're maximizing or minimizing.",
    explanation: "The direction of comparison depends on the problem type.",
    hint: "Know max vs min.",
    level: "basic",
    codeExample: "Max: pick largest; Min: pick smallest."
  },
  {
    question: "What is a comparison table?",
    shortAnswer: "A table listing corner points with their objective values for easy comparison.",
    explanation: "A table helps organize values and identify the optimal solution quickly.",
    hint: "Organize your work.",
    level: "basic",
    codeExample: "Table with corners and Z values."
  },
  {
    question: "What is the optimal C in the cost minimization example?",
    shortAnswer: "240.",
    explanation: "The minimum C is 240 at (20,15).",
    hint: "C = 240.",
    level: "basic",
    codeExample: "Optimal C = 240."
  },
  {
    question: "Which corner gives the minimum cost?",
    shortAnswer: "A (20,15).",
    explanation: "A (20,15) gives C = 240, the lowest value.",
    hint: "A (20,15).",
    level: "basic",
    codeExample: "A (20,15) gives C=240."
  }
];

export default questions;