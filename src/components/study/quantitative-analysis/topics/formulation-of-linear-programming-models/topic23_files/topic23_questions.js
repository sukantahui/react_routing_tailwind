// topic23_files/topic23_questions.js

const questions = [
  {
    question: "What is the goal of a problem with multiple resource constraints?",
    shortAnswer: "To maximize profit or minimize cost while respecting all resource limits.",
    explanation: "Problems with multiple resource constraints involve allocating limited resources across products to achieve the best outcome.",
    hint: "Maximize profit with limited resources.",
    level: "basic"
  },
  {
    question: "In the multiple resource example, what are the decision variables?",
    shortAnswer: "x₁ = units of Product A, x₂ = units of Product B, x₃ = units of Product C.",
    explanation: "These represent the quantities of each product to be produced.",
    hint: "Three products, three variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the multiple resource example?",
    shortAnswer: "Maximize Z = 60x₁ + 50x₂ + 70x₃.",
    explanation: "Product A gives ₹60 profit per unit, Product B ₹50, Product C ₹70.",
    hint: "Profit per unit for each product.",
    level: "basic"
  },
  {
    question: "How many resource constraints are in the multiple resource example?",
    shortAnswer: "4 constraints: Labor, Machine A, Machine B, and Material.",
    explanation: "Each resource has an availability limit.",
    hint: "Count the resources.",
    level: "basic"
  },
  {
    question: "What does the Labor constraint represent?",
    shortAnswer: "2x₁ + 3x₂ + 4x₃ ≤ 240.",
    explanation: "Total labor hours cannot exceed 240.",
    hint: "Labor availability limit.",
    level: "basic"
  },
  {
    question: "What does the Machine A constraint represent?",
    shortAnswer: "3x₁ + 2x₂ + x₃ ≤ 180.",
    explanation: "Total Machine A hours cannot exceed 180.",
    hint: "Machine A capacity limit.",
    level: "basic"
  },
  {
    question: "What does the Machine B constraint represent?",
    shortAnswer: "x₁ + 3x₂ + 2x₃ ≤ 150.",
    explanation: "Total Machine B hours cannot exceed 150.",
    hint: "Machine B capacity limit.",
    level: "basic"
  },
  {
    question: "What does the Material constraint represent?",
    shortAnswer: "2x₁ + 2x₂ + 3x₃ ≤ 200.",
    explanation: "Total raw material cannot exceed 200 units.",
    hint: "Material availability limit.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the multiple resource example?",
    shortAnswer: "x₁ = 30, x₂ = 20, x₃ = 30 with profit = ₹4,900.",
    explanation: "Produce 30 units of Product A, 20 of Product B, and 30 of Product C.",
    hint: "Optimal production mix.",
    level: "moderate"
  },
  {
    question: "What is the total profit at the optimal solution?",
    shortAnswer: "₹4,900.",
    explanation: "Profit = 60(30) + 50(20) + 70(30) = 1,800 + 1,000 + 2,100 = 4,900.",
    hint: "Maximum profit value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Labor and Machine B are binding; Machine A and Material have slack.",
    explanation: "Labor: 240/240 used. Machine B: 150/150 used. Machine A: 160/180 (slack: 20). Material: 190/200 (slack: 10).",
    hint: "Check which resources are fully used.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Machine A constraint at the optimum?",
    shortAnswer: "20 hours (180 - 160 = 20).",
    explanation: "Machine A used = 3(30)+2(20)+1(30) = 160 hours.",
    hint: "Unused Machine A capacity.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Material constraint at the optimum?",
    shortAnswer: "10 units (200 - 190 = 10).",
    explanation: "Material used = 2(30)+2(20)+3(30) = 190 units.",
    hint: "Unused material capacity.",
    level: "moderate"
  },
  {
    question: "What is the profit per unit of Product A?",
    shortAnswer: "₹60.",
    explanation: "Product A gives ₹60 profit per unit.",
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
    question: "What is the profit per unit of Product C?",
    shortAnswer: "₹70.",
    explanation: "Product C gives ₹70 profit per unit.",
    hint: "Product C profit.",
    level: "basic"
  },
  {
    question: "What is the labor usage per unit of Product A?",
    shortAnswer: "2 hours.",
    explanation: "Product A requires 2 hours of labor per unit.",
    hint: "Product A labor requirement.",
    level: "basic"
  },
  {
    question: "What is the Machine A usage per unit of Product C?",
    shortAnswer: "1 hour.",
    explanation: "Product C requires 1 hour of Machine A per unit.",
    hint: "Product C Machine A requirement.",
    level: "basic"
  },
  {
    question: "What is the Machine B usage per unit of Product B?",
    shortAnswer: "3 hours.",
    explanation: "Product B requires 3 hours of Machine B per unit.",
    hint: "Product B Machine B requirement.",
    level: "basic"
  },
  {
    question: "What is a common mistake in problems with multiple resource constraints?",
    shortAnswer: "Forgetting to include all resource constraints.",
    explanation: "Each resource limit must be represented as a separate constraint.",
    hint: "List all resources.",
    level: "moderate"
  },
  {
    question: "What is the labor efficiency of Product A (profit per labor hour)?",
    shortAnswer: "₹30 (60 ÷ 2).",
    explanation: "Product A gives ₹30 profit per labor hour.",
    hint: "Profit divided by labor usage.",
    level: "moderate"
  },
  {
    question: "What is the labor efficiency of Product B (profit per labor hour)?",
    shortAnswer: "₹16.67 (50 ÷ 3).",
    explanation: "Product B gives ₹16.67 profit per labor hour.",
    hint: "Profit divided by labor usage.",
    level: "moderate"
  },
  {
    question: "What is the labor efficiency of Product C (profit per labor hour)?",
    shortAnswer: "₹17.50 (70 ÷ 4).",
    explanation: "Product C gives ₹17.50 profit per labor hour.",
    hint: "Profit divided by labor usage.",
    level: "moderate"
  },
  {
    question: "Which product is most labor-efficient?",
    shortAnswer: "Product A (₹30 per labor hour).",
    explanation: "Product A gives the highest profit per labor hour.",
    hint: "Highest profit per labor unit.",
    level: "moderate"
  },
  {
    question: "If Machine A capacity increases to 200 hours, what happens?",
    shortAnswer: "The optimal solution may change if Machine A becomes non-binding.",
    explanation: "More Machine A capacity allows more production, but other constraints may limit.",
    hint: "More capacity = more potential.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in multiple resource problems?",
    shortAnswer: "To ensure production quantities are non-negative.",
    explanation: "You cannot produce negative units of any product.",
    hint: "No negative production.",
    level: "basic"
  },
  {
    question: "What is the total production at the optimal solution?",
    shortAnswer: "80 units (30 + 20 + 30).",
    explanation: "Total units produced = 30 + 20 + 30 = 80.",
    hint: "Sum of all products.",
    level: "basic"
  },
  {
    question: "What is the total labor used at the optimal solution?",
    shortAnswer: "240 hours (fully used).",
    explanation: "Labor = 2(30)+3(20)+4(30) = 60+60+120 = 240.",
    hint: "Total labor usage.",
    level: "moderate"
  },
  {
    question: "What is the total Machine B used at the optimal solution?",
    shortAnswer: "150 hours (fully used).",
    explanation: "Machine B = 1(30)+3(20)+2(30) = 30+60+60 = 150.",
    hint: "Total Machine B usage.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of binding constraints?",
    shortAnswer: "These resources are scarce and limit production.",
    explanation: "Binding constraints indicate resources that are fully utilized and have positive shadow prices.",
    hint: "Scarce resources.",
    level: "moderate"
  },
  {
    question: "Why might a company invest in increasing binding resource capacity?",
    shortAnswer: "Because binding resources limit profit and have positive shadow prices.",
    explanation: "Increasing binding resources would allow more production and higher profit.",
    hint: "Binding = valuable.",
    level: "moderate"
  }
];

export default questions;