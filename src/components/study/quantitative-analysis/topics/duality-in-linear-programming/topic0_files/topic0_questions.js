const questions = [
  {
    question: "What is the fundamental concept of primal and dual problems in optimization?",
    shortAnswer: "Every primal problem (original optimization) has a corresponding dual problem that provides complementary insights and bounds on the optimal solution.",
    explanation: "The primal problem is the original optimization problem we want to solve. The dual problem is derived from the primal through mathematical transformation. Each constraint in the primal becomes a variable in the dual, and each variable in the primal becomes a constraint in the dual. This relationship provides valuable insights about the problem structure and solution.",
    hint: "Think about how mirror images work - the dual is like a mathematical mirror of the primal problem.",
    level: "basic",
    codeExample: "Primal: max c^T x s.t. Ax ≤ b, x ≥ 0\nDual: min b^T y s.t. A^T y ≥ c, y ≥ 0"
  },
  {
    question: "What are dual variables and what do they represent economically?",
    shortAnswer: "Dual variables represent shadow prices or marginal values of the constraints in the primal problem.",
    explanation: "Each dual variable corresponds to a constraint in the primal problem. The value of a dual variable at optimality represents how much the objective function would improve if we had one more unit of that resource (for maximization problems) or how much we could reduce costs (for minimization problems).",
    hint: "Think about how much you'd pay for an extra unit of a limited resource - that's your shadow price.",
    level: "basic",
    codeExample: "If y₁ = 5 in a production problem, having one more unit of resource 1 increases profit by ₹5."
  },
  {
    question: "What is the difference between weak duality and strong duality?",
    shortAnswer: "Weak duality states that the objective value of the dual is always a bound on the primal objective, while strong duality states that these values are equal at optimality.",
    explanation: "Weak duality: For any feasible primal solution x and dual solution y, the dual objective value is ≤ primal objective value (for maximization). Strong duality: If both problems have optimal solutions and certain conditions are met, the optimal values are equal (duality gap = 0).",
    hint: "Weak duality gives bounds, strong duality gives the exact optimal value.",
    level: "intermediate",
    codeExample: "Weak: Z_dual ≤ Z_primal\nStrong: Z_dual* = Z_primal*"
  },
  {
    question: "How do you derive the dual of a linear programming problem?",
    shortAnswer: "Convert each primal constraint to a dual variable, each primal variable to a dual constraint, and reverse the optimization direction.",
    explanation: "The process involves: 1) Identify the primal objective (max/min), 2) Set up dual objective with constraint coefficients, 3) Form dual constraints using objective coefficients, 4) Ensure correct inequality directions. The number of dual variables equals the number of primal constraints.",
    hint: "Count constraints and variables - they swap roles in the dual formulation.",
    level: "intermediate",
    codeExample: "Primal: max Z = 3x₁ + 2x₂\ns.t. 2x₁ + x₂ ≤ 8, x₁ + 3x₂ ≤ 10, x₁,x₂ ≥ 0\nDual: min W = 8y₁ + 10y₂\ns.t. 2y₁ + y₂ ≥ 3, y₁ + 3y₂ ≥ 2, y₁,y₂ ≥ 0"
  },
  {
    question: "What is the economic interpretation of dual variables in linear programming?",
    shortAnswer: "Dual variables represent the marginal value or shadow price of resources in the original problem.",
    explanation: "In production planning, dual variables show how much the profit would increase if we had one additional unit of each resource. In cost minimization, they show how much we could reduce costs by relaxing constraints. These shadow prices are crucial for resource valuation and allocation decisions.",
    hint: "Ask yourself: What's the maximum I'd pay for one more unit of this resource?",
    level: "intermediate",
    codeExample: "If y₁ = 7.5, increasing Resource 1 by 1 unit increases profit by ₹7.5 (for max problems)."
  },
  {
    question: "What are the conditions for strong duality to hold?",
    shortAnswer: "Strong duality holds when both primal and dual problems have feasible solutions and the optimal values are equal, typically under convexity and regularity conditions.",
    explanation: "For linear programming, strong duality always holds if both problems have feasible solutions. For more general optimization, additional conditions like Slater's condition (strict feasibility) or constraint qualification are needed. Strong duality means no duality gap exists.",
    hint: "Think about whether your problem satisfies the necessary conditions for equality.",
    level: "expert",
    codeExample: "Slater's condition: There exists x such that g_i(x) < 0 for all inequality constraints."
  },
  {
    question: "What is complementary slackness in duality theory?",
    shortAnswer: "Complementary slackness states that at optimality, either the slack variable or the corresponding dual variable (or both) must be zero.",
    explanation: "This condition provides relationships between primal and dual optimal solutions. For each constraint: if the constraint is tight (slack=0), the dual variable can be positive; if the constraint is loose (slack>0), the dual variable must be zero. This helps verify optimality and find solutions.",
    hint: "At optimality, resources either have zero shadow price or are fully utilized.",
    level: "expert",
    codeExample: "If x₁ > 0, then the dual constraint must be tight (A₁^T y = c₁).\nIf A₁x < b₁, then y₁ = 0."
  },
  {
    question: "How can duality be used to solve complex optimization problems?",
    shortAnswer: "Duality allows solving the easier of the two problems (primal or dual) to get insights about the harder one.",
    explanation: "When one problem has fewer variables or easier constraints, solving the dual can be computationally more efficient. The dual solution provides bounds and sensitivity information about the primal. This is particularly useful in large-scale problems and in algorithms like interior-point methods.",
    hint: "Which problem has fewer variables or constraints? That's usually easier to solve.",
    level: "expert",
    codeExample: "A problem with many variables but few constraints might be easier to solve via its dual."
  },
  {
    question: "What role does duality play in sensitivity analysis?",
    shortAnswer: "Dual variables provide sensitivity information about how changes in constraints affect the optimal objective value.",
    explanation: "The values of dual variables indicate the rate of change in the objective function with respect to changes in the right-hand side of constraints. This is crucial for understanding how robust the solution is and for making decisions about resource allocation.",
    hint: "How would the optimal solution change if we had slightly more or less of each resource?",
    level: "expert",
    codeExample: "∂Z*/∂b_i = y_i* (where b_i is the RHS of constraint i)."
  },
  {
    question: "What are the key differences between primal and dual feasible regions?",
    shortAnswer: "The primal feasible region is in the space of decision variables, while the dual feasible region is in the space of shadow prices.",
    explanation: "The primal feasible region contains all combinations of decision variables that satisfy constraints. The dual feasible region contains all combinations of shadow prices that satisfy the dual constraints. These regions are in different spaces and the relationship between them is governed by duality theory.",
    hint: "Think about how dimensions and constraints transform between primal and dual.",
    level: "intermediate",
    codeExample: "Primal: 2D region (x₁,x₂)\nDual: 2D region (y₁,y₂) with different constraints."
  },
  {
    question: "How do you interpret a dual variable that equals zero?",
    shortAnswer: "A zero-valued dual variable indicates that the corresponding constraint is not binding and has no marginal value.",
    explanation: "When a constraint is slack (not tight) at optimality, the associated dual variable is zero. This means that having more of that resource doesn't improve the objective function - it's not a bottleneck. The resource is abundant and has no shadow price.",
    hint: "If a resource isn't fully used, why would you pay for more of it?",
    level: "intermediate",
    codeExample: "If y₁ = 0, then resource 1 is not limiting production or value."
  },
  {
    question: "What happens to dual variables when constraints change?",
    shortAnswer: "Dual variables change when constraints change, reflecting new marginal values of resources.",
    explanation: "If the RHS of a constraint changes, the optimal dual variables may change. The rate of change of the objective function with respect to these changes is given by the dual variables. This makes duality essential for what-if analysis.",
    hint: "How would adding more of a resource change the optimal solution?",
    level: "expert",
    codeExample: "∂Z*/∂b = y* (sensitivity of objective to RHS changes)."
  },
  {
    question: "How does duality help in resource allocation decisions?",
    shortAnswer: "Dual variables indicate which resources are scarce and valuable, guiding optimal allocation decisions.",
    explanation: "By examining dual variables (shadow prices), managers can identify bottlenecks and make informed decisions about resource allocation. Resources with high shadow prices should be prioritized for additional allocation, while zero-shadow-price resources indicate surplus capacity.",
    hint: "Which resources would you invest more in based on their shadow prices?",
    level: "expert",
    codeExample: "If labor has a shadow price of ₹50 and raw material ₹30, invest more in labor first."
  },
  {
    question: "What are the practical applications of duality in business?",
    shortAnswer: "Duality is used in production planning, finance, transportation, and resource allocation to optimize decisions.",
    explanation: "Businesses use duality for: 1) Pricing resources and products, 2) Evaluating investment opportunities, 3) Optimizing supply chains, 4) Making staffing decisions, 5) Portfolio optimization in finance. The dual perspective provides valuable insights that aren't visible in the primal formulation.",
    hint: "Think about how businesses value and allocate their limited resources.",
    level: "intermediate",
    codeExample: "A company uses dual prices to decide which products to produce and how to price them."
  },
  {
    question: "What is the significance of the duality gap?",
    shortAnswer: "The duality gap is the difference between the primal and dual objective values, indicating how far from optimality the solution is.",
    explanation: "A positive duality gap means the solution is not yet optimal. Reducing the gap to zero (strong duality) indicates optimality. In practice, algorithms for solving optimization problems track the duality gap as a measure of solution quality.",
    hint: "When the gap is zero, you've found the optimal solution.",
    level: "intermediate",
    codeExample: "Gap = Z_primal - Z_dual (for max problems). Gap = 0 at optimality."
  },
  {
    question: "Can you explain the dual of a standard form linear program?",
    shortAnswer: "The dual of a standard form LP (Ax = b, x ≥ 0) has free (unrestricted) variables corresponding to the equality constraints.",
    explanation: "For standard form: Primal min c^T x s.t. Ax = b, x ≥ 0. The dual is max b^T y s.t. A^T y ≤ c (y unrestricted). The equality constraints in primal become free variables in dual.",
    hint: "Equality constraints in primal = free variables in dual.",
    level: "expert",
    codeExample: "Primal: min c^T x s.t. Ax = b, x ≥ 0\nDual: max b^T y s.t. A^T y ≤ c, y free"
  },
  {
    question: "What are the main properties of duality in linear programming?",
    shortAnswer: "Key properties include weak duality, strong duality, complementary slackness, and the symmetry principle.",
    explanation: "1) Weak duality: dual objective bounds primal objective, 2) Strong duality: optimal values are equal, 3) Complementary slackness: either constraint is tight or dual variable is zero, 4) Symmetry: dual of dual gives the original primal.",
    hint: "These properties together form the foundation of duality theory.",
    level: "intermediate",
    codeExample: "All properties work together to prove optimality and find solutions."
  },
  {
    question: "How does the simplex method use dual variables?",
    shortAnswer: "The simplex method uses dual variables (simplex multipliers) to check optimality and guide the search for better solutions.",
    explanation: "In the simplex method, dual variables are calculated to determine whether the current solution is optimal. They represent the reduced costs that indicate whether improving solutions exist. This dual perspective makes the simplex method efficient.",
    hint: "The simplex method implicitly solves both primal and dual problems simultaneously.",
    level: "expert",
    codeExample: "Reduced costs = c_j - y^T A_j (indicate if a variable should enter the basis)."
  },
  {
    question: "What is the role of duality in interior-point methods?",
    shortAnswer: "Interior-point methods solve both primal and dual problems simultaneously by maintaining complementary slackness.",
    explanation: "Modern interior-point methods work on the primal-dual system, tracking both solutions and the duality gap. They move through the interior of the feasible region while reducing the duality gap to zero, ensuring optimality.",
    hint: "Path-following algorithms maintain primal and dual feasibility while reducing the gap.",
    level: "expert",
    codeExample: "Primal-dual interior-point methods: Solve primal and dual together with perturbed complementary slackness."
  },
  {
    question: "How do you verify if a solution is optimal using duality?",
    shortAnswer: "Check if the primal and dual have feasible solutions with equal objective values (strong duality).",
    explanation: "To verify optimality: 1) Find feasible primal solution x*, 2) Find feasible dual solution y*, 3) Check if c^T x* = b^T y*. If equal, both are optimal by strong duality. Also verify complementary slackness conditions.",
    hint: "Equal objective values + feasibility = optimality.",
    level: "intermediate",
    codeExample: "If Z_primal = Z_dual and both feasible, then optimality is proven."
  },
  {
    question: "What is the economic meaning of complementary slackness?",
    shortAnswer: "It says that resources are only valuable (have positive shadow price) when they're fully utilized.",
    explanation: "In economic terms: 1) If a resource has a positive shadow price, it's fully used in the optimal solution (the constraint is tight), 2) If a resource is not fully used (has slack), its shadow price must be zero. This helps identify true bottlenecks.",
    hint: "Only scarce resources have value. Abundant resources are free.",
    level: "expert",
    codeExample: "Slack > 0 → y = 0. y > 0 → Slack = 0."
  },
  {
    question: "How does duality help in portfolio optimization?",
    shortAnswer: "Duality in portfolio optimization helps understand the trade-off between risk and return and identify shadow prices of constraints.",
    explanation: "In Markowitz portfolio optimization: The dual problem reveals the market prices of risk. Dual variables show the marginal value of relaxing constraints like minimum return requirements or maximum risk limits.",
    hint: "What would an investor pay to reduce portfolio risk or increase expected return?",
    level: "expert",
    codeExample: "Dual variables in portfolio optimization = shadow prices of risk constraints."
  },
  {
    question: "Can duality be applied to nonlinear programming?",
    shortAnswer: "Yes, duality extends to nonlinear programming through Lagrangian duality and is fundamental to convex optimization.",
    explanation: "Lagrangian duality is used for nonlinear problems. For convex problems with certain conditions, strong duality holds. This is crucial in many machine learning applications including SVM and deep learning optimization.",
    hint: "Convexity is key for strong duality in nonlinear problems.",
    level: "expert",
    codeExample: "L(x,λ) = f(x) + Σλ_i g_i(x) - Lagrangian function for constrained optimization."
  },
  {
    question: "What is the relationship between dual variables and Lagrange multipliers?",
    shortAnswer: "Dual variables in linear programming are equivalent to Lagrange multipliers in nonlinear optimization.",
    explanation: "Both represent the marginal value of constraints. In linear programming, dual variables are often called Lagrange multipliers in the context of the Lagrangian relaxation. This connection unifies duality theory across optimization problems.",
    hint: "They're the same concept - just different terminology for different fields.",
    level: "expert",
    codeExample: "Lagrange multipliers = Dual variables = Shadow prices."
  },
  {
    question: "How do you handle inequality constraints in dual formation?",
    shortAnswer: "Inequality direction determines the sign of dual variables and constraints in the dual formulation.",
    explanation: "For minimization with ≥ constraints, dual variables are ≤ 0. For maximization with ≤ constraints, dual variables are ≥ 0. The rule: Primal constraints with ≤ have non-negative dual variables, ≥ have non-positive dual variables.",
    hint: "The direction of primal constraints determines the sign of dual variables.",
    level: "expert",
    codeExample: "Primal: min c^T x s.t. Ax ≥ b → Dual: max b^T y s.t. A^T y ≤ c, y ≤ 0."
  },
  {
    question: "What is the dual of a minimum cost flow problem?",
    shortAnswer: "The dual represents the shortest path or cost minimization problem with node potentials.",
    explanation: "In network flow: Primal (min cost flow) has dual variables as node potentials. These potentials create a shortest path structure. The dual formulation can be interpreted as finding optimal node prices.",
    hint: "Node potentials in network flow = dual variables.",
    level: "expert",
    codeExample: "Dual: max Σ b_i π_i s.t. π_i - π_j ≤ c_ij (for each arc)."
  },
  {
    question: "Why is duality important in algorithm design?",
    shortAnswer: "Duality enables the design of efficient algorithms by providing theoretical guarantees and alternative formulations.",
    explanation: "Duality leads to: 1) Stopping criteria for algorithms, 2) Certificates of optimality, 3) Alternative ways to solve problems, 4) Primal-dual algorithms that exploit both formulations.",
    hint: "Many modern algorithms use both primal and dual formulations.",
    level: "expert",
    codeExample: "Primal-dual algorithms: maintain feasible primal and dual solutions simultaneously."
  },
  {
    question: "What is the dual of a transportation problem?",
    shortAnswer: "The dual of the transportation problem involves shadow prices for supply and demand nodes.",
    explanation: "In transportation: Primal minimizes shipping costs. Dual variables represent the value of having additional supply at origins or demand at destinations. The dual helps in evaluating potential changes in the network.",
    hint: "Shadow prices at supply and demand nodes help optimize transportation.",
    level: "expert",
    codeExample: "Dual variables: u_i (supply nodes) and v_j (demand nodes) with constraints u_i + v_j ≤ c_ij."
  },
  {
    question: "What is the duality theorem in linear programming?",
    shortAnswer: "The duality theorem states that the optimal objective values of a primal and its dual are equal if both have optimal solutions.",
    explanation: "This fundamental theorem ensures that for any LP with feasible solutions, the optimal values of the primal and dual are equal (strong duality). It provides a way to certify optimality and forms the theoretical foundation of LP algorithms.",
    hint: "The primal and dual optimal values are always equal for LPs.",
    level: "intermediate",
    codeExample: "max c^T x = min b^T y (the fundamental duality theorem)."
  },
  {
    question: "What happens when the primal problem is infeasible?",
    shortAnswer: "If the primal is infeasible, the dual is either infeasible or unbounded.",
    explanation: "By the Farkas lemma, if the primal has no feasible solution, the dual is either unbounded or infeasible. This relationship helps identify problem formulations and detect inconsistencies in constraints.",
    hint: "Infeasibility in one problem signals issues in the other.",
    level: "expert",
    codeExample: "Primal infeasible → Dual unbounded or infeasible."
  },
  {
    question: "How can duality be used for sensitivity analysis in production planning?",
    shortAnswer: "Dual variables show the marginal value of resources, enabling managers to prioritize investments and identify bottlenecks.",
    explanation: "In production planning: 1) Identify limiting resources from positive shadow prices, 2) Evaluate investment in resources with highest shadow prices, 3) Determine the value of relaxing constraints, 4) Price products based on resource consumption.",
    hint: "Shadow prices guide investment decisions by revealing true resource values.",
    level: "expert",
    codeExample: "If machine time has shadow price ₹100/hour, investing in more capacity is worth ₹100/hour."
  }
];

export default questions;