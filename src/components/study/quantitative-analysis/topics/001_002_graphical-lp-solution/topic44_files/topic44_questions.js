const questions = [
  {
    question: "How do you select the optimal corner point?",
    shortAnswer: "Pick the corner with the best objective value (highest for max, lowest for min).",
    explanation: "After evaluating all corner points, select the one with the optimal value.",
    hint: "Best value wins.",
    level: "basic",
    codeExample: "Select B (4,3) with Z = 24 for maximization."
  },
  {
    question: "What do you select for maximization?",
    shortAnswer: "The corner point with the highest Z value.",
    explanation: "For maximization, you want the largest objective function value.",
    hint: "Pick the highest.",
    level: "basic",
    codeExample: "Select B (4,3) with Z = 24."
  },
  {
    question: "What do you select for minimization?",
    shortAnswer: "The corner point with the lowest C value.",
    explanation: "For minimization, you want the smallest objective function value.",
    hint: "Pick the lowest.",
    level: "basic",
    codeExample: "Select A (20,15) with C = 240."
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
    question: "What is the optimal Z in the profit maximization example?",
    shortAnswer: "24.",
    explanation: "The maximum Z is 24 at (4,3).",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Optimal Z = 24."
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
    question: "What is the selection process?",
    shortAnswer: "List corners, compare values, pick the best.",
    explanation: "1. List all corners with values. 2. Compare. 3. Select the optimal one.",
    hint: "List, compare, select.",
    level: "basic",
    codeExample: "Z values: 0, 15, 24, 22, 20 → select 24."
  },
  {
    question: "What is the first step in selecting the optimal corner?",
    shortAnswer: "List all corner points with their objective values.",
    explanation: "Before selecting, make sure you have all the values calculated.",
    hint: "List all values.",
    level: "basic",
    codeExample: "List Z for O, A, B, C, D."
  },
  {
    question: "What is the last step in selecting the optimal corner?",
    shortAnswer: "Select the corner with the best value.",
    explanation: "After comparing all values, pick the optimal one.",
    hint: "Pick the best.",
    level: "basic",
    codeExample: "Select B (4,3) with Z = 24."
  },
  {
    question: "What does it mean if two corners have the same optimal value?",
    shortAnswer: "There are multiple optimal solutions.",
    explanation: "If two or more corners tie for the best value, there are multiple optima.",
    hint: "Multiple optima.",
    level: "intermediate",
    codeExample: "Both A and B give Z=10."
  },
  {
    question: "How do you handle multiple optimal solutions?",
    shortAnswer: "Select any one of the optimal corners.",
    explanation: "If multiple corners are optimal, you can choose any of them.",
    hint: "Any works.",
    level: "intermediate",
    codeExample: "A(10,0) and B(0,10) are both optimal."
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
    question: "What is the most common mistake in selecting the optimal corner?",
    shortAnswer: "Picking the wrong direction (max vs min).",
    explanation: "Students sometimes pick the smallest for maximization or the largest for minimization.",
    hint: "Check max vs min.",
    level: "basic",
    codeExample: "For max, pick the largest number."
  },
  {
    question: "How do you verify the selected corner is optimal?",
    shortAnswer: "Check that it has the best value and is feasible.",
    explanation: "Make sure the selected corner satisfies all constraints and has the optimal value.",
    hint: "Check value and feasibility.",
    level: "intermediate",
    codeExample: "Check B (4,3) in all constraints."
  },
  {
    question: "What is the difference between selecting for max and min?",
    shortAnswer: "Max = largest value; Min = smallest value.",
    explanation: "The process is the same — you just choose the largest or smallest.",
    hint: "Largest vs smallest.",
    level: "basic",
    codeExample: "Max: pick highest; Min: pick lowest."
  },
  {
    question: "What is the optimal value of Z in the first example?",
    shortAnswer: "24.",
    explanation: "The maximum Z is 24 at (4,3).",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Optimal Z = 24."
  },
  {
    question: "What is the optimal value of C in the cost minimization example?",
    shortAnswer: "240.",
    explanation: "The minimum C is 240 at (20,15).",
    hint: "C = 240.",
    level: "basic",
    codeExample: "Optimal C = 240."
  },
  {
    question: "What is the selection reason in the profit maximization example?",
    shortAnswer: "B gives Z=24, higher than all others.",
    explanation: "B (4,3) gives Z=24, which is the highest value.",
    hint: "24 is the highest.",
    level: "intermediate",
    codeExample: "24 > 22 > 20 > 15 > 0."
  },
  {
    question: "What is the selection reason in the cost minimization example?",
    shortAnswer: "A gives C=240, the lowest feasible value.",
    explanation: "A (20,15) gives C=240, which is the lowest feasible value.",
    hint: "240 is the lowest feasible.",
    level: "intermediate",
    codeExample: "Only A is feasible."
  },
  {
    question: "What is the selection reason in the multiple optima example?",
    shortAnswer: "Both A and B give Z=10, the highest value.",
    explanation: "Both corners give the same optimal value.",
    hint: "10 = 10.",
    level: "intermediate",
    codeExample: "10 = 10 > 0."
  },
  {
    question: "How do you know if you've selected the right corner?",
    shortAnswer: "Check if it has the best value and is feasible.",
    explanation: "Verify the value is optimal and the point satisfies all constraints.",
    hint: "Check both.",
    level: "intermediate",
    codeExample: "Check B (4,3) has Z=24 and is feasible."
  },
  {
    question: "What is the most important thing to remember when selecting the optimal corner?",
    shortAnswer: "Know whether you're maximizing or minimizing.",
    explanation: "The direction of selection depends on the problem type.",
    hint: "Know max vs min.",
    level: "basic",
    codeExample: "Max: pick highest; Min: pick lowest."
  },
  {
    question: "What is a selection table?",
    shortAnswer: "A table showing corners and their values to help select the optimal one.",
    explanation: "A table helps organize values and identify the optimal solution.",
    hint: "Organize your work.",
    level: "basic",
    codeExample: "Table with corners and Z values."
  },
  {
    question: "What is the selected corner in the profit maximization example?",
    shortAnswer: "B (4,3).",
    explanation: "B (4,3) gives Z=24, the highest value.",
    hint: "B (4,3).",
    level: "basic",
    codeExample: "Selected: B (4,3)."
  },
  {
    question: "What is the selected corner in the cost minimization example?",
    shortAnswer: "A (20,15).",
    explanation: "A (20,15) gives C=240, the lowest value.",
    hint: "A (20,15).",
    level: "basic",
    codeExample: "Selected: A (20,15)."
  },
  {
    question: "What is the selected corner in the multiple optima example?",
    shortAnswer: "A (10,0) and B (0,10).",
    explanation: "Both are optimal.",
    hint: "A and B.",
    level: "intermediate",
    codeExample: "Selected: A and B."
  },
  {
    question: "What is the objective value at the selected corner in the profit example?",
    shortAnswer: "24.",
    explanation: "Z = 24 at B (4,3).",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Z = 24."
  },
  {
    question: "What is the objective value at the selected corner in the cost example?",
    shortAnswer: "240.",
    explanation: "C = 240 at A (20,15).",
    hint: "C = 240.",
    level: "basic",
    codeExample: "C = 240."
  }
];

export default questions;