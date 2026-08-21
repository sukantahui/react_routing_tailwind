const questions = [
  {
    question: "What is a redundant constraint?",
    shortAnswer: "A constraint that does not affect the feasible region or optimal solution.",
    explanation: "Redundant constraints are always satisfied when other constraints are met. They can be removed without changing the solution.",
    hint: "Constraint that doesn't matter.",
    level: "basic",
    codeExample: "x ≤ 8 is redundant if the feasible region already ensures x ≤ 8"
  },
  {
    question: "How do you identify a redundant constraint graphically?",
    shortAnswer: "If a constraint line never touches the feasible region boundary, it's redundant.",
    explanation: "On a graph, redundant constraints are lines that lie outside or beyond the feasible region. They don't form part of the region's boundary.",
    hint: "Line outside the feasible region.",
    level: "intermediate",
    codeExample: "Feasible region: x + y ≤ 10, Redundant: x + y ≤ 20"
  },
  {
    question: "What is an essential constraint?",
    shortAnswer: "A constraint that forms part of the feasible region boundary and affects the solution.",
    explanation: "Essential constraints are necessary to define the feasible region. Removing them changes the region and potentially the optimal solution.",
    hint: "Constraint that matters.",
    level: "basic",
    codeExample: "x + y ≤ 10 is essential if it defines part of the feasible region"
  },
  {
    question: "Can a constraint be redundant for one objective but essential for another?",
    shortAnswer: "Yes, redundancy depends on the objective function direction.",
    explanation: "A constraint might be redundant when maximizing one objective but become binding when minimizing another objective.",
    hint: "Depends on what you're optimizing.",
    level: "advanced",
    codeExample: "x ≤ 5 might be redundant for maximizing x but essential for minimizing x"
  },
  {
    question: "How do you algebraically verify redundancy?",
    shortAnswer: "Check if the constraint is implied by a linear combination of other constraints.",
    explanation: "If a constraint can be derived from other constraints using non-negative coefficients, it's redundant.",
    hint: "Constraint is implied by others.",
    level: "advanced",
    codeExample: "From x ≤ 5 and y ≤ 3, derive x + y ≤ 8, then x + y ≤ 8 is redundant"
  },
  {
    question: "What is the difference between redundant and non-binding?",
    shortAnswer: "Redundant never affects the region; non-binding doesn't affect the optimal solution but may affect the region.",
    explanation: "A non-binding constraint has slack at the optimal solution but still forms part of the feasible region elsewhere. A redundant constraint doesn't affect the region at all.",
    hint: "Non-binding ≠ redundant.",
    level: "intermediate",
    codeExample: "Non-binding: constraint with slack at optimum, Redundant: constraint that never binds"
  },
  {
    question: "How do you identify redundant constraints algebraically?",
    shortAnswer: "Check if the constraint is never binding at any corner point of the feasible region.",
    explanation: "Find all corner points of the feasible region. If none of them satisfy the constraint as an equality, the constraint is redundant.",
    hint: "Test all corner points.",
    level: "advanced",
    codeExample: "If no corner point lies on x = 8, then x ≤ 8 is redundant"
  },
  {
    question: "What happens if you remove a redundant constraint?",
    shortAnswer: "The feasible region and optimal solution remain unchanged.",
    explanation: "Since the constraint doesn't affect the region, removing it doesn't change the set of feasible solutions or the optimal solution.",
    hint: "No change to solution.",
    level: "intermediate",
    codeExample: "Remove x ≤ 8, optimal solution remains the same"
  },
  {
    question: "Why is it important to identify redundant constraints?",
    shortAnswer: "It simplifies the problem and reduces computational effort.",
    explanation: "Removing redundant constraints makes the problem easier to solve and understand. It also reduces the complexity of the simplex method.",
    hint: "Simplify and reduce effort.",
    level: "intermediate",
    codeExample: "Fewer constraints = faster solution"
  },
  {
    question: "Can a redundant constraint become essential?",
    shortAnswer: "Yes, if other constraints are changed or removed.",
    explanation: "Redundancy depends on the full set of constraints. If other constraints are relaxed or removed, a previously redundant constraint may become essential.",
    hint: "Redundancy depends on other constraints.",
    level: "advanced",
    codeExample: "Remove other constraints → Redundant becomes essential"
  },
  {
    question: "What is a dominated constraint?",
    shortAnswer: "A constraint that is always less restrictive than another constraint.",
    explanation: "If constraint A is weaker than constraint B (A's feasible region contains B's region), A is dominated and redundant.",
    hint: "Weaker than another constraint.",
    level: "advanced",
    codeExample: "x ≤ 10 is dominated by x ≤ 5"
  },
  {
    question: "How do you identify dominated constraints?",
    shortAnswer: "Compare the restrictions imposed by different constraints.",
    explanation: "If one constraint is always looser than another for all feasible values, the looser constraint is dominated and redundant.",
    hint: "Compare constraint tightness.",
    level: "advanced",
    codeExample: "x ≤ 10 is looser than x ≤ 5 → x ≤ 10 is dominated"
  },
  {
    question: "What is the difference between redundant and inactive constraints?",
    shortAnswer: "Redundant never affects the region; inactive doesn't affect the current optimal solution.",
    explanation: "Inactive constraints may become binding for different objectives. Redundant constraints are never binding for any objective.",
    hint: "Inactive may become active, redundant never.",
    level: "intermediate",
    codeExample: "Inactive: constraint with slack at current optimum, Redundant: never binds"
  },
  {
    question: "How do you prove a constraint is redundant using corner points?",
    shortAnswer: "Show that the constraint is not binding at any corner point of the feasible region.",
    explanation: "If the constraint is not satisfied as an equality at any corner point, it's redundant. All corner points are strictly inside the constraint.",
    hint: "Check all corner points.",
    level: "advanced",
    codeExample: "If all corner points have x < 8, then x ≤ 8 is redundant"
  },
  {
    question: "What is the role of redundant constraints in real-world problems?",
    shortAnswer: "They may represent safety margins, legal requirements, or historical constraints.",
    explanation: "Even if mathematically redundant, constraints may have practical importance for safety, compliance, or organizational reasons.",
    hint: "Practical importance beyond math.",
    level: "intermediate",
    codeExample: "Safety buffer constraints may be redundant but important"
  }
];

export default questions;