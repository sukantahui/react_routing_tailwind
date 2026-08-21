const questions = [
  {
    question: "What is the objective function in the agricultural example?",
    shortAnswer: "Maximize Z = 5000x + 6000y.",
    explanation: "Wheat gives ₹5,000 profit per hectare, Corn gives ₹6,000 profit per hectare.",
    hint: "Z = 5000x + 6000y.",
    level: "basic",
    codeExample: "Z = 5000x + 6000y"
  },
  {
    question: "What are the constraints in the agricultural example?",
    shortAnswer: "x+y≤100, 2x+3y≤240, 3x+2y≤240, y≥20.",
    explanation: "Land, labor, water, and corn requirement constraints.",
    hint: "Land, labor, water, corn.",
    level: "basic",
    codeExample: "x+y≤100, 2x+3y≤240, 3x+2y≤240, y≥20."
  },
  {
    question: "What is the optimal solution?",
    shortAnswer: "x = 48, y = 48, Z = 528,000.",
    explanation: "Plant 48 hectares of Wheat and 48 hectares of Corn.",
    hint: "Optimal at (48, 48).",
    level: "intermediate",
    codeExample: "(48,48) with Z=528000."
  },
  {
    question: "How much labor is used at the optimal solution?",
    shortAnswer: "240 hours, fully used.",
    explanation: "2(48) + 3(48) = 96 + 144 = 240 hours.",
    hint: "240 hours used.",
    level: "intermediate",
    codeExample: "2(48)+3(48)=240."
  },
  {
    question: "How much water is used at the optimal solution?",
    shortAnswer: "240 units, fully used.",
    explanation: "3(48) + 2(48) = 144 + 96 = 240 units.",
    hint: "240 units used.",
    level: "intermediate",
    codeExample: "3(48)+2(48)=240."
  },
  {
    question: "How much land is used at the optimal solution?",
    shortAnswer: "96 hectares, 4 hectares unused.",
    explanation: "48 + 48 = 96 hectares, leaving 4 hectares unused.",
    hint: "96 hectares used.",
    level: "intermediate",
    codeExample: "48+48=96 ≤ 100."
  },
  {
    question: "What is the profit at (40,20)?",
    shortAnswer: "₹3,20,000.",
    explanation: "5000(40) + 6000(20) = 200000 + 120000 = 320000.",
    hint: "Z = 320,000.",
    level: "basic",
    codeExample: "(40,20) gives Z=320000."
  },
  {
    question: "What is the profit at (60,20)?",
    shortAnswer: "₹4,20,000.",
    explanation: "5000(60) + 6000(20) = 300000 + 120000 = 420000.",
    hint: "Z = 420,000.",
    level: "basic",
    codeExample: "(60,20) gives Z=420000."
  },
  {
    question: "What is the profit at (48,48)?",
    shortAnswer: "₹5,28,000.",
    explanation: "5000(48) + 6000(48) = 240000 + 288000 = 528000.",
    hint: "Z = 528,000.",
    level: "basic",
    codeExample: "(48,48) gives Z=528000."
  },
  {
    question: "What is the profit at (20,60)?",
    shortAnswer: "₹4,60,000.",
    explanation: "5000(20) + 6000(60) = 100000 + 360000 = 460000.",
    hint: "Z = 460,000.",
    level: "basic",
    codeExample: "(20,60) gives Z=460000."
  },
  {
    question: "What is the profit at (0,80)?",
    shortAnswer: "₹4,80,000.",
    explanation: "5000(0) + 6000(80) = 480000.",
    hint: "Z = 480,000.",
    level: "basic",
    codeExample: "(0,80) gives Z=480000."
  },
  {
    question: "What is the labor per hectare for Wheat?",
    shortAnswer: "2 hours per hectare.",
    explanation: "Wheat requires 2 hours of labor per hectare.",
    hint: "2 hours.",
    level: "basic",
    codeExample: "Wheat: 2 labor."
  },
  {
    question: "What is the labor per hectare for Corn?",
    shortAnswer: "3 hours per hectare.",
    explanation: "Corn requires 3 hours of labor per hectare.",
    hint: "3 hours.",
    level: "basic",
    codeExample: "Corn: 3 labor."
  },
  {
    question: "What is the water per hectare for Wheat?",
    shortAnswer: "3 units per hectare.",
    explanation: "Wheat requires 3 units of water per hectare.",
    hint: "3 units.",
    level: "basic",
    codeExample: "Wheat: 3 water."
  },
  {
    question: "What is the water per hectare for Corn?",
    shortAnswer: "2 units per hectare.",
    explanation: "Corn requires 2 units of water per hectare.",
    hint: "2 units.",
    level: "basic",
    codeExample: "Corn: 2 water."
  },
  {
    question: "What is the total land available?",
    shortAnswer: "100 hectares.",
    explanation: "The farmer has 100 hectares of land.",
    hint: "100 hectares.",
    level: "basic",
    codeExample: "Land = 100."
  },
  {
    question: "What is the total labor available?",
    shortAnswer: "240 hours.",
    explanation: "The farmer has 240 hours of labor available.",
    hint: "240 hours.",
    level: "basic",
    codeExample: "Labor = 240."
  },
  {
    question: "What is the total water available?",
    shortAnswer: "240 units.",
    explanation: "The farmer has 240 units of water available.",
    hint: "240 units.",
    level: "basic",
    codeExample: "Water = 240."
  },
  {
    question: "What is the profit per hectare for Wheat?",
    shortAnswer: "₹5,000 per hectare.",
    explanation: "Wheat gives ₹5,000 profit per hectare.",
    hint: "₹5,000.",
    level: "basic",
    codeExample: "Wheat: ₹5,000/ha."
  },
  {
    question: "What is the profit per hectare for Corn?",
    shortAnswer: "₹6,000 per hectare.",
    explanation: "Corn gives ₹6,000 profit per hectare.",
    hint: "₹6,000.",
    level: "basic",
    codeExample: "Corn: ₹6,000/ha."
  },
  {
    question: "Which crop is more profitable per hectare?",
    shortAnswer: "Corn (₹6,000 vs ₹5,000 for Wheat).",
    explanation: "Corn gives higher profit per hectare.",
    hint: "Corn is more profitable.",
    level: "basic",
    codeExample: "Corn: ₹6,000, Wheat: ₹5,000."
  },
  {
    question: "Why isn't the optimal solution all Corn?",
    shortAnswer: "Corn uses more labor and water per hectare.",
    explanation: "Corn requires 3 labor and 2 water, limiting production.",
    hint: "Corn uses more resources.",
    level: "intermediate",
    codeExample: "Corn: 3 labor, 2 water."
  },
  {
    question: "Why isn't the optimal solution all Wheat?",
    shortAnswer: "Wheat gives lower profit per hectare.",
    explanation: "Wheat is less profitable than Corn.",
    hint: "Lower profit.",
    level: "intermediate",
    codeExample: "Wheat: ₹5,000 vs Corn: ₹6,000."
  },
  {
    question: "What is the minimum corn requirement?",
    shortAnswer: "At least 20 hectares (y ≥ 20).",
    explanation: "The farmer must plant at least 20 hectares of Corn.",
    hint: "y ≥ 20.",
    level: "basic",
    codeExample: "y ≥ 20."
  },
  {
    question: "Is the corn requirement binding at the optimum?",
    shortAnswer: "No, y = 48 > 20.",
    explanation: "The corn requirement is not binding because the farmer plants 48 hectares, well above the minimum.",
    hint: "Not binding.",
    level: "intermediate",
    codeExample: "48 ≥ 20."
  },
  {
    question: "What is the maximum profit?",
    shortAnswer: "₹5,28,000.",
    explanation: "The maximum profit is ₹5,28,000 at (48,48).",
    hint: "₹5,28,000.",
    level: "basic",
    codeExample: "Z = 528000."
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Labor and water constraints are binding.",
    explanation: "Labor: 240/240 used, Water: 240/240 used. Land: 96/100 used (not binding).",
    hint: "Labor and water are binding.",
    level: "intermediate",
    codeExample: "Labor=240, Water=240, Land=96<100."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "Land is not always the limiting factor in agriculture.",
    explanation: "Labor and water can be the real constraints that limit production.",
    hint: "Labor and water matter.",
    level: "basic",
    codeExample: "Sometimes land is abundant."
  },
  {
    question: "What is the labor constraint at the optimal solution?",
    shortAnswer: "2(48) + 3(48) = 240, fully used.",
    explanation: "All labor hours are used at (48,48).",
    hint: "240 hours.",
    level: "intermediate",
    codeExample: "2(48)+3(48)=240."
  },
  {
    question: "What is the water constraint at the optimal solution?",
    shortAnswer: "3(48) + 2(48) = 240, fully used.",
    explanation: "All water units are used at (48,48).",
    hint: "240 units.",
    level: "intermediate",
    codeExample: "3(48)+2(48)=240."
  },
  {
    question: "What happens if the farmer gets more water?",
    shortAnswer: "The optimal solution would likely change, producing more Corn.",
    explanation: "With more water, the farmer could produce more of the profitable Corn.",
    hint: "More water → more Corn.",
    level: "intermediate",
    codeExample: "If water = 260, new optimum may be different."
  }
];

export default questions;