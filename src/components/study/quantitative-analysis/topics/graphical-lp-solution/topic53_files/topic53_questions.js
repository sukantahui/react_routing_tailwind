const questions = [
  {
    question: "What is an empty feasible region?",
    shortAnswer: "No point satisfies all constraints simultaneously.",
    explanation: "The feasible region is empty — there is no feasible solution.",
    hint: "No solution exists.",
    level: "basic",
    codeExample: "x≤5 and x≥10 → empty feasible region."
  },
  {
    question: "How do you identify an empty feasible region graphically?",
    shortAnswer: "The shaded regions of constraints do not overlap anywhere.",
    explanation: "There is no common area where all constraints are satisfied.",
    hint: "No overlap.",
    level: "basic",
    codeExample: "No common shaded area."
  },
  {
    question: "What causes an empty feasible region?",
    shortAnswer: "Contradictory constraints or unrealistic requirements.",
    explanation: "Constraints conflict or requirements are too high for available resources.",
    hint: "Conflicting constraints.",
    level: "intermediate",
    codeExample: "x≤5 and x≥10 conflict."
  },
  {
    question: "What is the first example of an empty feasible region?",
    shortAnswer: "x + y ≤ 5 and x + y ≥ 10.",
    explanation: "These constraints are parallel and contradictory. No point can satisfy both.",
    hint: "Parallel contradiction.",
    level: "basic",
    codeExample: "x+y≤5 and x+y≥10."
  },
  {
    question: "What is the second example of an empty feasible region?",
    shortAnswer: "x + y ≥ 8 with x ≤ 2, y ≤ 3.",
    explanation: "The maximum sum is 5, which is less than the required 8.",
    hint: "Requirements too high.",
    level: "intermediate",
    codeExample: "x+y≥8, x≤2, y≤3."
  },
  {
    question: "What is the third example of an empty feasible region?",
    shortAnswer: "2x + 3y ≥ 18 with x + y ≤ 5.",
    explanation: "The maximum LHS is 15, which is less than 18.",
    hint: "Not enough resources.",
    level: "intermediate",
    codeExample: "2x+3y≥18, x+y≤5."
  },
  {
    question: "What is the fourth example of an empty feasible region?",
    shortAnswer: "x + y ≤ -1 with x ≥ 0, y ≥ 0.",
    explanation: "Non-negativity requires x+y≥0, but the constraint requires x+y≤-1.",
    hint: "Conflicting non-negativity.",
    level: "intermediate",
    codeExample: "x+y≤-1, x≥0, y≥0."
  },
  {
    question: "What is a parallel contradiction?",
    shortAnswer: "Parallel constraints with opposite requirements.",
    explanation: "Example: x≤5 and x≥10. They are parallel but require opposite things.",
    hint: "Parallel and opposite.",
    level: "intermediate",
    codeExample: "x≤5 and x≥10."
  },
  {
    question: "What is the visual clue for an empty feasible region?",
    shortAnswer: "No overlapping shaded areas on the graph.",
    explanation: "The constraints' feasible regions don't intersect anywhere.",
    hint: "No overlap.",
    level: "basic",
    codeExample: "The shaded regions are separate."
  },
  {
    question: "What is the difference between an empty region and an unbounded region?",
    shortAnswer: "Empty: no solution; Unbounded: infinite solution.",
    explanation: "Empty means the feasible region doesn't exist. Unbounded means it extends to infinity.",
    hint: "No solution vs infinite solution.",
    level: "intermediate",
    codeExample: "Empty: no overlap; Unbounded: region goes to infinity."
  },
  {
    question: "Can an empty feasible region have an optimal solution?",
    shortAnswer: "No, if the region is empty, there is no solution to optimize.",
    explanation: "You can't find an optimal point if no feasible points exist.",
    hint: "No solution.",
    level: "basic",
    codeExample: "No feasible region = no optimal solution."
  },
  {
    question: "What should you do if the feasible region is empty?",
    shortAnswer: "Review and relax the constraints.",
    explanation: "Identify which constraints are causing the conflict and adjust them.",
    hint: "Relax constraints.",
    level: "intermediate",
    codeExample: "Change x≤5 to x≤12 or x≥10 to x≥3."
  },
  {
    question: "How do you check if a feasible region is empty?",
    shortAnswer: "Graph the constraints and see if they overlap.",
    explanation: "If there's no common shaded area, the region is empty.",
    hint: "Graph and check overlap.",
    level: "basic",
    codeExample: "Plot all constraints and look for overlap."
  },
  {
    question: "What is the most common cause of an empty feasible region?",
    shortAnswer: "Contradictory or overly restrictive constraints.",
    explanation: "Sometimes constraints are too strict or conflict with each other.",
    hint: "Contradiction or overly restrictive.",
    level: "intermediate",
    codeExample: "x≤5 and x≥10."
  },
  {
    question: "What is the most common mistake in identifying an empty feasible region?",
    shortAnswer: "Assuming a feasible region exists without checking.",
    explanation: "Students often start optimizing without verifying feasibility first.",
    hint: "Check feasibility first.",
    level: "basic",
    codeExample: "Always check if constraints overlap."
  },
  {
    question: "What is the role of non-negativity in empty feasible regions?",
    shortAnswer: "Non-negativity can make a region empty if requirements are impossible.",
    explanation: "With x≥0 and y≥0, you can't use negative values to meet requirements.",
    hint: "Non-negativity limits options.",
    level: "intermediate",
    codeExample: "x+y≤-1 with x≥0, y≥0 is empty."
  },
  {
    question: "What is the business implication of an empty feasible region?",
    shortAnswer: "The requirements are impossible to meet.",
    explanation: "The problem cannot be solved as stated. Constraints need revision.",
    hint: "Impossible requirements.",
    level: "intermediate",
    codeExample: "The business cannot achieve all goals simultaneously."
  },
  {
    question: "How do you fix an empty feasible region?",
    shortAnswer: "Relax or remove conflicting constraints.",
    explanation: "Identify which constraints are causing the conflict and adjust them.",
    hint: "Relax constraints.",
    level: "intermediate",
    codeExample: "Change x≤5 to x≤12 or x≥10 to x≥3."
  },
  {
    question: "What is the first step when you find an empty feasible region?",
    shortAnswer: "Identify which constraints are conflicting.",
    explanation: "Find the constraints that cannot be satisfied together.",
    hint: "Find the conflict.",
    level: "intermediate",
    codeExample: "Check each constraint against the others."
  },
  {
    question: "What is the second step when you find an empty feasible region?",
    shortAnswer: "Relax or revise the conflicting constraints.",
    explanation: "Adjust the constraints to make them compatible.",
    hint: "Relax or revise.",
    level: "intermediate",
    codeExample: "Change the values or remove constraints."
  },
  {
    question: "What is the third step when you find an empty feasible region?",
    shortAnswer: "Re-solve the problem with the revised constraints.",
    explanation: "After fixing the infeasibility, solve the LP problem again.",
    hint: "Re-solve.",
    level: "intermediate",
    codeExample: "Solve the revised problem."
  },
  {
    question: "What is the relationship between an empty feasible region and the simplex method?",
    shortAnswer: "The simplex method will detect infeasibility and return an error.",
    explanation: "If the feasible region is empty, the simplex method will indicate that no feasible solution exists.",
    hint: "Simplex detects infeasibility.",
    level: "expert",
    codeExample: "Simplex returns 'infeasible'."
  },
  {
    question: "What is the identification method for parallel contradiction?",
    shortAnswer: "Look for parallel constraints with opposite inequality directions.",
    explanation: "If constraints are parallel and one requires ≤ and the other requires ≥, there's a contradiction.",
    hint: "Parallel and opposite.",
    level: "intermediate",
    codeExample: "x+y≤5 and x+y≥10 are parallel and contradictory."
  },
  {
    question: "What is the identification method for impossible requirements?",
    shortAnswer: "Check if requirements exceed available resources.",
    explanation: "Calculate the maximum possible value and compare to the minimum requirement.",
    hint: "Compare max to min.",
    level: "intermediate",
    codeExample: "Max LHS = 9 < 12 → infeasible."
  },
  {
    question: "What is the identification method for conflicting non-negativity?",
    shortAnswer: "Check if constraints require values outside the first quadrant.",
    explanation: "If a constraint requires x+y<0 with non-negativity, the region is empty.",
    hint: "Check first quadrant.",
    level: "intermediate",
    codeExample: "x+y≤-1 with x≥0, y≥0 is empty."
  },
  {
    question: "What is the most important thing to remember about an empty feasible region?",
    shortAnswer: "It means no solution exists and the problem needs revision.",
    explanation: "An empty feasible region indicates that the constraints are contradictory or unrealistic.",
    hint: "No solution → revise.",
    level: "basic",
    codeExample: "Empty = no solution."
  },
  {
    question: "How do you know if a feasible region is empty from the graph?",
    shortAnswer: "The feasible region is empty (no shaded overlap).",
    explanation: "If you graph all constraints and there's no common area, the region is empty.",
    hint: "No common area.",
    level: "basic",
    codeExample: "The shaded regions don't overlap."
  },
  {
    question: "What is the visual clue for an empty feasible region in the first example?",
    shortAnswer: "Two parallel lines with feasible regions on opposite sides.",
    explanation: "The constraint lines are parallel and the feasible regions face away from each other.",
    hint: "Opposite sides.",
    level: "intermediate",
    codeExample: "x+y≤5 and x+y≥10 have opposite feasible sides."
  },
  {
    question: "What is the visual clue for an empty feasible region in the second example?",
    shortAnswer: "The required region is completely outside the allowed region.",
    explanation: "The region satisfying x+y≥8 is entirely outside the region with x≤2 and y≤3.",
    hint: "Outside the allowed region.",
    level: "intermediate",
    codeExample: "x+y≥8 is outside x≤2, y≤3."
  },
  {
    question: "What is the visual clue for an empty feasible region in the third example?",
    shortAnswer: "The entire region for the requirement is above the resource limit.",
    explanation: "The region satisfying 2x+3y≥18 is entirely above the line x+y=5.",
    hint: "Above the limit.",
    level: "intermediate",
    codeExample: "2x+3y≥18 is outside x+y≤5."
  },
  {
    question: "What is the visual clue for an empty feasible region in the fourth example?",
    shortAnswer: "The constraint is entirely in the negative quadrant.",
    explanation: "x+y≤-1 is completely below the x-axis and left of the y-axis.",
    hint: "Negative quadrant.",
    level: "intermediate",
    codeExample: "x+y≤-1 is in the negative quadrant."
  }
];

export default questions;