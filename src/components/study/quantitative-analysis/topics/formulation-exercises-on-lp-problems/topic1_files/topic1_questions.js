const questions = [
  {
    question: "What is a resource allocation problem in LP?",
    shortAnswer: "A resource allocation problem involves distributing limited resources among competing activities to achieve the best outcome.",
    explanation: "Unlike product-mix problems that focus on production quantities, resource allocation problems focus on how to best use available resources like money, time, personnel, or materials across different activities or departments.",
    hint: "Think about distributing limited resources optimally.",
    level: "basic",
    codeExample: "Maximize Z = 8x + 6y\nSubject to: x + y ≤ 500, x ≥ 200, y ≥ 100"
  },
  {
    question: "How is a resource allocation problem different from a product-mix problem?",
    shortAnswer: "Product-mix focuses on production quantities; resource allocation focuses on distributing resources across activities.",
    explanation: "In product-mix, you decide how many of each product to make. In resource allocation, you decide how to distribute limited resources (budget, time, personnel) among competing uses.",
    hint: "Products vs. resources.",
    level: "intermediate",
    codeExample: "Product-mix: how many chairs and tables\nResource allocation: how to allocate budget to departments"
  },
  {
    question: "What are the key components of a resource allocation LP problem?",
    shortAnswer: "Decision variables (allocations), objective function, resource constraints, and allocation requirements.",
    explanation: "Decision variables represent amounts allocated to each activity. The objective is typically maximization or minimization. Resource constraints limit total allocations. Requirements may include minimum or maximum allocations.",
    hint: "Variables, objective, constraints, requirements.",
    level: "basic",
    codeExample: "Variables: x, y; Objective: Max Z; Constraints: resource limits; Requirements: min/max allocations"
  },
  {
    question: "How do you formulate the objective function in a resource allocation problem?",
    shortAnswer: "Sum the value or benefit from each activity multiplied by the amount allocated to that activity.",
    explanation: "Each unit of allocation to an activity produces a certain return. The objective sums these returns across all activities.",
    hint: "Sum of benefits from all activities.",
    level: "basic",
    codeExample: "Maximize Z = 8x + 6y (where x and y are allocations)"
  },
  {
    question: "What are resource constraints in resource allocation problems?",
    shortAnswer: "Resource constraints limit how much of each resource can be allocated across activities.",
    explanation: "Each resource has a limited amount available. The total allocation across activities cannot exceed this limit.",
    hint: "Limited resources bound allocation.",
    level: "basic",
    codeExample: "Budget: x + y ≤ 500, Time: 4x + 6y ≤ 240"
  },
  {
    question: "Why are minimum allocation requirements important?",
    shortAnswer: "Minimum requirements ensure critical activities receive adequate resources.",
    explanation: "Some activities may need a minimum allocation to remain operational, meet contracts, or maintain service levels. These requirements are constraints in the LP formulation.",
    hint: "Ensuring critical activities get resources.",
    level: "intermediate",
    codeExample: "x ≥ 200 (minimum budget for department X)"
  },
  {
    question: "What is the difference between resource allocation and resource scheduling?",
    shortAnswer: "Resource allocation decides how much to allocate; scheduling decides when to use allocated resources.",
    explanation: "Allocation determines quantities assigned to different activities. Scheduling determines the timing of resource usage within those allocations.",
    hint: "How much vs. when.",
    level: "intermediate",
    codeExample: "Allocation: 100 hours to project A\nScheduling: when those 100 hours are used"
  },
  {
    question: "How do you handle multiple resources in an allocation problem?",
    shortAnswer: "Each resource becomes a separate constraint in the LP formulation.",
    explanation: "For each type of resource (budget, time, personnel, etc.), create a constraint that sums usage across all activities and limits it to the available amount.",
    hint: "One constraint per resource type.",
    level: "intermediate",
    codeExample: "Budget: x + y ≤ 500, Time: 4x + 6y ≤ 240, Personnel: 2x + 3y ≤ 100"
  },
  {
    question: "What is the role of capacity constraints in resource allocation?",
    shortAnswer: "Capacity constraints limit how much of a resource can be allocated to a specific activity.",
    explanation: "While resource constraints limit total usage across all activities, capacity constraints limit usage by individual activities or departments.",
    hint: "Limits per activity.",
    level: "intermediate",
    codeExample: "x ≤ 100 (department X capacity), y ≤ 120 (department Y capacity)"
  },
  {
    question: "What is a shadow price in resource allocation problems?",
    shortAnswer: "Shadow price indicates how much the objective would improve with one more unit of a resource.",
    explanation: "For binding resource constraints, the shadow price tells you the marginal value of additional resources. This helps in investment and resource acquisition decisions.",
    hint: "Value of additional resources.",
    level: "advanced",
    codeExample: "Shadow price = ₹2 per hour means each extra hour adds ₹2 to value"
  },
  {
    question: "How do you interpret slack in a resource allocation problem?",
    shortAnswer: "Slack is the amount of a resource that remains unused at the optimal allocation.",
    explanation: "Positive slack indicates the resource is not a constraint and could be reduced or redirected without affecting the optimum.",
    hint: "Unused resource capacity.",
    level: "intermediate",
    codeExample: "If 500 available and 480 used, slack = 20 units"
  },
  {
    question: "What is a binding constraint in resource allocation?",
    shortAnswer: "A binding constraint is a resource that is fully utilized at the optimal allocation.",
    explanation: "When slack = 0 for a resource, it's binding. This resource limits the optimal solution and has a positive shadow price.",
    hint: "Fully utilized resource.",
    level: "intermediate",
    codeExample: "If budget: x + y = 500 at optimal, budget is binding"
  },
  {
    question: "How do you handle allocation problems with multiple objectives?",
    shortAnswer: "Multiple objectives can be handled through goal programming, weighted objectives, or trade-off analysis.",
    explanation: "Real-world problems often have multiple objectives. Goal programming minimizes deviations from targets. Weighted objectives combine multiple goals into one objective.",
    hint: "Balancing multiple goals.",
    level: "advanced",
    codeExample: "Maximize profit and minimize environmental impact"
  },
  {
    question: "What are common applications of resource allocation in business?",
    shortAnswer: "Budget allocation, staff scheduling, investment portfolio, and project management.",
    explanation: "Businesses constantly allocate resources: money across departments, staff to projects, investment across assets, and time across activities.",
    hint: "Business resource decisions.",
    level: "basic",
    codeExample: "Budget allocation: how to spend ₹100,000\nStaff scheduling: who works when"
  },
  {
    question: "How do you handle uncertainty in resource allocation problems?",
    shortAnswer: "Use sensitivity analysis, scenario analysis, or stochastic programming.",
    explanation: "Resource availability and returns may be uncertain. Sensitivity analysis examines how changes affect the solution. Scenario analysis explores different possible futures.",
    hint: "Planning for uncertainty.",
    level: "advanced",
    codeExample: "Best-case, worst-case, and most-likely scenarios"
  },
  {
    question: "What is the difference between maximizing and minimizing in resource allocation?",
    shortAnswer: "Maximization seeks the best outcome (profit, value); minimization seeks the least cost or resource use.",
    explanation: "Resource allocation problems can aim to maximize returns, benefits, or value, or minimize costs, time, or resource usage.",
    hint: "Best vs. least.",
    level: "basic",
    codeExample: "Maximize profit, minimize cost"
  },
  {
    question: "How do you formulate a resource allocation problem with fixed costs?",
    shortAnswer: "Fixed costs require binary variables or additional constraints to model.",
    explanation: "If an activity has a fixed cost regardless of allocation level, it needs to be modeled using binary variables (0/1) to decide whether to undertake the activity.",
    hint: "Fixed costs need special handling.",
    level: "advanced",
    codeExample: "Fixed cost: if x > 0 then cost = 1000, else cost = 0"
  },
  {
    question: "What is the role of human judgment in resource allocation?",
    shortAnswer: "LP provides optimal recommendations; human judgment considers qualitative factors not in the model.",
    explanation: "LP models may not capture all qualitative factors like morale, stakeholder preferences, or organizational culture. Human judgment is essential for final decisions.",
    hint: "Math + Judgment.",
    level: "intermediate",
    codeExample: "LP suggests allocation; management considers employee satisfaction"
  },
  {
    question: "How do you allocate resources among multiple projects?",
    shortAnswer: "Use a resource allocation model with projects as activities and resources as constraints.",
    explanation: "Each project consumes resources and produces returns. The model allocates resources across projects to maximize total return while respecting resource limits.",
    hint: "Projects compete for resources.",
    level: "intermediate",
    codeExample: "Projects A, B, C competing for budget and personnel"
  },
  {
    question: "What is the difference between resource allocation and resource leveling?",
    shortAnswer: "Resource allocation decides how much; resource leveling smooths resource usage over time.",
    explanation: "Allocation determines quantities assigned to activities. Leveling adjusts the timing of activities to avoid peaks and valleys in resource usage.",
    hint: "How much vs. when.",
    level: "advanced",
    codeExample: "Allocation: 100 hours to project\nLeveling: spread those 100 hours evenly"
  },
  {
    question: "How do you handle priority constraints in resource allocation?",
    shortAnswer: "Add priority constraints that ensure high-priority activities get resources first.",
    explanation: "Some activities have higher priority than others. Priority constraints ensure these activities receive sufficient resources before others.",
    hint: "High priority gets resources first.",
    level: "advanced",
    codeExample: "x ≥ y (Activity X has priority over Activity Y)"
  },
  {
    question: "What is the economic interpretation of resource allocation LP?",
    shortAnswer: "It represents the optimal distribution of scarce resources to maximize value.",
    explanation: "Resources are scarce and have opportunity costs. LP finds the allocation that creates the most value from limited resources.",
    hint: "Scarce resources, maximum value.",
    level: "intermediate",
    codeExample: "Allocate budget where it creates most value"
  },
  {
    question: "How do you allocate resources across multiple time periods?",
    shortAnswer: "Use a multi-period LP model with time-indexed variables and constraints.",
    explanation: "Resources may be allocated across different time periods. Each period has its own resource availability and constraints.",
    hint: "Allocation over time.",
    level: "advanced",
    codeExample: "Budget allocation across months: x₁ + x₂ + ... ≤ total"
  },
  {
    question: "What is the role of divisibility in resource allocation?",
    shortAnswer: "Divisibility determines whether resources can be split into fractional units.",
    explanation: "Some resources (money, time) are divisible; others (people, equipment) are indivisible and require integer programming.",
    hint: "Can resources be split?",
    level: "intermediate",
    codeExample: "Money is divisible; people are indivisible"
  }
];

export default questions;