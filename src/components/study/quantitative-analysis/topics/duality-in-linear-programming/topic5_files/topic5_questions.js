const questions = [
  {
    question: "What is the fundamental difference between primal and dual problems?",
    shortAnswer: "The primal focuses on decision variables and constraints, while the dual focuses on resource valuation and shadow prices.",
    explanation: "The primal problem is the original optimization problem that focuses on what actions to take (decision variables) subject to limitations (constraints). The dual problem is derived from the primal and focuses on valuing resources (shadow prices). The primal answers 'what to do' while the dual answers 'what resources are worth'.",
    hint: "Think of primal as 'decisions' and dual as 'valuation'.",
    level: "basic",
    codeExample: "Primal: Max 40x₁ + 30x₂ s.t. constraints. Dual: Min 100y₁ + 80y₂ s.t. constraints."
  },
  {
    question: "How do you convert a maximization primal to its dual?",
    shortAnswer: "Convert to minimization, swap RHS and objective coefficients, transpose the constraint matrix, and determine sign restrictions.",
    explanation: "The process involves: 1) Changing the optimization direction from max to min, 2) Using RHS values as dual objective coefficients, 3) Using objective coefficients as dual RHS values, 4) Transposing the constraint matrix, 5) Determining sign restrictions based on constraint types.",
    hint: "Remember: Max → Min, constraints become variables, variables become constraints.",
    level: "intermediate",
    codeExample: "Primal: Max cᵀx s.t. Ax ≤ b, x ≥ 0. Dual: Min bᵀy s.t. Aᵀy ≥ c, y ≥ 0."
  },
  {
    question: "How do you convert a minimization primal to its dual?",
    shortAnswer: "Convert to maximization, swap RHS and objective coefficients, transpose the constraint matrix, and determine sign restrictions.",
    explanation: "The process is similar to maximization but in reverse: 1) Change from min to max, 2) Use RHS values as objective coefficients, 3) Use objective coefficients as RHS values, 4) Transpose the matrix, 5) Apply sign restrictions appropriately.",
    hint: "Min → Max, constraints become variables, variables become constraints.",
    level: "intermediate",
    codeExample: "Primal: Min cᵀx s.t. Ax ≥ b, x ≥ 0. Dual: Max bᵀy s.t. Aᵀy ≤ c, y ≥ 0."
  },
  {
    question: "What are the sign restrictions for dual variables?",
    shortAnswer: "Dual variable signs depend on primal constraint types: ≤ gives y ≥ 0, ≥ gives y ≤ 0, = gives y free.",
    explanation: "For a maximization primal: 1) If constraint is ≤, the dual variable is non-negative (y ≥ 0), 2) If constraint is ≥, the dual variable is non-positive (y ≤ 0), 3) If constraint is =, the dual variable is unrestricted (free). For minimization, these are reversed.",
    hint: "≤ constraints → y ≥ 0, ≥ constraints → y ≤ 0, = constraints → y free.",
    level: "intermediate",
    codeExample: "Primal ≤ 100 → y ≥ 0. Primal ≥ 50 → y ≤ 0. Primal = 20 → y free."
  },
  {
    question: "Why is the dual of the dual the original primal?",
    shortAnswer: "This symmetry property holds for problems in standard form because the duality transformation is mathematically invertible.",
    explanation: "The duality transformation involves transposition and swapping of variables and constraints. When applied twice, it returns to the original formulation. This mathematical symmetry confirms the consistency of duality theory and allows solving either formulation.",
    hint: "The dual operation is its own inverse in standard form.",
    level: "expert",
    codeExample: "Dual(Dual(Primal)) = Primal (in standard form)."
  },
  {
    question: "What is the economic meaning of a positive shadow price?",
    shortAnswer: "A positive shadow price means the resource is scarce, fully utilized, and has economic value.",
    explanation: "Economically, a positive shadow price indicates: 1) The resource is a bottleneck, 2) It's fully used in the optimal solution, 3) Additional units would increase profit or decrease cost, 4) The resource has positive economic value. This signals opportunities for investment.",
    hint: "Positive shadow price = scarce and valuable resource.",
    level: "intermediate",
    codeExample: "If y_labor = ₹100/hour, each additional labor hour increases profit by ₹100."
  },
  {
    question: "What is the economic meaning of a zero shadow price?",
    shortAnswer: "A zero shadow price means the resource is abundant, not fully utilized, and has no marginal value.",
    explanation: "Economically, a zero shadow price indicates: 1) The resource is in surplus, 2) It's not fully used in the optimal solution, 3) Additional units wouldn't improve the objective, 4) The resource has zero marginal value. This suggests the resource is not a bottleneck.",
    hint: "Zero shadow price = abundant resource with no marginal value.",
    level: "intermediate",
    codeExample: "If y_material = ₹0/kg, additional material doesn't increase profit."
  },
  {
    question: "How does complementary slackness help verify optimality?",
    shortAnswer: "Complementary slackness provides conditions that must hold at optimality, used to verify if a solution is optimal.",
    explanation: "At optimality: 1) If a constraint has slack, its dual variable must be zero, 2) If a dual variable is positive, its constraint must be tight, 3) If a variable is positive, its dual constraint must be tight, 4) If a dual constraint has slack, its variable must be zero. These conditions can be checked to verify optimality.",
    hint: "Check both primal and dual slackness conditions.",
    level: "expert",
    codeExample: "y_i × slack_i = 0 and x_j × slack_j = 0 at optimality."
  },
  {
    question: "What is the role of duality in sensitivity analysis?",
    shortAnswer: "Duality provides shadow prices that show how changes in constraints affect the optimal objective value.",
    explanation: "Shadow prices (dual variables) give sensitivity information: 1) They show the rate of change of the objective with respect to RHS changes, 2) They identify which constraints are most important, 3) They help in what-if analysis, 4) They guide decisions about resource changes. This is crucial for decision-making.",
    hint: "Shadow prices tell you how sensitive your solution is to changes.",
    level: "expert",
    codeExample: "∂Z*/∂b_i = y_i* (rate of change of optimal value with RHS)."
  },
  {
    question: "What is the duality gap and why is it important?",
    shortAnswer: "The duality gap is the difference between primal and dual objective values, indicating how far from optimality the solution is.",
    explanation: "The duality gap: 1) Is always non-negative (weak duality), 2) Becomes zero at optimality (strong duality), 3) Is used as a stopping criterion in algorithms, 4) Measures progress toward optimality, 5) Indicates how much improvement is possible. Tracking the gap helps in solution quality assessment.",
    hint: "Gap = Z - W (for max). Gap = 0 at optimality.",
    level: "intermediate",
    codeExample: "Gap = Z - W ≥ 0. Stop when gap < tolerance."
  },
  {
    question: "How does duality help in product pricing decisions?",
    shortAnswer: "Duality provides minimum product prices based on the cost of resources used, as measured by shadow prices.",
    explanation: "For pricing: 1) Calculate resource cost = Σ(Resource consumption × Shadow price), 2) This gives the minimum price for the product, 3) Products priced below this lose money, 4) Products priced above this create profit, 5) This ensures full cost recovery and profitability.",
    hint: "Price ≥ Resource cost at shadow prices.",
    level: "expert",
    codeExample: "Product cost = 2hrs × ₹100 + 1kg × ₹50 = ₹250 minimum price."
  },
  {
    question: "How does duality help in make-or-buy decisions?",
    shortAnswer: "Duality helps determine the true internal cost of making a product, which is compared to the external purchase price.",
    explanation: "The make-or-buy decision uses shadow prices to calculate: 1) Internal cost = Σ(Resources used × Shadow prices), 2) Compare internal cost to external purchase price, 3) If external price < internal cost, buy it, 4) If external price ≥ internal cost, make it. This ensures optimal sourcing decisions.",
    hint: "Make if internal cost ≤ external price. Buy if external price < internal cost.",
    level: "expert",
    codeExample: "Internal cost = 2 × ₹100 + 1 × ₹50 = ₹250. Buy if external price < ₹250."
  },
  {
    question: "What happens to the dual when the primal has equality constraints?",
    shortAnswer: "Equality constraints in the primal result in unrestricted (free) dual variables.",
    explanation: "When a primal constraint is an equality (=): 1) The corresponding dual variable has no sign restriction, 2) It can be positive, negative, or zero, 3) This reflects that equality constraints bind in both directions, 4) The dual variable is called 'free' or 'unrestricted'.",
    hint: "= constraints in primal = free variables in dual.",
    level: "expert",
    codeExample: "Primal: x₁ + x₂ = 10 → Dual: y is free (unrestricted)."
  },
  {
    question: "What is the relationship between primal and dual feasible regions?",
    shortAnswer: "The feasible regions are in different spaces (primal in variable space, dual in shadow price space) and are connected through weak duality.",
    explanation: "The primal feasible region P is in the space of decision variables. The dual feasible region D is in the space of shadow prices. Weak duality creates a relationship: every point in D provides a bound on every point in P. At optimality, the optimal points in both regions touch.",
    hint: "Different spaces but connected through duality.",
    level: "expert",
    codeExample: "x ∈ P, y ∈ D → Z(x) ≤ W(y) for max primal."
  },
  {
    question: "How does duality help in identifying bottlenecks?",
    shortAnswer: "Resources with positive shadow prices are bottlenecks—they're fully utilized and constrain production.",
    explanation: "To identify bottlenecks: 1) Check which dual variables are positive, 2) These correspond to resources that are fully utilized, 3) These resources constrain production and limit output, 4) They should be prioritized for investment and improvement, 5) Reducing these bottlenecks increases overall performance.",
    hint: "Positive shadow prices = bottlenecks needing attention.",
    level: "expert",
    codeExample: "If y_machine = ₹200/hour, machine time is a bottleneck."
  },
  {
    question: "What is the economic interpretation of dual constraints?",
    shortAnswer: "Dual constraints ensure that the value of resources used to make a product doesn't exceed its price.",
    explanation: "Each dual constraint corresponds to a product and states: 1) The cost of resources used must be at least the product price, 2) This prevents unprofitable production, 3) It ensures fair pricing, 4) It identifies products that should be produced, 5) It guides production decisions.",
    hint: "Dual constraints = fair pricing conditions.",
    level: "expert",
    codeExample: "Aᵀy ≥ c means resource cost ≥ product price."
  },
  {
    question: "How does duality extend to nonlinear programming?",
    shortAnswer: "Duality extends through Lagrangian duality, with weak duality always holding and strong duality requiring convexity.",
    explanation: "In nonlinear programming: 1) Lagrangian duality gives a dual problem, 2) Weak duality holds (dual ≤ primal for minimization), 3) Strong duality requires convexity and constraint qualification (Slater's condition), 4) Complementary slackness appears in KKT conditions, 5) The dual provides valuable bounds.",
    hint: "Convexity is key for strong duality in nonlinear problems.",
    level: "expert",
    codeExample: "L(x,λ) = f(x) + Σλᵢgᵢ(x) (Lagrangian)."
  },
  {
    question: "How do shadow prices guide resource allocation decisions?",
    shortAnswer: "Shadow prices show which resources generate the highest returns, guiding allocation to maximize overall performance.",
    explanation: "Resource allocation using shadow prices: 1) Compare shadow prices across resources, 2) Allocate additional units to resources with highest shadow prices, 3) Reallocate from low to high shadow price resources, 4) Consider range of optimality, 5) Balance investment across resources for optimal results.",
    hint: "Allocate to highest shadow prices first.",
    level: "expert",
    codeExample: "Labor shadow price ₹100 > machine shadow price ₹50 → allocate to labor first."
  },
  {
    question: "What is the significance of the dual objective value?",
    shortAnswer: "The dual objective value represents the total economic value of all resources at their shadow prices.",
    explanation: "The dual objective W = bᵀy: 1) Values each resource at its shadow price, 2) Sums these values for all resources, 3) At optimality, equals the primal objective, 4) Shows total resource value, 5) Provides economic interpretation of the solution.",
    hint: "Dual objective = total resource value.",
    level: "intermediate",
    codeExample: "W = 100(₹10) + 80(₹15) = ₹2,200 = total resource value."
  },
  {
    question: "How does duality help in portfolio optimization?",
    shortAnswer: "Duality in portfolio optimization reveals the market price of risk and helps balance risk and return.",
    explanation: "In portfolio optimization: 1) Primal maximizes returns subject to risk constraints, 2) Dual variables show the price of risk, 3) The dual reveals how much risk reduction is worth, 4) This helps investors make risk-return trade-offs, 5) Guides asset allocation decisions.",
    hint: "Dual in finance = market price of risk.",
    level: "expert",
    codeExample: "If risk shadow price = 0.5, reducing risk by 1% increases value by 0.5%."
  },
  {
    question: "What are the conditions for strong duality to hold?",
    shortAnswer: "Strong duality requires feasibility, boundedness, and for nonlinear problems, convexity and constraint qualification.",
    explanation: "Conditions for strong duality: 1) Both problems must have feasible solutions, 2) Both must have finite optimal values (bounded), 3) For linear programming, these are sufficient, 4) For nonlinear problems, convexity and constraint qualification (like Slater's condition) are needed, 5) These conditions ensure Z* = W*.",
    hint: "Feasibility + boundedness = strong duality for LPs.",
    level: "expert",
    codeExample: "LP: Feasible + Bounded → Z* = W*."
  },
  {
    question: "How does duality help in supply chain optimization?",
    shortAnswer: "Duality identifies bottlenecks in the supply chain and guides investment in capacity and resources.",
    explanation: "In supply chains: 1) Shadow prices identify bottlenecks (production, warehousing, transportation), 2) Guide investment in bottleneck resources, 3) Optimize inventory levels, 4) Determine optimal logistics strategies, 5) Evaluate supplier performance and value.",
    hint: "Supply chain bottlenecks = positive shadow prices.",
    level: "expert",
    codeExample: "If warehouse shadow price is high, invest in more warehouse capacity."
  },
  {
    question: "What is the relationship between shadow prices and opportunity cost?",
    shortAnswer: "Shadow prices represent the opportunity cost of using a resource in the current optimal solution.",
    explanation: "The shadow price is what you give up by using the resource in one way instead of another. It represents: 1) The value of the best alternative use, 2) What you sacrifice by using the resource here, 3) The true cost of resource usage, 4) What you should charge for using the resource.",
    hint: "Shadow price = opportunity cost of resource usage.",
    level: "expert",
    codeExample: "Labor shadow price ₹100/hour = opportunity cost of using labor here."
  },
  {
    question: "How does weak duality help in performance evaluation?",
    shortAnswer: "Weak duality provides upper/lower bounds on performance, helping set realistic targets and benchmarks.",
    explanation: "Weak duality helps evaluate performance by: 1) Providing theoretical maximum (for max problems), 2) Setting achievable targets, 3) Comparing actual performance to theoretical bounds, 4) Identifying areas for improvement, 5) Benchmarking against optimal possibilities.",
    hint: "The dual gives you the theoretical performance limit.",
    level: "expert",
    codeExample: "Target ≤ W (dual objective) for max primal."
  },
  {
    question: "How does duality help in evaluating new product opportunities?",
    shortAnswer: "Duality helps evaluate new products by comparing their price to the shadow-price cost of resources used.",
    explanation: "To evaluate a new product: 1) Calculate its resource consumption, 2) Multiply by shadow prices to get resource cost, 3) Compare to expected selling price, 4) If price ≥ cost, the product is profitable, 5) This guides new product development decisions.",
    hint: "Product profitable if price ≥ shadow-price cost.",
    level: "expert",
    codeExample: "New product uses ₹150 of resources at shadow prices. If price ≥ ₹150, it's profitable."
  },
  {
    question: "What is the economic significance of the dual of the dual property?",
    shortAnswer: "This symmetry property confirms that the economic interpretation is consistent and that both formulations are equally valid.",
    explanation: "The dual of the dual property: 1) Shows perfect symmetry in the relationship, 2) Confirms the consistency of economic interpretation, 3) Allows solving either formulation, 4) Ensures insights from one apply to the other, 5) Validates the mathematical and economic framework.",
    hint: "The symmetry confirms the economic consistency of duality.",
    level: "expert",
    codeExample: "Dual(Dual(Primal)) = Primal confirms economic equivalence."
  },
  {
    question: "How does duality help in understanding the concept of economic rent?",
    shortAnswer: "Shadow prices represent the economic rent or surplus value of scarce resources.",
    explanation: "Economic rent is the payment to a resource above its opportunity cost. Shadow prices: 1) Show the economic rent of scarce resources, 2) Represent surplus value created by constraints, 3) Help identify who captures this value, 4) Guide negotiation and pricing, 5) Indicate resource scarcity.",
    hint: "Shadow price = economic rent for scarce resources.",
    level: "expert",
    codeExample: "Labor shadow price ₹100/hour = economic rent to labor."
  },
  {
    question: "How does duality help in strategic planning?",
    shortAnswer: "Duality provides insights about resource values, bottlenecks, and opportunities that guide strategic decision-making.",
    explanation: "Strategic planning uses duality to: 1) Identify which resources are most valuable, 2) Determine where to invest for maximum return, 3) Evaluate strategic alternatives, 4) Assess competitive position, 5) Guide long-term resource allocation and capacity planning.",
    hint: "Duality reveals strategic opportunities and constraints.",
    level: "expert",
    codeExample: "High shadow prices indicate strategic investment opportunities."
  },
  {
    question: "What is the role of duality in optimization algorithms?",
    shortAnswer: "Duality provides stopping criteria, optimality certificates, and guides search directions in optimization algorithms.",
    explanation: "In algorithms: 1) The duality gap is used as a stopping criterion, 2) Dual feasibility helps verify optimality, 3) Reduced costs guide search directions, 4) Primal-dual algorithms solve both formulations, 5) Complementarity helps maintain feasibility.",
    hint: "Duality makes algorithms more efficient and reliable.",
    level: "expert",
    codeExample: "Stop when duality gap < tolerance."
  },
  {
    question: "How does the symmetry property help in verifying problem formulation?",
    shortAnswer: "The symmetry property serves as a consistency check: if Dual(Dual) ≠ Primal, there's an error in the formulation.",
    explanation: "To verify: 1) Form the dual of the problem, 2) Form the dual of that dual, 3) Check if it matches the original, 4) If it doesn't, there's an error in sign restrictions, constraint conversion, or variable mapping, 5) Use this to find and fix errors.",
    hint: "Use symmetry as a verification tool.",
    level: "expert",
    codeExample: "If Dual(Dual) ≠ Primal, check your dual formation."
  }
];

export default questions;