// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is the first step in solving a production LP problem?",
    shortAnswer: "Read and understand the problem thoroughly.",
    explanation: "You need to understand the goal, resources, and requirements before writing any equations.",
    hint: "Start with understanding.",
    level: "basic"
  },
  {
    question: "In the simple production example, what are the decision variables?",
    shortAnswer: "x₁ = number of tables, x₂ = number of chairs produced per week.",
    explanation: "These are the quantities the workshop can control and decide.",
    hint: "What is being produced?",
    level: "basic"
  },
  {
    question: "What is the objective function in the production example?",
    shortAnswer: "Maximize Z = 40x₁ + 25x₂.",
    explanation: "Tables contribute $40 profit each, chairs contribute $25 each.",
    hint: "Profit per unit.",
    level: "basic"
  },
  {
    question: "What does the carpentry constraint represent?",
    shortAnswer: "3x₁ + 2x₂ ≤ 120, meaning total carpentry hours cannot exceed 120.",
    explanation: "Each table uses 3 hours, each chair uses 2 hours.",
    hint: "Resource consumption.",
    level: "basic"
  },
  {
    question: "What does the finishing constraint represent?",
    shortAnswer: "2x₁ + x₂ ≤ 60, meaning total finishing hours cannot exceed 60.",
    explanation: "Each table uses 2 hours, each chair uses 1 hour.",
    hint: "Second resource limit.",
    level: "basic"
  },
  {
    question: "What does the demand constraint x₂ ≥ 10 mean?",
    shortAnswer: "At least 10 chairs must be produced per week.",
    explanation: "This is a minimum requirement constraint.",
    hint: "Minimum chairs to produce.",
    level: "basic"
  },
  {
    question: "Why must non-negativity be included?",
    shortAnswer: "Because you cannot produce negative tables or chairs.",
    explanation: "x₁ ≥ 0 and x₂ ≥ 0 ensure the solution is physically meaningful.",
    hint: "No negative production.",
    level: "basic"
  },
  {
    question: "What is a common mistake when formulating the carpentry constraint?",
    shortAnswer: "Using the wrong coefficients or switching the labor hours.",
    explanation: "Tables use 3 hours, chairs use 2 hours – these must be correct.",
    hint: "Check the hours per unit.",
    level: "moderate"
  },
  {
    question: "How would you validate x₁ = 5, x₂ = 20 as a feasible solution?",
    shortAnswer: "Check all constraints: carpentry = 3(5)+2(20)=55 ≤ 120, finishing = 2(5)+20=30 ≤ 60, demand = 20 ≥ 10, both ≥ 0.",
    explanation: "If all constraints are satisfied, the solution is feasible.",
    hint: "Check each constraint.",
    level: "moderate"
  },
  {
    question: "What is the purpose of labeling constraints?",
    shortAnswer: "To make the model clear, readable, and easier to debug.",
    explanation: "Labels like 'Carpentry' and 'Finishing' help identify each constraint.",
    hint: "Name each constraint.",
    level: "basic"
  },
  {
    question: "If the profit per table increases to $50, which part of the model changes?",
    shortAnswer: "The objective function: Z = 50x₁ + 25x₂.",
    explanation: "Only the coefficient of x₁ changes; the constraints remain the same.",
    hint: "Profit change affects objective.",
    level: "moderate"
  },
  {
    question: "What does the 'Subject to' phrase introduce?",
    shortAnswer: "The list of constraints in the LP model.",
    explanation: "It separates the objective from the constraints.",
    hint: "It precedes the constraints.",
    level: "basic"
  },
  {
    question: "What is the economic interpretation of non-negativity?",
    shortAnswer: "You cannot produce negative quantities; production must be ≥ 0.",
    explanation: "Negative production has no physical meaning.",
    hint: "No negative outputs.",
    level: "moderate"
  },
  {
    question: "How do you identify constraints from a production problem?",
    shortAnswer: "Look for resource limits (labor hours, materials) and requirements (demand).",
    explanation: "Each resource or requirement becomes a constraint.",
    hint: "List what limits production.",
    level: "moderate"
  },
  {
    question: "What is the role of validation in LP formulation?",
    shortAnswer: "To ensure the model is correct before solving.",
    explanation: "Testing with simple values catches errors early.",
    hint: "Test before solving.",
    level: "basic"
  },
  {
    question: "If a third product is added, what changes in the model?",
    shortAnswer: "A new decision variable, new coefficients in constraints, and a new term in the objective.",
    explanation: "The model structure remains the same but expands.",
    hint: "More products = more variables.",
    level: "moderate"
  },
  {
    question: "What does it mean if a constraint is satisfied with equality at the optimum?",
    shortAnswer: "The resource is fully used; it's a binding constraint.",
    explanation: "It indicates the resource is scarce and limits production.",
    hint: "Fully utilized resource.",
    level: "expert"
  },
  {
    question: "How would you write the constraint for 'at most 100 tables'?",
    shortAnswer: "x₁ ≤ 100.",
    explanation: "This is an additional upper bound on production.",
    hint: "Maximum limit.",
    level: "basic"
  },
  {
    question: "In the production example, what are the units of the RHS values?",
    shortAnswer: "Hours (carpentry = 120 hours, finishing = 60 hours).",
    explanation: "The RHS represents the total available hours for each resource.",
    hint: "Resource capacities.",
    level: "basic"
  },
  {
    question: "What assumption is made about the objective and constraints?",
    shortAnswer: "That they are linear; no squares or products of variables.",
    explanation: "LP requires linearity in both objective and constraints.",
    hint: "Linear relationships only.",
    level: "moderate"
  },
  {
    question: "If a chair requires 1.5 hours of carpentry, how is that written?",
    shortAnswer: "The coefficient would be 1.5: 3x₁ + 1.5x₂ ≤ 120.",
    explanation: "Coefficients can be decimals or fractions.",
    hint: "Decimals are allowed.",
    level: "moderate"
  },
  {
    question: "What is the benefit of using the 7-step procedure?",
    shortAnswer: "It ensures a systematic, complete, and correct formulation.",
    explanation: "It prevents missing components and reduces errors.",
    hint: "Systematic approach.",
    level: "basic"
  },
  {
    question: "In the production example, what if there is no demand constraint?",
    shortAnswer: "The model would allow zero chairs, which might not be realistic.",
    explanation: "Demand constraints ensure market needs are met.",
    hint: "Minimum requirements.",
    level: "moderate"
  },
  {
    question: "Why is it important to define variables with units?",
    shortAnswer: "To avoid confusion and ensure consistency.",
    explanation: "Knowing x₁ is 'tables per week' prevents misinterpretation.",
    hint: "Be explicit.",
    level: "basic"
  },
  {
    question: "What is the meaning of a coefficient in a constraint?",
    shortAnswer: "The amount of resource consumed by one unit of the variable.",
    explanation: "For example, 3 hours of carpentry per table.",
    hint: "Resource usage per unit.",
    level: "moderate"
  },
  {
    question: "If the profit per table is $40 and per chair is $25, what is the objective?",
    shortAnswer: "Maximize Z = 40x₁ + 25x₂.",
    explanation: "The objective is the sum of profit contributions from each product.",
    hint: "Sum of profits.",
    level: "basic"
  },
  {
    question: "What would the model look like if there are 5 products instead of 2?",
    shortAnswer: "It would have 5 decision variables, 5 terms in the objective, and 5 coefficients in each constraint.",
    explanation: "The structure remains the same; only the number of variables grows.",
    hint: "More products, more variables.",
    level: "moderate"
  },
  {
    question: "What is the significance of the '≥' in the demand constraint?",
    shortAnswer: "It indicates a minimum requirement that must be met.",
    explanation: "Production must be at least the demand; not meeting it is infeasible.",
    hint: "Minimum requirement.",
    level: "basic"
  },
  {
    question: "How can you check if a constraint is redundant?",
    shortAnswer: "See if it's always satisfied when other constraints are met.",
    explanation: "Redundant constraints do not affect the feasible region.",
    hint: "It adds no new restriction.",
    level: "expert"
  },
  {
    question: "What is the purpose of the non-negativity constraints in production?",
    shortAnswer: "To ensure production quantities are realistic (can't produce negative units).",
    explanation: "Negative production has no physical meaning.",
    hint: "Realistic production.",
    level: "basic"
  }
];

export default questions;