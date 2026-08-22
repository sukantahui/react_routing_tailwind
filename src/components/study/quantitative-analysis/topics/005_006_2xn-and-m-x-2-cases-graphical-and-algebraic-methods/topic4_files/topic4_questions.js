// topic4_questions.js
// 30 Moderate to Expert Questions on Finding the Optimal Mixed Strategy Graphically

const questions = [
  {
    question: "What is the sequence of steps to find the optimal mixed strategies (p*, q*) in a 2xn game graphically?",
    shortAnswer: "1. Parameterize p1; 2. Plot n linear functions; 3. Trace Lower Envelope; 4. Identify Maximin Peak and the 2 intersecting columns {Bj, Bk}; 5. Solve 2x2 submatrix for p1*, qj*, qk* and v*; 6. Reconstruct full n-dimensional vector q* with 0.0 for inactive columns.",
    explanation: "Complete 6-step graphical solution sequence for 2xn games.",
    hint: "Plot -> Lower envelope -> Maximin peak -> Extract 2x2 -> Solve (p*, q*, v*).",
    level: "moderate",
    codeExample: "solve2xn: plotLines() -> findLowerEnvelope() -> extractActiveCols() -> solve2x2() -> reconstructVectors();"
  },
  {
    question: "What is the sequence of steps to find the optimal mixed strategies (p*, q*) in an mx2 game graphically?",
    shortAnswer: "1. Parameterize q1; 2. Plot m linear functions; 3. Trace Upper Envelope; 4. Identify Minimax Trough and the 2 intersecting rows {Ai, Ar}; 5. Solve 2x2 submatrix for q1*, pi*, pr* and v*; 6. Reconstruct full m-dimensional vector p* with 0.0 for inactive rows.",
    explanation: "Complete 6-step graphical solution sequence for mx2 games.",
    hint: "Plot -> Upper envelope -> Minimax trough -> Extract 2x2 -> Solve (p*, q*, v*).",
    level: "moderate",
    codeExample: "solve_mx2: plotLines() -> findUpperEnvelope() -> extractActiveRows() -> solve2x2() -> reconstructVectors();"
  },
  {
    question: "Why must inactive columns in a 2xn game receive probability 0.0 in Player B's optimal strategy vector q*?",
    shortAnswer: "Because those columns lie strictly above the lower envelope at p1*, meaning that if Player B played them, Player A would receive a higher expected payoff than the equilibrium Game Value v*.",
    explanation: "Rationality condition for assigning zero probability to non-support columns.",
    hint: "Inactive columns give higher payouts to Player A than v*.",
    level: "expert",
    codeExample: "q_star[inactiveCol] = 0.0;"
  },
  {
    question: "In a 2x4 game, if the lower envelope peak is formed by Column 1 and Column 2 with q1* = 0.60 and q2* = 0.40, what is the full 4D strategy vector q*?",
    shortAnswer: "q* = [0.60, 0.40, 0.00, 0.00]^T.",
    explanation: "Reconstructing the full 4D column vector.",
    hint: "q* = [0.60, 0.40, 0.00, 0.00]^T.",
    level: "moderate",
    codeExample: "q_star = [0.60, 0.40, 0.00, 0.00];"
  },
  {
    question: "In a 4x2 game, if the upper envelope trough is formed by Row 1 and Row 3 with p1* = 0.70 and p3* = 0.30, what is the full 4D strategy vector p*?",
    shortAnswer: "p* = [0.70, 0.00, 0.30, 0.00]^T.",
    explanation: "Reconstructing the full 4D row vector.",
    hint: "p* = [0.70, 0.00, 0.30, 0.00]^T.",
    level: "moderate",
    codeExample: "p_star = [0.70, 0.00, 0.30, 0.00];"
  },
  {
    question: "How do you verify the Global Optimality of p* against all original n columns in a 2xn game?",
    shortAnswer: "Compute E(p*, Bj) for every column j in {1, ..., n}. E(p*, Bj) must equal v* on active columns, and must be strictly GREATER than or equal to v* on all inactive columns.",
    explanation: "Global audit verification for the row player.",
    hint: "E(p*, Bj) = v* on active cols; E(p*, Bj) >= v* on inactive cols.",
    level: "expert",
    codeExample: "assert(cols.every(j => E(p_star, j) >= v_star - 1e-5));"
  },
  {
    question: "How do you verify the Global Optimality of q* against all original m rows in an mx2 game?",
    shortAnswer: "Compute E(Ai, q*) for every row i in {1, ..., m}. E(Ai, q*) must equal v* on active rows, and must be strictly LESS than or equal to v* on all inactive rows.",
    explanation: "Global audit verification for the column player.",
    hint: "E(Ai, q*) = v* on active rows; E(Ai, q*) <= v* on inactive rows.",
    level: "expert",
    codeExample: "assert(rows.every(i => E(i, q_star) <= v_star + 1e-5));"
  },
  {
    question: "Suppose Debangshu in Barrackpore finds that a 2x3 game has a peak at p1 = 0.50 with intersecting columns B1 [20, 40] and B2 [50, 10] (in ₹ Thousands). What are q1*, q2*, and v*?",
    shortAnswer: "Using 2x2 formulas: Δ = -60. q1* = (10 - 50)/-60 = 40/60 = 2/3 (≈ 0.667), q2* = (20 - 40)/-60 = 20/60 = 1/3 (≈ 0.333). v* = +₹30k (₹30,000).",
    explanation: "Closed-form 2x2 solution for the extracted active columns.",
    hint: "q1* = 2/3, q2* = 1/3, v* = ₹30,000.",
    level: "moderate",
    codeExample: "q1 = 2/3; q2 = 1/3; v_star = 30000;"
  },
  {
    question: "What happens if a candidate intersection point lies ABOVE the lower envelope in a 2xn game?",
    shortAnswer: "It is an unachievable intersection: Player B would never allow Player A to reach that point, because Player B can choose another column with a lower payoff.",
    explanation: "Envelope boundary dominance.",
    hint: "Unachievable because Player B minimizes payoff to the lower envelope floor.",
    level: "expert",
    codeExample: "isCandidateValid = (intersectVal <= lowerEnvelope(p1_intersect) + 1e-5);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating graphically solved game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Optimal Game Value v* = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of Finding the Optimal Mixed Strategy Graphically?",
    shortAnswer: "'Trace the active boundary envelope; pinpoint the optimal apex (Maximin peak or Minimax trough); extract the 2 active lines; solve the 2x2 submatrix for exact probabilities; reconstruct full strategy vectors; and audit all payoffs in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all graphical strategy optimization mechanics.",
    hint: "Trace envelope -> Apex -> Extract 2x2 -> Solve -> Reconstruct full vectors in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: TraceEnvelope() -> FindApex() -> Extract2x2() -> ReconstructFullVectors(₹)."
  }
];

export default questions;
