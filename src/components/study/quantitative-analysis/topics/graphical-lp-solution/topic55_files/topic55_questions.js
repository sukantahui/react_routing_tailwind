const questions = [
  {
    question: "What is an unbounded LP problem?",
    shortAnswer: "The objective can increase (or decrease) without bound. No finite optimal solution exists.",
    explanation: "The feasible region extends to infinity in the direction that improves the objective.",
    hint: "No finite optimum.",
    level: "basic",
    codeExample: "Maximize Z=x+y with x≥0, y≥0 → unbounded."
  },
  {
    question: "What is the first example of an unbounded problem?",
    shortAnswer: "Z = x + y with x ≥ 0, y ≥ 0.",
    explanation: "With only non-negativity constraints, x and y can grow infinitely. Z can go to infinity.",
    hint: "No upper bounds.",
    level: "basic",
    codeExample: "x≥0, y≥0 → unbounded maximization."
  },
  {
    question: "What is the second example of an unbounded problem?",
    shortAnswer: "Z = x + y with x ≥ 0, y ≥ 0, x + y ≥ 5.",
    explanation: "The constraint x+y≥5 is a lower bound. x and y can still grow infinitely.",
    hint: "Lower bound only.",
    level: "intermediate",
    codeExample: "x+y≥5 with non-negativity → unbounded maximization."
  },
  {
    question: "What is the third example of an unbounded problem?",
    shortAnswer: "C = x + y with x ≥ 0, y ≥ 0, x + y ≥ 5 (minimization).",
    explanation: "Even though the region is unbounded, the objective has a minimum at the boundary.",
    hint: "Minimization works.",
    level: "intermediate",
    codeExample: "x+y≥5 → minimization has optimum at boundary."
  },
  {
    question: "What is the fourth example of an unbounded problem?",
    shortAnswer: "Z = 2x + y with x ≥ 0, y ≥ 0, x + y ≥ 5.",
    explanation: "With only non-negativity and a lower bound, x and y can grow infinitely.",
    hint: "Different coefficients.",
    level: "intermediate",
    codeExample: "Z=2x+y with x+y≥5 → unbounded."
  },
  {
    question: "What causes unboundedness in maximization?",
    shortAnswer: "The feasible region is unbounded in the direction that increases the objective.",
    explanation: "There are no upper bounds on the variables that limit growth.",
    hint: "No upper bounds.",
    level: "intermediate",
    codeExample: "x≥0, y≥0 → unbounded."
  },
  {
    question: "Can an unbounded region have an optimal solution for minimization?",
    shortAnswer: "Yes, if the objective decreases toward the region.",
    explanation: "Even with an unbounded region, minimization can have a finite optimal value at the boundary.",
    hint: "Minimization can work.",
    level: "intermediate",
    codeExample: "Minimize C=x+y with x+y≥5 → optimum at (0,5) or (5,0)."
  },
  {
    question: "What is the visual clue for an unbounded problem?",
    shortAnswer: "The feasible region extends off the graph in the direction of objective improvement.",
    explanation: "The objective line keeps moving outward without leaving the feasible region.",
    hint: "Region goes off the graph.",
    level: "basic",
    codeExample: "The graph shows the region going to infinity."
  },
  {
    question: "What is the direction of unboundedness in the first example?",
    shortAnswer: "Increasing both x and y (northeast direction).",
    explanation: "Both x and y can grow indefinitely, increasing Z.",
    hint: "Northeast.",
    level: "intermediate",
    codeExample: "x↑, y↑ → Z↑."
  },
  {
    question: "What is the direction of unboundedness in the second example?",
    shortAnswer: "Increasing both x and y (northeast direction).",
    explanation: "The constraint x+y≥5 doesn't prevent growth.",
    hint: "Northeast.",
    level: "intermediate",
    codeExample: "x↑, y↑ → Z↑."
  },
  {
    question: "What is the direction of unboundedness in the fourth example?",
    shortAnswer: "Increasing x (moving right) gives the fastest growth.",
    explanation: "Since x has coefficient 2, increasing x increases Z faster.",
    hint: "Increasing x.",
    level: "intermediate",
    codeExample: "x↑ → Z↑ faster."
  },
  {
    question: "What is the key insight about unbounded problems?",
    shortAnswer: "In maximization, unbounded means no finite optimum. In minimization, it may still have an optimum.",
    explanation: "The direction of the objective determines whether unboundedness is a problem.",
    hint: "Max vs Min.",
    level: "intermediate",
    codeExample: "Max: unbounded = no optimum; Min: unbounded may have optimum."
  },
  {
    question: "What is the most common mistake with unbounded problems?",
    shortAnswer: "Assuming all unbounded regions are problematic.",
    explanation: "Minimization problems with unbounded regions can still have optimal solutions.",
    hint: "Not always a problem.",
    level: "basic",
    codeExample: "Minimization can work in unbounded regions."
  },
  {
    question: "How do you fix an unbounded maximization problem?",
    shortAnswer: "Add upper bound constraints on the variables.",
    explanation: "Adding constraints like x≤M and y≤N bounds the region.",
    hint: "Add upper bounds.",
    level: "intermediate",
    codeExample: "Add x≤10, y≤10 to make it bounded."
  },
  {
    question: "What is the difference between unbounded and infeasible?",
    shortAnswer: "Unbounded: infinite solution; Infeasible: no solution.",
    explanation: "Unbounded means the objective can go to infinity. Infeasible means no feasible points exist.",
    hint: "Infinite vs none.",
    level: "basic",
    codeExample: "Unbounded: x≥0; Infeasible: x≤5, x≥10."
  },
  {
    question: "What is the relationship between unbounded and the objective function?",
    shortAnswer: "The objective function determines the direction of unboundedness.",
    explanation: "Different objective coefficients lead to different directions of improvement.",
    hint: "Coefficients matter.",
    level: "intermediate",
    codeExample: "Z=2x+y favors increasing x more than y."
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
    question: "What is the objective function in the second example?",
    shortAnswer: "Z = x + y.",
    explanation: "The objective is to maximize the sum of x and y.",
    hint: "Z = x + y.",
    level: "basic",
    codeExample: "Z = x + y."
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
    question: "What is the objective function in the fourth example?",
    shortAnswer: "Z = 2x + y.",
    explanation: "The objective is to maximize 2x + y.",
    hint: "Z = 2x + y.",
    level: "basic",
    codeExample: "Z = 2x + y."
  },
  {
    question: "What is the constraint in the second example?",
    shortAnswer: "x + y ≥ 5.",
    explanation: "This is a lower bound constraint.",
    hint: "x + y ≥ 5.",
    level: "basic",
    codeExample: "x + y ≥ 5."
  },
  {
    question: "What is the constraint in the third example?",
    shortAnswer: "x + y ≥ 5.",
    explanation: "This is a lower bound constraint for minimization.",
    hint: "x + y ≥ 5.",
    level: "basic",
    codeExample: "x + y ≥ 5."
  },
  {
    question: "What is the constraint in the fourth example?",
    shortAnswer: "x + y ≥ 5.",
    explanation: "This is a lower bound constraint.",
    hint: "x + y ≥ 5.",
    level: "basic",
    codeExample: "x + y ≥ 5."
  },
  {
    question: "What is the optimal value in the first example?",
    shortAnswer: "No finite optimal value — unbounded.",
    explanation: "Z can go to infinity.",
    hint: "Unbounded.",
    level: "basic",
    codeExample: "No finite optimum."
  },
  {
    question: "What is the optimal value in the second example?",
    shortAnswer: "No finite optimal value — unbounded.",
    explanation: "Z can go to infinity.",
    hint: "Unbounded.",
    level: "basic",
    codeExample: "No finite optimum."
  },
  {
    question: "What is the optimal value in the third example?",
    shortAnswer: "C = 5 at (5,0) or (0,5).",
    explanation: "The minimum cost is 5 at the boundary.",
    hint: "C = 5.",
    level: "intermediate",
    codeExample: "C = 5 at (5,0) or (0,5)."
  },
  {
    question: "What is the optimal value in the fourth example?",
    shortAnswer: "No finite optimal value — unbounded.",
    explanation: "Z can go to infinity.",
    hint: "Unbounded.",
    level: "basic",
    codeExample: "No finite optimum."
  },
  {
    question: "What is the most important thing to remember about unbounded problems?",
    shortAnswer: "In maximization, unbounded = no optimum. In minimization, it may still have an optimum.",
    explanation: "The objective direction determines whether unboundedness is a problem.",
    hint: "Max vs Min.",
    level: "basic",
    codeExample: "Max: no optimum; Min: may have optimum."
  },
  {
    question: "What is the visual clue for unboundedness in the first example?",
    shortAnswer: "The feasible region is the entire first quadrant.",
    explanation: "The region extends infinitely in both x and y directions.",
    hint: "Entire first quadrant.",
    level: "basic",
    codeExample: "x≥0, y≥0."
  },
  {
    question: "What is the visual clue for unboundedness in the second example?",
    shortAnswer: "The feasible region extends infinitely above x+y=5.",
    explanation: "The region is unbounded in the northeast direction.",
    hint: "Above the line.",
    level: "intermediate",
    codeExample: "Region above x+y=5."
  },
  {
    question: "What is the visual clue for unboundedness in the fourth example?",
    shortAnswer: "The feasible region extends infinitely in the first quadrant above x+y=5.",
    explanation: "Increasing x increases Z faster.",
    hint: "First quadrant above line.",
    level: "intermediate",
    codeExample: "Region above x+y=5 in first quadrant."
  }
];

export default questions;