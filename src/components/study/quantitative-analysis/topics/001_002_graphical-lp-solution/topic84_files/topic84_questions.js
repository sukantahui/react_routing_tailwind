const questions = [
  {
    question: "What does the optimal solution tell you in a business context?",
    shortAnswer: "It tells you the best decision to make given the constraints, and what the outcome will be.",
    explanation: "The optimal solution provides the best values for decision variables and the resulting objective value. It answers 'what should we do?' and 'what will we achieve?'",
    hint: "Best decision and its outcome.",
    level: "basic",
    codeExample: "x*=40 chairs, y*=60 tables, Z*=₹62,000 profit"
  },
  {
    question: "What is a binding constraint and why does it matter?",
    shortAnswer: "A binding constraint is fully utilized (slack = 0) and limits the optimal solution.",
    explanation: "Binding constraints are bottlenecks. They indicate which resources are scarce and limit performance. Expanding these resources would improve the objective.",
    hint: "Fully utilized = bottleneck.",
    level: "intermediate",
    codeExample: "Labor: 3x+2y=240 (binding) → Labor limits production"
  },
  {
    question: "What does slack tell you about a resource?",
    shortAnswer: "Slack indicates unused capacity - the resource is not fully utilized.",
    explanation: "Positive slack means you have extra capacity. This resource is not limiting production and could be reduced or used for other purposes.",
    hint: "Unused capacity.",
    level: "intermediate",
    codeExample: "Machine: 200 hours used out of 220 → Slack = 20 hours"
  },
  {
    question: "What is a shadow price and how should you use it?",
    shortAnswer: "Shadow price is the value of one additional unit of a resource. It tells you how much Z would increase.",
    explanation: "Shadow price helps make investment decisions. If you can acquire more of a resource for less than the shadow price, it's profitable to do so.",
    hint: "Value of additional resources.",
    level: "advanced",
    codeExample: "Shadow price = ₹2.50/hour → Each extra hour adds ₹2.50 to profit"
  },
  {
    question: "How do you identify which resource is most valuable?",
    shortAnswer: "The resource with the highest shadow price is most valuable to expand.",
    explanation: "Compare shadow prices across binding constraints. The highest shadow price indicates where additional resources would have the greatest impact.",
    hint: "Highest shadow price = most valuable.",
    level: "advanced",
    codeExample: "Labor shadow price = ₹2.50, Machine = ₹0.75 → Labor is more valuable"
  },
  {
    question: "What is the economic interpretation of shadow prices?",
    shortAnswer: "Shadow prices represent the maximum you should pay for additional resources.",
    explanation: "If you can acquire more of a resource at a cost less than the shadow price, it's profitable. The shadow price is the break-even price.",
    hint: "Maximum price to pay.",
    level: "advanced",
    codeExample: "Shadow price = ₹2.50 → Don't pay more than ₹2.50 for extra units"
  },
  {
    question: "How do you interpret resource utilization percentages?",
    shortAnswer: "Utilization shows how much of each resource is being used at the optimal solution.",
    explanation: "100% utilization = fully used (binding). Lower percentages = slack available. This helps identify where there's capacity for growth.",
    hint: "Used/Available × 100%.",
    level: "intermediate",
    codeExample: "Labor: 100%, Machine: 85%, Material: 70%"
  },
  {
    question: "What does sensitivity analysis tell you about the solution?",
    shortAnswer: "Sensitivity analysis tells you how robust the solution is to changes in parameters.",
    explanation: "It shows allowable ranges for coefficients and RHS values. Wide ranges mean the solution is robust; narrow ranges mean it's sensitive to changes.",
    hint: "How robust is the solution?",
    level: "advanced",
    codeExample: "c₁ allowable range: [4, 8] → Solution robust to price changes"
  },
  {
    question: "How do you interpret trade-offs in an LP solution?",
    shortAnswer: "Trade-offs show the opportunity cost of choosing one decision over another.",
    explanation: "Increasing one variable requires resources that could have been used for another variable. Trade-offs reveal the cost of each decision.",
    hint: "Opportunity cost of decisions.",
    level: "advanced",
    codeExample: "Increasing chairs by 1 uses 3 labor hours that could make tables"
  },
  {
    question: "What is the difference between an optimal solution and a practical solution?",
    shortAnswer: "Optimal is mathematically best; practical considers implementation challenges and human factors.",
    explanation: "The optimal solution may not be practical due to implementation issues, human factors, or other constraints not captured in the model.",
    hint: "Math vs. Reality.",
    level: "intermediate",
    codeExample: "Optimal: 40.5 chairs → Practical: 40 or 41 chairs (integer)"
  },
  {
    question: "How do you communicate LP results to non-technical stakeholders?",
    shortAnswer: "Use plain language, focus on recommendations, and explain what the numbers mean for the business.",
    explanation: "Avoid jargon. Explain the solution in terms of business decisions and outcomes. Provide clear, actionable recommendations.",
    hint: "Simple language, clear recommendations.",
    level: "intermediate",
    codeExample: "Produce 40 chairs and 60 tables to earn ₹62,000 profit"
  },
  {
    question: "What assumptions should you consider when interpreting an LP solution?",
    shortAnswer: "Consider linearity, constant prices, perfect divisibility, and that all important factors are included.",
    explanation: "LP models make simplifying assumptions. Real-world conditions may differ. Use the solution as a guide, not an absolute answer.",
    hint: "What does the model assume?",
    level: "advanced",
    codeExample: "Assumes linear relationships, constant prices, perfect divisibility"
  },
  {
    question: "How do you identify opportunities for improvement from an LP solution?",
    shortAnswer: "Look for slack resources and binding constraints with high shadow prices.",
    explanation: "Slack resources could be used more effectively. Binding constraints with high shadow prices are opportunities for investment.",
    hint: "Find slack and high shadow prices.",
    level: "advanced",
    codeExample: "Labor is binding (shadow price ₹2.50) → Invest in more labor"
  },
  {
    question: "What is the relationship between binding constraints and bottlenecks?",
    shortAnswer: "Binding constraints ARE the bottlenecks - they limit performance and should be addressed.",
    explanation: "Every binding constraint represents a bottleneck. Addressing bottlenecks (expanding them) improves the objective value.",
    hint: "Binding = Bottleneck.",
    level: "intermediate",
    codeExample: "Labor binding → Labor is the bottleneck"
  },
  {
    question: "How do you interpret the objective function value?",
    shortAnswer: "It represents the optimal outcome - maximum profit, minimum cost, or maximum benefit.",
    explanation: "The objective value tells you what you can achieve with the optimal decisions. It's the target outcome.",
    hint: "Best possible outcome.",
    level: "basic",
    codeExample: "Z* = ₹62,000 → Maximum profit achievable"
  },
  {
    question: "What should you do if the optimal solution isn't practical?",
    shortAnswer: "Use it as a guide and adjust based on practical considerations.",
    explanation: "The optimal solution provides direction. Use managerial judgment to adjust for practical constraints not captured in the model.",
    hint: "Guide, not absolute rule.",
    level: "intermediate",
    codeExample: "Optimal: 40.5 chairs → Adjust to 40 or 41 chairs"
  },
  {
    question: "How do you use LP solutions for strategic planning?",
    shortAnswer: "Use shadow prices and bottleneck analysis to guide long-term investment decisions.",
    explanation: "Shadow prices show where investments have the greatest impact. Bottleneck analysis shows where to expand capacity.",
    hint: "Guide long-term investment.",
    level: "advanced",
    codeExample: "Shadow price high → Invest in that resource"
  },
  {
    question: "What is the role of managerial judgment in interpreting LP solutions?",
    shortAnswer: "Managerial judgment adds context, practical wisdom, and considers factors not in the model.",
    explanation: "LP provides mathematical optimality. Managerial judgment considers human factors, organizational culture, and practical implementation.",
    hint: "Math + Judgment.",
    level: "intermediate",
    codeExample: "LP says hire more workers; judgment says consider training costs"
  },
  {
    question: "How do you identify redundant constraints from the solution?",
    shortAnswer: "Constraints that are never binding and have large slack are often redundant.",
    explanation: "If a constraint always has slack and never limits the solution, it's redundant. It can be removed without changing the solution.",
    hint: "Never binding = redundant.",
    level: "advanced",
    codeExample: "Material constraint always has slack → Redundant"
  }
];

export default questions;