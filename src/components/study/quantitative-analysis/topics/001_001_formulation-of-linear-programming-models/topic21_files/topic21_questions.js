// topic21_files/topic21_questions.js

const questions = [
  {
    question: "What is the goal of a blending problem?",
    shortAnswer: "To mix raw materials to meet quality specifications at minimum cost.",
    explanation: "Blending problems involve combining ingredients to achieve desired characteristics while minimizing cost.",
    hint: "Minimize cost, meet quality.",
    level: "basic"
  },
  {
    question: "In the blending example, what are the decision variables?",
    shortAnswer: "x₁ = kg of Material X, x₂ = kg of Material Y.",
    explanation: "These represent the quantities of each raw material to use in the blend.",
    hint: "Two materials, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the blending example?",
    shortAnswer: "Minimize Z = 25x₁ + 20x₂.",
    explanation: "Material X costs ₹25/kg, Material Y costs ₹20/kg.",
    hint: "Cost per kg for each material.",
    level: "basic"
  },
  {
    question: "What does the blend constraint x₁ + x₂ = 1,000 represent?",
    shortAnswer: "Total blend must be exactly 1,000 kg.",
    explanation: "The company needs to produce exactly 1,000 kg of the blended product.",
    hint: "Fixed production quantity.",
    level: "basic"
  },
  {
    question: "What does the protein constraint represent?",
    shortAnswer: "3x₁ + x₂ ≥ 2,000 (after simplification).",
    explanation: "Protein content must be at least 20% of the total blend.",
    hint: "Minimum protein requirement.",
    level: "moderate"
  },
  {
    question: "What does the fat constraint represent?",
    shortAnswer: "x₁ + 4x₂ ≤ 3,000 (after simplification).",
    explanation: "Fat content must be at most 15% of the total blend.",
    hint: "Maximum fat requirement.",
    level: "moderate"
  },
  {
    question: "What does the moisture constraint represent?",
    shortAnswer: "2x₁ + 3x₂ ≤ 2,500 (after simplification).",
    explanation: "Moisture content must be at most 10% of the total blend.",
    hint: "Maximum moisture requirement.",
    level: "moderate"
  },
  {
    question: "What is the optimal solution for the blending example?",
    shortAnswer: "x₁ = 500, x₂ = 500 with cost = ₹22,500.",
    explanation: "Use 500 kg of each material to minimize cost while meeting all quality requirements.",
    hint: "Optimal blend composition.",
    level: "moderate"
  },
  {
    question: "What is the total cost at the optimal solution?",
    shortAnswer: "₹22,500.",
    explanation: "Cost = 25(500) + 20(500) = 12,500 + 10,000 = 22,500.",
    hint: "Minimum cost value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Protein and Moisture are binding; Fat has slack.",
    explanation: "Protein: 3(500)+500=2,000 (binding). Moisture: 2(500)+3(500)=2,500 (binding). Fat: 500+4(500)=2,500 ≤ 3,000 (slack).",
    hint: "Check which constraints are tight.",
    level: "moderate"
  },
  {
    question: "What is the slack in the fat constraint at the optimum?",
    shortAnswer: "500 units (3,000 - 2,500 = 500).",
    explanation: "Fat content is below the maximum limit.",
    hint: "Unused fat allowance.",
    level: "moderate"
  },
  {
    question: "What is the protein content at the optimal solution?",
    shortAnswer: "200 kg (20% of 1,000).",
    explanation: "Protein = 0.30(500) + 0.10(500) = 150 + 50 = 200 kg.",
    hint: "Protein amount.",
    level: "moderate"
  },
  {
    question: "What is the fat content at the optimal solution?",
    shortAnswer: "125 kg (12.5% of 1,000).",
    explanation: "Fat = 0.05(500) + 0.20(500) = 25 + 100 = 125 kg.",
    hint: "Fat amount.",
    level: "moderate"
  },
  {
    question: "What is the moisture content at the optimal solution?",
    shortAnswer: "100 kg (10% of 1,000).",
    explanation: "Moisture = 0.08(500) + 0.12(500) = 40 + 60 = 100 kg.",
    hint: "Moisture amount.",
    level: "moderate"
  },
  {
    question: "What is the protein percentage in Material X?",
    shortAnswer: "30%.",
    explanation: "Material X contains 30% protein.",
    hint: "Material X protein.",
    level: "basic"
  },
  {
    question: "What is the protein percentage in Material Y?",
    shortAnswer: "10%.",
    explanation: "Material Y contains 10% protein.",
    hint: "Material Y protein.",
    level: "basic"
  },
  {
    question: "What is the fat percentage in Material X?",
    shortAnswer: "5%.",
    explanation: "Material X contains 5% fat.",
    hint: "Material X fat.",
    level: "basic"
  },
  {
    question: "What is the fat percentage in Material Y?",
    shortAnswer: "20%.",
    explanation: "Material Y contains 20% fat.",
    hint: "Material Y fat.",
    level: "basic"
  },
  {
    question: "What is a common mistake in blending problems?",
    shortAnswer: "Forgetting to convert percentages to absolute quantities.",
    explanation: "Percentage constraints must be multiplied by the total blend amount.",
    hint: "Convert percentages to kg.",
    level: "moderate"
  },
  {
    question: "What is the cost per kg of Material Y?",
    shortAnswer: "₹20/kg.",
    explanation: "Material Y costs ₹20 per kg.",
    hint: "Material Y cost.",
    level: "basic"
  },
  {
    question: "What is the cost per kg of Material X?",
    shortAnswer: "₹25/kg.",
    explanation: "Material X costs ₹25 per kg.",
    hint: "Material X cost.",
    level: "basic"
  },
  {
    question: "Why is Material Y cheaper despite having higher fat content?",
    shortAnswer: "Material Y is cheaper to source, but has higher fat content.",
    explanation: "The company must balance cost with quality requirements.",
    hint: "Cost vs quality trade-off.",
    level: "moderate"
  },
  {
    question: "If the fat limit increases to 20%, what happens?",
    shortAnswer: "The fat constraint relaxes, potentially allowing more Material Y.",
    explanation: "Higher fat allowance means more expensive, high-fat Material Y can be used.",
    hint: "More fat allowed = more Y.",
    level: "expert"
  },
  {
    question: "If the protein requirement increases to 25%, what happens?",
    shortAnswer: "The optimal solution shifts toward more Material X.",
    explanation: "Higher protein requirement needs more high-protein Material X.",
    hint: "More protein = more X.",
    level: "expert"
  },
  {
    question: "What is the role of the equality constraint in blending problems?",
    shortAnswer: "It fixes the total amount of blend to produce.",
    explanation: "The blend amount is usually fixed (e.g., 1,000 kg) to meet production targets.",
    hint: "Fixed production quantity.",
    level: "moderate"
  },
  {
    question: "What is the moisture percentage in Material X?",
    shortAnswer: "8%.",
    explanation: "Material X contains 8% moisture.",
    hint: "Material X moisture.",
    level: "basic"
  },
  {
    question: "What is the moisture percentage in Material Y?",
    shortAnswer: "12%.",
    explanation: "Material Y contains 12% moisture.",
    hint: "Material Y moisture.",
    level: "basic"
  },
  {
    question: "What is the total amount of Material X used at the optimum?",
    shortAnswer: "500 kg.",
    explanation: "x₁ = 500 kg of Material X.",
    hint: "Material X quantity.",
    level: "basic"
  },
  {
    question: "What is the total amount of Material Y used at the optimum?",
    shortAnswer: "500 kg.",
    explanation: "x₂ = 500 kg of Material Y.",
    hint: "Material Y quantity.",
    level: "basic"
  },
  {
    question: "What is the economic interpretation of binding constraints?",
    shortAnswer: "These quality requirements are limiting the blend composition.",
    explanation: "Binding constraints indicate quality specifications that are just met.",
    hint: "Quality specs that are tight.",
    level: "moderate"
  }
];

export default questions;