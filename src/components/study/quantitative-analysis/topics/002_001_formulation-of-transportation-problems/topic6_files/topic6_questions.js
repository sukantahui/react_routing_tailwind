const questions = [
  {
    question: "What is an unbalanced transportation problem?",
    shortAnswer: "An unbalanced transportation problem occurs when total supply does not equal total demand: ΣSᵢ ≠ ΣDⱼ.",
    explanation: "In an unbalanced problem, there is either surplus supply (ΣSᵢ > ΣDⱼ) or excess demand (ΣDⱼ > ΣSᵢ). This requires adding dummy sources or destinations with zero costs to balance the problem before solving using standard algorithms.",
    hint: "Think of imbalance as either surplus or shortage.",
    level: "basic",
    codeExample: "ΣSᵢ = 500, ΣDⱼ = 600 → Unbalanced (excess demand)."
  },
  {
    question: "What are the two types of unbalanced transportation problems?",
    shortAnswer: "The two types are surplus supply (ΣSᵢ > ΣDⱼ) and excess demand (ΣDⱼ > ΣSᵢ).",
    explanation: "Surplus supply occurs when there is more supply than demand, requiring a dummy destination. Excess demand occurs when there is more demand than supply, requiring a dummy source. Both types need special handling to make the problem solvable.",
    hint: "More supply = surplus, more demand = deficit.",
    level: "basic",
    codeExample: "Supply 500, Demand 400 → Surplus. Demand 500, Supply 400 → Deficit."
  },
  {
    question: "How do you handle surplus supply in a transportation problem?",
    shortAnswer: "Add a dummy destination with demand equal to the surplus and zero costs from all sources.",
    explanation: "When ΣSᵢ > ΣDⱼ: 1) Calculate surplus = ΣSᵢ - ΣDⱼ, 2) Add a dummy destination with demand = surplus, 3) Set all costs to the dummy destination as zero, 4) This creates a balanced problem that can be solved directly. The dummy represents unused supply.",
    hint: "Surplus supply needs a dummy destination.",
    level: "intermediate",
    codeExample: "Surplus 100 → Add dummy destination with demand 100, zero costs."
  },
  {
    question: "How do you handle excess demand in a transportation problem?",
    shortAnswer: "Add a dummy source with supply equal to the deficit and zero costs to all destinations.",
    explanation: "When ΣDⱼ > ΣSᵢ: 1) Calculate deficit = ΣDⱼ - ΣSᵢ, 2) Add a dummy source with supply = deficit, 3) Set all costs from the dummy source as zero, 4) This creates a balanced problem that can be solved directly. The dummy represents unmet demand.",
    hint: "Excess demand needs a dummy source.",
    level: "intermediate",
    codeExample: "Deficit 100 → Add dummy source with supply 100, zero costs."
  },
  {
    question: "Why do dummy costs need to be zero?",
    shortAnswer: "Zero costs ensure that dummy allocations don't affect the actual transportation cost calculation.",
    explanation: "Dummy costs represent either unused supply (dummy destination) or unmet demand (dummy source). Setting them to zero ensures: 1) The solution doesn't penalize for unused supply or unmet demand, 2) The actual shipping costs remain accurate, 3) The objective function only reflects real shipments, and 4) The dummy variables don't influence optimization decisions.",
    hint: "Zero costs keep the solution focused on real shipments.",
    level: "intermediate",
    codeExample: "cᵢ,ₙ₊₁ = 0 for all dummy destination costs."
  },
  {
    question: "What is the difference between surplus supply and excess demand?",
    shortAnswer: "Surplus supply means supply exceeds demand (ΣSᵢ > ΣDⱼ), while excess demand means demand exceeds supply (ΣDⱼ > ΣSᵢ).",
    explanation: "Surplus supply: 1) More goods available than needed, 2) Requires dummy destination, 3) Represents unused supply, 4) No customer shortages. Excess demand: 1) More customers than goods available, 2) Requires dummy source, 3) Represents unmet demand, 4) Some customers go unsatisfied.",
    hint: "Surplus = too much supply, excess = too much demand.",
    level: "intermediate",
    codeExample: "Supply 300, Demand 250 → Surplus. Demand 300, Supply 250 → Excess."
  },
  {
    question: "Why are unbalanced transportation problems more common in practice?",
    shortAnswer: "Real-world factors like demand fluctuations, supply variations, and business decisions create imbalances.",
    explanation: "Common causes: 1) Demand fluctuations (seasonal, economic), 2) Supply variations (production issues, weather), 3) Business decisions (building inventory, stockouts), 4) Supply chain disruptions, 5) Forecasting errors, 6) Market changes, and 7) Strategic planning decisions.",
    hint: "Real-world logistics is rarely perfectly balanced.",
    level: "intermediate",
    codeExample: "Seasonal demand creates imbalances throughout the year."
  },
  {
    question: "Can an unbalanced problem have an optimal solution without adding dummies?",
    shortAnswer: "No, unbalanced problems must be converted to balanced form using dummies before solving.",
    explanation: "Standard transportation algorithms require a balanced problem (ΣSᵢ = ΣDⱼ). Without adding dummies: 1) The problem is infeasible, 2) Algorithms won't work correctly, 3) Solutions would be invalid, and 4) Constraints can't be satisfied. Dummies are essential for solving unbalanced problems.",
    hint: "Dummies are required for standard solution methods.",
    level: "expert",
    codeExample: "Cannot solve unbalanced directly → must add dummies first."
  },
  {
    question: "What does a dummy destination represent in real-world terms?",
    shortAnswer: "A dummy destination represents unused supply that doesn't need to be shipped to any actual destination.",
    explanation: "Real-world meanings: 1) Excess inventory that stays in storage, 2) Production that's not needed, 3) Goods that are held as safety stock, 4) Surplus that will be disposed of, 5) Production that's postponed, or 6) Goods that are stored for future use.",
    hint: "Think of it as supply that isn't needed right now.",
    level: "expert",
    codeExample: "Dummy destination = warehouse storage for surplus goods."
  },
  {
    question: "What does a dummy source represent in real-world terms?",
    shortAnswer: "A dummy source represents unmet demand that can't be fulfilled by available supply.",
    explanation: "Real-world meanings: 1) Lost sales, 2) Unfilled orders, 3) Customer demand that can't be met, 4) Backordered items, 5) Opportunity cost of lost sales, 6) Customers who go elsewhere, or 7) Demand that will be satisfied later.",
    hint: "Think of it as demand that can't be fulfilled.",
    level: "expert",
    codeExample: "Dummy source = lost sales due to supply shortage."
  },
  {
    question: "How do you calculate the dummy demand or supply amount?",
    shortAnswer: "Dummy demand = ΣSᵢ - ΣDⱼ (if supply > demand). Dummy supply = ΣDⱼ - ΣSᵢ (if demand > supply).",
    explanation: "The calculation is straightforward: 1) Find the absolute difference between total supply and total demand, 2) If supply > demand, the difference becomes dummy demand, 3) If demand > supply, the difference becomes dummy supply, 4) This difference represents the imbalance amount.",
    hint: "Dummy amount = |ΣSᵢ - ΣDⱼ|.",
    level: "intermediate",
    codeExample: "Supply 500, Demand 400 → Dummy demand = 100."
  },
  {
    question: "What happens to the dummy allocations in the optimal solution?",
    shortAnswer: "Dummy allocations represent unused supply or unmet demand and don't affect the actual cost.",
    explanation: "In the optimal solution: 1) Dummy destination allocations show which sources have unused supply, 2) Dummy source allocations show which destinations have unmet demand, 3) These allocations have zero cost, 4) They provide insights into the imbalance, and 5) They help in capacity planning decisions.",
    hint: "Dummy allocations reveal surplus or shortage patterns.",
    level: "expert",
    codeExample: "xᵢ,ₙ₊₁ = 50 → Source i has 50 units unused."
  },
  {
    question: "How does seasonality create unbalanced transportation problems?",
    shortAnswer: "Seasonal factors cause supply and demand to vary throughout the year, creating temporary imbalances.",
    explanation: "Seasonal effects: 1) Agricultural supply varies by harvest season, 2) Consumer demand changes with weather and holidays, 3) Production capacity may be seasonal, 4) Inventory builds up during off-seasons, 5) Demand peaks during certain periods, and 6) Imbalances are temporary and predictable.",
    hint: "Seasons create predictable imbalances.",
    level: "expert",
    codeExample: "Summer: high demand for cold drinks, surplus of fruits."
  },
  {
    question: "What is the economic impact of unbalanced transportation problems?",
    shortAnswer: "Unbalanced problems create economic inefficiencies through waste (surplus) or lost sales (shortages).",
    explanation: "Economic impacts: 1) Surplus supply leads to storage costs and potential waste, 2) Excess demand leads to lost sales and customer dissatisfaction, 3) Both create inefficiencies, 4) Costs may increase due to rush orders or storage, 5) Profitability may decrease, and 6) Supply chain performance suffers.",
    hint: "Imbalance = economic inefficiency.",
    level: "expert",
    codeExample: "Surplus: storage costs ₹10/unit. Deficit: lost profit ₹50/unit."
  },
  {
    question: "How do you prevent unbalanced problems in supply chain management?",
    shortAnswer: "Prevention involves accurate forecasting, flexible supply, and effective inventory management.",
    explanation: "Prevention strategies: 1) Use demand forecasting, 2) Maintain flexible suppliers, 3) Implement inventory management, 4) Use safety stock, 5) Plan production capacity, 6) Build strategic partnerships, 7) Monitor supply and demand trends, and 8) Use technology for real-time monitoring.",
    hint: "Prevention is better than handling imbalances.",
    level: "expert",
    codeExample: "Monthly demand forecasting to adjust supply accordingly."
  },
  {
    question: "What is the role of dummy variables in the transportation simplex method?",
    shortAnswer: "Dummy variables allow the transportation simplex method to work on unbalanced problems by balancing them first.",
    explanation: "Dummy variables: 1) Convert unbalanced to balanced problems, 2) Allow standard algorithm application, 3) Act as slack variables, 4) Have zero coefficients in the objective, 5) Don't affect optimality, 6) Provide feasibility, and 7) Enable the simplex method to find a solution.",
    hint: "Dummies make the simplex method work for unbalanced problems.",
    level: "expert",
    codeExample: "Dummy variables with zero costs in the objective function."
  },
  {
    question: "How do you handle unbalanced problems with both surplus and deficit?",
    shortAnswer: "Complex unbalanced problems may require both dummy sources and dummy destinations in different parts of the network.",
    explanation: "In complex scenarios: 1) Some regions may have surplus, others deficit, 2) Transshipment may be needed, 3) Both dummy sources and destinations may be added, 4) The network becomes more complex, 5) Multi-stage optimization may be required, and 6) Advanced algorithms or heuristics may be needed.",
    hint: "Complex problems may need multiple dummies.",
    level: "expert",
    codeExample: "Region A: surplus 100, Region B: deficit 100 → transshipment needed."
  },
  {
    question: "What is the relationship between unbalanced problems and transportation costs?",
    shortAnswer: "Transportation costs don't cause imbalance but affect how the imbalance is handled in the optimal solution.",
    explanation: "Cost relationship: 1) Costs determine which sources supply which destinations, 2) Costs influence where surplus supply goes (dummy allocation), 3) Costs affect which demand is prioritized, 4) Lower costs on some routes may reduce surplus or deficit, and 5) Costs guide decisions about handling imbalances.",
    hint: "Costs affect the optimal handling of imbalances.",
    level: "expert",
    codeExample: "High costs may make surplus supply more expensive to ship."
  },
  {
    question: "How does technology help in identifying unbalanced problems?",
    shortAnswer: "Technology enables real-time monitoring and identification of supply-demand imbalances.",
    explanation: "Technology applications: 1) ERP systems track supply and demand, 2) Analytics identify imbalances automatically, 3) Dashboard alerts notify of imbalances, 4) AI predicts potential imbalances, 5) Reporting tools summarize balance status, and 6) Optimization software suggests dummy handling.",
    hint: "Technology identifies and alerts about imbalances.",
    level: "expert",
    codeExample: "Real-time dashboard showing supply-demand gaps."
  },
  {
    question: "What are the consequences of ignoring an unbalanced transportation problem?",
    shortAnswer: "Ignoring imbalance leads to infeasible solutions, incorrect costs, and poor business decisions.",
    explanation: "Consequences: 1) Infeasible solution (can't meet constraints), 2) Incorrect cost calculations, 3) Poor resource allocation, 4) Wasted resources (surplus), 5) Lost opportunities (deficit), 6) Customer dissatisfaction, and 7) Financial losses.",
    hint: "Ignoring imbalance leads to bad decisions.",
    level: "expert",
    codeExample: "Ignoring surplus leads to storage waste. Ignoring deficit leads to lost sales."
  },
  {
    question: "How do you balance a problem with surplus supply?",
    shortAnswer: "Add a dummy destination with demand equal to the surplus and zero shipping costs.",
    explanation: "Steps: 1) Calculate total supply ΣSᵢ and total demand ΣDⱼ, 2) Find surplus = ΣSᵢ - ΣDⱼ, 3) Add dummy destination D_{n+1} with demand = surplus, 4) Set costs from all sources to dummy destination = 0, 5) This creates a balanced problem solvable by standard methods.",
    hint: "Dummy destination absorbs surplus supply.",
    level: "intermediate",
    codeExample: "Supply 600, Demand 400 → Add dummy destination with demand 200."
  },
  {
    question: "How do you balance a problem with excess demand?",
    shortAnswer: "Add a dummy source with supply equal to the deficit and zero shipping costs.",
    explanation: "Steps: 1) Calculate total supply ΣSᵢ and total demand ΣDⱼ, 2) Find deficit = ΣDⱼ - ΣSᵢ, 3) Add dummy source S_{m+1} with supply = deficit, 4) Set costs from dummy source to all destinations = 0, 5) This creates a balanced problem solvable by standard methods.",
    hint: "Dummy source provides unmet demand.",
    level: "intermediate",
    codeExample: "Demand 600, Supply 400 → Add dummy source with supply 200."
  },
  {
    question: "What is the difference between a dummy source and a dummy destination?",
    shortAnswer: "A dummy source handles excess demand (supply deficit), while a dummy destination handles surplus supply (demand deficit).",
    explanation: "Dummy source: 1) Added when ΣDⱼ > ΣSᵢ, 2) Supply = deficit, 3) Represents unmet demand, 4) Costs from dummy = 0. Dummy destination: 1) Added when ΣSᵢ > ΣDⱼ, 2) Demand = surplus, 3) Represents unused supply, 4) Costs to dummy = 0.",
    hint: "Source = excess demand, Destination = surplus supply.",
    level: "intermediate",
    codeExample: "Dummy source → too much demand. Dummy destination → too much supply."
  },
  {
    question: "How do seasonal imbalances affect transportation planning?",
    shortAnswer: "Seasonal imbalances require flexible planning, with dummies used to handle temporary surplus or deficit.",
    explanation: "Seasonal planning: 1) Identify seasonal patterns, 2) Plan for surplus storage or deficit fulfillment, 3) Use dummy adjustments seasonally, 4) Maintain flexible capacity, 5) Use forecasting to anticipate changes, 6) Implement seasonal strategies (storage, sourcing), and 7) Regular review and adjustment.",
    hint: "Plan for seasonal imbalances in advance.",
    level: "expert",
    codeExample: "Winter: high storage capacity for surplus, Summer: high sourcing capacity for demand."
  },
  {
    question: "What are the cost implications of dummy allocations?",
    shortAnswer: "Dummy allocations have zero costs but indicate where surplus or deficit exists, affecting business decisions.",
    explanation: "Cost implications: 1) Zero direct cost for dummy allocations, 2) Indicate surplus supply (dummy destination), 3) Indicate unmet demand (dummy source), 4) Guide investment decisions (reduce surplus, increase capacity), 5) Help identify inefficiencies, and 6) Support strategic planning.",
    hint: "Dummy allocations reveal cost-saving opportunities.",
    level: "expert",
    codeExample: "High dummy allocation → inefficiency that needs attention."
  },
  {
    question: "How does the transportation algorithm handle dummy variables?",
    shortAnswer: "The algorithm treats dummy variables like real variables but with zero costs, solving the balanced problem.",
    explanation: "Algorithm handling: 1) Dummies are included in the table, 2) They have zero costs, 3) They are considered in allocation, 4) They appear in the optimal solution, 5) They don't affect objective function value, 6) They provide feasibility, and 7) They help interpret the solution.",
    hint: "Dummies are treated as regular variables with zero costs.",
    level: "expert",
    codeExample: "Dummy variables are solved like all other variables."
  },
  {
    question: "What are the limitations of dummy variable approach?",
    shortAnswer: "Limitations include not addressing root causes of imbalance and potentially hiding inefficiencies.",
    explanation: "Limitations: 1) Doesn't solve underlying imbalance problems, 2) May hide inefficiencies, 3) Can mask production or demand issues, 4) Doesn't address root causes, 5) Requires regular rebalancing, 6) May lead to complacency, and 7) Doesn't optimize the supply chain structure.",
    hint: "Dummies solve the math problem, not the business problem.",
    level: "expert",
    codeExample: "Dummies treat symptoms, not the cause of imbalance."
  },
  {
    question: "How do you minimize the need for dummy variables in practice?",
    shortAnswer: "Minimize dummies through better planning, forecasting, and supply-demand alignment.",
    explanation: "Minimization strategies: 1) Improve demand forecasting, 2) Align production with demand, 3) Use flexible suppliers, 4) Implement JIT systems, 5) Manage inventory effectively, 6) Use demand management techniques, 7) Build strategic partnerships, and 8) Use technology for real-time adjustments.",
    hint: "Better planning reduces the need for dummies.",
    level: "expert",
    codeExample: "Align production schedules with demand forecasts to minimize imbalance."
  },
  {
    question: "What is the future of handling unbalanced transportation problems?",
    shortAnswer: "Future approaches include AI-driven dynamic balancing, predictive analytics, and proactive planning.",
    explanation: "Future trends: 1) AI for predictive imbalance detection, 2) Real-time dynamic balancing, 3) Machine learning for demand forecasting, 4) Automated dummy handling, 5) Predictive analytics for supply, 6) Integrated supply-demand management, 7) Smart logistics systems, and 8) Proactive rather than reactive approaches.",
    hint: "Technology is making imbalance handling more proactive.",
    level: "expert",
    codeExample: "AI systems that automatically adjust for predicted imbalances."
  }
];

export default questions;