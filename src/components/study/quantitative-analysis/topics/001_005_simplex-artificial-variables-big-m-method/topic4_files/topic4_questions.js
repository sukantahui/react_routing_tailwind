const questions = [
  {
    question: "What is an artificial variable?",
    shortAnswer: "A temporary variable added to ≥ and = constraints to create an initial basic feasible solution.",
    explanation: "Artificial variables are not part of the original problem. They are used to get the Simplex Method started and must be driven to zero in the optimal solution.",
    hint: "Temporary variables for feasibility.",
    level: "basic",
    codeExample: "x + y ≥ 6 → x + y - s + a = 6, a ≥ 0"
  },
  {
    question: "Why are artificial variables needed?",
    shortAnswer: "To create an initial basic feasible solution for ≥ and = constraints.",
    explanation: "Surplus variables alone don't provide a feasible starting point. Artificial variables give us a basis to begin the Simplex Method.",
    hint: "Need feasible starting solution.",
    level: "intermediate",
    codeExample: "x + y - s = 6 → with x=0,y=0, s=-6 (infeasible)"
  },
  {
    question: "What is the Big-M Method?",
    shortAnswer: "A method that penalizes artificial variables with a large number M in the objective.",
    explanation: "M is a very large positive number. In minimization, we add M × artificial variable to the objective. This forces artificial variables to zero.",
    hint: "Penalty method with large M.",
    level: "advanced",
    codeExample: "Min Z = c₁x + c₂y + M a₁ + M a₂"
  },
  {
    question: "What is the Two-Phase Method?",
    shortAnswer: "A method that solves the problem in two phases: Phase 1 minimizes artificials, Phase 2 optimizes the original objective.",
    explanation: "Phase 1: Minimize sum of artificial variables. Phase 2: Use original objective with feasible solution from Phase 1.",
    hint: "Two-phase approach.",
    level: "advanced",
    codeExample: "Phase 1: Min W = a₁ + a₂, Phase 2: Min Z = c₁x + c₂y"
  },
  {
    question: "What happens if an artificial variable remains in the optimal solution?",
    shortAnswer: "The problem is infeasible.",
    explanation: "If any artificial variable has a positive value at the end, the original problem has no feasible solution.",
    hint: "Artificial > 0 → infeasible.",
    level: "advanced",
    codeExample: "a₁ = 5 at optimal → infeasible problem"
  },
  {
    question: "What constraints require artificial variables?",
    shortAnswer: "≥ constraints and = constraints.",
    explanation: "≤ constraints use slack variables and have a natural feasible solution. ≥ and = constraints need artificial variables to get started.",
    hint: "≥ and = constraints.",
    level: "intermediate",
    codeExample: "≥ constraints: add surplus + artificial, = constraints: add artificial"
  },
  {
    question: "What is the difference between artificial and surplus variables?",
    shortAnswer: "Artificial variables are temporary and penalized; surplus variables are part of the problem.",
    explanation: "Surplus variables represent excess over requirements. Artificial variables are only for computational purposes and must be driven to zero.",
    hint: "Temporary vs. permanent.",
    level: "intermediate",
    codeExample: "Surplus: s ≥ 0 (real), Artificial: a ≥ 0 (temporary)"
  },
  {
    question: "How do you penalize artificial variables in maximization?",
    shortAnswer: "Subtract M × artificial variable from the objective.",
    explanation: "In maximization, we use -M a to penalize artificial variables. M is a very large number.",
    hint: "Subtract M for maximization.",
    level: "advanced",
    codeExample: "Max Z = c₁x + c₂y - M a₁ - M a₂"
  },
  {
    question: "How do you penalize artificial variables in minimization?",
    shortAnswer: "Add M × artificial variable to the objective.",
    explanation: "In minimization, we use +M a to penalize artificial variables. M is a very large number.",
    hint: "Add M for minimization.",
    level: "advanced",
    codeExample: "Min Z = c₁x + c₂y + M a₁ + M a₂"
  },
  {
    question: "What is the role of M in the Big-M Method?",
    shortAnswer: "M is a very large penalty that forces artificial variables to zero.",
    explanation: "M must be larger than any other coefficient in the problem. It ensures artificial variables are driven to zero in the optimal solution.",
    hint: "Large penalty value.",
    level: "advanced",
    codeExample: "M = 1,000,000 (much larger than other coefficients)"
  },
  {
    question: "What is the Phase 1 objective in the Two-Phase Method?",
    shortAnswer: "Minimize the sum of all artificial variables.",
    explanation: "Phase 1 objective: Min W = a₁ + a₂ + ... + aₙ. The goal is to drive all artificial variables to zero.",
    hint: "Minimize sum of artificials.",
    level: "advanced",
    codeExample: "Min W = a₁ + a₂ + a₃"
  },
  {
    question: "What is the Phase 2 objective in the Two-Phase Method?",
    shortAnswer: "Use the original objective function.",
    explanation: "After Phase 1 gives a feasible solution, Phase 2 optimizes the original objective without artificial variables.",
    hint: "Original objective.",
    level: "advanced",
    codeExample: "Min Z = c₁x + c₂y"
  },
  {
    question: "Why can't we just use slack variables for all constraints?",
    shortAnswer: "Slack variables don't work for ≥ and = constraints.",
    explanation: "Slack variables are added to ≤ constraints. For ≥ and = constraints, we need different treatment (surplus and artificial variables).",
    hint: "Only for ≤ constraints.",
    level: "intermediate",
    codeExample: "Slack: for ≤ only, Surplus: for ≥, Artificial: for ≥ and ="
  },
  {
    question: "What is the difference between Big-M and Two-Phase methods?",
    shortAnswer: "Big-M uses a penalty in one phase; Two-Phase uses two phases without penalty.",
    explanation: "Big-M has numerical issues with large M. Two-Phase avoids this by separating feasibility (Phase 1) and optimality (Phase 2).",
    hint: "One phase vs. two phases.",
    level: "advanced",
    codeExample: "Big-M: one tableau, Two-Phase: two tableaus"
  },
  {
    question: "Can artificial variables be used for ≤ constraints?",
    shortAnswer: "No, they are only needed for ≥ and = constraints.",
    explanation: "≤ constraints already have a natural feasible solution with slack variables. Artificial variables are unnecessary.",
    hint: "Only for ≥ and =.",
    level: "intermediate",
    codeExample: "≤ constraints → slack only"
  },
  {
    question: "What does it mean if Phase 1 W > 0?",
    shortAnswer: "The original problem is infeasible.",
    explanation: "If the minimum sum of artificial variables is greater than zero, at least one artificial variable remains positive, meaning no feasible solution exists.",
    hint: "W > 0 → infeasible.",
    level: "advanced",
    codeExample: "W = 5 > 0 → infeasible problem"
  },
  {
    question: "What does it mean if Phase 1 W = 0?",
    shortAnswer: "A feasible solution exists for the original problem.",
    explanation: "When all artificial variables are zero, we have a feasible solution. Phase 2 can then find the optimal solution.",
    hint: "W = 0 → feasible.",
    level: "advanced",
    codeExample: "W = 0 → proceed to Phase 2"
  },
  {
    question: "Why do we need to penalize artificial variables?",
    shortAnswer: "To ensure they are driven to zero in the optimal solution.",
    explanation: "Without penalty, artificial variables could remain positive and give an invalid solution. The penalty forces them out of the basis.",
    hint: "Force to zero.",
    level: "intermediate",
    codeExample: "Penalty drives artificials to zero"
  }
];

export default questions;