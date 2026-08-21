// topic29_files/topic29_questions.js

const questions = [
  {
    question: "What is the goal of a legal-service resource allocation problem?",
    shortAnswer: "To maximize funding while meeting minimum case requirements with limited resources.",
    explanation: "These problems apply LP to legal aid organizations, optimizing case allocation to maximize funding while respecting lawyer and paralegal time constraints.",
    hint: "Maximize funding, meet minimum cases.",
    level: "basic"
  },
  {
    question: "In the legal-service example, what are the decision variables?",
    shortAnswer: "x₁ = number of civil cases, x₂ = number of criminal cases.",
    explanation: "These represent the quantity of each case type to handle.",
    hint: "Two case types, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the legal-service example?",
    shortAnswer: "Maximize Z = 15,000x₁ + 18,000x₂.",
    explanation: "Civil cases give ₹15,000 funding each, criminal cases give ₹18,000 funding each.",
    hint: "Funding per case.",
    level: "basic"
  },
  {
    question: "What does the Lawyers constraint represent?",
    shortAnswer: "5x₁ + 3x₂ ≤ 120.",
    explanation: "Total lawyer hours cannot exceed 120 hours per week.",
    hint: "Lawyer availability limit.",
    level: "basic"
  },
  {
    question: "What does the Paralegals constraint represent?",
    shortAnswer: "2x₁ + 4x₂ ≤ 80.",
    explanation: "Total paralegal hours cannot exceed 80 hours per week.",
    hint: "Paralegal availability limit.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≥ 10 represent?",
    shortAnswer: "At least 10 civil cases must be handled.",
    explanation: "This is a minimum requirement for civil legal services.",
    hint: "Minimum civil cases.",
    level: "basic"
  },
  {
    question: "What does the constraint x₂ ≥ 8 represent?",
    shortAnswer: "At least 8 criminal cases must be handled.",
    explanation: "This is a minimum requirement for criminal legal services.",
    hint: "Minimum criminal cases.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the legal-service example?",
    shortAnswer: "x₁ = 17.14, x₂ = 11.43 with funding = ₹462,857.",
    explanation: "Handle approximately 17 civil cases and 11 criminal cases.",
    hint: "Optimal case allocation.",
    level: "moderate"
  },
  {
    question: "What is the total funding at the optimal solution?",
    shortAnswer: "₹462,857.",
    explanation: "Funding = 15,000(17.14) + 18,000(11.43) = 257,142 + 205,714 = 462,857.",
    hint: "Maximum funding value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Lawyers and Paralegals are binding; Min Civil and Min Criminal are not binding.",
    explanation: "Lawyers: 120/120 used. Paralegals: 80/80 used. Civil: 17.14 ≥ 10. Criminal: 11.43 ≥ 8.",
    hint: "Check which constraints are tight.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Min Civil constraint at the optimum?",
    shortAnswer: "7.14 cases (17.14 - 10 = 7.14).",
    explanation: "More civil cases are handled than the minimum required.",
    hint: "Excess civil cases.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Min Criminal constraint at the optimum?",
    shortAnswer: "3.43 cases (11.43 - 8 = 3.43).",
    explanation: "More criminal cases are handled than the minimum required.",
    hint: "Excess criminal cases.",
    level: "moderate"
  },
  {
    question: "What is the funding per civil case?",
    shortAnswer: "₹15,000.",
    explanation: "Each civil case provides ₹15,000 in funding.",
    hint: "Civil case funding.",
    level: "basic"
  },
  {
    question: "What is the funding per criminal case?",
    shortAnswer: "₹18,000.",
    explanation: "Each criminal case provides ₹18,000 in funding.",
    hint: "Criminal case funding.",
    level: "basic"
  },
  {
    question: "What is the lawyer time per civil case?",
    shortAnswer: "5 hours.",
    explanation: "Each civil case requires 5 hours of lawyer time.",
    hint: "Civil case lawyer time.",
    level: "basic"
  },
  {
    question: "What is the paralegal time per criminal case?",
    shortAnswer: "4 hours.",
    explanation: "Each criminal case requires 4 hours of paralegal time.",
    hint: "Criminal case paralegal time.",
    level: "basic"
  },
  {
    question: "What is a common mistake in legal-service problems?",
    shortAnswer: "Forgetting the minimum case requirements.",
    explanation: "Minimum requirements ensure public access to legal services.",
    hint: "Don't forget minimums.",
    level: "moderate"
  },
  {
    question: "What is the lawyer efficiency of civil cases (funding per lawyer hour)?",
    shortAnswer: "₹3,000 per hour (15,000 ÷ 5).",
    explanation: "Civil cases give ₹3,000 funding per lawyer hour.",
    hint: "Funding divided by lawyer time.",
    level: "moderate"
  },
  {
    question: "What is the lawyer efficiency of criminal cases (funding per lawyer hour)?",
    shortAnswer: "₹6,000 per hour (18,000 ÷ 3).",
    explanation: "Criminal cases give ₹6,000 funding per lawyer hour.",
    hint: "Funding divided by lawyer time.",
    level: "moderate"
  },
  {
    question: "Which case type is more lawyer-efficient?",
    shortAnswer: "Criminal cases (₹6,000 per lawyer hour).",
    explanation: "Criminal cases give higher funding per lawyer hour than civil cases.",
    hint: "Higher funding per lawyer hour.",
    level: "moderate"
  },
  {
    question: "What is the paralegal efficiency of civil cases (funding per paralegal hour)?",
    shortAnswer: "₹7,500 per hour (15,000 ÷ 2).",
    explanation: "Civil cases give ₹7,500 funding per paralegal hour.",
    hint: "Funding divided by paralegal time.",
    level: "moderate"
  },
  {
    question: "What is the paralegal efficiency of criminal cases (funding per paralegal hour)?",
    shortAnswer: "₹4,500 per hour (18,000 ÷ 4).",
    explanation: "Criminal cases give ₹4,500 funding per paralegal hour.",
    hint: "Funding divided by paralegal time.",
    level: "moderate"
  },
  {
    question: "Which case type is more paralegal-efficient?",
    shortAnswer: "Civil cases (₹7,500 per paralegal hour).",
    explanation: "Civil cases give higher funding per paralegal hour than criminal cases.",
    hint: "Higher funding per paralegal hour.",
    level: "moderate"
  },
  {
    question: "If the minimum criminal cases requirement increases to 10, what happens?",
    shortAnswer: "The optimal solution changes, potentially reducing funding.",
    explanation: "More criminal cases (less efficient per paralegal hour) may be required.",
    hint: "Higher minimum = possible lower funding.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in legal-service problems?",
    shortAnswer: "To ensure case quantities are non-negative.",
    explanation: "You cannot handle negative cases.",
    hint: "No negative cases.",
    level: "basic"
  },
  {
    question: "What is the total number of cases at the optimal solution?",
    shortAnswer: "28.57 cases (17.14 + 11.43).",
    explanation: "Total cases = 17.14 + 11.43 = 28.57.",
    hint: "Sum of all cases.",
    level: "basic"
  },
  {
    question: "What is the total lawyer hours used at the optimal solution?",
    shortAnswer: "120 hours (fully used).",
    explanation: "Lawyer hours = 5(17.14)+3(11.43) = 85.71+34.29 = 120.",
    hint: "Total lawyer time usage.",
    level: "moderate"
  },
  {
    question: "What is the total paralegal hours used at the optimal solution?",
    shortAnswer: "80 hours (fully used).",
    explanation: "Paralegal hours = 2(17.14)+4(11.43) = 34.29+45.71 = 80.",
    hint: "Total paralegal time usage.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of binding constraints in legal services?",
    shortAnswer: "Lawyers and paralegals are fully utilized, limiting case volume.",
    explanation: "These resources are the bottleneck for providing legal services.",
    hint: "Scarce resources.",
    level: "moderate"
  },
  {
    question: "If the lawyer hours increase to 130, what happens?",
    shortAnswer: "The optimal solution changes, potentially increasing funding.",
    explanation: "More lawyer time allows more cases to be handled.",
    hint: "More lawyers = more cases.",
    level: "expert"
  },
  {
    question: "What is the difference between legal-service allocation and commercial resource allocation?",
    shortAnswer: "Legal-service allocation has minimum case requirements; commercial problems may only have resource limits.",
    explanation: "Legal services must meet minimum service levels, unlike commercial profit maximization.",
    hint: "Requirements vs limits.",
    level: "moderate"
  }
];

export default questions;