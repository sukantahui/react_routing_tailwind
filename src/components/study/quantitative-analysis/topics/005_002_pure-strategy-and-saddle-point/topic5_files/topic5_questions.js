// topic5_questions.js
// 30 Moderate to Expert Questions on Optimal Pure Strategies in Game Theory

const questions = [
  {
    question: "What is the formal definition of an 'Optimal Pure Strategy' in Game Theory?",
    shortAnswer: "A pure strategy A_i* for Player A that maximizes guaranteed security floor (Maximin), and B_j* for Player B that minimizes guaranteed liability ceiling (Minimax), such that neither player can improve their payoff by deviating unilaterally.",
    explanation: "Represents the equilibrium action choice in strictly determined games.",
    hint: "The pure strategy that achieves the saddle point equilibrium.",
    level: "moderate",
    codeExample: "OptimalStrategy = { PlayerA: 'A_i*', PlayerB: 'B_j*', GameValue: 'v*' };"
  },
  {
    question: "What is the standard 5-step algorithm to identify Optimal Pure Strategies in an m x n matrix?",
    shortAnswer: "1. Compute Row Minima (min_j a_ij); 2. Identify Maximin row i*; 3. Compute Column Maxima (max_i a_ij); 4. Identify Minimax column j*; 5. Verify a_i*j* = Maximin = Minimax = v*; then A_i* and B_j* are the optimal pure strategies.",
    explanation: "Systematic algorithm to locate pure strategy Nash equilibria.",
    hint: "Row mins → Maximin row i* → Col maxes → Minimax col j* → Saddle point validation.",
    level: "moderate",
    codeExample: "findOptimalPure: (m) => ({ iStar: argmax(rowMins(m)), jStar: argmin(colMaxs(m)) });"
  },
  {
    question: "How are Optimal Pure Strategies represented as probability vectors?",
    shortAnswer: "As standard unit basis vectors: p* = (0, ..., 1, ..., 0)^T with 1.0 at index i*, and q* = (0, ..., 1, ..., 0)^T with 1.0 at index j*.",
    explanation: "Represents 100% deterministic probability on the optimal choices.",
    hint: "p* = e_i* and q* = e_j* (unit basis vectors).",
    level: "moderate",
    codeExample: "p_star = [0, 1, 0]; q_star = [1, 0, 0];"
  },
  {
    question: "What happens if Player A plays a sub-optimal pure strategy A_k (where k != i*) while Player B plays B_j*?",
    shortAnswer: "Player A receives a payoff of a_k,j* <= v*; Player A's return either strictly decreases or remains the same, proving that deviation is non-beneficial.",
    explanation: "Demonstrates the self-enforcing stability of optimal pure strategies.",
    hint: "Payoff drops or stays the same (a_k,j* <= v*).",
    level: "expert",
    codeExample: "DeviationPenaltyA: matrix[k][j_star] <= v_star;"
  },
  {
    question: "What happens if Player B plays a sub-optimal pure strategy B_k (where k != j*) while Player A plays A_i*?",
    shortAnswer: "Player B concedes a payout of a_i*,k >= v*; Player B's payout liability either strictly increases or remains the same, punishing Player B for deviating.",
    explanation: "Demonstrates that Player B cannot lower costs by deviating.",
    hint: "Payout rises or stays the same (a_i*,k >= v*).",
    level: "expert",
    codeExample: "DeviationPenaltyB: matrix[i_star][k] >= v_star;"
  },
  {
    question: "Can a game have Multiple Alternate Optimal Pure Strategies?",
    shortAnswer: "YES! If multiple saddle points exist, Player A may have multiple optimal rows (e.g. A1 and A3) and Player B may have multiple optimal columns (e.g. B1 and B2), all yielding the exact same game value v*.",
    explanation: "Alternate optimal pure strategies form a rectangular saddle grid.",
    hint: "Yes, when multiple saddle points exist.",
    level: "moderate",
    codeExample: "AlternateOptima = { Rows: ['A1', 'A3'], Cols: ['B1', 'B2'], Value: 'v*' };"
  },
  {
    question: "Suppose in a 3x3 matrix, Maximin = ₹35k at Row 2, and Minimax = ₹35k at Column 1. What are the optimal pure strategies and game value?",
    shortAnswer: "Player A optimal strategy: A2; Player B optimal strategy: B1; Value of the Game: v* = ₹35,000.",
    explanation: "Optimal pure strategy pair (A2, B1) at the saddle point.",
    hint: "A2 for Player A, B1 for Player B, v* = ₹35,000.",
    level: "moderate",
    codeExample: "Optima: { A: 'A2', B: 'B1', v: 35000 };"
  },
  {
    question: "Suppose Debangshu in Barrackpore is selecting between 3 manufacturing plans. If Strategy A2 is optimal with v* = ₹40,000, why should Debangshu never switch to A1 (which has an entry of ₹60,000)?",
    shortAnswer: "Because an intelligent rival (Player B) will never play the column containing ₹60,000; Player B will exploit A1 to force Debangshu down to A1's row minimum (e.g. ₹10,000), leaving Debangshu worse off!",
    explanation: "Explains why tempting maximum cell values are traps if they lack security.",
    hint: "Player B will punish the switch by choosing the lowest column in row 1.",
    level: "expert",
    codeExample: "TemptationTrap: High cell value lacks security floor."
  },
  {
    question: "Are Optimal Pure Strategies vulnerable to industrial espionage or opponent anticipation?",
    shortAnswer: "NO! At a saddle point, even if Player B knows in advance that Player A is playing A_i*, Player B's best response is still B_j*, resulting in the exact same game value v*.",
    explanation: "Saddle points are immune to information leakage.",
    hint: "No, saddle point strategies are completely unexploitable even if known in advance.",
    level: "expert",
    codeExample: "InformationImmunity: argmin_j(matrix[i_star][j]) === j_star;"
  },
  {
    question: "What is the condition for an optimal pure strategy to be 'Strictly Dominant'?",
    shortAnswer: "When it yields a strictly higher payoff than all other rows across EVERY column, meaning it is optimal regardless of whether Player B plays optimally or sub-optimally.",
    explanation: "Strict dominance makes the choice unconditionally superior.",
    hint: "Superior across all columns without exception.",
    level: "moderate",
    codeExample: "isStrictlyDominantRow = (r) => otherRows.every(alt => cols.every(c => matrix[r][c] > matrix[alt][c]));"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating optimal pure strategy returns, deviation penalties, and game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Optimal Return = ₹40,000'"
  },
  {
    question: "What is the ultimate golden rule of Optimal Pure Strategies in Game Theory?",
    shortAnswer: "'Extract optimal pure strategies via the 5-step Maximin/Minimax algorithm; Player A chooses A_i* and Player B chooses B_j*; optimal pure strategies are self-enforcing and immune to information leakage in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all optimal pure strategy principles.",
    hint: "5-step algorithm → A_i* and B_j* at saddle point → Self-enforcing and unexploitable in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: FiveStepAlgorithm() → ExtractIStarJStar() → ValidateUnexploitableNash(₹)."
  }
];

export default questions;
