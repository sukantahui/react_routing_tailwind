// topic6_questions.js
// 30 Moderate to Expert Questions on Solving Equations for Optimal Probabilities

const questions = [
  {
    question: "What is the 'Indifference Principle' (Equal Payoff Condition) used to set up probability equations?",
    shortAnswer: "Player A chooses probabilities p1 and p2 such that Player B's expected payoffs against all active columns are strictly EQUAL. Simultaneously, Player B chooses q1 and q2 such that Player A's expected returns against all active rows are strictly EQUAL.",
    explanation: "Fundamental equal payoff principle of mixed strategy Nash equilibria.",
    hint: "Each player randomizes to make the opponent indifferent between active strategies.",
    level: "moderate",
    codeExample: "E(p, B1) === E(p, B2) && E(A1, q) === E(A2, q);"
  },
  {
    question: "Derive the formula for Player A's optimal probability p1* from the indifference equation E(p, B1) = E(p, B2).",
    shortAnswer: "p1*a11 + (1-p1)*a21 = p1*a12 + (1-p1)*a22 ➔ p1*(a11 - a21 - a12 + a22) = a22 - a21 ➔ p1* = (a22 - a21) / Δ, where Δ = (a11 + a22) - (a12 + a21).",
    explanation: "Algebraic derivation of p1*.",
    hint: "p1* = (a22 - a21) / Δ.",
    level: "moderate",
    codeExample: "p1_star = (a22 - a21) / ((a11 + a22) - (a12 + a21));"
  },
  {
    question: "Derive the formula for Player B's optimal probability q1* from the indifference equation E(A1, q) = E(A2, q).",
    shortAnswer: "q1*a11 + (1-q1)*a12 = q1*a21 + (1-q1)*a22 ➔ q1*(a11 - a12 - a21 + a22) = a22 - a12 ➔ q1* = (a22 - a12) / Δ, where Δ = (a11 + a22) - (a12 + a21).",
    explanation: "Algebraic derivation of q1*.",
    hint: "q1* = (a22 - a12) / Δ.",
    level: "moderate",
    codeExample: "q1_star = (a22 - a12) / ((a11 + a22) - (a12 + a21));"
  },
  {
    question: "What is the determinant Δ = (a11 + a22) - (a12 + a21) and what does it represent geometrically?",
    shortAnswer: "Δ represents the sum of the main diagonal minus the sum of the off-diagonal. Geometrically, it is the difference in slopes between the two active strategy lines (m1 - m2).",
    explanation: "Geometric and matrix meaning of Delta.",
    hint: "Δ = (Main Diagonal Sum) - (Off-Diagonal Sum) = m1 - m2.",
    level: "expert",
    codeExample: "Delta = (a11 + a22) - (a12 + a21); // Equals slope1 - slope2"
  },
  {
    question: "What does it mean if Δ = 0 when setting up the probability equations?",
    shortAnswer: "The two strategy lines have identical slopes (they are parallel). The simultaneous equation system has no unique solution in (0, 1), indicating that pure dominance exists.",
    explanation: "Singular system analysis.",
    hint: "Lines are parallel; no interior mixed equilibrium exists.",
    level: "moderate",
    codeExample: "if (Delta === 0) throw new Error('Parallel lines: use pure dominance');"
  },
  {
    question: "Suppose an extracted 2x2 submatrix in Barrackpore has A_sub = [[20, 50], [40, 10]] (in ₹ Thousands). What is Δ and p1*?",
    shortAnswer: "Δ = (20 + 10) - (50 + 40) = 30 - 90 = -60. p1* = (10 - 40) / -60 = -30 / -60 = 0.50 (50%).",
    explanation: "Numerical calculation of p1*.",
    hint: "Δ = -60, p1* = 0.50.",
    level: "moderate",
    codeExample: "Delta = -60; p1 = -30 / -60; // 0.50"
  },
  {
    question: "For A_sub = [[20, 50], [40, 10]], what are q1* and q2*?",
    shortAnswer: "q1* = (a22 - a12) / Δ = (10 - 50) / -60 = -40 / -60 = 2/3 (≈ 0.667). q2* = 1 - 2/3 = 1/3 (≈ 0.333).",
    explanation: "Numerical calculation of q1* and q2*.",
    hint: "q1* = 2/3, q2* = 1/3.",
    level: "moderate",
    codeExample: "q1 = 40 / 60; q2 = 20 / 60;"
  },
  {
    question: "How do the indifference equations protect Player A against an opponent who possesses complete knowledge of Player A's strategy?",
    shortAnswer: "Because Player A's mixed strategy makes Player B's expected payoffs identical across both active choices, Player B cannot gain any advantage by knowing Player A's probabilities.",
    explanation: "Nash equilibrium resilience to intelligence leakage.",
    hint: "Opponent receives identical payoffs regardless of which active column they choose.",
    level: "expert",
    codeExample: "assert(E_B1 === E_B2); // Opponent cannot exploit choice"
  },
  {
    question: "Can Cramer's Rule be used to solve the linear probability equations?",
    shortAnswer: "YES! Expressing the indifference condition and probability normalization (p1 + p2 = 1) as a 2x2 matrix system allows direct solution via Cramer's determinants.",
    explanation: "Cramer's Rule representation.",
    hint: "Yes, via standard 2x2 Cramer determinants.",
    level: "intermediate",
    codeExample: "p1 = det(Matrix_p1) / det(Matrix_A);"
  },
  {
    question: "What currency symbol must ALWAYS be used when calculating expected payoffs from probability equations in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Balanced Expected Payoff = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of Solving Equations for Optimal Probabilities?",
    shortAnswer: "'Set expected payoffs equal across active strategies; compute determinant Δ = (a11 + a22) - (a12 + a21); solve p1* = (a22 - a21)/Δ and q1* = (a22 - a12)/Δ; verify p1, q1 in [0, 1]; and state all payoffs in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all simultaneous equation solving mechanics.",
    hint: "Equal payoffs → Determinant Δ → Formulas for p1* & q1* in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: SetEqualPayoffs() → CalcDelta() → SolveP1Q1() → VerifyUnitSimplex(₹)."
  }
];

export default questions;
