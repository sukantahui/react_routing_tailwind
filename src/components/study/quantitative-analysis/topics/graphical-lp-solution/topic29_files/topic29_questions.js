const questions = [
  {
    question: "What is the objective function in the furniture company example?",
    shortAnswer: "Maximize Z = 5x + 8y.",
    explanation: "Chairs give ₹5 profit, tables give ₹8 profit. The objective is to maximize total profit.",
    hint: "Z = 5x + 8y.",
    level: "basic",
    codeExample: "Z = 5x + 8y"
  },
  {
    question: "What are the resource constraints in the example?",
    shortAnswer: "2x + 4y ≤ 24 (wood) and 3x + 2y ≤ 18 (labor).",
    explanation: "Wood: 2 units/chair, 4 units/table, 24 available. Labor: 3 hours/chair, 2 hours/table, 18 available.",
    hint: "Wood and labor constraints.",
    level: "basic",
    codeExample: "2x + 4y ≤ 24, 3x + 2y ≤ 18."
  },
  {
    question: "What are the corner points of the feasible region?",
    shortAnswer: "O(0,0), A(6,0), B(3,4.5), C(0,6).",
    explanation: "These are the vertices where constraint lines intersect.",
    hint: "Four corner points.",
    level: "intermediate",
    codeExample: "O(0,0), A(6,0), B(3,4.5), C(0,6)."
  },
  {
    question: "What is the optimal solution in the example?",
    shortAnswer: "x = 3 chairs, y = 4.5 tables, Z = 51.",
    explanation: "Producing 3 chairs and 4.5 tables gives the maximum profit of ₹51.",
    hint: "Optimal at B(3,4.5).",
    level: "intermediate",
    codeExample: "(3, 4.5) with Z = 51."
  },
  {
    question: "How do you find the intersection of two constraints?",
    shortAnswer: "Solve the two equations simultaneously.",
    explanation: "For example, solve 2x+4y=24 and 3x+2y=18 to get (3,4.5).",
    hint: "Solve equations.",
    level: "intermediate",
    codeExample: "Solve 2x+4y=24 and 3x+2y=18."
  },
  {
    question: "What is the wood constraint at the optimal solution?",
    shortAnswer: "2(3) + 4(4.5) = 6 + 18 = 24 units, fully used.",
    explanation: "All available wood is used at the optimal solution.",
    hint: "24 units used.",
    level: "intermediate",
    codeExample: "2(3) + 4(4.5) = 24."
  },
  {
    question: "What is the labor constraint at the optimal solution?",
    shortAnswer: "3(3) + 2(4.5) = 9 + 9 = 18 hours, fully used.",
    explanation: "All available labor is used at the optimal solution.",
    hint: "18 hours used.",
    level: "intermediate",
    codeExample: "3(3) + 2(4.5) = 18."
  },
  {
    question: "What is the profit at (6,0)?",
    shortAnswer: "Z = 30.",
    explanation: "Producing only chairs (6 chairs) gives profit of 6×5 = 30.",
    hint: "Z = 30.",
    level: "basic",
    codeExample: "At (6,0), Z = 5(6) + 8(0) = 30."
  },
  {
    question: "What is the profit at (0,6)?",
    shortAnswer: "Z = 48.",
    explanation: "Producing only tables (6 tables) gives profit of 6×8 = 48.",
    hint: "Z = 48.",
    level: "basic",
    codeExample: "At (0,6), Z = 5(0) + 8(6) = 48."
  },
  {
    question: "Why is (0,6) not the optimal solution?",
    shortAnswer: "It gives lower profit (48) than the optimal (51).",
    explanation: "Even though tables are more profitable, the wood constraint limits production to 6 tables.",
    hint: "Z = 48 < 51.",
    level: "intermediate",
    codeExample: "(0,6) gives Z=48, (3,4.5) gives Z=51."
  },
  {
    question: "What is the profit at (3,4.5)?",
    shortAnswer: "Z = 51.",
    explanation: "At (3,4.5), Z = 5(3) + 8(4.5) = 15 + 36 = 51.",
    hint: "Z = 51.",
    level: "basic",
    codeExample: "(3,4.5) gives Z = 51."
  },
  {
    question: "What is the trade-off between chairs and tables?",
    shortAnswer: "Tables are more profitable but use more wood.",
    explanation: "Tables give ₹8 profit (vs ₹5 for chairs) but use 4 units of wood (vs 2 units for chairs).",
    hint: "Profit vs wood usage.",
    level: "intermediate",
    codeExample: "Tables: ₹8 profit, 4 wood; Chairs: ₹5 profit, 2 wood."
  },
  {
    question: "What would happen if labor increased to 20 hours?",
    shortAnswer: "The optimal solution would likely change, producing more tables.",
    explanation: "More labor allows more production, potentially increasing the optimal mix.",
    hint: "More labor → more tables.",
    level: "intermediate",
    codeExample: "If labor = 20, new optimal might be (2,5)."
  },
  {
    question: "What would happen if wood increased to 28 units?",
    shortAnswer: "The optimal solution would change, producing more chairs.",
    explanation: "More wood allows more chairs, which are less wood-intensive.",
    hint: "More wood → more chairs.",
    level: "intermediate",
    codeExample: "If wood = 28, new optimal might be (4,4)."
  },
  {
    question: "What is the shadow price of wood?",
    shortAnswer: "The amount profit increases with one more unit of wood.",
    explanation: "Shadow price tells the value of an additional unit of a constrained resource.",
    hint: "Value of extra wood.",
    level: "expert",
    codeExample: "Shadow price of wood = 1.5 (in this example)."
  },
  {
    question: "What is the shadow price of labor?",
    shortAnswer: "The amount profit increases with one more hour of labor.",
    explanation: "Shadow price tells the value of an additional hour of labor.",
    hint: "Value of extra labor.",
    level: "expert",
    codeExample: "Shadow price of labor = 1.0 (in this example)."
  },
  {
    question: "Are both constraints binding at the optimal solution?",
    shortAnswer: "Yes, both wood and labor constraints are binding.",
    explanation: "At (3,4.5), both resources are fully utilized.",
    hint: "Both are fully used.",
    level: "intermediate",
    codeExample: "2(3)+4(4.5)=24 and 3(3)+2(4.5)=18."
  },
  {
    question: "How do you verify the optimal solution?",
    shortAnswer: "Check that it satisfies all constraints and gives the highest Z.",
    explanation: "Substitute (3,4.5) into all constraints to verify feasibility, and compare Z values.",
    hint: "Check constraints and Z.",
    level: "intermediate",
    codeExample: "Check (3,4.5) in all constraints."
  },
  {
    question: "What is the labor per unit for chairs?",
    shortAnswer: "3 hours per chair.",
    explanation: "Each chair requires 3 hours of labor.",
    hint: "3 hours.",
    level: "basic",
    codeExample: "Chair: 3 hours labor."
  },
  {
    question: "What is the labor per unit for tables?",
    shortAnswer: "2 hours per table.",
    explanation: "Each table requires 2 hours of labor.",
    hint: "2 hours.",
    level: "basic",
    codeExample: "Table: 2 hours labor."
  },
  {
    question: "What is the wood per unit for chairs?",
    shortAnswer: "2 units of wood per chair.",
    explanation: "Each chair requires 2 units of wood.",
    hint: "2 units.",
    level: "basic",
    codeExample: "Chair: 2 wood."
  },
  {
    question: "What is the wood per unit for tables?",
    shortAnswer: "4 units of wood per table.",
    explanation: "Each table requires 4 units of wood.",
    hint: "4 units.",
    level: "basic",
    codeExample: "Table: 4 wood."
  },
  {
    question: "What is the total wood available?",
    shortAnswer: "24 units.",
    explanation: "The company has 24 units of wood available.",
    hint: "24 units.",
    level: "basic",
    codeExample: "Wood = 24."
  },
  {
    question: "What is the total labor available?",
    shortAnswer: "18 hours.",
    explanation: "The company has 18 hours of labor available.",
    hint: "18 hours.",
    level: "basic",
    codeExample: "Labor = 18."
  },
  {
    question: "What is the profit per chair?",
    shortAnswer: "₹5 per chair.",
    explanation: "Each chair gives a profit of ₹5.",
    hint: "₹5.",
    level: "basic",
    codeExample: "Profit per chair = ₹5."
  },
  {
    question: "What is the profit per table?",
    shortAnswer: "₹8 per table.",
    explanation: "Each table gives a profit of ₹8.",
    hint: "₹8.",
    level: "basic",
    codeExample: "Profit per table = ₹8."
  },
  {
    question: "Why is the optimal solution not at the origin?",
    shortAnswer: "The origin gives Z = 0, which is the minimum.",
    explanation: "The origin is a corner point, but it gives the lowest profit, not the highest.",
    hint: "Z = 0 at origin.",
    level: "basic",
    codeExample: "O(0,0) gives Z = 0."
  },
  {
    question: "What is the feasible region in this example?",
    shortAnswer: "The set of all points satisfying all constraints.",
    explanation: "The feasible region is the overlap of all constraint half-planes.",
    hint: "Overlap of constraints.",
    level: "basic",
    codeExample: "The shaded region on the graph."
  },
  {
    question: "What if the problem required integer solutions?",
    shortAnswer: "The optimal integer solution would be different.",
    explanation: "If we must produce whole units, the optimal would be (3,4) or (2,5), giving lower profit.",
    hint: "Integer programming.",
    level: "expert",
    codeExample: "Integer optimal might be (3,4) with Z=47."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "The optimal solution balances resource usage between products.",
    explanation: "This shows how to allocate limited resources between two products to maximize profit.",
    hint: "Resource allocation.",
    level: "basic",
    codeExample: "Balance wood and labor constraints."
  },
  {
    question: "What is the relationship between the two constraints at the optimum?",
    shortAnswer: "They intersect at the optimal point.",
    explanation: "The optimal solution is at the intersection of the wood and labor constraints.",
    hint: "Intersection of constraints.",
    level: "intermediate",
    codeExample: "The optimal is where wood and labor constraints meet."
  }
];

export default questions;