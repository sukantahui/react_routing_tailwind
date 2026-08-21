const questions = [
  {
    question: "What is a pivot element in the Simplex Method?",
    shortAnswer: "The element at the intersection of the entering column and leaving row.",
    explanation: "The pivot element is the key number used to transform the tableau. It must be positive and is used in row operations to exchange variables.",
    hint: "Intersection of entering column and leaving row.",
    level: "intermediate",
    codeExample: "Pivot = 2 at (s₁, x) in the tableau"
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
    question: "How do you find the pivot element?",
    shortAnswer: "Find entering variable (most negative Z), then leaving variable (min ratio), pivot is at their intersection.",
    explanation: "Step 1: Entering variable from Z row. Step 2: Leaving variable from ratio test. Step 3: Pivot is coefficient at intersection.",
    hint: "Entering column + leaving row.",
    level: "intermediate",
    codeExample: "Pivot = 2 at row s₁, column x"
  },
  {
    question: "What is the first step in a pivot operation?",
    shortAnswer: "Divide the pivot row by the pivot element to make it 1.",
    explanation: "Normalizing the pivot row makes the pivot element 1, which simplifies subsequent row operations.",
    hint: "Make pivot = 1.",
    level: "intermediate",
    codeExample: "Row ÷ pivot → pivot becomes 1"
  },
  {
    question: "What is the second step in a pivot operation?",
    shortAnswer: "Eliminate the pivot column in all other rows.",
    explanation: "Use row operations to make all other entries in the pivot column zero, creating an identity column.",
    hint: "Make pivot column identity.",
    level: "intermediate",
    codeExample: "Row = Row - (coeff) × Pivot Row"
  },
  {
    question: "What happens to the Z row during a pivot operation?",
    shortAnswer: "The Z row is updated using the same row operation.",
    explanation: "Apply the same elimination operation to the Z row to maintain the relationship between variables and the objective.",
    hint: "Z row updated too.",
    level: "advanced",
    codeExample: "Z = Z - (Z coeff) × Pivot Row"
  },
  {
    question: "What happens to the basic variables after a pivot?",
    shortAnswer: "The leaving variable is replaced by the entering variable.",
    explanation: "The entering variable becomes basic and the leaving variable becomes non-basic. This exchange is recorded in the B column.",
    hint: "Exchange variables.",
    level: "intermediate",
    codeExample: "B: s₁ → x (s₁ leaves, x enters)"
  },
  {
    question: "What if the pivot element is zero?",
    shortAnswer: "The ratio test would not select that row.",
    explanation: "A zero pivot means the entering variable has no effect on that constraint. The ratio test only considers positive coefficients.",
    hint: "Zero not used.",
    level: "advanced",
    codeExample: "Coefficient = 0 → ignore in ratio test"
  },
  {
    question: "What if the pivot element is negative?",
    shortAnswer: "It cannot be used as a pivot.",
    explanation: "A negative pivot would make the basic variable negative, violating feasibility. Only positive pivots are valid.",
    hint: "Negative not valid.",
    level: "advanced",
    codeExample: "Pivot = -2 → invalid"
  },
  {
    question: "What is the role of the pivot element in row operations?",
    shortAnswer: "It is used to transform the tableau and exchange variables.",
    explanation: "The pivot element is the focus of row operations that make it 1 and all other entries in its column 0.",
    hint: "Focus of row operations.",
    level: "intermediate",
    codeExample: "Make pivot = 1, column = identity"
  },
  {
    question: "What does a completed pivot operation achieve?",
    shortAnswer: "A new basic feasible solution with improved objective value.",
    explanation: "After a pivot operation, the entering variable is in the basis, the leaving variable is out, and the objective value has improved.",
    hint: "New improved solution.",
    level: "intermediate",
    codeExample: "New basic variables: x, s₂; Z increased"
  },
  {
    question: "How many pivot operations are typically needed?",
    shortAnswer: "Until all Z row coefficients are non-negative (for maximization).",
    explanation: "The number of pivots depends on the problem size. Each pivot moves to a better corner point until optimality is reached.",
    hint: "Until optimality.",
    level: "intermediate",
    codeExample: "Usually 2-5 pivots for small problems"
  },
  {
    question: "What is the significance of the pivot element's value?",
    shortAnswer: "It determines how much the entering variable increases.",
    explanation: "The pivot value determines the step size for the entering variable. A larger pivot means a smaller increase.",
    hint: "Determines step size.",
    level: "advanced",
    codeExample: "Pivot = 2 → x increases by 5"
  },
  {
    question: "Can the pivot element be non-integer?",
    shortAnswer: "Yes, pivots can be fractional.",
    explanation: "After row operations, pivot elements can become fractions. The Simplex Method handles fractional values.",
    hint: "Fractions are fine.",
    level: "intermediate",
    codeExample: "Pivot = 0.5 (fractional)"
  },
  {
    question: "What is the relationship between pivot and ratio test?",
    shortAnswer: "The ratio test determines which row becomes the pivot row.",
    explanation: "The ratio test finds the leaving variable, which determines the pivot row. The pivot column is determined by the entering variable.",
    hint: "Ratio test → pivot row.",
    level: "intermediate",
    codeExample: "Min ratio → leaving row → pivot row"
  },
  {
    question: "What happens if two rows have the same minimum ratio?",
    shortAnswer: "Either row can be chosen (tie-breaking).",
    explanation: "Ties in the ratio test can lead to degeneracy. Use a consistent tie-breaking rule like choosing the first row.",
    hint: "Tie-breaking needed.",
    level: "advanced",
    codeExample: "Both rows give ratio 5 → tie"
  },
  {
    question: "What is the impact of a bad pivot choice?",
    shortAnswer: "It could lead to cycling or incorrect results.",
    explanation: "Choosing the wrong pivot (e.g., negative or zero) would violate feasibility. Ties without proper handling could cause cycling.",
    hint: "Bad pivot = wrong results.",
    level: "advanced",
    codeExample: "Choosing negative pivot → infeasible"
  },
  {
    question: "How do you verify a correct pivot operation?",
    shortAnswer: "Check that the pivot column is an identity column.",
    explanation: "After the pivot operation, verify that the pivot column has a 1 at the pivot row and 0s everywhere else.",
    hint: "Check identity column.",
    level: "intermediate",
    codeExample: "Pivot column: [0, 1, 0]ᵀ"
  }
];

export default questions;