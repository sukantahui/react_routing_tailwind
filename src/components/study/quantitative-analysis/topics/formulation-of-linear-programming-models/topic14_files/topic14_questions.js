// topic14_files/topic14_questions.js

const questions = [
  {
    question: "What is the classic diet problem in LP?",
    shortAnswer: "Minimizing diet cost while meeting minimum nutritional requirements.",
    explanation: "The diet problem is a classic LP application where the goal is to find the cheapest combination of foods that meets all nutritional needs.",
    hint: "Cheapest diet with enough nutrients.",
    level: "basic"
  },
  {
    question: "In the diet example, what are the decision variables?",
    shortAnswer: "x₁ = units of Food A, x₂ = units of Food B.",
    explanation: "These represent the quantities of each food to include in the diet.",
    hint: "Two foods, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the diet example?",
    shortAnswer: "Minimize Z = 20x₁ + 30x₂.",
    explanation: "Food A costs ₹20 per unit, Food B costs ₹30 per unit.",
    hint: "Cost per unit for each food.",
    level: "basic"
  },
  {
    question: "What does the carbohydrates constraint represent?",
    shortAnswer: "2x₁ + 4x₂ ≥ 16, meaning total carbohydrates must be at least 16 units.",
    explanation: "Food A provides 2 units, Food B provides 4 units per unit consumed.",
    hint: "Minimum carbohydrate requirement.",
    level: "basic"
  },
  {
    question: "What does the protein constraint represent?",
    shortAnswer: "3x₁ + 1x₂ ≥ 12, meaning total protein must be at least 12 units.",
    explanation: "Food A provides 3 units, Food B provides 1 unit per unit consumed.",
    hint: "Minimum protein requirement.",
    level: "basic"
  },
  {
    question: "What does the fat constraint represent?",
    shortAnswer: "x₁ + 3x₂ ≥ 10, meaning total fat must be at least 10 units.",
    explanation: "Food A provides 1 unit, Food B provides 3 units per unit consumed.",
    hint: "Minimum fat requirement.",
    level: "basic"
  },
  {
    question: "How many nutrients are considered in the diet example?",
    shortAnswer: "3 nutrients: Carbohydrates, Protein, and Fat.",
    explanation: "Each nutrient has a minimum requirement that must be met.",
    hint: "Count the nutrients.",
    level: "basic"
  },
  {
    question: "What type of constraints are used in the diet problem?",
    shortAnswer: "≥ (greater than or equal to) constraints.",
    explanation: "Because the diet must meet minimum nutritional requirements.",
    hint: "Minimum requirements = ≥.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the diet example?",
    shortAnswer: "x₁ = 3.2, x₂ = 2.4 with cost = ₹136.",
    explanation: "Include 3.2 units of Food A and 2.4 units of Food B.",
    hint: "Minimum cost diet.",
    level: "moderate"
  },
  {
    question: "What is the cost at the optimal solution?",
    shortAnswer: "₹136.",
    explanation: "Z = 20(3.2) + 30(2.4) = 64 + 72 = 136.",
    hint: "Minimum cost value.",
    level: "basic"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Carbohydrates and Protein are binding; Fat has slack.",
    explanation: "At (3.2, 2.4): Carbohydrates = 16, Protein = 12, Fat = 10.4 (slack: 0.4).",
    hint: "Which nutrients are fully used?",
    level: "moderate"
  },
  {
    question: "What is the slack in the fat constraint at the optimum?",
    shortAnswer: "0.4 units (10.4 - 10 = 0.4).",
    explanation: "Fat provided = 3.2 + 3(2.4) = 3.2 + 7.2 = 10.4, exceeding the requirement by 0.4.",
    hint: "Excess fat in the diet.",
    level: "moderate"
  },
  {
    question: "Why are diet problems important in LP?",
    shortAnswer: "They help find the cheapest way to meet nutritional needs.",
    explanation: "Diet problems have practical applications in meal planning, hospital diets, and nutritional research.",
    hint: "Cheapest healthy diet.",
    level: "moderate"
  },
  {
    question: "What is the feasible region in the diet problem?",
    shortAnswer: "The region above all three nutrient constraints.",
    explanation: "With ≥ constraints, the feasible region extends upward from the constraint lines.",
    hint: "Above the lines.",
    level: "moderate"
  },
  {
    question: "What are the corner points of the feasible region?",
    shortAnswer: "(3.2, 2.4), (4, 2), (0, 12).",
    explanation: "These are the vertices where the optimal solution lies.",
    hint: "Intersection points.",
    level: "moderate"
  },
  {
    question: "If Food A becomes cheaper (₹15), what happens to the optimal solution?",
    shortAnswer: "The optimal solution changes, likely using more Food A.",
    explanation: "Cheaper Food A makes it more attractive, shifting the diet toward more A.",
    hint: "Cost change affects the diet.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in the diet problem?",
    shortAnswer: "To ensure food quantities are non-negative.",
    explanation: "You cannot consume negative amounts of food.",
    hint: "No negative food.",
    level: "basic"
  },
  {
    question: "How would you handle more than 2 foods in a diet problem?",
    shortAnswer: "Add more decision variables and use computational methods.",
    explanation: "With more foods, the problem becomes larger but the formulation structure remains the same.",
    hint: "More foods = more variables.",
    level: "moderate"
  },
  {
    question: "What is a common mistake in formulating diet problems?",
    shortAnswer: "Using ≤ instead of ≥ for nutritional requirements.",
    explanation: "Nutritional requirements are minimums, so they need ≥ constraints.",
    hint: "Minimums need ≥.",
    level: "moderate"
  },
  {
    question: "What does it mean if a nutrient has slack at the optimum?",
    shortAnswer: "The diet exceeds the minimum requirement for that nutrient.",
    explanation: "Slack nutrients are not constraining the solution—they are in excess.",
    hint: "More than enough.",
    level: "moderate"
  },
  {
    question: "What is the cost if only Food A is used?",
    shortAnswer: "₹240.",
    explanation: "With only Food A, need max(16/2, 12/3, 10/1) = max(8, 4, 10) = 10 units. Cost = 20(10) = ₹240.",
    hint: "Only Food A.",
    level: "moderate"
  },
  {
    question: "What is the cost if only Food B is used?",
    shortAnswer: "₹360.",
    explanation: "With only Food B, need max(16/4, 12/1, 10/3) = max(4, 12, 3.33) = 12 units. Cost = 30(12) = ₹360.",
    hint: "Only Food B.",
    level: "moderate"
  },
  {
    question: "Why is the optimal diet better than using only one food?",
    shortAnswer: "It balances nutrient requirements and minimizes cost.",
    explanation: "Using only one food may provide excessive nutrients and increase cost.",
    hint: "Balance minimizes cost.",
    level: "moderate"
  },
  {
    question: "What is the protein content of the optimal diet?",
    shortAnswer: "12 units (exactly meeting the requirement).",
    explanation: "Protein is a binding constraint at the optimum.",
    hint: "Fully used nutrient.",
    level: "basic"
  },
  {
    question: "What is the fat content of the optimal diet?",
    shortAnswer: "10.4 units (exceeding the 10-unit requirement).",
    explanation: "Fat has slack of 0.4 units.",
    hint: "Slight excess.",
    level: "basic"
  },
  {
    question: "How does the diet problem relate to real-world nutrition?",
    shortAnswer: "It helps plan cost-effective diets that meet nutritional guidelines.",
    explanation: "LP is used in institutional meal planning and nutritional counseling.",
    hint: "Practical nutrition planning.",
    level: "moderate"
  },
  {
    question: "What is the dual of the diet problem?",
    shortAnswer: "A maximization problem where nutrients are valued.",
    explanation: "The dual of a cost minimization diet problem is a nutrient value maximization problem.",
    hint: "Maximization of nutrient value.",
    level: "expert"
  },
  {
    question: "If the fat requirement increases to 12, what happens?",
    shortAnswer: "The optimal solution changes and cost increases.",
    explanation: "More fat is required, so the diet must change to include more fat-rich foods.",
    hint: "Higher requirement = higher cost.",
    level: "expert"
  },
  {
    question: "What is the interpretation of shadow prices in diet problems?",
    shortAnswer: "The cost savings from reducing nutrient requirements.",
    explanation: "Shadow prices show the cost reduction if a nutrient requirement is lowered.",
    hint: "Value of relaxing requirements.",
    level: "expert"
  },
  {
    question: "How do you validate a diet problem solution?",
    shortAnswer: "Check all nutrient constraints and non-negativity.",
    explanation: "Verify that the diet meets all requirements at minimum cost.",
    hint: "Check all constraints.",
    level: "moderate"
  },
  {
    question: "What is the total cost if the diet is doubled?",
    shortAnswer: "₹272 (2 × ₹136).",
    explanation: "Doubling the diet doubles both food quantities and total cost.",
    hint: "Double the diet, double the cost.",
    level: "basic"
  }
];

export default questions;