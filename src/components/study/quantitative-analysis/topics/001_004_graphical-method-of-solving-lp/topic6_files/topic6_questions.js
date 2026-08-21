const questions = [
  {
    question: "What are the special cases in graphical LP?",
    shortAnswer: "Unique optimal, multiple optimal, infeasible, unbounded, redundant constraints, and degenerate solutions.",
    explanation: "These special cases represent different scenarios that can occur when solving LP problems graphically. Each case has distinct characteristics and implications for the optimal solution.",
    hint: "Think of the different outcomes possible in LP problems.",
    level: "basic",
    codeExample: "Cases: Unique, Multiple, Infeasible, Unbounded, Redundant, Degenerate"
  },
  {
    question: "What is a unique optimal solution?",
    shortAnswer: "A unique optimal solution occurs when there is exactly one corner point that gives the optimal objective function value.",
    explanation: "This is the most common case in LP. The objective function has a unique slope, and the optimal solution is at a single corner point of the feasible region.",
    hint: "One corner point gives the best Z value.",
    level: "basic",
    codeExample: "Max Z = 3x + 2y\nOptimal at (4, 2) with Z = 16\nNo other point gives Z = 16"
  },
  {
    question: "What causes multiple optimal solutions?",
    shortAnswer: "Multiple optimal solutions occur when the objective function is parallel to a binding constraint line.",
    explanation: "When the objective function has the same slope as a constraint that is binding, any point along that constraint edge gives the same optimal value.",
    hint: "Look for parallel lines between objective and constraint.",
    level: "intermediate",
    codeExample: "Max Z = x + y\nConstraint: x + y ≤ 10\nAny point on x + y = 10 gives Z = 10"
  },
  {
    question: "What is an infeasible LP problem?",
    shortAnswer: "An infeasible LP problem has no solution because no point satisfies all constraints simultaneously.",
    explanation: "This occurs when constraints are contradictory. The feasible region is empty. The problem must be reformulated or constraints relaxed.",
    hint: "No point satisfies all constraints = infeasible.",
    level: "basic",
    codeExample: "x + y ≤ 5 and x + y ≥ 8\nNo solution exists"
  },
  {
    question: "What is an unbounded LP problem?",
    shortAnswer: "An unbounded LP problem has no finite optimal solution because the objective can improve indefinitely.",
    explanation: "This occurs when the feasible region is unbounded in the direction of optimization. Additional constraints are needed to bound the problem.",
    hint: "Objective can go to infinity = unbounded.",
    level: "intermediate",
    codeExample: "Max Z = x + y\nConstraints: x, y ≥ 0\nZ can increase indefinitely"
  },
  {
    question: "What is a redundant constraint?",
    shortAnswer: "A redundant constraint does not affect the feasible region or optimal solution and can be removed.",
    explanation: "Redundant constraints are always satisfied and never bind at the optimal solution. They don't form part of the feasible region boundary.",
    hint: "Constraint that never affects the solution.",
    level: "intermediate",
    codeExample: "Constraint: x + y ≤ 20\nFeasible region: x + y ≤ 10\nRedundant"
  },
  {
    question: "What is a degenerate solution?",
    shortAnswer: "A degenerate solution occurs when more than the minimum number of constraints are binding at the optimal point.",
    explanation: "In 2D, this means 3 or more constraints intersect at the optimal corner point. This can cause computational issues in the simplex method.",
    hint: "More than 2 constraints binding at the optimal point.",
    level: "advanced",
    codeExample: "At (4, 3):\nConstraint 1: x + y = 7\nConstraint 2: 2x + y = 11\nConstraint 3: x + 2y = 10\n3 constraints binding"
  },
  {
    question: "How can you identify multiple optimal solutions graphically?",
    shortAnswer: "Look for the objective function line being parallel to a constraint line that forms the feasible region boundary.",
    explanation: "When the objective function and a binding constraint have the same slope, there are infinite optimal solutions along that constraint edge.",
    hint: "Parallel lines = multiple optimal solutions.",
    level: "intermediate",
    codeExample: "Objective: Z = 2x + 3y\nConstraint: 2x + 3y ≤ 12\nParallel → Multiple optima"
  },
  {
    question: "How do you recognize an infeasible problem on a graph?",
    shortAnswer: "An infeasible problem shows no overlap of all constraint regions - the feasible region is empty.",
    explanation: "On a graph, you'll see that the constraints don't intersect to form any common area. No point satisfies all constraints simultaneously.",
    hint: "No common area where all constraints overlap.",
    level: "basic",
    codeExample: "Constraints: x + y ≤ 5, x + y ≥ 8\nNo overlap → Infeasible"
  },
  {
    question: "What does an unbounded feasible region look like on a graph?",
    shortAnswer: "An unbounded feasible region extends to infinity in at least one direction.",
    explanation: "The feasible region is not closed - it continues indefinitely. If the objective function improves in the unbounded direction, the problem has no finite optimum.",
    hint: "Feasible region goes to infinity.",
    level: "intermediate",
    codeExample: "Region: x ≥ 0, y ≥ 0\nExtends to infinity in positive directions"
  },
  {
    question: "Can a problem have both multiple optimal solutions and degenerate solutions?",
    shortAnswer: "Yes, a problem can have both multiple optimal solutions and degenerate solutions simultaneously.",
    explanation: "When there are multiple optimal solutions along an edge, and more than 2 constraints intersect at a corner point on that edge, both cases exist.",
    hint: "Multiple optima on an edge with degeneracy at corners.",
    level: "advanced",
    codeExample: "Multiple optima along an edge with 3 constraints binding at endpoints"
  },
  {
    question: "What is the difference between infeasible and unbounded?",
    shortAnswer: "Infeasible means no solution exists, while unbounded means a solution exists but no finite optimum.",
    explanation: "Infeasible problems have an empty feasible region. Unbounded problems have a non-empty feasible region but the objective can improve without limit.",
    hint: "Infeasible = no solution, Unbounded = no finite optimum.",
    level: "intermediate",
    codeExample: "Infeasible: x ≤ 2, x ≥ 3\nUnbounded: Max Z = x, x ≥ 0"
  },
  {
    question: "How do redundant constraints affect the graphical solution?",
    shortAnswer: "Redundant constraints don't affect the graphical solution at all - they can be ignored.",
    explanation: "Redundant constraints don't form part of the feasible region boundary. Removing them doesn't change the optimal solution or the feasible region.",
    hint: "Redundant constraints don't change the solution.",
    level: "intermediate",
    codeExample: "Constraint: x ≤ 20 (if feasible region max x is 10)\nRedundant"
  },
  {
    question: "What causes degeneracy in LP problems?",
    shortAnswer: "Degeneracy is caused by more constraints intersecting at the optimal point than necessary.",
    explanation: "In 2D, this happens when 3 or more constraint lines pass through the same corner point. This means more constraints are binding than needed to define the point.",
    hint: "Too many constraints at one point.",
    level: "advanced",
    codeExample: "3 constraints intersect at (4, 3)\nOnly 2 needed to define the point"
  },
  {
    question: "What is the practical implication of multiple optimal solutions?",
    shortAnswer: "Multiple optimal solutions give decision-makers flexibility to choose among equally good options.",
    explanation: "When multiple solutions give the same optimal value, managers can choose based on other criteria like sustainability, risk, or other business objectives.",
    hint: "Flexibility to choose among optimal options.",
    level: "intermediate",
    codeExample: "Multiple production plans giving same profit\nChoose based on other factors"
  },
  {
    question: "How do you fix an infeasible LP problem?",
    shortAnswer: "Relax constraints, remove conflicting constraints, or reformulate the problem.",
    explanation: "Infeasibility means the constraints are too tight. Solutions include relaxing some constraints, removing conflicting requirements, or adjusting the problem formulation.",
    hint: "Make constraints less restrictive.",
    level: "intermediate",
    codeExample: "Instead of x + y ≤ 5 and x + y ≥ 8\nRelax to x + y ≤ 6 and x + y ≥ 7"
  },
  {
    question: "How do you fix an unbounded LP problem?",
    shortAnswer: "Add additional constraints to bound the feasible region in the direction of optimization.",
    explanation: "Unbounded problems need upper bound constraints. In real problems, resources are always limited, so adding realistic constraints solves unboundedness.",
    hint: "Add upper bounds on variables.",
    level: "intermediate",
    codeExample: "Add constraint: x ≤ 100, y ≤ 100\nBounding the feasible region"
  },
  {
    question: "What is the relationship between redundant constraints and slack?",
    shortAnswer: "Redundant constraints always have positive slack and never become binding.",
    explanation: "Since redundant constraints don't limit the feasible region, they always have positive slack at the optimal solution and throughout the feasible region.",
    hint: "Redundant = always has slack.",
    level: "intermediate",
    codeExample: "Redundant constraint: x + y ≤ 20\nAt optimal: x + y = 10, slack = 10"
  },
  {
    question: "What is the difference between degenerate and multiple optimal?",
    shortAnswer: "Degenerate means too many binding constraints at a point, while multiple optimal means the same Z value on an entire edge.",
    explanation: "Degeneracy is about the number of binding constraints at a point. Multiple optimal solutions are about the objective function being parallel to a constraint.",
    hint: "Degeneracy = constraints, Multiple = objective.",
    level: "advanced",
    codeExample: "Degenerate: 3 constraints at one point\nMultiple: Same Z along an edge"
  }
];

export default questions;