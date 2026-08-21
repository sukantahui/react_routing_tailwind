

const questions = [
  {
    question: "What are decision variables in Linear Programming?",
    shortAnswer: "Decision variables are the unknown quantities that we can control and need to determine in an LP model.",
    explanation: "They represent the choices available to the decision-maker, such as units to produce, hours to allocate, or amount to invest.",
    hint: "They are the 'what' you decide.",
    level: "basic"
  },
  {
    question: "Give an example of a decision variable in a production problem.",
    shortAnswer: "Let x = number of units of Product A to produce, y = number of units of Product B to produce.",
    explanation: "These variables are what we decide to produce; the objective and constraints are expressed in terms of them.",
    hint: "You choose how many of each product to make.",
    level: "basic"
  },
  {
    question: "What is the difference between a decision variable and a parameter?",
    shortAnswer: "A decision variable is what we control; a parameter is a fixed value (like cost per unit or available resources).",
    explanation: "Parameters are given constants; decision variables are unknowns we solve for.",
    hint: "Variables change; parameters are fixed.",
    level: "moderate"
  },
  {
    question: "Why must decision variables be non-negative in LP?",
    shortAnswer: "Because they usually represent real quantities (e.g., units produced) that cannot be negative.",
    explanation: "In most business and engineering contexts, negative quantities are meaningless. Non-negativity is a standard assumption.",
    hint: "Can you produce -3 units?",
    level: "basic"
  },
  {
    question: "How do decision variables relate to the objective function?",
    shortAnswer: "The objective function is a linear expression of the decision variables, representing the goal to be optimized.",
    explanation: "For example, profit = 5x + 3y, where x and y are decision variables.",
    hint: "The objective tells you what you want to achieve using the variables.",
    level: "basic"
  },
  {
    question: "In a diet problem, what would the decision variables represent?",
    shortAnswer: "The quantities of each food item to include in the diet (e.g., x = servings of vegetable A, y = servings of fruit B).",
    explanation: "The objective might be to minimize cost or meet nutritional requirements.",
    hint: "You choose how much of each food to eat.",
    level: "moderate"
  },
  {
    question: "What is a common mistake when defining decision variables?",
    shortAnswer: "Using vague or ambiguous definitions, such as 'production quantity' without specifying product type.",
    explanation: "Always be explicit: 'x₁ = units of product 1', 'x₂ = units of product 2', etc.",
    hint: "Avoid confusion by naming clearly.",
    level: "moderate"
  },
  {
    question: "Should decision variables always be continuous?",
    shortAnswer: "In classical LP, yes. If they must be integers, it becomes Integer Programming.",
    explanation: "LP assumes variables can take any real value. When integer restrictions are required, you need IP or MIP.",
    hint: "Can you produce 2.5 items? Sometimes yes, sometimes no.",
    level: "expert"
  },
  {
    question: "What is the role of decision variables in constraints?",
    shortAnswer: "Constraints are linear inequalities or equalities involving decision variables that limit their values.",
    explanation: "For example, x + y ≤ 100 means total production cannot exceed available hours.",
    hint: "Constraints impose limits on the variables.",
    level: "basic"
  },
  {
    question: "Can a decision variable represent a binary choice (yes/no)?",
    shortAnswer: "In LP, no – LP uses continuous variables. For binary decisions, you use Integer Programming.",
    explanation: "If you need a variable to be 0 or 1, that's a binary variable, which requires IP.",
    hint: "Binary is 0 or 1, not continuous.",
    level: "moderate"
  },
  {
    question: "What is the difference between a decision variable and a slack variable?",
    shortAnswer: "A decision variable is the quantity we optimize over; a slack variable is added to convert an inequality to equality and represents unused resources.",
    explanation: "Slack variables are auxiliary and do not appear in the objective (with zero coefficient).",
    hint: "Slack variables are for 'leftover' resources.",
    level: "expert"
  },
  {
    question: "In a transportation problem, what are the decision variables?",
    shortAnswer: "The amount of goods shipped from each origin to each destination.",
    explanation: "For example, x_{ij} = number of units shipped from supply point i to demand point j.",
    hint: "You decide how many units to send on each route.",
    level: "moderate"
  },
  {
    question: "What is the importance of choosing the right decision variables?",
    shortAnswer: "Well-chosen variables make the model easier to formulate, solve, and interpret.",
    explanation: "Poor choices can lead to a overly complex or incorrect model.",
    hint: "The right variables simplify the problem.",
    level: "moderate"
  },
  {
    question: "How can you ensure decision variables are independent?",
    shortAnswer: "They should be distinct and not be functions of each other; each represents a separate choice.",
    explanation: "If one variable can be derived from others, the model may have redundancy.",
    hint: "Avoid overlap in meaning.",
    level: "expert"
  },
  {
    question: "What is the effect of scaling decision variables (e.g., using thousands instead of units)?",
    shortAnswer: "It can affect numerical stability but not the optimal solution if done consistently.",
    explanation: "Scaling changes coefficients and may help solvers, but the economic interpretation remains.",
    hint: "You can use units or thousands – just be consistent.",
    level: "expert"
  },
  {
    question: "In an investment problem, what would decision variables represent?",
    shortAnswer: "The amount of money invested in each available asset.",
    explanation: "For example, x₁ = dollars in stocks, x₂ = dollars in bonds, etc.",
    hint: "You allocate your budget among investment options.",
    level: "moderate"
  },
  {
    question: "Why is it important to define the units of decision variables?",
    shortAnswer: "To ensure consistency with constraints and objective, and to give meaning to the solution.",
    explanation: "If x is in hours, then any coefficient using x must also be in hours or per hour.",
    hint: "Units prevent mismatches.",
    level: "moderate"
  },
  {
    question: "Can a decision variable have a lower bound other than zero?",
    shortAnswer: "Yes, you can set lower bounds like x ≥ 2 to enforce minimum production.",
    explanation: "This is just an additional constraint beyond non-negativity.",
    hint: "You can force a variable to be at least a certain value.",
    level: "basic"
  },
  {
    question: "What is a 'free' variable in LP?",
    shortAnswer: "A variable that can take any real value (positive or negative), which is uncommon because most LP problems require non-negativity.",
    explanation: "Free variables can be transformed by substitution into two non-negative variables.",
    hint: "Free variables are unrestricted in sign.",
    level: "expert"
  },
  {
    question: "In a blending problem, what do decision variables represent?",
    shortAnswer: "The amount of each raw material used in the final product.",
    explanation: "Example: x₁ = tons of ingredient A, x₂ = tons of ingredient B to blend into a final mixture.",
    hint: "You choose how much of each ingredient to mix.",
    level: "moderate"
  },
  {
    question: "How do you decide how many decision variables to use?",
    shortAnswer: "Each independent decision should have its own variable. Too few may oversimplify; too many may overcomplicate.",
    explanation: "Typically, you define one variable per controllable activity or choice.",
    hint: "Each variable represents a distinct choice.",
    level: "moderate"
  },
  {
    question: "What is the relationship between decision variables and the feasible region?",
    shortAnswer: "The feasible region is the set of all possible values of the decision variables that satisfy all constraints.",
    explanation: "The variables span the space in which the feasible region is defined.",
    hint: "Variables define the axes of the feasible region.",
    level: "basic"
  },
  {
    question: "Can decision variables be negative in some LP formulations?",
    shortAnswer: "Yes, but then you need to handle that explicitly; most practical LP uses non-negative variables.",
    explanation: "Negative variables might represent net positions or changes, but they are less common.",
    hint: "Usually we avoid negative variables unless needed.",
    level: "moderate"
  },
  {
    question: "What is the role of indexing in decision variables?",
    shortAnswer: "Indexing allows you to handle many similar variables compactly, e.g., xᵢ for product i.",
    explanation: "It simplifies notation and is essential for large-scale problems.",
    hint: "Use indices for multiple items.",
    level: "moderate"
  },
  {
    question: "Why are decision variables considered the 'unknowns' of an LP problem?",
    shortAnswer: "Because we do not know their values initially; we solve the LP to find the optimal values.",
    explanation: "They are the quantities we seek to determine.",
    hint: "You solve for them.",
    level: "basic"
  },
  {
    question: "What mistake do beginners often make when defining decision variables?",
    shortAnswer: "They define variables without stating what they represent or use too many variables unnecessarily.",
    explanation: "Always write: 'Let x = ...' and ensure each variable has a unique, clear meaning.",
    hint: "Be explicit and concise.",
    level: "moderate"
  },
  {
    question: "In a marketing mix problem, what could be a decision variable?",
    shortAnswer: "The advertising spend on each channel (e.g., x₁ = TV spend, x₂ = radio spend).",
    explanation: "The goal is to maximize reach or conversions subject to budget constraints.",
    hint: "You allocate budget across channels.",
    level: "moderate"
  },
  {
    question: "How are decision variables used in sensitivity analysis?",
    shortAnswer: "Sensitivity analysis examines how changes in parameters affect the optimal values of decision variables.",
    explanation: "It helps decision-makers understand which variables are most sensitive to changes.",
    hint: "You check stability of the optimal decisions.",
    level: "expert"
  },
  {
    question: "Can a single decision variable represent multiple activities?",
    shortAnswer: "No, each variable should represent a single, distinct activity to avoid confusion.",
    explanation: "If one variable combines two activities, you lose the ability to differentiate them.",
    hint: "Keep variables one-to-one with activities.",
    level: "basic"
  },
  {
    question: "What is the most important property of decision variables in LP?",
    shortAnswer: "They must be independent and controllable, and their relationships must be linear.",
    explanation: "You decide their values, and they appear linearly in the objective and constraints.",
    hint: "You control them; they are linear.",
    level: "basic"
  }
];

export default questions;