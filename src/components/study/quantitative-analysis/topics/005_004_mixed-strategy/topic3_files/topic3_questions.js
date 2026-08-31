// topic3_questions.js
// 30 Moderate to Expert Questions on Mixed Strategy Solutions for 2x2 Games

const questions = [
  {
    question: "What is the universal denominator Delta in the analytical formulas for a 2x2 game without a saddle point?",
    shortAnswer: "Delta = (a11 + a22) - (a12 + a21) (the sum of the main diagonal elements minus the sum of the off-diagonal elements).",
    explanation: "Standard denominator for all 2x2 mixed strategy formulas.",
    hint: "Delta = (a11 + a22) - (a12 + a21).",
    level: "moderate",
    codeExample: "Delta = (a11 + a22) - (a12 + a21);"
  },
  {
    question: "What is the closed-form analytical formula for Player A's optimal probability p1* in a 2x2 game?",
    shortAnswer: "p1* = (a22 - a21) / Delta, and p2* = 1 - p1* = (a11 - a12) / Delta.",
    explanation: "Derived by equating Player A's expected payoffs against Column 1 and Column 2.",
    hint: "p1* = (a22 - a21) / [(a11 + a22) - (a12 + a21)].",
    level: "moderate",
    codeExample: "p1_star = (a22 - a21) / ((a11 + a22) - (a12 + a21));"
  },
  {
    question: "What is the closed-form analytical formula for Player B's optimal probability q1* in a 2x2 game?",
    shortAnswer: "q1* = (a22 - a12) / Delta, and q2* = 1 - q1* = (a11 - a21) / Delta.",
    explanation: "Derived by equating Player B's expected payouts against Row 1 and Row 2.",
    hint: "q1* = (a22 - a12) / [(a11 + a22) - (a12 + a21)].",
    level: "moderate",
    codeExample: "q1_star = (a22 - a12) / ((a11 + a22) - (a12 + a21));"
  },
  {
    question: "What is the closed-form formula for the Value of the Game v* in a 2x2 game without a saddle point?",
    shortAnswer: "v* = (a11 * a22 - a12 * a21) / Delta = det(A) / [(a11 + a22) - (a12 + a21)].",
    explanation: "Ratio of the determinant of the payoff matrix to Delta.",
    hint: "v* = (a11*a22 - a12*a21) / Delta.",
    level: "moderate",
    codeExample: "v_star = (a11*a22 - a12*a21) / ((a11 + a22) - (a12 + a21));"
  },
  {
    question: "How is the formula for p1* derived from first principles?",
    shortAnswer: "Set E(p, B1) = E(p, B2): p1*a11 + (1-p1)*a21 = p1*a12 + (1-p1)*a22. Rearrange terms: p1(a11 - a21 - a12 + a22) = a22 - a21, which yields p1* = (a22 - a21) / Delta.",
    explanation: "First-principles algebraic derivation using the indifference principle.",
    hint: "Equate expected payoffs against B1 and B2.",
    level: "expert",
    codeExample: "Derivation: p1*a11 + (1-p1)*a21 === p1*a12 + (1-p1)*a22 => p1* = (a22 - a21) / Delta;"
  },
  {
    question: "Suppose A = [[20, 0], [0, 40]] (in ₹ Thousands). What is Delta?",
    shortAnswer: "Delta = (20 + 40) - (0 + 0) = 60.",
    explanation: "Main diagonal sum = 60; off-diagonal sum = 0.",
    hint: "Delta = (20 + 40) - (0 + 0) = 60.",
    level: "moderate",
    codeExample: "Delta = (20 + 40) - (0 + 0); // 60"
  },
  {
    question: "For A = [[20, 0], [0, 40]], what are the optimal probabilities p1* and p2* for Player A?",
    shortAnswer: "p1* = (40 - 0) / 60 = 40/60 = 2/3 (≈ 0.667), and p2* = (20 - 0) / 60 = 20/60 = 1/3 (≈ 0.333).",
    explanation: "Plug into the p1* and p2* formulas.",
    hint: "p1* = 2/3, p2* = 1/3.",
    level: "moderate",
    codeExample: "p1_star = 40 / 60; p2_star = 20 / 60;"
  },
  {
    question: "For A = [[20, 0], [0, 40]], what are the optimal probabilities q1* and q2* for Player B?",
    shortAnswer: "q1* = (40 - 0) / 60 = 2/3 (≈ 0.667), and q2* = (20 - 0) / 60 = 1/3 (≈ 0.333).",
    explanation: "Plug into the q1* and q2* formulas.",
    hint: "q1* = 2/3, q2* = 1/3.",
    level: "moderate",
    codeExample: "q1_star = 40 / 60; q2_star = 20 / 60;"
  },
  {
    question: "For A = [[20, 0], [0, 40]], what is the Value of the Game v* in ₹?",
    shortAnswer: "v* = (20*40 - 0*0) / 60 = 800 / 60 = 40/3 ≈ ₹13.333k (₹13,333.33).",
    explanation: "Determinant divided by Delta.",
    hint: "v* = 800 / 60 = ₹13,333.33.",
    level: "moderate",
    codeExample: "v_star = (20 * 40) / 60; // 13.333"
  },
  {
    question: "Can Delta ever equal zero in a 2x2 game WITHOUT a saddle point?",
    shortAnswer: "NO! If a 2x2 game has no saddle point, Delta is strictly non-zero (either strictly positive or strictly negative).",
    explanation: "Guaranteed by the non-existence of a pure saddle point.",
    hint: "No, Delta is strictly non-zero in non-saddle games.",
    level: "expert",
    codeExample: "assert(Delta !== 0);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating 2x2 game values and payoffs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of 2x2 Game = ₹13,333.33'"
  },
  {
    question: "What is the ultimate golden rule of the Mixed Strategy Solution for 2x2 Games?",
    shortAnswer: "'Compute Delta = (a11 + a22) - (a12 + a21); determine p1* = (a22 - a21)/Delta, q1* = (a22 - a12)/Delta, and v* = (a11 a22 - a12 a21)/Delta in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all 2x2 closed-form solution mechanics.",
    hint: "Delta = Diag - OffDiag → p* = Diff/Delta, q* = Diff/Delta, v* = Det/Delta in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ComputeDelta() → CalcProbabilities() → CalcGameValue(₹)."
  }
];

export default questions;
