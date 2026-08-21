// topic15_files/topic15_questions.js

const questions = [
  {
    question: "What is the goal of an advertising budget allocation problem?",
    shortAnswer: "To maximize audience reach or minimize cost given a fixed budget.",
    explanation: "Advertising budget allocation problems aim to distribute a limited budget across channels to maximize reach, impressions, or conversions.",
    hint: "Maximize reach with limited budget.",
    level: "basic"
  },
  {
    question: "In the advertising example, what are the decision variables?",
    shortAnswer: "x₁ = number of TV ads, x₂ = number of Radio ads, x₃ = number of Social Media ads.",
    explanation: "These represent the quantity of ads to purchase on each channel.",
    hint: "Three channels, three variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the advertising example?",
    shortAnswer: "Maximize Z = 80x₁ + 50x₂ + 40x₃ (reach in thousands).",
    explanation: "TV gives 80,000 reach per ad, Radio 50,000, Social 40,000.",
    hint: "Reach per channel.",
    level: "basic"
  },
  {
    question: "What does the budget constraint represent?",
    shortAnswer: "12,000x₁ + 8,000x₂ + 6,000x₃ ≤ 100,000.",
    explanation: "The total cost of all ads cannot exceed the ₹100,000 budget.",
    hint: "Total cost limit.",
    level: "basic"
  },
  {
    question: "What do the lower bound constraints represent?",
    shortAnswer: "Minimum number of ads required on each channel.",
    explanation: "x₁ ≥ 3, x₂ ≥ 2, x₃ ≥ 2 ensure all channels are used at least minimally.",
    hint: "Minimum ad requirements.",
    level: "basic"
  },
  {
    question: "What do the upper bound constraints represent?",
    shortAnswer: "Maximum number of ads on each channel.",
    explanation: "x₁ ≤ 8, x₂ ≤ 6, x₃ ≤ 10 prevent oversaturation on any channel.",
    hint: "Maximum ad limits.",
    level: "basic"
  },
  {
    question: "What is the reach per rupee for Television ads?",
    shortAnswer: "6.67 reach per rupee (80,000 ÷ 12,000).",
    explanation: "TV provides 80,000 reach for ₹12,000, so 6.67 per rupee.",
    hint: "Reach divided by cost.",
    level: "moderate"
  },
  {
    question: "What is the reach per rupee for Radio ads?",
    shortAnswer: "6.25 reach per rupee (50,000 ÷ 8,000).",
    explanation: "Radio provides 50,000 reach for ₹8,000, so 6.25 per rupee.",
    hint: "Reach divided by cost.",
    level: "moderate"
  },
  {
    question: "What is the reach per rupee for Social Media ads?",
    shortAnswer: "6.67 reach per rupee (40,000 ÷ 6,000).",
    explanation: "Social Media provides 40,000 reach for ₹6,000, so 6.67 per rupee.",
    hint: "Reach divided by cost.",
    level: "moderate"
  },
  {
    question: "Which channels have the same reach per rupee?",
    shortAnswer: "Television and Social Media (both 6.67).",
    explanation: "Both TV and Social Media give 6.67 reach per rupee, making them equally efficient.",
    hint: "Equal efficiency.",
    level: "moderate"
  },
  {
    question: "What is the optimal solution for the advertising example?",
    shortAnswer: "Multiple solutions: x₁ = 6, x₂ = 2, x₃ = 2 or x₁ = 3, x₂ = 2, x₃ = 8, etc.",
    explanation: "Any combination where TV and Social use the remaining budget gives the same reach of 660,000.",
    hint: "Multiple optimal solutions.",
    level: "moderate"
  },
  {
    question: "What is the total reach at the optimal solution?",
    shortAnswer: "660,000 (660 thousand).",
    explanation: "Reach = 80(6) + 50(2) + 40(2) = 480 + 100 + 80 = 660 thousand.",
    hint: "Maximum reach value.",
    level: "moderate"
  },
  {
    question: "What is the total cost at the optimal solution?",
    shortAnswer: "₹100,000 (full budget used).",
    explanation: "Cost = 12,000(6) + 8,000(2) + 6,000(2) = 72,000 + 16,000 + 12,000 = 100,000.",
    hint: "Full budget used.",
    level: "basic"
  },
  {
    question: "Why might Radio be used despite having lower reach per rupee?",
    shortAnswer: "Because of minimum ad requirements (x₂ ≥ 2).",
    explanation: "Radio is forced into the mix due to the minimum requirement, even though it's less efficient.",
    hint: "Minimum requirement forces Radio.",
    level: "moderate"
  },
  {
    question: "What is a common mistake in advertising budget allocation problems?",
    shortAnswer: "Forgetting the minimum and maximum ad limits.",
    explanation: "Upper and lower bounds are important constraints that affect the optimal solution.",
    hint: "Don't forget bounds.",
    level: "moderate"
  },
  {
    question: "If the budget increases to ₹120,000, what happens?",
    shortAnswer: "The optimal solution changes, and reach increases.",
    explanation: "More budget allows more ads and higher reach, subject to upper bounds.",
    hint: "More budget = more reach.",
    level: "expert"
  },
  {
    question: "If the TV reach decreases to 60,000 per ad, what happens?",
    shortAnswer: "The optimal solution shifts toward Social Media and Radio.",
    explanation: "TV becomes less attractive, so budget shifts to other channels.",
    hint: "Less efficient TV = less TV ads.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in advertising problems?",
    shortAnswer: "To ensure ad quantities are non-negative.",
    explanation: "You cannot buy negative ads.",
    hint: "No negative ads.",
    level: "basic"
  },
  {
    question: "How do you calculate reach per rupee?",
    shortAnswer: "Reach per ad ÷ Cost per ad.",
    explanation: "This metric helps identify the most efficient advertising channels.",
    hint: "Reach divided by cost.",
    level: "moderate"
  },
  {
    question: "Why might there be multiple optimal solutions?",
    shortAnswer: "When two or more channels have the same reach per rupee.",
    explanation: "TV and Social Media have equal efficiency, so any combination gives the same reach.",
    hint: "Equal efficiency = multiple optima.",
    level: "expert"
  },
  {
    question: "What is the minimum cost to meet all minimum requirements?",
    shortAnswer: "₹64,000 (3 TV + 2 Radio + 2 Social).",
    explanation: "Cost = 36,000 + 16,000 + 12,000 = 64,000.",
    hint: "Minimum required ads.",
    level: "moderate"
  },
  {
    question: "What is the reach from minimum required ads?",
    shortAnswer: "420,000 (3 TV + 2 Radio + 2 Social).",
    explanation: "Reach = 240,000 + 100,000 + 80,000 = 420,000.",
    hint: "Reach from minimum ads.",
    level: "moderate"
  },
  {
    question: "If the budget is ₹80,000, what is the optimal solution?",
    shortAnswer: "The solution changes, using less of the less efficient channels.",
    explanation: "With less budget, the manager prioritizes the most efficient channels.",
    hint: "Smaller budget = prioritize efficiency.",
    level: "expert"
  },
  {
    question: "What type of problem is advertising budget allocation?",
    shortAnswer: "A resource allocation and profit maximization problem.",
    explanation: "It involves allocating a limited budget across activities to maximize return (reach).",
    hint: "Resource allocation.",
    level: "basic"
  },
  {
    question: "What is the significance of upper bound constraints?",
    shortAnswer: "They prevent oversaturation and ensure channel diversity.",
    explanation: "Maximum limits ensure no single channel dominates the campaign.",
    hint: "Maximum limits for diversity.",
    level: "moderate"
  },
  {
    question: "If Social Media reach increases to 50,000 per ad, what happens?",
    shortAnswer: "Social Media becomes the most efficient channel and gets more budget.",
    explanation: "Higher reach makes Social Media more attractive.",
    hint: "Higher reach = more allocation.",
    level: "expert"
  },
  {
    question: "What is the reach per rupee for Radio if its cost drops to ₹5,000?",
    shortAnswer: "10 reach per rupee (50,000 ÷ 5,000).",
    explanation: "With lower cost, Radio becomes more attractive.",
    hint: "Lower cost = higher efficiency.",
    level: "moderate"
  },
  {
    question: "How do you know if a solution is optimal?",
    shortAnswer: "Check if all budget is used and reach is maximized.",
    explanation: "The optimal solution uses the full budget and reaches the highest possible audience.",
    hint: "Full budget + max reach.",
    level: "moderate"
  },
  {
    question: "What is a common real-world application of this problem?",
    shortAnswer: "Media planning for marketing campaigns.",
    explanation: "Marketing managers use LP to allocate budgets across TV, radio, digital, and social media.",
    hint: "Marketing campaign planning.",
    level: "moderate"
  },
  {
    question: "Why is Radio used despite being less efficient?",
    shortAnswer: "Minimum ad requirements force its use.",
    explanation: "The problem requires at least 2 radio ads, even though they're less efficient.",
    hint: "Minimum requirement forces Radio.",
    level: "moderate"
  }
];

export default questions;