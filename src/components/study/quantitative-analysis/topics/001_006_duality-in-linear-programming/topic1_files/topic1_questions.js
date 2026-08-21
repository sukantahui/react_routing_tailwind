const questions = [
  {
    question: "What is the first step in forming the dual of a primal problem?",
    shortAnswer: "The first step is to identify whether the primal is a maximization or minimization problem.",
    explanation: "You must first determine the optimization direction of the primal because the dual takes the opposite direction. If the primal is maximizing, the dual minimizes. If the primal is minimizing, the dual maximizes. This fundamental step sets the direction for the entire dual formulation.",
    hint: "Think about what comes first - you need to know where you're starting before you can transform.",
    level: "basic",
    codeExample: "Primal: Max Z → Dual: Min W\nPrimal: Min Z → Dual: Max W"
  },
  {
    question: "How many variables does the dual problem have compared to the primal?",
    shortAnswer: "The dual has exactly one variable for each constraint in the primal problem.",
    explanation: "If the primal has m constraints, the dual will have m variables. Each dual variable corresponds to a specific constraint in the primal and represents the shadow price or marginal value of that constraint. This is a key symmetry in duality theory.",
    hint: "Count the constraints in the primal - that's how many variables you need in the dual.",
    level: "basic",
    codeExample: "Primal with 3 constraints → Dual with 3 variables (y₁, y₂, y₃)"
  },
  {
    question: "How do you form the objective function of the dual problem?",
    shortAnswer: "The dual objective is formed by multiplying each dual variable by the corresponding RHS value from the primal constraints and summing them.",
    explanation: "For the dual objective function, you take the RHS values (bᵢ) from each primal constraint and multiply them by the corresponding dual variable (yᵢ). The sum b₁y₁ + b₂y₂ + ... + bₘyₘ becomes the dual objective. The optimization direction is reversed from the primal.",
    hint: "The RHS values from primal constraints become coefficients in the dual objective.",
    level: "basic",
    codeExample: "Primal constraints: x₁ ≤ 4, x₂ ≤ 12, x₁ + x₂ ≤ 18\nDual objective: Min W = 4y₁ + 12y₂ + 18y₃"
  },
  {
    question: "How many constraints does the dual problem have?",
    shortAnswer: "The dual has exactly one constraint for each variable in the primal problem.",
    explanation: "If the primal has n variables, the dual will have n constraints. Each dual constraint corresponds to a specific variable in the primal and is formed using the coefficients from all primal constraints for that variable.",
    hint: "Count the variables in the primal - that's how many constraints you need in the dual.",
    level: "basic",
    codeExample: "Primal with 2 variables → Dual with 2 constraints"
  },
  {
    question: "How do you determine the sign restrictions for dual variables?",
    shortAnswer: "The sign restrictions depend on the constraint types in the primal: ≤ gives y ≥ 0, ≥ gives y ≤ 0, and = gives y unrestricted.",
    explanation: "For a maximization primal: constraints with ≤ have non-negative dual variables, ≥ constraints have non-positive dual variables, and = constraints have unrestricted (free) dual variables. For minimization primal, these relationships are reversed.",
    hint: "Remember: ≤ constraints in primal give y ≥ 0, ≥ give y ≤ 0, = give y free.",
    level: "intermediate",
    codeExample: "Primal constraint x₁ + x₂ ≤ 10 → y₁ ≥ 0\nPrimal constraint 2x₁ + x₂ ≥ 8 → y₂ ≤ 0\nPrimal constraint x₁ + 2x₂ = 6 → y₃ free"
  },
  {
    question: "What is the relationship between primal constraints and dual variables?",
    shortAnswer: "Each primal constraint corresponds to exactly one dual variable, and the coefficients from that constraint are used in the dual constraints.",
    explanation: "This relationship is one-to-one: the i-th primal constraint gives rise to the i-th dual variable. The coefficients of the primal constraints become coefficients in the dual constraints, with the roles of rows and columns swapped.",
    hint: "Think of it as a transpose operation - rows become columns.",
    level: "intermediate",
    codeExample: "Primal constraint row i → Dual variable yᵢ"
  },
  {
    question: "How do you form dual constraints from primal variables?",
    shortAnswer: "For each primal variable, create a dual constraint using its coefficients from all primal constraints.",
    explanation: "Take the j-th primal variable xⱼ. The coefficients of xⱼ in each primal constraint become the coefficients in the j-th dual constraint. The RHS of this dual constraint is the coefficient of xⱼ in the primal objective.",
    hint: "Each column in the primal constraint matrix becomes a row in the dual constraint matrix.",
    level: "intermediate",
    codeExample: "Primal variable x₁ has coefficients [2, 1, 3] → Dual constraint: 2y₁ + y₂ + 3y₃ ≥ 4"
  },
  {
    question: "What is the standard form transformation rule for mixed constraints?",
    shortAnswer: "For maximization, convert ≥ to ≤ by multiplying by -1. For minimization, convert ≤ to ≥ by multiplying by -1.",
    explanation: "When a primal has mixed constraint types, convert all to the appropriate standard form. For max problems, convert ≥ to ≤ by multiplying the constraint by -1. For min problems, convert ≤ to ≥ by multiplying by -1. The sign of the RHS also changes.",
    hint: "Always convert to standard form before forming the dual to avoid errors.",
    level: "expert",
    codeExample: "For max: 2x₁ + x₂ ≥ 8 → -2x₁ - x₂ ≤ -8"
  },
  {
    question: "How does the dual objective compare to the primal objective in terms of bounds?",
    shortAnswer: "The dual objective provides a bound on the primal objective: for max problems, W ≥ Z for any feasible solutions.",
    explanation: "For a maximization primal, the dual objective value W is always greater than or equal to the primal objective value Z for any feasible solutions. This is weak duality. At optimality, they are equal.",
    hint: "The dual always provides a bound - think of it as a limit on what's possible.",
    level: "intermediate",
    codeExample: "For max primal: Z ≤ W (for all feasible solutions)"
  },
  {
    question: "What is the role of the constraint matrix in dual formation?",
    shortAnswer: "The primal constraint matrix A is transposed to form the dual constraint matrix Aᵀ.",
    explanation: "The mathematical transformation A → Aᵀ is fundamental. If the primal has constraints Ax ≤ b, the dual has constraints Aᵀy ≥ c. This matrix transposition swaps the roles of variables and constraints.",
    hint: "Matrix transposition is the key mathematical operation in dual formation.",
    level: "intermediate",
    codeExample: "Primal: A (m×n), Dual: Aᵀ (n×m)"
  },
  {
    question: "Why is it important to write the primal in standard form before forming the dual?",
    shortAnswer: "Standard form ensures consistent application of dual formation rules and prevents errors.",
    explanation: "Standard form (all constraints as ≤ for max, or ≥ for min, and all variables ≥ 0) makes the dual formation mechanical and error-free. It eliminates confusion about sign restrictions and constraint directions.",
    hint: "Standardization reduces complexity and prevents mistakes.",
    level: "intermediate",
    codeExample: "Always convert to standard form: Max with all ≤ constraints, variables ≥ 0"
  },
  {
    question: "How do equality constraints in the primal affect the dual?",
    shortAnswer: "Equality constraints in the primal result in unrestricted (free) dual variables.",
    explanation: "When a primal constraint is an equality (=), the corresponding dual variable has no sign restriction (it can be positive, negative, or zero). This is because equality constraints bind in both directions.",
    hint: "Free variables have no sign restrictions - they can be anything.",
    level: "expert",
    codeExample: "Primal constraint: 3x₁ + 2x₂ = 10 → Dual variable y₃ is free"
  },
  {
    question: "What happens to dual variables when primal constraints are not in standard form?",
    shortAnswer: "Non-standard constraints require careful handling: convert to standard form or adjust sign restrictions accordingly.",
    explanation: "If a maximization primal has ≥ constraints, they must be converted to ≤ form (by multiplying by -1) before forming the dual. Alternatively, use the general rule: ≥ constraints in max produce y ≤ 0, and ≤ constraints in min produce y ≤ 0.",
    hint: "When in doubt, convert to standard form first.",
    level: "expert",
    codeExample: "For max with ≥: 2x₁ + 3x₂ ≥ 8 → y₂ ≤ 0 (if not converted)"
  },
  {
    question: "What is the dual formation rule for a minimization problem with ≤ constraints?",
    shortAnswer: "For a minimization primal with ≤ constraints, the dual variables are non-positive (y ≤ 0).",
    explanation: "In minimization problems, the standard form is min with ≥ constraints. So a ≤ constraint in a min problem is non-standard, making the dual variable non-positive. This is the opposite of the max case.",
    hint: "Min + ≤ gives y ≤ 0.",
    level: "expert",
    codeExample: "Min Z, constraint: x₁ + x₂ ≤ 10 → Dual variable y₁ ≤ 0"
  },
  {
    question: "How can you verify if you've formed the dual correctly?",
    shortAnswer: "Check dimensions, signs, and that the dual of the dual returns to the original primal.",
    explanation: "A good verification is: 1) Count variables and constraints (they should be swapped), 2) Check that sign restrictions are correct, 3) Apply the dual to your dual - it should return to the original primal (for standard forms).",
    hint: "Good duality checks: dimension swap and dual-of-dual property.",
    level: "intermediate",
    codeExample: "Dual of the dual should be the original primal (for standard forms)."
  },
  {
    question: "What is the matrix representation of primal and dual problems?",
    shortAnswer: "Primal: max cᵀx s.t. Ax ≤ b, x ≥ 0. Dual: min bᵀy s.t. Aᵀy ≥ c, y ≥ 0.",
    explanation: "This compact representation shows the relationship: c and b swap positions, A becomes Aᵀ, and the inequality directions reverse. This matrix form is used in algorithms and theoretical analysis.",
    hint: "Matrix form makes the symmetry between primal and dual clear.",
    level: "intermediate",
    codeExample: "Primal: max cᵀx\nDual: min bᵀy"
  },
  {
    question: "How do you form the dual when the primal has unrestricted variables?",
    shortAnswer: "Unrestricted primal variables produce equality constraints in the dual.",
    explanation: "If a primal variable is not restricted to be non-negative, the corresponding dual constraint becomes an equality. This follows from the general rule: primal variable unrestricted → dual constraint equality.",
    hint: "No sign restriction on variable = equality constraint in dual.",
    level: "expert",
    codeExample: "Primal variable x₂ free → Dual constraint: Aᵀ₂y = c₂"
  },
  {
    question: "What is the relationship between primal slacks and dual variables?",
    shortAnswer: "Primal slack variables correspond to dual variables through complementary slackness at optimality.",
    explanation: "At the optimum, if a primal constraint is not tight (slack > 0), the corresponding dual variable is zero. Conversely, if a dual variable is positive, the corresponding primal constraint must be tight. This relationship is crucial for sensitivity analysis.",
    hint: "Tight constraints can have positive shadow prices; loose constraints have zero shadow prices.",
    level: "expert",
    codeExample: "If slack₁ > 0, then y₁ = 0. If y₂ > 0, then slack₂ = 0."
  },
  {
    question: "How does duality formation help in understanding the economic value of resources?",
    shortAnswer: "Dual formation reveals shadow prices, which are the economic values of scarce resources.",
    explanation: "When you form the dual, each dual variable tells you the marginal value of the corresponding resource. This helps managers make decisions about resource allocation, pricing, and investment. Resources with high shadow prices are bottlenecks.",
    hint: "Shadow prices = economic value of resources.",
    level: "expert",
    codeExample: "If y₁ = ₹75, one more unit of Resource 1 increases profit by ₹75."
  },
  {
    question: "What is the computational advantage of forming the dual?",
    shortAnswer: "The dual may have fewer constraints and can be computationally easier to solve.",
    explanation: "If the primal has many variables but few constraints, the dual will have many constraints but few variables. Sometimes solving the dual with fewer variables is computationally more efficient, especially for large-scale problems.",
    hint: "Choose the formulation with fewer variables for faster computation.",
    level: "intermediate",
    codeExample: "Primal: 100 variables, 5 constraints → Dual: 5 variables, 100 constraints"
  },
  {
    question: "How do you handle non-negative variables in the dual?",
    shortAnswer: "Non-negative variables in the primal become ≥ constraints in the dual (for max problems).",
    explanation: "The non-negativity restriction x ≥ 0 in the primal transforms into inequality constraints in the dual. This is captured by the general rule: primal variables ≥ 0 produce dual constraints of type ≥.",
    hint: "Variable sign restrictions become constraint directions in the dual.",
    level: "intermediate",
    codeExample: "Primal: x₁ ≥ 0 → Dual constraint: Aᵀ₁y ≥ c₁"
  },
  {
    question: "What is the role of duality in linear programming algorithms?",
    shortAnswer: "Duality provides optimality certificates and guides algorithm development.",
    explanation: "Duality is used in: 1) The simplex method uses dual variables to check optimality, 2) Interior-point methods solve primal-dual systems, 3) Duality gaps provide stopping criteria, 4) Dual feasibility ensures solution quality.",
    hint: "Algorithms use both primal and dual perspectives.",
    level: "expert",
    codeExample: "Simplex method: dual variables → reduced costs for optimality check."
  },
  {
    question: "How does dual formation help in sensitivity analysis?",
    shortAnswer: "Dual variables provide sensitivity information about changes in constraints.",
    explanation: "The dual variables indicate how much the optimal objective value would change if the RHS of a constraint changed. This is extremely valuable for 'what-if' analysis and understanding the robustness of solutions.",
    hint: "Shadow prices tell you how sensitive your solution is to changes.",
    level: "expert",
    codeExample: "∂Z*/∂bᵢ = yᵢ* (rate of change of optimal value with RHS)."
  },
  {
    question: "What are the common mistakes when forming the dual of a minimization problem?",
    shortAnswer: "Common mistakes include wrong direction, incorrect sign restrictions, and misplacing RHS values.",
    explanation: "For minimization: 1) Forgetting that dual is maximization, 2) Using ≤ constraints incorrectly, 3) Misplacing RHS values (b becomes c), 4) Wrong coefficient mapping. Always convert to standard form first.",
    hint: "Min problems have their own rules - don't assume they're the same as max.",
    level: "expert",
    codeExample: "Min: all ≥ constraints and variables ≥ 0 for standard form."
  },
  {
    question: "How does the dual formation handle constraints with negative RHS values?",
    shortAnswer: "Negative RHS values require special handling: multiply by -1 to make them positive.",
    explanation: "For standard form, RHS values should be non-negative. If a constraint has negative RHS, multiply the entire constraint by -1 (which reverses the inequality) to make it positive. This ensures the dual variables have the correct interpretation.",
    hint: "Always make RHS positive before forming the dual.",
    level: "intermediate",
    codeExample: "2x₁ + 3x₂ ≤ -5 → -2x₁ - 3x₂ ≥ 5"
  },
  {
    question: "What is the relationship between primal and dual optimal solutions?",
    shortAnswer: "They are linked through complementary slackness and equal optimal objective values.",
    explanation: "At optimality: 1) Objective values are equal, 2) Complementary slackness conditions hold, 3) Both solutions are feasible. This relationship provides a way to find one solution from the other.",
    hint: "Optimality means both problems give the same value and satisfy complementary slackness.",
    level: "expert",
    codeExample: "xⱼ > 0 → dual constraint j is tight. yᵢ > 0 → primal constraint i is tight."
  },
  {
    question: "How do you form the dual of a transportation problem?",
    shortAnswer: "The dual of transportation has variables for supply and demand nodes with constraints uᵢ + vⱼ ≤ cᵢⱼ.",
    explanation: "In transportation: Primal minimizes ∑cᵢⱼxᵢⱼ subject to supply, demand, and non-negativity constraints. The dual has variables uᵢ for supply nodes and vⱼ for demand nodes. The constraints are uᵢ + vⱼ ≤ cᵢⱼ.",
    hint: "Dual variables in transportation are potentials at nodes.",
    level: "expert",
    codeExample: "Dual: max ∑sᵢuᵢ + ∑dⱼvⱼ subject to uᵢ + vⱼ ≤ cᵢⱼ"
  },
  {
    question: "What is the economic interpretation of dual constraints in production planning?",
    shortAnswer: "Dual constraints ensure that the value of resources used to make a product doesn't exceed its price.",
    explanation: "In production planning, dual constraints state that the cost of resources required to produce one unit of a product (using shadow prices) must be at least the profit from selling that product. This ensures efficiency and prevents underpricing.",
    hint: "Dual constraints prevent production of unprofitable products.",
    level: "expert",
    codeExample: "If product 1 uses resources with total shadow price > profit, it's not worth producing."
  },
  {
    question: "How does dual formation help in identifying redundant constraints?",
    shortAnswer: "Redundant constraints in the primal appear as zero dual variables at optimality.",
    explanation: "If a constraint is redundant (not binding at optimality), its shadow price is zero. The dual variable for that constraint will be zero at the optimal solution. This helps identify non-critical constraints.",
    hint: "Zero shadow prices = redundant or non-binding constraints.",
    level: "expert",
    codeExample: "If yᵢ = 0, constraint i is not limiting the optimal solution."
  },
  {
    question: "What is the dual of a problem with both ≤ and ≥ constraints?",
    shortAnswer: "Form the dual by converting constraints to standard form or using mixed constraint rules.",
    explanation: "For mixed constraints: 1) Convert to standard form first (recommended), 2) Or use the general rules: in max, ≤ → y ≥ 0, ≥ → y ≤ 0, = → y free. Apply these rules to each constraint type.",
    hint: "Standard form conversion is safest for mixed constraints.",
    level: "expert",
    codeExample: "Max primal with ≤, ≥, = constraints → dual with mixed sign restrictions."
  },
  {
    question: "How does the concept of duality extend to nonlinear programming?",
    shortAnswer: "Nonlinear programming uses Lagrangian duality, which generalizes linear programming duality.",
    explanation: "For nonlinear problems, the Lagrangian dual is formed by relaxing constraints using Lagrange multipliers. The dual gives bounds on the primal optimal value. Strong duality holds under convexity and constraint qualification conditions.",
    hint: "Lagrangian duality extends LP duality to nonlinear problems.",
    level: "expert",
    codeExample: "L(x,λ) = f(x) + ∑λᵢgᵢ(x) for Lagrangian relaxation."
  }
];

export default questions;