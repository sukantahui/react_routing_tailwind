// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is the goal of a profit maximization problem in LP?",
    shortAnswer: "To find the product mix that yields the highest total profit.",
    explanation: "Profit maximization problems aim to maximize total profit subject to resource constraints.",
    hint: "Maximize profit with limited resources.",
    level: "basic"
  },
  {
    question: "In the profit maximization example, what are the decision variables?",
    shortAnswer: "x₁ = units of Product X, x₂ = units of Product Y.",
    explanation: "These represent the quantities of each product to be produced.",
    hint: "Two products, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the profit maximization example?",
    shortAnswer: "Maximize Z = 60x₁ + 80x₂.",
    explanation: "Product X gives ₹60 profit per unit, Product Y gives ₹80 profit per unit.",
    hint: "Profit per unit for each product.",
    level: "basic"
  },
  {
    question: "What does the machining constraint represent?",
    shortAnswer: "2x₁ + 4x₂ ≤ 100, total machining hours cannot exceed 100.",
    explanation: "Each unit of X uses 2 hours, each unit of Y uses 4 hours.",
    hint: "Machining capacity limit.",
    level: "basic"
  },
  {
    question: "What does the assembly constraint represent?",
    shortAnswer: "3x₁ + 2x₂ ≤ 90, total assembly hours cannot exceed 90.",
    explanation: "Each unit of X uses 3 hours, each unit of Y uses 2 hours.",
    hint: "Assembly capacity limit.",
    level: "basic"
  },
  {
    question: "What does the packaging constraint represent?",
    shortAnswer: "x₁ + 2x₂ ≤ 50, total packaging hours cannot exceed 50.",
    explanation: "Each unit of X uses 1 hour, each unit of Y uses 2 hours.",
    hint: "Packaging capacity limit.",
    level: "basic"
  },
  {
    question: "How many resources are there in the profit maximization example?",
    shortAnswer: "3 resources: Machining, Assembly, and Packaging.",
    explanation: "Each resource limits the total production of both products.",
    hint: "Count the constraints (excluding non-negativity).",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the profit maximization example?",
    shortAnswer: "x₁ = 20, x₂ = 15 with profit = ₹2,400.",
    explanation: "Produce 20 units of Product X and 15 units of Product Y.",
    hint: "The best mix of products.",
    level: "moderate"
  },
  {
    question: "How do you find the optimal solution graphically?",
    shortAnswer: "Plot constraints, identify feasible region, evaluate objective at corner points.",
    explanation: "The optimal solution is at one of the corner points of the feasible region.",
    hint: "Check all corner points.",
    level: "moderate"
  },
  {
    question: "What are the corner points of the feasible region in the profit maximization example?",
    shortAnswer: "(0,0), (0,25), (20,15), (30,0).",
    explanation: "These are the vertices of the feasible polygon where the optimal solution lies.",
    hint: "Intersection points of constraints.",
    level: "moderate"
  },
  {
    question: "What is the profit at each corner point?",
    shortAnswer: "(0,0): ₹0, (0,25): ₹2,000, (20,15): ₹2,400, (30,0): ₹1,800.",
    explanation: "The highest profit is at (20,15) with ₹2,400.",
    hint: "Evaluate Z at each corner.",
    level: "moderate"
  },
  {
    question: "Why does the optimal solution occur at a corner point?",
    shortAnswer: "Because the objective function is linear and the feasible region is convex.",
    explanation: "In LP, the maximum of a linear function over a convex polygon occurs at a vertex.",
    hint: "Linear objective, convex region.",
    level: "expert"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "All three constraints: Machining, Assembly, and Packaging.",
    explanation: "At x₁ = 20, x₂ = 15, all resources are fully used.",
    hint: "Check resource usage.",
    level: "moderate"
  },
  {
    question: "What does it mean if a constraint is binding?",
    shortAnswer: "The resource is fully used at the optimal solution.",
    explanation: "Binding constraints indicate scarce resources that limit production.",
    hint: "Fully utilized resource.",
    level: "moderate"
  },
  {
    question: "If packaging hours increase to 60, what happens to the optimal solution?",
    shortAnswer: "The optimal solution may change because packaging is no longer binding.",
    explanation: "With more packaging capacity, the constraint shifts outward, potentially allowing more production.",
    hint: "More capacity may change the optimum.",
    level: "expert"
  },
  {
    question: "What is the profit at the optimal solution?",
    shortAnswer: "₹2,400.",
    explanation: "At x₁ = 20 and x₂ = 15, Z = 60(20) + 80(15) = 1,200 + 1,200 = 2,400.",
    hint: "Maximum profit value.",
    level: "basic"
  },
  {
    question: "How would you validate the optimal solution?",
    shortAnswer: "Check that all constraints are satisfied and the objective is maximized.",
    explanation: "At x₁ = 20, x₂ = 15: all constraints are exactly met (binding).",
    hint: "Verify feasibility and optimality.",
    level: "moderate"
  },
  {
    question: "What if Product X's profit increases to ₹80 per unit?",
    shortAnswer: "The objective function changes to Z = 80x₁ + 80x₂, potentially changing the optimal mix.",
    explanation: "Higher profit for Product X may make it more attractive to produce.",
    hint: "Profit change affects objective.",
    level: "moderate"
  },
  {
    question: "What is the significance of all resources being binding at the optimum?",
    shortAnswer: "It means the company has no excess capacity in any resource.",
    explanation: "All resources are fully utilized, indicating efficient production.",
    hint: "No slack resources.",
    level: "expert"
  },
  {
    question: "Can a profit maximization problem have multiple optimal solutions?",
    shortAnswer: "Yes, if the objective function is parallel to a constraint boundary.",
    explanation: "Multiple optimal solutions occur when the objective function has the same slope as a binding constraint.",
    hint: "Parallel lines cause multiple optima.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in profit maximization?",
    shortAnswer: "To ensure production quantities are non-negative (can't produce negative units).",
    explanation: "All production quantities must be ≥ 0 for physical feasibility.",
    hint: "No negative production.",
    level: "basic"
  },
  {
    question: "How many variables are in the profit maximization example?",
    shortAnswer: "2 variables: x₁ and x₂.",
    explanation: "One for each product (Product X and Product Y).",
    hint: "Count the products.",
    level: "basic"
  },
  {
    question: "What is the difference between a profit maximization and a cost minimization problem?",
    shortAnswer: "Profit maximization seeks the highest profit; cost minimization seeks the lowest cost.",
    explanation: "Both are optimization problems with different objectives.",
    hint: "Profit vs cost.",
    level: "basic"
  },
  {
    question: "What is the feasible region in a profit maximization problem?",
    shortAnswer: "The set of all production combinations that satisfy all constraints.",
    explanation: "The feasible region contains all possible solutions that respect resource limits.",
    hint: "All allowed production mixes.",
    level: "basic"
  },
  {
    question: "Why is the graphical method useful for profit maximization problems?",
    shortAnswer: "It provides a visual representation of the problem and solution.",
    explanation: "For 2-variable problems, the graphical method is intuitive and educational.",
    hint: "Visual helps understanding.",
    level: "moderate"
  },
  {
    question: "What is the contribution margin of Product X?",
    shortAnswer: "₹60 per unit (price minus variable cost).",
    explanation: "The contribution margin is the profit per unit before fixed costs.",
    hint: "Profit per unit.",
    level: "moderate"
  },
  {
    question: "What is the contribution margin of Product Y?",
    shortAnswer: "₹80 per unit.",
    explanation: "Product Y contributes ₹80 per unit to profit.",
    hint: "Profit per unit.",
    level: "moderate"
  },
  {
    question: "What does the slope of the objective function represent?",
    shortAnswer: "The trade-off rate between producing Product X and Product Y.",
    explanation: "The slope indicates how many units of X must be sacrificed to produce one more unit of Y.",
    hint: "Trade-off between products.",
    level: "expert"
  },
  {
    question: "How do you know if a solution is optimal without checking all corners?",
    shortAnswer: "Use the simplex method or check that no neighboring corner has a higher objective value.",
    explanation: "In LP, the optimal solution is at a corner; checking adjacent corners can confirm optimality.",
    hint: "Check adjacent corners.",
    level: "expert"
  },
  {
    question: "What is the economic interpretation of the optimal solution?",
    shortAnswer: "The company should produce 20 units of X and 15 units of Y for maximum profit.",
    explanation: "This mix maximizes total profit given the limited resources.",
    hint: "Best production decision.",
    level: "moderate"
  }
];

export default questions;