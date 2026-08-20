const questions = [
  {
    question: "What is unbounded minimization?",
    shortAnswer: "The objective can decrease without bound. No finite optimal solution exists.",
    explanation: "The feasible region extends in a direction that decreases the objective indefinitely.",
    hint: "No finite minimum.",
    level: "basic",
    codeExample: "Minimize C=-x-y with x≥0, y≥0 → unbounded."
  },
  {
    question: "Can an unbounded region have an optimal solution for minimization?",
    shortAnswer: "Yes, if the objective decreases toward the region and not into infinity.",
    explanation: "If the objective has a minimum at the boundary of the region, a finite optimum exists.",
    hint: "Yes, if bounded direction.",
    level: "intermediate",
    codeExample: "Minimize C=x+y with x+y≥5 → optimum at (0,5) or (5,0)."
  },
  {
    question: "What is the first example of bounded minimization?",
    shortAnswer: "Minimize C = x + y with x ≥ 0, y ≥ 0, x + y ≥ 5.",
    explanation: "Even though the region is unbounded, the objective has a minimum at the boundary.",
    hint: "Bounded minimization.",
    level: "intermediate",
    codeExample: "C=x+y with x+y≥5 → optimum at (0,5) or (5,0)."
  },
  {
    question: "What is the second example of unbounded minimization?",
    shortAnswer: "Minimize C = -x - y with x ≥ 0, y ≥ 0, x + y ≥ 5.",
    explanation: "The objective decreases as x and y increase, so C can go to negative infinity.",
    hint: "Unbounded minimization.",
    level: "intermediate",
    codeExample: "C=-x-y with x+y≥5 → unbounded."
  },
  {
    question: "What is the third example of bounded minimization?",
    shortAnswer: "Minimize C = x + y with x ≥ 0, y ≥ 0, x + y ≥ 5, x ≤ 10, y ≤ 10.",
    explanation: "Upper bounds make the region bounded, but the optimum is still at the same boundary.",
    hint: "Bounded with upper bounds.",
    level: "intermediate",
    codeExample: "C=x+y with x+y≥5, x≤10, y≤10 → bounded."
  },
  {
    question: "What causes unbounded minimization?",
    shortAnswer: "The objective decreases in the unbounded direction of the feasible region.",
    explanation: "If moving outward in the region decreases the objective, the problem is unbounded.",
    hint: "Objective decreases to infinity.",
    level: "intermediate",
    codeExample: "C=-x-y decreases as x,y increase."
  },
  {
    question: "What causes bounded minimization in an unbounded region?",
    shortAnswer: "The objective increases in the unbounded direction, so the minimum is at the boundary.",
    explanation: "If moving outward increases the objective, the minimum is at the inner boundary.",
    hint: "Objective increases outward.",
    level: "intermediate",
    codeExample: "C=x+y increases as x,y increase, so minimum at boundary."
  },
  {
    question: "What is the direction of bounded minimization in the first example?",
    shortAnswer: "Moving toward the origin (southwest direction) until hitting the constraint.",
    explanation: "The objective decreases as you move toward the origin.",
    hint: "Toward origin.",
    level: "intermediate",
    codeExample: "x↓, y↓ → C↓ until x+y=5."
  },
  {
    question: "What is the direction of unbounded minimization in the second example?",
    shortAnswer: "Increasing both x and y (northeast direction) → C decreases.",
    explanation: "Since C = -x - y, increasing x or y decreases C.",
    hint: "Northeast.",
    level: "intermediate",
    codeExample: "x↑, y↑ → C↓."
  },
  {
    question: "What is the key insight about unbounded minimization?",
    shortAnswer: "The objective direction determines whether there's an optimal solution.",
    explanation: "If the objective decreases toward the region, there's a finite optimum. If it decreases into infinity, there's no finite optimum.",
    hint: "Direction matters.",
    level: "intermediate",
    codeExample: "Minimize C=x+y vs C=-x-y → different outcomes."
  },
  {
    question: "How do you fix an unbounded minimization problem?",
    shortAnswer: "Add upper bound constraints or change the objective function.",
    explanation: "Adding constraints like x≤M and y≤N bounds the region and makes the problem bounded.",
    hint: "Add upper bounds.",
    level: "intermediate",
    codeExample: "Add x≤10, y≤10 to make it bounded."
  },
  {
    question: "What is the difference between unbounded minimization and maximization?",
    shortAnswer: "Unbounded minimization: objective goes to -∞; unbounded maximization: objective goes to +∞.",
    explanation: "The direction of unboundedness is opposite for minimization and maximization.",
    hint: "-∞ vs +∞.",
    level: "intermediate",
    codeExample: "Min: -∞; Max: +∞."
  },
  {
    question: "What is the visual clue for bounded minimization?",
    shortAnswer: "The objective line moves toward the origin and stops at the boundary.",
    explanation: "The smallest C value that still touches the region gives the minimum.",
    hint: "Stops at boundary.",
    level: "basic",
    codeExample: "The objective line hits the constraint at the minimum."
  },
  {
    question: "What is the visual clue for unbounded minimization?",
    shortAnswer: "The objective line keeps moving outward without bound.",
    explanation: "As C decreases (more negative), the line never leaves the feasible region.",
    hint: "Line keeps moving.",
    level: "basic",
    codeExample: "The objective line goes to infinity."
  },
  {
    question: "What is the most common mistake with unbounded minimization?",
    shortAnswer: "Assuming all unbounded regions have no optimal solution.",
    explanation: "For minimization, unbounded regions can still have optimal solutions if the objective is bounded in the unbounded direction.",
    hint: "Not always unbounded.",
    level: "basic",
    codeExample: "Minimize C=x+y with x+y≥5 → has optimum."
  },
  {
    question: "What is the optimal value in the first example?",
    shortAnswer: "C = 5 at (5,0) or (0,5).",
    explanation: "The minimum cost is 5 at the boundary.",
    hint: "C = 5.",
    level: "intermediate",
    codeExample: "C = 5 at (5,0) or (0,5)."
  },
  {
    question: "What is the optimal value in the second example?",
    shortAnswer: "No finite optimal value — unbounded.",
    explanation: "C can go to negative infinity.",
    hint: "Unbounded.",
    level: "basic",
    codeExample: "No finite optimum."
  },
  {
    question: "What is the optimal value in the third example?",
    shortAnswer: "C = 5 at (5,0) or (0,5).",
    explanation: "The minimum cost is still 5 at the boundary.",
    hint: "C = 5.",
    level: "intermediate",
    codeExample: "C = 5 at (5,0) or (0,5)."
  },
  {
    question: "What is the objective function in the first example?",
    shortAnswer: "C = x + y.",
    explanation: "The objective is to minimize the sum of x and y.",
    hint: "C = x + y.",
    level: "basic",
    codeExample: "C = x + y."
  },
  {
    question: "What is the objective function in the second example?",
    shortAnswer: "C = -x - y.",
    explanation: "The objective is to minimize -x - y.",
    hint: "C = -x - y.",
    level: "basic",
    codeExample: "C = -x - y."
  },
  {
    question: "What is the objective function in the third example?",
    shortAnswer: "C = x + y.",
    explanation: "The objective is to minimize the sum of x and y.",
    hint: "C = x + y.",
    level: "basic",
    codeExample: "C = x + y."
  },
  {
    question: "What is the constraint in all examples?",
    shortAnswer: "x + y ≥ 5.",
    explanation: "This is a lower bound constraint.",
    hint: "x + y ≥ 5.",
    level: "basic",
    codeExample: "x + y ≥ 5."
  },
  {
    question: "What is the most important thing to remember about unbounded minimization?",
    shortAnswer: "The objective direction determines boundedness.",
    explanation: "If the objective decreases toward the region, there's an optimum. If it decreases into infinity, there's no finite optimum.",
    hint: "Direction matters.",
    level: "basic",
    codeExample: "Check the objective direction."
  },
  {
    question: "What is the role of negative coefficients in unbounded minimization?",
    shortAnswer: "Negative coefficients cause the objective to decrease as variables increase, leading to unboundedness.",
    explanation: "If the objective has negative coefficients, increasing variables decreases the objective.",
    hint: "Negative coefficients → unbounded.",
    level: "intermediate",
    codeExample: "C = -x - y → unbounded."
  },
  {
    question: "What is the role of positive coefficients in bounded minimization?",
    shortAnswer: "Positive coefficients cause the objective to increase as variables increase, so the minimum is at the boundary.",
    explanation: "If the objective has positive coefficients, the minimum occurs at the smallest possible values.",
    hint: "Positive coefficients → bounded.",
    level: "intermediate",
    codeExample: "C = x + y → bounded minimization."
  },
  {
    question: "What is the difference between unbounded minimization and infeasible?",
    shortAnswer: "Unbounded: infinite solution; Infeasible: no solution.",
    explanation: "Unbounded means the objective can go to -∞. Infeasible means no feasible points exist.",
    hint: "Infinite vs none.",
    level: "basic",
    codeExample: "Unbounded: C→-∞; Infeasible: no feasible region."
  },
  {
    question: "How do you check if a minimization problem is unbounded?",
    shortAnswer: "Check if the objective line can move indefinitely in the feasible region.",
    explanation: "If moving the objective line to lower values never leaves the region, the problem is unbounded.",
    hint: "Check objective movement.",
    level: "intermediate",
    codeExample: "Move the objective line and see if it goes to -∞."
  },
  {
    question: "What is the visual clue for unbounded minimization in the second example?",
    shortAnswer: "The objective lines C = -x - y move outward as C decreases.",
    explanation: "The lines x+y = -C move outward as C becomes more negative.",
    hint: "Lines move outward.",
    level: "intermediate",
    codeExample: "C = -6: x+y=6; C = -8: x+y=8; C = -10: x+y=10."
  },
  {
    question: "What is the visual clue for bounded minimization in the first example?",
    shortAnswer: "The objective lines C = x + y move toward the origin as C decreases.",
    explanation: "The lines x+y = C move inward as C decreases until hitting the boundary.",
    hint: "Lines move inward.",
    level: "intermediate",
    codeExample: "C = 6: x+y=6; C = 5: x+y=5; C = 4: x+y=4 (infeasible)."
  },
  {
    question: "What is the visual clue for unbounded minimization in the second example?",
    shortAnswer: "The region is unbounded above, and the objective line can move outward indefinitely.",
    explanation: "The line x+y = -C keeps moving outward as C decreases.",
    hint: "Region above x+y=5.",
    level: "intermediate",
    codeExample: "Region above x+y=5."
  }
];

export default questions;