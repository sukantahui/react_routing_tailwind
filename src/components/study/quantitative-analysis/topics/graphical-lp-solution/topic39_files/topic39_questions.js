const questions = [
  {
    question: "What is the objective function in the cost minimization example?",
    shortAnswer: "Minimize C = 5x + 4y.",
    explanation: "Component X costs ₹5 per unit, Component Y costs ₹4 per unit.",
    hint: "C = 5x + 4y.",
    level: "basic",
    codeExample: "C = 5x + 4y"
  },
  {
    question: "What are the constraints in the cost minimization example?",
    shortAnswer: "x≥100, y≥80, 2x+3y≤600, 3x+2y≤600.",
    explanation: "Minimum X, minimum Y, machining, assembly.",
    hint: "Minimums and resource constraints.",
    level: "basic",
    codeExample: "x≥100, y≥80, 2x+3y≤600, 3x+2y≤600."
  },
  {
    question: "What is the optimal solution?",
    shortAnswer: "x = 100, y = 80, C = 820.",
    explanation: "Produce exactly the minimum required quantities.",
    hint: "Optimal at (100,80).",
    level: "intermediate",
    codeExample: "(100,80) with C=820."
  },
  {
    question: "What is the machining used at the optimal solution?",
    shortAnswer: "440 hours, not fully used.",
    explanation: "2(100) + 3(80) = 200 + 240 = 440 hours.",
    hint: "440 hours used.",
    level: "intermediate",
    codeExample: "2(100)+3(80)=440."
  },
  {
    question: "What is the machining slack at the optimal solution?",
    shortAnswer: "160 hours (600 - 440).",
    explanation: "Machining is not fully used.",
    hint: "160 hours slack.",
    level: "intermediate",
    codeExample: "600 - 440 = 160."
  },
  {
    question: "What is the assembly used at the optimal solution?",
    shortAnswer: "460 hours, not fully used.",
    explanation: "3(100) + 2(80) = 300 + 160 = 460 hours.",
    hint: "460 hours used.",
    level: "intermediate",
    codeExample: "3(100)+2(80)=460."
  },
  {
    question: "What is the assembly slack at the optimal solution?",
    shortAnswer: "140 hours (600 - 460).",
    explanation: "Assembly is not fully used.",
    hint: "140 hours slack.",
    level: "intermediate",
    codeExample: "600 - 460 = 140."
  },
  {
    question: "What is the cost at (100,80)?",
    shortAnswer: "820.",
    explanation: "5(100) + 4(80) = 500 + 320 = 820.",
    hint: "C = 820.",
    level: "basic",
    codeExample: "(100,80) gives C=820."
  },
  {
    question: "What is the cost at (100,133.33)?",
    shortAnswer: "1033.33.",
    explanation: "5(100) + 4(133.33) = 500 + 533.33 = 1033.33.",
    hint: "C = 1033.33.",
    level: "basic",
    codeExample: "(100,133.33) gives C=1033.33."
  },
  {
    question: "What is the cost at (120,120)?",
    shortAnswer: "1080.",
    explanation: "5(120) + 4(120) = 600 + 480 = 1080.",
    hint: "C = 1080.",
    level: "basic",
    codeExample: "(120,120) gives C=1080."
  },
  {
    question: "What is the cost at (146.67,100)?",
    shortAnswer: "1133.33.",
    explanation: "5(146.67) + 4(100) = 733.33 + 400 = 1133.33.",
    hint: "C = 1133.33.",
    level: "basic",
    codeExample: "(146.67,100) gives C=1133.33."
  },
  {
    question: "What is the cost at (200,0)?",
    shortAnswer: "1000.",
    explanation: "5(200) + 4(0) = 1000.",
    hint: "C = 1000.",
    level: "basic",
    codeExample: "(200,0) gives C=1000."
  },
  {
    question: "What is the machining per unit of Component X?",
    shortAnswer: "2 hours.",
    explanation: "Component X requires 2 machining hours per unit.",
    hint: "2 hours.",
    level: "basic",
    codeExample: "X: 2 machining."
  },
  {
    question: "What is the machining per unit of Component Y?",
    shortAnswer: "3 hours.",
    explanation: "Component Y requires 3 machining hours per unit.",
    hint: "3 hours.",
    level: "basic",
    codeExample: "Y: 3 machining."
  },
  {
    question: "What is the assembly per unit of Component X?",
    shortAnswer: "3 hours.",
    explanation: "Component X requires 3 assembly hours per unit.",
    hint: "3 hours.",
    level: "basic",
    codeExample: "X: 3 assembly."
  },
  {
    question: "What is the assembly per unit of Component Y?",
    shortAnswer: "2 hours.",
    explanation: "Component Y requires 2 assembly hours per unit.",
    hint: "2 hours.",
    level: "basic",
    codeExample: "Y: 2 assembly."
  },
  {
    question: "What is the minimum Component X requirement?",
    shortAnswer: "100 units.",
    explanation: "The company must produce at least 100 units of Component X.",
    hint: "x ≥ 100.",
    level: "basic",
    codeExample: "x ≥ 100."
  },
  {
    question: "What is the minimum Component Y requirement?",
    shortAnswer: "80 units.",
    explanation: "The company must produce at least 80 units of Component Y.",
    hint: "y ≥ 80.",
    level: "basic",
    codeExample: "y ≥ 80."
  },
  {
    question: "What is the total machining available?",
    shortAnswer: "600 hours.",
    explanation: "The company has 600 machining hours available.",
    hint: "600 hours.",
    level: "basic",
    codeExample: "Machining = 600."
  },
  {
    question: "What is the total assembly available?",
    shortAnswer: "600 hours.",
    explanation: "The company has 600 assembly hours available.",
    hint: "600 hours.",
    level: "basic",
    codeExample: "Assembly = 600."
  },
  {
    question: "What is the cost per unit of Component X?",
    shortAnswer: "₹5.",
    explanation: "Component X costs ₹5 per unit.",
    hint: "₹5.",
    level: "basic",
    codeExample: "Cost of X = ₹5."
  },
  {
    question: "What is the cost per unit of Component Y?",
    shortAnswer: "₹4.",
    explanation: "Component Y costs ₹4 per unit.",
    hint: "₹4.",
    level: "basic",
    codeExample: "Cost of Y = ₹4."
  },
  {
    question: "Which component is cheaper?",
    shortAnswer: "Component Y (₹4 vs ₹5 for X).",
    explanation: "Component Y is cheaper per unit.",
    hint: "Y is cheaper.",
    level: "basic",
    codeExample: "Y: ₹4, X: ₹5."
  },
  {
    question: "Which component uses more machining?",
    shortAnswer: "Component Y (3 vs 2 for X).",
    explanation: "Component Y uses more machining hours.",
    hint: "Y uses more machining.",
    level: "basic",
    codeExample: "Y: 3, X: 2."
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "x ≥ 100 and y ≥ 80 are binding.",
    explanation: "Both minimum requirements are exactly met.",
    hint: "Minimums are binding.",
    level: "intermediate",
    codeExample: "x=100, y=80."
  },
  {
    question: "Which constraints are NOT binding at the optimal solution?",
    shortAnswer: "Machining and assembly constraints are not binding.",
    explanation: "Both have slack (160 and 140 hours respectively).",
    hint: "Resources have slack.",
    level: "intermediate",
    codeExample: "Machining: 440<600, Assembly: 460<600."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "Resources don't always bind in minimization problems.",
    explanation: "Minimum requirements can be the driving constraints.",
    hint: "Resources may have slack.",
    level: "basic",
    codeExample: "Minimum requirements drive the solution."
  },
  {
    question: "What is the machining slack at the optimal solution?",
    shortAnswer: "160 hours.",
    explanation: "600 - 440 = 160 hours of slack.",
    hint: "160 hours.",
    level: "intermediate",
    codeExample: "600 - 2(100) - 3(80) = 160."
  },
  {
    question: "What is the assembly slack at the optimal solution?",
    shortAnswer: "140 hours.",
    explanation: "600 - 460 = 140 hours of slack.",
    hint: "140 hours.",
    level: "intermediate",
    codeExample: "600 - 3(100) - 2(80) = 140."
  },
  {
    question: "What happens if the minimum X requirement increases to 120?",
    shortAnswer: "The optimal solution would change, producing more X.",
    explanation: "Higher X minimum requires more production of X.",
    hint: "More X required.",
    level: "intermediate",
    codeExample: "If x ≥ 120, new optimum may be different."
  },
  {
    question: "What is the minimum cost?",
    shortAnswer: "820.",
    explanation: "The minimum cost is 820 at (100,80).",
    hint: "C = 820.",
    level: "basic",
    codeExample: "Min Cost = 820."
  }
];

export default questions;