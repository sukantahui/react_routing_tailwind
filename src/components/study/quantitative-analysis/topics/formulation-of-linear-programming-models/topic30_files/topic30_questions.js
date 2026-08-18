// topic30_files/topic30_questions.js

const questions = [
  {
    question: "What is the goal of a public resource allocation problem?",
    shortAnswer: "To maximize public impact while respecting budget and staff constraints.",
    explanation: "These problems apply LP to allocate government resources across public services to maximize social benefit.",
    hint: "Maximize impact with limited resources.",
    level: "basic"
  },
  {
    question: "In the public resource allocation example, what are the decision variables?",
    shortAnswer: "x₁ = public health programs, x₂ = public safety programs, x₃ = education programs.",
    explanation: "These represent the number of programs to implement in each service area.",
    hint: "Three services, three variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the public resource allocation example?",
    shortAnswer: "Maximize Z = 200x₁ + 300x₂ + 250x₃.",
    explanation: "Each health program gives 200 impact, safety gives 300, education gives 250.",
    hint: "Impact per program.",
    level: "basic"
  },
  {
    question: "What does the Budget constraint represent?",
    shortAnswer: "100,000x₁ + 150,000x₂ + 80,000x₃ ≤ 1,000,000.",
    explanation: "Total budget cannot exceed ₹10,00,000.",
    hint: "Budget limit.",
    level: "basic"
  },
  {
    question: "What does the Staff constraint represent?",
    shortAnswer: "2x₁ + 3x₂ + 2x₃ ≤ 20.",
    explanation: "Total staff required cannot exceed 20 people.",
    hint: "Staff availability limit.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≥ 2 represent?",
    shortAnswer: "At least 2 public health programs must be implemented.",
    explanation: "This is a minimum requirement for health services.",
    hint: "Minimum health programs.",
    level: "basic"
  },
  {
    question: "What does the constraint x₂ ≤ 4 represent?",
    shortAnswer: "No more than 4 public safety programs can be implemented.",
    explanation: "This is a maximum limit for safety services.",
    hint: "Maximum safety programs.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the public resource allocation example?",
    shortAnswer: "x₁ = 2, x₂ = 2, x₃ = 5 with impact = 2,250.",
    explanation: "Implement 2 health, 2 safety, and 5 education programs.",
    hint: "Optimal program allocation.",
    level: "moderate"
  },
  {
    question: "What is the total public impact at the optimal solution?",
    shortAnswer: "2,250.",
    explanation: "Impact = 200(2) + 300(2) + 250(5) = 400 + 600 + 1,250 = 2,250.",
    hint: "Maximum impact value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Staff is binding; Budget has slack.",
    explanation: "Staff: 20/20 used. Budget: 900,000/1,000,000 (slack: 100,000).",
    hint: "Check which resources are tight.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Budget constraint at the optimum?",
    shortAnswer: "₹1,00,000 (10,00,000 - 9,00,000 = 1,00,000).",
    explanation: "Budget used = 100,000(2)+150,000(2)+80,000(5) = 200,000+300,000+400,000 = 900,000.",
    hint: "Unused budget.",
    level: "moderate"
  },
  {
    question: "What is the impact per health program?",
    shortAnswer: "200 impact units.",
    explanation: "Each health program provides 200 impact units.",
    hint: "Health impact.",
    level: "basic"
  },
  {
    question: "What is the impact per safety program?",
    shortAnswer: "300 impact units.",
    explanation: "Each safety program provides 300 impact units.",
    hint: "Safety impact.",
    level: "basic"
  },
  {
    question: "What is the impact per education program?",
    shortAnswer: "250 impact units.",
    explanation: "Each education program provides 250 impact units.",
    hint: "Education impact.",
    level: "basic"
  },
  {
    question: "What is the cost of one health program?",
    shortAnswer: "₹1,00,000.",
    explanation: "Each health program costs ₹1,00,000.",
    hint: "Health cost.",
    level: "basic"
  },
  {
    question: "What is the staff requirement per safety program?",
    shortAnswer: "3 people.",
    explanation: "Each safety program requires 3 staff.",
    hint: "Safety staff requirement.",
    level: "basic"
  },
  {
    question: "What is a common mistake in public resource allocation problems?",
    shortAnswer: "Forgetting the minimum and maximum program requirements.",
    explanation: "These constraints reflect policy and capacity limits.",
    hint: "Don't forget policy constraints.",
    level: "moderate"
  },
  {
    question: "What is the impact per rupee for health programs (per ₹10,000)?",
    shortAnswer: "20 (200 ÷ 10).",
    explanation: "Health programs give 20 impact per ₹10,000 spent.",
    hint: "Impact divided by budget (in ₹10,000).",
    level: "moderate"
  },
  {
    question: "What is the impact per rupee for safety programs (per ₹10,000)?",
    shortAnswer: "20 (300 ÷ 15).",
    explanation: "Safety programs give 20 impact per ₹10,000 spent.",
    hint: "Impact divided by budget (in ₹10,000).",
    level: "moderate"
  },
  {
    question: "What is the impact per rupee for education programs (per ₹10,000)?",
    shortAnswer: "31.25 (250 ÷ 8).",
    explanation: "Education programs give 31.25 impact per ₹10,000 spent.",
    hint: "Impact divided by budget (in ₹10,000).",
    level: "moderate"
  },
  {
    question: "Which service is most budget-efficient?",
    shortAnswer: "Education (31.25 impact per ₹10,000).",
    explanation: "Education gives the highest impact per rupee spent.",
    hint: "Highest impact per rupee.",
    level: "moderate"
  },
  {
    question: "What is the impact per staff for health programs?",
    shortAnswer: "100 (200 ÷ 2).",
    explanation: "Health programs give 100 impact per staff.",
    hint: "Impact divided by staff.",
    level: "moderate"
  },
  {
    question: "What is the impact per staff for education programs?",
    shortAnswer: "125 (250 ÷ 2).",
    explanation: "Education programs give 125 impact per staff.",
    hint: "Impact divided by staff.",
    level: "moderate"
  },
  {
    question: "Which service is most staff-efficient?",
    shortAnswer: "Education (125 impact per staff).",
    explanation: "Education gives the highest impact per staff.",
    hint: "Highest impact per staff.",
    level: "moderate"
  },
  {
    question: "If the maximum education programs increases to 7, what happens?",
    shortAnswer: "The optimal solution may change, potentially increasing impact.",
    explanation: "More education programs (most efficient) could be implemented.",
    hint: "More education = more impact.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in public resource allocation?",
    shortAnswer: "To ensure program quantities are non-negative.",
    explanation: "You cannot have negative programs.",
    hint: "No negative programs.",
    level: "basic"
  },
  {
    question: "What is the total budget used at the optimal solution?",
    shortAnswer: "₹9,00,000.",
    explanation: "Budget used = 100,000(2)+150,000(2)+80,000(5) = 900,000.",
    hint: "Total budget usage.",
    level: "moderate"
  },
  {
    question: "What is the total staff used at the optimal solution?",
    shortAnswer: "20 people (fully used).",
    explanation: "Staff = 2(2)+3(2)+2(5) = 4+6+10 = 20.",
    hint: "Total staff usage.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of binding constraints in public allocation?",
    shortAnswer: "Staff is the limiting resource for providing public services.",
    explanation: "The government has exactly enough staff to implement the optimal program mix.",
    hint: "Staff is the bottleneck.",
    level: "moderate"
  },
  {
    question: "If the staff availability increases to 22, what happens?",
    shortAnswer: "The optimal solution may change, potentially increasing impact.",
    explanation: "More staff allows more programs to be implemented.",
    hint: "More staff = more programs.",
    level: "expert"
  },
  {
    question: "What is the difference between public and private resource allocation?",
    shortAnswer: "Public allocation maximizes social impact; private maximizes profit.",
    explanation: "Public sector objectives are non-monetary; private sector objectives are financial.",
    hint: "Impact vs profit.",
    level: "moderate"
  }
];

export default questions;