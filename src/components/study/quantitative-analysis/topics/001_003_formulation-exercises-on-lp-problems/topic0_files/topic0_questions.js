const questions = [
  {
    question: "What is a product-mix problem in linear programming?",
    shortAnswer: "A product-mix problem determines the optimal quantity of each product to produce to maximize profit given limited resources.",
    explanation: "Product-mix problems help companies decide how much of each product to manufacture when resources like labor, materials, and machine time are limited. The goal is to maximize total profit while respecting resource constraints.",
    hint: "Think about choosing the right combination of products.",
    level: "basic",
    codeExample: "Maximize Z = 40x + 50y\nSubject to: 2x + 3y ≤ 120, 3x + 2y ≤ 90, x, y ≥ 0"
  },
  {
    question: "What are the key components of a product-mix LP problem?",
    shortAnswer: "Decision variables, objective function, resource constraints, and non-negativity constraints.",
    explanation: "Decision variables represent quantities of each product. The objective function (usually profit maximization) uses per-unit profits. Resource constraints limit production based on available resources. Non-negativity ensures production quantities aren't negative.",
    hint: "Variables, objective, constraints, non-negativity.",
    level: "basic",
    codeExample: "Variables: x, y; Objective: Max Z = c₁x + c₂y; Constraints: a₁x + a₂y ≤ b₁; Non-negativity: x, y ≥ 0"
  },
  {
    question: "How do you formulate the objective function in a product-mix problem?",
    shortAnswer: "Maximize Z = (profit per unit of product 1) × (units of product 1) + (profit per unit of product 2) × (units of product 2) + ...",
    explanation: "The objective function sums the profit contribution from each product. Each term is the per-unit profit multiplied by the quantity produced of that product.",
    hint: "Sum of profits from all products.",
    level: "basic",
    codeExample: "Maximize Z = 40x + 50y (where x and y are units of two products)"
  },
  {
    question: "What are resource constraints in product-mix problems?",
    shortAnswer: "Resource constraints limit production based on available resources like labor hours, materials, and machine capacity.",
    explanation: "Each resource constraint has the form: (resource used per unit of product 1) × (units of product 1) + (resource used per unit of product 2) × (units of product 2) ≤ available resource.",
    hint: "Limited resources restrict production.",
    level: "basic",
    codeExample: "Labor: 2x + 3y ≤ 120 (hours), Materials: 3x + 2y ≤ 90 (units)"
  },
  {
    question: "Why are non-negativity constraints important in product-mix problems?",
    shortAnswer: "Non-negativity constraints ensure production quantities cannot be negative, which is realistic for real-world production.",
    explanation: "Production quantities must be zero or positive. Negative production doesn't make sense in real-world scenarios. These constraints also restrict the feasible region to the first quadrant.",
    hint: "Production can't be negative.",
    level: "basic",
    codeExample: "x ≥ 0, y ≥ 0"
  },
  {
    question: "What is the difference between a product-mix problem and other LP problems?",
    shortAnswer: "Product-mix problems specifically focus on choosing quantities of multiple products to maximize profit with resource constraints.",
    explanation: "While all LP problems optimize an objective subject to constraints, product-mix problems have a distinct structure: variables are product quantities, the objective is profit maximization, and constraints are resource limitations.",
    hint: "Products, resources, profit.",
    level: "intermediate",
    codeExample: "Product-mix: Max profit with resource constraints\nOther LP: Could be cost minimization, transportation, etc."
  },
  {
    question: "How do you identify decision variables in a product-mix problem?",
    shortAnswer: "Decision variables are the quantities of each product to be produced.",
    explanation: "Read the problem carefully to identify what you're being asked to decide. Usually, it's 'how many of each product to produce.' These quantities become your variables.",
    hint: "What are you trying to decide?",
    level: "basic",
    codeExample: "Let x = number of chairs, y = number of tables"
  },
  {
    question: "What does the coefficient of a variable in the objective function represent?",
    shortAnswer: "The coefficient represents the profit (or cost) per unit of that product.",
    explanation: "In a maximization problem, the coefficient is the profit per unit. In a minimization problem, it would be the cost per unit. These coefficients are typically given in the problem statement.",
    hint: "Profit or cost per unit.",
    level: "intermediate",
    codeExample: "In Z = 40x + 50y, 40 is the profit per unit of x, 50 is the profit per unit of y"
  },
  {
    question: "What does the coefficient of a variable in a resource constraint represent?",
    shortAnswer: "The coefficient represents the amount of that resource required to produce one unit of that product.",
    explanation: "Each coefficient in a constraint shows how much of a specific resource (labor, material, etc.) is consumed by producing one unit of a product.",
    hint: "Resource usage per unit.",
    level: "intermediate",
    codeExample: "In 2x + 3y ≤ 120, 2 is labor hours per unit of x, 3 is labor hours per unit of y"
  },
  {
    question: "What is the feasible region in a product-mix problem?",
    shortAnswer: "The feasible region is the set of all production quantities that satisfy all resource and non-negativity constraints.",
    explanation: "Any point in the feasible region represents a possible production plan that doesn't exceed resource limits. The optimal solution will be at a corner point of this region.",
    hint: "All possible production plans.",
    level: "intermediate",
    codeExample: "Region where 2x + 3y ≤ 120, 3x + 2y ≤ 90, x ≥ 0, y ≥ 0"
  },
  {
    question: "What happens if a product-mix problem has no feasible solution?",
    shortAnswer: "The problem becomes infeasible, meaning no production plan satisfies all constraints.",
    explanation: "This can happen if constraints are contradictory or if resource requirements exceed available resources. The problem must be reformulated.",
    hint: "No solution exists.",
    level: "advanced",
    codeExample: "If x + y ≤ 5 and x + y ≥ 8, no feasible solution exists"
  },
  {
    question: "How do you interpret the optimal solution of a product-mix problem?",
    shortAnswer: "The optimal solution tells you how many of each product to produce and the maximum profit achievable.",
    explanation: "The optimal values of variables give the production quantities. The objective value gives the maximum profit. You should also check resource utilization.",
    hint: "What to produce and how much profit.",
    level: "intermediate",
    codeExample: "Optimal: x = 24, y = 24, Z = ₹2,160"
  },
  {
    question: "What is the role of resources in product-mix problems?",
    shortAnswer: "Resources limit production and determine which product mixes are feasible.",
    explanation: "Each product consumes resources. Limited resources mean you can't produce unlimited quantities. Resources are the 'constraints' that shape the feasible region.",
    hint: "Resources constrain production.",
    level: "basic",
    codeExample: "Labor, materials, machine time, budget all act as resources"
  },
  {
    question: "How do you handle multiple resources in a product-mix problem?",
    shortAnswer: "Each resource becomes a separate constraint in the LP formulation.",
    explanation: "For each resource, write a constraint that sums the resource usage across all products and limits it to the available amount. This creates a system of constraints.",
    hint: "One constraint per resource.",
    level: "intermediate",
    codeExample: "Labor: 2x + 3y ≤ 120, Materials: 3x + 2y ≤ 90"
  },
  {
    question: "What is a binding constraint in a product-mix problem?",
    shortAnswer: "A binding constraint is one that is fully utilized at the optimal solution (slack = 0).",
    explanation: "At the optimal production mix, one or more resources will be fully used. These binding constraints represent bottlenecks that limit production.",
    hint: "Resource fully used.",
    level: "intermediate",
    codeExample: "If labor: 2x + 3y = 120 at optimal, labor is binding"
  },
  {
    question: "What is slack in a product-mix problem?",
    shortAnswer: "Slack is the amount of a resource that remains unused at the optimal solution.",
    explanation: "Slack = Available resource - Used resource. A positive slack indicates the resource is not a constraint. Zero slack means the resource is binding.",
    hint: "Unused resource capacity.",
    level: "intermediate",
    codeExample: "If 100 hours available and 80 used, slack = 20 hours"
  },
  {
    question: "What is the economic meaning of shadow prices in product-mix problems?",
    shortAnswer: "Shadow prices indicate how much profit would increase if one more unit of a resource were available.",
    explanation: "For binding constraints, the shadow price tells you the maximum amount you should be willing to pay for additional resources.",
    hint: "Value of additional resources.",
    level: "advanced",
    codeExample: "Shadow price = ₹2/hour means each extra hour adds ₹2 to profit"
  },
  {
    question: "Can product-mix problems have multiple optimal solutions?",
    shortAnswer: "Yes, when the objective function is parallel to a binding constraint, multiple production mixes give the same profit.",
    explanation: "When the profit per unit ratios are the same as the resource usage ratios, different combinations of products yield the same profit.",
    hint: "Same profit from different mixes.",
    level: "advanced",
    codeExample: "If profit ratio equals resource usage ratio, multiple solutions exist"
  },
  {
    question: "What is a redundant constraint in a product-mix problem?",
    shortAnswer: "A redundant constraint doesn't affect the feasible region or optimal solution.",
    explanation: "If a resource is so abundant that it's never fully used, its constraint is redundant and can be removed without changing the solution.",
    hint: "Constraint that doesn't matter.",
    level: "advanced",
    codeExample: "If materials are abundant, material constraint is redundant"
  },
  {
    question: "How do you formulate a product-mix problem with three or more products?",
    shortAnswer: "Extend the two-variable formulation by adding variables and corresponding terms in the objective and constraints.",
    explanation: "For three products, you'd have variables x, y, z. The objective becomes Z = c₁x + c₂y + c₃z. Each constraint adds coefficients for z.",
    hint: "Add variables and terms.",
    level: "advanced",
    codeExample: "Max Z = 40x + 50y + 30z\nSubject to: 2x + 3y + 1z ≤ 120, 3x + 2y + 2z ≤ 90"
  },
  {
    question: "What is the difference between product-mix and resource allocation problems?",
    shortAnswer: "Product-mix problems focus on choosing product quantities; resource allocation focuses on assigning resources to different uses.",
    explanation: "Product-mix: decide how many of each product. Resource allocation: decide how to distribute available resources among competing activities or departments.",
    hint: "Products vs. resources.",
    level: "intermediate",
    codeExample: "Product-mix: how many chairs and tables\nResource allocation: how to allocate budget to departments"
  },
  {
    question: "Why is it important to consider integer constraints in product-mix problems?",
    shortAnswer: "Some products must be produced in whole units, requiring integer programming.",
    explanation: "If products are discrete items (like chairs, tables, cars), fractional solutions may not be feasible. Integer programming ensures whole units.",
    hint: "Can't produce half a chair.",
    level: "advanced",
    codeExample: "x, y must be integers (whole numbers)"
  },
  {
    question: "What is the role of sensitivity analysis in product-mix problems?",
    shortAnswer: "Sensitivity analysis examines how changes in parameters affect the optimal product mix.",
    explanation: "It answers questions like: What if profit changes? What if resource availability changes? This helps managers make decisions under uncertainty.",
    hint: "How changes affect the solution.",
    level: "advanced",
    codeExample: "How much can profit change before the product mix changes?"
  },
  {
    question: "How do you handle product-mix problems with multiple production stages?",
    shortAnswer: "Create constraints for each production stage based on resource usage at that stage.",
    explanation: "If products go through multiple stages (assembly, painting, packaging), each stage has separate resource constraints.",
    hint: "One constraint per stage.",
    level: "advanced",
    codeExample: "Assembly: 2x + 3y ≤ 100, Painting: 1x + 2y ≤ 80"
  },
  {
    question: "What is the relationship between product-mix and profit maximization?",
    shortAnswer: "Product-mix problems are typically profit maximization problems with resource constraints.",
    explanation: "The objective is to maximize total profit by choosing the right product mix. Resources limit what's achievable.",
    hint: "Max profit with limited resources.",
    level: "basic",
    codeExample: "Maximize Z = profit contribution from all products"
  },
  {
    question: "How do you identify the optimal product mix from a graph?",
    shortAnswer: "The optimal mix is at the corner point of the feasible region that gives the highest profit.",
    explanation: "Graph all constraints, find the feasible region, evaluate profit at each corner point, and choose the highest value.",
    hint: "Highest profit corner point.",
    level: "intermediate",
    codeExample: "Evaluate Z at (0,0), (30,0), (18,24), (0,40)"
  },
  {
    question: "What is the practical importance of product-mix problems in business?",
    shortAnswer: "They help businesses make data-driven production decisions that maximize profitability.",
    explanation: "Product-mix problems guide managers on what to produce and in what quantities, ensuring the best use of limited resources.",
    hint: "Guide production decisions.",
    level: "basic",
    codeExample: "What products to produce and how many."
  },
  {
    question: "How do market demand constraints affect product-mix problems?",
    shortAnswer: "Market demand adds upper bounds on production quantities.",
    explanation: "You can't sell more than the market demands, so constraints like x ≤ demand_x and y ≤ demand_y must be included.",
    hint: "Can't exceed market demand.",
    level: "intermediate",
    codeExample: "x ≤ 100, y ≤ 80 (demand constraints)"
  },
  {
    question: "What is the difference between maximizing profit and maximizing revenue?",
    shortAnswer: "Profit = Revenue - Cost; Revenue is total sales without considering costs.",
    explanation: "Some problems maximize revenue when costs are fixed. Others maximize profit when costs vary with production.",
    hint: "Profit accounts for costs.",
    level: "intermediate",
    codeExample: "Revenue: Max R = 100x + 80y\nProfit: Max Z = (100-60)x + (80-50)y"
  },
  {
    question: "How do you handle minimum production requirements in product-mix problems?",
    shortAnswer: "Add minimum constraints like x ≥ min_x to ensure minimum production levels.",
    explanation: "Some products must be produced to meet contracts, maintain market presence, or utilize resources.",
    hint: "Minimum production requirements.",
    level: "intermediate",
    codeExample: "x ≥ 20 (minimum chairs to produce)"
  },
  {
    question: "What is the impact of storage constraints on product-mix problems?",
    shortAnswer: "Storage constraints limit how much inventory can be held, adding upper bounds on production.",
    explanation: "If storage space is limited, you may not be able to produce more than you can store, even if resources allow.",
    hint: "Limited storage capacity.",
    level: "advanced",
    codeExample: "x + y ≤ 50 (total storage capacity)"
  }
];

export default questions;