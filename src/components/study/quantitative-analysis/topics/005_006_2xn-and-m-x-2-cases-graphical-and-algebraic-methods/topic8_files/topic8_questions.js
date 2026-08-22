// topic8_questions.js
// 30 Moderate to Expert Questions on Numerical Exercises for 2xn and mx2 Games

const questions = [
  {
    question: "Solve the 2x4 game graphically: A = [[20, 50, 60, 30], [40, 10, 30, 50]] (in ₹ Thousands). What is the optimal strategy profile and game value v*?",
    shortAnswer: "Peak on lower envelope is at p1* = 0.50 (intersection of B1 and B2). Player A: p* = [0.50, 0.50]^T. Player B: q* = [2/3, 1/3, 0.00, 0.00]^T. Game Value v* = +₹30k (₹30,000).",
    explanation: "Standard 2x4 graphical solution.",
    hint: "p* = [0.5, 0.5], q* = [2/3, 1/3, 0, 0], v* = ₹30,000.",
    level: "moderate",
    codeExample: "p_star = [0.5, 0.5]; q_star = [2/3, 1/3, 0, 0]; v_star = 30000;"
  },
  {
    question: "Solve the 4x2 game graphically: A = [[20, 50], [40, 10], [30, 60], [50, 20]] (in ₹ Thousands). What is the optimal strategy profile and game value v*?",
    shortAnswer: "Trough on upper envelope is at q1* = 2/3 (intersection of A1 and A2). Player A: p* = [0.50, 0.50, 0.00, 0.00]^T. Player B: q* = [2/3, 1/3]^T. Game Value v* = +₹30k (₹30,000).",
    explanation: "Standard 4x2 graphical solution.",
    hint: "p* = [0.5, 0.5, 0, 0], q* = [2/3, 1/3], v* = ₹30,000.",
    level: "moderate",
    codeExample: "p_star = [0.5, 0.5, 0, 0]; q_star = [2/3, 1/3]; v_star = 30000;"
  },
  {
    question: "Solve the 2x3 game algebraically: A = [[30, 10, 40], [10, 40, 50]] (in ₹ Thousands). What are the 3 candidate pairs and which one is optimal?",
    shortAnswer: "Candidate pairs: {B1, B2}, {B1, B3}, {B2, B3}. Pair {B1, B2} is optimal with Δ = 50, p* = [0.60, 0.40]^T, q* = [0.60, 0.40, 0.00]^T, and v* = +₹22k (₹22,000).",
    explanation: "Algebraic enumeration of 3 pairs.",
    hint: "Pair {B1, B2} is optimal; v* = ₹22,000.",
    level: "moderate",
    codeExample: "p_star = [0.6, 0.4]; q_star = [0.6, 0.4, 0]; v_star = 22000;"
  },
  {
    question: "Solve the 5x2 game algebraically: A = [[10, 50], [40, 20], [30, 30], [50, 10], [20, 40]] (in ₹ Thousands). What is the optimal row pair and game value?",
    shortAnswer: "Pair {A1, A2} gives Δ = -60, q* = [0.50, 0.50]^T, p_sub* = [1/3, 2/3], v* = ₹26,666.67. Reconstructed: p* = [1/3, 2/3, 0, 0, 0]^T.",
    explanation: "5x2 submatrix enumeration solution.",
    hint: "Pair {A1, A2} is optimal; v* = ₹26,666.67.",
    level: "expert",
    codeExample: "p_star = [1/3, 2/3, 0, 0, 0]; q_star = [0.5, 0.5]; v_star = 26666.67;"
  },
  {
    question: "In Exercise 1 (2x4 game), why does Column B3 [60, 30] receive probability 0.0?",
    shortAnswer: "Because at p1* = 0.50, Column B3 yields an expected payoff of 0.5(60) + 0.5(30) = ₹45k > ₹30k. Since Player B is a minimizer, playing B3 would needlessly concede an extra ₹15,000 to Player A.",
    explanation: "Zero-probability justification for inactive column.",
    hint: "B3 gives ₹45,000 > ₹30,000 (disadvantageous for Player B).",
    level: "moderate",
    codeExample: "q_star[2] = 0.0;"
  },
  {
    question: "In Exercise 2 (4x2 game), why does Row A3 [30, 60] receive probability 0.0?",
    shortAnswer: "Because at q1* = 2/3, Row A3 yields an expected return of (2/3)(30) + (1/3)(60) = 20 + 20 = ₹40k > ₹30k (lies strictly above the Minimax trough ceiling), so Player B's mix prevents Player A from realizing it.",
    explanation: "Zero-probability justification for inactive row.",
    hint: "Row A3 is not part of the active upper envelope trough.",
    level: "expert",
    codeExample: "p_star[2] = 0.0;"
  },
  {
    question: "How do you verify the solution of Exercise 3 against Column B3?",
    shortAnswer: "Compute E(p*, B3) = 0.6(40) + 0.4(50) = 24 + 20 = ₹44k. Since ₹44k >= v* (₹22k), Column B3 is completely non-exploitable by Player B.",
    explanation: "Global audit calculation for Column B3.",
    hint: "E(p*, B3) = ₹44,000 >= ₹22,000 (passed).",
    level: "moderate",
    codeExample: "assert(0.6 * 40 + 0.4 * 50 >= 22);"
  },
  {
    question: "What is the computational advantage of solving Exercise 1 graphically over setting up an 8-variable Linear Program?",
    shortAnswer: "Graphical inspection identifies the active columns {B1, B2} in under 5 seconds, whereas Simplex LP requires creating an 8-variable tableau with 4 artificial variables and multiple pivot iterations.",
    explanation: "Efficiency comparison.",
    hint: "5-second visual identification vs multi-step LP tableaus.",
    level: "intermediate",
    codeExample: "TimeComparison: Graphical 5s vs SimplexLP 300s."
  },
  {
    question: "Can an m x 2 game with negative matrix entries be solved using the same 4-step numerical procedure?",
    shortAnswer: "YES! The linear equations and upper envelope construction apply identically to positive, negative, and zero payoffs.",
    explanation: "Universal applicability across negative numbers.",
    hint: "Yes, applies identically to negative numbers.",
    level: "moderate",
    codeExample: "supportsNegativeValues = true;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating numerical solutions in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of Game = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of Numerical Exercises for 2xn and mx2 Games?",
    shortAnswer: "'Trace the active boundary envelope (or enumerate submatrices); pinpoint the optimal apex; solve the 2x2 submatrix; reconstruct full-dimensional strategy vectors; verify global optimality; and report all payoffs in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all steps in numerical 2xn and mx2 problem solving.",
    hint: "Trace envelope -> Apex -> Solve 2x2 -> Reconstruct full vectors in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: TraceEnvelope() -> FindApex() -> Solve2x2() -> ReconstructVectors(₹)."
  }
];

export default questions;
