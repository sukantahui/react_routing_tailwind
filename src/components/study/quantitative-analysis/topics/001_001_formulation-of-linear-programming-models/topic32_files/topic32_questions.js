// topic32_files/topic32_questions.js

const questions = [
  {
    question: "What does 'at most' mean in mathematical inequalities?",
    shortAnswer: "'At most' means ≤ (less than or equal to).",
    explanation: "'At most' indicates an upper bound that cannot be exceeded.",
    hint: "Think of a maximum limit.",
    level: "basic"
  },
  {
    question: "What does 'at least' mean in mathematical inequalities?",
    shortAnswer: "'At least' means ≥ (greater than or equal to).",
    explanation: "'At least' indicates a lower bound that must be met.",
    hint: "Think of a minimum requirement.",
    level: "basic"
  },
  {
    question: "What does 'exactly' mean in mathematical inequalities?",
    shortAnswer: "'Exactly' means = (equality).",
    explanation: "'Exactly' indicates a precise value that must be achieved.",
    hint: "Think of a fixed requirement.",
    level: "basic"
  },
  {
    question: "Translate: 'x is no more than 10'",
    shortAnswer: "x ≤ 10.",
    explanation: "'No more than' means less than or equal to.",
    hint: "≤ for 'no more than'.",
    level: "basic"
  },
  {
    question: "Translate: 'x is at least 5'",
    shortAnswer: "x ≥ 5.",
    explanation: "'At least' means greater than or equal to.",
    hint: "≥ for 'at least'.",
    level: "basic"
  },
  {
    question: "Translate: 'x cannot exceed 100'",
    shortAnswer: "x ≤ 100.",
    explanation: "'Cannot exceed' means less than or equal to.",
    hint: "≤ for 'cannot exceed'.",
    level: "basic"
  },
  {
    question: "Translate: 'x must be at least 20'",
    shortAnswer: "x ≥ 20.",
    explanation: "'Must be at least' means greater than or equal to.",
    hint: "≥ for 'must be at least'.",
    level: "basic"
  },
  {
    question: "Translate: 'x is equal to 15'",
    shortAnswer: "x = 15.",
    explanation: "'Equal to' means equality.",
    hint: "= for 'equal to'.",
    level: "basic"
  },
  {
    question: "Translate: 'The sum of x and y is at most 100'",
    shortAnswer: "x + y ≤ 100.",
    explanation: "'At most' with a sum means ≤.",
    hint: "Sum ≤ limit.",
    level: "moderate"
  },
  {
    question: "Translate: 'The total of x and y is at least 50'",
    shortAnswer: "x + y ≥ 50.",
    explanation: "'At least' with a sum means ≥.",
    hint: "Sum ≥ limit.",
    level: "moderate"
  },
  {
    question: "Translate: 'The difference of x and y is exactly 10'",
    shortAnswer: "x - y = 10.",
    explanation: "'Exactly' indicates equality.",
    hint: "Difference = value.",
    level: "moderate"
  },
  {
    question: "Translate: 'x is twice y'",
    shortAnswer: "x = 2y.",
    explanation: "'Twice' means 2 times.",
    hint: "x = 2 × y.",
    level: "moderate"
  },
  {
    question: "Translate: 'x is 3 more than y'",
    shortAnswer: "x = y + 3.",
    explanation: "'More than' means addition.",
    hint: "x = y + 3.",
    level: "moderate"
  },
  {
    question: "Translate: 'x is at least twice y'",
    shortAnswer: "x ≥ 2y.",
    explanation: "'At least twice' means ≥ 2 times.",
    hint: "x ≥ 2 × y.",
    level: "moderate"
  },
  {
    question: "Translate: 'The ratio of x to y is 2'",
    shortAnswer: "x/y = 2 → x = 2y.",
    explanation: "Ratio x:y = 2 means x = 2y.",
    hint: "x = 2 × y.",
    level: "moderate"
  },
  {
    question: "Translate: 'x is no less than y plus 5'",
    shortAnswer: "x ≥ y + 5.",
    explanation: "'No less than' means ≥.",
    hint: "x ≥ y + 5.",
    level: "moderate"
  },
  {
    question: "Translate: 'The product of x and y is at most 30'",
    shortAnswer: "xy ≤ 30.",
    explanation: "'At most' with product means ≤.",
    hint: "Product ≤ limit.",
    level: "moderate"
  },
  {
    question: "What is a common mistake when translating 'at most'?",
    shortAnswer: "Using ≥ instead of ≤.",
    explanation: "'At most' means you cannot exceed the limit, so ≤.",
    hint: "Check the direction.",
    level: "basic"
  },
  {
    question: "What is a common mistake when translating 'at least'?",
    shortAnswer: "Using ≤ instead of ≥.",
    explanation: "'At least' means you must meet or exceed the requirement, so ≥.",
    hint: "Check the direction.",
    level: "basic"
  },
  {
    question: "Translate: 'The budget is limited to ₹10,000'",
    shortAnswer: "Cost ≤ 10,000.",
    explanation: "'Limited to' means you cannot exceed.",
    hint: "≤ for 'limited to'.",
    level: "moderate"
  },
  {
    question: "Translate: 'At least 50 units of Product A must be produced'",
    shortAnswer: "x_A ≥ 50.",
    explanation: "'At least' means ≥.",
    hint: "≥ for 'at least'.",
    level: "moderate"
  },
  {
    question: "Translate: 'No more than 30 workers can be assigned'",
    shortAnswer: "x ≤ 30.",
    explanation: "'No more than' means ≤.",
    hint: "≤ for 'no more than'.",
    level: "moderate"
  },
  {
    question: "Translate: 'The total cost must not exceed ₹5,00,000'",
    shortAnswer: "Cost ≤ 5,00,000.",
    explanation: "'Must not exceed' means ≤.",
    hint: "≤ for 'must not exceed'.",
    level: "moderate"
  },
  {
    question: "Translate: 'Production must be exactly 1,000 units'",
    shortAnswer: "x = 1,000.",
    explanation: "'Exactly' means equality.",
    hint: "= for 'exactly'.",
    level: "basic"
  },
  {
    question: "Translate: 'The number of units is at most twice the previous month'",
    shortAnswer: "x ≤ 2y.",
    explanation: "'At most twice' means ≤ 2 times.",
    hint: "x ≤ 2 × y.",
    level: "moderate"
  },
  {
    question: "Translate: 'The total of x and y is at least the total of a and b'",
    shortAnswer: "x + y ≥ a + b.",
    explanation: "'At least' means ≥.",
    hint: "Sum ≥ sum.",
    level: "moderate"
  },
  {
    question: "Translate: 'The sum of x and y is less than z'",
    shortAnswer: "x + y < z.",
    explanation: "'Less than' means <.",
    hint: "Sum < z.",
    level: "moderate"
  },
  {
    question: "Translate: 'x is greater than y'",
    shortAnswer: "x > y.",
    explanation: "'Greater than' means >.",
    hint: "x > y.",
    level: "basic"
  },
  {
    question: "What is the key difference between 'at most' and 'less than'?",
    shortAnswer: "'At most' includes the value (≤), 'less than' excludes it (<).",
    explanation: "'At most' allows the limit value; 'less than' does not.",
    hint: "≤ vs <.",
    level: "moderate"
  },
  {
    question: "What is the key difference between 'at least' and 'greater than'?",
    shortAnswer: "'At least' includes the value (≥), 'greater than' excludes it (>).",
    explanation: "'At least' allows the limit value; 'greater than' does not.",
    hint: "≥ vs >.",
    level: "moderate"
  },
  {
    question: "Translate: 'The quantity of x is between 5 and 10 inclusive'",
    shortAnswer: "5 ≤ x ≤ 10.",
    explanation: "'Between inclusive' means both bounds are allowed.",
    hint: "x between 5 and 10.",
    level: "moderate"
  }
];

export default questions;