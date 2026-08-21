// topic19_files/topic19_questions.js

const questions = [
  {
    question: "What is the goal of a land and crop allocation problem?",
    shortAnswer: "To allocate land among different crops to maximize profit or minimize cost.",
    explanation: "Land allocation problems aim to choose the optimal crop mix considering land availability, resource constraints, and profitability.",
    hint: "Maximize profit from limited land.",
    level: "basic"
  },
  {
    question: "In the land allocation example, what are the decision variables?",
    shortAnswer: "x₁ = hectares of Wheat, x₂ = hectares of Rice, x₃ = hectares of Sugarcane.",
    explanation: "These represent the land area allocated to each crop.",
    hint: "Three crops, three variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the land allocation example?",
    shortAnswer: "Maximize Z = 30,000x₁ + 40,000x₂ + 50,000x₃.",
    explanation: "Wheat gives ₹30,000 profit per hectare, Rice ₹40,000, Sugarcane ₹50,000.",
    hint: "Profit per hectare for each crop.",
    level: "basic"
  },
  {
    question: "What does the Land constraint represent?",
    shortAnswer: "x₁ + x₂ + x₃ ≤ 100, total land cannot exceed 100 hectares.",
    explanation: "The farmer has exactly 100 hectares of land available.",
    hint: "Total land limit.",
    level: "basic"
  },
  {
    question: "What does the Water constraint represent?",
    shortAnswer: "1000x₁ + 1500x₂ + 2000x₃ ≤ 180,000 liters.",
    explanation: "Total water usage cannot exceed 180,000 liters.",
    hint: "Water availability limit.",
    level: "basic"
  },
  {
    question: "What does the Labor constraint represent?",
    shortAnswer: "50x₁ + 70x₂ + 80x₃ ≤ 7,000 hours.",
    explanation: "Total labor hours cannot exceed 7,000.",
    hint: "Labor availability limit.",
    level: "basic"
  },
  {
    question: "What does the Fertilizer constraint represent?",
    shortAnswer: "40x₁ + 60x₂ + 70x₃ ≤ 5,800 kg.",
    explanation: "Total fertilizer usage cannot exceed 5,800 kg.",
    hint: "Fertilizer availability limit.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the land allocation example?",
    shortAnswer: "x₁ = 40 (Wheat), x₂ = 30 (Rice), x₃ = 30 (Sugarcane).",
    explanation: "Allocate 40 hectares to Wheat, 30 to Rice, 30 to Sugarcane.",
    hint: "Optimal crop allocation.",
    level: "moderate"
  },
  {
    question: "What is the total profit at the optimal solution?",
    shortAnswer: "₹3,900,000.",
    explanation: "Profit = 30,000(40) + 40,000(30) + 50,000(30) = 1,200,000 + 1,200,000 + 1,500,000 = 3,900,000.",
    hint: "Maximum profit value.",
    level: "moderate"
  },
  {
    question: "Which constraint is binding at the optimal solution?",
    shortAnswer: "Land is the only binding constraint; Water, Labor, and Fertilizer have slack.",
    explanation: "Land: 40+30+30=100 (fully used). Water: 145,000 (slack 35,000). Labor: 6,500 (slack 500). Fertilizer: 5,500 (slack 300).",
    hint: "Only Land is fully used.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Water constraint at the optimum?",
    shortAnswer: "35,000 liters (180,000 - 145,000 = 35,000).",
    explanation: "Water used = 1000(40)+1500(30)+2000(30) = 145,000 liters.",
    hint: "Unused water capacity.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Labor constraint at the optimum?",
    shortAnswer: "500 hours (7,000 - 6,500 = 500).",
    explanation: "Labor used = 50(40)+70(30)+80(30) = 6,500 hours.",
    hint: "Unused labor capacity.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Fertilizer constraint at the optimum?",
    shortAnswer: "300 kg (5,800 - 5,500 = 300).",
    explanation: "Fertilizer used = 40(40)+60(30)+70(30) = 5,500 kg.",
    hint: "Unused fertilizer capacity.",
    level: "moderate"
  },
  {
    question: "What is the profit per hectare of Wheat?",
    shortAnswer: "₹30,000.",
    explanation: "Wheat gives ₹30,000 profit per hectare.",
    hint: "Wheat profit.",
    level: "basic"
  },
  {
    question: "What is the profit per hectare of Rice?",
    shortAnswer: "₹40,000.",
    explanation: "Rice gives ₹40,000 profit per hectare.",
    hint: "Rice profit.",
    level: "basic"
  },
  {
    question: "What is the profit per hectare of Sugarcane?",
    shortAnswer: "₹50,000.",
    explanation: "Sugarcane gives ₹50,000 profit per hectare.",
    hint: "Sugarcane profit.",
    level: "basic"
  },
  {
    question: "What is the water usage per hectare of Sugarcane?",
    shortAnswer: "2,000 liters.",
    explanation: "Sugarcane requires 2,000 liters of water per hectare.",
    hint: "Sugarcane water requirement.",
    level: "basic"
  },
  {
    question: "What is the labor usage per hectare of Rice?",
    shortAnswer: "70 hours.",
    explanation: "Rice requires 70 hours of labor per hectare.",
    hint: "Rice labor requirement.",
    level: "basic"
  },
  {
    question: "What is a common mistake in land allocation problems?",
    shortAnswer: "Assuming the crop with highest profit should get all the land.",
    explanation: "The highest profit crop may use too many resources, so a mix is often optimal.",
    hint: "Don't just pick the highest profit crop.",
    level: "moderate"
  },
  {
    question: "What is the water efficiency of Wheat (profit per liter)?",
    shortAnswer: "₹30 per liter (30,000 ÷ 1,000).",
    explanation: "Wheat gives ₹30 per liter of water used.",
    hint: "Profit divided by water usage.",
    level: "moderate"
  },
  {
    question: "What is the water efficiency of Rice (profit per liter)?",
    shortAnswer: "₹26.67 per liter (40,000 ÷ 1,500).",
    explanation: "Rice gives ₹26.67 per liter of water used.",
    hint: "Profit divided by water usage.",
    level: "moderate"
  },
  {
    question: "What is the water efficiency of Sugarcane (profit per liter)?",
    shortAnswer: "₹25 per liter (50,000 ÷ 2,000).",
    explanation: "Sugarcane gives ₹25 per liter of water used.",
    hint: "Profit divided by water usage.",
    level: "moderate"
  },
  {
    question: "Which crop is most water-efficient?",
    shortAnswer: "Wheat (₹30 per liter).",
    explanation: "Wheat gives the highest profit per liter of water.",
    hint: "Highest profit per water unit.",
    level: "moderate"
  },
  {
    question: "If the farmer had only water constraint (no land limit), which crop would be best?",
    shortAnswer: "Wheat, because it has the highest profit per liter of water.",
    explanation: "With only water constraint, the farmer would allocate water to the most efficient crop.",
    hint: "Water efficiency determines.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in land allocation?",
    shortAnswer: "To ensure land allocation is non-negative.",
    explanation: "You cannot allocate negative land to any crop.",
    hint: "No negative allocation.",
    level: "basic"
  },
  {
    question: "If land increased to 120 hectares, what would happen?",
    shortAnswer: "The optimal solution changes, potentially increasing profit.",
    explanation: "More land allows more production and higher profit, but other resources may become binding.",
    hint: "More land = more potential profit.",
    level: "expert"
  },
  {
    question: "What is the total land allocated at the optimal solution?",
    shortAnswer: "100 hectares (fully used).",
    explanation: "All 100 hectares are allocated to crops.",
    hint: "Full land usage.",
    level: "basic"
  },
  {
    question: "What is the total water used at the optimal solution?",
    shortAnswer: "145,000 liters.",
    explanation: "Water used = 1000(40)+1500(30)+2000(30) = 145,000 liters.",
    hint: "Total water usage.",
    level: "moderate"
  },
  {
    question: "What is the total labor used at the optimal solution?",
    shortAnswer: "6,500 hours.",
    explanation: "Labor used = 50(40)+70(30)+80(30) = 6,500 hours.",
    hint: "Total labor usage.",
    level: "moderate"
  },
  {
    question: "What is the total fertilizer used at the optimal solution?",
    shortAnswer: "5,500 kg.",
    explanation: "Fertilizer used = 40(40)+60(30)+70(30) = 5,500 kg.",
    hint: "Total fertilizer usage.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of a binding constraint in agriculture?",
    shortAnswer: "The resource (land) is scarce and limits production.",
    explanation: "Binding constraints indicate resources that are fully utilized and valuable.",
    hint: "Scarce resource.",
    level: "moderate"
  }
];

export default questions;