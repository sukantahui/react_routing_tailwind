// topic6_questions.js
// 30 Moderate to Expert Questions on Numerical Exercises for 2x2 Mixed Strategy Games

const questions = [
  {
    question: "Solve the 2x2 game: A = [[20, -10], [-10, 20]] (in ₹ Thousands). What is the optimal strategy p* and game value v*?",
    shortAnswer: "Delta = (20+20) - (-10+-10) = 60. p1* = (20 - -10)/60 = 30/60 = 0.50, p2* = 0.50. det(A) = 400 - 100 = 300. v* = 300/60 = +₹5k (₹5,000).",
    explanation: "Standard symmetric matching pennies type game.",
    hint: "p* = [0.5, 0.5], q* = [0.5, 0.5], v* = ₹5,000.",
    level: "moderate",
    codeExample: "A = [[20, -10], [-10, 20]] => p* = [0.5, 0.5], v* = 5000;"
  },
  {
    question: "Solve the 2x2 game: A = [[40, 10], [10, 50]] (in ₹ Thousands). What is the optimal strategy p* and game value v*?",
    shortAnswer: "Delta = (40+50) - (10+10) = 70. p1* = (50-10)/70 = 4/7 (≈ 0.571), p2* = 3/7 (≈ 0.429). det(A) = 2000 - 100 = 1900. v* = 1900/70 ≈ +₹27.143k (₹27,142.86).",
    explanation: "Classic asymmetric manufacturing matrix.",
    hint: "p* = [4/7, 3/7], v* = ₹27,142.86.",
    level: "moderate",
    codeExample: "A = [[40, 10], [10, 50]] => p* = [4/7, 3/7], v* = 27142.86;"
  },
  {
    question: "Solve the 2x2 game: A = [[0, 60], [40, 0]] (in ₹ Thousands). What is the optimal strategy p* and game value v*?",
    shortAnswer: "Delta = (0+0) - (60+40) = -100. p1* = (0 - 40)/-100 = 40/100 = 0.40, p2* = 0.60. det(A) = 0 - 2400 = -2400. v* = -2400/-100 = +₹24k (₹24,000).",
    explanation: "Zero-diagonal non-saddle game.",
    hint: "p* = [0.40, 0.60], q* = [0.60, 0.40], v* = ₹24,000.",
    level: "moderate",
    codeExample: "A = [[0, 60], [40, 0]] => p* = [0.4, 0.6], v* = 24000;"
  },
  {
    question: "Solve the 2x2 game: A = [[15, -30], [-15, 30]] (in ₹ Thousands). What is the optimal strategy p* and game value v*?",
    shortAnswer: "Delta = (15+30) - (-30+-15) = 45 - (-45) = 90. p1* = (30 - -15)/90 = 45/90 = 0.50, p2* = 0.50. det(A) = 450 - 450 = 0. v* = 0/90 = ₹0 (Strictly Fair Game!).",
    explanation: "Demonstrates a zero-determinant Fair Game.",
    hint: "p* = [0.5, 0.5], v* = ₹0 (Fair Game).",
    level: "expert",
    codeExample: "A = [[15, -30], [-15, 30]] => p* = [0.5, 0.5], v* = 0;"
  },
  {
    question: "In the game A = [[1, 5], [4, 2]], why is the mixed strategy formula required?",
    shortAnswer: "Row minima = [1, 2] => Maximin = 2. Col maxima = [4, 5] => Minimax = 4. Since 2 < 4, no saddle point exists and mixed strategies are required.",
    explanation: "Maximin < Minimax confirms non-saddle status.",
    hint: "Maximin = 2 < Minimax = 4 => No saddle point.",
    level: "moderate",
    codeExample: "Maximin = 2; Minimax = 4 => Maximin < Minimax;"
  },
  {
    question: "For A = [[1, 5], [4, 2]], compute Delta, p*, q*, and v*.",
    shortAnswer: "Delta = (1+2) - (5+4) = 3 - 9 = -6. p1* = (2-4)/-6 = 2/6 = 1/3, p2* = 2/3. q1* = (2-5)/-6 = 3/6 = 1/2, q2* = 1/2. det(A) = 2 - 20 = -18. v* = -18/-6 = +3.",
    explanation: "Full step-by-step solution for matrix with negative Delta.",
    hint: "p* = [1/3, 2/3], q* = [1/2, 1/2], v* = +3.",
    level: "expert",
    codeExample: "A = [[1, 5], [4, 2]] => p* = [1/3, 2/3], q* = [1/2, 1/2], v* = 3;"
  },
  {
    question: "What happens when Delta is negative in a 2x2 game?",
    shortAnswer: "The numerators (a22 - a21) and (a11 - a12) will ALSO be negative, so the negative signs cancel out, ensuring probabilities p* and q* remain strictly positive and in [0, 1].",
    explanation: "Sign consistency of 2x2 mixed strategy formulas.",
    hint: "Negative numerators cancel with negative denominator to yield positive probabilities.",
    level: "expert",
    codeExample: "assert(num < 0 && den < 0 => num/den > 0);"
  },
  {
    question: "Suppose Debangshu in Barrackpore is solving A = [[20, 10], [10, 40]]. Verify Player A's indifference at equilibrium.",
    shortAnswer: "Delta = 40. p* = [30/40, 10/40] = [0.75, 0.25]. vs B1: 0.75(20) + 0.25(10) = 17.5. vs B2: 0.75(10) + 0.25(40) = 17.5. Both equal ₹17,500!",
    explanation: "Indifference verification.",
    hint: "E(p*, B1) = E(p*, B2) = ₹17,500.",
    level: "moderate",
    codeExample: "E_B1 = 0.75*20 + 0.25*10; E_B2 = 0.75*10 + 0.25*40; // 17.5"
  },
  {
    question: "If a 2x2 game has entries in ₹ Thousands: A = [[35, 15], [20, 45]], what is the expected payoff in full Rupees?",
    shortAnswer: "Delta = 45. p* = [25/45, 20/45] = [5/9, 4/9]. det(A) = 1575 - 300 = 1275. v* = 1275/45 = 85/3 ≈ ₹28.333k = ₹28,333.33.",
    explanation: "Calculates game value in full Indian Rupees.",
    hint: "v* = ₹28,333.33.",
    level: "moderate",
    codeExample: "v_star = (1275 / 45) * 1000; // 28333.33"
  },
  {
    question: "Can any 2x2 game with non-negative entries have a negative Game Value v*?",
    shortAnswer: "NO! If all entries a_ij >= 0, the Game Value v* must be >= 0 (since v* is a convex combination of non-negative entries).",
    explanation: "Non-negativity preservation in matrix games.",
    hint: "No, non-negative matrices always yield non-negative game values.",
    level: "moderate",
    codeExample: "assert(matrix.every(r => r.every(x => x >= 0)) => v_star >= 0);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating numerical game exercise solutions in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of Game = ₹24,000'"
  },
  {
    question: "What is the ultimate golden rule of Numerical Exercises for 2x2 Mixed Strategy Games?",
    shortAnswer: "'Check saddle point first; compute Delta, p*, q*, and v*; verify that expected payoffs against pure moves equal v*; and state all financial results in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all steps in solving 2x2 numerical game theory problems.",
    hint: "Check saddle → Compute Delta & p*, q* → Verify indifference → Report in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: CheckSaddle() → Solve2x2Formulas() → VerifyIndifference() → ReportInRupees(₹)."
  }
];

export default questions;
