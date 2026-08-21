const questions = [
  {
    question: "What is the first step in translating a verbal problem to LP?",
    shortAnswer: "Read the problem carefully and identify the decision variables.",
    explanation: "Before you can formulate anything, you need to understand what you're deciding. Variables represent the quantities you want to determine.",
    hint: "What are you trying to decide?",
    level: "basic",
    codeExample: "Let x = number of chairs, y = number of tables"
  },
  {
    question: "What does 'at most' mean in LP constraints?",
    shortAnswer: "It means ≤ (less than or equal to).",
    explanation: "'At most' indicates an upper limit. For example, 'at most 10 hours' means ≤ 10 hours.",
    hint: "At most = ≤",
    level: "basic",
    codeExample: "x + y ≤ 10"
  },
  {
    question: "What does 'at least' mean in LP constraints?",
    shortAnswer: "It means ≥ (greater than or equal to).",
    explanation: "'At least' indicates a minimum requirement. For example, 'at least 8 units' means ≥ 8 units.",
    hint: "At least = ≥",
    level: "basic",
    codeExample: "x + y ≥ 8"
  },
  {
    question: "How do you identify the objective function in a word problem?",
    shortAnswer: "Look for words like 'maximize', 'minimize', 'profit', 'cost', 'revenue', etc.",
    explanation: "The objective is what you're trying to optimize. Clue words include: maximize, minimize, profit, cost, revenue, benefit, etc.",
    hint: "Look for optimization words.",
    level: "basic",
    codeExample: "Maximize Z = 40x + 50y (Profit)"
  },
  {
    question: "What does 'available' mean in LP constraints?",
    shortAnswer: "It means you have a limited amount of a resource, so you use ≤.",
    explanation: "'Available' indicates resource constraints. The total usage cannot exceed the available amount.",
    hint: "Available = limited resource = ≤",
    level: "intermediate",
    codeExample: "3x + 2y ≤ 120 (Labor available)"
  },
  {
    question: "How do you translate percentage constraints?",
    shortAnswer: "Convert the percentage to a linear inequality: x ≥ p(x + y) then simplify.",
    explanation: "If Product A must be at least 40% of total, write x ≥ 0.4(x + y), then simplify to 0.6x ≥ 0.4y.",
    hint: "Convert % to decimal and simplify.",
    level: "advanced",
    codeExample: "x ≥ 0.4(x + y) → 3x ≥ 2y"
  },
  {
    question: "What is the role of non-negativity constraints?",
    shortAnswer: "They ensure variables cannot be negative, reflecting real-world constraints.",
    explanation: "Quantities like production, servings, or allocation cannot be negative. Always include x ≥ 0 and y ≥ 0.",
    hint: "Can't be negative.",
    level: "basic",
    codeExample: "x ≥ 0, y ≥ 0"
  },
  {
    question: "How do you identify constraints from verbal descriptions?",
    shortAnswer: "Look for limitations, requirements, availability, or conditions that restrict the variables.",
    explanation: "Constraints limit what values the variables can take. Look for words like 'limited to', 'available', 'must be', 'at most', 'at least'.",
    hint: "Anything that limits the variables.",
    level: "intermediate",
    codeExample: "Labor hours available: 2x + 3y ≤ 120"
  },
  {
    question: "What does 'exactly' mean in LP constraints?",
    shortAnswer: "It means equality (=).",
    explanation: "Sometimes a condition must be met exactly. For example, 'exactly 100 units' means = 100.",
    hint: "Exactly = =",
    level: "intermediate",
    codeExample: "x + y = 100"
  },
  {
    question: "How do you translate 'more than' in LP constraints?",
    shortAnswer: "It means > or ≥ (greater than).",
    explanation: "If you need 'more than 10 units', the constraint is x > 10 or x ≥ 11 (for integers). In LP, we typically use ≥.",
    hint: "More than = > or ≥",
    level: "intermediate",
    codeExample: "x ≥ 11"
  },
  {
    question: "How do you translate 'less than' in LP constraints?",
    shortAnswer: "It means < or ≤ (less than).",
    explanation: "If you need 'less than 10 hours', the constraint is x < 10 or x ≤ 9. In LP, we typically use ≤.",
    hint: "Less than = < or ≤",
    level: "intermediate",
    codeExample: "x ≤ 9"
  },
  {
    question: "What is the difference between 'at most' and 'less than'?",
    shortAnswer: "'At most' includes equality (≤); 'less than' excludes equality (<).",
    explanation: "'At most 10' means ≤ 10. 'Less than 10' means < 10. In LP, we use ≤ for both unless equality is explicitly excluded.",
    hint: "≤ vs. <",
    level: "intermediate",
    codeExample: "At most 10: x ≤ 10, Less than 10: x < 10"
  },
  {
    question: "How do you translate 'maximum' in LP constraints?",
    shortAnswer: "It indicates an upper bound, so use ≤.",
    explanation: "If there's a maximum limit, the constraint is 'variable ≤ maximum'.",
    hint: "Maximum = ≤",
    level: "basic",
    codeExample: "x ≤ 100 (Maximum production)"
  },
  {
    question: "How do you translate 'minimum' in LP constraints?",
    shortAnswer: "It indicates a lower bound, so use ≥.",
    explanation: "If there's a minimum requirement, the constraint is 'variable ≥ minimum'.",
    hint: "Minimum = ≥",
    level: "basic",
    codeExample: "x ≥ 20 (Minimum production)"
  },
  {
    question: "What does 'profit per unit' become in LP formulation?",
    shortAnswer: "It becomes the coefficient in the objective function.",
    explanation: "The profit per unit multiplies the variable in the objective function.",
    hint: "Coefficient in objective.",
    level: "basic",
    codeExample: "Profit ₹40 per unit → 40x in objective"
  },
  {
    question: "What does 'cost per unit' become in LP formulation?",
    shortAnswer: "It becomes the coefficient in the objective function for minimization.",
    explanation: "The cost per unit multiplies the variable in the objective function for cost minimization.",
    hint: "Coefficient in objective for min.",
    level: "basic",
    codeExample: "Cost ₹20 per unit → 20x in objective"
  },
  {
    question: "How do you translate 'total production' constraints?",
    shortAnswer: "Sum the variables representing production quantities.",
    explanation: "If total production must meet a target, add all product variables and set the constraint.",
    hint: "Sum of all product variables.",
    level: "intermediate",
    codeExample: "x + y ≥ 100 (Total production)"
  },
  {
    question: "How do you translate ratio constraints?",
    shortAnswer: "Write as a proportion and simplify to linear form.",
    explanation: "If the ratio of x to y must be at least 2:1, write x/y ≥ 2 → x ≥ 2y.",
    hint: "Convert ratio to linear inequality.",
    level: "advanced",
    codeExample: "x/y ≥ 2 → x ≥ 2y"
  },
  {
    question: "What is a common mistake when translating percentage constraints?",
    shortAnswer: "Forgetting that the percentage is of total, not just one variable.",
    explanation: "If A is at least 40% of total, write x ≥ 0.4(x + y), not just x ≥ 0.4x.",
    hint: "Percentage of total.",
    level: "advanced",
    codeExample: "Correct: x ≥ 0.4(x + y), Incorrect: x ≥ 0.4x"
  },
  {
    question: "How do you translate 'at least 50% of total' constraints?",
    shortAnswer: "x ≥ 0.5(x + y), then simplify to x ≥ y.",
    explanation: "If x must be at least 50% of total, x ≥ 0.5(x + y) → x ≥ 0.5x + 0.5y → 0.5x ≥ 0.5y → x ≥ y.",
    hint: "50% of total → x ≥ y.",
    level: "advanced",
    codeExample: "x ≥ 0.5(x + y) → x ≥ y"
  },
  {
    question: "What is the key to successful LP translation?",
    shortAnswer: "Practice identifying variables, objectives, and constraints systematically.",
    explanation: "Success comes from reading carefully, identifying clue words, and practicing regularly. The more problems you translate, the better you become.",
    hint: "Practice and systematic approach.",
    level: "basic",
    codeExample: "Read → Identify → Formulate → Verify"
  }
];

export default questions;