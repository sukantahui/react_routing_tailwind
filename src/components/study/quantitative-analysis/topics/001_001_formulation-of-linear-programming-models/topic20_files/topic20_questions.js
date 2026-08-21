// topic20_files/topic20_questions.js

const questions = [
  {
    question: "What is the goal of an agricultural production problem?",
    shortAnswer: "To maximize profit from crop production subject to resource constraints.",
    explanation: "Agricultural production problems involve allocating limited resources like land, labor, and inputs across crops to maximize profit.",
    hint: "Maximize profit from farming.",
    level: "basic"
  },
  {
    question: "In the agricultural production example, what are the decision variables?",
    shortAnswer: "x₁ = hectares of Crop A, x₂ = hectares of Crop B.",
    explanation: "These represent the land area allocated to each crop.",
    hint: "Two crops, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the agricultural production example?",
    shortAnswer: "Maximize Z = 45,000x₁ + 55,000x₂.",
    explanation: "Crop A gives ₹45,000 profit per hectare, Crop B gives ₹55,000 profit per hectare.",
    hint: "Profit per hectare for each crop.",
    level: "basic"
  },
  {
    question: "What does the Land constraint represent?",
    shortAnswer: "x₁ + x₂ ≤ 80, total land cannot exceed 80 hectares.",
    explanation: "The farmer has 80 hectares of land available.",
    hint: "Total land limit.",
    level: "basic"
  },
  {
    question: "What does the Labor constraint represent?",
    shortAnswer: "2x₁ + 4x₂ ≤ 240 labor-days.",
    explanation: "Crop A uses 2 labor-days per hectare, Crop B uses 4 labor-days per hectare.",
    hint: "Labor availability limit.",
    level: "basic"
  },
  {
    question: "What does the Fertilizer constraint represent?",
    shortAnswer: "3x₁ + 2x₂ ≤ 200 units.",
    explanation: "Crop A uses 3 units of fertilizer per hectare, Crop B uses 2 units per hectare.",
    hint: "Fertilizer availability limit.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≥ 10 represent?",
    shortAnswer: "Minimum planting requirement for Crop A.",
    explanation: "The farmer has a contract requiring at least 10 hectares of Crop A.",
    hint: "Minimum Crop A requirement.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the agricultural production example?",
    shortAnswer: "x₁ = 40, x₂ = 40 with profit = ₹4,000,000.",
    explanation: "Plant 40 hectares of Crop A and 40 hectares of Crop B.",
    hint: "Optimal crop allocation.",
    level: "moderate"
  },
  {
    question: "What is the total profit at the optimal solution?",
    shortAnswer: "₹4,000,000.",
    explanation: "Profit = 45,000(40) + 55,000(40) = 1,800,000 + 2,200,000 = 4,000,000.",
    hint: "Maximum profit value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Land, Labor, and Fertilizer are all binding.",
    explanation: "Land: 40+40=80 ✓, Labor: 2(40)+4(40)=240 ✓, Fertilizer: 3(40)+2(40)=200 ✓.",
    hint: "All three resources are fully used.",
    level: "moderate"
  },
  {
    question: "Is the minimum Crop A constraint binding?",
    shortAnswer: "No, x₁ = 40 > 10, so the constraint is not binding.",
    explanation: "The farmer plants much more than the minimum required.",
    hint: "Minimum requirement is exceeded.",
    level: "moderate"
  },
  {
    question: "What is the land usage at the optimal solution?",
    shortAnswer: "80 hectares (fully used).",
    explanation: "40 + 40 = 80 hectares.",
    hint: "Full land usage.",
    level: "basic"
  },
  {
    question: "What is the labor usage at the optimal solution?",
    shortAnswer: "240 labor-days (fully used).",
    explanation: "2(40) + 4(40) = 80 + 160 = 240 labor-days.",
    hint: "Full labor usage.",
    level: "basic"
  },
  {
    question: "What is the fertilizer usage at the optimal solution?",
    shortAnswer: "200 units (fully used).",
    explanation: "3(40) + 2(40) = 120 + 80 = 200 units.",
    hint: "Full fertilizer usage.",
    level: "basic"
  },
  {
    question: "What is the profit per hectare of Crop A?",
    shortAnswer: "₹45,000.",
    explanation: "Crop A gives ₹45,000 profit per hectare.",
    hint: "Crop A profit.",
    level: "basic"
  },
  {
    question: "What is the profit per hectare of Crop B?",
    shortAnswer: "₹55,000.",
    explanation: "Crop B gives ₹55,000 profit per hectare.",
    hint: "Crop B profit.",
    level: "basic"
  },
  {
    question: "What is the labor requirement per hectare of Crop A?",
    shortAnswer: "2 labor-days.",
    explanation: "Crop A requires 2 labor-days per hectare.",
    hint: "Crop A labor requirement.",
    level: "basic"
  },
  {
    question: "What is the labor requirement per hectare of Crop B?",
    shortAnswer: "4 labor-days.",
    explanation: "Crop B requires 4 labor-days per hectare.",
    hint: "Crop B labor requirement.",
    level: "basic"
  },
  {
    question: "What is the fertilizer requirement per hectare of Crop A?",
    shortAnswer: "3 units.",
    explanation: "Crop A requires 3 units of fertilizer per hectare.",
    hint: "Crop A fertilizer requirement.",
    level: "basic"
  },
  {
    question: "What is the fertilizer requirement per hectare of Crop B?",
    shortAnswer: "2 units.",
    explanation: "Crop B requires 2 units of fertilizer per hectare.",
    hint: "Crop B fertilizer requirement.",
    level: "basic"
  },
  {
    question: "What is a common mistake in agricultural production problems?",
    shortAnswer: "Assuming the crop with higher profit should get all the land.",
    explanation: "The higher profit crop may use too much of a scarce resource, so a mix is often optimal.",
    hint: "Don't just pick the highest profit crop.",
    level: "moderate"
  },
  {
    question: "What is the labor efficiency of Crop A (profit per labor-day)?",
    shortAnswer: "₹22,500 (45,000 ÷ 2).",
    explanation: "Crop A gives ₹22,500 profit per labor-day.",
    hint: "Profit divided by labor usage.",
    level: "moderate"
  },
  {
    question: "What is the labor efficiency of Crop B (profit per labor-day)?",
    shortAnswer: "₹13,750 (55,000 ÷ 4).",
    explanation: "Crop B gives ₹13,750 profit per labor-day.",
    hint: "Profit divided by labor usage.",
    level: "moderate"
  },
  {
    question: "Which crop is more labor-efficient?",
    shortAnswer: "Crop A (₹22,500 per labor-day).",
    explanation: "Crop A gives higher profit per labor-day than Crop B.",
    hint: "Crop A is more labor-efficient.",
    level: "moderate"
  },
  {
    question: "What is the fertilizer efficiency of Crop A (profit per fertilizer unit)?",
    shortAnswer: "₹15,000 (45,000 ÷ 3).",
    explanation: "Crop A gives ₹15,000 profit per fertilizer unit.",
    hint: "Profit divided by fertilizer usage.",
    level: "moderate"
  },
  {
    question: "What is the fertilizer efficiency of Crop B (profit per fertilizer unit)?",
    shortAnswer: "₹27,500 (55,000 ÷ 2).",
    explanation: "Crop B gives ₹27,500 profit per fertilizer unit.",
    hint: "Profit divided by fertilizer usage.",
    level: "moderate"
  },
  {
    question: "Which crop is more fertilizer-efficient?",
    shortAnswer: "Crop B (₹27,500 per fertilizer unit).",
    explanation: "Crop B gives higher profit per fertilizer unit than Crop A.",
    hint: "Crop B is more fertilizer-efficient.",
    level: "moderate"
  },
  {
    question: "If land increased to 90 hectares, what would happen?",
    shortAnswer: "The optimal solution changes, potentially increasing profit.",
    explanation: "More land allows more production, but labor and fertilizer may become binding.",
    hint: "More land = more potential profit.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in agricultural production?",
    shortAnswer: "To ensure land allocation is non-negative.",
    explanation: "You cannot allocate negative land to any crop.",
    hint: "No negative allocation.",
    level: "basic"
  },
  {
    question: "What is the economic interpretation of all resources being binding?",
    shortAnswer: "All resources are scarce and fully utilized.",
    explanation: "Binding resources indicate that each is limiting production and has a shadow price.",
    hint: "All resources are scarce.",
    level: "moderate"
  }
];

export default questions;