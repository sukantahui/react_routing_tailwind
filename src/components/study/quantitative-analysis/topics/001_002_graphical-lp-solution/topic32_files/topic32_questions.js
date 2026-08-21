const questions = [
  {
    question: "What is the objective function in the resource allocation example?",
    shortAnswer: "Maximize Z = 6x + 8y.",
    explanation: "Product X gives ₹6 profit, Product Y gives ₹8 profit.",
    hint: "Z = 6x + 8y.",
    level: "basic",
    codeExample: "Z = 6x + 8y."
  },
  {
    question: "What are the constraints in the resource allocation example?",
    shortAnswer: "2x + 4y ≤ 40 (machine) and 3x + 2y ≤ 30 (material).",
    explanation: "Machine: 2 hours per X, 4 hours per Y, 40 available. Material: 3 units per X, 2 per Y, 30 available.",
    hint: "Machine and material constraints.",
    level: "basic",
    codeExample: "2x+4y≤40, 3x+2y≤30."
  },
  {
    question: "What is the optimal solution?",
    shortAnswer: "x = 5, y = 7.5, Z = 90.",
    explanation: "Producing 5 units of X and 7.5 units of Y gives the maximum profit of ₹90.",
    hint: "Optimal at (5,7.5).",
    level: "intermediate",
    codeExample: "(5,7.5) with Z = 90."
  },
  {
    question: "What is the profit at (10,0)?",
    shortAnswer: "Z = 60.",
    explanation: "At (10,0), Z = 6(10) + 8(0) = 60.",
    hint: "Z = 60.",
    level: "basic",
    codeExample: "(10,0) gives Z = 60."
  },
  {
    question: "What is the profit at (0,10)?",
    shortAnswer: "Z = 80.",
    explanation: "At (0,10), Z = 6(0) + 8(10) = 80.",
    hint: "Z = 80.",
    level: "basic",
    codeExample: "(0,10) gives Z = 80."
  },
  {
    question: "What is the profit at (5,7.5)?",
    shortAnswer: "Z = 90.",
    explanation: "At (5,7.5), Z = 6(5) + 8(7.5) = 30 + 60 = 90.",
    hint: "Z = 90.",
    level: "basic",
    codeExample: "(5,7.5) gives Z = 90."
  },
  {
    question: "How many machine hours are used at the optimal solution?",
    shortAnswer: "2(5) + 4(7.5) = 10 + 30 = 40 hours, fully used.",
    explanation: "All machine hours are used at the optimal solution.",
    hint: "40 hours used.",
    level: "intermediate",
    codeExample: "2(5)+4(7.5)=40."
  },
  {
    question: "How many raw material units are used at the optimal solution?",
    shortAnswer: "3(5) + 2(7.5) = 15 + 15 = 30 units, fully used.",
    explanation: "All raw material is used at the optimal solution.",
    hint: "30 units used.",
    level: "intermediate",
    codeExample: "3(5)+2(7.5)=30."
  },
  {
    question: "What are the corner points of the feasible region?",
    shortAnswer: "O(0,0), A(10,0), B(5,7.5), C(0,10).",
    explanation: "These are the vertices of the feasible region.",
    hint: "Four corner points.",
    level: "intermediate",
    codeExample: "O(0,0), A(10,0), B(5,7.5), C(0,10)."
  },
  {
    question: "What is the machine hours per unit for Product X?",
    shortAnswer: "2 hours per unit.",
    explanation: "Product X requires 2 machine hours per unit.",
    hint: "2 hours.",
    level: "basic",
    codeExample: "X: 2 machine hours."
  },
  {
    question: "What is the machine hours per unit for Product Y?",
    shortAnswer: "4 hours per unit.",
    explanation: "Product Y requires 4 machine hours per unit.",
    hint: "4 hours.",
    level: "basic",
    codeExample: "Y: 4 machine hours."
  },
  {
    question: "What is the raw material per unit for Product X?",
    shortAnswer: "3 units per unit.",
    explanation: "Product X requires 3 units of raw material per unit.",
    hint: "3 units.",
    level: "basic",
    codeExample: "X: 3 raw material."
  },
  {
    question: "What is the raw material per unit for Product Y?",
    shortAnswer: "2 units per unit.",
    explanation: "Product Y requires 2 units of raw material per unit.",
    hint: "2 units.",
    level: "basic",
    codeExample: "Y: 2 raw material."
  },
  {
    question: "What is the total machine hours available?",
    shortAnswer: "40 hours.",
    explanation: "The factory has 40 machine hours available.",
    hint: "40 hours.",
    level: "basic",
    codeExample: "Machine = 40."
  },
  {
    question: "What is the total raw material available?",
    shortAnswer: "30 units.",
    explanation: "The factory has 30 units of raw material available.",
    hint: "30 units.",
    level: "basic",
    codeExample: "Material = 30."
  },
  {
    question: "What is the profit per unit of Product X?",
    shortAnswer: "₹6 per unit.",
    explanation: "Each unit of Product X gives a profit of ₹6.",
    hint: "₹6.",
    level: "basic",
    codeExample: "Profit per X = ₹6."
  },
  {
    question: "What is the profit per unit of Product Y?",
    shortAnswer: "₹8 per unit.",
    explanation: "Each unit of Product Y gives a profit of ₹8.",
    hint: "₹8.",
    level: "basic",
    codeExample: "Profit per Y = ₹8."
  },
  {
    question: "Which product is more profitable per unit?",
    shortAnswer: "Product Y (₹8 vs ₹6 for X).",
    explanation: "Product Y gives higher profit per unit.",
    hint: "Y is more profitable.",
    level: "basic",
    codeExample: "Y: ₹8, X: ₹6."
  },
  {
    question: "Why isn't the optimal solution all Product Y?",
    shortAnswer: "Because Product Y uses more machine hours (4 vs 2), limiting production.",
    explanation: "With 40 machine hours, you can only make 10 units of Y (profit 80), less than the optimal 90.",
    hint: "Machine hours limit Y.",
    level: "intermediate",
    codeExample: "10 Y gives Z=80."
  },
  {
    question: "Why isn't the optimal solution all Product X?",
    shortAnswer: "Because Product X gives lower profit per unit.",
    explanation: "With 30 raw material, you can make 10 units of X (profit 60), less than the optimal 90.",
    hint: "Lower profit per unit.",
    level: "intermediate",
    codeExample: "10 X gives Z=60."
  },
  {
    question: "What is the trade-off between Products X and Y?",
    shortAnswer: "Product Y is more profitable but uses more machine hours.",
    explanation: "Y: ₹8 profit, 4 machine hours; X: ₹6 profit, 2 machine hours.",
    hint: "Profit vs machine hours.",
    level: "intermediate",
    codeExample: "Y: more profit, more machine hours."
  },
  {
    question: "What happens if machine hours increase to 50?",
    shortAnswer: "The optimal solution would likely change.",
    explanation: "With more machine hours, the factory could produce more Y.",
    hint: "More machine → more Y.",
    level: "intermediate",
    codeExample: "If machine = 50, new optimum may be different."
  },
  {
    question: "What happens if raw material increases to 40?",
    shortAnswer: "The optimal solution would change.",
    explanation: "With more raw material, the factory could produce more X.",
    hint: "More material → more X.",
    level: "intermediate",
    codeExample: "If material = 40, new optimum may be different."
  },
  {
    question: "What is the maximum profit?",
    shortAnswer: "₹90.",
    explanation: "The maximum profit is ₹90 at (5,7.5).",
    hint: "₹90.",
    level: "basic",
    codeExample: "Z = 90."
  },
  {
    question: "Are both constraints binding at the optimal solution?",
    shortAnswer: "Yes, both machine and material constraints are binding.",
    explanation: "At (5,7.5), machine: 40/40 used, material: 30/30 used.",
    hint: "Both are fully used.",
    level: "intermediate",
    codeExample: "Machine=40, Material=30."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "The optimal resource allocation balances both constraints.",
    explanation: "Even though Product Y is more profitable, the machine hour constraint limits production.",
    hint: "Balance resources.",
    level: "basic",
    codeExample: "Optimal allocation balances machine and material."
  },
  {
    question: "What is the shadow price of machine hours?",
    shortAnswer: "The amount profit increases with one more machine hour.",
    explanation: "Shadow price tells the value of an additional machine hour.",
    hint: "Value of extra machine hour.",
    level: "expert",
    codeExample: "Shadow price of machine = 0.5 (in this example)."
  },
  {
    question: "What is the shadow price of raw material?",
    shortAnswer: "The amount profit increases with one more unit of raw material.",
    explanation: "Shadow price tells the value of an additional raw material unit.",
    hint: "Value of extra material.",
    level: "expert",
    codeExample: "Shadow price of material = 1.5 (in this example)."
  },
  {
    question: "What is the machine constraint at the optimal solution?",
    shortAnswer: "2(5) + 4(7.5) = 40, fully used.",
    explanation: "All machine hours are used at (5,7.5).",
    hint: "40 hours.",
    level: "intermediate",
    codeExample: "2(5)+4(7.5)=40."
  },
  {
    question: "What is the material constraint at the optimal solution?",
    shortAnswer: "3(5) + 2(7.5) = 30, fully used.",
    explanation: "All raw material is used at (5,7.5).",
    hint: "30 units.",
    level: "intermediate",
    codeExample: "3(5)+2(7.5)=30."
  }
];

export default questions;