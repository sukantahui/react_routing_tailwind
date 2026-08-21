// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is the primary purpose of Linear Programming?",
    shortAnswer: "To optimize (maximize or minimize) a linear objective function subject to linear constraints.",
    explanation: "Linear Programming aims to find the best possible outcome—such as maximum profit or minimum cost—given a set of limiting resources. It is a mathematical technique for decision-making under constraints.",
    hint: "Think of it as making the most out of limited resources.",
    level: "basic",
    codeExample: "maximize Z = 3x + 2y subject to x + y ≤ 5, x ≥ 0, y ≥ 0"
  },
  {
    question: "Name the four essential components of any LP model.",
    shortAnswer: "Decision variables, objective function, constraints, and non-negativity restrictions.",
    explanation: "These four pillars define every LP problem: what you control (variables), what you want to optimise (objective), what limits you (constraints), and that variables cannot be negative.",
    hint: "Remember the acronym D.O.C.N.",
    level: "basic"
  },
  {
    question: "Why is non-negativity a requirement in most LP problems?",
    shortAnswer: "Because decision variables usually represent physical quantities (e.g., units produced, hours worked) that cannot be negative.",
    explanation: "In real-world scenarios, negative production or negative resource usage makes no sense. Non-negativity ensures the solution is practically meaningful.",
    hint: "Can you produce -5 units of a product?",
    level: "basic"
  },
  {
    question: "Who developed the Simplex Method, and in which year?",
    shortAnswer: "George Dantzig in 1947.",
    explanation: "Dantzig introduced the Simplex Method while working for the U.S. Air Force. It became the cornerstone algorithm for solving LP problems and is still widely used today.",
    hint: "Think of a mathematician who worked on optimisation for the military.",
    level: "moderate"
  },
  {
    question: "What does 'linear' mean in Linear Programming?",
    shortAnswer: "All mathematical relationships (objective and constraints) are linear—no squares, products, or other non-linear terms.",
    explanation: "A linear function has the form a₁x₁ + a₂x₂ + … + aₙxₙ. This guarantees the solution space is convex and allows efficient optimisation.",
    hint: "Linear means each variable appears only to the first power and not multiplied together.",
    level: "moderate"
  },
  {
    question: "Why must the objective function and constraints be linear in LP?",
    shortAnswer: "To ensure the problem is convex and can be solved efficiently using algorithms like the Simplex Method.",
    explanation: "Linearity guarantees that the feasible region is a convex polyhedron, and the optimal solution lies at a vertex. Non-linear problems require different techniques.",
    hint: "What happens to the geometry if you add x²?",
    level: "expert"
  },
  {
    question: "Give two real‑world applications of LP in healthcare.",
    shortAnswer: "Staff scheduling and resource allocation (e.g., operating room usage, patient flow).",
    explanation: "Hospitals use LP to assign nurses to shifts, allocate beds, and schedule surgeries to minimise waiting times while respecting constraints like staff availability.",
    hint: "Think about how hospitals manage their limited resources.",
    level: "moderate"
  },
  {
    question: "What is the feasible region in an LP problem?",
    shortAnswer: "The set of all points that satisfy all constraints, including non-negativity.",
    explanation: "The feasible region is the intersection of half‑planes defined by the constraints. Any point inside or on the boundary represents a possible solution.",
    hint: "It's the 'allowed area' where all rules are obeyed.",
    level: "basic"
  },
  {
    question: "Why does the optimal solution of an LP always occur at a corner point (vertex) of the feasible region?",
    shortAnswer: "Because the objective function is linear; if a maximum exists, it will be at an extreme point of the convex feasible region.",
    explanation: "This is a fundamental theorem of LP. The linear objective increases (or decreases) steadily across the region, so the extreme values occur at vertices.",
    hint: "Think about moving a straight line across a polygon—where does it touch last?",
    level: "expert"
  },
  {
    question: "What is the difference between a maximization and a minimization problem in LP?",
    shortAnswer: "Maximization seeks the largest possible value of the objective, while minimization seeks the smallest possible value.",
    explanation: "Both are solved with the same methods; a minimization can be converted to maximization by multiplying the objective by -1.",
    hint: "Profit is maximized; cost is minimized.",
    level: "basic"
  },
  {
    question: "Name three industries where LP is commonly applied.",
    shortAnswer: "Manufacturing, transportation/logistics, and finance.",
    explanation: "LP is versatile: it optimises production planning, route scheduling, and portfolio allocation in these sectors.",
    hint: "Think of companies that produce goods, move goods, or manage money.",
    level: "moderate"
  },
  {
    question: "What is a 'decision variable' in LP?",
    shortAnswer: "A variable that represents a quantity that the decision‑maker can control.",
    explanation: "Example: number of units to produce of product A, or hours to allocate to a machine. They are the unknowns we solve for.",
    hint: "It's what you decide.",
    level: "basic"
  },
  {
    question: "Explain the 'objective function' with an example.",
    shortAnswer: "A linear expression that we want to maximise or minimise (e.g., profit = 3x + 2y).",
    explanation: "It quantifies the goal of the problem. For a production problem, it might be total profit; for a diet problem, total cost.",
    hint: "It's what you want to achieve.",
    level: "basic"
  },
  {
    question: "What is the role of constraints in an LP model?",
    shortAnswer: "They limit the values of decision variables based on available resources or requirements.",
    explanation: "Constraints reflect real‑world limitations like labour hours, raw materials, budget, or demand. They define the feasible region.",
    hint: "They are the rules you must follow.",
    level: "basic"
  },
  {
    question: "Why is it important to define the units of decision variables clearly?",
    shortAnswer: "To avoid inconsistency and misinterpretation when writing constraints and the objective.",
    explanation: "If x is in hours and y in kilograms, you cannot add them directly. Consistent units ensure the model is mathematically valid.",
    hint: "What happens if you mix apples and oranges?",
    level: "moderate"
  },
  {
    question: "What is the significance of George Dantzig's work in the context of LP?",
    shortAnswer: "He developed the Simplex Method, the first efficient algorithm for solving LP problems.",
    explanation: "Before Dantzig, LP was a theoretical concept. The Simplex Method made it practical and widely adopted in industry.",
    hint: "He gave us a tool to solve LP problems on computers.",
    level: "moderate"
  },
  {
    question: "Can LP handle problems with integer restrictions on variables?",
    shortAnswer: "No, classical LP assumes continuous variables; integer restrictions require Integer Programming (IP) or Mixed-Integer Programming (MIP).",
    explanation: "LP's linearity allows fractional solutions. If you need whole numbers (e.g., number of machines), you must use IP.",
    hint: "Can you produce 2.5 cars?",
    level: "expert"
  },
  {
    question: "What does a 'constraint' like 'x + 2y ≤ 10' mean in words?",
    shortAnswer: "The sum of x and two times y must not exceed 10.",
    explanation: "It indicates a resource limit. For example, if x and y are products, it might represent total machine hours available.",
    hint: "Think of a budget: you cannot spend more than 10.",
    level: "basic"
  },
  {
    question: "How does LP help in advertising budget allocation?",
    shortAnswer: "By maximising reach or response subject to budget and media constraints.",
    explanation: "LP can decide how much to spend on TV, radio, and online ads to get the maximum exposure while staying within budget.",
    hint: "What would you want to maximise? Audience reach.",
    level: "moderate"
  },
  {
    question: "What is the 'non‑negativity restriction' and why is it usually included?",
    shortAnswer: "It requires all decision variables to be greater than or equal to zero.",
    explanation: "Negative values are often meaningless (e.g., negative production). It also ensures the feasible region is bounded and includes the origin.",
    hint: "Can you produce -3 chairs?",
    level: "basic"
  },
  {
    question: "How would you convert a minimization problem into a maximization problem?",
    shortAnswer: "Multiply the objective function by -1 and solve as a maximization.",
    explanation: "Since minimizing f(x) is equivalent to maximizing -f(x), the optimal x remains the same. This is often used when algorithms are designed for maximization.",
    hint: "If you want to minimise cost, try maximising negative cost.",
    level: "moderate"
  },
  {
    question: "What is the main assumption of linearity in LP?",
    shortAnswer: "The contribution of each variable to the objective and constraints is proportional and additive.",
    explanation: "This means there are no economies of scale, no discount effects, and no interaction terms. It simplifies the mathematics.",
    hint: "Each unit contributes the same amount regardless of how many you produce.",
    level: "expert"
  },
  {
    question: "Why is LP considered a deterministic method?",
    shortAnswer: "It assumes all coefficients (e.g., profit per unit, resource consumption) are known with certainty.",
    explanation: "LP does not incorporate randomness or uncertainty. If parameters are uncertain, stochastic programming is used.",
    hint: "LP works with fixed numbers, not probabilities.",
    level: "expert"
  },
  {
    question: "What is a typical mistake beginners make when formulating constraints?",
    shortAnswer: "Misinterpreting 'at least' vs. 'at most' – i.e., using ≤ instead of ≥ or vice versa.",
    explanation: "For 'at least 10 units' you need ≥ 10; for 'no more than 5 hours' you need ≤ 5. Getting the direction wrong leads to an infeasible or incorrect model.",
    hint: "Read the problem statement carefully.",
    level: "moderate"
  },
  {
    question: "How can you verify if an LP formulation is correct?",
    shortAnswer: "Test with a small feasible point and check that all constraints and the objective make sense.",
    explanation: "Plug in some numbers for variables and see if the objective value and constraint satisfaction are logical. Also, check extreme cases (e.g., zero production).",
    hint: "Try a simple example with one or two variables.",
    level: "moderate"
  },
  {
    question: "What is the difference between a constraint and the objective function?",
    shortAnswer: "The objective is what we want to optimise; constraints are the restrictions we must respect.",
    explanation: "The objective is a single expression; constraints are inequalities or equalities that limit the feasible region. They serve different purposes.",
    hint: "One is the goal; the others are the rules.",
    level: "basic"
  },
  {
    question: "In LP, what does it mean if the feasible region is empty (infeasible)?",
    shortAnswer: "No solution exists that satisfies all constraints simultaneously.",
    explanation: "This means the constraints are contradictory (e.g., x ≥ 10 and x ≤ 5). The model needs to be revised—often by relaxing some constraints.",
    hint: "It's like having no space that meets all requirements.",
    level: "moderate"
  },
  {
    question: "Why is LP still relevant today despite being developed over 75 years ago?",
    shortAnswer: "It is simple, efficient, and can be scaled to solve massive problems with thousands of variables.",
    explanation: "LP remains the backbone of many optimisation solvers. Modern advances like interior‑point methods have extended its reach, but the basic framework is still widely used.",
    hint: "Think about its widespread use in industry and its theoretical elegance.",
    level: "expert"
  },
  {
    question: "What is the 'Simplex Method' in simple terms?",
    shortAnswer: "An iterative algorithm that moves along edges of the feasible region from one vertex to another until the optimal vertex is found.",
    explanation: "It starts at a feasible corner and jumps to neighbouring corners that improve the objective, stopping when no better neighbour exists.",
    hint: "Like climbing a hill by always stepping to a higher point.",
    level: "moderate"
  },
  {
    question: "List three common pitfalls that lead to incorrect LP models.",
    shortAnswer: "Forgetting non-negativity, using non-linear relationships, and misinterpreting constraint direction.",
    explanation: "These are the most frequent errors: they produce invalid formulations that either have no solution or give meaningless results.",
    hint: "Check your variables, your equations, and your inequalities.",
    level: "moderate"
  }
];

export default questions;