const questions = [
  {
    question: "What is the objective function in the investment example?",
    shortAnswer: "Minimize R = 8x + 4y (risk).",
    explanation: "Risk rating is 8 for stocks and 4 for bonds.",
    hint: "Minimize R = 8x + 4y.",
    level: "basic",
    codeExample: "R = 8x + 4y"
  },
  {
    question: "What are the constraints in the investment example?",
    shortAnswer: "x+y≤100000, 0.12x+0.08y≥10000, y≥20000.",
    explanation: "Total investment, return requirement, diversification requirement.",
    hint: "Budget, return, diversification.",
    level: "basic",
    codeExample: "x+y≤100000, 0.12x+0.08y≥10000, y≥20000."
  },
  {
    question: "What is the optimal solution?",
    shortAnswer: "x = 50,000, y = 50,000, R = 600,000.",
    explanation: "Invest ₹50,000 in stocks and ₹50,000 in bonds.",
    hint: "Optimal at (50,000, 50,000).",
    level: "intermediate",
    codeExample: "(50000,50000) with R=600000."
  },
  {
    question: "What is the return at the optimal solution?",
    shortAnswer: "₹10,000 exactly.",
    explanation: "0.12(50,000) + 0.08(50,000) = 6,000 + 4,000 = 10,000.",
    hint: "Return = ₹10,000.",
    level: "intermediate",
    codeExample: "0.12(50000)+0.08(50000)=10000."
  },
  {
    question: "What is the risk rating at the optimal solution?",
    shortAnswer: "600,000.",
    explanation: "8(50,000) + 4(50,000) = 400,000 + 200,000 = 600,000.",
    hint: "Risk = 600,000.",
    level: "intermediate",
    codeExample: "8(50000)+4(50000)=600000."
  },
  {
    question: "What is the return from stocks at the optimal solution?",
    shortAnswer: "₹6,000.",
    explanation: "0.12 × 50,000 = 6,000.",
    hint: "₹6,000.",
    level: "basic",
    codeExample: "0.12(50000)=6000."
  },
  {
    question: "What is the return from bonds at the optimal solution?",
    shortAnswer: "₹4,000.",
    explanation: "0.08 × 50,000 = 4,000.",
    hint: "₹4,000.",
    level: "basic",
    codeExample: "0.08(50000)=4000."
  },
  {
    question: "What is the total investment at the optimal solution?",
    shortAnswer: "₹1,00,000.",
    explanation: "50,000 + 50,000 = 100,000.",
    hint: "₹1,00,000.",
    level: "basic",
    codeExample: "50000+50000=100000."
  },
  {
    question: "What is the return from stocks per rupee?",
    shortAnswer: "12% or 0.12 per rupee.",
    explanation: "Stocks give 12% return.",
    hint: "12%.",
    level: "basic",
    codeExample: "0.12 per rupee."
  },
  {
    question: "What is the return from bonds per rupee?",
    shortAnswer: "8% or 0.08 per rupee.",
    explanation: "Bonds give 8% return.",
    hint: "8%.",
    level: "basic",
    codeExample: "0.08 per rupee."
  },
  {
    question: "What is the risk rating of stocks?",
    shortAnswer: "8.",
    explanation: "Stocks have a risk rating of 8.",
    hint: "Risk = 8.",
    level: "basic",
    codeExample: "Risk of stocks = 8."
  },
  {
    question: "What is the risk rating of bonds?",
    shortAnswer: "4.",
    explanation: "Bonds have a risk rating of 4.",
    hint: "Risk = 4.",
    level: "basic",
    codeExample: "Risk of bonds = 4."
  },
  {
    question: "What is the minimum return requirement?",
    shortAnswer: "₹10,000.",
    explanation: "The investor wants to earn at least ₹10,000.",
    hint: "₹10,000.",
    level: "basic",
    codeExample: "Return ≥ 10,000."
  },
  {
    question: "What is the diversification requirement?",
    shortAnswer: "At least ₹20,000 in bonds (y ≥ 20,000).",
    explanation: "The investor must invest at least ₹20,000 in bonds.",
    hint: "y ≥ 20,000.",
    level: "basic",
    codeExample: "y ≥ 20000."
  },
  {
    question: "What is the simplified return constraint?",
    shortAnswer: "3x + 2y ≥ 250,000.",
    explanation: "Multiply 0.12x+0.08y≥10000 by 100 and divide by 4.",
    hint: "3x + 2y ≥ 250,000.",
    level: "intermediate",
    codeExample: "3x+2y≥250000."
  },
  {
    question: "Why is the return constraint binding at the optimum?",
    shortAnswer: "Because the optimal solution exactly meets the return requirement.",
    explanation: "At (50,000,50,000), return = 10,000 exactly.",
    hint: "Return = 10,000 at optimum.",
    level: "intermediate",
    codeExample: "0.12(50000)+0.08(50000)=10000."
  },
  {
    question: "What happens if the return requirement increases to ₹12,000?",
    shortAnswer: "The optimal solution would change, investing more in stocks.",
    explanation: "Higher return requires more investment in higher-yield stocks.",
    hint: "More stocks needed.",
    level: "intermediate",
    codeExample: "If return ≥ 12000, new optimum may be different."
  },
  {
    question: "What happens if the diversification requirement increases to ₹30,000?",
    shortAnswer: "The optimal solution would change, investing more in bonds.",
    explanation: "Higher bond requirement forces more investment in bonds.",
    hint: "More bonds needed.",
    level: "intermediate",
    codeExample: "If y ≥ 30000, new optimum may be different."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "Risk and return must be balanced in investment decisions.",
    explanation: "LP helps find the optimal trade-off between risk and return.",
    hint: "Balance risk and return.",
    level: "basic",
    codeExample: "LP optimizes the risk-return trade-off."
  },
  {
    question: "What is the risk at (0, 100,000)?",
    shortAnswer: "400,000.",
    explanation: "At (0,100,000), R = 8(0) + 4(100,000) = 400,000.",
    hint: "R = 400,000.",
    level: "basic",
    codeExample: "(0,100000) gives R=400000."
  },
  {
    question: "Why isn't (0, 100,000) feasible?",
    shortAnswer: "It violates the return requirement (only ₹8,000 return).",
    explanation: "0.12(0) + 0.08(100,000) = 8,000 < 10,000.",
    hint: "Return < 10,000.",
    level: "intermediate",
    codeExample: "0.08(100000)=8000 < 10000."
  },
  {
    question: "What is the risk at (100,000, 0)?",
    shortAnswer: "800,000.",
    explanation: "At (100,000,0), R = 8(100,000) + 4(0) = 800,000.",
    hint: "R = 800,000.",
    level: "basic",
    codeExample: "(100000,0) gives R=800000."
  },
  {
    question: "Why isn't (100,000, 0) feasible?",
    shortAnswer: "It violates the diversification requirement (y ≥ 20,000).",
    explanation: "At (100,000,0), y=0 which is less than 20,000.",
    hint: "y=0 < 20000.",
    level: "intermediate",
    codeExample: "(100000,0) has y=0, violates y≥20000."
  },
  {
    question: "What is the return at (20,000, 80,000)?",
    shortAnswer: "₹8,800.",
    explanation: "0.12(20,000) + 0.08(80,000) = 2,400 + 6,400 = 8,800.",
    hint: "Return = ₹8,800.",
    level: "basic",
    codeExample: "0.12(20000)+0.08(80000)=8800."
  },
  {
    question: "Why isn't (20,000, 80,000) feasible?",
    shortAnswer: "It violates the return requirement (₹8,800 < ₹10,000).",
    explanation: "The return is less than the required ₹10,000.",
    hint: "Return < 10,000.",
    level: "intermediate",
    codeExample: "8800 < 10000."
  },
  {
    question: "What is the return at (16,667, 83,333)?",
    shortAnswer: "₹8,667.",
    explanation: "0.12(16,667) + 0.08(83,333) ≈ 2,000 + 6,667 = 8,667.",
    hint: "Return ≈ ₹8,667.",
    level: "basic",
    codeExample: "0.12(16667)+0.08(83333)=8667."
  },
  {
    question: "Why isn't (16,667, 83,333) feasible?",
    shortAnswer: "It violates the return requirement (₹8,667 < ₹10,000).",
    explanation: "The return is less than the required ₹10,000.",
    hint: "Return < 10,000.",
    level: "intermediate",
    codeExample: "8667 < 10000."
  },
  {
    question: "What is the feasible region in this problem?",
    shortAnswer: "The region where all constraints are satisfied.",
    explanation: "The feasible region is bounded by the budget constraint (x+y≤100000), the return constraint (3x+2y≥250000), and the diversification constraint (y≥20000).",
    hint: "Overlap of all constraints.",
    level: "intermediate",
    codeExample: "The shaded region on the graph."
  },
  {
    question: "What is the shadow price of the return constraint?",
    shortAnswer: "The amount risk increases for one more rupee of return requirement.",
    explanation: "Shadow price tells the cost (in risk) of requiring more return.",
    hint: "Cost of more return.",
    level: "expert",
    codeExample: "Shadow price of return = 60 (in this example)."
  },
  {
    question: "What is the shadow price of the budget constraint?",
    shortAnswer: "The amount risk decreases for one more rupee of budget.",
    explanation: "Shadow price tells the benefit (reduced risk) of more budget.",
    hint: "Benefit of more budget.",
    level: "expert",
    codeExample: "Shadow price of budget = -6 (in this example)."
  }
];

export default questions;