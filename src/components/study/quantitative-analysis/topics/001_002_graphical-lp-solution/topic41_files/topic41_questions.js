const questions = [
  {
    question: "What is the objective function in the minimum-cost production example?",
    shortAnswer: "Minimize C = 6x + 8y.",
    explanation: "Product X costs ₹6 per unit, Product Y costs ₹8 per unit.",
    hint: "C = 6x + 8y.",
    level: "basic",
    codeExample: "C = 6x + 8y"
  },
  {
    question: "What are the constraints in the minimum-cost production example?",
    shortAnswer: "2x+4y≤120, 3x+2y≤90, x≥20, y≥15.",
    explanation: "Labor, material, minimum X, minimum Y.",
    hint: "Labor, material, minimums.",
    level: "basic",
    codeExample: "2x+4y≤120, 3x+2y≤90, x≥20, y≥15."
  },
  {
    question: "What is the optimal solution?",
    shortAnswer: "x = 20, y = 15, C = 240.",
    explanation: "Produce exactly the minimum required quantities.",
    hint: "Optimal at (20,15).",
    level: "intermediate",
    codeExample: "(20,15) with C=240."
  },
  {
    question: "How much labor is used at the optimal solution?",
    shortAnswer: "100 hours, not fully used.",
    explanation: "2(20) + 4(15) = 40 + 60 = 100 hours.",
    hint: "100 hours used.",
    level: "intermediate",
    codeExample: "2(20)+4(15)=100."
  },
  {
    question: "What is the labor slack at the optimal solution?",
    shortAnswer: "20 hours (120 - 100 = 20).",
    explanation: "Labor is not fully used.",
    hint: "20 hours slack.",
    level: "intermediate",
    codeExample: "120 - 100 = 20."
  },
  {
    question: "How much material is used at the optimal solution?",
    shortAnswer: "90 units, fully used.",
    explanation: "3(20) + 2(15) = 60 + 30 = 90 units.",
    hint: "90 units used.",
    level: "intermediate",
    codeExample: "3(20)+2(15)=90."
  },
  {
    question: "What is the material slack at the optimal solution?",
    shortAnswer: "0 units (fully used).",
    explanation: "Material is fully used.",
    hint: "0 slack.",
    level: "intermediate",
    codeExample: "90 - 90 = 0."
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Material constraint (3x+2y=90) and both minimum constraints (x=20, y=15).",
    explanation: "Material is fully used, and both minimums are exactly met.",
    hint: "Material and minimums are binding.",
    level: "intermediate",
    codeExample: "3(20)+2(15)=90, x=20, y=15."
  },
  {
    question: "Which constraint has slack at the optimal solution?",
    shortAnswer: "Labor constraint (2x+4y≤120) has slack.",
    explanation: "Only 100 of 120 hours are used.",
    hint: "Labor has slack.",
    level: "intermediate",
    codeExample: "2(20)+4(15)=100 < 120."
  },
  {
    question: "What is the cost at (20,15)?",
    shortAnswer: "240.",
    explanation: "6(20) + 8(15) = 120 + 120 = 240.",
    hint: "C = 240.",
    level: "basic",
    codeExample: "(20,15) gives C=240."
  },
  {
    question: "What is the cost at (20,20)?",
    shortAnswer: "280.",
    explanation: "6(20) + 8(20) = 120 + 160 = 280.",
    hint: "C = 280.",
    level: "basic",
    codeExample: "(20,20) gives C=280."
  },
  {
    question: "Why isn't (20,20) feasible?",
    shortAnswer: "It violates the material constraint.",
    explanation: "3(20)+2(20)=60+40=100 > 90.",
    hint: "Material > 90.",
    level: "intermediate",
    codeExample: "3(20)+2(20)=100 > 90."
  },
  {
    question: "What is the cost at (24,18)?",
    shortAnswer: "288.",
    explanation: "6(24) + 8(18) = 144 + 144 = 288.",
    hint: "C = 288.",
    level: "basic",
    codeExample: "(24,18) gives C=288."
  },
  {
    question: "Why isn't (24,18) feasible?",
    shortAnswer: "It violates the material constraint.",
    explanation: "3(24)+2(18)=72+36=108 > 90.",
    hint: "Material > 90.",
    level: "intermediate",
    codeExample: "3(24)+2(18)=108 > 90."
  },
  {
    question: "What is the cost at (30,0)?",
    shortAnswer: "180.",
    explanation: "6(30) + 8(0) = 180.",
    hint: "C = 180.",
    level: "basic",
    codeExample: "(30,0) gives C=180."
  },
  {
    question: "Why isn't (30,0) feasible?",
    shortAnswer: "It violates the minimum Y requirement.",
    explanation: "y=0 < 15.",
    hint: "y < 15.",
    level: "intermediate",
    codeExample: "0 < 15."
  },
  {
    question: "What is the cost at (0,30)?",
    shortAnswer: "240.",
    explanation: "6(0) + 8(30) = 240.",
    hint: "C = 240.",
    level: "basic",
    codeExample: "(0,30) gives C=240."
  },
  {
    question: "Why isn't (0,30) feasible?",
    shortAnswer: "It violates the minimum X requirement.",
    explanation: "x=0 < 20.",
    hint: "x < 20.",
    level: "intermediate",
    codeExample: "0 < 20."
  },
  {
    question: "What is the labor per unit of Product X?",
    shortAnswer: "2 hours.",
    explanation: "Product X requires 2 labor hours per unit.",
    hint: "2 hours.",
    level: "basic",
    codeExample: "X: 2 labor."
  },
  {
    question: "What is the labor per unit of Product Y?",
    shortAnswer: "4 hours.",
    explanation: "Product Y requires 4 labor hours per unit.",
    hint: "4 hours.",
    level: "basic",
    codeExample: "Y: 4 labor."
  },
  {
    question: "What is the material per unit of Product X?",
    shortAnswer: "3 units.",
    explanation: "Product X requires 3 units of material per unit.",
    hint: "3 units.",
    level: "basic",
    codeExample: "X: 3 material."
  },
  {
    question: "What is the material per unit of Product Y?",
    shortAnswer: "2 units.",
    explanation: "Product Y requires 2 units of material per unit.",
    hint: "2 units.",
    level: "basic",
    codeExample: "Y: 2 material."
  },
  {
    question: "What is the total labor available?",
    shortAnswer: "120 hours.",
    explanation: "The factory has 120 labor hours available.",
    hint: "120 hours.",
    level: "basic",
    codeExample: "Labor = 120."
  },
  {
    question: "What is the total material available?",
    shortAnswer: "90 units.",
    explanation: "The factory has 90 units of material available.",
    hint: "90 units.",
    level: "basic",
    codeExample: "Material = 90."
  },
  {
    question: "What is the cost per unit of Product X?",
    shortAnswer: "₹6.",
    explanation: "Product X costs ₹6 per unit.",
    hint: "₹6.",
    level: "basic",
    codeExample: "Cost of X = ₹6."
  },
  {
    question: "What is the cost per unit of Product Y?",
    shortAnswer: "₹8.",
    explanation: "Product Y costs ₹8 per unit.",
    hint: "₹8.",
    level: "basic",
    codeExample: "Cost of Y = ₹8."
  },
  {
    question: "What is the minimum Product X requirement?",
    shortAnswer: "20 units.",
    explanation: "The company must produce at least 20 units of X.",
    hint: "x ≥ 20.",
    level: "basic",
    codeExample: "x ≥ 20."
  },
  {
    question: "What is the minimum Product Y requirement?",
    shortAnswer: "15 units.",
    explanation: "The company must produce at least 15 units of Y.",
    hint: "y ≥ 15.",
    level: "basic",
    codeExample: "y ≥ 15."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "Not all corner points are feasible — check all constraints.",
    explanation: "Only one corner point satisfied all constraints.",
    hint: "Check feasibility.",
    level: "basic",
    codeExample: "Only feasible corner points can be optimal."
  },
  {
    question: "What is the minimum cost?",
    shortAnswer: "240.",
    explanation: "The minimum cost is 240 at (20,15).",
    hint: "C = 240.",
    level: "basic",
    codeExample: "Min Cost = 240."
  },
  {
    question: "What is the labor constraint at the optimal solution?",
    shortAnswer: "2(20) + 4(15) = 100 < 120, not binding.",
    explanation: "Labor has slack of 20 hours.",
    hint: "Not binding.",
    level: "intermediate",
    codeExample: "2(20)+4(15)=100 < 120."
  }
];

export default questions;