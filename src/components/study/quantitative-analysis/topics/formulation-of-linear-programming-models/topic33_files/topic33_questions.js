// topic33_files/topic33_questions.js

const questions = [
  {
    question: "What is the objective function in an LP model?",
    shortAnswer: "The objective function is what you want to optimize (maximize or minimize).",
    explanation: "The objective function is a single linear expression that represents the goal of the problem.",
    hint: "What are you trying to achieve?",
    level: "basic"
  },
  {
    question: "What are constraints in an LP model?",
    shortAnswer: "Constraints are the limitations or requirements that restrict the decision variables.",
    explanation: "Constraints are inequalities or equalities that limit the values of variables.",
    hint: "What limits your choices?",
    level: "basic"
  },
  {
    question: "What is the key difference between the objective and constraints?",
    shortAnswer: "The objective is what you optimize; constraints are what limit you.",
    explanation: "The objective is a single expression without inequality signs; constraints have inequality or equality signs.",
    hint: "Optimize vs limit.",
    level: "basic"
  },
  {
    question: "What keywords indicate an objective function?",
    shortAnswer: "Maximize, minimize, profit, cost, revenue, maximize, optimize.",
    explanation: "Keywords like 'maximize profit' or 'minimize cost' indicate the objective.",
    hint: "Look for optimization words.",
    level: "basic"
  },
  {
    question: "What keywords indicate constraints?",
    shortAnswer: "At most, at least, no more than, no less than, limited to, available, capacity.",
    explanation: "Keywords that indicate limits or requirements signal constraints.",
    hint: "Look for limit words.",
    level: "basic"
  },
  {
    question: "Does the objective function have an inequality sign?",
    shortAnswer: "No, the objective function is just an expression to be maximized or minimized.",
    explanation: "The objective is written as Z = c₁x₁ + c₂x₂ + ... without ≤, ≥, or =.",
    hint: "No inequality in objective.",
    level: "basic"
  },
  {
    question: "Do constraints have inequality signs?",
    shortAnswer: "Yes, constraints always have ≤, ≥, or = signs.",
    explanation: "Constraints are written as a₁x₁ + a₂x₂ + ... ≤ b (or ≥, =).",
    hint: "Inequality signs = constraints.",
    level: "basic"
  },
  {
    question: "What is the first step in distinguishing objective from constraints?",
    shortAnswer: "Identify what the decision-maker wants to achieve.",
    explanation: "The objective is what you want to optimize; constraints are what limit you.",
    hint: "Start with the goal.",
    level: "basic"
  },
  {
    question: "How many objective functions are there in an LP model?",
    shortAnswer: "Exactly one objective function.",
    explanation: "LP models have a single objective to maximize or minimize.",
    hint: "One objective only.",
    level: "basic"
  },
  {
    question: "How many constraints can an LP model have?",
    shortAnswer: "Multiple constraints—there is no fixed limit.",
    explanation: "LP models can have any number of constraints.",
    hint: "Many constraints possible.",
    level: "basic"
  },
  {
    question: "What does 'maximize' indicate in an LP model?",
    shortAnswer: "It indicates that the objective is to maximize the expression.",
    explanation: "'Maximize' means we want the largest possible value of the objective.",
    hint: "Maximize = largest value.",
    level: "basic"
  },
  {
    question: "What does 'minimize' indicate in an LP model?",
    shortAnswer: "It indicates that the objective is to minimize the expression.",
    explanation: "'Minimize' means we want the smallest possible value of the objective.",
    hint: "Minimize = smallest value.",
    level: "basic"
  },
  {
    question: "What is a common mistake when distinguishing objective from constraints?",
    shortAnswer: "Confusing the objective with constraints, or forgetting the objective.",
    explanation: "Some students mistakenly include the objective in the constraints section.",
    hint: "Keep them separate.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the objective function?",
    shortAnswer: "To quantify and optimize the goal of the decision-maker.",
    explanation: "The objective function tells us what 'best' means in the problem.",
    hint: "It defines 'best'.",
    level: "basic"
  },
  {
    question: "What is the purpose of constraints?",
    shortAnswer: "To define the feasible region and limit the decision variables.",
    explanation: "Constraints ensure the solution is realistic and respects limitations.",
    hint: "They define what's possible.",
    level: "basic"
  },
  {
    question: "How do you identify the objective in a word problem?",
    shortAnswer: "Look for what the decision-maker wants to maximize or minimize.",
    explanation: "The objective is usually stated as 'maximize profit' or 'minimize cost'.",
    hint: "Look for optimization words.",
    level: "moderate"
  },
  {
    question: "How do you identify constraints in a word problem?",
    shortAnswer: "Look for limits, requirements, or restrictions on the decisions.",
    explanation: "Constraints are often signaled by 'at most', 'at least', 'available', etc.",
    hint: "Look for limit words.",
    level: "moderate"
  },
  {
    question: "What is the difference between a coefficient in the objective and a coefficient in a constraint?",
    shortAnswer: "Objective coefficients represent contribution per unit; constraint coefficients represent resource usage per unit.",
    explanation: "Objective coefficients are values like profit per unit; constraint coefficients are resource usage like labor hours per unit.",
    hint: "Contribution vs usage.",
    level: "moderate"
  },
  {
    question: "If you see 'Profit = 5x + 3y', is this the objective or a constraint?",
    shortAnswer: "This is the objective function (profit to be maximized).",
    explanation: "Profit is what we want to optimize, so it's the objective.",
    hint: "Profit = objective.",
    level: "basic"
  },
  {
    question: "If you see '2x + 3y ≤ 100', is this the objective or a constraint?",
    shortAnswer: "This is a constraint (resource limitation).",
    explanation: "The ≤ sign indicates it's a constraint limiting the variables.",
    hint: "≤ sign = constraint.",
    level: "basic"
  },
  {
    question: "What is the format of the objective function?",
    shortAnswer: "Z = c₁x₁ + c₂x₂ + ... (without inequality signs).",
    explanation: "The objective is always written as a linear expression to be optimized.",
    hint: "No inequality in objective.",
    level: "basic"
  },
  {
    question: "What is the format of constraints?",
    shortAnswer: "a₁x₁ + a₂x₂ + ... ≤ b (or ≥, =).",
    explanation: "Constraints always have an inequality or equality sign.",
    hint: "Inequality signs = constraints.",
    level: "basic"
  },
  {
    question: "How many objective functions can a standard LP model have?",
    shortAnswer: "Exactly one objective function.",
    explanation: "Standard LP models have a single objective to optimize.",
    hint: "One objective only.",
    level: "basic"
  },
  {
    question: "Can a constraint appear without an inequality sign?",
    shortAnswer: "No, constraints always have ≤, ≥, or = signs.",
    explanation: "The inequality sign is what makes it a constraint.",
    hint: "Always has sign.",
    level: "basic"
  },
  {
    question: "What is the role of the objective function in the feasible region?",
    shortAnswer: "The objective function selects the best point within the feasible region.",
    explanation: "The objective is evaluated at all feasible points; the one with the best value is optimal.",
    hint: "It picks the best.",
    level: "moderate"
  },
  {
    question: "What is the role of constraints in the feasible region?",
    shortAnswer: "Constraints define the boundaries of the feasible region.",
    explanation: "The feasible region is the intersection of all constraints.",
    hint: "They define the shape.",
    level: "moderate"
  },
  {
    question: "If 'Cost' appears in a problem, is it always the objective?",
    shortAnswer: "Not always—cost could be minimized (objective) or could appear in constraints.",
    explanation: "If cost is what you want to minimize, it's the objective. If cost is a limit, it's a constraint.",
    hint: "Depends on context.",
    level: "moderate"
  },
  {
    question: "What is the difference between 'maximize profit' and 'profit constraint'?",
    shortAnswer: "Maximize profit is the objective; a profit constraint would be something like 'profit ≥ 1000'.",
    explanation: "The objective is what you want to optimize; constraints are additional requirements.",
    hint: "Optimize vs require.",
    level: "moderate"
  },
  {
    question: "How do you write the objective function in standard form?",
    shortAnswer: "Maximize Z = c₁x₁ + c₂x₂ + ... or Minimize Z = c₁x₁ + c₂x₂ + ...",
    explanation: "The objective is written with 'Maximize' or 'Minimize' followed by the expression.",
    hint: "Start with Max or Min.",
    level: "basic"
  },
  {
    question: "What is the purpose of the 'Subject to' phrase in an LP model?",
    shortAnswer: "It introduces the constraints after the objective.",
    explanation: "'Subject to' separates the objective from the constraints.",
    hint: "It means 'under these conditions'.",
    level: "basic"
  }
];

export default questions;