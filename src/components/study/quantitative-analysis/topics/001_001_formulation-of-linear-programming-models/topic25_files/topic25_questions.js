// topic25_files/topic25_questions.js

const questions = [
  {
    question: "What is the goal of a problem with maximum production limits?",
    shortAnswer: "To maximize profit while respecting maximum production limits.",
    explanation: "These problems involve producing no more than certain quantities of products due to market demand, storage, or strategic constraints.",
    hint: "Maximize profit, respect maximums.",
    level: "basic"
  },
  {
    question: "In the maximum production example, what are the decision variables?",
    shortAnswer: "x₁ = units of Product A, x₂ = units of Product B.",
    explanation: "These represent the quantities of each product to be produced.",
    hint: "Two products, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the maximum production example?",
    shortAnswer: "Maximize Z = 40x₁ + 50x₂.",
    explanation: "Product A gives ₹40 profit per unit, Product B gives ₹50 profit per unit.",
    hint: "Profit per unit for each product.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≤ 40 represent?",
    shortAnswer: "Product A cannot exceed 40 units due to market demand.",
    explanation: "This is a maximum production limit for Product A.",
    hint: "Maximum Product A limit.",
    level: "basic"
  },
  {
    question: "What does the constraint x₂ ≤ 25 represent?",
    shortAnswer: "Product B cannot exceed 25 units due to market demand.",
    explanation: "This is a maximum production limit for Product B.",
    hint: "Maximum Product B limit.",
    level: "basic"
  },
  {
    question: "What does the Labor constraint represent?",
    shortAnswer: "2x₁ + 3x₂ ≤ 180.",
    explanation: "Total labor hours cannot exceed 180.",
    hint: "Labor availability limit.",
    level: "basic"
  },
  {
    question: "What does the Machine constraint represent?",
    shortAnswer: "3x₁ + 2x₂ ≤ 120.",
    explanation: "Total machine hours cannot exceed 120.",
    hint: "Machine capacity limit.",
    level: "basic"
  },
  {
    question: "What does the Material constraint represent?",
    shortAnswer: "2x₁ + 4x₂ ≤ 150.",
    explanation: "Total raw material cannot exceed 150 units.",
    hint: "Material availability limit.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the maximum production example?",
    shortAnswer: "x₁ = 23.33, x₂ = 25 with profit = ₹2,183.33.",
    explanation: "Produce 23.33 units of Product A and 25 units of Product B.",
    hint: "Optimal production mix.",
    level: "moderate"
  },
  {
    question: "What is the total profit at the optimal solution?",
    shortAnswer: "₹2,183.33.",
    explanation: "Profit = 40(23.33) + 50(25) = 933.33 + 1,250 = 2,183.33.",
    hint: "Maximum profit value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Machine and Maximum B are binding; Labor, Material, and Maximum A have slack.",
    explanation: "Machine: 120/120 used. Max B: 25/25 used. Labor: 121.67/180 (slack: 58.33). Material: 146.67/150 (slack: 3.33). Max A: 23.33/40 (slack: 16.67).",
    hint: "Check which constraints are tight.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Labor constraint at the optimum?",
    shortAnswer: "58.33 hours (180 - 121.67 = 58.33).",
    explanation: "Labor used = 2(23.33)+3(25) = 46.67+75 = 121.67 hours.",
    hint: "Unused labor capacity.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Material constraint at the optimum?",
    shortAnswer: "3.33 units (150 - 146.67 = 3.33).",
    explanation: "Material used = 2(23.33)+4(25) = 46.67+100 = 146.67 units.",
    hint: "Unused material capacity.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Maximum A constraint at the optimum?",
    shortAnswer: "16.67 units (40 - 23.33 = 16.67).",
    explanation: "Product A produced = 23.33 units, below the maximum of 40.",
    hint: "Unused Product A capacity.",
    level: "moderate"
  },
  {
    question: "Is the Maximum B constraint binding at the optimum?",
    shortAnswer: "Yes, x₂ = 25 equals the maximum limit.",
    explanation: "Product B is produced at its maximum capacity.",
    hint: "Product B at limit.",
    level: "basic"
  },
  {
    question: "What is the profit per unit of Product A?",
    shortAnswer: "₹40.",
    explanation: "Product A gives ₹40 profit per unit.",
    hint: "Product A profit.",
    level: "basic"
  },
  {
    question: "What is the profit per unit of Product B?",
    shortAnswer: "₹50.",
    explanation: "Product B gives ₹50 profit per unit.",
    hint: "Product B profit.",
    level: "basic"
  },
  {
    question: "What is the machine usage per unit of Product A?",
    shortAnswer: "3 hours.",
    explanation: "Product A requires 3 hours of machine time per unit.",
    hint: "Product A machine requirement.",
    level: "basic"
  },
  {
    question: "What is a common mistake in problems with maximum production limits?",
    shortAnswer: "Forgetting to include the maximum limits as separate constraints.",
    explanation: "Maximums are upper bounds that must be added to the model.",
    hint: "Don't forget maximum constraints.",
    level: "moderate"
  },
  {
    question: "What is the machine efficiency of Product A (profit per machine hour)?",
    shortAnswer: "₹13.33 (40 ÷ 3).",
    explanation: "Product A gives ₹13.33 profit per machine hour.",
    hint: "Profit divided by machine usage.",
    level: "moderate"
  },
  {
    question: "What is the machine efficiency of Product B (profit per machine hour)?",
    shortAnswer: "₹25 (50 ÷ 2).",
    explanation: "Product B gives ₹25 profit per machine hour.",
    hint: "Profit divided by machine usage.",
    level: "moderate"
  },
  {
    question: "Which product is more machine-efficient?",
    shortAnswer: "Product B (₹25 per machine hour).",
    explanation: "Product B gives higher profit per machine hour than Product A.",
    hint: "Higher profit per machine unit.",
    level: "moderate"
  },
  {
    question: "If the maximum limit for Product B increases to 35, what happens?",
    shortAnswer: "The optimal solution changes, potentially increasing profit.",
    explanation: "Higher max B allows more production of the more profitable (per machine hour) product.",
    hint: "Higher max = more potential profit.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in maximum production problems?",
    shortAnswer: "To ensure production quantities are non-negative.",
    explanation: "You cannot produce negative units.",
    hint: "No negative production.",
    level: "basic"
  },
  {
    question: "What is the total production at the optimal solution?",
    shortAnswer: "48.33 units (23.33 + 25).",
    explanation: "Total units produced = 23.33 + 25 = 48.33.",
    hint: "Sum of all products.",
    level: "basic"
  },
  {
    question: "What is the total machine used at the optimal solution?",
    shortAnswer: "120 hours (fully used).",
    explanation: "Machine = 3(23.33)+2(25) = 70+50 = 120.",
    hint: "Total machine usage.",
    level: "moderate"
  },
  {
    question: "If the maximum limit for Product A decreases to 20, what happens?",
    shortAnswer: "The optimal solution shifts, potentially reducing profit.",
    explanation: "Lower max A forces less production of A, possibly reducing profit.",
    hint: "Lower max = possible lower profit.",
    level: "expert"
  },
  {
    question: "What is the economic interpretation of maximum production limits?",
    shortAnswer: "They represent upper bounds on production due to market or capacity constraints.",
    explanation: "Maximums may be due to demand limits, storage constraints, or strategic decisions.",
    hint: "Upper bounds on production.",
    level: "moderate"
  },
  {
    question: "What is the difference between maximum limits and resource constraints?",
    shortAnswer: "Maximum limits are product-specific upper bounds; resource constraints are shared limits.",
    explanation: "Maximums apply to individual products; resources are shared across all products.",
    hint: "Product-specific vs shared.",
    level: "moderate"
  },
  {
    question: "If the Machine capacity increases to 150 hours, what happens?",
    shortAnswer: "The optimal solution changes, potentially increasing profit.",
    explanation: "More machine capacity allows more production, but maximums may still limit.",
    hint: "More capacity = more potential.",
    level: "expert"
  }
];

export default questions;