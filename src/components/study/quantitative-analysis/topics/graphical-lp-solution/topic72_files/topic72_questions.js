const questions = [
  {
    question: "What is sensitivity analysis in LP?",
    shortAnswer: "Sensitivity analysis examines how changes in model parameters affect the optimal solution.",
    explanation: "It determines how much parameters (objective coefficients, RHS values) can change before the optimal solution changes. It also identifies shadow prices and allowable ranges.",
    hint: "How robust is the optimal solution?",
    level: "basic",
    codeExample: "Shadow price: ΔZ/ΔRHS\nAllowable range: [lower bound, upper bound]"
  },
  {
    question: "What is a shadow price in LP?",
    shortAnswer: "A shadow price is the marginal value of increasing a constraint's RHS by one unit.",
    explanation: "Shadow price measures how much the objective function would improve if the RHS of a binding constraint were increased by one unit. Only binding constraints have positive shadow prices.",
    hint: "Value of one more unit of resource.",
    level: "intermediate",
    codeExample: "Shadow price = ΔZ/ΔRHS\nIf shadow price = 2.5, Z increases by 2.5 per unit"
  },
  {
    question: "How do you interpret shadow prices graphically?",
    shortAnswer: "Graphically, shadow prices represent the rate at which the objective function improves as a constraint line shifts outward.",
    explanation: "When a binding constraint line moves outward (increasing RHS), the objective function value increases at the rate of the shadow price. This is visible on the graph as the objective function line moving.",
    hint: "Rate of improvement as constraint moves.",
    level: "intermediate",
    codeExample: "Shadow price = slope of objective change vs RHS change"
  },
  {
    question: "What is the allowable range for objective coefficients?",
    shortAnswer: "The allowable range is the range of values for an objective coefficient where the current optimal solution remains optimal.",
    explanation: "Within this range, the optimal solution's basis doesn't change. Outside this range, a different corner point becomes optimal.",
    hint: "Range where optimal solution stays same.",
    level: "advanced",
    codeExample: "c₁ ∈ [lower bound, upper bound]\nOptimal solution remains optimal"
  },
  {
    question: "How do you determine allowable ranges graphically?",
    shortAnswer: "By comparing the slope of the objective function with the slopes of binding constraints.",
    explanation: "The objective function's slope must stay between the slopes of the two binding constraints for the current optimal solution to remain optimal. This gives the allowable ranges.",
    hint: "Slope must stay between constraint slopes.",
    level: "advanced",
    codeExample: "Constraint 1 slope ≤ objective slope ≤ Constraint 2 slope"
  },
  {
    question: "What is the allowable range for RHS values?",
    shortAnswer: "The allowable range is the range of RHS values where the current optimal basis remains optimal.",
    explanation: "Within this range, the set of binding constraints doesn't change, though the optimal values may change. Outside this range, a different constraint becomes binding.",
    hint: "RHS range where basis stays same.",
    level: "advanced",
    codeExample: "RHS ∈ [lower bound, upper bound]\nBasis remains optimal"
  },
  {
    question: "What is the difference between shadow price and market price?",
    shortAnswer: "Shadow price is the marginal value to the objective function, not the actual market price of the resource.",
    explanation: "Shadow price tells you how much the objective would improve if you had one more unit of a resource. The market price is what you pay to acquire the resource. If shadow price > market price, it's profitable to acquire more.",
    hint: "Shadow price = value, Market price = cost.",
    level: "intermediate",
    codeExample: "Shadow price: ₹2.5/unit\nMarket price: ₹1.8/unit\n→ Profitable to buy more"
  },
  {
    question: "Why do non-binding constraints have zero shadow price?",
    shortAnswer: "Non-binding constraints have slack, so increasing their RHS doesn't improve the objective.",
    explanation: "Since there's already unused capacity (slack), having more of that resource doesn't help. The objective is limited by other constraints, not by this one.",
    hint: "Unused capacity has no value.",
    level: "intermediate",
    codeExample: "Slack > 0 → Shadow price = 0\nNo benefit from more resources"
  },
  {
    question: "How does sensitivity analysis help in decision-making?",
    shortAnswer: "It helps identify which resources are most valuable and how robust the solution is to changes.",
    explanation: "Sensitivity analysis tells managers where to invest (resources with high shadow prices), and how much parameters can change before the solution needs to be re-evaluated.",
    hint: "Guides investment and planning.",
    level: "intermediate",
    codeExample: "High shadow price → Invest there\nLarge allowable range → Robust solution"
  },
  {
    question: "What happens when an objective coefficient exceeds its allowable range?",
    shortAnswer: "When an objective coefficient exceeds its allowable range, the optimal solution changes to a different corner point.",
    explanation: "The slope of the objective function changes enough that it no longer touches the current optimal corner. A different corner point becomes optimal.",
    hint: "New optimal corner point.",
    level: "advanced",
    codeExample: "c₁ > upper bound → New corner point becomes optimal"
  },
  {
    question: "What happens when a RHS value exceeds its allowable range?",
    shortAnswer: "When a RHS exceeds its allowable range, a different constraint becomes binding at the optimal solution.",
    explanation: "The constraint line has moved so far that it no longer forms the optimal corner. A different constraint now limits the solution.",
    hint: "Different constraint becomes binding.",
    level: "advanced",
    codeExample: "RHS > upper bound → New constraint binds"
  },
  {
    question: "How do you calculate shadow prices graphically?",
    shortAnswer: "Shadow prices are calculated by comparing the change in objective value to the change in RHS for a binding constraint.",
    explanation: "Move the constraint line slightly outward, find the new optimal point, calculate the new Z, and divide the change in Z by the change in RHS.",
    hint: "ΔZ/ΔRHS from graphical movement.",
    level: "advanced",
    codeExample: "Shadow price = (Z_new - Z_old)/(RHS_new - RHS_old)"
  },
  {
    question: "What is the relationship between shadow prices and dual variables?",
    shortAnswer: "Shadow prices are the values of the dual variables in the dual problem.",
    explanation: "In LP duality, each primal constraint has a corresponding dual variable. The shadow price of a constraint equals the optimal value of its dual variable.",
    hint: "Shadow price = dual variable.",
    level: "advanced",
    codeExample: "Primal constraint → Dual variable = Shadow price"
  },
  {
    question: "Can shadow prices be negative?",
    shortAnswer: "Yes, shadow prices can be negative in minimization problems or for certain types of constraints.",
    explanation: "For minimization problems, increasing a constraint's RHS may increase the objective, giving a positive shadow price. For some constraints, increasing RHS could make the problem worse.",
    hint: "Negative shadow prices are possible.",
    level: "advanced",
    codeExample: "Minimization: shadow price = -2 means increasing RHS increases cost"
  },
  {
    question: "What is the 100% rule in sensitivity analysis?",
    shortAnswer: "The 100% rule states that if the sum of percentage changes of multiple parameters is ≤ 100%, the optimal basis remains optimal.",
    explanation: "When changing multiple parameters simultaneously, the optimal basis remains unchanged if the total percentage of allowable changes doesn't exceed 100%.",
    hint: "Multiple changes allowed if sum ≤ 100%.",
    level: "advanced",
    codeExample: "Δc₁/Allowable₁ + Δc₂/Allowable₂ ≤ 1\n→ Basis remains optimal"
  },
  {
    question: "How do you interpret sensitivity analysis in real-world terms?",
    shortAnswer: "Sensitivity analysis tells managers which resources are bottlenecks and how much flexibility exists in the optimal solution.",
    explanation: "High shadow prices indicate scarce resources that limit profitability. Wide allowable ranges indicate the solution is robust to changes. Managers use this for strategic planning.",
    hint: "Practical business insights.",
    level: "intermediate",
    codeExample: "Bottleneck: high shadow price\nRobust: wide allowable range"
  },
  {
    question: "What is the difference between allowable increase and allowable decrease?",
    shortAnswer: "Allowable increase is how much a parameter can increase before the solution changes; allowable decrease is how much it can decrease.",
    explanation: "These define the allowable range. The optimal basis remains unchanged as long as the parameter stays within [original - allowable decrease, original + allowable increase].",
    hint: "Upper and lower bounds of allowable range.",
    level: "intermediate",
    codeExample: "Allowable range: [c - decrease, c + increase]"
  },
  {
    question: "How does sensitivity analysis handle simultaneous changes?",
    shortAnswer: "Simultaneous changes require using the 100% rule or re-solving the problem.",
    explanation: "For multiple simultaneous changes, the 100% rule provides a guideline. If the rule is violated, the problem must be re-solved with the new parameters.",
    hint: "100% rule for simultaneous changes.",
    level: "advanced",
    codeExample: "If sum of percentages > 100% → Re-solve"
  },
  {
    question: "What is the practical value of knowing allowable ranges?",
    shortAnswer: "Allowable ranges tell decision-makers how much uncertainty the optimal solution can tolerate.",
    explanation: "If parameters have wide allowable ranges, the solution is robust. If ranges are narrow, the solution is sensitive to changes and needs careful monitoring.",
    hint: "Measures solution robustness.",
    level: "intermediate",
    codeExample: "Wide range → Robust solution\nNarrow range → Sensitive solution"
  },
  {
    question: "How do you handle sensitivity when the problem has multiple optimal solutions?",
    shortAnswer: "With multiple optimal solutions, sensitivity analysis must consider the entire optimal face.",
    explanation: "When there are multiple optimal solutions, shadow prices may vary along the optimal edge. Sensitivity analysis becomes more complex and requires examining the entire optimal region.",
    hint: "Multiple optima = more complex sensitivity.",
    level: "advanced",
    codeExample: "Shadow prices may change along optimal edge\nNeed to analyze the full optimal region"
  }
];

export default questions;