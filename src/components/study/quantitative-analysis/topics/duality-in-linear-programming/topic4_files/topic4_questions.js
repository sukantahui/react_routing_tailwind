const questions = [
  {
    question: "What are the four basic duality properties in linear programming?",
    shortAnswer: "The four basic properties are: Weak Duality, Strong Duality, Complementary Slackness, and the Symmetry Property.",
    explanation: "These properties form the theoretical foundation of duality: 1) Weak Duality: dual provides bounds on primal, 2) Strong Duality: optimal values are equal, 3) Complementary Slackness: links primal and dual optimal solutions, 4) Symmetry: dual of dual is primal. They work together to provide a complete framework.",
    hint: "Think of them as the four pillars of duality theory.",
    level: "basic",
    codeExample: "Weak: Z ≤ W, Strong: Z* = W*, Complementary: y_i × slack_i = 0, Symmetry: Dual(Dual) = Primal."
  },
  {
    question: "What is the statement of weak duality in linear programming?",
    shortAnswer: "For any feasible primal solution x and any feasible dual solution y, the dual objective provides a bound on the primal objective.",
    explanation: "If the primal is a maximization problem, Z(x) ≤ W(y) for all feasible x and y. If the primal is a minimization problem, W(y) ≤ Z(x). This property establishes that the dual objective is always a bound on the primal objective.",
    hint: "The dual always 'bounds' the primal.",
    level: "basic",
    codeExample: "For max primal: Z(x) ≤ W(y) for all feasible x, y."
  },
  {
    question: "What is the statement of strong duality in linear programming?",
    shortAnswer: "If both primal and dual have optimal solutions, then their optimal objective values are equal.",
    explanation: "Strong duality states that Z* = W* when both problems have optimal solutions and are feasible and bounded. This means the duality gap is zero at optimality. It's the fundamental theorem that makes duality useful for solving problems.",
    hint: "At optimality, the primal and dual values meet.",
    level: "intermediate",
    codeExample: "Z* = W* (optimal values are equal)."
  },
  {
    question: "What is complementary slackness in linear programming?",
    shortAnswer: "Complementary slackness states that at optimality, either a constraint is tight or its corresponding dual variable is zero.",
    explanation: "For each constraint: y_i × (b_i - A_i x) = 0 and x_j × (A_j^T y - c_j) = 0. This means: 1) If a constraint has slack, the dual variable is zero, 2) If a dual variable is positive, the constraint is tight, 3) If a variable is positive, the dual constraint is tight.",
    hint: "Resources either have value (positive shadow price) or are unused (zero shadow price).",
    level: "intermediate",
    codeExample: "If slack_i > 0 then y_i = 0. If y_i > 0 then slack_i = 0."
  },
  {
    question: "What is the symmetry property of duality?",
    shortAnswer: "The dual of the dual problem is the original primal problem.",
    explanation: "For problems in standard form: Dual(Dual(Primal)) = Primal. This means the relationship between primal and dual is perfectly symmetric. It shows that you can choose to solve either formulation and get the same results.",
    hint: "The dual operation is its own inverse.",
    level: "intermediate",
    codeExample: "Dual(Dual(Primal)) = Primal (in standard form)."
  },
  {
    question: "What is the duality gap and how is it related to weak and strong duality?",
    shortAnswer: "The duality gap is the difference between primal and dual objective values, and it's related to the gap between weak and strong duality.",
    explanation: "The duality gap = Z - W (for maximization). Weak duality ensures the gap is non-negative (Z ≤ W). Strong duality states the gap is zero at optimality (Z* = W*). The gap measures how far from optimality the current solution is.",
    hint: "The gap shrinks from positive to zero as you approach optimality.",
    level: "expert",
    codeExample: "Gap = Z - W ≥ 0. Gap = 0 at optimality."
  },
  {
    question: "How does complementary slackness help in finding optimal solutions?",
    shortAnswer: "Complementary slackness provides a system of equations that can be solved along with feasibility to find optimal solutions.",
    explanation: "Using complementary slackness: 1) If a constraint has slack, the dual variable is zero, 2) If a dual variable is positive, the constraint is tight. This often reduces the problem to solving a system of equations, making it easier to find optimal solutions.",
    hint: "Complementary slackness turns inequalities into equations at optimality.",
    level: "expert",
    codeExample: "y_i > 0 → A_i x = b_i. slack > 0 → y_i = 0."
  },
  {
    question: "What are the conditions for strong duality to hold?",
    shortAnswer: "Strong duality requires both problems to be feasible and bounded, and for non-linear problems, convexity and constraint qualification conditions.",
    explanation: "For linear programming, strong duality holds whenever both problems have feasible solutions and finite optimal values. For non-linear problems, additional conditions like Slater's condition (strict feasibility) or other constraint qualifications are needed.",
    hint: "Feasibility + boundedness = strong duality for LPs.",
    level: "expert",
    codeExample: "LP: Feasible + Bounded → Z* = W*."
  },
  {
    question: "What is the economic interpretation of complementary slackness?",
    shortAnswer: "Complementary slackness means that only scarce resources have value, and only valuable resources are fully used.",
    explanation: "Economically: 1) Resources with zero shadow price are in surplus, 2) Resources with positive shadow price are fully utilized, 3) Products that are produced have zero reduced cost, 4) Products not produced have positive reduced cost. This reflects the market principle of scarcity.",
    hint: "Scarce resources have value; abundant resources don't.",
    level: "expert",
    codeExample: "Surplus resource → zero shadow price. Scarce resource → positive shadow price."
  },
  {
    question: "How does the symmetry property benefit problem solving?",
    shortAnswer: "The symmetry property allows you to choose the easier of the two problems (primal or dual) to solve.",
    explanation: "Since Dual(Dual) = Primal, you can: 1) Solve the dual if it has fewer variables/constraints, 2) Get the primal solution from the dual using complementary slackness, 3) Verify results by checking both formulations, 4) Choose the formulation that's computationally more efficient.",
    hint: "Pick the formulation that's easier to solve.",
    level: "expert",
    codeExample: "If dual has fewer variables, solve dual and use complementary slackness for primal."
  },
  {
    question: "How do the four duality properties work together?",
    shortAnswer: "The four properties work together to provide a complete theoretical and practical framework for optimization.",
    explanation: "They work in sequence: 1) Weak duality gives bounds, 2) Strong duality confirms optimality, 3) Complementary slackness links solutions, 4) Symmetry provides flexibility. Together, they allow verification, solution finding, and efficient problem solving.",
    hint: "Each property builds on the previous ones.",
    level: "expert",
    codeExample: "Weak → Strong → Complementary → Symmetry."
  },
  {
    question: "How can weak duality be used to check if a solution is optimal?",
    shortAnswer: "If you find a primal feasible solution x and a dual feasible solution y with Z = W, then both are optimal by strong duality.",
    explanation: "By weak duality, Z ≤ W (for max). If you find feasible solutions with equal objective values, then Z* = W* and both are optimal. This is the standard way to prove optimality in linear programming.",
    hint: "Equal objective values + feasibility = optimality.",
    level: "intermediate",
    codeExample: "If Z = W and both feasible, then optimality is proven."
  },
  {
    question: "What is the relationship between complementary slackness and sensitivity analysis?",
    shortAnswer: "Complementary slackness identifies which constraints are binding and have positive shadow prices, guiding sensitivity analysis.",
    explanation: "Complementary slackness tells us: 1) Which constraints are binding (these have positive shadow prices), 2) Which constraints are non-binding (these have zero shadow prices), 3) This information is used in sensitivity analysis to determine how changes affect the objective.",
    hint: "Binding constraints are the ones that matter in sensitivity analysis.",
    level: "expert",
    codeExample: "Binding constraints → positive shadow prices → sensitivity information available."
  },
  {
    question: "How does weak duality help in algorithm design?",
    shortAnswer: "Weak duality provides stopping criteria and performance bounds for optimization algorithms.",
    explanation: "Algorithms use weak duality to: 1) Check if a solution is close to optimal (by comparing primal and dual), 2) Provide performance guarantees, 3) Determine when to stop iterations, 4) Measure progress toward optimality.",
    hint: "The duality gap tells you how far from optimality you are.",
    level: "expert",
    codeExample: "Stop when Z ≈ W (duality gap is small)."
  },
  {
    question: "What happens to the duality properties when one problem is infeasible?",
    shortAnswer: "If one problem is infeasible, the other is either infeasible or unbounded, affecting the duality properties.",
    explanation: "If primal is infeasible: 1) Dual is either infeasible or unbounded, 2) Strong duality doesn't hold (no optimal values), 3) Weak duality still applies where feasible solutions exist. If dual is infeasible, similar results apply.",
    hint: "Infeasibility in one problem signals issues in the other.",
    level: "expert",
    codeExample: "Primal infeasible → Dual unbounded or infeasible."
  },
  {
    question: "How does strong duality relate to the concept of optimality?",
    shortAnswer: "Strong duality provides necessary and sufficient conditions for optimality in linear programming.",
    explanation: "A solution is optimal if and only if: 1) Primal feasible, 2) Dual feasible, and 3) Z = W (strong duality). This gives a complete characterization of optimality and is used to verify and prove optimality.",
    hint: "Optimality = feasibility + strong duality.",
    level: "expert",
    codeExample: "x* optimal iff x* feasible, y* feasible, and Z* = W*."
  },
  {
    question: "What is the role of symmetry property in verifying problem formulations?",
    shortAnswer: "The symmetry property helps verify that the dual formulation is correct by checking if the dual of the dual returns to the original.",
    explanation: "To verify a dual formulation: 1) Form the dual of the proposed dual, 2) Check if it matches the original primal, 3) If not, there's an error in the formulation, 4) This property serves as a consistency check.",
    hint: "Use symmetry to check if you've formed the dual correctly.",
    level: "intermediate",
    codeExample: "If Dual(Dual) ≠ Primal, something is wrong."
  },
  {
    question: "How can complementary slackness be used to find the optimal dual solution?",
    shortAnswer: "Given the optimal primal solution, complementary slackness can be used to solve for the optimal dual variables.",
    explanation: "If you know the optimal primal x*: 1) For variables with x_j* > 0, the dual constraints are tight, 2) For constraints with slack, the dual variables are zero, 3) This often reduces the dual to a small system of equations that can be solved.",
    hint: "The primal optimal solution tells you which dual equations to solve.",
    level: "expert",
    codeExample: "x_j* > 0 → A_j^T y = c_j. slack_i > 0 → y_i = 0."
  },
  {
    question: "What is the significance of the duality gap in interior-point methods?",
    shortAnswer: "Interior-point methods track the duality gap as a measure of progress toward optimality.",
    explanation: "In interior-point methods: 1) The duality gap is used as a stopping criterion, 2) The algorithm reduces the gap iteratively, 3) When the gap is below a tolerance, the solution is accepted as optimal, 4) This provides a rigorous optimality guarantee.",
    hint: "The duality gap is your measure of progress.",
    level: "expert",
    codeExample: "Stop when duality gap < tolerance."
  },
  {
    question: "How does weak duality help in proving infeasibility?",
    shortAnswer: "If you can find a dual solution that makes the weak duality bound impossible, you've proven infeasibility.",
    explanation: "For a maximization problem: If you find a dual solution with W < Z_0 (where Z_0 is some primal value), and if Z is unbounded above, the primal must be infeasible. This is related to Farkas' lemma and is used in infeasibility proofs.",
    hint: "Bounds from weak duality can prove when a problem is impossible to solve.",
    level: "expert",
    codeExample: "If W < Z for all feasible Z, problem is infeasible."
  },
  {
    question: "What is the relationship between strong duality and the complementary slackness conditions?",
    shortAnswer: "Strong duality and complementary slackness are equivalent—one implies the other.",
    explanation: "At optimality: 1) Strong duality (Z* = W*) implies complementary slackness, 2) Complementary slackness plus feasibility implies strong duality. They are two sides of the same optimality condition.",
    hint: "They're equivalent ways of expressing optimality.",
    level: "expert",
    codeExample: "Z* = W* ⇔ Complementary slackness holds."
  },
  {
    question: "How do the duality properties extend to non-linear programming?",
    shortAnswer: "The concepts extend, but additional conditions (like convexity) are needed for strong duality.",
    explanation: "For non-linear programming: 1) Weak duality holds for Lagrangian duality, 2) Strong duality requires convexity and constraint qualification, 3) Complementary slackness (KKT conditions) includes complementary slackness, 4) Symmetry is not as direct as in linear programming.",
    hint: "Convexity is key for strong duality in non-linear problems.",
    level: "expert",
    codeExample: "Convex NLP: Weak duality holds, strong duality under constraint qualification."
  },
  {
    question: "What are the practical applications of complementary slackness in business?",
    shortAnswer: "Complementary slackness is used to identify bottlenecks, value resources, and make strategic decisions.",
    explanation: "In business: 1) Identify scarce resources from positive shadow prices, 2) Make investment decisions based on shadow prices, 3) Determine product profitability, 4) Guide resource allocation, 5) Optimize production planning.",
    hint: "Complementary slackness tells you what's actually valuable.",
    level: "expert",
    codeExample: "Positive shadow prices = scarce resources = investment opportunities."
  },
  {
    question: "How does weak duality help in setting performance targets?",
    shortAnswer: "Weak duality provides achievable targets by giving upper/lower bounds on performance.",
    explanation: "For a maximization problem: 1) Any feasible dual solution gives an upper bound on possible profit, 2) This helps set realistic targets, 3) It shows the maximum possible improvement, 4) It helps in performance evaluation and benchmarking.",
    hint: "The dual gives you the theoretical maximum you can achieve.",
    level: "expert",
    codeExample: "Target ≤ W (dual objective) for max primal."
  },
  {
    question: "What is the role of strong duality in proving algorithmic convergence?",
    shortAnswer: "Strong duality provides the theoretical guarantee that algorithms converge to the optimal solution.",
    explanation: "Strong duality ensures that: 1) There exists a finite optimal value, 2) Algorithms can converge to this value, 3) The duality gap can be used to measure convergence, 4) It provides the theoretical foundation for algorithmic convergence proofs.",
    hint: "Strong duality guarantees that optimization is possible.",
    level: "expert",
    codeExample: "Algorithm converges to Z* = W*."
  },
  {
    question: "How does the symmetry property help in teaching duality?",
    shortAnswer: "The symmetry property makes duality easier to understand by showing it's a two-way relationship.",
    explanation: "The symmetry property helps teaching by: 1) Showing that primal and dual are equally important, 2) Making the relationship more intuitive, 3) Allowing students to verify their understanding, 4) Demonstrating the elegance of the duality concept.",
    hint: "The symmetry shows that duality isn't one-way.",
    level: "intermediate",
    codeExample: "Explain duality as a symmetric relationship."
  },
  {
    question: "What are the computational implications of the duality properties?",
    shortAnswer: "Duality properties enable efficient algorithms and provide rigorous solution verification.",
    explanation: "Computationally: 1) Weak duality gives bounds, 2) Strong duality confirms optimality, 3) Complementary slackness helps construct solutions, 4) Symmetry allows choosing the easier problem. This makes optimization algorithms efficient and reliable.",
    hint: "Duality makes optimization algorithms better.",
    level: "expert",
    codeExample: "Primal-dual algorithms use all four properties."
  },
  {
    question: "How can the duality gap be used to improve solutions?",
    shortAnswer: "The duality gap shows how much room there is for improvement and guides search for better solutions.",
    explanation: "Using the duality gap: 1) A positive gap indicates improvement is possible, 2) The magnitude shows how much improvement is possible, 3) The gap can guide where to search for better solutions, 4) Reducing the gap is the goal of optimization algorithms.",
    hint: "The duality gap tells you how far from optimal you are.",
    level: "expert",
    codeExample: "Gap > 0 → Improvement possible. Gap = 0 → Optimal."
  },
  {
    question: "What is the relationship between strong duality and the concept of economic equilibrium?",
    shortAnswer: "Strong duality represents economic equilibrium where resource values equal the value of output.",
    explanation: "In economic terms: 1) Strong duality means total resource value equals total output value, 2) This represents market equilibrium, 3) Shadow prices are equilibrium prices, 4) Production is at equilibrium where supply equals demand, 5) No arbitrage opportunities exist.",
    hint: "Strong duality = economic equilibrium.",
    level: "expert",
    codeExample: "Total resource value = Total output value at equilibrium."
  },
  {
    question: "How do duality properties help in understanding the limits of optimization?",
    shortAnswer: "Duality properties show the theoretical limits of what can be achieved in optimization problems.",
    explanation: "The properties reveal: 1) Weak duality gives theoretical bounds, 2) Strong duality shows the theoretical optimum, 3) Complementary slackness shows what's possible, 4) Symmetry shows the consistency of the theory. This helps understand fundamental limitations.",
    hint: "Duality reveals the theoretical limits of optimization.",
    level: "expert",
    codeExample: "Boundary of what's achievable is given by duality."
  }
];

export default questions;