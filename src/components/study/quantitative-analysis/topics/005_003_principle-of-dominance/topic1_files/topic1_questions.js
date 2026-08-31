// topic1_questions.js
// 30 Moderate to Expert Questions on Row Dominance Rules in Game Theory

const questions = [
  {
    question: "What is the exact mathematical condition for Row i to dominate Row j?",
    shortAnswer: "a_ik >= a_jk for ALL columns k = 1, ..., n, with at least one strict inequality (a_ik > a_jk for some k).",
    explanation: "Every cell in Row i must be greater than or equal to the corresponding cell in Row j.",
    hint: "a_ik >= a_jk across all columns k.",
    level: "moderate",
    codeExample: "isRowDominant = (r_i, r_j) => r_i.every((val, k) => val >= r_j[k]) && r_i.some((val, k) => val > r_j[k]);"
  },
  {
    question: "When Row i dominates Row j, which row is eliminated from the payoff matrix?",
    shortAnswer: "Row j (the DOMINATED / SMALLER row) is eliminated.",
    explanation: "Player A is a maximizer, so the row with smaller payoffs is deleted.",
    hint: "Delete Row j (smaller row).",
    level: "moderate",
    codeExample: "deleteRow(r_j);"
  },
  {
    question: "Why would Player A never choose a dominated row in rational game play?",
    shortAnswer: "Because for every possible column strategy chosen by Player B, the dominating Row i yields an equal or strictly higher payoff in Indian Rupees (₹) than Row j.",
    explanation: "Violates expected utility maximization to choose a dominated action.",
    hint: "Because Row i is superior against every single opponent move.",
    level: "moderate",
    codeExample: "RationalChoice: Payoff(Row_i) >= Payoff(Row_j) for all cols."
  },
  {
    question: "What probability is assigned to an eliminated dominated row in the optimal strategy vector p*?",
    shortAnswer: "p_j* = 0 (exactly zero probability).",
    explanation: "Dominated actions never appear in the support of optimal strategies.",
    hint: "Zero probability (p_j* = 0).",
    level: "moderate",
    codeExample: "p_star[j] = 0.0;"
  },
  {
    question: "Suppose Row 1 = [30, 40, 50] and Row 2 = [25, 40, 45]. Does Row 1 dominate Row 2?",
    shortAnswer: "YES! 30 > 25, 40 >= 40, and 50 > 45. Row 1 weakly dominates Row 2, so Row 2 is eliminated.",
    explanation: "All elements are >= with two strict inequalities.",
    hint: "Yes, Row 1 dominates Row 2; delete Row 2.",
    level: "moderate",
    codeExample: "Row1 = [30, 40, 50], Row2 = [25, 40, 45] => eliminate(Row2);"
  },
  {
    question: "Suppose Row 1 = [30, 20, 50] and Row 2 = [25, 40, 45]. Does Row 1 dominate Row 2?",
    shortAnswer: "NO! Because in Column 2, Row 1 (20) < Row 2 (40). Neither row dominates the other.",
    explanation: "Dominance requires inequality to hold across ALL columns without exception.",
    hint: "No, 20 < 40 in column 2 breaks dominance.",
    level: "moderate",
    codeExample: "DominanceFailed: 20 < 40;"
  },
  {
    question: "How many pairwise row comparisons are required to test row dominance in an m x n matrix?",
    shortAnswer: "m * (m - 1) / 2 pairwise row comparisons.",
    explanation: "Standard combinatorial pair count for m rows.",
    hint: "m(m - 1) / 2 comparisons.",
    level: "intermediate",
    codeExample: "PairCount = (m * (m - 1)) / 2;"
  },
  {
    question: "Suppose Debangshu in Barrackpore is comparing Row 1 [₹50k, ₹60k] and Row 2 [₹30k, ₹40k]. Which row should Debangshu eliminate?",
    shortAnswer: "Row 2, because ₹50k > ₹30k and ₹60k > ₹40k; Row 1 strictly dominates Row 2.",
    explanation: "Row 1 is superior across both columns; eliminate Row 2.",
    hint: "Eliminate Row 2.",
    level: "moderate",
    codeExample: "DebangshuAction = 'Eliminate Row 2';"
  },
  {
    question: "Can two identical rows (Row 1 == Row 2) exist in a payoff matrix, and how is dominance applied?",
    shortAnswer: "YES! They weakly dominate each other. One of the duplicate rows can be arbitrarily deleted without changing the game value or solution space.",
    explanation: "Duplicate redundant strategies can be safely pruned.",
    hint: "Delete either one of the duplicate rows.",
    level: "intermediate",
    codeExample: "if (isIdentical(row1, row2)) { deleteRow(row2); }"
  },
  {
    question: "Does deleting a dominated row ever increase the guaranteed security floor for Player A?",
    shortAnswer: "The maximum security floor (Maximin) remains unchanged (v_lower is invariant), but it eliminates sub-optimal traps for Player A.",
    explanation: "Preserves the exact game value while removing non-optimal choices.",
    hint: "Security floor v_lower remains unchanged.",
    level: "expert",
    codeExample: "maximin_reduced === maximin_original; // true"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating row payoffs, margins, and elimination thresholds in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Row 1 Payoff = ₹50,000'"
  },
  {
    question: "What is the ultimate golden rule of Row Dominance in Game Theory?",
    shortAnswer: "'For Player A (Maximizer), compare rows pairwise: if Row i >= Row j across ALL columns, eliminate the smaller Row j; assign probability 0 to the eliminated row while preserving the Value of the Game in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all row dominance mechanics.",
    hint: "Compare pairwise → Row i >= Row j → Delete smaller Row j in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: CompareRowsPairwise() → DeleteSmallerRow() → SetProbabilityZero(₹)."
  }
];

export default questions;
