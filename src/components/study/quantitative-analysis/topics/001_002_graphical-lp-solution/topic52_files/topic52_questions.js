const questions = [
  {
    question: "What is an infeasible LP problem?",
    shortAnswer: "An LP problem with no point that satisfies all constraints simultaneously.",
    explanation: "The feasible region is empty. No solution exists that meets all requirements.",
    hint: "No feasible solution.",
    level: "basic",
    codeExample: "x≤5 and x≥10 → infeasible."
  },
  {
    question: "Why do infeasible LP problems occur?",
    shortAnswer: "Constraints are contradictory and cannot all be satisfied at once.",
    explanation: "When constraints conflict (e.g., x≤5 and x≥10), no point can satisfy both.",
    hint: "Conflicting constraints.",
    level: "intermediate",
    codeExample: "x≤5 and x≥10 directly conflict."
  },
  {
    question: "How can you identify an infeasible LP problem graphically?",
    shortAnswer: "The shaded regions of constraints do not overlap anywhere.",
    explanation: "If there's no common area where all constraints are satisfied, the problem is infeasible.",
    hint: "No overlap.",
    level: "basic",
    codeExample: "No common shaded area."
  },
  {
    question: "What is the first example of infeasibility?",
    shortAnswer: "x + y ≤ 5 and x + y ≥ 10.",
    explanation: "These constraints directly conflict. No point can satisfy both.",
    hint: "Direct conflict.",
    level: "basic",
    codeExample: "x+y≤5 and x+y≥10."
  },
  {
    question: "What is the second example of infeasibility?",
    shortAnswer: "3x + 2y ≥ 12 with x + y ≤ 3.",
    explanation: "The maximum possible LHS is 9 (at x=3,y=0), which is less than 12.",
    hint: "Requirements too high.",
    level: "intermediate",
    codeExample: "3x+2y≥12, x+y≤3 → infeasible."
  },
  {
    question: "What is the third example of infeasibility?",
    shortAnswer: "x + y ≥ 10 with x ≤ 3, y ≤ 4.",
    explanation: "The maximum possible sum is 7, which is less than 10.",
    hint: "Too restrictive.",
    level: "intermediate",
    codeExample: "x+y≥10, x≤3, y≤4 → infeasible."
  },
  {
    question: "What is a direct conflict in constraints?",
    shortAnswer: "When one constraint requires something while another forbids it.",
    explanation: "Example: x≤5 and x≥10. One says x must be small, the other says x must be large.",
    hint: "Direct contradiction.",
    level: "basic",
    codeExample: "x≤5 and x≥10."
  },
  {
    question: "What is a resource over-requirement infeasibility?",
    shortAnswer: "When requirements exceed available resources.",
    explanation: "Even at maximum capacity, you cannot meet the minimum requirement.",
    hint: "Not enough resources.",
    level: "intermediate",
    codeExample: "Need 12, but max is 9."
  },
  {
    question: "What is an overly restrictive infeasibility?",
    shortAnswer: "When upper bounds are too low to meet minimum requirements.",
    explanation: "The maximum possible value is less than the minimum required.",
    hint: "Upper bounds too low.",
    level: "intermediate",
    codeExample: "Max sum = 7, need ≥ 10."
  },
  {
    question: "What does an empty feasible region look like on a graph?",
    shortAnswer: "The shaded areas of constraints do not overlap.",
    explanation: "There is no common area where all constraints are satisfied.",
    hint: "No common overlap.",
    level: "basic",
    codeExample: "The shaded regions are separate."
  },
  {
    question: "What is the most common cause of infeasibility?",
    shortAnswer: "Contradictory constraints or unrealistic requirements.",
    explanation: "Sometimes constraints are too strict or conflict with each other.",
    hint: "Contradiction or unrealistic.",
    level: "intermediate",
    codeExample: "x≤5 and x≥10."
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
    question: "Can an infeasible problem have an optimal solution?",
    shortAnswer: "No, an infeasible problem has no feasible solution at all.",
    explanation: "If the feasible region is empty, there is no solution to optimize.",
    hint: "No solution exists.",
    level: "basic",
    codeExample: "No feasible region = no optimal solution."
  },
  {
    question: "What should you do if an LP problem is infeasible?",
    shortAnswer: "Review the constraints and relax them if possible.",
    explanation: "Identify which constraints are causing the conflict and adjust them.",
    hint: "Relax or revise constraints.",
    level: "intermediate",
    codeExample: "Change x≤5 to x≤12 or x≥10 to x≥3."
  },
  {
    question: "How do you check if a problem is infeasible?",
    shortAnswer: "Graph the constraints and see if they overlap.",
    explanation: "If there's no common shaded area, the problem is infeasible.",
    hint: "Graph and check overlap.",
    level: "basic",
    codeExample: "Plot all constraints and look for overlap."
  },
  {
    question: "What is the conflict type in the first example?",
    shortAnswer: "Direct Conflict.",
    explanation: "The constraints x+y≤5 and x+y≥10 directly contradict each other.",
    hint: "Direct conflict.",
    level: "basic",
    codeExample: "x+y≤5 and x+y≥10."
  },
  {
    question: "What is the conflict type in the second example?",
    shortAnswer: "Resource Constraint.",
    explanation: "The minimum requirement cannot be met with the available resources.",
    hint: "Resource constraint.",
    level: "intermediate",
    codeExample: "Need 12, max is 9."
  },
  {
    question: "What is the conflict type in the third example?",
    shortAnswer: "Upper Bounds.",
    explanation: "The upper bounds are too low to meet the minimum requirement.",
    hint: "Upper bounds too low.",
    level: "intermediate",
    codeExample: "Max sum = 7, need ≥ 10."
  },
  {
    question: "What is the most common mistake in identifying infeasible problems?",
    shortAnswer: "Assuming a feasible solution exists without checking.",
    explanation: "Students often start optimizing without verifying feasibility first.",
    hint: "Check feasibility first.",
    level: "basic",
    codeExample: "Always check if constraints overlap."
  },
  {
    question: "What is the role of non-negativity in infeasibility?",
    shortAnswer: "Non-negativity can make a problem infeasible if requirements are too high.",
    explanation: "With x≥0 and y≥0, you can't use negative values to meet requirements.",
    hint: "Non-negativity limits options.",
    level: "intermediate",
    codeExample: "x+y≥10 with x≤3, y≤4 is infeasible even with non-negativity."
  },
  {
    question: "What is the business implication of an infeasible problem?",
    shortAnswer: "The requirements are impossible to meet.",
    explanation: "The problem as stated cannot be solved. Either the requirements or constraints need revision.",
    hint: "Requirements are impossible.",
    level: "intermediate",
    codeExample: "The business cannot achieve all goals simultaneously."
  },
  {
    question: "How do you fix an infeasible problem?",
    shortAnswer: "Relax or remove conflicting constraints.",
    explanation: "Identify which constraints are causing the conflict and adjust them.",
    hint: "Relax constraints.",
    level: "intermediate",
    codeExample: "Change x≤5 to x≤12 or x≥10 to x≥3."
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
    question: "Can an infeasible problem have a feasible objective value?",
    shortAnswer: "No, if the problem is infeasible, there is no feasible objective value.",
    explanation: "You can only evaluate the objective at feasible points. If none exist, there's no objective value.",
    hint: "No feasible points.",
    level: "basic",
    codeExample: "No feasible region = no objective evaluation."
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
    question: "How do you know if a problem is infeasible from the graph?",
    shortAnswer: "The feasible region is empty (no shaded overlap).",
    explanation: "If you graph all constraints and there's no common area, the problem is infeasible.",
    hint: "No common area.",
    level: "basic",
    codeExample: "The shaded regions don't overlap."
  },
  {
    question: "What is the first step when encountering an infeasible problem?",
    shortAnswer: "Identify which constraints are conflicting.",
    explanation: "Find the constraints that cannot be satisfied together.",
    hint: "Find the conflict.",
    level: "intermediate",
    codeExample: "Check each constraint against the others."
  },
  {
    question: "What is the second step when encountering an infeasible problem?",
    shortAnswer: "Relax or revise the conflicting constraints.",
    explanation: "Adjust the constraints to make them compatible.",
    hint: "Relax or revise.",
    level: "intermediate",
    codeExample: "Change the values or remove constraints."
  },
  {
    question: "What is the third step when encountering an infeasible problem?",
    shortAnswer: "Re-solve the problem with the revised constraints.",
    explanation: "After fixing the infeasibility, solve the LP problem again.",
    hint: "Re-solve.",
    level: "intermediate",
    codeExample: "Solve the revised problem."
  },
  {
    question: "What is the relationship between infeasibility and the simplex method?",
    shortAnswer: "The simplex method will detect infeasibility and return an error.",
    explanation: "If the problem is infeasible, the simplex method will indicate that no feasible solution exists.",
    hint: "Simplex detects infeasibility.",
    level: "expert",
    codeExample: "Simplex returns 'infeasible'."
  }
];

export default questions;