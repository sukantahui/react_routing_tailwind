// topic3_questions.js
// 30 Moderate to Expert Questions on Reduction to 2x2 Games

const questions = [
  {
    question: "What is the primary objective of reducing an m x n matrix to a 2x2 submatrix?",
    shortAnswer: "To isolate the 2 active strategies for each player, enabling instant analytical closed-form calculation of optimal probabilities and Game Value v* without setting up heavy Linear Programming models.",
    explanation: "Standard motivation for 2x2 reduction.",
    hint: "Enables instant closed-form 2x2 formulas.",
    level: "moderate",
    codeExample: "target: reduce(m_x_n) -> solve2x2ClosedForm();"
  },
  {
    question: "Once an m x n game is reduced to a 2x2 submatrix A_sub, what is the formula for the Game Value v*?",
    shortAnswer: "v* = det(A_sub) / Delta_sub = (a_11*a_22 - a_12*a_21) / [ (a_11 + a_22) - (a_12 + a_21) ] in Indian Rupees (₹).",
    explanation: "Closed-form formula applied directly to the extracted 2x2 submatrix.",
    hint: "v* = det(A_sub) / Delta_sub.",
    level: "moderate",
    codeExample: "v_star = (a11*a22 - a12*a21) / ((a11 + a22) - (a12 + a21));"
  },
  {
    question: "How do you verify that the reconstructed strategy vector p* is optimal against ALL columns of the original unreduced m x n matrix?",
    shortAnswer: "Compute Player A's expected payoff against every column j in the original matrix: E(p*, Bj) must be >= v* for all columns, with exact equality for active columns in the 2x2 submatrix.",
    explanation: "Global optimality audit check against the original matrix.",
    hint: "E(p*, Bj) >= v* for all original columns.",
    level: "expert",
    codeExample: "assert(cols.every(j => calcExpectedPayoff(p_star, j) >= v_star - 1e-5));"
  },
  {
    question: "How do you verify that the reconstructed strategy vector q* is optimal against ALL rows of the original unreduced m x n matrix?",
    shortAnswer: "Compute Player B's expected payout against every row i in the original matrix: E(Ai, q*) must be <= v* for all rows, with exact equality for active rows in the 2x2 submatrix.",
    explanation: "Global optimality audit check for Player B.",
    hint: "E(Ai, q*) <= v* for all original rows.",
    level: "expert",
    codeExample: "assert(rows.every(i => calcExpectedPayout(i, q_star) <= v_star + 1e-5));"
  },
  {
    question: "Suppose a 4x3 matrix is reduced to Rows {1, 3} and Cols {1, 2}. If the 2x2 submatrix is [[30, 10], [10, 40]] (in ₹ Thousands), what is Delta_sub?",
    shortAnswer: "Delta_sub = (30 + 40) - (10 + 10) = 70 - 20 = 50.",
    explanation: "Main diagonal sum minus off-diagonal sum.",
    hint: "Delta = (30+40) - (10+10) = 50.",
    level: "moderate",
    codeExample: "Delta = (30 + 40) - (10 + 10); // 50"
  },
  {
    question: "For the submatrix [[30, 10], [10, 40]], what are the sub-probabilities p_sub* for Player A?",
    shortAnswer: "p_1_sub = (40 - 10)/50 = 30/50 = 0.60, p_2_sub = (30 - 10)/50 = 20/50 = 0.40.",
    explanation: "2x2 closed-form probability formulas.",
    hint: "p_sub* = [0.60, 0.40].",
    level: "moderate",
    codeExample: "p_sub = [30 / 50, 20 / 50];"
  },
  {
    question: "For the 4x3 matrix with active Rows {1, 3} and Cols {1, 2}, what are the full reconstructed strategy vectors p* and q*?",
    shortAnswer: "p* = [0.60, 0.00, 0.40, 0.00]^T (4D) and q* = [0.60, 0.40, 0.00]^T (3D).",
    explanation: "Assign 0.0 to pruned rows 2 and 4, and pruned col 3.",
    hint: "p* = [0.6, 0, 0.4, 0], q* = [0.6, 0.4, 0].",
    level: "moderate",
    codeExample: "p_star = [0.6, 0, 0.4, 0]; q_star = [0.6, 0.4, 0];"
  },
  {
    question: "For the submatrix [[30, 10], [10, 40]], what is the Value of the Game v* in ₹?",
    shortAnswer: "det(A_sub) = 1200 - 100 = 1100. v* = 1100 / 50 = +₹22k (₹22,000).",
    explanation: "Determinant divided by Delta.",
    hint: "v* = 1100 / 50 = ₹22,000.",
    level: "moderate",
    codeExample: "v_star = (1200 - 100) / 50; // 22"
  },
  {
    question: "Suppose Debangshu in Barrackpore finds that an eliminated column gives an expected payoff of ₹18,000 when v* = ₹22,000. Is this valid?",
    shortAnswer: "NO! If an eliminated column yields E(p*, Bj) = ₹18,000 < ₹22,000, Player B would prefer playing column j, violating minimax optimality. (Check for reduction errors!).",
    explanation: "Auditing reduction correctness via global expected payoffs.",
    hint: "Invalid! E(p*, Bj) must be >= v* for all columns.",
    level: "expert",
    codeExample: "if (expPayoff < v_star - 1e-5) throw new Error('Invalid reduction!');"
  },
  {
    question: "What happens if an m x n game reduces to 2x3 instead of 2x2?",
    shortAnswer: "Use the Graphical Method (Topic 4) to solve the 2x3 game by plotting 3 lines on a probability axis and finding the lower envelope.",
    explanation: "2xn games are solved graphically.",
    hint: "Solve via the 2xn Graphical Method.",
    level: "moderate",
    codeExample: "if (reducedSize === '2x3') solveGraphical2xn();"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating reduced game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of Reduced 2x2 Game = ₹22,000'"
  },
  {
    question: "What is the ultimate golden rule of Reduction to 2x2 Games?",
    shortAnswer: "'Prune the m x n matrix to an active 2x2 submatrix; apply closed-form formulas for Delta, p_sub*, q_sub*, and v*; reconstruct full-dimensional vectors; and verify global optimality across all original rows and columns in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all reduction to 2x2 game mechanics.",
    hint: "Prune to 2x2 -> Solve closed form -> Reconstruct full vectors -> Verify in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: PruneTo2x2() -> SolveSubgame() -> ReconstructFullVectors() -> GlobalVerification(₹)."
  }
];

export default questions;
