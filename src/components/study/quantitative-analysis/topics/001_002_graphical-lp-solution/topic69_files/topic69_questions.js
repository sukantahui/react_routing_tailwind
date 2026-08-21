const questions = [
  {
    question: "What is an infeasible solution in LP?",
    shortAnswer: "An infeasible solution occurs when no point satisfies all constraints simultaneously.",
    explanation: "Infeasibility means the feasible region is empty. The constraints are contradictory, and there is no solution to the optimization problem.",
    hint: "No point satisfies all constraints.",
    level: "basic",
    codeExample: "Constraints: x + y ≤ 5 and x + y ≥ 8\nNo solution exists → Infeasible"
  },
  {
    question: "What causes infeasibility in LP problems?",
    shortAnswer: "Infeasibility is caused by contradictory constraints, requirements exceeding resources, or conflicting upper and lower bounds.",
    explanation: "Common causes include: constraints that directly conflict, resource constraints that are too tight to meet requirements, and inconsistent variable bounds.",
    hint: "Contradictory constraints or insufficient resources.",
    level: "intermediate",
    codeExample: "x ≤ 5 and x ≥ 8 → Contradictory\nResource < Requirement → Infeasible"
  },
  {
    question: "How do you identify infeasibility graphically?",
    shortAnswer: "Infeasibility appears as no overlapping region where all constraints are satisfied.",
    explanation: "On a graph, the feasible regions of individual constraints don't intersect. The constraint regions are completely separated, leaving no common area.",
    hint: "No overlap of constraint regions.",
    level: "intermediate",
    codeExample: "Constraint 1: x + y ≤ 5 (region below line)\nConstraint 2: x + y ≥ 8 (region above line)\nNo overlap → Infeasible"
  },
  {
    question: "What is the difference between infeasible and unbounded?",
    shortAnswer: "Infeasible means no solution exists, while unbounded means a solution exists but no finite optimum.",
    explanation: "Infeasible: empty feasible region. Unbounded: non-empty feasible region where objective can improve indefinitely without bound.",
    hint: "No solution vs. infinite solution.",
    level: "basic",
    codeExample: "Infeasible: x ≤ 2 and x ≥ 3\nUnbounded: Max Z = x, x ≥ 0"
  },
  {
    question: "How do you fix an infeasible LP problem?",
    shortAnswer: "Relax constraints, remove conflicting constraints, or reformulate the problem.",
    explanation: "Solutions include: relaxing one or more constraints, identifying and removing contradictory constraints, adding new variables, or reconsidering the problem formulation.",
    hint: "Make constraints less restrictive.",
    level: "intermediate",
    codeExample: "Instead of x + y ≤ 5 and x + y ≥ 8\nRelax to x + y ≤ 7 and x + y ≥ 6"
  },
  {
    question: "Can infeasibility occur with only two constraints?",
    shortAnswer: "Yes, infeasibility can occur with just two constraints if they are contradictory.",
    explanation: "Even two constraints can be infeasible. For example, x ≤ 5 and x ≥ 8 are contradictory and have no solution.",
    hint: "Two constraints can be contradictory.",
    level: "basic",
    codeExample: "x ≤ 5 and x ≥ 8 → Infeasible (2 constraints)"
  },
  {
    question: "What is the role of non-negativity constraints in infeasibility?",
    shortAnswer: "Non-negativity constraints can contribute to infeasibility when they conflict with other constraints.",
    explanation: "If constraints require negative values to be satisfied, non-negativity (x ≥ 0, y ≥ 0) can make the problem infeasible.",
    hint: "Non-negativity can create infeasibility.",
    level: "intermediate",
    codeExample: "2x + y ≤ -5 and x, y ≥ 0\nNo solution because LHS ≥ 0 for all x, y ≥ 0"
  },
  {
    question: "How does the simplex method identify infeasibility?",
    shortAnswer: "The simplex method identifies infeasibility when artificial variables remain in the basis at the end of Phase I.",
    explanation: "In the two-phase simplex method, if any artificial variable has a positive value at the end of Phase I, the problem is infeasible.",
    hint: "Artificial variables in basis = infeasible.",
    level: "advanced",
    codeExample: "Phase I: minimize sum of artificial variables\nIf minimum > 0 → Infeasible"
  },
  {
    question: "What is the difference between infeasible and degenerate?",
    shortAnswer: "Infeasible means no solution exists, while degenerate means too many constraints are binding at a solution.",
    explanation: "Infeasible: empty feasible region. Degenerate: feasible region exists but has more binding constraints than necessary at a corner point.",
    hint: "No solution vs. special solution.",
    level: "intermediate",
    codeExample: "Infeasible: no point satisfies constraints\nDegenerate: feasible point with 3+ binding constraints"
  },
  {
    question: "Can infeasibility be detected before solving?",
    shortAnswer: "Yes, by checking for obvious contradictions or using constraint analysis.",
    explanation: "Look for: constraints that directly contradict, sums of constraints that create impossible conditions, or resource requirements that exceed availability.",
    hint: "Check for contradictions early.",
    level: "intermediate",
    codeExample: "x + y ≤ 5 and x + y ≥ 8 → Immediate detection"
  },
  {
    question: "What is a Phase I problem in the context of infeasibility?",
    shortAnswer: "Phase I of the simplex method is used to find a feasible solution or prove that the problem is infeasible.",
    explanation: "In Phase I, artificial variables are added and minimized. If the minimum is zero, a feasible solution exists. If positive, the problem is infeasible.",
    hint: "Phase I finds feasibility.",
    level: "advanced",
    codeExample: "Minimize sum of artificial variables\nIf optimal value = 0 → Feasible\nIf optimal value > 0 → Infeasible"
  },
  {
    question: "What is the practical implication of infeasibility?",
    shortAnswer: "Infeasibility indicates that the problem is over-constrained and the requirements are unrealistic.",
    explanation: "In real-world applications, infeasibility means the goals are not achievable with the given resources. Decision-makers need to either increase resources or reduce requirements.",
    hint: "Reality check: goals vs. resources.",
    level: "intermediate",
    codeExample: "Cannot meet demand with current capacity\n→ Need more capacity or lower demand"
  },
  {
    question: "How do you choose which constraint to relax in an infeasible problem?",
    shortAnswer: "Relax the constraint that requires the smallest change to achieve feasibility.",
    explanation: "Identify which constraint, when relaxed, would create a feasible region with the minimum change. This often involves analyzing the dual variables or using sensitivity analysis.",
    hint: "Minimum relaxation needed.",
    level: "advanced",
    codeExample: "Constraint A needs 2 units relaxation\nConstraint B needs 5 units relaxation\n→ Relax Constraint A"
  },
  {
    question: "Can infeasibility occur in transportation problems?",
    shortAnswer: "Yes, transportation problems can be infeasible when supply cannot meet demand.",
    explanation: "In transportation problems, infeasibility occurs when total supply is less than total demand, or when specific routes are impossible.",
    hint: "Supply < Demand → Infeasible.",
    level: "intermediate",
    codeExample: "Total supply: 100 units\nTotal demand: 150 units\nInfeasible transportation problem"
  },
  {
    question: "What is the relationship between infeasibility and artificial variables?",
    shortAnswer: "Artificial variables are added to find a feasible solution; if they remain positive, the problem is infeasible.",
    explanation: "Artificial variables allow the simplex method to start from a basic feasible solution. Their presence indicates constraints that can't be satisfied naturally.",
    hint: "Artificial variables detect infeasibility.",
    level: "advanced",
    codeExample: "Artificial variable x₃ = 0.5 at optimal → Infeasible"
  },
  {
    question: "Can changing the objective function make an infeasible problem feasible?",
    shortAnswer: "No, changing the objective function doesn't affect feasibility - only constraints determine feasibility.",
    explanation: "Feasibility is determined solely by the constraints. Changing the objective function doesn't change the feasible region, so it cannot fix infeasibility.",
    hint: "Objective doesn't affect feasibility.",
    level: "intermediate",
    codeExample: "Constraints: x + y ≤ 5, x + y ≥ 8\nInfeasible regardless of objective"
  },
  {
    question: "What is the difference between infeasible and impractical?",
    shortAnswer: "Infeasible means mathematically impossible, while impractical means possible but not recommended.",
    explanation: "Infeasible: no solution exists. Impractical: a solution exists but is not realistic or advisable due to other considerations.",
    hint: "Mathematically impossible vs. not recommended.",
    level: "intermediate",
    codeExample: "Infeasible: x + y ≤ 5 and x + y ≥ 8\nImpractical: x = 0, y = 1000 (possible but not recommended)"
  },
  {
    question: "How does the Big M method handle infeasibility?",
    shortAnswer: "The Big M method will converge to a solution with artificial variables in the basis, indicating infeasibility.",
    explanation: "In the Big M method, artificial variables have a large penalty coefficient M. If the optimal solution has artificial variables > 0, the problem is infeasible.",
    hint: "Artificial variables > 0 = infeasible.",
    level: "advanced",
    codeExample: "Minimize Z = cᵀx + M∑(artificial variables)\nIf artificial variables > 0 at optimal → Infeasible"
  },
  {
    question: "Can infeasibility be fixed by adding more variables?",
    shortAnswer: "Sometimes, adding variables can create feasibility, but the original constraints may still be inconsistent.",
    explanation: "Adding variables increases the dimension of the solution space, which can sometimes create feasibility. However, the constraints themselves may still be contradictory.",
    hint: "More variables may help.",
    level: "advanced",
    codeExample: "Add slack/surplus variables to convert inequalities to equalities\nMay reveal feasibility"
  },
  {
    question: "What is the role of slack variables in detecting infeasibility?",
    shortAnswer: "Slack variables help convert inequalities to equalities, revealing if constraints can be satisfied.",
    explanation: "When slack variables are added, infeasibility becomes apparent when artificial variables must be added. If artificial variables are needed, the problem is infeasible.",
    hint: "Slack variables help detect infeasibility.",
    level: "advanced",
    codeExample: "2x + y ≤ 5 → 2x + y + s = 5\nIf no non-negative solution for x, y, s exists → Infeasible"
  },
  {
    question: "Can an infeasible problem have an optimal solution?",
    shortAnswer: "No, an infeasible problem has no feasible solution, so it cannot have an optimal solution.",
    explanation: "Optimality requires feasibility. If there are no feasible points, there's nothing to optimize. The problem has no solution.",
    hint: "No feasible solution = no optimal solution.",
    level: "basic",
    codeExample: "Infeasible: no solution at all\nTherefore, no optimal solution exists"
  },
  {
    question: "What is the difference between infeasible and over-constrained?",
    shortAnswer: "They are essentially the same concept - having too many constraints that cannot all be satisfied.",
    explanation: "An over-constrained problem has more constraints than necessary, leading to inconsistency and infeasibility.",
    hint: "Too many constraints = infeasible.",
    level: "intermediate",
    codeExample: "Too many constraints with no common solution\n→ Over-constrained → Infeasible"
  },
  {
    question: "How do you prove a problem is infeasible?",
    shortAnswer: "Show that the constraints cannot be satisfied simultaneously, often by deriving a contradiction.",
    explanation: "To prove infeasibility, you can: 1) Find contradictory constraints, 2) Use the sum of constraints to create an impossible condition, or 3) Show the feasible region is empty.",
    hint: "Derive a contradiction from constraints.",
    level: "advanced",
    codeExample: "From x + y ≤ 5 and x + y ≥ 8\nAdd: 10 ≤ 2(x+y) ≤ 10 → contradiction"
  },
  {
    question: "What is the relationship between infeasibility and the Farkas lemma?",
    shortAnswer: "Farkas lemma provides conditions for infeasibility of linear systems, stating that exactly one of two alternatives holds.",
    explanation: "Farkas lemma states that either the system Ax ≤ b has a solution, or there exists y ≥ 0 such that Aᵀy = 0 and bᵀy < 0, providing a certificate of infeasibility.",
    hint: "Farkas lemma proves infeasibility.",
    level: "advanced",
    codeExample: "If ∃ y ≥ 0 with Aᵀy = 0, bᵀy < 0\n→ System Ax ≤ b is infeasible"
  },
  {
    question: "Can infeasibility be caused by numerical issues?",
    shortAnswer: "While rare, numerical issues can sometimes make a feasible problem appear infeasible.",
    explanation: "Rounding errors or numerical instability in algorithms can cause a feasible problem to be misclassified as infeasible. Using exact arithmetic can help avoid this.",
    hint: "Numerical precision matters.",
    level: "advanced",
    codeExample: "Using decimals might show infeasibility\nExact fractions show feasibility"
  }
];

export default questions;