// topic2_questions.js
// 30 Moderate to Expert Questions on Expected Payoff in Game Theory

const questions = [
  {
    question: "What is the general matrix algebraic definition of Expected Payoff E(p, q) in Game Theory?",
    shortAnswer: "E(p, q) = p^T * A * q = sum_{i=1}^m sum_{j=1}^n p_i * a_{ij} * q_j.",
    explanation: "Standard bilinear form representing the expected return under mixed strategy profiles.",
    hint: "E(p, q) = p^T A q.",
    level: "moderate",
    codeExample: "E = p.reduce((acc, pi, i) => acc + pi * q.reduce((rowSum, qj, j) => rowSum + qj * A[i][j], 0), 0);"
  },
  {
    question: "What is the expanded expected payoff formula for a 2x2 matrix with strategies p = (p1, p2) and q = (q1, q2)?",
    shortAnswer: "E(p, q) = p1*q1*a11 + p1*q2*a12 + p2*q1*a21 + p2*q2*a22.",
    explanation: "Weighted sum of all four payoff entries multiplied by joint probabilities.",
    hint: "p1*q1*a11 + p1*q2*a12 + p2*q1*a21 + p2*q2*a22.",
    level: "moderate",
    codeExample: "E = p1*q1*a11 + p1*q2*a12 + p2*q1*a21 + p2*q2*a22;"
  },
  {
    question: "What is the Expected Payoff to Player A when Player A plays mixed strategy p and Player B plays pure Column 1 (q = (1, 0)^T)?",
    shortAnswer: "E(p, B1) = p1 * a11 + p2 * a21.",
    explanation: "Column 1 weighted by Player A's strategy probabilities.",
    hint: "E(p, B1) = p1*a11 + p2*a21.",
    level: "moderate",
    codeExample: "E_vs_B1 = p1 * a11 + (1 - p1) * a21;"
  },
  {
    question: "What is the Expected Payout from Player B when Player B plays mixed strategy q and Player A plays pure Row 1 (p = (1, 0)^T)?",
    shortAnswer: "E(A1, q) = q1 * a11 + q2 * a12.",
    explanation: "Row 1 weighted by Player B's strategy probabilities.",
    hint: "E(A1, q) = q1*a11 + q2*a12.",
    level: "moderate",
    codeExample: "E_vs_A1 = q1 * a11 + (1 - q1) * a12;"
  },
  {
    question: "Suppose A = [[30, 10], [10, 40]], p = (0.5, 0.5), and q = (0.5, 0.5). What is the Expected Payoff E(p, q) in ₹?",
    shortAnswer: "E = 0.25(30) + 0.25(10) + 0.25(10) + 0.25(40) = 7.5 + 2.5 + 2.5 + 10 = ₹22.5k (₹22,500).",
    explanation: "Sum of products with 0.25 probability each.",
    hint: "0.25(30 + 10 + 10 + 40) = ₹22,500.",
    level: "moderate",
    codeExample: "E = 0.25 * (30 + 10 + 10 + 40); // 22.5"
  },
  {
    question: "Why is the function E(p, q) described as 'Bilinear'?",
    shortAnswer: "Because it is strictly linear with respect to p when q is fixed, and strictly linear with respect to q when p is fixed.",
    explanation: "Linear in both arguments separately.",
    hint: "Linear in p for fixed q, and linear in q for fixed p.",
    level: "intermediate",
    codeExample: "Bilinear: E(alpha*p1 + beta*p2, q) = alpha*E(p1,q) + beta*E(p2,q);"
  },
  {
    question: "What does the Principle of Equalization (Indifference Principle) state about expected payoffs at equilibrium?",
    shortAnswer: "At optimal equilibrium p*, Player A's expected payoffs against all pure opponent strategies in the support of q* are EXACTLY EQUAL to the Game Value v* (i.e. E(p*, B1) = E(p*, B2) = v*).",
    explanation: "Fundamental indifference property of mixed Nash equilibrium.",
    hint: "E(p*, B1) = E(p*, B2) = v*.",
    level: "expert",
    codeExample: "Indifference: E(p_star, B1) === E(p_star, B2) === v_star;"
  },
  {
    question: "Suppose Debangshu in Barrackpore is evaluating A = [[40, 20], [20, 40]] and plays p = [0.5, 0.5]. What are the expected payoffs against B1 and B2?",
    shortAnswer: "Against B1: 0.5(40) + 0.5(20) = ₹30k. Against B2: 0.5(20) + 0.5(40) = ₹30k. Both are equal to ₹30,000!",
    explanation: "Demonstrates the equalization principle.",
    hint: "Both equal ₹30,000.",
    level: "moderate",
    codeExample: "E_B1 = 0.5*40 + 0.5*20 = 30; E_B2 = 0.5*20 + 0.5*40 = 30;"
  },
  {
    question: "Can the Expected Payoff E(p, q) ever be outside the range [min(a_ij), max(a_ij)] of the matrix?",
    shortAnswer: "NO! By the convex combination property, min(a_ij) <= E(p, q) <= max(a_ij) for all valid probability vectors p and q.",
    explanation: "Expected value is bounded by the extreme values of the random variable.",
    hint: "No, E(p, q) is strictly bounded between the minimum and maximum cell values.",
    level: "moderate",
    codeExample: "assert(min(A) <= E && E <= max(A));"
  },
  {
    question: "If all payoff entries in matrix A are increased by a constant c in Indian Rupees (₹), what happens to E(p, q)?",
    shortAnswer: "E'(p, q) = E(p, q) + c. The expected payoff increases by exactly c.",
    explanation: "Shift-invariance property of expected value.",
    hint: "Expected payoff increases by c.",
    level: "moderate",
    codeExample: "E_shifted = E_original + c;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating expected payoffs and game valuations in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Expected Payoff = ₹25,000'"
  },
  {
    question: "What is the ultimate golden rule of Expected Payoff in Game Theory?",
    shortAnswer: "'Expected Payoff E(p, q) = p^T A q calculates the long-run average return under mixed strategies; at equilibrium, it equalizes expected payoffs across all opponent moves to secure the Value of the Game in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all expected payoff mechanics.",
    hint: "E(p, q) = p^T A q -> Equalizes payoffs at equilibrium -> Secures v* in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: E(p, q) = p^T * A * q -> EqualizeAtEquilibrium() -> SecureValue(₹)."
  }
];

export default questions;
