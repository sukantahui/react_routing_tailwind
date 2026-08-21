const questions = [
  {
    question: "What is a transportation table?",
    shortAnswer: "A transportation table is a matrix format that organizes all data for a transportation problem, with sources as rows and destinations as columns.",
    explanation: "The transportation table is the primary tool for solving transportation problems. It contains: 1) Sources as rows, 2) Destinations as columns, 3) Costs in each cell, 4) Supply values on the right, and 5) Demand values at the bottom. It provides a complete picture of the problem.",
    hint: "Think of it as a spreadsheet for transportation problems.",
    level: "basic",
    codeExample: "Rows = Sources, Columns = Destinations, Cells = Costs."
  },
  {
    question: "What are the components of a transportation table?",
    shortAnswer: "The components are rows (sources), columns (destinations), cost cells, supply margins, and demand margins.",
    explanation: "Components include: 1) Row headers (sources S₁, S₂, ..., Sₘ), 2) Column headers (destinations D₁, D₂, ..., Dₙ), 3) Cost cells (cᵢⱼ), 4) Supply values on the right margin, 5) Demand values at the bottom margin, and 6) Totals for verification.",
    hint: "Rows, columns, costs, supplies, demands.",
    level: "basic",
    codeExample: "S₁ row, D₁ column, c₁₁ cell, S₁ supply, D₁ demand."
  },
  {
    question: "How do you create a transportation table from a problem statement?",
    shortAnswer: "Identify sources and destinations, create the table structure, populate costs, and add supply and demand values.",
    explanation: "Steps to create: 1) Identify all sources and destinations, 2) Draw a table with m rows and n columns, 3) Enter costs in each cell, 4) Add supply values on the right, 5) Add demand values at the bottom, 6) Check balance condition, and 7) Add dummies if needed.",
    hint: "Follow a systematic process to create the table.",
    level: "intermediate",
    codeExample: "Step 1: Identify, Step 2: Create, Step 3: Populate, Step 4: Verify."
  },
  {
    question: "What is the standard format for a transportation table?",
    shortAnswer: "Sources as rows, destinations as columns, costs in cells, supplies on the right, demands at the bottom.",
    explanation: "Standard format: 1) Rows: S₁, S₂, ..., Sₘ (sources), 2) Columns: D₁, D₂, ..., Dₙ (destinations), 3) Cells contain costs cᵢⱼ, 4) Right margin shows supply values, 5) Bottom margin shows demand values, 6) Bottom-right cell shows totals.",
    hint: "Rows = sources, Columns = destinations.",
    level: "basic",
    codeExample: "Standard format: Sources as rows, destinations as columns."
  },
  {
    question: "How do you check the balance condition using the transportation table?",
    shortAnswer: "Compare the sum of supply values (right margin) with the sum of demand values (bottom margin).",
    explanation: "To check balance: 1) Sum all supply values in the right margin, 2) Sum all demand values in the bottom margin, 3) Compare the two sums, 4) If equal, the problem is balanced, 5) If not equal, add dummies to balance.",
    hint: "Check if ΣSᵢ = ΣDⱼ using the margins.",
    level: "intermediate",
    codeExample: "Supply sum = 500, Demand sum = 500 → Balanced."
  },
  {
    question: "What happens when you add a dummy to a transportation table?",
    shortAnswer: "A dummy adds either a new row (dummy source) or a new column (dummy destination) with zero costs.",
    explanation: "Adding a dummy: 1) If supply > demand, add a dummy destination column, 2) If demand > supply, add a dummy source row, 3) Set all costs in the dummy row/column to zero, 4) The table expands by one row or column, 5) The problem becomes balanced.",
    hint: "Dummies add rows or columns with zero costs.",
    level: "intermediate",
    codeExample: "Add dummy column with demand = surplus and zero costs."
  },
  {
    question: "How do you read costs from a transportation table?",
    shortAnswer: "Cost is read from row i (source) to column j (destination) as cᵢⱼ.",
    explanation: "To read costs: 1) Identify the source row (i), 2) Identify the destination column (j), 3) The intersection cell contains cᵢⱼ, 4) This is the cost per unit from source i to destination j, 5) Costs are used in the objective function.",
    hint: "Read as cost from row source to column destination.",
    level: "basic",
    codeExample: "c₂₃ = cost from Source 2 to Destination 3."
  },
  {
    question: "Why is the transportation table important for solving problems?",
    shortAnswer: "The table organizes all data in a clear format that enables systematic solution using transportation algorithms.",
    explanation: "Importance: 1) Organizes all problem data, 2) Enables visual understanding, 3) Facilitates algorithm application, 4) Makes balance checking easy, 5) Helps identify patterns, 6) Supports documentation, and 7) Enables sensitivity analysis.",
    hint: "A good table makes solving easier.",
    level: "intermediate",
    codeExample: "Clear organization enables efficient solution."
  },
  {
    question: "How do you handle unbalanced problems in the transportation table?",
    shortAnswer: "Add dummy rows or columns with zero costs to balance the table before solving.",
    explanation: "Handling imbalance: 1) Calculate surplus or deficit, 2) If supply > demand, add dummy destination column, 3) If demand > supply, add dummy source row, 4) Set dummy costs to zero, 5) The table is now balanced, 6) Proceed with solution algorithms.",
    hint: "Add dummies to balance the table.",
    level: "intermediate",
    codeExample: "Supply 600, Demand 400 → Add dummy destination column with demand 200."
  },
  {
    question: "What is the role of the bottom-right cell in a transportation table?",
    shortAnswer: "The bottom-right cell shows the total supply and total demand if the problem is balanced.",
    explanation: "The bottom-right cell: 1) Contains the sum of all supplies, 2) Contains the sum of all demands, 3) If balanced, both sums are equal, 4) If unbalanced, shows different values, 5) Helps verify balance condition, and 6) Acts as a consistency check.",
    hint: "The bottom-right cell is the balance check point.",
    level: "intermediate",
    codeExample: "Bottom-right: 500 = 500 (balanced)."
  },
  {
    question: "How do you label sources and destinations in the table?",
    shortAnswer: "Sources are labeled as S₁, S₂, ... and destinations as D₁, D₂, ... in a logical order.",
    explanation: "Labeling: 1) Use S₁, S₂, ..., Sₘ for sources, 2) Use D₁, D₂, ..., Dₙ for destinations, 3) Order can be alphabetical, geographical, or logical, 4) Keep consistent order, 5) Use clear names in parentheses if needed.",
    hint: "Use consistent, clear labels.",
    level: "basic",
    codeExample: "S₁ (Factory A), S₂ (Factory B), D₁ (Store 1), etc."
  },
  {
    question: "What is the impact of row/column order on the solution?",
    shortAnswer: "Row/column order doesn't affect the optimal solution or total cost, only the appearance of the table.",
    explanation: "Order impact: 1) Optimal solution is independent of order, 2) Total cost remains the same, 3) Only the arrangement changes, 4) Some orders may make the solution easier to interpret, 5) Choose a logical order for clarity.",
    hint: "Order doesn't change the optimal solution.",
    level: "intermediate",
    codeExample: "Swapping rows gives same optimal solution."
  },
  {
    question: "How do you verify the accuracy of a transportation table?",
    shortAnswer: "Cross-check all costs, verify supplies and demands, and confirm balance condition.",
    explanation: "Verification steps: 1) Check all costs against source documents, 2) Verify all supply values, 3) Verify all demand values, 4) Confirm balance condition, 5) Check for missing data, 6) Validate with stakeholders, and 7) Review for consistency.",
    hint: "Double-check all data in the table.",
    level: "expert",
    codeExample: "Verify each cost, supply, and demand value."
  },
  {
    question: "What is the relationship between the transportation table and the cost matrix?",
    shortAnswer: "The transportation table is the complete representation including the cost matrix, supplies, and demands.",
    explanation: "Relationship: 1) The cost matrix is part of the transportation table, 2) It includes only the costs (cᵢⱼ), 3) The table adds supply and demand information, 4) The table is a complete problem representation, 5) The matrix is a component of the table.",
    hint: "The cost matrix is inside the transportation table.",
    level: "intermediate",
    codeExample: "Cost matrix + supplies + demands = Transportation table."
  },
  {
    question: "How do you represent decision variables in the transportation table?",
    shortAnswer: "Decision variables (xᵢⱼ) are placed in the cells along with the costs, representing shipments.",
    explanation: "Decision variables: 1) Each cell contains a decision variable xᵢⱼ, 2) xᵢⱼ = amount shipped from source i to destination j, 3) Variables are determined by solving the problem, 4) They are placed in the same cells as costs, 5) They form the shipping plan.",
    hint: "xᵢⱼ in each cell = amount shipped.",
    level: "intermediate",
    codeExample: "x₁₂ = 50 units shipped from S₁ to D₂."
  },
  {
    question: "What are the common mistakes when creating a transportation table?",
    shortAnswer: "Common mistakes include wrong orientation, incorrect costs, missing values, and unbalanced problems.",
    explanation: "Common mistakes: 1) Putting sources as columns instead of rows, 2) Entering wrong costs, 3) Forgetting supply or demand values, 4) Not checking balance, 5) Incorrect dummy addition, 6) Wrong cost orientation, and 7) Missing data.",
    hint: "Watch for orientation and data errors.",
    level: "expert",
    codeExample: "Avoid: Wrong orientation, missing data, incorrect costs."
  },
  {
    question: "How does the transportation table support sensitivity analysis?",
    shortAnswer: "The table makes it easy to see how changes in costs, supplies, or demands affect the solution.",
    explanation: "Sensitivity analysis: 1) Change costs in the table, 2) Observe effect on optimal solution, 3) Change supply or demand values, 4) See how the solution adapts, 5) Identify critical parameters, 6) Test different scenarios.",
    hint: "The table makes sensitivity analysis visual.",
    level: "expert",
    codeExample: "Change c₁₂ and observe shipping plan changes."
  },
  {
    question: "What is the role of the transportation table in algorithm implementation?",
    shortAnswer: "The table provides the input data structure for transportation algorithms like the simplex method.",
    explanation: "Algorithm role: 1) Provides organized input data, 2) Supports step-by-step algorithm execution, 3) Shows intermediate solutions, 4) Displays final allocation, 5) Facilitates algorithm debugging, and 6) Enables visual tracking of progress.",
    hint: "The table is the input and output for algorithms.",
    level: "expert",
    codeExample: "Table data used by transportation simplex method."
  },
  {
    question: "How do you document assumptions in the transportation table?",
    shortAnswer: "Document assumptions separately or as notes attached to the table.",
    explanation: "Documentation: 1) Note any assumptions about costs, 2) Document data sources, 3) Explain any modifications, 4) Note seasonal factors, 5) Record capacity assumptions, 6) Document handling of imbalances, and 7) Keep assumptions with the table.",
    hint: "Document assumptions clearly with the table.",
    level: "expert",
    codeExample: "Assumption: Costs based on current fuel prices."
  },
  {
    question: "How does the transportation table help in communication with stakeholders?",
    shortAnswer: "The table provides a clear, visual representation that non-technical stakeholders can understand.",
    explanation: "Communication: 1) Visual format is easy to understand, 2) Shows the entire problem clearly, 3) Helps explain constraints, 4) Supports decision-making discussions, 5) Provides evidence for recommendations, 6) Makes complex problems accessible.",
    hint: "The table is a communication tool.",
    level: "expert",
    codeExample: "Use the table to explain logistics problems to management."
  },
  {
    question: "What is the future of transportation table formulation?",
    shortAnswer: "Future trends include automated table generation, real-time updates, and AI-assisted formulation.",
    explanation: "Future trends: 1) Automated generation from ERP systems, 2) Real-time data updates, 3) AI-assisted table creation, 4) Integration with IoT data, 5) Predictive table generation, 6) Dynamic optimization, and 7) Cloud-based collaboration tools.",
    hint: "Technology is automating table formulation.",
    level: "expert",
    codeExample: "AI systems that generate transportation tables automatically."
  }
];

export default questions;