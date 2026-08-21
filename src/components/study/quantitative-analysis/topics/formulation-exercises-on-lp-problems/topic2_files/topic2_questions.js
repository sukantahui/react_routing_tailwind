const questions = [
  {
    question: "What is the objective of a profit maximization problem?",
    shortAnswer: "To maximize total profit by determining the optimal quantities of products to produce.",
    explanation: "Profit maximization problems aim to find the production quantities that generate the highest possible profit, subject to resource constraints.",
    hint: "Maximize profit, not revenue.",
    level: "basic",
    codeExample: "Maximize Z = 40x + 50y (Profit from chairs and tables)"
  },
  {
    question: "How is profit different from revenue?",
    shortAnswer: "Profit is revenue minus costs; revenue is the total income from sales.",
    explanation: "Revenue = Price × Quantity. Profit = Revenue - Total Costs. Profit maximization considers both income and expenses.",
    hint: "Profit = Revenue - Cost.",
    level: "basic",
    codeExample: "Revenue = 100x + 80y, Profit = (100-60)x + (80-50)y"
  },
  {
    question: "What are the key components of a profit maximization LP problem?",
    shortAnswer: "Decision variables (product quantities), profit coefficients, resource constraints, and non-negativity constraints.",
    explanation: "Variables represent quantities of each product. Profit coefficients are profit per unit. Resource constraints limit production. Non-negativity ensures quantities are positive.",
    hint: "Variables, profit per unit, constraints.",
    level: "basic",
    codeExample: "Maximize Z = p₁x + p₂y, subject to resource constraints, x, y ≥ 0"
  },
  {
    question: "How do you calculate profit per unit?",
    shortAnswer: "Profit per unit = Selling price per unit - Variable cost per unit.",
    explanation: "Fixed costs are not included in per-unit profit calculations because they don't change with production quantity. They affect total profit but not the optimal mix.",
    hint: "Price - Variable Cost = Profit per unit.",
    level: "intermediate",
    codeExample: "Price = ₹100, Variable Cost = ₹60 → Profit = ₹40 per unit"
  },
  {
    question: "What is the difference between profit maximization and cost minimization?",
    shortAnswer: "Profit maximization seeks the highest profit with ≤ constraints; cost minimization seeks the lowest cost with ≥ constraints.",
    explanation: "Profit maximization is typically used for production planning. Cost minimization is used for diet planning, blending, and purchasing problems.",
    hint: "Max profit vs. min cost.",
    level: "intermediate",
    codeExample: "Max Z = 40x + 50y vs. Min Z = 20x + 30y"
  },
  {
    question: "Why are resource constraints important in profit maximization?",
    shortAnswer: "Resources limit how much you can produce, so they determine the maximum possible profit.",
    explanation: "Without resource constraints, you could produce unlimited quantities. Real-world problems always have limited resources like labor, materials, and capital.",
    hint: "Limited resources limit profit.",
    level: "basic",
    codeExample: "Labor: 2x + 3y ≤ 120, Materials: 3x + 2y ≤ 90"
  },
  {
    question: "What happens if a product has negative profit?",
    shortAnswer: "The optimal solution would produce zero units of that product (unless there's a minimum requirement).",
    explanation: "If a product loses money (negative profit), you wouldn't produce it unless required by contract or for other business reasons.",
    hint: "Don't produce losing products.",
    level: "intermediate",
    codeExample: "If profit = -₹10 per unit, produce x = 0"
  },
  {
    question: "How do fixed costs affect profit maximization?",
    shortAnswer: "Fixed costs don't affect the optimal product mix but do affect the total profit amount.",
    explanation: "Fixed costs are constant regardless of production quantity. They shift the profit line but don't change the optimal quantities.",
    hint: "Fixed costs don't change the optimal mix.",
    level: "intermediate",
    codeExample: "Z = (Price - Variable Cost)x + (Price - Variable Cost)y - Fixed Costs"
  },
  {
    question: "What is the role of contribution margin in profit maximization?",
    shortAnswer: "Contribution margin (price - variable cost) determines the profit per unit and is used in the objective function.",
    explanation: "Contribution margin shows how much each unit contributes to covering fixed costs and generating profit. Products with higher contribution margins are typically preferred.",
    hint: "Contribution margin = profit per unit.",
    level: "intermediate",
    codeExample: "Contribution margin = ₹40 for product A, ₹50 for product B"
  },
  {
    question: "Can profit maximization problems have multiple optimal solutions?",
    shortAnswer: "Yes, when the objective function is parallel to a binding constraint, multiple product mixes give the same profit.",
    explanation: "This happens when the profit ratio equals the resource usage ratio for two products.",
    hint: "Same profit from different mixes.",
    level: "advanced",
    codeExample: "Both (50,0) and (0,40) give the same profit"
  },
  {
    question: "What is the economic interpretation of shadow prices in profit maximization?",
    shortAnswer: "Shadow prices represent the maximum amount you should pay for additional resources.",
    explanation: "If a resource has a shadow price of ₹2.50, each additional unit of that resource adds ₹2.50 to profit. You should pay up to ₹2.50 for more of that resource.",
    hint: "Value of additional resources.",
    level: "advanced",
    codeExample: "Shadow price = ₹2.50/hour → Pay up to ₹2.50 for extra hours"
  },
  {
    question: "How do you handle minimum production requirements in profit maximization?",
    shortAnswer: "Add constraints like x ≥ min_x to ensure minimum quantities are produced.",
    explanation: "Some products may have minimum production requirements due to contracts, market presence, or strategic reasons.",
    hint: "Minimum requirements as constraints.",
    level: "intermediate",
    codeExample: "x ≥ 20 (minimum chairs to produce)"
  },
  {
    question: "What is the difference between maximizing profit and maximizing contribution margin?",
    shortAnswer: "Maximizing profit considers all costs; maximizing contribution margin focuses on variable costs only.",
    explanation: "If fixed costs are constant, maximizing contribution margin is equivalent to maximizing profit. This simplifies the problem.",
    hint: "Contribution margin = Revenue - Variable Cost.",
    level: "advanced",
    codeExample: "Maximize total contribution margin = Σ(Price - Variable Cost) × Quantity"
  },
  {
    question: "How do you formulate a profit maximization problem with multiple products?",
    shortAnswer: "Extend the two-product formulation: Max Z = p₁x₁ + p₂x₂ + ... + pₙxₙ.",
    explanation: "Each product has its own profit per unit and resource requirements. Add variables and terms for each product.",
    hint: "Add variables and profit terms.",
    level: "advanced",
    codeExample: "Max Z = 40x + 50y + 30z (three products)"
  },
  {
    question: "What is the relationship between profit maximization and resource allocation?",
    shortAnswer: "Profit maximization allocates resources to products that generate the highest profit per unit of resource.",
    explanation: "The LP model optimally allocates limited resources across products to maximize total profit.",
    hint: "Resources go to most profitable products.",
    level: "intermediate",
    codeExample: "Allocate labor hours to products with highest profit per hour"
  },
  {
    question: "How do you identify the bottleneck in a profit maximization problem?",
    shortAnswer: "The bottleneck is the resource with zero slack at the optimal solution.",
    explanation: "Binding constraints indicate resources that are fully utilized. These are the bottlenecks that limit profit.",
    hint: "Fully utilized resource = bottleneck.",
    level: "intermediate",
    codeExample: "Labor: 2x + 3y = 120 (binding) → Labor is the bottleneck"
  },
  {
    question: "What is the practical significance of profit maximization LP?",
    shortAnswer: "It helps businesses make optimal production decisions to maximize profitability.",
    explanation: "Profit maximization LP guides managers on what to produce and in what quantities to achieve the highest profit.",
    hint: "Guide production decisions.",
    level: "basic",
    codeExample: "What products to produce and how many."
  },
  {
    question: "How does demand affect profit maximization?",
    shortAnswer: "Demand constraints limit production to market demand, adding upper bounds.",
    explanation: "You can't sell more than the market demands. Add constraints like x ≤ demand_x to reflect this.",
    hint: "Can't exceed market demand.",
    level: "intermediate",
    codeExample: "x ≤ 100, y ≤ 80 (demand constraints)"
  },
  {
    question: "What is the difference between maximizing profit and maximizing revenue?",
    shortAnswer: "Revenue maximization ignores costs; profit maximization considers both revenue and costs.",
    explanation: "Revenue maximization might recommend producing low-profit products. Profit maximization focuses on what's actually profitable.",
    hint: "Profit = Revenue - Cost.",
    level: "intermediate",
    codeExample: "Revenue: Max R = 100x + 80y\nProfit: Max Z = 40x + 30y"
  }
];

export default questions;