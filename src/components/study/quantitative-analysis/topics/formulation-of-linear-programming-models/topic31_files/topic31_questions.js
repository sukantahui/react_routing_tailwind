// topic31_files/topic31_questions.js

const questions = [
  {
    question: "What are decision variables in Linear Programming?",
    shortAnswer: "Quantities that the decision-maker can control and wants to determine.",
    explanation: "Decision variables are the unknowns in an LP model that represent choices like how much to produce, invest, or allocate.",
    hint: "They are the 'what you decide'.",
    level: "basic"
  },
  {
    question: "What is the first question to ask when identifying decision variables?",
    shortAnswer: "What decisions does the decision-maker need to make?",
    explanation: "Decision variables represent the choices available to the decision-maker.",
    hint: "Think about choices.",
    level: "basic"
  },
  {
    question: "Why is it important to define variables with units?",
    shortAnswer: "To ensure clarity and consistency in the model.",
    explanation: "Units prevent confusion and ensure all terms in equations are compatible.",
    hint: "Units avoid confusion.",
    level: "basic"
  },
  {
    question: "What is a common mistake when defining decision variables?",
    shortAnswer: "Defining variables too vaguely or without clear meaning.",
    explanation: "Vague definitions like 'x' without context lead to confusion and errors.",
    hint: "Be explicit.",
    level: "basic"
  },
  {
    question: "How do you identify variables in a production problem?",
    shortAnswer: "Look for quantities of products to produce.",
    explanation: "In production problems, variables are typically the number of units of each product.",
    hint: "What is being produced?",
    level: "basic"
  },
  {
    question: "How do you identify variables in an investment problem?",
    shortAnswer: "Look for amounts to invest in each asset.",
    explanation: "Investment variables represent the money allocated to different investment options.",
    hint: "What is being invested?",
    level: "basic"
  },
  {
    question: "What does it mean for variables to be independent?",
    shortAnswer: "Each variable represents a distinct decision, not determined by others.",
    explanation: "Independent variables cannot be derived from other variables in the model.",
    hint: "Each variable stands alone.",
    level: "moderate"
  },
  {
    question: "How do you handle multiple time periods in variable definitions?",
    shortAnswer: "Use time-indexed variables like x_t for period t.",
    explanation: "Time-indexed variables allow modeling decisions over multiple periods.",
    hint: "Use subscripts for time.",
    level: "moderate"
  },
  {
    question: "What is a subscripted variable?",
    shortAnswer: "A variable with an index to distinguish multiple similar quantities.",
    explanation: "Example: x₁, x₂, x₃ for different products, or x_{ij} for shipping from i to j.",
    hint: "Indexed variables.",
    level: "basic"
  },
  {
    question: "Why should variables be defined before writing equations?",
    shortAnswer: "To ensure clarity and avoid mistakes in formulation.",
    explanation: "Clear definitions make the model easier to understand and validate.",
    hint: "Define first, then write.",
    level: "basic"
  },
  {
    question: "What is the relationship between variables and the objective function?",
    shortAnswer: "Variables appear in the objective function with coefficients.",
    explanation: "The objective function is a linear combination of the variables.",
    hint: "Objective = sum of variables.",
    level: "moderate"
  },
  {
    question: "What is the relationship between variables and constraints?",
    shortAnswer: "Variables appear in constraints with coefficients representing resource usage.",
    explanation: "Constraints limit the values of variables based on available resources.",
    hint: "Variables in constraints.",
    level: "moderate"
  },
  {
    question: "How do you decide how many variables to use?",
    shortAnswer: "Use one variable for each independent decision or activity.",
    explanation: "Each variable should represent a distinct choice the decision-maker can make.",
    hint: "One per decision.",
    level: "moderate"
  },
  {
    question: "What is a common mistake when choosing the number of variables?",
    shortAnswer: "Using too few variables, which oversimplifies the problem.",
    explanation: "Too few variables may miss important decisions or interactions.",
    hint: "Don't oversimplify.",
    level: "moderate"
  },
  {
    question: "What is the role of non-negativity with decision variables?",
    shortAnswer: "It ensures variables represent realistic, non-negative quantities.",
    explanation: "Most decision variables represent physical quantities that cannot be negative.",
    hint: "No negative variables.",
    level: "basic"
  },
  {
    question: "How do you identify variables in a transportation problem?",
    shortAnswer: "Look for amounts shipped from each source to each destination.",
    explanation: "Transportation variables are typically x_{ij} for shipping from i to j.",
    hint: "Shipping quantities.",
    level: "moderate"
  },
  {
    question: "What is a good way to test if you have the right variables?",
    shortAnswer: "Check if each variable appears in the objective or constraints.",
    explanation: "Every variable should affect the objective or be limited by constraints.",
    hint: "Check variable usage.",
    level: "moderate"
  },
  {
    question: "What does it mean if a variable does not appear in any constraint?",
    shortAnswer: "The variable is unbounded and the problem may have no finite optimum.",
    explanation: "Unbounded variables can go to infinity, making the problem unsolvable.",
    hint: "Every variable needs constraints.",
    level: "expert"
  },
  {
    question: "How do you handle multiple products in variable definitions?",
    shortAnswer: "Use subscripted variables: x₁, x₂, ..., xₙ.",
    explanation: "Subscripts help distinguish different products or activities.",
    hint: "Use subscripts for products.",
    level: "basic"
  },
  {
    question: "What is the difference between a variable and a parameter?",
    shortAnswer: "Variables are unknown decisions; parameters are fixed constants.",
    explanation: "Variables are what you solve for; parameters are given values.",
    hint: "Variables = unknowns, Parameters = constants.",
    level: "basic"
  },
  {
    question: "How do you identify variables in a blending problem?",
    shortAnswer: "Look for amounts of each raw material to use in the blend.",
    explanation: "Blending variables represent the quantity of each ingredient in the mix.",
    hint: "Ingredient quantities.",
    level: "moderate"
  },
  {
    question: "What is a 'free' variable in LP?",
    shortAnswer: "A variable that can take any real value (positive or negative).",
    explanation: "Free variables are rare in LP; they are usually transformed into two non-negative variables.",
    hint: "Unrestricted variable.",
    level: "expert"
  },
  {
    question: "How do you identify variables in a workforce allocation problem?",
    shortAnswer: "Look for numbers of workers assigned to each shift or task.",
    explanation: "Workforce variables represent the allocation of staff to different roles.",
    hint: "Worker assignments.",
    level: "moderate"
  },
  {
    question: "Why is it important to use meaningful variable names?",
    shortAnswer: "To make the model readable and easy to understand.",
    explanation: "Descriptive names like 'x_prod_A' are better than generic 'x'.",
    hint: "Use descriptive names.",
    level: "basic"
  },
  {
    question: "What is the role of a diagram in identifying variables?",
    shortAnswer: "It visualizes the decisions and relationships in the problem.",
    explanation: "Diagrams help identify variables, flows, and interactions.",
    hint: "Visualize the problem.",
    level: "moderate"
  },
  {
    question: "How do you identify variables in a diet problem?",
    shortAnswer: "Look for amounts of each food item to include in the diet.",
    explanation: "Diet variables represent the quantity of each food consumed.",
    hint: "Food quantities.",
    level: "moderate"
  },
  {
    question: "What is the relationship between variables and the feasible region?",
    shortAnswer: "Variables define the dimensions of the feasible region.",
    explanation: "Each variable adds a dimension to the solution space.",
    hint: "Variables = dimensions.",
    level: "moderate"
  },
  {
    question: "How do you check if variables are correctly defined?",
    shortAnswer: "Review the definitions and test with a simple solution.",
    explanation: "Clear definitions make validation easier.",
    hint: "Review and test.",
    level: "moderate"
  },
  {
    question: "What is a common mistake with variable definitions in complex problems?",
    shortAnswer: "Overlooking implicit decisions that should be variables.",
    explanation: "Complex problems often have hidden decisions that must be captured.",
    hint: "Look for hidden decisions.",
    level: "expert"
  },
  {
    question: "What is the first step in formulating an LP model?",
    shortAnswer: "Identify and define the decision variables.",
    explanation: "Variables are the foundation; without them, you cannot write the objective or constraints.",
    hint: "Start with variables.",
    level: "basic"
  }
];

export default questions;