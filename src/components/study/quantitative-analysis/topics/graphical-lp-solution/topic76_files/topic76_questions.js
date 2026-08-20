const questions = [
  {
    question: "What is resource availability in LP?",
    shortAnswer: "Resource availability is the maximum amount of a resource that can be used, represented by the RHS of constraints.",
    explanation: "In LP, each constraint represents a resource limit. The RHS value (b) is the total amount of that resource available. At the optimal solution, we compare actual usage to availability.",
    hint: "RHS value = resource availability.",
    level: "basic",
    codeExample: "2x + y ≤ 10 → 10 units of resource available"
  },
  {
    question: "How do you calculate resource usage at the optimal solution?",
    shortAnswer: "Substitute the optimal values of variables into the left-hand side of each constraint.",
    explanation: "For each constraint a₁x + a₂y ≤ b, the resource usage is a₁x* + a₂y* where (x*, y*) is the optimal solution. This tells you how much of each resource is actually used.",
    hint: "LHS at optimal = resource usage.",
    level: "intermediate",
    codeExample: "Constraint: 2x + y ≤ 10\nOptimal: (4, 2)\nUsage: 2(4) + 2 = 10"
  },
  {
    question: "What is slack in resource availability?",
    shortAnswer: "Slack is the difference between available and used resources: Slack = Available - Used.",
    explanation: "Slack represents unused capacity. If slack = 0, the resource is fully utilized (binding). If slack > 0, there is unused capacity.",
    hint: "Slack = Available - Used.",
    level: "basic",
    codeExample: "Available: 10, Used: 8 → Slack: 2 units"
  },
  {
    question: "What is a bottleneck resource?",
    shortAnswer: "A bottleneck resource is one that is fully utilized (slack = 0) and limits the optimal solution.",
    explanation: "Bottleneck resources are binding constraints. They have zero slack and positive shadow prices. Expanding these resources can increase the objective value.",
    hint: "Fully utilized = bottleneck.",
    level: "intermediate",
    codeExample: "Slack = 0 → Bottleneck\nShadow price > 0"
  },
  {
    question: "How do you interpret resource utilization percentage?",
    shortAnswer: "Utilization = (Used / Available) × 100%. 100% means fully utilized; less means slack exists.",
    explanation: "Utilization percentage tells you how much of the available resource is being used at the optimal solution. Higher utilization means the resource is more critical.",
    hint: "Used/Available × 100%.",
    level: "basic",
    codeExample: "Used: 8, Available: 10 → Utilization: 80%"
  },
  {
    question: "What does it mean if a resource has 100% utilization?",
    shortAnswer: "100% utilization means the resource is fully utilized and is a bottleneck.",
    explanation: "When a resource has 100% utilization, slack = 0. The resource is binding at the optimal solution and limits further improvement.",
    hint: "100% = bottleneck.",
    level: "basic",
    codeExample: "Utilization: 100% → Bottleneck resource"
  },
  {
    question: "What does it mean if a resource has 0% utilization?",
    shortAnswer: "0% utilization means the resource is completely unused (rare in optimal solutions).",
    explanation: "0% utilization would mean the resource isn't used at all. This is unusual in optimal solutions unless the resource is completely irrelevant or redundant.",
    hint: "0% = completely unused.",
    level: "intermediate",
    codeExample: "Utilization: 0% → Resource not used"
  },
  {
    question: "How does slack relate to shadow prices?",
    shortAnswer: "Resources with slack have zero shadow prices. Resources with zero slack may have positive shadow prices.",
    explanation: "If there's slack (unused capacity), additional resources don't help, so shadow price = 0. If slack = 0, the resource is scarce and may have positive shadow price.",
    hint: "Slack > 0 → Shadow price = 0.",
    level: "advanced",
    codeExample: "Slack: 5 → Shadow price: 0\nSlack: 0 → Shadow price: 2.5"
  },
  {
    question: "Can a resource have negative slack?",
    shortAnswer: "No, negative slack means the resource is overused, which is infeasible.",
    explanation: "Slack = Available - Used. If slack is negative, usage exceeds availability, violating the constraint. This means the point is infeasible.",
    hint: "Negative slack = infeasible.",
    level: "intermediate",
    codeExample: "Available: 10, Used: 12 → Slack: -2 (infeasible)"
  },
  {
    question: "How do you identify bottlenecks from a graph?",
    shortAnswer: "Bottlenecks are constraint lines that pass through the optimal point on the graph.",
    explanation: "On a graph, the optimal solution is at a corner point. Any constraint line that passes through this corner is binding (slack = 0) and is a bottleneck.",
    hint: "Lines through optimal point = bottlenecks.",
    level: "intermediate",
    codeExample: "Constraint lines intersecting at optimal point → Bottlenecks"
  },
  {
    question: "What is the difference between available and used resources?",
    shortAnswer: "Available is the total resource capacity (RHS); used is the actual consumption at the optimal solution (LHS).",
    explanation: "Available resources are the limits set by constraints. Used resources are what the optimal solution actually consumes. The difference is slack.",
    hint: "RHS = Available, LHS = Used.",
    level: "basic",
    codeExample: "Available: 20, Used: 15 → Slack: 5"
  },
  {
    question: "How does resource availability affect the optimal solution?",
    shortAnswer: "Changes in resource availability (RHS) can shift the optimal solution and change the objective value.",
    explanation: "Increasing available resources (outward shift) can improve the objective. Decreasing resources (inward shift) can worsen it. The shadow price determines the rate of change.",
    hint: "More resources = better (usually).",
    level: "intermediate",
    codeExample: "RHS increases → Z may increase"
  },
  {
    question: "What is the practical significance of slack?",
    shortAnswer: "Slack represents unused capacity that could be used for additional production or other purposes.",
    explanation: "Resources with slack are not limiting production. This capacity could be used for new products, buffer stock, or could be reduced to save costs.",
    hint: "Slack = opportunity for growth.",
    level: "intermediate",
    codeExample: "Machine slack: 5 hours → Could produce more"
  },
  {
    question: "How do you calculate utilization for multiple resources?",
    shortAnswer: "Calculate utilization for each resource individually using the formula Used/Available × 100%.",
    explanation: "Each resource has its own utilization percentage. Some may be 100% (bottlenecks), others less (slack). This gives a complete picture of resource usage.",
    hint: "Calculate for each resource separately.",
    level: "intermediate",
    codeExample: "Resource A: 80%, Resource B: 100%, Resource C: 60%"
  },
  {
    question: "What is the relationship between slack and feasibility?",
    shortAnswer: "All feasible points have non-negative slack for all ≤ constraints.",
    explanation: "Feasibility requires that usage does not exceed availability for any constraint. This means slack ≥ 0 for all constraints.",
    hint: "Slack ≥ 0 = feasible.",
    level: "basic",
    codeExample: "All constraints: slack ≥ 0 → Feasible"
  },
  {
    question: "How do you interpret a resource with 90% utilization?",
    shortAnswer: "90% utilization means 10% of the resource remains unused (slack).",
    explanation: "This resource is not a bottleneck but is nearly fully utilized. Small increases in production might make it a bottleneck.",
    hint: "90% = near bottleneck.",
    level: "intermediate",
    codeExample: "Utilization: 90% → Slack: 10%"
  },
  {
    question: "What is the difference between slack and surplus?",
    shortAnswer: "Slack applies to ≤ constraints (unused capacity); surplus applies to ≥ constraints (excess above requirement).",
    explanation: "Slack = Available - Used for ≤ constraints. Surplus = Used - Required for ≥ constraints. Both represent the 'gap' but in different directions.",
    hint: "Slack for ≤, surplus for ≥.",
    level: "intermediate",
    codeExample: "Slack: 2x + y ≤ 10 → slack\nSurplus: 2x + y ≥ 10 → surplus"
  },
  {
    question: "How does resource availability affect the feasible region?",
    shortAnswer: "Resource availability determines the boundaries of the feasible region. More availability expands the region; less shrinks it.",
    explanation: "Each constraint forms a boundary of the feasible region. The RHS values determine where these boundaries are located.",
    hint: "RHS = boundary position.",
    level: "basic",
    codeExample: "RHS increases → Boundary moves outward → Region expands"
  },
  {
    question: "What is the role of shadow prices in resource interpretation?",
    shortAnswer: "Shadow prices indicate the value of additional resource units and help prioritize resource expansion.",
    explanation: "Resources with higher shadow prices are more valuable to expand. They provide the greatest increase in objective value per unit of resource.",
    hint: "High shadow price = valuable to expand.",
    level: "advanced",
    codeExample: "Shadow price: A=2.5, B=1.0 → Expand A first"
  },
  {
    question: "Can a resource have 100% utilization and zero shadow price?",
    shortAnswer: "No, if a resource has 100% utilization (is binding), it must have a positive shadow price (for maximization).",
    explanation: "If a resource is fully utilized, it's scarce. Scarce resources have positive value, so shadow price > 0 (for maximization problems).",
    hint: "100% utilization → Shadow price > 0.",
    level: "advanced",
    codeExample: "Binding constraint → Shadow price > 0"
  },
  {
    question: "How do you interpret the difference between two resources' utilization?",
    shortAnswer: "Different utilization levels indicate which resources are bottlenecks and which have excess capacity.",
    explanation: "Comparing utilizations helps identify priorities. Resources with higher utilization are more critical and should be expanded first.",
    hint: "Higher utilization = more critical.",
    level: "intermediate",
    codeExample: "A: 100%, B: 75% → Expand A first"
  }
];

export default questions;