// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What are non-negativity restrictions in Linear Programming?",
    shortAnswer: "Constraints that require all decision variables to be ≥ 0.",
    explanation: "They ensure variables represent real, non-negative quantities like units produced, hours worked, or money invested.",
    hint: "No negative values allowed.",
    level: "basic"
  },
  {
    question: "Why are non-negativity restrictions important in LP?",
    shortAnswer: "They make the model realistic and ensure LP algorithms work correctly.",
    explanation: "Most decision variables represent physical quantities that cannot be negative; also, the Simplex method assumes variables are non-negative.",
    hint: "They prevent meaningless solutions.",
    level: "basic"
  },
  {
    question: "Can a decision variable be negative in a real-world LP problem?",
    shortAnswer: "Sometimes, if it represents a net position (e.g., net profit), but then it's called a 'free variable'.",
    explanation: "Free variables are transformed into two non-negative variables for solving.",
    hint: "Some variables can be negative, but they need special handling.",
    level: "moderate"
  },
  {
    question: "What happens if you forget to include non-negativity constraints?",
    shortAnswer: "The feasible region may be unbounded in the negative direction, and the optimal solution might be invalid.",
    explanation: "Without non-negativity, variables could go infinitely negative, making the problem unbounded or giving meaningless negative values.",
    hint: "You'd get unrealistic answers.",
    level: "moderate"
  },
  {
    question: "How do you handle a variable that can be negative?",
    shortAnswer: "Replace it with the difference of two non-negative variables: x = x⁺ - x⁻.",
    explanation: "This transformation allows the Simplex method to handle free variables while keeping all variables non-negative.",
    hint: "Use two variables to represent one free variable.",
    level: "expert"
  },
  {
    question: "Are non-negativity constraints considered part of the constraints set?",
    shortAnswer: "Yes, they are explicit constraints, often written as x₁ ≥ 0, x₂ ≥ 0, etc.",
    explanation: "They are usually listed separately but are part of the full set of constraints.",
    hint: "They are constraints just like any other.",
    level: "basic"
  },
  {
    question: "In a production problem, why must x₁ ≥ 0?",
    shortAnswer: "Because you cannot produce a negative number of units.",
    explanation: "Production quantities are naturally non-negative; negative production has no physical meaning.",
    hint: "You can't make -5 chairs.",
    level: "basic"
  },
  {
    question: "What is the difference between non-negativity and a lower bound constraint like x ≥ 5?",
    shortAnswer: "Non-negativity is x ≥ 0; a lower bound is a stricter limit (e.g., minimum production).",
    explanation: "Non-negativity is the default; lower bounds are additional requirements.",
    hint: "Non-negativity is the base case.",
    level: "moderate"
  },
  {
    question: "Why does the Simplex method require non-negative variables?",
    shortAnswer: "Because it starts at the origin and moves along edges; non-negativity defines the feasible region as a convex polyhedron with the origin as a vertex.",
    explanation: "The algorithm assumes variables are non-negative to maintain feasibility and convergence.",
    hint: "It needs a starting point.",
    level: "expert"
  },
  {
    question: "Can non-negativity restrictions be relaxed for all variables in a problem?",
    shortAnswer: "Theoretically yes, but then you would need to transform each variable; it's usually easier to keep them non-negative.",
    explanation: "Most practical problems have natural non-negativity, so relaxation is rarely needed.",
    hint: "Stick with non-negative unless necessary.",
    level: "moderate"
  },
  {
    question: "What is a 'free variable' in LP?",
    shortAnswer: "A variable that can take any real value (positive, negative, or zero).",
    explanation: "Free variables are transformed into two non-negative variables for LP algorithms.",
    hint: "Unrestricted in sign.",
    level: "expert"
  },
  {
    question: "How do you represent a free variable x in standard LP form?",
    shortAnswer: "Let x = x₁ - x₂, with x₁ ≥ 0, x₂ ≥ 0.",
    explanation: "This substitution preserves linearity and allows the standard Simplex method to be used.",
    hint: "Replace one variable with two.",
    level: "expert"
  },
  {
    question: "Is non-negativity always required in LP?",
    shortAnswer: "Yes, in standard LP formulation. Free variables are converted to non-negative ones.",
    explanation: "Standard LP assumes all variables ≥ 0; if not, transformation is applied.",
    hint: "Standard form requires non-negativity.",
    level: "moderate"
  },
  {
    question: "What is a common beginner mistake regarding non-negativity?",
    shortAnswer: "Forgetting to include x ≥ 0 for each variable, assuming it's obvious.",
    explanation: "Beginners often overlook writing them down, which can lead to infeasible or incorrect solutions.",
    hint: "Always write them explicitly.",
    level: "basic"
  },
  {
    question: "Can a non-negativity constraint be redundant?",
    shortAnswer: "Yes, if other constraints already force the variable to be ≥ 0 (e.g., x ≥ 5 implies x ≥ 0).",
    explanation: "But it's still good practice to include it explicitly.",
    hint: "It's redundant but harmless.",
    level: "moderate"
  },
  {
    question: "What is the geometric interpretation of non-negativity?",
    shortAnswer: "It restricts the feasible region to the first quadrant (for two variables) or the positive orthant.",
    explanation: "Non-negativity cuts the space to the region where all coordinates are non-negative.",
    hint: "It keeps you in the positive side.",
    level: "moderate"
  },
  {
    question: "Why do LP textbooks always list non-negativity as a separate group?",
    shortAnswer: "To emphasize its importance and separate it from other constraints.",
    explanation: "It's a fundamental assumption and is treated distinctly.",
    hint: "It's a special constraint.",
    level: "basic"
  },
  {
    question: "If a variable represents a cost, can it be negative?",
    shortAnswer: "Usually no; costs are positive. But if it's net cost (revenue minus cost), it could be negative.",
    explanation: "Net cost can be negative if revenue exceeds cost, representing profit.",
    hint: "Think about net values.",
    level: "moderate"
  },
  {
    question: "How does non-negativity affect the objective function?",
    shortAnswer: "It restricts the domain; the objective is evaluated only over non-negative variables.",
    explanation: "The optimal solution must satisfy x ≥ 0; otherwise, it's not feasible.",
    hint: "The objective is only considered in the feasible region.",
    level: "moderate"
  },
  {
    question: "What is the effect of adding non-negativity to an unconstrained problem?",
    shortAnswer: "It bounds the solution space and may prevent unboundedness.",
    explanation: "Without any constraints, variables could go to infinity; non-negativity restricts one direction.",
    hint: "It limits the variables to positive values.",
    level: "expert"
  },
  {
    question: "Can non-negativity constraints be written as inequalities?",
    shortAnswer: "Yes, they are inequalities: x₁ ≥ 0, etc.",
    explanation: "They are a special case of inequality constraints.",
    hint: "They are just like any other inequality.",
    level: "basic"
  },
  {
    question: "What does it mean if the optimal solution has a variable equal to zero?",
    shortAnswer: "It means the variable is at its lower bound (non-negativity), often indicating the resource is not used.",
    explanation: "Zero values are common in LP solutions; they indicate that the activity is not worthwhile.",
    hint: "Zero means not producing that item.",
    level: "moderate"
  },
  {
    question: "Why is non-negativity sometimes called a 'canonical constraint'?",
    shortAnswer: "Because it's a standard part of the canonical LP form.",
    explanation: "The canonical form requires all variables ≥ 0.",
    hint: "It's a standard requirement.",
    level: "moderate"
  },
  {
    question: "In a transportation problem, what do non-negativity constraints represent?",
    shortAnswer: "That shipments from a source to a destination cannot be negative.",
    explanation: "You can't send negative units; it's physically impossible.",
    hint: "You can't ship a negative amount.",
    level: "basic"
  },
  {
    question: "What is the dual interpretation of non-negativity?",
    shortAnswer: "In the dual, non-negativity corresponds to constraints that the dual variables must be ≥ 0 (for primal ≤ constraints).",
    explanation: "The dual variables have non-negativity if the primal constraints are ≤.",
    hint: "Dual variables also have sign restrictions.",
    level: "expert"
  },
  {
    question: "Can you solve an LP without explicit non-negativity?",
    shortAnswer: "No, standard LP algorithms require it; you must transform any free variables.",
    explanation: "All LP solvers assume variables are non-negative by default.",
    hint: "It's a requirement.",
    level: "moderate"
  },
  {
    question: "What is the consequence of a variable taking a negative value in an LP solution?",
    shortAnswer: "It would violate non-negativity and be infeasible.",
    explanation: "The solution would not be acceptable in real life.",
    hint: "It's not a valid solution.",
    level: "basic"
  },
  {
    question: "How do you test if a variable should be non-negative?",
    shortAnswer: "Ask: 'Does it represent a quantity that cannot be negative?' If yes, it must be ≥ 0.",
    explanation: "Most decision variables are naturally non-negative; only net or difference variables may be free.",
    hint: "Think about physical meaning.",
    level: "moderate"
  },
  {
    question: "What is the role of non-negativity in the Simplex tableau?",
    shortAnswer: "It ensures the initial basic feasible solution uses the slack variables as the basis.",
    explanation: "The tableau requires all variables to be non-negative for the pivot operations.",
    hint: "It's a prerequisite for the algorithm.",
    level: "expert"
  },
  {
    question: "Can you have a non-negativity constraint with a coefficient other than 1?",
    shortAnswer: "No, non-negativity is always x ≥ 0; coefficients are always 1.",
    explanation: "It's a simple lower bound; if you need a lower bound like 2x ≥ 0, it's just x ≥ 0.",
    hint: "It's always x ≥ 0.",
    level: "basic"
  },
  {
    question: "What is the difference between x ≥ 0 and x > 0?",
    shortAnswer: "x ≥ 0 allows zero; x > 0 requires strictly positive, but LP uses ≥ for algorithmic reasons.",
    explanation: "LP typically uses ≥ because zero is allowed and is necessary for feasibility.",
    hint: "Zero is allowed in LP.",
    level: "moderate"
  }
];

export default questions;