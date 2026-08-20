const questions = [
  {
    question: "What is the minimum cost in the diet minimization example?",
    shortAnswer: "₹6.",
    explanation: "The minimum cost is ₹6 at (3,0).",
    hint: "C = 6.",
    level: "basic",
    codeExample: "Min Cost = ₹6."
  },
  {
    question: "What is the minimum cost in the production cost minimization example?",
    shortAnswer: "₹15.",
    explanation: "The minimum cost is ₹15 at (0,5).",
    hint: "C = 15.",
    level: "basic",
    codeExample: "Min Cost = ₹15."
  },
  {
    question: "What is the minimum cost in the multiple optima cost example?",
    shortAnswer: "₹3.",
    explanation: "The minimum cost is ₹3 at (3,0).",
    hint: "C = 3.",
    level: "basic",
    codeExample: "Min Cost = ₹3."
  },
  {
    question: "How do you find the minimum cost?",
    shortAnswer: "Evaluate C at all corner points and pick the lowest value.",
    explanation: "The minimum cost is the lowest C value among all feasible corner points.",
    hint: "Pick the lowest C.",
    level: "basic",
    codeExample: "C values: 12, 10, 6 → min is 6."
  },
  {
    question: "What is the cost at (0,4) in the diet minimization example?",
    shortAnswer: "₹12.",
    explanation: "C = 2(0) + 3(4) = 12.",
    hint: "C = 12.",
    level: "basic",
    codeExample: "Cost = ₹12."
  },
  {
    question: "What is the cost at (2,2) in the diet minimization example?",
    shortAnswer: "₹10.",
    explanation: "C = 2(2) + 3(2) = 4 + 6 = 10.",
    hint: "C = 10.",
    level: "basic",
    codeExample: "Cost = ₹10."
  },
  {
    question: "What is the cost at (3,0) in the diet minimization example?",
    shortAnswer: "₹6.",
    explanation: "C = 2(3) + 3(0) = 6.",
    hint: "C = 6.",
    level: "basic",
    codeExample: "Cost = ₹6."
  },
  {
    question: "What is the cost at (0,5) in the production cost minimization example?",
    shortAnswer: "₹15.",
    explanation: "C = 4(0) + 3(5) = 15.",
    hint: "C = 15.",
    level: "basic",
    codeExample: "Cost = ₹15."
  },
  {
    question: "What is the cost at (3,2) in the production cost minimization example?",
    shortAnswer: "₹18.",
    explanation: "C = 4(3) + 3(2) = 12 + 6 = 18.",
    hint: "C = 18.",
    level: "basic",
    codeExample: "Cost = ₹18."
  },
  {
    question: "What is the cost at (4,0) in the production cost minimization example?",
    shortAnswer: "₹16.",
    explanation: "C = 4(4) + 3(0) = 16.",
    hint: "C = 16.",
    level: "basic",
    codeExample: "Cost = ₹16."
  },
  {
    question: "What is the cost at (0,4) in the multiple optima cost example?",
    shortAnswer: "₹4.",
    explanation: "C = 0 + 4 = 4.",
    hint: "C = 4.",
    level: "basic",
    codeExample: "Cost = ₹4."
  },
  {
    question: "What is the cost at (2,2) in the multiple optima cost example?",
    shortAnswer: "₹4.",
    explanation: "C = 2 + 2 = 4.",
    hint: "C = 4.",
    level: "basic",
    codeExample: "Cost = ₹4."
  },
  {
    question: "What is the cost at (3,0) in the multiple optima cost example?",
    shortAnswer: "₹3.",
    explanation: "C = 3 + 0 = 3.",
    hint: "C = 3.",
    level: "basic",
    codeExample: "Cost = ₹3."
  },
  {
    question: "What is the cost comparison in the diet minimization example?",
    shortAnswer: "₹6 < ₹10 < ₹12.",
    explanation: "C (3,0) gives the lowest cost.",
    hint: "6 < 10 < 12.",
    level: "intermediate",
    codeExample: "6 < 10 < 12."
  },
  {
    question: "What is the cost comparison in the production cost minimization example?",
    shortAnswer: "₹15 < ₹16 < ₹18.",
    explanation: "A (0,5) gives the lowest cost.",
    hint: "15 < 16 < 18.",
    level: "intermediate",
    codeExample: "15 < 16 < 18."
  },
  {
    question: "What is the cost comparison in the multiple optima cost example?",
    shortAnswer: "₹3 < ₹4 = ₹4.",
    explanation: "C (3,0) gives the lowest cost.",
    hint: "3 < 4 = 4.",
    level: "intermediate",
    codeExample: "3 < 4 = 4."
  },
  {
    question: "What is the minimum cost in context for the diet minimization example?",
    shortAnswer: "The dietitian spends ₹6 by using 3 servings of Food A and 0 of Food B.",
    explanation: "This is the optimal meal plan for minimum cost.",
    hint: "₹6 at (3,0).",
    level: "intermediate",
    codeExample: "Use 3 A and 0 B for ₹6 cost."
  },
  {
    question: "What is the minimum cost in context for the production cost minimization example?",
    shortAnswer: "The factory spends ₹15 by producing 0 units of X and 5 units of Y.",
    explanation: "Producing only Product Y gives the minimum cost.",
    hint: "₹15 at (0,5).",
    level: "intermediate",
    codeExample: "Produce 0 X and 5 Y for ₹15 cost."
  },
  {
    question: "What is the minimum cost in context for the multiple optima cost example?",
    shortAnswer: "The factory spends ₹3 by producing 3 units of X and 0 of Y.",
    explanation: "Producing only Product X gives the minimum cost.",
    hint: "₹3 at (3,0).",
    level: "intermediate",
    codeExample: "Produce 3 X and 0 Y for ₹3 cost."
  },
  {
    question: "What is the most common mistake in determining minimum cost?",
    shortAnswer: "Forgetting the currency symbol (₹) or context.",
    explanation: "Students often just state the number without context.",
    hint: "Add ₹ and context.",
    level: "basic",
    codeExample: "Instead of '6', say '₹6'."
  },
  {
    question: "How do you verify the minimum cost?",
    shortAnswer: "Substitute the optimal point into the cost function.",
    explanation: "Check that the cost value is correct and the point is feasible.",
    hint: "Substitute and check.",
    level: "intermediate",
    codeExample: "At (3,0), C = 2(3)+3(0)=6."
  },
  {
    question: "What is the role of constraints in determining minimum cost?",
    shortAnswer: "They limit the feasible region where the minimum cost can be found.",
    explanation: "The minimum cost must be achieved at a point that satisfies all constraints.",
    hint: "Constraints limit the options.",
    level: "basic",
    codeExample: "The optimal point must satisfy all constraints."
  },
  {
    question: "What is the difference between minimum cost and optimal variables?",
    shortAnswer: "Minimum cost is the C value; optimal variables are x and y.",
    explanation: "The minimum cost tells you how much you spend; the variables tell you how to spend it.",
    hint: "Value vs variables.",
    level: "basic",
    codeExample: "Min cost: ₹6; Variables: x=3, y=0."
  },
  {
    question: "What is the minimum cost formula?",
    shortAnswer: "There is no formula — evaluate C at all corners and pick the lowest.",
    explanation: "The minimum cost is found by evaluating the cost function at all corner points.",
    hint: "Evaluate and compare.",
    level: "basic",
    codeExample: "Min C = min{C(corner1), C(corner2), ...}"
  },
  {
    question: "What is the optimal C in the diet minimization example?",
    shortAnswer: "6.",
    explanation: "The minimum C is 6 at (3,0).",
    hint: "C = 6.",
    level: "basic",
    codeExample: "Optimal C = 6."
  },
  {
    question: "What is the optimal C in the production cost minimization example?",
    shortAnswer: "15.",
    explanation: "The minimum C is 15 at (0,5).",
    hint: "C = 15.",
    level: "basic",
    codeExample: "Optimal C = 15."
  },
  {
    question: "What is the optimal C in the multiple optima cost example?",
    shortAnswer: "3.",
    explanation: "The minimum C is 3 at (3,0).",
    hint: "C = 3.",
    level: "basic",
    codeExample: "Optimal C = 3."
  },
  {
    question: "What is the most important thing to remember about minimum cost?",
    shortAnswer: "It must be feasible and is the lowest C value.",
    explanation: "The minimum cost must be achievable (feasible) and lower than all other options.",
    hint: "Feasible and lowest.",
    level: "basic",
    codeExample: "Min cost is the lowest feasible C."
  },
  {
    question: "What is the business impact of minimum cost?",
    shortAnswer: "It tells the company the cheapest way to meet requirements.",
    explanation: "The minimum cost guides business decisions on how to minimize expenses.",
    hint: "Guides decisions.",
    level: "basic",
    codeExample: "Choose the mix that gives the minimum cost."
  },
  {
    question: "How do you distinguish between max and min?",
    shortAnswer: "Max is the highest value; min is the lowest value.",
    explanation: "For profit maximization, look for the highest Z. For cost minimization, look for the lowest C.",
    hint: "Highest vs lowest.",
    level: "basic",
    codeExample: "Max: highest; Min: lowest."
  }
];

export default questions;