const questions = [
  {
    question: "What is the maximum profit in the profit maximization example?",
    shortAnswer: "₹24.",
    explanation: "The maximum profit is ₹24 at (4,3).",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Max Profit = ₹24."
  },
  {
    question: "What is the maximum profit in the factory production example?",
    shortAnswer: "₹20.",
    explanation: "The maximum profit is ₹20 at (4,0).",
    hint: "Z = 20.",
    level: "basic",
    codeExample: "Max Profit = ₹20."
  },
  {
    question: "What is the maximum profit in the multiple optima example?",
    shortAnswer: "₹10.",
    explanation: "The maximum profit is ₹10 at both (10,0) and (0,10).",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Max Profit = ₹10."
  },
  {
    question: "How do you find the maximum profit?",
    shortAnswer: "Evaluate Z at all corner points and pick the highest value.",
    explanation: "The maximum profit is the highest Z value among all feasible corner points.",
    hint: "Pick the highest Z.",
    level: "basic",
    codeExample: "Z values: 0, 15, 24, 22, 20 → max is 24."
  },
  {
    question: "What is the profit at (0,0) in the profit maximization example?",
    shortAnswer: "₹0.",
    explanation: "Z = 3(0) + 4(0) = 0.",
    hint: "Z = 0.",
    level: "basic",
    codeExample: "Profit = ₹0."
  },
  {
    question: "What is the profit at (5,0) in the profit maximization example?",
    shortAnswer: "₹15.",
    explanation: "Z = 3(5) + 4(0) = 15.",
    hint: "Z = 15.",
    level: "basic",
    codeExample: "Profit = ₹15."
  },
  {
    question: "What is the profit at (4,3) in the profit maximization example?",
    shortAnswer: "₹24.",
    explanation: "Z = 3(4) + 4(3) = 12 + 12 = 24.",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Profit = ₹24."
  },
  {
    question: "What is the profit at (2,4) in the profit maximization example?",
    shortAnswer: "₹22.",
    explanation: "Z = 3(2) + 4(4) = 6 + 16 = 22.",
    hint: "Z = 22.",
    level: "basic",
    codeExample: "Profit = ₹22."
  },
  {
    question: "What is the profit at (0,5) in the profit maximization example?",
    shortAnswer: "₹20.",
    explanation: "Z = 3(0) + 4(5) = 20.",
    hint: "Z = 20.",
    level: "basic",
    codeExample: "Profit = ₹20."
  },
  {
    question: "What is the profit at (4,0) in the factory production example?",
    shortAnswer: "₹20.",
    explanation: "Z = 5(4) + 3(0) = 20.",
    hint: "Z = 20.",
    level: "basic",
    codeExample: "Profit = ₹20."
  },
  {
    question: "What is the profit at (2,2) in the factory production example?",
    shortAnswer: "₹16.",
    explanation: "Z = 5(2) + 3(2) = 10 + 6 = 16.",
    hint: "Z = 16.",
    level: "basic",
    codeExample: "Profit = ₹16."
  },
  {
    question: "What is the profit at (0,4) in the factory production example?",
    shortAnswer: "₹12.",
    explanation: "Z = 5(0) + 3(4) = 12.",
    hint: "Z = 12.",
    level: "basic",
    codeExample: "Profit = ₹12."
  },
  {
    question: "What is the profit at (10,0) in the multiple optima example?",
    shortAnswer: "₹10.",
    explanation: "Z = 10 + 0 = 10.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Profit = ₹10."
  },
  {
    question: "What is the profit at (0,10) in the multiple optima example?",
    shortAnswer: "₹10.",
    explanation: "Z = 0 + 10 = 10.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Profit = ₹10."
  },
  {
    question: "What is the profit comparison in the profit maximization example?",
    shortAnswer: "₹24 > ₹22 > ₹20 > ₹15 > ₹0.",
    explanation: "B (4,3) gives the highest profit.",
    hint: "24 > 22 > 20 > 15 > 0.",
    level: "intermediate",
    codeExample: "24 > 22 > 20 > 15 > 0."
  },
  {
    question: "What is the profit comparison in the factory production example?",
    shortAnswer: "₹20 > ₹16 > ₹12 > ₹0.",
    explanation: "A (4,0) gives the highest profit.",
    hint: "20 > 16 > 12 > 0.",
    level: "intermediate",
    codeExample: "20 > 16 > 12 > 0."
  },
  {
    question: "What is the profit comparison in the multiple optima example?",
    shortAnswer: "₹10 = ₹10 > ₹0.",
    explanation: "Both A and B give the same maximum profit.",
    hint: "10 = 10 > 0.",
    level: "intermediate",
    codeExample: "10 = 10 > 0."
  },
  {
    question: "What is the maximum profit in context for the profit maximization example?",
    shortAnswer: "The business earns ₹24 by producing 4 units of X and 3 units of Y.",
    explanation: "This is the optimal production mix for maximum profit.",
    hint: "₹24 at (4,3).",
    level: "intermediate",
    codeExample: "Produce 4 X and 3 Y for ₹24 profit."
  },
  {
    question: "What is the maximum profit in context for the factory production example?",
    shortAnswer: "The factory earns ₹20 by producing 4 units of X and 0 units of Y.",
    explanation: "Producing only Product X gives the maximum profit.",
    hint: "₹20 at (4,0).",
    level: "intermediate",
    codeExample: "Produce 4 X and 0 Y for ₹20 profit."
  },
  {
    question: "What is the maximum profit in context for the multiple optima example?",
    shortAnswer: "The business earns ₹10 by either producing 10 X and 0 Y, or 0 X and 10 Y.",
    explanation: "Both production mixes give the same maximum profit.",
    hint: "₹10 at (10,0) or (0,10).",
    level: "intermediate",
    codeExample: "(10,0) or (0,10) gives ₹10 profit."
  },
  {
    question: "What is the most common mistake in determining maximum profit?",
    shortAnswer: "Forgetting the currency symbol (₹) or context.",
    explanation: "Students often just state the number without context.",
    hint: "Add ₹ and context.",
    level: "basic",
    codeExample: "Instead of '24', say '₹24'."
  },
  {
    question: "How do you verify the maximum profit?",
    shortAnswer: "Substitute the optimal point into the profit function.",
    explanation: "Check that the profit value is correct and the point is feasible.",
    hint: "Substitute and check.",
    level: "intermediate",
    codeExample: "At (4,3), Z = 3(4)+4(3)=24."
  },
  {
    question: "What is the role of constraints in determining maximum profit?",
    shortAnswer: "They limit the feasible region where the maximum profit can be found.",
    explanation: "The maximum profit must be achieved at a point that satisfies all constraints.",
    hint: "Constraints limit the options.",
    level: "basic",
    codeExample: "The optimal point must satisfy all constraints."
  },
  {
    question: "What is the difference between maximum profit and optimal variables?",
    shortAnswer: "Maximum profit is the Z value; optimal variables are x and y.",
    explanation: "The maximum profit tells you how much you earn; the variables tell you how to earn it.",
    hint: "Value vs variables.",
    level: "basic",
    codeExample: "Max profit: ₹24; Variables: x=4, y=3."
  },
  {
    question: "What is the maximum profit formula?",
    shortAnswer: "There is no formula — evaluate Z at all corners and pick the highest.",
    explanation: "The maximum profit is found by evaluating the profit function at all corner points.",
    hint: "Evaluate and compare.",
    level: "basic",
    codeExample: "Max Z = max{Z(corner1), Z(corner2), ...}"
  },
  {
    question: "What is the optimal Z in the profit maximization example?",
    shortAnswer: "24.",
    explanation: "The maximum Z is 24 at (4,3).",
    hint: "Z = 24.",
    level: "basic",
    codeExample: "Optimal Z = 24."
  },
  {
    question: "What is the optimal Z in the factory production example?",
    shortAnswer: "20.",
    explanation: "The maximum Z is 20 at (4,0).",
    hint: "Z = 20.",
    level: "basic",
    codeExample: "Optimal Z = 20."
  },
  {
    question: "What is the optimal Z in the multiple optima example?",
    shortAnswer: "10.",
    explanation: "The maximum Z is 10 at both A and B.",
    hint: "Z = 10.",
    level: "basic",
    codeExample: "Optimal Z = 10."
  },
  {
    question: "What is the most important thing to remember about maximum profit?",
    shortAnswer: "It must be feasible and is the highest Z value.",
    explanation: "The maximum profit must be achievable (feasible) and higher than all other options.",
    hint: "Feasible and highest.",
    level: "basic",
    codeExample: "Max profit is the highest feasible Z."
  },
  {
    question: "What is the business impact of maximum profit?",
    shortAnswer: "It tells the company the best possible financial outcome.",
    explanation: "The maximum profit guides business decisions on what to produce.",
    hint: "Guides decisions.",
    level: "basic",
    codeExample: "Produce the mix that gives the maximum profit."
  }
];

export default questions;