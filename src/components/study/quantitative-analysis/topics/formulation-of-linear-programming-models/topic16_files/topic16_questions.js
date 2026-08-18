// topic16_files/topic16_questions.js

const questions = [
  {
    question: "What is the goal of an investment allocation problem?",
    shortAnswer: "To maximize expected return or minimize risk given a budget.",
    explanation: "Investment allocation problems aim to distribute a fixed amount of money across assets to achieve the best risk-return trade-off.",
    hint: "Maximize return, minimize risk.",
    level: "basic"
  },
  {
    question: "In the investment example, what are the decision variables?",
    shortAnswer: "x₁ = amount in Stocks, x₂ = amount in Bonds, x₃ = amount in Mutual Funds.",
    explanation: "These represent the rupee amounts invested in each asset class.",
    hint: "Three assets, three variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the investment example?",
    shortAnswer: "Maximize Z = 0.12x₁ + 0.08x₂ + 0.10x₃.",
    explanation: "Stocks return 12%, Bonds 8%, Mutual Funds 10%.",
    hint: "Expected returns.",
    level: "basic"
  },
  {
    question: "What does the budget constraint represent?",
    shortAnswer: "x₁ + x₂ + x₃ ≤ 200,000.",
    explanation: "Total investment cannot exceed ₹200,000.",
    hint: "Total investment limit.",
    level: "basic"
  },
  {
    question: "What does the risk constraint represent?",
    shortAnswer: "0.6x₁ + 0.3x₂ + 0.4x₃ ≤ 0.45(x₁ + x₂ + x₃).",
    explanation: "Portfolio risk (weighted average) must be ≤ 0.45.",
    hint: "Risk limit.",
    level: "moderate"
  },
  {
    question: "What is the simplified risk constraint?",
    shortAnswer: "3x₁ - 3x₂ - x₃ ≤ 0.",
    explanation: "After simplifying: 0.15x₁ - 0.15x₂ - 0.05x₃ ≤ 0 → 3x₁ - 3x₂ - x₃ ≤ 0.",
    hint: "Simplified risk inequality.",
    level: "moderate"
  },
  {
    question: "What does the constraint x₃ ≥ 20,000 represent?",
    shortAnswer: "At least ₹20,000 must be invested in Mutual Funds.",
    explanation: "This is a diversification or minimum allocation requirement.",
    hint: "Minimum Mutual Funds.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≤ 100,000 represent?",
    shortAnswer: "No more than ₹100,000 can be invested in Stocks.",
    explanation: "This limits exposure to a single asset class.",
    hint: "Maximum Stocks.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the investment example?",
    shortAnswer: "x₁ = 93,333.33, x₂ = 86,666.67, x₃ = 20,000.",
    explanation: "Invest these amounts to maximize return while staying within risk and constraints.",
    hint: "Optimal allocation.",
    level: "moderate"
  },
  {
    question: "What is the total expected return at the optimal solution?",
    shortAnswer: "₹20,133.33.",
    explanation: "Return = 0.12(93,333.33) + 0.08(86,666.67) + 0.10(20,000) = 20,133.33.",
    hint: "Maximum return value.",
    level: "moderate"
  },
  {
    question: "What is the return percentage of the portfolio?",
    shortAnswer: "10.07% (20,133.33 / 200,000).",
    explanation: "The expected return on total investment is about 10.07%.",
    hint: "Return / investment.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Budget, Risk, Mutual Funds minimum, and Stocks maximum are all binding.",
    explanation: "All constraints are met with equality: budget full, risk exactly 0.45, x₃ = 20,000, x₁ = 93,333.33.",
    hint: "All constraints are tight.",
    level: "moderate"
  },
  {
    question: "What is the portfolio risk at the optimal solution?",
    shortAnswer: "0.45 (exactly the limit).",
    explanation: "Risk = 0.6(93,333.33) + 0.3(86,666.67) + 0.4(20,000) = 90,000 = 0.45 × 200,000.",
    hint: "Exactly at the limit.",
    level: "moderate"
  },
  {
    question: "If the risk tolerance increases to 0.50, what happens?",
    shortAnswer: "The optimal solution changes, allowing more Stocks and higher return.",
    explanation: "Higher risk tolerance permits a riskier portfolio with more expected return.",
    hint: "More risk = more return.",
    level: "expert"
  },
  {
    question: "If the Mutual Funds minimum increases to ₹30,000, what happens?",
    shortAnswer: "The optimal solution shifts, reducing Stocks/Bonds to fund the increase.",
    explanation: "Higher minimum Mutual Funds forces more allocation to lower-return asset.",
    hint: "Higher minimum = lower return.",
    level: "expert"
  },
  {
    question: "How do you calculate portfolio risk?",
    shortAnswer: "Weighted average of asset risks: Σ (risk_i × investment_i) / total investment.",
    explanation: "Portfolio risk is the sum of each asset's risk factor multiplied by its investment proportion.",
    hint: "Weighted average.",
    level: "moderate"
  },
  {
    question: "What is the role of non-negativity in investment problems?",
    shortAnswer: "To ensure investment amounts are non-negative.",
    explanation: "You cannot invest negative amounts.",
    hint: "No negative investment.",
    level: "basic"
  },
  {
    question: "What is a common mistake in investment allocation problems?",
    shortAnswer: "Forgetting the risk constraint or misinterpreting the risk coefficients.",
    explanation: "Risk constraints are crucial; mixing up risk factors leads to invalid portfolios.",
    hint: "Don't ignore risk.",
    level: "moderate"
  },
  {
    question: "If the expected return of Stocks increases to 15%, what happens?",
    shortAnswer: "The optimal solution shifts toward Stocks, increasing return.",
    explanation: "Higher return makes Stocks more attractive, but risk constraint limits allocation.",
    hint: "Higher return = more Stocks.",
    level: "expert"
  },
  {
    question: "What is the risk factor of Bonds?",
    shortAnswer: "0.3.",
    explanation: "Bonds have a risk factor of 0.3, indicating lower risk than Stocks (0.6) but higher than cash.",
    hint: "Bonds risk.",
    level: "basic"
  },
  {
    question: "What is the risk factor of Mutual Funds?",
    shortAnswer: "0.4.",
    explanation: "Mutual Funds have a risk factor of 0.4, between Stocks and Bonds.",
    hint: "Mutual Funds risk.",
    level: "basic"
  },
  {
    question: "What is the risk factor of Stocks?",
    shortAnswer: "0.6.",
    explanation: "Stocks have the highest risk factor among the three assets.",
    hint: "Stocks risk.",
    level: "basic"
  },
  {
    question: "What is the purpose of the minimum Mutual Funds constraint?",
    shortAnswer: "To ensure diversification and reduce overall portfolio risk.",
    explanation: "Investing a minimum in Mutual Funds provides some diversification benefit.",
    hint: "Diversification requirement.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the maximum Stocks constraint?",
    shortAnswer: "To limit exposure to the riskiest asset.",
    explanation: "Capping Stocks prevents the portfolio from being too risky.",
    hint: "Limit risk exposure.",
    level: "moderate"
  },
  {
    question: "How do you know if a solution is optimal?",
    shortAnswer: "Check if all constraints are satisfied and return is maximized.",
    explanation: "The optimal solution uses the full budget and satisfies all constraints with no further improvement possible.",
    hint: "Full budget + all constraints.",
    level: "moderate"
  },
  {
    question: "What is the total investment at the optimal solution?",
    shortAnswer: "₹200,000 (full budget).",
    explanation: "The optimal solution uses the entire budget.",
    hint: "Full budget used.",
    level: "basic"
  },
  {
    question: "What is the expected return from Stocks at the optimal solution?",
    shortAnswer: "₹11,200 (0.12 × 93,333.33).",
    explanation: "Stocks contribute the largest portion of return due to high expected return.",
    hint: "Return from Stocks.",
    level: "moderate"
  },
  {
    question: "What is the expected return from Bonds at the optimal solution?",
    shortAnswer: "₹6,933.33 (0.08 × 86,666.67).",
    explanation: "Bonds provide a moderate return.",
    hint: "Return from Bonds.",
    level: "moderate"
  },
  {
    question: "What is the expected return from Mutual Funds at the optimal solution?",
    shortAnswer: "₹2,000 (0.10 × 20,000).",
    explanation: "Mutual Funds contribute the smallest return due to minimum investment.",
    hint: "Return from Mutual Funds.",
    level: "moderate"
  },
  {
    question: "What is the return per rupee of the portfolio?",
    shortAnswer: "0.1007 (10.07%).",
    explanation: "Total return divided by total investment.",
    hint: "Overall return rate.",
    level: "moderate"
  }
];

export default questions;