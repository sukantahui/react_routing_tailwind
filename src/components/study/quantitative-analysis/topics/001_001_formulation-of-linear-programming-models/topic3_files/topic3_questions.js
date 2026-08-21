// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the objective function in Linear Programming?",
    shortAnswer: "The objective function is a linear expression that defines the goal of the LP problem – to maximize or minimize a quantity.",
    explanation: "It represents what we want to optimize, such as profit, cost, time, or distance, expressed as a linear combination of decision variables.",
    hint: "It's what you want to achieve.",
    level: "basic"
  },
  {
    question: "What are the two types of objective functions in LP?",
    shortAnswer: "Maximization and minimization.",
    explanation: "Maximization objectives (e.g., maximize profit) and minimization objectives (e.g., minimize cost) are the two fundamental types.",
    hint: "You either want more of something good or less of something bad.",
    level: "basic"
  },
  {
    question: "How is the objective function mathematically expressed?",
    shortAnswer: "As Z = c₁x₁ + c₂x₂ + ... + cₙxₙ, where cᵢ are coefficients and xᵢ are decision variables.",
    explanation: "Z is the objective value. The coefficients cᵢ represent the contribution per unit of each decision variable.",
    hint: "It's a linear sum of variables with known weights.",
    level: "moderate"
  },
  {
    question: "Give an example of a maximization objective function.",
    shortAnswer: "Z = 5x₁ + 3x₂, where x₁ and x₂ are units of products, and 5 and 3 are profit per unit.",
    explanation: "This objective means we want to maximize total profit from producing two products.",
    hint: "Profit is typically maximized.",
    level: "basic"
  },
  {
    question: "Give an example of a minimization objective function.",
    shortAnswer: "Z = 2x₁ + 4x₂, where x₁ and x₂ are quantities of ingredients, and 2 and 4 are costs per unit.",
    explanation: "This objective means we want to minimize total cost while meeting nutritional or other requirements.",
    hint: "Cost is typically minimized.",
    level: "basic"
  },
  {
    question: "What does the coefficient in the objective function represent?",
    shortAnswer: "It represents the contribution (profit, cost, time) per unit of the corresponding decision variable.",
    explanation: "For example, if x₁ represents units of Product A, and the coefficient is 5, then each unit of Product A contributes 5 to the objective.",
    hint: "It's the per-unit value.",
    level: "moderate"
  },
  {
    question: "Can an LP have multiple objective functions?",
    shortAnswer: "Classical LP has only one objective function. Multi-objective LP or goal programming handles multiple objectives.",
    explanation: "Multiple objectives can be combined using weighted sums or handled with extensions.",
    hint: "LP is for a single goal.",
    level: "expert"
  },
  {
    question: "What is the relationship between the objective function and the feasible region?",
    shortAnswer: "The objective function is evaluated over the feasible region; the optimal solution is the point in the feasible region that gives the best objective value.",
    explanation: "The feasible region defines the possible values of variables; the objective selects the best among them.",
    hint: "The objective picks the best point in the allowed area.",
    level: "moderate"
  },
  {
    question: "What happens if the objective function is parallel to a constraint?",
    shortAnswer: "There may be multiple optimal solutions (infinite alternatives) along the boundary of the feasible region.",
    explanation: "If the objective function line is parallel to a binding constraint, any point on that segment is optimal.",
    hint: "You have choices – all equally good.",
    level: "expert"
  },
  {
    question: "How do you convert a minimization objective to maximization?",
    shortAnswer: "Multiply the objective function by -1 and solve as maximization.",
    explanation: "Minimizing Z is equivalent to maximizing -Z. This is a common trick when solvers only handle maximization.",
    hint: "Flip the sign and the direction.",
    level: "moderate"
  },
  {
    question: "What is the role of the objective function in sensitivity analysis?",
    shortAnswer: "It helps determine how changes in coefficients or constraints affect the optimal objective value.",
    explanation: "Sensitivity analysis examines the stability of the objective value with respect to parameter changes.",
    hint: "It checks if the optimal value is robust.",
    level: "expert"
  },
  {
    question: "Can the objective function be a constant?",
    shortAnswer: "Yes, but then there is no optimization to do – all feasible solutions give the same objective value.",
    explanation: "If all coefficients are zero, the objective is constant and any feasible solution is optimal.",
    hint: "No need to optimize if everything is equal.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the objective function in a diet problem?",
    shortAnswer: "To minimize the cost of the diet while meeting nutritional requirements.",
    explanation: "The objective function is the sum of costs of each food item multiplied by the quantity consumed.",
    hint: "You want to spend the least amount.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the objective function in a production problem?",
    shortAnswer: "To maximize profit by choosing the optimal product mix.",
    explanation: "The objective function sums the profit per unit of each product multiplied by the number of units produced.",
    hint: "You want to earn the most money.",
    level: "moderate"
  },
  {
    question: "Why is it important that the objective function is linear?",
    shortAnswer: "Linearity ensures the problem is convex and solvable efficiently with LP algorithms.",
    explanation: "Non-linear objective functions require different optimization techniques and may have multiple local optima.",
    hint: "Linear means simple and guaranteed.",
    level: "expert"
  },
  {
    question: "What is the difference between the objective function and constraints?",
    shortAnswer: "The objective function defines what to optimize; constraints define the limits within which we must operate.",
    explanation: "The objective is the goal; constraints are the rules.",
    hint: "One is the target, the others are the boundaries.",
    level: "basic"
  },
  {
    question: "In an investment problem, what would the objective function be?",
    shortAnswer: "Maximize total return, e.g., Z = r₁x₁ + r₂x₂ + ... + rₙxₙ, where rᵢ are expected returns.",
    explanation: "The objective is to allocate funds to maximize overall return, subject to risk and budget constraints.",
    hint: "You want the most profit from your investments.",
    level: "moderate"
  },
  {
    question: "What is the objective function in a transportation problem?",
    shortAnswer: "Minimize total shipping cost, e.g., Z = Σ c_{ij} x_{ij}, where c_{ij} is the cost per unit shipped from i to j.",
    explanation: "The goal is to find the cheapest way to move goods from supply to demand nodes.",
    hint: "You want to spend the least on shipping.",
    level: "moderate"
  },
  {
    question: "What does it mean if the objective function coefficient is zero?",
    shortAnswer: "That variable does not affect the objective; it only appears in constraints.",
    explanation: "A zero coefficient means the variable has no direct contribution to the goal, but it still may be needed to satisfy constraints.",
    hint: "It's a 'free' variable in the objective sense.",
    level: "moderate"
  },
  {
    question: "How does the objective function help in decision-making?",
    shortAnswer: "It provides a clear metric to compare alternatives and choose the one that best meets the goal.",
    explanation: "The objective function quantifies the outcome, allowing quantitative comparison of different decisions.",
    hint: "It gives you a number to optimize.",
    level: "basic"
  },
  {
    question: "What is a common mistake when writing the objective function?",
    shortAnswer: "Including constants or non-linear terms, or forgetting to include all relevant variables.",
    explanation: "Constants don't affect the optimal solution and non-linear terms break LP assumptions.",
    hint: "Keep it linear and include all variables.",
    level: "moderate"
  },
  {
    question: "Can the objective function be unbounded?",
    shortAnswer: "Yes, if the feasible region is unbounded in a direction that improves the objective, the objective can go to infinity (for maximization).",
    explanation: "Unboundedness indicates that there is no finite optimal solution; the model is missing constraints.",
    hint: "If you can improve indefinitely, something is wrong.",
    level: "expert"
  },
  {
    question: "What is the effect of scaling the objective function?",
    shortAnswer: "It does not change the optimal solution; it only scales the objective value.",
    explanation: "Multiplying the objective by a positive constant preserves the optimal variables.",
    hint: "It doesn't matter if you use dollars or cents.",
    level: "moderate"
  },
  {
    question: "What is the role of the objective function in the Simplex Method?",
    shortAnswer: "It determines the direction of movement from one vertex to another, seeking to improve the objective value.",
    explanation: "The Simplex Method uses the objective coefficients to select entering variables that increase (or decrease) the objective.",
    hint: "It guides the algorithm towards the optimum.",
    level: "expert"
  },
  {
    question: "What is a 'shadow price' in relation to the objective function?",
    shortAnswer: "It is the change in the objective value per unit increase in a constraint's right-hand side.",
    explanation: "Shadow prices tell you the marginal value of resources and are derived from the dual LP.",
    hint: "It shows the value of relaxing a constraint.",
    level: "expert"
  },
  {
    question: "Why is the objective function often denoted as Z?",
    shortAnswer: "Z is a convention used to represent the objective value in LP textbooks and practice.",
    explanation: "It's a common notation; some use other letters like f(x) or profit, but Z is classic.",
    hint: "It's just a naming convention.",
    level: "basic"
  },
  {
    question: "Can the objective function have negative coefficients?",
    shortAnswer: "Yes, for minimization problems (costs) or if a variable has a negative contribution (e.g., waste).",
    explanation: "Negative coefficients are perfectly valid; the objective can be minimized or maximized even with negative terms.",
    hint: "Negative means it hurts the objective.",
    level: "moderate"
  },
  {
    question: "What is the difference between the objective function and the constraints in terms of variables?",
    shortAnswer: "Both involve decision variables, but the objective is a single expression to optimize, while constraints are multiple inequalities or equalities.",
    explanation: "The objective uses all variables (usually) to form a single scalar; constraints are separate limits on variable combinations.",
    hint: "One goal vs. many limits.",
    level: "basic"
  },
  {
    question: "How do you determine the coefficients of the objective function?",
    shortAnswer: "They are derived from the problem data: profit per unit, cost per unit, time per unit, etc.",
    explanation: "These coefficients represent the per-unit contribution of each decision variable to the overall goal.",
    hint: "They come from the real-world values.",
    level: "moderate"
  },
  {
    question: "Why is the objective function essential in LP?",
    shortAnswer: "Without it, you have only a feasibility problem; the objective is what makes LP an optimization tool.",
    explanation: "The objective function is the 'why' of the model – without it, any feasible solution is equally valid.",
    hint: "It's what makes the problem meaningful.",
    level: "basic"
  }
];

export default questions;