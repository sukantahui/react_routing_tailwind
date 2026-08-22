// topic7_questions.js
// 30 Comprehensive Master Review & Viva Voce Questions for Module 005_001 Payoff Matrix & Two-Person Zero-Sum Game

const questions = [
  {
    question: "What is Game Theory and how does it fundamentally differ from single-agent optimization (like Linear Programming)?",
    shortAnswer: "Game Theory models interdependent strategic decisions where each player's payoff depends on the active choices made by rational competitors, whereas Linear Programming optimizes a single decision-maker's objective against passive environmental constraints.",
    explanation: "Game theory introduces strategic competition and opponent counter-optimization.",
    hint: "Models strategic interdependence between multiple rational players.",
    level: "moderate",
    codeExample: "GameTheory: MultipleRationalAgents vs SingleAgentOptimization."
  },
  {
    question: "What are the 5 foundational structural elements that specify any strategic game?",
    shortAnswer: "1. Players (N = {1, ..., n}); 2. Strategy Sets ({S_i}); 3. Information Structure; 4. Payoff Functions ({u_i} in ₹); 5. Rationality Axiom (players maximize expected utility).",
    explanation: "Standard strategic normal form specification.",
    hint: "Players, Strategies, Information, Payoffs in ₹, and Rationality.",
    level: "moderate",
    codeExample: "G = (N, {S_i}, {u_i});"
  },
  {
    question: "What is a Two-Person Zero-Sum Game (TPZSG) and what is its core mathematical axiom?",
    shortAnswer: "A game involving exactly two players where total payoffs sum to zero across all outcomes: u_A(s_A, s_B) + u_B(s_A, s_B) = 0, implying u_B = -u_A.",
    explanation: "Pure conflict model where one player's gain equals the opponent's exact loss.",
    hint: "Two players where u_A + u_B = 0 strictly.",
    level: "moderate",
    codeExample: "TPZSG: u_A + u_B === 0;"
  },
  {
    question: "What are the roles of Player A (Row Player) and Player B (Column Player) in a standard payoff matrix?",
    shortAnswer: "Player A is the MAXIMIZER (seeks to maximize the minimum gain via Maximin); Player B is the MINIMIZER (seeks to minimize the maximum payout via Minimax).",
    explanation: "Row player chooses rows to maximize; column player chooses columns to minimize payout.",
    hint: "Row = Maximizer (Maximin); Col = Minimizer (Minimax).",
    level: "moderate",
    codeExample: "PlayerRoles: { Row: 'Maximizer', Col: 'Minimizer' };"
  },
  {
    question: "What is the difference between a Pure Strategy and a Mixed Strategy?",
    shortAnswer: "A Pure Strategy is a 100% deterministic choice of a single action (p = 1.0); a Mixed Strategy is a probability distribution over multiple pure actions (p = (p_1, ..., p_m) with sum(p_i) = 1, p_i >= 0).",
    explanation: "Mixed strategies eliminate predictability in games without a pure saddle point.",
    hint: "Pure = deterministic (p=1); Mixed = probabilistic distribution (sum p_i = 1).",
    level: "moderate",
    codeExample: "Pure: p = [1, 0]; Mixed: p = [0.6, 0.4];"
  },
  {
    question: "What is John von Neumann's celebrated Minimax Theorem (1928 / 1944)?",
    shortAnswer: "Every finite two-person zero-sum game has a unique equilibrium game value v* and optimal mixed strategy vectors p* and q* such that: max_p min_q (p^T A q) = min_q max_p (p^T A q) = v*.",
    explanation: "Proves that every finite matrix game possesses an optimal solution in mixed strategies.",
    hint: "max_p min_q p^T A q = min_q max_p p^T A q = v*.",
    level: "expert",
    codeExample: "MinimaxTheorem: max min = min max = v*;"
  },
  {
    question: "What is the universal invariant inequality between Maximin and Minimax for any payoff matrix?",
    shortAnswer: "Maximin <= Minimax (max_i min_j a_ij <= min_j max_i a_ij), or v_lower <= v_upper.",
    explanation: "The guaranteed floor for Player A can never exceed the guaranteed ceiling for Player B.",
    hint: "Maximin <= Minimax (v_lower <= v_upper).",
    level: "moderate",
    codeExample: "Invariant: maximin <= minimax;"
  },
  {
    question: "What is a 'Saddle Point' and what conditions define it?",
    shortAnswer: "A saddle point occurs when Maximin = Minimax = v*. The corresponding cell a_i*j* is simultaneously the minimum in its row and the maximum in its column.",
    explanation: "Represents a stable Nash equilibrium in pure strategies.",
    hint: "Maximin = Minimax; cell is min in row and max in column.",
    level: "moderate",
    codeExample: "isSaddlePoint: (r, c) => matrix[r][c] === rowMin[r] && matrix[r][c] === colMax[c];"
  },
  {
    question: "What is a 'Strictly Determined Game' vs a 'Non-Strictly Determined Game'?",
    shortAnswer: "Strictly Determined: Has a pure strategy saddle point (Maximin = Minimax = v*). Non-Strictly Determined: Maximin < Minimax (no pure saddle point; solved via mixed strategies).",
    explanation: "Classification based on the existence of pure vs mixed strategy equilibria.",
    hint: "Strictly = pure saddle point exists; Non-strictly = mixed strategy solution required.",
    level: "moderate",
    codeExample: "GameType: maximin === minimax ? 'StrictlyDetermined' : 'NonStrictlyDetermined';"
  },
  {
    question: "What is a 'Fair Game' in Game Theory?",
    shortAnswer: "A two-person zero-sum game in which the Value of the Game is exactly zero (v* = ₹0).",
    explanation: "Neither player has an inherent mathematical advantage.",
    hint: "A game where v* = 0.",
    level: "moderate",
    codeExample: "isFairGame: gameValue === 0;"
  },
  {
    question: "What is the Expected Payoff formula for mixed strategies p and q in matrix A?",
    shortAnswer: "E(p, q) = sum_{i=1}^m sum_{j=1}^n p_i * q_j * a_ij = p^T * A * q in Indian Rupees (₹).",
    explanation: "Weighted average of matrix cells by joint strategy probabilities.",
    hint: "E(p, q) = p^T * A * q.",
    level: "moderate",
    codeExample: "E = p.dot(A).dot(q);"
  },
  {
    question: "What does the Linear Transformation Invariance Theorem state?",
    shortAnswer: "Transforming matrix entries by a'_ij = k * a_ij + c (where k > 0) leaves the optimal strategy vectors (p*, q*) and saddle point locations unchanged, while scaling the game value to v'* = k * v* + c.",
    explanation: "Allows eliminating negative numbers or scaling units without changing strategic outcomes.",
    hint: "Strategies unchanged; new game value is k*v* + c.",
    level: "expert",
    codeExample: "LinearTransform: v_new = k * v_old + c;"
  },
  {
    question: "What are the 4 steps to formulate a Game Matrix from a word problem?",
    shortAnswer: "1. Identify the competing players (A and B); 2. Define exhaustive strategy sets; 3. Compute net financial payoffs in Indian Rupees (₹) from Player A's perspective; 4. Assemble the m x n matrix and compute Row Minima and Column Maxima.",
    explanation: "The complete 4-step formulation pipeline.",
    hint: "Players -> Strategies -> Net Payoffs in ₹ -> Assemble m x n Matrix.",
    level: "moderate",
    codeExample: "FormulatePipeline: ['Players', 'Strategies', 'NetPayoffs', 'AssembleMatrix'];"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating game payoffs, player security floors, and contract tender values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of the Master Game = ₹50,000'"
  },
  {
    question: "What is the ultimate golden rule of the Payoff Matrix & Two-Person Zero-Sum Game Module?",
    shortAnswer: "'Formulate 2-person zero-sum games in 4 steps; Player A maximizes (Maximin) and Player B minimizes (Minimax); Maximin <= Minimax strictly; if equal, a pure saddle point exists; if not, apply the Minimax Theorem with mixed strategies in Indian Rupees (₹)!'",
    explanation: "This master synthesis captures all foundational principles of Module 005_001.",
    hint: "Formulate in 4 steps -> Row maximizes, Col minimizes -> Maximin <= Minimax -> Saddle point or Minimax theorem in ₹.",
    level: "moderate",
    codeExample: "MasterGoldenRule: FormulateGame() -> ComputeMaximinMinimax() -> ApplyMinimaxTheorem(v*, ₹)."
  }
];

export default questions;
