const questions = [
  {
    question: "What is the fundamental relationship between primal and dual problems?",
    shortAnswer: "The primal and dual are complementary formulations of the same optimization problem, with symmetric mathematical properties.",
    explanation: "The relationship is based on a mathematical transformation that swaps the roles of variables and constraints. The primal's variables become the dual's constraints, and the primal's constraints become the dual's variables. This symmetry is fundamental to optimization theory.",
    hint: "Think of it as two sides of the same coin - they represent the same problem from different angles.",
    level: "basic",
    codeExample: "Primal: max cᵀx s.t. Ax ≤ b, x ≥ 0\nDual: min bᵀy s.t. Aᵀy ≥ c, y ≥ 0"
  },
  {
    question: "What is weak duality and why is it important?",
    shortAnswer: "Weak duality states that the dual objective value provides a bound on the primal objective value for any feasible solutions.",
    explanation: "For a maximization primal, any feasible dual solution provides an upper bound on the primal objective. This property is crucial for: 1) Determining if a solution is optimal, 2) Providing stopping criteria for algorithms, 3) Establishing theoretical guarantees.",
    hint: "The dual always 'bounds' the primal - it's like a limit that the primal can't exceed.",
    level: "intermediate",
    codeExample: "For max primal: Z ≤ W for all feasible x and y."
  },
  {
    question: "What is strong duality and when does it hold?",
    shortAnswer: "Strong duality states that the optimal values of primal and dual are equal, holding under conditions of feasibility and boundedness.",
    explanation: "Strong duality holds when: 1) Both problems have feasible solutions, 2) The optimal objective values are finite (bounded), and 3) For nonlinear problems, convexity and constraint qualification conditions are satisfied. Strong duality means the duality gap is zero.",
    hint: "Strong duality means the primal and dual 'meet' at the optimal solution.",
    level: "intermediate",
    codeExample: "Z* = W* (optimal values are equal)."
  },
  {
    question: "What is complementary slackness and how is it used?",
    shortAnswer: "Complementary slackness states that at optimality, for each constraint, either the slack is zero or the corresponding dual variable is zero.",
    explanation: "This condition provides a powerful way to: 1) Verify optimality of solutions, 2) Find one optimal solution from the other, 3) Identify binding constraints. It's a fundamental property that links primal and dual optimal solutions.",
    hint: "Resources are either fully used (tight) or have zero shadow price.",
    level: "expert",
    codeExample: "If slack_i > 0 then y_i = 0. If y_i > 0 then slack_i = 0."
  },
  {
    question: "How does the duality gap relate to optimality?",
    shortAnswer: "The duality gap is the difference between primal and dual objective values, and it approaches zero as optimality is reached.",
    explanation: "The duality gap = Z - W (for maximization). When the gap is positive, the solution is not optimal. Algorithms track this gap as a measure of progress. When the gap reaches zero, optimality is achieved.",
    hint: "A zero duality gap means you've found the optimal solution.",
    level: "intermediate",
    codeExample: "Gap = Z - W ≥ 0 for max problems. Gap = 0 at optimality."
  },
  {
    question: "What is the economic interpretation of the primal-dual relationship?",
    shortAnswer: "The primal represents the decision-maker's perspective (what to do), while the dual represents the market's valuation (shadow prices).",
    explanation: "In economic terms: 1) Primal variables are actions/quantities, 2) Dual variables are prices/values, 3) Primal constraints are resource limits, 4) Dual constraints ensure fair pricing. The relationship shows how decisions and valuations are linked.",
    hint: "Think of it as the relationship between what you decide and what resources are worth.",
    level: "expert",
    codeExample: "Primal: Production decisions → Dual: Resource prices (shadow prices)."
  },
  {
    question: "How can duality be used for sensitivity analysis?",
    shortAnswer: "Dual variables (shadow prices) indicate how sensitive the objective is to changes in constraint RHS values.",
    explanation: "The dual variables show the marginal value of resources. If a constraint's RHS changes by δ, the objective changes by δ × y_i (the shadow price). This is crucial for 'what-if' analysis and determining the value of additional resources.",
    hint: "Shadow prices tell you how much you'd gain from having more of each resource.",
    level: "expert",
    codeExample: "∂Z*/∂b_i = y_i* (rate of change of optimal objective with RHS)."
  },
  {
    question: "What happens to the primal-dual relationship when one problem is infeasible?",
    shortAnswer: "If the primal is infeasible, the dual is either infeasible or unbounded (and vice versa).",
    explanation: "By Farkas' lemma, primal infeasibility implies dual unboundedness or infeasibility. This relationship helps identify problem formulation errors and provides insight into the structure of the problem.",
    hint: "Infeasibility in one problem signals issues in the other.",
    level: "expert",
    codeExample: "Primal infeasible → Dual unbounded or infeasible."
  },
  {
    question: "What is the relationship between primal and dual feasible regions?",
    shortAnswer: "The feasible regions are in different spaces (primal in variable space, dual in shadow price space) and are related through weak duality.",
    explanation: "The primal feasible region P is in the space of decision variables, while the dual feasible region D is in the space of shadow prices. Weak duality creates a relationship where every point in D provides a bound on every point in P.",
    hint: "Different spaces but connected through mathematical relationships.",
    level: "intermediate",
    codeExample: "x ∈ P, y ∈ D → Z(x) ≤ W(y) for max primal."
  },
  {
    question: "How does complementary slackness help find optimal solutions?",
    shortAnswer: "Complementary slackness provides equations that, along with feasibility, can solve for optimal primal and dual solutions.",
    explanation: "Using complementary slackness: 1) If a dual variable is positive, the corresponding primal constraint is tight, 2) If a primal constraint is loose, the dual variable is zero. This often reduces the problem to solving a system of equations.",
    hint: "Tight constraints correspond to positive shadow prices.",
    level: "expert",
    codeExample: "y_i > 0 → A_ix = b_i. Slack > 0 → y_i = 0."
  },
  {
    question: "What is the significance of the primal-dual relationship in algorithms?",
    shortAnswer: "Primal-dual relationships are used in algorithms to provide optimality certificates and guide search directions.",
    explanation: "Modern algorithms use duality for: 1) Stopping criteria (duality gap), 2) Optimality verification, 3) Direction finding (reduced costs), 4) Sensitivity analysis. Primal-dual interior-point methods solve both problems simultaneously.",
    hint: "Algorithms use both primal and dual to find the solution efficiently.",
    level: "expert",
    codeExample: "Duality gap used as stopping criterion in interior-point methods."
  },
  {
    question: "How does the symmetry property of duality manifest mathematically?",
    shortAnswer: "The dual of the dual gives back the original primal (for problems in standard form).",
    explanation: "This mathematical symmetry shows that the transformation is reversible. If you start with a primal, form its dual, and then form the dual of that dual, you return to the original primal. This confirms the perfect symmetry of the relationship.",
    hint: "The dual operation is its own inverse in standard form.",
    level: "intermediate",
    codeExample: "Dual(Dual(Primal)) = Primal."
  },
  {
    question: "What is the role of duality in portfolio optimization?",
    shortAnswer: "In portfolio optimization, duality reveals the market price of risk and the value of investment constraints.",
    explanation: "The primal maximizes returns while managing risk. The dual's shadow prices show: 1) The marginal value of risk reduction, 2) The market price of risk, 3) The value of relaxing investment constraints. This helps investors make informed decisions.",
    hint: "Dual in portfolio optimization = risk pricing.",
    level: "expert",
    codeExample: "Dual variables show the cost of risk and value of returns."
  },
  {
    question: "How does the primal-dual relationship help in production planning?",
    shortAnswer: "The primal decides production quantities, while the dual values resources, helping managers allocate resources efficiently.",
    explanation: "In production: 1) Primal maximizes profit by choosing product mix, 2) Dual determines shadow prices of resources, 3) Managers use shadow prices to decide which resources to invest in, 4) Products with positive reduced costs are candidates for increased production.",
    hint: "Primal = what to produce, Dual = how much resources are worth.",
    level: "expert",
    codeExample: "Shadow prices guide investment in additional resources."
  },
  {
    question: "What is the relationship between primal and dual optimal objective values?",
    shortAnswer: "For feasible and bounded problems, the optimal objective values are equal (strong duality).",
    explanation: "At optimality, Z* = W*. This is the fundamental theorem of duality. It means solving either the primal or the dual gives the same optimal value. This equality is used to verify optimality and design algorithms.",
    hint: "The optimal values always meet at the top (or bottom) of the problem.",
    level: "intermediate",
    codeExample: "Z* = W* = optimal value."
  },
  {
    question: "How does duality help in identifying binding constraints?",
    shortAnswer: "Binding constraints have positive dual variables (shadow prices), while non-binding constraints have zero dual variables.",
    explanation: "At optimality: 1) If a constraint is binding (tight), its shadow price is positive, 2) If a constraint is non-binding (loose), its shadow price is zero. This makes duality essential for identifying bottlenecks and resource constraints.",
    hint: "Positive shadow price = binding constraint.",
    level: "expert",
    codeExample: "y_i > 0 → constraint i is binding. y_i = 0 → constraint i is not binding."
  },
  {
    question: "What is the role of duality in linear programming optimality conditions?",
    shortAnswer: "Duality provides necessary and sufficient conditions for optimality through primal and dual feasibility plus strong duality.",
    explanation: "The optimality conditions for an LP are: 1) Primal feasibility, 2) Dual feasibility, 3) Strong duality (equal objective values). These conditions are both necessary and sufficient, providing a complete characterization of optimal solutions.",
    hint: "Optimality = primal feasible + dual feasible + equal objectives.",
    level: "expert",
    codeExample: "x* optimal iff x* feasible, y* feasible, and Z* = W*."
  },
  {
    question: "How does duality extend to integer programming?",
    shortAnswer: "Integer programming has a weak dual (Lagrangian dual) that provides bounds, but strong duality doesn't generally hold.",
    explanation: "For integer programs: 1) The LP relaxation dual gives lower/upper bounds, 2) Lagrangian relaxation provides dual bounds, 3) Strong duality typically fails due to the integrality gap. This gap indicates how much is lost by enforcing integrality.",
    hint: "Integer programming has a duality gap due to integrality constraints.",
    level: "expert",
    codeExample: "IP optimal value ≥ LP dual value (for minimization with integrality gap)."
  },
  {
    question: "What is the relationship between primal slack variables and dual variables?",
    shortAnswer: "Primal slack variables and dual variables are linked through complementary slackness at optimality.",
    explanation: "Each primal constraint has a slack variable (amount of unused resource). At optimality: 1) If slack is positive, the dual variable is zero, 2) If dual variable is positive, slack is zero. This relationship provides a direct link between unused capacity and resource value.",
    hint: "Unused resources have zero value.",
    level: "expert",
    codeExample: "If slack_1 = 5 (unused resource), then y_1 = 0 (zero shadow price)."
  },
  {
    question: "How does duality help in understanding the shadow price concept?",
    shortAnswer: "Dual variables are precisely the shadow prices that indicate the marginal value of resources.",
    explanation: "A shadow price is the amount the objective function would improve per unit increase in a constraint's RHS. The dual variables are these shadow prices. They provide: 1) Resource valuation, 2) Investment guidance, 3) Sensitivity information.",
    hint: "Shadow price = how much the objective changes per unit of resource increase.",
    level: "expert",
    codeExample: "If y_1 = ₹75, increasing Resource 1 by 1 unit increases profit by ₹75."
  },
  {
    question: "What is the economic interpretation of complementary slackness?",
    shortAnswer: "Complementary slackness means that resources with zero shadow price are in surplus, and resources with positive shadow price are fully utilized.",
    explanation: "Economically: 1) Scarce resources (fully used) have positive value, 2) Abundant resources (not fully used) have zero value, 3) This helps identify bottlenecks and opportunities. It's the economic principle that only scarce resources command a price.",
    hint: "Only resources that are fully used have economic value.",
    level: "expert",
    codeExample: "Full utilization = positive shadow price. Surplus = zero shadow price."
  },
  {
    question: "How does the primal-dual relationship help in algorithm design?",
    shortAnswer: "Algorithms can track both primal and dual solutions, using the duality gap as a stopping criterion.",
    explanation: "Many optimization algorithms work by: 1) Maintaining both primal and dual feasible solutions, 2) Reducing the duality gap iteratively, 3) Stopping when the gap is sufficiently small. This provides rigorous optimality guarantees.",
    hint: "Duality gap provides a measure of how close you are to optimality.",
    level: "expert",
    codeExample: "Primal-dual interior-point methods simultaneously update both solutions."
  },
  {
    question: "What happens to the primal-dual relationship when constraints are added?",
    shortAnswer: "Adding constraints to the primal adds variables to the dual, changing the feasible region and potentially improving the objective.",
    explanation: "When you add a constraint to the primal: 1) The dual gains a new variable, 2) The dual feasible region changes, 3) The optimal value can only get worse (for max) or better (for min). The dual perspective shows why constraints can be valuable.",
    hint: "More constraints in primal = more variables in dual.",
    level: "expert",
    codeExample: "Adding constraint to max primal may decrease optimal value."
  },
  {
    question: "How does duality help in solving large-scale optimization problems?",
    shortAnswer: "Duality often provides a way to decompose large problems into smaller, more manageable subproblems.",
    explanation: "In large-scale optimization: 1) The dual might have fewer variables, making it easier to solve, 2) Lagrangean relaxation uses duality to decompose problems, 3) Decomposition algorithms (like Dantzig-Wolfe) exploit dual structure.",
    hint: "Duality can make big problems smaller and more manageable.",
    level: "expert",
    codeExample: "Decomposition: Solve small subproblems, coordinate through dual variables."
  },
  {
    question: "What is the relationship between primal and dual extreme points?",
    shortAnswer: "There is a one-to-one correspondence between primal and dual extreme points at optimality.",
    explanation: "At optimality: 1) Each extreme point of the primal corresponds to a complementary extreme point of the dual, 2) The bases are related through complementary slackness, 3) This relationship is used in the simplex method to maintain both solutions.",
    hint: "Primal and dual extreme points are matched through complementary slackness.",
    level: "expert",
    codeExample: "Primal basic feasible solution ↔ Dual basic feasible solution."
  },
  {
    question: "How does duality handle problems with equality constraints?",
    shortAnswer: "Equality constraints in the primal produce unrestricted (free) variables in the dual.",
    explanation: "When the primal has equality (=) constraints: 1) The corresponding dual variables have no sign restrictions, 2) They can be positive, negative, or zero, 3) This reflects that equality constraints can be binding from either direction.",
    hint: "Equalities in primal = free variables in dual.",
    level: "expert",
    codeExample: "Primal = constraint → Dual variable free (unrestricted)."
  },
  {
    question: "What is the practical significance of the dual-of-dual property?",
    shortAnswer: "The dual-of-dual property confirms the symmetry of the relationship and allows solving either formulation.",
    explanation: "This property means: 1) You can solve the dual instead of the primal if it's easier, 2) The relationship is completely symmetric, 3) Insights from the dual can be transferred back to the primal. It provides flexibility in problem-solving.",
    hint: "You can choose the easier problem to solve - both give the same answer.",
    level: "intermediate",
    codeExample: "If dual is easier to solve, solve it and use complementary slackness for primal."
  },
  {
    question: "How does duality help in understanding the value of information?",
    shortAnswer: "Dual variables show the value of having additional information about constraints or resources.",
    explanation: "Shadow prices indicate: 1) The value of better estimates of resource availability, 2) The benefit of reducing uncertainty in constraints, 3) How much to invest in better information. This is crucial in decision-making under uncertainty.",
    hint: "The value of information = expected improvement in objective × shadow prices.",
    level: "expert",
    codeExample: "Better information → better decisions → higher objective value."
  }
];

export default questions;