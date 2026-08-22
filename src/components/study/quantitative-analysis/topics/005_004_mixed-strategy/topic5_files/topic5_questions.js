// topic5_questions.js
// 30 Moderate to Expert Questions on Finding the Value of the Game in Game Theory

const questions = [
  {
    question: "What is the primary determinant formula for the Value of the Game v* in a 2x2 mixed strategy game?",
    shortAnswer: "v* = det(A) / Delta = (a11*a22 - a12*a21) / [(a11 + a22) - (a12 + a21)].",
    explanation: "Standard closed-form formula for the value of a 2x2 game.",
    hint: "v* = (a11*a22 - a12*a21) / Delta.",
    level: "moderate",
    codeExample: "v_star = (a11*a22 - a12*a21) / ((a11 + a22) - (a12 + a21));"
  },
  {
    question: "How can the Value of the Game v* be computed using Player A's optimal probability p1* and Column 1?",
    shortAnswer: "v* = p1* * a11 + (1 - p1*) * a21.",
    explanation: "Direct substitution into the expected payoff equation against Column 1.",
    hint: "v* = p1* a11 + p2* a21.",
    level: "moderate",
    codeExample: "v_star = p1_star * a11 + (1 - p1_star) * a21;"
  },
  {
    question: "How can the Value of the Game v* be computed using Row Oddments (OA1, OA2)?",
    shortAnswer: "v* = (a11 * OA1 + a21 * OA2) / (OA1 + OA2) = (a12 * OA1 + a22 * OA2) / (OA1 + OA2).",
    explanation: "Oddments weighted average of either column.",
    hint: "v* = (a11*OA1 + a21*OA2) / (OA1 + OA2).",
    level: "intermediate",
    codeExample: "v_star = (a11 * OA1 + a21 * OA2) / (OA1 + OA2);"
  },
  {
    question: "What is a 'Strictly Fair Game' in Game Theory?",
    shortAnswer: "A game where the equilibrium Value of the Game is exactly zero (v* = ₹0). Neither player has an inherent expected advantage.",
    explanation: "Expected payout under optimal play is exactly 0 in Indian Rupees (₹).",
    hint: "A game with v* = 0.",
    level: "moderate",
    codeExample: "isFairGame = (v_star === 0);"
  },
  {
    question: "What are the universal lower and upper bounds on the Value of the Game v* in terms of Maximin and Minimax?",
    shortAnswer: "Maximin (alpha) <= v* <= Minimax (beta).",
    explanation: "Fundamental security floor and liability ceiling bounds.",
    hint: "alpha <= v* <= beta.",
    level: "moderate",
    codeExample: "assert(maximin <= v_star && v_star <= minimax);"
  },
  {
    question: "Suppose A = [[30, -10], [-10, 30]] (in ₹ Thousands). What is the Value of the Game v*?",
    shortAnswer: "Delta = (30 + 30) - (-10 + -10) = 60 - (-20) = 80. det(A) = 30*30 - (-10*-10) = 900 - 100 = 800. v* = 800 / 80 = +₹10k (₹10,000).",
    explanation: "Symmetric non-saddle game evaluation.",
    hint: "v* = 800 / 80 = +₹10,000.",
    level: "moderate",
    codeExample: "v_star = (900 - 100) / (60 - (-20)); // 10"
  },
  {
    question: "Suppose A = [[10, -20], [-20, 10]] (in ₹ Thousands). What is the Value of the Game v*?",
    shortAnswer: "Delta = (10 + 10) - (-20 + -20) = 20 - (-40) = 60. det(A) = 10*10 - (-20*-20) = 100 - 400 = -300. v* = -300 / 60 = -₹5k (-₹5,000, favorable to Player B).",
    explanation: "Negative game value indicates advantage to the column player.",
    hint: "v* = -300 / 60 = -₹5,000.",
    level: "moderate",
    codeExample: "v_star = (100 - 400) / 60; // -5"
  },
  {
    question: "If a constant c = ₹15,000 is added to every entry in matrix A, what is the new game value v*'?",
    shortAnswer: "v*' = v* + ₹15,000. Adding a constant shifts the game value by exactly that constant.",
    explanation: "Shift property of two-person zero-sum game values.",
    hint: "v*' = v* + ₹15,000.",
    level: "moderate",
    codeExample: "v_star_new = v_star_old + 15000;"
  },
  {
    question: "If every entry in matrix A is multiplied by a positive scalar k = 3, what is the new game value v*'?",
    shortAnswer: "v*' = 3 * v*. Multiplying by a positive scalar scales the game value by k.",
    explanation: "Homogeneity of degree 1 for game value.",
    hint: "v*' = 3 * v*.",
    level: "moderate",
    codeExample: "v_star_new = 3 * v_star_old;"
  },
  {
    question: "Suppose Debangshu in Barrackpore finds p* = [0.6, 0.4] for A = [[40, 10], [10, 50]]. Compute v* via Column 1.",
    shortAnswer: "v* = 0.6(40) + 0.4(10) = 24 + 4 = ₹28k (₹28,000).",
    explanation: "Direct calculation using Column 1 entries.",
    hint: "0.6(40) + 0.4(10) = ₹28,000.",
    level: "moderate",
    codeExample: "v_star = 0.6 * 40 + 0.4 * 10; // 28"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating the Value of the Game in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Optimal Value of Game v* = ₹28,000'"
  },
  {
    question: "What is the ultimate golden rule of Finding the Value of the Game in Game Theory?",
    shortAnswer: "'Compute v* via det(A)/Delta, expected payoff substitution, or oddments inner products: verify that Maximin <= v* <= Minimax and report the exact financial value in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all game value computation and validation methods.",
    hint: "det(A)/Delta -> Substitute p* -> Validate bounds in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: CalcDetOverDelta() -> VerifyExpectedPayoff() -> ReportInRupees(₹)."
  }
];

export default questions;
