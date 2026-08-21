const questions = [
  {
    question: "What is a transportation problem in linear programming?",
    shortAnswer: "A transportation problem is a special type of linear programming problem that deals with optimal distribution of goods from multiple sources to multiple destinations.",
    explanation: "Transportation problems involve finding the most cost-effective way to ship homogeneous goods from supply points (sources) to demand points (destinations) while satisfying supply and demand constraints. The objective is to minimize total transportation cost or maximize total profit.",
    hint: "Think about how goods move from factories to stores.",
    level: "basic",
    codeExample: "Minimize Z = Σᵢ Σⱼ cᵢⱼ × xᵢⱼ subject to supply and demand constraints."
  },
  {
    question: "What are the key components of a transportation problem?",
    shortAnswer: "The key components are sources (supply points), destinations (demand points), transportation costs, and decision variables.",
    explanation: "Sources have limited supply capacities and are the origins of goods. Destinations have specific demand requirements and are where goods are needed. Transportation costs represent the cost per unit shipped between each source-destination pair. Decision variables represent the quantity shipped from each source to each destination.",
    hint: "Think about factories, warehouses, shipping costs, and shipment quantities.",
    level: "basic",
    codeExample: "Sources: S₁, S₂, ... Sₘ; Destinations: D₁, D₂, ... Dₙ; Costs: cᵢⱼ; Variables: xᵢⱼ."
  },
  {
    question: "What is the difference between balanced and unbalanced transportation problems?",
    shortAnswer: "A balanced problem has total supply equal to total demand, while an unbalanced problem has total supply not equal to total demand.",
    explanation: "In a balanced problem, Σᵢ Sᵢ = Σⱼ Dⱼ, meaning all supplies can exactly meet all demands. In an unbalanced problem, there is either surplus supply or excess demand. Unbalanced problems require dummy sources or destinations to balance them before solving.",
    hint: "Check if total supply equals total demand.",
    level: "intermediate",
    codeExample: "Balanced: Σᵢ Sᵢ = Σⱼ Dⱼ; Unbalanced: Σᵢ Sᵢ ≠ Σⱼ Dⱼ."
  },
  {
    question: "Why is the integrality property important in transportation problems?",
    shortAnswer: "The integrality property ensures that if all supplies and demands are integers, the optimal solution will also have integer values.",
    explanation: "This property is important because it guarantees that the optimal shipping quantities will be whole numbers, which is realistic for shipping indivisible units. This makes transportation problems computationally tractable and ensures practical solutions.",
    hint: "Think about shipping whole units like boxes or pallets.",
    level: "intermediate",
    codeExample: "If Sᵢ and Dⱼ are integers, then xᵢⱼ* are also integers."
  },
  {
    question: "What is the mathematical formulation of a transportation problem?",
    shortAnswer: "The formulation includes an objective function to minimize total cost, supply constraints, demand constraints, and non-negativity constraints.",
    explanation: "Minimize Z = Σᵢ Σⱼ cᵢⱼ × xᵢⱼ. Subject to: Σⱼ xᵢⱼ = Sᵢ (for each source i), Σᵢ xᵢⱼ = Dⱼ (for each destination j), and xᵢⱼ ≥ 0. This linear programming formulation captures the entire transportation problem.",
    hint: "The objective is to minimize cost while satisfying all constraints.",
    level: "intermediate",
    codeExample: "Min Z = ΣᵢΣⱼ cᵢⱼxᵢⱼ s.t. Σⱼxᵢⱼ = Sᵢ, Σᵢxᵢⱼ = Dⱼ, xᵢⱼ ≥ 0."
  },
  {
    question: "What is the role of decision variables in transportation problems?",
    shortAnswer: "Decision variables represent the quantity of goods shipped from each source to each destination.",
    explanation: "Each variable xᵢⱼ represents the amount shipped from source i to destination j. These variables are the unknowns we solve for in the transportation problem. The values of these variables determine the optimal shipping plan and the total cost.",
    hint: "xᵢⱼ = amount shipped from source i to destination j.",
    level: "basic",
    codeExample: "x₁₂ = 50 means 50 units shipped from source 1 to destination 2."
  },
  {
    question: "What is the significance of the cost matrix in transportation problems?",
    shortAnswer: "The cost matrix contains the per-unit transportation costs between each source-destination pair.",
    explanation: "The cost matrix cᵢⱼ is a key input to the transportation problem. Each entry represents the cost of shipping one unit from source i to destination j. These costs are used in the objective function to calculate total transportation cost.",
    hint: "The cost matrix is organized with sources as rows and destinations as columns.",
    level: "intermediate",
    codeExample: "c₁₂ = ₹10 means shipping one unit from source 1 to destination 2 costs ₹10."
  },
  {
    question: "How are transportation problems related to supply chain management?",
    shortAnswer: "Transportation problems are fundamental to supply chain management for optimizing distribution networks and logistics.",
    explanation: "Transportation problems help determine optimal shipping routes, warehouse locations, inventory allocation, and distribution strategies. They are used to minimize costs, improve efficiency, and ensure timely delivery in supply chains.",
    hint: "Think about how companies decide where to send their products.",
    level: "expert",
    codeExample: "Optimizing distribution from warehouses to retail stores."
  },
  {
    question: "What are the characteristics of an optimal transportation solution?",
    shortAnswer: "An optimal solution satisfies all supply and demand constraints, minimizes total cost, and has non-negative shipment quantities.",
    explanation: "The optimal solution is feasible (satisfies all constraints), optimal (achieves minimum cost), and has no negative shipments. Additionally, it often has a basic feasible structure where the number of positive variables equals m + n - 1 (where m is sources and n is destinations).",
    hint: "Check feasibility, optimality, and non-negativity.",
    level: "expert",
    codeExample: "Feasible: all supplies met, all demands met. Optimal: minimum cost."
  },
  {
    question: "What is the northwest corner method?",
    shortAnswer: "The northwest corner method is a simple technique for finding an initial basic feasible solution for transportation problems.",
    explanation: "It starts at the northwest (top-left) corner of the transportation table and allocates as much as possible to that cell, adjusting supply and demand, then moving right or down. It provides a starting solution that can be improved using optimization algorithms.",
    hint: "Start at the top-left and move systematically.",
    level: "intermediate",
    codeExample: "Allocate min(S₁, D₁) to cell (1,1), then adjust supplies and demands."
  },
  {
    question: "What is the least cost method for transportation problems?",
    shortAnswer: "The least cost method finds an initial solution by allocating as much as possible to the cheapest available cell.",
    explanation: "This method identifies the cell with the lowest cost in the transportation table, allocates the maximum possible amount to it, adjusts supplies and demands, and repeats. It typically provides a better initial solution than the northwest corner method.",
    hint: "Always choose the cheapest shipping route first.",
    level: "intermediate",
    codeExample: "Find min cᵢⱼ, allocate min(Sᵢ, Dⱼ), then adjust and repeat."
  },
  {
    question: "What is the Vogel's approximation method (VAM)?",
    shortAnswer: "VAM is an advanced technique for finding a near-optimal initial solution for transportation problems.",
    explanation: "VAM calculates the penalty cost for not using the cheapest route in each row and column, then allocates to the cell with the highest penalty. It generally provides a very good initial solution, often close to optimal, reducing computational effort.",
    hint: "Consider the opportunity cost of not choosing the cheapest option.",
    level: "expert",
    codeExample: "Calculate penalties, choose highest, allocate, and repeat."
  },
  {
    question: "How do you handle an unbalanced transportation problem?",
    shortAnswer: "Unbalanced problems are handled by adding dummy sources (if demand exceeds supply) or dummy destinations (if supply exceeds demand).",
    explanation: "If supply > demand, add a dummy destination with demand equal to the surplus and zero transportation cost. If demand > supply, add a dummy source with supply equal to the deficit and zero transportation cost. This balances the problem for standard solution methods.",
    hint: "Add dummy rows or columns with zero costs to balance the problem.",
    level: "expert",
    codeExample: "If S > D, add dummy destination D_{n+1} with demand S-D and zero costs."
  },
  {
    question: "What is the transportation simplex method?",
    shortAnswer: "The transportation simplex method is an optimization algorithm that improves a feasible solution to find the optimal solution.",
    explanation: "Starting from an initial basic feasible solution, the transportation simplex method checks for optimality and makes improvements by identifying entering and leaving variables. It continues until no further improvement is possible, yielding the optimal solution.",
    hint: "It's a specialized version of the simplex method for transportation problems.",
    level: "expert",
    codeExample: "Start with initial solution, check optimality, improve, and repeat."
  },
  {
    question: "How do you check the optimality of a transportation solution?",
    shortAnswer: "Optimality is checked using the modified distribution (MODI) method or the stepping stone method.",
    explanation: "The MODI method computes dual variables (uᵢ for rows and vⱼ for columns) and checks if all non-basic cells have non-negative reduced costs. If any reduced cost is negative, the solution can be improved. This is a systematic way to verify optimality.",
    hint: "Calculate uᵢ and vⱼ, then check reduced costs.",
    level: "expert",
    codeExample: "Reduced cost = cᵢⱼ - uᵢ - vⱼ. If all ≥ 0, solution is optimal."
  },
  {
    question: "What is degeneracy in transportation problems?",
    shortAnswer: "Degeneracy occurs when the number of basic variables in a transportation solution is less than m + n - 1.",
    explanation: "Degeneracy can happen when an allocation exactly satisfies a supply or demand, causing multiple basic variables to become zero simultaneously. This can cause cycling in the simplex method and requires special handling, such as adding epsilon to break ties.",
    hint: "Basic variables count should be m + n - 1.",
    level: "expert",
    codeExample: "If basic variables < m + n - 1, the solution is degenerate."
  },
  {
    question: "What are the practical applications of transportation problems?",
    shortAnswer: "Transportation problems are used in logistics, supply chain, manufacturing, agriculture, military, and many other fields.",
    explanation: "Applications include: distribution of goods from factories to stores, resource allocation in supply chains, transportation of agricultural products, military logistics, humanitarian aid distribution, and many other scenarios where goods need to be moved from sources to destinations.",
    hint: "Any situation where goods move from supply points to demand points.",
    level: "intermediate",
    codeExample: "Optimizing shipments from 10 warehouses to 20 retail stores."
  },
  {
    question: "How do transportation costs affect the optimal solution?",
    shortAnswer: "Transportation costs directly determine the optimal shipping plan, with lower costs generally leading to more shipments on those routes.",
    explanation: "The objective is to minimize total cost, so the optimization algorithm will allocate more shipments to routes with lower costs, subject to supply and demand constraints. Changes in costs can significantly alter the optimal shipping plan.",
    hint: "Cheaper routes will carry more shipments in the optimal plan.",
    level: "expert",
    codeExample: "If c₁₂ decreases, more may be shipped from source 1 to destination 2."
  },
  {
    question: "What is the relationship between transportation and linear programming?",
    shortAnswer: "Transportation problems are a special class of linear programming problems with a specific network structure.",
    explanation: "The transportation problem can be expressed as a linear program with the objective function and constraints all being linear. Its special structure (all coefficients are 0 or 1) allows for more efficient algorithms than general linear programming.",
    hint: "Transportation is to logistics what linear programming is to optimization.",
    level: "intermediate",
    codeExample: "LP formulation: min cᵀx s.t. Ax = b, x ≥ 0."
  },
  {
    question: "What are the main assumptions in transportation problems?",
    shortAnswer: "The main assumptions are: homogeneous products, known costs, known supplies and demands, and linear costs.",
    explanation: "The transportation problem assumes that: 1) Products are homogeneous (identical), 2) Costs are known and linear, 3) Supplies and demands are fixed and known, 4) All products can be shipped directly from sources to destinations, and 5) No capacity constraints on shipping routes.",
    hint: "Think about what makes a transportation problem valid.",
    level: "expert",
    codeExample: "Cost = cᵢⱼ × xᵢⱼ (linear), all products identical."
  },
  {
    question: "How can transportation problems be solved using optimization software?",
    shortAnswer: "Transportation problems can be solved using various optimization software like Excel Solver, Python (scipy.optimize), or specialized LP solvers.",
    explanation: "These tools use algorithms like the transportation simplex method, interior-point methods, or network optimization algorithms. Users need to input the cost matrix, supplies, and demands, and the software returns the optimal shipping plan and total cost.",
    hint: "Many tools can solve transportation problems automatically.",
    level: "expert",
    codeExample: "Use scipy.optimize.linprog with the appropriate constraints."
  },
  {
    question: "What is the difference between transportation and assignment problems?",
    shortAnswer: "Transportation problems deal with multiple units between multiple sources and destinations, while assignment problems assign one-to-one with all supply and demand equal to 1.",
    explanation: "In transportation problems, sources have supplies > 1 and destinations have demands > 1. In assignment problems, each source has exactly one unit and each destination needs exactly one unit, making it a special case of transportation problems.",
    hint: "Assignment = transportation with all supplies and demands = 1.",
    level: "intermediate",
    codeExample: "Assignment: Sᵢ = 1, Dⱼ = 1. Transportation: Sᵢ > 1, Dⱼ > 1."
  },
  {
    question: "What are the computational challenges in large transportation problems?",
    shortAnswer: "Large transportation problems can be computationally expensive due to the number of variables and the complexity of finding optimal solutions.",
    explanation: "With m sources and n destinations, there are m × n decision variables. For large values of m and n, the problem size can be enormous, requiring efficient algorithms and careful memory management to solve in reasonable time.",
    hint: "The number of variables grows as m × n.",
    level: "expert",
    codeExample: "100 sources × 200 destinations = 20,000 variables."
  },
  {
    question: "How do you interpret the dual variables in transportation problems?",
    shortAnswer: "Dual variables in transportation problems represent shadow prices for supplies and demands.",
    explanation: "The dual variables uᵢ (for sources) and vⱼ (for destinations) represent the marginal value of supply at source i and demand at destination j. They are used in the MODI method to check optimality and provide sensitivity analysis information.",
    hint: "uᵢ and vⱼ are shadow prices for supplies and demands.",
    level: "expert",
    codeExample: "uᵢ = shadow price of supply at source i."
  },
  {
    question: "How does uncertainty in costs affect transportation planning?",
    shortAnswer: "Uncertainty in costs requires robust optimization or stochastic programming approaches to handle varying transportation costs.",
    explanation: "In real-world scenarios, transportation costs may vary due to fuel prices, weather, traffic, or other factors. Robust optimization considers worst-case scenarios, while stochastic programming incorporates probability distributions of costs to find solutions that perform well on average.",
    hint: "Real costs are rarely fixed—they vary with conditions.",
    level: "expert",
    codeExample: "Use robust optimization with cost uncertainty sets."
  },
  {
    question: "What is the role of transportation problems in inventory management?",
    shortAnswer: "Transportation problems help determine optimal inventory allocation and replenishment strategies.",
    explanation: "Transportation problems can be integrated with inventory management to optimize when and how much to ship. They help balance inventory levels across locations while minimizing transportation and holding costs, leading to more efficient supply chain operations.",
    hint: "Transportation and inventory decisions are closely linked.",
    level: "expert",
    codeExample: "Transportation planning with inventory constraints."
  },
  {
    question: "How do capacity constraints affect transportation problems?",
    shortAnswer: "Capacity constraints limit the amount that can be shipped on specific routes or from specific sources.",
    explanation: "While basic transportation problems don't have route capacity constraints, real-world problems often do. These constraints add complexity to the problem and require specialized solution methods or extended formulations.",
    hint: "Routes have maximum capacity in real logistics.",
    level: "expert",
    codeExample: "0 ≤ xᵢⱼ ≤ capacityᵢⱼ (route capacity constraint)."
  },
  {
    question: "What is the relationship between transportation and transshipment problems?",
    shortAnswer: "Transshipment problems allow intermediate points (transshipment nodes) where goods can be transferred between different modes or routes.",
    explanation: "Transportation problems assume direct shipping from sources to destinations. Transshipment problems allow goods to pass through intermediate nodes, making them more flexible and realistic for complex logistics networks.",
    hint: "Transshipment allows goods to go through intermediate points.",
    level: "expert",
    codeExample: "Transshipment: sources → intermediate points → destinations."
  },
  {
    question: "How does vehicle routing relate to transportation problems?",
    shortAnswer: "Vehicle routing problems (VRP) extend transportation problems to include vehicle routes, capacities, and time constraints.",
    explanation: "While transportation problems focus on quantities shipped, VRPs consider the actual vehicles making deliveries, including their capacity, routing, scheduling, and time windows. This is more realistic for last-mile delivery and logistics operations.",
    hint: "VRP = transportation problems + vehicle constraints.",
    level: "expert",
    codeExample: "VRP: minimize distance traveled by vehicles delivering goods."
  },
  {
    question: "What are the latest trends in transportation optimization?",
    shortAnswer: "Latest trends include AI-driven optimization, real-time routing, sustainable logistics, and integration with IoT and analytics.",
    explanation: "Modern transportation optimization uses artificial intelligence, machine learning, and real-time data to make dynamic decisions. There's also increasing focus on sustainability, reducing carbon emissions, and integrating transportation with overall supply chain management.",
    hint: "Technology is revolutionizing transportation optimization.",
    level: "expert",
    codeExample: "AI-powered real-time route optimization."
  }
];

export default questions;