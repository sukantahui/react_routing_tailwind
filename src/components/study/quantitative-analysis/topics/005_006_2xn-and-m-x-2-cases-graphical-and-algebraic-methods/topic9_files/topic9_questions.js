// topic9_questions.js
// 30 Comprehensive Master Review & Viva Voce Questions for Module 005_006 2xn & mx2 Methods

const questions = [
  {
    question: "What is the fundamental geometric reason why 2xn and mx2 games can be solved on 2D paper or screens without Linear Programming?",
    shortAnswer: "Because having exactly 2 strategies reduces a player's probability distribution to a single independent variable (p1 in [0, 1]), creating a 1-dimensional simplex where all expected payoff functions are 2D straight lines.",
    explanation: "1D simplex dimensionality foundation.",
    hint: "2 strategies = 1D line segment [0, 1], allowing 2D straight-line plotting.",
    level: "moderate",
    codeExample: "simplexDim = 2 - 1 = 1D line;"
  },
  {
    question: "Why do 2xn games use the LOWER Envelope while mx2 games use the UPPER Envelope?",
    shortAnswer: "In 2xn games, Player B minimizes Player A's payoff (lower floor), so Player A maximizes on this boundary (Maximin peak). In mx2 games, Player A maximizes Player B's loss (upper ceiling), so Player B minimizes on this boundary (Minimax trough).",
    explanation: "Opposing player objective rationale.",
    hint: "2xn: Player B minimizes (Lower Envelope); mx2: Player A maximizes (Upper Envelope).",
    level: "expert",
    codeExample: "2xn ➔ min_j E(p, Bj); mx2 ➔ max_i E(Ai, q);"
  },
  {
    question: "What are the endpoint coordinates for strategy line Column Bj in a 2xn game?",
    shortAnswer: "Left axis (p1 = 0): (0, a2j). Right axis (p1 = 1): (1, a1j).",
    explanation: "Endpoint layout on dual vertical axes.",
    hint: "Left: a2j (Row 2); Right: a1j (Row 1).",
    level: "moderate",
    codeExample: "left = [0, a2j]; right = [1, a1j];"
  },
  {
    question: "What are the endpoint coordinates for strategy line Row Ai in an mx2 game?",
    shortAnswer: "Left axis (q1 = 0): (0, ai2). Right axis (q1 = 1): (1, ai1).",
    explanation: "Endpoint layout on dual vertical axes.",
    hint: "Left: ai2 (Col 2); Right: ai1 (Col 1).",
    level: "moderate",
    codeExample: "left = [0, ai2]; right = [1, ai1];"
  },
  {
    question: "What is the closed-form algebraic formula for the intersection probability p1 of two strategy lines Bj and Bk?",
    shortAnswer: "p1 = (a2k - a2j) / ((a1j - a2j) - (a1k - a2k)) = (a2k - a2j) / (m_j - m_k).",
    explanation: "Equating linear payoff functions.",
    hint: "p1 = (a2k - a2j) / (m_j - m_k).",
    level: "moderate",
    codeExample: "p1 = (a2k - a2j) / ((a1j - a2j) - (a1k - a2k));"
  },
  {
    question: "How do you reconstruct the full probability vector q* in a 2xn game after finding the active columns {Bj, Bk}?",
    shortAnswer: "Set the probabilities of active columns Bj and Bk to the solved 2x2 submatrix values qj* and qk*, and assign exactly 0.0 to all inactive columns.",
    explanation: "Vector reconstruction standard.",
    hint: "Assign 2x2 probabilities to active columns; 0.0 to inactive columns.",
    level: "moderate",
    codeExample: "q_star = [0, ..., q_j, ..., q_k, ..., 0];"
  },
  {
    question: "What is the combinatorial formula for the number of candidate 2x2 submatrices in an mx2 game?",
    shortAnswer: "C(m, 2) = m(m - 1) / 2 candidate submatrices.",
    explanation: "Combinatorial pair selection formula.",
    hint: "C(m, 2) = m(m-1)/2.",
    level: "moderate",
    codeExample: "numPairs = (m * (m - 1)) / 2;"
  },
  {
    question: "What is the Indifference Principle used to solve 2x2 submatrix probability equations?",
    shortAnswer: "Each player randomizes so that the opponent receives strictly EQUAL expected payoffs across all their active strategy choices.",
    explanation: "Equal payoff condition of mixed strategy equilibria.",
    hint: "Player randomizes to make opponent indifferent between active moves.",
    level: "expert",
    codeExample: "E(p, B1) === E(p, B2) === v_star;"
  },
  {
    question: "What is the Shift-Invariance Theorem for the Value of the Game v*?",
    shortAnswer: "Adding a constant C to every cell of matrix A increases the Game Value to v* + C in Indian Rupees (₹), while optimal strategy vectors p* and q* remain 100% UNCHANGED.",
    explanation: "Shift-invariance property.",
    hint: "v* increases by C; p* and q* remain identical.",
    level: "expert",
    codeExample: "v_new = v_old + C; assert(strategiesUnchanged);"
  },
  {
    question: "How do you audit Global Optimality on the original unreduced matrix in a 2xn game?",
    shortAnswer: "Verify that E(p*, Bj) >= v* for ALL original columns j in {1, ..., n}.",
    explanation: "Global minimax audit check.",
    hint: "E(p*, Bj) >= v* for all columns.",
    level: "moderate",
    codeExample: "assert(cols.every(j => E(p_star, j) >= v_star - 1e-5));"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating game values, payoffs, and budgets in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Equilibrium Game Value = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of Module 005_006 and Segment 5 Game Theory?",
    shortAnswer: "'Plot 1D probability lines; trace the Lower Envelope (Maximin) or Upper Envelope (Minimax); extract the active 2x2 submatrix; solve exact indifference equations; reconstruct full probability vectors; verify global optimality; and report all corporate budgets in Indian Rupees (₹)!'",
    explanation: "This master synthesis captures all 2xn and mx2 graphical and algebraic mechanics.",
    hint: "Plot lines → Trace envelope → Extract 2x2 → Solve equations → Reconstruct vectors in ₹.",
    level: "moderate",
    codeExample: "MasterGoldenRule: Plot1D() → TraceEnvelope() → Extract2x2() → SolveEquations() → AuditInRupees(₹)."
  }
];

export default questions;
