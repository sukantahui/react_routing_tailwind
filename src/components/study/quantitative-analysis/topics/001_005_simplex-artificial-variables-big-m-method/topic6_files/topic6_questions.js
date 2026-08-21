const questions = [
  {
    question: "What is the entering variable in the Simplex Method?",
    shortAnswer: "The non-basic variable that enters the basis to improve the objective value.",
    explanation: "The entering variable is chosen based on the most negative coefficient in the Z row (for maximization). It will increase the objective value.",
    hint: "Variable that enters the basis.",
    level: "intermediate",
    codeExample: "Z row: [-3, -2, 0, 0] → x enters (most negative: -3)"
  },
  {
    question: "What is the leaving variable in the Simplex Method?",
    shortAnswer: "The basic variable that leaves the basis to maintain feasibility.",
    explanation: "The leaving variable is chosen using the minimum ratio test. It ensures the solution remains feasible after the pivot operation.",
    hint: "Variable that leaves the basis.",
    level: "intermediate",
    codeExample: "Min ratio: 10/2=5, 8/1=8 → s₁ leaves (min ratio: 5)"
  },
  {
    question: "How do you choose the entering variable?",
    shortAnswer: "Choose the variable with the most negative coefficient in the Z row (for maximization).",
    explanation: "The most negative coefficient indicates the greatest potential improvement in the objective function per unit increase.",
    hint: "Most negative Z coefficient.",
    level: "basic",
    codeExample: "Z row: [-5, -3, 0, 0] → x enters (-5 is most negative)"
  },
  {
    question: "How do you choose the leaving variable?",
    shortAnswer: "Use the minimum ratio test: RHS / coefficient in entering column, choose smallest positive ratio.",
    explanation: "For each row with a positive coefficient in the entering column, compute RHS/coefficient. The row with the smallest ratio leaves the basis.",
    hint: "Minimum ratio test.",
    level: "intermediate",
    codeExample: "Row 1: 10/2=5, Row 2: 8/1=8 → Row 1 leaves"
  },
  {
    question: "What is the pivot element?",
    shortAnswer: "The intersection of the entering column and leaving row.",
    explanation: "The pivot element is used in row operations to transform the tableau. It must be positive.",
    hint: "Intersection of entering column and leaving row.",
    level: "intermediate",
    codeExample: "If x enters and s₁ leaves, pivot = coefficient in s₁ row, x column"
  },
  {
    question: "What happens if there is a tie in the ratio test?",
    shortAnswer: "Either row can be chosen (tie-breaking rule needed).",
    explanation: "Ties may lead to degeneracy. Use a consistent rule like choosing the first row or using Bland's rule.",
    hint: "Tie-breaking needed.",
    level: "advanced",
    codeExample: "Row 1: 10/2=5, Row 2: 20/4=5 → tie"
  },
  {
    question: "What if all coefficients in the entering column are negative?",
    shortAnswer: "The problem is unbounded (no finite optimal solution).",
    explanation: "If all coefficients are negative, the entering variable can increase indefinitely without violating constraints, leading to an unbounded solution.",
    hint: "All negative → unbounded.",
    level: "advanced",
    codeExample: "Entering column: [-2, -3, -1] → unbounded"
  },
  {
    question: "What if there are no negative coefficients in the Z row?",
    shortAnswer: "The current solution is optimal.",
    explanation: "For maximization, if all Z row coefficients are ≥ 0, the current basic feasible solution is optimal.",
    hint: "No negatives → optimal.",
    level: "intermediate",
    codeExample: "Z row: [0, 2, 3, 0] → optimal"
  },
  {
    question: "What is the ratio test used for?",
    shortAnswer: "To determine which variable leaves the basis.",
    explanation: "The ratio test ensures that the new solution remains feasible by finding the tightest constraint on the entering variable.",
    hint: "Determines leaving variable.",
    level: "intermediate",
    codeExample: "RHS / coefficient in entering column"
  },
  {
    question: "Why must the pivot element be positive?",
    shortAnswer: "To maintain feasibility of the basic solution.",
    explanation: "A positive pivot ensures that the ratio test gives a valid leaving variable and the new solution remains non-negative.",
    hint: "Positive for feasibility.",
    level: "advanced",
    codeExample: "Pivot = 2 (positive) → valid"
  },
  {
    question: "What is the difference between entering and leaving variables?",
    shortAnswer: "Entering goes from non-basic to basic; leaving goes from basic to non-basic.",
    explanation: "Entering variable increases from 0 to positive; leaving variable decreases from positive to 0.",
    hint: "Non-basic → basic vs. basic → non-basic.",
    level: "intermediate",
    codeExample: "x enters (non-basic → basic), s₁ leaves (basic → non-basic)"
  },
  {
    question: "How does the entering variable affect the objective value?",
    shortAnswer: "It increases the objective value (for maximization).",
    explanation: "The entering variable has a negative coefficient in the Z row, so increasing it improves (increases) the objective value.",
    hint: "Improves Z value.",
    level: "intermediate",
    codeExample: "x coefficient: -3 → increasing x by 1 increases Z by 3"
  },
  {
    question: "What is Bland's rule?",
    shortAnswer: "A tie-breaking rule that chooses the smallest index variable.",
    explanation: "Bland's rule prevents cycling in degenerate cases by always choosing the smallest-index entering and leaving variable.",
    hint: "Smallest index tie-breaking.",
    level: "advanced",
    codeExample: "Among ties, choose variable with smallest index"
  },
  {
    question: "What is degeneracy in the Simplex Method?",
    shortAnswer: "A situation where a basic variable has value 0.",
    explanation: "Degeneracy occurs when the ratio test gives a tie or a basic variable becomes zero. It can cause cycling in the Simplex Method.",
    hint: "Basic variable = 0.",
    level: "advanced",
    codeExample: "s₁ = 0 at optimal → degenerate"
  },
  {
    question: "How do you choose the entering variable in minimization?",
    shortAnswer: "Choose the variable with the most positive coefficient in the Z row.",
    explanation: "For minimization, we want to reduce the objective value. The most positive coefficient indicates the greatest potential reduction.",
    hint: "Most positive for minimization.",
    level: "advanced",
    codeExample: "Z row: [3, 2, 0, 0] → x enters (3 is most positive)"
  },
  {
    question: "What is the role of the pivot operation?",
    shortAnswer: "To transform the tableau and exchange the entering and leaving variables.",
    explanation: "The pivot operation uses row operations to make the pivot element 1 and all other entries in the pivot column 0.",
    hint: "Exchange variables via row operations.",
    level: "advanced",
    codeExample: "Make pivot = 1, column = identity"
  },
  {
    question: "Can a variable enter and leave in the same iteration?",
    shortAnswer: "No, a variable cannot both enter and leave in the same iteration.",
    explanation: "The entering variable becomes basic and the leaving variable becomes non-basic. They exchange places.",
    hint: "Exchange, not both.",
    level: "intermediate",
    codeExample: "x enters, s₁ leaves (exchange)"
  }
];

export default questions;