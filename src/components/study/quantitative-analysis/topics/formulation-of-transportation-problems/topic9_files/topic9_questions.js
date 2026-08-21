const questions = [
  {
    question: "What is the fundamental difference between a transportation problem and a general linear programming problem?",
    shortAnswer: "Transportation problems have a special structure where all constraint coefficients are 0 or 1, allowing for more efficient algorithms.",
    explanation: "Unlike general LP problems with arbitrary coefficients, transportation problems have a constraint matrix where each column has exactly two non-zero entries (1s). This special structure allows for specialized algorithms like the transportation simplex method, which is more efficient than general LP solvers.",
    hint: "Think about the unique structure of transportation problems.",
    level: "intermediate",
    codeExample: "Transportation: each variable appears in exactly two constraints."
  },
  {
    question: "Why does the transportation problem have the integrality property?",
    shortAnswer: "The integrality property exists because the constraint matrix is totally unimodular, ensuring integer solutions for integer supplies and demands.",
    explanation: "The transportation problem's constraint matrix is totally unimodular (all subdeterminants are 0, 1, or -1). When combined with integer RHS values (supplies and demands), this guarantees that all basic feasible solutions (and thus the optimal solution) will be integer. This is crucial for practical applications.",
    hint: "Integer inputs guarantee integer outputs.",
    level: "expert",
    codeExample: "Integer Sᵢ and Dⱼ → Integer xᵢⱼ*."
  },
  {
    question: "What is the relationship between transportation problems and minimum cost flow problems?",
    shortAnswer: "Transportation problems are a special case of minimum cost flow problems with only two layers (sources and destinations).",
    explanation: "Minimum cost flow problems allow multiple intermediate nodes and transshipment. Transportation problems are simpler—they only have sources and destinations with direct shipping. Transportation problems can be extended to transshipment problems by adding intermediate nodes, which are general minimum cost flow problems.",
    hint: "Transportation is a simpler version of minimum cost flow.",
    level: "expert",
    codeExample: "Transportation = 2-layer minimum cost flow network."
  },
  {
    question: "How does the transportation simplex method differ from the regular simplex method?",
    shortAnswer: "The transportation simplex method is more efficient because it exploits the special structure of the transportation problem.",
    explanation: "The transportation simplex method: 1) Doesn't need to maintain a full simplex tableau, 2) Uses the transportation table directly, 3) Has simpler basis update procedures, 4) Is more computationally efficient, 5) Handles larger problems more easily, and 6) Uses specialized optimality checks (MODI method).",
    hint: "It's a specialized version for transportation problems.",
    level: "expert",
    codeExample: "Transportation simplex: O(m+n) vs regular simplex: O(m+n)²."
  },
  {
    question: "What is the significance of the MODI method in transportation?",
    shortAnswer: "The MODI method calculates dual variables to check optimality and identify improvements in transportation solutions.",
    explanation: "MODI (Modified Distribution) method: 1) Calculates uᵢ (for rows) and vⱼ (for columns) dual variables, 2) Computes reduced costs for non-basic variables, 3) If all reduced costs are non-negative, the solution is optimal, 4) If any reduced cost is negative, the solution can be improved, and 5) Provides an efficient way to check optimality.",
    hint: "MODI = optimality check for transportation problems.",
    level: "expert",
    codeExample: "Reduced cost = cᵢⱼ - uᵢ - vⱼ. All ≥ 0 → optimal."
  },
  {
    question: "What is the economic meaning of the dual variables in transportation?",
    shortAnswer: "Dual variables uᵢ and vⱼ represent the marginal value of supply at sources and demand at destinations.",
    explanation: "In transportation problems, uᵢ (for sources) represents the value of one additional unit of supply at source i, while vⱼ (for destinations) represents the value of one additional unit of demand at destination j. These shadow prices help in sensitivity analysis and resource valuation.",
    hint: "uᵢ = value of supply, vⱼ = value of demand.",
    level: "expert",
    codeExample: "uᵢ = shadow price of supply, vⱼ = shadow price of demand."
  },
  {
    question: "How do you handle capacity constraints on routes in transportation problems?",
    shortAnswer: "Route capacity constraints can be added as upper bounds on decision variables (0 ≤ xᵢⱼ ≤ capacityᵢⱼ).",
    explanation: "Adding capacity constraints: 1) Add upper bounds to each variable, 2) This creates a capacitated transportation problem, 3) Requires modifications to the transportation simplex method, 4) Can be solved with specialized algorithms, or 5) Convert to a general LP problem with additional constraints.",
    hint: "Capacity constraints add upper bounds to variables.",
    level: "expert",
    codeExample: "0 ≤ xᵢⱼ ≤ capacityᵢⱼ (route capacity constraint)."
  },
  {
    question: "What is the relationship between transportation and transshipment problems?",
    shortAnswer: "Transshipment problems extend transportation problems by allowing intermediate nodes where goods can be transferred.",
    explanation: "Transshipment problems: 1) Allow intermediate points between sources and destinations, 2) Goods can be transferred between different modes or routes, 3) More flexible and realistic for complex logistics, 4) Can be solved using transportation algorithms with modifications, 5) Generalize transportation problems.",
    hint: "Transshipment allows intermediate transfer points.",
    level: "expert",
    codeExample: "Sources → Intermediate nodes → Destinations."
  },
  {
    question: "How do transportation problems relate to warehouse location decisions?",
    shortAnswer: "Transportation problems are used to evaluate optimal warehouse locations by comparing total distribution costs.",
    explanation: "In facility location: 1) Each potential warehouse is a source, 2) Customers are destinations, 3) Transportation costs depend on warehouse locations, 4) Fixed costs of opening warehouses are added, 5) The optimal location minimizes total fixed and variable costs, 6) Transportation problems are solved for each location scenario.",
    hint: "Transportation costs help evaluate warehouse locations.",
    level: "expert",
    codeExample: "Minimize fixed costs + transportation costs for location choice."
  },
  {
    question: "What are the computational challenges in solving large-scale transportation problems?",
    shortAnswer: "Large-scale problems face challenges with memory, computation time, and numerical stability.",
    explanation: "Challenges include: 1) Large number of variables (m × n), 2) Memory requirements for the full table, 3) Computational time for optimization, 4) Numerical stability with large numbers, 5) Degeneracy issues, and 6) Need for efficient algorithms and data structures.",
    hint: "Scale creates computational challenges.",
    level: "expert",
    codeExample: "1000 × 1000 problem = 1,000,000 variables."
  },
  {
    question: "How does uncertainty in transportation costs affect problem solving?",
    shortAnswer: "Uncertainty requires robust optimization or stochastic programming approaches to handle variable costs.",
    explanation: "Handling uncertainty: 1) Robust optimization considers worst-case scenarios, 2) Stochastic programming uses probability distributions, 3) Scenario planning with multiple cost scenarios, 4) Sensitivity analysis to identify critical costs, 5) Real-time cost updates, and 6) Dynamic optimization for changing costs.",
    hint: "Real costs vary—use robust or stochastic methods.",
    level: "expert",
    codeExample: "Robust optimization: Min max cost for cost uncertainty sets."
  },
  {
    question: "What is the role of transportation problems in disaster relief logistics?",
    shortAnswer: "Transportation problems optimize the distribution of relief supplies to affected areas during disasters.",
    explanation: "In disaster relief: 1) Sources are supply points (warehouses, donations), 2) Destinations are affected areas, 3) Time sensitivity is critical, 4) Dynamic conditions require flexibility, 5) Multiple objectives (cost, time, fairness), and 6) Transportation problems help coordinate efficient distribution.",
    hint: "Transportation saves lives in disaster response.",
    level: "expert",
    codeExample: "Distributing food, water, and medical supplies after a disaster."
  },
  {
    question: "How do transportation problems integrate with inventory management?",
    shortAnswer: "Transportation and inventory decisions are integrated to optimize total supply chain costs.",
    explanation: "Integration: 1) Transportation costs affect inventory levels, 2) Inventory holding costs affect transportation decisions, 3) Safety stock levels influence shipping quantities, 4) Lead times affect both inventory and transportation, 5) Integrated models optimize both simultaneously, and 6) This is part of broader supply chain optimization.",
    hint: "Transportation and inventory are connected.",
    level: "expert",
    codeExample: "Minimize transportation + inventory holding + ordering costs."
  },
  {
    question: "What is the impact of just-in-time (JIT) systems on transportation problems?",
    shortAnswer: "JIT systems require more frequent, smaller shipments, changing the transportation problem structure.",
    explanation: "JIT impacts: 1) Smaller shipment sizes, 2) More frequent deliveries, 3) Higher transportation costs per unit, 4) Need for reliable transportation, 5) Lower inventory costs, 6) Changes the trade-off between transportation and inventory, and 7) Requires more sophisticated transportation planning.",
    hint: "JIT changes transportation patterns.",
    level: "expert",
    codeExample: "JIT: frequent small shipments vs. traditional: fewer large shipments."
  },
  {
    question: "How do transportation problems handle multiple products?",
    shortAnswer: "Multiple products require either separate transportation problems or multi-commodity transportation models.",
    explanation: "Handling multiple products: 1) Solve separate transportation problems for each product (simplest), 2) Use multi-commodity transportation problems (more complex), 3) Consider product interactions if any, 4) Account for different cost structures, and 5) Handle product-specific constraints (e.g., capacity sharing).",
    hint: "Each product may need its own model or a more complex one.",
    level: "expert",
    codeExample: "Multi-commodity: Min ΣₖΣᵢΣⱼ cᵢⱼᵏ xᵢⱼᵏ."
  },
  {
    question: "What are the limitations of the basic transportation model?",
    shortAnswer: "Limitations include assumptions of linear costs, homogeneous products, and no capacity constraints on routes.",
    explanation: "Basic transportation model limitations: 1) Linear costs (economies of scale ignored), 2) Homogeneous products (no product differentiation), 3) No route capacity constraints, 4) No time constraints, 5) Fixed and known costs, 6) Direct shipping only, and 7) Static problem (no changes over time).",
    hint: "Basic models have simplifying assumptions.",
    level: "intermediate",
    codeExample: "Assumptions: linear costs, homogeneous products, no route capacity."
  },
  {
    question: "What is the relationship between transportation and vehicle routing problems?",
    shortAnswer: "Vehicle routing problems extend transportation problems by including vehicle routes, capacities, and time constraints.",
    explanation: "Vehicle routing problems (VRP): 1) Consider actual vehicles making deliveries, 2) Include vehicle capacity constraints, 3) Handle routing and scheduling, 4) Include time windows, 5) Are more realistic for last-mile delivery, and 6) Are computationally more complex than transportation problems.",
    hint: "VRP = transportation + vehicle constraints.",
    level: "expert",
    codeExample: "VRP: minimize distance traveled by vehicles delivering goods."
  },
  {
    question: "How does the transportation problem relate to the assignment problem?",
    shortAnswer: "The assignment problem is a special case of the transportation problem where all supplies and demands are 1.",
    explanation: "In assignment problems: 1) Each source has exactly one unit, 2) Each destination needs exactly one unit, 3) One-to-one matching, 4) Special cases include job assignment, 5) Can be solved more efficiently, and 6) Is a subset of transportation problems.",
    hint: "Assignment = transportation with all Sᵢ = 1 and Dⱼ = 1.",
    level: "intermediate",
    codeExample: "Assignment: Sᵢ = 1, Dⱼ = 1, xᵢⱼ ∈ {0, 1}."
  },
  {
    question: "What are the latest trends in transportation optimization?",
    shortAnswer: "Latest trends include AI-driven optimization, real-time routing, sustainable logistics, and autonomous vehicles.",
    explanation: "Emerging trends: 1) AI and machine learning for optimization, 2) Real-time dynamic routing, 3) Sustainable and green logistics, 4) Autonomous and electric vehicles, 5) IoT and sensor integration, 6) Predictive analytics for demand, 7) Blockchain for transparency, and 8) Smart city logistics solutions.",
    hint: "Technology is transforming transportation optimization.",
    level: "expert",
    codeExample: "AI-powered real-time route optimization with IoT data."
  },
  {
    question: "How do you perform sensitivity analysis in transportation problems?",
    shortAnswer: "Sensitivity analysis examines how changes in costs, supplies, or demands affect the optimal solution.",
    explanation: "Sensitivity analysis: 1) Analyze the range of optimality for cost coefficients, 2) Examine the effect of supply changes, 3) Examine the effect of demand changes, 4) Identify critical parameters, 5) Understand solution robustness, 6) Use dual variables (uᵢ and vⱼ) for sensitivity, and 7) Perform scenario analysis.",
    hint: "What if costs or quantities change? How robust is the solution?",
    level: "expert",
    codeExample: "Range of optimality: how much cᵢⱼ can change without changing the optimal plan."
  },
  {
    question: "What is the role of transportation problems in supply chain network design?",
    shortAnswer: "Transportation problems help design optimal supply chain networks by evaluating different distribution configurations.",
    explanation: "Network design: 1) Evaluate potential warehouse locations, 2) Determine optimal distribution patterns, 3) Compare different network configurations, 4) Balance transportation and facility costs, 5) Consider capacity constraints, and 6) Use transportation problems as subproblems in larger network optimization.",
    hint: "Transportation helps design supply chain networks.",
    level: "expert",
    codeExample: "Minimize facility costs + transportation costs in network design."
  },
  {
    question: "How do transportation problems handle time sensitivity?",
    shortAnswer: "Time sensitivity is handled through penalties, time windows, or time-cost tradeoffs in extended models.",
    explanation: "Handling time: 1) Add penalties for late deliveries, 2) Include time windows as constraints, 3) Consider time-cost tradeoffs, 4) Use transshipment models for time-sensitive goods, 5) Incorporate delivery schedules, and 6) Extend the basic model to handle time aspects.",
    hint: "Time can be incorporated as costs or constraints.",
    level: "expert",
    codeExample: "Add penalty costs for late deliveries in the objective function."
  },
  {
    question: "What is the impact of sustainability on transportation problems?",
    shortAnswer: "Sustainability adds environmental objectives like minimizing carbon emissions alongside cost objectives.",
    explanation: "Sustainability impacts: 1) Include carbon emissions in objective, 2) Consider green transportation modes, 3) Optimize routes for fuel efficiency, 4) Balance cost and environmental impact, 5) Include sustainability constraints, and 6) Use multi-objective optimization approaches.",
    hint: "Green logistics adds environmental objectives.",
    level: "expert",
    codeExample: "Minimize cost + carbon emissions (multi-objective transportation)."
  },
  {
    question: "How does globalization affect transportation problems?",
    shortAnswer: "Globalization creates more complex transportation problems with international sources, destinations, and logistics.",
    explanation: "Globalization impacts: 1) International sources and destinations, 2) Complex global supply chains, 3) Different currencies and regulations, 4) Longer shipping distances, 5) Diverse transportation modes, 6) Customs and documentation, 7) Global risk management, and 8) Cultural and language considerations.",
    hint: "Global supply chains add complexity.",
    level: "expert",
    codeExample: "Global transportation with sources in Asia and destinations in Europe."
  }
];

export default questions;