// topic1_questions.js
// 30 Moderate to Expert Questions on the Maximin Principle in Game Theory

const questions = [
  {
    question: "What is the formal mathematical definition of the 'Maximin Principle' in Game Theory?",
    shortAnswer: "A decision rule adopted by Player A (Row Player / Maximizer) that maximizes the minimum possible payoff across all strategies: Maximin (alpha) = max_i [ min_j a_ij ].",
    explanation: "Player A selects the strategy that provides the highest guaranteed security floor in ₹.",
    hint: "Maximin = max_i [ min_j a_ij ] = Lower value of the game.",
    level: "moderate",
    codeExample: "Maximin = Math.max(...matrix.map(row => Math.min(...row)));"
  },
  {
    question: "Why is the Maximin Principle described as a 'Pessimistic' or 'Security-First' criterion?",
    shortAnswer: "Because Player A assumes that for whichever row i is chosen, the intelligent opponent (Player B) will act with perfect rationality to choose the column that minimizes Player A's payoff (min_j a_ij).",
    explanation: "Guarantees a safe security floor against the worst-case opponent counter-move.",
    hint: "Assumes the opponent will choose the worst-case column against you.",
    level: "moderate",
    codeExample: "SecurityFloor: min_j a_ij for chosen row i."
  },
  {
    question: "What is the 'Lower Value of the Game' (v_lower)?",
    shortAnswer: "The Maximin value alpha = max_i min_j a_ij, representing the maximum guaranteed payoff Player A can secure regardless of what strategy Player B chooses.",
    explanation: "Player A is mathematically guaranteed to receive at least v_lower.",
    hint: "v_lower = Maximin value = guaranteed floor for Player A.",
    level: "moderate",
    codeExample: "v_lower = alpha = max_i(min_j a_ij);"
  },
  {
    question: "What are the 2 computational stages to determine the Maximin strategy for Player A?",
    shortAnswer: "Stage 1: Find the Row Minimum (min_j a_ij) across each horizontal row; Stage 2: Select the MAXIMUM among these row minima (max_i RowMin_i).",
    explanation: "Horizontal minimization followed by vertical maximization.",
    hint: "Stage 1: Find min in each row; Stage 2: Pick the max of those mins.",
    level: "moderate",
    codeExample: "Stage1: rowMins = matrix.map(r => Math.min(...r)); Stage2: maximin = Math.max(...rowMins);"
  },
  {
    question: "Suppose a 3x3 matrix has Row Minima: R1 = ₹10k, R2 = ₹35k, R3 = ₹20k. What is the Maximin value and which strategy should Player A choose?",
    shortAnswer: "Maximin = max(10, 35, 20) = ₹35,000; Player A should choose Strategy A2.",
    explanation: "Strategy A2 guarantees a minimum security floor of ₹35,000.",
    hint: "Maximin = ₹35k; Strategy A2.",
    level: "moderate",
    codeExample: "Maximin = Math.max(10000, 35000, 20000) = 35000; optimalRow = 'A2';"
  },
  {
    question: "Can Player A receive MORE than the Maximin value (v_lower) in actual game play?",
    shortAnswer: "YES! If Player B makes a non-optimal or sub-rational move, Player A's actual payoff will be strictly greater than v_lower.",
    explanation: "v_lower is the absolute lower bound / minimum floor under worst-case play.",
    hint: "Yes, v_lower is just the guaranteed floor; errors by Player B increase Player A's payoff.",
    level: "intermediate",
    codeExample: "ActualPayoff >= v_lower; // Always holds under optimal Player A play"
  },
  {
    question: "Can Player A receive LESS than the Maximin value if Player A plays their optimal Maximin strategy?",
    shortAnswer: "NO! By mathematical definition, playing the Maximin row guarantees that Player A receives at least v_lower, no matter what Player B does.",
    explanation: "The Maximin strategy is an ironclad security guarantee.",
    hint: "No, Player A is mathematically guaranteed at least v_lower.",
    level: "expert",
    codeExample: "assert(actualPayoff >= maximinValue);"
  },
  {
    question: "Suppose Debangshu in Barrackpore is choosing among 3 foundry production schedules. Row 1 has min ₹15,000, Row 2 has min ₹40,000, and Row 3 has min ₹25,000. What is Debangshu's Maximin strategy?",
    shortAnswer: "Row 2 (Strategy A2), which secures a guaranteed minimum profit of ₹40,000.",
    explanation: "Maximizes the minimum return across all possible competitor moves.",
    hint: "Strategy A2 (₹40,000).",
    level: "moderate",
    codeExample: "DebangshuChoice = 'Strategy A2';"
  },
  {
    question: "How does the Maximin Principle relate to the Minimax Principle of Player B?",
    shortAnswer: "Maximin (alpha) <= Minimax (beta) universally; if alpha = beta, the Maximin strategy for Player A is part of the game's unique saddle point equilibrium.",
    explanation: "Binds the security floor of Player A to the liability ceiling of Player B.",
    hint: "Maximin <= Minimax; equality indicates a saddle point.",
    level: "expert",
    codeExample: "Invariant: alpha <= beta;"
  },
  {
    question: "What is the Maximin strategy if all elements in row i are negative?",
    shortAnswer: "Player A still chooses the row with the maximum (least negative) row minimum, which minimizes Player A's worst-case loss in Indian Rupees (₹).",
    explanation: "Maximin works identically for negative payoffs (loss minimization).",
    hint: "Pick the row with the least negative row minimum.",
    level: "moderate",
    codeExample: "maximin = Math.max(-50000, -20000, -30000) = -20000;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating Maximin values, security floors, and player guarantees in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Maximin Security Floor = ₹40,000'"
  },
  {
    question: "What is the ultimate golden rule of the Maximin Principle in Game Theory?",
    shortAnswer: "'The Maximin Principle is Player A’s pessimistic security criterion: find the row minima (min_j a_ij) horizontally, then take their maximum (max_i) vertically; this guarantees a minimum payoff floor of v_lower in Indian Rupees (₹) regardless of opponent actions!'",
    explanation: "This complete rule captures all Maximin mechanics.",
    hint: "Row minima horizontally → Maximize vertically → Guaranteed floor v_lower in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: RowMinima() → MaximizeSecurityFloor() → GuaranteeVLower(₹)."
  }
];

export default questions;
