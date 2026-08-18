// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What is the main difference between cost minimization and profit maximization problems?",
    shortAnswer: "Cost minimization seeks the lowest cost to meet requirements; profit maximization seeks the highest profit with resource limits.",
    explanation: "In cost minimization, the objective is to minimize cost while meeting minimum requirements (≥ constraints). In profit maximization, the objective is to maximize profit subject to resource limits (≤ constraints).",
    hint: "Minimize cost vs maximize profit.",
    level: "basic"
  },
  {
    question: "In the cost minimization example, what are the decision variables?",
    shortAnswer: "x₁ = units of Product X, x₂ = units of Product Y.",
    explanation: "These represent the quantities of each product to be produced at minimum cost.",
    hint: "Two products, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the cost minimization example?",
    shortAnswer: "Minimize Z = 40x₁ + 60x₂.",
    explanation: "Product X costs ₹40 per unit, Product Y costs ₹60 per unit.",
    hint: "Cost per unit for each product.",
    level: "basic"
  },
  {
    question: "What does the Resource A constraint represent?",
    shortAnswer: "2x₁ + 3x₂ ≥ 24, meaning total Resource A must be at least 24 units.",
    explanation: "Product X provides 2 units, Product Y provides 3 units per unit produced.",
    hint: "Minimum requirement for Resource A.",
    level: "basic"
  },
  {
    question: "What does the Resource B constraint represent?",
    shortAnswer: "4x₁ + 2x₂ ≥ 20, meaning total Resource B must be at least 20 units.",
    explanation: "Product X provides 4 units, Product Y provides 2 units per unit produced.",
    hint: "Minimum requirement for Resource B.",
    level: "basic"
  },
  {
    question: "What type of inequality is used for minimum requirements?",
    shortAnswer: "≥ (greater than or equal to).",
    explanation: "When you need at least a certain amount, you use ≥ constraints.",
    hint: "At least = ≥.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the cost minimization example?",
    shortAnswer: "x₁ = 1.5, x₂ = 7 with cost = ₹480 (and alternative optimum at x₁ = 12, x₂ = 0).",
    explanation: "Both solutions give the minimum cost of ₹480.",
    hint: "Minimum cost value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Both Resource A and Resource B are binding (fully used).",
    explanation: "At (1.5, 7): Resource A = 2(1.5)+3(7)=24, Resource B = 4(1.5)+2(7)=20.",
    hint: "Both resources are fully used.",
    level: "moderate"
  },
  {
    question: "What is the cost at the optimal solution?",
    shortAnswer: "₹480.",
    explanation: "Z = 40(1.5) + 60(7) = 60 + 420 = 480.",
    hint: "Minimum cost value.",
    level: "basic"
  },
  {
    question: "What does it mean if there are multiple optimal solutions?",
    shortAnswer: "The objective function is parallel to a constraint, giving multiple points with the same optimal value.",
    explanation: "When the objective line is parallel to a binding constraint, all points along that segment have the same objective value.",
    hint: "Objective parallel to constraint.",
    level: "expert"
  },
  {
    question: "What are the corner points of the feasible region in this example?",
    shortAnswer: "(0, 10), (1.5, 7), (12, 0).",
    explanation: "These are the vertices of the feasible region where the optimal solution lies.",
    hint: "Intersection points of constraints.",
    level: "moderate"
  },
  {
    question: "Why does the feasible region extend upward and to the right?",
    shortAnswer: "Because ≥ constraints require the region to be above the constraint lines.",
    explanation: "Unlike ≤ constraints which limit from above, ≥ constraints require the region to be at or above the line.",
    hint: "≥ means above or on the line.",
    level: "moderate"
  },
  {
    question: "What is the difference between ≤ and ≥ constraints in graphical solution?",
    shortAnswer: "≤ constraints bound the region from above; ≥ constraints bound the region from below.",
    explanation: "With ≤, the feasible region is below the line; with ≥, the feasible region is above the line.",
    hint: "Below vs above.",
    level: "basic"
  },
  {
    question: "If Product X costs ₹50 instead of ₹40, what happens to the optimal solution?",
    shortAnswer: "The optimal solution changes because the relative costs have changed.",
    explanation: "Product X becomes more expensive, so the solution may shift toward more Product Y.",
    hint: "Cost change affects the objective.",
    level: "expert"
  },
  {
    question: "What is the total cost if only Product X is used?",
    shortAnswer: "₹480.",
    explanation: "With only Product X, need max(24/2, 20/4) = max(12, 5) = 12 units. Cost = 40(12) = ₹480.",
    hint: "Only Product X.",
    level: "moderate"
  },
  {
    question: "What is the total cost if only Product Y is used?",
    shortAnswer: "₹600.",
    explanation: "With only Product Y, need max(24/3, 20/2) = max(8, 10) = 10 units. Cost = 60(10) = ₹600.",
    hint: "Only Product Y.",
    level: "moderate"
  },
  {
    question: "Why is (12, 0) also optimal?",
    shortAnswer: "Because the objective function is parallel to the Resource A constraint at that point.",
    explanation: "The objective function 40x₁ + 60x₂ = 480 is parallel to Resource A: 2x₁ + 3x₂ = 24 (both have slope -2/3).",
    hint: "Parallel objective and constraint.",
    level: "expert"
  },
  {
    question: "What is the slope of the objective function?",
    shortAnswer: "-2/3 (from 40x₁ + 60x₂ = constant).",
    explanation: "Solving for x₂: x₂ = (constant - 40x₁)/60 = constant/60 - (2/3)x₁.",
    hint: "Slope of objective line.",
    level: "expert"
  },
  {
    question: "What is the slope of the Resource A constraint?",
    shortAnswer: "-2/3 (from 2x₁ + 3x₂ = 24).",
    explanation: "Solving for x₂: x₂ = 8 - (2/3)x₁.",
    hint: "Slope of constraint.",
    level: "expert"
  },
  {
    question: "How do you find the intersection of Resource A and Resource B constraints?",
    shortAnswer: "Solve the system: 2x₁+3x₂=24 and 4x₁+2x₂=20.",
    explanation: "Solving gives x₁ = 1.5, x₂ = 7.",
    hint: "Solve the two equations.",
    level: "moderate"
  },
  {
    question: "What type of problem is cost minimization?",
    shortAnswer: "A minimization problem, which is the dual of maximization.",
    explanation: "Cost minimization problems have objectives to minimize and constraints with ≥ signs.",
    hint: "Minimize = reduction.",
    level: "basic"
  },
  {
    question: "What is a common mistake in cost minimization problems?",
    shortAnswer: "Using ≤ instead of ≥ for minimum requirements.",
    explanation: "Minimum requirements need ≥ constraints. Using ≤ means you're limiting, not meeting requirements.",
    hint: "Check constraint direction.",
    level: "moderate"
  },
  {
    question: "What is the feasible region for a minimization problem?",
    shortAnswer: "The region above all constraint lines (for ≥ constraints).",
    explanation: "Since you need to meet minimum requirements, the feasible region extends upward from the constraints.",
    hint: "Above the lines.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of binding constraints in cost minimization?",
    shortAnswer: "Both resources are fully used to meet requirements at minimum cost.",
    explanation: "There is no waste—every unit of resource is needed to satisfy the requirements.",
    hint: "No excess resources.",
    level: "expert"
  },
  {
    question: "If Resource A requirement increases to 30, what happens?",
    shortAnswer: "The optimal solution changes, and cost increases.",
    explanation: "More Resource A is needed, requiring more production and higher cost.",
    hint: "More requirements = higher cost.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in cost minimization?",
    shortAnswer: "To ensure production quantities are non-negative.",
    explanation: "You cannot produce negative units of any product.",
    hint: "No negative production.",
    level: "basic"
  },
  {
    question: "How does cost minimization differ from profit maximization in terms of constraints?",
    shortAnswer: "Cost minimization uses ≥ constraints; profit maximization uses ≤ constraints.",
    explanation: "Cost minimization is about meeting minimum requirements; profit maximization is about staying within resource limits.",
    hint: "≥ vs ≤.",
    level: "moderate"
  },
  {
    question: "What is the objective function if Product Y costs ₹50 instead of ₹60?",
    shortAnswer: "Minimize Z = 40x₁ + 50x₂.",
    explanation: "The coefficient of x₂ changes from 60 to 50.",
    hint: "Cost per unit of Y changed.",
    level: "moderate"
  },
  {
    question: "Why is cost minimization important in business?",
    shortAnswer: "It helps companies meet requirements at the lowest possible cost, improving profitability.",
    explanation: "Minimizing costs while meeting quality or regulatory standards is a key business objective.",
    hint: "Reduce costs, meet standards.",
    level: "moderate"
  },
  {
    question: "What is the dual of a cost minimization problem?",
    shortAnswer: "A profit maximization problem.",
    explanation: "The dual of a minimization problem is a maximization problem, and vice versa.",
    hint: "Minimization ↔ Maximization.",
    level: "expert"
  },
  {
    question: "What does it mean if there is only one optimal solution?",
    shortAnswer: "The objective function is not parallel to any binding constraint.",
    explanation: "When the objective slope is unique, there is a single optimal corner point.",
    hint: "Unique optimal = not parallel.",
    level: "expert"
  }
];

export default questions;