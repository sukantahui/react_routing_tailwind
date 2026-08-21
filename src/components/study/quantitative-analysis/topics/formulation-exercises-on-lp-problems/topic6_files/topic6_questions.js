const questions = [
  {
    question: "What types of LP formulation problems are covered in this topic?",
    shortAnswer: "Product Mix, Resource Allocation, Profit Maximization, Cost Minimization, and Mixed Constraints.",
    explanation: "The practice problems cover all major types of LP formulation problems with varying complexity.",
    hint: "Check the categories.",
    level: "basic",
    codeExample: "Product Mix, Resource Allocation, Profit Maximization, Cost Minimization"
  },
  {
    question: "How many practice problems are included?",
    shortAnswer: "10 practice problems covering different scenarios.",
    explanation: "The problems range from simple product mix to complex mixed constraints with percentages and ratios.",
    hint: "Count the problems.",
    level: "basic",
    codeExample: "10 problems across 5 categories"
  },
  {
    question: "What is the first step in formulating an LP problem?",
    shortAnswer: "Read the problem carefully and identify the decision variables.",
    explanation: "Before writing any equations, you need to understand what you're trying to decide.",
    hint: "What are you trying to decide?",
    level: "basic",
    codeExample: "Let x = number of chairs, y = number of tables"
  },
  {
    question: "How do you identify the objective function?",
    shortAnswer: "Look for words like maximize, minimize, profit, cost, revenue.",
    explanation: "The objective is what you're trying to optimize. Clue words help identify it.",
    hint: "Look for optimization words.",
    level: "basic",
    codeExample: "Maximize Z = 500x + 700y (Profit)"
  },
  {
    question: "What does 'at least' mean in LP constraints?",
    shortAnswer: "It means ≥ (greater than or equal to).",
    explanation: "'At least' indicates a minimum requirement.",
    hint: "At least = ≥",
    level: "basic",
    codeExample: "x + y ≥ 80 (Total production at least 80)"
  },
  {
    question: "What does 'at most' mean in LP constraints?",
    shortAnswer: "It means ≤ (less than or equal to).",
    explanation: "'At most' indicates an upper limit or maximum.",
    hint: "At most = ≤",
    level: "basic",
    codeExample: "2x + 3y ≤ 150 (Labor at most 150 hours)"
  },
  {
    question: "How do you handle percentage constraints?",
    shortAnswer: "Convert the percentage to a linear inequality and simplify.",
    explanation: "If A must be at least 40% of total, write x ≥ 0.4(x + y) then simplify.",
    hint: "Convert to linear form.",
    level: "advanced",
    codeExample: "x ≥ 0.4(x + y) → 3x ≥ 2y"
  },
  {
    question: "What is the importance of non-negativity constraints?",
    shortAnswer: "They ensure variables cannot be negative, reflecting real-world constraints.",
    explanation: "Quantities like production, servings, or allocation cannot be negative.",
    hint: "Can't be negative.",
    level: "basic",
    codeExample: "x ≥ 0, y ≥ 0"
  },
  {
    question: "How do you handle time conversion in LP formulation?",
    shortAnswer: "Convert all time units to the same unit (e.g., minutes to hours).",
    explanation: "If constraints are in different time units, convert them to a common unit.",
    hint: "Use consistent time units.",
    level: "intermediate",
    codeExample: "2 minutes = 2/60 hours = 1/30 hours"
  },
  {
    question: "What is the difference between profit maximization and cost minimization?",
    shortAnswer: "Profit maximization uses ≤ resource constraints; cost minimization uses ≥ requirement constraints.",
    explanation: "Profit maximization is about making the most profit with limited resources. Cost minimization is about meeting requirements at the lowest cost.",
    hint: "Max profit vs. min cost.",
    level: "intermediate",
    codeExample: "Max Z = 40x + 50y vs. Min Z = 25x + 35y"
  },
  {
    question: "How do you formulate a blending problem?",
    shortAnswer: "Minimize cost while meeting quality and quantity requirements.",
    explanation: "Blending problems involve mixing materials to meet specifications at minimum cost.",
    hint: "Mix to meet specs at min cost.",
    level: "intermediate",
    codeExample: "Min Z = 60x + 50y, subject to ingredient constraints"
  },
  {
    question: "What are mixed constraints?",
    shortAnswer: "Problems with both ≤ and ≥ constraints, plus possibly equality constraints.",
    explanation: "Mixed constraints combine resource limits (≤), requirements (≥), and exact conditions (=).",
    hint: "Combination of different constraint types.",
    level: "intermediate",
    codeExample: "≤, ≥, and = in the same problem"
  },
  {
    question: "How do you identify if a problem is maximization or minimization?",
    shortAnswer: "Look for clue words: maximize (profit, revenue) or minimize (cost, expenses).",
    explanation: "The objective type is usually stated in the problem using clear clue words.",
    hint: "Look for profit vs. cost.",
    level: "basic",
    codeExample: "Maximize profit vs. Minimize cost"
  },
  {
    question: "What is the role of availability constraints?",
    shortAnswer: "They limit how much of a resource can be used (≤ constraints).",
    explanation: "Availability constraints represent limited resources like labor, materials, or budget.",
    hint: "Limited resources = ≤",
    level: "basic",
    codeExample: "3x + 2y ≤ 120 (Labor available)"
  },
  {
    question: "How do you formulate a transportation problem?",
    shortAnswer: "Minimize shipping cost while meeting supply and demand constraints.",
    explanation: "Transportation problems involve shipping goods from sources to destinations at minimum cost.",
    hint: "Minimize shipping cost.",
    level: "intermediate",
    codeExample: "Min Z = 6x + 8y, subject to supply and demand"
  },
  {
    question: "Why is it important to check units in LP formulation?",
    shortAnswer: "Inconsistent units lead to incorrect constraints and solutions.",
    explanation: "All quantities in a constraint must be in the same units. Convert if necessary.",
    hint: "Units must match.",
    level: "intermediate",
    codeExample: "Convert minutes to hours, kg to g, etc."
  },
  {
    question: "What is the difference between 'less than' and 'at most'?",
    shortAnswer: "Less than (<) excludes equality; at most (≤) includes equality.",
    explanation: "In LP, we typically use ≤ for both unless equality is explicitly excluded.",
    hint: "≤ vs. <",
    level: "intermediate",
    codeExample: "At most 10: x ≤ 10, Less than 10: x < 10"
  },
  {
    question: "How do you formulate a production planning problem?",
    shortAnswer: "Maximize profit (or minimize cost) subject to resource constraints.",
    explanation: "Production planning problems determine how much of each product to produce.",
    hint: "Max profit with resources.",
    level: "basic",
    codeExample: "Max Z = 40x + 50y, subject to labor and material constraints"
  }
];

export default questions;