const questions = [
  {
    question: "What is the problem in the first example?",
    shortAnswer: "x + y ≤ 5 and x + y ≥ 10 with non-negativity.",
    explanation: "The constraints directly conflict. No point can satisfy both.",
    hint: "Direct conflict.",
    level: "basic",
    codeExample: "x+y≤5 and x+y≥10."
  },
  {
    question: "What is the problem in the second example?",
    shortAnswer: "3x + 2y ≥ 12 with x + y ≤ 3.",
    explanation: "The maximum LHS is 6 < 12, so the requirement cannot be met.",
    hint: "Resource over-requirement.",
    level: "intermediate",
    codeExample: "3x+2y≥12, x+y≤3."
  },
  {
    question: "What is the problem in the third example?",
    shortAnswer: "x + y ≥ 8 with x ≤ 2, y ≤ 3.",
    explanation: "The maximum sum is 5 < 8, so the requirement cannot be met.",
    hint: "Overly restrictive bounds.",
    level: "intermediate",
    codeExample: "x+y≥8, x≤2, y≤3."
  },
  {
    question: "What is the conclusion of the first example?",
    shortAnswer: "The problem is infeasible. No solution exists.",
    explanation: "The constraints cannot all be satisfied simultaneously.",
    hint: "No solution.",
    level: "basic",
    codeExample: "Infeasible."
  },
  {
    question: "What is the conclusion of the second example?",
    shortAnswer: "The problem is infeasible. No solution exists.",
    explanation: "The minimum requirement cannot be met with the available resources.",
    hint: "No solution.",
    level: "basic",
    codeExample: "Infeasible."
  },
  {
    question: "What is the conclusion of the third example?",
    shortAnswer: "The problem is infeasible. No solution exists.",
    explanation: "The upper bounds are too low to meet the minimum requirement.",
    hint: "No solution.",
    level: "basic",
    codeExample: "Infeasible."
  },
  {
    question: "What is the conflict type in the first example?",
    shortAnswer: "Direct Conflict.",
    explanation: "The constraints directly contradict each other.",
    hint: "Direct conflict.",
    level: "basic",
    codeExample: "x+y≤5 and x+y≥10."
  },
  {
    question: "What is the conflict type in the second example?",
    shortAnswer: "Resource Over-Requirement.",
    explanation: "The minimum requirement exceeds available resources.",
    hint: "Resource over-requirement.",
    level: "intermediate",
    codeExample: "Need 12, max is 6."
  },
  {
    question: "What is the conflict type in the third example?",
    shortAnswer: "Overly Restrictive Bounds.",
    explanation: "The upper bounds are too low to meet the minimum requirement.",
    hint: "Overly restrictive.",
    level: "intermediate",
    codeExample: "Max sum = 5, need ≥ 8."
  },
  {
    question: "How do you identify infeasibility in the first example?",
    shortAnswer: "The constraints are parallel with opposite inequality directions.",
    explanation: "x+y≤5 and x+y≥10 are parallel and contradictory.",
    hint: "Parallel contradiction.",
    level: "intermediate",
    codeExample: "Parallel lines with opposite signs."
  },
  {
    question: "How do you identify infeasibility in the second example?",
    shortAnswer: "Even at maximum resource allocation, the requirement cannot be met.",
    explanation: "At (0,3), LHS=6 < 12. At (3,0), LHS=9 < 12.",
    hint: "Max is less than min.",
    level: "intermediate",
    codeExample: "Max LHS = 9 < 12."
  },
  {
    question: "How do you identify infeasibility in the third example?",
    shortAnswer: "The upper bounds are too low to meet the minimum requirement.",
    explanation: "With x≤2 and y≤3, the maximum sum is 5 < 8.",
    hint: "Upper bounds too low.",
    level: "intermediate",
    codeExample: "Max sum = 5 < 8."
  },
  {
    question: "What is the objective function in the first example?",
    shortAnswer: "Maximize Z = 3x + 4y.",
    explanation: "The objective is to maximize profit.",
    hint: "Z = 3x + 4y.",
    level: "basic",
    codeExample: "Z = 3x + 4y."
  },
  {
    question: "What is the objective function in the second example?",
    shortAnswer: "Minimize C = 4x + 5y.",
    explanation: "The objective is to minimize cost.",
    hint: "C = 4x + 5y.",
    level: "basic",
    codeExample: "C = 4x + 5y."
  },
  {
    question: "What is the objective function in the third example?",
    shortAnswer: "Maximize Z = 5x + 6y.",
    explanation: "The objective is to maximize profit.",
    hint: "Z = 5x + 6y.",
    level: "basic",
    codeExample: "Z = 5x + 6y."
  },
  {
    question: "What is the most common mistake in infeasible problems?",
    shortAnswer: "Assuming a feasible solution exists without checking.",
    explanation: "Students often start optimizing without verifying feasibility first.",
    hint: "Check feasibility first.",
    level: "basic",
    codeExample: "Always check if constraints overlap."
  },
  {
    question: "What should you do if a problem is infeasible?",
    shortAnswer: "Relax or revise the conflicting constraints.",
    explanation: "Identify which constraints are causing the conflict and adjust them.",
    hint: "Relax constraints.",
    level: "intermediate",
    codeExample: "Change x≤5 to x≤12 or x≥10 to x≥3."
  },
  {
    question: "What is the first step in solving an infeasible problem?",
    shortAnswer: "Identify which constraints are conflicting.",
    explanation: "Find the constraints that cannot be satisfied together.",
    hint: "Find the conflict.",
    level: "intermediate",
    codeExample: "Check each constraint against the others."
  },
  {
    question: "What is the second step in solving an infeasible problem?",
    shortAnswer: "Relax or revise the conflicting constraints.",
    explanation: "Adjust the constraints to make them compatible.",
    hint: "Relax or revise.",
    level: "intermediate",
    codeExample: "Change the values or remove constraints."
  },
  {
    question: "What is the third step in solving an infeasible problem?",
    shortAnswer: "Re-solve the problem with the revised constraints.",
    explanation: "After fixing the infeasibility, solve the LP problem again.",
    hint: "Re-solve.",
    level: "intermediate",
    codeExample: "Solve the revised problem."
  },
  {
    question: "What is the difference between infeasible and unbounded?",
    shortAnswer: "Infeasible: no solution; Unbounded: infinite solution.",
    explanation: "Infeasible means the feasible region is empty. Unbounded means the objective can go to infinity.",
    hint: "No solution vs infinite solution.",
    level: "intermediate",
    codeExample: "Infeasible: no overlap; Unbounded: region goes to infinity."
  },
  {
    question: "What is the business implication of an infeasible problem?",
    shortAnswer: "The requirements are impossible to meet.",
    explanation: "The problem cannot be solved as stated. Constraints need revision.",
    hint: "Impossible requirements.",
    level: "intermediate",
    codeExample: "The business cannot achieve all goals simultaneously."
  },
  {
    question: "What is the visual clue for infeasibility in the first example?",
    shortAnswer: "Two parallel lines with feasible regions on opposite sides.",
    explanation: "The constraint lines are parallel and the feasible regions face away from each other.",
    hint: "Opposite sides.",
    level: "intermediate",
    codeExample: "x+y≤5 and x+y≥10 have opposite feasible sides."
  },
  {
    question: "What is the visual clue for infeasibility in the second example?",
    shortAnswer: "The required region is completely above the resource limit.",
    explanation: "The region satisfying 3x+2y≥12 is entirely above the line x+y=3.",
    hint: "Above the limit.",
    level: "intermediate",
    codeExample: "3x+2y≥12 is outside x+y≤3."
  },
  {
    question: "What is the visual clue for infeasibility in the third example?",
    shortAnswer: "The required region is completely outside the allowed region.",
    explanation: "The region satisfying x+y≥8 is entirely outside the region with x≤2 and y≤3.",
    hint: "Outside the allowed region.",
    level: "intermediate",
    codeExample: "x+y≥8 is outside x≤2, y≤3."
  },
  {
    question: "What is the most important thing to remember about infeasible problems?",
    shortAnswer: "They have no solution and need revision.",
    explanation: "Infeasibility means the problem cannot be solved as stated. You must revise the constraints.",
    hint: "No solution → revise.",
    level: "basic",
    codeExample: "Infeasible = no solution."
  },
  {
    question: "What is the first example's infeasible reason?",
    shortAnswer: "x+y≤5 and x+y≥10 directly conflict.",
    explanation: "No point can satisfy both constraints simultaneously.",
    hint: "Direct conflict.",
    level: "basic",
    codeExample: "x+y≤5 and x+y≥10."
  },
  {
    question: "What is the second example's infeasible reason?",
    shortAnswer: "Max LHS = 9 < 12.",
    explanation: "Even at maximum resource allocation, the requirement cannot be met.",
    hint: "Max < min.",
    level: "intermediate",
    codeExample: "Max LHS = 9 < 12."
  },
  {
    question: "What is the third example's infeasible reason?",
    shortAnswer: "Max sum = 5 < 8.",
    explanation: "The upper bounds are too low to meet the minimum requirement.",
    hint: "Max < min.",
    level: "intermediate",
    codeExample: "Max sum = 5 < 8."
  },
  {
    question: "What is the solution to all three examples?",
    shortAnswer: "No feasible solution exists. The problem is infeasible.",
    explanation: "All three examples have contradictory constraints.",
    hint: "No solution.",
    level: "basic",
    codeExample: "Infeasible."
  }
];

export default questions;