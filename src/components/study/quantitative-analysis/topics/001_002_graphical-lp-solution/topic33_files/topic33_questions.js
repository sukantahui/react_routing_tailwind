const questions = [
  {
    question: "What is the objective function in the labour and machine example?",
    shortAnswer: "Maximize Z = 12x + 15y.",
    explanation: "Product P gives ₹12 profit, Product Q gives ₹15 profit.",
    hint: "Z = 12x + 15y.",
    level: "basic",
    codeExample: "Z = 12x + 15y."
  },
  {
    question: "What are the constraints in the labour and machine example?",
    shortAnswer: "3x + 4y ≤ 120 (labour) and 2x + 3y ≤ 90 (machine).",
    explanation: "Labour: 3 hours per P, 4 hours per Q, 120 available. Machine: 2 hours per P, 3 hours per Q, 90 available.",
    hint: "Labour and machine constraints.",
    level: "basic",
    codeExample: "3x+4y≤120, 2x+3y≤90."
  },
  {
    question: "What is the optimal solution?",
    shortAnswer: "x = 30, y = 10, Z = 510.",
    explanation: "Producing 30 units of P and 10 units of Q gives the maximum profit of ₹510.",
    hint: "Optimal at (30,10).",
    level: "intermediate",
    codeExample: "(30,10) with Z = 510."
  },
  {
    question: "What is the profit at (40,0)?",
    shortAnswer: "Z = 480.",
    explanation: "At (40,0), Z = 12(40) + 15(0) = 480.",
    hint: "Z = 480.",
    level: "basic",
    codeExample: "(40,0) gives Z = 480."
  },
  {
    question: "What is the profit at (0,30)?",
    shortAnswer: "Z = 450.",
    explanation: "At (0,30), Z = 12(0) + 15(30) = 450.",
    hint: "Z = 450.",
    level: "basic",
    codeExample: "(0,30) gives Z = 450."
  },
  {
    question: "What is the profit at (30,10)?",
    shortAnswer: "Z = 510.",
    explanation: "At (30,10), Z = 12(30) + 15(10) = 360 + 150 = 510.",
    hint: "Z = 510.",
    level: "basic",
    codeExample: "(30,10) gives Z = 510."
  },
  {
    question: "How many labour hours are used at the optimal solution?",
    shortAnswer: "3(30) + 4(10) = 90 + 40 = 120 hours, fully used.",
    explanation: "All labour hours are used at the optimal solution.",
    hint: "120 hours used.",
    level: "intermediate",
    codeExample: "3(30)+4(10)=120."
  },
  {
    question: "How many machine hours are used at the optimal solution?",
    shortAnswer: "2(30) + 3(10) = 60 + 30 = 90 hours, fully used.",
    explanation: "All machine hours are used at the optimal solution.",
    hint: "90 hours used.",
    level: "intermediate",
    codeExample: "2(30)+3(10)=90."
  },
  {
    question: "What are the corner points of the feasible region?",
    shortAnswer: "O(0,0), A(40,0), B(30,10), C(0,30).",
    explanation: "These are the vertices of the feasible region.",
    hint: "Four corner points.",
    level: "intermediate",
    codeExample: "O(0,0), A(40,0), B(30,10), C(0,30)."
  },
  {
    question: "What is the labour hours per unit for Product P?",
    shortAnswer: "3 hours per unit.",
    explanation: "Product P requires 3 labour hours per unit.",
    hint: "3 hours.",
    level: "basic",
    codeExample: "P: 3 labour hours."
  },
  {
    question: "What is the labour hours per unit for Product Q?",
    shortAnswer: "4 hours per unit.",
    explanation: "Product Q requires 4 labour hours per unit.",
    hint: "4 hours.",
    level: "basic",
    codeExample: "Q: 4 labour hours."
  },
  {
    question: "What is the machine hours per unit for Product P?",
    shortAnswer: "2 hours per unit.",
    explanation: "Product P requires 2 machine hours per unit.",
    hint: "2 hours.",
    level: "basic",
    codeExample: "P: 2 machine hours."
  },
  {
    question: "What is the machine hours per unit for Product Q?",
    shortAnswer: "3 hours per unit.",
    explanation: "Product Q requires 3 machine hours per unit.",
    hint: "3 hours.",
    level: "basic",
    codeExample: "Q: 3 machine hours."
  },
  {
    question: "What is the total labour available?",
    shortAnswer: "120 hours.",
    explanation: "The factory has 120 labour hours available.",
    hint: "120 hours.",
    level: "basic",
    codeExample: "Labour = 120."
  },
  {
    question: "What is the total machine hours available?",
    shortAnswer: "90 hours.",
    explanation: "The factory has 90 machine hours available.",
    hint: "90 hours.",
    level: "basic",
    codeExample: "Machine = 90."
  },
  {
    question: "What is the profit per unit of Product P?",
    shortAnswer: "₹12 per unit.",
    explanation: "Each unit of Product P gives a profit of ₹12.",
    hint: "₹12.",
    level: "basic",
    codeExample: "Profit per P = ₹12."
  },
  {
    question: "What is the profit per unit of Product Q?",
    shortAnswer: "₹15 per unit.",
    explanation: "Each unit of Product Q gives a profit of ₹15.",
    hint: "₹15.",
    level: "basic",
    codeExample: "Profit per Q = ₹15."
  },
  {
    question: "Which product is more profitable per unit?",
    shortAnswer: "Product Q (₹15 vs ₹12 for P).",
    explanation: "Product Q gives higher profit per unit.",
    hint: "Q is more profitable.",
    level: "basic",
    codeExample: "Q: ₹15, P: ₹12."
  },
  {
    question: "Why isn't the optimal solution all Product Q?",
    shortAnswer: "Because Product Q uses more of both resources, limiting production.",
    explanation: "With 120 labour and 90 machine, you can only make 30 units of Q (profit 450), less than the optimal 510.",
    hint: "Resource limits Q.",
    level: "intermediate",
    codeExample: "30 Q gives Z=450."
  },
  {
    question: "Why isn't the optimal solution all Product P?",
    shortAnswer: "Because Product P gives lower profit per unit.",
    explanation: "With 120 labour, you can make 40 units of P (profit 480), less than the optimal 510.",
    hint: "Lower profit per unit.",
    level: "intermediate",
    codeExample: "40 P gives Z=480."
  },
  {
    question: "What is the trade-off between Products P and Q?",
    shortAnswer: "Product Q is more profitable but uses more labour and machine hours.",
    explanation: "Q: ₹15 profit, 4 labour, 3 machine; P: ₹12 profit, 3 labour, 2 machine.",
    hint: "Profit vs resource usage.",
    level: "intermediate",
    codeExample: "Q: more profit, more resources."
  },
  {
    question: "What happens if labour hours increase to 140?",
    shortAnswer: "The optimal solution would likely change.",
    explanation: "With more labour, the factory could produce more Q.",
    hint: "More labour → more Q.",
    level: "intermediate",
    codeExample: "If labour = 140, new optimum may be different."
  },
  {
    question: "What happens if machine hours increase to 100?",
    shortAnswer: "The optimal solution would change.",
    explanation: "With more machine hours, the factory could produce more of both products.",
    hint: "More machine → more production.",
    level: "intermediate",
    codeExample: "If machine = 100, new optimum may be different."
  },
  {
    question: "What is the maximum profit?",
    shortAnswer: "₹510.",
    explanation: "The maximum profit is ₹510 at (30,10).",
    hint: "₹510.",
    level: "basic",
    codeExample: "Z = 510."
  },
  {
    question: "Are both constraints binding at the optimal solution?",
    shortAnswer: "Yes, both labour and machine constraints are binding.",
    explanation: "At (30,10), labour: 120/120 used, machine: 90/90 used.",
    hint: "Both are fully used.",
    level: "intermediate",
    codeExample: "Labour=120, Machine=90."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "The optimal production plan balances labour and machine hours.",
    explanation: "Even though Product Q is more profitable, resource constraints limit production.",
    hint: "Balance resources.",
    level: "basic",
    codeExample: "Optimal plan balances labour and machine."
  },
  {
    question: "What is the shadow price of labour?",
    shortAnswer: "The amount profit increases with one more labour hour.",
    explanation: "Shadow price tells the value of an additional labour hour.",
    hint: "Value of extra labour.",
    level: "expert",
    codeExample: "Shadow price of labour = 1.5 (in this example)."
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
    question: "What is the labour constraint at the optimal solution?",
    shortAnswer: "3(30) + 4(10) = 120, fully used.",
    explanation: "All labour hours are used at (30,10).",
    hint: "120 hours.",
    level: "intermediate",
    codeExample: "3(30)+4(10)=120."
  },
  {
    question: "What is the machine constraint at the optimal solution?",
    shortAnswer: "2(30) + 3(10) = 90, fully used.",
    explanation: "All machine hours are used at (30,10).",
    hint: "90 hours.",
    level: "intermediate",
    codeExample: "2(30)+3(10)=90."
  }
];

export default questions;