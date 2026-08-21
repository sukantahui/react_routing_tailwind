const questions = [
  {
    question: "What is a shadow price in linear programming?",
    shortAnswer: "A shadow price is the marginal value of a resource, representing how much the objective function would improve with one additional unit of that resource.",
    explanation: "Shadow prices, also known as dual variables or Lagrange multipliers, represent the economic value of resources. For a maximization problem, the shadow price tells you how much profit would increase if you had one more unit of the resource. For minimization, it tells you how much cost would decrease.",
    hint: "Think of it as 'what's the most I should pay for one more unit of this resource?'",
    level: "basic",
    codeExample: "If y₁ = ₹50, then each additional unit of Resource 1 increases profit by ₹50."
  },
  {
    question: "What does a positive shadow price indicate economically?",
    shortAnswer: "A positive shadow price indicates the resource is scarce, fully utilized, and has economic value.",
    explanation: "A positive shadow price means: 1) The resource is a bottleneck, 2) It's fully used in the optimal solution, 3) Additional units would improve the objective, 4) The resource has positive economic value. This signals that investment in this resource could be profitable.",
    hint: "Positive shadow price = scarce and valuable resource.",
    level: "intermediate",
    codeExample: "yᵢ > 0 → Resource i is binding and valuable."
  },
  {
    question: "What does a zero shadow price indicate economically?",
    shortAnswer: "A zero shadow price indicates the resource is abundant, not fully utilized, and has no marginal economic value.",
    explanation: "A zero shadow price means: 1) The resource is not a bottleneck, 2) There's surplus capacity, 3) Additional units wouldn't improve the objective, 4) The resource has zero marginal value. This suggests the resource is in surplus.",
    hint: "Zero shadow price = abundant resource with no marginal value.",
    level: "intermediate",
    codeExample: "yᵢ = 0 → Resource i is non-binding and has no marginal value."
  },
  {
    question: "How do shadow prices guide investment decisions?",
    shortAnswer: "Shadow prices indicate which resources are most valuable, guiding investment toward the highest shadow prices.",
    explanation: "Investment decisions should be guided by shadow prices because: 1) Resources with high shadow prices give the highest return on investment, 2) The shadow price equals the maximum you should pay for more of the resource, 3) Prioritize investments with the highest shadow prices.",
    hint: "Invest where shadow prices are highest for maximum return.",
    level: "expert",
    codeExample: "If labor shadow price is ₹100 and machine shadow price is ₹50, invest in labor first."
  },
  {
    question: "What is the relationship between shadow prices and opportunity cost?",
    shortAnswer: "Shadow prices represent the opportunity cost of using a resource in the current optimal solution.",
    explanation: "The shadow price is what you give up by using the resource in one way instead of another. If you use a resource for one product, you forgo the opportunity to use it for another product. The shadow price quantifies this opportunity cost.",
    hint: "Shadow price = what you sacrifice by not using the resource elsewhere.",
    level: "expert",
    codeExample: "If labor has a shadow price of ₹100/hour, using it for one product costs ₹100 in lost opportunity."
  },
  {
    question: "How do shadow prices affect product pricing decisions?",
    shortAnswer: "Shadow prices help determine minimum product prices by accounting for the cost of resources used.",
    explanation: "For a product to be profitable: Price ≥ Cost of Resources Used. The cost of resources is calculated as: Σ(Resource Consumption × Shadow Price). This ensures that products cover their full resource costs.",
    hint: "Products must be priced above the shadow-price cost of their resources.",
    level: "expert",
    codeExample: "If product uses 2 hours of labor (shadow price ₹100) and 1 kg of material (shadow price ₹50), minimum price = ₹250."
  },
  {
    question: "What is the economic interpretation of the dual objective function?",
    shortAnswer: "The dual objective represents the total economic value of all resources at their shadow prices.",
    explanation: "The dual objective W = b₁y₁ + b₂y₂ + ... + bₘyₘ values all resources at their shadow prices. This total value equals the optimal objective value of the primal, showing that the total value of resources equals the total value of the output.",
    hint: "Dual objective = total economic value of all resources at shadow prices.",
    level: "intermediate",
    codeExample: "W = 100(₹50) + 80(₹75) = ₹11,000 = total resource value."
  },
  {
    question: "How do shadow prices identify bottlenecks in production?",
    shortAnswer: "Resources with positive shadow prices are bottlenecks that constrain production and require attention.",
    explanation: "Positive shadow prices identify constraints that are limiting production. These bottlenecks: 1) Are fully utilized, 2) Constrain output, 3) Have economic value, 4) Need investment or management attention. Bottlenecks should be prioritized for improvement.",
    hint: "Positive shadow prices = bottlenecks that need attention.",
    level: "expert",
    codeExample: "If machine time has shadow price ₹200/hour, it's a bottleneck that limits production."
  },
  {
    question: "What is the economic significance of complementary slackness?",
    shortAnswer: "Complementary slackness means that resources with zero shadow prices are in surplus, and resources with positive shadow prices are fully utilized.",
    explanation: "Economically: 1) Surplus resources have zero value, 2) Fully utilized resources have positive value, 3) This reflects the economic principle that only scarce resources command a price, 4) It helps identify which constraints are actually binding.",
    hint: "Only scarce resources have economic value.",
    level: "expert",
    codeExample: "If slack > 0, resource is surplus and y = 0. If y > 0, resource is scarce and fully used."
  },
  {
    question: "How can shadow prices be used for resource allocation?",
    shortAnswer: "Shadow prices guide resource allocation by showing which resources generate the highest returns.",
    explanation: "When allocating resources: 1) Compare shadow prices across resources, 2) Allocate additional resources to those with highest shadow prices, 3) Consider the range of optimality for each shadow price, 4) Balance investment across resources.",
    hint: "Allocate more resources to those with higher shadow prices.",
    level: "expert",
    codeExample: "Allocate overtime to the department with the highest shadow price."
  },
  {
    question: "What is the economic interpretation of dual constraints?",
    shortAnswer: "Dual constraints ensure that the value of resources used to make a product doesn't exceed its price.",
    explanation: "Each dual constraint corresponds to a product and states: Cost of Resources ≤ Price of Product. This ensures that: 1) Products are priced appropriately, 2) Unprofitable products are identified, 3) Resource valuation is consistent, 4) The company doesn't lose money on any product.",
    hint: "Dual constraints prevent selling products below their resource cost.",
    level: "expert",
    codeExample: "2y₁ + y₂ ≥ 40 means product 1 must be priced above ₹40 given resource costs."
  },
  {
    question: "How does duality help in making make-or-buy decisions?",
    shortAnswer: "Shadow prices help determine whether to make a product internally or buy it externally.",
    explanation: "A make-or-buy decision compares: 1) The shadow-price cost of making internally, 2) The external purchase price, 3) If external price < shadow-price cost, buy it. If external price ≥ shadow-price cost, make it. Shadow prices provide the internal cost of production.",
    hint: "Shadow-price cost = true internal cost of making a product.",
    level: "expert",
    codeExample: "If product costs ₹100 to make (shadow-price cost) and ₹90 to buy, buy it."
  },
  {
    question: "What is the economic value of a dual variable in portfolio optimization?",
    shortAnswer: "In portfolio optimization, dual variables represent the market price of risk and the value of returns.",
    explanation: "Dual variables show: 1) The market price of risk (how much risk reduction is worth), 2) The value of expected returns, 3) The marginal value of constraints like minimum return requirements, 4) The trade-off between risk and return.",
    hint: "Dual variables in finance = market prices for risk and return.",
    level: "expert",
    codeExample: "If dual for risk constraint is 0.5, reducing risk by 1% increases value by 0.5%."
  },
  {
    question: "How can shadow prices be used for performance evaluation?",
    shortAnswer: "Shadow prices can evaluate how efficiently resources are being used and identify areas for improvement.",
    explanation: "Performance evaluation using shadow prices: 1) Compare actual resource usage to shadow-price values, 2) Identify resources with high shadow prices (efficient) vs. low shadow prices (inefficient), 3) Set targets for resource utilization, 4) Benchmark against industry standards.",
    hint: "High shadow prices indicate efficient resource utilization.",
    level: "expert",
    codeExample: "If department A has higher shadow prices than department B, A uses resources more efficiently."
  },
  {
    question: "What is the economic interpretation of unbounded dual problems?",
    shortAnswer: "An unbounded dual problem indicates the primal is infeasible or has no economic solution.",
    explanation: "When the dual is unbounded: 1) The primal is infeasible (no feasible solution exists), 2) The resource allocation problem has no valid solution, 3) There's an inconsistency in the constraints, 4) The economic model needs revision.",
    hint: "Unbounded dual = infeasible primal = no economic solution.",
    level: "expert",
    codeExample: "Dual unbounded → Primal infeasible → Problem cannot be solved."
  },
  {
    question: "How do shadow prices relate to market prices?",
    shortAnswer: "Shadow prices are internal values based on optimization, while market prices are external prices determined by supply and demand.",
    explanation: "Shadow prices vs market prices: 1) Shadow prices are internal to your optimization, 2) Market prices are external, 3) If shadow price > market price, you should buy more of the resource, 4) If shadow price < market price, you should sell or reduce usage.",
    hint: "Use shadow prices to decide whether to buy or sell resources.",
    level: "expert",
    codeExample: "If shadow price ₹100 > market price ₹80, buy more. If shadow price ₹50 < market price ₹80, sell."
  },
  {
    question: "What is the economic significance of the dual of the dual?",
    shortAnswer: "The dual of the dual returning to the primal confirms the symmetry of economic interpretation.",
    explanation: "This symmetry means: 1) Resource valuation and production decisions are two sides of the same problem, 2) The economic interpretation is consistent, 3) You can solve either formulation and get the same economic insights, 4) It confirms the mathematical and economic validity of the approach.",
    hint: "The dual and primal are economically symmetric.",
    level: "intermediate",
    codeExample: "Economic insights from primal = economic insights from dual."
  },
  {
    question: "How does duality help in understanding the concept of economic rent?",
    shortAnswer: "Shadow prices represent the economic rent or surplus value of scarce resources.",
    explanation: "Economic rent is the payment to a resource above its opportunity cost. Shadow prices: 1) Represent the economic rent of scarce resources, 2) Show the surplus value created by constraints, 3) Help identify who captures this value, 4) Guide negotiation and pricing decisions.",
    hint: "Shadow price = economic rent for scarce resources.",
    level: "expert",
    codeExample: "If labor shadow price is ₹100/hour, the economic rent to labor is ₹100/hour."
  },
  {
    question: "How can shadow prices be used in supply chain management?",
    shortAnswer: "Shadow prices in supply chains identify bottlenecks, guide capacity investments, and optimize logistics.",
    explanation: "In supply chains: 1) Shadow prices identify bottlenecks in production and distribution, 2) Guide investment in capacity expansion, 3) Optimize inventory levels, 4) Determine optimal logistics strategies, 5) Evaluate supplier performance.",
    hint: "Shadow prices optimize supply chain decisions.",
    level: "expert",
    codeExample: "If warehouse capacity has high shadow price, invest in more warehouse space."
  },
  {
    question: "What is the economic meaning of shadow prices in transportation problems?",
    shortAnswer: "Shadow prices in transportation represent the value of supply and demand at different nodes.",
    explanation: "In transportation: 1) Supply node shadow prices = value of additional supply, 2) Demand node shadow prices = value of additional demand, 3) These show which nodes are most valuable, 4) Guide investment in supply or demand capacity.",
    hint: "Node shadow prices = value of supply or demand at that location.",
    level: "expert",
    codeExample: "If supplier A has shadow price ₹50, additional supply from A is worth ₹50."
  },
  {
    question: "How do shadow prices help in evaluating new products?",
    shortAnswer: "Shadow prices help determine if a new product would be profitable by comparing its price to resource costs.",
    explanation: "To evaluate a new product: 1) Calculate its resource consumption, 2) Multiply by shadow prices to get resource cost, 3) If product price ≥ resource cost, it's profitable, 4) If product price < resource cost, it would reduce overall profit.",
    hint: "Product profitability = Price - Shadow-price cost of resources.",
    level: "expert",
    codeExample: "New product uses resources worth ₹150 at shadow prices. If market price is ₹200, it's profitable."
  }
];

export default questions;