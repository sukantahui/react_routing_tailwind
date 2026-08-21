const questions = [
  {
    question: "What is a transportation model in operations research?",
    shortAnswer: "A transportation model is a mathematical framework for optimizing the distribution of goods from multiple sources to multiple destinations.",
    explanation: "Transportation models are used to determine the most cost-effective way to ship products from supply points to demand points. They balance the objective of minimizing total transportation cost with constraints on supply availability and demand requirements.",
    hint: "Think about how companies decide where to ship their products.",
    level: "basic",
    codeExample: "Minimize Z = ΣᵢΣⱼ cᵢⱼxᵢⱼ s.t. supply and demand constraints."
  },
  {
    question: "What are the key components of a transportation model?",
    shortAnswer: "The key components are sources, destinations, transportation costs, decision variables, supply values, and demand values.",
    explanation: "A transportation model consists of: 1) Sources (supply points) with limited capacities, 2) Destinations (demand points) with specific requirements, 3) A cost matrix showing per-unit shipping costs, 4) Decision variables representing shipment quantities, 5) Supply values for each source, and 6) Demand values for each destination.",
    hint: "Think about what you need to know before creating a transportation model.",
    level: "basic",
    codeExample: "S = [100, 150, 200], D = [120, 130, 150, 50], C = [cᵢⱼ], X = [xᵢⱼ]."
  },
  {
    question: "What is the difference between a transportation model and a transportation problem?",
    shortAnswer: "A transportation model is the mathematical representation, while the transportation problem is the specific instance to be solved.",
    explanation: "The transportation model is the general framework including the mathematical formulation, assumptions, and solution methods. The transportation problem is a specific instance of the model with actual data (specific supplies, demands, and costs) that needs to be solved.",
    hint: "Model = framework, Problem = specific instance with data.",
    level: "intermediate",
    codeExample: "Model: Min ΣᵢΣⱼ cᵢⱼxᵢⱼ. Problem: specific costs, supplies, and demands."
  },
  {
    question: "What are the assumptions of a transportation model?",
    shortAnswer: "The main assumptions are homogeneous products, known costs, known supplies and demands, and linear costs.",
    explanation: "The transportation model assumes: 1) Products are homogeneous (identical), 2) Costs are known and linear, 3) Supplies and demands are fixed and known, 4) All products can be shipped directly, 5) No capacity constraints on routes, and 6) The objective is to minimize total cost.",
    hint: "Think about what makes the model simple and tractable.",
    level: "intermediate",
    codeExample: "Cost = cᵢⱼ × xᵢⱼ (linear), products identical, supplies and demands fixed."
  },
  {
    question: "How is the transportation model represented mathematically?",
    shortAnswer: "The model is represented by an objective function, supply constraints, demand constraints, and non-negativity constraints.",
    explanation: "Mathematically: Min Z = ΣᵢΣⱼ cᵢⱼxᵢⱼ, subject to Σⱼ xᵢⱼ = Sᵢ (for all sources), Σᵢ xᵢⱼ = Dⱼ (for all destinations), and xᵢⱼ ≥ 0. The objective minimizes total cost, and constraints ensure all supplies are used and all demands are met.",
    hint: "The formulation has three types of constraints: supply, demand, and non-negativity.",
    level: "intermediate",
    codeExample: "Min Z = ΣᵢΣⱼ cᵢⱼxᵢⱼ s.t. Σⱼxᵢⱼ = Sᵢ, Σᵢxᵢⱼ = Dⱼ, xᵢⱼ ≥ 0."
  },
  {
    question: "What is the transportation table and how is it used?",
    shortAnswer: "The transportation table is a matrix format that organizes all data for the transportation model, making it easy to visualize and solve.",
    explanation: "The transportation table has sources as rows, destinations as columns, and includes costs in the cells, supply values on the right, and demand values at the bottom. It provides a compact representation of the entire problem and is used in solution methods like the transportation simplex.",
    hint: "Think of it as a spreadsheet organizing all problem data.",
    level: "basic",
    codeExample: "Rows = sources, Columns = destinations, Cells = costs, Right = supplies, Bottom = demands."
  },
  {
    question: "What is the structure of the constraint matrix in transportation models?",
    shortAnswer: "The constraint matrix has a special structure where each column has exactly two non-zero entries (1s).",
    explanation: "In the transportation model, each variable xᵢⱼ appears in exactly two constraints: one supply constraint (with coefficient 1) and one demand constraint (with coefficient 1). This unique structure makes transportation problems easier to solve than general linear programs.",
    hint: "Each variable appears in exactly one supply and one demand constraint.",
    level: "expert",
    codeExample: "Column for xᵢⱼ has 1 at row i (supply) and 1 at row m+j (demand)."
  },
  {
    question: "What is the integrality property in transportation models?",
    shortAnswer: "The integrality property ensures that if all supplies and demands are integers, the optimal solution will also be integral.",
    explanation: "This property is crucial for practical applications because it guarantees that the optimal shipping quantities will be whole numbers. It means we don't need to add integer constraints, making the problem computationally tractable while still providing realistic solutions.",
    hint: "Integer supplies and demands lead to integer solutions.",
    level: "intermediate",
    codeExample: "If Sᵢ and Dⱼ are integers, then xᵢⱼ* are also integers."
  },
  {
    question: "What are the main types of transportation models?",
    shortAnswer: "The main types are balanced, unbalanced, simple, and extended transportation models.",
    explanation: "Balanced models have total supply equal to total demand. Unbalanced models require dummy sources or destinations. Simple models involve single products and direct shipping. Extended models include multiple products, transshipment, or capacity constraints.",
    hint: "Different problems require different model types.",
    level: "intermediate",
    codeExample: "Balanced: ΣSᵢ = ΣDⱼ, Unbalanced: ΣSᵢ ≠ ΣDⱼ."
  },
  {
    question: "How do you determine if a transportation model is balanced?",
    shortAnswer: "A transportation model is balanced if the sum of all supplies equals the sum of all demands.",
    explanation: "To check balance, simply add all supply values and all demand values. If they are equal, the model is balanced. If not, it's unbalanced and requires the addition of dummy sources or destinations with zero costs to balance it.",
    hint: "Check: Σᵢ Sᵢ = Σⱼ Dⱼ.",
    level: "basic",
    codeExample: "If ΣSᵢ = 500 and ΣDⱼ = 500, the model is balanced."
  },
  {
    question: "What is the role of the transportation simplex method?",
    shortAnswer: "The transportation simplex method is an efficient algorithm for solving transportation models.",
    explanation: "The transportation simplex method is a specialized version of the simplex method that exploits the unique structure of transportation problems. It works by starting with an initial basic feasible solution, checking optimality, and making improvements until the optimal solution is found.",
    hint: "It's faster than the general simplex method for transportation problems.",
    level: "expert",
    codeExample: "Start with initial solution, check reduced costs, improve, repeat."
  },
  {
    question: "How do you find an initial solution for a transportation model?",
    shortAnswer: "Initial solutions can be found using methods like the Northwest Corner, Least Cost, or Vogel's Approximation Method (VAM).",
    explanation: "These methods provide a starting point for the transportation simplex method. The Northwest Corner method is simple but gives a poor solution. The Least Cost method is better. VAM usually gives the best initial solution, closest to optimal.",
    hint: "Choose a method based on the quality of initial solution needed.",
    level: "intermediate",
    codeExample: "NW Corner: start at top-left. Least Cost: start at cheapest cell. VAM: consider penalties."
  },
  {
    question: "What is the Modified Distribution (MODI) method?",
    shortAnswer: "The MODI method is used to check optimality and improve solutions in transportation models.",
    explanation: "MODI calculates dual variables (uᵢ and vⱼ) for the current solution, then computes reduced costs for non-basic variables. If any reduced cost is negative, the solution can be improved. If all are non-negative, the solution is optimal.",
    hint: "uᵢ and vⱼ are shadow prices used in optimality checking.",
    level: "expert",
    codeExample: "Reduced cost = cᵢⱼ - uᵢ - vⱼ. If all ≥ 0, solution is optimal."
  },
  {
    question: "What is degeneracy in transportation models and how is it handled?",
    shortAnswer: "Degeneracy occurs when the number of basic variables is less than m + n - 1 and requires special handling.",
    explanation: "Degeneracy happens when an allocation exactly satisfies a supply or demand, causing too few basic variables. It can cause cycling in the simplex method. To handle it, add a small epsilon (ε) to a zero cell to create a basic variable without affecting the solution.",
    hint: "Basic variables should equal m + n - 1.",
    level: "expert",
    codeExample: "Add ε to a zero cell to make it basic when m + n - 1 basic variables not achieved."
  },
  {
    question: "What is the stepping stone method in transportation models?",
    shortAnswer: "The stepping stone method is a technique for improving transportation solutions by tracing paths in the transportation table.",
    explanation: "The stepping stone method finds improvement by identifying a closed loop of cells in the transportation table. It alternates between adding and subtracting the current allocation, determining the maximum improvement possible. This process continues until no improvement is possible.",
    hint: "Trace loops to find where improvements are possible.",
    level: "expert",
    codeExample: "Identify a loop, evaluate improvement, allocate, and repeat."
  },
  {
    question: "How do you handle unbalanced transportation models?",
    shortAnswer: "Unbalanced models are handled by adding dummy sources or destinations with zero costs to balance the problem.",
    explanation: "If supply exceeds demand, add a dummy destination with demand equal to the surplus and zero transportation costs. If demand exceeds supply, add a dummy source with supply equal to the deficit and zero costs. This creates a balanced problem that can be solved using standard methods.",
    hint: "Add dummy rows or columns with zero costs to balance.",
    level: "expert",
    codeExample: "If S > D, add dummy destination D_{n+1} with demand S-D and zero costs."
  },
  {
    question: "What are the advantages of transportation models?",
    shortAnswer: "Transportation models provide optimal distribution plans, minimize costs, handle large problems efficiently, and are easy to understand.",
    explanation: "Advantages include: 1) Finding optimal shipping plans, 2) Minimizing total costs, 3) Handling problems with many sources and destinations, 4) Providing insights into cost structures, 5) Being computationally efficient, and 6) Easy to understand and implement.",
    hint: "Think about why companies use transportation models.",
    level: "intermediate",
    codeExample: "Efficiently handles problems with hundreds of sources and destinations."
  },
  {
    question: "What are the limitations of transportation models?",
    shortAnswer: "Limitations include assumptions of linear costs, homogeneous products, and ignoring real-world complexities.",
    explanation: "Transportation models have limitations: 1) Assume linear costs, 2) Products must be homogeneous, 3) Don't consider transshipment, 4) Ignore capacity constraints on routes, 5) Don't handle time constraints, 6) May not capture all real-world complexities.",
    hint: "Real-world problems may need more advanced models.",
    level: "intermediate",
    codeExample: "Linear costs = unrealistic in many real scenarios."
  },
  {
    question: "How do transportation models relate to linear programming?",
    shortAnswer: "Transportation models are a special type of linear programming problem with a structured constraint matrix.",
    explanation: "Transportation models are linear programs where all constraints are equalities and all coefficients are 0 or 1. This special structure allows for more efficient solution methods than general linear programming, making them computationally tractable for large problems.",
    hint: "Transportation is a special case of linear programming.",
    level: "intermediate",
    codeExample: "LP: min cᵀx s.t. Ax = b, x ≥ 0. Transportation: special A matrix."
  },
  {
    question: "What is the significance of the balance condition in transportation models?",
    shortAnswer: "The balance condition ensures that all supplies are used and all demands are met, making the problem feasible.",
    explanation: "The balance condition ΣSᵢ = ΣDⱼ is crucial because: 1) It ensures a feasible solution exists, 2) It prevents surplus supply or unmet demand, 3) It makes the problem well-posed, and 4) It allows the use of standard solution methods.",
    hint: "Balance is necessary for a feasible solution.",
    level: "intermediate",
    codeExample: "Without balance, the problem is infeasible or has infinite solutions."
  },
  {
    question: "How do changes in transportation costs affect the optimal solution?",
    shortAnswer: "Changes in costs can shift shipments from more expensive to cheaper routes, altering the optimal shipping plan.",
    explanation: "When costs change: 1) Shipments shift to cheaper routes, 2) The optimal total cost changes, 3) Some routes may become unused, 4) New routes may become attractive, and 5) The solution may need to be reoptimized if changes are significant.",
    hint: "Cost changes lead to different optimal plans.",
    level: "expert",
    codeExample: "If c₁₂ decreases, more may be shipped from source 1 to destination 2."
  },
  {
    question: "What is the role of dual variables in transportation models?",
    shortAnswer: "Dual variables (uᵢ and vⱼ) represent shadow prices for supplies and demands in transportation models.",
    explanation: "The dual variables uᵢ (for sources) and vⱼ (for destinations) have economic interpretations: uᵢ is the shadow price of supply at source i, and vⱼ is the shadow price of demand at destination j. They are used in the MODI method to check optimality.",
    hint: "uᵢ and vⱼ = shadow prices for supplies and demands.",
    level: "expert",
    codeExample: "uᵢ = value of one additional unit at source i, vⱼ = value of one additional unit at destination j."
  },
  {
    question: "How do you perform sensitivity analysis on transportation models?",
    shortAnswer: "Sensitivity analysis examines how changes in costs, supplies, or demands affect the optimal solution.",
    explanation: "Sensitivity analysis for transportation models involves: 1) Analyzing the effect of cost changes, 2) Determining the range of optimality for cost coefficients, 3) Examining the effect of supply or demand changes, 4) Identifying critical parameters, and 5) Understanding solution robustness.",
    hint: "What if costs or supplies change? How robust is the solution?",
    level: "expert",
    codeExample: "Range of optimality: how much can cᵢⱼ change without changing the optimal plan."
  },
  {
    question: "What are the real-world applications of transportation models?",
    shortAnswer: "Transportation models are applied in logistics, supply chains, manufacturing, agriculture, and many other fields.",
    explanation: "Applications include: 1) Optimizing distribution networks, 2) Planning manufacturing production, 3) Agricultural supply chain management, 4) Military logistics, 5) Humanitarian aid distribution, 6) Waste management, and 7) Resource allocation in various industries.",
    hint: "Any situation with distribution from sources to destinations.",
    level: "intermediate",
    codeExample: "Optimizing shipments from 50 warehouses to 500 retail stores."
  },
  {
    question: "What is the relationship between transportation models and supply chain management?",
    shortAnswer: "Transportation models are fundamental to supply chain management for optimizing distribution and logistics.",
    explanation: "Transportation models are used in supply chain management to: 1) Design distribution networks, 2) Optimize logistics costs, 3) Plan inventory allocation, 4) Determine warehouse locations, 5) Manage supplier relationships, and 6) Improve overall supply chain efficiency.",
    hint: "Transportation is a key component of supply chain optimization.",
    level: "expert",
    codeExample: "Integrated supply chain optimization with transportation models."
  },
  {
    question: "How do you solve large-scale transportation models?",
    shortAnswer: "Large-scale transportation models are solved using specialized algorithms, optimization software, and sometimes heuristic methods.",
    explanation: "Large-scale problems require: 1) Specialized algorithms (transportation simplex, network simplex), 2) Optimization software (like CPLEX, Gurobi), 3) Efficient data structures, 4) Parallel computing when needed, 5) Possibly heuristic methods for very large problems, and 6) Careful problem decomposition.",
    hint: "Scale requires specialized tools and methods.",
    level: "expert",
    codeExample: "Using network simplex for problems with 1000+ sources and destinations."
  },
  {
    question: "What is the difference between transportation and assignment models?",
    shortAnswer: "Transportation models handle multiple units between multiple points, while assignment models handle one-to-one matching with all supplies and demands equal to 1.",
    explanation: "In transportation, sources can have supplies > 1 and destinations can have demands > 1. In assignment models, each source has exactly one unit and each destination needs exactly one unit. Assignment is actually a special case of transportation where all supplies and demands are 1.",
    hint: "Assignment = transportation with all supplies and demands = 1.",
    level: "intermediate",
    codeExample: "Transportation: Sᵢ > 1, Dⱼ > 1. Assignment: Sᵢ = 1, Dⱼ = 1."
  },
  {
    question: "How do transportation models handle multiple products?",
    shortAnswer: "Multiple products require either separate transportation models or multi-commodity transportation models.",
    explanation: "For multiple products: 1) Use separate transportation models for each product (simplest), 2) Use multi-commodity transportation models (more complex), 3) Consider product interactions if any, 4) Account for different cost structures, and 5) Handle product-specific constraints.",
    hint: "Each product may need its own model or a more complex multi-commodity model.",
    level: "expert",
    codeExample: "Multi-commodity: Min ΣₖΣᵢΣⱼ cᵢⱼᵏ xᵢⱼᵏ."
  },
  {
    question: "What is the role of transportation models in disaster relief?",
    shortAnswer: "Transportation models help optimize the distribution of relief supplies to affected areas during disasters.",
    explanation: "In disaster relief, transportation models: 1) Determine optimal distribution of supplies, 2) Balance supply availability with urgent needs, 3) Minimize delivery times, 4) Handle dynamic conditions, 5) Coordinate multiple relief organizations, and 6) Ensure efficient use of limited resources.",
    hint: "Transportation models save lives in disaster response.",
    level: "expert",
    codeExample: "Optimizing distribution of food, water, and medical supplies after a disaster."
  },
  {
    question: "How do transportation models handle time constraints?",
    shortAnswer: "Time constraints can be incorporated through penalties, deadlines, or time-cost tradeoffs in extended models.",
    explanation: "To handle time constraints: 1) Add penalties for late deliveries, 2) Include time windows as constraints, 3) Consider time-cost tradeoffs, 4) Use transshipment models for time-sensitive goods, 5) Incorporate delivery schedules, and 6) Extend the basic model to handle time aspects.",
    hint: "Time can be incorporated as costs or constraints.",
    level: "expert",
    codeExample: "Add penalty costs for late deliveries in the objective function."
  },
  {
    question: "What are the future trends in transportation modeling?",
    shortAnswer: "Future trends include AI-driven optimization, real-time models, sustainable logistics, and integration with IoT.",
    explanation: "Emerging trends: 1) AI and machine learning for dynamic optimization, 2) Real-time transportation models, 3) Green logistics and sustainability, 4) IoT integration for real-time data, 5) Blockchain for transparency, 6) Autonomous vehicles and drones, and 7) Smart city logistics.",
    hint: "Technology is transforming transportation modeling.",
    level: "expert",
    codeExample: "AI-powered real-time transportation optimization with IoT data."
  }
];

export default questions;