const questions = [
  {
    question: "What is the objective function in the diet example?",
    shortAnswer: "Minimize C = 4x + 3y.",
    explanation: "Food A costs ₹4 per serving, Food B costs ₹3 per serving.",
    hint: "C = 4x + 3y.",
    level: "basic",
    codeExample: "C = 4x + 3y"
  },
  {
    question: "What are the constraints in the diet example?",
    shortAnswer: "20x+10y≥100 (protein), 10x+30y≥120 (carbs).",
    explanation: "Protein requirement: at least 100 units. Carbohydrate requirement: at least 120 units.",
    hint: "Protein and carbs.",
    level: "basic",
    codeExample: "20x+10y≥100, 10x+30y≥120."
  },
  {
    question: "What are the simplified constraints?",
    shortAnswer: "2x + y ≥ 10 (protein), x + 3y ≥ 12 (carbs).",
    explanation: "Divide protein by 10, carbs by 10.",
    hint: "2x+y≥10, x+3y≥12.",
    level: "intermediate",
    codeExample: "2x+y≥10, x+3y≥12."
  },
  {
    question: "What is the optimal solution?",
    shortAnswer: "x = 3, y = 4, C = 24.",
    explanation: "Use 3 servings of Food A and 4 servings of Food B.",
    hint: "Optimal at (3,4).",
    level: "intermediate",
    codeExample: "(3,4) with C=24."
  },
  {
    question: "How much protein does the optimal solution provide?",
    shortAnswer: "100 units exactly.",
    explanation: "20(3) + 10(4) = 60 + 40 = 100 units.",
    hint: "100 units.",
    level: "intermediate",
    codeExample: "20(3)+10(4)=100."
  },
  {
    question: "How much carbohydrate does the optimal solution provide?",
    shortAnswer: "150 units.",
    explanation: "10(3) + 30(4) = 30 + 120 = 150 units.",
    hint: "150 units.",
    level: "intermediate",
    codeExample: "10(3)+30(4)=150."
  },
  {
    question: "Which constraint is binding at the optimal solution?",
    shortAnswer: "The protein constraint (2x + y = 10) is binding.",
    explanation: "Protein requirement is exactly met: 2(3)+4=10.",
    hint: "Protein is binding.",
    level: "intermediate",
    codeExample: "2(3)+4=10."
  },
  {
    question: "Which constraint has slack at the optimal solution?",
    shortAnswer: "The carbohydrate constraint has slack.",
    explanation: "150 ≥ 120, so there is 30 units of slack.",
    hint: "Carbs have slack.",
    level: "intermediate",
    codeExample: "10(3)+30(4)=150 > 120."
  },
  {
    question: "What is the cost at (0,10)?",
    shortAnswer: "30.",
    explanation: "4(0) + 3(10) = 30.",
    hint: "C = 30.",
    level: "basic",
    codeExample: "(0,10) gives C=30."
  },
  {
    question: "What is the cost at (3,4)?",
    shortAnswer: "24.",
    explanation: "4(3) + 3(4) = 12 + 12 = 24.",
    hint: "C = 24.",
    level: "basic",
    codeExample: "(3,4) gives C=24."
  },
  {
    question: "What is the cost at (5,0)?",
    shortAnswer: "20.",
    explanation: "4(5) + 3(0) = 20.",
    hint: "C = 20.",
    level: "basic",
    codeExample: "(5,0) gives C=20."
  },
  {
    question: "Why isn't (5,0) feasible?",
    shortAnswer: "It violates the carbohydrate requirement.",
    explanation: "At (5,0), carbs = 10(5)+30(0)=50 < 120.",
    hint: "Carbs < 120.",
    level: "intermediate",
    codeExample: "10(5)+30(0)=50 < 120."
  },
  {
    question: "What is the protein per serving of Food A?",
    shortAnswer: "20 units.",
    explanation: "Food A provides 20 units of protein per serving.",
    hint: "20 units.",
    level: "basic",
    codeExample: "A: 20 protein."
  },
  {
    question: "What is the protein per serving of Food B?",
    shortAnswer: "10 units.",
    explanation: "Food B provides 10 units of protein per serving.",
    hint: "10 units.",
    level: "basic",
    codeExample: "B: 10 protein."
  },
  {
    question: "What is the carbohydrate per serving of Food A?",
    shortAnswer: "10 units.",
    explanation: "Food A provides 10 units of carbohydrates per serving.",
    hint: "10 units.",
    level: "basic",
    codeExample: "A: 10 carbs."
  },
  {
    question: "What is the carbohydrate per serving of Food B?",
    shortAnswer: "30 units.",
    explanation: "Food B provides 30 units of carbohydrates per serving.",
    hint: "30 units.",
    level: "basic",
    codeExample: "B: 30 carbs."
  },
  {
    question: "What is the cost per serving of Food A?",
    shortAnswer: "₹4.",
    explanation: "Food A costs ₹4 per serving.",
    hint: "₹4.",
    level: "basic",
    codeExample: "A: ₹4."
  },
  {
    question: "What is the cost per serving of Food B?",
    shortAnswer: "₹3.",
    explanation: "Food B costs ₹3 per serving.",
    hint: "₹3.",
    level: "basic",
    codeExample: "B: ₹3."
  },
  {
    question: "Which food is cheaper?",
    shortAnswer: "Food B (₹3 vs ₹4 for A).",
    explanation: "Food B is cheaper per serving.",
    hint: "B is cheaper.",
    level: "basic",
    codeExample: "B: ₹3, A: ₹4."
  },
  {
    question: "Which food has more protein per serving?",
    shortAnswer: "Food A (20 vs 10 for B).",
    explanation: "Food A has more protein.",
    hint: "A has more protein.",
    level: "basic",
    codeExample: "A: 20, B: 10."
  },
  {
    question: "Which food has more carbs per serving?",
    shortAnswer: "Food B (30 vs 10 for A).",
    explanation: "Food B has more carbohydrates.",
    hint: "B has more carbs.",
    level: "basic",
    codeExample: "B: 30, A: 10."
  },
  {
    question: "What is the trade-off between the two foods?",
    shortAnswer: "Food A has more protein; Food B is cheaper and has more carbs.",
    explanation: "A: more protein, more expensive; B: cheaper, more carbs.",
    hint: "Protein vs cost/carbs.",
    level: "intermediate",
    codeExample: "A: protein; B: cheaper/carbs."
  },
  {
    question: "What is the minimum protein requirement?",
    shortAnswer: "100 units.",
    explanation: "The meal must provide at least 100 units of protein.",
    hint: "100 units.",
    level: "basic",
    codeExample: "Protein ≥ 100."
  },
  {
    question: "What is the minimum carbohydrate requirement?",
    shortAnswer: "120 units.",
    explanation: "The meal must provide at least 120 units of carbohydrates.",
    hint: "120 units.",
    level: "basic",
    codeExample: "Carbs ≥ 120."
  },
  {
    question: "What is the protein at (3,4)?",
    shortAnswer: "100 units exactly.",
    explanation: "20(3) + 10(4) = 60 + 40 = 100.",
    hint: "100 units.",
    level: "intermediate",
    codeExample: "20(3)+10(4)=100."
  },
  {
    question: "What is the carbohydrate at (3,4)?",
    shortAnswer: "150 units.",
    explanation: "10(3) + 30(4) = 30 + 120 = 150.",
    hint: "150 units.",
    level: "intermediate",
    codeExample: "10(3)+30(4)=150."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "In diet problems, not all nutritional constraints need to bind.",
    explanation: "Only the protein constraint is binding; carbs have slack.",
    hint: "Not all constraints bind.",
    level: "basic",
    codeExample: "Protein binds, carbs have slack."
  },
  {
    question: "What is the carbohydrate slack at the optimal solution?",
    shortAnswer: "30 units (150 - 120 = 30).",
    explanation: "The optimal solution provides 150 carbs, 30 more than required.",
    hint: "30 units slack.",
    level: "intermediate",
    codeExample: "150 - 120 = 30."
  },
  {
    question: "What happens if the protein requirement increases to 110?",
    shortAnswer: "The optimal solution would change, requiring more Food A.",
    explanation: "Higher protein requirement needs more of the protein-rich food.",
    hint: "More A needed.",
    level: "intermediate",
    codeExample: "If protein ≥ 110, new optimum may be different."
  },
  {
    question: "What is the minimum cost?",
    shortAnswer: "24.",
    explanation: "The minimum cost is 24 at (3,4).",
    hint: "C = 24.",
    level: "basic",
    codeExample: "Min Cost = 24."
  },
  {
    question: "What is the protein constraint at the optimal solution?",
    shortAnswer: "2(3) + 4 = 10, exactly met.",
    explanation: "The protein constraint is binding.",
    hint: "10 = 10.",
    level: "intermediate",
    codeExample: "2(3)+4=10."
  }
];

export default questions;