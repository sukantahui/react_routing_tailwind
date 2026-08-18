// topic17_files/topic17_questions.js

const questions = [
  {
    question: "What is the goal of a transportation-related production problem?",
    shortAnswer: "To minimize total cost (production + shipping) while meeting demand.",
    explanation: "These problems involve deciding how much to produce at each plant and how much to ship to each warehouse to minimize total cost.",
    hint: "Minimize production and shipping costs.",
    level: "basic"
  },
  {
    question: "In the transportation-production example, what are the decision variables?",
    shortAnswer: "xᵢⱼ = units produced at Plant i and shipped to Warehouse j.",
    explanation: "There are 6 variables: x₁₁, x₁₂, x₁₃, x₂₁, x₂₂, x₂₃.",
    hint: "Two plants × three warehouses = 6 variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the transportation-production example?",
    shortAnswer: "Minimize Z = 58x₁₁ + 60x₁₂ + 62x₁₃ + 72x₂₁ + 69x₂₂ + 67x₂₃.",
    explanation: "Costs include production cost at each plant plus shipping cost to each warehouse.",
    hint: "Production + shipping costs.",
    level: "moderate"
  },
  {
    question: "What does Plant A capacity constraint represent?",
    shortAnswer: "x₁₁ + x₁₂ + x₁₃ ≤ 150.",
    explanation: "Plant A can produce at most 150 units total across all warehouses.",
    hint: "Plant A capacity limit.",
    level: "basic"
  },
  {
    question: "What does Plant B capacity constraint represent?",
    shortAnswer: "x₂₁ + x₂₂ + x₂₃ ≤ 200.",
    explanation: "Plant B can produce at most 200 units total across all warehouses.",
    hint: "Plant B capacity limit.",
    level: "basic"
  },
  {
    question: "What does W1 demand constraint represent?",
    shortAnswer: "x₁₁ + x₂₁ ≥ 100.",
    explanation: "Warehouse 1 must receive at least 100 units from both plants combined.",
    hint: "W1 demand.",
    level: "basic"
  },
  {
    question: "What does W2 demand constraint represent?",
    shortAnswer: "x₁₂ + x₂₂ ≥ 120.",
    explanation: "Warehouse 2 must receive at least 120 units from both plants combined.",
    hint: "W2 demand.",
    level: "basic"
  },
  {
    question: "What does W3 demand constraint represent?",
    shortAnswer: "x₁₃ + x₂₃ ≥ 130.",
    explanation: "Warehouse 3 must receive at least 130 units from both plants combined.",
    hint: "W3 demand.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the transportation-production example?",
    shortAnswer: "x₁₁=100, x₁₂=50, x₁₃=0, x₂₁=0, x₂₂=70, x₂₃=130.",
    explanation: "Plant A ships 100 to W1, 50 to W2, 0 to W3. Plant B ships 0 to W1, 70 to W2, 130 to W3.",
    hint: "Optimal shipping plan.",
    level: "moderate"
  },
  {
    question: "What is the total production cost at the optimal solution?",
    shortAnswer: "₹19,500.",
    explanation: "Production cost = 150×50 + 200×60 = 7,500 + 12,000 = 19,500.",
    hint: "Production cost = capacity × cost per unit.",
    level: "moderate"
  },
  {
    question: "What is the total shipping cost at the optimal solution?",
    shortAnswer: "₹2,840.",
    explanation: "Shipping cost = 100×8 + 50×10 + 0×12 + 0×12 + 70×9 + 130×7 = 800 + 500 + 0 + 0 + 630 + 910 = 2,840.",
    hint: "Sum of shipping costs.",
    level: "moderate"
  },
  {
    question: "What is the total cost at the optimal solution?",
    shortAnswer: "₹22,340.",
    explanation: "Total cost = Production cost + Shipping cost = 19,500 + 2,840 = 22,340.",
    hint: "Total cost.",
    level: "moderate"
  },
  {
    question: "Which routes are used in the optimal solution?",
    shortAnswer: "A→W1, A→W2, B→W2, B→W3.",
    explanation: "Routes: Plant A to W1 (100), A to W2 (50), B to W2 (70), B to W3 (130).",
    hint: "Used routes.",
    level: "moderate"
  },
  {
    question: "Which routes are NOT used in the optimal solution?",
    shortAnswer: "A→W3 and B→W1 are not used.",
    explanation: "Plant A does not ship to W3; Plant B does not ship to W1.",
    hint: "Unused routes.",
    level: "moderate"
  },
  {
    question: "What is the production cost per unit at Plant A?",
    shortAnswer: "₹50.",
    explanation: "Production at Plant A costs ₹50 per unit.",
    hint: "Plant A production cost.",
    level: "basic"
  },
  {
    question: "What is the production cost per unit at Plant B?",
    shortAnswer: "₹60.",
    explanation: "Production at Plant B costs ₹60 per unit.",
    hint: "Plant B production cost.",
    level: "basic"
  },
  {
    question: "What is the shipping cost from Plant A to W1?",
    shortAnswer: "₹8 per unit.",
    explanation: "Shipping from Plant A to W1 costs ₹8 per unit.",
    hint: "A→W1 shipping cost.",
    level: "basic"
  },
  {
    question: "What is the shipping cost from Plant B to W3?",
    shortAnswer: "₹7 per unit.",
    explanation: "Shipping from Plant B to W3 costs ₹7 per unit.",
    hint: "B→W3 shipping cost.",
    level: "basic"
  },
  {
    question: "What is the cost coefficient for x₁₁?",
    shortAnswer: "₹58 (Production ₹50 + Shipping ₹8).",
    explanation: "Total cost per unit from Plant A to W1 = 50 + 8 = 58.",
    hint: "Production + shipping.",
    level: "moderate"
  },
  {
    question: "What is the cost coefficient for x₂₃?",
    shortAnswer: "₹67 (Production ₹60 + Shipping ₹7).",
    explanation: "Total cost per unit from Plant B to W3 = 60 + 7 = 67.",
    hint: "Production + shipping.",
    level: "moderate"
  },
  {
    question: "What type of problem is this?",
    shortAnswer: "A transportation problem with production costs.",
    explanation: "It's a transportation problem with additional production cost component.",
    hint: "Transportation with production.",
    level: "basic"
  },
  {
    question: "What is a common mistake in transportation-production problems?",
    shortAnswer: "Forgetting to include production costs in the objective.",
    explanation: "Production costs must be added to shipping costs to get the total cost per unit.",
    hint: "Don't forget production costs.",
    level: "moderate"
  },
  {
    question: "What is the total demand across all warehouses?",
    shortAnswer: "350 units (100 + 120 + 130).",
    explanation: "Total demand = W1 + W2 + W3 = 100 + 120 + 130 = 350.",
    hint: "Sum of demands.",
    level: "basic"
  },
  {
    question: "What is the total capacity across all plants?",
    shortAnswer: "350 units (150 + 200).",
    explanation: "Total capacity = Plant A + Plant B = 150 + 200 = 350.",
    hint: "Sum of capacities.",
    level: "basic"
  },
  {
    question: "Why does total capacity equal total demand?",
    shortAnswer: "The problem is balanced, so all production is used to meet demand.",
    explanation: "Total capacity = 350, total demand = 350, so the problem is balanced.",
    hint: "Balanced transportation problem.",
    level: "moderate"
  },
  {
    question: "What would happen if Plant A had to produce at least 120 units?",
    shortAnswer: "Add constraint x₁₁ + x₁₂ + x₁₃ ≥ 120.",
    explanation: "This would force Plant A to produce at least 120 units, potentially changing the optimal solution.",
    hint: "Minimum production requirement.",
    level: "expert"
  },
  {
    question: "If shipping cost from A to W1 increases to ₹15, what happens?",
    shortAnswer: "The optimal solution changes, possibly shifting shipments to other routes.",
    explanation: "Higher shipping cost makes A→W1 less attractive, so more might be shipped via other routes.",
    hint: "Cost change affects allocation.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in transportation problems?",
    shortAnswer: "To ensure shipment quantities are non-negative.",
    explanation: "You cannot ship negative quantities.",
    hint: "No negative shipments.",
    level: "basic"
  },
  {
    question: "How many decision variables are in this problem?",
    shortAnswer: "6 variables (2 plants × 3 warehouses).",
    explanation: "Each plant-warehouse combination is a decision variable.",
    hint: "Count routes.",
    level: "basic"
  },
  {
    question: "How many constraints are in this problem (excluding non-negativity)?",
    shortAnswer: "5 constraints (2 capacity + 3 demand).",
    explanation: "Two plant capacity constraints and three warehouse demand constraints.",
    hint: "Count constraints.",
    level: "basic"
  },
  {
    question: "What is the significance of both plants operating at full capacity?",
    shortAnswer: "All production capacity is used to meet demand.",
    explanation: "Both plants produce at their maximum capacity, indicating efficient resource utilization.",
    hint: "Full capacity usage.",
    level: "moderate"
  }
];

export default questions;