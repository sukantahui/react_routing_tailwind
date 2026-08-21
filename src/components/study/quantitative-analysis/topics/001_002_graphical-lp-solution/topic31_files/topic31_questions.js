const questions = [
  {
    question: "What is the objective function in the bakery example?",
    shortAnswer: "Maximize Z = 10x + 15y.",
    explanation: "Chocolate cakes give ₹10 profit, vanilla cakes give ₹15 profit.",
    hint: "Z = 10x + 15y.",
    level: "basic",
    codeExample: "Z = 10x + 15y."
  },
  {
    question: "What are the constraints in the bakery example?",
    shortAnswer: "3x + 2y ≤ 24 (flour) and 2x + 4y ≤ 24 (eggs).",
    explanation: "Flour: 3 cups per chocolate, 2 cups per vanilla, 24 available. Eggs: 2 per chocolate, 4 per vanilla, 24 available.",
    hint: "Flour and eggs constraints.",
    level: "basic",
    codeExample: "3x+2y≤24, 2x+4y≤24."
  },
  {
    question: "What is the optimal solution in the bakery example?",
    shortAnswer: "x = 6 chocolate cakes, y = 3 vanilla cakes, Z = 105.",
    explanation: "Producing 6 chocolate and 3 vanilla cakes gives the maximum profit of ₹105.",
    hint: "Optimal at (6,3).",
    level: "intermediate",
    codeExample: "(6,3) with Z = 105."
  },
  {
    question: "What is the profit at (8,0)?",
    shortAnswer: "Z = 80.",
    explanation: "At (8,0), Z = 10(8) + 15(0) = 80.",
    hint: "Z = 80.",
    level: "basic",
    codeExample: "(8,0) gives Z = 80."
  },
  {
    question: "What is the profit at (0,6)?",
    shortAnswer: "Z = 90.",
    explanation: "At (0,6), Z = 10(0) + 15(6) = 90.",
    hint: "Z = 90.",
    level: "basic",
    codeExample: "(0,6) gives Z = 90."
  },
  {
    question: "What is the profit at (6,3)?",
    shortAnswer: "Z = 105.",
    explanation: "At (6,3), Z = 10(6) + 15(3) = 60 + 45 = 105.",
    hint: "Z = 105.",
    level: "basic",
    codeExample: "(6,3) gives Z = 105."
  },
  {
    question: "How much flour is used at the optimal solution?",
    shortAnswer: "3(6) + 2(3) = 18 + 6 = 24 cups, fully used.",
    explanation: "All flour is used at the optimal solution.",
    hint: "24 cups used.",
    level: "intermediate",
    codeExample: "3(6)+2(3)=24."
  },
  {
    question: "How many eggs are used at the optimal solution?",
    shortAnswer: "2(6) + 4(3) = 12 + 12 = 24 eggs, fully used.",
    explanation: "All eggs are used at the optimal solution.",
    hint: "24 eggs used.",
    level: "intermediate",
    codeExample: "2(6)+4(3)=24."
  },
  {
    question: "Why is (4,6) not the optimal solution?",
    shortAnswer: "It violates the eggs constraint (2(4)+4(6)=32 > 24).",
    explanation: "Even though it gives higher profit (130), it's not feasible because it requires too many eggs.",
    hint: "Violates eggs constraint.",
    level: "intermediate",
    codeExample: "2(4)+4(6)=32 > 24."
  },
  {
    question: "What is the flour constraint at (6,3)?",
    shortAnswer: "3(6) + 2(3) = 24, fully used.",
    explanation: "All flour is used at (6,3).",
    hint: "24 cups.",
    level: "intermediate",
    codeExample: "3(6)+2(3)=24."
  },
  {
    question: "What is the eggs constraint at (6,3)?",
    shortAnswer: "2(6) + 4(3) = 24, fully used.",
    explanation: "All eggs are used at (6,3).",
    hint: "24 eggs.",
    level: "intermediate",
    codeExample: "2(6)+4(3)=24."
  },
  {
    question: "What are the corner points of the feasible region?",
    shortAnswer: "O(0,0), A(8,0), B(6,3), C(0,6).",
    explanation: "These are the vertices of the feasible region.",
    hint: "Four corner points.",
    level: "intermediate",
    codeExample: "O(0,0), A(8,0), B(6,3), C(0,6)."
  },
  {
    question: "What is the flour per unit for chocolate cake?",
    shortAnswer: "3 cups per chocolate cake.",
    explanation: "Each chocolate cake requires 3 cups of flour.",
    hint: "3 cups.",
    level: "basic",
    codeExample: "Chocolate: 3 flour."
  },
  {
    question: "What is the flour per unit for vanilla cake?",
    shortAnswer: "2 cups per vanilla cake.",
    explanation: "Each vanilla cake requires 2 cups of flour.",
    hint: "2 cups.",
    level: "basic",
    codeExample: "Vanilla: 2 flour."
  },
  {
    question: "What is the eggs per unit for chocolate cake?",
    shortAnswer: "2 eggs per chocolate cake.",
    explanation: "Each chocolate cake requires 2 eggs.",
    hint: "2 eggs.",
    level: "basic",
    codeExample: "Chocolate: 2 eggs."
  },
  {
    question: "What is the eggs per unit for vanilla cake?",
    shortAnswer: "4 eggs per vanilla cake.",
    explanation: "Each vanilla cake requires 4 eggs.",
    hint: "4 eggs.",
    level: "basic",
    codeExample: "Vanilla: 4 eggs."
  },
  {
    question: "What is the total flour available?",
    shortAnswer: "24 cups.",
    explanation: "The bakery has 24 cups of flour available.",
    hint: "24 cups.",
    level: "basic",
    codeExample: "Flour = 24."
  },
  {
    question: "What is the total eggs available?",
    shortAnswer: "24 eggs.",
    explanation: "The bakery has 24 eggs available.",
    hint: "24 eggs.",
    level: "basic",
    codeExample: "Eggs = 24."
  },
  {
    question: "What is the profit per chocolate cake?",
    shortAnswer: "₹10 per cake.",
    explanation: "Each chocolate cake gives a profit of ₹10.",
    hint: "₹10.",
    level: "basic",
    codeExample: "Profit per chocolate = ₹10."
  },
  {
    question: "What is the profit per vanilla cake?",
    shortAnswer: "₹15 per cake.",
    explanation: "Each vanilla cake gives a profit of ₹15.",
    hint: "₹15.",
    level: "basic",
    codeExample: "Profit per vanilla = ₹15."
  },
  {
    question: "Which product is more profitable per unit?",
    shortAnswer: "Vanilla cake (₹15 vs ₹10 for chocolate).",
    explanation: "Vanilla cakes give higher profit per unit.",
    hint: "Vanilla is more profitable.",
    level: "basic",
    codeExample: "Vanilla: ₹15, Chocolate: ₹10."
  },
  {
    question: "Why isn't the optimal solution all vanilla cakes?",
    shortAnswer: "Because vanilla cakes use more eggs (4 vs 2), limiting production.",
    explanation: "With 24 eggs, you can only make 6 vanilla cakes (profit 90), which is less than the optimal 105.",
    hint: "Eggs limit vanilla production.",
    level: "intermediate",
    codeExample: "6 vanilla cakes gives Z=90."
  },
  {
    question: "Why isn't the optimal solution all chocolate cakes?",
    shortAnswer: "Because chocolate cakes give lower profit per unit.",
    explanation: "With 24 flour, you can make 8 chocolate cakes (profit 80), which is less than the optimal 105.",
    hint: "Lower profit per unit.",
    level: "intermediate",
    codeExample: "8 chocolate cakes gives Z=80."
  },
  {
    question: "What is the trade-off between chocolate and vanilla cakes?",
    shortAnswer: "Vanilla cakes are more profitable but use more eggs.",
    explanation: "Vanilla: ₹15 profit, 4 eggs; Chocolate: ₹10 profit, 2 eggs.",
    hint: "Profit vs eggs usage.",
    level: "intermediate",
    codeExample: "Vanilla: more profit, more eggs."
  },
  {
    question: "What happens if flour increases to 30 cups?",
    shortAnswer: "The optimal solution would likely change.",
    explanation: "With more flour, the bakery could produce more cakes, increasing profit.",
    hint: "More flour → more production.",
    level: "intermediate",
    codeExample: "If flour = 30, new optimum may be different."
  },
  {
    question: "What happens if eggs increase to 30?",
    shortAnswer: "The optimal solution would change.",
    explanation: "With more eggs, the bakery could produce more vanilla cakes.",
    hint: "More eggs → more vanilla.",
    level: "intermediate",
    codeExample: "If eggs = 30, new optimum may be different."
  },
  {
    question: "What is the maximum profit?",
    shortAnswer: "₹105.",
    explanation: "The maximum profit is ₹105 at (6,3).",
    hint: "₹105.",
    level: "basic",
    codeExample: "Z = 105."
  },
  {
    question: "Are both constraints binding at the optimal solution?",
    shortAnswer: "Yes, both flour and eggs constraints are binding.",
    explanation: "At (6,3), flour: 24/24 used, eggs: 24/24 used.",
    hint: "Both are fully used.",
    level: "intermediate",
    codeExample: "Flour=24, Eggs=24."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "The optimal product mix balances resource constraints.",
    explanation: "Even though vanilla cakes are more profitable, the egg constraint limits production.",
    hint: "Balance resources.",
    level: "basic",
    codeExample: "Optimal mix balances flour and eggs."
  },
  {
    question: "What is the shadow price of flour?",
    shortAnswer: "The amount profit increases with one more cup of flour.",
    explanation: "Shadow price tells the value of an additional unit of a constrained resource.",
    hint: "Value of extra flour.",
    level: "expert",
    codeExample: "Shadow price of flour = 2.5 (in this example)."
  },
  {
    question: "What is the shadow price of eggs?",
    shortAnswer: "The amount profit increases with one more egg.",
    explanation: "Shadow price tells the value of an additional egg.",
    hint: "Value of extra egg.",
    level: "expert",
    codeExample: "Shadow price of eggs = 1.25 (in this example)."
  }
];

export default questions;