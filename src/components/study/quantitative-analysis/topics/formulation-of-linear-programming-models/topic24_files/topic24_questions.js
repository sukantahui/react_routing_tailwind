// topic24_files/topic24_questions.js

const questions = [
  {
    question: "What is the goal of a problem with minimum production requirements?",
    shortAnswer: "To maximize profit while meeting minimum production obligations.",
    explanation: "These problems involve producing at least certain quantities of products to meet contracts, regulations, or market demands.",
    hint: "Maximize profit, meet minimums.",
    level: "basic"
  },
  {
    question: "In the minimum production example, what are the decision variables?",
    shortAnswer: "x₁ = units of Product X, x₂ = units of Product Y.",
    explanation: "These represent the quantities of each product to be produced.",
    hint: "Two products, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the minimum production example?",
    shortAnswer: "Maximize Z = 50x₁ + 60x₂.",
    explanation: "Product X gives ₹50 profit per unit, Product Y gives ₹60 profit per unit.",
    hint: "Profit per unit for each product.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≥ 20 represent?",
    shortAnswer: "At least 20 units of Product X must be produced.",
    explanation: "This is a minimum production requirement for Product X due to a contract.",
    hint: "Minimum Product X requirement.",
    level: "basic"
  },
  {
    question: "What does the constraint x₂ ≥ 15 represent?",
    shortAnswer: "At least 15 units of Product Y must be produced.",
    explanation: "This is a minimum production requirement for Product Y due to market demand.",
    hint: "Minimum Product Y requirement.",
    level: "basic"
  },
  {
    question: "What does the Labor constraint represent?",
    shortAnswer: "3x₁ + 4x₂ ≤ 200.",
    explanation: "Total labor hours cannot exceed 200.",
    hint: "Labor availability limit.",
    level: "basic"
  },
  {
    question: "What does the Machine constraint represent?",
    shortAnswer: "2x₁ + 3x₂ ≤ 150.",
    explanation: "Total machine hours cannot exceed 150.",
    hint: "Machine capacity limit.",
    level: "basic"
  },
  {
    question: "What does the Material constraint represent?",
    shortAnswer: "4x₁ + 2x₂ ≤ 180.",
    explanation: "Total raw material cannot exceed 180 units.",
    hint: "Material availability limit.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the minimum production example?",
    shortAnswer: "x₁ = 32, x₂ = 26 with profit = ₹3,160.",
    explanation: "Produce 32 units of Product X and 26 units of Product Y.",
    hint: "Optimal production mix.",
    level: "moderate"
  },
  {
    question: "What is the total profit at the optimal solution?",
    shortAnswer: "₹3,160.",
    explanation: "Profit = 50(32) + 60(26) = 1,600 + 1,560 = 3,160.",
    hint: "Maximum profit value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Labor and Material are binding; Machine has slack.",
    explanation: "Labor: 200/200 used. Material: 180/180 used. Machine: 142/150 (slack: 8).",
    hint: "Check which resources are fully used.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Machine constraint at the optimum?",
    shortAnswer: "8 hours (150 - 142 = 8).",
    explanation: "Machine used = 2(32)+3(26) = 64+78 = 142 hours.",
    hint: "Unused machine capacity.",
    level: "moderate"
  },
  {
    question: "Are the minimum production requirements binding at the optimum?",
    shortAnswer: "No, both are satisfied but not binding.",
    explanation: "x₁ = 32 > 20, x₂ = 26 > 15. The minimums are exceeded.",
    hint: "Minimum requirements are not tight.",
    level: "moderate"
  },
  {
    question: "What is the profit per unit of Product X?",
    shortAnswer: "₹50.",
    explanation: "Product X gives ₹50 profit per unit.",
    hint: "Product X profit.",
    level: "basic"
  },
  {
    question: "What is the profit per unit of Product Y?",
    shortAnswer: "₹60.",
    explanation: "Product Y gives ₹60 profit per unit.",
    hint: "Product Y profit.",
    level: "basic"
  },
  {
    question: "What is the labor usage per unit of Product X?",
    shortAnswer: "3 hours.",
    explanation: "Product X requires 3 hours of labor per unit.",
    hint: "Product X labor requirement.",
    level: "basic"
  },
  {
    question: "What is the material usage per unit of Product X?",
    shortAnswer: "4 units.",
    explanation: "Product X requires 4 units of material per unit.",
    hint: "Product X material requirement.",
    level: "basic"
  },
  {
    question: "What is a common mistake in problems with minimum requirements?",
    shortAnswer: "Forgetting to include the minimum requirements as constraints.",
    explanation: "Minimums are separate constraints that must be added to the model.",
    hint: "Don't forget minimum constraints.",
    level: "moderate"
  },
  {
    question: "What is the labor efficiency of Product X (profit per labor hour)?",
    shortAnswer: "₹16.67 (50 ÷ 3).",
    explanation: "Product X gives ₹16.67 profit per labor hour.",
    hint: "Profit divided by labor usage.",
    level: "moderate"
  },
  {
    question: "What is the labor efficiency of Product Y (profit per labor hour)?",
    shortAnswer: "₹15 (60 ÷ 4).",
    explanation: "Product Y gives ₹15 profit per labor hour.",
    hint: "Profit divided by labor usage.",
    level: "moderate"
  },
  {
    question: "Which product is more labor-efficient?",
    shortAnswer: "Product X (₹16.67 per labor hour).",
    explanation: "Product X gives higher profit per labor hour than Product Y.",
    hint: "Higher profit per labor unit.",
    level: "moderate"
  },
  {
    question: "What is the material efficiency of Product X (profit per material unit)?",
    shortAnswer: "₹12.50 (50 ÷ 4).",
    explanation: "Product X gives ₹12.50 profit per material unit.",
    hint: "Profit divided by material usage.",
    level: "moderate"
  },
  {
    question: "What is the material efficiency of Product Y (profit per material unit)?",
    shortAnswer: "₹30 (60 ÷ 2).",
    explanation: "Product Y gives ₹30 profit per material unit.",
    hint: "Profit divided by material usage.",
    level: "moderate"
  },
  {
    question: "Which product is more material-efficient?",
    shortAnswer: "Product Y (₹30 per material unit).",
    explanation: "Product Y gives higher profit per material unit than Product X.",
    hint: "Higher profit per material unit.",
    level: "moderate"
  },
  {
    question: "If the minimum requirement for Product X increases to 30, what happens?",
    shortAnswer: "The optimal solution changes, potentially reducing profit.",
    explanation: "Higher minimum X forces more production of less profitable (per labor) product.",
    hint: "Higher minimum = possible lower profit.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in minimum production problems?",
    shortAnswer: "To ensure production quantities are non-negative.",
    explanation: "You cannot produce negative units, but minimums already ensure positivity.",
    hint: "No negative production.",
    level: "basic"
  },
  {
    question: "What is the total production at the optimal solution?",
    shortAnswer: "58 units (32 + 26).",
    explanation: "Total units produced = 32 + 26 = 58.",
    hint: "Sum of all products.",
    level: "basic"
  },
  {
    question: "What is the total labor used at the optimal solution?",
    shortAnswer: "200 hours (fully used).",
    explanation: "Labor = 3(32)+4(26) = 96+104 = 200.",
    hint: "Total labor usage.",
    level: "moderate"
  },
  {
    question: "What is the total material used at the optimal solution?",
    shortAnswer: "180 units (fully used).",
    explanation: "Material = 4(32)+2(26) = 128+52 = 180.",
    hint: "Total material usage.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of minimum requirements?",
    shortAnswer: "They ensure certain products are produced regardless of profitability.",
    explanation: "Minimum requirements may be due to contracts, regulations, or strategic reasons.",
    hint: "Obligations to produce.",
    level: "moderate"
  },
  {
    question: "If the minimum requirement for Product Y increases to 20, what happens?",
    shortAnswer: "The optimal solution shifts toward more Product Y production.",
    explanation: "Higher minimum Y forces more production of Product Y, possibly reducing profit.",
    hint: "More Y = possible lower profit.",
    level: "expert"
  }
];

export default questions;