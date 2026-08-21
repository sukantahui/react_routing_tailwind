// topic27_files/topic27_questions.js

const questions = [
  {
    question: "What makes a social context LP problem different from a business problem?",
    shortAnswer: "Social context problems maximize social welfare (QALYs, lives saved, etc.) instead of profit.",
    explanation: "Social sector problems aim to maximize social impact, equity, or welfare rather than financial profit.",
    hint: "Maximize social good, not money.",
    level: "basic"
  },
  {
    question: "In the social context example, what are the decision variables?",
    shortAnswer: "x₁ = units of Program X, x₂ = units of Program Y.",
    explanation: "These represent the number of health programs implemented.",
    hint: "Two programs, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the social context example?",
    shortAnswer: "Maximize Z = 500x₁ + 700x₂ (QALYs).",
    explanation: "Program X generates 500 QALYs per unit, Program Y generates 700 QALYs per unit.",
    hint: "Social impact in QALYs.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≥ 10 represent?",
    shortAnswer: "At least 10 units of Program X must be implemented.",
    explanation: "This is a minimum coverage requirement to ensure social equity.",
    hint: "Minimum Program X coverage.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≤ 25 represent?",
    shortAnswer: "No more than 25 units of Program X can be implemented.",
    explanation: "This is a capacity constraint for Program X.",
    hint: "Maximum Program X capacity.",
    level: "basic"
  },
  {
    question: "What is the healthcare constraint in the social context example?",
    shortAnswer: "2x₁ + 3x₂ ≤ 120, total healthcare workers cannot exceed 120 person-months.",
    explanation: "Each Program X unit uses 2 workers, each Program Y uses 3 workers.",
    hint: "Healthcare worker limit.",
    level: "basic"
  },
  {
    question: "What is the budget constraint in the social context example?",
    shortAnswer: "100,000x₁ + 150,000x₂ ≤ 8,000,000 (₹80 lakhs).",
    explanation: "Program X costs ₹1,00,000 per unit, Program Y costs ₹1,50,000 per unit.",
    hint: "Budget limit.",
    level: "moderate"
  },
  {
    question: "What is the optimal solution for the social context example?",
    shortAnswer: "x₁ = 25, x₂ = 23.33 with impact = 28,833.33 QALYs.",
    explanation: "Implement 25 units of Program X and 23.33 units of Program Y.",
    hint: "Optimal program implementation.",
    level: "moderate"
  },
  {
    question: "What is the total social impact at the optimal solution?",
    shortAnswer: "28,833.33 QALYs.",
    explanation: "Impact = 500(25) + 700(23.33) = 12,500 + 16,333 = 28,833.33.",
    hint: "Maximum social impact.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Healthcare and Maximum X are binding.",
    explanation: "Healthcare: 120/120 used. Max X: 25/25 used. Budget: 6,000,000/8,000,000 (slack). Medical: 73.33/180 (slack).",
    hint: "Check which constraints are fully used.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Budget constraint at the optimum?",
    shortAnswer: "₹2,00,000 (8,000,000 - 6,000,000 = 2,000,000).",
    explanation: "Budget used = 100,000(25)+150,000(23.33) = 2,500,000+3,500,000 = 6,000,000.",
    hint: "Unused budget.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Medical Supplies constraint at the optimum?",
    shortAnswer: "106.67 units (180 - 73.33 = 106.67).",
    explanation: "Medical used = 2(25)+1(23.33) = 50+23.33 = 73.33 units.",
    hint: "Unused medical supplies.",
    level: "moderate"
  },
  {
    question: "Is the Minimum X constraint binding at the optimum?",
    shortAnswer: "No, x₁ = 25 > 10, so the minimum is satisfied but not binding.",
    explanation: "Program X implementation exceeds the minimum requirement.",
    hint: "Minimum not tight.",
    level: "basic"
  },
  {
    question: "Is the Maximum Y constraint binding at the optimum?",
    shortAnswer: "No, x₂ = 23.33 < 30, so the maximum is not binding.",
    explanation: "Program Y is not at its maximum limit.",
    hint: "Maximum not tight.",
    level: "basic"
  },
  {
    question: "What is the social impact per unit of Program X?",
    shortAnswer: "500 QALYs.",
    explanation: "Program X generates 500 quality-adjusted life years per unit.",
    hint: "Program X impact.",
    level: "basic"
  },
  {
    question: "What is the social impact per unit of Program Y?",
    shortAnswer: "700 QALYs.",
    explanation: "Program Y generates 700 QALYs per unit.",
    hint: "Program Y impact.",
    level: "basic"
  },
  {
    question: "What does QALY stand for?",
    shortAnswer: "Quality-Adjusted Life Year.",
    explanation: "A measure of health benefit combining quantity and quality of life.",
    hint: "Health impact measure.",
    level: "basic"
  },
  {
    question: "What is a common mistake in social context problems?",
    shortAnswer: "Forgetting to include equity or coverage constraints (minimums).",
    explanation: "Social programs often have minimum coverage requirements to reach underserved populations.",
    hint: "Don't forget social equity.",
    level: "moderate"
  },
  {
    question: "What is the healthcare worker efficiency of Program X (QALYs per worker-month)?",
    shortAnswer: "250 QALYs (500 ÷ 2).",
    explanation: "Program X gives 250 QALYs per healthcare worker-month.",
    hint: "Impact divided by workers.",
    level: "moderate"
  },
  {
    question: "What is the healthcare worker efficiency of Program Y (QALYs per worker-month)?",
    shortAnswer: "233.33 QALYs (700 ÷ 3).",
    explanation: "Program Y gives 233.33 QALYs per healthcare worker-month.",
    hint: "Impact divided by workers.",
    level: "moderate"
  },
  {
    question: "Which program is more worker-efficient?",
    shortAnswer: "Program X (250 vs 233.33 QALYs per worker-month).",
    explanation: "Program X gives higher QALYs per healthcare worker.",
    hint: "Higher impact per worker.",
    level: "moderate"
  },
  {
    question: "What is the budget efficiency of Program X (QALYs per rupee)?",
    shortAnswer: "0.005 QALYs per rupee (500 ÷ 100,000).",
    explanation: "Program X gives 0.005 QALYs per rupee spent.",
    hint: "Impact divided by budget.",
    level: "moderate"
  },
  {
    question: "What is the budget efficiency of Program Y (QALYs per rupee)?",
    shortAnswer: "0.00467 QALYs per rupee (700 ÷ 150,000).",
    explanation: "Program Y gives 0.00467 QALYs per rupee spent.",
    hint: "Impact divided by budget.",
    level: "moderate"
  },
  {
    question: "Which program is more budget-efficient?",
    shortAnswer: "Program X (0.005 vs 0.00467 QALYs per rupee).",
    explanation: "Program X gives higher QALYs per rupee spent.",
    hint: "Higher impact per rupee.",
    level: "moderate"
  },
  {
    question: "If the budget increases, what happens to the optimal solution?",
    shortAnswer: "The optimal solution may change if budget becomes binding.",
    explanation: "More budget allows more programs, but other constraints may still limit.",
    hint: "More budget = more potential impact.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in social context problems?",
    shortAnswer: "To ensure program implementation quantities are non-negative.",
    explanation: "You cannot implement negative programs.",
    hint: "No negative implementation.",
    level: "basic"
  },
  {
    question: "What is the total healthcare workers used at the optimal solution?",
    shortAnswer: "120 person-months (fully used).",
    explanation: "Healthcare = 2(25)+3(23.33) = 50+70 = 120.",
    hint: "Total healthcare usage.",
    level: "moderate"
  },
  {
    question: "What is the total budget used at the optimal solution?",
    shortAnswer: "₹6,000,000 (60 lakh rupees).",
    explanation: "Budget = 100,000(25)+150,000(23.33) = 2,500,000+3,500,000 = 6,000,000.",
    hint: "Total budget usage.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of maximizing QALYs?",
    shortAnswer: "Maximizing the total health benefit from the programs.",
    explanation: "QALYs measure the health improvement from the interventions.",
    hint: "Maximizing health benefit.",
    level: "moderate"
  },
  {
    question: "If Program Y's impact increases to 800 QALYs, what happens?",
    shortAnswer: "The optimal solution shifts toward more Program Y, potentially increasing total impact.",
    explanation: "Higher impact makes Program Y more attractive.",
    hint: "Higher impact = more Y.",
    level: "expert"
  }
];

export default questions;