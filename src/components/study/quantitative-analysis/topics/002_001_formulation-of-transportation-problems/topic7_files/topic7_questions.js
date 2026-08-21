const questions = [
  {
    question: "What is a dummy source in transportation problems?",
    shortAnswer: "A dummy source is an artificial supply point added when total demand exceeds total supply to balance the problem.",
    explanation: "A dummy source is created when ΣDⱼ > ΣSᵢ (excess demand). It has supply equal to the deficit and zero transportation costs to all destinations. It represents unmet demand that cannot be fulfilled by available supply.",
    hint: "Dummy source = artificial source for excess demand.",
    level: "basic",
    codeExample: "Demand 500, Supply 400 → Add dummy source with supply 100."
  },
  {
    question: "What is a dummy destination in transportation problems?",
    shortAnswer: "A dummy destination is an artificial demand point added when total supply exceeds total demand to balance the problem.",
    explanation: "A dummy destination is created when ΣSᵢ > ΣDⱼ (surplus supply). It has demand equal to the surplus and zero transportation costs from all sources. It represents unused supply that doesn't need to be shipped.",
    hint: "Dummy destination = artificial destination for surplus supply.",
    level: "basic",
    codeExample: "Supply 500, Demand 400 → Add dummy destination with demand 100."
  },
  {
    question: "When do you use a dummy source?",
    shortAnswer: "Use a dummy source when total demand exceeds total supply (ΣDⱼ > ΣSᵢ).",
    explanation: "A dummy source is needed when: 1) Demand > Supply, 2) There is a deficit of supply, 3) Some demand cannot be fulfilled, 4) The problem is unbalanced with excess demand. The dummy source provides the additional supply needed to balance the problem.",
    hint: "Dummy source = when demand exceeds supply.",
    level: "intermediate",
    codeExample: "Supply 400, Demand 500 → Deficit 100 → Add dummy source."
  },
  {
    question: "When do you use a dummy destination?",
    shortAnswer: "Use a dummy destination when total supply exceeds total demand (ΣSᵢ > ΣDⱼ).",
    explanation: "A dummy destination is needed when: 1) Supply > Demand, 2) There is surplus supply, 3) Some supply cannot be shipped, 4) The problem is unbalanced with surplus supply. The dummy destination absorbs the excess supply to balance the problem.",
    hint: "Dummy destination = when supply exceeds demand.",
    level: "intermediate",
    codeExample: "Supply 500, Demand 400 → Surplus 100 → Add dummy destination."
  },
  {
    question: "What costs are associated with dummy sources and destinations?",
    shortAnswer: "All costs associated with dummy sources and destinations are zero.",
    explanation: "Dummy costs are set to zero because: 1) Dummies represent artificial constructs, 2) They don't involve real shipping, 3) Zero costs don't affect the objective, 4) They serve only to balance the problem, and 5) Any non-zero cost would incorrectly penalize surplus or deficit.",
    hint: "Dummy costs = always zero.",
    level: "intermediate",
    codeExample: "c_{dummy,j} = 0 for dummy source, c_{i,dummy} = 0 for dummy destination."
  },
  {
    question: "What does a dummy source represent in real-world terms?",
    shortAnswer: "A dummy source represents unmet demand, lost sales, or backorders that couldn't be fulfilled.",
    explanation: "Real-world meanings include: 1) Lost sales due to insufficient inventory, 2) Customer orders that couldn't be fulfilled, 3) Backordered items waiting for restock, 4) Demand that will be satisfied later, 5) Customers who went to competitors, and 6) Opportunity cost of lost business.",
    hint: "Dummy source = demand that couldn't be met.",
    level: "expert",
    codeExample: "Dummy source allocation of 50 units = 50 units of lost sales."
  },
  {
    question: "What does a dummy destination represent in real-world terms?",
    shortAnswer: "A dummy destination represents unused supply, excess inventory, or storage of surplus goods.",
    explanation: "Real-world meanings include: 1) Excess inventory held in storage, 2) Production that wasn't needed, 3) Goods that are stored for future use, 4) Surplus that will be disposed of, 5) Safety stock maintained, and 6) Production capacity that was underutilized.",
    hint: "Dummy destination = supply that wasn't needed.",
    level: "expert",
    codeExample: "Dummy destination allocation of 50 units = 50 units in surplus storage."
  },
  {
    question: "What is the difference between a dummy source and a dummy destination?",
    shortAnswer: "A dummy source handles excess demand (supply deficit), while a dummy destination handles surplus supply (demand deficit).",
    explanation: "Dummy source: 1) Added when demand > supply, 2) Provides additional supply, 3) Represents unmet demand, 4) Has supply = deficit. Dummy destination: 1) Added when supply > demand, 2) Provides additional demand, 3) Represents unused supply, 4) Has demand = surplus.",
    hint: "Source = too much demand, Destination = too much supply.",
    level: "intermediate",
    codeExample: "Dummy source: demand deficit. Dummy destination: supply surplus."
  },
  {
    question: "How do you calculate the amount for a dummy source?",
    shortAnswer: "Dummy source supply = ΣDⱼ - ΣSᵢ (when demand exceeds supply).",
    explanation: "Calculation: 1) Calculate total demand (ΣDⱼ), 2) Calculate total supply (ΣSᵢ), 3) If ΣDⱼ > ΣSᵢ, the difference is the dummy source supply, 4) This amount represents the deficit that needs to be covered by the dummy source.",
    hint: "Dummy supply = Demand - Supply (when Demand > Supply).",
    level: "intermediate",
    codeExample: "Demand 600, Supply 400 → Dummy supply = 200."
  },
  {
    question: "How do you calculate the amount for a dummy destination?",
    shortAnswer: "Dummy destination demand = ΣSᵢ - ΣDⱼ (when supply exceeds demand).",
    explanation: "Calculation: 1) Calculate total supply (ΣSᵢ), 2) Calculate total demand (ΣDⱼ), 3) If ΣSᵢ > ΣDⱼ, the difference is the dummy destination demand, 4) This amount represents the surplus that needs to be absorbed by the dummy destination.",
    hint: "Dummy demand = Supply - Demand (when Supply > Demand).",
    level: "intermediate",
    codeExample: "Supply 600, Demand 400 → Dummy demand = 200."
  },
  {
    question: "Can a problem have both a dummy source and a dummy destination?",
    shortAnswer: "No, a transportation problem typically requires either a dummy source or a dummy destination, not both.",
    explanation: "A problem can only be unbalanced in one direction: either supply > demand (needs dummy destination) or demand > supply (needs dummy source). Adding both would overbalance the problem and create artificial double-counting.",
    hint: "Only one dummy type needed per problem.",
    level: "expert",
    codeExample: "Either dummy source OR dummy destination, not both."
  },
  {
    question: "Why are dummy costs set to zero?",
    shortAnswer: "Zero costs ensure dummies don't affect the objective function and only serve to balance the problem.",
    explanation: "Zero costs: 1) Prevent artificial cost impacts, 2) Allow focusing on real shipping costs, 3) Make dummies mathematically neutral, 4) Ensure surplus/deficit doesn't create costs, 5) Provide accurate total cost, and 6) Keep the solution interpretable.",
    hint: "Zero costs = neutral impact on objective.",
    level: "intermediate",
    codeExample: "All dummy costs are 0 in the cost matrix."
  },
  {
    question: "What happens if you set dummy costs to non-zero values?",
    shortAnswer: "Non-zero dummy costs would incorrectly penalize surplus or deficit situations and distort the solution.",
    explanation: "Consequences: 1) Artificial costs added to objective, 2) Solution may avoid surplus/deficit incorrectly, 3) Total cost becomes inaccurate, 4) Dummies no longer neutral, 5) May lead to suboptimal real decisions, and 6) Problem interpretation becomes confusing.",
    hint: "Non-zero dummy costs = incorrect solution.",
    level: "expert",
    codeExample: "Non-zero dummy costs would suggest surplus storage has cost."
  },
  {
    question: "How do dummy allocations help in decision making?",
    shortAnswer: "Dummy allocations reveal patterns of surplus and deficit that guide capacity planning and demand management.",
    explanation: "Decision insights: 1) Identify which sources consistently have surplus, 2) Identify which destinations face shortages, 3) Guide production adjustments, 4) Inform inventory decisions, 5) Support capacity planning, 6) Improve demand forecasting, and 7) Optimize supply chain structure.",
    hint: "Dummies reveal where inefficiencies exist.",
    level: "expert",
    codeExample: "High dummy allocation at a source → overproduction issue."
  },
  {
    question: "What is the role of dummy variables in the transportation simplex method?",
    shortAnswer: "Dummy variables allow the transportation simplex method to work on unbalanced problems by converting them to balanced form.",
    explanation: "Role in simplex: 1) Convert unbalanced to balanced, 2) Enable standard algorithm application, 3) Act as slack variables, 4) Have zero coefficients, 5) Don't affect optimality, 6) Provide feasibility, and 7) Allow the algorithm to find a solution.",
    hint: "Dummies make the simplex method work for unbalanced problems.",
    level: "expert",
    codeExample: "Dummy variables in the simplex tableau with zero costs."
  },
  {
    question: "How does a dummy destination affect the number of basic variables?",
    shortAnswer: "A dummy destination adds one row to the transportation table and increases the number of basic variables by one.",
    explanation: "Adding a dummy destination: 1) Increases the transportation table size, 2) Adds a new column, 3) Increases variables by m (for m sources), 4) Increases basic variables count, 5) Requires m + n - 1 basic variables, and 6) The dummy column has zero costs.",
    hint: "Dummy destination = additional column and variables.",
    level: "expert",
    codeExample: "m sources + (n+1) destinations → m+n basic variables."
  },
  {
    question: "How does a dummy source affect the number of basic variables?",
    shortAnswer: "A dummy source adds one column to the transportation table and increases the number of basic variables by one.",
    explanation: "Adding a dummy source: 1) Increases the transportation table size, 2) Adds a new row, 3) Increases variables by n (for n destinations), 4) Increases basic variables count, 5) Requires m + n - 1 basic variables, and 6) The dummy row has zero costs.",
    hint: "Dummy source = additional row and variables.",
    level: "expert",
    codeExample: "(m+1) sources + n destinations → m+n basic variables."
  },
  {
    question: "What is the economic interpretation of dummy source allocations?",
    shortAnswer: "Dummy source allocations represent the opportunity cost of unmet demand or lost sales.",
    explanation: "Economic interpretation: 1) Dummy source supply = total unmet demand, 2) Allocations to destinations show which customers face shortages, 3) Represents lost revenue opportunities, 4) Indicates demand not captured, 5) Shows market gaps, and 6) Guides marketing and production decisions.",
    hint: "Dummy source = lost business opportunity.",
    level: "expert",
    codeExample: "High dummy allocation to customer A → unmet demand at customer A."
  },
  {
    question: "What is the economic interpretation of dummy destination allocations?",
    shortAnswer: "Dummy destination allocations represent the cost of excess capacity or surplus inventory.",
    explanation: "Economic interpretation: 1) Dummy destination demand = total surplus supply, 2) Allocations from sources show which facilities have excess capacity, 3) Represents idle resources, 4) Indicates inefficient production, 5) Shows capacity utilization, and 6) Guides capacity planning decisions.",
    hint: "Dummy destination = excess capacity or surplus.",
    level: "expert",
    codeExample: "High dummy allocation from factory A → overproduction at factory A."
  },
  {
    question: "How do you interpret dummy allocations in the optimal solution?",
    shortAnswer: "Dummy allocations show where surplus exists (dummy destination) or where demand is unmet (dummy source).",
    explanation: "Interpretation: 1) Dummy destination allocations → which sources have unused supply, 2) Dummy source allocations → which destinations have unmet demand, 3) Zero allocations → no surplus or deficit at that point, 4) The pattern reveals systemic issues, and 5) Helps identify areas for improvement.",
    hint: "Dummy allocations reveal surplus/deficit patterns.",
    level: "expert",
    codeExample: "x₁,dummy = 50 → Source 1 has 50 units surplus."
  },
  {
    question: "What are the limitations of using dummy variables?",
    shortAnswer: "Limitations include not solving underlying imbalances and potentially hiding inefficiencies.",
    explanation: "Limitations: 1) Treat symptoms, not root causes, 2) May hide production inefficiencies, 3) Can mask demand management issues, 4) Requires regular rebalancing, 5) Doesn't optimize the supply chain, 6) May lead to complacency, and 7) Doesn't prevent future imbalances.",
    hint: "Dummies solve the math, not the business problem.",
    level: "expert",
    codeExample: "Dummies don't fix why supply exceeds demand."
  },
  {
    question: "How can dummy allocations be used for supply chain improvement?",
    shortAnswer: "Dummy allocations identify specific areas where supply chain efficiency can be improved.",
    explanation: "Improvement uses: 1) Identify overproducing sources, 2) Identify underserved destinations, 3) Guide production adjustments, 4) Inform inventory policies, 5) Support capacity expansion decisions, 6) Improve demand forecasting, and 7) Optimize supplier relationships.",
    hint: "Dummies show where to improve supply chain.",
    level: "expert",
    codeExample: "Reduce dummy allocations by better production planning."
  },
  {
    question: "What is the relationship between dummy variables and transportation costs?",
    shortAnswer: "Dummy variables have zero costs and don't affect total transportation cost calculations.",
    explanation: "Relationship: 1) Dummy costs = 0, 2) No impact on objective function, 3) No shipping actually occurs, 4) Costs only for real shipments, 5) Dummies balance the math, and 6) Total cost = sum of real costs only.",
    hint: "Dummies are cost-neutral.",
    level: "intermediate",
    codeExample: "Total cost only includes real source-destination shipments."
  },
  {
    question: "How does the transportation algorithm treat dummy variables differently?",
    shortAnswer: "The algorithm treats dummy variables like regular variables but with zero costs and special interpretation.",
    explanation: "Algorithm treatment: 1) Included in the transportation table, 2) Subject to same constraints, 3) Zero costs in objective, 4) Basic variables can be dummy, 5) Follows same rules for optimality, 6) Allocations interpreted specially, and 7) Doesn't affect optimality.",
    hint: "Dummies are treated like regular variables.",
    level: "expert",
    codeExample: "Dummy variables in the optimal solution like all others."
  },
  {
    question: "What is the impact of dummy variables on degeneracy?",
    shortAnswer: "Dummy variables can help resolve degeneracy by providing artificial basic variables when needed.",
    explanation: "Impact on degeneracy: 1) Can provide additional basic variables, 2) Helps when degeneracy occurs, 3) Provides artificial variables, 4) Can break ties in the simplex method, 5) May prevent cycling, and 6) Ensures feasibility.",
    hint: "Dummies can help handle degeneracy.",
    level: "expert",
    codeExample: "Dummy variable used as basic variable to handle degeneracy."
  },
  {
    question: "How do you handle dummy variables in sensitivity analysis?",
    shortAnswer: "Dummy variables are treated as regular variables in sensitivity analysis, but their zero costs make analysis simpler.",
    explanation: "Sensitivity analysis: 1) Dummy costs fixed at zero, 2) No need to vary dummy costs, 3) Focus on real costs, 4) Dummy allocations indicate sensitivity to real changes, 5) Changes in supply/demand affect dummy allocations, and 6) Provides insights for planning.",
    hint: "Dummies simplify sensitivity analysis.",
    level: "expert",
    codeExample: "Changes in demand affect dummy source allocations."
  },
  {
    question: "What is the future of handling unbalanced problems?",
    shortAnswer: "Future approaches include AI-driven balancing, predictive analytics, and dynamic dummy management.",
    explanation: "Future trends: 1) AI for predictive imbalance detection, 2) Real-time dynamic balancing, 3) Machine learning for forecasting, 4) Automated dummy adjustments, 5) Predictive analytics for supply-demand, 6) Integrated systems, 7) Smart logistics, and 8) Proactive imbalance prevention.",
    hint: "Technology is making imbalance handling smarter.",
    level: "expert",
    codeExample: "AI systems that predict and prevent imbalances."
  }
];

export default questions;