const questions = [
  {
    question: "What is the objective of a cost minimization problem?",
    shortAnswer: "To minimize total cost while meeting all requirements.",
    explanation: "Cost minimization problems find the cheapest way to meet requirements such as nutritional needs, production targets, or quality standards.",
    hint: "Minimize cost, meet requirements.",
    level: "basic",
    codeExample: "Minimize Z = 20x + 30y (Cost of food items)"
  },
  {
    question: "What type of constraints are typically used in cost minimization?",
    shortAnswer: "Greater than or equal to (≥) constraints for requirements.",
    explanation: "Cost minimization problems typically require meeting minimum standards or demands, so constraints are of the form: requirement ≥ minimum.",
    hint: "≥ constraints for requirements.",
    level: "basic",
    codeExample: "4x + 3y ≥ 24 (Protein requirement)"
  },
  {
    question: "How is cost minimization different from profit maximization?",
    shortAnswer: "Cost minimization minimizes costs with ≥ constraints; profit maximization maximizes profit with ≤ constraints.",
    explanation: "Cost minimization focuses on meeting requirements at lowest cost. Profit maximization focuses on maximizing profit with limited resources.",
    hint: "Min cost vs. max profit.",
    level: "intermediate",
    codeExample: "Min Z = 20x + 30y vs. Max Z = 40x + 50y"
  },
  {
    question: "What are common applications of cost minimization?",
    shortAnswer: "Diet planning, blending, production planning, transportation, and purchasing.",
    explanation: "Any problem where you need to meet requirements at minimum cost can be formulated as a cost minimization problem.",
    hint: "Diet, blending, production, transportation.",
    level: "basic",
    codeExample: "Minimize cost of food meeting nutritional needs"
  },
  {
    question: "Why do cost minimization problems use ≥ constraints?",
    shortAnswer: "Because requirements must be at least a minimum amount - you need to meet or exceed the requirement.",
    explanation: "If you need at least 24 units of protein, the constraint is 4x + 3y ≥ 24. Going over the requirement is allowed but may be unnecessary.",
    hint: "Must meet or exceed requirements.",
    level: "intermediate",
    codeExample: "Protein: 4x + 3y ≥ 24"
  },
  {
    question: "What is surplus in a cost minimization problem?",
    shortAnswer: "Surplus is the amount by which a requirement is exceeded at the optimal solution.",
    explanation: "Surplus = LHS - RHS for ≥ constraints. If a requirement is exceeded, there is surplus. This may indicate inefficiency.",
    hint: "Excess above requirement.",
    level: "intermediate",
    codeExample: "Protein: LHS = 26, RHS = 24 → Surplus = 2 units"
  },
  {
    question: "How do you handle availability constraints in cost minimization?",
    shortAnswer: "Add ≤ constraints to limit how much of each option can be used.",
    explanation: "If materials have limited availability, add constraints like x ≤ max_x to reflect these limits.",
    hint: "Limited availability as ≤ constraints.",
    level: "intermediate",
    codeExample: "x ≤ 100 (Material X availability)"
  },
  {
    question: "What is the difference between cost and price?",
    shortAnswer: "Cost is what you pay; price is what you charge. Cost minimization focuses on what you pay.",
    explanation: "In cost minimization, the objective is to minimize your expenses. Price (what you sell for) is not part of cost minimization problems.",
    hint: "Cost = what you pay.",
    level: "basic",
    codeExample: "Minimize cost = 20x + 30y (what you pay)"
  },
  {
    question: "Why might a cost minimization problem have multiple optimal solutions?",
    shortAnswer: "When different combinations of options give the same minimum cost.",
    explanation: "If the cost ratio equals the requirement ratio for two options, multiple solutions may give the same minimum cost.",
    hint: "Same cost from different mixes.",
    level: "advanced",
    codeExample: "Both (6,0) and (0,4) give the same minimum cost"
  },
  {
    question: "What is the role of shadow prices in cost minimization?",
    shortAnswer: "Shadow prices indicate the cost increase if a requirement is tightened by one unit.",
    explanation: "For binding ≥ constraints, the shadow price tells you how much cost would increase if the requirement increased by one unit.",
    hint: "Cost increase per unit of requirement.",
    level: "advanced",
    codeExample: "Shadow price = ₹5 means cost increases by ₹5 per unit of requirement"
  },
  {
    question: "How do fixed costs affect cost minimization?",
    shortAnswer: "Fixed costs don't affect the optimal solution but increase total cost.",
    explanation: "Fixed costs are constant regardless of the quantity chosen. They shift total cost but don't change the optimal mix.",
    hint: "Fixed costs don't change optimal mix.",
    level: "intermediate",
    codeExample: "Total Cost = Variable Cost + Fixed Cost"
  },
  {
    question: "What is the difference between cost minimization and cost reduction?",
    shortAnswer: "Cost minimization finds the optimal solution; cost reduction is a continuous improvement process.",
    explanation: "Cost minimization is a one-time optimization. Cost reduction is ongoing efforts to reduce costs over time.",
    hint: "Find optimum vs. continuous improvement.",
    level: "advanced",
    codeExample: "Minimize current costs vs. reduce costs over time"
  },
  {
    question: "How do you formulate a blending problem as cost minimization?",
    shortAnswer: "Minimize cost of materials while meeting quality requirements.",
    explanation: "Blending problems involve mixing materials to meet specifications at minimum cost. Requirements include quality attributes and quantity.",
    hint: "Mix materials to meet specs at min cost.",
    level: "intermediate",
    codeExample: "Min Z = 50x + 40y, subject to quality constraints"
  },
  {
    question: "What is the difference between cost minimization and cost effectiveness?",
    shortAnswer: "Cost minimization finds lowest cost; cost effectiveness considers value relative to cost.",
    explanation: "Cost minimization is purely financial. Cost effectiveness considers the value or benefit obtained for the cost.",
    hint: "Lowest cost vs. best value.",
    level: "advanced",
    codeExample: "Min cost vs. max value per rupee"
  },
  {
    question: "Why is it important to check for surplus in cost minimization?",
    shortAnswer: "Surplus indicates over-meeting requirements, which may be unnecessary and costly.",
    explanation: "If there's surplus, you might be able to reduce cost by adjusting the mix. However, sometimes surplus is unavoidable or even desirable.",
    hint: "Surplus may mean unnecessary cost.",
    level: "intermediate",
    codeExample: "Protein surplus = 2 units → Could reduce protein source"
  },
  {
    question: "What is the role of quality constraints in cost minimization?",
    shortAnswer: "Quality constraints ensure the solution meets quality standards.",
    explanation: "In blending or production problems, quality constraints (like minimum percentage of ingredients) must be satisfied.",
    hint: "Quality standards as constraints.",
    level: "intermediate",
    codeExample: "Ingredient A ≥ 60% of total blend"
  },
  {
    question: "How do you handle demand constraints in cost minimization?",
    shortAnswer: "Add constraints to ensure production meets demand.",
    explanation: "If there's a minimum demand to meet, add a constraint like production ≥ demand.",
    hint: "Meet demand at minimum cost.",
    level: "intermediate",
    codeExample: "x + y ≥ 200 (Total production demand)"
  },
  {
    question: "What is the practical significance of cost minimization in business?",
    shortAnswer: "It helps businesses reduce expenses while maintaining quality and meeting requirements.",
    explanation: "Cost minimization helps companies improve profitability by reducing input costs without sacrificing quality or output.",
    hint: "Reduce costs, maintain quality.",
    level: "basic",
    codeExample: "Find cheapest way to produce required output"
  },
  {
    question: "How do you identify surplus nutrients in a diet problem?",
    shortAnswer: "Calculate LHS - RHS for each nutrient constraint at the optimal solution.",
    explanation: "If LHS > RHS, there's surplus. This means you're getting more of that nutrient than required.",
    hint: "LHS - RHS = surplus.",
    level: "intermediate",
    codeExample: "Protein: 4(6) + 3(0) = 24, RHS = 24 → No surplus"
  },
  {
    question: "What is the difference between cost minimization and expense reduction?",
    shortAnswer: "Cost minimization optimizes the mix; expense reduction focuses on reducing specific costs.",
    explanation: "Cost minimization finds the optimal combination of inputs. Expense reduction focuses on lowering individual cost items.",
    hint: "Optimize mix vs. reduce items.",
    level: "advanced",
    codeExample: "Find cheapest mix vs. negotiate lower prices"
  }
];

export default questions;