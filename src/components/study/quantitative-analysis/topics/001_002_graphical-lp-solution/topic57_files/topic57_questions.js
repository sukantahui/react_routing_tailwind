const questions = [
  {
    question: "What is an unbounded maximization problem?",
    shortAnswer: "The objective can increase without bound. No finite optimal solution exists.",
    explanation: "The feasible region extends in the direction that improves the objective indefinitely.",
    hint: "No finite optimum.",
    level: "basic",
    codeExample: "Maximize Z=x+y with x≥0, y≥0 → unbounded."
  },
  {
    question: "What is the first example of unbounded maximization?",
    shortAnswer: "Maximize Z = x + y with x ≥ 0, y ≥ 0.",
    explanation: "With only non-negativity constraints, x and y can grow infinitely. Z can go to infinity.",
    hint: "No upper bounds.",
    level: "basic",
    codeExample: "x≥0, y≥0 → unbounded maximization."
  },
  {
    question: "What is the second example of unbounded maximization?",
    shortAnswer: "Maximize Z = x + y with x + y ≥ 5, x ≥ 0, y ≥ 0.",
    explanation: "The constraint x+y≥5 is a lower bound. x and y can still grow infinitely.",
    hint: "Lower bound only.",
    level: "intermediate",
    codeExample: "x+y≥5 with non-negativity → unbounded maximization."
  },
  {
    question: "What is the third example of unbounded maximization?",
    shortAnswer: "Maximize Z = 2x + y with y ≤ 5, x ≥ 0, y ≥ 0.",
    explanation: "While y is bounded above by 5, x has no upper bound. Z can go to infinity.",
    hint: "x has no bound.",
    level: "intermediate",
    codeExample: "y≤5, x≥0 → unbounded maximization."
  },
  {
    question: "What causes unbounded maximization?",
    shortAnswer: "The feasible region is unbounded in the direction that increases the objective.",
    explanation: "There are no upper bounds on the variables that limit growth.",
    hint: "No upper bounds.",
    level: "intermediate",
    codeExample: "x≥0, y≥0 → unbounded."
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
    question: "What is the direction of unboundedness in the third example?",
    shortAnswer: "Increasing x (right direction).",
    explanation: "Since x has coefficient 2, increasing x increases Z.",
    hint: "Increasing x.",
    level: "intermediate",
    codeExample: "x↑ → Z↑."
  },
  {
    question: "What is the key insight about unbounded maximization?",
    shortAnswer: "No finite optimal solution exists.",
    explanation: "If the objective can go to infinity, there is no maximum value.",
    hint: "No maximum.",
    level: "basic",
    codeExample: "Unbounded = no finite optimum."
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
    question: "What is the difference between unbounded maximization and minimization?",
    shortAnswer: "Unbounded maximization has no finite optimum; unbounded minimization may still have an optimum.",
    explanation: "For minimization, the objective may decrease toward the region and have a finite minimum.",
    hint: "Max vs Min.",
    level: "intermediate",
    codeExample: "Max: no optimum; Min: may have optimum."
  },
  {
    question: "What is the visual clue for unbounded maximization?",
    shortAnswer: "The objective line keeps moving outward without leaving the feasible region.",
    explanation: "As Z increases, the line never exits the feasible region.",
    hint: "Line keeps moving.",
    level: "basic",
    codeExample: "The objective line moves to infinity."
  },
  {
    question: "What is the most common mistake with unbounded maximization?",
    shortAnswer: "Assuming a finite optimum exists.",
    explanation: "Students often try to find a maximum when none exists.",
    hint: "No maximum.",
    level: "basic",
    codeExample: "There is no finite optimal value."
  },
  {
    question: "What is the first example's unbounded reason?",
    shortAnswer: "x and y have no upper bounds.",
    explanation: "With only non-negativity, the region is unbounded.",
    hint: "No upper bounds.",
    level: "basic",
    codeExample: "x≥0, y≥0."
  },
  {
    question: "What is the second example's unbounded reason?",
    shortAnswer: "x+y≥5 only provides a lower bound.",
    explanation: "The region extends infinitely above the line.",
    hint: "Lower bound only.",
    level: "intermediate",
    codeExample: "x+y≥5."
  },
  {
    question: "What is the third example's unbounded reason?",
    shortAnswer: "x has no upper bound.",
    explanation: "y is bounded (0≤y≤5), but x is not.",
    hint: "x has no bound.",
    level: "intermediate",
    codeExample: "x≥0 with no upper bound."
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
    shortAnswer: "y ≤ 5.",
    explanation: "This is an upper bound on y.",
    hint: "y ≤ 5.",
    level: "basic",
    codeExample: "y ≤ 5."
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
    shortAnswer: "No finite optimal value — unbounded.",
    explanation: "Z can go to infinity as x increases.",
    hint: "Unbounded.",
    level: "basic",
    codeExample: "No finite optimum."
  },
  {
    question: "What is the most important thing to remember about unbounded maximization?",
    shortAnswer: "No finite optimal solution exists.",
    explanation: "If the objective can go to infinity, there is no maximum.",
    hint: "No maximum.",
    level: "basic",
    codeExample: "Unbounded = no finite optimum."
  },
  {
    question: "What is the visual clue for unbounded maximization in the first example?",
    shortAnswer: "The feasible region is the entire first quadrant.",
    explanation: "The region extends infinitely in both x and y directions.",
    hint: "Entire first quadrant.",
    level: "basic",
    codeExample: "x≥0, y≥0."
  },
  {
    question: "What is the visual clue for unbounded maximization in the second example?",
    shortAnswer: "The region extends infinitely above x+y=5.",
    explanation: "The region is unbounded in the northeast direction.",
    hint: "Above the line.",
    level: "intermediate",
    codeExample: "Region above x+y=5."
  },
  {
    question: "What is the visual clue for unbounded maximization in the third example?",
    shortAnswer: "The region extends infinitely to the right.",
    explanation: "x has no upper bound.",
    hint: "Unbounded right.",
    level: "intermediate",
    codeExample: "0≤y≤5, x≥0."
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
    question: "How do you check if a maximization problem is unbounded?",
    shortAnswer: "Check if the objective line can move indefinitely in the feasible region.",
    explanation: "If the objective line never leaves the region, the problem is unbounded.",
    hint: "Check objective movement.",
    level: "intermediate",
    codeExample: "Move the objective line and see if it goes to infinity."
  }
];

export default questions;