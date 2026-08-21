const questions = [
  {
    question: "What is a redundant constraint in LP?",
    shortAnswer: "A redundant constraint is a constraint that does not affect the feasible region or the optimal solution.",
    explanation: "Redundant constraints are always satisfied when the other constraints are satisfied. Removing them doesn't change the feasible region or the optimal solution.",
    hint: "Constraint that doesn't affect the solution.",
    level: "basic",
    codeExample: "Constraints: x + y ≤ 10, x ≤ 8 (redundant if x max is 5)"
  },
  {
    question: "How do you identify redundant constraints graphically?",
    shortAnswer: "Redundant constraints appear as lines that lie outside the feasible region or don't form part of its boundary.",
    explanation: "On a graph, if a constraint line doesn't touch the feasible region, it's redundant. The feasible region is unchanged if you remove that constraint line.",
    hint: "Line outside the feasible region.",
    level: "intermediate",
    codeExample: "Feasible region: x + y ≤ 10\nRedundant: x + y ≤ 20 (line beyond region)"
  },
  {
    question: "What is the difference between redundant and non-binding constraints?",
    shortAnswer: "Redundant constraints never affect the feasible region, while non-binding constraints don't affect the optimal solution but may affect the feasible region.",
    explanation: "A non-binding constraint is one that has slack at the optimal solution. A redundant constraint is one that doesn't affect the feasible region at all. A constraint can be non-binding but not redundant.",
    hint: "Redundant = never affects region, Non-binding = not optimal.",
    level: "intermediate",
    codeExample: "Non-binding: constraint with slack at optimum\nRedundant: constraint that never binds"
  },
  {
    question: "Can a redundant constraint become binding?",
    shortAnswer: "No, by definition, a redundant constraint can never become binding.",
    explanation: "A constraint is redundant because it doesn't affect the feasible region. It will never be binding, regardless of the objective function choice.",
    hint: "Redundant = never binding.",
    level: "intermediate",
    codeExample: "If constraint is redundant, it never limits the solution"
  },
  {
    question: "How do you prove a constraint is redundant algebraically?",
    shortAnswer: "Show that the constraint is implied by the other constraints using linear combinations.",
    explanation: "A constraint a₁x + a₂y ≤ b is redundant if it can be derived as a non-negative linear combination of other constraints.",
    hint: "Constraint is implied by others.",
    level: "advanced",
    codeExample: "From x ≤ 5 and y ≤ 3, derive x + y ≤ 8\nThen x + y ≤ 8 is redundant"
  },
  {
    question: "What is the role of redundant constraints in real-world problems?",
    shortAnswer: "Redundant constraints often represent safety margins, regulations, or historical requirements that don't limit the solution.",
    explanation: "In practice, redundant constraints may exist for legal reasons, safety requirements, or past constraints that are no longer binding. They're kept for context and documentation.",
    hint: "Safety, regulations, historical reasons.",
    level: "intermediate",
    codeExample: "Safety margin: production ≤ 100 (even if max is 80)\nHistorical: old constraints no longer needed"
  },
  {
    question: "Can non-negativity constraints be redundant?",
    shortAnswer: "Yes, non-negativity constraints can be redundant if the other constraints already force the variables to be positive.",
    explanation: "If other constraints (like x + y ≥ 5 with x, y ≥ 0) already ensure x > 0 and y > 0, the non-negativity constraints are redundant.",
    hint: "Other constraints may imply positivity.",
    level: "intermediate",
    codeExample: "x + y ≥ 5 and x, y ≥ 0\ny ≥ 0 is redundant if y must be positive"
  },
  {
    question: "What is the difference between redundant and dominated constraints?",
    shortAnswer: "A redundant constraint is implied by other constraints, while a dominated constraint is weaker than another constraint.",
    explanation: "A constraint is dominated if it's always less restrictive than another constraint. A constraint can be dominated without being redundant, and vice versa.",
    hint: "Dominated = weaker, Redundant = implied.",
    level: "advanced",
    codeExample: "x ≤ 10 is dominated by x ≤ 5\nx + y ≤ 10 is redundant if implied by others"
  },
  {
    question: "How does removing redundant constraints affect the simplex method?",
    shortAnswer: "Removing redundant constraints reduces the problem size and can improve computational efficiency.",
    explanation: "Redundant constraints increase the number of constraints without affecting the solution. Removing them reduces the size of the problem and can speed up the simplex method.",
    hint: "Fewer constraints = faster solution.",
    level: "advanced",
    codeExample: "Remove redundant constraints to reduce tableau size"
  },
  {
    question: "Can a redundant constraint become non-redundant if constraints are changed?",
    shortAnswer: "Yes, if other constraints are relaxed or removed, a previously redundant constraint may become non-redundant.",
    explanation: "Redundancy is relative to the set of constraints. If constraints are changed, a redundant constraint may become active and part of the feasible region.",
    hint: "Redundancy depends on the constraint set.",
    level: "intermediate",
    codeExample: "Original: x ≤ 5 (redundant if x max is 3)\nRemove other constraints → x ≤ 5 becomes active"
  },
  {
    question: "What is the relationship between redundant constraints and shadow prices?",
    shortAnswer: "Redundant constraints have zero shadow prices because they don't limit the solution.",
    explanation: "Shadow prices measure the value of relaxing constraints. Since redundant constraints don't affect the solution, their shadow prices are zero.",
    hint: "Shadow price = 0 for redundant constraints.",
    level: "advanced",
    codeExample: "Redundant constraint: shadow price = 0\nBinding constraint: shadow price may be > 0"
  },
  {
    question: "How do you identify redundant constraints in large problems?",
    shortAnswer: "Use computational methods like the simplex method or specialized redundancy detection algorithms.",
    explanation: "For large problems, graphical methods aren't practical. Use the simplex method to identify constraints that never enter the basis, or specialized algorithms for redundancy detection.",
    hint: "Use computational methods.",
    level: "advanced",
    codeExample: "Simplex method: constraints not in optimal basis may be redundant"
  },
  {
    question: "Can multiple constraints be redundant simultaneously?",
    shortAnswer: "Yes, multiple constraints can be redundant in the same problem.",
    explanation: "A problem can have several redundant constraints, especially in real-world applications where many constraints may have been added over time.",
    hint: "Multiple constraints can be redundant.",
    level: "intermediate",
    codeExample: "Three constraints all outside feasible region → All redundant"
  },
  {
    question: "What is the difference between redundant and unnecessary constraints?",
    shortAnswer: "Redundant constraints don't affect the solution, while unnecessary constraints may affect the solution but aren't needed for the problem.",
    explanation: "Unnecessary constraints might affect the solution but aren't essential. Redundant constraints specifically don't affect the feasible region at all.",
    hint: "Redundant = no effect, Unnecessary = may affect.",
    level: "intermediate",
    codeExample: "Redundant: x ≤ 100 (if max x is 50)\nUnnecessary: x ≤ 80 (affects solution but not essential)"
  },
  {
    question: "How do you test if a constraint is redundant in a maximization problem?",
    shortAnswer: "Check if removing the constraint changes the optimal solution or feasible region.",
    explanation: "Remove the constraint and solve the problem again. If the optimal solution and feasible region remain unchanged, the constraint is redundant.",
    hint: "Test by removing the constraint.",
    level: "intermediate",
    codeExample: "Remove constraint → Same optimal solution → Redundant"
  },
  {
    question: "Can a redundant constraint affect sensitivity analysis?",
    shortAnswer: "No, redundant constraints don't affect sensitivity analysis because they don't limit the solution.",
    explanation: "Since redundant constraints don't affect the feasible region or optimal solution, they don't appear in sensitivity analysis results.",
    hint: "No effect on sensitivity analysis.",
    level: "advanced",
    codeExample: "Redundant constraints: no effect on allowable ranges"
  },
  {
    question: "What is the relationship between redundant constraints and the feasible region?",
    shortAnswer: "Redundant constraints don't change the feasible region - removing them leaves the region unchanged.",
    explanation: "The feasible region is defined by the active constraints. Redundant constraints lie outside or beyond the feasible region, so they don't affect its shape or size.",
    hint: "No change to feasible region.",
    level: "intermediate",
    codeExample: "Feasible region same with or without redundant constraint"
  },
  {
    question: "Can a constraint be redundant in one direction but not another?",
    shortAnswer: "Yes, a constraint might be redundant for maximization but not for minimization, or vice versa.",
    explanation: "A constraint's redundancy depends on the objective direction. For example, an upper bound might be redundant for maximization if the objective decreases, but become binding for minimization.",
    hint: "Direction matters for redundancy.",
    level: "advanced",
    codeExample: "Max Z = -x (x ≤ 5 is redundant if Z decreases with x)\nMin Z = -x (x ≤ 5 may be binding)"
  },
  {
    question: "How do you handle redundant constraints in the simplex method?",
    shortAnswer: "The simplex method naturally handles redundant constraints - they just don't enter the optimal basis.",
    explanation: "In the simplex method, redundant constraints will have zero reduced costs and won't enter the basis. They can be identified and removed to improve efficiency.",
    hint: "Simplex handles redundancy automatically.",
    level: "advanced",
    codeExample: "Redundant constraints: never enter the basis\nCan be identified and removed"
  },
  {
    question: "What is the connection between redundant constraints and problem formulation?",
    shortAnswer: "Redundant constraints often indicate over-specification or unnecessary restrictions in the problem formulation.",
    explanation: "Redundancy suggests that some constraints were added unnecessarily. Identifying them can help simplify and improve the problem formulation.",
    hint: "Over-specification leads to redundancy.",
    level: "intermediate",
    codeExample: "Too many constraints → Redundancy → Simplify formulation"
  },
  {
    question: "Can redundant constraints be useful despite being redundant?",
    shortAnswer: "Yes, redundant constraints can be useful for documentation, safety, and regulatory compliance.",
    explanation: "Even if mathematically redundant, constraints may represent important real-world considerations like safety margins, legal requirements, or historical decisions.",
    hint: "Useful for context and compliance.",
    level: "intermediate",
    codeExample: "Safety constraint: even if redundant, keep for safety"
  }
];

export default questions;