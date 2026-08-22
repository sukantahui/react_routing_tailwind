// topic0_questions.js
// 30 Moderate to Expert Questions on the Need for Mixed Strategies in Game Theory

const questions = [
  {
    question: "Why does a Two-Person Zero-Sum Game fail to have a Pure Strategy equilibrium when Maximin < Minimax?",
    shortAnswer: "Because no single cell satisfies the saddle point condition; whatever pure action one player chooses, the opponent has an incentive to unilaterally deviate, causing circular cycling and instability.",
    explanation: "Strictly determined games require Maximin = Minimax. When alpha < beta, pure strategies cannot form an equilibrium.",
    hint: "Maximin < Minimax causes circular instability in pure strategies.",
    level: "moderate",
    codeExample: "if (maximin < minimax) { requiresMixedStrategy = true; }"
  },
  {
    question: "What is the core definition of a Mixed Strategy in Game Theory?",
    shortAnswer: "A probability distribution assigned over a player's set of pure strategies, where the actual move is chosen using a random device according to predetermined optimal probabilities (p1, p2, ..., pm) such that sum(p_i) = 1.",
    explanation: "Extends deterministic choices to probability vectors over the simplex.",
    hint: "A probability distribution over pure strategies.",
    level: "moderate",
    codeExample: "p_vector = [p1, p2]; // where p1 + p2 === 1.0 && p1 >= 0 && p2 >= 0"
  },
  {
    question: "What fundamental vulnerability does a player suffer by playing a pure strategy in a game without a saddle point?",
    shortAnswer: "Information Leakage & Exploitation Vulnerability: If the opponent predicts the deterministic choice, they can pick the exact counter-strategy that minimizes the player's payoff.",
    explanation: "Predictability allows the opponent to exploit the player.",
    hint: "Predictability leads to exploitation by the opponent.",
    level: "moderate",
    codeExample: "ExploitationRisk: BestResponseToKnownAction(PureChoice);"
  },
  {
    question: "How does randomization provide strategic immunity to a player?",
    shortAnswer: "By keeping the opponent in complete uncertainty about the specific move while mathematically guaranteeing a fixed Expected Value of the Game in Indian Rupees (₹).",
    explanation: "Opponent cannot exploit an action that has not been deterministically chosen.",
    hint: "Unpredictability prevents opponent exploitation.",
    level: "intermediate",
    codeExample: "RandomizedImmunity: ExpectedPayoff(p_star, q) >= v_star for all q."
  },
  {
    question: "Who proved the Minimax Theorem guaranteeing that EVERY finite zero-sum game has an equilibrium in mixed strategies?",
    shortAnswer: "John von Neumann in 1928 (expanded with Oskar Morgenstern in 1944).",
    explanation: "Foundational Minimax Theorem of Game Theory.",
    hint: "John von Neumann (1928).",
    level: "moderate",
    codeExample: "Theorem: VonNeumannMinimax(1928);"
  },
  {
    question: "Suppose Debangshu in Barrackpore is facing a bidding matrix [[20, -10], [-10, 20]] (in ₹ Thousands). What is the Maximin and Minimax value?",
    shortAnswer: "Row Minima = [-10, -10] => Maximin = -₹10k. Col Maxima = [20, 20] => Minimax = +₹20k. Since -10 < 20, no pure saddle point exists and mixed strategies are mandatory!",
    explanation: "Classic symmetric non-saddle matrix.",
    hint: "Maximin = -10, Minimax = 20 => No saddle point.",
    level: "moderate",
    codeExample: "Maximin = -10, Minimax = 20 => Maximin < Minimax;"
  },
  {
    question: "In the 2x2 game [[20, -10], [-10, 20]], what happens if Debangshu deterministically plays Row 1 every day?",
    shortAnswer: "The rival in Barrackpore will observe this pattern, play Column 2, and inflict a ₹10,000 loss on Debangshu every single round.",
    explanation: "Demonstrates the devastating cost of predictability.",
    hint: "Rival plays Col 2 and Debangshu loses ₹10k per round.",
    level: "moderate",
    codeExample: "if (Debangshu === 'Row1') { Rival = 'Col2'; Payoff = -10000; }"
  },
  {
    question: "What is the expected payoff if Debangshu randomizes with 50% Row 1 and 50% Row 2 in [[20, -10], [-10, 20]]?",
    shortAnswer: "Against Col 1: 0.5(20) + 0.5(-10) = +₹5k. Against Col 2: 0.5(-10) + 0.5(20) = +₹5k. Debangshu guarantees an expected payoff of +₹5,000 regardless of the rival's choice!",
    explanation: "Mixed strategy equalizes expected payoffs across all opponent moves.",
    hint: "Guaranteed expected payoff of +₹5,000.",
    level: "expert",
    codeExample: "E1 = 0.5*20 + 0.5*(-10) = 5; E2 = 0.5*(-10) + 0.5*20 = 5;"
  },
  {
    question: "What geometric space do the mixed strategies of a 2-strategy player represent?",
    shortAnswer: "A 1-dimensional line segment (simplex) connecting pure strategy (1, 0) to pure strategy (0, 1).",
    explanation: "Probability simplex Delta_1.",
    hint: "A 1D probability simplex line segment.",
    level: "intermediate",
    codeExample: "Simplex1D = { (p1, p2) | p1 + p2 === 1, p1 >= 0, p2 >= 0 };"
  },
  {
    question: "Can a player employ a pseudo-random device (like a coin flip or random number generator) to execute mixed strategies?",
    shortAnswer: "YES! The player calculates the optimal probability p1*, then rolls a dice or uses a random generator to select the pure action before each round.",
    explanation: "Practical operational execution of mixed strategies.",
    hint: "Yes, using coins, dice, or RNG matching p*.",
    level: "moderate",
    codeExample: "action = Math.random() < p1_star ? 'A1' : 'A2';"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating expected payoffs and mixed game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Expected Value of Game = ₹5,000'"
  },
  {
    question: "What is the ultimate golden rule of the Need for Mixed Strategies in Game Theory?",
    shortAnswer: "'When Maximin < Minimax, pure strategies are vulnerable to prediction; randomize play over the probability simplex to achieve informational immunity and guarantee the Expected Value of the Game in Indian Rupees (₹)!'",
    explanation: "This complete rule captures the essence of mixed strategy motivation.",
    hint: "Maximin < Minimax -> Randomize over simplex -> Gain immunity and secure v* in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: When(Maximin < Minimax) => RandomizeSimplex() => ImmuneToPrediction(₹)."
  }
];

export default questions;
