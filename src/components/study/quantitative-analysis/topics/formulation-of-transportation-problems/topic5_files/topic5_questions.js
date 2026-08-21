const questions = [
  {
    question: "What is a balanced transportation problem?",
    shortAnswer: "A balanced transportation problem is one where total supply equals total demand: ΣSᵢ = ΣDⱼ.",
    explanation: "In a balanced transportation problem, every unit of supply from all sources exactly meets every unit of demand at all destinations. There is no surplus supply or unmet demand, making the problem directly solvable using standard transportation algorithms without any dummy adjustments.",
    hint: "Think of perfect balance between supply and demand.",
    level: "basic",
    codeExample: "ΣSᵢ = 500 and ΣDⱼ = 500 → Balanced problem."
  },
  {
    question: "What is the balance condition in transportation problems?",
    shortAnswer: "The balance condition is Σᵢ Sᵢ = Σⱼ Dⱼ, meaning total supply equals total demand.",
    explanation: "The balance condition ensures that all goods from sources can exactly satisfy all demands at destinations. This condition is necessary for a transportation problem to be balanced and directly solvable without dummy variables. If this condition doesn't hold, the problem is unbalanced.",
    hint: "Total supply must equal total demand.",
    level: "basic",
    codeExample: "ΣSᵢ = ΣDⱼ is the balance condition."
  },
  {
    question: "Why is a balanced transportation problem easier to solve?",
    shortAnswer: "Balanced problems can be solved directly using standard algorithms without the need for dummy variables.",
    explanation: "In balanced problems: 1) No dummy sources or destinations are needed, 2) Standard algorithms (NW corner, Least Cost, VAM, MODI) apply directly, 3) The solution is guaranteed to be feasible, 4) All supply is utilized, and 5) All demand is satisfied. This makes the solution process simpler and more straightforward.",
    hint: "Direct solution without dummy variables.",
    level: "intermediate",
    codeExample: "Direct application of transportation algorithms."
  },
  {
    question: "How do you check if a transportation problem is balanced?",
    shortAnswer: "Calculate total supply (ΣSᵢ) and total demand (ΣDⱼ) and compare them. If equal, the problem is balanced.",
    explanation: "To check balance: 1) List all sources with their supply values, 2) List all destinations with their demand values, 3) Sum all supply values to get total supply, 4) Sum all demand values to get total demand, 5) Compare the two sums. If they are equal, the problem is balanced.",
    hint: "Add all supplies and all demands, then compare.",
    level: "basic",
    codeExample: "Total Supply = 100+150+120 = 370, Total Demand = 80+90+100+100 = 370 → Balanced."
  },
  {
    question: "What are the characteristics of a balanced transportation problem?",
    shortAnswer: "Characteristics include exact equality, no surplus, no shortage, direct solvability, and guaranteed feasibility.",
    explanation: "Key characteristics: 1) ΣSᵢ = ΣDⱼ (exact equality), 2) All supply is fully utilized, 3) All demand is completely satisfied, 4) No dummy variables needed, 5) Standard algorithms apply directly, 6) Feasible solution is guaranteed, and 7) The problem is well-posed.",
    hint: "Think: equal, utilized, satisfied, direct, feasible.",
    level: "intermediate",
    codeExample: "Balanced: all supply used, all demand met."
  },
  {
    question: "What happens when a transportation problem is not balanced?",
    shortAnswer: "When unbalanced, dummy sources or destinations must be added to balance the problem before solving.",
    explanation: "If ΣSᵢ > ΣDⱼ (surplus supply), add a dummy destination with zero costs. If ΣDⱼ > ΣSᵢ (excess demand), add a dummy source with zero costs. This balances the problem so that standard algorithms can be applied.",
    hint: "Unbalanced problems need dummy adjustments.",
    level: "intermediate",
    codeExample: "Surplus supply → dummy destination. Excess demand → dummy source."
  },
  {
    question: "Why is balance important in transportation problems?",
    shortAnswer: "Balance ensures feasibility and allows direct application of standard solution algorithms.",
    explanation: "Balance is important because: 1) It guarantees a feasible solution exists, 2) It ensures all supply is used and all demand is met, 3) It allows direct use of standard algorithms, 4) It simplifies the solution process, 5) It produces meaningful economic results, and 6) It prevents waste or unmet needs.",
    hint: "Balance = feasibility + simplicity + efficiency.",
    level: "intermediate",
    codeExample: "Balanced problems are easier and more meaningful to solve."
  },
  {
    question: "What are the advantages of balanced transportation problems?",
    shortAnswer: "Advantages include direct solvability, guaranteed feasibility, no dummy variables, and efficient solutions.",
    explanation: "Advantages: 1) No dummy sources or destinations needed, 2) Standard algorithms work directly, 3) Feasible solution is guaranteed, 4) All resources are optimally utilized, 5) All demands are exactly met, 6) The solution is economically meaningful, and 7) The problem is easier to understand and explain.",
    hint: "Balanced problems are simpler and more efficient.",
    level: "intermediate",
    codeExample: "Direct solution without modifications."
  },
  {
    question: "How do you handle rounding errors when checking balance?",
    shortAnswer: "Use sufficient precision and consider tolerance levels for rounding errors in balance checks.",
    explanation: "To handle rounding: 1) Use the same precision for all values, 2) Calculate totals carefully, 3) Consider a small tolerance (e.g., 0.01) for rounding errors, 4) Document any rounding assumptions, and 5) Adjust if necessary to maintain practical balance.",
    hint: "Precision matters in balance calculations.",
    level: "expert",
    codeExample: "Check if |ΣSᵢ - ΣDⱼ| < tolerance (e.g., 0.01)."
  },
  {
    question: "Can a balanced transportation problem have multiple optimal solutions?",
    shortAnswer: "Yes, balanced transportation problems can have multiple optimal solutions with the same total cost.",
    explanation: "Multiple optimal solutions occur when: 1) There are alternative shipping plans with the same total cost, 2) Degeneracy in the solution allows for alternative allocations, 3) The cost matrix has equal costs for some routes, or 4) There are multiple ways to allocate supply to demand. All optimal solutions have the same total cost.",
    hint: "Different shipping plans can have the same optimal cost.",
    level: "expert",
    codeExample: "Two different shipping plans both giving Z* = ₹1000."
  },
  {
    question: "What is the relationship between balanced problems and the transportation simplex?",
    shortAnswer: "Balanced problems are directly solvable by the transportation simplex method without any modifications.",
    explanation: "The transportation simplex method: 1) Requires a balanced problem to work directly, 2) Starts with an initial basic feasible solution, 3) Checks optimality using the MODI method, 4) Makes improvements until optimal, and 5) Handles degeneracy if it occurs. Balance is a prerequisite for the standard algorithm.",
    hint: "Transportation simplex works directly on balanced problems.",
    level: "expert",
    codeExample: "Transportation simplex algorithm for balanced problems."
  },
  {
    question: "How do you convert an unbalanced problem into a balanced one?",
    shortAnswer: "Add dummy sources (if demand exceeds supply) or dummy destinations (if supply exceeds demand) with zero costs.",
    explanation: "Conversion steps: 1) Calculate total supply (ΣSᵢ) and total demand (ΣDⱼ), 2) If ΣSᵢ > ΣDⱼ, add dummy destination with demand = ΣSᵢ - ΣDⱼ and zero costs, 3) If ΣDⱼ > ΣSᵢ, add dummy source with supply = ΣDⱼ - ΣSᵢ and zero costs, 4) This creates a balanced problem that can be solved directly.",
    hint: "Add dummies with zero costs to balance.",
    level: "intermediate",
    codeExample: "Supply 400, Demand 500 → Add dummy source with supply 100."
  },
  {
    question: "What is the significance of the balance condition in real-world logistics?",
    shortAnswer: "Balance represents efficient resource allocation where supply matches demand exactly.",
    explanation: "Real-world significance: 1) Minimal waste (no surplus), 2) Customer satisfaction (no shortages), 3) Efficient resource utilization, 4) Optimal inventory management, 5) Cost-effective operations, 6) Reduced storage costs, and 7) Better supply chain performance.",
    hint: "Balance = efficiency in real-world logistics.",
    level: "expert",
    codeExample: "Factory production matches customer orders exactly."
  },
  {
    question: "How does balance affect the feasibility of a transportation problem?",
    shortAnswer: "Balance is a necessary condition for feasibility in a standard transportation problem.",
    explanation: "Balance affects feasibility: 1) If ΣSᵢ = ΣDⱼ, a feasible solution exists, 2) If ΣSᵢ > ΣDⱼ, there is surplus supply, 3) If ΣDⱼ > ΣSᵢ, there is unmet demand, 4) Without balance, the problem as stated is infeasible, 5) Dummy adjustments are needed to create feasibility.",
    hint: "Balance = feasibility in transportation problems.",
    level: "intermediate",
    codeExample: "Feasible only when ΣSᵢ = ΣDⱼ (after dummy adjustments)."
  },
  {
    question: "What is the role of dummy variables in balanced transportation problems?",
    shortAnswer: "Dummy variables are not needed in balanced problems because supply already equals demand.",
    explanation: "In balanced problems: 1) No dummy sources are needed, 2) No dummy destinations are needed, 3) All variables represent real shipments, 4) The solution has practical meaning, 5) The problem size is at its minimum, and 6) The solution is more interpretable. Dummies only appear when the problem is unbalanced.",
    hint: "Dummies are unnecessary in balanced problems.",
    level: "intermediate",
    codeExample: "Balanced: no dummy variables. Unbalanced: dummies needed."
  },
  {
    question: "How do seasonal variations affect the balance of transportation problems?",
    shortAnswer: "Seasonal variations can create temporary imbalances that need to be managed through planning and adjustments.",
    explanation: "Seasonal impacts: 1) Supply varies with production seasons, 2) Demand varies with consumer seasons, 3) Balance may shift throughout the year, 4) Planning must account for seasonal changes, 5) Inventory can buffer seasonal imbalances, 6) Flexible sourcing helps maintain balance, and 7) Forecasting is essential.",
    hint: "Seasons can create temporary imbalances.",
    level: "expert",
    codeExample: "Summer: high supply of fruits, high demand for cold drinks."
  },
  {
    question: "What is the difference between balanced and unbalanced transportation problems?",
    shortAnswer: "Balanced problems have ΣSᵢ = ΣDⱼ, while unbalanced problems have ΣSᵢ ≠ ΣDⱼ.",
    explanation: "Key differences: 1) Balanced: no dummy needed, directly solvable, all supply used, all demand met. 2) Unbalanced: dummy needed, requires modification, surplus or deficit exists. Balanced problems are simpler and more efficient to solve.",
    hint: "Equal vs. not equal total supply and demand.",
    level: "intermediate",
    codeExample: "Balanced: 500 = 500. Unbalanced: 500 ≠ 600."
  },
  {
    question: "How does the cost matrix affect balance in transportation problems?",
    shortAnswer: "The cost matrix doesn't affect balance, but it determines the optimal shipping plan once balance is established.",
    explanation: "The cost matrix: 1) Doesn't change the balance condition, 2) Doesn't affect feasibility, 3) Determines which routes are used, 4) Affects the optimal allocation, 5) Influences total cost, and 6) Guides the optimization process. Balance is about quantities (supply/demand), not costs.",
    hint: "Costs affect optimization, not balance.",
    level: "intermediate",
    codeExample: "Balance: ΣSᵢ = ΣDⱼ regardless of costs."
  },
  {
    question: "What are the implications of balance for supply chain management?",
    shortAnswer: "Balance implies efficient supply chain operations with minimal waste and maximum customer satisfaction.",
    explanation: "Implications: 1) Just-in-time delivery possible, 2) Reduced inventory costs, 3) Improved cash flow, 4) Better customer service, 5) Efficient resource utilization, 6) Lower transportation costs, 7) Improved supply chain visibility, and 8) Better supplier relationships.",
    hint: "Balance = supply chain efficiency.",
    level: "expert",
    codeExample: "Supply chain with perfect supply-demand matching."
  },
  {
    question: "How do you maintain balance in dynamic transportation problems?",
    shortAnswer: "Maintain balance through regular monitoring, forecasting, and flexible planning adjustments.",
    explanation: "Maintenance strategies: 1) Regular monitoring of supply and demand, 2) Using forecasting tools, 3) Maintaining safety stock, 4) Flexible sourcing options, 5) Dynamic inventory management, 6) Regular plan updates, 7) Collaboration with partners, and 8) Using real-time data.",
    hint: "Balance requires ongoing attention and adjustment.",
    level: "expert",
    codeExample: "Weekly review and adjustment of supply-demand balance."
  },
  {
    question: "What is the relationship between balance and optimality in transportation?",
    shortAnswer: "Balance is about feasibility, while optimality is about finding the minimum cost solution subject to balance.",
    explanation: "Balance: 1) Ensures feasibility, 2) Guarantees a solution exists. Optimality: 1) Finds the minimum cost solution, 2) Requires solving the optimization problem, 3) Balance is a prerequisite for optimality, 4) Both are necessary for a complete solution.",
    hint: "Balance first, then optimize.",
    level: "expert",
    codeExample: "Balance → Feasible solution. Optimization → Optimal solution."
  },
  {
    question: "How does technology help in maintaining balanced transportation problems?",
    shortAnswer: "Technology enables real-time monitoring, forecasting, and automated adjustments to maintain balance.",
    explanation: "Technology applications: 1) ERP systems for data integration, 2) AI for demand forecasting, 3) IoT for real-time tracking, 4) Analytics for pattern detection, 5) Optimization software for planning, 6) Cloud platforms for collaboration, 7) Automated replenishment systems, and 8) Real-time visibility tools.",
    hint: "Technology keeps transportation problems balanced.",
    level: "expert",
    codeExample: "AI-powered demand forecasting integrated with supply planning."
  },
  {
    question: "What are the economic benefits of balanced transportation problems?",
    shortAnswer: "Economic benefits include cost reduction, waste minimization, and improved resource utilization.",
    explanation: "Economic benefits: 1) Lower transportation costs, 2) Reduced inventory costs, 3) Minimal waste, 4) Better resource utilization, 5) Improved profitability, 6) Competitive advantage, 7) Customer satisfaction, and 8) Supply chain efficiency.",
    hint: "Balance saves money and reduces waste.",
    level: "expert",
    codeExample: "Balanced distribution reduces logistics costs by up to 25%."
  },
  {
    question: "What is the impact of globalization on balanced transportation problems?",
    shortAnswer: "Globalization creates more complex balance requirements with international supply and demand considerations.",
    explanation: "Globalization impacts: 1) Multi-country supply sources, 2) International demand markets, 3) Currency fluctuations affect balance, 4) Regulatory requirements, 5) Longer shipping times require buffer, 6) Seasonality varies by region, 7) Cultural factors affect demand, and 8) Global risks require contingency planning.",
    hint: "Global supply chains are harder to balance.",
    level: "expert",
    codeExample: "Global supply chain with sources in Asia and demand in Europe."
  },
  {
    question: "How do you handle balance when dealing with perishable goods?",
    shortAnswer: "Perishable goods require careful timing and balance to minimize waste and ensure freshness.",
    explanation: "Perishable handling: 1) Accurate demand forecasting, 2) Just-in-time delivery, 3) Faster transportation modes, 4) Temperature-controlled logistics, 5) Smaller batch sizes, 6) Regular monitoring, 7) Buffer stock (with shorter shelf life), and 8) Alternative disposal options for surplus.",
    hint: "Perishable goods need precise balance and timing.",
    level: "expert",
    codeExample: "Fresh produce distributed daily with accurate demand matching."
  },
  {
    question: "What is the role of safety stock in maintaining balance?",
    shortAnswer: "Safety stock provides a buffer that helps maintain balance when supply or demand fluctuates.",
    explanation: "Safety stock: 1) Protects against demand spikes, 2) Covers supply disruptions, 3) Helps maintain service levels, 4) Provides time to adjust plans, 5) Creates flexibility, 6) Reduces risk of imbalance, and 7) Allows for planned adjustments. However, too much safety stock creates waste.",
    hint: "Safety stock buffers against balance disruptions.",
    level: "expert",
    codeExample: "Safety stock = 10% of demand to protect against fluctuations."
  },
  {
    question: "How does demand forecasting help in achieving balance?",
    shortAnswer: "Demand forecasting predicts future demand, allowing proactive planning to achieve balance.",
    explanation: "Forecasting helps: 1) Anticipate future demand, 2) Plan supply accordingly, 3) Reduce uncertainty, 4) Optimize inventory levels, 5) Plan transportation capacity, 6) Schedule production, 7) Coordinate with suppliers, and 8) Maintain balance in advance.",
    hint: "Forecast to balance before imbalances occur.",
    level: "expert",
    codeExample: "Monthly demand forecast used to plan supply and transportation."
  },
  {
    question: "What are the consequences of an unbalanced transportation problem?",
    shortAnswer: "Consequences include surplus supply (waste) or unmet demand (customer dissatisfaction).",
    explanation: "Consequences: 1) Surplus supply leads to waste and storage costs, 2) Unmet demand leads to lost sales and customer dissatisfaction, 3) Need for dummy adjustments, 4) More complex solution process, 5) May require additional resources, 6) Economic inefficiency, and 7) Supply chain disruptions.",
    hint: "Unbalanced = waste or shortage.",
    level: "intermediate",
    codeExample: "Surplus: goods sit in warehouse. Deficit: customers go without."
  },
  {
    question: "How does balance affect the interpretation of dual variables?",
    shortAnswer: "In balanced problems, dual variables represent shadow prices for supplies and demands with clear economic meaning.",
    explanation: "Dual variables: 1) uᵢ represents shadow price of supply at source i, 2) vⱼ represents shadow price of demand at destination j, 3) In balanced problems, these have meaningful economic interpretations, 4) They show the value of additional supply or demand, 5) They guide investment decisions, and 6) They provide sensitivity information.",
    hint: "Balance gives meaningful economic interpretation to dual variables.",
    level: "expert",
    codeExample: "uᵢ = value of one additional unit at source i in a balanced problem."
  },
  {
    question: "What is the future of balanced transportation problems?",
    shortAnswer: "Future trends include AI-driven balance, real-time dynamic balancing, and integrated supply-demand optimization.",
    explanation: "Future trends: 1) AI for dynamic balance optimization, 2) Real-time supply-demand matching, 3) Autonomous logistics systems, 4) Predictive analytics for balance, 5) Sustainable balance strategies, 6) Integration with IoT, 7) Blockchain for transparency, and 8) Smart city logistics integration.",
    hint: "Technology is making balance more dynamic and efficient.",
    level: "expert",
    codeExample: "AI-powered systems that automatically maintain supply-demand balance."
  }
];

export default questions;