const questions = [
  {
    question: "What makes this example special?",
    shortAnswer: "All three constraints are binding at the optimal solution.",
    explanation: "At (3,4), machine hours (18/18), labor hours (20/20), and storage (7/7) are all fully utilized.",
    hint: "All constraints bind.",
    level: "intermediate",
    codeExample: "2(3)+3(4)=18, 4(3)+2(4)=20, 3+4=7."
  },
  {
    question: "What are the three constraints in this example?",
    shortAnswer: "2x + 3y ≤ 18, 4x + 2y ≤ 20, x + y ≤ 7.",
    explanation: "Machine hours: 2x+3y≤18, Labor: 4x+2y≤20, Storage: x+y≤7.",
    hint: "Machine, labor, storage.",
    level: "basic",
    codeExample: "2x+3y≤18, 4x+2y≤20, x+y≤7."
  },
  {
    question: "What is the optimal solution?",
    shortAnswer: "x = 3, y = 4, Z = 50.",
    explanation: "Producing 3 units of A and 4 units of B gives the maximum profit of ₹50.",
    hint: "Optimal at (3,4).",
    level: "intermediate",
    codeExample: "(3,4) with Z = 50."
  },
  {
    question: "How many constraints are binding at the optimum?",
    shortAnswer: "All three constraints are binding.",
    explanation: "At (3,4), machine: 2(3)+3(4)=18, labor: 4(3)+2(4)=20, storage: 3+4=7.",
    hint: "All three.",
    level: "intermediate",
    codeExample: "All three resources are fully used."
  },
  {
    question: "What is the machine constraint at (3,4)?",
    shortAnswer: "2(3) + 3(4) = 6 + 12 = 18, fully used.",
    explanation: "All machine hours are used at the optimal solution.",
    hint: "18 hours used.",
    level: "intermediate",
    codeExample: "2(3)+3(4)=18."
  },
  {
    question: "What is the labor constraint at (3,4)?",
    shortAnswer: "4(3) + 2(4) = 12 + 8 = 20, fully used.",
    explanation: "All labor hours are used at the optimal solution.",
    hint: "20 hours used.",
    level: "intermediate",
    codeExample: "4(3)+2(4)=20."
  },
  {
    question: "What is the storage constraint at (3,4)?",
    shortAnswer: "3 + 4 = 7, fully used.",
    explanation: "All storage space is used at the optimal solution.",
    hint: "7 units used.",
    level: "intermediate",
    codeExample: "3+4=7."
  },
  {
    question: "What is the profit at (5,0)?",
    shortAnswer: "Z = 30.",
    explanation: "At (5,0), Z = 6(5) + 8(0) = 30.",
    hint: "Z = 30.",
    level: "basic",
    codeExample: "(5,0) gives Z = 30."
  },
  {
    question: "What is the profit at (0,6)?",
    shortAnswer: "Z = 48.",
    explanation: "At (0,6), Z = 6(0) + 8(6) = 48.",
    hint: "Z = 48.",
    level: "basic",
    codeExample: "(0,6) gives Z = 48."
  },
  {
    question: "What is the profit at (3,4)?",
    shortAnswer: "Z = 50.",
    explanation: "At (3,4), Z = 6(3) + 8(4) = 18 + 32 = 50.",
    hint: "Z = 50.",
    level: "basic",
    codeExample: "(3,4) gives Z = 50."
  },
  {
    question: "What is the objective function?",
    shortAnswer: "Maximize Z = 6x + 8y.",
    explanation: "Product A gives ₹6 profit, Product B gives ₹8 profit.",
    hint: "Z = 6x + 8y.",
    level: "basic",
    codeExample: "Z = 6x + 8y."
  },
  {
    question: "What is the profit per unit of Product A?",
    shortAnswer: "₹6 per unit.",
    explanation: "Each unit of Product A gives a profit of ₹6.",
    hint: "₹6.",
    level: "basic",
    codeExample: "Profit per A = ₹6."
  },
  {
    question: "What is the profit per unit of Product B?",
    shortAnswer: "₹8 per unit.",
    explanation: "Each unit of Product B gives a profit of ₹8.",
    hint: "₹8.",
    level: "basic",
    codeExample: "Profit per B = ₹8."
  },
  {
    question: "What is the machine hours per unit of Product A?",
    shortAnswer: "2 hours per unit.",
    explanation: "Product A requires 2 machine hours per unit.",
    hint: "2 hours.",
    level: "basic",
    codeExample: "A: 2 machine hours."
  },
  {
    question: "What is the machine hours per unit of Product B?",
    shortAnswer: "3 hours per unit.",
    explanation: "Product B requires 3 machine hours per unit.",
    hint: "3 hours.",
    level: "basic",
    codeExample: "B: 3 machine hours."
  },
  {
    question: "What is the labor hours per unit of Product A?",
    shortAnswer: "4 hours per unit.",
    explanation: "Product A requires 4 labor hours per unit.",
    hint: "4 hours.",
    level: "basic",
    codeExample: "A: 4 labor hours."
  },
  {
    question: "What is the labor hours per unit of Product B?",
    shortAnswer: "2 hours per unit.",
    explanation: "Product B requires 2 labor hours per unit.",
    hint: "2 hours.",
    level: "basic",
    codeExample: "B: 2 labor hours."
  },
  {
    question: "What is the storage per unit of Product A?",
    shortAnswer: "1 unit of storage per unit.",
    explanation: "Product A requires 1 unit of storage space.",
    hint: "1 unit.",
    level: "basic",
    codeExample: "A: 1 storage."
  },
  {
    question: "What is the storage per unit of Product B?",
    shortAnswer: "1 unit of storage per unit.",
    explanation: "Product B requires 1 unit of storage space.",
    hint: "1 unit.",
    level: "basic",
    codeExample: "B: 1 storage."
  },
  {
    question: "What is the total machine hours available?",
    shortAnswer: "18 hours.",
    explanation: "The company has 18 machine hours available.",
    hint: "18 hours.",
    level: "basic",
    codeExample: "Machine = 18."
  },
  {
    question: "What is the total labor hours available?",
    shortAnswer: "20 hours.",
    explanation: "The company has 20 labor hours available.",
    hint: "20 hours.",
    level: "basic",
    codeExample: "Labor = 20."
  },
  {
    question: "What is the total storage available?",
    shortAnswer: "7 units.",
    explanation: "The company has 7 units of storage space available.",
    hint: "7 units.",
    level: "basic",
    codeExample: "Storage = 7."
  },
  {
    question: "What happens if machine hours increase to 20?",
    shortAnswer: "The optimal solution would likely change.",
    explanation: "With more machine hours, the company could produce more, potentially increasing profit.",
    hint: "More machine → more production.",
    level: "intermediate",
    codeExample: "If machine = 20, new optimum may be different."
  },
  {
    question: "What happens if storage increases to 8?",
    shortAnswer: "The optimal solution would change.",
    explanation: "With more storage, the company could produce more of both products.",
    hint: "More storage → more production.",
    level: "intermediate",
    codeExample: "If storage = 8, new optimum may be different."
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
    question: "What is the shadow price of labor?",
    shortAnswer: "The amount profit increases with one more labor hour.",
    explanation: "Shadow price tells the value of an additional labor hour.",
    hint: "Value of extra labor hour.",
    level: "expert",
    codeExample: "Shadow price of labor = 1.0 (in this example)."
  },
  {
    question: "What is the shadow price of storage?",
    shortAnswer: "The amount profit increases with one more storage unit.",
    explanation: "Shadow price tells the value of an additional storage unit.",
    hint: "Value of extra storage.",
    level: "expert",
    codeExample: "Shadow price of storage = 1.5 (in this example)."
  },
  {
    question: "Why is this case considered special?",
    shortAnswer: "Because all three constraints bind simultaneously.",
    explanation: "It's rare to have all constraints fully utilized at the optimal point.",
    hint: "All resources fully used.",
    level: "intermediate",
    codeExample: "Machine=18, Labor=20, Storage=7 all used."
  },
  {
    question: "What is the maximum profit?",
    shortAnswer: "₹50.",
    explanation: "The maximum profit is ₹50 at (3,4).",
    hint: "₹50.",
    level: "basic",
    codeExample: "Z = 50."
  },
  {
    question: "What are the corner points?",
    shortAnswer: "O(0,0), A(5,0), B(3,4), C(0,6).",
    explanation: "These are the vertices of the feasible region.",
    hint: "Four corner points.",
    level: "intermediate",
    codeExample: "O(0,0), A(5,0), B(3,4), C(0,6)."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "Multiple constraints can all bind at the optimal solution.",
    explanation: "This shows the power of LP to find solutions where all resources are perfectly balanced.",
    hint: "All resources balanced.",
    level: "basic",
    codeExample: "All constraints are binding at the optimum."
  }
];

export default questions;