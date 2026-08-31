// topic7_questions.js
// 30 Comprehensive Master Review & Viva Voce Questions for Module 005_004 Mixed Strategy

const questions = [
  {
    question: "What is the primary condition that necessitates the use of Mixed Strategies in a Two-Person Zero-Sum Game?",
    shortAnswer: "When Maximin (alpha) < Minimax (beta), meaning no pure saddle point exists and pure strategies suffer from predictability traps.",
    explanation: "Standard non-saddle condition requiring mixed strategy randomization.",
    hint: "Maximin < Minimax (no pure saddle point).",
    level: "moderate",
    codeExample: "if (maximin < minimax) { useMixedStrategy(); }"
  },
  {
    question: "What are the two probability axioms required for any valid mixed strategy vector p?",
    shortAnswer: "1. Normalization: sum(p_i) = 1.0; 2. Non-negativity: p_i >= 0 for all i.",
    explanation: "Fundamental axioms of probability distribution on strategy spaces.",
    hint: "Sum = 1.0 and all entries >= 0.",
    level: "moderate",
    codeExample: "isValid = sum(p) === 1.0 && p.every(val => val >= 0);"
  },
  {
    question: "What is the bilinear formula for the Expected Payoff E(p, q)?",
    shortAnswer: "E(p, q) = p^T * A * q = sum_i sum_j p_i * a_ij * q_j.",
    explanation: "Matrix product representing the expected return under mixed strategy profile (p, q).",
    hint: "E(p, q) = p^T A q.",
    level: "moderate",
    codeExample: "E = p.reduce((acc, pi, i) => acc + pi * q.reduce((rowSum, qj, j) => rowSum + qj * A[i][j], 0), 0);"
  },
  {
    question: "What does the Indifference Principle state about expected payoffs at mixed strategy equilibrium p*?",
    shortAnswer: "Player A's optimal mixed strategy p* makes Player B's expected payoffs identical across all active pure columns: E(p*, B1) = E(p*, B2) = v*.",
    explanation: "Core indifference foundation of mixed Nash equilibrium.",
    hint: "E(p*, B1) = E(p*, B2) = v*.",
    level: "expert",
    codeExample: "Indifference: E(p_star, B1) === E(p_star, B2) === v_star;"
  },
  {
    question: "What is the universal denominator Delta in the closed-form 2x2 mixed strategy formulas?",
    shortAnswer: "Delta = (a11 + a22) - (a12 + a21) (Main Diagonal Sum minus Off-Diagonal Sum).",
    explanation: "Universal denominator for 2x2 mixed strategy solutions.",
    hint: "Delta = (a11 + a22) - (a12 + a21).",
    level: "moderate",
    codeExample: "Delta = (a11 + a22) - (a12 + a21);"
  },
  {
    question: "What are the closed-form formulas for p1* and q1* in a 2x2 game?",
    shortAnswer: "p1* = (a22 - a21) / Delta; q1* = (a22 - a12) / Delta.",
    explanation: "Standard closed-form probability equations.",
    hint: "p1* = (a22 - a21)/Delta, q1* = (a22 - a12)/Delta.",
    level: "moderate",
    codeExample: "p1_star = (a22 - a21) / Delta; q1_star = (a22 - a12) / Delta;"
  },
  {
    question: "What is the closed-form formula for the Value of the Game v* in a 2x2 game?",
    shortAnswer: "v* = det(A) / Delta = (a11*a22 - a12*a21) / Delta.",
    explanation: "Determinant divided by Delta.",
    hint: "v* = det(A) / Delta.",
    level: "moderate",
    codeExample: "v_star = (a11*a22 - a12*a21) / Delta;"
  },
  {
    question: "How does the Oddments Method calculate optimal strategy probabilities?",
    shortAnswer: "Take cross-row absolute differences for Player A (|a21-a22| for Row 1, |a11-a12| for Row 2) and cross-column differences for Player B, then normalize by the total sum.",
    explanation: "Arithmetic short-cut for 2x2 non-saddle games.",
    hint: "Cross-assign row and column differences, then normalize.",
    level: "intermediate",
    codeExample: "OddmentA1 = Math.abs(a21 - a22); p1 = OddmentA1 / (OddmentA1 + OddmentA2);"
  },
  {
    question: "What is a 'Strictly Fair Game' in Game Theory?",
    shortAnswer: "A zero-sum game where the Value of the Game is exactly zero (v* = ₹0).",
    explanation: "Balanced game with zero expected transfer.",
    hint: "A game where v* = 0.",
    level: "moderate",
    codeExample: "isFair = (v_star === 0);"
  },
  {
    question: "What are the fundamental bounds on the Value of the Game v*?",
    shortAnswer: "Maximin (alpha) <= v* <= Minimax (beta) and min(a_ij) <= v* <= max(a_ij).",
    explanation: "Security bounds governing zero-sum game solutions.",
    hint: "alpha <= v* <= beta.",
    level: "moderate",
    codeExample: "assert(maximin <= v_star && v_star <= minimax);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating mixed game values and expected payoffs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of Game v* = ₹27,142.86'"
  },
  {
    question: "What is the ultimate golden rule of Module 005_004 Mixed Strategies?",
    shortAnswer: "'When Maximin < Minimax, randomize over the probability simplex; calculate Delta = (a11+a22)-(a12+a21); compute p*, q*, and v* = det(A)/Delta; and verify indifference in Indian Rupees (₹)!'",
    explanation: "This master synthesis captures all core mixed strategy mechanics.",
    hint: "Randomize over simplex → Compute Delta, p*, q*, v* → Verify indifference in ₹.",
    level: "moderate",
    codeExample: "MasterGoldenRule: RandomizeSimplex() → Solve2x2ClosedForm() → VerifyIndifference(₹)."
  }
];

export default questions;
