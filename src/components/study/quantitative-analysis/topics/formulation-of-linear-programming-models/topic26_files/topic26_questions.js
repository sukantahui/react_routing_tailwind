// topic26_files/topic26_questions.js

const questions = [
  {
    question: "What is the goal of a problem with both minimum and maximum requirements?",
    shortAnswer: "To maximize profit while respecting both lower and upper bounds on production.",
    explanation: "These problems involve producing at least certain quantities (minimums) and no more than certain quantities (maximums) due to contracts, market demand, or strategic constraints.",
    hint: "Maximize profit, respect both minimums and maximums.",
    level: "basic"
  },
  {
    question: "In the both minimum/maximum example, what are the decision variables?",
    shortAnswer: "x₁ = units of Product A, x₂ = units of Product B.",
    explanation: "These represent the quantities of each product to be produced.",
    hint: "Two products, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the both minimum/maximum example?",
    shortAnswer: "Maximize Z = 45x₁ + 55x₂.",
    explanation: "Product A gives ₹45 profit per unit, Product B gives ₹55 profit per unit.",
    hint: "Profit per unit for each product.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≥ 15 represent?",
    shortAnswer: "At least 15 units of Product A must be produced.",
    explanation: "This is a minimum production requirement for Product A due to a contract.",
    hint: "Minimum Product A requirement.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≤ 35 represent?",
    shortAnswer: "No more than 35 units of Product A can be produced.",
    explanation: "This is a maximum production limit for Product A due to market demand.",
    hint: "Maximum Product A limit.",
    level: "basic"
  },
  {
    question: "What does the constraint x₂ ≥ 10 represent?",
    shortAnswer: "At least 10 units of Product B must be produced.",
    explanation: "This is a minimum production requirement for Product B due to a contract.",
    hint: "Minimum Product B requirement.",
    level: "basic"
  },
  {
    question: "What does the constraint x₂ ≤ 30 represent?",
    shortAnswer: "No more than 30 units of Product B can be produced.",
    explanation: "This is a maximum production limit for Product B due to market demand.",
    hint: "Maximum Product B limit.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the both minimum/maximum example?",
    shortAnswer: "x₁ = 26.67, x₂ = 30 with profit = ₹2,850.",
    explanation: "Produce 26.67 units of Product A and 30 units of Product B.",
    hint: "Optimal production mix.",
    level: "moderate"
  },
  {
    question: "What is the total profit at the optimal solution?",
    shortAnswer: "₹2,850.",
    explanation: "Profit = 45(26.67) + 55(30) = 1,200 + 1,650 = 2,850.",
    hint: "Maximum profit value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Labor and Maximum B are binding.",
    explanation: "Labor: 200/200 used. Max B: 30/30 used. Machine: 143.33/150 (slack: 6.67). Material: 166.67/180 (slack: 13.33). Min A: 26.67 ≥ 15. Max A: 26.67 ≤ 35. Min B: 30 ≥ 10.",
    hint: "Check which constraints are tight.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Machine constraint at the optimum?",
    shortAnswer: "6.67 hours (150 - 143.33 = 6.67).",
    explanation: "Machine used = 2(26.67)+3(30) = 53.33+90 = 143.33 hours.",
    hint: "Unused machine capacity.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Material constraint at the optimum?",
    shortAnswer: "13.33 units (180 - 166.67 = 13.33).",
    explanation: "Material used = 4(26.67)+2(30) = 106.67+60 = 166.67 units.",
    hint: "Unused material capacity.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Maximum A constraint at the optimum?",
    shortAnswer: "8.33 units (35 - 26.67 = 8.33).",
    explanation: "Product A produced = 26.67 units, below the maximum of 35.",
    hint: "Unused Product A capacity.",
    level: "moderate"
  },
  {
    question: "Is the Minimum A constraint binding at the optimum?",
    shortAnswer: "No, x₁ = 26.67 > 15, so the minimum is satisfied but not binding.",
    explanation: "Production exceeds the minimum requirement.",
    hint: "Minimum not tight.",
    level: "basic"
  },
  {
    question: "Is the Maximum B constraint binding at the optimum?",
    shortAnswer: "Yes, x₂ = 30 equals the maximum limit.",
    explanation: "Product B is produced at its maximum capacity.",
    hint: "Product B at limit.",
    level: "basic"
  },
  {
    question: "What is the profit per unit of Product A?",
    shortAnswer: "₹45.",
    explanation: "Product A gives ₹45 profit per unit.",
    hint: "Product A profit.",
    level: "basic"
  },
  {
    question: "What is the profit per unit of Product B?",
    shortAnswer: "₹55.",
    explanation: "Product B gives ₹55 profit per unit.",
    hint: "Product B profit.",
    level: "basic"
  },
  {
    question: "What is the labor usage per unit of Product A?",
    shortAnswer: "3 hours.",
    explanation: "Product A requires 3 hours of labor per unit.",
    hint: "Product A labor requirement.",
    level: "basic"
  },
  {
    question: "What is the material usage per unit of Product B?",
    shortAnswer: "2 units.",
    explanation: "Product B requires 2 units of material per unit.",
    hint: "Product B material requirement.",
    level: "basic"
  },
  {
    question: "What is a common mistake in problems with both minimum and maximum requirements?",
    shortAnswer: "Forgetting to include all bounds (minimums and maximums) as separate constraints.",
    explanation: "Both lower and upper bounds must be added to the model.",
    hint: "Include all bounds.",
    level: "moderate"
  },
  {
    question: "What is the labor efficiency of Product A (profit per labor hour)?",
    shortAnswer: "₹15 (45 ÷ 3).",
    explanation: "Product A gives ₹15 profit per labor hour.",
    hint: "Profit divided by labor usage.",
    level: "moderate"
  },
  {
    question: "What is the labor efficiency of Product B (profit per labor hour)?",
    shortAnswer: "₹13.75 (55 ÷ 4).",
    explanation: "Product B gives ₹13.75 profit per labor hour.",
    hint: "Profit divided by labor usage.",
    level: "moderate"
  },
  {
    question: "Which product is more labor-efficient?",
    shortAnswer: "Product A (₹15 per labor hour).",
    explanation: "Product A gives higher profit per labor hour than Product B.",
    hint: "Higher profit per labor unit.",
    level: "moderate"
  },
  {
    question: "If the maximum limit for Product B decreases to 25, what happens?",
    shortAnswer: "The optimal solution changes, potentially reducing profit.",
    explanation: "Lower max B forces less production of Product B.",
    hint: "Lower max = possible lower profit.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in both minimum/maximum problems?",
    shortAnswer: "To ensure production quantities are non-negative.",
    explanation: "You cannot produce negative units, but minimums already ensure positivity.",
    hint: "No negative production.",
    level: "basic"
  },
  {
    question: "What is the total production at the optimal solution?",
    shortAnswer: "56.67 units (26.67 + 30).",
    explanation: "Total units produced = 26.67 + 30 = 56.67.",
    hint: "Sum of all products.",
    level: "basic"
  },
  {
    question: "What is the total labor used at the optimal solution?",
    shortAnswer: "200 hours (fully used).",
    explanation: "Labor = 3(26.67)+4(30) = 80+120 = 200.",
    hint: "Total labor usage.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of binding constraints in this problem?",
    shortAnswer: "Labor and the maximum limit for Product B are the limiting factors.",
    explanation: "These constraints are fully utilized and limit production.",
    hint: "Scarce factors.",
    level: "moderate"
  },
  {
    question: "If the minimum requirement for Product A increases to 25, what happens?",
    shortAnswer: "The optimal solution changes, potentially reducing profit.",
    explanation: "Higher min A forces more production of Product A.",
    hint: "Higher minimum = possible lower profit.",
    level: "expert"
  },
  {
    question: "What is the difference between minimums and maximums in LP?",
    shortAnswer: "Minimums are lower bounds (≥), maximums are upper bounds (≤).",
    explanation: "Minimums force production; maximums cap production.",
    hint: "Lower vs upper bounds.",
    level: "basic"
  },
  {
    question: "What is the material efficiency of Product A (profit per material unit)?",
    shortAnswer: "₹11.25 (45 ÷ 4).",
    explanation: "Product A gives ₹11.25 profit per material unit.",
    hint: "Profit divided by material usage.",
    level: "moderate"
  }
];

export default questions;