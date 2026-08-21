// topic38_files/topic38_questions.js

const questions = [
  {
    question: "What type of problem is best solved using LP?",
    shortAnswer: "Problems with a linear objective and linear constraints.",
    explanation: "LP is suitable for problems where both the objective and constraints can be expressed as linear functions of the decision variables.",
    hint: "Think about linear relationships.",
    level: "basic"
  },
  {
    question: "What is the first step in solving an LP problem?",
    shortAnswer: "Read and understand the problem statement carefully.",
    explanation: "Understanding the problem is essential before writing any equations.",
    hint: "Start with understanding.",
    level: "basic"
  },
  {
    question: "What are decision variables in an LP problem?",
    shortAnswer: "The quantities the decision-maker can control and wants to determine.",
    explanation: "Decision variables represent the choices available to the decision-maker.",
    hint: "They are the 'what you decide'.",
    level: "basic"
  },
  {
    question: "What is the objective function in an LP problem?",
    shortAnswer: "The linear expression that defines the goal to be optimized.",
    explanation: "The objective is what you want to maximize or minimize.",
    hint: "It tells you what you are trying to achieve.",
    level: "basic"
  },
  {
    question: "What are constraints in an LP problem?",
    shortAnswer: "The limitations or requirements that restrict the decision variables.",
    explanation: "Constraints define the feasible region of possible solutions.",
    hint: "They are the rules you must follow.",
    level: "basic"
  },
  {
    question: "What is the feasible region in an LP problem?",
    shortAnswer: "The set of all points that satisfy all constraints.",
    explanation: "The feasible region contains all possible solutions.",
    hint: "It's the 'allowed area'.",
    level: "basic"
  },
  {
    question: "What is the optimal solution in an LP problem?",
    shortAnswer: "The feasible solution that gives the best objective value.",
    explanation: "The optimal solution is the best possible outcome.",
    hint: "It's the 'best' solution.",
    level: "basic"
  },
  {
    question: "What is a binding constraint?",
    shortAnswer: "A constraint that is satisfied with equality at the optimal solution.",
    explanation: "Binding constraints indicate fully used resources.",
    hint: "Fully used resource.",
    level: "moderate"
  },
  {
    question: "What is a slack variable?",
    shortAnswer: "The amount of unused resource in a ≤ constraint.",
    explanation: "Slack = RHS - LHS for a ≤ constraint.",
    hint: "Unused resource.",
    level: "moderate"
  },
  {
    question: "What is a surplus variable?",
    shortAnswer: "The amount by which a ≥ constraint is exceeded.",
    explanation: "Surplus = LHS - RHS for a ≥ constraint.",
    hint: "Excess over requirement.",
    level: "moderate"
  },
  {
    question: "What is a shadow price?",
    shortAnswer: "The change in objective value per unit increase in the RHS of a constraint.",
    explanation: "Shadow prices indicate the value of additional resources.",
    hint: "Value of one more unit.",
    level: "moderate"
  },
  {
    question: "What does it mean if a variable is zero at the optimum?",
    shortAnswer: "That activity is not profitable or efficient enough to be used.",
    explanation: "Zero variables indicate activities that should not be pursued.",
    hint: "Not worth doing.",
    level: "moderate"
  },
  {
    question: "What is the difference between ≤ and ≥ constraints?",
    shortAnswer: "≤ means less than or equal to (limit); ≥ means greater than or equal to (requirement).",
    explanation: "The direction of the inequality determines the type of constraint.",
    hint: "≤ for limits, ≥ for requirements.",
    level: "basic"
  },
  {
    question: "How do you convert a minimization problem to maximization?",
    shortAnswer: "Multiply the objective function by -1.",
    explanation: "Min f(x) = -Max(-f(x)).",
    hint: "Flip the sign.",
    level: "moderate"
  },
  {
    question: "What is the purpose of non-negativity constraints?",
    shortAnswer: "To ensure variables represent realistic, non-negative quantities.",
    explanation: "Most decision variables represent physical quantities that cannot be negative.",
    hint: "No negative values.",
    level: "basic"
  },
  {
    question: "What is the graphical method used for?",
    shortAnswer: "Solving LP problems with 2 variables.",
    explanation: "The graphical method plots constraints and finds the optimal corner point.",
    hint: "For 2-variable problems.",
    level: "moderate"
  },
  {
    question: "What is the simplex method used for?",
    shortAnswer: "Solving LP problems with 3+ variables.",
    explanation: "The simplex method is an algorithm for solving larger LP problems.",
    hint: "For 3+ variables.",
    level: "expert"
  },
  {
    question: "What is a redundant constraint?",
    shortAnswer: "A constraint that does not affect the feasible region.",
    explanation: "Redundant constraints are always satisfied when other constraints are met.",
    hint: "It adds no new restriction.",
    level: "expert"
  },
  {
    question: "What is an infeasible LP problem?",
    shortAnswer: "A problem with no solution that satisfies all constraints.",
    explanation: "Infeasibility occurs when constraints are contradictory.",
    hint: "No solution exists.",
    level: "moderate"
  },
  {
    question: "What is an unbounded LP problem?",
    shortAnswer: "A problem where the objective value can go to infinity.",
    explanation: "Unboundedness occurs when variables can increase indefinitely.",
    hint: "Infinite solution.",
    level: "expert"
  },
  {
    question: "What is the difference between max and min objectives?",
    shortAnswer: "Max looks for the largest value; Min looks for the smallest.",
    explanation: "The direction of optimization determines the solution.",
    hint: "Largest vs smallest.",
    level: "basic"
  },
  {
    question: "What is a transportation problem?",
    shortAnswer: "A problem involving shipping goods from sources to destinations.",
    explanation: "Transportation problems minimize shipping costs while meeting supply and demand.",
    hint: "Shipping optimization.",
    level: "moderate"
  },
  {
    question: "What is a blending problem?",
    shortAnswer: "A problem involving mixing ingredients to meet quality specifications.",
    explanation: "Blending problems minimize cost while meeting quality requirements.",
    hint: "Mixing optimization.",
    level: "moderate"
  },
  {
    question: "What is a diet problem?",
    shortAnswer: "A problem involving selecting foods to meet nutritional requirements at minimum cost.",
    explanation: "Diet problems minimize cost while meeting nutritional needs.",
    hint: "Food optimization.",
    level: "moderate"
  },
  {
    question: "What is the role of sensitivity analysis?",
    shortAnswer: "To understand how changes affect the optimal solution.",
    explanation: "Sensitivity analysis tests the robustness of the solution.",
    hint: "Test robustness.",
    level: "expert"
  },
  {
    question: "What is the dual of an LP problem?",
    shortAnswer: "A related LP problem with swapped roles of variables and constraints.",
    explanation: "The dual provides shadow prices and economic interpretation.",
    hint: "Related LP problem.",
    level: "expert"
  },
  {
    question: "What is a mixed-integer LP problem?",
    shortAnswer: "An LP problem where some variables must be integers.",
    explanation: "MILP is used when variables represent discrete quantities.",
    hint: "Integer variables.",
    level: "expert"
  },
  {
    question: "What is the first step in formulating an LP model?",
    shortAnswer: "Identify and define the decision variables.",
    explanation: "Variables are the foundation of the model.",
    hint: "Start with variables.",
    level: "basic"
  },
  {
    question: "What is the last step in formulating an LP model?",
    shortAnswer: "Review and validate the model.",
    explanation: "Checking the model ensures it is correct.",
    hint: "Check your work.",
    level: "basic"
  },
  {
    question: "Why is practice important for LP?",
    shortAnswer: "Practice builds familiarity with different problem types and solution techniques.",
    explanation: "Regular practice develops intuition and problem-solving skills.",
    hint: "Practice makes perfect.",
    level: "basic"
  }
];

export default questions;