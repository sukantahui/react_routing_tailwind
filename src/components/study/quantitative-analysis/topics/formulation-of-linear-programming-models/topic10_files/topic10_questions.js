// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is the goal of a resource allocation problem in LP?",
    shortAnswer: "To optimally distribute limited resources among competing activities.",
    explanation: "Resource allocation problems aim to maximize return or minimize cost by allocating scarce resources efficiently.",
    hint: "Use scarce resources wisely.",
    level: "basic"
  },
  {
    question: "In the resource allocation example, what are the decision variables?",
    shortAnswer: "x₁ = units of Project 1, x₂ = units of Project 2.",
    explanation: "These represent the number of units of each project to undertake.",
    hint: "Two projects, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the resource allocation example?",
    shortAnswer: "Maximize Z = 12,000x₁ + 10,000x₂.",
    explanation: "Project 1 gives ₹12,000 return per unit, Project 2 gives ₹10,000 return per unit.",
    hint: "Return per unit for each project.",
    level: "basic"
  },
  {
    question: "What does the labor constraint represent?",
    shortAnswer: "3x₁ + 2x₂ ≤ 200, total labor hours cannot exceed 200.",
    explanation: "Project 1 uses 3 hours per unit, Project 2 uses 2 hours per unit.",
    hint: "Labor capacity limit.",
    level: "basic"
  },
  {
    question: "What does the equipment constraint represent?",
    shortAnswer: "2x₁ + 3x₂ ≤ 150, total equipment hours cannot exceed 150.",
    explanation: "Project 1 uses 2 hours per unit, Project 2 uses 3 hours per unit.",
    hint: "Equipment capacity limit.",
    level: "basic"
  },
  {
    question: "What does the capital constraint represent?",
    shortAnswer: "2,000x₁ + 1,500x₂ ≤ 100,000, total capital cannot exceed ₹100,000.",
    explanation: "Project 1 requires ₹2,000 per unit, Project 2 requires ₹1,500 per unit.",
    hint: "Capital budget limit.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the resource allocation example?",
    shortAnswer: "x₁ = 25, x₂ = 33.33 with return = ₹633,333.",
    explanation: "Undertake 25 units of Project 1 and 33.33 units of Project 2.",
    hint: "The best allocation of resources.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Equipment and Capital constraints are binding; Labor has slack.",
    explanation: "At x₁ = 25, x₂ = 33.33, Equipment and Capital are fully used.",
    hint: "Check which resources are fully used.",
    level: "moderate"
  },
  {
    question: "What is the slack in the labor constraint at the optimum?",
    shortAnswer: "58.33 hours (200 - 141.67).",
    explanation: "Labor used = 3(25) + 2(33.33) = 75 + 66.67 = 141.67 hours.",
    hint: "Unused capacity.",
    level: "moderate"
  },
  {
    question: "What is a shadow price in resource allocation?",
    shortAnswer: "The amount the objective value increases if one more unit of a resource is available.",
    explanation: "Shadow prices indicate the value of additional resources.",
    hint: "Value of one more unit of a resource.",
    level: "expert"
  },
  {
    question: "Why might a resource have slack at the optimum?",
    shortAnswer: "Because it is not the limiting factor; other resources constrain the solution.",
    explanation: "If a resource isn't binding, it means there's excess capacity.",
    hint: "Not all resources are equally valuable.",
    level: "moderate"
  },
  {
    question: "What is the difference between a resource allocation and a production planning problem?",
    shortAnswer: "Resource allocation focuses on distributing resources; production planning includes timing and sequencing.",
    explanation: "Both involve resources, but production planning has additional temporal dimensions.",
    hint: "What vs when.",
    level: "moderate"
  },
  {
    question: "How does the graphical method help in resource allocation problems?",
    shortAnswer: "It visualizes the feasible region and helps identify the optimal corner point.",
    explanation: "For 2-variable problems, the graphical method is intuitive and educational.",
    hint: "Visual representation helps.",
    level: "moderate"
  },
  {
    question: "What happens if a resource constraint is tightened (RHS decreased)?",
    shortAnswer: "The feasible region shrinks, and the optimal solution may change.",
    explanation: "Less of a resource means less production capacity.",
    hint: "More constraint = less flexibility.",
    level: "expert"
  },
  {
    question: "What happens if a resource constraint is relaxed (RHS increased)?",
    shortAnswer: "The feasible region expands, potentially improving the optimal solution.",
    explanation: "More resources allow more production and higher returns.",
    hint: "More resources = more opportunity.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in resource allocation?",
    shortAnswer: "To ensure allocation quantities are non-negative.",
    explanation: "You cannot allocate negative resources to any activity.",
    hint: "No negative allocation.",
    level: "basic"
  },
  {
    question: "How do you determine if a solution is feasible in resource allocation?",
    shortAnswer: "Check that all resource constraints are satisfied and variables are ≥ 0.",
    explanation: "A feasible solution meets all resource limits.",
    hint: "All constraints satisfied.",
    level: "basic"
  },
  {
    question: "What does it mean if a resource is binding at the optimum?",
    shortAnswer: "The resource is fully utilized and limits further improvement.",
    explanation: "Binding resources have positive shadow prices.",
    hint: "Fully used resource.",
    level: "moderate"
  },
  {
    question: "What is the return at the optimal solution?",
    shortAnswer: "₹633,333.",
    explanation: "At x₁ = 25 and x₂ = 33.33, Z = 12,000(25) + 10,000(33.33) = 300,000 + 333,333 = 633,333.",
    hint: "Maximum return value.",
    level: "basic"
  },
  {
    question: "How would you handle more than two projects in resource allocation?",
    shortAnswer: "Add more decision variables and use the simplex method (cannot graph).",
    explanation: "For 3+ variables, the simplex algorithm or software is needed.",
    hint: "More variables = more complex.",
    level: "moderate"
  },
  {
    question: "What is the significance of the capital constraint being binding?",
    shortAnswer: "It means capital is a scarce resource limiting the optimal allocation.",
    explanation: "Additional capital would allow higher total return.",
    hint: "Capital is the limiting factor.",
    level: "moderate"
  },
  {
    question: "In resource allocation, what is the difference between a resource and a requirement?",
    shortAnswer: "A resource is something you have (≤ constraint); a requirement is something you need (≥ constraint).",
    explanation: "Resources are limits; requirements are minimums.",
    hint: "Resource = what you have, Requirement = what you need.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of the optimal resource allocation?",
    shortAnswer: "Resources should be allocated to activities where they generate the highest marginal return.",
    explanation: "The optimal solution balances marginal returns across all resources.",
    hint: "Highest return per resource.",
    level: "expert"
  },
  {
    question: "How does resource allocation differ from product-mix problems?",
    shortAnswer: "Resource allocation focuses on distributing resources; product-mix focuses on choosing products.",
    explanation: "They are similar but viewed from different perspectives.",
    hint: "Same concept, different perspective.",
    level: "moderate"
  },
  {
    question: "What is a common mistake in resource allocation problems?",
    shortAnswer: "Assuming all resources should be fully used at the optimum.",
    explanation: "Some resources may have slack because other resources are more restrictive.",
    hint: "Not all resources are binding.",
    level: "moderate"
  },
  {
    question: "What is the purpose of sensitivity analysis in resource allocation?",
    shortAnswer: "To understand how changes in resource availability affect the optimal solution.",
    explanation: "Sensitivity analysis helps decision-makers understand the value of additional resources.",
    hint: "What if we had more resources?",
    level: "expert"
  },
  {
    question: "How do you handle integer constraints in resource allocation?",
    shortAnswer: "Use Integer Programming (IP) instead of LP.",
    explanation: "If projects must be whole units, IP is needed.",
    hint: "Whole units require IP.",
    level: "expert"
  },
  {
    question: "What is the return if only Project 1 is undertaken (x₂ = 0)?",
    shortAnswer: "₹600,000 at x₁ = 50.",
    explanation: "Z = 12,000(50) + 10,000(0) = 600,000.",
    hint: "Only Project 1.",
    level: "moderate"
  },
  {
    question: "What is the return if only Project 2 is undertaken (x₁ = 0)?",
    shortAnswer: "₹500,000 at x₂ = 50.",
    explanation: "Z = 12,000(0) + 10,000(50) = 500,000.",
    hint: "Only Project 2.",
    level: "moderate"
  },
  {
    question: "Why is the optimal mix better than producing only one project?",
    shortAnswer: "Because the optimal mix balances resource usage and generates higher total return.",
    explanation: "The mix uses both projects to utilize resources efficiently.",
    hint: "Balance is better.",
    level: "moderate"
  },
  {
    question: "What is the marginal return of capital at the optimum?",
    shortAnswer: "It's the shadow price of capital, indicating how much return increases with one more rupee.",
    explanation: "The shadow price tells the value of additional capital.",
    hint: "Value of more capital.",
    level: "expert"
  }
];

export default questions;