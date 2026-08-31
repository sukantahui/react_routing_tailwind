// topic1_questions.js
// 30 Moderate to Expert Questions on Players and Strategies in Game Theory

const questions = [
  {
    question: "What is the formal definition of a 'Player' in Game Theory?",
    shortAnswer: "An autonomous, rational decision-making entity (an individual, corporation, government, or legal litigant) that has a set of available actions and strives to maximize its own expected payoff in Indian Rupees (₹).",
    explanation: "Players are the strategic actors in the game model.",
    hint: "Autonomous, rational decision-maker seeking to maximize payoff.",
    level: "moderate",
    codeExample: "Player = { name: 'Player A', role: 'Row Player', strategySet: ['A1', 'A2', 'A3'] };"
  },
  {
    question: "What is the formal definition of a 'Strategy' in Game Theory?",
    shortAnswer: "A complete, pre-formulated contingency plan specifying the exact action a player will take in every conceivable situation throughout the game.",
    explanation: "A strategy leaves nothing to chance or ad-hoc impulse.",
    hint: "A complete pre-determined contingency plan covering all game situations.",
    level: "moderate",
    codeExample: "StrategyPlan = { onState1: 'Action X', onState2: 'Action Y' };"
  },
  {
    question: "What is a 'Pure Strategy'?",
    shortAnswer: "A decision rule in which a player chooses a specific single action with 100% certainty (Probability p = 1.0) and zero randomization.",
    explanation: "Pure strategies are deterministic choices.",
    hint: "Deterministic selection of a single strategy with probability 1.0.",
    level: "moderate",
    codeExample: "PureStrategy = { action: 'A1', probability: 1.0 };"
  },
  {
    question: "What is a 'Mixed Strategy'?",
    shortAnswer: "A strategy in which a player chooses among available pure strategies according to a predefined probability distribution vector p = (p_1, p_2, ..., p_m) where sum(p_i) = 1 and p_i >= 0.",
    explanation: "Mixed strategies introduce deliberate randomness to keep opponents guessing.",
    hint: "Probabilistic distribution over multiple pure strategies (sum of probabilities = 1).",
    level: "moderate",
    codeExample: "MixedStrategy = { p1: 0.6, p2: 0.4, sum: 1.0 };"
  },
  {
    question: "Why do players adopt Mixed Strategies in competitive zero-sum games without a saddle point?",
    shortAnswer: "To prevent opponents from anticipating their move; deterministic pure play would allow an intelligent rival to counter and minimize their payoff.",
    explanation: "Randomization eliminates predictability in games like Rock-Paper-Scissors or sports penalty kicks.",
    hint: "To eliminate predictability and prevent rivals from exploiting a fixed pattern.",
    level: "expert",
    codeExample: "RandomizationDefense: Prevents opponent from playing an optimal deterministic counter-move."
  },
  {
    question: "In a standard two-person zero-sum matrix, what role does Player A (Row Player) play?",
    shortAnswer: "Player A is the MAXIMIZER, seeking to maximize the minimum possible payoff (Maximin Principle).",
    explanation: "Row player selects rows to maximize positive returns in ₹.",
    hint: "Maximizer using the Maximin principle.",
    level: "moderate",
    codeExample: "RowPlayer = { role: 'Maximizer', principle: 'Maximin' };"
  },
  {
    question: "In a standard two-person zero-sum matrix, what role does Player B (Column Player) play?",
    shortAnswer: "Player B is the MINIMIZER, seeking to minimize the maximum possible payout to Player A (Minimax Principle).",
    explanation: "Column player selects columns to minimize losses / payouts.",
    hint: "Minimizer using the Minimax principle.",
    level: "moderate",
    codeExample: "ColumnPlayer = { role: 'Minimizer', principle: 'Minimax' };"
  },
  {
    question: "What is a 'Strictly Dominant Strategy'?",
    shortAnswer: "A strategy that yields a strictly higher payoff than any other strategy, regardless of what strategy the opponent selects.",
    explanation: "A rational player will always choose a strictly dominant strategy.",
    hint: "A strategy that is strictly superior against all possible opponent moves.",
    level: "moderate",
    codeExample: "isDominant = (strategy, rivalMoves) => rivalMoves.every(m => payoff(strategy, m) > payoff(altStrategy, m));"
  },
  {
    question: "What is a 'Dominated Strategy'?",
    shortAnswer: "A strategy that produces a worse (or equal) payoff compared to another available strategy for every possible choice by the opponent.",
    explanation: "Dominated strategies can be eliminated safely from the payoff matrix.",
    hint: "A strategy inferior to another strategy across all opponent actions.",
    level: "moderate",
    codeExample: "isDominated = (s1, s2) => allOpponentMoves.every(m => payoff(s1, m) <= payoff(s2, m));"
  },
  {
    question: "What is the Strategy Space of an m x n game?",
    shortAnswer: "Player A has m pure strategies {A_1, A_2, ..., A_m}, and Player B has n pure strategies {B_1, B_2, ..., B_n}, generating m x n possible strategic outcomes.",
    explanation: "Defines the dimensions of the normal form matrix.",
    hint: "m strategies for Player A and n strategies for Player B.",
    level: "moderate",
    codeExample: "StrategySpace = { RowStrategies: m, ColStrategies: n, TotalOutcomes: m * n };"
  },
  {
    question: "Suppose Debangshu in Barrackpore is choosing between Strategy A1 (Heavy Advertising) and Strategy A2 (Discount Pricing). If he plays A1 with 70% probability and A2 with 30% probability, what strategy is he playing?",
    shortAnswer: "A Mixed Strategy with probability vector p = (0.70, 0.30).",
    explanation: "Probabilistic weighting over pure strategies.",
    hint: "Mixed strategy p = (0.7, 0.3).",
    level: "moderate",
    codeExample: "DebangshuStrategy = { p_A1: 0.70, p_A2: 0.30 };"
  },
  {
    question: "What mathematical property must the probability vector p = (p_1, p_2, ..., p_m) of any mixed strategy satisfy?",
    shortAnswer: "1. Non-negativity: p_i >= 0 for all i; 2. Normalization: sum(p_i) = 1.0 (probabilities must sum to exactly 1).",
    explanation: "Standard axioms of probability theory.",
    hint: "All p_i >= 0 and sum(p_i) = 1.0.",
    level: "moderate",
    codeExample: "validateProbVector: (p) => p.every(v => v >= 0) && Math.abs(p.reduce((a,b)=>a+b,0) - 1.0) < 1e-6;"
  },
  {
    question: "Can a Pure Strategy be considered a special case of a Mixed Strategy?",
    shortAnswer: "YES! A Pure Strategy is simply a degenerate Mixed Strategy where one strategy has probability p_k = 1.0 and all other strategies have probability p_i = 0.",
    explanation: "Pure strategies are boundary points of the mixed strategy simplex.",
    hint: "Yes, a mixed strategy where one probability is 1.0 and all others are 0.",
    level: "intermediate",
    codeExample: "PureAsMixed = [1, 0, 0, ...];"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating player utility values and financial payoffs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Expected Value of Strategy A1 = ₹42,000'"
  },
  {
    question: "What is the ultimate golden rule of Players and Strategies in Game Theory?",
    shortAnswer: "'Players are rational decision-makers; Player A maximizes (Maximin) and Player B minimizes (Minimax); Pure strategies are 100% deterministic choices; Mixed strategies randomize with probabilities summing to 1.0 to eliminate predictability in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all player and strategy mechanics.",
    hint: "Rational players → Row maximizes, Col minimizes → Pure vs Mixed probabilities sum to 1 → Eliminate predictability in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: RationalPlayers() → DefineStrategySets() → PureOrMixedProbabilities() → MaximinVsMinimax(₹)."
  }
];

export default questions;
