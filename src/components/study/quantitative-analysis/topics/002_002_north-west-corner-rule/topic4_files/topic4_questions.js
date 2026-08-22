const questions = [
  {
    question: "What is the transportation cost calculation formula?",
    shortAnswer: "The total transportation cost is Z = Σᵢ Σⱼ cᵢⱼ × xᵢⱼ, where cᵢⱼ is the unit cost and xᵢⱼ is the quantity shipped.",
    explanation: "The formula sums the cost of each individual shipment. For each allocated cell (i,j), multiply the quantity shipped (xᵢⱼ) by the unit transportation cost (cᵢⱼ). Add all these products together to get the total transportation cost. This is the objective function of the transportation problem.",
    hint: "Multiply each shipment by its cost, then sum everything.",
    level: "basic",
    codeExample: "Z = ΣᵢΣⱼ cᵢⱼ × xᵢⱼ"
  },
  {
    question: "What costs are included in transportation cost calculation?",
    shortAnswer: "Only allocated cells (positive shipments) contribute to the total cost.",
    explanation: "The total cost includes: 1) All cells with positive allocations (xᵢⱼ > 0), 2) Each allocated cell's cost is xᵢⱼ × cᵢⱼ, 3) Cells without allocations have zero cost contribution, 4) Dummy allocations have zero cost, and 5) Only real shipments contribute to the total cost.",
    hint: "Only cells with allocations count toward the total.",
    level: "intermediate",
    codeExample: "If xᵢⱼ = 0, cost contribution = 0."
  },
  {
    question: "How do you calculate the cost of a single shipment?",
    shortAnswer: "Cost of a single shipment = Quantity shipped × Unit transportation cost.",
    explanation: "For any shipment from source i to destination j: 1) Identify the allocation amount (xᵢⱼ), 2) Identify the unit cost (cᵢⱼ), 3) Multiply them together: Cost = xᵢⱼ × cᵢⱼ, 4) This gives the cost for that particular route, and 5) Sum all such costs for total cost.",
    hint: "Multiply quantity by rate to get cost.",
    level: "basic",
    codeExample: "x₁₂ = 50, c₁₂ = ₹10 → Cost = 50 × ₹10 = ₹500."
  },
  {
    question: "What is the role of the cost matrix in cost calculation?",
    shortAnswer: "The cost matrix provides the unit costs (cᵢⱼ) used in the cost calculation.",
    explanation: "The cost matrix: 1) Contains the unit transportation costs for each source-destination pair, 2) Each cell (i,j) has cost cᵢⱼ, 3) These costs are multiplied by allocations to get total cost, 4) Dummy costs are zero, and 5) The matrix is essential for calculating total cost.",
    hint: "The cost matrix provides the 'prices' for shipping.",
    level: "intermediate",
    codeExample: "c₁₂ = ₹10 is the unit cost from Source 1 to Destination 2."
  },
  {
    question: "How do dummy allocations affect the total cost?",
    shortAnswer: "Dummy allocations have zero cost and do not affect the total transportation cost.",
    explanation: "Dummy costs are always zero because: 1) Dummy sources represent unmet demand, 2) Dummy destinations represent unused supply, 3) No actual shipping occurs, 4) The cost of not shipping is zero, and 5) They only serve to balance the problem. Total cost includes only real shipments.",
    hint: "Dummies have zero cost, so they don't change the total.",
    level: "intermediate",
    codeExample: "Dummy cost = ₹0, so no impact on total cost."
  },
  {
    question: "What is the difference between total cost and unit cost?",
    shortAnswer: "Unit cost is the cost per item shipped; total cost is the sum of all unit costs multiplied by quantities.",
    explanation: "Unit cost (cᵢⱼ): 1) Cost to ship one unit from source i to destination j, 2) Given in the cost matrix, 3) Independent of quantity. Total cost (Z): 1) Sum of all shipment costs, 2) Depends on allocations, 3) Objective to minimize, and 4) Z = Σ(cᵢⱼ × xᵢⱼ).",
    hint: "Unit cost is per item; total cost is everything added up.",
    level: "basic",
    codeExample: "Unit cost ₹10, 50 units shipped → Total cost ₹500."
  },
  {
    question: "Why is it important to calculate total transportation cost?",
    shortAnswer: "Total cost provides a baseline for comparing shipping plans and making optimization decisions.",
    explanation: "Importance: 1) Evaluates the quality of a shipping plan, 2) Allows comparison between different plans, 3) Tracks improvement during optimization, 4) Provides cost estimates for budgeting, 5) Supports decision-making, and 6) Helps identify cost-saving opportunities.",
    hint: "Cost tells you how good or bad your plan is.",
    level: "intermediate",
    codeExample: "Compare costs of different shipping plans to choose the best one."
  },
  {
    question: "How do you verify the accuracy of cost calculation?",
    shortAnswer: "Check row sums, column sums, and ensure total cost is consistent with allocations and costs.",
    explanation: "Verification steps: 1) Sum all allocations in each row and verify against supply, 2) Sum all allocations in each column and verify against demand, 3) Calculate the cost for each row and sum, 4) Calculate cost for each column and sum, 5) The total should be the same, and 6) Check arithmetic carefully.",
    hint: "Check your math and verify totals.",
    level: "intermediate",
    codeExample: "Row costs sum = Column costs sum = Total cost."
  },
  {
    question: "What is the relationship between cost and feasibility?",
    shortAnswer: "Cost calculation assumes feasibility; cost doesn't affect feasibility, but feasibility affects cost.",
    explanation: "Relationship: 1) Feasibility is about satisfying constraints, 2) Cost is about the objective function, 3) A feasible solution has a calculable cost, 4) Cost is used to evaluate feasible solutions, 5) Optimization finds the feasible solution with minimum cost, and 6) Infeasible solutions don't have valid costs.",
    hint: "Feasible = can calculate cost; Cost doesn't affect feasibility.",
    level: "expert",
    codeExample: "Feasible solution → Cost calculation. Infeasible → No valid cost."
  },
  {
    question: "What is the relationship between cost and optimality?",
    shortAnswer: "Cost is the objective to minimize; optimality is achieved when no lower cost solution exists.",
    explanation: "Relationship: 1) Cost is what we're trying to minimize, 2) The optimal solution has the minimum cost, 3) Other solutions have higher costs, 4) Cost comparison identifies better solutions, 5) The MODI method checks optimality using costs, and 6) The optimal cost is the goal of the transportation problem.",
    hint: "Optimal = lowest possible cost.",
    level: "expert",
    codeExample: "Optimal cost ≤ cost of any feasible solution."
  },
  {
    question: "How do you calculate cost for a NW Corner solution?",
    shortAnswer: "Multiply each NW Corner allocation by its unit cost and sum all products.",
    explanation: "Steps: 1) Record all allocations from NW Corner, 2) For each allocated cell, multiply the allocation by the unit cost, 3) Sum all these products, 4) This gives the total cost of the NW Corner solution, 5) This cost serves as a baseline for improvement, and 6) It's usually higher than the optimal cost.",
    hint: "Apply the same cost formula to NW Corner allocations.",
    level: "intermediate",
    codeExample: "Sum of (NW allocation × cost) for all allocated cells."
  },
  {
    question: "How does the Least Cost method affect cost calculation?",
    shortAnswer: "Least Cost method generally produces a lower total cost than NW Corner because it considers costs.",
    explanation: "Effect on cost: 1) Uses cheaper routes first, 2) Results in lower total cost, 3) Better starting point for optimization, 4) Reduces number of iterations needed, 5) Cost is usually closer to optimal, and 6) The same cost formula applies to any method.",
    hint: "Least Cost = lower cost than NW Corner.",
    level: "intermediate",
    codeExample: "Least Cost cost < NW Corner cost."
  },
  {
    question: "How does VAM affect cost calculation?",
    shortAnswer: "VAM produces the lowest initial cost among the three methods, closest to the optimal.",
    explanation: "Effect on cost: 1) Considers opportunity costs, 2) Produces near-optimal solutions, 3) Lowest initial cost, 4) Fewer iterations to reach optimal, 5) Cost is a good estimate of optimal cost, and 6) The same cost formula applies.",
    hint: "VAM = lowest initial cost.",
    level: "intermediate",
    codeExample: "VAM cost is closest to optimal cost."
  },
  {
    question: "What is the impact of changing an allocation on total cost?",
    shortAnswer: "Changing an allocation changes the total cost by the difference in cost between the old and new allocations.",
    explanation: "Impact: 1) Increasing allocation on a route increases cost, 2) Decreasing allocation decreases cost, 3) Shifting allocation changes cost depending on cost difference, 4) The net effect is the sum of all changes, 5) Optimization tries to find cost-reducing changes, and 6) Sensitivity analysis examines these effects.",
    hint: "Cost changes when allocations change.",
    level: "expert",
    codeExample: "ΔZ = Σ (Δxᵢⱼ × cᵢⱼ) for all changed cells."
  },
  {
    question: "How do you use cost calculation for sensitivity analysis?",
    shortAnswer: "Sensitivity analysis examines how changes in costs affect the optimal solution and total cost.",
    explanation: "Sensitivity analysis: 1) Vary unit costs (cᵢⱼ), 2) Observe effect on optimal solution, 3) Observe effect on total cost, 4) Identify critical costs, 5) Determine cost ranges, 6) Understand solution robustness, and 7) Guide decision-making.",
    hint: "What if costs change? How does the solution change?",
    level: "expert",
    codeExample: "If c₁₂ increases by 10%, how does total cost change?"
  },
  {
    question: "What is the role of reduced cost in cost calculation?",
    shortAnswer: "Reduced costs indicate how much total cost would change if a non-basic cell were allocated.",
    explanation: "Reduced costs: 1) Used in optimality checking, 2) Negative reduced cost = improvement possible, 3) Positive reduced cost = no improvement, 4) Calculated using dual variables, 5) Related to cost calculation, and 6) Guide the optimization process.",
    hint: "Reduced costs tell you if improvement is possible.",
    level: "expert",
    codeExample: "Reduced cost = cᵢⱼ - uᵢ - vⱼ."
  },
  {
    question: "How do you calculate cost with degeneracy?",
    shortAnswer: "With degeneracy, add epsilon allocations that have zero cost contribution.",
    explanation: "Degeneracy handling: 1) Epsilon allocations are treated as basic variables, 2) They have effectively zero cost (ε × cᵢⱼ ≈ 0), 3) They don't affect total cost, 4) They maintain the correct number of basic variables, and 5) The cost calculation proceeds normally.",
    hint: "Epsilon has zero cost, so it doesn't change total cost.",
    level: "expert",
    codeExample: "ε × cᵢⱼ ≈ 0, so no cost impact."
  },
  {
    question: "What is the economic interpretation of total cost?",
    shortAnswer: "Total cost represents the total expenditure on transportation for a given shipping plan.",
    explanation: "Economic meaning: 1) Total cost is the sum of all shipping expenses, 2) Includes fuel, labor, and other variable costs, 3) Lower cost means more efficient operations, 4) Cost is a key business metric, 5) Affects profitability, and 6) Guides resource allocation decisions.",
    hint: "Total cost = total money spent on shipping.",
    level: "intermediate",
    codeExample: "Total cost = ₹5,000 = total shipping expenses."
  },
  {
    question: "What are the common arithmetic errors in cost calculation?",
    shortAnswer: "Common errors include addition mistakes, multiplication errors, and missing cells.",
    explanation: "Common errors: 1) Forgetting to include some allocated cells, 2) Multiplying the wrong cost, 3) Addition errors when summing, 4) Including dummy cells incorrectly, 5) Misreading the cost matrix, and 6) Not tracking running totals properly.",
    hint: "Double-check your arithmetic to avoid errors.",
    level: "intermediate",
    codeExample: "Check each multiplication and addition."
  },
  {
    question: "How do you teach cost calculation to beginners?",
    shortAnswer: "Start with simple examples, use the formula, and practice step-by-step.",
    explanation: "Teaching approach: 1) Start with a small transportation table, 2) Show the cost formula, 3) Walk through a complete example step-by-step, 4) Emphasize systematic checking, 5) Practice with different methods, 6) Compare costs across methods, and 7) Build confidence through repetition.",
    hint: "Simple examples → step-by-step → practice.",
    level: "expert",
    codeExample: "Use a 2×2 table for the first example."
  },
  {
    question: "How does cost calculation relate to business decision-making?",
    shortAnswer: "Cost calculation provides essential data for logistics and supply chain decisions.",
    explanation: "Business decisions: 1) Choosing between shipping plans, 2) Evaluating supplier options, 3) Determining pricing strategies, 4) Planning budgets, 5) Investing in logistics, 6) Optimizing supply chains, and 7) Cost-benefit analysis.",
    hint: "Cost drives business decisions.",
    level: "expert",
    codeExample: "Compare cost of different distribution plans."
  }
];

export default questions;