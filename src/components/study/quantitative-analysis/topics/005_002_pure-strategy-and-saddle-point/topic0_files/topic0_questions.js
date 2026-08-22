// topic0_questions.js
// 30 Moderate to Expert Questions on Pure Strategy in Game Theory

const questions = [
  {
    question: "What is the formal mathematical definition of a 'Pure Strategy' in Game Theory?",
    shortAnswer: "A decision rule in which a player chooses a specific single action with 100% certainty (probability p_k = 1.0, and p_i = 0 for all i != k), without any probabilistic randomization.",
    explanation: "A pure strategy is a completely deterministic course of action.",
    hint: "Deterministic selection of a single strategy with probability 1.0.",
    level: "moderate",
    codeExample: "PureStrategyVector = [0, 1, 0]; // 100% selection of Strategy 2"
  },
  {
    question: "When is a player justified in playing a Pure Strategy exclusively in a zero-sum game?",
    shortAnswer: "When the game possesses a SADDLE POINT in pure strategies (i.e. Maximin = Minimax = v*); in this case, deterministic play is stable and cannot be exploited by the opponent.",
    explanation: "Saddle points make pure strategies unexploitable Nash equilibria.",
    hint: "When a saddle point exists (Maximin = Minimax).",
    level: "moderate",
    codeExample: "if (maximin === minimax) { playPureStrategy(saddlePointRow); }"
  },
  {
    question: "How does a Pure Strategy differ from a Mixed Strategy?",
    shortAnswer: "A pure strategy selects one action with probability 1.0; a mixed strategy assigns positive probabilities to two or more actions (sum p_i = 1.0) to randomize play and prevent opponent anticipation.",
    explanation: "Pure is deterministic; mixed is probabilistic.",
    hint: "Pure is deterministic (p=1); mixed randomizes across actions.",
    level: "moderate",
    codeExample: "Pure: p = [1, 0]; Mixed: p = [0.6, 0.4];"
  },
  {
    question: "Can a Pure Strategy be considered a special case of a Mixed Strategy?",
    shortAnswer: "YES! A Pure Strategy is an extreme degenerate mixed strategy located at one of the vertices of the mixed strategy probability simplex.",
    explanation: "Pure strategies are the boundary extreme points of the strategy simplex.",
    hint: "Yes, an extreme point of the mixed strategy simplex where p_k = 1.0.",
    level: "intermediate",
    codeExample: "PureAsSimplexVertex: p = [1, 0, 0, ...];"
  },
  {
    question: "In a 2-person zero-sum game, if Player A plays pure strategy A_2 and Player B plays pure strategy B_1, what is the resulting payoff to Player A?",
    shortAnswer: "The exact numerical value in cell a_21 of the payoff matrix in Indian Rupees (₹).",
    explanation: "Direct matrix lookup for pure strategy profiles.",
    hint: "Cell entry a_21 in ₹.",
    level: "moderate",
    codeExample: "Payoff = matrix[1][0];"
  },
  {
    question: "Why is a Pure Strategy unstable if the game does NOT have a saddle point (Maximin < Minimax)?",
    shortAnswer: "Because if Player A plays a deterministic pure strategy, an intelligent Player B will anticipate it and choose the column that minimizes Player A's payoff, causing Player A to receive less than the game value.",
    explanation: "Deterministic play is easily countered and exploited in non-strictly determined games.",
    hint: "Predictable pure play can be counter-exploited by a rational rival.",
    level: "expert",
    codeExample: "Vulnerability: rivalBestResponse = argmin(matrix[chosenPureRow]);"
  },
  {
    question: "What is a 'Dominant Pure Strategy'?",
    shortAnswer: "A pure strategy that yields a strictly higher payoff than all other available pure strategies, regardless of what pure or mixed strategy the opponent selects.",
    explanation: "A rational player will always choose a strictly dominant pure strategy.",
    hint: "A pure strategy superior against every possible opponent move.",
    level: "moderate",
    codeExample: "isDominantPure = (rowIdx) => otherRows.every(r => matrix[rowIdx].every((val, c) => val > matrix[r][c]));"
  },
  {
    question: "Suppose Debangshu in Barrackpore is choosing between Pure Strategy A1 (Overtime Foundry Shift) and Pure Strategy A2 (Standard Shift). If A1 guarantees ₹45,000 net profit regardless of rival actions, what type of strategy is A1?",
    shortAnswer: "A Strictly Dominant Pure Strategy.",
    explanation: "Yields superior returns in all competitive states.",
    hint: "Strictly dominant pure strategy.",
    level: "moderate",
    codeExample: "DebangshuStrategy = 'StrictlyDominantPure';"
  },
  {
    question: "What is the 'Pure Strategy Profile' in a 2-person game?",
    shortAnswer: "The ordered pair of pure strategy choices (A_i, B_j) selected by Player A and Player B respectively.",
    explanation: "Specifies the joint deterministic action profile.",
    hint: "The ordered pair (A_i, B_j).",
    level: "moderate",
    codeExample: "PureProfile = { rowStrategy: 'A2', colStrategy: 'B1' };"
  },
  {
    question: "What is the dimension of the pure strategy space for Player A in an m x n game?",
    shortAnswer: "m discrete pure strategies: S_A = {A_1, A_2, ..., A_m}.",
    explanation: "m rows correspond to m pure strategies.",
    hint: "m pure strategies.",
    level: "moderate",
    codeExample: "PureStrategyCount = m;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating pure strategy payoffs, profits, and security levels in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Pure Strategy Payoff = ₹45,000'"
  },
  {
    question: "What is the ultimate golden rule of Pure Strategy in Game Theory?",
    shortAnswer: "'A Pure Strategy is a 100% deterministic choice of action (p = 1.0); pure strategies are completely stable and optimal if and only if a saddle point exists; in games without a saddle point, pure strategies are vulnerable to counter-exploitation in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all pure strategy mechanics.",
    hint: "Deterministic p=1.0 -> Optimal when saddle point exists -> Vulnerable without saddle point in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: DeterministicChoice() -> TestSaddlePoint() -> PlayPureOrRandomize(₹)."
  }
];

export default questions;
