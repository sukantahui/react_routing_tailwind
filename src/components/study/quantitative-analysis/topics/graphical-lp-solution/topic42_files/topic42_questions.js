const questions = [
  {
    question: "Why do we evaluate the objective function at corner points?",
    shortAnswer: "Because the optimal solution occurs at a corner point of the feasible region.",
    explanation: "By the corner-point principle, the maximum or minimum of a linear objective function over a convex polygon occurs at a vertex.",
    hint: "Corner-point principle.",
    level: "basic",
    codeExample: "Evaluate Z at O, A, B, C, D."
  },
  {
    question: "How do you evaluate the objective function at a corner point?",
    shortAnswer: "Substitute the x and y values of the corner point into the objective function.",
    explanation: "For Z = ax + by, plug in x and y from the corner point and compute the result.",
    hint: "Plug in the coordinates.",
    level: "basic",
    codeExample: "For Z=3x+4y at (4,3): Z=3(4)+4(3)=24."
  },
  {
    question: "What is the objective function in the example?",
    shortAnswer: "Z = 3x + 4y.",
    explanation: "The objective is to maximize profit with coefficients 3 and 4.",
    hint: "Z = 3x + 4y.",
    level: "basic",
    codeExample: "Z = 3x + 4y."
  },
  {
    question: "What is the value of Z at (0,0)?",
    shortAnswer: "0.",
    explanation: "Z = 3(0) + 4(0) = 0.",
    hint: "Z = 0.",
    level: "basic",
    codeExample: "Z(0,0) = 0."
  },
  {
    question: "What is the value of Z at (5,0)?",
    shortAnswer: "15.",
    explanation: "Z = 3(5) + 4(0) = 15.",
    hint: "Z = 15.",
    level: "basic",
    codeExample: "Z(5,0) = 15."
  },
  {
    question: "What is the value of Z at (4,3)?",
    shortAnswer: "24.",
    explanation: "Z = 3(4) + 4(3) = 12 + 12 = 24.",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Z(4,3) = 24."
  },
  {
    question: "What is the value of Z at (2,4)?",
    shortAnswer: "22.",
    explanation: "Z = 3(2) + 4(4) = 6 + 16 = 22.",
    hint: "Z = 22.",
    level: "basic",
    codeExample: "Z(2,4) = 22."
  },
  {
    question: "What is the value of Z at (0,5)?",
    shortAnswer: "20.",
    explanation: "Z = 3(0) + 4(5) = 20.",
    hint: "Z = 20.",
    level: "basic",
    codeExample: "Z(0,5) = 20."
  },
  {
    question: "What is the maximum value of Z?",
    shortAnswer: "24.",
    explanation: "The maximum Z is 24 at (4,3).",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Max Z = 24 at (4,3)."
  },
  {
    question: "Which corner point gives the maximum Z?",
    shortAnswer: "B (4,3).",
    explanation: "B (4,3) gives Z = 24, which is the highest among all corners.",
    hint: "B (4,3).",
    level: "basic",
    codeExample: "B (4,3) gives Z=24."
  },
  {
    question: "What is the objective function in the cost minimization example?",
    shortAnswer: "C = 6x + 8y.",
    explanation: "The objective is to minimize cost with coefficients 6 and 8.",
    hint: "C = 6x + 8y.",
    level: "basic",
    codeExample: "C = 6x + 8y."
  },
  {
    question: "What is the value of C at (20,15)?",
    shortAnswer: "240.",
    explanation: "C = 6(20) + 8(15) = 120 + 120 = 240.",
    hint: "C = 240.",
    level: "basic",
    codeExample: "C(20,15) = 240."
  },
  {
    question: "What is the value of C at (20,20)?",
    shortAnswer: "280.",
    explanation: "C = 6(20) + 8(20) = 120 + 160 = 280.",
    hint: "C = 280.",
    level: "basic",
    codeExample: "C(20,20) = 280."
  },
  {
    question: "What is the value of C at (24,18)?",
    shortAnswer: "288.",
    explanation: "C = 6(24) + 8(18) = 144 + 144 = 288.",
    hint: "C = 288.",
    level: "basic",
    codeExample: "C(24,18) = 288."
  },
  {
    question: "What is the value of C at (30,0)?",
    shortAnswer: "180.",
    explanation: "C = 6(30) + 8(0) = 180.",
    hint: "C = 180.",
    level: "basic",
    codeExample: "C(30,0) = 180."
  },
  {
    question: "What is the value of C at (0,30)?",
    shortAnswer: "240.",
    explanation: "C = 6(0) + 8(30) = 240.",
    hint: "C = 240.",
    level: "basic",
    codeExample: "C(0,30) = 240."
  },
  {
    question: "What is the minimum value of C?",
    shortAnswer: "240.",
    explanation: "The minimum C is 240 at (20,15).",
    hint: "C = 240.",
    level: "basic",
    codeExample: "Min C = 240 at (20,15)."
  },
  {
    question: "Which corner point gives the minimum C?",
    shortAnswer: "A (20,15).",
    explanation: "A (20,15) gives C = 240, which is the lowest among feasible corners.",
    hint: "A (20,15).",
    level: "basic",
    codeExample: "A (20,15) gives C=240."
  },
  {
    question: "What is a table of values?",
    shortAnswer: "A systematic way to organize corner points and their objective values.",
    explanation: "Create a table with columns for corner point, coordinates, and objective value.",
    hint: "Organize your work.",
    level: "basic",
    codeExample: "Corner | (x,y) | Z"
  },
  {
    question: "Why use a table to evaluate corner points?",
    shortAnswer: "It helps organize calculations and avoid mistakes.",
    explanation: "A table makes it easy to compare values and identify the optimal solution.",
    hint: "Stay organized.",
    level: "basic",
    codeExample: "Use a table to track all values."
  },
  {
    question: "What is the most common mistake in evaluating corner points?",
    shortAnswer: "Arithmetic errors or missing a corner point.",
    explanation: "Careless mistakes in substitution or forgetting a corner can lead to wrong answers.",
    hint: "Double-check your work.",
    level: "basic",
    codeExample: "Check all corners and your arithmetic."
  },
  {
    question: "How do you handle decimals in evaluation?",
    shortAnswer: "Use decimals in the objective function and compute carefully.",
    explanation: "Decimals work the same way as integers. Just be careful with arithmetic.",
    hint: "Decimals are fine.",
    level: "intermediate",
    codeExample: "Z = 0.5x + 0.75y."
  },
  {
    question: "What is the difference between evaluating for max and min?",
    shortAnswer: "For max, pick the largest value; for min, pick the smallest.",
    explanation: "The evaluation process is the same — you just choose the largest or smallest value.",
    hint: "Max = largest, Min = smallest.",
    level: "basic",
    codeExample: "Max: pick highest Z; Min: pick lowest C."
  },
  {
    question: "What if two corner points give the same optimal value?",
    shortAnswer: "There are multiple optimal solutions.",
    explanation: "If two or more corners give the same best value, there are multiple optima.",
    hint: "Multiple optima.",
    level: "intermediate",
    codeExample: "Both A and B give Z=10."
  },
  {
    question: "How do you identify multiple optimal solutions?",
    shortAnswer: "Check if multiple corners give the same optimal objective value.",
    explanation: "If the objective line is parallel to a constraint edge, multiple corners may be optimal.",
    hint: "Check for ties.",
    level: "intermediate",
    codeExample: "If A and B both give Z=10."
  },
  {
    question: "What is the first step in evaluating corner points?",
    shortAnswer: "List all corner points of the feasible region.",
    explanation: "Before evaluating, make sure you have identified every corner point.",
    hint: "List all corners.",
    level: "basic",
    codeExample: "List O, A, B, C, D."
  },
  {
    question: "What is the last step in evaluating corner points?",
    shortAnswer: "Compare values and select the optimal one.",
    explanation: "After evaluating all corners, compare the values and pick the best (max or min).",
    hint: "Compare and select.",
    level: "basic",
    codeExample: "Pick the highest Z or lowest C."
  },
  {
    question: "How do you verify your optimal solution?",
    shortAnswer: "Substitute the optimal point back into the constraints to check feasibility.",
    explanation: "Ensure the optimal point satisfies all constraints.",
    hint: "Check feasibility.",
    level: "intermediate",
    codeExample: "Check (4,3) in all constraints."
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
    question: "What is the most important thing to remember when evaluating corner points?",
    shortAnswer: "Be systematic and check all corner points.",
    explanation: "Missing a corner point or making an arithmetic error can change the answer.",
    hint: "Check all corners carefully.",
    level: "basic",
    codeExample: "Evaluate every corner point."
  }
];

export default questions;