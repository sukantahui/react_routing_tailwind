// topic3_questions.js
// 30 Moderate to Expert Questions on the Payoff Matrix in Game Theory

const questions = [
  {
    question: "What is the formal definition of a 'Payoff Matrix' in Game Theory?",
    shortAnswer: "A rectangular array of dimension m x n where rows represent the m strategies of Player A, columns represent the n strategies of Player B, and each cell a_ij specifies the payoff (in Indian Rupees ₹) received by Player A from Player B.",
    explanation: "The payoff matrix is the standard algebraic representation of a simultaneous normal form game.",
    hint: "Rectangular array mapping row strategies and column strategies to payoffs in ₹.",
    level: "moderate",
    codeExample: "PayoffMatrix = [[a11, a12], [a21, a22]];"
  },
  {
    question: "In a standard zero-sum Payoff Matrix, who is the Row Player and who is the Column Player?",
    shortAnswer: "Player A is the Row Player (Maximizer, choosing rows); Player B is the Column Player (Minimizer, choosing columns).",
    explanation: "Rows represent Player A's action set; columns represent Player B's action set.",
    hint: "Row Player = Player A (Maximizer); Column Player = Player B (Minimizer).",
    level: "moderate",
    codeExample: "RowPlayer: 'Player A', ColPlayer: 'Player B';"
  },
  {
    question: "What is the 'Row Minimum' (Row Min) for each row i?",
    shortAnswer: "The minimum payoff in row i: min_j a_ij, representing the worst-case payoff Player A can receive if they choose strategy A_i.",
    explanation: "Measures Player A's guaranteed security level for that specific strategy.",
    hint: "min_j a_ij: Worst-case payoff for Player A in row i.",
    level: "moderate",
    codeExample: "rowMin[i] = Math.min(...matrix[i]);"
  },
  {
    question: "What is the 'Column Maximum' (Column Max) for each column j?",
    shortAnswer: "The maximum payoff in column j: max_i a_ij, representing the maximum payout Player B must make if they choose strategy B_j.",
    explanation: "Measures Player B's worst-case liability for that specific strategy.",
    hint: "max_i a_ij: Worst-case liability / payout for Player B in column j.",
    level: "moderate",
    codeExample: "colMax[j] = Math.max(...matrix.map(row => row[j]));"
  },
  {
    question: "What is the 'Maximin Value' (Lower Value of the Game, v_lower)?",
    shortAnswer: "The maximum of the row minima: Maximin = max_i (min_j a_ij), representing the highest payoff Player A can guarantee regardless of Player B's choice.",
    explanation: "Player A maximizes their minimum security level.",
    hint: "Maximin = max_i (min_j a_ij) = Lower value of the game.",
    level: "moderate",
    codeExample: "maximin = Math.max(...rowMin);"
  },
  {
    question: "What is the 'Minimax Value' (Upper Value of the Game, v_upper)?",
    shortAnswer: "The minimum of the column maxima: Minimax = min_j (max_i a_ij), representing the lowest payout Player B can guarantee to concede regardless of Player A's choice.",
    explanation: "Player B minimizes the maximum payout conceded.",
    hint: "Minimax = min_j (max_i a_ij) = Upper value of the game.",
    level: "moderate",
    codeExample: "minimax = Math.min(...colMax);"
  },
  {
    question: "What is the Universal Invariant Inequality between Maximin and Minimax?",
    shortAnswer: "Maximin <= Minimax (max_i min_j a_ij <= min_j max_i a_ij), or v_lower <= v_upper, which holds universally for every real-valued payoff matrix.",
    explanation: "The lower value can never exceed the upper value.",
    hint: "Maximin <= Minimax (v_lower <= v_upper).",
    level: "expert",
    codeExample: "MaximinLeqMinimax: Math.max(...rowMin) <= Math.min(...colMax);"
  },
  {
    question: "What occurs when Maximin = Minimax (v_lower = v_upper = v)?",
    shortAnswer: "The game has a SADDLE POINT in pure strategies; the common value v is the exact Value of the Game, and the corresponding strategy pair (A_i*, B_j*) is the optimal pure strategy profile.",
    explanation: "Saddle points indicate stable pure-strategy Nash equilibria.",
    hint: "A saddle point exists and pure optimal strategies are stable.",
    level: "moderate",
    codeExample: "if (maximin === minimax) { saddlePointExists = true; gameValue = maximin; }"
  },
  {
    question: "What occurs when Maximin < Minimax (v_lower < v_upper)?",
    shortAnswer: "No saddle point exists in pure strategies; players must adopt MIXED STRATEGIES (probabilistic randomization) to determine the value of the game.",
    explanation: "Pure strategies are unstable and subject to counter-exploitation.",
    hint: "No pure saddle point; players must use mixed strategies.",
    level: "moderate",
    codeExample: "if (maximin < minimax) { useMixedStrategies = true; }"
  },
  {
    question: "Suppose a 2x2 matrix is: [[10, 20], [30, 40]]. What are the row minima, column maxima, maximin, and minimax?",
    shortAnswer: "Row Min: R1=10, R2=30; Col Max: C1=30, C2=40; Maximin = max(10, 30) = 30; Minimax = min(30, 40) = 30; Saddle point at (A2, B1) with value ₹30.",
    explanation: "Both equal 30, so a pure saddle point exists.",
    hint: "Row min: (10, 30); Col max: (30, 40); Maximin = 30, Minimax = 30.",
    level: "moderate",
    codeExample: "Matrix: [[10, 20], [30, 40]] => Maximin=30, Minimax=30."
  },
  {
    question: "Suppose Debangshu in Barrackpore is constructing a 3x3 payoff matrix for casting tenders. If all values are expressed in ₹ Thousands, can any cell contain a negative value?",
    shortAnswer: "YES! Negative values indicate that Player A loses money and pays Player B for that specific strategy combination.",
    explanation: "Negative values represent financial payouts by the row player.",
    hint: "Yes, negative values mean Player A pays Player B.",
    level: "moderate",
    codeExample: "PayoffMatrix = [[50, -20, 30], [-10, 40, -15], [20, 10, 25]];"
  },
  {
    question: "What is the dimension of a Payoff Matrix if Player A has 4 strategies and Player B has 5 strategies?",
    shortAnswer: "4 x 5 (4 rows by 5 columns), containing 20 total outcome cells.",
    explanation: "m = 4 rows, n = 5 columns.",
    hint: "4 x 5 matrix with 20 cells.",
    level: "moderate",
    codeExample: "MatrixSize = { rows: 4, cols: 5, totalCells: 20 };"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating matrix payoffs, game values, and security levels in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of the Game = ₹35,000'"
  },
  {
    question: "What is the ultimate golden rule of the Payoff Matrix in Game Theory?",
    shortAnswer: "'A Payoff Matrix coordinates m row strategies of Player A with n column strategies of Player B; find Row Minima and Column Maxima; Maximin is the lower value and Minimax is the upper value; Maximin <= Minimax strictly; if equal, a saddle point exists in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all payoff matrix analysis mechanics.",
    hint: "Row min → Col max → Maximin <= Minimax → Saddle point if equal in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: BuildMatrix(m, n) → RowMin() → ColMax() → CompareMaximinMinimax(₹)."
  }
];

export default questions;
