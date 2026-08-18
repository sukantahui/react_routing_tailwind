// topic28_files/topic28_questions.js

const questions = [
  {
    question: "What is the goal of a social context minimization problem?",
    shortAnswer: "To minimize cost while meeting social service requirements.",
    explanation: "These problems apply LP to minimize the cost of providing social services while meeting minimum coverage, quality, or quantity requirements.",
    hint: "Minimize cost, meet social needs.",
    level: "basic"
  },
  {
    question: "In the social minimization example, what are the decision variables?",
    shortAnswer: "x₁ = number of Standard Meals, x₂ = number of Premium Meals.",
    explanation: "These represent the quantities of each meal type to provide.",
    hint: "Two meal types, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the social minimization example?",
    shortAnswer: "Minimize Z = 50x₁ + 80x₂.",
    explanation: "Standard Meals cost ₹50 each, Premium Meals cost ₹80 each.",
    hint: "Cost per meal.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ + x₂ ≥ 500 represent?",
    shortAnswer: "At least 500 people must be served in total.",
    explanation: "This is a minimum coverage requirement for the meal program.",
    hint: "Minimum total people served.",
    level: "basic"
  },
  {
    question: "What does the constraint 600x₁ + 1000x₂ ≥ 400,000 represent?",
    shortAnswer: "Total calories must be at least 400,000.",
    explanation: "This is a nutritional quality requirement.",
    hint: "Minimum calorie requirement.",
    level: "basic"
  },
  {
    question: "What does the constraint x₂ ≥ 200 represent?",
    shortAnswer: "At least 200 people must receive Premium Meals.",
    explanation: "This is a minimum requirement for Premium Meals due to special dietary needs.",
    hint: "Minimum Premium Meals.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≤ 400 represent?",
    shortAnswer: "No more than 400 people can receive Standard Meals.",
    explanation: "This is a maximum limit for Standard Meals due to kitchen capacity.",
    hint: "Maximum Standard Meals.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the social minimization example?",
    shortAnswer: "x₁ = 250, x₂ = 250 with cost = ₹32,500.",
    explanation: "Provide 250 Standard Meals and 250 Premium Meals.",
    hint: "Optimal meal allocation.",
    level: "moderate"
  },
  {
    question: "What is the total cost at the optimal solution?",
    shortAnswer: "₹32,500.",
    explanation: "Cost = 50(250) + 80(250) = 12,500 + 20,000 = 32,500.",
    hint: "Minimum cost value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Total People and Calories are binding; Premium and Standard have slack.",
    explanation: "Total People: 500/500. Calories: 400,000/400,000. Premium: 250 ≥ 200. Standard: 250 ≤ 400.",
    hint: "Check which constraints are tight.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Premium constraint at the optimum?",
    shortAnswer: "50 people (250 - 200 = 50).",
    explanation: "More Premium Meals are provided than the minimum required.",
    hint: "Excess Premium Meals.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Standard constraint at the optimum?",
    shortAnswer: "150 people (400 - 250 = 150).",
    explanation: "Fewer Standard Meals are provided than the maximum allowed.",
    hint: "Unused Standard capacity.",
    level: "moderate"
  },
  {
    question: "What is the cost of one Standard Meal?",
    shortAnswer: "₹50.",
    explanation: "Each Standard Meal costs ₹50.",
    hint: "Standard cost.",
    level: "basic"
  },
  {
    question: "What is the cost of one Premium Meal?",
    shortAnswer: "₹80.",
    explanation: "Each Premium Meal costs ₹80.",
    hint: "Premium cost.",
    level: "basic"
  },
  {
    question: "What is the calorie content of one Standard Meal?",
    shortAnswer: "600 calories.",
    explanation: "Each Standard Meal provides 600 calories.",
    hint: "Standard calories.",
    level: "basic"
  },
  {
    question: "What is the calorie content of one Premium Meal?",
    shortAnswer: "1000 calories.",
    explanation: "Each Premium Meal provides 1000 calories.",
    hint: "Premium calories.",
    level: "basic"
  },
  {
    question: "What is a common mistake in social minimization problems?",
    shortAnswer: "Forgetting that the objective is to minimize, not maximize.",
    explanation: "Social minimization problems aim to reduce costs while meeting requirements.",
    hint: "Minimize, not maximize.",
    level: "basic"
  },
  {
    question: "What is the cost efficiency of Standard Meals (cost per calorie)?",
    shortAnswer: "₹0.083 per calorie (50 ÷ 600).",
    explanation: "Standard Meals cost ₹0.083 per calorie.",
    hint: "Cost divided by calories.",
    level: "moderate"
  },
  {
    question: "What is the cost efficiency of Premium Meals (cost per calorie)?",
    shortAnswer: "₹0.08 per calorie (80 ÷ 1000).",
    explanation: "Premium Meals cost ₹0.08 per calorie.",
    hint: "Cost divided by calories.",
    level: "moderate"
  },
  {
    question: "Which meal type is more cost-efficient per calorie?",
    shortAnswer: "Premium Meals (₹0.08 per calorie).",
    explanation: "Premium Meals give more calories per rupee than Standard Meals.",
    hint: "Lower cost per calorie.",
    level: "moderate"
  },
  {
    question: "Why isn't the cheapest option used exclusively?",
    shortAnswer: "Because minimum requirements force a mix.",
    explanation: "The Premium Meals minimum (x₂ ≥ 200) forces the use of some Premium Meals.",
    hint: "Minimums force mix.",
    level: "moderate"
  },
  {
    question: "If the Premium Meals minimum increases to 300, what happens?",
    shortAnswer: "The optimal solution changes, increasing cost.",
    explanation: "More Premium Meals (more expensive) are required.",
    hint: "Higher minimum = higher cost.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in social minimization problems?",
    shortAnswer: "To ensure meal quantities are non-negative.",
    explanation: "You cannot serve negative meals.",
    hint: "No negative meals.",
    level: "basic"
  },
  {
    question: "What is the total number of meals at the optimal solution?",
    shortAnswer: "500 meals (250 + 250).",
    explanation: "Total meals = 250 + 250 = 500.",
    hint: "Sum of all meals.",
    level: "basic"
  },
  {
    question: "What is the total calories at the optimal solution?",
    shortAnswer: "400,000 calories.",
    explanation: "Calories = 600(250) + 1000(250) = 150,000 + 250,000 = 400,000.",
    hint: "Total calorie usage.",
    level: "moderate"
  },
  {
    question: "What is the difference between minimization and maximization in social contexts?",
    shortAnswer: "Minimization reduces cost; maximization increases social impact.",
    explanation: "Both aim for social good, but one optimizes cost, the other optimizes benefit.",
    hint: "Cost vs impact.",
    level: "moderate"
  },
  {
    question: "If the Standard Meal cost increases to ₹60, what happens?",
    shortAnswer: "The optimal solution shifts toward more Premium Meals.",
    explanation: "Standard Meals become more expensive, making Premium Meals relatively more attractive.",
    hint: "Cost change affects allocation.",
    level: "expert"
  },
  {
    question: "What is the economic interpretation of binding constraints in social problems?",
    shortAnswer: "Total people and calorie requirements are the limiting factors.",
    explanation: "These constraints are satisfied exactly at the minimum cost.",
    hint: "Binding = exactly met.",
    level: "moderate"
  },
  {
    question: "If the total people requirement increases to 600, what happens?",
    shortAnswer: "The optimal solution changes, increasing cost.",
    explanation: "More people must be served, requiring more meals.",
    hint: "More people = higher cost.",
    level: "expert"
  },
  {
    question: "What is the difference between social minimization and commercial minimization?",
    shortAnswer: "Social minimization has minimum requirements; commercial minimization may only have resource limits.",
    explanation: "Social problems must meet service requirements; commercial problems often just minimize cost.",
    hint: "Requirements vs limits.",
    level: "moderate"
  }
];

export default questions;