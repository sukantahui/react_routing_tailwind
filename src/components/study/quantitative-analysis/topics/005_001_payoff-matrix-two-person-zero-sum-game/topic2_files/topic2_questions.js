// topic2_questions.js
// 30 Moderate to Expert Questions on the Payoff Concept in Game Theory

const questions = [
  {
    question: "What is the formal definition of 'Payoff' in Game Theory?",
    shortAnswer: "The quantitative numerical reward, utility, or net financial gain/loss (measured in Indian Rupees ₹) that a player receives at the outcome of a game, resulting from the joint strategy combination chosen by all players.",
    explanation: "Payoff measures the ultimate satisfaction or profit of a strategic outcome.",
    hint: "Numerical reward or utility in ₹ received from a joint strategy choice.",
    level: "moderate",
    codeExample: "Payoff = utilityFunction(playerA_strategy, playerB_strategy);"
  },
  {
    question: "What is Von Neumann-Morgenstern (VNM) Utility Theory?",
    shortAnswer: "A foundational mathematical framework showing that rational decision-makers under uncertainty act to maximize the mathematical expectation of a real-valued utility function.",
    explanation: "Provides the axiomatic foundation for expected payoff calculations in Game Theory.",
    hint: "Axiomatic theory proving rational players maximize expected utility under uncertainty.",
    level: "expert",
    codeExample: "ExpectedUtility = sum(probability_i * utility_i);"
  },
  {
    question: "In a Two-Person Zero-Sum Game, what is the exact mathematical relationship between Player A's payoff (u_A) and Player B's payoff (u_B)?",
    shortAnswer: "u_A(A_i, B_j) + u_B(A_i, B_j) = 0, which implies u_B(A_i, B_j) = -u_A(A_i, B_j) = -a_ij for every strategy pair (A_i, B_j).",
    explanation: "Zero-sum strictly enforces that one player's gain equals the opponent's exact loss.",
    hint: "u_A + u_B = 0 => u_B = -u_A.",
    level: "moderate",
    codeExample: "u_B = -u_A; // Zero-sum conservation"
  },
  {
    question: "How is the Expected Payoff E(p, q) calculated when Player A plays mixed strategy p and Player B plays mixed strategy q?",
    shortAnswer: "E(p, q) = sum_{i=1}^m sum_{j=1}^n p_i * q_j * a_ij = p^T * A * q, where A is the m x n payoff matrix in ₹.",
    explanation: "Double summation weighting each cell by the joint probability p_i * q_j.",
    hint: "E(p, q) = sum(p_i * q_j * a_ij) = p^T * A * q.",
    level: "expert",
    codeExample: "ExpectedPayoff = p.reduce((acc, pi, i) => acc + q.reduce((inner, qj, j) => inner + pi * qj * A[i][j], 0), 0);"
  },
  {
    question: "What does a positive payoff entry (+a_ij) signify in a standard zero-sum payoff matrix?",
    shortAnswer: "It signifies a net GAIN of ₹a_ij to Player A (Row Player) and an identical net LOSS / PAYOUT of ₹a_ij by Player B (Column Player).",
    explanation: "By convention, matrix values represent returns to the row player.",
    hint: "Gain to Player A and payout from Player B.",
    level: "moderate",
    codeExample: "if (a_ij > 0) { playerA_gains(a_ij); playerB_loses(a_ij); }"
  },
  {
    question: "What does a negative payoff entry (-a_ij) signify in a standard zero-sum payoff matrix?",
    shortAnswer: "It signifies a net LOSS of ₹|a_ij| to Player A (Row Player) and an identical net GAIN of ₹|a_ij| to Player B (Column Player).",
    explanation: "Row player pays the column player.",
    hint: "Loss to Player A and gain to Player B.",
    level: "moderate",
    codeExample: "if (a_ij < 0) { playerA_loses(Math.abs(a_ij)); playerB_gains(Math.abs(a_ij)); }"
  },
  {
    question: "What does a payoff entry of ZERO (a_ij = 0) indicate?",
    shortAnswer: "A breakeven outcome where neither player gains nor loses any monetary or utility payoff (a draw).",
    explanation: "Zero gain and zero loss for both players.",
    hint: "Breakeven / draw outcome.",
    level: "moderate",
    codeExample: "a_ij === 0; // Breakeven"
  },
  {
    question: "Can payoffs represent non-monetary metrics like market share percentage or delivery reliability?",
    shortAnswer: "YES! Payoffs can represent any quantitative metric (e.g. % market share, voter share, defect rates), as long as total sum is conserved in zero-sum formulations.",
    explanation: "Payoffs quantify generalized utility, not just currency.",
    hint: "Yes, market share, votes, or reliability can be payoff metrics.",
    level: "intermediate",
    codeExample: "PayoffMetric = 'MarketSharePercentage';"
  },
  {
    question: "Suppose in a 2x2 game: A = [[40000, -10000], [20000, 30000]]. Player A plays p = (0.5, 0.5) and Player B plays q = (0.5, 0.5). What is the expected payoff to Player A?",
    shortAnswer: "E = 0.25(40000) + 0.25(-10000) + 0.25(20000) + 0.25(30000) = 10000 - 2500 + 5000 + 7500 = ₹20,000.",
    explanation: "E = 0.25 * (40000 - 10000 + 20000 + 30000) = 0.25 * 80000 = ₹20,000.",
    hint: "₹20,000.",
    level: "moderate",
    codeExample: "E = 0.25 * (40000 - 10000 + 20000 + 30000) = 20000;"
  },
  {
    question: "Why is the Payoff Matrix called 'Normal Form' (or Strategic Form)?",
    shortAnswer: "Because it summarizes the full strategic structure of the game into a compact, normalized rectangular array of row strategies, column strategies, and scalar payoff entries.",
    explanation: "Provides the standard algebraic matrix representation of simultaneous games.",
    hint: "Compact rectangular array mapping strategy pairs to scalar payoffs.",
    level: "moderate",
    codeExample: "NormalFormMatrix = { rows: 'A_strategies', cols: 'B_strategies', values: 'Payoffs' };"
  },
  {
    question: "Suppose Debangshu in Barrackpore is evaluating a contract negotiation where legal expenses reduce the total pool from ₹1,00,000 to ₹80,000. Is this still a zero-sum game?",
    shortAnswer: "NO! The ₹20,000 loss in total value to third-party lawyers makes the net sum of player payoffs strictly negative (-₹20,000), making it a non-zero-sum game (Constant-Sum / Negative-Sum).",
    explanation: "Third-party leakage breaks pure zero-sum conservation between the two players.",
    hint: "No, third-party legal costs turn it into a non-zero-sum game.",
    level: "expert",
    codeExample: "isNonZeroSum: TotalPlayerPayoff === -20000;"
  },
  {
    question: "What is an 'Ordinally Equivalent' Payoff Transformation in Game Theory?",
    shortAnswer: "A positive linear transformation of the form u'(s) = a * u(s) + b (where a > 0) that preserves the identical strategic ordering, optimal strategies, and saddle points.",
    explanation: "Linear scaling does not alter strategic choices.",
    hint: "Linear scaling u' = a*u + b (a > 0) preserving strategy rankings.",
    level: "expert",
    codeExample: "LinearTransform: u_prime = a * u + b; // a > 0"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating commercial payoffs, profit margins, and dispute values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Strategic Payoff = ₹50,000'"
  },
  {
    question: "What is the ultimate golden rule of the Payoff Concept in Game Theory?",
    shortAnswer: "'Payoffs quantify the net reward of joint strategic choices in Indian Rupees (₹); zero-sum games conserve total wealth (u_A + u_B = 0); expected payoffs for mixed strategies equal p^T A q; always evaluate outcomes from the perspectives of both players!'",
    explanation: "This complete rule captures all core payoff principles.",
    hint: "Payoffs quantify joint choices -> Zero-sum u_A + u_B = 0 -> Expected payoff p^T A q in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: QuantifyPayoffs(₹) -> EnforceZeroSum() -> ComputeExpectedValue(p^T * A * q)."
  }
];

export default questions;
